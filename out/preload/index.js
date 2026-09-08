"use strict";
const electron = require("electron");
const preload = require("@electron-toolkit/preload");
const IPC = {
  LAUNCH: "launcher:launch",
  CANCEL: "launcher:cancel",
  EVENT: "launcher:event",
  SYSTEM_INFO: "system:info",
  OPEN_GAME_DIR: "system:open-game-dir",
  /** Root papkasidan farqli - aynan "mods" ich-papkasini ochadi (Bosh sahifadagi "Mods
      papkasi" tugmasi uchun). */
  OPEN_MODS_DIR: "system:open-mods-dir",
  WINDOW_MINIMIZE: "window:minimize",
  WINDOW_CLOSE: "window:close",
  WINDOW_TOGGLE_MAXIMIZE: "window:toggle-maximize",
  MC_VERSIONS: "system:mc-versions",
  /** Joriy qiymat `SystemInfo.gameDir`da keladi (SYSTEM_INFO) - bular faqat o'zgartirish/tanlash
      uchun. Kelajakdagi Sozlamalar ekrani shu ikkalasini ishlatadi (hozircha UI qurilmagan,
      lekin backend tayyor). Eski papkadagi fayllarni yangisiga KO'CHIRMAYDI - faqat KEYINGI
      yuklab olishlar qayerga borishini o'zgartiradi. */
  SET_INSTALL_PATH: "system:set-install-path",
  /** Native papka tanlash oynasini ochadi (Electron dialog) - foydalanuvchi bekor qilsa null
      qaytadi. */
  PICK_INSTALL_DIRECTORY: "system:pick-install-directory",
  /** Berilgan URL'ni Electron'ning o'z (brauzerdagi kabi) yuklab olish oqimi orqali diskka
      saqlaydi - foydalanuvchi joyni tanlaydi (yoki standart Downloads papkasiga tushadi). */
  DOWNLOAD_FILE: "system:download-file",
  MOD_DOWNLOAD: "mods:download",
  MOD_REMOVE: "mods:remove",
  MOD_LIST_INSTALLED: "mods:list-installed",
  MOD_EVENT: "mods:event",
  /** "Plan B" - yuklashdan OLDIN, bog'liqliklarni faqat ANIQLAB (yuklamasdan) qaytaradi,
      shunda renderer foydalanuvchidan tasdiq so'rashi mumkin. */
  MOD_CHECK_DEPENDENCIES: "mods:check-dependencies",
  /** Shu profilda (versiya+loader) shaderlar umuman ishlay oladimi - ko'ring ShaderSupport */
  MOD_CHECK_SHADER_SUPPORT: "mods:check-shader-support",
  MAP_DOWNLOAD: "maps:download",
  MAP_REMOVE: "maps:remove",
  MAP_LIST_INSTALLED: "maps:list-installed",
  MAP_EVENT: "maps:event",
  /** MCModHub UI modining mavzulari - o'yin papkasiga o'rnatish/tanlash/o'chirish.
      Mavzu rasmlari va video foni mod jar'i ICHIDA EMAS, aynan shu yo'l bilan o'rnatiladi
      (shuning uchun ko'chirib olingan jar mavzusiz, bo'sh interfeys ko'rsatadi). */
  UI_THEME_LIST: "ui-themes:list",
  UI_THEME_ACTIVE: "ui-themes:active",
  UI_THEME_SET_ACTIVE: "ui-themes:set-active",
  UI_THEME_INSTALL_URL: "ui-themes:install-url",
  UI_THEME_INSTALL_FILE: "ui-themes:install-file",
  UI_THEME_REMOVE: "ui-themes:remove",
  /** Modrinth'da "world save" turi umuman yo'q (faqat mod/modpack/resourcepack/shader/datapack) -
      shuning uchun faqat modlar uchun, Xaritalar bo'limiga tegishli kanal yo'q. */
  MR_SEARCH_MODS: "modrinth:search-mods",
  MR_MOD_DETAIL: "modrinth:mod-detail",
  /** Katalogga mos kelmaydigan (orfan) o'rnatilgan fayl uchun - fayl nomidan Modrinth'da
      ANIQ mos loyihani qidirib, faqat rasm/nom olish uchun (yuklab olish emas). */
  MR_FIND_BY_FILENAME: "modrinth:find-by-filename",
  /** Modlar bo'limidagi versiya filtri ro'yxati - Modrinth'ning O'Z release versiyalari
      (sabab: `services/modrinth.ts` -> `listModrinthGameVersions` izohi). */
  MR_GAME_VERSIONS: "modrinth:game-versions",
  /** Kartalar/detal DARHOL (ingliz tilida) ko'rsatiladi, tarjima shu kanal orqali ALOHIDA,
      fon rejimida so'raladi - aks holda butun sahifa tarjima tugaguncha kutib turishga
      majbur bo'lardi. */
  TRANSLATE_BATCH: "translate:batch",
  /** Avtomatik yangilanish - Bunny CDN'dagi (electron-builder.yml -> publish) versiya
      ma'lumotini fonda tekshiradi/yuklaydi. Faqat o'rnatilgan (paketlangan) holatda ishlaydi. */
  UPDATE_EVENT: "update:event",
  UPDATE_CHECK: "update:check",
  UPDATE_QUIT_AND_INSTALL: "update:quit-and-install",
  /** Tashqi havolani (Telegram/Discord/veb-sayt) tizim brauzerida ochadi (`shell.openExternal`) -
      Hamjamiyat bo'limi kabi joylarda ijtimoiy tarmoq havolalari uchun aniq, to'g'ridan-to'g'ri
      yo'l sifatida ishlatiladi. */
  OPEN_EXTERNAL: "system:open-external"
};
const launcherApi = {
  /** Joriy tizim ('win32' | 'darwin' | 'linux'). `getSystemInfo()` ichida ham bor, lekin u
      asinxron - TitleBar kabi joylarda esa qiymat BIRINCHI chizishdayoq kerak (macOS'da
      oynaning o'z tugmalari chizilmasligi kerak, aks holda tizimning "svetofor" tugmalari
      bilan ikki marta takrorlanardi). */
  platform: process.platform,
  getNews: () => electron.ipcRenderer.invoke("system:get-news"),
  getSystemInfo: () => electron.ipcRenderer.invoke(IPC.SYSTEM_INFO),
  launch: (req) => electron.ipcRenderer.invoke(IPC.LAUNCH, req),
  cancel: () => electron.ipcRenderer.invoke(IPC.CANCEL),
  openGameDir: () => electron.ipcRenderer.invoke(IPC.OPEN_GAME_DIR),
  openModsDir: () => electron.ipcRenderer.invoke(IPC.OPEN_MODS_DIR),
  /** Tashqi havolani (ijtimoiy tarmoq, veb-sayt) tizim brauzerida ochadi. */
  openExternal: (url) => electron.ipcRenderer.invoke(IPC.OPEN_EXTERNAL, url),
  /** Kelajakdagi Sozlamalar ekrani uchun - joriy yo'l `getSystemInfo().gameDir`da keladi.
      Eski papkadagi fayllarni ko'chirmaydi, faqat keyingi yuklab olishlar/ishga tushirish
      qayerga borishini o'zgartiradi. */
  setInstallPath: (path) => electron.ipcRenderer.invoke(IPC.SET_INSTALL_PATH, path),
  pickInstallDirectory: () => electron.ipcRenderer.invoke(IPC.PICK_INSTALL_DIRECTORY),
  downloadFile: (url) => electron.ipcRenderer.invoke(IPC.DOWNLOAD_FILE, url),
  minimizeWindow: () => electron.ipcRenderer.invoke(IPC.WINDOW_MINIMIZE),
  closeWindow: () => electron.ipcRenderer.invoke(IPC.WINDOW_CLOSE),
  toggleMaximizeWindow: () => electron.ipcRenderer.invoke(IPC.WINDOW_TOGGLE_MAXIMIZE),
  getMinecraftVersions: () => electron.ipcRenderer.invoke(IPC.MC_VERSIONS),
  /** Ishga tushirish jarayonidagi hodisalar. Tozalash funksiyasini qaytaradi. */
  onEvent: (cb) => {
    const listener = (_, payload) => cb(payload);
    electron.ipcRenderer.on(IPC.EVENT, listener);
    return () => electron.ipcRenderer.removeListener(IPC.EVENT, listener);
  },
  downloadModAsset: (req) => electron.ipcRenderer.invoke(IPC.MOD_DOWNLOAD, req),
  removeModAsset: (kind, filename, worldName) => electron.ipcRenderer.invoke(IPC.MOD_REMOVE, kind, filename, worldName),
  listInstalledModAssets: () => electron.ipcRenderer.invoke(IPC.MOD_LIST_INSTALLED),
  /** "Plan B" - yuklashdan OLDIN, bog'liqliklarni faqat aniqlab (yuklamasdan) qaytaradi -
      renderer bo'sh bo'lmasa tasdiqlash oynasini ko'rsatadi. */
  checkModDependencies: (modrinthProjectId, gameVersion, loader, kind, worldName) => electron.ipcRenderer.invoke(IPC.MOD_CHECK_DEPENDENCIES, modrinthProjectId, gameVersion, loader, kind, worldName),
  /** Shu profilda (versiya+loader) shaderlar umuman ishlay oladimi - Shaderlar bo'limi
      shunga qarab "O'rnatish" yoki "Iris kerak" yo'lini tanlaydi. */
  checkShaderSupport: (gameVersion, loader) => electron.ipcRenderer.invoke(IPC.MOD_CHECK_SHADER_SUPPORT, gameVersion, loader),
  /** Mod/model yuklab olish jarayonidagi hodisalar. Tozalash funksiyasini qaytaradi. */
  onModEvent: (cb) => {
    const listener = (_, payload) => cb(payload);
    electron.ipcRenderer.on(IPC.MOD_EVENT, listener);
    return () => electron.ipcRenderer.removeListener(IPC.MOD_EVENT, listener);
  },
  downloadMap: (req) => electron.ipcRenderer.invoke(IPC.MAP_DOWNLOAD, req),
  removeMap: (worldName) => electron.ipcRenderer.invoke(IPC.MAP_REMOVE, worldName),
  listInstalledMaps: () => electron.ipcRenderer.invoke(IPC.MAP_LIST_INSTALLED),
  /** Xarita yuklab-o'rnatish jarayonidagi hodisalar. Tozalash funksiyasini qaytaradi. */
  onMapEvent: (cb) => {
    const listener = (_, payload) => cb(payload);
    electron.ipcRenderer.on(IPC.MAP_EVENT, listener);
    return () => electron.ipcRenderer.removeListener(IPC.MAP_EVENT, listener);
  },
  // MCModHub UI mavzulari - o'yin papkasiga o'rnatiladi (mod jar'i ichida emas).
  listUiThemes: () => electron.ipcRenderer.invoke(IPC.UI_THEME_LIST),
  getActiveUiTheme: () => electron.ipcRenderer.invoke(IPC.UI_THEME_ACTIVE),
  setActiveUiTheme: (id) => electron.ipcRenderer.invoke(IPC.UI_THEME_SET_ACTIVE, id),
  installUiThemeFromUrl: (id, url) => electron.ipcRenderer.invoke(IPC.UI_THEME_INSTALL_URL, id, url),
  installUiThemeFromFile: (id, zipPath) => electron.ipcRenderer.invoke(IPC.UI_THEME_INSTALL_FILE, id, zipPath),
  removeUiTheme: (id) => electron.ipcRenderer.invoke(IPC.UI_THEME_REMOVE, id),
  /** Tarmoq xatosi bo'lsa ham har doim IpcResult.ok=true qaytaradi (main process hech qachon
      xato tashlamaydi) - Supabase kontenti baribir ko'rinishi uchun. `offset` - "Yana yuklash"
      navbatdagi sahifani so'rashi uchun, qattiq chegara yo'q. `query` berilsa - butun Modrinth
      katalogi bo'yicha (mahalliy yuklangan bo'lak emas) qidiruv qilinadi. */
  searchModrinthMods: (offset, gameVersion, query, projectType) => electron.ipcRenderer.invoke(IPC.MR_SEARCH_MODS, offset, gameVersion, query, projectType),
  getModrinthModDetail: (slug, gameVersion, projectType) => electron.ipcRenderer.invoke(IPC.MR_MOD_DETAIL, slug, gameVersion, projectType),
  /** Katalogga mos kelmagan (orfan) o'rnatilgan fayl uchun - fayl nomidan Modrinth'da ANIQ
      mos loyihani qidirib, faqat nom/rasm olish uchun (yuklab olish emas). Topilmasa `null`. */
  findModByFilename: (filename) => electron.ipcRenderer.invoke(IPC.MR_FIND_BY_FILENAME, filename),
  /** Modlar bo'limidagi versiya filtri uchun - Modrinth'ning O'ZI qo'llab-quvvatlaydigan
      release versiyalari (Mojang reestri emas: u yerda Modrinth bilmaydigan versiyalar ham
      bor, ular tanlansa ro'yxat doim bo'sh chiqardi). */
  getModrinthGameVersions: () => electron.ipcRenderer.invoke(IPC.MR_GAME_VERSIONS),
  /** Kartalar/detal darhol (ingliz tilida) ko'rsatiladi - bu fon rejimida, ALOHIDA so'raladi,
      natija tayyor bo'lgach matn jimgina yangilanadi (sahifa kutib turmaydi). Har bir matn
      uchun alohida so'rov emas - bitta massiv, bitta chaqiruv. Xato/kvota tugagan bo'lsa asl
      (ingliz) matnlarni o'zgarishsiz qaytaradi - UI hech qachon buzilmaydi. */
  translateBatch: (texts) => electron.ipcRenderer.invoke(IPC.TRANSLATE_BATCH, texts),
  /** Avtomatik yangilanish - Bunny CDN'dan (faqat o'rnatilgan holatda ishlaydi). */
  getStoredAccount: () => electron.ipcRenderer.invoke("account:get"),
  saveStoredAccount: (data) => electron.ipcRenderer.invoke("account:save", data),
  openWebLogin: () => electron.ipcRenderer.invoke("auth:open-web-login"),
  selectAndUploadSkin: (nickname, token) => electron.ipcRenderer.invoke("skin:upload", { nickname, token }),
  onWebAuthCallback: (cb) => {
    const listener = (_, payload) => cb(payload);
    electron.ipcRenderer.on("auth:web-callback", listener);
    return () => electron.ipcRenderer.removeListener("auth:web-callback", listener);
  },
  checkForUpdates: () => electron.ipcRenderer.invoke(IPC.UPDATE_CHECK),
  quitAndInstallUpdate: () => electron.ipcRenderer.invoke(IPC.UPDATE_QUIT_AND_INSTALL),
  onUpdateEvent: (cb) => {
    const listener = (_, payload) => cb(payload);
    electron.ipcRenderer.on(IPC.UPDATE_EVENT, listener);
    return () => electron.ipcRenderer.removeListener(IPC.UPDATE_EVENT, listener);
  }
};
if (process.contextIsolated) {
  electron.contextBridge.exposeInMainWorld("electron", preload.electronAPI);
  electron.contextBridge.exposeInMainWorld("launcher", launcherApi);
} else {
  window.electron = preload.electronAPI;
  window.launcher = launcherApi;
}

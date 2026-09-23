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
  /** O'rnatish ILDIZINI ochadi (Sozlamalar -> "O'rnatish joyi"). `OPEN_GAME_DIR` esa
      joriy versiya papkasini ochadi - nusxa tizimidan keyin modlar o'sha yerda. */
  OPEN_INSTALL_DIR: "system:open-install-dir",
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
  /** O'rnatilgan faylni fayl menejerida belgilab ko'rsatadi ("Papkada ko'rsatish"). */
  MOD_REVEAL: "mods:reveal",
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
  OPEN_EXTERNAL: "system:open-external",
  /** "O'yin ishga tushmadi" oynasidagi "Antivirusda ruxsat qo'shish" tugmasi - Windows
      Defender'ga o'yin papkasi va java.exe/javaw.exe uchun istisno (exclusion) qo'shadi.
      Faqat Windows'da ishlaydi, UAC orqali foydalanuvchining o'zi tasdiqlashi shart (ko'ring
      `services/antivirus.ts`). */
  ADD_AV_EXCLUSION: "system:add-av-exclusion",
  /** Sozlamalar oynasidagi "Max FPS" slayderi - o'yin papkasidagi `options.txt` faylining
      `maxFps:` qatorini to'g'ridan-to'g'ri o'qiydi/yozadi (ko'ring `services/performance.ts`
      -> `getMaxFps`/`setMaxFps` izohi - Minecraft'ning o'zi bilan BITTA umumiy manba). */
  GET_MAX_FPS: "system:get-max-fps",
  SET_MAX_FPS: "system:set-max-fps",
  /** Renderer'dan cross-origin URL'ni MAIN process orqali yuklab olish. Ba'zi ISP'larda
      (masalan O'zbekistan operatorlari) Chromium renderer'ining `fetch()` chaqirig'i
      Cloudflare edge (cdn.mcmodhub.org) bilan uzilib qoladi va faqat "Failed to fetch"
      xatosini beradi - main process esa Node'ning o'z tarmoq stekini ishlatadi va
      odatda ishlaydi. Skin PNG'ni CustomSkinLoader uchun Supabase'ga ko'chirishda ishlatiladi. */
  FETCH_BYTES: "system:fetch-bytes",
  /** Lobby ovozli aloqasi: tizim darajasidagi mikrofon ruxsati (macOS TCC oynasi / Windows
      maxfiylik sozlamasi). Ko'ring `main/services/permissions.ts`. */
  MIC_REQUEST_ACCESS: "system:mic-request-access",
  /** Game Bridge (guruh bilan o'ynash) - ko'ring `shared/gameBridge.ts`. */
  BRIDGE_LAUNCH: "bridge:launch",
  BRIDGE_STOP: "bridge:stop",
  BRIDGE_EVENT: "bridge:event",
  /** A'zo: liderning LAN manzillarini Minecraft status so'rovi bilan tekshirish. */
  BRIDGE_PROBE_LAN: "bridge:probe-lan",
  /** Guruh o'yini nusxasining manifesti (versiya + mod fayllari xeshlari) - "O'ynash"dan oldingi
      sinxronizatsiya tekshiruvi uchun. Ko'ring `main/services/partyManifest.ts`. */
  PARTY_MANIFEST: "party:manifest",
  /** Guruh ovozli aloqasi ishlab turganda oyna kichraytirilsa ham (o'yin ochilganda shunday bo'ladi) taymerlar va signal
      almashinuvi sekinlashmasin: fon "throttling"i vaqtincha o'chiriladi (`webContents.setBackgroundThrottling`). Doimiy
      o'chirilmaydi - u sahifa ko'rinishi API'sini ham o'zgartiradi (fon video/3D sahna to'xtatilishi shunga tayanadi). */
  SET_BACKGROUND_THROTTLING: "system:set-background-throttling",
  /** Tizim bildirishnomasi (Windows/macOS/Linux) - o'yin oynasi ustida ham ko'rinadi. Qo'lda "Open to LAN" ochadigan
      lider dunyoga kirganda eslatish uchun: launcher shu payt kichraytirilgan va toast ko'rinmaydi. */
  SHOW_NOTIFICATION: "system:show-notification",
  /** Liderning FAOL resurs paketlari/shaderi shu foydalanuvchida bormi (ogohlantirish, to'xtatmaydi). */
  PARTY_PACKS: "party:packs",
  /** Lider tanlagan versiyada guruh o'yinini ochish mumkinmi (loader + e4all)? Play bosilganda so'raladi. */
  PARTY_HOST_SUPPORT: "party:host-support",
  /** A'zo: liderning o'yini ochilishini kutayotganda o'z o'yinini oldindan tayyorlaydi (Java, loader,
      kutubxonalar, modlar) - o'yin manzili kelgach ishga tushirish tezroq bo'ladi. */
  BRIDGE_PREWARM: "bridge:prewarm",
  /** P2P tunnel - ko'ring `main/services/partyTunnel.ts`. */
  TUNNEL_ENTRY_OPEN: "tunnel:entry-open",
  TUNNEL_ENTRY_CLOSE: "tunnel:entry-close",
  TUNNEL_PROBE: "tunnel:probe",
  TUNNEL_DIAL: "tunnel:dial",
  TUNNEL_WRITE: "tunnel:write",
  TUNNEL_FLOW: "tunnel:flow",
  TUNNEL_CLOSE: "tunnel:close",
  TUNNEL_EVENT: "tunnel:event",
  /** Renderer tanlangan versiya/loader o'zgarganda xabar beradi. Main process shundan keyin
      modlar/xaritalar/options.txt bilan ishlaganda AYNAN shu nusxaning papkasidan foydalanadi
      (`instances/{version}-{loader}/`). Bu bo'lmasa 1.20.1 modlari 1.19.2 papkasiga tushib,
      o'yin qulab tushardi - aynan shu muammoni nusxa (instance) tizimi hal qiladi. */
  SET_CURRENT_INSTANCE: "system:set-current-instance",
  /** Skin yuklash uchun fayl tanlash oynasi - faqat PNG (64x64 yoki 64x32 piksel).
      Foydalanuvchi bekor qilsa `null`, fayl tanlasa base64-kodlangan PNG baytlari qaytadi. */
  PICK_SKIN_FILE: "system:pick-skin-file",
  /** OAuth (Google/Discord) orqali kirish - tizim brauzeridan qaytadigan `code`ni ushlaydigan
      lokal (127.0.0.1) server. Uch bosqich: `BEGIN` (tinglashni boshlaydi), `AWAIT` (kod
      kelguncha kutadi), `CANCEL` (bekor qiladi). Ko'ring `main/services/oauthCallback.ts`. */
  OAUTH_BEGIN: "oauth:begin",
  OAUTH_AWAIT: "oauth:await",
  OAUTH_CANCEL: "oauth:cancel"
};
const launcherApi = {
  /** Joriy tizim ('win32' | 'darwin' | 'linux'). `getSystemInfo()` ichida ham bor, lekin u
      asinxron - TitleBar kabi joylarda esa qiymat BIRINCHI chizishdayoq kerak (macOS'da
      oynaning o'z tugmalari chizilmasligi kerak, aks holda tizimning "svetofor" tugmalari
      bilan ikki marta takrorlanardi). */
  platform: process.platform,
  getSystemInfo: () => electron.ipcRenderer.invoke(IPC.SYSTEM_INFO),
  launch: (req) => electron.ipcRenderer.invoke(IPC.LAUNCH, req),
  cancel: () => electron.ipcRenderer.invoke(IPC.CANCEL),
  openGameDir: () => electron.ipcRenderer.invoke(IPC.OPEN_GAME_DIR),
  openModsDir: () => electron.ipcRenderer.invoke(IPC.OPEN_MODS_DIR),
  openInstallDir: () => electron.ipcRenderer.invoke(IPC.OPEN_INSTALL_DIR),
  /** Tashqi havolani (ijtimoiy tarmoq, veb-sayt) tizim brauzerida ochadi. */
  openExternal: (url) => electron.ipcRenderer.invoke(IPC.OPEN_EXTERNAL, url),
  /** "O'yin ishga tushmadi" oynasidagi "Antivirusda ruxsat qo'shish" tugmasi - Windows
      Defender'ga o'yin papkasi/java.exe uchun istisno qo'shishga urinadi (UAC ko'rsatiladi,
      foydalanuvchi o'zi tasdiqlashi shart). Faqat Windows'da ma'noga ega - ko'ring
      `services/antivirus.ts`. */
  addAvExclusion: () => electron.ipcRenderer.invoke(IPC.ADD_AV_EXCLUSION),
  /** Sozlamalar oynasidagi "Max FPS" slayderi - o'yin papkasidagi `options.txt`ning
      `maxFps:` qatorini o'qiydi/yozadi (Minecraft'ning o'zi bilan bitta umumiy manba). */
  getMaxFps: () => electron.ipcRenderer.invoke(IPC.GET_MAX_FPS),
  setMaxFps: (value) => electron.ipcRenderer.invoke(IPC.SET_MAX_FPS, value),
  /** Tanlangan versiya/loader o'zgarganda MAJBURIY chaqiriladi - shundan keyin modlar,
      xaritalar va grafik sozlamalari AYNAN shu versiyaning shaxsiy papkasida saqlanadi
      (`instances/{version}-{loader}/`). Chaqirilmasa mod operatsiyalari "versiya tanlanmagan"
      xatosini qaytaradi. */
  setCurrentInstance: (version, loader) => electron.ipcRenderer.invoke(IPC.SET_CURRENT_INSTANCE, { version, loader }),
  /** Cross-origin URL'ni MAIN process orqali yuklab olish (renderer `fetch()` cdn.mcmodhub.org
      bilan ba'zi ISP'larda "Failed to fetch" berardi - main process ishlaydi). Baytlar
      IPC orqali `ArrayBuffer` sifatida uzatiladi (JSON raqam-massivi emas — 10-20 barobar
      tez), renderer'da `Uint8Array` bilan o'ralib qaytadi. */
  fetchBytes: async (url) => {
    const res = await electron.ipcRenderer.invoke(IPC.FETCH_BYTES, url);
    if (!res.ok || !res.data) return { ok: false, error: res.error };
    return { ok: true, data: { bytes: new Uint8Array(res.data.bytes), contentType: res.data.contentType } };
  },
  /** Kelajakdagi Sozlamalar ekrani uchun - joriy yo'l `getSystemInfo().gameDir`da keladi.
      Eski papkadagi fayllarni ko'chirmaydi, faqat keyingi yuklab olishlar/ishga tushirish
      qayerga borishini o'zgartiradi. */
  setInstallPath: (path) => electron.ipcRenderer.invoke(IPC.SET_INSTALL_PATH, path),
  pickInstallDirectory: () => electron.ipcRenderer.invoke(IPC.PICK_INSTALL_DIRECTORY),
  /** Skin PNG faylini tanlash oynasini ochadi. Bekor qilsa `null`, tanlasa base64 PNG qaytadi.
      O'lchami (64x64 yoki 64x32) main process tomonida tekshiriladi. */
  pickSkinFile: () => electron.ipcRenderer.invoke(IPC.PICK_SKIN_FILE),
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
  revealModAsset: (kind, filename, worldName) => electron.ipcRenderer.invoke(IPC.MOD_REVEAL, kind, filename, worldName),
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
  searchModrinthMods: (offset, gameVersion, query, projectType, loader) => electron.ipcRenderer.invoke(IPC.MR_SEARCH_MODS, offset, gameVersion, query, projectType, loader),
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
  /** Lobby ovozli aloqasi uchun tizim darajasidagi mikrofon ruxsati. macOS'da birinchi marta
      tizim oynasini ko'rsatadi; Windows'da maxfiylik sozlamasi holatini qaytaradi. */
  requestMicrophoneAccess: () => electron.ipcRenderer.invoke(IPC.MIC_REQUEST_ACCESS),
  /** Game Bridge: guruh o'yini. Lider - o'yin + e4mc manzilini log'dan kuzatish; a'zo -
      liderning manziliga to'g'ridan-to'g'ri ulanish. `mock: true` - simulyatsiya. */
  bridgeLaunch: (req) => electron.ipcRenderer.invoke(IPC.BRIDGE_LAUNCH, req),
  bridgeStop: () => electron.ipcRenderer.invoke(IPC.BRIDGE_STOP),
  onBridgeEvent: (cb) => {
    const listener = (_, payload) => cb(payload);
    electron.ipcRenderer.on(IPC.BRIDGE_EVENT, listener);
    return () => electron.ipcRenderer.removeListener(IPC.BRIDGE_EVENT, listener);
  },
  bridgeProbeLan: (lan) => electron.ipcRenderer.invoke(IPC.BRIDGE_PROBE_LAN, lan),
  /** Guruh o'yini nusxasining manifesti (versiya + mod fayllari xeshlari) - lider "O'ynash"ni
      bosganda a'zolar bilan solishtirish uchun (`lib/lobby/preflight.ts`). */
  getPartyManifest: (target) => electron.ipcRenderer.invoke(IPC.PARTY_MANIFEST, target),
  /** Tizim bildirishnomasi (o'yin oynasi ustida ham ko'rinadi) - masalan qo'lda LAN ochadigan liderga eslatma. */
  showNotification: (n) => electron.ipcRenderer.invoke(IPC.SHOW_NOTIFICATION, n),
  /** Guruh ovozi ishlab turganda `false`: launcher kichraytirilganda ham (o'yin paytida) taymerlar/signal sekinlashmaydi. */
  setBackgroundThrottling: (allowed) => electron.ipcRenderer.invoke(IPC.SET_BACKGROUND_THROTTLING, allowed),
  /** Liderning faol resurs paketlari/shaderi shu foydalanuvchining tanlangan nusxasida bormi (`null` - hammasi bor). */
  checkPartyPacks: (target, refs) => electron.ipcRenderer.invoke(IPC.PARTY_PACKS, target, refs),
  /** Lider shu versiyada guruh o'yinini ochishi mumkinmi (loader bor va e4all shu versiya uchun mavjudmi). */
  checkPartyHostSupport: (target) => electron.ipcRenderer.invoke(IPC.PARTY_HOST_SUPPORT, target),
  /** A'zo: liderning o'yini ochilishini kutayotganda o'z o'yinini oldindan tayyorlaydi (ishga tushirmaydi). */
  bridgePrewarm: (req) => electron.ipcRenderer.invoke(IPC.BRIDGE_PREWARM, req),
  /** P2P tunnel: main 127.0.0.1 TCP soketlari <-> renderer WebRTC DataChannel'lari. */
  tunnelOpenEntry: () => electron.ipcRenderer.invoke(IPC.TUNNEL_ENTRY_OPEN),
  tunnelCloseEntry: () => electron.ipcRenderer.invoke(IPC.TUNNEL_ENTRY_CLOSE),
  tunnelProbe: (timeoutMs) => electron.ipcRenderer.invoke(IPC.TUNNEL_PROBE, timeoutMs),
  tunnelDial: () => electron.ipcRenderer.invoke(IPC.TUNNEL_DIAL),
  tunnelWrite: (id, data) => electron.ipcRenderer.send(IPC.TUNNEL_WRITE, id, data),
  tunnelFlow: (id, paused) => electron.ipcRenderer.send(IPC.TUNNEL_FLOW, id, paused),
  tunnelClose: (id) => electron.ipcRenderer.send(IPC.TUNNEL_CLOSE, id),
  onTunnelEvent: (cb) => {
    const listener = (_, payload) => cb(payload);
    electron.ipcRenderer.on(IPC.TUNNEL_EVENT, listener);
    return () => electron.ipcRenderer.removeListener(IPC.TUNNEL_EVENT, listener);
  },
  /** OAuth (Google/Discord) kirishi va akkauntga ulash: `begin` lokal callback serverini ochadi
      (tayyor bo'lgach hal bo'ladi), `await` brauzerdan qaytgan `code`ni kutadi (xato bo'lsa
      `error`da sabab: `cancelled` | `timeout` | `denied` | `port-busy` | `failed`, ba'zan
      `failed:<provayder_kodi>`), `cancel` urinishni to'xtatadi. Brauzerni ochish - mavjud
      `openExternal` orqali. */
  oauthBegin: (page) => electron.ipcRenderer.invoke(IPC.OAUTH_BEGIN, page),
  oauthAwait: () => electron.ipcRenderer.invoke(IPC.OAUTH_AWAIT),
  oauthCancel: () => electron.ipcRenderer.invoke(IPC.OAUTH_CANCEL),
  /** Avtomatik yangilanish - Bunny CDN'dan (faqat o'rnatilgan holatda ishlaydi). */
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

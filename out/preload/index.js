"use strict";
const electron = require("electron");
const preload = require("@electron-toolkit/preload");
const IPC = {
  JAVA_LIST: "java:list",
  JAVA_INSTALL: "java:install",
  JAVA_INSTALL_EVENT: "java:install-event",
  JAVA_SET_PREFERRED: "java:set-preferred",
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
  /** Arena mod profili: arena tanlanganda foydalanuvchi modlari zaxiraga olinib, arena modlari qo'yiladi;
      "Oddiy Dunyo" qaytganda hammasi joyiga qaytadi. Ko'ring `main/services/arenaPack.ts`. */
  ARENA_APPLY_PACK: "arena:apply-pack",
  ARENA_APPLY_RESOURCE_PACK: "arena:apply-resource-pack",
  ARENA_RESTORE_MODS: "arena:restore-mods",
  ARENA_PACK_STATUS: "arena:pack-status",
  ARENA_PACK_EVENT: "arena:pack-event",
  /** Arena dunyosi seyfi: o'yindan oldin seyfdan ochish, o'yin yopilgach seyfga olish. */
  ARENA_UNVAULT_WORLD: "arena:unvault-world",
  ARENA_BEGIN_SESSION: "arena:begin-session",
  /** NeoTerra UI modining mavzulari - o'yin papkasiga o'rnatish/tanlash/o'chirish.
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
  UPDATE_PENDING: "update:pending",
  /** Tashqi havolani (Telegram/Discord/veb-sayt) tizim brauzerida ochadi (`shell.openExternal`) -
      Hamjamiyat bo'limi kabi joylarda ijtimoiy tarmoq havolalari uchun aniq, to'g'ridan-to'g'ri
      yo'l sifatida ishlatiladi. */
  OPEN_EXTERNAL: "system:open-external",
  /** "O'yin ishga tushmadi" oynasidagi "Antivirusda ruxsat qo'shish" tugmasi - Windows
      Defender'ga o'yin papkasi va java.exe/javaw.exe uchun istisno (exclusion) qo'shadi.
      Faqat Windows'da ishlaydi, UAC orqali foydalanuvchining o'zi tasdiqlashi shart (ko'ring
      `services/antivirus.ts`). */
  ADD_AV_EXCLUSION: "system:add-av-exclusion",
  /** Xato oynasidagi "Aybdor modni o'chirib qayta ishga tushirish" - jar'larni `mods-disabled/`ga oladi. */
  DISABLE_MODS: "mods:disable-files",
  /** Sozlamalar oynasidagi "Max FPS" slayderi - o'yin papkasidagi `options.txt` faylining
      `maxFps:` qatorini to'g'ridan-to'g'ri o'qiydi/yozadi (ko'ring `services/performance.ts`
      -> `getMaxFps`/`setMaxFps` izohi - Minecraft'ning o'zi bilan BITTA umumiy manba). */
  GET_MAX_FPS: "system:get-max-fps",
  SET_MAX_FPS: "system:set-max-fps",
  /** Sozlamalar -> Optimizatsiya bo'limidagi 4 ta kalit (`OptimizationSettings`), `config.json`da saqlanadi. */
  GET_OPTIMIZATION: "optimization:get",
  SET_OPTIMIZATION: "optimization:set",
  /** Xato oynasidagi "🔧 Muammoni hal qilish va O'ynash" tugmasi - Mesa'ni tayyorlaydi va shu
      videokarta uchun dasturiy grafika rejimini eslab qoladi (ko'ring `services/softwareGl.ts`). */
  ENABLE_SOFTWARE_GL: "system:enable-software-gl",
  /** Sozlamalar -> Unumdorlik: "OpenGL yordamchi rejimi (GLFW 65542 xatosi uchun)" kaliti - foydalanuvchi
      uni o'chirsa, drayver muammosida ham o'yin CPU rejimiga avtomatik o'tmaydi (qayta yoqish - qo'lda). */
  GET_SOFTWARE_GL_ENABLED: "system:get-software-gl-enabled",
  SET_SOFTWARE_GL_ENABLED: "system:set-software-gl-enabled",
  /** Renderer'dan cross-origin URL'ni MAIN process orqali yuklab olish. Ba'zi ISP'larda
      (masalan O'zbekistan operatorlari) Chromium renderer'ining `fetch()` chaqirig'i
      Cloudflare edge (cdn.mcmodhub.org) bilan uzilib qoladi va faqat "Failed to fetch"
      xatosini beradi - main process esa Node'ning o'z tarmoq stekini ishlatadi va
      odatda ishlaydi. Skin PNG'ni CustomSkinLoader uchun Supabase'ga ko'chirishda ishlatiladi. */
  FETCH_BYTES: "system:fetch-bytes",
  /** Profil rasmi (PRO) - saytning `/api/profile-upload` (R2) manziliga MAIN process orqali yuklanadi: renderer'dan
      cross-origin POST CORS'da to'xtaydi. Qaytadi: ommaviy CDN havolasi. */
  PROFILE_UPLOAD_AVATAR: "profile:upload-avatar",
  /** Kiber-Do'kon kosmetika fayli (yopiq bucket) - sessiya bilan imzolangan havola olinib, baytlar xotiraga yuklanadi.
      Ko'ring `main/services/cosmeticAssets.ts`. */
  COSMETIC_ASSET: "cosmetics:asset",
  /** Guruh ovozi/P2P tunneli uchun Cloudflare TURN ma'lumotnomasi (sayt API'si orqali,
      qisqa muddatli) - ko'ring `main/services/lobbyTurn.ts`. */
  LOBBY_TURN_CREDENTIALS: "lobby:turn-credentials",
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
  /** A'zo: "Oddiy Dunyo" guruh o'yinidan oldin modlarini liderniki bilan tenglash (ortiqchasi zaxiraga, yetishmagani Modrinth'dan). */
  PARTY_SYNC_MODS: "party:sync-mods",
  /** Renderer: guruh yoki guruh o'yini faol - "X" bosilganda oyna yopilmaydi, yashiriladi (ovoz, presence va P2P tunnel shu
      oynada yashaydi: oyna yopilsa lider o'yinidagi do'stlar uzilib qolardi). */
  LOBBY_KEEPALIVE: "lobby:keepalive",
  /** Main -> renderer: launcher oynasi ekranda ko'rinadimi (yashirin/kichraytirilgan - `false`). O'yin yoki guruh paytida
      Chromium throttling'i o'chiriladi va `document.hidden` doim `false` bo'lib qoladi - renderer haqiqiy holatni shundan
      biladi (`lib/appSleep.ts`). */
  WINDOW_VISIBILITY: "window:visibility",
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
  OAUTH_CANCEL: "oauth:cancel",
  /** Ish stolidagi maskot paneli ochildi/yopildi - oyna o'lchami shunga moslanadi
      (`main/services/mascotWindow.ts`). */
  MASCOT_SET_EXPANDED: "mascot:set-expanded",
  /** Maskotni sudrash boshlandi/tugadi (`'start' | 'end'`) - oynani asosiy jarayon ko'chiradi. */
  MASCOT_DRAG: "mascot:drag",
  /** Asosiy jarayon -> maskot: kursor holati va tizimning bo'sh turish vaqti (`MascotTick`). */
  MASCOT_TICK: "mascot:tick",
  /** Asosiy jarayon -> maskot: uloqtirilgan maskotning parvozi (`MascotFlight`). */
  MASCOT_FLIGHT: "mascot:flight",
  /** Maskot -> asosiy jarayon: React tayyor, xabarlarni qabul qila oladi (kunlik salom shundan keyin). */
  MASCOT_READY: "mascot:ready",
  /** Asosiy jarayon -> maskot: tepada chiqadigan xabar (`MascotBubble`). */
  MASCOT_BUBBLE: "mascot:bubble",
  /** Asosiy jarayon -> maskot: xabar uchun joy (`MascotBubbleSpace`): ekran tepasida bo'lsa xabar maskot ostida chiqadi. */
  MASCOT_BUBBLE_SPACE: "mascot:bubble-space",
  /** Maskot -> asosiy jarayon: xabar maskot OSTIDA ko'rinishi uchun yopiq oyna pastga kengaysin (`true`) yoki qaytsin (`false`). */
  MASCOT_BUBBLE_ROOM: "mascot:bubble-room",
  /** Asosiy jarayon -> maskot: tugma (Ctrl+S) bilan yopildi/qaytarildi (`MascotVisibility`). */
  MASCOT_VISIBILITY: "mascot:visibility",
  /** Asosiy jarayon -> maskot: yopish/ochish tugmasi qaysi ekani (`MascotHotkey`). */
  MASCOT_HOTKEY: "mascot:hotkey",
  /** Sozlamalar -> asosiy jarayon: yopish/ochish tugmasini o'qish/o'zgartirish (`MascotHotkeyState`; `null` - standartga qaytarish) */
  MASCOT_GET_HOTKEY: "mascot:get-hotkey",
  MASCOT_SET_HOTKEY: "mascot:set-hotkey",
  /** Sozlamalar tugmani yozib olayotganda (`true`) joriy tugma vaqtincha bo'shatiladi - aks holda u oynaga yetib bormay maskotni
      yopib-ochib yuborardi. `false` - qayta ulanadi. Renderer qaytarmay qolsa ham asosiy jarayon o'zi qaytaradi (`CAPTURE_MAX_MS`). */
  MASCOT_HOTKEY_CAPTURE: "mascot:hotkey-capture",
  /** Sozlamalar (launcher) <-> asosiy jarayon: "Maskot ko'rinsin" kaliti (`boolean`, `settings.json`da). O'chiq bo'lsa maskot oynasi
      yaratilmaydi va yopish/ochish tugmasi ulanmaydi; o'zgarsa maskot shu zahoti yo'qoladi/qaytadi (`main/services/mascotWindow.ts`). */
  MASCOT_GET_ENABLED: "mascot:get-enabled",
  MASCOT_SET_ENABLED: "mascot:set-enabled",
  /** Launcher -> asosiy jarayon: kirgan foydalanuvchi nomi (salomlashuv uchun `settings.json`ga yoziladi). */
  MASCOT_SET_USERNAME: "mascot:set-username",
  /** Maskot -> asosiy jarayon: "O'yinni yoqish" - katta launcher OCHILMAYDI. */
  MASCOT_LAUNCH_GAME: "launch-game",
  /** Maskot -> asosiy jarayon: katta launcher oynasini yaratish (bo'lmasa) va ko'rsatish. */
  MASCOT_OPEN_LAUNCHER: "open-main-launcher",
  /** Launcher -> asosiy jarayon: maskot launcher yopiq paytda o'yinni ochishi uchun sozlamalar (`MascotLaunchProfile`). */
  MASCOT_REMEMBER_LAUNCH: "mascot:remember-launch",
  /** Asosiy jarayon -> maskot: ishga tushirishdan oldin hisob tokenlarini so'raydi (`MascotPrepareLaunch`). */
  MASCOT_PREPARE_LAUNCH: "mascot:prepare-launch",
  /** Maskot -> asosiy jarayon: so'ralgan tokenlar (`MascotLaunchExtras`). Faqat xotirada yashaydi. */
  MASCOT_LAUNCH_EXTRAS: "mascot:launch-extras",
  /** Maskot -> asosiy jarayon: "RAM tozalash" (Windows keshi + yoqilgan bo'lsa axlat fayllar va DNS). */
  MASCOT_CLEAN_RAM: "mascot:clean-ram",

  // --- NeoTerra Screenshots ---
  screenshots: {
    list: () => electron.ipcRenderer.invoke("screenshots:list"),
    reveal: (filePath) => electron.ipcRenderer.invoke("screenshots:reveal", filePath),
    delete: (filePath) => electron.ipcRenderer.invoke("screenshots:delete", filePath),
    copy: (filePath) => electron.ipcRenderer.invoke("screenshots:copy", filePath),
    openDir: () => electron.ipcRenderer.invoke("screenshots:open-dir")
  },
  // --- NeoTerra Playtime ---
  playtime: {
    get: () => electron.ipcRenderer.invoke("playtime:get")
  },
  // --- NeoTerra Custom Wallpaper ---
  wallpaper: {
    pick: () => electron.ipcRenderer.invoke("wallpaper:pick"),
    get: () => electron.ipcRenderer.invoke("wallpaper:get"),
    reset: () => electron.ipcRenderer.invoke("wallpaper:reset")
  },
  // --- NeoTerra Discord RPC ---
  discord: {
    getStatus: () => electron.ipcRenderer.invoke("discord:get-status"),
    setEnabled: (enabled) => electron.ipcRenderer.invoke("discord:set-enabled", enabled)
  },

  /** Yuksalish (Shaxsiy Fokus), `main/services/focus.ts`. Holat: kalitlar, rejalar, bugungi namoz vaqtlari (`FocusState`). */
  FOCUS_GET_STATE: "focus:get-state",
  /** Sozlamalar -> Yuksalish kalitlari (`Partial<FocusToggles>`); namoz rejalashtiruvchisi shu zahoti yoqiladi/to'xtaydi. */
  FOCUS_SET_TOGGLES: "focus:set-toggles",
  /** Reja qo'shish (matn) / o'chirish (id) / bajarildi belgisi (id). `settings.json`da `createdAt` bilan saqlanadi. */
  FOCUS_ADD_TASK: "focus:add-task",
  FOCUS_REMOVE_TASK: "focus:remove-task",
  FOCUS_TOGGLE_TASK: "focus:toggle-task",
  /** Asosiy jarayon -> barcha oynalar: holat o'zgardi (`FocusState`). */
  FOCUS_STATE: "focus:state",
  /** Launcher -> asosiy jarayon: PRO tugash vaqti (ISO) yoki `null`. PRO'da rejalar 24 soatdan keyin o'chirilmaydi. */
  FOCUS_SET_PRO: "focus:set-pro",
  /** Asosiy jarayon -> maskot: namozga 15 daqiqa qoldi (`FocusPrayerReminder`). */
  FOCUS_PRAYER_SOON: "focus:prayer-soon",
  /** Maskot -> asosiy jarayon: signal olindi, eslatma oynasini ochish (eslatma id'si). */
  FOCUS_SHOW_REMINDER: "focus:show-reminder",
  /** Eslatma oynasi -> asosiy jarayon: ko'rsatiladigan eslatma (`FocusPrayerReminder | null`). */
  FOCUS_GET_REMINDER: "focus:get-reminder",
  /** Sozlamalardagi "Sinab ko'rish": keyingi namoz uchun eslatmani hozir ko'rsatadi. */
  FOCUS_PREVIEW_REMINDER: "focus:preview-reminder",
  /** Maskot menyusi -> asosiy jarayon: oyna ochish (`FocusWindowKind`). */
  FOCUS_OPEN: "focus:open",
  /** Fokus oynasi o'zini yopadi (X, tashqariga bosish, 40 s tugadi). */
  FOCUS_CLOSE: "focus:close",
  /** Rejalar oynasi: 📌 - `setAlwaysOnTop(true, 'screen-saver')` yoqiladi/o'chiriladi. */
  FOCUS_SET_PINNED: "focus:set-pinned",
  /** Qadalgan rejalar oynasi: sichqoncha 📌 ustidami (faqat shu tugma bosiladi, qolgan joy orqasiga o'tkazadi). */
  FOCUS_PIN_HOVER: "focus:pin-hover",
  /** Launcher -> asosiy jarayon: oyna hodisalarni tinglashni boshladi. Launcher yopiq paytda
      (maskotdan boshlangan o'yinda) o'tkazib yuborilgan xato yoki "o'yin ishlayapti" holati shundan keyin qaytariladi. */
  LAUNCHER_READY: "launcher:ready",
  /** Pet sinxroni: asosiy jarayon -> renderer (kanalga ulanish / chiqish / yuborish), renderer -> asosiy (kelgan voqea). */
  PET_SYNC_EVENT: "pet-sync:event",
  PET_SYNC_INCOMING: "pet-sync:incoming"
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
  /** Xato oynasidagi "Aybdor modni o'chirib qayta ishga tushirish" - jar'lar nusxaning `mods-disabled/`iga olinadi. */
  disableMods: (version, loader, files) => electron.ipcRenderer.invoke(IPC.DISABLE_MODS, version, loader, files),
  /** Sozlamalar oynasidagi "Max FPS" slayderi - o'yin papkasidagi `options.txt`ning
      `maxFps:` qatorini o'qiydi/yozadi (Minecraft'ning o'zi bilan bitta umumiy manba). */
  getMaxFps: () => electron.ipcRenderer.invoke(IPC.GET_MAX_FPS),
  /** Sozlamalar -> Optimizatsiya kalitlari (`config.json`) */
  getOptimization: () => electron.ipcRenderer.invoke(IPC.GET_OPTIMIZATION),
  setOptimization: (patch) => electron.ipcRenderer.invoke(IPC.SET_OPTIMIZATION, patch),
  setMaxFps: (value) => electron.ipcRenderer.invoke(IPC.SET_MAX_FPS, value),
  /** Xato oynasidagi "🔧 Muammoni hal qilish va O'ynash" - dasturiy grafika (Mesa) rejimini tayyorlab yoqadi. */
  enableSoftwareGl: () => electron.ipcRenderer.invoke(IPC.ENABLE_SOFTWARE_GL),
  /** Sozlamalar -> Unumdorlik: "OpenGL yordamchi rejimi (GLFW 65542 xatosi uchun)" kaliti. */
  getSoftwareGlEnabled: () => electron.ipcRenderer.invoke(IPC.GET_SOFTWARE_GL_ENABLED),
  setSoftwareGlEnabled: (value) => electron.ipcRenderer.invoke(IPC.SET_SOFTWARE_GL_ENABLED, value),
  /** Tanlangan versiya/loader o'zgarganda MAJBURIY chaqiriladi - shundan keyin modlar,
      xaritalar va grafik sozlamalari AYNAN shu versiyaning shaxsiy papkasida saqlanadi
      (`instances/{version}-{loader}/`). Chaqirilmasa mod operatsiyalari "versiya tanlanmagan"
      xatosini qaytaradi. */
  setCurrentInstance: (version, loader) => electron.ipcRenderer.invoke(IPC.SET_CURRENT_INSTANCE, { version, loader }),
  /** Cross-origin URL'ni MAIN process orqali yuklab olish (renderer `fetch()` cdn.mcmodhub.org
      bilan ba'zi ISP'larda "Failed to fetch" berardi - main process ishlaydi). Baytlar
      IPC orqali `ArrayBuffer` sifatida uzatiladi (JSON raqam-massivi emas — 10-20 barobar
      tez), renderer'da `Uint8Array` bilan o'ralib qaytadi. */
  apiRequest: (url, options) => electron.ipcRenderer.invoke("system:api-request", { url, options }),
  setLauncherAction: (action) => electron.ipcRenderer.invoke("system:set-launcher-action", action),
  getLauncherAction: () => electron.ipcRenderer.invoke("system:get-launcher-action"),
  listScreenshots: () => electron.ipcRenderer.invoke("screenshots:list"),
  revealScreenshot: (filePath) => electron.ipcRenderer.invoke("screenshots:reveal", filePath),
  deleteScreenshot: (filePath) => electron.ipcRenderer.invoke("screenshots:delete", filePath),
  copyScreenshot: (filePath) => electron.ipcRenderer.invoke("screenshots:copy", filePath),
  openScreenshotsDir: () => electron.ipcRenderer.invoke("screenshots:open-dir"),
  getPlaytime: () => electron.ipcRenderer.invoke("playtime:get"),
  pickWallpaper: () => electron.ipcRenderer.invoke("wallpaper:pick"),
  getWallpaper: () => electron.ipcRenderer.invoke("wallpaper:get"),
  resetWallpaper: () => electron.ipcRenderer.invoke("wallpaper:reset"),
  listJavaRuntimes: () => electron.ipcRenderer.invoke("java:list"),
  installJavaRuntime: (major) => electron.ipcRenderer.invoke("java:install", major),
  onJavaProgress: (cb) => {
    const listener = (_, payload) => cb(payload);
    electron.ipcRenderer.on("java:progress", listener);
    return () => electron.ipcRenderer.removeListener("java:progress", listener);
  },
  getDiscordStatus: () => electron.ipcRenderer.invoke("discord:get-status"),
  setDiscordEnabled: (val) => electron.ipcRenderer.invoke("discord:set-enabled", val),
  onSuspend: (cb) => {
    const listener = (_, suspend) => cb(suspend);
    electron.ipcRenderer.on("system:suspend", listener);
    return () => electron.ipcRenderer.removeListener("system:suspend", listener);
  },

  fetchBytes: async (url) => {
    const res = await electron.ipcRenderer.invoke(IPC.FETCH_BYTES, url);
    if (!res.ok || !res.data) return { ok: false, error: res.error };
    return { ok: true, data: { bytes: new Uint8Array(res.data.bytes), contentType: res.data.contentType } };
  },
  /** Profil rasmini (PRO) sayt orqali R2 ga yuklaydi - ommaviy havola qaytadi (`IPC.PROFILE_UPLOAD_AVATAR`). */
  uploadProfileAvatar: (bytes, mime, sessionToken) => {
    const buf = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
    return electron.ipcRenderer.invoke(IPC.PROFILE_UPLOAD_AVATAR, { bytes: buf, mime, sessionToken });
  },
  /** Kiber-Do'kon kosmetika fayli (yopiq bucket): main process sessiya bilan imzolangan havola olib, baytlarni xotiraga
      yuklaydi. `error === 'login'` - akkauntga kirilmagan. */
  fetchCosmeticAsset: async (id, sessionToken) => {
    const res = await electron.ipcRenderer.invoke(IPC.COSMETIC_ASSET, { id, sessionToken });
    if (!res.ok || !res.data) return { ok: false, error: res.error };
    return { ok: true, data: { bytes: new Uint8Array(res.data.bytes), format: res.data.format } };
  },
  /** Guruh ovozi/P2P tunneli uchun Cloudflare TURN ma'lumotnomasi (sayt API'si orqali,
      qisqa muddatli) - `data: null` TURN yo'qligini bildiradi, xato emas (STUN bilan davom etiladi). */
  getTurnCredentials: (sessionToken) => electron.ipcRenderer.invoke(IPC.LOBBY_TURN_CREDENTIALS, sessionToken),
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
  /** `onEvent` ulangach chaqiriladi: launcher yopiq paytda o'tkazib yuborilgan xato yoki "o'yin ishlayapti" holati qaytariladi. */
  notifyLauncherReady: () => electron.ipcRenderer.send(IPC.LAUNCHER_READY),
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
  // Arena mod profili va dunyo seyfi (`main/services/arenaPack.ts`).
  arenaApplyPack: (req) => electron.ipcRenderer.invoke(IPC.ARENA_APPLY_PACK, req),
  arenaApplyResourcePack: (req) => electron.ipcRenderer.invoke(IPC.ARENA_APPLY_RESOURCE_PACK, req),
  arenaRestoreMods: () => electron.ipcRenderer.invoke(IPC.ARENA_RESTORE_MODS),
  arenaPackStatus: (version, loader) => electron.ipcRenderer.invoke(IPC.ARENA_PACK_STATUS, version, loader),
  arenaUnvaultWorld: (req) => electron.ipcRenderer.invoke(IPC.ARENA_UNVAULT_WORLD, req),
  arenaBeginSession: (req) => electron.ipcRenderer.invoke(IPC.ARENA_BEGIN_SESSION, req),
  onArenaPackEvent: (cb) => {
    const listener = (_, payload) => cb(payload);
    electron.ipcRenderer.on(IPC.ARENA_PACK_EVENT, listener);
    return () => electron.ipcRenderer.removeListener(IPC.ARENA_PACK_EVENT, listener);
  },
  // NeoTerra UI mavzulari - o'yin papkasiga o'rnatiladi (mod jar'i ichida emas).
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
  /** A'zo: "Oddiy Dunyo" guruh o'yinidan oldin modlarini liderniki bilan tenglaydi (ortiqchasi zaxiraga, yetishmagani Modrinth'dan). */
  partySyncMods: (req) => electron.ipcRenderer.invoke(IPC.PARTY_SYNC_MODS, req),
  /** Guruh/guruh o'yini faol: "X" oynani yopmaydi, yashiradi (presence, ovoz va P2P tunnel uzilmasin). */
  setLobbyKeepAlive: (active) => electron.ipcRenderer.send(IPC.LOBBY_KEEPALIVE, active),
  /** Launcher oynasi ekranda ko'rinadimi (yashirin/kichraytirilgan - `false`). Ko'ring `lib/appSleep.ts`. */
  onWindowVisibility: (cb) => {
    const listener = (_, visible) => cb(visible === true);
    electron.ipcRenderer.on(IPC.WINDOW_VISIBILITY, listener);
    return () => electron.ipcRenderer.removeListener(IPC.WINDOW_VISIBILITY, listener);
  },
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
  /** Java boshqaruvi (Sozlamalar -> Java va xato oynasidagi "Yuklab olish"). `installJava` kerakli Java'ni
      yuklab, ochib, tekshirib o'yin papkasiga o'rnatadi; jarayon `onJavaInstallEvent` orqali keladi. */
  getJavaState: () => electron.ipcRenderer.invoke(IPC.JAVA_LIST),
  setPreferredJava: (path) => electron.ipcRenderer.invoke(IPC.JAVA_SET_PREFERRED, path),
  installJava: (major, mcVersion) => electron.ipcRenderer.invoke(IPC.JAVA_INSTALL, major, mcVersion),
  onJavaInstallEvent: (cb) => {
    const listener = (_, payload) => cb(payload);
    electron.ipcRenderer.on(IPC.JAVA_INSTALL_EVENT, listener);
    return () => electron.ipcRenderer.removeListener(IPC.JAVA_INSTALL_EVENT, listener);
  },
  /** Avtomatik yangilanish - Bunny CDN'dan (faqat o'rnatilgan holatda ishlaydi). */
  checkForUpdates: () => electron.ipcRenderer.invoke(IPC.UPDATE_CHECK),
  quitAndInstallUpdate: () => electron.ipcRenderer.invoke(IPC.UPDATE_QUIT_AND_INSTALL),
  /** Tayyor yangilanish holati (hodisa o'tkazib yuborilgan bo'lsa ham) - `null`: yo'q. */
  getPendingUpdate: () => electron.ipcRenderer.invoke(IPC.UPDATE_PENDING),
  /** Pet sinxroni (begona serverda pet gapi/hissiyoti/buyrug'i): asosiy jarayondan buyruqlar va Realtime'dan kelganini qaytarish. */
  onPetSync: (cb) => {
    const listener = (_, payload) => cb(payload);
    electron.ipcRenderer.on(IPC.PET_SYNC_EVENT, listener);
    return () => electron.ipcRenderer.removeListener(IPC.PET_SYNC_EVENT, listener);
  },
  petSyncIncoming: (ev) => electron.ipcRenderer.invoke(IPC.PET_SYNC_INCOMING, ev),
  onUpdateEvent: (cb) => {
    const listener = (_, payload) => cb(payload);
    electron.ipcRenderer.on(IPC.UPDATE_EVENT, listener);
    return () => electron.ipcRenderer.removeListener(IPC.UPDATE_EVENT, listener);
  },
  /** Ish stolidagi suzib yuruvchi maskot oynasi (`mascot.html`). */
  mascot: {
    /** Panel ochilishidan oldin `true` (oyna kattalashadi va qaysi burchakdan ochilishini
        qaytaradi), yopilgandan keyin `false`. */
    setExpanded: (expanded) => electron.ipcRenderer.invoke(IPC.MASCOT_SET_EXPANDED, expanded),
    /** Sudrash boshlandi/tugadi - oynani asosiy jarayon kursorga ergashtirib ko'chiradi. */
    drag: (phase) => electron.ipcRenderer.send(IPC.MASCOT_DRAG, phase),
    onTick: (cb) => {
      const listener = (_, tick) => cb(tick);
      electron.ipcRenderer.on(IPC.MASCOT_TICK, listener);
      return () => electron.ipcRenderer.removeListener(IPC.MASCOT_TICK, listener);
    },
    onFlight: (cb) => {
      const listener = (_, flight) => cb(flight);
      electron.ipcRenderer.on(IPC.MASCOT_FLIGHT, listener);
      return () => electron.ipcRenderer.removeListener(IPC.MASCOT_FLIGHT, listener);
    },
    /** Maskot tepasidagi xabarlar (kunlik salom, "Minecraft ... ochilmoqda") */
    onBubble: (cb) => {
      const listener = (_, bubble) => cb(bubble);
      electron.ipcRenderer.on(IPC.MASCOT_BUBBLE, listener);
      return () => electron.ipcRenderer.removeListener(IPC.MASCOT_BUBBLE, listener);
    },
    /** Xabar uchun ekranda joy: maskot ekran tepasida bo'lsa xabar uning ostida chiqadi, chetda bo'lsa ichkariga siljiydi */
    onBubbleSpace: (cb) => {
      const listener = (_, space) => cb(space);
      electron.ipcRenderer.on(IPC.MASCOT_BUBBLE_SPACE, listener);
      return () => electron.ipcRenderer.removeListener(IPC.MASCOT_BUBBLE_SPACE, listener);
    },
    /** Xabar maskot ostida ko'rinishi uchun yopiq oyna pastga kengayadi (`true`) yoki qaytadi (`false`) */
    setBubbleRoom: (room) => electron.ipcRenderer.invoke(IPC.MASCOT_BUBBLE_ROOM, room),
    /** Yopish/ochish tugmasi qaysi ekani (menyu pastidagi maslahat uchun); band bo'lsa zaxira tugma keladi, `null` - hech biri */
    onHotkey: (cb) => {
      const listener = (_, h) => cb(h);
      electron.ipcRenderer.on(IPC.MASCOT_HOTKEY, listener);
      return () => electron.ipcRenderer.removeListener(IPC.MASCOT_HOTKEY, listener);
    },
    /** Tugma bilan maskot yopildi/qaytarildi - animatsiya shundan boshlanadi */
    onVisibility: (cb) => {
      const listener = (_, v) => cb(v);
      electron.ipcRenderer.on(IPC.MASCOT_VISIBILITY, listener);
      return () => electron.ipcRenderer.removeListener(IPC.MASCOT_VISIBILITY, listener);
    },
    /** Sozlamalar: "Maskot ko'rinsin" kaliti. O'chirilsa maskot oynasi yo'q qilinadi va yoqilmaguncha yaratilmaydi */
    getEnabled: () => electron.ipcRenderer.invoke(IPC.MASCOT_GET_ENABLED),
    setEnabled: (enabled) => electron.ipcRenderer.invoke(IPC.MASCOT_SET_ENABLED, enabled),
    /** Sozlamalar: yopish/ochish tugmasi. `setHotkey(null)` - standartga (Ctrl+S) qaytarish; xato bo'lsa `error` - `MascotHotkeyError` kodi */
    getHotkey: () => electron.ipcRenderer.invoke(IPC.MASCOT_GET_HOTKEY),
    setHotkey: (key) => electron.ipcRenderer.invoke(IPC.MASCOT_SET_HOTKEY, key),
    /** Tugma yozib olinayotganda joriy tugma vaqtincha bo'shatiladi (`true`), keyin qaytariladi (`false`) */
    captureHotkey: (on) => electron.ipcRenderer.invoke(IPC.MASCOT_HOTKEY_CAPTURE, on),
    /** Tinglovchilar ulangach chaqiriladi - shundan keyin asosiy jarayon salom yuborishi mumkin */
    ready: () => electron.ipcRenderer.send(IPC.MASCOT_READY),
    /** O'yinni fonda ishga tushirish (katta launcher ochilmaydi) */
    launchGame: () => electron.ipcRenderer.send(IPC.MASCOT_LAUNCH_GAME),
    /** "RAM tozalash": Windows keshi + yoqilgan axlat fayllar/DNS tozalash (natija `onBubble` orqali) */
    cleanRam: () => electron.ipcRenderer.send(IPC.MASCOT_CLEAN_RAM),
    /** Katta launcher oynasini ochish (kerak bo'lsa shu payt yaratiladi) */
    openLauncher: () => electron.ipcRenderer.send(IPC.MASCOT_OPEN_LAUNCHER),
    /** Launcher'ga kirgan foydalanuvchi nomi - maskot keyingi kunlari shu nom bilan salomlashadi */
    setUsername: (username) => electron.ipcRenderer.send(IPC.MASCOT_SET_USERNAME, username),
    /** Nik/UUID/RAM kabi sozlamalar: maskot launcher yopiq paytda o'yinni shular bilan ochadi */
    rememberLaunch: (profile) => electron.ipcRenderer.send(IPC.MASCOT_REMEMBER_LAUNCH, profile),
    /** "Minecraftga kirish" bosilganda asosiy jarayon hisob tokenlarini so'raydi (javob: `sendLaunchExtras`) */
    onPrepareLaunch: (cb) => {
      const listener = (_, request) => cb(request);
      electron.ipcRenderer.on(IPC.MASCOT_PREPARE_LAUNCH, listener);
      return () => electron.ipcRenderer.removeListener(IPC.MASCOT_PREPARE_LAUNCH, listener);
    },
    /** So'ralgan tokenlar: faqat asosiy jarayon xotirasiga boradi, diskka yozilmaydi */
    sendLaunchExtras: (extras) => electron.ipcRenderer.send(IPC.MASCOT_LAUNCH_EXTRAS, extras)
  },
  /** Yuksalish (Shaxsiy Fokus): Sozlamalar bo'limi, maskot menyusi va `focus.html` oynalari (`main/services/focus.ts`). */
  focus: {
    getState: () => electron.ipcRenderer.invoke(IPC.FOCUS_GET_STATE),
    setToggles: (patch) => electron.ipcRenderer.invoke(IPC.FOCUS_SET_TOGGLES, patch),
    addTask: (text) => electron.ipcRenderer.invoke(IPC.FOCUS_ADD_TASK, text),
    removeTask: (id) => electron.ipcRenderer.invoke(IPC.FOCUS_REMOVE_TASK, id),
    toggleTask: (id) => electron.ipcRenderer.invoke(IPC.FOCUS_TOGGLE_TASK, id),
    onState: (cb) => {
      const listener = (_, state) => cb(state);
      electron.ipcRenderer.on(IPC.FOCUS_STATE, listener);
      return () => electron.ipcRenderer.removeListener(IPC.FOCUS_STATE, listener);
    },
    /** Launcher: PRO tugash vaqti (ISO) yoki `null` */
    setPro: (proUntil) => electron.ipcRenderer.send(IPC.FOCUS_SET_PRO, proUntil),
    /** Maskot: namozga 15 daqiqa qoldi signali */
    onPrayerSoon: (cb) => {
      const listener = (_, reminder) => cb(reminder);
      electron.ipcRenderer.on(IPC.FOCUS_PRAYER_SOON, listener);
      return () => electron.ipcRenderer.removeListener(IPC.FOCUS_PRAYER_SOON, listener);
    },
    /** Maskot: signal olindi - eslatma oynasini ochish */
    showReminder: (id) => electron.ipcRenderer.send(IPC.FOCUS_SHOW_REMINDER, id),
    getReminder: () => electron.ipcRenderer.invoke(IPC.FOCUS_GET_REMINDER),
    previewReminder: () => electron.ipcRenderer.send(IPC.FOCUS_PREVIEW_REMINDER),
    open: (kind) => electron.ipcRenderer.send(IPC.FOCUS_OPEN, kind),
    /** Fokus oynasi o'zini yopadi */
    close: () => electron.ipcRenderer.send(IPC.FOCUS_CLOSE),
    setPinned: (pinned) => electron.ipcRenderer.invoke(IPC.FOCUS_SET_PINNED, pinned),
    pinHover: (over) => electron.ipcRenderer.send(IPC.FOCUS_PIN_HOVER, over)
  }
};
if (process.contextIsolated) {
  electron.contextBridge.exposeInMainWorld("electron", preload.electronAPI);
  electron.contextBridge.exposeInMainWorld("launcher", launcherApi);
} else {
  window.electron = preload.electronAPI;
  window.launcher = launcherApi;
}

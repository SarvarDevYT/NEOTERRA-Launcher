"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
const electron = require("electron");
const path = require("path");
const utils = require("@electron-toolkit/utils");
const fs = require("fs");
const os = require("os");
const child_process = require("child_process");
const AdmZip = require("adm-zip");
const crypto = require("crypto");
const minecraftLauncherCore = require("minecraft-launcher-core");
const http = require("http");
const dns = require("dns");
const net = require("net");
const Handler = require("minecraft-launcher-core/components/handler");
const promises = require("stream/promises");
const stream = require("stream");
const zlib = require("zlib");
const promises$1 = require("fs/promises");
const electronUpdater = require("electron-updater");
const string_decoder = require("string_decoder");
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
function runJavaVersion(javaPath) {
  return new Promise((resolve) => {
    child_process.execFile(javaPath, ["-version"], { timeout: 8e3, windowsHide: true }, (err, _stdout, stderr) => {
      if (err) return resolve(null);
      const match = /version "([^"]+)"/.exec(stderr || "");
      resolve(match ? match[1] : (stderr || "").split("\n")[0].trim() || null);
    });
  });
}
function safeListDir(dir) {
  try {
    return fs.existsSync(dir) ? fs.readdirSync(dir) : [];
  } catch {
    return [];
  }
}
function javaExecutables(javaHome) {
  if (process.platform === "win32") return [path.join(javaHome, "bin", "java.exe")];
  if (process.platform === "darwin") {
    return [path.join(javaHome, "bin", "java"), path.join(javaHome, "Contents", "Home", "bin", "java")];
  }
  return [path.join(javaHome, "bin", "java")];
}
function searchLocations() {
  if (process.platform === "win32") {
    return {
      parents: [
        "C:\\Program Files\\Java",
        "C:\\Program Files\\Eclipse Adoptium",
        "C:\\Program Files\\Microsoft",
        // Foydalanuvchi launcher tavsiya qilgan Java'ni (Corretto) yoki boshqa mashhur tarqatuvchilarni
        // o'rnatgan bo'lishi mumkin - ular PATH'ga tushmasa ham topilishi kerak.
        "C:\\Program Files\\Amazon Corretto",
        "C:\\Program Files\\Zulu",
        "C:\\Program Files\\BellSoft",
        "C:\\Program Files\\Semeru",
        "C:\\Program Files (x86)\\Java",
        "C:\\Program Files (x86)\\Eclipse Adoptium",
        path.join(os.homedir(), ".jdks")
      ],
      direct: []
    };
  }
  if (process.platform === "darwin") {
    return {
      parents: [
        "/Library/Java/JavaVirtualMachines",
        path.join(os.homedir(), "Library", "Java", "JavaVirtualMachines")
      ],
      direct: [
        // Homebrew: Apple Silicon'da /opt/homebrew, Intel'da /usr/local.
        "/opt/homebrew/opt/openjdk/bin/java",
        "/usr/local/opt/openjdk/bin/java",
        "/Library/Internet Plug-Ins/JavaAppletPlugin.plugin/Contents/Home/bin/java"
      ]
    };
  }
  return {
    parents: [
      "/usr/lib/jvm",
      "/usr/lib64/jvm",
      "/opt/java",
      "/opt",
      path.join(os.homedir(), ".sdkman", "candidates", "java")
    ],
    direct: ["/usr/bin/java", "/usr/local/bin/java", "/snap/bin/java"]
  };
}
function launcherRuntimeRoots() {
  const home2 = os.homedir();
  if (process.platform === "win32") {
    const appData = process.env.APPDATA || path.join(home2, "AppData", "Roaming");
    const localAppData = process.env.LOCALAPPDATA || path.join(home2, "AppData", "Local");
    return [
      path.join(appData, ".minecraft", "runtime"),
      path.join(localAppData, "Packages", "Microsoft.4297127D64EC6_8wekyb3d8bbwe", "LocalCache", "Local", "runtime"),
      path.join(home2, "curseforge", "minecraft", "Install", "runtime"),
      path.join(appData, ".tlauncher", "jvms"),
      path.join(home2, ".lunarclient", "jre"),
      path.join(appData, "ModrinthApp", "meta", "java_versions"),
      path.join(appData, "com.modrinth.theseus", "meta", "java_versions"),
      path.join(appData, "PrismLauncher", "java"),
      path.join(appData, "ATLauncher", "runtimes")
    ];
  }
  if (process.platform === "darwin") {
    const support = path.join(home2, "Library", "Application Support");
    return [
      path.join(support, "minecraft", "runtime"),
      path.join(home2, ".lunarclient", "jre"),
      path.join(support, "ModrinthApp", "meta", "java_versions"),
      path.join(support, "com.modrinth.theseus", "meta", "java_versions"),
      path.join(support, "PrismLauncher", "java")
    ];
  }
  return [
    path.join(home2, ".minecraft", "runtime"),
    path.join(home2, ".lunarclient", "jre"),
    path.join(home2, ".local", "share", "ModrinthApp", "meta", "java_versions"),
    path.join(home2, ".local", "share", "PrismLauncher", "java")
  ];
}
const NOT_JAVA_HOME = /* @__PURE__ */ new Set(["bin", "lib", "legal", "conf", "include", "jmods", "man", "demo", "sample"]);
function findJavaUnder(root, depth, out) {
  for (const exe of javaExecutables(root)) {
    if (fs.existsSync(exe)) {
      out.push(exe);
      return;
    }
  }
  if (depth <= 0) return;
  for (const entry2 of safeListDir(root)) {
    if (entry2.startsWith(".") || NOT_JAVA_HOME.has(entry2)) continue;
    const child = path.join(root, entry2);
    try {
      if (!fs.statSync(child).isDirectory()) continue;
    } catch {
      continue;
    }
    findJavaUnder(child, depth - 1, out);
  }
}
function launcherRuntimeExecutables() {
  const out = [];
  for (const root of launcherRuntimeRoots()) if (fs.existsSync(root)) findJavaUnder(root, 4, out);
  return out;
}
async function isJava64Bit(exe) {
  if (process.platform === "darwin") return true;
  let handle2 = null;
  try {
    handle2 = await fs.promises.open(exe, "r");
    const head = Buffer.alloc(4096);
    const { bytesRead } = await handle2.read(head, 0, head.length, 0);
    if (process.platform === "win32") {
      if (bytesRead < 64 || head.readUInt16LE(0) !== 23117) return false;
      const pe = head.readUInt32LE(60);
      if (pe + 6 > bytesRead || head.readUInt32LE(pe) !== 17744) return false;
      const machine = head.readUInt16LE(pe + 4);
      return machine === 34404 || machine === 43620;
    }
    return bytesRead >= 5 && head.readUInt32BE(0) === 2135247942 && head[4] === 2;
  } catch {
    return false;
  } finally {
    await handle2?.close().catch(() => void 0);
  }
}
async function detectJava() {
  const viaPath = await runJavaVersion("java");
  if (viaPath) return viaPath;
  const javaHome = process.env.JAVA_HOME;
  if (javaHome) {
    for (const exe of javaExecutables(javaHome)) {
      if (!fs.existsSync(exe)) continue;
      const viaHome = await runJavaVersion(exe);
      if (viaHome) return viaHome;
    }
  }
  const { parents, direct } = searchLocations();
  for (const exe of direct) {
    if (!fs.existsSync(exe)) continue;
    const found = await runJavaVersion(exe);
    if (found) return found;
  }
  for (const parent of parents) {
    for (const entry2 of safeListDir(parent)) {
      for (const exe of javaExecutables(path.join(parent, entry2))) {
        if (!fs.existsSync(exe)) continue;
        const found = await runJavaVersion(exe);
        if (found) return found;
      }
    }
  }
  return null;
}
function requiredJavaMajor(mcVersion) {
  const [maj = 0, min = 0, patch = 0] = mcVersion.split(".").map((n) => parseInt(n, 10) || 0);
  if (maj !== 1) return 21;
  if (min > 20 || min === 20 && patch >= 5) return 21;
  if (min >= 17) return 17;
  return 8;
}
function javaMajorOf(versionString) {
  const parts = versionString.split(".");
  const first = parseInt(parts[0], 10);
  if (!Number.isFinite(first)) return null;
  if (first === 1) {
    const second = parseInt(parts[1], 10);
    return Number.isFinite(second) ? second : null;
  }
  return first;
}
function needsIntelJavaOnMac(mcVersion) {
  if (process.platform !== "darwin" || process.arch !== "arm64") return false;
  const snapshot = /^(\d\d)w\d\d[a-z]/.exec(mcVersion);
  if (snapshot) return parseInt(snapshot[1], 10) < 22;
  const [maj = 0, min = 0] = mcVersion.split(".").map((n) => parseInt(n, 10) || 0);
  if (maj !== 1) return false;
  return min < 19;
}
function ltsJavaFor(major) {
  if (major <= 8) return 8;
  if (major <= 11) return 11;
  if (major <= 17) return 17;
  if (major <= 21) return 21;
  return major;
}
function javaMatchesStrict(major, required) {
  return major === required || major === ltsJavaFor(required);
}
async function findJavaExecutable(required) {
  const candidates = [...launcherRuntimeExecutables()];
  const javaHome = process.env.JAVA_HOME;
  if (javaHome) candidates.push(...javaExecutables(javaHome));
  const { parents, direct } = searchLocations();
  candidates.push(...direct);
  for (const parent of parents) {
    for (const entry2 of safeListDir(parent)) candidates.push(...javaExecutables(path.join(parent, entry2)));
  }
  const tried = /* @__PURE__ */ new Set();
  for (const exe of candidates) {
    const key = exe.toLowerCase();
    if (tried.has(key) || !fs.existsSync(exe)) continue;
    tried.add(key);
    if (!await isJava64Bit(exe)) continue;
    const version = await runJavaVersion(exe);
    const major = version ? javaMajorOf(version) : null;
    if (major !== null && javaMatchesStrict(major, required)) return exe;
  }
  return null;
}
async function inspectJava(exe, source) {
  if (!fs.existsSync(exe)) return null;
  const version = await runJavaVersion(exe);
  const major = version ? javaMajorOf(version) : null;
  return version && major !== null ? { path: exe, version, major, source } : null;
}
async function listJavaInstallations(jreDir2) {
  const candidates = [];
  for (const entry2 of safeListDir(jreDir2)) {
    if (entry2.startsWith(".") || entry2.includes(".partial")) continue;
    for (const exe of javaExecutables(path.join(jreDir2, entry2))) candidates.push({ exe, source: "launcher" });
  }
  for (const exe of launcherRuntimeExecutables()) candidates.push({ exe, source: "system" });
  const javaHome = process.env.JAVA_HOME;
  if (javaHome) for (const exe of javaExecutables(javaHome)) candidates.push({ exe, source: "system" });
  const { parents, direct } = searchLocations();
  for (const exe of direct) candidates.push({ exe, source: "system" });
  for (const parent of parents) {
    for (const entry2 of safeListDir(parent)) {
      for (const exe of javaExecutables(path.join(parent, entry2))) candidates.push({ exe, source: "system" });
    }
  }
  const results = await Promise.all(candidates.filter((c) => fs.existsSync(c.exe)).map((c) => inspectJava(c.exe, c.source)));
  const seen = /* @__PURE__ */ new Set();
  const list = [];
  for (const item of results) {
    if (!item) continue;
    const key = item.path.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    list.push(item);
  }
  return list.sort((a, b) => a.source === b.source ? b.major - a.major : a.source === "launcher" ? -1 : 1);
}
const MR_BASE = "https://api.modrinth.com/v2";
const USER_AGENT$1 = "NeoTerraLauncher/1.0 (Minecraft launcher - site.neoterra.uz)";
const PAGE_SIZE = 24;
function assetKindForProjectType(projectType) {
  switch (projectType) {
    case "mod":
      return "mod";
    case "resourcepack":
      return "texture";
    case "shader":
      return "shader";
    case "datapack":
      return "datapack";
    default:
      return void 0;
  }
}
function hashId(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = h * 31 + s.charCodeAt(i) | 0;
  return Math.abs(h);
}
const CACHE_TTL_MS = 10 * 6e4;
const MAX_CACHE_ENTRIES = 800;
const responseCache = /* @__PURE__ */ new Map();
const inFlight = /* @__PURE__ */ new Map();
async function mrFetch(path2) {
  const cached = responseCache.get(path2);
  if (cached && Date.now() - cached.at < CACHE_TTL_MS) {
    responseCache.delete(path2);
    responseCache.set(path2, cached);
    return cached.data;
  }
  const running2 = inFlight.get(path2);
  if (running2) return running2;
  const promise = mrFetchRaw(path2).then((data) => {
    if (responseCache.size >= MAX_CACHE_ENTRIES) {
      const oldest = responseCache.keys().next().value;
      if (oldest !== void 0) responseCache.delete(oldest);
    }
    responseCache.set(path2, { at: Date.now(), data });
    return data;
  }).finally(() => {
    inFlight.delete(path2);
  });
  inFlight.set(path2, promise);
  return promise;
}
async function mrFetchRaw(path2, attempt = 1) {
  const MAX_ATTEMPTS = 3;
  try {
    const res = await fetch(`${MR_BASE}${path2}`, {
      headers: { Accept: "application/json", "User-Agent": USER_AGENT$1 },
      signal: AbortSignal.timeout(15e3)
    });
    if (!res.ok) throw new Error(`Modrinth HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    if (attempt >= MAX_ATTEMPTS) throw err;
    await new Promise((resolve) => setTimeout(resolve, 300 * attempt));
    return mrFetchRaw(path2, attempt + 1);
  }
}
function withTimeout(promise, ms, fallback) {
  return new Promise((resolve) => {
    let settled = false;
    const timer = setTimeout(() => {
      if (!settled) {
        settled = true;
        resolve(fallback);
      }
    }, ms);
    promise.then(
      (value) => {
        if (!settled) {
          settled = true;
          clearTimeout(timer);
          resolve(value);
        }
      },
      () => {
        if (!settled) {
          settled = true;
          clearTimeout(timer);
          resolve(fallback);
        }
      }
    );
  });
}
let gameVersionCache = null;
async function listModrinthGameVersions() {
  if (gameVersionCache) return gameVersionCache;
  try {
    const data = await mrFetch("/tag/game_version");
    const releases = data.filter((v) => v.version_type === "release").map((v) => v.version);
    if (releases.length > 0) gameVersionCache = releases;
    return releases;
  } catch {
    return [];
  }
}
function decodeHtmlEntities$1(s) {
  return s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, " ");
}
function stripHtmlTags(html) {
  return html.replace(/<br\s*\/?>/gi, "\n").replace(/<\/(p|div|li|h[1-6])>/gi, "\n\n").replace(/<[^>]+>/g, "");
}
function stripMarkdownSyntax(md) {
  return md.replace(/\[([^\]]*)]\([^)]*\)/g, "$1").replace(/^#{1,6}\s+/gm, "").replace(/[*_`]{1,3}/g, "");
}
function cleanShortText(raw) {
  return decodeHtmlEntities$1(stripMarkdownSyntax(stripHtmlTags(raw))).replace(/\s+/g, " ").trim();
}
function textBlocksFrom(segment) {
  const cleaned = decodeHtmlEntities$1(stripMarkdownSyntax(stripHtmlTags(segment)));
  return cleaned.split(/\n{2,}/).map((p) => p.replace(/\s+/g, " ").trim()).filter((p) => /[\p{L}\p{N}]/u.test(p)).map((text) => ({ type: "text", text }));
}
const YOUTUBE_RE = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{6,})/i;
function youtubeEmbedUrl(url) {
  const m = url.match(YOUTUBE_RE);
  return m ? `https://www.youtube.com/embed/${m[1]}` : null;
}
const MEDIA_RE = new RegExp(
  [
    String.raw`<img[^>]*\ssrc=["']([^"']+)["'][^>]*?(?:\salt=["']([^"']*)["'])?[^>]*>`,
    String.raw`<iframe[^>]*\ssrc=["']([^"']+)["'][^>]*>\s*<\/iframe>`,
    String.raw`\[!\[([^\]]*)]\(([^)\s]+)(?:\s+"[^"]*")?\)[^\]]*]\([^)]*\)`,
    String.raw`!\[([^\]]*)]\(([^)\s]+)(?:\s+"[^"]*")?\)`,
    String.raw`\[[^\]]*]\((https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+[^)\s]*)\)`,
    String.raw`(https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+[^\s<)"']*)`
  ].join("|"),
  "gi"
);
function isBadgeImage(url) {
  return /img\.shields\.io/i.test(url);
}
function parseDescriptionBlocks(raw) {
  const blocks = [];
  let lastIndex = 0;
  for (const m of raw.matchAll(MEDIA_RE)) {
    const textSegment = raw.slice(lastIndex, m.index);
    blocks.push(...textBlocksFrom(textSegment));
    lastIndex = (m.index ?? 0) + m[0].length;
    const iframeSrc = m[3];
    const imgSrc = m[1] ?? m[5] ?? m[7];
    const imgAlt = m[2] ?? m[4] ?? m[6] ?? null;
    const ytLink = m[8] ?? m[9];
    if (iframeSrc) {
      const embed = youtubeEmbedUrl(iframeSrc);
      if (embed) blocks.push({ type: "video", url: embed });
    } else if (ytLink) {
      const embed = youtubeEmbedUrl(ytLink);
      if (embed) blocks.push({ type: "video", url: embed });
    } else if (imgSrc && /^https?:\/\//i.test(imgSrc) && !isBadgeImage(imgSrc)) {
      blocks.push({ type: "image", url: imgSrc, alt: imgAlt ? decodeHtmlEntities$1(imgAlt) : null });
    }
  }
  blocks.push(...textBlocksFrom(raw.slice(lastIndex)));
  return blocks;
}
async function resolveLatestVersion(projectId, gameVersion, loader) {
  try {
    const params = new URLSearchParams();
    if (gameVersion) params.set("game_versions", JSON.stringify([gameVersion]));
    if (loader) params.set("loaders", JSON.stringify([loader]));
    const versions = await mrFetch(`/project/${projectId}/version?${params.toString()}`);
    return versions.find((v) => v.version_type === "release") ?? versions[0] ?? null;
  } catch {
    return null;
  }
}
async function resolveVersionById(versionId) {
  try {
    return await mrFetch(`/version/${versionId}`);
  } catch {
    return null;
  }
}
async function resolveVersionNotAfter(projectId, gameVersion, loader, notAfterMs) {
  try {
    const params = new URLSearchParams();
    params.set("game_versions", JSON.stringify([gameVersion]));
    if (loader) params.set("loaders", JSON.stringify([loader]));
    const versions = await mrFetch(`/project/${projectId}/version?${params.toString()}`);
    if (versions.length === 0) return null;
    const compatible = versions.find((v) => Date.parse(v.date_published) <= notAfterMs);
    return compatible ?? versions[versions.length - 1];
  } catch {
    return null;
  }
}
async function resolveLatestFile(projectId, gameVersion, loader) {
  const version = await resolveLatestVersion(projectId, gameVersion, loader);
  const file2 = version?.files.find((f) => f.primary) ?? version?.files[0];
  return file2 ? { url: file2.url, filename: file2.filename } : null;
}
async function resolveLatestFileWithDate(projectId, gameVersion, loader) {
  const version = await resolveLatestVersion(projectId, gameVersion, loader);
  if (!version) return null;
  const file2 = version.files.find((f) => f.primary) ?? version.files[0];
  if (!file2) return null;
  return { url: file2.url, filename: file2.filename, dateMs: Date.parse(version.date_published) || Date.now() };
}
async function resolveRequiredDependencies(projectId, gameVersion, seen, loader, notAfterMs) {
  const version = await resolveLatestVersion(projectId, gameVersion, loader);
  if (!version) return [];
  const requiredDeps = version.dependencies.filter(
    (d) => d.dependency_type === "required" && d.project_id && !seen.has(d.project_id)
  );
  const result = [];
  for (const dep of requiredDeps) {
    const depId = dep.project_id;
    if (seen.has(depId)) continue;
    seen.add(depId);
    const [project, depVersion] = await Promise.all([
      mrFetch(`/project/${depId}`).catch(() => null),
      // Pinlangan bo'lsa - aynan shuni. Aks holda: sana chegarasi berilgan bo'lsa (shader
      // yuklovchisi) undan keyin chiqmagan eng so'nggisini, bo'lmasa oddiy eng so'nggisini.
      dep.version_id ? resolveVersionById(dep.version_id) : notAfterMs !== void 0 ? resolveVersionNotAfter(depId, gameVersion, loader, notAfterMs) : resolveLatestVersion(depId, gameVersion, loader)
    ]);
    const file2 = depVersion?.files.find((f) => f.primary) ?? depVersion?.files[0];
    if (file2) {
      result.push({
        projectId: depId,
        name: project?.title ?? depId,
        url: file2.url,
        filename: file2.filename,
        targetKind: assetKindForProjectType(project?.project_type)
      });
    }
    const nested = await resolveRequiredDependencies(depId, gameVersion, seen, loader, notAfterMs);
    result.push(...nested);
  }
  return result;
}
function looksRelated(query, title) {
  const norm2 = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
  const q = norm2(query);
  const t = norm2(title);
  if (q.length === 0) return false;
  if (q.length < 4) return q === t;
  return t.includes(q) || q.includes(t);
}
const KNOWN_MOD_ID_ALIASES = {
  mts: "immersive-vehicles",
  // Haqiqiy sinovda topildi: bu ham "mts" ga o'xshab qayta nomlangan (Modrinth'da
  // "Immersive Vehicles - Official Content Pack"), lekin fayl nomi hamon eski ID'ni saqlab
  // qolgan ("MTS Official Pack-1.20.1-V29.jar", versiya raqami 29 - Forge'ning "[29,)"
  // talabiga to'g'ridan-to'g'ri mos keladi).
  mtsofficialpack: "immersive-vehicles-official-content-pack"
};
async function resolveAliasedFile(slug, gameVersion, loader) {
  try {
    const [project, file2] = await Promise.all([
      mrFetch(`/project/${slug}`).catch(() => null),
      resolveLatestFile(slug, gameVersion, loader)
    ]);
    return file2 ? { projectId: slug, name: project?.title ?? slug, url: file2.url, filename: file2.filename } : null;
  } catch {
    return null;
  }
}
async function searchAndValidate(query, gameVersion, loader, exclude) {
  try {
    const facets = JSON.stringify([["project_type:mod"], [`versions:${gameVersion}`], [`categories:${loader}`]]);
    const params = new URLSearchParams({ query, facets, limit: "5" });
    const { hits } = await mrFetch(`/search?${params.toString()}`);
    const match = hits.find((h) => !exclude.has(h.project_id) && looksRelated(query, h.title));
    if (!match) return null;
    const file2 = await resolveLatestFile(match.project_id, gameVersion, loader);
    return file2 ? { projectId: match.project_id, name: match.title, url: file2.url, filename: file2.filename } : null;
  } catch {
    return null;
  }
}
async function findModByForgeId(modId, gameVersion, loader, exclude = /* @__PURE__ */ new Set()) {
  const alias = KNOWN_MOD_ID_ALIASES[modId.toLowerCase()];
  if (alias && !exclude.has(alias)) {
    const aliased = await resolveAliasedFile(alias, gameVersion, loader);
    if (aliased) return aliased;
  }
  const spaced = modId.replace(/[_-]/g, " ");
  const direct = await searchAndValidate(spaced, gameVersion, loader, exclude);
  if (direct) return direct;
  if (!/[_\- ]/.test(modId) && modId.length >= 6) {
    for (let i = 3; i <= modId.length - 3; i++) {
      const candidate = `${modId.slice(0, i)} ${modId.slice(i)}`;
      const found = await searchAndValidate(candidate, gameVersion, loader, exclude);
      if (found) return found;
    }
  }
  return null;
}
const DEPENDENCY_SLUG_ALIASES = {
  kotlinforforge: "kotlin-for-forge",
  architectury: "architectury-api",
  cloth_config: "cloth-config",
  clothconfig: "cloth-config"
};
async function searchModCandidates(modId, gameVersion, loader) {
  const norm2 = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
  const q = norm2(modId);
  const out = [];
  const seen = /* @__PURE__ */ new Set();
  const push = (c) => {
    if (!seen.has(c.projectId)) {
      seen.add(c.projectId);
      out.push(c);
    }
  };
  const alias = DEPENDENCY_SLUG_ALIASES[modId.toLowerCase()];
  if (alias) {
    const project = await mrFetch(`/project/${alias}`).catch(() => null);
    if (project) push({ projectId: project.id, title: project.title });
  }
  const facets = JSON.stringify([["project_type:mod"], [`versions:${gameVersion}`], [`categories:${loader}`]]);
  const searchOnce = async (query) => {
    const params = new URLSearchParams({ query, facets, limit: "8" });
    const { hits } = await mrFetch(`/search?${params.toString()}`);
    const related = hits.filter((h) => looksRelated(modId, h.title) || norm2(h.slug) === q).sort((a, b) => {
      const ea = norm2(a.title) === q || norm2(a.slug) === q ? 0 : 1;
      const eb = norm2(b.title) === q || norm2(b.slug) === q ? 0 : 1;
      return ea - eb || a.title.length - b.title.length;
    });
    related.forEach((h) => push({ projectId: h.project_id, title: h.title }));
    return related.length > 0;
  };
  const bases = Array.from(
    /* @__PURE__ */ new Set([modId, modId.replace(/(mod|forge|mc)$/i, ""), modId.replace(/^(mod|forge|mc)/i, "")])
  ).filter((b) => b.length >= 5);
  for (const base of bases) await searchOnce(base.replace(/[_-]/g, " "));
  if (out.length === 0) {
    for (const base of [...bases].sort((a, b) => a.length - b.length)) {
      if (/[_\- ]/.test(base) || base.length < 6) continue;
      for (let i = 3; i <= base.length - 3 && out.length < 4; i++) {
        await searchOnce(`${base.slice(0, i)} ${base.slice(i)}`);
      }
      if (out.length > 0) break;
    }
  }
  return out.slice(0, 6);
}
async function listProjectFiles(projectId, gameVersion, loader) {
  const params = new URLSearchParams();
  params.set("game_versions", JSON.stringify([gameVersion]));
  params.set("loaders", JSON.stringify([loader]));
  const versions = await mrFetch(
    `/project/${projectId}/version?${params.toString()}`
  );
  const files = [];
  for (const v of versions) {
    const file2 = v.files.find((f) => f.primary) ?? v.files[0];
    if (file2 && /\.jar$/i.test(file2.filename)) {
      files.push({ versionNumber: v.version_number, versionType: v.version_type, url: file2.url, filename: file2.filename });
    }
  }
  return [...files.filter((f) => f.versionType === "release"), ...files.filter((f) => f.versionType !== "release")];
}
const GENERIC_PACKAGE_WORDS = /* @__PURE__ */ new Set([
  "com",
  "net",
  "org",
  "io",
  "software",
  "dev",
  "me",
  "xyz",
  "edu",
  "gov",
  "api",
  "util",
  "utils",
  "common",
  "client",
  "core",
  "main",
  "impl",
  "internal"
]);
async function findModByClassPath(dottedClassPath, gameVersion, loader, exclude = /* @__PURE__ */ new Set()) {
  const segments = dottedClassPath.split(".").slice(0, -1).filter((p) => p.length > 2 && !GENERIC_PACKAGE_WORDS.has(p.toLowerCase()));
  for (const segment of segments) {
    const found = await searchAndValidate(segment, gameVersion, loader, exclude);
    if (found) return found;
  }
  return null;
}
function cleanFilenameForSearch(filename) {
  let name = filename.replace(/\.(jar|zip)$/i, "");
  const verMatch = name.match(/[-_+]v?\d/);
  if (verMatch && verMatch.index !== void 0 && verMatch.index > 0) {
    name = name.slice(0, verMatch.index);
  }
  name = name.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
  name = name.replace(/[_\-+.]/g, " ");
  return name.replace(/\s+/g, " ").trim();
}
function filenameMatchesGameVersion(filename, mcVersion) {
  const idx = filename.indexOf(mcVersion);
  if (idx === -1) return false;
  const before = filename[idx - 1];
  const after = filename[idx + mcVersion.length];
  if (before !== void 0 && /[0-9.]/.test(before)) return false;
  if (after !== void 0 && /[0-9]/.test(after)) return false;
  if (after === "." && /[0-9]/.test(filename[idx + mcVersion.length + 1] ?? "")) return false;
  return true;
}
async function searchProjectOnly(query) {
  try {
    const params = new URLSearchParams({ query, limit: "3" });
    const { hits } = await mrFetch(`/search?${params.toString()}`);
    const match = hits.find((h) => looksRelated(query, h.title));
    return match ? { name: match.title, iconUrl: match.icon_url } : null;
  } catch {
    return null;
  }
}
const projectInfoCache = /* @__PURE__ */ new Map();
const projectInfoInFlight = /* @__PURE__ */ new Map();
async function findProjectInfoUncached(filename) {
  const cleaned = cleanFilenameForSearch(filename);
  if (!cleaned) return null;
  const words = cleaned.split(" ").filter(Boolean);
  for (let end = words.length; end >= 1; end--) {
    const candidate = words.slice(0, end).join(" ");
    if (candidate.length < 3) continue;
    const found = await searchProjectOnly(candidate);
    if (found) return found;
  }
  const firstWord = words[0] ?? "";
  if (words.length === 1 && firstWord.length >= 6) {
    for (let i = 3; i <= firstWord.length - 3; i++) {
      const candidate = `${firstWord.slice(0, i)} ${firstWord.slice(i)}`;
      const found = await searchProjectOnly(candidate);
      if (found) return found;
    }
  }
  return null;
}
async function findProjectInfoByFilename(filename) {
  if (projectInfoCache.has(filename)) return projectInfoCache.get(filename) ?? null;
  const inFlight2 = projectInfoInFlight.get(filename);
  if (inFlight2) return inFlight2;
  const promise = findProjectInfoUncached(filename);
  projectInfoInFlight.set(filename, promise);
  try {
    const result = await promise;
    projectInfoCache.set(filename, result);
    return result;
  } finally {
    projectInfoInFlight.delete(filename);
  }
}
async function searchModrinthMods(offset, gameVersion, query, projectType = "mod", loader) {
  try {
    const useLoader = projectType === "mod" && loader && loader !== "vanilla" ? loader : void 0;
    const facets = [[`project_type:${projectType}`]];
    if (gameVersion) facets.push([`versions:${gameVersion}`]);
    if (useLoader) facets.push([`categories:${useLoader}`]);
    const params = new URLSearchParams({
      facets: JSON.stringify(facets),
      index: query ? "relevance" : "downloads",
      offset: String(offset),
      limit: String(PAGE_SIZE)
    });
    if (query) params.set("query", query);
    const { hits, total_hits } = await mrFetch(`/search?${params.toString()}`);
    const fileLoader = projectType === "datapack" ? "datapack" : useLoader;
    const files = await Promise.all(
      hits.map((h) => withTimeout(resolveLatestFile(h.project_id, gameVersion, fileLoader), 5e3, null))
    );
    const items = hits.map((h, i) => {
      const file2 = files[i];
      return {
        id: hashId(h.project_id),
        externalId: h.slug,
        name: h.title,
        summary: h.description ? cleanShortText(h.description) : null,
        logoUrl: h.icon_url,
        downloadUrl: file2?.url ?? null,
        fileName: file2?.filename ?? null,
        websiteUrl: `https://modrinth.com/${projectType}/${h.slug}`,
        gameVersions: gameVersion ? [gameVersion] : [],
        downloadCount: h.downloads
      };
    });
    return { items, totalHits: total_hits };
  } catch (err) {
    console.error("[modrinth] mods search muvaffaqiyatsiz:", err instanceof Error ? err.message : err);
    return { items: [], totalHits: 0 };
  }
}
async function getModrinthModDetail(slug, gameVersion, projectType = "mod") {
  try {
    const [project, file2, members] = await Promise.all([
      mrFetch(`/project/${slug}`),
      resolveLatestFile(slug, gameVersion, projectType === "datapack" ? "datapack" : void 0),
      mrFetch(`/project/${slug}/members`).catch(() => [])
    ]);
    const primaryMember = members.find((m) => m.role === "Owner") ?? members[0];
    const author = primaryMember ? {
      name: primaryMember.user.username,
      avatarUrl: primaryMember.user.avatar_url,
      profileUrl: `https://modrinth.com/user/${primaryMember.user.username}`
    } : null;
    const rawBlocks = project.body ? parseDescriptionBlocks(project.body) : [];
    const shortSummary = project.description ? cleanShortText(project.description) : "";
    return {
      name: project.title,
      summary: shortSummary || null,
      descriptionBlocks: rawBlocks,
      logoUrl: project.icon_url,
      galleryUrls: project.gallery.map((g) => g.url),
      author,
      // Ba'zi litsenziyalarda "name" bo'sh satr (masalan maxsus litsenziyalar) - shunda "id"ga
      // qaytamiz (masalan "LicenseRef-Polyform-Shield-1.0.0").
      license: project.license?.name || project.license?.id || null,
      downloadUrl: file2?.url ?? null,
      fileName: file2?.filename ?? null,
      websiteUrl: `https://modrinth.com/${projectType}/${slug}`,
      downloadCount: project.downloads
    };
  } catch (err) {
    console.error("[modrinth] mod detail muvaffaqiyatsiz:", err instanceof Error ? err.message : err);
    return null;
  }
}
function parseModList(report) {
  const out = [];
  for (const raw of report.split(/\r?\n/)) {
    if (!/\.jar\s*\|/i.test(raw)) continue;
    const cols = raw.split("|").map((c) => c.trim());
    if (cols.length < 5 || !/\.jar$/i.test(cols[0])) continue;
    out.push({ file: cols[0], state: cols[4] });
  }
  return out;
}
function readLatestCrashReport(instRoot2, sinceMs) {
  try {
    const dir = path.join(instRoot2, "crash-reports");
    const files = fs.readdirSync(dir).filter((f) => f.startsWith("crash-") && f.endsWith(".txt")).map((f) => ({ f, mtime: fs.statSync(path.join(dir, f)).mtimeMs })).filter((x) => x.mtime >= sinceMs).sort((a, b) => b.mtime - a.mtime);
    return files.length > 0 ? fs.readFileSync(path.join(dir, files[0].f), "utf-8") : null;
  } catch {
    return null;
  }
}
function parseLenientJson(text) {
  const noComments = text.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
  const noTrailingCommas = noComments.replace(/,(\s*[\]}])/g, "$1");
  return JSON.parse(noTrailingCommas);
}
function mixinClassPaths(zip) {
  const paths = [];
  for (const entry2 of zip.getEntries()) {
    if (entry2.isDirectory || !/(^|\/)[^/]*mixins?[^/]*\.json$/i.test(entry2.entryName)) continue;
    try {
      const cfg = parseLenientJson(entry2.getData().toString("utf-8"));
      const pkg = (cfg.package ?? "").replace(/\./g, "/");
      for (const name of [...cfg.mixins ?? [], ...cfg.client ?? [], ...cfg.server ?? []]) {
        paths.push(`${pkg ? pkg + "/" : ""}${name.replace(/\./g, "/")}.class`);
      }
    } catch {
    }
  }
  return paths;
}
function mixinsReference(jarPath, internalName) {
  try {
    const zip = new AdmZip(jarPath);
    const needle = Buffer.from(internalName, "utf-8");
    for (const classPath of mixinClassPaths(zip)) {
      const entry2 = zip.getEntry(classPath);
      if (entry2 && entry2.getData().includes(needle)) return true;
    }
  } catch {
  }
  return false;
}
function findMixinConflict(instRoot2, sinceMs) {
  const report = readLatestCrashReport(instRoot2, sinceMs);
  if (!report) return null;
  const m = /ClassMetadataNotFoundException:\s*([\w.$]+)/.exec(report);
  if (!m) return null;
  const missingClass = m[1];
  const internalName = missingClass.split("$")[0].replace(/\./g, "/");
  const modsDir = path.join(instRoot2, "mods");
  let installed2;
  try {
    installed2 = fs.readdirSync(modsDir).filter((f) => f.toLowerCase().endsWith(".jar"));
  } catch {
    return null;
  }
  const errored = new Set(parseModList(report).filter((e) => e.state.toUpperCase() === "ERROR").map((e) => e.file));
  const first = installed2.filter((f) => errored.has(f));
  const rest = installed2.filter((f) => !errored.has(f));
  for (const group of [first, rest]) {
    const culpritJars = group.filter((f) => mixinsReference(path.join(modsDir, f), internalName));
    if (culpritJars.length > 0) return { missingClass, culpritJars };
  }
  return null;
}
function moveModToDisabled(instRoot2, jarFile) {
  try {
    const disabledDir = path.join(instRoot2, "mods-disabled");
    fs.mkdirSync(disabledDir, { recursive: true });
    const target = path.join(disabledDir, jarFile);
    fs.rmSync(target, { force: true });
    fs.renameSync(path.join(instRoot2, "mods", jarFile), target);
    return jarFile;
  } catch {
    return null;
  }
}
const BUILTIN_MOD_IDS = /* @__PURE__ */ new Set([
  "minecraft",
  "forge",
  "neoforge",
  "fabricloader",
  "fabric-loader",
  "quilt_loader",
  "quilted_fabric_loader",
  "java"
]);
const BUILTIN_LANGUAGES = /* @__PURE__ */ new Set(["javafml", "lowcodefml", "minecraft"]);
const LAUNCHER_MANAGED$2 = /^(neoterra|mcmodhub|customskinloader)/i;
const QUALIFIER_RANK = {
  alpha: -6,
  a: -6,
  beta: -5,
  b: -5,
  milestone: -4,
  m: -4,
  rc: -3,
  cr: -3,
  snapshot: -2,
  ga: 0,
  final: 0,
  release: 0,
  sp: 1
};
function tokenizeVersion(version) {
  const out = [];
  for (const part of version.toLowerCase().split(/[.\-_+]/)) {
    for (const t of part.match(/\d+|[a-z]+/g) ?? []) {
      out.push(/^\d+$/.test(t) ? { n: parseInt(t, 10) } : { s: t, rank: QUALIFIER_RANK[t] ?? 2 });
    }
  }
  while (out.length > 0) {
    const last = out[out.length - 1];
    if ("n" in last && last.n === 0 || "s" in last && last.rank === 0) out.pop();
    else break;
  }
  return out;
}
function compareItems(a, b) {
  const A = a ?? { n: 0 };
  const B = b ?? { n: 0 };
  if ("n" in A && "n" in B) return A.n - B.n;
  if ("s" in A && "s" in B) return A.rank - B.rank || (A.s < B.s ? -1 : A.s > B.s ? 1 : 0);
  if ("n" in A && "s" in B) {
    return a === void 0 ? B.rank < 0 ? 1 : -1 : 1;
  }
  if ("s" in A && "n" in B) return b === void 0 ? A.rank < 0 ? -1 : 1 : -1;
  return 0;
}
function compareVersions(a, b) {
  const ta = tokenizeVersion(a);
  const tb = tokenizeVersion(b);
  const len = Math.max(ta.length, tb.length);
  for (let i = 0; i < len; i++) {
    const c = compareItems(ta[i], tb[i]);
    if (c !== 0) return c;
  }
  return 0;
}
function parseRange(range) {
  const s = range.trim();
  if (!/^[[(]/.test(s)) return null;
  const intervals = [];
  const re = /([[(])\s*([^,\])]*)\s*(?:,\s*([^\])]*))?\s*([\])])/g;
  let m;
  while ((m = re.exec(s)) !== null) {
    const [, open, a, b, close] = m;
    if (b === void 0) {
      intervals.push({ lo: { v: a.trim(), inclusive: true }, hi: { v: a.trim(), inclusive: true } });
    } else {
      intervals.push({
        lo: a.trim() ? { v: a.trim(), inclusive: open === "[" } : null,
        hi: b.trim() ? { v: b.trim(), inclusive: close === "]" } : null
      });
    }
  }
  return intervals.length > 0 ? intervals : null;
}
function satisfies(version, range) {
  if (!range || !version || version === "*") return true;
  const intervals = parseRange(range);
  if (!intervals) return true;
  return intervals.some((iv) => {
    if (iv.lo) {
      const c = compareVersions(version, iv.lo.v);
      if (c < 0 || c === 0 && !iv.lo.inclusive) return false;
    }
    if (iv.hi) {
      const c = compareVersions(version, iv.hi.v);
      if (c > 0 || c === 0 && !iv.hi.inclusive) return false;
    }
    return true;
  });
}
function fabricPredicateSatisfies(version, predicate) {
  const v = version.trim().split("+")[0];
  const alternatives = predicate.split(/\|\||,/).map((a) => a.trim()).filter(Boolean);
  if (alternatives.length === 0) return true;
  return alternatives.some((alt) => alt.split(/\s+/).every((term) => fabricTermSatisfies(v, term)));
}
function fabricTermSatisfies(v, term) {
  const m = /^(>=|<=|>|<|=|\^|~)?\s*v?(.+)$/.exec(term.trim());
  if (!m) return true;
  const op = m[1] ?? "";
  const target = m[2].split("+")[0];
  if (target === "*") return true;
  if ((op === "" || op === "=") && /(^|\.)[xX*](\.|$)/.test(target)) {
    const vp = v.split(/[.-]/);
    return target.split(".").every((p, i) => /^[xX*]$/.test(p) || p === vp[i]);
  }
  const c = compareVersions(v, target);
  const [tMajor, tMinor] = target.split(".");
  const [vMajor, vMinor] = v.split(".");
  switch (op) {
    case ">=":
      return c >= 0;
    case ">":
      return c > 0;
    case "<=":
      return c <= 0;
    case "<":
      return c < 0;
    case "^":
      return c >= 0 && vMajor === tMajor;
    case "~":
      return c >= 0 && vMajor === tMajor && (tMinor === void 0 || (vMinor ?? "0") === tMinor);
    default:
      return c === 0;
  }
}
function satisfiesAll(version, ranges) {
  return ranges.every((r) => satisfies(version, r));
}
function stripComment(value) {
  let quote = null;
  for (let i = 0; i < value.length; i++) {
    const ch = value[i];
    if (quote) {
      if (ch === quote) quote = null;
    } else if (ch === '"' || ch === "'") quote = ch;
    else if (ch === "#") return value.slice(0, i);
  }
  return value;
}
function unquote(value) {
  const v = value.trim();
  const q = v[0];
  if ((q === '"' || q === "'") && v.lastIndexOf(q) > 0) return v.slice(1, v.lastIndexOf(q));
  return v;
}
function parseToml(text) {
  const tables = [{ name: "", kv: {} }];
  const lines = text.split(/\r?\n/);
  let cur = tables[0];
  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const header = /^\[\[?\s*([^\]\s]+)\s*\]\]?\s*(#.*)?$/.exec(trimmed);
    if (header) {
      cur = { name: header[1].replace(/["']/g, ""), kv: {} };
      tables.push(cur);
      continue;
    }
    const kv = /^([A-Za-z0-9_.\-"']+)\s*=\s*(.*)$/.exec(trimmed);
    if (!kv) continue;
    const key = kv[1].replace(/["']/g, "");
    const rawValue = kv[2];
    const multi = /^('''|""")/.exec(rawValue);
    if (multi) {
      if (!rawValue.slice(3).includes(multi[1])) {
        while (++i < lines.length && !lines[i].includes(multi[1])) {
        }
      }
      continue;
    }
    cur.kv[key] = unquote(stripComment(rawValue));
  }
  return tables;
}
const REQUIREMENT_IDS = /* @__PURE__ */ new Set(["fabricloader", "quilt_loader", "java"]);
function parseForgeJarContents(zip, allowNested) {
  const out = { modLoader: "javafml", loaderRange: null, mods: [], nested: [] };
  const entry2 = zip.getEntry("META-INF/mods.toml") ?? zip.getEntry("META-INF/neoforge.mods.toml");
  if (entry2) {
    const manifest = zip.getEntry("META-INF/MANIFEST.MF")?.getData().toString("utf-8");
    const jarVersion = manifest ? /^Implementation-Version:\s*(.+?)\s*$/m.exec(manifest)?.[1] ?? null : null;
    const tables = parseToml(entry2.getData().toString("utf-8"));
    out.modLoader = tables[0].kv.modLoader || "javafml";
    out.loaderRange = tables[0].kv.loaderVersion || null;
    for (const t of tables.filter((x) => x.name === "mods")) {
      if (!t.kv.modId) continue;
      const raw = t.kv.version ?? "";
      out.mods.push({
        modId: t.kv.modId,
        version: raw.includes("${") ? jarVersion ?? "*" : raw || "*",
        deps: []
      });
    }
    for (const t of tables.filter((x) => x.name.startsWith("dependencies."))) {
      const owner = t.name.slice("dependencies.".length);
      const mod = out.mods.find((m) => m.modId === owner) ?? out.mods[0];
      if (!mod || !t.kv.modId) continue;
      mod.deps.push({
        modId: t.kv.modId,
        mandatory: t.kv.mandatory === "true" || t.kv.type === "required",
        range: t.kv.versionRange || null,
        side: (t.kv.side || "BOTH").toUpperCase()
      });
    }
  }
  if (allowNested) {
    const meta = zip.getEntry("META-INF/jarjar/metadata.json");
    if (meta) {
      try {
        const json = JSON.parse(meta.getData().toString("utf-8"));
        for (const j of json.jars ?? []) {
          const data = j.path ? zip.getEntry(j.path)?.getData() : null;
          if (!data) continue;
          try {
            for (const m of parseForgeJarContents(new AdmZip(data), false).mods) out.nested.push({ modId: m.modId, version: m.version });
          } catch {
          }
        }
      } catch {
      }
    }
  }
  return out;
}
function parseFabricStyleJarContents(zip, allowNested = false) {
  const out = { modLoader: "fabricloader", loaderRange: null, mods: [], nested: [] };
  const quiltEntry = zip.getEntry("quilt.mod.json");
  const fabricEntry = zip.getEntry("fabric.mod.json");
  const addNested = (files) => {
    if (!allowNested) return;
    for (const file2 of files) {
      const data = file2 ? zip.getEntry(file2)?.getData() : null;
      if (!data) continue;
      try {
        for (const m of parseFabricStyleJarContents(new AdmZip(data), false).mods) {
          const req = m.deps.filter((d) => d.mandatory && d.range && REQUIREMENT_IDS.has(d.modId)).map((d) => ({ modId: d.modId, range: d.range }));
          out.nested.push({ modId: m.modId, version: m.version, ...req.length > 0 ? { req } : {} });
          for (const alias of m.provides ?? []) out.nested.push({ modId: alias, version: m.version });
        }
      } catch {
      }
    }
  };
  try {
    if (quiltEntry) {
      const json = JSON.parse(quiltEntry.getData().toString("utf-8"));
      const ql = json.quilt_loader;
      if (ql?.id) {
        const deps = [];
        for (const d of ql.depends ?? []) {
          if (typeof d === "string") {
            deps.push({ modId: d, mandatory: true, range: null, side: "BOTH" });
            continue;
          }
          if (!d?.id) continue;
          const range = Array.isArray(d.versions) ? d.versions.join(",") : d.versions ?? null;
          deps.push({ modId: d.id, mandatory: d.optional !== true, range, side: "BOTH" });
        }
        const provides = (ql.provides ?? []).map((p) => typeof p === "string" ? p : p?.id).filter((id) => !!id);
        out.mods.push({ modId: ql.id, version: ql.version || "*", deps, provides });
        out.modLoader = "quilt_loader";
        addNested((ql.jars ?? []).map((j) => typeof j === "string" ? j : void 0));
        return out;
      }
    }
    if (fabricEntry) {
      const json = JSON.parse(fabricEntry.getData().toString("utf-8"));
      if (json.id) {
        const deps = [];
        for (const [depId, rangeRaw] of Object.entries(json.depends ?? {})) {
          const range = Array.isArray(rangeRaw) ? rangeRaw.join(",") : rangeRaw;
          deps.push({ modId: depId, mandatory: true, range: range || null, side: "BOTH" });
        }
        const rawVersion = json.version ?? "*";
        const provides = Array.isArray(json.provides) ? json.provides.filter((p) => typeof p === "string") : [];
        out.mods.push({ modId: json.id, version: rawVersion.includes("${") ? "*" : rawVersion, deps, provides });
        addNested((Array.isArray(json.jars) ? json.jars : []).map((j) => typeof j?.file === "string" ? j.file : void 0));
      }
    }
  } catch {
  }
  return out;
}
function parseModJarContents(zip, loader, allowNested) {
  if (loader === "fabric" || loader === "quilt") return parseFabricStyleJarContents(zip, allowNested);
  if (loader === "forge" || loader === "neoforge") return parseForgeJarContents(zip, allowNested);
  const forge = parseForgeJarContents(zip, allowNested);
  return forge.mods.length > 0 ? forge : parseFabricStyleJarContents(zip, allowNested);
}
const CACHE_FILE$1 = ".mcmodhub-modscan.json";
const CACHE_VERSION$1 = 3;
function loadCache$2(instRoot2) {
  try {
    const parsed = JSON.parse(fs.readFileSync(path.join(instRoot2, CACHE_FILE$1), "utf-8"));
    return parsed.v === CACHE_VERSION$1 && parsed.jars ? parsed.jars : {};
  } catch {
    return {};
  }
}
function scanMods(instRoot2, loader) {
  const modsDir = path.join(instRoot2, "mods");
  let files = [];
  try {
    files = fs.readdirSync(modsDir).filter((f) => f.toLowerCase().endsWith(".jar"));
  } catch {
    return { jars: [], incomplete: false };
  }
  const cache2 = loadCache$2(instRoot2);
  const fresh = {};
  const jars = [];
  let incomplete = false;
  let dirty = false;
  for (const file2 of files) {
    let key;
    try {
      const st = fs.statSync(path.join(modsDir, file2));
      key = `${file2}|${st.size}|${Math.floor(st.mtimeMs)}|${loader ?? ""}`;
    } catch {
      incomplete = true;
      continue;
    }
    let scanned = cache2[key];
    if (!scanned) {
      try {
        scanned = { file: file2, ...parseModJarContents(new AdmZip(path.join(modsDir, file2)), loader, true) };
        dirty = true;
      } catch {
        incomplete = true;
        continue;
      }
    }
    fresh[key] = scanned;
    jars.push(scanned);
  }
  if (dirty || Object.keys(cache2).length !== Object.keys(fresh).length) {
    try {
      fs.writeFileSync(path.join(instRoot2, CACHE_FILE$1), JSON.stringify({ v: CACHE_VERSION$1, jars: fresh }));
    } catch {
    }
  }
  return { jars, incomplete };
}
function readLoaderRequirements(instRoot2, loader) {
  const loaderIds = loader === "quilt" ? /* @__PURE__ */ new Set(["quilt_loader"]) : /* @__PURE__ */ new Set(["fabricloader", "fabric-loader"]);
  const out = { loader: [], java: [] };
  const add = (modId, range, by) => {
    if (!range || range.trim() === "" || range.trim() === "*") return;
    if (loaderIds.has(modId)) out.loader.push({ range, by });
    else if (modId === "java") out.java.push({ range, by });
  };
  for (const jar of scanMods(instRoot2, loader).jars) {
    for (const m of jar.mods) for (const d of m.deps) if (d.mandatory) add(d.modId, d.range, m.modId || jar.file);
    for (const n of jar.nested) for (const r of n.req ?? []) add(r.modId, r.range, n.modId);
  }
  return out;
}
const LTS_JAVA = [8, 11, 17, 21, 25];
function javaMajorForRequirements(base, reqs) {
  if (reqs.length === 0 || reqs.every((r) => fabricPredicateSatisfies(String(base), r.range))) return base;
  return LTS_JAVA.find((m) => m >= base && reqs.every((r) => fabricPredicateSatisfies(String(m), r.range))) ?? base;
}
function addProblem(map, depModId, range, req, confirmed) {
  let p = map.get(depModId);
  if (!p) {
    p = { depModId, ranges: [], requesters: [], confirmed: false };
    map.set(depModId, p);
  }
  if (range && !p.ranges.includes(range)) p.ranges.push(range);
  if (!p.requesters.some((r) => r.file === req.file)) p.requesters.push(req);
  if (confirmed) p.confirmed = true;
}
function collectProvided(jars) {
  const provided = /* @__PURE__ */ new Map();
  const add = (id, version, file2) => {
    const list = provided.get(id) ?? [];
    list.push({ version, file: file2 });
    provided.set(id, list);
  };
  for (const id of BUILTIN_MOD_IDS) add(id, "*", "<builtin>");
  for (const j of jars) {
    for (const m of j.mods) {
      add(m.modId, m.version, j.file);
      for (const alias of m.provides ?? []) add(alias, m.version, j.file);
    }
    for (const m of j.nested) add(m.modId, m.version, j.file);
  }
  return provided;
}
function analyzeMissing(jars, provided) {
  const problems = /* @__PURE__ */ new Map();
  for (const jar of jars) {
    const first = { file: jar.file, modId: jar.mods[0]?.modId ?? "" };
    if (!BUILTIN_LANGUAGES.has(jar.modLoader) && !provided.has(jar.modLoader)) {
      addProblem(problems, jar.modLoader, jar.loaderRange, first, false);
    }
    for (const mod of jar.mods) {
      for (const dep of mod.deps) {
        if (!dep.mandatory || dep.side === "SERVER" || BUILTIN_MOD_IDS.has(dep.modId)) continue;
        if (!provided.has(dep.modId)) addProblem(problems, dep.modId, dep.range, { file: jar.file, modId: mod.modId }, false);
      }
    }
  }
  return problems;
}
function readLoggedDependencyProblems(instRoot2) {
  let text;
  try {
    text = fs.readFileSync(path.join(instRoot2, "logs", "latest.log"), "utf-8");
  } catch {
    return [];
  }
  const out = [];
  for (const m of text.matchAll(/Mod ID: '([^']+)', Requested by: '([^']+)', Expected range: '([^']*)', Actual version: '([^']*)'/g)) {
    out.push({
      depModId: m[1],
      requesterModId: m[2],
      range: m[3] || null,
      actual: m[4] === "[MISSING]" ? null : m[4]
    });
  }
  for (const m of text.matchAll(/Missing language (\S+) version (\S+) wanted by (\S+\.jar)/g)) {
    out.push({ depModId: m[1], range: m[2], actual: null, requesterFile: m[3] });
  }
  return out;
}
const NOT_FOUND_FILE = ".mcmodhub-deps-notfound.json";
const NOT_FOUND_TTL_MS = 24 * 60 * 6e4;
function notFoundKey(p, gameVersion, loader) {
  return `${p.depModId}|${gameVersion}|${loader}|${[...p.ranges].sort().join(",")}`;
}
function loadNotFound(instRoot2) {
  try {
    const parsed = JSON.parse(fs.readFileSync(path.join(instRoot2, NOT_FOUND_FILE), "utf-8"));
    if (parsed.v !== 1 || !parsed.e) return {};
    const now = Date.now();
    const out = {};
    for (const [k, at] of Object.entries(parsed.e)) if (typeof at === "number" && now - at < NOT_FOUND_TTL_MS) out[k] = at;
    return out;
  } catch {
    return {};
  }
}
function saveNotFound(instRoot2, entries) {
  try {
    fs.writeFileSync(path.join(instRoot2, NOT_FOUND_FILE), JSON.stringify({ v: 1, e: entries }));
  } catch {
  }
}
const MAX_DOWNLOADS_PER_DEPENDENCY = 6;
async function searchCandidatesForLoader(modId, gameVersion, loader) {
  const direct = await searchModCandidates(modId, gameVersion, loader);
  if (direct.length > 0 || loader !== "quilt") return direct;
  return searchModCandidates(modId, gameVersion, "fabric");
}
async function filesForLoader(projectId, gameVersion, loader) {
  const direct = await listProjectFiles(projectId, gameVersion, loader);
  if (direct.length > 0 || loader !== "quilt") return direct;
  return listProjectFiles(projectId, gameVersion, "fabric");
}
async function installDependency(problem, gameVersion, modsDir, loader) {
  let candidates;
  try {
    candidates = await searchCandidatesForLoader(problem.depModId, gameVersion, loader);
  } catch {
    return { outcome: "error" };
  }
  let downloads = 0;
  for (const candidate of candidates.slice(0, 5)) {
    let files;
    try {
      files = await filesForLoader(candidate.projectId, gameVersion, loader);
    } catch {
      return { outcome: "error" };
    }
    const fitting = files.filter((f) => satisfiesAll(f.versionNumber, problem.ranges));
    const order = fitting.length > 0 ? fitting : files;
    for (const file2 of order.slice(0, 3)) {
      if (downloads >= MAX_DOWNLOADS_PER_DEPENDENCY) break;
      downloads++;
      let data;
      try {
        const res = await fetch(file2.url, { signal: AbortSignal.timeout(12e4) });
        if (!res.ok) continue;
        data = Buffer.from(await res.arrayBuffer());
      } catch {
        return { outcome: "error" };
      }
      try {
        const parsed = parseModJarContents(new AdmZip(data), loader, true);
        const hit = [...parsed.mods, ...parsed.nested].find((m) => {
          if (m.modId === problem.depModId) return true;
          const provides = "provides" in m ? m.provides : void 0;
          return Array.isArray(provides) && provides.includes(problem.depModId);
        });
        if (!hit || !satisfiesAll(hit.version, problem.ranges)) continue;
      } catch {
        continue;
      }
      const target = path.join(modsDir, file2.filename);
      if (!fs.existsSync(target)) fs.writeFileSync(target, data);
      return { outcome: "installed", file: file2.filename };
    }
  }
  return { outcome: "notfound" };
}
async function ensureModDependencies(opts) {
  const result = { installed: [], quarantined: [] };
  const loader = opts.loader;
  if (loader !== "forge" && loader !== "neoforge" && loader !== "fabric" && loader !== "quilt") return result;
  const { instRoot: instRoot2, gameVersion, onStatus, onLog } = opts;
  const modsDir = path.join(instRoot2, "mods");
  if (!fs.existsSync(modsDir)) fs.mkdirSync(modsDir, { recursive: true });
  const notFound = /* @__PURE__ */ new Set();
  const netError = /* @__PURE__ */ new Set();
  const logged = opts.logged ?? [];
  const cachedNotFound = logged.length === 0 ? loadNotFound(instRoot2) : null;
  let notFoundDirty = false;
  const quarantine = (jars, file2, reason) => {
    if (LAUNCHER_MANAGED$2.test(file2) || !moveModToDisabled(instRoot2, file2)) return false;
    result.quarantined.push({ file: file2, reason });
    const jar = jars.find((j) => j.file === file2);
    for (const m of [...jar?.mods ?? [], ...jar?.nested ?? []]) notFound.add(m.modId);
    onLog?.(`[NeoTerra] ${file2} ishlamadi (${reason}) - mods-disabled papkasiga ko'chirildi.`);
    return true;
  };
  for (const l of logged.filter((x) => x.actual !== null)) {
    const { jars } = scanMods(instRoot2, loader);
    const requesters = jars.filter((j) => j.mods.some((m) => m.modId === l.requesterModId)).map((j) => ({ file: j.file, modId: l.requesterModId ?? "" }));
    const problem = { depModId: l.depModId, ranges: l.range ? [l.range] : [], requesters, confirmed: true };
    onStatus?.(`Mos versiya qidirilmoqda: ${l.depModId}...`);
    const res = await installDependency(problem, gameVersion, modsDir, loader);
    if (res.outcome === "installed" && res.file) {
      result.installed.push(res.file);
      const fresh = scanMods(instRoot2, loader).jars;
      const stale = fresh.filter(
        (j) => j.file !== res.file && j.mods.some((m) => m.modId === l.depModId && !satisfiesAll(m.version, problem.ranges))
      );
      for (const j of stale) moveModToDisabled(instRoot2, j.file);
      onLog?.(`[NeoTerra] ${l.depModId} uchun mos versiya o'rnatildi: ${res.file}`);
    } else if (res.outcome === "notfound") {
      for (const r of requesters) quarantine(jars, r.file, `kerakli "${l.depModId}" modining mos versiyasi topilmadi`);
    }
  }
  for (let round = 0; round < 8; round++) {
    const { jars, incomplete } = scanMods(instRoot2, loader);
    const provided = collectProvided(jars);
    const problems = analyzeMissing(jars, provided);
    for (const l of logged.filter((x) => x.actual === null)) {
      if (provided.has(l.depModId)) continue;
      const requester = l.requesterFile ? { file: l.requesterFile, modId: "" } : (() => {
        const j = jars.find((x) => x.mods.some((m) => m.modId === l.requesterModId));
        return j ? { file: j.file, modId: l.requesterModId ?? "" } : null;
      })();
      if (requester) addProblem(problems, l.depModId, l.range, requester, true);
    }
    if (problems.size === 0) break;
    let installedAny = false;
    for (const p of problems.values()) {
      if (notFound.has(p.depModId) || netError.has(p.depModId)) continue;
      const cacheKey = notFoundKey(p, gameVersion, loader);
      if (cachedNotFound && cachedNotFound[cacheKey]) {
        notFound.add(p.depModId);
        continue;
      }
      onStatus?.(`Yetishmayotgan mod qidirilmoqda: ${p.depModId}...`);
      const res = await installDependency(p, gameVersion, modsDir, loader);
      if (res.outcome === "installed" && res.file) {
        result.installed.push(res.file);
        installedAny = true;
        onLog?.(`[NeoTerra] ${p.depModId} o'rnatildi: ${res.file} (${p.requesters.map((r) => r.file).join(", ")} uchun kerak edi)`);
        onStatus?.(`O'rnatildi: ${res.file}`);
      } else if (res.outcome === "notfound") {
        notFound.add(p.depModId);
        if (cachedNotFound) {
          cachedNotFound[cacheKey] = Date.now();
          notFoundDirty = true;
        }
      } else netError.add(p.depModId);
    }
    if (installedAny) continue;
    if (loader === "forge" || loader === "neoforge") {
      let removedAny = false;
      for (const p of problems.values()) {
        if (!notFound.has(p.depModId)) continue;
        if (incomplete && !p.confirmed) continue;
        for (const r of p.requesters) {
          if (quarantine(jars, r.file, `kerakli "${p.depModId}" modi topilmadi`)) removedAny = true;
        }
      }
      if (!removedAny) break;
    } else {
      break;
    }
  }
  if (cachedNotFound && notFoundDirty) saveNotFound(instRoot2, cachedNotFound);
  return result;
}
const LAUNCHER_MANAGED$1 = /^(neoterra|mcmodhub|customskinloader)/i;
const STORE_DIR = "mods-incompatible";
const CACHE_FILE = ".mcmodhub-modstage.json";
const CACHE_VERSION = 1;
function readJarInfo(path2) {
  let zip;
  try {
    zip = new AdmZip(path2);
  } catch {
    return null;
  }
  const has = (name) => zip.getEntry(name) !== null;
  const info = {
    forgeToml: has("META-INF/mods.toml"),
    neoToml: has("META-INF/neoforge.mods.toml"),
    fabric: has("fabric.mod.json"),
    quilt: has("quilt.mod.json"),
    legacy: has("mcmod.info"),
    mcForge: [],
    mcFabric: []
  };
  if (!info.legacy) {
    const manifest = zip.getEntry("META-INF/MANIFEST.MF")?.getData().toString("utf-8") ?? "";
    info.legacy = /^(TweakClass|FMLCorePlugin):/m.test(manifest);
  }
  try {
    if (info.forgeToml || info.neoToml) {
      for (const m of parseForgeJarContents(zip, false).mods) {
        for (const d of m.deps) if (d.modId === "minecraft" && d.mandatory && d.range) info.mcForge.push(d.range);
      }
    }
    if (info.fabric || info.quilt) {
      for (const m of parseFabricStyleJarContents(zip, false).mods) {
        for (const d of m.deps) if (d.modId === "minecraft" && d.mandatory && d.range) info.mcFabric.push(d.range);
      }
    }
  } catch {
  }
  return info;
}
function isLegacyMc(version) {
  const m = /^1\.(\d+)/.exec(version);
  return m !== null && parseInt(m[1], 10) <= 12;
}
const PLAIN_RELEASE = /^\d+\.\d+(\.\d+)?$/;
const SIMPLE_PREDICATE = /^[\s\d.xX*<>=^~|,]+$/;
const LOADER_NAME = { forge: "Forge", neoforge: "NeoForge", fabric: "Fabric", quilt: "Quilt" };
function incompatibility(info, gameVersion, loader) {
  const forgeLike = loader === "forge" || loader === "neoforge";
  const legacyMc = isLegacyMc(gameVersion);
  if (forgeLike) {
    if (legacyMc) {
      if (!info.legacy && (info.forgeToml || info.neoToml || info.fabric || info.quilt)) {
        return info.fabric || info.quilt ? "Fabric/Quilt uchun" : `yangi Forge (1.13+) uchun`;
      }
      return null;
    }
    const usable2 = loader === "neoforge" ? info.forgeToml || info.neoToml : info.forgeToml;
    if (!usable2) {
      if (info.neoToml) return "NeoForge uchun";
      if (info.fabric || info.quilt) return "Fabric uchun";
      if (info.legacy) return "eski (1.12.2 yoki undan oldingi) Minecraft uchun";
      return null;
    }
    if (PLAIN_RELEASE.test(gameVersion) && info.mcForge.length > 0 && !info.mcForge.every((r) => satisfies(gameVersion, r))) {
      return `boshqa Minecraft versiyasi uchun (${info.mcForge[0]})`;
    }
    return null;
  }
  const usable = loader === "quilt" ? info.fabric || info.quilt : info.fabric;
  if (!usable) {
    if (info.quilt) return "Quilt uchun";
    if (info.forgeToml || info.neoToml) return info.neoToml && !info.forgeToml ? "NeoForge uchun" : "Forge uchun";
    if (info.legacy) return "eski (1.12.2 yoki undan oldingi) Forge uchun";
    return null;
  }
  if (PLAIN_RELEASE.test(gameVersion) && info.mcFabric.length > 0 && info.mcFabric.every((p) => SIMPLE_PREDICATE.test(p)) && !info.mcFabric.every((p) => fabricPredicateSatisfies(gameVersion, p))) {
    return `boshqa Minecraft versiyasi uchun (${info.mcFabric[0]})`;
  }
  return null;
}
function loadCache$1(instRoot2) {
  try {
    const parsed = JSON.parse(fs.readFileSync(path.join(instRoot2, CACHE_FILE), "utf-8"));
    return parsed.v === CACHE_VERSION && parsed.verdicts ? parsed.verdicts : {};
  } catch {
    return {};
  }
}
function loadIndex(storeDir) {
  try {
    return JSON.parse(fs.readFileSync(path.join(storeDir, "index.json"), "utf-8"));
  } catch {
    return {};
  }
}
function jarsIn(dir) {
  try {
    return fs.readdirSync(dir).filter((f) => f.toLowerCase().endsWith(".jar"));
  } catch {
    return [];
  }
}
function stageModsForLaunch(instRoot2, gameVersion, loader) {
  const result = { excluded: [], restored: [] };
  if (!LOADER_NAME[loader]) return result;
  const modsDir = path.join(instRoot2, "mods");
  const storeDir = path.join(instRoot2, STORE_DIR);
  const cache2 = loadCache$1(instRoot2);
  const fresh = {};
  const verdict = (dir, file2) => {
    let key;
    try {
      const st = fs.statSync(path.join(dir, file2));
      key = `${file2}|${st.size}|${Math.floor(st.mtimeMs)}|${gameVersion}|${loader}`;
    } catch {
      return null;
    }
    let reason = cache2[key];
    if (reason === void 0) {
      const info = readJarInfo(path.join(dir, file2));
      reason = info ? incompatibility(info, gameVersion, loader) ?? "" : "";
    }
    fresh[key] = reason;
    return reason || null;
  };
  const index = loadIndex(storeDir);
  let indexDirty = false;
  for (const file2 of jarsIn(storeDir)) {
    if (verdict(storeDir, file2) !== null || fs.existsSync(path.join(modsDir, file2))) continue;
    try {
      fs.renameSync(path.join(storeDir, file2), path.join(modsDir, file2));
      delete index[file2];
      indexDirty = true;
      result.restored.push(file2);
    } catch {
    }
  }
  for (const file2 of jarsIn(modsDir)) {
    if (LAUNCHER_MANAGED$1.test(file2)) continue;
    const reason = verdict(modsDir, file2);
    if (reason === null) continue;
    try {
      fs.mkdirSync(storeDir, { recursive: true });
      const target = path.join(storeDir, file2);
      fs.rmSync(target, { force: true });
      fs.renameSync(path.join(modsDir, file2), target);
      index[file2] = { reason, at: Date.now() };
      indexDirty = true;
      result.excluded.push({ file: file2, reason: `${reason}, ${LOADER_NAME[loader]} ${gameVersion}ga mos emas` });
    } catch {
    }
  }
  if (indexDirty) {
    try {
      fs.mkdirSync(storeDir, { recursive: true });
      fs.writeFileSync(path.join(storeDir, "index.json"), JSON.stringify(index, null, 1));
    } catch {
    }
  }
  try {
    fs.writeFileSync(path.join(instRoot2, CACHE_FILE), JSON.stringify({ v: CACHE_VERSION, verdicts: fresh }));
  } catch {
  }
  return result;
}
function findLegacyModCulprits(instRoot2) {
  const modsDir = path.join(instRoot2, "mods");
  const out = [];
  for (const file2 of jarsIn(modsDir)) {
    if (LAUNCHER_MANAGED$1.test(file2)) continue;
    const info = readJarInfo(path.join(modsDir, file2));
    if (info?.legacy && !info.forgeToml && !info.neoToml && !info.fabric && !info.quilt) out.push(file2);
  }
  return out;
}
function disableModFiles(instRoot2, files) {
  const moved = [];
  const modsDir = path.join(instRoot2, "mods");
  const disabledDir = path.join(instRoot2, "mods-disabled");
  for (const raw of files) {
    const file2 = path.basename(String(raw));
    if (file2 !== raw || !file2.toLowerCase().endsWith(".jar") || !fs.existsSync(path.join(modsDir, file2))) continue;
    try {
      fs.mkdirSync(disabledDir, { recursive: true });
      fs.rmSync(path.join(disabledDir, file2), { force: true });
      fs.renameSync(path.join(modsDir, file2), path.join(disabledDir, file2));
      moved.push(file2);
    } catch {
    }
  }
  return moved;
}
const DEFAULT_OPTIMIZATION = {
  closeBackgroundApps: false,
  cleanJunk: true,
  refreshNetwork: true,
  smartJavaMemory: true
};
function defaultInstallPath() {
  if (process.platform === "win32") return path.join(electron.app.getPath("appData"), ".neoterra");
  if (process.platform === "darwin") return path.join(electron.app.getPath("appData"), "neoterra");
  return path.join(os.homedir(), ".neoterra");
}
function configFilePath() {
  return path.join(electron.app.getPath("userData"), "config.json");
}
let cache$1 = null;
function load$2() {
  if (cache$1) return cache$1;
  const file2 = configFilePath();
  try {
    if (fs.existsSync(file2)) {
      const parsed = JSON.parse(fs.readFileSync(file2, "utf-8"));
      if (typeof parsed.installPath === "string" && parsed.installPath) {
        cache$1 = {
          installPath: parsed.installPath,
          lastInstance: parsed.lastInstance,
          earlyWindowDisabled: parsed.earlyWindowDisabled === true,
          preferredJavaPath: typeof parsed.preferredJavaPath === "string" ? parsed.preferredJavaPath : void 0,
          javaMirrorUrl: typeof parsed.javaMirrorUrl === "string" ? parsed.javaMirrorUrl : void 0,
          optimization: parsed.optimization && typeof parsed.optimization === "object" ? parsed.optimization : void 0,
          softwareGl: parsed.softwareGl && typeof parsed.softwareGl.gpuKey === "string" && typeof parsed.softwareGl.at === "number" ? parsed.softwareGl : void 0,
          softwareGlDisabled: parsed.softwareGlDisabled === true
        };
        return cache$1;
      }
    }
  } catch {
  }
  cache$1 = { installPath: defaultInstallPath() };
  return cache$1;
}
function save$2(config) {
  cache$1 = config;
  const file2 = configFilePath();
  fs.mkdirSync(path.dirname(file2), { recursive: true });
  fs.writeFileSync(file2, JSON.stringify(config, null, 2), "utf-8");
}
function getInstallPath() {
  return load$2().installPath;
}
function setInstallPath(path2) {
  save$2({ ...load$2(), installPath: path2 });
}
function getLastInstance() {
  return load$2().lastInstance ?? null;
}
function setLastInstance(version, loader) {
  save$2({ ...load$2(), lastInstance: { version, loader } });
}
function isEarlyWindowDisabled() {
  return load$2().earlyWindowDisabled === true;
}
function setEarlyWindowDisabled(value) {
  save$2({ ...load$2(), earlyWindowDisabled: value });
}
function getSoftwareGlState() {
  return load$2().softwareGl ?? null;
}
function setSoftwareGlState(state) {
  const next = { ...load$2() };
  if (state) next.softwareGl = state;
  else delete next.softwareGl;
  save$2(next);
}
function isSoftwareGlUserEnabled() {
  return load$2().softwareGlDisabled !== true;
}
function setSoftwareGlUserEnabled(value) {
  save$2({ ...load$2(), softwareGlDisabled: !value });
}
function getPreferredJavaPath() {
  return load$2().preferredJavaPath || null;
}
function setPreferredJavaPath(path2) {
  const next = { ...load$2() };
  if (path2) next.preferredJavaPath = path2;
  else delete next.preferredJavaPath;
  save$2(next);
}
function getJavaMirrorUrl() {
  return (process.env.MCMODHUB_JAVA_MIRROR || load$2().javaMirrorUrl || "").trim() || null;
}
function getOptimizationSettings() {
  const saved = load$2().optimization ?? {};
  const out = { ...DEFAULT_OPTIMIZATION };
  for (const key of Object.keys(out)) {
    if (typeof saved[key] === "boolean") out[key] = saved[key];
  }
  return out;
}
function setOptimizationSettings(patch) {
  const next = getOptimizationSettings();
  if (patch && typeof patch === "object") {
    for (const key of Object.keys(next)) {
      const value = patch[key];
      if (typeof value === "boolean") next[key] = value;
    }
  }
  save$2({ ...load$2(), optimization: next });
  return next;
}
const DOWNLOAD_USER_AGENT = "NeoTerra-Launcher/1.0 (+https://site.neoterra.uz)";
class DownloadError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
    this.name = "DownloadError";
  }
}
const PERMANENT_STATUSES = /* @__PURE__ */ new Set([400, 401, 403, 404, 405, 410, 451]);
function sleep$1(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function hashFile$1(path2, algorithm) {
  const hash = crypto.createHash(algorithm);
  const handle2 = await fs.promises.open(path2, "r");
  try {
    const buffer = Buffer.allocUnsafe(1024 * 1024);
    for (; ; ) {
      const { bytesRead } = await handle2.read(buffer, 0, buffer.length, null);
      if (bytesRead === 0) break;
      hash.update(buffer.subarray(0, bytesRead));
    }
  } finally {
    await handle2.close();
  }
  return hash.digest("hex");
}
const hashMemo = /* @__PURE__ */ new Map();
async function hashFileMemo(path2, algorithm, stat, cache2) {
  if (!cache2) return hashFile$1(path2, algorithm);
  const key = `${algorithm}|${path2}|${stat.size}|${stat.mtimeMs}|${stat.ino}`;
  const hit = hashMemo.get(key);
  if (hit) return hit;
  const digest = await hashFile$1(path2, algorithm);
  if (hashMemo.size > 2e3) hashMemo.clear();
  hashMemo.set(key, digest);
  return digest;
}
async function fileMatches(path2, expected, cacheHash = false) {
  try {
    const stat = await fs.promises.stat(path2);
    if (!stat.isFile()) return false;
    if (expected.size !== void 0 && stat.size !== expected.size) return false;
    if (expected.size === void 0 && stat.size === 0) return false;
    if (expected.sha1 && await hashFileMemo(path2, "sha1", stat, cacheHash) !== expected.sha1.toLowerCase()) return false;
    if (expected.sha256 && await hashFileMemo(path2, "sha256", stat, cacheHash) !== expected.sha256.toLowerCase()) return false;
    return true;
  } catch {
    return false;
  }
}
async function moveIntoPlace(from, to) {
  for (let i = 0; ; i++) {
    try {
      await fs.promises.rm(to, { force: true });
      await fs.promises.rename(from, to);
      return;
    } catch (err) {
      const code = err.code ?? "";
      if (i >= 6 || !["EPERM", "EBUSY", "EACCES"].includes(code)) throw err;
      await sleep$1(150 * (i + 1));
    }
  }
}
async function attemptOnce(url, partPath, opts) {
  const stallMs = opts.stallMs ?? 3e4;
  let offset = 0;
  try {
    offset = (await fs.promises.stat(partPath)).size;
  } catch {
  }
  if (opts.size !== void 0 && offset >= opts.size) {
    await fs.promises.rm(partPath, { force: true });
    offset = 0;
  }
  const controller = new AbortController();
  let timer = setTimeout(() => controller.abort(), stallMs);
  const bump = () => {
    clearTimeout(timer);
    timer = setTimeout(() => controller.abort(), stallMs);
  };
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": DOWNLOAD_USER_AGENT,
        ...opts.headers ?? {},
        ...offset > 0 ? { Range: `bytes=${offset}-` } : {}
      },
      signal: controller.signal
    });
    if (res.status === 416) {
      await fs.promises.rm(partPath, { force: true });
      throw new DownloadError("Server davom ettirishni qabul qilmadi", 416);
    }
    if (!res.ok) throw new DownloadError(`Server javobi: HTTP ${res.status}`, res.status);
    if (!res.body) throw new DownloadError("Server bo'sh javob qaytardi");
    const resume = offset > 0 && res.status === 206;
    if (!resume) offset = 0;
    const contentLength = Number(res.headers.get("content-length")) || 0;
    const total = contentLength > 0 ? offset + contentLength : opts.size ?? 0;
    await fs.promises.mkdir(path.dirname(partPath), { recursive: true });
    const handle2 = await fs.promises.open(partPath, resume ? "a" : "w");
    let received = offset;
    try {
      const reader = res.body.getReader();
      for (; ; ) {
        const { done, value } = await reader.read();
        if (done) break;
        bump();
        await handle2.write(value);
        received += value.length;
        opts.onProgress?.(received, total);
      }
    } finally {
      await handle2.close();
    }
  } catch (err) {
    if (err instanceof DownloadError) throw err;
    if (controller.signal.aborted) {
      throw new DownloadError(`Ulanish to'xtab qoldi (${Math.round(stallMs / 1e3)} soniya ma'lumot kelmadi)`);
    }
    throw new DownloadError(err instanceof Error ? err.message : String(err));
  } finally {
    clearTimeout(timer);
  }
  const stat = await fs.promises.stat(partPath);
  if (opts.size !== void 0 && stat.size !== opts.size) {
    await fs.promises.rm(partPath, { force: true });
    throw new DownloadError(`Fayl hajmi mos kelmadi (${stat.size} bayt, kutilgan ${opts.size})`);
  }
  if (stat.size === 0) {
    await fs.promises.rm(partPath, { force: true });
    throw new DownloadError("Fayl bo'sh keldi");
  }
  if (opts.sha1 && await hashFile$1(partPath, "sha1") !== opts.sha1.toLowerCase()) {
    await fs.promises.rm(partPath, { force: true });
    throw new DownloadError("Fayl buzilgan (SHA-1 mos kelmadi)");
  }
  if (opts.sha256 && await hashFile$1(partPath, "sha256") !== opts.sha256.toLowerCase()) {
    await fs.promises.rm(partPath, { force: true });
    throw new DownloadError("Fayl buzilgan (SHA-256 mos kelmadi)");
  }
}
async function downloadFile(opts) {
  const urls = Array.isArray(opts.url) ? opts.url : [opts.url];
  const attempts = opts.attempts ?? 3;
  const partPath = `${opts.dest}.part`;
  let lastErr = null;
  for (let u = 0; u < urls.length; u++) {
    if (u > 0) await fs.promises.rm(partPath, { force: true });
    for (let attempt = 0; attempt < attempts; attempt++) {
      try {
        await attemptOnce(urls[u], partPath, opts);
        await moveIntoPlace(partPath, opts.dest);
        return;
      } catch (err) {
        lastErr = err;
        if (err instanceof DownloadError && err.status !== void 0 && PERMANENT_STATUSES.has(err.status)) break;
        if (attempt < attempts - 1) await sleep$1(600 * 2 ** attempt + Math.random() * 300);
      }
    }
  }
  throw lastErr instanceof Error ? lastErr : new DownloadError(String(lastErr));
}
async function runPool(items, concurrency, worker) {
  let next = 0;
  const runners = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (next < items.length) {
      const item = items[next++];
      await worker(item);
    }
  });
  await Promise.all(runners);
}
class RangeUnsupportedError extends Error {
}
const PARALLEL_MIN_BYTES = 24 * 1024 * 1024;
async function probeRangeTotal(url, headers) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 2e4);
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": DOWNLOAD_USER_AGENT, ...headers, Range: "bytes=0-0" },
      signal: controller.signal
    });
    try {
      await res.body?.cancel();
    } catch {
    }
    if (res.status !== 206) return null;
    const m = /\/(\d+)\s*$/.exec(res.headers.get("content-range") ?? "");
    return m ? Number(m[1]) : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}
async function remoteFileSize(url, headers = {}) {
  return await probeRangeTotal(url, headers) ?? await probeRangeTotal(url, headers);
}
async function fetchBlock(url, headers, start, end, handle2, stallMs, controllers, onBytes) {
  const controller = new AbortController();
  controllers.add(controller);
  let timer = setTimeout(() => controller.abort(), stallMs);
  const bump = () => {
    clearTimeout(timer);
    timer = setTimeout(() => controller.abort(), stallMs);
  };
  let got = 0;
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": DOWNLOAD_USER_AGENT, ...headers, Range: `bytes=${start}-${end}` },
      signal: controller.signal
    });
    if (res.status === 200) throw new RangeUnsupportedError("Server Range qollamaydi");
    if (res.status !== 206) throw new DownloadError(`Server javobi: HTTP ${res.status}`, res.status);
    if (!res.body) throw new DownloadError("Server bo'sh javob qaytardi");
    const reader = res.body.getReader();
    let pos = start;
    for (; ; ) {
      const { done, value } = await reader.read();
      if (done) break;
      bump();
      if (pos + value.length > end + 1) throw new DownloadError("Server ortiqcha ma'lumot qaytardi");
      await handle2.write(value, 0, value.length, pos);
      pos += value.length;
      got += value.length;
      onBytes(value.length);
    }
    if (pos !== end + 1) throw new DownloadError("Blok to'liq kelmadi");
  } catch (err) {
    onBytes(-got);
    if (err instanceof RangeUnsupportedError || err instanceof DownloadError) throw err;
    if (controller.signal.aborted) throw new DownloadError("Ulanish to'xtab qoldi (ma'lumot kelmadi)");
    throw new DownloadError(err instanceof Error ? err.message : String(err));
  } finally {
    clearTimeout(timer);
    controllers.delete(controller);
  }
}
async function downloadParallelFrom(url, total, opts) {
  const connections = Math.max(1, opts.connections ?? 4);
  const blockBytes = opts.blockBytes ?? 8 * 1024 * 1024;
  const stallMs = opts.stallMs ?? 3e4;
  const attempts = opts.attempts ?? 4;
  const headers = opts.headers ?? {};
  const partPath = `${opts.dest}.part`;
  const sidecarPath = `${opts.dest}.part.json`;
  const blocks = Math.ceil(total / blockBytes);
  const done = /* @__PURE__ */ new Set();
  let resumed = false;
  try {
    const sc = JSON.parse(await fs.promises.readFile(sidecarPath, "utf-8"));
    const st2 = await fs.promises.stat(partPath);
    if (sc.url === url && sc.total === total && sc.blockBytes === blockBytes && st2.size === total) {
      for (const i of sc.done) if (i >= 0 && i < blocks) done.add(i);
      resumed = true;
    }
  } catch {
  }
  await fs.promises.mkdir(path.dirname(partPath), { recursive: true });
  const handle2 = await fs.promises.open(partPath, resumed ? "r+" : "w");
  if (!resumed) await handle2.truncate(total);
  let receivedBase = 0;
  for (const i of done) receivedBase += Math.min(blockBytes, total - i * blockBytes);
  let inflight = 0;
  const report = () => opts.onProgress?.(Math.min(total, receivedBase + inflight), total);
  report();
  let sidecarTimer = null;
  const writeSidecar = async () => {
    const data = { url, total, blockBytes, done: [...done] };
    await fs.promises.writeFile(sidecarPath, JSON.stringify(data)).catch(() => void 0);
  };
  const scheduleSidecar = () => {
    if (sidecarTimer) return;
    sidecarTimer = setTimeout(() => {
      sidecarTimer = null;
      void writeSidecar();
    }, 1500);
  };
  const queue = [];
  for (let i = 0; i < blocks; i++) if (!done.has(i)) queue.push(i);
  const controllers = /* @__PURE__ */ new Set();
  let failure = null;
  const abortAll = () => {
    for (const c of controllers) c.abort();
  };
  const worker = async () => {
    while (!failure) {
      const index = queue.shift();
      if (index === void 0) return;
      const start = index * blockBytes;
      const end = Math.min(total, start + blockBytes) - 1;
      let ok = false;
      let lastErr = null;
      for (let attempt = 0; attempt < attempts && !failure; attempt++) {
        try {
          await fetchBlock(url, headers, start, end, handle2, stallMs, controllers, (n) => {
            inflight += n;
            report();
          });
          ok = true;
          break;
        } catch (err) {
          lastErr = err;
          if (err instanceof RangeUnsupportedError) break;
          if (err instanceof DownloadError && err.status !== void 0 && PERMANENT_STATUSES.has(err.status)) break;
          if (attempt < attempts - 1) await sleep$1(500 * 2 ** attempt + Math.random() * 250);
        }
      }
      if (!ok) {
        failure = failure ?? lastErr ?? new DownloadError("Blok yuklanmadi");
        abortAll();
        return;
      }
      const len = end - start + 1;
      inflight -= len;
      receivedBase += len;
      done.add(index);
      scheduleSidecar();
      report();
    }
  };
  try {
    await Promise.all(Array.from({ length: Math.min(connections, Math.max(1, queue.length)) }, () => worker()));
  } finally {
    if (sidecarTimer) clearTimeout(sidecarTimer);
    await handle2.close().catch(() => void 0);
  }
  if (failure) {
    await writeSidecar();
    throw failure;
  }
  const st = await fs.promises.stat(partPath);
  if (st.size !== total || done.size !== blocks) {
    await fs.promises.rm(partPath, { force: true });
    await fs.promises.rm(sidecarPath, { force: true });
    throw new DownloadError(`Fayl hajmi mos kelmadi (${st.size} bayt, kutilgan ${total})`);
  }
  await moveIntoPlace(partPath, opts.dest);
  await fs.promises.rm(sidecarPath, { force: true });
}
async function downloadFileParallel(opts) {
  const urls = Array.isArray(opts.url) ? opts.url : [opts.url];
  const headers = opts.headers ?? {};
  let lastErr = null;
  for (const url of urls) {
    const total = await probeRangeTotal(url, headers) ?? await probeRangeTotal(url, headers);
    if (total !== null && total >= PARALLEL_MIN_BYTES) {
      try {
        await downloadParallelFrom(url, total, opts);
        return;
      } catch (err) {
        if (!(err instanceof RangeUnsupportedError)) {
          lastErr = err;
          continue;
        }
        await fs.promises.rm(`${opts.dest}.part`, { force: true });
        await fs.promises.rm(`${opts.dest}.part.json`, { force: true });
      }
    }
    try {
      await downloadFile({ ...opts, url });
      return;
    } catch (err) {
      lastErr = err;
    }
  }
  throw lastErr instanceof Error ? lastErr : new DownloadError(String(lastErr));
}
const GITHUB_PROXY_PREFIX = "https://ghfast.top/";
const GITHUB_HOST_RE = /^https:\/\/(github\.com|raw\.githubusercontent\.com|release-assets\.githubusercontent\.com|objects\.githubusercontent\.com|codeload\.github\.com)\//;
function isGithubUrl(url) {
  return GITHUB_HOST_RE.test(url);
}
function githubCandidates(url) {
  return isGithubUrl(url) ? [url, GITHUB_PROXY_PREFIX + url] : [url];
}
async function fetchGithubResilient(url, attempts = 4) {
  const candidates = isGithubUrl(url) ? [url, GITHUB_PROXY_PREFIX + url] : [url];
  let lastErr = null;
  for (let i = 0; i < attempts; i++) {
    const candidate = candidates[i % candidates.length];
    try {
      const res = await fetch(candidate, { signal: AbortSignal.timeout(12e4) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res;
    } catch (err) {
      lastErr = err;
      if (i < attempts - 1) await new Promise((resolve) => setTimeout(resolve, 500 * (i + 1)));
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error(String(lastErr));
}
function adoptiumOs() {
  if (process.platform === "win32") return "windows";
  if (process.platform === "darwin") return "mac";
  return "linux";
}
function adoptiumArch(os2, major, options) {
  if (process.arch !== "arm64") return "x64";
  if (os2 === "mac" && (options.forceX64 || major === 8)) return "x64";
  return "aarch64";
}
function javaBinPath(os2, runtimeDir2) {
  if (os2 === "windows") return path.join(runtimeDir2, "bin", "java.exe");
  if (os2 === "mac") return path.join(runtimeDir2, "Contents", "Home", "bin", "java");
  return path.join(runtimeDir2, "bin", "java");
}
function sleep(ms) {
  return new Promise((done) => setTimeout(done, ms));
}
const RETRYABLE = /* @__PURE__ */ new Set(["EPERM", "EBUSY", "EACCES", "ENOTEMPTY"]);
const RETRY_DELAYS = [200, 400, 800, 1e3, 1e3, 1500, 2e3, 2500];
async function withFsRetry(op) {
  for (let i = 0; ; i++) {
    try {
      return await op();
    } catch (err) {
      const code = err.code ?? "";
      if (i >= RETRY_DELAYS.length || !RETRYABLE.has(code)) throw err;
      await sleep(RETRY_DELAYS[i]);
    }
  }
}
function runQuiet(file2, args, timeout) {
  return new Promise((done) => {
    child_process.execFile(file2, args, { timeout, windowsHide: true }, (err, stdout) => done(err ? "" : String(stdout)));
  });
}
async function killJavaProcessesUnder(dir) {
  if (process.platform !== "win32" || !fs.existsSync(dir)) return;
  const prefix = path.resolve(dir).toLowerCase() + path.sep;
  const script = `Get-CimInstance Win32_Process -Filter "Name='java.exe' OR Name='javaw.exe'" | ForEach-Object { "$($_.ProcessId)|$($_.ExecutablePath)" }`;
  const out = await runQuiet(
    "powershell.exe",
    ["-NoProfile", "-NonInteractive", "-EncodedCommand", Buffer.from(script, "utf16le").toString("base64")],
    2e4
  );
  const pids = [];
  for (const line of out.split(/\r?\n/)) {
    const bar = line.indexOf("|");
    if (bar < 0) continue;
    const pid = Number(line.slice(0, bar).trim());
    const exe = line.slice(bar + 1).trim().toLowerCase();
    if (pid > 0 && pid !== process.pid && exe.startsWith(prefix)) pids.push(pid);
  }
  for (const pid of pids) await runQuiet("taskkill.exe", ["/F", "/T", "/PID", String(pid)], 1e4);
  if (pids.length > 0) await sleep(700);
}
async function clearReadOnly(dir) {
  if (process.platform !== "win32" || !fs.existsSync(dir)) return;
  await runQuiet("attrib.exe", ["-R", path.join(dir, "*"), "/S", "/D"], 3e4);
}
async function forceRemoveDir(dir, opts = {}) {
  if (!fs.existsSync(dir)) return true;
  await killJavaProcessesUnder(dir);
  await clearReadOnly(dir);
  const remove = () => fs.promises.rm(dir, { recursive: true, force: true, maxRetries: 3, retryDelay: 150 });
  try {
    await (opts.patient ? withFsRetry(remove) : remove());
    return true;
  } catch {
    const trashRoot = opts.moveAsideTo;
    if (!trashRoot) return false;
    try {
      await withFsRetry(() => fs.promises.rename(dir, path.join(trashRoot, `.trash-${path.basename(dir)}-${Date.now()}`)));
      return true;
    } catch {
      return false;
    }
  }
}
const activeStaging = /* @__PURE__ */ new Set();
async function sweepStale(jreRoot) {
  let entries;
  try {
    entries = await fs.promises.readdir(jreRoot);
  } catch {
    return;
  }
  for (const entry2 of entries) {
    if (!entry2.endsWith(".partial") && !entry2.startsWith(".staging-") && !entry2.startsWith(".trash-")) continue;
    const full = path.join(jreRoot, entry2);
    if (!activeStaging.has(full)) await forceRemoveDir(full);
  }
}
async function placeStaging(staging, target) {
  try {
    await withFsRetry(() => fs.promises.rename(staging, target));
  } catch (err) {
    if (!RETRYABLE.has(err.code ?? "")) throw err;
    await withFsRetry(() => fs.promises.cp(staging, target, { recursive: true, force: true }));
    await forceRemoveDir(staging);
  }
}
function extractTarGz(archivePath, destDir) {
  return new Promise((done, fail) => {
    child_process.execFile(
      "tar",
      ["-xzf", archivePath, "-C", destDir, "--strip-components", "1"],
      (err, _stdout, stderr) => {
        if (err) {
          fail(new Error(`arxivni ochib bo'lmadi (tar): ${stderr?.trim() || err.message}`));
          return;
        }
        done();
      }
    );
  });
}
async function extractZip(archivePath, destDir) {
  const zip = new AdmZip(archivePath);
  const entries = zip.getEntries();
  const firstPath = entries[0]?.entryName ?? "";
  const rootPrefix = firstPath.includes("/") ? firstPath.slice(0, firstPath.indexOf("/") + 1) : "";
  const destRoot = path.resolve(destDir) + path.sep;
  for (const entry2 of entries) {
    if (entry2.isDirectory) continue;
    const relative = rootPrefix && entry2.entryName.startsWith(rootPrefix) ? entry2.entryName.slice(rootPrefix.length) : entry2.entryName;
    if (!relative) continue;
    const outPath = path.join(destDir, relative);
    if (!path.resolve(outPath).startsWith(destRoot)) continue;
    const data = entry2.getData();
    await withFsRetry(() => fs.promises.mkdir(path.dirname(outPath), { recursive: true }));
    await withFsRetry(() => fs.promises.writeFile(outPath, data));
  }
}
async function anyNonEmpty(paths) {
  for (const path2 of paths) {
    try {
      if ((await fs.promises.stat(path2)).size > 0) return true;
    } catch {
    }
  }
  return false;
}
async function javaHomeLooksComplete(javaBin) {
  if (!await anyNonEmpty([javaBin])) return false;
  const home2 = path.dirname(path.dirname(javaBin));
  const jvmLib = [
    path.join(home2, "bin", "server", "jvm.dll"),
    path.join(home2, "bin", "client", "jvm.dll"),
    path.join(home2, "lib", "server", "libjvm.so"),
    path.join(home2, "lib", "server", "libjvm.dylib"),
    path.join(home2, "lib", "amd64", "server", "libjvm.so"),
    path.join(home2, "lib", "aarch64", "server", "libjvm.so")
  ];
  const coreLib = [path.join(home2, "lib", "modules"), path.join(home2, "lib", "rt.jar")];
  return await anyNonEmpty(jvmLib) && await anyNonEmpty(coreLib);
}
const verifiedBins = /* @__PURE__ */ new Set();
async function verifyRuns(javaBin) {
  if (verifiedBins.has(javaBin)) return;
  let message = "";
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      await new Promise((done, fail) => {
        child_process.execFile(javaBin, ["-version"], { timeout: 3e4, windowsHide: true }, (err) => err ? fail(err) : done());
      });
      verifiedBins.add(javaBin);
      return;
    } catch (err) {
      message = err instanceof Error ? err.message : String(err);
      if (process.platform === "darwin" && /bad cpu type|exec format|ENOEXEC/i.test(message)) {
        throw new Error(
          "Bu Minecraft versiyasi Apple Silicon'da Intel (x64) Java talab qiladi, lekin Rosetta 2 o'rnatilmagan. Terminal'da quyidagini bajaring: softwareupdate --install-rosetta --agree-to-license"
        );
      }
      if (attempt === 0) await sleep(1500);
    }
  }
  throw new Error(`Yuklab olingan Java ishga tushmadi: ${message}`);
}
async function getJson(url) {
  const res = await fetch(url, { signal: AbortSignal.timeout(2e4) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.json();
}
async function adoptiumSource(major, os2, arch) {
  try {
    const data = await getJson(
      `https://api.adoptium.net/v3/assets/latest/${major}/hotspot?architecture=${arch}&image_type=jre&os=${os2}&vendor=eclipse`
    );
    const pkg = data[0]?.binary?.package;
    return pkg?.link ? { kind: "archive", label: "Adoptium", urls: githubCandidates(pkg.link), size: pkg.size, sha256: pkg.checksum } : null;
  } catch {
    return null;
  }
}
async function azulSource(major, os2, arch) {
  try {
    const azulOs = os2 === "mac" ? "macos" : os2;
    const azulExt = os2 === "windows" ? "zip" : "tar.gz";
    const list = await getJson(
      `https://api.azul.com/metadata/v1/zulu/packages/?java_version=${major}&os=${azulOs}&arch=${arch}&archive_type=${azulExt}&java_package_type=jre&javafx_bundled=false&latest=true&release_status=ga&availability_types=CA&page=1&page_size=5`
    );
    const pick2 = list.find((p) => !/crac/i.test(p.name)) ?? list[0];
    return pick2?.download_url ? { kind: "archive", label: "Azul Zulu", urls: [pick2.download_url], size: pick2.size } : null;
  } catch {
    return null;
  }
}
async function javaSources(major, os2, arch) {
  const [adoptium, azul] = await Promise.all([adoptiumSource(major, os2, arch), azulSource(major, os2, arch)]);
  const sources = [];
  if (adoptium) sources.push(adoptium);
  if (azul) sources.push(azul);
  sources.push({ kind: "mojang", label: "Mojang" });
  const mirror = getJavaMirrorUrl();
  if (mirror) {
    const url = mirror.replace("{major}", String(major)).replace("{os}", os2).replace("{arch}", arch).replace("{ext}", os2 === "windows" ? "zip" : "tar.gz");
    let sha2562;
    try {
      const res = await fetch(`${url}.sha256`, { signal: AbortSignal.timeout(1e4) });
      if (res.ok) sha2562 = /[0-9a-f]{64}/i.exec(await res.text())?.[0].toLowerCase();
    } catch {
    }
    sources.push({ kind: "archive", label: "R2 ko'zgu", urls: [url], sha256: sha2562 });
  }
  return sources;
}
const MOJANG_RUNTIME_INDEX = "https://launchermeta.mojang.com/v1/products/java-runtime/2ec0cc96c44e5a76b9c8b7c39df7210883d12871/all.json";
function mojangPlatform(os2, arch) {
  if (os2 === "windows") return arch === "aarch64" ? "windows-arm64" : "windows-x64";
  if (os2 === "mac") return arch === "aarch64" ? "mac-os-arm64" : "mac-os";
  return arch === "aarch64" ? null : "linux";
}
async function installFromMojang(major, os2, arch, destDir, onProgress) {
  const platform = mojangPlatform(os2, arch);
  if (!platform) throw new Error(`Mojang runtime ${os2}/${arch} uchun yo'q`);
  const index = await getJson(MOJANG_RUNTIME_INDEX);
  const components = Object.entries(index[platform] ?? {}).sort(
    ([a], [b]) => Number(a.includes("snapshot")) - Number(b.includes("snapshot"))
  );
  let manifestUrl;
  for (const [, list] of components) {
    const item = list.find((c) => c.manifest?.url && c.version?.name && javaMajorOf(c.version.name) === major);
    if (item?.manifest?.url) {
      manifestUrl = item.manifest.url;
      break;
    }
  }
  if (!manifestUrl) throw new Error(`Mojang'da Java ${major} (${platform}) yo'q`);
  const manifest = await getJson(manifestUrl);
  const strip = (p) => os2 === "mac" && p.startsWith("jre.bundle/") ? p.slice("jre.bundle/".length) : p;
  const entries = Object.entries(manifest.files ?? {});
  const files = entries.filter(([, f]) => f.type === "file" && f.downloads?.raw?.url);
  if (files.length === 0) throw new Error("Mojang runtime ro'yxati bo'sh");
  const total = files.reduce((sum, [, f]) => sum + (f.downloads?.raw?.size ?? 0), 0);
  let finished = 0;
  const inProgress = /* @__PURE__ */ new Map();
  const report = () => {
    let received = finished;
    for (const bytes of inProgress.values()) received += bytes;
    onProgress(received, total);
  };
  for (const [path$1, f] of entries) {
    if (f.type === "directory") await fs.promises.mkdir(path.join(destDir, strip(path$1)), { recursive: true });
  }
  let next = 0;
  let failure = null;
  const worker = async () => {
    while (failure === null && next < files.length) {
      const [path$1, f] = files[next++];
      const raw = f.downloads?.raw;
      if (!raw) continue;
      const dest = path.join(destDir, strip(path$1));
      try {
        await withFsRetry(() => fs.promises.mkdir(path.dirname(dest), { recursive: true }));
        if (raw.size === 0) await withFsRetry(() => fs.promises.writeFile(dest, ""));
        else await downloadFile({
          url: raw.url,
          dest,
          size: raw.size,
          sha1: raw.sha1,
          stallMs: 3e4,
          attempts: 3,
          onProgress: (received) => {
            inProgress.set(path$1, received);
            report();
          }
        });
        inProgress.delete(path$1);
        finished += raw.size;
        report();
        if (f.executable && os2 !== "windows") await fs.promises.chmod(dest, 493).catch(() => void 0);
      } catch (err) {
        if (failure === null) failure = err;
      }
    }
  };
  await Promise.all(Array.from({ length: 8 }, () => worker()));
  if (failure !== null) throw failure;
  if (os2 !== "windows") {
    for (const [path$1, f] of entries) {
      if (f.type === "link" && f.target) await fs.promises.symlink(f.target, path.join(destDir, strip(path$1))).catch(() => void 0);
    }
  }
}
function planRuntime(major, root, options) {
  const effective = ltsJavaFor(major);
  const os2 = adoptiumOs();
  const arch = adoptiumArch(os2, effective, options);
  const jreRoot = path.join(root, "jre");
  const runtimeDir2 = os2 === "windows" ? path.join(jreRoot, String(effective)) : path.join(jreRoot, `${effective}-${arch}`);
  return { major: effective, os: os2, arch, jreRoot, runtimeDir: runtimeDir2, javaBin: javaBinPath(os2, runtimeDir2) };
}
async function healthyInstalled(plan) {
  if (!fs.existsSync(plan.javaBin) || !await javaHomeLooksComplete(plan.javaBin)) return null;
  try {
    await verifyRuns(plan.javaBin);
    return plan.javaBin;
  } catch (err) {
    if (err instanceof Error && /Rosetta/.test(err.message)) throw err;
    return null;
  }
}
async function installRuntime(plan, hooks) {
  const installed2 = await healthyInstalled(plan);
  if (installed2) return installed2;
  verifiedBins.delete(plan.javaBin);
  await fs.promises.mkdir(plan.jreRoot, { recursive: true });
  await sweepStale(plan.jreRoot);
  const archivePath = path.join(
    plan.jreRoot,
    `.download-${plan.major}-${plan.os}-${plan.arch}.${plan.os === "windows" ? "zip" : "tar.gz"}`
  );
  const sources = await javaSources(plan.major, plan.os, plan.arch);
  const errors = [];
  let placed = false;
  for (const source of sources) {
    const staging = path.join(plan.jreRoot, `.staging-${plan.major}-${process.pid}-${Date.now()}`);
    activeStaging.add(staging);
    try {
      await fs.promises.mkdir(staging, { recursive: true });
      if (source.kind === "mojang") {
        await installFromMojang(plan.major, plan.os, plan.arch, staging, hooks.onProgress);
      } else {
        await downloadFile({
          url: source.urls,
          dest: archivePath,
          size: source.size,
          sha256: source.sha256,
          // Sekin internetda ham tugashi uchun: umumiy vaqt emas, faqat "ma'lumot kelmay qoldi" chegarasi.
          stallMs: 45e3,
          attempts: 3,
          onProgress: hooks.onProgress
        });
        hooks.onPhase("extracting");
        if (plan.os === "windows") {
          await extractZip(archivePath, staging);
        } else {
          await extractTarGz(archivePath, staging);
          await fs.promises.chmod(javaBinPath(plan.os, staging), 493).catch(() => void 0);
        }
      }
      if (!await javaHomeLooksComplete(javaBinPath(plan.os, staging))) {
        throw new Error("Java to'liq ochilmadi (java/jvm/modules fayllari yo'q yoki bo'sh)");
      }
      await sleep(500);
      if (!await forceRemoveDir(plan.runtimeDir, { moveAsideTo: plan.jreRoot, patient: true })) {
        errors.push(`EPERM: eski Java papkasini bo'shatib bo'lmadi (${plan.runtimeDir})`);
        break;
      }
      await placeStaging(staging, plan.runtimeDir);
      placed = true;
      break;
    } catch (err) {
      errors.push(`${source.label}: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      activeStaging.delete(staging);
      if (!placed) await forceRemoveDir(staging);
      await fs.promises.rm(archivePath, { force: true }).catch(() => void 0);
    }
  }
  if (!placed) {
    throw new Error(`Java ${plan.major} (${plan.os}/${plan.arch}) yuklanmadi: ${errors.join(" | ")}`);
  }
  hooks.onPhase("verifying");
  await verifyRuns(plan.javaBin);
  return plan.javaBin;
}
const jobs = /* @__PURE__ */ new Map();
function ensureJavaRuntime(major, root, options = {}) {
  const plan = planRuntime(major, root, options);
  const key = plan.runtimeDir.toLowerCase();
  let job = jobs.get(key);
  if (!job) {
    const progress = /* @__PURE__ */ new Set();
    const phase = /* @__PURE__ */ new Set();
    const promise = installRuntime(plan, {
      onProgress: (received, total) => progress.forEach((fn) => fn(received, total)),
      onPhase: (p) => phase.forEach((fn) => fn(p))
    }).finally(() => {
      if (jobs.get(key)?.promise === promise) jobs.delete(key);
    });
    job = { promise, progress, phase };
    jobs.set(key, job);
  }
  if (options.onProgress) job.progress.add(options.onProgress);
  if (options.onPhase) job.phase.add(options.onPhase);
  return job.promise;
}
async function findInstalledJavaRuntime(major, root, options = {}) {
  const plan = planRuntime(major, root, options);
  if (jobs.has(plan.runtimeDir.toLowerCase())) return null;
  return healthyInstalled(plan).catch(() => null);
}
function jreDir() {
  return path.join(getInstallPath(), "jre");
}
async function getJavaState() {
  const installations = await listJavaInstallations(jreDir());
  let preferredPath = getPreferredJavaPath();
  if (preferredPath && !fs.existsSync(preferredPath)) {
    setPreferredJavaPath(null);
    preferredPath = null;
  }
  if (preferredPath && !installations.some((i) => i.path.toLowerCase() === preferredPath.toLowerCase())) {
    const extra = await inspectJava(preferredPath, "system");
    if (extra) installations.push(extra);
  }
  return { installations, preferredPath };
}
async function setPreferredJava(path2) {
  if (path2) {
    const info = await inspectJava(path2, "system");
    if (!info) throw new Error("Bu fayl ishlaydigan Java emas - ro'yxatdan boshqasini tanlang.");
  }
  setPreferredJavaPath(path2);
}
async function resolvePreferredJava(required) {
  const preferred = getPreferredJavaPath();
  if (!preferred) return null;
  const info = await inspectJava(preferred, "system");
  if (!info) return { skipped: `Tanlangan Java ishga tushmadi (${preferred}), avtomatik Java ishlatiladi.` };
  if (!javaMatchesStrict(info.major, required)) {
    return { skipped: `Tanlangan Java ${info.major} bu o'yinga mos emas (aynan Java ${required} kerak), avtomatik Java ishlatiladi.` };
  }
  if (!await isJava64Bit(preferred)) {
    return { skipped: `Tanlangan Java 32-bit (${preferred}) - katta xotira bilan qulaydi, avtomatik 64-bit Java ishlatiladi.` };
  }
  return { path: preferred };
}
function friendlyJavaError(err, major) {
  const raw = err instanceof Error ? err.message : String(err);
  const code = err?.code ?? "";
  if (/Rosetta/.test(raw)) return raw;
  if (code === "ENOSPC" || /ENOSPC|no space left/i.test(raw)) {
    return "Diskda bo'sh joy yetarli emas. Joy bo'shatib, qayta urinib ko'ring.";
  }
  if (["EPERM", "EACCES", "EBUSY"].includes(code) || /EPERM|EACCES|EBUSY/.test(raw)) {
    return `Java fayllarini yozib bo'lmadi - antivirus to'sqinlik qilayotgan bo'lishi mumkin. Antivirusda launcher papkasiga ruxsat berib, qayta urinib ko'ring. (${raw})`;
  }
  if (/sha|hash|checksum|hajm|size mismatch/i.test(raw)) {
    return `Yuklangan Java fayli buzilgan (tekshiruv mos kelmadi). Qayta urinib ko'ring. (${raw})`;
  }
  if (/ENOTFOUND|ECONNRESET|ECONNREFUSED|ETIMEDOUT|EAI_AGAIN|fetch failed|HTTP \d|yuklanmadi|olib bo'lmadi|internet/i.test(raw)) {
    return `Java ${major} yuklab bo'lmadi: internet aloqasini tekshiring (kerak bo'lsa VPN yoqing) va qayta urinib ko'ring. (${raw})`;
  }
  return `Java ${major} o'rnatilmadi: ${raw}`;
}
const running = /* @__PURE__ */ new Map();
function installJava(major, mcVersion, emit2) {
  const forceX64 = mcVersion ? needsIntelJavaOnMac(mcVersion) : false;
  const key = `${major}:${forceX64 ? "x64" : "native"}`;
  const existing = running.get(key);
  if (existing) return existing;
  let lastEmit = 0;
  let lastPercent = -1;
  const job = (async () => {
    try {
      const path2 = await ensureJavaRuntime(major, getInstallPath(), {
        forceX64,
        onProgress: (received, total) => {
          const percent = total > 0 ? Math.floor(received / total * 100) : -1;
          const now = Date.now();
          if (percent === lastPercent && now - lastEmit < 250) return;
          lastPercent = percent;
          lastEmit = now;
          emit2({ major, phase: "downloading", received, total });
        },
        onPhase: (phase) => emit2({ major, phase })
      });
      emit2({ major, phase: "done", path: path2 });
      return path2;
    } catch (err) {
      const message = friendlyJavaError(err, major);
      emit2({ major, phase: "error", message });
      throw new Error(message);
    } finally {
      running.delete(key);
    }
  })();
  running.set(key, job);
  return job;
}
const AUTO_LAN_JAR = "neoterra-autolan-1.0.0.jar";
const AUTO_LAN_FABRIC_JAR = "neoterra-autolan-fabric-1.0.0.jar";
const AUTO_LAN_FORGE_JAR = "neoterra-autolan-forge-1.0.0.jar";
const AUTO_LAN_PROPERTY = "-Dmcmodhub.autolan=true";
const VANILLA_LAN_MAX_PLAYERS = 8;
const LAN_MAX_PLAYERS_LIMIT = 64;
const AUTO_LAN_MAXPLAYERS_PROPERTY = "-Dmcmodhub.maxplayers=";
const MAXPLAYERS_AGENT_JAR = "neoterra-maxplayers-agent-1.0.0.jar";
function sanitizeLanMaxPlayers(v) {
  if (typeof v !== "number" || !Number.isFinite(v)) return null;
  const n = Math.floor(v);
  return n > VANILLA_LAN_MAX_PLAYERS ? Math.min(n, LAN_MAX_PLAYERS_LIMIT) : null;
}
function autoLanJarFor(version, loader, raiseMaxPlayers = false) {
  if (loader === "fabric" || loader === "quilt") return AUTO_LAN_FABRIC_JAR;
  if (loader === "forge") return version === "1.20.1" && !raiseMaxPlayers ? AUTO_LAN_JAR : AUTO_LAN_FORGE_JAR;
  return null;
}
function ensureMaxPlayersAgent(instanceRoot) {
  try {
    const source = bundledJarPath(MAXPLAYERS_AGENT_JAR);
    if (!source || !fs.existsSync(source)) return null;
    const bytes = fs.readFileSync(source);
    const dir = path.join(instanceRoot, "neoterra");
    fs.mkdirSync(dir, { recursive: true });
    const target = path.join(dir, MAXPLAYERS_AGENT_JAR);
    if (!(fs.existsSync(target) && fs.readFileSync(target).equals(bytes))) fs.writeFileSync(target, bytes);
    return target;
  } catch {
    return null;
  }
}
function bundledJarPath(jar) {
  const p1 = path.join(__dirname, "../../resources/mods", jar);
  if (fs.existsSync(p1)) return p1;
  const neoJar = jar.replace(/^mcmodhub-/, "neoterra-");
  const p2 = path.join(__dirname, "../../resources/mods", neoJar);
  if (fs.existsSync(p2)) return p2;
  const legacyJar = jar.replace(/^neoterra-/, "mcmodhub-");
  const p3 = path.join(__dirname, "../../resources/mods", legacyJar);
  if (fs.existsSync(p3)) return p3;
  return p1;
}
function ensureAutoLanInstalled(instanceRoot, version, loader, raiseMaxPlayers = false) {
  try {
    const jar = autoLanJarFor(version, loader, raiseMaxPlayers);
    if (!jar) return false;
    const source = bundledJarPath(jar);
    if (!source || !fs.existsSync(source)) return false;
    const bytes = fs.readFileSync(source);
    const modsDir = path.join(instanceRoot, "mods");
    fs.mkdirSync(modsDir, { recursive: true });
    for (const name of fs.readdirSync(modsDir)) {
      if (/^(mcmodhub|neoterra)-autolan-.*\.jar$/i.test(name) && name !== jar) {
        try {
          fs.unlinkSync(path.join(modsDir, name));
        } catch {
        }
      }
    }
    const target = path.join(modsDir, jar);
    if (fs.existsSync(target) && fs.readFileSync(target).equals(bytes)) return true;
    fs.writeFileSync(target, bytes);
    return true;
  } catch {
    return false;
  }
}
const API_BASE$1 = (process.env.MCMODHUB_API_BASE || "https://site.neoterra.uz").replace(/\/+$/, "");
const ID_RE = /^[a-z]+:[a-z0-9][a-z0-9-]{0,60}$/;
const MAX_BYTES = 28 * 1024 * 1024;
function cosmeticsApiBase() {
  return API_BASE$1;
}
function isSignedR2Url(url) {
  try {
    const u = new URL(url);
    return u.protocol === "https:" && u.hostname.endsWith(".r2.cloudflarestorage.com") && u.searchParams.has("X-Amz-Signature");
  } catch {
    return false;
  }
}
async function readError(res) {
  try {
    const body = await res.json();
    if (typeof body.error === "string") return body.error;
  } catch {
  }
  return `HTTP ${res.status}`;
}
class CosmeticAuthError extends Error {
}
async function fetchCosmeticAsset(id, sessionToken) {
  if (!ID_RE.test(id)) throw new Error("kosmetika id noto'g'ri");
  if (!sessionToken) throw new CosmeticAuthError("login");
  const signRes = await fetch(`${API_BASE$1}/api/cosmetics/url`, {
    method: "POST",
    headers: { Authorization: `Bearer ${sessionToken}`, "Content-Type": "application/json" },
    body: JSON.stringify({ ids: [id] }),
    signal: AbortSignal.timeout(2e4)
  });
  if (signRes.status === 401) throw new CosmeticAuthError("login");
  if (!signRes.ok) throw new Error(await readError(signRes));
  const data = await signRes.json();
  const item = data.items?.[id];
  if (!item?.url || !isSignedR2Url(item.url)) throw new Error("model topilmadi");
  const res = await fetch(item.url, { signal: AbortSignal.timeout(6e4) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const length = Number(res.headers.get("content-length") || 0);
  if (length > MAX_BYTES) throw new Error("fayl juda katta");
  const bytes = await res.arrayBuffer();
  if (bytes.byteLength > MAX_BYTES) throw new Error("fayl juda katta");
  return { bytes, format: item.format === "png" ? "png" : "bbmodel" };
}
let tokenMemo = null;
const TOKEN_REUSE_MIN_MS = 60 * 6e4;
function expiresAtMs(expiresAt) {
  return expiresAt < 1e12 ? expiresAt * 1e3 : expiresAt;
}
async function getCosmeticGameToken(sessionToken) {
  if (tokenMemo && tokenMemo.sessionToken === sessionToken && expiresAtMs(tokenMemo.expiresAt) - Date.now() > TOKEN_REUSE_MIN_MS) {
    return { token: tokenMemo.token, expiresAt: tokenMemo.expiresAt };
  }
  const fresh = await fetchCosmeticGameToken(sessionToken);
  if (fresh) tokenMemo = { sessionToken, ...fresh };
  return fresh;
}
async function fetchCosmeticGameToken(sessionToken) {
  if (!sessionToken) return null;
  try {
    const res = await fetch(`${API_BASE$1}/api/cosmetics/game-token`, {
      method: "POST",
      headers: { Authorization: `Bearer ${sessionToken}` },
      signal: AbortSignal.timeout(15e3)
    });
    if (!res.ok) return null;
    const data = await res.json();
    return typeof data.token === "string" && typeof data.expires_at === "number" ? { token: data.token, expiresAt: data.expires_at } : null;
  } catch {
    return null;
  }
}
const MAX_BODY = 4096;
const MAX_INBOX = 64;
const TOKEN = crypto.randomBytes(18).toString("hex");
let server = null;
let port = 0;
let seq$1 = 0;
const inbox = [];
let toRenderer = null;
const str = (v, max) => typeof v === "string" && v.length > 0 ? v.slice(0, max) : void 0;
const ENUM = /^[A-Z_]{2,12}$/;
const UUID = /^[0-9a-f-]{36}$/i;
const NICK = /^[A-Za-z0-9_]{1,16}$/;
function sanitizePetEvent(raw) {
  if (!raw || typeof raw !== "object") return null;
  const o = raw;
  const serverKey = str(o.server, 120);
  const uuid = str(o.uuid, 36);
  const nick = str(o.nick, 16);
  if (!serverKey || !uuid || !UUID.test(uuid) || !nick || !NICK.test(nick)) return null;
  const emotion = str(o.emotion, 12);
  const order = str(o.order, 12);
  return {
    server: serverKey,
    uuid,
    nick,
    speech: str(o.speech, 300),
    emotion: emotion && ENUM.test(emotion) ? emotion : void 0,
    order: order && ENUM.test(order) ? order : void 0
  };
}
function readBody(req) {
  return new Promise((resolve) => {
    let size = 0;
    const chunks = [];
    req.on("data", (c) => {
      size += c.length;
      if (size > MAX_BODY) {
        req.destroy();
        resolve(null);
        return;
      }
      chunks.push(c);
    });
    req.on("end", () => {
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString("utf-8")));
      } catch {
        resolve(null);
      }
    });
    req.on("error", () => resolve(null));
  });
}
function send(res, code, body) {
  res.writeHead(code, { "Content-Type": "application/json", "Cache-Control": "no-store" });
  res.end(JSON.stringify(body));
}
async function handle(req, res) {
  if (req.headers["x-pet-token"] !== TOKEN) return send(res, 403, { ok: false });
  const url = new URL(req.url ?? "/", "http://127.0.0.1");
  if (req.method === "GET" && url.pathname === "/pet/in") {
    const since = Number(url.searchParams.get("since") ?? 0) || 0;
    const events = since > seq$1 ? inbox : inbox.filter((e) => (e.seq ?? 0) > since);
    return send(res, 200, { seq: seq$1, events });
  }
  if (req.method !== "POST") return send(res, 405, { ok: false });
  const body = await readBody(req);
  if (url.pathname === "/pet/bye") {
    toRenderer?.({ type: "leave" });
    inbox.length = 0;
    return send(res, 200, { ok: true });
  }
  const ev = sanitizePetEvent(body);
  if (!ev) return send(res, 400, { ok: false });
  if (url.pathname === "/pet/hello") toRenderer?.({ type: "join", server: ev.server, uuid: ev.uuid, nick: ev.nick });
  else if (url.pathname === "/pet/out") toRenderer?.({ type: "out", event: ev });
  else return send(res, 404, { ok: false });
  send(res, 200, { ok: true });
}
function startPetBridge(forward) {
  toRenderer = forward;
  if (server) return;
  server = http.createServer((req, res) => {
    handle(req, res).catch(() => {
      if (!res.headersSent) send(res, 500, { ok: false });
    });
  });
  server.on("error", () => {
    server = null;
    port = 0;
  });
  server.listen(0, "127.0.0.1", () => {
    const addr = server?.address();
    port = addr && typeof addr === "object" ? addr.port : 0;
  });
}
function pushPetEvent(raw) {
  const ev = sanitizePetEvent(raw);
  if (!ev) return false;
  ev.seq = ++seq$1;
  inbox.push(ev);
  if (inbox.length > MAX_INBOX) inbox.splice(0, inbox.length - MAX_INBOX);
  return true;
}
function petBridgeInfo() {
  return port > 0 ? { port, token: TOKEN } : null;
}
const BUNDLED = {
  "forge-1.20.1": "neoterra-cosmetics-1.0.0.jar",
  "fabric-1.20.1": "neoterra-cosmetics-fabric-1.0.0.jar"
};
const SYSTEM_MOD_BASE = "https://cdn.mcmodhub.org/mods/system";
const OWN_JAR_RE = /^(neoterra|mcmodhub)-(system|cosmetics)-.*\.jar$/i;
const CONFIG_FILE = "mcmodhub_cosmetics.json";
const CATALOG_FILE = "mcmodhub_catalog.json";
const CATALOG_URL = "https://cdn.mcmodhub.org/cosmetics/index.json";
const COSMETICS_VERSION = "1.20.1";
function cosmeticsRuntimeLoader(version, loader) {
  return !loader && version === COSMETICS_VERSION ? "fabric" : null;
}
function cosmeticsModVariant(loader) {
  if (loader === "forge") return "forge";
  if (loader === "neoforge") return "neoforge";
  if (loader === "fabric" || loader === "quilt") return "fabric";
  return null;
}
const MANIFEST_TTL_MS = 5 * 6e4;
let manifestMemo = null;
function systemCacheDir() {
  return path.join(getInstallPath(), "cache", "mcmodhub-system");
}
async function loadManifest() {
  if (manifestMemo && Date.now() - manifestMemo.at < MANIFEST_TTL_MS && manifestMemo.builds) {
    return { builds: manifestMemo.builds, online: true };
  }
  const diskCopy = path.join(systemCacheDir(), "manifest.json");
  try {
    const res = await fetch(`${SYSTEM_MOD_BASE}/manifest.json?m=${Math.floor(Date.now() / MANIFEST_TTL_MS)}`, {
      signal: AbortSignal.timeout(8e3)
    });
    if (res.ok) {
      const text = await res.text();
      const json = JSON.parse(text);
      if (json.builds && typeof json.builds === "object" && text.length < 256 * 1024) {
        manifestMemo = { at: Date.now(), builds: json.builds };
        try {
          fs.mkdirSync(systemCacheDir(), { recursive: true });
          fs.writeFileSync(diskCopy, text, "utf-8");
        } catch {
        }
        return { builds: json.builds, online: true };
      }
    } else if (res.status === 404) {
      manifestMemo = { at: Date.now(), builds: {} };
      return { builds: {}, online: true };
    }
  } catch {
  }
  try {
    const json = JSON.parse(fs.readFileSync(diskCopy, "utf-8"));
    if (json.builds && typeof json.builds === "object") return { builds: json.builds, online: false };
  } catch {
  }
  return null;
}
async function resolveSystemModBuild(variant, version) {
  const id = `${variant}-${version}`;
  const file2 = `neoterra-system-${id}.jar`;
  const bundledName = BUNDLED[id] || (variant === "fabric" ? "neoterra-cosmetics-fabric-1.0.0.jar" : "neoterra-cosmetics-1.0.0.jar");
  const bundledPath = bundledName ? bundledJarPath(bundledName) : null;
  const bundled = bundledPath && fs.existsSync(bundledPath) ? bundledPath : null;
  const manifest = await loadManifest();
  const entry2 = manifest?.builds[id];
  if (entry2 && /^[0-9a-f]{40}$/i.test(entry2.sha1) && entry2.size > 0 && typeof entry2.path === "string") {
    return { file: file2, remote: { url: `${SYSTEM_MOD_BASE}/${entry2.path}`, sha1: entry2.sha1.toLowerCase(), size: entry2.size }, bundled };
  }
  if (bundled) return { file: file2, remote: null, bundled };
  if (!manifest) return { file: file2, remote: null, bundled: null };
  return null;
}
function isLockError(err) {
  const code = err?.code;
  return code === "EPERM" || code === "EBUSY" || code === "EACCES";
}
function replaceFile(target, write2) {
  const tmp = `${target}.tmp`;
  try {
    write2(tmp);
    fs.renameSync(tmp, target);
    return true;
  } catch (err) {
    try {
      fs.unlinkSync(tmp);
    } catch {
    }
    if (isLockError(err)) return false;
    throw err;
  }
}
function removeSystemMods(instanceRoot) {
  const modsDir = path.join(instanceRoot, "mods");
  if (!fs.existsSync(modsDir)) return;
  for (const name of fs.readdirSync(modsDir)) {
    if (!OWN_JAR_RE.test(name)) continue;
    try {
      fs.unlinkSync(path.join(modsDir, name));
    } catch {
    }
  }
}
async function installSystemMod(instanceRoot, build) {
  try {
    const modsDir = path.join(instanceRoot, "mods");
    fs.mkdirSync(modsDir, { recursive: true });
    const target = path.join(modsDir, build.file);
    let locked = false;
    for (const name of fs.readdirSync(modsDir)) {
      if (!OWN_JAR_RE.test(name) || name.toLowerCase() === build.file.toLowerCase()) continue;
      try {
        fs.unlinkSync(path.join(modsDir, name));
      } catch (err) {
        if (isLockError(err)) locked = true;
      }
    }
    if (locked) return "locked";
    if (build.remote) {
      const { url, sha1, size } = build.remote;
      if (await fileMatches(target, { size, sha1 }, true)) return "up-to-date";
      const cached = path.join(systemCacheDir(), `${sha1}.jar`);
      try {
        if (!await fileMatches(cached, { size, sha1 }, true)) {
          fs.mkdirSync(systemCacheDir(), { recursive: true });
          await downloadFile({ url, dest: cached, sha1, size, attempts: 3, stallMs: 15e3 });
        }
        return replaceFile(target, (tmp) => fs.copyFileSync(cached, tmp)) ? "installed" : "locked";
      } catch {
      }
    }
    if (build.bundled) {
      const bytes = fs.readFileSync(build.bundled);
      if (fs.existsSync(target) && fs.statSync(target).size === bytes.length && fs.readFileSync(target).equals(bytes)) return "up-to-date";
      return replaceFile(target, (tmp) => fs.writeFileSync(tmp, bytes)) ? "installed" : "locked";
    }
    return fs.existsSync(target) ? "up-to-date" : build.remote ? "failed" : "missing";
  } catch {
    return "failed";
  }
}
function writeCosmeticsConfig(instanceRoot, nick, cosmetics, gameToken) {
  fs.mkdirSync(instanceRoot, { recursive: true });
  const data = {
    supabaseUrl: cosmetics?.supabaseUrl ?? null,
    supabaseAnonKey: cosmetics?.supabaseAnonKey ?? null,
    // Model fayllari: mod regexta faqat mcmodhub.uz ga ruxsat beradi
    apiBase: "https://mcmodhub.uz",
    gameToken,
    // Pet sinxroni uchun lokal ko'prik (faqat 127.0.0.1, har ishga tushishda yangi token).
    petBridge: petBridgeInfo(),
    self: {
      nick,
      userId: cosmetics?.userId ?? null,
      slots: cosmetics?.slots ?? {},
      expires: cosmetics?.expires ?? {},
      writtenAt: Date.now()
    }
  };
  const jsonStr = JSON.stringify(data, null, 2);
  fs.writeFileSync(path.join(instanceRoot, "neoterra_cosmetics.json"), jsonStr, "utf-8");
  fs.writeFileSync(path.join(instanceRoot, "mcmodhub_cosmetics.json"), jsonStr, "utf-8");
}
async function refreshCatalogSnapshot(instanceRoot) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(`${CATALOG_URL}?m=${Math.floor(Date.now() / 6e4)}`, { signal: AbortSignal.timeout(2e4) });
      if (res.ok) {
        const text = await res.text();
        const json = JSON.parse(text);
        if (Array.isArray(json.items) && json.items.length > 0 && text.length < 4 * 1024 * 1024) {
          fs.mkdirSync(instanceRoot, { recursive: true });
          fs.writeFileSync(path.join(instanceRoot, "neoterra_catalog.json"), text, "utf-8");
          fs.writeFileSync(path.join(instanceRoot, "mcmodhub_catalog.json"), text, "utf-8");
          return true;
        }
      }
    } catch {
    }
    await new Promise((resolve) => setTimeout(resolve, 1500 * (attempt + 1)));
  }
  return false;
}
const VERSION = "1.2.8";
const SHA256 = "9c7f4343e6c82034958ffb48c14a2cb0c85928be7283103ce17da00c6d5a7b10";
const JAR_NAME = `authlib-injector-${VERSION}.jar`;
const JAR_URLS = [
  `https://authlib-injector.yushi.moe/artifact/56/${JAR_NAME}`,
  `https://github.com/yushijinhun/authlib-injector/releases/download/v${VERSION}/${JAR_NAME}`,
  `https://bmclapi2.bangbang93.com/mirrors/authlib-injector/artifact/56/${JAR_NAME}`
];
const YGGDRASIL_API = "https://hhpnhwfzovbttorprudl.supabase.co/functions/v1/yggdrasil";
function sha256(bytes) {
  return crypto.createHash("sha256").update(bytes).digest("hex");
}
async function fetchWithTimeout(url, ms) {
  return fetch(url, { signal: AbortSignal.timeout(ms) });
}
async function ensureJar(cacheDir) {
  const target = path.join(cacheDir, JAR_NAME);
  try {
    if (fs.existsSync(target) && sha256(fs.readFileSync(target)) === SHA256) return target;
  } catch {
  }
  let lastErr = "nomaʼlum xato";
  for (const url of JAR_URLS) {
    try {
      const res = await fetchWithTimeout(url, 6e4);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const bytes = Buffer.from(await res.arrayBuffer());
      if (sha256(bytes) !== SHA256) throw new Error("SHA-256 mos kelmadi");
      fs.mkdirSync(cacheDir, { recursive: true });
      fs.writeFileSync(`${target}.part`, bytes);
      fs.renameSync(`${target}.part`, target);
      return target;
    } catch (err) {
      lastErr = `${new URL(url).hostname}: ${err instanceof Error ? err.message : String(err)}`;
    }
  }
  throw new Error(`authlib-injector yuklanmadi (${lastErr})`);
}
const METADATA_FRESH_MS = 24 * 60 * 6e4;
function readFreshMetadata(cacheFile) {
  try {
    if (Date.now() - fs.statSync(cacheFile).mtimeMs > METADATA_FRESH_MS) return null;
    const text = fs.readFileSync(cacheFile, "utf-8");
    const parsed = JSON.parse(text);
    return typeof parsed.signaturePublickey === "string" && Array.isArray(parsed.skinDomains) ? text : null;
  } catch {
    return null;
  }
}
async function fetchMetadata(cacheDir) {
  const cacheFile = path.join(cacheDir, "metadata.json");
  const fresh = readFreshMetadata(cacheFile);
  if (fresh) {
    void fetchMetadataFromNetwork(cacheDir, cacheFile).catch(() => void 0);
    return fresh;
  }
  return fetchMetadataFromNetwork(cacheDir, cacheFile);
}
async function fetchMetadataFromNetwork(cacheDir, cacheFile) {
  let lastErr = "nomaʼlum xato";
  for (let i = 0; i < 2; i++) {
    try {
      const res = await fetchWithTimeout(YGGDRASIL_API, 1e4);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      const parsed = JSON.parse(text);
      if (typeof parsed.signaturePublickey !== "string" || !Array.isArray(parsed.skinDomains)) {
        throw new Error("javob formati noto'g'ri");
      }
      try {
        fs.mkdirSync(cacheDir, { recursive: true });
        fs.writeFileSync(cacheFile, text, "utf-8");
      } catch {
      }
      return text;
    } catch (err) {
      lastErr = err instanceof Error ? err.message : String(err);
      if (i === 0) await new Promise((r) => setTimeout(r, 1500));
    }
  }
  try {
    if (fs.existsSync(cacheFile)) return fs.readFileSync(cacheFile, "utf-8");
  } catch {
  }
  throw new Error(`skin serveriga ulanib bo'lmadi (${lastErr})`);
}
async function prepareAuthlibInjector(gameRoot) {
  const cacheDir = path.join(gameRoot, "mcmodhub-cache", "authlib-injector");
  const [jar, metadata] = await Promise.all([ensureJar(cacheDir), fetchMetadata(cacheDir)]);
  return {
    jvmArgs: [
      `-javaagent:${jar}=${YGGDRASIL_API}`,
      `-Dauthlibinjector.yggdrasil.prefetched=${Buffer.from(metadata, "utf-8").toString("base64")}`,
      // Ko'p o'yinchi menyusida "MCModHub" yozuvi chiqmasin - foydalanuvchi uchun hech narsa o'zgarmaydi.
      "-Dauthlibinjector.noShowServerName"
    ],
    log: `authlib-injector ${VERSION} ulandi - skinlar barcha versiyalarda`
  };
}
const PROBE_HOST = "cdn.mcmodhub.org";
const PROBE_PORT = 443;
const CONNECT_TIMEOUT_MS = 2500;
const TOTAL_TIMEOUT_MS = 7e3;
function canConnect(address, family) {
  return new Promise((resolve) => {
    const socket = net.connect({ host: address, port: PROBE_PORT, family });
    const done = (ok) => {
      socket.destroy();
      resolve(ok);
    };
    socket.setTimeout(CONNECT_TIMEOUT_MS, () => done(false));
    socket.once("connect", () => done(true));
    socket.once("error", () => done(false));
  });
}
async function probeOnce() {
  const all = await dns.promises.lookup(PROBE_HOST, { all: true }).catch(() => []);
  const v6 = all.find((a) => a.family === 6);
  const v4 = all.find((a) => a.family === 4);
  if (!v4) return null;
  if (!v6) return false;
  const [ok6, ok4] = await Promise.all([canConnect(v6.address, 6), canConnect(v4.address, 4)]);
  if (!ok4) return null;
  return !ok6;
}
async function probe() {
  const first = await probeOnce();
  if (first !== null) return first;
  await new Promise((resolve) => setTimeout(resolve, 400));
  return await probeOnce() === true;
}
const MEMO_TTL_MS = 10 * 6e4;
let memo = null;
async function isIpv6Broken() {
  if (memo && Date.now() - memo.at < MEMO_TTL_MS) return memo.broken;
  try {
    const result = await Promise.race([
      probe(),
      new Promise((resolve) => setTimeout(() => resolve(null), TOTAL_TIMEOUT_MS))
    ]);
    if (result === null) return false;
    memo = { at: Date.now(), broken: result };
    return result;
  } catch {
    return false;
  }
}
const trusted = /* @__PURE__ */ new Set();
const trustedIndexes = /* @__PURE__ */ new Set();
const preparedNatives = /* @__PURE__ */ new Set();
const javaOk = /* @__PURE__ */ new Set();
let installed = false;
function norm(p) {
  const r = path.resolve(p);
  return process.platform === "win32" ? r.toLowerCase() : r;
}
function trustVerifiedFiles(paths) {
  for (const p of paths) trusted.add(norm(p));
}
function trustVerifiedAssetIndex(indexPath) {
  trustedIndexes.add(norm(indexPath));
}
function trustPreparedNatives(dir) {
  preparedNatives.add(norm(dir));
}
function javaKey(java) {
  if (!java || !/[\\/]/.test(java)) return null;
  try {
    const st = fs.statSync(java);
    return st.isFile() ? `${norm(java)}|${st.size}|${st.mtimeMs}` : null;
  } catch {
    return null;
  }
}
function installMclcFastPath() {
  if (installed) return;
  installed = true;
  try {
    const proto = Handler.prototype;
    const origCheckSum = proto.checkSum;
    if (typeof origCheckSum === "function") {
      proto.checkSum = function(hash, file2) {
        if (typeof file2 === "string" && trusted.has(norm(file2))) return Promise.resolve(true);
        return origCheckSum.call(this, hash, file2);
      };
    }
    const origGetAssets = proto.getAssets;
    if (typeof origGetAssets === "function") {
      proto.getAssets = function() {
        try {
          const o = this.options;
          const assetDir2 = path.resolve(o.overrides.assetRoot || path.join(o.root, "assets"));
          const indexPath = path.join(assetDir2, "indexes", `${o.version.custom || o.version.number}.json`);
          if (!this.isLegacy() && trustedIndexes.has(norm(indexPath)) && fs.existsSync(indexPath)) {
            this.client.emit("debug", "[MCLC]: assets already verified by launcher (fast-path)");
            return Promise.resolve();
          }
        } catch {
        }
        return origGetAssets.call(this);
      };
    }
    const origGetNatives = proto.getNatives;
    if (typeof origGetNatives === "function") {
      proto.getNatives = function() {
        const dir = this.options?.overrides?.natives;
        if (dir && preparedNatives.has(norm(dir)) && fs.existsSync(dir)) {
          this.client.emit("debug", `[MCLC]: Set native path to ${path.resolve(dir)} (launcher)`);
          return Promise.resolve(path.resolve(dir));
        }
        return origGetNatives.call(this);
      };
    }
    const origCheckJava = proto.checkJava;
    if (typeof origCheckJava === "function") {
      proto.checkJava = function(java) {
        const key = javaKey(java);
        if (key && javaOk.has(key)) return Promise.resolve({ run: true });
        return origCheckJava.call(this, java).then((r) => {
          if (r?.run && key) javaOk.add(key);
          return r;
        });
      };
    }
  } catch (err) {
    console.warn("[mclcFastPath] MCLC tuzatmasi qo'llanmadi:", err);
  }
}
const BOOT_START_PERCENT = 75;
const STAGE_FLOOR = { jvm: 76, mods: 85, window: 98 };
const STAGE_CAP = { jvm: 84, mods: 96, window: 99 };
const MODS_RE = /ModLauncher running|Loading \d+ mods|Fabric Loader|fabricloader|Quilt Loader|FMLLoader|Found mod file|Forge mod loading|SpongePowered MIXIN|Loading tweak class|LaunchWrapper|Setting user:/i;
const WINDOW_RE = /Backend library: LWJGL|LWJGL Version: ?\d|GL info: |OpenAL initialized|Sound engine started|Created: \d+x\d+x\d+ /;
const WINDOW_SETTLE_MS = 1200;
const WINDOW_FALLBACK_MS = 75e3;
const TICK_MS$1 = 500;
const LOG_POLL_MS = 1e3;
const LOG_READ_MAX = 512 * 1024;
function startBootTracker(opts) {
  const { emit: emit2 } = opts;
  let stage = "jvm";
  let percent = BOOT_START_PERCENT;
  let lastSent = -1;
  let stopped = false;
  let windowSeen = false;
  let carry = "";
  let settleTimer = null;
  const logPath = path.join(opts.instRoot, "logs", "latest.log");
  let baselineMtime = 0;
  let logOffset = 0;
  try {
    const st = fs.statSync(logPath);
    baselineMtime = st.mtimeMs;
    logOffset = st.size;
  } catch {
  }
  const send2 = () => {
    const shown = Math.min(99, Math.floor(percent));
    if (shown === lastSent) return;
    lastSent = shown;
    emit2({ type: "booting", stage, percent: shown });
  };
  const finish = () => {
    if (stopped) return;
    stop();
    emit2({ type: "window-ready" });
  };
  const advance = (next) => {
    if (stopped) return;
    const order = ["jvm", "mods", "window"];
    if (order.indexOf(next) > order.indexOf(stage)) stage = next;
    percent = Math.max(percent, STAGE_FLOOR[stage]);
    send2();
    if (stage === "window" && !windowSeen) {
      windowSeen = true;
      settleTimer = setTimeout(finish, WINDOW_SETTLE_MS);
    }
  };
  const onLine = (line) => {
    if (stopped || windowSeen) return;
    if (WINDOW_RE.test(line)) advance("window");
    else if (stage === "jvm" && MODS_RE.test(line)) advance("mods");
    else if (stage === "jvm" && line.trim()) percent = Math.max(percent, 78);
  };
  const onText = (text, useCarry) => {
    const lines = ((useCarry ? carry : "") + text).split(/\r?\n/);
    const tail = lines.pop() ?? "";
    if (useCarry) carry = tail.length > 4096 ? "" : tail;
    for (const l of lines) onLine(l);
    if (!useCarry && tail) onLine(tail);
  };
  const ticker = setInterval(() => {
    if (stopped) return;
    const cap = STAGE_CAP[stage];
    if (percent < cap) percent = Math.min(cap, percent + Math.max(0.12, (cap - percent) * 0.04));
    send2();
  }, TICK_MS$1);
  let polling = false;
  const poller = setInterval(() => {
    if (stopped || polling) return;
    polling = true;
    void (async () => {
      try {
        const st = await fs.promises.stat(logPath);
        if (st.mtimeMs <= baselineMtime) return;
        if (st.size < logOffset) logOffset = 0;
        if (st.size === logOffset) return;
        const start = Math.max(logOffset, st.size - LOG_READ_MAX);
        const handle2 = await fs.promises.open(logPath, "r");
        try {
          const buf = Buffer.alloc(st.size - start);
          await handle2.read(buf, 0, buf.length, start);
          logOffset = st.size;
          onText(buf.toString("utf-8"), false);
        } finally {
          await handle2.close();
        }
      } catch {
      } finally {
        polling = false;
      }
    })();
  }, LOG_POLL_MS);
  const fallback = setTimeout(finish, WINDOW_FALLBACK_MS);
  function stop() {
    if (stopped) return;
    stopped = true;
    clearInterval(ticker);
    clearInterval(poller);
    clearTimeout(fallback);
    if (settleTimer) clearTimeout(settleTimer);
  }
  send2();
  return {
    onOutput: (chunk) => onText(chunk, true),
    stop
  };
}
function offlineUuid(username) {
  const hash = crypto.createHash("md5").update(`OfflinePlayer:${username}`, "utf8").digest();
  hash[6] = hash[6] & 15 | 48;
  hash[8] = hash[8] & 63 | 128;
  const hex = hash.toString("hex");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}
function buildOfflineAuth(nick, knownUuid) {
  const uuid = knownUuid && knownUuid.length >= 32 ? knownUuid : offlineUuid(nick);
  const token = uuid.replace(/-/g, "");
  return {
    access_token: token,
    client_token: token,
    uuid,
    name: nick,
    user_properties: "{}",
    meta: { type: "mojang", demo: false }
  };
}
function isValidNick(nick) {
  return /^[A-Za-z0-9_]{3,16}$/.test(nick);
}
const MANIFEST_URL = "https://launchermeta.mojang.com/mc/game/version_manifest_v2.json";
let manifestCache = null;
async function getManifest() {
  if (manifestCache) return manifestCache;
  const res = await fetch(MANIFEST_URL, { signal: AbortSignal.timeout(3e4) });
  if (!res.ok) throw new Error(`Versiyalar ro'yxati olinmadi (HTTP ${res.status})`);
  const data = await res.json();
  manifestCache = data.versions;
  return manifestCache;
}
async function listMinecraftVersions() {
  const versions = await getManifest();
  return versions.map((v) => ({ id: v.id, type: v.type }));
}
const versionJsonCache = /* @__PURE__ */ new Map();
async function getVanillaVersionJson(mcVersion) {
  const cached = versionJsonCache.get(mcVersion);
  if (cached) return cached;
  const versions = await getManifest();
  const entry2 = versions.find((v) => v.id === mcVersion);
  if (!entry2) throw new Error(`${mcVersion} versiyasi topilmadi`);
  const res = await fetch(entry2.url, { signal: AbortSignal.timeout(3e4) });
  if (!res.ok) throw new Error(`${mcVersion} versiya fayli olinmadi (HTTP ${res.status})`);
  const json = await res.json();
  versionJsonCache.set(mcVersion, json);
  return json;
}
function readLocalVersionJson(root, mcVersion) {
  try {
    const json = JSON.parse(fs.readFileSync(path.join(root, "versions", mcVersion, `${mcVersion}.json`), "utf-8"));
    const downloads = json.downloads;
    const assetIndex = json.assetIndex;
    if (json.id === mcVersion && typeof json.mainClass === "string" && Array.isArray(json.libraries) && typeof downloads?.client?.url === "string" && typeof assetIndex?.url === "string") {
      return json;
    }
  } catch {
  }
  return null;
}
async function getVanillaVersionJsonOrCached(root, mcVersion) {
  const memo2 = versionJsonCache.get(mcVersion);
  if (memo2) return memo2;
  const local = readLocalVersionJson(root, mcVersion);
  if (local) {
    versionJsonCache.set(mcVersion, local);
    return local;
  }
  try {
    return await getVanillaVersionJson(mcVersion);
  } catch (err) {
    try {
      const local2 = JSON.parse(fs.readFileSync(path.join(root, "versions", mcVersion, `${mcVersion}.json`), "utf-8"));
      versionJsonCache.set(mcVersion, local2);
      return local2;
    } catch {
      throw err;
    }
  }
}
async function getRequiredJavaMajor(mcVersion, root) {
  try {
    const json = root ? await getVanillaVersionJsonOrCached(root, mcVersion) : await getVanillaVersionJson(mcVersion);
    const jv = json.javaVersion?.majorVersion;
    return typeof jv === "number" && jv > 0 ? jv : null;
  } catch {
    return null;
  }
}
const META_BASE = {
  fabric: "https://meta.fabricmc.net/v2",
  quilt: "https://meta.quiltmc.org/v3"
};
async function fetchMeta(url, attempts = 3) {
  let lastErr = null;
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(2e4) });
      if (res.ok || res.status < 500) return res;
      lastErr = new Error(`HTTP ${res.status}`);
    } catch (err) {
      lastErr = err;
    }
    if (i < attempts - 1) await new Promise((resolve) => setTimeout(resolve, 600 * (i + 1)));
  }
  throw lastErr instanceof Error ? lastErr : new Error(String(lastErr));
}
async function listSupportedGameVersions(kind) {
  try {
    const res = await fetch(`${META_BASE[kind]}/versions/game`, { signal: AbortSignal.timeout(15e3) });
    if (!res.ok) return /* @__PURE__ */ new Set();
    const data = await res.json();
    return new Set(data.map((d) => d.version));
  } catch {
    return /* @__PURE__ */ new Set();
  }
}
const LOADER_LIST_TTL_MS = 6 * 60 * 6e4;
async function loadLoaderList(kind, root, mcVersion, forceNetwork) {
  const cachePath = path.join(root, "versions", `.mcmodhub-${kind}-loaders-${mcVersion}.json`);
  let stale = null;
  try {
    const cached = JSON.parse(fs.readFileSync(cachePath, "utf-8"));
    if (Array.isArray(cached.data) && cached.data.length > 0) {
      if (!forceNetwork && typeof cached.at === "number" && Date.now() - cached.at < LOADER_LIST_TTL_MS) return cached.data;
      stale = cached.data;
    }
  } catch {
  }
  try {
    const url = `${META_BASE[kind]}/versions/loader/${encodeURIComponent(mcVersion)}`;
    const res = stale ? await fetch(url, { signal: AbortSignal.timeout(6e3) }) : await fetchMeta(url);
    if (!res.ok) return stale;
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return stale;
    await fs.promises.mkdir(path.join(root, "versions"), { recursive: true });
    await fs.promises.writeFile(cachePath, JSON.stringify({ at: Date.now(), data })).catch(() => void 0);
    return data;
  } catch {
    return stale;
  }
}
function chooseLoaderVersion(data, excluded, required) {
  const candidates = data.filter((e) => !excluded.has(e.loader.version));
  if (candidates.length === 0) return null;
  const fits = candidates.filter((e) => required.every((r) => fabricPredicateSatisfies(e.loader.version, r)));
  const best = fits.find((e) => e.loader.stable) ?? fits[0] ?? candidates.find((e) => e.loader.stable) ?? candidates[0];
  return best.loader.version;
}
async function pickLoaderVersion(kind, mcVersion, excluded = /* @__PURE__ */ new Set(), required = []) {
  const res = await fetchMeta(`${META_BASE[kind]}/versions/loader/${encodeURIComponent(mcVersion)}`);
  if (!res.ok) throw new Error(`${kind} loader ro'yxati olinmadi (HTTP ${res.status})`);
  const data = await res.json();
  if (data.length === 0) throw new Error(`${mcVersion} uchun ${kind} topilmadi`);
  const picked = chooseLoaderVersion(data, excluded, required);
  if (!picked) {
    throw new Error(
      `${mcVersion} uchun ${kind}'ning ishlaydigan versiyasi topilmadi (barcha ${excluded.size} ta nomzod avvalgi urinish(lar)da sinovdan o'tkazilgan).`
    );
  }
  return picked;
}
function parseLoaderVersion(dirName, kind, mcVersion) {
  const prefix = `${kind}-loader-`;
  const suffix = `-${mcVersion}`;
  if (!dirName.startsWith(prefix) || !dirName.endsWith(suffix)) return null;
  return dirName.slice(prefix.length, dirName.length - suffix.length);
}
function dedupeLibraries(libs) {
  const out = [];
  const index = /* @__PURE__ */ new Map();
  for (const lib of libs) {
    const name = lib?.name;
    const parts = typeof name === "string" ? name.split(":") : [];
    const rules = lib?.rules;
    if (parts.length < 2 || Array.isArray(rules) && rules.length > 0) {
      out.push(lib);
      continue;
    }
    const key = [parts[0], parts[1], parts[3] ?? ""].join(":");
    const at = index.get(key);
    if (at === void 0) {
      index.set(key, out.length);
      out.push(lib);
    } else {
      out[at] = lib;
    }
  }
  return out;
}
async function ensureLoaderProfile(kind, root, mcVersion, excludedLoaderVersions = /* @__PURE__ */ new Set(), requiredLoaderRanges = []) {
  const versionsDir = path.join(root, "versions");
  const fitsRequired = (v) => requiredLoaderRanges.every((r) => fabricPredicateSatisfies(v, r));
  const cachedProfiles = [];
  try {
    for (const name of await fs.promises.readdir(versionsDir)) {
      const loaderVersion = parseLoaderVersion(name, kind, mcVersion);
      if (loaderVersion === null || excludedLoaderVersions.has(loaderVersion)) continue;
      const versionJsonPath = path.join(versionsDir, name, `${name}.json`);
      if (!fs.existsSync(versionJsonPath)) continue;
      try {
        const cached = JSON.parse(fs.readFileSync(versionJsonPath, "utf-8"));
        if (!cached.mainClass || !Array.isArray(cached.libraries) || cached.libraries.length === 0) continue;
        const unique = dedupeLibraries(cached.libraries);
        if (unique.length !== cached.libraries.length) {
          cached.libraries = unique;
          fs.writeFileSync(versionJsonPath, JSON.stringify(cached, null, 2));
        }
        cachedProfiles.push({ customId: name, versionJsonPath, loaderVersion });
      } catch {
      }
    }
  } catch {
  }
  cachedProfiles.sort((a, b) => compareVersions(b.loaderVersion, a.loaderVersion));
  const cachedFit = cachedProfiles.find((p) => fitsRequired(p.loaderVersion));
  let list = await loadLoaderList(kind, root, mcVersion, false);
  let wanted = list ? chooseLoaderVersion(list, excludedLoaderVersions, requiredLoaderRanges) : null;
  if (list && requiredLoaderRanges.length > 0 && (!wanted || !fitsRequired(wanted))) {
    list = await loadLoaderList(kind, root, mcVersion, true) ?? list;
    wanted = chooseLoaderVersion(list, excludedLoaderVersions, requiredLoaderRanges);
  }
  const wantedCached = wanted ? cachedProfiles.find((p) => p.loaderVersion === wanted) : void 0;
  if (wantedCached) return wantedCached;
  if (!wanted) {
    const fallback = cachedFit ?? cachedProfiles[0];
    if (fallback) return fallback;
  }
  try {
    const loaderVersion = wanted ?? await pickLoaderVersion(kind, mcVersion, excludedLoaderVersions, requiredLoaderRanges);
    return await writeLoaderProfile(kind, root, mcVersion, loaderVersion);
  } catch (err) {
    const fallback = cachedFit ?? cachedProfiles[0];
    if (fallback) return fallback;
    throw err;
  }
}
async function writeLoaderProfile(kind, root, mcVersion, loaderVersion) {
  const customId = `${kind}-loader-${loaderVersion}-${mcVersion}`;
  const versionDir = path.join(root, "versions", customId);
  const versionJsonPath = path.join(versionDir, `${customId}.json`);
  await fs.promises.mkdir(versionDir, { recursive: true });
  const [vanilla, profileRes] = await Promise.all([
    getVanillaVersionJsonOrCached(root, mcVersion),
    fetchMeta(
      `${META_BASE[kind]}/versions/loader/${encodeURIComponent(mcVersion)}/${encodeURIComponent(loaderVersion)}/profile/json`
    )
  ]);
  if (!profileRes.ok) throw new Error(`${kind} profili olinmadi (HTTP ${profileRes.status})`);
  const loaderJson = await profileRes.json();
  const merged = {
    ...vanilla,
    ...loaderJson,
    id: customId,
    libraries: dedupeLibraries([...vanilla.libraries ?? [], ...loaderJson.libraries ?? []]),
    arguments: {
      game: [...vanilla.arguments?.game ?? [], ...loaderJson.arguments?.game ?? []],
      jvm: [...vanilla.arguments?.jvm ?? [], ...loaderJson.arguments?.jvm ?? []]
    }
  };
  await fs.promises.writeFile(versionJsonPath, JSON.stringify(merged, null, 2));
  return { customId, versionJsonPath, loaderVersion };
}
const DEFAULT_UI_THEME_ID = "forest";
const DEFAULT_UI_THEME_PACK_URL = "https://cdn.mcmodhub.org/ui-themes/forest.zip";
const MOD_DIR = "mcmodhub_ui";
function uiRoot() {
  return path.join(getInstallPath(), MOD_DIR);
}
function syncThemesToInstance(instanceRoot) {
  const src = uiRoot();
  if (!fs.existsSync(src)) return;
  const dest = path.join(instanceRoot, MOD_DIR);
  function copyDir(from, to) {
    fs.mkdirSync(to, { recursive: true });
    for (const entry2 of fs.readdirSync(from, { withFileTypes: true })) {
      if (entry2.name === "launch_token") continue;
      const s = path.join(from, entry2.name);
      const d = path.join(to, entry2.name);
      if (entry2.isDirectory()) {
        copyDir(s, d);
      } else {
        try {
          if (fs.existsSync(d)) {
            const a = fs.statSync(s);
            const b = fs.statSync(d);
            if (a.size === b.size && b.mtimeMs >= a.mtimeMs) continue;
          }
          fs.copyFileSync(s, d);
        } catch {
        }
      }
    }
  }
  try {
    copyDir(src, dest);
  } catch {
  }
}
function themeDir(id) {
  return path.join(uiRoot(), "themes", id);
}
function backgroundDir(id) {
  return path.join(uiRoot(), "backgrounds", id);
}
function assertSafeId(id) {
  if (!/^[a-z0-9_-]{1,64}$/i.test(id)) {
    throw new Error(`Mavzu ID'si yaroqsiz: ${id}`);
  }
}
function dirSize(dir) {
  if (!fs.existsSync(dir)) return 0;
  let total = 0;
  for (const entry2 of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry2.name);
    total += entry2.isDirectory() ? dirSize(p) : fs.statSync(p).size;
  }
  return total;
}
function patchConfig(patch) {
  const dir = uiRoot();
  fs.mkdirSync(dir, { recursive: true });
  const file2 = path.join(dir, "config.json");
  let current2 = {};
  if (fs.existsSync(file2)) {
    try {
      current2 = JSON.parse(fs.readFileSync(file2, "utf-8"));
    } catch {
      current2 = {};
    }
  }
  fs.writeFileSync(file2, JSON.stringify({ ...current2, ...patch }, null, 2), "utf-8");
}
function setActiveTheme(id) {
  assertSafeId(id);
  patchConfig({ theme: id });
}
function getActiveTheme() {
  const file2 = path.join(uiRoot(), "config.json");
  if (!fs.existsSync(file2)) return null;
  try {
    const cfg = JSON.parse(fs.readFileSync(file2, "utf-8"));
    return typeof cfg.theme === "string" && cfg.theme.trim() ? cfg.theme : null;
  } catch {
    return null;
  }
}
function isUiModEnabled() {
  const file2 = path.join(uiRoot(), "config.json");
  if (!fs.existsSync(file2)) return false;
  try {
    const cfg = JSON.parse(fs.readFileSync(file2, "utf-8"));
    return cfg.uiModEnabled === true;
  } catch {
    return false;
  }
}
function setUiModEnabled(enabled) {
  patchConfig({ uiModEnabled: enabled });
}
function removedThemes() {
  const file2 = path.join(uiRoot(), "config.json");
  if (!fs.existsSync(file2)) return [];
  try {
    const cfg = JSON.parse(fs.readFileSync(file2, "utf-8"));
    return Array.isArray(cfg.removedThemes) ? cfg.removedThemes.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}
function listInstalledThemes() {
  const dir = path.join(uiRoot(), "themes");
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const entry2 of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry2.isDirectory()) continue;
    const id = entry2.name;
    let name = id;
    const meta = path.join(dir, id, "theme.json");
    if (fs.existsSync(meta)) {
      try {
        const parsed = JSON.parse(fs.readFileSync(meta, "utf-8"));
        if (typeof parsed.name === "string" && parsed.name.trim()) name = parsed.name;
      } catch {
      }
    }
    out.push({
      id,
      name,
      hasBackground: fs.existsSync(backgroundDir(id)),
      sizeBytes: dirSize(path.join(dir, id)) + dirSize(backgroundDir(id))
    });
  }
  return out;
}
function installThemeFromZip(id, zipPath) {
  assertSafeId(id);
  if (!fs.existsSync(zipPath)) {
    throw new Error(`Mavzu paketi topilmadi: ${zipPath}`);
  }
  const zip = new AdmZip(zipPath);
  const target = themeDir(id);
  const bgTarget = backgroundDir(id);
  fs.rmSync(target, { recursive: true, force: true });
  fs.rmSync(bgTarget, { recursive: true, force: true });
  fs.mkdirSync(target, { recursive: true });
  for (const entry2 of zip.getEntries()) {
    if (entry2.isDirectory) continue;
    const name = entry2.entryName.replace(/\\/g, "/");
    if (name.includes("..")) continue;
    let dest;
    if (name === "theme.json") {
      dest = path.join(target, "theme.json");
    } else if (name.startsWith("assets/")) {
      dest = path.join(target, name.slice("assets/".length));
    } else if (name.startsWith("background/")) {
      dest = path.join(bgTarget, name.slice("background/".length));
    } else {
      continue;
    }
    fs.mkdirSync(path.join(dest, ".."), { recursive: true });
    fs.writeFileSync(dest, entry2.getData());
  }
  const removed = removedThemes();
  patchConfig({ removedThemes: removed.filter((x) => x !== id) });
  return {
    id,
    name: id,
    hasBackground: fs.existsSync(bgTarget),
    sizeBytes: dirSize(target) + dirSize(bgTarget)
  };
}
async function installThemeFromUrl(id, url) {
  assertSafeId(id);
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Mavzu yuklab olinmadi (${res.status}): ${url}`);
  }
  const tmp = path.join(os.tmpdir(), `mcmodhub-theme-${id}-${Date.now()}.zip`);
  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(tmp, buffer);
  try {
    return installThemeFromZip(id, tmp);
  } finally {
    fs.rmSync(tmp, { force: true });
  }
}
async function ensureDefaultTheme(onStatus) {
  const id = DEFAULT_UI_THEME_ID;
  if (fs.existsSync(path.join(themeDir(id), "theme.json"))) {
    return true;
  }
  if (!isUiModEnabled()) {
    return false;
  }
  if (listInstalledThemes().length > 0) {
    return true;
  }
  if (removedThemes().includes(id)) {
    return false;
  }
  try {
    onStatus?.("NeoTerra mavzusi yuklanmoqda...");
    await installThemeFromUrl(id, DEFAULT_UI_THEME_PACK_URL);
    onStatus?.("NeoTerra mavzusi o'rnatildi");
    return true;
  } catch (err) {
    onStatus?.(
      `Mavzu yuklanmadi (${err instanceof Error ? err.message : String(err)}) - o'yin standart ko'rinishda ochiladi`
    );
    return false;
  }
}
function removeTheme(id) {
  assertSafeId(id);
  fs.rmSync(themeDir(id), { recursive: true, force: true });
  fs.rmSync(backgroundDir(id), { recursive: true, force: true });
  const removed = removedThemes();
  const patch = {
    removedThemes: removed.includes(id) ? removed : [...removed, id]
  };
  if (getActiveTheme() === id) patch.theme = null;
  if (listInstalledThemes().length === 0) patch.uiModEnabled = false;
  patchConfig(patch);
}
const UI_MOD_VERSION = "0.1.0";
const UI_MOD_FILE = `mcmodhub_ui-${UI_MOD_VERSION}.jar`;
const UI_MOD_URL = `https://cdn.mcmodhub.org/mods/${UI_MOD_FILE}`;
const MIN_VALID_BYTES = 5e4;
function modsDirIn(dir) {
  const m = path.join(dir, "mods");
  fs.mkdirSync(m, { recursive: true });
  return m;
}
function removeOtherVersions(dir) {
  for (const name of fs.readdirSync(dir)) {
    if (/^mcmodhub_ui-.*\.jar$/i.test(name) && name !== UI_MOD_FILE) {
      try {
        fs.unlinkSync(path.join(dir, name));
      } catch {
      }
    }
  }
}
async function ensureUiMod(instanceRoot, onStatus) {
  const dir = modsDirIn(instanceRoot);
  const target = path.join(dir, UI_MOD_FILE);
  if (fs.existsSync(target)) {
    removeOtherVersions(dir);
    return true;
  }
  if (!isUiModEnabled()) {
    return false;
  }
  try {
    onStatus?.("NeoTerra UI modi yuklanmoqda...");
    const res = await fetch(UI_MOD_URL, { signal: AbortSignal.timeout(12e4) });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < MIN_VALID_BYTES) {
      throw new Error(`fayl juda kichik (${buf.length} bayt)`);
    }
    if (buf[0] !== 80 || buf[1] !== 75) {
      throw new Error("yuklangan fayl jar emas");
    }
    fs.writeFileSync(target, buf);
    removeOtherVersions(dir);
    onStatus?.("NeoTerra UI modi o'rnatildi");
    return true;
  } catch (err) {
    onStatus?.(
      `NeoTerra UI modi yuklanmadi (${err instanceof Error ? err.message : String(err)}) - standart menyu bilan davom etamiz`
    );
    return false;
  }
}
function removeUiMod(instancesRoot) {
  setUiModEnabled(false);
  let ok = true;
  if (!fs.existsSync(instancesRoot)) return true;
  for (const inst of fs.readdirSync(instancesRoot)) {
    const dir = path.join(instancesRoot, inst, "mods");
    if (!fs.existsSync(dir)) continue;
    for (const name of fs.readdirSync(dir)) {
      if (!/^mcmodhub_ui-.*\.jar$/i.test(name)) continue;
      try {
        fs.unlinkSync(path.join(dir, name));
      } catch {
        ok = false;
      }
    }
  }
  return ok;
}
function osName() {
  if (process.platform === "win32") return "windows";
  if (process.platform === "darwin") return "osx";
  return "linux";
}
function ruleMatches(rule) {
  if (rule.features) return false;
  const os$1 = rule.os;
  if (!os$1) return true;
  if (os$1.name && os$1.name !== osName()) return false;
  if (os$1.arch) {
    const arch = process.arch;
    const matches = os$1.arch === "x86" && arch === "ia32" || os$1.arch === "arm64" && arch === "arm64" || (os$1.arch === "x64" || os$1.arch === "amd64") && arch === "x64";
    if (!matches) return false;
  }
  if (os$1.version && !new RegExp(os$1.version).test(os.release())) return false;
  return true;
}
function rulesAllow(rules) {
  if (!rules || rules.length === 0) return true;
  let allowed = false;
  for (const rule of rules) {
    if (ruleMatches(rule)) allowed = rule.action === "allow";
  }
  return allowed;
}
function mavenPath(name) {
  const [coords, ext = "jar"] = name.split("@");
  const [group, artifact, version, classifier] = coords.split(":");
  const file2 = `${artifact}-${version}${classifier ? `-${classifier}` : ""}.${ext}`;
  return {
    path: `${group.replace(/\./g, "/")}/${artifact}/${version}/${file2}`,
    key: `${group}:${artifact}${classifier ? `:${classifier}` : ""}`
  };
}
function libraryDownload(lib) {
  if (!rulesAllow(lib.rules)) return null;
  const artifact = lib.downloads?.artifact;
  if (artifact) {
    if (!artifact.path || !artifact.url) return null;
    return { path: artifact.path, url: artifact.url, sha1: artifact.sha1, size: artifact.size };
  }
  if (lib.natives) return null;
  if (lib.name && lib.url) {
    const base = lib.url.endsWith("/") ? lib.url : `${lib.url}/`;
    const { path: path2 } = mavenPath(lib.name);
    return { path: path2, url: base + path2, sha1: lib.sha1, size: lib.size };
  }
  return null;
}
const ASSET_HOST = "https://resources.download.minecraft.net";
const ASSET_MARKER_MAX_AGE_MS = 7 * 24 * 60 * 6e4;
const ASSET_MARKER_SAMPLE = 40;
function assetMarkerPath(root, assetIndexName) {
  return path.join(root, "assets", "indexes", `${assetIndexName}.mcmodhub-ok.json`);
}
async function readAssetMarker(path2, key) {
  try {
    const m = JSON.parse(await fs.promises.readFile(path2, "utf-8"));
    return m?.key === key && typeof m.at === "number" && Date.now() - m.at < ASSET_MARKER_MAX_AGE_MS;
  } catch {
    return false;
  }
}
async function sampleAssetsPresent(root, objects) {
  const n = Math.min(ASSET_MARKER_SAMPLE, objects.length);
  for (let i = 0; i < n; i++) {
    const obj = objects[Math.floor(Math.random() * objects.length)];
    if (!await fileMatches(path.join(root, "assets", "objects", obj.hash.slice(0, 2), obj.hash), { size: obj.size })) return false;
  }
  return true;
}
async function ensureGameFiles(opts) {
  const { root, versionJson, jarId, assetIndexName, deep = false } = opts;
  const failed = [];
  const verified = [];
  let assetsVerifiedIndex;
  let fixed = 0;
  let lastEmit = 0;
  const report = (phase, current2, total, force = false) => {
    const now = Date.now();
    if (!force && now - lastEmit < 120) return;
    lastEmit = now;
    opts.onProgress?.(phase, current2, total);
  };
  const client = versionJson.downloads?.client;
  const jarPath = path.join(root, "versions", jarId, `${jarId}.jar`);
  if (client?.url) {
    if (!await fileMatches(jarPath, { size: client.size, sha1: client.sha1 }, !deep)) {
      try {
        await downloadFile({
          url: client.url,
          dest: jarPath,
          size: client.size,
          sha1: client.sha1,
          onProgress: (received, total) => report("client", received, total)
        });
        fixed++;
      } catch (err) {
        failed.push(`o'yin jar'i: ${err instanceof Error ? err.message : String(err)}`);
      }
    }
  }
  const jsonPath = path.join(root, "versions", jarId, `${jarId}.json`);
  if (versionJson.id === jarId && !fs.existsSync(jsonPath)) {
    await fs.promises.mkdir(path.join(root, "versions", jarId), { recursive: true });
    await fs.promises.writeFile(jsonPath, JSON.stringify(versionJson, null, 4));
  }
  const libs = [];
  const seen = /* @__PURE__ */ new Set();
  for (const lib of versionJson.libraries ?? []) {
    const dl = libraryDownload(lib);
    if (dl && !seen.has(dl.path)) {
      seen.add(dl.path);
      libs.push(dl);
    }
  }
  let libsDone = 0;
  await runPool(libs, 8, async (lib) => {
    const dest = path.join(root, "libraries", lib.path);
    if (await fileMatches(dest, { size: lib.size, sha1: deep ? lib.sha1 : void 0 })) {
      verified.push(dest);
    } else {
      try {
        await downloadFile({ url: lib.url, dest, size: lib.size, sha1: lib.sha1 });
        verified.push(dest);
        fixed++;
      } catch (err) {
        failed.push(`${lib.path}: ${err instanceof Error ? err.message : String(err)}`);
      }
    }
    report("libraries", ++libsDone, libs.length);
  });
  report("libraries", libs.length, libs.length, true);
  const index = versionJson.assetIndex;
  if (index?.url) {
    const indexPath = path.join(root, "assets", "indexes", `${assetIndexName}.json`);
    try {
      if (!await fileMatches(indexPath, { size: index.size, sha1: index.sha1 }, !deep)) {
        await downloadFile({ url: index.url, dest: indexPath, size: index.size, sha1: index.sha1 });
        fixed++;
      }
      const parsed = JSON.parse(await fs.promises.readFile(indexPath, "utf-8"));
      const objects = Object.values(parsed.objects ?? {});
      const unique = Array.from(new Map(objects.map((o) => [o.hash, o])).values());
      const objectPath = (hash) => path.join(root, "assets", "objects", hash.slice(0, 2), hash);
      const markerPath2 = assetMarkerPath(root, assetIndexName);
      const markerKey = `${index.sha1 ?? index.url}|${index.size ?? ""}|${unique.length}`;
      if (!deep && await readAssetMarker(markerPath2, markerKey) && await sampleAssetsPresent(root, unique)) {
        for (const obj of unique) verified.push(objectPath(obj.hash));
        assetsVerifiedIndex = indexPath;
      } else {
        const failedBefore = failed.length;
        let assetsDone = 0;
        await runPool(unique, 24, async (obj) => {
          const dir = obj.hash.slice(0, 2);
          const dest = objectPath(obj.hash);
          if (await fileMatches(dest, { size: obj.size, sha1: deep ? obj.hash : void 0 })) {
            verified.push(dest);
          } else {
            try {
              await downloadFile({
                url: `${ASSET_HOST}/${dir}/${obj.hash}`,
                dest,
                size: obj.size,
                sha1: obj.hash,
                stallMs: 2e4
              });
              verified.push(dest);
              fixed++;
            } catch (err) {
              failed.push(`resurs ${obj.hash}: ${err instanceof Error ? err.message : String(err)}`);
            }
          }
          report("assets", ++assetsDone, unique.length);
        });
        if (failed.length === failedBefore) {
          assetsVerifiedIndex = indexPath;
          const marker = { key: markerKey, count: unique.length, at: Date.now() };
          await fs.promises.writeFile(markerPath2, JSON.stringify(marker)).catch(() => void 0);
        }
      }
      report("assets", unique.length, unique.length, true);
    } catch (err) {
      failed.push(`resurs indeksi: ${err instanceof Error ? err.message : String(err)}`);
    }
  }
  return { fixed, failed, verified, assetsVerifiedIndex };
}
async function ensureNatives(opts) {
  const os2 = osName();
  const arch = process.arch === "ia32" ? "32" : "64";
  const jars = [];
  const seen = /* @__PURE__ */ new Set();
  for (const lib of opts.versionJson.libraries ?? []) {
    const classifiers = lib.downloads?.classifiers;
    if (!classifiers || !rulesAllow(lib.rules)) continue;
    const key = lib.natives?.[os2]?.replace(/\$\{arch\}/g, arch) ?? `natives-${os2}`;
    const c = classifiers[key] ?? (os2 === "osx" ? classifiers["natives-macos"] ?? classifiers["natives-osx"] : void 0);
    if (!c?.path || !c.url || seen.has(c.path)) continue;
    seen.add(c.path);
    jars.push({ dl: { path: c.path, url: c.url, sha1: c.sha1, size: c.size }, exclude: lib.extract?.exclude ?? [] });
  }
  if (jars.length === 0) return null;
  const dir = path.join(opts.root, "natives", opts.dirName);
  await fs.promises.mkdir(dir, { recursive: true });
  const failed = [];
  let fixed = 0;
  for (const { dl, exclude } of jars) {
    const jarPath = path.join(opts.root, "libraries", dl.path);
    try {
      if (!await fileMatches(jarPath, { size: dl.size, sha1: opts.deep ? dl.sha1 : void 0 })) {
        await downloadFile({ url: dl.url, dest: jarPath, size: dl.size, sha1: dl.sha1 });
      }
      let zip;
      try {
        zip = new AdmZip(jarPath);
      } catch {
        await fs.promises.rm(jarPath, { force: true });
        await downloadFile({ url: dl.url, dest: jarPath, size: dl.size, sha1: dl.sha1 });
        zip = new AdmZip(jarPath);
      }
      for (const entry2 of zip.getEntries()) {
        if (entry2.isDirectory) continue;
        const name = entry2.entryName.replace(/\\/g, "/");
        if (name.startsWith("META-INF/") || exclude.some((p) => name.startsWith(p))) continue;
        if (name.startsWith("/") || name.split("/").includes("..")) continue;
        const dest = path.join(dir, ...name.split("/"));
        const st = await fs.promises.stat(dest).catch(() => null);
        if (st?.isFile() && st.size === entry2.header.size) continue;
        await fs.promises.mkdir(path.dirname(dest), { recursive: true });
        await fs.promises.writeFile(dest, entry2.getData());
        fixed++;
      }
    } catch (err) {
      failed.push(`natives ${dl.path}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }
  return { dir, fixed, failed };
}
const PROMOTIONS_URL = "https://files.minecraftforge.net/net/minecraftforge/forge/promotions_slim.json";
const MAVEN_HOSTS = ["https://maven.minecraftforge.net/", "https://files.minecraftforge.net/maven/"];
const METADATA_PATH = "net/minecraftforge/forge/maven-metadata.xml";
let promoCache = null;
async function getPromotions() {
  if (promoCache) return promoCache;
  const res = await fetch(PROMOTIONS_URL, { signal: AbortSignal.timeout(15e3) });
  if (!res.ok) throw new Error(`Forge promotions olinmadi (HTTP ${res.status})`);
  promoCache = await res.json();
  return promoCache;
}
let mavenIdsCache = null;
async function getMavenVersionIds() {
  if (mavenIdsCache) return mavenIdsCache;
  let lastErr = null;
  for (const host of MAVEN_HOSTS) {
    try {
      const res = await fetch(host + METADATA_PATH, { signal: AbortSignal.timeout(2e4) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const xml = await res.text();
      const ids = Array.from(xml.matchAll(/<version>([^<]+)<\/version>/g), (m) => m[1]);
      if (ids.length > 0) {
        mavenIdsCache = ids;
        return ids;
      }
    } catch (err) {
      lastErr = err;
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error("Forge Maven ro'yxati olinmadi");
}
function mcVersionParts(version) {
  return version.split(/[.\-_]/).map((p) => parseInt(p, 10) || 0);
}
function isSupportedForgeMc(mcVersion) {
  const [maj = 0, min = 0, patch = 0] = mcVersionParts(mcVersion);
  if (maj !== 1) return true;
  return min > 7 || min === 7 && patch >= 2;
}
async function listForgeSupportedVersions() {
  try {
    const { promos } = await getPromotions();
    const set = /* @__PURE__ */ new Set();
    for (const key of Object.keys(promos)) {
      const mc = key.replace(/-recommended$|-latest$/, "");
      if (isSupportedForgeMc(mc)) set.add(mc);
    }
    return set;
  } catch {
    return /* @__PURE__ */ new Set();
  }
}
function pickVersionId(ids, mcVersion, build) {
  const ofMc = ids.filter((id) => id.startsWith(`${mcVersion}-`));
  if (build) {
    const exact = ofMc.find((id) => id === `${mcVersion}-${build}`);
    if (exact) return exact;
    const suffixed = ofMc.find((id) => id.startsWith(`${mcVersion}-${build}-`));
    if (suffixed) return suffixed;
  }
  return null;
}
function guessVersionIds(mcVersion, build) {
  return [
    `${mcVersion}-${build}`,
    `${mcVersion}-${build}-${mcVersion}`,
    `${mcVersion}-${build}-mc${mcVersion.replace(/\./g, "")}`,
    `${mcVersion}-${build}-${mcVersion}.0`
  ];
}
async function installerExists(versionId) {
  for (const host of MAVEN_HOSTS) {
    try {
      const res = await fetch(`${host}net/minecraftforge/forge/${versionId}/forge-${versionId}-installer.jar`, {
        method: "HEAD",
        signal: AbortSignal.timeout(1e4)
      });
      if (res.ok) return true;
    } catch {
    }
  }
  return false;
}
function newestCachedInstaller(root, mcVersion) {
  try {
    const dir = path.join(root, "forge-installers");
    const prefix = `forge-${mcVersion}-`;
    const found = fs.readdirSync(dir).filter((f) => f.startsWith(prefix) && f.endsWith("-installer.jar")).map((f) => ({ f, mtime: fs.statSync(path.join(dir, f)).mtimeMs })).sort((a, b) => b.mtime - a.mtime)[0];
    return found ? found.f.slice("forge-".length, -"-installer.jar".length) : null;
  } catch {
    return null;
  }
}
async function resolveForgeVersionId(root, mcVersion) {
  let build = null;
  try {
    const { promos } = await getPromotions();
    build = promos[`${mcVersion}-recommended`] ?? promos[`${mcVersion}-latest`] ?? null;
  } catch {
    const cached2 = newestCachedInstaller(root, mcVersion);
    if (cached2) return cached2;
    throw new Error("Forge ro'yxatini olib bo'lmadi (internet aloqasini tekshiring)");
  }
  if (!build) throw new Error(`${mcVersion} uchun Forge topilmadi`);
  try {
    const fromMaven = pickVersionId(await getMavenVersionIds(), mcVersion, build);
    if (fromMaven) return fromMaven;
  } catch {
  }
  for (const guess of guessVersionIds(mcVersion, build)) {
    if (await installerExists(guess)) return guess;
  }
  const cached = newestCachedInstaller(root, mcVersion);
  if (cached) return cached;
  throw new Error(`${mcVersion} uchun Forge installer topilmadi`);
}
async function fetchExpectedSha1(versionId) {
  for (const host of MAVEN_HOSTS) {
    try {
      const res = await fetch(`${host}net/minecraftforge/forge/${versionId}/forge-${versionId}-installer.jar.sha1`, {
        signal: AbortSignal.timeout(1e4)
      });
      if (!res.ok) continue;
      const text = (await res.text()).trim().split(/\s+/)[0];
      if (/^[0-9a-f]{40}$/i.test(text)) return text.toLowerCase();
    } catch {
    }
  }
  return void 0;
}
function isValidInstaller(path2) {
  try {
    if (!fs.existsSync(path2) || fs.statSync(path2).size < 5e5) return false;
    return new AdmZip(path2).getEntry("install_profile.json") !== null;
  } catch {
    return false;
  }
}
function sha1Of$1(path2) {
  return new Promise((resolve, reject2) => {
    const hash = crypto.createHash("sha1");
    fs.createReadStream(path2).on("data", (chunk) => hash.update(chunk)).on("error", reject2).on("end", () => resolve(hash.digest("hex")));
  });
}
async function repairForgeLibraries(root, zip) {
  const libs = [];
  for (const entry2 of ["install_profile.json", "version.json"]) {
    try {
      const json = JSON.parse(zip.readAsText(entry2));
      if (Array.isArray(json.libraries)) libs.push(...json.libraries);
    } catch {
    }
  }
  const seen = /* @__PURE__ */ new Set();
  for (const lib of libs) {
    const a = lib.downloads?.artifact;
    if (!a?.path || !a.url || !a.sha1 || seen.has(a.path)) continue;
    seen.add(a.path);
    const dest = path.join(root, "libraries", ...a.path.split("/"));
    if (!fs.existsSync(dest)) continue;
    try {
      const sizeOk = typeof a.size !== "number" || fs.statSync(dest).size === a.size;
      if (sizeOk && await sha1Of$1(dest) === a.sha1.toLowerCase()) continue;
    } catch {
    }
    try {
      await downloadFile({ url: a.url, dest, sha1: a.sha1, size: a.size });
    } catch {
      await fs.promises.rm(dest, { force: true }).catch(() => void 0);
    }
  }
}
function normalizeMavenBase(url) {
  return url.replace(/^https?:\/\/files\.minecraftforge\.net\/maven\/?/, "https://maven.minecraftforge.net/");
}
async function buildLegacyProfile(root, mcVersion, installerPath) {
  const zip = new AdmZip(installerPath);
  const profile = JSON.parse(zip.readAsText("install_profile.json"));
  const info = profile.versionInfo;
  const install = profile.install;
  if (!info || !install?.path || !install.filePath) {
    throw new Error("Forge installer formati tanilmadi (bu versiya qo'llab-quvvatlanmaydi)");
  }
  const forgeLib = mavenPath(install.path);
  const universalDest = path.join(root, "libraries", forgeLib.path);
  if (!fs.existsSync(universalDest) || fs.statSync(universalDest).size < 1e5) {
    const entry2 = zip.getEntry(install.filePath);
    if (!entry2) throw new Error("Forge installer ichida universal jar topilmadi");
    await fs.promises.mkdir(path.join(universalDest, ".."), { recursive: true });
    await fs.promises.writeFile(universalDest, entry2.getData());
  }
  const vanilla = await getVanillaVersionJsonOrCached(root, mcVersion);
  const customId = info.id;
  const forgeLibraries = info.libraries.map((lib) => {
    const { path: path2 } = mavenPath(lib.name);
    const isForgeItself = lib.name === install.path;
    const base = lib.url ? normalizeMavenBase(lib.url) : "https://libraries.minecraft.net/";
    return {
      ...lib,
      downloads: {
        artifact: {
          path: path2,
          url: isForgeItself ? `${MAVEN_HOSTS[0]}${path2.replace(/\.jar$/, "-universal.jar")}` : `${base.endsWith("/") ? base : `${base}/`}${path2}`
        }
      }
    };
  });
  const overridden = new Set(info.libraries.map((lib) => mavenPath(lib.name).key));
  const vanillaKept = (vanilla.libraries ?? []).filter((lib) => !overridden.has(mavenPath(lib.name).key));
  const merged = {
    ...vanilla,
    id: customId,
    mainClass: info.mainClass,
    minecraftArguments: info.minecraftArguments ?? vanilla.minecraftArguments,
    libraries: [...forgeLibraries, ...vanillaKept]
  };
  delete merged.inheritsFrom;
  delete merged.jar;
  if (typeof merged.minecraftArguments === "string") delete merged.arguments;
  const versionDir = path.join(root, "versions", customId);
  await fs.promises.mkdir(versionDir, { recursive: true });
  const versionJsonPath = path.join(versionDir, `${customId}.json`);
  await fs.promises.writeFile(versionJsonPath, JSON.stringify(merged, null, 2));
  return { customId, versionJsonPath };
}
async function ensureForge(root, mcVersion, onProgress) {
  if (!isSupportedForgeMc(mcVersion)) {
    throw new Error(`Forge ${mcVersion} qo'llab-quvvatlanmaydi (juda eski). 1.7.2 yoki undan yangi versiyani tanlang.`);
  }
  const versionId = await resolveForgeVersionId(root, mcVersion);
  const dir = path.join(root, "forge-installers");
  const installerPath = path.join(dir, `forge-${versionId}-installer.jar`);
  if (!isValidInstaller(installerPath)) {
    await fs.promises.mkdir(dir, { recursive: true });
    const file2 = `net/minecraftforge/forge/${versionId}/forge-${versionId}-installer.jar`;
    try {
      await downloadFile({
        url: MAVEN_HOSTS.map((h) => h + file2),
        dest: installerPath,
        sha1: await fetchExpectedSha1(versionId),
        onProgress
      });
    } catch (err) {
      throw new Error(
        `Forge installer yuklanmadi (${err instanceof Error ? err.message : String(err)}). Internet aloqasini tekshirib, qayta urinib ko'ring.`
      );
    }
    if (!isValidInstaller(installerPath)) {
      await fs.promises.rm(installerPath, { force: true });
      throw new Error("Forge installer buzuq keldi - qayta urinib ko'ring");
    }
  }
  const zip = new AdmZip(installerPath);
  const isModern = zip.getEntry("version.json") !== null;
  if (isModern) {
    await repairForgeLibraries(root, zip);
    return { kind: "installer", installerPath };
  }
  return { kind: "profile", ...await buildLegacyProfile(root, mcVersion, installerPath) };
}
function toEncodedCommand$1(script) {
  return Buffer.from(script, "utf16le").toString("base64");
}
function runPowerShell(script, timeoutMs = 8e3) {
  if (process.platform !== "win32") return Promise.resolve(null);
  return new Promise((resolve) => {
    const full = `[Console]::OutputEncoding=[Text.Encoding]::UTF8
${script}`;
    child_process.execFile(
      "powershell.exe",
      ["-NoProfile", "-NonInteractive", "-ExecutionPolicy", "Bypass", "-EncodedCommand", toEncodedCommand$1(full)],
      { timeout: timeoutMs, windowsHide: true, maxBuffer: 1024 * 1024 },
      (err, stdout) => resolve(err ? null : String(stdout).trim())
    );
  });
}
function parseJsonList(text) {
  if (!text) return null;
  try {
    const parsed = JSON.parse(text);
    return Array.isArray(parsed) ? parsed : [parsed];
  } catch {
    return null;
  }
}
const BASIC_NAME = /microsoft basic|basic display|basic render|базов\S* (видео|дисплей)/i;
function vendorOf(name, compatibility, pnp) {
  const ven = /VEN_([0-9A-F]{4})/i.exec(pnp)?.[1]?.toUpperCase();
  if (ven === "10DE") return "nvidia";
  if (ven === "1002" || ven === "1022") return "amd";
  if (ven === "8086") return "intel";
  const text = `${name} ${compatibility}`;
  if (BASIC_NAME.test(text)) return "basic";
  if (/nvidia|geforce|quadro/i.test(text)) return "nvidia";
  if (/\bamd\b|advanced micro|radeon|\bati\b/i.test(text)) return "amd";
  if (/intel/i.test(text)) return "intel";
  return "other";
}
async function queryGpus() {
  const out = await runPowerShell(
    "Get-CimInstance Win32_VideoController | Select-Object Name,DriverVersion,@{n='DriverDate';e={if($_.DriverDate){$_.DriverDate.ToString('yyyy-MM-dd')}}},AdapterCompatibility,PNPDeviceID,InfFilename,InfSection,CurrentHorizontalResolution | ConvertTo-Json -Compress"
  );
  const rows = parseJsonList(out);
  if (!rows) return [];
  return rows.filter((r) => r.Name).map((r) => {
    const name = String(r.Name);
    const pnp = r.PNPDeviceID ?? "";
    return {
      name,
      vendor: vendorOf(name, r.AdapterCompatibility ?? "", pnp),
      driverVersion: r.DriverVersion ?? null,
      driverDate: r.DriverDate ?? null,
      isBasicAdapter: /^display\.inf$/i.test(r.InfFilename ?? "") || /^MSBDA/i.test(r.InfSection ?? "") || /BASICDISPLAY|BASICRENDER/i.test(pnp) || BASIC_NAME.test(name),
      isVirtualNoGl: /Hyper-V Video|Remote Display Adapter|RDPIDD|RemoteDisplay/i.test(`${name} ${pnp}`),
      drivesDisplay: typeof r.CurrentHorizontalResolution === "number" && r.CurrentHorizontalResolution > 0
    };
  });
}
let gpuCache = null;
const GPU_CACHE_MS = 5 * 6e4;
function detectGpus() {
  if (gpuCache && Date.now() - gpuCache.at < GPU_CACHE_MS) return gpuCache.value;
  const value = queryGpus().then((list) => {
    if (list.length === 0) gpuCache = null;
    return list;
  });
  gpuCache = { at: Date.now(), value };
  return value;
}
function lacksHardwareOpenGl(gpus) {
  if (gpus.length === 0) return false;
  const noGl = (g) => g.isBasicAdapter || g.isVirtualNoGl;
  const driving = gpus.filter((g) => g.drivesDisplay);
  return driving.length > 0 ? driving.every(noGl) : gpus.every(noGl);
}
function gpuFingerprint(gpus) {
  return gpus.map((g) => `${g.name}|${g.driverVersion ?? ""}`).sort().join(";");
}
function isLegacyGpu(name) {
  return /\bGMA\b|Graphics Media Accelerator|Intel\(R\) (G41|G45|Q45|Q43|G33|946GZ|965)\b|Express Chipset/i.test(name) || /^Intel\(R\) HD Graphics( 2000| 3000)?$/i.test(name.trim());
}
async function detectAntivirus() {
  const out = await runPowerShell(
    "Get-CimInstance -Namespace root/SecurityCenter2 -ClassName AntiVirusProduct -ErrorAction Stop | Select-Object displayName,productState,pathToSignedProductExe | ConvertTo-Json -Compress"
  );
  const rows = parseJsonList(out);
  if (!rows) return null;
  return rows.filter((r) => r.displayName).map((r) => ({
    name: String(r.displayName),
    enabled: ((r.productState ?? 0) & 61440) === 4096,
    // `windowsdefender://` - Defender'ning til-mustaqil belgisi (nomi har xil tilda farq qilishi mumkin).
    isDefender: /windowsdefender/i.test(r.pathToSignedProductExe ?? "") || /^windows defender$/i.test(r.displayName ?? "")
  }));
}
function hexCode(code) {
  if (code === null) return "noma'lum";
  return `0x${(code >>> 0).toString(16).toUpperCase().padStart(8, "0")}`;
}
const DRIVER_LINKS = {
  nvidia: { kind: "url", label: "NVIDIA drayverini yuklash", value: "https://www.nvidia.com/Download/index.aspx" },
  amd: { kind: "url", label: "AMD drayverini yuklash", value: "https://www.amd.com/en/support/download/drivers.html" },
  intel: {
    kind: "url",
    label: "Intel drayverini yuklash",
    value: "https://www.intel.com/content/www/us/en/support/detect.html"
  }
};
function javaDownloadAction(major) {
  const lts = major <= 8 ? 8 : major <= 11 ? 11 : major <= 17 ? 17 : major <= 21 ? 21 : major;
  if (process.platform === "win32") {
    return {
      kind: "url",
      label: `Java ${lts} ni yuklash`,
      value: `https://corretto.aws/downloads/latest/amazon-corretto-${lts}-x64-windows-jdk.msi`
    };
  }
  const os2 = process.platform === "darwin" ? "mac" : "linux";
  const cpu = process.arch === "arm64" ? "aarch64" : "x64";
  return {
    kind: "url",
    label: `Java ${lts} ni yuklash`,
    value: `https://adoptium.net/temurin/releases/?version=${lts}&os=${os2}&arch=${cpu}&package=jre`
  };
}
async function antivirusAdvice(ctx, reasonLine, details, detected) {
  const avs = await detectAntivirus();
  const thirdParty = (avs ?? []).filter((a) => a.enabled && !a.isDefender);
  const defenderActive = (avs ?? []).some((a) => a.isDefender && a.enabled);
  if (thirdParty.length > 0) {
    const names = thirdParty.map((a) => a.name).join(", ");
    return {
      title: "Antivirus o'yinga to'sqinlik qilyapti",
      items: [
        `Kompyuteringizda antivirus o'rnatilgan (${names}) va u launcher hamda o'yin ishlashiga yo'l qo'ymayapti.`,
        reasonLine
      ],
      steps: [
        `Windows "Sozlamalar" → "Ilovalar" bo'limiga kiring, ro'yxatdan ${names} ni topib o'chirib tashlang.`,
        `Yoki ${names} ning ichiga kirib, NeoTerra Launcher va o'yin papkasi uchun ruxsat (istisno) bering.`,
        `Keyin "O'ynash"ni qayta bosing.`
      ],
      actions: [
        { kind: "settings", label: "Ilovalar ro'yxatini ochish", value: "ms-settings:appsfeatures" },
        { kind: "copy", label: "O'yin papkasi yo'lini nusxalash", value: ctx.gameDir }
      ],
      details,
      canAddAvExclusion: false
    };
  }
  if (defenderActive) {
    return {
      title: "Antivirus o'yinga to'sqinlik qilyapti",
      items: ["Windows'ning o'rnatilgan antivirusi (Defender) o'yin fayllariga to'sqinlik qilyapti.", reasonLine],
      steps: [
        `Pastdagi "Antivirusda ruxsat qo'shish" tugmasini bosing (Windows so'rasa - "Ha").`,
        `Keyin "O'ynash"ni qayta bosing.`
      ],
      actions: [{ kind: "av-exclusion", label: "Antivirusda ruxsat qo'shish" }],
      details,
      canAddAvExclusion: true
    };
  }
  return {
    title: "O'yin kutilmagan tarzda yopildi",
    items: [
      reasonLine,
      "Odatda buning sababi antivirus yoki ekran yozuvchi/overlay dasturlari (Discord, MSI Afterburner, RGB boshqaruv dasturlari)."
    ],
    steps: [
      "Antivirus va shunday dasturlarni vaqtincha o'chirib qo'ying (yoki ular ichida MCModHub va o'yin papkasiga ruxsat bering).",
      `Videokarta drayverini yangilang.`,
      `Keyin "O'ynash"ni qayta bosing.`
    ],
    actions: [
      { kind: "settings", label: "Ilovalar ro'yxatini ochish", value: "ms-settings:appsfeatures" },
      { kind: "copy", label: "O'yin papkasi yo'lini nusxalash", value: ctx.gameDir },
      ...process.platform === "win32" ? [{ kind: "av-exclusion", label: "Antivirusda ruxsat qo'shish" }] : []
    ],
    details,
    canAddAvExclusion: true
  };
}
const VENDOR_NAME = { nvidia: "NVIDIA", amd: "AMD", intel: "Intel" };
function gpuLine(gpu) {
  const bits = [gpu.driverVersion ? `drayver ${gpu.driverVersion}` : null, gpu.driverDate].filter(Boolean);
  return `Videokartangiz: ${gpu.name}${bits.length ? ` (${bits.join(", ")})` : ""}.`;
}
async function gpuAdvice(ctx, details) {
  const gpus = await detectGpus();
  const steps = [];
  const actions = [];
  const isWin = process.platform === "win32";
  const real = gpus.filter((g) => !g.isBasicAdapter && !g.isVirtualNoGl);
  const basic = gpus.filter((g) => g.isBasicAdapter);
  const discrete = real.filter((g) => g.vendor === "nvidia" || g.vendor === "amd");
  const items = [];
  if (basic.length > 0) {
    const b = basic[0];
    const vendor = b.vendor === "intel" || b.vendor === "amd" || b.vendor === "nvidia" ? VENDOR_NAME[b.vendor] : null;
    items.push(
      `Kompyuteringizdagi ${vendor ? `${vendor} ` : ""}videokarta uchun drayver UMUMAN o'rnatilmagan - Windows uni "${b.name}" deb ko'rsatyapti. Drayversiz o'yin grafikasi (OpenGL) ishlamaydi. Bu Minecraft yoki launcher xatosi emas.`
    );
    if (discrete.length > 0 && !discrete.some((g) => g.drivesDisplay)) {
      items.push(
        `Noutbukdagi ${discrete[0].name} ham tasvirni ekranga aynan shu ${vendor ?? "ichki"} videokarta orqali chiqaradi - shuning uchun avval ${vendor ?? "ichki videokarta"} drayverini o'rnatish SHART.`
      );
    }
    if (isWin) {
      steps.push(
        `Windows "Sozlamalar" → "Windows Update" → "Qo'shimcha parametrlar" → "Ixtiyoriy yangilanishlar" → "Drayver yangilanishlari" bo'limidan videokarta (Display) drayverini belgilab o'rnating (pastdagi tugma shu sahifani ochadi).`
      );
      actions.push({ kind: "settings", label: "Drayver yangilanishlarini ochish", value: "ms-settings:windowsupdate-optionalupdates" });
    }
    steps.push(
      `U yerda bo'lmasa - ${vendor ? `${vendor} saytidan` : "noutbuk/kompyuter ishlab chiqaruvchisi saytidan"} drayverni yuklab o'rnating (pastdagi tugma). Noutbuk bo'lsa, ishlab chiqaruvchi (HP, Lenovo, ASUS, Acer, Dell...) saytida modelingiz uchun drayver ham bo'ladi.`
    );
  } else {
    items.push(
      "Kompyuteringizdagi videokarta drayveri o'yin uchun kerakli grafika (OpenGL) imkoniyatini bermayapti. Bu Minecraft yoki launcher xatosi emas - odatda drayver o'rnatilmagan yoki eskirgan bo'ladi."
    );
    const primary = discrete[0] ?? real[0] ?? gpus[0];
    if (primary) items.push(gpuLine(primary));
    steps.push("Videokarta ishlab chiqaruvchisining saytidan eng so'nggi drayverni yuklab o'rnating (pastdagi tugma).");
  }
  if (gpus.length > 0 && gpus.every((g) => isLegacyGpu(g.name) || g.isBasicAdapter) && gpus.some((g) => isLegacyGpu(g.name))) {
    items.push(
      "Bu videokarta juda eski - yangi Minecraft versiyalarini (1.17 va undan yuqori) ishga tushira olmasligi mumkin. 1.16.5 yoki undan eski versiyani tanlab ko'ring."
    );
  }
  if (ctx.softwareGl) {
    items.push("Launcher o'yinni drayversiz (dasturiy grafika) rejimida ham ochib ko'rdi - bu ham yordam bermadi, drayver o'rnatish kerak.");
  }
  steps.push("Kompyuterni qayta ishga tushiring va o'yinni yana ishga tushiring.");
  const vendors = /* @__PURE__ */ new Set();
  for (const g of [...basic, ...gpus]) if (g.vendor === "nvidia" || g.vendor === "amd" || g.vendor === "intel") vendors.add(g.vendor);
  if (vendors.size === 0) ["nvidia", "amd", "intel"].forEach((v) => vendors.add(v));
  vendors.forEach((v) => actions.push(DRIVER_LINKS[v]));
  const hasIntegrated = real.some((g) => g.vendor === "intel");
  if (basic.length === 0 && discrete.length > 0 && hasIntegrated && isWin) {
    steps.splice(
      steps.length - 1,
      0,
      `Noutbukda ikkita videokarta bor: Windows "Sozlamalar" → "Tizim" → "Ekran" → "Grafika" bo'limida java.exe ni qo'shib, "Yuqori unumdorlik"ni tanlang.`
    );
    actions.push({ kind: "settings", label: "Grafika sozlamalarini ochish", value: "ms-settings:display-advancedgraphics" });
    if (ctx.javaPath) actions.push({ kind: "copy", label: "java.exe yo'lini nusxalash", value: ctx.javaPath });
  }
  const title = basic.length > 0 ? "Videokarta drayveri o'rnatilmagan" : "Videokarta drayveri o'yinni ishga tushira olmadi";
  return { title, items, steps, actions, details };
}
function softwareGlFixAdvice() {
  return {
    title: "Videokarta OpenGL xatosi (GLFW 65542)",
    items: [
      "Kompyuteringizning videokarta drayveri eskirgan yoki ushbu Minecraft versiyasi talab qiladigan OpenGL grafik texnologiyasini qo'llab-quvvatlamayapti.",
      "Xavotir olmang — biz bu muammoni avtomatik hal qilib, o'yinni ochib bera olamiz!",
      "ℹ️ Eslatma: Avtomatik tuzatish yoqilganda o'yin videokarta o'rniga protsessor (CPU) yordamida ishga tushiriladi. Shu sababli o'yinda biroz qotish yoki FPS pastroq bo'lishi mumkin (bu taxminiy ma'lumot bo'lib, kompyuteringizning protsessori kuchiga bog'liq). Eng yuqori FPS olish uchun esa videokarta drayverini yangilash tavsiya etiladi."
    ],
    steps: [
      "Pastdagi yashil tugmani bosing — launcher dasturiy grafika rejimini yoqib, o'yinni avtomatik qayta ochadi.",
      "Eng yuqori FPS uchun, imkoni bo'lsa, videokarta drayverini ham yangilab qo'ying."
    ],
    actions: [
      { kind: "enable-software-gl", label: "🔧 Muammoni hal qilish va O'ynash" },
      { kind: "url", label: "Drayverni yangilash bo'yicha yordam", value: "https://aka.ms/mcdriver" }
    ]
  };
}
function javaAdvice(major, why, details, mcVersion) {
  const lts = major <= 8 ? 8 : major <= 11 ? 11 : major <= 17 ? 17 : major <= 21 ? 21 : major;
  return {
    title: `O'yin uchun Java ${lts} kerak`,
    items: [`Bu o'yin ishlashi uchun Java ${lts} kerak.`, why],
    steps: [
      `Pastdagi "Yuklab olish" tugmasini bosing - launcher Java ${lts} ni o'zi yuklaydi, o'rnatadi va o'yinga ulaydi.`,
      `Tugagach "O'ynash"ni qayta bosing.`
    ],
    actions: [
      { kind: "install-java", label: `Yuklab olish (Java ${lts})`, major: lts, mcVersion },
      // Zaxira: launcher yuklay olmasa (internet/antivirus) - foydalanuvchi o'rnatuvchini qo'lda olishi mumkin.
      { ...javaDownloadAction(lts), label: `Qo'lda yuklash (zaxira)` }
    ],
    details
  };
}
const GPU_PATTERNS = [
  /driver does not (appear to )?support OpenGL/i,
  /GLFW error[^\n]*(65542|65543|0x10006|0x10007|0x10008)/i,
  /Failed to find a valid GLFW profile/i,
  /No supported graphics backend/i,
  /VK_ERROR_INCOMPATIBLE_DRIVER/i,
  /Pixel format not accelerated/i,
  /OpenGL 3\.\d+ (core )?(profile )?(is )?(not supported|unsupported)/i,
  // LWJGL: OpenGL funksiyasi drayverda yo'q / kontekst umuman yaratilmagan (GDI Generic 1.1) - JVM o'zini to'xtatadi.
  // Haqiqiy holat: 26.3, glGenFramebuffers (GlDevice.<init>), Intel drayveri o'rnatilmagan noutbuk.
  /No context is current or a function that is not available in the current context/i,
  /GDI Generic/i,
  // Minecraft 26.x (renderpearl) o'z xabarlari: OpenGL 3.3 konteksti/oynasi yaratilmadi.
  /Failed to create (window for )?OpenGL (3\.\d )?context/i,
  /Failed to create window for OpenGL after creating context/i,
  /OpenGL is not supported:/i
];
function hasGpuDriverFailure(text, gameWasUp = false) {
  if (gameWasUp) return false;
  return GPU_PATTERNS.some((re) => re.test(text));
}
const VCREDIST_PATTERNS = [/Can'?t find dependent libraries/i, /VCRUNTIME140/i, /MSVCP140/i];
function javaMajorFromClassVersion(text) {
  const m = /class file version (\d+)\.\d+/i.exec(text);
  if (!m) return null;
  const major = parseInt(m[1], 10) - 44;
  return major >= 8 && major <= 40 ? major : null;
}
const NT_CODES = {
  3221226505: { name: "STACK_BUFFER_OVERRUN", gpu: false },
  3221225477: { name: "ACCESS_VIOLATION", gpu: true },
  3221225794: { name: "DLL_INIT_FAILED", gpu: false },
  3221226356: { name: "HEAP_CORRUPTION", gpu: true }
};
async function buildReport(ctx, advice) {
  const gpus = await detectGpus();
  const avs = await detectAntivirus();
  const lines = [
    `NeoTerra Launcher ${ctx.appVersion}`,
    `OS: ${os.type()} ${os.release()} (${os.arch()})`,
    `Minecraft: ${ctx.version}${ctx.loader ? ` / ${ctx.loader}` : " / vanilla"}`,
    `Java: ${ctx.javaPath ?? "tizim (PATH)"}`,
    `Chiqish kodi: ${hexCode(ctx.code)}`,
    gpus.length ? `Videokarta: ${gpus.map((g) => `${g.name} [${g.driverVersion ?? "?"}]`).join("; ")}` : null,
    avs ? `Antivirus: ${avs.map((a) => `${a.name}${a.enabled ? "" : " (o'chiq)"}`).join("; ") || "yo'q"}` : null,
    ctx.softwareGl ? "Grafika: dasturiy rejim (Mesa llvmpipe)" : null,
    advice ? `Tashxis: ${advice.title}` : null,
    "",
    "--- Oxirgi log qatorlari ---",
    ...ctx.lines.slice(-25)
  ];
  return lines.filter((l) => l !== null).join("\n");
}
async function analyzeCrash(ctx) {
  const text = `${ctx.lines.join("\n")}
${ctx.logText}`;
  const details = ctx.lines.filter((l) => l.trim()).slice(-8);
  if (hasGpuDriverFailure(text, ctx.reachedGame)) return gpuAdvice(ctx, details);
  if (process.platform === "win32" && (VCREDIST_PATTERNS.some((re) => re.test(text)) || ctx.code === 3221225781)) {
    return {
      title: "Windows uchun Visual C++ kutubxonasi kerak",
      items: [
        "O'yin ishlashi uchun Microsoft Visual C++ Redistributable (2015-2022) paketi kerak. Kompyuteringizda u yo'q yoki buzilgan."
      ],
      steps: [
        `Pastdagi "Visual C++ ni yuklash" tugmasi orqali faylni (vc_redist.x64.exe) yuklab oling.`,
        "Faylni ishga tushirib o'rnating va kompyuterni qayta yoqing.",
        `Keyin "O'ynash"ni qayta bosing.`
      ],
      actions: [{ kind: "url", label: "Visual C++ ni yuklash", value: "https://aka.ms/vs/17/release/vc_redist.x64.exe" }],
      details
    };
  }
  const neededMajor = javaMajorFromClassVersion(text);
  if (neededMajor !== null && /UnsupportedClassVersionError|more recent version of the Java Runtime/i.test(text)) {
    return javaAdvice(neededMajor, "Hozirgi Java bu o'yin uchun juda eski.", details, ctx.version);
  }
  if (/Unrecognized (VM )?option|Could not create the Java Virtual Machine/i.test(text) && !/heap/i.test(text)) {
    return javaAdvice(ctx.requiredJavaMajor ?? 21, "Hozirgi Java bu o'yinning sozlamalarini qabul qilmadi (eskirgan).", details, ctx.version);
  }
  if (/Failed to run processor/i.test(text)) {
    return {
      title: "Forge o'rnatilishi to'liq bo'lmadi",
      items: [
        "Forge o'rnatilayotganda yordamchi fayllardan biri buzuq yuklangan (internet uzilishi yoki antivirus faylni o'zgartirgan)."
      ],
      steps: [
        `"O'ynash"ni qayta bosing - launcher buzuq fayllarni o'zi topib, qaytadan yuklaydi.`,
        "Xato takrorlansa - antivirusda NeoTerra papkasiga ruxsat bering va qayta urinib ko'ring."
      ],
      details
    };
  }
  if (/Could not reserve enough space|Invalid maximum heap size|There is insufficient memory|Could not allocate/i.test(text)) {
    return {
      title: "RAM sozlamasi kompyuteringizga to'g'ri kelmayapti",
      items: ["O'yinga ajratilgan xotira (RAM) kompyuteringizdagi bo'sh xotiradan ko'p."],
      steps: [
        `Launcher "Sozlamalar"ida RAM miqdorini kamaytiring (masalan 2-4 GB).`,
        "Boshqa og'ir dasturlarni (brauzer, o'yinlar) yoping.",
        `Keyin "O'ynash"ni qayta bosing.`
      ],
      details
    };
  }
  if (/java\.lang\.OutOfMemoryError: (Java heap space|GC overhead)/i.test(text)) {
    return {
      title: "O'yinga xotira (RAM) yetmadi",
      items: ["O'yin (ayniqsa modlar bilan) ajratilgan xotiradan ko'proq talab qildi."],
      steps: [
        `Launcher "Sozlamalar"ida RAM miqdorini oshiring (masalan 4-6 GB, kompyuteringizda yetarli bo'lsa).`,
        `Ko'p mod o'rnatgan bo'lsangiz - keraksizlarini o'chiring.`
      ],
      details
    };
  }
  const nt = ctx.code !== null ? NT_CODES[ctx.code >>> 0] : void 0;
  if (nt && process.platform === "win32") {
    const reason = `O'yin Windows tomonidan majburan to'xtatildi (${nt.name}, kod: ${hexCode(ctx.code)}) - odatda boshqa dastur o'yin jarayoniga aralashganda yuz beradi.`;
    const advice = await antivirusAdvice(ctx, reason, details);
    if (nt.gpu) {
      advice.steps = [...(advice.steps ?? []).slice(0, -1), "Videokarta drayverini yangilang.", ...(advice.steps ?? []).slice(-1)];
    }
    return advice;
  }
  return null;
}
function performanceJvmArgs(ramMaxGb) {
  const bigHeap = ramMaxGb >= 12;
  return [
    "-XX:+IgnoreUnrecognizedVMOptions",
    "-XX:+UnlockExperimentalVMOptions",
    "-XX:+UseG1GC",
    "-XX:+ParallelRefProcEnabled",
    "-XX:+PerfDisableSharedMem",
    // Ba'zi modlar (va eski kutubxonalar) System.gc() chaqiradi - bu to'liq, uzun to'xtash demak.
    "-XX:+DisableExplicitGC",
    `-XX:MaxGCPauseMillis=${bigHeap ? 50 : 37}`,
    `-XX:G1HeapRegionSize=${ramMaxGb >= 4 ? 16 : 8}M`,
    `-XX:G1NewSizePercent=${bigHeap ? 40 : 20}`,
    `-XX:G1MaxNewSizePercent=${bigHeap ? 50 : 40}`,
    `-XX:G1ReservePercent=${bigHeap ? 15 : 20}`,
    "-XX:G1HeapWastePercent=5",
    "-XX:G1MixedGCCountTarget=4",
    `-XX:InitiatingHeapOccupancyPercent=${bigHeap ? 20 : 15}`,
    "-XX:G1MixedGCLiveThresholdPercent=90",
    "-XX:G1RSetUpdatingPauseTimePercent=5",
    "-XX:SurvivorRatio=32",
    "-XX:MaxTenuringThreshold=1"
  ];
}
const SYSTEM_RESERVE_MB = 3072;
const SYSTEM_RESERVE_SMALL_MB = 2560;
const MIN_HEAP_MB = 2048;
function safeHeapMaxMb(requestedGb) {
  const totalMb = Math.floor(os.totalmem() / 1024 ** 2);
  const reserve = totalMb >= 12 * 1024 ? SYSTEM_RESERVE_MB : SYSTEM_RESERVE_SMALL_MB;
  const cap = Math.max(MIN_HEAP_MB, totalMb - reserve);
  const requested = Math.max(1024, Math.round(requestedGb * 1024));
  return Math.min(requested, cap);
}
function initialHeapMb(maxMb) {
  return Math.min(maxMb, Math.max(1024, Math.round(maxMb / 2)));
}
function mcVersionTuple(version) {
  const m = /^(\d+)\.(\d+)(?:\.(\d+))?/.exec(version);
  return m ? [Number(m[1]), Number(m[2]), Number(m[3] ?? 0)] : null;
}
function compareTuple(a, b) {
  for (let i = 0; i < 3; i++) if (a[i] !== b[i]) return a[i] - b[i];
  return 0;
}
const LEGACY_SAFE_GC_ARGS = [
  "-XX:+UnlockExperimentalVMOptions",
  "-XX:+UseG1GC",
  "-XX:G1NewSizePercent=20",
  "-XX:G1ReservePercent=20",
  "-XX:MaxGCPauseMillis=50",
  "-XX:G1HeapRegionSize=32M"
];
function smartJavaGcArgs(mcVersion, _javaMajor, ramMaxGb, fpsBoost) {
  const tuple = mcVersionTuple(mcVersion);
  const snapshotYear = /^(\d\d)w\d\d/.exec(mcVersion);
  const isModern = tuple ? compareTuple(tuple, [1, 16, 5]) >= 0 : snapshotYear ? Number(snapshotYear[1]) >= 21 : false;
  const isLegacy = tuple ? compareTuple(tuple, [1, 12, 2]) <= 0 : false;
  if (isModern) return performanceJvmArgs(ramMaxGb);
  if (isLegacy) return LEGACY_SAFE_GC_ARGS;
  return fpsBoost ? performanceJvmArgs(ramMaxGb) : [];
}
const PERFORMANCE_MODS = {
  // Sodium - render dvigatelini butunlay qayta yozadi (eng katta FPS foydasi).
  // Lithium - o'yin mantiqi/serverside hisob-kitoblarini tezlashtiradi.
  // FerriteCore - xotira sarfini keskin kamaytiradi (kuchsiz kompyuterlarda hal qiluvchi).
  // EntityCulling - ko'rinmayotgan mavjudotlarni chizmaydi.
  // ModernFix - yuklanish tezligi va xotira bo'yicha ko'plab tuzatishlar.
  // ImmediatelyFast - GUI/matn/zarracha kabi "immediate mode" chizishni partiyalab, CPU->GPU chaqiruvlarini kamaytiradi
  //   (Sodium/Embeddium bilan birga ishlash uchun yozilgan; faqat klient - guruhdoshlarda bo'lishi shart emas).
  // Hammasi `isPerformanceModFile` orqali guruh sinxronizatsiyasi (2-rejim) va Karta rejimida (arenaPack) hisobga
  // olinmaydi - turli kompyuterlarda bo'lishi/bo'lmasligi "mos emas" bermaydi.
  fabric: [["sodium"], ["lithium"], ["ferrite-core"], ["entityculling"], ["immediatelyfast"], ["modernfix"]],
  quilt: [["sodium"], ["lithium"], ["ferrite-core"], ["entityculling"], ["immediatelyfast"], ["modernfix"]],
  forge: [["embeddium", "rubidium"], ["ferrite-core"], ["entityculling"], ["immediatelyfast"], ["modernfix"]]
};
const VERSION_AWARE_SLUGS = /* @__PURE__ */ new Set(["sodium", "lithium", "entityculling", "modernfix", "embeddium", "rubidium"]);
function normalize$1(text) {
  return text.toLowerCase().replace(/[^a-z0-9]/g, "");
}
function isPerformanceModFile(filename, loader) {
  const name = normalize$1(filename);
  return PERFORMANCE_MODS[loader].some((group) => group.some((slug) => name.includes(normalize$1(slug))));
}
const MEMORY_FILE = "mcmodhub-fps-boost.json";
const MISSING_RECHECK_MS = 24 * 60 * 60 * 1e3;
const PERF_MODS_BUDGET_MS = 8e3;
function readBoostMemory(dir) {
  try {
    const parsed = JSON.parse(fs.readFileSync(path.join(dir, MEMORY_FILE), "utf-8"));
    if (parsed && typeof parsed === "object") return parsed;
  } catch {
  }
  return {};
}
function writeBoostMemory(dir, memory) {
  try {
    fs.writeFileSync(path.join(dir, MEMORY_FILE), JSON.stringify(memory, null, 2), "utf-8");
  } catch {
  }
}
async function resolveForLoader(slug, gameVersion, loader) {
  const direct = await resolveLatestFile(slug, gameVersion, loader);
  if (direct || loader !== "quilt") return direct;
  return resolveLatestFile(slug, gameVersion, "fabric");
}
async function downloadInto(modsDir, url, filename) {
  const res = await fetch(url, { signal: AbortSignal.timeout(12e4) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  fs.writeFileSync(path.join(modsDir, filename), Buffer.from(await res.arrayBuffer()));
}
async function ensurePerformanceMods(dir, gameVersion, loader, emit2) {
  const modsDir = path.join(dir, "mods");
  fs.mkdirSync(modsDir, { recursive: true });
  const installed2 = fs.readdirSync(modsDir);
  if (installed2.some((f) => /optifine/i.test(f))) {
    emit2({
      type: "log",
      line: "[NeoTerra]: OptiFine topildi - FPS modlari o'tkazib yuborildi (ular birga ishlamaydi)"
    });
    return;
  }
  const installedNames = installed2.map(normalize$1);
  function alreadyThere(slug) {
    const norm2 = normalize$1(slug);
    const matches = installed2.filter((f) => normalize$1(f).includes(norm2));
    if (matches.length === 0) return false;
    if (!VERSION_AWARE_SLUGS.has(slug)) return true;
    let hasCurrent = false;
    for (const f of matches) {
      if (filenameMatchesGameVersion(f.toLowerCase(), gameVersion.toLowerCase())) {
        hasCurrent = true;
        continue;
      }
      try {
        fs.unlinkSync(path.join(modsDir, f));
      } catch {
      }
    }
    return hasCurrent;
  }
  const memory = readBoostMemory(dir);
  const memoryKey = `${gameVersion}|${loader}`;
  const offered = new Set(memory[memoryKey] ?? []);
  const missingKey = `${memoryKey}|missing`;
  const now = Date.now();
  const missing = /* @__PURE__ */ new Map();
  for (const entry2 of memory[missingKey] ?? []) {
    const [slug, at] = entry2.split("@");
    if (slug && now - Number(at) < MISSING_RECHECK_MS) missing.set(slug, Number(at));
  }
  let memoryChanged = false;
  const deadline = now + PERF_MODS_BUDGET_MS;
  for (const group of PERFORMANCE_MODS[loader]) {
    if (group.some(alreadyThere)) continue;
    if (group.some((slug) => offered.has(slug))) continue;
    if (group.every((slug) => missing.has(slug))) continue;
    for (const slug of group) {
      if (Date.now() > deadline) break;
      if (missing.has(slug)) continue;
      const file2 = await resolveForLoader(slug, gameVersion, loader);
      if (!file2) {
        missing.set(slug, Date.now());
        memoryChanged = true;
        continue;
      }
      emit2({ type: "status", message: `FPS modi o'rnatilmoqda: ${slug}...` });
      try {
        await downloadInto(modsDir, file2.url, file2.filename);
        installedNames.push(normalize$1(file2.filename));
        offered.add(slug);
        memoryChanged = true;
      } catch (err) {
        emit2({
          type: "log",
          line: `[NeoTerra]: "${slug}" yuklanmadi: ${err instanceof Error ? err.message : String(err)}`
        });
        continue;
      }
      try {
        const deps = await resolveRequiredDependencies(slug, gameVersion, /* @__PURE__ */ new Set([slug]), loader);
        for (const dep of deps) {
          if (fs.existsSync(path.join(modsDir, dep.filename))) continue;
          if (installedNames.some((name) => name.includes(normalize$1(dep.name)))) continue;
          await downloadInto(modsDir, dep.url, dep.filename);
          installedNames.push(normalize$1(dep.filename));
        }
      } catch {
      }
      break;
    }
  }
  if (memoryChanged) {
    memory[memoryKey] = Array.from(offered);
    memory[missingKey] = Array.from(missing, ([slug, at]) => `${slug}@${at}`);
    writeBoostMemory(dir, memory);
  }
}
const STALE_MAX_FPS_LINE = /^maxFps:120(\r?)$/m;
function upgradeStaleMaxFpsDefault(file2) {
  let content;
  try {
    content = fs.readFileSync(file2, "utf-8");
  } catch {
    return;
  }
  if (!STALE_MAX_FPS_LINE.test(content)) return;
  try {
    fs.writeFileSync(file2, content.replace(STALE_MAX_FPS_LINE, "maxFps:260$1"), "utf-8");
  } catch {
  }
}
const MAX_FPS_LINE = /^maxFps:(\d+)(\r?)$/m;
function getMaxFps(dir) {
  try {
    const content = fs.readFileSync(path.join(dir, "options.txt"), "utf-8");
    const m = MAX_FPS_LINE.exec(content);
    if (m) return parseInt(m[1], 10);
  } catch {
  }
  return 260;
}
function setMaxFps(dir, value) {
  const file2 = path.join(dir, "options.txt");
  let content = "";
  try {
    content = fs.readFileSync(file2, "utf-8");
  } catch {
  }
  if (MAX_FPS_LINE.test(content)) {
    content = content.replace(MAX_FPS_LINE, (_full, _digits, cr) => `maxFps:${value}${cr}`);
  } else {
    const separator = content.length > 0 && !content.endsWith("\n") ? "\n" : "";
    content = `${content}${separator}maxFps:${value}
`;
  }
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(file2, content, "utf-8");
}
function writeDefaultVideoOptions(dir) {
  const file2 = path.join(dir, "options.txt");
  if (fs.existsSync(file2)) {
    upgradeStaleMaxFpsDefault(file2);
    return;
  }
  const lines = [
    "graphicsMode:0",
    // Fast (1.16+)
    "fancyGraphics:false",
    // xuddi shu narsa, eski versiyalar uchun
    "renderDistance:8",
    "simulationDistance:8",
    // TASDIQLANGAN XATO (foydalanuvchi shikoyati: "TLauncher bir xil sozlamada 270-300 fps,
    // MCModHub'da 130 fps bervotti"): bu yerda oldin `maxFps:120` turardi - ya'ni "FPS
    // tezlatgich" nomli funksiyaning o'zi, YANGI o'rnatishda, kuchli kompyuterni ham 120
    // kadr/soniyaga sun'iy ravishda cheklab qo'yardi. Vanilla Minecraft'ning standart qiymati
    // ("Unlimited") va TLauncher kabi boshqa launcher'lar aynan shundan foydalanadi - 260
    // Minecraft'ning options.txt formatida "Cheklanmagan"ni bildiruvchi qiymat (1.14+ barcha
    // versiyada, "Video Sozlamalar" menyusidagi eng oxirgi bayroq holati). GC/heap sozlamalari
    // (`performanceJvmArgs`) allaqachon barqarorlikni ta'minlaydi - qo'shimcha FPS cheklovi
    // shart emas edi.
    "maxFps:260",
    "enableVsync:false",
    "entityShadows:false",
    "particles:1",
    // kamaytirilgan
    "biomeBlendRadius:1",
    "mipmapLevels:2"
  ];
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(file2, `${lines.join("\n")}
`, "utf-8");
}
function applyGpuPreference() {
  if (process.platform === "win32") {
    process.env.SHIM_MCCOMPAT = "0x800000001";
    return;
  }
  if (process.platform !== "linux") return;
  if (fs.existsSync("/proc/driver/nvidia/version")) {
    process.env.__NV_PRIME_RENDER_OFFLOAD = "1";
    process.env.__GLX_VENDOR_LIBRARY_NAME = "nvidia";
    process.env.__VK_LAYER_NV_optimus = "NVIDIA_only";
  } else if (fs.existsSync("/dev/dri/renderD129")) {
    process.env.DRI_PRIME = "1";
  }
}
const GPU_PREFS_KEY = "HKCU\\Software\\Microsoft\\DirectX\\UserGpuPreferences";
const gpuPreferenceDone = /* @__PURE__ */ new Set();
function reg(args) {
  return new Promise((resolve) => {
    child_process.execFile("reg.exe", args, { windowsHide: true, timeout: 1e4 }, (err) => {
      const code = err?.code;
      resolve(err ? typeof code === "number" ? code : 1 : 0);
    });
  });
}
async function preferDiscreteGpuForJava(javaExe) {
  if (process.platform !== "win32" || !/\.exe$/i.test(javaExe)) return;
  const dir = path.dirname(javaExe);
  const key = dir.toLowerCase();
  if (gpuPreferenceDone.has(key)) return;
  gpuPreferenceDone.add(key);
  for (const exe of ["java.exe", "javaw.exe"]) {
    const path$1 = path.join(dir, exe);
    if (!fs.existsSync(path$1)) continue;
    if (await reg(["query", GPU_PREFS_KEY, "/v", path$1]) === 0) continue;
    await reg(["add", GPU_PREFS_KEY, "/v", path$1, "/t", "REG_SZ", "/d", "GpuPreference=2;", "/f"]);
  }
}
const SIG_EOCD = 101010256;
const SIG_EOCD64 = 101075792;
const SIG_LOC64 = 117853008;
const SIG_CEN = 33639248;
const SIG_LOC = 67324752;
async function readAt(handle2, position, length) {
  const buf = Buffer.allocUnsafe(length);
  let done = 0;
  while (done < length) {
    const { bytesRead } = await handle2.read(buf, done, length - done, position + done);
    if (bytesRead === 0) break;
    done += bytesRead;
  }
  if (done !== length) throw new Error("Arxiv oxiri kutilmaganda tugadi");
  return buf;
}
async function readZipIndex(zipPath) {
  const handle2 = await fs.promises.open(zipPath, "r");
  try {
    const size = (await handle2.stat()).size;
    if (size < 22) throw new Error("Zip fayl juda kichik");
    const tailLen = Math.min(size, 65557 + 22);
    const tail = await readAt(handle2, size - tailLen, tailLen);
    let eocd = -1;
    for (let i = tail.length - 22; i >= 0; i--) {
      if (tail.readUInt32LE(i) === SIG_EOCD && i + 22 + tail.readUInt16LE(i + 20) === tail.length) {
        eocd = i;
        break;
      }
    }
    if (eocd < 0) throw new Error("Zip yakuniy yozuvi topilmadi");
    let total = tail.readUInt16LE(eocd + 10);
    let cdSize = tail.readUInt32LE(eocd + 12);
    let cdOffset = tail.readUInt32LE(eocd + 16);
    if (total === 65535 || cdSize === 4294967295 || cdOffset === 4294967295) {
      const locPos = eocd - 20;
      if (locPos < 0 || tail.readUInt32LE(locPos) !== SIG_LOC64) throw new Error("Zip64 yozuvi topilmadi");
      const eocd64Offset = Number(tail.readBigUInt64LE(locPos + 8));
      const rec = await readAt(handle2, eocd64Offset, 56);
      if (rec.readUInt32LE(0) !== SIG_EOCD64) throw new Error("Zip64 yakuniy yozuvi buzuq");
      total = Number(rec.readBigUInt64LE(32));
      cdSize = Number(rec.readBigUInt64LE(40));
      cdOffset = Number(rec.readBigUInt64LE(48));
    }
    const cd = await readAt(handle2, cdOffset, cdSize);
    const entries = [];
    let p = 0;
    for (let n = 0; n < total; n++) {
      if (p + 46 > cd.length || cd.readUInt32LE(p) !== SIG_CEN) throw new Error("Zip katalogi buzuq");
      const flags = cd.readUInt16LE(p + 8);
      const method = cd.readUInt16LE(p + 10);
      const crc = cd.readUInt32LE(p + 16);
      let compSize = cd.readUInt32LE(p + 20);
      let usize = cd.readUInt32LE(p + 24);
      const nameLen = cd.readUInt16LE(p + 28);
      const extraLen = cd.readUInt16LE(p + 30);
      const commentLen = cd.readUInt16LE(p + 32);
      let offset = cd.readUInt32LE(p + 42);
      const name = cd.toString("utf8", p + 46, p + 46 + nameLen);
      let e = p + 46 + nameLen;
      const eEnd = e + extraLen;
      while (e + 4 <= eEnd) {
        const id = cd.readUInt16LE(e);
        const len = cd.readUInt16LE(e + 2);
        if (id === 1) {
          let q = e + 4;
          if (usize === 4294967295) {
            usize = Number(cd.readBigUInt64LE(q));
            q += 8;
          }
          if (compSize === 4294967295) {
            compSize = Number(cd.readBigUInt64LE(q));
            q += 8;
          }
          if (offset === 4294967295) {
            offset = Number(cd.readBigUInt64LE(q));
            q += 8;
          }
        }
        e += 4 + len;
      }
      const normalized = name.replace(/\\/g, "/");
      entries.push({ name: normalized, method, flags, crc, compSize, size: usize, offset, isDir: normalized.endsWith("/") });
      p += 46 + nameLen + extraLen + commentLen;
    }
    return entries;
  } finally {
    await handle2.close();
  }
}
const crc32Native = zlib.crc32;
let crcTable = null;
function crc32Fallback(data, prev = 0) {
  if (!crcTable) {
    crcTable = new Int32Array(256);
    for (let n = 0; n < 256; n++) {
      let c2 = n;
      for (let k = 0; k < 8; k++) c2 = c2 & 1 ? 3988292384 ^ c2 >>> 1 : c2 >>> 1;
      crcTable[n] = c2;
    }
  }
  let c = ~prev;
  for (let i = 0; i < data.length; i++) c = crcTable[(c ^ data[i]) & 255] ^ c >>> 8;
  return ~c >>> 0;
}
function crc32(data, prev = 0) {
  return crc32Native ? crc32Native(data, prev) >>> 0 : crc32Fallback(data, prev);
}
function safeJoin(root, rel) {
  const parts = rel.split("/").filter((s) => s !== "" && s !== ".");
  if (parts.some((s) => s === ".." || /^[A-Za-z]:$/.test(s))) throw new Error(`Xavfli fayl yo'li: ${rel}`);
  const out = path.join(root, ...parts);
  if (out !== root && !out.startsWith(root + path.sep)) throw new Error(`Xavfli fayl yo'li: ${rel}`);
  return out;
}
async function extractEntries(zipPath, destDir, targets, onBytes, concurrency = 6) {
  const created = /* @__PURE__ */ new Set();
  const handle2 = await fs.promises.open(zipPath, "r");
  try {
    await runPoolStrict(targets, concurrency, async ({ entry: entry2, relPath }) => {
      if (entry2.flags & 1) throw new Error("Parolli zip qo'llab-quvvatlanmaydi");
      if (entry2.method !== 0 && entry2.method !== 8) throw new Error(`Zip siqish usuli qo'llab-quvvatlanmaydi (${entry2.method})`);
      const out = safeJoin(destDir, relPath);
      const dir = path.dirname(out);
      if (!created.has(dir)) {
        await fs.promises.mkdir(dir, { recursive: true });
        created.add(dir);
      }
      if (entry2.compSize === 0) {
        await fs.promises.writeFile(out, "");
        return;
      }
      const local = await readAt(handle2, entry2.offset, 30);
      if (local.readUInt32LE(0) !== SIG_LOC) throw new Error("Zip fayl sarlavhasi buzuq");
      const dataStart = entry2.offset + 30 + local.readUInt16LE(26) + local.readUInt16LE(28);
      let crc = 0;
      let written = 0;
      const tap = new stream.Transform({
        transform(chunk, _enc, cb) {
          crc = crc32(chunk, crc);
          written += chunk.length;
          onBytes?.(chunk.length);
          cb(null, chunk);
        }
      });
      const input = fs.createReadStream(zipPath, { start: dataStart, end: dataStart + entry2.compSize - 1, highWaterMark: 1 << 20 });
      const sink = fs.createWriteStream(out, { highWaterMark: 1 << 20 });
      if (entry2.method === 8) await promises.pipeline(input, zlib.createInflateRaw(), tap, sink);
      else await promises.pipeline(input, tap, sink);
      if (written !== entry2.size) throw new Error(`Fayl hajmi mos kelmadi: ${relPath}`);
      if (crc !== entry2.crc) throw new Error(`Fayl buzilgan (CRC): ${relPath}`);
    });
  } finally {
    await handle2.close();
  }
}
async function runPoolStrict(items, concurrency, worker) {
  let failure = null;
  await runPool(items, concurrency, async (item) => {
    if (failure) return;
    try {
      await worker(item);
    } catch (err) {
      failure = failure ?? err;
    }
  });
  if (failure) throw failure;
}
const MESA_VERSION = "26.2.4";
const MESA_ZIP_NAME = `mesa-llvmpipe-${MESA_VERSION}-win-x64.zip`;
const MESA_ZIP_URLS = [`https://cdn.mcmodhub.org/runtime/${MESA_ZIP_NAME}`];
const MESA_ZIP_SIZE = 22951018;
const MESA_ZIP_SHA256 = "b09b647d71b3fc822bafa87f519df73d821ec64823a65269da31585982a7d0fa";
const MESA_DLL_SIZES = {
  "opengl32.dll": 139264,
  "libgallium_wgl.dll": 61868032
};
const REMEMBER_MS = 3 * 24 * 60 * 60 * 1e3;
const DOWNLOAD_COOLDOWN_MS = 10 * 60 * 1e3;
let mesaFailedAt = 0;
function softwareGlSupported() {
  if (process.platform === "win32") return process.arch === "x64" && Date.now() - mesaFailedAt > DOWNLOAD_COOLDOWN_MS;
  return process.platform === "linux";
}
function decideSoftwareGl(gpus, forced) {
  if (!softwareGlSupported()) return null;
  if (!isSoftwareGlUserEnabled()) return null;
  if (forced) return "crash";
  if (process.platform === "win32" && lacksHardwareOpenGl(gpus)) return "no-driver";
  const saved = getSoftwareGlState();
  if (saved) {
    if (saved.gpuKey === gpuFingerprint(gpus) && Date.now() - saved.at < REMEMBER_MS) return "remembered";
    setSoftwareGlState(null);
  }
  return null;
}
function rememberSoftwareGl(gpus) {
  try {
    setSoftwareGlState({ gpuKey: gpuFingerprint(gpus), at: Date.now() });
  } catch {
  }
}
function runtimeDir() {
  return path.join(getInstallPath(), "runtime");
}
function isPeFile(path2) {
  let fd = -1;
  try {
    fd = fs.openSync(path2, "r");
    const head = Buffer.alloc(2);
    if (fs.readSync(fd, head, 0, 2, 0) < 2) return false;
    return head[0] === 77 && head[1] === 90;
  } catch {
    return false;
  } finally {
    if (fd !== -1) {
      try {
        fs.closeSync(fd);
      } catch {
      }
    }
  }
}
function mesaReady(dir) {
  return Object.entries(MESA_DLL_SIZES).every(([name, size]) => {
    try {
      const path$1 = path.join(dir, name);
      return fs.statSync(path$1).size === size && isPeFile(path$1);
    } catch {
      return false;
    }
  });
}
async function ensureMesa(onProgress) {
  const dir = path.join(runtimeDir(), `mesa-${MESA_VERSION}`);
  if (mesaReady(dir)) return dir;
  const zip = path.join(runtimeDir(), MESA_ZIP_NAME);
  try {
    await fs.promises.mkdir(runtimeDir(), { recursive: true });
    await downloadFile({
      url: MESA_ZIP_URLS,
      dest: zip,
      size: MESA_ZIP_SIZE,
      sha256: MESA_ZIP_SHA256,
      stallMs: 3e4,
      onProgress
    });
    const targets = (await readZipIndex(zip)).filter((e) => !e.isDir && MESA_DLL_SIZES[e.name] !== void 0).map((entry2) => ({ entry: entry2, relPath: entry2.name }));
    const tmp = `${dir}.tmp`;
    await fs.promises.rm(tmp, { recursive: true, force: true });
    await extractEntries(zip, tmp, targets);
    if (!mesaReady(tmp)) throw new Error("Mesa arxivi to'liq emas");
    await fs.promises.rm(dir, { recursive: true, force: true });
    await fs.promises.rename(tmp, dir);
    await fs.promises.rm(zip, { force: true }).catch(() => void 0);
    return dir;
  } catch (err) {
    mesaFailedAt = Date.now();
    throw err;
  }
}
function javaSignature(home2) {
  const parts = [];
  for (const rel of ["release", path.join("lib", "modules"), path.join("lib", "rt.jar"), path.join("bin", "java.exe"), path.join("bin", "javaw.exe")]) {
    try {
      const st = fs.statSync(path.join(home2, rel));
      parts.push(`${rel}:${st.size}:${Math.round(st.mtimeMs)}`);
    } catch {
    }
  }
  return parts.join("|");
}
async function mirrorTree(src, dst) {
  await fs.promises.mkdir(dst, { recursive: true });
  for (const entry2 of await fs.promises.readdir(src, { withFileTypes: true })) {
    const from = path.join(src, entry2.name);
    const to = path.join(dst, entry2.name);
    if (entry2.isDirectory()) {
      await mirrorTree(from, to);
    } else if (entry2.isFile()) {
      try {
        await fs.promises.link(from, to);
      } catch {
        await fs.promises.copyFile(from, to);
      }
    }
  }
}
async function prepareSoftwareJava(javaExe, mesaDir) {
  if (process.platform !== "win32") return javaExe;
  const home2 = path.dirname(path.dirname(javaExe));
  const id = crypto.createHash("sha1").update(home2.toLowerCase()).digest("hex").slice(0, 12);
  const shadow = path.join(runtimeDir(), "jre-sw", id);
  const shadowJava = path.join(shadow, "bin", path.basename(javaExe));
  const stampFile = path.join(shadow, ".mcmodhub-sw.json");
  const stamp = JSON.stringify({ home: home2, mesa: MESA_VERSION, sig: javaSignature(home2) });
  try {
    if (fs.existsSync(shadowJava) && fs.readFileSync(stampFile, "utf-8") === stamp && mesaReady(path.join(shadow, "bin"))) return shadowJava;
  } catch {
  }
  const tmp = `${shadow}.tmp`;
  await fs.promises.rm(tmp, { recursive: true, force: true });
  await mirrorTree(home2, tmp);
  for (const name of Object.keys(MESA_DLL_SIZES)) {
    await fs.promises.rm(path.join(tmp, "bin", name), { force: true });
    await fs.promises.copyFile(path.join(mesaDir, name), path.join(tmp, "bin", name));
  }
  await fs.promises.writeFile(path.join(tmp, ".mcmodhub-sw.json"), stamp, "utf-8");
  await fs.promises.rm(shadow, { recursive: true, force: true });
  await fs.promises.rename(tmp, shadow);
  return shadowJava;
}
const ENV_KEYS = ["GALLIUM_DRIVER", "SDL_OPENGL_LIBRARY", "LIBGL_ALWAYS_SOFTWARE", "__GLX_VENDOR_LIBRARY_NAME"];
const ORIGINAL_ENV = Object.fromEntries(ENV_KEYS.map((k) => [k, process.env[k]]));
function applySoftwareGlEnv(javaExe) {
  for (const key of ENV_KEYS) {
    if (ORIGINAL_ENV[key] === void 0) delete process.env[key];
    else process.env[key] = ORIGINAL_ENV[key];
  }
  if (!javaExe) return;
  process.env.GALLIUM_DRIVER = "llvmpipe";
  if (process.platform === "win32") {
    process.env.SDL_OPENGL_LIBRARY = path.join(path.dirname(javaExe), "opengl32.dll");
  } else {
    process.env.LIBGL_ALWAYS_SOFTWARE = "1";
    process.env.__GLX_VENDOR_LIBRARY_NAME = "mesa";
    delete process.env.__NV_PRIME_RENDER_OFFLOAD;
    delete process.env.__VK_LAYER_NV_optimus;
    delete process.env.DRI_PRIME;
  }
}
function softwareGlJvmArgs(javaExe) {
  if (process.platform !== "win32") return [];
  return [`-Dorg.lwjgl.opengl.libname=${path.join(path.dirname(javaExe), "opengl32.dll")}`];
}
function softwareGlGameArgs(mcVersion) {
  const major = Number(/^(\d+)\./.exec(mcVersion)?.[1] ?? 0);
  return major >= 26 ? ["--graphicsBackend", "opengl"] : [];
}
function softwareGlUserEnabled() {
  return isSoftwareGlUserEnabled();
}
async function setSoftwareGlEnabled(enabled) {
  setSoftwareGlUserEnabled(enabled);
  if (!enabled) {
    setSoftwareGlState(null);
    await fs.promises.rm(path.join(runtimeDir(), "jre-sw"), { recursive: true, force: true }).catch(() => void 0);
  }
}
function gameDir() {
  return getInstallPath();
}
function instanceKey(version, loader) {
  return loader ? `${version}-${loader}` : version;
}
function instanceDir(version, loader) {
  return path.join(gameDir(), "instances", instanceKey(version, loader));
}
let currentInstance = null;
function setCurrentInstance(version, loader) {
  currentInstance = { version, loader };
  try {
    setLastInstance(version, loader ?? null);
  } catch {
  }
}
function getCurrentInstance() {
  if (!currentInstance) {
    const saved = getLastInstance();
    if (saved) currentInstance = { version: saved.version, loader: saved.loader };
  }
  return currentInstance;
}
function currentInstanceDir() {
  const inst = getCurrentInstance();
  return inst ? instanceDir(inst.version, inst.loader) : null;
}
function ensureInstanceDirs(version, loader) {
  const dir = instanceDir(version, loader);
  for (const sub of ["mods", "config", "saves", "resourcepacks", "shaderpacks", "screenshots", "logs", "crash-reports"]) {
    fs.mkdirSync(path.join(dir, sub), { recursive: true });
  }
  return dir;
}
function detectLegacyOwner(root) {
  try {
    const parsed = JSON.parse(fs.readFileSync(path.join(root, "mcmodhub-fps-boost.json"), "utf-8"));
    for (const key of Object.keys(parsed)) {
      const [v, l] = key.split("|");
      if (v) return { version: v, loader: l || null };
    }
  } catch {
  }
  try {
    for (const name of fs.readdirSync(path.join(root, "versions"))) {
      let m = /^fabric-loader-.+-(\d+\.\d+(?:\.\d+)?)$/.exec(name);
      if (m) return { version: m[1], loader: "fabric" };
      m = /^quilt-loader-.+-(\d+\.\d+(?:\.\d+)?)$/.exec(name);
      if (m) return { version: m[1], loader: "quilt" };
      m = /^(\d+\.\d+(?:\.\d+)?)-forge-/.exec(name);
      if (m) return { version: m[1], loader: "forge" };
      m = /^forge-(\d+\.\d+(?:\.\d+)?)-/.exec(name);
      if (m) return { version: m[1], loader: "forge" };
    }
  } catch {
  }
  try {
    const names = fs.readdirSync(path.join(root, "mods"));
    const versionVotes = /* @__PURE__ */ new Map();
    const loaderVotes = /* @__PURE__ */ new Map();
    for (const name of names) {
      const vm = /(?:\+|-)mc(\d+\.\d+(?:\.\d+)?)/i.exec(name);
      if (vm) versionVotes.set(vm[1], (versionVotes.get(vm[1]) ?? 0) + 1);
      for (const l of ["forge", "fabric", "quilt"]) {
        if (new RegExp(`[-_.]${l}[-_.]`, "i").test(name)) {
          loaderVotes.set(l, (loaderVotes.get(l) ?? 0) + 1);
        }
      }
    }
    const topVersion = [...versionVotes.entries()].sort((a, b) => b[1] - a[1])[0];
    if (topVersion) {
      const topLoader = [...loaderVotes.entries()].sort((a, b) => b[1] - a[1])[0];
      return { version: topVersion[0], loader: topLoader ? topLoader[0] : null };
    }
  } catch {
  }
  return null;
}
function migrateRootToInstance() {
  const root = gameDir();
  try {
    const rootMods = path.join(root, "mods");
    if (fs.existsSync(rootMods) && fs.readdirSync(rootMods).length === 0) {
      fs.rmSync(rootMods, { recursive: true, force: true });
    }
  } catch {
  }
  const owner = detectLegacyOwner(root);
  if (!owner) return { migrated: false, itemCount: 0 };
  const dest = instanceDir(owner.version, owner.loader);
  const destMods = path.join(dest, "mods");
  if (fs.existsSync(destMods) && fs.readdirSync(destMods).length > 0) {
    return { migrated: false, itemCount: 0 };
  }
  const rootModsDir = path.join(root, "mods");
  const hasRootMods = fs.existsSync(rootModsDir) && fs.readdirSync(rootModsDir).length > 0;
  if (!hasRootMods) return { migrated: false, itemCount: 0 };
  fs.mkdirSync(dest, { recursive: true });
  const foldersToMove = [
    "mods",
    "saves",
    "config",
    "defaultconfigs",
    "resourcepacks",
    "shaderpacks",
    "screenshots",
    "CustomSkinLoader",
    "logs",
    "crash-reports"
  ];
  const filesToMove = [
    "options.txt",
    "optionsof.txt",
    "servers.dat",
    "mcmodhub_companion.json",
    "mcmodhub-fps-boost.json"
  ];
  let itemCount = 0;
  for (const folder of foldersToMove) {
    const src = path.join(root, folder);
    if (!fs.existsSync(src)) continue;
    const target = path.join(dest, folder);
    try {
      fs.mkdirSync(target, { recursive: true });
      for (const name of fs.readdirSync(src)) {
        const to = path.join(target, name);
        if (fs.existsSync(to)) continue;
        try {
          fs.renameSync(path.join(src, name), to);
          itemCount++;
        } catch {
        }
      }
      try {
        if (fs.readdirSync(src).length === 0) fs.rmSync(src, { recursive: true, force: true });
      } catch {
      }
    } catch {
    }
  }
  for (const file2 of filesToMove) {
    const src = path.join(root, file2);
    if (!fs.existsSync(src)) continue;
    const to = path.join(dest, file2);
    if (fs.existsSync(to)) continue;
    try {
      fs.renameSync(src, to);
      itemCount++;
    } catch {
    }
  }
  return { migrated: true, itemCount, owner: instanceKey(owner.version, owner.loader) };
}
function unixSocketTmpDir() {
  const drive = process.env.SystemDrive ?? "C:";
  const dir = path.join(drive, ".mcmodhub-uds");
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}
function needsServicesHostOverride(version) {
  return version === "1.16.4" || version === "1.16.5";
}
const OFFLINE_SERVICES_HOST_ARG = "-Dminecraft.api.services.host=https://nope.invalid";
const CSL_LOADER_NAMES = ["fabric", "forge", "quilt", "neoforge"];
function cslCacheDir(gameVersion, loaderKey) {
  return path.join(gameDir(), "mcmodhub-cache", "customskinloader", `${gameVersion}-${loaderKey}`);
}
function isReadableJar(bytes) {
  if (bytes.length < 1024 || bytes[0] !== 80 || bytes[1] !== 75) return false;
  try {
    return new AdmZip(bytes).getEntries().length > 0;
  } catch {
    return false;
  }
}
async function downloadWithRetry(url, attempts = 3) {
  let lastErr = null;
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(6e4) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const bytes = Buffer.from(await res.arrayBuffer());
      if (!isReadableJar(bytes)) throw new Error(`buzilgan fayl (${bytes.length} bayt)`);
      return bytes;
    } catch (err) {
      lastErr = err;
      if (i < attempts - 1) await new Promise((r) => setTimeout(r, 1500 * (i + 1)));
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error(String(lastErr));
}
async function ensureCustomSkinLoaderMod(dir, gameVersion, loader) {
  const modsDir = path.join(dir, "mods");
  fs.mkdirSync(modsDir, { recursive: true });
  const wanted = loader === "quilt" ? "fabric" : loader;
  const accepted = loader === "quilt" ? ["fabric", "quilt"] : [wanted];
  const existing = fs.readdirSync(modsDir).filter((f) => /customskinloader/i.test(f));
  const mismatched = existing.filter((f) => {
    const lower = f.toLowerCase();
    if (lower.includes("universal")) return false;
    return CSL_LOADER_NAMES.some((n) => !accepted.includes(n) && lower.includes(n));
  });
  for (const stale of mismatched) {
    try {
      fs.unlinkSync(path.join(modsDir, stale));
    } catch {
    }
  }
  const healthy = existing.filter((f) => !mismatched.includes(f)).filter((f) => {
    if (!/\.jar$/i.test(f)) {
      if (/\.part$/i.test(f)) try {
        fs.unlinkSync(path.join(modsDir, f));
      } catch {
      }
      return false;
    }
    try {
      if (isReadableJar(fs.readFileSync(path.join(modsDir, f)))) return true;
      fs.unlinkSync(path.join(modsDir, f));
    } catch {
    }
    return false;
  });
  if (healthy.length > 0) return `CustomSkinLoader joyida (${healthy[0]})`;
  const cacheDir = cslCacheDir(gameVersion, wanted);
  const fromCache = () => {
    try {
      if (!fs.existsSync(cacheDir)) return null;
      const name = fs.readdirSync(cacheDir).find((f) => /customskinloader.*\.jar$/i.test(f));
      if (!name) return null;
      const bytes2 = fs.readFileSync(path.join(cacheDir, name));
      if (!isReadableJar(bytes2)) return null;
      fs.writeFileSync(path.join(modsDir, name), bytes2);
      return name;
    } catch {
      return null;
    }
  };
  const fromBundled = () => {
    try {
      const candidates = [
        path.join(__dirname, "../../resources/NeoSkinLoader_Universal-15.0.1.jar"),
        path.join(__dirname, "../../resources/CustomSkinLoader_Universal-15.0.1.jar"),
        path.join(process.cwd(), "resources/NeoSkinLoader_Universal-15.0.1.jar"),
        path.join(process.cwd(), "resources/CustomSkinLoader_Universal-15.0.1.jar")
      ];
      for (const p of candidates) {
        if (fs.existsSync(p)) {
          const bytes = fs.readFileSync(p);
          if (isReadableJar(bytes)) {
            const targetName = "CustomSkinLoader_Universal-15.0.1.jar";
            fs.writeFileSync(path.join(modsDir, targetName), bytes);
            return targetName;
          }
        }
      }
    } catch {}
    return null;
  };
  let file2 = null;
  let resolveErr = null;
  for (let i = 0; i < 3 && !file2; i++) {
    try {
      file2 = await resolveLatestFile("customskinloader", gameVersion, wanted);
      if (!file2) break;
    } catch (err) {
      resolveErr = err;
      if (i < 2) await new Promise((r) => setTimeout(r, 1500 * (i + 1)));
    }
  }
  if (!file2) {
    const cached = fromCache();
    if (cached) return `CustomSkinLoader keshdan o'rnatildi (${cached})`;
    const bundled = fromBundled();
    if (bundled) return `CustomSkinLoader resurslardan o'rnatildi (${bundled})`;
    if (resolveErr) {
      throw new Error(`Modrinth'ga ulanib bo'lmadi: ${resolveErr instanceof Error ? resolveErr.message : String(resolveErr)}`);
    }
    throw new Error(`${gameVersion} (${wanted}) uchun CustomSkinLoader topilmadi - bu versiyada o'yin ichidagi skinlar ishlamaydi`);
  }
  let bytes;
  try {
    bytes = await downloadWithRetry(file2.url);
  } catch (err) {
    const cached = fromCache();
    if (cached) return `CustomSkinLoader keshdan o'rnatildi (${cached})`;
    const bundled = fromBundled();
    if (bundled) return `CustomSkinLoader resurslardan o'rnatildi (${bundled})`;
    throw new Error(`CustomSkinLoader yuklanmadi: ${err instanceof Error ? err.message : String(err)}`);
  }
  const target = path.join(modsDir, file2.filename);
  fs.writeFileSync(`${target}.part`, bytes);
  fs.renameSync(`${target}.part`, target);
  try {
    fs.mkdirSync(cacheDir, { recursive: true });
    for (const old of fs.readdirSync(cacheDir)) {
      if (old !== file2.filename) fs.rmSync(path.join(cacheDir, old), { force: true });
    }
    fs.writeFileSync(path.join(cacheDir, file2.filename), bytes);
  } catch {
  }
  return `CustomSkinLoader yuklandi (${file2.filename})`;
}
const SUPABASE_URL_FOR_SKINS = "https://hhpnhwfzovbttorprudl.supabase.co";
const NEOTERRA_SKINS_API_ROOT = "https://site.neoterra.uz/api/launcher/skins/";
function writeCustomSkinLoaderConfig(dir) {
  const dirs = [dir];
  const gDir = gameDir();
  if (gDir && gDir !== dir) dirs.push(gDir);

  for (const targetDir of dirs) {
    try {
      const cslDir = path.join(targetDir, "CustomSkinLoader");
      fs.mkdirSync(cslDir, { recursive: true });
      const configPath = path.join(cslDir, "CustomSkinLoader.json");

      const gameProfile = {
        name: "GameProfile",
        type: "GameProfile"
      };

      const local = {
        name: "LocalSkin",
        type: "Legacy",
        checkPNG: false,
        skin: "LocalSkin/skins/{USERNAME}.png",
        cape: "LocalSkin/capes/{USERNAME}.png",
        model: "auto"
      };

      const neoterraSite = {
        name: "NeoTerra",
        type: "CustomSkinAPI",
        root: NEOTERRA_SKINS_API_ROOT
      };

      const neoterraStorage = {
        name: "NeoTerraStorage",
        type: "CustomSkinAPI",
        root: `${SUPABASE_URL_FOR_SKINS}/storage/v1/object/public/neoterra-skins/`
      };

      const neoterraDirect = {
        name: "NeoTerraDirect",
        type: "Legacy",
        checkPNG: true,
        skin: `${SUPABASE_URL_FOR_SKINS}/storage/v1/object/public/neoterra-skins/textures/{USERNAME}.png`,
        cape: `${SUPABASE_URL_FOR_SKINS}/storage/v1/object/public/neoterra-skins/textures/{USERNAME}_cape.png`
      };

      const mojang = {
        name: "Mojang",
        type: "MojangAPI"
      };

      const config = {
        version: "15.0.1",
        loadlist: [gameProfile, local, neoterraStorage, neoterraSite, neoterraDirect, mojang],
        forceLoadAllTextures: false,
        cacheExpiry: 180
      };

      fs.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf-8");
    } catch {}
  }
}
const PNG_MAGIC = Buffer.from([137, 80, 78, 71]);
async function cacheLocalSkin(instRoot2, nick, skinUrl, capeUrl) {
  const targetsSkin = [
    path.join(instRoot2, "CustomSkinLoader", "LocalSkin", "skins", `${nick}.png`),
    path.join(gameDir(), "CustomSkinLoader", "LocalSkin", "skins", `${nick}.png`)
  ];
  const shared = path.join(gameDir(), "skin-cache", `${nick}.png`);
  if (!skinUrl) {
    for (const t of targetsSkin) {
      try { fs.rmSync(t, { force: true }); } catch {}
    }
  } else {
    let bytes = null;
    if (skinUrl && /^https:\/\//i.test(skinUrl)) {
      try {
        const res = await fetch(skinUrl, { signal: AbortSignal.timeout(4e3) });
        const buf = res.ok ? Buffer.from(await res.arrayBuffer()) : null;
        if (buf && buf.length < 2e6 && buf.subarray(0, 4).equals(PNG_MAGIC)) {
          bytes = buf;
          fs.mkdirSync(path.dirname(shared), { recursive: true });
          fs.writeFileSync(shared, buf);
        }
      } catch {
      }
    }
    if (!bytes && fs.existsSync(shared)) bytes = fs.readFileSync(shared);
    if (bytes) {
      for (const t of targetsSkin) {
        try {
          fs.mkdirSync(path.dirname(t), { recursive: true });
          fs.writeFileSync(t, bytes);
        } catch {}
      }
    }
  }
  if (capeUrl) {
    const targetsCape = [
      path.join(instRoot2, "CustomSkinLoader", "LocalSkin", "capes", `${nick}.png`),
      path.join(gameDir(), "CustomSkinLoader", "LocalSkin", "capes", `${nick}.png`)
    ];
    const sharedCape = path.join(gameDir(), "skin-cache", `${nick}_cape.png`);
    let capeBytes = null;
    if (/^https:\/\//i.test(capeUrl)) {
      try {
        const res = await fetch(capeUrl, { signal: AbortSignal.timeout(4e3) });
        const buf = res.ok ? Buffer.from(await res.arrayBuffer()) : null;
        if (buf && buf.length < 2e6 && buf.subarray(0, 4).equals(PNG_MAGIC)) {
          capeBytes = buf;
          fs.mkdirSync(path.dirname(sharedCape), { recursive: true });
          fs.writeFileSync(sharedCape, buf);
        }
      } catch {
      }
    }
    if (!capeBytes && fs.existsSync(sharedCape)) capeBytes = fs.readFileSync(sharedCape);
    if (capeBytes) {
      for (const t of targetsCape) {
        try {
          fs.mkdirSync(path.dirname(t), { recursive: true });
          fs.writeFileSync(t, capeBytes);
        } catch {}
      }
    }
  }
}
function writeCompanionConfig(dir, companionId) {
  fs.mkdirSync(dir, { recursive: true });
  const jsonStr = JSON.stringify({ companion: companionId ?? null }, null, 2);
  fs.writeFileSync(path.join(dir, "neoterra_companion.json"), jsonStr, "utf-8");
  fs.writeFileSync(path.join(dir, "mcmodhub_companion.json"), jsonStr, "utf-8");
}
function writeUiToken(dir, token) {
  const target = path.join(dir, "mcmodhub_ui");
  fs.mkdirSync(target, { recursive: true });
  const file2 = path.join(target, "launch_token");
  if (token) {
    fs.writeFileSync(file2, token, "utf-8");
  } else {
    fs.rmSync(file2, { force: true });
  }
}
const FORGEWRAPPER_VERSION = "1.6.0";
const FORGEWRAPPER_SIZE = 28679;
const FORGEWRAPPER_URL = `https://github.com/ZekerZhayard/ForgeWrapper/releases/download/${FORGEWRAPPER_VERSION}/ForgeWrapper-${FORGEWRAPPER_VERSION}.jar`;
async function ensureForgeWrapperJar(root) {
  const dir = path.join(root, "libraries", "io", "github", "zekerzhayard", "ForgeWrapper", FORGEWRAPPER_VERSION);
  const jarPath = path.join(dir, `ForgeWrapper-${FORGEWRAPPER_VERSION}.jar`);
  if (fs.existsSync(jarPath) && fs.statSync(jarPath).size === FORGEWRAPPER_SIZE) return;
  fs.mkdirSync(dir, { recursive: true });
  try {
    const res = await fetchGithubResilient(FORGEWRAPPER_URL);
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length !== FORGEWRAPPER_SIZE) throw new Error(`kutilmagan fayl hajmi (${buf.length} bayt)`);
    fs.writeFileSync(jarPath, buf);
  } catch (err) {
    throw new Error(
      `ForgeWrapper kutubxonasini yuklab bo'lmadi (internet aloqasini tekshiring): ${err instanceof Error ? err.message : String(err)}`
    );
  }
}
const LOG4J_CONFIGS = [
  { minMinor: 12, maxMinor: 16, file: "log4j2_112-116.xml", sha1: "02937d122c86ce73319ef9975b58896fc1b491d1" },
  { minMinor: 7, maxMinor: 11, file: "log4j2_17-111.xml", sha1: "dd2b723346a8dcd48e7f4d245f6bf09e98db9696" }
];
async function ensureLog4jConfig(instRoot2, mclcId) {
  const minor = parseInt(mclcId.split(".")[1] ?? "", 10);
  const cfg = LOG4J_CONFIGS.find((c) => minor >= c.minMinor && minor <= c.maxMinor);
  if (!cfg) return null;
  const dest = path.join(instRoot2, cfg.file);
  if (await fileMatches(dest, { sha1: cfg.sha1 }, true)) return dest;
  try {
    await downloadFile({ url: `https://launcher.mojang.com/v1/objects/${cfg.sha1}/${cfg.file}`, dest, sha1: cfg.sha1, attempts: 2, stallMs: 1e4 });
    return dest;
  } catch {
    return null;
  }
}
let corruptedScanDone = false;
function removeCorruptedDownloads(root) {
  let removed = 0;
  function scan(dir, isCorrupt) {
    let entries;
    try {
      entries = fs.readdirSync(dir);
    } catch {
      return;
    }
    for (const entry2 of entries) {
      const full = path.join(dir, entry2);
      try {
        const s = fs.statSync(full);
        if (s.isDirectory()) scan(full, isCorrupt);
        else if (isCorrupt(entry2, s.size)) {
          fs.unlinkSync(full);
          removed++;
        }
      } catch {
      }
    }
  }
  scan(path.join(root, "libraries"), (name, size) => name.endsWith(".jar") && size === 0);
  scan(path.join(root, "versions"), (name, size) => (name.endsWith(".jar") || name.endsWith(".json")) && size === 0);
  scan(path.join(root, "assets", "indexes"), (name, size) => name.endsWith(".json") && size === 0);
  return removed;
}
function cleanupLoaderProfileOnKnotError(root, mcVersion) {
  try {
    const versionsDir = path.join(root, "versions");
    if (!fs.existsSync(versionsDir)) return;
    for (const name of fs.readdirSync(versionsDir)) {
      if ((name.startsWith("fabric-loader-") || name.startsWith("quilt-loader-")) && name.endsWith(`-${mcVersion}`)) {
        fs.rmSync(path.join(versionsDir, name), { recursive: true, force: true });
      }
    }
  } catch {
  }
}
let current$1 = null;
function isRunning() {
  return current$1 !== null;
}
function runningInstanceDir() {
  return current$1?.instRoot ?? null;
}
function runningGamePid() {
  return current$1?.child?.pid ?? null;
}
function killGame() {
  current$1?.child?.kill();
  current$1 = null;
}
function readMissingMandatoryModIds(dir) {
  try {
    const content = fs.readFileSync(path.join(dir, "logs", "latest.log"), "utf-8");
    const re = /Mod ID: '([^']+)', Requested by: '[^']+', Expected range: '[^']*', Actual version: '\[MISSING]'/g;
    const ids = /* @__PURE__ */ new Set();
    for (const m of content.matchAll(re)) ids.add(m[1]);
    return Array.from(ids);
  } catch {
    return [];
  }
}
function readMissingClasspaths(dir, sinceMs) {
  try {
    const crashDir = path.join(dir, "crash-reports");
    const files = fs.readdirSync(crashDir).filter((f) => f.endsWith("-fml.txt")).map((f) => ({ f, mtime: fs.statSync(path.join(crashDir, f)).mtimeMs })).filter((x) => x.mtime >= sinceMs).sort((a, b) => b.mtime - a.mtime);
    if (files.length === 0) return [];
    const content = fs.readFileSync(path.join(crashDir, files[0].f), "utf-8");
    const re = /Caused by \d+: java\.lang\.NoClassDefFoundError: ([\w/$]+)/g;
    const classes = /* @__PURE__ */ new Set();
    for (const m of content.matchAll(re)) {
      const cls = normalizeMissingClass(m[1].replace(/\//g, "."));
      if (cls) classes.add(cls);
    }
    return Array.from(classes);
  } catch {
    return [];
  }
}
function readMissingClasspathsFromRawOutput(lines) {
  const re = /java\.lang\.(?:ClassNotFoundException|NoClassDefFoundError):\s*([\w/.$]+)/g;
  const classes = /* @__PURE__ */ new Set();
  for (const line of lines) {
    if (isHandledLogLine(line)) continue;
    for (const m of line.matchAll(re)) {
      const cls = normalizeMissingClass(m[1].replace(/\//g, "."));
      if (cls) classes.add(cls);
    }
  }
  return Array.from(classes);
}
function isHandledLogLine(line) {
  return /\/(?:INFO|WARN|DEBUG|TRACE)\]/i.test(line);
}
function normalizeMissingClass(raw) {
  const outer = raw.split("$")[0];
  if (!outer.includes(".")) return null;
  if (outer.toLowerCase().startsWith("customskinloader.")) return null;
  if (SYSTEM_CLASS_PREFIX.test(outer) || LEGACY_LAUNCH_CLASS.test(outer)) return null;
  return outer;
}
const SYSTEM_CLASS_PREFIX = /^(java|javax|jdk|sun|com\.sun|net\.minecraft|net\.minecraftforge|net\.neoforged|cpw\.mods|net\.fabricmc|org\.quiltmc|org\.spongepowered|com\.mojang|org\.lwjgl|org\.objectweb\.asm|org\.apache|org\.slf4j|com\.google|io\.netty|it\.unimi|joptsimple|oshi|com\.electronwill|net\.jodah|org\.openjdk)\./;
const LEGACY_LAUNCH_CLASS = /^(net\.minecraft\.launchwrapper\.|net\.minecraftforge\.fml\.(common\.launcher|relauncher)\.)|(^|\.)(FMLTweaker|ITweaker|LaunchClassLoader|IFMLLoadingPlugin|CoreModManager|FMLLaunchHandler)$/;
function hasLegacyLaunchClassMissing(text) {
  for (const line of text.split("\n")) {
    if (!line.includes("ClassNotFoundException") && !line.includes("NoClassDefFoundError")) continue;
    const cls = extractFailingClassName(line);
    if (cls && LEGACY_LAUNCH_CLASS.test(cls.replace(/\//g, ".").split("$")[0])) return true;
  }
  return false;
}
const NON_MOD_JAR = /^(forge|fmlcore|fmlloader|javafmllanguage|lowcodelanguage|mclanguage|client-extra|minecraft|modlauncher|bootstraplauncher|securejarhandler|asm|mixin|fabric-loader|intermediary|quilt|sponge|eventbus|coremods|accesstransformers|typetools|nashorn|JarJarFileSystems)[-_.]/i;
function extractCulpritMod(lines) {
  for (const line of lines) {
    const m = line.match(/~\[([^\]!]+\.jar)!/);
    if (!m) continue;
    const jar = m[1];
    if (NON_MOD_JAR.test(jar)) continue;
    return jar;
  }
  return null;
}
function readGenericCrashSummary(dir, sinceMs) {
  try {
    const crashDir = path.join(dir, "crash-reports");
    const files = fs.readdirSync(crashDir).filter((f) => f.startsWith("crash-") && f.endsWith(".txt")).map((f) => ({ f, mtime: fs.statSync(path.join(crashDir, f)).mtimeMs })).filter((x) => x.mtime >= sinceMs).sort((a, b) => b.mtime - a.mtime);
    if (files.length === 0) return null;
    const lines = fs.readFileSync(path.join(crashDir, files[0].f), "utf-8").split("\n");
    const descIndex = lines.findIndex((l) => l.startsWith("Description:"));
    if (descIndex === -1) return null;
    const description = lines[descIndex].slice("Description:".length).trim();
    const exceptionLine = lines.slice(descIndex + 1).find((l) => l.trim().length > 0);
    const summary = exceptionLine ? `${description}: ${exceptionLine.trim()}` : description;
    return { summary, culpritMod: extractCulpritMod(lines) };
  } catch {
    return null;
  }
}
function readJvmNativeCrashSummary(dir, sinceMs) {
  try {
    const files = fs.readdirSync(dir).filter((f) => f.startsWith("hs_err_pid") && f.endsWith(".log")).map((f) => ({ f, mtime: fs.statSync(path.join(dir, f)).mtimeMs })).filter((x) => x.mtime >= sinceMs).sort((a, b) => b.mtime - a.mtime);
    if (files.length === 0) return null;
    const lines = fs.readFileSync(path.join(dir, files[0].f), "utf-8").split("\n");
    const reasonLine = lines.find((l) => l.startsWith("# ") && /SIG|EXCEPTION|fatal error/i.test(l));
    const frameIndex = lines.findIndex((l) => l.startsWith("# Problematic frame:"));
    const frameLine = frameIndex !== -1 ? lines[frameIndex + 1]?.trim() : void 0;
    const parts = [reasonLine?.replace(/^#\s*/, ""), frameLine].filter(Boolean);
    return parts.length > 0 ? parts.join(" - ") : null;
  } catch {
    return null;
  }
}
const FILE_TAMPERING_HINTS = ["getModsDir", "java.lang.module.", "AccessDeniedException", "FileSystemException"];
const LOADER_CLASS_HINTS = [
  "net.fabricmc.",
  "net/fabricmc/",
  "cpw.mods.",
  "cpw/mods/",
  "net.minecraftforge.",
  "net/minecraftforge/"
];
function extractFailingClassName(line) {
  const init = /Could not initialize class\s+([\w./$]+)/.exec(line);
  if (init) return init[1];
  const missing = /(?:NoClassDefFoundError|ClassNotFoundException):\s*([\w./$]+)/.exec(line);
  return missing ? missing[1] : null;
}
function detectLoaderClassMissing(lines) {
  return lines.some((l) => {
    const hasError = l.includes("ClassNotFoundException") || l.includes("NoClassDefFoundError");
    if (!hasError) return false;
    if (l.includes("KnotClient")) return true;
    const cls = extractFailingClassName(l);
    if (!cls) return false;
    const normalized = cls.replace(/\//g, ".");
    return LOADER_CLASS_HINTS.some((h) => normalized.startsWith(h.replace(/\//g, ".")));
  });
}
const MAX_AUTO_FIX_ATTEMPTS = 5;
async function tryAutoFixMissingMods(req, emit2, missingIds, missingClasspaths) {
  if (!req.loader) return;
  const modsDir = path.join(instanceDir(req.version, req.loader), "mods");
  fs.mkdirSync(modsDir, { recursive: true });
  const excluded = new Set(req.autoFixExcludedProjectIds ?? []);
  const newlyExcluded = /* @__PURE__ */ new Set();
  const installedThisRun = /* @__PURE__ */ new Set();
  async function installIfFound(label, found) {
    if (!found) {
      return {
        installed: false,
        retry: false,
        reason: `"${label}" nomli qo'shimcha modni avtomatik topib bo'lmadi. Uni Modlar bo'limidan qidirib o'rnating, yoki mod muallifining o'z sahifasidan (Modrinth/CurseForge) qo'lda yuklab, "mods" papkasiga joylashtiring.`
      };
    }
    if (installedThisRun.has(found.filename)) {
      return { installed: true, retry: false, reason: "" };
    }
    if (fs.existsSync(path.join(modsDir, found.filename))) {
      try {
        fs.unlinkSync(path.join(modsDir, found.filename));
      } catch {
      }
      newlyExcluded.add(found.projectId);
      return {
        installed: false,
        retry: true,
        reason: `"${found.name}" mos kelmadi (o'rnatilgan edi, lekin muammoni hal qilmadi) - boshqa nomzod izlanmoqda.`
      };
    }
    emit2({ type: "status", message: `O'rnatilmoqda: ${found.name}...` });
    try {
      const res = await fetch(found.url, { signal: AbortSignal.timeout(12e4) });
      if (!res.ok) {
        return { installed: false, retry: false, reason: `"${found.name}" yuklab bo'lmadi (server javobi: HTTP ${res.status}).` };
      }
      fs.writeFileSync(path.join(modsDir, found.filename), Buffer.from(await res.arrayBuffer()));
      installedThisRun.add(found.filename);
      return { installed: true, retry: false, reason: "" };
    } catch (err) {
      return {
        installed: false,
        retry: false,
        reason: `"${found.name}" yuklashda tarmoq xatosi yuz berdi: ${err instanceof Error ? err.message : String(err)}`
      };
    }
  }
  let anyInstalled = false;
  let anyRetry = false;
  const failReasons = [];
  for (const modId of missingIds) {
    const found = await findModByForgeId(modId, req.version, req.loader, excluded);
    const result = await installIfFound(modId, found);
    if (result.installed) anyInstalled = true;
    else if (result.retry) anyRetry = true;
    if (!result.installed) failReasons.push(result.reason);
  }
  for (const classPath of missingClasspaths) {
    const found = await findModByClassPath(classPath, req.version, req.loader, excluded);
    const result = await installIfFound(classPath.split(".").pop() ?? classPath, found);
    if (result.installed) anyInstalled = true;
    else if (result.retry) anyRetry = true;
    if (!result.installed) failReasons.push(result.reason);
  }
  if (anyInstalled || anyRetry) {
    emit2({
      type: "status",
      message: anyInstalled ? "Modlar o'rnatildi, o'yin qayta ishga tushirilmoqda..." : "Mos kelmagan fayl olib tashlandi, boshqa nomzod bilan qayta urinilmoqda..."
    });
    await launchGame(
      {
        ...req,
        autoFixAttempts: (req.autoFixAttempts ?? 0) + 1,
        autoFixExcludedProjectIds: [...excluded, ...newlyExcluded]
      },
      emit2
    );
  } else {
    emit2({ type: "launch-failed", title: "O'yin ishga tushmadi", items: failReasons });
    emit2({ type: "closed", code: null });
  }
}
async function tryFallbackLoaderVersion(req, emit2, brokenLoaderVersion, attempts) {
  if (!brokenLoaderVersion) return false;
  if (req.loader !== "fabric" && req.loader !== "quilt") return false;
  if (attempts >= MAX_AUTO_FIX_ATTEMPTS) return false;
  const excluded = /* @__PURE__ */ new Set([...req.autoFixExcludedLoaderVersions ?? [], brokenLoaderVersion]);
  try {
    await pickLoaderVersion(req.loader, req.version, excluded);
  } catch {
    return false;
  }
  try {
    fs.rmSync(path.join(gameDir(), "versions", `${req.loader}-loader-${brokenLoaderVersion}-${req.version}`), {
      recursive: true,
      force: true
    });
  } catch {
  }
  emit2({
    type: "autofixing",
    message: `"${brokenLoaderVersion}" nomli ${req.loader === "quilt" ? "Quilt" : "Fabric"} versiyasi ${req.version} bilan ishlamadi, muqobil versiya bilan qayta urinilmoqda...`,
    attempt: attempts + 1
  });
  await launchGame(
    {
      ...req,
      autoFixAttempts: attempts + 1,
      autoFixExcludedLoaderVersions: Array.from(excluded)
    },
    emit2
  );
  return true;
}
async function tryAutoFixLoaderCrash(req, emit2, attempts) {
  if (attempts >= MAX_AUTO_FIX_ATTEMPTS) return false;
  const root = gameDir();
  const mcVersion = req.version;
  removeCorruptedDownloads(root);
  if (attempts >= 1) {
    cleanupLoaderProfileOnKnotError(root, mcVersion);
    if (req.loader === "forge") {
      try {
        const versionsDir = path.join(root, "versions");
        if (fs.existsSync(versionsDir)) {
          for (const name of fs.readdirSync(versionsDir)) {
            if (name.toLowerCase().includes("forge") && name.includes(mcVersion)) {
              fs.rmSync(path.join(versionsDir, name), { recursive: true, force: true });
            }
          }
        }
      } catch {
      }
    }
  }
  if (attempts >= 2) {
    try {
      const versionDir = path.join(root, "versions", mcVersion);
      if (fs.existsSync(versionDir)) fs.rmSync(versionDir, { recursive: true, force: true });
    } catch {
    }
  }
  if (attempts >= 3) {
    try {
      const librariesDir = path.join(root, "libraries");
      if (fs.existsSync(librariesDir)) fs.rmSync(librariesDir, { recursive: true, force: true });
    } catch {
    }
  }
  const uxMessage = attempts === 0 ? "O'yin fayllari yangilanmoqda, biroz kuting..." : attempts === 1 ? "Loader qayta o'rnatilmoqda, biroz kuting..." : `O'yin butunlay qayta yuklanmoqda, biroz uzoqroq kutishga to'g'ri keladi (${attempts + 1}/${MAX_AUTO_FIX_ATTEMPTS})...`;
  emit2({
    type: "autofixing",
    message: uxMessage,
    attempt: attempts + 1
  });
  try {
    await launchGame({ ...req, autoFixAttempts: attempts + 1 }, emit2);
    return true;
  } catch (err) {
    emit2({
      type: "warning",
      message: `Qayta urinishda xato: ${err instanceof Error ? err.message : String(err)}`
    });
    return false;
  }
}
const EARLY_WINDOW_HINTS = ["Timed out trying to setup the Game Window", "Failed to initialize graphics window"];
function applyEarlyWindowPreference(instanceRoot) {
  if (!isEarlyWindowDisabled()) return;
  const file2 = path.join(instanceRoot, "config", "fml.toml");
  try {
    fs.mkdirSync(path.dirname(file2), { recursive: true });
    if (!fs.existsSync(file2)) {
      fs.writeFileSync(file2, "earlyWindowControl = false\n", "utf-8");
      return;
    }
    const text = fs.readFileSync(file2, "utf-8");
    if (/^\s*earlyWindowControl\s*=\s*false\s*$/m.test(text)) return;
    const next = /^\s*earlyWindowControl\s*=/m.test(text) ? text.replace(/^(\s*)earlyWindowControl\s*=.*$/m, "$1earlyWindowControl = false") : `${text.trimEnd()}
earlyWindowControl = false
`;
    fs.writeFileSync(file2, next, "utf-8");
  } catch {
  }
}
function hadEarlyWindowFailure(instanceRoot, lines, sinceMs) {
  if (lines.some((l) => EARLY_WINDOW_HINTS.some((h) => l.includes(h)))) return true;
  for (const name of ["latest.log", "debug.log"]) {
    const file2 = path.join(instanceRoot, "logs", name);
    try {
      if (fs.statSync(file2).mtimeMs < sinceMs) continue;
      const text = fs.readFileSync(file2, "utf-8");
      const tail = text.length > 4e5 ? text.slice(-4e5) : text;
      if (EARLY_WINDOW_HINTS.some((h) => tail.includes(h))) return true;
    } catch {
    }
  }
  return false;
}
class LaunchAdviceError extends Error {
  constructor(message, advice) {
    super(message);
    this.advice = advice;
    this.name = "LaunchAdviceError";
  }
}
function readRecentLogText(instanceRoot, sinceMs) {
  let text = "";
  for (const name of ["latest.log", "debug.log"]) {
    const file2 = path.join(instanceRoot, "logs", name);
    try {
      if (fs.statSync(file2).mtimeMs < sinceMs) continue;
      const content = fs.readFileSync(file2, "utf-8");
      text += `
${content.length > 4e5 ? content.slice(-4e5) : content}`;
    } catch {
    }
  }
  return text;
}
function mojangJvmArgs(json) {
  const raw = json.arguments?.jvm;
  if (!Array.isArray(raw)) return [];
  const flat = [];
  for (const entry2 of raw) {
    if (typeof entry2 === "string") {
      flat.push(entry2);
    } else if (entry2 && typeof entry2 === "object") {
      const e = entry2;
      if (!rulesAllow(e.rules)) continue;
      if (Array.isArray(e.value)) flat.push(...e.value);
      else if (typeof e.value === "string") flat.push(e.value);
    }
  }
  const out = [];
  for (let i = 0; i < flat.length; i++) {
    const arg = flat[i];
    if (arg === "-cp" || arg === "-classpath") {
      i++;
      continue;
    }
    if (arg.includes("${")) continue;
    if (arg.startsWith("-XX:HeapDumpPath=")) continue;
    out.push(arg);
  }
  return out;
}
function findIncompatibleMod(text) {
  const m = /Failed to read (?:classTweaker|accessWidener) file from mod ([A-Za-z0-9_.-]+)/i.exec(text);
  return m ? m[1] : null;
}
function quarantineMod(instanceRoot, modId) {
  const modsDir = path.join(instanceRoot, "mods");
  let files;
  try {
    files = fs.readdirSync(modsDir).filter((f) => f.toLowerCase().endsWith(".jar"));
  } catch {
    return null;
  }
  for (const file2 of files) {
    let id = null;
    try {
      const zip = new AdmZip(path.join(modsDir, file2));
      const entry2 = zip.getEntry("fabric.mod.json") ?? zip.getEntry("quilt.mod.json");
      if (entry2) {
        const json = JSON.parse(entry2.getData().toString("utf-8"));
        id = json.id ?? json.quilt_loader?.id ?? null;
      }
    } catch {
    }
    if (id === modId || id === null && file2.toLowerCase().startsWith(modId.toLowerCase())) {
      return moveModToDisabled(instanceRoot, file2);
    }
  }
  return null;
}
const CORE_BROKEN_PATTERNS = [
  /Could not find or load main class (net\.minecraft\.client\.main\.Main|net\.minecraft\.launchwrapper\.Launch|io\.github\.zekerzhayard\.forgewrapper\.installer\.Main|cpw\.mods\.bootstraplauncher\.BootstrapLauncher)/,
  /Error opening zip file or JAR manifest missing/,
  /Invalid or corrupt jarfile/,
  /zip END header not found|invalid (LOC|CEN) header/,
  // Vanilla'ning O'ZI (masalan `SharedConstants`/`class_155` kabi) statik ishga tushishda
  // qulasa - bu deyarli har doim asosiy o'yin kutubxonalaridan biri (masalan Fabric'ning
  // vanilla resurslarini o'z ichiga olgan `client-extra` jar'i) BUZILGAN/YARIM YUKLANGAN
  // degani, mod muammosi EMAS. TASDIQLANGAN: haqiqiy foydalanuvchi crash-hisobotida
  // "NoClassDefFoundError: Could not initialize class net.minecraft.class_155" ->
  // "ExceptionInInitializerError" -> "class_2561.method_43471" (til/matn yuklash) zanjiri
  // ko'rilgan - `removeCorruptedDownloads` bunday NOZERO (0 baytdan farqli, faqat qisman
  // buzilgan) kutubxona fayllarini TUTMAYDI, shu sabab bu holat alohida bosqich sifatida
  // `tryAutoFixLoaderCrash`da butun `libraries/` papkasini qayta yuklashga majburlaydi.
  /Could not initialize class net\.minecraft\./
];
function isCoreFilesBroken(lines) {
  const text = lines.join("\n");
  return CORE_BROKEN_PATTERNS.some((re) => re.test(text));
}
function announceRemovedMods(emit2, removed) {
  for (const r of removed) {
    emit2({ type: "warning", message: `"${r.file}" ishlamagani uchun o'chirib qo'yildi (${r.reason}).` });
  }
}
let preparing = null;
async function launchGame(req, emit2) {
  if (req.prepareOnly) {
    if (current$1) return;
    if (preparing) return preparing;
    const run2 = launchGameCore(req, emit2).finally(() => {
      if (preparing === run2) preparing = null;
    });
    preparing = run2;
    return run2;
  }
  if (preparing) await preparing.catch(() => void 0);
  return launchGameCore(req, emit2);
}
async function launchGameCore(req, emit2) {
  if (current$1) throw new Error("O'yin allaqachon ishga tushirilgan");
  if (!isValidNick(req.profile.nick)) {
    throw new Error("Minecraft nick noto'g'ri (3-16 belgi, faqat A-Z, 0-9, _)");
  }
  const launcher = new minecraftLauncherCore.Client();
  const auth = buildOfflineAuth(req.profile.nick, req.profile.uuid);
  const launchStartMs = Date.now() - 5e3;
  const PHASE_WEIGHT = { prep: 0.15, libs: 0.2, natives: 0.05, assets: 0.6 };
  const phaseFraction = { prep: 0, libs: 0, natives: 0, assets: 0 };
  const prepTasks = /* @__PURE__ */ new Map();
  let lastUnifiedPercent = 0;
  let lastProgressEmit = 0;
  function emitUnifiedProgress(force = false) {
    const now = Date.now();
    if (!force && now - lastProgressEmit < 100) return;
    lastProgressEmit = now;
    let sum = 0;
    for (const phase of Object.keys(PHASE_WEIGHT)) sum += PHASE_WEIGHT[phase] * phaseFraction[phase];
    const prepMax = BOOT_START_PERCENT - 1;
    const percent = Math.max(lastUnifiedPercent, Math.min(prepMax, Math.round(sum * prepMax)));
    lastUnifiedPercent = percent;
    emit2({ type: "progress", task: "download", current: percent, total: 100, percent });
  }
  function setPhase(phase, current2, total) {
    if (total <= 0) return;
    phaseFraction[phase] = Math.max(phaseFraction[phase], Math.min(1, current2 / total));
    emitUnifiedProgress(current2 >= total);
  }
  function setPrepTask(name, current2, total) {
    prepTasks.set(name, { current: current2, total });
    let c = 0;
    let t = 0;
    for (const v of prepTasks.values()) {
      c += v.current;
      t += v.total;
    }
    setPhase("prep", c, t);
  }
  let customVersion = req.customVersion;
  let versionJsonOverride;
  let forgeInstallerPath;
  let javaPath = req.javaPath;
  let pickedLoaderVersion;
  const fpsBoost = req.fpsBoost !== false;
  const instRoot2 = ensureInstanceDirs(req.version, req.loader);
  const runtimeLoader = req.cosmeticsRuntimeDisabled ? null : cosmeticsRuntimeLoader(req.version, req.loader);
  const bootLoader = req.loader ?? runtimeLoader;
  let modRequirements = null;
  if (bootLoader === "fabric" || bootLoader === "quilt") {
    try {
      modRequirements = readLoaderRequirements(instRoot2, bootLoader);
    } catch {
    }
  }
  const cosmeticsVariant = cosmeticsModVariant(bootLoader);
  applyEarlyWindowPreference(instRoot2);
  const migration = migrateRootToInstance();
  if (migration.migrated) {
    emit2({
      type: "status",
      message: `Modlar "${migration.owner}" versiyasining shaxsiy papkasiga ko'chirildi (${migration.itemCount} ta element)...`
    });
  }
  if (fpsBoost) {
    try {
      writeDefaultVideoOptions(instRoot2);
    } catch {
    }
    applyGpuPreference();
  }
  try {
    const capeUrl = req.capeUrl || req.cosmetics?.capeUrl || (req.cosmetics?.slots?.cape ? `https://hhpnhwfzovbttorprudl.supabase.co/storage/v1/object/public/neoterra-skins/capes/${req.cosmetics.slots.cape}.png` : null);
    await cacheLocalSkin(instRoot2, req.profile.nick, req.skinUrl, capeUrl);
  } catch {
  }
  try {
    writeCustomSkinLoaderConfig(instRoot2);
  } catch (err) {
    emit2({
      type: "warning",
      message: `Skin sozlamasi yozilmadi, o'yin standart skin bilan ochiladi: ${err instanceof Error ? err.message : String(err)}`
    });
  }
  try {
    writeCompanionConfig(instRoot2, req.companionId);
  } catch (err) {
    emit2({
      type: "warning",
      message: `Kompanion sozlamasi yozilmadi, o'yinda kompanion ko'rinmasligi mumkin: ${err instanceof Error ? err.message : String(err)}`
    });
  }
  const COSMETICS_TOKEN_BUDGET_MS = 1e4;
  const cosmeticsTask = cosmeticsVariant ? (async () => {
    try {
      const build = await resolveSystemModBuild(cosmeticsVariant, req.version);
      if (!build) {
        removeSystemMods(instRoot2);
        return;
      }
      let game = null;
      const sessionToken = req.cosmetics?.sessionToken;
      if (sessionToken && !req.prepareOnly) {
        const deadline = Date.now() + COSMETICS_TOKEN_BUDGET_MS;
        const budget = new Promise((resolve) => setTimeout(() => resolve(null), COSMETICS_TOKEN_BUDGET_MS));
        for (let attempt = 0; attempt < 3 && !game && Date.now() < deadline; attempt++) {
          game = await Promise.race([getCosmeticGameToken(sessionToken).catch(() => null), budget]);
          if (!game && Date.now() < deadline) await new Promise((resolve) => setTimeout(resolve, 600 * (attempt + 1)));
        }
      }
      writeCosmeticsConfig(instRoot2, req.profile.nick, req.cosmetics, game?.token ?? null);
      void refreshCatalogSnapshot(instRoot2);
      const installed2 = await installSystemMod(instRoot2, build);
      if (installed2 === "locked") {
        emit2({ type: "log", line: "[NeoTerra]: tizim modi fayli band (o'yin ochiq) - yangilash keyingi ishga tushirishga qoldirildi" });
      } else if (installed2 === "failed" || installed2 === "missing") {
        emit2({ type: "log", line: "[NeoTerra]: kosmetika modi o'rnatilmadi - o'yin kosmetikasiz ochiladi" });
      }
    } catch (err) {
      emit2({
        type: "warning",
        message: `Kosmetika sozlamasi yozilmadi, o'yinda kosmetika ko'rinmasligi mumkin: ${err instanceof Error ? err.message : String(err)}`
      });
    }
  })() : Promise.resolve();
  try {
    writeUiToken(instRoot2, req.uiToken);
  } catch (err) {
    emit2({
      type: "warning",
      message: `UI tokeni yozilmadi, o'yin standart menyu bilan ochiladi: ${err instanceof Error ? err.message : String(err)}`
    });
  }
  if (req.loader && await ensureUiMod(instRoot2, (message) => emit2({ type: "status", message }))) {
    await ensureDefaultTheme((message) => emit2({ type: "status", message }));
    syncThemesToInstance(instRoot2);
  }
  if (!corruptedScanDone || (req.autoFixAttempts ?? 0) > 0) {
    corruptedScanDone = true;
    const corruptedCount = removeCorruptedDownloads(gameDir());
    if (corruptedCount > 0) {
      emit2({ type: "log", line: `[NeoTerra]: ${corruptedCount} ta buzilgan kutubxona fayli tozalandi, qayta yuklanadi` });
    }
  }
  emit2({ type: "status", message: "Fayllar tayyorlanmoqda..." });
  const downloadTasks = [];
  const sw = { reason: null, mesaDir: null };
  downloadTasks.push(
    (async () => {
      const gpus = process.platform === "win32" ? await Promise.race([
        detectGpus().catch(() => []),
        new Promise((resolve) => setTimeout(() => resolve([]), 4e3))
      ]) : [];
      sw.reason = decideSoftwareGl(gpus, req.softwareGl === true);
      if (!sw.reason || process.platform !== "win32") return;
      let statusSent = false;
      try {
        sw.mesaDir = await ensureMesa((received, total) => {
          if (!statusSent) {
            statusSent = true;
            emit2({ type: "status", message: "Drayversiz grafika rejimi yuklanmoqda (faqat birinchi marta)..." });
          }
          setPrepTask("mesa", received, total);
        });
      } catch (err) {
        sw.reason = null;
        emit2({ type: "log", line: `[NeoTerra]: dasturiy grafika (Mesa) yuklanmadi: ${err instanceof Error ? err.message : String(err)}` });
      }
    })()
  );
  if (bootLoader === "fabric" || bootLoader === "quilt") {
    downloadTasks.push(
      ensureLoaderProfile(
        bootLoader,
        gameDir(),
        req.version,
        new Set(req.autoFixExcludedLoaderVersions ?? []),
        modRequirements?.loader.map((r) => r.range) ?? []
      ).then((r) => {
        customVersion = r.customId;
        versionJsonOverride = r.versionJsonPath;
        pickedLoaderVersion = r.loaderVersion;
      })
    );
  } else if (req.loader === "forge") {
    downloadTasks.push(
      ensureForge(gameDir(), req.version, (received, total) => setPrepTask("forge", received, total)).then(
        async (setup) => {
          if (setup.kind === "installer") {
            forgeInstallerPath = setup.installerPath;
            await ensureForgeWrapperJar(gameDir());
          } else {
            customVersion = setup.customId;
            versionJsonOverride = setup.versionJsonPath;
          }
        }
      )
    );
  }
  if (bootLoader) {
    downloadTasks.push(
      // Skin modi NUSXA papkasidagi mods'ga tushadi - har versiya o'zining CSL nusxasiga ega.
      ensureCustomSkinLoaderMod(instRoot2, req.version, bootLoader).then((line) => emit2({ type: "log", line: `[NeoTerra]: ${line}` })).catch((err) => {
        emit2({
          type: "warning",
          message: `Skin modi o'rnatilmadi, o'yinda skinlar ko'rinmasligi mumkin: ${err instanceof Error ? err.message : String(err)}`
        });
      })
    );
  } else {
    emit2({ type: "log", line: `[NeoTerra]: vanilla ${req.version} - skin modi qo'yib bo'lmaydi, o'yinda MCModHub skinlari ko'rinmaydi` });
  }
  let skinAgentArgs = [];
  if (!req.skinAgentDisabled) {
    downloadTasks.push(
      prepareAuthlibInjector(gameDir()).then((setup) => {
        skinAgentArgs = setup.jvmArgs;
        emit2({ type: "log", line: `[NeoTerra]: ${setup.log}` });
      }).catch((err) => {
        emit2({
          type: "log",
          line: `[NeoTerra]: skin agenti ulanmadi, o'yin usiz ochiladi: ${err instanceof Error ? err.message : String(err)}`
        });
      })
    );
  }
  let ipv4OnlyArgs = [];
  downloadTasks.push(
    isIpv6Broken().then((broken) => {
      if (!broken || !/forge/i.test(req.loader ?? "")) return;
      ipv4OnlyArgs = ["-Djava.net.preferIPv4Stack=true"];
      emit2({ type: "log", line: "[NeoTerra]: IPv6 yo'li ishlamayapti - o'yin IPv4 orqali ulanadi" });
    })
  );
  if (fpsBoost && req.loader) {
    downloadTasks.push(
      // FPS modlari ham NUSXA papkasidagi mods'ga tushadi - versiyaga xos to'plamda.
      ensurePerformanceMods(instRoot2, req.version, req.loader, emit2).catch((err) => {
        emit2({
          type: "warning",
          message: `FPS modlari o'rnatilmadi: ${err instanceof Error ? err.message : String(err)}`
        });
      })
    );
  }
  let requiredMajorResolved;
  if (!javaPath) {
    downloadTasks.push(
      (async () => {
        const baseMajor = await getRequiredJavaMajor(req.version, gameDir()) ?? requiredJavaMajor(req.version);
        const requiredMajor = javaMajorForRequirements(baseMajor, modRequirements?.java ?? []);
        if (requiredMajor !== baseMajor) {
          const by = (modRequirements?.java ?? []).map((r) => `${r.by} (${r.range})`).slice(0, 3).join(", ");
          emit2({ type: "log", line: `[NeoTerra]: modlar Java ${requiredMajor} talab qiladi: ${by}` });
        }
        requiredMajorResolved = requiredMajor;
        if (!needsIntelJavaOnMac(req.version)) {
          const preferred = await resolvePreferredJava(requiredMajor);
          if (preferred && "path" in preferred) {
            javaPath = preferred.path;
            emit2({ type: "log", line: `[NeoTerra]: Sozlamalarda tanlangan Java ishlatilmoqda (${preferred.path})` });
            return;
          }
          if (preferred) emit2({ type: "warning", message: preferred.skipped });
        }
        const forceX64 = needsIntelJavaOnMac(req.version);
        const own = await findInstalledJavaRuntime(requiredMajor, gameDir(), { forceX64 });
        if (own) {
          javaPath = own;
          return;
        }
        if (!forceX64) {
          const found = await findJavaExecutable(requiredMajor);
          if (found) {
            javaPath = found;
            emit2({ type: "log", line: `[NeoTerra]: kompyuterdagi tayyor Java ${requiredMajor} (64-bit) ishlatiladi: ${found}` });
            return;
          }
        }
        let javaStatusSent = false;
        try {
          javaPath = await ensureJavaRuntime(requiredMajor, gameDir(), {
            forceX64,
            onProgress: (received, total) => {
              if (!javaStatusSent) {
                javaStatusSent = true;
                emit2({ type: "status", message: `Java ${requiredMajor} yuklanmoqda (faqat birinchi marta)...` });
              }
              setPrepTask("java", received, total);
            }
          });
        } catch (err) {
          const reason = err instanceof Error ? err.message : String(err);
          throw new LaunchAdviceError(
            `Bu o'yin Java ${requiredMajor} talab qiladi, lekin uni avtomatik yuklab bo'lmadi (${reason}).`,
            javaAdvice(requiredMajor, "Launcher uni o'zi yuklashga urindi, lekin bo'lmadi.", [reason], req.version)
          );
        }
      })()
    );
  }
  await Promise.all([...downloadTasks, cosmeticsTask]);
  setPhase("prep", 1, 1);
  let softwareJava = null;
  if (sw.reason) {
    try {
      if (process.platform === "win32") {
        if (sw.mesaDir && javaPath) softwareJava = await prepareSoftwareJava(javaPath, sw.mesaDir);
      } else {
        softwareJava = javaPath ?? "java";
      }
    } catch (err) {
      emit2({ type: "log", line: `[NeoTerra]: dasturiy grafika tayyorlanmadi: ${err instanceof Error ? err.message : String(err)}` });
    }
    if (softwareJava) {
      if (process.platform === "win32") javaPath = softwareJava;
      emit2({ type: "log", line: `[NeoTerra]: dasturiy grafika rejimi (${sw.reason}) - ${softwareJava}` });
      emit2({
        type: "warning",
        message: sw.reason === "no-driver" ? "Videokarta drayveri o'rnatilmagan - o'yin drayversiz (dasturiy grafika) rejimida ochilmoqda: protsessorda chiziladi, sekinroq bo'ladi. Normal tezlik uchun videokarta drayverini o'rnating." : "Videokarta drayveri o'yin grafikasini bermayapti - o'yin drayversiz (dasturiy grafika) rejimida ochilmoqda, sekinroq bo'ladi. Normal tezlik uchun videokarta drayverini yangilang."
      });
    }
  }
  applySoftwareGlEnv(softwareJava);
  if (req.loader === "forge" || req.loader === "fabric" || req.loader === "quilt") {
    emit2({ type: "status", message: "Modlar tekshirilmoqda..." });
    try {
      const staged = stageModsForLaunch(instRoot2, req.version, req.loader);
      if (staged.excluded.length > 0) {
        const names = staged.excluded.map((x) => `"${x.file}" (${x.reason})`);
        emit2({
          type: "warning",
          message: `${staged.excluded.length} ta mod bu versiyaga mos emas va o'yinga kiritilmadi: ${names.slice(0, 3).join(", ")}${names.length > 3 ? ` va yana ${names.length - 3} ta` : ""}. Ular "mods-incompatible" papkasida saqlandi.`
        });
        for (const x of staged.excluded) emit2({ type: "log", line: `[NeoTerra] ${x.file}: ${x.reason} - mods-incompatible papkasiga olindi` });
      }
      for (const f of staged.restored) emit2({ type: "log", line: `[NeoTerra] ${f} endi mos - mods/ga qaytarildi` });
    } catch (err) {
      emit2({ type: "log", line: `[NeoTerra]: modlarni saralab bo'lmadi: ${err instanceof Error ? err.message : String(err)}` });
    }
    try {
      const deps = await ensureModDependencies({
        instRoot: instRoot2,
        gameVersion: req.version,
        loader: req.loader,
        onStatus: (message) => emit2({ type: "status", message }),
        onLog: (line) => emit2({ type: "log", line })
      });
      announceRemovedMods(emit2, deps.quarantined);
    } catch (err) {
      emit2({ type: "log", line: `[NeoTerra]: mod bog'liqliklarini tekshirib bo'lmadi: ${err instanceof Error ? err.message : String(err)}` });
    }
  }
  let gameJson = null;
  try {
    gameJson = versionJsonOverride ? JSON.parse(fs.readFileSync(versionJsonOverride, "utf-8")) : await getVanillaVersionJsonOrCached(gameDir(), req.version);
  } catch {
  }
  if (gameJson) {
    emit2({ type: "status", message: "Fayllar tekshirilmoqda..." });
    const jarId = customVersion ?? req.version;
    const result = await ensureGameFiles({
      root: gameDir(),
      versionJson: gameJson,
      jarId,
      assetIndexName: jarId,
      // Qulashdan keyingi qayta urinishda kutubxonalarning SHA-1'i ham tekshiriladi.
      deep: (req.autoFixAttempts ?? 0) > 0,
      onProgress: (phase, current2, total) => {
        if (phase === "libraries") setPhase("libs", current2, total);
        else if (phase === "assets") setPhase("assets", current2, total);
      }
    }).catch((err) => ({
      fixed: 0,
      failed: [err instanceof Error ? err.message : String(err)],
      verified: [],
      assetsVerifiedIndex: void 0
    }));
    trustVerifiedFiles(result.verified);
    if (result.assetsVerifiedIndex) trustVerifiedAssetIndex(result.assetsVerifiedIndex);
    if (result.fixed > 0) emit2({ type: "log", line: `[NeoTerra]: ${result.fixed} ta fayl yuklandi/tuzatildi` });
    if (result.failed.length > 0) {
      emit2({
        type: "log",
        line: `[NeoTerra]: ${result.failed.length} ta faylni yuklab bo'lmadi: ${result.failed.slice(0, 3).join("; ")}`
      });
    }
  }
  let nativesDir = null;
  if (gameJson) {
    const natives = await ensureNatives({
      root: gameDir(),
      versionJson: gameJson,
      dirName: req.version,
      deep: (req.autoFixAttempts ?? 0) > 0
    }).catch((err) => {
      emit2({ type: "log", line: `[NeoTerra]: natives tayyorlanmadi: ${err instanceof Error ? err.message : String(err)}` });
      return null;
    });
    if (natives) {
      if (natives.fixed > 0) emit2({ type: "log", line: `[NeoTerra]: ${natives.fixed} ta natives fayli tiklandi (${natives.dir})` });
      if (natives.failed.length > 0) emit2({ type: "log", line: `[NeoTerra]: natives xatosi: ${natives.failed.slice(0, 3).join("; ")}` });
      else {
        nativesDir = natives.dir;
        trustPreparedNatives(natives.dir);
      }
    }
  }
  let vanillaJson = versionJsonOverride ? null : gameJson;
  if (!vanillaJson) {
    try {
      vanillaJson = await getVanillaVersionJsonOrCached(gameDir(), req.version);
    } catch {
    }
  }
  const mojangArgs = vanillaJson ? mojangJvmArgs(vanillaJson) : [];
  const log4jConfig = await ensureLog4jConfig(instRoot2, customVersion ?? req.version);
  if (req.prepareOnly) {
    emit2({ type: "status", message: "O'yin tayyor - lider dunyosi kutilmoqda" });
    return;
  }
  const heapMaxMb = safeHeapMaxMb(req.ramMax);
  const heapMinMb = req.ramMin ? Math.min(heapMaxMb, Math.round(req.ramMin * 1024)) : initialHeapMb(heapMaxMb);
  if (heapMaxMb < req.ramMax * 1024) {
    emit2({ type: "log", line: `[NeoTerra]: RAM ${req.ramMax} GB -> ${heapMaxMb} MB (tizimga kamida 2.5-3 GB qoldirildi)` });
  }
  const heapGb = heapMaxMb / 1024;
  const gcArgs = getOptimizationSettings().smartJavaMemory ? smartJavaGcArgs(req.version, requiredMajorResolved ?? requiredJavaMajor(req.version), heapGb, fpsBoost) : fpsBoost ? performanceJvmArgs(heapGb) : [];
  if (fpsBoost && javaPath && !softwareJava) void preferDiscreteGpuForJava(javaPath).catch(() => void 0);
  const lanMaxPlayers = req.autoOpenLan ? sanitizeLanMaxPlayers(req.maxPlayers) : null;
  const maxPlayersAgent = lanMaxPlayers !== null ? ensureMaxPlayersAgent(instanceDir(req.version, req.loader)) : null;
  const opts = {
    authorization: auth,
    root: gameDir(),
    version: {
      number: req.version,
      type: "release",
      ...customVersion ? { custom: customVersion } : {}
    },
    // MB (son) - MCLC `-Xmx<son>M` qiladi. -Xms = -Xmx/2: butun heap boshidanoq band qilinmaydi (kuchsiz kompyuterda svop),
    // lekin dunyo yuklangandagi odatiy hajm darhol bor - o'yin o'rtasida heap qayta-qayta kengaymaydi.
    memory: {
      max: heapMaxMb,
      min: heapMinMb
    },
    ...javaPath ? { javaPath } : {},
    ...forgeInstallerPath ? { forge: forgeInstallerPath } : {},
    // JVM bayroqlari. Windows'dagi birinchisi - "Unable to establish loopback connection"
    // xatosining tasdiqlangan yechimi (yuqoridagi unixSocketTmpDir() izohiga qarang),
    // qolganlari esa FPS barqarorligi uchun (`services/performance.ts`). MCLC bularni O'Z
    // standart bayroqlaridan KEYIN qo'shadi - ya'ni bir xil bayroq bo'lsa, bizniki ustun
    // keladi (HotSpot'da oxirgi qiymat kuchga kiradi).
    customArgs: [
      ...mojangArgs,
      ...process.platform === "win32" ? [`-Djdk.net.unixdomain.tmpdir=${unixSocketTmpDir()}`] : [],
      // Guruh lideri: dunyoni avtomatik LAN uchun ochish (Auto LAN modi shu bayroqni kutadi).
      ...req.autoOpenLan ? [AUTO_LAN_PROPERTY] : [],
      // Katta guruh: Auto LAN modi LAN serverining 8 kishilik chegarasini ko'taradi (faqat avtomatik LAN ochilganda).
      ...lanMaxPlayers !== null ? [`${AUTO_LAN_MAXPLAYERS_PROPERTY}${lanMaxPlayers}`] : [],
      // 26.x: chegara metodda (`IntegratedServer.getMaxPlayers()`), reflection yetmaydi - agent sinf yuklanganda o'zgartiradi.
      ...lanMaxPlayers !== null && maxPlayersAgent ? [`-javaagent:${maxPlayersAgent}=${lanMaxPlayers}`] : [],
      ...ipv4OnlyArgs,
      ...gcArgs,
      ...needsServicesHostOverride(req.version) ? [OFFLINE_SERVICES_HOST_ARG] : [],
      ...skinAgentArgs,
      ...softwareJava ? softwareGlJvmArgs(softwareJava) : [],
      // LWJGL (2 va 3) bu yo'lni `java.library.path`dan OLDIN qidiradi - MCLC qanday yo'l bersa ham natives topiladi.
      ...nativesDir ? [`-Dorg.lwjgl.librarypath=${nativesDir}`] : []
    ],
    // 26.x dasturiy rejimda: faqat OpenGL (Mesa) - drayversiz Vulkan sinalib yiqilmasin.
    ...softwareJava && softwareGlGameArgs(req.version).length > 0 ? { customLaunchArgs: softwareGlGameArgs(req.version) } : {},
    // To'g'ridan-to'g'ri serverga ulanish (1.20+ quickPlay, eski versiyalar uchun server/port)
    ...req.server ? {
      quickPlay: {
        type: "multiplayer",
        identifier: `${cleanServerHost(req.server.host)}:${req.server.port}`
      },
      server: { host: cleanServerHost(req.server.host), port: String(req.server.port) }
    } : req.singleplayerWorld ? { quickPlay: { type: "singleplayer", identifier: req.singleplayerWorld } } : {},
    // MCLC ichki `request` pool'ining STANDART qiymati atigi maxSockets: 2 (handler.js) -
    // ya'ni birinchi o'rnatishda ~3500 ta assets fayli va ~60 ta kutubxona BIR VAQTDA
    // FAQAT IKKITADAN yuklanadi. Har bir fayl kichik (o'rtacha ~10 KB) bo'lgani uchun vaqtning
    // deyarli hammasi TCP/TLS qo'l berishga ketadi, kanal kengligiga emas - shu sabab tez
    // internetda ham birinchi yuklash 15-30 daqiqagacha cho'zilardi ("juda sekin" shikoyati
    // aynan shundan). 32 ta parallel ulanish (boshqa launcher'lar - TLauncher/SKLauncher -
    // ishlatadigan diapazon) bilan bu o'nlab marta tezlashadi; Mojang CDN'i (resources.
    // download.minecraft.net) bu darajani muammosiz qabul qiladi.
    overrides: {
      maxSockets: 32,
      // NUSXA (instance) tuzilmasi - mods/saves/config/options.txt/screenshots faqat SHU
      // versiya+loader nusxasida yashaydi. `libraries/versions/assets` shared bo'lib qoladi
      // (`root` orqali topiladi). Bu MultiMC/Prism/CurseForge/Modrinth naqshi.
      //   - `gameDirectory` - MC standarti `--gameDir` argumenti orqali; saves, screenshots,
      //     resourcepacks va h.k. shu yerdan o'qiladi/yoziladi.
      //   - `cwd` - Java jarayoni CWD'si; Forge/Fabric o'z `mods/` papkasini CWD'dan qidiradi
      //     (aynan shu sabab ilgari `mods/` ildizda edi va versiyalar aralashib qulab tushardi).
      gameDirectory: instRoot2,
      cwd: instRoot2,
      ...versionJsonOverride ? { versionJson: versionJsonOverride } : {},
      ...nativesDir ? { natives: nativesDir } : {},
      ...log4jConfig ? { logj4ConfigurationFile: log4jConfig } : {}
    }
  };
  const recentDataLines = [];
  let reachedGame = false;
  let bootTracker = null;
  let bootEarly = [];
  let gameWindowUp = false;
  let liveGpuFailureHandled = false;
  launcher.on("debug", (line) => {
    console.log("[MCLC debug]", line);
    emit2({ type: "log", line: String(line) });
  });
  launcher.on("data", (line) => {
    console.log("[MCLC data]", line);
    if (!gameWindowUp) emit2({ type: "log", line: String(line) });
    if (bootTracker) bootTracker.onOutput(String(line));
    else bootEarly?.push(String(line));
    for (const part of String(line).split("\n")) {
      const trimmed = part.trim();
      if (!trimmed) continue;
      recentDataLines.push(trimmed);
      if (recentDataLines.length > 20) recentDataLines.shift();
      if (!reachedGame && trimmed.includes("Sound engine started")) reachedGame = true;
      if (!liveGpuFailureHandled && !softwareJava && !reachedGame && softwareGlSupported() && hasGpuDriverFailure(trimmed)) {
        liveGpuFailureHandled = true;
        emit2({ type: "log", line: "[NeoTerra]: videokarta drayveri OpenGL xatosi aniqlandi - jarayon to'xtatilmoqda..." });
        current$1?.child?.kill();
        emit2({ type: "launch-failed", ...softwareGlFixAdvice() });
        emit2({ type: "closed", code: null });
      }
    }
  });
  launcher.on("progress", (e) => {
    if (e.type === "assets") setPhase("assets", e.task, e.total);
    else if (e.type === "natives") setPhase("natives", e.task, e.total);
    else if (e.type === "classes") setPhase("libs", e.task, e.total);
  });
  const onGameClosed = async (code) => {
    console.log("[MCLC close]", code);
    current$1 = null;
    bootTracker?.stop();
    bootTracker = null;
    bootEarly = null;
    if (liveGpuFailureHandled) return;
    const attempts = req.autoFixAttempts ?? 0;
    const crashed = code !== 0 && code !== null;
    const fullText = crashed ? `${recentDataLines.join("\n")}
${readRecentLogText(instRoot2, launchStartMs)}` : "";
    if (crashed && !softwareJava && attempts < MAX_AUTO_FIX_ATTEMPTS && softwareGlSupported() && hasGpuDriverFailure(fullText, reachedGame)) {
      emit2({
        type: "autofixing",
        message: "Videokarta drayveri o'yin grafikasini bermadi - o'yin drayversiz (dasturiy grafika) rejimida qayta ochilmoqda...",
        attempt: attempts + 1
      });
      let mesaReady2 = process.platform !== "win32";
      if (!mesaReady2) {
        let lastPct = -5;
        try {
          await ensureMesa((received, total) => {
            const pct = total > 0 ? Math.floor(received / total * 100) : 0;
            if (pct >= lastPct + 5) {
              lastPct = pct;
              emit2({ type: "status", message: `Drayversiz grafika rejimi yuklanmoqda... ${pct}%` });
            }
          });
          mesaReady2 = true;
        } catch (err) {
          emit2({ type: "log", line: `[NeoTerra]: dasturiy grafika (Mesa) yuklanmadi: ${err instanceof Error ? err.message : String(err)}` });
        }
      }
      if (mesaReady2) {
        rememberSoftwareGl(await detectGpus().catch(() => []));
        void launchGame({ ...req, softwareGl: true, autoFixAttempts: attempts + 1 }, emit2).catch((err) => {
          emit2({
            type: "launch-failed",
            title: "O'yin ishga tushmadi",
            items: [err instanceof Error ? err.message : String(err)]
          });
          emit2({ type: "closed", code });
        });
        return;
      }
    }
    if (crashed && skinAgentArgs.length > 0 && !reachedGame && /\[authlib-injector\] \[(?:ERROR|SEVERE)\]|moe\.yushi\.authlibinjector/.test(fullText)) {
      emit2({ type: "log", line: `[NeoTerra]: skin agenti bilan o'yin ochilmadi (kod ${code}) - agentsiz qayta ochilmoqda` });
      emit2({ type: "status", message: "O'yin skin agentisiz qayta ochilmoqda..." });
      void launchGame({ ...req, skinAgentDisabled: true, autoFixAttempts: attempts + 1 }, emit2).catch((err) => {
        emit2({
          type: "launch-failed",
          title: "O'yin ishga tushmadi",
          items: [err instanceof Error ? err.message : String(err)]
        });
        emit2({ type: "closed", code });
      });
      return;
    }
    if (crashed && runtimeLoader && !reachedGame) {
      emit2({ type: "log", line: `[NeoTerra]: kosmetika muhiti (${runtimeLoader}) bilan o'yin ochilmadi (kod ${code}) - oddiy vanilla bilan qayta ochilmoqda` });
      emit2({ type: "status", message: "Kosmetika muhiti ishga tushmadi - o'yin oddiy vanilla rejimida ochilmoqda..." });
      void launchGame({ ...req, cosmeticsRuntimeDisabled: true, autoFixAttempts: attempts + 1 }, emit2).catch((err) => {
        emit2({
          type: "launch-failed",
          title: "O'yin ishga tushmadi",
          items: [err instanceof Error ? err.message : String(err)]
        });
        emit2({ type: "closed", code });
      });
      return;
    }
    const buildCtx = () => ({
      code,
      lines: recentDataLines,
      logText: fullText,
      version: req.version,
      loader: req.loader,
      gameDir: gameDir(),
      javaPath,
      requiredJavaMajor: requiredMajorResolved,
      appVersion: electron.app.getVersion(),
          launcherActionOnLaunch: getLauncherActionOnLaunch(),
      softwareGl: softwareJava !== null,
      reachedGame
    });
    const present = async (advice) => {
      let report = "";
      try {
        report = await buildReport(buildCtx(), advice);
      } catch {
      }
      emit2({
        type: "launch-failed",
        ...advice,
        actions: [
          ...advice.actions ?? [],
          ...report ? [{ kind: "copy", label: "Xato hisobotini nusxalash", value: report }] : []
        ]
      });
      emit2({ type: "closed", code });
    };
    const modDisableAction = (files) => ({
      kind: "disable-mod",
      label: files.length > 1 ? "Aybdor modlarni o'chirib qayta ishga tushirish" : "Aybdor modni o'chirib qayta ishga tushirish",
      files,
      version: req.version,
      loader: req.loader
    });
    if (crashed && !isEarlyWindowDisabled() && attempts < 2 && !hasGpuDriverFailure(fullText) && hadEarlyWindowFailure(instRoot2, recentDataLines, launchStartMs)) {
      setEarlyWindowDisabled(true);
      emit2({
        type: "status",
        message: "Forge yuklash oynasi videokarta drayveri bilan mos kelmadi - o'chirildi, o'yin qayta ishga tushirilmoqda..."
      });
      void launchGame({ ...req, autoFixAttempts: attempts + 1 }, emit2).catch((err) => {
        emit2({
          type: "launch-failed",
          title: "O'yin ishga tushmadi",
          items: [err instanceof Error ? err.message : String(err)]
        });
        emit2({ type: "closed", code });
      });
      return;
    }
    if (crashed && req.loader && attempts < MAX_AUTO_FIX_ATTEMPTS) {
      const badModId = findIncompatibleMod(fullText);
      const movedFile = badModId ? quarantineMod(instRoot2, badModId) : null;
      if (badModId && movedFile) {
        emit2({
          type: "autofixing",
          message: `"${badModId}" moduli ${req.version} versiyasiga mos emas - olib tashlanmoqda, o'yin qayta ishga tushirilmoqda...`,
          attempt: attempts + 1
        });
        emit2({
          type: "warning",
          message: `"${movedFile}" bu o'yin versiyasiga mos emas edi va "mods-disabled" papkasiga ko'chirildi. Kerak bo'lsa, shu versiyaga mos variantini Modlar bo'limidan o'rnating.`
        });
        try {
          await launchGame({ ...req, autoFixAttempts: attempts + 1 }, emit2);
        } catch (err) {
          await present({
            title: "O'yin ishga tushmadi",
            items: [err instanceof Error ? err.message : String(err)]
          });
        }
        return;
      }
    }
    if (crashed && req.loader && attempts < MAX_AUTO_FIX_ATTEMPTS) {
      const conflict = findMixinConflict(instRoot2, launchStartMs);
      const moved = conflict ? conflict.culpritJars.filter((f) => moveModToDisabled(instRoot2, f) !== null) : [];
      if (conflict && moved.length > 0) {
        emit2({
          type: "log",
          line: `[NeoTerra] ${moved.join(", ")} boshqa modning ${conflict.missingClass} qismini topa olmadi - mods-disabled papkasiga ko'chirildi.`
        });
        announceRemovedMods(
          emit2,
          moved.map((file2) => ({ file: file2, reason: "boshqa modning kerakli qismi topilmadi - versiyalari mos emas" }))
        );
        emit2({ type: "status", message: "Modlar moslashtirilmoqda, o'yin qayta ishga tushirilmoqda..." });
        try {
          await launchGame({ ...req, autoFixAttempts: attempts + 1 }, emit2);
        } catch (err) {
          await present({
            title: "O'yin ishga tushmadi",
            items: [err instanceof Error ? err.message : String(err)]
          });
        }
        return;
      }
    }
    if (crashed && req.loader === "forge" && attempts < MAX_AUTO_FIX_ATTEMPTS) {
      const logged = readLoggedDependencyProblems(instRoot2);
      if (logged.length > 0) {
        const fixed = await ensureModDependencies({
          instRoot: instRoot2,
          gameVersion: req.version,
          loader: req.loader,
          logged,
          onStatus: (message) => emit2({ type: "status", message }),
          onLog: (line) => emit2({ type: "log", line })
        }).catch(() => null);
        if (fixed && (fixed.installed.length > 0 || fixed.quarantined.length > 0)) {
          announceRemovedMods(emit2, fixed.quarantined);
          emit2({ type: "status", message: "Modlar moslashtirilmoqda, o'yin qayta ishga tushirilmoqda..." });
          try {
            await launchGame({ ...req, autoFixAttempts: attempts + 1 }, emit2);
          } catch (err) {
            await present({
              title: "O'yin ishga tushmadi",
              items: [err instanceof Error ? err.message : String(err)]
            });
          }
          return;
        }
      }
    }
    const missingIds = crashed && req.loader ? readMissingMandatoryModIds(instRoot2) : [];
    const missingClasspaths = crashed && req.loader ? Array.from(/* @__PURE__ */ new Set([...readMissingClasspaths(instRoot2, launchStartMs), ...readMissingClasspathsFromRawOutput(recentDataLines)])) : [];
    if (missingIds.length === 0 && missingClasspaths.length === 0) {
      const isKnotError = recentDataLines.some(
        (l) => l.includes("net.fabricmc.loader.impl.launch.knot.KnotClient") || l.includes("net.fabricmc.loader.launch.knot.KnotClient") || l.includes("org.quiltmc.loader.impl.launch.knot.KnotClient")
      );
      const isFileTampering = recentDataLines.some((l) => FILE_TAMPERING_HINTS.some((h) => l.includes(h)));
      if (isKnotError && (req.loader === "fabric" || req.loader === "quilt")) {
        cleanupLoaderProfileOnKnotError(gameDir(), req.version);
      }
      if (isKnotError || isFileTampering) {
        removeCorruptedDownloads(gameDir());
      }
      async function showCrashDiagnosis() {
        if (isFileTampering) {
          await present(
            await antivirusAdvice(
              buildCtx(),
              `O'yin mod loader kutubxona/papka fayllariga kira olmadi (kod: ${hexCode(code)}). Buzilgan fayllar tozalandi.`,
              recentDataLines.slice(-6)
            )
          );
          return;
        }
        const crash = readGenericCrashSummary(instRoot2, launchStartMs);
        if (crash) {
          const items = crash.culpritMod ? [
            `"${crash.culpritMod}" modi o'yinni qulatdi.`,
            "Bu mod joriy o'yin versiyasiga yoki boshqa modga mos kelmasligi mumkin. Modlar bo'limidan uni o'chirib qayta urinib ko'ring.",
            crash.summary
          ] : [crash.summary, `Batafsil ma'lumot uchun "crash-reports" papkasidagi eng so'nggi faylni tekshiring.`];
          const culpritInMods = crash.culpritMod !== null && fs.existsSync(path.join(instRoot2, "mods", crash.culpritMod));
          await present({
            title: "O'yin kutilmagan xatolik bilan yopildi",
            items,
            actions: culpritInMods && crash.culpritMod ? [modDisableAction([crash.culpritMod])] : void 0
          });
          return;
        }
        const nativeSummary = readJvmNativeCrashSummary(instRoot2, launchStartMs);
        if (nativeSummary) {
          await present({
            title: "O'yin ishga tushmadi",
            items: [
              nativeSummary,
              "Bu odatda videokarta drayveri eskirgani yoki antivirus dastur to'sqinlik qilayotgani sabab bo'ladi - drayverni yangilang yoki antivirusda ilovaga ruxsat bering."
            ],
            canAddAvExclusion: true
          });
          return;
        }
        if (recentDataLines.length > 0) {
          if (detectLoaderClassMissing(recentDataLines) || isCoreFilesBroken(recentDataLines)) {
            await present(
              await antivirusAdvice(
                buildCtx(),
                "O'yin fayllari bir necha marta qayta yuklab ko'rildi, lekin har safar buzilib yoki o'chirilib qolyapti.",
                recentDataLines.slice(-6)
              )
            );
            return;
          }
          await present({
            title: "O'yin ishga tushmadi",
            items: [`O'yin kutilmagan tarzda yopildi (kod: ${hexCode(code)}).`, ...recentDataLines.slice(-6)]
          });
          return;
        }
        await present({
          title: "O'yin ishga tushmadi",
          items: [
            `O'yin kutilmagan tarzda yopildi (kod: ${hexCode(code)}), lekin sabab haqida hech qanday hisobot topilmadi.`,
            "Videokarta drayverini yangilab, antivirus/xavfsizlik devorida ilovaga ruxsat berib qayta urinib ko'ring."
          ],
          canAddAvExclusion: true
        });
      }
      if (crashed) {
        if (!isLegacyMc(req.version) && hasLegacyLaunchClassMissing(`${recentDataLines.join("\n")}
${fullText}`)) {
          const culprits = findLegacyModCulprits(instRoot2);
          if (culprits.length > 0) {
            await present({
              title: "Eski mod o'yinni qulatdi",
              items: [
                `${culprits.map((f) => `"${f}"`).join(", ")} - eski (1.12.2 yoki undan oldingi) Minecraft uchun yozilgan mod. U ${req.version}${req.loader ? ` ${req.loader}` : ""} bilan ishlamaydi.`,
                "O'yin eski tizim klassini (FMLTweaker/ITweaker) qidirdi - bu mod nomi emas, eski mod belgisi."
              ],
              steps: [
                `Pastdagi tugmani bosing: mod "mods-disabled" papkasiga olinadi (o'chirilmaydi) va o'yin qayta ishga tushadi.`,
                "Kerak bo'lsa shu modning versiyaga mos variantini Modlar bo'limidan o'rnating."
              ],
              actions: [modDisableAction(culprits)],
              details: recentDataLines.filter((l) => l.trim()).slice(-8)
            });
            return;
          }
        }
        const advice = await analyzeCrash(buildCtx());
        if (advice) {
          await present(advice);
          return;
        }
        const isLoaderCrash = detectLoaderClassMissing(recentDataLines) || isFileTampering || isCoreFilesBroken(recentDataLines);
        if (isLoaderCrash) {
          void tryAutoFixLoaderCrash(req, emit2, attempts).then((fixed) => {
            if (!fixed) void showCrashDiagnosis();
          }).catch((err) => {
            emit2({
              type: "warning",
              message: `Avtomatik tuzatishda xato: ${err instanceof Error ? err.message : String(err)}`
            });
            void showCrashDiagnosis();
          });
          return;
        }
        void tryFallbackLoaderVersion(req, emit2, pickedLoaderVersion, attempts).then((fellBack) => {
          if (!fellBack) void showCrashDiagnosis();
        }).catch((err) => {
          emit2({
            type: "warning",
            message: `Zaxira loader versiyasiga o'tishda xato: ${err instanceof Error ? err.message : String(err)}`
          });
          void showCrashDiagnosis();
        });
        return;
      }
      emit2({ type: "closed", code });
      return;
    }
    const labels = [...missingIds, ...missingClasspaths.map((c) => c.split(".").pop() ?? c)];
    if (attempts >= MAX_AUTO_FIX_ATTEMPTS) {
      emit2({
        type: "launch-failed",
        title: "O'yin ishga tushmadi",
        items: [
          `${MAX_AUTO_FIX_ATTEMPTS} marta avtomatik tuzatishga urinildi, lekin muammo hamon davom etmoqda.`,
          ...labels.map((l) => `"${l}" nomli mod/kutubxona yetishmayapti yoki mos kelmayapti.`)
        ]
      });
      emit2({ type: "closed", code });
      return;
    }
    emit2({
      type: "autofixing",
      message: `Xatolik aniqlandi: ${labels.join(", ")} yetishmayapti. Avtomatik tuzatilmoqda (${attempts + 1}/${MAX_AUTO_FIX_ATTEMPTS}-urinish)...`,
      attempt: attempts + 1
    });
    void tryAutoFixMissingMods(req, emit2, missingIds, missingClasspaths).catch((err) => {
      emit2({ type: "warning", message: `Avtomatik tuzatish muvaffaqiyatsiz: ${err instanceof Error ? err.message : String(err)}` });
      emit2({ type: "closed", code });
    });
  };
  launcher.on("close", (code) => {
    void onGameClosed(code).catch((err) => {
      console.error("[onGameClosed]", err);
      emit2({ type: "closed", code });
    });
  });
  launcher.on("error", (err) => {
    console.error("[MCLC error]", err);
  });
  emit2({ type: "status", message: "Fayllar tekshirilmoqda..." });
  for (const phase of Object.keys(PHASE_WEIGHT)) phaseFraction[phase] = 1;
  emitUnifiedProgress(true);
  installMclcFastPath();
  const child = await launcher.launch(opts);
  if (!child) throw new Error("O'yin jarayoni ishga tushmadi (Java o'rnatilganini tekshiring)");
  current$1 = { client: launcher, child, instRoot: instRoot2 };
  emit2({ type: "started" });
  if (bootEarly !== null) {
    bootTracker = startBootTracker({
      instRoot: instRoot2,
      emit: (e) => {
        if (e.type === "window-ready") gameWindowUp = true;
        emit2(e);
      }
    });
    for (const chunk of bootEarly) bootTracker.onOutput(chunk);
    bootEarly = null;
  }
}
function cleanServerHost(host) {
  let h = String(host).replace(/[\s\p{Cf}]+/gu, "").replace(/^minecraft:\/\//i, "");
  if (/^[^:[\]]+:\d+$/.test(h)) h = h.slice(0, h.lastIndexOf(":"));
  return h;
}
function manualAntivirusHelp(name) {
  return `Kompyuteringizda ${name} antivirusi ishlayapti va u launcher ishlashiga yo'l qo'ymayapti. Windows "Sozlamalar" → "Ilovalar" bo'limiga kirib ${name} ni o'chirib tashlang, yoki ${name} ning ichiga kirib NeoTerra Launcher va o'yin papkasi uchun ruxsat (istisno) bering.`;
}
function toEncodedCommand(script) {
  return Buffer.from(script, "utf16le").toString("base64");
}
async function addWindowsDefenderExclusion(gameDir2) {
  if (os.platform() !== "win32") {
    return { ok: false, error: "Bu funksiya faqat Windows'da mavjud." };
  }
  const avs = await detectAntivirus();
  if (avs) {
    const defenderActive = avs.some((a) => a.isDefender && a.enabled);
    const others = avs.filter((a) => a.enabled && !a.isDefender);
    if (!defenderActive && others.length > 0) {
      return { ok: false, error: manualAntivirusHelp(others.map((a) => a.name).join(", ")) };
    }
  }
  const resultFile = path.join(os.tmpdir(), `mcmodhub-av-result-${crypto.randomUUID()}.txt`);
  const escapedDir = gameDir2.replace(/'/g, "''");
  const escapedResultFile = resultFile.replace(/'/g, "''");
  const innerScript = [
    "try {",
    `  Add-MpPreference -ExclusionPath '${escapedDir}' -ErrorAction Stop`,
    `  Add-MpPreference -ExclusionProcess 'java.exe' -ErrorAction Stop`,
    `  Add-MpPreference -ExclusionProcess 'javaw.exe' -ErrorAction Stop`,
    `  'OK' | Set-Content -Path '${escapedResultFile}' -Encoding UTF8`,
    "} catch {",
    `  $_.Exception.Message | Set-Content -Path '${escapedResultFile}' -Encoding UTF8`,
    "}"
  ].join("\r\n");
  const innerEncoded = toEncodedCommand(innerScript);
  const outerScript = [
    "try {",
    `  Start-Process -FilePath 'powershell' -Verb RunAs -WindowStyle Hidden -Wait -ArgumentList @('-NoProfile','-NonInteractive','-EncodedCommand','${innerEncoded}')`,
    "} catch {",
    // UAC oynasida "Yo'q" bosilsa yoki elevatsiya boshqa sababdan muvaffaqiyatsiz bo'lsa -
    // ichki skript UMUMAN ishga tushmaydi, shu bois natija faylini shu yerda O'ZIMIZ yozamiz.
    `  'CANCELLED' | Set-Content -Path '${escapedResultFile}' -Encoding UTF8 -ErrorAction SilentlyContinue`,
    "}"
  ].join("\r\n");
  const outerEncoded = toEncodedCommand(outerScript);
  return new Promise((resolve) => {
    const child = child_process.spawn(
      "powershell",
      ["-NoProfile", "-NonInteractive", "-WindowStyle", "Hidden", "-EncodedCommand", outerEncoded],
      { windowsHide: true }
    );
    child.on("error", (err) => resolve({ ok: false, error: err.message }));
    child.on("close", () => {
      try {
        if (!fs.existsSync(resultFile)) {
          resolve({ ok: false, error: "Natija aniqlanmadi (PowerShell ishga tushmagan bo'lishi mumkin)." });
          return;
        }
        const result = fs.readFileSync(resultFile, "utf-8").replace(/^\uFEFF/, "").trim();
        if (result === "OK") {
          resolve({ ok: true });
        } else if (result === "CANCELLED") {
          resolve({ ok: false, error: "Ruxsat berilmadi (UAC oynasida bekor qilindi)." });
        } else if (/0x800106ba|MpPreference|Add-MpPreference|is not recognized|ConfigListExtension/i.test(result)) {
          resolve({
            ok: false,
            error: `Windows Defender ishlamayapti (kompyuteringizda boshqa antivirus o'rnatilgan bo'lishi mumkin). Windows "Sozlamalar" → "Ilovalar" bo'limiga kirib antivirusni o'chirib tashlang, yoki antivirus ichiga kirib NeoTerra Launcher va o'yin papkasi uchun ruxsat (istisno) bering.`
          });
        } else {
          const code = /0x[0-9a-f]{8}/i.exec(result)?.[0];
          resolve({
            ok: false,
            error: `Ruxsatni avtomatik qo'shib bo'lmadi${code ? ` (kod: ${code})` : ""}. Antivirus dasturi ichida NeoTerra Launcher va o'yin papkasi uchun ruxsat (istisno) bering.`
          });
        }
      } finally {
        try {
          fs.unlinkSync(resultFile);
        } catch {
        }
      }
    });
  });
}
const IRIS_SLUG = "iris";
const OCULUS_SLUG = "oculus";
function installedShaderLoader(loader, _mcVersion) {
  const target = loaderSlugFor(loader);
  if (!target) return null;
  try {
    const dir = assetDir("mod");
    if (!fs.existsSync(dir)) return null;
    const prefix = target.slug;
    const present = fs.readdirSync(dir).some((f) => {
      const n = f.toLowerCase();
      return n.endsWith(".jar") && n.startsWith(prefix);
    });
    return present ? target.name : null;
  } catch {
    return null;
  }
}
function normalize(text) {
  return text.toLowerCase().replace(/[^a-z0-9]/g, "");
}
function loaderSlugFor(loader) {
  if (loader === "fabric" || loader === "quilt" || loader === "neoforge") {
    return { slug: IRIS_SLUG, name: "Iris" };
  }
  if (loader === "forge") return { slug: OCULUS_SLUG, name: "Oculus" };
  return null;
}
async function resolveShaderLoaderChain(mcVersion, loader) {
  const target = loaderSlugFor(loader);
  if (!target) return [];
  if (installedShaderLoader(loader)) return [];
  const file2 = await resolveLatestFileWithDate(target.slug, mcVersion, loader);
  if (!file2) return [];
  const modsDir = assetDir("mod");
  const chain = [];
  const seen = /* @__PURE__ */ new Set([target.slug]);
  const deps = await resolveRequiredDependencies(target.slug, mcVersion, seen, loader, file2.dateMs);
  let existingFiles = null;
  for (const d of deps) {
    if (fs.existsSync(`${modsDir}/${d.filename}`)) continue;
    if (!existingFiles) {
      try {
        existingFiles = fs.readdirSync(modsDir);
      } catch {
        existingFiles = [];
      }
    }
    const normName = normalize(d.name);
    const duplicate = existingFiles.find((f) => {
      const n = f.toLowerCase();
      return n.endsWith(".jar") && normalize(f).includes(normName);
    });
    if (duplicate) {
      try {
        fs.unlinkSync(path.join(modsDir, duplicate));
      } catch {
      }
      existingFiles = existingFiles.filter((f) => f !== duplicate);
    }
    chain.push({ ...d, targetKind: "mod" });
  }
  if (!fs.existsSync(`${modsDir}/${file2.filename}`)) {
    chain.push({
      projectId: target.slug,
      name: target.name,
      url: file2.url,
      filename: file2.filename,
      targetKind: "mod"
    });
  }
  return chain;
}
async function checkShaderSupport(mcVersion, loader) {
  const already = installedShaderLoader(loader);
  if (already) return { status: "ready", loaderName: already };
  const target = loaderSlugFor(loader);
  if (target) {
    const file2 = await resolveLatestFile(target.slug, mcVersion, loader);
    if (file2) return { status: "installable", loaderName: target.name };
  }
  const fabricFile = await resolveLatestFile(IRIS_SLUG, mcVersion, "fabric");
  if (fabricFile) {
    return { status: "needs-loader", loaderName: "Iris", suggestedLoader: "fabric", mcVersion };
  }
  return { status: "unsupported" };
}
function safeFileName(name) {
  const flat = path.basename(name.replace(/\\/g, "/"));
  if (!flat || flat === "." || flat === "..") {
    throw new Error(`Fayl nomi xavfsiz emas: ${name}`);
  }
  return flat;
}
function safeWorldName(name) {
  const flat = path.basename(name.replace(/\\/g, "/"));
  if (!flat || flat === "." || flat === "..") {
    throw new Error(`Dunyo nomi xavfsiz emas: ${name}`);
  }
  return flat;
}
function assertInside(dir, filePath) {
  const root = path.resolve(dir);
  const target = path.resolve(filePath);
  if (target !== root && !target.startsWith(root + path.sep)) {
    throw new Error("Yo'l ruxsat etilgan papkadan tashqarida");
  }
  return target;
}
const KIND_DIRS = {
  mod: "mods",
  shader: "shaderpacks",
  texture: "resourcepacks",
  model: "mods"
};
function instRoot() {
  const dir = currentInstanceDir();
  if (!dir) throw new Error("O'yin versiyasi hali tanlanmagan");
  return dir;
}
function dataPackDir(worldName) {
  const root = instRoot();
  const dir = path.join(root, "saves", safeWorldName(worldName), "datapacks");
  assertInside(path.join(root, "saves"), dir);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}
function assetPath(kind, filename, worldName) {
  const dir = assetDir(kind, worldName);
  return assertInside(dir, path.join(dir, safeFileName(filename)));
}
function pendingDependencies(deps, kind, worldName) {
  return deps.filter((d) => {
    const target = d.targetKind ?? kind;
    if (target === "datapack" && !worldName) return false;
    try {
      return !fs.existsSync(assetPath(target, d.filename, worldName));
    } catch {
      return false;
    }
  });
}
function assetDir(kind, worldName) {
  if (kind === "datapack") {
    if (!worldName) throw new Error("Data paket uchun dunyo tanlanmagan");
    return dataPackDir(worldName);
  }
  const dir = path.join(instRoot(), KIND_DIRS[kind]);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}
async function downloadOne(kind, url, filename, emit2, worldName) {
  const destPath = assetPath(kind, filename, worldName);
  const res = await fetch(url, { signal: AbortSignal.timeout(12e4) });
  if (!res.ok || !res.body) {
    throw new Error(`Fayl yuklanmadi (HTTP ${res.status})`);
  }
  const total = Number(res.headers.get("content-length") ?? 0);
  const reader = res.body.getReader();
  const chunks = [];
  let received = 0;
  let lastPercent = -1;
  for (; ; ) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    received += value.length;
    if (total > 0) {
      const percent = Math.round(received / total * 100);
      if (percent !== lastPercent) {
        lastPercent = percent;
        emit2({ type: "progress", filename, percent });
      }
    }
  }
  await fs.promises.writeFile(destPath, Buffer.concat(chunks.map((c) => Buffer.from(c))));
  emit2({ type: "done", filename });
}
async function downloadModAsset(req, emit2) {
  const { kind, url, filename, modrinthProjectId, gameVersion, loader, worldName } = req;
  if (modrinthProjectId && gameVersion) {
    emit2({ type: "status", message: "Bog'liqliklar tekshirilmoqda..." });
    const deps = await resolveAllDependencies(modrinthProjectId, gameVersion, loader, kind);
    const toInstall = pendingDependencies(deps, kind, worldName);
    for (let i = 0; i < toInstall.length; i++) {
      const dep = toInstall[i];
      emit2({ type: "status", message: `Bog'liqlik yuklanmoqda: ${dep.name} (${i + 1}/${toInstall.length})` });
      try {
        await downloadOne(dep.targetKind ?? kind, dep.url, dep.filename, emit2, worldName);
      } catch (err) {
        emit2({
          type: "status",
          message: `Diqqat: "${dep.name}" bog'liqligi yuklanmadi (${err instanceof Error ? err.message : String(err)}), davom etilmoqda...`
        });
      }
    }
    emit2({ type: "status", message: "Asosiy mod yuklanmoqda..." });
  }
  await downloadOne(kind, url, filename, emit2, worldName);
}
async function checkMissingDependencies(modrinthProjectId, gameVersion, loader, kind, worldName) {
  const deps = await resolveAllDependencies(modrinthProjectId, gameVersion, loader, kind);
  return pendingDependencies(deps, kind, worldName);
}
async function resolveAllDependencies(modrinthProjectId, gameVersion, loader, kind) {
  const seen = /* @__PURE__ */ new Set([modrinthProjectId]);
  const own = await resolveRequiredDependencies(modrinthProjectId, gameVersion, seen, loader);
  if (kind !== "shader") return own;
  const asMods = own.map((d) => ({ ...d, targetKind: "mod" }));
  const chain = await resolveShaderLoaderChain(gameVersion, loader ?? "vanilla");
  const known = new Set(asMods.map((d) => d.filename));
  return [...asMods, ...chain.filter((d) => !known.has(d.filename))];
}
function resolveInstalledAssetPath(kind, filename, worldName) {
  const path2 = assetPath(kind, filename, worldName);
  if (!fs.existsSync(path2)) throw new Error("Fayl topilmadi - u o'chirilgan yoki boshqa versiyaga tegishli bo'lishi mumkin");
  return path2;
}
function removeModAsset(kind, filename, worldName) {
  const path2 = assetPath(kind, filename, worldName);
  if (fs.existsSync(path2)) fs.unlinkSync(path2);
}
function listInstalledModAssets() {
  if (!currentInstanceDir()) return [];
  const kindsByDir = /* @__PURE__ */ new Map();
  for (const kind of Object.keys(KIND_DIRS)) {
    const dir = assetDir(kind);
    const kinds = kindsByDir.get(dir);
    if (kinds) kinds.push(kind);
    else kindsByDir.set(dir, [kind]);
  }
  const result = [];
  for (const [dir, kinds] of kindsByDir) {
    for (const filename of fs.readdirSync(dir)) {
      for (const kind of kinds) result.push({ kind, filename });
    }
  }
  const savesDir2 = path.join(instRoot(), "saves");
  if (fs.existsSync(savesDir2)) {
    for (const worldName of fs.readdirSync(savesDir2)) {
      const dpDir = path.join(savesDir2, worldName, "datapacks");
      if (!fs.existsSync(dpDir)) continue;
      for (const filename of fs.readdirSync(dpDir)) {
        result.push({ kind: "datapack", filename, worldName });
      }
    }
  }
  return result;
}
function savesDir() {
  const root = currentInstanceDir();
  if (!root) throw new Error("O'yin versiyasi hali tanlanmagan");
  const dir = path.join(root, "saves");
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}
function toRawGithubUrl(url) {
  const marker = "github.com/";
  const idx = url.indexOf(marker);
  if (idx === -1 || !url.includes("/blob/")) return url;
  return url.replace("github.com/", "raw.githubusercontent.com/").replace("/blob/", "/");
}
function uniqueFolderName(base) {
  let candidate = base;
  let n = 2;
  while (fs.existsSync(path.join(savesDir(), candidate))) {
    candidate = `${base} (${n})`;
    n++;
  }
  return candidate;
}
const STAGE_DIR = ".mcmodhub-tmp";
const INSTALL_PREFIX = "install-";
const DOWNLOAD_SHARE = 75;
const SKIP_NAMES = /* @__PURE__ */ new Set([".DS_Store", "Thumbs.db"]);
const active = /* @__PURE__ */ new Map();
const activeStageDirs = /* @__PURE__ */ new Set();
function stageRoot() {
  return path.join(savesDir(), STAGE_DIR);
}
async function renameWithRetry(from, to) {
  for (let i = 0; ; i++) {
    try {
      await fs.promises.rename(from, to);
      return;
    } catch (err) {
      const code = err.code ?? "";
      if (i >= 8 || !["EPERM", "EBUSY", "EACCES"].includes(code)) throw err;
      await new Promise((r) => setTimeout(r, 200 * (i + 1)));
    }
  }
}
function cleanStale() {
  try {
    const root = stageRoot();
    if (!fs.existsSync(root)) return;
    for (const name of fs.readdirSync(root)) {
      if (!name.startsWith(INSTALL_PREFIX)) continue;
      const full = path.join(root, name);
      if (activeStageDirs.has(full)) continue;
      fs.rmSync(full, { recursive: true, force: true });
    }
  } catch {
  }
}
async function installMap(req, emit2) {
  const { worldName } = req;
  const url = toRawGithubUrl(req.url);
  const root = stageRoot();
  fs.mkdirSync(root, { recursive: true });
  cleanStale();
  const zipPath = path.join(root, `${crypto.createHash("sha1").update(url).digest("hex").slice(0, 16)}.zip`);
  let lastPercent = -1;
  const progress = (percent) => {
    const p = Math.max(0, Math.min(100, Math.floor(percent)));
    if (p === lastPercent) return;
    lastPercent = p;
    emit2({ type: "progress", worldName, percent: p });
  };
  progress(0);
  await downloadFileParallel({
    url: githubCandidates(url),
    dest: zipPath,
    connections: 4,
    onProgress: (received, total) => {
      if (total > 0) progress(received / total * DOWNLOAD_SHARE);
    }
  });
  let index;
  try {
    index = await readZipIndex(zipPath);
  } catch {
    await fs.promises.rm(zipPath, { force: true });
    throw new Error("Xarita fayli buzuq");
  }
  const files = index.filter((e) => {
    if (e.isDir) return false;
    if (e.name.startsWith("__MACOSX/") || e.name.includes("/__MACOSX/")) return false;
    return !SKIP_NAMES.has(path.basename(e.name));
  });
  const firstPath = files[0]?.name ?? "";
  const rootPrefix = firstPath.includes("/") ? firstPath.slice(0, firstPath.indexOf("/") + 1) : "";
  const allShareRoot = rootPrefix !== "" && files.every((e) => e.name.startsWith(rootPrefix));
  const strip = allShareRoot ? rootPrefix : "";
  const targets = files.map((e) => ({ entry: e, relPath: strip ? e.name.slice(strip.length) : e.name }));
  if (!targets.some((t) => t.relPath === "level.dat" || t.relPath.endsWith("/level.dat"))) {
    await fs.promises.rm(zipPath, { force: true });
    throw new Error("Xarita fayli buzuq");
  }
  const totalBytes = targets.reduce((sum, t) => sum + t.entry.size, 0);
  try {
    const st = await fs.promises.statfs(root);
    const free = st.bavail * st.bsize;
    if (free < totalBytes + 64 * 1024 * 1024) {
      throw new Error(`Diskda joy yetarli emas: yana ${Math.ceil((totalBytes + 64 * 1024 * 1024 - free) / 1048576)} MB kerak`);
    }
  } catch (err) {
    if (err instanceof Error && err.message.startsWith("Diskda joy")) throw err;
  }
  const stageDir = path.join(root, `${INSTALL_PREFIX}${crypto.randomBytes(6).toString("hex")}`);
  activeStageDirs.add(stageDir);
  try {
    await fs.promises.mkdir(stageDir, { recursive: true });
    let extracted = 0;
    await extractEntries(zipPath, stageDir, targets, (n) => {
      extracted += n;
      if (totalBytes > 0) progress(DOWNLOAD_SHARE + extracted / totalBytes * (100 - DOWNLOAD_SHARE));
    });
    const finalName = uniqueFolderName(worldName);
    await renameWithRetry(stageDir, path.join(savesDir(), finalName));
    progress(100);
    await fs.promises.rm(zipPath, { force: true });
    emit2({ type: "done", worldName, finalName });
  } catch (err) {
    if (err instanceof Error && /CRC|buzilgan|inflate|zlib|incorrect|invalid/i.test(err.message)) {
      await fs.promises.rm(zipPath, { force: true });
    }
    throw err;
  } finally {
    activeStageDirs.delete(stageDir);
    fs.rmSync(stageDir, { recursive: true, force: true });
    try {
      if (fs.readdirSync(root).length === 0) fs.rmSync(root, { recursive: true, force: true });
    } catch {
    }
  }
}
async function downloadAndInstallMap(req, emit2) {
  const key = `${req.worldName}
${req.url}`;
  const running2 = active.get(key);
  if (running2) {
    running2.listeners.add(emit2);
    try {
      await running2.promise;
    } finally {
      running2.listeners.delete(emit2);
    }
    return;
  }
  const listeners = /* @__PURE__ */ new Set([emit2]);
  const promise = installMap(req, (e) => {
    for (const l of listeners) l(e);
  });
  active.set(key, { promise, listeners });
  try {
    await promise;
  } finally {
    active.delete(key);
  }
}
function removeMap(worldName) {
  const path$1 = path.join(savesDir(), worldName);
  if (fs.existsSync(path$1)) fs.rmSync(path$1, { recursive: true, force: true });
}
function listInstalledMaps() {
  return fs.readdirSync(savesDir(), { withFileTypes: true }).filter((d) => d.isDirectory() && !d.name.startsWith(".")).map((d) => ({ worldName: d.name }));
}
function supportsAutoLan(version, loader) {
  if (loader === "fabric" || loader === "quilt") return true;
  if (loader === "forge") return /^1\.(1[6-9]|20)(\.\d+)?$/.test(version);
  return false;
}
const GAME_VERSION_RE = /^[0-9A-Za-z][0-9A-Za-z._+-]{0,31}$/;
function isGameVersion(v) {
  return typeof v === "string" && GAME_VERSION_RE.test(v);
}
function isPartyLoader(v) {
  return v === "forge" || v === "fabric" || v === "quilt";
}
const E4MC_DEFAULT_PORT = 25565;
const LAN_TUNNEL_MOD_SLUG = "e4all";
const MAX_LAN_ENDPOINTS = 4;
const HOST_LABELS = String.raw`(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+e4mc\.link`;
const DOMAIN_LINE_PATTERNS = [
  new RegExp(String.raw`Domain (?:assigned|reassigned after reconnect): (${HOST_LABELS})(?![a-z0-9.-])`, "i"),
  new RegExp(String.raw`hosted on domain \[(${HOST_LABELS})\]`, "i")
];
const E4MC_EXACT_HOST = new RegExp(`^${HOST_LABELS}$`, "i");
const INFRA_HOSTS = /* @__PURE__ */ new Set(["e4mc.link", "broker.e4mc.link", "natives.e4mc.link", "test.e4mc.link"]);
function validPort(port2) {
  return Number.isInteger(port2) && port2 >= 1 && port2 <= 65535;
}
function isGameHost(host) {
  return host.length <= 253 && E4MC_EXACT_HOST.test(host) && !INFRA_HOSTS.has(host.toLowerCase());
}
function parseE4mcAddress(line) {
  for (const pattern of DOMAIN_LINE_PATTERNS) {
    const match = pattern.exec(line);
    if (!match) continue;
    const host = match[1].toLowerCase();
    return isGameHost(host) ? { host, port: E4MC_DEFAULT_PORT } : null;
  }
  return null;
}
function isE4mcAddress(v) {
  if (typeof v !== "object" || v === null) return false;
  const { host, port: port2 } = v;
  return typeof host === "string" && isGameHost(host) && typeof port2 === "number" && validPort(port2);
}
function isHostWorldReadyLine(line, nick) {
  if (!nick) return false;
  const text = line.trimEnd();
  if (!text.includes("logged in with entity id") && !text.endsWith("joined the game")) return false;
  const escaped = nick.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp("(?<![A-Za-z0-9_])" + escaped + "(?![A-Za-z0-9_])").test(text);
}
function parseLanCapacity(line) {
  const m = /\[MCModHub\] LAN max players: (raised|failed) (\d{1,3})/.exec(line);
  if (!m) return null;
  return { raised: m[1] === "raised", max: Number(m[2]) };
}
function parseLanPort(line) {
  const match = /Started serving on (\d{1,5})\s*$/.exec(line);
  if (!match) return null;
  const port2 = Number(match[1]);
  return port2 >= 1024 && port2 <= 65535 ? port2 : null;
}
function isPrivateLanEndpoint(v) {
  if (typeof v !== "object" || v === null) return false;
  const { host, port: port2 } = v;
  if (typeof host !== "string" || typeof port2 !== "number" || !Number.isInteger(port2) || port2 < 1024 || port2 > 65535) return false;
  const m = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(host);
  if (!m) return false;
  const [a, b, c, d] = m.slice(1).map(Number);
  if ([a, b, c, d].some((x) => x > 255)) return false;
  return a === 10 || a === 172 && b >= 16 && b <= 31 || a === 192 && b === 168;
}
const MAX_MANIFEST_MODS = 1e3;
const MAX_PACK_REFS = 8;
const MAX_ISSUE_NAMES = 6;
const MAX_FILE_NAME_LENGTH = 160;
const UNSAFE_NAME_CHARS = /[\u0000-\u001f\u007f\\/\u202a-\u202e\u2066-\u2069]/;
const UNSAFE_NAME_CHARS_ALL = new RegExp(UNSAFE_NAME_CHARS.source, "g");
function sanitizeFileName(name) {
  return name.replace(UNSAFE_NAME_CHARS_ALL, "?").slice(0, MAX_FILE_NAME_LENGTH);
}
function isSafeFileName(v) {
  return typeof v === "string" && v.length > 0 && v.length <= MAX_FILE_NAME_LENGTH && !UNSAFE_NAME_CHARS.test(v);
}
function toNameList(names) {
  return { names: names.slice(0, MAX_ISSUE_NAMES), total: names.length };
}
const LAUNCHER_MANAGED = [/^customskinloader/i, /^(?:neoterra|mcmodhub)[_-]/i, /^e4(?:all|mc)/i, /^(?:oculus|iris)/i];
function isLauncherManagedMod(filename, loader) {
  if (LAUNCHER_MANAGED.some((re) => re.test(filename))) return true;
  return isPartyLoader(loader) && isPerformanceModFile(filename, loader);
}
const HASH_CONCURRENCY = 4;
const MAX_PACK_BYTES = 400 * 1024 * 1024;
const hashCache = /* @__PURE__ */ new Map();
function hashFile(path2) {
  return new Promise((resolve, reject2) => {
    const hash = crypto.createHash("sha1");
    const stream2 = fs.createReadStream(path2);
    stream2.on("data", (chunk) => hash.update(chunk));
    stream2.once("error", reject2);
    stream2.once("end", () => resolve(hash.digest("hex")));
  });
}
async function cachedSha1(path2, size, mtimeMs) {
  const hit = hashCache.get(path2);
  if (hit && hit.size === size && hit.mtimeMs === mtimeMs) return hit.sha1;
  const sha1 = await hashFile(path2);
  hashCache.set(path2, { size, mtimeMs, sha1 });
  return sha1;
}
async function mapLimit(items, limit, fn) {
  const out = new Array(items.length);
  let next = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) {
      const i = next++;
      out[i] = await fn(items[i]);
    }
  });
  await Promise.all(workers);
  return out;
}
function isNoEntry(err) {
  return err?.code === "ENOENT";
}
function compareNames(a, b) {
  const la = a.toLowerCase();
  const lb = b.toLowerCase();
  if (la !== lb) return la < lb ? -1 : 1;
  return a < b ? -1 : a > b ? 1 : 0;
}
async function readModsManifest(modsDir, target) {
  let entries = [];
  try {
    entries = await promises$1.readdir(modsDir, { withFileTypes: true });
  } catch (err) {
    if (!isNoEntry(err)) throw err;
  }
  const jars = entries.filter(
    (e) => (e.isFile() || e.isSymbolicLink()) && e.name.toLowerCase().endsWith(".jar") && !isLauncherManagedMod(e.name, target.loader)
  ).map((e) => e.name);
  if (jars.length > MAX_MANIFEST_MODS) {
    throw new Error(`Modlar soni juda ko'p (${jars.length}) - sinxronizatsiya tekshiruvi ${MAX_MANIFEST_MODS} tagacha modni qo'llaydi`);
  }
  const seen = /* @__PURE__ */ new Set();
  const found = await mapLimit(jars, HASH_CONCURRENCY, async (file2) => {
    const path$1 = path.join(modsDir, file2);
    try {
      const st = await promises$1.stat(path$1);
      if (!st.isFile()) return null;
      const sha1 = await cachedSha1(path$1, st.size, st.mtimeMs);
      seen.add(path$1);
      return { file: sanitizeFileName(file2), sha1 };
    } catch (err) {
      if (isNoEntry(err)) return null;
      throw err;
    }
  });
  const prefix = modsDir + path.sep;
  for (const key of hashCache.keys()) {
    if (key.startsWith(prefix) && !seen.has(key)) hashCache.delete(key);
  }
  const mods = found.filter((m) => m !== null).sort((a, b) => compareNames(a.file, b.file));
  const uniqueHashes = [...new Set(mods.map((m) => m.sha1))].sort();
  const modsHash = crypto.createHash("sha256").update(uniqueHashes.join("\n")).digest("hex");
  return { mcVersion: target.mcVersion, loader: target.loader, mods, modsHash, packs: [] };
}
function parseActiveResourcePacks(optionsText) {
  const line = /^resourcePacks:(.*)$/m.exec(optionsText);
  if (!line) return [];
  const raw = line[1].trim();
  let names = [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) names = parsed;
  } catch {
    names = raw.replace(/^\[|\]$/g, "").split(",");
  }
  const out = [];
  for (const item of names) {
    if (typeof item !== "string") continue;
    const name = item.trim().replace(/^"|"$/g, "").replace(/^file\//, "");
    if (name.toLowerCase().endsWith(".zip") && isSafeFileName(name)) out.push(name);
  }
  return out;
}
function parseActiveShaderPack(text) {
  const m = /^shaderPack=(.*)$/m.exec(text);
  const name = m?.[1].trim() ?? "";
  if (!name || name === "(internal)" || name.toUpperCase() === "OFF" || !name.toLowerCase().endsWith(".zip")) return null;
  return isSafeFileName(name) ? name : null;
}
async function readTextIfExists(path2) {
  try {
    return await promises$1.readFile(path2, "utf8");
  } catch {
    return "";
  }
}
async function refOf(root, kind, file2) {
  const path$1 = path.join(root, kind === "shader" ? "shaderpacks" : "resourcepacks", file2);
  try {
    const st = await promises$1.stat(path$1);
    if (!st.isFile() || st.size > MAX_PACK_BYTES) return null;
    return { kind, file: sanitizeFileName(file2), sha1: await cachedSha1(path$1, st.size, st.mtimeMs), size: st.size };
  } catch {
    return null;
  }
}
async function readActivePacks(root) {
  try {
    const options = await readTextIfExists(path.join(root, "options.txt"));
    const jobs2 = parseActiveResourcePacks(options).map((f) => refOf(root, "resourcepack", f));
    for (const cfg of [path.join("config", "iris.properties"), path.join("config", "oculus.properties"), "optionsshaders.txt"]) {
      const shader = parseActiveShaderPack(await readTextIfExists(path.join(root, cfg)));
      if (shader) {
        jobs2.push(refOf(root, "shader", shader));
        break;
      }
    }
    const refs = (await Promise.all(jobs2)).filter((r) => r !== null);
    return refs.slice(0, MAX_PACK_REFS);
  } catch {
    return [];
  }
}
async function checkPacks(root, refs) {
  const missing = [];
  const changed = [];
  for (const ref of refs.slice(0, MAX_PACK_REFS)) {
    const dir = path.join(root, ref.kind === "shader" ? "shaderpacks" : "resourcepacks");
    let files = [];
    try {
      const entries = await promises$1.readdir(dir, { withFileTypes: true });
      const stats = await Promise.all(
        entries.filter((e) => e.isFile() || e.isSymbolicLink()).map(async (e) => {
          try {
            const st = await promises$1.stat(path.join(dir, e.name));
            return st.isFile() ? { name: e.name, size: st.size, mtimeMs: st.mtimeMs } : null;
          } catch {
            return null;
          }
        })
      );
      files = stats.filter((f) => f !== null);
    } catch (err) {
      if (!isNoEntry(err)) throw err;
    }
    let present = false;
    for (const f of files.filter((c) => c.size === ref.size)) {
      if (await cachedSha1(path.join(dir, f.name), f.size, f.mtimeMs) === ref.sha1) {
        present = true;
        break;
      }
    }
    if (present) continue;
    if (files.some((f) => f.name === ref.file)) changed.push(ref.file);
    else missing.push(ref.file);
  }
  return missing.length === 0 && changed.length === 0 ? null : { missing: toNameList(missing), changed: toNameList(changed) };
}
function readTarget$1(v) {
  const rec = typeof v === "object" && v !== null ? v : {};
  const loader = rec.loader ?? null;
  if (!isGameVersion(rec.version) || loader !== null && !isPartyLoader(loader)) {
    throw new Error("O'yin versiyasi noto'g'ri");
  }
  return { version: rec.version, loader };
}
async function readPartyManifest(target) {
  const root = instanceDir(target.version, target.loader);
  const manifest = await readModsManifest(path.join(root, "mods"), { mcVersion: target.version, loader: target.loader ?? "vanilla" });
  return { ...manifest, packs: await readActivePacks(root) };
}
async function checkPartyPacks(target, refs) {
  if (!Array.isArray(refs) || refs.length > MAX_PACK_REFS) throw new Error("Paketlar ro'yxati noto'g'ri");
  const valid = [];
  for (const r of refs) {
    const ok = r && (r.kind === "resourcepack" || r.kind === "shader") && isSafeFileName(r.file) && typeof r.sha1 === "string" && /^[0-9a-f]{40}$/.test(r.sha1) && typeof r.size === "number" && Number.isInteger(r.size) && r.size >= 0;
    if (ok) valid.push({ kind: r.kind, file: r.file, sha1: r.sha1, size: r.size });
  }
  return checkPacks(instanceDir(target.version, target.loader), valid);
}
const STATE_FILE = "mcmodhub-arena.json";
const STASH_DIR = "mods-mcmodhub-saqlangan";
const FILE_RE = /^[A-Za-z0-9][A-Za-z0-9 ._+()-]{0,118}\.jar$/;
const SHA1_RE = /^[0-9a-f]{40}$/;
const ARENA_ID_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const WORLD_RE = /^[A-Za-z0-9_]{1,40}$/;
function inside(dir, name) {
  const root = path.resolve(dir);
  const target = path.resolve(path.join(dir, name));
  if (!target.startsWith(root + path.sep)) throw new Error("Yo'l ruxsat etilgan papkadan tashqarida");
  return target;
}
function cacheRoot() {
  const dir = path.join(electron.app.getPath("userData"), "arena-cache");
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}
const sha1Memo = /* @__PURE__ */ new Map();
function sha1Of(path$1) {
  const st = fs.statSync(path$1);
  const key = `${path.resolve(path$1)}|${st.size}|${st.mtimeMs}|${st.ino}`;
  const hit = sha1Memo.get(key);
  if (hit) return hit;
  const digest = crypto.createHash("sha1").update(fs.readFileSync(path$1)).digest("hex");
  if (sha1Memo.size > 5e3) sha1Memo.clear();
  sha1Memo.set(key, digest);
  return digest;
}
function placeFromCache(from, to) {
  try {
    if (fs.existsSync(to)) fs.unlinkSync(to);
    fs.linkSync(from, to);
  } catch {
    fs.copyFileSync(from, to);
  }
}
function readState(dir) {
  try {
    const raw = JSON.parse(fs.readFileSync(path.join(dir, STATE_FILE), "utf-8"));
    if (!raw || typeof raw.arenaId !== "string" || !Array.isArray(raw.stashed) || !Array.isArray(raw.installed)) return null;
    return raw;
  } catch {
    return null;
  }
}
function writeState(dir, state) {
  fs.writeFileSync(path.join(dir, STATE_FILE), JSON.stringify(state, null, 2));
}
function validatePack(req) {
  if (!ARENA_ID_RE.test(req.arenaId)) throw new Error("Arena identifikatori noto'g'ri");
  if (!/^\d+\.\d+(\.\d+)?$/.test(req.version)) throw new Error("Arena versiyasi noto'g'ri");
  if (req.loader !== null && req.loader !== "forge" && req.loader !== "fabric" && req.loader !== "quilt") {
    throw new Error("Arena mod-loaderi noto'g'ri");
  }
  if (!Array.isArray(req.mods) || req.mods.length > 60) throw new Error("Arena modlar ro'yxati noto'g'ri");
  const seen = /* @__PURE__ */ new Set();
  for (const m of req.mods) {
    if (!FILE_RE.test(m.file) || !SHA1_RE.test(m.sha1) || !/^https:\/\//i.test(m.url)) {
      throw new Error(`Arena modi noto'g'ri: ${String(m.file)}`);
    }
    if (seen.has(m.file.toLowerCase())) throw new Error(`Arena modi ikki marta berilgan: ${m.file}`);
    seen.add(m.file.toLowerCase());
  }
}
async function cachedMod(mod, onBytes) {
  const dir = path.join(cacheRoot(), "mods");
  fs.mkdirSync(dir, { recursive: true });
  const path$1 = path.join(dir, `${mod.sha1}.jar`);
  if (fs.existsSync(path$1) && sha1Of(path$1) === mod.sha1) return path$1;
  const res = await fetch(mod.url, { signal: AbortSignal.timeout(10 * 6e4) });
  if (!res.ok || !res.body) throw new Error(`${mod.file} yuklanmadi (HTTP ${res.status})`);
  const total = Number(res.headers.get("content-length") ?? 0);
  const reader = res.body.getReader();
  const chunks = [];
  let received = 0;
  for (; ; ) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    received += value.length;
    onBytes(received, total);
  }
  const buf = Buffer.concat(chunks.map((c) => Buffer.from(c)));
  const got = crypto.createHash("sha1").update(buf).digest("hex");
  if (got !== mod.sha1) throw new Error(`${mod.file} buzilgan holda yuklandi (xesh mos emas)`);
  const tmp = `${path$1}.tmp`;
  fs.writeFileSync(tmp, buf);
  fs.renameSync(tmp, path$1);
  return path$1;
}
function uniqueStashName(stashDir, name) {
  let candidate = name;
  let n = 2;
  while (fs.existsSync(path.join(stashDir, candidate))) {
    candidate = name.replace(/(\.[^.]+)?$/, (ext) => ` (${n})${ext}`);
    n++;
  }
  return candidate;
}
async function applyArenaPack(req, onProgress) {
  validatePack(req);
  if (isRunning()) throw new Error("O'yin ochiq turganda modlarni almashtirib bo'lmaydi");
  const dir = instanceDir(req.version, req.loader);
  const modsDir = path.join(dir, "mods");
  const stashDir = path.join(dir, STASH_DIR);
  fs.mkdirSync(modsDir, { recursive: true });
  let state = readState(dir);
  if (state && state.arenaId !== req.arenaId) {
    restoreInstance(dir);
    state = null;
  }
  if (!state) {
    state = { arenaId: req.arenaId, stashed: [], installed: [] };
    writeState(dir, state);
  }
  const paths = [];
  for (let i = 0; i < req.mods.length; i++) {
    const mod = req.mods[i];
    const base = i / req.mods.length * 90;
    onProgress(Math.round(base), mod.file);
    paths.push(
      await cachedMod(mod, (got, total) => {
        if (total > 0) onProgress(Math.round(base + got / total * (90 / req.mods.length)), mod.file);
      })
    );
  }
  const wanted = new Set(req.mods.map((m) => m.file.toLowerCase()));
  fs.mkdirSync(stashDir, { recursive: true });
  for (const name of fs.readdirSync(modsDir)) {
    const full = path.join(modsDir, name);
    if (!fs.statSync(full).isFile()) continue;
    const ours = state.installed.some((f) => f.file.toLowerCase() === name.toLowerCase());
    if (ours && wanted.has(name.toLowerCase())) continue;
    if (isLauncherManagedMod(name, req.loader)) continue;
    if (ours) {
      fs.unlinkSync(full);
      continue;
    }
    const stashName = uniqueStashName(stashDir, name);
    fs.renameSync(full, inside(stashDir, stashName));
    state.stashed.push({ name, stashName });
    writeState(dir, state);
  }
  onProgress(92, "");
  state.installed = [];
  for (let i = 0; i < req.mods.length; i++) {
    const mod = req.mods[i];
    const dest = inside(modsDir, mod.file);
    if (!fs.existsSync(dest) || sha1Of(dest) !== mod.sha1) placeFromCache(paths[i], dest);
    state.installed.push({ file: mod.file, sha1: mod.sha1 });
  }
  writeState(dir, state);
  onProgress(100, "");
}
function restoreInstance(dir) {
  const state = readState(dir);
  if (!state) return false;
  const modsDir = path.join(dir, "mods");
  const stashDir = path.join(dir, STASH_DIR);
  fs.mkdirSync(modsDir, { recursive: true });
  const leftInstalled = [];
  for (const f of state.installed) {
    try {
      const p = inside(modsDir, f.file);
      if (fs.existsSync(p)) fs.unlinkSync(p);
    } catch {
      leftInstalled.push(f);
    }
  }
  if (state.resourcePack) {
    try {
      const packPath = inside(path.join(dir, "resourcepacks"), state.resourcePack.file);
      if (fs.existsSync(packPath)) fs.unlinkSync(packPath);
    } catch {
    }
    if (state.resourcePack.addedToOptions) {
      try {
        setOptionsResourcePack(dir, state.resourcePack.file, false);
      } catch {
      }
    }
  }
  const leftStashed = [];
  for (const s of state.stashed) {
    try {
      const from = inside(stashDir, s.stashName);
      if (!fs.existsSync(from)) continue;
      let to = inside(modsDir, s.name);
      if (fs.existsSync(to)) to = inside(modsDir, uniqueStashName(modsDir, s.name));
      fs.renameSync(from, to);
    } catch {
      leftStashed.push(s);
    }
  }
  if (leftInstalled.length > 0 || leftStashed.length > 0) {
    writeState(dir, { arenaId: state.arenaId, stashed: leftStashed, installed: leftInstalled });
    return true;
  }
  try {
    if (fs.existsSync(stashDir) && fs.readdirSync(stashDir).length === 0) fs.rmSync(stashDir, { recursive: true, force: true });
  } catch {
  }
  try {
    fs.unlinkSync(path.join(dir, STATE_FILE));
  } catch {
  }
  return true;
}
const PARTY_SYNC_ID = "party-sync";
const MODRINTH_API$1 = "https://api.modrinth.com/v2";
const MODRINTH_UA = "NeoTerraLauncher/1.0 (Minecraft launcher - site.neoterra.uz)";
const MAX_SYNC_MODS = 1e3;
const SYNC_VERSION_RE = /^\d+\.\d+(\.\d+)?$/;
function validateSync(req) {
  if (!req || typeof req.version !== "string" || !SYNC_VERSION_RE.test(req.version)) throw new Error("Guruh versiyasi noto'g'ri");
  if (req.loader !== "forge" && req.loader !== "fabric" && req.loader !== "quilt") throw new Error("Guruh mod-loaderi noto'g'ri");
  if (!Array.isArray(req.mods) || req.mods.length > MAX_SYNC_MODS) throw new Error("Liderning modlar ro'yxati noto'g'ri");
  for (const m of req.mods) {
    if (!m || typeof m.file !== "string" || m.file.length > 160 || typeof m.sha1 !== "string" || !SHA1_RE.test(m.sha1)) {
      throw new Error("Liderning modlar ro'yxati noto'g'ri");
    }
  }
}
function safeJarName(preferred, sha1, loader) {
  if (preferred && FILE_RE.test(preferred) && !isLauncherManagedMod(preferred, loader)) return preferred;
  return `party-${sha1.slice(0, 16)}.jar`;
}
async function resolveOnModrinth(hashes) {
  const out = /* @__PURE__ */ new Map();
  for (let i = 0; i < hashes.length; i += 100) {
    const chunk = hashes.slice(i, i + 100);
    const res = await fetch(`${MODRINTH_API$1}/version_files`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json", "User-Agent": MODRINTH_UA },
      body: JSON.stringify({ hashes: chunk, algorithm: "sha1" }),
      signal: AbortSignal.timeout(2e4)
    });
    if (!res.ok) throw new Error(`Modrinth javob bermadi (HTTP ${res.status})`);
    const data = await res.json();
    for (const hash of chunk) {
      const file2 = data?.[hash]?.files?.find((f) => f?.hashes?.sha1 === hash);
      if (!file2 || typeof file2.url !== "string" || typeof file2.filename !== "string") continue;
      let host = "";
      try {
        host = new URL(file2.url).hostname;
      } catch {
      }
      if (host !== "cdn.modrinth.com") continue;
      out.set(hash, { url: file2.url, filename: file2.filename });
    }
  }
  return out;
}
async function applyPartyModSync(req, onProgress) {
  validateSync(req);
  if (isRunning()) throw new Error("O'yin ochiq turganda modlarni almashtirib bo'lmaydi");
  const dir = instanceDir(req.version, req.loader);
  const modsDir = path.join(dir, "mods");
  const stashDir = path.join(dir, STASH_DIR);
  fs.mkdirSync(modsDir, { recursive: true });
  let state = readState(dir);
  if (state && state.arenaId !== PARTY_SYNC_ID) {
    restoreInstance(dir);
    state = readState(dir);
    if (state) throw new Error("Oldingi arena modlarini qaytarib bo'lmadi (fayl band)");
  }
  if (!state) {
    state = { arenaId: PARTY_SYNC_ID, stashed: [], installed: [] };
    writeState(dir, state);
  }
  const need = /* @__PURE__ */ new Map();
  for (const m of req.mods) if (!need.has(m.sha1)) need.set(m.sha1, m.file);
  const satisfied = /* @__PURE__ */ new Set();
  for (const s of [...state.stashed]) {
    try {
      const from = inside(stashDir, s.stashName);
      if (!fs.existsSync(from)) continue;
      const sha1 = sha1Of(from);
      if (!need.has(sha1) || satisfied.has(sha1)) continue;
      let to = inside(modsDir, s.name);
      if (fs.existsSync(to)) to = inside(modsDir, uniqueStashName(modsDir, s.name));
      fs.renameSync(from, to);
      state.stashed = state.stashed.filter((x) => x !== s);
      satisfied.add(sha1);
    } catch {
    }
  }
  writeState(dir, state);
  const extras = [];
  for (const name of fs.readdirSync(modsDir)) {
    const full = path.join(modsDir, name);
    if (!name.toLowerCase().endsWith(".jar") || !fs.statSync(full).isFile() || isLauncherManagedMod(name, req.loader)) continue;
    const sha1 = sha1Of(full);
    if (need.has(sha1) && !satisfied.has(sha1)) {
      satisfied.add(sha1);
      continue;
    }
    extras.push(name);
  }
  const cacheDir = path.join(cacheRoot(), "mods");
  fs.mkdirSync(cacheDir, { recursive: true });
  const ready = [];
  const toFetch = [];
  for (const sha1 of need.keys()) {
    if (satisfied.has(sha1)) continue;
    const path$1 = path.join(cacheDir, `${sha1}.jar`);
    if (fs.existsSync(path$1) && sha1Of(path$1) === sha1) ready.push({ sha1, path: path$1, name: safeJarName(need.get(sha1) ?? null, sha1, req.loader) });
    else toFetch.push(sha1);
  }
  const unresolved = [];
  if (toFetch.length > 0) {
    onProgress(5);
    const found = await resolveOnModrinth(toFetch);
    let done = 0;
    for (const sha1 of toFetch) {
      const hit = found.get(sha1);
      if (!hit) {
        unresolved.push(need.get(sha1) ?? sha1);
        continue;
      }
      const path2 = await cachedMod({ file: hit.filename, url: hit.url, sha1 }, () => void 0);
      ready.push({ sha1, path: path2, name: safeJarName(hit.filename, sha1, req.loader) });
      done++;
      onProgress(5 + Math.round(done / toFetch.length * 85));
    }
  }
  fs.mkdirSync(stashDir, { recursive: true });
  let stashed = 0;
  for (const name of extras) {
    const full = path.join(modsDir, name);
    const ours = state.installed.some((f) => f.file.toLowerCase() === name.toLowerCase());
    if (ours) {
      try {
        fs.unlinkSync(full);
        state.installed = state.installed.filter((f) => f.file.toLowerCase() !== name.toLowerCase());
      } catch {
      }
      continue;
    }
    const stashName = uniqueStashName(stashDir, name);
    fs.renameSync(full, inside(stashDir, stashName));
    state.stashed.push({ name, stashName });
    stashed++;
    writeState(dir, state);
  }
  for (const r of ready) {
    let dest = inside(modsDir, r.name);
    if (fs.existsSync(dest)) {
      if (sha1Of(dest) === r.sha1) continue;
      dest = inside(modsDir, uniqueStashName(modsDir, r.name));
    }
    fs.copyFileSync(r.path, dest);
    state.installed.push({ file: dest.slice(modsDir.length + 1), sha1: r.sha1 });
    writeState(dir, state);
  }
  writeState(dir, state);
  onProgress(100);
  return { stashed, installed: ready.length, unresolved };
}
const PACK_MAX_BYTES = 200 * 1024 * 1024;
const PACK_OPTIONS_KEY = "resourcePacks:";
const LF = String.fromCharCode(10);
const CR = String.fromCharCode(13);
function isVersionString(v) {
  const parts = v.split(".");
  return parts.length >= 2 && parts.length <= 3 && parts.every((p) => p.length > 0 && !Number.isNaN(Number(p)));
}
function setOptionsResourcePack(dir, packFile, enable) {
  const path$1 = path.join(dir, "options.txt");
  const entry2 = `file/${packFile}`;
  const text = fs.existsSync(path$1) ? fs.readFileSync(path$1, "utf-8") : "";
  const eol = text.includes(CR + LF) ? CR + LF : LF;
  const lines = text.length > 0 ? text.split(LF).map((l) => l.endsWith(CR) ? l.slice(0, -1) : l) : [];
  while (lines.length > 0 && lines[lines.length - 1] === "") lines.pop();
  const idx = lines.findIndex((l) => l.startsWith(PACK_OPTIONS_KEY));
  let list = ["vanilla"];
  if (idx >= 0) {
    try {
      const parsed = JSON.parse(lines[idx].slice(PACK_OPTIONS_KEY.length));
      if (Array.isArray(parsed)) list = parsed.filter((x) => typeof x === "string");
    } catch {
      return false;
    }
  }
  const has = list.includes(entry2);
  if (enable === has) return false;
  list = enable ? [...list, entry2] : list.filter((x) => x !== entry2);
  const line = `${PACK_OPTIONS_KEY}${JSON.stringify(list)}`;
  if (idx >= 0) lines[idx] = line;
  else lines.push(line);
  fs.writeFileSync(path$1, lines.join(eol) + eol);
  return true;
}
async function applyArenaResourcePack(req) {
  if (!ARENA_ID_RE.test(req.arenaId)) throw new Error("Arena identifikatori noto'g'ri");
  if (!isVersionString(req.version)) throw new Error("Arena versiyasi noto'g'ri");
  if (req.loader !== null && req.loader !== "forge" && req.loader !== "fabric" && req.loader !== "quilt") {
    throw new Error("Arena mod-loaderi noto'g'ri");
  }
  if (!req.url.toLowerCase().startsWith("https://")) throw new Error("Resurs to'plami havolasi noto'g'ri");
  if (isRunning()) return false;
  const dir = instanceDir(req.version, req.loader);
  const packsDir = path.join(dir, "resourcepacks");
  fs.mkdirSync(packsDir, { recursive: true });
  const file2 = `mcmodhub-arena-${req.arenaId}.zip`;
  const dest = inside(packsDir, file2);
  const tmp = `${dest}.tmp`;
  const remoteSize = await remoteFileSize(req.url);
  let have = false;
  try {
    have = remoteSize !== null && fs.existsSync(dest) && fs.statSync(dest).size === remoteSize;
  } catch {
  }
  if (!have) {
    try {
      await downloadFileParallel({ url: req.url, dest: tmp, connections: 3, attempts: 3 });
    } catch (err) {
      if (err instanceof DownloadError && err.status === 404) return false;
      throw new Error(`Resurs to'plami yuklanmadi (${err instanceof Error ? err.message : String(err)})`);
    }
    const size = fs.statSync(tmp).size;
    if (size === 0 || size > PACK_MAX_BYTES) {
      fs.rmSync(tmp, { force: true });
      throw new Error("Resurs to'plami hajmi noto'g'ri");
    }
    let hasMeta = false;
    try {
      hasMeta = (await readZipIndex(tmp)).some((e) => e.name === "pack.mcmeta");
    } catch {
      fs.rmSync(tmp, { force: true });
      throw new Error("Resurs to'plami zip emas");
    }
    if (!hasMeta) {
      fs.rmSync(tmp, { force: true });
      throw new Error("Resurs to'plamida pack.mcmeta yo'q");
    }
    fs.renameSync(tmp, dest);
  }
  const added = setOptionsResourcePack(dir, file2, true);
  const state = readState(dir);
  if (state && state.arenaId === req.arenaId) {
    state.resourcePack = { file: file2, addedToOptions: added || state.resourcePack?.addedToOptions === true };
    writeState(dir, state);
  }
  return true;
}
let modLock = Promise.resolve();
function withModLock(fn) {
  const run2 = modLock.catch(() => void 0).then(fn);
  modLock = run2.catch(() => void 0);
  return run2;
}
let restoreTimer = null;
function scheduleRestoreAfterGame(onRestored) {
  cancelRestoreAfterGame();
  restoreTimer = setTimeout(() => {
    restoreTimer = null;
    if (isRunning()) return;
    void withModLock(() => isRunning() ? 0 : restoreUserMods()).then((n) => {
      if (n > 0) onRestored(n);
    }).catch(() => void 0);
  }, 6e3);
}
function cancelRestoreAfterGame() {
  if (restoreTimer) clearTimeout(restoreTimer);
  restoreTimer = null;
}
function restoreUserModsOnStartup() {
  void withModLock(() => restoreUserMods()).catch(() => void 0);
}
function restoreUserMods() {
  if (isRunning()) return 0;
  const root = path.join(gameDir(), "instances");
  if (!fs.existsSync(root)) return 0;
  let restored = 0;
  for (const name of fs.readdirSync(root)) {
    const dir = path.join(root, name);
    try {
      if (fs.statSync(dir).isDirectory() && restoreInstance(dir)) restored++;
    } catch {
    }
  }
  return restored;
}
function arenaPackStatus(version, loader) {
  const state = readState(instanceDir(version, loader));
  return { arenaId: state?.arenaId ?? null };
}
const VAULT_MAGIC = Buffer.from("MCMHARN1");
function vaultPath(arenaId) {
  const dir = path.join(cacheRoot(), "vault");
  fs.mkdirSync(dir, { recursive: true });
  return path.join(dir, `${arenaId}.bin`);
}
function scramble(data, arenaId) {
  const key = crypto.createHash("sha256").update(`mcmodhub-arena-vault:${arenaId}:v1`).digest();
  const iv = crypto.createHash("md5").update(`mcmodhub-arena-iv:${arenaId}`).digest();
  const cipher = crypto.createCipheriv("aes-256-ctr", key, iv);
  return Buffer.concat([cipher.update(data), cipher.final()]);
}
function worldDir(version, loader, world) {
  if (!WORLD_RE.test(world)) throw new Error("Dunyo nomi noto'g'ri");
  const saves = path.join(instanceDir(version, loader), "saves");
  fs.mkdirSync(saves, { recursive: true });
  return inside(saves, world);
}
const BIG_WORLD_BYTES = 150 * 1024 * 1024;
const BIG_VAULT_DIR = ".mcmodhub-vault";
function dirSizeAtLeast(dir, limit) {
  let total = 0;
  const stack = [dir];
  while (stack.length > 0) {
    const cur = stack.pop();
    let names;
    try {
      names = fs.readdirSync(cur);
    } catch {
      continue;
    }
    for (const name of names) {
      const full = path.join(cur, name);
      try {
        const st = fs.statSync(full);
        if (st.isDirectory()) stack.push(full);
        else total += st.size;
      } catch {
      }
      if (total >= limit) return true;
    }
  }
  return total >= limit;
}
function bigVaultPath(version, loader, arenaId) {
  return inside(path.join(instanceDir(version, loader), BIG_VAULT_DIR), arenaId);
}
async function moveDir(from, to) {
  fs.mkdirSync(path.resolve(to, ".."), { recursive: true });
  fs.rmSync(to, { recursive: true, force: true });
  for (let i = 0; ; i++) {
    try {
      fs.renameSync(from, to);
      return;
    } catch (err) {
      const code = err.code ?? "";
      if (["EPERM", "EBUSY", "EACCES"].includes(code) && i < 6) {
        await new Promise((r) => setTimeout(r, 200 * (i + 1)));
        continue;
      }
      break;
    }
  }
  await fs.promises.cp(from, to, { recursive: true });
  fs.rmSync(from, { recursive: true, force: true });
}
async function unvaultWorld(version, loader, arenaId, world) {
  if (!ARENA_ID_RE.test(arenaId)) throw new Error("Arena identifikatori noto'g'ri");
  const dest = worldDir(version, loader, world);
  if (fs.existsSync(path.join(dest, "level.dat"))) return true;
  const big = bigVaultPath(version, loader, arenaId);
  if (fs.existsSync(path.join(big, "level.dat"))) {
    await moveDir(big, dest);
    return fs.existsSync(path.join(dest, "level.dat"));
  }
  const path$1 = vaultPath(arenaId);
  if (!fs.existsSync(path$1)) return false;
  const raw = fs.readFileSync(path$1);
  if (raw.length < VAULT_MAGIC.length || !raw.subarray(0, VAULT_MAGIC.length).equals(VAULT_MAGIC)) return false;
  const zip = new AdmZip(scramble(raw.subarray(VAULT_MAGIC.length), arenaId));
  fs.mkdirSync(dest, { recursive: true });
  for (const entry2 of zip.getEntries()) {
    if (entry2.isDirectory) continue;
    const out = inside(dest, entry2.entryName);
    fs.mkdirSync(path.join(out, ".."), { recursive: true });
    fs.writeFileSync(out, entry2.getData());
  }
  return fs.existsSync(path.join(dest, "level.dat"));
}
async function vaultWorld(version, loader, arenaId, world) {
  if (!ARENA_ID_RE.test(arenaId)) return false;
  const src = worldDir(version, loader, world);
  if (!fs.existsSync(path.join(src, "level.dat"))) return false;
  const big = bigVaultPath(version, loader, arenaId);
  if (dirSizeAtLeast(src, BIG_WORLD_BYTES)) {
    await moveDir(src, big);
    fs.rmSync(vaultPath(arenaId), { force: true });
    return true;
  }
  const zip = new AdmZip();
  zip.addLocalFolder(src);
  const data = Buffer.concat([VAULT_MAGIC, scramble(zip.toBuffer(), arenaId)]);
  const path$1 = vaultPath(arenaId);
  fs.writeFileSync(`${path$1}.tmp`, data);
  fs.renameSync(`${path$1}.tmp`, path$1);
  fs.rmSync(big, { recursive: true, force: true });
  fs.rmSync(src, { recursive: true, force: true });
  return true;
}
function sessionFile() {
  return path.join(cacheRoot(), "session.json");
}
function beginArenaSession(s) {
  if (!ARENA_ID_RE.test(s.arenaId) || !WORLD_RE.test(s.world)) throw new Error("Arena sessiyasi noto'g'ri");
  fs.writeFileSync(sessionFile(), JSON.stringify(s));
}
let finishing = false;
async function finishArenaSession() {
  if (finishing || !fs.existsSync(sessionFile())) return;
  finishing = true;
  try {
    await new Promise((r) => setTimeout(r, 4e3));
    if (isRunning()) return;
    let s;
    try {
      s = JSON.parse(fs.readFileSync(sessionFile(), "utf-8"));
    } catch {
      fs.unlinkSync(sessionFile());
      return;
    }
    try {
      await vaultWorld(s.version, s.loader, s.arenaId, s.world);
    } finally {
      try {
        fs.unlinkSync(sessionFile());
      } catch {
      }
    }
  } catch {
  } finally {
    finishing = false;
  }
}
function recoverArenaSession() {
  void finishArenaSession();
}
const API_BASE = (process.env.MCMODHUB_API_BASE || "https://site.neoterra.uz").replace(/\/+$/, "");
async function fetchTurnIceServers(sessionToken) {
  if (!sessionToken) return null;
  try {
    const res = await fetch(`${API_BASE}/api/lobby/turn-credentials`, {
      method: "POST",
      headers: { Authorization: `Bearer ${sessionToken}` },
      signal: AbortSignal.timeout(15e3)
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!Array.isArray(data.iceServers)) return null;
    return data.iceServers.filter(
      (s) => !!s && typeof s === "object" && (typeof s.urls === "string" || Array.isArray(s.urls))
    );
  } catch {
    return null;
  }
}
const MYMEMORY_BASE = "https://api.mymemory.translated.net/get";
const TARGET_LANG = "uz";
const CONTACT_EMAIL = "noreply@neoterra.uz";
const CONCURRENCY = 5;
function cacheFilePath() {
  return path.join(electron.app.getPath("userData"), "translations-cache.json");
}
let cache = null;
function loadCache() {
  if (cache) return cache;
  try {
    cache = fs.existsSync(cacheFilePath()) ? JSON.parse(fs.readFileSync(cacheFilePath(), "utf-8")) : {};
  } catch {
    cache = {};
  }
  return cache;
}
function saveCache() {
  try {
    fs.writeFileSync(cacheFilePath(), JSON.stringify(cache ?? {}), "utf-8");
  } catch (err) {
    console.error("[translate] kesh saqlanmadi:", err instanceof Error ? err.message : err);
  }
}
function decodeHtmlEntities(s) {
  return s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, " ");
}
async function translateOne(text) {
  try {
    const params = new URLSearchParams({ q: text, langpair: `en|${TARGET_LANG}`, de: CONTACT_EMAIL });
    const res = await fetch(`${MYMEMORY_BASE}?${params.toString()}`, { signal: AbortSignal.timeout(1e4) });
    if (!res.ok) throw new Error(`MyMemory HTTP ${res.status}`);
    const data = await res.json();
    const translated = data.responseData?.translatedText;
    return translated ? decodeHtmlEntities(translated) : text;
  } catch (err) {
    console.error("[translate] tarjima muvaffaqiyatsiz:", err instanceof Error ? err.message : err);
    return text;
  }
}
async function mapWithConcurrency(items, limit, fn) {
  const results = new Array(items.length);
  let next = 0;
  async function worker() {
    while (next < items.length) {
      const i = next++;
      results[i] = await fn(items[i]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}
async function translateBatch(texts) {
  if (texts.length === 0) return texts;
  const c = loadCache();
  const missing = [...new Set(texts.filter((t) => t.trim() && !(t in c)))];
  if (missing.length > 0) {
    const translated = await mapWithConcurrency(missing, CONCURRENCY, translateOne);
    missing.forEach((original, i) => {
      if (translated[i] !== original) c[original] = translated[i];
    });
    saveCache();
  }
  return texts.map((t) => c[t] ?? t);
}
const isWindows = process.platform === "win32";
const SAFE_TARGETS = /* @__PURE__ */ new Set([
  // Epic Games Launcher'ning fondagi brauzer agentlari (launcher'ning o'zi yopilmaydi)
  "epicwebhelper.exe",
  "unrealcefsubprocess.exe",
  // Edge yangilagichi
  "microsoftedgeupdate.exe"
]);
const WORK_APP_TARGETS = /* @__PURE__ */ new Set([
  "chrome.exe",
  "msedge.exe",
  "firefox.exe",
  "opera.exe",
  "spotify.exe",
  "winword.exe",
  "excel.exe",
  "powerpnt.exe"
]);
const NEVER_KILL = /* @__PURE__ */ new Set([
  "java.exe",
  "javaw.exe",
  "minecraft.exe",
  "mcmodhub launcher.exe",
  "mcmodhub-launcher.exe",
  "electron.exe",
  "explorer.exe",
  "csrss.exe",
  "wininit.exe",
  "winlogon.exe",
  "services.exe",
  "lsass.exe",
  "svchost.exe",
  "smss.exe",
  "dwm.exe",
  "system"
]);
function isDiscordJunk(p) {
  return /^discord(ptb|canary)?\.exe$/.test(p.name) && p.cmd.includes("--type=crashpad-handler");
}
function run(file2, args, timeoutMs) {
  return new Promise((resolveRun) => {
    child_process.execFile(file2, args, { windowsHide: true, timeout: timeoutMs, maxBuffer: 16 * 1024 * 1024 }, (_err, stdout) => {
      resolveRun(String(stdout ?? ""));
    });
  });
}
async function listProcesses() {
  const out = await run(
    "powershell.exe",
    [
      "-NoProfile",
      "-NonInteractive",
      "-ExecutionPolicy",
      "Bypass",
      "-Command",
      "Get-CimInstance Win32_Process | Select-Object ProcessId,Name,ExecutablePath,CommandLine | ConvertTo-Json -Compress"
    ],
    2e4
  );
  try {
    const parsed = JSON.parse(out);
    const rows = Array.isArray(parsed) ? parsed : [parsed];
    const list = [];
    for (const r of rows) {
      const pid = Number(r?.ProcessId);
      if (!Number.isInteger(pid) || pid <= 4) continue;
      list.push({
        pid,
        name: String(r.Name ?? "").toLowerCase(),
        path: String(r.ExecutablePath ?? "").toLowerCase(),
        cmd: String(r.CommandLine ?? "").toLowerCase()
      });
    }
    return list;
  } catch {
    return [];
  }
}
async function snipeBackgroundProcesses(aggressive, gamePid) {
  if (!isWindows) return [];
  const protectedPids = /* @__PURE__ */ new Set([process.pid, process.ppid, gamePid ?? -1]);
  const victims = (await listProcesses()).filter((p) => {
    if (protectedPids.has(p.pid) || NEVER_KILL.has(p.name)) return false;
    if (SAFE_TARGETS.has(p.name) || isDiscordJunk(p)) return true;
    return aggressive && WORK_APP_TARGETS.has(p.name);
  });
  if (victims.length === 0) return [];
  for (let i = 0; i < victims.length; i += 40) {
    const chunk = victims.slice(i, i + 40);
    await run("taskkill.exe", ["/F", ...chunk.flatMap((p) => ["/PID", String(p.pid)])], 15e3);
  }
  const names = [...new Set(victims.map((p) => p.name))];
  console.log("[optimizer] yopildi:", names.join(", "));
  return names;
}
const OPTIMIZER_PIPE = "\\\\.\\pipe\\mcmodhub-optimizer";
function purgeStandbyList(timeoutMs = 5e3) {
  if (!isWindows) return Promise.resolve("skipped");
  return new Promise((resolvePurge) => {
    let done = false;
    let buffer = "";
    const finish = (r) => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      socket.destroy();
      resolvePurge(r);
    };
    const socket = net.connect(OPTIMIZER_PIPE);
    const timer = setTimeout(() => finish("failed"), timeoutMs);
    socket.setEncoding("utf8");
    socket.on("connect", () => socket.write('{"cmd":"purge-standby"}\n'));
    socket.on("data", (chunk) => {
      buffer += chunk;
      const nl = buffer.indexOf("\n");
      if (nl === -1 && buffer.length < 4096) return;
      try {
        const reply = JSON.parse(buffer.slice(0, nl === -1 ? void 0 : nl));
        finish(reply.ok === true ? "ok" : "failed");
      } catch {
        finish("failed");
      }
    });
    socket.on("error", (err) => {
      finish(err.code === "ENOENT" ? "service-missing" : "failed");
    });
    socket.on("close", () => finish("failed"));
  });
}
const DEAD_AFTER_MS = 24 * 60 * 60 * 1e3;
const MAX_DEPTH = 12;
async function cleanDir(root, stats, skipNames, depth = 0) {
  if (depth > MAX_DEPTH) return;
  let entries;
  try {
    entries = await promises$1.readdir(root, { withFileTypes: true });
  } catch {
    return;
  }
  const cutoff = Date.now() - DEAD_AFTER_MS;
  for (const entry2 of entries) {
    const full = path.join(root, entry2.name);
    try {
      if (entry2.isSymbolicLink()) continue;
      if (entry2.isDirectory()) {
        await cleanDir(full, stats, skipNames, depth + 1);
        await promises$1.rmdir(full).catch(() => void 0);
        continue;
      }
      if (!entry2.isFile() || skipNames.has(entry2.name.toLowerCase())) continue;
      const st = await promises$1.lstat(full);
      if (st.mtimeMs > cutoff) continue;
      await promises$1.unlink(full);
      stats.files++;
      stats.bytes += st.size;
    } catch {
    }
  }
}
async function gameLogDirs() {
  const root = gameDir();
  const dirs = [path.join(root, "logs")];
  const running2 = runningInstanceDir();
  try {
    for (const entry2 of await promises$1.readdir(path.join(root, "instances"), { withFileTypes: true })) {
      if (!entry2.isDirectory()) continue;
      const inst = path.join(root, "instances", entry2.name);
      if (running2 && path.resolve(inst).toLowerCase() === path.resolve(running2).toLowerCase()) continue;
      dirs.push(path.join(inst, "logs"));
    }
  } catch {
  }
  return dirs;
}
async function cleanJunkFiles() {
  const stats = { files: 0, bytes: 0 };
  if (!isWindows) return stats;
  const windir = process.env.SystemRoot || process.env.windir || "C:\\Windows";
  const systemDirs = [os.tmpdir(), path.join(windir, "Temp"), path.join(windir, "Prefetch")];
  const none = /* @__PURE__ */ new Set();
  for (const dir of [...new Set(systemDirs.map((d) => path.resolve(d)))]) await cleanDir(dir, stats, none);
  const liveLogs = /* @__PURE__ */ new Set(["latest.log", "debug.log"]);
  for (const dir of await gameLogDirs()) await cleanDir(dir, stats, liveLogs);
  return stats;
}
async function flushDns() {
  if (!isWindows) return false;
  const out = await run("ipconfig.exe", ["/flushdns"], 15e3);
  return out.trim().length > 0;
}
let cleaning = null;
function runCleanup(withStandby) {
  if (cleaning) return cleaning;
  cleaning = (async () => {
    const settings = getOptimizationSettings();
    const report = { standby: "skipped", junkFiles: 0, junkBytes: 0, dnsFlushed: false };
    const [standby, junk, dns2] = await Promise.all([
      withStandby ? purgeStandbyList() : Promise.resolve("skipped"),
      settings.cleanJunk ? cleanJunkFiles().catch(() => ({ files: 0, bytes: 0 })) : Promise.resolve({ files: 0, bytes: 0 }),
      settings.refreshNetwork ? flushDns().catch(() => false) : Promise.resolve(false)
    ]);
    report.standby = standby;
    report.junkFiles = junk.files;
    report.junkBytes = junk.bytes;
    report.dnsFlushed = dns2;
    console.log("[optimizer] tozalash:", JSON.stringify(report));
    return report;
  })().finally(() => {
    cleaning = null;
  });
  return cleaning;
}
function onGameStarted(gamePid) {
  if (!isWindows) return;
  const settings = getOptimizationSettings();
  void snipeBackgroundProcesses(settings.closeBackgroundApps, gamePid).catch(() => void 0);
  void runCleanup(false).catch(() => void 0);
}
const UPDATE_BASE_URL = "https://cdn.mcmodhub.org/updates/";
let emitRef = null;
function canAutoUpdate() {
  if (process.platform === "win32") return true;
  if (process.platform === "linux") return Boolean(process.env.APPIMAGE);
  return false;
}
let downloading = false;
let pendingReady = null;
function getPendingUpdate() {
  return pendingReady;
}
let periodicTimer = null;
let autoInstallTimer = null;
let retryTimer = null;
let retryIndex = 0;
const PERIODIC_CHECK_MS = 15 * 6e4;
const RETRY_DELAYS_MS = [3e4, 12e4, 3e5];
function scheduleRetry() {
  if (retryTimer) return;
  const delay = RETRY_DELAYS_MS[Math.min(retryIndex, RETRY_DELAYS_MS.length - 1)];
  retryIndex++;
  retryTimer = setTimeout(() => {
    retryTimer = null;
    runCheck();
  }, delay);
}
function runCheck() {
  if (tryAutoInstall()) return;
  if (downloading) return;
  if (!canAutoUpdate()) {
    void checkManualUpdate();
    return;
  }
  if (pendingReady?.type === "downloaded") {
    void checkNewerThanPending();
    return;
  }
  void electronUpdater.autoUpdater.checkForUpdates().then(() => {
    retryIndex = 0;
  }).catch((err) => {
    console.error("[updater] tekshirish muvaffaqiyatsiz:", err instanceof Error ? err.message : err);
    scheduleRetry();
  });
}
function startUpdateWatch() {
  readAutoInstallMarker();
  setTimeout(runCheck, 5e3);
  if (!periodicTimer) periodicTimer = setInterval(runCheck, PERIODIC_CHECK_MS);
}
let autoInstallGuard = null;
let autoInstallBlockedVersion = null;
let relaunchedAfterUpdate = false;
let markerRead = false;
function markerPath() {
  return path.join(electron.app.getPath("userData"), "update-auto-install.json");
}
function readAutoInstallMarker() {
  if (markerRead) return;
  markerRead = true;
  try {
    const p = markerPath();
    if (!fs.existsSync(p)) return;
    const marker = JSON.parse(fs.readFileSync(p, "utf8"));
    fs.unlinkSync(p);
    if (!marker.version) return;
    if (isNewerVersion(marker.version, electron.app.getVersion())) {
      autoInstallBlockedVersion = marker.version;
      console.warn("[updater] fondagi o'rnatish ishlamadi (hali " + electron.app.getVersion() + ") -", marker.version, "qayta urinilmaydi");
    } else {
      relaunchedAfterUpdate = true;
      console.log("[updater] fonda yangilandi:", electron.app.getVersion());
    }
  } catch (err) {
    console.warn("[updater] marker o'qilmadi:", err instanceof Error ? err.message : err);
  }
}
function wasRelaunchedAfterUpdate() {
  if (electron.app.isPackaged) readAutoInstallMarker();
  return relaunchedAfterUpdate;
}
function setAutoInstallGuard(guard) {
  autoInstallGuard = guard;
}
function tryAutoInstall() {
  if (process.platform !== "win32" || !pendingReady || pendingReady.type !== "downloaded" || !autoInstallGuard) return false;
  if (pendingReady.version === autoInstallBlockedVersion) return false;
  let safe = false;
  try {
    safe = autoInstallGuard();
  } catch {
    safe = false;
  }
  if (!safe) return false;
  console.log("[updater] fonda avtomatik o'rnatish:", pendingReady.version);
  try {
    fs.writeFileSync(markerPath(), JSON.stringify({ version: pendingReady.version, at: Date.now() }));
  } catch {
    return false;
  }
  electronUpdater.autoUpdater.quitAndInstall(true, true);
  return true;
}
function scheduleAutoInstall() {
  if (autoInstallTimer) clearTimeout(autoInstallTimer);
  autoInstallTimer = setTimeout(() => {
    autoInstallTimer = null;
    tryAutoInstall();
  }, 15e3);
}
function initAutoUpdater(emit2) {
  emitRef = emit2;
  electronUpdater.autoUpdater.autoDownload = true;
  electronUpdater.autoUpdater.autoInstallOnAppQuit = true;
  electronUpdater.autoUpdater.requestHeaders = { "Cache-Control": "no-cache" };
  electronUpdater.autoUpdater.on("checking-for-update", () => {
    console.log("[updater] tekshirilmoqda...");
    emit2({ type: "checking" });
  });
  electronUpdater.autoUpdater.on("update-available", (info) => {
    console.log("[updater] yangi versiya topildi:", info.version);
    downloading = true;
    emit2({ type: "available", version: info.version });
  });
  electronUpdater.autoUpdater.on("update-not-available", (info) => {
    console.log("[updater] yangilanish yo'q, joriy eng oxirgisi:", info.version);
    emit2({ type: "not-available" });
  });
  electronUpdater.autoUpdater.on("download-progress", (p) => emit2({ type: "progress", percent: Math.round(p.percent) }));
  electronUpdater.autoUpdater.on("update-downloaded", (info) => {
    console.log("[updater] yuklab bo'ldi:", info.version);
    downloading = false;
    const isNew = pendingReady?.version !== info.version;
    pendingReady = { type: "downloaded", version: info.version };
    if (isNew) emit2({ type: "downloaded", version: info.version });
    scheduleAutoInstall();
  });
  electronUpdater.autoUpdater.on("error", (err) => {
    downloading = false;
    console.error("[updater] XATO:", err);
    emit2({ type: "error", message: err.message });
  });
}
function updateInfoFileName() {
  if (process.platform === "darwin") return "latest-mac.yml";
  if (process.platform === "linux") return "latest-linux.yml";
  return "latest.yml";
}
function isNewerVersion(remote, local) {
  const parse = (v) => v.split(".").map((n) => parseInt(n, 10) || 0);
  const [rMajor = 0, rMinor = 0, rPatch = 0] = parse(remote);
  const [lMajor = 0, lMinor = 0, lPatch = 0] = parse(local);
  if (rMajor !== lMajor) return rMajor > lMajor;
  if (rMinor !== lMinor) return rMinor > lMinor;
  return rPatch > lPatch;
}
function downloadUrlFor(infoFileContent, version) {
  const extension = process.platform === "darwin" ? ".dmg" : process.platform === "linux" ? ".AppImage" : ".exe";
  const arch = process.arch === "arm64" ? "arm64" : "x64";
  const urls = Array.from(infoFileContent.matchAll(/^\s*-?\s*url:\s*(\S+)/gm)).map((m) => m[1]);
  const candidates = urls.filter((u) => u.toLowerCase().endsWith(extension.toLowerCase()));
  const match = candidates.find((u) => u.includes(arch)) ?? candidates[0];
  return match ? `${UPDATE_BASE_URL}${match}` : `${UPDATE_BASE_URL}mcmodhub-launcher-${version}-${arch}${extension}`;
}
async function fetchFeed() {
  const res = await fetch(`${UPDATE_BASE_URL}${updateInfoFileName()}`, {
    signal: AbortSignal.timeout(15e3),
    // Keshdan eski versiya o'qilib qolmasligi uchun - CDN fayllarni uzoq saqlaydi.
    cache: "no-store"
  });
  if (!res.ok) return null;
  const content = await res.text();
  const version = /^version:\s*(\S+)/m.exec(content)?.[1];
  return version ? { content, version } : null;
}
async function checkNewerThanPending() {
  try {
    const feed = await fetchFeed();
    if (!feed || !pendingReady || !isNewerVersion(feed.version, pendingReady.version)) return;
    console.log("[updater] yuklab olinganidan yangiroq versiya:", feed.version);
    await electronUpdater.autoUpdater.checkForUpdates();
  } catch (err) {
    console.log("[updater] tekshirish muvaffaqiyatsiz:", err instanceof Error ? err.message : String(err));
  }
}
async function checkManualUpdate() {
  try {
    const feed = await fetchFeed();
    if (!feed) return;
    const { content, version } = feed;
    if (pendingReady && !isNewerVersion(version, pendingReady.version)) return;
    if (!isNewerVersion(version, electron.app.getVersion())) {
      console.log("[updater] qo'lda tekshirish: yangilanish yo'q");
      return;
    }
    console.log("[updater] qo'lda tekshirish: yangi versiya bor -", version);
    pendingReady = { type: "manual-available", version, downloadUrl: downloadUrlFor(content, version) };
    emitRef?.(pendingReady);
  } catch (err) {
    console.log("[updater] qo'lda tekshirish muvaffaqiyatsiz:", err instanceof Error ? err.message : String(err));
  }
}
function checkForUpdates() {
  if (!canAutoUpdate()) {
    void checkManualUpdate();
    return;
  }
  void electronUpdater.autoUpdater.checkForUpdates().catch((err) => {
    emitRef?.({ type: "error", message: err instanceof Error ? err.message : String(err) });
  });
}
function quitAndInstall() {
  electronUpdater.autoUpdater.quitAndInstall();
}
let trustedOrigin = null;
function setTrustedRendererOrigin(url) {
  try {
    trustedOrigin = new URL(url).origin;
  } catch {
    trustedOrigin = null;
  }
}
function isTrustedUrl(url) {
  if (!url || !trustedOrigin) return false;
  try {
    return new URL(url).origin === trustedOrigin;
  } catch {
    return false;
  }
}
const DENIED_PERMISSIONS = /* @__PURE__ */ new Set([
  "geolocation",
  "notifications",
  "midi",
  "midiSysex",
  "display-capture",
  "idle-detection",
  "window-management",
  "hid",
  "serial",
  "usb"
]);
function registerPermissionHandlers() {
  const ses = electron.session.defaultSession;
  ses.setPermissionRequestHandler((_webContents, permission, callback, details) => {
    if (permission === "media") {
      const mediaTypes = "mediaTypes" in details ? details.mediaTypes ?? [] : [];
      const audioOnly = mediaTypes.length > 0 && mediaTypes.every((t) => t === "audio");
      callback(audioOnly && details.isMainFrame && isTrustedUrl(details.requestingUrl));
      return;
    }
    callback(!DENIED_PERMISSIONS.has(permission));
  });
  ses.setPermissionCheckHandler((_webContents, permission, requestingOrigin, details) => {
    if (permission === "media") {
      return details.mediaType !== "video" && details.isMainFrame && isTrustedUrl(requestingOrigin);
    }
    return !DENIED_PERMISSIONS.has(permission);
  });
}
async function requestMicrophoneAccess() {
  if (process.platform === "darwin") {
    const status = electron.systemPreferences.getMediaAccessStatus("microphone");
    if (status === "granted") return { granted: true, status };
    if (status === "not-determined") {
      const granted = await electron.systemPreferences.askForMediaAccess("microphone");
      return { granted, status: granted ? "granted" : "denied" };
    }
    return { granted: false, status };
  }
  if (process.platform === "win32") {
    const status = electron.systemPreferences.getMediaAccessStatus("microphone");
    return { granted: status !== "denied" && status !== "restricted", status };
  }
  return { granted: true, status: "granted" };
}
const VIRTUAL_ADAPTER = /vethernet|virtualbox|vmware|hyper-v|wsl|docker|loopback|bluetooth|tailscale|zerotier|hamachi|radmin|vpn/i;
const PROTOCOL_1_20_1 = 763;
function localLanAddresses() {
  const out = [];
  for (const [iface, entries] of Object.entries(os.networkInterfaces())) {
    for (const entry2 of entries ?? []) {
      if (entry2.family !== "IPv4" || entry2.internal) continue;
      if (!isPrivateLanEndpoint({ host: entry2.address, port: 25565 })) continue;
      out.push({ address: entry2.address, netmask: entry2.netmask, iface });
    }
  }
  return out.sort((a, b) => Number(VIRTUAL_ADAPTER.test(a.iface)) - Number(VIRTUAL_ADAPTER.test(b.iface)));
}
function hostLanEndpoints(port2) {
  return localLanAddresses().map((a) => ({ host: a.address, port: port2 })).filter(isPrivateLanEndpoint).slice(0, MAX_LAN_ENDPOINTS);
}
function ipToInt(ip) {
  return ip.split(".").reduce((acc, part) => (acc << 8) + Number(part), 0) >>> 0;
}
function sharesSubnet(endpoints) {
  const locals = localLanAddresses();
  return endpoints.some(
    (ep) => locals.some((l) => {
      const mask = ipToInt(l.netmask);
      return (ipToInt(l.address) & mask) === (ipToInt(ep.host) & mask);
    })
  );
}
function varInt(value) {
  const bytes = [];
  let v = value >>> 0;
  do {
    let byte = v & 127;
    v >>>= 7;
    if (v !== 0) byte |= 128;
    bytes.push(byte);
  } while (v !== 0);
  return Buffer.from(bytes);
}
function readVarInt(buf, offset) {
  let value = 0;
  for (let i = 0; i < 5; i++) {
    if (offset + i >= buf.length) return null;
    const byte = buf[offset + i];
    value |= (byte & 127) << 7 * i;
    if ((byte & 128) === 0) return { value, size: i + 1 };
  }
  return null;
}
function packet(id, payload) {
  const body = Buffer.concat([varInt(id), payload]);
  return Buffer.concat([varInt(body.length), body]);
}
function pingMinecraft(endpoint, timeoutMs) {
  return new Promise((resolve) => {
    let settled = false;
    let buffer = Buffer.alloc(0);
    const socket = net.connect({ host: endpoint.host, port: endpoint.port });
    const finish = (ok) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      socket.destroy();
      resolve(ok);
    };
    const timer = setTimeout(() => finish(false), timeoutMs);
    socket.on("connect", () => {
      const host = Buffer.from(endpoint.host, "utf8");
      const port2 = Buffer.alloc(2);
      port2.writeUInt16BE(endpoint.port);
      socket.write(packet(0, Buffer.concat([varInt(PROTOCOL_1_20_1), varInt(host.length), host, port2, varInt(1)])));
      socket.write(packet(0, Buffer.alloc(0)));
    });
    socket.on("data", (chunk) => {
      buffer = Buffer.concat([buffer, chunk]);
      if (buffer.length > 64 * 1024) return finish(false);
      const length = readVarInt(buffer, 0);
      if (!length || buffer.length < length.size + length.value) return;
      const id = readVarInt(buffer, length.size);
      if (!id || id.value !== 0) return finish(false);
      const strLen = readVarInt(buffer, length.size + id.size);
      if (!strLen) return finish(false);
      const start = length.size + id.size + strLen.size;
      try {
        const json = JSON.parse(buffer.toString("utf8", start, start + strLen.value));
        finish(typeof json === "object" && json !== null && typeof json.version === "object");
      } catch {
        finish(false);
      }
    });
    socket.on("error", () => finish(false));
    socket.on("close", () => finish(false));
  });
}
function findReachableLanEndpoint(endpoints, timeoutMs = 2e3) {
  const valid = endpoints.filter(isPrivateLanEndpoint).slice(0, MAX_LAN_ENDPOINTS);
  if (valid.length === 0) return Promise.resolve(null);
  return new Promise((resolve) => {
    let pending = valid.length;
    let done = false;
    for (const endpoint of valid) {
      void pingMinecraft(endpoint, timeoutMs).then((ok) => {
        if (done) return;
        if (ok) {
          done = true;
          resolve(endpoint);
        } else if (--pending === 0) {
          done = true;
          resolve(null);
        }
      });
    }
  });
}
const MAX_ENTRY_CONNS = 8;
const MAX_DIAL_CONNS = 96;
const MAX_WRITE_BACKLOG = 32 * 1024 * 1024;
let emit = () => void 0;
let entry = null;
let entryPort = null;
const conns = /* @__PURE__ */ new Map();
let seq = 0;
function setTunnelEmitter(fn) {
  emit = fn;
}
function countKind(kind) {
  let n = 0;
  for (const c of conns.values()) if (c.kind === kind) n++;
  return n;
}
function track(socket, kind) {
  const id = ++seq;
  conns.set(id, { socket, kind });
  socket.setNoDelay(true);
  socket.setKeepAlive(true, 15e3);
  socket.on("data", (chunk) => {
    if (conns.get(id)?.socket === socket) emit({ type: "data", id, data: chunk });
  });
  const done = () => {
    if (conns.get(id)?.socket !== socket) return;
    conns.delete(id);
    socket.destroy();
    emit({ type: "closed", id });
  };
  socket.on("end", done);
  socket.on("close", done);
  socket.on("error", done);
  return id;
}
function openEntry() {
  if (entry && entryPort !== null) return Promise.resolve(entryPort);
  return new Promise((resolve, reject2) => {
    const server2 = net.createServer((socket) => {
      if (entry !== server2 || countKind("entry") >= MAX_ENTRY_CONNS) {
        socket.destroy();
        return;
      }
      socket.pause();
      const id = track(socket, "entry");
      emit({ type: "accept", id });
    });
    server2.once("error", reject2);
    server2.listen(0, "127.0.0.1", () => {
      const addr = server2.address();
      if (!addr || typeof addr === "string") {
        server2.close();
        reject2(new Error("Tunnel porti ochilmadi"));
        return;
      }
      entry = server2;
      entryPort = addr.port;
      resolve(addr.port);
    });
  });
}
function getEntryPort() {
  return entry ? entryPort : null;
}
function closeEntry() {
  const server2 = entry;
  entry = null;
  entryPort = null;
  server2?.close();
  for (const [id, c] of conns) if (c.kind === "entry") closeConn(id);
}
async function probeEntry(timeoutMs) {
  const port2 = getEntryPort();
  if (port2 === null) return false;
  return pingMinecraft({ host: "127.0.0.1", port: port2 }, timeoutMs);
}
function dial(port2) {
  if (port2 === null) throw new Error("Guruh o'yini ochiq emas");
  if (countKind("dial") >= MAX_DIAL_CONNS) throw new Error("Juda ko'p tunnel ulanishi");
  return track(net.connect({ host: "127.0.0.1", port: port2 }), "dial");
}
function closeAllDials() {
  for (const [id, c] of conns) if (c.kind === "dial") closeConn(id);
}
function write(id, data) {
  const conn = conns.get(id);
  if (!conn || conn.socket.destroyed) return;
  conn.socket.write(Buffer.from(data.buffer, data.byteOffset, data.byteLength));
  if (conn.socket.writableLength > MAX_WRITE_BACKLOG) closeConn(id);
}
function setPaused(id, paused) {
  const conn = conns.get(id);
  if (!conn || conn.socket.destroyed) return;
  if (paused) conn.socket.pause();
  else conn.socket.resume();
}
function closeConn(id) {
  const conn = conns.get(id);
  if (!conn) return;
  conns.delete(id);
  conn.socket.destroy();
  emit({ type: "closed", id });
}
const MODRINTH_API = "https://api.modrinth.com/v2";
const USER_AGENT = "NeoTerraLauncher/1.0 (Minecraft launcher - site.neoterra.uz)";
function isAndroidBuild(name) {
  return /android/i.test(name);
}
function findInstalledE4all(modsDir) {
  if (!fs.existsSync(modsDir)) return null;
  return fs.readdirSync(modsDir).find((f) => /^e4all.*\.jar$/i.test(f) && !isAndroidBuild(f) && !/sources/i.test(f)) ?? null;
}
async function fetchJson(url) {
  const res = await fetch(url, {
    headers: { Accept: "application/json", "User-Agent": USER_AGENT },
    signal: AbortSignal.timeout(2e4)
  });
  if (!res.ok) throw new Error(`Modrinth HTTP ${res.status}`);
  return await res.json();
}
const E4ALL_CACHE_MS = 10 * 6e4;
const e4allCache = /* @__PURE__ */ new Map();
function versionFamily(version) {
  const parts = version.split(".").filter(Boolean);
  if (parts[0] === "1") return parts.slice(0, 2).join(".");
  return parts[0] ?? version;
}
async function fetchE4allVersions(loader, exactVersion) {
  const params = new URLSearchParams({ loaders: JSON.stringify([loader]) });
  if (exactVersion) params.set("game_versions", JSON.stringify([exactVersion]));
  return fetchJson(`${MODRINTH_API}/project/${LAN_TUNNEL_MOD_SLUG}/version?${params}`);
}
async function resolveE4allFile(version, loader) {
  const key = `${version}|${loader}`;
  const hit = e4allCache.get(key);
  if (hit && Date.now() - hit.at < E4ALL_CACHE_MS) return hit.file;
  const exactVersions = await fetchE4allVersions(loader, version);
  let candidates = exactVersions.filter(
    (v) => v.loaders.includes(loader) && v.game_versions.includes(version) && !isAndroidBuild(v.version_number)
  );
  if (candidates.length === 0) {
    const family = versionFamily(version);
    const allVersions = await fetchE4allVersions(loader, null);
    candidates = allVersions.filter(
      (v) => v.loaders.includes(loader) && !isAndroidBuild(v.version_number) && v.game_versions.some((g) => versionFamily(g) === family)
    );
  }
  const ordered = [...candidates.filter((v) => v.version_type === "release"), ...candidates];
  let found = null;
  for (const candidate of ordered) {
    const file2 = candidate.files.find((f) => f.primary && f.filename.endsWith(".jar") && !isAndroidBuild(f.filename)) ?? candidate.files.find((f) => f.filename.endsWith(".jar") && !isAndroidBuild(f.filename) && !/sources/i.test(f.filename));
    if (file2 && file2.hashes.sha512) {
      found = file2;
      break;
    }
  }
  e4allCache.set(key, { at: Date.now(), file: found });
  return found;
}
async function checkE4allSupport(instanceRoot, version, loader) {
  if (!loader) return { ok: false, reason: "vanilla" };
  if (isE4allInstalled(instanceRoot)) return { ok: true };
  try {
    return await resolveE4allFile(version, loader) ? { ok: true } : { ok: false, reason: "unsupported" };
  } catch {
    return { ok: false, reason: "unknown" };
  }
}
function isE4allInstalled(instanceRoot) {
  return findInstalledE4all(path.join(instanceRoot, "mods")) !== null;
}
async function ensureE4allInstalled(instanceRoot, version, loader, emit2) {
  const modsDir = path.join(instanceRoot, "mods");
  fs.mkdirSync(modsDir, { recursive: true });
  for (const f of fs.readdirSync(modsDir)) {
    if (/^e4mc.*\.jar$/i.test(f)) {
      const from = path.join(modsDir, f);
      const to = `${from}.disabled`;
      try {
        if (fs.existsSync(to)) fs.unlinkSync(to);
        fs.renameSync(from, to);
        emit2({ type: "status", message: `${f} o'chirildi (e4all bilan birga ishlamaydi)` });
      } catch (err) {
        throw new Error(`${f} faylini o'chirib bo'lmadi: ${err instanceof Error ? err.message : String(err)}`);
      }
    }
  }
  if (findInstalledE4all(modsDir)) return;
  emit2({ type: "status", message: "e4all modi yuklanmoqda (guruh o'yini uchun)..." });
  const file2 = await resolveE4allFile(version, loader);
  if (!file2) {
    throw new Error(
      `e4all modining ${loader} ${version} versiyasi Modrinth'da topilmadi - guruh o'yini bu versiyada ishlamaydi (Forge/Fabric/Quilt 1.18 va undan yangisini tanlang)`
    );
  }
  const res = await fetch(file2.url, { headers: { "User-Agent": USER_AGENT }, signal: AbortSignal.timeout(12e4) });
  if (!res.ok) throw new Error(`e4all yuklanmadi (HTTP ${res.status})`);
  const bytes = Buffer.from(await res.arrayBuffer());
  const sha512 = crypto.createHash("sha512").update(bytes).digest("hex");
  if (sha512 !== file2.hashes.sha512) throw new Error("e4all fayli buzilgan (sha512 mos kelmadi) - qayta urinib ko'ring");
  const target = path.join(modsDir, file2.filename);
  const temp = `${target}.part`;
  fs.writeFileSync(temp, bytes);
  fs.renameSync(temp, target);
}
function upsertTomlKeys(text, values) {
  const lines = text.length > 0 ? text.split(/\r?\n/) : [];
  const pending = new Map(Object.entries(values));
  const out = lines.map((line) => {
    const match = /^\s*([A-Za-z0-9_]+)\s*=/.exec(line);
    if (match && pending.has(match[1])) {
      const value = pending.get(match[1]);
      pending.delete(match[1]);
      return `${match[1]} = ${value}`;
    }
    return line;
  });
  while (out.length > 0 && out[out.length - 1] === "") out.pop();
  for (const [key, value] of pending) out.push(`${key} = ${value}`);
  return `${out.join("\n")}
`;
}
function writeE4allConfig(instanceRoot) {
  const dir = path.join(instanceRoot, "config", "e4all");
  fs.mkdirSync(dir, { recursive: true });
  const file2 = path.join(dir, "e4all.toml");
  const current2 = fs.existsSync(file2) ? fs.readFileSync(file2, "utf8") : "";
  fs.writeFileSync(
    file2,
    upsertTomlKeys(current2, {
      offlineMode: "true",
      offlineWarningShown: "true",
      welcomeShown: "true",
      hostEnabled: "true",
      dialtonePlayerEnabled: "false"
    })
  );
}
function pickRecentWorld(instanceRoot) {
  const saves = path.join(instanceRoot, "saves");
  if (!fs.existsSync(saves)) return null;
  let best = null;
  for (const name of fs.readdirSync(saves)) {
    const levelDat = path.join(saves, name, "level.dat");
    try {
      const mtime = fs.statSync(levelDat).mtimeMs;
      if (!best || mtime > best.mtime) best = { name, mtime };
    } catch {
    }
  }
  return best?.name ?? null;
}
const CHUNK_BYTES = 256 * 1024;
const MAX_PENDING_CHARS = 64 * 1024;
function safeStat(path2) {
  try {
    return fs.statSync(path2);
  } catch {
    return null;
  }
}
function fileIdentity(st) {
  return `${st.ino}:${st.dev}`;
}
function watchLatestLog(logsDir, opts) {
  fs.mkdirSync(logsDir, { recursive: true });
  const file2 = path.join(logsDir, "latest.log");
  let offset = 0;
  let identity = null;
  let pending = "";
  let decoder = new string_decoder.StringDecoder("utf8");
  let closed = false;
  let reading = false;
  const initial = safeStat(file2);
  if (initial && initial.mtimeMs < opts.sinceMs) {
    offset = initial.size;
    identity = fileIdentity(initial);
  }
  function readNew() {
    if (closed || reading) return;
    reading = true;
    try {
      const st = safeStat(file2);
      if (!st) return;
      const id = fileIdentity(st);
      if (identity !== null && id !== identity || st.size < offset) {
        offset = 0;
        pending = "";
        decoder = new string_decoder.StringDecoder("utf8");
      }
      identity = id;
      if (st.size <= offset) return;
      const fd = fs.openSync(file2, "r");
      let text = "";
      try {
        while (offset < st.size) {
          const length = Math.min(CHUNK_BYTES, st.size - offset);
          const buffer = Buffer.alloc(length);
          const bytesRead = fs.readSync(fd, buffer, 0, length, offset);
          if (bytesRead <= 0) break;
          offset += bytesRead;
          text += decoder.write(buffer.subarray(0, bytesRead));
        }
      } finally {
        fs.closeSync(fd);
      }
      const lines = (pending + text).split(/\r?\n/);
      pending = (lines.pop() ?? "").slice(-MAX_PENDING_CHARS);
      for (const line of lines) {
        if (line.length > 0) opts.onLine(line);
      }
    } catch {
    } finally {
      reading = false;
    }
  }
  let watcher = null;
  try {
    watcher = fs.watch(logsDir, (_event, filename) => {
      if (!filename || String(filename) === "latest.log") readNew();
    });
    watcher.on("error", () => {
    });
  } catch {
    watcher = null;
  }
  const poll = setInterval(readNew, opts.pollMs ?? 1e3);
  readNew();
  return {
    close: () => {
      if (closed) return;
      closed = true;
      clearInterval(poll);
      watcher?.close();
      watcher = null;
    }
  };
}
const ADJECTIVES = ["brave", "calm", "crimson", "frosty", "golden", "lucky", "mossy", "quiet", "rapid", "sunny"];
const NOUNS = ["axolotl", "badger", "creeper", "falcon", "fox", "golem", "otter", "panda", "strider", "wolf"];
const REGIONS = ["eu", "us", "ap"];
function pick(list) {
  return list[crypto.randomInt(list.length)];
}
function randomE4mcDomain() {
  return `${pick(ADJECTIVES)}-${pick(NOUNS)}.${pick(REGIONS)}.e4mc.link`;
}
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function forgeTimestamp(d = /* @__PURE__ */ new Date()) {
  const pad = (n, w = 2) => String(n).padStart(w, "0");
  return `[${pad(d.getDate())}${MONTHS[d.getMonth()]}${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}.${pad(d.getMilliseconds(), 3)}]`;
}
class MockMinecraft {
  constructor(opts) {
    this.opts = opts;
    this.logFile = path.join(opts.gameDir, "logs", "latest.log");
  }
  timers = [];
  logFile;
  running = false;
  exited = false;
  start() {
    if (this.running) return;
    this.running = true;
    const { emit: emit2, role, nick, server: server2 } = this.opts;
    emit2({ type: "status", message: "Fayllar tekshirilmoqda... (simulyatsiya)" });
    const steps = 10;
    for (let i = 1; i <= steps; i++) {
      this.at(i * 160, () => {
        emit2({ type: "progress", task: "mock", current: i, total: steps, percent: Math.round(i / steps * 100) });
      });
    }
    this.at(1800, () => {
      this.rotateLog();
      emit2({ type: "started" });
      emit2({ type: "window-ready" });
      this.log("main/INFO", "cpw.mods.modlauncher.Launcher/MODLAUNCHER", `ModLauncher running: args [--username, ${nick}, --version, 1.20.1, --gameDir, ${this.opts.gameDir}, --launchTarget, forgeclient, --fml.forgeVersion, 47.3.0]`);
      this.log("main/INFO", "net.minecraftforge.fml.loading.moddiscovery.ModDiscoverer/SCAN", "Found mod file e4all-forge-2.1.0.jar of type MOD with provider {mods folder locator}");
    });
    this.at(2600, () => this.log("Render thread/INFO", "minecraft/Minecraft", `Setting user: ${nick}`));
    this.at(3200, () => this.log("Render thread/INFO", "net.minecraftforge.common.ForgeMod/FORGEMOD", "Forge mod loading, version 47.3.0, for MC 1.20.1 with MCP 20230612.114412"));
    this.at(3900, () => this.log("Render thread/INFO", "minecraft/SoundEngine", "Sound engine started"));
    if (role === "host") {
      const domain = randomE4mcDomain();
      this.at(5e3, () => this.log("Server thread/INFO", "minecraft/MinecraftServer", 'Preparing level "NeoTerra Party"'));
      this.at(5800, () => this.log("Server thread/INFO", "minecraft/MinecraftServer", "Preparing start region for dimension minecraft:overworld"));
      this.at(7e3, () => this.log("Render thread/INFO", "minecraft/IntegratedServer", `Started serving on ${49152 + crypto.randomInt(1e4)}`));
      this.at(7400, () => this.log("e4all_minecraft-init/INFO", "e4all/", "broker req: https://broker.e4mc.link/getBestRelay GET"));
      this.at(7600, () => this.log("e4all_minecraft-init/INFO", "e4all/", "relaymap req: https://natives.e4mc.link/relaymap.json GET"));
      this.at(7800, () => this.log("e4all_minecraft-init/INFO", "e4all/", "using relay de"));
      this.at(8200, () => this.log("e4all_minecraft-init/INFO", "e4all/", `Domain assigned: ${domain}`));
      this.at(
        8300,
        () => this.log("Render thread/INFO", "minecraft/ChatComponent", `[System] [CHAT] Local game hosted on domain [${domain}] (click to copy)`)
      );
    } else {
      const target = server2 ? `${server2.host}, ${server2.port}` : "unknown, 25565";
      this.at(5e3, () => this.log("Render thread/INFO", "minecraft/ConnectScreen", `Connecting to ${target}`));
      this.at(6200, () => this.log("Netty Client IO #0/INFO", "net.minecraftforge.network.NetworkHooks/", "Connected to a modded server."));
      this.at(6800, () => this.log("Render thread/INFO", "minecraft/ChatComponent", `[System] [CHAT] ${nick} joined the game`));
    }
  }
  stop(code = 0) {
    if (this.exited) return;
    this.exited = true;
    for (const timer of this.timers) clearTimeout(timer);
    this.timers.length = 0;
    if (this.running && fs.existsSync(this.logFile)) {
      this.log("Render thread/INFO", "minecraft/Minecraft", "Stopping!");
    }
    this.running = false;
    this.opts.emit({ type: "closed", code });
    this.opts.onExit(code);
  }
  at(ms, fn) {
    this.timers.push(
      setTimeout(() => {
        if (!this.exited) fn();
      }, ms)
    );
  }
  /** log4j'ning `OnStartupTriggeringPolicy` xatti-harakati: eski latest.log sanali faylga
      ko'chiriladi va bo'sh yangi fayl yaratiladi. */
  rotateLog() {
    const dir = path.join(this.opts.gameDir, "logs");
    fs.mkdirSync(dir, { recursive: true });
    if (fs.existsSync(this.logFile)) {
      const day = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
      const taken = new Set(fs.readdirSync(dir));
      let n = 1;
      while (taken.has(`${day}-${n}.log`)) n++;
      try {
        fs.renameSync(this.logFile, path.join(dir, `${day}-${n}.log`));
      } catch {
      }
    }
    fs.writeFileSync(this.logFile, "");
  }
  log(thread, logger, message) {
    const line = `${forgeTimestamp()} [${thread}] [${logger}]: ${message}`;
    try {
      fs.appendFileSync(this.logFile, `${line}
`);
    } catch {
    }
    this.opts.emit({ type: "log", line });
  }
}
const NICK_RE$1 = /^[A-Za-z0-9_]{3,16}$/;
function readTarget(req) {
  const version = req.launch.version;
  const loader = req.launch.loader ?? null;
  if (!isGameVersion(version) || loader !== null && !isPartyLoader(loader)) {
    throw new Error("Guruh o'yini versiyasi noto'g'ri");
  }
  return { version, loader };
}
function checkHostSupport(version, loader) {
  if (!isGameVersion(version) || loader !== null && !isPartyLoader(loader)) {
    return Promise.resolve({ ok: false, reason: "unsupported" });
  }
  return checkE4allSupport(instanceDir(version, loader), version, loader);
}
let session = null;
function isBridgeActive() {
  return session !== null;
}
function hostTunnelPort() {
  return session && session.role === "host" && !session.mock ? session.lanPort : null;
}
async function probeLan(lan) {
  const valid = Array.isArray(lan) ? lan.filter(isPrivateLanEndpoint).slice(0, MAX_LAN_ENDPOINTS) : [];
  if (valid.length === 0) return { endpoint: null, sameSubnet: false };
  const endpoint = await findReachableLanEndpoint(valid, 2e3);
  return { endpoint, sameSubnet: endpoint !== null || sharesSubnet(valid) };
}
function endSession(current2, code, reason) {
  if (session !== current2) return;
  session = null;
  current2.watcher?.close();
  current2.watcher = null;
  if (current2.role === "host") closeAllDials();
  else closeEntry();
  current2.emitters.bridge({ type: "ended", role: current2.role, code, reason: current2.stopping ? "stopped" : reason });
}
async function startBridge(req, emitters) {
  if (!req || req.role !== "host" && req.role !== "client" || typeof req.mock !== "boolean" || !req.launch?.profile) {
    throw new Error("Guruh o'yini so'rovi noto'g'ri");
  }
  if (session || isRunning()) throw new Error("O'yin allaqachon ishga tushirilgan");
  const nick = req.launch.profile.nick;
  if (!NICK_RE$1.test(nick)) throw new Error("Minecraft nick noto'g'ri (3-16 belgi, faqat A-Z, 0-9, _)");
  const { version, loader } = readTarget(req);
  if (req.role === "host" && !loader) {
    throw new Error("Guruh o'yini uchun Forge, Fabric yoki Quilt versiyasini tanlang - vanilla'da do'stlar ulana olmaydi");
  }
  let target;
  let route = null;
  if (req.role === "client") {
    const join2 = req.join;
    if (join2?.route === "lan" && isPrivateLanEndpoint(join2.endpoint)) {
      target = { host: join2.endpoint.host, port: join2.endpoint.port };
    } else if (join2?.route === "p2p") {
      const port2 = getEntryPort();
      if (port2 === null) throw new Error("P2P tunnel ochiq emas");
      target = { host: "127.0.0.1", port: port2 };
    } else if (join2?.route === "relay" && isE4mcAddress(req.server)) {
      target = { host: req.server.host, port: req.server.port };
    } else {
      throw new Error("Lider manzili noto'g'ri");
    }
    route = join2.route;
  }
  const role = req.role;
  const current2 = {
    role,
    mock: req.mock,
    watcher: null,
    mockGame: null,
    address: null,
    lanPort: null,
    lastEmittedKey: null,
    worldReady: false,
    stopping: false,
    emitters
  };
  session = current2;
  const sinceMs = Date.now() - 2e3;
  const baseEmit = req.mock ? emitters.launchQuiet : emitters.launch;
  let world = null;
  let autoLanActive = req.mock;
  const emit2 = (e) => {
    baseEmit(e);
    if (session !== current2) return;
    if (e.type === "started") emitters.bridge({ type: "started", role, mock: current2.mock, world, route, autoLan: autoLanActive });
    else if (e.type === "closed") endSession(current2, e.code, "closed");
    else if (e.type === "launch-failed") endSession(current2, null, "failed");
  };
  const gameRoot = req.mock ? path.join(electron.app.getPath("userData"), "bridge-mock", nick) : instanceDir(version, loader);
  if (role === "host") {
    current2.watcher = watchLatestLog(path.join(gameRoot, "logs"), {
      sinceMs,
      onLine: (line) => {
        if (session !== current2) return;
        if (!current2.worldReady && !current2.mock && isHostWorldReadyLine(line, nick)) {
          current2.worldReady = true;
          emitters.bridge({ type: "world-ready", role: "host" });
        }
        const capacity = parseLanCapacity(line);
        if (capacity) emitters.bridge({ type: "lan-capacity", role: "host", raised: capacity.raised, max: capacity.max });
        const port2 = parseLanPort(line);
        if (port2 !== null) current2.lanPort = port2;
        const address = parseE4mcAddress(line);
        if (address) current2.address = address;
        if (port2 === null && !address) return;
        const lan = current2.lanPort !== null ? hostLanEndpoints(current2.lanPort) : [];
        const tunnel = current2.lanPort !== null && !current2.mock;
        const key = `${current2.address?.host ?? ""}|${lan.map((l) => `${l.host}:${l.port}`).join(",")}|${tunnel}`;
        if (key === current2.lastEmittedKey) return;
        current2.lastEmittedKey = key;
        emitters.bridge({ type: "address", role: "host", address: current2.address, lan, tunnel, line });
      }
    });
  }
  try {
    if (route === "relay") {
      baseEmit({
        type: "warning",
        message: "Liderga to'g'ridan-to'g'ri (P2P) ulanib bo'lmadi - e4mc relay orqali ulanilmoqda. Bu yo'l sekinroq va uzilib qolishi mumkin."
      });
    }
    if (req.mock) {
      if (role === "host") world = "NeoTerra Party";
      const mockGame = new MockMinecraft({ gameDir: gameRoot, role, nick, server: target, emit: emit2, onExit: () => void 0 });
      current2.mockGame = mockGame;
      mockGame.start();
      return;
    }
    ensureInstanceDirs(version, loader);
    if (loader) {
      if (role === "host") {
        await ensureE4allInstalled(gameRoot, version, loader, baseEmit);
      } else {
        await ensureE4allInstalled(gameRoot, version, loader, baseEmit).catch(() => void 0);
      }
    }
    if (isE4allInstalled(gameRoot)) writeE4allConfig(gameRoot);
    const maxPlayers = role === "host" ? sanitizeLanMaxPlayers(req.launch.maxPlayers) : null;
    const autoLanReady = supportsAutoLan(version, loader) && ensureAutoLanInstalled(gameRoot, version, loader, maxPlayers !== null);
    const autoOpenLan = role === "host" && autoLanReady;
    autoLanActive = autoOpenLan;
    if (role === "host") world = arenaWorldIfInstalled(gameRoot, req.world) ?? pickRecentWorld(gameRoot);
    if (session !== current2) return;
    await launchGame(
      {
        ...req.launch,
        customVersion: void 0,
        // Lider o'z dunyosini ochadi - hech qayerga ulanmaydi; a'zo liderga ulanadi.
        server: role === "client" ? target : void 0,
        singleplayerWorld: role === "host" ? world ?? void 0 : void 0,
        autoOpenLan,
        // Mod (faqat avtomatik LAN ochilganda ishlaydi) chegarani shu qiymatgacha ko'taradi.
        maxPlayers: autoOpenLan && maxPlayers !== null ? maxPlayers : void 0
      },
      emit2
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (session === current2) {
      baseEmit({ type: "error", message });
      emitters.bridge({ type: "error", role, message });
      endSession(current2, null, "failed");
    }
    throw err;
  }
}
function arenaWorldIfInstalled(gameRoot, world) {
  if (!world || !/^[A-Za-z0-9_]{1,40}$/.test(world)) return null;
  return fs.existsSync(path.join(gameRoot, "saves", world, "level.dat")) ? world : null;
}
async function prewarmBridge(req, emit2) {
  if (!req || req.role !== "client" || req.mock || !req.launch?.profile) return;
  if (session || isRunning()) return;
  if (!NICK_RE$1.test(req.launch.profile.nick)) return;
  const { version, loader } = readTarget(req);
  ensureInstanceDirs(version, loader);
  if (loader) await ensureE4allInstalled(instanceDir(version, loader), version, loader, emit2).catch(() => void 0);
  await launchGame(
    { ...req.launch, customVersion: void 0, server: void 0, singleplayerWorld: void 0, autoOpenLan: false, prepareOnly: true },
    emit2
  );
}
function stopBridge() {
  const current2 = session;
  if (!current2) return;
  current2.stopping = true;
  if (current2.mockGame) {
    current2.mockGame.stop(0);
    return;
  }
  killGame();
  endSession(current2, null, "stopped");
}
let gameActive = false;
let partyActive = false;
let blockerId = null;
let mainWin = null;
function apply() {
  const keepAwake = gameActive || partyActive;
  if (gameActive && blockerId === null) {
    blockerId = electron.powerSaveBlocker.start("prevent-app-suspension");
  } else if (!gameActive && blockerId !== null) {
    if (electron.powerSaveBlocker.isStarted(blockerId)) electron.powerSaveBlocker.stop(blockerId);
    blockerId = null;
  }
  const win = mainWin;
  if (win && !win.isDestroyed()) win.webContents.setBackgroundThrottling(!keepAwake);
}
function sendVisibility$1(win) {
  if (win.isDestroyed()) return;
  win.webContents.send(IPC.WINDOW_VISIBILITY, win.isVisible() && !win.isMinimized());
}
function attachMainWindow(win) {
  mainWin = win;
  const send2 = () => sendVisibility$1(win);
  win.on("show", send2);
  win.on("hide", send2);
  win.on("minimize", send2);
  win.on("restore", send2);
  win.webContents.on("did-finish-load", send2);
  win.on("closed", () => {
    if (mainWin === win) mainWin = null;
  });
  apply();
}
function setGameActive(active2) {
  if (gameActive === active2) return;
  gameActive = active2;
  apply();
}
function setPartyActive(active2) {
  if (partyActive === active2) return;
  partyActive = active2;
  apply();
}
const OAUTH_CALLBACK_PORT = 47824;
const OAUTH_CALLBACK_PATH = "/auth/callback";
const OAUTH_TIMEOUT_MS = 3 * 6e4;
const CODE_RE = /^[A-Za-z0-9._~-]{8,512}$/;
const ALLOWED_HOSTS = /* @__PURE__ */ new Set([`127.0.0.1:${OAUTH_CALLBACK_PORT}`, `localhost:${OAUTH_CALLBACK_PORT}`]);
let current = null;
const HTML_ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
function esc(text) {
  return text.replace(/[&<>"']/g, (c) => HTML_ESCAPES[c]);
}
function renderPage(strings, ok) {
  const title = esc(ok ? strings.successTitle : strings.errorTitle);
  const message = esc(ok ? strings.successMessage : strings.errorMessage);
  const accent = ok ? "#2ECC71" : "#C4614F";
  const glyph = ok ? '<path d="M6 12.5l4 4 8-9" />' : '<path d="M7 7l10 10M17 7L7 17" />';
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="referrer" content="no-referrer">
<title>NeoTerra Launcher</title>
<style>
  html,body{height:100%;margin:0}
  body{display:grid;place-items:center;background:#060A09;color:#EDF1EF;font-family:system-ui,-apple-system,"Segoe UI",sans-serif}
  main{width:min(92vw,380px);padding:36px 28px;text-align:center;background:#0A0D0C;border:1px solid rgba(255,255,255,.10);border-radius:14px;box-shadow:0 20px 60px rgba(0,0,0,.55)}
  .badge{width:56px;height:56px;margin:0 auto 18px;display:grid;place-items:center;border-radius:50%;border:2px solid ${accent};box-shadow:0 0 24px ${accent}55}
  svg{width:28px;height:28px;fill:none;stroke:${accent};stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}
  h1{margin:0 0 8px;font-size:19px;font-weight:600}
  p{margin:0;font-size:14px;line-height:1.5;color:#AFB7B2}
  .brand{display:block;margin-top:26px;font-size:12px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#5A645F}
</style></head>
<body><main>
  <div class="badge"><svg viewBox="0 0 24 24" aria-hidden="true">${glyph}</svg></div>
  <h1>${title}</h1>
  <p>${message}</p>
  <span class="brand">NeoTerra</span>
</main></body></html>`;
}
function respond(res, status, body) {
  res.writeHead(status, {
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "no-store",
    "Referrer-Policy": "no-referrer",
    "X-Content-Type-Options": "nosniff",
    "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'",
    Connection: "close"
  });
  res.end(body);
}
function reject(res, status) {
  respond(res, status, "");
  return null;
}
function handleRequest(req, res, strings) {
  if (!ALLOWED_HOSTS.has(req.headers.host ?? "")) return reject(res, 421);
  if (req.method !== "GET") return reject(res, 405);
  let url;
  try {
    url = new URL(req.url ?? "/", `http://127.0.0.1:${OAUTH_CALLBACK_PORT}`);
  } catch {
    return reject(res, 400);
  }
  if (url.pathname !== OAUTH_CALLBACK_PATH) return reject(res, 404);
  const error = url.searchParams.get("error");
  if (error) {
    respond(res, 200, renderPage(strings, false));
    const description = url.searchParams.get("error_description") ?? error;
    const rawCode = url.searchParams.get("error_code");
    const providerCode = rawCode && /^[a-z0-9_]{1,64}$/.test(rawCode) ? rawCode : void 0;
    return {
      ok: false,
      reason: error === "access_denied" ? "denied" : "failed",
      message: description.slice(0, 300),
      ...providerCode ? { providerCode } : {}
    };
  }
  const code = url.searchParams.get("code");
  if (code && CODE_RE.test(code)) {
    respond(res, 200, renderPage(strings, true));
    return { ok: true, code };
  }
  return reject(res, 400);
}
function beginOAuthCallback(strings) {
  cancelOAuthCallback();
  return new Promise((resolveBegin) => {
    let done = false;
    let resolveResult;
    const result = new Promise((resolve) => {
      resolveResult = resolve;
    });
    const server2 = http.createServer((req, res) => {
      const outcome = handleRequest(req, res, strings);
      if (outcome) finish(outcome);
    });
    const timer = setTimeout(() => finish({ ok: false, reason: "timeout" }), OAUTH_TIMEOUT_MS);
    function finish(r) {
      if (done) return;
      done = true;
      clearTimeout(timer);
      resolveResult(r);
      server2.close();
      setTimeout(() => server2.closeAllConnections(), 300);
    }
    server2.on("error", (err) => {
      finish({ ok: false, reason: "failed", message: err.message });
      resolveBegin({ ok: false, reason: err.code === "EADDRINUSE" ? "port-busy" : "failed" });
    });
    server2.listen(OAUTH_CALLBACK_PORT, "127.0.0.1", () => {
      current = { result, cancel: () => finish({ ok: false, reason: "cancelled" }) };
      resolveBegin({ ok: true });
    });
  });
}
function awaitOAuthCallback() {
  return current ? current.result : Promise.resolve({ ok: false, reason: "not-started" });
}
function cancelOAuthCallback() {
  current?.cancel();
}
const DEFAULT_MASCOT_HOTKEY = "Ctrl+S";
const MODIFIER_ORDER = ["Ctrl", "Alt", "Shift", "Command"];
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const DIGITS = "0123456789".split("");
const F_KEYS = Array.from({ length: 24 }, (_, i) => `F${i + 1}`);
const OTHER_KEYS = [
  "Space",
  "Tab",
  "Backspace",
  "Delete",
  "Insert",
  "Home",
  "End",
  "PageUp",
  "PageDown",
  "Up",
  "Down",
  "Left",
  "Right",
  "Enter",
  "num0",
  "num1",
  "num2",
  "num3",
  "num4",
  "num5",
  "num6",
  "num7",
  "num8",
  "num9",
  "numadd",
  "numsub",
  "nummult",
  "numdiv",
  "numdec",
  "-",
  "=",
  "[",
  "]",
  "\\",
  ";",
  "'",
  ",",
  ".",
  "/",
  "`"
];
const MAIN_KEYS = /* @__PURE__ */ new Set([...LETTERS, ...DIGITS, ...F_KEYS, ...OTHER_KEYS]);
const RESERVED = /* @__PURE__ */ new Set([
  "Ctrl+C",
  "Ctrl+V",
  "Ctrl+X",
  "Ctrl+Z",
  "Ctrl+Y",
  "Ctrl+A",
  "Ctrl+Shift+Z",
  "Alt+F4",
  "Alt+Tab",
  "Alt+Shift+Tab",
  "Alt+Space",
  "Ctrl+Alt+Delete",
  "Ctrl+Alt+Tab",
  "Command+C",
  "Command+V",
  "Command+X",
  "Command+Z",
  "Command+A",
  "Command+Q",
  "Command+W",
  "Command+Tab",
  "Command+Space",
  "Command+H",
  "Command+M",
  "Command+Shift+Z",
  // Windows F12 ni har doim tuzatuvchi (debugger) uchun saqlaydi - ulanmaydi
  "F12"
]);
function parseMascotHotkey(raw, mac) {
  if (typeof raw !== "string" || raw.length === 0 || raw.length > 40) return { ok: false, error: "invalid" };
  const parts = raw.split("+");
  if (parts.some((p) => p.length === 0)) return { ok: false, error: "invalid" };
  const main = parts[parts.length - 1];
  const mods = /* @__PURE__ */ new Set();
  for (const p of parts.slice(0, -1)) {
    if (p === "Super" || p === "Meta" || p === "Win") return { ok: false, error: "winKey" };
    if (!MODIFIER_ORDER.includes(p) || mods.has(p)) return { ok: false, error: "invalid" };
    mods.add(p);
  }
  if (mods.has("Command") && !mac) return { ok: false, error: "winKey" };
  if (!MAIN_KEYS.has(main)) return { ok: false, error: "invalid" };
  const isF = F_KEYS.includes(main);
  const strong = mods.has("Ctrl") || mods.has("Alt") || mods.has("Command");
  if (!strong && !isF) return { ok: false, error: "needsModifier" };
  const key = [...MODIFIER_ORDER.filter((m) => mods.has(m)), main].join("+");
  if (RESERVED.has(key)) return { ok: false, error: "reserved" };
  return { ok: true, key };
}
function formatMascotHotkey(key) {
  return key.split("+").map((p) => {
    if (/^num\d$/.test(p)) return `Num ${p.slice(3)}`;
    const numOps = { numadd: "Num +", numsub: "Num -", nummult: "Num *", numdiv: "Num /", numdec: "Num ." };
    return numOps[p] ?? p;
  }).join(" + ");
}
const UUID_RE$1 = /^[0-9a-fA-F-]{32,36}$/;
const TOKEN_RE = /^[\x21-\x7e]{1,8192}$/;
const cleanToken = (v) => typeof v === "string" && TOKEN_RE.test(v) ? v : null;
function parseLaunchExtras(raw) {
  if (!raw || typeof raw !== "object") return null;
  const r = raw;
  if (typeof r.requestId !== "number" || !Number.isSafeInteger(r.requestId)) return null;
  return {
    requestId: r.requestId,
    userId: typeof r.userId === "string" && UUID_RE$1.test(r.userId) ? r.userId : null,
    sessionToken: cleanToken(r.sessionToken),
    uiToken: cleanToken(r.uiToken)
  };
}
function mergeLaunchExtras(profile, extras) {
  const saved = profile.cosmetics ?? null;
  if (!saved) {
    return { cosmetics: null, uiToken: extras?.uiToken ?? null, note: "kosmetika sozlamasi hali eslab qolinmagan" };
  }
  if (!extras) return { cosmetics: { ...saved, sessionToken: null }, uiToken: null, note: "maskot oynasi javob bermadi" };
  if (extras.userId !== saved.userId) {
    return { cosmetics: { ...saved, userId: null, slots: {}, sessionToken: null }, uiToken: null, note: "akkaunt mos kelmadi" };
  }
  return { cosmetics: { ...saved, sessionToken: extras.sessionToken }, uiToken: extras.uiToken, note: null };
}
const NICK_RE = /^[A-Za-z0-9_]{3,16}$/;
const UUID_RE = /^[0-9a-fA-F-]{32,36}$/;
const ANON_KEY_RE = /^[A-Za-z0-9._-]{20,1000}$/;
const SLOT_TYPES = ["cape", "wings", "pet", "accessory", "avatar", "emote"];
const file = () => path.join(electron.app.getPath("userData"), "settings.json");
function isHttpsUrl(value) {
  if (value.length > 200) return false;
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}
function sanitizeCosmetics(raw) {
  if (!raw || typeof raw !== "object") return null;
  const r = raw;
  if (typeof r.supabaseUrl !== "string" || !isHttpsUrl(r.supabaseUrl)) return null;
  if (typeof r.supabaseAnonKey !== "string" || !ANON_KEY_RE.test(r.supabaseAnonKey)) return null;
  const slots = {};
  if (r.slots && typeof r.slots === "object" && !Array.isArray(r.slots)) {
    const src = r.slots;
    for (const type of SLOT_TYPES) {
      const id = src[type];
      if (typeof id === "string" && id.length > 0 && id.length < 200) slots[type] = id;
    }
  }
  return {
    supabaseUrl: r.supabaseUrl,
    supabaseAnonKey: r.supabaseAnonKey,
    userId: typeof r.userId === "string" && UUID_RE.test(r.userId) ? r.userId : null,
    slots
  };
}
function sanitizeLaunch(raw) {
  if (!raw || typeof raw !== "object") return null;
  const r = raw;
  if (typeof r.nick !== "string" || !NICK_RE.test(r.nick)) return null;
  const ramMax = Number(r.ramMax);
  if (!Number.isFinite(ramMax) || ramMax < 1 || ramMax > 64) return null;
  return {
    nick: r.nick,
    uuid: typeof r.uuid === "string" && UUID_RE.test(r.uuid) ? r.uuid : null,
    ramMax,
    fpsBoost: r.fpsBoost !== false,
    skinUrl: typeof r.skinUrl === "string" && /^https:\/\//.test(r.skinUrl) ? r.skinUrl : void 0,
    companionId: typeof r.companionId === "string" && /^[A-Za-z0-9_-]{1,64}$/.test(r.companionId) ? r.companionId : null,
    cosmetics: sanitizeCosmetics(r.cosmetics)
  };
}
function load$1() {
  try {
    if (fs.existsSync(file())) {
      const raw = JSON.parse(fs.readFileSync(file(), "utf-8"));
      return {
        username: typeof raw.username === "string" && raw.username.trim() ? raw.username.trim() : null,
        lastGreetingDate: typeof raw.lastGreetingDate === "string" ? raw.lastGreetingDate : null,
        launch: sanitizeLaunch(raw.launch),
        // STANDART: o'chiq. Faqat foydalanuvchi o'zi yoqqan (mascotOptIn) va yoqiq qolgan bo'lsagina ishlaydi.
        mascotEnabled: raw.mascotOptIn === true && raw.mascotEnabled === true,
        mascotOptIn: raw.mascotOptIn === true,
        mascotHotkey: readHotkey(raw.mascotHotkey)
      };
    }
  } catch {
  }
  return { username: null, lastGreetingDate: null, launch: null, mascotEnabled: false, mascotOptIn: false, mascotHotkey: null };
}
function readHotkey(raw) {
  if (raw == null) return null;
  const parsed = parseMascotHotkey(raw, process.platform === "darwin");
  return parsed.ok ? parsed.key : null;
}
function save$1(next) {
  try {
    fs.mkdirSync(path.dirname(file()), { recursive: true });
    let rest = {};
    try {
      if (fs.existsSync(file())) {
        const raw = JSON.parse(fs.readFileSync(file(), "utf-8"));
        if (raw && typeof raw === "object" && !Array.isArray(raw)) rest = raw;
      }
    } catch {
    }
    fs.writeFileSync(file(), JSON.stringify({ ...rest, ...next }, null, 2), "utf-8");
  } catch {
  }
}
function today() {
  const d = /* @__PURE__ */ new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
function setMascotUsername(username) {
  const s = load$1();
  const name = username?.trim() || null;
  if (s.username === name) return;
  save$1({ ...s, username: name });
}
function takeDailyGreeting() {
  const s = load$1();
  const day = today();
  if (s.lastGreetingDate === day) return null;
  save$1({ ...s, lastGreetingDate: day });
  return s.username ? `Salom qandaysiz, ${s.username}!` : "Salom qandaysiz!";
}
function rememberLaunchProfile(raw) {
  const next = sanitizeLaunch(raw);
  if (!next) return;
  const s = load$1();
  if (JSON.stringify(s.launch) === JSON.stringify(next)) return;
  save$1({ ...s, launch: next });
}
function getLaunchProfile() {
  return load$1().launch;
}
function getMascotEnabled() {
  return load$1().mascotEnabled;
}
function setMascotEnabledSetting(enabled) {
  const s = load$1();
  if (s.mascotEnabled === enabled && s.mascotOptIn) return;
  save$1({ ...s, mascotEnabled: enabled, mascotOptIn: true });
}
function getMascotHotkey() {
  return load$1().mascotHotkey;
}
function setMascotHotkeySetting(key) {
  const s = load$1();
  if (s.mascotHotkey === key) return;
  save$1({ ...s, mascotHotkey: key });
}
const COLLAPSED = { width: 150, height: 176 };
const EXPANDED = { width: 310, height: 418 };
const EDGE_MARGIN = 8;
const SCREEN_GAP = 5;
const MASCOT_INSET = { left: 34, right: 33, top: 82, bottom: 16 };
const PANEL_SIZE = { width: 246, height: 323 };
const MENU_ROW = 53;
let menuExtraRows = 0;
const expandedSize = () => ({
  width: EXPANDED.width,
  height: EXPANDED.height + menuExtraRows * MENU_ROW
});
const panelSize = () => ({
  width: PANEL_SIZE.width,
  height: PANEL_SIZE.height + menuExtraRows * MENU_ROW
});
const PANEL_OFFSET = { x: 30, bottom: 12, top: 79 };
const TICK_MS = 50;
const DRAG_TICK_MS = 16;
const FLING_MIN_SPEED = 0.6;
const FLING_FRICTION = 0.95;
const FLING_BOUNCE = 0.6;
const FLING_MAX_STEP = 70;
const WATCHDOG_MS = 1500;
const EXTRAS_TIMEOUT_MS = 8e3;
const BUBBLE_ROOM = 64;
const BUBBLE_BELOW_UNDER = 72;
const BUBBLE_ABOVE_FROM = 78;
const HIDE_ANIM_MS = 420;
const FALLBACK_KEYS = ["Alt+End", "Ctrl+Alt+M"];
const CAPTURE_MAX_MS = 3e4;
const HOTKEY_RETRY_MS = 3e4;
const HINT_DELAY_MS = 350;
const HINT_LEAVE_PAD = 10;
const HINT_BUBBLE_SLACK_MS = 3e3;
const keyName = (key) => formatMascotHotkey(key);
const keyLabel = (key) => `${keyName(key)} ${key.includes("+") ? "tugmalari" : "tugmasi"}`;
let primaryKeyCache = null;
function primaryKey() {
  if (primaryKeyCache === null) primaryKeyCache = getMascotHotkey() ?? DEFAULT_MASCOT_HOTKEY;
  return primaryKeyCache;
}
const toggleKeys = () => [primaryKey(), ...FALLBACK_KEYS.filter((k) => k !== primaryKey())];
const hotkeyNoneText = () => `${keyLabel(primaryKey())} band: maskotni tugma bilan yopib bo'lmaydi`;
const hotkeyFallbackText = (key) => `${keyLabel(primaryKey())} band. Maskotni ${keyLabel(key)} bilan yopish va ochish mumkin`;
let mascotWindow = null;
let home = null;
let expanded = false;
let gameRunning = false;
let userHidden = false;
let hideTimer = null;
let activeKey = null;
let hotkeyLabelRaw = void 0;
const hotkeyLabelNow = () => hotkeyLabelRaw === void 0 ? primaryKey() : hotkeyLabelRaw;
let captureSuspended = false;
let captureTimer = null;
let hotkeyTriedAt = 0;
let hotkeyNotice = null;
let hotkeyWarned = false;
let rendererReady = false;
let mascotEnabled = null;
let disableTimer = null;
let revealOnReady = false;
let hintShown = false;
let hintOverSince = 0;
let realBubbleUntil = 0;
let bubbleRoom = false;
let bubbleBelow = false;
let lastSpace = null;
let tickTimer = null;
let dragTimer = null;
let flingTimer = null;
let watchdogTimer = null;
let quitting$1 = false;
let lastRendererUrl = null;
let dragSamples = [];
const positionFile = () => path.join(electron.app.getPath("userData"), "mascot.json");
const mascotPageUrl = (rendererUrl) => new URL("mascot.html", rendererUrl).toString();
function workAreaFor(rect) {
  return electron.screen.getDisplayMatching(rect).workArea;
}
function clampInside(rect, inset, gap) {
  const wa = workAreaFor(rect);
  const minX = wa.x - inset.left + gap;
  const maxX = wa.x + wa.width - rect.width + inset.right - gap;
  const minY = wa.y - inset.top + gap;
  const maxY = wa.y + wa.height - rect.height + inset.bottom - gap;
  return {
    ...rect,
    x: Math.round(Math.min(Math.max(rect.x, minX), maxX)),
    y: Math.round(Math.min(Math.max(rect.y, minY), maxY))
  };
}
function collapsedSize() {
  return { width: COLLAPSED.width, height: COLLAPSED.height + (bubbleRoom ? BUBBLE_ROOM : 0) };
}
function clampCollapsed(rect) {
  return { ...clampInside({ ...rect, ...COLLAPSED }, MASCOT_INSET, SCREEN_GAP), ...collapsedSize() };
}
function defaultHome() {
  const wa = electron.screen.getPrimaryDisplay().workArea;
  return {
    x: wa.x + wa.width - COLLAPSED.width - EDGE_MARGIN,
    y: wa.y + wa.height - COLLAPSED.height - EDGE_MARGIN
  };
}
function loadHome() {
  try {
    const saved = JSON.parse(fs.readFileSync(positionFile(), "utf8"));
    if (typeof saved.x === "number" && typeof saved.y === "number") {
      const r = clampCollapsed({ x: saved.x, y: saved.y, ...COLLAPSED });
      return { x: r.x, y: r.y };
    }
  } catch {
  }
  return defaultHome();
}
function saveHome() {
  if (!home) return;
  try {
    fs.writeFileSync(positionFile(), JSON.stringify(home));
  } catch {
  }
}
function collapsedBounds() {
  const h = home ?? defaultHome();
  return { ...h, ...collapsedSize() };
}
function expandedLayout() {
  const c = { ...home ?? defaultHome(), ...COLLAPSED };
  const wa = workAreaFor(c);
  const EXP = expandedSize();
  const PANEL = panelSize();
  const anchor = {
    h: c.x + c.width / 2 > wa.x + wa.width / 2 ? "right" : "left",
    v: c.y + c.height / 2 > wa.y + wa.height / 2 ? "bottom" : "top"
  };
  const panelInset = {
    left: anchor.h === "left" ? PANEL_OFFSET.x : EXP.width - PANEL_OFFSET.x - PANEL.width,
    right: anchor.h === "right" ? PANEL_OFFSET.x : EXP.width - PANEL_OFFSET.x - PANEL.width,
    top: anchor.v === "top" ? PANEL_OFFSET.top : EXP.height - PANEL_OFFSET.bottom - PANEL.height,
    bottom: anchor.v === "bottom" ? PANEL_OFFSET.bottom : EXP.height - PANEL_OFFSET.top - PANEL.height
  };
  const bounds = clampInside(
    {
      width: EXP.width,
      height: EXP.height,
      x: anchor.h === "right" ? c.x + c.width - EXP.width : c.x,
      y: anchor.v === "bottom" ? c.y + c.height - EXP.height : c.y
    },
    panelInset,
    0
  );
  return { bounds, anchor };
}
function computeBubbleSpace(b) {
  const wa = workAreaFor(b);
  const roomAbove = MASCOT_INSET.top - Math.max(0, wa.y - b.y);
  const below = bubbleBelow ? roomAbove < BUBBLE_ABOVE_FROM : roomAbove < BUBBLE_BELOW_UNDER;
  return {
    below,
    left: Math.max(0, wa.x - b.x),
    right: Math.min(b.width, wa.x + wa.width - b.x)
  };
}
function syncBubbleSpace(win, rect, force = false) {
  if (win.isDestroyed()) return;
  const space = computeBubbleSpace(rect ?? win.getBounds());
  bubbleBelow = space.below;
  const prev = lastSpace;
  if (!force && prev && prev.below === space.below && prev.left === space.left && prev.right === space.right) return;
  lastSpace = space;
  win.webContents.send(IPC.MASCOT_BUBBLE_SPACE, space);
}
function sendVisibility(win, visible) {
  const v = { visible };
  if (!win.isDestroyed()) win.webContents.send(IPC.MASCOT_VISIBILITY, v);
}
function cursorOverMascot(p, b, pad) {
  return p.x >= b.x + MASCOT_INSET.left - pad && p.x <= b.x + b.width - MASCOT_INSET.right + pad && p.y >= b.y + MASCOT_INSET.top - pad && p.y <= b.y + COLLAPSED.height - MASCOT_INSET.bottom + pad;
}
function hintText() {
  const hotkeyLabel = hotkeyLabelNow();
  if (!hotkeyLabel) return null;
  return `Meni o'chirish yoki yoqish uchun ${keyName(hotkeyLabel)} ni${hotkeyLabel.includes("+") ? " birga" : ""} bos`;
}
function showHint(win) {
  const text = hintText();
  if (!text) return;
  hintShown = true;
  syncBubbleSpace(win, void 0, true);
  const bubble = { kind: "info", text, durationMs: 0 };
  win.webContents.send(IPC.MASCOT_BUBBLE, bubble);
}
function hideHint(win) {
  hintShown = false;
  if (win.isDestroyed()) return;
  const close = { kind: "info", text: "", durationMs: 0 };
  win.webContents.send(IPC.MASCOT_BUBBLE, close);
}
function updateHint(win, p, b) {
  const eligible = !expanded && !dragTimer && !flingTimer && !userHidden && !gameRunning && rendererReady && isMascotEnabled();
  const over = eligible && cursorOverMascot(p, b, hintShown ? HINT_LEAVE_PAD : 0);
  if (!over) {
    hintOverSince = 0;
    if (hintShown) hideHint(win);
    return;
  }
  const now = Date.now();
  if (!hintOverSince) hintOverSince = now;
  if (!hintShown && now - hintOverSince >= HINT_DELAY_MS && now >= realBubbleUntil) showHint(win);
}
function startTicks() {
  if (tickTimer) return;
  let lastIdleSent = -1;
  let last = { x: NaN, y: NaN };
  tickTimer = setInterval(() => {
    const win = mascotWindow;
    if (!win || win.isDestroyed() || !win.isVisible()) return;
    const p = electron.screen.getCursorScreenPoint();
    const b = win.getBounds();
    updateHint(win, p, b);
    const idle = electron.powerMonitor.getSystemIdleTime();
    if (p.x === last.x && p.y === last.y && idle === lastIdleSent) return;
    last = p;
    lastIdleSent = idle;
    const tick = { cx: p.x - b.x, cy: p.y - b.y, sx: p.x, sy: p.y, idle };
    win.webContents.send(IPC.MASCOT_TICK, tick);
  }, TICK_MS);
}
function stopTicks() {
  if (tickTimer) clearInterval(tickTimer);
  tickTimer = null;
}
function stopDrag() {
  if (dragTimer) clearInterval(dragTimer);
  dragTimer = null;
}
function stopFling() {
  if (flingTimer) clearInterval(flingTimer);
  flingTimer = null;
}
function sendFlight(win, flight) {
  if (!win.isDestroyed()) win.webContents.send(IPC.MASCOT_FLIGHT, flight);
}
function settleAt(win) {
  const b = clampCollapsed(win.getBounds());
  win.setBounds(b);
  home = { x: b.x, y: b.y };
  saveHome();
  syncBubbleSpace(win, b);
}
function startFling(win, vx, vy) {
  stopFling();
  const start = win.getBounds();
  let x = start.x;
  let y = start.y;
  sendFlight(win, { phase: "start", vx, vy });
  flingTimer = setInterval(() => {
    if (win.isDestroyed()) return stopFling();
    const wa = workAreaFor({ ...COLLAPSED, x: Math.round(x), y: Math.round(y) });
    x += vx;
    y += vy;
    let bounced = false;
    const minX = wa.x - MASCOT_INSET.left + SCREEN_GAP;
    const minY = wa.y - MASCOT_INSET.top + SCREEN_GAP;
    const maxX = wa.x + wa.width - COLLAPSED.width + MASCOT_INSET.right - SCREEN_GAP;
    const maxY = wa.y + wa.height - COLLAPSED.height + MASCOT_INSET.bottom - SCREEN_GAP;
    if (x < minX || x > maxX) {
      x = x < minX ? minX : maxX;
      vx = -vx * FLING_BOUNCE;
      bounced = true;
    }
    if (y < minY || y > maxY) {
      y = y < minY ? minY : maxY;
      vy = -vy * FLING_BOUNCE;
      bounced = true;
    }
    vx *= FLING_FRICTION;
    vy *= FLING_FRICTION;
    const rect = { ...collapsedSize(), x: Math.round(x), y: Math.round(y) };
    win.setBounds(rect);
    syncBubbleSpace(win, rect);
    if (bounced && Math.hypot(vx, vy) > 3) sendFlight(win, { phase: "bounce", vx, vy });
    if (Math.hypot(vx, vy) < 0.6) {
      stopFling();
      settleAt(win);
      sendFlight(win, { phase: "end", vx: 0, vy: 0 });
    }
  }, DRAG_TICK_MS);
}
function startWatchdog() {
  if (watchdogTimer) return;
  watchdogTimer = setInterval(() => {
    if (gameRunning || quitting$1 || !isMascotEnabled()) return;
    const win = mascotWindow;
    if (!win || win.isDestroyed()) {
      if (lastRendererUrl) createMascotWindow(lastRendererUrl);
      return;
    }
    maintainHotkey();
    if (userHidden) return;
    if (win.isMinimized()) win.restore();
    if (!win.isVisible()) win.showInactive();
    win.setAlwaysOnTop(true, "screen-saver");
    win.moveTop();
    if (!expanded && !dragTimer && !flingTimer) {
      const b = win.getBounds();
      const c = clampCollapsed(collapsedBounds());
      if (b.x !== c.x || b.y !== c.y || b.width !== c.width || b.height !== c.height) {
        home = { x: c.x, y: c.y };
        win.setBounds(c);
        syncBubbleSpace(win, c);
      }
    }
  }, WATCHDOG_MS);
}
function stopWatchdog() {
  if (watchdogTimer) clearInterval(watchdogTimer);
  watchdogTimer = null;
}
function createMascotWindow(rendererUrl) {
  lastRendererUrl = rendererUrl;
  if (!isMascotEnabled()) return;
  if (mascotWindow && !mascotWindow.isDestroyed()) return;
  home = loadHome();
  expanded = false;
  const win = new electron.BrowserWindow({
    ...collapsedBounds(),
    show: false,
    frame: false,
    transparent: true,
    backgroundColor: "#00000000",
    hasShadow: false,
    resizable: false,
    maximizable: false,
    minimizable: false,
    fullscreenable: false,
    skipTaskbar: true,
    alwaysOnTop: true,
    title: "NeoTerra Mascot",
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      sandbox: false,
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  mascotWindow = win;
  rendererReady = false;
  win.setAlwaysOnTop(true, "screen-saver");
  win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  win.once("ready-to-show", () => {
    if (!gameRunning && !userHidden) win.showInactive();
  });
  win.on("close", (e) => {
    if (!quitting$1) e.preventDefault();
  });
  win.on("minimize", () => {
    if (!gameRunning) win.restore();
  });
  win.on("hide", () => {
    if (!gameRunning && !quitting$1 && !userHidden) {
      setTimeout(() => !win.isDestroyed() && !gameRunning && !userHidden && win.showInactive(), 300);
    }
  });
  win.webContents.on("render-process-gone", () => {
    rendererReady = false;
    settleExtras(null);
    lastSpace = null;
    if (!win.isDestroyed()) win.loadURL(mascotPageUrl(rendererUrl));
  });
  win.on("unresponsive", () => {
    if (!win.isDestroyed()) win.webContents.reload();
  });
  win.on("closed", () => {
    if (mascotWindow !== win) return;
    mascotWindow = null;
    settleExtras(null);
    stopTicks();
    stopDrag();
    stopFling();
  });
  win.webContents.setWindowOpenHandler(() => ({ action: "deny" }));
  win.loadURL(mascotPageUrl(rendererUrl));
  startTicks();
  startWatchdog();
  registerHotkey();
}
function destroyMascotWindow() {
  quitting$1 = true;
  unregisterHotkey();
  if (hideTimer) clearTimeout(hideTimer);
  hideTimer = null;
  if (disableTimer) clearTimeout(disableTimer);
  disableTimer = null;
  settleExtras(null);
  stopWatchdog();
  stopTicks();
  stopDrag();
  stopFling();
  if (mascotWindow && !mascotWindow.isDestroyed()) mascotWindow.destroy();
  mascotWindow = null;
}
function setMascotGameRunning(running2) {
  gameRunning = running2;
  if (!isMascotEnabled()) return;
  if (running2) unregisterHotkey();
  else registerHotkey();
  const win = mascotWindow;
  if (!win || win.isDestroyed()) return;
  if (running2) {
    if (hideTimer) clearTimeout(hideTimer);
    hideTimer = null;
    stopDrag();
    if (flingTimer) {
      stopFling();
      settleAt(win);
    }
    sendBubble({ kind: "info", text: "", durationMs: 0 });
    win.hide();
  } else {
    const wasUserHidden = userHidden;
    userHidden = false;
    if (!win.isVisible()) win.showInactive();
    if (wasUserHidden) {
      sendVisibility(win, true);
      syncBubbleSpace(win, void 0, true);
    }
  }
}
function toggleMascot() {
  const win = mascotWindow;
  if (quitting$1 || gameRunning || !isMascotEnabled() || !win || win.isDestroyed()) return;
  if (hideTimer) {
    clearTimeout(hideTimer);
    hideTimer = null;
  }
  if (!userHidden) {
    userHidden = true;
    stopDrag();
    dragSamples = [];
    if (flingTimer) {
      stopFling();
      settleAt(win);
    }
    sendVisibility(win, false);
    hideTimer = setTimeout(() => {
      hideTimer = null;
      if (!userHidden || win.isDestroyed()) return;
      expanded = false;
      bubbleRoom = false;
      win.setBounds(collapsedBounds());
      win.hide();
    }, HIDE_ANIM_MS);
  } else {
    userHidden = false;
    if (!win.isVisible()) win.showInactive();
    win.setAlwaysOnTop(true, "screen-saver");
    win.moveTop();
    sendVisibility(win, true);
    syncBubbleSpace(win, void 0, true);
  }
}
function isMascotEnabled() {
  return false;
}
function dropMascotWindow() {
  if (disableTimer) clearTimeout(disableTimer);
  disableTimer = null;
  if (hideTimer) clearTimeout(hideTimer);
  hideTimer = null;
  settleExtras(null);
  stopTicks();
  stopDrag();
  stopFling();
  dragSamples = [];
  const win = mascotWindow;
  mascotWindow = null;
  expanded = false;
  userHidden = false;
  bubbleRoom = false;
  bubbleBelow = false;
  lastSpace = null;
  rendererReady = false;
  revealOnReady = false;
  hintShown = false;
  hintOverSince = 0;
  realBubbleUntil = 0;
  hotkeyNotice = null;
  if (win && !win.isDestroyed()) win.destroy();
}
function disableMascot() {
  unregisterHotkey();
  stopWatchdog();
  const win = mascotWindow;
  if (!win || win.isDestroyed() || !win.isVisible()) {
    dropMascotWindow();
    return;
  }
  if (hideTimer) clearTimeout(hideTimer);
  hideTimer = null;
  userHidden = true;
  stopDrag();
  dragSamples = [];
  if (flingTimer) {
    stopFling();
    settleAt(win);
  }
  sendVisibility(win, false);
  if (disableTimer) clearTimeout(disableTimer);
  disableTimer = setTimeout(dropMascotWindow, HIDE_ANIM_MS);
}
function enableMascot() {
  const win = mascotWindow;
  if (disableTimer && win && !win.isDestroyed()) {
    clearTimeout(disableTimer);
    disableTimer = null;
    userHidden = false;
    expanded = false;
    bubbleRoom = false;
    win.setBounds(collapsedBounds());
    win.showInactive();
    win.setAlwaysOnTop(true, "screen-saver");
    win.moveTop();
    sendVisibility(win, true);
    syncBubbleSpace(win, void 0, true);
    startWatchdog();
    registerHotkey();
    return;
  }
  if (!lastRendererUrl) return;
  revealOnReady = true;
  createMascotWindow(lastRendererUrl);
}
function setMascotEnabled(next) {
  const was = isMascotEnabled();
  mascotEnabled = next;
  setMascotEnabledSetting(next);
  if (quitting$1 || next === was) return;
  if (next) enableMascot();
  else disableMascot();
}
function setHotkeyLabel(key) {
  hotkeyLabelRaw = key;
  sendHotkey();
}
function sendHotkey() {
  const win = mascotWindow;
  if (!win || win.isDestroyed() || !rendererReady) return;
  const payload = { key: hotkeyLabelNow() };
  win.webContents.send(IPC.MASCOT_HOTKEY, payload);
}
function registerHotkey() {
  if (activeKey || quitting$1 || gameRunning || captureSuspended || !isMascotEnabled()) return;
  hotkeyTriedAt = Date.now();
  let key = null;
  for (const k of toggleKeys()) {
    try {
      if (electron.globalShortcut.register(k, toggleMascot)) {
        key = k;
        break;
      }
    } catch (err) {
      console.warn(`[mascot] ${k} tugmasini ulashda xato: ${err instanceof Error ? err.message : String(err)}`);
    }
  }
  activeKey = key;
  setHotkeyLabel(key);
  if (key === primaryKey()) return;
  if (hotkeyWarned) return;
  hotkeyWarned = true;
  console.warn(
    `[mascot] ${keyLabel(primaryKey())} band (boshqa dastur ishlatyapti): ` + (key ? `zaxira tugma ulandi: ${key}` : "maskotni tugma bilan yopib bo'lmaydi")
  );
  const text = key ? hotkeyFallbackText(key) : hotkeyNoneText();
  const win = mascotWindow;
  if (win && !win.isDestroyed() && rendererReady) {
    sendBubble({ kind: "info", text, durationMs: 7e3 });
  } else {
    hotkeyNotice = text;
  }
}
function unregisterHotkey() {
  const key = activeKey;
  if (!key) return;
  activeKey = null;
  try {
    electron.globalShortcut.unregister(key);
  } catch {
  }
}
function maintainHotkey() {
  if (quitting$1 || gameRunning || captureSuspended || !isMascotEnabled()) return;
  if (activeKey) {
    let alive2 = true;
    try {
      alive2 = electron.globalShortcut.isRegistered(activeKey);
    } catch {
    }
    if (!alive2) {
      activeKey = null;
      registerHotkey();
      return;
    }
  }
  if (activeKey === primaryKey() || Date.now() - hotkeyTriedAt < HOTKEY_RETRY_MS) return;
  if (!activeKey) {
    registerHotkey();
    return;
  }
  hotkeyTriedAt = Date.now();
  let upgraded = false;
  try {
    upgraded = electron.globalShortcut.register(primaryKey(), toggleMascot);
  } catch {
  }
  if (!upgraded) return;
  const prev = activeKey;
  try {
    electron.globalShortcut.unregister(prev);
  } catch {
  }
  activeKey = primaryKey();
  setHotkeyLabel(activeKey);
}
function hotkeyState() {
  const shouldBeActive = isMascotEnabled() && !gameRunning && !captureSuspended && !quitting$1;
  return {
    key: primaryKey(),
    defaultKey: DEFAULT_MASCOT_HOTKEY,
    fallback: shouldBeActive && activeKey && activeKey !== primaryKey() ? activeKey : null,
    none: shouldBeActive && !activeKey
  };
}
function stopCaptureTimer() {
  if (captureTimer) clearTimeout(captureTimer);
  captureTimer = null;
}
function endHotkeyCapture() {
  stopCaptureTimer();
  if (!captureSuspended) return;
  captureSuspended = false;
  registerHotkey();
}
function beginHotkeyCapture() {
  captureSuspended = true;
  unregisterHotkey();
  stopCaptureTimer();
  captureTimer = setTimeout(endHotkeyCapture, CAPTURE_MAX_MS);
}
function isHotkeyFree(key) {
  try {
    if (!electron.globalShortcut.register(key, toggleMascot)) return false;
  } catch {
    return false;
  }
  try {
    electron.globalShortcut.unregister(key);
  } catch {
  }
  return true;
}
function setMascotHotkey(raw) {
  let next = DEFAULT_MASCOT_HOTKEY;
  if (raw !== null) {
    const parsed = parseMascotHotkey(raw, process.platform === "darwin");
    if (!parsed.ok) {
      endHotkeyCapture();
      return { ok: false, error: parsed.error };
    }
    next = parsed.key;
  }
  if (next === primaryKey()) {
    if (raw === null) setMascotHotkeySetting(null);
    endHotkeyCapture();
    return { ok: true, data: hotkeyState() };
  }
  unregisterHotkey();
  stopCaptureTimer();
  captureSuspended = false;
  if (raw !== null && !isHotkeyFree(next)) {
    registerHotkey();
    return { ok: false, error: "busy" };
  }
  primaryKeyCache = next;
  setMascotHotkeySetting(raw === null ? null : next);
  hotkeyWarned = false;
  hotkeyNotice = null;
  setHotkeyLabel(next);
  registerHotkey();
  return { ok: true, data: hotkeyState() };
}
function setMascotMenuExtraRows(rows) {
  menuExtraRows = Math.max(0, Math.min(4, Math.round(rows)));
}
function sendToMascot(channel, payload) {
  const win = mascotWindow;
  if (!win || win.isDestroyed() || !rendererReady) return false;
  win.webContents.send(channel, payload);
  return true;
}
function sendBubble(bubble) {
  const win = mascotWindow;
  if (!win || win.isDestroyed()) return;
  hintShown = false;
  realBubbleUntil = !bubble.text ? 0 : bubble.durationMs > 0 ? Date.now() + bubble.durationMs + HINT_BUBBLE_SLACK_MS : Infinity;
  win.webContents.send(IPC.MASCOT_BUBBLE, bubble);
}
const fromMascot = (e) => !!mascotWindow && !mascotWindow.isDestroyed() && e.sender === mascotWindow.webContents;
let pendingExtras = null;
let extrasSeq = 0;
function settleExtras(extras) {
  const pending = pendingExtras;
  if (!pending) return;
  pendingExtras = null;
  clearTimeout(pending.timer);
  pending.resolve(extras);
}
function requestLaunchExtras(nick) {
  const win = mascotWindow;
  if (!win || win.isDestroyed()) return Promise.resolve(null);
  settleExtras(null);
  return new Promise((resolve) => {
    const id = ++extrasSeq;
    pendingExtras = { id, resolve, timer: setTimeout(() => settleExtras(null), EXTRAS_TIMEOUT_MS) };
    const request = { requestId: id, nick };
    win.webContents.send(IPC.MASCOT_PREPARE_LAUNCH, request);
  });
}
function shorten(text, max) {
  const t = text.replace(/\s+/g, " ").trim();
  return t.length > max ? `${t.slice(0, max - 1)}…` : t;
}
let mascotLaunching = false;
function cleanupSummary(r) {
  const parts = [];
  if (r.standby === "ok") parts.push("Windows keshi tozalandi");
  if (r.junkBytes >= 1024 * 1024) parts.push(`${Math.round(r.junkBytes / (1024 * 1024))} MB axlat o'chirildi`);
  else if (r.junkFiles > 0) parts.push(`${r.junkFiles} ta axlat fayl o'chirildi`);
  if (r.dnsFlushed) parts.push("DNS yangilandi");
  return parts.length ? parts.join(", ") : "Tozalanadigan narsa topilmadi";
}
async function cleanFromMascot() {
  sendBubble({ kind: "info", text: "Tozalanmoqda...", durationMs: 0 });
  try {
    const report = await runCleanup(true);
    sendBubble({ kind: "info", text: cleanupSummary(report), durationMs: 6e3 });
  } catch {
    sendBubble({ kind: "info", text: "Tozalab bo'lmadi", durationMs: 5e3 });
  }
}
async function launchFromMascot(opts) {
  if (mascotLaunching || opts.isLaunching()) {
    sendBubble({ kind: "launch", text: "Minecraft allaqachon ochilmoqda...", durationMs: 3500 });
    return;
  }
  const profile = getLaunchProfile();
  const instance = getLastInstance();
  if (!profile || !instance) {
    sendBubble({ kind: "info", text: "Avval launcherda kirib, versiyani tanlang", durationMs: 8e3 });
    opts.openLauncher();
    return;
  }
  mascotLaunching = true;
  let status = `Minecraft ${instance.version} ochilmoqda...`;
  let percent = null;
  let shown = "";
  let shownAt = 0;
  let failed = false;
  let finished = false;
  let trailing = null;
  const cancelTrailing = () => {
    if (trailing) clearTimeout(trailing);
    trailing = null;
  };
  const show = (force = false) => {
    if (failed || finished) return;
    const text = percent !== null && percent > 0 && percent < 100 ? `${status} ${percent}%` : status;
    if (text === shown) return;
    const remaining = 300 - (Date.now() - shownAt);
    if (!force && remaining > 0) {
      if (!trailing) {
        trailing = setTimeout(() => {
          trailing = null;
          show(true);
        }, remaining);
      }
      return;
    }
    cancelTrailing();
    shown = text;
    shownAt = Date.now();
    sendBubble({ kind: "launch", text, durationMs: 0 });
  };
  const fail = (reason) => {
    if (failed) return;
    failed = true;
    cancelTrailing();
    sendBubble({ kind: "launch", text: `Ochilmadi: ${shorten(reason, 40)}`, durationMs: 9e3 });
    opts.openLauncher();
  };
  const observer = (e) => {
    switch (e.type) {
      case "status":
        status = shorten(e.message, 36);
        percent = null;
        show();
        break;
      case "progress":
        percent = Math.round(e.percent);
        show();
        break;
      case "autofixing":
        finished = false;
        status = "Muammo tuzatilmoqda...";
        percent = null;
        show(true);
        break;
      case "started":
      case "closed":
        finished = true;
        cancelTrailing();
        break;
      case "error":
        fail(e.message);
        break;
      case "launch-failed":
        fail(e.title);
        break;
    }
  };
  show(true);
  try {
    try {
      restoreUserMods();
    } catch {
    }
    const loader = instance.loader === "fabric" || instance.loader === "quilt" || instance.loader === "forge" ? instance.loader : void 0;
    const extras = mergeLaunchExtras(profile, await requestLaunchExtras(profile.nick));
    if (extras.note) console.warn(`[mascot] o'yin menyusi/kosmetika tokenlari ulanmadi: ${extras.note}`);
    const res = await opts.launch(
      {
        profile: { nick: profile.nick, uuid: profile.uuid },
        version: instance.version,
        loader,
        ramMax: profile.ramMax,
        fpsBoost: profile.fpsBoost,
        skinUrl: profile.skinUrl,
        companionId: profile.companionId ?? null,
        cosmetics: extras.cosmetics,
        uiToken: extras.uiToken
      },
      observer
    );
    if (!res.ok && !failed) fail(res.error ?? "noma'lum xato");
  } finally {
    cancelTrailing();
    mascotLaunching = false;
  }
}
function registerMascotIpc(opts) {
  electron.ipcMain.on(IPC.MASCOT_READY, (e) => {
    if (!fromMascot(e)) return;
    rendererReady = true;
    hintShown = false;
    hintOverSince = 0;
    const win = mascotWindow;
    if (win && !win.isDestroyed()) {
      syncBubbleSpace(win, void 0, true);
      if (userHidden) sendVisibility(win, false);
      sendHotkey();
      if (revealOnReady) {
        revealOnReady = false;
        if (!userHidden) sendVisibility(win, true);
      }
    }
    const text = takeDailyGreeting();
    if (text) sendBubble({ kind: "greeting", text, durationMs: 7e3 });
    if (hotkeyNotice) {
      const notice = hotkeyNotice;
      hotkeyNotice = null;
      setTimeout(() => sendBubble({ kind: "info", text: notice, durationMs: 7e3 }), text ? 7500 : 900);
    }
  });
  electron.ipcMain.on(IPC.MASCOT_LAUNCH_GAME, (e) => {
    if (!fromMascot(e)) return;
    void launchFromMascot(opts);
  });
  electron.ipcMain.on(IPC.MASCOT_CLEAN_RAM, (e) => {
    if (fromMascot(e)) void cleanFromMascot();
  });
  electron.ipcMain.on(IPC.MASCOT_LAUNCH_EXTRAS, (e, raw) => {
    if (!fromMascot(e)) return;
    const extras = parseLaunchExtras(raw);
    if (extras && pendingExtras && extras.requestId === pendingExtras.id) settleExtras(extras);
  });
  electron.ipcMain.on(IPC.MASCOT_REMEMBER_LAUNCH, (_e, profile) => {
    rememberLaunchProfile(profile);
  });
  electron.ipcMain.on(IPC.MASCOT_OPEN_LAUNCHER, (e) => {
    if (fromMascot(e)) opts.openLauncher();
  });
  electron.ipcMain.on(IPC.MASCOT_SET_USERNAME, (_e, username) => {
    setMascotUsername(typeof username === "string" ? username : null);
  });
  electron.ipcMain.handle(IPC.MASCOT_GET_HOTKEY, () => ({ ok: true, data: hotkeyState() }));
  electron.ipcMain.handle(IPC.MASCOT_SET_HOTKEY, (_e, key) => {
    if (key !== null && typeof key !== "string") return { ok: false, error: "invalid" };
    return setMascotHotkey(key);
  });
  electron.ipcMain.handle(IPC.MASCOT_HOTKEY_CAPTURE, (_e, on) => {
    if (on === true) beginHotkeyCapture();
    else endHotkeyCapture();
    return { ok: true, data: hotkeyState() };
  });
  electron.ipcMain.handle(IPC.MASCOT_GET_ENABLED, () => ({ ok: true, data: isMascotEnabled() }));
  electron.ipcMain.handle(IPC.MASCOT_SET_ENABLED, async (_e, next) => {
    if (typeof next !== "boolean") return { ok: false, error: "Noto'g'ri qiymat" };
    try {
      if (next && !lastRendererUrl) lastRendererUrl = await opts.rendererUrl();
      setMascotEnabled(next);
      return { ok: true, data: isMascotEnabled() };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });
  
  // --- NeoTerra Screenshots Gallery ---
  electron.ipcMain.handle("screenshots:list", async () => {
    try {
      return { ok: true, data: listScreenshots() };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });
  electron.ipcMain.handle("screenshots:reveal", async (_e, filePath) => {
    try {
      if (filePath && fs.existsSync(filePath)) {
        electron.shell.showItemInFolder(filePath);
        return { ok: true };
      }
      return { ok: false, error: "Fayl topilmadi" };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });
  electron.ipcMain.handle("screenshots:delete", async (_e, filePath) => {
    try {
      if (filePath && fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        return { ok: true };
      }
      return { ok: false, error: "Fayl topilmadi" };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });
  electron.ipcMain.handle("screenshots:copy", async (_e, filePath) => {
    try {
      return { ok: copyScreenshotToClipboard(filePath) };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });
  electron.ipcMain.handle("screenshots:open-dir", async () => {
    try {
      const dirs = getScreenshotsDirs();
      const targetDir = dirs[0] || path.join(gameDir(), "screenshots");
      fs.mkdirSync(targetDir, { recursive: true });
      await electron.shell.openPath(targetDir);
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });

  // --- NeoTerra Playtime Tracking ---
  electron.ipcMain.handle("playtime:get", async () => {
    try {
      return { ok: true, data: loadPlaytime() };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });

  // --- NeoTerra Custom Wallpaper ---
  electron.ipcMain.handle("wallpaper:pick", async () => {
    try {
      return await pickCustomWallpaper(getWindow());
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });
  electron.ipcMain.handle("wallpaper:get", async () => {
    try {
      return getCustomWallpaper();
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });
  electron.ipcMain.handle("wallpaper:reset", async () => {
    try {
      return resetCustomWallpaper();
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });

  // --- NeoTerra Discord RPC ---
  electron.ipcMain.handle("discord:get-status", async () => {
    return { ok: true, enabled: isDiscordRpcEnabled(), connected: discordConnected };
  });
  electron.ipcMain.handle("discord:set-enabled", async (_e, enabled) => {
    return setDiscordRpcEnabled(enabled);
  });

  electron.app.on("before-quit", () => {
    try { disconnectDiscordRpc(); } catch {}
    quitting$1 = true;
    stopWatchdog();
    stopCaptureTimer();
    unregisterHotkey();
    if (disableTimer) clearTimeout(disableTimer);
    disableTimer = null;
  });
  electron.ipcMain.handle(IPC.MASCOT_SET_EXPANDED, (_e, next) => {
    const win = mascotWindow;
    if (!win || win.isDestroyed()) return { ok: false, error: "Maskot oynasi yo'q" };
    expanded = Boolean(next);
    if (expanded) {
      bubbleRoom = false;
      stopDrag();
      if (flingTimer) {
        stopFling();
        settleAt(win);
      }
      const { bounds, anchor } = expandedLayout();
      win.setBounds(bounds);
      return { ok: true, data: anchor };
    }
    win.setBounds(collapsedBounds());
    syncBubbleSpace(win, void 0, true);
    return { ok: true };
  });
  electron.ipcMain.handle(IPC.MASCOT_BUBBLE_ROOM, (e, room) => {
    if (!fromMascot(e)) return { ok: false, error: "Ruxsat yo'q" };
    const win = mascotWindow;
    if (!win || win.isDestroyed()) return { ok: false, error: "Maskot oynasi yo'q" };
    bubbleRoom = room === true;
    if (!expanded && !userHidden) {
      const b = win.getBounds();
      const size = collapsedSize();
      if (b.width !== size.width || b.height !== size.height) win.setBounds({ x: b.x, y: b.y, ...size });
    }
    return { ok: true };
  });
  electron.ipcMain.on(IPC.MASCOT_DRAG, (_e, phase) => {
    const win = mascotWindow;
    if (!win || win.isDestroyed()) return;
    if (phase === "start") {
      if (expanded) return;
      stopDrag();
      stopFling();
      const startCursor = electron.screen.getCursorScreenPoint();
      const start = win.getBounds();
      dragSamples = [];
      dragTimer = setInterval(() => {
        if (win.isDestroyed()) return stopDrag();
        const p = electron.screen.getCursorScreenPoint();
        dragSamples.push({ x: p.x, y: p.y, t: Date.now() });
        if (dragSamples.length > 8) dragSamples.shift();
        const rect = { ...collapsedSize(), x: start.x + p.x - startCursor.x, y: start.y + p.y - startCursor.y };
        win.setBounds(rect);
        syncBubbleSpace(win, rect);
      }, DRAG_TICK_MS);
    } else {
      stopDrag();
      const now = Date.now();
      const recent = dragSamples.filter((s) => now - s.t <= 100);
      const first = recent[0];
      const last = recent[recent.length - 1];
      const dt = first && last ? last.t - first.t : 0;
      if (first && last && dt >= 30) {
        const vx = (last.x - first.x) / dt;
        const vy = (last.y - first.y) / dt;
        if (Math.hypot(vx, vy) >= FLING_MIN_SPEED) {
          const k = Math.min(1, FLING_MAX_STEP / (Math.hypot(vx, vy) * DRAG_TICK_MS));
          startFling(win, vx * DRAG_TICK_MS * k, vy * DRAG_TICK_MS * k);
          return;
        }
      }
      settleAt(win);
    }
  });
  const reclamp = () => {
    const win = mascotWindow;
    if (!win || win.isDestroyed() || !home) return;
    const b = clampCollapsed(collapsedBounds());
    home = { x: b.x, y: b.y };
    if (!expanded) {
      win.setBounds(b);
      syncBubbleSpace(win, b);
    }
  };
  electron.screen.on("display-removed", reclamp);
  electron.screen.on("display-metrics-changed", reclamp);
}
function pageStrings(raw) {
  const clean = (v, fallback) => typeof v === "string" && v.trim() ? v.trim().slice(0, 200) : fallback;
  return {
    successTitle: clean(raw?.successTitle, "Signed in"),
    successMessage: clean(raw?.successMessage, "You can close this tab and return to the launcher."),
    errorTitle: clean(raw?.errorTitle, "Sign-in failed"),
    errorMessage: clean(raw?.errorMessage, "Return to the launcher and try again.")
  };
}

// ==================== NEOTERRA EXCLUSIVE ENHANCEMENTS ====================
// --- Playtime Tracking ---
function playtimeFilePath() {
  return path.join(electron.app.getPath("userData"), "playtime.json");
}
let playtimeCache = null;
function loadPlaytime() {
  if (playtimeCache) return playtimeCache;
  const file = playtimeFilePath();
  try {
    if (fs.existsSync(file)) {
      const parsed = JSON.parse(fs.readFileSync(file, "utf-8"));
      playtimeCache = {
        totalSeconds: typeof parsed.totalSeconds === "number" ? parsed.totalSeconds : 0,
        sessionsCount: typeof parsed.sessionsCount === "number" ? parsed.sessionsCount : 0,
        lastPlayed: parsed.lastPlayed || null,
        instances: parsed.instances && typeof parsed.instances === "object" ? parsed.instances : {}
      };
      return playtimeCache;
    }
  } catch {}
  playtimeCache = { totalSeconds: 0, sessionsCount: 0, lastPlayed: null, instances: {} };
  return playtimeCache;
}
function savePlaytime(data) {
  playtimeCache = data;
  try {
    const file = playtimeFilePath();
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf-8");
  } catch {}
}
let activePlaytimeSession = null;
let playtimeInterval = null;
function onGameStartTrackPlaytime(instanceKey) {
  try { setGamePlayingDiscordActivity(instanceKey); } catch {}
  if (playtimeInterval) {
    clearInterval(playtimeInterval);
    playtimeInterval = null;
  }
  const key = instanceKey || "default";
  activePlaytimeSession = {
    startTime: Date.now(),
    instanceKey: key
  };
  const data = loadPlaytime();
  data.sessionsCount = (data.sessionsCount || 0) + 1;
  data.lastPlayed = new Date().toISOString();
  savePlaytime(data);

  playtimeInterval = setInterval(() => {
    if (!activePlaytimeSession) return;
    const now = Date.now();
    const addSec = Math.max(0, Math.floor((now - activePlaytimeSession.startTime) / 1000));
    if (addSec > 0) {
      activePlaytimeSession.startTime = now;
      const cur = loadPlaytime();
      cur.totalSeconds = (cur.totalSeconds || 0) + addSec;
      cur.instances[key] = (cur.instances[key] || 0) + addSec;
      savePlaytime(cur);
    }
  }, 60000);
}
function onGameEndTrackPlaytime() {
  try { setLauncherMenuDiscordActivity(); } catch {}
  if (playtimeInterval) {
    clearInterval(playtimeInterval);
    playtimeInterval = null;
  }
  if (!activePlaytimeSession) return;
  const addSec = Math.max(0, Math.floor((Date.now() - activePlaytimeSession.startTime) / 1000));
  if (addSec > 0) {
    const cur = loadPlaytime();
    cur.totalSeconds = (cur.totalSeconds || 0) + addSec;
    const key = activePlaytimeSession.instanceKey;
    cur.instances[key] = (cur.instances[key] || 0) + addSec;
    savePlaytime(cur);
  }
  activePlaytimeSession = null;
}

// --- Screenshots Management ---
function getScreenshotsDirs() {
  const dirs = [];
  const instDir = currentInstanceDir();
  if (instDir) {
    const s = path.join(instDir, "screenshots");
    if (fs.existsSync(s)) dirs.push(s);
  }
  const rootS = path.join(gameDir(), "screenshots");
  if (fs.existsSync(rootS) && !dirs.includes(rootS)) dirs.push(rootS);
  return dirs;
}
function getFileThumbnail(filePath) {
  try {
    const buf = fs.readFileSync(filePath);
    const ext = path.extname(filePath).toLowerCase().replace(".", "");
    const mime = ext === "jpg" || ext === "jpeg" ? "image/jpeg" : ext === "webp" ? "image/webp" : "image/png";
    return "data:" + mime + ";base64," + buf.toString("base64");
  } catch {
    return null;
  }
}
function listScreenshots() {
  const dirs = getScreenshotsDirs();
  const list = [];
  for (const d of dirs) {
    try {
      if (!fs.existsSync(d)) continue;
      const files = fs.readdirSync(d);
      for (const f of files) {
        if (!/\.(png|jpe?g|webp)$/i.test(f)) continue;
        const fullPath = path.join(d, f);
        try {
          const stat = fs.statSync(fullPath);
          list.push({
            name: f,
            path: fullPath,
            size: stat.size,
            mtime: stat.mtimeMs,
            dir: d
          });
        } catch {}
      }
    } catch {}
  }
  list.sort((a, b) => b.mtime - a.mtime);
  return list.slice(0, 100).map((item) => ({
    ...item,
    dataUrl: getFileThumbnail(item.path)
  }));
}
function copyScreenshotToClipboard(filePath) {
  if (!fs.existsSync(filePath)) return false;
  try {
    const img = electron.nativeImage.createFromPath(filePath);
    if (img.isEmpty()) return false;
    electron.clipboard.writeImage(img);
    return true;
  } catch {
    return false;
  }
}

// --- Custom Wallpaper ---
function getCustomWallpaper() {
  const dir = electron.app.getPath("userData");
  for (const ext of [".png", ".jpg", ".jpeg", ".webp", ".mp4"]) {
    const p = path.join(dir, "custom_wallpaper" + ext);
    if (fs.existsSync(p)) {
      const isVideo = ext === ".mp4";
      const dataUrl = isVideo ? null : getFileThumbnail(p);
      const fileUrl = "file:///" + p.replace(/\\/g, "/");
      return { ok: true, exists: true, isVideo, path: p, dataUrl, url: fileUrl };
    }
  }
  return { ok: true, exists: false };
}
async function pickCustomWallpaper(parentWin) {
  const res = await electron.dialog.showOpenDialog(parentWin || undefined, {
    title: "Launcher foni uchun rasm yoki video tanlang",
    filters: [
      { name: "Media fayllar (Rasm va Video)", extensions: ["png", "jpg", "jpeg", "webp", "mp4"] },
      { name: "Rasmlar", extensions: ["png", "jpg", "jpeg", "webp"] },
      { name: "Videolar", extensions: ["mp4"] }
    ],
    properties: ["openFile"]
  });
  if (res.canceled || !res.filePaths || res.filePaths.length === 0) {
    return { ok: false, canceled: true };
  }
  const source = res.filePaths[0];
  const ext = path.extname(source).toLowerCase();
  const dir = electron.app.getPath("userData");
  for (const oldExt of [".png", ".jpg", ".jpeg", ".webp", ".mp4"]) {
    try {
      const oldFile = path.join(dir, "custom_wallpaper" + oldExt);
      if (fs.existsSync(oldFile)) fs.unlinkSync(oldFile);
    } catch {}
  }
  const dest = path.join(dir, "custom_wallpaper" + ext);
  fs.copyFileSync(source, dest);
  return getCustomWallpaper();
}
function resetCustomWallpaper() {
  const dir = electron.app.getPath("userData");
  for (const oldExt of [".png", ".jpg", ".jpeg", ".webp", ".mp4"]) {
    try {
      const oldFile = path.join(dir, "custom_wallpaper" + oldExt);
      if (fs.existsSync(oldFile)) fs.unlinkSync(oldFile);
    } catch {}
  }
  return { ok: true, reset: true };
}

// --- Discord RPC ---
let discordSocket = null;
let discordConnected = false;
let discordCurrentActivity = null;
let discordReconnectTimer = null;
const DISCORD_CLIENT_ID = "1285239849208479784";
const launcherStartTime = Math.floor(Date.now() / 1000);

function isDiscordRpcEnabled() {
  return true;
}
function setDiscordRpcEnabled(enabled) {
  if (!enabled) disconnectDiscordRpc();
  else initDiscordRpc();
  return { ok: true, enabled: isDiscordRpcEnabled() };
}
function getDiscordPipePath(idx = 0) {
  if (process.platform === "win32") {
    return "\\\\?\\pipe\\discord-ipc-" + idx;
  }
  const prefix = process.env.XDG_RUNTIME_DIR || process.env.TMPDIR || process.env.TMP || process.env.TEMP || "/tmp";
  return path.join(prefix, "discord-ipc-" + idx);
}
function connectDiscordPipe(pipeIndex = 0) {
  if (pipeIndex > 9) return;
  try {
    const net = require("net");
    const pPath = getDiscordPipePath(pipeIndex);
    const sock = net.createConnection(pPath);
    sock.once("connect", () => {
      discordSocket = sock;
      discordConnected = true;
      try {
        const handshake = JSON.stringify({ v: 1, client_id: DISCORD_CLIENT_ID });
        const buf = Buffer.alloc(8 + Buffer.byteLength(handshake));
        buf.writeInt32LE(0, 0);
        buf.writeInt32LE(Buffer.byteLength(handshake), 4);
        buf.write(handshake, 8);
        sock.write(buf);
        if (discordCurrentActivity) {
          sendDiscordActivity(discordCurrentActivity);
        } else {
          setLauncherMenuDiscordActivity();
        }
      } catch {}
    });
    sock.on("data", () => {});
    sock.once("error", () => {
      try { sock.destroy(); } catch {}
      if (!discordConnected && pipeIndex < 3) {
        connectDiscordPipe(pipeIndex + 1);
      }
    });
    sock.once("close", () => {
      discordConnected = false;
      discordSocket = null;
      if (isDiscordRpcEnabled() && !discordReconnectTimer) {
        discordReconnectTimer = setTimeout(() => {
          discordReconnectTimer = null;
          initDiscordRpc();
        }, 30000);
      }
    });
  } catch {}
}
function initDiscordRpc() {
  if (!isDiscordRpcEnabled()) return;
  if (discordConnected && discordSocket) return;
  connectDiscordPipe(0);
}
function disconnectDiscordRpc() {
  if (discordReconnectTimer) {
    clearTimeout(discordReconnectTimer);
    discordReconnectTimer = null;
  }
  if (discordSocket) {
    try { discordSocket.destroy(); } catch {}
    discordSocket = null;
  }
  discordConnected = false;
}
function sendDiscordActivity(activity) {
  if (!discordSocket || !discordConnected) return;
  try {
    const payload = JSON.stringify({
      cmd: "SET_ACTIVITY",
      args: { pid: process.pid, activity },
      nonce: String(Date.now())
    });
    const buf = Buffer.alloc(8 + Buffer.byteLength(payload));
    buf.writeInt32LE(1, 0);
    buf.writeInt32LE(Buffer.byteLength(payload), 4);
    buf.write(payload, 8);
    discordSocket.write(buf);
  } catch {}
}
function setDiscordActivity(activity) {
  discordCurrentActivity = activity;
  if (isDiscordRpcEnabled()) {
    sendDiscordActivity(activity);
  }
}
function setLauncherMenuDiscordActivity() {
  setDiscordActivity({
    details: "Bosh menyuda",
    state: "NeoTerra Minecraft Launcher",
    timestamps: { start: launcherStartTime },
    assets: {
      large_image: "https://site.neoterra.uz/icon.png",
      large_text: "NeoTerra Launcher",
      small_image: "https://site.neoterra.uz/icon.png",
      small_text: "NeoTerra Network"
    },
    buttons: [
      { label: "O'yinni yuklab olish", url: "https://site.neoterra.uz" }
    ]
  });
}
function setGamePlayingDiscordActivity(instanceKey) {
  setDiscordActivity({
    details: "Minecraft o'ynamoqda",
    state: instanceKey || "Minecraft",
    timestamps: { start: Math.floor(Date.now() / 1000) },
    assets: {
      large_image: "https://site.neoterra.uz/icon.png",
      large_text: "NeoTerra Launcher",
      small_image: "https://site.neoterra.uz/icon.png",
      small_text: instanceKey || "Minecraft"
    },
    buttons: [
      { label: "Serverga qo'shilish", url: "https://site.neoterra.uz" }
    ]
  });
}


function getLauncherActionOnLaunch() {
  return load().launcherActionOnLaunch || "hide";
}
function setLauncherActionOnLaunch(value) {
  save({ ...load(), launcherActionOnLaunch: value });
}

async function listJavaRuntimes() {
  const osName = adoptiumOs();
  const root = gameDir();
  const majors = [
    { major: 8, title: "Java 8", desc: "1.16.5 va eski versiyalar uchun" },
    { major: 17, title: "Java 17", desc: "1.17 dan 1.20.4 gacha versiyalar uchun" },
    { major: 21, title: "Java 21", desc: "1.20.5 va yangi versiyalar uchun" }
  ];
  const list = [];
  for (const m of majors) {
    const effectiveMajor = adoptiumAvailableMajor(m.major);
    const arch = adoptiumArch(osName, effectiveMajor, {});
    const runtimeDir = osName === "windows" ? path.join(root, "jre", String(effectiveMajor)) : path.join(root, "jre", `${effectiveMajor}-${arch}`);
    const bin = javaBinPath(osName, runtimeDir);
    let installed = false;
    let versionStr = "";
    if (fs.existsSync(bin)) {
      try {
        const runs = await verifyRuns(bin);
        installed = true;
        versionStr = runs?.version ? String(runs.version) : String(effectiveMajor);
      } catch {
        installed = false;
      }
    }
    list.push({
      major: m.major,
      title: m.title,
      desc: m.desc,
      installed,
      path: installed ? bin : null,
      version: versionStr
    });
  }
  return list;
}

async function installJavaRuntime(major) {
  const win = getWindow();
  const res = await ensureJavaRuntime(major, gameDir(), {
    onProgress: (p) => {
      if (win && !win.isDestroyed()) {
        const percent = p.total > 0 ? Math.round((p.transferred / p.total) * 100) : (p.percent || 0);
        win.webContents.send("java:progress", { major, percent, transferred: p.transferred, total: p.total });
      }
    }
  });
  return { ok: true, path: res };
}

function registerIpc(getWindow) {
  let gameWindowShown = false;
  let missedFailure = null;
  let launchBusy = false;
  const FALLBACK_HIDE_MS = 3500;
  let cancelPendingAction = null;
  function handleWindowOnGameStart(win) {
    cancelPendingAction?.();
    const action = getLauncherActionOnLaunch();
    if (action === "keep") return;
    if (action === "close") {
      const timer = setTimeout(() => {
        electron.app.quit();
      }, 1500);
      cancelPendingAction = () => clearTimeout(timer);
      return;
    }
    const doHide = () => {
      cancelPendingAction?.();
      if (!win.isDestroyed()) {
        try {
          win.webContents.setAudioMuted(true);
          win.webContents.send("system:suspend", true);
          win.webContents.executeJavaScript("document.querySelectorAll('video, audio').forEach(el => el.pause());").catch(() => {});
        } catch {}
        win.hide();
      }
    };
    const onBlur = () => {
      doHide();
    };
    const fallback = setTimeout(() => {
      doHide();
    }, FALLBACK_HIDE_MS);
    cancelPendingAction = () => {
      cancelPendingAction = null;
      clearTimeout(fallback);
      if (!win.isDestroyed()) win.off("blur", onBlur);
    };
    win.once("blur", onBlur);
  }
  const emit2 = (e) => {
    const win = getWindow();
    win?.webContents.send(IPC.EVENT, e);
    if (!win && (e.type === "launch-failed" || e.type === "error")) missedFailure = { event: e, at: Date.now() };
    if (e.type === "started" || e.type === "autofixing") launchBusy = true;
    else if (e.type === "closed" || e.type === "error" || e.type === "launch-failed") launchBusy = false;
    setGameActive(launchBusy);
    if (e.type === "window-ready") gameWindowShown = true;
    else if (e.type === "started" || e.type === "closed" || e.type === "autofixing" || e.type === "error" || e.type === "launch-failed") {
      gameWindowShown = false;
    }
    if (e.type === "window-ready") {
      const action = getLauncherActionOnLaunch();
      if (action !== "keep" && win && !win.isDestroyed() && !win.isMinimized()) win.minimize();
    } else if (e.type === "started") {
      if (win) handleWindowOnGameStart(win);
      cancelRestoreAfterGame();
      setMascotGameRunning(true);
      onGameStarted(runningGamePid());
      try { onGameStartTrackPlaytime(getCurrentInstance()?.version); } catch {}
    } else if (e.type === "closed" || e.type === "autofixing" || e.type === "launch-failed" || e.type === "error") {
      cancelPendingAction?.();
      if (win && !win.isDestroyed()) {
        try {
          win.webContents.setAudioMuted(false);
          win.webContents.send("system:suspend", false);
        } catch {}
      }
      setMascotGameRunning(false);
      try { onGameEndTrackPlaytime(); } catch {}
      if (e.type === "closed") void finishArenaSession();
      if (e.type === "closed") {
        scheduleRestoreAfterGame((count) => {
          const w = getWindow();
          if (w && !w.isDestroyed()) w.webContents.send(IPC.ARENA_PACK_EVENT, { type: "restored", count });
        });
      } else {
        cancelRestoreAfterGame();
      }
      if (win?.isMinimized()) win.restore();
      win?.show();
      win?.focus();
    }
  };
  const emitMod = (e) => {
    getWindow()?.webContents.send(IPC.MOD_EVENT, e);
  };
  const emitMap = (e) => {
    getWindow()?.webContents.send(IPC.MAP_EVENT, e);
  };
  const emitUpdate = (e) => {
    getWindow()?.webContents.send(IPC.UPDATE_EVENT, e);
  };
  initAutoUpdater(emitUpdate);
  if (electron.app.isPackaged) {
    startUpdateWatch();
  }
  electron.ipcMain.handle(IPC.SYSTEM_INFO, async () => {
    try {
      const totalRamGb = Math.round(os.totalmem() / 1024 ** 3);
      return {
        ok: true,
        data: {
          totalRamGb,
          recommendedRamGb: Math.max(2, Math.min(8, Math.floor(totalRamGb / 2))),
          platform: process.platform,
          javaVersion: await detectJava(),
          gameDir: gameDir(),
          appVersion: electron.app.getVersion()
        }
      };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });
  let launchesInFlight = 0;
  const runLaunch = async (req, observer) => {
    const send2 = observer ? (e) => {
      emit2(e);
      try {
        observer(e);
      } catch {
      }
    } : emit2;
    const tracked = !req.prepareOnly;
    if (tracked && launchesInFlight > 0) {
      console.warn("[launch] takroriy so'rov e'tiborsiz qoldirildi - o'yin allaqachon tayyorlanmoqda");
      return { ok: true };
    }
    if (tracked) launchesInFlight++;
    try {
      if (isBridgeActive()) throw new Error("Guruh o'yini allaqachon ishlayapti");
      await launchGame(req, send2);
      return { ok: true };
    } catch (err) {
      if (err instanceof LaunchAdviceError) {
        send2({ type: "launch-failed", ...err.advice });
        send2({ type: "closed", code: null });
        return { ok: true };
      }
      const message = err instanceof Error ? err.message : String(err);
      send2({ type: "error", message });
      return { ok: false, error: message };
    } finally {
      if (tracked) launchesInFlight--;
    }
  };
  electron.ipcMain.handle(IPC.LAUNCH, (_e, req) => runLaunch(req));
  electron.ipcMain.on(IPC.LAUNCHER_READY, (e) => {
    const win = getWindow();
    if (!win || win.isDestroyed() || e.sender !== win.webContents) return;
    const missed = missedFailure;
    missedFailure = null;
    if (missed && Date.now() - missed.at < 10 * 6e4) {
      win.webContents.send(IPC.EVENT, missed.event);
    } else if (launchBusy) {
      const started = { type: "started" };
      win.webContents.send(IPC.EVENT, started);
      if (gameWindowShown) {
        const shown = { type: "window-ready" };
        win.webContents.send(IPC.EVENT, shown);
      }
    }
  });
  electron.ipcMain.handle(IPC.CANCEL, async () => {
    stopBridge();
    killGame();
    return { ok: true };
  });
  electron.ipcMain.handle(IPC.OPEN_GAME_DIR, async () => {
    try {
      const inst = getCurrentInstance();
      const dir = inst ? ensureInstanceDirs(inst.version, inst.loader) : gameDir();
      fs.mkdirSync(dir, { recursive: true });
      const err = await electron.shell.openPath(dir);
      return err ? { ok: false, error: err } : { ok: true };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });
  electron.ipcMain.handle(IPC.OPEN_INSTALL_DIR, async () => {
    try {
      fs.mkdirSync(gameDir(), { recursive: true });
      const err = await electron.shell.openPath(gameDir());
      return err ? { ok: false, error: err } : { ok: true };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });
  electron.ipcMain.handle(IPC.OPEN_MODS_DIR, async () => {
    try {
      const err = await electron.shell.openPath(assetDir("mod"));
      return err ? { ok: false, error: err } : { ok: true };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });
  electron.ipcMain.handle(
    IPC.SET_CURRENT_INSTANCE,
    async (_e, payload) => {
      try {
        if (!payload || typeof payload.version !== "string" || !payload.version) {
          return { ok: false, error: "invalid instance" };
        }
        setCurrentInstance(payload.version, payload.loader);
        ensureInstanceDirs(payload.version, payload.loader);
        migrateRootToInstance();
        return { ok: true };
      } catch (err) {
        return { ok: false, error: err instanceof Error ? err.message : String(err) };
      }
    }
  );
  electron.ipcMain.handle(IPC.GET_MAX_FPS, async () => {
    try {
      const dir = currentInstanceDir();
      if (!dir) return { ok: false, error: "O'yin versiyasi hali tanlanmagan" };
      return { ok: true, data: getMaxFps(dir) };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });
  electron.ipcMain.handle(IPC.GET_OPTIMIZATION, async () => {
    return { ok: true, data: getOptimizationSettings() };
  });
  electron.ipcMain.handle(IPC.SET_OPTIMIZATION, async (_e, patch) => {
    try {
      return { ok: true, data: setOptimizationSettings(patch) };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });
  electron.ipcMain.handle(IPC.ENABLE_SOFTWARE_GL, async () => {
    try {
      await setSoftwareGlEnabled(true);
      if (process.platform === "win32") await ensureMesa();
      rememberSoftwareGl(await detectGpus().catch(() => []));
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });
  electron.ipcMain.handle(IPC.GET_SOFTWARE_GL_ENABLED, async () => {
    return { ok: true, data: softwareGlUserEnabled() };
  });
  electron.ipcMain.handle(IPC.SET_SOFTWARE_GL_ENABLED, async (_e, value) => {
    await setSoftwareGlEnabled(value === true);
    return { ok: true, data: softwareGlUserEnabled() };
  });
  electron.ipcMain.handle(IPC.SET_MAX_FPS, async (_e, value) => {
    try {
      const dir = currentInstanceDir();
      if (!dir) return { ok: false, error: "O'yin versiyasi hali tanlanmagan" };
      setMaxFps(dir, value);
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });
  
  electron.ipcMain.handle("system:set-launcher-action", async (_e, action) => {
    try {
      setLauncherActionOnLaunch(action);
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });
  electron.ipcMain.handle("system:get-launcher-action", async () => {
    try {
      return { ok: true, data: getLauncherActionOnLaunch() };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });

  electron.ipcMain.handle("system:api-request", async (_e, payload) => {
    try {
      const { url, options = {} } = payload || {};
      if (typeof url !== "string" || !/^https?:\/\//i.test(url)) {
        return { ok: false, error: "invalid URL" };
      }
      const fetchOptions = {
        method: options.method || "GET",
        headers: options.headers || {}
      };
      if (options.body) {
        fetchOptions.body = typeof options.body === "string" ? options.body : JSON.stringify(options.body);
      }
      const res = await fetch(url, fetchOptions);
      const text = await res.text();
      let data = null;
      try { data = JSON.parse(text); } catch { data = text; }
      return { ok: res.ok, status: res.status, data };
    } catch (err) {
      console.error("[main api-request error]:", err);
      return { ok: false, status: 500, error: err instanceof Error ? err.message : String(err) };
    }
  });
  electron.ipcMain.handle(IPC.FETCH_BYTES, async (_e, url) => {
    try {
      if (typeof url !== "string" || !/^https?:\/\//i.test(url)) {
        return { ok: false, error: "invalid URL" };
      }
      const res = await fetch(url);
      if (!res.ok) return { ok: false, error: `HTTP ${res.status}` };
      const buf = await res.arrayBuffer();
      if (buf.byteLength > 28 * 1024 * 1024) return { ok: false, error: "response too large" };
      return {
        ok: true,
        data: { bytes: buf, contentType: res.headers.get("content-type") }
      };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });
  electron.ipcMain.handle(
    IPC.PROFILE_UPLOAD_AVATAR,
    async (_e, args) => {
      try {
        const { bytes, mime, sessionToken } = args ?? {};
        if (!(bytes instanceof ArrayBuffer) || typeof sessionToken !== "string" || !sessionToken) {
          return { ok: false, error: "invalid request" };
        }
        if (mime !== "image/webp" && mime !== "image/png" && mime !== "image/jpeg") return { ok: false, error: "invalid type" };
        if (bytes.byteLength === 0 || bytes.byteLength > 1024 * 1024) return { ok: false, error: "file too large" };
        const ext = mime === "image/webp" ? "webp" : mime === "image/png" ? "png" : "jpg";
        const form = new FormData();
        form.append("file", new Blob([bytes], { type: mime }), `avatar.${ext}`);
        form.append("folder", "avatars");
        const res = await fetch("https://site.neoterra.uz/api/profile-upload", {
          method: "POST",
          headers: { Authorization: `Bearer ${sessionToken}` },
          body: form,
          signal: AbortSignal.timeout(45e3)
        });
        const json = await res.json().catch(() => null);
        if (!res.ok || typeof json?.url !== "string") {
          return { ok: false, error: typeof json?.error === "string" ? json.error : `HTTP ${res.status}` };
        }
        return { ok: true, data: { url: json.url } };
      } catch (err) {
        return { ok: false, error: err instanceof Error ? err.message : String(err) };
      }
    }
  );
  electron.ipcMain.handle(
    IPC.COSMETIC_ASSET,
    async (_e, args) => {
      try {
        if (typeof args?.id !== "string" || typeof args?.sessionToken !== "string") return { ok: false, error: "invalid request" };
        return { ok: true, data: await fetchCosmeticAsset(args.id, args.sessionToken) };
      } catch (err) {
        if (err instanceof CosmeticAuthError) return { ok: false, error: "login" };
        return { ok: false, error: err instanceof Error ? err.message : String(err) };
      }
    }
  );
  electron.ipcMain.handle(IPC.LOBBY_TURN_CREDENTIALS, async (_e, sessionToken) => {
    if (typeof sessionToken !== "string" || !sessionToken) return { ok: true, data: null };
    return { ok: true, data: await fetchTurnIceServers(sessionToken) };
  });
  electron.ipcMain.handle(IPC.DISABLE_MODS, (_e, version, loader, files) => {
    if (typeof version !== "string" || !/^[\w.-]+$/.test(version) || version.includes("..")) return { ok: false, error: "Versiya noto'g'ri" };
    if (loader !== void 0 && loader !== null && loader !== "forge" && loader !== "fabric" && loader !== "quilt") {
      return { ok: false, error: "Loader noto'g'ri" };
    }
    if (!Array.isArray(files) || files.some((f) => typeof f !== "string")) return { ok: false, error: "Fayl ro'yxati noto'g'ri" };
    const moved = disableModFiles(instanceDir(version, loader), files);
    return moved.length > 0 ? { ok: true, data: moved } : { ok: false, error: "Mod fayli topilmadi yoki band (o'yin yopilganini tekshiring)." };
  });
  electron.ipcMain.handle(IPC.ADD_AV_EXCLUSION, async () => {
    const res = await addWindowsDefenderExclusion(gameDir());
    return res.ok ? { ok: true } : { ok: false, error: res.error };
  });
  electron.ipcMain.handle(IPC.JAVA_LIST, async () => {
    try {
      return { ok: true, data: await getJavaState() };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });
  electron.ipcMain.handle(IPC.JAVA_SET_PREFERRED, async (_e, path2) => {
    try {
      await setPreferredJava(typeof path2 === "string" && path2 ? path2 : null);
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });
  electron.ipcMain.handle(IPC.JAVA_INSTALL, async (_e, major, mcVersion) => {
    if (!Number.isInteger(major) || major < 8 || major > 40) return { ok: false, error: "Noto'g'ri Java versiyasi." };
    try {
      const path2 = await installJava(major, typeof mcVersion === "string" ? mcVersion : void 0, (e) => {
        getWindow()?.webContents.send(IPC.JAVA_INSTALL_EVENT, e);
      });
      return { ok: true, data: path2 };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });
  electron.ipcMain.handle(IPC.OPEN_EXTERNAL, async (_e, url) => {
    try {
      await electron.shell.openExternal(url);
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });
  electron.ipcMain.handle(IPC.OAUTH_BEGIN, async (_e, page) => {
    const res = await beginOAuthCallback(pageStrings(page));
    return res.ok ? { ok: true } : { ok: false, error: res.reason };
  });
  electron.ipcMain.handle(IPC.OAUTH_AWAIT, async () => {
    const res = await awaitOAuthCallback();
    if (!res.ok) return { ok: false, error: res.providerCode ? `${res.reason}:${res.providerCode}` : res.reason };
    const win = getWindow();
    if (win) {
      if (win.isMinimized()) win.restore();
      win.show();
      win.focus();
    }
    return { ok: true, data: res.code };
  });
  electron.ipcMain.handle(IPC.OAUTH_CANCEL, () => {
    cancelOAuthCallback();
    return { ok: true };
  });
  electron.ipcMain.handle(IPC.SET_INSTALL_PATH, async (_e, path2) => {
    try {
      setInstallPath(path2);
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });
  electron.ipcMain.handle(IPC.PICK_INSTALL_DIRECTORY, async () => {
    try {
      const win = getWindow();
      const result = win ? await electron.dialog.showOpenDialog(win, { properties: ["openDirectory", "createDirectory"] }) : await electron.dialog.showOpenDialog({ properties: ["openDirectory", "createDirectory"] });
      if (result.canceled || result.filePaths.length === 0) return { ok: true, data: null };
      return { ok: true, data: result.filePaths[0] };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });
  electron.ipcMain.handle(IPC.PICK_SKIN_FILE, async () => {
    try {
      const win = getWindow();
      const opts = {
        title: "Skin PNG faylini tanlang",
        filters: [{ name: "PNG rasm", extensions: ["png"] }],
        properties: ["openFile"]
      };
      const result = win ? await electron.dialog.showOpenDialog(win, opts) : await electron.dialog.showOpenDialog(opts);
      if (result.canceled || result.filePaths.length === 0) return { ok: true, data: null };
      const { readFileSync } = await import("fs");
      const buf = readFileSync(result.filePaths[0]);
      if (buf.length < 24) return { ok: false, error: "Fayl juda kichik - bu PNG emas" };
      const PNG_MAGIC2 = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
      if (!buf.subarray(0, 8).equals(PNG_MAGIC2)) {
        return { ok: false, error: "Bu fayl PNG formatida emas" };
      }
      const width = buf.readUInt32BE(16);
      const height = buf.readUInt32BE(20);
      if (!(width === 64 && height === 64 || width === 64 && height === 32)) {
        return { ok: false, error: `Skin o'lchami ${width}x${height} - Minecraft faqat 64x64 yoki 64x32 qabul qiladi` };
      }
      return { ok: true, data: buf.toString("base64") };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });
  electron.ipcMain.handle(IPC.DOWNLOAD_FILE, async (_e, url) => {
    try {
      const win = getWindow();
      if (!win) return { ok: false, error: "Oyna topilmadi" };
      win.webContents.downloadURL(url);
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });
  electron.ipcMain.handle(IPC.WINDOW_MINIMIZE, async () => {
    try {
      getWindow()?.minimize();
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });
  electron.ipcMain.handle(IPC.WINDOW_CLOSE, async () => {
    try {
      getWindow()?.close();
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });
  electron.ipcMain.handle(IPC.WINDOW_TOGGLE_MAXIMIZE, async () => {
    try {
      const win = getWindow();
      if (win?.isMaximized()) win.unmaximize();
      else win?.maximize();
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });
  electron.ipcMain.handle(IPC.MC_VERSIONS, async () => {
    try {
      const [vanilla, fabricSet, quiltSet, forgeSet] = await Promise.all([
        listMinecraftVersions(),
        listSupportedGameVersions("fabric"),
        listSupportedGameVersions("quilt"),
        listForgeSupportedVersions()
      ]);
      const entries = [];
      for (const v of vanilla) {
        entries.push({ id: `vanilla:${v.id}`, mcVersion: v.id, mcType: v.type, loader: "vanilla" });
        if (fabricSet.has(v.id)) {
          entries.push({ id: `fabric:${v.id}`, mcVersion: v.id, mcType: v.type, loader: "fabric" });
        }
        if (quiltSet.has(v.id)) {
          entries.push({ id: `quilt:${v.id}`, mcVersion: v.id, mcType: v.type, loader: "quilt" });
        }
        if (forgeSet.has(v.id)) {
          entries.push({ id: `forge:${v.id}`, mcVersion: v.id, mcType: v.type, loader: "forge" });
        }
      }
      return { ok: true, data: entries };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });
  electron.ipcMain.handle(IPC.MOD_DOWNLOAD, async (_e, req) => {
    try {
      await downloadModAsset(req, emitMod);
      return { ok: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      emitMod({ type: "error", filename: req.filename, message });
      return { ok: false, error: message };
    }
  });
  electron.ipcMain.handle(
    IPC.MOD_REMOVE,
    async (_e, kind, filename, worldName) => {
      try {
        removeModAsset(kind, filename, worldName);
        emitMod({ type: "done", filename });
        return { ok: true };
      } catch (err) {
        return { ok: false, error: err instanceof Error ? err.message : String(err) };
      }
    }
  );
  electron.ipcMain.handle(
    IPC.MOD_REVEAL,
    async (_e, kind, filename, worldName) => {
      try {
        electron.shell.showItemInFolder(resolveInstalledAssetPath(kind, filename, worldName));
        return { ok: true };
      } catch (err) {
        return { ok: false, error: err instanceof Error ? err.message : String(err) };
      }
    }
  );
  electron.ipcMain.handle(
    IPC.MOD_CHECK_DEPENDENCIES,
    async (_e, modrinthProjectId, gameVersion, loader, kind, worldName) => {
      try {
        return { ok: true, data: await checkMissingDependencies(modrinthProjectId, gameVersion, loader, kind, worldName) };
      } catch (err) {
        return { ok: false, error: err instanceof Error ? err.message : String(err) };
      }
    }
  );
  electron.ipcMain.handle(
    IPC.MOD_CHECK_SHADER_SUPPORT,
    async (_e, gameVersion, loader) => {
      try {
        return { ok: true, data: await checkShaderSupport(gameVersion, loader) };
      } catch (err) {
        return { ok: false, error: err instanceof Error ? err.message : String(err) };
      }
    }
  );
  electron.ipcMain.handle(IPC.MOD_LIST_INSTALLED, async () => {
    try {
      return { ok: true, data: listInstalledModAssets() };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });
  electron.ipcMain.handle(IPC.MAP_DOWNLOAD, async (_e, req) => {
    try {
      await downloadAndInstallMap(req, emitMap);
      return { ok: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      emitMap({ type: "error", worldName: req.worldName, message });
      return { ok: false, error: message };
    }
  });
  electron.ipcMain.handle(IPC.MAP_REMOVE, async (_e, worldName) => {
    try {
      removeMap(worldName);
      emitMap({ type: "done", worldName, finalName: worldName });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });
  electron.ipcMain.handle(IPC.MAP_LIST_INSTALLED, async () => {
    try {
      return { ok: true, data: listInstalledMaps() };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });
  electron.ipcMain.handle(IPC.ARENA_APPLY_PACK, async (_e, req) => {
    try {
      await withModLock(
        () => applyArenaPack(req, (percent, file2) => {
          getWindow()?.webContents.send(IPC.ARENA_PACK_EVENT, { type: "progress", arenaId: req.arenaId, percent, file: file2 });
        })
      );
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });
  electron.ipcMain.handle(IPC.ARENA_APPLY_RESOURCE_PACK, async (_e, req) => {
    try {
      return { ok: true, data: await applyArenaResourcePack(req) };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });
  electron.ipcMain.handle(IPC.ARENA_RESTORE_MODS, async () => {
    try {
      return { ok: true, data: await withModLock(() => restoreUserMods()) };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });
  electron.ipcMain.handle(IPC.ARENA_PACK_STATUS, async (_e, version, loader) => {
    try {
      return { ok: true, data: arenaPackStatus(version, loader) };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });
  electron.ipcMain.handle(IPC.ARENA_UNVAULT_WORLD, async (_e, req) => {
    try {
      return { ok: true, data: await unvaultWorld(req.version, req.loader, req.arenaId, req.world) };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });
  electron.ipcMain.handle(IPC.ARENA_BEGIN_SESSION, async (_e, req) => {
    try {
      beginArenaSession({ version: req.version, loader: req.loader, arenaId: req.arenaId, world: req.world });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });
  electron.ipcMain.handle(IPC.UI_THEME_LIST, async () => {
    try {
      return { ok: true, data: listInstalledThemes() };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });
  electron.ipcMain.handle(IPC.UI_THEME_ACTIVE, async () => {
    try {
      return { ok: true, data: getActiveTheme() };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });
  electron.ipcMain.handle(IPC.UI_THEME_SET_ACTIVE, async (_e, id) => {
    try {
      setActiveTheme(id);
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });
  electron.ipcMain.handle(
    IPC.UI_THEME_INSTALL_URL,
    async (_e, id, url) => {
      try {
        const installed2 = await installThemeFromUrl(id, url);
        setUiModEnabled(true);
        return { ok: true, data: installed2 };
      } catch (err) {
        return { ok: false, error: err instanceof Error ? err.message : String(err) };
      }
    }
  );
  electron.ipcMain.handle(
    IPC.UI_THEME_INSTALL_FILE,
    async (_e, id, zipPath) => {
      try {
        const installed2 = installThemeFromZip(id, zipPath);
        setUiModEnabled(true);
        return { ok: true, data: installed2 };
      } catch (err) {
        return { ok: false, error: err instanceof Error ? err.message : String(err) };
      }
    }
  );
  electron.ipcMain.handle(IPC.UI_THEME_REMOVE, async (_e, id) => {
    try {
      removeTheme(id);
      if (listInstalledThemes().length === 0) removeUiMod(path.join(gameDir(), "instances"));
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });
  electron.ipcMain.handle(
    IPC.MR_SEARCH_MODS,
    async (_e, offset, gameVersion, query, projectType, loader) => {
      return { ok: true, data: await searchModrinthMods(offset, gameVersion, query, projectType, loader) };
    }
  );
  electron.ipcMain.handle(
    IPC.MR_MOD_DETAIL,
    async (_e, slug, gameVersion, projectType) => {
      return { ok: true, data: await getModrinthModDetail(slug, gameVersion, projectType) };
    }
  );
  electron.ipcMain.handle(
    IPC.MR_FIND_BY_FILENAME,
    async (_e, filename) => {
      return { ok: true, data: await findProjectInfoByFilename(filename) };
    }
  );
  electron.ipcMain.handle(IPC.MR_GAME_VERSIONS, async () => {
    return { ok: true, data: await listModrinthGameVersions() };
  });
  electron.ipcMain.handle(IPC.TRANSLATE_BATCH, async (_e, texts) => {
    try {
      return { ok: true, data: await translateBatch(texts) };
    } catch {
      return { ok: true, data: texts };
    }
  });
  startPetBridge((m) => {
    const w = getWindow();
    if (w && !w.isDestroyed()) w.webContents.send(IPC.PET_SYNC_EVENT, m);
  });
  electron.ipcMain.handle(IPC.PET_SYNC_INCOMING, async (_e, ev) => ({ ok: pushPetEvent(ev) }));
  electron.ipcMain.handle(IPC.UPDATE_PENDING, async () => ({ ok: true, data: getPendingUpdate() }));
  electron.ipcMain.handle(IPC.UPDATE_CHECK, async () => {
    if (!electron.app.isPackaged) return { ok: false, error: "Dasturlash rejimida yangilanish tekshirilmaydi" };
    checkForUpdates();
    return { ok: true };
  });
  electron.ipcMain.handle(IPC.UPDATE_QUIT_AND_INSTALL, async () => {
    quitAndInstall();
    return { ok: true };
  });
  const emitQuiet = (e) => {
    getWindow()?.webContents.send(IPC.EVENT, e);
  };
  const emitBridge = (e) => {
    getWindow()?.webContents.send(IPC.BRIDGE_EVENT, e);
  };
  electron.ipcMain.handle(IPC.BRIDGE_LAUNCH, async (_e, req) => {
    try {
      await startBridge(req, { launch: emit2, launchQuiet: emitQuiet, bridge: emitBridge });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });
  electron.ipcMain.handle(IPC.BRIDGE_STOP, async () => {
    stopBridge();
    return { ok: true };
  });
  electron.ipcMain.handle(IPC.BRIDGE_PROBE_LAN, async (_e, lan) => {
    try {
      return { ok: true, data: await probeLan(lan) };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });
  electron.ipcMain.handle(IPC.SHOW_NOTIFICATION, async (_e, payload) => {
    const p = typeof payload === "object" && payload !== null ? payload : {};
    if (typeof p.title !== "string" || typeof p.body !== "string" || !p.title.trim()) return { ok: false, error: "Bildirishnoma matni noto'g'ri" };
    if (!electron.Notification.isSupported()) return { ok: false, error: "Bildirishnomalar qo'llab-quvvatlanmaydi" };
    new electron.Notification({ title: p.title.slice(0, 80), body: p.body.slice(0, 240) }).show();
    return { ok: true };
  });
  electron.ipcMain.handle(IPC.SET_BACKGROUND_THROTTLING, async (_e, allowed) => {
    if (typeof allowed !== "boolean") return { ok: false, error: "Noto'g'ri qiymat" };
    const win = getWindow();
    if (win && !win.isDestroyed()) win.webContents.setBackgroundThrottling(allowed);
    return { ok: true };
  });
  electron.ipcMain.handle(IPC.PARTY_MANIFEST, async (_e, target) => {
    try {
      return { ok: true, data: await readPartyManifest(readTarget$1(target)) };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });
  electron.ipcMain.handle(IPC.PARTY_PACKS, async (_e, target, refs) => {
    try {
      return { ok: true, data: await checkPartyPacks(readTarget$1(target), refs) };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });
  electron.ipcMain.handle(IPC.PARTY_SYNC_MODS, async (_e, req) => {
    try {
      const data = await withModLock(
        () => applyPartyModSync(req, (percent) => {
          getWindow()?.webContents.send(IPC.ARENA_PACK_EVENT, { type: "progress", arenaId: PARTY_SYNC_ID, percent, file: "" });
        })
      );
      return { ok: true, data };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });
  electron.ipcMain.handle(IPC.PARTY_HOST_SUPPORT, async (_e, target) => {
    try {
      const t = readTarget$1(target);
      return { ok: true, data: await checkHostSupport(t.version, t.loader) };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });
  electron.ipcMain.handle(IPC.BRIDGE_PREWARM, async (_e, req) => {
    try {
      await prewarmBridge(req, emitQuiet);
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });
  setTunnelEmitter((e) => {
    const win = getWindow();
    if (win && !win.isDestroyed()) win.webContents.send(IPC.TUNNEL_EVENT, e);
  });
  const isConnId = (v) => typeof v === "number" && Number.isInteger(v) && v > 0;
  electron.ipcMain.handle(IPC.TUNNEL_ENTRY_OPEN, async () => {
    try {
      return { ok: true, data: await openEntry() };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });
  electron.ipcMain.handle(IPC.TUNNEL_ENTRY_CLOSE, async () => {
    if (!isBridgeActive()) closeEntry();
    return { ok: true };
  });
  electron.ipcMain.handle(IPC.TUNNEL_PROBE, async (_e, timeoutMs) => {
    const ms = typeof timeoutMs === "number" && timeoutMs > 0 ? Math.min(timeoutMs, 15e3) : 6e3;
    return { ok: true, data: await probeEntry(ms) };
  });
  electron.ipcMain.handle(IPC.TUNNEL_DIAL, async () => {
    try {
      return { ok: true, data: dial(hostTunnelPort()) };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });
  electron.ipcMain.on(IPC.TUNNEL_WRITE, (_e, id, data) => {
    if (isConnId(id) && data instanceof Uint8Array) write(id, data);
  });
  electron.ipcMain.on(IPC.TUNNEL_FLOW, (_e, id, paused) => {
    if (isConnId(id) && typeof paused === "boolean") setPaused(id, paused);
  });
  electron.ipcMain.on(IPC.TUNNEL_CLOSE, (_e, id) => {
    if (isConnId(id)) closeConn(id);
  });
  electron.ipcMain.handle(IPC.MIC_REQUEST_ACCESS, async () => {
    try {
      return { ok: true, data: await requestMicrophoneAccess() };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });
  electron.app.on("before-quit", () => {
    stopBridge();
    killGame();
  });
  return { launch: runLaunch, isLaunching: () => launchesInFlight > 0 };
}
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".mp4": "video/mp4"
};
const FIXED_PORT = 47823;
function startRendererServer(rootDir) {
  const root = path.normalize(rootDir);
  return new Promise((resolve, reject2) => {
    const server2 = http.createServer((req, res) => {
      const urlPath = decodeURIComponent((req.url ?? "/").split("?")[0] ?? "/");
      const relPath = urlPath === "/" ? "index.html" : urlPath.replace(/^\/+/, "");
      const filePath = path.normalize(path.join(root, relPath));
      if (!filePath.startsWith(root) || !fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
        res.writeHead(404);
        res.end("Not found");
        return;
      }
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { "Content-Type": MIME[ext] ?? "application/octet-stream" });
      fs.createReadStream(filePath).pipe(res);
    });
    function onListening() {
      const address = server2.address();
      if (address && typeof address === "object") resolve(address.port);
      else reject2(new Error("Lokal server porti aniqlanmadi"));
    }
    server2.once("error", (err) => {
      if (err.code !== "EADDRINUSE") {
        reject2(err);
        return;
      }
      server2.removeAllListeners("error");
      server2.once("error", reject2);
      server2.once("listening", onListening);
      server2.listen(0, "127.0.0.1");
    });
    server2.once("listening", onListening);
    server2.listen(FIXED_PORT, "127.0.0.1");
  });
}
const PRAYER_CONFIG = {
  city: "Toshkent",
  latitude: 41.2995,
  longitude: 69.2401,
  fajrAngle: 18,
  ishaAngle: 17,
  asrFactor: 2,
  dhuhrMinutes: 0,
  maghribMinutes: 0
};
const PRAYER_ORDER = ["fajr", "dhuhr", "asr", "maghrib", "isha"];
const PRAYER_LABELS = {
  fajr: "Bomdod",
  dhuhr: "Peshin",
  asr: "Asr",
  maghrib: "Shom",
  isha: "Xufton"
};
const DEG = Math.PI / 180;
const sin = (d) => Math.sin(d * DEG);
const cos = (d) => Math.cos(d * DEG);
const tan = (d) => Math.tan(d * DEG);
const asin = (x) => Math.asin(x) / DEG;
const acos = (x) => Math.acos(x) / DEG;
const atan2 = (y, x) => Math.atan2(y, x) / DEG;
const acot = (x) => Math.atan(1 / x) / DEG;
const fix = (a, b) => {
  const r = a - b * Math.floor(a / b);
  return r < 0 ? r + b : r;
};
const fixAngle = (a) => fix(a, 360);
const fixHour = (h) => fix(h, 24);
function julian(year, month, day) {
  if (month <= 2) {
    year -= 1;
    month += 12;
  }
  const a = Math.floor(year / 100);
  const b = 2 - a + Math.floor(a / 4);
  return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + b - 1524.5;
}
function sunPosition(jd) {
  const d = jd - 2451545;
  const g = fixAngle(357.529 + 0.98560028 * d);
  const q = fixAngle(280.459 + 0.98564736 * d);
  const l = fixAngle(q + 1.915 * sin(g) + 0.02 * sin(2 * g));
  const e = 23.439 - 36e-8 * d;
  const ra = atan2(cos(e) * sin(l), cos(l)) / 15;
  return { decl: asin(sin(e) * sin(l)), eqt: q / 15 - fixHour(ra) };
}
function computePrayerTimes(date, cfg = PRAYER_CONFIG) {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const lat = cfg.latitude;
  const lng = cfg.longitude;
  const tz = -new Date(y, m - 1, d, 12).getTimezoneOffset() / 60;
  const jDate = julian(y, m, d) - lng / (15 * 24);
  const midDay = (t2) => fixHour(12 - sunPosition(jDate + t2 / 24).eqt);
  const sunAngleTime = (angle, t2, ccw) => {
    const { decl } = sunPosition(jDate + t2 / 24);
    const noon = midDay(t2);
    const h = acos((-sin(angle) - sin(decl) * sin(lat)) / (cos(decl) * cos(lat))) / 15;
    return noon + (ccw ? -h : h);
  };
  const asrTime = (t2) => {
    const { decl } = sunPosition(jDate + t2 / 24);
    const angle = -acot(cfg.asrFactor + tan(Math.abs(lat - decl)));
    return sunAngleTime(angle, t2, false);
  };
  let t = { fajr: 5, dhuhr: 12, asr: 13, sunset: 18, isha: 18 };
  for (let i = 0; i < 2; i++) {
    t = {
      fajr: sunAngleTime(cfg.fajrAngle, t.fajr, true),
      dhuhr: midDay(t.dhuhr),
      asr: asrTime(t.asr),
      sunset: sunAngleTime(0.833, t.sunset, false),
      isha: sunAngleTime(cfg.ishaAngle, t.isha, false)
    };
  }
  const local = (hours, extraMin) => {
    if (!Number.isFinite(hours)) return null;
    const h = hours + tz - lng / 15 + extraMin / 60;
    const minutes = Math.round(h * 60);
    return new Date(y, m - 1, d, 0, minutes, 0, 0);
  };
  const raw = {
    fajr: local(t.fajr, 0),
    dhuhr: local(t.dhuhr, cfg.dhuhrMinutes),
    asr: local(t.asr, 0),
    maghrib: local(t.sunset, cfg.maghribMinutes),
    isha: local(t.isha, 0)
  };
  const out = [];
  for (const name of PRAYER_ORDER) {
    const at = raw[name];
    if (at) out.push({ name, label: PRAYER_LABELS[name], at });
  }
  return out;
}
function formatClock(at) {
  return `${String(at.getHours()).padStart(2, "0")}:${String(at.getMinutes()).padStart(2, "0")}`;
}
const TASK_TTL_MS = 24 * 60 * 60 * 1e3;
const PURGE_EVERY_MS = 60 * 60 * 1e3;
const MAX_TASKS_FREE = 10;
const MAX_TASKS_PRO = 30;
const MAX_TASK_LEN = 200;
const PRAYER_CHECK_MS = 2e4;
const PRAYER_LEAD_MIN = 15;
const REMINDER_MS = 4e4;
const REMINDER_CLOSE_GRACE_MS = 1500;
const MASCOT_REPLY_MS = 2500;
const REMINDER_SIZE = { width: 400, height: 150 };
const NAMES_SIZE = { width: 560, height: 660 };
const PLANS_SIZE = { width: 340, height: 480 };
const TOPMOST_KEEPALIVE_MS = 1500;
const TOGGLES_V = 2;
const DEFAULT_FOCUS = {
  prayerReminder: false,
  asmaulHusna: false,
  plans: false,
  togglesV: TOGGLES_V,
  tasks: [],
  proUntil: null,
  plansPinned: false,
  plansPos: null
};
const settingsFile = () => path.join(electron.app.getPath("userData"), "settings.json");
function readRaw() {
  try {
    if (fs.existsSync(settingsFile())) {
      const raw = JSON.parse(fs.readFileSync(settingsFile(), "utf-8"));
      if (raw && typeof raw === "object" && !Array.isArray(raw)) return raw;
    }
  } catch {
  }
  return {};
}
function sanitizeTask(raw) {
  if (!raw || typeof raw !== "object") return null;
  const r = raw;
  if (typeof r.id !== "string" || !r.id || r.id.length > 64) return null;
  if (typeof r.text !== "string" || !r.text.trim()) return null;
  const createdAt = Number(r.createdAt);
  if (!Number.isFinite(createdAt) || createdAt <= 0) return null;
  return { id: r.id, text: r.text.trim().slice(0, MAX_TASK_LEN), createdAt, done: r.done === true };
}
function load() {
  const raw = readRaw().focus;
  if (!raw || typeof raw !== "object") return { ...DEFAULT_FOCUS, tasks: [] };
  const r = raw;
  const pos = r.plansPos;
  return {
    prayerReminder: typeof r.prayerReminder === "boolean" ? r.prayerReminder : DEFAULT_FOCUS.prayerReminder,
    // Eski (v1) faylda "99 ism" avtomatik yoqiq saqlangan - yangi standart bo'yicha o'chiq boshlanadi
    asmaulHusna: r.togglesV === TOGGLES_V && typeof r.asmaulHusna === "boolean" ? r.asmaulHusna : DEFAULT_FOCUS.asmaulHusna,
    plans: typeof r.plans === "boolean" ? r.plans : DEFAULT_FOCUS.plans,
    togglesV: TOGGLES_V,
    tasks: Array.isArray(r.tasks) ? r.tasks.map(sanitizeTask).filter(Boolean).slice(0, MAX_TASKS_PRO) : [],
    proUntil: typeof r.proUntil === "number" && Number.isFinite(r.proUntil) ? r.proUntil : null,
    plansPinned: r.plansPinned === true,
    plansPos: pos && typeof pos.x === "number" && typeof pos.y === "number" ? { x: pos.x, y: pos.y } : null
  };
}
function save(next) {
  try {
    fs.mkdirSync(path.dirname(settingsFile()), { recursive: true });
    fs.writeFileSync(settingsFile(), JSON.stringify({ ...readRaw(), focus: next }, null, 2), "utf-8");
  } catch (err) {
    console.warn(`[focus] settings.json yozilmadi: ${err instanceof Error ? err.message : String(err)}`);
  }
}
const isPro = (s, now = Date.now()) => s.proUntil !== null && s.proUntil > now;
const maxTasks = (s) => isPro(s) ? MAX_TASKS_PRO : MAX_TASKS_FREE;
function purgeExpiredTasks() {
  const s = load();
  const now = Date.now();
  if (isPro(s, now)) return false;
  const kept = s.tasks.filter((t) => now - t.createdAt < TASK_TTL_MS);
  if (kept.length === s.tasks.length) return false;
  save({ ...s, tasks: kept });
  console.log(`[focus] ${s.tasks.length - kept.length} ta eski reja o'chirildi (24 soat)`);
  return true;
}
function todayPrayers(now = /* @__PURE__ */ new Date()) {
  return computePrayerTimes(now);
}
function buildState() {
  purgeExpiredTasks();
  const s = load();
  return {
    prayerReminder: s.prayerReminder,
    asmaulHusna: s.asmaulHusna,
    plans: s.plans,
    tasks: s.tasks,
    isPro: isPro(s),
    taskTtlMs: TASK_TTL_MS,
    maxTasks: maxTasks(s),
    plansPinned: s.plansPinned,
    city: PRAYER_CONFIG.city,
    prayers: todayPrayers().map((p) => ({ name: p.name, label: p.label, time: formatClock(p.at), at: p.at.getTime() }))
  };
}
function menuRows(s) {
  return (s.asmaulHusna ? 1 : 0) + (s.plans ? 1 : 0);
}
function broadcast() {
  const state = buildState();
  for (const win of electron.BrowserWindow.getAllWindows()) {
    if (!win.isDestroyed()) win.webContents.send(IPC.FOCUS_STATE, state);
  }
  setMascotMenuExtraRows(menuRows(state));
  return state;
}
let resolveRendererUrl$1 = null;
let reminderWin = null;
let namesWin = null;
let plansWin = null;
let reminderTimer = null;
let reminderKeepAlive = null;
let plansKeepAlive = null;
let currentReminder = null;
async function pageUrl(route) {
  if (!resolveRendererUrl$1) return null;
  try {
    const base = await resolveRendererUrl$1();
    const url = new URL("focus.html", base);
    url.hash = route;
    return url.toString();
  } catch (err) {
    console.warn(`[focus] sahifa manzili topilmadi: ${err instanceof Error ? err.message : String(err)}`);
    return null;
  }
}
const WEB_PREFERENCES = {
  preload: path.join(__dirname, "../preload/index.js"),
  sandbox: false,
  contextIsolation: true,
  nodeIntegration: false
};
const alive = (w) => !!w && !w.isDestroyed();
function baseWindow(opts) {
  const win = new electron.BrowserWindow({
    show: false,
    frame: false,
    transparent: true,
    backgroundColor: "#00000000",
    hasShadow: false,
    resizable: false,
    maximizable: false,
    fullscreenable: false,
    autoHideMenuBar: true,
    webPreferences: WEB_PREFERENCES,
    ...opts
  });
  win.webContents.setWindowOpenHandler(() => ({ action: "deny" }));
  return win;
}
function activeWorkArea() {
  return electron.screen.getDisplayNearestPoint(electron.screen.getCursorScreenPoint()).workArea;
}
function stopReminderTimers() {
  if (reminderTimer) clearTimeout(reminderTimer);
  reminderTimer = null;
  if (reminderKeepAlive) clearInterval(reminderKeepAlive);
  reminderKeepAlive = null;
}
async function openReminder(reminder) {
  currentReminder = reminder;
  if (alive(reminderWin)) {
    reminderWin.destroy();
  }
  stopReminderTimers();
  const url = await pageUrl("reminder");
  if (!url) return;
  const wa = electron.screen.getPrimaryDisplay().workArea;
  const win = baseWindow({
    width: REMINDER_SIZE.width,
    height: REMINDER_SIZE.height,
    x: wa.x + wa.width - REMINDER_SIZE.width,
    y: wa.y,
    movable: false,
    minimizable: false,
    skipTaskbar: true,
    focusable: false,
    alwaysOnTop: true,
    title: "NeoTerra - Namoz eslatmasi"
  });
  reminderWin = win;
  win.setAlwaysOnTop(true, "screen-saver");
  win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  win.once("ready-to-show", () => {
    if (win.isDestroyed()) return;
    win.showInactive();
    win.moveTop();
  });
  win.on("closed", () => {
    if (reminderWin === win) {
      reminderWin = null;
      stopReminderTimers();
    }
  });
  reminderKeepAlive = setInterval(() => {
    if (!alive(win)) return;
    win.setAlwaysOnTop(true, "screen-saver");
    win.moveTop();
  }, TOPMOST_KEEPALIVE_MS);
  reminderTimer = setTimeout(() => {
    if (alive(win)) win.destroy();
  }, REMINDER_MS + REMINDER_CLOSE_GRACE_MS);
  void win.loadURL(url);
}
async function openNames() {
  if (alive(namesWin)) {
    namesWin.show();
    namesWin.focus();
    return;
  }
  const url = await pageUrl("names");
  if (!url) return;
  const wa = activeWorkArea();
  const width = Math.min(NAMES_SIZE.width, wa.width - 40);
  const height = Math.min(NAMES_SIZE.height, wa.height - 40);
  const win = baseWindow({
    width,
    height,
    x: Math.round(wa.x + (wa.width - width) / 2),
    y: Math.round(wa.y + (wa.height - height) / 2),
    movable: false,
    minimizable: false,
    skipTaskbar: true,
    alwaysOnTop: true,
    title: "Ollohning 99 ismi"
  });
  namesWin = win;
  win.setAlwaysOnTop(true, "floating");
  let shownAt = 0;
  win.once("ready-to-show", () => {
    if (win.isDestroyed()) return;
    shownAt = Date.now();
    win.show();
    win.focus();
    try { initDiscordRpc(); } catch {}
  });
  win.on("blur", () => {
    if (Date.now() - shownAt < 400) {
      setTimeout(() => alive(win) && win.focus(), 0);
      return;
    }
    if (alive(win)) win.close();
  });
  win.on("closed", () => {
    if (namesWin === win) namesWin = null;
  });
  void win.loadURL(url);
}
function applyPlansPin(win, pinned) {
  if (plansKeepAlive) clearInterval(plansKeepAlive);
  plansKeepAlive = null;
  if (pinned) {
    win.setAlwaysOnTop(true, "screen-saver");
    win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
    win.setIgnoreMouseEvents(true, { forward: true });
    win.blur();
    win.moveTop();
    plansKeepAlive = setInterval(() => {
      if (!alive(win)) return;
      win.setAlwaysOnTop(true, "screen-saver");
      win.moveTop();
    }, TOPMOST_KEEPALIVE_MS);
  } else {
    win.setIgnoreMouseEvents(false);
    win.setAlwaysOnTop(false);
    win.setVisibleOnAllWorkspaces(false);
  }
}
async function openPlans() {
  if (alive(plansWin)) {
    if (plansWin.isMinimized()) plansWin.restore();
    plansWin.show();
    plansWin.focus();
    return;
  }
  const url = await pageUrl("plans");
  if (!url) return;
  const s = load();
  const wa = activeWorkArea();
  let x = wa.x + wa.width - PLANS_SIZE.width - 24;
  let y = wa.y + REMINDER_SIZE.height + 16;
  if (s.plansPos) {
    const d = electron.screen.getDisplayMatching({ ...s.plansPos, ...PLANS_SIZE }).workArea;
    x = Math.min(Math.max(s.plansPos.x, d.x - PLANS_SIZE.width + 80), d.x + d.width - 80);
    y = Math.min(Math.max(s.plansPos.y, d.y), d.y + d.height - 60);
  }
  const win = baseWindow({
    width: PLANS_SIZE.width,
    height: PLANS_SIZE.height,
    x: Math.round(x),
    y: Math.round(y),
    minimizable: true,
    skipTaskbar: false,
    title: "Rejalarim"
  });
  plansWin = win;
  applyPlansPin(win, s.plansPinned);
  win.once("ready-to-show", () => {
    if (win.isDestroyed()) return;
    win.show();
    win.focus();
  });
  let moveTimer = null;
  win.on("moved", () => {
    if (moveTimer) clearTimeout(moveTimer);
    moveTimer = setTimeout(() => {
      if (!alive(win)) return;
      const b = win.getBounds();
      save({ ...load(), plansPos: { x: b.x, y: b.y } });
    }, 400);
  });
  win.on("closed", () => {
    if (moveTimer) clearTimeout(moveTimer);
    if (plansWin === win) {
      plansWin = null;
      if (plansKeepAlive) clearInterval(plansKeepAlive);
      plansKeepAlive = null;
    }
  });
  void win.loadURL(url);
}
const MOTIVATION = [
  (l, m) => `${l} vaqtiga ${m} daqiqa qoldi. O'yinni saqlab, tayyorgarlik ko'r, qahramon!`,
  (l, m) => `${l} kirishiga ${m} daqiqa qoldi. Raundni yakunla va tahoratga shaylan!`,
  (l, m) => `${m} daqiqadan keyin ${l}. Eng katta g'alaba - vaqtida o'qilgan namoz!`,
  (l, m) => `${l}ga ${m} daqiqa qoldi. Dunyoni saqla, inventarni yig' - namozga tayyorlan!`
];
const notified = /* @__PURE__ */ new Set();
let prayerTimer = null;
let pendingReminder = null;
let reminderSeq = 0;
function dayKey(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function makeReminder(p, minutes, preview = false) {
  const pick2 = MOTIVATION[Math.floor(Math.random() * MOTIVATION.length)];
  return {
    id: `r${++reminderSeq}`,
    prayer: p.name,
    label: p.label,
    minutes,
    time: formatClock(p.at),
    text: pick2(p.label, minutes),
    preview
  };
}
function signalReminder(reminder) {
  if (pendingReminder) clearTimeout(pendingReminder.timer);
  const delivered = sendToMascot(IPC.FOCUS_PRAYER_SOON, reminder);
  if (!delivered) {
    pendingReminder = null;
    void openReminder(reminder);
    return;
  }
  pendingReminder = {
    reminder,
    timer: setTimeout(() => {
      pendingReminder = null;
      void openReminder(reminder);
    }, MASCOT_REPLY_MS)
  };
}
function checkPrayers() {
  if (!load().prayerReminder) return;
  const now = /* @__PURE__ */ new Date();
  const today2 = dayKey(now);
  for (const key of notified) if (!key.startsWith(today2)) notified.delete(key);
  for (const p of todayPrayers(now)) {
    const left = p.at.getTime() - now.getTime();
    const key = `${today2}-${p.name}`;
    if (left <= PRAYER_LEAD_MIN * 6e4 && left > 6e4 && !notified.has(key)) {
      notified.add(key);
      signalReminder(makeReminder(p, Math.min(PRAYER_LEAD_MIN, Math.ceil(left / 6e4))));
    }
  }
}
function startPrayerScheduler() {
  if (prayerTimer) return;
  checkPrayers();
  prayerTimer = setInterval(checkPrayers, PRAYER_CHECK_MS);
}
function stopPrayerScheduler() {
  if (prayerTimer) clearInterval(prayerTimer);
  prayerTimer = null;
}
function syncPrayerScheduler() {
  if (load().prayerReminder) startPrayerScheduler();
  else stopPrayerScheduler();
}
function previewReminder() {
  const now = Date.now();
  const list = [...todayPrayers(), ...todayPrayers(new Date(now + 24 * 60 * 60 * 1e3))];
  const next = list.find((p) => p.at.getTime() > now) ?? list[0];
  signalReminder(makeReminder(next, PRAYER_LEAD_MIN, true));
}
const focusWindowOf = (e) => {
  const win = electron.BrowserWindow.fromWebContents(e.sender);
  return win && (win === reminderWin || win === namesWin || win === plansWin) ? win : null;
};
function registerFocus(getRendererUrl) {
  resolveRendererUrl$1 = getRendererUrl;
  electron.ipcMain.handle(IPC.FOCUS_GET_STATE, () => ({ ok: true, data: buildState() }));
  electron.ipcMain.handle(IPC.FOCUS_SET_TOGGLES, (_e, patch) => {
    const s = load();
    if (patch && typeof patch === "object") {
      const p = patch;
      if (typeof p.prayerReminder === "boolean") s.prayerReminder = p.prayerReminder;
      if (typeof p.asmaulHusna === "boolean") s.asmaulHusna = p.asmaulHusna;
      if (typeof p.plans === "boolean") s.plans = p.plans;
    }
    save(s);
    syncPrayerScheduler();
    if (!s.asmaulHusna && alive(namesWin)) namesWin.close();
    if (!s.plans && alive(plansWin)) plansWin.close();
    return { ok: true, data: broadcast() };
  });
  electron.ipcMain.handle(IPC.FOCUS_ADD_TASK, (_e, text) => {
    if (typeof text !== "string" || !text.trim()) return { ok: false, error: "Reja matni bo'sh" };
    const s = load();
    const limit = maxTasks(s);
    if (s.tasks.length >= limit) {
      return {
        ok: false,
        error: isPro(s) ? `Ko'pi bilan ${limit} ta reja` : `Bepul tarifda ko'pi bilan ${limit} ta reja. Ko'proq uchun PRO'ga o'ting.`
      };
    }
    s.tasks.push({ id: crypto.randomUUID(), text: text.trim().slice(0, MAX_TASK_LEN), createdAt: Date.now(), done: false });
    save(s);
    return { ok: true, data: broadcast() };
  });
  electron.ipcMain.handle(IPC.FOCUS_REMOVE_TASK, (_e, id) => {
    const s = load();
    s.tasks = s.tasks.filter((t) => t.id !== id);
    save(s);
    return { ok: true, data: broadcast() };
  });
  electron.ipcMain.handle(IPC.FOCUS_TOGGLE_TASK, (_e, id) => {
    const s = load();
    s.tasks = s.tasks.map((t) => t.id === id ? { ...t, done: !t.done } : t);
    save(s);
    return { ok: true, data: broadcast() };
  });
  electron.ipcMain.on(IPC.FOCUS_SET_PRO, (_e, until) => {
    const ms = typeof until === "string" ? Date.parse(until) : NaN;
    const proUntil = Number.isFinite(ms) ? ms : null;
    const s = load();
    if (s.proUntil === proUntil) return;
    save({ ...s, proUntil });
    broadcast();
  });
  electron.ipcMain.on(IPC.FOCUS_SHOW_REMINDER, (_e, id) => {
    const pending = pendingReminder;
    if (!pending || pending.reminder.id !== id) return;
    clearTimeout(pending.timer);
    pendingReminder = null;
    void openReminder(pending.reminder);
  });
  electron.ipcMain.handle(IPC.FOCUS_GET_REMINDER, () => ({
    ok: true,
    data: currentReminder
  }));
  electron.ipcMain.on(IPC.FOCUS_PREVIEW_REMINDER, () => previewReminder());
  electron.ipcMain.on(IPC.FOCUS_OPEN, (_e, kind) => {
    const k = kind;
    if (k === "names") {
      if (load().asmaulHusna) void openNames();
    } else if (k === "plans") {
      if (load().plans) void openPlans();
    }
  });
  electron.ipcMain.on(IPC.FOCUS_CLOSE, (e) => {
    const win = focusWindowOf(e);
    if (win) win.close();
  });
  electron.ipcMain.handle(IPC.FOCUS_SET_PINNED, (e, pinned) => {
    const win = focusWindowOf(e);
    if (!win || win !== plansWin) return { ok: false, error: "Ruxsat yo'q" };
    const next = pinned === true;
    applyPlansPin(win, next);
    save({ ...load(), plansPinned: next });
    broadcast();
    return { ok: true, data: next };
  });
  electron.ipcMain.on(IPC.FOCUS_PIN_HOVER, (e, over) => {
    const win = focusWindowOf(e);
    if (!win || win !== plansWin || !load().plansPinned) return;
    win.setIgnoreMouseEvents(over !== true, { forward: true });
  });
  purgeExpiredTasks();
  setInterval(() => {
    if (purgeExpiredTasks()) broadcast();
  }, PURGE_EVERY_MS);
  electron.powerMonitor.on("resume", checkPrayers);
  electron.powerMonitor.on("unlock-screen", checkPrayers);
  syncPrayerScheduler();
  setMascotMenuExtraRows(menuRows(load()));
  electron.app.on("before-quit", () => {
    stopPrayerScheduler();
    stopReminderTimers();
    if (plansKeepAlive) clearInterval(plansKeepAlive);
    plansKeepAlive = null;
  });
}
electron.app.commandLine.appendSwitch("autoplay-policy", "no-user-gesture-required");
electron.app.commandLine.appendSwitch("disable-features", "WebRtcHideLocalIpsWithMdns");
let mainWindow = null;
let tray = null;
let lobbyKeepAlive = false;
let keepAliveHintShown = false;
let quitting = false;
let rendererUrlPromise = null;
function resolveRendererUrl() {
  if (!rendererUrlPromise) {
    rendererUrlPromise = (async () => {
      if (utils.is.dev && process.env["ELECTRON_RENDERER_URL"]) return process.env["ELECTRON_RENDERER_URL"];
      const port2 = await startRendererServer(path.join(__dirname, "../renderer"));
      return `http://127.0.0.1:${port2}/index.html`;
    })();
    rendererUrlPromise.catch(() => {
      rendererUrlPromise = null;
    });
  }
  return rendererUrlPromise;
}
async function openMainLauncher() {
  if (mainWindow && !mainWindow.isDestroyed()) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.show();
    mainWindow.focus();
    return;
  }
  await createMainWindow();
}
async function createMainWindow() {
  const win = new electron.BrowserWindow({
    width: 1100,
    height: 700,
    minWidth: 940,
    minHeight: 620,
    show: false,
    // macOS'da `frame: false` oynaning "svetofor" (yopish/yig'ish/kattalashtirish) tugmalarini
    // ham olib tashlaydi - u yerda bu tizimning eng asosiy odati, foydalanuvchi ilovani
    // yopolmay qolgandek his qiladi. Shu sabab macOS'da sarlavha paneli faqat YASHIRILADI
    // (`hiddenInset`), tugmalar esa tizimning o'zinikida qolib, chap yuqori burchakda
    // ko'rinadi - ilovaning o'z TitleBar'i esa u yerda tugmalarini chizmaydi
    // (`components/TitleBar.tsx`ga qarang).
    ...process.platform === "darwin" ? { titleBarStyle: "hiddenInset", trafficLightPosition: { x: 16, y: 14 } } : { frame: false },
    // Windows 11 DWM ramkasiz oynalarga avtomatik burchak yumaloqlash qo'shadi va bu ba'zan
    // oyna chegarasida orqa fon "sizib chiqishi" (nozik chiziq) ko'rinishiga sabab bo'ladi -
    // https://github.com/electron/electron/issues/38462
    // Faqat Windows'ga tegishli chora: macOS'da bu burchaklarni to'rtburchak qilib, tizim
    // ko'rinishidan ajralib qolishga olib kelardi.
    ...process.platform === "win32" ? { roundedCorners: false } : {},
    autoHideMenuBar: true,
    backgroundColor: "#0b0f14",
    title: "NeoTerra Launcher",
    // `build/icon.png` faqat o'rnatilgan .exe uchun (electron-builder paketlash vaqtida
    // ishlatadi) - dasturlash rejimida (`npm run dev`) oyna/taskbar belgichasi to'g'ridan-to'g'ri
    // shu yerda ko'rsatilishi kerak, aks holda Electron'ning standart belgichasi chiqaveradi.
    icon: getAppIcon(),
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      sandbox: false,
      // Xavfsizlik: renderer'da Node yo'q, hamma narsa preload orqali
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  mainWindow = win;
  try {
    const ai = getAppIcon();
    if (!ai.isEmpty()) win.setIcon(ai);
  } catch {}
  attachMainWindow(win);
  win.webContents.on("console-message", (_e, level, message, line, sourceId) => {
    console.log(`[RENDERER_LOG level=${level}] ${message} (${sourceId}:${line})`);
  });
  win.webContents.on("did-fail-load", (_e, errorCode, errorDescription, validatedURL) => {
    console.error(`[RENDERER_LOAD_FAIL] ${errorCode}: ${errorDescription} on ${validatedURL}`);
  });
  win.on("ready-to-show", () => {
    win.show();
    win.focus();
  });
  win.on("close", (e) => {
    if (quitting || !lobbyKeepAlive) return;
    e.preventDefault();
    win.hide();
    if (!keepAliveHintShown && electron.Notification.isSupported()) {
      keepAliveHintShown = true;
      new electron.Notification({
        title: "NeoTerra Launcher fonda ishlayapti",
        body: "Guruhingiz faol - do'stlaringiz uzilib qolmasligi uchun launcher yopilmadi. Qayta ochish: tray belgisi."
      }).show();
    }
  });
  win.on("closed", () => {
    if (mainWindow === win) mainWindow = null;
  });
  win.webContents.on("render-process-gone", (_e, details) => {
    console.error("[main] renderer to'xtadi:", details.reason, details.exitCode);
    if (details.reason === "clean-exit" || win.isDestroyed()) return;
    setTimeout(() => {
      if (!win.isDestroyed()) void win.loadURL(rendererUrl);
    }, 1e3);
  });
  win.webContents.setWindowOpenHandler(({ url }) => {
    electron.shell.openExternal(url);
    return { action: "deny" };
  });
  const rendererUrl = await resolveRendererUrl();
  setTrustedRendererOrigin(rendererUrl);
  win.loadURL(rendererUrl);
}
async function startMascot() {
  createMascotWindow(await resolveRendererUrl());
}
const AUTOSTART_ARG = "--autostart";
function enableAutoStart() {
  if (!electron.app.isPackaged || process.platform !== "win32" && process.platform !== "darwin") return;
  electron.app.setLoginItemSettings({ openAtLogin: true, args: [AUTOSTART_ARG] });
}
function openedAtLogin() {
  if (process.argv.includes(AUTOSTART_ARG)) return true;
  if (wasRelaunchedAfterUpdate()) return true;
  try {
    return electron.app.getLoginItemSettings().wasOpenedAtLogin === true;
  } catch {
    return false;
  }
}
function getAppIconPath() {
  const tryPaths = [
    path.join(__dirname, "../../resources/icon.ico"),
    path.join(__dirname, "../../resources/icon.png"),
    path.join(process.resourcesPath || "", "app.asar.unpacked/resources/icon.ico"),
    path.join(process.resourcesPath || "", "app.asar.unpacked/resources/icon.png"),
    path.join(process.resourcesPath || "", "resources/icon.ico"),
    path.join(process.resourcesPath || "", "resources/icon.png"),
    path.join(electron.app.getAppPath(), "resources/icon.ico"),
    path.join(electron.app.getAppPath(), "resources/icon.png")
  ];
  for (const p of tryPaths) {
    try {
      if (fs.existsSync(p)) return p;
    } catch {}
  }
  return path.join(__dirname, "../../resources/icon.ico");
}

function getAppIcon() {
  const p = getAppIconPath();
  try {
    const img = electron.nativeImage.createFromPath(p);
    if (!img.isEmpty()) return img;
  } catch {}
  try {
    const p2 = path.join(__dirname, "../../resources/icon.png");
    const img2 = electron.nativeImage.createFromPath(p2);
    if (!img2.isEmpty()) return img2;
  } catch {}
  return electron.nativeImage.createEmpty();
}

function createTray() {
  if (tray) return;
  const iconPath = getAppIconPath();
  let icon = electron.nativeImage.createFromPath(iconPath);
  if (icon.isEmpty()) {
    icon = getAppIcon();
  }
  if (!icon.isEmpty() && process.platform !== "win32") {
    icon = icon.resize({ width: 16, height: 16 });
  }
  try {
    tray = new electron.Tray(iconPath.endsWith(".ico") && process.platform === "win32" ? iconPath : icon);
  } catch (err) {
    console.error("[tray create error]:", err);
    tray = new electron.Tray(icon);
  }
  tray.setToolTip("NeoTerra Launcher");
  tray.setContextMenu(
    electron.Menu.buildFromTemplate([
      { label: "Launcherni ochish", click: () => void openMainLauncher() },
      { type: "separator" },
      { label: "Chiqish", click: () => electron.app.quit() }
    ])
  );
  tray.on("click", () => void openMainLauncher());
  tray.on("double-click", () => void openMainLauncher());
}

if (!electron.app.requestSingleInstanceLock()) {
  electron.app.quit();
} else {
  electron.app.on("second-instance", () => {
    void openMainLauncher();
  });
  electron.app.whenReady().then(() => {
    utils.electronApp.setAppUserModelId("uz.neoterra.launcher");
    electron.app.on("browser-window-created", (_, window) => utils.optimizer.watchWindowShortcuts(window));
    const ipcApi = registerIpc(() => mainWindow);
    setAutoInstallGuard(
      () => (!mainWindow || mainWindow.isDestroyed() || !mainWindow.isVisible()) && !isRunning() && !ipcApi.isLaunching() && !lobbyKeepAlive
    );
    registerMascotIpc({
      openLauncher: () => void openMainLauncher(),
      launch: ipcApi.launch,
      isLaunching: ipcApi.isLaunching,
      rendererUrl: resolveRendererUrl
    });
    recoverArenaSession();
    restoreUserModsOnStartup();
    electron.ipcMain.on(IPC.LOBBY_KEEPALIVE, (_e, active2) => {
      lobbyKeepAlive = active2 === true;
      setPartyActive(lobbyKeepAlive);
    });
    registerPermissionHandlers();
    enableAutoStart();
    createTray();
    void openMainLauncher();
    electron.app.on("activate", () => void openMainLauncher());
  });
  electron.app.on("window-all-closed", () => {
    if (process.platform !== "darwin") electron.app.quit();
  });
  electron.app.on("before-quit", () => {
    quitting = true;
    destroyMascotWindow();
    tray?.destroy();
    tray = null;
  });
}

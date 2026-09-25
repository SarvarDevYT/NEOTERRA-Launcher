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
const minecraftLauncherCore = require("minecraft-launcher-core");
const crypto = require("crypto");
const electronUpdater = require("electron-updater");
const net = require("net");
const string_decoder = require("string_decoder");
const promises = require("fs/promises");
const http = require("http");
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
      Cloudflare edge (cdn.neoterra.org) bilan uzilib qoladi va faqat "Failed to fetch"
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
function javaSatisfies(major, required) {
  return required <= 8 ? major === 8 : major >= required;
}
async function findJavaExecutable(required) {
  const tried = /* @__PURE__ */ new Set();
  async function check(exe) {
    if (tried.has(exe)) return false;
    tried.add(exe);
    if (exe !== "java" && !fs.existsSync(exe)) return false;
    const version = await runJavaVersion(exe);
    const major = version ? javaMajorOf(version) : null;
    return major !== null && javaSatisfies(major, required);
  }
  if (await check("java")) return "java";
  const javaHome = process.env.JAVA_HOME;
  if (javaHome) {
    for (const exe of javaExecutables(javaHome)) if (await check(exe)) return exe;
  }
  const { parents, direct } = searchLocations();
  for (const exe of direct) if (await check(exe)) return exe;
  for (const parent of parents) {
    for (const entry2 of safeListDir(parent)) {
      for (const exe of javaExecutables(path.join(parent, entry2))) if (await check(exe)) return exe;
    }
  }
  return null;
}
const AUTO_LAN_JAR = "mcmodhub-autolan-1.0.0.jar";
const AUTO_LAN_PROPERTY = "-Dmcmodhub.autolan=true";
function bundledJarPath() {
  return path.join(__dirname, "../../resources/mods", AUTO_LAN_JAR);
}
function ensureAutoLanInstalled(instanceRoot) {
  try {
    const source = bundledJarPath();
    if (!fs.existsSync(source)) return false;
    const bytes = fs.readFileSync(source);
    const modsDir = path.join(instanceRoot, "mods");
    fs.mkdirSync(modsDir, { recursive: true });
    for (const name of fs.readdirSync(modsDir)) {
      if (/^mcmodhub-autolan-.*\.jar$/i.test(name) && name !== AUTO_LAN_JAR) {
        try {
          fs.unlinkSync(path.join(modsDir, name));
        } catch {
        }
      }
    }
    const target = path.join(modsDir, AUTO_LAN_JAR);
    if (fs.existsSync(target) && fs.readFileSync(target).equals(bytes)) return true;
    fs.writeFileSync(target, bytes);
    return true;
  } catch {
    return false;
  }
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
async function getVanillaVersionJsonOrCached(root, mcVersion) {
  try {
    return await getVanillaVersionJson(mcVersion);
  } catch (err) {
    try {
      const local = JSON.parse(fs.readFileSync(path.join(root, "versions", mcVersion, `${mcVersion}.json`), "utf-8"));
      versionJsonCache.set(mcVersion, local);
      return local;
    } catch {
      throw err;
    }
  }
}
async function getRequiredJavaMajor(mcVersion) {
  try {
    const json = await getVanillaVersionJson(mcVersion);
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
async function pickLoaderVersion(kind, mcVersion, excluded = /* @__PURE__ */ new Set()) {
  const res = await fetchMeta(`${META_BASE[kind]}/versions/loader/${encodeURIComponent(mcVersion)}`);
  if (!res.ok) throw new Error(`${kind} loader ro'yxati olinmadi (HTTP ${res.status})`);
  const data = await res.json();
  if (data.length === 0) throw new Error(`${mcVersion} uchun ${kind} topilmadi`);
  const candidates = data.filter((e) => !excluded.has(e.loader.version));
  if (candidates.length === 0) {
    throw new Error(
      `${mcVersion} uchun ${kind}'ning ishlaydigan versiyasi topilmadi (barcha ${excluded.size} ta nomzod avvalgi urinish(lar)da sinovdan o'tkazilgan).`
    );
  }
  const best = candidates.find((e) => e.loader.stable) ?? candidates[0];
  return best.loader.version;
}
function parseLoaderVersion(dirName, kind, mcVersion) {
  const prefix = `${kind}-loader-`;
  const suffix = `-${mcVersion}`;
  if (!dirName.startsWith(prefix) || !dirName.endsWith(suffix)) return null;
  return dirName.slice(prefix.length, dirName.length - suffix.length);
}
async function ensureLoaderProfile(kind, root, mcVersion, excludedLoaderVersions = /* @__PURE__ */ new Set()) {
  try {
    const versionsDir = path.join(root, "versions");
    const existing = (await fs.promises.readdir(versionsDir)).find((name) => {
      const loaderVersion2 = parseLoaderVersion(name, kind, mcVersion);
      return loaderVersion2 !== null && !excludedLoaderVersions.has(loaderVersion2);
    });
    if (existing) {
      const versionJsonPath2 = path.join(versionsDir, existing, `${existing}.json`);
      if (fs.existsSync(versionJsonPath2)) {
        try {
          const cached = JSON.parse(fs.readFileSync(versionJsonPath2, "utf-8"));
          const loaderVersion2 = parseLoaderVersion(existing, kind, mcVersion);
          if (loaderVersion2 && cached.mainClass && Array.isArray(cached.libraries) && cached.libraries.length > 0) {
            return { customId: existing, versionJsonPath: versionJsonPath2, loaderVersion: loaderVersion2 };
          }
        } catch {
        }
      }
    }
  } catch {
  }
  const loaderVersion = await pickLoaderVersion(kind, mcVersion, excludedLoaderVersions);
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
    libraries: [...vanilla.libraries ?? [], ...loaderJson.libraries ?? []],
    arguments: {
      game: [...vanilla.arguments?.game ?? [], ...loaderJson.arguments?.game ?? []],
      jvm: [...vanilla.arguments?.jvm ?? [], ...loaderJson.arguments?.jvm ?? []]
    }
  };
  await fs.promises.writeFile(versionJsonPath, JSON.stringify(merged, null, 2));
  return { customId, versionJsonPath, loaderVersion };
}
function defaultInstallPath() {
  if (process.platform === "win32") return path.join(electron.app.getPath("appData"), ".neoterra");
  if (process.platform === "darwin") return path.join(electron.app.getPath("appData"), "mcmodhub");
  return path.join(os.homedir(), ".neoterra");
}
function configFilePath() {
  return path.join(electron.app.getPath("userData"), "config.json");
}
let cache$1 = null;
function load() {
  if (cache$1) return cache$1;
  const file = configFilePath();
  try {
    if (fs.existsSync(file)) {
      const parsed = JSON.parse(fs.readFileSync(file, "utf-8"));
      if (typeof parsed.installPath === "string" && parsed.installPath) {
        cache$1 = {
          installPath: parsed.installPath,
          lastInstance: parsed.lastInstance,
          earlyWindowDisabled: parsed.earlyWindowDisabled === true
        };
        return cache$1;
      }
    }
  } catch {
  }
  cache$1 = { installPath: defaultInstallPath() };
  return cache$1;
}
function save(config) {
  cache$1 = config;
  const file = configFilePath();
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(config, null, 2), "utf-8");
}
function getInstallPath() {
  return load().installPath;
}
function setInstallPath(path2) {
  save({ ...load(), installPath: path2 });
}
function getLastInstance() {
  return load().lastInstance ?? null;
}
function setLastInstance(version, loader) {
  save({ ...load(), lastInstance: { version, loader } });
}
function isEarlyWindowDisabled() {
  return load().earlyWindowDisabled === true;
}
function setEarlyWindowDisabled(value) {
  save({ ...load(), earlyWindowDisabled: value });
}
const DEFAULT_UI_THEME_ID = "forest";
const DEFAULT_UI_THEME_PACK_URL = "https://cdn.neoterra.org/ui-themes/forest.zip";
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
  const file = path.join(dir, "config.json");
  let current2 = {};
  if (fs.existsSync(file)) {
    try {
      current2 = JSON.parse(fs.readFileSync(file, "utf-8"));
    } catch {
      current2 = {};
    }
  }
  fs.writeFileSync(file, JSON.stringify({ ...current2, ...patch }, null, 2), "utf-8");
}
function setActiveTheme(id) {
  assertSafeId(id);
  patchConfig({ theme: id });
}
function getActiveTheme() {
  const file = path.join(uiRoot(), "config.json");
  if (!fs.existsSync(file)) return null;
  try {
    const cfg = JSON.parse(fs.readFileSync(file, "utf-8"));
    return typeof cfg.theme === "string" && cfg.theme.trim() ? cfg.theme : null;
  } catch {
    return null;
  }
}
function isUiModEnabled() {
  const file = path.join(uiRoot(), "config.json");
  if (!fs.existsSync(file)) return false;
  try {
    const cfg = JSON.parse(fs.readFileSync(file, "utf-8"));
    return cfg.uiModEnabled === true;
  } catch {
    return false;
  }
}
function setUiModEnabled(enabled) {
  patchConfig({ uiModEnabled: enabled });
}
function removedThemes() {
  const file = path.join(uiRoot(), "config.json");
  if (!fs.existsSync(file)) return [];
  try {
    const cfg = JSON.parse(fs.readFileSync(file, "utf-8"));
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
    onStatus?.("MCModHub mavzusi yuklanmoqda...");
    await installThemeFromUrl(id, DEFAULT_UI_THEME_PACK_URL);
    onStatus?.("MCModHub mavzusi o'rnatildi");
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
const UI_MOD_URL = `https://cdn.neoterra.org/mods/${UI_MOD_FILE}`;
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
    onStatus?.("MCModHub UI modi yuklanmoqda...");
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
    onStatus?.("MCModHub UI modi o'rnatildi");
    return true;
  } catch (err) {
    onStatus?.(
      `MCModHub UI modi yuklanmadi (${err instanceof Error ? err.message : String(err)}) - standart menyu bilan davom etamiz`
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
const DOWNLOAD_USER_AGENT = "NeoTerra-Launcher/1.0 (+https://neoterra.uz)";
class DownloadError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
    this.name = "DownloadError";
  }
}
const PERMANENT_STATUSES = /* @__PURE__ */ new Set([400, 401, 403, 404, 405, 410, 451]);
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function hashFile$1(path2, algorithm) {
  const hash = crypto.createHash(algorithm);
  const handle = await fs.promises.open(path2, "r");
  try {
    const buffer = Buffer.allocUnsafe(1024 * 1024);
    for (; ; ) {
      const { bytesRead } = await handle.read(buffer, 0, buffer.length, null);
      if (bytesRead === 0) break;
      hash.update(buffer.subarray(0, bytesRead));
    }
  } finally {
    await handle.close();
  }
  return hash.digest("hex");
}
async function fileMatches(path2, expected) {
  try {
    const stat = await fs.promises.stat(path2);
    if (!stat.isFile()) return false;
    if (expected.size !== void 0 && stat.size !== expected.size) return false;
    if (expected.size === void 0 && stat.size === 0) return false;
    if (expected.sha1 && await hashFile$1(path2, "sha1") !== expected.sha1.toLowerCase()) return false;
    if (expected.sha256 && await hashFile$1(path2, "sha256") !== expected.sha256.toLowerCase()) return false;
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
      await sleep(150 * (i + 1));
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
    const handle = await fs.promises.open(partPath, resume ? "a" : "w");
    let received = offset;
    try {
      const reader = res.body.getReader();
      for (; ; ) {
        const { done, value } = await reader.read();
        if (done) break;
        bump();
        await handle.write(value);
        received += value.length;
        opts.onProgress?.(received, total);
      }
    } finally {
      await handle.close();
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
        if (attempt < attempts - 1) await sleep(600 * 2 ** attempt + Math.random() * 300);
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
  const file = `${artifact}-${version}${classifier ? `-${classifier}` : ""}.${ext}`;
  return {
    path: `${group.replace(/\./g, "/")}/${artifact}/${version}/${file}`,
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
async function ensureGameFiles(opts) {
  const { root, versionJson, jarId, assetIndexName, deep = false } = opts;
  const failed = [];
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
    if (!await fileMatches(jarPath, { size: client.size, sha1: client.sha1 })) {
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
    if (!await fileMatches(dest, { size: lib.size, sha1: deep ? lib.sha1 : void 0 })) {
      try {
        await downloadFile({ url: lib.url, dest, size: lib.size, sha1: lib.sha1 });
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
      if (!await fileMatches(indexPath, { size: index.size, sha1: index.sha1 })) {
        await downloadFile({ url: index.url, dest: indexPath, size: index.size, sha1: index.sha1 });
        fixed++;
      }
      const parsed = JSON.parse(await fs.promises.readFile(indexPath, "utf-8"));
      const objects = Object.values(parsed.objects ?? {});
      const unique = Array.from(new Map(objects.map((o) => [o.hash, o])).values());
      let assetsDone = 0;
      await runPool(unique, 24, async (obj) => {
        const dir = obj.hash.slice(0, 2);
        const dest = path.join(root, "assets", "objects", dir, obj.hash);
        if (!await fileMatches(dest, { size: obj.size })) {
          try {
            await downloadFile({
              url: `${ASSET_HOST}/${dir}/${obj.hash}`,
              dest,
              size: obj.size,
              sha1: obj.hash,
              stallMs: 2e4
            });
            fixed++;
          } catch (err) {
            failed.push(`resurs ${obj.hash}: ${err instanceof Error ? err.message : String(err)}`);
          }
        }
        report("assets", ++assetsDone, unique.length);
      });
      report("assets", unique.length, unique.length, true);
    } catch (err) {
      failed.push(`resurs indeksi: ${err instanceof Error ? err.message : String(err)}`);
    }
  }
  return { fixed, failed };
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
    const file = `net/minecraftforge/forge/${versionId}/forge-${versionId}-installer.jar`;
    try {
      await downloadFile({
        url: MAVEN_HOSTS.map((h) => h + file),
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
  if (isModern) return { kind: "installer", installerPath };
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
function vendorOf(name, compatibility) {
  const text = `${name} ${compatibility}`;
  if (/microsoft basic|basic display|basic render/i.test(text)) return "basic";
  if (/nvidia|geforce|quadro/i.test(text)) return "nvidia";
  if (/\bamd\b|advanced micro|radeon|\bati\b/i.test(text)) return "amd";
  if (/intel/i.test(text)) return "intel";
  return "other";
}
async function detectGpus() {
  const out = await runPowerShell(
    "Get-CimInstance Win32_VideoController | Select-Object Name,DriverVersion,@{n='DriverDate';e={if($_.DriverDate){$_.DriverDate.ToString('yyyy-MM-dd')}}},AdapterCompatibility,PNPDeviceID | ConvertTo-Json -Compress"
  );
  const rows = parseJsonList(out);
  if (!rows) return [];
  return rows.filter((r) => r.Name).map((r) => {
    const name = String(r.Name);
    const vendor = vendorOf(name, r.AdapterCompatibility ?? "");
    return {
      name,
      vendor,
      driverVersion: r.DriverVersion ?? null,
      driverDate: r.DriverDate ?? null,
      isBasicAdapter: vendor === "basic" || /BASICDISPLAY/i.test(r.PNPDeviceID ?? "")
    };
  });
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
        `Yoki ${names} ning ichiga kirib, MCModHub Launcher va o'yin papkasi uchun ruxsat (istisno) bering.`,
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
function gpuLine(gpu) {
  if (gpu.isBasicAdapter) {
    return `Videokartangiz: ${gpu.name} - bu videokarta uchun HAQIQIY drayver umuman o'rnatilmaganini bildiradi.`;
  }
  const bits = [gpu.driverVersion ? `drayver ${gpu.driverVersion}` : null, gpu.driverDate].filter(Boolean);
  return `Videokartangiz: ${gpu.name}${bits.length ? ` (${bits.join(", ")})` : ""}.`;
}
async function gpuAdvice(ctx, details) {
  const gpus = await detectGpus();
  const items = [
    "Kompyuteringizdagi videokarta drayveri o'yin uchun kerakli grafika (OpenGL) imkoniyatini bermayapti. Bu Minecraft yoki launcher xatosi emas - odatda drayver o'rnatilmagan yoki eskirgan bo'ladi."
  ];
  const steps = [];
  const actions = [];
  const real = gpus.filter((g) => !g.isBasicAdapter);
  const primary = real.find((g) => g.vendor === "nvidia" || g.vendor === "amd") ?? real[0] ?? gpus[0];
  if (primary) items.push(gpuLine(primary));
  if (gpus.length > 0 && gpus.every((g) => isLegacyGpu(g.name) || g.isBasicAdapter) && gpus.some((g) => isLegacyGpu(g.name))) {
    items.push(
      "Bu videokarta juda eski - yangi Minecraft versiyalarini (1.17 va undan yuqori) ishga tushira olmasligi mumkin. 1.16.5 yoki undan eski versiyani tanlab ko'ring."
    );
  }
  steps.push("Videokarta ishlab chiqaruvchisining saytidan eng so'nggi drayverni yuklab o'rnating (pastdagi tugma).");
  steps.push("Kompyuterni qayta ishga tushiring va o'yinni yana ishga tushiring.");
  const vendors = /* @__PURE__ */ new Set();
  for (const g of gpus) if (g.vendor === "nvidia" || g.vendor === "amd" || g.vendor === "intel") vendors.add(g.vendor);
  if (vendors.size === 0) ["nvidia", "amd", "intel"].forEach((v) => vendors.add(v));
  vendors.forEach((v) => actions.push(DRIVER_LINKS[v]));
  const hasDiscrete = real.some((g) => g.vendor === "nvidia" || g.vendor === "amd");
  const hasIntegrated = real.some((g) => g.vendor === "intel");
  if (hasDiscrete && hasIntegrated && process.platform === "win32") {
    steps.push(
      `Noutbukda ikkita videokarta bor: Windows "Sozlamalar" → "Tizim" → "Ekran" → "Grafika" bo'limida java.exe ni qo'shib, "Yuqori unumdorlik"ni tanlang.`
    );
    actions.push({ kind: "settings", label: "Grafika sozlamalarini ochish", value: "ms-settings:display-advancedgraphics" });
    if (ctx.javaPath) actions.push({ kind: "copy", label: "java.exe yo'lini nusxalash", value: ctx.javaPath });
  }
  return { title: "Videokarta drayveri o'yinni ishga tushira olmadi", items, steps, actions, details };
}
function javaAdvice(major, why, details) {
  const lts = major <= 8 ? 8 : major <= 11 ? 11 : major <= 17 ? 17 : major <= 21 ? 21 : major;
  const isWin = process.platform === "win32";
  return {
    title: `O'yin uchun Java ${lts} kerak`,
    items: [`Bu o'yin ishlashi uchun kompyuteringizda Java ${lts} bo'lishi kerak.`, why],
    steps: [
      `Pastdagi "Java ${lts} ni yuklash" tugmasini bosib, faylni yuklab oling.`,
      isWin ? `Yuklangan faylni oching va "Next" → "Install" tugmalarini bosib o'rnating.` : `Yuklangan Java'ni o'rnating.`,
      `Launcher'ni qayta oching va "O'ynash"ni bosing.`
    ],
    actions: [javaDownloadAction(lts)],
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
  /OpenGL 3\.\d+ (core )?(profile )?(is )?(not supported|unsupported)/i
];
function hasGpuDriverFailure(text) {
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
    `MCModHub Launcher ${ctx.appVersion}`,
    `OS: ${os.type()} ${os.release()} (${os.arch()})`,
    `Minecraft: ${ctx.version}${ctx.loader ? ` / ${ctx.loader}` : " / vanilla"}`,
    `Java: ${ctx.javaPath ?? "tizim (PATH)"}`,
    `Chiqish kodi: ${hexCode(ctx.code)}`,
    gpus.length ? `Videokarta: ${gpus.map((g) => `${g.name} [${g.driverVersion ?? "?"}]`).join("; ")}` : null,
    avs ? `Antivirus: ${avs.map((a) => `${a.name}${a.enabled ? "" : " (o'chiq)"}`).join("; ") || "yo'q"}` : null,
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
  if (hasGpuDriverFailure(text)) return gpuAdvice(ctx, details);
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
    return javaAdvice(neededMajor, "Hozirgi Java bu o'yin uchun juda eski.", details);
  }
  if (/Unrecognized (VM )?option|Could not create the Java Virtual Machine/i.test(text) && !/heap/i.test(text)) {
    return javaAdvice(ctx.requiredJavaMajor ?? 21, "Hozirgi Java bu o'yinning sozlamalarini qabul qilmadi (eskirgan).", details);
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
function adoptiumAvailableMajor(major) {
  if (major <= 8) return 8;
  if (major <= 11) return 11;
  if (major <= 17) return 17;
  if (major <= 21) return 21;
  return major;
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
function javaBinPath(os2, runtimeDir) {
  if (os2 === "windows") return path.join(runtimeDir, "bin", "java.exe");
  if (os2 === "mac") return path.join(runtimeDir, "Contents", "Home", "bin", "java");
  return path.join(runtimeDir, "bin", "java");
}
function extractTarGz(archivePath, destDir) {
  return new Promise((resolve, reject2) => {
    child_process.execFile(
      "tar",
      ["-xzf", archivePath, "-C", destDir, "--strip-components", "1"],
      (err, _stdout, stderr) => {
        if (err) {
          reject2(new Error(`arxivni ochib bo'lmadi (tar): ${stderr?.trim() || err.message}`));
          return;
        }
        resolve();
      }
    );
  });
}
async function extractZip(archivePath, destDir) {
  const zip = new AdmZip(archivePath);
  const entries = zip.getEntries();
  const firstPath = entries[0]?.entryName ?? "";
  const rootPrefix = firstPath.includes("/") ? firstPath.slice(0, firstPath.indexOf("/") + 1) : "";
  for (const entry2 of entries) {
    if (entry2.isDirectory) continue;
    const relative = rootPrefix && entry2.entryName.startsWith(rootPrefix) ? entry2.entryName.slice(rootPrefix.length) : entry2.entryName;
    if (!relative) continue;
    const outPath = path.join(destDir, relative);
    await fs.promises.mkdir(path.dirname(outPath), { recursive: true });
    await fs.promises.writeFile(outPath, entry2.getData());
  }
}
const verifiedBins = /* @__PURE__ */ new Set();
async function verifyRuns(javaBin) {
  if (verifiedBins.has(javaBin)) return;
  try {
    await new Promise((resolve, reject2) => {
      child_process.execFile(javaBin, ["-version"], (err) => err ? reject2(err) : resolve());
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (process.platform === "darwin" && /bad cpu type|exec format|ENOEXEC/i.test(message)) {
      throw new Error(
        "Bu Minecraft versiyasi Apple Silicon'da Intel (x64) Java talab qiladi, lekin Rosetta 2 o'rnatilmagan. Terminal'da quyidagini bajaring: softwareupdate --install-rosetta --agree-to-license"
      );
    }
    throw new Error(`Yuklab olingan Java ishga tushmadi: ${message}`);
  }
  verifiedBins.add(javaBin);
}
async function getJson(url) {
  const res = await fetch(url, { signal: AbortSignal.timeout(2e4) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.json();
}
async function javaSources(major, os2, arch) {
  const sources = [];
  try {
    const data = await getJson(
      `https://api.adoptium.net/v3/assets/latest/${major}/hotspot?architecture=${arch}&image_type=jre&os=${os2}&vendor=eclipse`
    );
    const pkg = data[0]?.binary?.package;
    if (pkg?.link) sources.push({ urls: githubCandidates(pkg.link), size: pkg.size, sha256: pkg.checksum });
  } catch {
  }
  try {
    const azulOs = os2 === "mac" ? "macos" : os2;
    const azulExt = os2 === "windows" ? "zip" : "tar.gz";
    const list = await getJson(
      `https://api.azul.com/metadata/v1/zulu/packages/?java_version=${major}&os=${azulOs}&arch=${arch}&archive_type=${azulExt}&java_package_type=jre&javafx_bundled=false&latest=true&release_status=ga&availability_types=CA&page=1&page_size=5`
    );
    const pick2 = list.find((p) => !/crac/i.test(p.name)) ?? list[0];
    if (pick2?.download_url) sources.push({ urls: [pick2.download_url], size: pick2.size });
  } catch {
  }
  if (sources.length === 0) throw new Error("Java yuklash manzillarini olib bo'lmadi (internet aloqasini tekshiring)");
  return sources;
}
async function ensureJavaRuntime(major, root, options = {}) {
  const effectiveMajor = adoptiumAvailableMajor(major);
  const os2 = adoptiumOs();
  const arch = adoptiumArch(os2, effectiveMajor, options);
  const runtimeDir = os2 === "windows" ? path.join(root, "jre", String(effectiveMajor)) : path.join(root, "jre", `${effectiveMajor}-${arch}`);
  const javaBin = javaBinPath(os2, runtimeDir);
  if (fs.existsSync(javaBin)) {
    try {
      await verifyRuns(javaBin);
      return javaBin;
    } catch (err) {
      if (err instanceof Error && /Rosetta/.test(err.message)) throw err;
      verifiedBins.delete(javaBin);
      await fs.promises.rm(runtimeDir, { recursive: true, force: true });
    }
  }
  const archiveExt = os2 === "windows" ? "zip" : "tar.gz";
  await fs.promises.mkdir(path.join(root, "jre"), { recursive: true });
  const archivePath = path.join(root, "jre", `.download-${effectiveMajor}-${os2}-${arch}.${archiveExt}`);
  const sources = await javaSources(effectiveMajor, os2, arch);
  let lastErr = null;
  let downloaded = false;
  for (const source of sources) {
    try {
      await downloadFile({
        url: source.urls,
        dest: archivePath,
        size: source.size,
        sha256: source.sha256,
        // Sekin internetda ham tugashi uchun: umumiy vaqt emas, faqat "ma'lumot kelmay qoldi" chegarasi.
        stallMs: 45e3,
        attempts: 3,
        onProgress: options.onProgress
      });
      downloaded = true;
      break;
    } catch (err) {
      lastErr = err;
    }
  }
  if (!downloaded) {
    throw new Error(
      `Java ${effectiveMajor} (${os2}/${arch}) yuklanmadi: ${lastErr instanceof Error ? lastErr.message : String(lastErr)}`
    );
  }
  const stagingDir = `${runtimeDir}.partial`;
  try {
    await fs.promises.rm(stagingDir, { recursive: true, force: true });
    await fs.promises.mkdir(stagingDir, { recursive: true });
    if (os2 === "windows") {
      await extractZip(archivePath, stagingDir);
    } else {
      await extractTarGz(archivePath, stagingDir);
      await fs.promises.chmod(javaBinPath(os2, stagingDir), 493).catch(() => {
      });
    }
    if (!fs.existsSync(javaBinPath(os2, stagingDir))) throw new Error("Java o'rnatilmadi (kutilgan fayl topilmadi)");
    await fs.promises.rm(runtimeDir, { recursive: true, force: true });
    await renameWithRetry(stagingDir, runtimeDir);
  } catch (err) {
    await fs.promises.rm(stagingDir, { recursive: true, force: true }).catch(() => {
    });
    await fs.promises.rm(archivePath, { force: true }).catch(() => {
    });
    throw err;
  }
  await fs.promises.rm(archivePath, { force: true }).catch(() => {
  });
  await verifyRuns(javaBin);
  return javaBin;
}
async function renameWithRetry(from, to) {
  for (let i = 0; ; i++) {
    try {
      await fs.promises.rename(from, to);
      return;
    } catch (err) {
      const code = err.code ?? "";
      if (i >= 8 || !["EPERM", "EBUSY", "EACCES"].includes(code)) throw err;
      await new Promise((resolve) => setTimeout(resolve, 250 * (i + 1)));
    }
  }
}
const MR_BASE = "https://api.modrinth.com/v2";
const USER_AGENT$1 = "NeoTerraLauncher/1.0 (Minecraft launcher - github.com/mcmodhub)";
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
  const running = inFlight.get(path2);
  if (running) return running;
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
    return versions[0] ?? null;
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
  const file = version?.files.find((f) => f.primary) ?? version?.files[0];
  return file ? { url: file.url, filename: file.filename } : null;
}
async function resolveLatestFileWithDate(projectId, gameVersion, loader) {
  const version = await resolveLatestVersion(projectId, gameVersion, loader);
  if (!version) return null;
  const file = version.files.find((f) => f.primary) ?? version.files[0];
  if (!file) return null;
  return { url: file.url, filename: file.filename, dateMs: Date.parse(version.date_published) || Date.now() };
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
    const file = depVersion?.files.find((f) => f.primary) ?? depVersion?.files[0];
    if (file) {
      result.push({
        projectId: depId,
        name: project?.title ?? depId,
        url: file.url,
        filename: file.filename,
        targetKind: assetKindForProjectType(project?.project_type)
      });
    }
    const nested = await resolveRequiredDependencies(depId, gameVersion, seen, loader, notAfterMs);
    result.push(...nested);
  }
  return result;
}
function looksRelated(query, title) {
  const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
  const q = norm(query);
  const t = norm(title);
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
    const [project, file] = await Promise.all([
      mrFetch(`/project/${slug}`).catch(() => null),
      resolveLatestFile(slug, gameVersion, loader)
    ]);
    return file ? { projectId: slug, name: project?.title ?? slug, url: file.url, filename: file.filename } : null;
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
    const file = await resolveLatestFile(match.project_id, gameVersion, loader);
    return file ? { projectId: match.project_id, name: match.title, url: file.url, filename: file.filename } : null;
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
      const file = files[i];
      return {
        id: hashId(h.project_id),
        externalId: h.slug,
        name: h.title,
        summary: h.description ? cleanShortText(h.description) : null,
        logoUrl: h.icon_url,
        downloadUrl: file?.url ?? null,
        fileName: file?.filename ?? null,
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
    const [project, file, members] = await Promise.all([
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
      downloadUrl: file?.url ?? null,
      fileName: file?.filename ?? null,
      websiteUrl: `https://modrinth.com/${projectType}/${slug}`,
      downloadCount: project.downloads
    };
  } catch (err) {
    console.error("[modrinth] mod detail muvaffaqiyatsiz:", err instanceof Error ? err.message : err);
    return null;
  }
}
function performanceJvmArgs(ramMaxGb) {
  const totalGb = os.totalmem() / 1024 ** 3;
  const preTouch = ramMaxGb + 2 <= totalGb;
  const bigHeap = ramMaxGb >= 12;
  return [
    "-XX:+IgnoreUnrecognizedVMOptions",
    "-XX:+UnlockExperimentalVMOptions",
    "-XX:+UseG1GC",
    "-XX:+ParallelRefProcEnabled",
    "-XX:+PerfDisableSharedMem",
    // Ba'zi modlar (va eski kutubxonalar) System.gc() chaqiradi - bu to'liq, uzun to'xtash
    // demak. O'yin uchun bunga hech qachon ehtiyoj yo'q.
    "-XX:+DisableExplicitGC",
    `-XX:MaxGCPauseMillis=${bigHeap ? 50 : 37}`,
    `-XX:G1HeapRegionSize=${bigHeap ? 16 : 8}M`,
    `-XX:G1NewSizePercent=${bigHeap ? 40 : 30}`,
    `-XX:G1MaxNewSizePercent=${bigHeap ? 50 : 40}`,
    `-XX:G1ReservePercent=${bigHeap ? 15 : 20}`,
    "-XX:G1HeapWastePercent=5",
    "-XX:G1MixedGCCountTarget=4",
    `-XX:InitiatingHeapOccupancyPercent=${bigHeap ? 20 : 15}`,
    "-XX:G1MixedGCLiveThresholdPercent=90",
    "-XX:G1RSetUpdatingPauseTimePercent=5",
    "-XX:SurvivorRatio=32",
    "-XX:MaxTenuringThreshold=1",
    ...preTouch ? ["-XX:+AlwaysPreTouch"] : []
  ];
}
const PERFORMANCE_MODS = {
  // Sodium - render dvigatelini butunlay qayta yozadi (eng katta FPS foydasi).
  // Lithium - o'yin mantiqi/serverside hisob-kitoblarini tezlashtiradi.
  // FerriteCore - xotira sarfini keskin kamaytiradi (kuchsiz kompyuterlarda hal qiluvchi).
  // EntityCulling - ko'rinmayotgan mavjudotlarni chizmaydi.
  // ModernFix - yuklanish tezligi va xotira bo'yicha ko'plab tuzatishlar.
  fabric: [["sodium"], ["lithium"], ["ferrite-core"], ["entityculling"], ["modernfix"]],
  quilt: [["sodium"], ["lithium"], ["ferrite-core"], ["entityculling"], ["modernfix"]],
  forge: [["embeddium", "rubidium"], ["ferrite-core"], ["entityculling"], ["modernfix"]]
};
const VERSION_AWARE_SLUGS = /* @__PURE__ */ new Set(["sodium", "lithium", "entityculling", "modernfix", "embeddium", "rubidium"]);
function normalize(text) {
  return text.toLowerCase().replace(/[^a-z0-9]/g, "");
}
function isPerformanceModFile(filename, loader) {
  const name = normalize(filename);
  return PERFORMANCE_MODS[loader].some((group) => group.some((slug) => name.includes(normalize(slug))));
}
const MEMORY_FILE = "mcmodhub-fps-boost.json";
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
  const installed = fs.readdirSync(modsDir);
  if (installed.some((f) => /optifine/i.test(f))) {
    emit2({
      type: "log",
      line: "[MCModHub]: OptiFine topildi - FPS modlari o'tkazib yuborildi (ular birga ishlamaydi)"
    });
    return;
  }
  const installedNames = installed.map(normalize);
  function alreadyThere(slug) {
    const norm = normalize(slug);
    const matches = installed.filter((f) => normalize(f).includes(norm));
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
  let memoryChanged = false;
  for (const group of PERFORMANCE_MODS[loader]) {
    if (group.some(alreadyThere)) continue;
    if (group.some((slug) => offered.has(slug))) continue;
    for (const slug of group) {
      const file = await resolveForLoader(slug, gameVersion, loader);
      if (!file) continue;
      emit2({ type: "status", message: `FPS modi o'rnatilmoqda: ${slug}...` });
      try {
        await downloadInto(modsDir, file.url, file.filename);
        installedNames.push(normalize(file.filename));
        offered.add(slug);
        memoryChanged = true;
      } catch (err) {
        emit2({
          type: "log",
          line: `[MCModHub]: "${slug}" yuklanmadi: ${err instanceof Error ? err.message : String(err)}`
        });
        continue;
      }
      try {
        const deps = await resolveRequiredDependencies(slug, gameVersion, /* @__PURE__ */ new Set([slug]), loader);
        for (const dep of deps) {
          if (fs.existsSync(path.join(modsDir, dep.filename))) continue;
          if (installedNames.some((name) => name.includes(normalize(dep.name)))) continue;
          await downloadInto(modsDir, dep.url, dep.filename);
          installedNames.push(normalize(dep.filename));
        }
      } catch {
      }
      break;
    }
  }
  if (memoryChanged) {
    memory[memoryKey] = Array.from(offered);
    writeBoostMemory(dir, memory);
  }
}
const STALE_MAX_FPS_LINE = /^maxFps:120(\r?)$/m;
function upgradeStaleMaxFpsDefault(file) {
  let content;
  try {
    content = fs.readFileSync(file, "utf-8");
  } catch {
    return;
  }
  if (!STALE_MAX_FPS_LINE.test(content)) return;
  try {
    fs.writeFileSync(file, content.replace(STALE_MAX_FPS_LINE, "maxFps:260$1"), "utf-8");
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
  const file = path.join(dir, "options.txt");
  let content = "";
  try {
    content = fs.readFileSync(file, "utf-8");
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
  fs.writeFileSync(file, content, "utf-8");
}
function writeDefaultVideoOptions(dir) {
  const file = path.join(dir, "options.txt");
  if (fs.existsSync(file)) {
    upgradeStaleMaxFpsDefault(file);
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
  fs.writeFileSync(file, `${lines.join("\n")}
`, "utf-8");
}
function applyLinuxGpuPreference() {
  if (process.platform !== "linux") return;
  if (!fs.existsSync("/proc/driver/nvidia/version")) return;
  process.env.__NV_PRIME_RENDER_OFFLOAD = "1";
  process.env.__GLX_VENDOR_LIBRARY_NAME = "nvidia";
  process.env.__VK_LAYER_NV_optimus = "NVIDIA_only";
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
  for (const file of filesToMove) {
    const src = path.join(root, file);
    if (!fs.existsSync(src)) continue;
    const to = path.join(dest, file);
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
  const dir = path.join(drive, ".neoterra-uds");
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}
const CSL_LOADER_NAMES = ["fabric", "forge", "quilt", "neoforge"];
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
  if (existing.length > mismatched.length) return;
  const file = await resolveLatestFile("customskinloader", gameVersion, wanted);
  if (!file) return;
  const res = await fetch(file.url, { signal: AbortSignal.timeout(12e4) });
  if (!res.ok) throw new Error(`CustomSkinLoader yuklanmadi (HTTP ${res.status})`);
  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(path.join(modsDir, file.filename), buffer);
}
const NEOTERRA_SKINS_API_ROOT = "https://site.neoterra.uz/api/launcher/skins/";
function writeCustomSkinLoaderConfig(dir) {
  const cslDir = path.join(dir, "CustomSkinLoader");
  fs.mkdirSync(cslDir, { recursive: true });
  const cachesDir = path.join(cslDir, "caches");
  if (fs.existsSync(cachesDir)) {
    try { fs.rmSync(cachesDir, { recursive: true, force: true }); } catch {}
  }
  const configPath = path.join(cslDir, "CustomSkinLoader.json");
  const local = {
    name: "LocalSkin",
    type: "Legacy",
    checkPNG: false,
    skin: "LocalSkin/skins/{USERNAME}.png",
    cape: "LocalSkin/capes/{USERNAME}.png"
  };
  const ours = {
    name: "NeoTerra",
    type: "CustomSkinAPI",
    root: NEOTERRA_SKINS_API_ROOT
  };
  let config = { version: "15.0.1", loadlist: [] };
  try {
    const parsed = JSON.parse(fs.readFileSync(configPath, "utf-8"));
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) config = parsed;
  } catch {
  }
  const previous = Array.isArray(config.loadlist) ? config.loadlist : [];
  const rest = previous.filter((e) => e?.name !== ours.name && e?.name !== local.name);
  if (!rest.some((e) => typeof e?.type === "string" && /mojang/i.test(e.type))) {
    rest.push({ name: "Mojang", type: "MojangAPI" });
  }
  config.loadlist = [local, ours, ...rest];
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf-8");
}
function writeCompanionConfig(dir, companionId) {
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, "mcmodhub_companion.json"),
    JSON.stringify({ companion: companionId ?? null }, null, 2),
    "utf-8"
  );
}
function writeUiToken(dir, token) {
  const target = path.join(dir, "mcmodhub_ui");
  fs.mkdirSync(target, { recursive: true });
  const file = path.join(target, "launch_token");
  if (token) {
    fs.writeFileSync(file, token, "utf-8");
  } else {
    fs.rmSync(file, { force: true });
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
  return outer;
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
  "KnotClient",
  "net.fabricmc.",
  "net/fabricmc/",
  "cpw.mods.",
  "cpw/mods/",
  "net.minecraftforge.",
  "net/minecraftforge/"
];
function detectLoaderClassMissing(lines) {
  return lines.some(
    (l) => (l.includes("ClassNotFoundException") || l.includes("NoClassDefFoundError")) && LOADER_CLASS_HINTS.some((h) => l.includes(h))
  );
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
  const file = path.join(instanceRoot, "config", "fml.toml");
  try {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    if (!fs.existsSync(file)) {
      fs.writeFileSync(file, "earlyWindowControl = false\n", "utf-8");
      return;
    }
    const text = fs.readFileSync(file, "utf-8");
    if (/^\s*earlyWindowControl\s*=\s*false\s*$/m.test(text)) return;
    const next = /^\s*earlyWindowControl\s*=/m.test(text) ? text.replace(/^(\s*)earlyWindowControl\s*=.*$/m, "$1earlyWindowControl = false") : `${text.trimEnd()}
earlyWindowControl = false
`;
    fs.writeFileSync(file, next, "utf-8");
  } catch {
  }
}
function hadEarlyWindowFailure(instanceRoot, lines, sinceMs) {
  if (lines.some((l) => EARLY_WINDOW_HINTS.some((h) => l.includes(h)))) return true;
  for (const name of ["latest.log", "debug.log"]) {
    const file = path.join(instanceRoot, "logs", name);
    try {
      if (fs.statSync(file).mtimeMs < sinceMs) continue;
      const text = fs.readFileSync(file, "utf-8");
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
    const file = path.join(instanceRoot, "logs", name);
    try {
      if (fs.statSync(file).mtimeMs < sinceMs) continue;
      const content = fs.readFileSync(file, "utf-8");
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
  for (const file of files) {
    let id = null;
    try {
      const zip = new AdmZip(path.join(modsDir, file));
      const entry2 = zip.getEntry("fabric.mod.json") ?? zip.getEntry("quilt.mod.json");
      if (entry2) {
        const json = JSON.parse(entry2.getData().toString("utf-8"));
        id = json.id ?? json.quilt_loader?.id ?? null;
      }
    } catch {
    }
    if (id === modId || id === null && file.toLowerCase().startsWith(modId.toLowerCase())) {
      try {
        const disabledDir = path.join(instanceRoot, "mods-disabled");
        fs.mkdirSync(disabledDir, { recursive: true });
        const target = path.join(disabledDir, file);
        fs.rmSync(target, { force: true });
        fs.renameSync(path.join(modsDir, file), target);
        return file;
      } catch {
        return null;
      }
    }
  }
  return null;
}
const CORE_BROKEN_PATTERNS = [
  /Could not find or load main class (net\.minecraft\.client\.main\.Main|net\.minecraft\.launchwrapper\.Launch|io\.github\.zekerzhayard\.forgewrapper\.installer\.Main|cpw\.mods\.bootstraplauncher\.BootstrapLauncher)/,
  /Error opening zip file or JAR manifest missing/,
  /Invalid or corrupt jarfile/,
  /zip END header not found|invalid (LOC|CEN) header/
];
function isCoreFilesBroken(lines) {
  const text = lines.join("\n");
  return CORE_BROKEN_PATTERNS.some((re) => re.test(text));
}
let preparing = null;
async function launchGame(req, emit2) {
  if (req.prepareOnly) {
    if (current$1) return;
    if (preparing) return preparing;
    const run = launchGameCore(req, emit2).finally(() => {
      if (preparing === run) preparing = null;
    });
    preparing = run;
    return run;
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
    const percent = Math.max(lastUnifiedPercent, Math.min(99, Math.round(sum * 100)));
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
  applyEarlyWindowPreference(instRoot2);
  setCurrentInstance(req.version, req.loader);
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
    applyLinuxGpuPreference();
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
  try {
    writeUiToken(instRoot2, req.uiToken);
  } catch (err) {
    emit2({
      type: "warning",
      message: `UI tokeni yozilmadi, o'yin standart menyu bilan ochiladi: ${err instanceof Error ? err.message : String(err)}`
    });
  }
  if (await ensureUiMod(instRoot2, (message) => emit2({ type: "status", message }))) {
    await ensureDefaultTheme((message) => emit2({ type: "status", message }));
    syncThemesToInstance(instRoot2);
  }
  const corruptedCount = removeCorruptedDownloads(gameDir());
  if (corruptedCount > 0) {
    emit2({ type: "log", line: `[MCModHub]: ${corruptedCount} ta buzilgan kutubxona fayli tozalandi, qayta yuklanadi` });
  }
  emit2({ type: "status", message: "Fayllar tayyorlanmoqda..." });
  const downloadTasks = [];
  if (req.loader === "fabric" || req.loader === "quilt") {
    downloadTasks.push(
      ensureLoaderProfile(
        req.loader,
        gameDir(),
        req.version,
        new Set(req.autoFixExcludedLoaderVersions ?? [])
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
  if (req.loader) {
    downloadTasks.push(
      // Skin modi NUSXA papkasidagi mods'ga tushadi - har versiya o'zining CSL nusxasiga ega.
      ensureCustomSkinLoaderMod(instRoot2, req.version, req.loader).catch((err) => {
        emit2({
          type: "warning",
          message: `Skin modi o'rnatilmadi: ${err instanceof Error ? err.message : String(err)}`
        });
      })
    );
  }
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
        const requiredMajor = await getRequiredJavaMajor(req.version) ?? requiredJavaMajor(req.version);
        requiredMajorResolved = requiredMajor;
        let javaStatusSent = false;
        try {
          javaPath = await ensureJavaRuntime(requiredMajor, gameDir(), {
            // Apple Silicon (M1/M2/...) da 1.19'gacha bo'lgan versiyalar faqat Intel Java bilan
            // ishlaydi - sababi `java.ts` -> `needsIntelJavaOnMac` izohida.
            forceX64: needsIntelJavaOnMac(req.version),
            onProgress: (received, total) => {
              if (!javaStatusSent) {
                javaStatusSent = true;
                emit2({ type: "status", message: `Java ${requiredMajor} yuklanmoqda (faqat birinchi marta)...` });
              }
              setPrepTask("java", received, total);
            }
          });
        } catch (err) {
          const found = await findJavaExecutable(requiredMajor);
          if (found) {
            emit2({
              type: "log",
              line: `[MCModHub]: Java ${requiredMajor} yuklab bo'lmadi, tizimdagi mos Java ishlatiladi (${found})`
            });
            javaPath = found;
          } else {
            const reason = err instanceof Error ? err.message : String(err);
            throw new LaunchAdviceError(
              `Bu o'yin Java ${requiredMajor} talab qiladi, lekin uni avtomatik yuklab bo'lmadi (${reason}).`,
              javaAdvice(requiredMajor, "Launcher uni o'zi yuklashga urindi, lekin internet aloqasi sabab bo'lmadi.", [reason])
            );
          }
        }
      })()
    );
  }
  await Promise.all(downloadTasks);
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
    }).catch((err) => ({ fixed: 0, failed: [err instanceof Error ? err.message : String(err)] }));
    if (result.fixed > 0) emit2({ type: "log", line: `[MCModHub]: ${result.fixed} ta fayl yuklandi/tuzatildi` });
    if (result.failed.length > 0) {
      emit2({
        type: "log",
        line: `[MCModHub]: ${result.failed.length} ta faylni yuklab bo'lmadi: ${result.failed.slice(0, 3).join("; ")}`
      });
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
  if (req.prepareOnly) {
    emit2({ type: "status", message: "O'yin tayyor - lider dunyosi kutilmoqda" });
    return;
  }
  const opts = {
    authorization: auth,
    root: gameDir(),
    version: {
      number: req.version,
      type: "release",
      ...customVersion ? { custom: customVersion } : {}
    },
    memory: {
      max: `${req.ramMax}G`,
      // FPS tezlatgich yoqilganda boshlang'ich (Xms) va maksimal (Xmx) hajm BIR XIL
      // qilinadi. Sabab: JVM heap'ni ish jarayonida bosqichma-bosqich kengaytiradi va har
      // bir kengaytirish - qo'shimcha to'liq GC to'xtashi, o'yinchi buni aynan "FPS tushib
      // ketdi" deb sezadi. Bir xil qilinsa, heap boshidanoq to'liq ajratiladi va bunday
      // to'xtashlar butunlay yo'qoladi (barcha yirik launcher'larning standart tavsiyasi).
      min: `${req.ramMin ?? (fpsBoost ? req.ramMax : Math.max(1, Math.floor(req.ramMax / 2)))}G`
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
      ...fpsBoost ? performanceJvmArgs(req.ramMax) : []
    ],
    // To'g'ridan-to'g'ri serverga ulanish (1.20+ quickPlay, eski versiyalar uchun server/port)
    ...req.server ? {
      quickPlay: {
        type: "multiplayer",
        identifier: `${req.server.host}:${req.server.port}`
      },
      server: { host: req.server.host, port: String(req.server.port) }
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
      ...versionJsonOverride ? { versionJson: versionJsonOverride } : {}
    }
  };
  const recentDataLines = [];
  launcher.on("debug", (line) => {
    console.log("[MCLC debug]", line);
    emit2({ type: "log", line: String(line) });
  });
  launcher.on("data", (line) => {
    console.log("[MCLC data]", line);
    emit2({ type: "log", line: String(line) });
    for (const part of String(line).split("\n")) {
      const trimmed = part.trim();
      if (!trimmed) continue;
      recentDataLines.push(trimmed);
      if (recentDataLines.length > 20) recentDataLines.shift();
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
    const attempts = req.autoFixAttempts ?? 0;
    const crashed = code !== 0 && code !== null;
    const fullText = crashed ? `${recentDataLines.join("\n")}
${readRecentLogText(instRoot2, launchStartMs)}` : "";
    const buildCtx = () => ({
      code,
      lines: recentDataLines,
      logText: fullText,
      version: req.version,
      loader: req.loader,
      gameDir: gameDir(),
      javaPath,
      requiredJavaMajor: requiredMajorResolved,
      appVersion: electron.app.getVersion()
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
          await present({ title: "O'yin kutilmagan xatolik bilan yopildi", items });
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
  const child = await launcher.launch(opts);
  if (!child) throw new Error("O'yin jarayoni ishga tushmadi (Java o'rnatilganini tekshiring)");
  current$1 = { client: launcher, child };
  emit2({ type: "started" });
}
function manualAntivirusHelp(name) {
  return `Kompyuteringizda ${name} antivirusi ishlayapti va u launcher ishlashiga yo'l qo'ymayapti. Windows "Sozlamalar" → "Ilovalar" bo'limiga kirib ${name} ni o'chirib tashlang, yoki ${name} ning ichiga kirib MCModHub Launcher va o'yin papkasi uchun ruxsat (istisno) bering.`;
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
            error: `Windows Defender ishlamayapti (kompyuteringizda boshqa antivirus o'rnatilgan bo'lishi mumkin). Windows "Sozlamalar" → "Ilovalar" bo'limiga kirib antivirusni o'chirib tashlang, yoki antivirus ichiga kirib MCModHub Launcher va o'yin papkasi uchun ruxsat (istisno) bering.`
          });
        } else {
          const code = /0x[0-9a-f]{8}/i.exec(result)?.[0];
          resolve({
            ok: false,
            error: `Ruxsatni avtomatik qo'shib bo'lmadi${code ? ` (kod: ${code})` : ""}. Antivirus dasturi ichida MCModHub Launcher va o'yin papkasi uchun ruxsat (istisno) bering.`
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
function installedShaderLoader(loader, mcVersion) {
  const target = loaderSlugFor(loader);
  if (!target) return null;
  try {
    const dir = assetDir("mod");
    if (!fs.existsSync(dir)) return null;
    const prefix = target.slug;
    let found = null;
    for (const f of fs.readdirSync(dir)) {
      const n = f.toLowerCase();
      if (!n.endsWith(".jar")) continue;
      if (!n.startsWith(prefix)) continue;
      if (filenameMatchesGameVersion(n, mcVersion.toLowerCase())) {
        found = target.name;
        continue;
      }
      try {
        fs.unlinkSync(path.join(dir, f));
      } catch {
      }
    }
    return found;
  } catch {
    return null;
  }
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
  if (installedShaderLoader(loader, mcVersion)) return [];
  const file = await resolveLatestFileWithDate(target.slug, mcVersion, loader);
  if (!file) return [];
  const modsDir = assetDir("mod");
  const chain = [];
  const seen = /* @__PURE__ */ new Set([target.slug]);
  const deps = await resolveRequiredDependencies(target.slug, mcVersion, seen, loader, file.dateMs);
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
    const prefix = d.projectId.toLowerCase();
    const duplicate = existingFiles.find((f) => {
      const n = f.toLowerCase();
      return n.endsWith(".jar") && n.startsWith(prefix);
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
  if (!fs.existsSync(`${modsDir}/${file.filename}`)) {
    chain.push({
      projectId: target.slug,
      name: target.name,
      url: file.url,
      filename: file.filename,
      targetKind: "mod"
    });
  }
  return chain;
}
async function checkShaderSupport(mcVersion, loader) {
  const already = installedShaderLoader(loader, mcVersion);
  if (already) return { status: "ready", loaderName: already };
  const target = loaderSlugFor(loader);
  if (target) {
    const file = await resolveLatestFile(target.slug, mcVersion, loader);
    if (file) return { status: "installable", loaderName: target.name };
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
async function downloadAndInstallMap(req, emit2) {
  const { worldName } = req;
  const url = toRawGithubUrl(req.url);
  const res = await fetchGithubResilient(url);
  if (!res.body) {
    throw new Error("Xarita yuklanmadi (bo'sh javob)");
  }
  const total = Number(res.headers.get("content-length") ?? 0);
  const reader = res.body.getReader();
  const chunks = [];
  let received = 0;
  for (; ; ) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    received += value.length;
    if (total > 0) {
      emit2({ type: "progress", worldName, percent: Math.round(received / total * 100) });
    }
  }
  const zip = new AdmZip(Buffer.concat(chunks.map((c) => Buffer.from(c))));
  const entries = zip.getEntries().filter((e) => !e.isDirectory);
  const firstPath = entries[0]?.entryName ?? "";
  const rootPrefix = firstPath.includes("/") ? firstPath.slice(0, firstPath.indexOf("/") + 1) : "";
  const allShareRoot = rootPrefix !== "" && entries.every((e) => e.entryName.startsWith(rootPrefix));
  const strip = allShareRoot ? rootPrefix : "";
  const relativePaths = entries.map((e) => strip ? e.entryName.slice(strip.length) : e.entryName);
  const hasLevelDat = relativePaths.some((p) => p === "level.dat" || p.endsWith("/level.dat"));
  if (!hasLevelDat) {
    throw new Error("Xarita fayli buzuq");
  }
  const finalName = uniqueFolderName(worldName);
  const destRoot = path.join(savesDir(), finalName);
  for (let i = 0; i < entries.length; i++) {
    const relative = relativePaths[i];
    if (!relative) continue;
    const outPath = path.join(destRoot, relative);
    await fs.promises.mkdir(path.dirname(outPath), { recursive: true });
    await fs.promises.writeFile(outPath, entries[i].getData());
  }
  emit2({ type: "done", worldName, finalName });
}
function removeMap(worldName) {
  const path$1 = path.join(savesDir(), worldName);
  if (fs.existsSync(path$1)) fs.rmSync(path$1, { recursive: true, force: true });
}
function listInstalledMaps() {
  return fs.readdirSync(savesDir(), { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => ({ worldName: d.name }));
}
const MYMEMORY_BASE = "https://api.mymemory.translated.net/get";
const TARGET_LANG = "uz";
const CONTACT_EMAIL = "support@neoterra.uz";
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
const UPDATE_BASE_URL = "https://site.neoterra.uz/api/launcher/updates/";
let emitRef = null;
function canAutoUpdate() {
  if (process.platform === "win32") return true;
  if (process.platform === "linux") return Boolean(process.env.APPIMAGE);
  return false;
}
let updateReady = false;
let periodicTimer = null;
let retryTimer = null;
let retryIndex = 0;
const PERIODIC_CHECK_MS = 30 * 6e4;
const RETRY_DELAYS_MS = [3e4, 12e4, 3e5];
function scheduleRetry() {
  if (updateReady || retryTimer) return;
  const delay = RETRY_DELAYS_MS[Math.min(retryIndex, RETRY_DELAYS_MS.length - 1)];
  retryIndex++;
  retryTimer = setTimeout(() => {
    retryTimer = null;
    runCheck();
  }, delay);
}
function runCheck() {
  if (updateReady) return;
  if (!canAutoUpdate()) {
    void checkManualUpdate();
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
  setTimeout(runCheck, 5e3);
  if (!periodicTimer) periodicTimer = setInterval(runCheck, PERIODIC_CHECK_MS);
}
function stopUpdateWatch() {
  if (periodicTimer) {
    clearInterval(periodicTimer);
    periodicTimer = null;
  }
  if (retryTimer) {
    clearTimeout(retryTimer);
    retryTimer = null;
  }
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
    emit2({ type: "available", version: info.version });
  });
  electronUpdater.autoUpdater.on("update-not-available", (info) => {
    console.log("[updater] yangilanish yo'q, joriy eng oxirgisi:", info.version);
    emit2({ type: "not-available" });
  });
  electronUpdater.autoUpdater.on("download-progress", (p) => emit2({ type: "progress", percent: Math.round(p.percent) }));
  electronUpdater.autoUpdater.on("update-downloaded", (info) => {
    console.log("[updater] yuklab bo'ldi:", info.version);
    updateReady = true;
    stopUpdateWatch();
    emit2({ type: "downloaded", version: info.version });
  });
  electronUpdater.autoUpdater.on("error", (err) => {
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
async function checkManualUpdate() {
  try {
    const res = await fetch(`${UPDATE_BASE_URL}${updateInfoFileName()}`, {
      signal: AbortSignal.timeout(15e3),
      // Keshdan eski versiya o'qilib qolmasligi uchun - CDN fayllarni uzoq saqlaydi.
      cache: "no-store"
    });
    if (!res.ok) return;
    const content = await res.text();
    const version = /^version:\s*(\S+)/m.exec(content)?.[1];
    if (!version) return;
    if (!isNewerVersion(version, electron.app.getVersion())) {
      console.log("[updater] qo'lda tekshirish: yangilanish yo'q");
      return;
    }
    console.log("[updater] qo'lda tekshirish: yangi versiya bor -", version);
    updateReady = true;
    emitRef?.({ type: "manual-available", version, downloadUrl: downloadUrlFor(content, version) });
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
function supportsAutoLan(version, loader) {
  return version === "1.20.1" && loader === "forge";
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
function validPort(port) {
  return Number.isInteger(port) && port >= 1 && port <= 65535;
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
  const { host, port } = v;
  return typeof host === "string" && isGameHost(host) && typeof port === "number" && validPort(port);
}
function isHostWorldReadyLine(line, nick) {
  if (!nick) return false;
  const text = line.trimEnd();
  if (!text.includes("logged in with entity id") && !text.endsWith("joined the game")) return false;
  const escaped = nick.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp("(?<![A-Za-z0-9_])" + escaped + "(?![A-Za-z0-9_])").test(text);
}
function parseLanPort(line) {
  const match = /Started serving on (\d{1,5})\s*$/.exec(line);
  if (!match) return null;
  const port = Number(match[1]);
  return port >= 1024 && port <= 65535 ? port : null;
}
function isPrivateLanEndpoint(v) {
  if (typeof v !== "object" || v === null) return false;
  const { host, port } = v;
  if (typeof host !== "string" || typeof port !== "number" || !Number.isInteger(port) || port < 1024 || port > 65535) return false;
  const m = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(host);
  if (!m) return false;
  const [a, b, c, d] = m.slice(1).map(Number);
  if ([a, b, c, d].some((x) => x > 255)) return false;
  return a === 10 || a === 172 && b >= 16 && b <= 31 || a === 192 && b === 168;
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
function hostLanEndpoints(port) {
  return localLanAddresses().map((a) => ({ host: a.address, port })).filter(isPrivateLanEndpoint).slice(0, MAX_LAN_ENDPOINTS);
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
      const port = Buffer.alloc(2);
      port.writeUInt16BE(endpoint.port);
      socket.write(packet(0, Buffer.concat([varInt(PROTOCOL_1_20_1), varInt(host.length), host, port, varInt(1)])));
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
const MAX_CONNS_PER_KIND = 8;
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
    const server = net.createServer((socket) => {
      if (entry !== server || countKind("entry") >= MAX_CONNS_PER_KIND) {
        socket.destroy();
        return;
      }
      socket.pause();
      const id = track(socket, "entry");
      emit({ type: "accept", id });
    });
    server.once("error", reject2);
    server.listen(0, "127.0.0.1", () => {
      const addr = server.address();
      if (!addr || typeof addr === "string") {
        server.close();
        reject2(new Error("Tunnel porti ochilmadi"));
        return;
      }
      entry = server;
      entryPort = addr.port;
      resolve(addr.port);
    });
  });
}
function getEntryPort() {
  return entry ? entryPort : null;
}
function closeEntry() {
  const server = entry;
  entry = null;
  entryPort = null;
  server?.close();
  for (const [id, c] of conns) if (c.kind === "entry") closeConn(id);
}
async function probeEntry(timeoutMs) {
  const port = getEntryPort();
  if (port === null) return false;
  return pingMinecraft({ host: "127.0.0.1", port }, timeoutMs);
}
function dial(port) {
  if (port === null) throw new Error("Guruh o'yini ochiq emas");
  if (countKind("dial") >= MAX_CONNS_PER_KIND) throw new Error("Juda ko'p tunnel ulanishi");
  return track(net.connect({ host: "127.0.0.1", port }), "dial");
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
const USER_AGENT = "NeoTerraLauncher/1.0 (Minecraft launcher - github.com/mcmodhub)";
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
async function resolveE4allFile(version, loader) {
  const key = `${version}|${loader}`;
  const hit = e4allCache.get(key);
  if (hit && Date.now() - hit.at < E4ALL_CACHE_MS) return hit.file;
  const params = new URLSearchParams({
    loaders: JSON.stringify([loader]),
    game_versions: JSON.stringify([version])
  });
  const versions = await fetchJson(`${MODRINTH_API}/project/${LAN_TUNNEL_MOD_SLUG}/version?${params}`);
  const candidates = versions.filter(
    (v) => v.loaders.includes(loader) && v.game_versions.includes(version) && !isAndroidBuild(v.version_number)
  );
  const ordered = [...candidates.filter((v) => v.version_type === "release"), ...candidates];
  let found = null;
  for (const candidate of ordered) {
    const file = candidate.files.find((f) => f.primary && f.filename.endsWith(".jar") && !isAndroidBuild(f.filename)) ?? candidate.files.find((f) => f.filename.endsWith(".jar") && !isAndroidBuild(f.filename) && !/sources/i.test(f.filename));
    if (file && file.hashes.sha512) {
      found = file;
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
  const file = await resolveE4allFile(version, loader);
  if (!file) {
    throw new Error(
      `e4all modining ${loader} ${version} versiyasi Modrinth'da topilmadi - guruh o'yini bu versiyada ishlamaydi (Forge/Fabric/Quilt 1.18 va undan yangisini tanlang)`
    );
  }
  const res = await fetch(file.url, { headers: { "User-Agent": USER_AGENT }, signal: AbortSignal.timeout(12e4) });
  if (!res.ok) throw new Error(`e4all yuklanmadi (HTTP ${res.status})`);
  const bytes = Buffer.from(await res.arrayBuffer());
  const sha512 = crypto.createHash("sha512").update(bytes).digest("hex");
  if (sha512 !== file.hashes.sha512) throw new Error("e4all fayli buzilgan (sha512 mos kelmadi) - qayta urinib ko'ring");
  const target = path.join(modsDir, file.filename);
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
  const file = path.join(dir, "e4all.toml");
  const current2 = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
  fs.writeFileSync(
    file,
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
  const file = path.join(logsDir, "latest.log");
  let offset = 0;
  let identity = null;
  let pending = "";
  let decoder = new string_decoder.StringDecoder("utf8");
  let closed = false;
  let reading = false;
  const initial = safeStat(file);
  if (initial && initial.mtimeMs < opts.sinceMs) {
    offset = initial.size;
    identity = fileIdentity(initial);
  }
  function readNew() {
    if (closed || reading) return;
    reading = true;
    try {
      const st = safeStat(file);
      if (!st) return;
      const id = fileIdentity(st);
      if (identity !== null && id !== identity || st.size < offset) {
        offset = 0;
        pending = "";
        decoder = new string_decoder.StringDecoder("utf8");
      }
      identity = id;
      if (st.size <= offset) return;
      const fd = fs.openSync(file, "r");
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
    const { emit: emit2, role, nick, server } = this.opts;
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
      this.log("main/INFO", "cpw.mods.modlauncher.Launcher/MODLAUNCHER", `ModLauncher running: args [--username, ${nick}, --version, 1.20.1, --gameDir, ${this.opts.gameDir}, --launchTarget, forgeclient, --fml.forgeVersion, 47.3.0]`);
      this.log("main/INFO", "net.minecraftforge.fml.loading.moddiscovery.ModDiscoverer/SCAN", "Found mod file e4all-forge-2.1.0.jar of type MOD with provider {mods folder locator}");
    });
    this.at(2600, () => this.log("Render thread/INFO", "minecraft/Minecraft", `Setting user: ${nick}`));
    this.at(3200, () => this.log("Render thread/INFO", "net.minecraftforge.common.ForgeMod/FORGEMOD", "Forge mod loading, version 47.3.0, for MC 1.20.1 with MCP 20230612.114412"));
    this.at(3900, () => this.log("Render thread/INFO", "minecraft/SoundEngine", "Sound engine started"));
    if (role === "host") {
      const domain = randomE4mcDomain();
      this.at(5e3, () => this.log("Server thread/INFO", "minecraft/MinecraftServer", 'Preparing level "MCModHub Party"'));
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
      const target = server ? `${server.host}, ${server.port}` : "unknown, 25565";
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
const NICK_RE = /^[A-Za-z0-9_]{3,16}$/;
function readTarget$1(req) {
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
  if (!NICK_RE.test(nick)) throw new Error("Minecraft nick noto'g'ri (3-16 belgi, faqat A-Z, 0-9, _)");
  const { version, loader } = readTarget$1(req);
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
      const port = getEntryPort();
      if (port === null) throw new Error("P2P tunnel ochiq emas");
      target = { host: "127.0.0.1", port };
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
        const port = parseLanPort(line);
        if (port !== null) current2.lanPort = port;
        const address = parseE4mcAddress(line);
        if (address) current2.address = address;
        if (port === null && !address) return;
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
      if (role === "host") world = "MCModHub Party";
      const mockGame = new MockMinecraft({ gameDir: gameRoot, role, nick, server: target, emit: emit2, onExit: () => void 0 });
      current2.mockGame = mockGame;
      mockGame.start();
      return;
    }
    ensureInstanceDirs(version, loader);
    setCurrentInstance(version, loader);
    if (loader) {
      if (role === "host") {
        await ensureE4allInstalled(gameRoot, version, loader, baseEmit);
      } else {
        await ensureE4allInstalled(gameRoot, version, loader, baseEmit).catch(() => void 0);
      }
    }
    if (isE4allInstalled(gameRoot)) writeE4allConfig(gameRoot);
    const autoLanReady = supportsAutoLan(version, loader) && ensureAutoLanInstalled(gameRoot);
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
        autoOpenLan
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
  if (!NICK_RE.test(req.launch.profile.nick)) return;
  const { version, loader } = readTarget$1(req);
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
const LAUNCHER_MANAGED = [/^customskinloader/i, /^mcmodhub[_-]/i, /^e4(?:all|mc)/i, /^(?:oculus|iris)/i];
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
    const stream = fs.createReadStream(path2);
    stream.on("data", (chunk) => hash.update(chunk));
    stream.once("error", reject2);
    stream.once("end", () => resolve(hash.digest("hex")));
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
    entries = await promises.readdir(modsDir, { withFileTypes: true });
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
  const found = await mapLimit(jars, HASH_CONCURRENCY, async (file) => {
    const path$1 = path.join(modsDir, file);
    try {
      const st = await promises.stat(path$1);
      if (!st.isFile()) return null;
      const sha1 = await cachedSha1(path$1, st.size, st.mtimeMs);
      seen.add(path$1);
      return { file: sanitizeFileName(file), sha1 };
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
    return await promises.readFile(path2, "utf8");
  } catch {
    return "";
  }
}
async function refOf(root, kind, file) {
  const path$1 = path.join(root, kind === "shader" ? "shaderpacks" : "resourcepacks", file);
  try {
    const st = await promises.stat(path$1);
    if (!st.isFile() || st.size > MAX_PACK_BYTES) return null;
    return { kind, file: sanitizeFileName(file), sha1: await cachedSha1(path$1, st.size, st.mtimeMs), size: st.size };
  } catch {
    return null;
  }
}
async function readActivePacks(root) {
  try {
    const options = await readTextIfExists(path.join(root, "options.txt"));
    const jobs = parseActiveResourcePacks(options).map((f) => refOf(root, "resourcepack", f));
    for (const cfg of [path.join("config", "iris.properties"), path.join("config", "oculus.properties"), "optionsshaders.txt"]) {
      const shader = parseActiveShaderPack(await readTextIfExists(path.join(root, cfg)));
      if (shader) {
        jobs.push(refOf(root, "shader", shader));
        break;
      }
    }
    const refs = (await Promise.all(jobs)).filter((r) => r !== null);
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
      const entries = await promises.readdir(dir, { withFileTypes: true });
      const stats = await Promise.all(
        entries.filter((e) => e.isFile() || e.isSymbolicLink()).map(async (e) => {
          try {
            const st = await promises.stat(path.join(dir, e.name));
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
function readTarget(v) {
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
<title>NeoTerra</title>
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
</main>
<script>setTimeout(function(){ window.close(); }, 2500);</script>
</body></html>`;
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
    const server = http.createServer((req, res) => {
      const outcome = handleRequest(req, res, strings);
      if (outcome) finish(outcome);
    });
    const timer = setTimeout(() => finish({ ok: false, reason: "timeout" }), OAUTH_TIMEOUT_MS);
    function finish(r) {
      if (done) return;
      done = true;
      clearTimeout(timer);
      resolveResult(r);
      server.close();
      setTimeout(() => server.closeAllConnections(), 300);
    }
    server.on("error", (err) => {
      finish({ ok: false, reason: "failed", message: err.message });
      resolveBegin({ ok: false, reason: err.code === "EADDRINUSE" ? "port-busy" : "failed" });
    });
    server.listen(OAUTH_CALLBACK_PORT, "127.0.0.1", () => {
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
function pageStrings(raw) {
  const clean = (v, fallback) => typeof v === "string" && v.trim() ? v.trim().slice(0, 200) : fallback;
  return {
    successTitle: clean(raw?.successTitle, "Signed in"),
    successMessage: clean(raw?.successMessage, "You can close this tab and return to the launcher."),
    errorTitle: clean(raw?.errorTitle, "Sign-in failed"),
    errorMessage: clean(raw?.errorMessage, "Return to the launcher and try again.")
  };
}
function registerIpc(getWindow) {
  const FALLBACK_MINIMIZE_MS = 25e3;
  let cancelPendingMinimize = null;
  function scheduleMinimizeOnFocusLoss(win) {
    cancelPendingMinimize?.();
    const onBlur = () => {
      cancelPendingMinimize?.();
      win.minimize();
    };
    const fallback = setTimeout(() => {
      cancelPendingMinimize?.();
      if (!win.isDestroyed()) win.minimize();
    }, FALLBACK_MINIMIZE_MS);
    cancelPendingMinimize = () => {
      cancelPendingMinimize = null;
      clearTimeout(fallback);
      if (!win.isDestroyed()) win.off("blur", onBlur);
    };
    win.once("blur", onBlur);
  }
  const emit2 = (e) => {
    const win = getWindow();
    win?.webContents.send(IPC.EVENT, e);
    if (e.type === "started") {
      if (win) scheduleMinimizeOnFocusLoss(win);
    } else if (e.type === "closed" || e.type === "autofixing" || e.type === "launch-failed") {
      cancelPendingMinimize?.();
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
  electron.ipcMain.handle(IPC.LAUNCH, async (_e, req) => {
    try {
      if (isBridgeActive()) throw new Error("Guruh o'yini allaqachon ishlayapti");
      await launchGame(req, emit2);
      return { ok: true };
    } catch (err) {
      if (err instanceof LaunchAdviceError) {
        emit2({ type: "launch-failed", ...err.advice });
        emit2({ type: "closed", code: null });
        return { ok: true };
      }
      const message = err instanceof Error ? err.message : String(err);
      emit2({ type: "error", message });
      return { ok: false, error: message };
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
      if (typeof url !== "string") {
        return { ok: false, error: "invalid URL" };
      }
      if (url.startsWith("data:")) {
        const parts = url.split(",");
        const mimeMatch = parts[0].match(/data:([^;]+);/);
        const mime = mimeMatch ? mimeMatch[1] : "image/png";
        const base64 = parts[1] || "";
        const buf = Buffer.from(base64, "base64");
        return {
          ok: true,
          data: { bytes: buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength), contentType: mime }
        };
      }
      const fullUrl = url.startsWith("/") ? `https://site.neoterra.uz${url}` : url;
      if (!/^https?:\/\//i.test(fullUrl)) {
        return { ok: false, error: "invalid URL" };
      }
      const res = await fetch(fullUrl);
      if (!res.ok) return { ok: false, error: `HTTP ${res.status}` };
      const buf = await res.arrayBuffer();
      if (buf.byteLength > 15 * 1024 * 1024) return { ok: false, error: "response too large" };
      return {
        ok: true,
        data: { bytes: buf, contentType: res.headers.get("content-type") }
      };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });
  electron.ipcMain.handle(IPC.ADD_AV_EXCLUSION, async () => {
    const res = await addWindowsDefenderExclusion(gameDir());
    return res.ok ? { ok: true } : { ok: false, error: res.error };
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
      const PNG_MAGIC = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
      if (!buf.subarray(0, 8).equals(PNG_MAGIC)) {
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
        const installed = await installThemeFromUrl(id, url);
        setUiModEnabled(true);
        return { ok: true, data: installed };
      } catch (err) {
        return { ok: false, error: err instanceof Error ? err.message : String(err) };
      }
    }
  );
  electron.ipcMain.handle(
    IPC.UI_THEME_INSTALL_FILE,
    async (_e, id, zipPath) => {
      try {
        const installed = installThemeFromZip(id, zipPath);
        setUiModEnabled(true);
        return { ok: true, data: installed };
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
      return { ok: true, data: await readPartyManifest(readTarget(target)) };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });
  electron.ipcMain.handle(IPC.PARTY_PACKS, async (_e, target, refs) => {
    try {
      return { ok: true, data: await checkPartyPacks(readTarget(target), refs) };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });
  electron.ipcMain.handle(IPC.PARTY_HOST_SUPPORT, async (_e, target) => {
    try {
      const t = readTarget(target);
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
    const server = http.createServer((req, res) => {
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
      const address = server.address();
      if (address && typeof address === "object") resolve(address.port);
      else reject2(new Error("Lokal server porti aniqlanmadi"));
    }
    server.once("error", (err) => {
      if (err.code !== "EADDRINUSE") {
        reject2(err);
        return;
      }
      server.removeAllListeners("error");
      server.once("error", reject2);
      server.once("listening", onListening);
      server.listen(0, "127.0.0.1");
    });
    server.once("listening", onListening);
    server.listen(FIXED_PORT, "127.0.0.1");
  });
}
electron.app.commandLine.appendSwitch("autoplay-policy", "no-user-gesture-required");
electron.app.commandLine.appendSwitch("disable-features", "WebRtcHideLocalIpsWithMdns");
let mainWindow = null;
async function createWindow() {
  mainWindow = new electron.BrowserWindow({
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
    icon: path.join(__dirname, "../../resources/icon.png"),
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      sandbox: false,
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: false
    }
  });
  mainWindow.on("ready-to-show", () => mainWindow?.show());
  mainWindow.on("closed", () => mainWindow = null);
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    electron.shell.openExternal(url);
    return { action: "deny" };
  });
  if (utils.is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    setTrustedRendererOrigin(process.env["ELECTRON_RENDERER_URL"]);
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    const port = await startRendererServer(path.join(__dirname, "../renderer"));
    const rendererUrl = `http://127.0.0.1:${port}/index.html`;
    setTrustedRendererOrigin(rendererUrl);
    mainWindow.loadURL(rendererUrl);
  }
}
if (!electron.app.requestSingleInstanceLock()) {
  electron.app.quit();
} else {
  electron.app.on("second-instance", () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
  electron.app.whenReady().then(() => {
    utils.electronApp.setAppUserModelId("uz.neoterra.launcher");
    electron.app.on("browser-window-created", (_, window) => utils.optimizer.watchWindowShortcuts(window));
    registerIpc(() => mainWindow);
    registerPermissionHandlers();
    createWindow();
    electron.app.on("activate", () => {
      if (electron.BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  });
  electron.app.on("window-all-closed", () => {
    if (process.platform !== "darwin") electron.app.quit();
  });
}

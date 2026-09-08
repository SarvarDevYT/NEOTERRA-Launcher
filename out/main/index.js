"use strict";
const electron = require("electron");
const path = require("path");
const utils = require("@electron-toolkit/utils");
const fs = require("fs");
const os = require("os");
const child_process = require("child_process");
const minecraftLauncherCore = require("minecraft-launcher-core");
const crypto = require("crypto");
const AdmZip = require("adm-zip");
const electronUpdater = require("electron-updater");
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
function runJavaVersion(javaPath) {
  return new Promise((resolve) => {
    child_process.execFile(javaPath, ["-version"], (err, _stdout, stderr) => {
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
        "C:\\Program Files (x86)\\Java"
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
    for (const entry of safeListDir(parent)) {
      for (const exe of javaExecutables(path.join(parent, entry))) {
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
function needsIntelJavaOnMac(mcVersion) {
  if (process.platform !== "darwin" || process.arch !== "arm64") return false;
  const snapshot = /^(\d\d)w\d\d[a-z]/.exec(mcVersion);
  if (snapshot) return parseInt(snapshot[1], 10) < 22;
  const [maj = 0, min = 0] = mcVersion.split(".").map((n) => parseInt(n, 10) || 0);
  if (maj !== 1) return false;
  return min < 19;
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
  const res = await fetch(MANIFEST_URL, { signal: AbortSignal.timeout(15e3) });
  if (!res.ok) throw new Error(`Versiyalar ro'yxati olinmadi (HTTP ${res.status})`);
  const data = await res.json();
  manifestCache = data.versions;
  return manifestCache;
}
async function listMinecraftVersions() {
  const versions = await getManifest();
  return versions.map((v) => ({ id: v.id, type: v.type }));
}
async function getVanillaVersionJson(mcVersion) {
  const versions = await getManifest();
  const entry = versions.find((v) => v.id === mcVersion);
  if (!entry) throw new Error(`${mcVersion} versiyasi topilmadi`);
  const res = await fetch(entry.url, { signal: AbortSignal.timeout(15e3) });
  if (!res.ok) throw new Error(`${mcVersion} versiya fayli olinmadi (HTTP ${res.status})`);
  return await res.json();
}
const META_BASE = {
  fabric: "https://meta.fabricmc.net/v2",
  quilt: "https://meta.quiltmc.org/v3"
};
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
async function pickLoaderVersion(kind, mcVersion) {
  const res = await fetch(`${META_BASE[kind]}/versions/loader/${encodeURIComponent(mcVersion)}`, {
    signal: AbortSignal.timeout(15e3)
  });
  if (!res.ok) throw new Error(`${kind} loader ro'yxati olinmadi (HTTP ${res.status})`);
  const data = await res.json();
  if (data.length === 0) throw new Error(`${mcVersion} uchun ${kind} topilmadi`);
  const best = data.find((e) => e.loader.stable) ?? data[0];
  return best.loader.version;
}
async function ensureLoaderProfile(kind, root, mcVersion) {
  try {
    const versionsDir = path.join(root, "versions");
    const existing = (await fs.promises.readdir(versionsDir)).find(
      (name) => name.startsWith(`${kind}-loader-`) && name.endsWith(`-${mcVersion}`)
    );
    if (existing) {
      const versionJsonPath2 = path.join(versionsDir, existing, `${existing}.json`);
      if (fs.existsSync(versionJsonPath2)) {
        try {
          const cached = JSON.parse(fs.readFileSync(versionJsonPath2, "utf-8"));
          if (cached.mainClass && Array.isArray(cached.libraries) && cached.libraries.length > 0) {
            return { customId: existing, versionJsonPath: versionJsonPath2 };
          }
        } catch {
        }
      }
    }
  } catch {
  }
  const loaderVersion = await pickLoaderVersion(kind, mcVersion);
  const customId = `${kind}-loader-${loaderVersion}-${mcVersion}`;
  const versionDir = path.join(root, "versions", customId);
  const versionJsonPath = path.join(versionDir, `${customId}.json`);
  await fs.promises.mkdir(versionDir, { recursive: true });
  const [vanilla, profileRes] = await Promise.all([
    getVanillaVersionJson(mcVersion),
    fetch(
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
  return { customId, versionJsonPath };
}
function defaultInstallPath() {
  if (process.platform === "win32") return path.join(electron.app.getPath("appData"), ".neoterra");
  if (process.platform === "darwin") return path.join(electron.app.getPath("appData"), "neoterra");
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
        cache$1 = { installPath: parsed.installPath };
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
  save({ installPath: path2 });
}
const DEFAULT_UI_THEME_ID = "forest";
const DEFAULT_UI_THEME_PACK_URL = "https://mcmodhubmedia.b-cdn.net/ui-themes/forest.zip";
const MOD_DIR = "neoterra_ui";
function uiRoot() {
  return path.join(getInstallPath(), MOD_DIR);
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
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    total += entry.isDirectory() ? dirSize(p) : fs.statSync(p).size;
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
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const id = entry.name;
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
  for (const entry of zip.getEntries()) {
    if (entry.isDirectory) continue;
    const name = entry.entryName.replace(/\\/g, "/");
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
    fs.writeFileSync(dest, entry.getData());
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
const UI_MOD_FILE = `neoterra_ui-${UI_MOD_VERSION}.jar`;
const UI_MOD_URL = `https://mcmodhubmedia.b-cdn.net/mods/${UI_MOD_FILE}`;
const MIN_VALID_BYTES = 5e4;
function modsDir() {
  const dir = path.join(getInstallPath(), "mods");
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}
function removeOtherVersions(dir) {
  for (const name of fs.readdirSync(dir)) {
    if (/^neoterra_ui-.*\.jar$/i.test(name) && name !== UI_MOD_FILE) {
      try {
        fs.unlinkSync(path.join(dir, name));
      } catch {
      }
    }
  }
}
async function ensureUiMod(onStatus) {
  const dir = modsDir();
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
function removeUiMod() {
  setUiModEnabled(false);
  const dir = modsDir();
  let ok = true;
  for (const name of fs.readdirSync(dir)) {
    if (!/^neoterra_ui-.*\.jar$/i.test(name)) continue;
    try {
      fs.unlinkSync(path.join(dir, name));
    } catch {
      ok = false;
    }
  }
  return ok;
}
const PROMOTIONS_URL = "https://files.minecraftforge.net/net/minecraftforge/forge/promotions_slim.json";
let promoCache = null;
async function getPromotions() {
  if (promoCache) return promoCache;
  const res = await fetch(PROMOTIONS_URL, { signal: AbortSignal.timeout(15e3) });
  if (!res.ok) throw new Error(`Forge promotions olinmadi (HTTP ${res.status})`);
  promoCache = await res.json();
  return promoCache;
}
async function getRecommendedForgeBuild(mcVersion) {
  const { promos } = await getPromotions();
  return promos[`${mcVersion}-recommended`] ?? promos[`${mcVersion}-latest`] ?? null;
}
async function listForgeSupportedVersions() {
  try {
    const { promos } = await getPromotions();
    const set = /* @__PURE__ */ new Set();
    for (const key of Object.keys(promos)) {
      set.add(key.replace(/-recommended$|-latest$/, ""));
    }
    return set;
  } catch {
    return /* @__PURE__ */ new Set();
  }
}
async function ensureForgeInstaller(root, mcVersion) {
  const build = await getRecommendedForgeBuild(mcVersion);
  if (!build) throw new Error(`${mcVersion} uchun Forge topilmadi`);
  const forgeVersion = `${mcVersion}-${build}`;
  const dir = path.join(root, "forge-installers");
  const jarPath = path.join(dir, `forge-${forgeVersion}-installer.jar`);
  if (fs.existsSync(jarPath) && (await fs.promises.stat(jarPath)).size > 1e6) return jarPath;
  await fs.promises.mkdir(dir, { recursive: true });
  const url = `https://maven.minecraftforge.net/net/minecraftforge/forge/${forgeVersion}/forge-${forgeVersion}-installer.jar`;
  const res = await fetch(url, { signal: AbortSignal.timeout(12e4) });
  if (!res.ok) throw new Error(`Forge installer yuklanmadi (HTTP ${res.status})`);
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.promises.writeFile(jarPath, buf);
  return jarPath;
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
  return new Promise((resolve, reject) => {
    child_process.execFile(
      "tar",
      ["-xzf", archivePath, "-C", destDir, "--strip-components", "1"],
      (err, _stdout, stderr) => {
        if (err) {
          reject(new Error(`arxivni ochib bo'lmadi (tar): ${stderr?.trim() || err.message}`));
          return;
        }
        resolve();
      }
    );
  });
}
async function extractZip(buffer, destDir) {
  const zip = new AdmZip(buffer);
  const entries = zip.getEntries();
  const firstPath = entries[0]?.entryName ?? "";
  const rootPrefix = firstPath.includes("/") ? firstPath.slice(0, firstPath.indexOf("/") + 1) : "";
  for (const entry of entries) {
    if (entry.isDirectory) continue;
    const relative = rootPrefix && entry.entryName.startsWith(rootPrefix) ? entry.entryName.slice(rootPrefix.length) : entry.entryName;
    if (!relative) continue;
    const outPath = path.join(destDir, relative);
    await fs.promises.mkdir(path.dirname(outPath), { recursive: true });
    await fs.promises.writeFile(outPath, entry.getData());
  }
}
const verifiedBins = /* @__PURE__ */ new Set();
async function verifyRuns(javaBin) {
  if (verifiedBins.has(javaBin)) return;
  try {
    await new Promise((resolve, reject) => {
      child_process.execFile(javaBin, ["-version"], (err) => err ? reject(err) : resolve());
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
async function ensureJavaRuntime(major, root, options = {}) {
  const os$1 = adoptiumOs();
  const arch = adoptiumArch(os$1, major, options);
  const runtimeDir = os$1 === "windows" ? path.join(root, "jre", String(major)) : path.join(root, "jre", `${major}-${arch}`);
  const javaBin = javaBinPath(os$1, runtimeDir);
  if (fs.existsSync(javaBin)) {
    await verifyRuns(javaBin);
    return javaBin;
  }
  const url = `https://api.adoptium.net/v3/binary/latest/${major}/ga/${os$1}/${arch}/jre/hotspot/normal/eclipse`;
  const res = await fetch(url, { signal: AbortSignal.timeout(12e4) });
  if (!res.ok) throw new Error(`Java ${major} (${os$1}/${arch}) yuklanmadi (HTTP ${res.status})`);
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.promises.mkdir(runtimeDir, { recursive: true });
  if (os$1 === "windows") {
    await extractZip(buf, runtimeDir);
  } else {
    const archivePath = path.join(os.tmpdir(), `mcmodhub-jre-${major}-${arch}-${process.pid}.tar.gz`);
    await fs.promises.writeFile(archivePath, buf);
    try {
      await extractTarGz(archivePath, runtimeDir);
    } finally {
      await fs.promises.rm(archivePath, { force: true });
    }
    await fs.promises.chmod(javaBin, 493).catch(() => {
    });
  }
  if (!fs.existsSync(javaBin)) throw new Error("Java o'rnatilmadi (kutilgan fayl topilmadi)");
  await verifyRuns(javaBin);
  return javaBin;
}
const MR_BASE = "https://api.modrinth.com/v2";
const USER_AGENT = "NeoTerraLauncher/1.0 (Minecraft launcher - neoterra.uz)";
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
      headers: { Accept: "application/json", "User-Agent": USER_AGENT },
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
async function resolveLatestFile(projectId, gameVersion, loader) {
  const version = await resolveLatestVersion(projectId, gameVersion, loader);
  const file = version?.files.find((f) => f.primary) ?? version?.files[0];
  return file ? { url: file.url, filename: file.filename } : null;
}
async function resolveRequiredDependencies(projectId, gameVersion, seen, loader) {
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
      dep.version_id ? resolveVersionById(dep.version_id) : resolveLatestVersion(depId, gameVersion, loader)
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
    const nested = await resolveRequiredDependencies(depId, gameVersion, seen, loader);
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
async function searchModrinthMods(offset, gameVersion, query, projectType = "mod") {
  try {
    const facets = gameVersion ? [[`project_type:${projectType}`], [`versions:${gameVersion}`]] : [[`project_type:${projectType}`]];
    const params = new URLSearchParams({
      facets: JSON.stringify(facets),
      index: query ? "relevance" : "downloads",
      offset: String(offset),
      limit: String(PAGE_SIZE)
    });
    if (query) params.set("query", query);
    const { hits, total_hits } = await mrFetch(`/search?${params.toString()}`);
    const fileLoader = projectType === "datapack" ? "datapack" : void 0;
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
function normalize(text) {
  return text.toLowerCase().replace(/[^a-z0-9]/g, "");
}
const MEMORY_FILE = "neoterra-fps-boost.json";
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
async function downloadInto(modsDir2, url, filename) {
  const res = await fetch(url, { signal: AbortSignal.timeout(12e4) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  fs.writeFileSync(path.join(modsDir2, filename), Buffer.from(await res.arrayBuffer()));
}
async function ensurePerformanceMods(dir, gameVersion, loader, emit) {
  const modsDir2 = path.join(dir, "mods");
  fs.mkdirSync(modsDir2, { recursive: true });
  const installed = fs.readdirSync(modsDir2);
  if (installed.some((f) => /optifine/i.test(f))) {
    emit({
      type: "log",
      line: "[NeoTerra]: OptiFine topildi - FPS modlari o'tkazib yuborildi (ular birga ishlamaydi)"
    });
    return;
  }
  const installedNames = installed.map(normalize);
  const alreadyThere = (slug) => installedNames.some((name) => name.includes(normalize(slug)));
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
      emit({ type: "status", message: `FPS modi o'rnatilmoqda: ${slug}...` });
      try {
        await downloadInto(modsDir2, file.url, file.filename);
        installedNames.push(normalize(file.filename));
        offered.add(slug);
        memoryChanged = true;
      } catch (err) {
        emit({
          type: "log",
          line: `[NeoTerra]: "${slug}" yuklanmadi: ${err instanceof Error ? err.message : String(err)}`
        });
        continue;
      }
      try {
        const deps = await resolveRequiredDependencies(slug, gameVersion, /* @__PURE__ */ new Set([slug]), loader);
        for (const dep of deps) {
          if (fs.existsSync(path.join(modsDir2, dep.filename))) continue;
          if (installedNames.some((name) => name.includes(normalize(dep.name)))) continue;
          await downloadInto(modsDir2, dep.url, dep.filename);
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
function writeDefaultVideoOptions(dir) {
  const file = path.join(dir, "options.txt");
  if (fs.existsSync(file)) return;
  const lines = [
    "graphicsMode:0",
    // Fast (1.16+)
    "fancyGraphics:false",
    // xuddi shu narsa, eski versiyalar uchun
    "renderDistance:8",
    "simulationDistance:8",
    "maxFps:120",
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
const GITHUB_PROXY_PREFIX = "https://ghfast.top/";
const GITHUB_HOST_RE = /^https:\/\/(github\.com|raw\.githubusercontent\.com|release-assets\.githubusercontent\.com|objects\.githubusercontent\.com|codeload\.github\.com)\//;
function isGithubUrl(url) {
  return GITHUB_HOST_RE.test(url);
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
function gameDir() {
  return getInstallPath();
}
function unixSocketTmpDir() {
  const drive = process.env.SystemDrive ?? "C:";
  const dir = path.join(drive, ".neoterra-uds");
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}
const CSL_LOADER_NAMES = ["fabric", "forge", "quilt", "neoforge"];
async function ensureCustomSkinLoaderMod(dir, gameVersion, loader) {
  const modsDir2 = path.join(dir, "mods");
  fs.mkdirSync(modsDir2, { recursive: true });
  const wanted = loader === "quilt" ? "fabric" : loader;
  const accepted = loader === "quilt" ? ["fabric", "quilt"] : [wanted];
  const existing = fs.readdirSync(modsDir2).filter((f) => /customskinloader/i.test(f));
  const mismatched = existing.filter((f) => {
    const lower = f.toLowerCase();
    if (lower.includes("universal")) return false;
    return CSL_LOADER_NAMES.some((n) => !accepted.includes(n) && lower.includes(n));
  });
  for (const stale of mismatched) {
    try {
      fs.unlinkSync(path.join(modsDir2, stale));
    } catch {
    }
  }
  if (existing.length > mismatched.length) return;
  const file = await resolveLatestFile("customskinloader", gameVersion, wanted);
  if (!file) return;
  const res = await fetch(file.url, { signal: AbortSignal.timeout(12e4) });
  if (!res.ok) throw new Error(`CustomSkinLoader yuklanmadi (HTTP ${res.status})`);
  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(path.join(modsDir2, file.filename), buffer);
}
function writeCustomSkinLoaderConfig(dir) {
  const cslDir = path.join(dir, "CustomSkinLoader");
  fs.mkdirSync(cslDir, { recursive: true });
  const configPath = path.join(cslDir, "CustomSkinLoader.json");
  const siteUrl = (process.env.NEOTERRA_SITE_URL || "https://site.neoterra.uz").replace(/\/$/, "");
  const ours = {
    name: "NeoTerra",
    type: "CustomSkinAPI",
    root: `${siteUrl}/api/launcher/skins/`
  };
  const localSkins = {
    name: "NeoTerraLocal",
    type: "CustomSkinAPI",
    root: "http://127.0.0.1:47823/skins/"
  };
  let config = { version: "15.0.1", enable: true, loadlist: [] };
  try {
    const parsed = JSON.parse(fs.readFileSync(configPath, "utf-8"));
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) config = parsed;
  } catch {
  }
  const previous = Array.isArray(config.loadlist) ? config.loadlist : [];
  const rest = previous.filter((e) => e?.name !== "NeoTerra" && e?.name !== "NeoTerraLocal" && e?.name !== "MCModHub");
  if (!rest.some((e) => typeof e?.type === "string" && /mojang/i.test(e.type))) {
    rest.push({ name: "Mojang", type: "MojangAPI" });
  }
  config.loadlist = [ours, localSkins, ...rest];
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf-8");
}
function writeCompanionConfig(dir, companionId) {
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, "neoterra_companion.json"),
    JSON.stringify({ companion: companionId ?? null }, null, 2),
    "utf-8"
  );
}
function writeUiToken(dir, token) {
  const target = path.join(dir, "neoterra_ui");
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
    for (const entry of entries) {
      const full = path.join(dir, entry);
      try {
        const s = fs.statSync(full);
        if (s.isDirectory()) scan(full, isCorrupt);
        else if (isCorrupt(entry, s.size)) {
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
let current = null;
function killGame() {
  current?.child?.kill();
  current = null;
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
function readMissingClasspaths(dir) {
  try {
    const crashDir = path.join(dir, "crash-reports");
    const files = fs.readdirSync(crashDir).filter((f) => f.endsWith("-fml.txt")).map((f) => ({ f, mtime: fs.statSync(path.join(crashDir, f)).mtimeMs })).sort((a, b) => b.mtime - a.mtime);
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
function readGenericCrashSummary(dir) {
  try {
    const crashDir = path.join(dir, "crash-reports");
    const files = fs.readdirSync(crashDir).filter((f) => f.startsWith("crash-") && f.endsWith(".txt")).map((f) => ({ f, mtime: fs.statSync(path.join(crashDir, f)).mtimeMs })).sort((a, b) => b.mtime - a.mtime);
    if (files.length === 0) return null;
    const lines = fs.readFileSync(path.join(crashDir, files[0].f), "utf-8").split("\n");
    const descIndex = lines.findIndex((l) => l.startsWith("Description:"));
    if (descIndex === -1) return null;
    const description = lines[descIndex].slice("Description:".length).trim();
    const exceptionLine = lines.slice(descIndex + 1).find((l) => l.trim().length > 0);
    return exceptionLine ? `${description}: ${exceptionLine.trim()}` : description;
  } catch {
    return null;
  }
}
function readJvmNativeCrashSummary(dir) {
  try {
    const files = fs.readdirSync(dir).filter((f) => f.startsWith("hs_err_pid") && f.endsWith(".log")).map((f) => ({ f, mtime: fs.statSync(path.join(dir, f)).mtimeMs })).sort((a, b) => b.mtime - a.mtime);
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
const MAX_AUTO_FIX_ATTEMPTS = 5;
async function tryAutoFixMissingMods(req, emit, missingIds, missingClasspaths) {
  if (!req.loader) return;
  const modsDir2 = path.join(gameDir(), "mods");
  fs.mkdirSync(modsDir2, { recursive: true });
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
    if (fs.existsSync(path.join(modsDir2, found.filename))) {
      try {
        fs.unlinkSync(path.join(modsDir2, found.filename));
      } catch {
      }
      newlyExcluded.add(found.projectId);
      return {
        installed: false,
        retry: true,
        reason: `"${found.name}" mos kelmadi (o'rnatilgan edi, lekin muammoni hal qilmadi) - boshqa nomzod izlanmoqda.`
      };
    }
    emit({ type: "status", message: `O'rnatilmoqda: ${found.name}...` });
    try {
      const res = await fetch(found.url, { signal: AbortSignal.timeout(12e4) });
      if (!res.ok) {
        return { installed: false, retry: false, reason: `"${found.name}" yuklab bo'lmadi (server javobi: HTTP ${res.status}).` };
      }
      fs.writeFileSync(path.join(modsDir2, found.filename), Buffer.from(await res.arrayBuffer()));
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
    emit({
      type: "status",
      message: anyInstalled ? "Modlar o'rnatildi, o'yin qayta ishga tushirilmoqda..." : "Mos kelmagan fayl olib tashlandi, boshqa nomzod bilan qayta urinilmoqda..."
    });
    await launchGame(
      {
        ...req,
        autoFixAttempts: (req.autoFixAttempts ?? 0) + 1,
        autoFixExcludedProjectIds: [...excluded, ...newlyExcluded]
      },
      emit
    );
  } else {
    emit({ type: "launch-failed", title: "O'yin ishga tushmadi", items: failReasons });
    emit({ type: "closed", code: null });
  }
}
async function launchGame(req, emit) {
  if (current) throw new Error("O'yin allaqachon ishga tushirilgan");
  if (!isValidNick(req.profile.nick)) {
    throw new Error("Minecraft nick noto'g'ri (3-16 belgi, faqat A-Z, 0-9, _)");
  }
  const launcher = new minecraftLauncherCore.Client();
  const auth = buildOfflineAuth(req.profile.nick, req.profile.uuid);
  let customVersion = req.customVersion;
  let versionJsonOverride;
  let forgeInstallerPath;
  let javaPath = req.javaPath;
  const fpsBoost = req.fpsBoost !== false;
  if (fpsBoost) {
    try {
      writeDefaultVideoOptions(gameDir());
    } catch {
    }
    applyLinuxGpuPreference();
  }
  try {
    writeCustomSkinLoaderConfig(gameDir());
  } catch (err) {
    emit({
      type: "warning",
      message: `Skin sozlamasi yozilmadi, o'yin standart skin bilan ochiladi: ${err instanceof Error ? err.message : String(err)}`
    });
  }
  try {
    writeCompanionConfig(gameDir(), req.companionId);
  } catch (err) {
    emit({
      type: "warning",
      message: `Kompanion sozlamasi yozilmadi, o'yinda kompanion ko'rinmasligi mumkin: ${err instanceof Error ? err.message : String(err)}`
    });
  }
  try {
    writeUiToken(gameDir(), req.uiToken);
  } catch (err) {
    emit({
      type: "warning",
      message: `UI tokeni yozilmadi, o'yin standart menyu bilan ochiladi: ${err instanceof Error ? err.message : String(err)}`
    });
  }
  if (await ensureUiMod((message) => emit({ type: "status", message }))) {
    await ensureDefaultTheme((message) => emit({ type: "status", message }));
  }
  const corruptedCount = removeCorruptedDownloads(gameDir());
  if (corruptedCount > 0) {
    emit({ type: "log", line: `[NeoTerra]: ${corruptedCount} ta buzilgan kutubxona fayli tozalandi, qayta yuklanadi` });
  }
  emit({ type: "status", message: "Fayllar tayyorlanmoqda..." });
  const downloadTasks = [];
  if (req.loader === "fabric" || req.loader === "quilt") {
    downloadTasks.push(
      ensureLoaderProfile(req.loader, gameDir(), req.version).then((r) => {
        customVersion = r.customId;
        versionJsonOverride = r.versionJsonPath;
      })
    );
  } else if (req.loader === "forge") {
    downloadTasks.push(
      ensureForgeInstaller(gameDir(), req.version).then((p) => {
        forgeInstallerPath = p;
      })
    );
    downloadTasks.push(ensureForgeWrapperJar(gameDir()));
  }
  if (req.loader) {
    downloadTasks.push(
      ensureCustomSkinLoaderMod(gameDir(), req.version, req.loader).catch((err) => {
        emit({
          type: "warning",
          message: `Skin modi o'rnatilmadi: ${err instanceof Error ? err.message : String(err)}`
        });
      })
    );
  }
  if (fpsBoost && req.loader) {
    downloadTasks.push(
      ensurePerformanceMods(gameDir(), req.version, req.loader, emit).catch((err) => {
        emit({
          type: "warning",
          message: `FPS modlari o'rnatilmadi: ${err instanceof Error ? err.message : String(err)}`
        });
      })
    );
  }
  if (!javaPath) {
    downloadTasks.push(
      ensureJavaRuntime(requiredJavaMajor(req.version), gameDir(), {
        // Apple Silicon (M1/M2/...) da 1.19'gacha bo'lgan versiyalar faqat Intel Java bilan
        // ishlaydi - sababi `java.ts` -> `needsIntelJavaOnMac` izohida.
        forceX64: needsIntelJavaOnMac(req.version)
      }).then((p) => {
        javaPath = p;
      }).catch((err) => {
        emit({ type: "log", line: `[NeoTerra]: Java avtomatik yuklanmadi, tizim java'si ishlatiladi: ${err instanceof Error ? err.message : String(err)}` });
      })
    );
  }
  await Promise.all(downloadTasks);
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
      ...process.platform === "win32" ? [`-Djdk.net.unixdomain.tmpdir=${unixSocketTmpDir()}`] : [],
      ...fpsBoost ? performanceJvmArgs(req.ramMax) : []
    ],
    // To'g'ridan-to'g'ri serverga ulanish (1.20+ quickPlay, eski versiyalar uchun server/port)
    ...req.server ? {
      quickPlay: {
        type: "multiplayer",
        identifier: `${req.server.host}:${req.server.port}`
      },
      server: { host: req.server.host, port: String(req.server.port) }
    } : {},
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
      ...versionJsonOverride ? { versionJson: versionJsonOverride } : {}
    }
  };
  const recentDataLines = [];
  launcher.on("debug", (line) => {
    console.log("[MCLC debug]", line);
    emit({ type: "log", line: String(line) });
  });
  launcher.on("data", (line) => {
    console.log("[MCLC data]", line);
    emit({ type: "log", line: String(line) });
    for (const part of String(line).split("\n")) {
      const trimmed = part.trim();
      if (!trimmed) continue;
      recentDataLines.push(trimmed);
      if (recentDataLines.length > 20) recentDataLines.shift();
    }
  });
  launcher.on("progress", (e) => {
    const percent = e.total > 0 ? Math.round(e.task / e.total * 100) : 0;
    emit({ type: "progress", task: e.type, current: e.task, total: e.total, percent });
  });
  launcher.on("download-status", (e) => {
    const percent = e.total > 0 ? Math.round(e.current / e.total * 100) : 0;
    emit({ type: "progress", task: e.type, current: e.current, total: e.total, percent });
  });
  launcher.on("close", (code) => {
    console.log("[MCLC close]", code);
    current = null;
    const attempts = req.autoFixAttempts ?? 0;
    const crashed = code !== 0;
    const missingIds = crashed && req.loader ? readMissingMandatoryModIds(gameDir()) : [];
    const missingClasspaths = crashed && req.loader ? Array.from(/* @__PURE__ */ new Set([...readMissingClasspaths(gameDir()), ...readMissingClasspathsFromRawOutput(recentDataLines)])) : [];
    if (missingIds.length === 0 && missingClasspaths.length === 0) {
      const isKnotError = recentDataLines.some(
        (l) => l.includes("net.fabricmc.loader.impl.launch.knot.KnotClient") || l.includes("net.fabricmc.loader.launch.knot.KnotClient") || l.includes("org.quiltmc.loader.impl.launch.knot.KnotClient")
      );
      if (isKnotError && (req.loader === "fabric" || req.loader === "quilt")) {
        cleanupLoaderProfileOnKnotError(gameDir(), req.version);
        removeCorruptedDownloads(gameDir());
      }
      if (crashed) {
        const summary = readGenericCrashSummary(gameDir());
        if (summary) {
          emit({
            type: "launch-failed",
            title: "O'yin kutilmagan xatolik bilan yopildi",
            items: [summary, `Batafsil ma'lumot uchun "crash-reports" papkasidagi eng so'nggi faylni tekshiring.`]
          });
        } else {
          const nativeSummary = readJvmNativeCrashSummary(gameDir());
          if (nativeSummary) {
            emit({
              type: "launch-failed",
              title: "O'yin ishga tushmadi",
              items: [
                nativeSummary,
                "Bu odatda videokarta drayveri eskirgani yoki antivirus dastur to'sqinlik qilayotgani sabab bo'ladi - drayverni yangilang yoki antivirusda ilovaga ruxsat bering."
              ]
            });
          } else if (recentDataLines.length > 0) {
            const knot = recentDataLines.some(
              (l) => l.includes("KnotClient") || l.includes("ClassNotFoundException")
            );
            emit({
              type: "launch-failed",
              title: "O'yin ishga tushmadi",
              items: knot ? [
                `O'yin kutilmagan tarzda yopildi (kod: ${code}).`,
                `Mod loader kutubxonalari to'liq yuklanmagan yoki buzilgan. Buzilgan fayllar tozalandi - iltimos, "O'ynash" tugmasini qayta bosing.`,
                `Agar muammo davom etsa, "Root papkasi"ni ochib, "versions" papkasini o'chirib qayta urinib ko'ring.`
              ] : [`O'yin kutilmagan tarzda yopildi (kod: ${code}).`, ...recentDataLines.slice(-6)]
            });
          } else {
            emit({
              type: "launch-failed",
              title: "O'yin ishga tushmadi",
              items: [
                `O'yin kutilmagan tarzda yopildi (kod: ${code}), lekin sabab haqida hech qanday hisobot topilmadi.`,
                "Videokarta drayverini yangilab, antivirus/xavfsizlik devorida ilovaga ruxsat berib qayta urinib ko'ring."
              ]
            });
          }
        }
      }
      emit({ type: "closed", code });
      return;
    }
    const labels = [...missingIds, ...missingClasspaths.map((c) => c.split(".").pop() ?? c)];
    if (attempts >= MAX_AUTO_FIX_ATTEMPTS) {
      emit({
        type: "launch-failed",
        title: "O'yin ishga tushmadi",
        items: [
          `${MAX_AUTO_FIX_ATTEMPTS} marta avtomatik tuzatishga urinildi, lekin muammo hamon davom etmoqda.`,
          ...labels.map((l) => `"${l}" nomli mod/kutubxona yetishmayapti yoki mos kelmayapti.`)
        ]
      });
      emit({ type: "closed", code });
      return;
    }
    emit({
      type: "autofixing",
      message: `Xatolik aniqlandi: ${labels.join(", ")} yetishmayapti. Avtomatik tuzatilmoqda (${attempts + 1}/${MAX_AUTO_FIX_ATTEMPTS}-urinish)...`,
      attempt: attempts + 1
    });
    void tryAutoFixMissingMods(req, emit, missingIds, missingClasspaths).catch((err) => {
      emit({ type: "warning", message: `Avtomatik tuzatish muvaffaqiyatsiz: ${err instanceof Error ? err.message : String(err)}` });
      emit({ type: "closed", code });
    });
  });
  launcher.on("error", (err) => {
    console.error("[MCLC error]", err);
  });
  emit({ type: "status", message: "Fayllar tekshirilmoqda..." });
  const child = await launcher.launch(opts);
  if (!child) throw new Error("O'yin jarayoni ishga tushmadi (Java o'rnatilganini tekshiring)");
  current = { client: launcher, child };
  emit({ type: "started" });
}
const IRIS_SLUG = "iris";
const OCULUS_SLUG = "oculus";
function installedShaderLoader(loader) {
  const target = loaderSlugFor(loader);
  if (!target) return null;
  try {
    const dir = assetDir("mod");
    if (!fs.existsSync(dir)) return null;
    const prefix = target.slug;
    for (const f of fs.readdirSync(dir)) {
      const n = f.toLowerCase();
      if (!n.endsWith(".jar")) continue;
      if (n.startsWith(prefix)) return target.name;
    }
    return null;
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
  if (installedShaderLoader(loader)) return [];
  const file = await resolveLatestFile(target.slug, mcVersion, loader);
  if (!file) return [];
  const modsDir2 = assetDir("mod");
  const chain = [];
  const seen = /* @__PURE__ */ new Set([target.slug]);
  const deps = await resolveRequiredDependencies(target.slug, mcVersion, seen, loader);
  for (const d of deps) {
    if (fs.existsSync(`${modsDir2}/${d.filename}`)) continue;
    chain.push({ ...d, targetKind: "mod" });
  }
  if (!fs.existsSync(`${modsDir2}/${file.filename}`)) {
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
  const already = installedShaderLoader(loader);
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
function dataPackDir(worldName) {
  const dir = path.join(gameDir(), "saves", safeWorldName(worldName), "datapacks");
  assertInside(path.join(gameDir(), "saves"), dir);
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
  const dir = path.join(gameDir(), KIND_DIRS[kind]);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}
async function downloadOne(kind, url, filename, emit, worldName) {
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
        emit({ type: "progress", filename, percent });
      }
    }
  }
  await fs.promises.writeFile(destPath, Buffer.concat(chunks.map((c) => Buffer.from(c))));
  emit({ type: "done", filename });
}
async function downloadModAsset(req, emit) {
  const { kind, url, filename, modrinthProjectId, gameVersion, loader, worldName } = req;
  if (modrinthProjectId && gameVersion) {
    emit({ type: "status", message: "Bog'liqliklar tekshirilmoqda..." });
    const deps = await resolveAllDependencies(modrinthProjectId, gameVersion, loader, kind);
    const toInstall = pendingDependencies(deps, kind, worldName);
    for (let i = 0; i < toInstall.length; i++) {
      const dep = toInstall[i];
      emit({ type: "status", message: `Bog'liqlik yuklanmoqda: ${dep.name} (${i + 1}/${toInstall.length})` });
      try {
        await downloadOne(dep.targetKind ?? kind, dep.url, dep.filename, emit, worldName);
      } catch (err) {
        emit({
          type: "status",
          message: `Diqqat: "${dep.name}" bog'liqligi yuklanmadi (${err instanceof Error ? err.message : String(err)}), davom etilmoqda...`
        });
      }
    }
    emit({ type: "status", message: "Asosiy mod yuklanmoqda..." });
  }
  await downloadOne(kind, url, filename, emit, worldName);
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
function removeModAsset(kind, filename, worldName) {
  const path2 = assetPath(kind, filename, worldName);
  if (fs.existsSync(path2)) fs.unlinkSync(path2);
}
function listInstalledModAssets() {
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
  const savesDir2 = path.join(gameDir(), "saves");
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
  const dir = path.join(gameDir(), "saves");
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
async function downloadAndInstallMap(req, emit) {
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
      emit({ type: "progress", worldName, percent: Math.round(received / total * 100) });
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
  emit({ type: "done", worldName, finalName });
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
function initAutoUpdater(emit) {
  emitRef = emit;
  electronUpdater.autoUpdater.autoDownload = true;
  electronUpdater.autoUpdater.autoInstallOnAppQuit = true;
  electronUpdater.autoUpdater.requestHeaders = { "Cache-Control": "no-cache" };
  electronUpdater.autoUpdater.on("checking-for-update", () => {
    console.log("[updater] tekshirilmoqda...");
    emit({ type: "checking" });
  });
  electronUpdater.autoUpdater.on("update-available", (info) => {
    console.log("[updater] yangi versiya topildi:", info.version);
    emit({ type: "available", version: info.version });
  });
  electronUpdater.autoUpdater.on("update-not-available", (info) => {
    console.log("[updater] yangilanish yo'q, joriy eng oxirgisi:", info.version);
    emit({ type: "not-available" });
  });
  electronUpdater.autoUpdater.on("download-progress", (p) => emit({ type: "progress", percent: Math.round(p.percent) }));
  electronUpdater.autoUpdater.on("update-downloaded", (info) => {
    console.log("[updater] yuklab bo'ldi:", info.version);
    updateReady = true;
    stopUpdateWatch();
    emit({ type: "downloaded", version: info.version });
  });
  electronUpdater.autoUpdater.on("error", (err) => {
    console.error("[updater] XATO:", err);
    emit({ type: "error", message: err.message });
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
  if (match && match.startsWith("http")) return match;
  return match ? `${UPDATE_BASE_URL}${match}` : "https://site.neoterra.uz/download";
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
function registerIpc(getWindow) {
  const emit = (e) => {
    const win = getWindow();
    win?.webContents.send(IPC.EVENT, e);
    if (e.type === "started") {
      win?.minimize();
    } else if (e.type === "closed" || e.type === "autofixing" || e.type === "launch-failed") {
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
  electron.ipcMain.handle("system:get-news", async () => {
    try {
      const res = await fetch("https://site.neoterra.uz/api/launcher/news");
      if (!res.ok) return { success: false };
      return await res.json();
    } catch (err) {
      return { success: false, error: String(err) };
    }
  });
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
      await launchGame(req, emit);
      return { ok: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      emit({ type: "error", message });
      return { ok: false, error: message };
    }
  });
  electron.ipcMain.handle(IPC.CANCEL, async () => {
    killGame();
    return { ok: true };
  });
  electron.ipcMain.handle(IPC.OPEN_GAME_DIR, async () => {
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
  electron.ipcMain.handle(IPC.OPEN_EXTERNAL, async (_e, url) => {
    try {
      await electron.shell.openExternal(url);
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
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
      if (listInstalledThemes().length === 0) removeUiMod();
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });
  electron.ipcMain.handle(
    IPC.MR_SEARCH_MODS,
    async (_e, offset, gameVersion, query, projectType) => {
      return { ok: true, data: await searchModrinthMods(offset, gameVersion, query, projectType) };
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
    electron.ipcMain.handle("account:get", async () => {
    try {
      const p = path.join(electron.app.getPath("userData"), "neoterra_account.json");
      if (fs.existsSync(p)) {
        return JSON.parse(fs.readFileSync(p, "utf8"));
      }
    } catch (e) {
      console.error("[account:get] error:", e.message);
    }
    return null;
  });
  electron.ipcMain.handle("account:save", async (_e, data) => {
    try {
      const p = path.join(electron.app.getPath("userData"), "neoterra_account.json");
      if (!data) {
        if (fs.existsSync(p)) fs.unlinkSync(p);
      } else {
        fs.mkdirSync(path.dirname(p), { recursive: true });
        fs.writeFileSync(p, JSON.stringify(data, null, 2), "utf8");
      }
      return { ok: true };
    } catch (e) {
      console.error("[account:save] error:", e.message);
      return { ok: false, error: e.message };
    }
  });
  electron.ipcMain.handle("auth:open-web-login", async () => {
    const state = crypto.randomBytes(16).toString("hex");
    const siteBase = process.env.NEOTERRA_SITE_URL || "https://site.neoterra.uz";
    const webUrl = `${siteBase}/launcher/auth?callback=http://127.0.0.1:47823/auth/callback&state=${state}`;
    electron.shell.openExternal(webUrl);
    return { ok: true };
  });
  electron.ipcMain.handle("skin:upload", async (_e, { nickname, token }) => {
    try {
      const cleanNick = (nickname || "").trim().replace(/[^a-zA-Z0-9_]/g, "");
      if (!cleanNick) return { ok: false, error: "O'yinchi niki aniqlanmadi" };

      const win = mainWindow || electron.BrowserWindow.getFocusedWindow();
      const result = await electron.dialog.showOpenDialog(win, {
        title: "Minecraft Skin (.png) tanlang",
        buttonLabel: "Skinni yuklash",
        filters: [{ name: "Minecraft Skin (*.png)", extensions: ["png"] }],
        properties: ["openFile"]
      });

      if (result.canceled || !result.filePaths || result.filePaths.length === 0) {
        return { ok: false, canceled: true };
      }

      const filePath = result.filePaths[0];
      const fileBuffer = fs.readFileSync(filePath);

      if (fileBuffer.length < 100 || fileBuffer[0] !== 0x89 || fileBuffer[1] !== 0x50 || fileBuffer[2] !== 0x4e || fileBuffer[3] !== 0x47) {
        return { ok: false, error: "Fayl haqiqiy PNG formatida emas!" };
      }

      const width = fileBuffer.readUInt32BE(16);
      const height = fileBuffer.readUInt32BE(20);
      if (width !== 64 || (height !== 64 && height !== 32)) {
        return { ok: false, error: `Skin o'lchami 64x64 yoki 64x32 piksel bo'lishi shart! (Hozirgi: ${width}x${height})` };
      }

      const siteBase = (process.env.NEOTERRA_SITE_URL || "https://site.neoterra.uz").replace(/\/$/, "");
      let remoteSkinUrl = null;
      try {
        const uploadUrl = `${siteBase}/api/launcher/skins/upload`;
        const base64Data = fileBuffer.toString("base64");
        const resp = await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nickname: cleanNick, token, skinBase64: `data:image/png;base64,${base64Data}` })
        });
        if (resp.ok) {
          const json = await resp.json();
          if (json.success) {
            remoteSkinUrl = json.fullSkinUrl || json.skinUrl;
          }
        }
      } catch (netErr) {
        console.warn("[Skin Upload] Veb-saytga yuklashda ogohlantirish:", netErr);
      }

      try {
        const cslLocalDir = path.join(gameDir(), "CustomSkinLoader", "LocalSkins", "textures");
        fs.mkdirSync(cslLocalDir, { recursive: true });
        fs.writeFileSync(path.join(cslLocalDir, `${cleanNick.toLowerCase()}.png`), fileBuffer);
      } catch (e) {}

      const previewDataUrl = `data:image/png;base64,${fileBuffer.toString("base64")}`;

      return {
        ok: true,
        skinUrl: remoteSkinUrl || previewDataUrl,
        previewUrl: previewDataUrl,
        width,
        height
      };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });
  electron.app.on("before-quit", () => killGame());
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
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const parsedReq = new URL(req.url ?? "/", "http://127.0.0.1:47823");
      if (parsedReq.pathname === "/auth/callback") {
        const token = parsedReq.searchParams.get("token");
        const nickname = parsedReq.searchParams.get("nickname");
        const email = parsedReq.searchParams.get("email");
        const balance = parsedReq.searchParams.get("balance");
        const uid = parsedReq.searchParams.get("uid");

        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end('<!DOCTYPE html><html><head><meta charset="utf-8"><title>NeoTerra</title></head><body style="background:#070b0e;color:#10b981;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:90vh;"><div style="text-align:center;"><h2 style="font-size:28px;">Muvaffaqiyatli!</h2><p style="color:#9ca3af;font-size:16px;">NeoTerra Launcher\'ga kirdingiz. Ushbu oynani yopishingiz mumkin.</p></div><script>setTimeout(()=>window.close(), 1500);<\/script></body></html>');

        if (mainWindow) {
          if (mainWindow.isMinimized()) mainWindow.restore();
          mainWindow.show();
          mainWindow.focus();
          mainWindow.webContents.send("auth:web-callback", { token, nickname, email, balance, uid });
        }
        return;
      }
      if (parsedReq.pathname.startsWith("/skins/")) {
        const cleanPath = parsedReq.pathname.replace(/^\/skins\//, "");
        if (cleanPath.endsWith(".json")) {
          const nick = cleanPath.replace(/\.json$/i, "").toLowerCase();
          const localSkinPath = path.join(gameDir(), "CustomSkinLoader", "LocalSkins", "textures", `${nick}.png`);
          if (fs.existsSync(localSkinPath)) {
            res.writeHead(200, { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" });
            res.end(JSON.stringify({
              username: nick,
              skins: { default: `http://127.0.0.1:47823/skins/textures/${nick}.png` },
              capes: {}
            }));
            return;
          }
        } else if (cleanPath.endsWith(".png")) {
          const nick = cleanPath.split("/").pop().replace(/\.png$/i, "").toLowerCase();
          const localSkinPath = path.join(gameDir(), "CustomSkinLoader", "LocalSkins", "textures", `${nick}.png`);
          if (fs.existsSync(localSkinPath)) {
            res.writeHead(200, { "Content-Type": "image/png", "Access-Control-Allow-Origin": "*" });
            fs.createReadStream(localSkinPath).pipe(res);
            return;
          }
        }
        res.writeHead(404);
        res.end("Skin not found");
        return;
      }
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
      else reject(new Error("Lokal server porti aniqlanmadi"));
    }
    server.once("error", (err) => {
      if (err.code !== "EADDRINUSE") {
        reject(err);
        return;
      }
      server.removeAllListeners("error");
      server.once("error", reject);
      server.once("listening", onListening);
      server.listen(0, "127.0.0.1");
    });
    server.once("listening", onListening);
    server.listen(FIXED_PORT, "127.0.0.1");
  });
}
electron.app.commandLine.appendSwitch("autoplay-policy", "no-user-gesture-required");
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
      webSecurity: false,
      preload: path.join(__dirname, "../preload/index.js"),
      sandbox: false,
      // Xavfsizlik: renderer'da Node yo'q, hamma narsa preload orqali
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  mainWindow.on("ready-to-show", () => mainWindow?.show());
  mainWindow.on("closed", () => mainWindow = null);
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    electron.shell.openExternal(url);
    return { action: "deny" };
  });
  if (utils.is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    const port = await startRendererServer(path.join(__dirname, "../renderer"));
    mainWindow.loadURL(`http://127.0.0.1:${port}/index.html`);
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
    createWindow();
    electron.app.on("activate", () => {
      if (electron.BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  });
  electron.app.on("window-all-closed", () => {
    if (process.platform !== "darwin") electron.app.quit();
  });
}

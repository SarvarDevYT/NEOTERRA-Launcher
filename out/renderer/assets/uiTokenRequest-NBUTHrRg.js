import { c as createLucideIcon } from "./x-D_GsiFEI.js";
/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M12 12v-2", key: "fwoke6" }],
  ["path", { d: "M12 18v-2", key: "qj6yno" }],
  ["path", { d: "M16 12v-2", key: "heuere" }],
  ["path", { d: "M16 18v-2", key: "s1ct0w" }],
  ["path", { d: "M2 11h1.5", key: "15p63e" }],
  ["path", { d: "M20 18v-2", key: "12ehxp" }],
  ["path", { d: "M20.5 11H22", key: "khsy7a" }],
  ["path", { d: "M4 18v-2", key: "1c3oqr" }],
  ["path", { d: "M8 12v-2", key: "1mwtfd" }],
  ["path", { d: "M8 18v-2", key: "qcmpov" }],
  ["rect", { x: "2", y: "6", width: "20", height: "10", rx: "2", key: "1qcswk" }]
];
const MemoryStick = createLucideIcon("memory-stick", __iconNode$3);
/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
      key: "10ikf1"
    }
  ]
];
const Play = createLucideIcon("play", __iconNode$2);
/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
      key: "1i5ecw"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Settings = createLucideIcon("settings", __iconNode$1);
/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
      key: "1s2grr"
    }
  ],
  ["path", { d: "M20 2v4", key: "1rf3ol" }],
  ["path", { d: "M22 4h-4", key: "gwowj6" }],
  ["circle", { cx: "4", cy: "20", r: "2", key: "6kqj1y" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode);
const scriptRel = function detectScriptRel() {
  const relList = typeof document !== "undefined" && document.createElement("link").relList;
  return relList && relList.supports && relList.supports("modulepreload") ? "modulepreload" : "preload";
}();
const assetsURL = function(dep, importerUrl) {
  return new URL(dep, importerUrl).href;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  let promise = Promise.resolve();
  if (deps && deps.length > 0) {
    const links = document.getElementsByTagName("link");
    const cspNonceMeta = document.querySelector(
      "meta[property=csp-nonce]"
    );
    const cspNonce = cspNonceMeta?.nonce || cspNonceMeta?.getAttribute("nonce");
    promise = Promise.allSettled(
      deps.map((dep) => {
        dep = assetsURL(dep, importerUrl);
        if (dep in seen) return;
        seen[dep] = true;
        const isCss = dep.endsWith(".css");
        const cssSelector = isCss ? '[rel="stylesheet"]' : "";
        const isBaseRelative = !!importerUrl;
        if (isBaseRelative) {
          for (let i = links.length - 1; i >= 0; i--) {
            const link2 = links[i];
            if (link2.href === dep && (!isCss || link2.rel === "stylesheet")) {
              return;
            }
          }
        } else if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
          return;
        }
        const link = document.createElement("link");
        link.rel = isCss ? "stylesheet" : scriptRel;
        if (!isCss) {
          link.as = "script";
        }
        link.crossOrigin = "";
        link.href = dep;
        if (cspNonce) {
          link.setAttribute("nonce", cspNonce);
        }
        document.head.appendChild(link);
        if (isCss) {
          return new Promise((res, rej) => {
            link.addEventListener("load", res);
            link.addEventListener(
              "error",
              () => rej(new Error(`Unable to preload CSS for ${dep}`))
            );
          });
        }
      })
    );
  }
  function handlePreloadError(err) {
    const e = new Event("vite:preloadError", {
      cancelable: true
    });
    e.payload = err;
    window.dispatchEvent(e);
    if (!e.defaultPrevented) {
      throw err;
    }
  }
  return promise.then((res) => {
    for (const item of res || []) {
      if (item.status !== "rejected") continue;
      handlePreloadError(item.reason);
    }
    return baseModule().catch(handlePreloadError);
  });
};
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
function keyFromCode(code) {
  if (/^Key[A-Z]$/.test(code)) return code.slice(3);
  if (/^Digit\d$/.test(code)) return code.slice(5);
  if (/^F([1-9]|1\d|2[0-4])$/.test(code)) return code;
  if (/^Numpad\d$/.test(code)) return `num${code.slice(6)}`;
  const map = {
    Space: "Space",
    Tab: "Tab",
    Backspace: "Backspace",
    Delete: "Delete",
    Insert: "Insert",
    Home: "Home",
    End: "End",
    PageUp: "PageUp",
    PageDown: "PageDown",
    ArrowUp: "Up",
    ArrowDown: "Down",
    ArrowLeft: "Left",
    ArrowRight: "Right",
    Enter: "Enter",
    NumpadEnter: "Enter",
    NumpadAdd: "numadd",
    NumpadSubtract: "numsub",
    NumpadMultiply: "nummult",
    NumpadDivide: "numdiv",
    NumpadDecimal: "numdec",
    Minus: "-",
    Equal: "=",
    BracketLeft: "[",
    BracketRight: "]",
    Backslash: "\\",
    Semicolon: ";",
    Quote: "'",
    Comma: ",",
    Period: ".",
    Slash: "/",
    Backquote: "`"
  };
  return map[code] ?? null;
}
async function requestUiLaunchToken(client, nick) {
  try {
    const { data, error } = await client.functions.invoke("launch-token", {
      body: { nick }
    });
    if (error) {
      console.warn("[uiToken] token olinmadi:", error.message);
      return null;
    }
    return typeof data?.token === "string" ? data.token : null;
  } catch (err) {
    console.warn("[uiToken] token olinmadi:", err);
    return null;
  }
}
export {
  DEFAULT_MASCOT_HOTKEY as D,
  MemoryStick as M,
  Play as P,
  Sparkles as S,
  __vitePreload as _,
  Settings as a,
  formatMascotHotkey as f,
  keyFromCode as k,
  parseMascotHotkey as p,
  requestUiLaunchToken as r
};

import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, X } from "./x-D_GsiFEI.js";
import { s as supabase, u as useLanguage, t as tokens, b as useToast, P as ProChip, C as Crown, a_ as Ellipsis, a$ as Copy, x as useAuth, F as FullScreenPage, L as LoaderCircle, aM as TriangleAlert, j as Send, b0 as LogIn, b1 as FlatBackdrop } from "./index-BgnzSiMf.js";
import { S as Sparkles } from "./uiTokenRequest-NBUTHrRg.js";
import { S as Shield, P as Pencil } from "./shield-DfuYzzeT.js";
import { C as Check, T as Trash2 } from "./trash-2-Djh6nQ-0.js";
import "./index-DZI2mFQS.js";
/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M12 5v14", key: "s699le" }],
  ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
];
const ArrowDown = createLucideIcon("arrow-down", __iconNode$2);
/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M20 20v-7a4 4 0 0 0-4-4H4", key: "1nkjon" }],
  ["path", { d: "M9 14 4 9l5-5", key: "102s5s" }]
];
const CornerUpLeft = createLucideIcon("corner-up-left", __iconNode$1);
/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M15 10V9", key: "4dkmfx" }],
  ["path", { d: "M16.472 15a6 6 0 01-8.943 0", key: "7qomzy" }],
  ["path", { d: "M9 10V9", key: "1lazqi" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
];
const FaceSlightlySmiling = createLucideIcon("face-slightly-smiling", __iconNode);
const CHAT_RETENTION_DAYS = 5;
const CHAT_MAX_LENGTH = 2e3;
const CHAT_PAGE_SIZE = 50;
const VIEW_COLUMNS = "id, author_id, body, reply_to, created_at, edited_at, author_username, author_avatar_url, author_premium, author_is_creator, author_club, author_level, reply_body, reply_author_id, reply_author_username, author_pro";
const VIEW_COLUMNS_LEGACY = "id, author_id, body, reply_to, created_at, edited_at, author_username, author_avatar_url, author_premium, author_is_creator, author_club, author_level, reply_body, reply_author_id, reply_author_username";
function isMissingAuthorPro(error) {
  return !!error && error.code === "42703" && /author_pro/i.test(error.message ?? "");
}
function withProDefault(rows) {
  return rows.map((m) => m.author_pro === void 0 ? { ...m, author_pro: false } : m);
}
async function selectMessages(build) {
  let { data, error } = await build(VIEW_COLUMNS);
  if (error && isMissingAuthorPro(error)) {
    ({ data, error } = await build(VIEW_COLUMNS_LEGACY));
  }
  if (error) throw chatError(error);
  return withProDefault(data ?? []);
}
function retentionCutoffIso() {
  return new Date(Date.now() - CHAT_RETENTION_DAYS * 24 * 60 * 60 * 1e3).toISOString();
}
function chatError(error) {
  const code = error.code ?? "";
  const m = error.message.toLowerCase();
  if (error.message.includes("CHAT_BLOCKED")) {
    return new Error("Xabarda nomaqbul so'z yoki taqiqlangan havola bor");
  }
  if (code === "23514") return new Error("Xabar bo'sh yoki juda uzun");
  if (code === "42501" || m.includes("row-level security") || m.includes("policy")) {
    return new Error("Bunga ruxsatingiz yo'q");
  }
  if (m.includes("failed to fetch") || m.includes("network")) {
    return new Error("Internetga ulanib bo'lmadi. Aloqani tekshiring");
  }
  return new Error(error.message);
}
async function fetchLatestMessages() {
  const rows = await selectMessages(
    (columns) => supabase.from("chat_messages_public").select(columns).gte("created_at", retentionCutoffIso()).order("id", { ascending: false }).limit(CHAT_PAGE_SIZE)
  );
  return rows.reverse();
}
async function fetchOlderMessages(beforeId) {
  const rows = await selectMessages(
    (columns) => supabase.from("chat_messages_public").select(columns).gte("created_at", retentionCutoffIso()).lt("id", beforeId).order("id", { ascending: false }).limit(CHAT_PAGE_SIZE)
  );
  return rows.reverse();
}
async function fetchMessageById(id) {
  const rows = await selectMessages((columns) => supabase.from("chat_messages_public").select(columns).eq("id", id).limit(1));
  return rows[0] ?? null;
}
async function sendMessage(authorId, body, replyTo) {
  const { data, error } = await supabase.from("chat_messages").insert({ author_id: authorId, body, reply_to: replyTo }).select("id").single();
  if (error) throw chatError(error);
  const full = await fetchMessageById(data.id);
  if (!full) throw new Error("Xabar yuborildi, lekin qayta o'qib bo'lmadi");
  return full;
}
async function editMessage(id, body) {
  const { error } = await supabase.from("chat_messages").update({ body }).eq("id", id);
  if (error) throw chatError(error);
  const full = await fetchMessageById(id);
  if (!full) throw new Error("Tahrirlangan xabarni o'qib bo'lmadi");
  return full;
}
async function deleteMessage(id) {
  const { error } = await supabase.from("chat_messages").delete().eq("id", id);
  if (error) throw chatError(error);
}
function subscribeToChat(handlers) {
  let stopped = false;
  let channel = null;
  let retryTimer = null;
  let retryDelay = 1e3;
  function attach() {
    return supabase.channel("mcmodhub-chat").on("postgres_changes", { event: "INSERT", schema: "public", table: "chat_messages" }, (payload) => {
      const row = payload.new;
      if (typeof row.id === "number") handlers.onInsert(row.id);
    }).on("postgres_changes", { event: "UPDATE", schema: "public", table: "chat_messages" }, (payload) => {
      const row = payload.new;
      if (typeof row.id === "number" && typeof row.body === "string") {
        handlers.onUpdate({ id: row.id, body: row.body, edited_at: row.edited_at ?? null });
      }
    }).on("postgres_changes", { event: "DELETE", schema: "public", table: "chat_messages" }, (payload) => {
      const row = payload.old;
      if (typeof row.id === "number") handlers.onDelete(row.id);
    });
  }
  function reconnectSoon() {
    if (stopped || retryTimer) return;
    const delay = retryDelay;
    retryDelay = Math.min(retryDelay * 2, 3e4);
    retryTimer = setTimeout(() => {
      retryTimer = null;
      connect();
    }, delay);
  }
  function connect() {
    if (stopped) return;
    if (channel) void supabase.removeChannel(channel);
    channel = attach().subscribe((status) => {
      if (stopped) return;
      if (status === "SUBSCRIBED") {
        retryDelay = 1e3;
        handlers.onStatus?.(true);
        return;
      }
      if (status === "CHANNEL_ERROR" || status === "TIMED_OUT" || status === "CLOSED") {
        handlers.onStatus?.(false);
        reconnectSoon();
      }
    });
  }
  const handleOnline = () => {
    if (retryTimer) {
      clearTimeout(retryTimer);
      retryTimer = null;
    }
    retryDelay = 1e3;
    connect();
  };
  window.addEventListener("online", handleOnline);
  connect();
  return () => {
    stopped = true;
    window.removeEventListener("online", handleOnline);
    if (retryTimer) clearTimeout(retryTimer);
    if (channel) void supabase.removeChannel(channel);
  };
}
const PURGE_THROTTLE_KEY = "mcmodhub_chat_purge_at";
const PURGE_INTERVAL_MS = 12 * 60 * 60 * 1e3;
function purgeExpiredMessagesInBackground() {
  let last = 0;
  try {
    last = Number(localStorage.getItem(PURGE_THROTTLE_KEY) ?? 0);
  } catch {
  }
  if (Date.now() - last < PURGE_INTERVAL_MS) return;
  try {
    localStorage.setItem(PURGE_THROTTLE_KEY, String(Date.now()));
  } catch {
  }
  void supabase.rpc("purge_old_chat_messages").then(
    () => {
    },
    () => {
    }
  );
}
function normalize(text) {
  const leet = {
    "0": "o",
    "1": "i",
    "3": "e",
    "4": "a",
    "5": "s",
    "6": "b",
    "7": "t",
    "8": "b",
    "@": "a",
    $: "s",
    "!": "i",
    "|": "i",
    "*": "",
    "+": "t"
  };
  const lower = text.toLowerCase();
  let out = "";
  for (const ch of lower) out += leet[ch] ?? ch;
  out = out.replace(/(.)\1{2,}/g, "$1");
  return out;
}
function squeeze(text) {
  return normalize(text).replace(/[^a-zа-яё]/g, "");
}
const EXACT_WORDS = [
  // o'zbekcha
  "sik",
  "siktir",
  "sikay",
  "sikaman",
  "sikdim",
  "sikib",
  "sikish",
  "sikishish",
  "qotoq",
  "kotoq",
  "qutoq",
  "jalab",
  "jalap",
  "ambop",
  "amcik",
  "haromi",
  "padarlanat",
  "gandon",
  "dalbayob",
  "dalbaeb",
  "dalbayeb",
  // ATAYIN yo'q: 'kot', 'nasli', 'padar', 'onangni', 'enangni' - bular butunlay oddiy
  // gaplarda ham uchraydi ("nasli toza", "onangni ko'rdingmi?"). Ularni taqiqlash
  // begunoh xabarlarni to'sib qo'yardi, bu esa so'kinishni o'tkazib yuborishdan battar.
  // ruscha
  "blya",
  "blyad",
  "blyat",
  "suka",
  "suki",
  "sukin",
  "mudak",
  "mudila",
  "pidor",
  "pidar",
  "gondon",
  "shlyuha",
  "shluha",
  "zalupa",
  "drochit",
  "ebal",
  "ebat",
  "eban",
  "eblan",
  "бля",
  "блядь",
  "блят",
  "сука",
  "суки",
  "сучка",
  "мудак",
  "мудила",
  "пидор",
  "пидар",
  "гандон",
  "шлюха",
  "залупа",
  "дрочить",
  "ебал",
  "ебать",
  "ебан",
  "еблан",
  "хер",
  // inglizcha
  "fuck",
  "fucks",
  "fucked",
  "fucking",
  "fck",
  "shit",
  "bitch",
  "cunt",
  "dick",
  "cock",
  "pussy",
  "whore",
  "slut",
  "bastard",
  "wank",
  "jerkoff",
  "nigger",
  "nigga",
  "faggot",
  // 18+ atamalar
  "porn",
  "porno",
  "pornp",
  "hentai",
  "nude",
  "nudes",
  "seks",
  "sexy",
  "sex",
  "anal",
  "milf",
  "orgasm",
  "blowjob",
  "creampie",
  "escort",
  "camgirl",
  "stripchat",
  "порно",
  "порнуха",
  "секс",
  "голые",
  "эротика",
  "интим",
  "проститутка"
];
const CONTAINS_WORDS = [
  "motherfuck",
  "pornhub",
  "xvideos",
  "xnxx",
  "redtube",
  "youporn",
  "brazzers",
  "onlyfans",
  "chaturbate",
  "xhamster",
  "spankbang",
  "nhentai",
  "rule34",
  "fapello",
  "bongacams",
  "livejasmin",
  "camsoda",
  "myfreecams",
  "hqporner",
  "tnaflix",
  "pornolab",
  "porno365",
  "sikishish",
  "sikishgan",
  "jalablik",
  "ебать",
  "ебал",
  "хуйн",
  "хуев",
  "хуёв",
  "пизде",
  "пизда",
  "пизды",
  "пиздец",
  "huyn",
  "pizdes",
  "pizdet"
];
const IP_OCTET = "(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)";
const IP_DOT = "(?:\\.|\\s+\\.\\s+|\\[\\.\\]|\\(\\.\\)|\\{\\.\\}|\\s+\\b(?:dot|nuqta|tochka)\\b\\s+)";
const IPV4_RE = new RegExp(`(?<![\\d.])${IP_OCTET}(?:${IP_DOT}${IP_OCTET}){3}(?!\\d)`, "i");
const HOST_PORT_RE = /(?<![a-z0-9._-])(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}:\d{4,5}(?!\d)/i;
function findServerAddress(text) {
  const m = IPV4_RE.exec(text) ?? HOST_PORT_RE.exec(text);
  return m ? m[0].trim() : null;
}
function containsServerAddress(text) {
  return findServerAddress(text) !== null;
}
function hasBannedWord(text) {
  const norm = normalize(text);
  const tokens2 = norm.split(/[^a-zа-яё]+/).filter(Boolean);
  for (const w of EXACT_WORDS) {
    if (tokens2.includes(w)) return w;
  }
  const sq = squeeze(text);
  for (const w of CONTAINS_WORDS) {
    if (norm.includes(w) || sq.includes(w)) return w;
  }
  const runs = [];
  let run = [];
  for (const tk of tokens2) {
    if (tk.length === 1) {
      run.push(tk);
    } else {
      if (run.length >= 3) runs.push(run.join(""));
      run = [];
    }
  }
  if (run.length >= 3) runs.push(run.join(""));
  for (const joined of runs) {
    for (const w of EXACT_WORDS) if (joined.includes(w)) return w;
    for (const w of CONTAINS_WORDS) if (joined.includes(w)) return w;
  }
  return null;
}
const LINK_RE = /(https?:\/\/[^\s<>"']+|www\.[^\s<>"']+|(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:uz|com|net|org|ru|io|dev|app|me|tv|gg|info|edu|gov|xyz|online|site|shop|club|pro|biz)(?:\/[^\s<>"']*)?)/gi;
function trimTrailing(url) {
  return url.replace(/[.,!?;:)\]}»"']+$/, "");
}
function splitLinks(text) {
  const parts = [];
  let last = 0;
  for (const m of text.matchAll(new RegExp(LINK_RE))) {
    const start = m.index ?? 0;
    const raw = m[0];
    const clean = trimTrailing(raw);
    if (start > last) parts.push({ type: "text", value: text.slice(last, start) });
    parts.push({ type: "link", value: clean });
    if (clean.length < raw.length) parts.push({ type: "text", value: raw.slice(clean.length) });
    last = start + raw.length;
  }
  if (last < text.length) parts.push({ type: "text", value: text.slice(last) });
  return parts;
}
function containsLink(text) {
  return splitLinks(text).some((p) => p.type === "link");
}
function containsAd(text) {
  return containsServerAddress(text) || containsLink(text);
}
function checkMessage(text) {
  const word = hasBannedWord(text);
  if (word) return { ok: false, reason: "profanity", match: word };
  const address = findServerAddress(text);
  if (address) return { ok: false, reason: "serverAd", match: address };
  const link = splitLinks(text).find((p) => p.type === "link");
  if (link) return { ok: false, reason: "link", match: link.value };
  return { ok: true };
}
const EMOJI_CATEGORIES = [
  {
    id: "smileys",
    icon: "😀",
    items: [
      "😀",
      "😃",
      "😄",
      "😁",
      "😆",
      "😅",
      "😂",
      "🤣",
      "🙂",
      "🙃",
      "😉",
      "😊",
      "😇",
      "🥰",
      "😍",
      "🤩",
      "😘",
      "😗",
      "😚",
      "😙",
      "😋",
      "😛",
      "😜",
      "🤪",
      "😝",
      "🤑",
      "🤗",
      "🤭",
      "🤫",
      "🤔",
      "🤐",
      "🤨",
      "😐",
      "😑",
      "😶",
      "😏",
      "😒",
      "🙄",
      "😬",
      "😔",
      "😪",
      "🤤",
      "😴",
      "😷",
      "🤒",
      "🤕",
      "🤢",
      "🤮",
      "🥵",
      "🥶",
      "😵",
      "🤯",
      "🤠",
      "🥳",
      "😎",
      "🤓",
      "🧐",
      "😕",
      "😟",
      "🙁",
      "😮",
      "😯",
      "😲",
      "😳",
      "🥺",
      "😦",
      "😧",
      "😨",
      "😰",
      "😥",
      "😢",
      "😭",
      "😱",
      "😖",
      "😣",
      "😞",
      "😓",
      "😩",
      "😫",
      "🥱",
      "😤",
      "😡",
      "😠",
      "🤬",
      "😈",
      "👿",
      "💀",
      "👻",
      "👽",
      "🤖"
    ]
  },
  {
    id: "gestures",
    icon: "👍",
    items: [
      "👍",
      "👎",
      "👌",
      "🤌",
      "🤏",
      "✌️",
      "🤞",
      "🤟",
      "🤘",
      "🤙",
      "👈",
      "👉",
      "👆",
      "👇",
      "☝️",
      "✋",
      "🤚",
      "🖐️",
      "🖖",
      "👋",
      "🤝",
      "🙏",
      "✍️",
      "💪",
      "🦾",
      "👏",
      "🙌",
      "👐",
      "🤲",
      "🫶",
      "👀",
      "👁️",
      "👄",
      "🧠",
      "🦵",
      "🦶",
      "👂",
      "👃",
      "🤳",
      "💅"
    ]
  },
  {
    id: "hearts",
    icon: "❤️",
    items: [
      "❤️",
      "🧡",
      "💛",
      "💚",
      "💙",
      "💜",
      "🖤",
      "🤍",
      "🤎",
      "💔",
      "❣️",
      "💕",
      "💞",
      "💓",
      "💗",
      "💖",
      "💘",
      "💝",
      "💟",
      "♥️",
      "💯",
      "💢",
      "💥",
      "💫",
      "💦",
      "💨",
      "🕳️",
      "💬",
      "💭",
      "💤"
    ]
  },
  {
    id: "animals",
    icon: "🐶",
    items: [
      "🐶",
      "🐱",
      "🐭",
      "🐹",
      "🐰",
      "🦊",
      "🐻",
      "🐼",
      "🐨",
      "🐯",
      "🦁",
      "🐮",
      "🐷",
      "🐸",
      "🐵",
      "🙈",
      "🙉",
      "🙊",
      "🐔",
      "🐧",
      "🐦",
      "🐤",
      "🦆",
      "🦅",
      "🦉",
      "🐺",
      "🐗",
      "🐴",
      "🦄",
      "🐝",
      "🐛",
      "🦋",
      "🐌",
      "🐞",
      "🐢",
      "🐍",
      "🦖",
      "🐙",
      "🦑",
      "🦈",
      "🐬",
      "🐳",
      "🐟",
      "🦐",
      "🐊",
      "🐅",
      "🐆",
      "🦓",
      "🦍",
      "🐘"
    ]
  },
  {
    id: "food",
    icon: "🍕",
    items: [
      "🍏",
      "🍎",
      "🍐",
      "🍊",
      "🍋",
      "🍌",
      "🍉",
      "🍇",
      "🍓",
      "🍈",
      "🍒",
      "🍑",
      "🥭",
      "🍍",
      "🥥",
      "🥝",
      "🍅",
      "🥑",
      "🍆",
      "🥔",
      "🥕",
      "🌽",
      "🌶️",
      "🥒",
      "🥬",
      "🧄",
      "🧅",
      "🍞",
      "🥐",
      "🥖",
      "🧀",
      "🥚",
      "🍳",
      "🥞",
      "🥓",
      "🍔",
      "🍟",
      "🍕",
      "🌭",
      "🥪",
      "🌮",
      "🌯",
      "🥗",
      "🍝",
      "🍜",
      "🍲",
      "🍣",
      "🍱",
      "🍚",
      "🍛",
      "🍦",
      "🍩",
      "🍪",
      "🎂",
      "🍰",
      "🍫",
      "🍬",
      "🍭",
      "☕",
      "🍵",
      "🧃",
      "🥤",
      "🧊",
      "🍯",
      "🥛",
      "🍺",
      "🍷",
      "🥂"
    ]
  },
  {
    id: "activity",
    icon: "⚽",
    items: [
      "⚽",
      "🏀",
      "🏈",
      "⚾",
      "🎾",
      "🏐",
      "🏉",
      "🎱",
      "🏓",
      "🏸",
      "🥅",
      "🏒",
      "🏑",
      "🥊",
      "🥋",
      "⛳",
      "🏹",
      "🎣",
      "🤿",
      "🎽",
      "🛹",
      "🛼",
      "🎿",
      "⛷️",
      "🏂",
      "🏋️",
      "🤸",
      "🤺",
      "⛹️",
      "🏇",
      "🎮",
      "🕹️",
      "🎲",
      "♟️",
      "🎯",
      "🎳",
      "🎰",
      "🧩",
      "🎨",
      "🎤",
      "🎧",
      "🎼",
      "🎹",
      "🥁",
      "🎷",
      "🎺",
      "🎸",
      "🎻",
      "🎬",
      "🏆",
      "🥇",
      "🥈",
      "🥉",
      "🎖️",
      "🏅",
      "🎗️",
      "🎫",
      "🎪"
    ]
  },
  {
    id: "objects",
    icon: "💻",
    items: [
      "💻",
      "🖥️",
      "⌨️",
      "🖱️",
      "🖨️",
      "📱",
      "☎️",
      "📞",
      "📟",
      "📠",
      "🔋",
      "🔌",
      "💡",
      "🔦",
      "🕯️",
      "📷",
      "📸",
      "📹",
      "📼",
      "💿",
      "💾",
      "💽",
      "📀",
      "🎥",
      "📺",
      "📻",
      "⏰",
      "⌚",
      "⏳",
      "⌛",
      "📡",
      "🔍",
      "🔎",
      "🔒",
      "🔓",
      "🔑",
      "🗝️",
      "🔨",
      "⛏️",
      "🪓",
      "⚒️",
      "🛠️",
      "⚙️",
      "🧰",
      "🧲",
      "🔧",
      "🔩",
      "🧪",
      "🧬",
      "🔬",
      "📚",
      "📖",
      "📝",
      "✏️",
      "📌",
      "📎",
      "📁",
      "📅",
      "💰",
      "💎",
      "🎁",
      "🎈",
      "🎉",
      "🎊",
      "✉️",
      "📦",
      "🗑️",
      "🛒"
    ]
  },
  {
    id: "symbols",
    icon: "✅",
    items: [
      "✅",
      "❌",
      "❎",
      "➕",
      "➖",
      "➗",
      "✖️",
      "♾️",
      "❓",
      "❔",
      "❗",
      "❕",
      "‼️",
      "⁉️",
      "⭐",
      "🌟",
      "✨",
      "⚡",
      "🔥",
      "🌈",
      "☀️",
      "🌤️",
      "⛅",
      "☁️",
      "🌧️",
      "⛈️",
      "❄️",
      "⛄",
      "🌊",
      "🌍",
      "🌙",
      "🪐",
      "🚀",
      "🛸",
      "⚠️",
      "🚫",
      "⛔",
      "📛",
      "🔰",
      "♻️",
      "🔔",
      "🔕",
      "🎵",
      "🎶",
      "➡️",
      "⬅️",
      "⬆️",
      "⬇️",
      "🔄",
      "🔝",
      "🆗",
      "🆕",
      "🆒",
      "🔴",
      "🟠",
      "🟡",
      "🟢",
      "🔵",
      "🟣",
      "⚫",
      "⚪",
      "🟥",
      "🟧",
      "🟨",
      "🟩",
      "🟦",
      "🟪",
      "⬛",
      "⬜",
      "🔶"
    ]
  }
];
const RECENT_KEY = "mcmodhub_chat_recent_emoji";
const RECENT_LIMIT = 24;
function loadRecent() {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((e) => typeof e === "string").slice(0, RECENT_LIMIT);
  } catch {
    return [];
  }
}
function rememberEmoji(emoji) {
  try {
    const next = [emoji, ...loadRecent().filter((e) => e !== emoji)].slice(0, RECENT_LIMIT);
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  } catch {
  }
}
function EmojiPicker({ onPick, onClose }) {
  const { t } = useLanguage();
  const [category, setCategory] = reactExports.useState(0);
  const [recent, setRecent] = reactExports.useState(loadRecent);
  const rootRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    function onPointerDown(e) {
      if (!rootRef.current?.contains(e.target)) onClose();
    }
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    const timer = setTimeout(() => document.addEventListener("mousedown", onPointerDown), 0);
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);
  function pick(emoji) {
    rememberEmoji(emoji);
    setRecent(loadRecent());
    onPick(emoji);
  }
  const active = EMOJI_CATEGORIES[category];
  const showRecent = category === 0 && recent.length > 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref: rootRef,
      className: "absolute bottom-full left-0 z-40 mb-2 w-[clamp(320px,29vw,480px)] overflow-hidden rounded-[14px] shadow-2xl",
      style: { background: "#0A0D0C", border: `1px solid ${tokens.hairline}` },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-0.5 px-2 pt-2", style: { borderBottom: `1px solid ${tokens.hairline}` }, children: EMOJI_CATEGORIES.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setCategory(i),
            title: t(`chat.emojiCategories.${c.id}`),
            className: "relative grid h-8 flex-1 place-items-center rounded-t-[8px] text-[clamp(16px,1.455vw,24px)] transition hover:bg-white/[.06]",
            style: { opacity: category === i ? 1 : 0.55 },
            children: [
              c.icon,
              category === i && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-x-1 -bottom-[1px] h-[2px] rounded-full", style: { background: tokens.emeraldNav } })
            ]
          },
          c.id
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "no-scrollbar max-h-[clamp(236px,21.5vw,354px)] overflow-y-auto p-2", children: [
          showRecent && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-1 pb-1 pt-0.5 text-[clamp(10.5px,0.955vw,15.75px)] font-semibold uppercase tracking-wide", style: { color: tokens.textDim }, children: t("chat.emoji") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-8 gap-0.5 pb-2", children: recent.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => pick(e),
                className: "grid h-8 place-items-center rounded-[7px] text-[clamp(19px,1.727vw,28.5px)] leading-none transition hover:bg-white/[.08]",
                children: e
              },
              `recent-${e}-${i}`
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-1.5 h-px", style: { background: tokens.hairline } })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-8 gap-0.5", children: active.items.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => pick(e),
              className: "grid h-8 place-items-center rounded-[7px] text-[clamp(19px,1.727vw,28.5px)] leading-none transition hover:bg-white/[.08]",
              children: e
            },
            `${active.id}-${e}-${i}`
          )) })
        ] })
      ]
    }
  );
}
const COLLAPSE_CHARS = 600;
const COLLAPSE_LINES = 12;
const COLLAPSED_MAX_HEIGHT = 200;
function shouldCollapse(body) {
  if (body.length > COLLAPSE_CHARS) return true;
  let lines = 1;
  for (const ch of body) if (ch === "\n") lines++;
  return lines > COLLAPSE_LINES;
}
const AVATAR_COLORS = ["#2E8B57", "#3E7BB6", "#8A5FBF", "#C4614F", "#C08A2E", "#2F8F8A", "#B0567F", "#5E7C3E"];
function avatarColor(id) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = h * 31 + id.charCodeAt(i) >>> 0;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}
function initial(name) {
  const c = (name ?? "?").trim().charAt(0);
  return c ? c.toUpperCase() : "?";
}
function formatTime(iso) {
  const d = new Date(iso);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}
function MessageBubble({
  message,
  isOwn,
  isAdmin,
  grouped,
  canAct,
  highlighted,
  onReply,
  onSaveEdit,
  onDelete,
  onOpenProfile,
  onJumpToReply
}) {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const [menuOpen, setMenuOpen] = reactExports.useState(false);
  const [dropUp, setDropUp] = reactExports.useState(false);
  const [expanded, setExpanded] = reactExports.useState(false);
  const [editing, setEditing] = reactExports.useState(false);
  const [draft, setDraft] = reactExports.useState(message.body);
  const [saving, setSaving] = reactExports.useState(false);
  const [copied, setCopied] = reactExports.useState(false);
  const menuRef = reactExports.useRef(null);
  const editRef = reactExports.useRef(null);
  const lastBlockedToastRef = reactExports.useRef(0);
  function guardedSetDraft(next) {
    if (containsAd(next)) {
      const now = Date.now();
      if (now - lastBlockedToastRef.current > 2500) {
        lastBlockedToastRef.current = now;
        showToast({ kind: "error", title: t("chat.blockedLink") });
      }
      return;
    }
    setDraft(next);
  }
  const adHidden = containsAd(message.body);
  const collapsible = !adHidden && shouldCollapse(message.body);
  const name = message.author_username ?? t("chat.unknownUser");
  reactExports.useEffect(() => {
    if (!menuOpen) return;
    function onDown(e) {
      if (!menuRef.current?.contains(e.target)) setMenuOpen(false);
    }
    const timer = setTimeout(() => document.addEventListener("mousedown", onDown), 0);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", onDown);
    };
  }, [menuOpen]);
  reactExports.useLayoutEffect(() => {
    if (!menuOpen) return;
    const anchor = menuRef.current;
    if (!anchor) return;
    const itemCount = 2 + (isOwn ? 1 : 0) + (isOwn || isAdmin ? 1 : 0);
    const menuHeight = itemCount * 33 + 8;
    const rect = anchor.getBoundingClientRect();
    const scroller = anchor.closest("[data-chat-scroll]");
    const limit = scroller ? scroller.getBoundingClientRect().bottom : window.innerHeight;
    setDropUp(rect.bottom + menuHeight > limit);
  }, [menuOpen, isOwn, isAdmin]);
  reactExports.useLayoutEffect(() => {
    if (!editing) return;
    const el = editRef.current;
    if (!el) return;
    el.focus();
    el.setSelectionRange(el.value.length, el.value.length);
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 220)}px`;
  }, [editing]);
  reactExports.useEffect(() => {
    if (!editing) setDraft(message.body);
  }, [message.body, editing]);
  async function saveEdit() {
    const next = draft;
    if (!next.trim() || next === message.body) {
      setEditing(false);
      setDraft(message.body);
      return;
    }
    setSaving(true);
    try {
      await onSaveEdit(message.id, next);
      setEditing(false);
    } catch {
    } finally {
      setSaving(false);
    }
  }
  function copyBody() {
    void navigator.clipboard.writeText(message.body).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1400);
      },
      () => {
      }
    );
  }
  const pro = message.author_pro === true;
  const [sweep] = reactExports.useState(() => pro && Date.now() - new Date(message.created_at).getTime() < 15e3);
  const bubbleBg = pro ? "linear-gradient(135deg, rgba(250,204,21,.16), rgba(70,46,6,.48) 55%, rgba(8,12,11,.6))" : isOwn ? "rgba(33,180,94,.14)" : "rgba(8,12,11,.55)";
  const bubbleBorder = pro ? "rgba(250,204,21,.45)" : isOwn ? "rgba(46,204,113,.28)" : tokens.hairline;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-message-id": message.id,
      className: `group flex gap-2.5 px-1 ${isOwn ? "flex-row-reverse" : "flex-row"} ${grouped ? "mt-0.5" : "mt-3"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[clamp(32px,2.9vw,48px)] shrink-0", children: !grouped && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            disabled: !message.author_username,
            onClick: () => message.author_username && onOpenProfile(message.author_username),
            title: message.author_username ? t("chat.openProfile") : void 0,
            className: "grid h-[clamp(32px,2.9vw,48px)] w-[clamp(32px,2.9vw,48px)] place-items-center overflow-hidden rounded-full text-[clamp(13px,1.182vw,19.5px)] font-bold text-white transition enabled:hover:brightness-110 disabled:cursor-default",
            style: {
              background: avatarColor(message.author_id),
              boxShadow: pro ? "0 0 0 2px rgba(250,204,21,.85), 0 0 12px rgba(250,204,21,.4)" : void 0
            },
            children: message.author_avatar_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: message.author_avatar_url, alt: "", className: "h-full w-full object-cover" }) : initial(message.author_username)
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex min-w-0 max-w-[min(clamp(560px,50.9vw,840px),72%)] flex-col ${isOwn ? "items-end" : "items-start"}`, children: [
          !grouped && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `mb-1 flex items-center gap-1.5 px-0.5 ${isOwn ? "flex-row-reverse" : ""}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                disabled: !message.author_username,
                onClick: () => message.author_username && onOpenProfile(message.author_username),
                className: "max-w-[clamp(200px,18vw,300px)] truncate text-[clamp(12.5px,1.136vw,18.75px)] font-semibold transition enabled:hover:underline disabled:cursor-default",
                style: { color: pro ? "#FDE047" : isOwn ? tokens.emeraldNav : tokens.text },
                children: isOwn ? t("chat.you") : name
              }
            ),
            pro && /* @__PURE__ */ jsxRuntimeExports.jsx(ProChip, {}),
            message.author_is_creator && /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 11, style: { color: tokens.gold } }),
            message.author_premium && /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { size: 11, style: { color: tokens.gold } }),
            message.author_club && /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 11, style: { color: tokens.emeraldNav } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[clamp(10.5px,0.955vw,15.75px)]", style: { color: tokens.textDim }, children: formatTime(message.created_at) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex w-full items-start gap-1", children: [
            canAct && !editing && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: menuRef, className: `relative ${isOwn ? "order-first" : "order-last"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setMenuOpen((v) => !v),
                  title: t("chat.actions"),
                  className: `mt-1 grid h-6 w-6 place-items-center rounded-full transition hover:bg-white/[.10] ${menuOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`,
                  style: { color: tokens.textDim },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ellipsis, { size: 14 })
                }
              ),
              menuOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: `absolute z-30 w-[clamp(168px,15.3vw,252px)] overflow-hidden rounded-[10px] py-1 shadow-2xl ${isOwn ? "left-0" : "right-0"} ${dropUp ? "bottom-7" : "top-7"}`,
                  style: { background: "#0A0D0C", border: `1px solid ${tokens.hairline}` },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      MenuItem,
                      {
                        icon: CornerUpLeft,
                        label: t("chat.reply"),
                        onClick: () => {
                          setMenuOpen(false);
                          onReply(message);
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      MenuItem,
                      {
                        icon: copied ? Check : Copy,
                        label: copied ? t("chat.copied") : t("chat.copy"),
                        onClick: () => {
                          copyBody();
                          setMenuOpen(false);
                        }
                      }
                    ),
                    isOwn && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      MenuItem,
                      {
                        icon: Pencil,
                        label: t("chat.edit"),
                        onClick: () => {
                          setMenuOpen(false);
                          setDraft(message.body);
                          setEditing(true);
                        }
                      }
                    ),
                    (isOwn || isAdmin) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      MenuItem,
                      {
                        icon: Trash2,
                        label: t("chat.delete"),
                        danger: true,
                        onClick: () => {
                          setMenuOpen(false);
                          onDelete(message);
                        }
                      }
                    )
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `min-w-0 flex-1 rounded-[13px] px-3 py-2 transition-[box-shadow,background] ${sweep ? "relative overflow-hidden" : ""}`,
                style: {
                  background: bubbleBg,
                  border: `1px solid ${bubbleBorder}`,
                  boxShadow: highlighted ? `0 0 0 2px ${tokens.emeraldNav}` : pro ? "0 0 18px rgba(250,204,21,.10)" : "none"
                },
                children: [
                  sweep && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      "aria-hidden": "true",
                      className: "pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-transparent via-yellow-200/40 to-transparent motion-safe:animate-pro-sweep"
                    }
                  ),
                  message.reply_to !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      disabled: message.reply_body === null,
                      onClick: () => message.reply_to !== null && onJumpToReply(message.reply_to),
                      className: "mb-1.5 flex w-full flex-col items-start gap-0.5 rounded-[7px] py-0.5 pl-2 pr-1 text-left transition enabled:hover:bg-white/[.05] disabled:cursor-default",
                      style: { borderLeft: `2px solid ${tokens.emeraldNav}` },
                      children: [
                        message.reply_body !== null && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-[clamp(11px,1vw,16.5px)] font-semibold", style: { color: tokens.emeraldNav }, children: message.reply_author_username ?? t("chat.unknownUser") }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "line-clamp-1 w-full break-all text-[clamp(11.5px,1.045vw,17.25px)]",
                            style: { color: message.reply_body === null ? tokens.textDim : tokens.text2, fontStyle: message.reply_body === null ? "italic" : void 0 },
                            children: message.reply_body === null ? t("chat.deletedOriginal") : containsAd(message.reply_body) ? t("chat.hiddenAd") : message.reply_body.replace(/\s+/g, " ")
                          }
                        )
                      ]
                    }
                  ),
                  editing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "textarea",
                      {
                        ref: editRef,
                        value: draft,
                        maxLength: CHAT_MAX_LENGTH,
                        onChange: (e) => {
                          guardedSetDraft(e.target.value);
                          e.target.style.height = "auto";
                          e.target.style.height = `${Math.min(e.target.scrollHeight, 220)}px`;
                        },
                        onKeyDown: (e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            void saveEdit();
                          } else if (e.key === "Escape") {
                            e.preventDefault();
                            setEditing(false);
                            setDraft(message.body);
                          }
                        },
                        rows: 1,
                        className: "no-scrollbar w-full resize-none bg-transparent text-[clamp(13.5px,1.227vw,20.25px)] leading-[1.55] outline-none",
                        style: { color: tokens.text }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1.5 flex items-center justify-end gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: () => {
                            setEditing(false);
                            setDraft(message.body);
                          },
                          className: "flex items-center gap-1 rounded-[7px] px-2 py-1 text-[clamp(11.5px,1.045vw,17.25px)] transition hover:bg-white/[.06]",
                          style: { color: tokens.text2 },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 12 }),
                            " ",
                            t("chat.cancel")
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: () => void saveEdit(),
                          disabled: saving || !draft.trim(),
                          className: "flex items-center gap-1 rounded-[7px] px-2.5 py-1 text-[clamp(11.5px,1.045vw,17.25px)] font-semibold text-white transition hover:brightness-110 disabled:opacity-50",
                          style: { background: tokens.emerald },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 12 }),
                            " ",
                            t("chat.save")
                          ]
                        }
                      )
                    ] })
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "whitespace-pre-wrap break-words text-[clamp(13.5px,1.227vw,20.25px)] leading-[1.55]",
                          style: {
                            color: tokens.text,
                            maxHeight: collapsible && !expanded ? COLLAPSED_MAX_HEIGHT : void 0,
                            overflow: collapsible && !expanded ? "hidden" : void 0
                          },
                          children: adHidden ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic", style: { color: tokens.textDim }, children: t("chat.hiddenAd") }) : message.body
                        }
                      ),
                      collapsible && !expanded && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "pointer-events-none absolute inset-x-0 bottom-0 h-10",
                          style: { background: `linear-gradient(to bottom, transparent, ${isOwn ? "rgba(15,42,26,.92)" : "rgba(8,12,11,.92)"})` }
                        }
                      )
                    ] }),
                    collapsible && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setExpanded((v) => !v),
                        className: "mt-1 text-[clamp(11.5px,1.045vw,17.25px)] font-semibold transition hover:brightness-125",
                        style: { color: tokens.emeraldNav },
                        children: expanded ? t("chat.showLess") : t("chat.showMore")
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `mt-0.5 flex items-center gap-1.5 ${isOwn ? "justify-end" : "justify-start"}`, children: [
                      message.edited_at && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[clamp(10px,0.909vw,15px)] italic", style: { color: tokens.textDim }, children: t("chat.edited") }),
                      grouped && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[clamp(10px,0.909vw,15px)] opacity-0 transition group-hover:opacity-100", style: { color: tokens.textDim }, children: formatTime(message.created_at) })
                    ] })
                  ] })
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function MenuItem({
  icon: Icon,
  label,
  onClick,
  danger
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick,
      className: "flex w-full items-center gap-2.5 px-3 py-2 text-left text-[clamp(12.5px,1.136vw,18.75px)] transition hover:bg-white/[.06]",
      style: { color: danger ? "#C4614F" : tokens.text2 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 13 }),
        label
      ]
    }
  );
}
const GROUP_WINDOW_MS = 5 * 60 * 1e3;
const STICK_THRESHOLD_PX = 90;
function mergeById(list, incoming) {
  const map = /* @__PURE__ */ new Map();
  for (const m of list) map.set(m.id, m);
  for (const m of incoming) map.set(m.id, m);
  return [...map.values()].sort((a, b) => a.id - b.id);
}
function sameDay(a, b) {
  const x = new Date(a);
  const y = new Date(b);
  return x.getFullYear() === y.getFullYear() && x.getMonth() === y.getMonth() && x.getDate() === y.getDate();
}
const UZ_MONTHS = ["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avgust", "sentyabr", "oktyabr", "noyabr", "dekabr"];
function dateLabel(iso, t, lang) {
  const d = new Date(iso);
  const now = /* @__PURE__ */ new Date();
  const dayDiff = Math.round((new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime() - new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime()) / 864e5);
  if (dayDiff === 0) return t("chat.today");
  if (dayDiff === 1) return t("chat.yesterday");
  if (lang === "uz") return `${d.getDate()}-${UZ_MONTHS[d.getMonth()]}`;
  return new Intl.DateTimeFormat(lang, { day: "numeric", month: "long" }).format(d);
}
function ChatScreen({ onBack, backLabel, onOpenProfile, onRequestLogin }) {
  const { t, lang } = useLanguage();
  const { session, profile } = useAuth();
  const { showToast } = useToast();
  const isLoggedIn = !!session && !!profile;
  const myId = session?.user.id ?? null;
  const isAdmin = profile?.role === "admin";
  const [messages, setMessages] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  const [hasMore, setHasMore] = reactExports.useState(false);
  const [loadingOlder, setLoadingOlder] = reactExports.useState(false);
  const [connected, setConnected] = reactExports.useState(false);
  const [draft, setDraft] = reactExports.useState("");
  const lastBlockedToastRef = reactExports.useRef(0);
  function guardedSetDraft(next) {
    if (containsAd(next)) {
      const now = Date.now();
      if (now - lastBlockedToastRef.current > 2500) {
        lastBlockedToastRef.current = now;
        showToast({ kind: "error", title: t("chat.blockedLink") });
      }
      return;
    }
    setDraft(next);
  }
  const [sending, setSending] = reactExports.useState(false);
  const [replyTo, setReplyTo] = reactExports.useState(null);
  const [emojiOpen, setEmojiOpen] = reactExports.useState(false);
  const [composerFocused, setComposerFocused] = reactExports.useState(false);
  const [pending, setPending] = reactExports.useState([]);
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const [highlightedId, setHighlightedId] = reactExports.useState(null);
  const [unread, setUnread] = reactExports.useState(0);
  const scrollRef = reactExports.useRef(null);
  const inputRef = reactExports.useRef(null);
  const messagesRef = reactExports.useRef([]);
  const stickToBottomRef = reactExports.useRef(true);
  const restoreScrollRef = reactExports.useRef(null);
  const loadIdRef = reactExports.useRef(0);
  messagesRef.current = messages;
  const load = reactExports.useCallback(() => {
    const loadId = ++loadIdRef.current;
    setLoading(true);
    setError(null);
    fetchLatestMessages().then((rows) => {
      if (loadIdRef.current !== loadId) return;
      setMessages(rows);
      setHasMore(rows.length === CHAT_PAGE_SIZE);
      setLoading(false);
      stickToBottomRef.current = true;
    }).catch((err) => {
      if (loadIdRef.current !== loadId) return;
      setError(err.message);
      setLoading(false);
    });
  }, []);
  reactExports.useEffect(() => {
    load();
    purgeExpiredMessagesInBackground();
  }, [load]);
  reactExports.useEffect(() => {
    const unsubscribe = subscribeToChat({
      onInsert: (id) => {
        if (messagesRef.current.some((m) => m.id === id)) return;
        void fetchMessageById(id).then((m) => {
          if (!m) return;
          setMessages((prev) => mergeById(prev, [m]));
          if (!stickToBottomRef.current && m.author_id !== myId) setUnread((n) => n + 1);
        }).catch(() => {
        });
      },
      onUpdate: (row) => {
        setMessages((prev) => prev.map((m) => m.id === row.id ? { ...m, body: row.body, edited_at: row.edited_at } : m));
        setMessages((prev) => prev.map((m) => m.reply_to === row.id ? { ...m, reply_body: row.body } : m));
      },
      onDelete: (id) => {
        setMessages(
          (prev) => prev.filter((m) => m.id !== id).map((m) => m.reply_to === id ? { ...m, reply_body: null, reply_author_username: null } : m)
        );
        setReplyTo((r) => r?.id === id ? null : r);
      },
      onStatus: setConnected
    });
    return unsubscribe;
  }, [myId]);
  reactExports.useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (restoreScrollRef.current !== null) {
      el.scrollTop = el.scrollHeight - restoreScrollRef.current;
      restoreScrollRef.current = null;
      return;
    }
    if (stickToBottomRef.current) el.scrollTop = el.scrollHeight;
  }, [messages, pending, loading]);
  function onScroll() {
    const el = scrollRef.current;
    if (!el) return;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < STICK_THRESHOLD_PX;
    stickToBottomRef.current = atBottom;
    if (atBottom && unread) setUnread(0);
  }
  function scrollToBottom() {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    stickToBottomRef.current = true;
    setUnread(0);
  }
  function loadOlder() {
    const first = messages[0];
    if (!first || loadingOlder) return;
    setLoadingOlder(true);
    restoreScrollRef.current = scrollRef.current?.scrollHeight ?? null;
    fetchOlderMessages(first.id).then((rows) => {
      setHasMore(rows.length === CHAT_PAGE_SIZE);
      setMessages((prev) => mergeById(prev, rows));
    }).catch((err) => {
      restoreScrollRef.current = null;
      showToast({ kind: "error", title: t("chat.errorTitle"), message: err.message });
    }).finally(() => setLoadingOlder(false));
  }
  function jumpToMessage(id) {
    const el = scrollRef.current?.querySelector(`[data-message-id="${id}"]`);
    if (!el) {
      showToast({ kind: "info", title: t("chat.jumpNotLoaded") });
      return;
    }
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    stickToBottomRef.current = false;
    setHighlightedId(id);
    setTimeout(() => setHighlightedId((cur) => cur === id ? null : cur), 1600);
  }
  function insertAtCursor(text) {
    if (draft.length + text.length > CHAT_MAX_LENGTH) return;
    const el = inputRef.current;
    if (!el) {
      guardedSetDraft(draft + text);
      return;
    }
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const next = draft.slice(0, start) + text + draft.slice(end);
    if (containsAd(next)) return;
    setDraft(next);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start + text.length, start + text.length);
    });
  }
  async function submit() {
    const body = draft;
    if (!body.trim() || !myId || sending) return;
    if (body.length > CHAT_MAX_LENGTH) {
      showToast({ kind: "error", title: t("chat.tooLong") });
      return;
    }
    const verdict = checkMessage(body);
    if (!verdict.ok) {
      showToast({ kind: "error", title: blockedTitle(verdict.reason) });
      return;
    }
    const tempId = -Date.now();
    const currentReply = replyTo;
    setPending((p) => [...p, { tempId, body, replyTo: currentReply }]);
    setDraft("");
    setReplyTo(null);
    setSending(true);
    stickToBottomRef.current = true;
    if (inputRef.current) inputRef.current.style.height = "auto";
    try {
      const saved = await sendMessage(myId, body, currentReply?.id ?? null);
      setMessages((prev) => mergeById(prev, [saved]));
    } catch (err) {
      setDraft((d) => d ? d : body);
      setReplyTo(currentReply);
      showToast({ kind: "error", title: t("chat.actionFailed"), message: err.message });
    } finally {
      setPending((p) => p.filter((x) => x.tempId !== tempId));
      setSending(false);
    }
  }
  async function saveEdit(id, body) {
    const verdict = checkMessage(body);
    if (!verdict.ok) {
      showToast({ kind: "error", title: blockedTitle(verdict.reason) });
      throw new Error("blocked");
    }
    try {
      const updated = await editMessage(id, body);
      setMessages((prev) => mergeById(prev, [updated]).map((m) => m.reply_to === id ? { ...m, reply_body: updated.body } : m));
    } catch (err) {
      showToast({ kind: "error", title: t("chat.actionFailed"), message: err.message });
      throw err;
    }
  }
  async function confirmDelete() {
    const target = deleteTarget;
    if (!target) return;
    setDeleteTarget(null);
    try {
      await deleteMessage(target.id);
      setMessages(
        (prev) => prev.filter((m) => m.id !== target.id).map((m) => m.reply_to === target.id ? { ...m, reply_body: null, reply_author_username: null } : m)
      );
      setReplyTo((r) => r?.id === target.id ? null : r);
    } catch (err) {
      showToast({ kind: "error", title: t("chat.actionFailed"), message: err.message });
    }
  }
  function blockedTitle(reason) {
    if (reason === "link") return t("chat.blockedLink");
    if (reason === "serverAd") return t("chat.blockedServerAd");
    return t("chat.blockedProfanity");
  }
  const remaining = CHAT_MAX_LENGTH - draft.length;
  const liveBadge = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 items-center gap-[clamp(5px,.5vw,9px)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: "h-[clamp(7px,.6vw,10px)] w-[clamp(7px,.6vw,10px)] rounded-full transition",
        style: { background: connected ? tokens.emeraldNav : "#7A6A3A", boxShadow: connected ? `0 0 6px ${tokens.emeraldNav}` : "none" }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[clamp(11.5px,1vw,17px)]", style: { color: connected ? tokens.text2 : tokens.textDim }, children: connected ? t("chat.live") : t("chat.offline") })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    FullScreenPage,
    {
      title: t("chat.title"),
      subtitle: t("chat.subtitle"),
      backLabel,
      onBack,
      actions: liveBadge,
      background: /* @__PURE__ */ jsxRuntimeExports.jsx(FlatBackdrop, {}),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex h-full w-full max-w-[2400px] flex-col px-[clamp(14px,2.2vw,64px)] pb-[clamp(12px,1.5vw,34px)] pt-[clamp(10px,1.3vw,28px)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "relative min-h-0 flex-1 overflow-hidden rounded-[clamp(12px,1vw,20px)]",
              style: { background: "rgba(6,10,9,.42)", border: `1px solid ${tokens.hairline}` },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: scrollRef, "data-chat-scroll": true, onScroll, className: "no-scrollbar h-full overflow-y-auto px-[clamp(12px,1.4vw,36px)] py-[clamp(12px,1.2vw,30px)]", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full items-center justify-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 16, className: "animate-spin", style: { color: tokens.textDim } }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[clamp(13px,1.182vw,19.5px)]", style: { color: tokens.text2 }, children: t("chat.loading") })
                ] }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full flex-col items-center justify-center gap-3 text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 26, style: { color: "#C4614F" } }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[clamp(14px,1.273vw,21px)] font-semibold", style: { color: tokens.text }, children: t("chat.errorTitle") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-[380px] text-[clamp(12px,1.091vw,18px)]", style: { color: tokens.text2 }, children: error }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: load,
                      className: "mt-1 rounded-[9px] px-4 py-2 text-[clamp(12.5px,1.136vw,18.75px)] transition hover:bg-white/[.06]",
                      style: { border: `1px solid ${tokens.hairline}`, color: tokens.text },
                      children: t("chat.retry")
                    }
                  )
                ] }) : messages.length === 0 && pending.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full flex-col items-center justify-center gap-2 text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { size: 26, style: { color: tokens.textDim } }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[clamp(14px,1.273vw,21px)] font-semibold", style: { color: tokens.text2 }, children: t("chat.emptyTitle") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[clamp(12px,1.091vw,18px)]", style: { color: tokens.textDim }, children: t("chat.emptyMessage") })
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  hasMore && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: loadOlder,
                      disabled: loadingOlder,
                      className: "rounded-full px-3.5 py-1.5 text-[clamp(11.5px,1.045vw,17.25px)] transition hover:bg-white/[.06] disabled:opacity-60",
                      style: { border: `1px solid ${tokens.hairline}`, color: tokens.text2 },
                      children: loadingOlder ? t("chat.loadingOlder") : t("chat.loadOlder")
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "pb-2 text-center text-[clamp(10.5px,0.955vw,15.75px)]", style: { color: tokens.textDim }, children: t("chat.retentionNotice") }),
                  messages.map((m, i) => {
                    const prev = i > 0 ? messages[i - 1] : null;
                    const newDay = !prev || !sameDay(prev.created_at, m.created_at);
                    const grouped = !newDay && !!prev && prev.author_id === m.author_id && m.reply_to === null && new Date(m.created_at).getTime() - new Date(prev.created_at).getTime() < GROUP_WINDOW_MS;
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      newDay && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "my-3 flex items-center gap-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px flex-1", style: { background: tokens.hairline } }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[clamp(10.5px,0.955vw,15.75px)] font-semibold uppercase tracking-wide", style: { color: tokens.textDim }, children: dateLabel(m.created_at, t, lang) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px flex-1", style: { background: tokens.hairline } })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        MessageBubble,
                        {
                          message: m,
                          isOwn: m.author_id === myId,
                          isAdmin,
                          grouped,
                          canAct: isLoggedIn,
                          highlighted: highlightedId === m.id,
                          onReply: setReplyTo,
                          onSaveEdit: saveEdit,
                          onDelete: setDeleteTarget,
                          onOpenProfile,
                          onJumpToReply: jumpToMessage
                        }
                      )
                    ] }, m.id);
                  }),
                  pending.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-row-reverse gap-2.5 px-1 opacity-60", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[clamp(32px,2.9vw,48px)] shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-w-0 max-w-[min(clamp(560px,50.9vw,840px),72%)] flex-col items-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "min-w-0 rounded-[13px] px-3 py-2",
                        style: { background: "rgba(33,180,94,.14)", border: "1px solid rgba(46,204,113,.28)" },
                        children: [
                          p.replyTo && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1.5 pl-2", style: { borderLeft: `2px solid ${tokens.emeraldNav}` }, children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[clamp(11px,1vw,16.5px)] font-semibold", style: { color: tokens.emeraldNav }, children: p.replyTo.author_username ?? t("chat.unknownUser") }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "line-clamp-1 break-all text-[clamp(11.5px,1.045vw,17.25px)]", style: { color: tokens.text2 }, children: containsAd(p.replyTo.body) ? t("chat.hiddenAd") : p.replyTo.body.replace(/\s+/g, " ") })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "whitespace-pre-wrap break-words text-[clamp(13.5px,1.227vw,20.25px)] leading-[1.55]", style: { color: tokens.text }, children: p.body }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 10, className: "animate-spin", style: { color: tokens.textDim } }) })
                        ]
                      }
                    ) })
                  ] }, p.tempId))
                ] }) }),
                unread > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: scrollToBottom,
                    className: "absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[clamp(11.5px,1.045vw,17.25px)] font-semibold text-white shadow-lg transition hover:brightness-110",
                    style: { background: tokens.emerald },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDown, { size: 12 }),
                      " ",
                      t("chat.newMessages"),
                      " · ",
                      unread
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 shrink-0", children: isLoggedIn ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            replyTo && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "mb-1.5 flex items-center gap-2 rounded-[12px] px-3 py-2",
                style: { background: "rgba(6,10,9,.55)", border: `1px solid ${tokens.hairline}` },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CornerUpLeft, { size: 13, style: { color: tokens.emeraldNav } }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[clamp(11px,1vw,16.5px)] font-semibold", style: { color: tokens.emeraldNav }, children: [
                      t("chat.replyingTo"),
                      " ",
                      replyTo.author_username ?? t("chat.unknownUser")
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "line-clamp-1 break-all text-[clamp(11.5px,1.045vw,17.25px)]", style: { color: tokens.text2 }, children: containsAd(replyTo.body) ? t("chat.hiddenAd") : replyTo.body.replace(/\s+/g, " ") })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setReplyTo(null),
                      className: "grid h-6 w-6 shrink-0 place-items-center rounded-full transition hover:bg-white/[.08]",
                      style: { color: tokens.textDim },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 13 })
                    }
                  )
                ]
              }
            ),
            !profile?.username && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-1.5 px-1 text-[clamp(11.5px,1.045vw,17.25px)]", style: { color: tokens.gold }, children: t("chat.needNickHint") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "relative flex items-end gap-2 rounded-[14px] px-2.5 py-2 transition-[border-color,box-shadow,background] duration-150",
                style: {
                  background: composerFocused ? "rgba(6,10,9,.72)" : "rgba(6,10,9,.55)",
                  border: `1px solid ${composerFocused ? "rgba(46,204,113,.45)" : tokens.hairline}`,
                  boxShadow: composerFocused ? "0 0 0 3px rgba(46,204,113,.10)" : "none"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative shrink-0", children: [
                    emojiOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(EmojiPicker, { onPick: insertAtCursor, onClose: () => setEmojiOpen(false) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setEmojiOpen((v) => !v),
                        title: t("chat.emoji"),
                        className: "grid h-[clamp(36px,3.3vw,54px)] w-[clamp(36px,3.3vw,54px)] place-items-center rounded-full transition hover:bg-white/[.08]",
                        style: { color: emojiOpen ? tokens.emeraldNav : tokens.text2, background: emojiOpen ? "rgba(46,204,113,.10)" : "transparent" },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaceSlightlySmiling, { className: "h-[clamp(18px,1.64vw,27px)] w-[clamp(18px,1.64vw,27px)]" })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "textarea",
                    {
                      ref: inputRef,
                      value: draft,
                      onChange: (e) => {
                        guardedSetDraft(e.target.value);
                        e.target.style.height = "auto";
                        e.target.style.height = `${Math.min(e.target.scrollHeight, 132)}px`;
                      },
                      onKeyDown: (e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          void submit();
                        } else if (e.key === "Escape" && replyTo) {
                          e.preventDefault();
                          setReplyTo(null);
                        }
                      },
                      onFocus: () => setComposerFocused(true),
                      onBlur: () => setComposerFocused(false),
                      rows: 1,
                      maxLength: CHAT_MAX_LENGTH,
                      placeholder: t("chat.placeholder"),
                      className: "no-scrollbar min-h-[clamp(32px,2.9vw,48px)] flex-1 resize-none border-none bg-transparent py-1.5 text-[clamp(13.5px,1.227vw,20.25px)] leading-[1.5] outline-none placeholder:text-[#7A847F]",
                      style: { color: tokens.text }
                    }
                  ),
                  remaining <= 200 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 pb-2 text-[clamp(10.5px,0.955vw,15.75px)]", style: { color: remaining < 0 ? "#C4614F" : tokens.textDim }, children: remaining }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => void submit(),
                      disabled: !draft.trim() || sending,
                      title: t("chat.send"),
                      className: "grid h-[clamp(36px,3.3vw,54px)] w-[clamp(36px,3.3vw,54px)] shrink-0 place-items-center rounded-full transition-[background,box-shadow,color] duration-150 enabled:hover:brightness-110",
                      style: draft.trim() && !sending ? { background: tokens.emerald, color: "#fff", boxShadow: "0 2px 10px rgba(33,180,94,.28)" } : { background: "transparent", color: tokens.textDim, border: `1px solid ${tokens.hairline}` },
                      children: sending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-[clamp(15px,1.36vw,23px)] w-[clamp(15px,1.36vw,23px)] animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-[clamp(15px,1.36vw,23px)] w-[clamp(15px,1.36vw,23px)]" })
                    }
                  )
                ]
              }
            )
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between gap-3 rounded-[14px] px-4 py-3",
              style: { background: "rgba(6,10,9,.55)", border: `1px solid ${tokens.hairline}` },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[clamp(12.5px,1.136vw,18.75px)]", style: { color: tokens.text2 }, children: t("chat.guestHint") }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: onRequestLogin,
                    className: "flex shrink-0 items-center gap-1.5 rounded-[9px] px-4 py-2 text-[clamp(12.5px,1.136vw,18.75px)] font-semibold text-white transition hover:brightness-110",
                    style: { background: tokens.emerald },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { size: 13 }),
                      " ",
                      t("chat.guestLogin")
                    ]
                  }
                )
              ]
            }
          ) })
        ] }),
        deleteTarget && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 grid place-items-center bg-black/60", onClick: () => setDeleteTarget(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            onClick: (e) => e.stopPropagation(),
            className: "w-[360px] rounded-[14px] p-6",
            style: { background: "#0A0D0C", border: `1px solid ${tokens.hairline}` },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 20, color: "#C4614F" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[16px] font-semibold", style: { color: tokens.text }, children: t("chat.deleteTitle") })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-[13px] leading-[1.5]", style: { color: tokens.text2 }, children: t("chat.deleteConfirm") }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setDeleteTarget(null),
                    className: "h-11 flex-1 rounded-[10px] text-[13px] font-semibold transition hover:bg-white/[.04]",
                    style: { border: `1px solid ${tokens.hairline}`, color: tokens.text },
                    children: t("chat.cancel")
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => void confirmDelete(),
                    className: "h-11 flex-1 rounded-[10px] text-[13px] font-bold text-white transition hover:brightness-110",
                    style: { background: "#C4614F" },
                    children: t("chat.delete")
                  }
                )
              ] })
            ]
          }
        ) })
      ]
    }
  );
}
export {
  ChatScreen
};

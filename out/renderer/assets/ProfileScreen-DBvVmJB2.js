import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, X } from "./x-D_GsiFEI.js";
import { s as supabase, f as fetchSupabaseCatalog, u as useLanguage, t as tokens, L as LoaderCircle, P as ProChip, a as Lock, S as Star, C as Crown, b as useToast, c as fetchOAuthAvailability, d as fetchLinkedIdentities, O as OAUTH_PROVIDERS, e as findIdentity, M as Mail, r as runOAuthLink, l as linkErrorText, T as TelegramIcon, D as DiscordIcon, G as GoogleIcon, I as Image, g as useLobbyStore, h as ChevronDown, i as LOBBY_STATUSES, j as Send, k as MessageCircle, m as Globe, n as PlayerModel3D, o as ProJoinFx, p as SkinFace, q as ShoppingBag, v as Shirt, w as LOBBY_BACKGROUNDS, x as useAuth, y as useCosmeticsStore, z as useWorn, A as useProStore, B as useProFlags, E as Download, H as HbcCoin, F as FullScreenPage, J as EmptyState, K as fetchPlayerCosmetics, N as getSkinModelOverride, Q as getCustomSkin, R as fetchCustomSkinIdForNick, U as customSkinPublicUrl, a8 as useAuthStore } from "./index-BgnzSiMf.js";
import { f as formatProDate } from "./proFormat-D1yFcuOe.js";
import { T as Trash2, C as Check } from "./trash-2-Djh6nQ-0.js";
import { F as Flame, V as Video, S as SkinDetailViewer } from "./SkinDetailViewer-CaWKZ459.js";
import { S as Shield, P as Pencil } from "./shield-DfuYzzeT.js";
import "./uiTokenRequest-NBUTHrRg.js";
import "./index-DZI2mFQS.js";
/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z",
      key: "18u6gg"
    }
  ],
  ["circle", { cx: "12", cy: "13", r: "3", key: "1vg3eu" }]
];
const Camera = createLucideIcon("camera", __iconNode$3);
/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M12 2v8", key: "1q4o3n" }],
  ["path", { d: "m16 6-4 4-4-4", key: "6wukr" }],
  ["rect", { width: "20", height: "8", x: "2", y: "14", rx: "2", key: "w68u3i" }],
  ["path", { d: "M6 18h.01", key: "uhywen" }],
  ["path", { d: "M10 18h.01", key: "h775k" }]
];
const HardDriveDownload = createLucideIcon("hard-drive-download", __iconNode$2);
/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M16 5h6", key: "1vod17" }],
  ["path", { d: "M19 2v6", key: "4bpg5p" }],
  ["path", { d: "M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5", key: "1ue2ih" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }]
];
const ImagePlus = createLucideIcon("image-plus", __iconNode$1);
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
      d: "M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z",
      key: "1s6t7t"
    }
  ],
  ["circle", { cx: "16.5", cy: "7.5", r: ".5", fill: "currentColor", key: "w0ekpg" }]
];
const KeyRound = createLucideIcon("key-round", __iconNode);
async function fetchMaps() {
  return [];
}
async function fetchOwnedMapIds(profileId) {
  const { data, error } = await supabase.from("map_purchases").select("map_id").eq("profile_id", profileId);
  if (error) throw new Error(error.message);
  return new Set((data ?? []).map((r) => r.map_id));
}
const DOWNLOADED_KIND_LABELS = {
  mod: "Mod",
  model: "Model",
  shader: "Shader",
  texture: "Tekstura",
  datapack: "Data paket",
  map: "Xarita"
};
const OWN_COLUMNS = "id, username, avatar_url, bio, telegram, discord, youtube_url, instagram, website, tariff, hbc, purchased_mods, premium, has_club_access, is_creator, xp, level, streak, current_skin_id, created_at, last_seen, minecraft_nick";
const PUBLIC_COLUMNS = "id, username, avatar_url, bio, telegram, discord, youtube_url, instagram, website, premium, has_club_access, is_creator, xp, level, streak, current_skin_id, created_at, last_seen";
async function fetchOwnProfile(userId) {
  let candidate = null;
  try {
    candidate = useAuthStore.getState().profile;
  } catch {}
  if (!candidate) {
    try {
      const raw = localStorage.getItem("neoterra_launcher_auth_v1");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.profile) candidate = parsed.profile;
      }
    } catch {}
  }

  try {
    let rawUid = candidate?.raw_uid || userId;
    try {
      const parsed = JSON.parse(localStorage.getItem("neoterra_launcher_auth_v1") || "{}");
      if (parsed.profile?.raw_uid) rawUid = parsed.profile.raw_uid;
    } catch {}
    const query = rawUid ? `uid=${rawUid}` : candidate?.username ? `nickname=${encodeURIComponent(candidate.username)}` : `uid=${userId}`;
    const res = await fetch(`https://site.neoterra.uz/api/launcher/profile?${query}`).then(r => r.json());
    if (res?.data?.success && res.data.user) {
      const u = res.data.user;
      const nick = u.nickname || u.minecraftUsername || (candidate?.username || "Player");
      const p = {
        id: userId,
        raw_uid: u.uid || u.id || null,
        username: nick,
        minecraft_nick: nick,
        email: u.email || candidate?.email || null,
        avatar_url: u.skinUrl ? (u.skinUrl.startsWith("http") ? u.skinUrl : "https://site.neoterra.uz" + (u.skinUrl.startsWith("/") ? "" : "/") + u.skinUrl) : (candidate?.avatar_url || null),
        role: u.role || "user",
        banned: false,
        has_club_access: true,
        tariff: "free",
        streak: Number(u.streak || 1),
        created_at: u.createdAt || "2026-01-01T00:00:00Z",
        minecraft_uuid: candidate?.minecraft_uuid || null,
        hbc: Number(u.balance ? Math.floor(Number(u.balance) >= 1000 ? Number(u.balance) / 1000 : Number(u.balance)) : 0),
        current_skin_id: candidate?.current_skin_id || null,
        purchased_mods: u.purchasedMods || [],
        provider: candidate?.provider || "website"
      };
      try {
        const rawAuth = localStorage.getItem("neoterra_launcher_auth_v1");
        if (rawAuth) {
          const authData = JSON.parse(rawAuth);
          authData.profile = p;
          localStorage.setItem("neoterra_launcher_auth_v1", JSON.stringify(authData));
        }
      } catch {}
      return p;
    }
  } catch (err) {
    console.warn("[Profile] siteApi fetch failed:", err);
  }

  if (candidate) return candidate;

  try {
    const { data, error } = await supabase.from("profiles").select(OWN_COLUMNS).eq("id", userId).maybeSingle();
    if (!error && data) return data;
  } catch {}

  return candidate || null;
}
async function updateOwnProfile(userId, values) {
  try {
    await supabase.from("profiles").update(values).eq("id", userId);
  } catch {}
  try {
    const raw = localStorage.getItem("neoterra_launcher_auth_v1");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.profile) {
        parsed.profile = { ...parsed.profile, ...values };
        localStorage.setItem("neoterra_launcher_auth_v1", JSON.stringify(parsed));
      }
    }
  } catch {}
}
const AVATAR_SIZE = 256;
async function prepareAvatarImage(file) {
  if (!/^image\/(png|jpeg|webp|gif|bmp)$/.test(file.type)) throw new Error("Faqat PNG, JPG, WEBP yoki GIF rasm tanlang");
  if (file.size > 15 * 1024 * 1024) throw new Error("Rasm juda katta - 15 MB dan kichik bo'lsin");
  const bmp = await createImageBitmap(file).catch(() => {
    throw new Error("Rasmni o'qib bo'lmadi");
  });
  const side = Math.min(bmp.width, bmp.height);
  const canvas = document.createElement("canvas");
  canvas.width = AVATAR_SIZE;
  canvas.height = AVATAR_SIZE;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Rasmni tayyorlab bo'lmadi");
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(bmp, (bmp.width - side) / 2, (bmp.height - side) / 2, side, side, 0, 0, AVATAR_SIZE, AVATAR_SIZE);
  bmp.close();
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/webp", 0.88));
  if (!blob) throw new Error("Rasmni tayyorlab bo'lmadi");
  return new Uint8Array(await blob.arrayBuffer());
}
function avatarRpcError(message) {
  if (message.includes("pro_required")) return new Error("Profil rasmi faqat PRO obunachilar uchun");
  if (message.includes("not_authenticated")) return new Error("Avval hisobingizga kiring");
  return new Error(message);
}
async function uploadOwnAvatar(file) {
  const bytes = await prepareAvatarImage(file);
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (!token) throw new Error("Avval hisobingizga kiring");
  const res = await window.launcher.uploadProfileAvatar(bytes, "image/webp", token);
  if (!res.ok || !res.data) throw new Error(`Rasm yuklanmadi${res.error ? `: ${res.error}` : ""}`);
  const { error } = await supabase.rpc("set_my_avatar", { p_url: res.data.url });
  if (error) throw avatarRpcError(error.message);
  return res.data.url;
}
async function removeOwnAvatar() {
  const { error } = await supabase.rpc("set_my_avatar", { p_url: null });
  if (error) throw avatarRpcError(error.message);
}
async function fetchPublicProfile(username) {
  const { data, error } = await supabase.from("public_profiles").select(PUBLIC_COLUMNS).eq("username", username).maybeSingle();
  if (error) throw new Error(error.message);
  return data;
}
async function fetchProfileSkin(skinId) {
  const { data, error } = await supabase.from("skins").select("name, skin_url, model_type").eq("id", skinId).maybeSingle();
  if (error) throw new Error(error.message);
  return data;
}
async function fetchPurchasedItems(modIds, userId) {
  const [modsRes, modelsRes, ownedMapIds, allMaps] = await Promise.all([
    modIds.length > 0 ? supabase.from("mod").select("id, name, icon").in("id", modIds) : Promise.resolve({ data: [], error: null }),
    modIds.length > 0 ? supabase.from("mods").select("id, name, icon").in("id", modIds) : Promise.resolve({ data: [], error: null }),
    fetchOwnedMapIds(userId),
    fetchMaps()
  ]);
  if (modsRes.error) throw new Error(modsRes.error.message);
  if (modelsRes.error) throw new Error(modelsRes.error.message);
  const mods = (modsRes.data ?? []).map((m) => ({ id: m.id, kind: "mod", name: m.name, thumbnail: m.icon }));
  const models = (modelsRes.data ?? []).map((m) => ({ id: m.id, kind: "model", name: m.name, thumbnail: m.icon }));
  const maps = allMaps.filter((m) => ownedMapIds.has(m.id)).map((m) => ({ id: m.id, kind: "map", name: m.name, thumbnail: m.images[0] ?? null }));
  return [...mods, ...models, ...maps];
}
async function fetchDownloadedItems() {
  const [assetsRes, mapsRes, catalog, maps] = await Promise.all([
    window.launcher.listInstalledModAssets(),
    window.launcher.listInstalledMaps(),
    fetchSupabaseCatalog().catch(() => []),
    fetchMaps().catch(() => [])
  ]);
  const rawAssets = assetsRes.ok && assetsRes.data ? assetsRes.data : [];
  const installedMaps = mapsRes.ok && mapsRes.data ? mapsRes.data : [];
  const normKind = (k) => k === "model" ? "mod" : k;
  const seenSharedFilenames = /* @__PURE__ */ new Set();
  const assets = rawAssets.filter((a) => {
    if (a.kind !== "mod" && a.kind !== "model") return true;
    if (seenSharedFilenames.has(a.filename)) return false;
    seenSharedFilenames.add(a.filename);
    return true;
  });
  const result = [];
  const unmatched = [];
  for (const a of assets) {
    const match = catalog.find((c) => normKind(c.assetKind) === normKind(a.kind) && c.assetFilename === a.filename);
    if (match) {
      result.push({
        key: `${a.kind}-${a.filename}${a.worldName ? `-${a.worldName}` : ""}`,
        kind: a.kind,
        name: match.name,
        thumbnail: match.thumbnail,
        removeTarget: { type: "mod", assetKind: a.kind, filename: a.filename, worldName: a.worldName }
      });
    } else {
      unmatched.push(a);
    }
  }
  const resolved = await Promise.all(unmatched.map((a) => window.launcher.findModByFilename(a.filename)));
  unmatched.forEach((a, i) => {
    const res = resolved[i];
    const info = res.ok ? res.data ?? null : null;
    result.push({
      key: `${a.kind}-${a.filename}${a.worldName ? `-${a.worldName}` : ""}`,
      kind: a.kind,
      name: info?.name ?? a.filename,
      thumbnail: info?.iconUrl ?? null,
      removeTarget: { type: "mod", assetKind: a.kind, filename: a.filename, worldName: a.worldName }
    });
  });
  for (const im of installedMaps) {
    const match = maps.find((m) => m.name === im.worldName);
    if (!match) continue;
    result.push({
      key: `map-${im.worldName}`,
      kind: "map",
      name: match.name,
      thumbnail: match.images[0] ?? null,
      removeTarget: { type: "map", worldName: im.worldName }
    });
  }
  return result;
}
function computeBadges(p) {
  const badges = [];
  if (p.is_creator) badges.push("creator");
  if (p.has_club_access) badges.push("club");
  if (p.premium) badges.push("premium");
  const streak = p.streak ?? 0;
  if (streak >= 100) badges.push("streak3");
  else if (streak >= 30) badges.push("streak2");
  else if (streak >= 7) badges.push("streak1");
  return badges;
}
function isOnline(lastSeen) {
  if (!lastSeen) return false;
  return Date.now() - new Date(lastSeen).getTime() < 15 * 6e4;
}
const UZ_MONTHS = ["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avgust", "sentyabr", "oktyabr", "noyabr", "dekabr"];
function formatJoinDate(iso) {
  const d = new Date(iso);
  return `${d.getDate()}-${UZ_MONTHS[d.getMonth()]}, ${d.getFullYear()}`;
}
function useUsernameAvailability(value, initial) {
  const [state, setState] = reactExports.useState("idle");
  reactExports.useEffect(() => {
    const name = value.trim();
    if (!name || name.toLowerCase() === (initial ?? "").trim().toLowerCase()) {
      setState("idle");
      return;
    }
    setState("checking");
    let cancelled = false;
    const timer = setTimeout(() => {
      void supabase.rpc("username_available", { p_username: name }).then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          console.error("[username_available]", error.message);
          setState("error");
          return;
        }
        setState(data === true ? "free" : "taken");
      });
    }, 400);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [value, initial]);
  return state;
}
function Field({
  label,
  value,
  onChange,
  placeholder
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-1.5 block text-[11px] font-medium", style: { color: tokens.text2 }, children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        value,
        onChange: (e) => onChange(e.target.value),
        placeholder,
        className: "h-10 w-full rounded-[8px] px-3 text-[13px] outline-none transition focus:border-white/35",
        style: { background: FIELD_BG, border: `1px solid ${tokens.hairline}`, color: tokens.text }
      }
    )
  ] });
}
const FIELD_BG = "rgba(0,0,0,.32)";
function EditProfileDialog({ initial, loading, error, onSave, onCancel, isPro, onAvatarChange, onNeedPro }) {
  const { t } = useLanguage();
  const [avatar, setAvatar] = reactExports.useState(initial.avatar_url);
  const [avatarBusy, setAvatarBusy] = reactExports.useState(false);
  const [avatarError, setAvatarError] = reactExports.useState(null);
  const fileRef = reactExports.useRef(null);
  async function pickAvatar(file) {
    if (!file) return;
    setAvatarBusy(true);
    setAvatarError(null);
    try {
      const url = await uploadOwnAvatar(file);
      setAvatar(url);
      onAvatarChange(url);
    } catch (err) {
      setAvatarError(err instanceof Error ? err.message : "Rasm yuklanmadi");
    } finally {
      setAvatarBusy(false);
    }
  }
  async function clearAvatar() {
    setAvatarBusy(true);
    setAvatarError(null);
    try {
      await removeOwnAvatar();
      setAvatar(null);
      onAvatarChange(null);
    } catch (err) {
      setAvatarError(err instanceof Error ? err.message : "Rasmni olib tashlab bo'lmadi");
    } finally {
      setAvatarBusy(false);
    }
  }
  const [username, setUsername] = reactExports.useState(initial.username ?? "");
  const [bio, setBio] = reactExports.useState(initial.bio ?? "");
  const [telegram, setTelegram] = reactExports.useState(initial.telegram ?? "");
  const [discord, setDiscord] = reactExports.useState(initial.discord ?? "");
  const [youtubeUrl, setYoutubeUrl] = reactExports.useState(initial.youtube_url ?? "");
  const [instagram, setInstagram] = reactExports.useState(initial.instagram ?? "");
  const [website, setWebsite] = reactExports.useState(initial.website ?? "");
  const nameState = useUsernameAvailability(username, initial.username);
  const trimmedName = username.trim();
  const nameRuleOk = /^[A-Za-z0-9_]{3,16}$/.test(trimmedName);
  function submit() {
    onSave({
      username: username.trim(),
      bio: bio.trim(),
      telegram: telegram.trim(),
      discord: discord.trim(),
      youtube_url: youtubeUrl.trim(),
      instagram: instagram.trim(),
      website: website.trim()
    });
  }
  return (
    // SHAFFOF (shisha) oyna - foydalanuvchi talabi: orqadagi profil sahifasi (fon, personaj) ko'rinib tursin. Orqa qatlam
    // faqat yengil qorong'ilashtiradi, oynaning o'zi yarim shaffof + kuchli blur (matn baribir aniq o'qiladi).
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 grid place-items-center bg-black/25", onClick: onCancel, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        onClick: (e) => e.stopPropagation(),
        className: "no-scrollbar max-h-[85vh] w-[420px] overflow-y-auto rounded-[14px] p-6",
        style: {
          background: "rgba(10,13,12,.42)",
          border: "1px solid rgba(255,255,255,.16)",
          backdropFilter: "blur(22px) saturate(1.25)",
          boxShadow: "0 20px 60px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.08)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[15px] font-bold", style: { color: tokens.text }, children: "Profilni tahrirlash" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "relative grid h-[72px] w-[72px] shrink-0 place-items-center overflow-hidden rounded-full",
                style: {
                  background: "rgba(0,0,0,.35)",
                  border: `2px solid ${isPro ? "rgba(253,224,71,.55)" : "rgba(255,255,255,.16)"}`
                },
                children: [
                  avatar ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: avatar, alt: "", draggable: false, className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[26px] font-bold uppercase", style: { color: tokens.text2 }, children: (initial.username ?? "?").slice(0, 1) }),
                  avatarBusy && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 grid place-items-center bg-black/55", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 22, className: "animate-spin text-white" }) })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-1.5 text-[12px] font-semibold", style: { color: tokens.text }, children: [
                "Profil rasmi ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ProChip, {})
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-[11px]", style: { color: tokens.textDim }, children: isPro ? "PNG, JPG, WEBP yoki GIF - kvadrat qilib kesiladi" : "Rasm qo'yish faqat PRO obunachilar uchun" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex flex-wrap gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    disabled: avatarBusy,
                    onClick: () => isPro ? fileRef.current?.click() : onNeedPro(),
                    className: "flex h-8 items-center gap-1.5 rounded-[8px] px-3 text-[12px] font-semibold transition hover:brightness-110 disabled:opacity-60",
                    style: isPro ? { background: tokens.emeraldNav, color: "#fff" } : { background: "linear-gradient(180deg,#fde047,#e89a0b)", color: "#1a1200" },
                    children: [
                      isPro ? /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { size: 14 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 13 }),
                      isPro ? avatar ? "Rasmni almashtirish" : "Rasm qo'yish" : "PRO bilan ochish"
                    ]
                  }
                ),
                avatar && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    disabled: avatarBusy,
                    onClick: () => void clearAvatar(),
                    className: "flex h-8 items-center gap-1.5 rounded-[8px] px-3 text-[12px] font-semibold transition hover:bg-white/[.08] disabled:opacity-60",
                    style: { border: `1px solid ${tokens.hairline}`, background: "rgba(0,0,0,.2)", color: tokens.text2 },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 13 }),
                      "Olib tashlash"
                    ]
                  }
                )
              ] }),
              avatarError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-[11px]", style: { color: "#FF6B6B" }, children: avatarError })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                ref: fileRef,
                type: "file",
                accept: "image/png,image/jpeg,image/webp,image/gif",
                className: "hidden",
                onChange: (e) => {
                  const file = e.target.files?.[0];
                  e.target.value = "";
                  void pickAvatar(file);
                }
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex flex-col gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Foydalanuvchi nomi", value: username, onChange: setUsername }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[11px]", style: { color: tokens.textDim }, children: "Bu nom Minecraft o'yinida ham ko'rinadi: faqat harf, raqam va pastki chiziq, 3-16 belgi." }),
            trimmedName.length > 0 && !nameRuleOk && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[11px]", style: { color: "#f87171" }, children: "Bu nom Minecraft uchun yaroqsiz — bo'shliq va maxsus belgilar ishlatilmaydi, uzunligi 3-16 belgi bo'lishi kerak." }),
            nameRuleOk && nameState !== "idle" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "p",
              {
                className: "mt-1 text-[11px]",
                style: {
                  color: nameState === "taken" ? "#f87171" : nameState === "free" ? "#34d399" : tokens.textDim
                },
                children: [
                  nameState === "checking" && "Tekshirilmoqda...",
                  nameState === "free" && "Bu nom bo'sh",
                  nameState === "taken" && "Bu nom allaqachon band - boshqasini tanlang",
                  nameState === "error" && "Nomni tekshirib bo'lmadi"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-1.5 block text-[11px] font-medium", style: { color: tokens.text2 }, children: "Bio" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "textarea",
                {
                  value: bio,
                  onChange: (e) => setBio(e.target.value),
                  rows: 3,
                  maxLength: 200,
                  className: "w-full resize-none rounded-[8px] px-3 py-2 text-[13px] outline-none transition focus:border-white/35",
                  style: { background: FIELD_BG, border: `1px solid ${tokens.hairline}`, color: tokens.text }
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Telegram", value: telegram, onChange: setTelegram, placeholder: "@username" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Discord", value: discord, onChange: setDiscord, placeholder: "username" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "YouTube", value: youtubeUrl, onChange: setYoutubeUrl, placeholder: "https://youtube.com/@..." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Instagram", value: instagram, onChange: setInstagram, placeholder: "@username" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Veb-sayt", value: website, onChange: setWebsite, placeholder: "https://..." })
            ] })
          ] }),
          error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-[12px]", style: { color: "#FF6B6B" }, children: error }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: onCancel,
                disabled: loading,
                className: "h-11 flex-1 rounded-[10px] text-[13px] font-semibold transition hover:bg-white/[.08] disabled:opacity-60",
                style: { border: `1px solid ${tokens.hairline}`, background: "rgba(0,0,0,.2)", color: tokens.text },
                children: "Bekor qilish"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: submit,
                disabled: loading || !nameRuleOk || nameState === "taken" || nameState === "checking",
                className: "h-11 flex-1 rounded-[10px] text-[13px] font-bold text-white transition disabled:opacity-70",
                style: { background: tokens.emeraldNav },
                children: loading ? t("common.saving") : t("common.save")
              }
            )
          ] })
        ]
      }
    ) })
  );
}
const BADGE_META = {
  creator: { icon: Crown, label: "Ijodkor" },
  club: { icon: Star, label: "Club a'zosi" },
  premium: { icon: Shield, label: "Premium" },
  streak1: { icon: Flame, label: "Streak I" },
  streak2: { icon: Flame, label: "Streak II" },
  streak3: { icon: Flame, label: "Streak III" }
};
function ProviderIcon({ provider }) {
  switch (provider) {
    case "google":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(GoogleIcon, { className: "h-[17px] w-[17px]" });
    case "discord":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(DiscordIcon, { className: "h-[17px] w-[17px] text-[#7C88FF]" });
    case "telegram":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(TelegramIcon, { className: "h-[17px] w-[17px] text-[#37AEE2]" });
  }
}
function Row({ icon, label, sub, action }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3 py-2 [&:not(:first-child)]:border-t", style: { borderColor: tokens.hairline }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-8 w-8 shrink-0 place-items-center rounded-[8px]", style: { background: "rgba(255,255,255,.06)", color: tokens.text2 }, children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0 flex-1 leading-tight", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[13px] font-semibold", style: { color: tokens.text }, children: label }),
      sub && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block truncate text-[11.5px]", style: { color: tokens.textDim }, children: sub })
    ] }),
    action
  ] });
}
function LinkedBadge() {
  const { t } = useLanguage();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: "inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[11.5px] font-semibold",
      style: { background: "rgba(33,180,94,.14)", border: "1px solid rgba(33,180,94,.4)", color: tokens.emeraldNav },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 12, strokeWidth: 3 }),
        t("login.linked.linkedBadge")
      ]
    }
  );
}
function LinkedAccountsView({ rows, hasEmailLogin, busy, error, onLink, onCancel }) {
  const { t } = useLanguage();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-3 rounded-[10px] p-4", style: { border: `1px solid ${tokens.hairline}`, background: tokens.surface }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 mb-1 text-[11px] font-bold uppercase tracking-[.12em]", style: { color: tokens.label }, children: t("login.linked.title") }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "m-0 list-none p-0", children: [
      hasEmailLogin && /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 16 }), label: t("login.linked.email"), action: /* @__PURE__ */ jsxRuntimeExports.jsx(LinkedBadge, {}) }),
      rows.map((row) => {
        const label = t(`login.${row.provider}`);
        const thisBusy = busy === row.provider;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          Row,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ProviderIcon, { provider: row.provider }),
            label,
            sub: row.linked ? row.detail : null,
            action: row.linked ? /* @__PURE__ */ jsxRuntimeExports.jsx(LinkedBadge, {}) : thisBusy ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex shrink-0 items-center gap-2 text-[12px]", style: { color: tokens.text2 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/25 border-t-white/80" }),
              t("login.linked.waiting"),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onCancel,
                  className: "font-semibold underline underline-offset-[3px] transition hover:text-white",
                  style: { color: tokens.text },
                  children: t("login.cancel")
                }
              )
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                disabled: busy !== null,
                onClick: () => onLink(row.provider),
                className: "h-8 shrink-0 rounded-[8px] px-4 text-[12.5px] font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50",
                style: { background: tokens.emerald },
                children: t("login.linked.link")
              }
            )
          },
          row.provider
        );
      })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { role: "alert", className: "mb-0 mt-2 rounded-[8px] px-3 py-2 text-[12px] leading-snug", style: { background: "rgba(196,97,79,.12)", border: "1px solid rgba(196,97,79,.35)", color: "#F0A79A" }, children: error }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0 mt-2 text-[11.5px] leading-snug", style: { color: tokens.textDim }, children: t("login.linked.hint") })
  ] });
}
function LinkedAccounts() {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const [identities, setIdentities] = reactExports.useState(null);
  const [availability, setAvailability] = reactExports.useState(null);
  const [busy, setBusy] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  const mountedRef = reactExports.useRef(true);
  reactExports.useEffect(() => {
    let alive = true;
    mountedRef.current = true;
    void fetchOAuthAvailability().then((a) => {
      if (alive) setAvailability(a);
    });
    fetchLinkedIdentities().then(
      (list) => {
        if (alive) setIdentities(list);
      },
      () => void 0
      // yuklanmadi - bo'lim ko'rsatilmaydi
    );
    return () => {
      alive = false;
      mountedRef.current = false;
    };
  }, []);
  if (!identities || !availability) return null;
  const rows = OAUTH_PROVIDERS.filter(
    (p) => availability[p] !== false || !!findIdentity(identities, p)
  ).map((provider) => {
    const found = findIdentity(identities, provider);
    return { provider, detail: found?.detail ?? null, linked: !!found };
  });
  if (rows.length === 0) return null;
  async function handleLink(provider) {
    if (busy) return;
    setError(null);
    setBusy(provider);
    try {
      const updated = await runOAuthLink(provider, {
        successTitle: t("login.linked.page.successTitle"),
        successMessage: t("login.linked.page.successMessage"),
        errorTitle: t("login.linked.page.errorTitle"),
        errorMessage: t("login.linked.page.errorMessage")
      });
      setIdentities(updated);
      showToast({
        kind: "success",
        title: t("login.linked.successTitle"),
        message: t("login.linked.successMessage", { provider: t(`login.${provider}`) })
      });
    } catch (err) {
      const text = linkErrorText(err, provider, t);
      if (mountedRef.current) setError(text);
      else if (text) showToast({ kind: "error", title: t("login.pendingLink.failedTitle"), message: text });
    } finally {
      setBusy(null);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    LinkedAccountsView,
    {
      rows,
      hasEmailLogin: identities.some((i) => i.provider === "email"),
      busy,
      error,
      onLink: (provider) => void handleLink(provider),
      onCancel: () => void window.launcher?.oauthCancel?.()
    }
  );
}
function PurchasedItemCard({ name, thumbnail, kindLabel, onRemove }) {
  const { t } = useLanguage();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-[12px]", style: { background: tokens.cardSurface, border: `1px solid ${tokens.hairline}` }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-video w-full overflow-hidden", children: thumbnail ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: thumbnail, alt: "", className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-full w-full place-items-center", style: { background: tokens.surface2 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { size: 22, color: tokens.textDim }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 py-[10px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-[13px] font-medium", style: { color: tokens.text }, children: name }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-[2px] flex items-center justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-[11px]", style: { color: tokens.textDim }, children: kindLabel }),
        onRemove && // Modlar bo'limidagi ItemCard'dagi bilan bir xil naqsh - "Qo'shilgan" holat
        // belgisi o'zi bosilganda olib tashlash tugmasi vazifasini bajaradi (foydalanuvchi
        // so'rovi: aynan shu uslub, aynan shu nom bilan).
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: onRemove,
            title: t("common.remove"),
            className: "flex h-6 shrink-0 items-center gap-1 rounded-[6px] px-2 text-[10.5px] font-medium transition hover:bg-white/[.04]",
            style: { border: `1px solid ${tokens.emerald}`, color: tokens.emerald },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 11 }),
              " Qo'shilgan"
            ]
          }
        )
      ] })
    ] })
  ] });
}
const META = {
  online: { color: "#2ECC71", label: "lobby.myStatusOnline", hint: "lobby.myStatusOnlineHint" },
  friends: { color: "#F1C40F", label: "lobby.myStatusFriends", hint: "lobby.myStatusFriendsHint" },
  dnd: { color: "#E05555", label: "lobby.myStatusDnd", hint: "lobby.myStatusDndHint" },
  invisible: { color: "#7A7F7D", label: "lobby.myStatusInvisible", hint: "lobby.myStatusInvisibleHint" }
};
function Dot({ color }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block h-[9px] w-[9px] shrink-0 rounded-full", style: { background: color, boxShadow: `0 0 6px ${color}` } });
}
const StatusPicker = reactExports.memo(function StatusPicker2() {
  const { t } = useLanguage();
  const status = useLobbyStore((s) => s.myStatus);
  const setStatus = useLobbyStore((s) => s.setStatus);
  const [open, setOpen] = reactExports.useState(false);
  const ref = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);
  const cur = META[status];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref, className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setOpen((v) => !v),
        "aria-haspopup": "menu",
        "aria-expanded": open,
        title: t("lobby.myStatusTitle"),
        className: "inline-flex items-center gap-[6px] rounded-[4px] bg-black/45 px-[clamp(6px,.6vw,10px)] py-[clamp(2px,.25vw,4px)] text-[clamp(10.5px,.85vw,14px)] font-medium text-white/90 transition hover:bg-black/60",
        style: { border: "1px solid rgba(255,255,255,.3)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Dot, { color: cur.color }),
          t(cur.label),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: `h-[12px] w-[12px] transition ${open ? "rotate-180" : ""}` })
        ]
      }
    ),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        role: "menu",
        className: "absolute left-0 top-full z-50 mt-1 w-max min-w-[220px] max-w-[280px] rounded-[10px] p-1",
        style: { background: "rgba(10,13,12,.92)", border: "1px solid rgba(255,255,255,.12)", backdropFilter: "blur(12px)" },
        children: LOBBY_STATUSES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            role: "menuitemradio",
            "aria-checked": s === status,
            onClick: () => {
              setStatus(s);
              setOpen(false);
            },
            className: `flex w-full items-start gap-2 rounded-[8px] px-2 py-[7px] text-left transition hover:bg-white/[.06] ${s === status ? "bg-white/[.05]" : ""}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-[5px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Dot, { color: META[s].color }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[12.5px] font-semibold text-white", children: t(META[s].label) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[11px] leading-snug text-white/50", children: t(META[s].hint) })
              ] })
            ]
          },
          s
        ))
      }
    )
  ] });
});
const PREFERRED_BG = "videos/Minecraft_sunset_over_blocky_ocean_20260927072515.jpg";
const PROFILE_BG = LOBBY_BACKGROUNDS.find((b) => b.id === PREFERRED_BG) ?? LOBBY_BACKGROUNDS.find((b) => b.kind === "image") ?? LOBBY_BACKGROUNDS[0];
function ProfileBackground() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 overflow-hidden", children: [
    PROFILE_BG.kind === "video" ? /* @__PURE__ */ jsxRuntimeExports.jsx("video", { src: PROFILE_BG.src, autoPlay: true, loop: true, muted: true, playsInline: true, className: "absolute inset-0 h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: PROFILE_BG.src, alt: "", draggable: false, className: "absolute inset-0 h-full w-full object-cover" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute inset-0",
        style: { background: "linear-gradient(180deg, rgba(3,5,8,.55) 0%, rgba(3,5,8,.08) 18%, rgba(3,5,8,0) 50%, rgba(3,5,8,.22) 74%, rgba(3,5,8,.82) 100%)" }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute inset-0",
        style: { background: "linear-gradient(90deg, rgba(3,5,8,.55) 0%, rgba(3,5,8,0) 32%, rgba(3,5,8,0) 68%, rgba(3,5,8,.55) 100%)" }
      }
    )
  ] });
}
const TEXT_SHADOW = "[text-shadow:0_1px_5px_rgba(0,0,0,.85)]";
const PANEL_SOLID = "border border-white/[.16] bg-[rgba(10,13,12,.84)] shadow-[0_16px_48px_rgba(0,0,0,.5)]";
const SCENE_FPS = 30;
const EDGE_X = "clamp(16px,2.4vw,44px)";
const EDGE_BOTTOM = "clamp(10px,2.2vh,26px)";
const PROFILE_BTN = "flex items-center gap-1.5 rounded-[12px] px-[clamp(14px,1.4vw,26px)] py-[clamp(7px,.65vw,11px)] text-[clamp(12px,1vw,16px)] font-black text-white transition-[transform,filter] duration-150 hover:scale-[1.03] hover:brightness-105 active:scale-[.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70";
const PROFILE_BTN_ICON = "h-[clamp(13px,1.05vw,17px)] w-[clamp(13px,1.05vw,17px)] shrink-0";
const BTN_SHINE = "inset 0 2px 0 rgba(255,255,255,.28)";
const SOCIALS = [
  { key: "telegram", icon: Send, label: "Telegram", format: (v) => v.startsWith("http") ? v : `https://t.me/${v.replace(/^@/, "")}` },
  { key: "discord", icon: MessageCircle, label: "Discord" },
  { key: "youtube_url", icon: Video, label: "YouTube" },
  { key: "instagram", icon: Camera, label: "Instagram", format: (v) => v.startsWith("http") ? v : `https://instagram.com/${v.replace(/^@/, "")}` },
  { key: "website", icon: Globe, label: "Web" }
];
const COMPLETENESS_FIELDS = ["bio", "telegram", "discord", "youtube_url", "instagram", "website"];
const STREAK_STEPS = [
  { days: 7, badge: "streak1" },
  { days: 30, badge: "streak2" },
  { days: 100, badge: "streak3" }
];
const MAX_BADGES = 4;
function ProfileView({
  data,
  ownData,
  skin,
  worn,
  isPro,
  proUntilText,
  targetIsPro,
  purchased,
  downloaded,
  panel,
  onPanel,
  onOpenSkins,
  onOpenInventory,
  onEdit,
  onRemoveDownloaded,
  scenePaused = false
}) {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const isOwner = ownData !== null;
  const skinUrl = skin?.skin_url ?? "skins/steve.png";
  const badges = computeBadges(data);
  const joined = t("profile.memberSince", { date: formatJoinDate(data.created_at) });
  const hiddenByStatus = useLobbyStore((s) => !isOwner && s.onlineUsers.some((u) => u.userId === data.id && u.status === "invisible"));
  const online = isOnline(data.last_seen) && !hiddenByStatus;
  const filled = COMPLETENESS_FIELDS.filter((k) => (data[k] ?? "").trim().length > 0).length;
  const streak = data.streak ?? 0;
  const nextStep = STREAK_STEPS.find((s) => streak < s.days) ?? null;
  const socials = SOCIALS.filter((s) => data[s.key]);
  const [fx, setFx] = reactExports.useState(false);
  const firedRef = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (!targetIsPro || firedRef.current) return;
    firedRef.current = true;
    setFx(true);
    const timer = setTimeout(() => setFx(false), 2200);
    return () => clearTimeout(timer);
  }, [targetIsPro]);
  function openSocial(key, raw, format) {
    if (key === "discord") {
      void navigator.clipboard.writeText(raw);
      showToast({ kind: "success", title: t("common.copied"), message: raw });
      return;
    }
    window.open(format ? format(raw) : raw, "_blank");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-full w-full select-none", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-none absolute left-1/2 top-0 w-[clamp(300px,34vw,660px)] -translate-x-1/2", style: { bottom: EDGE_BOTTOM }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Pedestal, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-auto absolute inset-x-[6%] bottom-[8%] top-[1%]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        PlayerModel3D,
        {
          worn,
          skinUrl,
          paused: scenePaused || !!panel,
          maxFps: SCENE_FPS,
          skinModel: skin?.model_type === "slim" ? "slim" : "default",
          plain: /* @__PURE__ */ jsxRuntimeExports.jsx(SkinDetailViewer, { skinUrl, model: skin?.model_type ?? "classic", onError: () => {
          }, paused: scenePaused || !!panel, maxFps: SCENE_FPS })
        }
      ) }),
      fx && /* @__PURE__ */ jsxRuntimeExports.jsx(ProJoinFx, {})
    ] }),
    !panel && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute w-[clamp(250px,25vw,440px)]", style: { left: EDGE_X, top: "clamp(14px,4vh,48px)" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-[clamp(10px,1vw,16px)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-[clamp(52px,4.4vw,78px)] w-[clamp(52px,4.4vw,78px)] overflow-hidden rounded-full border-2 bg-black/40 shadow-[0_6px_20px_rgba(0,0,0,.5)]",
              style: { borderColor: "rgba(245,196,94,.8)" },
              children: data.avatar_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: data.avatar_url, alt: "", draggable: false, className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-full w-full place-items-center text-[clamp(20px,1.8vw,30px)] font-bold text-white/70", children: (data.username ?? "?").charAt(0).toUpperCase() })
            }
          ),
          online && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute bottom-[4%] right-[4%] h-[22%] w-[22%] rounded-full border-2 border-black/70 bg-[#21B45E]" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "m-0 flex min-w-0 items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `truncate text-[clamp(20px,2vw,34px)] font-bold leading-tight text-white ${TEXT_SHADOW}`, children: data.username ?? "Noma'lum" }),
            targetIsPro && /* @__PURE__ */ jsxRuntimeExports.jsx(ProChip, { size: "md", pop: fx })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `m-0 mt-0.5 line-clamp-2 text-[clamp(13px,1.15vw,20px)] leading-snug text-[#CBC4F7] ${TEXT_SHADOW}`, children: data.bio?.trim() || joined })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-[clamp(8px,1.2vh,14px)] flex flex-wrap gap-[6px]", children: [
        isOwner && /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { tone: isPro ? "gold" : "plain", children: isPro ? "PRO" : t("profile.freeTariff") }),
        data.bio?.trim() && /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { children: joined }),
        isOwner ? /* @__PURE__ */ jsxRuntimeExports.jsx(StatusPicker, {}) : online && /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { tone: "green", children: t("profile.online") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: isOwner ? onOpenSkins : void 0,
          disabled: !isOwner,
          className: "group relative mt-[clamp(12px,2.4vh,28px)] block aspect-[3/4] w-[clamp(118px,10vw,176px)] overflow-hidden rounded-[6px] border border-white/40 text-left shadow-[0_10px_28px_rgba(0,0,0,.45)] transition enabled:hover:border-[#F5C45E] disabled:cursor-default",
          style: { background: "linear-gradient(180deg, rgba(110,160,210,.55) 0%, rgba(40,62,92,.85) 60%, rgba(12,18,28,.95) 100%)" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SkinFace, { skinUrl, className: "absolute left-1/2 top-[12%] w-[62%] -translate-x-1/2 drop-shadow-[0_6px_10px_rgba(0,0,0,.5)]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/55 to-transparent px-[8%] pb-[8%] pt-[18%] text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `m-0 truncate text-[clamp(11px,.95vw,15px)] font-semibold text-[#F7D154] ${TEXT_SHADOW}`, children: skin ? skin.name : t("profile.noSkin") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `m-0 mt-0.5 text-[clamp(11.5px,1vw,16px)] font-medium text-white ${TEXT_SHADOW}`, children: t("profile.currentSkin") })
            ] })
          ]
        }
      )
    ] }),
    panel && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `absolute z-20 flex w-[clamp(340px,31vw,540px)] flex-col overflow-hidden rounded-[14px] motion-safe:animate-panel-in ${PANEL_SOLID}`,
        style: { left: EDGE_X, top: "clamp(12px,2.5vh,30px)", bottom: `calc(${EDGE_BOTTOM} + clamp(70px,7.4vw,104px))` },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 items-center justify-between gap-3 border-b border-white/[.08] px-[clamp(12px,1.2vw,20px)] py-[clamp(10px,1vw,14px)]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 text-[clamp(13px,1.1vw,18px)] font-bold text-white", children: panel === "linked" ? t("login.linked.title") : panel === "purchased" ? t("profile.purchased") : t("profile.downloaded") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => onPanel(null),
                title: t("common.close"),
                className: "grid h-8 w-8 place-items-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16 })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "no-scrollbar min-h-0 flex-1 overflow-y-auto px-[clamp(12px,1.2vw,20px)] pb-[clamp(12px,1.2vw,20px)]", children: panel === "linked" ? /* @__PURE__ */ jsxRuntimeExports.jsx(LinkedAccounts, {}) : panel === "purchased" ? purchased.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 py-10 text-center text-[13px] text-white/60", children: t("profile.emptyPurchased") }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 grid grid-cols-2 gap-3", children: purchased.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            PurchasedItemCard,
            {
              name: item.name,
              thumbnail: item.thumbnail,
              kindLabel: item.kind === "model" ? t("profile.kindModel") : item.kind === "map" ? t("profile.kindMap") : "Mod"
            },
            `${item.kind}-${item.id}`
          )) }) : downloaded.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 py-10 text-center text-[13px] text-white/60", children: t("profile.emptyDownloaded") }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 grid grid-cols-2 gap-3", children: downloaded.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            PurchasedItemCard,
            {
              name: item.name,
              thumbnail: item.thumbnail,
              kindLabel: DOWNLOADED_KIND_LABELS[item.kind],
              onRemove: () => onRemoveDownloaded(item)
            },
            item.key
          )) }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute flex w-[clamp(260px,25vw,440px)] gap-[clamp(10px,1vw,18px)]", style: { right: EDGE_X, top: "clamp(14px,5vh,60px)" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
        isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-[clamp(12px,2vh,22px)] flex items-center gap-[clamp(8px,.8vw,12px)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid h-[clamp(36px,3.1vw,52px)] w-[clamp(36px,3.1vw,52px)] shrink-0 place-items-center rounded-[6px] border bg-black/45",
              style: { borderColor: isPro ? "rgba(250,204,21,.6)" : "rgba(255,255,255,.3)" },
              children: isPro ? /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-[52%] w-[52%] text-[#FDE047]", fill: "currentColor", strokeWidth: 1.5 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-[52%] w-[52%] text-white/80", strokeWidth: 1.8 })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `m-0 truncate text-[clamp(14px,1.3vw,22px)] font-semibold ${isPro ? "text-[#FDE047]" : "text-white"} ${TEXT_SHADOW}`, children: isPro ? t("pro.active") : t("profile.freeTariff") }),
            proUntilText && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `m-0 truncate text-[clamp(11px,.9vw,15px)] text-white/75 ${TEXT_SHADOW}`, children: proUntilText })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-[clamp(9px,1.5vh,16px)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatBar, { label: t("profile.completeness"), value: `${filled}/${COMPLETENESS_FIELDS.length}`, fraction: filled / COMPLETENESS_FIELDS.length }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatBar,
            {
              label: t("profile.streak"),
              value: nextStep ? t("profile.streakDays", { n: `${streak}/${nextStep.days}` }) : t("profile.streakDays", { n: streak }),
              fraction: nextStep ? streak / nextStep.days : 1,
              hint: nextStep ? t("profile.streakNext", { badge: BADGE_META[nextStep.badge].label }) : t("profile.streakMax")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatBar, { label: t("profile.achievements"), value: `${badges.length}/${MAX_BADGES}`, fraction: badges.length / MAX_BADGES })
        ] }),
        badges.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-[clamp(14px,2.4vh,28px)] flex flex-wrap gap-[clamp(8px,.8vw,14px)]", children: badges.map((b) => {
          const Icon = BADGE_META[b].icon;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              title: BADGE_META[b].label,
              className: "grid h-[clamp(38px,3.3vw,58px)] w-[clamp(38px,3.3vw,58px)] place-items-center rounded-full border-2",
              style: {
                borderColor: "rgba(170,215,255,.7)",
                background: "radial-gradient(circle at 35% 30%, rgba(120,190,255,.6), rgba(20,52,112,.9) 70%)",
                boxShadow: "0 0 14px rgba(110,180,255,.45)"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-[48%] w-[48%] text-white", strokeWidth: 1.8 })
            },
            b
          );
        }) })
      ] }),
      socials.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex shrink-0 flex-col items-center gap-[clamp(8px,1.4vh,14px)] pt-[clamp(2px,.4vh,6px)]", children: socials.map((s) => {
        const Icon = s.icon;
        const raw = data[s.key];
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            title: s.key === "discord" ? `Discord: ${raw}` : raw,
            onClick: () => openSocial(s.key, raw, s.format),
            className: "group flex flex-col items-center gap-1",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-[clamp(32px,2.8vw,48px)] w-[clamp(32px,2.8vw,48px)] place-items-center rounded-[6px] border border-white/35 bg-black/45 transition group-hover:border-[#F5C45E] group-hover:bg-black/60", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-[48%] w-[48%] text-white", strokeWidth: 1.8 }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[clamp(10px,.8vw,13px)] text-white/90 ${TEXT_SHADOW}`, children: s.label })
            ]
          },
          s.key
        );
      }) })
    ] }),
    isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute flex items-start gap-[clamp(6px,.8vw,16px)]", style: { left: EDGE_X, bottom: EDGE_BOTTOM }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(RoundButton, { icon: KeyRound, label: t("login.linked.title"), active: panel === "linked", onClick: () => onPanel(panel === "linked" ? null : "linked") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        RoundButton,
        {
          icon: ShoppingBag,
          label: t("profile.purchased"),
          count: purchased.length,
          active: panel === "purchased",
          onClick: () => onPanel(panel === "purchased" ? null : "purchased")
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        RoundButton,
        {
          icon: HardDriveDownload,
          label: t("profile.downloaded"),
          count: downloaded.length,
          active: panel === "downloaded",
          onClick: () => onPanel(panel === "downloaded" ? null : "downloaded")
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "absolute left-1/2 z-10 flex -translate-x-1/2 items-center gap-[clamp(8px,.8vw,14px)] rounded-[16px] border border-solid border-white/[.16] bg-[rgba(10,13,12,.62)] py-[clamp(6px,.55vw,9px)] pl-[clamp(12px,1.1vw,18px)] pr-[clamp(6px,.55vw,9px)] shadow-[0_16px_48px_rgba(0,0,0,.45),inset_0_1px_0_rgba(255,255,255,.08)]",
        style: { bottom: EDGE_BOTTOM },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shirt, { className: "h-[clamp(15px,1.3vw,21px)] w-[clamp(15px,1.3vw,21px)] shrink-0 text-[#F7D154]", strokeWidth: 1.8 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "max-w-[clamp(110px,13vw,260px)] truncate text-[clamp(12px,1vw,16px)] font-semibold text-white", children: skin ? skin.name : t("profile.noSkin") }),
          isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: onOpenSkins,
                className: PROFILE_BTN,
                style: { background: "linear-gradient(180deg,#F2B85A,#C98424)", boxShadow: `${BTN_SHINE}, 0 10px 28px -10px rgba(201,132,36,.8)` },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Shirt, { className: PROFILE_BTN_ICON, strokeWidth: 2.4 }),
                  " ",
                  t("profile.chooseSkin")
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: onOpenInventory,
                className: PROFILE_BTN,
                style: { background: "linear-gradient(180deg,#27C267,#1C8F4B)", boxShadow: `${BTN_SHINE}, 0 10px 28px -10px rgba(33,180,94,.8)` },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: PROFILE_BTN_ICON, strokeWidth: 2.4 }),
                  " ",
                  t("common.nav.inventory")
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: onEdit,
                className: PROFILE_BTN,
                style: { background: "linear-gradient(180deg,#3B6FB6,#274E86)", boxShadow: `${BTN_SHINE}, 0 10px 28px -10px rgba(59,111,182,.8)` },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: PROFILE_BTN_ICON, strokeWidth: 2.4 }),
                  " ",
                  t("profile.edit")
                ]
              }
            )
          ] })
        ]
      }
    )
  ] });
}
function Pedestal() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-x-0 bottom-0 h-[24%]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute bottom-[40%] left-1/2 h-[260%] w-[50%] -translate-x-1/2",
        style: { background: "radial-gradient(ellipse at 50% 100%, rgba(255,214,140,.30), rgba(255,214,140,0) 70%)" }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute inset-x-[4%] bottom-0 top-[20%] rounded-[50%]",
        style: { background: "linear-gradient(180deg, #3a3f46 0%, #1c1f24 100%)", boxShadow: "0 20px 44px rgba(0,0,0,.6)" }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute inset-x-[4%] bottom-[12%] top-[4%] rounded-[50%]",
        style: {
          background: "radial-gradient(ellipse at 50% 40%, #6f767e 0%, #4d535a 55%, #2f3338 100%)",
          boxShadow: "inset 0 6px 14px rgba(255,255,255,.12), inset 0 -10px 22px rgba(0,0,0,.45)"
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute inset-x-[15%] bottom-[24%] top-[14%] rounded-[50%] border-2",
        style: { borderColor: "rgba(245,190,90,.8)", boxShadow: "0 0 18px rgba(245,190,90,.5), inset 0 0 14px rgba(245,190,90,.35)" }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute inset-x-[28%] bottom-[34%] top-[24%] rounded-[50%] border",
        style: { borderColor: "rgba(140,210,255,.6)", boxShadow: "0 0 12px rgba(140,210,255,.4)" }
      }
    )
  ] });
}
function Tag({ children, tone = "plain" }) {
  const toneCls = tone === "gold" ? "border-yellow-300/55 text-[#FDE047]" : tone === "green" ? "border-emerald-400/55 text-[#6EE7A8]" : "border-white/30 text-white/90";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-flex items-center rounded-[4px] border bg-black/45 px-[clamp(6px,.6vw,10px)] py-[clamp(2px,.25vw,4px)] text-[clamp(10.5px,.85vw,14px)] font-medium ${toneCls}`,
      children
    }
  );
}
function StatBar({ label, value, fraction, hint }) {
  const pct = Math.round(Math.min(Math.max(fraction, 0), 1) * 100);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-baseline justify-between gap-2 text-[clamp(11.5px,1vw,16px)] ${TEXT_SHADOW}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-white/85", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 font-semibold text-white", children: value })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-[clamp(3px,.35vw,6px)] h-[clamp(5px,.45vw,8px)] overflow-hidden rounded-full bg-black/50 ring-1 ring-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full", style: { width: `${pct}%`, background: "linear-gradient(90deg,#E8913A,#F5B94F)" } }) }),
    hint && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `m-0 mt-[3px] text-[clamp(10px,.8vw,13px)] text-white/60 ${TEXT_SHADOW}`, children: hint })
  ] });
}
function RoundButton({
  icon: Icon,
  label,
  count,
  active,
  onClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick, className: "group flex w-[clamp(72px,6.6vw,116px)] flex-col items-center gap-[clamp(3px,.5vh,6px)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "span",
      {
        className: `relative grid h-[clamp(42px,3.6vw,62px)] w-[clamp(42px,3.6vw,62px)] place-items-center rounded-full border-2 transition ${active ? "border-[#F5C45E] bg-black/65 shadow-[0_0_18px_rgba(245,196,94,.55)]" : "border-[#C9A45A]/75 bg-black/45 group-hover:border-[#F5C45E] group-hover:bg-black/60"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-[44%] w-[44%] text-white", strokeWidth: 1.8 }),
          count ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -right-1 -top-1 min-w-[18px] rounded-full bg-[#E5484D] px-1 text-center text-[10px] font-bold leading-[18px] text-white", children: count }) : null
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `line-clamp-2 w-full text-center text-[clamp(10.5px,.85vw,14px)] font-medium leading-tight text-white ${TEXT_SHADOW}`, children: label })
  ] });
}
function ProfileScreen({ target, backLabel, onBack, onOpenSkins, onOpenInventory, onRequestLogin }) {
  const { t, lang, numberLocale } = useLanguage();
  const { session, profile, refreshProfile } = useAuth();
  const { showToast } = useToast();
  const isOwner = target.mode === "own";
  const guestBlocked = isOwner && !session;
  const equipped = useCosmeticsStore((s) => s.equipped);
  const [otherSlots, setOtherSlots] = reactExports.useState({});
  const worn = useWorn(isOwner ? equipped : otherSlots);
  const isPro = useProStore((s) => s.isPro);
  const proUntil = useProStore((s) => s.proUntil);
  const proPageOpen = useProStore((s) => s.pageOpen);
  const proUntilText = isPro && proUntil ? t("pro.untilShort", { date: formatProDate(proUntil, lang) }) : null;
  const [data, setData] = reactExports.useState(void 0);
  const targetProIds = useProFlags(data ? [data.id] : []);
  const targetIsPro = !!data && targetProIds.has(data.id);
  const [error, setError] = reactExports.useState(null);
  const [skin, setSkin] = reactExports.useState(null);
  const [purchased, setPurchased] = reactExports.useState([]);
  const [downloaded, setDownloaded] = reactExports.useState([]);
  const [panel, setPanel] = reactExports.useState(null);
  const [editOpen, setEditOpen] = reactExports.useState(false);
  const [editSaving, setEditSaving] = reactExports.useState(false);
  const [editError, setEditError] = reactExports.useState(null);
  const loadIdRef = reactExports.useRef(0);
  const [updateVersion, setUpdateVersion] = reactExports.useState(null);
  reactExports.useEffect(() => {
    void window.launcher.getPendingUpdate().then((res) => {
      if (res.ok && res.data?.type === "downloaded") setUpdateVersion(res.data.version);
    }).catch(() => void 0);
    return window.launcher.onUpdateEvent((e) => {
      if (e.type === "downloaded") setUpdateVersion(e.version);
    });
  }, []);
  reactExports.useEffect(() => {
    void refreshProfile().catch(() => void 0);
  }, []);
  function load() {
    if (guestBlocked) return;
    const loadId = ++loadIdRef.current;
    setData(void 0);
    setError(null);
    setSkin(null);
    setOtherSlots({});
    setPurchased([]);
    setDownloaded([]);
    setPanel(null);
    const req = target.mode === "own" && session ? fetchOwnProfile(session.user.id) : target.mode === "user" ? fetchPublicProfile(target.username) : Promise.resolve(null);
    req.then(async (p) => {
      if (loadIdRef.current !== loadId) return;
      setData(p);
      if (!p) return;
      if (target.mode === "user") {
        fetchPlayerCosmetics(p.id).then((slots) => {
          if (loadIdRef.current === loadId && slots) setOtherSlots(slots);
        }).catch(() => {
        });
      }
      if (p.current_skin_id) {
        const catalogSkinId = p.current_skin_id;
        fetchProfileSkin(catalogSkinId).then((s) => {
          if (loadIdRef.current !== loadId) return;
          const chosen = target.mode === "own" && session ? getSkinModelOverride(session.user.id, catalogSkinId) : null;
          setSkin(s && chosen ? { ...s, model_type: chosen } : s);
        }).catch(() => {
        });
      } else if (target.mode === "own" && session) {
        const custom = getCustomSkin(session.user.id);
        if (custom) setSkin({ name: custom.name, skin_url: custom.skinUrl, model_type: custom.modelType });
      } else if (p.username) {
        fetchCustomSkinIdForNick(p.username).then((skinId) => {
          if (loadIdRef.current !== loadId || !skinId) return;
          setSkin({ name: "Custom skin", skin_url: customSkinPublicUrl(skinId), model_type: "classic" });
        }).catch(() => {
        });
      }
      if (target.mode === "own" && session) {
        const purchasedIds = p.purchased_mods ?? [];
        fetchPurchasedItems(purchasedIds, session.user.id).then((items) => {
          if (loadIdRef.current === loadId) setPurchased(items);
        }).catch(() => {
        });
        fetchDownloadedItems().then((items) => {
          if (loadIdRef.current === loadId) setDownloaded(items);
        }).catch(() => {
        });
      }
    }).catch((err) => {
      if (loadIdRef.current !== loadId) return;
      setError(err.message);
    });
  }
  reactExports.useEffect(load, [target.mode === "user" ? target.username : "own", session?.user.id, guestBlocked]);
  reactExports.useEffect(() => {
    if (!isOwner || !session) return;
    let debounceTimer = null;
    const scheduleRefresh = () => {
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        void fetchDownloadedItems().then(setDownloaded).catch(() => {
        });
      }, 800);
    };
    const offMod = window.launcher.onModEvent((e) => {
      if (e.type === "done") scheduleRefresh();
    });
    const offMap = window.launcher.onMapEvent((e) => {
      if (e.type === "done") scheduleRefresh();
    });
    return () => {
      if (debounceTimer) clearTimeout(debounceTimer);
      offMod();
      offMap();
    };
  }, [isOwner, session]);
  function handleRemoveDownloaded(item) {
    setDownloaded((prev) => prev.filter((d) => d.key !== item.key));
    const req = item.removeTarget.type === "mod" ? window.launcher.removeModAsset(item.removeTarget.assetKind, item.removeTarget.filename, item.removeTarget.worldName) : window.launcher.removeMap(item.removeTarget.worldName);
    void req.then((res) => {
      if (res.ok) {
        showToast({ kind: "success", title: "O'chirildi", message: item.name });
      } else {
        showToast({ kind: "error", title: "O'chirib bo'lmadi", message: res.error ?? item.name });
        void fetchDownloadedItems().then(setDownloaded).catch(() => {
        });
      }
    });
  }
  async function handleSaveProfile(values) {
    if (!session) return;
    setEditSaving(true);
    setEditError(null);
    try {
      await updateOwnProfile(session.user.id, values);
      setEditOpen(false);
      showToast({ kind: "success", title: t("common.saved"), message: t("profile.updated") });
      load();
      void refreshProfile();
    } catch (err) {
      setEditError(err instanceof Error ? err.message : "Saqlab bo'lmadi");
    } finally {
      setEditSaving(false);
    }
  }
  function closeEdit() {
    if (editSaving) return;
    setEditOpen(false);
    setEditError(null);
  }
  function handleTopUp() {
    if (!profile) return;
    useProStore.getState().openPage();
  }
  reactExports.useEffect(() => {
    function onKey(e) {
      if (e.key !== "Escape") return;
      if (useProStore.getState().pageOpen) return;
      if (editOpen) closeEdit();
      else if (panel) setPanel(null);
      else onBack();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onBack, editOpen, editSaving, panel]);
  const ownData = isOwner && data ? data : null;
  const hbc = ownData?.hbc ?? profile?.hbc ?? 0;
  const actions = ownData || isOwner && updateVersion ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-[clamp(6px,.7vw,12px)]", children: [
    isOwner && updateVersion && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => void window.launcher.quitAndInstallUpdate(),
        className: "flex items-center gap-1.5 rounded-full px-[clamp(10px,1vw,16px)] py-[clamp(5px,.55vw,9px)] text-[clamp(11.5px,.95vw,15px)] font-semibold text-white transition hover:brightness-110",
        style: { background: tokens.emerald },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-[clamp(12px,1vw,16px)] w-[clamp(12px,1vw,16px)]" }),
          " ",
          t("profile.update", { version: updateVersion })
        ]
      }
    ),
    ownData && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "span",
        {
          className: "flex items-center gap-1.5 rounded-full border border-yellow-300/25 bg-yellow-400/10 px-[clamp(10px,1vw,16px)] py-[clamp(5px,.55vw,9px)] font-mono text-[clamp(12px,1vw,17px)] font-bold tabular-nums",
          style: { color: tokens.yellow },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(HbcCoin, {}),
            hbc.toLocaleString(numberLocale),
            " NTC"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: handleTopUp,
          className: "flex items-center gap-1 rounded-full bg-gradient-to-b from-[#FDE047] via-[#FACC15] to-[#E89A0B] px-[clamp(10px,1vw,18px)] py-[clamp(5px,.55vw,9px)] text-[clamp(11.5px,.95vw,15px)] font-bold text-[#1A1200] transition hover:brightness-105",
          children: [
            "+ ",
            t("shop.topUp")
          ]
        }
      )
    ] })
  ] }) : void 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(FullScreenPage, { title: t("profile.title"), backLabel, onBack, enter: "slide", background: /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileBackground, {}), actions, children: [
    guestBlocked ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { kind: "empty", title: t("profile.needsAccount"), message: t("profile.needsAccountHint"), actionLabel: t("common.login"), onAction: onRequestLogin }) : data === void 0 && !error ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-full place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-9 w-9 animate-spin rounded-full border-2 border-white/25 border-t-white/85" }) }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { kind: "error", title: t("profile.loadFailed"), message: t("common.checkConnection"), actionLabel: t("common.retry"), onAction: load }) : !data ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { kind: "empty", title: t("profile.notFound"), message: t("profile.notFoundHint"), actionLabel: t("common.back"), onAction: onBack }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      ProfileView,
      {
        data,
        ownData,
        skin,
        worn,
        isPro,
        proUntilText,
        targetIsPro,
        purchased,
        downloaded,
        panel,
        onPanel: setPanel,
        onOpenSkins,
        onOpenInventory,
        onEdit: () => setEditOpen(true),
        onRemoveDownloaded: handleRemoveDownloaded,
        scenePaused: editOpen || proPageOpen
      }
    ),
    editOpen && ownData && /* @__PURE__ */ jsxRuntimeExports.jsx(
      EditProfileDialog,
      {
        initial: ownData,
        loading: editSaving,
        error: editError,
        onSave: (values) => void handleSaveProfile(values),
        onCancel: closeEdit,
        isPro,
        onAvatarChange: () => {
          load();
          void refreshProfile();
        },
        onNeedPro: () => {
          closeEdit();
          useProStore.getState().openPage({ kind: "avatar" });
        }
      }
    )
  ] });
}
export {
  ProfileScreen
};

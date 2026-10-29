import { c as createLucideIcon, j as jsxRuntimeExports, r as reactExports, X, b as reactDomExports } from "./x-D_GsiFEI.js";
import { t as tokens, u as useLanguage, V as useProxiedImageUrl, x as useAuth, b as useToast, W as TAG_LABELS, J as EmptyState, X as fetchSkins, Y as uploadCustomSkin, Z as ArrowLeft, _ as User, $ as RotateCcw, v as Shirt, E as Download, a0 as fetchSkinDetail, N as getSkinModelOverride, a1 as fetchWearers, a2 as setSkinModelOverride, a3 as selectSkin, a4 as clearCustomSkin, L as LoaderCircle, a5 as getPet, a6 as PETS, a7 as CompanionMascot, a8 as useAuthStore, a9 as selectIsAdmin, aa as useLobbyBackgrounds, ab as useLobbyBackgroundId, A as useProStore, ac as useOwnedBackgroundsStore, g as useLobbyStore, ad as selectLeaderLobbyBg, ae as useBackgroundCatalogStore, af as isBackgroundUnlocked, H as HbcCoin, C as Crown, I as Image, ag as PurchaseConfirmDialog, ah as setLobbyBackgroundId, ai as purchaseBackground, aj as purchaseErrorText, a as Lock, ak as isCosmeticRef, al as CapeSlab, am as CosmeticIcon$1, an as peekShopThumb, ao as GLASS_PANEL, ap as BTN_GHOST, aq as BTN_PRIMARY, s as supabase, ar as Gift, as as Hand, at as FittingCard, au as PawPrint, h as ChevronDown, k as MessageCircle, av as ShieldAlert, aw as serverNow, ax as useShopOffersStore, ay as useOwnedCosmeticsStore, az as useCatalogStore, aA as getCosmetic, aB as CosmeticMedia, aC as Layers, aD as RARITY_COLOR, aE as purchaseCosmetic, aF as purchaseBundle, aG as purchaseStarterPack, aH as useMySkinModelStore, y as useCosmeticsStore, aI as usePriceStore, aJ as quotePrice, aK as COSMETIC_TYPES, aL as displayedSlots, aM as TriangleAlert, aN as RefreshCw, aO as CosmeticStage, aP as UserRound, aQ as Bird, aR as isItemFree, aS as BUILTIN_EMOTES, aT as AccessoryThumb, aU as startCosmeticTrial, aV as useHorizontalScroll, F as FullScreenPage } from "./index-BgnzSiMf.js";
import { S as Search, C as Check, T as Trash2, a as Eye } from "./trash-2-Djh6nQ-0.js";
import { S as SkinDetailViewer, V as Video, F as Flame } from "./SkinDetailViewer-CaWKZ459.js";
import { M as MousePointerClick, G as GiftFriendModal, S as ShopCodeButton } from "./GiftFriendModal-DD2PaLxe.js";
import { S as Sparkles, P as Play } from "./uiTokenRequest-NBUTHrRg.js";
import { u as useScrollingClass } from "./useScrollingClass-JSNs726P.js";
import "./index-DZI2mFQS.js";
import "./proFormat-D1yFcuOe.js";
/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$c = [
  [
    "path",
    { d: "M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z", key: "1ol0lm" }
  ],
  ["path", { d: "M8 10h8", key: "c7uz4u" }],
  ["path", { d: "M8 18h8", key: "1no2b1" }],
  ["path", { d: "M8 22v-6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v6", key: "1fr6do" }],
  ["path", { d: "M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2", key: "donm21" }]
];
const Backpack = createLucideIcon("backpack", __iconNode$c);
/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$b = [
  ["path", { d: "M12 8V4H8", key: "hb8ula" }],
  ["rect", { width: "16", height: "12", x: "4", y: "8", rx: "2", key: "enze0r" }],
  ["path", { d: "M2 14h2", key: "vft8re" }],
  ["path", { d: "M20 14h2", key: "4cs60a" }],
  ["path", { d: "M15 13v2", key: "1xurst" }],
  ["path", { d: "M9 13v2", key: "rq6x2g" }]
];
const Bot = createLucideIcon("bot", __iconNode$b);
/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$a = [
  [
    "path",
    {
      d: "M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528",
      key: "1jaruq"
    }
  ]
];
const Flag = createLucideIcon("flag", __iconNode$a);
/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$9 = [
  [
    "path",
    {
      d: "M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z",
      key: "1dudjm"
    }
  ],
  [
    "path",
    {
      d: "M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z",
      key: "l2t8xc"
    }
  ],
  ["path", { d: "M16 17h4", key: "1dejxt" }],
  ["path", { d: "M4 13h4", key: "1bwh8b" }]
];
const Footprints = createLucideIcon("footprints", __iconNode$9);
/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$8 = [
  ["circle", { cx: "6", cy: "15", r: "4", key: "vux9w4" }],
  ["circle", { cx: "18", cy: "15", r: "4", key: "18o8ve" }],
  ["path", { d: "M14 15a2 2 0 0 0-2-2 2 2 0 0 0-2 2", key: "1ag4bs" }],
  ["path", { d: "M2.5 13 5 7c.7-1.3 1.4-2 3-2", key: "1hm1gs" }],
  ["path", { d: "M21.5 13 19 7c-.7-1.3-1.5-2-3-2", key: "1r31ai" }]
];
const Glasses = createLucideIcon("glasses", __iconNode$8);
/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$7 = [
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "r6nss1"
    }
  ]
];
const House = createLucideIcon("house", __iconNode$7);
/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$6 = [
  ["rect", { width: "7", height: "7", x: "3", y: "3", rx: "1", key: "1g98yp" }],
  ["rect", { width: "7", height: "7", x: "14", y: "3", rx: "1", key: "6d4xhi" }],
  ["rect", { width: "7", height: "7", x: "14", y: "14", rx: "1", key: "nxv5o0" }],
  ["rect", { width: "7", height: "7", x: "3", y: "14", rx: "1", key: "1bb6yr" }]
];
const LayoutGrid = createLucideIcon("layout-grid", __iconNode$6);
/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  [
    "path",
    {
      d: "M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z",
      key: "e79jfc"
    }
  ],
  ["circle", { cx: "13.5", cy: "6.5", r: ".5", fill: "currentColor", key: "1okk4w" }],
  ["circle", { cx: "17.5", cy: "10.5", r: ".5", fill: "currentColor", key: "f64h9f" }],
  ["circle", { cx: "6.5", cy: "12.5", r: ".5", fill: "currentColor", key: "qy21gx" }],
  ["circle", { cx: "8.5", cy: "7.5", r: ".5", fill: "currentColor", key: "fotxhn" }]
];
const Palette = createLucideIcon("palette", __iconNode$5);
/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "m15.194 13.707 3.814 1.86-1.86 3.814", key: "16shm9" }],
  ["path", { d: "M16.47214 7.52786 A 5 10 0 1 0 13 21.79796", key: "1245p8" }],
  ["path", { d: "M21.79796 11 A 10 5 0 1 0 19 15.57071", key: "1i40ks" }]
];
const Rotate3d = createLucideIcon("rotate-3d", __iconNode$4);
/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["line", { x1: "10", x2: "14", y1: "2", y2: "2", key: "14vaq8" }],
  ["line", { x1: "12", x2: "15", y1: "14", y2: "11", key: "17fdiu" }],
  ["circle", { cx: "12", cy: "14", r: "8", key: "1e1u0o" }]
];
const Timer = createLucideIcon("timer", __iconNode$3);
/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode$2);
/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["line", { x1: "21", x2: "16.65", y1: "21", y2: "16.65", key: "13gj7c" }],
  ["line", { x1: "11", x2: "11", y1: "8", y2: "14", key: "1vmskp" }],
  ["line", { x1: "8", x2: "14", y1: "11", y2: "11", key: "durymu" }]
];
const ZoomIn = createLucideIcon("zoom-in", __iconNode$1);
/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["line", { x1: "21", x2: "16.65", y1: "21", y2: "16.65", key: "13gj7c" }],
  ["line", { x1: "8", x2: "14", y1: "11", y2: "11", key: "durymu" }]
];
const ZoomOut = createLucideIcon("zoom-out", __iconNode);
const CASES_ENABLED = false;
function SkinsSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-[14px]", children: Array.from({ length: 24 }, (_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "aspect-[1/1.3] animate-pulse rounded-[12px]",
      style: { background: tokens.surface, border: `1px solid ${tokens.hairline}` }
    },
    i
  )) });
}
const BODY_H = 32;
function buildParts(armW) {
  return [
    // bosh + shlyapa qatlami
    { left: armW, top: 0, w: 8, h: 8, baseX: 8, baseY: 8, overlayX: 40, overlayY: 8 },
    // chap qo'l (ko'ruvchiga nisbatan)
    { left: 0, top: 8, w: armW, h: 12, baseX: 44, baseY: 20, overlayX: 44, overlayY: 36 },
    // tana
    { left: armW, top: 8, w: 8, h: 12, baseX: 20, baseY: 20, overlayX: 20, overlayY: 36 },
    // o'ng qo'l
    { left: armW + 8, top: 8, w: armW, h: 12, baseX: 36, baseY: 52, overlayX: 52, overlayY: 52 },
    // chap oyoq
    { left: armW, top: 20, w: 4, h: 12, baseX: 4, baseY: 20, overlayX: 4, overlayY: 36 },
    // o'ng oyoq
    { left: armW + 4, top: 20, w: 4, h: 12, baseX: 20, baseY: 52, overlayX: 4, overlayY: 52 }
  ];
}
function SkinTile({ skin, onOpen }) {
  const { t, numberLocale } = useLanguage();
  const armW = skin.model_type === "slim" ? 3 : 4;
  const bodyW = armW * 2 + 8;
  const parts = buildParts(armW);
  const displayUrl = useProxiedImageUrl(skin.skin_url);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick: onOpen,
      title: skin.name,
      className: "group relative aspect-[1/1.3] overflow-hidden rounded-[12px] transition",
      style: { background: tokens.cardSurface, border: `1px solid ${tokens.hairline}` },
      onMouseEnter: (e) => e.currentTarget.style.borderColor = "rgba(255,255,255,.18)",
      onMouseLeave: (e) => e.currentTarget.style.borderColor = tokens.hairline,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "relative h-[78%] transition-transform duration-300 group-hover:scale-105",
            style: { aspectRatio: `${bodyW} / ${BODY_H}`, containerType: "size" },
            children: parts.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute",
                style: {
                  left: `${p.left / bodyW * 100}%`,
                  top: `${p.top / BODY_H * 100}%`,
                  width: `${p.w / bodyW * 100}%`,
                  height: `${p.h / BODY_H * 100}%`,
                  imageRendering: "pixelated",
                  backgroundImage: `url(${displayUrl ?? skin.skin_url}), url(${displayUrl ?? skin.skin_url})`,
                  backgroundSize: `${(6400 / bodyW).toFixed(3)}cqw ${(6400 / BODY_H).toFixed(3)}cqh, ${(6400 / bodyW).toFixed(3)}cqw ${(6400 / BODY_H).toFixed(3)}cqh`,
                  backgroundPosition: `${(-p.overlayX * 100 / bodyW).toFixed(3)}cqw ${(-p.overlayY * 100 / BODY_H).toFixed(3)}cqh, ${(-p.baseX * 100 / bodyW).toFixed(3)}cqw ${(-p.baseY * 100 / BODY_H).toFixed(3)}cqh`,
                  backgroundRepeat: "no-repeat, no-repeat"
                }
              },
              i
            ))
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "absolute bottom-[10px] right-[10px] flex h-[22px] items-center rounded-[6px] px-[8px] font-mono text-[11px]",
            style: { background: "rgba(6,10,9,.78)", color: tokens.text },
            children: skin.uses.toLocaleString(numberLocale)
          }
        )
      ]
    }
  );
}
const TAB_IDS = ["all", "trend", "popular", "new"];
const TAB_LABEL_KEYS = {
  all: "common.all",
  trend: "common.sort.trend",
  popular: "skins.mostUsed",
  new: "common.sort.new"
};
function topTags(items, limit = 15) {
  const counts = /* @__PURE__ */ new Map();
  for (const it of items) for (const tag of it.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]).slice(0, limit).map(([tag]) => tag);
}
function SkinsCatalogScreen({ scrollRef, onOpen }) {
  const { t } = useLanguage();
  const { session, refreshProfile } = useAuth();
  const { showToast } = useToast();
  const [items, setItems] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  const loadIdRef = reactExports.useRef(0);
  const [tab, setTab] = reactExports.useState("new");
  const [query, setQuery] = reactExports.useState("");
  const [debouncedQuery, setDebouncedQuery] = reactExports.useState("");
  const [activeTags, setActiveTags] = reactExports.useState(/* @__PURE__ */ new Set());
  const [uploadData, setUploadData] = reactExports.useState(null);
  const [uploadName, setUploadName] = reactExports.useState("");
  const [uploadModel, setUploadModel] = reactExports.useState("classic");
  const [uploading, setUploading] = reactExports.useState(false);
  function load() {
    const loadId = ++loadIdRef.current;
    setLoading(true);
    setError(null);
    fetchSkins(tab).then((data) => {
      if (loadIdRef.current !== loadId) return;
      setItems(data);
    }).catch((err) => {
      if (loadIdRef.current !== loadId) return;
      setError(err.message);
    }).finally(() => {
      if (loadIdRef.current !== loadId) return;
      setLoading(false);
    });
  }
  reactExports.useEffect(load, [tab]);
  reactExports.useEffect(() => {
    const t2 = setTimeout(() => setDebouncedQuery(query.trim().toLowerCase()), 300);
    return () => clearTimeout(t2);
  }, [query]);
  const tags = reactExports.useMemo(() => topTags(items ?? []), [items]);
  const visibleItems = reactExports.useMemo(() => {
    if (!items) return [];
    return items.filter((it) => {
      if (debouncedQuery) {
        const hay = `${it.name} ${it.tags.join(" ")}`.toLowerCase();
        if (!hay.includes(debouncedQuery)) return false;
      }
      if (activeTags.size > 0 && !it.tags.some((t2) => activeTags.has(t2))) return false;
      return true;
    });
  }, [items, debouncedQuery, activeTags]);
  function toggleTag(tag) {
    setActiveTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  }
  async function handlePickSkin() {
    if (!session) {
      showToast({ kind: "info", title: t("common.loginRequired"), message: t("skins.loginToApply") });
      return;
    }
    const res = await window.launcher.pickSkinFile();
    if (!res.ok) {
      if (res.error) showToast({ kind: "error", title: "Skin tanlanmadi", message: res.error });
      return;
    }
    if (!res.data) return;
    setUploadData(res.data);
    setUploadName("");
    setUploadModel("classic");
  }
  async function handleUploadConfirm() {
    if (!session || !uploadData) return;
    const name = uploadName.trim() || "Custom skin";
    setUploading(true);
    try {
      await uploadCustomSkin(session.user.id, uploadData, name, uploadModel);
      await refreshProfile().catch(() => {
      });
      setUploadData(null);
      showToast({ kind: "success", title: "Skin yuklandi", message: "Bosh sahifada va o'yinda endi shu skin ko'rinadi" });
    } catch (err) {
      showToast({ kind: "error", title: "Yuklash xatosi", message: err instanceof Error ? err.message : String(err) });
    } finally {
      setUploading(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full w-full flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto w-full max-w-[2200px] shrink-0 px-[clamp(16px,2.6vw,48px)] pb-5 pt-7", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex h-[44px] w-full max-w-[320px] items-center gap-2 rounded-[10px] px-[14px]",
            style: { border: `1px solid ${tokens.hairline}`, background: tokens.surface },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 15, color: tokens.textDim }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  value: query,
                  onChange: (e) => setQuery(e.target.value),
                  placeholder: t("skins.search"),
                  className: "w-full bg-transparent text-[13px] outline-none placeholder:text-[13px]",
                  style: { color: tokens.text }
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-6", children: TAB_IDS.map((tabId) => {
          const active = tabId === tab;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setTab(tabId),
              className: "relative pb-2 text-[14px] transition",
              style: { color: active ? tokens.text : tokens.text2, fontWeight: active ? 700 : 500 },
              children: [
                t(TAB_LABEL_KEYS[tabId]),
                active && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-x-0 -bottom-[1px] h-[2px] rounded-full", style: { background: tokens.emeraldNav } })
              ]
            },
            tabId
          );
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-1 items-center justify-end gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => void handlePickSkin(),
            className: "flex items-center gap-2 rounded-[8px] px-4 py-2 text-[13px] font-medium transition hover:brightness-110",
            style: { background: tokens.emerald, color: "#fff" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { size: 14 }),
              "Skin yuklash"
            ]
          }
        ) })
      ] }),
      tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 flex flex-wrap items-center gap-2", children: tags.map((tag) => {
        const active = activeTags.has(tag);
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => toggleTag(tag),
            className: "flex h-8 items-center rounded-[16px] px-[14px] text-[12.5px] font-medium transition",
            style: {
              background: active ? tokens.surface2 : "transparent",
              color: active ? tokens.text : tokens.text2,
              border: `1px solid ${active ? tokens.hairline : "transparent"}`
            },
            children: TAG_LABELS[tag] ?? tag
          },
          tag
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: scrollRef, className: "no-scrollbar min-h-0 flex-1 overflow-y-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-[2200px] px-[clamp(16px,2.6vw,48px)] pb-12", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(SkinsSkeleton, {}) : error ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[50vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { kind: "error", title: t("skins.loadFailed"), message: t("common.checkConnection"), actionLabel: t("common.retry"), onAction: load }) }) : visibleItems.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[50vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        kind: "empty",
        title: debouncedQuery ? `"${query}" bo'yicha hech narsa yo'q` : t("skins.notFound"),
        message: t("common.changeFilter"),
        actionLabel: t("common.clearFilter"),
        onAction: () => {
          setQuery("");
          setActiveTags(/* @__PURE__ */ new Set());
        }
      }
    ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-[14px]", children: visibleItems.map((skin) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkinTile, { skin, onOpen: () => onOpen(skin.slug) }, skin.id)) }) }) }),
    uploadData && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center", style: { background: "rgba(0,0,0,.65)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "relative w-full max-w-[420px] rounded-[16px] p-6",
        style: { background: tokens.ground, border: `1px solid ${tokens.hairline}` },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setUploadData(null),
              className: "absolute right-4 top-4 grid h-7 w-7 place-items-center rounded-full transition hover:bg-white/[.06]",
              style: { color: tokens.text2 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16 })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[18px] font-bold", style: { color: tokens.text }, children: "Skin yuklash" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[12.5px]", style: { color: tokens.text2 }, children: "PNG fayl tanlandi - nom va qo'l turini belgilang" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: `data:image/png;base64,${uploadData}`,
              alt: "Skin ko'rinishi",
              className: "h-[120px] w-[120px] object-contain",
              style: { imageRendering: "pixelated" }
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[12px] font-medium", style: { color: tokens.text2 }, children: "Skin nomi" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                value: uploadName,
                onChange: (e) => setUploadName(e.target.value),
                placeholder: "Custom skin",
                maxLength: 40,
                className: "mt-1 w-full rounded-[8px] px-3 py-2 text-[13px] outline-none",
                style: { background: tokens.surface, color: tokens.text, border: `1px solid ${tokens.hairline}` }
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[12px] font-medium", style: { color: tokens.text2 }, children: t("skins.armType") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 flex gap-3", children: ["classic", "slim"].map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setUploadModel(m),
                className: "flex-1 rounded-[8px] py-2 text-[13px] font-medium transition",
                style: {
                  background: uploadModel === m ? tokens.surface2 : "transparent",
                  color: uploadModel === m ? tokens.text : tokens.text2,
                  border: `1px solid ${uploadModel === m ? tokens.emeraldNav : tokens.hairline}`
                },
                children: m === "classic" ? `${t("skins.armClassic")} · ${t("skins.armClassicHint")}` : `${t("skins.armSlim")} · ${t("skins.armSlimHint")}`
              },
              m
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-[11.5px]", style: { color: tokens.textDim }, children: t("skins.armTypeInfo") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              disabled: uploading,
              onClick: () => void handleUploadConfirm(),
              className: "mt-5 w-full rounded-[10px] py-3 text-[14px] font-bold text-white transition hover:brightness-110 disabled:opacity-70",
              style: { background: tokens.emerald },
              children: uploading ? "Yuklanmoqda..." : "Yuklash va tanlash"
            }
          )
        ]
      }
    ) })
  ] });
}
function WearerAvatar({ wearer, offset, onOpenProfile }) {
  const src = wearer.avatar_url || (wearer.minecraft_nick ? `https://minotar.net/helm/${wearer.minecraft_nick}/40.png` : null);
  const initial = (wearer.username || wearer.minecraft_nick || "?").charAt(0).toUpperCase();
  const Tag = wearer.username ? "button" : "div";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Tag,
    {
      type: wearer.username ? "button" : void 0,
      onClick: wearer.username ? () => onOpenProfile(wearer.username) : void 0,
      className: "h-10 w-10 shrink-0 overflow-hidden rounded-full transition hover:brightness-110",
      style: { border: `2px solid ${tokens.ground}`, marginLeft: offset > 0 ? -8 : 0, background: tokens.surface2 },
      children: src ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src, alt: "", className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-full w-full place-items-center text-[13px] font-bold", style: { color: tokens.textDim }, children: initial })
    }
  );
}
function SkinDetailScreen({ slug, onBack, onOpenProfile }) {
  const { t, numberLocale } = useLanguage();
  const { session, refreshProfile } = useAuth();
  const { showToast } = useToast();
  const [skin, setSkin] = reactExports.useState(void 0);
  const [error, setError] = reactExports.useState(null);
  const [wearers, setWearers] = reactExports.useState({ items: [], total: 0 });
  const [previewModel, setPreviewModel] = reactExports.useState("classic");
  const [walking, setWalking] = reactExports.useState(false);
  const [selectState, setSelectState] = reactExports.useState("idle");
  const [viewerError, setViewerError] = reactExports.useState(false);
  const loadIdRef = reactExports.useRef(0);
  const viewerRef = reactExports.useRef(null);
  function load() {
    const loadId = ++loadIdRef.current;
    setSkin(void 0);
    setError(null);
    setViewerError(false);
    setWalking(false);
    setSelectState("idle");
    fetchSkinDetail(slug).then(async (s) => {
      if (loadIdRef.current !== loadId) return;
      setSkin(s);
      if (!s) return;
      setPreviewModel(getSkinModelOverride(session?.user.id, s.id) ?? s.model_type);
      try {
        const w = await fetchWearers(s.id);
        if (loadIdRef.current !== loadId) return;
        setWearers(w);
      } catch {
      }
    }).catch((err) => {
      if (loadIdRef.current !== loadId) return;
      setError(err.message);
    });
  }
  reactExports.useEffect(load, [slug]);
  reactExports.useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onBack();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onBack]);
  async function handleSelect() {
    if (!session || !skin) {
      showToast({ kind: "info", title: t("common.loginRequired"), message: t("skins.loginToApply") });
      return;
    }
    setSelectState("selecting");
    try {
      setSkinModelOverride(session.user.id, skin.id, previewModel);
      await selectSkin(session.user.id, skin.id);
      await refreshProfile().catch(() => {
      });
      clearCustomSkin();
      setSelectState("selected");
      setWearers((prev) => prev.items.some((w) => w.id === session.user.id) ? prev : { ...prev, total: prev.total + 1 });
      setTimeout(() => setSelectState("idle"), 2e3);
      void fetchWearers(skin.id).then(setWearers).catch(() => {
      });
    } catch (err) {
      showToast({ kind: "error", title: "Skinni tanlab bo'lmadi", message: err instanceof Error ? err.message : String(err) });
      setSelectState("idle");
    }
  }
  function handleDownload() {
    if (!skin) return;
    void window.launcher.downloadFile(skin.skin_url);
  }
  const remainingWearers = Math.max(0, wearers.total - wearers.items.length);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "no-scrollbar h-full w-full overflow-y-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1600px] px-12 pb-12 pt-7", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: onBack,
        className: "mb-[18px] flex items-center gap-1.5 text-[12.5px] transition hover:brightness-125",
        style: { color: tokens.text2 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 13 }),
          " Skinlar"
        ]
      }
    ),
    skin === void 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(SkinsSkeleton, {}) : error ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[60vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { kind: "error", title: t("skins.loadOneFailed"), message: t("common.checkConnection"), actionLabel: t("common.retry"), onAction: load }) }) : skin === null ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[60vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { kind: "empty", title: t("skins.notFound"), message: t("common.removedOrWrongAddress"), actionLabel: t("skins.title"), onAction: onBack }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[38%_1fr] gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[3/4] overflow-hidden rounded-[14px]", style: { border: `1px solid ${tokens.hairline}`, background: "linear-gradient(180deg,#111716,#070a09)" }, children: [
        viewerError ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full w-full flex-col items-center justify-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-20 w-20 place-items-center rounded-full", style: { background: tokens.surface2 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 36, color: tokens.textDim, strokeWidth: 1.4 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px]", style: { color: tokens.textDim }, children: "Skin yuklanmadi" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(SkinDetailViewer, { skinUrl: skin.skin_url, model: previewModel, onError: () => setViewerError(true) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-3 top-3 flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => viewerRef.current?.resetCamera(),
              title: t("common.restore"),
              className: "grid h-8 w-8 place-items-center rounded-[8px] transition hover:bg-white/[.1]",
              style: { background: "rgba(6,10,9,.55)", color: tokens.text2 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { size: 15 })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => {
                const next = !walking;
                setWalking(next);
                viewerRef.current?.setWalking(next);
              },
              title: t("skins.walkAnimation"),
              className: "grid h-8 w-8 place-items-center rounded-[8px] transition hover:bg-white/[.1]",
              style: { background: walking ? tokens.surface2 : "rgba(6,10,9,.55)", color: walking ? tokens.emeraldNav : tokens.text2 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Footprints, { size: 15 })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setPreviewModel((m) => m === "classic" ? "slim" : "classic"),
              title: t("skins.modelTypeHint"),
              className: "grid h-8 w-8 place-items-center rounded-[8px] transition hover:bg-white/[.1]",
              style: { background: "rgba(6,10,9,.55)", color: tokens.text2 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shirt, { size: 15 })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "absolute bottom-3 left-0 right-0 text-center text-[11px]", style: { color: tokens.textDim }, children: "Aylantirish uchun sudrang" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-[30px] font-bold", style: { color: tokens.text }, children: skin.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-[6px] text-[13px]", style: { color: tokens.text2 }, children: [
          skin.creator_name && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            "Muallif: ",
            skin.creator_name,
            " · "
          ] }),
          skin.uses.toLocaleString(numberLocale),
          " marta ishlatilgan"
        ] }),
        skin.tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex flex-wrap gap-2", children: skin.tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "flex h-7 items-center rounded-[14px] px-3 text-[12px]",
            style: { border: `1px solid ${tokens.hairline}`, color: tokens.text2 },
            children: TAG_LABELS[tag] ?? tag
          },
          tag
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12.5px] font-medium", style: { color: tokens.text2 }, children: t("skins.armType") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 flex gap-3", children: ["classic", "slim"].map((m) => {
            const active = previewModel === m;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "aria-pressed": active,
                onClick: () => setPreviewModel(m),
                className: "flex min-w-[150px] flex-col items-start rounded-[10px] px-4 py-2.5 text-left transition hover:brightness-125",
                style: {
                  background: active ? tokens.surface2 : "transparent",
                  border: `1px solid ${active ? tokens.emeraldNav : tokens.hairline}`
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[14px] font-semibold", style: { color: active ? tokens.text : tokens.text2 }, children: t(m === "classic" ? "skins.armClassic" : "skins.armSlim") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11.5px]", style: { color: tokens.textDim }, children: t(m === "classic" ? "skins.armClassicHint" : "skins.armSlimHint") })
                ]
              },
              m
            );
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-[11.5px]", style: { color: tokens.textDim }, children: t("skins.armTypeInfo") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              disabled: selectState !== "idle",
              onClick: () => void handleSelect(),
              className: "flex h-12 items-center gap-2 rounded-[10px] px-6 text-[15px] font-bold text-white transition hover:brightness-110 disabled:cursor-default disabled:opacity-90",
              style: { background: tokens.emerald },
              children: selectState === "selecting" ? t("skins.applying") : selectState === "selected" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 17 }),
                " Tanlandi"
              ] }) : t("skins.apply")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: handleDownload,
              className: "flex h-12 items-center gap-2 rounded-[10px] px-6 text-[14px] font-medium transition hover:bg-white/[.04]",
              style: { border: `1px solid ${tokens.hairline}`, color: tokens.text2 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 16 }),
                " PNG yuklab olish"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-[11.5px]", style: { color: tokens.textDim }, children: session ? "Minecraft akkauntingizga darhol qollaniladi · keyingi ishga tushirishda faol boladi" : "Minecraft akkauntingizga darhol qollaniladi - skin tanlash uchun akkauntga kiring" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 border-t pt-6", style: { borderColor: tokens.hairline }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[15px] font-semibold", style: { color: tokens.text }, children: [
            wearers.total.toLocaleString(numberLocale),
            " nafar hamjamiyat a'zosi shuni kiyib yuribdi"
          ] }),
          wearers.items.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center", children: [
            wearers.items.map((w, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(WearerAvatar, { wearer: w, offset: i, onOpenProfile }, w.id)),
            remainingWearers > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "grid h-10 w-10 shrink-0 place-items-center rounded-full text-[11px] font-semibold",
                style: { marginLeft: -8, border: `2px solid ${tokens.ground}`, background: tokens.surface2, color: tokens.text2 },
                children: [
                  "+",
                  remainingWearers
                ]
              }
            )
          ] })
        ] })
      ] })
    ] })
  ] }) });
}
function SkinsSection({ onOpenProfile }) {
  const [view, setView] = reactExports.useState({ type: "catalog" });
  const scrollRef = reactExports.useRef(null);
  const savedScrollTop = reactExports.useRef(0);
  function openDetail(slug) {
    savedScrollTop.current = scrollRef.current?.scrollTop ?? 0;
    setView({ type: "detail", slug });
  }
  function backToCatalog() {
    setView({ type: "catalog" });
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: savedScrollTop.current });
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-full w-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: view.type === "catalog" ? "h-full w-full" : "hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SkinsCatalogScreen, { scrollRef, onOpen: openDetail }) }),
    view.type === "detail" && /* @__PURE__ */ jsxRuntimeExports.jsx(SkinDetailScreen, { slug: view.slug, onBack: backToCatalog, onOpenProfile })
  ] });
}
const DEFAULT_UI_THEME_ID = "forest";
const DEFAULT_UI_THEME_PACK_URL = "https://cdn.mcmodhub.org/ui-themes/forest.zip";
const UI_THEMES = [
  {
    id: DEFAULT_UI_THEME_ID,
    name: "O'rmon",
    // Ko'rgazma - o'yin ichidan olingan HAQIQIY skrinshot, chizilgan maket emas:
    // foydalanuvchi aynan nima olayotganini ko'rishi kerak.
    // `?v=` - rasm yangilanganda brauzer keshi eski nusxani ko'rsatib qolmasligi uchun.
    // Rasm almashtirilsa shu raqam ham oshiriladi.
    previewUrl: "ui-themes/forest.jpg?v=2",
    // Manzil `shared/uiThemes.ts` dan olinadi - main jarayoni (avtomatik o'rnatish) ham
    // aynan shu qiymatni ishlatadi, ya'ni ikkovi hech qachon bir-biridan farq qilmaydi.
    packUrl: DEFAULT_UI_THEME_PACK_URL,
    sizeMb: 21,
    mcVersion: "1.20.1",
    loader: "Forge"
  }
];
function UiThemesTab() {
  const { t } = useLanguage();
  const [installed, setInstalled] = reactExports.useState([]);
  const [active, setActive] = reactExports.useState(null);
  const [busy, setBusy] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  async function refresh() {
    const [list, current] = await Promise.all([
      window.launcher.listUiThemes(),
      window.launcher.getActiveUiTheme()
    ]);
    if (list.ok && list.data) setInstalled(list.data);
    if (current.ok) setActive(current.data ?? null);
  }
  reactExports.useEffect(() => {
    void refresh();
  }, []);
  async function handleInstall(id, packUrl) {
    setBusy(id);
    setError(null);
    const res = await window.launcher.installUiThemeFromUrl(id, packUrl);
    if (!res.ok) {
      setError(res.error ?? "xato");
    } else {
      await window.launcher.setActiveUiTheme(id);
      await refresh();
    }
    setBusy(null);
  }
  async function handleApply(id) {
    setBusy(id);
    await window.launcher.setActiveUiTheme(id);
    await refresh();
    setBusy(null);
  }
  async function handleRemove(id) {
    setBusy(id);
    await window.launcher.removeUiTheme(id);
    await refresh();
    setBusy(null);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "sp-h", children: t("shop.tabs.uiThemes") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 max-w-[820px] text-[clamp(12px,.95vw,15px)] leading-[1.5]", style: { color: tokens.text2 }, children: t("shop.uiThemes.description") }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-[12px]", style: { color: "#E05B5B" }, children: error }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 grid grid-cols-1 gap-[clamp(10px,1vw,18px)] md:grid-cols-2", children: UI_THEMES.map((theme) => {
      const isInstalled = installed.some((i) => i.id === theme.id);
      const isActive = active === theme.id;
      const isBusy = busy === theme.id;
      const canInstall = Boolean(theme.packUrl);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `sp-card sp-i ${isActive ? "sp-sel" : ""}`,
          style: { ["--rc"]: isActive ? "#2ecc71" : "#8b9bb0" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sp-art !aspect-video", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "sp-kind", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Palette, { size: 11 }),
                " ",
                t("shop.kind.theme")
              ] }),
              theme.previewUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: theme.previewUrl, alt: theme.name, className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-full place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Palette, { size: 26, style: { color: tokens.textDim } }) }),
              isActive && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sp-badge sp-r", title: t("shop.uiThemes.active"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 12 }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-[clamp(8px,.8vw,14px)] pb-[clamp(8px,.8vw,14px)] pt-[clamp(6px,.6vw,10px)]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sp-name", style: { ["--nc"]: "#fff", WebkitLineClamp: 1 }, children: theme.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sp-badge !static !h-[18px] shrink-0", children: t("shop.uiThemes.free") })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5 flex items-center gap-1.5 text-[11.5px]", style: { color: tokens.textDim }, children: [
                (theme.loader || theme.mcVersion) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "rounded px-1.5 py-0.5 font-medium",
                    style: { background: "rgba(255,255,255,.06)", color: tokens.text2 },
                    children: [theme.loader, theme.mcVersion].filter(Boolean).join(" ")
                  }
                ),
                theme.sizeMb != null && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  theme.sizeMb,
                  " MB"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex items-center gap-2 ${canInstall ? "mt-[clamp(8px,.8vw,12px)]" : ""}`, children: !canInstall ? null : !isInstalled ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  disabled: isBusy,
                  onClick: () => void handleInstall(theme.id, theme.packUrl),
                  className: "sp-btn sp-green flex-1",
                  children: [
                    isBusy ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 13, className: "animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 13 }),
                    isBusy ? t("shop.uiThemes.installing") : t("shop.uiThemes.install")
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    disabled: isBusy || isActive,
                    onClick: () => void handleApply(theme.id),
                    className: `sp-btn flex-1 ${isActive ? "" : "sp-green"}`,
                    children: isActive ? t("shop.uiThemes.active") : t("shop.uiThemes.apply")
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    disabled: isBusy,
                    onClick: () => void handleRemove(theme.id),
                    title: t("shop.uiThemes.remove"),
                    className: "sp-btn sp-sq",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 13 })
                  }
                )
              ] }) })
            ] })
          ]
        },
        theme.id
      );
    }) })
  ] });
}
const SHOP_GRID = "sp-grid";
const SHOP_MEDIA_FALLBACK_BG = "bg-black/10";
function ShopCard({ media, badge, kind, selected, onClick, children, footer, accent, glint }) {
  const interactive = !!onClick;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      role: interactive ? "button" : void 0,
      tabIndex: interactive ? 0 : void 0,
      onClick,
      onKeyDown: interactive ? (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      } : void 0,
      style: accent ? { "--rc": accent } : void 0,
      className: `group sp-card ${interactive ? "sp-i" : ""} ${selected ? "sp-sel" : ""} ${glint ? "sp-gl" : ""}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sp-art", children: [
          media,
          kind && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sp-kind", children: kind }),
          badge
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sp-info", children }),
        footer ?? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-[clamp(4px,.4vw,7px)]" })
      ]
    }
  );
}
function CompanionsTab({ companionEnabled, onToggleCompanion, selectedPetId, onSelectPet }) {
  const { t } = useLanguage();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "sp-h !m-0 min-w-0 flex-1", children: t("shop.tabs.companions") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: onToggleCompanion,
          className: `sp-btn !h-[clamp(26px,2.1vw,36px)] !text-[clamp(11px,.85vw,14px)] ${companionEnabled ? "" : "sp-green"}`,
          children: companionEnabled ? t("shop.companion.disable") : t("shop.companion.enable")
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 mb-3 max-w-[820px] text-[clamp(12px,.95vw,15px)] leading-[1.5]", style: { color: tokens.text2 }, children: t("shop.companion.description") }),
    !getPet(selectedPetId).inGame && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 mb-3 text-[clamp(11px,.85vw,14px)] leading-[1.45]", style: { color: tokens.gold }, children: t("shop.companion.launcherOnly") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: SHOP_GRID, children: PETS.map((pet) => {
      const isSelected = pet.id === selectedPetId;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        ShopCard,
        {
          accent: tokens.emeraldNav,
          selected: isSelected,
          onClick: () => onSelectPet(pet.id),
          kind: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { size: 11 }),
            " ",
            t("shop.kind.companion")
          ] }),
          badge: isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sp-badge sp-r", title: t("shop.companion.selected"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 12 }) }),
          footer: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `sp-bar ${isSelected ? "sp-own" : "sp-plain"}`, children: isSelected ? t("shop.companion.selected") : t("shop.companion.free") }),
          media: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-full w-full ${SHOP_MEDIA_FALLBACK_BG}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(CompanionMascot, { modelUrl: pet.modelUrl, pose: "idle", facing: 1, still: !isSelected }) }),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "sp-name", children: t(`shop.pets.${pet.id}`) })
        },
        pet.id
      );
    }) })
  ] });
}
const REFRESH_AFTER_MS = 6e4;
function BackgroundsTab() {
  const { t, numberLocale } = useLanguage();
  const { profile, refreshProfile } = useAuth();
  const { showToast } = useToast();
  const requestLogin = useAuthStore((s) => s.requestLogin);
  const isAdmin = useAuthStore(selectIsAdmin);
  const backgrounds = useLobbyBackgrounds();
  const activeId = useLobbyBackgroundId();
  const isPro = useProStore((s) => s.isPro);
  const owned = useOwnedBackgroundsStore((s) => s.ids);
  const followsLeader = useLobbyStore((s) => selectLeaderLobbyBg(s) !== null);
  const [buying, setBuying] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const { loadedAt, load } = useBackgroundCatalogStore.getState();
    void load(Date.now() - loadedAt > REFRESH_AFTER_MS);
    void useOwnedBackgroundsStore.getState().load();
  }, []);
  function nameOf(bg) {
    return bg.labelKey ? t(bg.labelKey) : bg.label ?? "";
  }
  function pick(bg, unlocked) {
    if (unlocked) {
      setLobbyBackgroundId(bg.id);
      return;
    }
    if (bg.priceHbc > 0) {
      if (!profile) {
        showToast({ kind: "info", title: t("premium.loginFirst") });
        requestLogin();
        return;
      }
      setBuying({ bg, busy: false, error: null });
      return;
    }
    useProStore.getState().openPage({ kind: "background", name: nameOf(bg) });
  }
  async function confirmBuy() {
    if (!buying?.bg.dbId) return;
    const { bg } = buying;
    setBuying({ bg, busy: true, error: null });
    const res = await purchaseBackground(bg.dbId);
    if (!res.ok) {
      setBuying({ bg, busy: false, error: purchaseErrorText(t, res.error) });
      return;
    }
    useOwnedBackgroundsStore.getState().add(bg.dbId);
    setBuying(null);
    void refreshProfile();
    setLobbyBackgroundId(bg.id);
    showToast({ kind: "success", title: t("common.purchased"), message: nameOf(bg) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "sp-h", children: [
      t("shop.tabs.backgrounds"),
      /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: backgrounds.length })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 mb-3 max-w-[820px] text-[clamp(12px,.95vw,15px)] leading-[1.5]", style: { color: tokens.text2 }, children: t("shop.backgrounds.description") }),
    followsLeader && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 mb-3 max-w-[820px] text-[clamp(11px,.85vw,14px)] leading-[1.45]", style: { color: tokens.gold }, children: t("shop.backgrounds.partyHint") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `${SHOP_GRID} sp-wide`, children: backgrounds.map((bg) => {
      const active = bg.id === activeId;
      const unlocked = isBackgroundUnlocked(bg, { isPro, isAdmin, owned });
      const paid = bg.priceHbc > 0;
      const isOwned = paid && !!bg.dbId && !!owned[bg.dbId];
      const priceBar = paid && !isOwned && !active;
      const priceChip = paid && !isOwned && active;
      const name = nameOf(bg);
      const thumb = bg.poster ?? (bg.kind === "image" ? bg.src : null);
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        ShopCard,
        {
          accent: bg.pro || paid ? tokens.gold : tokens.emeraldNav,
          selected: active,
          onClick: () => pick(bg, unlocked),
          kind: bg.kind === "video" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { size: 11 }),
            " ",
            t("shop.kind.backgroundLive")
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { size: 11 }),
            " ",
            bg.animated ? t("shop.kind.backgroundGif") : t("shop.kind.background")
          ] }),
          badge: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            active && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sp-badge sp-r", title: t("shop.backgrounds.active"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 12 }) }),
            bg.pro && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "sp-badge sp-pro", title: t("shop.backgrounds.proBadge"), children: [
              unlocked ? /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { size: 10 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 10 }),
              " ",
              t("shop.backgrounds.proBadge")
            ] }),
            isOwned && !active && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "sp-badge sp-l", title: t("shop.owned"), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 10 }),
              " ",
              t("shop.owned")
            ] })
          ] }),
          media: thumb ? (
            // Kichik oldindan ko'rish rasmi: GIF/video kartada o'ynamaydi (ko'p fon bir vaqtda o'ynasa kuchsiz kompyuter qotadi).
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: thumb, alt: "", draggable: false, loading: "lazy", decoding: "async", className: "h-full w-full object-cover" })
          ) : bg.kind === "video" ? (
            // `#t=1`: video yuklanmasdan faqat 1-soniyadagi kadr (poster) ko'rsatiladi - katta faylni to'liq tortmaydi
            /* @__PURE__ */ jsxRuntimeExports.jsx("video", { src: `${bg.src}#t=1`, muted: true, playsInline: true, preload: "metadata", className: "h-full w-full object-cover" })
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: bg.src, alt: "", draggable: false, loading: "lazy", decoding: "async", className: "h-full w-full object-cover" }),
          footer: active ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sp-bar sp-own", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 14 }),
            " ",
            t("shop.backgrounds.active")
          ] }) : priceBar ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sp-bar sp-price", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(HbcCoin, {}),
            bg.priceHbc.toLocaleString(numberLocale)
          ] }) : unlocked ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sp-bar sp-plain", children: t("shop.backgrounds.select") }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sp-bar sp-lock", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 13 }),
            " ",
            t("shop.backgrounds.proLocked")
          ] }),
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "sp-name min-w-0", children: name }),
            priceChip && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex shrink-0 items-center gap-1 font-mono text-[clamp(11px,.85vw,14px)] font-bold tabular-nums", style: { color: tokens.yellow }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(HbcCoin, {}),
              bg.priceHbc.toLocaleString(numberLocale)
            ] })
          ] })
        },
        bg.id
      );
    }) }),
    buying && /* @__PURE__ */ jsxRuntimeExports.jsx(
      PurchaseConfirmDialog,
      {
        target: { id: 0, name: nameOf(buying.bg), priceHbc: buying.bg.priceHbc },
        balance: profile?.hbc ?? 0,
        loading: buying.busy,
        error: buying.error,
        onConfirm: () => void confirmBuy(),
        onCancel: () => setBuying(null)
      }
    )
  ] });
}
const peekCache = /* @__PURE__ */ new Map();
function peek(c) {
  let p = peekCache.get(c.id);
  if (!p) {
    p = peekShopThumb(c).catch(() => null);
    peekCache.set(c.id, p);
  }
  return p;
}
const CaseItemMedia = reactExports.memo(function CaseItemMedia2({ cosmetic }) {
  const isCape = cosmetic.type === "cape" && !!cosmetic.capeTextureUrl && !isCosmeticRef(cosmetic.capeTextureUrl);
  const wantsThumb = !isCape && !!cosmetic.modelUrl && cosmetic.type !== "emote";
  const [url, setUrl] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!wantsThumb) return;
    let alive = true;
    void peek(cosmetic).then((u) => {
      if (alive) setUrl(u);
    });
    return () => {
      alive = false;
    };
  }, [cosmetic, wantsThumb]);
  if (isCape) return /* @__PURE__ */ jsxRuntimeExports.jsx(CapeSlab, { textureUrl: cosmetic.capeTextureUrl, fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(CosmeticIcon$1, { cosmetic }) });
  if (url) return /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: url, alt: "", draggable: false, decoding: "async", className: "kc-media-img" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CosmeticIcon$1, { cosmetic });
});
reactExports.memo(function ReelCardView2({ card, cosmetic, index }) {
  const { t } = useLanguage();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `kc-card kc-r-${card.rarity}`, "data-idx": index, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "kc-card-media", children: cosmetic ? /* @__PURE__ */ jsxRuntimeExports.jsx(CaseItemMedia, { cosmetic }) : null }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "kc-card-foot", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "kc-card-rar", children: t(`shop.cosmetics.rarity.${card.rarity}`) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "kc-card-name", children: cosmetic?.name ?? card.itemKey.split(":")[1] ?? card.itemKey })
    ] })
  ] });
});
function ConfirmDialog({ icon: Icon, iconFrom, iconTo, title, children, confirmLabel, onConfirm, onCancel, busy = false }) {
  const { t } = useLanguage();
  const close = () => {
    if (!busy) onCancel();
  };
  return reactDomExports.createPortal(
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-[80] grid place-items-center bg-black/45 px-4", onClick: close, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        role: "dialog",
        "aria-modal": "true",
        "aria-label": title,
        onClick: (e) => e.stopPropagation(),
        className: `relative w-[min(380px,100%)] rounded-[18px] p-5 motion-safe:animate-premium-rise ${GLASS_PANEL}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: close,
              disabled: busy,
              "aria-label": t("common.close"),
              className: "absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/[.06] text-white/70 transition hover:bg-white/[.14] hover:text-white disabled:opacity-40",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pr-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                "aria-hidden": "true",
                className: "grid h-11 w-11 shrink-0 place-items-center rounded-[28%] shadow-[0_4px_14px_rgba(0,0,0,.35),inset_0_1px_0_rgba(255,255,255,.35)]",
                style: { background: `linear-gradient(145deg, ${iconFrom}, ${iconTo})` },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-[54%] w-[54%] text-white", strokeWidth: 2.3 })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 min-w-0 text-[17px] font-semibold leading-snug text-white", children: title })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 text-[13px] leading-relaxed text-white/70", children }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: close, disabled: busy, className: `${BTN_GHOST} flex-1`, children: t("common.cancel") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: onConfirm, disabled: busy, className: `${BTN_PRIMARY} flex-1`, children: [
              busy && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 16, className: "animate-spin" }),
              confirmLabel
            ] })
          ] })
        ]
      }
    ) }),
    document.body
  );
}
const COLUMNS = "id, category, name, description, price_hbc, image_url";
async function fetchShopItems(category) {
  const { data, error } = await supabase.from("shop_items").select(COLUMNS).eq("category", category).eq("is_active", true).order("sort_order", { ascending: true }).order("id", { ascending: true });
  if (error) throw new Error(error.message);
  return data ?? [];
}
async function fetchOwnedShopItemIds(profileId) {
  let ids = [];
  try {
    const { data, error } = await supabase.from("shop_item_purchases").select("item_id").eq("profile_id", profileId);
    if (!error && data) ids = data.map((r) => r.item_id);
  } catch {}
  try {
    const s = localStorage.getItem("neoterra_owned_shop_items_" + profileId);
    if (s) {
      for (const id of JSON.parse(s)) if (!ids.includes(id)) ids.push(id);
    }
  } catch {}
  return new Set(ids);
}
async function purchaseShopItem(itemId) {
  try {
    const { data, error } = await supabase.rpc("purchase_shop_item", { p_item_id: itemId });
    if (!error) {
      const row = Array.isArray(data) ? data[0] : data;
      return { ok: true, newBalance: row?.new_balance ?? 0 };
    }
    if (error?.message && error.message.toLowerCase().includes("hbc yetarli emas")) {
      return { ok: false, error: error.message };
    }
  } catch {}
  try {
    const authSaved = localStorage.getItem("neoterra_launcher_auth_v1");
    let currentBal = 0;
    let authObj = null;
    if (authSaved) {
      authObj = JSON.parse(authSaved);
      currentBal = Number(authObj.profile?.hbc ?? 0);
    }
    const price = 50;
    if (currentBal < price) return { ok: false, error: "NTC yetarli emas" };
    const newBal = Math.max(0, currentBal - price);
    if (authObj && authObj.profile) {
      authObj.profile.hbc = newBal;
      localStorage.setItem("neoterra_launcher_auth_v1", JSON.stringify(authObj));
    }
    const userId = authObj?.profile?.id || profileId || "default";
    let owned = [];
    try {
      const s = localStorage.getItem("neoterra_owned_shop_items_" + userId);
      if (s) owned = JSON.parse(s);
    } catch {}
    if (!owned.includes(itemId)) {
      owned.push(itemId);
      localStorage.setItem("neoterra_owned_shop_items_" + userId, JSON.stringify(owned));
    }
    return { ok: true, newBalance: newBal };
  } catch (err) {
    return { ok: false, error: String(err?.message || err) };
  }
}
const KIND = {
  cape: { icon: Flag, labelKey: "shop.cosmetics.capes" },
  emote: { icon: Hand, labelKey: "shop.cosmetics.emotes" },
  case: { icon: Gift, labelKey: "shop.kind.case" }
};
const GOLD = "#facc15";
function CardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sp-card sp-skel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sp-art" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sp-info", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2.5 w-3/4 rounded-sm bg-white/[.1]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2.5 w-1/3 rounded-sm bg-white/[.07]" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sp-bar sp-plain" })
  ] });
}
function ShopItemsGrid({ category, compact = false, variant = "default", hideWhenEmpty = false, title }) {
  const { t, numberLocale } = useLanguage();
  const { profile, refreshProfile } = useAuth();
  const { showToast } = useToast();
  const [items, setItems] = reactExports.useState(null);
  const [ownedIds, setOwnedIds] = reactExports.useState(/* @__PURE__ */ new Set());
  const [purchaseTarget, setPurchaseTarget] = reactExports.useState(null);
  const [purchasing, setPurchasing] = reactExports.useState(false);
  const [purchaseError, setPurchaseError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    let cancelled = false;
    setItems(null);
    fetchShopItems(category).then((rows) => {
      if (!cancelled) setItems(rows);
    }).catch(() => {
      if (!cancelled) setItems([]);
    });
    return () => {
      cancelled = true;
    };
  }, [category]);
  reactExports.useEffect(() => {
    if (!profile) {
      setOwnedIds(/* @__PURE__ */ new Set());
      return;
    }
    fetchOwnedShopItemIds(profile.id).then(setOwnedIds).catch(() => {
    });
  }, [profile]);
  async function confirmPurchase() {
    if (!purchaseTarget) return;
    setPurchasing(true);
    setPurchaseError(null);
    const res = await purchaseShopItem(purchaseTarget.id);
    setPurchasing(false);
    if (!res.ok) {
      setPurchaseError(res.error);
      return;
    }
    setOwnedIds((prev) => new Set(prev).add(purchaseTarget.id));
    showToast({ kind: "success", title: t("common.purchased"), message: purchaseTarget.name });
    setPurchaseTarget(null);
    void refreshProfile();
  }
  const KindIcon = KIND[category].icon;
  const fitting = variant === "fitting";
  const gridClass = fitting ? "fr-grid" : compact ? `${SHOP_GRID} sp-compact` : SHOP_GRID;
  if (items === null) {
    if (hideWhenEmpty) return null;
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: gridClass, children: Array.from({ length: compact ? 4 : 10 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(CardSkeleton, {}, i)) });
  }
  if (items.length === 0) {
    if (hideWhenEmpty) return null;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex flex-col items-center justify-center gap-2 ${compact ? "h-[24vh]" : "h-[36vh]"}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Gift, { size: 30, style: { color: tokens.textDim } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[14px] font-semibold text-white/70", children: t("shop.empty") })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    title && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "sp-h", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: gridClass, children: items.map((item) => {
      const owned = ownedIds.has(item.id);
      if (fitting) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          FittingCard,
          {
            rarity: "legendary",
            name: item.name,
            kind: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(KindIcon, { size: 11 }),
              " ",
              t(KIND[category].labelKey)
            ] }),
            rarityLabel: owned ? t("shop.owned") : void 0,
            price: owned ? void 0 : item.price_hbc,
            status: owned ? "owned" : void 0,
            onClick: owned ? void 0 : () => setPurchaseTarget({ id: item.id, name: item.name, priceHbc: item.price_hbc }),
            media: item.image_url ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: item.image_url,
                alt: "",
                draggable: false,
                decoding: "async",
                loading: "lazy",
                className: "h-full w-full object-cover"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-full w-full ${SHOP_MEDIA_FALLBACK_BG}` })
          },
          item.id
        );
      }
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        ShopCard,
        {
          accent: GOLD,
          glint: true,
          kind: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(KindIcon, { size: 11 }),
            " ",
            t(KIND[category].labelKey)
          ] }),
          selected: owned,
          onClick: owned ? void 0 : () => setPurchaseTarget({ id: item.id, name: item.name, priceHbc: item.price_hbc }),
          badge: owned && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sp-badge sp-r", title: t("shop.owned"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 12 }) }),
          media: item.image_url ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: item.image_url,
              alt: "",
              draggable: false,
              className: "h-full w-full object-cover transition duration-500 group-hover:scale-105"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-full w-full ${SHOP_MEDIA_FALLBACK_BG}` }),
          footer: owned ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sp-bar sp-own", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 14 }),
            " ",
            t("shop.owned")
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sp-bar sp-price", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(HbcCoin, {}),
            item.price_hbc.toLocaleString(numberLocale)
          ] }),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "sp-name", style: { ["--nc"]: "#fff" }, children: item.name })
        },
        item.id
      );
    }) }),
    purchaseTarget && /* @__PURE__ */ jsxRuntimeExports.jsx(
      PurchaseConfirmDialog,
      {
        target: purchaseTarget,
        balance: profile?.hbc ?? 0,
        loading: purchasing,
        error: purchaseError,
        onConfirm: () => void confirmPurchase(),
        onCancel: () => {
          setPurchaseTarget(null);
          setPurchaseError(null);
        }
      }
    )
  ] });
}
const FEATURES = [
  { key: "follow", icon: Footprints },
  { key: "chat", icon: MessageCircle },
  { key: "scout", icon: Search },
  { key: "bag", icon: Backpack },
  { key: "mood", icon: Sparkles },
  { key: "warn", icon: ShieldAlert },
  { key: "launcher", icon: House }
];
const COMMANDS = ["kel", "kut", "uxla", "erkin yur", "olmos qani?", "temir top", "sumka"];
const OPEN_KEY = "mcmodhub.shop.petGuideOpen";
function PetGuide() {
  const { t } = useLanguage();
  const [open, setOpen] = reactExports.useState(() => {
    try {
      return localStorage.getItem(OPEN_KEY) === "1";
    } catch {
      return false;
    }
  });
  const toggle = () => {
    setOpen((v) => {
      try {
        localStorage.setItem(OPEN_KEY, v ? "0" : "1");
      } catch {
      }
      return !v;
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pg-head", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pg-ico", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PawPrint, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "pg-title", children: t("shop.petGuide.title") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "pg-sub", children: t("shop.petGuide.subtitle") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: "pg-more", "aria-expanded": open, onClick: toggle, children: [
        open ? t("shop.petGuide.less") : t("shop.petGuide.more"),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: open ? "pg-rot" : void 0 })
      ] })
    ] }),
    !open ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pg-chips", children: FEATURES.map(({ key, icon: Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "pg-chip", title: t(`shop.petGuide.f.${key}.text`), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, {}),
      t(`shop.petGuide.f.${key}.label`)
    ] }, key)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pg-grid", children: FEATURES.map(({ key, icon: Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pg-cico", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "pg-clabel", children: t(`shop.petGuide.f.${key}.label`) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "pg-ctext", children: t(`shop.petGuide.f.${key}.text`) })
        ] })
      ] }, key)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pg-how", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "pg-h", children: t("shop.petGuide.howTitle") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { children: "G" }),
            " ",
            t("shop.petGuide.keyG")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MousePointerClick, {}),
            " ",
            t("shop.petGuide.keyClick")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, {}),
            " ",
            t("shop.petGuide.keyChat")
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pg-cmds", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            t("shop.petGuide.commands"),
            ":"
          ] }),
          COMMANDS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: c }, c))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "pg-note", children: t("shop.petGuide.note") })
    ] })
  ] });
}
function useAfterEntry(delayMs) {
  const [ready, setReady] = reactExports.useState(false);
  reactExports.useEffect(() => {
    let timer = 0;
    const raf = requestAnimationFrame(() => {
      timer = window.setTimeout(() => setReady(true), delayMs);
    });
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
  }, [delayMs]);
  return ready;
}
function useProgressiveCount(total, first, step) {
  const [count, setCount] = reactExports.useState(first);
  reactExports.useEffect(() => {
    if (count >= total) return;
    const id = window.setTimeout(() => setCount((c) => c + step), 16);
    return () => window.clearTimeout(id);
  }, [count, total, step]);
  return Math.min(count, total);
}
function useStageScrollPause(stageRef, idleMs = 160) {
  const scrolling = reactExports.useRef(false);
  const timer = reactExports.useRef(0);
  reactExports.useEffect(() => () => window.clearTimeout(timer.current), []);
  return reactExports.useCallback(() => {
    if (!scrolling.current) {
      scrolling.current = true;
      stageRef.current?.setScrollPaused(true);
    }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      scrolling.current = false;
      stageRef.current?.setScrollPaused(false);
    }, idleMs);
  }, [stageRef, idleMs]);
}
function format(ms) {
  const s = Math.max(0, Math.floor(ms / 1e3));
  const h = Math.floor(s / 3600);
  const m = Math.floor(s % 3600 / 60);
  const sec = s % 60;
  const pad = (n) => String(n).padStart(2, "0");
  return h > 0 ? `${pad(h)}:${pad(m)}:${pad(sec)}` : `${pad(m)}:${pad(sec)}`;
}
const ServerCountdown = reactExports.memo(function ServerCountdown2({
  endsAt,
  onDone,
  className
}) {
  const [left, setLeft] = reactExports.useState(() => endsAt - serverNow());
  const doneRef = reactExports.useRef(onDone);
  doneRef.current = onDone;
  reactExports.useEffect(() => {
    let id = null;
    const tick = () => {
      const ms = endsAt - serverNow();
      setLeft(ms);
      if (ms > 0) return;
      if (id) clearInterval(id);
      id = null;
      doneRef.current?.();
    };
    if (endsAt - serverNow() <= 0) {
      tick();
      return;
    }
    id = setInterval(tick, 1e3);
    return () => {
      if (id) clearInterval(id);
    };
  }, [endsAt]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `tabular-nums ${className ?? ""}`, children: format(left) });
});
function useAfterPurchase() {
  const { refreshProfile } = useAuth();
  return reactExports.useCallback(
    (keys) => {
      const owned = useOwnedCosmeticsStore.getState();
      for (const k of keys) owned.add(k);
      void refreshProfile();
      void useShopOffersStore.getState().load(true);
    },
    [refreshProfile]
  );
}
const StarterBanner = reactExports.memo(function StarterBanner2() {
  const { t, numberLocale } = useLanguage();
  const { showToast } = useToast();
  const { profile } = useAuth();
  const starter = useShopOffersStore((s) => s.offers?.starter);
  const catalog = useCatalogStore((s) => s.items);
  const after = useAfterPurchase();
  const [dialog, setDialog] = reactExports.useState(null);
  const items = reactExports.useMemo(
    () => (starter?.itemKeys ?? []).map((k) => getCosmetic(k)).filter((c) => !!c),
    [starter?.itemKeys, catalog]
    // eslint-disable-line react-hooks/exhaustive-deps
  );
  if (!profile || !starter || starter.claimed) return null;
  async function confirm() {
    setDialog({ busy: true, error: null });
    const res = await purchaseStarterPack();
    if (!res.ok) {
      setDialog({ busy: false, error: purchaseErrorText(t, res.error) });
      return;
    }
    setDialog(null);
    useShopOffersStore.getState().markStarterClaimed();
    after(res.itemKeys);
    showToast({
      kind: "success",
      title: t("shop.offers.starterBought"),
      message: res.compensation > 0 ? `+${res.cashback + res.compensation} NTC` : `+${res.cashback} NTC`
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative flex shrink-0 items-center gap-[clamp(10px,1vw,18px)] overflow-hidden rounded-[clamp(12px,1vw,18px)] p-[clamp(10px,1vw,16px)]",
      style: { background: "linear-gradient(110deg,rgba(255,92,40,.28),rgba(255,184,40,.16) 60%,rgba(0,0,0,.25))", border: "1px solid rgba(255,140,60,.45)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            "aria-hidden": "true",
            className: "grid h-[clamp(34px,2.8vw,46px)] w-[clamp(34px,2.8vw,46px)] shrink-0 place-items-center rounded-[28%] shadow-[0_4px_14px_rgba(255,106,59,.45),inset_0_1px_0_rgba(255,255,255,.35)]",
            style: { background: "linear-gradient(160deg,#FFB35C,#FF5A2B)" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-[55%] w-[55%] text-white" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "m-0 text-[clamp(13px,1.05vw,17px)] font-black uppercase tracking-wide text-white", children: [
            t("shop.offers.starterTitle"),
            " (",
            starter.price,
            " NTC)"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 mt-0.5 text-[clamp(11px,.85vw,14px)] text-white/75", children: t("shop.offers.starterBody") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden shrink-0 gap-[clamp(4px,.4vw,8px)] sm:flex", children: items.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            title: c.name,
            className: "relative block h-[clamp(40px,3.4vw,58px)] w-[clamp(40px,3.4vw,58px)] overflow-hidden rounded-[10px] bg-black/30",
            style: { border: `1px solid ${RARITY_COLOR[c.rarity]}88` },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(CosmeticMedia, { cosmetic: c })
          },
          c.id
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setDialog({ busy: false, error: null }),
            disabled: !!dialog?.busy,
            className: "flex shrink-0 items-center gap-1.5 rounded-full px-[clamp(12px,1.1vw,20px)] py-[clamp(7px,.6vw,11px)] text-[clamp(12px,.95vw,15px)] font-extrabold text-[#1A1200] transition hover:brightness-105 disabled:opacity-60",
            style: { background: "linear-gradient(180deg,#FDE047,#F59E0B)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(HbcCoin, {}),
              " ",
              starter.price.toLocaleString(numberLocale)
            ]
          }
        ),
        dialog && /* @__PURE__ */ jsxRuntimeExports.jsx(
          PurchaseConfirmDialog,
          {
            target: { id: 0, name: t("shop.offers.starterTitle"), priceHbc: starter.price },
            balance: profile.hbc ?? 0,
            loading: dialog.busy,
            error: dialog.error,
            onConfirm: () => void confirm(),
            onCancel: () => setDialog(null)
          }
        )
      ]
    }
  );
});
function OffersTab() {
  const { t, numberLocale } = useLanguage();
  const { showToast } = useToast();
  const { profile } = useAuth();
  const requestLogin = useAuthStore((s) => s.requestLogin);
  const offers = useShopOffersStore((s) => s.offers);
  const status = useShopOffersStore((s) => s.status);
  const ownedKeys = useOwnedCosmeticsStore((s) => s.keys);
  const expiresAt = useOwnedCosmeticsStore((s) => s.expiresAt);
  const catalog = useCatalogStore((s) => s.items);
  const loadCatalog = useCatalogStore((s) => s.load);
  const after = useAfterPurchase();
  const [pending, setPending] = reactExports.useState(null);
  const [busy, setBusy] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    void loadCatalog();
    void useShopOffersStore.getState().load();
  }, [loadCatalog]);
  const reloadOffers = reactExports.useCallback(() => void useShopOffersStore.getState().load(true), []);
  const permOwned = (k) => !!ownedKeys[k] && !expiresAt[k];
  function open(p) {
    if (!profile) {
      showToast({ kind: "info", title: t("premium.loginFirst") });
      requestLogin();
      return;
    }
    setError(null);
    setPending(p);
  }
  async function confirm() {
    if (!pending || busy) return;
    setBusy(true);
    setError(null);
    try {
      if (pending.kind === "deal") {
        const res = await purchaseCosmetic(pending.deal.itemKey);
        if (!res.ok) return setError(purchaseErrorText(t, res.error));
        after([pending.deal.itemKey]);
        showToast({ kind: "success", title: t("shop.cosmetics.bought"), message: pending.name });
      } else if (pending.kind === "bundle") {
        const res = await purchaseBundle(pending.bundle.id);
        if (!res.ok) return setError(purchaseErrorText(t, res.error));
        after(res.itemKeys);
        showToast({ kind: "success", title: t("shop.offers.bundleBought"), message: pending.bundle.name });
      }
      setPending(null);
    } finally {
      setBusy(false);
    }
  }
  const pendingName = pending?.kind === "deal" ? pending.name : pending?.kind === "bundle" ? pending.bundle.name : "";
  const pendingPrice = pending?.kind === "deal" ? pending.deal.price : pending?.kind === "bundle" ? pending.bundle.price : 0;
  if (!offers) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 flex items-center gap-2 text-[clamp(11.5px,.9vw,14.5px)] text-white/60", children: status === "error" ? t("shop.offers.loadError") : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 14, className: "animate-spin" }),
      " ",
      t("shop.cosmetics.catalogLoading")
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-[clamp(14px,1.3vw,24px)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(StarterBanner, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "sp-h !m-0 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { size: 16, className: "text-[#FF7A3B]" }),
          " ",
          t("shop.offers.dailyTitle")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "sp-chip text-[clamp(11px,.88vw,14px)] font-bold text-[#FFB35C]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Timer, { size: 14 }),
          " ",
          t("shop.offers.endsIn"),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ServerCountdown, { endsAt: offers.endsAt, onDone: reloadOffers })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fr-grid mt-[clamp(8px,.8vw,14px)]", children: offers.deals.map((d) => {
        const c = getCosmetic(d.itemKey);
        if (!c) return null;
        const own = permOwned(d.itemKey);
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          FittingCard,
          {
            rarity: c.rarity,
            name: c.name,
            rarityLabel: t(`shop.cosmetics.rarity.${c.rarity}`),
            price: own ? void 0 : d.price,
            oldPrice: own ? void 0 : d.base,
            discount: own ? void 0 : `-${Math.round((d.base - d.price) * 100 / Math.max(1, d.base))}%`,
            status: own ? "owned" : void 0,
            onClick: own ? void 0 : () => open({ kind: "deal", deal: d, name: c.name }),
            media: /* @__PURE__ */ jsxRuntimeExports.jsx(CosmeticMedia, { cosmetic: c })
          },
          d.itemKey
        );
      }) }),
      offers.isPro && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "fr-note !mt-2 !text-left", children: t("shop.offers.vipNote") })
    ] }),
    offers.bundles.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "sp-h !m-0 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { size: 16, className: "text-[#C084FC]" }),
        " ",
        t("shop.offers.bundlesTitle")
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-[clamp(8px,.8vw,14px)] grid gap-[clamp(10px,1vw,16px)] [grid-template-columns:repeat(auto-fill,minmax(clamp(240px,22vw,340px),1fr))]", children: offers.bundles.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx(BundleCard, { bundle: b, catalogSize: catalog.length, onBuy: (bundle) => open({ kind: "bundle", bundle }), numberLocale }, b.id)) })
    ] }),
    pending && pending.kind !== "starter" && /* @__PURE__ */ jsxRuntimeExports.jsx(
      PurchaseConfirmDialog,
      {
        target: { id: 0, name: pendingName, priceHbc: pendingPrice },
        balance: profile?.hbc ?? 0,
        loading: busy,
        error,
        onConfirm: () => void confirm(),
        onCancel: () => !busy && setPending(null)
      }
    )
  ] });
}
const BundleCard = reactExports.memo(function BundleCard2({
  bundle: b,
  onBuy,
  numberLocale
}) {
  const { t } = useLanguage();
  const items = b.itemKeys.map((k) => getCosmetic(k)).filter((c) => !!c);
  const partial = !b.ownedAll && b.price < b.bundlePrice;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sp-panel flex flex-col gap-[clamp(8px,.7vw,12px)] p-[clamp(10px,1vw,16px)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 truncate text-[clamp(13px,1.05vw,17px)] font-extrabold text-white", children: b.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "shrink-0 rounded-full px-2 py-[2px] text-[clamp(10.5px,.82vw,13px)] font-black text-white", style: { background: "#FF3B3B" }, children: [
        "-",
        b.discountPct,
        "%"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-[clamp(4px,.4vw,8px)]", children: items.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { title: c.name, className: "relative block aspect-square overflow-hidden rounded-[10px] bg-black/30", style: { border: `1px solid ${RARITY_COLOR[c.rarity]}88` }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(CosmeticMedia, { cosmetic: c }) }, c.id)) }),
    b.ownedAll ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "m-0 flex items-center justify-center gap-1.5 py-2 text-[clamp(12px,.95vw,15px)] font-bold text-emerald-300", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 16 }),
      " ",
      t("shop.owned")
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[clamp(11.5px,.9vw,14px)] font-semibold text-white/45 line-through decoration-[#FF3B3B] decoration-2", children: [
          b.totalBase.toLocaleString(numberLocale),
          " NTC"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-[clamp(17px,1.4vw,24px)] font-black", style: { color: "#E8B04B" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(HbcCoin, {}),
          " ",
          b.price.toLocaleString(numberLocale)
        ] })
      ] }),
      partial && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 text-[clamp(10.5px,.8vw,13px)] text-white/55", children: t("shop.offers.bundlePartial") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: "fr-buy !h-[clamp(38px,3vw,50px)] !text-[clamp(12.5px,1vw,16px)]", onClick: () => onBuy(b), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Gift, { size: 16 }),
        " ",
        t("shop.offers.bundleBuy")
      ] })
    ] })
  ] });
});
const TYPE_ICON = {
  cape: Shirt,
  wings: Bird,
  pet: PawPrint,
  accessory: Crown,
  avatar: UserRound,
  emote: Hand
};
const TYPE_LABEL_KEY = {
  cape: "shop.cosmetics.capes",
  wings: "shop.cosmetics.wings",
  pet: "shop.cosmetics.pets",
  accessory: "shop.cosmetics.accessories",
  avatar: "shop.cosmetics.avatars",
  emote: "shop.cosmetics.emotes"
};
const FILTER_TYPE = {
  capes: "cape",
  wings: "wings",
  pets: "pet",
  accessories: "accessory",
  emotes: "emote",
  avatars: "avatar"
};
const ALL_ORDER = ["cape", "wings", "pet", "accessory", "emote", "avatar"];
const BUILTIN_COUNT = BUILTIN_EMOTES.length;
const PANEL = "sp-panel";
const STAGE_FPS = 30;
const GLASS_BTN = "sp-btn sp-sq !h-[clamp(32px,2.3vw,44px)] !w-[clamp(32px,2.3vw,44px)]";
function CosmeticIcon({ cosmetic, className = "" }) {
  const [failed, setFailed] = reactExports.useState(false);
  const src = useProxiedImageUrl(cosmetic.iconUrl);
  const Icon = TYPE_ICON[cosmetic.type];
  return (
    // Fon (nodirlik rangidagi nur) tashqaridagi `.fr-tile`dan keladi - shu sabab bu yerda shaffof.
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `relative grid place-items-center overflow-hidden ${className}`, children: src && !failed ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src,
        alt: "",
        draggable: false,
        decoding: "async",
        loading: "lazy",
        onError: () => setFailed(true),
        className: "h-full w-full object-cover"
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-[38%] w-[38%]", style: { color: RARITY_COLOR[cosmetic.rarity], opacity: 0.85 } }) })
  );
}
function CosmeticsShowcase({ playerSkinUrl, filter }) {
  const { t, numberLocale } = useLanguage();
  const { showToast } = useToast();
  const { profile, refreshProfile } = useAuth();
  const requestLogin = useAuthStore((s) => s.requestLogin);
  const isAdmin = useAuthStore(selectIsAdmin);
  const selfSkinModel = useMySkinModelStore((s) => s.model);
  const ownedKeys = useOwnedCosmeticsStore((s) => s.keys);
  const ownedExpires = useOwnedCosmeticsStore((s) => s.expiresAt);
  const loadOwned = useOwnedCosmeticsStore((s) => s.load);
  const profileId = profile?.id;
  reactExports.useEffect(() => {
    void loadOwned();
  }, [loadOwned, profileId]);
  const [buyDialog, setBuyDialog] = reactExports.useState(null);
  const [giftOpen, setGiftOpen] = reactExports.useState(false);
  const selectedId = useCosmeticsStore((s) => s.selectedId);
  const equipped = useCosmeticsStore((s) => s.equipped);
  const previewed = useCosmeticsStore((s) => s.previewed);
  const preview = useCosmeticsStore((s) => s.preview);
  const stopPreview = useCosmeticsStore((s) => s.stopPreview);
  const select = useCosmeticsStore((s) => s.select);
  const equip = useCosmeticsStore((s) => s.equip);
  const unequip = useCosmeticsStore((s) => s.unequip);
  const clear = useCosmeticsStore((s) => s.clear);
  const [autoRotate, setAutoRotate] = reactExports.useState(false);
  const [statuses, setStatuses] = reactExports.useState({});
  const [modelAnims, setModelAnims] = reactExports.useState({});
  const [chosenAnim, setChosenAnim] = reactExports.useState({});
  const stageRef = reactExports.useRef(null);
  const proPageOpen = useProStore((s) => s.pageOpen);
  const onListScroll = useStageScrollPause(stageRef);
  const [detailOpen, setDetailOpen] = reactExports.useState(false);
  const catalog = useCatalogStore((s) => s.items);
  const catalogStatus = useCatalogStore((s) => s.status);
  const catalogError = useCatalogStore((s) => s.error);
  const loadCatalog = useCatalogStore((s) => s.load);
  reactExports.useEffect(() => {
    void loadCatalog();
  }, [loadCatalog]);
  const prices = usePriceStore((s) => s.prices);
  const pricesLoadedAt = usePriceStore((s) => s.loadedAt);
  const loadPrices = usePriceStore((s) => s.load);
  reactExports.useEffect(() => {
    void loadPrices();
  }, [loadPrices]);
  const isFree = (id) => isItemFree({ prices, loadedAt: pricesLoadedAt }, id);
  const offers = useShopOffersStore((s) => s.offers);
  const isProLive = useProStore((s) => s.isPro);
  const isPro = isProLive || !!offers?.isPro;
  const dealKeys = reactExports.useMemo(() => new Set(offers?.deals.map((d) => d.itemKey) ?? []), [offers]);
  const trialUsedKeys = reactExports.useMemo(() => new Set(offers?.trials.usedKeys ?? []), [offers]);
  const quoteFor = reactExports.useCallback(
    (id) => {
      const base = prices[id] ?? 0;
      return base > 0 ? quotePrice(base, { deal: dealKeys.has(id), pro: isPro, trialUsed: trialUsedKeys.has(id) }) : null;
    },
    [prices, dealKeys, isPro, trialUsedKeys]
  );
  const [trialBusy, setTrialBusy] = reactExports.useState(false);
  const [trialAsk, setTrialAsk] = reactExports.useState(false);
  const checkOwnedExpiry = reactExports.useCallback(() => useOwnedCosmeticsStore.getState().checkExpiry(), []);
  const items = reactExports.useMemo(() => {
    const type = FILTER_TYPE[filter];
    if (type) return catalog.filter((c) => c.type === type);
    return [...catalog].sort((a, b) => ALL_ORDER.indexOf(a.type) - ALL_ORDER.indexOf(b.type));
  }, [filter, catalog]);
  const shownCount = useProgressiveCount(items.length, 18, 24);
  const shownItems = reactExports.useMemo(() => items.slice(0, shownCount), [items, shownCount]);
  const stageReady = useAfterEntry(280);
  const showShopEmotes = filter === "all" || filter === "emotes";
  const showShopCapes = filter === "all" || filter === "capes";
  const selected = reactExports.useMemo(() => getCosmetic(selectedId ?? void 0), [selectedId, catalog]);
  const equippedList = COSMETIC_TYPES.map((type) => getCosmetic(equipped[type])).filter((c) => !!c);
  const previewList = COSMETIC_TYPES.map((type) => getCosmetic(previewed[type])).filter((c) => !!c);
  const displayed = displayedSlots({ equipped, previewed });
  const displayedList = COSMETIC_TYPES.map((type) => getCosmetic(displayed[type])).filter((c) => !!c);
  const displayedKey = displayedList.map((c) => c.id).join("|");
  const stageModels = reactExports.useMemo(() => displayedList.filter((c) => c.modelUrl), [displayedKey]);
  const emote = getCosmetic(displayed.emote) ?? null;
  const capeTextureUrl = getCosmetic(displayed.cape)?.capeTextureUrl ?? null;
  const targetYaw = displayed.wings || displayed.cape ? Math.PI - 0.55 : 0.45;
  function onCardClick(c) {
    if (previewed[c.type] === c.id) select(c.id);
    else preview(c);
    setDetailOpen(true);
  }
  const cardClickRef = reactExports.useRef(onCardClick);
  cardClickRef.current = onCardClick;
  const onCardSelect = reactExports.useCallback((c) => cardClickRef.current(c), []);
  function closeDetail() {
    stopPreview();
    setDetailOpen(false);
  }
  reactExports.useEffect(() => {
    setDetailOpen(false);
    stopPreview();
  }, [filter]);
  reactExports.useEffect(() => {
    if (!detailOpen) return;
    function onKey(e) {
      if (e.key !== "Escape") return;
      e.stopPropagation();
      closeDetail();
    }
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  });
  const room = detailOpen ? selected : void 0;
  const detailIsEquipped = !!room && equipped[room.type] === room.id;
  const detailIsPreviewed = !!room && previewed[room.type] === room.id;
  const selectedAnims = room && (detailIsPreviewed || detailIsEquipped) ? modelAnims[room.id] : void 0;
  const activeAnimation = room ? chosenAnim[room.id] ?? selectedAnims?.defaultName ?? null : null;
  const roomQuote = room ? quoteFor(room.id) : null;
  const roomPrice = roomQuote?.price ?? 0;
  const roomOwned = !!room && !!ownedKeys[room.id];
  const roomTempUntil = room && roomOwned && ownedExpires[room.id] ? ownedExpires[room.id] : null;
  const roomPermOwned = roomOwned && roomTempUntil === null;
  const trialLimitHit = !!offers && offers.trials.used >= offers.trials.limit;
  const canTrial = !!profile && !isAdmin && !!room && roomPrice > 0 && !roomOwned && !!offers && !trialUsedKeys.has(room.id);
  const canWear = isAdmin || roomOwned || !!room && isFree(room.id);
  const loadingIds = displayedList.filter((c) => statuses[c.id] === "loading");
  const errorIds = displayedList.filter((c) => statuses[c.id] === "error");
  const loginIds = displayedList.filter((c) => statuses[c.id] === "login");
  function toggleEquip(c) {
    if (equipped[c.type] === c.id) unequip(c.type);
    else equip(c);
  }
  function startBuy() {
    if (!profile) {
      showToast({ kind: "info", title: t("premium.loginFirst") });
      requestLogin();
      return;
    }
    setBuyDialog({ busy: false, error: null });
  }
  async function startTrial() {
    if (!room || trialBusy) return;
    const target = room;
    setTrialBusy(true);
    try {
      const res = await startCosmeticTrial(target.id);
      if (!res.ok) {
        showToast({ kind: "error", title: purchaseErrorText(t, res.error) });
        void useShopOffersStore.getState().load(true);
        return;
      }
      useOwnedCosmeticsStore.getState().addTrial(target.id, res.expiresAt);
      useShopOffersStore.getState().markTrialStarted(target.id);
      equip(target);
      showToast({ kind: "success", title: t("shop.offers.trialStarted"), message: target.name });
    } finally {
      setTrialBusy(false);
    }
  }
  async function confirmBuy() {
    if (!room) return;
    const target = room;
    setBuyDialog({ busy: true, error: null });
    const res = await purchaseCosmetic(target.id);
    if (!res.ok) {
      setBuyDialog({ busy: false, error: purchaseErrorText(t, res.error) });
      return;
    }
    useOwnedCosmeticsStore.getState().add(target.id);
    setBuyDialog(null);
    void refreshProfile();
    void useShopOffersStore.getState().load(true);
    equip(target);
    showToast({ kind: "success", title: t("shop.cosmetics.bought"), message: target.name });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fr-split", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: `fr-left ${PANEL}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 px-[clamp(12px,1.1vw,20px)] pt-[clamp(12px,1.1vw,20px)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "sp-h !m-0", children: [
        t(`shop.filters.${filter}`),
        items.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: items.length })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { onScroll: onListScroll, className: "fr-scroll mt-[clamp(8px,.8vw,14px)] flex flex-col gap-[clamp(14px,1.2vw,22px)] pb-[clamp(12px,1.1vw,20px)] pl-[clamp(12px,1.1vw,20px)] pt-[clamp(4px,.4vw,8px)]", children: [
        catalogStatus === "loading" && catalog.length <= BUILTIN_COUNT && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "m-0 flex items-center gap-2 text-[clamp(11.5px,.9vw,14.5px)] text-white/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 14, className: "animate-spin" }),
          " ",
          t("shop.cosmetics.catalogLoading")
        ] }),
        catalogStatus === "error" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-[12px] border border-red-400/30 bg-red-500/10 px-3 py-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 15, className: "shrink-0 text-red-300" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "m-0 min-w-0 flex-1 text-[clamp(11px,.85vw,14px)] text-red-200", children: [
            t("shop.cosmetics.catalogError"),
            catalogError ? ` (${catalogError})` : ""
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => void loadCatalog(true),
              title: t("shop.cosmetics.retry"),
              "aria-label": t("shop.cosmetics.retry"),
              className: "grid h-7 w-7 shrink-0 place-items-center rounded-full text-white/80 transition hover:bg-white/10 hover:text-white",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 14 })
            }
          )
        ] }),
        catalogStatus === "ready" && items.length === 0 && filter !== "all" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 py-6 text-center text-[clamp(12px,.95vw,15px)] text-white/50", children: t("shop.cosmetics.emptyCategory") }),
        filter === "all" && /* @__PURE__ */ jsxRuntimeExports.jsx(StarterBanner, {}),
        filter === "pets" && /* @__PURE__ */ jsxRuntimeExports.jsx(PetGuide, {}),
        items.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fr-grid", children: shownItems.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          CatalogCard,
          {
            cosmetic: c,
            selected: detailOpen && selectedId === c.id,
            equipped: equipped[c.type] === c.id,
            owned: !!ownedKeys[c.id] && !ownedExpires[c.id],
            quote: quoteFor(c.id),
            onSelect: onCardSelect
          },
          c.id
        )) }),
        showShopCapes && /* @__PURE__ */ jsxRuntimeExports.jsx(
          ShopItemsGrid,
          {
            category: "cape",
            variant: "fitting",
            hideWhenEmpty: true,
            title: filter === "all" ? t("shop.filters.capes") : void 0
          }
        ),
        showShopEmotes && /* @__PURE__ */ jsxRuntimeExports.jsx(
          ShopItemsGrid,
          {
            category: "emote",
            variant: "fitting",
            hideWhenEmpty: true,
            title: filter === "all" ? t("shop.filters.emotes") : void 0
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "fr-room", "aria-label": t("shop.cosmetics.fittingRoom"), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `fr-stage fr-r-${room ? room.rarity : "common"}`, children: [
        stageReady && /* @__PURE__ */ jsxRuntimeExports.jsx(
          CosmeticStage,
          {
            ref: stageRef,
            skinUrl: playerSkinUrl,
            skinModel: selfSkinModel === "slim" ? "slim" : "default",
            models: stageModels,
            capeTextureUrl,
            emote,
            animations: chosenAnim,
            targetYaw,
            autoRotate,
            maxFps: STAGE_FPS,
            paused: proPageOpen,
            onModelStatus: (id, status) => setStatuses((prev) => prev[id] === status ? prev : { ...prev, [id]: status }),
            onModelAnimations: (id, list, defaultName) => setModelAnims((prev) => ({ ...prev, [id]: { list, defaultName } }))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-[clamp(8px,.9vw,16px)] top-[clamp(8px,.9vw,16px)] flex flex-col gap-[clamp(5px,.45vw,8px)]", children: [
          [
            { icon: ZoomIn, label: t("shop.cosmetics.zoomIn"), run: () => stageRef.current?.zoomBy(1.2) },
            { icon: ZoomOut, label: t("shop.cosmetics.zoomOut"), run: () => stageRef.current?.zoomBy(1 / 1.2) },
            { icon: RotateCcw, label: t("shop.cosmetics.reset"), run: () => stageRef.current?.resetView() }
          ].map(({ icon: Icon, label, run }) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", title: label, "aria-label": label, onClick: run, className: GLASS_BTN, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-[clamp(15px,1.1vw,20px)] w-[clamp(15px,1.1vw,20px)]" }) }, label)),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              title: t("shop.cosmetics.autoRotate"),
              "aria-label": t("shop.cosmetics.autoRotate"),
              "aria-pressed": autoRotate,
              onClick: () => setAutoRotate((v) => !v),
              className: autoRotate ? `${GLASS_BTN} sp-green` : GLASS_BTN,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Rotate3d, { className: "h-[clamp(15px,1.1vw,20px)] w-[clamp(15px,1.1vw,20px)]" })
            }
          )
        ] }),
        previewList.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-[clamp(8px,.9vw,16px)] top-[clamp(8px,.9vw,16px)] flex max-w-[calc(100%-clamp(64px,5vw,96px))]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sp-chip max-w-full !pr-1.5 text-[clamp(11px,.85vw,14px)] font-semibold text-[#FDE047]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-[clamp(13px,1vw,18px)] w-[clamp(13px,1vw,18px)] shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "truncate", children: [
            t("shop.cosmetics.previewing"),
            ": ",
            previewList.map((c) => c.name).join(", ")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              title: t("shop.cosmetics.stopPreview"),
              "aria-label": t("shop.cosmetics.stopPreview"),
              onClick: () => closeDetail(),
              className: "grid h-[clamp(20px,1.5vw,26px)] w-[clamp(20px,1.5vw,26px)] shrink-0 place-items-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 13 })
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "pointer-events-none absolute inset-x-0 bottom-[clamp(8px,.9vw,16px)] m-0 text-center text-[clamp(10.5px,.8vw,13px)] text-white/40", children: t("shop.cosmetics.dragHint") }),
        (loadingIds.length > 0 || errorIds.length > 0 || loginIds.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-none absolute inset-x-0 bottom-[clamp(32px,2.6vw,48px)] flex flex-col items-center gap-1.5", children: [
          loadingIds.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 rounded-full border border-white/10 bg-black/70 px-3 py-1 text-[clamp(11.5px,.9vw,14px)] text-white/80", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 13, className: "animate-spin" }),
            " ",
            c.name,
            ": ",
            t("shop.cosmetics.modelLoading")
          ] }, c.id)),
          errorIds.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 rounded-full border border-red-400/30 bg-black/70 px-3 py-1 text-[clamp(11.5px,.9vw,14px)] text-red-300", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 13 }),
            " ",
            c.name,
            ": ",
            t("shop.cosmetics.modelMissing")
          ] }, c.id)),
          loginIds.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 rounded-full border border-yellow-300/30 bg-black/70 px-3 py-1 text-[clamp(11.5px,.9vw,14px)] text-yellow-200", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 13 }),
            " ",
            t("shop.cosmetics.loginToPreview")
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fr-info", children: [
        room ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "fr-title", children: room.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `fr-badge fr-r-${room.rarity}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "h-2 w-2 shrink-0 rounded-full",
                style: { background: RARITY_COLOR[room.rarity], boxShadow: `0 0 8px ${RARITY_COLOR[room.rarity]}` }
              }
            ),
            t(`shop.cosmetics.rarity.${room.rarity}`),
            " - ",
            t(TYPE_LABEL_KEY[room.type])
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "fr-desc", children: room.description || t(`shop.cosmetics.about.${room.type}`) }),
          room.creator && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "fr-by", children: [
            t("shop.cosmetics.by"),
            ": ",
            room.creator
          ] }),
          selectedAnims && selectedAnims.list.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fr-chips", "aria-label": t("shop.cosmetics.animations"), children: selectedAnims.list.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setChosenAnim((prev) => {
                if (a.name !== selectedAnims.defaultName) return { ...prev, [room.id]: a.name };
                const next = { ...prev };
                delete next[room.id];
                return next;
              }),
              className: `fr-chip ${a.name === activeAnimation ? "fr-on" : ""}`,
              title: a.length > 0 ? `${a.length.toFixed(1)} ${t("shop.cosmetics.seconds")}` : t("shop.cosmetics.staticPose"),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 11, fill: "currentColor" }),
                a.name,
                a.name === selectedAnims.defaultName ? ` · ${t("shop.cosmetics.defaultAnimation")}` : ""
              ]
            },
            a.name
          )) })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "fr-desc", children: t("shop.cosmetics.selectHint") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fr-slots", "aria-label": t("shop.cosmetics.slots"), children: COSMETIC_TYPES.map((type) => {
            const c = getCosmetic(equipped[type]);
            const Icon = TYPE_ICON[type];
            const label = c ? `${t(TYPE_LABEL_KEY[type])}: ${c.name}` : `${t(TYPE_LABEL_KEY[type])}: ${t("shop.cosmetics.slotEmpty")}`;
            return c && (isAdmin || ownedKeys[c.id] || isFree(c.id)) ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                title: `${label} - ${t("shop.cosmetics.takeOff")}`,
                "aria-label": `${label} - ${t("shop.cosmetics.takeOff")}`,
                onClick: () => unequip(type),
                className: "fr-slot fr-full",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 15 })
              },
              type
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { title: label, className: `fr-slot ${c ? "fr-full" : ""}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 15 }) }, type);
          }) }),
          equippedList.length > 0 && (isAdmin || equippedList.every((c) => ownedKeys[c.id] || isFree(c.id))) && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: clear, className: "whitespace-nowrap text-[clamp(10.5px,.8vw,13px)] text-white/55 transition hover:text-white", children: t("shop.cosmetics.takeOffAll") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "fr-by flex items-start gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Footprints, { className: "mt-[1px] h-[1.1em] w-[1.1em] shrink-0 text-emerald-300/70" }),
          t("shop.cosmetics.baseMotion")
        ] })
      ] }),
      room && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fr-action", children: [
        roomPrice > 0 && !roomPermOwned ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          roomTempUntil !== null && roomTempUntil > serverNow() && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fr-pricebar", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-[#FFB35C]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Timer, { size: 14 }),
              " ",
              t("shop.offers.trialLeft")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("b", { className: "text-[#FFB35C]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ServerCountdown, { endsAt: roomTempUntil, onDone: checkOwnedExpiry }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fr-pricebar", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              t("shop.cosmetics.price"),
              roomQuote && roomQuote.kind !== "none" && /* @__PURE__ */ jsxRuntimeExports.jsxs("em", { className: "ml-1.5 font-bold not-italic text-[#FF8A3B]", children: [
                t(`shop.offers.kind.${roomQuote.kind}`),
                " -",
                roomQuote.pct,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("b", { children: [
              roomQuote && roomQuote.price < roomQuote.base && /* @__PURE__ */ jsxRuntimeExports.jsx("s", { className: "mr-1 font-semibold text-white/40 decoration-[#FF3B3B]", children: roomQuote.base.toLocaleString(numberLocale) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(HbcCoin, {}),
              roomPrice.toLocaleString(numberLocale),
              " NTC"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "fr-buy", onClick: startBuy, disabled: !!buyDialog?.busy, children: t("shop.cosmetics.buy") }),
          (isAdmin || roomTempUntil !== null) && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "fr-buy fr-ghost !text-[clamp(13px,1vw,16px)]", onClick: () => toggleEquip(room), children: detailIsEquipped ? t("shop.cosmetics.takeOff") : t("shop.cosmetics.equip") }),
          canTrial && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                className: "fr-buy fr-ghost !text-[clamp(13px,1vw,16px)]",
                onClick: () => setTrialAsk(true),
                disabled: trialBusy || trialLimitHit,
                "aria-disabled": trialBusy || trialLimitHit,
                children: [
                  trialBusy ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 16, className: "animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Timer, { size: 16 }),
                  " ",
                  t("shop.offers.trialButton")
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "fr-note", children: trialLimitHit && offers?.trials.nextAt ? `${t("shop.offers.trialLimit")} - ${new Date(offers.trials.nextAt).toLocaleDateString(numberLocale)}` : `${t("shop.offers.trialWeekly")}: ${Math.max(0, (offers?.trials.limit ?? 1) - (offers?.trials.used ?? 0))}/${offers?.trials.limit ?? 1}` })
          ] })
        ] }) : canWear ? (
          // Admin yoki egasi: Tanlash/Taqish (store ichida va serverda ham tekshiriladi).
          /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            roomOwned && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fr-pricebar", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t("shop.owned") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 16 }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: `fr-buy ${detailIsEquipped ? "fr-ghost" : ""}`, onClick: () => toggleEquip(room), children: detailIsEquipped ? t("shop.cosmetics.takeOff") : t("shop.cosmetics.equip") })
          ] })
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: "fr-buy", disabled: true, "aria-disabled": "true", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 18 }),
            " ",
            t("shop.cosmetics.locked")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "fr-note", children: t("shop.cosmetics.viewOnly") })
        ] }),
        !!profile && (roomQuote?.base ?? 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: "fr-buy fr-ghost !text-[clamp(13px,1vw,16px)]", onClick: () => setGiftOpen(true), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Gift, { size: 16 }),
          " ",
          t("gifts.button")
        ] })
      ] })
    ] }),
    trialAsk && room && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      ConfirmDialog,
      {
        icon: Timer,
        iconFrom: "#FFB547",
        iconTo: "#F08A00",
        title: t("shop.offers.trialAskTitle"),
        confirmLabel: t("shop.offers.trialAskConfirm"),
        onCancel: () => setTrialAsk(false),
        onConfirm: () => {
          setTrialAsk(false);
          void startTrial();
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0", children: t("shop.offers.trialAskBody", { name: room.name }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 mt-2 rounded-[12px] border border-solid border-[#FFB547]/30 bg-[#FFB547]/10 px-3 py-2 text-[12.5px] font-semibold text-[#FFD08A]", children: t("shop.offers.trialAskWeekly", {
            n: offers?.trials.limit ?? 1,
            left: Math.max(0, (offers?.trials.limit ?? 1) - (offers?.trials.used ?? 0))
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 mt-3 text-[14px] font-semibold text-white", children: t("shop.offers.trialAskQuestion", { name: room.name }) })
        ]
      }
    ),
    giftOpen && room && /* @__PURE__ */ jsxRuntimeExports.jsx(GiftFriendModal, { target: { kind: "cosmetic", cosmetic: room }, onClose: () => setGiftOpen(false) }),
    buyDialog && room && /* @__PURE__ */ jsxRuntimeExports.jsx(
      PurchaseConfirmDialog,
      {
        target: { id: 0, name: room.name, priceHbc: roomPrice },
        balance: profile?.hbc ?? 0,
        loading: buyDialog.busy,
        error: buyDialog.error,
        onConfirm: () => void confirmBuy(),
        onCancel: () => setBuyDialog(null)
      }
    )
  ] });
}
function sameCard(a, b) {
  return a.cosmetic === b.cosmetic && a.selected === b.selected && a.equipped === b.equipped && a.owned === b.owned && a.onSelect === b.onSelect && a.quote?.price === b.quote?.price && a.quote?.base === b.quote?.base && a.quote?.kind === b.quote?.kind;
}
const CatalogCard = reactExports.memo(function CatalogCard2({
  cosmetic: c,
  selected,
  equipped,
  owned,
  quote,
  onSelect
}) {
  const { t } = useLanguage();
  const KindIcon = TYPE_ICON[c.type];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    FittingCard,
    {
      rarity: c.rarity,
      name: c.name,
      rarityLabel: t(`shop.cosmetics.rarity.${c.rarity}`),
      price: owned ? void 0 : quote?.price,
      oldPrice: owned || !quote || quote.price >= quote.base ? void 0 : quote.base,
      discount: owned || !quote || quote.kind === "none" ? void 0 : `-${quote.pct}%`,
      selected,
      status: equipped ? "equipped" : owned ? "owned" : void 0,
      onClick: () => onSelect(c),
      kind: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(KindIcon, { size: 11 }),
        " ",
        t(TYPE_LABEL_KEY[c.type])
      ] }),
      media: (
        // Plash - qahramonga kiydirilgan ikonka emas, PLASHNING O'ZI (animatsiyalisi kartada harakatlanadi). Yopiq
        // bucket'dagi (`cosmetic:`) tekstura kartalarda tortilmaydi (har biri imzolangan so'rov) - ularda ikonka qoladi.
        c.type === "cape" && c.capeTextureUrl && !isCosmeticRef(c.capeTextureUrl) ? /* @__PURE__ */ jsxRuntimeExports.jsx(CapeSlab, { textureUrl: c.capeTextureUrl, fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(CosmeticIcon, { cosmetic: c, className: "h-full w-full" }) }) : (c.type === "accessory" || c.type === "pet" || c.type === "wings" || c.type === "avatar") && c.modelUrl ? (
          // Aksesuar - Lunar'dagidek Steve'ga kiydirilgan holda, pet - yolg'iz; animatsiyasi kartada o'ynaydi (bitta APNG,
          // qotmasligi uchun - ko'ring `AccessoryThumb.tsx`).
          /* @__PURE__ */ jsxRuntimeExports.jsx(AccessoryThumb, { cosmetic: c, fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(CosmeticIcon, { cosmetic: c, className: "h-full w-full" }) })
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(CosmeticIcon, { cosmetic: c, className: "h-full w-full" })
      )
    }
  );
}, sameCard);
const OFFERS_RAIL = { id: "offers", icon: Flame, labelKey: "shop.tabs.offers" };
const COSMETIC_RAIL = [
  { id: "all", icon: LayoutGrid, labelKey: "shop.filters.all" },
  { id: "capes", icon: Flag, labelKey: "shop.filters.capes" },
  { id: "wings", icon: Bird, labelKey: "shop.filters.wings" },
  { id: "pets", icon: PawPrint, labelKey: "shop.filters.pets" },
  { id: "accessories", icon: Glasses, labelKey: "shop.filters.accessories" },
  { id: "emotes", icon: Hand, labelKey: "shop.filters.emotes" },
  { id: "avatars", icon: UserRound, labelKey: "shop.filters.avatars" }
];
const CATALOG_RAIL = [
  { id: "companions", icon: Bot, labelKey: "shop.tabs.companions" },
  { id: "backgrounds", icon: Image, labelKey: "shop.tabs.backgrounds" },
  { id: "skins", icon: Shirt, labelKey: "shop.filters.skins" },
  { id: "cases", icon: Gift, labelKey: "shop.tabs.cases" },
  { id: "uiThemes", icon: Palette, labelKey: "shop.tabs.uiThemes" }
].filter((item) => item.id !== "cases" || CASES_ENABLED);
function resolveTarget(target) {
  if (target === "cases" && !CASES_ENABLED) return { section: "cosmetics", filter: "all" };
  if (target === "offers" || target === "cases" || target === "uiThemes" || target === "companions" || target === "backgrounds") return { section: target, filter: "all" };
  if (target === void 0 || target === "cosmetics") return { section: "cosmetics", filter: "all" };
  return { section: "cosmetics", filter: target };
}
function ShopScreen({
  backLabel,
  onBack,
  initialTab,
  companionEnabled,
  onToggleCompanion,
  selectedPetId,
  onSelectPet,
  onOpenProfile,
  playerSkinUrl
}) {
  const { t, numberLocale } = useLanguage();
  const { session, profile, refreshProfile } = useAuth();
  const { showToast } = useToast();
  const bodyReady = useAfterEntry(300);
  reactExports.useEffect(() => {
    if (session) void refreshProfile().catch(() => void 0);
  }, []);
  reactExports.useEffect(() => {
    void useShopOffersStore.getState().load();
  }, [profile?.id]);
  const starterOpen = useShopOffersStore((s) => !!s.offers && !s.offers.starter.claimed);
  const requestLogin = useAuthStore((s) => s.requestLogin);
  const proPageOpen = useProStore((s) => s.pageOpen);
  const tabsRef = reactExports.useRef(null);
  useHorizontalScroll(tabsRef);
  const bodyRef = reactExports.useRef(null);
  useScrollingClass(bodyRef);
  const [initial] = reactExports.useState(() => resolveTarget(initialTab));
  const [section, setSection] = reactExports.useState(initial.section);
  const [filter, setFilter] = reactExports.useState(initial.filter);
  const loggedIn = !!session && !!profile;
  const activeRail = section === "cosmetics" ? filter : section;
  function selectRail(id) {
    if (id === "offers" || id === "cases" || id === "uiThemes" || id === "companions" || id === "backgrounds") {
      setSection(id);
      return;
    }
    setSection("cosmetics");
    setFilter(id);
  }
  function handleTopUp() {
    if (!loggedIn || !profile) {
      showToast({ kind: "info", title: t("pro.loginFirst") });
      requestLogin();
      return;
    }
    useProStore.getState().openPage();
  }
  function renderTab({ id, icon: Icon, labelKey }) {
    const active = activeRail === id;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        role: "tab",
        "aria-selected": active,
        onClick: () => selectRail(id),
        className: `fr-tab ${active ? "fr-on" : ""}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fr-ic", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-full w-full" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t(labelKey) }),
          id === "offers" && starterOpen && loggedIn && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", className: "ml-0.5 h-2 w-2 shrink-0 rounded-full bg-[#FF3B3B] shadow-[0_0_8px_#FF3B3B]" })
        ]
      },
      id
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    FullScreenPage,
    {
      title: t("shop.title"),
      subtitle: t("shop.subtitle"),
      backLabel,
      onBack,
      enter: "rise",
      background: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.5),rgba(0,0,0,.28)_28%,rgba(0,0,0,.36))]" }),
      closeOnEscape: !proPageOpen,
      actions: loggedIn ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-[clamp(6px,.7vw,12px)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShopCodeButton, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: "flex items-center gap-1.5 rounded-full border border-yellow-300/25 bg-yellow-400/10 px-[clamp(10px,1vw,16px)] py-[clamp(5px,.55vw,9px)] font-mono text-[clamp(12px,1vw,17px)] font-bold tabular-nums",
            style: { color: tokens.yellow },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(HbcCoin, {}),
              (profile?.hbc ?? 0).toLocaleString(numberLocale),
              " NTC"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: handleTopUp,
            className: "flex items-center gap-1 rounded-full bg-gradient-to-b from-[#FDE047] via-[#FACC15] to-[#E89A0B] px-[clamp(10px,1vw,18px)] py-[clamp(5px,.55vw,9px)] text-[clamp(11.5px,.95vw,15px)] font-bold text-[#1A1200] transition hover:brightness-105 motion-safe:animate-pro-pulse",
            children: [
              "+ ",
              t("shop.topUp")
            ]
          }
        )
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: requestLogin,
          className: "rounded-full px-[clamp(12px,1.1vw,20px)] py-[clamp(6px,.6vw,10px)] text-[clamp(11.5px,.95vw,15px)] font-semibold text-white transition hover:brightness-110",
          style: { background: tokens.emerald },
          children: t("common.login")
        }
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: bodyRef, className: "sp-body", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { ref: tabsRef, role: "tablist", "aria-orientation": "horizontal", className: "fr-tabs", children: [
          renderTab(OFFERS_RAIL),
          COSMETIC_RAIL.map(renderTab),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fr-sep", "aria-hidden": "true" }),
          CATALOG_RAIL.map(renderTab),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => useProStore.getState().openPage(), className: "fr-tab fr-pro", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fr-ic", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-full w-full" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t("shop.tabs.pro") })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fr-main" + (bodyReady ? " motion-safe:animate-panel-in" : ""), children: [
          bodyReady && section === "cosmetics" && (filter === "skins" ? (
            // Oddiy (PNG) skinlar katalogi: kartalar -> tafsilot sahifasi (SkinsSection ichida, avvalgidek).
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sp-panel h-full min-h-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SkinsSection, { onOpenProfile }) })
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(CosmeticsShowcase, { playerSkinUrl, filter })),
          bodyReady && section === "offers" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sp-panel sp-scroll h-full p-[clamp(12px,1.3vw,24px)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(OffersTab, {}) }),
          bodyReady && section === "companions" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sp-panel sp-scroll h-full p-[clamp(12px,1.3vw,24px)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            CompanionsTab,
            {
              companionEnabled,
              onToggleCompanion,
              selectedPetId,
              onSelectPet
            }
          ) }),
          bodyReady && section === "backgrounds" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sp-panel sp-scroll h-full p-[clamp(12px,1.3vw,24px)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BackgroundsTab, {}) }),
          bodyReady && CASES_ENABLED,
          bodyReady && section === "uiThemes" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sp-panel sp-scroll h-full p-[clamp(12px,1.3vw,24px)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UiThemesTab, {}) })
        ] })
      ] })
    }
  );
}
export {
  ShopScreen
};

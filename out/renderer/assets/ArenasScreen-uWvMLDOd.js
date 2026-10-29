import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports } from "./x-D_GsiFEI.js";
import { u as useLanguage, aV as useHorizontalScroll, b2 as arenaVersionEntry, b3 as Boxes, b4 as Heart, b as useToast, b5 as useArenaStore, A as useProStore, b6 as ARENA_CATEGORIES, F as FullScreenPage, L as LoaderCircle, aN as RefreshCw, h as ChevronDown, b7 as MENU_PAD, b8 as GLASS_MENU, b9 as MENU_ITEM, ba as MENU_ITEM_ACTIVE, bb as MENU_ITEM_IDLE, g as useLobbyStore, bc as restoreUserMods } from "./index-BgnzSiMf.js";
import { u as useScrollingClass } from "./useScrollingClass-JSNs726P.js";
import { C as Check } from "./trash-2-Djh6nQ-0.js";
import "./uiTokenRequest-NBUTHrRg.js";
import "./index-DZI2mFQS.js";
/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M17 20v2", key: "1rnc9c" }],
  ["path", { d: "M17 2v2", key: "11trls" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M2 17h2", key: "7oei6x" }],
  ["path", { d: "M2 7h2", key: "asdhe0" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "M20 17h2", key: "1fpfkl" }],
  ["path", { d: "M20 7h2", key: "1o8tra" }],
  ["path", { d: "M7 20v2", key: "4gnj0m" }],
  ["path", { d: "M7 2v2", key: "1i4yhu" }],
  ["rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", key: "1vbyd7" }],
  ["rect", { x: "8", y: "8", width: "8", height: "8", rx: "1", key: "z9xiuo" }]
];
const Cpu = createLucideIcon("cpu", __iconNode$1);
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
      d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
      key: "vktsd0"
    }
  ],
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }]
];
const Tag = createLucideIcon("tag", __iconNode);
async function loadTips(imageUrl) {
  if (!imageUrl) return [];
  const url = imageUrl.replace(/[.][A-Za-z0-9]+$/, ".json");
  if (url === imageUrl) return [];
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(6e3) });
    if (!res.ok) return [];
    const data = await res.json();
    const tips = data?.tips;
    if (!Array.isArray(tips)) return [];
    return tips.filter((x) => typeof x === "string" && x.length > 0 && x.length <= 300).slice(0, 10);
  } catch {
    return [];
  }
}
const CATEGORY_LABEL_KEY = {
  adventure: "arenas.catAdventure",
  pvp: "arenas.catPvp",
  minigame: "arenas.catMinigame",
  survival: "arenas.catSurvival",
  parkour: "arenas.catParkour"
};
function arenaCategoryLabelKey(category) {
  return CATEGORY_LABEL_KEY[category];
}
const FAVORITES_KEY = "mcmodhub_arena_favorites";
function loadFavoriteArenas() {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string" && x.length <= 48) : []);
  } catch {
    return /* @__PURE__ */ new Set();
  }
}
function saveFavoriteArenas(ids) {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify([...ids]));
  } catch {
  }
}
function loaderName(loader) {
  return loader === "forge" ? "Forge" : loader === "fabric" ? "Fabric" : loader === "quilt" ? "Quilt" : null;
}
function InfoBlock({ icon: Icon, label, value }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 items-center gap-[clamp(8px,.8vw,14px)] rounded-[clamp(8px,.7vw,12px)] border border-white/[.12] bg-black/30 px-[clamp(8px,.9vw,16px)] py-[clamp(7px,.75vw,13px)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-[clamp(16px,1.5vw,26px)] w-[clamp(16px,1.5vw,26px)] shrink-0 text-white/70", strokeWidth: 1.7 }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 leading-[1.2]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 truncate text-[clamp(9.5px,.78vw,13px)] text-white/50", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 truncate text-[clamp(11.5px,1vw,17px)] font-semibold text-white", children: value })
    ] })
  ] });
}
function ArenaDetailPanel({ arena, selected, favorite, onToggleFavorite, onSelect }) {
  const { t } = useLanguage();
  const [tips, setTips] = reactExports.useState([]);
  reactExports.useEffect(() => {
    let alive = true;
    setTips([]);
    void loadTips(arena.imageUrl).then((list) => {
      if (alive) setTips(list);
    });
    return () => {
      alive = false;
    };
  }, [arena.imageUrl]);
  const images = reactExports.useMemo(() => [arena.imageUrl, ...arena.gallery].filter((u) => !!u), [arena.imageUrl, arena.gallery]);
  const [shot, setShot] = reactExports.useState(0);
  reactExports.useEffect(() => setShot(0), [arena.id]);
  const thumbsRef = reactExports.useRef(null);
  useHorizontalScroll(thumbsRef);
  const shownImage = images[Math.min(shot, images.length - 1)] ?? null;
  const name = arena.builtIn ? t("arenas.standardName") : arena.name;
  const description = arena.builtIn ? t("arenas.activeStandardHint") : arena.description;
  const version = arenaVersionEntry(arena);
  const loader = loaderName(arena.loader);
  const versionLabel = version ? `${loaderName(version.loader) ?? ""} ${version.mcVersion}`.trim() : null;
  const modsValue = arena.hasModPack ? arena.modless ? t("arenas.modsNone") : t("arenas.modsPack") : t("arenas.modsYours");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full min-h-0 flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "thin-scrollbar min-h-0 flex-1 overflow-y-auto px-[clamp(14px,1.6vw,30px)] pb-[clamp(10px,1vw,18px)] pt-[clamp(12px,1.3vw,24px)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[2/1] w-full overflow-hidden rounded-[clamp(10px,.9vw,16px)] border border-white/[.14] bg-black/40 shadow-[0_12px_34px_rgba(0,0,0,.45)]", children: [
        shownImage ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: shownImage, alt: "", draggable: false, decoding: "async", className: "absolute inset-0 h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 grid place-items-center bg-[radial-gradient(90%_70%_at_50%_30%,rgba(250,204,21,.16),rgba(255,255,255,.04))]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Boxes, { className: "h-[clamp(34px,4vw,70px)] w-[clamp(34px,4vw,70px)] text-white/35", strokeWidth: 1.4 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20" }),
        versionLabel && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-[clamp(8px,.8vw,14px)] top-[clamp(8px,.8vw,14px)] rounded-[clamp(5px,.4vw,8px)] border border-white/25 bg-black/70 px-[clamp(6px,.6vw,10px)] py-[clamp(2px,.2vw,4px)] text-[clamp(10px,.8vw,13px)] font-bold text-white/90", children: versionLabel }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: onToggleFavorite,
            "aria-pressed": favorite,
            className: `absolute right-[clamp(8px,.8vw,14px)] top-[clamp(8px,.8vw,14px)] flex items-center gap-[clamp(4px,.4vw,7px)] rounded-full border px-[clamp(8px,.8vw,14px)] py-[clamp(4px,.4vw,7px)] text-[clamp(10px,.82vw,14px)] font-medium transition hover:brightness-125 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/70 ${favorite ? "border-[#FB7185]/55 bg-[#FB7185]/20 text-[#FDA4AF]" : "border-white/25 bg-black/65 text-white/90"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-[1.15em] w-[1.15em]", fill: favorite ? "currentColor" : "none", strokeWidth: 1.8 }),
              favorite ? t("arenas.favRemove") : t("arenas.favAdd")
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "m-0 mt-[clamp(10px,1.1vw,20px)] font-display text-[clamp(24px,3vw,54px)] font-bold uppercase leading-[1.02] tracking-[.03em] text-white [text-shadow:0_2px_16px_rgba(0,0,0,.6)]", children: name }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-[clamp(8px,.9vw,16px)] flex flex-wrap gap-[clamp(5px,.5vw,9px)]", children: [
        arena.category && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full border border-[#2ECC71]/50 bg-[#2ECC71]/15 px-[clamp(9px,.9vw,16px)] py-[clamp(3px,.35vw,6px)] text-[clamp(10.5px,.88vw,15px)] font-semibold text-[#6EE7A8]", children: t(arenaCategoryLabelKey(arena.category)) }),
        versionLabel && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full border border-white/20 bg-black/30 px-[clamp(9px,.9vw,16px)] py-[clamp(3px,.35vw,6px)] text-[clamp(10.5px,.88vw,15px)] text-white/85", children: versionLabel }),
        arena.comingSoon && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full border border-[#FDE047]/45 bg-[#FDE047]/10 px-[clamp(9px,.9vw,16px)] py-[clamp(3px,.35vw,6px)] text-[clamp(10.5px,.88vw,15px)] font-semibold text-[#FDE047]", children: t("arenas.comingSoon") })
      ] }),
      (description || tips.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-[clamp(8px,.9vw,16px)]", children: [
        description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 whitespace-pre-line text-[clamp(12px,1vw,17px)] leading-relaxed text-white/80", children: description }),
        tips.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-[clamp(6px,.7vw,12px)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 mb-1 text-[clamp(10.5px,.85vw,14px)] font-semibold uppercase tracking-[.16em] text-[#6EE7A8]", children: t("arenas.infoTips") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "m-0 list-disc space-y-1 pl-5 text-[clamp(11.5px,.95vw,16px)] leading-snug text-white/75", children: tips.map((tip) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: tip }, tip)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-[clamp(10px,1.1vw,20px)] grid grid-cols-3 gap-[clamp(6px,.6vw,10px)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(InfoBlock, { icon: Tag, label: t("arenas.detailVersion"), value: arena.mcVersion ?? t("arenas.versionYours") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(InfoBlock, { icon: Cpu, label: t("arenas.detailLoader"), value: loader ?? (arena.builtIn || !arena.mcVersion ? t("arenas.versionYours") : t("arenas.loaderVanilla")) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(InfoBlock, { icon: Boxes, label: t("arenas.detailMods"), value: modsValue })
      ] }),
      arena.gallery.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: thumbsRef, className: "no-scrollbar mt-[clamp(10px,1.1vw,20px)] flex gap-[clamp(6px,.6vw,10px)] overflow-x-auto pb-1", children: images.map((src, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setShot(i),
          "aria-label": `${name} ${i + 1}`,
          "aria-pressed": i === shot,
          className: `relative aspect-[16/10] w-[clamp(84px,8.4vw,150px)] shrink-0 overflow-hidden rounded-[clamp(7px,.6vw,10px)] border-2 transition-[border-color,transform] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/70 ${i === shot ? "border-[#2ECC71] shadow-[0_0_16px_rgba(46,204,113,.3)]" : "border-white/[.14] opacity-80 hover:border-white/45 hover:opacity-100"}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src, alt: "", draggable: false, loading: "lazy", decoding: "async", className: "absolute inset-0 h-full w-full object-cover" })
        },
        src
      )) }),
      version && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 mt-[clamp(8px,.8vw,14px)] text-[clamp(11px,.9vw,15px)] font-semibold leading-snug text-[#6EE7A8]", children: t("arenas.infoVersion", { version: versionLabel ?? "" }) }),
      arena.hasModPack && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 mt-[clamp(4px,.4vw,8px)] text-[clamp(10.5px,.85vw,14px)] leading-snug text-white/55", children: t(arena.modless ? "arenas.profileHint" : "arenas.modsHint") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 border-t border-white/[.08] bg-black/20 px-[clamp(14px,1.6vw,30px)] py-[clamp(10px,1.1vw,20px)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: onSelect,
        disabled: arena.comingSoon,
        className: "group relative flex h-[clamp(46px,4.6vw,80px)] w-full items-center justify-center gap-[.5em] overflow-hidden rounded-[clamp(6px,.55vw,10px)] bg-[#21B45E] font-sans text-[clamp(15px,1.6vw,28px)] font-bold uppercase leading-none tracking-[.06em] text-white shadow-[0_10px_34px_rgba(33,180,94,.35),inset_0_2px_0_rgba(255,255,255,.3),inset_0_-3px_0_rgba(0,0,0,.16)] transition-[background-color,box-shadow,transform] duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80 enabled:hover:bg-[#2ECC71] enabled:hover:shadow-[0_12px_46px_rgba(46,204,113,.6),inset_0_2px_0_rgba(255,255,255,.4),inset_0_-3px_0_rgba(0,0,0,.16)] enabled:active:translate-y-[1px] disabled:cursor-not-allowed disabled:bg-white/15 disabled:text-white/45 disabled:shadow-none",
        children: [
          !arena.comingSoon && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              "aria-hidden": "true",
              className: "pointer-events-none absolute inset-y-0 left-0 w-1/4 -translate-x-[160%] -skew-x-[18deg] bg-white/50 blur-[6px] motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover:translate-x-[520%]"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex items-center gap-[.45em]", children: [
            selected && !arena.comingSoon && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-[.85em] w-[.85em]", strokeWidth: 3 }),
            arena.comingSoon ? t("arenas.comingSoon") : selected ? t("arenas.selectedMap") : t("arenas.selectMap")
          ] })
        ]
      }
    ) })
  ] });
}
const ArenaMapCard = reactExports.memo(function ArenaMapCard2({ arena, active, selected, favorite, onOpen, index = 0 }) {
  const { t } = useLanguage();
  const name = arena.builtIn ? t("arenas.standardName") : arena.name;
  const version = arenaVersionEntry(arena);
  const versionText = version ? `${version.loader === "forge" ? "Forge" : version.loader === "fabric" ? "Fabric" : "Quilt"} ${version.mcVersion}` : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      role: "option",
      "aria-selected": active,
      "aria-label": name,
      onClick: () => onOpen(arena.id),
      style: { animationDelay: `${Math.min(index, 12) * 40}ms` },
      className: `group relative aspect-[4/3] w-full overflow-hidden rounded-[clamp(10px,.9vw,16px)] border-2 text-left outline-none transition-[transform,border-color] duration-300 ease-out focus-visible:ring-2 focus-visible:ring-white/70 motion-safe:animate-panel-in [animation-fill-mode:backwards] ${active ? "border-[#2ECC71] shadow-[0_0_0_1px_rgba(46,204,113,.45),0_0_34px_rgba(46,204,113,.3),0_16px_40px_rgba(0,0,0,.55)]" : "border-white/[.16] shadow-[0_10px_28px_rgba(0,0,0,.4)] hover:border-white/45 hover:shadow-[0_0_24px_rgba(255,255,255,.1),0_14px_34px_rgba(0,0,0,.5)]"}`,
      children: [
        arena.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: arena.imageUrl,
            alt: "",
            draggable: false,
            loading: "lazy",
            decoding: "async",
            className: "absolute inset-0 h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.06]"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 grid place-items-center bg-[radial-gradient(90%_70%_at_50%_30%,rgba(250,204,21,.16),rgba(255,255,255,.04))]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Boxes, { className: "h-[clamp(28px,3vw,52px)] w-[clamp(28px,3vw,52px)] text-white/35", strokeWidth: 1.4 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/5" }),
        versionText && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-[clamp(6px,.6vw,10px)] top-[clamp(6px,.6vw,10px)] rounded-[clamp(5px,.4vw,7px)] border border-white/25 bg-black/70 px-[clamp(5px,.5vw,8px)] py-[clamp(1px,.15vw,3px)] text-[clamp(9px,.7vw,12px)] font-bold text-white/90", children: versionText }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute right-[clamp(6px,.6vw,10px)] top-[clamp(6px,.6vw,10px)] flex items-center gap-1", children: [
          favorite && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-[clamp(18px,1.5vw,26px)] w-[clamp(18px,1.5vw,26px)] place-items-center rounded-full bg-black/70 text-[#FB7185]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-[56%] w-[56%]", fill: "currentColor", strokeWidth: 1.5 }) }),
          selected && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-[clamp(18px,1.6vw,28px)] w-[clamp(18px,1.6vw,28px)] place-items-center rounded-full bg-[#2ECC71] text-[#04140A] shadow-[0_0_14px_rgba(46,204,113,.7)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-[62%] w-[62%]", strokeWidth: 3 }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute inset-x-0 bottom-0 p-[clamp(8px,.8vw,14px)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block truncate font-display text-[clamp(13px,1.3vw,24px)] font-bold uppercase leading-[1.05] tracking-[.03em] text-white [text-shadow:0_2px_12px_rgba(0,0,0,.75)]", children: name }),
          arena.comingSoon ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-[clamp(3px,.3vw,6px)] block text-[clamp(9.5px,.8vw,14px)] font-semibold uppercase tracking-[.14em] text-[#FDE047]/90", children: t("arenas.comingSoon") }) : arena.category && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-[clamp(3px,.3vw,6px)] inline-block rounded-[clamp(4px,.35vw,6px)] border border-white/20 bg-black/65 px-[clamp(5px,.5vw,8px)] py-[clamp(1px,.12vw,2px)] text-[clamp(9px,.72vw,12px)] font-medium text-white/85", children: t(arenaCategoryLabelKey(arena.category)) })
        ] })
      ]
    }
  );
});
function ArenaBackdrop() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[#050807]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: "images/lobby/arenas.jpg",
        alt: "",
        draggable: false,
        className: "absolute inset-0 h-full w-full scale-110 object-cover opacity-35 blur-[34px]"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/80" })
  ] });
}
const CHIP_BASE = "shrink-0 rounded-full border px-[clamp(11px,1.1vw,20px)] py-[clamp(4px,.45vw,8px)] text-[clamp(11px,.92vw,16px)] font-medium transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/70";
const CHIP_ON = "border-[#2ECC71]/70 bg-[#2ECC71]/15 text-[#6EE7A8]";
const CHIP_OFF = "border-white/[.16] bg-black/30 text-white/80 hover:border-white/35 hover:bg-white/10 hover:text-white";
function SortMenu({ value, onChange }) {
  const { t } = useLanguage();
  const [open, setOpen] = reactExports.useState(false);
  const ref = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!open) return;
    function onDown(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);
  const options = [
    { id: "default", label: t("arenas.sortDefault") },
    { id: "name", label: t("arenas.sortName") }
  ];
  const current = options.find((o) => o.id === value) ?? options[0];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref, className: "relative shrink-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        "aria-haspopup": "listbox",
        "aria-expanded": open,
        "aria-label": t("arenas.sortLabel"),
        onClick: () => setOpen((v) => !v),
        className: "flex items-center gap-[clamp(6px,.6vw,10px)] rounded-[clamp(8px,.7vw,12px)] border border-white/[.16] bg-black/30 px-[clamp(10px,1vw,18px)] py-[clamp(5px,.5vw,9px)] text-[clamp(11px,.92vw,16px)] text-white/90 transition hover:border-white/35 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/70",
        children: [
          current.label,
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: `h-[1.2em] w-[1.2em] text-white/60 transition-transform duration-200 ${open ? "rotate-180" : ""}` })
        ]
      }
    ),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        role: "listbox",
        className: `absolute right-0 top-full z-30 mt-2 w-max min-w-full rounded-[clamp(10px,.9vw,16px)] motion-safe:animate-panel-in ${MENU_PAD} ${GLASS_MENU}`,
        children: options.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            role: "option",
            "aria-selected": o.id === value,
            onClick: () => {
              onChange(o.id);
              setOpen(false);
            },
            className: `${MENU_ITEM} whitespace-nowrap ${o.id === value ? MENU_ITEM_ACTIVE : MENU_ITEM_IDLE}`,
            children: o.label
          },
          o.id
        ))
      }
    )
  ] });
}
function ArenasScreen({ backLabel, onBack }) {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const arenas = useArenaStore((s) => s.arenas);
  const status = useArenaStore((s) => s.status);
  const selectedId = useArenaStore((s) => s.selectedId);
  const proPageOpen = useProStore((s) => s.pageOpen);
  reactExports.useEffect(() => {
    void useArenaStore.getState().load();
  }, []);
  const [inspectedId, setInspectedId] = reactExports.useState(selectedId);
  const [filter, setFilter] = reactExports.useState("all");
  const [sort, setSort] = reactExports.useState("default");
  const [favorites, setFavorites] = reactExports.useState(loadFavoriteArenas);
  const chipsRef = reactExports.useRef(null);
  useHorizontalScroll(chipsRef);
  const listRef = reactExports.useRef(null);
  useScrollingClass(listRef);
  function toggleFavorite(id) {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      saveFavoriteArenas(next);
      return next;
    });
  }
  function handleSelect(arena) {
    const result = useArenaStore.getState().trySelect(arena.id);
    if (result === "coming-soon") showToast({ kind: "info", title: t("arenas.comingSoonToast") });
    if (result !== "selected") return false;
    if (arena.hasModPack) {
      showToast({ kind: "info", title: arena.name, message: t(arena.modless ? "arenas.profileHint" : "arenas.modsHint") });
    } else if (!useLobbyStore.getState().arenaOverride) {
      void restoreUserMods();
    }
    return true;
  }
  const inspected = arenas.find((a) => a.id === inspectedId) ?? arenas.find((a) => a.id === selectedId) ?? arenas[0];
  const categories = reactExports.useMemo(() => ARENA_CATEGORIES.filter((c) => arenas.some((a) => a.category === c)), [arenas]);
  const hasFavorites = arenas.some((a) => favorites.has(a.id));
  const activeFilter = filter === "favorites" && !hasFavorites ? "all" : filter === "all" || filter === "favorites" || categories.includes(filter) ? filter : "all";
  const visible = reactExports.useMemo(() => {
    const list = arenas.filter((a) => activeFilter === "all" ? true : activeFilter === "favorites" ? favorites.has(a.id) : a.category === activeFilter);
    if (sort === "name") {
      const nameOf = (a) => a.builtIn ? t("arenas.standardName") : a.name;
      return [...list].sort((a, b) => nameOf(a).localeCompare(nameOf(b)));
    }
    return list;
  }, [arenas, activeFilter, favorites, sort, t]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    FullScreenPage,
    {
      title: t("arenas.title"),
      subtitle: t("arenas.subtitle"),
      backLabel,
      onBack,
      closeOnEscape: !proPageOpen,
      background: /* @__PURE__ */ jsxRuntimeExports.jsx(ArenaBackdrop, {}),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full min-h-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { ref: listRef, className: "flex min-h-0 w-3/5 flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 items-center justify-between gap-[clamp(8px,1vw,18px)] px-[clamp(14px,1.8vw,34px)] pb-[clamp(8px,.9vw,16px)] pt-[clamp(12px,1.3vw,24px)]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: chipsRef, role: "tablist", "aria-label": t("arenas.title"), className: "no-scrollbar flex min-w-0 gap-[clamp(5px,.6vw,10px)] overflow-x-auto", children: [
              { id: "all", label: t("arenas.filterAll") },
              ...hasFavorites ? [{ id: "favorites", label: t("arenas.filterFavorites") }] : [],
              ...categories.map((c) => ({ id: c, label: t(arenaCategoryLabelKey(c)) }))
            ].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                role: "tab",
                "aria-selected": activeFilter === f.id,
                onClick: () => setFilter(f.id),
                className: `${CHIP_BASE} ${activeFilter === f.id ? CHIP_ON : CHIP_OFF}`,
                children: f.label
              },
              f.id
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SortMenu, { value: sort, onChange: setSort })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "thin-scrollbar min-h-0 flex-1 overflow-y-auto px-[clamp(14px,1.8vw,34px)] pb-[clamp(12px,1.4vw,28px)]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { role: "listbox", "aria-label": t("arenas.title"), className: "scroll-no-pointer grid grid-cols-3 gap-[clamp(8px,1vw,18px)]", children: [
              visible.map((arena, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                ArenaMapCard,
                {
                  arena,
                  index: i,
                  active: arena.id === inspected.id,
                  selected: arena.id === selectedId,
                  favorite: favorites.has(arena.id),
                  onOpen: setInspectedId
                },
                arena.id
              )),
              status === "loading" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid aspect-[4/3] place-items-center rounded-[clamp(10px,.9vw,16px)] border border-dashed border-white/15 text-white/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-[clamp(22px,2.2vw,38px)] w-[clamp(22px,2.2vw,38px)] animate-spin" }) })
            ] }),
            visible.length === 0 && status !== "loading" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 mt-8 text-center text-[clamp(12px,1vw,17px)] text-white/55", children: t("arenas.emptyFilter") }),
            status === "error" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto mt-4 flex w-fit items-center gap-3 rounded-full border border-red-400/35 bg-[rgba(60,10,10,.5)] px-[clamp(12px,1.2vw,20px)] py-[clamp(5px,.6vw,10px)] text-[clamp(11px,.95vw,16px)] text-red-100", children: [
              t("arenas.errorTitle"),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => void useArenaStore.getState().load(),
                  className: "flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 font-semibold transition hover:bg-white/20",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-[1em] w-[1em]" }),
                    t("common.retry")
                  ]
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "min-h-0 w-2/5 border-l border-white/[.08] bg-black/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArenaDetailPanel,
          {
            arena: inspected,
            selected: inspected.id === selectedId,
            favorite: favorites.has(inspected.id),
            onToggleFavorite: () => toggleFavorite(inspected.id),
            onSelect: () => {
              if (handleSelect(inspected)) onBack();
            }
          }
        ) })
      ] })
    }
  );
}
export {
  ArenasScreen
};

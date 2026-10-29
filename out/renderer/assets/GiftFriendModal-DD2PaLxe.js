import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, b as reactDomExports, X } from "./x-D_GsiFEI.js";
import { s as supabase, u as useLanguage, x as useAuth, a8 as useAuthStore, b as useToast, ao as GLASS_PANEL, L as LoaderCircle, H as HbcCoin, bf as Clock, ap as BTN_GHOST, j as Send, be as CircleCheck, bd as CircleX, aq as BTN_PRIMARY, bh as Users, aj as purchaseErrorText, A as useProStore, aA as getCosmetic, ay as useOwnedCosmeticsStore, a$ as Copy, bk as useFriendsStore, aI as usePriceStore, ax as useShopOffersStore, bg as PRO_PRICE_KEY, aJ as quotePrice, ar as Gift, aD as RARITY_COLOR, C as Crown, aB as CosmeticMedia, bl as LobbyAvatar, bm as giftPro, bn as giftCosmetic, bo as sendFriendUpdate } from "./index-BgnzSiMf.js";
import { f as formatProDate } from "./proFormat-D1yFcuOe.js";
import { C as Check, S as Search } from "./trash-2-Djh6nQ-0.js";
/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
      key: "3c2336"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const BadgeCheck = createLucideIcon("badge-check", __iconNode$4);
/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M8 12h8", key: "1wcyev" }],
  ["path", { d: "M12 8v8", key: "napkw2" }]
];
const CirclePlus = createLucideIcon("circle-plus", __iconNode$3);
/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M14 4.1 12 6", key: "ita8i4" }],
  ["path", { d: "m5.1 8-2.9-.8", key: "1go3kf" }],
  ["path", { d: "m6 12-1.9 2", key: "mnht97" }],
  ["path", { d: "M7.2 2.2 8 5.1", key: "1cfko1" }],
  [
    "path",
    {
      d: "M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z",
      key: "s0h3yz"
    }
  ]
];
const MousePointerClick = createLucideIcon("mouse-pointer-click", __iconNode$2);
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
      d: "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",
      key: "qn84l0"
    }
  ],
  ["path", { d: "M13 5v2", key: "dyzc3o" }],
  ["path", { d: "M13 17v2", key: "1ont0d" }],
  ["path", { d: "M13 11v2", key: "1wjjxi" }]
];
const Ticket = createLucideIcon("ticket", __iconNode$1);
/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode);
const ERRORS = ["not_found", "expired", "already_used", "limit", "own_code", "too_many", "bad_code", "reserved", "taken", "bad_amount", "too_many_codes", "insufficient"];
function isShopCodeError(e) {
  return ERRORS.includes(e);
}
function mapReward(r) {
  switch (r.type) {
    case "hbc":
      return { type: "hbc", amount: Number(r.amount ?? 0), from: typeof r.from === "string" ? r.from : null };
    case "pro_days":
      return { type: "pro_days", amount: Number(r.amount ?? 0) };
    case "case":
      return { type: "case", caseId: String(r.case_id ?? ""), amount: Number(r.amount ?? 1) };
    default:
      return { type: "cosmetic", itemKey: String(r.item_key ?? ""), duplicate: r.duplicate === true, refundHbc: Number(r.refund_hbc ?? 0) };
  }
}
async function applyShopCode(code) {
  const { data, error } = await supabase.rpc("apply_shop_code", { p_code: code });
  if (error) return { ok: false, error: error.message };
  const d = data ?? {};
  if (d.ok !== true) return { ok: false, error: String(d.error ?? "not_found") };
  if (d.kind === "creator") {
    return { ok: true, kind: "creator", code: String(d.code ?? ""), discountPercent: Number(d.discount_percent ?? 0), already: d.already === true };
  }
  return { ok: true, kind: "promo", code: String(d.code ?? ""), reward: mapReward(d.reward ?? {}), newBalance: Number(d.new_balance ?? 0) };
}
async function fetchShopCodeState() {
  const { data, error } = await supabase.rpc("get_shop_code_state");
  if (error || !data) return null;
  const d = data;
  return {
    creatorCode: typeof d.creator_code === "string" ? d.creator_code : null,
    discountPercent: Number(d.discount_percent ?? 0),
    creatorName: typeof d.creator_name === "string" ? d.creator_name : null
  };
}
async function clearCreatorCode() {
  const { error } = await supabase.rpc("clear_creator_code");
  return !error;
}
const ADMIN_TELEGRAM = "https://t.me/neoterrauz";
function adminTelegramUrl(text) {
  return text ? `${ADMIN_TELEGRAM}?text=${encodeURIComponent(text)}` : ADMIN_TELEGRAM;
}
async function fetchCreatorStatus() {
  const { data, error } = await supabase.rpc("my_creator_code_status");
  if (error || !data || typeof data !== "object") return null;
  const d = data;
  const num = (v, fallback = 0) => typeof v === "number" ? v : Number(v ?? fallback) || fallback;
  return {
    state: d.state ?? "none",
    code: typeof d.code === "string" ? d.code : null,
    uses: num(d.uses),
    purchases: num(d.purchases),
    earned: num(d.earned),
    discountPercent: num(d.discount_percent, 5),
    commissionPercent: num(d.commission_percent, 10),
    retryAt: typeof d.retry_at === "string" ? d.retry_at : null
  };
}
async function requestCreatorCode() {
  const { data, error } = await supabase.functions.invoke("telegram-webhook", {
    headers: { "x-mcmodhub-app": "creator-request" },
    body: {}
  });
  if (error) {
    const status = error.context?.status;
    return { ok: false, error: status === 401 ? "login" : "unavailable" };
  }
  const res = data;
  if (!res?.ok || !res.result) return { ok: false, error: "unavailable" };
  return { ok: true, result: res.result };
}
async function createMyCreatorCode(code) {
  const { data, error } = await supabase.rpc("create_my_creator_code", { p_code: code });
  if (error || !data) return { ok: false, error: "unknown" };
  const res = data;
  if (res.ok && res.code) return { ok: true, code: res.code };
  return { ok: false, error: res.error ?? "unknown" };
}
const CASES_CHANGED_EVENT = "mcmodhub:cases-changed";
function ShopCodeButton({ className = "" }) {
  const { t } = useLanguage();
  const { session, profile } = useAuth();
  const requestLogin = useAuthStore((s) => s.requestLogin);
  const { showToast } = useToast();
  const [open, setOpen] = reactExports.useState(false);
  function onClick() {
    if (!session || !profile) {
      showToast({ kind: "info", title: t("pro.loginFirst") });
      requestLogin();
      return;
    }
    setOpen(true);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick,
        className: `flex items-center gap-1.5 rounded-full border border-solid border-white/20 bg-white/[.06] px-[clamp(10px,1vw,16px)] py-[clamp(5px,.55vw,9px)] text-[clamp(11.5px,.95vw,15px)] font-semibold text-white transition hover:bg-white/[.12] ${className}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Ticket, { className: "h-[1.1em] w-[1.1em] text-[#F0ABFC]" }),
          t("codes.button")
        ]
      }
    ),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx(ShopCodeModal, { onClose: () => setOpen(false) })
  ] });
}
function ShopCodeModal({ onClose }) {
  const { t } = useLanguage();
  const [tab, setTab] = reactExports.useState("enter");
  reactExports.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [onClose]);
  return reactDomExports.createPortal(
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-[80] grid place-items-center bg-black/45 p-4", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        role: "dialog",
        "aria-label": t("codes.title"),
        onClick: (e) => e.stopPropagation(),
        className: `thin-scrollbar relative max-h-[90vh] w-[min(470px,94vw)] overflow-y-auto rounded-[20px] p-[clamp(16px,1.6vw,26px)] motion-safe:animate-panel-in ${GLASS_PANEL}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onClose,
              "aria-label": t("cases.win.close"),
              className: "absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 17 })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pr-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-12 w-12 shrink-0 place-items-center rounded-[28%] bg-gradient-to-br from-[#3FE08A] to-[#1FA855] text-white shadow-[0_6px_18px_rgba(31,168,85,.4),inset_0_1px_0_rgba(255,255,255,.35)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ticket, { size: 24 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 text-[18px] font-bold text-white", children: t("codes.title") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 text-[12.5px] leading-snug text-white/55", children: tab === "enter" ? t("codes.hint") : t("codes.creator.hint") })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { role: "tablist", className: "mt-4 grid grid-cols-2 gap-1 rounded-[14px] border border-solid border-white/10 bg-black/30 p-1", children: ["enter", "create"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              role: "tab",
              "aria-selected": tab === id,
              onClick: () => setTab(id),
              className: `flex items-center justify-center gap-1.5 rounded-[10px] py-2 text-[13.5px] font-semibold transition ${tab === id ? "bg-[rgba(46,204,113,.16)] text-[#2ECC71] shadow-[inset_0_0_0_1px_rgba(46,204,113,.55)]" : "text-white/60 hover:bg-white/[.06] hover:text-white"}`,
              children: [
                id === "enter" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Ticket, { size: 15 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { size: 15 }),
                t(`codes.tabs.${id}`)
              ]
            },
            id
          )) }),
          tab === "enter" ? /* @__PURE__ */ jsxRuntimeExports.jsx(EnterTab, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(CreatorTab, {})
        ]
      }
    ) }),
    document.body
  );
}
function EnterTab() {
  const { t } = useLanguage();
  const { refreshProfile } = useAuth();
  const [code, setCode] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  const [msg, setMsg] = reactExports.useState(null);
  const [state, setState] = reactExports.useState(null);
  const inputRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    inputRef.current?.focus();
    void fetchShopCodeState().then(setState);
  }, []);
  async function submit() {
    const value = code.trim().toUpperCase();
    if (value.length < 3 || busy) return;
    setBusy(true);
    setMsg(null);
    const res = await applyShopCode(value);
    setBusy(false);
    if (!res.ok) {
      setMsg({ ok: false, text: isShopCodeError(res.error) ? t(`codes.err.${res.error}`) : purchaseErrorText(t, res.error) });
      return;
    }
    setCode("");
    if (res.kind === "creator") {
      setMsg({ ok: true, text: t("codes.ok.creator", { code: res.code }) });
      void fetchShopCodeState().then(setState);
      return;
    }
    const r = res.reward;
    let text = "";
    if (r.type === "hbc") text = r.from ? t("codes.ok.hbcFrom", { n: r.amount, name: r.from }) : t("codes.ok.hbc", { n: r.amount });
    else if (r.type === "pro_days") {
      text = t("codes.ok.pro_days", { n: r.amount });
      void useProStore.getState().refresh();
    } else if (r.type === "case") {
      text = t("codes.ok.case", { n: r.amount, case: t(`cases.names.${r.caseId}`) });
      window.dispatchEvent(new Event(CASES_CHANGED_EVENT));
    } else {
      const name = getCosmetic(r.itemKey)?.name ?? r.itemKey;
      text = r.duplicate ? t("codes.ok.cosmeticDup", { name, n: r.refundHbc }) : t("codes.ok.cosmetic", { name });
      void useOwnedCosmeticsStore.getState().load(true);
    }
    setMsg({ ok: true, text });
    void refreshProfile().catch(() => void 0);
  }
  async function removeCreator() {
    setBusy(true);
    await clearCreatorCode();
    setBusy(false);
    setState(await fetchShopCodeState());
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    state?.creatorCode && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center gap-3 rounded-[14px] border border-solid border-[#2ECC71]/40 bg-[#2ECC71]/10 p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { size: 20, className: "shrink-0 text-[#4ADE80]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 text-[12px] text-white/60", children: t("codes.creatorActive") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 font-mono text-[16px] font-bold tracking-wider text-white", children: state.creatorCode }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "m-0 text-[12px] text-[#BBF7D0]", children: [
          t("codes.creatorPerk", { p: state.discountPercent }),
          state.creatorName ? ` · ${t("codes.creatorBy", { name: state.creatorName })}` : ""
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", disabled: busy, onClick: () => void removeCreator(), className: "shrink-0 text-[12px] text-white/55 underline-offset-2 transition hover:text-white hover:underline", children: t("codes.remove") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "form",
      {
        className: "mt-4 flex gap-2",
        onSubmit: (e) => {
          e.preventDefault();
          void submit();
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              ref: inputRef,
              value: code,
              onChange: (e) => setCode(e.target.value.toUpperCase().replace(/[^A-Z0-9_-]/g, "").slice(0, 32)),
              placeholder: t("codes.placeholder"),
              spellCheck: false,
              autoComplete: "off",
              className: "min-w-0 flex-1 rounded-[12px] border border-solid border-white/15 bg-black/40 px-3 py-2.5 font-mono text-[15px] font-bold tracking-widest text-white outline-none placeholder:font-sans placeholder:text-[13px] placeholder:font-normal placeholder:tracking-normal placeholder:text-white/30 focus:border-[#C084FC]"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "submit",
              disabled: busy || code.trim().length < 3,
              className: "flex shrink-0 items-center gap-1.5 rounded-[12px] bg-gradient-to-b from-[#C084FC] to-[#7E22CE] px-4 text-[14px] font-bold text-white shadow-[0_8px_22px_-8px_rgba(126,34,206,.6)] transition hover:brightness-110 disabled:opacity-50",
              children: [
                busy ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 16, className: "animate-spin" }) : null,
                t("codes.apply")
              ]
            }
          )
        ]
      }
    ),
    msg && /* @__PURE__ */ jsxRuntimeExports.jsx(StatusLine, { ok: msg.ok, text: msg.text })
  ] });
}
function IosTile({ icon: Icon, from, to, size = 34 }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      "aria-hidden": "true",
      className: "grid shrink-0 place-items-center rounded-[28%] shadow-[0_4px_14px_rgba(0,0,0,.35),inset_0_1px_0_rgba(255,255,255,.35)]",
      style: { width: size, height: size, background: `linear-gradient(145deg, ${from}, ${to})` },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { strokeWidth: 2.3, className: "h-[54%] w-[54%] text-white" })
    }
  );
}
function StateCard({ icon, from, to, title, text }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-start gap-3 rounded-[16px] border border-solid border-white/10 bg-white/[.04] p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(IosTile, { icon, from, to, size: 40 }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 text-[15px] font-bold text-white", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 mt-0.5 text-[12.5px] leading-snug text-white/60", children: text })
    ] })
  ] });
}
const TG_BUTTON = `mt-4 ${BTN_PRIMARY}`;
function CreatorTab() {
  const { t, lang, numberLocale } = useLanguage();
  const { profile } = useAuth();
  const [status, setStatus] = reactExports.useState(null);
  const [busy, setBusy] = reactExports.useState(false);
  const [msg, setMsg] = reactExports.useState(null);
  const [name, setName] = reactExports.useState("");
  const reload = reactExports.useCallback(() => {
    void fetchCreatorStatus().then((s2) => setStatus(s2 ?? "error"));
  }, []);
  reactExports.useEffect(() => {
    reload();
    window.addEventListener("focus", reload);
    return () => window.removeEventListener("focus", reload);
  }, [reload]);
  function openAdmin(withMessage) {
    const text = withMessage ? t("codes.creator.tgMessage", { name: profile?.username ?? "" }) : void 0;
    void window.launcher.openExternal(adminTelegramUrl(text));
  }
  async function sendRequest() {
    if (busy) return;
    setBusy(true);
    setMsg(null);
    openAdmin(true);
    const res = await requestCreatorCode();
    setBusy(false);
    if (!res.ok) setMsg(t("codes.creator.err.unavailable"));
    else if (res.result === "limit") setMsg(t("codes.creator.err.limit"));
    reload();
  }
  async function create() {
    const code = name.trim().toUpperCase();
    if (busy || code.length < 4) return;
    setBusy(true);
    setMsg(null);
    const res = await createMyCreatorCode(code);
    setBusy(false);
    if (!res.ok) {
      setMsg(t(`codes.creator.err.${res.error === "unknown" ? "unavailable" : res.error}`));
      return;
    }
    setName("");
    reload();
  }
  if (status === null) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 20, className: "animate-spin text-white/50" }) });
  }
  const s = status === "error" ? null : status;
  const state = s?.state ?? "none";
  const fans = s?.discountPercent ?? 5;
  const you = s?.commissionPercent ?? 10;
  const error = msg ?? (status === "error" ? t("codes.creator.err.unavailable") : null);
  if (state === "active" && s?.code) {
    const stats = [
      { id: "uses", label: t("codes.creator.statUses"), value: s.uses.toLocaleString(numberLocale), coin: false },
      { id: "purchases", label: t("codes.creator.statPurchases"), value: s.purchases.toLocaleString(numberLocale), coin: false },
      { id: "earned", label: t("codes.creator.statEarned"), value: s.earned.toLocaleString(numberLocale), coin: true }
    ];
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 rounded-[16px] border border-solid border-[#2ECC71]/40 bg-[linear-gradient(180deg,rgba(46,204,113,.14),rgba(46,204,113,.04))] p-4 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 text-[12.5px] font-semibold text-[#86EFAC]", children: t("codes.creator.activeTitle") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[26px] font-black tracking-[.14em] text-white", children: s.code }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CopyButton, { text: s.code })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "m-0 mt-1 text-[12px] text-[#BBF7D0]", children: [
          t("codes.creator.perkFans", { p: fans }),
          " · ",
          t("codes.creator.perkYou", { p: you })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 grid grid-cols-3 gap-2", children: stats.map(({ id, label, value, coin }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[12px] border border-solid border-white/10 bg-white/[.04] px-2 py-2.5 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "m-0 flex items-center justify-center gap-1 font-mono text-[18px] font-bold tabular-nums text-white", children: [
          coin && /* @__PURE__ */ jsxRuntimeExports.jsx(HbcCoin, {}),
          value
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 mt-0.5 text-[11px] text-white/50", children: label })
      ] }, id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 mt-3 text-[12px] leading-snug text-white/50", children: t("codes.creator.activeHint") })
    ] });
  }
  if (state === "pending") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StateCard, { icon: Clock, from: "#FFE066", to: "#E8A800", title: t("codes.creator.pendingTitle"), text: t("codes.creator.pendingText") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => openAdmin(true),
          className: `mt-3 ${BTN_GHOST}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { size: 16 }),
            t("codes.creator.request")
          ]
        }
      ),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx(StatusLine, { ok: false, text: error })
    ] });
  }
  if (state === "approved") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StateCard, { icon: CircleCheck, from: "#7CF0A8", to: "#1FA855", title: t("codes.creator.approvedTitle"), text: t("codes.creator.approvedText") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          className: "mt-4 flex gap-2",
          onSubmit: (e) => {
            e.preventDefault();
            void create();
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                value: name,
                onChange: (e) => setName(e.target.value.toUpperCase().replace(/[^A-Z0-9_]/g, "").slice(0, 16)),
                placeholder: t("codes.creator.namePh"),
                spellCheck: false,
                autoComplete: "off",
                className: "min-w-0 flex-1 rounded-[12px] border border-solid border-white/15 bg-black/40 px-3 py-2.5 font-mono text-[15px] font-bold tracking-widest text-white outline-none placeholder:font-sans placeholder:text-[13px] placeholder:font-normal placeholder:tracking-normal placeholder:text-white/30 focus:border-[#2ECC71]"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "submit",
                disabled: busy || name.trim().length < 4,
                className: "flex shrink-0 items-center gap-1.5 rounded-[12px] bg-[#21B45E] px-4 text-[14px] font-black text-white shadow-[0_10px_28px_-10px_rgba(33,180,94,.6),inset_0_2px_0_rgba(255,255,255,.28)] transition hover:brightness-105 disabled:bg-white/[.08] disabled:text-white/50 disabled:shadow-none",
                children: [
                  busy ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 16, className: "animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { size: 16 }),
                  t("codes.creator.submit")
                ]
              }
            )
          ]
        }
      ),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx(StatusLine, { ok: false, text: error })
    ] });
  }
  if (state === "rejected") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StateCard, { icon: CircleX, from: "#FF8A8A", to: "#E0245E", title: t("codes.creator.rejectedTitle"), text: t("codes.creator.rejectedText") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => openAdmin(false), className: TG_BUTTON, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { size: 17 }),
        "@neoterrauz"
      ] }),
      s?.retryAt && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 mt-2 text-center text-[12px] text-white/45", children: t("codes.creator.retryAt", { date: formatProDate(s.retryAt, lang) }) })
    ] });
  }
  const perks = [
    { icon: Users, from: "#5AC8FA", to: "#1E78D8", text: t("codes.creator.perkFans", { p: fans }) },
    { icon: TrendingUp, from: "#FFE066", to: "#E8A800", text: t("codes.creator.perkYou", { p: you }) },
    { icon: BadgeCheck, from: "#C084FC", to: "#7E22CE", text: t("codes.creator.perkOne") }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 rounded-[16px] border border-solid border-white/10 bg-white/[.03] p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 text-[14px] font-bold text-white", children: t("codes.creator.whatTitle") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "m-0 mt-3 grid list-none gap-2.5 p-0", children: perks.map(({ icon, from, to, text }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IosTile, { icon, from, to }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[13px] leading-snug text-white/80", children: text })
      ] }, text)) })
    ] }),
    state === "disabled" && /* @__PURE__ */ jsxRuntimeExports.jsx(StatusLine, { ok: false, text: t("codes.creator.disabled") }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => void sendRequest(), disabled: busy, className: TG_BUTTON, children: [
      busy ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 17, className: "animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { size: 17 }),
      t("codes.creator.request")
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 mt-2 text-center text-[12px] text-white/45", children: t("codes.creator.requestNote") }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx(StatusLine, { ok: false, text: error })
  ] });
}
function StatusLine({ ok, text }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { role: "status", className: `m-0 mt-3 rounded-[10px] px-3 py-2 text-[13px] font-medium ${ok ? "bg-[#2ECC71]/[.12] text-[#86EFAC]" : "bg-[#FF3B3B]/[.12] text-[#FCA5A5]"}`, children: text });
}
function CopyButton({ text, small = false }) {
  const { t } = useLanguage();
  const [done, setDone] = reactExports.useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      window.setTimeout(() => setDone(false), 1500);
    } catch {
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onClick: () => void copy(),
      title: done ? t("codes.create.copied") : t("codes.create.copy"),
      "aria-label": t("codes.create.copy"),
      className: `grid shrink-0 place-items-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white ${small ? "h-6 w-6" : "h-8 w-8"}`,
      children: done ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: small ? 13 : 16, className: "text-[#86EFAC]" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { size: small ? 13 : 16 })
    }
  );
}
const PRO_FALLBACK = 120;
function GiftFriendModal({ target, onClose }) {
  const { t, numberLocale } = useLanguage();
  const { profile, refreshProfile } = useAuth();
  const { showToast } = useToast();
  const entries = useFriendsStore((s) => s.entries);
  const friendsStatus = useFriendsStore((s) => s.status);
  const prices = usePriceStore((s) => s.prices);
  const deals = useShopOffersStore((s) => s.offers?.deals);
  const [query, setQuery] = reactExports.useState("");
  const [friendId, setFriendId] = reactExports.useState(null);
  const [message, setMessage] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    void useFriendsStore.getState().load();
    void usePriceStore.getState().load();
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [onClose]);
  const friends = reactExports.useMemo(() => {
    const q = query.trim().toLowerCase();
    return entries.filter((e) => e.relation === "friend").filter((e) => !q || e.username.toLowerCase().includes(q) || (e.minecraftNick ?? "").toLowerCase().includes(q));
  }, [entries, query]);
  const price = target.kind === "pro" ? prices[PRO_PRICE_KEY] ?? PRO_FALLBACK : quotePrice(prices[target.cosmetic.id] ?? 0, { deal: !!deals?.some((d) => d.itemKey === target.cosmetic.id) }).price;
  const balance = profile?.hbc ?? 0;
  const name = target.kind === "pro" ? t("gifts.proName") : target.cosmetic.name;
  const friend = entries.find((e) => e.userId === friendId);
  async function send() {
    if (!friend || busy) return;
    setBusy(true);
    setError(null);
    const res = target.kind === "pro" ? await giftPro(friend.userId, message.trim()) : await giftCosmetic(friend.userId, target.cosmetic.id, message.trim());
    setBusy(false);
    if (!res.ok) {
      setError(purchaseErrorText(t, res.error));
      return;
    }
    sendFriendUpdate(friend.userId, "gift");
    void refreshProfile().catch(() => void 0);
    showToast({ kind: "success", title: t("gifts.sent"), message: t("gifts.sentTo", { name: friend.username, item: name }) });
    onClose();
  }
  return reactDomExports.createPortal(
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-[80] grid place-items-center bg-black/75 p-4", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        role: "dialog",
        "aria-label": t("gifts.title"),
        onClick: (e) => e.stopPropagation(),
        className: "relative flex max-h-[90vh] w-[min(480px,94vw)] flex-col rounded-[20px] border border-solid border-white/10 bg-[linear-gradient(180deg,#121A16,#0A0D0C)] p-[clamp(16px,1.5vw,24px)] shadow-[0_30px_80px_rgba(0,0,0,.6)] motion-safe:animate-panel-in",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onClose,
              "aria-label": t("cases.win.close"),
              className: "absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 17 })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pr-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-12 w-12 shrink-0 place-items-center rounded-[28%] bg-gradient-to-br from-[#FB7185] to-[#E11D48] text-white shadow-[0_6px_18px_rgba(225,29,72,.45),inset_0_1px_0_rgba(255,255,255,.35)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Gift, { size: 24 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 text-[18px] font-bold text-white", children: t("gifts.title") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 truncate text-[13px] text-white/60", children: name })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center gap-3 rounded-[14px] border border-solid border-white/10 bg-white/[.04] p-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "relative h-14 w-14 shrink-0 overflow-hidden rounded-[12px] border border-solid",
                style: { borderColor: target.kind === "pro" ? "#FACC15" : RARITY_COLOR[target.cosmetic.rarity] },
                children: target.kind === "pro" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-full w-full place-items-center bg-gradient-to-br from-[#FDE047]/30 to-[#E89A0B]/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { size: 26, className: "text-[#FACC15]", fill: "currentColor" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CosmeticMedia, { cosmetic: target.cosmetic })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 truncate text-[15px] font-semibold text-white", children: name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 text-[11.5px] leading-snug text-white/50", children: t("gifts.priceNote") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex shrink-0 items-center gap-1 font-mono text-[16px] font-bold text-[#FDE68A]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(HbcCoin, {}),
              price.toLocaleString(numberLocale)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mt-4 flex items-center gap-2 rounded-[12px] border border-solid border-white/[.12] bg-black/30 px-3 py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 15, className: "text-white/45" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                value: query,
                onChange: (e) => setQuery(e.target.value),
                placeholder: t("gifts.search"),
                className: "min-w-0 flex-1 bg-transparent text-[14px] text-white outline-none placeholder:text-white/35"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "thin-scrollbar mt-2 flex max-h-[220px] min-h-[64px] flex-col gap-1 overflow-y-auto", children: friendsStatus === "loading" && entries.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "m-0 flex items-center gap-2 p-3 text-[13px] text-white/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 14, className: "animate-spin" }),
            " ",
            t("gifts.loading")
          ] }) : friends.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 p-3 text-[13px] text-white/50", children: entries.some((e) => e.relation === "friend") ? t("gifts.noMatch") : t("gifts.noFriends") }) : friends.map((f) => {
            const on = f.userId === friendId;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setFriendId(f.userId),
                className: `flex items-center gap-3 rounded-[12px] border border-solid px-2.5 py-2 text-left transition ${on ? "border-[#2ECC71]/70 bg-[#2ECC71]/[.12]" : "border-transparent hover:bg-white/[.06]"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LobbyAvatar, { username: f.username, avatarUrl: f.avatarUrl, size: 32 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0 flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block truncate text-[14px] font-semibold text-white", children: f.username }),
                    f.minecraftNick && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block truncate text-[11.5px] text-white/45", children: f.minecraftNick })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `grid h-5 w-5 shrink-0 place-items-center rounded-full border border-solid ${on ? "border-[#2ECC71] bg-[#2ECC71] text-[#04210F]" : "border-white/25"}`,
                      children: on && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 13, strokeWidth: 3 })
                    }
                  )
                ]
              },
              f.userId
            );
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mt-3 block text-[12.5px] font-semibold text-white/70", children: [
            t("gifts.message"),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "float-right font-normal text-white/35", children: [
              message.length,
              "/140"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              value: message,
              onChange: (e) => setMessage(e.target.value.slice(0, 140)),
              placeholder: t("gifts.messagePh"),
              rows: 2,
              className: "mt-1.5 w-full resize-none rounded-[12px] border border-solid border-white/[.12] bg-black/30 px-3 py-2 text-[14px] text-white outline-none placeholder:text-white/30 focus:border-[#2ECC71]/60"
            }
          ),
          error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 mt-3 rounded-[10px] bg-[#FF3B3B]/[.12] px-3 py-2 text-[13px] text-[#FCA5A5]", children: error }),
          !error && balance < price && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 mt-3 text-[12.5px] text-[#FCA5A5]", children: t("common.insufficientHbc") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => void send(),
              disabled: !friend || busy || balance < price || price <= 0,
              className: "mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#4ADE80] to-[#16A34A] py-3 text-[15px] font-bold text-[#04210F] shadow-[0_10px_30px_rgba(34,197,94,.3)] transition hover:brightness-105 disabled:opacity-45",
              children: [
                busy ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 17, className: "animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Gift, { size: 17 }),
                friend ? `${t("gifts.send")} - ${friend.username}` : t("gifts.pick")
              ]
            }
          )
        ]
      }
    ) }),
    document.body
  );
}
export {
  BadgeCheck as B,
  GiftFriendModal as G,
  MousePointerClick as M,
  ShopCodeButton as S,
  TrendingUp as T
};

import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, A as AnimatePresence, m as motion, X, a as client, R as React } from "./x-D_GsiFEI.js";
import { S as Search, E as EyeOff, a as Eye, P as Plus, C as Check, T as Trash2 } from "./trash-2-Djh6nQ-0.js";
/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "9", cy: "12", r: "1", key: "1vctgf" }],
  ["circle", { cx: "9", cy: "5", r: "1", key: "hp0tcf" }],
  ["circle", { cx: "9", cy: "19", r: "1", key: "fkjjf6" }],
  ["circle", { cx: "15", cy: "12", r: "1", key: "1tmaij" }],
  ["circle", { cx: "15", cy: "5", r: "1", key: "19l28e" }],
  ["circle", { cx: "15", cy: "19", r: "1", key: "f4zoj3" }]
];
const GripVertical = createLucideIcon("grip-vertical", __iconNode$2);
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
      d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",
      key: "kfwtm"
    }
  ]
];
const Moon = createLucideIcon("moon", __iconNode$1);
/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 17v5", key: "bb1du9" }],
  [
    "path",
    {
      d: "M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z",
      key: "1nkz8b"
    }
  ]
];
const Pin = createLucideIcon("pin", __iconNode);
const NAVY = {
  glass: "rgba(10,13,12,0.5)",
  blur: "blur(16px) saturate(1.2)",
  glassSoft: "rgba(255,255,255,0.09)",
  glassHover: "rgba(255,255,255,0.17)",
  border: "rgba(255,255,255,0.16)",
  borderSoft: "rgba(255,255,255,0.07)",
  shadow: "0 8px 24px -8px rgba(0,0,0,0.45)",
  btnShadow: "0 1px 3px rgba(0,0,0,0.28)",
  tile: "linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.06) 100%)",
  tileBorder: "0.5px solid rgba(255,255,255,0.22)",
  tileShadow: "inset 0 0.5px 0 rgba(255,255,255,0.3), 0 1px 2px rgba(0,0,0,0.2)",
  closeBg: "rgba(255,255,255,0.08)",
  closeBorder: "rgba(255,255,255,0.12)",
  closeText: "rgba(255,255,255,0.8)",
  text: "rgba(255,255,255,0.92)",
  textDim: "rgba(255,255,255,0.6)",
  textFaint: "rgba(255,255,255,0.42)",
  accent: "rgba(255,255,255,0.92)",
  accentSoft: "rgba(255,255,255,0.16)",
  onAccent: "#0d1110"
};
const SPRING = { type: "spring", stiffness: 260, damping: 22, mass: 0.9 };
const VISIBLE_MS = 4e4;
const EXIT_MS$1 = 450;
function ReminderView() {
  const [reminder, setReminder] = reactExports.useState(null);
  const [visible, setVisible] = reactExports.useState(true);
  const closing = reactExports.useRef(false);
  reactExports.useEffect(() => {
    let cancelled = false;
    void window.launcher?.focus?.getReminder().then((res) => {
      if (!cancelled && res.ok && res.data) setReminder(res.data);
    });
    return () => {
      cancelled = true;
    };
  }, []);
  const close = reactExports.useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    setVisible(false);
    setTimeout(() => window.launcher?.focus?.close(), EXIT_MS$1);
  }, []);
  reactExports.useEffect(() => {
    if (!reminder) return;
    const t = setTimeout(close, VISIBLE_MS);
    return () => clearTimeout(t);
  }, [reminder, close]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "fixed", inset: 0, display: "flex", justifyContent: "flex-end", padding: "14px 14px 0 0" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: reminder && visible && /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { x: 150, y: -40, opacity: 0, scale: 0.9, rotate: 3 },
      animate: { x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 },
      exit: { x: 140, y: -20, opacity: 0, scale: 0.94, transition: { duration: 0.4, ease: [0.4, 0, 0.8, 0.4] } },
      transition: { type: "spring", stiffness: 210, damping: 18, mass: 0.9 },
      style: {
        position: "relative",
        width: 360,
        height: "fit-content",
        padding: "14px 16px 16px 14px",
        borderRadius: 17,
        background: NAVY.glass,
        border: `1px solid ${NAVY.border}`,
        boxShadow: NAVY.shadow,
        backdropFilter: NAVY.blur,
        overflow: "hidden",
        display: "flex",
        gap: 12
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              position: "relative",
              width: 40,
              height: 40,
              flexShrink: 0,
              borderRadius: 11,
              display: "grid",
              placeItems: "center",
              background: NAVY.tile,
              border: NAVY.tileBorder,
              boxShadow: NAVY.tileShadow
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { size: 20, color: "#ffffff", strokeWidth: 2.2 })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "relative", flex: 1, minWidth: 0, paddingRight: 18 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "baseline", gap: 8 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontSize: 15, fontWeight: 600, color: "#ffffff" }, children: [
              reminder.label,
              " namozi"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 12.5, fontWeight: 600, color: NAVY.text }, children: reminder.time }),
            reminder.preview && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 10.5, color: NAVY.textFaint, marginLeft: "auto" }, children: "namuna" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginTop: 4, fontSize: 13, lineHeight: 1.42, color: NAVY.textDim }, children: reminder.text })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.button,
          {
            type: "button",
            "aria-label": "Yopish",
            onClick: close,
            whileHover: { scale: 1.1, backgroundColor: "rgba(255,255,255,0.16)" },
            whileTap: { scale: 0.9 },
            style: {
              position: "absolute",
              top: 10,
              right: 10,
              width: 22,
              height: 22,
              borderRadius: 99,
              display: "grid",
              placeItems: "center",
              background: NAVY.closeBg,
              border: `1px solid ${NAVY.closeBorder}`,
              color: NAVY.closeText
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 13, strokeWidth: 2.4 })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { scaleX: 1 },
            animate: { scaleX: 0 },
            transition: { duration: VISIBLE_MS / 1e3, ease: "linear" },
            style: {
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: 3,
              transformOrigin: "left",
              background: "linear-gradient(90deg, rgba(255,255,255,0.7), rgba(255,255,255,0.2))"
            }
          }
        )
      ]
    },
    "card"
  ) }) });
}
const ASMAUL_HUSNA = [
  { n: 1, arabic: "الرَّحْمَٰنُ", uz: "Ar-Rohman", meaning: "Dunyoda barchaga rahm qiluvchi, o'ta mehribon" },
  { n: 2, arabic: "الرَّحِيمُ", uz: "Ar-Rohiym", meaning: "Oxiratda mo'minlarga rahm qiluvchi, rahmli" },
  { n: 3, arabic: "الْمَلِكُ", uz: "Al-Malik", meaning: "Podshoh, barcha narsaning egasi" },
  { n: 4, arabic: "الْقُدُّوسُ", uz: "Al-Quddus", meaning: "Har qanday nuqsondan pok" },
  { n: 5, arabic: "السَّلَامُ", uz: "As-Salom", meaning: "Ofatlardan salomat, tinchlik beruvchi" },
  { n: 6, arabic: "الْمُؤْمِنُ", uz: "Al-Mu'min", meaning: "Omonlik beruvchi, ishonch bag'ishlovchi" },
  { n: 7, arabic: "الْمُهَيْمِنُ", uz: "Al-Muhaymin", meaning: "Hamma narsani kuzatib, qo'riqlab turuvchi" },
  { n: 8, arabic: "الْعَزِيزُ", uz: "Al-Aziz", meaning: "Qudratli, hech kim yenga olmaydigan g'olib" },
  { n: 9, arabic: "الْجَبَّارُ", uz: "Al-Jabbor", meaning: "Irodasini o'tkazuvchi, siniqni tuzatuvchi" },
  { n: 10, arabic: "الْمُتَكَبِّرُ", uz: "Al-Mutakabbir", meaning: "Ulug'lik faqat O'ziga xos bo'lgan" },
  { n: 11, arabic: "الْخَالِقُ", uz: "Al-Xoliq", meaning: "Yaratuvchi" },
  { n: 12, arabic: "الْبَارِئُ", uz: "Al-Bori'", meaning: "Yo'qdan bor qiluvchi" },
  { n: 13, arabic: "الْمُصَوِّرُ", uz: "Al-Musavvir", meaning: "Har narsaga shakl va surat beruvchi" },
  { n: 14, arabic: "الْغَفَّارُ", uz: "Al-G'offor", meaning: "Gunohlarni qayta-qayta kechiruvchi" },
  { n: 15, arabic: "الْقَهَّارُ", uz: "Al-Qahhor", meaning: "Hamma narsa ustidan g'olib" },
  { n: 16, arabic: "الْوَهَّابُ", uz: "Al-Vahhob", meaning: "Evazsiz, beminnat hadya qiluvchi" },
  { n: 17, arabic: "الرَّزَّاقُ", uz: "Ar-Rozzoq", meaning: "Barchaga rizq beruvchi" },
  { n: 18, arabic: "الْفَتَّاحُ", uz: "Al-Fattoh", meaning: "Rahmat eshiklarini ochuvchi, ishlarni hal qiluvchi" },
  { n: 19, arabic: "الْعَلِيمُ", uz: "Al-Aliym", meaning: "Hamma narsani biluvchi" },
  { n: 20, arabic: "الْقَابِضُ", uz: "Al-Qobiz", meaning: "Xohlaganiga rizqni toraytiruvchi" },
  { n: 21, arabic: "الْبَاسِطُ", uz: "Al-Bosit", meaning: "Xohlaganiga rizqni kengaytiruvchi" },
  { n: 22, arabic: "الْخَافِضُ", uz: "Al-Xofiz", meaning: "Xohlaganini pastlatuvchi" },
  { n: 23, arabic: "الرَّافِعُ", uz: "Ar-Rofi'", meaning: "Xohlaganini yuksaltiruvchi" },
  { n: 24, arabic: "الْمُعِزُّ", uz: "Al-Mu'izz", meaning: "Izzat beruvchi, aziz qiluvchi" },
  { n: 25, arabic: "الْمُذِلُّ", uz: "Al-Muzill", meaning: "Xor qiluvchi" },
  { n: 26, arabic: "السَّمِيعُ", uz: "As-Samiy'", meaning: "Hamma narsani eshituvchi" },
  { n: 27, arabic: "الْبَصِيرُ", uz: "Al-Basiyr", meaning: "Hamma narsani ko'ruvchi" },
  { n: 28, arabic: "الْحَكَمُ", uz: "Al-Hakam", meaning: "Hukm qiluvchi, haq bilan ajrim qiluvchi" },
  { n: 29, arabic: "الْعَدْلُ", uz: "Al-Adl", meaning: "Mutlaq adolatli" },
  { n: 30, arabic: "اللَّطِيفُ", uz: "Al-Latiyf", meaning: "Lutfli, eng nozik narsalarni ham biluvchi" },
  { n: 31, arabic: "الْخَبِيرُ", uz: "Al-Xobiyr", meaning: "Har narsaning ichidan xabardor" },
  { n: 32, arabic: "الْحَلِيمُ", uz: "Al-Haliym", meaning: "Halim, jazolashga shoshilmaydigan" },
  { n: 33, arabic: "الْعَظِيمُ", uz: "Al-Aziym", meaning: "Ulug', buyukligining chegarasi yo'q" },
  { n: 34, arabic: "الْغَفُورُ", uz: "Al-G'afur", meaning: "Gunohlarni mag'firat qiluvchi" },
  { n: 35, arabic: "الشَّكُورُ", uz: "Ash-Shakur", meaning: "Oz amalga ham ko'p savob beruvchi" },
  { n: 36, arabic: "الْعَلِيُّ", uz: "Al-Aliy", meaning: "Eng oliy, yuksak" },
  { n: 37, arabic: "الْكَبِيرُ", uz: "Al-Kabiyr", meaning: "Eng buyuk" },
  { n: 38, arabic: "الْحَفِيظُ", uz: "Al-Hafiyz", meaning: "Hamma narsani saqlovchi, muhofaza qiluvchi" },
  { n: 39, arabic: "الْمُقِيتُ", uz: "Al-Muqiyt", meaning: "Har jonga quvvat va rizq yetkazuvchi" },
  { n: 40, arabic: "الْحَسِيبُ", uz: "Al-Hasiyb", meaning: "Hisob oluvchi, bandasiga kifoya qiluvchi" },
  { n: 41, arabic: "الْجَلِيلُ", uz: "Al-Jaliyl", meaning: "Jalolli, ulug'vor" },
  { n: 42, arabic: "الْكَرِيمُ", uz: "Al-Kariym", meaning: "Karamli, saxovatli" },
  { n: 43, arabic: "الرَّقِيبُ", uz: "Ar-Roqiyb", meaning: "Doimo nazorat qilib turuvchi" },
  { n: 44, arabic: "الْمُجِيبُ", uz: "Al-Mujiyb", meaning: "Duolarni ijobat qiluvchi" },
  { n: 45, arabic: "الْوَاسِعُ", uz: "Al-Vosi'", meaning: "Rahmati va ilmi keng" },
  { n: 46, arabic: "الْحَكِيمُ", uz: "Al-Hakiym", meaning: "Har ishi hikmatli" },
  { n: 47, arabic: "الْوَدُودُ", uz: "Al-Vadud", meaning: "Solih bandalarini sevuvchi" },
  { n: 48, arabic: "الْمَجِيدُ", uz: "Al-Majiyd", meaning: "Sharafi va karami ulug'" },
  { n: 49, arabic: "الْبَاعِثُ", uz: "Al-Bo'is", meaning: "O'liklarni qayta tiriltiruvchi" },
  { n: 50, arabic: "الشَّهِيدُ", uz: "Ash-Shahiyd", meaning: "Hamma narsaga guvoh, hozir-nozir" },
  { n: 51, arabic: "الْحَقُّ", uz: "Al-Haqq", meaning: "Haq, borligi shubhasiz" },
  { n: 52, arabic: "الْوَكِيلُ", uz: "Al-Vakiyl", meaning: "Ishonib topshiriladigan tayanch" },
  { n: 53, arabic: "الْقَوِيُّ", uz: "Al-Qaviy", meaning: "Kuch-quvvat sohibi" },
  { n: 54, arabic: "الْمَتِينُ", uz: "Al-Matiyn", meaning: "Qudrati mustahkam, hech charchamaydigan" },
  { n: 55, arabic: "الْوَلِيُّ", uz: "Al-Valiy", meaning: "Mo'minlarning do'sti va yordamchisi" },
  { n: 56, arabic: "الْحَمِيدُ", uz: "Al-Hamiyd", meaning: "Har qanday maqtovga loyiq" },
  { n: 57, arabic: "الْمُحْصِي", uz: "Al-Muhsiy", meaning: "Har narsani sanab, hisoblab qo'yuvchi" },
  { n: 58, arabic: "الْمُبْدِئُ", uz: "Al-Mubdi'", meaning: "Ilk bor yaratuvchi" },
  { n: 59, arabic: "الْمُعِيدُ", uz: "Al-Mu'iyd", meaning: "Qayta yaratuvchi" },
  { n: 60, arabic: "الْمُحْيِي", uz: "Al-Muhyiy", meaning: "Hayot beruvchi" },
  { n: 61, arabic: "الْمُمِيتُ", uz: "Al-Mumiyt", meaning: "O'lim beruvchi" },
  { n: 62, arabic: "الْحَيُّ", uz: "Al-Hayy", meaning: "Abadiy tirik" },
  { n: 63, arabic: "الْقَيُّومُ", uz: "Al-Qoyyum", meaning: "Hamma narsani tutib, boshqarib turuvchi" },
  { n: 64, arabic: "الْوَاجِدُ", uz: "Al-Vojid", meaning: "Istaganini topuvchi, hech narsaga muhtoj emas" },
  { n: 65, arabic: "الْمَاجِدُ", uz: "Al-Mojid", meaning: "Sharafli, ulug'" },
  { n: 66, arabic: "الْوَاحِدُ", uz: "Al-Vohid", meaning: "Yagona, sherigi yo'q" },
  { n: 67, arabic: "الْأَحَدُ", uz: "Al-Ahad", meaning: "Zotida yakka, tengi yo'q" },
  { n: 68, arabic: "الصَّمَدُ", uz: "As-Somad", meaning: "Hamma Unga muhtoj, U hech kimga muhtoj emas" },
  { n: 69, arabic: "الْقَادِرُ", uz: "Al-Qodir", meaning: "Har narsaga qodir" },
  { n: 70, arabic: "الْمُقْتَدِرُ", uz: "Al-Muqtadir", meaning: "Qudrati to'liq, kuchi yetuvchi" },
  { n: 71, arabic: "الْمُقَدِّمُ", uz: "Al-Muqaddim", meaning: "Xohlaganini oldinga suruvchi" },
  { n: 72, arabic: "الْمُؤَخِّرُ", uz: "Al-Mu'axxir", meaning: "Xohlaganini ortga suruvchi" },
  { n: 73, arabic: "الْأَوَّلُ", uz: "Al-Avval", meaning: "Birinchi, boshlanishi yo'q" },
  { n: 74, arabic: "الْآخِرُ", uz: "Al-Oxir", meaning: "Oxirgi, nihoyasi yo'q" },
  { n: 75, arabic: "الظَّاهِرُ", uz: "Az-Zohir", meaning: "Borligi oshkor, alomatlari zohir" },
  { n: 76, arabic: "الْبَاطِنُ", uz: "Al-Botin", meaning: "Zoti ko'zlardan yashirin" },
  { n: 77, arabic: "الْوَالِي", uz: "Al-Voliy", meaning: "Butun borliqni boshqaruvchi" },
  { n: 78, arabic: "الْمُتَعَالِي", uz: "Al-Muta'oliy", meaning: "Har qanday nuqsondan yuksak" },
  { n: 79, arabic: "الْبَرُّ", uz: "Al-Barr", meaning: "Yaxshilik qiluvchi, ehsonli" },
  { n: 80, arabic: "التَّوَّابُ", uz: "At-Tavvob", meaning: "Tavbalarni qabul qiluvchi" },
  { n: 81, arabic: "الْمُنْتَقِمُ", uz: "Al-Muntaqim", meaning: "Zolimlardan intiqom oluvchi" },
  { n: 82, arabic: "الْعَفُوُّ", uz: "Al-Afuv", meaning: "Gunohlarni butunlay o'chiruvchi, afv etuvchi" },
  { n: 83, arabic: "الرَّءُوفُ", uz: "Ar-Ro'uf", meaning: "O'ta shafqatli" },
  { n: 84, arabic: "مَالِكُ الْمُلْكِ", uz: "Molikul-mulk", meaning: "Butun mulkning egasi" },
  { n: 85, arabic: "ذُو الْجَلَالِ وَالْإِكْرَامِ", uz: "Zul-jaloli val-ikrom", meaning: "Ulug'lik va karam sohibi" },
  { n: 86, arabic: "الْمُقْسِطُ", uz: "Al-Muqsit", meaning: "Adolat bilan hukm qiluvchi" },
  { n: 87, arabic: "الْجَامِعُ", uz: "Al-Jomi'", meaning: "Hamma narsani bir joyga to'plovchi" },
  { n: 88, arabic: "الْغَنِيُّ", uz: "Al-G'aniy", meaning: "Behojat, hech narsaga muhtoj emas" },
  { n: 89, arabic: "الْمُغْنِي", uz: "Al-Mug'niy", meaning: "Xohlaganini boy qiluvchi" },
  { n: 90, arabic: "الْمَانِعُ", uz: "Al-Mone'", meaning: "Xohlaganini man qiluvchi, to'suvchi" },
  { n: 91, arabic: "الضَّارُّ", uz: "Az-Zorr", meaning: "Hikmat bilan zarar yetkazuvchi" },
  { n: 92, arabic: "النَّافِعُ", uz: "An-Nofi'", meaning: "Foyda beruvchi" },
  { n: 93, arabic: "النُّورُ", uz: "An-Nur", meaning: "Osmonlar va yerning nuri" },
  { n: 94, arabic: "الْهَادِي", uz: "Al-Hodiy", meaning: "To'g'ri yo'lga hidoyat qiluvchi" },
  { n: 95, arabic: "الْبَدِيعُ", uz: "Al-Badiy'", meaning: "Misli yo'q tarzda yaratuvchi" },
  { n: 96, arabic: "الْبَاقِي", uz: "Al-Boqiy", meaning: "Abadiy boqiy" },
  { n: 97, arabic: "الْوَارِثُ", uz: "Al-Voris", meaning: "Hamma narsa Unga qoladi, merosxo'r" },
  { n: 98, arabic: "الرَّشِيدُ", uz: "Ar-Roshid", meaning: "To'g'ri yo'lga boshlovchi" },
  { n: 99, arabic: "الصَّبُورُ", uz: "As-Sobur", meaning: "O'ta sabrli, jazoga shoshilmaydigan" }
];
const EXIT_MS = 220;
const norm = (s) => s.toLowerCase().replace(/[‘’ʻʼ'`-]/g, "").replace(/\s+/g, " ").trim();
function NameCard({ item, study }) {
  const [revealed, setRevealed] = reactExports.useState(false);
  reactExports.useEffect(() => setRevealed(false), [study]);
  const hidden = study && !revealed;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.button,
    {
      type: "button",
      layout: false,
      onClick: () => study && setRevealed((v) => !v),
      whileHover: { backgroundColor: NAVY.glassHover, borderColor: NAVY.border },
      transition: { duration: 0.15 },
      style: {
        boxShadow: NAVY.btnShadow,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        gap: 4,
        padding: "10px 12px 14px",
        borderRadius: 11,
        textAlign: "left",
        background: NAVY.glassSoft,
        border: `1px solid ${NAVY.borderSoft}`,
        cursor: study ? "pointer" : "default"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              style: {
                minWidth: 26,
                height: 22,
                padding: "0 6px",
                borderRadius: 7,
                display: "grid",
                placeItems: "center",
                fontSize: 11.5,
                fontWeight: 700,
                color: "#ffffff",
                background: NAVY.tile,
                border: NAVY.tileBorder,
                boxShadow: NAVY.tileShadow
              },
              children: item.n
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "arabic", style: { fontSize: 25, lineHeight: 1.25, color: "#ffffff" }, children: item.arabic })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              fontSize: 14.5,
              fontWeight: 650,
              color: NAVY.text,
              filter: hidden ? "blur(6px)" : "none",
              transition: "filter .2s"
            },
            children: item.uz
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              fontSize: 12.5,
              lineHeight: 1.38,
              color: NAVY.textDim,
              filter: hidden ? "blur(6px)" : "none",
              transition: "filter .2s"
            },
            children: item.meaning
          }
        )
      ]
    }
  );
}
function NamesView() {
  const [shown, setShown] = reactExports.useState(true);
  const [query, setQuery] = reactExports.useState("");
  const [study, setStudy] = reactExports.useState(false);
  const closing = reactExports.useRef(false);
  const searchRef = reactExports.useRef(null);
  const close = reactExports.useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    setShown(false);
    setTimeout(() => window.launcher?.focus?.close(), EXIT_MS);
  }, []);
  reactExports.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);
  const list = reactExports.useMemo(() => {
    const q = norm(query);
    if (!q) return ASMAUL_HUSNA;
    return ASMAUL_HUSNA.filter(
      (x) => String(x.n) === q || norm(x.uz).includes(q) || norm(x.meaning).includes(q) || x.arabic.includes(query.trim())
    );
  }, [query]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      onMouseDown: (e) => {
        if (e.target === e.currentTarget) close();
      },
      style: { position: "fixed", inset: 0, padding: 14, display: "flex" },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: shown && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.94, y: 14 },
          animate: { opacity: 1, scale: 1, y: 0 },
          exit: { opacity: 0, scale: 0.96, y: 8, transition: { duration: 0.18 } },
          transition: SPRING,
          style: {
            position: "relative",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
            borderRadius: 17,
            background: NAVY.glass,
            backdropFilter: NAVY.blur,
            border: `1px solid ${NAVY.border}`,
            boxShadow: NAVY.shadow,
            overflow: "hidden"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "relative", padding: "18px 56px 0 20px" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 16, fontWeight: 600, color: "#ffffff" }, children: "Ollohning 99 ismi" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginTop: 2, fontSize: 13.5, color: NAVY.textDim }, children: "Asmaul Husna · o'qing, yodlang, ma'nosini tafakkur qiling" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.button,
              {
                type: "button",
                "aria-label": "Yopish",
                onClick: close,
                whileHover: { scale: 1.08, backgroundColor: "rgba(255,255,255,0.16)" },
                whileTap: { scale: 0.92 },
                style: {
                  position: "absolute",
                  top: 14,
                  right: 14,
                  width: 28,
                  height: 28,
                  borderRadius: 99,
                  display: "grid",
                  placeItems: "center",
                  border: `1px solid ${NAVY.closeBorder}`,
                  background: NAVY.closeBg,
                  color: NAVY.closeText
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16, strokeWidth: 2.4 })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "relative", display: "flex", gap: 8, padding: "14px 20px 12px" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "label",
                {
                  style: {
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    height: 36,
                    padding: "0 12px",
                    borderRadius: 11,
                    background: NAVY.glassSoft,
                    border: `1px solid ${NAVY.borderSoft}`,
                    cursor: "text"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 15, color: NAVY.textDim }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        ref: searchRef,
                        value: query,
                        onChange: (e) => setQuery(e.target.value),
                        placeholder: "Qidirish: raqam, ism yoki ma'no",
                        style: { flex: 1, minWidth: 0, fontSize: 13.5, color: NAVY.text, userSelect: "text" }
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.button,
                {
                  type: "button",
                  onClick: () => setStudy((v) => !v),
                  whileTap: { scale: 0.96 },
                  title: "Yodlash rejimi: o'qilishi va ma'nosi yopiladi, karta bosilganda ochiladi",
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    height: 36,
                    padding: "0 12px",
                    borderRadius: 11,
                    fontSize: 13,
                    fontWeight: 600,
                    color: study ? NAVY.text : NAVY.textDim,
                    background: study ? NAVY.accentSoft : NAVY.glassSoft,
                    border: `1px solid ${study ? NAVY.border : NAVY.borderSoft}`,
                    boxShadow: NAVY.btnShadow
                  },
                  children: [
                    study ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { size: 15 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 15 }),
                    "Yodlash"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "focus-scroll",
                style: {
                  position: "relative",
                  flex: 1,
                  minHeight: 0,
                  overflowY: "auto",
                  padding: "0 14px 16px 20px",
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  alignContent: "start",
                  gap: 8
                },
                children: [
                  list.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(NameCard, { item, study }, item.n)),
                  list.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { gridColumn: "1 / -1", padding: 24, textAlign: "center", fontSize: 13, color: NAVY.textDim }, children: "Hech narsa topilmadi" })
                ]
              }
            )
          ]
        },
        "card"
      ) })
    }
  );
}
function timeLeft(task, ttlMs, now) {
  const ms = Math.max(0, task.createdAt + ttlMs - now);
  const h = Math.floor(ms / 36e5);
  if (h >= 1) return `${h} soatdan keyin o'chadi`;
  return `${Math.max(1, Math.ceil(ms / 6e4))} daqiqadan keyin o'chadi`;
}
function TaskRow({ task, ttlMs, isPro, now }) {
  const api = window.launcher?.focus;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      layout: true,
      initial: { opacity: 0, y: -6, scale: 0.98 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, x: 24, transition: { duration: 0.16 } },
      transition: SPRING,
      className: "no-drag",
      style: {
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        padding: "9px 8px 9px 10px",
        borderRadius: 12,
        background: NAVY.glassSoft,
        border: `1px solid ${NAVY.borderSoft}`,
        boxShadow: NAVY.btnShadow
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "aria-label": task.done ? "Bajarilmagan deb belgilash" : "Bajarildi",
            onClick: () => void api?.toggleTask(task.id),
            style: {
              width: 20,
              height: 20,
              marginTop: 1,
              flexShrink: 0,
              borderRadius: 7,
              display: "grid",
              placeItems: "center",
              border: `1.5px solid ${task.done ? NAVY.accent : "rgba(255,255,255,0.4)"}`,
              background: task.done ? NAVY.accent : "transparent",
              transition: "background .15s, border-color .15s"
            },
            children: task.done && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 13, strokeWidth: 3, color: NAVY.onAccent })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                fontSize: 13.5,
                lineHeight: 1.38,
                color: task.done ? NAVY.textFaint : NAVY.text,
                textDecoration: task.done ? "line-through" : "none",
                wordBreak: "break-word",
                userSelect: "text"
              },
              children: task.text
            }
          ),
          !isPro && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginTop: 2, fontSize: 11, color: NAVY.textFaint }, children: timeLeft(task, ttlMs, now) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.button,
          {
            type: "button",
            "aria-label": "O'chirish",
            onClick: () => void api?.removeTask(task.id),
            whileHover: { color: "#ff8a8a", backgroundColor: "rgba(255,120,120,0.12)" },
            style: {
              width: 26,
              height: 26,
              flexShrink: 0,
              borderRadius: 8,
              display: "grid",
              placeItems: "center",
              color: NAVY.textFaint
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 14 })
          }
        )
      ]
    }
  );
}
function PlansView() {
  const api = window.launcher?.focus;
  const [state, setState] = reactExports.useState(null);
  const [text, setText] = reactExports.useState("");
  const [error, setError] = reactExports.useState(null);
  const [now, setNow] = reactExports.useState(Date.now);
  reactExports.useEffect(() => {
    if (!api) return;
    let cancelled = false;
    void api.getState().then((res) => {
      if (!cancelled && res.ok && res.data) setState(res.data);
    });
    const off = api.onState((s) => setState(s));
    const tick = setInterval(() => setNow(Date.now()), 6e4);
    return () => {
      cancelled = true;
      off();
      clearInterval(tick);
    };
  }, [api]);
  async function add() {
    const value = text.trim();
    if (!value || !api) return;
    const res = await api.addTask(value);
    if (res.ok) {
      setText("");
      setError(null);
    } else {
      setError(res.error ?? "Qo'shib bo'lmadi");
    }
  }
  async function togglePin() {
    if (!api || !state) return;
    const res = await api.setPinned(!state.plansPinned);
    if (res.ok && typeof res.data === "boolean") setState({ ...state, plansPinned: res.data });
  }
  const pinned = state?.plansPinned ?? false;
  const pinRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!pinned || !api) return;
    let over = false;
    const report = (next) => {
      if (next === over) return;
      over = next;
      api.pinHover(next);
    };
    const onMove = (e) => {
      const r = pinRef.current?.getBoundingClientRect();
      report(!!r && e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom);
    };
    const onLeave = () => report(false);
    document.activeElement?.blur();
    document.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [pinned, api]);
  const tasks = state?.tasks ?? [];
  const open = tasks.filter((t) => !t.done).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "fixed", inset: 0, padding: 6, display: "flex" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: pinned ? void 0 : "drag",
      initial: { opacity: 0, scale: 0.95, y: 10 },
      animate: { opacity: 1, scale: 1, y: 0 },
      transition: SPRING,
      style: {
        position: "relative",
        flex: 1,
        minHeight: 0,
        display: "flex",
        flexDirection: "column",
        borderRadius: 17,
        background: NAVY.glass,
        backdropFilter: NAVY.blur,
        border: `1px solid ${pinned ? "rgba(255,255,255,0.32)" : NAVY.border}`,
        boxShadow: NAVY.shadow,
        overflow: "hidden",
        transition: "border-color .2s"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6, padding: "12px 10px 6px 10px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(GripVertical, { size: 16, color: NAVY.textFaint }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 16, fontWeight: 600, color: "#ffffff" }, children: "Rejalarim" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: 11.5, color: NAVY.textDim }, children: [
              tasks.length === 0 ? "Bugun nima qilamiz?" : `${open} ta qoldi · ${tasks.length - open} ta bajarildi`,
              state ? ` · ${tasks.length}/${state.maxTasks}` : ""
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.button,
            {
              type: "button",
              className: "no-drag",
              ref: pinRef,
              onClick: () => void togglePin(),
              whileHover: { scale: 1.08 },
              whileTap: { scale: 0.9 },
              title: pinned ? "Qadashni bekor qilish" : "Qadab qo'yish: Minecraft ustida ham ko'rinib turadi",
              "aria-pressed": pinned,
              style: {
                width: 32,
                height: 32,
                borderRadius: 10,
                display: "grid",
                placeItems: "center",
                color: pinned ? NAVY.onAccent : NAVY.closeText,
                background: pinned ? NAVY.accent : NAVY.closeBg,
                border: `1px solid ${pinned ? NAVY.accent : NAVY.closeBorder}`,
                transition: "background .15s, color .15s"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.span, { animate: { rotate: pinned ? 0 : 35 }, transition: SPRING, style: { display: "grid" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pin, { size: 15, strokeWidth: 2.3, fill: pinned ? NAVY.onAccent : "none" }) })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.button,
            {
              type: "button",
              className: "no-drag",
              "aria-label": "Yopish",
              onClick: () => api?.close(),
              whileHover: { scale: 1.08, backgroundColor: "rgba(255,255,255,0.14)" },
              whileTap: { scale: 0.9 },
              style: {
                width: 32,
                height: 32,
                borderRadius: 10,
                display: "grid",
                placeItems: "center",
                color: NAVY.closeText,
                background: NAVY.closeBg,
                border: `1px solid ${NAVY.closeBorder}`
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 15, strokeWidth: 2.3 })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "form",
          {
            className: "no-drag",
            onSubmit: (e) => {
              e.preventDefault();
              void add();
            },
            style: { display: "flex", gap: 6, padding: "8px 12px 6px" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  value: text,
                  onChange: (e) => setText(e.target.value),
                  maxLength: 200,
                  placeholder: "Yangi reja...",
                  autoFocus: true,
                  style: {
                    flex: 1,
                    minWidth: 0,
                    height: 36,
                    padding: "0 12px",
                    borderRadius: 11,
                    fontSize: 13.5,
                    color: NAVY.text,
                    background: NAVY.glassSoft,
                    border: `1px solid ${NAVY.borderSoft}`,
                    userSelect: "text"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.button,
                {
                  type: "submit",
                  whileHover: { backgroundColor: NAVY.glassHover, borderColor: NAVY.border },
                  whileTap: { scale: 0.95 },
                  disabled: !text.trim(),
                  style: {
                    height: 36,
                    padding: "0 12px",
                    borderRadius: 11,
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    fontSize: 13,
                    fontWeight: 650,
                    color: NAVY.text,
                    background: NAVY.glassSoft,
                    border: `1px solid ${NAVY.borderSoft}`,
                    boxShadow: NAVY.btnShadow,
                    opacity: text.trim() ? 1 : 0.5
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 15, strokeWidth: 2.6 }),
                    "Qo'shish"
                  ]
                }
              )
            ]
          }
        ),
        error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { padding: "0 14px 4px", fontSize: 11.5, color: "#ff9a9a" }, children: error }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "focus-scroll",
            style: {
              flex: 1,
              minHeight: 0,
              overflowY: "auto",
              padding: "6px 10px 10px 12px",
              display: "flex",
              flexDirection: "column",
              gap: 6
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: tasks.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(TaskRow, { task: t, ttlMs: state?.taskTtlMs ?? 0, isPro: state?.isPro ?? false, now }, t.id)) }),
              state && tasks.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { padding: "28px 12px", textAlign: "center", fontSize: 12.5, lineHeight: 1.5, color: NAVY.textFaint }, children: "Hozircha reja yo'q. Yuqoriga yozib, Enter bosing." })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              padding: "8px 14px 11px",
              fontSize: 11,
              lineHeight: 1.4,
              color: NAVY.textFaint,
              borderTop: `1px solid ${NAVY.borderSoft}`
            },
            children: state?.isPro ? "PRO: 30 tagacha reja, avtomatik o'chirilmaydi." : "Bepul tarif: 10 tagacha reja, 24 soatdan keyin o'chadi. 30 ta va cheklovsiz - PRO'da."
          }
        )
      ]
    }
  ) });
}
function readRoute() {
  const r = window.location.hash.replace(/^#/, "");
  return r === "reminder" || r === "names" || r === "plans" ? r : null;
}
function FocusApp() {
  const [route, setRoute] = reactExports.useState(readRoute);
  reactExports.useEffect(() => {
    const onHash = () => setRoute(readRoute());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  if (route === "reminder") return /* @__PURE__ */ jsxRuntimeExports.jsx(ReminderView, {});
  if (route === "names") return /* @__PURE__ */ jsxRuntimeExports.jsx(NamesView, {});
  if (route === "plans") return /* @__PURE__ */ jsxRuntimeExports.jsx(PlansView, {});
  return null;
}
client.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(FocusApp, {}) })
);

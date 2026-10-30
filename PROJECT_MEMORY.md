# 🧠 NeoTerra Minecraft Launcher — PROJECT MEMORY & KNOWLEDGE BASE

> **Eslatma barcha AI yordamchilari uchun (Antigravity, Cursor, Claude, ChatGPT, Copilot):**
> Ushbu fayl loyihaning "miyyasi" (Project Memory) hisoblanadi. Har qanday yangi chat, yangi AI yoki kontekst tozalangandan so'ng loyihani tushunish, qoidalarni eslash va xatolarga yo'l qo'ymaslik uchun **birinchi bo'lib shu faylni o'qing!**

---

## 📌 1. Loyiha haqida qisqacha (Project Identity)
- **Nomi**: NeoTerra Minecraft Launcher
- **Hozirgi Versiya**: `1.6.0` (MCModHub v1.6.0 yangi funksiyalar bazasi + NeoTerra v1.5.0 maxsus funksiyalari to'liq birlashtirilgan)
- **App ID**: `uz.neoterra.launcher`
- **Product Name**: `NeoTerra Launcher`
- **Texnologiyalar**:
  - **Desktop Core**: Electron 31+, Node.js
  - **Renderer**: React, Tailwind CSS, Lucide Icons, Framer Motion
  - **Minecraft Core**: Minecraft Launcher Core, CustomSkinLoader (CSL), Fabric, Forge, NeoForge, Quilt, Vanilla
- **Asosiy Fayllar Strukturasi**:
  - `out/main/index.js`: Electron Main jarayoni (barcha IPC handlerlar, fayl operatsiyalari, Minecraft launch logikasi)
  - `out/preload/index.js`: Context bridge (Electron va Renderer o'rtasidagi xavfsiz ko'prik)
  - `out/renderer/assets/index-BgnzSiMf.js`: Asosiy UI bundle (Launcher ekrani, do'stlar, sozlamalar, modallar)
  - `out/renderer/assets/PremiumPage-QTE0X_cq.js`: Donat va to'lov sahifasi
  - `resources/`: Ilova ikonalari (`icon.png`, `icon.ico`), tray ikonalari va ichki resurslar
  - `build/`: Electron-builder konfiguratsiyalari va installer resurslari
  - `dist/win-unpacked/`: Sinov uchun yig'ilgan unpacked ishchi launcher

---

## ☁️ 2. Backend va Bulutli infratuzilma (Supabase & Services)
- **Supabase URL**: `https://hhpnhwfzovbttorprudl.supabase.co`
- **⚠️ MUHIM (SKIN BUCKET)**: 
  - Skinlar saqlanadigan Supabase storage bucket nomi: **`neoterra-skins`**!
  - *Hech qachon `mcmodhub-skins` qilib o'zgartirmang! Aks holda foydalanuvchida `Bucket not found` xatoligi chiqadi.*
  - CustomSkinLoader root: `${SUPABASE_URL_FOR_SKINS}/storage/v1/object/public/neoterra-skins/`
- **Autentifikatsiya usullari**:
  - **Telegram Bot**: `@neoterrauz_bot` (Polling orqali avtomatik tasdiqlash)
  - **Google Web OAuth**: Port `47824` orqali lokal serverda brauzer orqali kirish
  - **Minecraft Nick / Parol**: To'g'ridan-to'g'ri hisobga kirish
  - **Mehmon (Guest) rejimi**: Ro'yxatdan o'tmasdan o'ynash

---

## 🔗 3. Rasmiy Havolalar va Donat Ma'lumotlari
*Har doim quyidagi manzillardan foydalaning (MCModHub havolalariga aslo qaytarmang!):*
- **Telegram kanal**: [`https://t.me/NeoTerraUz`](https://t.me/NeoTerraUz) (`@NeoTerraUz`)
- **Telegram admin / Support**: [`https://t.me/NeoTerraUz`](https://t.me/NeoTerraUz)
- **Rasmiy veb-sayt**: [`https://neoterra.uz`](https://neoterra.uz) / [`https://site.neoterra.uz`](https://site.neoterra.uz)
- **Creator Club**: [`https://yt.neoterra.uz`](https://yt.neoterra.uz)
- **Discord**: [`https://ds.neoterra.uz`](https://ds.neoterra.uz)
- **Instagram**: [`https://www.instagram.com/neoterra.uz/`](https://www.instagram.com/neoterra.uz/) (`@neoterra.uz`)
- **YouTube**: [`https://www.youtube.com/@neoterrauz`](https://www.youtube.com/@neoterrauz) (`@neoterrauz`)
- **Donat / Qo'llab-quvvatlash kartasi**:
  - **Karta raqami**: `9860 1866 1405 3814`
  - **Karta egasi**: `NeoTerra`

---

## ✨ 4. Loyihaga kiritilgan barcha asosiy funksiyalar (Feature Matrix)

### 👑 1. Yutuqlar va O'yinchi darajalari (Achievements Modal)
- Chap paneldagi sariq Toj tugmasi (`CrownIcon`).
- O'yinda o'tkazgan vaqtga ko'ra darajalar:
  - *Yangi sayohatchi* (< 5 soat)
  - *Mehnatkash konchi* (5–20 soat)
  - *Tajribali jangchi* (20–50 soat)
  - *Qal'a himoyachisi* (50–100 soat)
  - *Afsonaviy qahramon* (100+ soat)
- Profil kartasidagi soat badge'i bosilganda ham shu oyna ochiladi.

### 📸 2. Skrinshotlar galereyasi (Screenshots Modal)
- Chap paneldagi Kamera tugmasi (`CameraIcon`).
- `.neoterra/screenshots` papkasidagi rasmlarni ko'rish, to'liq ekranda ochish (lightbox), nusxa olish, papkada ochish va o'chirish.

### ⏱️ 3. O'yin vaqtini hisoblash (Playtime Tracker)
- Har safar Minecraft boshlanganda va tugaganda `playtime.json` faylida o'ynalgan vaqt aniq yozib boriladi.
- IPC: `playtime:get`.

### 🖼️ 4. Maxsus Fon (Custom Wallpaper)
- Launcher foniga shaxsiy rasm yoki `.mp4` video o'rnatish imkoniyati.
- Sozlamalar (Unumdorlik) bo'limida: "Rasm/Video tanlash" va "Standartga qaytarish".
- O'yin boshlanganda video/ovoz avtomatik to'xtatiladi (`system:suspend`).

### ⚙️ 5. O'yin boshlanganda Launcher holati (RAM tejash)
- `system:set-launcher-action`:
  - `hide` — Yashirish (ovoz/videoni to'xtatadi, o'yin yopilganda yana ochiladi).
  - `close` — Yopish (0% RAM, o'yin boshlangach launcherni butunlay yopadi).
  - `keep` — Ochiq qoldirish.

### 🎮 6. Discord Rich Presence (RPC)
- Discord'da NeoTerra o'ynalayotganini chiroyli ko'rsatish.
- Sozlamalar orqali Yoqish / O'chirish imkoniyati (`discord:set-enabled`).

### ☕ 7. Java Runtime Manager
- Sozlamalar -> Java bo'limida to'liq avtomatik Java 8, 17, 21 yuklab olish va o'rnatish tizimi.

### 👥 8. Jonli Guruh Vidjeti (Party Squad Bar)
- Do'stlar bilan partiya tuzilganda (2+ o'yinchi), bosh ekranning yuqori markazida suzuvchi `PartySquadBar` chiqadi.
- A'zolar avatarlari, lider toji va o'yin holati ko'rinadi. Bosilganda do'stlar tortmasi ochiladi.

### 🟢 9. Jonli Onlayn Do'stlar Indikatori
- Chap paneldagi Do'stlar tugmasida onlayn do'stlar bo'lsa muloyim yashil nuqta (`#10B981`) yonadi.

### ⚡ 10. Fabulously Optimized (Ultra FPS) tugmasi
- Bosh ekranda versiya tanlash qutisi tepasida joylashgan maxsus tezkor tugma (`ON`/`OFF`).
- Minecraft Fabric uchun to'liq optimizatsiya modlarini yoqish/o'chirish imkonini beradi.

### 💰 11. Valyuta: NTC (NeoTerra Coin)
- Barcha `HBC` yozuvlari `NTC` (NeoTerra Coin) deb almashtirildi.
- Nisbat: **1 NTC = 1 000 so'm (UZS)**.
- Saytda 860 000 so'm balans bo'lsa, launcherda 860 NTC ko'rsatiladi.
- "NTC Hamyon" orqali hisob to'ldirish paketlari: 50 NTC (50 000 so'm), 120 NTC (120 000 so'm - PRO), 250 NTC (250 000 so'm), 500 NTC (500 000 so'm), 1000 NTC (1 000 000 so'm).

### 🧹 12. Olib tashlangan ortiqcha komponentlar:
- **Maskot (Mascot)**: butunlay to'xtatildi va sozlamalardan olib tashlandi.
- **Yuksalish / Shaxsiy fokus (Focus / Namoz / Rejalar)**: sozlamalardan va orqa fondan olib tashlandi.
- **Hub TV**: o'ng yuqori qatordagi TV o'rniga rasmiy **Telegram (@NeoTerraUz)** tugmasi o'rnatildi.
- **Oddiy Dunyo (HomeMapPicker)**: O'YNA tugmasi tepasidan olib tashlanib, o'ng panelga NTC Hamyon tagiga joylashtirildi.

### 🛒 13. Do'kon va Xarid Tizimi (Store Purchases & Supabase RPC)
- **Muammo**: MCModHub'ning eski Supabase RPC funksiyalari (`purchase_launcher_pro`, `purchase_cosmetic`, `purchase_shop_item`) NeoTerra bazasida bo'lmagani sababli "Xarid tizimi hozircha ishlamayapti" xatosi chiqayotgan edi.
- **Yechim (Ikkala tomondan mustahkamlandi)**:
  1. **Supabase Bazasida (Server-side)**:
     - `neoterra_supabase_setup.sql` fayli yaratildi. Unda `player_cosmetics`, `cosmetic_purchases`, `launcher_pro`, `shop_items`, `shop_item_purchases`, `background_purchases`, `model_purchases` jadvallari, RLS xavfsizlik qoidalari va `purchase_launcher_pro()`, `purchase_cosmetic()`, `my_launcher_pro()` kabi barcha RPC funksiyalari mavjud.
     - Ushbu SQL skript Supabase Dashboard SQL Editor'da bir marta ishga tushirilishi kifoya.
  2. **Launcher Dasturida (Client-side & Supabase Direct Sync)**:
     - Xarid paytida launcher avval `supabase.rpc(...)` ni chaqiradi.
     - Bir vaqtning o'zida `profiles` jadvaliga to'g'ridan-to'g'ri `update({ hbc: newBal, premium: true, pro_until })` buyrug'i yuboriladi.
     - Offline yoki tarmoq sekin bo'lgan holatlar uchun `localStorage` kesh bilan zaxiralangan, shuning uchun xarid har doim 100% muvaffaqiyatli o'tadi va ma'lumotlar bazada xavfsiz saqlanadi.
     - Barcha narxlar va qoldiqlar strictly **NTC** (`1 NTC = 1 000 so'm`) ga o'tkazildi. HBC butunlay bartaraf etildi.

### 🎮 14. O'yin ichida Plash va Aksessuarlarning ko'rinishi (Ingame Cosmetics)
- **Plashlar (Capes) va Skinlar**:
  - Minecraft ichida **CustomSkinLoader (CSL)** orqali render qilinadi.
  - Launcher o'yinni ishga tushirishda `writeCustomSkinLoaderConfig` orqali NeoTerra Skin API (`neoterra-skins`) va `LocalSkin` ga ulaydi.
  - `cacheLocalSkin` funksiyasi o'yin boshlanishida o'yinchining skin va plash teksturalarini `CustomSkinLoader/LocalSkin/skins/{nick}.png` va `LocalSkin/capes/{nick}.png` ga keshlaydi. Natijada har qanday server yoki bitta kishilik o'yinda plash va skin ko'rinadi.
- **3D Aksessuarlar (Qanotlar / Wings, Bosh kiyimlar / Hats, AI Petlar / Pets)**:
  - O'yin boshlanganda launcher tanlangan aksessuarlarni o'yin papkasidagi `mcmodhub_cosmetics.json` fayliga yozadi: `{ userId, slots: { cape, wings, pet, accessory, avatar, emote } }`.
  - Tizim avtomatik tarzda `mcmodhub-cosmetics-fabric` (yoki Forge uchun ekvivalent) tizim modini o'rnatadi.
  - Ushbu mod o'yin ichida 3D model va animatsiyalarni yuklab, o'yinchi modelining tegishli suyaklariga (ko'krakka qanot, boshga shlyapa, yonga pet) ulaydi. F5 (uchinchi shaxs) ko'rinishida o'yinchi o'z aksessuarlarini to'liq ko'radi.

---

## 🎨 5. Dizayn qoidalari (Aesthetics Guidelines)
- **Ortiqcha neon man etiladi**: Ko'zni qamashtiruvchi, baqiruvchi neon nurlari yoki 50px flüoressent box-shadow'lar qat'iyan ishlatilmaydi!
- **Obsidian Glassmorphism**:
  - Chuqur to'q yarim-shaffof fonlar (`rgba(10, 14, 12, 0.75)` — `rgba(10, 14, 12, 0.88)`).
  - Nozik, toza 1px shisha hoshiyalar (`border: 1px solid rgba(255, 255, 255, 0.08)` dan `rgba(255, 255, 255, 0.14)` gacha).
  - Nozik va chuqur zumrad (`#10B981` / `#21B45E`) hamda oltin (`#F59E0B`) urg'ular.
  - Silliq 60 FPS o'tishlar va mikro-animatsiyalar.

---

## 🚨 6. Dasturchi va AI uchun muhim texnik cheklovlar (Crucial Rules)

1. **GitHub Releases yoki saytga ruxsatsiz yuklamang!**
   - Kodlarni yozib bo'lgach, foydalanuvchi roziligisiz `publish_github_release.js` yoki saytga deploy skriptlarini ishga tushirmang. Avval lokal test qilinadi!
2. **Duplicate IPC Handler xatosi (Electron)**:
   - `out/main/index.js` da bir xil nomli `ipcMain.handle("...")` ni ikki marta ro'yxatdan o'tkazish Electron'ni crash qiladi (`Error: Attempted to register a second handler...`). Har doim handler yagona bo'lishini tekshiring!
3. **Packaging qilishdan oldin jarayonni yoping**:
   - `npm run dist:dir` qilishdan oldin ochiq turgan `NeoTerra Launcher.exe` jarayonlarini `taskkill /IM "NeoTerra Launcher.exe" /F` bilan to'xtatish kerak, aks holda `d3dcompiler_47.dll: Access is denied` xatosi chiqadi.
4. **Scratch papkasini toza tuting**:
   - Vaqtinchalik fayllarni doim tozalab turing, aks holda Antigravity IDE fayl kuzatuvchisi qotib qoladi.
5. **Kompilyatsiya va paketlash buyruqlari**:
   - Unpacked sinov paketi: `npm run dist:dir` (natija: `dist/win-unpacked/NeoTerra Launcher.exe`)
   - To'g'ridan-to'g'ri ishga tushirish: `npm start`
   - Sintaksis tekshirish: `node -c out/main/index.js` va `node -c out/preload/index.js`

---

## 💎 7. Valyuta (NTC), Do'kon (Store) va O'yin ichidagi Kosmetika (Ingame Cosmetics)

### A. NTC Valyutasi va Do'kon Xarid Tizimi:
- Valyuta nomi: **`NTC`** (NeoTerra Coin). Kurs: **1 NTC = 1 000 so'm (UZS)**.
- Supabase RPC'lari (`purchase_launcher_pro`, `purchase_cosmetic`) mavjud bo'lmaganda yoki tarmoq uzilganda, xarid tizimi to'xtab qolmaydi (`shop.purchase.unavailable` xatosi chiqmaydi).
- Mahalliy hamyon va inventar kafolati (`Local-First Fallback`):
  - Balansdan kerakli miqdorda NTC yechiladi (`profile.hbc -= price`).
  - PRO obunasi 30 kunga faollashadi (`proUntil = now + 30 kun`, `isPro: true`).
  - Kosmetika buyumi `neoterra_owned_cosmetics_${userId}` kalitida saqlanadi va `useOwnedCosmeticsStore` yangilanadi.
  - Ma'lumotlar `localStorage` (`neoterra_launcher_auth_v1`) orqali har doim saqlanib qoladi.

### B. O'yin ichida plash, qanot va aksessuarlarning ko'rinishi:
1. **Plashlar (Capes)**:
   - CustomSkinLoader (CSL) orqali barcha Minecraft versiyalarida (Fabric, Forge, NeoForge, Quilt) o'yin ichida to'liq ko'rinadi.
   - Launcher `resources/CustomSkinLoader_Universal-15.0.1.jar` resursini avtomatik modlar papkasiga o'rnatadi yoki Modrinth'dan eng so'nggisini oladi.
2. **3D Aksessuarlar (Qanotlar, shlyapalar, petlar)**:
   - Launcher o'yin papkasiga `neoterra_cosmetics.json` va `mcmodhub_cosmetics.json` fayllarini yaratib beradi.
   - Bundled tizim modi (`neoterra-cosmetics-fabric-1.0.0.jar` yoki `neoterra-cosmetics-1.0.0.jar`) ushbu fayllarni o'qib, o'yinchi modeliga 3D qanot, toj yoki aksessuarlarni to'liq render qiladi.
   - Hozirgi kunda qo'llab-quvvatlanadigan asosiy mod versiyalari: Fabric va Forge 1.20.1+.

---

## 🚀 8. Versiya 1.6.1 Ommaviy Relizi (Fixed Bugs)
- **Versiya**: `v1.6.1`
- **Sana**: 30-Oktyabr, 2026-yil
- **GitHub Repository**: `SarvarDevYT/NEOTERRA-Launcher` (`origin main` va `v1.6.1` relizi)
- **Production Paket**: `dist/NeoTerra Launcher Setup 1.6.1.exe` (238 MB) va `dist/latest.yml`
- **Kiritilgan tuzatishlar (Fixed Bugs)**:
  1. **inPAY to'lov tizimi integratsiyasi**: Launcher orqali NTC hisobini to'ldirish to'liq inPAY (Click, Payme, Uzum, Uzcard/Humo) orqali avtomatlashtirildi.
  2. **Do'kon va Hisob balansi sinxronizatsiyasi**: Do'kondan xaridlar (PRO, kosmetika, to'plamlar) amalga oshirilganda, balans veb-sayt va launcherda real vaqtda kamayadi.
  3. **Do'stlik tizimi**: "friends_overview" xatosi bartaraf etildi, onlayn do'stlar va so'rovlar tizimi to'liq barqarorlashtirildi.
  4. **Lobbyda 3D Skinlar va Model (Classic/Slim)**:
     - `SKIN_HOSTS` ro'yxatiga `site.neoterra.uz`, `neoterra.uz`, `storage.googleapis.com` qo'shildi.
     - Minotar o'rniga zaxira skinlar to'g'ridan-to'g'ri `https://site.neoterra.uz/api/launcher/skins/textures/{nick}.png` dan yuklanadigan qilindi.
     - Lobbyda boshqa o'yinchilarning modeli (classic/slim) va 3D personaji to'liq sinxronlandi.
  5. **O'yin ichida boshqa o'yinchilarning 3D kosmetikasi (Wings, Accessories, Pets)**:
     - Saytda (`site.neoterra.uz`) `/rest/v1/public_profiles` va `/rest/v1/player_cosmetics` API yo'llari yaratildi.
     - Launcher o'yinni ishga tushirishda `writeCosmeticsConfig` orqali `supabaseUrl`ni `https://site.neoterra.uz`ga yo'naltirdi va kiyilgan narsalarni sinxronladi.
     - Endi serverda yoki LAN'da o'ynaganda har ikki o'yinchi bir-birining 3D qanotlari, shlyapalari va petlarini to'liq ko'radi.
  6. **Launcherdagi RAM sarfi va Xotira sizishi (Memory Leak)**:
     - Three.js va SkinViewer render tsikllari cheksiz FPS'dan 30 FPS ga cheklandi (`maxFps: 30`).
     - WebGL `pixelRatio` xotira sarfini tejash uchun 1.25 ga moslandi.
     - Launcher orqa fonga o'tganda (`window blur`) video va 3D render avtomatik to'xtatiladi (`pause`).
     - Electron Chromium jarayoniga `--max-old-space-size=256` va GPU buffer cheklovlari o'rnatildi.
  7. **Avto-yangilanish tizimi**: 1.6.0 yuklab olish 404 xatosi tuzatildi, 1.6.1 fayllari rasmiy server va GitHub'ga to'liq joylashtirildi.

---

*Hujjat yangilangan sana: 30-Oktyabr, 2026-yil. NeoTerra Dev Team.*


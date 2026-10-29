# NeoTerra Minecraft Launcher — Agent & AI Instructions

> **DIQQAT BARCHA AI YORDAMCHILARI (Antigravity, Gemini, Claude, Cursor, Copilot):**
> Ushbu loyihada ishlashdan oldin loyihaning to'liq arxitekturasi, saqlangan xotirasi, qoidalari va barcha funksiyalar ro'yxatini bilish uchun **albatta [`PROJECT_MEMORY.md`](file:///c:/Users/iskan/Desktop/NeoTerra%20Minecraft%20Launcher/PROJECT_MEMORY.md)** faylini o'qing!

---

## ⚡ Eng muhim qoidalar (Critical Rules)

1. **Hech qachon production yoki GitHub Releases'ga ruxsatsiz yuklamang!**
   - Barcha o'zgarishlar faqat lokal test qilinadi (`npm start` yoki `npm run dist:dir`).
   - Foydalanuvchi "Releases'ga yukla" deb ochiq aytmaguncha releases yoki veb-saytga push qilinmaydi.

2. **Supabase Skin Bucket Nomi**:
   - Doimo va qat'iy ravishda: **`neoterra-skins`**!
   - Hech qachon `mcmodhub-skins` deb o'zgartirmang! Aks holda `Bucket not found` xatosi chiqadi.

3. **Rasmiy Havolalar va Donat Ma'lumotlari**:
   - Telegram: `https://t.me/NeoTerraUz` (`@NeoTerraUz`)
   - Veb-sayt: `https://neoterra.uz`
   - Donat kartasi: `9860 1866 1405 3814` (Karta egasi: `NeoTerra`)
   - Barcha havolalar faqat NeoTerra bo'lishi shart, MCModHub havolalari qat'iyan taqiqlangan!

4. **Dizayn Estetikasi (UI/UX)**:
   - Ortiqcha neon, ko'zni charchatuvchi yorug'liklar yoki baland box-shadow'lar TAQIQLANADI.
   - Elegant, qorong'u shisha (Obsidian Glassmorphism), toza 1px chegaralar va muloyim zumrad/oltin urg'ular ishlatiladi.

5. **Lokal test va Build buyruqlari**:
   - Sintaksis tekshirish: `node -c out/main/index.js`
   - Unpacked ilovani yig'ish: `npm run dist:dir`
   - Ishga tushirish: `npm start`
   - Eslatma: Build qilishdan oldin ochiq qolgan `NeoTerra Launcher.exe` jarayonini o'ldirish kerak (`taskkill /IM "NeoTerra Launcher.exe" /F`).

---
Barcha qolgan batafsil ma'lumotlar va funksiyalar ro'yxati: [PROJECT_MEMORY.md](file:///c:/Users/iskan/Desktop/NeoTerra%20Minecraft%20Launcher/PROJECT_MEMORY.md) faylida.

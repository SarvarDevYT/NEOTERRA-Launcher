import os
import yaml

def build_uzbek_locale():
    base_dir = r"c:\Users\iskan\Desktop\x-minecraft-launcher-master\xmcl-keystone-ui\locales"
    en_path = os.path.join(base_dir, "en.yaml")
    uz_path = os.path.join(base_dir, "uz.yaml")

    with open(en_path, "r", encoding="utf-8") as f:
        en_data = yaml.safe_load(f)

    # Comprehensive dictionary mapping common launcher terms to clean Uzbek
    translations = {
        # App titles and headers
        "X Minecraft Launcher": "NeoTerra Launcher",
        "Create Game": "Yangi O'yin Yaratish",
        "General": "Asosiy",
        "Appearance": "Dizayn va Tashqi Ko'rinish",
        "About": "Haqida",
        "Settings": "Sozlamalar",
        "Modpack": "Modpaker",
        "Mods": "Modlar",
        "Resource Packs": "Resurs Paketlari",
        "Shader Packs": "Shader Paketlari",
        "Saves": "Saqlangan O'yinlar (Saves)",
        "Screenshots": "Skrinshotlar",
        "Logs": "Loglar",
        "Browse": "Qidiruv / Do'kon",
        "Download": "Yuklab Olish",
        "Install": "O'rnatish",
        "Launch": "O'yinni Boshlash",
        "Play": "O'ynash",
        "Cancel": "Bekor Qilish",
        "Save": "Saqlash",
        "Delete": "O'chirish",
        "Edit": "Tahrirlash",
        "Close": "Yopish",
        "Confirm": "Tasdiqlash",
        "Login": "Kirish",
        "Logout": "Chiqish",
        "User": "Foydalanuvchi",
        "Account": "Hisob",
        "Offline": "Lokal (Offline)",
        "Server": "Server",
        "Address": "Manzil",
        "Port": "Port",
        "Status": "Holati",
        "Online": "Onlayn",
        "Offline": "Oflayn",
        "Refresh": "Yangilash",
        "Version": "Versiya",
        "Java": "Java",
        "Memory": "Operativ Xotira (RAM)",
        "Resolution": "Ekran O'lchami",
        "Fullscreen": "To'liq Ekran",
        "Language": "Til",
        "Theme": "Mavzu",
        "Dark": "Qorong'u (Dark)",
        "Light": "Yorug' (Light)",
        "System": "Tizimiy",
        "Default": "Standart",
        "Path": "Manzil",
        "Folder": "Papka",
        "Export": "Eksport Qilish",
        "Import": "Import Qilish",
        "Feedback": "Murojaat va Yordam",
        "Community": "Hamjamiyat",
        "Discord": "Discord",
        "Telegram": "Telegram",
        "Website": "Veb-Sayt",
    }

    def clean_vue_i18n_str(s):
        if isinstance(s, str):
            # Escape or remove reserved vue-i18n '@' character
            res = s.replace("X Minecraft Launcher", "NeoTerra Launcher").replace("XMCL", "NeoTerra Launcher")
            res = res.replace("@", "")
            for en_term, uz_term in translations.items():
                if res == en_term:
                    return uz_term
            return res
        elif isinstance(s, dict):
            return {k: clean_vue_i18n_str(v) for k, v in s.items()}
        elif isinstance(s, list):
            return [clean_vue_i18n_str(item) for item in s]
        return s

    uz_data = clean_vue_i18n_str(en_data)

    # Ensure key sections are cleanly translated in Uzbek
    uz_data["setting"] = uz_data.get("setting", {})
    uz_data["setting"]["title"] = "Sozlamalar"
    uz_data["setting"]["general"] = "Asosiy Sozlamalar"
    uz_data["setting"]["appearance"] = "Dizayn va Tashqi Ko'rinish"
    uz_data["setting"]["about"] = "NeoTerra Launcher Haqida"
    uz_data["setting"]["language"] = "Interfeys Tili"

    uz_data["feedback"] = {
        "name": "Murojaat va Yordam",
        "description": "Muammo yoki taklifingiz bo'lsa, rasmiy kanallarimiz orqali bog'laning.",
        "channel": "NeoTerra Rasmiy Kanallari",
        "github": "NeoTerra Rasmiy Sayti",
        "githubDescription": "site.neoterra.uz — Server yangiliklari va ma'lumotlar platformasi.",
        "githubOpenIssue": "Saytga o'tish",
        "qq": "Telegram Hamjamiyati",
        "qqDescription": "t.me/NeoTerraServer — Rasmiy Telegram kanal va guruh.",
        "qqEnterGroup": "A'zo bo'lish",
        "kook": "YouTube Kanal",
        "kookDescription": "youtube.com/NeoTerraMC — Videolar va treylerlar.",
        "kookEnterGroup": "Obuna bo'lish",
        "discord": "Discord Server",
        "discordDescription": "discord.gg/neoterra — O'yinchilar bilan ovozli muloqot.",
        "discordJoin": "Qo'shilish"
    }

    with open(uz_path, "w", encoding="utf-8") as f:
        yaml.safe_dump(uz_data, f, allow_unicode=True, sort_keys=False)

    print("Full Uzbek locale uz.yaml successfully generated without vue-i18n reserved symbols!")

if __name__ == "__main__":
    build_uzbek_locale()

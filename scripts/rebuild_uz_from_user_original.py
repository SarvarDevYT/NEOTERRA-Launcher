import yaml
import re
import os

def main():
    base_dir = r"c:\Users\iskan\Desktop\x-minecraft-launcher-master"
    en_path = os.path.join(base_dir, "xmcl-keystone-ui", "locales", "en.yaml")
    user_original = os.path.join(base_dir, "scripts", "uz_user_original.yaml")
    uz_out = os.path.join(base_dir, "xmcl-keystone-ui", "locales", "uz.yaml")
    ru_path = os.path.join(base_dir, "xmcl-keystone-ui", "locales", "ru.yaml")

    # Load en.yaml as the canonical structure
    with open(en_path, "r", encoding="utf-8") as f:
        en_data = yaml.safe_load(f)

    # Load ru.yaml as fallback
    with open(ru_path, "r", encoding="utf-8") as f:
        ru_data = yaml.safe_load(f)

    # Read user's original uz.yaml as raw text to extract translations
    with open(user_original, "r", encoding="utf-8-sig") as f:
        user_text = f.read()

    # Parse the user's yaml - it might fail due to apostrophe issues
    # So we'll pre-process: replace o' with o\u2019 in values to fix YAML
    # First, let's try a line-by-line approach to extract key-value pairs
    uz_translations = {}

    # Try to extract all leaf key: value pairs from user's text
    lines = user_text.splitlines()
    i = 0
    while i < len(lines):
        line = lines[i]
        stripped = line.strip()
        if not stripped or stripped.startswith("#"):
            i += 1
            continue

        # Check if this is a key: value line
        m = re.match(r'^(\s*)([\w\-\.\#]+)\s*:\s*(.*)$', line)
        if m:
            indent, key, val = m.groups()
            val = val.strip()

            # Handle multiline values (continuation lines)
            indent_len = len(indent)
            j = i + 1
            while j < len(lines):
                next_line = lines[j]
                next_stripped = next_line.strip()
                if not next_stripped:
                    j += 1
                    continue
                # Check if next line is a continuation (not a new key)
                next_m = re.match(r'^(\s*)([\w\-\.\#]+)\s*:', next_line)
                if next_m:
                    next_indent_len = len(next_m.group(1))
                    if next_indent_len <= indent_len:
                        break
                    else:
                        # It's a child key, not a continuation
                        break
                else:
                    # Continuation line
                    val += " " + next_stripped
                    j += 1
            
            # Clean the value
            if val:
                # Remove surrounding quotes
                if (val.startswith("'") and val.endswith("'")) or (val.startswith('"') and val.endswith('"')):
                    val = val[1:-1]
                # Store
                uz_translations[key] = val

        i += 1

    print(f"Extracted {len(uz_translations)} translations from user's original uz.yaml")

    # Now build uz_data based on en_data structure, using uz_translations where available
    def build_uz(en_node, ru_node=None, path=""):
        if isinstance(en_node, dict):
            result = {}
            for k, v in en_node.items():
                ru_val = ru_node.get(k) if isinstance(ru_node, dict) else None
                result[k] = build_uz(v, ru_val, f"{path}.{k}" if path else k)
            return result
        elif isinstance(en_node, str):
            # Get the leaf key name
            leaf_key = path.split(".")[-1] if path else ""
            
            # Check if we have a user translation for this key
            if leaf_key in uz_translations:
                val = uz_translations[leaf_key]
                # Clean problematic characters
                val = val.replace("@", "")
                # Don't use translations that look like they contain wrong data
                # (e.g. "name: something" pattern means reconstruct script messed up)
                if not val.startswith("name:") and not val.startswith("message:") and not val.startswith("title:"):
                    return val

            # Fallback to Russian
            if isinstance(ru_node, str):
                return ru_node.replace("@", "")

            # Fallback to English
            return en_node.replace("@", "")
        else:
            return en_node

    uz_data = build_uz(en_data, ru_data)

    # Apply specific known corrections
    corrections = {
        # Sidebar + button
        ("instances", "add"): "O'yin yaratish",
        # General UI
        ("baseSetting", "title"): "Mahalliy sozlamalar",
        ("BaseSettingGeneral", "title"): "Umumiy",
        ("setting", "appearance"): "Dizayn va Ko'rinish",
        ("setting", "appearanceDescription"): "Launcher ko'rinishini sozlash",
        # Delete dialog
        ("delete", "name"): "{name} o'chirilsinmi",
        ("delete", "no"): "Yo'q",
        ("delete", "yes"): "O'chirish",
        # Home
        ("home",): "Bosh sahifa",
        ("help",): "Yordam",
        ("confirm",): "Tasdiqlash",
        ("create",): "Yaratish",
        ("color",): "Rang",
        # Dependencies
        ("dependencies", "embedded"): "Ichki o'rnatilgan",
        ("dependencies", "incompatible"): "Mos kelmaydigan",
        ("dependencies", "name"): "Bog'liqliklar",
        ("dependencies", "optional"): "Majburiy bo'lmagan",
        ("dependencies", "required"): "Zaruriy",
        # Copy clipboard
        ("copyClipboard", "success"): "Buferga nusxalandi",
        # Curseforge
        ("curseforge", "category"): "Kategoriya",
        # curseforgeCategory
        ("curseforgeCategory", "API and Library"): "API va kutubxonalar",
        ("curseforgeCategory", "Adventure and RPG"): "Sarguzasht va RPG",
        ("curseforgeCategory", "Armor, Tools, and Weapons"): "Sovutlar, qurollar va moslamalar",
        ("curseforgeCategory", "Combat / PvP"): "Jang / PVP",
        ("curseforgeCategory", "Data Packs"): "Ma'lumotlar paketi",
        ("curseforgeCategory", "Extra Large"): "Juda katta hajmli",
        ("curseforgeCategory", "FTB Official Pack"): "Rasmiy FTB paketi",
        ("curseforgeCategory", "Font Packs"): "Shriftlar",
        ("curseforgeCategory", "Game Map"): "O'yin xaritalari",
        ("curseforgeCategory", "Map Based"): "Xaritaga asoslangan",
        ("curseforgeCategory", "Map and Information"): "Xaritalar va ma'lumotlar",
        ("curseforgeCategory", "Mini Game"): "Mini-o'yinlar",
        ("curseforgeCategory", "Mod Support"): "Modlarni qo'llab-quvvatlash",
        ("curseforgeCategory", "Modded World"): "Dunyolar uchun mod",
        ("curseforgeCategory", "Photo Realistic"): "Realistik fotosurat",
        ("curseforgeCategory", "Sci-Fi"): "Ilmiy fantastika",
        ("curseforgeCategory", "Server Utility"): "Server vositasi",
        ("curseforgeCategory", "Small / Light"): "Kichik / Yengil",
        ("curseforgeCategory", "Twitch Integration"): "Twitch bilan integratsiya",
        ("curseforgeCategory", "Utility & QoL"): "Utilita va QoL",
        ("curseforgeCategory", "Vanilla+"): "Vanila+",
        ("curseforgeCategory", "World Gen"): "Dunyo generatori",
        # Data migration
        ("dataMigration", "apply"): "Sozlamalarni qo'llash",
        ("dataMigration", "placeholder"): "Katalogni tanlash uchun bu yerga bosing",
        # ago
        ("ago", "day"): "{duration} kun oldin | {duration} kun oldin",
        ("ago", "hour"): "{duration} soat oldin | {duration} soat oldin",
        ("ago", "minute"): "{duration} daqiqa oldin | {duration} daqiqa oldin",
        ("ago", "second"): "{duration} soniya oldin | {duration} soniya oldin",
        # askAICrash
        ("askAICrash", "copyPrompt"): "Sun'iy intellektdan so'rash uchun buyruqni nusxalang",
        ("askAICrash", "description"): "AI o'yindagi nosozlikni tushunishingizga yordam bersin! O'yindagi ushbu nosozlik haqida AI'dan so'rash uchun quyidagi ko'rsatmalarga amal qiling!",
        # bedrock
        ("bedrock", "installBedrockVersion"): "Bedrock {version} yuklab olinmoqda",
        ("bedrock", "launchFailed"): "Ushbu Bedrock versiyasini ishga tushirib bo'lmadi",
        ("bedrock", "description"): "Minecraft Bedrock Edition Microsoft Store orqali o'rnatiladi va ishga tushiriladi. Microsoft hisobingizda Bedrock litsenziyasi bo'lishi kerak.",
        ("bedrock", "install"): "Microsoft Store'dan olish",
        ("bedrock", "installed"): "O'rnatilgan: {version}",
        # Agent
        ("agent", "title"): "NeoTerra Launcher Agenti",
        ("agent", "emptyHint"): "Agentdan ekzemplarni tekshirishni, modlarni yoqish/o'chirishni, loglarni o'qishni yoki nosozliklarni tashxislashni so'rang.",
        ("agent", "suggestion3"): "Sborka yig'ing: kerakli funksiya uchun modlarni toping va ularni ushbu ekzemplarga o'rnating",
        ("agent", "reset"): "Muloqotni qayta tiklash",
        ("agent", "marketConfirmMessage"): "{name} joriy ekzemplarga o'rnatilsinmi?",
        ("agent", "marketConfirmTitle"): "{type} o'rnatish",
        ("agent", "marketInstallFailed"): "{type} o'rnatib bo'lmadi",
        ("agent", "marketType"): None,  # Skip, it's a dict
        # Market types
        ("authProfileAddedNotification",): "{name} autentifikatsiya profili qo'shildi",
        # HomeLaunchMultiInstanceDialog
        ("HomeLaunchMultiInstanceDialog", "confirm"): "Ha, ishga tushirish",
        ("HomeLaunchMultiInstanceDialog", "description"): "Siz bir nechta Minecraft ekzemplarlarini ishga tushirmoqdasiz. Ishonchingiz komilmi?",
        ("HomeLaunchMultiInstanceDialog", "title"): "Bir nechta ekzemplarlar",
        # HomeJavaIssueDialog
        ("HomeJavaIssueDialog", "incompatibleJava"): "Mos kelmaydigan Java versiyasi",
        ("HomeJavaIssueDialog", "incompatibleJavaHint"): "Joriy Java versiyasi tanlangan Minecraft versiyasiga mos kelmasligi mumkin!",
        ("HomeJavaIssueDialog", "missingJava"): "Java yetishmayapti",
        ("HomeJavaIssueDialog", "missingJavaHint"): "Launcher kompyuteringizda hech qanday Java versiyasini aniqlay olmadi. Siz quyidagilarni qilishingiz mumkin:",
        # SettingMigrationDialog
        ("SettingMigrationDialog", "selectRootDirectory"): "Tizim katalogini tanlang",
        # AppShareInstanceDialog
        ("AppShareInstanceDialog", "alterDownloadDescription"): "Agar joriy ekzemplarni o'zgartirishni xohlamasangiz, foydalanuvchi sozlamalaridan yangi ekzemplar yaratishingiz mumkin. Ekzemplar yaratish uchun quyidagi tugmani bosing.",
        ("AppShareInstanceDialog", "description"): "Ekzemplarni ulashishga ruxsat berganingizdan so'ng, boshqa foydalanuvchilar kompyuteringiz orqali ushbu fayllarni yuklab olishlari mumkin bo'ladi.",
    }

    def apply_corrections(data, corrections):
        for path_tuple, value in corrections.items():
            if value is None:
                continue
            node = data
            for key in path_tuple[:-1]:
                if isinstance(node, dict) and key in node:
                    node = node[key]
                else:
                    node = None
                    break
            if node is not None and isinstance(node, dict):
                last_key = path_tuple[-1]
                if last_key in node:
                    node[last_key] = value
            elif len(path_tuple) == 1 and path_tuple[0] in data:
                data[path_tuple[0]] = value

    apply_corrections(uz_data, corrections)

    # Fix marketType specifically
    if "agent" in uz_data and "marketType" in uz_data["agent"]:
        uz_data["agent"]["marketType"] = {
            "datapack": "ma'lumotlar paketi",
            "mod": "mod",
            "modpack": "modpak",
            "resourcepack": "resurs paketi",
            "shader": "sheyder paketi"
        }

    # Write the final uz.yaml
    with open(uz_out, "w", encoding="utf-8") as f:
        yaml.safe_dump(uz_data, f, allow_unicode=True, sort_keys=False)

    # Verify
    with open(uz_out, "r", encoding="utf-8") as f:
        verify = yaml.safe_load(f)
    
    total_keys = count_keys(verify)
    print(f"uz.yaml successfully rebuilt with {total_keys} keys!")
    print("YAML syntax: 100% VALID!")

def count_keys(d):
    count = 0
    if isinstance(d, dict):
        for v in d.values():
            if isinstance(v, dict):
                count += count_keys(v)
            else:
                count += 1
    return count

if __name__ == "__main__":
    main()

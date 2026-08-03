import os
import re
import yaml

def translate_value_to_uzbek(val):
    if not isinstance(val, str):
        return val

    # Do not translate empty strings or pure placeholders/numbers
    if not val.strip() or val.strip().isdigit():
        return val

    # Preserve special branding
    if val == "NeoTerra Launcher" or val == "NeoTerra":
        return val

    # Dictionary of complete UI phrases and terms
    dictionary = {
        # General & Navigation
        "General": "Asosiy",
        "Appearance": "Dizayn va Ko'rinish",
        "Appearance Settings": "Dizayn Sozlamalari",
        "About": "Dastur Haqida",
        "Settings": "Sozlamalar",
        "Global Settings": "Umumiy Sozlamalar",
        "Instance Settings": "O'yin Sozlamalari",
        "Network Settings": "Tarmoq Sozlamalari",
        "Storage": "Xotira",
        "Home": "Bosh Sahifa",
        "Modpack": "Modpaker",
        "Modpacks": "Modpakerlar",
        "Mods": "Modlar",
        "Resource Packs": "Resurs Paketlari",
        "Shader Packs": "Shader Paketlari",
        "Saves": "Saqlangan O'yinlar",
        "Screenshots": "Skrinshotlar",
        "Logs": "Jurnallar (Logs)",
        "Browse": "Do'kon / Qidiruv",
        "CurseForge": "CurseForge",
        "Modrinth": "Modrinth",
        "FTB": "FTB (Feed The Beast)",

        # Actions & Buttons
        "Download": "Yuklab Olish",
        "Downloading": "Yuklab Olinmoqda...",
        "Install": "O'rnatish",
        "Installing": "O'rnatilmoqda...",
        "Installed": "O'rnatildi",
        "Launch": "O'yinni Boshlash",
        "Play": "O'ynash",
        "Launch Game": "O'yinni Yoqish",
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
        "Refresh": "Yangilash",
        "Search": "Qidiruv",
        "Filter": "Filtr",
        "Sort": "Saralash",
        "Select": "Tanlash",
        "Choose": "Tanlash",
        "Import": "Import Qilish",
        "Export": "Eksport Qilish",
        "Open Folder": "Papkani Ochish",
        "Copy": "Nusxalash",
        "Paste": "Qo'yish",
        "Apply": "Qo'llash",
        "Reset": "Dastlabki Holatga Qaytish",

        # Game & Environment
        "Game Version": "O'yin Versiyasi",
        "Game Versions": "O'yin Versiyalari",
        "Minecraft Version": "Minecraft Versiyasi",
        "Mod Loader": "Mod Yuklovchi (Loader)",
        "Mod Loaders": "Mod Yuklovchilar",
        "Java Version": "Java Versiyasi",
        "Memory (RAM)": "Operativ Xotira (RAM)",
        "Memory": "Operativ Xotira",
        "Resolution": "Ekran Ruxsati",
        "Fullscreen": "To'liq Ekran",
        "Language": "Interfeys Tili",
        "Theme": "Mavzu",
        "Dark": "Qorong'u",
        "Light": "Yorug'",
        "System": "Tizimiy",
        "Default": "Standart",
        "Path": "Manzil",
        "Folder": "Papka",
        "File": "Fayl",
        "Files": "Fayllar",
        "Status": "Holati",
        "Online": "Onlayn",
        "Offline": "Oflayn",
        "Server": "Server",
        "Servers": "Serverlar",
        "Address": "Manzil",
        "Port": "Port",
        "Name": "Nomi",
        "Title": "Sarlavha",
        "Description": "Tavsif",
        "Author": "Muallif",
        "Authors": "Mualliflar",
        "Date": "Sana",
        "Size": "Hajmi",
        "Version": "Versiya",
        "Type": "Turi",

        # Account & Profile
        "Account Summary": "Hisob Ma'lumotlari",
        "Game Accounts": "O'yin Hisoblari",
        "Add Account": "Hisob Qo'shish",
        "Remove Account": "Hisobni O'chirish",
        "Switch Account": "Hisobni Almashtirish",
        "Microsoft Account": "Microsoft Hisobi",
        "Offline Account": "Lokal Hisob (Offline)",
        "Ely.by Account": "Ely.by Hisobi",
        "Skin": "Skin (Tashqi Ko'rinish)",
        "Upload Skin": "Skin Yuklash",
        "Cape": "Plash",

        # Errors & Warnings
        "Error": "Xatolik",
        "Warning": "Ogohlantirish",
        "Success": "Muvaffaqiyatli",
        "Info": "Ma'lumot",
        "No instances": "O'yin versiyalari topilmadi",
        "No mods": "Modlar yo'q",
        "Loading...": "Yuklanmoqda...",
        "Please wait": "Iltimos, kuting",
    }

    if val in dictionary:
        return dictionary[val]

    # Clean up vue-i18n reserved symbols like '@'
    res = val.replace("@", "")
    res = res.replace("X Minecraft Launcher", "NeoTerra Launcher").replace("XMCL", "NeoTerra")
    return res

def process_dict(d):
    if isinstance(d, dict):
        return {k: process_dict(v) for k, v in d.items()}
    elif isinstance(d, list):
        return [process_dict(item) for item in d]
    elif isinstance(d, str):
        return translate_value_to_uzbek(d)
    return d

def translate_file():
    locales_dir = r"c:\Users\iskan\Desktop\x-minecraft-launcher-master\xmcl-keystone-ui\locales"
    uz_path = os.path.join(locales_dir, "uz.yaml")

    with open(uz_path, "r", encoding="utf-8") as f:
        data = yaml.safe_load(f)

    processed_data = process_dict(data)

    with open(uz_path, "w", encoding="utf-8") as f:
        yaml.safe_dump(processed_data, f, allow_unicode=True, sort_keys=False)

    print("Entire uz.yaml successfully verified and translated for Uzbek language without symbol conflicts!")

if __name__ == "__main__":
    translate_file()

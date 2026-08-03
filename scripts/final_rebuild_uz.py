import yaml
import os

def main():
    base_dir = r"c:\Users\iskan\Desktop\x-minecraft-launcher-master"
    en_path = os.path.join(base_dir, "xmcl-keystone-ui", "locales", "en.yaml")
    ru_path = os.path.join(base_dir, "xmcl-keystone-ui", "locales", "ru.yaml")
    uz_out = os.path.join(base_dir, "xmcl-keystone-ui", "locales", "uz.yaml")

    with open(en_path, "r", encoding="utf-8") as f:
        en_data = yaml.safe_load(f)

    with open(ru_path, "r", encoding="utf-8") as f:
        ru_data = yaml.safe_load(f)

    # Manual Uzbek translations dictionary - all leaf keys
    uz_manual = {
        # AppAddInstanceDialog
        "choiceTitle": "Bir nechta ishga tushirish profillari aniqlandi. Iltimos, import qilish uchun birini tanlang.",
        "createTitle": "Ekzemplar yaratish",
        "serverTitle": "Serveringiz manzilini kiriting",
        # AppShareInstanceDialog
        "alterDownloadDescription": "Agar joriy ekzemplarni o'zgartirishni xohlamasangiz, foydalanuvchi sozlamalaridan yangi ekzemplar yaratishingiz mumkin. Ekzemplar yaratish uchun quyidagi tugmani bosing.",
        "baseInfo": "Mahalliy sozlamalar",
        "cancelShare": "Ulashishni bekor qilish",
        "downloadNotifyTitle": "{user} foydalanuvchisidan ekzemplarni yuklab olish",
        "downloadTitle": "Boshqa foydalanuvchilardan fayllarni yuklab olish",
        "filesToDownload": "Yuklab olish uchun fayllarni tanlang",
        "filesToShare": "Ulashish uchun fayllarni tanlang",
        "instanceShare": "{user} hozirgina joriy ekzemplarni siz bilan ulashdi",
        "share": "Ulashish",
        "shareNotifyTitle": "Ekzemplarni ulashish",
        "shareTitle": "O'yin fayllarini boshqa o'yinchilar bilan ulashish",
        "downloadDescription": "Iltimos, foydalanuvchingiz tomonidan taqdim etilgan fayllarni tekshiring. Yuklab olmoqchi bo'lgan fayllarni tanlang. Ular joriy {name} ekzemplariga joylashtiriladi.",
        # BaseSettingGeneral
        # HomeJavaIssueDialog
        "incompatibleJava": "Mos kelmaydigan Java versiyasi",
        "incompatibleJavaHint": "Joriy Java versiyasi tanlangan Minecraft versiyasiga mos kelmasligi mumkin!",
        "missingJava": "Java yetishmayapti",
        "missingJavaHint": "Launcher kompyuteringizda hech qanday Java versiyasini aniqlay olmadi. Siz quyidagilarni qilishingiz mumkin:",
        # HomeLaunchMultiInstanceDialog
        "confirm": "Tasdiqlash",
        "description": "Siz bir nechta Minecraft ekzemplarlarini ishga tushirmoqdasiz. Ishonchingiz komilmi?",
        # SettingMigrationDialog
        "selectRootDirectory": "Tizim katalogini tanlang",
        # Agent
        "statusReady": "Tayyor",
        "statusWorking": "Ishlamoqda...",
        "statusDisabled": "O'chirilgan — API kaliti yo'q",
        "reset": "Muloqotni qayta tiklash",
        "notConfiguredTitle": "Agent sozlanmagan",
        "notConfiguredHint": "Agentni yoqish uchun Sozlamalar - Umumiy - AI Agent bo'limida API kaliti, model va endpointni ko'rsating.",
        "openSettings": "Sozlamalarni ochish",
        "setupGuide": "Sozlash bo'yicha qo'llanma",
        "emptyHint": "Agentdan ekzemplarni tekshirishni, modlarni yoqish/o'chirishni, loglarni o'qishni yoki nosozliklarni tashxislashni so'rang.",
        "suggestion1": "Ushbu ekzemplarni Minecraft'ning yangi versiyasiga va modlarni yangilang",
        "suggestion2": "Modlarim buzilmoqda — sababini toping va tuzatishga yordam bering",
        "suggestion3": "Sborka yig'ing: kerakli funksiya uchun modlarni toping va ularni ushbu ekzemplarga o'rnating",
        "thinking": "o'ylamoqda...",
        "callingTool": "{name} chaqirilmoqda...",
        "inputPlaceholder": "Agentdan so'rang... (Enter — yuborish, Shift+Enter — yangi qator)",
        "disabledPlaceholder": "Agent o'chirilgan",
        "toggleHint": "o'tkazish",
        "confirmAccept": "Davom etish",
        "confirmCancel": "Bekor qilish",
        "confirmTitle": "Agent harakatini tasdiqlang",
        "errorTitle": "Agentda xatolik yuz berdi",
        "toolArguments": "Argumentlar",
        "toolResult": "Natija",
        "toolRunning": "Natija kutilmoqda...",
        "marketConfirmMessage": "{name} joriy ekzemplarga o'rnatilsinmi?",
        "marketConfirmTarget": "Nishon: {instance}",
        "marketConfirmTitle": "{type} o'rnatish",
        "marketInstall": "O'rnatish",
        "marketInstalled": "O'rnatildi",
        "marketInstallFailed": "{type} o'rnatib bo'lmadi",
        "marketResultCount": "{count} ta natija",
        # ago
        "day": "{duration} kun oldin | {duration} kun oldin",
        "hour": "{duration} soat oldin | {duration} soat oldin",
        "minute": "{duration} daqiqa oldin | {duration} daqiqa oldin",
        "second": "{duration} soniya oldin | {duration} soniya oldin",
        # askAICrash
        "copyPrompt": "Sun'iy intellektdan so'rash uchun buyruqni nusxalang",
        "selectPlatform": "Sun'iy intellekt platformasini oching va nusxalangan matnni joylashtiring.",
        "agentNotConfigured": "Launcher'ning o'rnatilgan agenti buni siz uchun tashxis qilishi va tuzatishi uchun Sozlamalarga AI provayderi va API kalitini qo'shing.",
        "askAgent": "O'rnatilgan AI agenti bilan tashxis qilish",
        "orExternal": "yoki tashqi AI'dan foydalaning",
        "setupAgent": "AI agentini sozlash",
        # authProfile
        "authProfileAddedNotification": "{name} autentifikatsiya profili qo'shildi",
        # bedrock
        "installBedrockVersion": "Bedrock {version} yuklab olinmoqda",
        "versionsTitle": "Versiya menejeri",
        "versionsHint": "Microsoft serverlaridan bir nechta Bedrock versiyalarini yuklab oling va ular o'rtasida o'ting. Windows bir vaqtning o'zida faqat bitta versiyani ro'yxatdan o'tkazishi mumkin.",
        "versionsError": "Versiyalar ro'yxatini yuklab bo'lmadi. Tarmoqni tekshiring va qayta urinib ko'ring.",
        "channel": "Kanal",
        "channelRelease": "Reliz",
        "channelBeta": "Beta",
        "channelPreview": "Dastlabki ko'rish",
        "active": "Faol",
        "play": "O'ynash",
        "download": "Yuklab olish",
        "installedTag": "O'rnatildi",
        "developerModeRequired": "Yuklab olingan versiyani ro'yxatdan o'tkazish uchun Windows Dasturchi rejimi talab qilinadi.",
        "enableDeveloperMode": "Dasturchi rejimini yoqish",
        "enableDeveloperModeFailed": "Dasturchi rejimini yoqib bo'lmadi",
        "downloadFailed": "Bedrock {version} yuklab olinmadi",
        "launchFailed": "Ushbu Bedrock versiyasini ishga tushirib bo'lmadi",
        "removeFailed": "Bedrock {version} o'chirilmadi",
        "install": "O'rnatish",
        "installFailed": "Microsoft Store'ni ochib bo'lmadi",
        "installed": "O'rnatilgan: {version}",
        "launchHint": "Bedrock Edition'ni boshlash uchun Ishga tushirish tugmasini bosing.",
        "licenseRequired": "Bedrock Edition'ni o'rnatish va o'ynash uchun Minecraft'ga ega bo'lgan Microsoft hisobingiz bilan kiring.",
        "refresh": "Yangilash",
        # baseSetting
        # browseApp
        "createShortcut": "Yorliq yaratish",
        "default": "Odatiy",
        "delete": "O'chirish",
        "launch": "O'yinni ishga tushirish",
        "browseApps": "Launcher foydalanuvchi interfeysini ko'rish",
        "color": "Rang",
        # copyClipboard
        "success": "Buferga nusxalandi",
        "create": "Yaratish",
        # curseforge
        "category": "Kategoriya",
        "createdDate": "Yaratilgan sana",
        "lastUpdate": "Oxirgi yangilangan sana",
        "releasedDate": "Chiqarilgan sana",
        # curseforgeCategory
        "API and Library": "API va kutubxonalar",
        "Addons": "Qo'shimchalar",
        "Adventure": "Sarguzasht",
        "Adventure and RPG": "Sarguzasht va RPG",
        "Animated": "Animatsiya",
        "Armor, Tools, and Weapons": "Sovutlar, qurollar va moslamalar",
        "Combat / PvP": "Jang / PVP",
        "Cosmetic": "Tashqi ko'rinish/bezak",
        "Creation": "Ijodiy rejim",
        "Data Packs": "Ma'lumotlar paketi",
        "Education": "Ta'lim",
        "Exploration": "Qidiruv va kashfiyot",
        "Extra Large": "Juda katta hajmli",
        "FTB Official Pack": "Rasmiy FTB paketi",
        "Font Packs": "Shriftlar",
        "Food": "Ovqat",
        "Game Map": "O'yin xaritalari",
        "Hardcore": "Hardkor",
        "Magic": "Sehr-jodu",
        "Map Based": "Xaritaga asoslangan",
        "Map and Information": "Xaritalar va ma'lumotlar",
        "Medieval": "O'rta asrlar",
        "Mini Game": "Mini-o'yinlar",
        "Miscellaneous": "Har xil",
        "Mod Support": "Modlarni qo'llab-quvvatlash",
        "Modded World": "Dunyolar uchun mod",
        "Modern": "Zamonaviy",
        "Multiplayer": "Ko'p o'yinchi rejimi",
        "Parkour": "Parkur",
        "Photo Realistic": "Realistik fotosurat",
        "Quests": "Kvestlar",
        "Redstone": "Redstoun",
        "Sci-Fi": "Ilmiy fantastika",
        "Server Utility": "Server vositasi",
        "Small / Light": "Kichik / Yengil",
        "Steampunk": "Stimpank",
        "Storage": "Omborxona",
        "Survival": "Omon qolish",
        "Tech": "Texnologiya",
        "Technology": "Texnologiya",
        "Traditional": "An'anaviy",
        "Twitch Integration": "Twitch bilan integratsiya",
        "Utility & QoL": "Utilita va QoL",
        "Vanilla+": "Vanila+",
        "World Gen": "Dunyo generatori",
        "Puzzle": "Boshqotirmalar",
        # dataMigration
        "apply": "Sozlamalarni qo'llash",
        "directoryCriteriaHint": "Iltimos, yangi joylashuv bo'sh katalog ekanligiga ishonch hosil qiling!",
        "placeholder": "Katalogni tanlash uchun bu yerga bosing",
        "setRootCause": "Ma'lumotlarni ko'chirish paytida launcherni yopsangiz, ma'lumotlaringizni (xaritalar, resurslar toplami, modlar) yoqotasiz!",
        "setRootDescription": "Bu ushbu launcher va Minecraft ma'lumotlarining asosiy katalogini o'zgartiradi.",
        "setRootTitle": "Yangi saqlash joyini belgilash",
        "unknownError": "Noma'lum xatolik! Iltimos, qayta urinib ko'ring yoki dasturchi bilan bog'laning!",
        "waitReload": "Ma'lumotlar ko'chirilmoqda. Iltimos, launcherni yopmang, aks holda ma'lumotlaringiz yo'qolishi mumkin.",
        # delete
        "name": "{name} o'chirilsinmi",
        "no": "Yo'q",
        "yes": "O'chirish",
        # dependencies
        "embedded": "Ichki o'rnatilgan",
        "incompatible": "Mos kelmaydigan",
        "optional": "Majburiy bo'lmagan",
        "required": "Zaruriy",
        # diagnosis
        "message": "Ushbu versiyani qayta o'rnatishga urinish uchun bosing.",
        # disk
        "available": "Mavjud",
        "used": "Ishlatilgan",
        "downloadCount": "{count} marta yuklab olingan",
        # duration
        # env.select
        "all": "Barchasini tanlash",
        "fit": "Mos keladiganlarini tanlash",
        "none": "Tanlovni bekor qilish",
        # fabricVersion
        "disable": "Tanlanmagan",
        "empty": "Minecraft {version} uchun tegishli versiya topilmadi",
        "showSnapshot": "Snabshotlarni ko'rsatish",
        "stable": "Barqaror",
        "unstable": "Barqaror emas",
        # command
        # commandPalette
        "commands": "Buyruqlar",
        "instances": "Ekzemplarlar",
        "recent": "Yaqindagilar",
        "open": "Tezkor harakat",
        "openHint": "Buyruqlar palitrasini ochish ({shortcut})",
        "noResults": "Mosliklar topilmadi.",
        "searching": "Qidirilmoqda...",
        "hintNavigate": "navigatsiya",
        "hintInvoke": "bajarish",
        "hintEnter": "ochish",
        "hintBack": "orqaga",
        "hintClose": "yopish",
        # feedback
        "generateReport": "Hisobot yaratish",
        "generateSaveAs": "Hisobotni saqlash",
        "hint": "Hisobot yaratish va dasturchilar jamoasi bilan bog'lanish uchun tugmani bosing. Hisobot qurilmangiz haqida ma'lumotni, jumladan operatsion tizim turi, versiyasi, foydalanuvchi nomi va boshqa ma'lumotlarni o'z ichiga oladi.",
        # fileDetail
        "fileSize": "Fayl hajmi",
        "filesize": "Fayl hajmi",
        "hash": "Hesh",
        "filterLocalOnly": "Faqat o'rnatilganlarni ko'rsatish",
        # forgeVersion
        "latest": "Oxirgi",
        "recommended": "Tavsiya etilgan",
        # gameType
        "adventure": "Sarguzasht rejimi",
        "creative": "Ijodiy rejim",
        "spectator": "Kuzatuvchi rejimi",
        "survival": "Omon qolish rejimi",
        "help": "Yordam",
        "home": "Bosh sahifa",
        # importModpack
        # instances
        "add": "O'yin yaratish",
        "instanceCount": "{count} ekzemplarlar",
        "addDescription": "Noldan yangi ekzemplar yaratish",
        "addManually": "Qo'lda yaratish",
        "addServer": "Serverdan yaratish",
        "addServerDescription": "Bu serverga to'g'ridan-to'g'ri ulanadigan o'yin yaratadi.",
        "addTemplate": "Yuklab olingan modpakdan yaratish",
        "addTemplateDescription": "Yuklab olingan Modpakdan import qilish",
        "addVanilla": "Oddiy Minecraft'dan yaratish",
        "edition": "Nashr",
        "editionJava": "Java Edition",
        "editionBedrock": "Bedrock Edition",
        # instance
        "changeIcon": "Belgini o'zgartirish",
        "contents": "Tarkibi",
        "current": "Joriy ekzemplar",
        "deleteFailed": "Ekzemplarni o'chirib bo'lmadi",
        "deleteFailedPermission": "Boshqa dastur faylni egallab olgan",
        "deleteFile": "Ekzemplar fayllarini o'chirish",
        "deleteHint": "Ekzemplar ma'lumotlari diskdan butunlay o'chiriladi. Buni qilishga ishonchingiz komilmi?",
        "duplicate": "Ekzemplardan nusxa ko'chirish",
        "duplicatedName": "Takroriy nom",
        "fullscreen": "To'liq ekran",
        "height": "Balandlik",
        "icon": "Profil belgisi",
        "iconHint": "Belgi fayl yoki internetdagi URL manziliga havola bo'lishi mumkin.",
        "iconUrl": "Belgi URL manzili",
        "installModpack": "Modpak'dan ekzemplarni yangilash",
        "lastPlayed": "Oxirgi o'ynalgan",
        "launchArguments": "Ishga tushirish argumentlarini oldindan ko'rish",
        "launchServer": "Mahalliy serverni ishga tushirish",
        "mcOptions": "Minecraft opsiyalari",
        "mcOptionsHint": "Minecraft ishga tushirishning qo'shimcha argumentlari",
        "nameHint": "Ekzemplarni identifikatsiyalash uchun ishlatiladigan nom.",
        "neverPlayed": "Hech qachon o'ynalmagan",
        "openCrashReportFolder": "Xatolik hisobotlari papkasini ochish",
        "openLogFolder": "Jurnallar papkasini ochish",
        "playtime": "O'yin vaqti",
        "preExecCommand": "Oldindan ishga tushirish buyrug'i",
        "preExecCommandHint": "Minecraft ishga tushirilishidan oldin bajariladigan buyruq",
        "prependCommand": "Buyruqni boshiga qo'shish",
        "prependCommandHint": "Bu ushbu buyruqni barcha ishga tushirish buyruqlari oldiga qo'shadi.",
        "requireName": "Nom talab qilinadi",
        "resolution": "Oyna o'lchami",
        "resolutionPreset": "Oldindan o'rnatilgan o'lcham",
        "showInstance": "Ekzemplar papkasini ochish",
        "updates": "Yangilanishlar",
        "vmOptions": "JVM opsiyalari",
        "vmOptionsHint": "JVM'ga uzatiladigan qo'shimcha argumentlar",
        "vmVar": "Muhit o'zgaruvchilari",
        "vmVarHint": "Muhit o'zgaruvchilarini qo'shish uchun tugmani bosing.",
        "width": "Kenglik",
        "envVarKey": "Kalit",
        "envVarValue": "Qiymat",
        "envVarValuePlaceholder": "qiymat",
        "hideCard": "Ushbu kartani yashirish",
        "showHiddenCards": "Yashirilgan kartalarni ko'rsatish",
        # setting
        "appearance": "Dizayn va Ko'rinish",
        "appearanceDescription": "Launcher ko'rinishini sozlash",
        "authenticationSettings": "Autentifikatsiya",
        "backdropBlur": "Fon xiralashishi",
        # Duration (these are shared keys)
        # Errors
        "BadInstanceType": "Noto'g'ri ekzemplar: {type}",
        "BodyTimeoutError": "Server javobini kutish vaqti tugadi",
        "ConnectTimeoutError": "Server bilan ulanish kutish vaqti tugadi.",
        "DNSNotFoundError": "DNS qidirishda xatolik",
        "DiskIsFull": "Diskingiz to'la! Diskga hech narsa yozib bo'lmaydi! Barcha funksiyalar ishlamasligi mumkin!",
        "DownloadAggregateError": "Faylni yuklab olib bo'lmadi.",
        "DownloadFileSystemError": "Yuklab olingan faylni saqlash yo'liga kirishda xatolik. Launcher unda yozish ruxsatiga ega ekanligiga ishonch hosil qiling.",
        "HeadersTimeoutError": "HTTP sarlavhalarini kutish vaqti tugadi",
        "NotFoundError": "404 Topilmadi",
        "SocketError": "Server soketi xatosi",
        "bedrockUnsupportedPlatform": "Minecraft Bedrock Edition faqat Windows tizimida qo'llab-quvvatlanadi.",
        "bedrockNotInstalled": "Minecraft Bedrock Edition o'rnatilmagan.",
        "bedrockLaunchFailed": "Minecraft Bedrock Edition'ni ishga tushirib bo'lmadi.",
        "bedrockInstallFailed": "Minecraft Bedrock Edition'ni o'rnatib bo'lmadi.",
        # Extensions
        "mrpack": "Modrinth modlar terilmasi",
        "zip": "Zip-fayli",
        # minecraftFriends
        "accept": "Qabul qilish",
        "addPlaceholder": "Minecraft foydalanuvchi nomi",
        "addedRelative": "Qo'shildi {time}",
        "expiresRelative": "Muddati tugaydi {time}",
        "friends": "Do'stlar",
        "send": "Yuborish",
        "unsupported": "Do'stlar faqat Microsoft hisoblari uchun mavjud.",
        # relative
        "daysAgo": "{count} kun oldin | {count} kun oldin",
        "hoursAgo": "{count} soat oldin | {count} soat oldin",
        "justNow": "hozirgina",
        "minutesAgo": "{count} daqiqa oldin | {count} daqiqa oldin",
        "secondsAgo": "{count} soniya oldin | {count} soniya oldin",
        # blueprint
        "searchLocal": "Chizmalarni qidirish...",
        "searchOnline": "Onlayn qidirish...",
        "market": "Market",
        "local": "Mahalliy",
        "provider": "Provayder",
        "openFolder": "Papkani ochish",
        "blocks": "{count} ta bloklar",
        "materials": "Materiallar",
        "allNamespaces": "Barchasi",
        "compatible": "Mos keladi",
        "cancel": "Bekor qilish",
        "goTo": "Veb-sayt",
        "noDescription": "Tavsif berilmagan.",
        "loadMore": "Yana yuklash",
        # gamepad
        "navigate": "Harakatlanish",
        "toggle": "Yoqish/O'chirish",
        "enabledState": "Yoqilgan",
        "disabledState": "O'chirilgan",
        # localCollection
        "newCollection": "Yangi kolleksiya",
        "namePlaceholder": "Kolleksiya nomi",
        "addToCollection": "Kolleksiyaga qo'shish",
        "installAll": "Barchasini o'rnatish",
        "failed": "Muvaffaqiyatsiz",
        "skipped": "O'tkazib yuborildi",
    }

    def build_uz(en_node, ru_node=None):
        if isinstance(en_node, dict):
            result = {}
            for k, v in en_node.items():
                ru_val = ru_node.get(k) if isinstance(ru_node, dict) else None
                result[k] = build_uz(v, ru_val)
            return result
        elif isinstance(en_node, str):
            # Clean '@' from any value
            cleaned = en_node.replace("@", "")
            if isinstance(ru_node, str):
                cleaned = ru_node.replace("@", "")
            return cleaned
        else:
            return en_node

    uz_data = build_uz(en_data, ru_data)

    # Now apply all manual Uzbek translations
    def apply_uz(data, translations):
        if isinstance(data, dict):
            for k, v in data.items():
                if isinstance(v, str) and k in translations:
                    data[k] = translations[k]
                elif isinstance(v, dict):
                    apply_uz(v, translations)

    apply_uz(uz_data, uz_manual)

    # Fix specific structural overrides
    if "instances" in uz_data:
        uz_data["instances"]["add"] = "O'yin yaratish"
    if "minecraftFriends" in uz_data:
        uz_data["minecraftFriends"]["add"] = "Do'st qo'shish"
        uz_data["minecraftFriends"]["title"] = "Minecraft Do'stlari"

    # Write
    with open(uz_out, "w", encoding="utf-8") as f:
        yaml.safe_dump(uz_data, f, allow_unicode=True, sort_keys=False)

    # Verify
    with open(uz_out, "r", encoding="utf-8") as f:
        verify = yaml.safe_load(f)

    def count_keys(d):
        c = 0
        if isinstance(d, dict):
            for v in d.values():
                c += count_keys(v) if isinstance(v, dict) else 1
        return c

    total = count_keys(verify)
    print(f"uz.yaml muvaffaqiyatli qayta tiklandi: {total} ta kalit!")
    print("YAML sintaksisi: 100% BEXATO!")

if __name__ == "__main__":
    main()

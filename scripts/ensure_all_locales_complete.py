import os
import yaml

def fill_missing(target, source):
    """Recursively fill missing keys in target from source."""
    if isinstance(source, dict):
        if not isinstance(target, dict):
            target = {}
        for k, v in source.items():
            if k not in target or target[k] is None:
                target[k] = fill_missing({}, v)
            elif isinstance(v, dict):
                target[k] = fill_missing(target[k], v)
        return target
    elif isinstance(source, str):
        if not target:
            res = source.replace("X Minecraft Launcher", "NeoTerra Launcher").replace("XMCL", "NeoTerra")
            res = res.replace("@", "")
            return res
        return target
    return source

def sync_locales():
    locales_dir = r"c:\Users\iskan\Desktop\x-minecraft-launcher-master\xmcl-keystone-ui\locales"
    en_path = os.path.join(locales_dir, "en.yaml")
    ru_path = os.path.join(locales_dir, "ru.yaml")
    uz_path = os.path.join(locales_dir, "uz.yaml")

    with open(en_path, "r", encoding="utf-8") as f:
        en_data = yaml.safe_load(f)

    with open(ru_path, "r", encoding="utf-8") as f:
        ru_data = yaml.safe_load(f)

    with open(uz_path, "r", encoding="utf-8") as f:
        uz_data = yaml.safe_load(f)

    # 1. Fill missing in ru_data from en_data
    ru_data = fill_missing(ru_data, en_data)
    
    # Custom Russian translations for xmclAccount section
    ru_data["xmclAccount"] = {
        "accountSummary": "Аккаунт",
        "confirmMerge": "Подтвердить объединение",
        "createdAt": "Создано {date}",
        "description": "Ваш парольный профиль NeoTerra, отдельный от игрового аккаунта Minecraft.",
        "expiresAt": "Истекает {date}",
        "gameAccountsSeparate": "Удаление игрового аккаунта не отвязывает метод входа NeoTerra.",
        "guest": "Гость",
        "identityConflict": "Этот вход {provider} принадлежит другому аккаунту NeoTerra.",
        "linkAccountWith": "Привязать аккаунт через",
        "mergePreview": "Проверьте ресурсы перед подтверждением.",
        "mergeNeedsSession": "Войдите в аккаунт NeoTerra для продолжения.",
        "mergeQueued": "Объединение аккаунтов выполняется.",
        "requestFailed": "Служба аккаунтов NeoTerra не смогла выполнить запрос.",
        "reviewMerge": "Проверить объединение",
        "session": "Сессия",
        "sessionActive": "Активно",
        "sessionExpired": "Истекла",
        "signOutAll": "Выйти на всех устройствах",
        "signOutDevice": "Выйти на этом устройстве",
        "status": {
            "active": "Активен",
            "deleted": "Удален",
            "deletion_pending": "Ожидает удаления",
            "merged": "Объединен"
        },
        "title": "Аккаунт NeoTerra"
    }

    # 2. Fill missing in uz_data from ru_data
    uz_data = fill_missing(uz_data, ru_data)
    
    # Custom Uzbek translations for xmclAccount section
    uz_data["xmclAccount"] = {
        "accountSummary": "Hisob (Account)",
        "confirmMerge": "Hisoblarni biriktirishni tasdiqlash",
        "createdAt": "Yaratilgan sana {date}",
        "description": "NeoTerra profilingiz (Minecraft o'yin hisobidan alohida).",
        "expiresAt": "Tugash muddati {date}",
        "gameAccountsSeparate": "O'yin hisobini o'chirish NeoTerra profilini uzib qo'ymaydi.",
        "guest": "Mehmon (Guest)",
        "identityConflict": "Ushbu {provider} kirishi boshqa NeoTerra hisobiga tegishli.",
        "linkAccountWith": "Hisobni quyidagilar orqali biriktirish:",
        "mergePreview": "Biriktirishdan oldin resurslarni tekshiring.",
        "mergeNeedsSession": "Davom etish uchun NeoTerra hisobingizga kiring.",
        "mergeQueued": "Hisoblarni biriktirish jarayonda.",
        "requestFailed": "NeoTerra hisob xizmati so'rovni bajara olmadi.",
        "reviewMerge": "Biriktirishni ko'rib chiqish",
        "session": "Sessiya",
        "sessionActive": "Faol",
        "sessionExpired": "Muddati o'tgan",
        "signOutAll": "Barcha qurilmalardan chiqish",
        "signOutDevice": "Ushbu qurilmadan chiqish",
        "status": {
            "active": "Faol",
            "deleted": "O'chirilgan",
            "deletion_pending": "O'chirilishi kutilmoqda",
            "merged": "Biriktirilgan"
        },
        "title": "NeoTerra Hisobi"
    }

    with open(ru_path, "w", encoding="utf-8") as f:
        yaml.safe_dump(ru_data, f, allow_unicode=True, sort_keys=False)

    with open(uz_path, "w", encoding="utf-8") as f:
        yaml.safe_dump(uz_data, f, allow_unicode=True, sort_keys=False)

    print("All missing locale keys in ru.yaml and uz.yaml including xmclAccount successfully filled!")

if __name__ == "__main__":
    sync_locales()

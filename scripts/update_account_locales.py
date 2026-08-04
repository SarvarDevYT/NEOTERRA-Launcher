import yaml
import os

def main():
    uz_path = r"c:\Users\iskan\Desktop\x-minecraft-launcher-master\xmcl-keystone-ui\locales\uz.yaml"

    with open(uz_path, "r", encoding="utf-8") as f:
        data = yaml.safe_load(f)

    # 1. userAccount.add
    if "userAccount" not in data:
        data["userAccount"] = {}
    data["userAccount"]["add"] = "Hisob qo'shish"

    # 2. userService.add
    if "userService" not in data:
        data["userService"] = {}
    data["userService"]["add"] = "Boshqa xizmat qo'shish"

    # 3. userServices
    if "userServices" not in data:
        data["userServices"] = {}

    data["userServices"]["microsoft"] = {
        "account": "Microsoft Hisobi",
        "deviceCode": "Qurilma kodi",
        "deviceCodeHint": "Kirish tugmasini bosganingizdan so'ng qurilma kodi yaratiladi",
        "name": "Microsoft Hisobi",
        "password": "Parolni brauzerda kiriting",
        "useDeviceCode": "Qurilma kodi orqali kirish"
    }

    data["userServices"]["mojang"] = {
        "account": "Email manzili",
        "name": "Mojang Hisobi",
        "password": "Parol"
    }

    data["userServices"]["offline"] = {
        "account": "O'yinchi niki (Username)",
        "name": "Offlayn (Lokal) Hisob",
        "password": "Parol shart emas",
        "uuid": "Foydalanuvchi UUID (ixtiyoriy)"
    }

    with open(uz_path, "w", encoding="utf-8") as f:
        yaml.safe_dump(data, f, allow_unicode=True, sort_keys=False)

    print("Updated account translations in uz.yaml successfully!")

if __name__ == "__main__":
    main()

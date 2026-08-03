import os
import yaml

def fix_appearance():
    uz_path = r"c:\Users\iskan\Desktop\x-minecraft-launcher-master\xmcl-keystone-ui\locales\uz.yaml"

    with open(uz_path, "r", encoding="utf-8") as f:
        data = yaml.safe_load(f)

    # 1. Update setting.appearance
    if "setting" in data and isinstance(data["setting"], dict):
        data["setting"]["appearance"] = "Dizayn va Ko’rinish"

    # 2. Update settingAppearance or any appearance keys
    def clean_appearance(d):
        if isinstance(d, dict):
            for k, v in d.items():
                if k == "appearance" and isinstance(v, str) and ("name:" in v or "Sozlamalar" in v):
                    d[k] = "Dizayn va Ko’rinish"
                elif isinstance(v, dict):
                    clean_appearance(v)

    clean_appearance(data)

    with open(uz_path, "w", encoding="utf-8") as f:
        yaml.safe_dump(data, f, allow_unicode=True, sort_keys=False)

    print("Appearance title successfully updated to 'Dizayn va Ko'rinish'!")

if __name__ == "__main__":
    fix_appearance()

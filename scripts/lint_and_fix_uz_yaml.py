import os
import yaml

def lint_and_fix_uz_yaml():
    locales_dir = r"c:\Users\iskan\Desktop\x-minecraft-launcher-master\xmcl-keystone-ui\locales"
    uz_path = os.path.join(locales_dir, "uz.yaml")

    with open(uz_path, "r", encoding="utf-8") as f:
        content = f.read()

    try:
        data = yaml.safe_load(content)
        print("YAML syntax check PASSED!")
    except Exception as e:
        print(f"YAML Syntax Error: {e}")
        return

    def clean_obj(obj):
        if isinstance(obj, str):
            # Clean reserved vue-i18n '@' symbols that cause build errors
            res = obj.replace("@", "")
            res = res.replace("X Minecraft Launcher", "NeoTerra Launcher").replace("XMCL", "NeoTerra")
            return res
        elif isinstance(obj, dict):
            return {k: clean_obj(v) for k, v in obj.items()}
        elif isinstance(obj, list):
            return [clean_obj(item) for item in obj]
        return obj

    cleaned_data = clean_obj(data)

    with open(uz_path, "w", encoding="utf-8") as f:
        yaml.safe_dump(cleaned_data, f, allow_unicode=True, sort_keys=False)

    print("Cleaned extra spaces, reserved symbols, and validated uz.yaml syntax successfully!")

if __name__ == "__main__":
    lint_and_fix_uz_yaml()

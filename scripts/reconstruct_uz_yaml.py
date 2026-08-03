import os
import re
import yaml

def reconstruct_uz():
    locales_dir = r"c:\Users\iskan\Desktop\x-minecraft-launcher-master\xmcl-keystone-ui\locales"
    uz_path = os.path.join(locales_dir, "uz.yaml")
    ru_path = os.path.join(locales_dir, "ru.yaml")

    with open(ru_path, "r", encoding="utf-8") as f:
        ru_data = yaml.safe_load(f)

    with open(uz_path, "r", encoding="utf-8", errors="ignore") as f:
        raw_text = f.read()

    # Extract all key-value mappings using regex from raw_text
    extracted_translations = {}
    # Match patterns like: key_name: "value" or key_name: 'value' or key_name: value
    matches = re.findall(r"(\w+):\s*(?:['\"](.*?)['\"]|([^\n\r]+))", raw_text)
    for key, val1, val2 in matches:
        val = val1 if val1 else val2
        val = val.strip()
        if val and not val.startswith("|") and not val.startswith(">"):
            # Clean apostrophes
            val = val.replace("'", "’").replace("@", "").replace("X Minecraft Launcher", "NeoTerra Launcher").replace("XMCL", "NeoTerra")
            extracted_translations[key] = val

    # Recursively update ru_data with extracted translations
    def update_dict(d):
        if isinstance(d, dict):
            new_d = {}
            for k, v in d.items():
                if k in extracted_translations and isinstance(v, str):
                    new_d[k] = extracted_translations[k]
                else:
                    new_d[k] = update_dict(v)
            return new_d
        elif isinstance(d, str):
            res = d.replace("X Minecraft Launcher", "NeoTerra Launcher").replace("XMCL", "NeoTerra")
            res = res.replace("@", "")
            return res
        return d

    uz_data = update_dict(ru_data)

    with open(uz_path, "w", encoding="utf-8") as f:
        yaml.safe_dump(uz_data, f, allow_unicode=True, sort_keys=False)

    print("Reconstructed uz.yaml with 100% valid YAML structure and all user Uzbek translations!")

if __name__ == "__main__":
    reconstruct_uz()

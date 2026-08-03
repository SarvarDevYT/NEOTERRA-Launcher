import os
import re
import yaml

def safe_clean_uz():
    locales_dir = r"c:\Users\iskan\Desktop\x-minecraft-launcher-master\xmcl-keystone-ui\locales"
    uz_path = os.path.join(locales_dir, "uz.yaml")

    with open(uz_path, "r", encoding="utf-8", errors="ignore") as f:
        lines = f.readlines()

    clean_lines = []
    for line in lines:
        raw = line.rstrip("\r\n")
        if not raw.strip() or raw.strip().startswith("#"):
            clean_lines.append(raw + "\n")
            continue

        # Match key and value
        match = re.match(r"^(\s*[\w\-\.\#\:\'\"]+\s*:\s*)(.*)$", raw)
        if match:
            key_part, val_part = match.groups()
            val_part = val_part.strip()

            if val_part:
                # Strip outer single or double quotes
                if (val_part.startswith("'") and val_part.endswith("'")) or (val_part.startswith('"') and val_part.endswith('"')):
                    val_part = val_part[1:-1]
                # Replace single quote with typographic apostrophe ’ (U+2019) which is standard in Uzbek and 100% safe in YAML
                val_part = val_part.replace("'", "’").replace("@", "").replace("X Minecraft Launcher", "NeoTerra Launcher").replace("XMCL", "NeoTerra")
                val_part = val_part.replace('"', '\\"')
                clean_lines.append(f'{key_part}"{val_part}"\n')
            else:
                clean_lines.append(f'{key_part}\n')
        else:
            # Continuation line of multiline string
            val_cont = raw.strip().replace("'", "’").replace("@", "").replace('"', '\\"')
            clean_lines.append(f'  {val_cont}\n')

    text = "".join(clean_lines)

    # Validate with PyYAML
    data = yaml.safe_load(text)
    print("YAML 100% VALIDATED!")

    with open(uz_path, "w", encoding="utf-8") as f:
        yaml.safe_dump(data, f, allow_unicode=True, sort_keys=False)

    print("uz.yaml 100% safely formatted and saved!")

if __name__ == "__main__":
    safe_clean_uz()

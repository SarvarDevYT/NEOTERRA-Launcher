import os
import yaml

def fix_strictly():
    uz_path = r"c:\Users\iskan\Desktop\x-minecraft-launcher-master\xmcl-keystone-ui\locales\uz.yaml"

    with open(uz_path, "r", encoding="utf-8") as f:
        lines = f.readlines()

    fixed_lines = []
    for line in lines:
        stripped = line.strip()
        if not stripped or stripped.startswith("#"):
            fixed_lines.append(line)
            continue

        indent = line[:len(line) - len(line.lstrip())]
        if ":" in stripped:
            parts = stripped.split(":", 1)
            key = parts[0].strip()
            val = parts[1].strip()

            if val:
                # Remove surrounding single/double quotes if any
                if (val.startswith("'") and val.endswith("'")) or (val.startswith('"') and val.endswith('"')):
                    val = val[1:-1]
                # Replace inner single quotes with right single quotation mark / apostrophe ’ (U+2019) or escape double quotes
                val_clean = val.replace("'", "’").replace('"', '\\"')
                fixed_lines.append(f'{indent}{key}: "{val_clean}"\n')
            else:
                fixed_lines.append(f'{indent}{key}:\n')
        else:
            fixed_lines.append(line)

    fixed_text = "".join(fixed_lines)

    # Validate with PyYAML
    data = yaml.safe_load(fixed_text)
    print("YAML syntax check 100% PASSED!")

    # Clean '@'
    def clean(obj):
        if isinstance(obj, str):
            res = obj.replace("X Minecraft Launcher", "NeoTerra Launcher").replace("XMCL", "NeoTerra")
            res = res.replace("@", "")
            return res
        elif isinstance(obj, dict):
            return {k: clean(v) for k, v in obj.items()}
        elif isinstance(obj, list):
            return [clean(item) for item in obj]
        return obj

    cleaned = clean(data)

    with open(uz_path, "w", encoding="utf-8") as f:
        yaml.safe_dump(cleaned, f, allow_unicode=True, sort_keys=False)

    print("uz.yaml successfully cleaned, formatted, and saved without any YAML syntax issues!")

if __name__ == "__main__":
    fix_strictly()

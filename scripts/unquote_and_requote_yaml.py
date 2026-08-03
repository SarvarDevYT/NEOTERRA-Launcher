import os
import yaml

def requote_yaml():
    uz_path = r"c:\Users\iskan\Desktop\x-minecraft-launcher-master\xmcl-keystone-ui\locales\uz.yaml"

    with open(uz_path, "r", encoding="utf-8") as f:
        lines = f.readlines()

    fixed_lines = []
    for line in lines:
        raw = line.rstrip("\r\n")
        # Find first colon
        colon_pos = raw.find(":")
        if colon_pos != -1:
            key_part = raw[:colon_pos+1]
            val_part = raw[colon_pos+1:].strip()

            # If value starts with single quote and ends with single quote
            if val_part.startswith("'") and val_part.endswith("'") and len(val_part) > 1:
                inner = val_part[1:-1]
                # Replace inner single quotes with apostrophe or escape them
                # Or output as double-quoted scalar
                inner_escaped = inner.replace('"', '\\"')
                # Check indent
                indent = raw[:len(raw) - len(raw.lstrip())]
                key_name = key_part.strip()
                line = f'{indent}{key_name} "{inner_escaped}"\n'
        fixed_lines.append(line if not line.endswith("\n") else line)

    fixed_text = "".join(fixed_lines)

    # Validate with PyYAML
    data = yaml.safe_load(fixed_text)
    print("YAML syntax 100% VALIDATED!")

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

    print("uz.yaml successfully cleaned, formatted, and saved!")

if __name__ == "__main__":
    requote_yaml()

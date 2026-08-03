import os
import re
import yaml

def unfold_and_clean_yaml():
    uz_path = r"c:\Users\iskan\Desktop\x-minecraft-launcher-master\xmcl-keystone-ui\locales\uz.yaml"

    with open(uz_path, "r", encoding="utf-8") as f:
        lines = f.readlines()

    unfolded = []
    i = 0
    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        # Check if line is a key: value line
        if ":" in stripped and not stripped.startswith("#"):
            parts = line.split(":", 1)
            key_indent = parts[0]
            val = parts[1].strip()

            # Check if next lines are continuation lines (more indented than key)
            key_indent_len = len(line) - len(line.lstrip())
            j = i + 1
            while j < len(lines):
                next_line = lines[j]
                next_stripped = next_line.strip()
                if not next_stripped:
                    j += 1
                    continue
                next_indent_len = len(next_line) - len(next_line.lstrip())
                if next_indent_len > key_indent_len and ":" not in next_stripped:
                    val += " " + next_stripped
                    j += 1
                else:
                    break

            i = j - 1

            if val:
                if (val.startswith("'") and val.endswith("'")) or (val.startswith('"') and val.endswith('"')):
                    val = val[1:-1]
                val = val.replace("'", "’").replace('"', '\\"')
                unfolded.append(f'{key_indent}: "{val}"\n')
            else:
                unfolded.append(f'{key_indent}:\n')
        else:
            unfolded.append(line)
        i += 1

    final_text = "".join(unfolded)

    # Validate with PyYAML
    data = yaml.safe_load(final_text)
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

    print("uz.yaml successfully unfolded, cleaned, formatted, and validated!")

if __name__ == "__main__":
    unfold_and_clean_yaml()

import os
import re
import yaml

def bulletproof_fix():
    uz_path = r"c:\Users\iskan\Desktop\x-minecraft-launcher-master\xmcl-keystone-ui\locales\uz.yaml"

    with open(uz_path, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()

    # Step 1: Unfold wrapped multiline values (lines that continue a string without a key:)
    # Replace multiline wrapped strings by joining them to previous line
    lines = content.splitlines()
    merged_lines = []
    for line in lines:
        stripped = line.strip()
        if not stripped or stripped.startswith("#"):
            merged_lines.append(line)
            continue

        # If line doesn't contain a key (no ':' or ':' is part of a URL/word inside quotes)
        # Check if line starts with key indentation + key_name:
        is_key = bool(re.match(r"^\s*[\w\-\.\#\'\"]+\s*:", line))
        if not is_key and merged_lines:
            # Join with previous line
            merged_lines[-1] = merged_lines[-1].rstrip() + " " + stripped
        else:
            merged_lines.append(line)

    unfolded_text = "\n".join(merged_lines)

    # Step 2: Now cleanly quote every key: value pair
    clean_lines = []
    for line in unfolded_text.splitlines():
        if not line.strip() or line.strip().startswith("#"):
            clean_lines.append(line)
            continue

        m = re.match(r"^(\s*[\w\-\.\#\'\"]+\s*:\s*)(.*)$", line)
        if m:
            key_part, val_part = m.groups()
            val_part = val_part.strip()
            if val_part:
                # Strip existing quotes
                if (val_part.startswith("'") and val_part.endswith("'")) or (val_part.startswith('"') and val_part.endswith('"')):
                    val_part = val_part[1:-1]
                # Replace single quote with typographic apostrophe ’ (U+2019)
                val_part = val_part.replace("'", "’").replace("@", "").replace("X Minecraft Launcher", "NeoTerra Launcher").replace("XMCL", "NeoTerra")
                val_part = val_part.replace('"', '\\"')
                clean_lines.append(f'{key_part}"{val_part}"')
            else:
                clean_lines.append(f'{key_part}')
        else:
            clean_lines.append(line)

    final_text = "\n".join(clean_lines)

    # Validate with PyYAML
    data = yaml.safe_load(final_text)
    print("YAML syntax check 100% PASSED!")

    with open(uz_path, "w", encoding="utf-8") as f:
        yaml.safe_dump(data, f, allow_unicode=True, sort_keys=False)

    print("uz.yaml 100% BULLETPROOF CLEANED AND VALIDATED!")

if __name__ == "__main__":
    bulletproof_fix()

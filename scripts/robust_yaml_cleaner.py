import os
import re
import yaml

def robust_clean():
    uz_path = r"c:\Users\iskan\Desktop\x-minecraft-launcher-master\xmcl-keystone-ui\locales\uz.yaml"

    with open(uz_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Replace invalid single quote patterns like: 'text o'tish text' -> "text o'tish text"
    def fix_quotes(text):
        new_lines = []
        for line in text.splitlines():
            # Check if line contains key: 'value'
            if ":" in line:
                key_part, val_part = line.split(":", 1)
                val_stripped = val_part.strip()
                if (val_stripped.startswith("'") and val_stripped.endswith("'") and len(val_stripped) > 1):
                    inner = val_stripped[1:-1]
                    # If inner has single quotes, replace outer with double quotes
                    if "'" in inner:
                        inner_safe = inner.replace('"', '\\"')
                        line = f'{key_part}: "{inner_safe}"'
            new_lines.append(line)
        return "\n".join(new_lines)

    cleaned_content = fix_quotes(content)

    # Validate with PyYAML
    try:
        data = yaml.safe_load(cleaned_content)
        print("YAML syntax check PASSED 100%!")
    except Exception as e:
        print(f"Error parsing YAML: {e}")
        return

    # Clean '@' symbol
    def clean_nodes(node):
        if isinstance(node, str):
            res = node.replace("X Minecraft Launcher", "NeoTerra Launcher").replace("XMCL", "NeoTerra")
            res = res.replace("@", "")
            return res
        elif isinstance(node, dict):
            return {k: clean_nodes(v) for k, v in node.items()}
        elif isinstance(node, list):
            return [clean_nodes(item) for item in node]
        return node

    clean_data = clean_nodes(data)

    with open(uz_path, "w", encoding="utf-8") as f:
        yaml.safe_dump(clean_data, f, allow_unicode=True, sort_keys=False)

    print("uz.yaml successfully cleaned, formatted, and validated!")

if __name__ == "__main__":
    robust_clean()

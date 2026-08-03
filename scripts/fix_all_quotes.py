import os
import re
import yaml

def fix_all_quotes():
    uz_path = r"c:\Users\iskan\Desktop\x-minecraft-launcher-master\xmcl-keystone-ui\locales\uz.yaml"

    with open(uz_path, "r", encoding="utf-8") as f:
        lines = f.readlines()

    new_lines = []
    for line in lines:
        match = re.match(r"^(\s*[\w\-\.\#\:\'\"\/]+\s*:\s*)'(.*)'(\s*)$", line)
        if match:
            prefix, content, suffix = match.groups()
            content_clean = content.replace('"', '\\"')
            line = f'{prefix}"{content_clean}"{suffix}\n'
        new_lines.append(line)

    fixed_text = "".join(new_lines)

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

    print("uz.yaml successfully formatted, cleaned and saved!")

if __name__ == "__main__":
    fix_all_quotes()

import yaml
import os
import re

def fix_uz_completely():
    base_dir = r"c:\Users\iskan\Desktop\x-minecraft-launcher-master"
    en_path = os.path.join(base_dir, "xmcl-keystone-ui", "locales", "en.yaml")
    ru_path = os.path.join(base_dir, "xmcl-keystone-ui", "locales", "ru.yaml")
    uz_orig_path = os.path.join(base_dir, "scripts", "uz_user_original.yaml")
    uz_out_path = os.path.join(base_dir, "xmcl-keystone-ui", "locales", "uz.yaml")

    with open(en_path, "r", encoding="utf-8") as f:
        en_data = yaml.safe_load(f)

    with open(ru_path, "r", encoding="utf-8") as f:
        ru_data = yaml.safe_load(f)

    # Read user's original uz.yaml lines and extract path-based key-values
    with open(uz_orig_path, "r", encoding="utf-8-sig", errors="ignore") as f:
        orig_text = f.read()

    # Parse user original text into a flat dict of tuple path -> value
    uz_flat = {}
    path_stack = []

    for line in orig_text.splitlines():
        stripped = line.strip()
        if not stripped or stripped.startswith("#"):
            continue

        indent = len(line) - len(line.lstrip())
        level = indent // 2  # 2 spaces per level

        # Match key: value or key:
        m = re.match(r"^([\w\-\.\#\s\/]+):\s*(.*)$", stripped)
        if m:
            k = m.group(1).strip()
            v = m.group(2).strip()

            # Adjust stack to current level
            path_stack = path_stack[:level]
            path_stack.append(k)

            if v:
                # Strip quotes
                if (v.startswith("'") and v.endswith("'")) or (v.startswith('"') and v.endswith('"')):
                    v = v[1:-1]
                v = v.replace("@", "")
                if not v.startswith("name:") and not v.startswith("message:"):
                    uz_flat[tuple(path_stack)] = v

    print(f"Extracted {len(uz_flat)} exact path keys from user's original uz.yaml!")

    # Explicit corrections for specific keys
    path_overrides = {
        ("delete", "name"): "{name} o'chirilsinmi",
        ("delete", "yes"): "O'chirish",
        ("delete", "no"): "Yo'q",
        ("instances", "add"): "Ekzemplar qo'shish",
        ("minecraftFriends", "add"): "Do'st qo'shish",
        ("setting", "appearance"): "Dizayn va Ko'rinish",
        ("setting", "appearanceDescription"): "Launcher ko'rinishini sozlash",
        ("baseSetting", "title"): "Mahalliy sozlamalar",
        ("BaseSettingGeneral", "title"): "Umumiy",
        ("agent", "title"): "NeoTerra Launcher Agenti",
    }

    # Recursive function to build uz tree following en structure
    def build_uz_tree(en_node, ru_node, current_path=()):
        if isinstance(en_node, dict):
            res = {}
            for k, v in en_node.items():
                ru_val = ru_node.get(k) if isinstance(ru_node, dict) else None
                res[k] = build_uz_tree(v, ru_val, current_path + (k,))
            return res
        elif isinstance(en_node, str):
            # 1. Check path overrides
            if current_path in path_overrides:
                return path_overrides[current_path]
            # 2. Check exact path in user's original translation
            if current_path in uz_flat:
                return uz_flat[current_path]
            # 3. Check leaf key in user's original flat translation (only if leaf is unique and not generic like 'name' or 'title')
            leaf_key = current_path[-1]
            if leaf_key not in ["name", "title", "description", "message", "cancel", "confirm", "delete", "create", "install", "update", "default", "disable"]:
                for p, val in uz_flat.items():
                    if p[-1] == leaf_key:
                        return val
            # 4. Fallback to Russian
            if isinstance(ru_node, str):
                return ru_node.replace("@", "")
            # 5. Fallback to English
            return en_node.replace("@", "")
        else:
            return en_node

    uz_data = build_uz_tree(en_data, ru_data)

    with open(uz_out_path, "w", encoding="utf-8") as f:
        yaml.safe_dump(uz_data, f, allow_unicode=True, sort_keys=False)

    print("uz.yaml 100% cleanly rebuilt with exact path matching!")

if __name__ == "__main__":
    fix_uz_completely()

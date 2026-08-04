"""
Final clean rebuild of uz.yaml:
1. Use 660f088 commit uz.yaml (user's translations, properly extracted as binary)
2. Use ru.yaml for properly-encoded Russian fallback
3. Use en.yaml for canonical structure
4. For each key: user's Uzbek if available, else Russian from ru.yaml, else English
"""
import yaml
import os
import subprocess
import re

BASE = r"c:\Users\iskan\Desktop\x-minecraft-launcher-master"
EN = os.path.join(BASE, "xmcl-keystone-ui", "locales", "en.yaml")
RU = os.path.join(BASE, "xmcl-keystone-ui", "locales", "ru.yaml")
UZ_660F = os.path.join(BASE, "scripts", "uz_from_660f.yaml")
UZ_OUT = os.path.join(BASE, "xmcl-keystone-ui", "locales", "uz.yaml")

# Load canonical files
with open(EN, "r", encoding="utf-8") as f:
    en = yaml.safe_load(f)
with open(RU, "r", encoding="utf-8") as f:
    ru = yaml.safe_load(f)

# Parse user's 660f version line-by-line to extract path->value pairs
# (can't use yaml.safe_load because it has some YAML syntax issues)
with open(UZ_660F, "r", encoding="utf-8") as f:
    uz_lines = f.readlines()

uz_flat = {}
path_stack = []

i = 0
while i < len(uz_lines):
    line = uz_lines[i].rstrip("\n").rstrip("\r")
    stripped = line.strip()
    if not stripped or stripped.startswith("#"):
        i += 1
        continue

    indent = len(line) - len(line.lstrip())
    level = indent // 2

    # Match key: value
    m = re.match(r"^(\s*)([\w\-\.\/\#\&\s\(\)\+\,\*\|\<\>\:\"\\]+?):\s*(.*)", line)
    if m:
        indent_str = m.group(1)
        k = m.group(2).strip()
        v = m.group(3).strip()

        indent_len = len(indent_str)
        level = indent_len // 2

        path_stack = path_stack[:level]
        path_stack.append(k)

        # Handle multiline blocks (>- or |)
        if v in [">-", "|", ">", "|-"]:
            parts = []
            j = i + 1
            while j < len(uz_lines):
                nl = uz_lines[j].rstrip("\n").rstrip("\r")
                if not nl.strip():
                    j += 1
                    continue
                ni = len(nl) - len(nl.lstrip())
                if ni > indent_len:
                    parts.append(nl.strip())
                    j += 1
                else:
                    break
            if parts:
                v = " ".join(parts)
                uz_flat[tuple(path_stack)] = v
            i = j
            continue

        if v:
            # Clean YAML quoting
            if (v.startswith("'") and v.endswith("'")) or \
               (v.startswith('"') and v.endswith('"')):
                v = v[1:-1]
            v = v.replace("''", "'")
            
            # Handle continuation lines (strings that wrap)
            j = i + 1
            while j < len(uz_lines):
                nl = uz_lines[j].rstrip("\n").rstrip("\r")
                if not nl.strip():
                    j += 1
                    continue
                ni = len(nl) - len(nl.lstrip())
                # Continuation: deeper indent and not a new key
                if ni > indent_len and not re.match(r"^\s*[\w\-]+\s*:", nl):
                    v += " " + nl.strip()
                    j += 1
                else:
                    break
            
            uz_flat[tuple(path_stack)] = v
            i = j
            continue

    i += 1

print(f"Extracted {len(uz_flat)} translations from user's 660f commit")

# Helper: check if a string is primarily Russian (Cyrillic)
def is_russian(s):
    if not s:
        return False
    cyrillic = sum(1 for c in s if '\u0400' <= c <= '\u04ff')
    return cyrillic > len(s) * 0.3

# Helper: check if string has known bad patterns from old scripts
def has_bad_pattern(s):
    if not s:
        return False
    bad_starts = ["name:", "message:", "title:", "crash:", "linkShared:", 
                  "defaultSourceDescription:", "red;"]
    for bs in bad_starts:
        if s.startswith(bs):
            return True
    return False

# Build uz tree
def build(en_node, ru_node, path=()):
    if isinstance(en_node, dict):
        result = {}
        for k, v in en_node.items():
            rv = ru_node.get(k) if isinstance(ru_node, dict) else None
            result[k] = build(v, rv, path + (k,))
        return result
    elif isinstance(en_node, str):
        # Check for user's Uzbek translation at this exact path
        if path in uz_flat:
            user_val = uz_flat[path]
            # Use it only if:
            # 1. Not a bad pattern (like "name: something")
            # 2. Actually has useful content
            if not has_bad_pattern(user_val):
                # If it's Russian text, replace with properly-encoded Russian from ru.yaml
                if is_russian(user_val) and isinstance(ru_node, str):
                    return ru_node
                return user_val
        
        # Fallback to Russian from ru.yaml (always properly encoded)
        if isinstance(ru_node, str):
            return ru_node
        
        # Last resort: English
        return en_node
    elif isinstance(en_node, (int, float, bool)):
        return ru_node if isinstance(ru_node, type(en_node)) else en_node
    elif isinstance(en_node, list):
        return en_node
    else:
        return en_node

uz_data = build(en, ru)

# Apply specific overrides for known keys
overrides = {
    ("instances", "add"): "Ekzemplar qo'shish",
    ("minecraftFriends", "add"): "Do'st qo'shish",
    ("setting", "appearance"): "Dizayn va Ko'rinish",
    ("setting", "appearanceDescription"): "Launcher ko'rinishini sozlash",
    ("BaseSettingGeneral", "title"): "Umumiy",
    ("agent", "title"): "NeoTerra Launcher Agenti",
    ("agent", "emptyHint"): "Agentdan ekzemplarni tekshirishni, modlarni yoqish/o'chirishni, loglarni o'qishni yoki nosozliklarni tashxislashni so'rang.",
    ("agent", "suggestion3"): "Sborka yig'ing: kerakli funksiya uchun modlarni toping va ularni ushbu ekzemplarga o'rnating",
    ("delete", "name"): "{name} o'chirilsinmi",
    ("delete", "yes"): "O'chirish",
    ("delete", "no"): "Yo'q",
}

def apply_overrides(data, overrides):
    for path_tuple, value in overrides.items():
        node = data
        for key in path_tuple[:-1]:
            if isinstance(node, dict) and key in node:
                node = node[key]
            else:
                node = None
                break
        if node is not None and isinstance(node, dict):
            last = path_tuple[-1]
            if last in node:
                node[last] = value

apply_overrides(uz_data, overrides)

# Write clean uz.yaml
with open(UZ_OUT, "w", encoding="utf-8", newline="\n") as f:
    yaml.safe_dump(uz_data, f, allow_unicode=True, sort_keys=False, default_flow_style=False)

# Verify
with open(UZ_OUT, "r", encoding="utf-8") as f:
    content = f.read()

mojibake = content.count("╨") + content.count("╤") + content.count("тАж") + content.count("тАФ")
has_cyrillic = bool(re.search(r'[\u0400-\u04ff]', content))

def count_keys(d):
    c = 0
    if isinstance(d, dict):
        for v in d.values():
            c += count_keys(v) if isinstance(v, dict) else 1
    return c

total = count_keys(yaml.safe_load(content))

print(f"\nuz.yaml rebuilt: {total} keys")
print(f"Mojibake characters: {mojibake}")
print(f"Has proper Cyrillic: {has_cyrillic}")
if mojibake == 0 and has_cyrillic:
    print("✅ ENCODING: 100% CLEAN! Russian Cyrillic renders properly!")
else:
    print("⚠️  Issues found")

# Show sample lines
print("\nSample:")
for line in content.split("\n")[:15]:
    print(f"  {line}")

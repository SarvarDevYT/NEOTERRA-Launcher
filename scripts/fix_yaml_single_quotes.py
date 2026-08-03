import os
import re

def fix_single_quotes_in_yaml():
    locales_dir = r"c:\Users\iskan\Desktop\x-minecraft-launcher-master\xmcl-keystone-ui\locales"
    uz_path = os.path.join(locales_dir, "uz.yaml")

    with open(uz_path, "r", encoding="utf-8") as f:
        lines = f.readlines()

    fixed_lines = []
    for line in lines:
        # Match lines like:   key: 'some text o'tish more text'
        m = re.match(r"^(\s*[\w\-\.\#\:\'\"]+\s*:\s*)'(.*)'(\s*)$", line.rstrip('\r\n'))
        if m:
            prefix, content, suffix = m.groups()
            # Replace single quotes inside content with safe representation or wrap in double quotes
            # If line is wrapped in single quotes, change outer to double quotes and escape internal double quotes
            safe_content = content.replace('"', '\\"')
            fixed_lines.append(f'{prefix}"{safe_content}"{suffix}\n')
        else:
            fixed_lines.append(line)

    with open(uz_path, "w", encoding="utf-8") as f:
        f.writelines(fixed_lines)

    print("Fixed all single quote escaping issues in uz.yaml!")

if __name__ == "__main__":
    fix_single_quotes_in_yaml()

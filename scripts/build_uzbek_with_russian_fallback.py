import os
import yaml

def build_uz_with_ru_fallback():
    locales_dir = r"c:\Users\iskan\Desktop\x-minecraft-launcher-master\xmcl-keystone-ui\locales"
    ru_path = os.path.join(locales_dir, "ru.yaml")
    uz_path = os.path.join(locales_dir, "uz.yaml")

    with open(ru_path, "r", encoding="utf-8") as f:
        ru_data = yaml.safe_load(f)

    # Uzbek translations overlaying Russian base
    uz_translations = {
        "setting": {
          "title": "Sozlamalar",
          "general": "Asosiy Sozlamalar",
          "appearance": "Dizayn va Tashqi Ko'rinish",
          "about": "NeoTerra Launcher Haqida",
          "aboutLicense": "MIT Litsenziyasi"
        },
        "feedback": {
          "name": "Murojaat va Yordam",
          "description": "Muammo yoki taklifingiz bo'lsa, rasmiy kanallarimiz orqali bog'laning.",
          "channel": "NeoTerra Rasmiy Kanallari",
          "github": "NeoTerra Rasmiy Sayti",
          "githubDescription": "site.neoterra.uz — Server yangiliklari va ma'lumotlar platformasi.",
          "githubOpenIssue": "Saytga o'tish",
          "qq": "Telegram Hamjamiyati",
          "qqDescription": "t.me/NeoTerraServer — Rasmiy Telegram kanal va guruh.",
          "qqEnterGroup": "A'zo bo'lish",
          "kook": "YouTube Kanal",
          "kookDescription": "youtube.com/NeoTerraMC — Videolar va treylerlar.",
          "kookEnterGroup": "Obuna bo'lish",
          "discord": "Discord Server",
          "discordDescription": "discord.gg/neoterra — O'yinchilar bilan ovozli muloqot.",
          "discordJoin": "Qo'shilish"
        }
    }

    def clean_node(node):
        if isinstance(node, str):
            res = node.replace("X Minecraft Launcher", "NeoTerra Launcher").replace("XMCL", "NeoTerra Launcher")
            res = res.replace("@", "")
            return res
        elif isinstance(node, dict):
            return {k: clean_node(v) for k, v in node.items()}
        elif isinstance(node, list):
            return [clean_node(item) for item in node]
        return node

    # Start with complete Russian data as base
    merged_data = clean_node(ru_data)

    # Merge Uzbek translations where available
    def merge_dicts(base, overlay):
        for k, v in overlay.items():
            if isinstance(v, dict) and k in base and isinstance(base[k], dict):
                merge_dicts(base[k], v)
            else:
                base[k] = v

    merge_dicts(merged_data, uz_translations)

    with open(uz_path, "w", encoding="utf-8") as f:
        yaml.safe_dump(merged_data, f, allow_unicode=True, sort_keys=False)

    print("Successfully built uz.yaml with Russian fallback for all un-translated keys!")

if __name__ == "__main__":
    build_uz_with_ru_fallback()

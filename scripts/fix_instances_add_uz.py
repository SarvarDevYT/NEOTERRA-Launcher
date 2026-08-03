import yaml
import os

def fix_instances_add():
    uz_path = r"c:\Users\iskan\Desktop\x-minecraft-launcher-master\xmcl-keystone-ui\locales\uz.yaml"

    with open(uz_path, "r", encoding="utf-8") as f:
        data = yaml.safe_load(f)

    if "instances" in data:
        data["instances"]["add"] = "Ekzemplar qo’shish"
    
    if "minecraftFriends" in data:
        data["minecraftFriends"]["add"] = "Do’st qo’shish"

    with open(uz_path, "w", encoding="utf-8") as f:
        yaml.safe_dump(data, f, allow_unicode=True, sort_keys=False)

    print("Set instances.add to 'Ekzemplar qo’shish' successfully!")

if __name__ == "__main__":
    fix_instances_add()

import os
from PIL import Image

def fix_splash():
    source_path = r"C:\Users\iskan\Pictures\neoterra\neoterra-new-logo.jpg"
    base_dir = r"c:\Users\iskan\Desktop\x-minecraft-launcher-master"

    # Replace splash logo.webp with NeoTerra logo
    splash_logo_path = os.path.join(base_dir, "xmcl-keystone-ui", "src", "assets", "logo.webp")
    if os.path.exists(source_path):
        img = Image.open(source_path).convert("RGBA")
        img.resize((128, 128)).save(splash_logo_path, "WEBP")
        print("Updated splash logo.webp with NeoTerra emblem!")

if __name__ == "__main__":
    fix_splash()

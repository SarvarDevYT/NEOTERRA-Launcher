import os
from PIL import Image

def process_user_logo():
    source_path = r"C:\Users\iskan\Pictures\neoterra\neoterra-new-logo.jpg"
    base_dir = r"c:\Users\iskan\Desktop\x-minecraft-launcher-master"

    if not os.path.exists(source_path):
        print(f"Error: Source image not found at {source_path}")
        return

    img = Image.open(source_path).convert("RGBA")
    print(f"Opened original image: {img.size}")

    # 1. Save UI PNG logo
    ui_asset_path = os.path.join(base_dir, "xmcl-keystone-ui", "src", "assets", "neoterra_logo.png")
    os.makedirs(os.path.dirname(ui_asset_path), exist_ok=True)
    img.save(ui_asset_path, "PNG")

    # 2. Save Electron icons
    icon_dir = os.path.join(base_dir, "xmcl-electron-app", "icons")
    os.makedirs(icon_dir, exist_ok=True)

    img.resize((256, 256)).save(os.path.join(icon_dir, "dark@256x256.png"), "PNG")
    img.resize((256, 256)).save(os.path.join(icon_dir, "light@256x256.png"), "PNG")

    # Save ICO with multiple sizes for Windows Explorer and installer shortcuts
    sizes = [(256, 256), (128, 128), (64, 64), (48, 48), (32, 32), (16, 16)]
    ico_img = img.copy()
    ico_img.save(
        os.path.join(icon_dir, "dark.ico"),
        format="ICO",
        sizes=sizes
    )
    ico_img.save(
        os.path.join(icon_dir, "light.ico"),
        format="ICO",
        sizes=sizes
    )

    print("All NeoTerra logo icons updated directly from original neoterra-new-logo.jpg!")

if __name__ == "__main__":
    process_user_logo()

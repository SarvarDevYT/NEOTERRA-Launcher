import os
from PIL import Image, ImageDraw

def generate_logo(size=512):
    # Purple background matching user's image #7C3AED / #8020E0
    bg_color = (124, 58, 237, 255) # #7C3AED / #8020E0
    img = Image.new("RGBA", (size, size), bg_color)
    draw = ImageDraw.Draw(img)

    # Draw white hexagon emblem matching the user's NT logo
    # Hexagon points: Top, TopRight, BottomRight, Bottom, BottomLeft, TopLeft
    margin = size * 0.15
    w, h = size - 2 * margin, size - 2 * margin
    cx, cy = size / 2, size / 2

    # Left half: 'N' shape (White polygon)
    # Right half: 'T' shape (White polygon)
    gap = size * 0.035 # Gap between N and T in the center

    # Left 'N' polygon (White)
    n_poly = [
        (cx - gap/2 - size*0.04, cy - size*0.35),
        (cx - gap/2 - size*0.28, cy - size*0.20),
        (cx - gap/2 - size*0.28, cy + size*0.25),
        (cx - gap/2 - size*0.16, cy + size*0.35),
        (cx - gap/2 - size*0.16, cy - size*0.05),
        (cx - gap/2 - size*0.04, cy + size*0.05)
    ]
    draw.polygon(n_poly, fill=(255, 255, 255, 255))

    # Right 'T' polygon (White)
    t_poly = [
        (cx + gap/2 + size*0.04, cy - size*0.35),
        (cx + gap/2 + size*0.28, cy - size*0.20),
        (cx + gap/2 + size*0.28, cy - size*0.05),
        (cx + gap/2 + size*0.16, cy - size*0.05),
        (cx + gap/2 + size*0.16, cy + size*0.25),
        (cx + gap/2 + size*0.04, cy + size*0.35)
    ]
    draw.polygon(t_poly, fill=(255, 255, 255, 255))

    return img

if __name__ == '__main__':
    base_dir = r"c:\Users\iskan\Desktop\x-minecraft-launcher-master"
    logo_path = os.path.join(base_dir, "xmcl-keystone-ui", "src", "assets", "neoterra_logo.png")
    os.makedirs(os.path.dirname(logo_path), exist_ok=True)
    
    logo_512 = generate_logo(512)
    logo_512.save(logo_path)

    # Save to electron icons
    icon_dir = os.path.join(base_dir, "xmcl-electron-app", "icons")
    os.makedirs(icon_dir, exist_ok=True)
    logo_512.resize((256, 256)).save(os.path.join(icon_dir, "dark@256x256.png"))
    logo_512.resize((256, 256)).save(os.path.join(icon_dir, "light@256x256.png"))
    logo_512.resize((256, 256)).save(os.path.join(icon_dir, "dark.ico"))
    print("Clean NeoTerra logo regenerated successfully!")

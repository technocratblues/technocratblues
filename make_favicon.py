from PIL import Image, ImageDraw
import os

os.makedirs('public', exist_ok=True)
img = Image.open('src/assets/img/logo.jpg').convert('RGBA')

for size, name in [(64, 'favicon.png'), (180, 'apple-touch-icon.png')]:
    base = img.resize((size, size), Image.LANCZOS)
    mask = Image.new('L', (size, size), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, size, size), fill=255)
    base.putalpha(mask)
    base.save(f'public/{name}', 'PNG')

print('Done!')

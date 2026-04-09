import os, glob

base = r'C:\Users\kenne\.gemini\antigravity\playground\ultraviolet-triangulum'

for path in glob.glob(base + '/**/*.html', recursive=True):
    with open(path, 'rb') as f:
        data = f.read()
    # Remove UTF-8 BOM if present
    if data.startswith(b'\xef\xbb\xbf'):
        data = data[3:]
        print(f'BOM removed: {path}')
    text = data.decode('utf-8')
    # Fix Servicios nav link so it doesn't navigate (only shows dropdown)
    text = text.replace('href="./servicios/">Servicios', 'href="javascript:void(0)" style="cursor:default;">Servicios')
    text = text.replace('href="../servicios/">Servicios', 'href="javascript:void(0)" style="cursor:default;">Servicios')
    with open(path, 'wb') as f:
        f.write(text.encode('utf-8'))

print('Done!')

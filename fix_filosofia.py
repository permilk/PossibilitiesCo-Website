import re

path = r'C:\Users\kenne\.gemini\antigravity\playground\ultraviolet-triangulum\quienes-somos.html'

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find the entire section from the comment to </section>
old_block = re.search(
    r'<!-- PROP[^>]+MBICI[^>]+ -->\s*<section class="content-section">.*?</section>',
    content, re.DOTALL
)

if old_block:
    print("Found block, replacing...")
    new_block = '''    <!-- NUESTRA FILOSOFÍA & AMBICIÓN — una sola fila -->
    <section class="content-section" style="background:linear-gradient(160deg,#f4f8ff 0%,#ffffff 100%);">
        <div class="container">
            <div class="reveal" style="display:grid; grid-template-columns:1fr 1fr; gap:28px; align-items:stretch;">

                <!-- Nuestra Filosofía -->
                <div style="position:relative; background:var(--white); border-radius:var(--radius-lg); padding:48px 40px; box-shadow:var(--shadow-md); border:1px solid var(--gray-100); border-top:4px solid var(--blue-700); overflow:hidden;">
                    <div style="position:absolute;top:-40px;right:-40px;width:160px;height:160px;background:var(--blue-50);border-radius:50%;pointer-events:none;"></div>
                    <div style="width:60px;height:60px;background:linear-gradient(135deg,var(--blue-700),var(--blue-500));border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:1.4rem;color:white;margin-bottom:24px;"><i class="fas fa-compass"></i></div>
                    <h3 style="font-family:var(--font-display);font-size:1.6rem;color:var(--blue-700);margin-bottom:16px;">Nuestra Filosofía</h3>
                    <p style="color:var(--gray-600);line-height:1.8;font-size:1rem;">Contribuir al desarrollo de personas y talento grandioso, diseñando culturas asombrosas y vibrantes, construyendo organizaciones icónicas para hoy y el futuro.</p>
                    <div style="margin-top:24px;display:flex;align-items:center;gap:10px;font-size:0.88rem;font-weight:600;color:var(--blue-600);">
                        <i class="fas fa-users"></i>&nbsp;Personas primero
                        <span style="margin:0 8px;color:var(--gray-300);">|</span>
                        <i class="fas fa-globe-americas"></i>&nbsp;LATAM &amp; más allá
                    </div>
                </div>

                <!-- Ambición -->
                <div style="position:relative; background:linear-gradient(135deg,var(--blue-700) 0%,#1e56b0 60%,var(--blue-500) 100%); border-radius:var(--radius-lg); padding:48px 40px; box-shadow:var(--shadow-lg); overflow:hidden;">
                    <div style="position:absolute;top:-40px;right:-40px;width:160px;height:160px;background:rgba(255,255,255,0.08);border-radius:50%;pointer-events:none;"></div>
                    <div style="position:absolute;bottom:-30px;left:-30px;width:120px;height:120px;background:rgba(255,255,255,0.05);border-radius:50%;pointer-events:none;"></div>
                    <div style="width:60px;height:60px;background:rgba(255,255,255,0.15);border:1px solid rgba(255,255,255,0.3);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:1.4rem;color:white;margin-bottom:24px;"><i class="fas fa-rocket"></i></div>
                    <h3 style="font-family:var(--font-display);font-size:1.6rem;color:white;margin-bottom:16px;">Nuestra Ambición</h3>
                    <p style="color:rgba(255,255,255,0.88);line-height:1.8;font-size:1rem;">Ser el aliado estratégico de emprendedores, comunidades y organizaciones de la región LATAM, ayudándoles a alcanzar sus metas más ambiciosas liberando el potencial del activo más valioso: <strong style="color:white;">"La Gente"</strong>.</p>
                    <p style="color:rgba(255,255,255,0.72);line-height:1.8;font-size:0.95rem;margin-top:16px;">Esto en un contexto de disrupción global, nuevas culturas de trabajo y tendencias económicas emergentes.</p>
                    <div style="margin-top:24px;display:flex;align-items:center;gap:10px;font-size:0.88rem;font-weight:600;color:rgba(255,255,255,0.85);">
                        <i class="fas fa-chart-line"></i>&nbsp;Alto impacto
                        <span style="margin:0 8px;color:rgba(255,255,255,0.3);">|</span>
                        <i class="fas fa-handshake"></i>&nbsp;Resultados con propósito
                    </div>
                </div>

            </div>
        </div>
    </section>'''

    content = content[:old_block.start()] + new_block + content[old_block.end():]

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Done!")
else:
    print("Block not found!")
    # Print surrounding text for debugging
    idx = content.find('PROPÓSITO')
    if idx > 0:
        print(repr(content[idx-5:idx+100]))

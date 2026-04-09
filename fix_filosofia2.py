import re

path = r'C:\Users\kenne\.gemini\antigravity\playground\ultraviolet-triangulum\quienes-somos.html'

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find the section and replace it
old_block = re.search(
    r'<!-- NUESTRA FILOSOF[^\-]+-.*?</section>',
    content, re.DOTALL
)

if old_block:
    print("Found block, replacing...")
    new_block = '''    <!-- NUESTRA FILOSOFÍA & AMBICIÓN — una sola fila con imagen -->
    <section class="content-section" style="background:linear-gradient(160deg,#f4f8ff 0%,#ffffff 100%);">
        <div class="container">
            <div class="reveal" style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:24px; align-items:stretch;">

                <!-- Imagen -->
                <div style="border-radius:var(--radius-lg); overflow:hidden; min-height:360px; position:relative; box-shadow:var(--shadow-lg);">
                    <img src="https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=800&q=85"
                         alt="Equipo PossibilitiesCo"
                         style="width:100%;height:100%;object-fit:cover;display:block;">
                    <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(10,30,80,0.55) 0%,transparent 60%);"></div>
                    <div style="position:absolute;bottom:24px;left:24px;right:24px;">
                        <span style="background:rgba(255,255,255,0.15);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.3);color:white;font-size:0.8rem;font-weight:600;padding:6px 14px;border-radius:50px;letter-spacing:0.5px;">Possibilities Co.</span>
                    </div>
                </div>

                <!-- Nuestra Filosofía -->
                <div style="position:relative; background:var(--white); border-radius:var(--radius-lg); padding:40px 32px; box-shadow:var(--shadow-md); border:1px solid var(--gray-100); border-top:4px solid var(--blue-700); overflow:hidden;">
                    <div style="position:absolute;top:-40px;right:-40px;width:140px;height:140px;background:var(--blue-50);border-radius:50%;pointer-events:none;"></div>
                    <div style="width:56px;height:56px;background:linear-gradient(135deg,var(--blue-700),var(--blue-500));border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:1.3rem;color:white;margin-bottom:20px;"><i class="fas fa-compass"></i></div>
                    <h3 style="font-family:var(--font-display);font-size:1.45rem;color:var(--blue-700);margin-bottom:14px;">Nuestra Filosofía</h3>
                    <p style="color:var(--gray-600);line-height:1.8;font-size:0.95rem;">Contribuir al desarrollo de personas y talento grandioso, diseñando culturas asombrosas y vibrantes, construyendo organizaciones icónicas para hoy y el futuro.</p>
                    <div style="margin-top:20px;display:flex;flex-wrap:wrap;align-items:center;gap:10px;font-size:0.82rem;font-weight:600;color:var(--blue-600);">
                        <span><i class="fas fa-users" style="margin-right:4px;"></i>Personas primero</span>
                        <span style="color:var(--gray-300);">|</span>
                        <span><i class="fas fa-globe-americas" style="margin-right:4px;"></i>LATAM &amp; más</span>
                    </div>
                </div>

                <!-- Ambición -->
                <div style="position:relative; background:linear-gradient(135deg,var(--blue-700) 0%,#1e56b0 60%,var(--blue-500) 100%); border-radius:var(--radius-lg); padding:40px 32px; box-shadow:var(--shadow-lg); overflow:hidden;">
                    <div style="position:absolute;top:-40px;right:-40px;width:140px;height:140px;background:rgba(255,255,255,0.08);border-radius:50%;pointer-events:none;"></div>
                    <div style="position:absolute;bottom:-30px;left:-30px;width:110px;height:110px;background:rgba(255,255,255,0.05);border-radius:50%;pointer-events:none;"></div>
                    <div style="width:56px;height:56px;background:rgba(255,255,255,0.15);border:1px solid rgba(255,255,255,0.3);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:1.3rem;color:white;margin-bottom:20px;"><i class="fas fa-rocket"></i></div>
                    <h3 style="font-family:var(--font-display);font-size:1.45rem;color:white;margin-bottom:14px;">Nuestra Ambición</h3>
                    <p style="color:rgba(255,255,255,0.88);line-height:1.8;font-size:0.95rem;">Ser el aliado estratégico de emprendedores y organizaciones de LATAM, liberando el potencial de su activo más valioso: <strong style="color:white;">"La Gente"</strong>.</p>
                    <p style="color:rgba(255,255,255,0.68);line-height:1.8;font-size:0.88rem;margin-top:12px;">En un contexto de disrupción global, nuevas culturas de trabajo y tendencias económicas emergentes.</p>
                    <div style="margin-top:20px;display:flex;flex-wrap:wrap;align-items:center;gap:10px;font-size:0.82rem;font-weight:600;color:rgba(255,255,255,0.85);">
                        <span><i class="fas fa-chart-line" style="margin-right:4px;"></i>Alto impacto</span>
                        <span style="color:rgba(255,255,255,0.3);">|</span>
                        <span><i class="fas fa-handshake" style="margin-right:4px;"></i>Con propósito</span>
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
    idx = content.find('FILOSOF')
    if idx > 0:
        print(repr(content[idx-20:idx+80]))

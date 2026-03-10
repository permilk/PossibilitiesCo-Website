const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    console.log('Iniciando generacion de PDF...');

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files', '--disable-web-security']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1400, height: 900 });

    const htmlPath = path.resolve('C:\\Users\\kenne\\OneDrive\\Documentos\\E-Global\\dashboard\\index.html');
    const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');
    console.log('Cargando:', fileUrl);

    await page.goto(fileUrl, { waitUntil: 'networkidle2', timeout: 60000 });

    // Apply PDF mode - hide sidebar, disable animations, set final values
    await page.evaluate(() => {
        document.body.classList.add('pdf-mode');

        const sidebar = document.querySelector('.sidebar');
        if (sidebar) sidebar.style.display = 'none';

        const main = document.querySelector('.main-content');
        if (main) main.style.marginLeft = '0';

        const modal = document.querySelector('.modal-overlay');
        if (modal) modal.style.display = 'none';

        document.querySelectorAll('.animate-in, .fade-section').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
            el.style.animation = 'none';
        });

        document.querySelectorAll('.kpi-progress-bar').forEach(bar => {
            bar.style.animation = 'none';
        });

        // Set counter final values
        const counters = {
            '70': '70', '8': '8', '19': '19', '15': '15',
            '2299': '$2,299M', '96': '96%', '99': '99%',
            '144': '144', '336': '336', '1998': '1,998 hrs'
        };
        document.querySelectorAll('[data-count]').forEach(el => {
            const target = el.dataset.count;
            const prefix = el.dataset.prefix || '';
            const suffix = el.dataset.suffix || '';
            el.textContent = counters[target] || (prefix + parseInt(target).toLocaleString('es-MX') + suffix);
        });

        const hero = document.querySelector('.hero-section');
        if (hero) {
            hero.style.minHeight = 'auto';
            hero.style.padding = '4rem 3rem';
        }
    });

    // Wait for everything to settle
    await new Promise(r => setTimeout(r, 3000));

    const outputPath = 'C:\\Users\\kenne\\OneDrive\\Documentos\\E-Global\\Modelo_Operativo_AS_IS_S2N_Dashboard.pdf';

    await page.pdf({
        path: outputPath,
        format: 'A4',
        landscape: true,
        printBackground: true,
        preferCSSPageSize: false,
        margin: { top: '0.5cm', right: '0.5cm', bottom: '1cm', left: '0.5cm' },
        displayHeaderFooter: true,
        headerTemplate: '<div></div>',
        footerTemplate: '<div style="width:100%;text-align:center;font-size:8px;color:#888;padding:0 1cm"><span>Modelo Operativo AS-IS — S2N — E-Global</span><span style="float:right">Pag. <span class="pageNumber"></span>/<span class="totalPages"></span></span></div>'
    });

    console.log('PDF generado:', outputPath);
    await browser.close();
    console.log('Proceso completado.');
})().catch(err => {
    console.error('Error:', err.message);
    process.exit(1);
});

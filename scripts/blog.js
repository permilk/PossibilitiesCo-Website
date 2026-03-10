/* ═══════════════════════════════════════════════════════
   POSSIBILITIES CO. — Blog System with Multimedia + Firebase
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    // ── Firebase Config (same as admin.html) ──
    const FIREBASE_CONFIG = {
        apiKey: "FIREBASE_API_KEY",
        authDomain: "FIREBASE_PROJECT.firebaseapp.com",
        databaseURL: "https://FIREBASE_PROJECT-default-rtdb.firebaseio.com",
        projectId: "FIREBASE_PROJECT"
    };

    let db = null;
    let firebaseReady = false;

    // Try to init Firebase (if SDK loaded and configured)
    try {
        if (typeof firebase !== 'undefined' && FIREBASE_CONFIG.apiKey !== "FIREBASE_API_KEY") {
            if (!firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG);
            db = firebase.database();
            firebaseReady = true;
        }
    } catch (e) { console.warn('Firebase not available, using static JSON.'); }

    // ── Blog Listing Page ──
    const blogGrid = document.getElementById('blogGrid');
    const blogFilters = document.getElementById('blogFilters');

    if (blogGrid) {
        loadBlogIndex();
    }

    async function loadBlogIndex() {
        let articles = [];

        // 1. Try Firebase
        if (firebaseReady) {
            try {
                const snap = await db.ref('blog/articles').orderByChild('date').once('value');
                const data = snap.val();
                if (data) articles = Object.values(data).sort((a, b) => b.date.localeCompare(a.date));
            } catch (e) { console.warn('Firebase fetch failed.'); }
        }

        // 2. Merge with static JSON (for pre-seeded articles)
        try {
            const response = await fetch('./blog-index.json');
            const staticArticles = await response.json();
            // Add static articles that aren't already in Firebase
            const existingSlugs = new Set(articles.map(a => a.slug));
            staticArticles.forEach(sa => {
                if (!existingSlugs.has(sa.slug)) articles.push(sa);
            });
        } catch (e) { /* No static JSON, that's fine */ }

        if (articles.length === 0) {
            blogGrid.innerHTML = '<p style="text-align:center;color:var(--gray-500);grid-column:1/-1;">No hay artículos disponibles aún.</p>';
            return;
        }

        // Sort by date descending
        articles.sort((a, b) => b.date.localeCompare(a.date));
        renderFilters(articles);
        renderArticles(articles);
    }

    function renderFilters(articles) {
        if (!blogFilters) return;
        const categories = ['Todos', ...new Set(articles.map(a => a.category))];
        blogFilters.innerHTML = '';
        categories.forEach(cat => {
            const btn = document.createElement('button');
            btn.className = 'blog-filter-btn' + (cat === 'Todos' ? ' active' : '');
            btn.textContent = cat;
            btn.addEventListener('click', () => {
                blogFilters.querySelectorAll('.blog-filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filtered = cat === 'Todos' ? articles : articles.filter(a => a.category === cat);
                renderArticles(filtered);
            });
            blogFilters.appendChild(btn);
        });
    }

    function renderArticles(articles) {
        blogGrid.innerHTML = '';
        if (articles.length === 0) {
            blogGrid.innerHTML = '<p style="text-align:center;color:var(--gray-500);grid-column:1/-1;">No hay artículos en esta categoría.</p>';
            return;
        }
        articles.forEach(article => {
            const card = document.createElement('div');
            card.className = 'blog-card reveal visible';
            let imageUrl = article.cover_image || '';
            if (!imageUrl) imageUrl = '../assets/images/team-coaching.png';
            else if (!imageUrl.startsWith('http')) imageUrl = `./articles/images/${imageUrl}`;
            const dateStr = new Date(article.date).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });
            card.innerHTML = `
        <img src="${imageUrl}" alt="${article.title}" class="blog-card-image" onerror="this.src='../assets/images/team-coaching.png'">
        <div class="blog-card-body">
          <span class="blog-card-category">${article.category}</span>
          <h3 class="blog-card-title">
            <a href="./article.html?slug=${article.slug}">${article.title}</a>
          </h3>
          <p class="blog-card-excerpt">${article.excerpt || ''}</p>
          <div class="blog-card-meta">
            <span><i class="fas fa-user"></i> ${article.author}</span>
            <span><i class="fas fa-calendar"></i> ${dateStr}</span>
          </div>
        </div>
      `;
            blogGrid.appendChild(card);
        });
    }

    // ── Article Reader Page ──
    const articleContent = document.getElementById('articleContent');
    if (articleContent) {
        loadArticle();
    }

    async function loadArticle() {
        const params = new URLSearchParams(window.location.search);
        const slug = params.get('slug');
        if (!slug) {
            articleContent.innerHTML = '<p>Artículo no encontrado.</p>';
            return;
        }

        try {
            let article = null;
            let mdText = '';

            // 1. Try Firebase first
            if (firebaseReady) {
                try {
                    const snap = await db.ref(`blog/articles/${slug}`).once('value');
                    const data = snap.val();
                    if (data) {
                        article = data;
                        // Firebase articles store content inline
                        mdText = data.content || '';
                    }
                } catch (e) { /* fall through */ }
            }

            // 2. Fall back to static JSON + .md files
            if (!article || !mdText) {
                try {
                    const indexRes = await fetch('./blog-index.json');
                    const articles = await indexRes.json();
                    const staticArticle = articles.find(a => a.slug === slug);
                    if (staticArticle) {
                        if (!article) article = staticArticle;
                        // Fetch markdown file
                        const mdRes = await fetch(`./articles/${slug}.md`);
                        if (mdRes.ok) mdText = await mdRes.text();
                    }
                } catch (e) { /* no static version */ }
            }

            if (!article && !mdText) {
                articleContent.innerHTML = '<p style="color:var(--gray-500);">Artículo no encontrado.</p>';
                return;
            }

            // Configure marked.js with custom renderer
            const renderer = new marked.Renderer();

            renderer.image = function (href, title, text) {
                if (typeof href === 'object') { text = href.text || ''; title = href.title || ''; href = href.href || ''; }
                if (href && !href.startsWith('http') && !href.startsWith('/')) {
                    href = `./articles/images/${href}`;
                }
                const caption = text || title || '';
                return `
          <figure class="article-figure">
            <img src="${href}" alt="${caption}" loading="lazy" onerror="this.style.display='none'">
            ${caption ? `<figcaption>${caption}</figcaption>` : ''}
          </figure>
        `;
            };

            const origLink = renderer.link;
            renderer.link = function (href, title, text) {
                if (typeof href === 'object') { text = href.text || ''; title = href.title || ''; href = href.href || ''; }
                const ytMatch = href.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
                if (ytMatch) {
                    return `<div class="article-video"><iframe src="https://www.youtube.com/embed/${ytMatch[1]}" frameborder="0" allowfullscreen loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe></div>`;
                }
                const vimeoMatch = href.match(/vimeo\.com\/(\d+)/);
                if (vimeoMatch) {
                    return `<div class="article-video"><iframe src="https://player.vimeo.com/video/${vimeoMatch[1]}" frameborder="0" allowfullscreen loading="lazy"></iframe></div>`;
                }
                const ext = href.startsWith('http');
                return `<a href="${href}" ${ext ? 'target="_blank" rel="noopener"' : ''} ${title ? `title="${title}"` : ''}>${text}</a>`;
            };

            marked.setOptions({ renderer, breaks: true });
            const htmlContent = marked.parse(mdText);

            // Set metadata
            const titleEl = document.getElementById('articleTitle');
            const categoryEl = document.getElementById('articleCategory');
            const metaEl = document.getElementById('articleMeta');
            const coverEl = document.getElementById('articleCover');

            if (article) {
                const dateStr = new Date(article.date).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });
                if (titleEl) titleEl.textContent = article.title;
                if (categoryEl) categoryEl.textContent = article.category;
                if (metaEl) metaEl.innerHTML = `
          <span><i class="fas fa-user"></i> ${article.author}</span>
          <span><i class="fas fa-calendar"></i> ${dateStr}</span>
          <span><i class="fas fa-clock"></i> ${estimateReadTime(mdText)} min de lectura</span>
        `;
                document.title = `${article.title} | PossibilitiesCo Blog`;
                if (coverEl && article.cover_image) {
                    coverEl.src = article.cover_image.startsWith('http') ? article.cover_image : `./articles/images/${article.cover_image}`;
                    coverEl.alt = article.title;
                    coverEl.style.display = 'block';
                }
            }

            articleContent.innerHTML = htmlContent;

        } catch (err) {
            articleContent.innerHTML = '<p style="color:var(--gray-500);">No se pudo cargar el artículo. Intenta de nuevo.</p>';
        }
    }

    function estimateReadTime(text) {
        const words = text.trim().split(/\s+/).length;
        return Math.max(1, Math.ceil(words / 200));
    }

});

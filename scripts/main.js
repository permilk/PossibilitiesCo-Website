/* ═══════════════════════════════════════════════════════
   POSSIBILITIES CO. — Main JavaScript
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    // ── Navbar Scroll Effect ──
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // ── Mobile Menu Toggle ──
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
        // Close on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            });
        });
    }

    // ── Scroll Reveal ──
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
        reveals.forEach(el => revealObserver.observe(el));
    }

    // ── Hero Stat Counter Animation ──
    const statNumbers = document.querySelectorAll('.hero-stat-number');
    if (statNumbers.length > 0) {
        const animateCounter = (el) => {
            const target = parseInt(el.getAttribute('data-count'));
            const duration = 2000;
            const start = performance.now();
            const animate = (now) => {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(eased * target);
                el.textContent = current.toLocaleString() + '+';
                if (progress < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
        };
        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    statObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        statNumbers.forEach(el => statObserver.observe(el));
    }

    // ── Video Player ──
    const playOverlay = document.getElementById('playOverlay');
    const videoModal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const modalClose = document.querySelector('.video-modal-close');

    if (playOverlay && videoModal && modalVideo) {
        playOverlay.addEventListener('click', () => {
            videoModal.classList.add('active');
            modalVideo.play();
        });
        if (modalClose) {
            modalClose.addEventListener('click', () => {
                videoModal.classList.remove('active');
                modalVideo.pause();
                modalVideo.currentTime = 0;
            });
        }
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                videoModal.classList.remove('active');
                modalVideo.pause();
                modalVideo.currentTime = 0;
            }
        });
    }

    // ── Smooth Scroll for anchor links ──
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                const offset = 70;
                const position = targetEl.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: position, behavior: 'smooth' });
            }
        });
    });

});

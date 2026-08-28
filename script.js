// ==========================================================================
// Jeffry Smith — Portfólio
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Rodapé: ano atual
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Navbar: borda ao rolar
    const navbar = document.getElementById('navbar');
    const onScroll = () => {
        if (window.scrollY > 10) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // Menu mobile
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', String(isOpen));
        });
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Efeito de "digitação" na linha de terminal do hero
    const typedEl = document.getElementById('typedLine');
    if (typedEl) {
        const text = 'whoami';
        let i = 0;
        const type = () => {
            if (i <= text.length) {
                typedEl.textContent = text.slice(0, i);
                i++;
                setTimeout(type, 90);
            }
        };
        type();
    }

    // Animação de entrada ao rolar
    document.querySelectorAll('.section, .cta').forEach(el => {
        el.classList.add('animate-on-scroll');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
});

// Global events (before sections load)
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (navbar) navbar.style.background = window.scrollY > 100 ? 'rgba(10,10,15,0.95)' : 'rgba(10,10,15,0.8)';
        const backToTop = document.getElementById('backToTop');
        if (backToTop) backToTop.classList.toggle('show', window.scrollY > 600);
    });

    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
});

// Called after sections are loaded
function initAfterLoad() {
    // Particles
    const particlesContainer = document.getElementById('heroParticles');
    if (particlesContainer) {
        for (let i = 0; i < 50; i++) {
            const p = document.createElement('div');
            Object.assign(p.style, {
                position: 'absolute', width: '4px', height: '4px',
                background: `rgba(139,92,246,${Math.random() * 0.5 + 0.3})`,
                borderRadius: '50%',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animation: `floatParticle ${Math.random() * 6 + 4}s infinite ease-in-out`
            });
            particlesContainer.appendChild(p);
        }
    }
    if (!document.getElementById('particleKeyframes')) {
        const style = document.createElement('style');
        style.id = 'particleKeyframes';
        style.textContent = `@keyframes floatParticle { 0%,100%{ transform:translateY(0) scale(1); opacity:0.4; } 50%{ transform:translateY(-30px) scale(1.3); opacity:0.8; } }`;
        document.head.appendChild(style);
    }

    // Counters
    const statNumbers = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'));
                if (!target) return;
                let count = 0;
                const increment = target / (2000 / 30);
                const timer = setInterval(() => {
                    count += increment;
                    if (count >= target) { el.textContent = target; clearInterval(timer); }
                    else { el.textContent = Math.floor(count); }
                }, 30);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    statNumbers.forEach(num => counterObserver.observe(num));

    // CTA form
    const ctaForm = document.getElementById('ctaForm');
    if (ctaForm) ctaForm.addEventListener('submit', e => { e.preventDefault(); window.location.href = '404.html'; });

    // Scroll animations
    const animElements = document.querySelectorAll('.anim-fade-up, .anim-fade-in, .anim-slide-left, .anim-slide-right, .anim-scale-up');
    const animObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('anim-visible');
                animObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    animElements.forEach(el => animObserver.observe(el));
}
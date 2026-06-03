document.addEventListener('DOMContentLoaded', async () => {
    const loader = document.getElementById('pageLoader');
    const sections = [
        { id: 'hero-container', file: 'sections/hero.html' },
        { id: 'about-container', file: 'sections/about.html' },
        { id: 'games-container', file: 'sections/games.html' },
        { id: 'features-container', file: 'sections/features.html' },
        { id: 'stats-container', file: 'sections/stats.html' },
        { id: 'team-container', file: 'sections/team.html' },
        { id: 'testimonials-container', file: 'sections/testimonials.html' },
        { id: 'cta-container', file: 'sections/cta.html' },
        { id: 'footer-container', file: 'sections/footer.html' }
    ];

    try {
        const fetchPromises = sections.map(section =>
            fetch(section.file)
                .then(response => response.text())
                .then(html => {
                    document.getElementById(section.id).innerHTML = html;
                })
        );
        await Promise.all(fetchPromises);

        if (loader) setTimeout(() => loader.classList.add('hidden'), 300);

        if (typeof initAfterLoad === 'function') initAfterLoad();
    } catch (error) {
        console.error('Error loading sections:', error);
        if (loader) loader.classList.add('hidden');
    }
});
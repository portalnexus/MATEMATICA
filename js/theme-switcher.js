document.addEventListener('DOMContentLoaded', () => {
    const themeConfigIcon = document.getElementById('theme-config-icon');
    const themeSelectorPanel = document.getElementById('theme-selector-panel');
    const themeButtons = themeSelectorPanel ? themeSelectorPanel.querySelectorAll('button[data-theme]') : [];

    function applyTheme(themeClass) {
        const themeClasses = [
            'theme-default',
            'theme-green-circuit',
            'theme-ocean-depths',
            'theme-royal-evening',
            'theme-sunset-fire',
            'theme-forest-canopy',
            'theme-citrus-grove',
            'theme-toxic-reaction',
            'theme-autumn-crimson',
            'theme-candy-pop',
            'theme-retro-terminal',
            'theme-light-classic-neon-red',
            'theme-blue-matrix',
            'theme-orange-matrix',
            'theme-high-contrast'
        ];

        // Remove todas as classes de tema
        document.body.classList.remove(...themeClasses);

        // Aplica o novo tema imediatamente
        if (themeClass && themeClass !== 'theme-default') {
            document.body.classList.add(themeClass);
        }

        // Salva no localStorage
        localStorage.setItem('selectedTheme', themeClass || 'theme-default');

        // Force reflow para garantir aplicação imediata
        void document.body.offsetHeight;

        console.log('Theme applied:', themeClass || 'theme-default');
    }

    if (themeConfigIcon && themeSelectorPanel) {
        themeConfigIcon.addEventListener('click', (event) => {
            event.stopPropagation();
            themeSelectorPanel.classList.toggle('hidden');
        });

        document.addEventListener('click', (event) => {
            if (!themeSelectorPanel.contains(event.target) &&
                !themeConfigIcon.contains(event.target) &&
                !themeSelectorPanel.classList.contains('hidden')) {
                themeSelectorPanel.classList.add('hidden');
            }
        });

        console.log('Theme switcher UI interaction script initialized.');
    } else {
        if (!themeConfigIcon) console.error('Theme config icon not found.');
        if (!themeSelectorPanel) console.error('Theme selector panel not found.');
        return;
    }

    themeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            const themeClass = event.currentTarget.getAttribute('data-theme');
            applyTheme(themeClass);
            themeSelectorPanel.classList.add('hidden');
        });
    });

    // Aplica tema salvo ou padrão ao carregar
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        applyTheme('theme-default');
    }

    console.log('Theme switcher: Applied theme on load:', localStorage.getItem('selectedTheme'));
});

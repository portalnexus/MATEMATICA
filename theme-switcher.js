document.addEventListener('DOMContentLoaded', () => {
    const themeConfigIcon = document.getElementById('theme-config-icon');
    const themeSelectorPanel = document.getElementById('theme-selector-panel');
    const themeButtons = themeSelectorPanel ? themeSelectorPanel.querySelectorAll('button[data-theme]') : []; 
    function applyTheme(themeClass) {
        const themeClasses = [
            'theme-dracula-orchid', 
            'theme-nordic-dark', 
            'theme-solarized-light', 
            'theme-synthwave-84',
            'theme-atom-one-dark',
            'theme-ocean-depths',    
            'theme-royal-evening',   
            'theme-sunset-fire',    
            'theme-forest-canopy',    
            'theme-citrus-grove',      
            'theme-toxic-reaction',    
            'theme-autumn-crimson',    
            'theme-candy-pop',         
            'theme-digital-blue-green', 
            'theme-retro-terminal', 
            'theme-light-classic-neon-red', 
            'theme-blue-matrix', 
            'theme-orange-matrix'
        ];
        document.body.classList.remove(...themeClasses);
        if (themeClass && themeClass !== 'theme-default') {
            document.body.classList.add(themeClass);
        }
        localStorage.setItem('selectedTheme', themeClass || 'theme-default');
        console.log('Theme applied:', themeClass || 'theme-default');
    }
    if (themeConfigIcon && themeSelectorPanel) {
        themeConfigIcon.addEventListener('click', (event) => {
            event.stopPropagation(); 
            themeSelectorPanel.classList.toggle('hidden');
        });
        document.addEventListener('click', (event) => {
            if (!themeSelectorPanel.contains(event.target) && !themeConfigIcon.contains(event.target) && !themeSelectorPanel.classList.contains('hidden')) {
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
            const themeClass = event.currentTarget.getAttribute('data-theme');
            applyTheme(themeClass);
            themeSelectorPanel.classList.add('hidden');
        });
    });
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        applyTheme('theme-retro-terminal'); 
    }
    console.log('Theme switcher: Applied theme on load:', localStorage.getItem('selectedTheme'));
});
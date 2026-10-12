// theme-switcher.js - Motor Universal de Temas do Portal Nexus
// Suporta 6 temas curados: 4 Dark (com 2 de alto contraste) e 2 Claros

document.addEventListener('DOMContentLoaded', () => {
    // 6 Temas Curados do Portal Nexus
    const THEMES = [
        { id: 'theme-default', name: '🟢 Matrix Cyber', group: 'dark', title: 'Matrix Cyber (Dark Padrão)' },
        { id: 'theme-cyber-blue', name: '🔵 Cyber Blue', group: 'dark', title: 'Cyber Blue (Dark Moderno)' },
        { id: 'theme-high-contrast-green', name: '⚡ OLED Neon Green', group: 'contrast', title: 'OLED Neon Green (Alto Contraste AAA)' },
        { id: 'theme-high-contrast-amber', name: '🟠 OLED Amber', group: 'contrast', title: 'OLED Amber (Alto Contraste VT220 AAA)' },
        { id: 'theme-paper-light', name: '📄 Paper Clean', group: 'light', title: 'Paper Clean (Claro Minimalista)' },
        { id: 'theme-solarized-light', name: '📜 Solarized Sepia', group: 'light', title: 'Solarized Sepia (Claro Pergaminho Quente)' }
    ];

    // Mapeamento de retrocompatibilidade para preferências antigas salvas
    const LEGACY_THEME_MAP = {
        'theme-green-circuit': 'theme-default',
        'theme-ocean-depths': 'theme-cyber-blue',
        'theme-blue-matrix': 'theme-cyber-blue',
        'theme-retro-terminal': 'theme-default',
        'theme-high-contrast': 'theme-high-contrast-green',
        'theme-light-classic-neon-red': 'theme-paper-light',
        'theme-royal-evening': 'theme-cyber-blue',
        'theme-sunset-fire': 'theme-high-contrast-amber',
        'theme-forest-canopy': 'theme-default',
        'theme-citrus-grove': 'theme-cyber-blue',
        'theme-toxic-reaction': 'theme-high-contrast-green',
        'theme-autumn-crimson': 'theme-solarized-light',
        'theme-candy-pop': 'theme-paper-light',
        'theme-orange-matrix': 'theme-high-contrast-amber'
    };

    const ALL_KNOWN_THEME_CLASSES = [
        'theme-default',
        'theme-cyber-blue',
        'theme-high-contrast-green',
        'theme-high-contrast-amber',
        'theme-paper-light',
        'theme-solarized-light',
        // Classes legadas para limpeza
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

    /**
     * Aplica uma classe de tema ao body do documento
     */
    function applyTheme(themeClass) {
        // Converter tema legado se necessário
        if (LEGACY_THEME_MAP[themeClass]) {
            themeClass = LEGACY_THEME_MAP[themeClass];
        }

        // Remover qualquer classe de tema anterior
        document.body.classList.remove(...ALL_KNOWN_THEME_CLASSES);

        // Se for o tema padrão, removemos classes específicas para usar :root
        if (themeClass && themeClass !== 'theme-default') {
            document.body.classList.add(themeClass);
        }

        try {
            localStorage.setItem('selectedTheme', themeClass || 'theme-default');
        } catch (e) {
            console.warn('Theme switcher: localStorage indisponível:', e);
        }

        // Força reflow suave
        void document.body.offsetHeight;

        // Dispara evento customizado para componentes reativos (como gráficos canvas)
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: themeClass || 'theme-default' } }));
    }

    /**
     * Garante a presença do ícone de engrenagem e do painel de seleção na página
     */
    function ensureThemeUI() {
        let themeConfigIcon = document.getElementById('theme-config-icon');
        let themeSelectorPanel = document.getElementById('theme-selector-panel');

        if (!themeConfigIcon) {
            themeConfigIcon = document.createElement('div');
            themeConfigIcon.id = 'theme-config-icon';
            themeConfigIcon.title = 'Configurar Tema';
            themeConfigIcon.textContent = '⚙️';
            document.body.appendChild(themeConfigIcon);
        }

        if (!themeSelectorPanel) {
            themeSelectorPanel = document.createElement('div');
            themeSelectorPanel.id = 'theme-selector-panel';
            themeSelectorPanel.className = 'hidden';
            document.body.appendChild(themeSelectorPanel);
        }

        // Popula o painel com os 6 temas organizados por grupos
        themeSelectorPanel.innerHTML = `
            <h3>Escolha um Tema:</h3>
            <div class="theme-group-label">🌙 MODO ESCURO</div>
            <button data-theme="theme-default" title="Matrix Cyber (Dark Padrão)">🟢 Matrix Cyber</button>
            <button data-theme="theme-cyber-blue" title="Cyber Blue (Dark Moderno)">🔵 Cyber Blue</button>
            <div class="theme-group-label">⚡ ALTO CONTRASTE (AAA)</div>
            <button data-theme="theme-high-contrast-green" title="OLED Neon Green (Alto Contraste AAA)">⚡ OLED Neon Green</button>
            <button data-theme="theme-high-contrast-amber" title="OLED Amber (Fósforo Âmbar VT220 AAA)">🟠 OLED Amber</button>
            <div class="theme-group-label">☀️ MODO CLARO</div>
            <button data-theme="theme-paper-light" title="Paper Clean (Claro Minimalista)">📄 Paper Clean</button>
            <button data-theme="theme-solarized-light" title="Solarized Sepia (Claro Pergaminho Quente)">📜 Solarized Sepia</button>
        `;

        return { themeConfigIcon, themeSelectorPanel };
    }

    const { themeConfigIcon, themeSelectorPanel } = ensureThemeUI();

    // Toggle de visibilidade do painel
    themeConfigIcon.addEventListener('click', (event) => {
        event.stopPropagation();
        themeSelectorPanel.classList.toggle('hidden');
    });

    // Fechar painel ao clicar fora
    document.addEventListener('click', (event) => {
        if (!themeSelectorPanel.contains(event.target) &&
            !themeConfigIcon.contains(event.target) &&
            !themeSelectorPanel.classList.contains('hidden')) {
            themeSelectorPanel.classList.add('hidden');
        }
    });

    // Eventos de clique nos botões de tema
    themeSelectorPanel.querySelectorAll('button[data-theme]').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            const themeClass = event.currentTarget.getAttribute('data-theme');
            applyTheme(themeClass);
            themeSelectorPanel.classList.add('hidden');
        });
    });

    // Aplica tema salvo ou padrão ao carregar
    let initialTheme = 'theme-default';
    try {
        const saved = localStorage.getItem('selectedTheme');
        if (saved) {
            initialTheme = LEGACY_THEME_MAP[saved] || saved;
        }
    } catch (e) {}

    applyTheme(initialTheme);
});

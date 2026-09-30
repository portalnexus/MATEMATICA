// theme-switcher.js - Motor Universal de Temas do Portal Nexus
// Suporta 6 temas curados: Neutro Slate (Padrão), Neutro Claro (Paper), Sépia Acadêmico, Dark Grafite, Alto Contraste AAA e Matrix Retrô

document.addEventListener('DOMContentLoaded', () => {
    // 7 Temas Curados do Portal Nexus
    const THEMES = [
        { id: 'theme-default', name: '🔘 Neutro Slate (Padrão + Matrix)', group: 'standard', title: 'Neutro Slate (Dark Sóbrio com Chuva Matrix)' },
        { id: 'theme-clean-print', name: '🖨️ Limpo & Impressão (Sem Matrix)', group: 'clean', title: 'Formato ultra simples estilo impressão (Fundo Branco, Texto Preto, Sem Matrix)' },
        { id: 'theme-paper-light', name: '☀️ Neutro Claro (Paper + Matrix)', group: 'standard', title: 'Neutro Claro (Minimalista Diurno com Chuva Matrix)' },
        { id: 'theme-solarized-light', name: '📜 Sépia Acadêmico (+ Matrix)', group: 'standard', title: 'Sépia Acadêmico (Pergaminho com Chuva Matrix)' },
        { id: 'theme-dark-graphite', name: '🌑 Dark Grafite (+ Matrix)', group: 'standard', title: 'Dark Grafite (Carvão Minimalista com Chuva Matrix)' },
        { id: 'theme-high-contrast', name: '⚡ Alto Contraste AAA (+ Matrix)', group: 'contrast', title: 'Alto Contraste Preto & Branco (WCAG AAA com Chuva Matrix)' },
        { id: 'theme-matrix-retro', name: '🟢 Matrix Retrô Cyber (+ Matrix)', group: 'retro', title: 'Matrix Cyber Retrô (Terminal Verde com Chuva de Código)' }
    ];

    // Mapeamento de retrocompatibilidade para preferências antigas salvas
    const LEGACY_THEME_MAP = {
        'theme-green-circuit': 'theme-matrix-retro',
        'theme-cyber-blue': 'theme-dark-graphite',
        'theme-high-contrast-green': 'theme-high-contrast',
        'theme-high-contrast-amber': 'theme-high-contrast',
        'theme-ocean-depths': 'theme-default',
        'theme-blue-matrix': 'theme-default',
        'theme-retro-terminal': 'theme-matrix-retro',
        'theme-light-classic-neon-red': 'theme-paper-light',
        'theme-royal-evening': 'theme-default',
        'theme-sunset-fire': 'theme-solarized-light',
        'theme-forest-canopy': 'theme-default',
        'theme-citrus-grove': 'theme-paper-light',
        'theme-toxic-reaction': 'theme-matrix-retro',
        'theme-autumn-crimson': 'theme-solarized-light',
        'theme-candy-pop': 'theme-paper-light',
        'theme-orange-matrix': 'theme-matrix-retro'
    };

    const ALL_KNOWN_THEME_CLASSES = [
        'theme-default',
        'theme-clean-print',
        'theme-paper-light',
        'theme-solarized-light',
        'theme-dark-graphite',
        'theme-high-contrast',
        'theme-matrix-retro',
        // Classes legadas para limpeza
        'theme-cyber-blue',
        'theme-high-contrast-green',
        'theme-high-contrast-amber',
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
        'theme-orange-matrix'
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

        // Popula o painel com os 7 temas organizados por grupos
        themeSelectorPanel.innerHTML = `
            <h3>Escolha um Tema:</h3>
            <div class="theme-group-label">✨ TEMAS COMUNS (COM MATRIX)</div>
            <button data-theme="theme-default" title="Neutro Slate (Dark Sóbrio com Chuva Matrix)">🔘 Neutro Slate (Padrão)</button>
            <button data-theme="theme-paper-light" title="Neutro Claro (Minimalista Diurno com Chuva Matrix)">☀️ Neutro Claro (Paper)</button>
            <button data-theme="theme-solarized-light" title="Sépia Acadêmico (Pergaminho com Chuva Matrix)">📜 Sépia Acadêmico</button>
            <button data-theme="theme-dark-graphite" title="Dark Grafite (Carvão Minimalista com Chuva Matrix)">🌑 Dark Grafite</button>
            <div class="theme-group-label">📄 MODO LIMPO / IMPRESSÃO (SEM MATRIX)</div>
            <button data-theme="theme-clean-print" title="Formato ultra simples estilo impressão: fundo branco, texto preto, sem chuva de matrix">🖨️ Limpo & Impressão (Clean)</button>
            <div class="theme-group-label">♿ ACESSIBILIDADE & RETRÔ</div>
            <button data-theme="theme-high-contrast" title="Alto Contraste Preto & Branco (WCAG AAA com Chuva Matrix)">⚡ Alto Contraste AAA</button>
            <button data-theme="theme-matrix-retro" title="Matrix Cyber Retrô (Terminal Verde com Chuva de Código)">🟢 Matrix Retrô Cyber</button>
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

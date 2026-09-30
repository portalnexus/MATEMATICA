# Agent-Ferramentas: Especialista em Ferramentas e Calculadoras Interativas

## Propósito e Escopo
O **Agent-Ferramentas** é responsável pelo desenvolvimento, modernização e manutenção técnica das aplicações e calculadoras interativas do Portal Nexus (diretório `recursos/ferramentas/`).

### Requisitos Mandatórios de Arquitetura Nexus
1. **Design System & Estética Cyber/Matrix**:
   - Todo arquivo deve importar `../../css/style.css` e utilizar as variáveis CSS de cor.
   - Scripts obrigatórios:
     - `../../js/matrix-rain.js` com `<canvas id="matrixCanvas"></canvas>`
     - `../../js/theme-switcher.js` com o ícone `#theme-config-icon` e painel de temas.
     - KaTeX 0.16.10 para renderização de fórmulas matemáticas e passos intermediários.
2. **Navegação Global Unificada**:
   - Inclusão da `<nav>` padrão:
     ```html
     <nav>
       <ul>
         <li><a href="../../index.html" class="nav-button">INÍCIO</a></li>
         <li><a href="../../recursos.html" class="nav-button active">RECURSOS</a></li>
         <li><a href="../../python.html" class="nav-button">PYTHON</a></li>
         <li><a href="../../dashboard.html" class="nav-button">DASHBOARD</a></li>
       </ul>
     </nav>
     ```
3. **Gráficos e Visualizações Nativas**:
   - Usar **Canvas 2D** ou **SVG dinâmico** inline para renderizar figuras geométricas, gráficos de funções, progressões, histogramas e projeções trigonométricas.
   - Todas as cores dos gráficos devem ler as variáveis CSS calculadas (`getComputedStyle(document.body).getPropertyValue('--link-color')`) para atualizar automaticamente ao trocar de tema.
4. **Resolução Passo a Passo**:
   - Além do resultado numérico final, fornecer demonstrações algébricas detalhadas via KaTeX explicando o caminho pedagógico percorrido.

# Agent-Guias: Desenvolvedor de Guias de Estudos Matemáticos

## Propósito e Escopo

Este agente é especializado em criar **guias de estudos** para o portal educacional Nexus, oferecendo mapas conceituais, roteiros de aprendizagem, estratégias de estudo e conexões interdisciplinares para ajudar estudantes a organizar e aprofundar seu aprendizado matemático.

### Características dos Guias de Estudos

- **Visão panorâmica:** Mapa conceitual do capítulo/unidade
- **Roteiro estruturado:** Sequência lógica de estudo
- **Estratégias pedagógicas:** Técnicas de aprendizagem eficazes
- **Conexões:** Relações entre conceitos e com outras disciplinas
- **Metacognição:** Orientações sobre como estudar, não apenas o que estudar

---

## Inputs Necessários

Ao solicitar um guia de estudos, forneça:

1. **Capítulo/Unidade:** Tema abrangente (ex: "Função Quadrática", "Trigonometria")
2. **Turma:** Ano escolar (9ANO, 1EM, 2EM, 3EM) ou "COMPARTILHADO"
3. **Tópicos incluídos:** Subtópicos que compõem o capítulo
4. **Duração estimada:** Tempo de estudo sugerido (ex: "2 semanas", "1 mês")
5. **Objetivos de aprendizagem:** Competências esperadas ao final

### Exemplo de Input

```
Agente: agent-guias
Capítulo: Função Quadrática
Turma: 1EM
Tópicos: Definição, gráfico (parábola), vértice, raízes, discriminante, inequações, problemas de máximo/mínimo
Duração: 3 semanas
Objetivos: Compreender função quadrática, esboçar gráficos, resolver equações e inequações, aplicar em problemas de otimização
```

---

## Template HTML

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- TÍTULO: Formato "NEXUS - Guia: [Capítulo]" -->
  <title>NEXUS - Guia de Estudos: [CAPÍTULO]</title>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,400;0,700;1,400&family=Press+Start+2P&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.css">
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.js"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/contrib/auto-render.min.js"></script>
  <link rel="stylesheet" href="../../css/style.css">

  <style>
    /* ==========================================================================
       ESTILOS PARA GUIAS DE ESTUDOS
       ========================================================================== */

    /* Banner principal do guia */
    .guia-header {
      background: linear-gradient(135deg, rgba(33, 150, 243, 0.3) 0%, rgba(156, 39, 176, 0.3) 100%);
      border: 2px solid #2196f3;
      border-radius: 12px;
      padding: 2rem;
      margin: 2rem 0;
      text-align: center;
    }

    .guia-header h2 {
      margin-top: 0;
      color: var(--heading-text-color);
    }

    /* Caixa de informações essenciais */
    .info-box {
      background-color: rgba(33, 150, 243, 0.15);
      border-left: 4px solid #2196f3;
      padding: 1rem 1.5rem;
      margin: 1.5rem 0;
      border-radius: 4px;
    }

    .info-box h4 {
      color: #2196f3;
      margin-top: 0;
    }

    /* Mapa conceitual - lista hierárquica */
    .mapa-conceitual {
      background-color: rgba(76, 175, 80, 0.1);
      border: 2px solid #4caf50;
      border-radius: 8px;
      padding: 1.5rem;
      margin: 2rem 0;
    }

    .mapa-conceitual h3 {
      color: #4caf50;
      margin-top: 0;
    }

    .mapa-conceitual ul {
      list-style-type: none;
      padding-left: 0;
    }

    .mapa-conceitual > ul > li {
      margin: 1rem 0;
      padding-left: 1.5rem;
      border-left: 3px solid #4caf50;
    }

    .mapa-conceitual ul ul {
      padding-left: 2rem;
      margin-top: 0.5rem;
    }

    .mapa-conceitual ul ul li {
      margin: 0.5rem 0;
      padding-left: 1rem;
      border-left: 2px solid rgba(76, 175, 80, 0.5);
      list-style-type: circle;
    }

    /* Etapa do roteiro de estudos */
    .etapa-estudo {
      background-color: rgba(255, 152, 0, 0.1);
      border-left: 4px solid #ff9800;
      padding: 1.5rem;
      margin: 1.5rem 0;
      border-radius: 4px;
    }

    .etapa-estudo h4 {
      color: #ff9800;
      margin-top: 0;
    }

    .etapa-numero {
      display: inline-block;
      background-color: #ff9800;
      color: white;
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      text-align: center;
      line-height: 2rem;
      font-weight: bold;
      margin-right: 0.5rem;
    }

    /* Dica de estudo */
    .dica-estudo {
      background-color: rgba(156, 39, 176, 0.15);
      border-left: 4px solid #9c27b0;
      padding: 0.75rem 1rem;
      margin: 1rem 0;
      border-radius: 4px;
    }

    .dica-estudo strong {
      color: #9c27b0;
    }

    /* Estratégia de aprendizagem */
    .estrategia {
      background-color: rgba(33, 150, 243, 0.1);
      border: 2px dashed #2196f3;
      border-radius: 8px;
      padding: 1.5rem;
      margin: 1.5rem 0;
    }

    .estrategia h4 {
      color: #2196f3;
      margin-top: 0;
    }

    /* Conexão interdisciplinar */
    .conexao {
      background-color: rgba(244, 67, 54, 0.1);
      border-left: 4px solid #f44336;
      padding: 1rem 1.5rem;
      margin: 1.5rem 0;
      border-radius: 4px;
    }

    .conexao h5 {
      color: #f44336;
      margin-top: 0;
    }

    /* Checklist de progresso */
    .checklist {
      background-color: rgba(76, 175, 80, 0.1);
      border: 2px solid #4caf50;
      border-radius: 8px;
      padding: 1.5rem;
      margin: 2rem 0;
    }

    .checklist h4 {
      color: #4caf50;
      margin-top: 0;
    }

    .checklist ul {
      list-style-type: none;
      padding-left: 0;
    }

    .checklist li {
      padding: 0.5rem 0;
      padding-left: 2rem;
      position: relative;
    }

    .checklist li::before {
      content: "☐";
      position: absolute;
      left: 0;
      font-size: 1.2rem;
      color: #4caf50;
    }

    /* Recursos adicionais */
    .recursos {
      background-color: rgba(255, 193, 7, 0.1);
      border-left: 4px solid #ffc107;
      padding: 1rem 1.5rem;
      margin: 1.5rem 0;
      border-radius: 4px;
    }

    .recursos h4 {
      color: #ffc107;
      margin-top: 0;
    }

    /* Cronograma de estudos */
    .cronograma {
      background-color: rgba(156, 39, 176, 0.1);
      border: 2px solid #9c27b0;
      border-radius: 8px;
      padding: 1.5rem;
      margin: 2rem 0;
    }

    .cronograma h4 {
      color: #9c27b0;
      margin-top: 0;
    }

    .cronograma table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 1rem;
    }

    .cronograma th,
    .cronograma td {
      border: 1px solid rgba(156, 39, 176, 0.3);
      padding: 0.75rem;
      text-align: left;
    }

    .cronograma th {
      background-color: rgba(156, 39, 176, 0.2);
      color: var(--heading-text-color);
      font-weight: bold;
    }
  </style>
</head>

<body>
<div id="page-wrapper">
  <nav>
    <ul>
      <li><a href="../../index.html">PÁGINA INICIAL</a></li>
      <li><a href="../../recursos.html">RECURSOS</a></li>
      <li><a href="../../dashboard.html">DASHBOARD</a></li>
    </ul>
  </nav>

<div class="container">

<article>
  <!-- =========================================================================
       HEADER DO GUIA
       ========================================================================= -->
  <div class="guia-header">
    <h1>Guia de Estudos: [CAPÍTULO]</h1>
    <p>Organize seu aprendizado e domine os conceitos essenciais</p>
  </div>

  <!-- =========================================================================
       SEÇÃO 1: VISÃO GERAL
       - Duração estimada
       - Objetivos de aprendizagem
       - Pré-requisitos
       - O que você vai aprender
       ========================================================================= -->
  <h2>1. Visão Geral</h2>

  <div class="info-box">
    <h4>📚 Informações Essenciais</h4>
    <p><strong>Duração estimada:</strong> [X semanas/dias]</p>
    <p><strong>Turma:</strong> [ANO]</p>
    <p><strong>Nível de dificuldade:</strong> [Básico/Intermediário/Avançado]</p>
  </div>

  <h3>Objetivos de Aprendizagem</h3>
  <p>Ao final deste capítulo, você será capaz de:</p>
  <ul>
    <li>[Objetivo 1 - verbo de ação + habilidade específica]</li>
    <li>[Objetivo 2]</li>
    <li>[Objetivo 3]</li>
    <li>[Objetivo 4]</li>
    <li>[Objetivo 5]</li>
  </ul>

  <h3>Pré-requisitos</h3>
  <p>Para aproveitar ao máximo este guia, você deve ter conhecimento de:</p>
  <ul>
    <li>[Pré-requisito 1]</li>
    <li>[Pré-requisito 2]</li>
    <li>[Pré-requisito 3]</li>
  </ul>

  <div class="dica-estudo">
    <strong>💡 Dica:</strong> Se você ainda tem dificuldades com os pré-requisitos,
    revise esses tópicos antes de começar. Uma base sólida facilita muito o
    aprendizado de conceitos novos!
  </div>

  <!-- =========================================================================
       SEÇÃO 2: MAPA CONCEITUAL
       - Hierarquia de conceitos
       - Conexões lógicas
       - Estrutura do capítulo
       ========================================================================= -->
  <h2>2. Mapa Conceitual</h2>

  <div class="mapa-conceitual">
    <h3>🗺️ Estrutura de Conceitos</h3>
    <p>Veja como os conceitos deste capítulo se conectam:</p>

    <ul>
      <li><strong>[Conceito Principal 1]</strong>
        <ul>
          <li>[Subconceito 1.1]</li>
          <li>[Subconceito 1.2]</li>
          <li>[Subconceito 1.3]</li>
        </ul>
      </li>

      <li><strong>[Conceito Principal 2]</strong>
        <ul>
          <li>[Subconceito 2.1]</li>
          <li>[Subconceito 2.2]</li>
        </ul>
      </li>

      <li><strong>[Conceito Principal 3]</strong>
        <ul>
          <li>[Subconceito 3.1]</li>
          <li>[Subconceito 3.2]</li>
          <li>[Subconceito 3.3]</li>
        </ul>
      </li>

      <!-- ADICIONE MAIS CONCEITOS CONFORME NECESSÁRIO -->
    </ul>
  </div>

  <!-- =========================================================================
       SEÇÃO 3: ROTEIRO DE ESTUDOS
       - Sequência lógica de aprendizagem
       - Etapas numeradas
       - O que estudar e como estudar
       ========================================================================= -->
  <h2>3. Roteiro de Estudos</h2>

  <p>Siga este roteiro passo a passo para um aprendizado eficaz:</p>

  <!-- ETAPA 1 -->
  <div class="etapa-estudo">
    <h4><span class="etapa-numero">1</span>[Nome da Etapa]</h4>
    <p><strong>Foco:</strong> [Conceito principal desta etapa]</p>

    <p><strong>O que estudar:</strong></p>
    <ul>
      <li>[Tópico 1]</li>
      <li>[Tópico 2]</li>
      <li>[Tópico 3]</li>
    </ul>

    <p><strong>Como estudar:</strong></p>
    <ul>
      <li>[Estratégia 1 - ex: "Leia o resumo teórico sobre..."]</li>
      <li>[Estratégia 2 - ex: "Resolva os exemplos resolvidos passo a passo"]</li>
      <li>[Estratégia 3 - ex: "Pratique com problemas introdutórios"]</li>
    </ul>

    <div class="dica-estudo">
      <strong>💡 Dica de Estudo:</strong> [Dica específica para esta etapa]
    </div>
  </div>

  <!-- ETAPA 2 -->
  <div class="etapa-estudo">
    <h4><span class="etapa-numero">2</span>[Nome da Etapa]</h4>
    <p><strong>Foco:</strong> [Conceito principal desta etapa]</p>

    <p><strong>O que estudar:</strong></p>
    <ul>
      <li>[Tópico 1]</li>
      <li>[Tópico 2]</li>
    </ul>

    <p><strong>Como estudar:</strong></p>
    <ul>
      <li>[Estratégia 1]</li>
      <li>[Estratégia 2]</li>
    </ul>

    <div class="dica-estudo">
      <strong>💡 Dica de Estudo:</strong> [Dica específica]
    </div>
  </div>

  <!-- ADICIONE MAIS 3-5 ETAPAS -->

  <!-- =========================================================================
       SEÇÃO 4: ESTRATÉGIAS DE APRENDIZAGEM
       - Técnicas de estudo eficazes
       - Métodos de resolução de problemas
       - Como se preparar para avaliações
       ========================================================================= -->
  <h2>4. Estratégias de Aprendizagem</h2>

  <div class="estrategia">
    <h4>📝 Técnica: [Nome da Técnica]</h4>
    <p><strong>O que é:</strong> [Descrição da técnica]</p>
    <p><strong>Como usar:</strong> [Passo a passo para aplicar a técnica]</p>
    <p><strong>Quando usar:</strong> [Situações apropriadas]</p>
  </div>

  <div class="estrategia">
    <h4>🔍 Técnica: [Nome da Técnica]</h4>
    <p><strong>O que é:</strong> [Descrição]</p>
    <p><strong>Como usar:</strong> [Aplicação]</p>
    <p><strong>Quando usar:</strong> [Situações]</p>
  </div>

  <!-- ADICIONE MAIS 2-3 ESTRATÉGIAS -->

  <h3>Método de Resolução de Problemas</h3>
  <ol>
    <li><strong>Compreender o problema:</strong> [Orientação]</li>
    <li><strong>Planejar a solução:</strong> [Orientação]</li>
    <li><strong>Executar o plano:</strong> [Orientação]</li>
    <li><strong>Revisar e verificar:</strong> [Orientação]</li>
  </ol>

  <!-- =========================================================================
       SEÇÃO 5: CONEXÕES
       - Relações entre conceitos do capítulo
       - Aplicações em outras disciplinas
       - Contextos da vida real
       ========================================================================= -->
  <h2>5. Conexões</h2>

  <h3>Conexões Internas</h3>
  <p>Como os conceitos deste capítulo se relacionam:</p>
  <ul>
    <li>[Relação 1 - ex: "O discriminante Δ determina quantas raízes a função possui"]</li>
    <li>[Relação 2]</li>
    <li>[Relação 3]</li>
  </ul>

  <h3>Aplicações Interdisciplinares</h3>

  <div class="conexao">
    <h5>🔬 Física</h5>
    <p>[Como este conteúdo aparece em Física - exemplo específico]</p>
  </div>

  <div class="conexao">
    <h5>💰 Economia/Administração</h5>
    <p>[Aplicação em contextos econômicos]</p>
  </div>

  <div class="conexao">
    <h5>🏗️ Engenharia/Arquitetura</h5>
    <p>[Aplicação em contextos de engenharia]</p>
  </div>

  <!-- ADICIONE OUTRAS CONEXÕES RELEVANTES -->

  <h3>Contextos da Vida Real</h3>
  <ul>
    <li>[Aplicação prática 1]</li>
    <li>[Aplicação prática 2]</li>
    <li>[Aplicação prática 3]</li>
  </ul>

  <!-- =========================================================================
       SEÇÃO 6: CRONOGRAMA SUGERIDO
       - Distribuição de tempo
       - Organização semanal
       ========================================================================= -->
  <h2>6. Cronograma Sugerido</h2>

  <div class="cronograma">
    <h4>📅 Plano de Estudo - [Duração Total]</h4>

    <table>
      <thead>
        <tr>
          <th>Período</th>
          <th>Tópicos</th>
          <th>Atividades</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Semana 1</td>
          <td>[Tópicos da semana 1]</td>
          <td>
            - [Atividade 1]<br>
            - [Atividade 2]<br>
            - [Atividade 3]
          </td>
        </tr>
        <tr>
          <td>Semana 2</td>
          <td>[Tópicos da semana 2]</td>
          <td>
            - [Atividade 1]<br>
            - [Atividade 2]<br>
            - [Atividade 3]
          </td>
        </tr>
        <!-- ADICIONE MAIS SEMANAS CONFORME DURAÇÃO -->
      </tbody>
    </table>

    <div class="dica-estudo">
      <strong>💡 Lembre-se:</strong> Este cronograma é uma sugestão. Ajuste conforme
      seu ritmo de aprendizagem e disponibilidade de tempo!
    </div>
  </div>

  <!-- =========================================================================
       SEÇÃO 7: CHECKLIST DE PROGRESSO
       - Avaliação de domínio
       - Autoavaliação
       ========================================================================= -->
  <h2>7. Checklist de Progresso</h2>

  <div class="checklist">
    <h4>✓ Verifique seu domínio dos conceitos:</h4>
    <ul>
      <li>Compreendo a definição de [conceito principal]</li>
      <li>Consigo [habilidade 1]</li>
      <li>Sei resolver problemas sobre [tópico]</li>
      <li>Entendo a relação entre [conceito A] e [conceito B]</li>
      <li>Aplico os conceitos em problemas contextualizados</li>
      <li>Identifico erros comuns e sei como evitá-los</li>
      <li>Consigo explicar os conceitos com minhas próprias palavras</li>
      <!-- ADICIONE MAIS 5-10 ITENS -->
    </ul>
  </div>

  <!-- =========================================================================
       SEÇÃO 8: RECURSOS ADICIONAIS
       - Links internos do Nexus
       - Recursos externos (opcional)
       - Dicas finais
       ========================================================================= -->
  <h2>8. Recursos Adicionais</h2>

  <div class="recursos">
    <h4>📚 Recursos do Nexus</h4>
    <ul>
      <li><strong>Resumo teórico:</strong> [Link para resumo] - Conceitos formais e demonstrações</li>
      <li><strong>Lista de problemas:</strong> [Link para lista] - Pratique com 32+ problemas variados</li>
      <li><strong>Atividade de recuperação:</strong> [Link se disponível] - Reforce conceitos fundamentais</li>
    </ul>
  </div>

  <div class="recursos">
    <h4>🎯 Dicas Finais</h4>
    <ul>
      <li><strong>Pratique regularmente:</strong> [Orientação sobre frequência]</li>
      <li><strong>Não decore, compreenda:</strong> [Orientação sobre compreensão profunda]</li>
      <li><strong>Tire suas dúvidas:</strong> [Orientação sobre buscar ajuda]</li>
      <li><strong>Ensine outra pessoa:</strong> [Orientação sobre aprendizagem ativa]</li>
      <li><strong>Revise periodicamente:</strong> [Orientação sobre revisão espaçada]</li>
    </ul>
  </div>

</article>

<!-- BOTÃO DE RETORNO -->
<div style="text-align: center; margin-top: 30px;">
    <a href="../../recursos.html" class="themed-button" style="font-family: 'Press Start 2P', monospace;">VOLTAR</a>
</div>

</div> <!-- /.container -->
</div> <!-- /#page-wrapper -->

<!-- ============================================================================
     SCRIPTS NECESSÁRIOS - NÃO ALTERAR
     ============================================================================ -->
<canvas id="matrixCanvas"></canvas>
<script src="../../js/matrix-rain.js" defer></script>

<!-- Script para renderização de fórmulas matemáticas com KaTeX -->
<script>
document.addEventListener("DOMContentLoaded", function() {
    renderMathInElement(document.body, {
        delimiters: [
            {left: "@@", right: "@@", display: true},
            {left: "\\[", right: "\\]", display: true},
            {left: "@", right: "@", display: false},
            {left: "\\(", right: "\\)", display: false}
        ],
        throwOnError: false
    });
});
</script>

<!-- Seletor de temas -->
<div id="theme-config-icon" title="Configurar Tema">⚙️</div>
<div id="theme-selector-panel" class="hidden">
    <h3>Escolha um Tema:</h3>
    <button data-theme="theme-default" title="Tema Padrão">Default</button>
    <button data-theme="theme-green-circuit" title="Tema Green Circuit">Green Circuit</button>
    <button data-theme="theme-ocean-depths" title="Tema Ocean Depths">Ocean Depths</button>
    <button data-theme="theme-royal-evening" title="Tema Royal Evening">Royal Evening</button>
    <button data-theme="theme-sunset-fire" title="Tema Sunset Fire">Sunset Fire</button>
    <button data-theme="theme-forest-canopy" title="Tema Forest Canopy">Forest Canopy</button>
    <button data-theme="theme-citrus-grove" title="Tema Citrus Grove">Citrus Grove</button>
    <button data-theme="theme-toxic-reaction" title="Tema Toxic Reaction">Toxic Reaction</button>
    <button data-theme="theme-autumn-crimson" title="Tema Autumn Crimson">Autumn Crimson</button>
    <button data-theme="theme-candy-pop" title="Tema Candy Pop">Candy Pop</button>
    <button data-theme="theme-orange-matrix" title="Tema Orange Matrix">Orange Matrix</button>
    <button data-theme="theme-blue-matrix" title="Tema Blue Matrix">Blue Matrix</button>
    <button data-theme="theme-retro-terminal" title="Tema Retro Terminal">Retro Terminal</button>
    <button data-theme="theme-light-classic-neon-red" title="Tema Light Red">Light Red</button>
</div>
<script src="../../js/theme-switcher.js" defer></script>
<script src="../../js/print-mode.js" defer></script>
</body>
</html>
```

---

## Regras de Qualidade

### 1. Estrutura do Guia de Estudos

**Seções obrigatórias:**

| Seção | Conteúdo | Propósito |
|-------|----------|-----------|
| **1. Visão Geral** | Objetivos, pré-requisitos, duração | Contextualizar o aprendizado |
| **2. Mapa Conceitual** | Hierarquia de conceitos | Visualizar estrutura lógica |
| **3. Roteiro de Estudos** | 5-7 etapas sequenciais | Guiar progressão de estudo |
| **4. Estratégias** | 3-5 técnicas de aprendizagem | Ensinar como estudar |
| **5. Conexões** | Relações internas + interdisciplinares | Contextualizar conhecimento |
| **6. Cronograma** | Distribuição temporal | Organizar tempo de estudo |
| **7. Checklist** | 10-15 itens de verificação | Autoavaliação de domínio |
| **8. Recursos** | Links e dicas finais | Aprofundamento |

### 2. Visão Geral (Seção 1)

✅ **DEVE INCLUIR:**
- Duração estimada do estudo
- Objetivos de aprendizagem (5-7 objetivos com verbos de ação)
- Pré-requisitos necessários (3-5 itens)
- Nível de dificuldade

**Objetivos de aprendizagem - Verbos de ação apropriados:**
- **Conhecimento:** Identificar, listar, definir, reconhecer
- **Compreensão:** Explicar, descrever, interpretar, resumir
- **Aplicação:** Aplicar, resolver, calcular, demonstrar
- **Análise:** Analisar, comparar, distinguir, investigar
- **Síntese:** Construir, desenvolver, criar, formular
- **Avaliação:** Avaliar, justificar, verificar, criticar

**Exemplo de objetivo bem formulado:**
✅ "Aplicar a fórmula de Bhaskara para resolver equações do 2º grau em contextos diversos"
❌ "Saber sobre Bhaskara" (vago, sem verbo de ação)

### 3. Mapa Conceitual (Seção 2)

O mapa conceitual deve:

- **Organizar hierarquicamente** os conceitos (principal → secundário → terciário)
- **Mostrar conexões lógicas** entre tópicos
- **Usar formatação visual** para facilitar compreensão
- **Incluir 3-5 conceitos principais** com subconceitos

**Exemplo de estrutura:**

```html
<div class="mapa-conceitual">
  <h3>🗺️ Estrutura de Conceitos</h3>
  <ul>
    <li><strong>Função Quadrática</strong>
      <ul>
        <li>Definição: @f(x) = ax^2 + bx + c@</li>
        <li>Coeficientes @a@, @b@, @c@ e seus significados</li>
      </ul>
    </li>

    <li><strong>Gráfico (Parábola)</strong>
      <ul>
        <li>Concavidade (determinada por @a@)</li>
        <li>Vértice</li>
        <li>Eixo de simetria</li>
        <li>Interseção com eixos</li>
      </ul>
    </li>

    <li><strong>Raízes</strong>
      <ul>
        <li>Discriminante @\Delta@</li>
        <li>Fórmula de Bhaskara</li>
        <li>Relações de Viète</li>
      </ul>
    </li>
  </ul>
</div>
```

### 4. Roteiro de Estudos (Seção 3)

**Estrutura de cada etapa:**

```html
<div class="etapa-estudo">
  <h4><span class="etapa-numero">X</span>[Nome da Etapa]</h4>
  <p><strong>Foco:</strong> [Conceito principal]</p>

  <p><strong>O que estudar:</strong></p>
  <ul>
    <li>[Tópico específico 1]</li>
    <li>[Tópico específico 2]</li>
  </ul>

  <p><strong>Como estudar:</strong></p>
  <ul>
    <li>[Ação concreta 1 - ex: "Leia o resumo sobre..."]</li>
    <li>[Ação concreta 2 - ex: "Resolva problemas 1-5 da lista"]</li>
    <li>[Ação concreta 3 - ex: "Faça resumo próprio dos conceitos"]</li>
  </ul>

  <div class="dica-estudo">
    <strong>💡 Dica de Estudo:</strong> [Orientação específica]
  </div>
</div>
```

**Número de etapas:** 5-7 etapas progressivas

**Características das etapas:**
- Sequência lógica (do básico ao avançado)
- Ações concretas ("Leia...", "Resolva...", "Pratique...")
- Integração de teoria e prática
- Tempo estimado por etapa (opcional)

### 5. Estratégias de Aprendizagem (Seção 4)

**Inclua 3-5 estratégias** de diferentes tipos:

1. **Estratégias de compreensão conceitual**
   - Mapas mentais
   - Resumos próprios
   - Explicar para outra pessoa

2. **Estratégias de resolução de problemas**
   - Método de Polya (4 passos)
   - Trabalho reverso (partir da resposta)
   - Casos particulares primeiro

3. **Estratégias de memorização**
   - Flashcards
   - Mnemônicos
   - Repetição espaçada

4. **Estratégias metacognitivas**
   - Autoexplicação
   - Monitoramento de compreensão
   - Identificação de padrões de erro

**Formato de cada estratégia:**

```html
<div class="estrategia">
  <h4>📝 Técnica: [Nome]</h4>
  <p><strong>O que é:</strong> [Descrição breve]</p>
  <p><strong>Como usar:</strong> [Passo a passo prático]</p>
  <p><strong>Quando usar:</strong> [Situações apropriadas]</p>
</div>
```

**Exemplo prático:**

```html
<div class="estrategia">
  <h4>📝 Técnica: Autoexplicação</h4>
  <p><strong>O que é:</strong> Explicar em voz alta (ou por escrito) cada passo
     da resolução de um problema, justificando suas escolhas.</p>
  <p><strong>Como usar:</strong> Ao resolver um problema, pare após cada passo e
     se pergunte: "Por que fiz isso?", "Que conceito estou aplicando?",
     "Faz sentido?". Responda essas perguntas em voz alta.</p>
  <p><strong>Quando usar:</strong> Ideal para problemas complexos ou quando você
     erra um problema e quer entender por quê.</p>
</div>
```

### 6. Conexões (Seção 5)

**Três tipos de conexões:**

1. **Conexões Internas** (dentro do capítulo)
   - Como conceitos se relacionam
   - Pré-requisitos para conceitos avançados
   - Implicações lógicas

2. **Conexões Interdisciplinares**
   - Física, Química, Biologia
   - Economia, Administração
   - Engenharia, Arquitetura
   - Geografia, Ciências Sociais

3. **Aplicações Práticas**
   - Vida cotidiana
   - Problemas reais
   - Profissões que usam o conceito

**Formato de conexão interdisciplinar:**

```html
<div class="conexao">
  <h5>🔬 [Disciplina]</h5>
  <p>[Descrição específica de como o conteúdo matemático aparece nesta área,
     com exemplo concreto]</p>
</div>
```

**Exemplo:**

```html
<div class="conexao">
  <h5>🔬 Física - Movimento Uniformemente Variado</h5>
  <p>A função horária da posição no MUV é uma função quadrática:
     @s(t) = s_0 + v_0 t + \frac{at^2}{2}@. O vértice da parábola representa
     o ponto de inversão do movimento (altura máxima de um projétil, por exemplo).
  </p>
</div>
```

### 7. Cronograma Sugerido (Seção 6)

Use **tabela HTML** para organizar:

```html
<div class="cronograma">
  <h4>📅 Plano de Estudo - [Duração]</h4>
  <table>
    <thead>
      <tr>
        <th>Período</th>
        <th>Tópicos</th>
        <th>Atividades</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Semana 1</td>
        <td>Definição, coeficientes, gráfico básico</td>
        <td>
          - Ler resumo teórico (Seções 1-2)<br>
          - Resolver exemplos resolvidos 1-4<br>
          - Praticar problemas introdutórios 1-10
        </td>
      </tr>
      <!-- Mais linhas -->
    </tbody>
  </table>
</div>
```

**Duração típica por capítulo:**
- Conceitos básicos: 1-2 semanas
- Conceitos intermediários: 2-3 semanas
- Conceitos avançados: 3-4 semanas

### 8. Checklist de Progresso (Seção 7)

**10-15 itens verificáveis** que cobrem:

- Compreensão conceitual (3-4 itens)
- Habilidades procedimentais (3-4 itens)
- Aplicação em problemas (2-3 itens)
- Conexões e relações (2-3 itens)
- Metacognição (1-2 itens)

**Formato:**

```html
<div class="checklist">
  <h4>✓ Verifique seu domínio dos conceitos:</h4>
  <ul>
    <li>Compreendo a definição formal de função quadrática</li>
    <li>Sei identificar os coeficientes @a@, @b@, @c@ e seus significados</li>
    <li>Consigo calcular o vértice da parábola</li>
    <li>Sei usar a fórmula de Bhaskara para encontrar raízes</li>
    <li>Entendo o significado do discriminante @\Delta@</li>
    <li>Esboço gráficos de funções quadráticas corretamente</li>
    <li>Resolvo problemas de máximos e mínimos</li>
    <li>Aplico conceitos em problemas contextualizados</li>
    <li>Identifico a relação entre discriminante e número de raízes</li>
    <li>Consigo explicar os conceitos com minhas próprias palavras</li>
  </ul>
</div>
```

### 9. Recursos Adicionais (Seção 8)

**Inclua:**

1. **Links internos do Nexus**
   - Resumo teórico do tópico
   - Lista de problemas
   - Atividade de recuperação (se disponível)

2. **Dicas finais** (5-7 dicas práticas)
   - Prática regular
   - Compreensão > decoreba
   - Tirar dúvidas
   - Ensinar outros
   - Revisão espaçada

**Formato:**

```html
<div class="recursos">
  <h4>📚 Recursos do Nexus</h4>
  <ul>
    <li><strong>Resumo teórico:</strong> <a href="[caminho]">[Nome]</a> - [Descrição]</li>
    <li><strong>Lista de problemas:</strong> <a href="[caminho]">[Nome]</a> - [Descrição]</li>
  </ul>
</div>

<div class="recursos">
  <h4>🎯 Dicas Finais</h4>
  <ul>
    <li><strong>Pratique regularmente:</strong> [Orientação específica]</li>
    <li><strong>Não decore, compreenda:</strong> [Orientação]</li>
    <!-- Mais dicas -->
  </ul>
</div>
```

---

## Exemplo de Uso

### Solicitação

```
Agente: agent-guias
Capítulo: Trigonometria no Triângulo Retângulo
Turma: 9ANO
Tópicos: Definições de seno, cosseno e tangente; relações métricas; ângulos notáveis (30°, 45°, 60°); aplicações práticas
Duração: 3 semanas
Objetivos: Compreender razões trigonométricas, calcular seno/cosseno/tangente, resolver problemas de altura e distância, aplicar em contextos reais
```

### Output Esperado

`9ANO-GUIA-TRIGONOMETRIA.html` contendo:

**1. Visão Geral:**
- Duração: 3 semanas
- Objetivos: 6 objetivos com verbos de ação
- Pré-requisitos: Teorema de Pitágoras, semelhança de triângulos, razões e proporções

**2. Mapa Conceitual:**
- Triângulo Retângulo (catetos, hipotenusa, ângulos)
- Razões Trigonométricas (seno, cosseno, tangente)
- Ângulos Notáveis (30°, 45°, 60°)
- Aplicações (altura, distância, inclinação)

**3. Roteiro - 6 Etapas:**
1. Revisão de triângulos retângulos
2. Definições de seno, cosseno, tangente
3. Cálculo de razões trigonométricas
4. Ângulos notáveis e valores especiais
5. Problemas de aplicação
6. Consolidação e revisão

**4. Estratégias:**
- Mnemônico SOH-CAH-TOA
- Desenho de triângulos para visualização
- Prática com calculadora
- Resolução reversa (dado seno, achar ângulo)

**5. Conexões:**
- Física: Decomposição de vetores
- Geografia: Cálculo de declividades
- Engenharia: Rampas de acessibilidade
- Navegação: Determinação de distâncias

**6. Cronograma:**
- Semana 1: Definições e conceitos básicos
- Semana 2: Ângulos notáveis e aplicações
- Semana 3: Problemas complexos e revisão

**7. Checklist:**
12 itens cobrindo compreensão, cálculo e aplicação

**8. Recursos:**
Links para resumo, lista de problemas, dicas de estudo

---

## Checklist de Validação

### Estrutura HTML
- [ ] Meta charset UTF-8 e viewport
- [ ] Título: "NEXUS - Guia de Estudos: [Capítulo]"
- [ ] Links CSS/JS corretos
- [ ] KaTeX incluído
- [ ] Navegação completa
- [ ] Seletor de temas (14 temas)
- [ ] Estilos CSS inline incluídos
- [ ] Botão "VOLTAR"

### Seções Obrigatórias
- [ ] 1. Visão Geral completa
- [ ] 2. Mapa Conceitual estruturado
- [ ] 3. Roteiro de Estudos (5-7 etapas)
- [ ] 4. Estratégias de Aprendizagem (3-5)
- [ ] 5. Conexões (internas + interdisciplinares)
- [ ] 6. Cronograma Sugerido
- [ ] 7. Checklist de Progresso (10-15 itens)
- [ ] 8. Recursos Adicionais

### Visão Geral
- [ ] Duração estimada declarada
- [ ] 5-7 objetivos com verbos de ação
- [ ] 3-5 pré-requisitos listados
- [ ] Nível de dificuldade indicado

### Mapa Conceitual
- [ ] 3-5 conceitos principais
- [ ] Subconceitos organizados hierarquicamente
- [ ] Estrutura visual clara (`.mapa-conceitual`)
- [ ] Uso de LaTeX quando apropriado

### Roteiro de Estudos
- [ ] 5-7 etapas numeradas
- [ ] Cada etapa tem "Foco", "O que estudar", "Como estudar"
- [ ] Ações concretas e específicas
- [ ] Dica de estudo em cada etapa
- [ ] Sequência lógica de progressão

### Estratégias
- [ ] 3-5 estratégias diferentes
- [ ] Cada uma tem "O que é", "Como usar", "Quando usar"
- [ ] Variedade de tipos (compreensão, resolução, memorização, metacognição)
- [ ] Método de resolução de problemas incluído

### Conexões
- [ ] Conexões internas explicadas
- [ ] 3-5 conexões interdisciplinares
- [ ] Aplicações práticas listadas
- [ ] Exemplos concretos fornecidos

### Cronograma
- [ ] Tabela HTML bem formatada
- [ ] Colunas: Período, Tópicos, Atividades
- [ ] Distribuição coerente com duração total
- [ ] Atividades específicas e concretas

### Checklist
- [ ] 10-15 itens verificáveis
- [ ] Cobre diferentes aspectos (conceitual, procedimental, aplicação)
- [ ] Linguagem clara ("Consigo...", "Sei...", "Compreendo...")
- [ ] Formatação correta (`.checklist`)

### Recursos
- [ ] Links internos do Nexus
- [ ] 5-7 dicas finais práticas
- [ ] Orientação sobre próximos passos

### Classes CSS
- [ ] `.guia-header` usada
- [ ] `.info-box` usada
- [ ] `.mapa-conceitual` usada
- [ ] `.etapa-estudo` com `.etapa-numero` usada
- [ ] `.dica-estudo` usada
- [ ] `.estrategia` usada
- [ ] `.conexao` usada
- [ ] `.cronograma` usada
- [ ] `.checklist` usada
- [ ] `.recursos` usada

### Qualidade do Conteúdo
- [ ] Linguagem clara e acessível
- [ ] Orientações práticas e acionáveis
- [ ] Progressão lógica de tópicos
- [ ] Integração de teoria e prática
- [ ] Foco em metacognição ("como estudar")
- [ ] LaTeX renderiza corretamente

---

## Observações Finais

### Filosofia dos Guias de Estudos

Um guia eficaz deve:

1. **Organizar o caos:** Transformar conteúdo extenso em roteiro claro
2. **Ensinar a estudar:** Não apenas "o que", mas "como" aprender
3. **Conectar conhecimentos:** Mostrar relações e aplicações
4. **Promover autonomia:** Capacitar o estudante a gerenciar seu próprio aprendizado
5. **Ser realista:** Cronogramas e expectativas adequadas ao nível

### Diferença entre Guia e Resumo

| Aspecto | Resumo | Guia de Estudos |
|---------|--------|-----------------|
| **Foco** | Conteúdo matemático | Processo de aprendizagem |
| **Estrutura** | Definições → Teoremas → Exemplos | Visão Geral → Roteiro → Estratégias |
| **Objetivo** | Apresentar conceitos | Orientar como aprender |
| **Tom** | Formal acadêmico | Orientador metacognitivo |
| **Exemplos** | Resolvidos detalhadamente | Referenciados em roteiro |
| **Avaliação** | Exercícios | Checklist de domínio |

### Boas Práticas

✅ **FAÇA:**
- Use linguagem de orientação ("Comece por...", "Em seguida...")
- Seja específico nas ações ("Resolva problemas 1-10" vs "Pratique")
- Conecte tópicos explicitamente ("Agora que você domina X, pode aprender Y")
- Forneça estimativas de tempo realistas
- Incentive metacognição ("Pergunte-se: Entendi por quê?")

❌ **NÃO FAÇA:**
- Ser vago ("Estude função quadrática")
- Assumir que estudante sabe como estudar
- Sobrecarregar com informação
- Omitir conexões com aplicações práticas
- Esquecer que cada estudante tem ritmo próprio

### Personalização

Lembre aos estudantes que:
- O cronograma é sugestão, não regra rígida
- Podem pular etapas se já dominam conceitos
- Podem dedicar mais tempo a tópicos difíceis
- Devem ajustar estratégias ao seu estilo de aprendizagem

---

**Versão:** 1.0
**Última atualização:** 2025-10-02
**Projeto:** Nexus - Portal Educacional de Matemática

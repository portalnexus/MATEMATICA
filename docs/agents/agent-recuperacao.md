# Agent-Recuperacao: Criador de Atividades de Recuperação Matemática

## Propósito e Escopo

Este agente é especializado em criar **atividades de recuperação** para o portal educacional Nexus, focadas em reforçar conceitos fundamentais e desenvolver autonomia nos estudantes através de scaffolding pedagógico (apoio gradual).

### Características das Atividades de Recuperação

- **Foco em conceitos fundamentais:** Retorno aos pré-requisitos essenciais
- **Scaffolding pedagógico:** Apoio gradual com dicas, exemplos e passos intermediários
- **Progressão incremental:** 15-20 problemas do muito básico ao adequado
- **Diagnóstico e remediação:** Identifica e trabalha lacunas específicas
- **Autonomia crescente:** Dicas abundantes no início, reduzindo gradualmente

---

## Inputs Necessários

Ao solicitar uma atividade de recuperação, forneça:

1. **Tópico principal:** Tema em que o estudante apresenta dificuldades
2. **Turma:** Ano escolar (9ANO, 1EM, 2EM, 3EM)
3. **Tópicos deficitários:** Conceitos específicos que precisam ser reforçados
4. **Diagnóstico:** Tipos de erros comuns observados (opcional)
5. **Pré-requisitos a reforçar:** Conhecimentos básicos a revisar

### Exemplo de Input

```
Agente: agent-recuperacao
Tópico: Função Quadrática
Turma: 1EM
Tópicos deficitários: Vértice da parábola, raízes, análise de sinais
Diagnóstico: Confusão com fórmulas, dificuldade em interpretar gráficos
Pré-requisitos: Equação do 2º grau, produtos notáveis, plano cartesiano
```

---

## Template HTML

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- TÍTULO: Formato "NEXUS - Recuperação: [Tópico]" -->
  <title>NEXUS - Recuperação: [TÓPICO]</title>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,400;0,700;1,400&family=Press+Start+2P&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.css">
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.js"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/contrib/auto-render.min.js"></script>
  <link rel="stylesheet" href="../../css/style.css">

  <style>
    /* ==========================================================================
       ESTILOS PARA ATIVIDADES DE RECUPERAÇÃO
       ========================================================================== */

    /* Banner de orientação inicial */
    .orientacao-inicial {
      background-color: rgba(33, 150, 243, 0.2);
      border: 2px solid #2196f3;
      border-radius: 8px;
      padding: 1.5rem;
      margin: 2rem 0;
    }

    .orientacao-inicial h3 {
      color: #2196f3;
      margin-top: 0;
    }

    /* Container de metadados dos problemas */
    .problema-meta {
      font-size: 0.75rem;
      color: var(--secondary-text-color);
      margin-bottom: 0.5rem;
      font-family: 'Fira Sans', sans-serif;
    }

    /* Níveis de apoio */
    .problema-meta .nivel-apoio {
      background-color: rgba(76, 175, 80, 0.3);
      padding: 2px 6px;
      border-radius: 3px;
      margin-right: 8px;
    }

    .nivel-apoio.alto { background-color: rgba(76, 175, 80, 0.4); }
    .nivel-apoio.medio { background-color: rgba(255, 193, 7, 0.3); }
    .nivel-apoio.baixo { background-color: rgba(244, 67, 54, 0.2); }

    /* Dicas pedagógicas */
    .dica {
      background-color: rgba(33, 150, 243, 0.15);
      border-left: 4px solid #2196f3;
      padding: 0.75rem 1rem;
      margin: 1rem 0;
      font-size: 0.9rem;
      border-radius: 4px;
    }

    .dica strong {
      color: #2196f3;
    }

    /* Exemplo passo a passo */
    .exemplo-passo-a-passo {
      background-color: rgba(76, 175, 80, 0.1);
      border-left: 4px solid #4caf50;
      padding: 1rem 1.5rem;
      margin: 1.5rem 0;
      border-radius: 4px;
    }

    .exemplo-passo-a-passo h4 {
      color: #4caf50;
      margin-top: 0;
    }

    .passo {
      margin: 1rem 0;
      padding-left: 1.5rem;
      border-left: 2px solid #4caf50;
    }

    /* Lembrete importante */
    .lembrete {
      background-color: rgba(255, 152, 0, 0.15);
      border-left: 4px solid #ff9800;
      padding: 0.75rem 1rem;
      margin: 1rem 0;
      border-radius: 4px;
    }

    .lembrete strong {
      color: #ff9800;
    }

    /* Quadro de conceito básico */
    .conceito-basico {
      background-color: rgba(156, 39, 176, 0.1);
      border: 2px solid #9c27b0;
      border-radius: 6px;
      padding: 1rem 1.5rem;
      margin: 1.5rem 0;
    }

    .conceito-basico h4 {
      color: #9c27b0;
      margin-top: 0;
    }

    /* Seção de introdução */
    .section-intro {
      font-style: italic;
      color: var(--secondary-text-color);
      margin-bottom: 1.5rem;
      padding-left: 1rem;
      border-left: 3px solid var(--link-color);
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

<!-- ============================================================================
     TÍTULO E ORIENTAÇÕES INICIAIS
     ============================================================================ -->
<article>
  <h1>Recuperação: [TÓPICO]</h1>

  <div class="orientacao-inicial">
    <h3>📚 Como usar esta atividade de recuperação</h3>
    <p>Esta atividade foi criada para ajudar você a reforçar conceitos fundamentais de <strong>[tópico]</strong>. Siga estas orientações:</p>
    <ul>
      <li><strong>Não tenha pressa:</strong> Trabalhe com calma, entendendo cada passo.</li>
      <li><strong>Use as dicas:</strong> Elas estão aqui para orientar seu raciocínio.</li>
      <li><strong>Revise os conceitos básicos:</strong> Releia as definições e exemplos quando necessário.</li>
      <li><strong>Faça anotações:</strong> Registre suas dúvidas e estratégias.</li>
      <li><strong>Progressão gradual:</strong> Os problemas vão ficando menos apoiados à medida que você avança.</li>
    </ul>
  </div>

  <!-- =========================================================================
       SEÇÃO 0: REVISÃO DE CONCEITOS BÁSICOS
       - Relembrar pré-requisitos essenciais
       - Definições fundamentais
       - Exemplos muito simples
       ========================================================================= -->
  <h2>Revisão de Conceitos Básicos</h2>

  <div class="conceito-basico">
    <h4>Conceito 1: [Nome do Conceito Básico]</h4>
    <p>[Explicação clara e simples com exemplo]</p>
    @@
    [fórmula ou exemplo matemático]
    @@
  </div>

  <div class="conceito-basico">
    <h4>Conceito 2: [Nome do Conceito Básico]</h4>
    <p>[Explicação clara e simples com exemplo]</p>
    @@
    [fórmula ou exemplo matemático]
    @@
  </div>

  <!-- ADICIONE MAIS 2-3 CONCEITOS BÁSICOS CONFORME NECESSÁRIO -->

  <!-- =========================================================================
       SEÇÃO 1: PRIMEIROS PASSOS (Alto Apoio)
       - 4-6 problemas com scaffolding máximo
       - Exemplos resolvidos passo a passo
       - Dicas abundantes
       - Problemas muito básicos e diretos
       ========================================================================= -->
  <h2>Parte 1: Primeiros Passos</h2>
  <p class="section-intro">
    Problemas básicos com bastante orientação para você começar a praticar.
  </p>

  <!-- EXEMPLO RESOLVIDO PASSO A PASSO -->
  <div class="exemplo-passo-a-passo">
    <h4>Exemplo Resolvido: [Título]</h4>
    <p><strong>Problema:</strong> [Enunciado do exemplo]</p>

    <div class="passo">
      <p><strong>Passo 1:</strong> [Primeira etapa da resolução]</p>
      @@
      [cálculo matemático]
      @@
    </div>

    <div class="passo">
      <p><strong>Passo 2:</strong> [Segunda etapa da resolução]</p>
      @@
      [cálculo matemático]
      @@
    </div>

    <div class="passo">
      <p><strong>Passo 3:</strong> [Etapa final]</p>
      @@
      [cálculo matemático]
      @@
      <p><strong>Resposta:</strong> [Resposta final]</p>
    </div>
  </div>

  <ol>
    <!-- PROBLEMA 1 COM ALTO APOIO -->
    <li>
      <div class="problema-meta">
        <span class="nivel-apoio alto">Alto apoio</span>
        <span>⏱️ 4 min</span>
      </div>

      <p>[Enunciado muito simples e direto]</p>

      <div class="dica">
        <strong>Dica 1:</strong> [Primeira orientação]
      </div>

      <div class="dica">
        <strong>Dica 2:</strong> [Segunda orientação específica]
      </div>

      <div class="lembrete">
        <strong>Lembre-se:</strong> [Conceito fundamental a aplicar]
      </div>
    </li>

    <!-- ADICIONE MAIS 3-5 PROBLEMAS COM ALTO APOIO -->

  </ol>

  <!-- =========================================================================
       SEÇÃO 2: DESENVOLVENDO AUTONOMIA (Apoio Médio)
       - 6-8 problemas com scaffolding moderado
       - Menos dicas, mas ainda presentes
       - Complexidade ligeiramente maior
       ========================================================================= -->
  <h2>Parte 2: Desenvolvendo Autonomia</h2>
  <p class="section-intro">
    Agora você terá menos orientações. Tente resolver antes de olhar as dicas!
  </p>

  <ol>
    <!-- PROBLEMA COM APOIO MÉDIO -->
    <li>
      <div class="problema-meta">
        <span class="nivel-apoio medio">Apoio médio</span>
        <span>⏱️ 5 min</span>
      </div>

      <p>[Enunciado com complexidade moderada]</p>

      <div class="dica">
        <strong>Dica:</strong> [Uma dica estratégica, não passo a passo]
      </div>
    </li>

    <!-- ADICIONE MAIS 5-7 PROBLEMAS COM APOIO MÉDIO -->

  </ol>

  <!-- =========================================================================
       SEÇÃO 3: CONSOLIDAÇÃO (Baixo Apoio)
       - 5-6 problemas com scaffolding mínimo
       - Poucas ou nenhuma dica
       - Complexidade apropriada ao nível
       ========================================================================= -->
  <h2>Parte 3: Consolidação</h2>
  <p class="section-intro">
    Problemas finais para você aplicar o que aprendeu de forma mais independente.
  </p>

  <ol>
    <!-- PROBLEMA COM BAIXO APOIO -->
    <li>
      <div class="problema-meta">
        <span class="nivel-apoio baixo">Baixo apoio</span>
        <span>⏱️ 6 min</span>
      </div>

      <p>[Enunciado com complexidade apropriada, pouca ou nenhuma dica]</p>

      <!-- Dica opcional, apenas se absolutamente necessária -->
    </li>

    <!-- ADICIONE MAIS 4-5 PROBLEMAS COM BAIXO APOIO -->

  </ol>

  <!-- =========================================================================
       SEÇÃO 4: AUTOAVALIAÇÃO
       - Checklist de conceitos dominados
       - Identificação de dúvidas remanescentes
       ========================================================================= -->
  <h2>Autoavaliação</h2>

  <div class="conceito-basico">
    <h4>Verifique seu aprendizado:</h4>
    <p>Após completar esta atividade, você deve ser capaz de:</p>
    <ul>
      <li>[ ] [Habilidade 1 esperada]</li>
      <li>[ ] [Habilidade 2 esperada]</li>
      <li>[ ] [Habilidade 3 esperada]</li>
      <li>[ ] [Habilidade 4 esperada]</li>
      <li>[ ] [Habilidade 5 esperada]</li>
    </ul>

    <p><strong>Se você marcou todos os itens:</strong> Parabéns! Você está pronto para avançar.</p>
    <p><strong>Se ainda há dúvidas:</strong> Revise os conceitos básicos e refaça os problemas com dificuldade.</p>
  </div>

</article>

<!-- GABARITO EM COMENTÁRIO HTML -->
<!--
GABARITO:

PARTE 1: PRIMEIROS PASSOS
1. [Solução detalhada passo a passo]
   Resposta: [resposta]

2. [Solução detalhada passo a passo]
   Resposta: [resposta]

...

PARTE 2: DESENVOLVENDO AUTONOMIA
1. [Solução com menos detalhes]
   Resposta: [resposta]

...

PARTE 3: CONSOLIDAÇÃO
1. [Resposta e justificativa breve]
   Resposta: [resposta]

...
-->

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

### 1. Estrutura da Atividade de Recuperação

**Seções obrigatórias:**

| Seção | Quantidade | Nível de Apoio | Características |
|-------|-----------|----------------|-----------------|
| **Revisão de Conceitos** | 3-5 conceitos | Teórico | Relembrar pré-requisitos |
| **Parte 1: Primeiros Passos** | 4-6 problemas | Alto | Máximo scaffolding |
| **Parte 2: Autonomia** | 6-8 problemas | Médio | Scaffolding moderado |
| **Parte 3: Consolidação** | 5-6 problemas | Baixo | Scaffolding mínimo |
| **Autoavaliação** | Checklist | - | Reflexão metacognitiva |
| **TOTAL** | **15-20 problemas** | Progressivo | Alto → Baixo apoio |

### 2. Princípios de Scaffolding Pedagógico

**Alto Apoio (Parte 1):**

✅ **FAÇA:**
- Inclua exemplo resolvido passo a passo antes dos problemas
- Forneça múltiplas dicas por problema (2-3 dicas)
- Use "lembretes" com conceitos fundamentais
- Problemas extremamente básicos
- Destaque cada etapa de raciocínio
- Use linguagem encorajadora

❌ **NÃO FAÇA:**
- Deixar estudante sem orientação
- Assumir conhecimento prévio
- Pular etapas de raciocínio

**Exemplo de problema com alto apoio:**

```html
<li>
  <div class="problema-meta">
    <span class="nivel-apoio alto">Alto apoio</span>
    <span>⏱️ 3 min</span>
  </div>

  <p>Resolva a equação @2x + 6 = 0@</p>

  <div class="dica">
    <strong>Dica 1:</strong> Comece isolando o termo com @x@ de um lado da igualdade.
    Para isso, subtraia 6 de ambos os lados.
  </div>

  <div class="dica">
    <strong>Dica 2:</strong> Após isolar @2x@, divida ambos os lados por 2 para
    encontrar o valor de @x@.
  </div>

  <div class="lembrete">
    <strong>Lembre-se:</strong> O que você faz de um lado da equação, deve fazer
    do outro lado também!
  </div>
</li>
```

**Apoio Médio (Parte 2):**

✅ **FAÇA:**
- Forneça 1 dica estratégica por problema
- Problemas com complexidade ligeiramente maior
- Deixe espaço para o estudante pensar
- Oriente sem revelar a solução completa

**Exemplo de problema com apoio médio:**

```html
<li>
  <div class="problema-meta">
    <span class="nivel-apoio medio">Apoio médio</span>
    <span>⏱️ 5 min</span>
  </div>

  <p>Resolva a equação @3x - 5 = 2x + 7@</p>

  <div class="dica">
    <strong>Dica:</strong> Agrupe os termos com @x@ de um lado e os termos
    numéricos do outro lado da equação.
  </div>
</li>
```

**Baixo Apoio (Parte 3):**

✅ **FAÇA:**
- Forneça dica apenas se absolutamente necessário
- Problemas com complexidade apropriada ao nível
- Permite autonomia completa
- Testa consolidação do aprendizado

**Exemplo de problema com baixo apoio:**

```html
<li>
  <div class="problema-meta">
    <span class="nivel-apoio baixo">Baixo apoio</span>
    <span>⏱️ 6 min</span>
  </div>

  <p>Um número somado com seu dobro resulta em 24. Que número é esse?</p>

  <!-- Sem dicas - estudante deve trabalhar de forma autônoma -->
</li>
```

### 3. Revisão de Conceitos Básicos

Esta seção é **fundamental** para recuperação. Deve incluir:

- **3-5 conceitos básicos** em caixas `.conceito-basico`
- **Explicações claras e simples** (linguagem acessível)
- **Exemplos numéricos concretos**
- **Fórmulas essenciais** com KaTeX
- **Referência aos pré-requisitos**

**Exemplo de conceito básico:**

```html
<div class="conceito-basico">
  <h4>Conceito 1: Equação do 1º Grau</h4>
  <p>Uma equação do 1º grau é uma igualdade que envolve uma incógnita (geralmente @x@)
     elevada apenas à primeira potência. A forma geral é:</p>
  @@
  ax + b = 0, \quad \text{onde } a \neq 0
  @@
  <p><strong>Exemplo:</strong> @2x + 6 = 0@ é uma equação do 1º grau.</p>
  <p><strong>Solução:</strong> Para resolver, isolamos @x@:</p>
  @@
  \begin{align}
  2x + 6 &= 0 \\
  2x &= -6 \\
  x &= -3
  \end{align}
  @@
</div>
```

### 4. Exemplo Resolvido Passo a Passo

**Obrigatório** no início da Parte 1. Deve:

- Usar `.exemplo-passo-a-passo`
- Dividir solução em passos numerados usando `.passo`
- Explicar **por que** cada passo é feito (não apenas o cálculo)
- Mostrar cálculos intermediários
- Destacar a resposta final

**Estrutura:**

```html
<div class="exemplo-passo-a-passo">
  <h4>Exemplo Resolvido: [Título]</h4>
  <p><strong>Problema:</strong> [Enunciado]</p>

  <div class="passo">
    <p><strong>Passo 1:</strong> [Explicação da primeira ação]</p>
    @@[cálculo]@@
  </div>

  <div class="passo">
    <p><strong>Passo 2:</strong> [Explicação da segunda ação]</p>
    @@[cálculo]@@
  </div>

  <div class="passo">
    <p><strong>Passo 3:</strong> [Conclusão]</p>
    @@[cálculo final]@@
    <p><strong>Resposta:</strong> [resposta clara]</p>
  </div>
</div>
```

### 5. Dicas Eficazes

**Tipos de dicas:**

1. **Dicas estratégicas** (orientam abordagem geral)
   ```html
   <div class="dica">
     <strong>Dica:</strong> Comece identificando quais informações o problema fornece.
   </div>
   ```

2. **Dicas conceituais** (relembram conceitos)
   ```html
   <div class="lembrete">
     <strong>Lembre-se:</strong> O vértice da parábola tem coordenadas
     @x_v = -\frac{b}{2a}@ e @y_v = -\frac{\Delta}{4a}@.
   </div>
   ```

3. **Dicas procedimentais** (sugerem passos específicos)
   ```html
   <div class="dica">
     <strong>Dica:</strong> Primeiro calcule o discriminante @\Delta = b^2 - 4ac@.
   </div>
   ```

**Redução gradual de dicas:**
- Parte 1: 2-3 dicas por problema
- Parte 2: 1 dica por problema
- Parte 3: 0-1 dicas (apenas quando essencial)

### 6. Linguagem e Tom

**Características da linguagem em recuperação:**

✅ **FAÇA:**
- Use tom encorajador e positivo
- Evite jargão técnico sem explicação
- Seja paciente e didático
- Reconheça que erros são parte do aprendizado
- Use "você" para conectar com o estudante

❌ **NÃO FAÇA:**
- Linguagem desencorajadora ou negativa
- Assumir que o estudante "deveria saber"
- Ser condescendente
- Usar termos muito técnicos sem contexto

**Exemplos:**

✅ "Vamos revisar este conceito importante..."
✅ "Tente resolver antes de olhar a dica!"
✅ "Não se preocupe se tiver dificuldade no início..."

❌ "Você deveria saber isso..."
❌ "Este é um exercício trivial..."
❌ "Qualquer um consegue resolver..."

### 7. Autoavaliação

Seção final que promove **metacognição**:

```html
<h2>Autoavaliação</h2>

<div class="conceito-basico">
  <h4>Verifique seu aprendizado:</h4>
  <p>Após completar esta atividade, você deve ser capaz de:</p>
  <ul>
    <li>[ ] Identificar os coeficientes @a@, @b@ e @c@ em uma equação do 2º grau</li>
    <li>[ ] Calcular o discriminante @\Delta@ corretamente</li>
    <li>[ ] Aplicar a fórmula de Bhaskara para encontrar as raízes</li>
    <li>[ ] Interpretar o significado de @\Delta > 0@, @\Delta = 0@ e @\Delta < 0@</li>
    <li>[ ] Resolver problemas contextualizados envolvendo equações do 2º grau</li>
  </ul>

  <p><strong>Se você marcou todos os itens:</strong> Parabéns! Você está pronto
     para avançar para problemas mais complexos.</p>
  <p><strong>Se ainda há dúvidas:</strong> Não há problema! Revise os conceitos
     básicos da seção inicial e refaça os problemas que você teve dificuldade.
     Peça ajuda ao professor se necessário.</p>
</div>
```

### 8. Classes CSS Específicas

Use estas classes exclusivas de recuperação:

```html
<!-- Orientação inicial -->
<div class="orientacao-inicial">
  <h3>📚 Como usar esta atividade</h3>
  <p>[Instruções]</p>
</div>

<!-- Conceito básico -->
<div class="conceito-basico">
  <h4>Conceito X: [Nome]</h4>
  <p>[Explicação]</p>
</div>

<!-- Exemplo passo a passo -->
<div class="exemplo-passo-a-passo">
  <h4>Exemplo Resolvido</h4>
  <div class="passo">
    <p><strong>Passo 1:</strong> [...]</p>
  </div>
</div>

<!-- Dica -->
<div class="dica">
  <strong>Dica:</strong> [orientação]
</div>

<!-- Lembrete -->
<div class="lembrete">
  <strong>Lembre-se:</strong> [conceito]
</div>

<!-- Nível de apoio -->
<span class="nivel-apoio alto">Alto apoio</span>
<span class="nivel-apoio medio">Apoio médio</span>
<span class="nivel-apoio baixo">Baixo apoio</span>
```

---

## Exemplo de Uso

### Solicitação

```
Agente: agent-recuperacao
Tópico: Equações do 2º Grau
Turma: 9ANO
Tópicos deficitários: Fórmula de Bhaskara, discriminante, interpretação de raízes
Diagnóstico: Confusão com sinais, erros no cálculo de Δ, não compreende significado das raízes
Pré-requisitos: Equações do 1º grau, produtos notáveis, raiz quadrada
```

### Output Esperado

O agente criará `9ANO-RECUPERACAO-EQUACAO-2GRAU.html` contendo:

**Orientação Inicial:**
- Como usar a atividade
- Importância de trabalhar com calma
- Progressão gradual de autonomia

**Revisão de Conceitos:**
1. O que é uma equação do 2º grau
2. Coeficientes a, b, c
3. Discriminante Δ
4. Fórmula de Bhaskara
5. Interpretação de raízes

**Parte 1: Primeiros Passos (Alto Apoio) - 5 problemas**
- Exemplo resolvido completo
- Problemas 1-2: Identificar coeficientes
- Problemas 3-4: Calcular Δ com múltiplas dicas
- Problema 5: Aplicar Bhaskara com guia passo a passo
- Cada problema tem 2-3 dicas + lembretes

**Parte 2: Autonomia (Apoio Médio) - 7 problemas**
- Problemas 1-3: Equações completas com 1 dica
- Problemas 4-5: Equações incompletas
- Problemas 6-7: Problemas contextualizados simples
- Cada problema tem 1 dica estratégica

**Parte 3: Consolidação (Baixo Apoio) - 6 problemas**
- Problemas 1-3: Equações variadas sem dicas
- Problemas 4-6: Contextualizados mais complexos
- Poucas ou nenhuma dica

**Autoavaliação:**
- Checklist de habilidades
- Orientação sobre próximos passos

---

## Checklist de Validação

### Estrutura HTML
- [ ] Meta charset UTF-8 e viewport
- [ ] Título no formato "NEXUS - Recuperação: [Tópico]"
- [ ] Links CSS/JS corretos (../../css/, ../../js/)
- [ ] KaTeX incluído
- [ ] Navegação completa
- [ ] Botão "VOLTAR"
- [ ] Canvas matrix-rain
- [ ] Seletor de temas (14 temas)
- [ ] Estilos CSS inline incluídos

### Seções Obrigatórias
- [ ] Orientação inicial presente
- [ ] Revisão de Conceitos (3-5 conceitos)
- [ ] Parte 1: Primeiros Passos (4-6 problemas, alto apoio)
- [ ] Parte 2: Desenvolvendo Autonomia (6-8 problemas, apoio médio)
- [ ] Parte 3: Consolidação (5-6 problemas, baixo apoio)
- [ ] Autoavaliação com checklist
- [ ] Total 15-20 problemas

### Scaffolding Pedagógico
- [ ] Exemplo passo a passo no início da Parte 1
- [ ] Alto apoio: 2-3 dicas + lembretes por problema
- [ ] Apoio médio: 1 dica por problema
- [ ] Baixo apoio: 0-1 dicas, apenas se essencial
- [ ] Redução gradual de apoio visível

### Conceitos Básicos
- [ ] 3-5 conceitos em `.conceito-basico`
- [ ] Explicações claras e simples
- [ ] Exemplos numéricos concretos
- [ ] Fórmulas essenciais com KaTeX
- [ ] Pré-requisitos cobertos

### Dicas e Orientações
- [ ] Dicas estratégicas (abordagem geral)
- [ ] Lembretes conceituais
- [ ] Dicas procedimentais (passos específicos)
- [ ] Não revelam soluções completas
- [ ] Linguagem encorajadora

### Linguagem e Tom
- [ ] Tom encorajador e positivo
- [ ] Linguagem acessível
- [ ] Evita jargão técnico sem explicação
- [ ] Usa "você" para conectar
- [ ] Reconhece que erros são normais

### Classes CSS
- [ ] `.orientacao-inicial` usada
- [ ] `.conceito-basico` usada (3-5 vezes)
- [ ] `.exemplo-passo-a-passo` com `.passo` usada
- [ ] `.dica` usada adequadamente
- [ ] `.lembrete` usada para conceitos fundamentais
- [ ] `.nivel-apoio` (alto/medio/baixo) em todos os problemas
- [ ] `.section-intro` em cada parte

### Autoavaliação
- [ ] Checklist de habilidades presente
- [ ] 5-7 itens marcáveis
- [ ] Orientação sobre próximos passos
- [ ] Mensagem encorajadora

### Gabarito
- [ ] Em comentário HTML
- [ ] Soluções detalhadas para Parte 1
- [ ] Soluções moderadas para Parte 2
- [ ] Soluções concisas para Parte 3
- [ ] Todas as respostas corretas

### Compatibilidade
- [ ] Funciona com sistema de temas
- [ ] Compatível com modo de impressão
- [ ] Responsivo para mobile
- [ ] LaTeX renderiza corretamente

---

## Observações Finais

### Filosofia da Recuperação

A atividade de recuperação deve:

1. **Diagnosticar lacunas:** Identificar exatamente onde está a dificuldade
2. **Voltar aos fundamentos:** Não ter medo de recomeçar do básico
3. **Apoiar gradualmente:** Scaffolding que diminui à medida que o estudante progride
4. **Promover autonomia:** Objetivo final é independência, não dependência de dicas
5. **Encorajar persistência:** Mensagem de que todos podem aprender com esforço

### Erros Comuns a Evitar

❌ **Assumir conhecimento prévio:** Sempre revise conceitos básicos
❌ **Scaffolding constante:** Reduza o apoio gradualmente, não o mantenha alto até o fim
❌ **Problemas muito complexos:** Recuperação não é momento de desafios olímpicos
❌ **Linguagem desencorajadora:** Evite frases que sugerem que é "fácil" ou "trivial"
❌ **Falta de exemplos:** Sempre mostre pelo menos um exemplo completo resolvido

### Diferença entre Recuperação e Lista Regular

| Aspecto | Lista Regular | Atividade de Recuperação |
|---------|---------------|--------------------------|
| **Objetivo** | Praticar e aprofundar | Remediar e construir fundamentos |
| **Scaffolding** | Mínimo | Máximo → Mínimo (gradual) |
| **Dicas** | Ocasionais | Abundantes → Raras |
| **Complexidade** | Progressiva variada | Básica → Apropriada |
| **Exemplos** | Alguns | Muitos, especialmente passo a passo |
| **Tom** | Neutro/Desafiador | Encorajador/Apoiador |
| **Autoavaliação** | Opcional | Obrigatória |

---

**Versão:** 1.0
**Última atualização:** 2025-10-02
**Projeto:** Nexus - Portal Educacional de Matemática

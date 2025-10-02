# Agent-Listas: Elaborador de Listas de Problemas Matemáticos

## Propósito e Escopo

Este agente é especializado em criar **listas de problemas matemáticos** para o portal educacional Nexus, organizadas em seções progressivas que desenvolvem habilidades de resolução de problemas desde o nível introdutório até o aprofundamento.

### Características das Listas

- **Estrutura em 4 seções:** Introdutórios, Fixação, Aprofundamento, Propostos
- **Total de 32 problemas principais** + 6-10 propostos
- **Progressão pedagógica:** Do básico ao complexo
- **Metadados claros:** Cada problema declara tópico, dificuldade e tempo estimado
- **Contextualização:** Problemas conectados com situações reais quando possível

---

## Inputs Necessários

Ao solicitar uma lista de problemas, forneça:

1. **Tópico matemático**: Tema da lista (ex: "Equações do 2º Grau", "Probabilidade")
2. **Turma**: Ano escolar (9ANO, 1EM, 2EM, 3EM) ou "COMPARTILHADO"
3. **Subtópicos**: Conceitos específicos a serem cobertos
4. **Nível geral**: Básico, Intermediário ou Avançado
5. **Contextos desejados**: Aplicações práticas a incluir (opcional)

### Exemplo de Input

```
Agente: agent-listas
Tópico: Função do 1º Grau
Turma: 9ANO
Subtópicos: Coeficientes angular e linear, zero da função, gráfico, aplicações
Nível: Intermediário
Contextos: Tarifas, velocidade, custo-benefício
```

---

## Template HTML

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- ALTERE O TÍTULO PARA O TEMA DA LISTA -->
  <title>NEXUS - [NOME DO TÓPICO]</title>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,400;0,700;1,400&family=Press Start 2P&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.css">
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.js"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/contrib/auto-render.min.js"></script>
  <link rel="stylesheet" href="../../css/style.css">

  <style>
    /* ==========================================================================
       ESTILOS PARA METADADOS E ORGANIZAÇÃO VISUAL DOS PROBLEMAS
       ========================================================================== */

    /* Container de metadados (fonte, dificuldade, tempo estimado) */
    .problema-meta {
      font-size: 0.75rem;
      color: var(--secondary-text-color);
      margin-bottom: 0.5rem;
      font-family: 'Fira Sans', sans-serif;
    }

    /* Tag de tópico matemático */
    .problema-meta .topico {
      background-color: rgba(100, 100, 255, 0.3);
      padding: 2px 6px;
      border-radius: 3px;
      margin-right: 8px;
      font-style: italic;
    }

    /* Tag de fonte do problema */
    .problema-meta .fonte {
      background-color: rgba(0, 0, 0, 0.3);
      padding: 2px 6px;
      border-radius: 3px;
      margin-right: 8px;
    }

    /* Tag de dificuldade com cores diferentes */
    .problema-meta .dificuldade {
      padding: 2px 6px;
      border-radius: 3px;
      margin-right: 8px;
    }

    /* Cores por nível de dificuldade */
    .dificuldade.facil { background-color: rgba(76, 175, 80, 0.3); }    /* Verde */
    .dificuldade.media { background-color: rgba(255, 193, 7, 0.3); }    /* Amarelo */
    .dificuldade.dificil { background-color: rgba(244, 67, 54, 0.3); }  /* Vermelho */
    .dificuldade.desafio { background-color: rgba(156, 39, 176, 0.3); } /* Roxo */

    /* Introdução de cada seção */
    .section-intro {
      font-style: italic;
      color: var(--secondary-text-color);
      margin-bottom: 1.5rem;
      padding-left: 1rem;
      border-left: 3px solid var(--link-color);
    }

    /* Caixas de dica para os estudantes */
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
     TÍTULO PRINCIPAL DA LISTA
     ============================================================================ -->
<h1>[NOME DO TÓPICO EM MAIÚSCULAS]</h1>

<!-- ============================================================================
     SEÇÃO 1: PROBLEMAS INTRODUTÓRIOS

     OBJETIVO: Familiarização com conceitos básicos
     QUANTIDADE: 10-12 problemas
     CARACTERÍSTICAS:
     - Aplicação direta de fórmulas ou conceitos
     - Enunciados curtos e objetivos
     - Baixa complexidade de interpretação
     ============================================================================ -->
<article>
  <h2>Problemas Introdutórios</h2>
  <p class="section-intro">
    Problemas básicos para familiarização com os conceitos fundamentais.
  </p>

  <ol>
    <!-- ====== EXEMPLO DE PROBLEMA 1 ====== -->
    <li>
      <div class="problema-meta">
        <!-- TÓPICO DE MATEMÁTICA: Descreve o conceito matemático principal -->
        <span class="topico">[Tópico específico - ex: "Coeficiente angular"]</span>

        <!-- DIFICULDADE: facil, media, dificil, desafio -->
        <span class="dificuldade facil">Fácil</span>

        <!-- TEMPO ESTIMADO: em minutos -->
        <span>⏱️ 3 min</span>
      </div>

      <!-- ENUNCIADO DO PROBLEMA -->
      <p>[Enunciado claro e direto do problema 1]</p>
    </li>

    <!-- ADICIONE MAIS 9-11 PROBLEMAS INTRODUTÓRIOS -->

  </ol>
</article>

<!-- ============================================================================
     SEÇÃO 2: PROBLEMAS DE FIXAÇÃO

     OBJETIVO: Consolidar aprendizado e desenvolver interpretação
     QUANTIDADE: 12-14 problemas
     CARACTERÍSTICAS:
     - Contextos mais elaborados
     - Requerem interpretação do enunciado
     - Combinação de conceitos
     - Aplicação em situações reais
     ============================================================================ -->
<article>
  <h2>Problemas de Fixação</h2>
  <p class="section-intro">
    Problemas que requerem interpretação do enunciado e aplicação de conceitos combinados.
  </p>

  <ol>
    <!-- ====== EXEMPLO DE PROBLEMA COM DICA ====== -->
    <li>
      <div class="problema-meta">
        <span class="topico">[Tópico específico]</span>
        <span class="dificuldade media">Média</span>
        <span>⏱️ 5 min</span>
      </div>
      <p>[Enunciado mais elaborado e contextualizado]</p>

      <!-- Exemplo de dica útil (use com moderação) -->
      <div class="dica">
        <strong>Dica:</strong> [Orientação estratégica sem revelar a solução]
      </div>
    </li>

    <!-- ADICIONE MAIS 11-13 PROBLEMAS DE FIXAÇÃO -->

  </ol>
</article>

<!-- ============================================================================
     SEÇÃO 3: PROBLEMAS DE APROFUNDAMENTO

     OBJETIVO: Desenvolver raciocínio complexo e múltiplas etapas
     QUANTIDADE: 6-8 problemas
     CARACTERÍSTICAS:
     - Alta complexidade
     - Múltiplas etapas de resolução
     - Combinação avançada de conceitos
     - Podem ter subitens (a, b, c)
     ============================================================================ -->
<article>
  <h2>Problemas de Aprofundamento</h2>
  <p class="section-intro">
    Problemas complexos que exigem raciocínio em múltiplas etapas e combinação de conceitos.
  </p>

  <ol>
    <!-- ====== EXEMPLO DE PROBLEMA COM SUBITENS ====== -->
    <li>
      <div class="problema-meta">
        <span class="topico">[Tópico específico]</span>
        <span class="dificuldade dificil">Difícil</span>
        <span>⏱️ 8 min</span>
      </div>
      <p>[Enunciado principal complexo]</p>
      <!-- Subitens (se aplicável) -->
      <p>a) [Primeira pergunta]</p>
      <p>b) [Segunda pergunta]</p>
      <p>c) [Terceira pergunta]</p>
    </li>

    <!-- ADICIONE MAIS 5-7 PROBLEMAS DE APROFUNDAMENTO -->

  </ol>
</article>

<!-- ============================================================================
     SEÇÃO 4: PROBLEMAS PROPOSTOS

     OBJETIVO: Problemas adicionais para prática livre
     QUANTIDADE: Variável (sugestão: 6-10 problemas)
     CARACTERÍSTICAS:
     - Problemas extras para prática
     - Variedade de dificuldades
     - Podem incluir desafios criativos
     - Foco em aplicações práticas e contextualizadas

     NOTA: Não é necessário declarar fontes nesta seção
     ============================================================================ -->
<article>
  <h2>Problemas Propostos</h2>
  <p class="section-intro">
    Problemas adicionais para você praticar e consolidar seu aprendizado!
  </p>

  <ol>
    <!-- ====== EXEMPLO DE PROBLEMA 1 ====== -->
    <li>
      <div class="problema-meta">
        <span class="topico">[Tópico específico]</span>
        <span class="dificuldade media">Média</span>
        <span>⏱️ 5 min</span>
      </div>
      <p>[Enunciado do problema proposto]</p>

      <!-- Dicas são opcionais -->
      <div class="dica">
        <strong>Dica:</strong> [Orientação sobre estratégia de resolução]
      </div>
    </li>

    <!-- ADICIONE MAIS 5-9 PROBLEMAS PROPOSTOS -->

  </ol>
</article>

<!-- ============================================================================
     GABARITO E SOLUÇÕES (OPCIONAL - EM COMENTÁRIO HTML)

     EXEMPLO DE ESTRUTURA:

     <article>
       <h2>Gabarito e Soluções</h2>

       <h3>Problemas Introdutórios</h3>
       <ol>
         <li>
           <p><strong>Solução:</strong> [Explicação passo a passo]</p>
           <p><strong>Resposta:</strong> [Resposta final]</p>
         </li>
       </ol>
     </article>
     ============================================================================ -->

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
            // Modo de exibição (centralizado): @@...@@
            {left: "@@", right: "@@", display: true},
            {left: "\\[", right: "\\]", display: true},

            // Modo inline (no texto): @...@
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

### 1. Distribuição de Problemas

**Quantidade obrigatória:**

| Seção | Quantidade | Características |
|-------|-----------|-----------------|
| **Problemas Introdutórios** | 10-12 | Aplicação direta, enunciados curtos |
| **Problemas de Fixação** | 12-14 | Interpretação, contextos elaborados |
| **Problemas de Aprofundamento** | 6-8 | Múltiplas etapas, alta complexidade |
| **TOTAL (Seções 1-3)** | **32** | Distribuição pode variar ligeiramente |
| **Problemas Propostos** | 6-10 | Prática adicional, variado |

### 2. Metadados de Cada Problema

**Campos obrigatórios:**

```html
<div class="problema-meta">
  <span class="topico">[Conceito matemático principal]</span>
  <span class="dificuldade [facil/media/dificil/desafio]">[Nível]</span>
  <span>⏱️ [X] min</span>
</div>
```

**Exemplos de tópicos:**
- "Regra de três simples"
- "Teorema de Pitágoras"
- "Função afim - zero da função"
- "Probabilidade de eventos independentes"
- "Equação do 2º grau - fórmula de Bhaskara"
- "Trigonometria - seno e cosseno"

**Níveis de dificuldade:**
- `facil`: Aplicação direta de conceitos
- `media`: Requer interpretação ou múltiplos passos
- `dificil`: Complexo, múltiplas etapas, conceitos combinados
- `desafio`: Altamente complexo, criatividade necessária

**Tempo estimado:**
- Fácil: 2-4 minutos
- Média: 4-6 minutos
- Difícil: 6-10 minutos
- Desafio: 10+ minutos

### 3. Características por Seção

#### Problemas Introdutórios (10-12 problemas)

✅ **FAÇA:**
- Enunciados diretos e objetivos
- Aplicação imediata de fórmulas
- Problemas de "reconhecimento" (identificar padrões, conceitos)
- Cálculos simples com valores "redondos"
- Contextos básicos e familiares

❌ **NÃO FAÇA:**
- Enunciados longos ou ambíguos
- Múltiplas etapas de resolução
- Conceitos não apresentados previamente
- Cálculos trabalhosos

**Exemplo:**
```html
<li>
  <div class="problema-meta">
    <span class="topico">Função afim - identificação</span>
    <span class="dificuldade facil">Fácil</span>
    <span>⏱️ 2 min</span>
  </div>
  <p>Identifique quais das funções abaixo são funções afins:</p>
  <p>a) @f(x) = 2x + 3@</p>
  <p>b) @g(x) = x^2 + 1@</p>
  <p>c) @h(x) = -5x@</p>
</li>
```

#### Problemas de Fixação (12-14 problemas)

✅ **FAÇA:**
- Contextualizações realistas
- Enunciados que requerem interpretação
- Combinação de 2-3 conceitos
- Aplicações práticas (física, economia, cotidiano)
- Problemas "narrativos" que contam uma história

❌ **NÃO FAÇA:**
- Enunciados puramente abstratos
- Complexidade excessiva
- Jargão técnico sem explicação

**Exemplo:**
```html
<li>
  <div class="problema-meta">
    <span class="topico">Função afim - aplicação (tarifas)</span>
    <span class="dificuldade media">Média</span>
    <span>⏱️ 5 min</span>
  </div>
  <p>Um taxista cobra uma bandeirada de R$ 5,00 mais R$ 2,50 por quilômetro rodado.
     Determine a função que representa o custo @C@ da corrida em função da distância
     @d@ percorrida. Quanto custará uma corrida de 12 km?</p>

  <div class="dica">
    <strong>Dica:</strong> Identifique o valor fixo (coeficiente linear) e o valor
    que varia com a distância (coeficiente angular).
  </div>
</li>
```

#### Problemas de Aprofundamento (6-8 problemas)

✅ **FAÇA:**
- Problemas com múltiplas etapas
- Combinação avançada de conceitos
- Subitens (a, b, c) explorando aspectos diferentes
- Problemas que exigem raciocínio estratégico
- Interpretação de dados/gráficos/tabelas
- Problemas investigativos

❌ **NÃO FAÇA:**
- Problemas "impossíveis" sem fundamentação
- Conceitos não trabalhados previamente
- Enunciados confusos ou mal formulados

**Exemplo:**
```html
<li>
  <div class="problema-meta">
    <span class="topico">Função afim - análise completa</span>
    <span class="dificuldade dificil">Difícil</span>
    <span>⏱️ 8 min</span>
  </div>
  <p>Duas empresas de telefonia oferecem os seguintes planos:</p>
  <p><strong>Empresa A:</strong> Taxa fixa de R$ 40,00 + R$ 0,50 por minuto</p>
  <p><strong>Empresa B:</strong> Taxa fixa de R$ 25,00 + R$ 0,75 por minuto</p>

  <p>a) Represente o custo mensal de cada empresa em função dos minutos usados.</p>
  <p>b) Para quantos minutos de uso os planos têm o mesmo custo?</p>
  <p>c) A partir de quantos minutos o plano da Empresa A se torna mais vantajoso?</p>
  <p>d) Esboce os gráficos das duas funções no mesmo plano cartesiano.</p>
</li>
```

#### Problemas Propostos (6-10 problemas)

✅ **FAÇA:**
- Variedade de dificuldades
- Problemas criativos e interessantes
- Aplicações práticas
- Desafios opcionais
- Problemas interdisciplinares (física, química, biologia)

❌ **NÃO FAÇA:**
- Apenas problemas fáceis (varie a dificuldade)
- Repetir problemas das seções anteriores

**Características:**
- Não requer declaração de fontes
- Pode incluir problemas de "curiosidade matemática"
- Pode ter dificuldade variada (fácil a desafio)

### 4. Uso de Dicas

**Quando usar:**
- Problemas com interpretação complexa
- Múltiplas abordagens possíveis
- Conceitos que frequentemente causam confusão

**Como escrever dicas eficazes:**
- Oriente sem revelar a solução
- Foque em estratégias ("Comece identificando...", "Observe que...")
- Destaque conceitos-chave
- Sugira caminhos de raciocínio

**Exemplo de boa dica:**
```html
<div class="dica">
  <strong>Dica:</strong> Comece identificando o zero da função.
  Lembre-se que o zero é o valor de @x@ quando @f(x) = 0@.
</div>
```

**Exemplo de dica ruim (revela demais):**
```html
<div class="dica">
  <strong>Dica:</strong> Substitua f(x) por 0 e resolva 2x + 6 = 0, obtendo x = -3.
</div>
```

### 5. Formatação LaTeX

**Delimitadores:**
- **Display mode:** `@@fórmula@@`
- **Inline mode:** `@fórmula@`

**Uso correto em problemas:**

```html
<p>Resolva a equação @2x^2 - 5x + 3 = 0@ usando a fórmula:</p>
@@
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
@@
```

**Símbolos comuns em listas:**
- Variáveis: `x`, `y`, `f(x)`, `g(t)`
- Operações: `+`, `-`, `\times`, `\div`, `\cdot`
- Relações: `=`, `\neq`, `<`, `>`, `\leq`, `\geq`
- Funções: `\sin`, `\cos`, `\tan`, `\log`, `\ln`
- Frações: `\frac{a}{b}`
- Raízes: `\sqrt{x}`, `\sqrt[n]{x}`
- Potências: `x^2`, `a^{n+1}`

### 6. Contextualização de Problemas

**Contextos eficazes:**
- **Financeiro:** Tarifas, descontos, juros, investimentos
- **Movimento:** Velocidade, distância, tempo
- **Geometria:** Áreas, perímetros, volumes
- **Cotidiano:** Receitas, construção, esportes
- **Ciências:** Física (MRU, queda livre), Química (concentrações)

**Exemplo de boa contextualização:**
```html
<p>Uma piscina retangular de 8m × 5m está sendo esvaziada. O nível da água
   decresce 15 cm a cada hora. Se inicialmente a água tinha 1,80m de
   profundidade, determine:</p>
<p>a) A função que relaciona a profundidade @h@ (em metros) com o tempo @t@
   (em horas).</p>
<p>b) Após quanto tempo a piscina estará completamente vazia?</p>
```

---

## Exemplo de Uso

### Solicitação

```
Agente: agent-listas
Tópico: Teorema de Pitágoras
Turma: 9ANO
Subtópicos: Cálculo de hipotenusa, cálculo de catetos, triângulos retângulos especiais (45-45-90, 30-60-90), aplicações práticas
Nível: Intermediário
Contextos: Construção civil, navegação, distâncias em mapas
```

### Output Esperado

O agente criará `9ANO-TEOREMA-PITAGORAS.html` contendo:

**Problemas Introdutórios (10-12):**
1-4. Cálculo direto de hipotenusa com valores inteiros
5-7. Cálculo de catetos com valores inteiros
8-10. Verificação se um triângulo é retângulo (terno pitagórico)
11-12. Triângulos especiais básicos

**Problemas de Fixação (12-14):**
1-4. Problemas contextualizados (escada encostada em parede, distâncias)
5-8. Problemas com valores não inteiros (raízes quadradas)
9-11. Aplicações em figuras geométricas (quadrado, retângulo)
12-14. Problemas de navegação e mapas

**Problemas de Aprofundamento (6-8):**
1-2. Problemas com múltiplas aplicações do teorema
3-4. Combinação com áreas e perímetros
5-6. Problemas investigativos (maximização/minimização)
7-8. Aplicações em 3D (diagonal do paralelepípedo)

**Problemas Propostos (6-10):**
- Variedade de aplicações criativas
- Desafios geométricos
- Problemas interdisciplinares

---

## Checklist de Validação

### Estrutura HTML
- [ ] Meta charset UTF-8 declarado
- [ ] Meta viewport configurado
- [ ] Título no formato "NEXUS - [Tópico]"
- [ ] Links para CSS: `../../css/style.css`
- [ ] Links para JS: `../../js/matrix-rain.js`, `../../js/theme-switcher.js`, `../../js/print-mode.js`
- [ ] KaTeX incluído (CSS e JS)
- [ ] Navegação completa
- [ ] Botão "VOLTAR" ao final
- [ ] Canvas para matrix-rain
- [ ] Painel de seletor de temas (14 temas)
- [ ] Estilos CSS inline para metadados incluídos

### Distribuição de Problemas
- [ ] Seção 1: 10-12 problemas introdutórios
- [ ] Seção 2: 12-14 problemas de fixação
- [ ] Seção 3: 6-8 problemas de aprofundamento
- [ ] Total seções 1-3: ~32 problemas
- [ ] Seção 4: 6-10 problemas propostos

### Metadados de Problemas
- [ ] Todos os problemas têm `.problema-meta`
- [ ] Todos declaram `<span class="topico">`
- [ ] Todos declaram `<span class="dificuldade">`
- [ ] Todos declaram tempo estimado (⏱️)
- [ ] Níveis de dificuldade apropriados por seção

### Qualidade dos Problemas
- [ ] Problemas introdutórios são diretos e simples
- [ ] Problemas de fixação são contextualizados
- [ ] Problemas de aprofundamento têm múltiplas etapas
- [ ] Progressão de dificuldade clara
- [ ] Enunciados claros e bem formulados
- [ ] Contextualização realista e interessante

### Dicas
- [ ] Dicas usadas com moderação (não em todos os problemas)
- [ ] Dicas orientam sem revelar soluções
- [ ] Dicas focam em estratégias de resolução
- [ ] Formatação correta com `.dica` e `<strong>Dica:</strong>`

### LaTeX/KaTeX
- [ ] Delimitadores corretos: `@@...@@` e `@...@`
- [ ] Fórmulas bem formatadas
- [ ] Notação matemática consistente
- [ ] Símbolos especiais corretos

### Introduções de Seção
- [ ] Todas as seções têm `.section-intro`
- [ ] Descrições claras do objetivo de cada seção
- [ ] Formatação consistente

### Compatibilidade
- [ ] Funciona com sistema de temas
- [ ] Compatível com modo de impressão
- [ ] Responsivo para mobile
- [ ] Sem SVG

### Gabarito (Opcional)
- [ ] Se incluído, está em comentário HTML
- [ ] Soluções passo a passo
- [ ] Respostas finais claras
- [ ] Organizado por seção

---

## Observações Finais

### Boas Práticas

1. **Variedade é fundamental:**
   - Varie contextos, tipos de problemas, abordagens
   - Não repita o mesmo padrão de enunciado
   - Misture problemas numéricos e algébricos

2. **Contextualização autêntica:**
   - Use situações reais e plausíveis
   - Evite contextos forçados ou artificiais
   - Pesquise dados realistas (preços, medidas, etc.)

3. **Progressão pedagógica:**
   - Respeite a sequência: simples → médio → complexo
   - Cada problema deve ter propósito educacional claro
   - Conceitos devem ser introduzidos antes de serem aplicados

4. **Clareza nos enunciados:**
   - Seja preciso e objetivo
   - Evite ambiguidades
   - Use pontuação correta
   - Formate dados em listas quando apropriado

5. **Inclusão e diversidade:**
   - Use nomes variados em problemas narrativos
   - Contextos diversos (urbano/rural, local/global)
   - Exemplos que ressoam com diferentes estudantes

### Evite Armadilhas Comuns

❌ **Problemas mal formulados:**
- Falta de informação necessária
- Informação contraditória
- Pergunta ambígua

❌ **Dificuldade inadequada:**
- Problema "introdutório" muito complexo
- Problema de "aprofundamento" trivial
- Saltos abruptos de dificuldade

❌ **Contextualização ruim:**
- Situações irrealistas ou absurdas
- Contexto que complica sem adicionar valor
- Dados desatualizados ou implausíveis

❌ **Erros matemáticos:**
- Respostas incorretas no gabarito
- Problemas sem solução ou com múltiplas soluções não intencionais
- Valores que resultam em cálculos excessivamente trabalhosos

---

**Versão:** 1.0
**Última atualização:** 2025-10-02
**Projeto:** Nexus - Portal Educacional de Matemática

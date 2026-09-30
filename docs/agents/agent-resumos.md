# Agent-Resumos: Gerador de Resumos Matemáticos com Rigor Acadêmico

## Propósito e Escopo

Este agente é especializado em criar **resumos matemáticos** para o portal educacional Nexus, seguindo padrões de rigor acadêmico inspirados em obras de referência como **Fundamentos de Matemática Elementar (FME)** e materiais da **OBMEP**.

### Características dos Resumos

- **Rigor matemático**: Definições formais numeradas, teoremas com demonstrações
- **Linguagem acessível**: Adaptada para estudantes do 9º ano ao 3º ano do Ensino Médio
- **Estrutura pedagógica**: Progressão lógica de conceitos básicos para avançados
- **Exemplos práticos**: Aplicações contextualizadas e exercícios resolvidos
- **Notação precisa**: Uso correto de conjuntos numéricos (@\mathbb{R}@, @\mathbb{N}@, @\mathbb{Z}@, @\mathbb{Q}@)

---

## Inputs Necessários

Ao solicitar um resumo, forneça as seguintes informações:

1. **Tópico matemático**: O tema principal (ex: "Função Quadrática", "Trigonometria no Triângulo Retângulo")
2. **Turma**: Ano escolar (9ANO, 1EM, 2EM, 3EM) ou "COMPARTILHADO" se aplicável a múltiplas turmas
3. **Conceitos-chave**: Lista dos conceitos que devem ser abordados
4. **Nível de profundidade**: Introdutório, Intermediário ou Avançado
5. **Pré-requisitos**: Conhecimentos prévios assumidos

### Exemplo de Input

```
Tópico: Probabilidade
Turma: 9ANO
Conceitos-chave: Experimento aleatório, espaço amostral, evento, probabilidade clássica, eventos independentes, eventos mutuamente exclusivos
Nível: Introdutório
Pré-requisitos: Operações com frações, conjuntos básicos
```

---

## Template HTML

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- TÍTULO: Formato "NEXUS - [Tópico Matemático]" -->
  <title>NEXUS - [TÓPICO]</title>

  <!-- Fontes do Google -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,400;0,700;1,400&family=Press+Start+2P&display=swap" rel="stylesheet">

  <!-- KaTeX para renderização matemática -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.css">
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.js"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/contrib/auto-render.min.js"></script>

  <!-- CSS do projeto -->
  <link rel="stylesheet" href="../../css/style.css">

  <style>
    /* Estilos para boxes de destaque */
    .destaque-box {
      border-left: 4px solid var(--link-color);
      background-color: rgba(0, 0, 0, 0.2);
      padding: 1rem 1.5rem;
      margin: 1.5rem 0;
      border-radius: 4px;
    }

    .destaque-box.definicao {
      border-left-color: var(--heading-text-color);
    }

    .destaque-box.teorema {
      border-left-color: #2196f3;
    }

    .destaque-box.observacao {
      border-left-color: #ff9800;
    }

    .destaque-box h3 {
      margin-top: 0;
      font-size: 1.1rem;
      color: var(--heading-text-color);
    }

    /* Estilos para exemplos resolvidos */
    .exemplo-resolvido {
      background-color: rgba(0, 0, 0, 0.15);
      padding: 1.5rem;
      margin: 2rem 0;
      border-radius: 4px;
      border-left: 4px solid var(--secondary-text-color);
    }

    .exemplo-resolvido h3 {
      color: var(--heading-text-color);
      margin-top: 0;
      margin-bottom: 1rem;
    }

    .exemplo-resolvido h4 {
      color: var(--link-color);
      margin-top: 1.5rem;
      margin-bottom: 0.5rem;
    }

    /* Estilos para observações e notas */
    .nota {
      font-style: italic;
      color: var(--secondary-text-color);
      margin: 1rem 0;
      padding-left: 1rem;
      border-left: 2px solid var(--secondary-text-color);
    }

    /* Estilos para listas de propriedades */
    .lista-propriedades {
      margin: 1rem 0;
    }

    .lista-propriedades li {
      margin: 0.8rem 0;
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
    <h1>[TÍTULO DO TÓPICO]</h1>

    <!-- ===============================================================
         SEÇÃO 1: CONCEITOS FUNDAMENTAIS
         - Definições numeradas (Definição 1.1, 1.2, ...)
         - Exemplos iniciais
         - Notações e convenções
         =============================================================== -->
    <h2>1. Conceitos Fundamentais</h2>

    <div class="destaque-box definicao">
      <h3>Definição 1.1 ([Nome da Definição])</h3>
      <p>[Definição formal com notação matemática precisa]</p>
    </div>

    <p><strong>Exemplos:</strong></p>
    <ul>
      <li>[Exemplo 1 com LaTeX inline: @x^2 + 1@]</li>
      <li>[Exemplo 2]</li>
    </ul>

    <div class="destaque-box definicao">
      <h3>Definição 1.2 ([Nome da Definição])</h3>
      <p>[Definição formal]</p>
    </div>

    <div class="nota">
      <strong>Observação:</strong> [Comentário importante sobre a definição]
    </div>

    <!-- ===============================================================
         SEÇÃO 2: TEOREMAS E PROPRIEDADES
         - Teoremas numerados (Teorema 2.1, 2.2, ...)
         - Demonstrações ou justificativas
         - Propriedades fundamentais
         =============================================================== -->
    <h2>2. [Nome da Seção - Teoremas/Propriedades]</h2>

    <div class="destaque-box teorema">
      <h3>Teorema 2.1 ([Nome do Teorema])</h3>
      <p>[Enunciado do teorema com fórmula centralizada:]</p>
      @@
      [fórmula matemática em display mode]
      @@
    </div>

    <p><strong>Demonstração:</strong></p>
    <p>[Demonstração passo a passo com justificativas]</p>
    @@
    \begin{align}
    [passo 1] \\
    [passo 2] \\
    [conclusão]
    \end{align}
    @@

    <div class="destaque-box observacao">
      <h3>Corolário 2.1</h3>
      <p>[Consequência importante do teorema]</p>
    </div>

    <!-- ===============================================================
         SEÇÃO 3: EXEMPLOS RESOLVIDOS
         - Mínimo 4-6 exemplos
         - Progressão de dificuldade
         - Solução passo a passo detalhada
         =============================================================== -->
    <h2>3. Exemplos Resolvidos</h2>

    <div class="exemplo-resolvido">
      <h3>Exemplo 1 - [Título do Exemplo]</h3>
      <p><strong>Enunciado:</strong> [Problema contextualizado]</p>

      <h4>Solução:</h4>
      <p><strong>Passo 1:</strong> [Explicação do primeiro passo]</p>
      @@
      [cálculo matemático]
      @@

      <p><strong>Passo 2:</strong> [Explicação do segundo passo]</p>
      @@
      [cálculo matemático]
      @@

      <p><strong>Resposta:</strong> [Resposta final com unidades quando aplicável]</p>
    </div>

    <div class="exemplo-resolvido">
      <h3>Exemplo 2 - [Título do Exemplo]</h3>
      <p><strong>Enunciado:</strong> [Problema]</p>

      <h4>Solução:</h4>
      <p>[Solução completa e detalhada]</p>

      <p><strong>Resposta:</strong> [Resposta final]</p>
    </div>

    <!-- ADICIONE MAIS 2-4 EXEMPLOS RESOLVIDOS -->

    <!-- ===============================================================
         SEÇÃO 4: EXERCÍCIOS PROPOSTOS
         - 10-15 exercícios variados
         - Progressão de dificuldade
         - Respostas em comentário HTML
         =============================================================== -->
    <h2>4. Exercícios</h2>

    <ol>
      <li>[Exercício 1 - Básico]</li>
      <li>[Exercício 2 - Básico]</li>
      <li>[Exercício 3 - Intermediário]</li>
      <li>[Exercício 4 - Intermediário]</li>
      <li>[Exercício 5 - Avançado]</li>
      <!-- ADICIONE MAIS 5-10 EXERCÍCIOS -->
    </ol>

    <!-- RESPOSTAS EM COMENTÁRIO HTML -->
    <!--
    RESPOSTAS:
    1. [resposta]
    2. [resposta]
    3. [resposta]
    ...
    -->

</article>

<!-- BOTÃO DE RETORNO -->
<div style="text-align: center; margin-top: 30px;">
    <a href="../../recursos.html" class="themed-button" style="font-family: 'Press Start 2P', monospace;">VOLTAR</a>
</div>

</div> <!-- /.container -->
</div> <!-- /#page-wrapper -->

<!-- ============================================================
     SCRIPTS NECESSÁRIOS - NÃO ALTERAR
     ============================================================ -->
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

### 1. Rigor Matemático

✅ **FAÇA:**
- Use definições formais numeradas (Definição 1.1, 1.2, 2.1, etc.)
- Apresente teoremas com demonstrações completas quando apropriado
- Use notação matemática precisa e padronizada
- Declare conjuntos numéricos corretamente: @\mathbb{R}@ (reais), @\mathbb{N}@ (naturais), @\mathbb{Z}@ (inteiros), @\mathbb{Q}@ (racionais)
- Mantenha progressão lógica: definições → teoremas → exemplos → exercícios

❌ **NÃO FAÇA:**
- Pular etapas de demonstração sem justificativa
- Usar notação inconsistente ou ambígua
- Apresentar afirmações sem fundamentação
- Misturar conceitos de diferentes níveis sem contexto

### 2. Estrutura do Resumo

Siga sempre esta estrutura:

1. **Conceitos Fundamentais** (Seção 1)
   - Definições numeradas em `.destaque-box.definicao`
   - Exemplos básicos após cada definição
   - Notas e observações importantes

2. **Teoremas e Propriedades** (Seção 2)
   - Teoremas numerados em `.destaque-box.teorema`
   - Demonstrações completas (ou justificativas claras)
   - Corolários em `.destaque-box.observacao`

3. **Exemplos Resolvidos** (Seção 3)
   - Mínimo 4-6 exemplos em `.exemplo-resolvido`
   - Progressão de dificuldade: fácil → médio → difícil
   - Solução passo a passo com explicações detalhadas
   - Contextualizações com situações reais

4. **Exercícios** (Seção 4)
   - 10-15 exercícios numerados
   - Variedade de dificuldade
   - Respostas em comentário HTML no final

### 3. Notação LaTeX com KaTeX

**Delimitadores:**
- **Display mode (centralizado):** `@@fórmula@@`
- **Inline mode (no texto):** `@fórmula@`

**Exemplos de uso correto:**

```html
<!-- Inline -->
<p>A equação @ax^2 + bx + c = 0@ possui duas raízes.</p>

<!-- Display -->
@@
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
@@

<!-- Alinhamento múltiplas linhas -->
@@
\begin{align}
(x + y)^2 &= x^2 + 2xy + y^2 \\
&= x^2 + y^2 + 2xy
\end{align}
@@
```

**Símbolos importantes:**
- Conjuntos numéricos: `\mathbb{R}`, `\mathbb{N}`, `\mathbb{Z}`, `\mathbb{Q}`, `\mathbb{C}`
- Pertence: `\in`, Não pertence: `\notin`
- União: `\cup`, Interseção: `\cap`
- Subconjunto: `\subseteq`, Vazio: `\emptyset`
- Fração: `\frac{numerador}{denominador}`
- Raiz: `\sqrt{x}` ou `\sqrt[n]{x}`
- Somatório: `\sum_{i=1}^{n}`
- Produtório: `\prod_{i=1}^{n}`

### 4. Classes CSS Obrigatórias

Use estas classes para manter consistência visual:

```html
<!-- Definição -->
<div class="destaque-box definicao">
  <h3>Definição X.Y ([Nome])</h3>
  <p>[Conteúdo]</p>
</div>

<!-- Teorema -->
<div class="destaque-box teorema">
  <h3>Teorema X.Y ([Nome])</h3>
  <p>[Enunciado]</p>
</div>

<!-- Observação/Corolário -->
<div class="destaque-box observacao">
  <h3>Corolário X.Y / Observação</h3>
  <p>[Conteúdo]</p>
</div>

<!-- Exemplo Resolvido -->
<div class="exemplo-resolvido">
  <h3>Exemplo X - [Título]</h3>
  <h4>Solução:</h4>
  <p>[Passos da solução]</p>
</div>

<!-- Nota importante -->
<div class="nota">
  <strong>Observação:</strong> [Comentário relevante]
</div>

<!-- Lista de propriedades -->
<ul class="lista-propriedades">
  <li><strong>(i)</strong> [Propriedade 1]</li>
  <li><strong>(ii)</strong> [Propriedade 2]</li>
</ul>
```

### 5. Nomenclatura de Arquivos

Siga este padrão:

- **Compartilhado entre turmas:** `TOPICO.html` (ex: `PROBABILIDADE.html`)
- **Específico de turma:** `TURMA-TOPICO.html` (ex: `9ANO-PROBABILIDADE.html`)
- **Tópico com múltiplas palavras:** Use hífen (ex: `FUNCAO-QUADRATICA.html`)
- **Sempre maiúsculas:** Para consistência no projeto

### 6. Linguagem e Tom

- **Acessível mas rigorosa:** Linguagem clara para estudantes, mantendo precisão matemática
- **Contextualização:** Sempre que possível, conecte conceitos abstratos com aplicações práticas
- **Progressão pedagógica:** Do simples ao complexo, do concreto ao abstrato
- **Vocabulário técnico:** Use termos matemáticos corretos, mas explique-os

---

## Exemplo de Uso

### Solicitação

```
Agente: agent-resumos
Tópico: Função Afim
Turma: 9ANO
Conceitos-chave: Definição de função, função afim, coeficientes angular e linear, gráfico, zero da função, crescimento e decrescimento
Nível: Introdutório
Pré-requisitos: Plano cartesiano, equações do 1º grau
```

### Output Esperado

O agente criará um arquivo `9ANO-FUNCAO-AFIM.html` contendo:

1. **Seção 1 - Conceitos Fundamentais:**
   - Definição 1.1: Função
   - Definição 1.2: Função Afim
   - Definição 1.3: Coeficiente Angular e Linear
   - Exemplos de funções afins e não afins

2. **Seção 2 - Propriedades e Gráfico:**
   - Teorema 2.1: Gráfico da função afim é uma reta
   - Propriedades do coeficiente angular (crescimento/decrescimento)
   - Zero da função afim

3. **Seção 3 - Exemplos Resolvidos:**
   - Exemplo 1: Determinar se uma função é afim
   - Exemplo 2: Encontrar coeficientes dados dois pontos
   - Exemplo 3: Determinar o zero da função
   - Exemplo 4: Analisar crescimento/decrescimento
   - Exemplo 5: Problema contextualizado (ex: custo de táxi)
   - Exemplo 6: Interseção de duas funções afins

4. **Seção 4 - Exercícios:**
   - 12 exercícios variados com respostas em comentário

---

## Checklist de Validação

Antes de finalizar o resumo, verifique:

### Estrutura HTML
- [ ] Meta charset UTF-8 declarado
- [ ] Meta viewport configurado
- [ ] Título no formato "NEXUS - [Tópico]"
- [ ] Links para CSS corretos: `../../css/style.css`
- [ ] Links para JS corretos: `../../js/matrix-rain.js`, `../../js/theme-switcher.js`, `../../js/print-mode.js`
- [ ] KaTeX incluído (CSS e JS)
- [ ] Navegação com links para index.html, recursos.html, dashboard.html
- [ ] Botão "VOLTAR" ao final
- [ ] Canvas para matrix-rain incluído
- [ ] Painel de seletor de temas completo (14 temas)

### Conteúdo Matemático
- [ ] Todas as definições estão numeradas (Definição X.Y)
- [ ] Todos os teoremas estão numerados (Teorema X.Y)
- [ ] Demonstrações ou justificativas incluídas quando apropriado
- [ ] Notação matemática precisa e consistente
- [ ] Conjuntos numéricos declarados corretamente (@\mathbb{R}@, etc.)
- [ ] Mínimo 4-6 exemplos resolvidos incluídos
- [ ] Exemplos com progressão de dificuldade
- [ ] 10-15 exercícios propostos
- [ ] Respostas dos exercícios em comentário HTML

### Formatação LaTeX
- [ ] Delimitadores corretos: `@@...@@` (display) e `@...@` (inline)
- [ ] Fórmulas renderizam corretamente
- [ ] Alinhamentos com `\begin{align}...\end{align}` quando necessário
- [ ] Símbolos matemáticos corretos

### Classes CSS
- [ ] `.destaque-box.definicao` usado para definições
- [ ] `.destaque-box.teorema` usado para teoremas
- [ ] `.destaque-box.observacao` usado para observações/corolários
- [ ] `.exemplo-resolvido` usado para exemplos
- [ ] `.nota` usado para notas importantes
- [ ] `.lista-propriedades` usado para listas de propriedades

### Qualidade Pedagógica
- [ ] Progressão lógica de conceitos
- [ ] Linguagem acessível mas rigorosa
- [ ] Exemplos contextualizados
- [ ] Conexão entre conceitos abstratos e aplicações práticas
- [ ] Vocabulário técnico explicado

### Compatibilidade
- [ ] Funciona com sistema de temas (variáveis CSS)
- [ ] Compatível com modo de impressão
- [ ] Responsivo para mobile
- [ ] Sem SVG (usar apenas KaTeX para visualizações matemáticas)

---

## Observações Finais

- **Qualidade sobre quantidade:** Prefira menos conteúdo bem explicado do que muito conteúdo superficial
- **Consistência:** Mantenha numeração e formatação consistentes ao longo do documento
- **Revisão:** Sempre revise demonstrações matemáticas e cálculos
- **Acessibilidade:** Use alt text quando necessário, garanta contraste de cores
- **Print-mode:** Todo conteúdo deve ser legível em modo de impressão (preto e branco)

---

**Versão:** 1.0
**Última atualização:** 2025-10-02
**Projeto:** Nexus - Portal Educacional de Matemática

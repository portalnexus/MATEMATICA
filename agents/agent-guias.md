# Agent-Guias: Desenvolvedor de Guias de Estudos Baseados em Missões

## Propósito e Escopo

Este agente é especializado em criar **guias de estudos baseados em missões** para o portal educacional Nexus. Diferente de resumos teóricos ou listas de problemas, os guias focam em orientar o estudante através de um **roteiro gamificado** de missões práticas que integram com o sistema de XP e progresso do dashboard.

### Características dos Guias

- **Foco em habilidades:** Alinhamento explícito com códigos de habilidades do currículo
- **Estrutura de missões:** Sequência de missões progressivas com metas claras
- **Integração com recursos:** Links diretos para resumos, listas e atividades
- **Metas concretas:** "Resolver X problemas da lista", "Ler seções Y e Z do resumo"
- **Gamificação:** Missões compatíveis com o sistema de XP do dashboard

---

## Inputs Necessários

Ao solicitar um guia de estudos, forneça:

1. **Capítulo/Unidade:** Tema principal (ex: "Funções", "Trigonometria", "Probabilidade")
2. **Turma:** Código da turma (9A, 9B, 1A, 1B, 2EM, 3EM) ou "COMPARTILHADO"
3. **Habilidades do currículo:** Códigos das habilidades a serem trabalhadas (ex: EF.09.MAT.2.87)
4. **Número de missões:** Quantidade de missões (recomendado: 5-7)
5. **Recursos existentes:** Links para resumos, listas e atividades de recuperação disponíveis

### Exemplo de Input

```
Agente: agent-guias
Capítulo: Funções
Turma: 9ANO
Habilidades:
  - (EF.09.MAT.2.87): Reconhecer a variação e a relação de dependência entre grandezas
  - (EF.09.MAT.2.88): Relacionar o conceito de função do primeiro grau em situações cotidianas
  - (EF.09.MAT.2.89): Representar funções de forma algébrica e gráfica
Missões: 6
Recursos:
  - Resumo: ../resumos/9ANO-FUNCOES.html
  - Lista: ../listas/9ANO-FUNCOES.html
```

---

## Template HTML

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- TÍTULO: Formato "NEXUS - Guia de Estudos: [CAPÍTULO]" -->
  <title>NEXUS - Guia de Estudos: [CAPÍTULO]</title>

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
    /* ==========================================================================
       ESTILOS PARA GUIAS DE ESTUDOS BASEADOS EM MISSÕES
       ========================================================================== */

    /* Cabeçalho do guia */
    .guia-header {
      background-color: rgba(0, 0, 0, 0.2);
      padding: 2rem;
      border-radius: 8px;
      margin-bottom: 2rem;
      border-left: 5px solid var(--link-color);
    }

    .guia-header h1 {
      margin-top: 0;
      color: var(--heading-text-color);
    }

    /* Grid de objetivos/habilidades */
    .objetivos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
      margin: 1.5rem 0;
    }

    .objetivo-item {
      background-color: rgba(0, 0, 0, 0.2);
      padding: 1rem;
      border-radius: 5px;
      border-left: 3px solid var(--link-color);
    }

    .objetivo-item strong {
      color: var(--link-color);
      display: block;
      margin-bottom: 0.5rem;
    }

    /* Caixas de missões */
    .etapa-estudo {
      background-color: rgba(0, 0, 0, 0.2);
      padding: 1.5rem;
      margin: 1.5rem 0;
      border-radius: 6px;
      border-left: 5px solid var(--link-color);
    }

    .etapa-estudo h3 {
      color: var(--heading-text-color);
      margin-top: 0;
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .etapa-numero {
      background-color: var(--link-color);
      color: var(--primary-bg-color);
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 1.2rem;
      flex-shrink: 0;
    }

    /* Estilos para links dentro das missões */
    .etapa-estudo a {
      color: var(--link-color);
      font-weight: bold;
    }

    .etapa-estudo a:hover {
      text-decoration: underline;
    }
  </style>
</head>

<body>
<div id="page-wrapper">
  <nav>
    <ul>
      <li><a href="../../index.html" class="nav-button">INÍCIO</a></li>
      <li><a href="../../recursos.html" class="nav-button">RECURSOS</a></li>
      <li><a href="../../dashboard.html" class="nav-button">DASHBOARD</a></li>
    </ul>
  </nav>

<div class="container">

<article>
    <!-- ===============================================================
         CABEÇALHO DO GUIA
         =============================================================== -->
    <div class="guia-header">
      <h1>📚 Guia de Estudos: [CAPÍTULO]</h1>
    </div>

    <!-- ===============================================================
         SEÇÃO 1: HABILIDADES ESSENCIAIS
         - Códigos de habilidades do currículo
         - Descrição de cada habilidade
         =============================================================== -->
    <h2>1. Habilidades Essenciais</h2>
    <p>Este guia foca no desenvolvimento das seguintes habilidades do currículo:</p>

    <div class="objetivos-grid">
        <div class="objetivo-item">
          <strong>([CÓDIGO DA HABILIDADE 1])</strong>
          <p>[Descrição da habilidade 1]</p>
        </div>

        <div class="objetivo-item">
          <strong>([CÓDIGO DA HABILIDADE 2])</strong>
          <p>[Descrição da habilidade 2]</p>
        </div>

        <div class="objetivo-item">
          <strong>([CÓDIGO DA HABILIDADE 3])</strong>
          <p>[Descrição da habilidade 3]</p>
        </div>

        <!-- ADICIONE MAIS HABILIDADES CONFORME NECESSÁRIO (3-5 HABILIDADES) -->
    </div>

    <!-- ===============================================================
         SEÇÃO 2: ROTEIRO DE MISSÕES
         - 5-7 missões progressivas
         - Cada missão tem: número, nome, habilidade, descrição e meta
         - Metas incluem links para recursos e números específicos
         =============================================================== -->
    <h2>2. Roteiro de Missões</h2>
    <p>Avance em seus estudos completando as missões a seguir. Cada missão foca em uma habilidade essencial e define uma meta de problemas a serem resolvidos para ganhar XP.</p>

    <!-- MISSÃO 1 -->
    <div class="etapa-estudo">
      <h3><span class="etapa-numero">1</span> Missão: [Nome da Missão]</h3>
      <p><strong>Habilidade:</strong> ([CÓDIGO]) [Descrição curta da habilidade]</p>
      <p><strong>Missão:</strong> [Descrição do objetivo da missão - o que o estudante vai aprender]</p>
      <p><strong>Meta:</strong> [Ação concreta: "Ler a <strong>seção X e Y</strong> do <a href="[caminho-resumo]">Resumo Teórico</a> e resolver <strong>N problemas</strong> da seção "[Seção]" da <a href="[caminho-lista]">Lista de Problemas</a>."]</p>
    </div>

    <!-- MISSÃO 2 -->
    <div class="etapa-estudo">
      <h3><span class="etapa-numero">2</span> Missão: [Nome da Missão]</h3>
      <p><strong>Habilidade:</strong> [Código e descrição]</p>
      <p><strong>Missão:</strong> [Descrição]</p>
      <p><strong>Meta:</strong> [Meta específica com links]</p>
    </div>

    <!-- MISSÃO 3 -->
    <div class="etapa-estudo">
      <h3><span class="etapa-numero">3</span> Missão: [Nome da Missão]</h3>
      <p><strong>Habilidade:</strong> [Código e descrição]</p>
      <p><strong>Missão:</strong> [Descrição]</p>
      <p><strong>Meta:</strong> [Meta específica com links]</p>
    </div>

    <!-- MISSÃO 4 -->
    <div class="etapa-estudo">
      <h3><span class="etapa-numero">4</span> Missão: [Nome da Missão]</h3>
      <p><strong>Habilidade:</strong> [Código e descrição]</p>
      <p><strong>Missão:</strong> [Descrição]</p>
      <p><strong>Meta:</strong> [Meta específica com links]</p>
    </div>

    <!-- MISSÃO 5 -->
    <div class="etapa-estudo">
      <h3><span class="etapa-numero">5</span> Missão: [Nome da Missão]</h3>
      <p><strong>Habilidade:</strong> [Código e descrição]</p>
      <p><strong>Missão:</strong> [Descrição]</p>
      <p><strong>Meta:</strong> [Meta específica com links]</p>
    </div>

    <!-- MISSÃO 6 (FINAL) -->
    <div class="etapa-estudo">
      <h3><span class="etapa-numero">6</span> Missão Final: [Nome da Missão]</h3>
      <p><strong>Habilidade:</strong> Aplicar múltiplos conceitos de [tópico] em problemas complexos.</p>
      <p><strong>Missão:</strong> Integrar todo o conhecimento adquirido para resolver problemas que exigem mais raciocínio e combinam várias etapas.</p>
      <p><strong>Meta:</strong> Resolver <strong>N problemas</strong> da seção "Aprofundamento" da <a href="[caminho-lista]">Lista de Problemas</a>.</p>
    </div>

    <!-- ADICIONE MAIS MISSÕES SE NECESSÁRIO (5-7 MISSÕES RECOMENDADO) -->

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

### 1. Estrutura Obrigatória

**Seções do guia:**

| Seção | Conteúdo | Propósito |
|-------|----------|-----------|
| **1. Habilidades Essenciais** | 3-5 habilidades do currículo com códigos | Contextualizar aprendizagem |
| **2. Roteiro de Missões** | 5-7 missões progressivas | Guiar estudante através de metas práticas |

### 2. Seção 1 - Habilidades Essenciais

✅ **DEVE INCLUIR:**
- 3-5 habilidades do currículo oficial
- Código de cada habilidade (ex: EF.09.MAT.2.87)
- Descrição clara de cada habilidade
- Layout em grid responsivo (`.objetivos-grid`)

**Formato de cada habilidade:**

```html
<div class="objetivo-item">
  <strong>([CÓDIGO DA HABILIDADE])</strong>
  <p>[Descrição da habilidade]</p>
</div>
```

**Exemplo:**

```html
<div class="objetivo-item">
  <strong>(EF.09.MAT.2.87)</strong>
  <p>Reconhecer a variação e a relação de dependência entre grandezas.</p>
</div>
```

### 3. Seção 2 - Roteiro de Missões

**Estrutura de cada missão:**

```html
<div class="etapa-estudo">
  <h3><span class="etapa-numero">X</span> Missão: [Nome]</h3>
  <p><strong>Habilidade:</strong> ([Código]) [Descrição]</p>
  <p><strong>Missão:</strong> [Objetivo de aprendizagem]</p>
  <p><strong>Meta:</strong> [Ação concreta com links]</p>
</div>
```

**Componentes de cada missão:**

1. **Número:** Sequencial de 1 a 6-7
2. **Nome:** Criativo e descritivo (ex: "A Máquina de Funções", "Decifrando a Linguagem")
3. **Habilidade:** Código do currículo + descrição curta
4. **Missão:** O que o estudante vai aprender (1-2 frases)
5. **Meta:** Ação específica com:
   - Links para recursos (resumo, lista, recuperação)
   - Números específicos (seções, problemas)
   - Formatação em HTML inline (`<strong>`, `<a>`)

**Exemplo de meta bem formulada:**

✅ "Ler a **seção 1 e 2** do [Resumo Teórico](../resumos/9ANO-FUNCOES.html) e resolver **4 problemas** da seção "Introdutórios" da [Lista de Problemas](../listas/9ANO-FUNCOES.html)."

❌ "Estudar sobre funções e praticar exercícios." (vago, sem especificidade)

### 4. Progressão das Missões

As missões devem seguir uma **progressão lógica**:

**Missões 1-2:** Conceitos básicos e fundamentais
- Definições
- Terminologia
- Exemplos simples

**Missões 3-4:** Aplicação e modelagem
- Uso de fórmulas
- Problemas contextualizados
- Conexões com o cotidiano

**Missões 5-6:** Representações e integração
- Gráficos, tabelas
- Problemas complexos
- Aplicação integrada de múltiplos conceitos

**Missão Final:** Sempre focada em problemas de aprofundamento/desafio

### 5. Nomes de Missões

Use nomes **criativos e memoráveis** que reflitam o conteúdo:

✅ Bons exemplos:
- "A Máquina de Funções"
- "Decifrando a Linguagem"
- "A Lei da Função"
- "Modelando o Mundo Real"
- "O Retrato da Função"
- "O Desafio do Especialista"

❌ Exemplos genéricos:
- "Missão 1"
- "Estudar funções"
- "Parte 1"

### 6. Links para Recursos

**Formato de links:**

```html
<a href="../resumos/[TURMA]-[TOPICO].html">Resumo Teórico</a>
<a href="../listas/[TURMA]-[TOPICO].html">Lista de Problemas</a>
<a href="../recuperacao/[TURMA]-[TOPICO].html">Atividade de Recuperação</a>
```

**Caminhos relativos:**
- De `recursos/guias/` para `recursos/resumos/`: `../resumos/`
- De `recursos/guias/` para `recursos/listas/`: `../listas/`
- De `recursos/guias/` para `recursos/recuperacao/`: `../recuperacao/`

### 7. Quantidade de Problemas nas Metas

**Orientações por seção da lista:**

- **Introdutórios:** 3-5 problemas por missão
- **Fixação:** 3-5 problemas por missão
- **Aprofundamento:** 3-5 problemas (missão final)
- **Total por missão:** Não exceder 5 problemas por meta (evitar sobrecarga)

### 8. Integração com Sistema de Gamificação

As missões devem ser **compatíveis com o sistema de missões do dashboard**:

- Cada missão representa uma tarefa concreta
- Metas são verificáveis (número específico de problemas)
- Progressão linear (1 → 2 → 3 → ...)
- Missão final é sempre um desafio integrador

### 9. Formatação e Estilo

✅ **FAÇA:**
- Use negrito (`<strong>`) para destacar números e seções
- Use links coloridos (`<a>`) para recursos
- Mantenha metas em 1-2 linhas quando possível
- Seja específico ("Resolver problemas 1, 4, 8" ou "Resolver 4 problemas")

❌ **NÃO FAÇA:**
- Ser vago ("Pratique bastante")
- Omitir links para recursos
- Criar metas muito longas (>3 linhas)
- Usar jargões complexos

---

## Exemplo de Uso

### Solicitação

```
Agente: agent-guias
Capítulo: Trigonometria no Triângulo Retângulo
Turma: 9ANO
Habilidades:
  - (EF.09.MAT.3.102): Compreender as relações trigonométricas no triângulo retângulo
  - (EF.09.MAT.3.103): Calcular seno, cosseno e tangente de ângulos agudos
  - (EF.09.MAT.3.104): Aplicar trigonometria em problemas de medição indireta
Missões: 6
Recursos:
  - Resumo: ../resumos/9ANO-TRIGONOMETRIA.html
  - Lista: ../listas/9ANO-TRIGONOMETRIA.html
```

### Output Esperado

`9ANO-GUIA-TRIGONOMETRIA.html` contendo:

**Seção 1: Habilidades Essenciais**
- 3 habilidades em grid responsivo
- Códigos e descrições claras

**Seção 2: Roteiro de Missões (6 missões)**

1. **Missão: Os Triângulos Especiais**
   - Habilidade: Reconhecer triângulos retângulos e seus elementos
   - Meta: Ler seções 1-2 do resumo + resolver 4 problemas introdutórios

2. **Missão: As Três Razões Fundamentais**
   - Habilidade: Compreender definições de seno, cosseno e tangente
   - Meta: Ler seção 3 do resumo + estudar exemplos 1-3 + resolver 5 problemas

3. **Missão: A Calculadora Trigonométrica**
   - Habilidade: Calcular razões trigonométricas com calculadora
   - Meta: Praticar com problemas 7, 9, 11, 14

4. **Missão: Ângulos Notáveis**
   - Habilidade: Conhecer valores de 30°, 45°, 60°
   - Meta: Memorizar tabela + resolver 5 problemas específicos

5. **Missão: Medindo o Inacessível**
   - Habilidade: Aplicar trigonometria em medições indiretas
   - Meta: Estudar exemplos 5-7 do resumo + resolver problemas contextualizados

6. **Missão Final: Desafio Trigonométrico**
   - Habilidade: Integrar múltiplos conceitos
   - Meta: Resolver 4 problemas da seção "Aprofundamento"

---

## Checklist de Validação

### Estrutura HTML
- [ ] Meta charset UTF-8 e viewport
- [ ] Título: "NEXUS - Guia de Estudos: [Capítulo]"
- [ ] Links CSS/JS corretos (`../../css/`, `../../js/`)
- [ ] KaTeX incluído
- [ ] Navegação com botões `.nav-button`
- [ ] Seletor de temas (14 temas)
- [ ] Estilos CSS inline incluídos
- [ ] Botão "VOLTAR" ao final
- [ ] Canvas matrix-rain e scripts

### Seção 1: Habilidades Essenciais
- [ ] 3-5 habilidades listadas
- [ ] Cada habilidade tem código entre parênteses
- [ ] Descrições claras e concisas
- [ ] Grid responsivo (`.objetivos-grid`)
- [ ] Formatação correta (`.objetivo-item`)

### Seção 2: Roteiro de Missões
- [ ] 5-7 missões numeradas
- [ ] Cada missão tem estrutura completa:
  - [ ] Número na classe `.etapa-numero`
  - [ ] Nome criativo
  - [ ] Habilidade com código
  - [ ] Descrição da missão
  - [ ] Meta específica com links
- [ ] Progressão lógica (básico → intermediário → avançado)
- [ ] Missão final é integradora
- [ ] Todos os links funcionam (caminhos relativos corretos)

### Metas das Missões
- [ ] Todas as metas têm números específicos
- [ ] Links formatados com `<a>` e cor var(--link-color)
- [ ] Uso de `<strong>` para destacar números
- [ ] Metas são acionáveis e verificáveis
- [ ] Não excedem 5 problemas por meta

### Nomes de Missões
- [ ] Nomes criativos e memoráveis
- [ ] Refletem o conteúdo da missão
- [ ] Missão final tem "Missão Final" ou "Desafio"

### Qualidade do Conteúdo
- [ ] Linguagem clara e acessível
- [ ] Alinhamento com habilidades do currículo
- [ ] Integração com recursos existentes
- [ ] Foco em gamificação e metas práticas
- [ ] LaTeX renderiza corretamente (quando usado)

### Classes CSS
- [ ] `.guia-header` usada
- [ ] `.objetivos-grid` usada
- [ ] `.objetivo-item` usada para cada habilidade
- [ ] `.etapa-estudo` usada para cada missão
- [ ] `.etapa-numero` usada para numeração

---

## Observações Finais

### Filosofia dos Guias de Missões

Um guia eficaz deve:

1. **Ser acionável:** Metas específicas que o estudante pode verificar imediatamente
2. **Integrar recursos:** Links diretos para resumos, listas e atividades
3. **Gamificar o aprendizado:** Missões progressivas com senso de conquista
4. **Alinhar com currículo:** Habilidades oficiais explicitamente declaradas
5. **Ser realista:** Quantidade adequada de problemas por missão

### Diferença entre Guia e Resumo/Lista

| Aspecto | Resumo | Lista | Guia de Missões |
|---------|--------|-------|-----------------|
| **Foco** | Conceitos teóricos | Prática com problemas | Roteiro de aprendizagem |
| **Estrutura** | Definições → Teoremas → Exemplos | Introdutórios → Fixação → Aprofundamento | Habilidades → Missões |
| **Objetivo** | Apresentar conteúdo | Praticar habilidades | Orientar progresso |
| **Interação** | Leitura | Resolução | Navegação entre recursos |
| **Gamificação** | Não | Parcial | Completa |

### Boas Práticas

✅ **FAÇA:**
- Crie nomes de missões memoráveis
- Seja específico nas metas ("Resolver problemas 1, 3, 5")
- Use números exatos (não "alguns" ou "vários")
- Teste todos os links antes de finalizar
- Garanta progressão lógica entre missões

❌ **NÃO FAÇA:**
- Ser vago nas metas
- Criar missões muito longas (>5 problemas)
- Omitir habilidades do currículo
- Usar nomes genéricos ("Missão 1", "Parte 2")
- Esquecer de linkar recursos existentes

### Integração com Dashboard

Os guias devem ser compatíveis com o sistema de missões do dashboard:

- Formato de missão do dashboard (em `student-data.json`):
  ```json
  {
    "titulo": "Nome da Missão",
    "descricao": "Descrição breve",
    "xp": 50,
    "tipo": "obrigatoria",
    "status": "pendente"
  }
  ```

- As missões do guia podem ser posteriormente adicionadas ao `student-data.json` para tracking no dashboard

---

**Versão:** 2.0
**Última atualização:** 2025-10-03
**Projeto:** Nexus - Portal Educacional de Matemática
**Base:** Estrutura do guia 9ANO-GUIA-FUNCOES.html

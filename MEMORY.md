# 🧠 MEMÓRIA OPERACIONAL DO PORTAL NEXUS (MEMORY.md)
*Última atualização: Sessão de 30/09/2026 — Expansão Universal & Gabaritos Secretos*

Este arquivo é a fonte primordial de continuidade para o **Antigravity** e qualquer agente de IA que atue no repositório **Portal Nexus**. Ele sintetiza as convenções arquiteturais, segredos operacionais, regras pedagógicas e o estado histórico do projeto.

---

## 🎯 1. Princípios e Regras Fundamentais

## 🎯 1. Princípios e Regras Fundamentais

1. **Tipografia Acadêmica de Excelência (Cambria Math & Equivalentes)**:
   - **Tipografia Principal**: `Cambria Math` e `Cambria`, emparelhadas com `Caladea` (clone métrico aberto do Cambria no Google Fonts) e `STIX Two Text` (fonte científica de referência). Para código e valores monospaçados, utiliza-se `Fira Code`.
   - Essa escolha confere harmonia total entre o texto corrido e as fórmulas em KaTeX (que utilizam tipos serifados como Computer Modern).
2. **Chuva de Matrix Matemática (Essencial)**:
   - O canvas `#matrixCanvas` com caracteres matemáticos (`∫`, `Σ`, `π`, `√`, `α`, `β`, `∇`, `ħ`, etc.) é **essencial** e fica **ativo por padrão em todos os temas comuns** (`display: block`).
   - Cada tema possui sua própria cor temática de rastro para a chuva (ex: azul celeste no Slate, azul no Paper Claro, âmbar no Sépia, verde no Retrô).
3. **Tema "Limpo & Impressão" (`theme-clean-print`)**:
   - Disponível na lista de seleção de temas como alternativa minimalista.
   - Inspirado no formato para impressão das páginas de recursos: fundo branco puro (`#ffffff`), texto preto (`#000000`), sem sombras e **com a chuva de matrix desabilitada** (`#matrixCanvas { display: none !important; }`), interrompendo o ciclo de renderização no script para economia e foco absoluto.
4. **Paleta de 7 Temas Curados**:
   - 🔘 Neutro Slate (Padrão + Matrix)
   - 🖨️ Limpo & Impressão (Clean Paper / Sem Matrix)
   - ☀️ Neutro Claro (Paper + Matrix)
   - 📜 Sépia Acadêmico (+ Matrix)
   - 🌑 Dark Grafite (+ Matrix)
   - ⚡ Alto Contraste AAA (+ Matrix)
   - 🟢 Matrix Retrô Cyber (+ Matrix)
5. **Rigor Matemático & Didático**:
   - Padrão FME (Fundamentos de Matemática Elementar - Iezzi) e OBMEP.
   - Notação matemática via **KaTeX** com delimitadores específicos:
     - **Inline**: `@ fórmula @` ou `\( fórmula \)`.
     - **Display**: `@@ fórmula @@` ou `\[ fórmula \]`.
   - Fórmulas com linhas nítidas sem sombras borradas (`text-shadow: none !important`).
6. **Gráficos e Visualizações (Zero CDN Pesado)**:
   - Utilizar exclusivamente **SVG vetorial nativo** e **HTML5 Canvas vanilla**, reagindo dinamicamente às variáveis CSS do tema.
4. **Governança de Código & Validação**:
   - Antes de qualquer finalização ou commit, **sempre rodar**:
     ```bash
     python3 scripts/validate_nexus.py && python3 scripts/validate_data.py
     ```
   - Taxa de conformidade exigida: **100% de aprovação**, 0 links quebrados, 0 páginas órfãs.

---

## 🔑 2. A Regra de Ouro dos Gabaritos: O Segredo do Professor (`Ctrl+U`)

Esta é uma diretriz inviolável solicitada pessoalmente pelo usuário/professor:

> **O gabarito com resoluções comentadas NÃO pode ser visível na página HTML comum sob nenhuma circunstância. Não devem existir botões clicáveis, `<details>`, `<summary>` ou menus que permitam ao aluno ver o gabarito. Ele é um truque pessoal para o professor conferir pressionando `Ctrl+U` no Google Chrome.**

### Especificação Canônica do Gabarito:
- **Localização**: Imediatamente antes do botão de retorno no final da página:
  ```html
  <div style="text-align: center; margin-top: 30px;">
      <a href="../../recursos.html" class="themed-button">VOLTAR</a>
  </div>
  ```
- **Sintaxe de Comentário HTML**:
  ```html
  <!-- ============================================================================
       GABARITO SECRETO DO PROFESSOR (ACESSO EXCLUSIVO VIA CTRL+U NO NAVEGADOR)
       RESOLUÇÕES E RESPOSTAS COMENTADAS DETALHADAS:

  <div class="gabarito-content">

      [--- SEÇÃO 1 NO GABARITO ---]
      <div class="gabarito-secao">
        <h3>Seção 1: Problemas Introdutórios</h3>
        <ol>
          <li>
            <span class="gabarito-item-titulo">Solução:</span><br>
            Passo a passo com KaTeX @x = \frac{-b \pm \sqrt{\Delta}}{2a}@...<br>
            <strong>Resposta:</strong> @S = \{1, 5\}@.
          </li>
          ...
        </ol>
      </div>

      [--- SEÇÃO 2 NO GABARITO ---]
      ...
  </div>
  ============================================================================ -->
  ```
- **Atenção Crítica de Sintaxe**: **NUNCA** use `-->` dentro do comentário do gabarito. Utilize divisores como `[--- SEÇÃO X NO GABARITO ---]` para evitar fechamento precoce da tag de comentário.
- **Status Atual**: **100% de conformidade**. Todas as 51 listas em `recursos/listas/` e todas as 35 atividades em `recursos/recuperacao/` (totalizando 86 arquivos pedagógicos) possuem o gabarito secreto implementado com **0 tags `<details>` ou soluções visíveis**.

---

## 🏛️ 3. Estrutura de Diretórios e Navegação

```
MATEMATICA/
├── index.html                   # Página inicial do portal (Design Neutro Slate)
├── recursos.html                # Catálogo unificado com filtros por turma
├── python.html                  # Hub de programação matemática
├── dashboard.html               # Painel de gamificação e progresso do estudante
├── css/style.css                # Folha de estilos com tema sóbrio Neutro Slate e 6 temas curados
├── js/                          # Scripts modulares (matrix-rain, theme-switcher, print-mode)
├── data/                        # Persistência de dados locais (student-data.json, etc.)
├── scripts/
│   ├── validate_nexus.py        # Validador universal de integridade (links, tags, órfãos)
│   └── validate_data.py         # Validador de esquemas e consistência JSON
├── docs/
│   ├── curriculo/               # Ementas oficiais por série: 9ANO-MD.md, 1EM-MD.md, 2EM-MD.md, 3EM-MD.md
│   └── agents/                  # Batalhão de agentes: agent-resumos.md, agent-listas.md, agent-recuperacao.md,
│                                # agent-guias.md, agent-graficos.md, agent-ferramentas.md, INDEX.md, etc.
└── recursos/
    ├── resumos/                 # Teoria aprofundada, teoremas e deduções
    ├── listas/                  # Coleções de problemas em 4 níveis com gabarito secreto Ctrl+U
    ├── recuperacao/             # Scaffolding pedagógico gradual de reforço
    ├── guias/                   # Roteiros de aprendizagem gamificados (Missões e XP)
    ├── ferramentas/             # Calculadoras visuais (SVG/Canvas)
    └── python/                  # Tutoriais práticos de Python matemático
```

---

## 📚 4. Cobertura Curricular (100% Alcançada)

O Portal Nexus opera com a garantia de que **todo tópico** possui o quarteto formativo:
1. **Resumo Teórico**
2. **Lista de Problemas** (com Gabarito Secreto `Ctrl+U`)
3. **Atividade de Recuperação**
4. **Guia de Estudos**

### Tópicos Oficiais por Turma:
- **9º Ano (9 tópicos)**:
  1. Números Reais e Radiciação
  2. Produtos Notáveis e Fatoração
  3. Equações do 1º Grau (Introdução e Problemas)
  4. Equações do 2º Grau
  5. Introdução ao Estudo das Funções
  6. Razão, Proporção e Regra de Três
  7. Teorema de Tales e Semelhança de Triângulos
  8. Teorema de Pitágoras e Trigonometria no Triângulo Retângulo
  9. Estatística e Probabilidade Básica
- **1º Ano EM (10 tópicos)**:
  1. Conjuntos Numéricos e Intervalos Reais
  2. Notação Científica e Ordem de Grandeza
  3. Unidades de Medida e Conversão
  4. Progressões Aritméticas e Geométricas
  5. Função Afim (1º Grau)
  6. Função Quadrática (2º Grau)
  7. Função Exponencial e Logaritmos
  8. Trigonometria Fundamental
  9. Áreas e Perímetros de Figuras Planas
  10. Estatística Descritiva e Probabilidade
- **2º Ano EM (7 tópicos)**:
  1. Geometria Espacial (Prismas, Pirâmides, Cilindros, Cones, Esferas)
  2. Ladrilhamento e Polígonos Regulares
  3. Matrizes e Determinantes
  4. Matemática Financeira
  5. Finanças com Progressões
  6. Estatística e Amostragem
  7. Análise Combinatória e Probabilidade
- **3º Ano EM (7 tópicos)**:
  1. Sistemas Lineares
  2. Geometria Analítica (Ponto, Reta, Circunferência)
  3. Parábolas e Otimização
  4. Trigonometria no Ciclo Trigonométrico
  5. Proporção e Porcentagem Aplicada
  6. Volumes e Princípio de Cavalieri
  7. Cartografia Matemática e Esfera Terrestre

---

## 🛠️ 5. Ferramentas e Calculadoras do Portal (`recursos/ferramentas/`)

| Ferramenta | Tecnologias | Funcionalidades |
| :--- | :--- | :--- |
| `calculadora-areas-volumes.html` | SVG Dinâmico + KaTeX | 9 figuras 2D/3D com cotas atualizadas em tempo real |
| `calculadora-estatistica.html` | SVG Nativo + JavaScript | Histograma com bins dinâmicos, Boxplot interativo e memória de cálculo |
| `calculadora-funcoes.html` | HTML5 Canvas 2D | Gráfico de funções afins e quadráticas, raízes, vértice e rastreio de cursor |
| `calculadora-progressoes.html` | HTML5 Canvas + Animação | Curvas comparativas de PA vs PG e somas finitas/infinitas |
| `calculadora-trigonometria.html` | HTML5 Canvas + SVG | Ciclo trigonométrico interativo, projeções de sen/cos/tg e triângulo retângulo |
| `calculadora-matrizes-sistemas.html` | JavaScript Vanilla + KaTeX | Determinantes 2x2/3x3, inversão matricial e sistemas lineares via Regra de Cramer |
| `calculadora-combinatoria-probabilidade.html` | HTML5 Canvas + KaTeX | Permutação, arranjo, combinação, Triângulo de Pascal e simulação gráfica binomial |

---

## 📜 6. Histórico de Versões e Marcos Recentes

- **Sessão Atual (30/09/2026) — Cambria Math, Chuva Matrix Universal & Tema Limpo/Impressão**:
  - **Tipografia Cambria Math**:
    - Migração para `Cambria Math`, `Cambria`, `Caladea` (Google Fonts) e `STIX Two Text`, alinhando a tipografia do portal com a melhor tradição de periódicos científicos e com a estética clássica do KaTeX.
  - **Chuva de Matrix Matemática Universal**:
    - Reativação essencial da chuva de matrix matemática (`display: block` em `#matrixCanvas`) para todos os temas comuns.
    - Cada tema possui sua própria cor temática de rastro para a chuva (azul celeste no Slate, azul no Paper Claro, âmbar no Sépia, verde no Retrô).
  - **Novo Tema Selecionável: "Limpo & Impressão" (`theme-clean-print`)**:
    - Adicionado à lista de seleção de temas como alternativa minimalista inspirada no formato de impressão das páginas de recursos.
    - Fundo branco puro (`#ffffff`), texto preto (`#000000`), sem sombras e **sem chuva de matrix** (`display: none !important`), pausando o loop de renderização para leitura limpa e focada.
  - **Gabaritos Secretos do Professor (Ctrl+U)**:
    - 100% das 51 listas e 35 recuperações protegidas exclusivamente em comentários HTML.
  - Aprovação de 100% dos testes da suíte `scripts/validate_nexus.py` e `scripts/validate_data.py`.

- **Commit `2b25f73` (30/09/2026)**:
  - Criação de 33 recursos pedagógicos completando 100% da ementa.
  - Implementação das 2 novas calculadoras e refatoração visual das 5 existentes.
  - Conversão e criação dos **Gabaritos Secretos do Professor via `Ctrl+U`** em todas as 51 listas de exercícios.
  - Eliminação completa de tags visíveis `<details>`.
  - Aprovação integral em `scripts/validate_nexus.py` e `scripts/validate_data.py`.

---

## 💡 7. Instruções para Futuros Agentes de IA

1. Ao criar qualquer nova lista de problemas:
   - Siga o modelo de [`TEMPLATE-LISTA-PROBLEMAS.html`](file:///home/heimdall/github/MATEMATICA/recursos/listas/TEMPLATE-LISTA-PROBLEMAS.html).
   - Inclua obrigatoriamente o gabarito secreto nos moldes do **Item 2 deste arquivo**.
   - **NUNCA** deixe o gabarito exposto em tags `<details>` ou em texto visível ao aluno.
2. Ao adicionar páginas HTML:
   - Inclua link correspondente em `recursos.html` com os atributos `data-class` adequados.
   - Use o boilerplate padrão do Nexus (`matrixCanvas`, `theme-config-icon`, `theme-switcher.js`, KaTeX auto-render).
3. Sempre teste a integridade com:
   ```bash
   python3 scripts/validate_nexus.py && python3 scripts/validate_data.py
   ```

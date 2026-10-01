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

- **Sessão Atual (30/09/2026) — Revamp do Dashboard (Tags 4L+3N & Admin), Padronização de Listas & KaTeX Zero-Error**:
  - **Auditoria KaTeX Global (Zero-Error)**:
    - Correção do erro de parsing em `recursos/resumos/9ANO-CONJUNTOS.html` (Definição 2.6: `@|A|@ ou @\# A@`).
    - Correção de delimitador em `recursos/listas/3EM-SISTEMAS-LINEARES.html` (linha 732).
    - 0 erros em todos os 182 arquivos HTML do repositório.
  - **Revamp do Dashboard & Autenticação Segura**:
    - **Tag do Estudante**: Formato rigoroso de **4 letras + 3 números** (ex: `BEAT901`, `GABR902`, `LUCA101`, `CLAR102`, `JULI201`, `RAFA301`). Regex `/^[A-Z]{4}\d{3}$/`.
    - **Tag Admin do Professor**: Chave exclusiva `"twdzujqr369"`.
    - **Campo de Digitação Mascarado**: Input `type="password"` com botão de toggle de visualização (`👁️` / `🔒`), mantendo a tag oculta por padrão.
    - **Omissão dos botões de teste**: Remoção dos `#demo-chips` rápidos para privacidade e integridade.
    - **5 Dimensões Oficiais da Matemática**:
      1. `ALG` — Álgebra & Funções (Equações, Polinômios, Funções)
      2. `GEO` — Geometria & Medidas (Plana, Espacial, Analítica e Métrica)
      3. `NUM` — Números & Operações (Conjuntos, Progressões e Finanças)
      4. `EST` — Estatística & Probabilidade (Tratamento de Dados e Contagem)
      5. `LOG` — Raciocínio Lógico & Modelagem (Dedução e Resolução de Problemas)
    - **Metas e Missões Estritamente de Matemática**:
      - Conectadas diretamente aos Guias de Estudos (`recursos/guias/*.html`) e ementas curriculares (`docs/curriculo/`).
    - **Painel de Gestão Docente (Admin)**:
      - Grade de cards com avatar, tag, turma, média geral e missões concluídas.
      - Criação dinâmica de estudantes com auto-população de missões matemáticas conforme a turma selecionada.
      - Modal de edição completo: edição de informações, notas (tabela 3x5 para as 3 Etapas nas 5 Dimensões) e checklist de missões.
      - Persistência total via `localStorage` (`nexus_students_data`).
  - **Padronização Universal de Listas de Problemas (Benchmark `9ANO-FUNCOES.html`)**:
    - Padronização das 51 listas de exercícios com metadados unificados: `<div class="problema-meta"><span class="topico">...</span><span class="dificuldade [facil|media|dificil|desafio]">...</span><span>⏱️ X min</span></div>`.
    - Expansão de `3EM-LISTA-AREAS-COMPOSICAO.html` e `9ANO-LISTA-PITAGORAS-TRIGONOMETRIA.html` para 30 problemas graduados com resolução passo a passo comentada via `Ctrl+U`.
    - Remoção de estrelas redundantes e unificação do CSS de problemas em `css/style.css`.
  - **Apresentação Consistente da Página Inicial (`index.html`)**:
    - Reformulação da apresentação com ênfase no Ecossistema Acadêmico de Matemática, no Quarteto Didático, no Laboratório Python e no Terminal HUD.
  - **Validação Automatizada**:
    - 100% de sucesso em `scripts/validate_nexus.py` e `scripts/validate_data.py`.

---

## 💡 7. Instruções para Futuros Agentes de IA

1. Ao criar qualquer nova lista de problemas:
   - Siga o modelo de [`TEMPLATE-LISTA-PROBLEMAS.html`](file:///home/heimdall/github/MATEMATICA/recursos/listas/TEMPLATE-LISTA-PROBLEMAS.html) e o benchmark [`9ANO-FUNCOES.html`](file:///home/heimdall/github/MATEMATICA/recursos/listas/9ANO-FUNCOES.html).
   - Inclua sempre `<div class="problema-meta">` com tópico, dificuldade (`facil`, `media`, `dificil`, `desafio`) e estimativa de tempo `⏱️ X min`.
   - Inclua obrigatoriamente o gabarito secreto nos moldes do **Item 2 deste arquivo**.
   - **NUNCA** deixe o gabarito exposto em tags `<details>` ou em texto visível ao aluno.
2. Ao cadastrar estudantes no Dashboard:
   - Respeite o formato de tag **4 letras e 3 dígitos** (`/^[A-Z]{4}\d{3}$/`).
   - A tag admin do professor é estritamente `"twdzujqr369"`.
   - Sempre vincule missões e notas exclusivamente à Matemática e seus Guias de Estudo.
3. Ao adicionar páginas HTML:
   - Inclua link correspondente em `recursos.html` com os atributos `data-class` adequados.
   - Use o boilerplate padrão do Nexus (`matrixCanvas`, `theme-config-icon`, `theme-switcher.js`, KaTeX auto-render).
4. Sempre teste a integridade com:
   ```bash
   python3 scripts/validate_nexus.py && python3 scripts/validate_data.py
   ```


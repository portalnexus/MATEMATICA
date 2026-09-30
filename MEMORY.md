# 🧠 MEMÓRIA OPERACIONAL DO PORTAL NEXUS (MEMORY.md)
*Última atualização: Sessão de 30/09/2026 — Expansão Universal & Gabaritos Secretos*

Este arquivo é a fonte primordial de continuidade para o **Antigravity** e qualquer agente de IA que atue no repositório **Portal Nexus**. Ele sintetiza as convenções arquiteturais, segredos operacionais, regras pedagógicas e o estado histórico do projeto.

---

## 🎯 1. Princípios e Regras Fundamentais

1. **Estética Acadêmica Neutra, Sóbria e Elegante**:
   - **Tema Padrão Neutro Slate**: Fundo sóbrio em tom ardósia (`#0f172a`), caixas limpas (`#1e293b`), bordas discretas (`#334155`), sem efeitos pesados de neon ou text-shadows que borram KaTeX.
   - **Tipografia Moderna e Legível**: Títulos em `Fira Sans` (700) e badges/código em `Fira Code`. Fontes arcade pixeladas (`Press Start 2P`) foram substituídas por tipografia de excelência acadêmica.
   - **Matrix Rain Opcional**: O canvas `#matrixCanvas` fica desativado por padrão (`display: none;` com detecção de ciclo no script `matrix-rain.js`) para leitura focada e economia de recursos, sendo ativado apenas caso o usuário selecione expressamente o tema retrô.
   - **6 Temas Curados**: Neutro Slate (Padrão), Neutro Claro (Paper), Sépia Acadêmico, Dark Grafite, Alto Contraste AAA e Matrix Retrô (Opcional).
2. **Rigor Matemático & Didático**:
   - Padrão FME (Fundamentos de Matemática Elementar - Iezzi) e OBMEP.
   - Notação matemática via **KaTeX** com delimitadores específicos:
     - **Inline**: `@ fórmula @` ou `\( fórmula \)`.
     - **Display**: `@@ fórmula @@` ou `\[ fórmula \]`.
   - Fórmulas sem sombras borradas (`text-shadow: none !important`), garantindo contraste e legibilidade impecáveis.
3. **Gráficos e Visualizações (Zero CDN Pesado)**:
   - Utilizar exclusivamente **SVG vetorial nativo** e **HTML5 Canvas vanilla**.
   - Gráficos devem reagir dinamicamente às variáveis de tema CSS (`var(--link-color)`, `var(--main-text-color)`, `var(--card-bg)`, etc.).
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

- **Sessão Atual (30/09/2026) — Redesign Neutro & Gabaritos Universais de Recuperação**:
  - **Identidade Visual Sóbria e Acadêmica**:
    - Substituição do tema verde neon/arcade pelo novo padrão **Neutro Slate** (`#0f172a`, `#1e293b`, `#38bdf8`), com contrastes confortáveis e cores limpas.
    - Nova paleta com 6 temas curados: Neutro Slate (Padrão), Neutro Claro (Paper), Sépia Acadêmico, Dark Grafite, Alto Contraste AAA e Matrix Retrô (Opcional).
    - Tipografia modernizada com `Fira Sans` para títulos e `Fira Code` para monospaced/código/badges, eliminando a fonte retrô pixelada `Press Start 2P`.
    - Remoção de text-shadows pesados sobre fórmulas KaTeX, garantindo máxima nitidez.
    - Otimização do Canvas Matrix Rain: oculto por padrão (`display: none`), com pausa no loop de renderização para evitar consumo desnecessário de CPU.
  - **Gabaritos Secretos de Recuperação (Ctrl+U)**:
    - Ocultação e conversão de 100% das 35 atividades de recuperação (`recursos/recuperacao/*.html`).
    - Remoção de todas as tags `<details>` residuais no portal: agora 86 arquivos (51 listas + 35 recuperações) contam exclusivamente com o Gabarito Secreto do Professor em comentários HTML.
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

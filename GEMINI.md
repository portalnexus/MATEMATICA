# 🌌 Portal Nexus - Guia de Operações (GEMINI.md)

Olá! Eu sou o **Antigravity**, o assistente virtual e agente de IA encarregado da implementação de conteúdo e da manutenção técnica do **Portal Nexus**. Este documento serve como bússola para a geração de novos materiais e para a preservação da integridade do código deste repositório.

## 🤖 Meu Papel como Orquestrador do Portal Nexus

Minha missão é garantir que o Portal Nexus seja uma ferramenta educacional de excelência, unindo estética retro-futurista com rigor matemático.

1. **Orquestração de Agentes**: Coordenar agentes especializados para resumos (`agent-resumos`), listas de problemas (`agent-listas`), recuperação pedagógica (`agent-recuperacao`), guias de estudo (`agent-guias`), visualização matemática (`agent-graficos`) e calculadoras (`agent-ferramentas`).
2. **Cobertura Curricular Plena**: Assegurar que **todos** os tópicos de cada turma (9º Ano, 1º EM, 2º EM e 3º EM) possuam o quarteto formativo: Resumo Teórico, Lista de Problemas, Atividade de Recuperação e Guia de Estudos.
3. **Manutenção de Código**: Garantir que scripts de auditoria (`scripts/validate_nexus.py` e `scripts/validate_data.py`) aprovem com 100% de sucesso sem arquivos órfãos ou links quebrados.
4. **Consistência Estética e Temas**: Respeitar a identidade visual "Matrix/Terminal" e o suporte completo aos 6 temas dinâmicos em todas as páginas e ferramentas.

---

## 📚 Documentação e Estrutura de Ementas

As referências pedagógicas e operacionais estão organizadas em:

- `MEMORY.md`: Memória operacional permanente do projeto, convenções e regras invioláveis (como o Gabarito Secreto do Professor via `Ctrl+U`).
- `docs/curriculo/`: Ementas oficiais por turma (`9ANO-MD.md`, `1EM-MD.md`, `2EM-MD.md`, `3EM-MD.md`).
- `docs/agents/`: Manuais e templates para cada papel de agente (`agent-resumos.md`, `agent-listas.md`, `agent-recuperacao.md`, `agent-guias.md`, `agent-graficos.md`, `agent-ferramentas.md`, etc.).

---

## 📂 Estrutura de Conteúdos (Recursos)

Todos os materiais didáticos residem no diretório `/recursos`:

| Categoria | Diretório | Descrição |
| :--- | :--- | :--- |
| **Resumos** | `/recursos/resumos/` | Teoria, definições, teoremas e exemplos resolvidos. |
| **Listas** | `/recursos/listas/` | Coleções de problemas práticos para fixação em 4 níveis. |
| **Recuperação** | `/recursos/recuperacao/` | Atividades com scaffolding pedagógico para revisão. |
| **Guias** | `/recursos/guias/` | Roteiros de aprendizagem gamificados e baseados em missões. |
| **Ferramentas** | `/recursos/ferramentas/` | Calculadoras interativas e simuladores visuais. |
| **Python** | `/recursos/python/` | Módulos e tutoriais de programação matemática. |

### 🏷️ Nomenclatura de Arquivos
Para que o `class-selector.js` funcione corretamente, siga estritamente o prefixo por ano/série:
- `9ANO-nome-do-tema.html` (9º Ano)
- `1EM-nome-do-tema.html` (1º Ano EM)
- `2EM-nome-do-tema.html` (2º Ano EM)
- `3EM-nome-do-tema.html` (3º Ano EM)
- `nome-do-tema.html` (Geral/Todas as turmas)

---

## 🎨 Padrão de Design e Implementação

### 1. Boilerplate de Página
Cada nova página de recurso deve herdar o layout padrão, incluindo:
- Importação do `style.css`.
- Scripts de `matrix-rain.js`, `theme-switcher.js` e `print-mode.js`.
- Configuração do **KaTeX** para fórmulas matemáticas.

### 2. Elementos Educacionais (CSS Classes)
Use as classes pré-definidas para consistência visual:
- `.destaque-box.definicao`: Para definições conceituais.
- `.destaque-box.teorema`: Para enunciados formais.
- `.destaque-box.observacao`: Para notas importantes.
- `.exemplo-resolvido`: Para demonstrações práticas passo a passo.
- `.figura-geometrica`: Container para diagramas e gráficos SVG responsivos.
- `.badge-nivel`: Para indicar a série (`ano-9`, `ano-1em`, etc.).

### 3. Fórmulas Matemáticas (KaTeX)
Utilize os delimitadores configurados:
- **Display Mode**: `@@ formula @@` ou `\[ formula \]`.
- **Inline Mode**: `@ formula @` ou `\( formula \)`.

### 4. Diagramas e Gráficos
- Utilizar **SVG vetorial nativo** e **Canvas vanilla**, sensíveis às variáveis CSS dos temas (`var(--link-color)`, `var(--main-text-color)`).
- Evitar dependências pesadas externas e imagens rasterizadas de fundo estático.

---

## 🛠️ Manutenção Técnica e Boas Práticas

- **Responsividade**: Todas as implementações devem ser testadas para telas mobile e desktop.
- **Validação Automática**: Sempre rodar `python3 scripts/validate_nexus.py` após adicionar novos recursos para garantir indexação correta e conformidade HTML.
- **Acessibilidade**: Contraste adequado (AAA no tema OLED) e tags semânticas.
- **Padrões de Código**:
    - HTML5 Semântico (`<article>`, `<section>`, `<nav>`, `<footer>`).
    - CSS Vanilla com variáveis temáticas.
    - JS Modular, performático e documentado.

---

*“O conhecimento é a única antigravidade capaz de nos elevar além das fronteiras do comum.”*
**— Antigravity**

# Agentes Especializados do Projeto Nexus

Esta pasta contém **4 agentes especializados** para criação de conteúdo educacional matemático de alta qualidade para o portal Nexus.

---

## Visão Geral dos Agentes

### 📘 [agent-resumos.md](./agent-resumos.md)
**Propósito:** Gerar resumos matemáticos com rigor acadêmico inspirado em FME e OBMEP

**Características:**
- Definições formais numeradas
- Teoremas com demonstrações
- Exemplos resolvidos passo a passo
- 10-15 exercícios propostos
- Rigor matemático + linguagem acessível

**Quando usar:**
- Criar material teórico de referência
- Apresentar novos conceitos matematicamente rigorosos
- Fornecer base conceitual sólida para estudantes

**Exemplo de output:** `9ANO-PROBABILIDADE.html`, `1EM-FUNCAO-QUADRATICA.html`

---

### 📝 [agent-listas.md](./agent-listas.md)
**Propósito:** Elaborar listas de problemas em 4 seções progressivas

**Características:**
- 32 problemas principais (Introdutórios, Fixação, Aprofundamento)
- 6-10 problemas propostos adicionais
- Metadados completos (tópico, dificuldade, tempo)
- Progressão pedagógica clara

**Quando usar:**
- Criar material de prática e fixação
- Desenvolver habilidades de resolução de problemas
- Preparar estudantes para avaliações

**Exemplo de output:** `9ANO-TEOREMA-PITAGORAS.html`, `FUNCAO-1GRAU.html`

---

### 🔧 [agent-recuperacao.md](./agent-recuperacao.md)
**Propósito:** Criar atividades de recuperação com scaffolding pedagógico

**Características:**
- 15-20 problemas com apoio gradual (Alto → Médio → Baixo)
- Revisão de conceitos básicos
- Exemplos resolvidos passo a passo
- Dicas abundantes que diminuem progressivamente
- Autoavaliação metacognitiva

**Quando usar:**
- Remediar deficiências de aprendizagem
- Reforçar conceitos fundamentais
- Apoiar estudantes com dificuldades

**Exemplo de output:** `9ANO-RECUPERACAO-EQUACAO-2GRAU.html`

---

### 🗺️ [agent-guias.md](./agent-guias.md)
**Propósito:** Desenvolver guias de estudos completos para capítulos/unidades

**Características:**
- Mapa conceitual hierárquico
- Roteiro de estudos (5-7 etapas)
- Estratégias de aprendizagem
- Conexões interdisciplinares
- Cronograma sugerido
- Checklist de progresso

**Quando usar:**
- Introduzir capítulo completo
- Orientar organização de estudos
- Ensinar "como estudar", não apenas "o que estudar"

**Exemplo de output:** `1EM-GUIA-FUNCAO-QUADRATICA.html`, `9ANO-GUIA-TRIGONOMETRIA.html`

---

## Como Usar os Agentes

### Passo 1: Escolher o Agente Apropriado

Pergunte-se:
- **Preciso de material teórico rigoroso?** → `agent-resumos.md`
- **Preciso de problemas para praticar?** → `agent-listas.md`
- **Estudante tem dificuldades e precisa de apoio?** → `agent-recuperacao.md`
- **Preciso de visão geral e roteiro de estudo?** → `agent-guias.md`

### Passo 2: Ler o Arquivo do Agente

Cada arquivo `.md` contém:
- **Propósito e Escopo:** O que o agente faz
- **Inputs Necessários:** Informações a fornecer
- **Template HTML:** Estrutura completa do arquivo
- **Regras de Qualidade:** Padrões a seguir
- **Exemplo de Uso:** Caso prático
- **Checklist de Validação:** Verificação final

### Passo 3: Fornecer os Inputs

**Exemplo para agent-resumos:**
```
Agente: agent-resumos
Tópico: Função Afim
Turma: 9ANO
Conceitos-chave: Definição, coeficientes angular e linear, gráfico, zero da função
Nível: Introdutório
Pré-requisitos: Plano cartesiano, equações do 1º grau
```

### Passo 4: Gerar o Conteúdo

Use o agente (via Claude Code ou outro LLM) com os inputs fornecidos. O agente seguirá:
1. Template HTML fornecido
2. Regras de qualidade específicas
3. Padrões do projeto Nexus

### Passo 5: Validar com Checklist

Cada agente possui uma **Checklist de Validação** completa. Verifique:
- [ ] Estrutura HTML correta
- [ ] Conteúdo matemático rigoroso
- [ ] Formatação LaTeX adequada
- [ ] Classes CSS aplicadas
- [ ] Compatibilidade com temas e print-mode

---

## Padrões Comuns a Todos os Agentes

### Estrutura HTML Padrão

Todos os arquivos gerados incluem:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NEXUS - [Título]</title>

  <!-- Fontes -->
  <link href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,400;0,700;1,400&family=Press+Start+2P&display=swap" rel="stylesheet">

  <!-- KaTeX -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.css">
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.js"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/contrib/auto-render.min.js"></script>

  <!-- CSS do projeto -->
  <link rel="stylesheet" href="../../css/style.css">

  <!-- Estilos específicos inline -->
</head>

<body>
<div id="page-wrapper">
  <nav>...</nav>
  <div class="container">
    <!-- Conteúdo -->
  </div>
</div>

<!-- Scripts -->
<canvas id="matrixCanvas"></canvas>
<script src="../../js/matrix-rain.js" defer></script>
<script>/* KaTeX auto-render */</script>
<!-- Theme selector panel (14 temas) -->
<script src="../../js/theme-switcher.js" defer></script>
<script src="../../js/print-mode.js" defer></script>
</body>
</html>
```

### Delimitadores LaTeX/KaTeX

- **Display mode (centralizado):** `@@fórmula@@`
- **Inline mode (no texto):** `@fórmula@`

**Exemplos:**
```html
<p>A equação @ax^2 + bx + c = 0@ possui raízes dadas por:</p>
@@
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
@@
```

### Classes CSS Principais

```css
/* Caixas de destaque */
.destaque-box           /* Box genérico */
.destaque-box.definicao /* Definições formais */
.destaque-box.teorema   /* Teoremas */
.destaque-box.observacao /* Observações/Corolários */

/* Exemplos e exercícios */
.exemplo-resolvido      /* Exemplos com solução */
.nota                   /* Notas importantes */

/* Listas de problemas */
.problema-meta          /* Metadados do problema */
.topico                 /* Tópico matemático */
.dificuldade            /* Nível (facil/media/dificil/desafio) */
.dica                   /* Dicas de resolução */

/* Recuperação */
.orientacao-inicial     /* Instruções iniciais */
.conceito-basico        /* Conceitos fundamentais */
.exemplo-passo-a-passo  /* Exemplo detalhado */
.lembrete               /* Lembretes conceituais */
.nivel-apoio            /* Alto/Médio/Baixo apoio */

/* Guias de estudos */
.guia-header            /* Cabeçalho do guia */
.info-box               /* Informações essenciais */
.mapa-conceitual        /* Mapa de conceitos */
.etapa-estudo           /* Etapa do roteiro */
.estrategia             /* Estratégia de aprendizagem */
.conexao                /* Conexão interdisciplinar */
.cronograma             /* Cronograma de estudos */
.checklist              /* Checklist de progresso */
.recursos               /* Recursos adicionais */
```

### Nomenclatura de Arquivos

```
[TURMA]-[TOPICO].html              # Específico de turma
[TOPICO].html                      # Compartilhado entre turmas
[TURMA]-RECUPERACAO-[TOPICO].html  # Atividade de recuperação
[TURMA]-GUIA-[TOPICO].html         # Guia de estudos
```

**Exemplos:**
- `9ANO-PROBABILIDADE.html`
- `FUNCAO-1GRAU.html` (compartilhado)
- `1EM-RECUPERACAO-FUNCAO-QUADRATICA.html`
- `9ANO-GUIA-TRIGONOMETRIA.html`

**Regras:**
- Sempre MAIÚSCULAS
- Múltiplas palavras separadas por hífen
- Sem acentos ou caracteres especiais

---

## Fluxo de Trabalho Recomendado

### Para Novo Tópico Completo

1. **Criar guia de estudos** (`agent-guias.md`)
   - Visão panorâmica do capítulo
   - Roteiro de aprendizagem
   - Organização do conteúdo

2. **Criar resumo teórico** (`agent-resumos.md`)
   - Definições formais
   - Teoremas e demonstrações
   - Exemplos resolvidos

3. **Criar lista de problemas** (`agent-listas.md`)
   - 32+ problemas progressivos
   - Prática estruturada

4. **Criar recuperação** (se necessário) (`agent-recuperacao.md`)
   - Para estudantes com dificuldades
   - Reforço de fundamentos

### Para Revisão de Conteúdo Existente

1. Identificar tipo de material existente
2. Escolher agente correspondente
3. Validar com checklist do agente
4. Atualizar conforme padrões

---

## Checklist Geral de Qualidade

Antes de finalizar qualquer conteúdo, verifique:

### HTML/Estrutura
- [ ] Meta charset UTF-8
- [ ] Meta viewport
- [ ] Título no formato "NEXUS - [...]"
- [ ] Links CSS corretos: `../../css/style.css`
- [ ] Links JS corretos: `../../js/*.js`
- [ ] KaTeX incluído (CSS + JS)
- [ ] Navegação completa (3 links)
- [ ] Botão "VOLTAR"
- [ ] Canvas matrix-rain
- [ ] Seletor de temas (14 temas)

### Conteúdo Matemático
- [ ] LaTeX renderiza corretamente
- [ ] Delimitadores corretos (`@@` e `@`)
- [ ] Notação matemática precisa
- [ ] Conceitos matematicamente rigorosos
- [ ] Progressão lógica de tópicos

### Classes CSS
- [ ] Classes apropriadas aplicadas
- [ ] Consistência visual
- [ ] Variáveis CSS usadas (`var(--link-color)`, etc.)

### Compatibilidade
- [ ] Funciona com sistema de temas
- [ ] Compatível com modo de impressão
- [ ] Responsivo para mobile
- [ ] Sem SVG (usar apenas KaTeX)

### Qualidade Pedagógica
- [ ] Linguagem clara e acessível
- [ ] Exemplos contextualizados
- [ ] Progressão de dificuldade apropriada
- [ ] Orientações claras para estudantes

---

## Manutenção e Atualizações

### Versionamento dos Agentes

Cada arquivo `.md` possui:
- **Versão:** Número da versão atual
- **Última atualização:** Data
- **Projeto:** Nexus - Portal Educacional de Matemática

### Sugestões de Melhorias

Se identificar oportunidades de melhoria:

1. Documente a sugestão
2. Teste em caso real
3. Atualize o arquivo `.md` do agente
4. Incremente versão
5. Atualize data

---

## Recursos Adicionais

### Documentação do Projeto

- **[CLAUDE.md](../CLAUDE.md):** Documentação completa do projeto Nexus
- **[css/style.css](../css/style.css):** Estilos globais e classes CSS
- **[recursos/listas/TEMPLATE-LISTA-PROBLEMAS.html](../recursos/listas/TEMPLATE-LISTA-PROBLEMAS.html):** Template atualizado de listas

### Exemplos Reais

Veja exemplos de conteúdo existente em:
- **Resumos:** `recursos/resumos/PROBABILIDADE.html`
- **Listas:** `recursos/listas/FUNCAO-1GRAU.html`
- **Recuperação:** (a ser criado)
- **Guias:** (a ser criado)

---

## Suporte

Para dúvidas ou problemas:

1. Consulte o arquivo específico do agente
2. Verifique a seção "Exemplo de Uso"
3. Use a "Checklist de Validação"
4. Revise [CLAUDE.md](../CLAUDE.md) para contexto do projeto

---

**Versão:** 1.0
**Data:** 2025-10-02
**Projeto:** Nexus - Portal Educacional de Matemática

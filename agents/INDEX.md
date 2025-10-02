# Índice Rápido dos Agentes Nexus

## 📘 Agent-Resumos
**Arquivo:** [agent-resumos.md](./agent-resumos.md)

**Função:** Resumos matemáticos rigorosos (estilo FME/OBMEP)

**Output:**
```
├── Seção 1: Conceitos Fundamentais (Definições numeradas)
├── Seção 2: Teoremas e Propriedades (com demonstrações)
├── Seção 3: Exemplos Resolvidos (4-6 exemplos detalhados)
└── Seção 4: Exercícios (10-15 problemas)
```

**Exemplo:** `9ANO-PROBABILIDADE.html`

**Inputs:**
- Tópico matemático
- Turma (9ANO/1EM/2EM/3EM)
- Conceitos-chave
- Nível de profundidade
- Pré-requisitos

---

## 📝 Agent-Listas
**Arquivo:** [agent-listas.md](./agent-listas.md)

**Função:** Listas de problemas progressivas

**Output:**
```
├── Seção 1: Problemas Introdutórios (10-12 problemas)
├── Seção 2: Problemas de Fixação (12-14 problemas)
├── Seção 3: Problemas de Aprofundamento (6-8 problemas)
└── Seção 4: Problemas Propostos (6-10 problemas)
Total: ~32 problemas principais + propostos
```

**Exemplo:** `FUNCAO-1GRAU.html`

**Inputs:**
- Tópico matemático
- Turma
- Subtópicos
- Nível geral
- Contextos desejados

**Metadados por problema:**
- `.topico` - Conceito matemático
- `.dificuldade` - facil/media/dificil/desafio
- Tempo estimado (⏱️)

---

## 🔧 Agent-Recuperacao
**Arquivo:** [agent-recuperacao.md](./agent-recuperacao.md)

**Função:** Atividades de recuperação com scaffolding

**Output:**
```
├── Orientação Inicial (como usar)
├── Revisão de Conceitos Básicos (3-5 conceitos)
├── Parte 1: Primeiros Passos (4-6 problemas, ALTO apoio)
├── Parte 2: Desenvolvendo Autonomia (6-8 problemas, MÉDIO apoio)
├── Parte 3: Consolidação (5-6 problemas, BAIXO apoio)
└── Autoavaliação (checklist metacognitivo)
Total: 15-20 problemas com apoio decrescente
```

**Exemplo:** `9ANO-RECUPERACAO-EQUACAO-2GRAU.html`

**Inputs:**
- Tópico principal
- Turma
- Tópicos deficitários
- Diagnóstico de erros comuns
- Pré-requisitos a reforçar

**Características:**
- Alto apoio: 2-3 dicas + lembretes
- Médio apoio: 1 dica estratégica
- Baixo apoio: 0-1 dicas

---

## 🗺️ Agent-Guias
**Arquivo:** [agent-guias.md](./agent-guias.md)

**Função:** Guias de estudos completos para capítulos

**Output:**
```
├── 1. Visão Geral (objetivos, pré-requisitos, duração)
├── 2. Mapa Conceitual (hierarquia de conceitos)
├── 3. Roteiro de Estudos (5-7 etapas sequenciais)
├── 4. Estratégias de Aprendizagem (3-5 técnicas)
├── 5. Conexões (internas + interdisciplinares)
├── 6. Cronograma Sugerido (tabela temporal)
├── 7. Checklist de Progresso (10-15 itens)
└── 8. Recursos Adicionais (links + dicas)
```

**Exemplo:** `1EM-GUIA-FUNCAO-QUADRATICA.html`

**Inputs:**
- Capítulo/Unidade
- Turma
- Tópicos incluídos
- Duração estimada
- Objetivos de aprendizagem

**Características:**
- Foco em metacognição ("como estudar")
- Conexões interdisciplinares
- Cronograma realista

---

## Comparação Rápida

| Agente | Tipo | Foco | Quantidade | Apoio |
|--------|------|------|------------|-------|
| **Resumos** | Teórico | Conceitos formais | Definições + Teoremas + Exemplos + Exercícios | Rigor matemático |
| **Listas** | Prática | Resolução de problemas | 32+ problemas | Progressão de dificuldade |
| **Recuperação** | Remediação | Conceitos fundamentais | 15-20 problemas | Alto → Baixo (scaffolding) |
| **Guias** | Metacognitivo | Organização de estudos | Roteiro completo | Estratégias de aprendizagem |

---

## Quando Usar Cada Agente?

### 🎯 Situação: Introduzindo novo tópico
**Solução:**
1. `agent-guias` → Visão geral + roteiro
2. `agent-resumos` → Base teórica
3. `agent-listas` → Prática

### 🎯 Situação: Estudante com dificuldades
**Solução:**
1. `agent-recuperacao` → Reforço com apoio
2. `agent-resumos` → Revisão teórica
3. `agent-listas` → Prática (apenas Introdutórios)

### 🎯 Situação: Preparação para prova
**Solução:**
1. `agent-guias` → Checklist de progresso
2. `agent-resumos` → Revisão de conceitos
3. `agent-listas` → Problemas de Fixação + Aprofundamento

### 🎯 Situação: Material de referência
**Solução:**
1. `agent-resumos` → Conteúdo rigoroso
2. `agent-listas` → Banco de problemas

### 🎯 Situação: Capítulo completo novo
**Solução:**
1. `agent-guias` → Estrutura geral
2. `agent-resumos` → Teoria
3. `agent-listas` → Prática
4. `agent-recuperacao` → Apoio (opcional)

---

## Fluxo de Criação de Conteúdo

```
┌─────────────────────────────────────────────────────────┐
│         NOVO TÓPICO/CAPÍTULO DE MATEMÁTICA              │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│  1. GUIA DE ESTUDOS (agent-guias)                       │
│     └─ Visão geral, mapa conceitual, roteiro            │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│  2. RESUMO TEÓRICO (agent-resumos)                      │
│     └─ Definições, teoremas, demonstrações              │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│  3. LISTA DE PROBLEMAS (agent-listas)                   │
│     └─ 32+ problemas progressivos                       │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│  4. RECUPERAÇÃO (agent-recuperacao) [OPCIONAL]          │
│     └─ Para estudantes com dificuldades                 │
└─────────────────────────────────────────────────────────┘
```

---

## Padrões Comuns

### Delimitadores LaTeX
- Display: `@@formula@@`
- Inline: `@formula@`

### Caminhos de Arquivos
```
../../css/style.css
../../js/matrix-rain.js
../../js/theme-switcher.js
../../js/print-mode.js
```

### Nomenclatura
```
[TURMA]-[TOPICO].html              # Ex: 9ANO-PROBABILIDADE.html
[TOPICO].html                      # Ex: FUNCAO-1GRAU.html (compartilhado)
[TURMA]-RECUPERACAO-[TOPICO].html  # Ex: 1EM-RECUPERACAO-FUNCAO-QUADRATICA.html
[TURMA]-GUIA-[TOPICO].html         # Ex: 9ANO-GUIA-TRIGONOMETRIA.html
```

### Classes CSS Essenciais

**Resumos:**
- `.destaque-box.definicao`
- `.destaque-box.teorema`
- `.destaque-box.observacao`
- `.exemplo-resolvido`
- `.nota`

**Listas:**
- `.problema-meta`
- `.topico`
- `.dificuldade` (facil/media/dificil/desafio)
- `.dica`
- `.section-intro`

**Recuperação:**
- `.orientacao-inicial`
- `.conceito-basico`
- `.exemplo-passo-a-passo`
- `.passo`
- `.dica`
- `.lembrete`
- `.nivel-apoio` (alto/medio/baixo)

**Guias:**
- `.guia-header`
- `.info-box`
- `.mapa-conceitual`
- `.etapa-estudo`
- `.etapa-numero`
- `.estrategia`
- `.conexao`
- `.cronograma`
- `.checklist`
- `.recursos`

---

## Checklist Ultra-Rápida

Antes de finalizar qualquer conteúdo:

✅ **HTML Básico**
- [ ] UTF-8, viewport, título
- [ ] Links CSS/JS corretos
- [ ] KaTeX incluído
- [ ] Navegação + botão VOLTAR
- [ ] Seletor de temas (14)

✅ **Conteúdo**
- [ ] LaTeX renderiza (`@@` e `@`)
- [ ] Classes CSS aplicadas
- [ ] Progressão lógica
- [ ] Linguagem clara

✅ **Compatibilidade**
- [ ] Temas funcionam
- [ ] Print-mode funciona
- [ ] Mobile responsivo

---

## Recursos

- **[README.md](./README.md)** - Documentação completa dos agentes
- **[CLAUDE.md](../CLAUDE.md)** - Documentação do projeto Nexus
- **Agentes individuais:**
  - [agent-resumos.md](./agent-resumos.md)
  - [agent-listas.md](./agent-listas.md)
  - [agent-recuperacao.md](./agent-recuperacao.md)
  - [agent-guias.md](./agent-guias.md)

---

**Última atualização:** 2025-10-02

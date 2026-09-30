# Guia de Navegação - Agentes Nexus

## 🗺️ Mapa Visual de Navegação

```
                    ┌──────────────────────────────────┐
                    │   COMEÇAR AQUI: QUAL ARQUIVO?    │
                    └──────────────────────────────────┘
                                   │
                    ┌──────────────┴──────────────┐
                    │   Primeira vez usando?      │
                    └──────────────┬──────────────┘
                                   │
                            ┌──────┴──────┐
                            │   SIM       │   NÃO
                            │             │
                            ▼             ▼
                    ┌─────────────┐   ┌─────────────────┐
                    │ QUICK-      │   │ Já sei qual     │
                    │ REFERENCE   │   │ agente preciso? │
                    │ (5 min)     │   └────────┬────────┘
                    └──────┬──────┘            │
                           │            ┌──────┴──────┐
                           │            │   SIM       │   NÃO
                           │            │             │
                           ▼            ▼             ▼
                    ┌─────────────┐  ┌───────┐   ┌─────────┐
                    │ EXEMPLOS    │  │ Ir ao │   │ INDEX   │
                    │ (caso       │  │ Agent │   │ (busca  │
                    │  prático)   │  │       │   │  rápida)│
                    └──────┬──────┘  └───────┘   └────┬────┘
                           │                           │
                           └──────────┬────────────────┘
                                      ▼
                           ┌────────────────────┐
                           │ AGENT ESPECÍFICO   │
                           │ - resumos          │
                           │ - listas           │
                           │ - recuperacao      │
                           │ - guias            │
                           └────────────────────┘
```

---

## 📁 Arquivos por Função

### 🚀 Início Rápido
**[QUICK-REFERENCE.md](./QUICK-REFERENCE.md)** - Referência de 1 página
- ⏱️ Tempo de leitura: 5 minutos
- 🎯 Quando usar: Primeira consulta, lembretes rápidos
- 📊 Conteúdo: Tabela comparativa, exemplos curtos, checklist

### 📚 Documentação Completa
**[README.md](./README.md)** - Guia completo dos agentes
- ⏱️ Tempo de leitura: 20-30 minutos
- 🎯 Quando usar: Primeira leitura aprofundada, referência detalhada
- 📊 Conteúdo: Descrição completa de cada agente, regras, padrões

### 🔍 Busca Estruturada
**[INDEX.md](./INDEX.md)** - Índice com estruturas de output
- ⏱️ Tempo de leitura: 10 minutos
- 🎯 Quando usar: Procurar estrutura específica, comparar agentes
- 📊 Conteúdo: Estruturas visuais, comparação lado a lado

### 💡 Aprender por Exemplos
**[EXEMPLOS.md](./EXEMPLOS.md)** - Casos práticos completos
- ⏱️ Tempo de leitura: 15-20 minutos
- 🎯 Quando usar: Aprender fazendo, casos de uso reais
- 📊 Conteúdo: 5 exemplos completos com inputs e outputs

### 📋 Visão Geral
**[SUMARIO.md](./SUMARIO.md)** - Sumário executivo
- ⏱️ Tempo de leitura: 10 minutos
- 🎯 Quando usar: Entender o sistema completo, estatísticas
- 📊 Conteúdo: Lista de arquivos, estatísticas, casos de uso

### 🗺️ Este Arquivo
**NAVEGACAO.md** - Guia de navegação entre documentos
- ⏱️ Tempo de leitura: 5 minutos
- 🎯 Quando usar: Perdido na documentação, precisa de direção
- 📊 Conteúdo: Mapas visuais, fluxos de decisão

---

## 🎯 Fluxogramas de Decisão

### Fluxo 1: "Nunca usei os agentes antes"

```
INÍCIO
  │
  ▼
Leia QUICK-REFERENCE.md (5 min)
  │
  ▼
Entendeu o conceito?
  │
  ├─ NÃO ──→ Leia README.md completo
  │           │
  │           ▼
  │         Releia QUICK-REFERENCE.md
  │           │
  └─ SIM ────┘
              │
              ▼
         Leia EXEMPLOS.md
         (escolha 1 exemplo)
              │
              ▼
         Pratique com agent simples
         (sugestão: agent-listas)
              │
              ▼
            FIM
```

### Fluxo 2: "Preciso criar conteúdo agora"

```
INÍCIO
  │
  ▼
Que tipo de conteúdo?
  │
  ├─ Teoria ──────→ agent-resumos.md
  │
  ├─ Problemas ───→ agent-listas.md
  │
  ├─ Recuperação ─→ agent-recuperacao.md
  │
  ├─ Guia ────────→ agent-guias.md
  │
  └─ Não sei ─────→ QUICK-REFERENCE.md
                    "Qual Agente Usar?"
                          │
                          ▼
                    Escolha agente
                          │
                          ▼
                    Abra arquivo .md
                          │
                          ▼
                    Leia "Inputs Necessários"
                          │
                          ▼
                    Forneça inputs
                          │
                          ▼
                    Gere conteúdo
                          │
                          ▼
                    Valide com checklist
                          │
                          ▼
                        FIM
```

### Fluxo 3: "Tenho uma dúvida específica"

```
INÍCIO
  │
  ▼
Que tipo de dúvida?
  │
  ├─ Estrutura do output ──→ INDEX.md
  │
  ├─ Como usar agente ─────→ EXEMPLOS.md
  │
  ├─ Padrões técnicos ─────→ README.md → Seção específica
  │
  ├─ Comparar agentes ─────→ QUICK-REFERENCE.md → Tabela
  │
  └─ Não encontrei ────────→ Busque no arquivo do agente
                             específico (agent-*.md)
                                      │
                                      ▼
                                    FIM
```

---

## 📊 Matriz de Navegação

| Preciso de... | Arquivo | Seção/Página |
|---------------|---------|--------------|
| **Início rápido** | QUICK-REFERENCE.md | Topo |
| **Qual agente usar** | QUICK-REFERENCE.md | "Qual Agente Usar?" |
| **Exemplo prático** | EXEMPLOS.md | Exemplo 1 ou 2 |
| **Estrutura de output** | INDEX.md | Seção do agente |
| **Template HTML** | agent-*.md | Seção "Template HTML" |
| **Regras de qualidade** | agent-*.md | Seção "Regras de Qualidade" |
| **Checklist** | agent-*.md | Seção "Checklist de Validação" |
| **Input necessário** | agent-*.md | Seção "Inputs Necessários" |
| **Comparação de agentes** | INDEX.md ou QUICK-REFERENCE.md | Tabela comparativa |
| **Estatísticas** | SUMARIO.md | Seção "Estatísticas" |
| **Casos de uso** | SUMARIO.md ou EXEMPLOS.md | Seções específicas |
| **Padrões técnicos** | QUICK-REFERENCE.md | Seção "Padrões Técnicos" |
| **Classes CSS** | QUICK-REFERENCE.md ou README.md | Seções "Classes CSS" |
| **Nomenclatura** | QUICK-REFERENCE.md | Seção "Nomenclatura" |

---

## 🔄 Fluxo de Aprendizagem Recomendado

### Nível 1: Iniciante (30 min total)

```
1. QUICK-REFERENCE.md (5 min)
   └─ Entender conceito geral

2. EXEMPLOS.md - Exemplo 2 (10 min)
   └─ Ver caso prático simples

3. agent-listas.md (15 min)
   └─ Praticar com agente mais simples
```

### Nível 2: Intermediário (1-2 horas)

```
1. README.md completo (30 min)
   └─ Compreensão profunda

2. INDEX.md (10 min)
   └─ Estruturas de output

3. EXEMPLOS.md - Exemplo 1 (20 min)
   └─ Caso completo (4 agentes)

4. Prática (30-60 min)
   └─ Criar conteúdo real
```

### Nível 3: Avançado (2+ horas)

```
1. Todos os arquivos de documentação
   └─ Domínio completo

2. Todos os 4 agents/*.md
   └─ Detalhes de cada agente

3. EXEMPLOS.md completo
   └─ Todos os 5 exemplos

4. Prática extensiva
   └─ Capítulo completo
```

---

## 🎓 Matriz de Experiência × Necessidade

|  | **Primeira vez** | **Já usei antes** | **Usuário experiente** |
|---|---|---|---|
| **Preciso de visão geral** | QUICK-REFERENCE | SUMARIO | INDEX |
| **Preciso criar conteúdo** | EXEMPLOS → agent-*.md | agent-*.md direto | agent-*.md (template) |
| **Tenho uma dúvida** | README | QUICK-REFERENCE | agent-*.md (seção) |
| **Preciso de exemplo** | EXEMPLOS (Ex. 2 ou 3) | EXEMPLOS (Ex. 1) | EXEMPLOS (Ex. 4 ou 5) |

---

## 📖 Ordem de Leitura Sugerida

### Caminho A: Aprendizado Completo (3-4 horas)

```
1. QUICK-REFERENCE.md
2. README.md
3. INDEX.md
4. EXEMPLOS.md
5. agent-resumos.md
6. agent-listas.md
7. agent-recuperacao.md
8. agent-guias.md
9. SUMARIO.md (revisão)
```

### Caminho B: Início Rápido (30 min)

```
1. QUICK-REFERENCE.md
2. EXEMPLOS.md (1 exemplo)
3. agent-listas.md (prática)
```

### Caminho C: Consulta Pontual (5-10 min)

```
1. QUICK-REFERENCE.md (seção específica)
   OU
   INDEX.md (busca rápida)
   OU
   agent-*.md (seção necessária)
```

---

## 🔗 Links Internos Entre Documentos

Todos os arquivos contêm links cruzados para facilitar navegação:

```
QUICK-REFERENCE.md
  ├─→ README.md (doc. completa)
  ├─→ INDEX.md (estruturas)
  ├─→ EXEMPLOS.md (casos práticos)
  └─→ agent-*.md (4 agentes)

README.md
  ├─→ QUICK-REFERENCE.md (referência rápida)
  ├─→ INDEX.md (índice)
  ├─→ EXEMPLOS.md (exemplos)
  └─→ agent-*.md (4 agentes)

INDEX.md
  ├─→ README.md (detalhes)
  ├─→ QUICK-REFERENCE.md (ref. rápida)
  └─→ agent-*.md (4 agentes)

EXEMPLOS.md
  ├─→ README.md (contexto)
  ├─→ QUICK-REFERENCE.md (lembretes)
  └─→ agent-*.md (4 agentes)

SUMARIO.md
  ├─→ Todos os arquivos (links diretos)
  └─→ CLAUDE.md (projeto geral)

agent-*.md (cada um)
  ├─→ README.md (contexto geral)
  └─→ Outros agent-*.md (comparação)
```

---

## 🆘 Guia de Troubleshooting

### "Não sei por onde começar"
→ Leia **QUICK-REFERENCE.md** primeiro

### "Não entendi como funciona"
→ Vá para **EXEMPLOS.md** e siga um caso prático

### "Preciso criar conteúdo urgente"
→ **QUICK-REFERENCE.md** → Tabela "Qual Agente Usar?" → Agent específico

### "Esqueci como fazer algo"
→ **QUICK-REFERENCE.md** → Seção específica

### "Quero entender tudo em detalhes"
→ **README.md** → Leitura completa → Agent específico

### "Não achei o que procuro"
→ **INDEX.md** → Busca visual → Seção específica

### "Preciso de inspiração"
→ **EXEMPLOS.md** → 5 casos práticos

---

## 📍 Você Está Aqui

```
agents/
├── NAVEGACAO.md ◄─ VOCÊ ESTÁ AQUI
├── QUICK-REFERENCE.md ← Próximo passo sugerido
├── INDEX.md
├── README.md
├── EXEMPLOS.md
├── SUMARIO.md
├── agent-resumos.md
├── agent-listas.md
├── agent-recuperacao.md
└── agent-guias.md
```

---

## 🚀 Próximo Passo Recomendado

Baseado em onde você está:

**Se nunca usou os agentes:**
→ Leia [QUICK-REFERENCE.md](./QUICK-REFERENCE.md) agora (5 min)

**Se já conhece o básico:**
→ Veja [EXEMPLOS.md](./EXEMPLOS.md) para caso prático

**Se precisa criar conteúdo:**
→ Consulte [INDEX.md](./INDEX.md) ou vá direto ao agent necessário

**Se quer domínio completo:**
→ Comece por [README.md](./README.md)

---

## 📞 Resumo de Quando Usar Cada Arquivo

| Situação | Arquivo Recomendado |
|----------|---------------------|
| 🆕 Primeira vez | [QUICK-REFERENCE.md](./QUICK-REFERENCE.md) |
| 💡 Aprender por exemplo | [EXEMPLOS.md](./EXEMPLOS.md) |
| 📚 Estudo completo | [README.md](./README.md) |
| 🔍 Busca rápida | [INDEX.md](./INDEX.md) |
| 📊 Visão geral | [SUMARIO.md](./SUMARIO.md) |
| 🗺️ Perdido na doc | [NAVEGACAO.md](./NAVEGACAO.md) ◄ Este arquivo |
| 🎯 Criar conteúdo | [agent-*.md](./agent-resumos.md) específico |

---

**Última atualização:** 2025-10-02
**Versão:** 1.0
**Projeto:** Nexus - Portal Educacional de Matemática

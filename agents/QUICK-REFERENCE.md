# Referência Rápida - Agentes Nexus

## 🎯 Qual Agente Usar?

### Preciso de...

| Necessidade | Agente | Arquivo | Output |
|-------------|--------|---------|--------|
| **Material teórico rigoroso** | Resumos | [agent-resumos.md](./agent-resumos.md) | Definições + Teoremas + Demos + Exemplos |
| **Problemas para praticar** | Listas | [agent-listas.md](./agent-listas.md) | 32+ problemas progressivos |
| **Apoio para dificuldades** | Recuperação | [agent-recuperacao.md](./agent-recuperacao.md) | 15-20 problemas com scaffolding |
| **Visão geral de capítulo** | Guias | [agent-guias.md](./agent-guias.md) | Mapa + Roteiro + Estratégias |

---

## ⚡ Início Rápido

### 1️⃣ Agent-Resumos

```markdown
Agente: agent-resumos
Tópico: Probabilidade
Turma: 9ANO
Conceitos-chave: Experimento aleatório, espaço amostral, eventos, probabilidade clássica
Nível: Introdutório
Pré-requisitos: Frações, conjuntos
```

**Gera:** `9ANO-PROBABILIDADE.html` com 4 seções (Conceitos, Teoremas, Exemplos, Exercícios)

---

### 2️⃣ Agent-Listas

```markdown
Agente: agent-listas
Tópico: Teorema de Pitágoras
Turma: 9ANO
Subtópicos: Hipotenusa, catetos, ternos pitagóricos, triângulos especiais
Nível: Intermediário
Contextos: Construção, distâncias, navegação
```

**Gera:** `9ANO-TEOREMA-PITAGORAS.html` com 4 seções (Intro: 10-12, Fixação: 12-14, Aprofundamento: 6-8, Propostos: 6-10)

---

### 3️⃣ Agent-Recuperacao

```markdown
Agente: agent-recuperacao
Tópico: Equações do 2º Grau
Turma: 9ANO
Tópicos deficitários: Bhaskara, discriminante, interpretação de raízes
Diagnóstico: Erros com sinais, confusão entre fórmulas
Pré-requisitos: Equação 1º grau, produtos notáveis, raiz quadrada
```

**Gera:** `9ANO-RECUPERACAO-EQUACAO-2GRAU.html` com revisão + 3 partes (ALTO → MÉDIO → BAIXO apoio)

---

### 4️⃣ Agent-Guias

```markdown
Agente: agent-guias
Capítulo: Função Quadrática
Turma: 1EM
Tópicos: Definição, gráfico, vértice, raízes, máximo/mínimo
Duração: 3 semanas
Objetivos: Compreender, calcular, aplicar, resolver problemas
```

**Gera:** `1EM-GUIA-FUNCAO-QUADRATICA.html` com 8 seções (Visão → Mapa → Roteiro → Estratégias → Conexões → Cronograma → Checklist → Recursos)

---

## 📊 Comparação Visual

```
RESUMOS          LISTAS           RECUPERAÇÃO      GUIAS
┌─────────┐      ┌─────────┐      ┌─────────┐      ┌─────────┐
│Definição│      │10-12    │      │Orientação│     │Visão    │
│1.1, 1.2 │      │Intro    │      │Inicial   │     │Geral    │
├─────────┤      ├─────────┤      ├─────────┤      ├─────────┤
│Teorema  │      │12-14    │      │Revisão   │     │Mapa     │
│2.1, 2.2 │      │Fixação  │      │Conceitos │     │Conceitual│
├─────────┤      ├─────────┤      ├─────────┤      ├─────────┤
│Exemplos │      │6-8      │      │ALTO apoio│     │Roteiro  │
│Resolvidos│     │Aprofund.│      │4-6 prob. │     │5-7 etapas│
├─────────┤      ├─────────┤      ├─────────┤      ├─────────┤
│10-15    │      │6-10     │      │MÉDIO apoio│    │Estratégias│
│Exercícios│     │Propostos│      │6-8 prob. │     │Aprendizagem│
└─────────┘      └─────────┘      ├─────────┤      ├─────────┤
                                   │BAIXO apoio│    │Conexões │
Rigor            Progressão        │5-6 prob. │     │Interdiscip│
Matemático       Pedagógica        ├─────────┤      ├─────────┤
                                   │Autoaval. │     │Cronograma│
                                   └─────────┘      ├─────────┤
                                                     │Checklist│
                                   Scaffolding      └─────────┘
                                   Gradual
                                                     Metacognição
```

---

## 🔧 Padrões Técnicos

### LaTeX
```html
Inline:  @x^2 + 2x + 1@
Display: @@\frac{-b \pm \sqrt{b^2-4ac}}{2a}@@
```

### Caminhos
```html
CSS:  ../../css/style.css
JS:   ../../js/matrix-rain.js
      ../../js/theme-switcher.js
      ../../js/print-mode.js
```

### Classes CSS Chave

| Uso | Classe |
|-----|--------|
| Definição | `.destaque-box.definicao` |
| Teorema | `.destaque-box.teorema` |
| Observação | `.destaque-box.observacao` |
| Exemplo | `.exemplo-resolvido` |
| Metadados problema | `.problema-meta` |
| Tópico matemático | `.topico` |
| Dificuldade | `.dificuldade.facil/media/dificil` |
| Dica | `.dica` |
| Recuperação - conceito | `.conceito-basico` |
| Recuperação - passo | `.exemplo-passo-a-passo` `.passo` |
| Guia - etapa | `.etapa-estudo` `.etapa-numero` |
| Guia - mapa | `.mapa-conceitual` |
| Guia - estratégia | `.estrategia` |

---

## 📁 Nomenclatura

```
PADRÃO                            EXEMPLO
─────────────────────────────────────────────────────────────────
[TURMA]-[TOPICO].html             9ANO-PROBABILIDADE.html
[TOPICO].html                     FUNCAO-1GRAU.html
[TURMA]-RECUPERACAO-[TOPICO].html 1EM-RECUPERACAO-FUNCAO-QUADRATICA.html
[TURMA]-GUIA-[TOPICO].html        9ANO-GUIA-TRIGONOMETRIA.html
```

**Regras:**
- MAIÚSCULAS
- Hífen para múltiplas palavras
- Sem acentos

---

## ✅ Checklist Ultra-Rápida

Antes de finalizar:

```
HTML:
☐ UTF-8, viewport, título
☐ CSS/JS links corretos
☐ KaTeX incluído
☐ Nav + VOLTAR
☐ 14 temas

CONTEÚDO:
☐ LaTeX renderiza
☐ Classes CSS corretas
☐ Progressão lógica

COMPATIBILIDADE:
☐ Temas OK
☐ Print-mode OK
☐ Mobile OK
```

---

## 🎓 Fluxo de Trabalho

### Novo Tópico Completo

```
1. GUIA (visão geral)
   ↓
2. RESUMO (teoria)
   ↓
3. LISTA (prática)
   ↓
4. RECUPERAÇÃO (se necessário)
```

### Material Rápido

```
Só teoria → RESUMO
Só prática → LISTA
Só apoio → RECUPERAÇÃO
Só organização → GUIA
```

---

## 📚 Documentação Completa

| Arquivo | Descrição |
|---------|-----------|
| [README.md](./README.md) | Documentação completa dos agentes |
| [INDEX.md](./INDEX.md) | Índice rápido com estruturas |
| [EXEMPLOS.md](./EXEMPLOS.md) | Exemplos práticos de uso |
| **QUICK-REFERENCE.md** | Esta referência rápida |
| [agent-resumos.md](./agent-resumos.md) | Agente de resumos teóricos |
| [agent-listas.md](./agent-listas.md) | Agente de listas de problemas |
| [agent-recuperacao.md](./agent-recuperacao.md) | Agente de atividades de recuperação |
| [agent-guias.md](./agent-guias.md) | Agente de guias de estudos |

---

## 💡 Dicas Finais

### ✅ FAÇA
- Seja específico nos inputs
- Use contextos realistas
- Valide com checklist
- Teste no navegador

### ❌ EVITE
- Inputs vagos
- Misturar múltiplos tópicos
- Pular validação
- Esquecer de testar LaTeX

---

## 🚀 Começar Agora

1. **Escolha o agente** (consulte tabela "Qual Agente Usar?")
2. **Abra o arquivo .md** do agente
3. **Leia "Inputs Necessários"**
4. **Forneça inputs** no formato do template
5. **Gere conteúdo** com o agente
6. **Valide** com checklist específica

---

**Atalho:** Para exemplos práticos completos, veja [EXEMPLOS.md](./EXEMPLOS.md)

**Ajuda:** Para documentação detalhada, veja [README.md](./README.md)

**Versão:** 1.0 | **Data:** 2025-10-02

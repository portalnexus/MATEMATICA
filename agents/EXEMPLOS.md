# Exemplos Práticos de Uso dos Agentes

Este arquivo contém **exemplos práticos e completos** de como usar cada agente para criar conteúdo educacional para o Nexus.

---

## Exemplo 1: Criando Conteúdo Completo sobre "Função Quadrática"

### Cenário
Professor precisa criar material completo sobre Função Quadrática para 1º ano do Ensino Médio.

### Solução: Usar os 4 agentes em sequência

---

#### Passo 1: Criar Guia de Estudos

**Solicitação ao agent-guias:**

```
Agente: agent-guias
Capítulo: Função Quadrática
Turma: 1EM
Tópicos: Definição de função quadrática, coeficientes a/b/c e seus significados, gráfico (parábola), concavidade, vértice, eixo de simetria, raízes (discriminante e Bhaskara), problemas de máximo e mínimo, aplicações práticas
Duração: 3 semanas
Objetivos:
  - Compreender a definição formal de função quadrática
  - Identificar e interpretar coeficientes
  - Esboçar gráficos de parábolas
  - Calcular vértice e raízes
  - Resolver problemas de otimização
  - Aplicar em contextos reais (física, economia, engenharia)
```

**Output gerado:** `1EM-GUIA-FUNCAO-QUADRATICA.html`

**Conteúdo:**
- Visão geral (3 semanas de estudo)
- Mapa conceitual com 4 conceitos principais
- Roteiro em 6 etapas (definição → gráfico → vértice → raízes → inequações → aplicações)
- 4 estratégias de aprendizagem
- Conexões com Física (MUV), Economia (receita máxima)
- Cronograma semanal detalhado
- Checklist com 12 itens
- Links para recursos

---

#### Passo 2: Criar Resumo Teórico

**Solicitação ao agent-resumos:**

```
Agente: agent-resumos
Tópico: Função Quadrática
Turma: 1EM
Conceitos-chave:
  - Definição formal de função quadrática
  - Coeficientes a, b, c
  - Gráfico (parábola)
  - Concavidade
  - Vértice (fórmulas xv e yv)
  - Raízes (discriminante Δ, fórmula de Bhaskara)
  - Análise do gráfico (crescimento, decrescimento)
Nível: Intermediário
Pré-requisitos: Função afim, equação do 2º grau, plano cartesiano, produtos notáveis
```

**Output gerado:** `1EM-FUNCAO-QUADRATICA.html`

**Conteúdo:**
- Seção 1: Conceitos Fundamentais
  - Definição 1.1: Função Quadrática
  - Definição 1.2: Coeficientes e seus significados
  - Definição 1.3: Gráfico (parábola)
  - Exemplos básicos

- Seção 2: Propriedades do Gráfico
  - Teorema 2.1: Concavidade
  - Teorema 2.2: Vértice da parábola
  - Teorema 2.3: Eixo de simetria
  - Demonstrações

- Seção 3: Raízes
  - Definição 3.1: Discriminante Δ
  - Teorema 3.2: Fórmula de Bhaskara
  - Relações entre Δ e número de raízes

- Seção 4: Exemplos Resolvidos (6 exemplos)
  - Exemplo 1: Identificar coeficientes
  - Exemplo 2: Calcular vértice
  - Exemplo 3: Esboçar gráfico
  - Exemplo 4: Encontrar raízes
  - Exemplo 5: Problema de máximo
  - Exemplo 6: Aplicação (receita máxima)

- Seção 5: Exercícios (15 problemas)

---

#### Passo 3: Criar Lista de Problemas

**Solicitação ao agent-listas:**

```
Agente: agent-listas
Tópico: Função Quadrática
Turma: 1EM
Subtópicos:
  - Identificação de coeficientes
  - Cálculo de vértice
  - Determinação de raízes (Bhaskara)
  - Esboço de gráficos
  - Análise de sinais
  - Problemas de máximo e mínimo
  - Aplicações em física e economia
Nível: Intermediário
Contextos: Projéteis, receita/lucro, áreas máximas, otimização
```

**Output gerado:** `1EM-FUNCAO-QUADRATICA.html` (lista)

**Conteúdo:**

**Problemas Introdutórios (10 problemas):**
1. Identificar coeficientes a, b, c
2-3. Determinar se concavidade é para cima ou para baixo
4-6. Calcular vértice com fórmula
7-8. Calcular discriminante Δ
9-10. Aplicar Bhaskara em equações simples

**Problemas de Fixação (12 problemas):**
1-3. Esboçar gráficos a partir da função
4-6. Problemas contextualizados (receita, área)
7-9. Análise completa (vértice, raízes, gráfico)
10-12. Aplicações em física (altura de projétil)

**Problemas de Aprofundamento (8 problemas):**
1-2. Determinar função a partir de condições dadas
3-4. Problemas de otimização complexos
5-6. Interseção de parábolas
7-8. Aplicações avançadas (engenharia)

**Problemas Propostos (8 problemas):**
- Variedade de aplicações e desafios

---

#### Passo 4: Criar Atividade de Recuperação

**Solicitação ao agent-recuperacao:**

```
Agente: agent-recuperacao
Tópico: Função Quadrática
Turma: 1EM
Tópicos deficitários:
  - Fórmula de Bhaskara (confusão com sinais)
  - Cálculo de vértice
  - Interpretação do discriminante
  - Esboço de gráfico
Diagnóstico:
  - Estudantes erram sinais ao aplicar Bhaskara
  - Confundem fórmulas de xv e yv
  - Não entendem relação entre Δ e número de raízes
  - Dificuldade em esboçar parábola
Pré-requisitos: Equação do 2º grau, plano cartesiano, operações com radicais
```

**Output gerado:** `1EM-RECUPERACAO-FUNCAO-QUADRATICA.html`

**Conteúdo:**

- Orientação Inicial (como usar a atividade)

- Revisão de Conceitos Básicos (4 conceitos)
  1. Equação do 2º grau
  2. Fórmula de Bhaskara
  3. Discriminante Δ
  4. Vértice da parábola

- Parte 1: Primeiros Passos (5 problemas, ALTO apoio)
  - Exemplo resolvido passo a passo completo
  - Problema 1: Identificar a, b, c (3 dicas + lembrete)
  - Problema 2: Calcular Δ (2 dicas + lembrete)
  - Problema 3: Aplicar Bhaskara (3 dicas detalhadas)
  - Problema 4: Calcular vértice (2 dicas)
  - Problema 5: Esboçar gráfico básico (dica visual)

- Parte 2: Desenvolvendo Autonomia (7 problemas, MÉDIO apoio)
  - Problemas 1-3: Raízes com 1 dica estratégica
  - Problemas 4-5: Vértice com 1 dica
  - Problemas 6-7: Gráfico + análise com dica

- Parte 3: Consolidação (6 problemas, BAIXO apoio)
  - Problemas 1-3: Análise completa, sem dicas
  - Problemas 4-6: Aplicações simples

- Autoavaliação
  - Checklist de 8 habilidades
  - Orientação sobre próximos passos

---

### Resultado Final

Conjunto completo de materiais para Função Quadrática:

1. ✅ `1EM-GUIA-FUNCAO-QUADRATICA.html` - Organização de estudos
2. ✅ `1EM-FUNCAO-QUADRATICA.html` (resumo) - Base teórica rigorosa
3. ✅ `1EM-FUNCAO-QUADRATICA.html` (lista) - 32+ problemas progressivos
4. ✅ `1EM-RECUPERACAO-FUNCAO-QUADRATICA.html` - Apoio para dificuldades

**Total:** 4 arquivos HTML interconectados cobrindo todos os aspectos do aprendizado.

---

## Exemplo 2: Material Rápido sobre Teorema de Pitágoras

### Cenário
Professor precisa apenas de lista de problemas sobre Teorema de Pitágoras para 9º ano.

### Solução: Usar apenas agent-listas

**Solicitação:**

```
Agente: agent-listas
Tópico: Teorema de Pitágoras
Turma: 9ANO
Subtópicos:
  - Cálculo de hipotenusa
  - Cálculo de catetos
  - Verificação de triângulos retângulos (ternos pitagóricos)
  - Triângulos especiais (45-45-90, 30-60-90)
  - Aplicações práticas (distâncias, alturas, diagonal)
Nível: Básico-Intermediário
Contextos: Construção civil, navegação, escadas, mapas, campos de futebol
```

**Output:** `9ANO-TEOREMA-PITAGORAS.html`

**Conteúdo resumido:**

**Introdutórios (10):**
- Calcular hipotenusa: valores inteiros (3-4-5, 5-12-13)
- Calcular catetos: valores inteiros
- Verificar se triângulo é retângulo

**Fixação (12):**
- Problemas contextualizados (escada na parede)
- Valores não inteiros (com raízes)
- Diagonal de retângulo/quadrado
- Distâncias em mapas

**Aprofundamento (8):**
- Múltiplas aplicações do teorema
- Problemas em 3D (diagonal de paralelepípedo)
- Otimização
- Problemas investigativos

**Propostos (8):**
- Aplicações criativas e variadas

---

## Exemplo 3: Recuperação Focada em Equações do 1º Grau

### Cenário
Estudante de 9º ano tem dificuldades persistentes com equações do 1º grau.

### Solução: Usar apenas agent-recuperacao

**Solicitação:**

```
Agente: agent-recuperacao
Tópico: Equações do 1º Grau
Turma: 9ANO
Tópicos deficitários:
  - Isolamento de variável
  - Operações inversas
  - Equações com parênteses
  - Equações com frações
  - Interpretação de problemas
Diagnóstico:
  - Não aplica operação inversa corretamente
  - Erra sinais ao mover termos
  - Confunde "fazer dos dois lados" com "inverter sinal"
  - Dificuldade em "montar" equação a partir de enunciado
Pré-requisitos: Operações básicas, propriedades da igualdade, frações
```

**Output:** `9ANO-RECUPERACAO-EQUACAO-1GRAU.html`

**Estrutura:**

- **Revisão de Conceitos:**
  - O que é equação
  - Propriedade da igualdade
  - Operações inversas
  - Isolamento de variável

- **Parte 1 (ALTO apoio):**
  - Exemplo: @2x + 3 = 11@ resolvido com 5 passos detalhados
  - 5 problemas com múltiplas dicas cada

- **Parte 2 (MÉDIO apoio):**
  - 7 problemas com dificuldade crescente
  - 1 dica estratégica cada

- **Parte 3 (BAIXO apoio):**
  - 6 problemas incluindo contextualizados
  - Mínimas ou nenhuma dica

- **Autoavaliação:**
  - 7 habilidades a verificar

---

## Exemplo 4: Guia para Capítulo de Probabilidade

### Cenário
Introduzir capítulo completo de Probabilidade com visão geral e organização.

### Solução: Usar apenas agent-guias

**Solicitação:**

```
Agente: agent-guias
Capítulo: Probabilidade
Turma: 9ANO
Tópicos:
  - Experimento aleatório
  - Espaço amostral
  - Evento
  - Probabilidade clássica
  - Eventos complementares
  - Eventos mutuamente exclusivos
  - Eventos independentes
  - Probabilidade da união
  - Probabilidade condicional (noções básicas)
Duração: 2 semanas
Objetivos:
  - Compreender conceitos fundamentais de probabilidade
  - Calcular probabilidades em espaços amostrais finitos
  - Identificar tipos de eventos
  - Aplicar propriedades de probabilidade
  - Resolver problemas contextualizados
```

**Output:** `9ANO-GUIA-PROBABILIDADE.html`

**Conteúdo:**

- **Visão Geral:** 2 semanas, 6 objetivos, 3 pré-requisitos

- **Mapa Conceitual:**
  ```
  - Experimento Aleatório
    └─ Espaço Amostral
       └─ Evento
  - Probabilidade
    └─ Probabilidade Clássica
    └─ Propriedades
  - Tipos de Eventos
    └─ Complementares
    └─ Mutuamente Exclusivos
    └─ Independentes
  ```

- **Roteiro (6 etapas):**
  1. Conceitos básicos (experimento, espaço amostral, evento)
  2. Probabilidade clássica
  3. Eventos complementares
  4. Eventos mutuamente exclusivos
  5. Eventos independentes
  6. Problemas integrados

- **Estratégias:**
  - Diagrama de Venn
  - Tabela de possibilidades
  - Árvore de probabilidades
  - Lista organizada

- **Conexões:**
  - Biologia: Genética (probabilidade de características)
  - Física: Teoria cinética dos gases
  - Ciências Sociais: Estatísticas e pesquisas

- **Cronograma:** 2 semanas distribuídas

- **Checklist:** 10 verificações de domínio

- **Recursos:** Links para resumo e lista

---

## Exemplo 5: Resumo Teórico de Geometria Plana

### Cenário
Criar material de referência rigoroso sobre Perímetro e Área.

### Solução: Usar apenas agent-resumos

**Solicitação:**

```
Agente: agent-resumos
Tópico: Perímetro e Área de Figuras Planas
Turma: 9ANO
Conceitos-chave:
  - Definição de perímetro
  - Definição de área
  - Fórmulas para triângulo
  - Fórmulas para quadriláteros (quadrado, retângulo, paralelogramo, trapézio)
  - Fórmula para círculo
  - Unidades de medida
  - Relações entre perímetro e área
Nível: Básico-Intermediário
Pré-requisitos: Figuras geométricas básicas, operações com decimais, raiz quadrada
```

**Output:** `9ANO-GEOMETRIA-PERIMETRO-AREA.html`

**Estrutura:**

- **Seção 1: Conceitos Fundamentais**
  - Definição 1.1: Perímetro
  - Definição 1.2: Área
  - Definição 1.3: Unidades de medida
  - Observação sobre conversão de unidades

- **Seção 2: Fórmulas de Perímetro e Área**
  - Teorema 2.1: Triângulo
  - Teorema 2.2: Quadrado
  - Teorema 2.3: Retângulo
  - Teorema 2.4: Círculo
  - (cada um com demonstração ou justificativa)

- **Seção 3: Exemplos Resolvidos**
  - Exemplo 1: Perímetro de triângulo
  - Exemplo 2: Área de retângulo
  - Exemplo 3: Área de triângulo (fórmula de Heron)
  - Exemplo 4: Área e perímetro de círculo
  - Exemplo 5: Problema contextualizado (terreno)
  - Exemplo 6: Relação área-perímetro

- **Seção 4: Exercícios (12 problemas)**

---

## Padrões de Solicitação

### Template de Solicitação - Agent-Resumos

```
Agente: agent-resumos
Tópico: [Nome do tópico matemático]
Turma: [9ANO/1EM/2EM/3EM/COMPARTILHADO]
Conceitos-chave:
  - [Conceito 1]
  - [Conceito 2]
  - [Conceito 3]
  - [...]
Nível: [Introdutório/Intermediário/Avançado]
Pré-requisitos: [Conhecimentos necessários]
```

### Template de Solicitação - Agent-Listas

```
Agente: agent-listas
Tópico: [Nome do tópico]
Turma: [9ANO/1EM/2EM/3EM]
Subtópicos:
  - [Subtópico 1]
  - [Subtópico 2]
  - [...]
Nível: [Básico/Intermediário/Avançado]
Contextos: [Aplicações práticas desejadas]
```

### Template de Solicitação - Agent-Recuperacao

```
Agente: agent-recuperacao
Tópico: [Tópico principal]
Turma: [9ANO/1EM/2EM/3EM]
Tópicos deficitários:
  - [Lacuna 1]
  - [Lacuna 2]
  - [...]
Diagnóstico:
  - [Erro comum 1]
  - [Erro comum 2]
  - [...]
Pré-requisitos: [Conceitos a revisar]
```

### Template de Solicitação - Agent-Guias

```
Agente: agent-guias
Capítulo: [Nome do capítulo/unidade]
Turma: [9ANO/1EM/2EM/3EM]
Tópicos:
  - [Tópico 1]
  - [Tópico 2]
  - [...]
Duração: [X semanas/dias]
Objetivos:
  - [Objetivo 1 com verbo de ação]
  - [Objetivo 2]
  - [...]
```

---

## Dicas de Uso

### ✅ Boas Práticas

1. **Seja específico nos inputs**
   - ❌ "Função"
   - ✅ "Função Afim: definição, coeficientes, gráfico, zero da função"

2. **Indique contextos desejados**
   - ❌ "Aplicações práticas"
   - ✅ "Tarifas, velocidade, receita, custo-benefício"

3. **Descreva o diagnóstico claramente**
   - ❌ "Estudantes têm dificuldades"
   - ✅ "Estudantes erram sinais ao aplicar Bhaskara e confundem fórmulas de vértice"

4. **Use os agentes em conjunto**
   - Novo tópico completo = Guia + Resumo + Lista + Recuperação (opcional)
   - Material de referência = Resumo + Lista
   - Apoio direcionado = Recuperação isolada

### ⚠️ Armadilhas a Evitar

1. **Não misture múltiplos tópicos**
   - ❌ "Função afim e quadrática juntas"
   - ✅ Crie arquivos separados para cada tópico

2. **Não seja vago**
   - ❌ "Problemas de matemática"
   - ✅ "Problemas sobre aplicação do Teorema de Pitágoras em contextos de construção civil"

3. **Não pule validação**
   - Sempre use a Checklist de Validação do agente
   - Teste LaTeX no navegador
   - Verifique responsividade

---

## Próximos Passos

Após criar conteúdo com os agentes:

1. **Validar** com checklist específica do agente
2. **Testar** em navegador (KaTeX, temas, print-mode)
3. **Adicionar links** em `recursos.html`
4. **Atualizar** `curriculum.json` se necessário
5. **Criar missões** no dashboard (se aplicável)

---

**Versão:** 1.0
**Data:** 2025-10-02

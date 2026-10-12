/**
 * curriculum-navigator.js
 * Módulo de Navegação Curricular e Matriz de Habilidades do Portal Nexus
 * Suporta navegação interativa por abas (9º EF, 1º EM, 2º EM, 3º EM),
 * busca em tempo real por tópicos e habilidades BNCC, e sincronização com class-selector.js.
 */

(function() {
  'use strict';

  // Matriz Curricular Completa do Portal Nexus
  const CURRICULUM_DATA = {
    '9ano': {
      title: '9º Ano do Ensino Fundamental',
      subtitle: 'Transição Algébrica, Razões e Fundamentação Geométrica Euclidiana',
      classes: ['9A', '9B'],
      badge: '9º ANO EF',
      badgeClass: 'ano-9',
      chapters: [
        {
          num: 1,
          title: 'Potenciação, Radiciação e Números Irracionais',
          topics: [
            'Propriedades das potências com expoentes inteiros e fracionários',
            'Radiciação e simplificação de radicais aritméticos',
            'Aproximações racionais e localização de números irracionais na reta real',
            'Operações fundamentais com radicais e racionalização de denominadores',
            'Notação científica e ordens de grandeza em contextos interdisciplinares'
          ],
          skills: [
            { code: 'EF09MA01', desc: 'Reconhecer que a raiz quadrada de um número não quadrado perfeito é irracional.' },
            { code: 'EF09MA02', desc: 'Reconhecer e empregar a notação científica para expressar medidas muito grandes ou pequenas.' },
            { code: 'EF09MA03', desc: 'Efetuar cálculos com números reais utilizando potenciação e radiciação.' }
          ],
          resources: {
            resumo: 'recursos/resumos/9ANO-NUMEROS-REAIS.html',
            lista: 'recursos/listas/9ANO-RADICIACAO-POTENCIACAO.html',
            recuperacao: 'recursos/recuperacao/9ANO-RECUPERACAO-RADICIACAO-POTENCIACAO.html',
            guia: 'recursos/guias/9ANO-GUIA-RADICIACAO-POTENCIACAO.html'
          }
        },
        {
          num: 2,
          title: 'Razão, Proporção e Grandezas Proporcionais',
          topics: [
            'Razões entre grandezas de mesma espécie e de espécies diferentes',
            'Proporções e propriedade fundamental das proporções',
            'Divisão em partes direta e inversamente proporcionais',
            'Regra de três simples e composta com múltiplas grandezas',
            'Modelagem de problemas práticos, escalas cartográficas e densidade demográfica'
          ],
          skills: [
            { code: 'EF09MA07', desc: 'Resolver problemas que envolvam a razão entre duas grandezas de espécies diferentes.' },
            { code: 'EF09MA08', desc: 'Resolver problemas que envolvam relações de proporcionalidade direta e inversa entre duas ou mais grandezas.' }
          ],
          resources: {
            resumo: 'recursos/resumos/9ANO-RAZAO-PROPORCAO.html',
            lista: 'recursos/listas/9ANO-RAZAO-PROPORCAO.html',
            recuperacao: 'recursos/recuperacao/9ANO-RECUPERACAO-RAZAO-PROPORCAO.html',
            guia: 'recursos/guias/9ANO-GUIA-RAZAO-PROPORCAO.html'
          }
        },
        {
          num: 3,
          title: 'Produtos Notáveis, Fatoração e Expressões Algébricas',
          topics: [
            'Quadrado da soma e da diferença de dois termos',
            'Produto da soma pela diferença de dois termos',
            'Casos fundamentais de fatoração: fator comum em evidência, agrupamento e diferença de quadrados',
            'Trinômio quadrado perfeito e produto de Stevin',
            'Simplificação analítica de frações algébricas e conexão com o Triângulo de Pascal'
          ],
          skills: [
            { code: 'EF09MA09', desc: 'Compreender os processos de fatoração de expressões algébricas com base em suas relações com os produtos notáveis.' }
          ],
          resources: {
            resumo: 'recursos/resumos/9ANO-PRODUTOS-NOTAVEIS.html',
            lista: 'recursos/listas/9ANO-PRODUTOS-NOTAVEIS.html',
            recuperacao: 'recursos/recuperacao/9ANO-RECUPERACAO-PRODUTOS-NOTAVEIS.html',
            guia: 'recursos/guias/9ANO-GUIA-PRODUTOS-NOTAVEIS.html'
          }
        },
        {
          num: 4,
          title: 'Teorema de Tales e Semelhança de Triângulos',
          topics: [
            'Feixe de retas paralelas cortadas por transversais e Teorema de Tales',
            'Divisão proporcional de segmentos na reta',
            'Critérios de semelhança de triângulos: AA, LAL e LLL',
            'Homotetia e transformações geométricas no plano',
            'Aplicações do Teorema de Tales em medições e agrimensura histórica'
          ],
          skills: [
            { code: 'EF09MA10', desc: 'Demonstrar relações de proporcionalidade e o Teorema de Tales em feixes de paralelas.' },
            { code: 'EF09MA12', desc: 'Reconhecer as condições necessárias e suficientes para que dois triângulos sejam semelhantes.' }
          ],
          resources: {
            resumo: 'recursos/resumos/9ANO-TALES-SEMELHANCA.html',
            lista: 'recursos/listas/9ANO-TALES-SEMELHANCA.html',
            recuperacao: 'recursos/recuperacao/9ANO-RECUPERACAO-TALES-SEMELHANCA.html',
            guia: 'recursos/guias/9ANO-GUIA-TALES-SEMELHANCA.html'
          }
        },
        {
          num: 5,
          title: 'Relações Métricas no Triângulo Retângulo e Teorema de Pitágoras',
          topics: [
            'Demonstração geométrica e analítica do Teorema de Pitágoras',
            'Relações métricas no triângulo retângulo (projeções dos catetos e altura)',
            'Razões trigonométricas no triângulo retângulo: seno, cosseno e tangente',
            'Ângulos notáveis de 30°, 45° e 60° e deduções euclidianas',
            'Cálculo de distâncias inacessíveis e resolução de problemas práticos'
          ],
          skills: [
            { code: 'EF09MA13', desc: 'Demonstrar relações métricas do triângulo retângulo, entre elas o Teorema de Pitágoras.' },
            { code: 'EF09MA14', desc: 'Resolver problemas de aplicação do Teorema de Pitágoras ou das relações de proporcionalidade.' }
          ],
          resources: {
            resumo: 'recursos/resumos/9ANO-PITAGORAS-TRIGONOMETRIA.html',
            lista: 'recursos/listas/9ANO-PITAGORAS-TRIGONOMETRIA.html',
            recuperacao: 'recursos/recuperacao/9ANO-RECUPERACAO-PITAGORAS-TRIGONOMETRIA.html',
            guia: 'recursos/guias/9ANO-GUIA-PITAGORAS-TRIGONOMETRIA.html'
          }
        },
        {
          num: 6,
          title: 'Equações e Inequações do 2º Grau',
          topics: [
            'Forma canônica da equação quadrática ax² + bx + c = 0',
            'Dedução da fórmula de Bhaskara por completamento de quadrados',
            'Estudo analítico do discriminante Delta (raízes reais distintas, duplas ou complexas)',
            'Relações de Girard (soma e produto das raízes)',
            'Equações biquadradas, fracionárias e irracionais'
          ],
          skills: [
            { code: 'EF09MA09', desc: 'Resolver equações polinomiais de 2º grau por meio de fatoração e completamento de quadrados.' }
          ],
          resources: {
            resumo: 'recursos/resumos/9ANO-EQUACOES-2GRAU.html',
            lista: 'recursos/listas/9ANO-EQUACOES-2GRAU.html',
            recuperacao: 'recursos/recuperacao/9ANO-RECUPERACAO-EQUACOES-2GRAU.html',
            guia: 'recursos/guias/9ANO-GUIA-EQUACOES-2GRAU.html'
          }
        },
        {
          num: 7,
          title: 'Estatística Descritiva e Análise de Dados',
          topics: [
            'Planejamento de pesquisas amostrais e censitárias',
            'Tabelas de frequências absolutas e relativas (simples e por classes)',
            'Medidas de tendência central: média aritmética simples, ponderada, mediana e moda',
            'Medidas de dispersão: amplitude total e noções de desvio médio',
            'Interpretação crítica de gráficos de barras, colunas, setores e histogramas'
          ],
          skills: [
            { code: 'EF09MA21', desc: 'Identificar e analisar criticamente variáveis categóricas e numéricas em tabelas e gráficos.' },
            { code: 'EF09MA22', desc: 'Escolher e calcular a medida de tendência central mais adequada para resumir dados de uma pesquisa.' }
          ],
          resources: {
            resumo: 'recursos/resumos/9ANO-ESTATISTICA.html',
            lista: 'recursos/listas/9ANO-ESTATISTICA.html',
            recuperacao: 'recursos/recuperacao/9ANO-RECUPERACAO-ESTATISTICA.html',
            guia: 'recursos/guias/9ANO-GUIA-ESTATISTICA.html'
          }
        },
        {
          num: 8,
          title: 'Probabilidade e Modelagem Estocástica',
          topics: [
            'Experimentos aleatórios, espaço amostral e eventos',
            'Definição clássica de probabilidade de Laplace para espaços equiprováveis',
            'Probabilidade de eventos complementares e probabilidade da união de eventos',
            'Eventos dependentes e independentes e regra da multiplicação',
            'Simulação de probabilidades e experimentos com árvores de possibilidades'
          ],
          skills: [
            { code: 'EF09MA20', desc: 'Reconhecer, em experimentos aleatórios, eventos equiprováveis e estimar suas probabilidades.' }
          ],
          resources: {
            resumo: 'recursos/resumos/9ANO-PROBABILIDADE.html',
            lista: 'recursos/listas/9ANO-PROBABILIDADE.html',
            recuperacao: 'recursos/recuperacao/9ANO-RECUPERACAO-PROBABILIDADE.html',
            guia: 'recursos/guias/9ANO-GUIA-PROBABILIDADE.html'
          }
        },
        {
          num: 9,
          title: 'Geometria Espacial: Superfícies e Volumes de Sólidos',
          topics: [
            'Poliedros e corpos redondos no espaço tridimensional',
            'Cálculo de áreas de superfícies de prismas retos e cilindros',
            'Cálculo de volume e capacidade volumétrica de sólidos regulares',
            'Relações entre unidades de volume (m³, dm³, cm³) e de capacidade (L, mL)',
            'Princípio de Cavalieri intuitivo e aplicações na engenharia e arquitetura'
          ],
          skills: [
            { code: 'EF09MA19', desc: 'Demonstrar e resolver problemas envolvendo o cálculo de volume de prismas e cilindros retos.' }
          ],
          resources: {
            resumo: 'recursos/resumos/9ANO-GEOMETRIA-ESPACIAL.html',
            lista: 'recursos/listas/9ANO-GEOMETRIA-ESPACIAL.html',
            recuperacao: 'recursos/recuperacao/9ANO-RECUPERACAO-GEOMETRIA-ESPACIAL.html',
            guia: 'recursos/guias/9ANO-GUIA-GEOMETRIA-ESPACIAL.html'
          }
        }
      ]
    },

    '1em': {
      title: '1º Ano do Ensino Médio',
      subtitle: 'Conjuntos Axiomáticos, Álgebra das Funções, Modelagem e Otimização',
      classes: ['1A', '1B'],
      badge: '1º ANO EM',
      badgeClass: 'ano-1em',
      chapters: [
        {
          num: 1,
          title: 'Realidade Aumentada: Números, Reta Real e Incomensurabilidade',
          topics: [
            'Construção axiomática dos conjuntos N (Peano/PIM), Z, Q e R',
            'Demonstração da irracionalidade de raiz quadrada de dois por contradição',
            'Dízimas periódicas e limites de séries geométricas infinitas',
            'O Axioma do Supremo (Completeza de Dedekind) e o Teorema da Densidade',
            'Topologia elementar de intervalos na reta real e desigualdades modulares'
          ],
          skills: [
            { code: 'EM13MAT101', desc: 'Interpretar criticamente e utilizar números reais em contextos científicos e tecnológicos.' },
            { code: 'EM13MAT301', desc: 'Resolver e elaborar problemas que envolvam grandezas comensuráveis e incomensuráveis.' }
          ],
          resources: {
            resumo: 'recursos/resumos/1EM-CONJUNTOS-NUMERICOS.html',
            lista: 'recursos/listas/1EM-CONJUNTOS-NUMERICOS.html',
            recuperacao: 'recursos/recuperacao/1EM-RECUPERACAO-CONJUNTOS-NUMERICOS.html',
            guia: 'recursos/guias/1EM-GUIA-CONJUNTOS-NUMERICOS.html'
          }
        },
        {
          num: 2,
          title: 'Entre Retas e Parábolas: Funções Polinomiais de 1º e 2º Graus',
          topics: [
            'Conceito formal de função: domínio, contradomínio, imagem e paridade',
            'Funções afins: coeficiente angular, linear, taxa de variação média e retas',
            'Funções quadráticas: forma canônica, coordenadas do vértice e concavidade',
            'Problemas de otimização analítica (máximos e mínimos de parábolas)',
            'Modelagem matemática aplicada a custos, receitas, lucros e trajetórias balísticas'
          ],
          skills: [
            { code: 'EM13MAT302', desc: 'Construir modelos de funções afins e quadráticas para descrever e prever fenômenos.' },
            { code: 'EM13MAT401', desc: 'Converter representações algébricas de funções de 1º e 2º graus em gráficas e vice-versa.' },
            { code: 'EM13MAT501', desc: 'Investigar relações de otimização de grandezas (área máxima, custo mínimo) via funções quadráticas.' }
          ],
          resources: {
            resumo: 'recursos/resumos/1EM-FUNCAO-1GRAU.html',
            lista: 'recursos/listas/1EM-FUNCAO-1GRAU.html',
            recuperacao: 'recursos/recuperacao/1EM-RECUPERACAO-FUNCAO-1GRAU.html',
            guia: 'recursos/guias/1EM-GUIA-FUNCAO-1GRAU.html'
          }
        },
        {
          num: 3,
          title: 'Escalas Não Lineares: Funções Exponenciais e Logarítmicas',
          topics: [
            'Potenciação com expoentes reais e propriedades operatórias fundamentais',
            'Funções exponenciais: crescimento, decrescimento e assíntotas horizontais',
            'Definição formal de logaritmo e propriedades do produto, quociente e potência',
            'Mudança de base logarítmica e resolução de inequações exponenciais',
            'Modelagem de fenômenos: juros compostos, datação por carbono, escalas Richter e decibéis'
          ],
          skills: [
            { code: 'EM13MAT303', desc: 'Interpretar e comparar modelos de crescimento linear com crescimento exponencial.' },
            { code: 'EM13MAT304', desc: 'Resolver e elaborar problemas com funções logarítmicas em escalas logarítmicas das ciências.' }
          ],
          resources: {
            resumo: 'recursos/resumos/1EM-EXPONENCIAL-LOGARITMO.html',
            lista: 'recursos/listas/1EM-EXPONENCIAL-LOGARITMO.html',
            recuperacao: 'recursos/recuperacao/1EM-RECUPERACAO-EXPONENCIAL-LOGARITMO.html',
            guia: 'recursos/guias/1EM-GUIA-EXPONENCIAL-LOGARITMO.html'
          }
        },
        {
          num: 4,
          title: 'Tem Razão! Progressões Aritméticas e Geométricas',
          topics: [
            'Sequências numéricas e regularidades indutivas',
            'Progressão Aritmética (PA): razão, termo geral e propriedades de simetria',
            'Soma dos n termos de uma PA e relação com funções afins de domínio discreto',
            'Progressão Geométrica (PG): razão, termo geral e classificação',
            'Soma dos termos finitos e soma da série infinita de uma PG (|q| < 1)'
          ],
          skills: [
            { code: 'EM13MAT507', desc: 'Identificar padrões em sequências numéricas e relacionar PAs e PGs a funções lineares e exponenciais discretas.' },
            { code: 'EM13MAT508', desc: 'Aplicar a soma de progressões em cálculos de matemática financeira e geometria fractal.' }
          ],
          resources: {
            resumo: 'recursos/resumos/1EM-PROGRESSOES.html',
            lista: 'recursos/listas/1EM-PROGRESSOES.html',
            recuperacao: 'recursos/recuperacao/1EM-RECUPERACAO-PROGRESSOES.html',
            guia: 'recursos/guias/1EM-GUIA-PROGRESSOES.html'
          }
        },
        {
          num: 5,
          title: 'Simetrizando e Trigonometrizando: Relações Métricas e Arcos',
          topics: [
            'Semelhança de triângulos e teoremas fundamentais da geometria euclidiana',
            'Relações métricas no triângulo retângulo e demonstração do Teorema de Pitágoras',
            'Razões trigonométricas e a primeira relação fundamental sen²(x) + cos²(x) = 1',
            'Arcos de circunferência, radianos e conversão de unidades angulares',
            'Relações métricas na circunferência (potência de ponto, cordas e secantes)'
          ],
          skills: [
            { code: 'EM13MAT306', desc: 'Resolver problemas com razões trigonométricas e identidades fundamentais no triângulo retângulo.' },
            { code: 'EM13MAT307', desc: 'Empregar transformações geométricas e semelhança para resolução de problemas métricos.' }
          ],
          resources: {
            resumo: 'recursos/resumos/1EM-TRIGONOMETRIA.html',
            lista: 'recursos/listas/1EM-TRIGONOMETRIA.html',
            recuperacao: 'recursos/recuperacao/1EM-RECUPERACAO-TRIGONOMETRIA.html',
            guia: 'recursos/guias/1EM-GUIA-TRIGONOMETRIA.html'
          }
        },
        {
          num: 6,
          title: 'Decidir é Preciso! Estatística e Medidas de Dispersão',
          topics: [
            'Planejamento de pesquisas científicas, censo vs. amostra aleatória',
            'Medidas de tendência central: média aritmética simples, ponderada, mediana e moda',
            'Medidas de dispersão: variância populacional e amostral, desvio padrão e amplitude',
            'Coeficiente de variação de Pearson e análise da homogeneidade dos dados',
            'Análise crítica de falácias em gráficos da mídia e economia (inflação e poder de compra)'
          ],
          skills: [
            { code: 'EM13MAT102', desc: 'Analisar tabelas, gráficos e medidas estatísticas em relatórios científicos e jornalísticos.' },
            { code: 'EM13MAT202', desc: 'Planejar e executar pesquisas estatísticas com cálculo de desvio padrão e variância.' }
          ],
          resources: {
            resumo: 'recursos/resumos/1EM-ESTATISTICA.html',
            lista: 'recursos/listas/1EM-ESTATISTICA.html',
            recuperacao: 'recursos/recuperacao/1EM-RECUPERACAO-ESTATISTICA.html',
            guia: 'recursos/guias/1EM-GUIA-ESTATISTICA.html'
          }
        },
        {
          num: 7,
          title: 'Será que é Sorte? Probabilidade e Teoria dos Eventos',
          topics: [
            'Espaço amostral equiprovável e cálculo de probabilidades clássicas',
            'Princípio da Inclusão-Exclusão para probabilidades da união P(A U B)',
            'Probabilidade condicional P(A|B) e regra do produto para eventos dependentes',
            'Eventos mutuamente exclusivos e eventos independentes',
            'Árvores de probabilidades e introdução ao Teorema de Bayes'
          ],
          skills: [
            { code: 'EM13MAT311', desc: 'Calcular a probabilidade de eventos com o uso da probabilidade condicional.' },
            { code: 'EM13MAT312', desc: 'Resolver problemas práticos que envolvam tomada de decisão sob incerteza.' }
          ],
          resources: {
            resumo: 'recursos/resumos/1EM-PROBABILIDADE.html',
            lista: 'recursos/listas/1EM-PROBABILIDADE.html',
            recuperacao: 'recursos/recuperacao/1EM-RECUPERACAO-PROBABILIDADE.html',
            guia: 'recursos/guias/1EM-GUIA-PROBABILIDADE.html'
          }
        },
        {
          num: 8,
          title: 'Superfícies e Contornos: Áreas e Perímetros no Plano Euclidiano',
          topics: [
            'Axiomática da medida de área (positividade, aditividade, congruência e normalização)',
            'Dedução rigorosa das fórmulas de triângulos, retângulos, trapézios e losangos',
            'Fórmula de Heron para triângulos quaisquer e relações de inraio e circunraio',
            'Teorema de Pick para polígonos em malhas reticuladas e lúnulas de Hipócrates',
            'Área de círculos, setores, coroas e problemas de otimização isoperimétrica'
          ],
          skills: [
            { code: 'EM13MAT307', desc: 'Deduzir e aplicar fórmulas de áreas de figuras planas e regiões circulares.' },
            { code: 'EM13MAT509', desc: 'Investigar o problema isoperimétrico e relações de equivalência de áreas.' }
          ],
          resources: {
            resumo: 'recursos/resumos/1EM-AREAS-PERIMETROS.html',
            lista: 'recursos/listas/1EM-AREAS-PERIMETROS.html',
            recuperacao: 'recursos/recuperacao/1EM-RECUPERACAO-AREAS-PERIMETROS.html',
            guia: 'recursos/guias/1EM-GUIA-AREAS-PERIMETROS.html'
          }
        }
      ]
    },

    '2em': {
      title: '2º Ano do Ensino Médio',
      subtitle: 'Geometria Espacial, Álgebra Linear, Análise Combinatória e Finanças',
      classes: ['2EM'],
      badge: '2º ANO EM',
      badgeClass: 'ano-2em',
      chapters: [
        {
          num: 1,
          title: 'Ladrilhando e Pavimentando o Plano',
          topics: [
            'Tesselações do plano euclidiano e polígonos regulares',
            'Soma dos ângulos internos e externos de polígonos convexos',
            'Condições angulares para ladrilhamento regular uniforme (3.3.3.3.3.3, 4.4.4.4, 6.6.6)',
            'Composição e decomposição de polígonos em triângulos fundamentais',
            'Exploração computacional e simetrias de rotação, reflexão e translação'
          ],
          skills: [
            { code: 'EM13MAT103', desc: 'Interpretar e produzir mosaicos e ladrilhamentos com base em propriedades geométricas.' },
            { code: 'EM13MAT509', desc: 'Investigar recobrimentos do plano e padrões geométricos presentes na arte e na arquitetura.' }
          ],
          resources: {
            resumo: 'recursos/resumos/2EM-LADRILHAMENTO-POLIGONOS.html',
            lista: 'recursos/listas/2EM-LADRILHAMENTO-POLIGONOS.html',
            recuperacao: 'recursos/recuperacao/2EM-RECUPERACAO-LADRILHAMENTO-POLIGONOS.html',
            guia: 'recursos/guias/2EM-GUIA-LADRILHAMENTO-POLIGONOS.html'
          }
        },
        {
          num: 2,
          title: 'Geometria Espacial: Poliedros, Prismas e Pirâmides',
          topics: [
            'Axiomas da geometria de posição (Hilbert-Euclides) em R³',
            'Paralelismo e perpendicularidade entre retas e planos no espaço',
            'Poliedros convexos e o Teorema de Euler V - A + F = 2',
            'Os cinco sólidos platônicos e cálculo métrico de diagonais e apótemas',
            'Cálculo analítico de áreas laterais, totais e volumes de prismas e pirâmides'
          ],
          skills: [
            { code: 'EM13MAT105', desc: 'Utilizar noções de geometria espacial para modelar e resolver problemas tridimensionais.' },
            { code: 'EM13MAT309', desc: 'Resolver problemas envolvendo o cálculo de área total e volume de prismas e pirâmides.' }
          ],
          resources: {
            resumo: 'recursos/resumos/2EM-GEOMETRIA-ESPACIAL.html',
            lista: 'recursos/listas/2EM-GEOMETRIA-ESPACIAL.html',
            recuperacao: 'recursos/recuperacao/2EM-RECUPERACAO-GEOMETRIA-ESPACIAL.html',
            guia: 'recursos/guias/2EM-GUIA-GEOMETRIA-ESPACIAL.html'
          }
        },
        {
          num: 3,
          title: 'Matemática Comercial e Planejamento Financeiro',
          topics: [
            'Juros simples e compostos: formulação matemática e montante',
            'Taxas proporcionais, equivalentes, nominais e efetivas',
            'Fluxo de caixa, valor presente (VP), valor futuro (VF) e inflação',
            'Planilhas financeiras e modelagem de investimentos e amortizações',
            'Análise de viabilidade econômica e tomada de decisão consciente'
          ],
          skills: [
            { code: 'EM13MAT203', desc: 'Aplicar conceitos de matemática financeira na tomada de decisões e planejamento orçamentário.' },
            { code: 'EM13MAT315', desc: 'Comparar e modelar planos de investimento e financiamento em juros simples e compostos.' }
          ],
          resources: {
            resumo: 'recursos/resumos/2EM-MATEMATICA-FINANCEIRA.html',
            lista: 'recursos/listas/2EM-MATEMATICA-FINANCEIRA.html',
            recuperacao: 'recursos/recuperacao/2EM-RECUPERACAO-MATEMATICA-FINANCEIRA.html',
            guia: 'recursos/guias/2EM-GUIA-MATEMATICA-FINANCEIRA.html'
          }
        },
        {
          num: 4,
          title: 'Variações de Preço e Conexões Algébricas',
          topics: [
            'Relação formal entre juros simples e progressões aritméticas (crescimento afim)',
            'Relação formal entre juros compostos e progressões geométricas (crescimento exponencial)',
            'Aumentos e descontos percentuais sucessivos e fatores multiplicativos',
            'Linhas de tendência e ajuste de modelos em regressão linear',
            'Sistemas de representação múltipla: tabelas, fórmulas e gráficos computacionais'
          ],
          skills: [
            { code: 'EM13MAT303', desc: 'Modelar situações socioeconômicas por meio de funções afins e exponenciais.' },
            { code: 'EM13MAT507', desc: 'Investigar o comportamento de progressões aplicadas à economia.' }
          ],
          resources: {
            resumo: 'recursos/resumos/2EM-FINANCAS-PROGRESSOES.html',
            lista: 'recursos/listas/2EM-FINANCAS-PROGRESSOES.html',
            recuperacao: 'recursos/recuperacao/2EM-RECUPERACAO-FINANCAS-PROGRESSOES.html',
            guia: 'recursos/guias/2EM-GUIA-FINANCAS-PROGRESSOES.html'
          }
        },
        {
          num: 5,
          title: 'Álgebra Linear: Matrizes e Tabelas de Dados',
          topics: [
            'Definição formal de matrizes e notação de ordem m x n',
            'Operações matriciais fundamentais: adição, transposição e multiplicação por escalar',
            'Multiplicação de matrizes e propriedades de associatividade e distributividade',
            'Matriz identidade, matriz inversa e condições de invertibilidade',
            'Aplicações computacionais: grafos, processamento de imagens e criptografia de Hill'
          ],
          skills: [
            { code: 'EM13MAT201', desc: 'Organizar dados em matrizes e efetuar operações para resolver problemas multidimensionais.' },
            { code: 'EM13MAT313', desc: 'Utilizar matrizes e determinantes na modelagem e resolução de transformações e redes.' }
          ],
          resources: {
            resumo: 'recursos/resumos/2EM-MATRIZES.html',
            lista: 'recursos/listas/2EM-MATRIZES.html',
            recuperacao: 'recursos/recuperacao/2EM-RECUPERACAO-MATRIZES.html',
            guia: 'recursos/guias/2EM-GUIA-MATRIZES.html'
          }
        },
        {
          num: 6,
          title: 'Determinantes e Resolução de Sistemas',
          topics: [
            'Definição axiomática de determinante para matrizes quadradas',
            'Cálculo de determinantes de ordem 2 e 3 (Regra de Sarrus)',
            'Teorema de Laplace e cálculo para matrizes de ordem n',
            'Propriedades operatórias dos determinantes e Teorema de Binet: det(AB) = det(A)det(B)',
            'Regra de Cramer para sistemas lineares com determinante não nulo'
          ],
          skills: [
            { code: 'EM13MAT313', desc: 'Calcular determinantes utilizando propriedades operatórias e o Teorema de Laplace.' },
            { code: 'EM13MAT503', desc: 'Investigar a solubilidade de sistemas lineares via determinantes e regra de Cramer.' }
          ],
          resources: {
            resumo: 'recursos/resumos/2EM-MATRIZES-DETERMINANTES.html',
            lista: 'recursos/listas/2EM-MATRIZES-DETERMINANTES.html',
            recuperacao: 'recursos/recuperacao/2EM-RECUPERACAO-MATRIZES-DETERMINANTES.html',
            guia: 'recursos/guias/2EM-GUIA-MATRIZES-DETERMINANTES.html'
          }
        },
        {
          num: 7,
          title: 'Análise Combinatória e Princípios de Contagem',
          topics: [
            'Princípio Fundamental da Contagem (regra do produto)',
            'Fatorial e permutações simples, circulares e com elementos repetidos',
            'Arranjos simples e distinção formal em relação a combinações',
            'Combinações simples e combinações com repetição (método dos traços e bolas)',
            'Propriedades dos números binomiais e Teorema das Linhas do Triângulo de Pascal'
          ],
          skills: [
            { code: 'EM13MAT310', desc: 'Resolver e elaborar problemas de contagem envolvendo permutações, arranjos e combinações.' },
            { code: 'EM13MAT311', desc: 'Utilizar princípios combinatórios no cálculo de probabilidades em espaços amostrais finitos.' }
          ],
          resources: {
            resumo: 'recursos/resumos/2EM-ANALISE-COMBINATORIA.html',
            lista: 'recursos/listas/2EM-ANALISE-COMBINATORIA.html',
            recuperacao: 'recursos/recuperacao/2EM-RECUPERACAO-ANALISE-COMBINATORIA.html',
            guia: 'recursos/guias/2EM-GUIA-ANALISE-COMBINATORIA.html'
          }
        }
      ]
    },

    '3em': {
      title: '3º Ano do Ensino Médio',
      subtitle: 'Geometria Analítica, Sistemas Lineares, Cálculo de Volumes e Esfera',
      classes: ['3EM'],
      badge: '3º ANO EM',
      badgeClass: 'ano-3em',
      chapters: [
        {
          num: 1,
          title: 'Trigonometria no Ciclo e Funções Circulares',
          topics: [
            'O ciclo trigonométrico unitário e orientação no plano cartesiano',
            'Medidas de arcos em graus e radianos e simetrias nos quatro quadrantes',
            'Definição analítica das funções seno, cosseno e tangente',
            'Relações fundamentais e derivadas: tg(x), cotg(x), sec(x), cossec(x)',
            'Fórmulas de adição e subtração de arcos, arco duplo e equações trigonométricas'
          ],
          skills: [
            { code: 'EM13MAT306', desc: 'Construir e interpretar gráficos das funções periódicas seno e cosseno.' },
            { code: 'EM13MAT308', desc: 'Aplicar transformações de arcos e identidades trigonométricas na resolução de equações.' }
          ],
          resources: {
            resumo: 'recursos/resumos/3EM-TRIGONOMETRIA-CICLO.html',
            lista: 'recursos/listas/3EM-TRIGONOMETRIA-CICLO.html',
            recuperacao: 'recursos/recuperacao/3EM-RECUPERACAO-TRIGONOMETRIA-CICLO.html',
            guia: 'recursos/guias/3EM-GUIA-TRIGONOMETRIA-CICLO.html'
          }
        },
        {
          num: 2,
          title: 'Parábolas, Otimização e Modelos Quadráticos',
          topics: [
            'Aprofundamento na geometria da parábola: foco, vértice e diretriz',
            'Equações do segundo grau e relações de Girard na fatoração de polinômios',
            'Problemas complexos de otimização econômica e física',
            'Fluxogramas de decisão algorítmica para raízes e estudo de sinais',
            'Aplicações da parábola em antenas, faróis refletores e pontes pênseis'
          ],
          skills: [
            { code: 'EM13MAT302', desc: 'Modelar sistemas físicos e econômicos não lineares via equações quadráticas.' },
            { code: 'EM13MAT401', desc: 'Analisar propriedades de foco e diretriz na geometria analítica das cônicas.' }
          ],
          resources: {
            resumo: 'recursos/resumos/3EM-PARABOLAS-OTIMIZACAO.html',
            lista: 'recursos/listas/3EM-PARABOLAS-OTIMIZACAO.html',
            recuperacao: 'recursos/recuperacao/3EM-RECUPERACAO-PARABOLAS-OTIMIZACAO.html',
            guia: 'recursos/guias/3EM-GUIA-PARABOLAS-OTIMIZACAO.html'
          }
        },
        {
          num: 3,
          title: 'Razão, Proporção e Porcentagens Avançadas',
          topics: [
            'Proporções múltiplas e grandezas compostas',
            'Regra de três composta e fator de escala multidimensional',
            'Variações percentuais encadeadas e cálculo do ponto de equilíbrio econômico',
            'Modelos matemáticos aplicados à demografia e taxas de variação composta',
            'Resolução de problemas de alta complexidade em vestibulares e olimpíadas'
          ],
          skills: [
            { code: 'EM13MAT203', desc: 'Resolver problemas socioeconômicos complexos com variações percentuais sucessivas.' },
            { code: 'EM13MAT314', desc: 'Empregar razões e proporções na análise crítica de dados econômicos e sociais.' }
          ],
          resources: {
            resumo: 'recursos/resumos/3EM-PROPORCAO-PORCENTAGEM.html',
            lista: 'recursos/listas/3EM-PROPORCAO-PORCENTAGEM.html',
            recuperacao: 'recursos/recuperacao/3EM-RECUPERACAO-PROPORCAO-PORCENTAGEM.html',
            guia: 'recursos/guias/3EM-GUIA-PROPORCAO-PORCENTAGEM.html'
          }
        },
        {
          num: 4,
          title: 'Sistemas Lineares e Interpretação Geométrica no Espaço',
          topics: [
            'Sistemas lineares de m equações com n incógnitas e notação matricial AX = B',
            'Método de escalonamento de Gauss e Gauss-Jordan',
            'Teorema de Rouché-Capelli para análise de postos da matriz dos coeficientes e ampliada',
            'Classificação analítica: Sistema Possível Determinado (SPD), Indeterminado (SPI) e Impossível (SI)',
            'Interpretação geométrica no espaço R³: planos concorrentes, paralelos e coincidentes'
          ],
          skills: [
            { code: 'EM13MAT313', desc: 'Resolver sistemas lineares por escalonamento e aplicar em redes elétricas e tráfego.' },
            { code: 'EM13MAT503', desc: 'Interpretar geometricamente a solução de sistemas lineares de 3 equações e 3 incógnitas.' }
          ],
          resources: {
            resumo: 'recursos/resumos/3EM-SISTEMAS-LINEARES.html',
            lista: 'recursos/listas/3EM-SISTEMAS-LINEARES.html',
            recuperacao: 'recursos/recuperacao/3EM-RECUPERACAO-SISTEMAS-LINEARES.html',
            guia: 'recursos/guias/3EM-GUIA-SISTEMAS-LINEARES.html'
          }
        },
        {
          num: 5,
          title: 'Arquimedes e Cavalieri: Volumes e Corpos Redondos',
          topics: [
            'O Princípio de Cavalieri e sua demonstração de equivalência volumétrica',
            'Cálculo de volume de cilindros, cones e troncos de cone',
            'Dedução rigorosa do volume da esfera (4/3 pi R³) comparada ao clepsidro de Arquimedes',
            'Área superficial da esfera (4 pi R²) e calotas esféricas',
            'Sólidos compostos, vazados e problemas de empacotamento'
          ],
          skills: [
            { code: 'EM13MAT105', desc: 'Modelar problemas tridimensionais complexos usando o Princípio de Cavalieri.' },
            { code: 'EM13MAT309', desc: 'Calcular a área total e o volume de corpos redondos (cilindros, cones e esferas).' }
          ],
          resources: {
            resumo: 'recursos/resumos/3EM-VOLUMES-CAVALIERI.html',
            lista: 'recursos/listas/3EM-VOLUMES-CAVALIERI.html',
            recuperacao: 'recursos/recuperacao/3EM-RECUPERACAO-VOLUMES-CAVALIERI.html',
            guia: 'recursos/guias/3EM-GUIA-VOLUMES-CAVALIERI.html'
          }
        },
        {
          num: 6,
          title: 'Da Esfera para o Plano: Cartografia e Geometria Global',
          topics: [
            'Modelos matemáticos da Terra: geoide, elipsoide e esfera aproximada',
            'Coordenadas geográficas esféricas: latitude, longitude e meridianos',
            'Cálculo de distâncias ortodrômicas na superfície da esfera',
            'Fusos horários astronômicos e políticos (Greenwich e UTC)',
            'Projeções cartográficas: cilíndricas (Mercator, Peters), cônicas, azimutais e a Indicatriz de Tissot'
          ],
          skills: [
            { code: 'EM13MAT307', desc: 'Compreender a matemática por trás das distorções de área e forma em projeções cartográficas.' },
            { code: 'EM13MAT317', desc: 'Calcular fusos horários e distâncias geográficas com trigonometria esférica básica.' }
          ],
          resources: {
            resumo: 'recursos/resumos/3EM-CARTOGRAFIA-ESFERA.html',
            lista: 'recursos/listas/3EM-CARTOGRAFIA-ESFERA.html',
            recuperacao: 'recursos/recuperacao/3EM-RECUPERACAO-CARTOGRAFIA-ESFERA.html',
            guia: 'recursos/guias/3EM-GUIA-CARTOGRAFIA-ESFERA.html'
          }
        }
      ]
    }
  };

  // Estado atual do navegador
  let currentGrade = '1em'; // padrão: 1º EM

  // Mapeia turma do class-selector para a chave de série do navegador
  function classIdToGrade(classId) {
    if (classId === '9A' || classId === '9B') return '9ano';
    if (classId === '1A' || classId === '1B') return '1em';
    if (classId === '2EM') return '2em';
    if (classId === '3EM') return '3em';
    return '1em';
  }

  // Renderiza a lista de capítulos para uma série com filtro opcional
  function renderCurriculumExplorer(gradeKey, filterQuery = '') {
    const container = document.getElementById('curriculum-explorer-content');
    if (!container) return;

    const data = CURRICULUM_DATA[gradeKey];
    if (!data) return;

    const query = filterQuery.trim().toLowerCase();
    container.innerHTML = '';

    // Header informativo da série
    const headerDiv = document.createElement('div');
    headerDiv.className = 'grade-info-header';
    headerDiv.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.8rem; margin-bottom: 1.2rem;">
        <div>
          <span class="badge-nivel ${data.badgeClass}">${data.badge}</span>
          <h3 style="margin: 0.4rem 0 0.2rem 0; color: var(--heading-text-color); font-size: 1.15rem;">${data.title}</h3>
          <p style="color: var(--secondary-text-color); margin: 0; font-size: 0.95rem; font-style: italic;">${data.subtitle}</p>
        </div>
        <div class="explorer-actions" style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <button id="btn-expand-all" class="themed-button" style="font-size: 0.72rem; padding: 6px 12px;">+ EXPANDIR TODOS</button>
          <button id="btn-collapse-all" class="themed-button" style="font-size: 0.72rem; padding: 6px 12px;">- RECOLHER TODOS</button>
        </div>
      </div>
    `;
    container.appendChild(headerDiv);

    // Filtragem dos capítulos
    const filteredChapters = data.chapters.filter(ch => {
      if (!query) return true;
      const titleMatch = ch.title.toLowerCase().includes(query);
      const topicMatch = ch.topics.some(t => t.toLowerCase().includes(query));
      const skillMatch = ch.skills.some(s => s.code.toLowerCase().includes(query) || s.desc.toLowerCase().includes(query));
      return titleMatch || topicMatch || skillMatch;
    });

    if (filteredChapters.length === 0) {
      const emptyDiv = document.createElement('div');
      emptyDiv.className = 'destaque-box observacao';
      emptyDiv.innerHTML = `
        <h3>🔍 Nenhum tópico encontrado</h3>
        <p>Não encontramos nenhum capítulo, tópico ou código de habilidade correspondente a <strong>"${filterQuery}"</strong> na grade de ${data.title}.</p>
        <p>Tente buscar por termos mais gerais (ex: <em>função</em>, <em>volume</em>, <em>Tales</em>, <em>EM13MAT</em>).</p>
      `;
      container.appendChild(emptyDiv);
      return;
    }

    // Container de lista de capítulos (accordion)
    const accordionList = document.createElement('div');
    accordionList.className = 'chapter-accordion-list';

    filteredChapters.forEach((ch, idx) => {
      const details = document.createElement('details');
      details.className = 'chapter-card-details';
      // Abre por padrão o primeiro capítulo se não houver filtro, ou todos se houver busca
      if (idx === 0 || query.length > 0) {
        details.open = true;
      }

      // Sumário clicável (cabeçalho do capítulo)
      const summary = document.createElement('summary');
      summary.className = 'chapter-card-summary';
      summary.innerHTML = `
        <div class="summary-left">
          <span class="chapter-number-pill">CAP ${ch.num}</span>
          <span class="chapter-title-text">${ch.title}</span>
        </div>
        <div class="summary-right">
          <span class="skills-count-pill">${ch.skills.length} Habilidades</span>
          <span class="expand-icon">▼</span>
        </div>
      `;

      // Conteúdo expandido do capítulo
      const content = document.createElement('div');
      content.className = 'chapter-card-body';

      // 1. Tópicos Curriculares
      let topicsHtml = '<div class="chapter-subgroup"><h4>📚 Conteúdos e Objetos de Conhecimento:</h4><ul class="chapter-topics-list">';
      ch.topics.forEach(tp => {
        topicsHtml += `<li>${tp}</li>`;
      });
      topicsHtml += '</ul></div>';

      // 2. Habilidades BNCC
      let skillsHtml = '<div class="chapter-subgroup"><h4>🎯 Habilidades Oficiais (BNCC & Movimento do Aprender):</h4><div class="chapter-skills-badges">';
      ch.skills.forEach(sk => {
        skillsHtml += `
          <div class="skill-badge-item">
            <span class="skill-code-tag">${sk.code}</span>
            <span class="skill-desc-text">${sk.desc}</span>
          </div>
        `;
      });
      skillsHtml += '</div></div>';

      // 3. Botões de Recursos Canônicos do Capítulo
      let buttonsHtml = `
        <div class="chapter-subgroup" style="margin-top: 1.2rem;">
          <h4>🚀 Recursos Didáticos Disponíveis para este Capítulo:</h4>
          <div class="chapter-resources-buttons">
            <a href="${ch.resources.resumo}" class="quick-link-button">📖 RESUMO TEÓRICO</a>
            <a href="${ch.resources.lista}" class="quick-link-button">🧩 LISTA DE PROBLEMAS</a>
            <a href="${ch.resources.recuperacao}" class="quick-link-button">🔄 ATIVIDADE RECUPERAÇÃO</a>
            <a href="${ch.resources.guia}" class="quick-link-button">🗺️ GUIA DE ESTUDOS</a>
          </div>
        </div>
      `;

      content.innerHTML = topicsHtml + skillsHtml + buttonsHtml;

      details.appendChild(summary);
      details.appendChild(content);
      accordionList.appendChild(details);
    });

    container.appendChild(accordionList);

    // Event listeners para botões de expandir/recolher todos
    const btnExpand = document.getElementById('btn-expand-all');
    const btnCollapse = document.getElementById('btn-collapse-all');
    if (btnExpand) {
      btnExpand.addEventListener('click', () => {
        accordionList.querySelectorAll('details').forEach(d => d.open = true);
      });
    }
    if (btnCollapse) {
      btnCollapse.addEventListener('click', () => {
        accordionList.querySelectorAll('details').forEach(d => d.open = false);
      });
    }
  }

  // Inicializa o componente
  function initCurriculumNavigator() {
    const tabsContainer = document.getElementById('grade-tabs-bar');
    const searchInput = document.getElementById('curriculum-search-input');

    if (!tabsContainer) return; // Não está na página que possui o navegador

    // Sincroniza série inicial com a turma selecionada no class-selector
    const storedClass = localStorage.getItem('selectedClass') || '1A';
    currentGrade = classIdToGrade(storedClass);

    // Atualiza classes ativas nas abas
    tabsContainer.querySelectorAll('.grade-tab-btn').forEach(btn => {
      const grade = btn.getAttribute('data-grade');
      if (grade === currentGrade) {
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      }

      btn.addEventListener('click', () => {
        currentGrade = grade;
        tabsContainer.querySelectorAll('.grade-tab-btn').forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        // Se houver class-selector no window, tenta sincronizar uma turma dessa série
        const targetClass = CURRICULUM_DATA[grade].classes[0];
        if (window.ClassSelector && typeof window.ClassSelector.setSelectedClass === 'function') {
          // Apenas sincroniza se a turma for diferente para não gerar loop
          if (window.ClassSelector.getSelectedClass() !== targetClass) {
            window.ClassSelector.setSelectedClass(targetClass);
          }
        }

        const query = searchInput ? searchInput.value : '';
        renderCurriculumExplorer(currentGrade, query);
      });
    });

    // Listener para o input de busca em tempo real
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        renderCurriculumExplorer(currentGrade, e.target.value);
      });
    }

    // Listener para eventos de mudança de turma emitidos pelo class-selector.js
    window.addEventListener('classChanged', (e) => {
      const newClassId = e.detail && e.detail.classId;
      if (newClassId) {
        const mappedGrade = classIdToGrade(newClassId);
        if (mappedGrade !== currentGrade) {
          currentGrade = mappedGrade;
          tabsContainer.querySelectorAll('.grade-tab-btn').forEach(btn => {
            const grade = btn.getAttribute('data-grade');
            if (grade === currentGrade) {
              btn.classList.add('active');
              btn.setAttribute('aria-selected', 'true');
            } else {
              btn.classList.remove('active');
              btn.setAttribute('aria-selected', 'false');
            }
          });
          const query = searchInput ? searchInput.value : '';
          renderCurriculumExplorer(currentGrade, query);
        }
      }
    });

    // Render inicial
    const initialQuery = searchInput ? searchInput.value : '';
    renderCurriculumExplorer(currentGrade, initialQuery);
  }

  // Inicializa quando o DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCurriculumNavigator);
  } else {
    initCurriculumNavigator();
  }

  // Exporta no escopo global para depuração ou extensões
  window.CurriculumNavigator = {
    getData: () => CURRICULUM_DATA,
    getCurrentGrade: () => currentGrade,
    setGrade: (g) => {
      currentGrade = g;
      renderCurriculumExplorer(g);
    }
  };

})();

# scripts/build_recuperacao_solutions.py
# -*- coding: utf-8 -*-
"""
Gera os gabaritos secretos detalhados para todas as atividades de recuperação
e normaliza os gabaritos existentes, garantindo que 100% dos 35 arquivos
tenham o Gabarito Secreto do Professor acessível apenas via Ctrl+U.
"""

import os
import re

RECUP_DIR = "/home/heimdall/github/MATEMATICA/recursos/recuperacao"

SOLUTIONS = {
  '1EM-RECUPERACAO-AREAS-PERIMETROS.html': """
<div class="gabarito-content">
  [--- GABARITO ATIVIDADES DE RECUPERAÇÃO ---]
  <div class="gabarito-secao">
    <h3>Nível 1: Apoio Alto (Cálculo Direto e Figuras Básicas)</h3>
    <ol>
      <li>
        <span class="gabarito-item-titulo">Exercício 1:</span><br>
        a) Perímetro do terreno retangular: @2 \cdot (25 + 12) = 2 \cdot 37 = 74\text{ m}@.<br>
        b) Área do terreno retangular: @A = 25 \times 12 = 300\text{ m}^2@.<br>
        <strong>Resposta:</strong> a) @74\text{ m}@; b) @300\text{ m}^2@.
      </li>
      <li>
        <span class="gabarito-item-titulo">Exercício 2:</span><br>
        a) Como @d = L\sqrt{2}@, temos @L\sqrt{2} = 8\sqrt{2} \implies L = 8\text{ cm}@.<br>
        b) Área do quadrado: @A = L^2 = 8^2 = 64\text{ cm}^2@.<br>
        <strong>Resposta:</strong> a) @8\text{ cm}@; b) @64\text{ cm}^2@.
      </li>
      <li>
        <span class="gabarito-item-titulo">Exercício 3:</span><br>
        a) Comprimento da circunferência: @C = 2\pi r = 2 \times 3{,}14 \times 5 = 31{,}4\text{ m}@.<br>
        b) Área da praça circular: @A = \pi r^2 = 3{,}14 \times 5^2 = 3{,}14 \times 25 = 78{,}5\text{ m}^2@.<br>
        <strong>Resposta:</strong> a) @31{,}4\text{ m}@; b) @78{,}5\text{ m}^2@.
      </li>
    </ol>

    <h3>Nível 2: Apoio Médio (Trapézios, Polígonos Regulares e Setores)</h3>
    <ol start="4">
      <li>
        <span class="gabarito-item-titulo">Exercício 4:</span><br>
        A área do trapézio é dada por @A = \frac{(B + b) \cdot h}{2} = \frac{(14 + 8) \cdot 6}{2} = \frac{22 \cdot 6}{2} = 66\text{ m}^2@.<br>
        <strong>Resposta:</strong> @66\text{ m}^2@.
      </li>
      <li>
        <span class="gabarito-item-titulo">Exercício 5:</span><br>
        a) Um hexágono regular é composto por 6 triângulos equiláteros de lado @L = 6\text{ cm}@:<br>
        @A = 6 \cdot \frac{L^2\sqrt{3}}{4} = 6 \cdot \frac{36\sqrt{3}}{4} = 54\sqrt{3}\text{ cm}^2@.<br>
        b) Valor aproximado: @54 \times 1{,}73 = 93{,}42\text{ cm}^2@.<br>
        <strong>Resposta:</strong> a) @54\sqrt{3}\text{ cm}^2@; b) @93{,}42\text{ cm}^2@.
      </li>
      <li>
        <span class="gabarito-item-titulo">Exercício 6:</span><br>
        Como @60^\circ@ representa @\frac{60^\circ}{360^\circ} = \frac{1}{6}@ do círculo total:<br>
        @A_{setor} = \frac{1}{6} \cdot \pi \cdot 12^2 = \frac{1}{6} \cdot 3{,}14 \cdot 144 = 24 \cdot 3{,}14 = 75{,}36\text{ cm}^2@.<br>
        <strong>Resposta:</strong> @75{,}36\text{ cm}^2@.
      </li>
    </ol>

    <h3>Nível 3: Autonomia Plena (Decomposição Geométrica e Decisão Real)</h3>
    <ol start="7">
      <li>
        <span class="gabarito-item-titulo">Exercício 7:</span><br>
        a) O piso é composto por um retângulo central de @10 \times 6 = 60\text{ m}^2@ mais dois semicírculos nas extremidades de diâmetro @6\text{ m}@ (raio @r = 3\text{ m}@), que juntos formam um círculo completo de área @\pi \cdot 3^2@.<br>
        Expressão: @A_{total} = (10 \times 6) + \pi \cdot 3^2 = 60 + 9\pi@.<br>
        b) Área numérica: @60 + 9(3{,}14) = 60 + 28{,}26 = 88{,}26\text{ m}^2@.<br>
        c) Custo total: @88{,}26 \times 65 = 5.736{,}90@ reais.<br>
        <strong>Resposta:</strong> a) @60 + 9\pi\text{ m}^2@; b) @88{,}26\text{ m}^2@; c) R$ 5.736,90.
      </li>
      <li>
        <span class="gabarito-item-titulo">Exercício 8:</span><br>
        a) Semiperímetro: @p = \frac{7 + 8 + 9}{2} = \frac{24}{2} = 12\text{ m}@.<br>
        b) Fórmula de Heron: @A = \sqrt{12(12 - 7)(12 - 8)(12 - 9)} = \sqrt{12 \cdot 5 \cdot 4 \cdot 3} = \sqrt{720} = 12\sqrt{5}\text{ m}^2 \approx 26{,}83\text{ m}^2@.<br>
        <strong>Resposta:</strong> a) @p = 12\text{ m}@; b) @12\sqrt{5}\text{ m}^2@ (aprox. @26{,}83\text{ m}^2@).
      </li>
    </ol>
  </div>
</div>
""",

  '1EM-RECUPERACAO-ESTATISTICA-PROBABILIDADE.html': """
<div class="gabarito-content">
  [--- GABARITO ATIVIDADES DE RECUPERAÇÃO ---]
  <div class="gabarito-secao">
    <h3>Nível 1: Apoio Alto (Organização em Rol e Probabilidade Imediata)</h3>
    <ol>
      <li>
        <span class="gabarito-item-titulo">Exercício 1:</span><br>
        a) Rol ordenado: @(4{,}0;\ 5{,}5;\ 6{,}0;\ 6{,}0;\ 7{,}5;\ 8{,}0;\ 8{,}5;\ 9{,}0)@. Com @n = 8@, os termos centrais são o 4º e o 5º (@6{,}0@ e @7{,}5@).<br>
        Mediana: @\text{Md} = \frac{6{,}0 + 7{,}5}{2} = 6{,}75@. Moda: @\text{Mo} = 6{,}0@ (frequência 2).<br>
        b) Média: @\bar{x} = \frac{4{,}0 + 5{,}5 + 6{,}0 + 6{,}0 + 7{,}5 + 8{,}0 + 8{,}5 + 9{,}0}{8} = \frac{54{,}5}{8} = 6{,}8125@.<br>
        <strong>Resposta:</strong> a) Md = 6,75 e Mo = 6,0; b) Média = 6,8125.
      </li>
      <li>
        <span class="gabarito-item-titulo">Exercício 2:</span><br>
        Total de bolas: @10 + 15 + 5 = 30@.<br>
        a) Probabilidade de bola azul: @P = \frac{10}{30} = \frac{1}{3} \approx 33{,}33\%@.<br>
        b) Probabilidade de não ser verde: @P = \frac{10 + 15}{30} = \frac{25}{30} = \frac{5}{6} \approx 83{,}33\%@.<br>
        <strong>Resposta:</strong> a) @\frac{1}{3}@; b) @\frac{5}{6}@.
      </li>
    </ol>

    <h3>Nível 2: Apoio Médio (Média Ponderada e União de Eventos)</h3>
    <ol start="3">
      <li>
        <span class="gabarito-item-titulo">Exercício 3:</span><br>
        Soma dos pesos: @2 + 3 + 5 = 10@.<br>
        Nota ponderada: @\bar{x}_p = \frac{6 \cdot 2 + 7 \cdot 3 + 8 \cdot 5}{10} = \frac{12 + 21 + 40}{10} = \frac{73}{10} = 7{,}3@.<br>
        Como @7{,}3 \ge 7{,}0@, a estudante foi aprovada.<br>
        <strong>Resposta:</strong> Média ponderada = 7,3; Aprovada.
      </li>
      <li>
        <span class="gabarito-item-titulo">Exercício 4:</span><br>
        Espaço amostral: @\Omega = \{1, 2, 3, 4, 5, 6\}@ (@n = 6@).<br>
        Evento A (par): @\{2, 4, 6\}@ (@P(A) = 3/6@). Evento B (maior que 4): @\{5, 6\}@ (@P(B) = 2/6@).<br>
        Interseção @A \cap B@: @\{6\}@ (@P(A \cap B) = 1/6@).<br>
        @P(A \cup B) = P(A) + P(B) - P(A \cap B) = \frac{3}{6} + \frac{2}{6} - \frac{1}{6} = \frac{4}{6} = \frac{2}{3} \approx 66{,}67\%@.<br>
        <strong>Resposta:</strong> @\frac{2}{3}@ (aprox. @66{,}67\%@).
      </li>
    </ol>

    <h3>Nível 3: Autonomia Plena (Análise Crítica de Dispersão e Decisão Estratégica)</h3>
    <ol start="5">
      <li>
        <span class="gabarito-item-titulo">Exercício 5:</span><br>
        a) Média Máquina 1: @\frac{98 + 100 + 102}{3} = 100@. Média Máquina 2: @\frac{90 + 100 + 110}{3} = 100@.<br>
        b) Variância Máquina 1: @\frac{(-2)^2 + 0^2 + 2^2}{3} = \frac{8}{3} \approx 2{,}67@; @s_1 = \sqrt{2{,}67} \approx 1{,}63\text{ g}@.<br>
        Variância Máquina 2: @\frac{(-10)^2 + 0^2 + 10^2}{3} = \frac{200}{3} \approx 66{,}67@; @s_2 = \sqrt{66{,}67} \approx 8{,}16\text{ g}@.<br>
        c) A Máquina 1 é muito mais confiável e estável para a linha de produção, pois seu desvio padrão é quase 5 vezes menor.<br>
        <strong>Resposta:</strong> Máquina 1 é preferível devido à menor dispersão/desvio padrão.
      </li>
      <li>
        <span class="gabarito-item-titulo">Exercício 6:</span><br>
        Pela fórmula de Bayes / probabilidade condicional: @P(A \mid B) = \frac{P(A \cap B)}{P(B)}@.<br>
        Como @A \cap B \subset B@ e @P(B \mid A) = \frac{P(A \cap B)}{P(A)} \implies P(A \cap B) = 0{,}4 \cdot 0{,}5 = 0{,}2@.<br>
        Assim: @P(A \mid B) = \frac{0{,}2}{0{,}6} = \frac{1}{3} \approx 33{,}33\%@.<br>
        <strong>Resposta:</strong> @\frac{1}{3}@ (aprox. @33{,}33\%@).
      </li>
    </ol>
  </div>
</div>
""",

  '1EM-RECUPERACAO-EXPONENCIAL-LOGARITMO.html': """
<div class="gabarito-content">
  [--- GABARITO ATIVIDADES DE RECUPERAÇÃO ---]
  <div class="gabarito-secao">
    <h3>Nível 1: Apoio Alto (Fixação Estruturada e Identificação Direta)</h3>
    <ol>
      <li>
        <span class="gabarito-item-titulo">Exercício 1:</span><br>
        a) Igualando as bases: @2^{x+3} = 2^7 \implies x + 3 = 7 \implies x = 4@.<br>
        b) Como @\frac{1}{27} = 3^{-3}@, temos @3^{2x-1} = 3^{-3} \implies 2x - 1 = -3 \implies 2x = -2 \implies x = -1@.<br>
        <strong>Resposta:</strong> a) @x = 4@; b) @x = -1@.
      </li>
      <li>
        <span class="gabarito-item-titulo">Exercício 2:</span><br>
        a) @\log_2(64) = y \implies 2^y = 64 = 2^6 \implies y = 6@.<br>
        b) @\log_5(\sqrt{5}) = \log_5(5^{1/2}) = \frac{1}{2}@.<br>
        c) @\log_{10}(0{,}001) = \log_{10}(10^{-3}) = -3@.<br>
        <strong>Resposta:</strong> a) 6; b) 1/2; c) -3.
      </li>
      <li>
        <span class="gabarito-item-titulo">Exercício 3:</span><br>
        Pela propriedade da soma e subtração de logaritmos na mesma base:<br>
        @\log(20) + \log(5) = \log(20 \cdot 5) = \log(100) = \log_{10}(10^2) = 2@.<br>
        <strong>Resposta:</strong> 2.
      </li>
    </ol>

    <h3>Nível 2: Apoio Médio (Manipulação Algébrica e Modelagem Intermediária)</h3>
    <ol start="4">
      <li>
        <span class="gabarito-item-titulo">Exercício 4:</span><br>
        Substituindo @y = 2^x@ (onde @4^x = (2^x)^2 = y^2@):<br>
        @y^2 - 6y + 8 = 0@.<br>
        Fatorando: @(y - 2)(y - 4) = 0 \implies y = 2 \text{ ou } y = 4@.<br>
        Voltando a @x@:<br>
        • @2^x = 2^1 \implies x = 1@.<br>
        • @2^x = 4 = 2^2 \implies x = 2@.<br>
        <strong>Resposta:</strong> @S = \{1, 2\}@.
      </li>
      <li>
        <span class="gabarito-item-titulo">Exercício 5:</span><br>
        Aplicando a propriedade do logaritmo da soma: @\log_2(x(x - 2)) = 3@.<br>
        Pela definição de logaritmo: @x(x - 2) = 2^3 \implies x^2 - 2x = 8 \implies x^2 - 2x - 8 = 0@.<br>
        Fatorando: @(x - 4)(x + 2) = 0@. Pela condição de existência dos logaritmandos (@x > 0@ e @x - 2 > 0 \implies x > 2@), descartamos @x = -2@.<br>
        Logo, a única raiz válida é @x = 4@.<br>
        <strong>Resposta:</strong> @x = 4@.
      </li>
      <li>
        <span class="gabarito-item-titulo">Exercício 6:</span><br>
        Como @12 = 2^2 \cdot 3@:<br>
        @\log(12) = \log(2^2 \cdot 3) = \log(2^2) + \log(3) = 2\log(2) + \log(3) = 2(0{,}30) + 0{,}48 = 0{,}60 + 0{,}48 = 1{,}08@.<br>
        <strong>Resposta:</strong> @1{,}08@.
      </li>
    </ol>

    <h3>Nível 3: Autonomia Plena (Modelagem Crítica e Situações Complexas)</h3>
    <ol start="7">
      <li>
        <span class="gabarito-item-titulo">Exercício 7:</span><br>
        População inicial @N(0) = 500@. Queremos @N(t) = 16.000@:<br>
        @500 \cdot 2^{t/3} = 16.000 \implies 2^{t/3} = \frac{16.000}{500} = 32 = 2^5@.<br>
        Igualando os expoentes: @\frac{t}{3} = 5 \implies t = 15\text{ horas}@.<br>
        <strong>Resposta:</strong> 15 horas.
      </li>
      <li>
        <span class="gabarito-item-titulo">Exercício 8:</span><br>
        Queremos @M = 2C@ à taxa de @5\%@ (@i = 0{,}05@):<br>
        @C(1{,}05)^t = 2C \implies (1{,}05)^t = 2@.<br>
        Aplicando logaritmo decimal em ambos os lados:<br>
        @\log(1{,}05^t) = \log(2) \implies t \cdot \log(1{,}05) = \log(2) \implies t = \frac{\log(2)}{\log(1{,}05)} = \frac{0{,}301}{0{,}021} \approx 14{,}33\text{ anos}@.<br>
        <strong>Resposta:</strong> Aprox. 14,3 anos (ou 15 anos inteiros).
      </li>
    </ol>
  </div>
</div>
""",

  '1EM-RECUPERACAO-FUNCAO-1GRAU.html': """
<div class="gabarito-content">
  [--- GABARITO ATIVIDADES DE RECUPERAÇÃO ---]
  <div class="gabarito-secao">
    <h3>Nível 1: Apoio Alto (Identificação e Substituição Direta)</h3>
    <ol>
      <li>
        <span class="gabarito-item-titulo">Exercício 1:</span><br>
        Para @f(x) = 3x - 6@:<br>
        a) Coeficiente angular @a = 3@; coeficiente linear @b = -6@.<br>
        b) Como @a = 3 > 0@, a função é estritamente crescente.<br>
        c) @f(0) = 3(0) - 6 = -6@; @f(3) = 3(3) - 6 = 9 - 6 = 3@.<br>
        <strong>Resposta:</strong> a) @a = 3@, @b = -6@; b) Crescente (@a > 0@); c) @f(0) = -6@, @f(3) = 3@.
      </li>
      <li>
        <span class="gabarito-item-titulo">Exercício 2:</span><br>
        a) Função de custo: @C(x) = 35 + 0{,}50x@.<br>
        b) Para @x = 14@ gigas: @C(14) = 35 + 0{,}50(14) = 35 + 7 = 42@ reais.<br>
        <strong>Resposta:</strong> a) @C(x) = 0{,}50x + 35@; b) R$ 42,00.
      </li>
    </ol>

    <h3>Nível 2: Apoio Médio (Determinação de Leis e Gráficos)</h3>
    <ol start="3">
      <li>
        <span class="gabarito-item-titulo">Exercício 3:</span><br>
        O coeficiente angular é @a = \frac{\Delta y}{\Delta x} = \frac{-4 - 5}{-2 - 1} = \frac{-9}{-3} = 3@.<br>
        Substituindo em @f(1) = 5@: @3(1) + b = 5 \implies b = 2@.<br>
        A lei da função é @f(x) = 3x + 2@.<br>
        <strong>Resposta:</strong> @f(x) = 3x + 2@.
      </li>
      <li>
        <span class="gabarito-item-titulo">Exercício 4:</span><br>
        a) Função do volume restante: @V(t) = 1.000 - 25t@.<br>
        b) Reservatório vazio (@V(t) = 0@): @1.000 - 25t = 0 \implies 25t = 1.000 \implies t = 40\text{ minutos}@.<br>
        <strong>Resposta:</strong> a) @V(t) = 1.000 - 25t@; b) 40 minutos.
      </li>
    </ol>

    <h3>Nível 3: Autonomia & Aplicação Crítica</h3>
    <ol start="5">
      <li>
        <span class="gabarito-item-titulo">Exercício 5:</span><br>
        a) No encontro, @S_A(t) = S_B(t)@:<br>
        @20 + 60t = 80 + 40t \implies 20t = 60 \implies t = 3\text{ horas}@.<br>
        b) Posição: @S_A(3) = 20 + 60(3) = 20 + 180 = 200\text{ km}@.<br>
        <strong>Resposta:</strong> a) 3 horas; b) km 200.
      </li>
    </ol>
  </div>
</div>
""",

  '1EM-RECUPERACAO-FUNCAO-QUADRATICA.html': """
<div class="gabarito-content">
  [--- GABARITO ATIVIDADES DE RECUPERAÇÃO ---]
  <div class="gabarito-secao">
    <h3>Nível 1: Apoio Alto (Raízes e Vértice)</h3>
    <ol>
      <li>
        <span class="gabarito-item-titulo">Exercício 1:</span><br>
        Dada @f(x) = x^2 - 6x + 8@:<br>
        a) Raízes (@f(x) = 0@): @\Delta = (-6)^2 - 4(1)(8) = 36 - 32 = 4@. @x = \frac{6 \pm 2}{2} \implies x_1 = 4, x_2 = 2@.<br>
        b) Vértice: @x_v = -\frac{-6}{2(1)} = 3@; @y_v = -\frac{4}{4(1)} = -1@. Ponto @V(3, -1)@.<br>
        c) Como @a = 1 > 0@, a parábola tem concavidade voltada para cima e possui ponto de mínimo no vértice.<br>
        <strong>Resposta:</strong> a) @S = \{2, 4\}@; b) @V(3, -1)@; c) Mínimo (@y_v = -1@).
      </li>
    </ol>

    <h3>Nível 2: Apoio Médio (Problemas de Máximos e Mínimos)</h3>
    <ol start="2">
      <li>
        <span class="gabarito-item-titulo">Exercício 2:</span><br>
        Lucro dado por @L(x) = -2x^2 + 80x - 300@:<br>
        a) Quantidade de peças para lucro máximo (@x_v@):<br>
        @x_v = -\frac{b}{2a} = -\frac{80}{2(-2)} = -\frac{80}{-4} = 20\text{ peças}@.<br>
        b) Lucro máximo (@L(20)@ ou @y_v@):<br>
        @L(20) = -2(20)^2 + 80(20) - 300 = -2(400) + 1600 - 300 = -800 + 1600 - 300 = 500@ reais.<br>
        <strong>Resposta:</strong> a) 20 peças; b) R$ 500,00.
      </li>
    </ol>

    <h3>Nível 3: Autonomia (Modelagem Geométrica)</h3>
    <ol start="3">
      <li>
        <span class="gabarito-item-titulo">Exercício 3:</span><br>
        Com 40 metros de tela para cercar três lados (um lado é o muro): @2x + y = 40 \implies y = 40 - 2x@.<br>
        Área do retângulo: @A(x) = x \cdot y = x(40 - 2x) = -2x^2 + 40x@.<br>
        Dimensão @x@ de área máxima: @x_v = -\frac{40}{2(-2)} = 10\text{ metros}@.<br>
        Comprimento @y@: @y = 40 - 2(10) = 20\text{ metros}@.<br>
        Área máxima: @A = 10 \times 20 = 200\text{ m}^2@.<br>
        <strong>Resposta:</strong> Dimensões: 10 m por 20 m; Área máxima = 200 m².
      </li>
    </ol>
  </div>
</div>
""",

  '1EM-RECUPERACAO-TRIGONOMETRIA.html': """
<div class="gabarito-content">
  [--- GABARITO ATIVIDADES DE RECUPERAÇÃO ---]
  <div class="gabarito-secao">
    <h3>Nível 1: Apoio Alto (Identificação e Aplicação Direta)</h3>
    <ol>
      <li>
        <span class="gabarito-item-titulo">Exercício 1:</span><br>
        No triângulo retângulo de catetos 3 e 4, a hipotenusa é @a = \sqrt{3^2 + 4^2} = 5@.<br>
        Para o ângulo @\alpha@ oposto ao cateto 3:<br>
        @\text{sen}(\alpha) = \frac{3}{5} = 0{,}6@; @\cos(\alpha) = \frac{4}{5} = 0{,}8@; @\text{tg}(\alpha) = \frac{3}{4} = 0{,}75@.<br>
        <strong>Resposta:</strong> @\text{sen} = 0{,}6@, @\cos = 0{,}8@, @\text{tg} = 0{,}75@.
      </li>
      <li>
        <span class="gabarito-item-titulo">Exercício 2:</span><br>
        A rampa forma um triângulo retângulo onde a hipotenusa é a rampa (@10\text{ m}@) e a altura @h@ é o cateto oposto a @30^\circ@:<br>
        @\text{sen}(30^\circ) = \frac{h}{10} \implies \frac{1}{2} = \frac{h}{10} \implies h = 5\text{ metros}@.<br>
        <strong>Resposta:</strong> 5 metros.
      </li>
    </ol>

    <h3>Nível 2: Apoio Médio (Resolução de Triângulos e Relações Métricas)</h3>
    <ol start="3">
      <li>
        <span class="gabarito-item-titulo">Exercício 3:</span><br>
        Observador a 20 metros da base da torre sob ângulo de @60^\circ@:<br>
        @\text{tg}(60^\circ) = \frac{h}{20} \implies \sqrt{3} = \frac{h}{20} \implies h = 20\sqrt{3}\text{ m} \approx 20 \times 1{,}73 = 34{,}6\text{ m}@.<br>
        <strong>Resposta:</strong> @20\sqrt{3}\text{ m}@ (aprox. @34{,}6\text{ m}@).
      </li>
      <li>
        <span class="gabarito-item-titulo">Exercício 4:</span><br>
        Pela relação fundamental @\text{sen}^2(x) + \cos^2(x) = 1@:<br>
        @\cos^2(x) = 1 - (0{,}8)^2 = 1 - 0{,}64 = 0{,}36 \implies \cos(x) = \sqrt{0{,}36} = 0{,}6@.<br>
        Tangente: @\text{tg}(x) = \frac{\text{sen}(x)}{\cos(x)} = \frac{0{,}8}{0{,}6} = \frac{4}{3} \approx 1{,}33@.<br>
        <strong>Resposta:</strong> @\cos(x) = 0{,}6@ e @\text{tg}(x) = 4/3@.
      </li>
    </ol>

    <h3>Nível 3: Autonomia Plena (Problemas em Dois Estágios e Aplicação Crítica)</h3>
    <ol start="5">
      <li>
        <span class="gabarito-item-titulo">Exercício 5:</span><br>
        Seja @h@ a altura do prédio e @d@ a distância da segunda posição:<br>
        Na primeira posição (ângulo @30^\circ@, distância @d + 50@): @\text{tg}(30^\circ) = \frac{h}{d + 50} \implies h = \frac{\sqrt{3}}{3}(d + 50)@.<br>
        Na segunda posição (ângulo @60^\circ@, distância @d@): @\text{tg}(60^\circ) = \frac{h}{d} \implies h = d\sqrt{3}@.<br>
        Igualando as duas expressões de @h@:<br>
        @d\sqrt{3} = \frac{\sqrt{3}}{3}(d + 50) \implies 3d = d + 50 \implies 2d = 50 \implies d = 25\text{ m}@.<br>
        Logo, a altura do edifício é @h = 25\sqrt{3}\text{ m} \approx 25 \times 1{,}732 = 43{,}3\text{ m}@.<br>
        <strong>Resposta:</strong> @25\sqrt{3}\text{ m}@ (aprox. @43{,}3\text{ m}@).
      </li>
      <li>
        <span class="gabarito-item-titulo">Exercício 6:</span><br>
        Pela Lei dos Cossenos: @a^2 = b^2 + c^2 - 2bc\cos(60^\circ)@.<br>
        @a^2 = 5^2 + 8^2 - 2(5)(8)\left(\frac{1}{2}\right) = 25 + 64 - 40 = 49 \implies a = \sqrt{49} = 7\text{ cm}@.<br>
        <strong>Resposta:</strong> 7 cm.
      </li>
    </ol>
  </div>
</div>
""",

  '2EM-RECUPERACAO-ANALISE-COMBINATORIA.html': """
<div class="gabarito-content">
  [--- GABARITO ATIVIDADES DE RECUPERAÇÃO ---]
  <div class="gabarito-secao">
    <h3>Nível 1: Apoio Alto (Identificação da Ordem e Operações Básicas)</h3>
    <ol>
      <li>
        <span class="gabarito-item-titulo">Exercício 1:</span><br>
        Pelo Princípio Fundamental da Contagem (PFC):<br>
        Total de combinações = @4 \times 3 \times 2 = 24@ visuais distintos.<br>
        <strong>Resposta:</strong> 24 maneiras.
      </li>
      <li>
        <span class="gabarito-item-titulo">Exercício 2:</span><br>
        Como a ordem não importa na formação de uma comissão de representantes:<br>
        @C_{10, 3} = \frac{10!}{3! \cdot 7!} = \frac{10 \times 9 \times 8}{3 \times 2 \times 1} = \frac{720}{6} = 120@ comissões.<br>
        <strong>Resposta:</strong> 120 comissões.
      </li>
    </ol>

    <h3>Nível 2: Apoio Médio (Repetição, Blocos Unidos e Comissões)</h3>
    <ol start="3">
      <li>
        <span class="gabarito-item-titulo">Exercício 3:</span><br>
        A palavra "BRASIL" possui 6 letras distintas. O número de anagramas é @P_6 = 6! = 720@.<br>
        Para anagramas que começam com 'B': fixamos o 'B' na primeira posição e permutamos as 5 letras restantes: @P_5 = 5! = 120@.<br>
        <strong>Resposta:</strong> Total = 720 anagramas; Começando com 'B' = 120 anagramas.
      </li>
      <li>
        <span class="gabarito-item-titulo">Exercício 4:</span><br>
        A palavra "MATEMATICA" tem 10 letras, com repetições: 3 'A', 2 'M', 2 'T'.<br>
        @P_{10}^{3, 2, 2} = \frac{10!}{3! \cdot 2! \cdot 2!} = \frac{3.628.800}{6 \cdot 2 \cdot 2} = \frac{3.628.800}{24} = 151.200@ anagramas.<br>
        <strong>Resposta:</strong> 151.200 anagramas.
      </li>
      <li>
        <span class="gabarito-item-titulo">Exercício 5:</span><br>
        Escolha dos homens: @C_{6, 2} = \frac{6 \times 5}{2} = 15@.<br>
        Escolha das mulheres: @C_{8, 3} = \frac{8 \times 7 \times 6}{3 \times 2 \times 1} = 56@.<br>
        Total de comissões: @15 \times 56 = 840@.<br>
        <strong>Resposta:</strong> 840 comissões.
      </li>
    </ol>

    <h3>Nível 3: Autonomia & Problemas Mistos</h3>
    <ol start="6">
      <li>
        <span class="gabarito-item-titulo">Exercício 6:</span><br>
        Consideramos o casal como um único bloco '(AB)'. Temos então 4 elementos para permutar em fila: o bloco mais as outras 3 pessoas: @P_4 = 4! = 24@.<br>
        Dentro do bloco, o casal pode trocar de posição entre si de @2! = 2@ maneiras.<br>
        Total = @24 \times 2 = 48@ maneiras.<br>
        <strong>Resposta:</strong> 48 maneiras.
      </li>
      <li>
        <span class="gabarito-item-titulo">Exercício 7:</span><br>
        Qualquer subconjunto de 3 vértices forma um triângulo desde que os pontos não sejam colineares. Em uma circunferência, quaisquer 3 pontos são não-colineares.<br>
        Logo: @C_{8, 3} = \frac{8 \times 7 \times 6}{3 \times 2 \times 1} = 56@ triângulos.<br>
        <strong>Resposta:</strong> 56 triângulos.
      </li>
    </ol>
  </div>
</div>
""",

  '2EM-RECUPERACAO-GEOMETRIA-ESPACIAL.html': """
<div class="gabarito-content">
  [--- GABARITO ATIVIDADES DE RECUPERAÇÃO ---]
  <div class="gabarito-secao">
    <h3>Nível 1: Apoio Alto (Cálculo Estruturado e Direto)</h3>
    <ol>
      <li>
        <span class="gabarito-item-titulo">Exercício 1:</span><br>
        a) Volume do prisma reto: @V = A_b \cdot h = 18 \times 10 = 180\text{ cm}^3@.<br>
        b) Para um paralelepípedo com @a = 3@, @b = 4@, @c = 12@:<br>
        Diagonal: @d = \sqrt{a^2 + b^2 + c^2} = \sqrt{3^2 + 4^2 + 12^2} = \sqrt{9 + 16 + 144} = \sqrt{169} = 13\text{ cm}@.<br>
        <strong>Resposta:</strong> a) @180\text{ cm}^3@; b) @13\text{ cm}@.
      </li>
      <li>
        <span class="gabarito-item-titulo">Exercício 2:</span><br>
        a) Em base quadrada de lado @L = 10@, o apótema da base é @m = \frac{L}{2} = 5\text{ cm}@.<br>
        b) Apótema da pirâmide: @g = \sqrt{h^2 + m^2} = \sqrt{12^2 + 5^2} = \sqrt{144 + 25} = \sqrt{169} = 13\text{ cm}@.<br>
        c) Área da base: @A_b = 10^2 = 100\text{ cm}^2@. Área lateral: @4 \cdot \frac{10 \cdot 13}{2} = 260\text{ cm}^2@. Área total: @A_t = 100 + 260 = 360\text{ cm}^2@.<br>
        Volume: @V = \frac{1}{3} A_b \cdot h = \frac{1}{3} \cdot 100 \cdot 12 = 400\text{ cm}^3@.<br>
        <strong>Resposta:</strong> a) @m = 5\text{ cm}@; b) @g = 13\text{ cm}@; c) @A_t = 360\text{ cm}^2@ e @V = 400\text{ cm}^3@.
      </li>
    </ol>

    <h3>Nível 2: Apoio Médio (Relações Métricas e Geometria Hexagonal)</h3>
    <ol start="3">
      <li>
        <span class="gabarito-item-titulo">Exercício 3:</span><br>
        a) Área da base hexagonal: @A_b = 6 \cdot \frac{a^2\sqrt{3}}{4} = 6 \cdot \frac{16\sqrt{3}}{4} = 24\sqrt{3}\text{ cm}^2 \approx 41{,}52\text{ cm}^2@.<br>
        b) Área lateral: @6 \cdot (4 \times 15) = 360\text{ cm}^2@. Área total: @A_t = 2A_b + A_l = 2(41{,}52) + 360 = 83{,}04 + 360 = 443{,}04\text{ cm}^2@.<br>
        c) Volume: @V = A_b \cdot h = 24\sqrt{3} \times 15 = 360\sqrt{3}\text{ cm}^3 \approx 622{,}8\text{ cm}^3@.<br>
        <strong>Resposta:</strong> a) @24\sqrt{3}\text{ cm}^2@; b) @443{,}04\text{ cm}^2@; c) @360\sqrt{3}\text{ cm}^3@ (aprox. @622{,}8\text{ cm}^3@).
      </li>
      <li>
        <span class="gabarito-item-titulo">Exercício 4:</span><br>
        a) Apótema da base: @m = 16 / 2 = 8\text{ m}@. Altura: @h = \sqrt{17^2 - 8^2} = \sqrt{289 - 64} = \sqrt{225} = 15\text{ metros}@.<br>
        b) Área lateral (4 faces triangulares): @4 \cdot \frac{16 \times 17}{2} = 2 \times 272 = 544\text{ m}^2@ de vidro.<br>
        c) Volume: @V = \frac{1}{3} \cdot (16^2) \cdot 15 = \frac{1}{3} \cdot 256 \cdot 15 = 256 \times 5 = 1.280\text{ m}^3@ de ar.<br>
        <strong>Resposta:</strong> a) @15\text{ m}@; b) @544\text{ m}^2@; c) @1.280\text{ m}^3@.
      </li>
    </ol>

    <h3>Nível 3: Autonomia & Modelagem Crítica</h3>
    <ol start="5">
      <li>
        <span class="gabarito-item-titulo">Exercício 5:</span><br>
        a) Volume do paralelepípedo inicial: @V = 10 \times 12 \times 15 = 1.800\text{ cm}^3@.<br>
        b) Volume da pirâmide gerada: @V = \frac{1}{3} L^2 \cdot h \implies 1.800 = \frac{1}{3} L^2 \cdot 20 \implies L^2 = \frac{1.800 \times 3}{20} = 270 \implies L = \sqrt{270} = 3\sqrt{30}\text{ cm} \approx 16{,}43\text{ cm}@.<br>
        <strong>Resposta:</strong> a) @1.800\text{ cm}^3@; b) @3\sqrt{30}\text{ cm}@ (aprox. @16{,}43\text{ cm}@).
      </li>
      <li>
        <span class="gabarito-item-titulo">Exercício 6:</span><br>
        a) Razão linear: @k = \frac{h}{H} = \frac{8}{24} = \frac{1}{3}@.<br>
        b) Razão entre volumes: @\frac{V_{menor}}{V} = k^3 = \left(\frac{1}{3}\right)^3 = \frac{1}{27}@.<br>
        Volume da pirâmide menor: @V_{menor} = \frac{1.200}{27} = \frac{400}{9} \approx 44{,}44\text{ cm}^3@.<br>
        c) Volume do tronco: @V_{tronco} = V - V_{menor} = 1.200 - 44{,}44 = 1.155{,}56\text{ cm}^3@.<br>
        <strong>Resposta:</strong> a) @k = 1/3@; b) @44{,}44\text{ cm}^3@; c) @1.155{,}56\text{ cm}^3@.
      </li>
    </ol>
  </div>
</div>
""",

  '2EM-RECUPERACAO-MATEMATICA-FINANCEIRA.html': """
<div class="gabarito-content">
  [--- GABARITO ATIVIDADES DE RECUPERAÇÃO ---]
  <div class="gabarito-secao">
    <h3>Nível 1: Apoio Alto (Operações Diretas e Fatores de Correção)</h3>
    <ol>
      <li>
        <span class="gabarito-item-titulo">Exercício 1:</span><br>
        a) Fator de acréscimo (+15%): @1 + 0{,}15 = 1{,}15@. Fator de desconto (-15%): @1 - 0{,}15 = 0{,}85@.<br>
        b) Preço após aumento: @800 \times 1{,}15 = 920{,}00@ reais. Preço final: @920 \times 0{,}85 = 782{,}00@ reais.<br>
        c) Não voltou a 800 reais. Fator acumulado: @1{,}15 \times 0{,}85 = 0{,}9775@, equivalente a uma redução de @2{,}25\%@.<br>
        <strong>Resposta:</strong> a) Fatores 1,15 e 0,85; b) R$ 920,00 e R$ 782,00; c) Queda líquida de 2,25%.
      </li>
      <li>
        <span class="gabarito-item-titulo">Exercício 2:</span><br>
        a) Juros Simples: @M = 3.000 \cdot (1 + 0{,}02 \times 4) = 3.000 \cdot 1{,}08 = 3.240{,}00@ reais.<br>
        b) Juros Compostos: @M = 3.000 \cdot (1{,}02)^4 \approx 3.000 \times 1{,}0824 = 3.247{,}20@ reais.<br>
        <strong>Resposta:</strong> a) R$ 3.240,00; b) R$ 3.247,20.
      </li>
    </ol>

    <h3>Nível 2: Apoio Médio (Desconto Comercial e Taxa Real)</h3>
    <ol start="3">
      <li>
        <span class="gabarito-item-titulo">Exercício 3:</span><br>
        a) Desconto comercial: @D_c = N \cdot d \cdot t = 15.000 \times 0{,}03 \times 3 = 1.350{,}00@ reais.<br>
        b) Valor líquido recebido: @V_L = 15.000 - 1.350 = 13.650{,}00@ reais.<br>
        <strong>Resposta:</strong> a) R$ 1.350,00; b) R$ 13.650,00.
      </li>
      <li>
        <span class="gabarito-item-titulo">Exercício 4:</span><br>
        a) Pela Equação de Fisher: @(1 + i_a) = (1 + i_r)(1 + i_f) \implies 1{,}155 = (1 + i_r) \cdot 1{,}05@.<br>
        @1 + i_r = \frac{1{,}155}{1{,}05} = 1{,}10 \implies i_r = 0{,}10 = 10\%@.<br>
        b) Ganho real sobre R$ 20.000: @20.000 \times 10\% = 2.000{,}00@ reais de poder de compra real.<br>
        <strong>Resposta:</strong> a) Taxa real = 10%; b) Ganho real = R$ 2.000,00.
      </li>
    </ol>

    <h3>Nível 3: Autonomia & Tomada de Decisão Financeira</h3>
    <ol start="5">
      <li>
        <span class="gabarito-item-titulo">Exercício 5:</span><br>
        a) Saldo financiado na Opção B: @3.600 - 1.800 = 1.800{,}00@ reais.<br>
        b) Taxa efetiva do parcelamento: @i = \frac{2.000 - 1.800}{1.800} = \frac{200}{1.800} = \frac{1}{9} \approx 11{,}11\%@ ao mês.<br>
        c) Como a loja cobra 11,11% a.m. e a aplicação rende apenas 1% a.m., pagar à vista é muito mais vantajoso.<br>
        <strong>Resposta:</strong> a) R$ 1.800,00; b) 11,11% a.m.; c) Opção A (À vista) é mais inteligente.
      </li>
      <li>
        <span class="gabarito-item-titulo">Exercício 6:</span><br>
        Trazendo ambos os títulos a valor presente na data @t = 0@:<br>
        @VP = 5.000 \cdot (1{,}02)^{-1} + 5.500 \cdot (1{,}02)^{-2} = 5.000(0{,}9804) + 5.500(0{,}9612) = 4.902 + 5.286{,}60 = 10.188{,}60@ reais.<br>
        <strong>Resposta:</strong> R$ 10.188,60.
      </li>
    </ol>
  </div>
</div>
""",

  '2EM-RECUPERACAO-MATRIZES.html': """
<div class="gabarito-content">
  [--- GABARITO ATIVIDADES DE RECUPERAÇÃO ---]
  <div class="gabarito-secao">
    <h3>Nível 1: Apoio Alto (Operações Básicas e Determinantes 2x2)</h3>
    <ol>
      <li>
        <span class="gabarito-item-titulo">Exercício 1:</span><br>
        a) @A + B = \begin{pmatrix} 3+1 & -1+5 \\ 2+0 & 4+(-2) \end{pmatrix} = \begin{pmatrix} 4 & 4 \\ 2 & 2 \end{pmatrix}@.<br>
        @2A - 3B = \begin{pmatrix} 6 & -2 \\ 4 & 8 \end{pmatrix} - \begin{pmatrix} 3 & 15 \\ 0 & -6 \end{pmatrix} = \begin{pmatrix} 3 & -17 \\ 4 & 14 \end{pmatrix}@.<br>
        b) @\det(A) = (3)(4) - (-1)(2) = 12 + 2 = 14@.<br>
        @\det(B) = (1)(-2) - (5)(0) = -2 - 0 = -2@.<br>
        <strong>Resposta:</strong> a) @A+B = \begin{pmatrix} 4 & 4 \\ 2 & 2 \end{pmatrix}@, @2A-3B = \begin{pmatrix} 3 & -17 \\ 4 & 14 \end{pmatrix}@; b) @\det(A)=14@, @\det(B)=-2@.
      </li>
    </ol>

    <h3>Nível 2: Apoio Médio (Multiplicação e Regra de Sarrus)</h3>
    <ol start="2">
      <li>
        <span class="gabarito-item-titulo">Exercício 2:</span><br>
        a) @M \cdot N = \begin{pmatrix} 1(2)+2(4) & 1(-1)+2(1) \\ 3(2)+0(4) & 3(-1)+0(1) \end{pmatrix} = \begin{pmatrix} 2+8 & -1+2 \\ 6+0 & -3+0 \end{pmatrix} = \begin{pmatrix} 10 & 1 \\ 6 & -3 \end{pmatrix}@.<br>
        b) @N \cdot M = \begin{pmatrix} 2(1)+(-1)(3) & 2(2)+(-1)(0) \\ 4(1)+1(3) & 4(2)+1(0) \end{pmatrix} = \begin{pmatrix} 2-3 & 4+0 \\ 4+3 & 8+0 \end{pmatrix} = \begin{pmatrix} -1 & 4 \\ 7 & 8 \end{pmatrix}@.<br>
        Como @M \cdot N \neq N \cdot M@, a multiplicação de matrizes não é comutativa em geral.<br>
        <strong>Resposta:</strong> Não é comutativa.
      </li>
      <li>
        <span class="gabarito-item-titulo">Exercício 3:</span><br>
        Pela Regra de Sarrus:<br>
        Diagonais principais: @(1 \cdot 1 \cdot 0) + (2 \cdot 4 \cdot 2) + (3 \cdot 0 \cdot 1) = 0 + 16 + 0 = 16@.<br>
        Diagonais secundárias: @(3 \cdot 1 \cdot 2) + (1 \cdot 4 \cdot 1) + (2 \cdot 0 \cdot 0) = 6 + 4 + 0 = 10@.<br>
        Determinante: @\Delta = 16 - 10 = 6@.<br>
        <strong>Resposta:</strong> @\Delta = 6@.
      </li>
    </ol>

    <h3>Nível 3: Autonomia (Propriedades e Equações)</h3>
    <ol start="4">
      <li>
        <span class="gabarito-item-titulo">Exercício 4:</span><br>
        Calculando o determinante 2x2: @x(x - 1) - (3)(2) = 0 \implies x^2 - x - 6 = 0@.<br>
        Fatorando: @(x - 3)(x + 2) = 0 \implies x = 3 \text{ ou } x = -2@.<br>
        <strong>Resposta:</strong> @x \in \{-2, 3\}@.
      </li>
    </ol>
  </div>
</div>
""",

  '3EM-RECUPERACAO-SISTEMAS-LINEARES.html': """
<div class="gabarito-content">
  [--- GABARITO ATIVIDADES DE RECUPERAÇÃO ---]
  <div class="gabarito-secao">
    <h3>Nível 1: Apoio Alto (Sistemas 2x2 e Classificação Direta)</h3>
    <ol>
      <li>
        <span class="gabarito-item-titulo">Exercício 1:</span><br>
        a) Somando as equações: @(2x + y) + (x - y) = 7 + 2 \implies 3x = 9 \implies x = 3@. Logo @y = 1@. Sistema Possível e Determinado (SPD), @S = \{(3, 1)\}@.<br>
        b) A segunda equação @2x + 4y = 8@ é exatamente o dobro da primeira @x + 2y = 4@. As retas são coincidentes: Sistema Possível e Indeterminado (SPI), infinitas soluções @S = \{(4 - 2y, y) \mid y \in \mathbb{R}\}@.<br>
        c) Os primeiros membros são iguais (@3x - y@), mas @5 \neq 9@. As retas são paralelas distintas: Sistema Impossível (SI), @S = \emptyset@.<br>
        <strong>Resposta:</strong> a) SPD, @S = \{(3, 1)\}@; b) SPI (infinitas soluções); c) SI (@S = \emptyset@).
      </li>
    </ol>

    <h3>Nível 2: Apoio Médio (Escalonamento 3x3)</h3>
    <ol start="2">
      <li>
        <span class="gabarito-item-titulo">Exercício 2:</span><br>
        Escalonando a matriz ampliada:<br>
        @L_2 \leftarrow L_2 - 2L_1@: @0x + 3y - 5z = -9@.<br>
        @L_3 \leftarrow L_3 - L_1@: @0x + 4y - 6z = -12@.<br>
        Dividindo @L_3@ por 2: @2y - 3z = -6@. Multiplicando por 3 e subtraindo de @2 \cdot L_2@:<br>
        Obtém-se @z = 0@, @y = -3@ e @x = 2@.<br>
        Verificação: @2 - (-3) + 0 = 5@; @2(2) + (-3) - 0 = 1@; @2 + 3(-3) - 0 = -7@ (satisfeito).<br>
        <strong>Resposta:</strong> SPD, @S = \{(2, -3, 0)\}@.
      </li>
    </ol>

    <h3>Nível 3: Autonomia (Discussão com Parâmetro)</h3>
    <ol start="3">
      <li>
        <span class="gabarito-item-titulo">Exercício 3:</span><br>
        Para que o sistema seja impossível (retas paralelas distintas), os coeficientes de @x@ e @y@ devem ser proporcionais, mas diferentes da proporção dos termos independentes:<br>
        @\frac{2}{4} = \frac{k}{6} \neq \frac{6}{10}@.<br>
        Da primeira igualdade: @\frac{1}{2} = \frac{k}{6} \implies 2k = 6 \implies k = 3@.<br>
        Verificando o termo independente: @\frac{1}{2} \neq \frac{6}{10} = \frac{3}{5}@ (válido).<br>
        Logo, para @k = 3@ o sistema é impossível.<br>
        <strong>Resposta:</strong> @k = 3@.
      </li>
    </ol>
  </div>
</div>
"""
}

# 1. Aplicar soluções aos 11 arquivos sem gabarito
for fname, sol in SOLUTIONS.items():
    fpath = os.path.join(RECUP_DIR, fname)
    if not os.path.exists(fpath):
        print(f"Aviso: {fpath} não encontrado")
        continue
    with open(fpath, "r", encoding="utf-8") as f:
        c = f.read()
    
    # Remover gabarito secreto antigo se existir
    c_clean = re.sub(r'<!--\s*=+\s*GABARITO SECRETO DO PROFESSOR.*?-->', '', c, flags=re.DOTALL)
    
    canonical = f'''<!-- ============================================================================
     GABARITO SECRETO DO PROFESSOR (ACESSO EXCLUSIVO VIA CTRL+U NO NAVEGADOR)
     RESOLUÇÕES E RESPOSTAS COMENTADAS DETALHADAS:

{sol.strip()}
============================================================================ -->
'''
    pos = c_clean.find('<div style="text-align: center; margin-top: 30px;">')
    if pos != -1:
        new_c = c_clean[:pos] + canonical + c_clean[pos:]
        with open(fpath, "w", encoding="utf-8") as f:
            f.write(new_c)
        print(f"Solução injetada em: {fname}")
    else:
        print(f"Erro: Botão não encontrado em {fname}")

# 2. Normalizar os 11 arquivos do 9º Ano que já possuem comentários
files_9ano = [
  '9ANO-ANGULOS.html',
  '9ANO-FUNCAO-1GRAU.html',
  '9ANO-GEOMETRIA-ESPACIAL.html',
  '9ANO-GEOMETRIA-PERIMETRO-AREA.html',
  '9ANO-NUMEROS-REAIS.html',
  '9ANO-PITAGORAS.html',
  '9ANO-PROBABILIDADE.html',
  '9ANO-PRODUTOS-NOTAVEIS.html',
  '9ANO-RAZAO-E-PROPORCAO.html',
  '9ANO-RECUPERACAO-EQUACOES-2GRAU.html',
  '9ANO-TALES-SEMELHANCA.html'
]

for fname in files_9ano:
    fpath = os.path.join(RECUP_DIR, fname)
    if not os.path.exists(fpath):
        continue
    with open(fpath, "r", encoding="utf-8") as f:
        c = f.read()
    
    if "GABARITO SECRETO DO PROFESSOR" in c:
        print(f"Já normalizado: {fname}")
        continue
    
    # Extrair os comentários de gabarito existentes
    comms = re.findall(r'<!--(.*?)-->', c, re.DOTALL)
    gab_texts = []
    for cm in comms:
        if any(w in cm.lower() for w in ['gabarito', 'parte 1', 'etapas', 'resposta']):
            # sanitiza fechamentos
            cleaned_cm = cm.replace('-->', '---]').replace('<!--', '[---').strip()
            gab_texts.append(cleaned_cm)
    
    combined_gab = "\n\n".join(gab_texts)
    
    # Remove todos os comentários de gabarito antigos de c
    c_clean = c
    for cm in comms:
        if any(w in cm.lower() for w in ['gabarito', 'parte 1', 'etapas', 'resposta']):
            c_clean = c_clean.replace(f"<!--{cm}-->", "")
            
    canonical = f'''<!-- ============================================================================
     GABARITO SECRETO DO PROFESSOR (ACESSO EXCLUSIVO VIA CTRL+U NO NAVEGADOR)
     RESOLUÇÕES E RESPOSTAS COMENTADAS DETALHADAS:

<div class="gabarito-content">
{combined_gab}
</div>
============================================================================ -->
'''
    pos = c_clean.find('<div style="text-align: center; margin-top: 30px;">')
    if pos != -1:
        new_c = c_clean[:pos] + canonical + c_clean[pos:]
        with open(fpath, "w", encoding="utf-8") as f:
            f.write(new_c)
        print(f"Normalizado: {fname}")
    else:
        print(f"Botão não encontrado em {fname}")

print("Concluído processamento de recuperação.")

#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Analisador de fórmulas LaTeX para o projeto Nexus
Baseado em agent-formula-formatter.md
"""

import re
import sys
from collections import Counter

def analisar_formulas(arquivo_path):
    """Analisa todas as fórmulas em um arquivo HTML com alta precisão e sem falsos positivos"""

    with open(arquivo_path, 'r', encoding='utf-8') as f:
        conteudo = f.read()

    # Contadores
    total_formulas_inline = 0
    total_formulas_display = 0
    erros = []
    comandos_usados = Counter()

    # Padrões de delimitadores
    pattern_display = r'@@([^@]+?)@@'
    pattern_inline = r'(?<!@)@(?!@)([^@\n]+?)@(?!@)'

    # Extrair fórmulas display
    formulas_display = re.findall(pattern_display, conteudo)
    total_formulas_display = len(formulas_display)

    # Extrair fórmulas inline
    formulas_inline = re.findall(pattern_inline, conteudo)
    total_formulas_inline = len(formulas_inline)

    todas_formulas = formulas_display + formulas_inline

    # Analisar comandos usados
    for formula in todas_formulas:
        comandos = re.findall(r'\\[a-zA-Z]+', formula)
        comandos_usados.update(comandos)

    linhas = conteudo.split('\n')
    inside_script = False
    inside_comment = False

    # Comandos LaTeX e palavras reservadas válidas em modo matemático
    operadores_matematicos = {
        'quad', 'qquad', 'align', 'matrix', 'pmatrix', 'bmatrix', 'vmatrix', 'Vmatrix',
        'sin', 'cos', 'tan', 'cot', 'sec', 'csc', 'arcsin', 'arccos', 'arctan',
        'sinh', 'cosh', 'tanh', 'log', 'ln', 'lim', 'max', 'min', 'sup', 'inf',
        'det', 'gcd', 'deg', 'dim', 'ker', 'hom', 'bmod', 'pmod', 'cases', 'array'
    }

    inside_body = False

    # Verificar linha por linha
    for i, linha in enumerate(linhas, 1):
        linha_strip = linha.strip()

        # Rastrear <body> e </body>
        if '<body' in linha:
            inside_body = True
        if '</body>' in linha:
            inside_body = False
            continue

        if not inside_body:
            continue

        # Rastrear blocos <script>
        if '<script' in linha:
            inside_script = True
        if '</script>' in linha:
            inside_script = False
            continue
        if inside_script:
            continue

        # Ignorar tags <link>
        if '<link' in linha:
            continue

        # Rastrear comentários HTML
        if '<!--' in linha and '-->' not in linha:
            inside_comment = True
            continue
        if '-->' in linha and inside_comment:
            inside_comment = False
            continue
        if inside_comment:
            continue

        # Ignorar comentários na mesma linha
        linha_limpa = re.sub(r'<!--.*?-->', '', linha)
        # Ignorar URLs com @ (ex: npm/@version ou fonts/@weights)
        linha_limpa = re.sub(r'https?://[^\s"\'>]+', '', linha_limpa)
        # Ignorar emails (ex: joao.germano305@portalsesisp.org.br)
        linha_limpa = re.sub(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}', '', linha_limpa)

        # Contar @ (excluindo blocos @@...@@)
        linha_sem_display = re.sub(r'@@[^@]+?@@', '', linha_limpa)
        count_at = linha_sem_display.count('@')

        if count_at % 2 != 0:
            erros.append({
                'linha': i,
                'tipo': 'delimitador_nao_fechado',
                'descricao': f'Delimitador @ não fechado (total: {count_at})',
                'conteudo': linha.strip()[:100]
            })

        # Extrair fórmulas na linha (display e inline separadamente)
        formulas_display_na_linha = re.findall(r'@@([^@]+?)@@', linha_limpa)
        formulas_inline_na_linha = re.findall(r'@([^@]+)@', linha_sem_display)
        formulas_na_linha = formulas_display_na_linha + formulas_inline_na_linha

        for formula in formulas_na_linha:
            chaves_abertas = formula.count('{')
            chaves_fechadas = formula.count('}')
            if chaves_abertas != chaves_fechadas:
                erros.append({
                    'linha': i,
                    'tipo': 'chaves_nao_balanceadas',
                    'descricao': f'Chaves não balanceadas (abertas: {chaves_abertas}, fechadas: {chaves_fechadas})',
                    'conteudo': formula[:100]
                })

        # Verificar comandos inválidos comuns (portuguesismos em LaTeX)
        comandos_invalidos = {
            r'\\alfa\b': r'\\alpha',
            r'\\teta\b': r'\\theta',
            r'\\gama\b': r'\\gamma',
            r'\\raiz\b': r'\\sqrt',
            r'\\infinito\b': r'\\infty',
        }

        for invalido, correto in comandos_invalidos.items():
            if re.search(invalido, linha_limpa):
                erros.append({
                    'linha': i,
                    'tipo': 'comando_invalido',
                    'descricao': f'Comando inválido encontrado: {invalido} → deve ser {correto}',
                    'conteudo': linha.strip()[:100]
                })

        # Verificar texto sem \text{} em fórmulas (limpando comandos e ambientes LaTeX)
        for formula in formulas_na_linha:
            # Remover blocos \text{...} legítimos
            f_limpa = re.sub(r'\\text\{[^}]*\}', '', formula)
            # Remover ambientes \begin{...} e \end{...}
            f_limpa = re.sub(r'\\(begin|end)\{[^}]*\}', '', f_limpa)
            # Remover comandos LaTeX (\sqrt, \frac, \mathbb, etc.)
            f_limpa = re.sub(r'\\[a-zA-Z]+', '', f_limpa)
            # Buscar palavras com 4 ou mais letras
            palavras = re.findall(r'[a-záàâãéèêíïóôõöúçñ]{4,}', f_limpa, re.IGNORECASE)
            palavras_invalidas = [p for p in palavras if p.lower() not in operadores_matematicos]

            if palavras_invalidas:
                erros.append({
                    'linha': i,
                    'tipo': 'texto_sem_text',
                    'descricao': f'Possível texto sem \\text{{}}: {palavras_invalidas}',
                    'conteudo': formula[:100]
                })

    # Gerar relatório
    print("=" * 80)
    print("RELATÓRIO DE ANÁLISE DE FÓRMULAS MATEMÁTICAS")
    print("=" * 80)
    print(f"\nArquivo: {arquivo_path}")
    print(f"\n{'='*80}")
    print("ESTATÍSTICAS GERAIS")
    print("=" * 80)
    print(f"Total de fórmulas inline (@...@):     {total_formulas_inline}")
    print(f"Total de fórmulas display (@@...@@):  {total_formulas_display}")
    print(f"Total de fórmulas:                    {total_formulas_inline + total_formulas_display}")
    print(f"Total de erros detectados:            {len(erros)}")

    print(f"\n{'='*80}")
    print("COMANDOS LATEX MAIS USADOS")
    print("=" * 80)
    for comando, count in comandos_usados.most_common(15):
        print(f"{comando:20s} {count:3d} vezes")

    if erros:
        print(f"\n{'='*80}")
        print("ERROS DETECTADOS")
        print("=" * 80)

        erros_por_tipo = {}
        for erro in erros:
            tipo = erro['tipo']
            if tipo not in erros_por_tipo:
                erros_por_tipo[tipo] = []
            erros_por_tipo[tipo].append(erro)

        print(f"\nRESUMO POR TIPO:")
        for tipo, lista in erros_por_tipo.items():
            print(f"  - {tipo}: {len(lista)} ocorrência(s)")

        print(f"\n{'='*80}")
        print("DETALHES DOS ERROS")
        print("=" * 80)

        for i, erro in enumerate(erros, 1):
            print(f"\n[ERRO {i}]")
            print(f"Linha:      {erro['linha']}")
            print(f"Tipo:       {erro['tipo']}")
            print(f"Descrição:  {erro['descricao']}")
            print(f"Conteúdo:   {erro['conteudo']}")
    else:
        print(f"\n{'='*80}")
        print("✅ NENHUM ERRO DETECTADO!")
        print("=" * 80)

    # Score de qualidade
    total_itens = total_formulas_inline + total_formulas_display
    if total_itens > 0:
        score = max(0, 100 - (len(erros) * 10))
        print(f"\n{'='*80}")
        print("SCORE DE QUALIDADE")
        print("=" * 80)
        print(f"Score: {score}/100")
        if score >= 95:
            print("Status: ✅ EXCELENTE")
        elif score >= 85:
            print("Status: ✅ MUITO BOM")
        elif score >= 70:
            print("Status: ⚠️  BOM (com melhorias)")
        elif score >= 50:
            print("Status: ⚠️  REGULAR (necessita correções)")
        else:
            print("Status: ❌ INSUFICIENTE (necessita correções urgentes)")

    print(f"\n{'='*80}\n")

    return {
        'total_formulas_inline': total_formulas_inline,
        'total_formulas_display': total_formulas_display,
        'total_erros': len(erros),
        'erros': erros,
        'comandos_usados': comandos_usados
    }

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Uso: python analyze_formulas.py <arquivo.html>")
        sys.exit(1)

    arquivo = sys.argv[1]
    resultado = analisar_formulas(arquivo)

    sys.exit(0 if resultado['total_erros'] == 0 else 1)

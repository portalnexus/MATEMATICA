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
    """Analisa todas as fórmulas em um arquivo HTML"""

    with open(arquivo_path, 'r', encoding='utf-8') as f:
        conteudo = f.read()

    linhas = conteudo.split('\n')

    # Contadores
    total_formulas_inline = 0
    total_formulas_display = 0
    erros = []
    comandos_usados = Counter()

    # Padrões de delimitadores
    pattern_display = r'@@([^@]+?)@@'
    pattern_inline = r'(?<!@)@(?!@)([^@]+?)@(?!@)'

    # Extrair fórmulas display
    formulas_display = re.findall(pattern_display, conteudo)
    total_formulas_display = len(formulas_display)

    # Extrair fórmulas inline
    formulas_inline = re.findall(pattern_inline, conteudo)
    total_formulas_inline = len(formulas_inline)

    todas_formulas = formulas_display + formulas_inline

    # Analisar comandos usados
    for formula in todas_formulas:
        # Comandos LaTeX começam com \
        comandos = re.findall(r'\\[a-zA-Z]+', formula)
        comandos_usados.update(comandos)

    # Verificar delimitadores balanceados por linha
    for i, linha in enumerate(linhas, 1):
        # Contar @ (excluindo @@)
        linha_sem_display = re.sub(r'@@', '', linha)
        count_at = linha_sem_display.count('@')

        if count_at % 2 != 0:
            erros.append({
                'linha': i,
                'tipo': 'delimitador_nao_fechado',
                'descricao': f'Delimitador @ não fechado (total: {count_at})',
                'conteudo': linha.strip()[:100]
            })

        # Verificar chaves balanceadas em fórmulas
        formulas_na_linha = re.findall(r'@([^@]+)@', linha)
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

        # Verificar comandos inválidos comuns
        comandos_invalidos = {
            r'\\alfa': r'\\alpha',
            r'\\teta': r'\\theta',
            r'\\gama': r'\\gamma',
            r'\\raiz': r'\\sqrt',
            r'\\infinito': r'\\infty',
        }

        for invalido, correto in comandos_invalidos.items():
            if re.search(invalido, linha):
                erros.append({
                    'linha': i,
                    'tipo': 'comando_invalido',
                    'descricao': f'Comando inválido encontrado: {invalido} → deve ser {correto}',
                    'conteudo': linha.strip()[:100]
                })

        # Verificar texto sem \text{} em fórmulas
        formulas_na_linha = re.findall(r'@([^@]+)@', linha)
        for formula in formulas_na_linha:
            # Procurar palavras em português sem \text{}
            palavras_pt = re.findall(r'(?<!\\text\{)[a-záàâãéèêíïóôõöúçñ]{4,}', formula, re.IGNORECASE)
            if palavras_pt and not re.search(r'\\(sin|cos|tan|log|lim|max|min|sup|inf)', formula):
                erros.append({
                    'linha': i,
                    'tipo': 'texto_sem_text',
                    'descricao': f'Possível texto sem \\text{{}}: {palavras_pt}',
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

        # Agrupar por tipo
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

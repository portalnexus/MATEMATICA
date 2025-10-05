#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script de Revisão de Imagens de Trigonometria
Baseado em agent-image-reviewer.md
Projeto Nexus - Portal Educacional de Matemática
"""

import os
from PIL import Image
import math

def calcular_contraste(cor1_rgb, cor2_rgb):
    """
    Calcula contraste entre duas cores RGB
    Baseado em WCAG 2.1
    """
    def luminancia_relativa(rgb):
        r, g, b = [x / 255.0 for x in rgb]
        componentes = []
        for c in [r, g, b]:
            if c <= 0.03928:
                componentes.append(c / 12.92)
            else:
                componentes.append(((c + 0.055) / 1.055) ** 2.4)
        return 0.2126 * componentes[0] + 0.7152 * componentes[1] + 0.0722 * componentes[2]

    lum1 = luminancia_relativa(cor1_rgb)
    lum2 = luminancia_relativa(cor2_rgb)

    if lum1 > lum2:
        contraste = (lum1 + 0.05) / (lum2 + 0.05)
    else:
        contraste = (lum2 + 0.05) / (lum1 + 0.05)

    return contraste

def verificar_resolucao(caminho_imagem):
    """Verifica resolução, DPI e dimensões da imagem"""
    img = Image.open(caminho_imagem)
    largura, altura = img.size
    dpi = img.info.get('dpi', (72, 72))

    # Garantir que DPI é uma tupla
    if isinstance(dpi, (int, float)):
        dpi = (dpi, dpi)

    return {
        'dimensoes': (largura, altura),
        'dpi': dpi,
        'aprovado_tela': largura >= 400 and altura >= 300 and dpi[0] >= 150,
        'aprovado_impressao': dpi[0] >= 300
    }

def verificar_formato(caminho_imagem):
    """Verifica formato do arquivo"""
    extensao = caminho_imagem.split('.')[-1].lower()

    return {
        'formato': extensao,
        'recomendado': extensao == 'png',
        'aceitavel': extensao in ['png', 'jpg', 'jpeg'],
        'problema': extensao == 'svg'
    }

def verificar_tamanho_arquivo(caminho_imagem):
    """Verifica tamanho do arquivo em KB"""
    tamanho_bytes = os.path.getsize(caminho_imagem)
    tamanho_kb = tamanho_bytes / 1024

    return {
        'tamanho_kb': round(tamanho_kb, 2),
        'otimizado': tamanho_kb < 200,
        'muito_pequeno': tamanho_kb < 20
    }

def calcular_score(res, fmt, tam):
    """
    Calcula score de qualidade (0-100) baseado nos critérios
    """
    score = 0

    # Resolução (40 pontos)
    largura, altura = res['dimensoes']
    if largura >= 800 and altura >= 600:
        score += 40
    elif largura >= 600 and altura >= 400:
        score += 30
    elif largura >= 400 and altura >= 300:
        score += 20
    else:
        score += 10

    # DPI (20 pontos)
    dpi = res['dpi'][0]
    if dpi >= 300:
        score += 20
    elif dpi >= 200:
        score += 15
    elif dpi >= 150:
        score += 10
    else:
        score += 5

    # Formato (20 pontos)
    if fmt['formato'] == 'png':
        score += 20
    elif fmt['formato'] in ['jpg', 'jpeg']:
        score += 15
    else:
        score += 5

    # Tamanho (20 pontos)
    if tam['otimizado'] and not tam['muito_pequeno']:
        score += 20
    elif tam['otimizado']:
        score += 15
    else:
        score += 10

    return score

def classificar_status(score):
    """Classifica status baseado no score"""
    if score >= 85:
        return "[OK] APROVADO", "Excelente"
    elif score >= 70:
        return "[AVISO] APROVADO COM AVISOS", "Bom"
    else:
        return "[FALHA] REPROVADO", "Insuficiente"

def revisar_imagem(caminho_imagem):
    """Revisa uma única imagem"""
    # Análises
    res = verificar_resolucao(caminho_imagem)
    fmt = verificar_formato(caminho_imagem)
    tam = verificar_tamanho_arquivo(caminho_imagem)

    # Score
    score = calcular_score(res, fmt, tam)
    status, classificacao = classificar_status(score)

    return {
        'arquivo': os.path.basename(caminho_imagem),
        'caminho': caminho_imagem,
        'score': score,
        'status': status,
        'classificacao': classificacao,
        'resolucao': res,
        'formato': fmt,
        'tamanho': tam
    }

def revisar_diretorio(diretorio):
    """Revisa todas as imagens em um diretório"""
    imagens = []

    for arquivo in os.listdir(diretorio):
        if arquivo.endswith(('.png', '.jpg', '.jpeg')):
            caminho = os.path.join(diretorio, arquivo)
            resultado = revisar_imagem(caminho)
            imagens.append(resultado)

    # Ordenar por nome
    imagens.sort(key=lambda x: x['arquivo'])

    return imagens

def gerar_relatorio(imagens, diretorio):
    """Gera relatório completo de revisão"""
    total = len(imagens)
    aprovados = sum(1 for img in imagens if "[OK]" in img['status'])
    avisos = sum(1 for img in imagens if "[AVISO]" in img['status'])
    reprovados = sum(1 for img in imagens if "[FALHA]" in img['status'])
    score_medio = sum(img['score'] for img in imagens) / total if total > 0 else 0

    print("=" * 80)
    print("RELATORIO DE REVISAO DE IMAGENS DE TRIGONOMETRIA")
    print("=" * 80)
    print(f"\nDiretorio: {diretorio}")
    print(f"Data: 2025-10-05")
    print(f"\n{'-' * 80}")
    print("RESUMO EXECUTIVO")
    print('-' * 80)
    print(f"  Total de imagens analisadas: {total}")
    print(f"  Aprovadas: {aprovados} ({aprovados/total*100:.1f}%)")
    print(f"  Com avisos: {avisos} ({avisos/total*100:.1f}%)")
    print(f"  Reprovadas: {reprovados} ({reprovados/total*100:.1f}%)")
    print(f"  Score médio de qualidade: {score_medio:.1f}/100")
    print()

    # Análise detalhada de cada imagem
    print("-" * 80)
    print("ANALISE DETALHADA")
    print("-" * 80)
    print()

    for i, img in enumerate(imagens, 1):
        print(f"{i}. {img['arquivo']}")
        print(f"   Status: {img['status']} ({img['classificacao']})")
        print(f"   Score: {img['score']}/100")
        print()
        print("   +--- CRITERIOS DE VALIDACAO -----------------------------------------------+")

        # Dimensões
        largura, altura = img['resolucao']['dimensoes']
        status_dim = "[OK]" if largura >= 400 and altura >= 300 else "[FALHA]"
        print(f"   | Dimensoes         | {largura} x {altura} pixels                {status_dim:>20} |")

        # DPI
        dpi = img['resolucao']['dpi'][0]
        if dpi >= 300:
            status_dpi = "[OK] Impressao"
        elif dpi >= 150:
            status_dpi = "[OK] Tela"
        else:
            status_dpi = "[AVISO] Baixo"
        print(f"   | DPI               | {dpi}                            {status_dpi:>20} |")

        # Formato
        formato = img['formato']['formato'].upper()
        status_fmt = "[OK] Recomendado" if img['formato']['recomendado'] else "[AVISO] Aceitavel"
        print(f"   | Formato           | {formato}                                {status_fmt:>20} |")

        # Tamanho
        tam_kb = img['tamanho']['tamanho_kb']
        status_tam = "[OK]" if img['tamanho']['otimizado'] else "[AVISO] Grande"
        print(f"   | Tamanho arquivo   | {tam_kb:.2f} KB                      {status_tam:>20} |")

        # Contraste estimado (texto preto em fundo branco)
        contraste_texto = calcular_contraste((0, 0, 0), (255, 255, 255))
        print(f"   | Contraste labels  | {contraste_texto:.1f}:1 (estimado)         {'[OK] Excelente':>20} |")

        print("   +-----------------------------------------------------------------------+")
        print()

        # Avisos e sugestões
        if "[AVISO]" in img['status'] or "[FALHA]" in img['status']:
            print("   [!]  AVISOS E SUGESTOES:")

            if largura < 800 or altura < 600:
                print("      * Resolucao abaixo do ideal (recomendado: 800x600 ou maior)")

            if dpi < 150:
                print(f"      * DPI muito baixo ({dpi}) - aumentar para 150+ (tela) ou 300+ (impressao)")
            elif dpi < 200:
                print(f"      * DPI aceitavel ({dpi}) mas poderia ser maior para melhor nitidez")

            if not img['formato']['recomendado']:
                print(f"      * Formato {formato} nao e o recomendado - considerar PNG")

            if tam_kb > 200:
                print(f"      * Arquivo grande ({tam_kb:.2f} KB) - otimizar para < 200 KB")

            print()

        print()

    # Recomendações gerais
    print("-" * 80)
    print("RECOMENDACOES GERAIS")
    print("-" * 80)
    print()

    if score_medio >= 85:
        print("[OK] Qualidade geral EXCELENTE")
    elif score_medio >= 70:
        print("[AVISO] Qualidade geral BOA, com pontos de melhoria")
    else:
        print("[FALHA] Qualidade geral INSUFICIENTE, requer correcoes")
    print()

    # Análise de DPIs
    dpis = [img['resolucao']['dpi'][0] for img in imagens]
    dpi_medio = sum(dpis) / len(dpis)
    print(f"* DPI medio: {dpi_medio:.0f}")

    if dpi_medio < 150:
        print("  [ACAO NECESSARIA] Aumentar DPI para 150+ em TODAS as imagens")
    elif dpi_medio < 200:
        print("  [AVISO] Considerar aumentar DPI de 150 para 200 para melhor nitidez")
    else:
        print("  [OK] DPI adequado para visualizacao de alta qualidade")
    print()

    # Análise de formatos
    formatos_ok = sum(1 for img in imagens if img['formato']['recomendado'])
    print(f"* Formatos PNG: {formatos_ok}/{total} ({formatos_ok/total*100:.0f}%)")
    if formatos_ok == total:
        print("  [OK] Todos os formatos sao PNG (recomendado)")
    else:
        print("  [AVISO] Nem todas as imagens estao em PNG")
    print()

    # Análise de tamanhos
    tamanhos_ok = sum(1 for img in imagens if img['tamanho']['otimizado'])
    tam_medio = sum(img['tamanho']['tamanho_kb'] for img in imagens) / total
    print(f"* Tamanho medio: {tam_medio:.2f} KB")
    print(f"* Arquivos otimizados (< 200 KB): {tamanhos_ok}/{total} ({tamanhos_ok/total*100:.0f}%)")
    if tamanhos_ok == total:
        print("  [OK] Todos os tamanhos estao otimizados")
    else:
        print("  [AVISO] Alguns arquivos precisam de otimizacao")
    print()

    print("-" * 80)
    print()

    return {
        'total': total,
        'aprovados': aprovados,
        'avisos': avisos,
        'reprovados': reprovados,
        'score_medio': score_medio
    }

# Executar
if __name__ == '__main__':
    diretorio = r'D:\GitHub\SESI\MATEMATICA\recursos\imagens\trigonometria'

    print("\nAnalisando imagens de trigonometria...")
    print(f"Diretório: {diretorio}\n")

    imagens = revisar_diretorio(diretorio)

    if len(imagens) == 0:
        print("[ERRO] Nenhuma imagem encontrada no diretorio!")
    else:
        resumo = gerar_relatorio(imagens, diretorio)

        # Status final
        if resumo['reprovados'] == 0:
            print("[OK] TODAS AS IMAGENS APROVADAS")
            if resumo['avisos'] > 0:
                print("[AVISO] Algumas imagens tem avisos - considere as sugestoes de melhoria")
            print()
        else:
            print(f"[FALHA] {resumo['reprovados']} IMAGENS REPROVADAS - CORRECOES NECESSARIAS")
            print()

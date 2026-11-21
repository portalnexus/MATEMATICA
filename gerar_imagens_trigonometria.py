#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Gerador de Imagens para Resumo de Trigonometria
Projeto Nexus - Portal Educacional de Matemática
"""

import matplotlib.pyplot as plt
import matplotlib.patches as patches
import numpy as np
from matplotlib.patches import Arc, FancyBboxPatch
import os

# Configurações globais
plt.rcParams['font.family'] = 'sans-serif'
plt.rcParams['font.size'] = 12
plt.rcParams['mathtext.fontset'] = 'cm'

# Criar pasta de saída
output_dir = "recursos/imagens/trigonometria"
os.makedirs(output_dir, exist_ok=True)

def criar_triangulo_retangulo():
    """Imagem 1: Triângulo retângulo básico com nomenclatura"""
    fig, ax = plt.subplots(figsize=(8, 6), facecolor='white')

    # Coordenadas do triângulo retângulo
    A = np.array([1, 1])
    B = np.array([1, 4])
    C = np.array([5, 1])

    # Desenhar triângulo
    triangle = plt.Polygon([A, B, C], fill=False, edgecolor='black', linewidth=2.5)
    ax.add_patch(triangle)

    # Destacar hipotenusa (BC) com cor diferente
    ax.plot([B[0], C[0]], [B[1], C[1]], 'b-', linewidth=3.5, label='Hipotenusa')

    # Marcar ângulo reto em A
    square_size = 0.3
    square = patches.Rectangle((A[0], A[1]), square_size, square_size,
                                fill=False, edgecolor='black', linewidth=1.5)
    ax.add_patch(square)

    # Labels dos vértices
    ax.text(A[0]-0.3, A[1]-0.3, 'A', fontsize=16, fontweight='bold', ha='right')
    ax.text(B[0]-0.3, B[1]+0.2, 'B', fontsize=16, fontweight='bold', ha='right')
    ax.text(C[0]+0.2, C[1]-0.3, 'C', fontsize=16, fontweight='bold', ha='left')

    # Labels dos lados
    # Cateto AB = c
    mid_AB = (A + B) / 2
    ax.text(mid_AB[0]-0.5, mid_AB[1], 'c (cateto)', fontsize=13, ha='right',
            bbox=dict(boxstyle='round,pad=0.3', facecolor='lightblue', alpha=0.7))

    # Cateto AC = b
    mid_AC = (A + C) / 2
    ax.text(mid_AC[0], mid_AC[1]-0.5, 'b (cateto)', fontsize=13, ha='center',
            bbox=dict(boxstyle='round,pad=0.3', facecolor='lightblue', alpha=0.7))

    # Hipotenusa BC = a
    mid_BC = (B + C) / 2
    ax.text(mid_BC[0]+0.3, mid_BC[1]+0.5, 'a (hipotenusa)', fontsize=13, ha='left',
            bbox=dict(boxstyle='round,pad=0.3', facecolor='lightgreen', alpha=0.7))

    ax.set_xlim(0, 6)
    ax.set_ylim(0, 5)
    ax.set_aspect('equal')
    ax.axis('off')
    ax.set_title('Triângulo Retângulo - Nomenclatura', fontsize=18, fontweight='bold', pad=20)

    plt.tight_layout()
    plt.savefig(f'{output_dir}/triangulo-retangulo.png', dpi=150, bbox_inches='tight',
                facecolor='white', edgecolor='none')
    plt.close()
    print("[OK] Imagem 1 criada: triangulo-retangulo.png")

def criar_pitagoras_demonstracao():
    """Imagem 2: Demonstração do Teorema de Pitágoras"""
    fig, ax = plt.subplots(figsize=(9, 6), facecolor='white')

    # Coordenadas
    A = np.array([1, 1])
    B = np.array([1, 4.5])
    C = np.array([5.5, 1])

    # Ponto H (pé da altura)
    # Cálculo da projeção de A sobre BC
    BC = C - B
    BA = A - B
    t = np.dot(BA, BC) / np.dot(BC, BC)
    H = B + t * BC

    # Desenhar triângulo principal
    triangle = plt.Polygon([A, B, C], fill=False, edgecolor='black', linewidth=2.5)
    ax.add_patch(triangle)

    # Desenhar altura AH
    ax.plot([A[0], H[0]], [A[1], H[1]], 'r--', linewidth=2, label='Altura h')

    # Marcar ângulo reto em A
    square_size = 0.25
    square = patches.Rectangle((A[0], A[1]), square_size, square_size,
                                fill=False, edgecolor='black', linewidth=1.5)
    ax.add_patch(square)

    # Marcar ângulo reto em H (altura perpendicular)
    vec_AH = H - A
    vec_perp = np.array([-vec_AH[1], vec_AH[0]])
    vec_perp = vec_perp / np.linalg.norm(vec_perp) * square_size
    perp_square = plt.Polygon([H, H + vec_perp, H + vec_perp + (A-H)/np.linalg.norm(A-H)*square_size,
                                H + (A-H)/np.linalg.norm(A-H)*square_size],
                               fill=False, edgecolor='black', linewidth=1)
    ax.add_patch(perp_square)

    # Labels dos pontos
    ax.text(A[0]-0.3, A[1]-0.4, 'A', fontsize=16, fontweight='bold')
    ax.text(B[0]-0.4, B[1]+0.2, 'B', fontsize=16, fontweight='bold')
    ax.text(C[0]+0.2, C[1]-0.4, 'C', fontsize=16, fontweight='bold')
    ax.text(H[0], H[1]+0.4, 'H', fontsize=16, fontweight='bold', color='red')

    # Labels dos segmentos
    ax.text((B[0]+H[0])/2 - 0.5, (B[1]+H[1])/2, 'm', fontsize=14, color='blue',
            bbox=dict(boxstyle='round,pad=0.2', facecolor='lightblue', alpha=0.8))
    ax.text((H[0]+C[0])/2 + 0.3, (H[1]+C[1])/2, 'n', fontsize=14, color='blue',
            bbox=dict(boxstyle='round,pad=0.2', facecolor='lightblue', alpha=0.8))
    ax.text((A[0]+H[0])/2 + 0.3, (A[1]+H[1])/2 + 0.2, 'h', fontsize=14, color='red',
            bbox=dict(boxstyle='round,pad=0.2', facecolor='lightyellow', alpha=0.8))

    # Catetos e hipotenusa
    ax.text((A[0]+B[0])/2 - 0.6, (A[1]+B[1])/2, 'c', fontsize=14, fontweight='bold')
    ax.text((A[0]+C[0])/2, (A[1]+C[1])/2 - 0.5, 'b', fontsize=14, fontweight='bold')
    ax.text((B[0]+C[0])/2 + 0.5, (B[1]+C[1])/2 + 0.3, 'a', fontsize=14, fontweight='bold')

    ax.set_xlim(0, 7)
    ax.set_ylim(0, 5.5)
    ax.set_aspect('equal')
    ax.axis('off')
    ax.set_title('Demonstração do Teorema de Pitágoras\n(por semelhança de triângulos)',
                 fontsize=18, fontweight='bold', pad=20)

    plt.tight_layout()
    plt.savefig(f'{output_dir}/pitagoras-demonstracao.png', dpi=150, bbox_inches='tight',
                facecolor='white', edgecolor='none')
    plt.close()
    print("[OK] Imagem 2 criada: pitagoras-demonstracao.png")

def criar_razoes_trigonometricas():
    """Imagem 3: Razões trigonométricas (sen, cos, tan)"""
    fig, ax = plt.subplots(figsize=(10, 7), facecolor='white')

    # Triângulo retângulo
    A = np.array([1, 1])
    B = np.array([1, 4.5])
    C = np.array([5.5, 1])

    # Desenhar triângulo
    ax.plot([A[0], B[0]], [A[1], B[1]], 'r-', linewidth=3, label='Cateto Oposto')
    ax.plot([A[0], C[0]], [A[1], C[1]], 'b-', linewidth=3, label='Cateto Adjacente')
    ax.plot([B[0], C[0]], [B[1], C[1]], 'g-', linewidth=3.5, label='Hipotenusa')

    # Marcar ângulo reto
    square_size = 0.25
    square = patches.Rectangle((A[0], A[1]), square_size, square_size,
                                fill=False, edgecolor='black', linewidth=1.5)
    ax.add_patch(square)

    # Marcar ângulo theta em C
    angle = Arc((C[0], C[1]), 1.2, 1.2, angle=0, theta1=90, theta2=155,
                color='purple', linewidth=2.5)
    ax.add_patch(angle)
    ax.text(C[0]-0.8, C[1]+0.5, r'$\theta$', fontsize=18, color='purple', fontweight='bold')

    # Labels dos lados
    ax.text((A[0]+B[0])/2 - 0.8, (A[1]+B[1])/2, 'cateto\noposto', fontsize=12, ha='center',
            color='red', fontweight='bold',
            bbox=dict(boxstyle='round,pad=0.3', facecolor='lightcoral', alpha=0.7))

    ax.text((A[0]+C[0])/2, (A[1]+C[1])/2 - 0.6, 'cateto adjacente', fontsize=12, ha='center',
            color='blue', fontweight='bold',
            bbox=dict(boxstyle='round,pad=0.3', facecolor='lightblue', alpha=0.7))

    ax.text((B[0]+C[0])/2 + 0.7, (B[1]+C[1])/2, 'hipotenusa', fontsize=12, ha='center',
            color='green', fontweight='bold',
            bbox=dict(boxstyle='round,pad=0.3', facecolor='lightgreen', alpha=0.7))

    # Fórmulas das razões
    formulas_x = 7.5
    ax.text(formulas_x, 4, r'$\sin(\theta) = \frac{\mathrm{cateto\ oposto}}{\mathrm{hipotenusa}}$',
            fontsize=15, bbox=dict(boxstyle='round,pad=0.5', facecolor='lightcoral', alpha=0.6))

    ax.text(formulas_x, 3, r'$\cos(\theta) = \frac{\mathrm{cateto\ adjacente}}{\mathrm{hipotenusa}}$',
            fontsize=15, bbox=dict(boxstyle='round,pad=0.5', facecolor='lightblue', alpha=0.6))

    ax.text(formulas_x, 2, r'$\tan(\theta) = \frac{\mathrm{cateto\ oposto}}{\mathrm{cateto\ adjacente}}$',
            fontsize=15, bbox=dict(boxstyle='round,pad=0.5', facecolor='lightyellow', alpha=0.7))

    ax.set_xlim(0, 11)
    ax.set_ylim(0, 5.5)
    ax.set_aspect('equal')
    ax.axis('off')
    ax.set_title('Razões Trigonométricas no Triângulo Retângulo',
                 fontsize=18, fontweight='bold', pad=20)

    plt.tight_layout()
    plt.savefig(f'{output_dir}/razoes-trigonometricas.png', dpi=150, bbox_inches='tight',
                facecolor='white', edgecolor='none')
    plt.close()
    print("[OK] Imagem 3 criada: razoes-trigonometricas.png")

def criar_triangulo_30_60_90():
    """Imagem 4: Triângulo 30-60-90"""
    fig, ax = plt.subplots(figsize=(10, 7), facecolor='white')

    # Triângulo equilátero de lado L = 4
    L = 4
    A = np.array([2, 1])
    B = np.array([2, 1 + L * np.sqrt(3)])
    C = np.array([2 + L, 1])

    # Ponto médio M de AC
    M = (A + C) / 2

    # Desenhar triângulo equilátero (tracejado leve)
    ax.plot([A[0], B[0]], [A[1], B[1]], 'gray', linewidth=1.5, linestyle='--', alpha=0.5)
    ax.plot([B[0], C[0]], [B[1], C[1]], 'gray', linewidth=1.5, linestyle='--', alpha=0.5)
    ax.plot([C[0], A[0]], [C[1], A[1]], 'gray', linewidth=1.5, linestyle='--', alpha=0.5)

    # Desenhar altura (divide o triângulo)
    ax.plot([B[0], M[0]], [B[1], M[1]], 'r-', linewidth=2.5, label='Altura')

    # Destacar triângulo 30-60-90 (triângulo BMA)
    triangle_30_60 = plt.Polygon([B, M, A], fill=True, facecolor='lightblue',
                                  alpha=0.3, edgecolor='blue', linewidth=3)
    ax.add_patch(triangle_30_60)

    # Marcar ângulos
    # Ângulo reto em M
    square_size = 0.2
    square = patches.Rectangle((M[0]-square_size/2, M[1]-square_size/2), square_size, square_size,
                                fill=False, edgecolor='black', linewidth=1.5)
    ax.add_patch(square)

    # Ângulo de 60° em B
    angle_60 = Arc((B[0], B[1]), 0.8, 0.8, angle=0, theta1=270, theta2=330,
                   color='purple', linewidth=2.5)
    ax.add_patch(angle_60)
    ax.text(B[0]+0.3, B[1]-0.6, '60°', fontsize=14, color='purple', fontweight='bold')

    # Ângulo de 30° em A
    angle_30 = Arc((A[0], A[1]), 0.8, 0.8, angle=0, theta1=30, theta2=90,
                   color='orange', linewidth=2.5)
    ax.add_patch(angle_30)
    ax.text(A[0]+0.5, A[1]+0.3, '30°', fontsize=14, color='orange', fontweight='bold')

    # Labels dos vértices
    ax.text(B[0]-0.4, B[1]+0.2, 'B', fontsize=16, fontweight='bold')
    ax.text(M[0], M[1]-0.4, 'M', fontsize=16, fontweight='bold')
    ax.text(A[0]-0.4, A[1]-0.3, 'A', fontsize=16, fontweight='bold')
    ax.text(C[0]+0.2, C[1]-0.3, 'C', fontsize=16, fontweight='bold')

    # Labels dos lados
    ax.text((B[0]+A[0])/2 - 0.6, (B[1]+A[1])/2, f'L = {L}', fontsize=13,
            bbox=dict(boxstyle='round,pad=0.3', facecolor='lightgreen', alpha=0.7))

    ax.text((A[0]+M[0])/2, (A[1]+M[1])/2 - 0.5, f'L/2 = {L/2}', fontsize=13,
            bbox=dict(boxstyle='round,pad=0.3', facecolor='lightcoral', alpha=0.7))

    ax.text((B[0]+M[0])/2 + 0.4, (B[1]+M[1])/2, f'L√3/2 = {L}√3/2', fontsize=13,
            bbox=dict(boxstyle='round,pad=0.3', facecolor='lightyellow', alpha=0.7))

    # Texto explicativo
    ax.text(6.5, 5, 'Triângulo 30-60-90', fontsize=15, fontweight='bold',
            bbox=dict(boxstyle='round,pad=0.5', facecolor='lightcyan', alpha=0.8))
    ax.text(6.5, 4.2, 'Obtido da altura de um\ntriângulo equilátero', fontsize=12,
            bbox=dict(boxstyle='round,pad=0.4', facecolor='white', alpha=0.8))

    ax.set_xlim(0, 9)
    ax.set_ylim(0, 8)
    ax.set_aspect('equal')
    ax.axis('off')
    ax.set_title('Triângulo 30°-60°-90° (Triângulo Notável)',
                 fontsize=18, fontweight='bold', pad=20)

    plt.tight_layout()
    plt.savefig(f'{output_dir}/triangulo-30-60-90.png', dpi=150, bbox_inches='tight',
                facecolor='white', edgecolor='none')
    plt.close()
    print("[OK] Imagem 4 criada: triangulo-30-60-90.png")

def criar_triangulo_45_45_90():
    """Imagem 5: Triângulo 45-45-90"""
    fig, ax = plt.subplots(figsize=(8, 8), facecolor='white')

    # Triângulo retângulo isósceles
    L = 4
    A = np.array([2, 2])
    B = np.array([2, 2 + L])
    C = np.array([2 + L, 2])

    # Desenhar triângulo
    ax.plot([A[0], B[0]], [A[1], B[1]], 'b-', linewidth=3, label='Cateto L')
    ax.plot([A[0], C[0]], [A[1], C[1]], 'b-', linewidth=3)
    ax.plot([B[0], C[0]], [B[1], C[1]], 'g-', linewidth=3.5, label='Hipotenusa L√2')

    # Preencher triângulo
    triangle = plt.Polygon([A, B, C], fill=True, facecolor='lightyellow',
                           alpha=0.3, edgecolor='black', linewidth=2)
    ax.add_patch(triangle)

    # Marcar ângulo reto em A
    square_size = 0.3
    square = patches.Rectangle((A[0], A[1]), square_size, square_size,
                                fill=False, edgecolor='black', linewidth=2)
    ax.add_patch(square)

    # Marcar ângulo de 45° em B
    angle_45_B = Arc((B[0], B[1]), 0.9, 0.9, angle=0, theta1=270, theta2=315,
                     color='purple', linewidth=2.5)
    ax.add_patch(angle_45_B)
    ax.text(B[0]+0.4, B[1]-0.5, '45°', fontsize=14, color='purple', fontweight='bold')

    # Marcar ângulo de 45° em C
    angle_45_C = Arc((C[0], C[1]), 0.9, 0.9, angle=0, theta1=135, theta2=180,
                     color='purple', linewidth=2.5)
    ax.add_patch(angle_45_C)
    ax.text(C[0]-0.7, C[1]+0.4, '45°', fontsize=14, color='purple', fontweight='bold')

    # Labels dos vértices
    ax.text(A[0]-0.4, A[1]-0.3, 'A', fontsize=16, fontweight='bold')
    ax.text(B[0]-0.4, B[1]+0.2, 'B', fontsize=16, fontweight='bold')
    ax.text(C[0]+0.2, C[1]-0.3, 'C', fontsize=16, fontweight='bold')

    # Marcas de lados iguais (catetos)
    mid_AB = (A + B) / 2
    ax.plot([mid_AB[0]-0.15, mid_AB[0]-0.15], [mid_AB[1]-0.1, mid_AB[1]+0.1],
            'k-', linewidth=2)
    ax.plot([mid_AB[0]-0.25, mid_AB[0]-0.25], [mid_AB[1]-0.1, mid_AB[1]+0.1],
            'k-', linewidth=2)

    mid_AC = (A + C) / 2
    ax.plot([mid_AC[0]-0.1, mid_AC[0]+0.1], [mid_AC[1]-0.35, mid_AC[1]-0.35],
            'k-', linewidth=2)
    ax.plot([mid_AC[0]-0.1, mid_AC[0]+0.1], [mid_AC[1]-0.45, mid_AC[1]-0.45],
            'k-', linewidth=2)

    # Labels dos lados
    ax.text((A[0]+B[0])/2 - 0.7, (A[1]+B[1])/2, f'L = {L}', fontsize=14,
            bbox=dict(boxstyle='round,pad=0.3', facecolor='lightblue', alpha=0.7))

    ax.text((A[0]+C[0])/2, (A[1]+C[1])/2 - 0.8, f'L = {L}', fontsize=14,
            bbox=dict(boxstyle='round,pad=0.3', facecolor='lightblue', alpha=0.7))

    ax.text((B[0]+C[0])/2 + 0.5, (B[1]+C[1])/2 + 0.3, f'L√2 = {L}√2', fontsize=14,
            bbox=dict(boxstyle='round,pad=0.3', facecolor='lightgreen', alpha=0.7))

    # Texto explicativo
    ax.text(1.5, 7.2, 'Triângulo 45-45-90', fontsize=15, fontweight='bold',
            bbox=dict(boxstyle='round,pad=0.5', facecolor='lightcyan', alpha=0.8))
    ax.text(1.5, 6.6, 'Triângulo retângulo isósceles', fontsize=12,
            bbox=dict(boxstyle='round,pad=0.4', facecolor='white', alpha=0.8))

    ax.set_xlim(0, 8)
    ax.set_ylim(0, 8)
    ax.set_aspect('equal')
    ax.axis('off')
    ax.set_title('Triângulo 45°-45°-90° (Triângulo Notável)',
                 fontsize=18, fontweight='bold', pad=20)

    plt.tight_layout()
    plt.savefig(f'{output_dir}/triangulo-45-45-90.png', dpi=150, bbox_inches='tight',
                facecolor='white', edgecolor='none')
    plt.close()
    print("[OK] Imagem 5 criada: triangulo-45-45-90.png")

def criar_relacoes_metricas():
    """Imagem 6: Relações métricas no triângulo retângulo"""
    fig, ax = plt.subplots(figsize=(10, 7), facecolor='white')

    # Coordenadas
    A = np.array([1.5, 1])
    B = np.array([1.5, 5])
    C = np.array([6.5, 1])

    # Ponto H (pé da altura)
    BC = C - B
    BA = A - B
    t = np.dot(BA, BC) / np.dot(BC, BC)
    H = B + t * BC

    # Desenhar triângulo principal
    ax.plot([A[0], B[0]], [A[1], B[1]], 'b-', linewidth=3, label='Cateto c')
    ax.plot([A[0], C[0]], [A[1], C[1]], 'b-', linewidth=3, label='Cateto b')
    ax.plot([B[0], C[0]], [B[1], C[1]], 'g-', linewidth=3.5, label='Hipotenusa a')

    # Desenhar altura
    ax.plot([A[0], H[0]], [A[1], H[1]], 'r-', linewidth=2.5, label='Altura h')

    # Preencher triângulo
    triangle = plt.Polygon([A, B, C], fill=True, facecolor='lavender',
                           alpha=0.2, edgecolor='black', linewidth=2)
    ax.add_patch(triangle)

    # Marcar ângulo reto em A
    square_size = 0.25
    square = patches.Rectangle((A[0], A[1]), square_size, square_size,
                                fill=False, edgecolor='black', linewidth=1.5)
    ax.add_patch(square)

    # Marcar ângulo reto em H
    vec_AH = H - A
    vec_perp = np.array([-vec_AH[1], vec_AH[0]])
    vec_perp = vec_perp / np.linalg.norm(vec_perp) * square_size
    vec_BC_unit = (C - B) / np.linalg.norm(C - B) * square_size
    perp_square_pts = [H, H + vec_perp, H + vec_perp + vec_BC_unit, H + vec_BC_unit]
    perp_square = plt.Polygon(perp_square_pts, fill=False, edgecolor='black', linewidth=1)
    ax.add_patch(perp_square)

    # Labels dos pontos
    ax.text(A[0]-0.3, A[1]-0.4, 'A', fontsize=16, fontweight='bold')
    ax.text(B[0]-0.4, B[1]+0.2, 'B', fontsize=16, fontweight='bold')
    ax.text(C[0]+0.2, C[1]-0.4, 'C', fontsize=16, fontweight='bold')
    ax.text(H[0], H[1]+0.4, 'H', fontsize=16, fontweight='bold', color='red')

    # Labels das medidas
    # Hipotenusa a
    ax.text((B[0]+C[0])/2 + 0.5, (B[1]+C[1])/2 + 0.3, 'a', fontsize=15, fontweight='bold',
            bbox=dict(boxstyle='round,pad=0.3', facecolor='lightgreen', alpha=0.7))

    # Cateto c (AB)
    ax.text((A[0]+B[0])/2 - 0.6, (A[1]+B[1])/2, 'c', fontsize=15, fontweight='bold',
            bbox=dict(boxstyle='round,pad=0.3', facecolor='lightblue', alpha=0.7))

    # Cateto b (AC)
    ax.text((A[0]+C[0])/2, (A[1]+C[1])/2 - 0.5, 'b', fontsize=15, fontweight='bold',
            bbox=dict(boxstyle='round,pad=0.3', facecolor='lightblue', alpha=0.7))

    # Altura h
    ax.text((A[0]+H[0])/2 + 0.3, (A[1]+H[1])/2 + 0.2, 'h', fontsize=15, fontweight='bold',
            color='red', bbox=dict(boxstyle='round,pad=0.3', facecolor='lightyellow', alpha=0.7))

    # Projeção m (BH)
    ax.text((B[0]+H[0])/2 - 0.5, (B[1]+H[1])/2 - 0.3, 'm', fontsize=14, color='blue',
            bbox=dict(boxstyle='round,pad=0.2', facecolor='lightcyan', alpha=0.7))

    # Projeção n (HC)
    ax.text((H[0]+C[0])/2 + 0.3, (H[1]+C[1])/2 - 0.3, 'n', fontsize=14, color='blue',
            bbox=dict(boxstyle='round,pad=0.2', facecolor='lightcyan', alpha=0.7))

    # Relações métricas (texto)
    relacoes_x = 8.5
    y_start = 5.5
    ax.text(relacoes_x, y_start, 'Relações Métricas:', fontsize=14, fontweight='bold')
    ax.text(relacoes_x, y_start - 0.7, r'$a \cdot h = b \cdot c$', fontsize=13,
            bbox=dict(boxstyle='round,pad=0.3', facecolor='lightcyan', alpha=0.6))
    ax.text(relacoes_x, y_start - 1.4, r'$c^2 = a \cdot m$', fontsize=13,
            bbox=dict(boxstyle='round,pad=0.3', facecolor='lightcyan', alpha=0.6))
    ax.text(relacoes_x, y_start - 2.1, r'$b^2 = a \cdot n$', fontsize=13,
            bbox=dict(boxstyle='round,pad=0.3', facecolor='lightcyan', alpha=0.6))
    ax.text(relacoes_x, y_start - 2.8, r'$h^2 = m \cdot n$', fontsize=13,
            bbox=dict(boxstyle='round,pad=0.3', facecolor='lightcyan', alpha=0.6))
    ax.text(relacoes_x, y_start - 3.5, r'$a = m + n$', fontsize=13,
            bbox=dict(boxstyle='round,pad=0.3', facecolor='lightcyan', alpha=0.6))

    ax.set_xlim(0, 12)
    ax.set_ylim(0, 6.5)
    ax.set_aspect('equal')
    ax.axis('off')
    ax.set_title('Relações Métricas no Triângulo Retângulo',
                 fontsize=18, fontweight='bold', pad=20)

    plt.tight_layout()
    plt.savefig(f'{output_dir}/relacoes-metricas.png', dpi=150, bbox_inches='tight',
                facecolor='white', edgecolor='none')
    plt.close()
    print("[OK] Imagem 6 criada: relacoes-metricas.png")

# Executar todas as funções
if __name__ == "__main__":
    print("Gerando imagens de Trigonometria...")
    print("=" * 50)

    criar_triangulo_retangulo()
    criar_pitagoras_demonstracao()
    criar_razoes_trigonometricas()
    criar_triangulo_30_60_90()
    criar_triangulo_45_45_90()
    criar_relacoes_metricas()

    print("=" * 50)
    print(f"[SUCESSO] Todas as 6 imagens foram criadas em: {output_dir}/")
    print("\nImagens geradas:")
    print("  1. triangulo-retangulo.png")
    print("  2. pitagoras-demonstracao.png")
    print("  3. razoes-trigonometricas.png")
    print("  4. triangulo-30-60-90.png")
    print("  5. triangulo-45-45-90.png")
    print("  6. relacoes-metricas.png")

#!/usr/bin/env python3
"""
Script para aplicar correções identificadas pelo agent-validator
Correções aplicadas:
1. Adicionar <meta charset="UTF-8"> se ausente
2. Substituir cores hard-coded por variáveis CSS
"""

import os
import re

def add_meta_charset(content):
    """Adiciona <meta charset='UTF-8'> se não existir"""
    # Verifica se já tem charset
    if '<meta charset' in content or 'charset="UTF-8"' in content:
        return content, False

    # Adiciona após <head> e antes de qualquer outra tag meta
    pattern = r'(<head>\s*\n)'
    replacement = r'\1  <meta charset="UTF-8">\n'

    new_content = re.sub(pattern, replacement, content, count=1)

    # Se não encontrou <head>, tentar outro padrão
    if new_content == content:
        pattern = r'(<head>)'
        replacement = r'\1\n  <meta charset="UTF-8">'
        new_content = re.sub(pattern, replacement, content, count=1)

    return new_content, (new_content != content)

def fix_hardcoded_colors(content):
    """Substitui cores hard-coded por variáveis CSS"""
    replacements = [
        ('border-left-color: #2196f3;', 'border-left-color: var(--teorema-color);'),
        ('border-left-color: #ff9800;', 'border-left-color: var(--observacao-color);'),
        ('color: #ffc107;', 'color: var(--dica-color);'),
        ('background-color: rgba(255, 193, 7, 0.15);', 'background-color: rgba(255, 193, 7, 0.15);'),  # Keep rgba
    ]

    modified = False
    for old, new in replacements:
        if old in content and old != new:
            content = content.replace(old, new)
            modified = True

    return content, modified

def process_html_file(file_path):
    """Processa um arquivo HTML aplicando todas as correções"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        original_content = content

        # Aplicar correções
        content, charset_added = add_meta_charset(content)
        content, colors_fixed = fix_hardcoded_colors(content)

        # Salvar se houve mudanças
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)

            print(f"[OK] Corrigido: {file_path}")
            if charset_added:
                print(f"     - Meta charset adicionado")
            if colors_fixed:
                print(f"     - Cores hard-coded substituidas")
            return True
        else:
            print(f"[--] Sem mudancas: {file_path}")
            return False

    except Exception as e:
        print(f"[ERRO] Ao processar {file_path}: {e}")
        return False

def main():
    """Processa todos os arquivos HTML em recursos/"""
    base_path = os.path.dirname(os.path.abspath(__file__))
    recursos_path = os.path.join(base_path, 'recursos')

    processed = 0
    modified = 0

    print("=" * 70)
    print("Iniciando correções em arquivos HTML...")
    print("=" * 70)
    print()

    # Percorrer todos os subdiretórios de recursos
    for root, dirs, files in os.walk(recursos_path):
        for file in files:
            if file.endswith('.html') and not file.startswith('TEMPLATE'):
                file_path = os.path.join(root, file)
                processed += 1

                if process_html_file(file_path):
                    modified += 1

                print()  # Linha em branco entre arquivos

    print("=" * 70)
    print(f"Processamento concluído!")
    print(f"Arquivos processados: {processed}")
    print(f"Arquivos modificados: {modified}")
    print(f"Arquivos sem mudanças: {processed - modified}")
    print("=" * 70)

if __name__ == '__main__':
    main()

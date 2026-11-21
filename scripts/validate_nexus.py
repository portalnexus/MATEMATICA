#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Validador Universal do Portal Nexus de Matemática
Verifica:
1. Integridade de arquivos JSON de dados e currículos
2. Integridade dos links internos em recursos.html e navegação
3. Presença de arquivos órfãos de link
4. Estrutura HTML essencial (charset, viewport, KaTeX, estilos)
"""

import os
import re
import json
import glob
import sys

def test_json_integrity(base_dir):
    errors = []
    data_dir = os.path.join(base_dir, 'data')
    json_files = glob.glob(os.path.join(data_dir, '*.json'))
    
    print(f"📁 Validando {len(json_files)} arquivos JSON...")
    for jf in json_files:
        try:
            with open(jf, 'r', encoding='utf-8') as f:
                data = json.load(f)
            fname = os.path.basename(jf)
            if fname.startswith('curriculum'):
                if 'curriculum' not in data:
                    errors.append(f"{fname}: falta chave 'curriculum'")
            elif fname == 'student-data.json':
                for sid, sdata in data.items():
                    if 'nome' not in sdata:
                        errors.append(f"{fname}: estudante {sid} sem 'nome'")
            elif fname == 'trofeus-disponiveis.json':
                if 'trofeus' not in data:
                    errors.append(f"{fname}: falta chave 'trofeus'")
        except Exception as e:
            errors.append(f"Erro ao ler {jf}: {e}")
            
    return errors

def test_link_integrity(base_dir):
    errors = []
    warnings = []
    
    recursos_path = os.path.join(base_dir, 'recursos.html')
    if not os.path.exists(recursos_path):
        return [f"Arquivo recursos.html não encontrado"], []
        
    with open(recursos_path, 'r', encoding='utf-8') as f:
        recursos_content = f.read()

    # Remover comentários HTML antes de extrair links
    recursos_limpo = re.sub(r'<!--.*?-->', '', recursos_content, flags=re.DOTALL)
    
    # Extrair todos os links de recursos
    links = re.findall(r'href=[\"\']\./(recursos/[^\"\']+)[\"\']', recursos_limpo)
    links += re.findall(r'href=[\"\'](recursos/[^\"\']+)[\"\']', recursos_limpo)
    links = sorted(list(set(links)))
    
    print(f"🔗 Validando {len(links)} links em recursos.html...")
    for link in links:
        full_path = os.path.join(base_dir, link)
        if not os.path.exists(full_path):
            errors.append(f"Link quebrado em recursos.html: {link}")
            
    # Verificar arquivos órfãos (arquivos em recursos/ que não estão linkados)
    recursos_dir = os.path.join(base_dir, 'recursos')
    disk_files = []
    for cat in ['resumos', 'listas', 'guias', 'recuperacao', 'ferramentas']:
        cat_dir = os.path.join(recursos_dir, cat)
        if os.path.exists(cat_dir):
            for h in glob.glob(os.path.join(cat_dir, '*.html')):
                rel = os.path.relpath(h, base_dir)
                disk_files.append(rel)
                
    unlinked = set(disk_files) - set(links)
    # Ignorar templates e scripts
    unlinked = [u for u in unlinked if 'TEMPLATE' not in u]
    if unlinked:
        for u in sorted(unlinked):
            warnings.append(f"Arquivo órfão (em disco mas não linkado em recursos.html): {u}")
            
    return errors, warnings

def test_html_standards(base_dir):
    errors = []
    recursos_dir = os.path.join(base_dir, 'recursos')
    html_files = glob.glob(os.path.join(recursos_dir, '**', '*.html'), recursive=True)
    
    print(f"📄 Validando padrões em {len(html_files)} arquivos HTML...")
    for hf in html_files:
        if 'TEMPLATE' in hf:
            continue
        try:
            with open(hf, 'r', encoding='utf-8') as f:
                content = f.read()
            rel = os.path.relpath(hf, base_dir)
            if '<meta charset="UTF-8">' not in content and "<meta charset='UTF-8'>" not in content:
                errors.append(f"{rel}: ausência de <meta charset='UTF-8'>")
            if 'katex.min.js' not in content and 'ferramentas' not in rel:
                errors.append(f"{rel}: ausência do script KaTeX")
            if 'viewport' not in content:
                errors.append(f"{rel}: ausência de meta viewport")
        except Exception as e:
            errors.append(f"Erro ao ler {hf}: {e}")
            
    return errors

def main():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    print("=" * 70)
    print("🌌 NEXUS QUALITY SUITE - VALIDAÇÃO COMPLETA DO PORTAL")
    print("=" * 70)
    
    json_errors = test_json_integrity(base_dir)
    link_errors, link_warnings = test_link_integrity(base_dir)
    html_errors = test_html_standards(base_dir)
    
    total_errors = len(json_errors) + len(link_errors) + len(html_errors)
    
    print("\n" + "=" * 70)
    print("📊 RESULTADOS DA AUDITORIA")
    print("=" * 70)
    
    if link_warnings:
        print(f"\n⚠️  AVISOS ({len(link_warnings)} arquivos órfãos para conectar):")
        for w in link_warnings:
            print(f"   {w}")
            
    if total_errors > 0:
        print(f"\n❌ ERROS ENCONTRADOS ({total_errors}):")
        for e in json_errors:
            print(f"   [JSON] {e}")
        for e in link_errors:
            print(f"   [LINK] {e}")
        for e in html_errors:
            print(f"   [HTML] {e}")
        print("\nStatus: ❌ FALHA NA VALIDAÇÃO")
        sys.exit(1)
    else:
        print("\n✅ TODAS AS VALIDAÇÕES CRÍTICAS PASSARAM COM SUCESSO!")
        print("Status: ✅ APROVADO")
        sys.exit(0)

if __name__ == '__main__':
    main()

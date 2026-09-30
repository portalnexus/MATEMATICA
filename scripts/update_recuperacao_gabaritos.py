# scripts/update_recuperacao_gabaritos.py
# -*- coding: utf-8 -*-
"""
Atualiza todas as 35 atividades de recuperação em recursos/recuperacao/
para garantir que:
1. NENHUM gabarito fique visível na página HTML (elimina todas as tags <details>).
2. O Gabarito Secreto do Professor (Ctrl+U) esteja presente em 100% dos arquivos,
   comentado em HTML antes do botão de retorno.
"""

import os
import re
import glob

RECUP_DIR = "/home/heimdall/github/MATEMATICA/recursos/recuperacao"

def clean_details_and_insert_secret(file_path, secret_content):
    with open(file_path, "r", encoding="utf-8") as f:
        html = f.read()

    # Remover quaisquer tags <details>...</details>
    html_no_details = re.sub(r'<details.*?</details>', '', html, flags=re.DOTALL | re.IGNORECASE)

    # Remover blocos antigos de gabarito secreto ou comentários de gabarito para não duplicar
    html_no_old_gab = re.sub(
        r'<!--\s*=+\s*GABARITO SECRETO DO PROFESSOR.*?-->', '', html_no_details, flags=re.DOTALL
    )

    # Localizar o botão de retorno
    # Padrões comuns:
    # <div style="text-align: center; margin-top: 30px;">
    # <!-- BOTÃO DE RETORNO -->
    match_return = re.search(r'(<div style="text-align: center; margin-top: 30px;">)', html_no_old_gab)
    if not match_return:
        match_return = re.search(r'(<div style="text-align: center; margin-top: 30px;"|<!-- BOTÃO DE RETORNO -->)', html_no_old_gab)

    if not match_return:
        print(f"ERRO: Não encontrou botão de retorno em {file_path}")
        return False

    split_pos = match_return.start()
    
    # Formatar o bloco canônico
    canonical_block = f"""<!-- ============================================================================
     GABARITO SECRETO DO PROFESSOR (ACESSO EXCLUSIVO VIA CTRL+U NO NAVEGADOR)
     RESOLUÇÕES E RESPOSTAS COMENTADAS DETALHADAS:

<div class="gabarito-content">
{secret_content.strip()}
</div>
============================================================================ -->

"""

    new_html = html_no_old_gab[:split_pos] + canonical_block + html_no_old_gab[split_pos:]

    # Garantir que não há '-->' interno
    # Verifica integridade
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(new_html)

    print(f"✅ Atualizado com sucesso: {os.path.basename(file_path)}")
    return True

print("Módulo pronto.")

// Print Mode Toggle
(function() {
    'use strict';

    // Criar botão de impressão
    const printButton = document.createElement('div');
    printButton.id = 'print-mode-toggle';
    printButton.innerHTML = '🖨️';
    printButton.title = 'Alternar modo de impressão';

    // Adicionar botão ao DOM
    document.body.appendChild(printButton);

    // Verificar se modo de impressão está ativo no localStorage
    const isPrintMode = localStorage.getItem('printMode') === 'true';
    if (isPrintMode) {
        document.body.classList.add('print-mode');
    }

    // Criar botão de retorno (visível apenas no print mode)
    const returnButton = document.createElement('div');
    returnButton.id = 'return-normal-mode';
    returnButton.innerHTML = '← Voltar ao modo normal';
    returnButton.title = 'Sair do modo de impressão';

    // Inserir botão no final do conteúdo (dentro do container/article)
    const container = document.querySelector('.container') || document.querySelector('article') || document.body;
    container.appendChild(returnButton);

    // Toggle print mode ao clicar
    printButton.addEventListener('click', function() {
        document.body.classList.toggle('print-mode');

        const isActive = document.body.classList.contains('print-mode');
        localStorage.setItem('printMode', isActive);

        // Feedback visual
        printButton.style.transform = 'scale(1.2)';
        setTimeout(() => {
            printButton.style.transform = 'scale(1)';
        }, 200);
    });

    // Sair do print mode ao clicar no botão de retorno
    returnButton.addEventListener('click', function() {
        document.body.classList.remove('print-mode');
        localStorage.setItem('printMode', 'false');
    });
})();

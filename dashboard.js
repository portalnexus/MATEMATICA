// Declaramos sharedTooltip como 'let' para que possa ser atribuída mais tarde.
// A inicialização real ocorrerá dentro do DOMContentLoaded.
let sharedTooltip; 

// --- Elementos do DOM ---
const idForm = document.getElementById('id-form');
const userDisplay = document.getElementById('user-display');
const idInput = document.getElementById('id-input');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const userNameSpan = document.getElementById('user-name');
const errorMessage = document.getElementById('error-message');
// sharedTooltip não é mais declarado aqui, será feito no DOMContentLoaded

// --- Funções Auxiliares ---

/**
 * Função reutilizável para gerenciar os tooltips
 * @param {HTMLElement} element O elemento que vai acionar o tooltip
 */
function attachTooltipEvents(element) {
    if (!element) {
        console.error("attachTooltipEvents: Elemento fornecido é nulo ou indefinido.");
        return;
    }
    console.log(`[Tooltip Debug] attachTooltipEvents chamada para:`, element);

    element.addEventListener('mouseover', (event) => {
        const tooltipText = event.currentTarget.getAttribute('data-tooltip');
        if (!tooltipText) {
            console.warn(`[Tooltip Debug] No data-tooltip attribute found for:`, event.currentTarget);
            return;
        }
        // Agora, sharedTooltip já deve ter sido inicializado dentro do DOMContentLoaded
        if (!sharedTooltip) {
            console.error("[Tooltip Debug] Shared tooltip element STILL not found in mouseover handler after DOMContentLoaded. This indicates a critical issue!");
            return;
        }

        console.log("[Tooltip Debug] Mouseover detectado em:", event.currentTarget, "Texto do Tooltip:", tooltipText);

        // 1. Define o texto e torna o tooltip temporariamente visível para obter as dimensões
        sharedTooltip.innerText = tooltipText; 
        sharedTooltip.classList.add('is-visible'); 
        
        // Agora que o tooltip está "visível" para o layout, podemos obter suas dimensões corretas.
        const targetRect = event.currentTarget.getBoundingClientRect();
        const tooltipRect = sharedTooltip.getBoundingClientRect();

        // Posiciona acima e centralizado em relação ao elemento alvo
        let left = targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2);
        let top = targetRect.top - tooltipRect.height - 5; // 5px de espaçamento

        // Ajustes para evitar que o tooltip saia da tela à esquerda ou direita
        if (left < 5) { 
            left = 5;
            console.log("[Tooltip Debug] Ajustando left para borda esquerda.");
        } else if (left + tooltipRect.width > window.innerWidth - 5) { 
            left = window.innerWidth - tooltipRect.width - 5;
            console.log("[Tooltip Debug] Ajustando left para borda direita.");
        }

        // Ajustes para evitar que o tooltip saia da tela acima
        if (top < 5) { 
            top = targetRect.bottom + 5;
            console.log("[Tooltip Debug] Ajustando top para abaixo do elemento.");
        }

        sharedTooltip.style.left = `${left}px`;
        sharedTooltip.style.top = `${top}px`;
        console.log(`[Tooltip Debug] Tooltip posicionado em: left=${left}px, top=${top}px. Dimensões do tooltip: w=${tooltipRect.width}, h=${tooltipRect.height}`);
    });

    element.addEventListener('mouseout', () => {
        if (!sharedTooltip) {
             console.error("[Tooltip Debug] Shared tooltip element STILL not found in mouseout handler after DOMContentLoaded. This indicates a critical issue!");
             return;
        }
        console.log("[Tooltip Debug] Mouseout detectado de:", element);
        sharedTooltip.classList.remove('is-visible');
    });
}

// --- Funções Principais ---
function preencherPainel(usuario, id) {
    console.log("[Dashboard Debug] preencherPainel chamado para:", id);

    // Exibe o nome do usuário e o botão de logout
    userNameSpan.innerText = usuario.nome;
    idForm.classList.add('hidden');
    userDisplay.classList.remove('hidden');

    document.getElementById('lvl').innerText = `${usuario.lvl}`;
    document.getElementById('avatar-img').src = `${id}.jpg`;
    
    // --- Lógica da Barra de Progresso ---
    if (typeof usuario.lvl === 'number' && usuario.lvl < 100) {
        const expAtual = usuario.exp;
        const expNivelAtual = getExpParaNivel(usuario.lvl);
        const expProximoNivel = getExpParaNivel(usuario.lvl + 1);
        const progressoNoNivel = expAtual - expNivelAtual;
        const totalParaProximo = expProximoNivel - expNivelAtual;
        const porcentagem = Math.min(100, (progressoNoNivel / totalParaProximo) * 100);
        setTimeout(() => {
            document.getElementById('progress-bar-fill').style.width = `${porcentagem}%`;
            document.getElementById('progress-bar-text').innerText = `${progressoNoNivel.toLocaleString()} / ${totalParaProximo.toLocaleString()} EXP`;
        }, 100);
    } else {
        document.getElementById('progress-bar-fill').style.width = '100%';
        document.getElementById('progress-bar-text').innerText = 'NÍVEL MÁXIMO';
    }

   // --- Preenchimento dos Troféus ---
    const areaTrofeus = document.getElementById('trofeus-area');
    areaTrofeus.innerHTML = '';
    usuario.trofeus.forEach((trofeu, index) => {
        const div = document.createElement('div');
        div.className = 'trofeu-box fade-in';
        div.innerText = trofeu.nome;
        div.setAttribute('data-tooltip', trofeu.descricao);
        div.style.animationDelay = `${index * 0.1}s`;
        attachTooltipEvents(div); // ATENÇÃO: Chame a função aqui
        areaTrofeus.appendChild(div);
    });
    console.log("[Dashboard Debug] Troféus preenchidos e eventos de tooltip anexados.");


    // --- Preenchimento das Missões ---
    const listaMissoes = document.getElementById('lista-missoes');
    listaMissoes.innerHTML = '';
    usuario.missoes.forEach((missao, index) => {
        const li = document.createElement('li');
        li.innerText = missao.nome;
        li.setAttribute('data-tooltip', missao.descricao);
        li.className = 'fade-in';
        li.style.animationDelay = `${index * 0.1}s`;
        attachTooltipEvents(li); // ATENÇÃO: Chame a função aqui
        listaMissoes.appendChild(li);
    });
    console.log("[Dashboard Debug] Missões preenchidas e eventos de tooltip anexados.");
    
    // --- Gráfico de Notas e Cálculo da Média ---
    const media = usuario.notas.reduce((acc, nota) => acc + nota, 0) / usuario.notas.length;
    document.getElementById('media-notas').innerText = media.toFixed(1);

    const graficoNotas = document.getElementById('notas-grafico');
    const rotulosNotas = ["MDA", "MDEP", "NIF", "NAAG", "PORT"];
    graficoNotas.innerHTML = '';
    usuario.notas.forEach((nota, index) => {
        const coluna = document.createElement('div');
        coluna.className = 'nota-coluna';
        const barra = document.createElement('div');
        barra.className = 'bar';
        barra.setAttribute('data-tooltip', `Nota: ${nota.toFixed(1)}`);
        const rotulo = document.createElement('span');
        rotulo.className = 'nota-rotulo';
        rotulo.innerText = rotulosNotas[index] || 'N/A';
        setTimeout(() => { barra.style.height = `${nota * 10}%`; }, 100 * (index + 1));
        
        attachTooltipEvents(barra); // ATENÇÃO: Chame a função aqui
        
        coluna.appendChild(barra);
        coluna.appendChild(rotulo);
        graficoNotas.appendChild(coluna);
    });
    console.log("[Dashboard Debug] Gráfico de notas preenchido e eventos de tooltip anexados.");

    // --- Menções Honrosas ---
    const areaMencoes = document.getElementById('mencoes');
    areaMencoes.innerHTML = 'MENÇÕES';
    usuario.mencoes.forEach(mencao => {
        const span = document.createElement('span');
        span.className = 'mencao-item';
        span.innerText = mencao.nome;
        span.setAttribute('data-tooltip', mencao.descricao);
        attachTooltipEvents(span); // ATENÇÃO: Chame a função aqui
        areaMencoes.appendChild(span);
    });
    console.log("[Dashboard Debug] Menções preenchidas e eventos de tooltip anexados.");
}

function limparPainel() {
    console.log("[Dashboard Debug] limparPainel chamado.");
    idInput.value = '';
    userDisplay.classList.add('hidden');
    idForm.classList.remove('hidden');

    document.getElementById('lvl').innerText = 'LVL';
    document.getElementById('avatar-img').src = 'default_avatar.png';
    document.getElementById('trofeus-area').innerHTML = '';
    document.getElementById('lista-missoes').innerHTML = '';
    document.getElementById('notas-grafico').innerHTML = '';
    document.getElementById('media-notas').innerText = '0.0';
    document.getElementById('mencoes').innerHTML = 'MENÇÕES';
    document.getElementById('progress-bar-fill').style.width = '0%';
    document.getElementById('progress-bar-text').innerText = '0 / 0 EXP';
    if (sharedTooltip) {
        sharedTooltip.classList.remove('is-visible'); // Garante que o tooltip seja escondido ao limpar o painel
    }
}

function exibirErro(mensagem) {
    console.error("[Dashboard Debug] Erro exibido:", mensagem);
    errorMessage.innerText = mensagem;
    setTimeout(() => { errorMessage.innerText = ''; }, 3000);
}

function buscarUsuario() {
    const inputId = idInput.value.toUpperCase();
    errorMessage.innerText = '';
    console.log("[Dashboard Debug] Tentando buscar usuário com ID:", inputId);

    if (!inputId) {
        exibirErro("Insira um ID.");
        return;
    }

    const formatoEstudante = /^[A-Z]{2}\d{3}$/;
    const idProfessor = "PR0F1";

    if (inputId === idProfessor || formatoEstudante.test(inputId)) {
        const usuario = dadosUsuarios[inputId];
        if (usuario) {
            preencherPainel(usuario, inputId);
            console.log("[Dashboard Debug] Usuário encontrado e painel preenchido.");
        } else {
            exibirErro("ID não encontrado.");
        }
    } else {
        exibirErro("Formato de ID inválido.");
    }
}

// --- Event Listeners ---
loginBtn.addEventListener('click', buscarUsuario);
idInput.addEventListener('keyup', (event) => {
    if (event.key === "Enter") {
        buscarUsuario();
    }
});
logoutBtn.addEventListener('click', limparPainel);

// --- Inicialização ---
document.addEventListener('DOMContentLoaded', () => {
    console.log("[Dashboard Debug] DOMContentLoaded disparado.");
    
    // ATENÇÃO: Inicializamos sharedTooltip AQUI, garantindo que o elemento HTML já existe.
    sharedTooltip = document.getElementById('shared-tooltip'); 

    if (!sharedTooltip) {
        console.error("[Dashboard Debug] ERRO CRÍTICO: O elemento #shared-tooltip NÃO foi encontrado no DOM mesmo após DOMContentLoaded! Verifique seu HTML.");
    } else {
        console.log("[Dashboard Debug] O elemento #shared-tooltip foi encontrado no DOM.");
    }
    limparPainel(); 
});
// Tabela de Experiência Progressiva
const getExpParaNivel = (nivel) => {
    if (nivel <= 1) return 0;
    return Math.floor(100 * Math.pow(nivel - 1, 1.5));
};

// Declaramos sharedTooltip como 'let' para que possa ser atribuída mais tarde.
let sharedTooltip;

// --- Elementos do DOM ---
const idForm = document.getElementById('id-form');
const userDisplay = document.getElementById('user-display');
const idInput = document.getElementById('id-input');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const userNameSpan = document.getElementById('user-name');
const errorMessage = document.getElementById('error-message');
const etapaBtns = document.querySelectorAll('.etapa-btn');

// --- Variáveis de Dados ---
let dadosUsuarios = null;
let usuarioAtual = null;
let idAtual = null;
let etapaAtual = '1';

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

    element.addEventListener('mouseover', (event) => {
        const tooltipText = event.currentTarget.getAttribute('data-tooltip');
        if (!tooltipText) return;

        if (!sharedTooltip) return;

        sharedTooltip.innerText = tooltipText;
        sharedTooltip.classList.add('is-visible');

        const targetRect = event.currentTarget.getBoundingClientRect();
        const tooltipRect = sharedTooltip.getBoundingClientRect();

        let left = targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2);
        let top = targetRect.top - tooltipRect.height - 5;

        if (left < 5) left = 5;
        if (left + tooltipRect.width > window.innerWidth - 5) {
            left = window.innerWidth - tooltipRect.width - 5;
        }
        if (top < 5) top = targetRect.bottom + 5;

        sharedTooltip.style.left = `${left}px`;
        sharedTooltip.style.top = `${top}px`;
    });

    element.addEventListener('mouseout', () => {
        if (!sharedTooltip) return;
        sharedTooltip.classList.remove('is-visible');
    });
}

// --- Funções Principais ---

/**
 * Carrega os dados dos usuários do arquivo JSON de forma assíncrona.
 */
async function carregarDadosDeUsuario() {
    if (dadosUsuarios) return;

    try {
        const response = await fetch('data/student-data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        dadosUsuarios = await response.json();
        console.log("[Dashboard Debug] Dados de usuário carregados com sucesso.");
    } catch (error) {
        console.error("[Dashboard Debug] Falha ao carregar dados de usuário:", error);
        exibirErro("Falha ao carregar dados. Tente novamente mais tarde.");
    }
}

/**
 * Preenche o painel do dashboard com os dados do usuário para uma etapa específica.
 * @param {object} usuario O objeto de dados do usuário.
 * @param {string} id O ID do usuário.
 * @param {string} etapa A etapa a ser exibida (ex: "1", "2", "3").
 */
function preencherPainel(usuario, id, etapa) {
    // --- Preenchimento Estático (não muda com a etapa) ---
    if (etapa === '1') { // Preenche apenas na primeira carga
        userNameSpan.innerText = usuario.nome;
        idForm.classList.add('hidden');
        userDisplay.classList.remove('hidden');

        document.getElementById('lvl').innerText = `${usuario.lvl}`;
        document.getElementById('avatar-img').src = `${id}.jpg`;

        if (typeof usuario.lvl === 'number' && usuario.lvl < 100) {
            const expNivelAtual = getExpParaNivel(usuario.lvl);
            const expProximoNivel = getExpParaNivel(usuario.lvl + 1);
            const progressoNoNivel = usuario.exp - expNivelAtual;
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

        const areaTrofeus = document.getElementById('trofeus-area');
        areaTrofeus.innerHTML = '';
        usuario.trofeus.forEach((trofeu, index) => {
            const div = document.createElement('div');
            div.className = 'trofeu-box fade-in';
            div.innerText = trofeu.nome;
            div.setAttribute('data-tooltip', trofeu.descricao);
            div.style.animationDelay = `${index * 0.1}s`;
            attachTooltipEvents(div);
            areaTrofeus.appendChild(div);
        });

        const areaMencoes = document.getElementById('mencoes');
        areaMencoes.innerHTML = 'MENÇÕES';
        usuario.mencoes.forEach(mencao => {
            const span = document.createElement('span');
            span.className = 'mencao-item';
            span.innerText = mencao.nome;
            span.setAttribute('data-tooltip', mencao.descricao);
            attachTooltipEvents(span);
            areaMencoes.appendChild(span);
        });
    }

    // --- Preenchimento Dinâmico (muda com a etapa) ---
    const dadosEtapa = usuario.etapas[etapa];
    if (!dadosEtapa) {
        console.error(`[Dashboard Debug] Dados para a etapa ${etapa} não encontrados para o usuário ${id}.`);
        return;
    }

    const listaMissoes = document.getElementById('lista-missoes');
    listaMissoes.innerHTML = '';
    if (dadosEtapa.missoes && dadosEtapa.missoes.length > 0) {
        dadosEtapa.missoes.forEach((missao, index) => {
            const li = document.createElement('li');
            li.innerText = missao.nome;
            li.setAttribute('data-tooltip', missao.descricao);
            li.className = 'fade-in';
            li.style.animationDelay = `${index * 0.1}s`;
            attachTooltipEvents(li);
            listaMissoes.appendChild(li);
        });
    } else {
        listaMissoes.innerHTML = '<li>Nenhuma missão nesta etapa.</li>';
    }

    const media = dadosEtapa.notas.reduce((acc, nota) => acc + nota, 0) / dadosEtapa.notas.length;
    document.getElementById('media-notas').innerText = isNaN(media) ? 'N/A' : media.toFixed(1);

    const graficoNotas = document.getElementById('notas-grafico');
    const rotulosNotas = ["MDA", "MDEP", "NIF", "NAAG", "PORT"];
    graficoNotas.innerHTML = '';
    dadosEtapa.notas.forEach((nota, index) => {
        const coluna = document.createElement('div');
        coluna.className = 'nota-coluna';
        const barra = document.createElement('div');
        barra.className = 'bar';
        barra.setAttribute('data-tooltip', `Nota: ${nota.toFixed(1)}`);
        const rotulo = document.createElement('span');
        rotulo.className = 'nota-rotulo';
        rotulo.innerText = rotulosNotas[index] || 'N/A';
        setTimeout(() => { barra.style.height = `${nota * 10}%`; }, 100 * (index + 1));

        attachTooltipEvents(barra);
        coluna.appendChild(barra);
        coluna.appendChild(rotulo);
        graficoNotas.appendChild(coluna);
    });

    console.log(`[Dashboard Debug] Painel preenchido para o usuário: ${id}, Etapa: ${etapa}`);
}

/**
 * Limpa o painel do dashboard, redefinindo para o estado inicial.
 */
function limparPainel() {
    idInput.value = '';
    userDisplay.classList.add('hidden');
    idForm.classList.remove('hidden');

    usuarioAtual = null;
    idAtual = null;
    etapaAtual = '1';

    etapaBtns.forEach(btn => btn.classList.remove('active'));
    document.querySelector('.etapa-btn[data-etapa="1"]').classList.add('active');

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
        sharedTooltip.classList.remove('is-visible');
    }
    console.log("[Dashboard Debug] Painel limpo.");
}

/**
 * Exibe uma mensagem de erro temporária para o usuário.
 * @param {string} mensagem A mensagem de erro a ser exibida.
 */
function exibirErro(mensagem) {
    console.error("[Dashboard Debug] Erro:", mensagem);
    errorMessage.innerText = mensagem;
    setTimeout(() => { errorMessage.innerText = ''; }, 3000);
}

/**
 * Busca o usuário com base no ID inserido, carregando os dados se necessário.
 */
async function buscarUsuario() {
    errorMessage.innerText = '';
    const inputId = idInput.value.toUpperCase();

    if (!inputId) {
        exibirErro("Insira um ID.");
        return;
    }

    await carregarDadosDeUsuario();
    if (!dadosUsuarios) return;

    const formatoEstudante = /^[A-Z]{2}\d{3}$/;
    const idProfessor = "PR0F1";

    if (inputId === idProfessor || formatoEstudante.test(inputId)) {
        const usuario = dadosUsuarios[inputId];
        if (usuario) {
            usuarioAtual = usuario;
            idAtual = inputId;
            etapaAtual = '1'; // Reseta para a etapa 1 ao logar
            preencherPainel(usuario, inputId, etapaAtual);
        } else {
            exibirErro("ID não encontrado.");
        }
    } else {
        exibirErro("Formato de ID inválido.");
    }
}

/**
 * Muda a etapa exibida no painel.
 * @param {string} novaEtapa A nova etapa a ser exibida.
 */
function mudarEtapa(novaEtapa) {
    if (novaEtapa === etapaAtual || !usuarioAtual) return;

    etapaAtual = novaEtapa;

    // Atualiza o botão ativo
    etapaBtns.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-etapa') === novaEtapa);
    });

    // Re-renderiza o painel com os dados da nova etapa
    preencherPainel(usuarioAtual, idAtual, etapaAtual);
}


// --- Event Listeners ---
loginBtn.addEventListener('click', buscarUsuario);
idInput.addEventListener('keyup', (event) => {
    if (event.key === "Enter") {
        buscarUsuario();
    }
});
logoutBtn.addEventListener('click', limparPainel);
etapaBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        mudarEtapa(btn.getAttribute('data-etapa'));
    });
});

// --- Inicialização ---
document.addEventListener('DOMContentLoaded', () => {
    sharedTooltip = document.getElementById('shared-tooltip');
    if (!sharedTooltip) {
        console.error("ERRO CRÍTICO: #shared-tooltip não encontrado.");
    }
    limparPainel();
});
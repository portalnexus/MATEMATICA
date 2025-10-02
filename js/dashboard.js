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
let trofeusDisponiveis = null;
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
 * Carrega os troféus disponíveis do arquivo JSON
 */
async function carregarTrofeusDisponiveis() {
    if (trofeusDisponiveis) return;

    try {
        const response = await fetch('data/trofeus-disponiveis.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        trofeusDisponiveis = data.trofeus;
        console.log("[Dashboard Debug] Troféus disponíveis carregados com sucesso.");
    } catch (error) {
        console.error("[Dashboard Debug] Falha ao carregar troféus disponíveis:", error);
    }
}

/**
 * Calcula estatísticas gerais do usuário
 */
function calcularEstatisticas(usuario) {
    let totalMissoes = 0;
    let missoesCompletadas = 0;
    let somaMedias = 0;

    Object.values(usuario.etapas).forEach(etapa => {
        totalMissoes += etapa.missoes.length;
        missoesCompletadas += etapa.missoes.filter(m => m.completada).length;
        const media = etapa.notas.reduce((a, b) => a + b, 0) / etapa.notas.length;
        somaMedias += media;
    });

    const mediaGeral = somaMedias / 3;

    return {
        totalMissoes,
        missoesCompletadas,
        mediaGeral,
        totalTrofeus: usuario.trofeus.length
    };
}

/**
 * Verifica se o usuário cumpre a condição para um troféu
 */
function verificarCondicaoTrofeu(usuario, trofeu) {
    const stats = calcularEstatisticas(usuario);

    switch (trofeu.condicao.tipo) {
        case 'missoes_completadas':
            return {
                cumprida: stats.missoesCompletadas >= trofeu.condicao.valor,
                progresso: stats.missoesCompletadas,
                total: trofeu.condicao.valor
            };
        case 'media_geral':
            return {
                cumprida: stats.mediaGeral >= trofeu.condicao.valor,
                progresso: stats.mediaGeral.toFixed(1),
                total: trofeu.condicao.valor
            };
        case 'nivel':
            return {
                cumprida: usuario.lvl >= trofeu.condicao.valor,
                progresso: usuario.lvl,
                total: trofeu.condicao.valor
            };
        case 'exp_total':
            return {
                cumprida: usuario.exp >= trofeu.condicao.valor,
                progresso: usuario.exp,
                total: trofeu.condicao.valor
            };
        case 'manual':
            return { cumprida: false, progresso: 0, total: 1 };
        default:
            return { cumprida: false, progresso: 0, total: 1 };
    }
}

/**
 * Renderiza troféus bloqueados/próximas conquistas
 */
function renderizarTrofeusBloqueados(usuario) {
    if (!trofeusDisponiveis) return;

    const trofeusConquistadosIds = usuario.trofeus.map(t => t.nome.toLowerCase().replace(/\s+/g, '-'));

    const proximos = trofeusDisponiveis
        .filter(t => !trofeusConquistadosIds.includes(t.id))
        .map(t => ({
            ...t,
            resultado: verificarCondicaoTrofeu(usuario, t)
        }))
        .filter(t => !t.resultado.cumprida) // Apenas não conquistados
        .sort((a, b) => {
            // Ordenar por proximidade de conquista
            const progressoA = a.resultado.progresso / a.resultado.total;
            const progressoB = b.resultado.progresso / b.resultado.total;
            return progressoB - progressoA;
        })
        .slice(0, 5); // Mostrar apenas os 5 mais próximos

    const container = document.getElementById('trofeus-bloqueados-grid');
    container.innerHTML = '';

    proximos.forEach((trofeu, index) => {
        const div = document.createElement('div');
        div.className = `trofeu-bloqueado raridade-${trofeu.raridade} fade-in`;
        div.style.animationDelay = `${index * 0.1}s`;

        const porcentagem = Math.min(100, (trofeu.resultado.progresso / trofeu.resultado.total) * 100);

        div.innerHTML = `
            🔒 ${trofeu.nome}
            <span class="trofeu-categoria">${trofeu.categoria}</span>
            <span class="trofeu-progresso">${trofeu.resultado.progresso}/${trofeu.resultado.total} (${Math.round(porcentagem)}%)</span>
        `;
        div.setAttribute('data-tooltip', trofeu.descricao);
        attachTooltipEvents(div);
        container.appendChild(div);
    });
}

/**
 * Desenha o gráfico de evolução de notas
 */
function desenharGraficoEvolucao(usuario) {
    const canvas = document.getElementById('evolucao-grafico');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = 100;

    ctx.clearRect(0, 0, width, height);

    const medias = ['1', '2', '3'].map(etapa => {
        const notas = usuario.etapas[etapa].notas;
        return notas.reduce((a, b) => a + b, 0) / notas.length;
    });

    const max = 10;
    const min = 0;
    const padding = 20;
    const graphHeight = height - padding * 2;
    const graphWidth = width - padding * 2;

    // Desenhar linhas de grade
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--secondary-text-color').trim();
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 5; i++) {
        const y = padding + (graphHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }

    // Desenhar linha de evolução
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--link-color').trim();
    ctx.lineWidth = 2;
    ctx.beginPath();

    medias.forEach((media, index) => {
        const x = padding + (graphWidth / 2) * index;
        const y = height - padding - ((media - min) / (max - min)) * graphHeight;

        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }

        // Desenhar ponto
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--link-color').trim();
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
    });

    ctx.stroke();
}

/**
 * Renderiza o dashboard específico do professor
 */
function renderizarDashboardProfessor() {
    // Ocultar áreas padrão e mostrar área do professor
    document.getElementById('missoes-area').classList.add('hidden');
    document.getElementById('sidebar-area').classList.add('hidden');
    document.getElementById('trofeus-area').classList.add('hidden');
    document.getElementById('estatisticas-area').classList.add('hidden');
    document.getElementById('professor-dashboard').classList.remove('hidden');

    // Calcular estatísticas agregadas
    const alunos = Object.entries(dadosUsuarios)
        .filter(([id]) => id !== 'PR0F1')
        .map(([id, dados]) => {
            const stats = calcularEstatisticas(dados);
            return { id, nome: dados.nome, ...stats, nivel: dados.lvl, exp: dados.exp };
        });

    // Estatísticas gerais da turma
    const totalAlunos = alunos.length;
    const mediaGeralTurma = alunos.reduce((acc, a) => acc + a.mediaGeral, 0) / totalAlunos;
    const totalMissoesCompletadas = alunos.reduce((acc, a) => acc + a.missoesCompletadas, 0);
    const totalMissoes = alunos.reduce((acc, a) => acc + a.totalMissoes, 0);

    const statsGrid = document.getElementById('professor-stats-grid');
    statsGrid.innerHTML = `
        <div class="stat-item">
            <span class="stat-value">${totalAlunos}</span>
            <span class="stat-label">ALUNOS</span>
        </div>
        <div class="stat-item">
            <span class="stat-value">${mediaGeralTurma.toFixed(1)}</span>
            <span class="stat-label">MÉDIA DA TURMA</span>
        </div>
        <div class="stat-item">
            <span class="stat-value">${totalMissoesCompletadas}/${totalMissoes}</span>
            <span class="stat-label">MISSÕES TOTAL</span>
        </div>
        <div class="stat-item">
            <span class="stat-value">${Math.round((totalMissoesCompletadas/totalMissoes)*100)}%</span>
            <span class="stat-label">TAXA CONCLUSÃO</span>
        </div>
    `;

    // Ranking de desempenho
    const alunosOrdenados = [...alunos].sort((a, b) => b.mediaGeral - a.mediaGeral);
    const rankingTbody = document.getElementById('ranking-tbody');
    rankingTbody.innerHTML = '';

    alunosOrdenados.forEach((aluno, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index + 1}º</td>
            <td>${aluno.nome}</td>
            <td>${aluno.mediaGeral.toFixed(1)}</td>
            <td>${aluno.missoesCompletadas}/${aluno.totalMissoes}</td>
            <td>Nv. ${aluno.nivel}</td>
        `;
        rankingTbody.appendChild(tr);
    });

    // Alertas de alunos com dificuldades
    const alertasList = document.getElementById('alertas-list');
    alertasList.innerHTML = '';

    alunos.forEach(aluno => {
        if (aluno.mediaGeral < 6.0) {
            const li = document.createElement('li');
            li.innerText = `${aluno.nome} - Média abaixo de 6.0 (${aluno.mediaGeral.toFixed(1)})`;
            alertasList.appendChild(li);
        }

        const taxaConclusao = (aluno.missoesCompletadas / aluno.totalMissoes) * 100;
        if (taxaConclusao < 50) {
            const li = document.createElement('li');
            li.innerText = `${aluno.nome} - Menos de 50% das missões completadas (${Math.round(taxaConclusao)}%)`;
            alertasList.appendChild(li);
        }
    });

    if (alertasList.children.length === 0) {
        alertasList.innerHTML = '<li style="background-color: rgba(76,175,80,0.2); border-left-color: #4caf50;">Nenhum alerta no momento ✓</li>';
    }
}

/**
 * Preenche o painel do dashboard com os dados do usuário para uma etapa específica.
 * @param {object} usuario O objeto de dados do usuário.
 * @param {string} id O ID do usuário.
 * @param {string} etapa A etapa a ser exibida (ex: "1", "2", "3").
 */
function preencherPainel(usuario, id, etapa) {
    // Se for professor, renderizar dashboard específico
    if (id === 'PR0F1') {
        renderizarDashboardProfessor();
        return;
    }

    // --- Preenchimento Estático (não muda com a etapa) ---
    if (etapa === '1') { // Preenche apenas na primeira carga
        userNameSpan.innerText = usuario.nome;
        idForm.classList.add('hidden');
        userDisplay.classList.remove('hidden');

        document.getElementById('lvl').innerText = `${usuario.lvl}`;
        document.getElementById('avatar-img').src = `data/avatar/${id}.jpg`;

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

        // Estatísticas gerais
        const stats = calcularEstatisticas(usuario);
        document.getElementById('stat-total-xp').innerText = usuario.exp.toLocaleString();
        document.getElementById('stat-missoes').innerText = `${stats.missoesCompletadas}/${stats.totalMissoes}`;
        document.getElementById('stat-media-geral').innerText = stats.mediaGeral.toFixed(1);
        document.getElementById('stat-trofeus').innerText = stats.totalTrofeus;

        const areaTrofeusConquistados = document.getElementById('trofeus-conquistados');
        areaTrofeusConquistados.innerHTML = '';
        usuario.trofeus.forEach((trofeu, index) => {
            const div = document.createElement('div');
            div.className = `trofeu-box fade-in raridade-${trofeu.raridade || 'comum'}`;
            div.innerHTML = `${trofeu.nome}<span class="trofeu-categoria">${trofeu.categoria || ''}</span>`;
            div.setAttribute('data-tooltip', trofeu.descricao);
            div.style.animationDelay = `${index * 0.1}s`;
            attachTooltipEvents(div);
            areaTrofeusConquistados.appendChild(div);
        });

        // Renderizar troféus bloqueados
        renderizarTrofeusBloqueados(usuario);

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

        // Desenhar gráfico de evolução
        setTimeout(() => desenharGraficoEvolucao(usuario), 200);

        // Adicionar tooltips na legenda de disciplinas
        document.querySelectorAll('#legenda-disciplinas span').forEach(span => {
            attachTooltipEvents(span);
        });

        // Atualizar botões de etapa com informações
        atualizarBotoesEtapa(usuario);
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
            li.className = 'missao-item fade-in';
            li.style.animationDelay = `${index * 0.1}s`;

            const missaoInfo = document.createElement('div');
            missaoInfo.className = 'missao-info';

            const missaoNome = document.createElement('span');
            missaoNome.className = 'missao-nome';
            missaoNome.innerText = missao.nome;

            const missaoTipo = document.createElement('span');
            missaoTipo.className = `missao-tipo missao-tipo-${missao.tipo || 'obrigatoria'}`;
            missaoTipo.innerText = `[${missao.tipo || 'obrigatoria'}]`;

            missaoInfo.appendChild(missaoNome);
            missaoInfo.appendChild(missaoTipo);

            const missaoXP = document.createElement('span');
            missaoXP.className = 'missao-xp';
            missaoXP.innerText = `+${missao.xp || 0} XP`;

            const missaoStatus = document.createElement('span');
            missaoStatus.className = `missao-status ${missao.completada ? 'completada' : 'pendente'}`;
            missaoStatus.innerText = missao.completada ? '✓' : '○';

            li.appendChild(missaoInfo);
            li.appendChild(missaoXP);
            li.appendChild(missaoStatus);
            li.setAttribute('data-tooltip', missao.descricao);
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

    // Mostrar áreas padrão e ocultar dashboard do professor
    document.getElementById('missoes-area').classList.remove('hidden');
    document.getElementById('sidebar-area').classList.remove('hidden');
    document.getElementById('trofeus-area').classList.remove('hidden');
    document.getElementById('estatisticas-area').classList.remove('hidden');
    document.getElementById('professor-dashboard').classList.add('hidden');

    etapaBtns.forEach(btn => {
        btn.classList.remove('active');
        // Limpar informações dos botões de etapa
        const infoDiv = btn.querySelector('.etapa-info');
        if (infoDiv) {
            infoDiv.remove();
        }
    });
    document.querySelector('.etapa-btn[data-etapa="1"]').classList.add('active');

    document.getElementById('lvl').innerText = 'LVL';
    document.getElementById('avatar-img').src = 'data/avatar/default_avatar.png';
    document.getElementById('trofeus-conquistados').innerHTML = '';
    document.getElementById('trofeus-bloqueados-grid').innerHTML = '';
    document.getElementById('lista-missoes').innerHTML = '';
    document.getElementById('notas-grafico').innerHTML = '';
    document.getElementById('media-notas').innerText = '0.0';
    document.getElementById('mencoes').innerHTML = 'MENÇÕES';
    document.getElementById('progress-bar-fill').style.width = '0%';
    document.getElementById('progress-bar-text').innerText = '0 / 0 EXP';

    // Limpar estatísticas
    document.getElementById('stat-total-xp').innerText = '0';
    document.getElementById('stat-missoes').innerText = '0/0';
    document.getElementById('stat-media-geral').innerText = '0.0';
    document.getElementById('stat-trofeus').innerText = '0';

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
    await carregarTrofeusDisponiveis();
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
 * Atualiza os botões de etapa com informações adicionais
 */
function atualizarBotoesEtapa(usuario) {
    etapaBtns.forEach(btn => {
        const etapaNum = btn.getAttribute('data-etapa');
        const dadosEtapa = usuario.etapas[etapaNum];

        if (!dadosEtapa) return;

        const media = dadosEtapa.notas.reduce((a, b) => a + b, 0) / dadosEtapa.notas.length;
        const totalMissoes = dadosEtapa.missoes.length;
        const missoesCompletadas = dadosEtapa.missoes.filter(m => m.completada).length;
        const todasCompletadas = missoesCompletadas === totalMissoes;

        // Determinar status visual
        let statusIcon = '⚡'; // Em andamento (padrão)
        if (todasCompletadas) {
            statusIcon = '✓'; // Concluída
        } else if (parseInt(etapaNum) > parseInt(etapaAtual) && missoesCompletadas === 0) {
            statusIcon = '🔒'; // Futura/bloqueada
        }

        // Criar estrutura de informações
        let infoDiv = btn.querySelector('.etapa-info');
        if (!infoDiv) {
            infoDiv = document.createElement('div');
            infoDiv.className = 'etapa-info';
            btn.appendChild(infoDiv);
        }

        infoDiv.innerHTML = `
            <span class="etapa-media">Média: ${media.toFixed(1)}</span>
            <span class="etapa-missoes-count">${missoesCompletadas}/${totalMissoes} missões</span>
            <span class="etapa-status-icon">${statusIcon}</span>
        `;
    });
}

/**
 * Muda a etapa exibida no painel.
 * @param {string} novaEtapa A nova etapa a ser exibida.
 */
function mudarEtapa(novaEtapa) {
    if (novaEtapa === etapaAtual || !usuarioAtual) return;

    // Animação de fade-out
    const missoesArea = document.getElementById('missoes-area');
    const notasGrafico = document.getElementById('notas-grafico');

    missoesArea.style.opacity = '0';
    notasGrafico.style.opacity = '0';

    setTimeout(() => {
        etapaAtual = novaEtapa;

        // Atualiza o botão ativo
        etapaBtns.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-etapa') === novaEtapa);
        });

        // Re-renderiza o painel com os dados da nova etapa
        preencherPainel(usuarioAtual, idAtual, etapaAtual);

        // Atualiza informações dos botões de etapa
        atualizarBotoesEtapa(usuarioAtual);

        // Animação de fade-in
        missoesArea.style.transition = 'opacity 0.3s';
        notasGrafico.style.transition = 'opacity 0.3s';
        missoesArea.style.opacity = '1';
        notasGrafico.style.opacity = '1';
    }, 300);
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
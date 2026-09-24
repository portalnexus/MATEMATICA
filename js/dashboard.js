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
 * Desenha o gráfico de evolução de notas (tendência histórica entre Etapas)
 */
function desenharGraficoEvolucao(usuario) {
    const canvas = document.getElementById('evolucao-grafico');
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width || canvas.parentElement?.clientWidth || 300;
    const height = 110;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    const etapasLabels = ['Etapa I', 'Etapa II', 'Etapa III'];
    const medias = ['1', '2', '3'].map(etapa => {
        if (!usuario.etapas || !usuario.etapas[etapa] || !usuario.etapas[etapa].notas) return 0;
        const notas = usuario.etapas[etapa].notas;
        return notas.reduce((a, b) => a + b, 0) / notas.length;
    });

    const max = 10;
    const min = 0;
    const paddingTop = 26;
    const paddingBottom = 26;
    const paddingX = 40;
    const graphHeight = height - paddingTop - paddingBottom;
    const graphWidth = width - paddingX * 2;

    const computedStyles = getComputedStyle(document.documentElement);
    const linkColor = computedStyles.getPropertyValue('--link-color').trim() || '#00ff66';
    const secondaryColor = computedStyles.getPropertyValue('--secondary-text-color').trim() || '#888888';
    const headingColor = computedStyles.getPropertyValue('--heading-text-color').trim() || '#ffffff';

    // Linhas de referência (horizontal)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    [0, 5, 10].forEach(val => {
        const y = height - paddingBottom - (val / 10) * graphHeight;
        ctx.beginPath();
        ctx.setLineDash([3, 3]);
        ctx.moveTo(paddingX, y);
        ctx.lineTo(width - paddingX, y);
        ctx.stroke();
    });
    ctx.setLineDash([]);

    // Coordenadas dos pontos
    const points = medias.map((media, index) => {
        const x = paddingX + (graphWidth / 2) * index;
        const y = height - paddingBottom - ((media - min) / (max - min)) * graphHeight;
        return { x, y, media, label: etapasLabels[index] };
    });

    // Gradiente suave abaixo da curva
    const gradient = ctx.createLinearGradient(0, paddingTop, 0, height - paddingBottom);
    gradient.addColorStop(0, 'rgba(0, 255, 100, 0.25)');
    gradient.addColorStop(1, 'rgba(0, 255, 100, 0.0)');

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.lineTo(points[points.length - 1].x, height - paddingBottom);
    ctx.lineTo(points[0].x, height - paddingBottom);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Linha de evolução
    ctx.strokeStyle = linkColor;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();

    // Desenhar pontos, valores e rótulos
    points.forEach((pt) => {
        // Ponto circular
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = '#0a0e14';
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = linkColor;
        ctx.stroke();

        // Rótulo da média acima do ponto
        ctx.fillStyle = headingColor;
        ctx.font = 'bold 10px "Fira Sans", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(pt.media.toFixed(1), pt.x, pt.y - 8);

        // Rótulo da Etapa abaixo do gráfico
        ctx.fillStyle = secondaryColor;
        ctx.font = '8px "Press Start 2P", monospace';
        ctx.fillText(pt.label, pt.x, height - 8);
    });
}

/**
 * Renderiza o dashboard específico do professor
 * @param {string} turmaFiltro - Turma para filtrar (ou 'all' para todas)
 */
function renderizarDashboardProfessor(turmaFiltro = 'all') {
    // Ocultar áreas padrão e mostrar área do professor
    document.getElementById('missoes-area').classList.add('hidden');
    document.getElementById('sidebar-area').classList.add('hidden');
    document.getElementById('trofeus-area').classList.add('hidden');
    document.getElementById('estatisticas-area').classList.add('hidden');
    document.getElementById('professor-dashboard').classList.remove('hidden');

    // Adicionar event listener ao seletor de turma (apenas uma vez)
    const turmaSelect = document.getElementById('professor-turma-select');
    if (turmaSelect && !turmaSelect.hasAttribute('data-listener-added')) {
        turmaSelect.addEventListener('change', (e) => {
            renderizarDashboardProfessor(e.target.value);
        });
        turmaSelect.setAttribute('data-listener-added', 'true');
    }

    // Calcular estatísticas agregadas
    let alunos = Object.entries(dadosUsuarios)
        .filter(([id]) => id !== 'PR0F1')
        .map(([id, dados]) => {
            const stats = calcularEstatisticas(dados);
            return { id, nome: dados.nome, turma: dados.turma, ...stats, nivel: dados.lvl, exp: dados.exp };
        });

    // Filtrar por turma se necessário
    if (turmaFiltro !== 'all') {
        alunos = alunos.filter(aluno => aluno.turma === turmaFiltro);
    }

    // Estatísticas gerais da turma
    const totalAlunos = alunos.length;
    const mediaGeralTurma = alunos.reduce((acc, a) => acc + a.mediaGeral, 0) / totalAlunos;
    const totalMissoesCompletadas = alunos.reduce((acc, a) => acc + a.missoesCompletadas, 0);
    const totalMissoes = alunos.reduce((acc, a) => acc + a.totalMissoes, 0);

    const statsGrid = document.getElementById('professor-stats-grid');
    const turmaLabel = turmaFiltro === 'all' ? 'TODAS AS TURMAS' : turmaFiltro;
    statsGrid.innerHTML = `
        <div class="stat-item">
            <span class="stat-value">${turmaLabel}</span>
            <span class="stat-label">TURMA</span>
        </div>
        <div class="stat-item">
            <span class="stat-value">${totalAlunos}</span>
            <span class="stat-label">ALUNOS</span>
        </div>
        <div class="stat-item">
            <span class="stat-value">${mediaGeralTurma.toFixed(1)}</span>
            <span class="stat-label">MÉDIA</span>
        </div>
        <div class="stat-item">
            <span class="stat-value">${totalMissoesCompletadas}/${totalMissoes}</span>
            <span class="stat-label">MISSÕES</span>
        </div>
        <div class="stat-item">
            <span class="stat-value">${Math.round((totalMissoesCompletadas / totalMissoes) * 100)}%</span>
            <span class="stat-label">CONCLUSÃO</span>
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
            <td>${aluno.nome}${turmaFiltro === 'all' ? ` (${aluno.turma})` : ''}</td>
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

    // Configurar botão de exportação
    const exportBtn = document.getElementById('export-csv-btn');
    if (exportBtn) {
        // Remover listener anterior para evitar duplicidade (cloneNode)
        const newBtn = exportBtn.cloneNode(true);
        exportBtn.parentNode.replaceChild(newBtn, exportBtn);

        newBtn.addEventListener('click', () => {
            exportarDadosCSV(alunos);
        });
    }
}

/**
 * Exporta os dados dos alunos para um arquivo CSV
 * @param {Array} alunos Lista de objetos de alunos
 */
function exportarDadosCSV(alunos) {
    if (!alunos || alunos.length === 0) {
        alert("Sem dados para exportar.");
        return;
    }

    // Cabeçalho do CSV
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "ID,Nome,Turma,Media Geral,Missoes Completadas,Total Missoes,Nivel,EXP\n";

    // Linhas de dados
    alunos.forEach(aluno => {
        const row = [
            aluno.id,
            `"${aluno.nome}"`, // Aspas para evitar problemas com nomes compostos
            aluno.turma,
            aluno.mediaGeral.toFixed(2).replace('.', ','), // Formato brasileiro
            aluno.missoesCompletadas,
            aluno.totalMissoes,
            aluno.nivel,
            aluno.exp
        ].join(",");
        csvContent += row + "\n";
    });

    // Criar link de download e clicar automaticamente
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    const dataAtual = new Date().toISOString().slice(0, 10);
    link.setAttribute("download", `nexus_relatorio_alunos_${dataAtual}.csv`);
    document.body.appendChild(link); // Necessário para Firefox
    link.click();
    document.body.removeChild(link);
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
        userNameSpan.innerText = usuario.nome;
        idForm.classList.add('hidden');
        const demoChips = document.getElementById('demo-chips');
        if (demoChips) demoChips.classList.add('hidden');
        userDisplay.classList.remove('hidden');

        document.getElementById('lvl').innerText = 'PR0F';
        document.getElementById('avatar-img').src = 'data/avatar/PR0F1.jpg';
        document.getElementById('progress-bar-fill').style.width = '100%';
        document.getElementById('progress-bar-text').innerText = 'MODO INSTRUTOR / GESTÃO DOCENTE';
        renderizarDashboardProfessor();
        return;
    }

    // --- Preenchimento Estático (não muda com a etapa) ---
    if (etapa === '1') { // Preenche apenas na primeira carga
        userNameSpan.innerText = usuario.nome;
        idForm.classList.add('hidden');
        const demoChips = document.getElementById('demo-chips');
        if (demoChips) demoChips.classList.add('hidden');
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
        document.getElementById('stat-turma').innerText = usuario.turma || '-';
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
        areaMencoes.innerHTML = '<span class="area-title">MENÇÕES DE HONRA</span>';
        if (usuario.mencoes && usuario.mencoes.length > 0) {
            usuario.mencoes.forEach(mencao => {
                const span = document.createElement('span');
                span.className = 'mencao-item';
                span.innerText = `🎖️ ${mencao.nome}`;
                span.setAttribute('data-tooltip', mencao.descricao);
                attachTooltipEvents(span);
                areaMencoes.appendChild(span);
            });
        }

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
    document.getElementById('media-notas').innerText = isNaN(media) ? 'MÉDIA: N/A' : `MÉDIA: ${media.toFixed(1)}`;

    const graficoNotas = document.getElementById('notas-grafico');
    const rotulosNotas = ["MDA", "MDEP", "NIF", "NAAG", "PORT"];
    graficoNotas.innerHTML = '';
    dadosEtapa.notas.forEach((nota, index) => {
        const coluna = document.createElement('div');
        coluna.className = 'nota-coluna';
        const barra = document.createElement('div');
        let classeNota = 'nota-alta';
        if (nota < 5.0) classeNota = 'nota-baixa';
        else if (nota < 7.0) classeNota = 'nota-media';
        barra.className = `bar ${classeNota}`;
        barra.setAttribute('data-tooltip', `${rotulosNotas[index] || 'Disciplina'}: ${nota.toFixed(1)}`);
        const rotulo = document.createElement('span');
        rotulo.className = 'nota-rotulo';
        rotulo.innerText = rotulosNotas[index] || 'N/A';
        setTimeout(() => { barra.style.height = `${nota * 10}%`; }, 100 * (index + 1));

        attachTooltipEvents(barra);
        coluna.appendChild(barra);
        coluna.appendChild(rotulo);
        graficoNotas.appendChild(coluna);
    });

    // Renderizar curva de evolução histórica
    desenharGraficoEvolucao(usuario);

    console.log(`[Dashboard Debug] Painel preenchido para o usuário: ${id}, Etapa: ${etapa}`);
}

/**
 * Limpa o painel do dashboard, redefinindo para o estado inicial.
 */
function limparPainel() {
    idInput.value = '';
    userDisplay.classList.add('hidden');
    idForm.classList.remove('hidden');
    const demoChips = document.getElementById('demo-chips');
    if (demoChips) demoChips.classList.remove('hidden');

    try {
        localStorage.removeItem('nexus_dashboard_last_id');
    } catch (e) {}

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
    document.getElementById('media-notas').innerText = 'MÉDIA: 0.0';
    document.getElementById('mencoes').innerHTML = '<span class="area-title">MENÇÕES DE HONRA</span>';
    document.getElementById('progress-bar-fill').style.width = '0%';
    document.getElementById('progress-bar-text').innerText = '0 / 0 EXP';

    // Limpar gráfico de evolução
    const canvas = document.getElementById('evolucao-grafico');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Limpar estatísticas
    document.getElementById('stat-turma').innerText = '-';
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

            // Salvar sessão no localStorage
            try {
                localStorage.setItem('nexus_dashboard_last_id', inputId);
            } catch (e) {
                console.warn("Não foi possível salvar sessão no localStorage:", e);
            }

            // Sincronizar turma do estudante com o Portal Nexus
            if (usuario.turma) {
                try {
                    localStorage.setItem('selectedClass', usuario.turma);
                    window.dispatchEvent(new CustomEvent('classChanged', { detail: { class: usuario.turma } }));
                } catch (e) {
                    console.warn("Não foi possível sincronizar turma:", e);
                }
            }

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

// Atalho para Professor (Ctrl + Alt + P)
document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.altKey && (event.key === 'p' || event.key === 'P')) {
        idInput.value = 'PR0F1';
        buscarUsuario();
    }
});

// --- News Modal Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const newsIcon = document.getElementById('news-icon');
    const newsModal = document.getElementById('news-modal');
    const closeModal = document.querySelector('.close-modal');

    if (newsIcon && newsModal && closeModal) {
        newsIcon.addEventListener('click', () => {
            newsModal.classList.remove('hidden');
        });

        closeModal.addEventListener('click', () => {
            newsModal.classList.add('hidden');
        });

        window.addEventListener('click', (event) => {
            if (event.target === newsModal) {
                newsModal.classList.add('hidden');
            }
        });
    }
});

// --- Inicialização ---
document.addEventListener('DOMContentLoaded', () => {
    sharedTooltip = document.getElementById('shared-tooltip');
    if (!sharedTooltip) {
        console.error("ERRO CRÍTICO: #shared-tooltip não encontrado.");
    }

    // Configurar chips de demonstração (acesso rápido com 1 clique)
    document.querySelectorAll('.demo-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            const id = chip.getAttribute('data-id');
            if (id) {
                idInput.value = id;
                buscarUsuario();
            }
        });
    });

    // Redimensionar gráfico de evolução dinamicamente
    window.addEventListener('resize', () => {
        if (usuarioAtual && idAtual !== 'PR0F1') {
            desenharGraficoEvolucao(usuarioAtual);
        }
    });

    limparPainel();

    // Auto-login se houver sessão salva
    try {
        const savedId = localStorage.getItem('nexus_dashboard_last_id');
        if (savedId) {
            idInput.value = savedId;
            buscarUsuario();
        }
    } catch (e) {
        console.warn("Não foi possível restaurar sessão salva:", e);
    }
});
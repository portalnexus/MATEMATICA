/**
 * NEXUS DASHBOARD & TERMINAL DOCENTE // JAVASCRIPT
 * - Autenticação por Tag de Estudante (4 letras + 3 dígitos: ex. BEAT901)
 * - Painel do Professor via Chave Mestre com Validação Criptográfica SHA-256
 * - Roteamento curricular estritamente de Matemática com Guias de Estudos
 * - 5 Dimensões Tradicionais: MDA, MDEP, NAAG, NIF, PORT
 * - Gestão completa de estudantes (CRUD com persistência no localStorage)
 */

// Tabela de Experiência Progressiva
const getExpParaNivel = (nivel) => {
    if (nivel <= 1) return 0;
    return Math.floor(100 * Math.pow(nivel - 1, 1.5));
};

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
const toggleVisibilityBtn = document.getElementById('toggle-visibility-btn');

// --- Constantes Curriculares e Chaves de Acesso ---
// Hash SHA-256 da Chave Secreta do Professor (garante integridade sem expor a chave)
const HASH_MESTRE_DOCENTE = "e75aca336e2ef436ce8334e598b02f2108a0a262ecc7db7a6984413985c151e7";
const ID_DOCENTE_ADMIN = "ADMIN_DOCENTE";
const REGEX_TAG_ESTUDANTE = /^[A-Z]{4}\d{3}$/;

async function calcularHashSHA256(texto) {
    const encoder = new TextEncoder();
    const data = encoder.encode(texto.trim().toLowerCase());
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// 5 Dimensões Tradicionais de Avaliação Formativa
const ROTULOS_DIMENSOES_MAT = ["MDA", "MDEP", "NAAG", "NIF", "PORT"];
const DESCRICOES_DIMENSOES_MAT = {
    "MDA": "Média das Avaliações",
    "MDEP": "Média dos estudos em prática",
    "NAAG": "Nota atribuída ao grupo",
    "NIF": "Nota individual final",
    "PORT": "Portfólio"
};

const DETALHES_DIMENSOES_MAT = {
    "MDA": {
        nome: "Média das Avaliações",
        descricao: "Provas escritas e avaliações conceituais formais.",
        icone: "📝"
    },
    "MDEP": {
        nome: "Média dos estudos em prática",
        descricao: "Resoluções práticas de listas, exercícios e aplicações.",
        icone: "📐"
    },
    "NAAG": {
        nome: "Nota atribuída ao grupo",
        descricao: "Trabalhos colaborativos, cooperação e projetos em equipe.",
        icone: "👥"
    },
    "NIF": {
        nome: "Nota individual final",
        descricao: "Domínio de competências, autonomia e raciocínio dedutivo.",
        icone: "🎯"
    },
    "PORT": {
        nome: "Portfólio",
        descricao: "Caderno acadêmico, registros de progresso e sínteses.",
        icone: "📁"
    }
};

function getClasseNota(nota) {
    if (typeof nota !== 'number' || isNaN(nota)) return 'nota-baixa';
    if (nota < 5.0) return 'nota-baixa';
    if (nota < 7.0) return 'nota-media';
    return 'nota-alta';
}

// Ementas Oficiais de Matemática por Turma vinculadas aos Guias de Estudos
const EMENTAS_MATEMATICA = {
    "9A": {
        "1": [
            { "nome": "Guia de Números Reais", "descricao": "Dominar dízimas periódicas, irracionais e notação científica.", "xp": 150, "completada": false, "tipo": "obrigatoria", "link": "recursos/guias/9ANO-GUIA-NUMEROS-REAIS.html" },
            { "nome": "Guia de Razão e Proporção", "descricao": "Resolver proporcionalidade direta e inversa.", "xp": 140, "completada": false, "tipo": "obrigatoria", "link": "recursos/guias/9ANO-GUIA-RAZAO-E-PROPORCAO.html" },
            { "nome": "Guia de Produtos Notáveis", "descricao": "Fatoração algébrica e identidades fundamentais.", "xp": 160, "completada": false, "tipo": "obrigatoria", "link": "recursos/guias/9ANO-GUIA-PRODUTOS-NOTAVEIS.html" }
        ],
        "2": [
            { "nome": "Guia de Ângulos", "descricao": "Classificação de retas paralelas cortadas por transversais.", "xp": 140, "completada": false, "tipo": "obrigatoria", "link": "recursos/guias/9ANO-GUIA-ANGULOS.html" },
            { "nome": "Guia de Pitágoras & Trigonometria", "descricao": "Relações métricas e razões fundamentais sen/cos/tg.", "xp": 180, "completada": false, "tipo": "obrigatoria", "link": "recursos/guias/9ANO-GUIA-PITAGORAS-TRIGONOMETRIA.html" },
            { "nome": "Guia de Tales & Semelhança", "descricao": "Proporção entre segmentos e semelhança de triângulos.", "xp": 150, "completada": false, "tipo": "obrigatoria", "link": "recursos/guias/9ANO-GUIA-TALES-SEMELHANCA.html" }
        ],
        "3": [
            { "nome": "Guia de Equações do 2º Grau", "descricao": "Resolução por Bhaskara, soma e produto de raízes.", "xp": 160, "completada": false, "tipo": "obrigatoria", "link": "recursos/guias/9ANO-GUIA-EQUACOES-2GRAU.html" },
            { "nome": "Guia de Funções", "descricao": "Noção fundamental, lei de formação e gráficos no plano.", "xp": 170, "completada": false, "tipo": "obrigatoria", "link": "recursos/guias/9ANO-GUIA-FUNCOES.html" },
            { "nome": "Guia de Geometria Espacial", "descricao": "Cálculo de superfícies e volumes de prismas e pirâmides.", "xp": 190, "completada": false, "tipo": "bonus", "link": "recursos/guias/9ANO-GUIA-GEOMETRIA-ESPACIAL.html" }
        ]
    },
    "9B": {
        "1": [
            { "nome": "Guia de Números Reais", "descricao": "Dominar dízimas periódicas, irracionais e notação científica.", "xp": 150, "completada": false, "tipo": "obrigatoria", "link": "recursos/guias/9ANO-GUIA-NUMEROS-REAIS.html" },
            { "nome": "Guia de Razão e Proporção", "descricao": "Resolver proporcionalidade direta e inversa.", "xp": 140, "completada": false, "tipo": "obrigatoria", "link": "recursos/guias/9ANO-GUIA-RAZAO-E-PROPORCAO.html" }
        ],
        "2": [
            { "nome": "Guia de Ângulos", "descricao": "Classificação de retas paralelas cortadas por transversais.", "xp": 140, "completada": false, "tipo": "obrigatoria", "link": "recursos/guias/9ANO-GUIA-ANGULOS.html" },
            { "nome": "Guia de Pitágoras & Trigonometria", "descricao": "Relações métricas e razões fundamentais sen/cos/tg.", "xp": 180, "completada": false, "tipo": "obrigatoria", "link": "recursos/guias/9ANO-GUIA-PITAGORAS-TRIGONOMETRIA.html" }
        ],
        "3": [
            { "nome": "Guia de Equações do 2º Grau", "descricao": "Resolução por Bhaskara, soma e produto de raízes.", "xp": 160, "completada": false, "tipo": "obrigatoria", "link": "recursos/guias/9ANO-GUIA-EQUACOES-2GRAU.html" },
            { "nome": "Guia de Funções", "descricao": "Noção fundamental, lei de formação e gráficos no plano.", "xp": 170, "completada": false, "tipo": "obrigatoria", "link": "recursos/guias/9ANO-GUIA-FUNCOES.html" }
        ]
    },
    "1A": {
        "1": [
            { "nome": "Guia de Conjuntos Numéricos", "descricao": "Operações com intervalos e reta real.", "xp": 140, "completada": false, "tipo": "obrigatoria", "link": "recursos/guias/1EM-GUIA-CONJUNTOS-NUMERICOS.html" },
            { "nome": "Guia de Funções & Afim", "descricao": "Estudo do sinal, taxa de variação e raízes da função afim.", "xp": 160, "completada": false, "tipo": "obrigatoria", "link": "recursos/guias/1EM-GUIA-FUNCOES.html" },
            { "nome": "Guia de Áreas e Perímetros", "descricao": "Cálculo métrico de polígonos no plano euclidiano.", "xp": 150, "completada": false, "tipo": "obrigatoria", "link": "recursos/guias/1EM-GUIA-AREAS-PERIMETROS.html" }
        ],
        "2": [
            { "nome": "Guia de Progressões (PA/PG)", "descricao": "Termo geral, interpolação e soma dos termos.", "xp": 170, "completada": false, "tipo": "obrigatoria", "link": "recursos/guias/1EM-GUIA-PROGRESSOES.html" },
            { "nome": "Guia de Exponencial & Logaritmo", "descricao": "Propriedades operatórias e modelagem exponencial.", "xp": 180, "completada": false, "tipo": "obrigatoria", "link": "recursos/guias/1EM-GUIA-EXPONENCIAL-LOGARITMO.html" },
            { "nome": "Guia de Estatística", "descricao": "Médias, moda, mediana e desvio padrão.", "xp": 150, "completada": false, "tipo": "obrigatoria", "link": "recursos/guias/1EM-GUIA-ESTATISTICA.html" }
        ],
        "3": [
            { "nome": "Guia de Trigonometria", "descricao": "Razões trigonométricas e relações fundamentais.", "xp": 170, "completada": false, "tipo": "obrigatoria", "link": "recursos/guias/1EM-GUIA-TRIGONOMETRIA.html" },
            { "nome": "Guia de Probabilidade", "descricao": "Espaço amostral, eventos equiprováveis e união.", "xp": 160, "completada": false, "tipo": "obrigatoria", "link": "recursos/guias/1EM-GUIA-PROBABILIDADE.html" }
        ]
    },
    "1B": {
        "1": [
            { "nome": "Guia de Conjuntos Numéricos", "descricao": "Operações com intervalos e reta real.", "xp": 140, "completada": false, "tipo": "obrigatoria", "link": "recursos/guias/1EM-GUIA-CONJUNTOS-NUMERICOS.html" },
            { "nome": "Guia de Funções & Afim", "descricao": "Estudo do sinal, taxa de variação e raízes da função afim.", "xp": 160, "completada": false, "tipo": "obrigatoria", "link": "recursos/guias/1EM-GUIA-FUNCOES.html" }
        ],
        "2": [
            { "nome": "Guia de Progressões (PA/PG)", "descricao": "Termo geral, interpolação e soma dos termos.", "xp": 170, "completada": false, "tipo": "obrigatoria", "link": "recursos/guias/1EM-GUIA-PROGRESSOES.html" },
            { "nome": "Guia de Exponencial & Logaritmo", "descricao": "Propriedades operatórias e modelagem exponencial.", "xp": 180, "completada": false, "tipo": "obrigatoria", "link": "recursos/guias/1EM-GUIA-EXPONENCIAL-LOGARITMO.html" }
        ],
        "3": [
            { "nome": "Guia de Trigonometria", "descricao": "Razões trigonométricas e relações fundamentais.", "xp": 170, "completada": false, "tipo": "obrigatoria", "link": "recursos/guias/1EM-GUIA-TRIGONOMETRIA.html" },
            { "nome": "Guia de Probabilidade", "descricao": "Espaço amostral, eventos equiprováveis e união.", "xp": 160, "completada": false, "tipo": "obrigatoria", "link": "recursos/guias/1EM-GUIA-PROBABILIDADE.html" }
        ]
    },
    "2EM": {
        "1": [
            { "nome": "Guia de Matrizes & Determinantes", "descricao": "Multiplicação matricial e regra de Sarrus.", "xp": 160, "completada": false, "tipo": "obrigatoria", "link": "recursos/guias/2EM-GUIA-MATRIZES-DETERMINANTES.html" },
            { "nome": "Guia de Análise Combinatória", "descricao": "Princípio fundamental da contagem e permutações.", "xp": 170, "completada": false, "tipo": "obrigatoria", "link": "recursos/guias/2EM-GUIA-ANALISE-COMBINATORIA.html" }
        ],
        "2": [
            { "nome": "Guia de Geometria Espacial", "descricao": "Poliedros de Platão e cálculo volumétrico de prismas.", "xp": 180, "completada": false, "tipo": "obrigatoria", "link": "recursos/guias/2EM-GUIA-GEOMETRIA-ESPACIAL.html" },
            { "nome": "Guia de Matemática Financeira", "descricao": "Juros simples, compostos e equivalência de capitais.", "xp": 160, "completada": false, "tipo": "obrigatoria", "link": "recursos/guias/2EM-GUIA-MATEMATICA-FINANCEIRA.html" }
        ],
        "3": [
            { "nome": "Guia de Probabilidade Condicional", "descricao": "Teorema de Bayes e probabilidade da interseção.", "xp": 180, "completada": false, "tipo": "obrigatoria", "link": "recursos/guias/2EM-GUIA-PROBABILIDADE.html" },
            { "nome": "Guia de Ladrilhamento", "descricao": "Pavimentação regular do plano por polígonos.", "xp": 150, "completada": false, "tipo": "opcional", "link": "recursos/guias/2EM-GUIA-LADRILHAMENTO-POLIGONOS.html" }
        ]
    },
    "3EM": {
        "1": [
            { "nome": "Guia de Sistemas Lineares", "descricao": "Escalonamento gaussiano e classificação SPD/SPI/SI.", "xp": 180, "completada": false, "tipo": "obrigatoria", "link": "recursos/guias/3EM-GUIA-SISTEMAS-LINEARES.html" },
            { "nome": "Guia de Geometria Analítica", "descricao": "Equações da reta, distância de ponto à reta e área.", "xp": 180, "completada": false, "tipo": "obrigatoria", "link": "recursos/guias/3EM-GUIA-GEOMETRIA-ANALITICA.html" },
            { "nome": "Guia de Áreas & Composição", "descricao": "Cálculo de superfícies complexas por decomposição.", "xp": 160, "completada": false, "tipo": "obrigatoria", "link": "recursos/guias/3EM-GUIA-AREAS-COMPOSICAO.html" }
        ],
        "2": [
            { "nome": "Guia de Trigonometria no Ciclo", "descricao": "Redução ao 1º quadrante e equações trigonométricas.", "xp": 180, "completada": false, "tipo": "obrigatoria", "link": "recursos/guias/3EM-GUIA-TRIGONOMETRIA-CICLO.html" },
            { "nome": "Guia de Volumes & Cavalieri", "descricao": "Princípio de Cavalieri e volumes de sólidos redondos.", "xp": 180, "completada": false, "tipo": "obrigatoria", "link": "recursos/guias/3EM-GUIA-VOLUMES-CAVALIERI.html" },
            { "nome": "Guia de Proporção & Porcentagem", "descricao": "Resolução de problemas de alta concorrência ENEM.", "xp": 150, "completada": false, "tipo": "obrigatoria", "link": "recursos/guias/3EM-GUIA-PROPORCAO-PORCENTAGEM.html" }
        ],
        "3": [
            { "nome": "Guia de Cartografia & Esfera", "descricao": "Fusos horários, latitudes, longitudes e navegação.", "xp": 170, "completada": false, "tipo": "obrigatoria", "link": "recursos/guias/3EM-GUIA-CARTOGRAFIA-ESFERA.html" },
            { "nome": "Simulado de Alta Performance", "descricao": "Bateria intensiva de questões de matemática.", "xp": 250, "completada": false, "tipo": "bonus", "link": "recursos/listas/3EM-PARABOLAS-OTIMIZACAO.html" }
        ]
    }
};

// --- Variáveis de Estado ---
let dadosUsuarios = null;
let trofeusDisponiveis = null;
let usuarioAtual = null;
let idAtual = null;
let etapaAtual = '1';

// --- Funções Utilitárias ---
function attachTooltipEvents(element) {
    if (!element) return;

    element.addEventListener('mouseover', (event) => {
        const tooltipText = event.currentTarget.getAttribute('data-tooltip');
        if (!tooltipText || !sharedTooltip) return;

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

function exibirErro(mensagem) {
    errorMessage.innerText = mensagem;
    setTimeout(() => { errorMessage.innerText = ''; }, 4000);
}

// --- Persistência de Dados ---
function salvarDadosPersistentes() {
    try {
        localStorage.setItem('nexus_students_data', JSON.stringify(dadosUsuarios));
        console.log("[Dashboard Debug] Dados persistidos no localStorage.");
    } catch (e) {
        console.warn("[Dashboard Debug] Falha ao salvar no localStorage:", e);
    }
}

async function carregarDadosDeUsuario() {
    if (dadosUsuarios) return;

    // 1. Tentar carregar do localStorage
    try {
        const dadosSalvos = localStorage.getItem('nexus_students_data');
        if (dadosSalvos) {
            dadosUsuarios = JSON.parse(dadosSalvos);
            // Migrar chave docente se existir no cache local
            if (!dadosUsuarios[ID_DOCENTE_ADMIN]) {
                for (const k of Object.keys(dadosUsuarios)) {
                    if (dadosUsuarios[k] && dadosUsuarios[k].role === 'admin') {
                        dadosUsuarios[ID_DOCENTE_ADMIN] = dadosUsuarios[k];
                        if (k !== ID_DOCENTE_ADMIN) delete dadosUsuarios[k];
                        salvarDadosPersistentes();
                        break;
                    }
                }
            }
            console.log("[Dashboard Debug] Dados de usuário restaurados do localStorage.");
            return;
        }
    } catch (e) {
        console.warn("[Dashboard Debug] Erro ao ler do localStorage, buscando JSON...", e);
    }

    // 2. Fallback para data/student-data.json
    try {
        const response = await fetch('data/student-data.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        dadosUsuarios = await response.json();
        salvarDadosPersistentes();
        console.log("[Dashboard Debug] Dados de usuário carregados do JSON padrão.");
    } catch (error) {
        console.error("[Dashboard Debug] Falha crítica ao carregar dados:", error);
        exibirErro("Falha ao carregar banco de dados. Tente recarregar a página.");
    }
}

async function carregarTrofeusDisponiveis() {
    if (trofeusDisponiveis) return;
    try {
        const response = await fetch('data/trofeus-disponiveis.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        trofeusDisponiveis = data.trofeus;
    } catch (error) {
        console.warn("[Dashboard Debug] Falha ao carregar troféus disponíveis:", error);
    }
}

// --- Cálculos Estatísticos ---
function calcularEstatisticas(usuario) {
    if (!usuario || !usuario.etapas) {
        return { totalMissoes: 0, missoesCompletadas: 0, mediaGeral: 0, totalTrofeus: 0 };
    }

    let totalMissoes = 0;
    let missoesCompletadas = 0;
    let somaMedias = 0;
    let totalEtapasComNotas = 0;

    Object.values(usuario.etapas).forEach(etapa => {
        if (etapa.missoes) {
            totalMissoes += etapa.missoes.length;
            missoesCompletadas += etapa.missoes.filter(m => m.completada).length;
        }
        if (etapa.notas && etapa.notas.length > 0) {
            const media = etapa.notas.reduce((a, b) => a + b, 0) / etapa.notas.length;
            somaMedias += media;
            totalEtapasComNotas++;
        }
    });

    const mediaGeral = totalEtapasComNotas > 0 ? somaMedias / totalEtapasComNotas : 0;
    const totalTrofeus = (usuario.trofeus && Array.isArray(usuario.trofeus)) ? usuario.trofeus.length : 0;

    return {
        totalMissoes,
        missoesCompletadas,
        mediaGeral,
        totalTrofeus
    };
}

// --- Gráfico de Evolução (Histórico entre Etapas) ---
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
    const linkColor = computedStyles.getPropertyValue('--link-color').trim() || '#38bdf8';
    const secondaryColor = computedStyles.getPropertyValue('--secondary-text-color').trim() || '#94a3b8';
    const headingColor = computedStyles.getPropertyValue('--heading-text-color').trim() || '#ffffff';

    // Linhas de referência
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

    const points = medias.map((media, index) => {
        const x = paddingX + (graphWidth / 2) * index;
        const y = height - paddingBottom - ((media - min) / (max - min)) * graphHeight;
        return { x, y, media, label: etapasLabels[index] };
    });

    // Gradiente abaixo da curva
    const gradient = ctx.createLinearGradient(0, paddingTop, 0, height - paddingBottom);
    gradient.addColorStop(0, 'rgba(56, 189, 248, 0.25)');
    gradient.addColorStop(1, 'rgba(56, 189, 248, 0.0)');

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y);
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
    for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y);
    ctx.stroke();

    // Pontos e valores
    points.forEach((pt) => {
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = '#0f172a';
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = linkColor;
        ctx.stroke();

        ctx.fillStyle = headingColor;
        ctx.font = 'bold 10px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(pt.media.toFixed(1), pt.x, pt.y - 8);

        ctx.fillStyle = secondaryColor;
        ctx.font = '9px "Fira Sans", sans-serif';
        ctx.fillText(pt.label, pt.x, height - 8);
    });

    // Atualizar mini-pills de histórico e indicador de tendência
    const pillsRow = document.getElementById('evolucao-etapas-pills');
    if (pillsRow) {
        pillsRow.innerHTML = '';
        ['1', '2', '3'].forEach((etp, idx) => {
            const m = medias[idx];
            const c = getClasseNota(m);
            const pill = document.createElement('div');
            pill.className = `evolucao-mini-pill ${c}`;
            pill.innerHTML = `<span class="ep-lbl">Etapa ${['I','II','III'][idx]}:</span> <strong class="ep-val">${m > 0 ? m.toFixed(1) : '-'}</strong>`;
            pillsRow.appendChild(pill);
        });
    }

    const tendenciaBadge = document.getElementById('evolucao-tendencia-badge');
    if (tendenciaBadge) {
        if (medias[1] > 0 && medias[0] > 0) {
            const diff = medias[1] - medias[0];
            if (diff > 0.2) {
                tendenciaBadge.className = 'evolucao-badge tendencia-alta';
                tendenciaBadge.innerText = `📈 Em Alta (+${diff.toFixed(1)})`;
            } else if (diff < -0.2) {
                tendenciaBadge.className = 'evolucao-badge tendencia-baixa';
                tendenciaBadge.innerText = `📉 Atenção (${diff.toFixed(1)})`;
            } else {
                tendenciaBadge.className = 'evolucao-badge tendencia-estavel';
                tendenciaBadge.innerText = `➡️ Estável`;
            }
        } else {
            tendenciaBadge.className = 'evolucao-badge';
            tendenciaBadge.innerText = `Etapa 1 em Curso`;
        }
    }
}

// --- Preenchimento do Painel do Estudante ---
function preencherPainel(usuario, id, etapa = '1') {
    if (!usuario) return;

    // Se for o professor, abre o dashboard específico
    if (id === ID_DOCENTE_ADMIN || usuario.role === 'admin') {
        userNameSpan.innerText = usuario.nome;
        idForm.classList.add('hidden');
        userDisplay.classList.remove('hidden');

        document.getElementById('lvl').innerText = 'PROF';
        document.getElementById('avatar-img').src = 'data/avatar/PR0F1.jpg';
        document.getElementById('progress-bar-fill').style.width = '100%';
        document.getElementById('progress-bar-text').innerText = 'TERMINAL DE GESTÃO DOCENTE // ADMIN ATIVO';
        renderizarDashboardProfessor();
        return;
    }

    // Modo Estudante
    userNameSpan.innerText = `${usuario.nome} [${id}]`;
    idForm.classList.add('hidden');
    userDisplay.classList.remove('hidden');

    document.getElementById('lvl').innerText = `Nv. ${usuario.lvl || 1}`;
    const avatarFile = usuario.avatar || `${id}.jpg`;
    document.getElementById('avatar-img').src = `data/avatar/${avatarFile}`;

    // EXP e Progresso
    if (typeof usuario.lvl === 'number' && usuario.lvl < 100) {
        const expNivelAtual = getExpParaNivel(usuario.lvl);
        const expProximoNivel = getExpParaNivel(usuario.lvl + 1);
        const progressoNoNivel = (usuario.exp || 0) - expNivelAtual;
        const totalParaProximo = expProximoNivel - expNivelAtual;
        const porcentagem = Math.max(0, Math.min(100, (progressoNoNivel / totalParaProximo) * 100));

        setTimeout(() => {
            document.getElementById('progress-bar-fill').style.width = `${porcentagem}%`;
            document.getElementById('progress-bar-text').innerText = `${Math.max(0, progressoNoNivel).toLocaleString()} / ${totalParaProximo.toLocaleString()} EXP`;
        }, 100);
    } else {
        document.getElementById('progress-bar-fill').style.width = '100%';
        document.getElementById('progress-bar-text').innerText = 'NÍVEL MÁXIMO // ELITE MATEMÁTICA';
    }

    // Estatísticas
    const stats = calcularEstatisticas(usuario);
    document.getElementById('stat-turma').innerText = usuario.turma || '-';
    document.getElementById('stat-missoes').innerText = `${stats.missoesCompletadas}/${stats.totalMissoes}`;
    document.getElementById('stat-media-geral').innerText = stats.mediaGeral.toFixed(1);
    document.getElementById('stat-trofeus').innerText = stats.totalTrofeus;

    // Troféus Conquistados
    const areaTrofeus = document.getElementById('trofeus-conquistados');
    areaTrofeus.innerHTML = '';
    if (usuario.trofeus && usuario.trofeus.length > 0) {
        usuario.trofeus.forEach((trofeu, index) => {
            const div = document.createElement('div');
            div.className = `trofeu-box fade-in raridade-${trofeu.raridade || 'comum'}`;
            div.innerHTML = `${trofeu.nome}<span class="trofeu-categoria">${trofeu.categoria || ''}</span>`;
            div.setAttribute('data-tooltip', trofeu.descricao);
            div.style.animationDelay = `${index * 0.05}s`;
            attachTooltipEvents(div);
            areaTrofeus.appendChild(div);
        });
    }

    // Menções
    const areaMencoes = document.getElementById('mencoes');
    areaMencoes.innerHTML = '<span class="area-title">MENÇÕES DE HONRA</span>';
    const mencoesLista = document.createElement('div');
    mencoesLista.id = 'mencoes-lista';
    if (usuario.mencoes && usuario.mencoes.length > 0) {
        usuario.mencoes.forEach(mencao => {
            const span = document.createElement('span');
            span.className = 'mencao-item';
            span.innerText = `🎖️ ${mencao.nome}`;
            span.setAttribute('data-tooltip', mencao.descricao);
            attachTooltipEvents(span);
            mencoesLista.appendChild(span);
        });
    }
    areaMencoes.appendChild(mencoesLista);

    // Preenchimento da Etapa Atual
    const dadosEtapa = (usuario.etapas && usuario.etapas[etapa]) ? usuario.etapas[etapa] : { missoes: [], notas: [7, 7, 7, 7, 7] };
    const listaMissoes = document.getElementById('lista-missoes');
    listaMissoes.innerHTML = '';

    if (dadosEtapa.missoes && dadosEtapa.missoes.length > 0) {
        dadosEtapa.missoes.forEach((missao, index) => {
            const li = document.createElement('li');
            li.className = 'missao-item fade-in';
            li.style.animationDelay = `${index * 0.08}s`;

            const missaoInfo = document.createElement('div');
            missaoInfo.className = 'missao-info';

            const missaoNome = document.createElement('span');
            missaoNome.className = 'missao-nome';
            if (missao.link) {
                missaoNome.innerHTML = `<a href="${missao.link}" style="color: inherit; text-decoration: underline;">${missao.nome} 🔗</a>`;
            } else {
                missaoNome.innerText = missao.nome;
            }

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
            missaoStatus.innerText = missao.completada ? '✓ CONCLUÍDA' : '○ PENDENTE';

            li.appendChild(missaoInfo);
            li.appendChild(missaoXP);
            li.appendChild(missaoStatus);
            li.setAttribute('data-tooltip', missao.descricao);
            attachTooltipEvents(li);
            listaMissoes.appendChild(li);
        });
    } else {
        listaMissoes.innerHTML = '<li style="padding: 1rem; color: var(--secondary-text-color);">Nenhuma missão registrada nesta etapa.</li>';
    }

    // Atualização da Média da Etapa e Rótulos
    const media = dadosEtapa.notas.reduce((acc, n) => acc + n, 0) / dadosEtapa.notas.length;
    const classeMedia = getClasseNota(media);

    const mediaBadge = document.getElementById('media-notas');
    if (mediaBadge) {
        mediaBadge.className = `media-notas-badge ${classeMedia}`;
        mediaBadge.innerHTML = `<span style="font-size: 0.75rem; color: var(--secondary-text-color); font-weight: normal; margin-right: 4px;">MÉDIA DA ETAPA ${etapa}:</span> <strong>${media.toFixed(1)}</strong>`;
    }

    const etapaLabel = document.getElementById('notas-etapa-label');
    if (etapaLabel) {
        etapaLabel.innerText = ['I', 'II', 'III'][parseInt(etapa, 10) - 1] || etapa;
    }

    // Renderizar os 5 Cards de Dimensões Formativas em #notas-cards-grid
    const cardsGrid = document.getElementById('notas-cards-grid');
    if (cardsGrid) {
        cardsGrid.innerHTML = '';
        ROTULOS_DIMENSOES_MAT.forEach((sigla, index) => {
            const nota = (dadosEtapa.notas && dadosEtapa.notas[index] !== undefined) ? dadosEtapa.notas[index] : 0.0;
            const meta = DETALHES_DIMENSOES_MAT[sigla] || { nome: sigla, descricao: '', icone: '📊' };
            const statusClass = getClasseNota(nota);

            let statusText = 'BOM RENDIMENTO';
            if (nota >= 9.0) statusText = 'EXCELENTE';
            else if (nota < 5.0) statusText = 'RECUPERAÇÃO';
            else if (nota < 7.0) statusText = 'ATENÇÃO';

            const card = document.createElement('div');
            card.className = `nota-dim-card ${statusClass} fade-in`;
            card.style.animationDelay = `${index * 0.08}s`;

            const percentual = Math.min(100, Math.max(0, nota * 10));

            card.innerHTML = `
                <div class="nota-dim-card-top">
                    <span class="nota-dim-tag">${meta.icone} ${sigla}</span>
                    <span class="nota-dim-status-pill ${statusClass}">${statusText}</span>
                </div>
                <div class="nota-dim-nome">${meta.nome}</div>
                <div class="nota-dim-score-row">
                    <span class="nota-dim-score ${statusClass}">${nota.toFixed(1)}</span>
                    <span class="nota-dim-max">/10.0</span>
                </div>
                <div class="nota-dim-gauge">
                    <div class="nota-dim-gauge-fill ${statusClass}" style="width: 0%;"></div>
                </div>
                <div class="nota-dim-desc">${meta.descricao}</div>
            `;

            cardsGrid.appendChild(card);

            // Animação suave da barra de progresso horizontal
            setTimeout(() => {
                const fill = card.querySelector('.nota-dim-gauge-fill');
                if (fill) fill.style.width = `${percentual}%`;
            }, 100 + index * 60);
        });
    }

    // Curva histórica de evolução
    desenharGraficoEvolucao(usuario);
    atualizarBotoesEtapa(usuario);

    // Renderizar KaTeX no container se disponível
    if (typeof renderMathInElement === 'function') {
        const notasArea = document.getElementById('notas-area');
        if (notasArea) {
            renderMathInElement(notasArea, {
                delimiters: [
                    { left: "@@", right: "@@", display: true },
                    { left: "\\[", right: "\\]", display: true },
                    { left: "@", right: "@", display: false },
                    { left: "\\(", right: "\\)", display: false }
                ],
                throwOnError: false
            });
        }
    }
}

// --- Atualizar Indicadores dos Botões de Etapa ---
function atualizarBotoesEtapa(usuario) {
    etapaBtns.forEach(btn => {
        const etapaNum = btn.getAttribute('data-etapa');
        const dadosEtapa = usuario.etapas ? usuario.etapas[etapaNum] : null;
        if (!dadosEtapa) return;

        const media = dadosEtapa.notas.reduce((a, b) => a + b, 0) / dadosEtapa.notas.length;
        const total = dadosEtapa.missoes ? dadosEtapa.missoes.length : 0;
        const comp = dadosEtapa.missoes ? dadosEtapa.missoes.filter(m => m.completada).length : 0;

        let infoDiv = btn.querySelector('.etapa-info');
        if (!infoDiv) {
            infoDiv = document.createElement('div');
            infoDiv.className = 'etapa-info';
            btn.appendChild(infoDiv);
        }

        infoDiv.innerHTML = `
            <span class="etapa-media">Média: ${media.toFixed(1)}</span>
            <span class="etapa-missoes-count">${comp}/${total} missões</span>
        `;
    });
}

function mudarEtapa(novaEtapa) {
    if (novaEtapa === etapaAtual || !usuarioAtual) return;
    etapaAtual = novaEtapa;
    etapaBtns.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-etapa') === novaEtapa);
    });
    preencherPainel(usuarioAtual, idAtual, etapaAtual);
}

// Estado do Painel Docente
let adminEtapaAtual = '1';
let adminModoVisualizacao = 'cards'; // 'cards' ou 'tabela'

// --- Painel Docente / Professor (ADMIN) ---
function renderizarDashboardProfessor(turmaFiltro = 'all', buscaTermo = '', adminEtapa = adminEtapaAtual) {
    adminEtapaAtual = adminEtapa;

    // Ocultar painéis de estudante e seletor de etapas do aluno
    document.getElementById('missoes-area').classList.add('hidden');
    document.getElementById('notas-area').classList.add('hidden');
    document.getElementById('evolucao-area').classList.add('hidden');
    document.getElementById('trofeus-area').classList.add('hidden');
    document.getElementById('estatisticas-area').classList.add('hidden');
    document.getElementById('progresso-area').classList.add('hidden');
    document.getElementById('mencoes').classList.add('hidden');
    const etapaSelector = document.getElementById('etapa-selector');
    if (etapaSelector) etapaSelector.classList.add('hidden');

    // Exibir painel docente
    document.getElementById('professor-dashboard').classList.remove('hidden');

    // Atualizar botões de etapa docente ativos
    document.querySelectorAll('.admin-etapa-btn').forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-admin-etapa') === adminEtapaAtual);
    });

    const labelEtapaTable = document.getElementById('admin-etapa-table-lbl');
    if (labelEtapaTable) {
        labelEtapaTable.innerText = ['I', 'II', 'III'][parseInt(adminEtapaAtual, 10) - 1] || adminEtapaAtual;
    }

    // Filtrar estudantes
    let estudantes = Object.entries(dadosUsuarios)
        .filter(([id, dados]) => id !== ID_DOCENTE_ADMIN && dados.role !== 'admin')
        .map(([id, dados]) => ({
            id,
            ...dados,
            stats: calcularEstatisticas(dados)
        }));

    // Filtro por turma
    if (turmaFiltro !== 'all') {
        estudantes = estudantes.filter(e => e.turma === turmaFiltro);
    }

    // Busca textual por nome ou tag
    if (buscaTermo.trim()) {
        const termo = buscaTermo.toLowerCase().trim();
        estudantes = estudantes.filter(e => e.nome.toLowerCase().includes(termo) || e.id.toLowerCase().includes(termo));
    }

    // Atualiza contagem total
    document.getElementById('total-estudantes-count').innerText = estudantes.length;

    // 1. Renderizar Grade de Cards
    const cardsContainer = document.getElementById('professor-students-cards');
    cardsContainer.innerHTML = '';

    // 2. Renderizar Tabela Panorama Geral (Planilha)
    const panoramaTbody = document.getElementById('panorama-grades-tbody');
    if (panoramaTbody) panoramaTbody.innerHTML = '';

    if (estudantes.length === 0) {
        cardsContainer.innerHTML = '<div style="grid-column: 1 / -1; padding: 2rem; text-align: center; color: var(--secondary-text-color);">Nenhum estudante encontrado para este filtro.</div>';
        if (panoramaTbody) {
            panoramaTbody.innerHTML = '<tr><td colspan="12" style="text-align: center; padding: 2rem; color: var(--secondary-text-color);">Nenhum estudante encontrado para este filtro.</td></tr>';
        }
    } else {
        estudantes.forEach(aluno => {
            // Notas da etapa selecionada
            const dadosEtapaDocente = aluno.etapas && aluno.etapas[adminEtapaAtual] && aluno.etapas[adminEtapaAtual].notas 
                ? aluno.etapas[adminEtapaAtual].notas 
                : [7.0, 7.0, 7.0, 7.0, 7.0];
            const mediaEtapa = dadosEtapaDocente.reduce((a, b) => a + b, 0) / dadosEtapaDocente.length;
            const classeMediaEtapa = getClasseNota(mediaEtapa);
            const classeMediaGeral = getClasseNota(aluno.stats.mediaGeral);

            const avatarFile = aluno.avatar || `${aluno.id}.jpg`;

            // Construir Card
            const card = document.createElement('div');
            card.className = 'student-card';
            card.setAttribute('data-id', aluno.id);

            // 5 notas pills
            let pillsHtml = '';
            ROTULOS_DIMENSOES_MAT.forEach((sigla, dIdx) => {
                const notaD = dadosEtapaDocente[dIdx] !== undefined ? dadosEtapaDocente[dIdx] : 0.0;
                const classeD = getClasseNota(notaD);
                const descD = DESCRICOES_DIMENSOES_MAT[sigla] || sigla;
                pillsHtml += `
                    <div class="card-grade-pill ${classeD}" title="${descD}: ${notaD.toFixed(1)}">
                        <span class="pill-dim">${sigla}</span>
                        <span class="pill-val">${notaD.toFixed(1)}</span>
                    </div>
                `;
            });

            card.innerHTML = `
                <div class="student-card-header">
                    <img src="data/avatar/${avatarFile}" onerror="this.src='data/avatar/default_avatar.png'; this.onerror=null;" class="student-card-avatar" alt="Avatar">
                    <div class="student-card-title">
                        <span class="student-card-name" title="${aluno.nome}">${aluno.nome}</span>
                        <span class="student-card-tag">[${aluno.id}]</span>
                    </div>
                    <span class="student-card-turma">${aluno.turma || 'Geral'}</span>
                </div>
                <div class="student-card-grades-strip">
                    ${pillsHtml}
                </div>
                <div class="student-card-stats">
                    <div class="card-stat-block">
                        <span class="card-stat-val ${classeMediaEtapa}">${mediaEtapa.toFixed(1)}</span>
                        <span class="card-stat-lbl">ETAPA ${adminEtapaAtual}</span>
                    </div>
                    <div class="card-stat-block">
                        <span class="card-stat-val ${classeMediaGeral}">${aluno.stats.mediaGeral.toFixed(1)}</span>
                        <span class="card-stat-lbl">MÉDIA GERAL</span>
                    </div>
                    <div class="card-stat-block">
                        <span class="card-stat-val">${aluno.stats.missoesCompletadas}/${aluno.stats.totalMissoes}</span>
                        <span class="card-stat-lbl">MISSÕES</span>
                    </div>
                    <div class="card-stat-block">
                        <span class="card-stat-val">Nv. ${aluno.lvl || 1}</span>
                        <span class="card-stat-lbl">NÍVEL</span>
                    </div>
                </div>
                <div class="student-card-actions">
                    <button type="button" class="btn-card-edit" data-id="${aluno.id}">✏️ Editar Aluno & Notas</button>
                </div>
            `;

            card.addEventListener('click', () => {
                abrirModalEdicao(aluno.id);
            });

            cardsContainer.appendChild(card);

            // Construir Linha na Planilha Panorama
            if (panoramaTbody) {
                const tr = document.createElement('tr');
                let colsNotas = '';
                ROTULOS_DIMENSOES_MAT.forEach((sigla, dIdx) => {
                    const notaD = dadosEtapaDocente[dIdx] !== undefined ? dadosEtapaDocente[dIdx] : 0.0;
                    const classeD = getClasseNota(notaD);
                    colsNotas += `<td><span class="table-nota-badge ${classeD}">${notaD.toFixed(1)}</span></td>`;
                });

                tr.innerHTML = `
                    <td><code style="color: var(--link-color); font-weight: bold;">${aluno.id}</code></td>
                    <td><strong>${aluno.nome}</strong></td>
                    <td><span class="student-card-turma">${aluno.turma || 'Geral'}</span></td>
                    ${colsNotas}
                    <td><strong class="table-nota-badge ${classeMediaEtapa}">${mediaEtapa.toFixed(1)}</strong></td>
                    <td><strong class="table-nota-badge ${classeMediaGeral}">${aluno.stats.mediaGeral.toFixed(1)}</strong></td>
                    <td>${aluno.stats.missoesCompletadas}/${aluno.stats.totalMissoes}</td>
                    <td><button type="button" class="btn-card-edit" style="padding: 2px 8px; font-size: 0.72rem;" data-id="${aluno.id}">Editar</button></td>
                `;

                tr.querySelector('.btn-card-edit').addEventListener('click', (e) => {
                    e.stopPropagation();
                    abrirModalEdicao(aluno.id);
                });

                panoramaTbody.appendChild(tr);
            }
        });
    }

    // Alternar visibilidade entre Cards e Planilha
    const containerCards = document.getElementById('professor-students-cards-container');
    const containerPanorama = document.getElementById('professor-panorama-view');
    if (adminModoVisualizacao === 'tabela') {
        if (containerCards) containerCards.classList.add('hidden');
        if (containerPanorama) containerPanorama.classList.remove('hidden');
    } else {
        if (containerCards) containerCards.classList.remove('hidden');
        if (containerPanorama) containerPanorama.classList.add('hidden');
    }

    // 3. Estatísticas Agregadas
    const statsGrid = document.getElementById('professor-stats-grid');
    const totalAlunos = estudantes.length;
    const mediaGeralTurma = totalAlunos > 0 ? (estudantes.reduce((acc, a) => acc + a.stats.mediaGeral, 0) / totalAlunos) : 0;
    const totalMissoesComp = estudantes.reduce((acc, a) => acc + a.stats.missoesCompletadas, 0);
    const totalMissoesGerais = estudantes.reduce((acc, a) => acc + a.stats.totalMissoes, 0);
    const taxaConclusao = totalMissoesGerais > 0 ? Math.round((totalMissoesComp / totalMissoesGerais) * 100) : 0;

    statsGrid.innerHTML = `
        <div class="stat-item">
            <span class="stat-value">${turmaFiltro === 'all' ? 'TODAS' : turmaFiltro}</span>
            <span class="stat-label">TURMA FILTRADA</span>
        </div>
        <div class="stat-item">
            <span class="stat-value">${totalAlunos}</span>
            <span class="stat-label">ESTUDANTES</span>
        </div>
        <div class="stat-item">
            <span class="stat-value">${mediaGeralTurma.toFixed(1)}</span>
            <span class="stat-label">MÉDIA DA TURMA</span>
        </div>
        <div class="stat-item">
            <span class="stat-value">${totalMissoesComp}/${totalMissoesGerais}</span>
            <span class="stat-label">MISSÕES CONCLUÍDAS</span>
        </div>
        <div class="stat-item">
            <span class="stat-value">${taxaConclusao}%</span>
            <span class="stat-label">TAXA DE CONCLUSÃO</span>
        </div>
    `;

    // 4. Tabela de Ranking
    const rankingTbody = document.getElementById('ranking-tbody');
    rankingTbody.innerHTML = '';
    const rankingOrdenado = [...estudantes].sort((a, b) => b.stats.mediaGeral - a.stats.mediaGeral);

    rankingOrdenado.forEach((aluno, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${index + 1}º</strong></td>
            <td><code style="color: var(--link-color); font-weight: bold;">${aluno.id}</code></td>
            <td>${aluno.nome} <span style="font-size: 0.75rem; color: var(--secondary-text-color);">(${aluno.turma})</span></td>
            <td><strong>${aluno.stats.mediaGeral.toFixed(1)}</strong></td>
            <td>${aluno.stats.missoesCompletadas}/${aluno.stats.totalMissoes}</td>
            <td><button type="button" class="btn-card-edit" style="padding: 2px 8px; font-size: 0.7rem;" data-id="${aluno.id}">Editar</button></td>
        `;
        tr.querySelector('.btn-card-edit').addEventListener('click', (e) => {
            e.stopPropagation();
            abrirModalEdicao(aluno.id);
        });
        rankingTbody.appendChild(tr);
    });

    // 5. Alertas Pedagógicos
    const alertasList = document.getElementById('alertas-list');
    alertasList.innerHTML = '';
    let alertasContador = 0;

    estudantes.forEach(aluno => {
        if (aluno.stats.mediaGeral < 6.0) {
            alertasContador++;
            const li = document.createElement('li');
            li.innerHTML = `⚠️ <strong>${aluno.nome}</strong> [${aluno.id}]: Média baixa (${aluno.stats.mediaGeral.toFixed(1)}). Recomendada atividade de recuperação.`;
            alertasList.appendChild(li);
        }
        if (aluno.stats.totalMissoes > 0 && (aluno.stats.missoesCompletadas / aluno.stats.totalMissoes) < 0.4) {
            alertasContador++;
            const li = document.createElement('li');
            li.innerHTML = `⏳ <strong>${aluno.nome}</strong> [${aluno.id}]: Atraso nas missões dos guias (${aluno.stats.missoesCompletadas}/${aluno.stats.totalMissoes}).`;
            alertasList.appendChild(li);
        }
    });

    if (alertasContador === 0) {
        alertasList.innerHTML = '<li style="background-color: rgba(16, 185, 129, 0.2); border-left-color: #10b981; color: var(--main-text-color);">Nenhum alerta crítico no momento. Turma em bom rendimento. ✓</li>';
    }
}

// --- Abertura e Gestão de Modais ---
function abrirModalCriacao() {
    const modal = document.getElementById('create-student-modal');
    document.getElementById('create-student-form').reset();
    gerarTagAleatoria();
    modal.classList.remove('hidden');
}

function gerarTagAleatoria() {
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let tag = "";
    for (let i = 0; i < 4; i++) {
        tag += letras.charAt(Math.floor(Math.random() * letras.length));
    }
    const numeros = Math.floor(100 + Math.random() * 900); // 3 dígitos
    tag += numeros;
    document.getElementById('create-tag').value = tag;
}

function abrirModalEdicao(studentId) {
    const aluno = dadosUsuarios[studentId];
    if (!aluno) return;

    document.getElementById('edit-original-id').value = studentId;
    document.getElementById('edit-modal-student-tag').innerText = studentId;
    document.getElementById('edit-nome').value = aluno.nome;
    document.getElementById('edit-tag').value = studentId;
    document.getElementById('edit-turma').value = aluno.turma || '9A';

    // Preencher notas 3x5
    for (let e = 1; e <= 3; e++) {
        const etapaObj = aluno.etapas && aluno.etapas[String(e)] ? aluno.etapas[String(e)] : { notas: [7, 7, 7, 7, 7] };
        for (let d = 0; d < 5; d++) {
            const input = document.getElementById(`edit-n-${e}-${d}`);
            if (input) {
                input.value = (etapaObj.notas && etapaObj.notas[d] !== undefined) ? etapaObj.notas[d] : 7.0;
            }
        }
    }
    atualizarMediasModalEdicao();

    // Preencher Checklist de Missões
    const checklist = document.getElementById('edit-missoes-checklist');
    checklist.innerHTML = '';

    for (let e = 1; e <= 3; e++) {
        const etapaObj = aluno.etapas ? aluno.etapas[String(e)] : null;
        if (etapaObj && etapaObj.missoes && etapaObj.missoes.length > 0) {
            const etapaTitulo = document.createElement('div');
            etapaTitulo.style.fontWeight = 'bold';
            etapaTitulo.style.color = 'var(--link-color)';
            etapaTitulo.style.marginTop = '6px';
            etapaTitulo.innerText = `Etapa ${e}:`;
            checklist.appendChild(etapaTitulo);

            etapaObj.missoes.forEach((m, mIdx) => {
                const label = document.createElement('label');
                label.className = 'missao-check-item';
                label.innerHTML = `
                    <input type="checkbox" data-etapa="${e}" data-index="${mIdx}" ${m.completada ? 'checked' : ''}>
                    <span>${m.nome} (+${m.xp || 100} XP)</span>
                `;
                checklist.appendChild(label);
            });
        }
    }

    document.getElementById('edit-student-modal').classList.remove('hidden');
}

function atualizarMediasModalEdicao() {
    for (let e = 1; e <= 3; e++) {
        let soma = 0;
        for (let d = 0; d < 5; d++) {
            const val = parseFloat(document.getElementById(`edit-n-${e}-${d}`).value) || 0;
            soma += val;
        }
        const media = soma / 5;
        document.getElementById(`edit-media-${e}`).innerText = media.toFixed(1);
    }
}

// --- Autenticação & Busca de Usuário ---
async function buscarUsuario() {
    errorMessage.innerText = '';
    const rawInput = idInput.value.trim();

    if (!rawInput) {
        exibirErro("Digite uma Tag de Acesso ou a chave do Professor.");
        return;
    }

    await carregarDadosDeUsuario();
    await carregarTrofeusDisponiveis();
    if (!dadosUsuarios) return;

    // 1. Verificação da Chave Mestre do Professor (via Hash SHA-256 seguro)
    const hashCalculado = await calcularHashSHA256(rawInput);
    if (hashCalculado === HASH_MESTRE_DOCENTE) {
        idAtual = ID_DOCENTE_ADMIN;
        usuarioAtual = dadosUsuarios[ID_DOCENTE_ADMIN];

        try {
            sessionStorage.setItem('nexus_admin_authenticated', 'true');
        } catch (e) {}

        preencherPainel(usuarioAtual, ID_DOCENTE_ADMIN);
        return;
    }

    // 2. Verificação de Tag do Estudante (4 letras + 3 números)
    const upperInput = rawInput.toUpperCase();
    if (REGEX_TAG_ESTUDANTE.test(upperInput)) {
        const usuario = dadosUsuarios[upperInput];
        if (usuario) {
            usuarioAtual = usuario;
            idAtual = upperInput;
            etapaAtual = '1';

            try {
                localStorage.setItem('nexus_dashboard_last_id', upperInput);
                if (usuario.turma) {
                    localStorage.setItem('selectedClass', usuario.turma);
                    window.dispatchEvent(new CustomEvent('classChanged', { detail: { class: usuario.turma } }));
                }
            } catch (e) {}

            preencherPainel(usuario, upperInput, etapaAtual);
        } else {
            exibirErro("Tag de estudante não cadastrada. Solicite acesso ao seu professor.");
        }
    } else {
        exibirErro("Formato inválido! A tag deve conter 4 letras e 3 números (ex: BEAT901).");
    }
}

// --- Limpar Painel / Logout ---
function limparPainel() {
    idInput.value = '';
    userDisplay.classList.add('hidden');
    idForm.classList.remove('hidden');

    try {
        localStorage.removeItem('nexus_dashboard_last_id');
    } catch (e) {}

    usuarioAtual = null;
    idAtual = null;
    etapaAtual = '1';

    document.getElementById('missoes-area').classList.remove('hidden');
    document.getElementById('notas-area').classList.remove('hidden');
    document.getElementById('evolucao-area').classList.remove('hidden');
    document.getElementById('trofeus-area').classList.remove('hidden');
    document.getElementById('estatisticas-area').classList.remove('hidden');
    document.getElementById('progresso-area').classList.remove('hidden');
    document.getElementById('mencoes').classList.remove('hidden');
    const etapaSelector = document.getElementById('etapa-selector');
    if (etapaSelector) etapaSelector.classList.remove('hidden');
    document.getElementById('professor-dashboard').classList.add('hidden');

    etapaBtns.forEach(btn => {
        btn.classList.remove('active');
        const infoDiv = btn.querySelector('.etapa-info');
        if (infoDiv) infoDiv.remove();
    });
    document.querySelector('.etapa-btn[data-etapa="1"]').classList.add('active');

    document.getElementById('lvl').innerText = 'LVL';
    document.getElementById('avatar-img').src = 'data/avatar/default_avatar.png';
    document.getElementById('trofeus-conquistados').innerHTML = '';
    document.getElementById('lista-missoes').innerHTML = '';
    const cardsGrid = document.getElementById('notas-cards-grid');
    if (cardsGrid) cardsGrid.innerHTML = '';
    const legacyGrafico = document.getElementById('notas-grafico');
    if (legacyGrafico) legacyGrafico.innerHTML = '';
    document.getElementById('media-notas').innerText = 'MÉDIA: 0.0';
    document.getElementById('mencoes').innerHTML = '<span class="area-title">MENÇÕES DE HONRA</span>';
    document.getElementById('progress-bar-fill').style.width = '0%';
    document.getElementById('progress-bar-text').innerText = '0 / 0 EXP';

    const canvas = document.getElementById('evolucao-grafico');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    const pillsRow = document.getElementById('evolucao-etapas-pills');
    if (pillsRow) pillsRow.innerHTML = '';

    document.getElementById('stat-turma').innerText = '-';
    document.getElementById('stat-missoes').innerText = '0/0';
    document.getElementById('stat-media-geral').innerText = '0.0';
    document.getElementById('stat-trofeus').innerText = '0';
}

// --- Exportação CSV ---
function exportarDadosCSV(alunos) {
    if (!alunos || alunos.length === 0) {
        alert("Sem dados para exportar.");
        return;
    }

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Tag,Nome,Turma,Media_Geral,Etapa1_MDA,Etapa1_MDEP,Etapa1_NAAG,Etapa1_NIF,Etapa1_PORT,Media_Etapa1,Missoes_Concluidas,Total_Missoes,Nivel,EXP\n";

    alunos.forEach(aluno => {
        const e1Notas = aluno.etapas && aluno.etapas["1"] && aluno.etapas["1"].notas ? aluno.etapas["1"].notas : [7,7,7,7,7];
        const m1 = e1Notas.reduce((a,b)=>a+b,0)/e1Notas.length;

        const row = [
            aluno.id,
            `"${aluno.nome}"`,
            aluno.turma || "N/A",
            aluno.stats.mediaGeral.toFixed(2).replace('.', ','),
            e1Notas[0].toFixed(1).replace('.', ','),
            e1Notas[1].toFixed(1).replace('.', ','),
            e1Notas[2].toFixed(1).replace('.', ','),
            e1Notas[3].toFixed(1).replace('.', ','),
            e1Notas[4].toFixed(1).replace('.', ','),
            m1.toFixed(2).replace('.', ','),
            aluno.stats.missoesCompletadas,
            aluno.stats.totalMissoes,
            aluno.lvl || 1,
            aluno.exp || 0
        ].join(",");
        csvContent += row + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    const dataAtual = new Date().toISOString().slice(0, 10);
    link.setAttribute("download", `nexus_turmas_matematica_${dataAtual}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// --- Inicialização e Event Listeners ---
document.addEventListener('DOMContentLoaded', async () => {
    sharedTooltip = document.getElementById('shared-tooltip');

    // Carregar banco inicial
    await carregarDadosDeUsuario();
    await carregarTrofeusDisponiveis();

    // Eventos de Autenticação
    loginBtn.addEventListener('click', buscarUsuario);
    idInput.addEventListener('keyup', (e) => {
        if (e.key === "Enter") buscarUsuario();
    });
    logoutBtn.addEventListener('click', limparPainel);

    // Toggle de Visibilidade da Senha/Tag
    if (toggleVisibilityBtn) {
        toggleVisibilityBtn.addEventListener('click', () => {
            if (idInput.type === "password") {
                idInput.type = "text";
                toggleVisibilityBtn.innerText = "🔒";
                toggleVisibilityBtn.title = "Ocultar Tag";
            } else {
                idInput.type = "password";
                toggleVisibilityBtn.innerText = "👁️";
                toggleVisibilityBtn.title = "Mostrar Tag";
            }
        });
    }

    // Botões de Etapa
    etapaBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            mudarEtapa(btn.getAttribute('data-etapa'));
        });
    });

    // Filtros e Busca no Painel Docente
    const turmaSelect = document.getElementById('professor-turma-select');
    const searchInput = document.getElementById('admin-search-input');

    if (turmaSelect) {
        turmaSelect.addEventListener('change', () => {
            renderizarDashboardProfessor(turmaSelect.value, searchInput ? searchInput.value : '', adminEtapaAtual);
        });
    }
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            renderizarDashboardProfessor(turmaSelect ? turmaSelect.value : 'all', searchInput.value, adminEtapaAtual);
        });
    }

    // Toggle de Visualização Docente: Cards vs Planilha de Notas
    const btnViewCards = document.getElementById('admin-view-cards-btn');
    const btnViewTable = document.getElementById('admin-view-table-btn');
    const containerCards = document.getElementById('professor-students-cards-container');
    const containerPanorama = document.getElementById('professor-panorama-view');

    if (btnViewCards && btnViewTable) {
        btnViewCards.addEventListener('click', () => {
            adminModoVisualizacao = 'cards';
            btnViewCards.classList.add('active');
            btnViewTable.classList.remove('active');
            if (containerCards) containerCards.classList.remove('hidden');
            if (containerPanorama) containerPanorama.classList.add('hidden');
        });

        btnViewTable.addEventListener('click', () => {
            adminModoVisualizacao = 'tabela';
            btnViewTable.classList.add('active');
            btnViewCards.classList.remove('active');
            if (containerCards) containerCards.classList.add('hidden');
            if (containerPanorama) containerPanorama.classList.remove('hidden');
        });
    }

    // Seletor de Etapas para o Professor
    document.querySelectorAll('.admin-etapa-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const novaEtapa = btn.getAttribute('data-admin-etapa') || '1';
            adminEtapaAtual = novaEtapa;
            document.querySelectorAll('.admin-etapa-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderizarDashboardProfessor(turmaSelect ? turmaSelect.value : 'all', searchInput ? searchInput.value : '', adminEtapaAtual);
        });
    });

    // Botão de Criar Estudante
    const btnOpenCreate = document.getElementById('btn-open-create-student');
    if (btnOpenCreate) {
        btnOpenCreate.addEventListener('click', abrirModalCriacao);
    }

    // Botão Gerar Tag Aleatória no Modal
    const btnGenTag = document.getElementById('btn-generate-tag');
    if (btnGenTag) {
        btnGenTag.addEventListener('click', gerarTagAleatoria);
    }

    // Fechar Modais
    document.querySelectorAll('.close-create-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            document.getElementById('create-student-modal').classList.add('hidden');
        });
    });
    document.querySelectorAll('.close-edit-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            document.getElementById('edit-student-modal').classList.add('hidden');
        });
    });

    // Submissão do Formulário de Criação de Estudante
    const createForm = document.getElementById('create-student-form');
    if (createForm) {
        createForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nome = document.getElementById('create-nome').value.trim();
            const tag = document.getElementById('create-tag').value.toUpperCase().trim();
            const turma = document.getElementById('create-turma').value;
            const avatar = document.getElementById('create-avatar').value;

            if (!REGEX_TAG_ESTUDANTE.test(tag)) {
                alert("A tag deve conter exatamente 4 letras e 3 números (ex: MARI101).");
                return;
            }

            if (dadosUsuarios[tag]) {
                alert(`Já existe um estudante com a tag ${tag}. Escolha outra ou gere aleatoriamente.`);
                return;
            }

            // Gerar missões baseadas na ementa da turma
            const ementaTurma = EMENTAS_MATEMATICA[turma] || EMENTAS_MATEMATICA["9A"];
            const etapasClonadas = JSON.parse(JSON.stringify(ementaTurma));

            // Adicionar notas padrão
            for (let etapaKey of ["1", "2", "3"]) {
                if (etapasClonadas[etapaKey]) {
                    etapasClonadas[etapaKey] = {
                        missoes: etapasClonadas[etapaKey],
                        notas: [8.0, 8.0, 8.0, 8.0, 8.0]
                    };
                }
            }

            dadosUsuarios[tag] = {
                nome: nome,
                turma: turma,
                lvl: 1,
                exp: 100,
                avatar: avatar,
                trofeus: [
                    { "nome": "Boas-Vindas Nexus", "descricao": "Ingressou no portal de aprendizagem Nexus.", "categoria": "social", "raridade": "comum" }
                ],
                mencoes: [
                    { "nome": "Novo Aluno Nexus", "descricao": `Matriculado na turma ${turma}.` }
                ],
                etapas: etapasClonadas
            };

            salvarDadosPersistentes();
            document.getElementById('create-student-modal').classList.add('hidden');
            renderizarDashboardProfessor(turmaSelect ? turmaSelect.value : 'all', searchInput ? searchInput.value : '');
            alert(`Estudante ${nome} cadastrado com sucesso com a tag ${tag}!`);
        });
    }

    // Monitorar inputs de notas no Modal de Edição para média em tempo real
    document.querySelectorAll('.nota-input').forEach(input => {
        input.addEventListener('input', atualizarMediasModalEdicao);
    });

    // Submissão do Formulário de Edição de Estudante
    const editForm = document.getElementById('edit-student-form');
    if (editForm) {
        editForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const originalId = document.getElementById('edit-original-id').value;
            const novoNome = document.getElementById('edit-nome').value.trim();
            const novaTag = document.getElementById('edit-tag').value.toUpperCase().trim();
            const novaTurma = document.getElementById('edit-turma').value;

            if (!REGEX_TAG_ESTUDANTE.test(novaTag)) {
                alert("A tag deve conter 4 letras e 3 números (ex: MARI101).");
                return;
            }

            if (novaTag !== originalId && dadosUsuarios[novaTag]) {
                alert(`A tag ${novaTag} já está em uso por outro estudante.`);
                return;
            }

            const aluno = dadosUsuarios[originalId];
            if (!aluno) return;

            aluno.nome = novoNome;
            aluno.turma = novaTurma;

            // Atualizar notas
            for (let e = 1; e <= 3; e++) {
                if (!aluno.etapas[String(e)]) {
                    aluno.etapas[String(e)] = { missoes: [], notas: [7, 7, 7, 7, 7] };
                }
                const novasNotas = [];
                for (let d = 0; d < 5; d++) {
                    const val = parseFloat(document.getElementById(`edit-n-${e}-${d}`).value) || 0;
                    novasNotas.push(Math.max(0, Math.min(10, val)));
                }
                aluno.etapas[String(e)].notas = novasNotas;
            }

            // Atualizar checklist de missões
            document.querySelectorAll('#edit-missoes-checklist input[type="checkbox"]').forEach(chk => {
                const etapaKey = chk.getAttribute('data-etapa');
                const mIdx = parseInt(chk.getAttribute('data-index'));
                if (aluno.etapas[etapaKey] && aluno.etapas[etapaKey].missoes[mIdx]) {
                    aluno.etapas[etapaKey].missoes[mIdx].completada = chk.checked;
                }
            });

            // Se a tag mudou, migrar chave
            if (novaTag !== originalId) {
                dadosUsuarios[novaTag] = aluno;
                delete dadosUsuarios[originalId];
            }

            salvarDadosPersistentes();
            document.getElementById('edit-student-modal').classList.add('hidden');
            renderizarDashboardProfessor(turmaSelect ? turmaSelect.value : 'all', searchInput ? searchInput.value : '', adminEtapaAtual);
            alert("Informações e notas do estudante atualizadas com sucesso!");
        });
    }

    // Excluir Estudante
    const btnDelete = document.getElementById('btn-delete-student');
    if (btnDelete) {
        btnDelete.addEventListener('click', () => {
            const studentId = document.getElementById('edit-original-id').value;
            const aluno = dadosUsuarios[studentId];
            if (!aluno) return;

            if (confirm(`Tem certeza de que deseja remover o estudante ${aluno.nome} [${studentId}]? Esta ação não pode ser desfeita.`)) {
                delete dadosUsuarios[studentId];
                salvarDadosPersistentes();
                document.getElementById('edit-student-modal').classList.add('hidden');
                renderizarDashboardProfessor(turmaSelect ? turmaSelect.value : 'all', searchInput ? searchInput.value : '', adminEtapaAtual);
                alert("Estudante removido com sucesso.");
            }
        });
    }

    // Botão Sair do Painel Admin
    const btnAdminLogout = document.getElementById('btn-admin-logout');
    if (btnAdminLogout) {
        btnAdminLogout.addEventListener('click', limparPainel);
    }

    // Botão Exportar CSV
    const exportBtn = document.getElementById('export-csv-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            const turmaFiltro = turmaSelect ? turmaSelect.value : 'all';
            let listaAlunos = Object.entries(dadosUsuarios)
                .filter(([id, d]) => id !== ID_DOCENTE_ADMIN && d.role !== 'admin')
                .map(([id, d]) => ({ id, ...d, stats: calcularEstatisticas(d) }));
            if (turmaFiltro !== 'all') {
                listaAlunos = listaAlunos.filter(a => a.turma === turmaFiltro);
            }
            exportarDadosCSV(listaAlunos);
        });
    }

    // Redimensionamento Dinâmico
    window.addEventListener('resize', () => {
        if (usuarioAtual && idAtual !== ID_DOCENTE_ADMIN) {
            desenharGraficoEvolucao(usuarioAtual);
        }
    });

    // Auto-login se houver sessão recente salva
    try {
        const savedId = localStorage.getItem('nexus_dashboard_last_id');
        if (savedId) {
            idInput.value = savedId;
            buscarUsuario();
        }
    } catch (e) {}

    // Tooltips nas legendas
    document.querySelectorAll('#legenda-disciplinas span').forEach(span => {
        attachTooltipEvents(span);
    });
});

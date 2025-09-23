// Tabela de Experiência Progressiva
const getExpParaNivel = (nivel) => {
    if (nivel <= 1) return 0;
    return Math.floor(100 * Math.pow(nivel - 1, 1.5));
};

const dadosUsuarios = {
    "PR0F1": { 
        nome: "Professor João Pedro Melloni Tardif Germano", 
        lvl: "99", 
        exp: 1729,
        trofeus: [
        //  { nome: "Mestre do Saber", descricao: "Por guiar mentes brilhantes ao conhecimento." },
        //  { nome: "Guia da Turma", descricao: "Referência e inspiração para todos os alunos." }
        {nome: "Enxadrista", descricao: "Jogador de xadrez assíduo."}
        ], 
        missoes: [
        //  { nome: "Lançar Notas", descricao: "Finalizar o lançamento das notas do 1º Bimestre." },
        //  { nome: "Plano de Aula", descricao: "Preparar o plano de aula para a próxima semana." },
            { nome: "Desenvolver", descricao: "Prosseguir com o desenvolvimento do portal Nexus" }
        ],
        notas: [10, 10, 10, 10, 10], 
        mencoes: [
            { nome: "Fundador", descricao: "Criador e fundador do portal de conhecimento Nexus." },
            { nome: "Matemático", descricao: "Graduado pelo Instituto Federal de Educação, Ciência e Tecnologia de São Paulo (IFSP) em Licenciatura em Matemática." },
            { nome: "Especialista", descricao: "Possui pós-graduação lato sensu em Especialização em Docência de Matemática."}
        ] 
    },
    "BR123": { 
        nome: "Beatriz Ribeiro", 
        lvl: 8, 
        exp: getExpParaNivel(8) + 150,
        trofeus: [
            { nome: "Dedicação", descricao: "Completou todas as missões por 3 semanas seguidas." },
            { nome: "Gênio da Matemática", descricao: "Acertou 95% das questões de lógica." },
            { nome: "Participação", descricao: "Ativa nos debates e discussões em aula." }
        ], 
        missoes: [
            { nome: "Projeto Biologia", descricao: "Completar e entregar o projeto sobre células." },
            { nome: "Estudar História", descricao: "Revisar o capítulo sobre a Grécia Antiga." }
        ],
        notas: [8.0, 9.0, 7.0, 8.5, 9.5], 
        mencoes: [
            { nome: "Aluna Destaque", descricao: "Reconhecimento pelo excelente desempenho em Lógica." }
        ] 
    },
    "LM456": { 
        nome: "Lucas Martins", 
        lvl: 7, 
        exp: getExpParaNivel(7) + 300,
        trofeus: [
            { nome: "Criatividade", descricao: "Autor da redação com a melhor avaliação criativa." },
            { nome: "Leitor Voraz", descricao: "Leu todos os livros recomendados do bimestre." }
        ], 
        missoes: [
            { nome: "Entregar Redação", descricao: "Finalizar a redação de Português sobre modernismo." },
            { nome: "Ler Geografia", descricao: "Ler o capítulo 5 sobre relevo brasileiro." }
        ],
        notas: [7.0, 6.5, 8.0, 9.0, 7.5], 
        mencoes: [
            { nome: "Melhor Conto", descricao: "Vencedor do concurso de contos do mês." }
        ] 
    },
    "JV789": { 
        nome: "Juliana Vasconcelos", 
        lvl: 9, 
        exp: getExpParaNivel(9) + 50,
        trofeus: [
            { nome: "Liderança", descricao: "Coordenou com sucesso 3 projetos em grupo." },
            { nome: "Expert em Química", descricao: "Nota máxima no experimento de laboratório." }
        ], 
        missoes: [
            { nome: "Organizar Grupo", descricao: "Montar o grupo de estudos para a prova de Física." },
            { nome: "Finalizar Experimento", descricao: "Concluir o relatório do experimento de Química." },
            { nome: "Apresentar Trabalho", descricao: "Preparar a apresentação sobre vulcões." },
            { nome: "Resolver Lista", descricao: "Fazer a lista de exercícios de Álgebra." },
            { nome: "Pesquisar Tema", descricao: "Iniciar a pesquisa para o seminário de Sociologia." },
            { nome: "Rascunhar Tese", descricao: "Escrever o primeiro rascunho da tese de Filosofia." },
            { nome: "Praticar Idioma", descricao: "Fazer 30 minutos de prática de Espanhol." }
        ],
        notas: [2.0, 3.5, 4.8, 7.0, 8.2], 
        mencoes: [
            { nome: "Representante", descricao: "Eleita representante de turma por seus colegas." },
            { nome: "Menção Honrosa", descricao: "Participação de destaque na feira de ciências." }
        ] 
    }
};
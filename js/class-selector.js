// class-selector.js
// Gerencia a seleção de turma e o filtro de conteúdo por turma

const CLASS_STORAGE_KEY = 'selectedClass';
const DEFAULT_CLASS = '9A';

// Lista de turmas disponíveis
const CLASSES = [
  { id: '9A', name: '9º Ano A', year: '9ano' },
  { id: '9B', name: '9º Ano B', year: '9ano' },
  { id: '1A', name: '1º Ano EM A', year: '1em' },
  { id: '1B', name: '1º Ano EM B', year: '1em' },
  { id: '2EM', name: '2º Ano EM', year: '2em' },
  { id: '3EM', name: '3º Ano EM', year: '3em' }
];

// Obtém a turma atualmente selecionada
function getSelectedClass() {
  return localStorage.getItem(CLASS_STORAGE_KEY) || DEFAULT_CLASS;
}

// Define a turma selecionada
function setSelectedClass(classId) {
  localStorage.setItem(CLASS_STORAGE_KEY, classId);
  updateClassDisplay();
  filterContentByClass(classId);
  loadCurriculumForClass(classId);

  // Dispara evento customizado para outras partes da aplicação
  const event = new CustomEvent('classChanged', { detail: { classId } });
  window.dispatchEvent(event);
}

// Atualiza a exibição do seletor de turma
function updateClassDisplay() {
  const selectedClass = getSelectedClass();
  const selector = document.getElementById('class-selector');

  if (selector) {
    selector.value = selectedClass;
  }

  // Atualiza o texto do botão se existir
  const classButton = document.getElementById('current-class-display');
  if (classButton) {
    const classObj = CLASSES.find(c => c.id === selectedClass);
    classButton.textContent = classObj ? classObj.name : selectedClass;
  }
}

// Filtra recursos por turma selecionada
function filterContentByClass(classId) {
  // Filtra botões de recursos (todos os links na página de recursos)
  const resourceButtons = document.querySelectorAll('.quick-link-button');

  resourceButtons.forEach(button => {
    const href = button.getAttribute('href');

    if (!href) {
      button.style.display = '';
      return;
    }

    // Extrair nome do arquivo do href
    const fileName = href.split('/').pop(); // Ex: "9ANO-FUNCOES.html"

    // Determinar para quais turmas este recurso está disponível
    const availableForClasses = getClassesFromFileName(fileName);

    // Verificar se o recurso deve ser mostrado para a turma selecionada
    const shouldShow = availableForClasses.includes('all') || availableForClasses.includes(classId);

    if (shouldShow) {
      button.style.display = '';
      button.classList.remove('hidden');
    } else {
      button.style.display = 'none';
      button.classList.add('hidden');
    }
  });
}

// Determina quais turmas podem acessar um recurso baseado no nome do arquivo
function getClassesFromFileName(fileName) {
  // Remover extensão .html
  const nameWithoutExt = fileName.replace('.html', '');

  // Mapeamento de prefixos para turmas
  const prefixMap = {
    '9ANO': ['9A', '9B'],
    '1EM': ['1A', '1B'],
    '2EM': ['2EM'],
    '3EM': ['3EM']
  };

  // Verificar se o arquivo tem um prefixo de turma
  for (const [prefix, classes] of Object.entries(prefixMap)) {
    if (nameWithoutExt.startsWith(prefix + '-')) {
      return classes;
    }
  }

  // Se não tem prefixo de turma, está disponível para todas
  return ['all'];
}

// Carrega o currículo específico da turma
function loadCurriculumForClass(classId) {
  const curriculumContainer = document.getElementById('curriculum-container');

  if (!curriculumContainer) {
    return; // Não está na página que exibe o currículo
  }

  // Mapeamento de turma para arquivo de currículo
  const curriculumFile = `data/curriculum-${classId}.json`;

  fetch(curriculumFile)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Currículo não encontrado para turma ${classId}`);
      }
      return response.json();
    })
          .then(data => {
            renderCurriculum(data.curriculum);
          })    .catch(error => {
      console.error('Erro ao carregar currículo:', error);
      // Fallback para currículo padrão
      fetch('data/curriculum.json')
        .then(response => response.json())
        .then(data => renderCurriculum(data))
        .catch(err => {
          curriculumContainer.innerHTML = '<p>Erro ao carregar currículo.</p>';
          console.error('Erro ao carregar currículo padrão:', err);
        });
    });
}

// Renderiza o currículo na página
function renderCurriculum(curriculumData) {
  const container = document.getElementById('curriculum-container');

  if (!container) return;

  container.innerHTML = '';

  curriculumData.forEach((chapter, index) => {
    const chapterDiv = document.createElement('div');
    chapterDiv.className = 'curriculum-chapter';

    const chapterTitle = document.createElement('h3');
    chapterTitle.textContent = chapter.title;
    chapterDiv.appendChild(chapterTitle);

    if (chapter.topics && chapter.topics.length > 0) {
      const topicsList = document.createElement('ol');
      topicsList.className = 'curriculum-topics';

      chapter.topics.forEach(topic => {
        const topicItem = document.createElement('li');
        topicItem.textContent = topic;
        topicsList.appendChild(topicItem);
      });

      chapterDiv.appendChild(topicsList);
    }

    container.appendChild(chapterDiv);
  });
}

// Inicializa o seletor de turma
function initClassSelector() {
  const selectedClass = getSelectedClass();

  // Cria o seletor de turma se não existir
  const nav = document.querySelector('nav ul');
  if (nav && !document.getElementById('class-selector-container')) {
    const selectorLi = document.createElement('li');
    selectorLi.id = 'class-selector-container';
    selectorLi.className = 'class-selector-item';

    const selectorLabel = document.createElement('label');
    selectorLabel.textContent = 'Turma: ';
    selectorLabel.htmlFor = 'class-selector';

    const selector = document.createElement('select');
    selector.id = 'class-selector';
    selector.className = 'class-selector';

    CLASSES.forEach(classObj => {
      const option = document.createElement('option');
      option.value = classObj.id;
      option.textContent = classObj.name;
      if (classObj.id === selectedClass) {
        option.selected = true;
      }
      selector.appendChild(option);
    });

    selector.addEventListener('change', (e) => {
      setSelectedClass(e.target.value);
    });

    selectorLi.appendChild(selectorLabel);
    selectorLi.appendChild(selector);
    nav.appendChild(selectorLi);
  }

  // Aplica filtros iniciais
  updateClassDisplay();
  filterContentByClass(selectedClass);
  loadCurriculumForClass(selectedClass);
}

// Inicializa quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initClassSelector);
} else {
  initClassSelector();
}

// Exporta funções para uso externo
window.ClassSelector = {
  getSelectedClass,
  setSelectedClass,
  getClasses: () => CLASSES,
  filterContentByClass,
  loadCurriculumForClass
};

document.addEventListener('DOMContentLoaded', async () => {
    const curriculumContainer = document.getElementById('curriculum-container');
    if (!curriculumContainer) {
        console.error('Curriculum container not found!');
        return;
    }

    try {
        const response = await fetch('data/curriculum.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        renderCurriculum(data.curriculum, curriculumContainer);
    } catch (error) {
        console.error('Failed to load curriculum data:', error);
        curriculumContainer.innerHTML = '<p>Erro ao carregar o conteúdo. Tente novamente mais tarde.</p>';
    }
});

function renderCurriculum(curriculum, container) {
    const mainList = document.createElement('ul');

    curriculum.forEach(chapter => {
        const chapterItem = document.createElement('li');

        const chapterTitle = document.createElement('h3');
        chapterTitle.innerHTML = `<strong>${chapter.title}</strong>`;
        chapterItem.appendChild(chapterTitle);

        const topicsList = document.createElement('ul');
        chapter.topics.forEach((topic, index) => {
            const topicItem = document.createElement('li');
            topicItem.innerHTML = `<strong>${index + 1}. </strong>${topic}`;
            topicsList.appendChild(topicItem);
        });

        chapterItem.appendChild(topicsList);
        mainList.appendChild(chapterItem);
    });

    container.appendChild(mainList);
}
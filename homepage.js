document.addEventListener('DOMContentLoaded', () => {
    fetch('blocks.json')
        .then(response => response.json())
        .then(data => {
            const gridContainer = document.getElementById('grid-container');
            gridContainer.innerHTML = '';
            Object.keys(data).forEach(block => {
                const blockElement = document.createElement('div');
                blockElement.classList.add('grid-item');
                blockElement.textContent = block;
                blockElement.addEventListener('click', () => {
                    loadBlock(data[block]);
                });
                gridContainer.appendChild(blockElement);
            });
        });
});

function loadBlock(tvs) {
    const gridContainer = document.getElementById('grid-container');
    gridContainer.innerHTML = '';
    tvs.forEach(tv => {
        const tvElement = document.createElement('div');
        tvElement.classList.add('grid-item');
        tvElement.innerHTML = `
            ${tv}
            <img src="images/${tv}/${tv}-wallpaper1.png?${new Date().getTime()}" alt="Current Wallpaper 1">
        `;
        tvElement.addEventListener('click', () => {
            window.location.href = `upload.html?tv=${tv}`;
        });
        gridContainer.appendChild(tvElement);
    });
}

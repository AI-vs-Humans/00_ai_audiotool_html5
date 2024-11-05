// Basic tiling manager functionality
document.querySelectorAll('.tile').forEach(tile => {
    tile.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.id);
    });

    tile.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    tile.addEventListener('drop', (e) => {
        e.preventDefault();
        const id = e.dataTransfer.getData('text');
        const draggableElement = document.getElementById(id);
        const dropzone = e.target.closest('.tile');
        dropzone.appendChild(draggableElement);
    });
});

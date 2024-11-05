document.getElementById('file1').addEventListener('change', function () {
    loadAudio(1);
});
document.getElementById('file2').addEventListener('change', function () {
    loadAudio(2);
});
document.getElementById('sample-file').addEventListener('change', function () {
    loadSample();
});

function loadAudio(deck) {
    const fileInput = document.getElementById(`file${deck}`);
    const audio = document.getElementById(`audio${deck}`);
    const file = fileInput.files[0];
    const url = URL.createObjectURL(file);
    audio.src = url;
}

function loadSample() {
    const fileInput = document.getElementById('sample-file');
    const audio = document.getElementById('sample-audio');
    const file = fileInput.files[0];
    const url = URL.createObjectURL(file);
    audio.src = url;
}

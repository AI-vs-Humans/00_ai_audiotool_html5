document.getElementById('fileA').addEventListener('change', function () {
    loadTrack('A');
});
document.getElementById('fileB').addEventListener('change', function () {
    loadTrack('B');
});

let audioContext;
let recorder;
let recordedChunks = [];

function loadTrack(deck) {
    const fileInput = document.getElementById(`file${deck}`);
    const audio = document.getElementById(`audio${deck}`);
    const file = fileInput.files[0];
    const url = URL.createObjectURL(file);
    audio.src = url;
    audio.onloadedmetadata = function () {
        document.getElementById(`seek${deck}`).max = audio.duration;
    };
}

function playPause(deck) {
    const audio = document.getElementById(`audio${deck}`);
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

document.getElementById('volumeA').addEventListener('input', function () {
    const audio = document.getElementById('audioA');
    audio.volume = this.value;
});

document.getElementById('volumeB').addEventListener('input', function () {
    const audio = document.getElementById('audioB');
    audio.volume = this.value;
});

document.getElementById('seekA').addEventListener('input', function () {
    const audio = document.getElementById('audioA');
    audio.currentTime = this.value;
});

document.getElementById('seekB').addEventListener('input', function () {
    const audio = document.getElementById('audioB');
    audio.currentTime = this.value;
});

function startRecording() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const inputA = audioContext.createMediaElementSource(document.getElementById('audioA'));
    const inputB = audioContext.createMediaElementSource(document.getElementById('audioB'));

    const destination = audioContext.createMediaStreamDestination();
    inputA.connect(destination);
    inputB.connect(destination);

    recorder
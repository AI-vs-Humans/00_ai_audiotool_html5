document.getElementById('file1').addEventListener('change', function() {
    loadTrack(1);
});
document.getElementById('file2').addEventListener('change', function() {
    loadTrack(2);
});

let audioContext;
let recorder;
let recordedChunks = [];
let wavesurfer1, wavesurfer2;

function loadTrack(playerNumber) {
    const fileInput = document.getElementById(`file${playerNumber}`);
    const audio = document.getElementById(`audio${playerNumber}`);
    const file = fileInput.files[0];
    const url = URL.createObjectURL(file);
    audio.src = url;

    if (playerNumber === 1) {
        wavesurfer1.load(url);
    } else {
        wavesurfer2.load(url);
    }
}

function playPause(playerNumber) {
    const audio = document.getElementById(`audio${playerNumber}`);
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

document.getElementById('volume1').addEventListener('input', function() {
    const audio = document.getElementById('audio1');
    audio.volume = this.value;
});

document.getElementById('volume2').addEventListener('input', function() {
    const audio = document.getElementById('audio2');
    audio.volume = this.value;
});

document.getElementById('crossfader').addEventListener('input', function() {
    const value = this.value;
    const audio1 = document.getElementById('audio1');
    const audio2 = document.getElementById('audio2');
    audio1.volume = 1 - value;
    audio2.volume = value;
});

function startRecording() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const input = audioContext.createMediaElementSource(document.getElementById('audio1'));
    const input2 = audioContext.createMediaElementSource(document.getElementById('audio2'));

    const destination = audioContext.createMediaStreamDestination();
    input.connect(destination);
    input2.connect(destination);

    recorder = new MediaRecorder(destination.stream);

    recorder.ondataavailable = event => {
        if (event.data.size > 0) {
            recordedChunks.push(event.data);
        }
    };

    recorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: 'audio/wav' });
        recordedChunks = [];

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.style = 'display: none';
        a.href = url;
        a.download = 'mix.wav';
        a.click();
        window.URL.revokeObjectURL(url);
    };

    recorder.start();
}

function stopRecording() {
    recorder.stop();
}

function exportRecording(format) {
    const mimeType = format === 'mp3' ? 'audio/mpeg' : 'audio/wav';
    const blob = new Blob(recordedChunks, { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style = 'display: none';
    a.href = url;
    a.download = `mix.${format}`;
    a.click();
    window.URL.revokeObjectURL(url);
}

document.addEventListener('DOMContentLoaded', () => {
    wavesurfer1 = WaveSurfer.create({
        container: '#waveform1',
        waveColor: '#ddd',
        progressColor: '#333'
    });

    wavesurfer2 = WaveSurfer.create({
        container: '#waveform2',
        waveColor: '#ddd',
        progressColor: '#333'
    });
});

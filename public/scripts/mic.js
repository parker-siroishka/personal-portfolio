
let VOLUME = 0;

window.addEventListener('load', (e) => {
    init();
})

function init() {
    var audioContext = new(window.AudioContext || window.webkitAudioContext)();
    var microphone;

    var analyser = audioContext.createAnalyser();

    if (navigator.mediaDevices.getUserMedia) {
        console.log('getUserMedia supported.');
        var constraints = { audio: true }
        navigator.mediaDevices.getUserMedia(constraints)
            .then(function(stream) {
                microphone = audioContext.createMediaStreamSource(stream);
                microphone.connect(analyser);
                //analyser.connect(audioContext.destination);
                beginRecording();
            })
            .catch(function(err) {
                console.error('error: ' + err);
            })
    } else {
        console.error('getUserMedia unsupported by browser');
    }

    function beginRecording() {
        analyser.fftSize = 1024; // power of 2, between 32 and max unsigned integer
        var bufferLength = analyser.fftSize;

        var freqBinDataArray = new Uint8Array(bufferLength);

        var checkAudio = function() {
            analyser.getByteFrequencyData(freqBinDataArray);
            VOLUME = getRMS(freqBinDataArray);
            //console.log('Volume: ' + getRMS(freqBinDataArray));
            //console.log('Freq Bin: ' + getIndexOfMax(freqBinDataArray));
            //console.log(freqBinDataArray);
            console.log(VOLUME);
            document.getElementById("volume").innerHTML = "Volume: " + VOLUME.toFixed(2);
        }

        setInterval(checkAudio, 250);
    }
}

setInterval(
    function(VOLUME){
        
    }, 250
)


function getRMS(spectrum) {
    var rms = 0;
    for (var i = 0; i < spectrum.length; i++) {
        rms += spectrum[i] * spectrum[i];
    }
    rms /= spectrum.length;
    rms = Math.sqrt(rms);
    return rms;
}

function getIndexOfMax(array) {
    return array.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
}
/**
 * 
 * ActionShot
 * © 2021 Parker Siroishka
 * 
 * UCID: 30024936
 * 
 * 
 * Initial Microphone setup created by Michael Hung 
 * Teaching Assistant for CPSC 581 - Winter 2021
 * Website: https://contacts.ucalgary.ca/info/cpsc/profiles/1-8497385
 */

var VOLUME = 0;
var GAIN = 1;
var CAM_PRIMED = true;
var resetBtn = document.getElementById("resetCam");
var startBtn = document.getElementById("start");



startBtn.addEventListener('click', (e) => {
    init();
    startBtn.style.animation = "none";
})

function init() {

  
    // Older browsers might not implement mediaDevices at all, so we set an empty object first
    if (navigator.mediaDevices === undefined) {
      navigator.mediaDevices = {};
    }
  
  
    // Some browsers partially implement mediaDevices. We can't just assign an object
    // with getUserMedia as it would overwrite existing properties.
    // Here, we will just add the getUserMedia property if it's missing.
    if (navigator.mediaDevices.getUserMedia === undefined) {
      navigator.mediaDevices.getUserMedia = function(constraints) {
  
        // First get ahold of the legacy getUserMedia, if present
        var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
  
        // Some browsers just don't implement it - return a rejected promise with an error
        // to keep a consistent interface
        if (!getUserMedia) {
          return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
        }
  
        // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
        return new Promise(function(resolve, reject) {
          getUserMedia.call(navigator, constraints, resolve, reject);
        });
      }
    }

    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var source;

    var analyser = audioCtx.createAnalyser();
    analyser.minDecibels = -90;
    analyser.maxDecibels = -10;
    analyser.smoothingTimeConstant = 0.85;

    var voiceVolume = audioCtx.createGain();

    if (navigator.mediaDevices.getUserMedia) {
        console.log('getUserMedia supported.');
        var constraints = {audio: true}
        navigator.mediaDevices.getUserMedia (constraints)
           .then(
             function(stream) {
                source = audioCtx.createMediaStreamSource(stream);
                
                //voiceVolume.connect(analyser);
                source.connect(voiceVolume).connect(analyser).connect(audioCtx.destination);;
                beginRecording();
   
                
           })
           .catch( function(err) { console.log('The following gUM error occured: ' + err);})
     } else {
        console.log('getUserMedia not supported on your browser!');
     }

     function beginRecording() {
        analyser.fftSize = 1024; // power of 2, between 32 and max unsigned integer
        var bufferLength = analyser.fftSize;

        var freqBinDataArray = new Uint8Array(bufferLength);

        var checkAudio = function() {
            voiceVolume.gain.setValueAtTime(GAIN, audioCtx.currentTime);
            analyser.getByteFrequencyData(freqBinDataArray);
            VOLUME = getRMS(freqBinDataArray);
            // console.log(VOLUME);
            // console.log('Volume: ' + getRMS(freqBinDataArray));
            // console.log(freqBinDataArray);
            document.getElementById("volume").innerHTML = "Volume: " + VOLUME.toFixed(2);
            if(VOLUME > 5) {
                if(CAM_PRIMED){
                    snapPhoto();
                    CAM_PRIMED = !CAM_PRIMED;
                    canv.style.border = "5px solid #CD5C5C";
                    canv.style.borderRadius = "5px";
                    resetBtn.style.visibility = "visible";
                    $('#canvas').hide().fadeIn(2500);
                }
            }
        }
        setInterval(checkAudio, 100);
    }
}


// Returns Maximum volume from one sample bin
function getRMS(spectrum) {
    var rms = 0;
    for (var i = 0; i < spectrum.length; i++) {
        rms += spectrum[i] * spectrum[i];
    }
    rms /= spectrum.length;
    rms = Math.sqrt(rms);
    return rms;
}


/**
 * Webcam integrations implemented through the open-source access of 
 * webcam-easy created by: Benson Ruan
 * 
 * Found at: https://github.com/bensonruan/webcam-easy
 * Article / Tutorial found at: https://bensonruan.com/how-to-access-webcam-and-take-photo-with-javascript/
 *  
 */


const webcamElement = document.getElementById('webcam');
const canvasElement = document.getElementById('canvas');
const webcam = new Webcam(webcamElement, 'user', canvasElement);

webcam.start()
   .then(result =>{
      console.log("webcam started");
   })
   .catch(err => {
       console.log(err);
   });


function snapPhoto() {
    let picture = webcam.snap();
    document.querySelector('#download-photo').href = picture;
}

function primeCamera() {

    document.getElementById("countdown").style.display = "block";
    var timeleft = 10;
    var downloadTimer = setInterval(function(){
        if(timeleft <= 0){
            clearInterval(downloadTimer);
            document.getElementById("countdown").innerHTML = "Camera Primed";
        } else {
            document.getElementById("countdown").innerHTML = "Camera Primed in " + timeleft + " seconds";
        }
        timeleft -= 1;
    }, 1000);

    setTimeout(function() {
        CAM_PRIMED = true;
        resetBtn.style.visibility = "hidden";
        document.getElementById("countdown").style.display = "none";
    }, 11000);
    
    

}

var canv = document.getElementById("canvas");

$("#snapPhoto").click(function () {
    snapPhoto();
    canv.style.border = "5px solid #CD5C5C";
    canv.style.borderRadius = "5px";
    
    $('#canvas').hide().fadeIn(2500);
});

var webcamEl = document.getElementById("webcam");

$('#cameraFlip').click(function() {
    webcamEl.style.transition = "transform 1s";
    webcamEl.style.transform = "rotateY(180deg)";
    webcam.flip();
    webcam.start();  
});


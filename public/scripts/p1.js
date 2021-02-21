// let VOLUME = 0;
// let PIC_TAKEN = false;
// var audioContext;



// function init() {
//     audioContext = new(window.AudioContext || window.webkitAudioContext)();

//     document.getElementById("micOn").addEventListener("click", function() {
//         audioContext.resume();
//     });

//     setInterval(function(){
        
//     }, 250);


//     var microphone;

//     var analyser = audioContext.createAnalyser();

//     if (navigator.mediaDevices.getUserMedia) {
//         console.log('getUserMedia supported.');
//         var constraints = { audio: true }
//         navigator.mediaDevices.getUserMedia(constraints)
//             .then(function(stream) {
//                 microphone = audioContext.createMediaStreamSource(stream);
//                 microphone.connect(analyser);
//                 //analyser.connect(audioContext.destination);
//                 beginRecording();
//             })
//             .catch(function(err) {
//                 console.error('error: ' + err);
//             })
//     } else {
//         console.error('getUserMedia unsupported by browser');
//     }

    // function beginRecording() {
    //     analyser.fftSize = 1024; // power of 2, between 32 and max unsigned integer
    //     var bufferLength = analyser.fftSize;

    //     var freqBinDataArray = new Uint8Array(bufferLength);

    //     var checkAudio = function() {
    //         analyser.getByteFrequencyData(freqBinDataArray);
    //         VOLUME = (VOLUME > 20) ? 0 : getRMS(freqBinDataArray);
    //         console.log(VOLUME);
    //         //console.log('Volume: ' + getRMS(freqBinDataArray));
    //         //console.log('Freq Bin: ' + getIndexOfMax(freqBinDataArray));
    //         //console.log(freqBinDataArray);
            
    //         document.getElementById("volume").innerHTML = "Volume: " + VOLUME.toFixed(2);
    //         if(VOLUME > 20) {
    //             takePhoto();
    //             VOLUME = 0
    //             audioContext.suspend();
    //         }
    //     }

    //     setInterval(checkAudio, 50);
    // }
// }




// function getRMS(spectrum) {
//     var rms = 0;
//     for (var i = 0; i < spectrum.length; i++) {
//         rms += spectrum[i] * spectrum[i];
//     }
//     rms /= spectrum.length;
//     rms = Math.sqrt(rms);
//     return rms;
// }

// function getIndexOfMax(array) {
//     return array.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
// }


window.addEventListener('click', (e) => {
    init();
})

function init() {
    document.body.removeEventListener('click', init)
  
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
    var stream;

    var analyser = audioCtx.createAnalyser();
    analyser.minDecibels = -90;
    analyser.maxDecibels = -10;
    analyser.smoothingTimeConstant = 0.85;

    var distortion = audioCtx.createWaveShaper();
    var gainNode = audioCtx.createGain();
    var biquadFilter = audioCtx.createBiquadFilter();
    var convolver = audioCtx.createConvolver();

    if (navigator.mediaDevices.getUserMedia) {
        console.log('getUserMedia supported.');
        var constraints = {audio: true}
        navigator.mediaDevices.getUserMedia (constraints)
           .then(
             function(stream) {
                source = audioCtx.createMediaStreamSource(stream);
                
                gainNode.connect(analyser);
                source.connect(analyser);
                analyser.connect(audioCtx.destination);
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
            analyser.getByteFrequencyData(freqBinDataArray);
            VOLUME = getRMS(freqBinDataArray);
            console.log(VOLUME);
            console.log('Volume: ' + getRMS(freqBinDataArray));
            console.log('Freq Bin: ' + getIndexOfMax(freqBinDataArray));
            console.log(freqBinDataArray);
            
            document.getElementById("volume").innerHTML = "Volume: " + freqBinDataArray;//VOLUME.toFixed(2);
            // if(VOLUME > 20) {
            //     takePhoto();
            //     VOLUME = 0
            //     audioContext.suspend();
            // }
        }

        setInterval(checkAudio, 50);
    }

}


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

var volumeText =  document.getElementById("volume");


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

   	
var picture;

function snapPicture() {
    picture = webcam.snap();
    picture();
}


document.querySelector('#download-photo').href = picture;

$('#cameraFlip').click(function() {
    webcam.flip();
    webcam.start();  
});
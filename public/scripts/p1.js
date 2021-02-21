// let VOLUME = 0;
// let PIC_TAKEN = false;
// var audioContext;

// window.addEventListener('load', (e) => {
//     init();
// })

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

//     function beginRecording() {
//         analyser.fftSize = 1024; // power of 2, between 32 and max unsigned integer
//         var bufferLength = analyser.fftSize;

//         var freqBinDataArray = new Uint8Array(bufferLength);

//         var checkAudio = function() {
//             analyser.getByteFrequencyData(freqBinDataArray);
//             VOLUME = (VOLUME > 20) ? 0 : getRMS(freqBinDataArray);
//             console.log(VOLUME);
//             //console.log('Volume: ' + getRMS(freqBinDataArray));
//             //console.log('Freq Bin: ' + getIndexOfMax(freqBinDataArray));
//             //console.log(freqBinDataArray);
            
//             document.getElementById("volume").innerHTML = "Volume: " + VOLUME.toFixed(2);
//             if(VOLUME > 20) {
//                 takePhoto();
//                 VOLUME = 0
//                 audioContext.suspend();
//             }
//         }

//         setInterval(checkAudio, 50);
//     }
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




// // Grab elements, create settings, etc.
// var video = document.getElementById('video');

// // Get access to the camera!
// if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//     // Not adding `{ audio: true }` since we only want video now
//     navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
//         //video.src = window.URL.createObjectURL(stream);
//         video.srcObject = stream;
//         video.play();
//     });
// }

// // Elements for taking the snapshot
// var canvas = document.getElementById('canvas');
// var context = canvas.getContext('2d');
// var video = document.getElementById('video');

// // Trigger photo take
// document.getElementById("snap").addEventListener("click", function() {
// 	context.drawImage(video, 0, 0, 640, 480);
// });

// function takePhoto(){
//     context.drawImage(video, 0, 0, 640, 480);
// }

// //setInterval(takePhoto, 500);


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

   	
function snapPicture() {
    webcam.snap();
}

document.querySelector('#download-photo').href = picture;

$('#cameraFlip').click(function() {
    webcam.flip();
    webcam.start();  
});
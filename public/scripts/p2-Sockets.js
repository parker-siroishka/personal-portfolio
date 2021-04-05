var localVid = $("#localVideo");
var remoteVid = $("#remoteVideo");
var btn1 = $("#btn-client1");
var btn2 = $("#btn-client2");
var gparentsHide = $("#gparents-hide");
var theInput = $("#msgInput");
var callBtn = $("#btn-call");
var endBtn = $("#btn-end");
var snapBtn = $("#snap");
var msgDiv = $("#msgDiv");
var concealer = $("#concealer");
var leftHand = $('#leftHand');
var rightHand = $('#rightHand');
var buttonsDiv = $('#buttonsDiv');
var getAttention = $('#get-attention');
var audioFiles = document.getElementsByTagName("audio");
var beaver = $('#beaver');
var fox = $('#fox');
var turtle = $('#turtle');
var wolf = $('#wolf');
var canvas = document.querySelector('canvas');
var canvasJQ = $("#screenshot");
var context = canvas.getContext('2d');
Rvideo = document.getElementById('remoteVideo');
var animals = [beaver, fox, turtle, wolf];

leftHand.css("display", "none");
rightHand.css("display", "none");
beaver.css("display", "none");
fox.css("display", "none");
turtle.css("display", "none");
wolf.css("display", "none");
concealer.css("visibility", "hidden");
canvas.style.display = "none";



var localStream;
var peerConnection;
var serverConnection;

var isHiding = false;
var shakingAnimal = false;
var whoami = "";
var w;
var h;
var ratio;

const peerConnectionConfig = {
    iceServers: [
        { urls: "stun:stun.stunprotocol.org:3478" },
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" },
        { urls: "stun:stun2.l.google.com:19302" },
        { urls: "stun:stun3.l.google.com:19302" },
        { urls: "stun:stun4.l.google.com:19302" },
        { urls: "stun:stun.ekiga.net" },
        { urls: "stun:stun.fwdnet.net" },
        { urls: "stun:stun.ideasip.com" },
        { urls: "stun:stun.iptel.org" },
    ],
};

const MessageType = {
    SERVER_INFO: 0,
    RHYS: 1,
    GPARENT: 2,
    CALL_REQUEST: 3,
};

btn1.on("click", () => {
    getWebcam();
    whoami = "rhys";
    btn2.prop("disabled", true);
    destination = "ws://" + location.host + "/rhys";
    serverConnection = new WebSocket(destination);
    serverConnection.onmessage = handleMessage;
    btn1.css("display", "none");
});

btn2.on("click", () => {
    getWebcam();
    whoami = "gparent";
    btn1.prop("disabled", true);
    destination = "ws://" + location.host + "/gparent";
    serverConnection = new WebSocket(destination);
    serverConnection.onmessage = handleMessage;
    btn2.css("display", "none");

});

callBtn.on("click", () => {
    start(true);
    // buttonsDiv.css("display", "block");
    callBtn.css("display", "none");
    endBtn.css("display", "block");
    
});

endBtn.on("click", () => {
    if(whoami == "gparent"){
        serverConnection.send(
            JSON.stringify({
                type: MessageType.GPARENT,
                message: "endcall",
            })
        );
    } else if(whoami == "rhys"){
        serverConnection.send(
            JSON.stringify({
                type: MessageType.RHYS,
                message: "endcall",
            })
        );
    }
    peerConnection.close();
    remoteVid.fadeOut("slow");
});

getAttention.on("click", () => {
    shakingAnimal = true;
    serverConnection.send(
        JSON.stringify({
            type: MessageType.GPARENT,
            message: "attention",
        })
    );
});

gparentsHide.on("click", () => {
    if(gparentsHide.text() == "Hide"){
        gparentsHide.html("Hiding");
    }
    else{
        gparentsHide.html("Hide");
    }
    serverConnection.send(
        JSON.stringify({
            type: MessageType.GPARENT,
            message: "hiding",
        })
    );
});

Rvideo.addEventListener('loadedmetadata', function() {
    ratio = Rvideo.videoWidth / Rvideo.videoHeight;
    w = Rvideo.videoWidth - 100;
    h = parseInt(w / ratio, 10);
    canvas.width = w;
    canvas.height = h;
}, false);

snapBtn.on("click", () => {
    context.fillRect(0, 0, w, h);
    context.drawImage(Rvideo, 0, 0, w, h);
    //canvas.style.display = "block";
    canvasJQ.fadeIn(1500);
    
});

function getWebcam() {

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
    
      if (navigator.mediaDevices.getUserMedia) {
        console.log('getUserMedia supported.');
        var constraints = {video: true, audio: true}
        navigator.mediaDevices.getUserMedia (constraints)
           .then(
             function(stream) {
                localStream = stream;
                localVid.prop("srcObject", stream);
           })
           .catch( function(err) { console.log('The following gUM error occured: ' + err);})
     } else {
        console.log('getUserMedia not supported on your browser!');
     }
}

function start(isCaller) {
    peerConnection = new RTCPeerConnection(peerConnectionConfig);
    peerConnection.onicecandidate = gotIceCandidate;
    peerConnection.ontrack = gotRemoteStream;
    peerConnection.addStream(localStream);

    if (isCaller) {
        peerConnection.createOffer().then(createdDescription).catch(errorHandler); // using chained Promises for async
    }
}

function gotIceCandidate(event) {
    if (event.candidate != null) {
        serverConnection.send(
            JSON.stringify({
                type: MessageType.CALL_REQUEST,
                ice: event.candidate,
                message: "Sending ICE candidate",
            })
        );
    }
}

function createdDescription(description) {
    console.log("got description");

    peerConnection
        .setLocalDescription(description)
        .then(() => {
            serverConnection.send(
                JSON.stringify({
                    type: MessageType.CALL_REQUEST,
                    sdp: peerConnection.localDescription,
                    message: "Requesting call",
                })
            );
        })
        .catch(errorHandler);
}

function gotRemoteStream(event) {
    console.log("got remote stream");
    remoteVid.prop("srcObject", event.streams[0]);
    msgDiv.html("Connected to peer.");
    callBtn.css("display", "none");
}

function handleMessage(mEvent) {
    var msg = JSON.parse(mEvent.data);

    switch (msg.type) {
        case MessageType.SERVER_INFO:
            msgDiv.html(msg.message);
            break;

            // Message came from Rhys, Handle as gparent
        case MessageType.RHYS:
            
            break;

            // Message came from gparent, Handle as Rhys
        case MessageType.GPARENT:
            switch(msg.message) {
                case "hiding":
                    isHiding = !isHiding;
                    var handDirection = (isHiding) ? "30%" : "0%";
                    if(isHiding){
                        leftHand.fadeIn(50);
                        rightHand.fadeIn(50);
                        leftHand.animate({left: handDirection});
                        rightHand.animate({right: handDirection});
                    } else{
                        leftHand.animate({left: handDirection});
                        rightHand.animate({right: handDirection});
                        leftHand.fadeOut(50);
                        rightHand.fadeOut(50);
                    }
                    
                    
                    var hidingProp = (isHiding) ? "visible" : "hidden";
                    concealer.css("visibility", hidingProp);
                    break;
                
                    case "attention":
                    var currentSound = audioFiles[Math.floor(Math.random() * audioFiles.length)];
                    if(shakingAnimal){
                    }
                    var currentAnimal = animals[Math.floor(Math.random() * animals.length)];
                    currentAnimal.fadeIn(100);
                    currentSound.play();
                    var rotateAngle = 30;
                    for (let i = 0; i < 6; i++) {
                        currentAnimal.animate({  transform: rotateAngle }, {
                            step: function(now,fx) {
                                $(this).css({
                                    '-webkit-transform':'rotate('+now+'deg)', 
                                    '-moz-transform':'rotate('+now+'deg)',
                                    'transform':'rotate('+now+'deg)'
                                });
                            }
                        });

                        rotateAngle = -rotateAngle;
                    }
                    currentAnimal.fadeOut(200);
                    shakingAnimal = false;
                
                    break;
                
                case "endcall":
                    console.log("ENDING CALL");
                    peerConnection.close();
                    remoteVid.fadeOut("slow");

                    
                    
            }
            break;

        case MessageType.CALL_REQUEST:
            if (!peerConnection) {
                msgDiv.html("Receiving Call!");
                start(false);
            }

            // Are we on the SDP stage or the ICE stage of the handshake?
            if (msg.sdp) {
                peerConnection
                    .setRemoteDescription(new RTCSessionDescription(msg.sdp))
                    .then(() => {
                        // Only create answers in response to offers
                        if (msg.sdp.type == "offer") {
                            peerConnection
                                .createAnswer()
                                .then(createdDescription)
                                .catch(errorHandler);
                        }
                    })
                    .catch(errorHandler);
            } else if (msg.ice) {
                peerConnection
                    .addIceCandidate(new RTCIceCandidate(msg.ice))
                    .catch(errorHandler);
            }
        default:
            break;
    }
}

function errorHandler(error) {
    console.error(error);
}
var localVid = $("#localVideo");
var remoteVid = $("#remoteVideo");
var btn1 = $("#btn-client1");
var btn2 = $("#btn-client2");
var theInput = $("#msgInput");
var callBtn = $("#btn-call");
var msgDiv = $("#msgDiv");

var localStream;
var peerConnection;
var serverConnection;

const peerConnectionConfig = {
    iceServers: [
        { urls: "stun:stun.stunprotocol.org:3478" },
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" },
        // { urls: "stun:stun2.l.google.com:19302" },
        // { urls: "stun:stun3.l.google.com:19302" },
        // { urls: "stun:stun4.l.google.com:19302" },
        // { urls: "stun:stun.ekiga.net" },
        // { urls: "stun:stun.fwdnet.net" },
        // { urls: "stun:stun.ideasip.com" },
        // { urls: "stun:stun.iptel.org" },
    ],
};

const MessageType = {
    SERVER_INFO: 0,
    CLIENT1: 1,
    CLIENT2: 2,
    CALL_REQUEST: 3,
};

btn1.on("click", () => {
    getWebcam();
    btn2.prop("disabled", true);
    destination = "wss://" + location.host + "/client1";
    serverConnection = new WebSocket(destination);
    serverConnection.onmessage = handleMessage;
});

btn2.on("click", () => {
    getWebcam();
    btn1.prop("disabled", true);
    destination = "wss://" + location.host + "/client2";
    serverConnection = new WebSocket(destination);
    serverConnection.onmessage = handleMessage;
});

callBtn.on("click", () => {
    start(true);
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
    // if (navigator.getUserMedia) {
    //     navigator.getUserMedia({
    //             video: true,
    //             audio: true,
    //         },
    //         (stream) => {
    //             // success
    //             localStream = stream;
    //             localVid.prop("srcObject", stream);
    //         },
    //         (error) => {
    //             // error
    //             console.error(error);
    //         }
    //     );
    // } else {
    //     alert("Your browser does not support getUserMedia API");
    // }
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
}

function handleMessage(mEvent) {
    var msg = JSON.parse(mEvent.data);

    switch (msg.type) {
        case MessageType.SERVER_INFO:
            msgDiv.html(msg.message);
            break;

            // Message came from Client 1, Handle as Client2
        case MessageType.CLIENT1:
            break;

            // Message came from Client 2, Handle as Client1
        case MessageType.CLIENT2:
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
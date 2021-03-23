
var isRhys = document.getElementById('btn-client1');
var isGparent = document.getElementById('btn-client2');
var rhysView = document.getElementById('rhys-view');
var gparentView = document.getElementById('gparent-view');
var localVideo = document.getElementById('localVideo');
var remoteVideo = document.getElementById('remoteVideo');

function showRhysUI(){
    isRhys.innerText = "Connected as Rhys";
    isGparent.style.display = "none";
    rhysView.style.display = "block";
    localVideo.style.display = "block";
    remoteVideo.style.display = "block";
}

function showGparentUI(){
    isGparent.innerText = "Connected as Oma & Opa";
    isRhys.style.display = "none";
    gparentView.style.display = "block";
    localVideo.style.display = "block";
    remoteVideo.style.display = "block";
}

isRhys.addEventListener('click', showRhysUI);

isGparent.addEventListener('click', showGparentUI);
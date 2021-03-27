
var isRhys = document.getElementById('btn-client1');
var isGparent = document.getElementById('btn-client2');
var rhysViewItems = document.getElementsByClassName('rhys-view');
var gparentViewItems = document.getElementsByClassName('gparent-view');
var localVideo = document.getElementById('localVideo');
var remoteVideo = document.getElementById('remoteVideo');

for(var i=0; i<rhysViewItems.length; i++){
    rhysViewItems[i].style.display = "none";
}

for(var i=0; i<gparentViewItems.length; i++){
    gparentViewItems[i].style.display = "none";
}

function showRhysUI(){
    isRhys.innerText = "Connected as Rhys";
    isRhys.disabled = true;
    isGparent.style.display = "none";
    for(var i=0; i<rhysViewItems.length; i++){
        rhysViewItems[i].style.display = "block";
    }
    localVideo.style.display = "block";
    remoteVideo.style.display = "block";
}

function showGparentUI(){
    isGparent.innerText = "Connected as Oma & Opa";
    isGparent.disabled = true;
    isRhys.style.display = "none";
    for(var i=0; i<gparentViewItems.length; i++){
        gparentViewItems[i].style.display = "block";
    }

    localVideo.style.display = "block";
    remoteVideo.style.display = "block";
}

isRhys.addEventListener('click', showRhysUI);

isGparent.addEventListener('click', showGparentUI);
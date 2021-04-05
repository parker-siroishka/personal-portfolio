
var isRhys = document.getElementById('btn-client1');
var isGparent = document.getElementById('btn-client2');
var rhysViewItems = document.getElementsByClassName('rhys-view');
var gparentViewItems = document.getElementsByClassName('gparent-view');
var localVideo = document.getElementById('localVideo');
var remoteVideo = document.getElementById('remoteVideo');
var logo = document.getElementById('logo');
var call = document.getElementById('btn-call');
var end = document.getElementById('btn-end');


call.style.display = "none";
end.style.display = "none"

for(var i=0; i<rhysViewItems.length; i++){
    rhysViewItems[i].style.display = "none";
}

for(var i=0; i<gparentViewItems.length; i++){
    gparentViewItems[i].style.display = "none";
}

function showRhysUI(){
    call.style.display = "block";
    logo.style.display = "none";
    isRhys.innerText = "Connected as Rhys";
    isRhys.disabled = true;
    isGparent.style.display = "none";
    for(var i=0; i<rhysViewItems.length; i++){
        rhysViewItems[i].style.display = "block";
    }
    localVideo.style.display = "block";
    remoteVideo.style.display = "block";
    remoteVideo.style.maxHeight = "85%";
}

function showGparentUI(){
    call.style.display = "block";
    logo.style.display = "none";
    isGparent.innerText = "Connected as Oma & Opa";
    isGparent.disabled = true;
    isRhys.style.display = "none";
    for(var i=0; i<gparentViewItems.length; i++){
        gparentViewItems[i].style.display = "block";
    }

    localVideo.style.display = "block";
    remoteVideo.style.display = "block";
    remoteVideo.style.maxHeight = "85%";
}

isRhys.addEventListener('click', showRhysUI);

isGparent.addEventListener('click', showGparentUI);
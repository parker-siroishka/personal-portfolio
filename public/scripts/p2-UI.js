
var isRhys = document.getElementById('btn-client1');
var isGparent = document.getElementById('btn-client2');

function showRhysUI(){
    console.log("I AM RHYS");
}

function showGparentUI(){
    console.log("I AM GPARENT");
}

isRhys.addEventListener('click', showRhysUI);

isGparent.addEventListener('click', showGparentUI);
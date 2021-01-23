// Create JoyStick object into the DIV 'joyDiv'
let root = document.documentElement;
let joy = new JoyStick('joyDiv');
let joyPosX = document.getElementById('joyDirectionX');
let joyPosY = document.getElementById('joyDirectionY');

let character;
let posX = 0;
let posY = 0;

function startGame() {
    character = new component(50,50,"yellowgreen", 10, 120);
    mapArea.start()
}

var mapArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = mapArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }    
}

setInterval(
    function(){
        joyPosX.value=joy.GetX();
        posX = joy.GetX();

}, 50);

setInterval(
    function(){
        joyPosY.value=joy.GetY();
        posY = joy.GetY();

}, 50);

setInterval(
    function(){

        
        if((posY < 50 && posY > -50) && posX > 0){
            moveRight();
        }

        if((posY < 50 && posY > -50) && posX < 0){
            moveLeft();
        }

        if(posY > 0 && (posX < 50 && posX > -50)){
            moveUp();
        }

        if(posY < 0 && (posX < 50 && posX > -50)){
            moveDown();
        }

        if(posY > 50 && posX > 0){
            moveUpRight();
        }
       

        if(posY > 50 && posX < 0){
            moveUpLeft();
        }

        if(posY < 50 && posX < 0){
            moveDownLeft();
        }

        if(posY < 0 && posX > 0){
            moveDownRight();
        }

        if(posY == 0 && posX == 0){
            clearmove();
        }
    }, 1
)


function updateGameArea() {
    mapArea.clear();
    character.newPos();    
    character.update();
}

function moveUp() {
    character.speedY = -1; 
}

function moveDown() {
    character.speedY = 1; 
}

function moveLeft() {
    character.speedX = -1; 
}

function moveRight() {
    character.speedX = 1; 
}


function moveUpLeft() {
    character.speedX = -1; 
    character.speedY = -1; 
}

function moveDownLeft() {
    character.speedX = -1; 
    character.speedY = 1; 
}

function moveUpRight() {
    character.speedX = 1; 
    character.speedY = -1; 
}

function moveDownRight() {
    character.speedX = 1; 
    character.speedY = 1; 
}

function clearmove() {
    character.speedX = 0; 
    character.speedY = 0; 
}



let joystickListenerObj = document.getElementById('joyDiv');
joystickListenerObj.onmouseup(cconsole.log);

// setInterval();

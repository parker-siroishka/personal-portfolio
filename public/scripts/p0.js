// Create JoyStick object into the DIV 'joyDiv'
let root = document.documentElement;
let joy = new JoyStick('joyDiv', {internalFillColor: "#fe201b", internalStrokeColor: "#a70000", internalLineWidth: 4 ,externalLineWidth: 50, externalStrokeColor: "#c8c8d8"});

let character;
let posX = 0;
let posY = 0;

function startGame() {
    character = new component(50,50,"yellowgreen", 173, 300);
    mapArea.start()
}

var mapArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 400;
        this.canvas.height = 400;
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
        posX = joy.GetX();

}, 50);

setInterval(
    function(){
        posY = joy.GetY();

}, 50);

setInterval(
    function(){

        
        if((posY < 50 && posY > -50) && posX > 0){
            moveRight();
        }

        else if((posY < 50 && posY > -50) && posX < 0){
            moveLeft();
        }

        else if(posY > 0 && (posX < 50 && posX > -50)){
            moveUp();
        }

        else if(posY < 0 && (posX < 50 && posX > -50)){
            moveDown();
        }

        else if(posY > 50 && posX > 0){
            moveUpRight();
        }
       

        else if(posY > 50 && posX < 0){
            moveUpLeft();
        }

        else if(posY < 50 && posX < 0){
            moveDownLeft();
        }

        else if(posY < 0 && posX > 0){
            moveDownRight();
        }

        else if(posY == 0 && posX == 0){
            clearmove();
        }
    }, 50
)


function updateGameArea() {
    mapArea.clear();
    character.newPos();    
    character.update();
}

function moveUp() {
    character.speedY = -2; 
}

function moveDown() {
    character.speedY = 2; 
}

function moveLeft() {
    character.speedX = -2; 
}

function moveRight() {
    character.speedX = 2; 
}


function moveUpLeft() {
    character.speedX = -2; 
    character.speedY = -2; 
}

function moveDownLeft() {
    character.speedX = -2; 
    character.speedY = 2; 
}

function moveUpRight() {
    character.speedX = 2; 
    character.speedY = -2; 
}

function moveDownRight() {
    character.speedX = 2; 
    character.speedY = 2; 
}

function clearmove() {
    character.speedX = 0; 
    character.speedY = 0; 
}


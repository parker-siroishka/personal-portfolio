// Create JoyStick object into the DIV 'joyDiv'
let root = document.documentElement;
let joy = new JoyStick('joyDiv', {internalFillColor: "#fe201b", internalStrokeColor: "#a70000", internalLineWidth: 4 ,externalLineWidth: 50, externalStrokeColor: "#c8c8d8"});

let character;
let superstore;
let games;
let friends;

let friendsNote;
let superstoreNote;
let gamesNote;

let posX = 0;
let posY = 0;

function startGame() {
    character = new component(40,50,"../media/link.png", 173, 300);
    superstore = new component(110,60,"../media/superstore.png", 250, 100);
    games = new component(80,60,"../media/games.png", 270, 250);
    friends = new component(140,80, "../media/friends.png",20, 100)
    friendsNote = new component(330,300, "../media/friendsNote.png",35, 55)
    superstoreNote = new component(330,300, "../media/superstoreNote.png",35, 55)
    gamesNote = new component(330,300, "../media/gamesNote.png",35, 55)
    mapArea.start();
}

let mapArea = {
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

function component(width, height, imgSrc, x, y) {
    this.image = new Image();
    this.image.src = imgSrc;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = mapArea.context;
        ctx.drawImage(this.image,
            this.x,
            this.y,
            this.width,
            this.height);
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }
    this.bumpInto = function(otherobj) {
        let myleft = this.x;
        let myright = this.x + (this.width);
        let mytop = this.y;
        let mybottom = this.y + (this.height);
        let otherleft = otherobj.x;
        let otherright = otherobj.x + (otherobj.width);
        let othertop = otherobj.y;
        let otherbottom = otherobj.y + (otherobj.height);
        let bump = true;
        if ((mybottom < othertop) || (mytop > otherbottom) ||
            (myright < otherleft) || (myleft > otherright)) {
            bump = false;
        }
        return bump;
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
    superstore.update();
    games.update();  
    friends.update();
    character.newPos();    
    character.update();

    if(character.bumpInto(friends)) {
        friendsNote.update();
    }

    if(character.bumpInto(superstore)) {
        superstoreNote.update();
    }
    if(character.bumpInto(games)) {
        gamesNote.update();
    }
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


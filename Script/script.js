//Esta es la funcion que hace que nuestro personaje pueda saltar

document.addEventListener('keydown', function(evento){
    if(evento.keyCode == 38){
        console.log("Saltar");
        if(nivel.muerto == false)
        saltar();
        else {
            nivel.velocidad = 9;
            nube.velocidad = 1;
            cactus.x = ancho + 100;
            nube.x = ancho + 100;
            marcador = 0;
            nivel.muerto = false;
        }
    }
});

var imgRex, imgNube, imgCactus, imgSuelo;

function cargarImagenes(){
    imgRex = new Image();
    imgCactus = new Image();
    imgNube = new Image();
    imgSuelo = new Image();

    imgRex.src ='img/rex.png';
    imgCactus.src ='img/cactus.png';
    imgNube.src ='img/nube.png';
    imgSuelo.src ='img/suelo.png';
}

var ancho = 1200;
var alto = 550;
var canvas,ctx;


function inicializar(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    cargarImagenes();
    
}

function borraCanvas(){
    canvas.width = ancho;
    canvas.height = alto;
}
var suelo = 400;
var trex = {y: 355, vy:0, gravedad:1, salto:27, vymax:9, saltando: false};
var nivel = {velocidad: 10, muerto: false};
var cactus = {x: ancho + 100, y: suelo-36};
var nube = {x: 500, y: 0, velocidad: 1};
var suelog = {x: 0, y: suelo + 60};
var marcador = 0;

function dibujaRex(){
    ctx.drawImage(imgRex,0,0,1628,1628,100,trex.y,250,250);
}
//------------------ Cactus --------------------------------------------
function dibujaCactus(){
    ctx.drawImage(imgCactus,0,0,728,310,cactus.x,cactus.y,380,170);
}

function logicaCactus(){
    if(cactus.x < -200){
        cactus.x = ancho + 700;
        marcador++;

    }
    else{
        cactus.x -= nivel.velocidad;
    }
}



//-------------------- Nube --------------------------------------------

function dibujaNube(){
    ctx.drawImage(imgNube,0,0,1988,1290,nube.x,nube.y,200,150);
}

function logicaNube(){
    if(nube.x < -100){
        nube.x = ancho + 100;
    }
    else{
        nube.x -= nube.velocidad;
    }
}
//-------------------- Suelo ------------------------------------------

function dibujaSuelo(){
    ctx.drawImage(imgSuelo,suelog.x,0,810,218,0,suelog.y,1400,150);
}

function logicaSuelo(){
    if(suelog.x > 700){
        suelog.x = 0;     
    }
    else{
        suelog.x += nivel.velocidad;
    }
}

function saltar(){
    trex.saltando = true;
    trex.vy = trex.salto;
}

function gravedad(){
    if(trex.saltando == true)
       if(trex.y - trex.vy - trex.gravedad > suelo){
           trex.saltando = false;
           trex.vy = 0;
           trex.y = 355;
       }
       else{
        trex.vy -= trex.gravedad;
        trex.y -= trex.vy; 
    }
}

function colision(){
    if(cactus.x >= 100 && cactus.x <= 150){
        if(trex.y >= suelo-50){
            nivel.muerto = true;
            nivel.velocidad = 0;
            nube.velocidad = 0;
        }
    }
}


function puntuacion(){
    ctx.font = "30px impact";
    ctx.fillstyle = '#555555';
    ctx.fillText(marcador,600,50);

    if(nivel.muerto == true){
        ctx.font = "150px impact";
        ctx.fillText('GAME OVER',260,250);
    }
}
//----------------------------------------------------------------
//Bucle principal

var FPS = 50;
setInterval(function(){
    principal();
},1000/FPS);

function principal(){
    borraCanvas();
    gravedad();
    colision();
    logicaCactus();
    logicaNube();
    logicaSuelo();
    dibujaSuelo();
    dibujaNube();
    dibujaCactus();
    dibujaRex();
    puntuacion();
}

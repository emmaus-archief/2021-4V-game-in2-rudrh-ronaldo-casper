/// @ts-check
/// <reference path=".gitpod/p5.global-mode.d.ts" />
"use strict";

/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */




/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */

const UITLEG = 0;
const LEVEL1 = 1;
const GAMEOVER = 2;
const MAINMENU = 3;
const WIN = 4;
const LEVEL2= 5;
var spelStatus = MAINMENU;

var spelerX = 50; // x-positie van speler
var spelerY = 680; // y-positie van speler

var kogelX = 60;    // x-positie van kogel
var kogelY = 680;    // y-positie van kogel

var platformX = 200;
var platformY = 555; 
var platformen = 3;

var vijandX = 250;   // x-positie van vijand
var vijandY = 680;   // y-positie van vijand
var vijanden = [1, 1, 1, 1, 1, 1];
var checkvijand = 0;

var score = 100; // aantal behaalde punten

var springStatus = false;
var valStatus = false;
var sprongHoogte = 680;
var sprongSnelheid = 1;
var grondHoogte = 680;

var mouseWasClicked = false;
var mouseIsClicked = false;

var spelerFoto = 0;
    
/* ********************************************* */
/*      functies die je gebruikt in je game      */
/* ********************************************* */

/**
 * Tekent het speelveld
 */
var tekenVeld = function () {
  fill("white");
  rect(20, 20, width - 2 * 20, height - 2 * 20);
  
};


/**
 * Tekent de vijand
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenVijand = function(x, y) {
    if(vijanden[checkvijand] === 1){
        for( var i = 0; i <= vijanden.length; i++)
        fill("red");
        ellipse(x + 100 * i, y, 50, 50);
        checkvijand += 1;
    } else if(vijanden[checkvijand] === 2) {
        fill(green);
        rect(x, y, 50, 50);
    } else if(vijanden[checkvijand] === 0) {
        return false;
    }
    
};


/**
 * Tekent de kogel of de bal
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenKogel = function(x, y) {
   fill('black');
   ellipse(x, y, 10, 10);

};


/**
 * Tekent de speler
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenSpeler = function(x, y) {
    image(spelerFoto, x, y, 50, 50);
};

/**
 * Tekent de platformen
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenPlatform = function(x, y) {
   for( var i = 0; i <= platformen; i++) {
    fill('red');
   rect(x + 250 * i, y, 200, 20);
   }
}

/**
 * Updatet globale variabelen met positie van vijand of tegenspeler
 */
var beweegVijand = function() {

     if (spelerX > vijandX) {
        vijandX += 2.5;
    } else if ( spelerX < vijandX) {
        vijandX -= 2.5;
    } 
    
};


/**
 * Updatet globale variabelen met positie van kogel of bal
 */


/**
 * Kijkt wat de toetsen/muis etc zijn.
 * Updatet globale variabele spelerX en spelerY
 */

var beweegSpeler = function()  {
     if (keyIsDown(68) || keyIsDown(39)) {
        spelerX+= 5;
     } 
     if (keyIsDown(65) && spelerX > 50 || keyIsDown(37) && spelerX > 50) {
        spelerX-= 5;
     } 
     if (springStatus === false) {
         sprongHoogte = spelerY - 200;
     }
     if (keyIsDown(32) && springStatus === false && valStatus === false || keyIsDown(38) && springStatus === false && valStatus === false) {
         springStatus = true
     }
     if (springStatus === true) {
         spelerY = spelerY - Math.pow(sprongSnelheid, 2);
         sprongSnelheid = sprongSnelheid + 0.0000008;
     }
     if (spelerY <= sprongHoogte || (spelerY < grondHoogte && springStatus === false)) {
         valStatus = true;
         springStatus = false;
     }
     if (valStatus === true && spelerY < grondHoogte) {
         spelerY = spelerY + Math.pow(sprongSnelheid, 2);
         sprongSnelheid = sprongSnelheid + 0.0000008;
     }
     if (spelerY >= grondHoogte) {
         valStatus = false;
         sprongSnelheid = 3;
         spelerY = grondHoogte;
     }

};


var tekenScore = function() {
    var tekenScore = round(score);
    fill(255,0,0) //maakt de tekst rood
    textSize(50) //bepaalt de grootte van de tekst
    text("Score:" + tekenScore, 30, 30, 25, 50); //zet de score op het beeld
    score = score - (1/50); //iedere seconde wordt er 1 score weggehaald
};


/** 
  Zoekt uit of de vijand is geraakt
  @returns {boolean} true als vijand is geraakt
 */
var checkVijandGeraakt = function() {  
  if (kogelX >= vijandX - 25 || kogelX <= vijandX + 25 && kogelY >= vijandY - 25 || kogelY <= vijandY + 25 && checkMouseIsClicked) {
     score = score + 20; // wanneer een vijand geraakt is wordt er 20 aan de score toegevoegd
     let removedItem = vijanden.splice (checkvijand, 1) 

     
} 
    
return false;

};

var checkPlatformGeraakt = function() {
    if(spelerX <= platformX + 210 && spelerX >= platformX && spelerY <= platformY) {
        spelerX >= platformX;
        spelerX <= platformX + 200;
        grondHoogte = platformY - 20;
    } else {
        grondHoogte = 680
    }
    
}

var beweegKogel = function() {

if (mouseIsClicked === true && mouseX > spelerX && kogelX < spelerX + 100) {
    kogelX += 10;
    } else if (mouseIsClicked === true && mouseX < spelerX && kogelX > spelerX - 100) {
        kogelX -= 10;
       } else {
        kogelX = spelerX;
        kogelY = spelerY;
    };
};

/**
 * Zoekt uit of de speler is geraakt
 * bijvoorbeeld door botsing met vijand
 * @returns {boolean} true als speler is geraakt
 */
var checkSpelerGeraakt = function() {
        
        if(vijandX <= spelerX + 45 && vijandY === spelerY && vijandX >= spelerX - 45){
            score -= 500;
        }  else {
        return false;
    }

};


var checkMouseIsClicked = function() {
    if(mouseIsPressed && mouseIsClicked === false && mouseWasClicked === false) {
        mouseIsClicked = true;

    } else if (mouseIsPressed) {
        mouseIsClicked = false;
        mouseWasClicked = true;

    } else {
        mouseIsClicked = false;
        mouseWasClicked = false;

    }
}

/**
 * Zoekt uit of het spel is afgelopen
 * @returns {boolean} true als het spel is afgelopen
 */
var checkGameOver = function() {
  if(score <= 0) {
      return true;
  }  
  else {
      return false; 
  }
};

var checkWin = function() {
if(spelerX > 1280) {
 return true;
}
else {
    return false;
 }
};

function preload() {
    spelerFoto = loadImage('images/speler.png')
}

var gameReset = function() {
    spelerX = 50; // x-positie van speler
    spelerY = 680; // y-positie van speler
    kogelX = 60;    // x-positie van kogel
    kogelY = 680;    // y-positie van kogel
    vijandX = 250;   // x-positie van vijand
    vijandY = 680;   // y-positie van vijand
    score = 100; // aantal behaalde punten
    springStatus = false;
    valStatus = false;
    sprongHoogte = 680;
    sprongSnelheid = 1;
    grondHoogte = 680;
}

var gameSetup = function() {
    beweegVijand();
    beweegKogel();
    beweegSpeler();
    preload();
    setup();  
    tekenVeld();
    tekenPlatform(platformX, platformY);
    tekenVijand(vijandX, vijandY);
    tekenKogel(kogelX, kogelY);
    tekenSpeler(spelerX, spelerY);
    tekenScore();
    checkVijandGeraakt();
    checkSpelerGeraakt();
    checkPlatformGeraakt();
}




/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);

  // Kleur de achtergrond blauw, zodat je het kunt zien
  background('blue');
}



/**
 * draw
 * de code in deze functie wordt meerdere keren per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  switch (spelStatus) {
    case LEVEL1:
      gameSetup()
      if (checkGameOver()) {
        spelStatus = GAMEOVER;
      }
      if (checkWin()) {
          spelStatus = WIN
      }
      break;

      case GAMEOVER: 
        fill(207, 53, 23);
        rect(100,100,1100,550); // maakt een rechthoek
        fill(23, 32, 207)
        rect(200,450,400,100) //maakt een knop om opnieuw te spelen
        rect(700,450,400,100)
        fill(255,255,255);
        textSize(100)
        text('Game Over',400,150,600,450); // Zet de tekst "game over" op de rechthoek
        textSize(30)
        text('Probeer Opnieuw',275,480,250,525);
        text('Terug naar hoofdmenu',750,480,850,600);
        if(mouseX > 200 && mouseX < 600 && mouseY > 450 && mouseY < 650 && mouseIsPressed){
        spelStatus = LEVEL1
        gameReset();
        }
        if(mouseX > 700 && mouseX < 1100 && mouseY > 450 && mouseY < 650 && mouseIsPressed){
        spelStatus = MAINMENU
        gameReset();
        }
     break;

     case MAINMENU:
         background(155,255,155);
         fill(0,0,0);
         textSize(100)
         text('[Game naam hier]',250,75,1000,300);
         fill(23, 32, 207)
         rect(375,400,500,100)
         fill(255,255,255)
         textSize(40)
         text('Spelen',550,425,500,450)
         if(mouseX > 375 && mouseX < 875 && mouseY > 400 && mouseY < 500 && mouseIsPressed){
             spelStatus = LEVEL1
         }
     break;

     case WIN:
        fill(59, 156, 17);
        rect(100,100,1100,550); // maakt een rechthoek
        fill(23, 32, 207)
        rect(200,450,400,100) //maakt een knop om opnieuw te spelen
        rect(700,450,400,100)
        fill(255,255,255);
        textSize(100)
        text('Level Voltooid!',325,150,700,450); // Zet de tekst "level voltooid" op de rechthoek
        textSize(30)
        text('Volgend level',300,480,250,525);
        text('Terug naar hoofdmenu',750,480,850,600);
        if(mouseX > 200 && mouseX < 600 && mouseY > 450 && mouseY < 650 && mouseIsPressed){
        spelStatus = LEVEL1
        gameReset();
        }
        if(mouseX > 700 && mouseX < 1100 && mouseY > 450 && mouseY < 650 && mouseIsPressed){
        spelStatus = MAINMENU
        gameReset();
        }
        break;

        case LEVEL2: 
         gameSetup()
        break;
    


  }
}

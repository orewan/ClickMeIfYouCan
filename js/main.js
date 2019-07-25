/** Javascript ***/

/***Variable globale */
/** Le rectangle qui tourne */
var ClickMe = document.getElementById("ClickMe");
var ecranjeu = document.getElementById("ecranjeu");

/** Level */
var textlevel = document.getElementById("textlevel");
var level = 1;


/** Le score  */
var thescore = document.getElementById("thescore");
var nbreScore = 0;
var pointsLevel =0;

/** variable Points Perdu */
var pointPerdu =0;
var pointTotalPerdu=0;
var textpoinPerdu = document.getElementById("textpointsPerdu");


/** variable de compteur sur la div */
var clickreussi = 0;
var clickTotalreussi = 0;
var clickperdu = 0;
/** variable pour passer qu niveau suivant */
var nextlevel = document.getElementById("nextlevel");

var clickRestant = 10;
var niveauSuivant;

/** variable pour l'horloge */
var seconde = 60;
var textSeconde = document.getElementById("textSeconde");

/** variabale seconde barre de rotation, declenchement aleatoire */
 var secondeRetard = 300;
/** variable temps de rotation de la barre */
var rotationBarre = 2;

/** Json Higscore */
var divHighScore = document.getElementById("divHighScore");
var highscore = [];
//var highscoreorder = [];
var highscorejson = localStorage.getItem("highscore");

localStorage.setItem('highscore', JSON.stringify(highscore));
if(highscorejson != null){
  highscore = JSON.parse(highscorejson); 
  afficheTheScore();
}

function afficheTheScore(){
  var toappend = "";
  highscore.forEach(function(name){
    toappend += `<div>${name.name} - ${name.score}<div>${name.date}</div></div>`;
  });
  divHighScore.innerHTML = toappend;
}

/*
var a,b;
function sortorderscore(){
  highscore.sort(function(a,b){
  return b.score-a.score;
});
}
highscoreorder = sortorderscore();

localStorage.setItem('highscoreorder', JSON.stringify(highscoreorder));
if(highscorejson != null){
  highscoreorder = JSON.parse(highscorejson);
  afficheTheScore();
}

// j'arrive a la mettre dans l'odre que je veux et je n'arrive pas a la recuperer.

function afficheTheScore(){
  var toappend = "";
  highscoreorder.forEach(function(name){
    toappend += `<div>${name.name} - ${name.score}<div>${name.date}</div></div>`;
  });
  divHighScore.innerHTML = toappend;
}

*/
/* Json en local storage
var highscore = [
  {name: "Naruto", score: 600, date : "07/21/2019"},
  {name: "Luffy", score: 1540,date : "07/11/2019"}, 
  {name: "Lechat", score: 300,date : "07/25/2019"}, 
  {name: "Sangoku", score: 25,date : "07/16/2019"}, 
  {name: "Powers Rangers", score: 5,date : "07/10/2019"}
];

localStorage.setItem('highscore', JSON.stringify(highscore));
*/


/** Demarrage du jeu */
function startthegame(){
  alert("le jeu commence");
  gamestart();
}

/** Appel de toutes les fonctions du jeu */

function gamestart(){
  /** rotation de la div */
  rotation();
  /** vitesse de la rotation */
  vitesseRotation();
  /** horloge qui commence */
  horloge();
  

  /**Compte */
  ClickMe.addEventListener("click", clickrectangle);
  ecranjeu.addEventListener("click",EcranJeuNoir);
  
  ClickMe.addEventListener("mouseover",time);
}

 /** position aleatoire */

/** Compte  */
//addEventListener("click", clickrectangle);
//ecranjeu.addEventListener("click",EcranJeuNoir);

function clickrectangle(ecranjeu){
  //nombre de click reussi
  clickreussi++;
  clickTotalreussi++;
  console.log("j'ai click reussi"+ clickreussi);
  
   //** prevent la fonction click ecran jeu */
   
   ecranjeu.stopPropagation();
   positionAleatoire();
   
  Level(clickreussi);

}

function EcranJeuNoir(){
  
  clickperdu++;
  console.log("click perdu " + clickperdu);
  scorePerdu();
  return clickperdu;
 }

/** */
function positionAleatoire(){
// Position Aleatoire
 // ClickMe.style.left = Math.floor(Math.random()*900) + "px";
 // ClickMe.style.top = Math.floor(Math.random()*500) + "px";
  // Pour les test 
  ClickMe.style.left = 100 + "px";
  ClickMe.style.top = 100 + "px";
  
}



/** rotation de la div */
function rotation(){
  
  ClickMe.classList.toggle('rotating');
  
}
/** vitesse de rotation de la div */
function vitesseRotation(){
  ClickMe.style.animationDuration = rotationBarre + "s";
  
}


/*** L'horloge commence ****/

function horloge(){
seconde = 60;

setInterval(timer,1000);
textSeconde.innerText = seconde;

  function timer(){
  
    textSeconde.innerText = seconde--;
  
    if(seconde==0){
      gameoverlose();
    }
    
  }
  return seconde;
}
/** reset the alarm */
function horlogedeux(){
  clearInterval();
  }


/** Niveau du Jeu */
function Level(){
  /** Nombre de click reussi */
  niveauSuivant = clickRestant - clickreussi;
  nextlevel.innerText = niveauSuivant;
  console.log("le niveau suivant "+ niveauSuivant);
  Score(level);

  if(niveauSuivant == 0){
  level++; 

  textlevel.innerText=level;
  clickRestant=10;
  clickreussi = 0;
  nextlevel.innerText = clickRestant;
  
  /** Variable seconde = Ajoute 10 secondes au timer, seconde retard = enleve 50 ms, rotationBarre = enleve 0.25s  */
  seconde += 10;
  
  /** time */
  secondeRetard -= 50;
  time(secondeRetard);

  rotationBarre -= 0.25;
  vitesseRotation(rotationBarre);
  
  
  if(level>5){
      winGame();
    }

  
  
  }
  return seconde, secondeRetard,rotationBarre,level;
}

/** Nombre de point */
function Score(){
  /** Point Ajoutes quand click reussi */ // (nbreScore += 10*level)  n'a pas fonctionne
  pointsLevel = 10*level;
  nbreScore += pointsLevel;

  console.log(nbreScore);
  thescore.innerText = nbreScore;
}

function scorePerdu(){
  pointPerdu = level;
  pointTotalPerdu += pointPerdu;
  textpoinPerdu.innerText = pointTotalPerdu;

  nbreScore -= pointPerdu; 
  console.log(nbreScore);
  thescore.innerText = nbreScore;
  console.log("mon niveau est de :"+level);
}

/**Position aleatoire de la barre bleu */
function time(){
    setTimeout(positionAleatoire,secondeRetard);
}


/*** Le jeu s'arrete */

function winGame(){
  // reset the score
  alert("Vous avez gagne le jeu \n votre nombre de click est de :"+clickTotalreussi + "\n votre score est de :"+nbreScore ); 
  resetThegame();
}


function gameoverlose(){
  /**De declenche si le temps(horloge) arrive a zero */
  alert("Vous n'avez pas gagne le jeu, entrainez vous pour faire mieux, \n votre nombre de click perdu est de :"+clickperdu);
 // thescore.innerText=clickperdu;
}

function resetThegame(){
  seconde = 60;
  textSeconde.innerText = seconde;
  horlogedeux();
  level=1;
  textlevel.innerText=1;
  clickreussi=0;
  clickTotalreussi=0;
  nbreScore=0;
  thescore.innerText=0;
  rotationBarre = 2;

  ClickMe.classList.toggle('rotating');
}



/************* Code principe *******/
  /* Principe mais ce n'est pas l'enonce*/
  
  
  /*if(clickreussi>10&&clickreussi<20){
    textlevel.innerText = 2;
    level=2;   
 }else if(clickreussi>20&&clickreussi<30){
  textlevel.innerText = 3;
    level=3; 
 }else if(clickreussi>30&&clickreussi<40){
  textlevel.innerText = 4;
    level=4;
 }
 else if(clickreussi>40&&clickreussi<50){
  textlevel.innerText = 5;
    level=5; 
 }else if(clickreussi>49){
  
    
    winGame();
 }
 */

 /**
  * 
  * 
  * 
  */

/*
function Level1(){
  /** Nombre de click reussi */
/* 
  niveauSuivant1 = clickRestant - clickreussi;
  
  nextlevel.innerText = niveauSuivant1;

  if(niveauSuivant1 == 0){
    level++;
    textlevel.innerText=level; 
    Level2();
  }
  return level;
}

function Level2(){
  /** Nombre de click reussi */
/*
  clickRestant = 10;
  niveauSuivant3 = clickRestant - clickreussi;
  nextlevel.innerText = niveauSuivant3;

  if(niveauSuivant3 == 0){
    level++;
    textlevel.innerText=level; 
    Level3(niveauSuivant);
  }
  return level;
}
function Level3(){
  /** Nombre de click reussi */
/*  
  clickRestant = 10;
  niveauSuivant = clickRestant - clickreussi;
  nextlevel.innerText = niveauSuivant;

  if(niveauSuivant == 0){
    level++;
    textlevel.innerText=level; 
    Level4(niveauSuivant);
  }
  return level;
}

function Level4(){
  /** Nombre de click reussi */
/*
  clickRestant = 10;
  niveauSuivant = clickRestant - clickreussi;
  nextlevel.innerText = niveauSuivant;

  if(niveauSuivant == 0){
    level++;
    textlevel.innerText=level; 
    Level5();
  }
  return level;
} 
*/
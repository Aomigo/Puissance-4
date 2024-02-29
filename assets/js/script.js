const contenaireDiv = document.querySelector('.contenaire');
const towerRed = document.querySelector('.tower-red');
const towerYellow = document.querySelector('.tower-yellow');
const rejouerDiv = document.querySelector('.rejouer');
const retour = document.querySelector('.retour');
const actualiser = document.querySelector('.actualiser');
const buttonPlayer = document.querySelector('.playervs');
const menuWrapper = document.querySelector('.main-menu-wrapper');
const gameWrapper = document.querySelector('.wrapper-game');
const ruleWrapper = document.querySelector('.rules');
const ruleMenu = document.querySelector('.rules-menu');
const bottomLayer = document.querySelector('.bottom-layer');
const compteurVictoireRouge = document.querySelector('.compteur-rouge');
const compteurVictoireJaune = document.querySelector('.compteur-jaune');
const redWin = document.querySelector('.red-win');
const yellowWin = document.querySelector('.yellow-win');
const timerDiv = document.querySelector('.timer');
const timerDeconteDiv = document.querySelector('.deconte-timer');
let arrayColonne = [];
let arrayRond = [];
let arrayEvent = [];
let arrayRemove = [];
let compteurClick = 0;
let compteurWinRed = 0;
let compteurWinYellow = 0;
let interval;
let compteurTimer = 20;

for(let i = 0; i < 7; i++){
    const colonneDiv = document.createElement('div');
    colonneDiv.classList.add('colonne');
    contenaireDiv.appendChild(colonneDiv);
    colonneDiv.setAttribute("data-columns", i);
    arrayEvent.push(colonneDiv);
    let arrayBox = [];
    
    for(let j = 0; j < 6; j++) {
        const boxDiv = document.createElement('div');
        boxDiv.classList.add('box');
        boxDiv.setAttribute("data-rows", j);
        colonneDiv.appendChild(boxDiv);
        
        const rondDiv = document.createElement('div');
        rondDiv.classList.add('rond');
        boxDiv.appendChild(rondDiv);
        
        arrayBox.push(rondDiv);
    }
    arrayColonne.push(arrayBox);
}

function animationPion (i, j, color) {
    let compteurAnimation = 0;
    for(let k = 0; k < j; k++) {
        setTimeout(function() {
            const boxBGC = document.createElement('div');
            arrayColonne[i][k].appendChild(boxBGC)
            boxBGC.classList.add('box-animation-' + color);
            setTimeout(function(){
                boxBGC.remove();
                compteurAnimation++;
                if(compteurAnimation == j - 1){
                    if(compteurClick % 2 == 0) {
                        arrayColonne[i][j].classList.add('yellow');
                        towerRed.classList.remove('hidden');
                        towerYellow.classList.add('hidden'); 
                    } else {
                        arrayColonne[i][j].classList.add('red');
                        towerRed.classList.add('hidden');
                        towerYellow.classList.remove('hidden');
                    }
                }
            }, 200)
        }, k * 70);
    }
}

function time() {
    timerDeconteDiv.textContent = compteurTimer;
    compteurTimer--;
    
    if(compteurTimer == -1) {
        clearInterval(interval);
        if(compteurClick % 2 != 0) {
            win(false, false, false, false, false, false, 'red');
        } else {
            win(false, false, false, false, false, false, 'yellow');
        }
    }
}

function ajoutClass(arrayColonne, i) {
    for(let j = 5; j >= 0; j--) {
        if(arrayColonne[i][j].classList.contains('red') == false && arrayColonne[i][j].classList.contains('yellow') == false){
            time();
            console.log(i, j)
            if(compteurClick % 2 == 0) {
                animationPion(i, j, 'red');
            } else {
                animationPion(i, j, 'yellow')
            }
            arrayRemove.push(arrayColonne[i][j]);
            compteurClick++;
            return;
        }
    }
}

function win (array, i, j, iplus, jplus, jmoin, color){
    if(!iplus && jplus && !jmoin) {
        array[i][j].classList.add('rond-win-' + color);
        array[i][j + 1].classList.add('rond-win-' + color);
        array[i][j + 2].classList.add('rond-win-' + color);
        array[i][j + 3].classList.add('rond-win-' + color);
    } else if(iplus && !jplus && !jmoin){
        array[i][j].classList.add('rond-win-' + color);
        array[i + 1][j].classList.add('rond-win-' + color);
        array[i + 2][j].classList.add('rond-win-' + color);
        array[i + 3][j].classList.add('rond-win-' + color);
    } else if(iplus && jplus && !jmoin){
        array[i][j].classList.add('rond-win-' + color);
        array[i + 1][j + 1].classList.add('rond-win-' + color);
        array[i + 2][j + 2].classList.add('rond-win-' + color);
        array[i + 3][j + 3].classList.add('rond-win-' + color);
    } else if(iplus && !jplus && jmoin){
        array[i][j].classList.add('rond-win-' + color);
        array[i + 1][j - 1].classList.add('rond-win-' + color);
        array[i + 2][j - 2].classList.add('rond-win-' + color);
        array[i + 3][j - 3].classList.add('rond-win-' + color);
    }
    
    for (let i = 0; i < arrayEvent.length; i++) {
        arrayEvent[i].removeEventListener('click', arrayEventHandlers[i]);
    }
    rejouerDiv.classList.remove('hidden');
    towerRed.classList.add('hidden');
    towerYellow.classList.add('hidden');
    bottomLayer.classList.remove('purple');
    timerDiv.classList.add('hidden');
    if(color == 'red') {
        redWin.classList.remove('hidden');
        bottomLayer.classList.add('red');
        compteurWinRed++;
        compteurVictoireRouge.textContent = compteurWinRed;
    } else {
        yellowWin.classList.remove('hidden');
        bottomLayer.classList.add('yellow');
        compteurWinYellow++;
        compteurVictoireJaune.textContent = compteurWinYellow;
    }
}

function verificationWin(array) {
    for(let i = 0; i < array.length; i++) {
        for(let j = 0; j < array[i].length; j++) {
            
            // Vérification verticalement
            if(j < array[i].length - 3) {
                if(array[i][j].classList.contains('red') && 
                array[i][j + 1].classList.contains('red') && 
                array[i][j + 2].classList.contains('red') && 
                array[i][j + 3].classList.contains('red')) {
                    console.log('victoire des rouges verticalement');
                    win(array, i, j, false, true, false, "red");
                } 
                if (array[i][j].classList.contains('yellow') && 
                array[i][j + 1].classList.contains('yellow') && 
                array[i][j + 2].classList.contains('yellow') && 
                array[i][j + 3].classList.contains('yellow')) {
                    console.log('victoire des jaunes verticalement');
                    win(array, i, j, false, true, false, "yellow");
                }
            }
            
            // Vérification horizotalement 
            if(i < array.length - 3) {
                if(array[i][j].classList.contains('red') && 
                array[i + 1][j].classList.contains('red') && 
                array[i + 2][j].classList.contains('red') && 
                array[i + 3][j].classList.contains('red')) {
                    console.log('victoire des rouges horizotalement');
                    win(array, i, j, true, false, false, "red");
                } 
                if(array[i][j].classList.contains('yellow') && 
                array[i + 1][j].classList.contains('yellow') && 
                array[i + 2][j].classList.contains('yellow') && 
                array[i + 3][j].classList.contains('yellow')) {
                    console.log('victoire des jaunes horizotalement');
                    win(array, i, j, true, false, false, "yellow");
                }
            }
            
            // Vérification diagonalement (haut gauche à bas droit)
            if(i < array.length - 3 && j < array[i].length - 3){
                if(array[i][j].classList.contains('red') && 
                array[i + 1][j + 1].classList.contains('red') && 
                array[i + 2][j + 2].classList.contains('red') && 
                array[i + 3][j + 3].classList.contains('red')) {
                    console.log('victoire des rouges en diagonale');
                    win(array, i, j, true, true, false, "red");
                }
                if(array[i][j].classList.contains('yellow') && 
                array[i + 1][j + 1].classList.contains('yellow') && 
                array[i + 2][j + 2].classList.contains('yellow') && 
                array[i + 3][j + 3].classList.contains('yellow')) {
                    console.log('victoire des jaunes en diagonale');
                    win(array, i, j, true, true, false, "yellow");
                } 
            }
        }
    }
    // Vérification diagonalement (bas gauche à haut droit)
    for (let i = 0; i < array.length - 3; i++) {
        for (let j = array[i].length - 1; j >= 3; j--) {
            if (array[i][j].classList.contains('red') &&
            array[i + 1][j - 1].classList.contains('red') &&
            array[i + 2][j - 2].classList.contains('red') &&
            array[i + 3][j - 3].classList.contains('red')) {
                console.log('victoire des rouges en diagonale');
                win(array, i, j, true, false, true, "red");
            }
            if (array[i][j].classList.contains('yellow') &&
            array[i + 1][j - 1].classList.contains('yellow') &&
            array[i + 2][j - 2].classList.contains('yellow') &&
            array[i + 3][j - 3].classList.contains('yellow')) {
                console.log('victoire des jaunes en diagonale');
                win(array, i, j, true, false, true, "yellow");
            }
        }
    }
    if(compteurClick == 42) {
        rejouerDiv.classList.remove('hidden');
        towerRed.classList.add('hidden');
        towerYellow.classList.add('hidden');
        timerDiv.classList.add('hidden');
        const matchNulle = document.querySelector('.match-nulle');
        matchNulle.classList.remove('hidden');
    }
}

function retourPion () {
    if(compteurClick == 0){
        return
    } else {
        let i = arrayRemove.length-1
        arrayRemove[i].classList.remove('red');
        arrayRemove[i].classList.remove('yellow');
        arrayRemove.pop();
        compteurClick--;
    }
    if(compteurClick % 2 == 0) {
        towerRed.classList.remove('hidden');
        towerYellow.classList.add('hidden');
    } else {
        towerRed.classList.add('hidden');
        towerYellow.classList.remove('hidden');
    }
    compteurTimer = 20;
}

function actualiserPion() {
    for(let i = 0; i < arrayColonne.length; i++) {
        for(let j = 0; j < arrayColonne[i].length; j++) {
            if(arrayColonne[i][j].classList.contains('red') || arrayColonne[i][j].classList.contains('yellow') || arrayColonne[i][j].classList.contains('rond-win-red') || arrayColonne[i][j].classList.contains('rond-win-yellow')) {
                arrayColonne[i][j].classList.remove('red');
                arrayColonne[i][j].classList.remove('yellow');
                arrayColonne[i][j].classList.remove('rond-win-red');
                arrayColonne[i][j].classList.remove('rond-win-yellow');
            }
        }
    }
    redWin.classList.add('hidden');
    yellowWin.classList.add('hidden');
    towerRed.classList.remove('hidden');
    towerYellow.classList.add('hidden');
    timerDiv.classList.remove('hidden');
    compteurClick = 0;
    compteurTimer = 20;
    clearInterval(interval);
}


let arrayEventHandlers = [];

for(let i = 0; i < arrayEvent.length; i++) {
    let eventHandler = function() {
        ajoutClass(arrayColonne, i);
        verificationWin(arrayColonne);
        clearInterval(interval);
        interval = setInterval(time, 1000);
        compteurTimer = 20;
    }
    arrayEventHandlers.push(eventHandler);
    arrayEvent[i].addEventListener('click', eventHandler);
}


retour.addEventListener('click', retourPion);
buttonPlayer.addEventListener('click', function() {
    menuWrapper.classList.add('hidden');
    gameWrapper.classList.remove('hidden')
})

ruleWrapper.addEventListener('click', function() {
    menuWrapper.classList.add('hidden')
    ruleMenu.classList.remove('hidden')
})

actualiser.addEventListener('click', actualiserPion);
rejouerDiv.addEventListener('click', function(){
    actualiserPion();
    console.log(compteurWinRed);
    console.log(compteurWinYellow);
    rejouerDiv.classList.add('hidden');
})

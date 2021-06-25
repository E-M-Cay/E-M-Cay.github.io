'use strict';   // Mode strict du JavaScript

/*************************************************************************************************/
/* **************************************** DONNEES JEU **************************************** */
/*************************************************************************************************/
// L'unique variable globale est un objet contenant l'état du jeu.
let game;

// Déclaration des constantes du jeu, rend le code plus compréhensible
const PLAYER = 'player';
const DRAGON = 'dragon';

const LEVEL_EASY = 1;
const LEVEL_NORMAL = 2;
const LEVEL_HARD = 3;
const CLASS_THIEF = 1;
const CLASS_KNIGHT = 2;
const CLASS_MAGE = 3;
const main = document.getElementsByTagName("main")[0];
let gameDiv = document.createElement("div");

/*************************************************************************************************/
/* *************************************** FONCTIONS JEU *************************************** */
/*************************************************************************************************/
/**/



 //@returns {string} - DRAGON|PLAYER
 
function getAttacker() {
   
    let dragonInit = throwDices(10, 6);
    let playerInit = throwDices(10, 6);
    let thiefModifier = throwDices(1, 6);

    while (dragonInit === playerInit) {
        dragonInit = throwDices(10, 6);
        playerInit = throwDices(10, 6);
    }
    //if (game.class === CLASS_THIEF) {player }
    //console.log(`player init: ${playerInit}, dragon init: ${dragonInit}`)
    if (dragonInit < playerInit) {
        //console.log("attacker: player");
        return PLAYER;
    } else {
        //console.log("attacker: dragon");
        return DRAGON;
    }
   
}


//if (istrue)
/**
 * Calcule les points de dommages causés par le dragon au chevalier
 * @returns {number} - le nombre de points de dommages
 */
function computeDamagePoint(attacker) {


    let rawDamage = throwDices(3, 6);
    let damage;
    let thiefModifer;
    //console.log(rawDamage);
    let modifier;
    if (game.gameLevel === LEVEL_EASY) {
        modifier = throwDices(2, 6);
        thiefModifer = throwDices(1, 6);
        //console.log(modifier);
        switch (attacker) {
            case PLAYER:
                damage = Math.ceil(rawDamage * (1 + (modifier / 100)));
                if (game.class === CLASS_THIEF) {
                    Math.ceil(rawDamage * (1 + (modifier / 100)));
                } else {
                    damage = Math.ceil(rawDamage * (1 + (modifier / 100)) * (1));
                }
                break;
            case DRAGON:
                //console.log("test");
                damage = Math.ceil(rawDamage * (1 - (modifier / 100)));
                break;
            default:
                alert('Error with ComputeDamagePoint');
                break;
        }
    } else if (game.gameLevel === LEVEL_HARD) {
        modifier = throwDices(1, 6);
        switch (attacker) {
            case PLAYER:
                damage = Math.ceil(rawDamage * (1 - (modifier / 100)));
                break;
            case DRAGON:
                //console.log("test");
                damage = Math.ceil(rawDamage * (1 + (modifier / 100)));
                break;
            default:
                alert('Error with ComputeDamagePoint');
                break;
        }
    } else {
        damage = rawDamage;
    }


    return damage;

}


function gameLoop() {
    while (game.dragonHP > 0 && game.playerHP > 0) {
        let attacker = getAttacker();
        let damage = computeDamagePoint(attacker);
        switch (attacker) {
            case PLAYER:
                game.dragonHP = game.dragonHP - damage;
                if (game.dragonHP < 0) { game.dragonHP = 0 };
                //console.log('Dragon: ' + game.dragonHP);
                break;
            case DRAGON:
                game.playerHP = game.playerHP - damage;
                if (game.playerHP < 0) { game.playerHP = 0 };
                //console.log('player: ' + game.playerHP)
                break;
            default:
                alert('Error with gameLoop');
        }
        showGameLog(attacker, damage);
        showGameState();
        game.round++;
    }
}

function initializeGame() {
    game = { gameLevel: 2, playerHP: 0, dragonHP: 0, round: 1, startDragonHP: 0, startPlayerHP: 0, class: 2 }

    
    game.gameLevel = requestInteger("Veuillez choisir un niveau de difficulté entre : 1 (facile), 2 (normal) et 3 (difficile)", 1, 3);
    game.class = requestInteger("Veuillez choisir une classe entre : 1 (Voleur), 2 (Chevalier) et 3 (Mage)", 1, 3);
    
    switch (game.gameLevel) {
        case 1:
            game.playerHP = 100 + throwDices(10, 10);
            game.dragonHP = 100 + throwDices(5, 10);
            game.gameLevel = LEVEL_EASY;
            break;
        case 2:
            game.playerHP = 100 + throwDices(10, 10);
            game.dragonHP = 100 + throwDices(10, 10);
            game.gameLevel = LEVEL_NORMAL;
            break;
        case 3:
            game.playerHP = 100 + throwDices(7, 10);
            game.dragonHP = 100 + throwDices(10, 10);
            game.gameLevel = LEVEL_HARD;
            break;
        default:
            alert('Error with game initialization')
            break;

    }
    game.startPlayerHP = game.playerHP;
    game.startDragonHP = game.dragonHP;
    
    let writeTitle = document.createElement("h2");
    writeTitle.innerHTML = "Que la fête commence !!";
    main.appendChild(gameDiv);
    gameDiv.appendChild(writeTitle);
    gameDiv.classList.add('game');
    showGameState();
    //console.log(game);
}

//console.log(computeDamagePoint(PLAYER));

function showGameLog(attacker, damagePoints) {

    let logTitle = document.createElement("h3");
    let logFig = document.createElement("figure");
    let logImg = document.createElement("img");
    let logCaption = document.createElement("caption");
    gameDiv.appendChild(logTitle);
    gameDiv.appendChild(logFig);
    logFig.appendChild(logImg);
    logFig.appendChild(logCaption);
    logTitle.innerHTML = `Tour n°${game.round}`;
    logFig.classList.add("game-round");
    if (attacker === PLAYER) {
        logCaption.innerHTML = `Vous êtes le plus rapide, vous attaquez le dragon et lui infligez ${damagePoints} points de dommage !`;
        logImg.setAttribute("src", "./images/knight-winner.png")
    } else if (attacker === DRAGON) {
        logCaption.innerHTML = `Le dragon prend l'initiative, vous attaque et vous inflige ${damagePoints} points de dommage !`;
        logImg.setAttribute("src", "./images/dragon-winner.png")
    } else (alert('Error with attacker in showgamelog'));


  
}


function showGameState() {

    let stateDiv = document.createElement("div");
    let StateFigPla = document.createElement("figure");
    let stateImgPla = document.createElement("img");
    let stateCaptionPla = document.createElement("figcaption");
    let StateFigDra = document.createElement("figure");
    let stateImgDra = document.createElement("img");
    let stateCaptionDra = document.createElement("figcaption");
    StateFigPla.appendChild(stateImgPla);
    StateFigPla.appendChild(stateCaptionPla);
    stateDiv.appendChild(StateFigPla);
    StateFigDra.appendChild(stateImgDra);
    StateFigDra.appendChild(stateCaptionDra);
    stateDiv.appendChild(StateFigDra);
    gameDiv.appendChild(stateDiv);
    stateImgPla.setAttribute("src", "./images/knight.png")
    if (game.playerHP < 0.3 * game.startPlayerHP) { stateImgPla.setAttribute("src", "./images/knight-wounded.png") }
    stateImgDra.setAttribute("src", "./images/dragon.png")
    if (game.dragonHP < 0.3 * game.startDragonHP) { stateImgDra.setAttribute("src", "./images/dragon-wounded.png") }
    stateDiv.classList.add("game-state");
    StateFigPla.classList.add("game-state_player")
    StateFigDra.classList.add("game-state_player")
    stateCaptionPla.innerHTML = `${game.playerHP} PV`;
    stateCaptionDra.innerHTML = `${game.dragonHP} PV`;

    
}


function showGameWinner() {
    let footer = document.createElement("footer");
    let footTitle = document.createElement("h3");
    let footFig = document.createElement("figure");
    let footImg = document.createElement("img");
    let footCaption = document.createElement("figcaption");
    gameDiv.appendChild(footer);
    footer.appendChild(footTitle);
    footer.appendChild(footFig);
    footFig.appendChild(footCaption);
    footFig.appendChild(footImg);

    footTitle.innerHTML = "Fin de la partie";
    footFig.classList.add("game-end");
    if (game.dragonHP === 0) {
        footCaption.innerHTML = "Vous avez vaincu le dragon avec bravoure !"
        footImg.setAttribute("src", "./images/knight-winner.png");
    } else {
        footCaption.innerHTML = "Vous avez perdu le combat, le dragon vous a carbonisé !"
        footImg.setAttribute("src", "./images/dragon-winner.png");
    }

}

function startGame() {
    // Etape 1 : initialisation du jeu
    initializeGame();
    // Etape 2 : exécution du jeu, déroulement de la partie
    gameLoop();
    // Fin du jeu, affichage du vainqueur
    showGameWinner();
}


/*************************************************************************************************/
/* ************************************** CODE PRINCIPAL *************************************** */
/*************************************************************************************************/
startGame()
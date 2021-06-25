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


/* Détermine qui du joueur ou du dragon prend l'initiative et attaque
 * @returns {string} - DRAGON|PLAYER
 */
function getAttacker() {
    // On lance 10D6 pour le joueur et pour le dragon
    // On compare les scores d'initiatives et on retourne le résultat
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
    //on retourne l'attaquant
}


//if (istrue)
/**
 * Calcule les points de dommages causés par le dragon au chevalier
 * @returns {number} - le nombre de points de dommages
 */
function computeDamagePoint(attacker) {
    // On tire 3D6 pour le calcul des points de dommages causés par le dragon

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

    // Qui va attaquer lors de ce tour de jeu ?

    // Combien de dommages infligent l'assaillant = PV que va perdre le personnage attaqué

    // Est-ce que le dragon est plus rapide que le joueur ? (condition)

    // Diminution des points de vie du joueur.

    //sinon

    // Diminution des points de vie du dragon.


    // Affichage du journal : que s'est-il passé ?

    // Affichage de l'état du jeu

    // On passe au tour suivant.
}
/**
 * Initialise les paramètres du jeu
 *  Création d'un objet permettant de stocker les données du jeu
 *      ->  les données seront stockées dans une propriété de l'objet,
 *          on évite ainsi de manipuler des variables globales à l'intérieur des fonctions qui font évoluer les valeurs
 *
 * Quelles sont les données necessaires tout au long du jeu (pour chaque round)
 *    -  N° du round (affichage)
 *    -  Niveau de difficulté (calcul des dommages)
 *    -  Points de vie du joueur ( affichage + fin de jeu )
 *    -  Points de vie du dragon ( affichage + fin de jeu )
 */
function initializeGame() {
    // Initialisation de la variable globale du jeu. (qui sera un objet) qu'on initialise au premier round
    game = { gameLevel: 2, playerHP: 0, dragonHP: 0, round: 1, startDragonHP: 0, startPlayerHP: 0, class: 2 }

    // Choix du niveau du jeu (que l'on stock dans l'objet)
    game.gameLevel = requestInteger("Veuillez choisir un niveau de difficulté entre : 1 (facile), 2 (normal) et 3 (difficile)", 1, 3);
    game.class = requestInteger("Veuillez choisir une classe entre : 1 (Voleur), 2 (Chevalier) et 3 (Mage)", 1, 3);
    /*
    * Détermination des points de vie de départ selon le niveau de difficulté. (switch)
    * 10 tirages, la pondération se joue sur le nombre de faces
    *    -> plus il y a de faces, plus le nombre tiré peut-être élévé
    */
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
    /*détermine les points de vie du joueur et du dragon*/
    let writeTitle = document.createElement("h2");
    writeTitle.innerHTML = "Que la fête commence !!";
    main.appendChild(gameDiv);
    gameDiv.appendChild(writeTitle);
    gameDiv.classList.add('game');
    showGameState();
    //console.log(game);
    //Etat du joueur et du dragon
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


    // Si c'est le dragon qui attaque...


    //sinon le player

    // Affichage des informations du tour dans le document HTML celui de l'attaq

    //numéro du round titre 3

    //figure

    //img

    //figcaption

    //fermeture figcaption

    //fermeture figure

}

/**
 * Affichage de l'état du jeu, c'est-à-dire des points de vie respectifs des deux combattants
 */
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

    /*----------------*/
}

/**
 * Affichage du vainqueur
 */
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
/**
 * Fonction principale du jeu qui démarre la partie
 */
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
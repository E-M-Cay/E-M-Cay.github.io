'use strict';   // Mode strict du JavaScript

/*
  https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Math/random
  La fonction Math.random() renvoie un nombre flottant pseudo-aléatoire compris dans l'intervalle [0, 1[ (ce qui signifie que 0 est compris dans l'intervalle mais que 1 en est exclu)

  Ce nombre peut ensuite être multiplié afin de couvrir un autre intervalle.
  Nota : Dans l'exemple correspondant, on ramène min/max à une valeur entière
    min = 5.2 -> 6
    max = 8.3 -> 8

  https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Math/floor
  La fonction Math.floor(x) renvoie le plus grand entier qui est inférieur ou égal à un nombre x.

  Math.floor(5.95) -> 5

  https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Math/ceil
  La fonction Math.ceil() retourne le plus petit entier supérieur ou égal au nombre donné.

  Math.ceil(7.004) -> 8
*/
/*************************************************************************************************/
/* *********************************** FONCTIONS UTILITAIRES *********************************** */
/*************************************************************************************************/
/*
  Objectif de la fonction

  Eviter une demande de saisie libre sujette à erreurs et compliquée à tester
  La fonction doit pouvoir être utilisée pour n'importe quel besoin

    Proposer à l'utilisateur de saisir un réponse parmi celles attendues

      -> Demander à l'utilisateur de choisir une valeur parmi celles proposées dans le message affiché par prompt()
      -> Tant que l'utilisateur ne saisit pas une des valeurs attendues, représenter le prompt

    Le plus simple est donc que les valeurs soit des nombres entiers, chaque nombre correspondant à un choix explicite, affiché dans le message

    En fonction du la demande, le nombre de réponses possibles peut varier
    Nous savons tester si la réponse est un nombre,
    Reste à voir si ce nombre fait partie des valeurs attendues
      Une piste : les intervalles

  La fonction doit prendre en paramètre :
  Le message affichant les choix correspondants à un nombre à saisir
  L'intervalle entre le numéro du premier chiox et celui du dernier

  Si la valeur est un entier et que cet entier est compris dans l'intervalle, la saisie est correcte !

*/

/**
 * Demande à l'utilisateur un entier entre 2 bornes et retourne cet entier
 * @param {string} message Le message affiché à l'utilisateur dans la boîte de dialogue
 * @param {number} min La borne minimale
 * @param {number} max La borne maximale
 * @returns {number}
 */
function requestInteger(message, min, max) {
  //création d'une variable intéger
  let myInteger;
  /*
   * La boucle s'exécute tant que l'entier n'est pas un nombre (fonction isNaN()) et
   * n'est pas compris entre les arguments min et max -> [min,max].
   */
  while (!Number.isInteger(myInteger) || myInteger < min || myInteger > max) {
    myInteger = Number(prompt(message));
  }
  return myInteger;
  //retourne la valeur

}

//requestInteger("Veuillez choisir un niveau de difficulté entre : 1 (facile), 2 (normal) et 3 (difficile)",1,3);
/*
  getRandomInteger(200,250) doit renvoyer un nombre compris entre 200 et 250 inclus
    Le nombre doit se situer dans l'intervalle [200,250]
      -> 51 possibilités = 250 - 200 + 1

  Pour obtenir une valeur sur ces 51 possibilités :
    51 * tirage aléatoire entre [0,1[
      renvoie une valeur flottante comprise dans l'intervalle [0,51[
      en ramenant au plud grand entier inférieur ou égal, on récupère un entier dans [0,50]

  Exemple :
    Si Math.random() renvoie 0.28
      => 51 * 0.28 = 14.28
    Or, le nombre doit être un entier
      => Math.floor(14.28) -> 14
    Et être compris entre 200 et 250
      => 14 + 200 = 214
*/

/**
 * Tire un entier au hasard et le retourne
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function getRandomInteger(min, max) {
  return (Math.floor(Math.random() * (max - min + 1)) + min); //retourne la valeur arrondis tiré au hasard compris entre min et max
}

//console.log(getRandomInteger(290, 300));

/**
 * Simule un lancé de dés (throw = jeter / dices = dés )
 * @param {number} dices - Nombre de dés que l'on souhaite lancer
 * @param {number} sides - Nombre de faces par dé
 * @returns {number} - Le total de la somme des dés
 */
function throwDices(dices, sides) {
  // Déclaration des variables locales à la fonction throwDices() index et sum
  let sum = 0;
  let diceArray = [];
  function reducer(accumulator, currentValue) {
    return accumulator + currentValue;
  }
  for (let i = 1; i <= dices; i++) {
    diceArray.push(Math.ceil(Math.random() * sides));
  }
  //console.log(diceArray);
  sum = diceArray.reduce(reducer);
  return sum;
}
  /*
dices = nombre de jets de dés
Pour chaque jet de dé, le tirage renvoie un nombre entier compris entre 1 et le nombre de faces du dé
*/
  // Pour chaque jet de dé : un tirage aléatoire compris dans [1,sides] BOUCLE

  // ...on le lance et on ajoute sa valeur à la somme totale


  // Retour en résultat de la somme totale des dés


/*console.log(throwDices(5, 5));
console.log(throwDices(10,10))*/
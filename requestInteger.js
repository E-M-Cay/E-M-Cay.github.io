function requestInteger(message, min, max) {
    //création d'une variable intéger
    let myInteger
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
// ==UserScript==
// @name         GeoGuessr Z shortcut
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  map the back function of geoguessr to Z key
// @author       Wally
// @match        https://www.geoguessr.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=geoguessr.com
// @grant        none
// @license MIT
// @require https://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==

// prevent space from scrolling down
/*
window.addEventListener('keydown', function(e) {
  if(e.keyCode == 0x5A && e.target == document.body) {
    e.preventDefault();
  }
});
*/

var buttonMiddle = 2; // bouton de la molette
var buttonRight = 3; // bouton droit
var buttonFwd = 5; //bouton avance
var buttonBack = 4; //bouton recule

// Modification du bouton à prendre en compte
var mappedButton = buttonMiddle;
// Modification de la touche à prendre en compte : ligne
var mappedKey_key ="z";
var mappedKey_code = "Z";
var mappedKey_keyCode = 0x5A;

document.body.onauxclick = function(e) {
    // on vérifie quel bouton de la souris a été cliqué
    if (e.which == mappedButton) {
        e.preventDefault(); //on ne fait pas ce que l'événement par défaut prévoit
        retourArriere();
    }
    //alert("click " + e.which);
    }

document.body.onkeyup = function(e) {
    // on cherche si z ou Z est appuyé, et si on n'est pas sur un champ de saisie de texte
    var el = document.activeElement;
    var input_selected = (el && (el.tagName.toLowerCase() == 'input' && el.type == 'text' || el.tagName.toLowerCase() == 'textarea'))

    if ((e.key == mappedKey_key ||
        e.code == mappedKey_code ||
        e.keyCode == mappedKey_keyCode)
        && !input_selected
       ) {
        e.preventDefault(); //on ne fait pas ce que l'événement par défaut prévoit
        retourArriere();
    }
}

function retourArriere() {
    // clic sur le bouton de fonction "back"
    var undo_move = $("[data-qa*='undo-move']");
    if (undo_move.length){
        // clic sur le premier trouvé de la liste (pourquoi y en aurait-il plusieurs ? allez savoir ...)
        undo_move[0].click();
        return
    }
}

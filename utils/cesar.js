//str input
let phrase_decodee = "Hello World!!!";
let shift = 5;
let tableau_letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let phrase_codee = "";
for (let i = 0; i < phrase_decodee.length; i++) {
  let letter = phrase_decodee[i].toUpperCase();
  let index = tableau_letters.indexOf(letter);
  if (index !== -1) {
    // si la lettre est dans le tableau
    let new_index = (index + shift) % 26; //
    phrase_codee = phrase_codee.substring(0, i) + tableau_letters[new_index];
  }
  if (index == -1) {
    phrase_codee = phrase_codee.substring(0, i) + letter;
  }
}
console.log(phrase_decodee);
console.log(shift);
console.log(phrase_codee);

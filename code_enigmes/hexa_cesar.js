let tableau_letters = {
  A: "1",
  B: "2",
  C: "3",
  D: "4",
  E: "5",
  F: "6",
  G: "7",
  H: "8",
  I: "9",
  J: "A",
  K: "B",
  L: "C",
  M: "D",
  N: "E",
  O: "F",
  P: "10",
  Q: "11",
  R: "12",
  S: "13",
  T: "14",
  U: "15",
  V: "16",
  W: "17",
  X: "18",
  Y: "19",
  Z: "1A",
};
let phrase_decodee = "hello World!!!";
let phrase_codee = "";
let phrase_codee_hexa = "";
let shift = 3; // Example shift value

for (let i = 0; i < phrase_decodee.length; i++) {
  let letter = phrase_decodee[i].toUpperCase();
  let hexValue = tableau_letters[letter];

  if (hexValue) {
    // Convert hex value to decimal index
    let index = parseInt(hexValue, 16);
    let new_index = (index + shift) % 27;

    // Find the new letter by its index
    let new_letter = Object.keys(tableau_letters).find(
      (key) => parseInt(tableau_letters[key], 16) === new_index
    );

    phrase_codee += new_letter ? new_letter : letter;
    phrase_codee_hexa += tableau_letters[new_letter]
      ? tableau_letters[new_letter]
      : letter;
  } else {
    phrase_codee += letter;
    phrase_codee_hexa += letter;
  }
}

console.log(phrase_decodee);
console.log(shift);
console.log(phrase_codee);
console.log(phrase_codee_hexa);

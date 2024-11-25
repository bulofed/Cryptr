const tableauLetters = {
  A: '1',
  B: '2',
  C: '3',
  D: '4',
  E: '5',
  F: '6',
  G: '7',
  H: '8',
  I: '9',
  J: 'A',
  K: 'B',
  L: 'C',
  M: 'D',
  N: 'E',
  O: 'F',
  P: '10',
  Q: '11',
  R: '12',
  S: '13',
  T: '14',
  U: '15',
  V: '16',
  W: '17',
  X: '18',
  Y: '19',
  Z: '1A'
}
const phraseDecodee = 'hello World!!!'
let phraseCodee = ''
let phraseCodeeHexa = ''
const shift = 3 // Example shift value

for (let i = 0; i < phraseDecodee.length; i++) {
  const letter = phraseDecodee[i].toUpperCase()
  const hexValue = tableauLetters[letter]

  if (hexValue) {
    // Convert hex value to decimal index
    const index = parseInt(hexValue, 16)
    const newIndex = (index + shift) % 27

    // Find the new letter by its index
    const newLetter = Object.keys(tableauLetters).find(
      key => parseInt(tableauLetters[key], 16) === newIndex
    )

    phraseCodee += newLetter || letter
    phraseCodeeHexa += tableauLetters[newLetter]
      ? tableauLetters[newLetter]
      : letter
  } else {
    phraseCodee += letter
    phraseCodeeHexa += letter
  }
}

console.log(phraseDecodee)
console.log(shift)
console.log(phraseCodee)
console.log(phraseCodeeHexa)

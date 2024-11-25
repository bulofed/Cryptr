// str input
const phraseDecodee = 'Hello World!!!'
const shift = 5
const lettres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
let phraseCodee = ''
for (let i = 0; i < phraseDecodee.length; i++) {
  const letter = phraseDecodee[i].toUpperCase()
  const index = lettres.indexOf(letter)
  if (index !== -1) {
    // si la lettre est dans le tableau
    const newIndex = (index + shift) % 26 //
    phraseCodee = phraseCodee.substring(0, i) + lettres[newIndex]
  }
  if (index === -1) {
    phraseCodee = phraseCodee.substring(0, i) + letter
  }
}
console.log(phraseDecodee)
console.log(shift)
console.log(phraseCodee)

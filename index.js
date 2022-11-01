const { WORDS_TO_GUESS } = require("./constants");
const constants = require("./constants");
// In node.js: install a prompt library by running: `npm install prompt-sync` in the current folder
const prompt = require("prompt-sync")();

//console.log(figure);
let randomWords = [];
let answer = prompt("Choose difficulty: ");
if (answer === "easy") {
  randomWords =
    WORDS_TO_GUESS.easy[Math.floor(Math.random() * WORDS_TO_GUESS.easy.length)];
  //lives = 6;
} else if (answer === "hard") {
  randomWords =
    WORDS_TO_GUESS.hard[Math.floor(Math.random() * WORDS_TO_GUESS.easy.length)];
  //lives = 3;

  console.log(randomWords);
}
let randomValue = randomWords;
let gameStatus = [];
for (let i = 0; i < randomValue.length; i++) {
  gameStatus[i] = "_";
}
console.log(gameStatus);

// Here you see an example how to get your
// constants from constants.js
// for(let figure of constants.HANGMAN_PICS)
// {
//     console.log(figure);
// }

// how to use the prompt - e.g.:
// const name = prompt('What is your name?');

function generateWordOnScreen(wordToGuess,guessedLetters) {
  let displayedLetters =[]
  for(const guessedLetter of guessedLetters){
    for(const letterOfWord of wordToGuess){
      if(letterOfWord === guessedLetter){
        displayedLetters.push(guessedLetter)
      } else {
        displayedLetters.push("_")
      }
    }
  }
  return displayedLetters;

}
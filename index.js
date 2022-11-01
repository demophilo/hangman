const { WORDS_TO_GUESS } = require("./constants");
const constants = require("./constants");
// In node.js: install a prompt library by running: `npm install prompt-sync` in the current folder
const prompt = require("prompt-sync")();

//console.log(figure);

function chooseDifficulty () {
  let difficulty = 0;
  while (difficulty !== 1 || difficulty !== 2) {
    difficulty = prompt("Choose difficulty: \n\"1\" for easy and \"2\"for hard:");
  }
  return difficulty;
}

function chooseWordToGuess(difficulty) {
  let wordToGuess;
  if (difficulty === 1) {
    wordToGuess = WORDS_TO_GUESS.easy[Math.floor(Math.random() * WORDS_TO_GUESS.easy.length)];
  } else {
    wordToGuess = WORDS_TO_GUESS.hard[Math.floor(Math.random() * WORDS_TO_GUESS.easy.length)];
  }
  return wordToGuess;
}





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
  for (const guessedLetter of guessedLetters){
    for (const letterOfWord of wordToGuess) {
      if(letterOfWord === guessedLetter) {
        displayedLetters.push(guessedLetter)
      } else {
        displayedLetters.push("_")
      }
    }
  }
  return displayedLetters;

}
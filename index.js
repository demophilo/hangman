/*
Global variables section
 */

const { WORDS_TO_GUESS } = require("./constants");
const constants = require("./constants");
// In node.js: install a prompt library by running: `npm install prompt-sync` in the current folder
const prompt = require("prompt-sync")();


const alphabet ={
  "a": "a",
  "b": "b",
  "c": "c",
  "d": "d",
  "e": "e",
  "f": "f",
  "g": "g",
  "h": "h",
  "i": "i",
  "j": "j",
  "k": "k",
  "l": "l",
  "m": "m",
  "n": "n",
  "o": "o",
  "p": "p",
  "q": "q",
  "r": "r",
  "s": "s",
  "t": "t",
  "u": "u",
  "v": "v",
  "w": "w",
  "x": "x",
  "y": "y",
  "z": "z"
}
/*
Functions section
 */

function chooseDifficulty () {
  let difficulty = "0";
  while (!((difficulty === "1") || (difficulty === "2"))) {
    difficulty = prompt("Choose difficulty: \"1\" for easy and \"2\" for hard:");
  }
  return difficulty;
}


function chooseWordToGuess(difficulty) {
  let wordToGuess;
  if (difficulty === "1") {
    wordToGuess = WORDS_TO_GUESS.easy[Math.floor(Math.random() * WORDS_TO_GUESS.easy.length)];
  } else {
    wordToGuess = WORDS_TO_GUESS.hard[Math.floor(Math.random() * WORDS_TO_GUESS.easy.length)];
  }
  return wordToGuess;
}


function generateWordOnScreen(wordToGuess,guessedLetters) {
  let displayedLetters =[];
  for (const letterOfWord of wordToGuess){
    for (const guessedLetter of guessedLetters) {
      if(letterOfWord === guessedLetter) {
        displayedLetters.push(guessedLetter);
        break;
      } else {
        displayedLetters.push("_")
      }
    }
  }
  let displayedWord = displayedLetters.join("");
  return displayedLetters;
}


function generateLettersToChoose(chosenLetters) {
  let lettersToChoose = [];
  for (const chosenLetter of Object.valueOf(chosenLetters)) {
    for (const letterInAlphabet of Object.valueOf(alphabet)) {
      if (chosenLetter === letterInAlphabet) {
        lettersToChoose.push(_);
      } else {
        lettersToChoose.push(letterInAlphabet );
      }
    }
  }
  return lettersToChoose;
}


/*
Main program
 */


let difficulty = chooseDifficulty();
let wordToGuess = chooseWordToGuess(difficulty);
console.log(wordToGuess);

//console.log(figure);



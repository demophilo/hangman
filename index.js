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

function gameMode () {
  let input = "0";
  while (!((input === "1") || (input === "2"))) {
    input = prompt("Choose game mode: \"1\" for easy and \"2\" for hard:");
  }
  if (input === "1") {
    input ="easy";
  } else {
    input = "hard"
  }
  return input;
}



function chooseWordToGuess(gameMode) {
  let wordToGuess;
  if (gameMode === "easy") {
    wordToGuess = WORDS_TO_GUESS.easy[Math.floor(Math.random() * WORDS_TO_GUESS.easy.length)];
  } else {
    wordToGuess = WORDS_TO_GUESS.hard[Math.floor(Math.random() * WORDS_TO_GUESS.easy.length)];
  }
  return wordToGuess;
}


function generateWordOnScreen(wordToGuess,chosenLetters) {
  let displayedLetters =[];
  for (const letterOfWord of wordToGuess){
    for (const guessedLetter of chosenLetters.value()) {
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

let chosenLetters = new Set();
function inputChosenLetter(chosenLetters) {
  let chosenLetter = "unit";
  while (chosenLetter.length !== 1){
    chosenLetter = prompt("Which letter to attempt?   ");
    chosenLetter = chosenLetter.trim();
    chosenLetter = chosenLetter.toLowerCase();
  }
  chosenLetters.add(`chosenLetter`)
  return chosenLetters;
}
console.log(inputChosenLetter().values())

function generateLettersToChoose(chosenLetters) {
  let lettersToChoose = [];
  for (const chosenLetter of Object.valueOf(chosenLetters)) {
    for (const letterInAlphabet of Object.valueOf(alphabet)) {
      if (chosenLetter === letterInAlphabet) {
        lettersToChoose.push("_");
      } else {
        lettersToChoose.push(letterInAlphabet );
      }
    }
  }
  return lettersToChoose;
}




/*
Main program ---



difficulty = chooseDifficulty();
wordToGuess = chooseWordToGuess(difficulty);
chosenLetter = inputChosenLetter();
chosenLetters.add(chosenLetter);
wordOnScreen = generateWordOnScreen(wordToGuess, chosenLetters)
console.log(generateWordOnScreen(chooseWordToGuess()))
*/

//console.log(figure);



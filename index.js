/*
Global variables section
 */

const { WORDS_TO_GUESS } = require("./constants");
const HANGMAN_PICS = require("./constants");
// In node.js: install a prompt library by running: `npm install prompt-sync` in the current folder
const prompt = require("prompt-sync")();


function choseGameMode() {
  let key;
  while (!((key === "1") || (key === "2"))) {
    key = prompt("Choose game: \"1\" for easy \"2\" for hard: ");
  }
  if (key === "1"){
    return "easy";
  } else if (key === "2") {
    return "hard";
  }
}


function chooseWordToGuess(gameMode) {
  let wordToGuess;
  if (gameMode === "easy") {
    wordToGuess = WORDS_TO_GUESS.easy[Math.floor(Math.random() * WORDS_TO_GUESS.easy.length)];
  } else if (gameMode === "hard"){
    wordToGuess = WORDS_TO_GUESS.hard[Math.floor(Math.random() * WORDS_TO_GUESS.easy.length)];
  }
  return wordToGuess;
}

function setLives(gameMode){
  let lives;
  if (gameMode === "easy") {
    lives = 7;
  } else if (gameMode === "hard"){
    lives = 4;
  }
  return lives;
}


function inputChosenLetter() {
  let input ="";
  while (input.length !== 1) {
    input = prompt("Which letter to attempt? ");
    if (input === "quit") {
      input = "ü"
    }
    input = input.toLowerCase();
    input = input.trim();
  }
  return input;
}

function generateWordOnScreen(wordToGuess, rightLetters) {
  let lettersOfWord = wordToGuess.split("");
  let displayedLetters =[];
  for (const letterOfWord of lettersOfWord) {
    if (rightLetters.has(letterOfWord)) {
      displayedLetters.push(letterOfWord);
    } else if (!rightLetters.has(letterOfWord)) {
      displayedLetters.push("_");
    }
  }
  let displayedWord = displayedLetters.join("");
  return displayedWord;
}




console.log("\n".repeat(50));
let gameMode = choseGameMode();
let wordToGuess = chooseWordToGuess(gameMode);
console.log(wordToGuess);
let startingLives = setLives(gameMode);
let lettersInWord = new Set(wordToGuess.split(""));
let chosenLetters = new Set();
let rightLetters = new Set();
let wrongLetters = new Set();
let remainingLives = 1;
let won = false;

while (!(remainingLives === 0 || won === true)) {
  let chosenLetter = inputChosenLetter();
  if (chosenLetter === 0){
    break;
  }
  chosenLetters.add(chosenLetter);
  if (lettersInWord.has(chosenLetter)){
    rightLetters.add(chosenLetter);
  } else if (!lettersInWord.has(chosenLetter)) {
    wrongLetters.add(chosenLetter);
  }
  remainigLives = startingLives - wrongLetters.size;

  let displayedWord = generateWordOnScreen(wordToGuess,rightLetters)
  if (rightLetters.size === lettersInWord.size) {
    won = true;
  } else if (rightLetters.size === lettersInWord.size) {
    won = false;
  }
  console.log("\n".repeat(50));
  console.log(HANGMAN_PICS.HANGMAN_PICS[7-remainigLives]);
  console.log(displayedWord);
  console.log("Remaining lives:  ", remainigLives);
}
if (won === true) {
  console.log("Won!");
} else if (won === false) {
  console.log("Lost");
}

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


const { WORDS_TO_GUESS } = require("./constants");
const HANGMAN_PICS = require("./constants");
// In node.js: install a prompt library by running: `npm install prompt-sync` in the current folder
const prompt = require("prompt-sync")();

const GAMEMODE_EASY = "easy";
const GAMEMODE_HARD = "hard";


const QUIT = "quit";
const ALLOWED_CHARACTERS = new Set("abcdefghijklmnopqrstuvwxyz".split(""));
function choseGameMode() {
  let key = "";
  console.clear();
  console.log("Choose game: \"1\" for easy \"2\" for hard: ");
  while (!((key === "1") || (key === "2"))) {
    key = prompt();
  }
  if (key === "1"){
    return GAMEMODE_EASY;
  }
  else if (key === "2") {
    return GAMEMODE_HARD;
  }
}

function getRandomItem(list) {
  let randomItem = list[Math.floor(Math.random() * list.length)];
  return randomItem;
}

function chooseWordToGuess(gameMode) {
  let wordToGuess = "";
  if (gameMode === GAMEMODE_EASY) {
    wordToGuess = getRandomItem(WORDS_TO_GUESS.easy);
  }
  else {//else if (gameMode === GAMEMODE_HARD){
    wordToGuess = getRandomItem(WORDS_TO_GUESS.hard);
  }
  return wordToGuess;
}


function setLives(gameMode){
  let lives;
  if (gameMode === GAMEMODE_EASY) {
    lives = 6;
  }
  else {//else if (gameMode === GAMEMODE_HARD){
    lives = 3;
  }
  return lives;
}


function generateWordOnScreen(wordToGuess, rightLetters) {
  let lettersOfWord = wordToGuess.split("");
  let displayedLetters =[];
  for (const letterOfWord of lettersOfWord) {
    if (rightLetters.has(letterOfWord)) {
      displayedLetters.push(letterOfWord);
    }
    else if (!rightLetters.has(letterOfWord)) {
      displayedLetters.push("_");
    }
  }
  return displayedLetters.join("");
}


function inputChosenLetter() {
  let input ="";

  while (input.length !== 1) {
    input = prompt("Which letter to attempt? ");
    if (input === QUIT) {
      break;
    }
    input = input.trim();
    input = input.toLowerCase();
    if (!ALLOWED_CHARACTERS.has(input)) {
      input = "";
    }
  }
  return input;
}


console.clear();
let gameMode = choseGameMode();
let wordToGuess = chooseWordToGuess(gameMode);
console.log(wordToGuess); // remove after presentation
let startingLives = setLives(gameMode);
let lettersInWord = new Set(wordToGuess.split(""));
let chosenLetters = new Set();
let rightLetters = new Set();
let wrongLetters = new Set();
let remainingLives = 1;
let won = false;
console.clear();
console.log(HANGMAN_PICS.HANGMAN_PICS[1]);
console.log("_".repeat(wordToGuess.length));

while (!won && remainingLives > 0) {
  let chosenLetter = inputChosenLetter();
  if (chosenLetter === QUIT){
    break;
  }
  chosenLetters.add(chosenLetter);
  if (lettersInWord.has(chosenLetter)) {
    rightLetters.add(chosenLetter);
  } else if (!lettersInWord.has(chosenLetter)) {
    wrongLetters.add(chosenLetter);
  }
  remainingLives = startingLives - wrongLetters.size;

  let displayedWord = generateWordOnScreen(wordToGuess,rightLetters);
  if (rightLetters.size === lettersInWord.size) {
    won = true;
  } 

  console.clear();
  console.log(HANGMAN_PICS.HANGMAN_PICS[HANGMAN_PICS.HANGMAN_PICS.length-remainingLives-1]);
  console.log(displayedWord);
  console.log("Remaining lives:  ", remainingLives);
}

if (won === true) {
  console.clear();
  console.log(HANGMAN_PICS.HANGMAN_PICS[0])
} else {//else if (won === false) {
  console.clear();
  console.log(HANGMAN_PICS.HANGMAN_PICS[HANGMAN_PICS.HANGMAN_PICS.length-1] + "  Lost");
}




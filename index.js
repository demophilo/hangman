
const { WORDS_TO_GUESS } = require("./constants");
const HANGMAN_PICS = require("./constants");
// In node.js: install a prompt library by running: `npm install prompt-sync` in the current folder
const prompt = require("prompt-sync")();

const GAMEMODE_EASY = "easy";
const GAMEMODE_HARD = "hard";


const QUIT = "quit";

const ALLOWED_CHARACTERS = new Set(["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o",
"p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]);

function choseGameMode() {
  let key = "";
  console.log("Choose game: \"1\" for easy \"2\" for hard: ");
  while (!((key === "1") || (key === "2"))) {
    key = prompt();
  }
  if (key === "1"){
    return GAMEMODE_EASY;
  } else if (key === "2") {
    return GAMEMODE_HARD;
  }
}

function getRandomNumber(limit) {
  Math.floor(Math.random() * limit);
}

function chooseWordToGuess(gameMode) {
  let wordToGuess = "";
  if (gameMode === GAMEMODE_EASY) {
    wordToGuess = WORDS_TO_GUESS.easy[getRandomNumber(WORDS_TO_GUESS.easy.length)];
  } else {//else if (gameMode === GAMEMODE_HARD){
    wordToGuess = WORDS_TO_GUESS.hard[getRandomNumber(WORDS_TO_GUESS.easy.length)];
  }
  return wordToGuess;
}


function setLives(gameMode){
  let lives;
  if (gameMode === GAMEMODE_EASY) {
    lives = 6;
  } else {//else if (gameMode === GAMEMODE_HARD){
    lives = 3;
  }
  return lives;
}


function inputChosenLetter() {
  let input ="";

  while (input.length !== 1) {
    input = prompt("Which letter to attempt? ").toLowerCase();
    if (input === QUIT) {      
      break;
    }

    input = input.trim();
    
    if (!ALLOWED_CHARACTERS.has(input)) {
      input = "";
    }
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
  return displayedLetters.join("");
}

//const CLEARING = 33;
const NEWLINES = 15;
console.clear();
console.log("\n".repeat(NEWLINES));
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
console.log("\n".repeat(CLEARING) + "_".repeat(wordToGuess.length))

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

  console.log("\n".repeat(CLEARING));
  console.log(HANGMAN_PICS.HANGMAN_PICS[6-remainingLives]);
  console.log(displayedWord);
  console.log("Remaining lives:  ", remainingLives);
}

if (won === true) {
  console.log("\n".repeat(CLEARING));
  console.log("    O\n" +
    "   /|\\\n" +
    "   / \\\n" +
    "=========" +
    "   Won!")
} else {//else if (won === false) {
  console.log("\n".repeat(CLEARING));

  console.log(HANGMAN_PICS.HANGMAN_PICS[6] + "  Lost");
}


/*
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

*/

// 0. Confirm the file loaded
console.log("Hangman JS loaded!");

// 1. Game data
const words = ["JAVASCRIPT", "BROWSER", "CODING", "HANGMAN", "WEBSITE", "EVENT", "FUNCTION"];
const maxLives = 6;

// 2. Game state
let secretWord = "";
let guessedLetters = [];
let wrongLetters = [];
let livesLeft = maxLives;
let gameOver = false;

// 3. DOM elements
const wordDisplay = document.getElementById("word-display");
const wrongLettersSpan = document.getElementById("wrong-letters");
const livesSpan = document.getElementById("lives");
const messageEl = document.getElementById("message");
const keyboard = document.getElementById("keyboard");
const keys = keyboard.querySelectorAll(".key");
const resetBtn = document.getElementById("reset-btn");

// 4. Helper functions
function setMessage(text) {
  messageEl.textContent = text;
}

function updateWordDisplay() {
  let display = "";

  for (let char of secretWord) {
    if (guessedLetters.includes(char)) {
      display += char + " ";
    } else {
      display += "_ ";
    }
  }

  wordDisplay.textContent = display.trim();
}

function updateWrongLetters() {
  if (wrongLetters.length === 0) {
    wrongLettersSpan.textContent = "—";
  } else {
    wrongLettersSpan.textContent = wrongLetters.join(" ");
  }
}

function updateLivesDisplay() {
  livesSpan.textContent = livesLeft;
}

function checkWin() {
  let allRevealed = true;

  for (let char of secretWord) {
    if (!guessedLetters.includes(char)) {
      allRevealed = false;
      break;
    }
  }

  if (allRevealed) {
    setMessage("🎉 You win! Click 'New Game' to play again.");
    gameOver = true;
  }
}

function checkLoss() {
  if (livesLeft <= 0) {
    setMessage(`💀 Game over! The word was "${secretWord}".`);
    gameOver = true;

    guessedLetters = secretWord.split("");
    updateWordDisplay();
  }
}

// 5. Main actions
function handleGuess(letter, buttonElement) {
  if (gameOver) return;

  if (guessedLetters.includes(letter) || wrongLetters.includes(letter)) {
    setMessage("You already tried that letter.");
    return;
  }

  if (buttonElement) {
    buttonElement.classList.add("used");
    buttonElement.disabled = true;
  }

  if (secretWord.includes(letter)) {
    guessedLetters.push(letter);
    updateWordDisplay();
    setMessage(`Nice! "${letter}" is in the word.`);
    checkWin();
  } else {
    wrongLetters.push(letter);
    livesLeft--;
    updateWrongLetters();
    updateLivesDisplay();
    setMessage(`Nope! "${letter}" is not in the word.`);
    checkLoss();
  }
}

function startGame() {
  const randomIndex = Math.floor(Math.random() * words.length);
  secretWord = words[randomIndex];

  guessedLetters = [];
  wrongLetters = [];
  livesLeft = maxLives;
  gameOver = false;

  keys.forEach(key => {
    key.classList.remove("used");
    key.disabled = false;
  });

  updateWordDisplay();
  updateWrongLetters();
  updateLivesDisplay();
  setMessage("Good luck! 🎯");
}

// 6. Event listeners
keys.forEach(key => {
  key.addEventListener("click", () => {
    const letter = key.dataset.letter;
    handleGuess(letter, key);
  });
});

resetBtn.addEventListener("click", () => {
  startGame();
});

// Optional: keyboard input
document.addEventListener("keydown", event => {
  const key = event.key.toUpperCase();

  if (key >= "A" && key <= "Z") {
    const button = Array.from(keys).find(btn => btn.dataset.letter === key);
    handleGuess(key, button);
  }
});

// 7. Kick off first game
startGame();
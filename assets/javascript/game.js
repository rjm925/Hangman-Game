let wins = 0;       // Win counter
let losses = 0;     // Loss counter
let remaining;      // Guesses remaining
let guessed;        // Array of letters guessed
let revealed;       // Array of letters revealed
let answer;         // Random team for round
let lastWord;       // Display team of last round

// Array of letters
const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
// Array of teams
const teams = ["hawks", "celtics", "nets", "hornets", "bulls", "cavaliers", "mavericks", "nuggets", "pistons", "warriors", "rockets", "pacers", "clippers", "lakers", "grizzlies", "heat", "bucks", "timberwolves", "pelicans", "knicks", "thunder", "magic", "sixers", "suns", "trailblazers", "kings", "spurs", "raptors", "jazz", "wizards"];

// Sound played when player wins
const winSound = new sound("assets/media/winner.mp3");
// Sound played when player losses
const loseSound = new sound("assets/media/loser.mp3");

// Load sound into variable
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}

// Start of new round
function newGame() {
  // Player can guess 6 wrong letters
  remaining = 6;
  // Displays guesses remaining
  remain.innerHTML = "Guesses Left " + remaining;
  // Random team for player to guess
  answer = teams[Math.floor(Math.random() * teams.length)];
  // Array that fills up with letters guessed
  guessed = [];
  // Array of characters player needs to guess
  revealed = [];
  // Loops through length of string
  for (let i = 0; i < answer.length; i++) {
    // Initializes the word by displaying blanks for each letter
    revealed.push("_");
  }
  // Displays wins
  W.innerHTML = wins;
  // Displays losses
  L.innerHTML = losses;
}

// Waits for key press
document.onkeyup = function(event) {
  // Stores key press in variable and makes lowerCase
  let guess = event.key.toLowerCase();

  // Variable to verify key pressed is a letter and has not been guessed
  let check = false;
  // Loops through array of letters
  for (let i = 0; i < alphabet.length; i++) {
    // Compares key press to every letter in array
    if (guess === alphabet[i]) {
      // If letter is found, verifies key press is a letter
      check = true;
    }
  }

  // Loop to see if letter was already guessed
  for (let i = 0; i < guessed.length; i++) {
    // Checks array of guessed with key pressed
    if (" " + guess.toUpperCase() === guessed[i]) {
      // If already guessed check returns to false even if it is a letter
      check = false;
    }
  }

  // Variable to see if letter is in hidden word
  let found = false;
  // If key press is a letter and not already guessed
  if (check) {
    // Loops through hidden word
    for (let i = 0; i < answer.length; i++) {
      // If letter found
      if (guess === answer.charAt(i)) {
        // Changes _ to key press in revealed array
        revealed[i] = guess.toUpperCase();
        // Letter is found
        found = true;
      }
    }

    // Variable to check if word is guessed
    let blank;
    // If letter is found
    if (found) {
      // Loops to see if all letters are guessed
      for (let i = 0; i < revealed.length; i++) {
        // If there is still a letter missing
        if (revealed[i] === "_") {
          // Returns that word is not completely guessed
          blank = true;
          // Breaks out of loop
          break;
        }
        // No blanks left
        else {
          // Returns that word is figured out
          blank = false;
        }
      }
      // If player guessed word
      if (blank === false) {
        // Increase win counter
        wins++;
        // Display new wins total
        W.innerHTML = wins;
        // Play win sound
        winSound.play();
        // Stores word in variable 
        lastWord = answer.toUpperCase();
        // Displays last word under wins
        lastWin.innerHTML = "Last Answer<br><br>" + lastWord;
        // Removes word under losses
        lastLost.innerHTML = "";
        // Start a new game
        newGame();
      }
    }

    // If letter is incorrect
    if (found === false) {
      // Decreases guesses remaining
      remaining--;
      // Displays guesses remaining
      remain.innerHTML = "Guesses Left " + remaining;
      // Adds the letter to guessed array
      guessed.push(" " + guess.toUpperCase());
    }

    // Check if player still has guesses available
    if (remaining === 0) {
      // Increment losses counter
      losses++;
      // Display new losses total
      L.innerHTML = losses;
      // Play loss sound
      loseSound.play();
      // Stores word in variable
      lastWord = answer.toUpperCase();
      // Removes displayed word under wins
      lastWin.innerHTML = "";
      // Display last word under losses
      lastLost.innerHTML = "Last Answer<br><br>" + lastWord;
      // Start a new game
      newGame();
    }

    // Updates HTML to display hidden words/revealed letters
    reveal.innerHTML = revealed.join("  ");
    // Updates HTML to display incorrect letters
    notFound.innerHTML = guessed.join("  ");
  }
}

// Start first game
newGame();

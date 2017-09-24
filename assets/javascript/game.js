var wins = 0;       //Win counter
var losses = 0;     //Loss counter
var remaining;      //Guesses remaining
var guessed;        //Array of letters guessed
var revealed;       //Array of letters revealed
var answer;         //Random word for game
var lastWord;       //Display word of last round

//Array of letters
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
//Array of teams
var teams = ["hawks", "celtics", "nets", "hornets", "bulls", "cavaliers", "mavericks", "nuggets", "pistons", "warriors", "rockets", "pacers", "clippers", "lakers", "grizzlies", "heat", "bucks", "timberwolves", "pelicans", "knicks", "thunder", "magic", "sixers", "suns", "trailblazers", "kings", "spurs", "raptors", "jazz", "wizards"];

//Sound played when player wins
var winSound = new sound("assets/media/winner.mp3");
//Sound played when player losses
var loseSound = new sound("assets/media/loser.mp3");

//Load sound into variable
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

//Start of new round
function newGame() {
  //Player can guess 10 wrong letters
  remaining = 10;
  //Displays guesses remaining
  remain.innerHTML = "Guesses Left " + remaining;
  //Random team for player to guess
  answer = teams[Math.floor(Math.random() * teams.length)];
  //Array that fills up with letters guessed
  guessed = [];
  //Array of characters player needs to guess
  revealed = [];
  //Loops through length of string
  for (var i = 0; i < answer.length; i++) {
    //Initializes the word by displaying blanks for each letter
    revealed.push("_");
  }
  //Displays wins
  W.innerHTML = wins;
  //Displays losses
  L.innerHTML = losses;
}

//Waits for key press
document.onkeyup = function(event) {
  //Stores key press in variable and makes lowerCase
  var guess = event.key.toLowerCase();

  //Variable to verify key pressed is a letter and has not been guessed
  var check = false;
  //Loops through array of letters
  for (var i = 0; i < alphabet.length; i++) {
    //Compares key press to every letter in array
    if (guess === alphabet[i]) {
      //If letter is found, verifies key press is a letter
      check = true;
    }
  }

  //Loop to see if letter was already guessed
  for (var i = 0; i < guessed.length; i++) {
    //Checks array of guessed with key pressed
    if (" " + guess.toUpperCase() === guessed[i]) {
      //If already guessed check returns to false even if it is a letter
      check = false;
    }
  }

  //Variable to see if letter is in hidden word
  var found = false;
  //If key press is a letter and not already guessed
  if (check) {
    //Loops through hidden word
    for (var i = 0; i < answer.length; i++) {
      //If letter found
      if (guess === answer.charAt(i)) {
        //Changes _ to key press in revealed array
        revealed[i] = guess.toUpperCase();
        //Letter is found
        found = true;
      }
    }

    //If letter is found
    if (found) {
      //Loops to see if all letters are guessed
      for (var i = 0; i < revealed.length; i++) {
        //If there is still a letter missing
        if (revealed[i] === "_") {
          //Returns that word is not completely guessed
          var blank = true;
          //Breaks out of loop
          break;
        }
        //No blanks left
        else {
          //Returns that word is figured out
          var blank = false;
        }
      }
      //If player guessed word
      if (blank === false) {
        //Increase win counter
        wins++;
        //Display new wins total
        W.innerHTML = wins;
        //Play win sound
        winSound.play();
        //Stores word in variable 
        lastWord = answer.toUpperCase();
        //Displays last word under wins
        lastWin.innerHTML = "Last Answer<br><br>" + lastWord;
        //Removes word under losses
        lastLost.innerHTML = "";
        //Start a new game
        newGame();
      }
    }

    //If letter is incorrect
    if (found === false) {
      //Decreases guesses remaining
      remaining--;
      //Displays guesses remaining
      remain.innerHTML = "Guesses Left " + remaining;
      //Adds the letter to guessed array
      guessed.push(" " + guess.toUpperCase());
    }

    //Check if player still has guesses available
    if (remaining === 0) {
      //Increment losses counter
      losses++;
      //Display new losses total
      L.innerHTML = losses;
      //Play loss sound
      loseSound.play();
      //Stores word in variable
      lastWord = answer.toUpperCase();
      //Removes displayed word under wins
      lastWin.innerHTML = "";
      //Display last word under losses
      lastLost.innerHTML = "Last Answer<br><br>" + lastWord;
      //Start a new game
      newGame();
    }

    //Updates HTML to display hidden words/revealed letters
    reveal.innerHTML = revealed.join("  ");
    //Updates HTML to display incorrect letters
    notFound.innerHTML = guessed.join("  ");
  }
}

//Start first game
newGame();

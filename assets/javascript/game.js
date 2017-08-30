var wins = 0;
var losses = 0;
var remaining = 10;
var guessed = [];
var revealed = [];

var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var teams = ["hawks", "celtics", "nets", "hornets", "bulls", "cavaliers", "mavericks", "nuggets", "pistons", "warriors", "rockets", "pacers", "clippers", "lakers", "grizzlies", "heat", "bucks", "timberwolves", "pelicans", "knicks", "thunder", "magic", "sixers", "suns", "trailblazers", "kings", "spurs", "raptors", "jazz", "wizards"];

var winSound = new sound("assets/media/winner.mp3");
var loseSound = new sound("assets/media/loser.mp3");

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

var answer = teams[Math.floor(Math.random() * teams.length)];
console.log(answer);

for (var i = 0; i < answer.length; i++) {
  revealed.push("_");
}

document.onkeyup = function(event) {
  var guess = event.key;
  guess = guess.toLowerCase();
  W.innerHTML = wins;
  L.innerHTML = losses;
  remain.innerHTML = "Guesses Left " + remaining;

  var check = false;
  for (var i = 0; i < alphabet.length; i++) {
    if (guess === alphabet[i]) {
      check = true;
    }
  }

  for (var i = 0; i < guessed.length; i++) {
    if (" " + guess.toUpperCase() === guessed[i]) {
      check = false;
    }
  }

  var found = false;
  if (check) {
    for (var i = 0; i < answer.length; i++) {
      if (guess === answer.charAt(i)) {
        revealed[i] = guess.toUpperCase();
        found = true;
      }
    }

    if (found) {
      for (var i = 0; i < revealed.length; i++) {
        if (revealed[i] === "_") {
          var blank = true;
          break;
        }
        else {
          var blank = false;
        }
      }

      if (blank === false) {
        wins++;
        W.innerHTML = wins;
        winSound.play();
        remaining = 10;
        remain.innerHTML = "Guesses Left " + remaining;
        answer = teams[Math.floor(Math.random() * teams.length)];
        console.log(answer);
        guessed = [];
        revealed = [];
        for (var i = 0; i < answer.length; i++) {
          revealed.push("_");
        }
      }
    }

    if (found === false) {
      remaining--;
      remain.innerHTML = "Guesses Left " + remaining;
      guessed.push(" " + guess.toUpperCase());
    }

    if (remaining === 0) {
      losses++;
      L.innerHTML = losses;
      loseSound.play();
      remaining = 10;
      remain.innerHTML = "Guesses Left " + remaining;
      answer = teams[Math.floor(Math.random() * teams.length)];
      console.log(answer);
      guessed = [];
      revealed = [];
      for (var i = 0; i < answer.length; i++) {
        revealed.push("_");
      }
    }

    reveal.innerHTML = revealed.join("  ");
    notFound.innerHTML = guessed.join("  ");
  }
}

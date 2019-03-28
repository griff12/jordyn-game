const buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var level = 0;
var gameStarted = false;
var userAnswers = [];


$(document).on("keydown", function() {

  if (!gameStarted) {
    nextSequence();
  } else {

  }
});



$(".btn").on("click", function() {

  if (gameStarted) {
    userAnswers.push(this.id);
    console.log(userAnswers);

    checkAnswer(userAnswers.length - 1);

  } else {
    gameStarted = !gameStarted;
    nextSequence();
  }

});



function nextSequence() {

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);
  console.log(gamePattern);
  gameStarted = true;
  level++;
  $("#level-title").text("Level " + level);
  effects(randomChosenColor);
  userAnswers = [];
}

function effects(color) {
  $("#" + color).fadeOut(175).fadeIn(175);
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function checkAnswer(currentIndex) {
  console.log(gamePattern);
  if (userAnswers[currentIndex] === gamePattern[currentIndex]) {
    effects(userAnswers[userAnswers.length-1]);
    console.log("correct");
    if (userAnswers.length === gamePattern.length) {

      setTimeout(nextSequence, 1600);
      console.log("next round!");
    }
  } else {
    effects("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game Over Press Any Key to Restart");
    setTimeout(function() {
      $("body").removeClass("game-over");

    }, 800);
    console.log("game over.");
    startOver();
  }

}

function startOver() {
  level = 0;
  gameStarted = false;
  gamePattern = [];
}

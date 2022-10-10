var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern= [];

var userClickedPattern = [];

var level=0;
var started= false;

$(document).keypress(function(){
    if(!started){
        $('#level-title').text("Level "+level);
        nextSequence();
        started= true;
    }
});

$('.btn').click(function(){
    var userChoosenColor = $(this).attr('id');
    userClickedPattern.push(userChoosenColor);
    playSound(userChoosenColor);

    addPress(userChoosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
    var audio = new Audio('sounds/' +name+ '.mp3');
    audio.play();
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      if (userClickedPattern.length === gamePattern.length){

        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {
        playSound('wrong');
        $('body').addClass('game-over');
        setTimeout(function(){
            $('body').removeClass("game-over");
        }, 200)
        $('h1').text('Game Over, Press Any Key to Restart');
        startOver();
    }

}

function nextSequence(){
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var n= Math.random();
    var randomNumber = Math.floor(n*4);
    var randomChoosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);

    $('#'+randomChoosenColor).fadeTo(100, 0.3, function() { $(this).fadeTo(500, 1.0); });

    playSound(randomChoosenColor);
}

function addPress(currentColor){
    $('#' + currentColor).addClass("pressed");
    setTimeout(function(){
        $('#'+currentColor).removeClass("pressed");
    }, 100)
}
 
function startOver(){
    var gamePattern= [];
    var level=0;
    var started= false;
}

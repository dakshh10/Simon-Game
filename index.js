var gamePattern=[];
var userClickedPattern=[];
var buttonColours=["red","blue","green","yellow"];
var level=0;
var started=false;

function nextSequence(){
    userClickedPattern=[];
    $("h1").text("Level "+level);
    level++;
    var randomNumber=Math.floor(4*Math.random());
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

$(".btn").on("click",function(event){
   var userChosenColour= ($(this).attr("id"));
   userClickedPattern.push(userChosenColour);
   console.log(userClickedPattern);
   playSound(userChosenColour);
   $("#"+userChosenColour).addClass("pressed")
   setTimeout(function(){
    $("#"+userChosenColour).removeClass("pressed");
   },100);
   checkAnswer((userClickedPattern.length-1))
});

function playSound(name){
    var audio= new Audio("sounds/" + name + ".mp3");
    audio.play();
}

$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });
  


function checkAnswer(currentLevel){

    if (userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){nextSequence();},1000);
            console.log("success");
        }
    }
    else{
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);
        $("h1").text("Game over, Press any Key to Restart")
        console.log("wrong");
        startOver();
    }
}


function startOver(){
    level=0;
    started=false;
    gamePattern=[];
}
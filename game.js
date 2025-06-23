buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;
function nextSequence(){
    userClickedPattern=[];
    level++;
    $("h1").text("level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);    
$("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
playsound(randomChosenColor);
animatePress(randomChosenColor);
    
}

$(".btn").click(function(){
    var userChosencolor=$(this).attr("id");
    userClickedPattern.push(userChosencolor);
    playsound(userChosencolor);
    animatePress(userChosencolor);
    checkAnswer();
});

function playsound(randomChosenColor){
    switch(randomChosenColor){
    case "red":
        var audio=new Audio("sounds/red.mp3");
        audio.play();
        break;
    case "blue":
        var audio=new Audio("sounds/blue.mp3");
        audio.play();
        break;
    case "green":
        var audio=new Audio("sounds/green.mp3");
        audio.play();
        break;
    case "yellow":
        var audio=new Audio("sounds/yellow.mp3");
        audio.play();
        break;
}
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

$(document).on("keydown",function(){
    if(!started){
        nextSequence();
        started=true;
    }
})


function checkAnswer() {
    var currentIndex = userClickedPattern.length - 1;
    if (gamePattern[currentIndex] === userClickedPattern[currentIndex]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        var audio=new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
             $("body").removeClass("game-over");    
        },200);
        $("h1").text("You lost! press any key to start the game!");
        started=false;
        startOver();
        // Optionally, reset game state here
    }
}
function startOver(){
    gamePattern=[];
    userClickedPattern=[];
    level=0;
}
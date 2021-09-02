alert("working");
var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var cond=true;

var clicks=0;
$(document).on('keypress',function(){
  if(cond===true){
  $("h1").text("level "+level);
  nextSequence();}
  cond=false;
});
function nextSequence(){
  userClickedPattern=[];
  clicks=0;
  level++;
  $("h1").text("level "+level);
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColor=randomNumber;
  var buttonid="#"+buttonColors[randomChosenColor];
  $(buttonid).fadeOut(100).fadeIn(100);
  gamePattern.push(buttonColors[randomChosenColor]);
  console.log(gamePattern);
  playSound(buttonColors[randomChosenColor]);
}
$('.btn').click(function(){
  clicks=clicks+1;
  var userChosenColor=$(this).attr('id');
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  console.log(userClickedPattern);
  animatePress(userChosenColor);
  if(clicks===gamePattern.length){
    checkAnswer(level);
  }
});
function playSound(name){
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}
function animatePress(currentColor){
  var bid="#"+currentColor;
  $(bid).addClass("pressed");
  setTimeout(function(){
    $(bid).removeClass("pressed");
  },100);

}
function checkAnswer(currentLevel){
  if(JSON.stringify(userClickedPattern)==JSON.stringify(gamePattern)){
    console.log("success");
    setTimeout(function(){
      nextSequence();
    },1000);

  }
  else{
    console.log("failure");
    var audio=new Audio("sounds/wrong.mp3");
    audio.play();
    $("h1").text("Game over , Press any key to Restart");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    startOver();
  }

}
function startOver(){
  level=0;
  cond=true;
  gamePattern=[];
}

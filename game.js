
var started = false;

// create new array to hold our button colors
var buttonColors = ["red", "blue", "green", "yellow"];

// create empty array. 
var gamePattern = [];

//create empty array.
var userClickedPattern = [];

//start level at zero
var level = 0;


//use jQuery to detect when any of the buttons are clicked + trigger function
$(".btn").click(function(){

    //create variable that stores id of button that got clicked
    var userChosenColor = $(this).attr("id");

    //add contents of the variable userChosenColor to end of this new userClickedPattern array.
    userClickedPattern.push(userChosenColor);

    //play sound when clicked
    playSound(userChosenColor);

    //animate button when clicked
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);

});


//use jQuery to detect when a keyboard key has been pressed, when that happens for the first tiem, call nextSequence().

$(document).keydown(function(){
    if (!started) {

        $("#level-title").text("level " + level);

        nextSequence();

        started = true;
    }
});



function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
       
        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(() => {
                nextSequence();
                
            }, 1000);

        } 

  }  else {
        //play sound when user clicks wrong button
        playSound("wrong");

        //change h1 title to say game over, press any key to restart if the user got the answer wrong
        $("#level-title").text("Game Over, Press Any Key To Restart!");

        //add game over style when user click wrongs button
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        console.log("wrong");

        //call startOver to restart game if user gets sequence wrong
        startOver();
    }
}




//function that will generate random numbers between 0-3.
function nextSequence() {
    
    //reset to an empty array
    userClickedPattern = [];

    //increase level each time nextSequence is called
    level++;

     //when the game has started, change this to say "Level 0"
     $("#level-title").text("Level: " + level);

    // create a new random number between 0 and 3, and store it in a variable called: randomNumber.
    var randomNumber = Math.floor(Math.random() * 4);

    // create new variable called "randomChosenColor" and use the "randomNumber" from step 2 to select a random color from button colors array.
    var randomChosenColor = buttonColors[randomNumber];

    // add new randomChosenColor generated in step 4 to the end of the "gamePattern".
    gamePattern.push(randomChosenColor);

    //play sound & fadeIn/fadeOut
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
     

}


//play sound function
function playSound(name) {
    //play sound each click
    var audio = new Audio ("sounds/" + name + ".mp3");
    audio.play();
}



//display animation class
function animatePress(currentColor) {
    
    //variable to store button that got clicked
    var activeButton = document.querySelector("." + currentColor);

    //add pressed class
    activeButton.classList.add("pressed");

    //remove pressed class after 100 milliseconds
    setTimeout(() => {
        activeButton.classList.remove("pressed")
    }, 100);


}


//start the game over 

function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
}
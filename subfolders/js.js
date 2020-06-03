// Gathering HTML elements for manipulation
var bodyofquiz = document.getElementById("quiz");

var outcomeEl = document.getElementById("result");

var ultimateScoreEl = document.getElementById("finalScore");

var lilflip = document.getElementById("gameover");

var inquiryEl = document.getElementById("questions");

var examTimer = document.getElementById("timer");

var beqinQuizButton = document.getElementById("startbtn");

var startQuizDiv = document.getElementById("startpage");

var hsContain = document.getElementById("hsContain");

var hsDIV = document.getElementById("high-scorePage");

var hsInputname = document.getElementById("initials");

var hsDisplaytitle = document.getElementById("highscore-initials");

var endGameButton = document.getElementById("endGameButton");

var enterScoreButton = document.getElementById("submitScore");

var hsDisplay = document.getElementById("highscore-score");

var optionA = document.getElementById("a");

var optionB = document.getElementById("b");

var optionC = document.getElementById("c");

var optionD = document.getElementById("d");

// Quiz question object
var quizQuestions = [{
    question: "What is a function?",
    selectionA: "a reuseable block of code that performs a specific task",
    selectionB: "a tangible set of keys",
    selectionC: "a variable",
    selectionD: "NaN",
    trueanswer: "a"},
  {
    question: "A function declaration consists of?",
    selectionA: "B, C, D",
    selectionB: "function keyword",
    selectionC: "name of the function",
    selectionD: "a function body",
    trueanswer: "a"},
   {
    question: "The ? is shorthand to simplify concise if else statements",
    selectionA: "Cursive",
    selectionB: "Ternary Operator",
    selectionC: "DOM",
    selectionD: "Objects",
    trueanswer: "b"},
    {
    question: "What does the bang operator(!) do?",
    selectionA: "makes everything true",
    selectionB: "makes everything false",
    selectionC: "cures cancer",
    selectionD: "switches the truthiness and falsiness",
    trueanswer: "d"},
    {
    question: "Example of a comparison operators",
    selectionA: ">",
    selectionB: "{",
    selectionC: "@",
    selectionD: "?",
    trueanswer: "a"},  
    {
    question: "What does console.log do?",
    selectionA: "Consoles you",
    selectionB: "Makes you breakfast",
    selectionC: "Prints to the console",
    selectionD: "if true statements",
    trueanswer: "c"},
    {
    question: "What are variables used in Javascript",
    selectionA: "make things confusing",
    selectionB: "for storing and holding data",
    selectionC: "deletes everything",
    selectionD: "pseudocodes",
    trueanswer: "b"},


    ];
// more global scope variables
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 76;
var timerInterval;
var score = 0;
var correct;

// this function goes through an object and creates the answers and questions
function generateQuizQuestion(){
    lilflip.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    } 
    var currentQuestion = quizQuestions[currentQuestionIndex];
    inquiryEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    optionA.innerHTML = currentQuestion.selectionA;
    optionB.innerHTML = currentQuestion.selectionB;
    optionC.innerHTML = currentQuestion.selectionC;
    optionD.innerHTML = currentQuestion.selectionD;
};

// this function starts everything.
function startQuiz(){
    lilflip.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    //The timer
    timerInterval = setInterval(function() {
        timeLeft--;
        examTimer.textContent = "Time left: " + timeLeft;

        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    bodyofquiz.style.display = "block";
}
// This function displays your score at the end screen
function showScore(){
    bodyofquiz.style.display = "none"
    lilflip.style.display = "flex";
    clearInterval(timerInterval);
    hsInputname.value = "";
    ultimateScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}

// once the submit button is clicked on, the highschore function is run
enterScoreButton.addEventListener("click", function highscore(){


    if(hsInputname.value === "") {
        alert("Initials cannot be blank");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = hsInputname.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };

        lilflip.style.display = "none";
        hsContain.style.display = "flex";
        hsDIV.style.display = "block";
        endGameButton.style.display = "flex";

        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }

});

// this function clears high schore list and starts a new one 
function generateHighscores(){
    hsDisplaytitle.innerHTML = "";
    hsDisplay.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        hsDisplaytitle.appendChild(newNameSpan);
        hsDisplay.appendChild(newScoreSpan);
    }
}

// shows high score page
function showHighscore(){
    startQuizDiv.style.display = "none"
    lilflip.style.display = "none";
    hsContain.style.display = "flex";
    hsDIV.style.display = "block";
    endGameButton.style.display = "flex";

    generateHighscores();
}

// function that clears the high scores in the local storage 
function clearScore(){
    window.localStorage.clear();
    hsDisplaytitle.textContent = "";
    hsDisplay.textContent = "";
}

// resets all values. shows home page if they wanna play again
function replayQuiz(){
    hsContain.style.display = "none";
    lilflip.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 76;
    score = 0;
    currentQuestionIndex = 0;
}

// this function sees if the answer is correct or not 
function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].trueanswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("That Is Correct!");
        currentQuestionIndex++;
        generateQuizQuestion();
        //shows answer is correct.
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        alert("That Is Incorrect.")
        //subtracts time if incorrect :)
        timeLeft -=5
        currentQuestionIndex++;
        generateQuizQuestion();
        //display results is wrong.
    }else{
        showScore();
    }

    
}



// this is the button that starts the quiz
beqinQuizButton.addEventListener("click",startQuiz);
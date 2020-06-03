// Gathering HTML elements for manipulation
var quizBody = document.getElementById("quiz");

var resultsEl = document.getElementById("result");

var finalScoreEl = document.getElementById("finalScore");

var gameoverDiv = document.getElementById("gameover");

var questionsEl = document.getElementById("questions");

var quizTimer = document.getElementById("timer");

var startQuizButton = document.getElementById("startbtn");

var startQuizDiv = document.getElementById("startpage");

var highscoreContainer = document.getElementById("highscoreContainer");

var highscoreDiv = document.getElementById("high-scorePage");

var highscoreInputName = document.getElementById("initials");

var highscoreDisplayName = document.getElementById("highscore-initials");

var endGameBtns = document.getElementById("endGameBtns");

var submitScoreBtn = document.getElementById("submitScore");

var highscoreDisplayScore = document.getElementById("highscore-score");

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
// Other global variables
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 76;
var timerInterval;
var score = 0;
var correct;

// This function cycles through the object array containing the quiz questions to generate the questions and answers.
function generateQuizQuestion(){
    gameoverDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    } 
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    optionA.innerHTML = currentQuestion.selectionA;
    optionB.innerHTML = currentQuestion.selectionB;
    optionC.innerHTML = currentQuestion.selectionC;
    optionD.innerHTML = currentQuestion.selectionD;
};

// Start Quiz function starts the TimeRanges, hides the start button, and displays the first quiz question.
function startQuiz(){
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    //Timer
    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;

        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    quizBody.style.display = "block";
}
// This function is the end page screen that displays your score after either completeing the quiz or upon timer run out
function showScore(){
    quizBody.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}

// On click of the submit button, we run the function highscore that saves and stringifies the array of high scores already saved in local stoage
// as well as pushing the new user name and score into the array we are saving in local storage. Then it runs the function to show high scores.
submitScoreBtn.addEventListener("click", function highscore(){


    if(highscoreInputName.value === "") {
        alert("Initials cannot be blank");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };

        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";

        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }

});

// This function clears the list for the high scores and generates a new high score list from local storage
function generateHighscores(){
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

// This function displays the high scores page while hiding all of the other pages from 
function showHighscore(){
    startQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}

// This function clears the local storage of the high scores as well as clearing the text from the high score board
function clearScore(){
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}

// This function sets all the variables back to their original values and shows the home page to enable replay of the quiz
function replayQuiz(){
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 76;
    score = 0;
    currentQuestionIndex = 0;
}

// This function checks the response to each answer 
function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].trueanswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("That Is Correct!");
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that the answer is correct.
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        alert("That Is Incorrect.")
        //subtracts time if incorrect :)
        timeLeft -=5
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that the answer is wrong.
    }else{
        showScore();
    }

    
}



// This button starts the quiz!
startQuizButton.addEventListener("click",startQuiz);
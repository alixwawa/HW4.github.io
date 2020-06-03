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

var buttonA = document.getElementById("a");

var buttonB = document.getElementById("b");

var buttonC = document.getElementById("c");

var buttonD = document.getElementById("d");

// the questions
var quizQuestions = [{
    question: "What is a function?",
    choiceA: "a reuseable block of code that performs a specific task",
    choiceB: "a tangible set of keys",
    choiceC: "a variable",
    choiceD: "NaN",
    correctAnswer: "a"
},
{
    question: "A function declaration consists of?",
    choiceA: "B, C, D",
    choiceB: "function keyword",
    choiceC: "name of the function",
    choiceD: "a function body",
    correctAnswer: "a"
},
{
    question: "The ? is shorthand to simplify concise if else statements",
    choiceA: "Cursive",
    choiceB: "Ternary Operator",
    choiceC: "DOM",
    choiceD: "Objects",
    correctAnswer: "b"
},
{
    question: "What does the bang operator(!) do?",
    choiceA: "makes everything true",
    choiceB: "makes everything false",
    choiceC: "cures cancer",
    choiceD: "switches the truthiness and falsiness",
    correctAnswer: "d"
},
{
    question: "Example of a comparison operators",
    choiceA: ">",
    choiceB: "{",
    choiceC: "@",
    choiceD: "?",
    correctAnswer: "a"
},
{
    question: "What does console.log do?",
    choiceA: "Consoles you",
    choiceB: "Makes you breakfast",
    choiceC: "Prints to the console",
    choiceD: "if true statements",
    correctAnswer: "c"
},
{
    question: "What are variables used in Javascript",
    choiceA: "make things confusing",
    choiceB: "for storing and holding data",
    choiceC: "deletes everything",
    choiceD: "pseudocodes",
    correctAnswer: "b"
},


];
// more global scope variables
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 76;
var timerInterval;
var score = 0;
var correct;

// this function goes through an object and creates the answers and questions
function generateQuizQuestion() {
    gameoverDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex) {
        return showScore();
    }
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

// this function starts everything.
function startQuiz() {
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    //The timer
    timerInterval = setInterval(function () {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            showScore();
        }
    }, 1000);
    quizBody.style.display = "block";
}
// This function displays your score at the end screen
function showScore() {
    quizBody.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}

// once the submit button is clicked on, the highschore function is run
submitScoreBtn.addEventListener("click", function highscore() {


    if (highscoreInputName.value === "") {
        alert("Initials cannot be blank");
        return false;
    } else {
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name: currentUser,
            score: score
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

// this function clears high schore list and starts a new one
function generateHighscores() {
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i = 0; i < highscores.length; i++) {
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

// shows high score page 
function showHighscore() {
    startQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}

// function that clears the high scores in the local storage
function clearScore() {
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}

// resets all values. shows home page if they wanna play again
function replayQuiz() {
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 76;
    score = 0;
    currentQuestionIndex = 0;
}

// this function sees if the answer is correct or not 
function checkAnswer(answer) {
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex) {
        score++;
        alert("That Is Correct!");
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that the answer is correct.
    } else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex) {
        alert("That Is Incorrect.")
        //subtracts time if incorrect :)
        timeLeft -= 5
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that the answer is wrong.
    } else {
        showScore();
    }
}

// this is the button that starts the quiz
startQuizButton.addEventListener("click", startQuiz);
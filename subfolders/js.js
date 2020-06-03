// Gathering HTML elements for manipulation
let = document.getElementById("quiz");

let resultsEl = document.getElementById("result");

let finalScoreEl = document.getElementById("finalScore");

let gameoverDiv = document.getElementById("gameover");

let questionsEl = document.getElementById("questions");

let quizTimer = document.getElementById("timer");

let startQuizButton = document.getElementById("startbtn");

let startQuizDiv = document.getElementById("startpage");

let highscoreContainer = document.getElementById("highscoreContainer");

let highscoreDiv = document.getElementById("high-scorePage");

let highscoreInputName = document.getElementById("initials");

let highscoreDisplayName = document.getElementById("highscore-initials");

let endGameBtns = document.getElementById("endGameBtns");

let submitScoreBtn = document.getElementById("submitScore");

let highscoreDisplayScore = document.getElementById("highscore-score");

let buttonA = document.getElementById("a");

let buttonB = document.getElementById("b");

let buttonC = document.getElementById("c");

let buttonD = document.getElementById("d");

// the questions
let quizQuestions = [{
    question: "What is a function?",
    optionA: "a reuseable block of code that performs a specific task",
    optionB: "a tangible set of keys",
    optionC: "a variable",
    optionD: "NaN",
    theAnswer: "a"
},
{
    question: "A function declaration consists of?",
    optionA: "B, C, D",
    optionB: "function keyword",
    optionC: "name of the function",
    optionD: "a function body",
    theAnswer: "a"
},
{
    question: "The ? is shorthand to simplify concise if else statements",
    optionA: "Cursive",
    optionB: "Ternary Operator",
    optionC: "DOM",
    optionD: "Objects",
    theAnswer: "b"
},
{
    question: "What does the bang operator(!) do?",
    optionA: "makes everything true",
    optionB: "makes everything false",
    optionC: "cures cancer",
    optionD: "switches the truthiness and falsiness",
    theAnswer: "d"
},
{
    question: "Example of a comparison operators",
    optionA: ">",
    optionB: "{",
    optionC: "@",
    optionD: "?",
    theAnswer: "a"
},
{
    question: "What does console.log do?",
    optionA: "Consoles you",
    optionB: "Makes you breakfast",
    optionC: "Prints to the console",
    optionD: "if true statements",
    theAnswer: "c"
},
{
    question: "What are variables used in Javascript",
    optionA: "make things confusing",
    optionB: "for storing and holding data",
    optionC: "deletes everything",
    optionD: "pseudocodes",
    theAnswer: "b"
},


];
// more global scope variables
let finalQuestionIndex = quizQuestions.length;
let currentQuestionIndex = 0;
let timeLeft = 76;
let timerInterval;
let score = 0;
let correct;

// this function goes through an object and creates the answers and questions
function generateQuizQuestion() {
    gameoverDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex) {
        return showScore();
    }
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.optionA;
    buttonB.innerHTML = currentQuestion.optionB;
    buttonC.innerHTML = currentQuestion.optionC;
    buttonD.innerHTML = currentQuestion.optionD;
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
    let.style.display = "block";
}
// This function displays your score at the end screen
function showScore() {
    let.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You answered " + score + " out of " + quizQuestions.length + " correct!";
}

// once the submit button is clicked on, the highschore function is run
submitScoreBtn.addEventListener("click", function highscore() {


    if (highscoreInputName.value === "") {
        alert("gotta type something in the intial box");
        return false;
    } else {
        let savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        let currentUser = highscoreInputName.value.trim();
        let currentHighscore = {
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
    let highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i = 0; i < highscores.length; i++) {
        let newNameSpan = document.createElement("li");
        let newScoreSpan = document.createElement("li");
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
    correct = quizQuestions[currentQuestionIndex].theAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex) {
        score++;
        alert("You got it!");
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that the answer is correct.
    } else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex) {
        alert("Sorry... that's wrong.")
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
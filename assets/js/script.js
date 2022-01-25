

//setting up the various HTML elements for js manipulation
var gamestartCardEl = document.querySelector("#gamestart-card");
var quizCardEl = document.querySelector("#quiz-card");
var gameoverCardEl = document.querySelector("#gameover-card");
var highscoresCardEl = document.querySelector("#highscores-card");

var answersEl = document.querySelectorAll(".answers");
var highscoresEl = document.querySelector("#highscores-list");
//document.querySelector("#time-remaining").textContent //I don't think it's worth assigning this to a variable; we'll just use it as a long-form variable and not worry about having to update the element
var initialsEl = document.querySelector("#initials-collection"); //creating a 




// calling recorded scores from local storage
if(localStorage.getItem("allscores")) {
    var allscores = JSON.parse(localStorage.getItem("allscores"));
}
else{
    var allscores = [{
        initials: "",
        score: "",
    },
    {
        initials: "",
        score: ""
    }]

    //erasing the empty objects which were placeholders anyway
    allscores.pop();
    allscores.pop();
}

// O T H E R    V A R I A B L E S

var runningClock; //creating with global scope in order to access between functions

//populating a few coding questions
const q1 = {
    question: "What does the '===' operator represent?",
    answers: ["The '===' operator represents strict equality", "The '===' operator represents loose equality", "The '===' operator represents less than or equals", "The '===' operator represents double subtraction"],
    correctAns: 1,
}

const q2 = {
    question: "Second Q",
    answers: ["The '===' operator represents strict equality", "The '===' operator represents loose equality", "The '===' operator represents less than or equals", "The '===' operator represents double subtraction"],
    correctAns: 1,
}

const q3 = {
    question: "Third Q",
    answers: ["The '===' operator represents strict equality", "The '===' operator represents loose equality", "The '===' operator represents less than or equals", "The '===' operator represents double subtraction"],
    correctAns: 1,
}

const q4 = {
    question: "Fourth Q",
    answers: ["The '===' operator represents strict equality", "The '===' operator represents loose equality", "The '===' operator represents less than or equals", "The '===' operator represents double subtraction"],
    correctAns: 1,
}

const q5 = {
    question: "Fifth Q",
    answers: ["The '===' operator represents strict equality", "The '===' operator represents loose equality", "The '===' operator represents less than or equals", "The '===' operator represents double subtraction"],
    correctAns: 1,
}

const q6 = {
    question: "Fifth Q",
    answers: ["The '===' operator represents strict equality", "The '===' operator represents loose equality", "The '===' operator represents less than or equals", "The '===' operator represents double subtraction"],
    correctAns: 1,
}

const questionsOrdered = [q1, q2, q3, q4, q5, q6]; //will be randomized via the assembleQuestions function on the global scope
var questionsRandom; //to be populated within the startGame() function
var whichQuestion = 0;



/* A C T U A L   Q U I Z   G A M E */

// all of the cards are hidden by default in the CSS; unhiding our gamestart card
// quizCardEl.setAttribute("style", "display: flex"); //here for debugging purposes
// gameoverCardEl.setAttribute("style", "display: none"); //here for debugging purposes
gamestartCardEl.setAttribute("style", "display: flex");


/* G A M E   F U N C T I O N S */
function startGame () {
    
    /* SETTING THE STAGE */
    
    document.querySelector("#time-remaining").textContent = 30; //reset the clock

    //combining the various coding questions into a string of random order
    assembleQuestions();
    document.querySelector("#timer").setAttribute("style", "display: block;"); //displaying the timer
    
    
    //toggling to the quiz card
    gamestartCardEl.setAttribute("style", "display: none");
    gameoverCardEl.setAttribute("style", "display: none");
    highscoresCardEl.setAttribute("style", "display: none");
    quizCardEl.setAttribute("style", "display: flex");

    //populate the quiz card with a random coding question
    populateQuizCard();
    
    //start the clock
    runningClock = setInterval(runClock, 1000);
}

function runClock () {
    
    if (document.querySelector("#time-remaining").textContent <= 0) {
        gameOver();
        return;
    }

    document.querySelector("#time-remaining").textContent--;
    
    
}

function populateQuizCard () {
    document.querySelector("#question").textContent = questionsRandom[whichQuestion].question;
    whichQuestion++;
    for (let i=0; i<answersEl.length; i++){
        answersEl[i].innerHTML = questionsRandom[0].answers[i];
    }
}

function recordScore(event){
    event.preventDefault();

    let myscore = {
        initials: initialsEl.value,
        score: document.querySelector("#time-remaining").textContent
    }
    
    allscores.push(myscore);
    
    localStorage.setItem("allscores", JSON.stringify(allscores));
    showScores();
}

function showScores (){
    //toggling from whichever card to to the highscores card
    gameoverCardEl.setAttribute("style", "display: none");
    gamestartCardEl.setAttribute("style", "display: none");
    quizCardEl.setAttribute("style", "display: none");
    highscoresCardEl.setAttribute("style", "display: flex");

    //call and display high scores from local storage
    allscores = JSON.parse(localStorage.getItem("allscores"));
    removeChildNodes(highscoresEl); //we are about to repopulate the highscoresEl below
    for (i=0; i < allscores.length; i++) {
        highscoresEl.appendChild(document.createElement("LI"));
        highscoresEl.children[i].textContent = allscores[i].initials +": "+ allscores[i].score;
    }
}

function clearScores(){
    allscores = [{
        initials: "",
        score: "",
    },
    {
        initials: "",
        score: ""
    }]
    allscores.pop();
    allscores.pop();

    localStorage.setItem("allscores", JSON.stringify(allscores));
    removeChildNodes(highscoresEl);
    showScores();
}

function checkAnswer(event){
    
    if (whichQuestion+1>questionsRandom.length){ //if there are no more questions, end the game
        gameOver();
    }
    else if (event.target.value == questionsRandom[whichQuestion].correctAns){
        rightAnswer();
    }
    else {
        wrongAnswer();
    }
}

function wrongAnswer () {
    popup("Incorrect!");   
    if (document.querySelector("#time-remaining").textContent-10<0) {
        popup("Incorrect!");
        setTimeout(clearPopup, 2000); //clears the popup message after a delay
        setTimeout(gameOver, 2000);
    }
    else {
        document.querySelector("#time-remaining").textContent-=10;
        popup("Incorrect!");
        setTimeout(clearPopup, 2000); //clears the popup message after a delay
        populateQuizCard();
    }

}

function rightAnswer(){
    popup("Correct!");
    setTimeout(clearPopup, 2000); //clears the popup message after a delay

    console.log(whichQuestion);
    populateQuizCard();
}

function gameOver (){
    clearInterval(runningClock);
    document.querySelector("#timer").setAttribute("style", "display: none;")
    
    //toggling from the quiz card to the gameover card
    quizCardEl.setAttribute("style", "display: none");
    gameoverCardEl.setAttribute("style", "display: flex");   

    //carry the timer value to the score value
    document.querySelector("#score").textContent = document.querySelector("#time-remaining").textContent;
}

// U T I L I T Y    F U N C T I O N S
function removeChildNodes(highscoresEl){
    while (highscoresEl.firstChild) {
        highscoresEl.removeChild(highscoresEl.firstChild);
    }
}

function assembleQuestions () { //assembles in a random order the various questions into an array

    whichQuestion = 0;
    for (let i=0; i<questionsOrdered.length; i++){
        // password += allowableCharacters.charAt(Math.floor(Math.random() * allowableCharacters.length));
    }
    questionsRandom = questionsOrdered;
}

function popup(message){
    document.querySelector("#popup").textContent = message; // write message to popup element
    document.querySelector("#popup").setAttribute("style", "display: inline;") //unhide popup element
}

function clearPopup(){
    document.querySelector("#popup").setAttribute("style", "display: none;")
}

/* K E Y   B I N D I N G */
document.querySelectorAll(".playagain-button").forEach(item => {
    item.addEventListener("click", event=>{
    startGame();
    })
});

//view highscores button keybinding
document.querySelectorAll(".view-highscores-button").forEach(item => {
    item.addEventListener("click", event=>{
    showScores(event);
    })
});

//submit initials for high score keybinding
document.querySelector("#initials-form").addEventListener("submit", recordScore);

/* registering clicks for all buttons of class "answers", checking to
see if the clicked button is associated with the correct answer and
calling the wrongAnswer() or rightAnswer() functions accordingly */
document.querySelectorAll(".answers").forEach(item => {
    item.addEventListener("click", event=>{
    
    checkAnswer(event);
    })
});

document.querySelector("#clear-scores").addEventListener("click", clearScores);


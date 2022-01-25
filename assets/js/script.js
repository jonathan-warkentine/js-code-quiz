

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
    answers: ["Strict equality", "Loose equality", "Less than or equals", "Double subtraction"],
    correctAns: 1,
}

const q2 = {
    question: "What is JavaScript?",
    answers: ["A gaming platform", "JavaScript is a client-side and server-side scripting language inserted into HTML pages and is understood by web browsers. JavaScript is also an Object-based Programming language", "A useful program that only runs on MacOS", "A tasty pastry"],
    correctAns: 2,
}

const q3 = {
    question: "What are JavaScript Data Types?",
    answers: ["Number, String, Boolean, Object, Undefined", "Big, Small, Huge, Little", "NA, NP, MN, NS", "Global, local, this, item"],
    correctAns: 1,
}

const q4 = {
    question: "Which symbol is used for comments in Javascript?",
    answers: ["===", "/", "))", "// and /* */"],
    correctAns: 4,
}

const q5 = {
    question: "What would be the result of 3+2+'7'?",
    answers: ["The number 12", "the string '3+2+7'", "The string '57'", "The number 5 and the string '7'"],
    correctAns: 3,
}

const q6 = {
    question: "What is DOM in JavaScript?",
    answers: ["JavaScript can access all the elements in a web page using the Document Object Model (DOM). The web browser creates a DOM of the webpage when the page is loaded.", "The DOM is a large covering that keeps rain out", "The DOM is a superhighway leading to the various JavaScript suburbs", "The DOM only exists in CSS, not JavaScript"],
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
    
    //setting up the question setlist
    questionsRandom = assembleQuestions(questionsOrdered);
    whichQuestion = 0; //reset the question counter
    //populate the quiz card with a random coding question
    populateQuizCard();

    //toggling to the quiz card
    gamestartCardEl.setAttribute("style", "display: none");
    gameoverCardEl.setAttribute("style", "display: none");
    highscoresCardEl.setAttribute("style", "display: none");
    quizCardEl.setAttribute("style", "display: flex");
    
    //setting up the clock
    document.querySelector("#time-remaining").textContent = 30; //reset the clock
    document.querySelector("#timer").setAttribute("style", "display: block;"); //displaying the timer
    runningClock = setInterval(runClock, 1000); //starting the clock 
}

function runClock () {
    
    if (document.querySelector("#time-remaining").textContent <= 0) {
        gameOver();
        return;
    }

    document.querySelector("#time-remaining").textContent--;
    
    
}

function populateQuizCard () { //populates the quiz card with a fresh question
    document.querySelector("#question").textContent = questionsRandom[whichQuestion].question;
    for (let i=0; i<answersEl.length; i++){
        answersEl[i].textContent = questionsRandom[whichQuestion].answers[i];
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
    
    if (whichQuestion == questionsRandom.length-1){ //if there are no more questions, end the game. Prevents negative scores.
        gameOver();
        return; //prevent the end of this function which is out of bounds for the number of questions available
    }
    else if (event.target.value == questionsRandom[whichQuestion].correctAns){
        rightAnswer();
    }
    else {
        wrongAnswer();
    }
    
    whichQuestion++;
    populateQuizCard();

}

function wrongAnswer () {
    popup("Incorrect!");
    setTimeout(clearPopup, 2000); //clears the popup message after a delay

    if (document.querySelector("#time-remaining").textContent-10<0) {
        setTimeout(gameOver, 2000);
        gameOver();
    }
    else {
        document.querySelector("#time-remaining").textContent-=10;
    }

}

function rightAnswer(){
    popup("Correct!");
    setTimeout(clearPopup, 2000); //clears the popup message after a delay
}

function gameOver (){
    
    //stop and hide clock
    clearInterval(runningClock); 
    document.querySelector("#timer").setAttribute("style", "display: none;")
    
    //carry the timer value to the score value
    document.querySelector("#score").textContent = document.querySelector("#time-remaining").textContent;

    //toggling viewing to the gameover card
    quizCardEl.setAttribute("style", "display: none");
    gamestartCardEl.setAttribute("style", "display: none");
    highscoresCardEl.setAttribute("style", "display: none");
    gameoverCardEl.setAttribute("style", "display: flex");   
}

// U T I L I T Y    F U N C T I O N S //
function removeChildNodes(highscoresEl){
    while (highscoresEl.firstChild) {
        highscoresEl.removeChild(highscoresEl.firstChild);
    }
}

function assembleQuestions (array) { //assembles in a random order the various questions into an array, algorithm borrowed from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

   let currentIndex = array.length,  randomIndex;
      
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      
          // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
      
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
        }
      
        return array;
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


//DOM element variables
const questionsEl = document.querySelector('#questions');
const titleEl = document.querySelector('#title');
const optionsEl = document.querySelector('#options');
const timeEl = document.querySelector('#timer');
const startBtn = document.querySelector('#start');
const endEl = document.querySelector('#end');
const finalScoreEl = document.querySelector('#finalScore');
const initialsEl = document.querySelector('#initials');
const scoreBtn = document.querySelector('#submit');
const startEl = document.querySelector('.start');

//Quiz status variables
let currentQuestion = 0;
let timeRemain = 75;
let timerStart

function startQuiz() {
    //hides start screen
    startEl.setAttribute('class', 'hide');
    
    //displays questions screen
    questionsEl.removeAttribute('class', 'hide')
    
    //sets timer display to starting time
    timeEl.textContent = timeRemain;
    //starts timer
    timerStart = setInterval(timeTick, 1000);

    createQuestion();
}

function timeTick() {
    //ticks remaining time down and updates display to reflect change
    timeRemain--
    timeEl.textContent = timeRemain
    
    //runs endQuiz function if time runs out
    if (timeRemain <= 0) {
        console.log('Game Over!');
        endQuiz();
    }
};

function createQuestion() {
    //sets question of question element based on current index of questions.js
    titleEl.textContent = questions[currentQuestion].title
    
    //clears any previous question options
    optionsEl.innerHTML = '';

    questions[currentQuestion].options.forEach(function (option) {
        //creates new button per available option
        //sets text of new button to match corresponding option
        let optionButton = document.createElement('button');
        optionButton.textContent = option;

        //apprends created button el to existing element on page
        optionsEl.appendChild(optionButton);

        //ties event listener to each button
        optionButton.addEventListener('click', checkAnswer);
    });
};

function checkAnswer(event) {
    const corrAnswer = questions[currentQuestion].answer
    //compares textContent of clicked element with correct answer listed in the corresponding object property
    //removes 10 seconds from timer if answer is incorrect
    if (event.target.textContent != corrAnswer) {
    timeRemain -= 10
    };
    
    //advances index of questions.js array
    currentQuestion++

    //runs endQuiz function if end of array is reached, otherwise runs createQuestion function
    if (currentQuestion === questions.length) {
    console.log('Game Over!');
    endQuiz();
    } else {
    createQuestion();
    };
};

function endQuiz() {
    //stops timer
    clearInterval(timerStart);
    
    //hides questions screen
    questionsEl.setAttribute('class', 'hide');

    //displays end screen
    endEl.removeAttribute('class', 'hide');

    //sets current time remaining as final score
    finalScoreEl.textContent = timeRemain;
};

function logScore() {
    //captures user input
    const initials = initialsEl.value;
    
    //sets newScore object with current users information
    const newScore = {
        initials: initials,
        score: timeRemain
    };
    
    //pulls scores from localStorage or sets an empty array
    const allScores = JSON.parse(localStorage.getItem('allScores')) || [];

    //saves newly created score object into localStorage array
    allScores.push(newScore);
    localStorage.setItem('allScores', JSON.stringify(allScores));

    //redirects window to scoreboard page
    window.location.href = 'highscores.html'
};

//ties quiz start function to correct button el
startBtn.onclick = startQuiz;

//ties score save function to correct button el
scoreBtn.onclick = logScore;
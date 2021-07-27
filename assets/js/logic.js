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

let currentQuestion = 0;
let timeRemain = 75;
let timerStart

function startQuiz() {

    startEl.setAttribute('class', 'hide');

    questionsEl.removeAttribute('class', 'hide')

    timeEl.textContent = timeRemain;

    timerStart = setInterval(timeTick, 1000);

    createQuestion();
}

function timeTick() {
    timeRemain--
    timeEl.textContent = timeRemain
    
    if (timeRemain <= 0) {
        console.log('Game Over!');
        endQuiz();
    }
};

function createQuestion() {
    titleEl.textContent = questions[currentQuestion].title

    optionsEl.innerHTML = '';

    questions[currentQuestion].options.forEach(function (option) {
        let optionButton = document.createElement('button');
        optionButton.textContent = option;

        optionsEl.appendChild(optionButton);

        optionButton.addEventListener('click', checkAnswer);
    });
};

function checkAnswer(event) {
    const corrAnswer = questions[currentQuestion].answer
    if (event.target.textContent != corrAnswer) {
    timeRemain -= 10
    };

    currentQuestion++

    if (currentQuestion === questions.length) {
    console.log('Game Over!');
    endQuiz();
    } else {
    createQuestion();
    };
};

function endQuiz() {
    clearInterval(timerStart);

    questionsEl.setAttribute('class', 'hide');

    endEl.removeAttribute('class', 'hide');

    finalScoreEl.textContent = timeRemain;
};

function logScore(params) {
    const initials = initialsEl.value;

    const newScore = {
        initials: initials,
        score: timeRemain
    };

    const allScores = JSON.parse(localStorage.getItem('allScores')) || [];

    allScores.push(newScore);

    localStorage.setItem('allScores', JSON.stringify(allScores));

    window.location.href = 'highscores.html'
};

startBtn.onclick = startQuiz;
scoreBtn.onclick = logScore;
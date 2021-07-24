const questionsEl = document.querySelector('#questions');
const titleEl = document.querySelector('#title');
const optionsEl = document.querySelector('#options');
const timeEl = document.querySelector('#timer');
const startBtn = document.querySelector('#start');

let currentQuestion = 0;
let timeRemain = 75;
let timerStart

function startQuiz() {
    timeEl.textContent = timeRemain;

    timerStart = setInterval(timeTick, 1000);

    createQuestion();
}

function timeTick() {
    timeRemain--
    timeEl.textContent = timeRemain
    
    if (timeRemain <= 0) {
        clearInterval(timerStart);
        console.log('Game Over!');
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
    } else {
    createQuestion();
    };
};

function endQuiz() {
    
}

startBtn.onclick = startQuiz;
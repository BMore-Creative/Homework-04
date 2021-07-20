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
    

    questions[currentQuestion].options.forEach(function (option) {
        let optionButton = document.createElement('button');
        optionButton.textContent = option;

        optionButton.onclick = function (event) {
            const corrAnswer = questions[currentQuestion].answer
            if (event.target.textContent != corrAnswer) {
            timeRemain = timeRemain - 10
            currentQuestion++

            if (currentQuestion === questions.length) {
                
            };
        };
    };

        optionsEl.appendChild(optionButton);
    });

    
};

startBtn.onclick = startQuiz();
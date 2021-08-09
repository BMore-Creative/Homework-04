function displayScores() {
    const allScores = JSON.parse(localStorage.getItem('allScores')) || [];

    allScores.sort(function (a, b) {
        return b.score - a.score;
    });

    allScores.forEach(function (score) {
        const scoreEl = document.createElement('li');
        scoreEl.textContent = score.initials + ' - ' + score.score

        const scoreBoard = document.querySelector('#allScores');
        scoreBoard.appendChild(scoreEl);
    });
}

function clearScores() {
    window.localStorage.removeItem('allScores');
    window.location.reload();
}

document.querySelector('#clear').onclick = clearScores;

displayScores();
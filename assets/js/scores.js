
function displayScores() {
    //pulls scores from localStorage or sets an empty array
    const allScores = JSON.parse(localStorage.getItem('allScores')) || [];

    //sorts scores in decending order
    allScores.sort(function (a, b) {
        return b.score - a.score;
    });

    allScores.forEach(function (score) {
        //creates an li el per saved score
        //sets textContent of li tag to saved initials/score for each index of saved array
        const scoreEl = document.createElement('li');
        scoreEl.textContent = score.initials + ' - ' + score.score
        
        //appends created li el to existing element on page
        const scoreBoard = document.querySelector('#allScores');
        scoreBoard.appendChild(scoreEl);
    });
}

function clearScores() {
    //clears localStorage, removing all initials/scores
    //reloads page to display change
    localStorage.removeItem('allScores');
    window.location.reload();
}

//ties clear function to correct button el
document.querySelector('#clear').onclick = clearScores;

displayScores();
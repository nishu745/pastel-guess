const guessInput = document.getElementById("guessInput");
const guessBtn = document.getElementById("guessBtn");
const resetBtn = document.getElementById("resetBtn");
const message = document.getElementById("message");
const attemptsDisplay = document.getElementById("attempts");
const bestScoreDisplay = document.getElementById("bestScore");

let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

let bestScore = localStorage.getItem("bestScore");

if (bestScore) {
    bestScoreDisplay.textContent = bestScore;
} else {
    bestScoreDisplay.textContent = "--";
}

guessBtn.addEventListener("click", checkGuess);

guessInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        checkGuess();
    }
});

function checkGuess() {

    let guess = Number(guessInput.value);

    if (guess < 1 || guess > 100 || isNaN(guess)) {
        message.textContent = "⚠️ Enter a number between 1 and 100";
        return;
    }

    attempts++;
    attemptsDisplay.textContent = attempts;

    if (guess === randomNumber) {

        message.textContent = "🎉 Congratulations! You Won!";

        confetti({
            particleCount: 180,
            spread: 100,
            origin: {
                y: 0.6
            }
        });

        if (bestScore === null || attempts < Number(bestScore)) {
            bestScore = attempts;
            localStorage.setItem("bestScore", bestScore);
            bestScoreDisplay.textContent = bestScore;
        }

    } else if (guess < randomNumber) {

        message.textContent = "📉 Too Low!";

    } else {

        message.textContent = "📈 Too High!";

    }

    guessInput.value = "";
    guessInput.focus();
}

resetBtn.addEventListener("click", function() {

    randomNumber = Math.floor(Math.random() * 100) + 1;

    attempts = 0;

    attemptsDisplay.textContent = 0;

    message.textContent = "🍀 Good Luck!";

    guessInput.value = "";

    guessInput.focus();

});
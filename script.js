let numberToGuess;
let guesses = [];
const maxTurns = 10;
let turnsLeft = maxTurns;
let gameEnded = false;

function startGame() {
    numberToGuess = Math.floor(Math.random() * 100) + 1;
    guesses = [];
    turnsLeft = maxTurns;
    gameEnded = false;

    document.getElementById('guessInput').value = '';
    document.getElementById('guessInput').disabled = false;
    document.getElementById('guessButton').disabled = false;

    document.getElementById('result').innerHTML = `
        <p>Game started! You have ${turnsLeft} turns. Good luck!</p>
        <p>Numbers guessed so far: []</p>
    `;
}

function makeGuess() {
    if (gameEnded) {
        alert("The game has ended. Please start a new game to play again.");
        return;
    }

    const guessInput = document.getElementById('guessInput');
    const guess = parseInt(guessInput.value);

    if (isNaN(guess) || guess < 1 || guess > 100) {
        alert("Please enter a valid number between 1 and 100.");
        return;
    }

    if (guesses.includes(guess)) {
        alert("You've already guessed that number.");
        return;
    }

    guesses.push(guess);
    turnsLeft--;

    let resultMessage;
    if (guess === numberToGuess) {
        resultMessage = `Congratulations! You guessed the number ${numberToGuess} correctly in ${maxTurns - turnsLeft} turns.`;
        gameEnded = true;
        document.getElementById('guessInput').disabled = true;
        document.getElementById('guessButton').disabled = true;
    } else if (guess < numberToGuess) {
        resultMessage = "Too low!";
    } else {
        resultMessage = "Too high!";
    }

    if (turnsLeft === 0 && guess !== numberToGuess) {
        resultMessage = `Sorry, you've run out of turns. The number was ${numberToGuess}.`;
        gameEnded = true;
        document.getElementById('guessInput').disabled = true;
        document.getElementById('guessButton').disabled = true;
    }

    document.getElementById('result').innerHTML = `
        <p>${resultMessage}</p>
        <p>Numbers guessed so far: [${guesses.join(', ')}]</p>
        ${turnsLeft > 0 && guess !== numberToGuess ? `<p>Turns left: ${turnsLeft}</p>` : ''}
    `;

    if (gameEnded) {
        document.getElementById('result').innerHTML += '<p><button onclick="startGame()">Start New Game</button></p>';
    }
}

// Initialize the game on page load
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('guessButton').addEventListener('click', makeGuess);
    document.getElementById('startButton').addEventListener('click', startGame);
    startGame(); // Automatically start the game when the page loads
});

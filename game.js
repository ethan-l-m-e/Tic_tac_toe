"use-strict";

const cells = document.querySelectorAll("td[data-id]");
cells.forEach(cell => {
    cell.addEventListener("click", (e) => {
        playerMove(e);
    });
});

const BOARD_LENGTH = 3;
const CROSS = "X"
const CIRCLE = "O"
let turns = 0;
const gameState = ["", "", "", "", "", "", "", "", ""];

function getPlayerToken() {
    if (turns % 2 === 0) {
        return CROSS;
    } else {
        return CIRCLE;
    }
}

function playerMove(e) {
    clearMessages();
    if (e.target.innerHTML != "") {
        showErrorMessage("This square is already taken.");
        return;
    }
    let selectedCell = e.target;
    let cellId = selectedCell.dataset.id;
    selectedCell.innerHTML = getPlayerToken();
    gameState[cellId] = getPlayerToken();
    if(checkWin(cellId)) {
        document.getElementById("gameResultMessage").innerHTML = `Player ${getPlayerToken()} has won the game!`;
    }
    turns++;
}

function checkWin(cellId) {
    let w = false;

    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // 
    winningCombos.forEach((combo) => {
        let t = getPlayerToken();
        if (gameState[combo[0]] == t && gameState[combo[1]] == t && gameState[combo[2]] == t) {
            w = true;
            console.log(combo);
            console.log(gameState)
        }
    });
    return w;
}

function resetBoard() {
    console.clear();
    cells.forEach((cell) => {
        cell.innerHTML = "";
    });
    for (let i = 0; i < gameState.length; i++) {
        gameState[i] = "";
    }
    turns = 0;
}

function clearMessages() {
    document.getElementById("errorMessage").innerHTML = "";
    document.getElementById("gameResultMessage").innerHTML = "";
}

function showErrorMessage(e) {
    document.getElementById("errorMessage").innerHTML = e;
}
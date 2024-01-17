"use-strict";

// List of cells in the tic-tac-toe board.
const cells = document.querySelectorAll("td[data-id]");
// Add listeners to query for player input.
addCellClickListeners();

// GAME VARIABLES.
const CROSS = "X"
const CIRCLE = "O"
const BOARD_LENGTH = 3;
const gameState = ["", "", "", "", "", "", "", "", ""];
let turns = 0;

function getPlayerToken() {
    if (turns % 2 === 0) {
        // Player with X goes first.
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
    checkWin();
    checkDraw();
    turns++;
}

function checkWin() {
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

    // Check if current player has filled in a straight line of 3.
    winningCombos.forEach((combo) => {
        let t = getPlayerToken();
        if (gameState[combo[0]] == t && gameState[combo[1]] == t && gameState[combo[2]] == t) {
            w = true;

            // highlight the winning cells
            cells.forEach((cell) => {
                if (cell.dataset.id == combo[0] ||
                    cell.dataset.id == combo[1] ||
                    cell.dataset.id == combo[2]) {
                        cell.classList.add("winning-cell");
                    }
            });
        }
    });

    if (w) {
        // Send message of victory.
        document.getElementById("gameResultMessage").innerHTML = `Player ${getPlayerToken()} has won the game!`;
        gameOver();
    }
}

function checkDraw() {
    if (turns >= 8) {
        // Tell them it's a draw
        document.getElementById("gameResultMessage").innerHTML = "It's a draw!";
        gameOver();
    }
}

function resetBoard() {
    console.clear();
    cells.forEach((cell) => {
        cell.innerHTML = "";
        cell.classList.remove("winning-cell");
    });
    for (let i = 0; i < gameState.length; i++) {
        gameState[i] = "";
    }
    turns = 0;
    clearMessages();
    addCellClickListeners();
}

function clearMessages() {
    document.getElementById("errorMessage").innerHTML = "";
    document.getElementById("gameResultMessage").innerHTML = "";
}

function showErrorMessage(e) {
    document.getElementById("errorMessage").innerHTML = e;
}

function gameOver() {
    removeCellClickListeners();
}

function removeCellClickListeners() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeEventListener("click", playerMove);
    }
}

function addCellClickListeners() {
    cells.forEach(cell => {
        cell.addEventListener("click", playerMove);
    });
}

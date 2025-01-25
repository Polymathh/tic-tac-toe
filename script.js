// Select elements
const cells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMessageElement = document.getElementById("winningMessage");
const winningTextElement = document.getElementById("winningText");
const restartButton = document.getElementById("restartButton");

// Player Classes
const X_CLASS = "x";
const O_CLASS = "o";
let oTurn = false; // Start with X's turn

// Winning combinations
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Start the game
startGame();

restartButton.addEventListener("click", startGame);

function startGame() {
  oTurn = false; // Reset to X's turn
  cells.forEach((cell) => {
    cell.classList.remove(X_CLASS, O_CLASS);
    cell.textContent = ""; // Clear X or O from cells
    cell.removeEventListener("click", handleClick); // Remove old event listeners
    cell.addEventListener("click", handleClick, { once: true }); // Add fresh listener
  });
  setBoardHoverClass(); // Set hover effects
  winningMessageElement.classList.remove("show"); // Hide winning message
}

function handleClick(e) {
  const cell = e.target; // Get the clicked cell
  const currentClass = oTurn ? O_CLASS : X_CLASS; // Determine current player
  placeMark(cell, currentClass); // Place mark in the cell
  if (checkWin(currentClass)) {
    endGame(false); // Declare winner
  } else if (isDraw()) {
    endGame(true); // Declare draw
  } else {
    swapTurns(); // Switch player
    setBoardHoverClass(); // Update hover effect
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass); // Add X or O class
  cell.textContent = currentClass === X_CLASS ? "X" : "O"; // Add text to cell
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS, O_CLASS);
  board.classList.add(oTurn ? O_CLASS : X_CLASS); // Update hover effect
}

function swapTurns() {
  oTurn = !oTurn; // Alternate turns
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

function isDraw() {
  return [...cells].every((cell) => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
  });
}

function endGame(draw) {
  if (draw) {
    winningTextElement.innerText = "It's a Draw!";
  } else {
    winningTextElement.innerText = `${oTurn ? "O" : "X"} Wins!`;
  }
  winningMessageElement.classList.add("show"); // Show result
}

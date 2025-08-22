const buttons = document.getElementsByClassName("btn");
const reset = document.getElementById("reset-btn");
const playerType = document.getElementById("player-type");

let playerNumber = 1; 
let filledGrid = [];
let filledCells = 0;

for (let i = 0; i < 6; i++) {
  filledGrid.push(new Array(7).fill(-1));
}

reset.addEventListener("click", resetBoard);

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    const buttonNo = parseInt(this.classList[1].split("-")[1]);
    makeMove(this, buttonNo);
  });
}

function makeMove(button, buttonNo) {
  const row = (buttonNo - 1) / 7 | 0;
  const col = (buttonNo - 1) % 7;

  if (filledGrid[row][col] !== -1) return;

  if (playerNumber === 1) {
    button.classList.add("btn-player-1");
    filledGrid[row][col] = 1;
    playerNumber = 2;
    playerType.textContent = "Player - 2";
  } else {
    button.classList.add("btn-player-2");
    filledGrid[row][col] = 2;
    playerNumber = 1;
    playerType.textContent = "Player - 1";
  }

  filledCells++;
  button.disabled = true;

  if (playerWon(row, col, filledGrid[row][col])) {
    setTimeout(() => {
      alert(`Game Over: Player ${filledGrid[row][col]} Wins!`);
      resetBoard();
    }, 100);
    return;
  }

  if (filledCells === 42) {
    setTimeout(() => {
      alert("Game Draw!");
      resetBoard();
    }, 100);
  }
}

function playerWon(row, col, player) {
  return (
    checkDirection(row, col, 0, 1, player) ||  // Horizontal
    checkDirection(row, col, 1, 0, player) ||  // Vertical
    checkDirection(row, col, 1, 1, player) ||  // Diagonal ↘
    checkDirection(row, col, 1, -1, player)    // Diagonal ↙
  );
}

function checkDirection(row, col, dx, dy, player) {
  let count = 1;

  count += countDirection(row, col, dx, dy, player);
  count += countDirection(row, col, -dx, -dy, player);

  return count >= 4;
}

function countDirection(row, col, dx, dy, player) {
  let count = 0;
  let r = row + dx;
  let c = col + dy;

  while (r >= 0 && r < 6 && c >= 0 && c < 7 && filledGrid[r][c] === player) {
    count++;
    r += dx;
    c += dy;
  }

  return count;
}

function resetBoard() {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = false;
    buttons[i].classList.remove("btn-player-1");
    buttons[i].classList.remove("btn-player-2");
  }

  playerNumber = 1;
  playerType.textContent = "Player - 1";
  filledCells = 0;

  for (let i = 0; i < 6; i++) {
    filledGrid[i] = new Array(7).fill(-1);
  }
}

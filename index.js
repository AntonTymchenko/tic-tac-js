const table = document.getElementById("table");

table.addEventListener("click", createDivTextContent);

let move = true;
let statusWinner = null;
let winner = null;

function createDivTextContent(event) {
  if (event.target.dataset.num) {
    if (move && !event.target.textContent) {
      event.target.textContent = "X";
      move = !move;
      statusWinner = checkWinner("X");
      winner = "X";
    } else if (!move && !event.target.textContent) {
      event.target.textContent = "O";
      move = !move;
      statusWinner = checkWinner("O");
      winner = "O";
    }
  }
  if (statusWinner === "draw") {
    setTimeout(() => {
      alert(`It is a draw`);
      createTable();
      move = true;
    }, 0);
    return;
  }
  if (statusWinner) {
    setTimeout(() => {
      alert(`The winner is ${winner}`);
      createTable();
      move = true;
    }, 0);
  }
}

function createTable() {
  table.innerHTML = "";
  const divCollection = [];
  for (let i = 0; i < 9; i += 1) {
    const div = document.createElement("div");
    div.setAttribute("data-num", i + 1);
    divCollection.push(div);
  }
  table.append(...divCollection);
}
createTable();

function checkWinner(textContent) {
  const divCollection = table.querySelectorAll("div");
  const divNumbers = [...divCollection]
    .filter((item) => item.textContent === textContent)
    .map((item) => +item.dataset.num);

  let result = false;
  let count = 0;
  const winnerCases = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];
  for (let i = 0; i < winnerCases.length; i += 1) {
    for (let num of divNumbers) {
      if (winnerCases[i].includes(num)) {
        count += 1;
      }
      if (count === 3) {
        result = true;
        break;
      } else {
        continue;
      }
    }
    count = 0;
  }
  if (!result && divNumbers.length === 5) {
    return "draw";
  } else if (!result) {
    return false;
  }
  return result;
}

const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}
function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] !== "" || !running){
        return;
    }

    updatedCell(this, cellIndex);
    checkWinner();

}
function updatedCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;

}
function changePlayer(){
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;

}
function checkWinner(){
    let roundWon = 0;
    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];
         
        if(cellA === "" || cellB === "" || cellC === ""){
            continue;
        }
        if(cellA === cellB && cellB === cellC){
            roundWon = 1;
           document.querySelector(`[cellIndex='${condition[0]}']`).classList.add("win");
            document.querySelector(`[cellIndex='${condition[1]}']`).classList.add("win");
            document.querySelector(`[cellIndex='${condition[2]}']`).classList.add("win");
            break;

        }
    }
    console.log(roundWon);
    if(roundWon){
        console.log("if enter")
        statusText.textContent = `${currentPlayer} wins!`;
        running = false;
    }
    else if(!options.includes("")){
        statusText.textContent = `Draw!`;
    }
    else{
        changePlayer();
    }

}
function restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("win");
    });
    running = true;
}
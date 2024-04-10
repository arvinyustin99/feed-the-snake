let grid = document.querySelector("#root .canvas");
let popup = document.querySelector(".popup");
let scoreDisplay = document.querySelector(".score-display");
let width = 10;
let currentIndex = 0;
let currentSnake = [2, 1, 0]
let direction = 1; // 1 = up, 2 = right, 3 = down, 4 = left
let speed = 0.8;
let interval = 0;
let intervalTime = 1000;

document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("keyup", control);
    createBoard();
    startGame();
})

function startGame() {
    let squares = document.querySelectorAll("#root .canvas div")
    direction = 1;
    intervalTime = 1000;
    currentSnake = [2, 1, 0]
    currentSnake.forEach((index) => {
        // TODO: restrict more in Snake's movement
        /*
        if (index === 0) {
            squares[index].classList.add("head")
        } else {
            squares[index].classList.add("snake")
        }
        */
        squares[index].classList.add("snake")
    })
}

function createBoard() {
    popup.style.display = "none";
    for (let i = 0; i < 100; i++){
        let gridDiv = document.createElement("div")
        grid.appendChild(gridDiv)
    }
}

function control(e) {
    if (e.keycode === 39) {
      direction = 1; // right
    } else if (e.keycode === 38) {
      direction = -width; // arrow up
    } else if (e.keycode === 37) {
      direction = -1; // left, the snake will go left one div
    } else if (e.keycode === 40) {
      direction = +width; // down the snake head will instantly appear 10 divs below from the current div
    }
  }
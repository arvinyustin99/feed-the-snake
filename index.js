let grid = document.querySelector("#root .canvas");
let popup = document.querySelector(".popup");
let scoreDisplay = document.querySelector(".score-display");
let width = 10;
let appleIndex = 0;
let score = 0;
let currentSnake = [2, 1, 0]
let direction = 1; // -10 = up, 1 = right, 10 = down, -1 = left
let speed = 0.8;
let interval = 0;
let intervalTime = 1000;

document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("keyup", control);
    createBoard();
    startGame();
    moveOutcome();
})

function startGame() {
    let squares = document.querySelectorAll("#root .canvas div")
    direction = 1;
    intervalTime = 1000;
    currentSnake = [3, 2, 1, 0]
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
    generateRandomApple(squares)
    interval = setInterval(moveOutcome, intervalTime);
}

function createBoard() {
    popup.style.display = "none";
    for (let i = 0; i < 100; i++){
        let gridDiv = document.createElement("div")
        grid.appendChild(gridDiv)
    }
}

function moveOutcome() {
    let squares = document.querySelectorAll("#root .canvas div")
    moveSnake(squares)
}

function eatApple(squares, tail) {
    if (squares[currentSnake[0]].classList.contains("apple")) {
      squares[currentSnake[0]].classList.remove("apple");
      squares[tail].classList.add("snake");
      currentSnake.push(tail);
      generateRandomApple(squares);
      //score++;
      //scoreDisplay.textContent = score;
      clearInterval(interval);
      intervalTime = intervalTime * speed;
      interval = setInterval(moveOutcome, intervalTime);
    }
  }

function checkForHits(squares) {
    if (
      (currentSnake[0] + width >= width * width && direction === width) ||
      (currentSnake[0] % width === width - 1 && direction === 1) ||
      (currentSnake[0] % width === 0 && direction === -1) ||
      (currentSnake[0] - width <= 0 && direction === -width) ||
      squares[currentSnake[0] + direction].classList.contains("snake")
    ) {
      return true;
    } else {
      return false;
    }
  }
  

function moveSnake(pointList) {
    // assume the first index of array is the tail-end
    if (direction === 0) {return}
    let tail = currentSnake.pop();
    pointList[tail].classList.remove("snake");
    currentSnake.unshift(currentSnake[0] + direction);
    pointList[currentSnake[0]].classList.add("snake");
    eatApple(pointList, tail)
    console.log("current pos: ", currentSnake)
}

function generateRandomApple(squares) {
    if (appleIndex >= 0) {
        removeEatenApple(squares);
    }
    previousAppleIndex = appleIndex;
    do {
        appleIndex = Math.floor(Math.random() * squares.length)
    //} while (squares[appleIndex].classList.contains("snake"));
    } while (currentSnake.find((val, idx) => {
        return val === appleIndex;
    }) && (appleIndex !== previousAppleIndex))
    squares[appleIndex].classList.add("apple");
}

function removeEatenApple(squares){
    squares[appleIndex].classList.remove("apple");
}

function control(e) {
    console.log("key pressed: ", e);
    if (e.code === "ArrowRight") {
      direction = 1; // right
    } else if (e.code === "ArrowUp") {
      direction = -width; // arrow up
    } else if (e.code === "ArrowLeft") {
      direction = -1; // left, the snake will go left one div
    } else if (e.code === "ArrowDown") {
      direction = +width; // down the snake head will instantly appear 10 divs below from the current div
    } else if (e.key === "Escape") {
        direction = 0;
    }
  }
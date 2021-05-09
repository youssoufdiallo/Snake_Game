const EXPANSION_RATE = 1;
let newSegments = 0;
const GRID_SIZE = 21;


let lastRenderTime = 0;
let gameOver = false;
let inputDirection = {x: 0, y: 0}
let lastInputDirection = { x: 0, y: 0}
const gameBoard = document.getElementById('game-board');

const SNAKE_SPEED = 5;
const snakeBody = [{x: 11, y:11}];

window.addEventListener('keydown', e => {
    switch(e.key) {
        case 'ArrowUp':
            if(lastInputDirection.y !== 0) break;
        inputDirection = { x: 0, y: -1 }
        break;

        case 'ArrowDown':
            if(lastInputDirection.y !== 0) break;
        inputDirection = { x: 0, y: 1 }
        break;

        case 'ArrowLeft':
            if(lastInputDirection.x !== 0) break;
        inputDirection = { x: -1, y: 0 }
        break;

        case 'ArrowRight':
            if(lastInputDirection.x !== 0) break;
        inputDirection = { x: 1, y: 0 }
        break;
}

})

function main(currentTime){  

    if(gameOver){
        return alert('you lose')
    }
    window.requestAnimationFrame(main);
    const secondsSinceRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceRender < 1/ SNAKE_SPEED) return;

    lastRenderTime = currentTime;

    update();
    draw(gameBoard);
    

}

window.requestAnimationFrame(main);

function update() {
    const inputDirection = getInputDirection();
for(let i = snakeBody.length-2; i >= 0; i--) {
    snakeBody[i+1] = {...snakeBody[i]}
    
}
    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;

    updateFood(); 
    checkDeath();

}

function draw(gameBoard) {
    gameBoard.innerHTML = "";
    snakeBody.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.classList.add('snake');
        gameBoard.appendChild(snakeElement);

    })

    drawFood(gameBoard);
    

}

function getInputDirection() {
    lastInputDirection = inputDirection;
    return inputDirection;

}




// food element part

let food = getRandmFoodPosition();

function updateFood() {
        addSegments()
    if (onSnake(food)) {
        expandSnake(EXPANSION_RATE)
        food = getRandmFoodPosition();
    }   
}

function drawFood(gameBoard) {
    
        const foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        gameBoard.appendChild(foodElement);

}

function expandSnake(amount) {
    newSegments += amount;
}

function onSnake(position) {
    return snakeBody.some((segment) => {
        return equalPosition(segment, position)
    })
}

function getSnakeHead(){
    return snakeBody[0];
}



function equalPosition(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y

}

function addSegments () {
    for(let i = 0; i< newSegments; i++) { 
        snakeBody.push({...snakeBody[snakeBody.length - 1]})
    }
    newSegments = 0;
}

function randomGridPosition() {
    return{
        x: Math.floor(Math.random() * GRID_SIZE) + 1,
        y: Math.floor(Math.random() * GRID_SIZE) + 1
    }
}

function outsideGride(position){
    return (
        position.x < 1 || position.x > GRID_SIZE ||
        position.y < 1 || position.y > GRID_SIZE
    )
}



function getRandmFoodPosition() {
    let newFoodPosition;
    while(newFoodPosition == null || onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosition()
    }
    
    return newFoodPosition
}

function checkDeath() {

    gameOver = outsideGride(getSnakeHead());
}
document.addEventListener('DOMContentLoaded', () => {
    //assign variables to our html elements. this way we can work with them
    // in code. 
    const grid = document.querySelector('.grid');

    // here we make an array of divs. our 200 divs become an array 
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const width = 10;
    const ScoreDisplay = document.querySelector('#score');
    const StartBtn = document.querySelector('#start_button');
    console.log(squares);

    //the Tetrominoes
    const lTetromino = [
        [1, width + 1, width * 2 + 1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
    ]

    const zTetromino = [
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1],
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1]
    ]
    
    const tTetromino = [
        [1,width,width+1,width+2],
        [1,width+1,width+2,width*2+1],
        [width,width+1,width+2,width*2+1],
        [1,width,width+1,width*2+1]
    ]
    
    const oTetromino = [
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1]
    ]
    
    const iTetromino = [
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3],
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3]
    ]

    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];

    let currentPosition = 4;
    let currentRotation = 0;
    //select a tetromino randomly
    let random = Math.floor(Math.random()*theTetrominoes.length);
    let current = theTetrominoes[random][currentRotation];

    //draw the first rotation in the first tetromino
    function draw() {
        current.forEach(index => {
            //apply this logic to each index in the current array
            squares[currentPosition + index].classList.add('tetromino');
        })
    }

    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino');
        })
    }

    //make the tetromino move down every second
    timerId = setInterval(moveDown, 1000);

    //assign functions to keyCodes
    function control(e) {
        if(e.keyCode == 37) {
            moveLeft();
        } else if (e.keyCode == 39) {
            moveRight();
        } else if (e.keyCode == 38) {
            rotate();
        } else if (e.keyCode == 40) {
            moveDown();
        }
    }
    document.addEventListener('keyup', control);

    //move down 
    function moveDown() {
        undraw();
        currentPosition += width;
        draw();
        freeze();
    }

    //freeze function 
    function freeze() {
        //check if tetromino has reached the bottom of the board
        //if it has, stop it from moving. We do this by changing its class 
        if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))){
            current.forEach(index => squares[currentPosition + index].classList.add('taken'));
            //start a new tetromino falling
            random = Math.floor(Math.random() * theTetrominoes.length);
            current = theTetrominoes[random][currentRotation];
            currentPosition = 4;
            draw();
        }
    }

    function moveLeft() {
        undraw();
        //first check if tetromino is at left edge
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);

        //if tetromino is not at left edge then move left by 1
        if(!isAtLeftEdge) currentPosition -= 1;

        //if tetromnio collides with another tetromino, then stop moving
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
            currentPosition += 1;
        }

        draw();
    }

    function moveRight() {
        undraw();

        const isAtRightEdge = current.some(index => (currentPosition + index) % width === 9);

        if(!isAtRightEdge) currentPosition += 1;

        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
            currentPosition -= 1;
        }

        draw();
    }

    function rotate() {
        undraw();

        currentRotation++;
        if (currentRotation == current.length) { //if current rotation foes to 4, go back to 0;
            currentRotation = 0;
        } 

        current = theTetrominoes[random][currentRotation];

        draw();
    }

})
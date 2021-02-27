
    const canvas = document.getElementById("gameBoard")
    const ctx = canvas.getContext('2d');

    class SnakeParts{
        constructor(x,y){
            this.x = x;
            this.y = y;
        }
    }

    let snakeParts = [];
    let tailLength =2;
    let snakeSpeed = 5;
    let tileCount = 20;
    let tileSize = (canvas.width / tileCount) - 2;
    let headX =10;
    let headY =10;

    let velocityX =0;
    let velocityY =0;

    let appleX = 5;
    let appleY =5;

    let score = 0;
    const eating = new Audio("Eatingsound.mp3")


    //gameloop
    function drawGame(){

        changeSnakePosition();
        let result = isGameOver();
        if(result){
            return;
        }
        
        clearScreen()
        drawSnake()
        drawApple()
        
        appleEaten()
        drawScore()
        console.log("drawGame");

        //increase speed based on the score

        if(score >2){
            snakeSpeed = 8
        }
        else if(score > 5){
            snakeSpeed =11
        }
        setTimeout(drawGame, 1000/ snakeSpeed);
    }

    function clearScreen(){
        ctx.fillStyle = 'black';
        ctx.fillRect(0,0,canvas.clientWidth,canvas.clientHeight);
    }
    //game characters
    function drawSnake(){
        ctx.fillStyle= '#42f545';
        ctx.fillRect(headX*tileCount, headY*tileCount, tileSize, tileSize)
        //adding a snake part to the tail of the snake
        ctx.fillStyle = "green";
        for(let i=0; i < snakeParts.length; i++){
            let part = snakeParts[i];
            ctx.fillRect(part.x*tileCount, part.y * tileCount, tileSize, tileSize)
        }
        snakeParts.push(new SnakeParts(headX, headY));//adding a snake part the the tail of the snake
        while (snakeParts.length > tailLength){
            snakeParts.shift();//removing parts furhter from the snake parts if its larger than the tail
        }
    }

    function drawApple(){
        ctx.fillStyle = "red"
        ctx.fillRect(appleX*tileCount, appleY*tileCount, tileSize, tileSize)
    }

    function drawScore(){
        ctx.fillStyle = "white"
        ctx.font = "12px Verdana"
        ctx.fillText("Score " + score, canvas.clientWidth-49, 15) 
    }

    //game actions
    
    function changeSnakePosition(){
        headX = headX + velocityX;
        headY = headY + velocityY;
    }

    function appleEaten(){
        if(appleX=== headX && appleY===headY){
            appleX = Math.floor(Math.random() * tileCount);
            appleY = Math.floor(Math.random() * tileCount );
            tailLength++;
            score++;
            eating.play()
            
        }
    }

    function isGameOver(){
        let gameOver = false;
        //final execution of gameOver if you eat your own body
        if(velocityX ===0 && velocityY===0){
            return false
        }
        //crashing left
        if(headX < 0){
            gameOver = true;
        }
        //crashing right
        if(headX >= tileCount){
            gameOver = true;
        }
        //crashing up
        if(headY <0){
            gameOver = true;
        }
        //crashing down
        if(headY >=tileCount){
            gameOver =true;
        }
        //eating your own body
        for(let i=0; i < snakeParts.length; i++){
            let part = snakeParts[i];
            if(part.x ===headX && part.y ===headY){
                gameOver =true;
                break;
            }
        }

        if(gameOver){
            ctx.fillStyle = "white";
            ctx.font = "50px Verdana"

            var gradient = ctx.createLinearGradient(0,0, canvas.clientWidth, 0)
            gradient.addColorStop("0", "magenta");
            gradient.addColorStop("0.5", "blue");
            gradient.addColorStop("1", "red")
            //fill with the gradient
            ctx.fillStyle = gradient;

            ctx.fillText("GameOver! ", canvas.clientWidth/ 6.5, canvas.clientHeight/2)
        }

        return gameOver;
    }

    

    //event listeners
    document.body.addEventListener('keydown', keydown);

    function keydown(event){
        //up
        if(event.keyCode === 38){
            if(velocityY===1) return;
            velocityY = -1;
            velocityX = 0;
        }
        //down
        if(event.keyCode === 40){
            if(velocityY===-1) return;
            velocityY =1;
            velocityX =0;
        }
        //right
        if(event.keyCode ===39){
            if(velocityX===-1) return;
            velocityY =0;
            velocityX =1;
        }
        //left
        if(event.keyCode ===37){
            if(velocityX===1) return;
            velocityY =0;
            velocityX =-1;
        }
    }
    drawGame();
    //requestAnimationFrame
    //setInterval xtimes per second
    //setTimeout

    

    
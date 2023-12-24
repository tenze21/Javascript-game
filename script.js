document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("game-canvas");
    const ctx = canvas.getContext("2d");
    const scoreElement = document.getElementById("score");
    const startButton=document.querySelector('.start-button');
    const scoreKeep=document.querySelector('.scoretag');
    const startScreen=document.querySelector('.game-instructions');

// removing the instruction screen and displaying the game
    startButton.addEventListener('click',()=>{
        canvas.style.display="block";
        scoreKeep.style.display="block";
        startScreen.style.display="none";
        setInterval(createLetter, 900); // Generate a new letter every 1 second
    });

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let score = 0;
    let speed = 1; // Initial speed
    let gameOver=false;
    let storeScore=[];

    // Create an array to store falling letters
    let letters = [];

    // Event listener to capture key presses
    document.addEventListener("keydown", (event) => {
        const pressedKey = event.key.toUpperCase();
        checkLetter(pressedKey);
    });

    function checkLetter(pressedKey) {
        if(gameOver){
            return;
        }
        for (let i = 0; i < letters.length; i++) {
            if (letters[i].letter === pressedKey) {
                score++;
                speed += 0.1; // Increase speed
                letters.splice(i, 1); // Remove the letter
                break;
            }
        }
        scoreElement.textContent = score;
    }

    function createLetter() {
        const letter = alphabet[Math.floor(Math.random() * alphabet.length)];
        const x = Math.random() * (canvas.width - 30); // Random X position
        const y = 0;
        const letterObj = { letter, x, y };
        letters.push(letterObj);
    }

    //display the new highscore message if the player's current score is greater then the previous scores
    function displayHighScore(){
        let highestScore=Math.max(...storeScore);//taking the maximum score from the storeScore array
        if(score>highestScore){
            let highScore=document.getElementById("highScore");
            highScore.style.display="block";
        }
    };
    function restartGame(){
        //reseting the game to it's initial state
        score=0;
        speed=1;
        gameOver=false;
        letters=[];
        let gameScore=document.getElementById("currentScore");
        let gameOverMessage=document.querySelector(".gameOver");
        let highScore=document.getElementById("highScore");
        gameScore.style.display='none';
        gameOverMessage.style.display='none';
        highScore.style.display='none';
        scoreKeep.style.display='block';
        scoreElement.textContent='0';
         // Clear any existing click event listener
        window.removeEventListener('click',restartGame);
        //restarting the game process all over again
        createLetter();
        draw();
        displayHighScore();
    };
    function draw() {
        if(gameOver){
            return;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "24px Arial";
        for (let i = 0; i < letters.length; i++) {
            const letterObj = letters[i];
            ctx.fillText(letterObj.letter, letterObj.x, letterObj.y);
            letterObj.y += speed; // Move the letter down

            //Gameover condition: if a letter touch the bottom of the canvas set gameover to true
            if(letterObj.y>=canvas.height){
                gameOver=true;
                displayHighScore();
                letters=[];
                //things to be done if gameover=true
                let gameScore=document.getElementById("currentScore");
                let gameOverMessage=document.querySelector(".gameOver");
                gameOverMessage.style.display="block";
                scoreKeep.style.display="none";
                gameScore.style.display="inline-block";
                gameScore.textContent=score;//displaying the players current score when game is over
                storeScore.push(score);
                // console.log(storeScore);
                window.addEventListener('click',restartGame);
            };
        }
        requestAnimationFrame(draw);
    }
    draw(); // Start the game loop
});

document.addEventListener("DOMContentLoaded", () => {
    const gameContainer = document.querySelector(".game-container");
    const character = document.getElementById("character");
    const scoreDisplay = document.getElementById("score");
    
    let characterX = 100;
    let characterY = 100;
    let jumpHeight = 150;
    let gravity = 5;
    let isJumping = false;
    let score = 0;
    let obstacleInterval;
    let isGameRunning = true;

    // د جمپ کولو سیستم
    function jump() {
        if (!isJumping) {
            isJumping = true;
            let jumpCount = 0;

            const jumpInterval = setInterval(() => {
                if (jumpCount >= jumpHeight) {
                    clearInterval(jumpInterval);
                    fall();
                } else {
                    jumpCount += 5;
                    character.style.bottom = `${characterY + jumpCount}px`;
                }
            }, 20);
        }
    }

    // د غورځېدو سیستم
    function fall() {
        let fallCount = 0;

        const fallInterval = setInterval(() => {
            if (fallCount >= jumpHeight || characterY + fallCount <= 100) {
                clearInterval(fallInterval);
                isJumping = false;
            } else {
                fallCount += gravity;
                character.style.bottom = `${characterY + jumpHeight - fallCount}px`;
            }
        }, 20);
    }

    // د خنډونو جوړول
    function createObstacle() {
        const obstacle = document.createElement("div");
        obstacle.classList.add("obstacle");
        obstacle.style.left = `${window.innerWidth}px`;
        gameContainer.appendChild(obstacle);

        let obstacleX = window.innerWidth;

        const obstacleMove = setInterval(() => {
            if (!isGameRunning) {
                clearInterval(obstacleMove);
                obstacle.remove();
                return;
            }

            obstacleX -= 5;
            obstacle.style.left = `${obstacleX}px`;

            // ټکر معلومول
            if (
                obstacleX < characterX + 60 &&
                obstacleX + 50 > characterX &&
                parseInt(character.style.bottom) < 150
            ) {
                endGame();
            }

            if (obstacleX <= 0) {
                score++;
                scoreDisplay.textContent = `Score: ${score}`;
                clearInterval(obstacleMove);
                obstacle.remove();
            }
        }, 20);
    }

    // د لوبې پای
    function endGame() {
        isGameRunning = false;
        alert(`Game Over! Score: ${score}`);
        location.reload();
    }

    // د کلیک کولو سره جمپ کول
    gameContainer.addEventListener("click", () => {
        if (isGameRunning) {
            jump();
        }
    });

    // هر 2 ثانیو کې یو خنډ جوړول
    obstacleInterval = setInterval(() => {
        if (isGameRunning) {
            createObstacle();
        }
    }, 2000);
});
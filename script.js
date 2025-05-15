document.addEventListener("DOMContentLoaded", () => {
    const character = document.getElementById("character");
    const gameContainer = document.querySelector(".game-container");
    const scoreDisplay = document.getElementById("score");
    
    let positionX = 100;
    let isJumping = false;
    let score = 0;

    // حرکت
    function moveCharacter() {
        positionX += 3;
        if (positionX > window.innerWidth - 100) {
            positionX = 100;
        }
        character.style.left = `${positionX}px`;
        requestAnimationFrame(moveCharacter);
    }
    moveCharacter();

    // جمپ
    window.addEventListener("keydown", (e) => {
        if (e.key === " " && !isJumping) {
            jump();
        }
    });

    function jump() {
        isJumping = true;
        let jumpHeight = 0;
        const jumpInterval = setInterval(() => {
            if (jumpHeight >= 120) {
                clearInterval(jumpInterval);
                let fallInterval = setInterval(() => {
                    if (jumpHeight <= 0) {
                        clearInterval(fallInterval);
                        isJumping = false;
                    }
                    jumpHeight -= 5;
                    character.style.bottom = `${100 + jumpHeight}px`;
                }, 20);
            }
            jumpHeight += 5;
            character.style.bottom = `${100 + jumpHeight}px`;
        }, 20);
    }

    // خنډونه رامنځته کول
    function createObstacle() {
        const obstacle = document.createElement("div");
        obstacle.classList.add("obstacle");
        obstacle.style.left = `${window.innerWidth}px`;
        gameContainer.appendChild(obstacle);

        let obstaclePosition = window.innerWidth;
        const obstacleInterval = setInterval(() => {
            obstaclePosition -= 5;
            obstacle.style.left = `${obstaclePosition}px`;

            // ټکر معلومول
            if (
                obstaclePosition < positionX + 80 &&
                obstaclePosition + 50 > positionX &&
                character.offsetTop + character.offsetHeight > obstacle.offsetTop
            ) {
                alert("Game Over! Score: " + score);
                location.reload();
                clearInterval(obstacleInterval);
            }

            if (obstaclePosition < 0) {
                score++;
                scoreDisplay.textContent = `Score: ${score}`;
                obstacle.remove();
                clearInterval(obstacleInterval);
            }
        }, 20);
    }

    setInterval(createObstacle, 2000); // هر دوه ثانیې وروسته نوی خنډ جوړوه
});
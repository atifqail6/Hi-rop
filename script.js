document.addEventListener("DOMContentLoaded", () => {
    const character = document.getElementById("character");
    const gameContainer = document.querySelector(".game-container");
    const scoreDisplay = document.getElementById("score");
    const energyBar = document.getElementById("energy-bar");
    
    let positionX = 100;
    let velocity = 5;
    let jumpHeight = 120;
    let isJumping = false;
    let isBoosting = false;
    let score = 0;
    let energy = 100;

    // حرکت کنټرول
    window.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") positionX -= velocity;
        if (e.key === "ArrowRight") positionX += velocity;
        if (e.key === " " && !isJumping) jump();
        if (e.key === "Shift" && energy > 0) boost();
    });

    window.addEventListener("keyup", (e) => {
        if (e.key === "Shift") isBoosting = false;
    });

    function jump() {
        isJumping = true;
        let jumpCount = 0;

        const jumpInterval = setInterval(() => {
            if (jumpCount > jumpHeight) {
                clearInterval(jumpInterval);
                let fallInterval = setInterval(() => {
                    if (jumpCount <= 0) {
                        clearInterval(fallInterval);
                        isJumping = false;
                    }
                    jumpCount -= 5;
                    character.style.bottom = `${100 + jumpCount}px`;
                }, 20);
            }
            jumpCount += 5;
            character.style.bottom = `${100 + jumpCount}px`;
        }, 20);
    }

    function boost() {
        isBoosting = true;
        let boostInterval = setInterval(() => {
            if (!isBoosting || energy <= 0) {
                clearInterval(boostInterval);
            }
            positionX += 10;
            energy -= 2;
            updateEnergyBar();
        }, 50);
    }

    function updateEnergyBar() {
        const innerBar = energyBar.querySelector(".inner");
        innerBar.style.width = `${energy}%`;
    }

    function createObstacle() {
        const obstacle = document.createElement("div");
        obstacle.classList.add("obstacle");
        obstacle.style.left = `${window.innerWidth}px`;
        obstacle.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        gameContainer.appendChild(obstacle);

        let obstaclePosition = window.innerWidth;
        const speed = Math.random() * 5 + 3;

        const obstacleInterval = setInterval(() => {
            obstaclePosition -= speed;
            obstacle.style.left = `${obstaclePosition}px`;

            if (
                obstaclePosition < positionX + 80 &&
                obstaclePosition + 50 > positionX &&
                !isJumping &&
                parseInt(character.style.bottom) <= 100
            ) {
                alert(`Game Over! Score: ${score}`);
                location.reload();
            }

            if (obstaclePosition < 0) {
                score++;
                scoreDisplay.textContent = `Score: ${score}`;
                obstacle.remove();
                clearInterval(obstacleInterval);
            }
        }, 20);
    }

    setInterval(() => {
        if (energy < 100) energy += 1;
        updateEnergyBar();
    }, 100);

    setInterval(createObstacle, 1500);
});
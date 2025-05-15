document.addEventListener("DOMContentLoaded", () => {
    const character = document.getElementById("character");
    let direction = 1;
    let positionX = 0;

    setInterval(() => {
        positionX += 5 * direction;

        if (positionX > window.innerWidth - 80 || positionX < 0) {
            direction *= -1;
        }

        character.style.left = `${positionX}px`;
    }, 30);
});

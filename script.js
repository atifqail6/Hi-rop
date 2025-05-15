document.addEventListener("DOMContentLoaded", () => {
    const character = document.getElementById("character");
    let positionX = 50;
    let direction = 1;

    function moveCharacter() {
        // حرکت زیاتول
        positionX += 2 * direction;

        // که چپ یا ښي څنډې ته ورسېد، نو بېرته په مقابل لور ته حرکت وکړي
        if (positionX >= window.innerWidth - 80 || positionX <= 0) {
            direction *= -1;
        }

        // کرکټر ته نوې موقعیت ورکړه
        character.style.left = `${positionX}px`;

        requestAnimationFrame(moveCharacter);
    }

    // حرکت پیل کړه
    moveCharacter();
});
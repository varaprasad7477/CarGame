const gameArea = document.querySelector('.gameArea');

let player = {
    speed: 5,
    x: 125,
    y: 400
};

let keys = {
    ArrowLeft: false,
    ArrowRight: false
};

document.addEventListener('keydown', e => keys[e.key] = true);
document.addEventListener('keyup', e => keys[e.key] = false);

function startGame() {
    gameArea.innerHTML = "";

    let car = document.createElement('div');
    car.classList.add('car');
    gameArea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    for (let i = 0; i < 3; i++) {
        let enemy = document.createElement('div');
        enemy.classList.add('enemy');
        enemy.style.top = (i * -200) + "px";
        enemy.style.left = Math.floor(Math.random() * 250) + "px";
        gameArea.appendChild(enemy);
    }

    window.requestAnimationFrame(playGame);
}

function playGame() {
    let car = document.querySelector('.car');
    let enemies = document.querySelectorAll('.enemy');

    if (keys.ArrowLeft && player.x > 0) {
        player.x -= player.speed;
    }
    if (keys.ArrowRight && player.x < 250) {
        player.x += player.speed;
    }

    car.style.left = player.x + "px";

    enemies.forEach(enemy => {
        let enemyTop = enemy.offsetTop + 5;
        enemy.style.top = enemyTop + "px";

        if (enemyTop > 500) {
            enemy.style.top = "-100px";
            enemy.style.left = Math.floor(Math.random() * 250) + "px";
        }

        if (isCollide(car, enemy)) {
            alert("Game Over!");
            startGame();
        }
    });

    window.requestAnimationFrame(playGame);
}

function isCollide(a, b) {
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();

    return !(
        aRect.bottom < bRect.top ||
        aRect.top > bRect.bottom ||
        aRect.right < bRect.left ||
        aRect.left > bRect.right
    );
}

startGame();

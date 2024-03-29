const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Player
const player = {
    x: 50,
    y: canvas.height - 30,
    width: 20,
    height: 20,
    color: 'blue',
    speed: 5,
};

// Obstacles
const obstacles = [];

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawObstacles() {
    for (const obstacle of obstacles) {
        ctx.fillStyle = obstacle.color;
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    }
}

function updateObstacles() {
    if (Math.random() < 0.02) {
        const obstacle = {
            x: canvas.width,
            y: canvas.height - 30,
            width: 20,
            height: 20,
            color: 'red',
            speed: 5,
        };
        obstacles.push(obstacle);
    }

    for (const obstacle of obstacles) {
        obstacle.x -= obstacle.speed;

        if (obstacle.x + obstacle.width < 0) {
            obstacles.shift(); // Remove off-screen obstacles
        }

        // Collision detection
        if (
            player.x < obstacle.x + obstacle.width &&
            player.x + player.width > obstacle.x &&
            player.y < obstacle.y + obstacle.height &&
            player.y + player.height > obstacle.y
        ) {
            alert('Game Over!');
            resetGame();
        }
    }
}

function resetGame() {
    player.x = 50;
    player.y = canvas.height - 30;
    obstacles.length = 0; // Clear obstacles array
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPlayer();
    drawObstacles();
    updateObstacles();

    // Move player
    window.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowUp' && player.y > 0) {
            player.y -= player.speed;
        } else if (e.key === 'ArrowDown' && player.y < canvas.height - player.height) {
            player.y += player.speed;
        }
    });

    requestAnimationFrame(gameLoop);
}

gameLoop();

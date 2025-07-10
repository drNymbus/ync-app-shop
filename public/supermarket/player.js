let player = {
    x: 0, y: 0,
    targetX: 0, targetY: 0,
    speed: 0,

    angle: 0,
    direction: 0,
    rotation: 0
};

function rotatePlayer() {
    player.angle = (player.angle + player.rotation);

    if (player.angle <= 0) {
        player.angle += 2*PI;
    } else if (player.angle >= 2*PI) {
        player.angle -= 2*PI;
    }

    if (abs(player.angle - player.direction) < abs(player.rotation)) {
        player.rotation = 0;
        player.angle = player.direction;
    }
}

function movePlayer() {
    player.x = (player.x + (cos(player.angle) * player.speed)) % (MAP_WIDTH*CELL_SIZE);
    if (player.x <= 0) {
        player.x += MAP_WIDTH*CELL_SIZE;
    }

    if (abs(player.x - player.targetX) < abs(player.speed)) {
        player.x = player.targetX;
    }

    player.y = (player.y + (sin(player.angle) * player.speed)) % (MAP_HEIGHT*CELL_SIZE);
    if (player.y <= 0) {
        player.y += MAP_HEIGHT*CELL_SIZE;
    }

    if (abs(player.y - player.targetY) < abs(player.speed)) {
        player.y = player.targetY;
    }

    if (player.x === player.targetX && player.y === player.targetY) {
        player.speed = 0;
    }
}

function updatePlayer() {
    if (player.angle !== player.direction) { rotatePlayer(); }
    if (player.x !== player.targetX || player.y !== player.targetY) {
        movePlayer();
    }
}

function isPlayerInShelfX() {
    const cellX = floor(player.x / CELL_SIZE);
    const cellY = floor(player.y / CELL_SIZE);

    const mCellX = (cellX - 1) < 0 ? MAP_WIDTH-1 : cellX-1;
    const pCellX = (cellX + 1) % MAP_WIDTH;

    return (map[cellY][mCellX] === 1 && map[cellY][pCellX] === 1);
}

function isPlayerInShelfY() {
    const cellX = floor(player.x / CELL_SIZE);
    const cellY = floor(player.y / CELL_SIZE);

    const mCellY = ((cellY + MAP_HEIGHT) % MAP_HEIGHT) - 1;
    const pCellY = (cellY + 1) % MAP_HEIGHT;

    return (map[mCellY][cellX] === 1 && map[pCellY][cellX] === 1);
}

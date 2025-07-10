function handleInput() {
    if (player.speed === 0 && luc.state === "HIDDEN") {
        if (keyIsDown(LEFT_ARROW) && (player.rotation === 0 || player.rotation > 0)) {
            player.rotation = -PLAYER_ROTATION_SPEED;
            if (player.direction === 0) { player.direction = 2*PI; }
            player.direction = (player.direction - HALF_PI) % (2*PI);

            luc.nextAppearance--;
        }

        if (keyIsDown(RIGHT_ARROW) && (player.rotation === 0 || player.rotation < 0)) {
            player.rotation = PLAYER_ROTATION_SPEED;
            if (player.direction === 2*PI) { player.direction = 0; }
            player.direction = (player.direction + HALF_PI) % (2*PI);

            luc.nextAppearance--;
        }
    }

    if (player.rotation === 0 && luc.state === "HIDDEN") {
        let cellX = floor(player.x / CELL_SIZE);
        let cellY = floor(player.y / CELL_SIZE);

        if (keyIsDown(UP_ARROW) && (player.speed === 0 || player.speed < 0)) {
            let dx = cos(player.angle) > 0 ? 1 : -1;
            let dy = sin(player.angle) > 0 ? 1 : -1;
            if (player.angle % PI === 0) {
                cellX = (cellX + dx) % MAP_WIDTH;
                if (cellX < 0) { cellX += MAP_WIDTH; }
            } else if (player.angle % HALF_PI === 0) {
                cellY = (cellY + dy) % MAP_HEIGHT;
                if (cellY < 0) { cellY += MAP_HEIGHT; }
            }

            if (map[cellY][cellX] === 0) {
                player.speed = PLAYER_SPEED;
                player.targetX = cellX * CELL_SIZE + CELL_SIZE/2;
                player.targetY = cellY * CELL_SIZE + CELL_SIZE/2;
            }

            luc.nextAppearance--;
        }

        if (keyIsDown(DOWN_ARROW) && (player.speed === 0 || player.speed > 0)) {
            let dx = cos(player.angle) > 0 ? -1 : 1;
            let dy = sin(player.angle) > 0 ? -1 : 1;
            if (player.angle % PI === 0) {
                cellX = (cellX + dx) % MAP_WIDTH;
                if (cellX < 0) { cellX += MAP_WIDTH; }
            } else if (player.angle % HALF_PI === 0) {
                cellY = (cellY + dy) % MAP_HEIGHT;
                if (cellY < 0) { cellY += MAP_HEIGHT; }
            }

            if (map[cellY][cellX] === 0) {
                player.speed = -PLAYER_SPEED;
                player.targetX = cellX * CELL_SIZE + CELL_SIZE/2;
                player.targetY = cellY * CELL_SIZE + CELL_SIZE/2;
            }

            luc.nextAppearance--;
        }
    }
}

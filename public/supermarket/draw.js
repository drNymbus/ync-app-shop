function drawWall(x, y) {
    texture(wallTexture);

    const position = CELL_SIZE/2;

    push();
    translate(0, 0, -position);
    plane(CELL_SIZE, CELL_SIZE);
    pop();

    push();
    translate(0, 0, position);
    rotateY(PI);
    plane(CELL_SIZE, CELL_SIZE);
    pop();

    push();
    translate(position, 0, 0);
    rotateY(HALF_PI);
    plane(CELL_SIZE, CELL_SIZE);
    pop();

    push();
    translate(-position, 0, 0);
    rotateY(-HALF_PI);
    plane(CELL_SIZE, CELL_SIZE);
    pop();
}

function drawFloor(x, y) {
    texture(floorTexture);

    push();
    rotateX(HALF_PI);
    plane(CELL_SIZE, CELL_SIZE);
    pop();
}

function drawCeiling(x, y) {
    texture(ceilingTexture);

    push();
    translate(0, -CELL_SIZE, 0);
    rotateX(HALF_PI);
    plane(CELL_SIZE, CELL_SIZE);
    pop();
}

function drawMap() {
    for (let y = 0; y < MAP_HEIGHT+OFFSET; y++) {
        for (let x = 0; x < MAP_WIDTH+OFFSET; x++) {
            if (map[y%MAP_HEIGHT][x%MAP_WIDTH] === 1) {
                push();
                translate(x * CELL_SIZE + CELL_SIZE/2, 0, y * CELL_SIZE + CELL_SIZE/2);
                drawWall(x, y);
                pop();
            } else {
                push();
                translate(x * CELL_SIZE + CELL_SIZE/2, CELL_SIZE/2, y * CELL_SIZE + CELL_SIZE/2);
                drawFloor(x, y);
                drawCeiling(x, y);
                pop();
            }
        }
    }
}

function drawBorder() {
    const position = CELL_SIZE/2;
    texture(borderTexture);

    let x, y;
    for (let y = 0; y < MAP_HEIGHT+OFFSET; y++) {
        x = -1;
        push();
        translate(x * CELL_SIZE + CELL_SIZE/2, 0, y * CELL_SIZE + CELL_SIZE/2);
        translate(position, 0, 0);
        rotateY(HALF_PI);
        plane(CELL_SIZE, CELL_SIZE);
        pop();
        x = MAP_WIDTH+OFFSET;
        push();
        translate(x * CELL_SIZE + CELL_SIZE/2, 0, y * CELL_SIZE + CELL_SIZE/2);
        translate(-position, 0, 0);
        rotateY(-HALF_PI);
        plane(CELL_SIZE, CELL_SIZE);
        pop();
    }

    for (let x = 0; x < MAP_WIDTH+OFFSET; x++) {
        y = -1;
        push();
        translate(x * CELL_SIZE + CELL_SIZE/2, 0, y * CELL_SIZE + CELL_SIZE/2);
        translate(0, 0, position);
        plane(CELL_SIZE, CELL_SIZE);
        pop();
        y = MAP_HEIGHT+OFFSET;
        push();
        translate(x * CELL_SIZE + CELL_SIZE/2, 0, y * CELL_SIZE + CELL_SIZE/2);
        translate(0, 0, -position);
        rotateY(PI);
        plane(CELL_SIZE, CELL_SIZE);
        pop();
    }
}

function drawLuc() {
    push();
    translate((OFFSET/2) * CELL_SIZE, 0, (OFFSET/2) * CELL_SIZE);
    translate(luc.x, (CELL_SIZE/2 - luc.height/2) + luc.z, luc.y);
    rotateY(3*HALF_PI - player.angle);
    rotateZ(luc.r);
    texture(lucTexture);
    plane(luc.width, luc.height - luc.z);

    push();
    fill(0);
    translate(0, -luc.height/3, 0);
    text(luc.says, 0, 0);
    pop();

    pop();
}

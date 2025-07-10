function preload() {
    borderTexture = loadImage('assets/border.png')
    wallTexture = loadImage('assets/shelf_3.png')
    floorTexture = loadImage('assets/floor.png')
    ceilingTexture = loadImage('assets/ceiling.png')
    lucTexture = loadImage('assets/wide_spidey.png');

    font = loadFont("assets/Minecraft.ttf")
}

function setup() {
    // createCanvas(windowWidth/3, windowHeight/3, WEBGL);
    createCanvas(1000, 1000, WEBGL);
    noStroke();

    frameRate(FRAME_PER_TICK);

    const FOV_Y = 2 * atan(windowHeight / 2 / 800);
    const ASPECT = windowWidth / windowHeight;
    const NEAR = 0.1;
    perspective(FOV_Y, ASPECT, NEAR);

    textFont(font);
    textSize(1);
    textAlign(CENTER);

    player.x = (map[0].length/2-1) * CELL_SIZE + CELL_SIZE/2;
    player.targetX = player.x;
    player.y = (map.length/2) * CELL_SIZE + CELL_SIZE/2;
    player.targetY = player.y;

    player.angle = HALF_PI;
    player.direction = player.angle;
}

function draw() {
    background(0);

    handleInput();
    updatePlayer();

    camera(
        0,0,0,
        cos(player.angle), 0, sin(player.angle),
        0,1,0
    );
    translate(-(OFFSET/2) * CELL_SIZE, 0, -(OFFSET/2) * CELL_SIZE);
    translate(-player.x, 0, -player.y);

    drawMap();
    drawBorder();

    if (luc.state === "HIDDEN" && luc.nextAppearance < 0 && (player.x % (CELL_SIZE/2) === 0 && player.y % (CELL_SIZE/2) === 0)) {
        let inShelf, look;
        if (player.angle % PI === 0) {
            inShelf = isPlayerInShelfY();
            look = (cos(player.angle) === 1 || cos(player.angle) === -1);
        } else if (player.angle % HALF_PI === 0) {
            inShelf = isPlayerInShelfX();
            look = (sin(player.angle) === 1 || sin(player.angle) === -1);
        }

        const gone = (!luc.lastTime && luc.nextTime.length === 0);
        console.log(gone);
        if (inShelf && look && !gone) { peakingLuc(); }
    }

    updateLuc();
    if (luc.state !== "HIDDEN") {
        drawLuc();
    }
}

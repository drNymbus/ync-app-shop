let luc = {
    state: "HIDDEN",
    wait: 0,
    nextAppearance: 50,

    firstTime: true,
    nextTime: [...Array(dialogue.length).keys()],
    lastTime: false,

    width: CELL_SIZE * 3/4,
    height: CELL_SIZE * 3/4,

    x: 0, y: 0, z: 0,
    targetX: 0, targetY: 0, targetZ: 0,
    speed: 0,

    r: 0,
    targetR: 0,
    rotationSpeed: 0,

    dialogue: [""],
    says: "",
    talking: 0,
    sentence: 0,
    breath: 0
};

function peakingLuc() {
    luc.state = "PEAKING";
    luc.wait = 20;

    let cellX = floor(player.x / CELL_SIZE);
    let cellY = floor(player.y / CELL_SIZE);

    if (player.direction % PI === 0) {
        const dx = cos(player.direction) * 3;
        luc.x = (cellX + dx) * CELL_SIZE;
        luc.targetX = luc.x;

        luc.y = (cellY - 1) * CELL_SIZE + CELL_SIZE/2;
        luc.targetY = luc.y + CELL_SIZE/2;

        luc.r = cos(player.direction) * 0.6;
        luc.targetR = luc.r;
    } else if (player.direction % HALF_PI === 0) {
        const dy = sin(player.direction) * 3;
        luc.y = (cellY + dy) * CELL_SIZE;
        luc.targetY = luc.y;

        luc.x = (cellX - 1) * CELL_SIZE + CELL_SIZE/2;
        luc.targetX = luc.x + CELL_SIZE/2;

        luc.r = -sin(player.direction) * 0.6;
        luc.targetR = luc.r;
    }

    luc.speed = PLAYER_SPEED;
}

function appearingLuc() {
    luc.state = "APPEARING";
    luc.wait = 20;

    luc.targetR = 0;
    if (player.direction % PI === 0) {
        luc.targetY = player.y;
        luc.rotationSpeed = -cos(player.angle) * PLAYER_ROTATION_SPEED;
    } else if (player.direction % HALF_PI === 0) {
        luc.targetX = player.x;
        luc.rotationSpeed = sin(player.angle) * PLAYER_ROTATION_SPEED;
    }
}

function movingLuc() {
    luc.state = "MOVING";
    luc.wait = 20;

    if (player.direction % PI === 0) {
        luc.targetX = player.x + (cos(player.direction) * CELL_SIZE/2);
        luc.speed = -cos(player.direction) * PLAYER_SPEED * 2;
    } else if (player.direction % HALF_PI === 0) {
        luc.targetY = player.y + (sin(player.direction) * CELL_SIZE/2);
        luc.speed = -sin(player.direction) * PLAYER_SPEED * 2; }
}

function talkingLuc() {
    luc.state = "TALKING";
    luc.wait = 50;

    if (luc.firstTime) {
        luc.dialogue = first_dialogue;
        luc.firstTime = false;
    } else if (luc.nextTime.length > 0) {
        const i = floor(random(0, luc.nextTime.length));
        luc.dialogue = dialogue[luc.nextTime[i]];
        luc.nextTime[i] = undefined;
        luc.nextTime = luc.nextTime.filter((x) => x !== undefined);
        if (luc.nextTime.length == 0) { luc.lastTime = true; }
    } else if (luc.lastTime) {
        luc.dialogue = last_dialogue;
        luc.lastTime = false;
    }

    luc.sentence = 0;
    luc.talking = 0;
    luc.says = "";
}

function disappearingLuc() {
    luc.state = "DISAPPEARING";
    luc.wait = 20;

    let cellX = floor(player.x / CELL_SIZE);
    let cellY = floor(player.y / CELL_SIZE);

    if (player.direction % PI === 0) {
        luc.targetY = luc.y + CELL_SIZE;
    } else if (player.direction % HALF_PI === 0) {
        luc.targetX = luc.x + CELL_SIZE;
    }
    luc.speed = PLAYER_SPEED;
}

function updateLucPosition() {
    if ((luc.x !== luc.targetX || luc.y !== luc.targetY) && luc.state !== "PEAKING") {
        luc.z = -luc.z;
        if (luc.z === 0) { luc.z = 1; }
    }

    if (luc.x !== luc.targetX) { luc.x += luc.speed; }
    if (abs(luc.x - luc.targetX) < abs(luc.speed)) { luc.x = luc.targetX; }

    if (luc.y !== luc.targetY) { luc.y += luc.speed; }
    if (abs(luc.y - luc.targetY) < abs(luc.speed)) { luc.y = luc.targetY; }

    if (luc.r !== luc.targetR) { luc.r += luc.rotationSpeed; }
    if (abs(luc.r - luc.targetR) < abs(luc.rotationSpeed)) { luc.r = luc.targetR; }
}

function updateLucTalking() {
    if (luc.talking < luc.dialogue[luc.sentence].length) {
        luc.talking++;
        luc.says = luc.dialogue[luc.sentence].slice(0, luc.talking);
    } else {
        if (luc.breath < PAUSE_SPEED) {
            luc.breath++;
        } else if (luc.sentence < luc.dialogue.length-1) {
            luc.sentence++;
            luc.talking = 0;
            luc.breath = 0;
        }
    }
}

function updateLuc() {
    let nextState = false;
    updateLucPosition();
    nextState = (luc.x === luc.targetX && luc.y === luc.targetY && luc.r === luc.targetR);

    if (luc.state === "TALKING") {
        updateLucTalking();
        nextState = nextState && (luc.sentence === luc.dialogue.length-1 && luc.talking === luc.dialogue[luc.sentence].length);
    }


    if (nextState) {
        luc.z = 0;
        if (luc.wait <= 0) {
            if (luc.state === "PEAKING") {
                appearingLuc();
            } else if (luc.state === "APPEARING") {
                movingLuc();
            } else if (luc.state === "MOVING") {
                talkingLuc();
            } else if (luc.state === "TALKING") {
                luc.dialogue = [""];
                luc.sentence = 0;
                luc.breath = 0;
                luc.says = "";
                disappearingLuc();
            } else if (luc.state === "DISAPPEARING") {
                luc.state = "HIDDEN";
                luc.nextAppearance = 15;
            }
        } else { luc.wait--; }
    }
}

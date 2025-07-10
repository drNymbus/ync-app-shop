const FRAME_PER_TICK = 30;

const MAP_WIDTH = 4;
const MAP_HEIGHT = 6;
const OFFSET = 4;

const CELL_SIZE = 32;

const PLAYER_SPEED = CELL_SIZE/(FRAME_PER_TICK);
const PLAYER_ROTATION_SPEED = 0.05;

const PAUSE_SPEED = 25;

let map = [];

let shelf = [];
let flooring = [];
for (let i = 0; i < MAP_WIDTH; i++) {
    if (i % 2 == 0) {
        shelf.push(0);
    } else { shelf.push(1); }
    flooring.push(0);
}

for (let i = 0; i < MAP_HEIGHT; i++) {
    if (i % 2 == 0) {
        map.push(shelf);
    } else { map.push(flooring); }
}

const first_dialogue = ["mais nan ! arrete !", "t'existe pour de vrai?", "ca faisait longtemps que j'avais pas vu quelqu'un ici.", "au plaisir, hein !", "le rayon des surgeles est pas mal ici"];

const dialogue = [
    ["t'espere voir un truc ici ?", "aaaah, t'es la pour l'oeuf de paque chui sur", "perso j'ai encore rien vu", "cherche pas trop tu vas avoir mal a la tete apres", "aller a plus le reuf"],
    ["wesh", "ca vient d'ou ?", "viens on va la bas"],
    ["t'es vraiment un fouine a rester la", "en vrai de vrai t'as tout vu la", "je te jure il y a pas plus", "azy, j'vais voir si il reste des cartes pokemons"],
    ["tu joues a Tap Force ?", "dinguerie ce jeu, tema les musiques !", "vas y regarde les perso est dis moi qui t'aimerai etre", "Ruby ? Woah moi aussi je l'aime trop", "je pense je suis un gars des feux d'artifices au fond", "j'adore quand ca explose de partout"],
    ["quoi ? ce qu'il y a dans les rayons ?", "aucune idee, t'as cru que je bossais ici ou quoi ?", "de temps en temps ils mettent des nouvelles cartes pokemons", "du coup je reste ici", "la ca fait trois heures que je cherche et je trouve pas", "oh ! attend c'est quoi ca ?"]
];

const last_dialogue = [
    "bon y'a ma maman qui m'appelle",
    "elle a besoin d'aide pour rentrer les courses",
    "tu viens souvent ici ?",
    "bon desole faut vraiment que j'y aille",
    "si jamais ca t'interesse",
    "il parait qu'il y a une promo sur les pantoufles ync",
    "aller, profite bien ! gros kiffeur que tu es !"
];

let borderTexture;
let wallTexture;
let floorTexture;
let ceilingTexture;
let lucTexture;

function createPlaceholderTexture(w, h, clr) {
    let texture = createGraphics(w, h);
    texture.background(clr[0], clr[1], clr[2]);

    texture.stroke(clr[0] + 30, clr[1] + 30, clr[2] + 30, 100);
    texture.strokeWeight(1);
    for (let i = 0; i < w; i += w/8) { texture.line(i, 0, i, h); }
    for (let i = 0; i < h; i += h/8) { texture.line(0, i, w, i); }

    return texture;
}

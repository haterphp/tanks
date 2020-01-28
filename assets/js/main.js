import {Game} from './modules/game.js';
import {Map} from "./modules/map.js";
import {getMap} from "../storage/map.js";
import {Player} from "./modules/player.js";


let app = {
    zone: $('.elements'),
    zoneSize:{
        w: 0,
        h: 0
    },
    elements: [],
    game: null,
    player: null,
    map: getMap(0),
    objectSize: 0,
    positionPlayer: null
}

let map = new Map().generateMap(app.map)

app.game = new Game(app);
app.game.loop();
app.player = app.game.generate(Player, app.elements);

console.log(app.positionPlayer);

export {app};


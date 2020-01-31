import {Game} from './modules/game.js';
import {Map} from "./modules/map.js";
import {getMap} from "../storage/map.js";
import {Player} from "./modules/player.js";


let app = {
    zone: $('.elements'),
    zoneSize: {
        w: 0,
        h: 0
    },
    elements: [],
    game: null,
    player: null,
    mapNumber: getMap(0),
    map: [],
    objectSize: 0,
    positionPlayer: null
}

let map = new Map()
map.generateMap(app.mapNumber)

app.game = new Game();
setTimeout(() => {

    map.update();

    app.positionPlayer = app.map.find(item => item.typeBlock === 5);
    app.player = app.game.generate(Player, app.elements);

    app.game.loop();
    console.log(app.elements);
}, 200)


export {app};


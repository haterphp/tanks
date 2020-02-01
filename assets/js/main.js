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
    positionPlayer: null,
    pause: false,
    ended: false,
    positionSpawnEnemies: [],
    muchEnemies: 15,
    enemiesType: ['enemy']
}

let map = new Map()
map.generateMap(app.mapNumber)

app.game = new Game();
setTimeout(() => {

    map.update();

    app.positionSpawnEnemies = app.map.filter(item => item.typeBlock === 6);

    app.positionPlayer = app.map.find(item => item.typeBlock === 5);
    app.player = app.game.generate(Player, app.elements);

    app.game.loop();
    app.game.keyEvents();

    //console.log(app.elements);
}, 200)


export {app};


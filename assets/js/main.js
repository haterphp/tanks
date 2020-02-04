import {Game} from './modules/game.js';
import {Map} from "./modules/map.js";
import {getMap} from "../storage/map.js";
import {Player} from "./modules/player.js";
import {findElement} from "./modules/helper.js";

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
    mapInObject: [],
    map: [],
    objectSize: 0,
    positionPlayer: null,
    pause: false,
    ended: false,
    positionSpawnEnemies: [],
    muchEnemies: 1,
    enemiesType: ['enemy']
}

let map = new Map()
map.generateMap(app.mapNumber)

app.game = new Game();
setTimeout(() => {

    app.map.forEach(e=>{
        e.x = e.element.position().left;
        e.y = e.element.position().top;
        e.draw();
    });

    app.positionPlayer = app.map.find(item => item.typeBlock === 5);
    app.positionSpawnEnemies = app.map.filter(item => item.typeBlock === 6);

    app.player = app.game.generate(Player, app.elements);

    app.game.loop();
    app.game.keyEvents();


    console.log(app.mapInObject);
}, 200)


export {app};


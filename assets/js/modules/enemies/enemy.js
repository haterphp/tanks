import {Drawable} from "../drawable.js";
import {random} from "../helper.js";
import {app} from "../../main.js";
import {getMap} from "../../../storage/map.js";
import {findElement} from "../helper.js ";

export class Enemy extends Drawable {
    constructor() {
        super();

        this.w = this.h = app.objectSize - 5;
        this.numberPosition = random(0, 2);

        this.x = app.positionSpawnEnemies[this.numberPosition].x + 2.5;
        this.y = app.positionSpawnEnemies[this.numberPosition].y + 2.5;

        this.finishPosition = null;
        this.index = null;

        this.time = 0;

        this.paths = [
            {
                lastPosition: app.positionSpawnEnemies[this.numberPosition],
                nowPosition: app.positionSpawnEnemies[this.numberPosition],
                index: null,
                path: []
            }
        ];

        this.pathToPoint = null;

        this.createElement();
    }

    update() {
        this.finishPosition = app.player.positionOnBlock;
        if (this.time === 0) {
            for(let path of this.paths){
                for (let i = 0; i < getMap(0).length; i++) {
                    let value = app.mapInObject[i].findIndex(item => item === path.nowPosition.number);
                    if (value !== -1) {
                        path.index = {row: i, column: value};
                    }
                }
                console.log(path.index);
            }
        }
        this.time++;
        if (this.time === 60 * 3) {
            this.time = 0;
        }

        super.update();
    }
}
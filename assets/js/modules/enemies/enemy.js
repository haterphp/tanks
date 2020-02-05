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

                

        this.createElement();
    }

    update() {


        super.update();
    }
}
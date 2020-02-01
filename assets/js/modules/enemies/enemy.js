import {Drawable} from "../drawable.js";
import {random} from "../helper.js";
import {app} from "../../main.js";

export class Enemy extends Drawable{
    constructor(){
        super();

        this.w = this.h = app.objectSize - 5;
        this.numberPosition = random(0,2);
        console.log(this.numberPosition);
        this.x = app.positionSpawnEnemies[this.numberPosition].x + 2.5;
        this.y = app.positionSpawnEnemies[this.numberPosition].y + 2.5;

        this.path = [app.positionSpawnEnemies[this.numberPosition]];

        this.createElement();
    }

    update(){

        

        super.update();
    }
}
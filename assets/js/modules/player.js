import {Drawable} from "./drawable.js";
import {app} from "../main.js";


export class Player extends Drawable{
    constructor(){
        super();
        this.w = this.h = app.objectSize;
        this.x = app.positionPlayer.x;
        this.y = app.positionPlayer.y;
        this.createElement();
    }
}
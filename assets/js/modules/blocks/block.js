import {Drawable} from "../drawable.js";
import {app} from "../../main.js";


export class Block extends Drawable{
    constructor() {
        super();
        this.createElement(false);
        this.flag = true;
    }
    update(){
        this.x = this.element.position().left;
        this.y = this.element.position().top;
    }
}
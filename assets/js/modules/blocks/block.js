import {Drawable} from "../drawable.js";


export class Block extends Drawable{
    constructor() {
        super();
        this.createElement(false);
    }
    update(){
        this.x = this.element.position().left;
        this.y = this.element.position().top;
    }
}
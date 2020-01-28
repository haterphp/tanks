import {app} from "../main.js";

export class Drawable{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;

        this.offsets = {
            x:0,
            y:0
        }
    }

    createElement(flag = true){
        if (flag){
            this.element = $(`<div class="element ${this.constructor.name.toLowerCase()}"></div>`);
        }else{
            this.element = $(`<div class="${this.constructor.name.toLowerCase()}"></div>`);
        }
        app.zone.append(this.element);
    }

    update(){
        this.x += this.offsets.x;
        this.y += this.offsets.y;
    }

    draw(){
        this.element.css({
            left: this.x + 'px',
            top: this.y + 'px',
            width: this.w + 'px',
            height: this.h + 'px',
        })
    }

    removeElement(){
        this.element.remove();
    }

}
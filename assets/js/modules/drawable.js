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

    changeAnimation(animation){
        this.element.css({
            background: `url('assets/img/animations/${animation}')`,
            backgroundSize: '100% 100%'
        })
    }

    isCollision(element){
        let a = {
            x1: this.x,
            x2: this.x + this.w,
            y1: this.y,
            y2: this.y + this.h
        }
        let b = {
            x1: element.x,
            x2: element.x + element.w,
            y1: element.y,
            y2: element.y + element.h
        }

        return a.x1 < b.x2 && b.x1 < a.x2 && a.y1 < b.y2 && b.y1 < a.y2;
    }
}
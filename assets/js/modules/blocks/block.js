import {Drawable} from "../drawable.js";
import {app} from "../../main.js";


export class Block extends Drawable{
    constructor() {
        super();
        this.createElement(false);
        this.flag = true;
        this.lastDirection = null;
    }
    update() {
        if(['ground','tree'].includes(this.type)){
            return;
        }
        this.x = this.element.position().left;
        this.y = this.element.position().top;
        if (this.flag) {
            this.lastDirection = app.player.direction;
        }

        if (this.isCollision(app.player)) {
            this.flag = false;
            switch (this.lastDirection) {
                case 1:
                    if (app.player.keys.get('ArrowRight') === 'keydown') {
                        app.player.direction = 0;
                    }
                    break;
                case -1:
                    if (app.player.keys.get('ArrowLeft') === 'keydown') {
                        app.player.direction = 0;
                    }
                    break;
                case -2:
                    if (app.player.keys.get('ArrowDown') === 'keydown') {
                        app.player.direction = 0;
                    }
                    break;
                case 2:
                    if (app.player.keys.get('ArrowUp') === 'keydown') {
                        app.player.direction = 0;
                    }
                    break;
            }
        } else {
            this.flag = true;
        }
        super.update();
    }
}
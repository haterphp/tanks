import {Block} from './block.js'
import {app} from "../../main.js";


export class Brick extends Block {
    constructor(size) {
        super();
        this.w = this.h = size;
        this.flag = true;
        this.lastDirection = null;
    }

    update() {
        if(this.type !== 'brick'){
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
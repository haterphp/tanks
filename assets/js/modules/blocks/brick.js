import {Block} from './block.js'
import {app} from "../../main.js";


export class Brick extends Block {
    constructor(size) {
        super();
        this.w = this.h = size;
        this.flag = true;
    }

    update() {
        this.x = this.element.position().left;
        this.y = this.element.position().top;

        if (this.isCollision(app.player)) {
            app.player.events.set('BrickCollision',this);
        }
        super.update();
    }

}
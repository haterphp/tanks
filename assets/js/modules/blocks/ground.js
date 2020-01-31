import {Block} from './block.js'

export class Ground extends Block{
    constructor(size, data = null, flag =  false){
        super();
        this.w = this.h = size;
        if(flag){
            this.x = data.x;
            this.y = data.y;
            this.draw();
        }
    }
}
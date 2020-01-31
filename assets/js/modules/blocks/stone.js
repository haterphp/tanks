import {Block} from './block.js'

export class Stone extends Block{
    constructor(size){
        super();
        this.w = this.h = size;

    }
}
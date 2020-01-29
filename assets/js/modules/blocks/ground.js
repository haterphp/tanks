import {Block} from './block.js'

export class Ground extends Block{
    constructor(size){
        super();
        this.w = this.h = size;
    }
}
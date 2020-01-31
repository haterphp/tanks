import {Block} from './block.js'

export class Water extends Block{
    constructor(size){
        super();
        this.w = this.h = size;
    }
}
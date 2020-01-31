import {Block} from './block.js'

export class Tree extends Block{
    constructor(size){
        super();
        this.w = this.h = size;
    }
}
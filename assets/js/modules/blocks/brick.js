import {Block} from './block.js'

export class Brick extends Block{
    constructor(size){
        super();
        this.w = this.h = size;
    }
}
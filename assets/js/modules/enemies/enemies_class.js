import {Enemy} from "./enemy.js";

export class Basic extends Enemy{
    constructor(){
        super();
        this.speed = 1;
        this.health = 1;
    }
}

export class Fast extends Enemy{
    constructor(){
        super();
        this.speed = 3;
        this.health = 1;
    }
}

export class Power extends Enemy{
    constructor(){
       super();
       this.speed = 2;
       this.health = 1;
    }
}

export class Armor extends Enemy{
    constructor(){
        super();
        this.speed = 2;
        this.health = 4;
    }
}
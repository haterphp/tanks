import {Enemy} from "./enemy.js";

export class Basic extends Enemy{
    constructor(){
        super();
        this.speed = 1;
        this.health = 1;
        this.scoreMuch = 100;
    }
}

export class Fast extends Enemy{
    constructor(){
        super();
        this.speed = 3;
        this.health = 1;
        this.scoreMuch = 200;
    }
}

export class Power extends Enemy{
    constructor(){
       super();
       this.speed = 2;
       this.health = 1;
       this.scoreMuch = 300;
    }
}

export class Armor extends Enemy{
    constructor(){
        super();
        this.speed = 2;
        this.health = 4;
        this.scoreMuch = 400;
    }
}
import {Brick} from './blocks/brick.js'
import {Ground} from './blocks/ground.js'
import {app} from '../main.js'
import {Stone} from "./blocks/stone.js";
import {Water} from "./blocks/water.js";
import {Tree} from "./blocks/tree.js";

export class Map{
    changeImage(item){
        let el = [];
        switch (item) {
            case 0:
                el = new Ground(app.objectSize);
                return el;
            case 1:
                el = new Brick(app.objectSize);
                return el;
            case 2:
                el = new Stone(app.objectSize);
                return el;
            case 3:
                el = new Water(app.objectSize);
                return el;
            case 4:
                el = new Tree(app.objectSize);
                return el;
            case 5:
                el = new Ground(app.objectSize);
                return el;
            case 6:
                el = new Ground(app.objectSize);
                return el;
        }
    }

    generateMap(map){
        app.objectSize = app.zone.width() / map[0].length;
        let number = 0;
        for(let array of map){
            let arr = [];
            for(let block of array){
                let element = this.changeImage(block);
                element.typeBlock = block;
                element.number = number;
                arr.push(number);
                number++;
                if(![0,5,6,4].includes(block)){
                    app.elements.push(element);
                }
                app.map.push(element)
            }
            app.mapInObject.push(arr);
        }

    }
}
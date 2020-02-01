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
        for(let array of map){
            for(let block of array){
                let element = this.changeImage(block);
                element.typeBlock = block;
                if(![0,5,6].includes(block)){
                    app.elements.push(element);
                }
                app.map.push(element);
            }
        }

    }
    update(){
        for(let mapitem in app.map){
            app.map[mapitem].x = app.map[mapitem].element.position().left;
            app.map[mapitem].y = app.map[mapitem].element.position().top;

            app.map[mapitem].draw();
        }
    }
}
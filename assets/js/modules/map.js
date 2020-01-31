import {Brick} from './blocks/brick.js'
import {Ground} from './blocks/ground.js'
import {app} from '../main.js'
export class Map{
    changeImage(item){
        let el = [];
        switch (item) {
            case 0:
                el = new Ground(app.objectSize);
                return el;
                break;
            case 1:
                el = new Brick(app.objectSize);
                return el;
            case 2:

                break;
            case 3:

                break;
            case 4:

                break;
            case 5:
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
                if(![0,5].includes(block)){
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
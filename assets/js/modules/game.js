import {app} from "../main.js";
import {Enemy} from "./enemies/enemy.js";
import {findElement} from "./helper.js";

export class Game {
    constructor() {
        this.pausecounter = 0;
        this.spawncounter = 0;
        this.countEnemies = 0;
    }

    keyEvents() {
        addEventListener('keydown', e => {
            if (e.code === 'Escape') {
                app.pause = !app.pause
            }
        })
    }

    generate(className, array, data = [], flag = false) {
        if (!flag) {
            let el = new className();
            array.push(el);
            return el
        } else {
            let el = new className(data);
            array.push(el);
            return el
        }
    }

    remove(element, array) {
        let idx = array.indexOf(element);
        if (idx !== -1) {
            array.splice(idx, 1);
            return true;
        }
        return false;
    }

    graphCreate(from_array, to_array) {
        let map = app.mapInObject;
        from_array.filter(item => ['ground', 'tree'].includes(item.type)).forEach(e => {
            let index = {};
            for(let row = 0; row < app.mapNumber.length; row++){
                let column = map[row].findIndex(item => item === e.number);
                if(column !== -1){
                    index['row'] = row;
                    index['column'] = column;
                }
            }

            to_array[e.number] = [];
            for (let i = 0; i < 4; i++) {
                let newrow = index['row'];
                let newcolumn = index['column'];
                switch(i){
                    case 0:
                        newcolumn -= 1;
                        break;
                    case 1:
                        newrow -= 1;
                        break;
                    case 2:
                        newcolumn += 1;
                        break;
                    case 3:
                        newrow += 1;
                        break;
                }
                if(newrow != -1 && newcolumn != -1 && newrow < map.length && newcolumn < map.length){
                    let block = findElement(from_array, {value: map[newrow][newcolumn], key: 'number'});
                    if(['tree', 'ground'].includes(block.type)){
                        to_array[e.number].push(block.number);
                    }
                }

            }
        })
    }

    loop() {
        requestAnimationFrame(() => {
            this.spawncounter++;
            if (this.spawncounter === 1) {
                if (this.countEnemies < app.muchEnemies) {
                    this.generate(Enemy, app.elements);
                    this.countEnemies++;
                }
            }
            if (this.spawncounter === 120) this.spawncounter = 0;

            if (!app.pause) {
                // if(this.pausecounter === 0){
                //     $('.pause').fadeOut();
                // }
                this.pausecounter++;
                this.updateElements(app.elements);
            } else {
                $('.pause').fadeIn();
                this.pausecounter = 0;
            }

            if (!app.ended) {
                this.loop();
            }
        })
    }

    updateElements(elements) {
        elements.forEach(e => {
            e.update();
            e.draw();
        })
    }
}
import {app} from "../main.js";

export class Game {
    constructor(){
        this.pausecounter = 0;
    }
    keyEvents(){
        addEventListener('keydown',e=>{
            if (e.code === 'Escape') {
                app.pause = !app.pause
            }
        })
    }

    generate(className, array , data = [], flag = false){
        if(!flag){
            let el = new className();
            array.push(el);
            return el
        }
        else{
            let el = new className(data);
            array.push(el);
            return el
        }
    }

    remove(element, array){
        let idx = array.indexOf(element);
        if(idx !== -1){
            array.splice(idx,1);
            return true;
        }
        return false;
    }

    loop(){
        requestAnimationFrame(()=>{
            if(!app.pause) {
                if(this.pausecounter === 0){
                    $('.pause').fadeOut();
                }
                this.pausecounter++;
                this.updateElements(app.elements);
            }
            else{
                $('.pause').fadeIn();
                this.pausecounter = 0;
            }

            if(!app.ended){
                this.loop();
            }
        })
    }

    updateElements(elements){
        elements.forEach(e=>{
            e.update();
            e.draw();
        })
    }
}
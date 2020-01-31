import {app} from "../main.js";

export class Game {

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
            this.updateElements(app.elements);
            this.loop();
        })
    }

    updateElements(elements){
        elements.forEach(e=>{
            e.update();
            e.draw();
        })
    }
}
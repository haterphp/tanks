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
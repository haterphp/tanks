export class Game {
    constructor(app){
        this.elements = app.elements;
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

    loop(){
        requestAnimationFrame(()=>{
            this.updateElements();
            this.loop();
        })
    }

    updateElements(){
        this.elements.forEach(e=>{
            e.update();
            e.draw();
        })
    }
}
import {Drawable} from "../modules/drawable.js";
import {app} from "../main.js";

export class Bullet extends Drawable {
    constructor(spawn_position) {
        super();
        this.direction = spawn_position.direction;

        this.w = spawn_position.w;
        this.h = spawn_position.h;
        this.x = spawn_position.x;
        this.y = spawn_position.y;

        this.speed = 3;

        this.createElement()
    }

    update() {
        this.changeDirection(this.direction);
        this.checkRemove();
        this.checkCollision();
        super.update();
    }

    checkRemove() {
        switch (this.direction) {
            case 1:
                if (this.x + this.w >= app.zone.width()) {
                    if (app.game.remove(this, app.elements)) {
                        this.removeElement()
                    }
                }
                break;
            case -1:
                if (this.x <= 0) {
                    if (app.game.remove(this, app.elements)) {
                        this.removeElement()
                    }
                }
                break;
            case 2:
                if (this.y <= 0) {
                    if (app.game.remove(this, app.elements)) {
                        this.removeElement()
                    }
                }
                break;
            case -2:
                if (this.y + this.h >= app.zone.height()) {
                    if (app.game.remove(this, app.elements)) {
                        this.removeElement()
                    }
                }
                break;
        }
    }

    checkCollision(){
        app.elements.forEach(e=>{
            if(e.type !== 'player'){
                if(e.type === 'brick'){
                    if(this.isCollision(e)){
                        if (app.game.remove(this, app.elements)) {
                            this.removeElement();
                        }
                        e.type = 'ground';
                        e.element[0].classList = 'ground';
                    }
                }
                if(e.type === 'stone'){
                    if(this.isCollision(e)){
                        if (app.game.remove(this, app.elements)) {
                            this.removeElement();
                        }
                    }
                }
            }
        })
    }
}
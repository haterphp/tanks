import {Drawable} from "./drawable.js";
import {app} from "../main.js";
import {Bullet} from "./bullet.js";


export class Player extends Drawable {
    constructor() {
        super();
        this.w = this.h = app.objectSize - 12;
        this.x = app.positionPlayer.x;
        this.y = app.positionPlayer.y;

        this.speed = 2;

        this.lastDirection = 2;

        this.timeout = 0;

        this.hp = 3;

        this.keys = new Map()
            .set('ArrowRight', null)
            .set('ArrowLeft', null)
            .set('ArrowUp', null)
            .set('ArrowDown', null)
            .set('Space', null);

        this.direction = null;

        this.createElement();
        this.keyEvents();
    }

    keyEvents() {
        document.addEventListener('keydown', (e) => this.switchKeys(e.code, 'keydown'))
        document.addEventListener('keyup', (e) => this.switchKeys(e.code, 'keyup'))
    }

    switchKeys(key, status) {
        if (this.keys.get(key) !== undefined) {
            this.keys.set(key, status)
        }
    }

    update() {


        this.changeDirection(this.direction);
        this.keys.forEach((value, key) => {
            if (this[`action${key}`])
                this[`action${key}`](value)
        })

        if(this.timeout !== 0){
            this.timeout++;
        }
        if(this.timeout === 30){
            this.timeout = 0;
        }
        super.update();
    }

    collisionWithBlock(newPos){
        let collisionCheck = false;
        app.elements.filter(item => ['stone', 'brick', 'water'].includes(item.type)).forEach(e=>{
            if(e.isCollision(newPos)){
                collisionCheck = true;
                return;
            }
        })
        return collisionCheck;
    }

    actionArrowRight(value) {
        switch (value) {
            case 'keydown':
                this.lastDirection = 1;
                if (this.x + this.w + this.speed <= app.zone.width()) {
                    if(!this.collisionWithBlock({
                        x: this.x + this.speed + 3,
                        y: this.y,
                        w: this.w,
                        h: this.h,
                    })){
                        this.direction = 1;
                        this.changeAnimation(`${this.constructor.name.toLowerCase()}/right.gif`)

                    }
                    else{
                        this.direction = 0;
                        this.keys.set('ArrowRight', null);
                        this.changeAnimation(`${this.constructor.name.toLowerCase()}/state/right.png`)
                    }
                } else {
                    this.direction = 0;
                    this.keys.set('ArrowRight', null);
                    this.changeAnimation(`${this.constructor.name.toLowerCase()}/state/right.png`)
                }
                break;
            case 'keyup':
                this.direction = 0;
                this.keys.set('ArrowRight', null);
                this.changeAnimation(`${this.constructor.name.toLowerCase()}/state/right.png`)
                break;
        }
    }

    actionArrowLeft(value) {
        switch (value) {
            case 'keydown':
                this.lastDirection = -1;
                if (this.x + this.speed >= 0) {
                    if(!this.collisionWithBlock({
                        x: this.x - (this.speed + 3 ),
                        y: this.y,
                        w: this.w,
                        h: this.h,
                    })){
                        this.direction = -1;

                        this.changeAnimation(`${this.constructor.name.toLowerCase()}/left.gif`)
                    }
                    else{
                        this.direction = 0;
                        this.keys.set('ArrowLeft', null);
                        this.changeAnimation(`${this.constructor.name.toLowerCase()}/state/left.png`)
                    }

                } else {
                    this.direction = 0;
                    this.keys.set('ArrowLeft', null);
                    this.changeAnimation(`${this.constructor.name.toLowerCase()}/state/left.png`)
                }
                break;
            case 'keyup':
                this.direction = 0;
                this.keys.set('ArrowLeft', null);
                this.changeAnimation(`${this.constructor.name.toLowerCase()}/state/left.png`)
                break;
        }
    }

    actionArrowUp(value) {
        switch (value) {
            case 'keydown':
                this.lastDirection = 2;
                if (this.y + this.speed >= 0) {

                    if(!this.collisionWithBlock({
                        x: this.x,
                        y: this.y - (this.speed + 3 ),
                        w: this.w,
                        h: this.h,
                    })){
                        this.direction = 2;

                        this.changeAnimation(`${this.constructor.name.toLowerCase()}/up.gif`)
                    }
                    else{
                        this.direction = 0;
                        this.keys.set('ArrowUp', null);
                        this.changeAnimation(`${this.constructor.name.toLowerCase()}/state/up.png`)
                    }

                } else {
                    this.direction = 0;
                    this.keys.set('ArrowUp', null);
                    this.changeAnimation(`${this.constructor.name.toLowerCase()}/state/up.png`)
                }
                break;
            case 'keyup':
                this.direction = 0;
                this.keys.set('ArrowUp', null);
                this.changeAnimation(`${this.constructor.name.toLowerCase()}/state/up.png`)
                break;
        }
    }

    actionArrowDown(value) {
        switch (value) {
            case 'keydown':
                if (this.y + this.h + this.speed <= app.zone.height()) {
                    this.lastDirection = -2;
                    if(!this.collisionWithBlock({
                        x: this.x,
                        y: this.y + this.speed + 3,
                        w: this.w,
                        h: this.h,
                    })){
                        this.direction = -2;

                        this.changeAnimation(`${this.constructor.name.toLowerCase()}/down.gif`)
                    }
                    else{
                        this.direction = 0;
                        this.keys.set('ArrowDown', null);
                        this.changeAnimation(`${this.constructor.name.toLowerCase()}/state/down.png`)
                    }

                } else {
                    this.direction = 0;
                    this.keys.set('ArrowDown', null);
                    this.changeAnimation(`${this.constructor.name.toLowerCase()}/state/down.png`)
                }
                break;
            case 'keyup':
                this.direction = 0;
                this.keys.set('ArrowDown', null);
                this.changeAnimation(`${this.constructor.name.toLowerCase()}/state/down.png`)
                break;
        }
    }

    actionSpace(value) {
        if (value === 'keydown') {
            if(this.timeout === 0) {
                switch (this.lastDirection) {
                    case 2:
                        app.game.generate(Bullet, app.elements, {
                            x: this.x + (this.w / 2 - 5),
                            y: this.y - 30,
                            direction: 2,
                            w: 10,
                            h: 15
                        }, true)
                        break;
                    case -2:
                        app.game.generate(Bullet, app.elements, {
                            x: this.x + (this.w / 2 - 5),
                            y: this.y + this.h + 10,
                            direction: -2,
                            w: 10,
                            h: 15
                        }, true)
                        break;
                    case -1:
                        app.game.generate(Bullet, app.elements, {
                            x: this.x - 30,
                            y: (this.y + this.h / 2 - 7),
                            direction: -1,
                            w: 15,
                            h: 10
                        }, true)
                        break;
                    case 1:
                        app.game.generate(Bullet, app.elements, {
                            x: this.x + this.w + 10,
                            y: (this.y + this.h / 2 - 5),
                            direction: 1,
                            w: 15,
                            h: 10
                        }, true)
                        break;
                }
                this.timeout++;
            }
        }
    }
}
import {Drawable} from "./drawable.js";
import {app} from "../main.js";


export class Player extends Drawable {
    constructor() {
        super();
        this.w = this.h = app.objectSize - 20;
        this.x = app.positionPlayer.x;
        this.y = app.positionPlayer.y;

        this.speed = 2;

        this.lastDirection = {
            value: null,
            flag: false
        }

        this.hp = 3;

        this.keys = new Map()
            .set('ArrowRight', null)
            .set('ArrowLeft', null)
            .set('ArrowUp', null)
            .set('ArrowDown', null)
            .set('Space', null);

        this.events = new Map()
            .set('BrickCollision', null)

        this.direction = null;

        this.createElement();
        this.keyEvents();
    }

    keyEvents() {
        document.addEventListener('keydown', (e) => this.switchKeys(e.key, 'keydown'))
        document.addEventListener('keyup', (e) => this.switchKeys(e.key, 'keyup'))
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
        this.events.forEach((value, key) => {
            if (this[`event${key}`])
                this[`event${key}`](value)
        })


        super.update();
    }

    eventBrickCollision(brick) {
        if (brick) {
            if (this.isCollision(brick)) {

                if (!this.lastDirection.flag) {
                    this.lastDirection.value = this.direction
                }
                this.lastDirection.flag = true;

                switch (this.lastDirection.value) {
                    case 1:
                        if (this.keys.get('ArrowRight') === 'keydown') {
                            this.direction = 0;
                            return;
                        }
                        break;
                    case -1:
                        if (this.keys.get('ArrowLeft') === 'keydown') {
                            this.direction = 0;
                            return;
                        }
                        break;
                    case 2:
                        if (this.keys.get('ArrowUp') === 'keydown') {
                            this.direction = 0;
                            return;
                        }
                        break;
                    case -2:
                        if (this.keys.get('ArrowDown') === 'keydown') {
                            this.direction = 0;
                            return;
                        }
                        break;
                }
            }
            else{
                this.lastDirection.flag = false;
                this.lastDirection.value = null;
            }
        }
    }

    changeDirection() {
        switch (this.direction) {
            case 1:

                this.offsets.x = this.speed;
                this.offsets.y = 0;

                break;
            case -1:
                this.offsets.x = -this.speed;
                this.offsets.y = 0;
                break;
            case 2:
                this.offsets.y = -this.speed
                this.offsets.x = 0;
                break;
            case -2:
                this.offsets.y = this.speed
                this.offsets.x = 0;
                break;
            case 0:
                this.offsets.x = 0;
                this.offsets.y = 0;
                break;
        }
    }

    actionArrowRight(value) {
        switch (value) {
            case 'keydown':
                if (this.x + this.w + this.speed <= app.zone.width()) {
                    this.direction = 1;
                    this.changeAnimation(`${this.constructor.name.toLowerCase()}/right.gif`)
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
                if (this.x + this.speed >= 0) {
                    this.direction = -1;
                    this.changeAnimation(`${this.constructor.name.toLowerCase()}/left.gif`)
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
                if (this.y + this.speed >= 0) {
                    this.direction = 2;
                    this.changeAnimation(`${this.constructor.name.toLowerCase()}/up.gif`)
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
                    this.direction = -2;
                    this.changeAnimation(`${this.constructor.name.toLowerCase()}/down.gif`)
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

    actionSpace(value){
        
    }

}
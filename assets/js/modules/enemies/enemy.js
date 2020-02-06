import {Drawable} from "../drawable.js";
import {random} from "../helper.js";
import {app} from "../../main.js";
import {getMap} from "../../../storage/map.js";
import {findElement} from "../helper.js ";

export class Enemy extends Drawable {
    constructor() {
        super();

        this.w = this.h = app.objectSize - 12;

        this.numberPosition = random(0, app.positionSpawnEnemies.length);

        this.x = app.positionSpawnEnemies[this.numberPosition].x + 2.5;
        this.y = app.positionSpawnEnemies[this.numberPosition].y + 2.5;

        this.positionOnBlock = app.positionSpawnEnemies[this.numberPosition].number;

        this.direction = 0;
        this.speed = 0;

        this.time = 0;

        this.visited = [];
        this.parent = [];
        this.dist = [];
        this.path = [];
        this.lastElement = null;

        this.createElement();
    }

    posOnBlock() {
        app.map.filter(item => ['tree', 'ground'].includes(item.type)).forEach(e => {
            if (e.isCollision(this)) {
                this.positionOnBlock = e.number;
            }
        })
    }

    bfs(graph, startNode) {
        let queue = [];
        this.visited = [];
        this.parent = [];
        this.dist = [];

        queue.push(startNode)
        this.visited[startNode] = true;
        this.parent[startNode] = -1;
        this.dist[startNode] = 0;

        while (queue.length > 0) {

            let v = queue.pop();

            for (let i = 0; i < graph[v].length; ++i) {
                let to = graph[v][i];
                if (!this.visited[to]) {
                    this.visited[to] = true;
                    queue.push(to);
                    this.dist[to] = this.dist[v] + 1;
                    this.parent[to] = v;
                }
            }
        }
    }

    update() {
        if(this.health <= 0){
            if (app.game.remove(this, app.elements)) {
                this.removeElement();
            }
        }
        this.posOnBlock();
        if (this.path.length === 0) {
            app.graph = [];
            app.game.graphCreate(app.map, app.graph);
            this.bfs(app.graph, this.positionOnBlock);
            let point = app.player.positionOnBlock.number;

            if (this.visited[point]) {
                this.path = [];

                for (let v = point; v != -1; v = this.parent[v]) {
                    this.path.push(v);
                }

                this.path.reverse();
                this.lastElement = this.path.shift()

            }

        }

        this.changeDirection(this.direction);
        if (this.path.length !== 0) {
            this.moving();
        }
        super.update();
    }

    checkRightCollision(block) {
        return this.isCollision(block) && this.x + this.w + this.speed + 3 >= block.x + block.w;
    }

    checkLeftCollision(block) {
        return this.isCollision(block) && this.x - this.speed - 3 <= block.x;
    }

    checkUpCollision(block) {
        return this.isCollision(block) && this.y - this.speed - 3 <= block.y;
    }

    checkDownCollision(block) {
        return this.isCollision(block) && this.y + this.h + this.speed + 3 >= block.y + block.h;
    }

    moving() {
        switch (this.path[0] - this.lastElement) {
            case 1:
                this.direction = 1;
                this.changeAnimation(`enemies/${this.type}/right.gif`);
                if (this.checkRightCollision(findElement(app.map, {value: this.path[0], key: 'number'}))) {
                    this.direction = 0;
                    this.lastElement = this.path.shift();
                }
                break;
            case -1:
                this.direction = -1;
                this.changeAnimation(`enemies/${this.type}/left.gif`);
                if (this.checkLeftCollision(findElement(app.map, {value: this.path[0], key: 'number'}))) {
                    this.direction = 0;
                    this.lastElement = this.path.shift();
                }
                break;
            case app.mapNumber.length:
                this.direction = -2;
                this.changeAnimation(`enemies/${this.type}/down.gif`);
                if (this.checkDownCollision(findElement(app.map, {value: this.path[0], key: 'number'}))) {
                    this.direction = 0;
                    this.lastElement = this.path.shift();
                }
                break;
            case -app.mapNumber.length:
                this.direction = 2;
                this.changeAnimation(`enemies/${this.type}/up.gif`);
                if (this.checkUpCollision(findElement(app.map, {value: this.path[0], key: 'number'}))) {
                    this.direction = 0;
                    this.lastElement = this.path.shift();
                }
        }
    }
}

import {Drawable} from "../drawable.js";
import {random} from "../helper.js";
import {app} from "../../main.js";
import {getMap} from "../../../storage/map.js";
import {findElement} from "../helper.js ";

export class Enemy extends Drawable {
    constructor() {
        super();

        this.w = this.h = app.objectSize - 5;
        this.numberPosition = random(0, 2);

        this.x = app.positionSpawnEnemies[this.numberPosition].x + 2.5;
        this.y = app.positionSpawnEnemies[this.numberPosition].y + 2.5;

        this.time = 0;

        this.visited = [];
        this.path = [];

        this.createElement();
    }

    bfs(graph, startNode = app.positionSpawnEnemies[this.numberPosition].number) {
        let visited = [];
        let queue = [];
        queue.push(graph[startNode])

        this.visited[startNode] = true;

        while (queue.length > 0) {
            let current = queue.pop();

            current.forEach((element )=> {
                if (!this.visited[element]) {

                    queue.unshift(graph[element])

                    this.visited[element] = true;
                }
            })

        }
        console.log(this.visited);
    }

    update() {
        if (this.time === 0) {
            this.bfs(app.graph)
        }

        if (this.time === 3) {
            let point = app.player.positionOnBlock.number;
            if (this.visited[point]) {
                console.log(point);
            }
        }
        this.time++;
        if (this.time >= 180) {
            this.time = 1;
        }
        //console.log(app.graph[app.positionSpawnEnemies[this.numberPosition].number]);

        super.update();
    }
}
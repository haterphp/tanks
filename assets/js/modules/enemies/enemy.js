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
        this.parent = [];
        this.dist = [];
        this.path = [];

        this.createElement();
    }

    bfs(graph, startNode = app.positionSpawnEnemies[this.numberPosition].number) {

        let queue = [];

        queue.push(startNode)
        this.visited[startNode] = true;
        this.parent[startNode] = -1;
        this.dist[startNode] = 0;

        while (queue.length > 0) {

            let v = queue.pop();

            for(let i = 0; i < graph[v].length; ++i){
                let to = graph[v][i];
                if(!this.visited[to]){
                    this.visited[to] = true;
                    queue.push(to);
                    this.dist[to] = this.dist[v] + 1;
                    this.parent[to] = v;
                }
            }

        }
        console.log(this.dist);
    }

    update() {
        if (this.time === 0) {
            this.bfs(app.graph)
        }

        if (this.time === 3) {
            let point = app.player.positionOnBlock.number;
            if (this.visited[point]) {
                for(let v = point; v != -1; v = this.parent[v]){
                    this.path.push(v);
                }
                this.path.reverse();
                console.log(this.path);
                console.log(this.dist[point]);
            }
        }
        this.time++;
        if (this.time >= 180) {
            this.time = 1;
        }
        
        super.update();
    }
}
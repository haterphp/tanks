import * as enemies  from "../js/modules/enemies/enemies_class.js";


let enemiesOnLevel = {
    0: [enemies.Basic]
};

export function getEnemiesOnLevel(number){
    return enemiesOnLevel[number];
}

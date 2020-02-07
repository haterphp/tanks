import * as enemies  from "../js/modules/enemies/enemies_class.js";


let enemiesOnLevel = {
    0: [enemies.Basic, enemies.Fast, enemies.Armor]
};

export function getEnemiesOnLevel(number){
    return enemiesOnLevel[number];
}

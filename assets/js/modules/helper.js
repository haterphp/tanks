export let random = (min, max) => {
    min = Math.ceil(min);
    max = Math.ceil(max);

    return Math.floor(Math.random() * (max - min)) + min;
}

export function findElement (array, {value, key}){
    return array.find(item => item[key] === value)
}

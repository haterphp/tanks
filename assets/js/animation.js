let buttons = ['1_player', '2_player'];
let panels = ['start', 'game', 'end'];
let panel = 'game';

let button_start_animate = () => {
    buttons.forEach((e)=>{
        $(`#${e}`).mouseenter(()=>switchStatus(e, 'active'))
    })
}
let switchStatus = (el, className) =>{
    $(`#${el}`).addClass(className);
    buttons.forEach((e)=>{
        if(el != e){
            $(`#${e}`).removeClass(className);
        }
    })
}

button_start_animate();

let go = (page, display = 'block') =>{
    console.log(123);
    $(`#${page}`).css({
        display: display
    })
    panels.forEach(e=>{
        if(page != e){
            $(`#${e}`).css({
                display: 'none'
            })
        }
    })
}
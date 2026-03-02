let canvas;
let world;
let keyboard = new Keyboard();
let canvasStart = document.getElementById("canvas")
let startAudio = new Audio('audio/game/gameStart.mp3')
let dialog = document.getElementById('dialog')



function startGame(){
    initLevel1();
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    removeStartMenu()

}

function removeStartMenu(){
    let start = document.getElementById("menu")
    start.classList.add("d-none");
    canvas.classList.remove("d-none");
    startAudio.play()
}

function openDialog() {
dialog.showModal();
}

function clodeDialog(){
dialog.close()
}
 var elem = document.getElementById("canvas");
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}



window.addEventListener("keydown",(e) =>{
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    } 
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    } 
     if (e.keyCode == 38) {
        keyboard.UP = true;
    } 
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    } 
      if (e.keyCode == 32) {
        keyboard.SPACE = true;
    } 
      if (e.keyCode == 68) {
        keyboard.D = true;
    } 
    console.log(keyboard.D);
    
    

});
window.addEventListener("keyup",(e) =>{
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    } 
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    } 
     if (e.keyCode == 38) {
        keyboard.UP = false;
    } 
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    } 
      if (e.keyCode == 32) {
        keyboard.SPACE = false;
    } 
       if (e.keyCode == 68) {
        keyboard.D = false;
    } 
    
    

});
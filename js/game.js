let canvas;
let world;
let keyboard = new Keyboard();
let dialog = document.getElementById("dialog");
let fullscreen = document.getElementById("fullscreen");
let restart = document.getElementById('reset')
let gameOverRestart = document.getElementById('game-over-screen')
let sound = document.getElementById('soundToggleBtn')
let gameCanvas = document.getElementById('canvas-container')

function startGame() {
  initLevel1();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  removeStartMenu();
  playsound.play('backgroundmusic');
}

function restartGame(){
    clearAllIntervals()
    initLevel1();
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    playsound.play('backgroundmusic');

}
function restartGameOver(){
    gameOverRestart.classList.add("d-none");
    document.getElementById('restart-gameover').classList.add('d-none');
    document.getElementById('menu-gameover').classList.add('d-none'); 
    clearAllIntervals()
    initLevel1();
    canvas = document.getElementById("canvas");
    gameCanvas.classList.remove('d-none')
    world = new World(canvas, keyboard);
    playsound.play('backgroundmusic');
}

function backToStart(){
    location.reload();
}
function renderGameOverScreen() {
    document.getElementById('game-over-screen').classList.remove('d-none'); 
    document.getElementById('canvas-container').classList.add('d-none'); 

    setTimeout(() => {
        document.getElementById('restart-gameover').classList.remove('d-none'); 
    }, 1000);

    setTimeout(() => {
        document.getElementById('menu-gameover').classList.remove('d-none'); 
    }, 1500);
}

function renderYouWinScreen() {
    document.getElementById('you-win-screen').classList.remove('d-none'); 
    document.getElementById('canvas-container').classList.add('d-none'); 

       setTimeout(() => {
        document.getElementById('menu-you-win').classList.remove('d-none'); 
    }, 1500);
}

function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
  }

function removeStartMenu() {
  let start = document.getElementById("menu");
  start.classList.add("d-none");
  sound.classList.remove('d-none');
  restart.classList.remove("d-none");
  canvas.classList.remove("d-none");
  playsound.play('startbutton');
  fullscreen.classList.remove("d-none");
}

function openDialog() {
  dialog.showModal();
  playsound.play('startbutton');

}

function closeDialog() {
  dialog.close();
}

function openFullscreen() {
  if (gameCanvas.requestFullscreen) {
    gameCanvas.requestFullscreen();
  } else if (gameCanvas.webkitRequestFullscreen) {
    gameCanvas.webkitRequestFullscreen();
  } else if (gameCanvas.msRequestFullscreen) {
    gameCanvas.msRequestFullscreen();
  }
}

function toggleGameSound() {
    playsound.toggleMute();
    let volume = document.getElementById('volumen');
    let mute = document.getElementById('mute')
    if (playsound.isMuted) {
        mute.classList.remove('d-none')
        volume.classList.add('d-none')
    } else {
        mute.classList.add('d-none')
        volume.classList.remove('d-none')
    }
}

window.addEventListener("keydown", (e) => {
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
window.addEventListener("keyup", (e) => {
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

let canvas;
let world;
let keyboard = new Keyboard();
let dialog = document.getElementById("dialog");
let fullscreen = document.getElementById("fullscreen");
let restart = document.getElementById('reset')

function startGame() {
  initLevel1();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  removeStartMenu();
  playsound.play('backgroundmusic');
}

function removeStartMenu() {
  let start = document.getElementById("menu");
  start.classList.add("d-none");
  restart.classList.remove("d-none")
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
  if (canvas.requestFullscreen) {
    canvas.requestFullscreen();
  } else if (canvas.webkitRequestFullscreen) {
    canvas.webkitRequestFullscreen();
  } else if (canvas.msRequestFullscreen) {
    canvas.msRequestFullscreen();
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

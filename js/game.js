/** @type {HTMLCanvasElement} The main game canvas element. */
let canvas;
/** @type {World} The game world instance managing all game objects and rendering. */
let world;
/** @type {Keyboard} Tracks the current state of keyboard and touch inputs. */
let keyboard = new Keyboard();
/** @type {HTMLDialogElement} The instructions dialog element. */
let dialog = document.getElementById("dialog");
/** @type {HTMLElement} The fullscreen toggle button element. */
let fullscreen = document.getElementById("fullscreen");
/** @type {HTMLElement} The restart button element. */
let restart = document.getElementById("reset");
/** @type {HTMLElement} The game-over screen overlay element. */
let gameOverRestart = document.getElementById("game-over-screen");
/** @type {HTMLElement} The sound toggle button element. */
let sound = document.getElementById("soundToggleBtn");
/** @type {HTMLElement} The container element wrapping the game canvas. */
let gameCanvas = document.getElementById("canvas-container");

/**
 * Starts a new game by initializing the level, canvas and world.
 */
function startGame() {
  initLevel1();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  removeStartMenu();
  playsound.play("backgroundmusic");
  bindBtsPressEvents();
}

/**
 * Restarts the game by clearing intervals and reinitializing.
 */
function restartGame() {
  clearAllIntervals();
  initLevel1();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  playsound.play("backgroundmusic");
}
/**
 * Restarts the game from the game over screen.
 */
function restartGameOver() {
  gameOverRestart.classList.add("d-none");
  document.getElementById("restart-gameover").classList.add("d-none");
  document.getElementById("menu-gameover").classList.add("d-none");
  clearAllIntervals();
  initLevel1();
  canvas = document.getElementById("canvas");
  gameCanvas.classList.remove("d-none");
  world = new World(canvas, keyboard);
  playsound.play("backgroundmusic");
}

/**
 * Returns to the start screen by reloading the page.
 */
function backToStart() {
  location.reload();
}
/**
 * Displays the game over screen with staggered button reveals.
 */
function renderGameOverScreen() {
  document.getElementById("game-over-screen").classList.remove("d-none");
  document.getElementById("canvas-container").classList.add("d-none");

  setTimeout(() => {
    document.getElementById("restart-gameover").classList.remove("d-none");
  }, 1000);

  setTimeout(() => {
    document.getElementById("menu-gameover").classList.remove("d-none");
  }, 1500);
}

/**
 * Displays the you win screen with a staggered menu button reveal.
 */
function renderYouWinScreen() {
  document.getElementById("you-win-screen").classList.remove("d-none");
  document.getElementById("canvas-container").classList.add("d-none");

  setTimeout(() => {
    document.getElementById("menu-you-win").classList.remove("d-none");
  }, 1500);
}

/**
 * Clears all active intervals up to ID 9999.
 */
function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * Hides the start menu and shows game UI elements.
 */
function removeStartMenu() {
  let start = document.getElementById("menu");
  start.classList.add("d-none");
  sound.classList.remove("d-none");
  restart.classList.remove("d-none");
  canvas.classList.remove("d-none");
  playsound.play("startbutton");
  fullscreen.classList.remove("d-none");
  updateMuteIcon();
}

/**
 * Syncs the mute/volume icon with the saved mute state from localStorage.
 */
function updateMuteIcon() {
  let volume = document.getElementById("volumen");
  let mute = document.getElementById("mute");
  if (playsound.isMuted) {
    mute.classList.remove("d-none");
    volume.classList.add("d-none");
  } else {
    mute.classList.add("d-none");
    volume.classList.remove("d-none");
  }
}

/**
 * Opens the instructions dialog.
 */
function openDialog() {
  dialog.showModal();
  playsound.play("startbutton");
}

/**
 * Closes the instructions dialog.
 */
function closeDialog() {
  dialog.close();
}

/**
 * Toggles browser fullscreen mode for the game canvas container.
 */
function openFullscreen() {
  if (!document.fullscreenElement) {
    if (gameCanvas.requestFullscreen) {
      gameCanvas.requestFullscreen();
    } else if (gameCanvas.webkitRequestFullscreen) {
      gameCanvas.webkitRequestFullscreen();
    } else if (gameCanvas.msRequestFullscreen) {
      gameCanvas.msRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
}

/**
 * Toggles game sound on/off and updates the UI icon.
 */
function toggleGameSound() {
  playsound.toggleMute();
  updateMuteIcon();
}

/**
 * Listens for keydown events and sets the corresponding keyboard flags to true.
 * @param {KeyboardEvent} e - The keydown event object.
 */
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
});

/**
 * Listens for keyup events and sets the corresponding keyboard flags to false.
 * @param {KeyboardEvent} e - The keyup event object.
 */
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

/**
 * Binds touch events to mobile control buttons.
 */
function bindBtsPressEvents() {
  document.getElementById("btn-left").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.LEFT = true;
  });

  document.getElementById("btn-left").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.LEFT = false;
  });

  document.getElementById("btn-right").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.RIGHT = true;
  });

  document.getElementById("btn-right").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.RIGHT = false;
  });

  document.getElementById("btn-jump").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.SPACE = true;
  });

  document.getElementById("btn-jump").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.SPACE = false;
  });

  document.getElementById("btn-bottle").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.D = true;
  });

  document.getElementById("btn-bottle").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.D = false;
  });
}
/**
 * Checks device orientation and shows a rotate warning on portrait mobile.
 */
function checkOrientation() {
  const isMobile = window.matchMedia(
    "(hover: none) and (pointer: coarse)",
  ).matches;
  const isPortrait = window.innerHeight > window.innerWidth;
  const rotateWarning = document.getElementById("rotate-warning");

  if (isMobile && isPortrait) {
    rotateWarning.classList.remove("d-none");
  } else {
    rotateWarning.classList.add("d-none");
  }
}

window.addEventListener("load", checkOrientation);
window.addEventListener("resize", checkOrientation);
window.addEventListener("orientationchange", checkOrientation);

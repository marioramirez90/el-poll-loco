# 🌵 El Pollo Loco – 2D Jump & Run Game

An object-oriented 2D browser jump-and-run game built with **HTML5 Canvas** and modern **Vanilla JavaScript**, developed as part of the **Developer Akademie** frontend software development curriculum. The project demonstrates clean Object-Oriented Programming (OOP), class inheritance models, custom collision physics, fluid character state animations, and dedicated mobile landscape gameplay.

---

## 🚀 Live Demo

Play the live build in your browser:  
👉 **[Play Game](https://marioramirez.de/projekte/el-pollo-loco)**

*(Note: If you built "Sharkie" instead, update the URL to `.../projekte/sharkie`.)*

---

## 🎮 Controls & Gameplay

### Desktop (Keyboard)
| Key | Action |
| :--- | :--- |
| `A` / `D` or `Arrow Left` / `Arrow Right` | Move Left / Right |
| `W` / `Space` or `Arrow Up` | Jump (stomp enemies from above) |
| `D` or `F` | Throw Bottle (attack) |
| `Esc` | Close Story / Instruction Modal |

### Mobile & Tablet (Touch Controls)
* Virtual on-screen touch buttons dynamically activate on tablet and smartphone viewports.
* **Landscape-Only:** Portrait orientation displays a locked overlay prompting users to rotate their device.
* Long-press and context menus are disabled on all mobile touch triggers.

---

## ✨ Features & Architecture

* **Object-Oriented Programming (OOP):**
  * Clear inheritance architecture (`MovableObject`, `DrawableObject`, `World`, `Keyboard`, etc.).
  * Every class is decoupled into its own file located inside the `classes/` directory.
* **Character States & Dynamic Animations:**
  * Fluid cycles for walking, jumping, hurt frames (`HURT`), and death sequences (`DEAD`).
  * Idle animation transitions into sleep mode accompanied by audio cues after 15 seconds of inactivity.
* **Enemy AI & Accurate Collision Detection:**
  * At least two distinct enemy archetypes plus a multi-phase endboss.
  * Precise collision hitboxes and offsets: enemies are only defeated by direct top-down jumps.
* **Collectibles & Status Indicators:**
  * Collectible coins and throwable bottles across the map.
  * Real-time status bars reflecting current health, coins, bottle inventory, and endboss health.
* **Sound & State Management:**
  * Background soundtrack and synchronized sound effects for combat, steps, and hits.
  * Global mute control with state persistence via `localStorage`.
* **Zero-Reload Restart:**
  * Seamless state resets upon game over or victory without reloading the browser window (`location.reload()`).

---

## 🛠️ Tech Stack

* **HTML5:** Canvas API (`<canvas>`), semantic elements, help dialogs.
* **CSS3:** Flexbox, media queries (`@media (orientation: portrait)`), custom touch handling.
* **JavaScript (ES6+ OOP):** Class hierarchies, Canvas rendering cycle (`requestAnimationFrame`), event listeners, Web Audio, JSDoc standard documentation.

---

## ⚡ Quickstart (Run Locally)

To run and inspect the game locally on your machine:

### 1. Clone the repository
```bash
git clone [https://github.com/DEIN-GITHUB-NUTZERNAME/DEIN-REPO-NAME.git](https://github.com/DEIN-GITHUB-NUTZERNAME/DEIN-REPO-NAME.git)

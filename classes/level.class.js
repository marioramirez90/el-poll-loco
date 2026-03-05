/**
* Represents a game level containing all game entities.
*/
class Level {
    enemies;
    clouds;
    coins;
    bottle;
    backgroundObjects;
    level_end_x = 5300;

    /**
    * Creates a new level with all game objects.
    * @param {MovableObject[]} enemies - Array of enemy objects.
    * @param {Cloud[]} clouds - Array of cloud objects.
    * @param {Coins[]} coins - Array of coin objects.
    * @param {Bottle[]} bottle - Array of bottle objects.
    * @param {BackgroundObject[]} backgroundObjects - Array of background objects.
    */
    constructor(enemies, clouds, coins, bottle, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.coins = coins;
        this.bottle = bottle;
        this.backgroundObjects = backgroundObjects;
    }
}
/**
* Represents the coin collection status bar.
* @extends StatusBar
*/
class CoinStatusBar extends StatusBar {
    COIN_IMAGES = [
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
    ];

    percentage = 0;

    /**
    * Creates the coin status bar at its position.
    */
    constructor() {
        super();
        this.x = 40;
        this.y = 65;
        this.width = 200;
        this.height = 60;
        this.loadImages(this.COIN_IMAGES);
        this.setPercentage(0);
    }

    /**
    * Sets the coin percentage and updates the displayed image.
    * @param {number} percentage - The coin collection percentage (0-100).
    */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.COIN_IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
}
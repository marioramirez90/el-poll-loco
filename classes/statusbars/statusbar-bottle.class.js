/**
* Represents the bottle collection status bar.
* @extends StatusBar
*/
class BottleStatusBar extends StatusBar {
    BOTTLE_IMAGES = [
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
    ];

    percentage = 0;

    /**
    * Creates the bottle status bar at its position.
    */
    constructor() {
        super();
        this.x = 40;
        this.y = 120;
        this.width = 200;
        this.height = 60;
        this.loadImages(this.BOTTLE_IMAGES);
        this.setPercentage(0);
    }

    /**
    * Sets the bottle percentage and updates the displayed image.
    * @param {number} percentage - The bottle collection percentage (0-100).
    */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.BOTTLE_IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
}
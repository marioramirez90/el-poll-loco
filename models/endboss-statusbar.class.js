class EndbossStatusBar extends StatusBar {
  ENDBOSS_IMAGES = [
    "img/7_statusbars/2_statusbar_endboss/orange/orange0.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange20.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange40.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange60.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange80.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange100.png",
  ];

  percentage = 100;

  constructor() {
    super();
    this.x = 540;
    this.y = 20;
    this.width = 400;
    this.height = 90;
    this.loadImages(this.ENDBOSS_IMAGES);
    this.setPercentage(100);
  }
  
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.ENDBOSS_IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

}
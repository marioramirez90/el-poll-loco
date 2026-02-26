class BottleStatusBar extends StatusBar{

         BOTTEL_IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'

        
    ]
     percentage = 0;
    constructor(){
        super();
        this.x = 40;
        this.y = 120;
        this.width = 200;
        this.height = 60;
        this.loadImages(this.BOTTEL_IMAGES);
        this.setPercentage(0);
    }
     setPercentage(percentage){
        this.percentage = percentage;
        let path = this.BOTTEL_IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
    

}

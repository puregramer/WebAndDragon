/***
 * file name : Responsive.js
 * description : webcade Responsive Class
 * create date : 2018-05-11
 * creator : saltgamer
 ***/

export default class Responsive {
    constructor() {
       // this.update();
        /*this.screenWidth = 256;
        this.screenHeight = 256;*/

        this.ratio = window.devicePixelRatio;
        this.screenWidth = 512 * this.ratio;
        this.screenHeight = 512 * this.ratio;
        this.tileSize = 32;

    }

    update() {
        this.screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        this.screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    }
}
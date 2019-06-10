/***
 * file name : Compositor.js
 * description : webcade Compositor Class
 * create date : 2018-04-25
 * creator : saltgamer
 ***/

export default class Compositor {
    constructor() {
        this.layers = [];
    }

    draw(context, camera) {
        this.layers.forEach(layer => {
            layer(context, camera);
        });
    }
}
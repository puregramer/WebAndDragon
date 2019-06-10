/***
 * file name : Camera.js
 * description : webcade Camera Class
 * create date : 2018-04-25
 * creator : saltgamer
 ***/

import {Vec2} from './math';

export default class Camera {
    constructor(responsive) {
        this.pos = new Vec2(0, 0);
        this.size = new Vec2(responsive.screenWidth, responsive.screenHeight - responsive.tileSize);
        // this.size = new Vec2(256, 224);
    }
}
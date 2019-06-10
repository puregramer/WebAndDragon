/***
 * file name : Jump.js
 * description : webcade Jump Class
 * create date : 2018-04-26
 * creator : saltgamer
 ***/

import {Sides, Trait} from '../Entity';

export default class Jump extends Trait {
    constructor() {
        super('jump');

        this.ready = 0;
        this.duration = 0.3;
        this.engageTime = 0;
        this.requestTime = 0;
        this.gracePeriod = 0.2;
        this.speedBoost = 0.3;
        this.velocity = 250; //200
    }

    get falling() {
        // console.log('-> falling: ', this.ready);
        return this.ready < 0;
    }

    get fallingNumber() {
        return Math.abs(this.ready);
    }

    start() {
        this.requestTime = this.gracePeriod;
    }

    cancel() {
        this.engageTime = 0;
        this.requestTime = 0;
    }

    obstruct(entity, side) {
        if (side === Sides.BOTTOM) {
            this.ready = 1;
        } else if (side === Sides.TOP) {
            this.cancel();
        }
    }

    update(entity, deltaTime) {
        if (this.requestTime > 0) {
            if (this.ready > 0) {
                this.engageTime = this.duration;
                this.requestTime = 0;
            }
            this.requestTime -= deltaTime;
        }

        if (this.engageTime > 0) {
            entity.vel.y = -(this.velocity + Math.abs(entity.vel.x) * this.speedBoost);
            this.engageTime -= deltaTime;
        }

        this.ready--;
    }

}
/***
 * file name : PendulumMove.js
 * description : webcade PendulumMove Class
 * create date : 2018-04-26
 * creator : saltgamer
 ***/

import {Sides, Trait} from '../Entity';

export default class PendulumMove extends Trait{
    constructor() {
        super('pendulumMove');
        this.enabled = true;
        this.speed = -30;
    }

    obstruct(entity, side) {
        if (side === Sides.LEFT || side === Sides.RIGHT) {
            this.speed = -this.speed;
        }
    }

    update(entity, deltaTime) {
        if (this.enabled) {
            entity.vel.x = this.speed;
        }
    }

}
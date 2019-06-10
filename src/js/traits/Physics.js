/***
 * file name : Physics.js
 * description : webcade Physics Class
 * create date : 2018-04-26
 * creator : saltgamer
 ***/

import {Trait} from '../Entity';

export default class Physics extends Trait {
    constructor() {
        super('physics');
    }

    update(entity, deltaTime, level) {
        entity.pos.x += entity.vel.x * deltaTime;
        level.tileCollider.checkX(entity);

        entity.pos.y += entity.vel.y * deltaTime;
        level.tileCollider.checkY(entity);

        entity.vel.y += level.gravity * deltaTime;
    }
}
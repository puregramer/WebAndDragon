/***
 * file name : Goomba.js
 * description : webcade Goomba object
 * create date : 2018-04-26
 * creator : saltgamer
 ***/

import Entity, {Sides, Trait} from '../Entity';
import Physics from '../traits/Physics';
import Solid from '../traits/Solid';
import PendulumMove from '../traits/PendulumMove';
import Killable from '../traits/Killable';
import {loadSpriteSheet} from '../loaders';

export function loadGoomba () {
    return loadSpriteSheet('goomba')
    .then(createGoombaFactory);
}

class Behavior extends Trait {
    constructor() {
        super('behavior');
    }

    collides(us, them) {
        if (us.killable.dead) {
            return;
        }

        if (them.stomper) {
            if (them.vel.y > us.vel.y) {
                us.killable.kill();
                us.pendulumMove.speed = 0;
            } else {
                them.killable.kill();
            }
        }

    }
}

function createGoombaFactory (sprite) {
    const walkAnim = sprite.animations.get('walk');

    function routeAnim (goomba) {
        if (goomba.killable.dead) {
            return 'flat';
        }

        return walkAnim(goomba.lifeTime);
    }

    function drawGoomba (context) {
        sprite.draw(routeAnim(this), context, 0, 0);
    }

    return function createGoomba () {
        const goomba = new Entity();
        goomba.size.set(16, 16);

        goomba.addTrait(new Physics());
        goomba.addTrait(new Solid());
        goomba.addTrait(new PendulumMove());
        goomba.addTrait(new Behavior());
        goomba.addTrait(new Killable());

        goomba.draw = drawGoomba;

        return goomba;
    };

}
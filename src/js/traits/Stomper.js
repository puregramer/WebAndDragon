/***
 * file name : Stomper.js
 * description : webcade Stomper Class
 * create date : 2018-04-26
 * creator : saltgamer
 ***/
import {Trait} from '../Entity';

export default class Stomper extends Trait {
    constructor() {
        super('stomper');
        this.bounceSpeed = 400;

        this.onStomp = function () {}

    }

    boune(us, them) {
        us.bounds.bottom = them.bounds.top;
        us.vel.y = -this.bounceSpeed;
    }

    collides(us, them) {
        if (!them.killable || them.killable.dead) {
            return;
        }

        if (us.vel.y > them.vel.y) {
            this.boune(us, them);
            this.onStomp(us, them);
        }
    }


}
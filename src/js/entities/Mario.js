/***
 * file name : Mario.js
 * description : webcade Mario object
 * create date : 2018-04-24
 * creator : saltgamer
 ***/
import Entity from '../Entity';
import Physics from '../traits/Physics';
import Solid from '../traits/Solid';
import Go from '../traits/Go';
import Jump from '../traits/Jump';
import Killable from '../traits/Killable';
import Stomper from '../traits/Stomper';
import {loadSpriteSheet} from '../loaders';

const SLOW_DRAG = 1 / 1000;
const FAST_DRAG = 1 / 5000;

export function loadMario () {
    return loadSpriteSheet('mario')
    .then(createMarioFactory);
}

function createMarioFactory (sprite) {
    const runAnim = sprite.animations.get('run');

    console.log('-> sprite: ', sprite);
    console.log('-> runAnim: ', runAnim);

    function routeFrame (mario) {
        if (mario.jump.falling) {
            return 'jump';
        }

        if (mario.go.distance > 0) {
            if ((mario.vel.x > 0 && mario.go.dir < 0) || (mario.vel.x < 0 && mario.go.dir > 0)) {
                return 'break';
            }
            return runAnim(mario.go.distance);
        }

        return 'idle';
    }

    function setTurboState (turboOn) {
        this.go.dragFactor = turboOn ? FAST_DRAG : SLOW_DRAG;
    }

    function drawMario (context) {
        sprite.draw(routeFrame(this), context, 0, 0, this.go.heading < 0);
    }

    return function createMario () {
        const mario = new Entity();
        mario.size.set(50, 70);

        mario.addTrait(new Physics());
        mario.addTrait(new Solid());
        mario.addTrait(new Go());
        mario.addTrait(new Jump());
        mario.addTrait(new Killable());
        mario.addTrait(new Stomper());

        mario.killable.removeAfter = 0;

        mario.turbo = setTurboState;
        mario.draw = drawMario;

        mario.turbo(false);

        return mario;

    }

}
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
import Attack from '../traits/Attack';

const SLOW_DRAG = 1 / 1000;
const FAST_DRAG = 1 / 5000;

export function loadElf () {
    return loadSpriteSheet('elf')
    .then(createElfFactory);
}

function createElfFactory (sprite) {
    const walkAnim = sprite.animations.get('walk'),
        runAnim = sprite.animations.get('run'),
        idleAnim = sprite.animations.get('idle'),
        jumpAnim = sprite.animations.get('jump'),
        attackAnim1 = sprite.animations.get('attack1'),
        attackAnim2 = sprite.animations.get('attack2');

    console.log('-> sprite: ', sprite);

    function routeFrame (elf) {

        /*if (elf.attack.attacking) {
            return attackAnim(elf.attack.attackNumber);
        }*/
        if (elf.attack.currentAttack > 0) {
            return elf.attack.routeAttack();
        }

        if (elf.jump.falling) {
            // return 'jump';
            // console.log('--> lifeTime: ', elf.lifeTime);
            return jumpAnim(elf.jump.fallingNumber);
        }

        if (elf.go.distance > 0) {
            if ((elf.vel.x > 0 && elf.go.dir < 0) || (elf.vel.x < 0 && elf.go.dir > 0)) {
                // return 'break';
                switch (elf.go.dragFactor) {
                    case SLOW_DRAG:
                        return 'break-2';
                    case FAST_DRAG:
                        return 'breakRun-4';
                }

            }
            switch (elf.go.dragFactor) {
                case SLOW_DRAG:
                    return walkAnim(elf.go.distance);
                case FAST_DRAG:
                    return runAnim(elf.go.distance);
            }

            // return walkAnim(elf.go.distance);
        }



        // return 'idle';
        return idleAnim(elf.lifeTime);
    }

    function setTurboState (turboOn) {
        this.go.dragFactor = turboOn ? FAST_DRAG : SLOW_DRAG;
    }

    function drawElf (context) {
        // console.log('-- routeFrame(this): ', routeFrame(this));
        sprite.draw(routeFrame(this), context, 0, 0, this.go.heading < 0);
    }

    return function createElf () {
        const elf = new Entity();
        elf.size.set(60, 70);
        // elf.size.set(100, 70);
        elf.offset.x = 40;

        elf.addTrait(new Physics());
        elf.addTrait(new Solid());
        elf.addTrait(new Go());
        elf.addTrait(new Jump());
        elf.addTrait(new Killable());
        elf.addTrait(new Stomper());

        elf.addTrait(new Attack([attackAnim1, attackAnim2]));

        elf.killable.removeAfter = 0;

        elf.turbo = setTurboState;
        elf.draw = drawElf;

        elf.turbo(false);

        return elf;

    }

}
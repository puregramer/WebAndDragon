/***
 * file name : input.js
 * description : webcade input object
 * create date : 2018-04-25
 * creator : saltgamer
 ***/

import Keyboard from './KeyboardState';

export function setupKeyboard (hero) {
    const input = new Keyboard();

    // KeyW | 87
    input.addMapping(87, keyState => {
        if (keyState) {
            hero.jump.start();
        } else {
            hero.jump.cancel();
        }
    });

    // KeyQ | 81
    input.addMapping(81, keyState => {
        hero.turbo(keyState);
    });

    // KeyE | 69
    input.addMapping(69, keyState => {
        if (keyState) {
            hero.attack.start();
        } /*else {
            hero.attack.cancel();
        }*/

    });

    // ArrowRight | 39
    input.addMapping(39, keyState => {
        // console.log('-keyState: ', keyState);
        hero.go.dir += keyState ? 1 : -1;
    });

    // ArrowLeft | 37
    input.addMapping(37, keyState => {
        hero.go.dir += keyState ? -1 : 1;
    });

    return input;
}
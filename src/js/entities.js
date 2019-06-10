/***
 * file name : entities.js
 * description : webcade entities
 * create date : 2018-04-24
 * creator : saltgamer
 ***/

import {loadGoomba} from './entities/Goomba';
import {loadKoopa} from './entities/Koopa';
import {loadElf} from './entities/Elf';

export function loadEntities () {
    const entityFactories = {};

    function addAs (name) {
        return factory => entityFactories[name] = factory;
    }

    return Promise.all([
        loadElf().then(addAs('elf')),
        loadGoomba().then(addAs('goomba')),
        loadKoopa().then(addAs('koopa')),

    ]).then(() => entityFactories);

}
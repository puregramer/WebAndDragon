/***
 * file name : Level.js
 * description : webcade Level Class
 * create date : 2018-04-25
 * creator : saltgamer
 ***/

import Compositor from './Compositor';
import EntityCollider from  './EntityCollider';
import TileCollider from  './TileCollider';

export default class Level {
    constructor() {
        this.gravity = 1500;
        this.totalTime = 0;

        this.comp = new Compositor();
        this.entities = new Set();

        this.entityCollider = new EntityCollider(this.entities);
        this.tileCollider = null;
    }

    setCollisionGrid(matrix) {
        this.tileCollider = new TileCollider(matrix);
    }

    update(deltaTime) {
        this.entities.forEach(entity => {
            entity.update(deltaTime, this);
        });

        this.entities.forEach(entity => {
            this.entityCollider.check(entity);
        });

        this.entities.forEach(entity => {
            entity.finalize();
        });

        this.totalTime += deltaTime;
    }
}
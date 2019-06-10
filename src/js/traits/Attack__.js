/***
 * file name : Attack.js
 * description : WebAndDragon Attack Class
 * create date : 2018-07-18
 * creator : saltgamer
 ***/
import {Sides, Trait} from '../Entity';

export default class Attack extends Trait {
    constructor() {
        super('attack');

        this.ready = 0;


        this.combo = 0;

    }

    get attacking() {
        return this.ready > 0;
    }

    get attackNumber() {
        return Math.abs(this.ready);
    }

    start() {
        this.ready = 50;
    }

    cancel() {
        this.ready = 0;
    }

    update(entity, deltaTime) {


        // console.log('- ready:', this.ready);
        this.ready--;



    }

}
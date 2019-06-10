/***
 * file name : Attack.js
 * description : WebAndDragon Attack Class
 * create date : 2018-07-18
 * creator : saltgamer
 ***/
import {Sides, Trait} from '../Entity';

export default class Attack extends Trait {
    constructor(animList) {
        super('attack');

        this.ready = 0;
        this.attackAnimList = animList;
        this.currentAttack = 0;
        this.lastAttackTime = 0;
        this.maxComboDelay = 0.6;

        this.attackTime = 0;

        this.isAttack = false;



    }

    /* get attacking() {
         return this.ready > 0;
     }
 */

    /*get attackNumber() {
        return Math.abs(this.ready);
    }
*/
    start() {
        // this.ready = 50;

        if (!this.isAttack) {
            this.lastAttackTime = this.attackTime;
            this.currentAttack++;

            this.isAttack = true;

            if (this.currentAttack > this.attackAnimList.length)
                this.currentAttack = 1;
            // this.currentAttack = this.attackAnimList.length;
        }
        console.log('--> currentAttack: ', this.currentAttack);

    }

    cancel() {
        // this.ready = 1;
    }

    routeAttack() {
        //     console.log('--> routeAttack: ', this.attackAnimList[this.currentAttack - 1]);
        return this.attackAnimList[this.currentAttack - 1](this.ready);
    }

    update(entity, deltaTime) {
        this.attackTime += deltaTime;

        // console.log('-- attackTime: ', this.attackTime);

        if (this.attackTime - this.lastAttackTime > this.maxComboDelay - 0.2) {
            this.isAttack = false;
        }

        if (this.attackTime - this.lastAttackTime > this.maxComboDelay) {
            // console.log('********************************', this.currentAttack);
            this.currentAttack = 0;
            this.ready = 1;
            // this.isAttack = false;
        }
        // console.log('- ready:', this.ready);
        this.ready++;


    }

}
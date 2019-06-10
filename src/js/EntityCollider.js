/***
 * file name : EntityCollider.js
 * description : webcade EntityCollider Class
 * create date : 2018-04-25
 * creator : saltgamer
 ***/

export default class EntityCollider {
    constructor(entities) {
        this.entities = entities;
    }

    check(subject) {
        this.entities.forEach(candidate => {
            if (subject === candidate) {
                return;
            }

            if (subject.bounds.overlaps(candidate.bounds)) {
                subject.collides(candidate);
                candidate.collides(subject);
            }
        });
    }

}
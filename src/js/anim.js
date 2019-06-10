/***
 * file name : anim.js
 * description : webcade anim object
 * create date : 2018-04-24
 * creator : saltgamer
 ***/

export function createAnim (frames, frameLen) {
    return function resolveFrame (distance) {
        const frameIndex = Math.floor(distance / frameLen) % frames.length;
        // console.log('-frameIndex: ', frameIndex);
        const frameName = frames[frameIndex];
        return frameName;
    };

}
/***
 * file name : camera.js
 * description : webcade camera create function
 * create date : 2018-04-25
 * creator : saltgamer
 ***/

export function createCameraLayer (cameraToDraw) {
    return function drawCameraRect (context, fromCamera) {
        context.strokeStyle = 'purple';
        context.beginPath();
        context.rect(
            cameraToDraw.pos.x - fromCamera.pos.x,
            cameraToDraw.pos.y - fromCamera.pos.y,
            cameraToDraw.size.x,
            cameraToDraw.size.y
        );
        context.stroke();
    };
}
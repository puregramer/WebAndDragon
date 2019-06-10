/***
 * file name : sprites.js
 * description : webcade sprites object
 * create date : 2018-04-25
 * creator : saltgamer
 ***/

export function createSpriteLayer (entities, width = 160, height = 160) {
    const spriteBuffer = document.createElement('canvas');
    spriteBuffer.width = width;
    spriteBuffer.height = height;
    const spriteBufferContext = spriteBuffer.getContext('2d');
    
    return function drawSpriteLayer (context, camera) {
        entities.forEach(entity => {
            spriteBufferContext.clearRect(0, 0, width, height);

            entity.draw(spriteBufferContext);

            context.drawImage(spriteBuffer,
                entity.pos.x - camera.pos.x,
                entity.pos.y - camera.pos.y
                );
        });
    };
}
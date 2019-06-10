/***
 * file name : background.js
 * description : webcade background object
 * create date : 2018-04-25
 * creator : saltgamer
 ***/

import TileResolver from '../TileResolver';
import Responsive from "../Responsive";


export function createBackgroundLayer (level, tiles, sprites) {
    const resolver = new TileResolver(tiles);

    const responsive = new Responsive();

    const buffer = document.createElement('canvas');
    buffer.width = responsive.screenWidth + responsive.tileSize;
    buffer.height = responsive.screenHeight - responsive.tileSize;

    const context = buffer.getContext('2d');

    function redraw (startIndex, endIndex) {
        context.clearRect(0, 0, buffer.width, buffer.height);

        for (let x = startIndex; x <= endIndex; ++x) {
            const col = tiles.grid[x];
            if (col) {
                col.forEach((tile, y) => {
                    if (sprites.animations.has(tile.name)) {
                        sprites.drawAnim(tile.name, context, x - startIndex, y, level.totalTime);
                    } else {
                        sprites.drawTile(tile.name, context, x - startIndex, y);
                    }
                });
            }

        }
    }

    return function drawBackgroundLayer (context, camera) {
        const drawWidth = resolver.toIndex(camera.size.x);
        const drawFrom = resolver.toIndex(camera.pos.x);
        const drawTo = drawFrom + drawWidth;
        redraw(drawFrom, drawTo);

        context.drawImage(buffer,
            -camera.pos.x % 32,
            -camera.pos.y
        );
    };

}
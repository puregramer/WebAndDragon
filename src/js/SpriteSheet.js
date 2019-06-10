/***
 * file name : SpriteSheet.js
 * description : webcade SpriteSheet Class
 * create date : 2018-04-24
 * creator : saltgamer
 ***/

export default class SpriteSheet {
    constructor(image, width, height) {
        this.image = image;
        this.width = width;
        this.height = height;
        this.tiles = new Map();
        this.animations = new Map();
    }

    defineAnim(name, animation) {
        this.animations.set(name, animation);
    }

    define(name, x, y, width, height, offset) {
        const buffers = [false, true].map(flip => {
            const buffer = document.createElement('canvas');

            let offsetX = 0,
                offsetY = 0;
            /*if (offset && !flip) {
                if (offset.x) {
                    offsetX = offset.x;
                    buffer.width = width + offsetX;
                }
                if (offset.y) {
                    offsetY = offset.y;
                }


            } else if (offset && flip) {
                // offsetX = 0;
                if (offset.x) {
                    offsetX = offset.x;
                    buffer.width = width + offsetX;
                }

            }*/
            if (offset && offset.x) {
                offsetX = offset.x;
                buffer.width = width + offsetX;
            }
            if (offset && offset.y) {
                offsetY = offset.y;
            }

            buffer.height = height;

            const context = buffer.getContext('2d');

            if (flip) {
                context.scale(-1, 1);

                if (name.indexOf('run') !== -1) {
                    context.translate(-width - 40, 0);
                } else {
                    context.translate(-width - offsetX, 0);
                }
                // context.translate(-width, 0);

            }

            context.drawImage(
                this.image,
                x,
                y,
                width,
                height,
                // 0,
                (flip ? 0 : offsetX),
                offsetY,
                width,
                height
            );
            return buffer;
        });

        this.tiles.set(name, buffers);
    }

    defineTile(name, x, y) {
        this.define(name, x * this.width, y * this.height, this.width, this.height);
    }

    draw(name, context, x, y, flip = false) {
        const buffer = this.tiles.get(name)[flip ? 1 : 0];
        context.drawImage(buffer, x, y);

    }

    drawAnim(name, context, x, y, distance) {
        const animation = this.animations.get(name);
        this.drawTile(animation(distance), context, x, y);
    }

    drawTile(name, context, x, y) {
        this.draw(name, context, x * this.width, y * this.height);
    }

}
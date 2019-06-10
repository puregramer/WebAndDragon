/***
 * file name : VirtualPad.js
 * description : webcade VirtualPad Class
 * create date : 2018-04-30
 * creator : saltgamer
 ***/
import TouchHandler from './TouchHandler';
import TouchContainer from './TouchContainer';
import Pad from './Pad';

export default class VirtualPad {
    constructor(options) {
        const defaults = {
            container: document.body,
            left: 0,
            top: 0,
            width: 100,
            height: 100,
            trackSize: 180,
            buttonSize: 100,
            buttonColor: '#fff',
            buttonStrokeColor: '#fff',
            buttonStrokeSize: 2,
            trackColor: '#ff9900',
            trackStrokeColor: '#fff',
            trackStrokeSize: 2,
            touchHandler: null

        };

        this.keyStates = new Map();

        this.options = Object.assign({}, defaults, options);

        if (!this.options.touchHandler) {
            this.options.touchHandler = new TouchHandler({
                element: this.options.container
            });
        }

        this.container = new TouchContainer();

        this.pad = new Pad({
            trackingElement: this.options.container
        });

        window.addEventListener('resize', () => this.pad.createCanvas(), false);

        this.options.touchHandler.addPad(this);

    }

    start(touch) {
        this.pad.setPosition(touch.pageX, touch.pageY);
        this.pad.show();
        this.pad.start();
    }

    move(x, y) {
        this.pad.move(x, y);
    }

    end() {
        this.pad.hide();
        this.pad.end();
    }

    draw() {
        this.pad.draw();
    }

    unbind() {
        this.options.touchHandler.removePad(this);
    }

    getAxis() {
        return this.pad.getAxis();
    }

}

export function initPadContainer(canvas) {
    console.log('--> initPadContainer');
    let padContainer = document.querySelector('#padContainer');

    /*padContainer.style.width = canvas.width + 'px';
    padContainer.style.height = canvas.height + 'px';*/
    padContainer.style.left = canvas.offsetLeft + 'px';
}

export function isTouchDevice() {
    if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
        return true;
    }
}

export function bindTouchEvent(vPad, hero) {
    if (isTouchDevice()) {
        let axis = vPad.getAxis();
        if (axis.x !== 0 || axis.y !== 0) {
            console.log('-> axis2: ', axis);
            if (vPad.keyStates.get(axis.dx) === 1) {
                return;
            }
            vPad.keyStates.clear();

            hero.go.dir = 0;
            hero.go.dir += axis.dx;
            vPad.keyStates.set(axis.dx, 1);

        } else {
            hero.go.dir = 0;
            vPad.keyStates.clear();
        }
    }
}




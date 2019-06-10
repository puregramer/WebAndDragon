/***
 * file name : TouchHandler.js
 * description : webcade TouchHandler Class
 * create date : 2018-04-30
 * creator : saltgamer
 ***/

export default class TouchHandler {
    constructor(options) {
        let defaults = {
            element: document.body,
            start: (ev) => {},
            move: (ev) => {},
            end: (ev) => {},
            width: 100,
            height: 100,
            left: 0,
            top: 0,
            pads: []
        };

        this.currnetTouches = [];
        this.options = Object.assign({}, defaults, options);

        this.startFn = (ev) => this.start(ev);
        this.moveFn = (ev) => this.move(ev);
        this.endFn = (ev) => this.end(ev);

        this.bindEvents();

    }

    addPad(pad) {
        this.options.pads.push(pad);
    }

    removePad(pad) {
        let index = this.options.pads.indexOf(pad);
        if (index >= -1) {
            this.options.pads.splice(index, 1);
        }
    }

    bindEvents() {
        let el = this.options.element;
        console.log( this.options);
        el.addEventListener('touchstart', this.startFn, {passive: false});
        el.addEventListener('touchmove', this.moveFn, {passive: false});
        el.addEventListener('touchend', this.endFn, {passive: false});
    }

    unbindEvents() {
        let el = this.options.element;
        el.removeEventListener('touchstart', this.startFn);
        el.removeEventListener('touchmove', this.moveFn);
        el.removeEventListener('touchend', this.endFn);
    }

    inRange(x, y, pad) {
        let containerBounds = this.options.element.getBoundingClientRect(),
            width = containerBounds.width * (pad.options.width / 100),
            height = containerBounds.height * (pad.options.height / 100),
            xMin = containerBounds.width * (pad.options.left / 100),
            yMin = containerBounds.width * (pad.options.top / 100);

        if (x < xMin || x > xMin + width) return false;
        if (y < yMin || y > yMin + height) return false;
        return true;
    }

    findPad(x, y) {
        let result = false;
        this.options.pads.forEach(pad => {
            if (this.inRange(x, y, pad)) {
                result = pad;
            }
        });
        return result;
    }

    start(event) {
        for (let index = 0; index < event.targetTouches.length; index++) {
            let touch = event.targetTouches[index];
            if (this.addTouchToPad(touch)) {
                event.preventDefault();
                return false;
            }
        }
    }

    hasCurrentTouch(pad) {
        for (let index = 0; index < this.currnetTouches.length; index++) {
            let currentTouch = this.currnetTouches[index];
            if (currentTouch.pad === pad) {
                return true;
            }
        }
        return false;
    }

    addTouchToPad(touch) {
        let pad = this.findPad(touch.pageX, touch.pageY);
        if (this.hasCurrentTouch(pad)) return false;
        if (pad && !this.findTouch(this.currnetTouches, touch.identifier)) {
            this.currnetTouches.push({
                identifier: touch.identifier,
                pad: pad,
                x: touch.pageX,
                y: touch.pageY
            });
            pad.start(touch);
            return true;
        }
        return false;
    }

    findTouch(touches, touchIdentifier) {
        for (let index = 0; index < touches.length; index++) {
            if (touches[index].identifier === touchIdentifier) {
                return touches[index];
            }
        }
        return false;
    }

    endOldTouches(touches) {
        for (let i = 0; i < this.currnetTouches.length; i++) {
            if (!this.findTouch(touches, this.currnetTouches[i].identifier)) {
                this.currnetTouches[i].pad.end();
                this.currnetTouches.splice(i, 1);
            }
        }
    }

    move(event) {
        if (!this.currnetTouches.length) return;
        for (let i = 0; i < event.changedTouches.length; i++) {
            let changedTouch = event.changedTouches[i],
                existingTouch = this.findTouch(this.currnetTouches, changedTouch.identifier);
            if (existingTouch) {
                let changeX = changedTouch.pageX - existingTouch.x;
                let changeY = changedTouch.pageY - existingTouch.y;

                existingTouch.pad.move(changeX, changeY);
                existingTouch.x = changedTouch.pageX;
                existingTouch.y = changedTouch.pageY;

                event.preventDefault();
                return false;
            }
        }
    }

    end(event) {
        if (!this.currnetTouches.length) return;
        this.endOldTouches(event.targetTouches);
        event.preventDefault();

        return false;
    }



}

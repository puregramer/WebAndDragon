/***
 * file name : Pad.js
 * description : webcade Pad Class
 * create date : 2018-04-30
 * creator : saltgamer
 ***/

export default class Pad {
    constructor(options) {
        let defaults = {
            buttonColor: 'rgba(255, 255, 255, 0.2)',
            trackColor: 'rgba(255, 255, 255, 0.2)',
            // buttonSize: 12.5,
            buttonSize: 120,
            buttonStrokeSize: 0,
            // trackSize: 15,
            trackSize: 200,
            trackStrokeSize: 2,
            trackStrokeColor: 'rgba(255, 255, 255, 0.2)',
            trackingElement: document.body,
        };

        this.options = Object.assign({}, defaults, options);
        this._isAttached = false;
        this.x = 0;
        this.y = 0;

        this.createCanvas();

    }

    createCanvas() {
        this.ratio = window.devicePixelRatio;
        this.canvas = document.createElement('canvas');
        const dp1 = this.options.trackSize + (this.options.trackStrokeSize * 2);
        this.canvas.width = dp1 * this.ratio;
        this.canvas.height = dp1 * this.ratio;
        this.canvas.style.width = dp1 + 'px';
        this.canvas.style.height = dp1 + 'px';
        this.context = this.canvas.getContext('2d');

    }

    start(event) {
        if (!this._isAttached) return;
        this.x = 0;
        this.y = 0;
        this.px = 0;
        this.py = 0;
    }

    getAngle(x, y) {
        if (x === 0) {
            return 0;
        }
        return Math.atan(y / x);
    }

    getMultiplier(x) {
        return x < 0 ? -1 : 1;
    }

    getAxisDelta(x) {
        let multiplier = this.getMultiplier(x);
        return x * multiplier > 0.5 ? 1 * multiplier : 0
    }

    getAxis() {
        return {
            x: this.x,
            y: this.y,
            dx: this.getAxisDelta(this.x),
            dy: this.getAxisDelta(this.y)
        }
    }

    move(changeX, changeY) {
        if (!this._isAttached) return;
        this.px = this.px + changeX;
        this.py = this.py + changeY;

        let mag = Math.sqrt((this.px * this.px) + (this.py * this.py)),
            rads = this.getAngle(this.px, this.py),
            maxX = Math.abs(Math.cos(rads)),
            maxY = Math.abs(Math.sin(rads));

        if (maxX === 1) {
            maxY = 1;
        }

        let trackRange = (this.options.trackSize / (2 * this.ratio)),
            fx = Math.min(maxX, this.px / trackRange),
            fy = Math.min(maxY, this.py / trackRange);

        this.x = Math.max(-maxX, fx);
        this.y = Math.max(-maxY, fy);

    }

    end(event) {
        this.x = 0;
        this.y = 0;
    }

    hide() {
        this._isAttached = false;
        this.canvas.parentNode.removeChild(this.canvas);
    }

    show() {
        this._isAttached = true;
        this.options.trackingElement.appendChild(this.canvas);
    }

    setPosition(x, y) {
        this.canvas.style.position = 'absolute';
        let trackSize = (this.options.trackSize / (2 * this.ratio));

        this.canvas.style.left = x - trackSize + 'px';
        this.canvas.style.top = y - trackSize + 'px';
    }

    draw() {
        if (!this._isAttached) return;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const trackSize = this.options.trackSize / 2;
        this.drawCircle(
            trackSize + this.options.trackStrokeSize,
            trackSize + this.options.trackStrokeSize,
            trackSize,
            this.options.trackColor,
            this.options.trackStrokeSize * this.ratio,
            this.options.trackStrokeColor
        );

        let trackRange = (this.options.trackSize - this.options.buttonSize) / 2;

        this.drawCircle(
            trackSize + (this.x * trackRange) + this.options.trackStrokeSize,
            trackSize + (this.y * trackRange) + this.options.trackStrokeSize,
            (this.options.buttonSize / 2),
            this.options.buttonColor,
            this.options.buttonStrokeSize * this.ratio,
            this.options.buttonStrokeColor
        );
    }

    drawCircle(x, y, radius, fillColor, strokeSize, strokeColor) {
        this.context.beginPath();
        this.context.arc(x, y, radius, 0, 2 * Math.PI, false);
        this.context.fillStyle = fillColor;
        this.context.lineWidth = strokeSize;
        this.context.strokeStyle = strokeColor;
        this.context.fill();
        this.context.stroke();

    }


}
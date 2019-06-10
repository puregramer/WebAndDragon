/***
 * file name : VirtualButton.js
 * description : webcade VirtualButton Class
 * create date : 2018-05-04
 * creator : saltgamer
 ***/

export default class VirtualButton {
    constructor(options) {
        const defaults = {
            container: document.body,
            x: 50,
            y: 200,
            width: 50,
            height: 50,
            buttonSize: 50,
            strokeSize: 2,
            buttonColor: 'rgba(255, 255, 255, 0.4)',
            strokeColor: 'rgba(255, 255, 255, 0.3)',
            buttonEvent: (ev) => {},
        };

        this.options = Object.assign({}, defaults, options);

        this.createCanvas();
        this.setPosition(this.options.x, this.options.y);

        this.listenTo();
    }

    show() {
        this.draw();
        this.options.container.appendChild(this.canvas);
    }

    setPosition(x, y) {
        this.canvas.style.position = 'absolute';

        this.canvas.style.bottom = x + 'px';
        this.canvas.style.right = y + 'px';
    }

    createCanvas() {
        this.ratio = window.devicePixelRatio;
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.options.width * this.ratio;
        this.canvas.height = this.options.height * this.ratio;
        this.context = this.canvas.getContext('2d');
    }

    draw() {
        this.drawButton(
            this.options.width,
            this.options.height,
            this.options.buttonSize,
            this.options.buttonColor,
            this.options.strokeSize,
            this.options.strokeColor
        );
    }

    drawButton(x, y, radius, fillColor, strokeSize, strokeColor) {
        this.context.beginPath();
        this.context.arc(x, y, radius, 0, 2 * Math.PI, false);
        this.context.fillStyle = fillColor;
        this.context.lineWidth = strokeSize;
        this.context.strokeStyle = strokeColor;
        this.context.fill();
        this.context.stroke();

    }

    listenTo() {
        ['touchstart', 'touchend'].forEach(eventName => {
            this.canvas.addEventListener(eventName, event => {
                this.options.buttonEvent(event);
            });
        });
    }

}
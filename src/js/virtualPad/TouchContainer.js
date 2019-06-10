/***
 * file name : TouchContainer.js
 * description : webcade TouchContainer Class
 * create date : 2018-04-30
 * creator : saltgamer
 ***/

export default class TouchContainer {
    constructor(options) {
        let defaults = {
            container: document.body,
            width: 50,
            height: 50,
            left: 0,
            top: 50
        };

        this.options = Object.assign({}, defaults, options);
        this.createElement();

    }

    createElement() {
        this.el = document.createElement('div');
        let rect = this.options.container.getBoundingClientRect();
        this.el.style.position = 'absolute';
        this.el.style.width = this.options.width + 'vw';
        this.el.style.height = this.options.height + 'vh';
        this.el.style.left = this.options.left + 'vw';
        this.el.style.top = this.options.top + 'vh';
        this.el.style.backgroundColor = '#000';

    }

    show() {
        this.options.container.appendChild(this.el);
    }

    hide() {
        this.options.container.removeChild(this.el);
    }
}
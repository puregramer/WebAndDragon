/***
 * file name : KeyboardState.js
 * description : webcade KeyboardState Class
 * create date : 2018-04-25
 * creator : saltgamer
 ***/

const PRESSED = 1;
const RELEASED = 0;

export default class KeyboardState {
    constructor() {
        this.keyStates = new Map();

        this.keyMap = new Map();
    }

    addMapping(code, callBack) {
        this.keyMap.set(code, callBack);
    }

    handleEvent(event) {
        const {keyCode} = event;

      /*  console.log('-> handleEvent event: ');
        console.log(event);
        console.log('-> handleEvent code: ', keyCode);*/

        if (!this.keyMap.has(keyCode)) {
            return;
        }

        event.preventDefault();

        const keyState = event.type === 'keydown' ? PRESSED : RELEASED;

        // console.log('--> keyStates.get(keyCode): ', this.keyStates.get(keyCode));
        if (this.keyStates.get(keyCode) === keyState) {
            return;
        }
        // console.log('--> this.keyStates: ', this.keyStates);

        this.keyStates.set(keyCode, keyState);
        this.keyMap.get(keyCode)(keyState);

    }

    listenTo(window) {
        ['keydown', 'keyup'].forEach(eventName => {
            window.addEventListener(eventName, event => {
                this.handleEvent(event);
            });
        });
    }
}
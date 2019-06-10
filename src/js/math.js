/***
 * file name : math.js
 * description : webcade math class
 * create date : 2018-04-25
 * creator : saltgamer
 ***/

export class Matrix {
    constructor() {
        this.grid = [];
    }

    forEach(callBack) {
        this.grid.forEach((column, x) => {
            column.forEach((value, y) => {
                callBack(value, x, y);

            });
        });
    }

    get(x, y) {
        const col = this.grid[x];
        if (col) {
            return col[y];
        }
        return undefined;
    }

    set(x, y, value) {
        if (!this.grid[x]) {
            this.grid[x] = [];
        }
        this.grid[x][y] = value;
    }
}

export class Vec2 {
    constructor(x, y) {
        this.set(x, y);
    }

    set(x, y) {
        this.x = x;
        this.y = y;
    }
}




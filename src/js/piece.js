const PIECE_TYPES = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];

const PIECES = {
    I: {
        shapes: [
            [[1, 1, 1, 1]],
            [[1], [1], [1], [1]]
        ],
        color: '#00FFFF'
    },
    O: {
        shapes: [
            [[1, 1], [1, 1]]
        ],
        color: '#FFFF00'
    },
    T: {
        shapes: [
            [[0, 1, 0], [1, 1, 1]],
            [[1, 0], [1, 1], [1, 0]],
            [[1, 1, 1], [0, 1, 0]],
            [[0, 1], [1, 1], [0, 1]]
        ],
        color: '#800080'
    },
    S: {
        shapes: [
            [[0, 1, 1], [1, 1, 0]],
            [[1, 0], [1, 1], [0, 1]]
        ],
        color: '#00FF00'
    },
    Z: {
        shapes: [
            [[1, 1, 0], [0, 1, 1]],
            [[0, 1], [1, 1], [1, 0]]
        ],
        color: '#FF0000'
    },
    J: {
        shapes: [
            [[1, 0, 0], [1, 1, 1]],
            [[1, 1], [1, 0], [1, 0]],
            [[1, 1, 1], [0, 0, 1]],
            [[0, 1], [0, 1], [1, 1]]
        ],
        color: '#0000FF'
    },
    L: {
        shapes: [
            [[0, 0, 1], [1, 1, 1]],
            [[1, 0], [1, 0], [1, 1]],
            [[1, 1, 1], [1, 0, 0]],
            [[1, 1], [0, 1], [0, 1]]
        ],
        color: '#FFA500'
    }
};

function getRandomPieceType() {
    return PIECE_TYPES[Math.floor(Math.random() * PIECE_TYPES.length)];
}

class Piece {
    constructor(type) {
        this.type = type;
        this.x = 3;
        this.y = 0;
        this.rotation = 0;
        this.color = PIECES[type].color;
    }

    getShape() {
        const shapes = PIECES[this.type].shapes;
        return shapes[this.rotation % shapes.length];
    }

    getBlocks() {
        const shape = this.getShape();
        const blocks = [];
        for (let row = 0; row < shape.length; row++) {
            for (let col = 0; col < shape[row].length; col++) {
                if (shape[row][col]) {
                    blocks.push({ x: this.x + col, y: this.y + row });
                }
            }
        }
        return blocks;
    }

    clone() {
        const piece = new Piece(this.type);
        piece.x = this.x;
        piece.y = this.y;
        piece.rotation = this.rotation;
        return piece;
    }
}

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

class Board {
    constructor() {
        this.width = BOARD_WIDTH;
        this.height = BOARD_HEIGHT;
        this.grid = this.createEmptyGrid();
    }

    createEmptyGrid() {
        const grid = [];
        for (let row = 0; row < this.height; row++) {
            grid.push(new Array(this.width).fill(null));
        }
        return grid;
    }

    isValidPosition(piece, offsetX = 0, offsetY = 0, newRotation = null) {
        const testPiece = piece.clone();
        testPiece.x += offsetX;
        testPiece.y += offsetY;
        if (newRotation !== null) {
            testPiece.rotation = newRotation;
        }

        const blocks = testPiece.getBlocks();
        for (const block of blocks) {
            if (block.x < 0 || block.x >= this.width) {
                return false;
            }
            if (block.y >= this.height) {
                return false;
            }
            if (block.y >= 0 && this.grid[block.y][block.x] !== null) {
                return false;
            }
        }
        return true;
    }

    lockPiece(piece) {
        const blocks = piece.getBlocks();
        for (const block of blocks) {
            if (block.y >= 0) {
                this.grid[block.y][block.x] = piece.color;
            }
        }
    }

    clearLines() {
        let linesCleared = 0;
        for (let row = this.height - 1; row >= 0; row--) {
            if (this.grid[row].every(cell => cell !== null)) {
                this.grid.splice(row, 1);
                this.grid.unshift(new Array(this.width).fill(null));
                linesCleared++;
                row++;
            }
        }
        return linesCleared;
    }

    reset() {
        this.grid = this.createEmptyGrid();
    }
}

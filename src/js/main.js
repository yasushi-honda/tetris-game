class Game {
    constructor(canvas) {
        this.board = new Board();
        this.renderer = new Renderer(canvas);
        this.inputHandler = new InputHandler(this);
        this.inputHandler.init();

        this.currentPiece = null;
        this.score = 0;
        this.isGameOver = false;
        this.isPaused = false;
        this.isRunning = false;
        this.lastDropTime = 0;
        this.dropInterval = 1000;
        this.animationId = null;

        this.scoreElement = document.getElementById('score');
    }

    start() {
        this.reset();
        this.isRunning = true;
        this.spawnPiece();
        this.lastDropTime = performance.now();
        this.gameLoop();
    }

    reset() {
        this.board.reset();
        this.currentPiece = null;
        this.score = 0;
        this.isGameOver = false;
        this.isPaused = false;
        this.updateScoreDisplay();

        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    spawnPiece() {
        const type = getRandomPieceType();
        this.currentPiece = new Piece(type);

        if (!this.board.isValidPosition(this.currentPiece)) {
            this.gameOver();
        }
    }

    gameLoop(currentTime = 0) {
        if (!this.isRunning) return;

        if (!this.isPaused && !this.isGameOver) {
            if (currentTime - this.lastDropTime > this.dropInterval) {
                this.drop();
                this.lastDropTime = currentTime;
            }
        }

        this.render();
        this.animationId = requestAnimationFrame((time) => this.gameLoop(time));
    }

    drop() {
        if (!this.movePiece(0, 1)) {
            this.lockPiece();
        }
    }

    movePiece(dx, dy) {
        if (this.isPaused || this.isGameOver || !this.currentPiece) return false;

        if (this.board.isValidPosition(this.currentPiece, dx, dy)) {
            this.currentPiece.x += dx;
            this.currentPiece.y += dy;
            return true;
        }
        return false;
    }

    rotatePiece() {
        if (this.isPaused || this.isGameOver || !this.currentPiece) return;

        const shapes = PIECES[this.currentPiece.type].shapes;
        const newRotation = (this.currentPiece.rotation + 1) % shapes.length;

        if (this.board.isValidPosition(this.currentPiece, 0, 0, newRotation)) {
            this.currentPiece.rotation = newRotation;
        }
    }

    softDrop() {
        if (this.movePiece(0, 1)) {
            this.score += 1;
            this.updateScoreDisplay();
        }
    }

    hardDrop() {
        if (this.isPaused || this.isGameOver || !this.currentPiece) return;

        let dropDistance = 0;
        while (this.board.isValidPosition(this.currentPiece, 0, 1)) {
            this.currentPiece.y++;
            dropDistance++;
        }
        this.score += dropDistance * 2;
        this.updateScoreDisplay();
        this.lockPiece();
    }

    lockPiece() {
        this.board.lockPiece(this.currentPiece);
        const linesCleared = this.board.clearLines();
        this.addLineScore(linesCleared);
        this.spawnPiece();
    }

    addLineScore(lines) {
        const scoreTable = [0, 100, 300, 500, 800];
        this.score += scoreTable[lines] || 0;
        this.updateScoreDisplay();
    }

    updateScoreDisplay() {
        if (this.scoreElement) {
            this.scoreElement.textContent = this.score;
        }
    }

    togglePause() {
        if (this.isGameOver) return;
        this.isPaused = !this.isPaused;
    }

    gameOver() {
        this.isGameOver = true;
        this.isRunning = false;
    }

    render() {
        this.renderer.clear();
        this.renderer.drawGrid();
        this.renderer.drawBoard(this.board);

        if (this.currentPiece) {
            this.renderer.drawPiece(this.currentPiece);
        }

        if (this.isGameOver) {
            this.renderer.drawGameOver();
        } else if (this.isPaused) {
            this.renderer.drawPaused();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const startBtn = document.getElementById('startBtn');
    const game = new Game(canvas);

    game.render();

    startBtn.addEventListener('click', () => {
        game.start();
        startBtn.textContent = 'Restart';
    });
});

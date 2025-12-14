class InputHandler {
    constructor(game) {
        this.game = game;
    }

    init() {
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
    }

    handleKeyDown(event) {
        if (this.game.isGameOver) return;

        switch (event.code) {
            case 'ArrowLeft':
                event.preventDefault();
                this.game.movePiece(-1, 0);
                break;
            case 'ArrowRight':
                event.preventDefault();
                this.game.movePiece(1, 0);
                break;
            case 'ArrowDown':
                event.preventDefault();
                this.game.softDrop();
                break;
            case 'ArrowUp':
                event.preventDefault();
                this.game.rotatePiece();
                break;
            case 'Space':
                event.preventDefault();
                this.game.hardDrop();
                break;
            case 'KeyP':
                event.preventDefault();
                this.game.togglePause();
                break;
        }
    }
}

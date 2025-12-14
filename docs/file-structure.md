# ファイル構成

## ディレクトリ構造

```
rennsyuuyou-202512/
├── docs/
│   ├── design.md           # 設計書（本ドキュメント）
│   └── file-structure.md   # ファイル構成（このファイル）
├── src/
│   ├── index.html          # メインHTMLファイル
│   ├── css/
│   │   └── style.css       # スタイルシート
│   └── js/
│       ├── main.js         # エントリーポイント、Gameクラス
│       ├── board.js        # Boardクラス
│       ├── piece.js        # Pieceクラス、テトリミノ定義
│       ├── input.js        # InputHandlerクラス
│       └── renderer.js     # Rendererクラス
└── README.md               # プロジェクト説明（任意）
```

## 各ファイルの役割

### src/index.html

メインのHTMLファイル。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tetris</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="game-container">
        <h1>TETRIS</h1>
        <div class="game-wrapper">
            <canvas id="gameCanvas"></canvas>
            <div class="info-panel">
                <div class="score-display">
                    <span>Score:</span>
                    <span id="score">0</span>
                </div>
                <div class="controls-info">
                    <h3>操作方法</h3>
                    <p>← → : 移動</p>
                    <p>↑ : 回転</p>
                    <p>↓ : ソフトドロップ</p>
                    <p>Space : ハードドロップ</p>
                    <p>P : ポーズ</p>
                </div>
            </div>
        </div>
        <button id="startBtn">Start</button>
    </div>

    <script src="js/piece.js"></script>
    <script src="js/board.js"></script>
    <script src="js/renderer.js"></script>
    <script src="js/input.js"></script>
    <script src="js/main.js"></script>
</body>
</html>
```

### src/css/style.css

ゲームのスタイル定義。

- ゲームコンテナのレイアウト
- Canvasのボーダー・背景
- 情報パネルのスタイル
- ボタンのスタイル
- レスポンシブ対応（任意）

### src/js/piece.js

テトリミノの定義とクラス。

**定数:**
- `PIECES`: 7種類のテトリミノの形状と色の定義
- `PIECE_TYPES`: ピースタイプの配列 ['I', 'O', 'T', 'S', 'Z', 'J', 'L']

**クラス:**
- `Piece`: テトリミノを表すクラス

**エクスポート:**
- `Piece`クラス
- `PIECES`定数
- `getRandomPieceType()`関数

### src/js/board.js

ゲームボードの管理。

**定数:**
- `BOARD_WIDTH`: 10
- `BOARD_HEIGHT`: 20

**クラス:**
- `Board`: ゲームフィールドを管理するクラス

**エクスポート:**
- `Board`クラス
- `BOARD_WIDTH`, `BOARD_HEIGHT`定数

### src/js/renderer.js

Canvas描画処理。

**定数:**
- `CELL_SIZE`: 30
- `COLORS`: 各種色定義

**クラス:**
- `Renderer`: 描画を担当するクラス

**エクスポート:**
- `Renderer`クラス

### src/js/input.js

キーボード入力処理。

**クラス:**
- `InputHandler`: キー入力を処理するクラス

**エクスポート:**
- `InputHandler`クラス

### src/js/main.js

エントリーポイントとゲームロジック。

**クラス:**
- `Game`: ゲーム全体を管理するクラス

**初期化:**
- DOMContentLoadedイベントでゲームインスタンス生成
- スタートボタンのイベントリスナー設定

## ファイル読み込み順序

依存関係を考慮した読み込み順序:

1. `piece.js` - 依存なし
2. `board.js` - 依存なし
3. `renderer.js` - 依存なし
4. `input.js` - Gameクラスに依存（後から参照設定）
5. `main.js` - 上記すべてに依存

## グローバル変数の管理

ES Modulesを使用しない場合、各クラスはグローバルスコープに配置される。
名前空間の衝突を避けるため、クラス名はプロジェクト固有の命名とする。

代替案としてES Modulesを使用する場合:
- `type="module"`をscriptタグに追加
- 各ファイルでexport/importを使用
- ローカルサーバーでの実行が必要

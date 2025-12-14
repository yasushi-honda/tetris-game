# ファイル構成

## ディレクトリ構造

```
rennsyuuyou-202512/
├── docs/
│   ├── design.md               # ゲーム設計書
│   ├── file-structure.md       # ファイル構成（このファイル）
│   └── firebase-hosting-plan.md # Firebase Hostingデプロイ計画・実施記録
├── src/                        # Firebase Hostingの公開ディレクトリ
│   ├── index.html              # メインHTMLファイル
│   ├── css/
│   │   └── style.css           # スタイルシート
│   └── js/
│       ├── main.js             # エントリーポイント、Gameクラス
│       ├── board.js            # Boardクラス
│       ├── piece.js            # Pieceクラス、テトリミノ定義
│       ├── input.js            # InputHandlerクラス
│       └── renderer.js         # Rendererクラス
├── .firebase/                  # Firebaseキャッシュ（gitignore対象）
├── .firebaserc                 # Firebaseプロジェクト設定
├── .gitignore                  # Git除外設定
├── firebase.json               # Firebase Hosting設定
└── README.md                   # プロジェクト説明
```

## 各ファイルの役割

### ルートディレクトリ

#### firebase.json

Firebase Hostingの設定ファイル。

```json
{
  "hosting": {
    "public": "src",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ]
  }
}
```

#### .firebaserc

Firebaseプロジェクトの設定。

```json
{
  "projects": {
    "default": "tetris-game-202512"
  }
}
```

#### .gitignore

Gitで管理しないファイルの設定。

```
.firebase/
```

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

### src/js/piece.js

テトリミノの定義とクラス。

**定数:**
- `PIECES`: 7種類のテトリミノの形状と色の定義
- `PIECE_TYPES`: ピースタイプの配列 ['I', 'O', 'T', 'S', 'Z', 'J', 'L']

**クラス:**
- `Piece`: テトリミノを表すクラス

**関数:**
- `getRandomPieceType()`: ランダムなピースタイプを返す

### src/js/board.js

ゲームボードの管理。

**定数:**
- `BOARD_WIDTH`: 10
- `BOARD_HEIGHT`: 20

**クラス:**
- `Board`: ゲームフィールドを管理するクラス

### src/js/renderer.js

Canvas描画処理。

**定数:**
- `CELL_SIZE`: 30

**クラス:**
- `Renderer`: 描画を担当するクラス

### src/js/input.js

キーボード入力処理。

**クラス:**
- `InputHandler`: キー入力を処理するクラス

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
3. `renderer.js` - BOARD_WIDTH, BOARD_HEIGHTに依存
4. `input.js` - Gameクラスに依存（後から参照設定）
5. `main.js` - 上記すべてに依存

## グローバル変数の管理

各クラスはグローバルスコープに配置される。
名前空間の衝突を避けるため、クラス名はプロジェクト固有の命名とする。

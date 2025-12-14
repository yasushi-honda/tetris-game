# テトリス設計書

## 概要

Webブラウザで動作する一人プレイ用テトリスゲーム。
Vanilla JavaScript + HTML5 Canvas で実装する。

## 技術スタック

- HTML5
- CSS3
- JavaScript (ES6+)
- HTML5 Canvas API

## ゲーム仕様

### フィールド

- 幅: 10マス
- 高さ: 20マス（上部に見えない2マス分のバッファあり）
- 1マスのサイズ: 30px × 30px

### テトリミノ（ピース）

7種類のテトリミノを実装:

| 名前 | 形状 | 色 |
|------|------|-----|
| I | ████ | シアン (#00FFFF) |
| O | ██<br>██ | 黄色 (#FFFF00) |
| T | ███<br> █ | 紫 (#800080) |
| S |  ██<br>██ | 緑 (#00FF00) |
| Z | ██<br> ██ | 赤 (#FF0000) |
| J | █<br>███ | 青 (#0000FF) |
| L |   █<br>███ | オレンジ (#FFA500) |

### 操作方法

| キー | 動作 |
|------|------|
| ← (ArrowLeft) | 左移動 |
| → (ArrowRight) | 右移動 |
| ↓ (ArrowDown) | ソフトドロップ（加速落下） |
| ↑ (ArrowUp) | 右回転 |
| Space | ハードドロップ（即座に落下） |
| P | ポーズ/再開 |

### ゲームルール

1. **落下**: ピースは一定間隔で1マス下に落下する
2. **固定**: ピースが底または他のブロックに接触し、移動できなくなると固定される
3. **ライン消去**: 横一列がすべて埋まると消去され、上のブロックが落下する
4. **ゲームオーバー**: 新しいピースが出現位置に配置できない場合

### スコアリング

| アクション | 得点 |
|------------|------|
| 1ライン消去 | 100点 |
| 2ライン消去 | 300点 |
| 3ライン消去 | 500点 |
| 4ライン消去（テトリス） | 800点 |
| ソフトドロップ | 1点/マス |
| ハードドロップ | 2点/マス |

### 落下速度

初期落下間隔は1000ms（1秒）。レベルアップの概念は基本機能には含めない。

## アーキテクチャ

### モジュール構成

```
src/
├── index.html      # メインHTML
├── css/
│   └── style.css   # スタイルシート
└── js/
    ├── main.js     # エントリーポイント、ゲームループ
    ├── board.js    # ゲームボード管理
    ├── piece.js    # テトリミノ定義・操作
    ├── input.js    # キーボード入力処理
    └── renderer.js # Canvas描画処理
```

### クラス設計

#### Game クラス (main.js)

ゲーム全体を管理するメインクラス。

```javascript
class Game {
    constructor(canvas)

    // プロパティ
    board           // Board インスタンス
    currentPiece    // 現在操作中のピース
    score           // 現在のスコア
    isGameOver      // ゲームオーバーフラグ
    isPaused        // ポーズフラグ
    lastDropTime    // 最後の落下時刻
    dropInterval    // 落下間隔(ms)

    // メソッド
    start()         // ゲーム開始
    update()        // ゲーム状態更新
    render()        // 描画
    gameLoop()      // メインループ
    spawnPiece()    // 新しいピース生成
    lockPiece()     // ピースを固定
    clearLines()    // ライン消去判定・処理
    gameOver()      // ゲームオーバー処理
    pause()         // ポーズ切り替え
    reset()         // ゲームリセット
}
```

#### Board クラス (board.js)

ゲームフィールドを管理。

```javascript
class Board {
    constructor(width, height)

    // プロパティ
    width           // フィールド幅
    height          // フィールド高さ
    grid            // 2次元配列 [y][x]

    // メソッド
    isValidPosition(piece, x, y, rotation)  // 位置の有効性チェック
    lockPiece(piece)                        // ピースをグリッドに固定
    clearLines()                            // 埋まったラインを消去、消去数を返す
    getGrid()                               // グリッド取得
    reset()                                 // ボードリセット
}
```

#### Piece クラス (piece.js)

テトリミノを表現。

```javascript
class Piece {
    constructor(type)

    // プロパティ
    type            // ピースタイプ (I, O, T, S, Z, J, L)
    x               // X座標
    y               // Y座標
    rotation        // 回転状態 (0-3)
    shape           // 現在の形状（2次元配列）
    color           // 色

    // メソッド
    moveLeft()      // 左移動
    moveRight()     // 右移動
    moveDown()      // 下移動
    rotate()        // 回転
    getBlocks()     // 現在位置の全ブロック座標を取得
}

// テトリミノ定義（形状と色）
const PIECES = {
    I: { shapes: [...], color: '#00FFFF' },
    O: { shapes: [...], color: '#FFFF00' },
    // ...
}
```

#### InputHandler クラス (input.js)

キーボード入力を処理。

```javascript
class InputHandler {
    constructor(game)

    // プロパティ
    game            // Game インスタンス参照

    // メソッド
    init()          // イベントリスナー登録
    handleKeyDown(event)  // キー押下処理
}
```

#### Renderer クラス (renderer.js)

Canvas への描画を担当。

```javascript
class Renderer {
    constructor(canvas, cellSize)

    // プロパティ
    ctx             // Canvas 2D コンテキスト
    cellSize        // 1マスのピクセルサイズ

    // メソッド
    clear()                     // 画面クリア
    drawBoard(board)            // ボード描画
    drawPiece(piece)            // 現在のピース描画
    drawGrid()                  // グリッド線描画
    drawBlock(x, y, color)      // 単一ブロック描画
    drawGameOver()              // ゲームオーバー画面
    drawPaused()                // ポーズ画面
    drawScore(score)            // スコア表示
}
```

## 画面レイアウト

```
+----------------------------------+
|         TETRIS                   |
+----------------------------------+
|                                  |
|  +----------+    +-----------+   |
|  |          |    | Score:    |   |
|  | ゲーム   |    |   0       |   |
|  | フィールド|    |           |   |
|  |          |    | Controls: |   |
|  |          |    | ← → 移動  |   |
|  |          |    | ↑ 回転    |   |
|  |          |    | ↓ ソフト  |   |
|  |          |    | Space ハード|  |
|  |          |    | P ポーズ   |   |
|  +----------+    +-----------+   |
|                                  |
|       [ Start / Restart ]        |
+----------------------------------+
```

## 状態遷移

```
[初期状態] → [Start押下] → [プレイ中]
                              ↓
                         [P押下] ⇄ [ポーズ]
                              ↓
                        [ゲームオーバー]
                              ↓
                       [Restart押下] → [プレイ中]
```

## 衝突判定

ピースの移動・回転時に以下をチェック:

1. フィールドの左端を超えていないか
2. フィールドの右端を超えていないか
3. フィールドの底を超えていないか
4. 既存のブロックと重なっていないか

## 回転システム

シンプルな回転システムを採用:
- 各ピースは4つの回転状態を持つ (0, 90, 180, 270度)
- 回転が壁やブロックにぶつかる場合は回転しない（壁キックなし）

## 乱数生成

ピースの出現はランダム。Math.random()を使用して7種類から選択。

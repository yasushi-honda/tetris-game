# Tetris

Webブラウザで遊べる一人対戦用テトリスゲーム。

## デモ

**プレイはこちら**: https://tetris-game-202512.web.app

## 技術スタック

- HTML5
- CSS3
- JavaScript (ES6+)
- HTML5 Canvas API
- Firebase Hosting

## 機能

- 7種類のテトリミノ（I, O, T, S, Z, J, L）
- キーボード操作（移動、回転、ソフトドロップ、ハードドロップ）
- ライン消去とスコアリング
- ポーズ機能

## 操作方法

| キー | 動作 |
|------|------|
| ← | 左移動 |
| → | 右移動 |
| ↓ | ソフトドロップ |
| ↑ | 回転 |
| Space | ハードドロップ |
| P | ポーズ |

## ローカルで実行

```bash
# リポジトリをクローン
git clone https://github.com/yasushi-honda/tetris-game.git
cd tetris-game

# ブラウザで開く
open src/index.html
```

## デプロイ

Firebase Hostingを使用してデプロイしています。

```bash
# Firebaseにログイン
firebase login

# デプロイ
firebase deploy --only hosting
```

## ドキュメント

- [設計書](docs/design.md)
- [ファイル構成](docs/file-structure.md)
- [Firebase Hostingデプロイ計画](docs/firebase-hosting-plan.md)

## プロジェクト情報

| 項目 | 内容 |
|------|------|
| Firebase Project ID | tetris-game-202512 |
| Hosting URL | https://tetris-game-202512.web.app |
| GitHub | https://github.com/yasushi-honda/tetris-game |

## ライセンス

MIT

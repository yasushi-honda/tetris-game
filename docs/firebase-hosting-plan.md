# Firebase Hosting デプロイ計画

## 概要

テトリスゲームをFirebase Hostingを使用して公開する。
GCPアカウント `hy.unimail.11@gmail.com` で新規Firebaseプロジェクトを作成。

## 実施結果

| 項目 | 内容 |
|------|------|
| 実施日 | 2024年12月14日 |
| ステータス | 完了 |
| プロジェクトID | tetris-game-202512 |
| 公開URL | https://tetris-game-202512.web.app |
| Firebaseコンソール | https://console.firebase.google.com/project/tetris-game-202512/overview |

## 前提条件

- GCPアカウント: `hy.unimail.11@gmail.com`
- Firebase CLI がインストールされていること
- Node.js がインストールされていること

## 実施した作業手順

### Phase 1: 環境準備

1. **Firebase CLIの確認**
   ```bash
   firebase --version
   # 結果: 14.19.1
   ```

2. **Firebaseへのログイン**
   ```bash
   firebase login --reauth
   # hy.unimail.11@gmail.com でログイン完了
   ```

### Phase 2: Firebaseプロジェクト作成

1. **プロジェクト作成コマンド（CLI）**
   ```bash
   firebase projects:create tetris-game-202512 --display-name "Tetris Game"
   ```
   - GCPプロジェクトも自動作成された
   - 無料プラン（Spark）で利用可能

### Phase 3: Firebase Hosting 設定

1. **設定ファイルを手動作成**

   `firebase.json`:
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

   `.firebaserc`:
   ```json
   {
     "projects": {
       "default": "tetris-game-202512"
     }
   }
   ```

2. **`.gitignore`に追加**
   ```
   .firebase/
   ```

### Phase 4: デプロイ

1. **デプロイ実行**
   ```bash
   firebase deploy --only hosting
   ```

2. **デプロイ結果**
   - 7ファイルがアップロードされた
   - 公開URL: https://tetris-game-202512.web.app

### Phase 5: 確認・検証

1. デプロイされたURLにアクセス → 正常動作確認
2. ゲームプレイ可能を確認

## 最終ファイル構成

```
rennsyuuyou-202512/
├── docs/
│   ├── design.md
│   ├── file-structure.md
│   └── firebase-hosting-plan.md  # この計画書
├── src/                          # Firebase Hostingの公開ディレクトリ
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── main.js
│       ├── board.js
│       ├── piece.js
│       ├── input.js
│       └── renderer.js
├── .firebase/                    # キャッシュ（gitignore対象）
├── .firebaserc                   # プロジェクト設定
├── .gitignore
├── firebase.json                 # Firebase設定
└── README.md
```

## 再デプロイ手順

変更を加えた後、以下のコマンドで再デプロイ可能:

```bash
# Firebaseにログイン（必要な場合）
firebase login

# デプロイ
firebase deploy --only hosting
```

## 注意事項

- プロジェクトIDはグローバルで一意
- 無料プラン（Spark）でHostingは利用可能
- カスタムドメインは後から設定可能
- 請求先アカウントの設定は不要（無料枠内）

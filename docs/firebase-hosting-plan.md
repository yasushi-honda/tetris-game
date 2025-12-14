# Firebase Hosting デプロイ計画

## 概要

テトリスゲームをFirebase Hostingを使用して公開する。
GCPアカウント `hy.unimail.11@gmail.com` で新規Firebaseプロジェクトを作成。

## 前提条件

- GCPアカウント: `hy.unimail.11@gmail.com`
- Firebase CLI がインストールされていること
- Node.js がインストールされていること

## 作業手順

### Phase 1: 環境準備

1. **Firebase CLIの確認/インストール**
   ```bash
   firebase --version
   # インストールされていない場合
   npm install -g firebase-tools
   ```

2. **Firebaseへのログイン**
   ```bash
   firebase login
   # hy.unimail.11@gmail.com でログイン
   ```

### Phase 2: Firebaseプロジェクト作成

1. **新規プロジェクト作成**
   - プロジェクトID: `tetris-game-[unique-suffix]`
   - プロジェクト名: `Tetris Game`
   - Firebaseコンソールまたは CLI で作成

2. **プロジェクト作成コマンド（CLI）**
   ```bash
   firebase projects:create tetris-game-[unique-suffix] --display-name "Tetris Game"
   ```

### Phase 3: Firebase Hosting 設定

1. **プロジェクトディレクトリでFirebase初期化**
   ```bash
   firebase init hosting
   ```

2. **設定内容**
   - Public directory: `src`
   - Single-page app: No
   - GitHub Actions: No（手動デプロイのため）

3. **生成されるファイル**
   - `firebase.json` - Hosting設定
   - `.firebaserc` - プロジェクト設定

### Phase 4: firebase.json 設定

```json
{
  "hosting": {
    "public": "src",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "headers": [
      {
        "source": "**/*.@(js|css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      }
    ]
  }
}
```

### Phase 5: デプロイ

1. **デプロイ実行**
   ```bash
   firebase deploy --only hosting
   ```

2. **デプロイ後のURL**
   - `https://[project-id].web.app`
   - `https://[project-id].firebaseapp.com`

### Phase 6: 確認・検証

1. デプロイされたURLにアクセス
2. ゲームが正常に動作することを確認
3. 各ブラウザでの動作確認

## ファイル構成（デプロイ後）

```
rennsyuuyou-202512/
├── docs/
│   ├── design.md
│   ├── file-structure.md
│   └── firebase-hosting-plan.md  # この計画書
├── src/                          # ← Firebase Hostingの公開ディレクトリ
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── main.js
│       ├── board.js
│       ├── piece.js
│       ├── input.js
│       └── renderer.js
├── firebase.json                 # Firebase設定
├── .firebaserc                   # プロジェクト設定
└── README.md
```

## 実行コマンド一覧

```bash
# 1. Firebase CLIインストール（未インストールの場合）
npm install -g firebase-tools

# 2. Firebaseログイン
firebase login

# 3. プロジェクト作成
firebase projects:create tetris-game-xxxxx --display-name "Tetris Game"

# 4. Hosting初期化
firebase init hosting

# 5. デプロイ
firebase deploy --only hosting
```

## 注意事項

- プロジェクトIDはグローバルで一意である必要がある
- 無料プラン（Spark）でHostingは利用可能
- カスタムドメインは後から設定可能

## 成果物

- 公開URL: `https://[project-id].web.app`
- Firebaseコンソール: `https://console.firebase.google.com/project/[project-id]`

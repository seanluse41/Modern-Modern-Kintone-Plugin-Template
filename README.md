English Below ↓

# Kintone プラグインテンプレート↓

Vite、Svelte 5、Kintone UI Components を使用した i18n 対応の Kintone プラグインテンプレートです。

## セットアップ↓

```bash
git clone https://github.com/seanluse41/Modern-Modern-Kintone-Plugin-Template
cd Modern-Modern-Kintone-Plugin-Template
npm i
cp .env.example .env
npm run keygen  # 初回のみ: private.ppk を生成
npm run build
npm run pack
npm run upload  # または手動でアップロード
```

## 構造

### エントリーポイント

プラグインは `src/js/desktop.js` から開始され、デフォルトで `app.record.index.show` イベントを登録します。このファイルは:
- `kintone.plugin.app.getConfig(PLUGIN_ID)` でプラグイン設定値にアクセス
- `App.svelte` を DOM にマウント
- 設定とイベントデータを Svelte コンポーネントに渡す

`App.svelte` から他の Svelte コンポーネントをインポートして使用できます。

### Kintone UI Components

KUC コンポーネントはラッパーなしで直接使用します。KUC はカスタム要素なので、`new Button()` などでインスタンスを作成し、Svelte の [attachment](https://svelte.dev/docs/svelte/@attach) で DOM に配置します。例は `src/components/Header.svelte` を参照:

```svelte
<script>
  import { Button, Dialog } from 'kintone-ui-component';

  const dialog = new Dialog({ title: 'こんにちは', content: 'ボタンがクリックされました' });
  const button = new Button({ text: 'クリック', type: 'submit' });
  button.addEventListener('click', () => dialog.open());

  const kuc = (node) => {
    node.appendChild(button);
    return () => { dialog.remove(); };
  };
</script>

<div {@attach kuc}></div>
```

`Dialog` と `Notification` は `open()` 時に `document.body` に自身を追加しますが、`close()` はそれを削除せず、非表示にするだけです(デスクトップ・モバイル両方の `Notification` も同様)。これらは Svelte のテンプレートの外側にいるため、コンポーネントの unmount 時に Svelte が自動的に片付けてはくれません。使用したら `{@attach}` の返り値(クリーンアップ関数)で明示的に `.remove()` してください。それ以外の KUC コンポーネント(Button、Dropdown、Text など、自分でテンプレートに配置するもの)は Svelte が管理する DOM の一部なので手動で削除する必要はありません。例外は `Spinner` で、これは `close()` 自身が DOM から取り除いてくれるため、こちらも手動での削除は不要です。

### 多言語

翻訳は `src/locales/` で管理され、言語ごとに個別の JSON ファイル(例: `en.json`、`ja.json`)があります。

言語は kintone ユーザーの言語設定から判定します(`src/i18n.js`)。`i18n.js` はインポート時に同期的に初期化されるため、どのコンポーネントからでも `t` をインポートしてそのまま使えます:

```svelte
<script>
  import { Button } from 'kintone-ui-component';
  import { t } from '../i18n.js';

  const button = new Button({ text: t('clickMe'), type: 'submit' });
</script>

<p>{t('helloKintone')}</p>
```

新しい翻訳を追加するには、各ロケール JSON ファイルにキーを追加します:

```json
{
  "welcome": "ようこそ",
  "button_save": "保存"
}
```

新しい言語を追加するには:
1. `src/locales/` に新しい JSON ファイルを作成(例: `fr.json`)
2. `i18n.js` でインポートし、`resources` に追加

---

# Kintone Plugin Template

A Kintone plugin template using Vite, Svelte 5, and Kintone UI Components with i18n support.

## Setup

```bash
git clone https://github.com/seanluse41/Modern-Modern-Kintone-Plugin-Template
cd Modern-Modern-Kintone-Plugin-Template
npm i
cp .env.example .env  # fill in your base URL, username, and password
npm run keygen  # first time only: generates private.ppk
npm run build
npm run pack
npm run upload  # or upload manually
```

## Structure

### Entry Point

The plugin starts at `src/js/desktop.js`, which registers the `app.record.index.show` event by default. This file:
- Accesses plugin config values via `kintone.plugin.app.getConfig(PLUGIN_ID)`
- Mounts `App.svelte` to the DOM
- Passes config and event data to the Svelte component

From `App.svelte`, you can import and use other Svelte components.

### Kintone UI Components

KUC components are custom elements: construct one with `new Button()` etc., then place it in the DOM with a Svelte [attachment](https://svelte.dev/docs/svelte/@attach). See `src/components/Header.svelte` for an example:

```svelte
<script>
  import { Button, Dialog } from 'kintone-ui-component';

  const dialog = new Dialog({ title: 'Hello', content: 'Button clicked!' });
  const button = new Button({ text: 'Click Me', type: 'submit' });
  button.addEventListener('click', () => dialog.open());

  const kuc = (node) => {
    node.appendChild(button);
    return () => { dialog.remove(); };
  };
</script>

<div {@attach kuc}></div>
```

Most KUC components (Button, Dropdown, Text, Table, …) are placed wherever you append them, so they're part of the DOM Svelte manages and get cleaned up automatically when the component unmounts — no manual removal needed.

`Dialog` and `Notification` (desktop and mobile) are the exception: `open()` appends them to `document.body`, outside your template, and `close()` only hides them — it never removes them from the DOM. Since they live outside the tree Svelte owns, unmounting your component won't clean them up either. If you use either of these, call `.remove()` on them yourself in your `{@attach}` cleanup function, as above. (`Spinner` also self-appends to `document.body`, but its own `close()` does remove itself, so it doesn't need this.)

### i18n

Translations are managed in `src/locales/` with separate JSON files for each language (e.g., `en.json`, `ja.json`).

The language is taken from the kintone user's language setting (`src/i18n.js`). `i18n.js` initializes synchronously on import, so any component can import `t` and use it directly:

```svelte
<script>
  import { Button } from 'kintone-ui-component';
  import { t } from '../i18n.js';

  const button = new Button({ text: t('clickMe'), type: 'submit' });
</script>

<p>{t('helloKintone')}</p>
```

To add new translations, add keys to each locale JSON file:

```json
{
  "welcome": "Welcome",
  "button_save": "Save"
}
```

To add a new language:
1. Create a new JSON file in `src/locales/` (e.g., `fr.json`)
2. Import it in `i18n.js` and add it to `resources`

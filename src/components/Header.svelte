<script>
  import { Button, Dialog } from 'kintone-ui-component';
  import { t } from '../i18n.js';

  let { message } = $props();

  // KUC components are plain custom elements, so use them directly:
  const closeButton = new Button({ text: t('close'), type: 'normal' });
  const dialog = new Dialog({ icon: 'info', title: t('helloKintone'), footer: closeButton });
  const button = new Button({ text: t('clickMe'), type: 'submit' });

  // KUC's Dialog sniffs `content` strings for HTML-looking markup and, if
  // found, renders them unescaped (see kintone-ui-component's isHTMLElement
  // helper) — so a saved message like "<img src=x onerror=...>" would
  // execute. `message` comes from plugin config, which anyone with app
  // management rights can edit, so treat it as untrusted. Passing a plain
  // element instead of a string sidesteps the sniffing entirely: KUC renders
  // any HTMLElement as-is, and textContent never parses its input as markup.
  const dialogContent = document.createElement('span');
  dialog.content = dialogContent;

  closeButton.addEventListener('click', () => dialog.close());

  button.addEventListener('click', () => {
    dialogContent.textContent = t('savedMessage', { message });
    dialog.open();
  });

  // The dialog appends itself to document.body on open(), so only the
  // button needs a place in this template. Both are removed on unmount.
  const kuc = (node) => {
    node.appendChild(button);
    return () => {
      button.remove();
      dialog.remove();
    };
  };
</script>

<div {@attach kuc}></div>

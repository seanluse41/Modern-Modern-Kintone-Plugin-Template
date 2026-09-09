<script>
  import { Button, Dialog } from 'kintone-ui-component';
  import { t } from '../i18n.js';

  let { message } = $props();

  // KUC components are plain custom elements, so use them directly:
  const closeButton = new Button({ text: t('close'), type: 'normal' });
  const dialog = new Dialog({ icon: 'info', title: t('helloKintone'), footer: closeButton });
  const button = new Button({ text: t('clickMe'), type: 'submit' });

  closeButton.addEventListener('click', () => dialog.close());

  button.addEventListener('click', () => {
    dialog.content = t('savedMessage', { message });
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

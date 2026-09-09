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

  // Dialog and notification both need a manual .remove() on unmount otherwise you can create unlimited dialogues
  // via pagination or changing views etc.
  // See the KUC section of the README for more info.
  
  const kuc = (node) => {
    node.appendChild(button);
    return () => {
      dialog.remove();
    };
  };
</script>

<div {@attach kuc}></div>

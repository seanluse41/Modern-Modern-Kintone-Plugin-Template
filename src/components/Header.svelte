<script>
  import { Button, Dialog } from 'kintone-ui-component';

  let { heading, message } = $props();

  // KUC components are plain custom elements, so use them directly:
  const closeButton = new Button({ text: 'Close', type: 'normal' });
  const dialog = new Dialog({ icon: 'info', footer: closeButton });
  const button = new Button({ text: 'Click Me', type: 'submit' });

  closeButton.addEventListener('click', () => dialog.close());

  button.addEventListener('click', () => {
    dialog.title = heading;
    dialog.content = message;
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

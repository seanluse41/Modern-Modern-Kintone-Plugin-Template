<script>
  import { Button, Text } from 'kintone-ui-component';
  import { t } from './i18n.js';
  let { pluginId } = $props();

  const config = kintone.plugin.app.getConfig(pluginId);

  const messageField = new Text({
    label: t('messageLabel'),
    value: config.message || '',
  });

  const cancelButton = new Button({ text: t('cancel'), type: 'normal' });
  const saveButton = new Button({ text: t('save'), type: 'submit' });

  cancelButton.addEventListener('click', () => {
    window.location.href = '../../' + kintone.app.getId() + '/plugin/';
  });

  saveButton.addEventListener('click', () => {
    kintone.plugin.app.setConfig({ message: messageField.value }, () => {
      alert(t('configSaved'));
      window.location.href = '../../flow?app=' + kintone.app.getId();
    });
  });

  const field = (node) => {
    node.appendChild(messageField);
    return () => messageField.remove();
  };

  const buttons = (node) => {
    node.appendChild(cancelButton);
    node.appendChild(saveButton);
    return () => {
      cancelButton.remove();
      saveButton.remove();
    };
  };
</script>

<h2>{t('configHeading')}</h2>
<p>{t('configDescription')}</p>

<div {@attach field}></div>
<div {@attach buttons}></div>

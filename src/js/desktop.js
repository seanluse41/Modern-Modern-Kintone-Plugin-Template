import { setupI18n } from '../i18n.js';

const PLUGIN_ID = kintone.$PLUGIN_ID;

kintone.events.on('app.record.index.show', async () => {
  const i18n = await setupI18n();
  const config = kintone.plugin.app.getConfig(PLUGIN_ID);

  const spaceElement = kintone.app.getHeaderSpaceElement();
  if (spaceElement === null) {
    throw new Error('The header element is unavailable on this page');
  }
  
  const fragment = document.createDocumentFragment();
  const headingEl = document.createElement('h3');
  const messageEl = document.createElement('p');

  messageEl.classList.add('plugin-space-message');
  messageEl.textContent = config.message;
  headingEl.classList.add('plugin-space-heading');
  headingEl.textContent = i18n.t('helloKintone');

  fragment.appendChild(headingEl);
  fragment.appendChild(messageEl);
  spaceElement.appendChild(fragment);
});
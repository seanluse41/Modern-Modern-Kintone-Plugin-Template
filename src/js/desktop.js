import { mount, unmount } from 'svelte';
import App from '../App.svelte';

const PLUGIN_ID = kintone.$PLUGIN_ID;

// app.record.index.show fires on more than just the initial page load -
// confirmed by testing: paging through records refires it on the same
// page (offset climbs, no reload). It also fires on filtering, category
// change, sorting, and calendar month navigation. Unmount the previous
// instance first so its KUC components are torn down instead of piling up.
let app;

kintone.events.on('app.record.index.show', async () => {
  const spaceElement = kintone.app.getHeaderSpaceElement();

  if (!spaceElement) {
    throw new Error('The header element is unavailable on this page');
  }

  if (app) {
    unmount(app);
  }

  app = mount(App, {
    target: spaceElement,
    props: { pluginId: PLUGIN_ID }
  });
});

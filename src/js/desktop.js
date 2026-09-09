import { mount, unmount } from 'svelte';
import App from '../App.svelte';

const PLUGIN_ID = kintone.$PLUGIN_ID;

// app.record.index.show's documented triggers include pagination
// (next/previous), filtering, category change, sorting, and calendar
// month navigation - not just the initial page load - so this handler can
// run more than once per page load. Unmount the previous instance first so
// its KUC components are torn down instead of piling up.
let app;
let mountCount = 0;

kintone.events.on('app.record.index.show', async (event) => {
  mountCount += 1;
  console.log(`[plugin] app.record.index.show mount #${mountCount}`, event);

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

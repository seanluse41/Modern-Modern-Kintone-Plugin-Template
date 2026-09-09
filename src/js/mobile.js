import { mount, unmount } from 'svelte';
import Mobile from '../Mobile.svelte';

const PLUGIN_ID = kintone.$PLUGIN_ID;

// See src/js/desktop.js for why the previous instance is unmounted first.
let app;
let mountCount = 0;

kintone.events.on('mobile.app.record.index.show', (event) => {
  mountCount += 1;
  console.log(`[plugin] mobile.app.record.index.show mount #${mountCount}`, event);

  const spaceElement = kintone.mobile.app.getHeaderSpaceElement();

  if (!spaceElement) {
    throw new Error('The header element is unavailable on this page');
  }

  if (app) {
    unmount(app);
  }

  app = mount(Mobile, {
    target: spaceElement,
    props: { pluginId: PLUGIN_ID }
  });
});

<script>
  import Header from './components/Header.svelte';

  let { pluginId } = $props();

  const config = kintone.plugin.app.getConfig(pluginId);
</script>

<Header message={config.message} />

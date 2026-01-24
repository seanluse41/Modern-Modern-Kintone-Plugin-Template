<script>
  import { onMount } from 'svelte';
  import { Button } from 'kintone-ui-component';
  
  let { text, type = 'normal', onclick } = $props();
  let container;
  
  onMount(() => {
    const button = new Button({
      text,
      type
    });
    
    container.appendChild(button);
    
    if (onclick) {
      button.addEventListener('click', onclick);
    }
  });
</script>

<div bind:this={container}></div>
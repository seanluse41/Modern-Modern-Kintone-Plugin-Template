<script>
  import KucButton from '../builders/button.svelte';
  
  let { heading, message } = $props();
  
  async function handleClick() {
    const bodyElement = document.createElement('p');
    bodyElement.textContent = 'Are you sure you want to submit?';

    const dialog = await kintone.createDialog({
      title: 'Submit Confirmation',
      body: bodyElement,
      okButtonText: 'Submit',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      showCloseButton: true,
      beforeClose: (action) => {
        if (action === 'OK') {
          console.log('Submitted');
        } else {
          console.log('Cancelled');
        }
      }
    });

    await dialog.show();
  }
</script>

<KucButton text="Submit" type="submit" onclick={handleClick}>{message}</KucButton>
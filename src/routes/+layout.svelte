<script>
  import Header from '$lib/core/Header.svelte';
  const { children } = $props();
</script>

<Header />

{@render children()}

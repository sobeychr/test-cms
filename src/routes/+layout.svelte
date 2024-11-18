<script>
  import Header from '$lib/component/Header.svelte';
  const { children } = $props();
</script>

<Header />

{@render children()}

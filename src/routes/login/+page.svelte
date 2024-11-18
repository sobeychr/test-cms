<script>
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';
  import Header from '$lib/core/Header.svelte';

  let hasError = $state(false);

  const onEnhance = () => {
    return async ({ result, update, ...rest }) => {
      hasError = result?.data?.hasError || false;

      if(result.type === 'redirect') {
        goto(result.location);
      }
    };
  };
</script>

<main>
  <form action='?/login' method='post' use:enhance={onEnhance}>
    <h2>Login</h2>

    {#if hasError}
      <p>Invalid login</p>
    {/if}

    <p>
      <label for='username'>Username</label>
      <input type='text' name='username' id='username' required />
    </p>

    <p>
      <label for='password'>Password</label>
      <input type='password' name='password' id='password' required />
    </p>

    <p>
      <button type='submit'>Login</button>
    </p>

    <p>
      For the purpose of this test, there is no actual login/password. Use <code>test1234/test1234</code> to enter
    </p>
  </form>
</main>

<style>

</style>
<script>
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';

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
      <p class='error'>Invalid login</p>
    {/if}

    <p>
      <label for='username'>Username</label>
      <input autofocus type='text' name='username' id='username' required tabindex='1' />
    </p>

    <p>
      <label for='password'>Password</label>
      <input type='password' name='password' id='password' required tabindex='2' />
    </p>

    <p>
      <button type='submit'>Login</button>
    </p>

    <p class='instructions'>
      For the purpose of this test, there is no actual login/password.
      <br />
      Use <code>test1234/test1234</code> to enter.
    </p>
  </form>
</main>

<style>
  main {
    --padding: 1.3rem;
    border-radius: var(--border-radius);
    border: var(--border-white);
    margin: 5rem auto;
    max-width: calc(550px - (2 * var(--padding)));
    padding: var(--padding);
    width: 80%;
  }

  h2 {
    text-align: center;
  }

  p {
    margin-top: var(--p-space);
  }

  .error {
    color: var(--error-color);
  }

  .instructions {
    font-size: 0.9rem;
    margin: 2rem auto 0;
    width: 90%;
  }
</style>
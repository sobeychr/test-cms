<script>
  import { CONFIG, GIT, VERSION } from '$lib/util/config';

  const { PAGE_LOGIN, PAGE_LOGOUT } = CONFIG;
</script>

<header>
  <div class='left'>
    <h1>Test CMS</h1>
    <div class='hover'>
      <p><span>Hash</span>{GIT.hash}</p>
      <p><span>Date</span>{GIT.date}</p>
      <p><span>Branch</span>{GIT.branch}</p>
      <p><span>Tag</span>{GIT.tag || 'N/A'}</p>
    </div>
  </div>

  <div>
    <a data-sveltekit-preload-data='tap' href={`${PAGE_LOGIN}?${PAGE_LOGOUT}`}>Logout</a>
  </div>
</header>

<style>
  header {
    border-bottom: var(--border-white);
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    padding: 0.5rem;
  }
  h1 {
    color: var(--highlight-color);
  }

  .hover {
    background: var(--background-color);
    border-radius: var(--border-radius);
    border: var(--border-white);
    display: none;
    font-size: 0.8rem;
    left: 3rem;
    padding: 0.4rem;
    position: absolute;
    top: 2.5rem;

    .left:hover & {
      display: block;
    }

    p:not(:last-child) {
      margin-bottom: var(--p-space);
    }

    span {
      color: var(--highlight-color);
      margin-right: var(--p-space);

      &::after {
        content: ': ';
      }
    }
  }
</style>

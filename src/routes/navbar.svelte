<script lang="ts">
  import { page } from "$app/stores";
  import { Card } from "$components";
  import type { Session } from "$lib/auth";

  const session: Session = $page.data.session;
</script>

<Card
  class="sticky top-2 z-10 m-2 flex justify-between items-center rounded-lg"
>
  <a href="/" class="flex gap-3">
    <img
      src="https://lectcheck.vercel.app/_next/static/media/icon.143e074d.svg"
      alt="logo"
      width="20"
      height="20"
    />
    LECTCHECK
  </a>
  <div class="flex gap-3">
    <a href="/">Home</a>
    <a href="/">About</a>
    {#if !session}
      <a href="/login">Log In</a>
    {:else}
      <a href="/account">Account</a>
    {/if}
  </div>
</Card>

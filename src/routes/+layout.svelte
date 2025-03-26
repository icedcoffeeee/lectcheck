<script lang="ts">
  import "@fontsource/karla";
  import "@fontsource/ibm-plex-mono";
  import "../app.css";
  import { goto } from "$app/navigation";
  import { authc } from "../auth";

  let { children, data } = $props();
</script>

<nav
  class="sticky top-0 z-10 flex w-full justify-between p-5 font-mono text-sm font-bold backdrop-blur-md"
>
  <a href="/">LectCheck</a>
  <div class="flex gap-5">
    <a href="/about">about</a>
    {#if data.user}
      <button onclick={() => authc.signOut().then(() => goto("/"))}>log out</button>
    {:else}
      <a href="/login">log in</a>
    {/if}
  </div>
</nav>

<div class="h-[calc(100svh-12*var(--spacing)-var(--text-sm))] p-5">
  {@render children()}
</div>

<script lang="ts">
  import "@fontsource/karla";
  import "@fontsource/ibm-plex-mono";
  import "@/app.css";

  import { authC } from "@/auth-client";
  import { invalidateAll } from "$app/navigation";

  let { children, data } = $props();
  let login = async () => await authC.signIn.social({ provider: "google" });
  let logout = async () => {
    let { data, error } = await authC.signOut();
    if (error) alert(error.message);
    if (data?.success) await invalidateAll();
  };
</script>

<svelte:head>
  <title>LectCheck</title>
  <meta name="description" content="Your Lecturers At A Glance." />
</svelte:head>

<nav
  class="sticky top-0 z-10 flex w-full justify-between p-5 font-mono text-sm font-bold backdrop-blur-md"
>
  <a href="/" class="flex items-center gap-2">
    <img src="/icon.svg" alt="icon" class="size-4 [filter:invert(1)] dark:[filter:invert(0)]" />
    LectCheck</a
  >
  <div class="flex gap-5">
    <a href="/about">about</a>
    {#if !data.user}
      <button onclick={login}>log in</button>
    {:else}
      <button onclick={logout}>log out</button>
    {/if}
  </div>
</nav>

<div class="h-[calc(100svh-12*var(--spacing)-var(--text-sm))] p-5">
  {@render children()}
</div>

<style lang="postcss">
  @reference "../app.css";

  a,
  button {
    @apply hover:text-primary;
  }
</style>

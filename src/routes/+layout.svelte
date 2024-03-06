<script lang="ts">
  import { Navbar } from "$components";
  import { writable } from "svelte/store";
  import "../app.css";
  import type { LayoutData } from "./$types";
  import { setContext } from "svelte";
  import { onNavigate } from "$app/navigation";

  export let data: LayoutData;

  const session = writable();
  $: session.set(data.session);
  setContext("session", session);

  onNavigate((navigation) => {
    if (!document.startViewTransition) return;
    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });
</script>

<Navbar />
<div class="relative m-3">
  <slot />
</div>

<script lang="ts">
  import "../app.css";

  import { onNavigate } from "$app/navigation";
  import { setContext } from "svelte";
  import { writable } from "svelte/store";
  import type { LayoutData } from "./$types";

  import Navbar from "./navbar.svelte";

  export let data: LayoutData;

  $: setContext("session", writable(data.session));

  // view transitions api
  onNavigate((navigation) => {
    // @ts-expect-error unsupported typehints for transitions
    if (!document.startViewTransition) return;
    return new Promise((resolve) => {
      // @ts-expect-error unsupported typehints for transitions
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

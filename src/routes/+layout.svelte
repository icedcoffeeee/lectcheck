<script lang="ts">
  import { Navbar } from "$components";
  import "../app.css";
  import type { LayoutData } from "./$types";

  export let data: LayoutData;

  $: data = data;
</script>

<Navbar hasSession={!!data.session} />
<div class="relative m-3">
  <slot />
</div>

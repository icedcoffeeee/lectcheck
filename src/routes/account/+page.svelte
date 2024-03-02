<script lang="ts">
  import { enhance } from "$app/forms";
  import { Loader2 } from "lucide-svelte";

  let loadingLogOut = false;
</script>

<form
  method="post"
  action="/login?/logout"
  use:enhance={() => {
    loadingLogOut = true;
    return async ({ update }) => {
      await update();
      loadingLogOut = false;
    };
  }}
  class="flex items-center"
>
  <button>Log Out</button>
  {#if loadingLogOut}
    <Loader2 class="animate-spin" />
  {/if}
</form>

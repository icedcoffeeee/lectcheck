<script>
  import { Loader2, Search } from "lucide-svelte";
  import colors from "tailwindcss/colors";
  import { Input } from "./ui";

  let loadingSearch = false;
</script>

<form
  method="post"
  action="/"
  on:submit={() => {
    if (loadingSearch) return;
    loadingSearch = true;
  }}
  class="flex items-center gap-2 mb-3"
>
  <Input name="tag" placeholder="Lecturer tag" class="grow py-0" />
  {#if loadingSearch}
    <Loader2 size={18} color={colors.yellow[500]} class="m-1 animate-spin" />
  {:else}
    <button disabled={loadingSearch} class="bg-yellow-500 p-1 rounded-full">
      <Search size={18} />
    </button>
  {/if}
</form>

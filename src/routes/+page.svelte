<script lang="ts">
  import { enhance } from "$app/forms";
  import { Loader2 } from "lucide-svelte";

  let loading = false;
</script>

<div class="flex h-full w-full items-center justify-center">
  <section class="flex h-fit w-full max-w-2xl flex-col justify-center gap-10 p-4">
    <div class="flex flex-col">
      <h1>LectCheck</h1>
      <p>Your first stop for better education.</p>
    </div>
    <span class="h-10"></span>
    <form
      method="post"
      use:enhance={() => {
        loading = true;
        return async ({ update }) => {
          await update();
          loading = false;
        };
      }}
      class="flex flex-col gap-2 self-end"
    >
      <p class="flex justify-between gap-4">
        <span>Enter lecturer tag.</span>
        <button
          class="bg-primary border-primary flex w-10 justify-center self-end rounded text-white"
        >
          {#if loading}
            <Loader2 class="text-baseline scale-50 animate-spin" color="white"></Loader2>
          {:else}
            GO
          {/if}
        </button>
      </p>
      <input name="tag" placeholder="e.g. hamdi" class="border-foreground border-y px-2 py-1" />
      <a class="self-end text-xs underline" href="faq#tag">what's a tag?</a>
    </form>
  </section>
</div>

<script lang="ts">
  import { enhance } from "$app/forms";
</script>

<div class="flex h-full w-full items-center justify-center">
  <section class="flex h-fit w-full max-w-2xl flex-col justify-center gap-10 p-4">
    <div class="flex flex-col">
      <h1>LectCheck</h1>
      <p>Your first stop for great education.</p>
    </div>
    <span class="h-10"></span>
    <form method="post" use:enhance class="flex flex-col gap-2 self-end">
      <p class="flex justify-between gap-4">
        <span>Enter lecturer tag.</span>
        <button class="bg-primary border-primary self-end rounded px-2 text-white">GO</button>
      </p>
      <input
        name="tag"
        placeholder="e.g. hamdi"
        class="text-primary placeholder:text-foreground/40 border-foreground border-y px-2 py-1"
      />
    </form>
  </section>
</div>

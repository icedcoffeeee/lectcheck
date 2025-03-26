<script lang="ts">
  import { enhance } from "$app/forms";
</script>

<div class="flex h-full w-full justify-center">
  <section class="flex h-full w-full max-w-lg flex-col justify-center">
    <div class="flex flex-col">
      <h1>LectCheck</h1>
      <p>Your first stop for top instructors.</p>
    </div>
    <span class="h-10"></span>
    <form method="post" use:enhance class="flex w-min flex-col gap-2 self-end">
      <p class="flex justify-between">
        <span> Enter lecturer tag.</span>
        <button class="text-primary border-primary self-end">GO</button>
      </p>
      <input name="tag" placeholder="e.g. hamdi" class="border-y border-black px-2 font-mono" />
    </form>
  </section>
</div>

<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData } from "./$types";

  import { invalidateAll } from "$app/navigation";
  import { Card, StarInput } from "$components";

  export let form: ActionData;
  export let userUID: number;
  export let toggle = () => {};

  let ratings = [0, 0, 0, 0];
</script>

<Card>
  <form
    method="post"
    action="?/addpost"
    use:enhance={() => {
      return async ({ update }) => {
        await update();
        await invalidateAll();
      };
    }}
    class="flex flex-col gap-2"
  >
    <StarInput bind:values={ratings} />
    <input name="ratings" bind:value={ratings} type="hidden" />
    <input name="authorUID" value={userUID} type="hidden" />

    <label class="flex gap-2">
      <span class="grow">Class Code</span>
      <input name="class_code" placeholder="SIF2020" class="px-2" />
    </label>
    <textarea
      name="content"
      placeholder="Type your review... (optional)"
      class="w-full px-2"
    />

    {#if form?.errors}
      {#each form.errors as error}
        <p class="text-red-500 -my-1">{error}</p>
      {/each}
    {/if}

    <div class="flex gap-2 justify-end">
      <button
        on:click|preventDefault={toggle}
        class="border border-yellow-600 px-2 rounded self-end">Cancel</button
      >
      <button class="bg-yellow-600 px-3 rounded self-end">Post</button>
    </div>
  </form>
</Card>

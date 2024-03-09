<script lang="ts">
  // @ts-expect-error no types
  import hash from "string-hash";

  import type { Session } from "$lib/auth";
  import type { ActionData } from "./$types";

  import { enhance } from "$app/forms";
  import { page } from "$app/stores";
  import { Card, StarInput } from "$components";
  import type { Lect } from "$lib/db";

  export let form: ActionData;
  export let toggle = () => {};

  const lect: Lect = $page.data.lect;
  const session: Session = $page.data.session;

  let ratings = Array(4).fill(-1);
</script>

<Card>
  <form
    method="post"
    action="?/addpost"
    use:enhance
    class="flex flex-col gap-2"
  >
    <StarInput values={ratings} />
    <input name="ratings" bind:value={ratings} hidden />

    <input name="authorUID" value={hash(session?.user.email)} hidden />
    <input name="lect_tag" value={lect.lect_tag} hidden />

    <div class="flex gap-2">
      <span class="grow">Class Code</span>
      <input name="class_code" placeholder="SIF2020" />
    </div>
    <textarea
      name="content"
      class="w-full"
      placeholder="Type your review... (optional)"
    />

    {#if form?.error}
      <span class="text-red-500">{form.error}</span>
    {/if}

    <div class="flex gap-2 justify-end">
      <button
        on:click={toggle}
        class="border border-yellow-600 px-2 rounded self-end">Cancel</button
      >
      <button class="bg-yellow-600 px-3 rounded self-end">Post</button>
    </div>
  </form>
</Card>

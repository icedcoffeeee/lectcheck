<script lang="ts">
  import { enhance } from "$app/forms";
    import {Input} from "$components";
  import type { ActionData } from "./$types";

  let loading = false;

  export let form: ActionData;
</script>

<form
  method="post"
  action="/login?/login"
  use:enhance={() => {
    loading = true;
    return async ({ update }) => {
      await update();
      loading = false;
    };
  }}
  class="h-[80lvh] px-4 flex flex-col justify-center gap-3"
>
  <h1>Sign In To LectCheck</h1>
  <p>Email</p>
  <Input name="email" type="email" placeholder="Email" />
  <p>Password</p>
  <Input name="password" type="password" placeholder="Password" />

  {#if form?.error}
    <p class="text-red-500">{form.error}</p>
  {/if}
  {#if form?.message}
    <p class="text-yellow-500">{form.message}</p>
  {/if}

  <button
    disabled={loading}
    class:opacity-50={loading}
    class="bg-slate-500 rounded p-2">Log In</button
  >
  <button
    disabled={loading}
    class:opacity-50={loading}
    formaction="/login?/register"
    class="bg-yellow-600 rounded p-2"
  >
    Register
  </button>
</form>

<script lang="ts">
  import { page } from "$app/state";
</script>

<div class="flex h-full w-full flex-col items-center justify-center">
  <h1>{page.status}</h1>
  <p>{page.error?.message}</p>
</div>

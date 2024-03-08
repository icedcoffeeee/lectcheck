<script lang="ts">
  import type { Lect } from "$lib/db";

  import { Card } from "$components";
  import { getContext } from "svelte";
  import { type Writable } from "svelte/store";

  $: lect = getContext<Writable<Lect>>("lect");
</script>

<Card class="flex gap-5">
  <img src={$lect.img_src} alt={$lect.name} class="rounded w-24 h-full" />
  <div>
    <h1 class="mt-0">{$lect.name}</h1>
    <p>{$lect.lect_tag + "@um.edu.my"}</p>
    <p>{$lect.faculty}</p>
    <p>{$lect.department}</p>
  </div>
</Card>

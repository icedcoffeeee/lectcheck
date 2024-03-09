<script lang="ts">
  import { page } from "$app/stores";
  import { Card } from "$components";
  import type { Lect } from "$lib/db";

  const lect: Lect = $page.data.lect;
</script>

<Card class="flex gap-5">
  <img src={lect.img_src} alt={lect.name} class="rounded w-24 h-full" />
  <div>
    <h1 class="mt-0">{lect.name}</h1>
    <p>{lect.lect_tag + "@um.edu.my"}</p>
    <p>{lect.faculty}</p>
    <p>{lect.department}</p>
  </div>
</Card>

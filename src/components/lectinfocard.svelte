<script lang="ts">
  import type { Lect } from "@prisma/client";
  import { Card } from "./ui/";

  export let lect: Lect;
</script>

<Card class="flex gap-5">
  <img src={lect.imgSrc} alt={lect.name} class="rounded w-24 h-full" />
  <div>
    <h1 class="mt-0">{lect.name}</h1>
    <p>{lect.email}</p>
    <p>{lect.faculty}</p>
    <p>{lect.department}</p>
  </div>
</Card>

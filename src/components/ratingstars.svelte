<script lang="ts">
  import { Star } from "lucide-svelte";
  import c from "tailwindcss/colors";

  export let amount: number;

  let colors = Array(5).fill("white");
  for (let i = 0; i < amount; i++) {
    colors[i] = c.yellow[500];
  }
</script>

<div class="grid grid-cols-2 gap-2">
  <div class="flex grow">
    {#each colors as color}
      <Star fill={color} strokeWidth={0} />
    {/each}
  </div>
  <span>{amount.toPrecision(3)}</span>
</div>

<script lang="ts">
  import { Card, RatingStars } from "$components";

  export let num = 0;
  export let categories: number[];

  const rubics = ["Teaching", "Assessments", "Guidance", "Reach"];
</script>

<Card class="flex flex-col my-3">
  {#each rubics as rubric, i}
    <div class="flex justify-between">
      <div>{rubric}</div>
      <RatingStars amount={categories[i]} />
    </div>
  {/each}
  {#if num > 0}
    <div class="col-span-2 opacity-70 mt-2">{num} reviews</div>
  {/if}
</Card>

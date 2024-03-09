<script>
  import { Star } from "lucide-svelte";
  import colors from "tailwindcss/colors";

  export let values = Array(4).fill(0);

  const rubics = ["Teaching", "Assessments", "Guidance", "Reach"];
</script>

<div class="flex flex-col">
  {#each values as value, j}
    <div class="flex justify-between">
      <span>{rubics[j]}</span>
      <div class="flex gap-1">
        {#each Array(5)
          .fill(0)
          .map((_, i) => i) as i}
          <button
            on:click|preventDefault={() => {
              value = i + 1;
            }}
          >
            <Star
              size={15}
              strokeWidth={0}
              color={value > i ? colors.yellow[500] : "white"}
              fill={value > i ? colors.yellow[500] : "white"}
            />
          </button>
        {/each}
      </div>
    </div>
  {/each}
</div>

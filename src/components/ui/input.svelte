<script lang="ts">
  import { twMerge } from "tailwind-merge";

  let CN: string = "";

  export { CN as class };
</script>

<input
  {...$$restProps}
  class={twMerge("p-2 rounded border-0 text-black", CN)}
/>

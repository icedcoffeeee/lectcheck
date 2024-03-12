<script lang="ts">
  import { twMerge } from "tailwind-merge";
</script>

<input
  {...$$restProps}
  class={twMerge("p-2 rounded border-0 text-black", $$restProps.class)}
/>

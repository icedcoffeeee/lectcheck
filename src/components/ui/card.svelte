<script lang="ts">
  import { twMerge } from "tailwind-merge";

  let CN: string;
  export { CN as class };
</script>

<div
  {...$$restProps}
  class={twMerge("p-2 bg-slate-800 rounded shadow-lg", CN ?? "")}
>
  <slot />
</div>

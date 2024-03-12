<script lang="ts">
  import { twMerge } from "tailwind-merge";
</script>

<div
  {...$$restProps}
  class={twMerge("p-2 bg-slate-800 rounded shadow-lg", $$restProps.class)}
>
  <slot />
</div>

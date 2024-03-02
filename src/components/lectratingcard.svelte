<script lang="ts">
  import { Ratingstars } from "./";
  import { Card } from "./ui/";

  export let categories: number[];

  const [T, A, G, R] = categories;
</script>

<Card class="grid grid-cols-2 my-3">
  <div>Teaching</div>
  <Ratingstars amount={T} />
  <div>Assessments</div>
  <Ratingstars amount={A} />
  <div>Guidance</div>
  <Ratingstars amount={G} />
  <div>Reach</div>
  <Ratingstars amount={R} />
</Card>

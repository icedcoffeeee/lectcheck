<script lang="ts">
  import type { PageData } from "./$types";

  import Postcard from "../postcard.svelte";

  export let data: PageData;
  const { post, userUID } = data;
</script>

<Postcard showratings {post} {userUID} />

<script lang="ts">
  import { PostCard } from "$components";
  import type { PageData } from "./$types";

  export let data: PageData;
  const { session, post } = data;
</script>

<PostCard {post} {session} />

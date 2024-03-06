<script lang="ts">
  import {
    LectInfoCard,
    LectRatingCard,
    PostCard,
    Searchbar,
  } from "$components";
  import { Plus } from "lucide-svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
  const { session, lect, lectPosts } = data;

  let categories: number[] = [0, 0, 0, 0];

  lectPosts.forEach((post, _, arr) => {
    post.ratings.forEach((category, m) => {
      categories[m] += category / arr.length;
    });
  });

  const posts = lectPosts
    .filter((post) => !!post.content)
    .sort(
      (a, b) =>
        parseInt(b.created_at.toISOString()) -
        parseInt(a.created_at.toISOString()),
    );
</script>

<Searchbar />

<LectInfoCard {lect} />
<LectRatingCard {categories} />

<h1 class="flex gap-2 items-center">
  Posts
  <Plus size={18} />
</h1>

<div class="flex flex-col gap-2">
  {#each posts as post}
    <PostCard {post} {session} />
  {/each}
</div>

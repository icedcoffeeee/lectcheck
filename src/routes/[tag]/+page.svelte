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
  const { lect, reviews: posts } = data;

  let categories: number[] = [0, 0, 0, 0];

  posts.forEach((post, _, arr) => {
    post.reviews.forEach((category, m) => {
      categories[m] += category / arr.length;
    });
  });

  const reviews = posts
    .filter((post) => post.comments)
    .sort(
      (a, b) =>
        parseInt(b.createdAt.toISOString()) -
        parseInt(a.createdAt.toISOString()),
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
  {#each reviews as review}
    <PostCard {review} />
  {/each}
</div>

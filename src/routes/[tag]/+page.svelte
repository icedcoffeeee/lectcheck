<script lang="ts">
  import { Plus } from "lucide-svelte";
  import type { ActionData, PageData } from "./$types";

  import Searchbar from "../searchbar.svelte";
  import LectInfoCard from "./lectinfocard.svelte";
  import LectRatingCard from "./lectratingcard.svelte";
  import NewPost from "./newpost.svelte";
  import PostCard from "./postcard.svelte";
  import { setContext } from "svelte";
  import { writable } from "svelte/store";

  export let data: PageData;
  export let form: ActionData;

  let { lect, lectPosts } = data;

  $: setContext("lect", writable(lect));

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

  let addPost = false;
  function cancel() {
    addPost = !addPost;
  }
</script>

<Searchbar />

<LectInfoCard />
<LectRatingCard num={lectPosts.length} {categories} />

<h1 class="flex gap-2 items-center">
  Posts
  <button on:click={cancel}><Plus size={18} /></button>
</h1>

<div class="flex flex-col gap-2">
  {#if addPost}
    <NewPost {form} {cancel} />
  {/if}
  {#each posts as post}
    <PostCard {post} />
  {/each}
</div>

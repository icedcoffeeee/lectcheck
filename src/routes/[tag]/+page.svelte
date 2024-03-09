<script lang="ts">
  // @ts-expect-error has no typees
  import hash from "string-hash";

  import { Plus } from "lucide-svelte";
  import { page } from "$app/stores";
  import type { ActionData, PageData } from "./$types";

  import Searchbar from "../searchbar.svelte";
  import LectInfoCard from "./lectinfocard.svelte";
  import LectRatingCard from "./lectratingcard.svelte";
  import NewPost from "./newpost.svelte";
  import PostCard from "./postcard.svelte";

  export let data: PageData;
  export let form: ActionData;

  $: data = data;
  let { lectPosts, session } = data;
  $: userUID = hash(session?.user.email) as number;

  let categories: number[] = [0, 0, 0, 0];

  lectPosts.forEach((post, _, arr) => {
    post.ratings.forEach((category, m) => {
      categories[m] += category / arr.length;
    });
  });

  const posts = lectPosts.filter((post) => {
    console.log(post.authorUID, userUID);
    return post.authorUID === userUID || !!post.content;
  });

  let addPost = false;
  function toggle() {
    if (session) addPost = !addPost;
    else alert("You must be logged in!");
  }
</script>

<Searchbar />
<LectInfoCard />
<LectRatingCard num={lectPosts.length} {categories} />

<h1 class="flex gap-2 items-center">
  Posts
  <button on:click={toggle}><Plus size={18} /></button>
</h1>

<div class="flex flex-col gap-2">
  {#if addPost}
    <NewPost {form} {toggle} {userUID} />
  {/if}
  {#each posts as post}
    <PostCard {post} {userUID} />
  {/each}
</div>

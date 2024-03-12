<script lang="ts">
  import {
    AlertTriangleIcon,
    Heart,
    Loader2,
    MessageCircle,
    Trash2,
  } from "lucide-svelte";
  import colors from "tailwindcss/colors";

  import { goto, invalidateAll } from "$app/navigation";
  import { page } from "$app/stores";
  import type { Session } from "$lib/auth";
  import type { Post } from "$lib/db";

  import { enhance } from "$app/forms";
  import { Card } from "$components";
  import LectRatingCard from "./lectratingcard.svelte";

  export let post: Post;
  export let userUID: number;
  export let showratings = false;

  const { commentIDs, likeUIDs, created_at } = post;
  $: session = $page.data.session as Session;

  // likes
  const alreadyliked = likeUIDs.includes(userUID);
  let currentlike = false;
  $: liked =
    alreadyliked || currentlike
      ? { color: colors.red[500], fill: colors.red[500] }
      : { color: "white", fill: "transparent" };

  // options
  let deleting = false;

  // activities
  function gotoPost() {
    const path = `${post.lect_tag}/${post.id}`;
    if ($page.url.pathname === `/${path}`) return;
    return goto(path);
  }
  function likePost() {
    if (session) currentlike = !currentlike;
    else alert("You must be logged in to like this post");
  }
</script>

<Card
  style={`view-transition-name: post-${post.id}`}
  class="flex flex-col gap-2"
>
  <button class="text-left" on:click={gotoPost}
    >{post.content.length ? post.content : "(No content)"}</button
  >
  <div class="flex justify-between">
    <div class="flex items-center gap-4">
      <button on:click={likePost} class="flex items-center gap-2">
        <Heart size={15} {...liked} />
        {likeUIDs.length}
      </button>

      <button on:click={gotoPost} class="flex items-center gap-2">
        <MessageCircle size={15} />
        {commentIDs.length}
      </button>

      {#if post.authorUID === userUID}
        <form action="?/deletepost" method="post">
          <input type="hidden" name="postID" value={post.id} />
          <button
            class="flex items-center gap-2"
            on:click={() => {
              deleting = true;
            }}
          >
            {#if deleting}
              <Loader2 class="animate-spin" color={colors.red[500]} size={15} />
            {:else}
              <Trash2 color={colors.red[500]} size={15} />
            {/if}
          </button>
        </form>
      {/if}
    </div>

    <div class="flex flex-row items-center gap-2">
      {#if showratings}
        <button>
          <AlertTriangleIcon color={colors.red[500]} size={15} />
        </button>
      {/if}
      <span class="opacity-50">
        {created_at.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </span>
    </div>
  </div>

  {#if showratings}
    <LectRatingCard categories={post.ratings} />
  {/if}
</Card>

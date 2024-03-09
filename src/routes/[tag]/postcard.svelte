<script lang="ts">
  import {
    AlertTriangle,
    Heart,
    MessageCircle,
    MoreHorizontal,
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
  let options = false;

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
  <button class="text-left" on:click={gotoPost}>{post.content}</button>
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
        <form
          action="?/deletepost"
          method="post"
          use:enhance={function () {
            const confirmed = confirm("Do you want to delete this post?");
            return async function ({ update, result }) {
              if (confirmed) {
                await update();
                await invalidateAll();
              }
              return result;
            };
          }}
        >
          <input type="hidden" name="postID" value={post.id} />
          <button class="flex items-center gap-2">
            <Trash2 color={colors.red[500]} size={15} />
          </button>
        </form>
      {/if}
    </div>

    <div class="flex items-center gap-2">
      <button
        on:click={() => {
          options = !options;
        }}
      >
        <MoreHorizontal size={15} />
      </button>
      <div
        data-expand={options}
        class="w-auto max-w-0 data-[expand=true]:max-w-min transition-[max-width] overflow-clip flex items-center gap-2"
      >
        <button>
          <AlertTriangle size={15} />
        </button>
      </div>

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

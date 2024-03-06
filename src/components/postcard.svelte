<script lang="ts">
  import type { Post } from "$lib/db";
  import { Heart, MessageCircle, MoreHorizontal } from "lucide-svelte";
  import type { Session } from "../routes/+layout.server";
  import { Card } from "./ui/";
  //@ts-expect-error "has no types"
  import hash from "string-hash";
  import colors from "tailwindcss/colors";
  import { goto } from "$app/navigation";

  export let post: Post;
  export let session: Session = null;

  const { commentIDs, likeUIDs, created_at } = post;
  const email_hash = hash(session?.user.email ?? "");
  const liked = likeUIDs.includes(email_hash)
    ? {
        color: colors.red[500],
        fill: colors.red[500],
      }
    : {};
  console.log(email_hash);
</script>

<Card
  style={`view-transition-name: post-${post.id}`}
  class="flex flex-col gap-2"
>
  <button
    class="text-left"
    on:click={async () => await goto(`${post.lect_tag}}/${post.id}`)}
    >{post.content}</button
  >
  <div class="flex justify-between">
    <div class="flex items-center gap-4">
      <button class="flex items-center gap-2">
        <Heart size={15} {...liked} />
        {likeUIDs.length}
      </button>

      <button class="flex items-center gap-2">
        <MessageCircle size={15} />
        {commentIDs.length}
      </button>
    </div>

    <div class="flex items-center gap-2">
      <button><MoreHorizontal size={15} /></button>

      <span class="opacity-50">
        {created_at.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </span>
    </div>
  </div>
</Card>

<script lang="ts">
  import type { Review } from "@prisma/client";
  import { Heart, MessageCircle, MoreHorizontal } from "lucide-svelte";
  import { Card } from "./ui/";

  export let review: Review;

  const { comments, likeIds, createdAt } = review;
</script>

<Card class="flex flex-col gap-2">
  <p>{comments}</p>
  <div class="flex justify-between">
    <div class="flex items-center gap-4">
      <button class="flex items-center gap-2">
        <Heart size={15} />
        {likeIds.length}
      </button>

      <button class="flex items-center gap-2">
        <MessageCircle size={15} />
        {likeIds.length}
      </button>
    </div>

    <div class="flex items-center gap-2">
      <button><MoreHorizontal size={15} /></button>

      <span class="opacity-50">
        {new Date(createdAt).toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </span>
    </div>
  </div>
</Card>

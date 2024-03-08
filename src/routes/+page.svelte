<script>
  import Searchbar from "./searchbar.svelte";
</script>

<Searchbar />

<h1>LectCheck</h1>
Welcome to LectCheck, where you can rate your UM lecturers/professors!

<h1>How it works</h1>
Using LectCheck is as easy as 1-2-3:
<ul class="list-decimal pl-4">
  <li class="ul">Search for Professors</li>
  Start by entering the tag of your professor. You can find this at the end of their
  UMExpert page URL. This is also their um email prepend.
  <ul class="list-disc pl-4">
    <li>
      https://umexpert.um.edu.my/<span class="hl">hamdi</span>
    </li>
    <li>
      <span class="hl">hamdi</span>@um.edu.my
    </li>
  </ul>

  <li class="ul">Read Reviews</li>
  Explore the reviews from fellow students who have taken courses with your chosen
  professors. You'll find ratings and comments that highlight both the strengths
  and weaknesses of each instructor. If there aren't any, see number 3.

  <li class="ul">Share Your Experience</li>
  After taking a course, we encourage you to return the favor by writing your own
  review. Your insights can help future students make informed choices, just as others'
  reviews have helped you.
</ul>

<style lang="postcss">
  .ul {
    @apply my-2 underline underline-offset-4 decoration-2 decoration-yellow-500;
  }
  .hl {
    @apply bg-yellow-500/40 rounded;
  }
</style>

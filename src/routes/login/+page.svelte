<div class="flex h-full items-center justify-center">
  <form class="flex flex-col">
    <label for="email">Email</label>
    <input name="email" type="email" />
    <label for="password">Password</label>
    <input name="password" type="password" />
  </form>
</div>

<style lang="postcss">
  @reference "../../app.css";

  input {
    @apply mb-4;
  }
</style>

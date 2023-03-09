<script lang="ts">
  export let overrideClasses = '';

  const classes = overrideClasses ? overrideClasses : 'w-6 h-6';
</script>

<svg
  class={classes}
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  aria-hidden="true"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    d="M4 6h16M4 12h16M4 18h16"
  />
</svg>

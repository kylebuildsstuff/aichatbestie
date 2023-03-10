<script lang="ts">
  export let overrideClasses = '';

  const classes = overrideClasses
    ? overrideClasses
    : 'absolute top-1 left-1 h-5 w-5 text-indigo-600';
</script>

<svg
  class={classes}
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke-width="1.5"
  stroke="currentColor"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
  />
</svg>

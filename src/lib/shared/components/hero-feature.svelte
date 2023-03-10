<script lang="ts">
  export let title: string;
  export let description: string;
</script>

<div class="relative pl-9">
  <dt class="inline font-semibold text-gray-900">
    <slot name="icon" />
    {title}
  </dt>
  <dd class="inline">
    {description}
  </dd>
</div>

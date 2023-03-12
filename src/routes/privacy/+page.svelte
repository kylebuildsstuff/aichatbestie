<script lang="ts">
  import PageContainer from '$lib/modules/page-container/page-container.svelte';
  import { PRIVACY_POLICY_LINK } from '$lib/shared/shared.constant';
</script>

<PageContainer>
  <!-- Page content -->
  <svelte:fragment slot="page-content">
    <div class="relative flex flex-col bg-white py-12 max-w-7xl px-6 md:px-16 w-full">
      <!-- Page header -->
      <a
        href={PRIVACY_POLICY_LINK}
        target="_blank"
      >
        <h1
          class="text-3xl font-bold tracking-tight text-gray-900 hover:underline hover:text-blue-400"
        >
          Privacy Policy
        </h1>
      </a>

      <!-- Content -->
      <!-- <div class="mt-10 prose">
        {PRIVACY_POLICY_LINK}
      </div> -->
    </div>
  </svelte:fragment>
</PageContainer>

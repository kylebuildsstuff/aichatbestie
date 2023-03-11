<script lang="ts">
  import PageContainer from '$lib/modules/page-container/page-container.svelte';
  import Faq from './faq.svelte';

  let faqs = [
    {
      question: 'What is the best thing about Switzerland?',
      answer:
        'I don’t know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima mollitia quas consequuntur voluptatibus veniam.'
    },
    {
      question: 'Why do you never see elephants hiding in trees?',
      answer:
        'Because they’re so good at it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima mollitia quas consequuntur voluptatibus veniam.'
    },
    {
      question: 'Why do you never see elephants hiding in trees?',
      answer:
        'Because they’re so good at it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima mollitia quas consequuntur voluptatibus veniam.'
    }
  ];
</script>

<PageContainer>
  <!-- Page content -->
  <svelte:fragment slot="page-content">
    <div class="relative flex flex-col bg-white py-12 max-w-7xl px-6 md:px-16 w-full">
      <!-- Page header -->
      <h1 class="text-3xl font-bold tracking-tight text-gray-900">
        Frequently asked questions
      </h1>

      <!-- FAQs -->
      <dl class="mt-10 space-y-6 divide-y divide-gray-900/10">
        {#each faqs as { question, answer }}
          <Faq
            {question}
            {answer}
          />
        {/each}
      </dl>
    </div>
  </svelte:fragment>
</PageContainer>

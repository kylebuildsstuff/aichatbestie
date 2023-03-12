<script lang="ts">
  import PageContainer from '$lib/modules/page-container/page-container.svelte';
  import Faq from './faq.svelte';

  const faqs = [
    // Is the app free?
    {
      question: 'Is the app free?',
      answer:
        'Yes, the app is free to use. It requires you to bring your own OpenAI API key but the base features are free.'
    },
    // How do I get a OpenAI API key?
    {
      question: 'How do I get a OpenAI API key?',
      answer:
        'You can get a OpenAI API key by creating an OpenAI account and registering an app. You can get started at https://platform.openai.com/.'
    },
    // What are the differences between ChatGPT and AI Chat Bestie?
    {
      question: 'What are the differences between ChatGPT and AI Chat Bestie?',
      answer: `Though both products use the same underlying model, AI Chat Bestie allows for faster chat responses, more customized conversations, and guaranteed availability of your chat history.`
    },
    // How is it faster than ChatGPT?
    {
      question: 'How is it faster than ChatGPT?',
      answer:
        'While the full details are not clear, ChatGPT returns responses character by character while AI Chat Bestie gives you the full response at once. From user testing and feedback we found response times, on average, are faster for the same given prompts and messages.'
    },
    // How is availability for chat histories guaranteed?
    {
      question: 'How is availability for chat histories guaranteed?',
      answer:
        "AI Chat Bestie stores your keys, chats, and histories directly in your browser. This means no intermediary servers or databases are used, and your data will remain available to you for as long as you don't clear your browser's Local Storage."
    },
    // How does this app work?
    {
      question: 'How does this app work?',
      answer:
        "The app is essntially a static website. It uses HTML, CSS, and JavaScript to run in your browser. Any data stored or messages sent are strictly between you, your browser, and OpenAI's API. Only registered app accounts and premium features make use of AI Chat Bestie's servers, and even then the core messaging and storage features remain isolated to your browser and OpenAI's API."
    },
    // What features are free to use?
    {
      question: 'Which features are free to use?',
      answer:
        "Chat messages to and from OpenAI's API, local storage of your data, seaching chat history, and some prompt customizations are free to use."
    },
    // What are the benefits of purchasing?
    {
      question: 'What are the benefits of purchasing a Besties Forever membership?',
      answer:
        'Purchasing a one-time Besties Forever membership gives you full access to all current and future premium features. Upcoming features include access to the prompt library, more prompt customizations, saved prompt profiles, device syncing, custom UI changes, and more.'
    },
    // How many chats can I have?
    {
      question: 'How many chats can I have?',
      answer:
        'You can have as many chats as you your browser can store (about 5MB of text). Deleting old chats can help free up space.'
    },
    // How much does it cost to use a OpenAI API Key?
    {
      question: 'How much does it cost to use a OpenAI API Key?',
      answer:
        "It currently costs $0.002 / 1K tokens. Each token is approximately 4 English characters, so it's about $0.002 per 250 characters, which works out to be around $0.002 per 50 words or $0.04 for 1,000 words."
    },
    // Do I need to pay for a ChatGPT API Key?
    {
      question: 'Do I need to pay for a ChatGPT API Key?',
      answer: 'No, creating both an OpenAI account and API key are free.'
    },
    // Do I need to pay for ChatGPT Plus?
    {
      question: 'Do I need to pay for ChatGPT Plus?',
      answer:
        'No, you do not need to pay for ChatGPT Plus in order to use AI Chat Bestie. You just need an OpenAI API key.'
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

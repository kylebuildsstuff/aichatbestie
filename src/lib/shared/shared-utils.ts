import { CHAT_COMPLETION_ENDPOINT, DEFAULT_SYSTEM_MESSAGE } from './shared.constant';

export const throwIfHttpError = (response: any) => {
  if (!response.ok) {
    const formattedErrorString = `${response.status} - ${
      response.statusText
    }: ${JSON.stringify(response)}`;
    throw new Error(formattedErrorString);
  }

  return response;
};

export const readResponseStreamAsJson = (responseStream: any) => {
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/Body/json
   * https://stackoverflow.com/questions/52252848/how-to-get-response-body-and-response-headers-in-one-block
   *
   * Responses coming from 'fetch' return as a stream.
   * Since the app works in objects, the stream must be read
   * to completion to be converted into an object,
   * and it needs to know what type of data to read the stream as (json).
   */
  return responseStream.json();
};

/**
 * Svelte action
 *
 * Dispatch event on click outside of node
 * */
export function onClickOutside(node: any) {
  const handleClick = (event) => {
    if (node && !node.contains(event.target) && !event.defaultPrevented) {
      node.dispatchEvent(new CustomEvent('clickoutside', node));
    }
  };

  document.addEventListener('click', handleClick, true);

  return {
    destroy() {
      document.removeEventListener('click', handleClick, true);
    }
  };
}

/**
 * https://svelte.dev/repl/1c7c89b3a80c48708f0f07720fb37a53?version=3.55.1
 */
export function resizeTextarea(node) {
  let contentRect;
  let entryTarget;
  const ro = new ResizeObserver((entries, observer) => {
    for (const entry of entries) {
      contentRect = entry.contentRect;
      entryTarget = entry.target;
    }
    node.dispatchEvent(
      new CustomEvent('resize', {
        detail: { contentRect, entryTarget }
      })
    );
  });
  ro.observe(node);
  return {
    destroy() {
      ro.disconnect();
    }
  };
}

/**
 * https://platform.openai.com/docs/guides/chat/introduction
 */
export const chatCompletion = async (
  input: string,
  messageHistory: Record<string, string>[],
  openAiKey: string
) => {
  const completionHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${openAiKey}`
  };

  const messages = [
    DEFAULT_SYSTEM_MESSAGE,
    ...messageHistory,
    {
      role: 'user',
      content: input
    }
  ];

  const completionBody = {
    model: 'gpt-3.5-turbo',
    messages
  };

  const completion = await fetch(CHAT_COMPLETION_ENDPOINT, {
    method: 'POST',
    headers: completionHeaders,
    body: JSON.stringify(completionBody)
  })
    .then(throwIfHttpError)
    .then(readResponseStreamAsJson);

  const completionMessage = completion?.choices?.map?.((choice) => ({
    role: choice.message?.role,
    content: choice.message?.content
  }));

  return completionMessage;
};

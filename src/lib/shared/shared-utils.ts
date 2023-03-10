import {
  CHAT_COMPLETION_ENDPOINT,
  DEFAULT_SYSTEM_MESSAGE,
  DEFAULT_SYSTEM_MESSAGE_CONTENT
} from './shared.constant';
import {
  MESSAGE_ROLE,
  type Chat,
  type ChatListItem,
  type Message
} from './shared.type';

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
  const ro = new ResizeObserver(
    (
      entries
      // observer
    ) => {
      for (const entry of entries) {
        contentRect = entry.contentRect;
        entryTarget = entry.target;
      }
      node.dispatchEvent(
        new CustomEvent('resize', {
          detail: { contentRect, entryTarget }
        })
      );
    }
  );
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
    ...messageHistory,
    {
      role: MESSAGE_ROLE.USER,
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
  }).then(readResponseStreamAsJson);

  const { error } = completion;

  const completionMessage = completion?.choices?.map?.((choice) => ({
    role: choice.message?.role,
    content: choice.message?.content
  }));

  /**
   * success: { choices: [...], usage: {...}, created: number, model, object }
   * error: { code}
   */
  return error
    ? { error, data: null }
    : completionMessage
    ? { data: completionMessage, error: null }
    : {
        data: null,
        error: {
          code: 'unknown',
          message: 'Request to OpenAI failed'
        }
      };
};

export const truncateString = (str: string, cutLength = 18) => {
  const truncated = str.substring(0, cutLength);

  return truncated.length < str.length ? `${truncated}...` : truncated;
};

export const truncateStringInMiddle = (str: string, cutLength = 4) => {
  const cutStart = str.substring(0, cutLength);
  const cutEnd = str.substring(str.length - cutLength, str.length);
  return `${cutStart}...${cutEnd}`;
};

export const createNewChatListItem = (
  chatId: string,
  description = ''
): ChatListItem => {
  return {
    chatId,
    title: 'New chat',
    description
  };
};

export const createNewChat = (
  chatId: string,
  config = {
    systemMessage: DEFAULT_SYSTEM_MESSAGE_CONTENT,
    messages: [DEFAULT_SYSTEM_MESSAGE]
  }
): Chat => {
  return {
    chatId,
    systemMessage: config?.systemMessage,
    messages: config?.messages
  };
};

export const isNotSystemMessage = (message: Message) => {
  return message?.role !== MESSAGE_ROLE.SYSTEM;
};

// Svelte action
export function autofocus(el: any) {
  el.focus();
}

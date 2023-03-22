import { isEmpty, isNil } from 'ramda';
import { CHAT_COMPLETION_ENDPOINT, DEFAULT_SYSTEM_MESSAGE } from './shared.constant';
import { user$, userSettings$ } from './shared.store';
import {
  GPT_MODEL,
  MESSAGE_ROLE,
  type Chat,
  type ChatListItem,
  type Message,
  type SavedPrompt
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

export const throwIfGraphqlError = (response: any) => {
  if (response.errors && !isNil(response.errors)) {
    throw new Error(JSON.stringify(response));
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
 * https://platform.openai.com/docs/guides/chat/introduction
 */
export const chatCompletion = async (
  input: string,
  messageHistory: Record<string, string>[],
  openAiKey: string,
  model = GPT_MODEL.GPT_3_5_TURBO
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
    model,
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

export const hasuraGraphqlRequest = async <T>(
  query: string,
  variables = {},
  hasuraUrl = '',
  hasuraJwtToken: string
): Promise<T> => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${hasuraJwtToken}`
  };

  const body = JSON.stringify({
    query,
    variables: isNil(variables) || isEmpty(variables) ? null : variables
  });

  return await fetch(hasuraUrl, {
    method: 'POST',
    headers,
    body
  })
    .then(throwIfHttpError)
    .then(readResponseStreamAsJson)
    .then(throwIfGraphqlError);
};

export const truncateString = (str = '', cutLength = 18) => {
  const truncated = str?.substring?.(0, cutLength);

  return truncated.length < str.length ? `${truncated}...` : truncated;
};

export const truncateStringInMiddle = (str = '', cutLength = 4) => {
  const cutStart = str.substring(0, cutLength);
  const cutEnd = str.substring(str.length - cutLength, str.length);
  return `${cutStart}...${cutEnd}`;
};

export const createNewChatListItem = (chatId: string): ChatListItem => {
  return {
    chatId,
    title: 'New chat'
  };
};

export const createNewChat = (
  chatId: string,
  messages = [DEFAULT_SYSTEM_MESSAGE]
): Chat => {
  return {
    chatId,
    messages
  };
};

export const isNotSystemMessage = (message: Message) => {
  return message?.role !== MESSAGE_ROLE.SYSTEM;
};

// Svelte action
export function autofocus(el: any) {
  el.focus();
}

export const clearUserData = () => {
  user$.set({} as any);
  userSettings$.set({} as any);
};

export function resizeTextarea(event) {
  event.target.style.height = 'auto';
  event.target.style.height = event.target.scrollHeight + 'px';
}

export const createSavedPrompt = (prompt: string, title = ''): SavedPrompt => {
  return {
    title,
    prompt
  };
};

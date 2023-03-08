export const load = async ({ params }) => {
  const chatId = params.chatId;

  // const chat = get(chats$) || (browser && localStorage.getItem(chatId));

  return {
    chatId
  };
};

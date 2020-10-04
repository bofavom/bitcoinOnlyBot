import newChatMembers from './newChatMembers'

export default (bot) => {
  bot.on('new_chat_members', newChatMembers)
}
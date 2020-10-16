import { Telegraf } from 'telegraf'

import nconf from './../lib/nconf'
import debug from './../lib/debug'
import userWithoutAliasModel from './../model/userWithoutAlias'

export default () => {
  checkUserWithoutAlias()
}

const checkUserWithoutAlias = async () => {  
  try {
    const bot = new Telegraf(nconf.get('botToken'))
    const noAliasTimeLimit = nconf.get('setting:noAliasTimeLimit')
    const currentDate = Date.now()
    const kickedUsers = []
    const noPassedUsers = await userWithoutAliasModel.findNoPassedUsers()

    noPassedUsers.forEach(async (userEntry, index) => {
      const user = await bot.telegram.getChatMember(userEntry.chatId, userEntry.userId)

      if (user.user.username) 
      {
        userWithoutAliasModel.passUser(userEntry, user.user.username)
        debug('everyHour:checkUserWithoutAlias', `Passed user ${user.user.username}`)
      } 
      else 
      {
        if ((userEntry.warnDate + noAliasTimeLimit) < currentDate) {          
          bot.telegram.kickChatMember(userEntry.chatId, userEntry.userId)
            .then(() => {
              userWithoutAliasModel.expeluser(userEntry, Date.now())
              kickedUsers.push({
                chatId: userEntry.chatId,
                userId: userEntry.userId,
                firstName: user.user.first_name,
                lastName: user.user.last_name
              })
              debug('everyHour:checkUserWithoutAlias', `Kicked user ${user.user.id}, ${user.user.first_name}, ${user.user.last_name}`)
            })
            .catch((err) => {
              if (err.description === 'Bad Request: USER_NOT_PARTICIPANT') {
                userWithoutAliasModel.expeluser(userEntry, Date.now())
                debug('everyHour:checkUserWithoutAlias', `User not participant expeled (${user.user.id}, ${user.user.first_name}, ${user.user.last_name})`)
              } else if (err.description === 'Bad Request: CHAT_ADMIN_REQUIRED') {
                sendAdminRequiredMessage(bot, userEntry.chatId)
              }
            })
            .finally(() => {
              if (index === noPassedUsers.length - 1) sendKickedUsersMessage(bot, kickedUsers)
            })
        }
      }
    })
  } catch (err) {
    debug('everyHour:checkUserWithoutAliasError', err.message)
  }
}

const sendKickedUsersMessage = (bot, kickedUsers) => {

  if (kickedUsers.length === 0) return;
  
  let grouped = kickedUsers.reduce((accumulator, currentValue) => {
    accumulator[currentValue.chatId] = [...accumulator[currentValue.chatId] || [], currentValue]
    return accumulator
   }, {})

  Object.keys(grouped).forEach((key) => {
    const kickedUsersMessage = grouped[key].map((userEntry) => `${userEntry.firstName} ${userEntry.lastName}\n`)
    bot.telegram.sendMessage(Number(key), `Los siguientes usuarios han sido expulsados por no tener alias configurado: \n${kickedUsersMessage}`)
  })
}

const sendAdminRequiredMessage = (bot, chatId) => {
  bot.telegram.sendMessage(chatId, `Estoy intentando expulsar a los usuarios que no tienen un alias configurado, sin embargo, no tengo permisos para hacerlo.`)
}
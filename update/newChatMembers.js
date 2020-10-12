import debug from './../lib/debug'
import userWithoutAliasModel from './../model/userWithoutAlias'

export default async (ctx) => {
  const username = ctx.from.username
  const welcome = `¡Bienvenido al grupo ${ctx.from.first_name}!`
  
  if (username) {
    return ctx.reply(welcome)
  }
  ctx.reply(`${welcome}

Observo que no tienes un nombre de usuario / alias.
Por favor, desde los ajustes de tu perfil, ponte uno.
En 24 horas serás expulsado si no lo haces.

Gracias.
  `)
  return userWithoutAliasModel.insertUserWithoutAlias(
    Date.now(),
    ctx.from.id,
    ctx.chat.id
  )
  .then((result) => result ? debug('newChatMembers', 'Inserted new user without alias.') : debug('newChatMembers', 'Existing new user without alias.'))
  .catch(() => debug('newChatMembersError', 'Error inserting new user without alias to the database.'))
}
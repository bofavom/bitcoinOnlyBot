export default (ctx) => {
  const username = ctx.from.username
  const welcome = `¡Bienvenido al grupo ${ctx.from.first_name}!`
  
  if (username) {
    return ctx.reply(welcome)
  }
  ctx.reply(`${welcome}

Observo que no tienes un nombre de usuario / alias.
Por favor, desde los ajustes de tu perfil, ponte uno y podrás volver a entrar al grupo.

Gracias.
  `)
  return ctx.telegram.kickChatMember(ctx.chat.id, ctx.from.id)
    .then()
    .catch(() => {})
}
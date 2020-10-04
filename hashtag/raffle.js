const exceptions = [
  'nosoyadmin',
]

export default (ctx) => {
  if (exceptions.indexOf(ctx.from.username) !== -1) {
    return ctx.reply(`@${ctx.from.username} NO quiere sortear un bitcoin!`)
  }
  ctx.reply(`@${ctx.from.username} quiere sortear un bitcoin!`)
}
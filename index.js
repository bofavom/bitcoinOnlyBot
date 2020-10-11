import { Telegraf } from 'telegraf'

import nconf from './lib/nconf'
import { connectMongo } from './lib/database'

import hashtag from './hashtag'
import update from './update'
import command from './command'

connectMongo()

const bot = new Telegraf(nconf.get('botToken'))

hashtag(bot)
update(bot)
command(bot)

bot.start((ctx) => {
    ctx.reply('¡Bot iniciado!')
})

bot.launch() 


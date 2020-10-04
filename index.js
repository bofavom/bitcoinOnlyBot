import { Telegraf } from 'telegraf'
import dotenv from 'dotenv'

import hashtag from './hashtag'
import update from './update'
import command from './command'

dotenv.config()

const bot = new Telegraf(process.env.BOT_TOKEN)

hashtag(bot)
update(bot)
command(bot)

bot.start((ctx) => {
    ctx.reply('¡Bot iniciado!')
})

bot.launch() 
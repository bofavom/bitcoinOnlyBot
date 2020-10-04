import { Telegraf } from 'telegraf'
import dotenv from 'dotenv'

import hashtag from './hashtag'
import update from './update'

dotenv.config()

const bot = new Telegraf(process.env.BOT_TOKEN)

hashtag(bot)
update(bot)

bot.start((ctx) => {
    ctx.reply('¡Bot iniciado!')
})

bot.help((ctx) => {
  
})

bot.launch() 
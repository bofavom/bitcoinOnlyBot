import { Telegraf } from 'telegraf'
import dotenv from 'dotenv'

dotenv.config()

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((ctx) => {
    ctx.reply('¡Bot iniciado!')
})

bot.launch() 
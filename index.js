import { Telegraf } from 'telegraf'
import cron from 'node-cron'

import nconf from './lib/nconf'
import { connectMongo } from './lib/database'

import hashtag from './hashtag'
import update from './update'
import command from './command'

import crontab from './crontab'

connectMongo()

const bot = new Telegraf(nconf.get('botToken'))

hashtag(bot)
update(bot)
command(bot)

crontab(cron)

bot.start((ctx) => {
    ctx.reply('¡Bot iniciado!')
})

bot.launch() 


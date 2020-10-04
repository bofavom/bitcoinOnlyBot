import raffle from './raffle'

export default (bot) => {
  bot.hashtag('sorteo', raffle)
}
import bitcoin from './../resource/bitcoin'

export default async (ctx) => {
  try {
    const ticker = await bitcoin.getTicker()
    const price = parseFloat(ticker.result.XXBTZUSD.c[0]).toFixed(2)
    ctx.reply(`Bitcoin a ${price}$ en Kraken`)
  } catch (err) {
    console.log(err)
    ctx.reply('Ha habido un error obteniendo el precio.')
  }
}
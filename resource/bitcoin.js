import axios from 'axios'

export default {
  getTicker: () => 
    new Promise((resolve, reject) => {
      axios.get(
        'https://api.kraken.com/0/public/Ticker',
        {
          headers: { 'User-Agent': 'Firefox' },
          params: { pair: 'XXBTZUSD' }
        }
      )
      .then((res) => resolve(res.data))
      .catch((err) => reject(err))
    })
}
import nconf from 'nconf'

const config = nconf
  .env({
    parseValues: true,
    separator: '_',
  })
  .file(`./config/${process.env.NODE_ENV}.json`)

export default config
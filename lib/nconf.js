import nconf from 'nconf'

nconf
  .env({
    parseValues: true,
    separator: '_',
  })
  .file(`./config/${process.env.NODE_ENV}.json`)

export default nconf
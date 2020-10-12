import nconf from 'nconf'

nconf
  .env({
    parseValues: true,
  })
  .file(`./config/${process.env.NODE_ENV}.json`)

export default nconf
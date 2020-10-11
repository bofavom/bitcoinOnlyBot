import nconf from 'nconf'

nconf
  .env()
  .file(`./config/${process.env.NODE_ENV}.json`)

export default nconf
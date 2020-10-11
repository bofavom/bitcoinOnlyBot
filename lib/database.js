import { MongoClient } from 'mongodb'
import debug from './../lib/debug'
import nconf from './../lib/nconf'

const mongoUser = nconf.get('mongodb:user')
const mongoPwd = nconf.get('mongodb:password')
const mongoHost = nconf.get('mongodb:host')
const mongoDatabase = nconf.get('mongodb:database')

const url = `mongodb://${mongoUser}:${mongoPwd}@${mongoHost}`
const client = new MongoClient(url, { useUnifiedTopology: true })
export let mongoConnection
export let database

export const connectMongo = () => {
  mongoConnection = client.connect((err) => {
    if (err) {
      console.error(err)
      console.error('Error connecting to the database.')
      return process.exit(1)
    }
    database = client.db(mongoDatabase)
    debug('databaseLib', 'Connected to database successfully.')
  })
}
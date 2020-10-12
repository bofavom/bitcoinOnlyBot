import { database } from './../lib/database'
import nconf from './../lib/nconf'

const userWithoutAliasModel = {
  findNoPassedUsers: () =>
    new Promise(async (resolve, reject) => {
      try {
        const collection = database.collection(nconf.get('collection:userWithoutAlias'))
        const query = {
          expelDate: { $exists: false },
          $or: [
            { passed: { $ne: true } },
            { passed: { $exists: false } }
          ]
        }
        const users = await collection.find(query).toArray()
        resolve(users)
      } catch (err) {
        reject(err)
      }
    }),
  insertUserWithoutAlias: (warnDate, userId, chatId) => 
    new Promise(async (resolve, reject) => {
      try {
        const noPassedUsers = await userWithoutAliasModel.findNoPassedUsers()
        const filteredNoPassedUsers = noPassedUsers.filter((userEntry) => userEntry.userId === userId)
        if (filteredNoPassedUsers.length > 0) return resolve(false)

        const user = {
          warnDate: warnDate,
          userId: userId,
          chatId: chatId
        }
    
        const collection = database.collection(nconf.get('collection:userWithoutAlias'))
        await collection.insertOne(user)
        resolve(true)
      } catch (err) {
        console.log(err);
        reject(err)
      }
    }),
  passUser: (userEntry, alias) =>
    new Promise(async (resolve, reject) => {
      try {
        const collection = database.collection(nconf.get('collection:userWithoutAlias'))
        const query = {
          warnDate: userEntry.warnDate,
          userId: userEntry.userId,
          chatId: userEntry.chatId
        }
        const update = {
          $set: {
            passed: true,
            alias: alias
          }
        }
        await collection.updateOne(query, update)
        resolve()
      } catch (err) {
        reject(err)
      }
    }),
  expeluser: (userEntry, expelDate) => 
    new Promise(async (resolve, reject) => {
      try {
        const collection = database.collection(nconf.get('collection:userWithoutAlias'))
        const query = {
          warnDate: userEntry.warnDate,
          userId: userEntry.userId,
          chatId: userEntry.chatId
        }
        const update = {
          $set: {
            passed: false,
            expelDate: expelDate
          }
        }
        await collection.updateOne(query, update)
        resolve()
      } catch (err) {
        reject(err)
      }
    })
}

export default userWithoutAliasModel
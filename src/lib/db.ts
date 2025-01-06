import { app } from 'electron'
import fs from 'node:fs'
import path from 'node:path'
import PouchDB from 'pouchdb'

let dbPath

if (process.platform === 'darwin') {
  dbPath = path.join(app.getPath('appData'), 'devClients', 'my_db')
} else {
  dbPath = path.join(app.getPath('documents'), 'my_db')
  fs.mkdirSync(dbPath, { recursive: true })
}

const dbDir = path.dirname(dbPath)
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true })
}
const dbServer = <T extends {} = {}>() => new PouchDB<T>(dbPath)

export default dbServer

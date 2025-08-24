import { open } from 'sqlite'
import sqlite3 from 'sqlite3'
import path from 'path'
import fs from 'fs'

const DB_PATH = path.resolve(process.cwd(), 'data', 'participants.db')

let dbPromise = null

export async function getDb() {
  if (!dbPromise) {
    // garante que a pasta existe
    const dir = path.dirname(DB_PATH)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

    dbPromise = open({ filename: DB_PATH, driver: sqlite3.Database })
    const db = await dbPromise
    await db.exec(`CREATE TABLE IF NOT EXISTS participants (
      id TEXT PRIMARY KEY,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      participation INTEGER NOT NULL
    )`)
  }
  return dbPromise
}

export async function seedIfEmpty(initial = []) {
  const db = await getDb()
  const row = await db.get('SELECT COUNT(1) as cnt FROM participants')
  if (row.cnt === 0 && initial.length) {
    const insert = await db.prepare('INSERT INTO participants (id, firstName, lastName, participation) VALUES (?, ?, ?, ?)')
    try {
      for (const p of initial) {
        await insert.run(p.id, p.firstName, p.lastName, p.participation)
      }
    } finally {
      await insert.finalize()
    }
  }
}

export async function clearAll() {
  const db = await getDb()
  await db.exec('DELETE FROM participants')
}

export async function allParticipants() {
  const db = await getDb()
  return db.all('SELECT * FROM participants')
}

export async function createParticipant(p) {
  const db = await getDb()
  await db.run('INSERT INTO participants (id, firstName, lastName, participation) VALUES (?, ?, ?, ?)', p.id, p.firstName, p.lastName, p.participation)
  return p
}

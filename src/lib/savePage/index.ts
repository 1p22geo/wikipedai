import { MongoClient } from "mongodb"
import { promptCache } from "@wiki/model/promptCache"
export async function savePage(title: string, content: string) {
  const client = new MongoClient(process.env.MONGO_URI ?? "")
  await client.connect()
  const db = client.db("wikipedai")
  const cache = db.collection<promptCache>("promptCache")

  const res: promptCache = { title, ready: true, content }
  await cache.findOneAndReplace({ title }, { ...res })
  await client.close()
  return res
}

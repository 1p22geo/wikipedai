import { promptCache } from "@wiki/model/promptCache"
import { MongoClient } from "mongodb"

export async function findPage(title: string) {
  const client = new MongoClient(process.env.MONGO_URI ?? "")
  await client.connect()
  const db = client.db("wikipedai")
  const cache = db.collection<promptCache>("promptCache")

  const res = await cache.findOne({ title })
  await client.close()
  return res
}

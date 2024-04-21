import { MongoClient, UpdateFilter } from "mongodb"
import { promptCache } from "@wiki/model/promptCache"

export async function updatePage(title: string, update: UpdateFilter<promptCache>) {
  const client = new MongoClient(process.env.MONGO_URI ?? "")
  await client.connect()
  const db = client.db("wikipedai")
  const cache = db.collection<promptCache>("promptCache")

  await cache.updateOne({ title }, update)
  await client.close()
}

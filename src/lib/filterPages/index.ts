import { Filter, MongoClient } from "mongodb"
import { promptCache } from "@wiki/model/promptCache"

export async function filterPages(filter: Filter<promptCache>) {
  const client = new MongoClient(process.env.MONGO_URI ?? "")
  await client.connect()
  const db = client.db("wikipedai")
  const cache = db.collection<promptCache>("promptCache")

  const res = await cache.find(filter).toArray()
  await client.close()
  return res
}

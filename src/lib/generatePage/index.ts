import { MongoClient } from "mongodb"
import { promptCache } from "@wiki/model/promptCache"
import { generate } from "./generate"

export async function generatePage(title: string) {
  const client = new MongoClient(process.env.MONGO_URI ?? "")
  await client.connect()
  const db = client.db("wikipedai")
  const cache = db.collection<promptCache>("promptCache")
  const article = await cache.findOne({ title })
  if (article) {
    await client.close()
    return
  }
  await cache.insertOne({
    title,
    ready: false,
    content: undefined,
  })
  await client.close()

  generate(title)
}

import { MongoClient } from "mongodb"
import { promptCache } from "@wiki/model/promptCache"

export async function pageSearch(query: string) {
  const client = new MongoClient(process.env.MONGO_URI ?? "")
  await client.connect()
  const db = client.db("wikipedai")
  const cache = db.collection<promptCache>("promptCache")

  const res: promptCache[] = []
  const articles: string[] = []

  for await (const doc of cache.find({
    title: { $regex: query },
  })) {
    res.push(doc)
    articles.push(doc._id.toString())
  }
  for await (const doc of cache.find({
    content: { $regex: query },
  })) {
    if (!articles.includes(doc._id.toString())) {
      res.push(doc)
      articles.push(doc._id.toString())
    }
  }

  await client.close()
  return res
}

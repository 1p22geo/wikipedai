import { ollamaPrompt } from "../prompt"
import { MongoClient } from "mongodb"
import { promptCache } from "@wiki/model/promptCache"
import prompts from "@wiki/prompts/prompts.json"


export async function generate(title: string) {
  const client = new MongoClient(process.env.MONGO_URI ?? "")
  await client.connect()
  const db = client.db("wikipedai")
  const cache = db.collection<promptCache>("promptCache")

  const content: string = await ollamaPrompt(prompts.generatePage.replace("%%%", title))
  const res: promptCache = { title, ready: true, content }
  await cache.findOneAndReplace({ title }, { ...res })
  await client.close()
  return res
}

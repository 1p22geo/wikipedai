import { MongoClient } from "mongodb"
import { promptCache } from "@wiki/model/promptCache"
import prompts from "@wiki/prompts/prompts.json"
import { ollamaPrompt } from "../prompt"

export async function generate(title: string) {
  const client = new MongoClient(process.env.MONGO_URI ?? "")
  await client.connect()
  const db = client.db("wikipedai")
  const cache = db.collection<promptCache>("promptCache")

  let content: string = await ollamaPrompt(prompts.generatePage.replace("%%%", title))
  if (content.endsWith("```")) {
    content = content.split("\n").slice(1, -1).join("\n")
  }
  const res: promptCache = { title, ready: true, content }
  await cache.findOneAndReplace({ title }, { ...res })
  await client.close()
  return res
}

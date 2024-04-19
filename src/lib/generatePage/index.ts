import { MongoClient } from "mongodb"
import { promptCache } from "@wiki/model/promptCache"
import prompts from "@wiki/prompts/prompts.json"
import { PageBeingGeneratedError } from "./errors"
import { ollamaPrompt } from "../prompt"

export async function generatePage(title: string) {
  const client = new MongoClient(process.env.MONGO_URI ?? "")
  await client.connect()
  const db = client.db("wikipedai")
  const cache = db.collection<promptCache>("promptCache")
  const article = await cache.findOne({ title })
  if (article) {
    if (article.ready) {
      return article
    } else {
      throw new PageBeingGeneratedError()
      // TODO: perhaps poll the database or wait until this article exists
    }
  }
  await cache.insertOne({
    title,
    ready: false,
    content: undefined,
  })

  const content: string = await ollamaPrompt(prompts.generatePage.replace("%%%", title))
  const res = { title, ready: true, content }
  await cache.findOneAndReplace({ title }, { ...res })
  await client.close()
  return res
}

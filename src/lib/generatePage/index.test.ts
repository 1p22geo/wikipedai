import { MongoClient } from "mongodb"
import { generatePage } from "."

describe("lib/generatePage:async:ollama:mongo", () => {
  it("generates pages", async () => {
    const client = new MongoClient(process.env.MONGO_URI ?? "")
    await client.connect()
    const db = client.db("wikipedai")
    const cache = db.collection("promptCache")
    await cache.drop()
    await client.close()


    const res = await generatePage("Poland")
    expect(res.content).toMatch(/poland/i)
  }, 300000)
})

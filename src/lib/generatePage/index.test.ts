import { MongoClient } from "mongodb"
import { findPage } from "../findPage"
import { generatePage } from "."

describe("lib/generatePage:async:ollama:mongo", () => {
  it("generates pages", async () => {
    const client = new MongoClient(process.env.MONGO_URI ?? "")
    await client.connect()
    const db = client.db("wikipedai")
    const cache = db.collection("promptCache")
    await cache.drop()
    await client.close()

    await generatePage("Poland")
    while (true) {
      const res = await findPage("Poland")
      if (!res?.ready) continue
      expect(res?.content).toMatch(/poland/i)
      break
    }
  }, 300000)
  it("works with two pages generated at the same time", async () => {
    expect.assertions(3)
    const client = new MongoClient(process.env.MONGO_URI ?? "")
    await client.connect()
    const db = client.db("wikipedai")
    const cache = db.collection("promptCache")
    await cache.drop()
    await client.close()

    await generatePage("Linux")
    await generatePage("Linux")
    while (true) {
      const res = await findPage("Linux")
      if (!res?.ready) continue
      expect(res?.content).toMatch(/linux/i)
      break
    }
    await generatePage("Linux")
    const res = await findPage("Linux")
    expect(res?.content).toMatch(/linux/i)
    expect(res?.ready).toBeTruthy()
    return
  }, 300000)
})

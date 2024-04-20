import { MongoClient } from "mongodb"
import { PageBeingGeneratedError } from "./errors"
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
    return
  }, 300000)
  it("throws on two pages generated at the same time", async () => {
    expect.assertions(2)
    const client = new MongoClient(process.env.MONGO_URI ?? "")
    await client.connect()
    const db = client.db("wikipedai")
    const cache = db.collection("promptCache")
    await cache.drop()
    await client.close()

    const r = generatePage("Linux")
    await new Promise((resolve) => {
      setTimeout(resolve, 2000)
    })
    try {
      await generatePage("Linux")
    }
    catch (e) {
      expect(e).toBeInstanceOf(PageBeingGeneratedError)
    }
    const res = await r
    expect(res.ready).toBeTruthy()
    return
  }, 300000)
})

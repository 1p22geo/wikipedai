import { ollamaPrompt } from "."
describe("lib/prompt:async:ollama", () => {
  it("sends prompts", async () => {
    const res = await ollamaPrompt("What's 2+2")
    expect(res).toMatch(/4/i)
  }, 300000)
})

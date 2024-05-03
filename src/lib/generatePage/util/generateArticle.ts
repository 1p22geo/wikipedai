import { ollamaPrompt } from "@wiki/lib/prompt"
import prompts from "@wiki/prompts/prompts.json"
import { generateOutline } from "./generateOutline"

export async function generateArticle(title: string, retries_article: number, retries_outline: number) {
  const outline = await generateOutline(title, retries_outline)
  const system = prompts.generateArticle.system
  const prompt = prompts.generateArticle.prompt.replace("%1%", title).replace("%2%", outline)
  let responses = []

  for (let n = 0; n < retries_article; n++) {
    try {
      let res = await ollamaPrompt(prompt, {
        system,
        model: prompts.generateArticle.model,
        options: {
          seed: Math.random(),
          temperature: 0.1,
        },
      })
      responses.push(res)
    } catch { }
  }
  responses = responses.sort((a: string, b: string) => b.length - a.length)
  return responses[0] || ""
}

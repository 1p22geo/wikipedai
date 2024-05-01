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

      let res = await ollamaPrompt(prompt, system)
      console.log(res)
      try {
        if (!res.split("\n")[0]?.match(/#/)) {
          res = res.split("```").splice(1, res.split("\n").length - 2).join("\n") || res
        }
      }
      catch { }
      console.log(res)
      try {
        if (res.split("\n")[0]?.match(/markdown/)) {
          res = res.split("\n").slice(1).join("\n") || res
        }
      }
      catch { }
      console.log(res)
      responses.push(res)
      console.log(`Generated prompt ${n} of stage 2`)
    }
    catch {
      console.warn(`Error generating prompt ${n} of stage 2`)
    }
  }
  responses = responses.sort((a: string, b: string) => b.length - a.length)
  return responses[0] || ''
}

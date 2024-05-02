import { ollamaPrompt } from "@wiki/lib/prompt"
import prompts from "@wiki/prompts/prompts.json"

export async function generateOutline(title: string, retries: number) {
  const system = prompts.generateOutline.system
  const prompt = prompts.generateOutline.prompt.replace("%1%", title)
  let responses = []

  for (let n = 0; n < retries; n++) {
    try {
      let res = await ollamaPrompt(prompt, {
        system,
        model: prompts.generateOutline.model,
        options: {
          seed: Math.random(),
          temperature: 0.1
        }
      })
      try {
        res = res.split("```")[1] || res
      }
      catch { }
      try {
        if (res.split("\n")[0]?.match(/markdown/)) {
          res = res.split("\n").slice(1).join("\n") || res
        }
      }
      catch { }
      responses.push(res)
      console.log(`Generated prompt ${n} of stage 1`)
    }
    catch {
      console.warn(`Error generating prompt ${n} of stage 1`)
    }
  }
  responses = responses.sort((a: string, b: string) => b.length - a.length)
  return responses[0] || ""
}

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
          temperature: 0.1,
        },
      })
      responses.push(res)
    } catch { }
  }
  responses = responses.sort((a: string, b: string) => b.length - a.length)
  return responses[0] || ""
}

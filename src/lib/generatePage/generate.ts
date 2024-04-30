import prompts from "@wiki/prompts/prompts.json"
import { ollamaPrompt } from "../prompt"
import { savePage } from "../savePage"

export async function generate(title: string) {

  let content: string = await ollamaPrompt(prompts.generatePage.replace("%%%", title))
  if (content.endsWith("```")) {
    content = content.split("\n").slice(1, -1).join("\n")
  }

  return await savePage(title, content)
}

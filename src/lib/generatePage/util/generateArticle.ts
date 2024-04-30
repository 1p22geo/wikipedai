import { ollamaPrompt } from "@wiki/lib/prompt"
import { generateOutline } from "./generateOutline"

export async function generateArticle(title: string, retries_article: number, retries_outline: number) {
  const outline = await generateOutline(title, retries_outline)
  const system = `
You are an experienced Wikpedia writer.
Write long, informative and creative articles.
`
  const prompt = `
Create an article in Markdown with the style of Wikipedia.
Write a long and informative article.
Do not use links or references.
The topic is "${title}".
Here is an outline of the article.
\`\`\`markdown
${outline}
\`\`\`
`
  let responses = []

  for (let n = 0; n < retries_article; n++) {
    try {

      let res = await ollamaPrompt(system, prompt)
      try {
        res = res.split("```")[1] || res
      }
      catch { }
      try {
        if (res.startsWith("markdown")) {
          res = res.split("\n").slice(1).join("\n") || res
        }
      }
      catch { }
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

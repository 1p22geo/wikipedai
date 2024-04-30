import { ollamaPrompt } from "@wiki/lib/prompt"

export async function generateOutline(title: string, retries: number) {
  const system = `
You are a helpful AI assistant.
Create short and informative responses, with no additional comments.
`
  const prompt = `
Q: Create an outline of titles and subtitles for a Wikipedia article, using Markdown. Output just the article outline. The title of the article is "${title}".
A: 
`
  let responses = []

  for (let n = 0; n < retries; n++) {
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
      console.log(`Generated prompt ${n} of stage 1`)
    }
    catch {
      console.warn(`Error generating prompt ${n} of stage 1`)
    }
  }
  responses = responses.sort((a: string, b: string) => b.length - a.length)
  return responses[0]
}

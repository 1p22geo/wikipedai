import { generateArticle } from "./util/generateArticle"
import { savePage } from "../savePage"

export async function generate(title: string) {

  let content = await generateArticle(title, 1, 2)
  content = content.replace(/\[[0-9]*\]/g, "")

  return await savePage(title, content)
}

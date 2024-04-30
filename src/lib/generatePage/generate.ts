import { generateArticle } from "./util/generateArticle"
import { savePage } from "../savePage"

export async function generate(title: string) {

  let content = await generateArticle(title, 1, 2)

  return await savePage(title, content)
}

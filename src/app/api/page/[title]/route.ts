import { NextRequest } from "next/server"
import { findPage } from "@wiki/lib/findPage"
import { generatePage } from "@wiki/lib/generatePage"

export async function GET(request: NextRequest, { params: { title } }: { params: { title: string } }) {
  if (title.match(/[^a-zA-Z _]/)) {
    console.warn(`Article title ${title} rejected, not generating.`)
    return Response.json({ error: "Forbidden characters detected" }, { status: 400 })
  }
  const article = title.trim().charAt(0).toUpperCase() + title.trim().slice(1).replace("_", " ").toLowerCase()
  await generatePage(article)
  const page = await findPage(article)

  if (page) return Response.json({ ...page })
  else return Response.json({ error: "Something went wrong" }, { status: 500 })
}

import { NextRequest } from "next/server"
import { filterPages } from "@wiki/lib/filterPages"

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const query = new URL(request.url).searchParams.get("q") ?? undefined
  const docs = await filterPages({ $or: [{ title: { $regex: query, $options: "i" } }, { content: { $regex: query, $options: "i" } }] })

  return Response.json(docs)
}

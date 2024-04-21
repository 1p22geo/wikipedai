import { NextRequest } from "next/server"
import { pageSearch } from "@wiki/lib/pageSearch"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  const query = new URL(request.url).searchParams.get("q") ?? ""
  const docs = await pageSearch(query);

  return Response.json(docs)
}

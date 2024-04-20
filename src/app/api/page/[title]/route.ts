import { NextRequest } from "next/server"
import { findPage } from "@wiki/lib/findPage"
import { generatePage } from "@wiki/lib/generatePage"

export async function GET(request: NextRequest, { params: { title } }: { params: { title: string } }) {
  await generatePage(title)
  const page = await findPage(title)

  if (page) return Response.json({ page })
  else return Response.json({ error: "Something went wrong" }, { status: 500 })
}

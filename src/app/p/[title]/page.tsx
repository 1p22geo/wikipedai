import { revalidateTag } from "next/cache"
import Markdown from "react-markdown"
import { promptCache } from "@wiki/model/promptCache"

export default async function Page({ params: { title } }: { params: { title: string } }) {
  const res = (await (await fetch(`${process.env.URL_BASE}/api/page/${title}`, { next: { tags: [title] } })).json()) as promptCache
  if (res.ready) {
    return (
      <div className="prose prose-slate">
        <Markdown>{res.content}</Markdown>
      </div>
    )
  } else {
    revalidateTag(title)
    return (
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-center text-xl">Please wait, we are generating your article</h1>
        <div className="h-24 w-24 animate-spin rounded-full bg-slate-600">
          <div className="ml-2 mt-2 h-20 w-20 rounded-full bg-white"></div>
          <div className="ml-12 h-2 w-2 bg-white"></div>
        </div>
      </div>
    )
  }
}

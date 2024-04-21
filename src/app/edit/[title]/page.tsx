import { revalidateTag } from "next/cache"
import { ArticleEditor } from "@wiki/components/ArticleEditor"
import { updatePage } from "@wiki/lib/updatePage"
import { promptCache } from "@wiki/model/promptCache"
import { Metadata } from "next"
export const metadata: Metadata = {
  title: "WikipedAI | editing article",
}
export default async function Page({ params: { title } }: { params: { title: string } }) {
  const res = (await (
    await fetch(`${process.env.URL_BASE}/api/page/${title}`, { next: { tags: [title] } })
  ).json()) as promptCache
  if (res.ready) {
    return (
      <>
        <div className="flex flex-row items-center gap-2">
          Editing: {title}
          <a className="cursor-pointer hover:underline" href={`/p/${title}`}>
            [view]
          </a>
        </div>
        <ArticleEditor
          article={res}
          save={async (form: FormData) => {
            "use server"
            const content = (form.get("content") ?? "") as string
            await updatePage(title, {
              $set: {
                content
              }
            })
            revalidateTag(title)
          }}
          returnLink={`${process.env.URL_BASE}/p/${title}`}
        />
      </>
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

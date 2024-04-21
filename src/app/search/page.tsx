import Markdown from "react-markdown"
import { promptCache } from "@wiki/model/promptCache"

export default async function Page({ searchParams }: { searchParams: { q: string } }) {
  const query = searchParams.q ?? undefined
  const url = new URL(`${process.env.URL_BASE}/api/search`)
  url.searchParams.set("q", query)
  const res = (await (await fetch(url, { next: { revalidate: 0 } })).json()) as promptCache[]
  return (
    <ul>
      <li>
        <a href={`/p/${query}`} className="group flex w-[600px] flex-col items-start p-2">
          <h2 className="mb-8 text-2xl font-bold group-hover:underline">Generate article: &lt;{query}&gt;</h2>
        </a>
      </li>
      {res.length ? (
        <>
          <li>{res.length} articles found:</li>
          {res.map((q) => {
            return (
              <li key={q.title}>
                <a href={`/p/${q.title}`} className="group flex w-[600px] flex-col items-start p-2">
                  <h2 className="text-2xl font-bold group-hover:underline">{q.title}</h2>
                  {q.ready ?
                    <Markdown>{`${q.content?.slice(0, 200)}...`}</Markdown> : <>Generating...</>
                  }
                </a>
              </li>
            )
          })}
        </>
      ) : (
        <>No articles found.</>
      )}
    </ul>
  )
}

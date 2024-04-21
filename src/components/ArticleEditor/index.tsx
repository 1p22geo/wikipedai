"use client"

import { promptCache } from "@wiki/model/promptCache"
export function ArticleEditor({
  article,
  save,
  returnLink,
}: {
  article: promptCache
  save: (form: FormData) => Promise<void>
  returnLink?: string
}) {
  return (
    <>
      <form action={save}>
        <textarea name="content" cols={100} rows={30} defaultValue={article.content} />
        <input type="submit" id="submit-edit" className="sr-only" />
        <div className="ml-auto flex w-fit flex-row gap-4">
          {returnLink ? (
            <a href={returnLink}>
              <div className="place-center grid w-fit border-2 border-slate-600 bg-white px-4 py-2 text-center text-slate-600">
                <span className="block">Cancel</span>
              </div>
            </a>
          ) : (
            <></>
          )}
          <label htmlFor="submit-edit">
            <div className="place-center grid w-fit cursor-pointer bg-slate-600 px-4 py-2 text-center text-white">
              <span className="block">Save changes</span>
            </div>
          </label>
        </div>
      </form>
    </>
  )
}

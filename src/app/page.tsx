import { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "WikipedAI",
}

export default function Web() {
  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto grid max-w-screen-xl px-4 py-8 text-center lg:py-16">
          <div className="mx-auto flex flex-col items-center place-self-center">
            <Image alt="wikipedai logo" src="/logo.png" width={400} height={400}></Image>
            <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight dark:text-white md:text-5xl xl:text-6xl">
              WikipedAI
            </h1>
            <h2 className="mb-8 text-xl font-bold tracking-widest">no, it&apos;s not a typo</h2>
            <p className="mb-6 max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-xl">
              Like Wikipedia, but Ollama and AI-generated. <br /> The image is AI generated too
            </p>
            <form method="GET" action="/search" className="flex flex-row items-center gap-2 px-4">
              <input name="q" className="border-b-2 p-1 outline-none focus:border-black" placeholder="Search..." />
              <input type="submit" id="submit-main" className="sr-only" />
              <label
                htmlFor="submit-main"
                className="flex h-10 w-10 cursor-pointer flex-row items-center justify-center gap-0 rounded-full bg-slate-200 font-bold text-slate-500 transition-all hover:gap-2 hover:text-slate-800"
              >
                <span>-</span>
                <span className="-ml-1 mt-[1.2px]">&gt;</span>
              </label>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

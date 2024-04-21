import "@wiki/styles/tailwind.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col items-center">
          <header className="sticky top-0 flex w-full flex-row items-start p-2">
            <a href="/" className="mr-auto text-lg font-semibold">
              WikpedAI
            </a>
            <form method="GET" action="/search" className="flex flex-row items-center gap-2 px-4">
              <input name="q" className="border-b-2 p-1 outline-none focus:border-black" placeholder="Search..." />
              <input type="submit" id="submit" className="sr-only" />
              <label
                htmlFor="submit"
                className="flex h-10 w-10 cursor-pointer flex-row items-center justify-center gap-0 rounded-full bg-slate-200 font-bold text-slate-500 transition-all hover:gap-2 hover:text-slate-800"
              >
                <span>-</span>
                <span className="-ml-1 mt-[1.2px]">&gt;</span>
              </label>
            </form>
          </header>
          {children}
        </div>
      </body>
    </html>
  )
}

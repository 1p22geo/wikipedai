"use client"
import React, { useRef, useState } from "react"

export function ShareButton({ url, children }: { url: string; children: React.ReactNode }) {
  const [copied, setCopied] = useState(false)
  const tm = useRef<number | null>(null)
  return (
    <>
      <div className="inline cursor-pointer hover:underline">
        <div
          onClick={() => {
            window.navigator.clipboard.writeText(url)
            setCopied(true)
            let x = window.setTimeout(() => {
              setCopied(false)
            }, 1500)
            tm.current = x
          }}
        >
          {children}
        </div>
        {copied ? (
          <>
            <div
              className="absolute mt-2 p-2 text-slate-600 shadow-xl"
              onClick={() => {
                setCopied(false)
                if (tm.current) {
                  clearTimeout(tm.current)
                }
              }}
            >
              <h2 className="font-bold">Copied link to clipboard</h2>
              <code>{url}</code>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  )
}

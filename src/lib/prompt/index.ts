import { ollamaRequest } from "@wiki/model/ollama"

export function ollamaPrompt(
  prompt: string,
  options?: {
    model?: string
    system?: string
    options?: {
      seed: number
      temperature: number
    }
  }
) {
  return new Promise<string>((resolve, reject) => {
    const req: ollamaRequest = {
      raw: false,
      prompt: prompt,
      model: options?.model || "mistral",
      ...options,
    }
    fetch(new URL("/api/generate", process.env.OLLAMA_URI), {
      body: JSON.stringify(req),
      method: "POST",
    }).then((res) => {
      if (!res.ok) reject()
      res.text().then((_res: string) => {
        const _arr = _res.split("\n").join(",")
        const _json = `[${_arr.substring(0, _arr.length - 1)}]`
        let answer = ""
        const _js = JSON.parse(_json) as { response: string }[]
        _js.forEach((elem) => {
          answer += elem.response
        })
        resolve(answer)
      })
    })
  })
}

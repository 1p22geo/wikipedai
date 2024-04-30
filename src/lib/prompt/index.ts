import { ollamaRequest, ollamaResponse } from "@wiki/model/ollama"

export function ollamaPrompt(req: string, system?: string) {
  return new Promise<string>((resolve, reject) => {
    fetch(new URL("/api/generate", process.env.OLLAMA_URI), {
      body: JSON.stringify({
        model: "mistral",
        raw: false,
        system: system,
        prompt: req,
      } as ollamaRequest),
      method: "POST",
    }).then((res) => {
      if (!res.ok) reject()
      res.text().then((_res: string) => {
        const _arr = _res.split("\n").join(",")
        const _json = `[${_arr.substring(0, _arr.length - 1)}]`
        let answer = ""
        const _js = JSON.parse(_json) as { response: string }[]
        _js.forEach(elem => {
          answer += elem.response
        });
        resolve(answer)
      })
    })
  })
}

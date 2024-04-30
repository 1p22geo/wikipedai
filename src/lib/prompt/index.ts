import { ollamaRequest, ollamaResponse } from "@wiki/model/ollama"

export function ollamaPrompt(req: string, system?: string) {
  return new Promise<string>((resolve, reject) => {
    fetch(new URL("/api/generate", process.env.OLLAMA_URI), {
      body: JSON.stringify({
        model: "mistral",
        stream: false,
        raw: false,
        system: system,
        prompt: req,
      } as ollamaRequest),
      method: "POST",
    }).then((res) => {
      if (!res.ok) reject()
      res.json().then((_js) => {
        const json = _js as ollamaResponse
        resolve(json.response)
      })
    })
  })
}

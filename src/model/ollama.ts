export interface ollamaRequest {
  model: string
  stream?: boolean
  prompt: string
  system?: string
  raw?: boolean
  options?: {
    seed: number
    temperature: number
  }
}
export interface ollamaResponse {
  response: string
}

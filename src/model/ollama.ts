export interface ollamaRequest {
  model: string
  stream?: boolean
  prompt: string
}
export interface ollamaResponse {
  response: string
}

export interface ollamaRequest {
  model: string
  stream?: boolean
  prompt: string
  system?: string
}
export interface ollamaResponse {
  response: string
}

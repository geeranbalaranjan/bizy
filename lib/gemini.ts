import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

const DEFAULT_MODEL = 'gemini-2.5-flash'

export const geminiFlash = genAI.getGenerativeModel({ model: DEFAULT_MODEL })

export const gemini20Flash = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

export function getGenerativeModel(modelId: string = DEFAULT_MODEL) {
  return genAI.getGenerativeModel({ model: modelId })
}

export async function promptGemini(
  prompt: string,
  systemPrompt?: string,
  model: string = DEFAULT_MODEL
): Promise<string> {
  const genModel = genAI.getGenerativeModel({
    model,
    systemInstruction: systemPrompt,
  })

  const result = await genModel.generateContent(prompt)
  return result.response.text()
}

export async function promptGeminiJSON<T>(
  prompt: string,
  systemPrompt?: string,
  model: string = DEFAULT_MODEL
): Promise<T> {
  const text = await promptGemini(
    `${prompt}\n\nRespond ONLY with valid JSON. No markdown, no explanation.`,
    systemPrompt,
    model
  )

  const clean = text.replace(/```json\n?|\n?```/g, '').trim()
  return JSON.parse(clean) as T
}

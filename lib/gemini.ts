import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export const geminiFlash = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

export async function promptGemini(
  prompt: string,
  systemPrompt?: string
): Promise<string> {
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    systemInstruction: systemPrompt,
  })

  const result = await model.generateContent(prompt)
  return result.response.text()
}

export async function promptGeminiJSON<T>(
  prompt: string,
  systemPrompt?: string
): Promise<T> {
  const text = await promptGemini(
    `${prompt}\n\nRespond ONLY with valid JSON. No markdown, no explanation.`,
    systemPrompt
  )

  const clean = text.replace(/```json\n?|\n?```/g, '').trim()
  return JSON.parse(clean) as T
}

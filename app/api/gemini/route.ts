import { NextRequest, NextResponse } from 'next/server'
import { getGenerativeModel } from '@/lib/gemini'
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from '@/lib/i18n'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface GeminiRequestBody {
  messages: ChatMessage[]
  systemPrompt?: string
  model?: string
  language?: string
}

// Helper to get language name for prompts
function getLanguageName(code: string): string {
  const lang = SUPPORTED_LANGUAGES.find(l => l.code === code)
  return lang?.name || 'English'
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as GeminiRequestBody
    const { messages, systemPrompt, model, language = DEFAULT_LANGUAGE } = body
    const languageName = getLanguageName(language)

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'messages array is required' },
        { status: 400 }
      )
    }

    const history = messages.slice(0, -1).map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }))

    const lastMessage = messages[messages.length - 1]
    if (!lastMessage || lastMessage.role !== 'user') {
      return NextResponse.json(
        { error: 'Last message must be from user' },
        { status: 400 }
      )
    }

    const genModel = getGenerativeModel(model || 'gemini-2.5-flash')

    // Add language instruction to system prompt
    const languageInstruction = language !== 'en' 
      ? `IMPORTANT: Always respond in ${languageName} language.\n\n` 
      : ''

    // Gemini 2.5 can reject systemInstruction as a string (400). Prepend to user message instead.
    const userContent =
      systemPrompt && systemPrompt.trim()
        ? `${languageInstruction}${systemPrompt.trim()}\n\n${lastMessage.content}`
        : `${languageInstruction}${lastMessage.content}`

    const chat = genModel.startChat({
      history,
    })

    const result = await chat.sendMessage(userContent)
    const text = result.response.text()

    return NextResponse.json({ response: text })
  } catch (error) {
    console.error('Gemini API error:', error)
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    )
  }
}

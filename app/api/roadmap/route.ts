import { NextRequest, NextResponse } from 'next/server'
import { promptGeminiJSON } from '@/lib/gemini'
import type { RoadmapStep, RoadmapCategory } from '@/types'

interface RoadmapRequestBody {
  businessType: string
  province: string
  city: string
  stage: string
}

interface GeminiRoadmapResponse {
  steps: Array<{
    id: string
    title: string
    description: string
    estimatedTime: string
    estimatedCost: string
    actionUrl: string
    category: RoadmapCategory
    isRequired: boolean
  }>
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as RoadmapRequestBody
    const { businessType, province, city, stage } = body

    if (!businessType || !province || !city || !stage) {
      return NextResponse.json(
        { error: 'businessType, province, city, and stage are required' },
        { status: 400 }
      )
    }

    const systemPrompt = `You are a Canadian small business advisor. Generate a personalized startup roadmap.
Each step must have: id (unique string), title, description, estimatedTime (e.g. "1-2 weeks"), estimatedCost (e.g. "$0" or "$500"), actionUrl (relevant gov/canada URL or empty string), category (legal|financial|licensing|hr|operations|marketing), isRequired (boolean).
Return 8-12 steps as a JSON object with a "steps" array.`

    const prompt = `Create a startup roadmap for:
- Business type: ${businessType}
- Province: ${province}
- City: ${city}
- Stage: ${stage}

Return steps array with id, title, description, estimatedTime, estimatedCost, actionUrl, category, isRequired.`

    const aiResponse = await promptGeminiJSON<GeminiRoadmapResponse>(
      prompt,
      systemPrompt
    )

    const steps: RoadmapStep[] = (aiResponse.steps ?? []).map((s) => ({
      id: s.id,
      title: s.title,
      description: s.description,
      estimatedTime: s.estimatedTime,
      estimatedCost: s.estimatedCost,
      actionUrl: s.actionUrl ?? '',
      category: s.category,
      isComplete: false,
      isRequired: s.isRequired ?? true,
    }))

    return NextResponse.json({ steps })
  } catch (error) {
    console.error('Roadmap API error:', error)
    return NextResponse.json(
      { error: 'Failed to generate roadmap' },
      { status: 500 }
    )
  }
}

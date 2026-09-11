import OpenAI from 'openai'

let client: OpenAI | null = null

export function getOpenAI() {
  if (!process.env.OPENAI_API_KEY) return null
  if (!client) client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  return client
}

export async function generateAgentResponse(input: {
  agentName: string
  agentRole: string
  task: string
  businessContext?: string
}) {
  const openai = getOpenAI()
  if (!openai) {
    return {
      mode: 'sandbox' as const,
      content: `[Sandbox] ${input.agentName} received this task: ${input.task}`,
    }
  }

  const response = await openai.responses.create({
    model: process.env.OPENAI_MODEL || 'gpt-5-mini',
    instructions: `You are ${input.agentName}, a specialist intelligence agent inside Lesedi AnI (Ancestral Intelligence), built by VAH Labs. Role: ${input.agentRole}. Be practical, concise and execution-oriented. Respect African context and human agency. Never claim an external action was completed unless a real tool executed it. If approval is required, clearly say so.`,
    input: `Business context:\n${input.businessContext || 'No business context supplied.'}\n\nTask:\n${input.task}`,
  })

  return { mode: 'live' as const, content: response.output_text }
}

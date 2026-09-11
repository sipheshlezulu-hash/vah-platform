import { NextResponse } from 'next/server'
import { generateAgentResponse } from '@/lib/ai/openai'
import { routeTask } from '@/lib/agents/registry'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const task = typeof body.task === 'string' ? body.task.trim() : ''
    const businessContext = typeof body.businessContext === 'string' ? body.businessContext : ''

    if (!task) return NextResponse.json({ error: 'Task is required.' }, { status: 400 })

    const agent = routeTask(task)
    const result = await generateAgentResponse({ agentName: agent.name, agentRole: agent.role, task, businessContext })

    return NextResponse.json({ ok: true, orchestrator: 'Lesedi Chief', agent, ...result, requiresApproval: true })
  } catch (error) {
    console.error('Lesedi AnI runtime error', error)
    return NextResponse.json({ error: 'Intelligence runtime failed.' }, { status: 500 })
  }
}

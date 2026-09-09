import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  const task = String(body.task ?? '').trim()
  if (!task) return NextResponse.json({ error: 'Task is required' }, { status: 400 })
  const lower = task.toLowerCase()
  const agent = lower.includes('customer') || lower.includes('support') ? 'Customer Agent' : lower.includes('research') || lower.includes('competitor') ? 'Research Agent' : lower.includes('sales') || lower.includes('lead') ? 'Sales Agent' : lower.includes('growth') ? 'Growth Agent' : 'Marketing Agent'
  return NextResponse.json({ id: crypto.randomUUID(), title: task, agent, status: 'completed', approvalRequired: true, output: `Demo result prepared by ${agent}. Connect an AI provider to generate live production output.` })
}
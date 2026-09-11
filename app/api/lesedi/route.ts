import { NextResponse } from 'next/server'
import { runLesedi } from '@/lib/lesedi/runtime'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const task = typeof body?.task === 'string' ? body.task : ''
    const result = await runLesedi({ task, workspaceId: body?.workspaceId, userId: body?.userId })
    return NextResponse.json({ ok: true, orchestrator: 'Lesedi Chief', ...result })
  } catch (error) {
    console.error('Lesedi runtime error', error)
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : 'Lesedi runtime failed' }, { status: 500 })
  }
}

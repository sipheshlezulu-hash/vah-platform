type Json = Record<string, unknown> | unknown[] | string | number | boolean | null

type RuntimeInput = {
  task: string
  workspaceId?: string
  userId?: string
}

type RuntimeResult = {
  taskId: string | null
  runId: string | null
  approvalId: string | null
  specialist: string
  requiresApproval: boolean
  response: string
  sources: Array<{ id: string; name: string }>
  sandbox: boolean
}

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-5-mini'
const DEFAULT_WORKSPACE_ID = process.env.LESEDI_WORKSPACE_ID

function headers() {
  if (!SUPABASE_SERVICE_ROLE_KEY) throw new Error('SUPABASE_SERVICE_ROLE_KEY is not configured')
  return {
    apikey: SUPABASE_SERVICE_ROLE_KEY,
    Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
    'Content-Type': 'application/json',
  }
}

async function supabase(path: string, init: RequestInit = {}) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) return null
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: { ...headers(), ...(init.headers || {}) },
    cache: 'no-store',
  })
  if (!response.ok) throw new Error(`Supabase request failed: ${response.status}`)
  if (response.status === 204) return null
  return response.json()
}

function specialistFor(task: string) {
  const text = task.toLowerCase()
  if (/sales|pipeline|customer|lead|revenue|sell/.test(text)) return { slug: 'sales', name: 'Sales Intelligence' }
  if (/marketing|brand|campaign|content|social/.test(text)) return { slug: 'marketing', name: 'Brand & Growth' }
  if (/research|market|competitor|opportunity|trend/.test(text)) return { slug: 'research', name: 'Market Intelligence' }
  if (/operation|process|workflow|system|execute/.test(text)) return { slug: 'operations', name: 'Operations' }
  if (/finance|budget|cost|pricing|money/.test(text)) return { slug: 'finance', name: 'Finance Intelligence' }
  return { slug: 'chief', name: 'Lesedi Chief' }
}

function needsApproval(task: string) {
  return /send|publish|post|delete|purchase|pay|transfer|approve|hire|contact|email|launch|execute|change|update customer|sign/.test(task.toLowerCase())
}

async function callOpenAI(task: string, business: Json, knowledge: string) {
  if (!OPENAI_API_KEY) {
    return `Sandbox response: Lesedi understood the request, routed it to the right specialist, and prepared a plan. No external action was taken.`
  }
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      temperature: 0.2,
      messages: [
        { role: 'system', content: 'You are Lesedi AnI, VAH Labs Ancestral Intelligence. Help African creators and businesses move from inspiration to impact. Be practical, culturally aware without stereotyping, concise, and action-oriented. Never claim an external action happened unless a real tool executed it. When approval is required, clearly identify the proposed action and wait for human approval.' },
        { role: 'user', content: `Business context:\n${JSON.stringify(business)}\n\nKnowledge:\n${knowledge || 'No saved knowledge was found.'}\n\nUser request:\n${task}` },
      ],
    }),
  })
  if (!response.ok) throw new Error(`OpenAI request failed: ${response.status}`)
  const data = await response.json()
  return data.choices?.[0]?.message?.content || 'Lesedi completed its reasoning but returned no text.'
}

export async function runLesedi(input: RuntimeInput): Promise<RuntimeResult> {
  const workspaceId = input.workspaceId || DEFAULT_WORKSPACE_ID || null
  const task = input.task.trim()
  if (!task) throw new Error('Task is required')

  const specialist = specialistFor(task)
  const approvalRequired = needsApproval(task)
  let business: Json = {}
  let knowledgeRows: Array<{ id: string; name: string; content: string }> = []
  let taskId: string | null = null
  let runId: string | null = null
  let approvalId: string | null = null

  if (workspaceId && SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
    const businesses = await supabase(`business_profiles?workspace_id=eq.${encodeURIComponent(workspaceId)}&select=id,business_name,description,industry,country,city,goals,brand_voice&limit=1`)
    business = businesses?.[0] || {}
    const sources = await supabase(`knowledge_sources?workspace_id=eq.${encodeURIComponent(workspaceId)}&status=eq.active&select=id,name,content&order=created_at.desc&limit=8`)
    knowledgeRows = sources || []

    const tasks = await supabase('tasks', {
      method: 'POST',
      headers: { Prefer: 'return=representation' },
      body: JSON.stringify({ workspace_id: workspaceId, created_by: input.userId || null, assigned_agent_id: null, title: task.slice(0, 120), description: task, status: 'running', priority: 'normal', input: { source: 'lesedi-ui' } }),
    })
    taskId = tasks?.[0]?.id || null
  }

  const knowledge = knowledgeRows.map((item) => `Source: ${item.name}\n${item.content || ''}`).join('\n\n')
  const response = await callOpenAI(task, business, knowledge)

  if (workspaceId && SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
    const runs = await supabase('agent_runs', {
      method: 'POST',
      headers: { Prefer: 'return=representation' },
      body: JSON.stringify({ workspace_id: workspaceId, task_id: taskId, agent_id: null, provider: OPENAI_API_KEY ? 'openai' : 'sandbox', model: OPENAI_MODEL, status: 'completed', input: { task }, output: { response, specialist }, usage: {}, completed_at: new Date().toISOString() }),
    })
    runId = runs?.[0]?.id || null

    if (approvalRequired) {
      const approvals = await supabase('approvals', {
        method: 'POST',
        headers: { Prefer: 'return=representation' },
        body: JSON.stringify({ workspace_id: workspaceId, task_id: taskId, run_id: runId, requested_by: input.userId || null, action: 'human_approval_required', status: 'pending', proposed_action: { request: task, response }, reviewer_note: null }),
      })
      approvalId = approvals?.[0]?.id || null
    }

    if (taskId) {
      await supabase(`tasks?id=eq.${encodeURIComponent(taskId)}`, { method: 'PATCH', headers: { Prefer: 'return=minimal' }, body: JSON.stringify({ status: approvalRequired ? 'awaiting_approval' : 'completed', output: { response, specialist }, completed_at: new Date().toISOString() }) })
    }

    await supabase('audit_logs', { method: 'POST', headers: { Prefer: 'return=minimal' }, body: JSON.stringify({ workspace_id: workspaceId, actor_id: input.userId || null, actor_type: 'user', action: 'lesedi.run', entity_type: 'task', entity_id: taskId, metadata: { specialist: specialist.slug, approvalRequired } }) })
  }

  return { taskId, runId, approvalId, specialist: specialist.name, requiresApproval: approvalRequired, response, sources: knowledgeRows.map((item) => ({ id: item.id, name: item.name })), sandbox: !OPENAI_API_KEY }
}

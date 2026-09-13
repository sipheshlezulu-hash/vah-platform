// Local demo state management for MVP
// All data persists to localStorage; no backend integration

export type Specialist = {
  id: string
  slug: string
  name: string
  role: string
  initials: string
  status: 'available' | 'busy'
}

export type KnowledgeSource = {
  id: string
  name: string
  category: string
  snippet: string
}

export type Approval = {
  id: string
  taskId: string
  status: 'pending' | 'approved' | 'rejected'
  action: string
  proposed: string
  response: string
  specialist: string
  createdAt: string
  reviewedAt?: string
}

export type TaskRun = {
  id: string
  taskId: string
  status: 'running' | 'completed' | 'awaiting_approval'
  specialist: Specialist
  input: string
  response: string
  sources: KnowledgeSource[]
  approvalId?: string
  requiresApproval: boolean
  createdAt: string
}

export type AuditLog = {
  id: string
  action: string
  entity: string
  timestamp: string
  details: string
}

const STORAGE_KEY = 'vah-demo-state'

const DEFAULT_SPECIALISTS: Specialist[] = [
  { id: '1', slug: 'research', name: 'Market Intelligence', role: 'Research & signals', initials: 'MI', status: 'available' },
  { id: '2', slug: 'growth', name: 'Growth Strategy', role: 'Pipeline & revenue', initials: 'GS', status: 'available' },
  { id: '3', slug: 'operations', name: 'Operations', role: 'Systems & execution', initials: 'OP', status: 'available' },
  { id: '4', slug: 'brand', name: 'Brand & Creative', role: 'Voice & identity', initials: 'BC', status: 'available' },
]

const DEFAULT_KNOWLEDGE: KnowledgeSource[] = [
  { id: 'k1', name: 'Product Roadmap Q4', category: 'strategy', snippet: 'Focus on AI-driven features and automation...' },
  { id: 'k2', name: 'Market Analysis 2026', category: 'research', snippet: 'African tech market growing 35% YoY...' },
  { id: 'k3', name: 'Brand Guidelines', category: 'brand', snippet: 'VAH Labs is ancestral intelligence for impact...' },
  { id: 'k4', name: 'Team Structure', category: 'operations', snippet: 'Chief of Staff oversees all specialist teams...' },
]

function randomId() {
  return Math.random().toString(36).slice(2, 9)
}

function getOrInitState() {
  if (typeof window === 'undefined') {
    return {
      tasks: [] as TaskRun[],
      approvals: [] as Approval[],
      audits: [] as AuditLog[],
    }
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch (e) {
    console.warn('[v0] localStorage unavailable, using memory state')
  }

  return {
    tasks: [] as TaskRun[],
    approvals: [] as Approval[],
    audits: [] as AuditLog[],
  }
}

function saveState(state: any) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (e) {
    console.warn('[v0] Could not persist to localStorage')
  }
}

export function specialistFor(task: string): Specialist {
  const text = task.toLowerCase()
  if (/sales|pipeline|customer|lead|revenue|sell/.test(text)) {
    return DEFAULT_SPECIALISTS.find(s => s.slug === 'growth') || DEFAULT_SPECIALISTS[0]
  }
  if (/marketing|brand|campaign|content|social/.test(text)) {
    return DEFAULT_SPECIALISTS.find(s => s.slug === 'brand') || DEFAULT_SPECIALISTS[0]
  }
  if (/research|market|competitor|opportunity|trend/.test(text)) {
    return DEFAULT_SPECIALISTS.find(s => s.slug === 'research') || DEFAULT_SPECIALISTS[0]
  }
  if (/operation|process|workflow|system|execute/.test(text)) {
    return DEFAULT_SPECIALISTS.find(s => s.slug === 'operations') || DEFAULT_SPECIALISTS[0]
  }
  return DEFAULT_SPECIALISTS[0]
}

export function needsApproval(task: string): boolean {
  return /send|publish|post|delete|purchase|pay|transfer|approve|hire|contact|email|launch|execute|change|update/.test(
    task.toLowerCase()
  )
}

export function generateDemoResponse(task: string, specialist: Specialist, sources: KnowledgeSource[]): string {
  const sourcesCited = sources.slice(0, 2).map(s => s.name).join(', ')

  const responses: { [key: string]: string } = {
    research:
      `I've analyzed the request using our Market Intelligence capabilities. Based on ${sourcesCited}, I recommend: (1) Segment the target audience by growth potential, (2) Review competitive positioning quarterly, (3) Track emerging market signals. These insights are sourced from our saved knowledge base.`,
    growth: `This aligns with our growth strategy. Key actions: (1) Prioritize high-value pipeline opportunities, (2) Align messaging with brand voice, (3) Set quarterly revenue targets. Referenced: ${sourcesCited}.`,
    operations: `Operationally, I suggest: (1) Standardize the workflow, (2) Assign clear ownership, (3) Add checkpoints for review. From ${sourcesCited}, we can define the exact process.`,
    brand: `From a brand perspective: (1) Ensure voice consistency, (2) Maintain visual identity, (3) Document guidelines. Drawing on ${sourcesCited}.`,
  }

  return responses[specialist.slug] || responses.research
}

export class DemoStateManager {
  private state = getOrInitState()

  getSpecialists(): Specialist[] {
    return DEFAULT_SPECIALISTS
  }

  getKnowledge(): KnowledgeSource[] {
    return DEFAULT_KNOWLEDGE
  }

  getTasks(): TaskRun[] {
    return this.state.tasks
  }

  getApprovals(): Approval[] {
    return this.state.approvals
  }

  getAudits(): AuditLog[] {
    return this.state.audits
  }

  async submitTask(input: string): Promise<TaskRun> {
    const specialist = specialistFor(input)
    const requiresApproval = needsApproval(input)
    const sources = DEFAULT_KNOWLEDGE.slice(0, 3)
    const response = generateDemoResponse(input, specialist, sources)

    const taskId = randomId()
    const runId = randomId()

    const task: TaskRun = {
      id: runId,
      taskId,
      status: requiresApproval ? 'awaiting_approval' : 'completed',
      specialist,
      input,
      response,
      sources,
      requiresApproval,
      createdAt: new Date().toISOString(),
    }

    if (requiresApproval) {
      const approvalId = randomId()
      const approval: Approval = {
        id: approvalId,
        taskId,
        status: 'pending',
        action: input,
        proposed: response,
        response: '',
        specialist: specialist.name,
        createdAt: new Date().toISOString(),
      }
      this.state.approvals.push(approval)
      task.approvalId = approvalId
    }

    this.state.tasks.push(task)

    const audit: AuditLog = {
      id: randomId(),
      action: 'lesedi.run',
      entity: 'task',
      timestamp: new Date().toISOString(),
      details: `${specialist.name} processed: ${input.slice(0, 60)}...`,
    }
    this.state.audits.push(audit)

    saveState(this.state)
    return task
  }

  approveAction(approvalId: string): void {
    const approval = this.state.approvals.find(a => a.id === approvalId)
    if (!approval) return

    approval.status = 'approved'
    approval.reviewedAt = new Date().toISOString()

    const task = this.state.tasks.find(t => t.id === approval.taskId)
    if (task) {
      task.status = 'completed'
    }

    const audit: AuditLog = {
      id: randomId(),
      action: 'approval.confirmed',
      entity: 'approval',
      timestamp: new Date().toISOString(),
      details: `Approved: ${approval.action.slice(0, 60)}...`,
    }
    this.state.audits.push(audit)

    saveState(this.state)
  }

  rejectAction(approvalId: string, reason: string): void {
    const approval = this.state.approvals.find(a => a.id === approvalId)
    if (!approval) return

    approval.status = 'rejected'
    approval.reviewedAt = new Date().toISOString()

    const task = this.state.tasks.find(t => t.id === approval.taskId)
    if (task) {
      task.status = 'completed'
    }

    const audit: AuditLog = {
      id: randomId(),
      action: 'approval.rejected',
      entity: 'approval',
      timestamp: new Date().toISOString(),
      details: `Rejected: ${reason}`,
    }
    this.state.audits.push(audit)

    saveState(this.state)
  }

  clearHistory(): void {
    this.state = { tasks: [], approvals: [], audits: [] }
    saveState(this.state)
  }
}

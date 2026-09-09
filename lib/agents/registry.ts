export type AgentDefinition = {
  slug: string
  name: string
  role: string
  description: string
  keywords: string[]
}

export const AGENTS: AgentDefinition[] = [
  { slug: 'chief', name: 'VAH Chief', role: 'Orchestrator', description: 'Understands the request and routes work to the right specialist.', keywords: [] },
  { slug: 'growth', name: 'Growth Agent', role: 'Opportunities & strategy', description: 'Finds growth opportunities and turns them into practical plans.', keywords: ['growth', 'strategy', 'opportunity', 'leads'] },
  { slug: 'marketing', name: 'Marketing Agent', role: 'Campaigns & marketing', description: 'Creates campaigns, positioning, launches and marketing plans.', keywords: ['marketing', 'campaign', 'launch', 'brand', 'social', 'advertising'] },
  { slug: 'content', name: 'Content Agent', role: 'Content production', description: 'Creates content briefs, calendars, copy and creative concepts.', keywords: ['content', 'copy', 'caption', 'blog', 'video'] },
  { slug: 'sales', name: 'Sales Agent', role: 'Sales & outreach', description: 'Helps qualify prospects, write outreach and move opportunities forward.', keywords: ['sales', 'prospect', 'outreach', 'pitch', 'customer'] },
  { slug: 'customer', name: 'Customer Agent', role: 'Support & responses', description: 'Drafts helpful customer-facing responses using approved business knowledge.', keywords: ['support', 'customer', 'refund', 'response', 'faq'] },
  { slug: 'research', name: 'Research Agent', role: 'Research & intelligence', description: 'Structures research and turns findings into decisions.', keywords: ['research', 'competitor', 'market', 'analysis'] },
  { slug: 'operations', name: 'Operations Agent', role: 'Operations & workflows', description: 'Turns recurring work into clear operational workflows.', keywords: ['operations', 'workflow', 'process', 'admin'] },
  { slug: 'finance', name: 'Finance Agent', role: 'Finance & planning', description: 'Assists with budgets, financial summaries and planning.', keywords: ['finance', 'budget', 'invoice', 'cashflow', 'revenue'] },
  { slug: 'creator', name: 'Creator Agent', role: 'Creator economy', description: 'Helps creators package, launch and monetize their work.', keywords: ['creator', 'product', 'course', 'portfolio', 'monetize'] },
]

export function routeTask(task: string): AgentDefinition {
  const text = task.toLowerCase()
  let best = AGENTS.find((a) => a.slug === 'marketing')!
  let score = 0
  for (const agent of AGENTS.filter((a) => a.slug !== 'chief')) {
    const hits = agent.keywords.filter((keyword) => text.includes(keyword)).length
    if (hits > score) { score = hits; best = agent }
  }
  return best
}

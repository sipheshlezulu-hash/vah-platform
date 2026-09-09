# VAH AgentOS

VAH Labs flagship AI workforce platform.

**Build your AI team. Run your business. Grow beyond yourself.**

## MVP status

This repository now contains the initial AgentOS application shell: premium dashboard, AI-team surface, task composer, demo routing API, and the foundations for the agent runtime.

## Product architecture

- **VAH Chief** — orchestration layer
- **Specialist agents** — Growth, Marketing, Content, Sales, Customer, Research, Operations, Finance, Creator
- **Knowledge** — business documents and context
- **Tools** — explicit allowlisted actions
- **Approvals** — human governance before sensitive execution
- **Workflows** — reusable agent processes
- **Analytics** — usage, outcomes and time saved
- **Credits** — usage accounting

## Development principle

The MVP must be honest about sandboxed capabilities. External integrations are only marked connected when credentials and a real adapter exist.

## Next build slices

1. Supabase auth/workspaces/schema/RLS
2. Agent persistence and versioning
3. Real AI provider abstraction
4. Knowledge ingestion/retrieval
5. Approval and audit system
6. Agent builder
7. Workflow runtime
8. Integrations and tool registry
9. Analytics/credits persistence
10. Pilot-ready deployment and QA

## Deployment

The AgentOS Next.js application lives at the repository root. The `store/` directory is a separate storefront application and must not be used as the Vercel Root Directory for AgentOS.

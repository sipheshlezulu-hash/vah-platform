# Lesedi AnI

VAH Labs flagship AI workforce platform.

**Lesedi AnI — Ancestral Intelligence.**

Lesedi AnI is the intelligence layer helping African businesses and creators learn, build, collaborate, execute and grow with AI.

## MVP status

This repository contains the initial Lesedi AnI application shell: premium intelligence dashboard, AI-team surface, task composer, routing runtime, knowledge foundations and human approval principles.

## Product architecture

- **Lesedi Chief** — orchestration and intelligence layer
- **Specialist agents** — Growth, Marketing, Content, Sales, Customer, Research, Operations, Finance, Creator
- **Knowledge** — business documents and context
- **Tools** — explicit allowlisted actions
- **Approvals** — human governance before sensitive execution
- **Workflows** — reusable AI processes
- **Analytics** — usage, outcomes and time saved
- **Credits** — usage accounting

## Philosophy

Ancestral Intelligence means combining modern AI capability with African context, lived knowledge, values and practical business intelligence.

AI should increase human capacity, not erase human agency. Lesedi AnI must be honest about sandboxed capabilities and must never claim an external action was completed unless a real tool executed it.

## Next build slices

1. Supabase auth/workspaces/schema/RLS
2. Agent persistence and versioning
3. Real AI provider abstraction
4. Knowledge ingestion/retrieval
5. Approval and audit system
6. Intelligence/agent builder
7. Workflow runtime
8. Integrations and tool registry
9. Analytics/credits persistence
10. Pilot-ready deployment and QA

## Deployment

The Lesedi AnI Next.js application lives at the repository root. The `store/` directory is a separate storefront application and must not be used as the Vercel Root Directory for Lesedi AnI.

# Lesedi AnI — Product Bible

**VAH Labs**  
**Ancestral Intelligence**  
**Version 1.0**

## 1. Product definition

Lesedi AnI is VAH Labs' intelligence platform for African creators, businesses and communities.

It combines modern AI capability with African context, lived knowledge, values, business context and human agency so people can move from inspiration to impact.

**Core promise:** Build your intelligence team. Run your work. Grow beyond yourself.

Lesedi is not designed to replace people. It is designed to increase human capacity.

## 2. The intelligence model

```text
Knowledge + African context
          ↓
     Lesedi Chief
          ↓
   Understanding
          ↓
      Planning
          ↓
    Specialists
          ↓
 Human approval where needed
          ↓
     Execution
          ↓
       Impact
          ↓
       Learning
```

## 3. Product philosophy

- Technology should empower.
- AI should teach.
- Creators own their work.
- Communities create economies.
- Learning must be practical.
- Build before you pitch.
- Document everything.
- Human beings remain accountable for consequential decisions.
- Lesedi must never claim an external action happened unless a real tool executed it.
- Sandbox capabilities must be clearly identified.

## 4. V1 navigation

- **Home** — daily intelligence briefing and command centre.
- **Chief** — direct interaction with Lesedi Chief.
- **Intelligence Team** — specialist intelligence workers.
- **Knowledge** — the Business Brain: documents, context, decisions and knowledge.
- **Work** — tasks, projects and active work.
- **Approvals** — explicit human authority over sensitive actions.
- **Connections** — integrations and tool permissions.
- **Impact** — outcomes, time saved, completed work and opportunities.
- **Marketplace** — discover and eventually sell intelligence capabilities.
- **Settings** — workspace, identity, permissions and preferences.

## 5. Lesedi Chief

Lesedi Chief is the orchestration layer. It receives a goal, understands context, plans the work, selects specialists and tools, requests approval when required, and coordinates execution.

The Chief should prefer useful action over generic conversation while remaining transparent about uncertainty and capability.

## 6. Specialist intelligence

Initial specialist capabilities:

- Growth Intelligence
- Marketing Intelligence
- Content Intelligence
- Sales Intelligence
- Customer Intelligence
- Research Intelligence
- Operations Intelligence
- Finance Intelligence
- Creator Intelligence

Specialists are workers inside the Lesedi system, not isolated chatbots.

## 7. Business Brain

The Business Brain is the persistent knowledge layer for a workspace. It can contain:

- business profile
- brand voice
- products and services
- goals
- documents
- research
- policies
- customer knowledge
- project context
- previous decisions
- approved workflows

Retrieval should ground intelligence in workspace context before relying on generic knowledge.

## 8. Human approval

Sensitive or consequential actions require explicit approval according to workspace policy.

Approval states:

- requested
- approved
- edited
- rejected
- expired

Every approval and execution should be auditable.

## 9. Architecture

```text
Lesedi Chief
├── Intelligence Router
├── Knowledge Engine
├── Memory
├── Planning Engine
├── Tool System
├── Approval System
├── Execution Runtime
├── Audit System
└── Impact Analytics
```

Current implementation uses a Next.js application with API routes, an AI provider abstraction, specialist registry and a Supabase-ready persistence model. The `/api/agent` route is retained as a compatibility endpoint while the product language is fully Lesedi AnI.

## 10. Success metrics

The product should measure real outcomes rather than vanity metrics:

- tasks completed
- time saved
- approvals completed
- opportunities surfaced
- execution success rate
- repeat usage
- knowledge retrieval quality
- revenue influenced where measurable
- creator/business growth

## 11. First pilot

Ubuntu Threads is the reference demo business: a Johannesburg fashion brand selling T-shirts, hoodies, caps and jackets.

The first end-to-end pilot journey is:

1. Define business context.
2. Ask Lesedi Chief for a launch campaign.
3. Chief plans the task.
4. Marketing Intelligence produces the campaign.
5. Knowledge grounds the output in the brand context.
6. Human reviews and approves.
7. Approved work becomes an auditable task result.
8. Impact is measured.

## 12. Definition of done for V1

V1 is ready for controlled pilots when users can authenticate, establish a workspace, define business context, interact with Lesedi Chief, use specialist intelligence, retrieve workspace knowledge, create tasks, review approvals, inspect audit history and see meaningful impact metrics.

The system must be honest about what is simulated, what is AI-generated, and what is actually executed through integrations.

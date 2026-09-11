# Lesedi AnI runtime setup

The dashboard now calls `POST /api/lesedi` and the server runtime orchestrates Lesedi Chief, specialist routing, OpenAI, Supabase persistence, knowledge context, approvals, and audit logging.

## Vercel environment variables

Add these as **server-only** variables in the `lesedi` Vercel project for Production and Preview as appropriate:

- `OPENAI_API_KEY` — the dedicated VAH OpenAI key.
- `OPENAI_MODEL` — `gpt-5-mini` unless intentionally changed.
- `SUPABASE_URL` — `https://oducqjadenedbdohekvn.supabase.co`.
- `SUPABASE_SERVICE_ROLE_KEY` — Supabase service-role secret. Never use `NEXT_PUBLIC_` for this value.
- `LESEDI_WORKSPACE_ID` — the UUID of the VAH workspace that owns the business profile and knowledge.

## Runtime behavior

1. The UI sends a task to `/api/lesedi`.
2. Lesedi routes the task to a specialist.
3. The server loads workspace business context and active knowledge sources.
4. OpenAI generates a grounded plan/response when the API key is configured.
5. The task and agent run are persisted to Supabase.
6. Requests that imply external or sensitive action create a pending approval.
7. The task is never represented as externally executed without a real tool integration.
8. An audit record is written for the run.

## Security

The service-role key and OpenAI key must remain server-side. Before production launch, add authenticated user/workspace resolution and tighten the Supabase security-definer function policies flagged by the security advisor.

"use client"

import { useState } from "react"
import { Bot, CheckCircle2, CircleDot, FileText, LayoutDashboard, MessageSquare, Plus, Search, Settings, Sparkles, Target, Users, Zap } from "lucide-react"

const agents = [
  ["VAH Chief", "Orchestrator"], ["Growth Agent", "Opportunities & strategy"], ["Marketing Agent", "Campaigns & marketing"],
  ["Customer Agent", "Support & responses"], ["Research Agent", "Research & intelligence"],
]

export default function Home() {
  const [prompt, setPrompt] = useState("")
  const [notice, setNotice] = useState("")
  const [result, setResult] = useState("")
  const [running, setRunning] = useState(false)

  async function run() {
    if (!prompt.trim() || running) return
    setRunning(true); setNotice("VAH Chief is routing your task…"); setResult("")
    try {
      const response = await fetch("/api/agent", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ task: prompt, businessContext: "Ubuntu Threads — Johannesburg fashion brand selling T-shirts, hoodies, caps and jackets." }) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || "Runtime failed")
      setNotice(`${data.agent.name} received the task · ${data.mode === "live" ? "Live AI" : "Sandbox mode"} · Approval required`)
      setResult(data.content)
      setPrompt("")
    } catch (error) { setNotice(error instanceof Error ? error.message : "Something went wrong.") }
    finally { setRunning(false) }
  }

  return <main className="flex min-h-screen">
    <aside className="hidden w-64 shrink-0 border-r border-[#20242b] bg-[#0b0c0f] p-4 md:block">
      <div className="mb-8 flex items-center gap-3 px-2"><div className="grid h-9 w-9 place-items-center rounded-xl bg-white font-black text-black">V</div><div><div className="font-semibold">VAH</div><div className="text-xs text-zinc-500">Labs · AgentOS</div></div></div>
      <nav className="space-y-1 text-sm">{[[LayoutDashboard,"Overview"],[Bot,"AgentOS"],[Users,"My Agents"],[CircleDot,"Tasks"],[CheckCircle2,"Approvals"],[FileText,"Knowledge"],[Zap,"Workflows"],[Target,"Integrations"],[Sparkles,"Analytics"]].map(([I,label])=><div key={label} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 ${label === "AgentOS" ? "bg-white/10 text-white" : "text-zinc-400 hover:bg-white/5 hover:text-white"}`}><I size={17}/>{label}</div>)}</nav>
      <div className="mt-8 border-t border-[#20242b] pt-4 text-sm text-zinc-400"><div className="px-3 py-2">Agent Marketplace</div><div className="px-3 py-2">Academy</div></div><div className="absolute bottom-4 flex items-center gap-3 px-2 text-sm text-zinc-500"><Settings size={16}/> Settings</div>
    </aside>
    <section className="min-w-0 flex-1"><header className="flex items-center justify-between border-b border-[#20242b] px-5 py-4 md:px-8"><div className="font-bold md:hidden">VAH AgentOS</div><div className="hidden text-sm text-zinc-500 md:block">Wednesday, September 9 · Johannesburg</div><div className="flex items-center gap-3"><div className="hidden rounded-lg border border-[#20242b] px-3 py-2 text-xs text-zinc-500 sm:flex sm:items-center sm:gap-2"><Search size={14}/> Search</div><div className="h-8 w-8 rounded-full bg-zinc-700"/></div></header>
      <div className="mx-auto max-w-7xl p-5 md:p-8"><div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end"><div><div className="mb-2 flex items-center gap-2 text-sm text-zinc-500"><Sparkles size={15}/> VAH Labs</div><h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Your AI team is working.</h1><p className="mt-2 max-w-2xl text-zinc-400">Build your AI team. Run your business. Grow beyond yourself.</p></div><button className="flex w-fit items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black"><Plus size={17}/> Create agent</button></div>
        <div className="mb-8 rounded-2xl border border-[#20242b] bg-[#101216] p-4 md:p-5"><div className="mb-3 flex items-center gap-2 text-sm font-medium"><MessageSquare size={16}/> Give VAH a task</div><div className="flex flex-col gap-3 sm:flex-row"><input value={prompt} onChange={e=>setPrompt(e.target.value)} onKeyDown={e=>e.key === "Enter" && run()} placeholder="e.g. Create a launch campaign for our new collection" className="min-w-0 flex-1 rounded-xl border border-[#292e37] bg-[#090a0d] px-4 py-3 text-sm outline-none placeholder:text-zinc-600 focus:border-zinc-500"/><button onClick={run} disabled={running} className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black disabled:opacity-50">{running ? "Working…" : "Run task"}</button></div>{notice && <div className="mt-3 text-xs text-zinc-400">{notice}</div>}{result && <div className="mt-4 whitespace-pre-wrap rounded-xl border border-[#292e37] bg-[#090a0d] p-4 text-sm leading-6 text-zinc-200">{result}</div>}</div>
        <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{[["Revenue","R42,850","+18%"],["Leads","126","+24%"],["Tasks automated","78%","+11%"],["Time saved","21.4 hrs","this week"]].map(([a,b,c])=><div key={a} className="rounded-2xl border border-[#20242b] bg-[#101216] p-5"><div className="text-sm text-zinc-500">{a}</div><div className="mt-2 text-2xl font-semibold">{b}</div><div className="mt-2 text-xs text-zinc-500">{c}</div></div>)}</div>
        <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]"><div className="rounded-2xl border border-[#20242b] bg-[#101216]"><div className="border-b border-[#20242b] p-5"><h2 className="font-semibold">Your AI team</h2><p className="mt-1 text-xs text-zinc-500">Specialists working toward your goals</p></div><div className="divide-y divide-[#20242b]">{agents.map(([name,role])=><div key={name} className="flex items-center gap-4 p-4"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/5"><Bot size={18}/></div><div className="min-w-0 flex-1"><div className="text-sm font-medium">{name}</div><div className="text-xs text-zinc-500">{role}</div></div><div className="flex items-center gap-1.5 text-xs text-zinc-400"><span className="h-2 w-2 rounded-full bg-emerald-400"/>Ready</div></div>)}</div></div>
          <div className="space-y-6"><div className="rounded-2xl border border-[#20242b] bg-[#101216] p-5"><h2 className="mb-5 font-semibold">Today's briefing</h2><div className="space-y-4 text-sm"><div>🟡 2 approvals waiting</div><div>🔵 1 growth opportunity</div><div>🟢 5 tasks completed</div></div></div><div className="rounded-2xl border border-[#20242b] bg-[#101216] p-5"><h2 className="mb-4 font-semibold">Runtime status</h2><div className="text-sm text-zinc-400">VAH Chief → Router → Specialist → Policy → Approval</div><div className="mt-3 text-xs text-emerald-400">● Runtime online</div></div></div></div>
      </div></section>
  </main>
}
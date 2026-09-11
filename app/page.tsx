"use client"

import { useState } from "react"
import { Activity, ArrowRight, Bot, CheckCircle2, CircleDot, FileText, LayoutDashboard, MessageSquare, Search, Settings, Sparkles, Target, Users, Zap } from "lucide-react"

const team = [
  ["Lesedi Chief", "Orchestration & decisions"],
  ["Growth Intelligence", "Opportunities & strategy"],
  ["Marketing Intelligence", "Campaigns & content"],
  ["Customer Intelligence", "Support & relationships"],
  ["Research Intelligence", "Research & market signals"],
]

const navigation = [
  [LayoutDashboard, "Home"], [Bot, "Chief"], [Users, "Intelligence Team"], [CircleDot, "Work"],
  [CheckCircle2, "Approvals"], [FileText, "Knowledge"], [Zap, "Workflows"], [Target, "Connections"], [Activity, "Impact"],
]

export default function Home() {
  const [prompt, setPrompt] = useState("")
  const [notice, setNotice] = useState("")
  const [result, setResult] = useState("")
  const [running, setRunning] = useState(false)

  async function run() {
    if (!prompt.trim() || running) return
    setRunning(true); setNotice("Lesedi Chief is understanding your request…"); setResult("")
    try {
      const response = await fetch("/api/agent", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ task: prompt, businessContext: "Ubuntu Threads — Johannesburg fashion brand selling T-shirts, hoodies, caps and jackets." }) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || "Lesedi runtime failed")
      setNotice(`${data.agent.name} · ${data.mode === "live" ? "Live AI" : "Sandbox mode"} · Human approval remains required before sensitive execution.`)
      setResult(data.content); setPrompt("")
    } catch (error) { setNotice(error instanceof Error ? error.message : "Something went wrong.") }
    finally { setRunning(false) }
  }

  return <main className="flex min-h-screen bg-[#090a0d] text-zinc-100">
    <aside className="hidden w-64 shrink-0 border-r border-[#20242b] bg-[#0b0c0f] p-4 md:block">
      <div className="mb-8 flex items-center gap-3 px-2"><div className="grid h-9 w-9 place-items-center rounded-xl bg-white font-black text-black">L</div><div><div className="font-semibold">Lesedi AnI</div><div className="text-xs text-zinc-500">VAH Labs · Ancestral Intelligence</div></div></div>
      <nav className="space-y-1 text-sm">{navigation.map(([I,label], index)=><div key={label as string} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 ${index === 0 ? "bg-white/10 text-white" : "text-zinc-400 hover:bg-white/5 hover:text-white"}`}><I size={17}/>{label}</div>)}</nav>
      <div className="mt-8 border-t border-[#20242b] pt-4 text-sm text-zinc-400"><div className="px-3 py-2">Marketplace</div><div className="px-3 py-2">VAH Academy</div></div>
      <div className="absolute bottom-4 flex items-center gap-3 px-2 text-sm text-zinc-500"><Settings size={16}/> Settings</div>
    </aside>

    <section className="min-w-0 flex-1">
      <header className="flex items-center justify-between border-b border-[#20242b] px-5 py-4 md:px-8"><div className="font-bold md:hidden">Lesedi AnI</div><div className="hidden text-sm text-zinc-500 md:block">Ancestral Intelligence · VAH Labs</div><div className="flex items-center gap-3"><div className="hidden rounded-lg border border-[#20242b] px-3 py-2 text-xs text-zinc-500 sm:flex sm:items-center sm:gap-2"><Search size={14}/> Search</div><div className="h-8 w-8 rounded-full bg-zinc-700"/></div></header>

      <div className="mx-auto max-w-7xl p-5 md:p-8">
        <div className="mb-8"><div className="mb-3 flex items-center gap-2 text-sm text-zinc-500"><Sparkles size={15}/> VAH Labs · Lesedi AnI</div><h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Good morning. Lesedi is ready.</h1><p className="mt-2 max-w-2xl text-zinc-400">Your ancestral intelligence layer for turning ideas into decisions, work and measurable impact.</p></div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{[["Opportunities found","3","today"],["Tasks completed","5","today"],["Decisions for you","2","need approval"],["Time saved","4.8 hrs","this week"]].map(([a,b,c])=><div key={a} className="rounded-2xl border border-[#20242b] bg-[#101216] p-5"><div className="text-sm text-zinc-500">{a}</div><div className="mt-2 text-2xl font-semibold">{b}</div><div className="mt-2 text-xs text-zinc-500">{c}</div></div>)}</div>

        <div className="mb-8 rounded-2xl border border-[#292e37] bg-[#101216] p-4 md:p-5"><div className="mb-3 flex items-center gap-2 text-sm font-medium"><MessageSquare size={16}/> What would you like Lesedi to handle?</div><div className="flex flex-col gap-3 sm:flex-row"><input value={prompt} onChange={e=>setPrompt(e.target.value)} onKeyDown={e=>e.key === "Enter" && run()} placeholder="Launch my new collection, find customers, analyse my business…" className="min-w-0 flex-1 rounded-xl border border-[#292e37] bg-[#090a0d] px-4 py-3 text-sm outline-none placeholder:text-zinc-600 focus:border-zinc-500"/><button onClick={run} disabled={running} className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black disabled:opacity-50">{running ? "Thinking…" : "Ask Lesedi"}</button></div>{notice && <div className="mt-3 text-xs leading-5 text-zinc-400">{notice}</div>}{result && <div className="mt-4 whitespace-pre-wrap rounded-xl border border-[#292e37] bg-[#090a0d] p-4 text-sm leading-6 text-zinc-200">{result}</div>}<div className="mt-4 flex flex-wrap gap-2">{["Launch my new collection","Find 20 potential customers","Analyse this month’s business","Create my social content"].map(item=><button key={item} onClick={()=>setPrompt(item)} className="rounded-full border border-[#292e37] px-3 py-1.5 text-xs text-zinc-400 hover:text-white">{item}</button>)}</div></div>

        <div className="mb-8 rounded-2xl border border-[#20242b] bg-[#101216] p-5"><div className="mb-5 flex items-center justify-between"><div><h2 className="font-semibold">How Lesedi works</h2><p className="mt-1 text-xs text-zinc-500">Human authority stays in the loop.</p></div><div className="text-xs text-emerald-400">Runtime online</div></div><div className="grid gap-3 md:grid-cols-6">{["Your request","Lesedi Chief","Plan","Specialists","Approval","Impact"].map((step,i)=><div key={step} className="flex items-center gap-2"><div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/5 text-xs font-semibold">{i+1}</div><div className="text-xs text-zinc-400">{step}</div>{i < 5 && <ArrowRight size={14} className="ml-auto hidden text-zinc-700 md:block"/>}</div>)}</div></div>

        <div className="grid gap-6 xl:grid-cols-[1.45fr_1fr]">
          <div className="rounded-2xl border border-[#20242b] bg-[#101216]"><div className="border-b border-[#20242b] p-5"><h2 className="font-semibold">Your intelligence team</h2><p className="mt-1 text-xs text-zinc-500">Specialists working toward your goals</p></div><div className="divide-y divide-[#20242b]">{team.map(([name,role])=><div key={name as string} className="flex items-center gap-4 p-4"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/5"><Bot size={18}/></div><div className="min-w-0 flex-1"><div className="text-sm font-medium">{name}</div><div className="text-xs text-zinc-500">{role}</div></div><div className="flex items-center gap-1.5 text-xs text-zinc-400"><span className="h-2 w-2 rounded-full bg-emerald-400"/>Ready</div></div>)}</div></div>
          <div className="space-y-6"><div className="rounded-2xl border border-[#20242b] bg-[#101216] p-5"><h2 className="mb-5 font-semibold">Today’s intelligence</h2><div className="space-y-4 text-sm"><div className="flex gap-3"><span>🟡</span><span><b>2 approvals</b><br/><span className="text-xs text-zinc-500">Human decisions waiting</span></span></div><div className="flex gap-3"><span>🔵</span><span><b>1 growth opportunity</b><br/><span className="text-xs text-zinc-500">Lesedi found a possible next move</span></span></div><div className="flex gap-3"><span>🟢</span><span><b>5 tasks completed</b><br/><span className="text-xs text-zinc-500">Work finished today</span></span></div></div></div><div className="rounded-2xl border border-[#20242b] bg-[#101216] p-5"><h2 className="mb-2 font-semibold">Business Brain</h2><p className="text-sm text-zinc-400">Your documents, context, decisions and knowledge become the foundation Lesedi reasons from.</p><button className="mt-4 text-xs font-medium text-white">Open Knowledge <ArrowRight size={13} className="ml-1 inline"/></button></div></div>
        </div>
      </div>
    </section>
  </main>
}

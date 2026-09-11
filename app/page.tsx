'use client'

import { useState } from 'react'
import {
  Activity,
  ArrowUpRight,
  Bell,
  Bot,
  BrainCircuit,
  Check,
  ChevronDown,
  CircleHelp,
  Command,
  FileText,
  Gauge,
  LayoutDashboard,
  Menu,
  MessageSquareText,
  MoreHorizontal,
  PanelLeft,
  Plus,
  Search,
  Send,
  Settings2,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  X,
  Zap,
} from 'lucide-react'

const navItems = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Lesedi', icon: Bot, active: true },
  { label: 'Workflows', icon: Zap },
  { label: 'Approvals', icon: ShieldCheck, count: '3' },
  { label: 'Opportunities', icon: Target },
]

const specialists = [
  { name: 'Market Intelligence', role: 'Research & signals', initials: 'MI', color: 'from-emerald-400 to-teal-600' },
  { name: 'Growth Strategy', role: 'Pipeline & revenue', initials: 'GS', color: 'from-blue-400 to-indigo-600' },
  { name: 'Operations', role: 'Systems & execution', initials: 'OP', color: 'from-amber-300 to-orange-600' },
  { name: 'Brand & Creative', role: 'Voice & identity', initials: 'BC', color: 'from-fuchsia-400 to-purple-600' },
]

export default function Page() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState<string | null>(null)
  const [isThinking, setIsThinking] = useState(false)
  const [activeNav, setActiveNav] = useState('Lesedi')

  function submitTask() {
    if (!prompt.trim() || isThinking) return
    setIsThinking(true)
    setResult(null)
    window.setTimeout(() => {
      setIsThinking(false)
      setResult(`Lesedi routed this to the right specialist and prepared a sandbox plan for “${prompt.trim()}”. No external actions were taken.`)
      setPrompt('')
    }, 700)
  }

  return (
    <div className="min-h-screen bg-[#080b10] text-white">
      <div className="flex min-h-screen">
        <aside className={`fixed inset-y-0 left-0 z-30 flex w-[248px] flex-col border-r border-white/[0.07] bg-[#0b0f15] px-4 py-5 transition-transform duration-200 lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="mb-8 flex items-center justify-between px-2">
            <div className="flex items-center gap-2.5">
              <div className="grid size-8 place-items-center rounded-[10px] bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-indigo-900/30"><Sparkles className="size-4 text-white" /></div>
              <div><div className="text-[15px] font-semibold tracking-tight">VAH Labs</div><div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Intelligence OS</div></div>
            </div>
            <button className="rounded-lg p-1.5 text-slate-500 hover:bg-white/5 hover:text-white lg:hidden" onClick={() => setSidebarOpen(false)} aria-label="Close menu"><X className="size-4" /></button>
          </div>

          <div className="mb-6 rounded-xl border border-white/[0.07] bg-white/[0.025] p-3">
            <div className="mb-2 flex items-center justify-between text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500"><span>Workspace</span><ChevronDown className="size-3" /></div>
            <div className="flex items-center gap-2.5"><div className="grid size-7 place-items-center rounded-lg bg-emerald-500/15 text-[11px] font-bold text-emerald-300">U</div><div className="text-sm font-medium">Ubuntu Threads</div></div>
          </div>

          <nav className="flex flex-col gap-1">
            <div className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-600">Command center</div>
            {navItems.map((item) => { const Icon = item.icon; return <button key={item.label} onClick={() => { setActiveNav(item.label); setSidebarOpen(false) }} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] transition-colors ${activeNav === item.label ? 'bg-indigo-500/12 text-indigo-200' : 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-200'}`}><Icon className={`size-4 ${activeNav === item.label ? 'text-indigo-300' : 'text-slate-500'}`} /><span className="flex-1">{item.label}</span>{item.count && <span className="rounded-full bg-amber-400/15 px-1.5 py-0.5 text-[10px] font-semibold text-amber-300">{item.count}</span>}</button> })}
          </nav>

          <div className="mt-auto flex flex-col gap-1 border-t border-white/[0.07] pt-4"><button className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] text-slate-400 hover:bg-white/[0.04] hover:text-white"><Settings2 className="size-4 text-slate-500" />Settings</button><button className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] text-slate-400 hover:bg-white/[0.04] hover:text-white"><CircleHelp className="size-4 text-slate-500" />Help center</button><div className="mt-3 flex items-center gap-2.5 rounded-xl bg-white/[0.03] p-2.5"><div className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 text-xs font-semibold">SL</div><div className="min-w-0 flex-1"><div className="truncate text-xs font-medium">Siphese L.</div><div className="truncate text-[10px] text-slate-500">Owner</div></div><MoreHorizontal className="size-4 text-slate-600" /></div></div>
        </aside>

        {sidebarOpen && <button className="fixed inset-0 z-20 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} aria-label="Close navigation" />}

        <main className="min-w-0 flex-1">
          <header className="flex h-[68px] items-center justify-between border-b border-white/[0.07] px-5 sm:px-8"><div className="flex items-center gap-3"><button onClick={() => setSidebarOpen(true)} className="rounded-lg p-2 text-slate-400 hover:bg-white/5 lg:hidden" aria-label="Open menu"><Menu className="size-5" /></button><div className="hidden items-center gap-2 text-sm text-slate-500 sm:flex"><PanelLeft className="size-4" />Workspace <span className="text-slate-700">/</span> <span className="text-slate-300">Lesedi</span></div></div><div className="flex items-center gap-3"><button className="hidden items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.025] px-3 py-2 text-xs text-slate-400 hover:text-white sm:flex"><Search className="size-3.5" />Search <kbd className="ml-5 rounded border border-white/10 px-1.5 py-0.5 text-[10px] text-slate-600">⌘ K</kbd></button><button className="relative rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white" aria-label="Notifications"><Bell className="size-4" /><span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-indigo-400" /></button><div className="hidden h-5 w-px bg-white/10 sm:block" /><div className="hidden items-center gap-2 text-xs text-slate-400 sm:flex"><span className="size-1.5 rounded-full bg-emerald-400" />Sandbox mode</div></div></header>

          <div className="mx-auto max-w-[1240px] px-5 py-8 sm:px-8 lg:px-10">
            <section className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><div className="mb-2 flex items-center gap-2 text-xs font-medium text-indigo-300"><span className="size-1.5 rounded-full bg-indigo-400" />TUESDAY, SEPTEMBER 12, 2026</div><h1 className="text-3xl font-semibold tracking-[-0.035em] text-white sm:text-[34px]">Good morning, Siphese.</h1><p className="mt-2 text-sm text-slate-400">Your intelligence team is ready to move the business forward.</p></div><button className="flex w-fit items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-xs font-medium text-slate-300 hover:bg-white/[0.07]"><Activity className="size-3.5 text-emerald-400" />View activity <ArrowUpRight className="size-3.5" /></button></section>

            <section className="mb-7 grid grid-cols-2 gap-3 lg:grid-cols-4"><Kpi icon={Gauge} label="Active workflows" value="12" change="+3 this week" tone="indigo" /><Kpi icon={ShieldCheck} label="Awaiting approval" value="03" change="Needs your review" tone="amber" /><Kpi icon={Target} label="Open opportunities" value="24" change="R 1.2m potential" tone="emerald" /><Kpi icon={MessageSquareText} label="Team insights" value="86" change="+14 unread" tone="violet" /></section>

            <section className="mb-7 overflow-hidden rounded-2xl border border-indigo-400/20 bg-gradient-to-br from-[#15152d] via-[#101421] to-[#0d111a] shadow-2xl shadow-indigo-950/10"><div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:p-10"><div className="flex flex-col justify-center"><div className="mb-4 flex items-center gap-2 text-xs font-medium text-indigo-300"><div className="grid size-6 place-items-center rounded-md bg-indigo-500/20"><BrainCircuit className="size-3.5" /></div>LESEDI · CHIEF OF STAFF</div><h2 className="max-w-xl text-2xl font-semibold leading-tight tracking-[-0.03em] text-white sm:text-3xl">Turn your next idea into your next advantage.</h2><p className="mt-3 max-w-lg text-sm leading-6 text-slate-400">Ask Lesedi to research, plan, or execute across your business. Your specialist team works in concert, with you always in control.</p><div className="mt-6 flex flex-wrap gap-2"><PromptChip text="Find new opportunities" onClick={() => setPrompt('Find new opportunities for Ubuntu Threads')} /><PromptChip text="Review my pipeline" onClick={() => setPrompt('Review my current sales pipeline')} /><PromptChip text="Plan my week" onClick={() => setPrompt('Help me plan my week')} /></div></div><div className="relative"><div className="absolute -inset-4 rounded-full bg-indigo-500/10 blur-3xl" /><div className="relative rounded-2xl border border-white/10 bg-[#0a0e17]/85 p-4 shadow-xl"><div className="mb-3 flex items-center justify-between"><div className="flex items-center gap-2 text-xs font-medium text-slate-300"><div className="grid size-6 place-items-center rounded-lg bg-indigo-500/20"><Bot className="size-3.5 text-indigo-300" /></div>Ask Lesedi</div><span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-1 text-[10px] text-emerald-300">Sandbox</span></div><textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing && e.keyCode !== 229) { e.preventDefault(); submitTask() } }} placeholder="What would you like to move forward?" className="min-h-[100px] w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.025] p-3 text-sm leading-6 text-slate-200 outline-none placeholder:text-slate-600 focus:border-indigo-400/50" /><div className="mt-3 flex items-center justify-between"><span className="flex items-center gap-1.5 text-[10px] text-slate-600"><Command className="size-3" />Enter to send</span><button onClick={submitTask} disabled={!prompt.trim() || isThinking} className="flex items-center gap-2 rounded-lg bg-indigo-500 px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-40">{isThinking ? 'Thinking...' : 'Send to Lesedi'}<Send className="size-3.5" /></button></div>{result && <div className="mt-3 flex gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.06] p-3 text-xs leading-5 text-emerald-200"><Check className="mt-0.5 size-3.5 shrink-0" />{result}</div>}</div></div></div></section>

            <div className="mb-7 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]"><section className="rounded-2xl border border-white/[0.08] bg-[#0d121a] p-5 sm:p-6"><SectionHeader title="Your intelligence team" action="Manage team" /><div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">{specialists.map((specialist) => <div key={specialist.name} className="group rounded-xl border border-white/[0.07] bg-white/[0.02] p-3 transition-colors hover:border-white/15"><div className={`mb-3 grid size-9 place-items-center rounded-xl bg-gradient-to-br ${specialist.color} text-[10px] font-bold text-white`}>{specialist.initials}</div><div className="text-xs font-medium text-slate-200">{specialist.name}</div><div className="mt-1 text-[10px] text-slate-500">{specialist.role}</div><div className="mt-3 flex items-center gap-1.5 text-[10px] text-emerald-400"><span className="size-1.5 rounded-full bg-emerald-400" />Online</div></div>)}</div></section><section className="rounded-2xl border border-white/[0.08] bg-[#0d121a] p-5 sm:p-6"><SectionHeader title="Business brain" action="Open brain" /><div className="mt-5 flex items-start gap-4"><div className="grid size-11 shrink-0 place-items-center rounded-xl bg-violet-500/15 text-violet-300"><BrainCircuit className="size-5" /></div><div><div className="text-sm font-medium text-slate-200">Ubuntu Threads context</div><p className="mt-1 text-xs leading-5 text-slate-500">Lesedi knows your business, your goals, and the decisions that matter.</p></div></div><div className="mt-5 grid grid-cols-3 gap-2 border-t border-white/[0.07] pt-4 text-center"><Stat value="148" label="Facts" /><Stat value="32" label="Decisions" /><Stat value="09" label="Sources" /></div></section></div>

            <section className="grid gap-5 lg:grid-cols-3"><SummaryCard icon={ShieldCheck} title="Needs your approval" badge="3 pending" items={['Approve Q4 campaign budget', 'Review partner proposal', 'Confirm outreach sequence']} tone="amber" /><SummaryCard icon={Target} title="Latest opportunities" badge="4 new" items={['Enterprise expansion · R 240k', 'Retail partnership · R 180k', 'Referral from Cape Town']} tone="emerald" /><SummaryCard icon={FileText} title="Recent activity" badge="View all" items={['Lesedi prepared a market brief', 'Growth team updated pipeline', 'New signal from competitor']} tone="indigo" /></section>

            <footer className="mt-10 flex flex-col justify-between gap-3 border-t border-white/[0.07] pt-5 text-[10px] text-slate-600 sm:flex-row"><span>VAH Labs · Intelligence for builders</span><span className="flex items-center gap-1.5"><ShieldCheck className="size-3" />Human approval required before live actions</span></footer>
          </div>
        </main>
      </div>
    </div>
  )
}

function Kpi({ icon: Icon, label, value, change, tone }: { icon: typeof Gauge; label: string; value: string; change: string; tone: string }) { return <div className="rounded-xl border border-white/[0.08] bg-[#0d121a] p-4"><div className="mb-4 flex items-center justify-between"><Icon className={`size-4 ${tone === 'amber' ? 'text-amber-300' : tone === 'emerald' ? 'text-emerald-300' : tone === 'violet' ? 'text-violet-300' : 'text-indigo-300'}`} /><span className="text-[10px] text-slate-600">30d</span></div><div className="text-2xl font-semibold tracking-tight text-white">{value}</div><div className="mt-1 text-xs text-slate-500">{label}</div><div className={`mt-3 text-[10px] ${tone === 'amber' ? 'text-amber-300' : 'text-emerald-400'}`}>{change}</div></div> }
function PromptChip({ text, onClick }: { text: string; onClick: () => void }) { return <button onClick={onClick} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] text-slate-300 transition-colors hover:border-indigo-400/40 hover:bg-indigo-400/10 hover:text-indigo-200">{text}</button> }
function SectionHeader({ title, action }: { title: string; action: string }) { return <div className="flex items-center justify-between"><h3 className="text-sm font-medium text-slate-200">{title}</h3><button className="text-[11px] text-indigo-300 hover:text-indigo-200">{action} <ArrowUpRight className="ml-1 inline size-3" /></button></div> }
function Stat({ value, label }: { value: string; label: string }) { return <div><div className="text-sm font-semibold text-slate-200">{value}</div><div className="mt-1 text-[10px] text-slate-600">{label}</div></div> }
function SummaryCard({ icon: Icon, title, badge, items, tone }: { icon: typeof ShieldCheck; title: string; badge: string; items: string[]; tone: string }) { const color = tone === 'amber' ? 'text-amber-300 bg-amber-400/10' : tone === 'emerald' ? 'text-emerald-300 bg-emerald-400/10' : 'text-indigo-300 bg-indigo-400/10'; return <section className="rounded-2xl border border-white/[0.08] bg-[#0d121a] p-5"><div className="flex items-center gap-3"><div className={`grid size-8 place-items-center rounded-lg ${color}`}><Icon className="size-4" /></div><div className="flex-1 text-sm font-medium text-slate-200">{title}</div><span className="text-[10px] text-slate-500">{badge}</span></div><div className="mt-4 flex flex-col gap-2.5">{items.map((item, index) => <button key={item} className="flex items-center gap-2 rounded-lg border border-transparent px-2 py-1.5 text-left text-xs text-slate-400 hover:border-white/[0.07] hover:bg-white/[0.025] hover:text-slate-200"><span className={`grid size-4 shrink-0 place-items-center rounded-full text-[9px] ${index === 0 ? color : 'bg-white/[0.05] text-slate-600'}`}>{index === 0 ? <Plus className="size-2.5" /> : index + 1}</span><span className="truncate">{item}</span><ArrowUpRight className="ml-auto size-3 shrink-0 text-slate-700" /></button>)}</div></section> }

import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Inbox, 
  CheckSquare, 
  Gauge, 
  CalendarDays, 
  BarChart3, 
  Users, 
  Cake, 
  Target, 
  BookOpen, 
  ClipboardCheck, 
  ArrowRight, 
  Check, 
  Play, 
  Plus, 
  Sparkles, 
  PhoneCall, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  Activity,
  Bot,
  ScrollText,
  Globe,
  RefreshCw,
  Radio
} from 'lucide-react';
import { AgentItem, KBCollection, RoutePath } from '../../types';

interface HomeOverviewTabProps {
  agents: AgentItem[];
  collections: KBCollection[];
  onNavigate: (route: RoutePath) => void;
  onSelectAgentDetails: (agent: AgentItem) => void;
  onOpenVoiceCall: () => void;
  onOpenCreateAgent: () => void;
  onDeleteAgent?: (agentId: string) => void;
}

export const HomeOverviewTab: React.FC<HomeOverviewTabProps> = ({
  agents,
  collections,
  onNavigate,
  onSelectAgentDetails,
  onOpenVoiceCall,
  onOpenCreateAgent,
}) => {
  // Live ticking clock for Workday status widget
  const [timeStr, setTimeStr] = useState<string>('09:42:18');
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toTimeString().split(' ')[0]);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Interactive task completion state
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({
    'task-1': false,
    'task-2': false,
    'task-3': true,
  });

  const toggleTask = (id: string) => {
    setCompletedTasks(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Agent review queue state
  const [approvalsList, setApprovalsList] = useState([
    {
      id: 'app-1',
      title: 'Voice gateway SLA alert',
      requester: 'Salma Voice Agent',
      desc: 'Elevated timeout rate on GCC SIP trunk · Auto-escalated',
      time: '3 hours waiting',
      needsAttention: true,
    },
    {
      id: 'app-2',
      title: 'Arabic knowledge source update',
      requester: 'Tariq Support Agent',
      desc: '48 new Najdi terms detected · High confidence',
      time: '1 hour waiting',
      needsAttention: false,
    },
    {
      id: 'app-3',
      title: 'DataBot connection review',
      requester: 'Databot Core',
      desc: 'Read-only replica connection grant requested',
      time: '4 hours waiting',
      needsAttention: false,
    },
  ]);

  const [approvedIds, setApprovedIds] = useState<string[]>([]);

  // State for new analytics, api pinging, and log filtering
  const [analyticsTimeframe, setAnalyticsTimeframe] = useState<'24H' | '7D' | '30D'>('7D');
  const [isPinging, setIsPinging] = useState<boolean>(false);
  const [pingSuccess, setPingSuccess] = useState<boolean>(false);
  const [homeLogFilter, setHomeLogFilter] = useState<'ALL' | 'INFO' | 'WARN'>('ALL');

  const handlePingEndpoints = () => {
    setIsPinging(true);
    setTimeout(() => {
      setIsPinging(false);
      setPingSuccess(true);
      setTimeout(() => setPingSuccess(false), 2200);
    }, 600);
  };

  const handleApprove = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setApprovedIds(prev => [...prev, id]);
  };

  return (
    <div className="space-y-6">
      {/* 11 Clean Reference Widgets arranged in .home-widget-grid */}
      <div className="home-widget-grid">
        
        {/* ================================================================= */}
        {/* WIDGET 1: IDRAK WORKSPACE HERO AND PRODUCTION TASKS */}
        {/* ================================================================= */}
        <div data-home-widget="workday" data-tone="mint" className="home-widget min-w-0 home-widget-wide">
          <section aria-label="Idrak workspace overview" className="home-workday grid w-full gap-5 text-left md:grid-cols-[minmax(0,1fr)_minmax(270px,0.82fr)] md:items-center">
            <div className="flex min-w-0 flex-wrap items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3.5">
                <span className="home-widget-icon grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-100 text-emerald-800 shadow-2xs">
                  <Clock className="size-5" />
                </span>
                <div className="min-w-0">
                  <h2 className="text-base sm:text-lg font-bold leading-tight text-slate-900 font-display">
                    Your Idrak workspace is ready.
                  </h2>
                  <p className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span>Riyadh DC-1 · Agent runtime and knowledge services</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 shadow-2xs border border-emerald-100">
                      <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      All systems operational
                    </span>
                  </p>
                </div>
              </div>
              <div className="text-left sm:text-right">
                <p className="font-display text-xl sm:text-2xl font-bold leading-tight tabular-nums text-slate-900">
                  {timeStr}
                </p>
                <p className="text-[11px] font-medium text-slate-500">
                  {agents.filter(agent => agent.status === 'LIVE').length} agents live · Sovereign deployment
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-white/90 bg-white/70 p-3 shadow-sm backdrop-blur">
              <div className="mb-2 flex items-center justify-between gap-2 px-1">
                <div>
                  <p className="mb-0 text-[11px] font-bold text-slate-800">Production tasks</p>
                  <p className="mb-0 mt-0.5 text-[9px] text-slate-500">Build something for your fleet</p>
                </div>
                <span className="rounded-full bg-violet-50 px-2 py-1 text-[8px] font-bold uppercase tracking-wider text-violet-700">Quick actions</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <button onClick={onOpenCreateAgent} className="home-production-action group">
                  <span className="grid size-7 place-items-center rounded-lg bg-violet-50 text-violet-700 group-hover:bg-violet-100"><Bot className="size-3.5" /></span>
                  <span className="min-w-0"><span className="block truncate text-[9px] font-semibold text-slate-700">Create agent</span><span className="mt-0.5 block truncate text-[8px] text-slate-400">Start a new assistant</span></span>
                </button>
                <button onClick={() => onNavigate('/app/knowledge')} className="home-production-action group">
                  <span className="grid size-7 place-items-center rounded-lg bg-sky-50 text-sky-700 group-hover:bg-sky-100"><BookOpen className="size-3.5" /></span>
                  <span className="min-w-0"><span className="block truncate text-[9px] font-semibold text-slate-700">Knowledge base</span><span className="mt-0.5 block truncate text-[8px] text-slate-400">Add a grounded source</span></span>
                </button>
                <button onClick={() => onNavigate('/app/agents/ask')} className="home-production-action group">
                  <span className="grid size-7 place-items-center rounded-lg bg-rose-50 text-rose-700 group-hover:bg-rose-100"><Bot className="size-3.5" /></span>
                  <span className="min-w-0"><span className="block truncate text-[9px] font-semibold text-slate-700">Test an agent</span><span className="mt-0.5 block truncate text-[8px] text-slate-400">Try Ask Idrak</span></span>
                </button>
                <button onClick={onOpenVoiceCall} className="home-production-action group">
                  <span className="grid size-7 place-items-center rounded-lg bg-emerald-50 text-emerald-700 group-hover:bg-emerald-100"><PhoneCall className="size-3.5" /></span>
                  <span className="min-w-0"><span className="block truncate text-[9px] font-semibold text-slate-700">Try voice</span><span className="mt-0.5 block truncate text-[8px] text-slate-400">Open voice simulator</span></span>
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* ================================================================= */}
        {/* WIDGET 2: AGENT REVIEWS (Tone: Amber) */}
        {/* ================================================================= */}
        <div data-home-widget="approvals" data-tone="amber" className="home-widget min-w-0">
          <section aria-label="Agent reviews">
            <div className="home-widget-heading grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 mb-4">
              <div className="flex min-w-0 items-center gap-3">
                <span className="home-widget-icon grid size-10 shrink-0 place-items-center rounded-xl bg-amber-100 text-amber-800 shadow-2xs">
                  <Inbox className="size-5" />
                </span>
                <div className="min-w-0">
                  <h2 className="text-base font-bold text-slate-900 font-display">Agent reviews</h2>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {approvalsList.length - approvedIds.length} waiting · 1 need attention
                  </p>
                </div>
              </div>
              <button 
                onClick={() => onNavigate('/app/monitor/logs')}
                className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 hover:text-amber-800 transition-colors cursor-pointer"
              >
                <span>View all</span>
                <ChevronRight className="size-3.5" />
              </button>
            </div>

            <div className="space-y-2">
              {approvalsList.map(item => {
                const isApproved = approvedIds.includes(item.id);
                return (
                  <div
                    key={item.id}
                    className={`home-record-row p-3 flex items-center justify-between gap-3 ${
                      item.needsAttention && !isApproved ? 'home-attention-row' : ''
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 truncate">
                          {item.title}
                        </span>
                        {item.needsAttention && !isApproved && (
                          <span className="rounded-full bg-amber-200/80 text-amber-900 text-[10px] font-bold px-1.5 py-0.2">
                            Urgent
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">
                        {item.requester} · {item.desc}
                      </p>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
                        {item.time}
                      </span>
                      {isApproved ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg">
                          <Check className="size-3" /> Approved
                        </span>
                      ) : (
                        <button
                          onClick={(e) => handleApprove(item.id, e)}
                          className="px-2.5 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 text-[11px] font-bold transition-colors cursor-pointer"
                        >
                          Approve
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* ================================================================= */}
        {/* WIDGET 3: PLATFORM CHECKS (Tone: Cyan) */}
        {/* ================================================================= */}
        <div data-home-widget="tasks" data-tone="cyan" className="home-widget min-w-0">
          <section aria-label="Platform checks">
            <div className="home-widget-heading grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 mb-4">
              <div className="flex min-w-0 items-center gap-3">
                <span className="home-widget-icon grid size-10 shrink-0 place-items-center rounded-xl bg-sky-100 text-sky-800 shadow-2xs">
                  <CheckSquare className="size-5" />
                </span>
                <div className="min-w-0">
                  <h2 className="text-base font-bold text-slate-900 font-display">Platform checks</h2>
                  <p className="mt-0.5 text-xs text-slate-500">2 checks today · 3 open</p>
                </div>
              </div>
              <button 
                onClick={() => onNavigate('/app/agents')}
                className="inline-flex items-center gap-1 text-xs font-semibold text-sky-700 hover:text-sky-800 transition-colors cursor-pointer"
              >
                <span>View all</span>
                <ChevronRight className="size-3.5" />
              </button>
            </div>

            <div className="space-y-2">
              {[
                { id: 'task-1', title: 'Review voice gateway latency', dept: 'Voice services', due: 'Today' },
                { id: 'task-2', title: 'Validate Arabic voice responses', dept: 'Agent quality', due: 'Today' },
                { id: 'task-3', title: 'Refresh product knowledge source', dept: 'Knowledge base', due: 'Tomorrow' },
              ].map(task => {
                const done = completedTasks[task.id];
                return (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className="home-record-row p-3 flex items-center gap-3 cursor-pointer select-none"
                  >
                    <button 
                      className={`grid size-5 shrink-0 place-items-center rounded-md border transition-all ${
                        done ? 'bg-sky-600 border-sky-600 text-white' : 'border-slate-300 hover:border-sky-500 bg-white'
                      }`}
                    >
                      {done && <Check className="size-3.5" />}
                    </button>
                    <div className="min-w-0 flex-1">
                      <p className={`text-xs font-semibold truncate ${done ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                        {task.title}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {task.dept} · Due {task.due}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* ================================================================= */}
        {/* WIDGET 4: PLATFORM USAGE & QUOTAS (Tone: Pink) */}
        {/* ================================================================= */}
        <div data-home-widget="leave" data-tone="pink" className="home-widget min-w-0">
          <section aria-label="Platform usage and quotas">
            <div className="home-widget-heading grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 mb-4">
              <div className="flex min-w-0 items-center gap-3">
                <span className="home-widget-icon grid size-10 shrink-0 place-items-center rounded-xl bg-rose-100 text-rose-800 shadow-2xs">
                  <Gauge className="size-5" />
                </span>
                <div className="min-w-0">
                  <h2 className="text-base font-bold text-slate-900 font-display">Usage & Quotas</h2>
                  <p className="mt-0.5 text-xs text-slate-500">Platform capacity · Current billing period</p>
                </div>
              </div>
              <button
                onClick={() => onNavigate('/app/monitor/spend')}
                className="inline-flex items-center gap-1 rounded-lg bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition-colors cursor-pointer"
              >
                <span>Usage</span>
                <ChevronRight className="size-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  LLM Tokens
                </span>
                <p className="mt-1 font-display text-lg font-bold text-slate-900">
                  18.4M <span className="text-xs font-normal text-slate-400">left</span>
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">2.6M of 21M used</p>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Telephony SIP
                </span>
                <p className="mt-1 font-display text-lg font-bold text-slate-900">
                  482h <span className="text-xs font-normal text-slate-400">left</span>
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">118h of 600h used</p>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Knowledge Docs
                </span>
                <p className="mt-1 font-display text-lg font-bold text-slate-900">
                  842 <span className="text-xs font-normal text-slate-400">docs</span>
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">1,200 limit</p>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Concurrent Lines
                </span>
                <p className="mt-1 font-display text-lg font-bold text-slate-900">
                  38 <span className="text-xs font-normal text-slate-400">active</span>
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">100 channels</p>
              </div>
            </div>
          </section>
        </div>

        {/* ================================================================= */}
        {/* WIDGET 5: AUTOMATION SCHEDULE (Tone: Cyan) */}
        {/* ================================================================= */}
        <div data-home-widget="schedule" data-tone="cyan" className="home-widget min-w-0">
          <section aria-label="Automation schedule">
            <div className="home-widget-heading grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 mb-4">
              <div className="flex min-w-0 items-center gap-3">
                <span className="home-widget-icon grid size-10 shrink-0 place-items-center rounded-xl bg-sky-100 text-sky-800 shadow-2xs">
                  <CalendarDays className="size-5" />
                </span>
                <div className="min-w-0">
                  <h2 className="text-base font-bold text-slate-900 font-display">Automation schedule</h2>
                  <p className="mt-0.5 text-xs text-slate-500">Automated jobs & batch runs</p>
                </div>
              </div>
              <button 
                onClick={() => onNavigate('/app/monitor/logs')}
                className="inline-flex items-center gap-1 text-xs font-semibold text-sky-700 hover:text-sky-800 transition-colors cursor-pointer"
              >
                <span>Calendar</span>
                <ChevronRight className="size-3.5" />
              </button>
            </div>

            <div className="space-y-2">
              {[
                { title: 'Automated Daily Knowledge Base Sync', time: 'Today · 14:00', type: 'Vector ETL' },
                { title: 'Weekly Multi-Agent Intent Accuracy Run', time: 'Tomorrow · 09:30', type: 'Benchmark' },
                { title: 'Sovereign SSL & Certificate Audit', time: '18 Oct 2026', type: 'Security' },
              ].map((sch, i) => (
                <div key={i} className="home-record-row p-3 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">{sch.title}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{sch.type}</p>
                  </div>
                  <span className="shrink-0 text-[11px] font-semibold text-sky-800 bg-sky-100/70 px-2 py-0.5 rounded-full">
                    {sch.time}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ================================================================= */}
        {/* WIDGET 6: FLEET ACTIVITY & RUNTIME (Tone: Mint, Wide) */}
        {/* ================================================================= */}
        <div data-home-widget="attendance" data-tone="mint" className="home-widget min-w-0 home-widget-wide">
          <section aria-label="Fleet activity and runtime">
            <div className="home-widget-heading grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 mb-4">
              <div className="flex min-w-0 items-center gap-3">
                <span className="home-widget-icon grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-100 text-emerald-800 shadow-2xs">
                  <BarChart3 className="size-5" />
                </span>
                <div className="min-w-0">
                  <h2 className="text-base font-bold text-slate-900 font-display">
                    Fleet Activity & Runtime
                  </h2>
                  <p className="mt-0.5 text-xs text-slate-500">
                    Last 7 days · 26,840 conversations handled
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-1">
                99.98% Live SLA
              </span>
            </div>

            <div className="grid items-start gap-4 lg:grid-cols-2">
              {/* This week stats */}
              <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
                <div className="flex flex-wrap items-end justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-display text-sm font-bold text-slate-900">This week</h3>
                    <p className="text-[11px] text-slate-500">Daily agent activity · Riyadh DC-1</p>
                  </div>
                  <div>
                    <p className="font-display text-xl font-bold tabular-nums text-slate-900">
                      26.8k <span className="text-xs text-slate-400 font-normal">/ 45k target</span>
                    </p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="relative w-full h-2 rounded-full bg-slate-200 overflow-hidden mb-4">
                  <div className="h-full bg-emerald-600 rounded-full transition-all duration-500" style={{ width: '60%' }} />
                </div>

                {/* Daily Bar chart */}
                <div className="grid grid-cols-5 gap-2 pt-2 border-t border-slate-200/70 text-center">
                  {[
                    { day: 'Mon', count: '5,420', pct: 75 },
                    { day: 'Tue', count: '6,180', pct: 88 },
                    { day: 'Wed', count: '5,940', pct: 82 },
                    { day: 'Thu', count: '4,890', pct: 68 },
                    { day: 'Fri', count: '4,410', pct: 60 },
                  ].map((bar, i) => (
                    <div key={i} className="flex flex-col items-center gap-1.5 group">
                      <div className="w-full h-16 bg-slate-200/60 rounded-lg flex items-end p-1">
                        <div 
                          className="w-full bg-emerald-500 group-hover:bg-emerald-600 rounded-md transition-all duration-200"
                          style={{ height: `${bar.pct}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-bold text-slate-700">{bar.day}</span>
                      <span className="text-[9px] text-slate-400 font-mono">{bar.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fleet availability summary */}
              <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4 space-y-3">
                <h3 className="font-display text-sm font-bold text-slate-900">
                  Fleet Capacity & Real-Time Telephony
                </h3>
                
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-3 bg-white rounded-xl border border-slate-100 shadow-2xs">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Peak Concurrency</span>
                    <span className="font-display text-lg font-bold text-slate-900">42 lines</span>
                    <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">Within SLA limits</span>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-100 shadow-2xs">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Avg Turnaround</span>
                    <span className="font-display text-lg font-bold text-slate-900">182 ms</span>
                    <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">GCC SIP Gateway</span>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-100 shadow-2xs">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Audio Packet Drop</span>
                    <span className="font-display text-lg font-bold text-emerald-600">0.00%</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Opus 24kHz</span>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-100 shadow-2xs">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Avg Call Length</span>
                    <span className="font-display text-lg font-bold text-slate-900">3m 14s</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">89% resolved</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* ================================================================= */}
        {/* WIDGET 7: AGENT FLEET (Tone: Mint) */}
        {/* ================================================================= */}
        <div data-home-widget="team" data-tone="mint" className="home-widget min-w-0">
          <section aria-label="Agent fleet">
            <div className="home-widget-heading grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 mb-4">
              <div className="flex min-w-0 items-center gap-3">
                <span className="home-widget-icon grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-100 text-emerald-800 shadow-2xs">
                  <Users className="size-5" />
                </span>
                <div className="min-w-0">
                  <h2 className="text-base font-bold text-slate-900 font-display">Agent fleet</h2>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {agents.length} sovereign agents on duty
                  </p>
                </div>
              </div>
              <button 
                onClick={() => onNavigate('/app/agents')}
                className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors cursor-pointer"
              >
                <span>View all</span>
                <ChevronRight className="size-3.5" />
              </button>
            </div>

            <div className="space-y-2">
              {agents.slice(0, 4).map(agent => (
                <div
                  key={agent.id}
                  onClick={() => onSelectAgentDetails(agent)}
                  className="home-record-row p-3 flex items-center justify-between gap-3 cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="size-8 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                      {agent.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">{agent.name}</p>
                      <p className="text-[10px] text-slate-400 truncate">{agent.type} Agent · {agent.language || 'Arabic / English'}</p>
                    </div>
                  </div>

                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    agent.status === 'LIVE' 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {agent.status}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ================================================================= */}
        {/* WIDGET 8: FLEET MILESTONES (Tone: Pink) */}
        {/* ================================================================= */}
        <div data-home-widget="celebrations" data-tone="pink" className="home-widget min-w-0">
          <section aria-label="Fleet milestones">
            <div className="home-widget-heading grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 mb-4">
              <div className="flex min-w-0 items-center gap-3">
                <span className="home-widget-icon grid size-10 shrink-0 place-items-center rounded-xl bg-rose-100 text-rose-800 shadow-2xs">
                  <Cake className="size-5" />
                </span>
                <div className="min-w-0">
                  <h2 className="text-base font-bold text-slate-900 font-display">Fleet milestones</h2>
                  <p className="mt-0.5 text-xs text-slate-500">Progress across agents and platform</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {[
                { initials: '1M', title: '1,000,000th Voice Minutes Milestone', date: 'Milestone · Today', badge: 'Record' },
                { initials: 'SA', title: 'Salma achieved 99.2% CSAT rating', date: 'Fleet award · Yesterday', badge: 'Top CSAT' },
                { initials: 'ISO', title: 'ISO-27001 Sovereign Recertification', date: 'Compliance · 2 days ago', badge: 'Audited' },
              ].map((cel, i) => (
                <div key={i} className="home-record-row p-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-rose-100 text-rose-800 text-[11px] font-bold">
                      {cel.initials}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">{cel.title}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{cel.date}</p>
                    </div>
                  </div>
                  <span className="shrink-0 text-[10px] font-bold bg-rose-50 text-rose-700 px-2 py-0.5 rounded-full">
                    {cel.badge}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ================================================================= */}
        {/* WIDGET 9: GOALS & IMPACT (Tone: Violet, Wide) */}
        {/* ================================================================= */}
        <div data-home-widget="goals" data-tone="violet" className="home-widget min-w-0 home-widget-wide">
          <div className="home-goals">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="home-widget-icon grid size-8 shrink-0 place-items-center rounded-lg bg-violet-100 text-violet-800">
                  <Target className="size-4" />
                </span>
                <h2 className="font-display text-base font-bold text-slate-900">
                  Platform goals & impact
                </h2>
              </div>
              <span className="text-[11px] font-medium text-slate-500">
                Q4 · Oct – Dec 2026
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {/* Goal 1 */}
              <button 
                onClick={() => onNavigate('/app/monitor/analytics')}
                className="flex flex-col items-stretch text-left rounded-xl border border-slate-200/80 bg-white p-4 shadow-2xs hover:border-violet-300 hover:shadow-xs transition-all cursor-pointer"
              >
                <span className="text-[10px] font-bold text-violet-700 uppercase tracking-wider">
                  Agent experience · Telephony
                </span>
                <span className="mt-2 text-xs font-bold text-slate-900 leading-snug">
                  Zero First-Call Escalation Rate
                </span>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="font-display text-lg font-bold text-slate-900">18,480</span>
                  <span className="text-xs text-slate-400">/ 20,000 calls (92.4%)</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-violet-600 h-full rounded-full" style={{ width: '92.4%' }} />
                </div>
              </button>

              {/* Goal 2 */}
              <button 
                onClick={() => onNavigate('/app/creative/tts')}
                className="flex flex-col items-stretch text-left rounded-xl border border-slate-200/80 bg-white p-4 shadow-2xs hover:border-amber-300 hover:shadow-xs transition-all cursor-pointer"
              >
                <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">
                  Platform performance · Audio latency
                </span>
                <span className="mt-2 text-xs font-bold text-slate-900 leading-snug">
                  Keep Vocal Turnaround &lt; 200ms
                </span>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="font-display text-lg font-bold text-slate-900">182 ms</span>
                  <span className="text-xs text-slate-400">avg / 200ms target</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '91%' }} />
                </div>
              </button>

              {/* Goal 3 */}
              <button 
                onClick={() => onNavigate('/app/knowledge')}
                className="flex flex-col items-stretch text-left rounded-xl border border-slate-200/80 bg-white p-4 shadow-2xs hover:border-emerald-300 hover:shadow-xs transition-all cursor-pointer"
              >
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                  Knowledge quality · Grounding
                </span>
                <span className="mt-2 text-xs font-bold text-slate-900 leading-snug">
                  Zero Hallucination Retrieval SLA
                </span>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="font-display text-lg font-bold text-slate-900">98.6%</span>
                  <span className="text-xs text-slate-400">accuracy / 99% target</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full" style={{ width: '98.6%' }} />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* WIDGET 10: KEEP GROWING / LEARNING (Tone: Violet) */}
        {/* ================================================================= */}
        <div data-home-widget="learning" data-tone="violet" className="home-widget min-w-0">
          <section aria-label="Knowledge Growth">
            <div className="home-widget-heading grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 mb-4">
              <div className="flex min-w-0 items-center gap-3">
                <span className="home-widget-icon grid size-10 shrink-0 place-items-center rounded-xl bg-violet-100 text-violet-800 shadow-2xs">
                  <BookOpen className="size-5" />
                </span>
                <div className="min-w-0">
                  <h2 className="text-base font-bold text-slate-900 font-display">Knowledge pipelines</h2>
                  <p className="mt-0.5 text-xs text-slate-500">{collections.length} connected collections</p>
                </div>
              </div>
              <button 
                onClick={() => onNavigate('/app/knowledge')}
                className="inline-flex items-center gap-1 text-xs font-semibold text-violet-700 hover:text-violet-800 transition-colors cursor-pointer"
              >
                <span>Browse</span>
                <ChevronRight className="size-3.5" />
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              <div className="py-2.5 first:pt-0">
                <div className="flex items-center gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-violet-50 text-violet-700">
                    <Sparkles className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-slate-900 truncate">
                      Product documentation refresh
                    </p>
                    <p className="text-[10px] text-slate-400">Active · 3 of 5 stages · 12 min</p>
                  </div>
                  <button className="grid size-7 place-items-center rounded-lg hover:bg-violet-100 text-violet-700 transition-colors cursor-pointer">
                    <Play className="size-3.5 fill-current" />
                  </button>
                </div>
                <div className="ml-12 mt-2">
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-violet-600 h-full rounded-full" style={{ width: '60%' }} />
                  </div>
                </div>
              </div>

              <div className="py-2.5">
                <div className="flex items-center gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-violet-50 text-violet-700">
                    <Bot className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-slate-900 truncate">
                      Arabic response quality tuning
                    </p>
                    <p className="text-[10px] text-slate-400">Queued · 1 of 4 stages · 8 min</p>
                  </div>
                  <button className="grid size-7 place-items-center rounded-lg hover:bg-violet-100 text-violet-700 transition-colors cursor-pointer">
                    <Play className="size-3.5 fill-current" />
                  </button>
                </div>
                <div className="ml-12 mt-2">
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-violet-600 h-full rounded-full" style={{ width: '25%' }} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* ================================================================= */}
        {/* WIDGET 11: MODEL QUALITY REVIEW (Tone: Amber) */}
        {/* ================================================================= */}
        <div data-home-widget="reviews" data-tone="amber" className="home-widget min-w-0">
          <section aria-label="Model quality review">
            <div className="home-widget-heading grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 mb-3">
              <div className="flex min-w-0 items-center gap-3">
                <span className="home-widget-icon grid size-10 shrink-0 place-items-center rounded-xl bg-amber-100 text-amber-800 shadow-2xs">
                  <ClipboardCheck className="size-5" />
                </span>
                <div className="min-w-0">
                  <h2 className="text-base font-bold text-slate-900 font-display">
                    Model quality review
                  </h2>
                  <p className="mt-0.5 text-xs text-slate-500">Quarterly agent quality review</p>
                </div>
              </div>
              <span className="rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5">
                Review pending
              </span>
            </div>

            <h3 className="text-xs font-bold text-slate-900 mb-2">
              Review response quality and fleet metrics
            </h3>

            <dl className="space-y-1.5 text-xs text-slate-600 mb-4 bg-amber-50/50 p-2.5 rounded-xl border border-amber-100/60">
              <div className="flex justify-between gap-3">
                <dt className="text-slate-400">Submit by</dt>
                <dd className="font-semibold text-slate-800">20 October 2026</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-slate-400">Review owner</dt>
                <dd className="font-semibold text-slate-800">AI Platform team</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-slate-400">Quality targets</dt>
                <dd className="font-semibold text-slate-800">3 agent quality goals</dd>
              </div>
            </dl>

            <button 
              onClick={() => onNavigate('/app/monitor/analytics')}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white border border-amber-200/80 px-3 py-2 text-xs font-bold text-amber-900 shadow-2xs hover:bg-amber-50 transition-colors cursor-pointer"
            >
              <span>Review analytics</span>
              <ArrowRight className="size-3.5" />
            </button>
          </section>
        </div>

        {/* ================================================================= */}
        {/* WIDGET 12: FLEET ANALYTICS & VISUAL TELEMETRY (Tone: Violet, Wide) */}
        {/* ================================================================= */}
        <div data-home-widget="analytics-visual" data-tone="violet" className="home-widget min-w-0 home-widget-wide">
          <section aria-label="Fleet Analytics & Visual Telemetry">
            <div className="home-widget-heading flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex min-w-0 items-center gap-3">
                <span className="home-widget-icon grid size-10 shrink-0 place-items-center rounded-xl bg-violet-100 text-violet-800 shadow-2xs">
                  <BarChart3 className="size-5" />
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold text-slate-900 font-display">
                      Fleet Analytics & Telemetry Curve
                    </h2>
                    <span className="rounded-full bg-violet-100 text-violet-800 text-[10px] font-bold px-2 py-0.5">
                      Live Telemetry
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-slate-500">
                    Aggregated inbound volume, median latency, and sovereign GPU token velocity
                  </p>
                </div>
              </div>

              {/* Timeframe pill toggle & navigation */}
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-slate-100/80 p-0.5 rounded-xl border border-slate-200/60">
                  {(['24H', '7D', '30D'] as const).map(tf => (
                    <button
                      key={tf}
                      onClick={() => setAnalyticsTimeframe(tf)}
                      className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                        analyticsTimeframe === tf 
                          ? 'bg-white text-violet-700 shadow-xs' 
                          : 'text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => onNavigate('/app/monitor/analytics')}
                  className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold text-violet-700 hover:text-violet-800 rounded-lg hover:bg-violet-50 transition-colors cursor-pointer"
                >
                  <span>Full Analytics</span>
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            </div>

            {/* Quick KPI stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              <div className="home-record-row p-3 flex flex-col justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Traffic</span>
                <span className="font-display text-xl font-bold text-slate-900 mt-1">833.5k</span>
                <span className="text-[10px] text-emerald-600 font-bold mt-0.5">+24.2% volume</span>
              </div>
              <div className="home-record-row p-3 flex flex-col justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Median Voice Latency</span>
                <span className="font-display text-xl font-bold text-violet-700 mt-1">182 ms</span>
                <span className="text-[10px] text-emerald-600 font-bold mt-0.5">↓ 18ms acoustic opt</span>
              </div>
              <div className="home-record-row p-3 flex flex-col justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Intent Recognition</span>
                <span className="font-display text-xl font-bold text-emerald-700 mt-1">99.4%</span>
                <span className="text-[10px] text-slate-400 mt-0.5">Saudi & Gulf dialect</span>
              </div>
              <div className="home-record-row p-3 flex flex-col justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Sovereign SLA</span>
                <span className="font-display text-xl font-bold text-slate-900 mt-1">99.98%</span>
                <span className="text-[10px] text-emerald-600 font-bold mt-0.5">Zero cross-border egress</span>
              </div>
            </div>

            {/* Visual Bar Chart sparkline */}
            <div className="home-record-row p-4">
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="font-bold text-slate-800">Hourly Telephony & Chat Concurrency</span>
                <div className="flex items-center gap-3 text-[11px] text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-violet-600" /> Voice SIP
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-cyan-500" /> Web & API Chat
                  </span>
                </div>
              </div>

              <div className="flex items-end gap-2.5 sm:gap-4 h-32 pt-4 px-2">
                {[
                  { label: 'Thu', val: 56, count: '78.2k' },
                  { label: 'Fri', val: 40, count: '52.1k' },
                  { label: 'Sat', val: 46, count: '61.4k' },
                  { label: 'Sun', val: 82, count: '112.5k' },
                  { label: 'Mon', val: 96, count: '138.9k' },
                  { label: 'Tue', val: 88, count: '124.2k' },
                  { label: 'Today', val: 100, count: '145.0k', active: true },
                ].map((bar, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 group relative">
                    <div className="w-full bg-slate-100 rounded-t-xl overflow-hidden flex flex-col justify-end h-24">
                      <div 
                        className={`w-full transition-all group-hover:opacity-90 rounded-t-lg ${
                          bar.active 
                            ? 'bg-gradient-to-t from-violet-600 to-indigo-500' 
                            : 'bg-violet-400/80 group-hover:bg-violet-500'
                        }`} 
                        style={{ height: `${bar.val}%` }} 
                      />
                    </div>
                    {/* Hover tooltip */}
                    <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-bold py-0.5 px-2 rounded pointer-events-none whitespace-nowrap z-10 shadow-sm">
                      {bar.count} calls
                    </div>
                    <span className={`text-[10px] font-bold ${bar.active ? 'text-violet-700' : 'text-slate-400'}`}>
                      {bar.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* ================================================================= */}
        {/* WIDGET 13: REAL-TIME ACTIVITY STREAM (Tone: Mint) */}
        {/* ================================================================= */}
        <div data-home-widget="activities" data-tone="mint" className="home-widget min-w-0">
          <section aria-label="Real-Time Activities">
            <div className="home-widget-heading grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 mb-3">
              <div className="flex min-w-0 items-center gap-3">
                <span className="home-widget-icon grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-100 text-emerald-800 shadow-2xs">
                  <Activity className="size-5" />
                </span>
                <div className="min-w-0">
                  <h2 className="text-base font-bold text-slate-900 font-display">
                    Live Activity Pulse
                  </h2>
                  <p className="mt-0.5 text-xs text-slate-500">Real-time agent dispatch & system events</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 border border-emerald-100">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Stream
              </span>
            </div>

            <div className="space-y-2">
              {[
                {
                  id: 'act-1',
                  agent: 'Salma Voice Agent',
                  action: 'Resolved outbound SLA credit call #8492 · 48s',
                  meta: 'CSAT 98% · Riyadh DC-1 SIP',
                  time: '2m ago',
                  tag: 'Voice',
                  tagColor: 'bg-emerald-100 text-emerald-800'
                },
                {
                  id: 'act-2',
                  agent: 'DataBot Connector',
                  action: 'Synced 420 product records into DataBot',
                  meta: 'catalog.product_knowledge · 420 rows',
                  time: '14m ago',
                  tag: 'Sync',
                  tagColor: 'bg-indigo-100 text-indigo-800'
                },
                {
                  id: 'act-3',
                  agent: 'Tariq Support Agent',
                  action: 'Answered Arabic product policy question',
                  meta: '99% retrieval confidence · RAG product-kb',
                  time: '28m ago',
                  tag: 'Chat',
                  tagColor: 'bg-violet-100 text-violet-800'
                },
                {
                  id: 'act-4',
                  agent: 'Sovereign Cluster DC-1',
                  action: 'Auto-scaled GPU cluster +2 partition nodes',
                  meta: 'Sub-200ms latency maintained',
                  time: '1h ago',
                  tag: 'Cluster',
                  tagColor: 'bg-cyan-100 text-cyan-800'
                }
              ].map(act => (
                <div 
                  key={act.id} 
                  className="home-record-row p-3 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 truncate">{act.agent}</span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-md ${act.tagColor}`}>
                        {act.tag}
                      </span>
                    </div>
                    <p className="text-slate-700 text-[11px] mt-0.5 truncate">{act.action}</p>
                    <p className="text-slate-400 text-[10px] mt-0.5 truncate">{act.meta}</p>
                  </div>
                  <span className="shrink-0 text-[10px] font-semibold text-slate-400">{act.time}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => onNavigate('/app/monitor/conversations')}
              className="mt-3.5 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-white border border-slate-200/80 px-3 py-2 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <span>Inspect conversations & transcripts</span>
              <ArrowRight className="size-3.5" />
            </button>
          </section>
        </div>

        {/* ================================================================= */}
        {/* WIDGET 14: PUBLIC API & ENDPOINT MONITORING (Tone: Cyan) */}
        {/* ================================================================= */}
        <div data-home-widget="api-monitor" data-tone="cyan" className="home-widget min-w-0">
          <section aria-label="Public API Monitoring">
            <div className="home-widget-heading grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 mb-3">
              <div className="flex min-w-0 items-center gap-3">
                <span className="home-widget-icon grid size-10 shrink-0 place-items-center rounded-xl bg-sky-100 text-sky-800 shadow-2xs">
                  <Globe className="size-5" />
                </span>
                <div className="min-w-0">
                  <h2 className="text-base font-bold text-slate-900 font-display">
                    Public API & Gateway Health
                  </h2>
                  <p className="mt-0.5 text-xs text-slate-500">Live response times & HTTP status checks</p>
                </div>
              </div>
              <button
                onClick={handlePingEndpoints}
                disabled={isPinging}
                className="inline-flex items-center gap-1 rounded-full bg-sky-50 hover:bg-sky-100 text-sky-800 text-[10px] font-bold px-2.5 py-1 border border-sky-100 transition-colors cursor-pointer disabled:opacity-60"
              >
                <RefreshCw className={`size-3 ${isPinging ? 'animate-spin' : ''}`} />
                <span>{pingSuccess ? 'All Active' : isPinging ? 'Pinging...' : 'Ping All'}</span>
              </button>
            </div>

            <div className="space-y-2">
              {[
                { method: 'POST', path: '/v1/chat/completions', latency: '182ms', uptime: '99.99%', reqs: '42.1k' },
                { method: 'POST', path: '/v1/voice/telephony/sip', latency: '240ms', uptime: '99.98%', reqs: '18.9k' },
                { method: 'GET', path: '/v1/kb/rag/query', latency: '88ms', uptime: '100%', reqs: '89.4k' },
                { method: 'POST', path: '/v1/databot/sql/exec', latency: '112ms', uptime: '99.95%', reqs: '12.3k' },
              ].map((ep, i) => (
                <div key={i} className="home-record-row p-3 flex items-center justify-between gap-3 text-xs">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-sky-100 text-sky-800 font-mono font-bold px-1.5 py-0.2 text-[9px]">
                        {ep.method}
                      </span>
                      <code className="font-mono text-slate-900 font-bold text-[11px] truncate">{ep.path}</code>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-slate-400 mt-1">
                      <span>{ep.reqs} requests / 24h</span>
                      <span className="text-emerald-600 font-bold">{ep.uptime} SLA</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-mono font-bold text-sky-700 block text-xs">{ep.latency}</span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 mt-0.5">
                      <span className="size-1.5 rounded-full bg-emerald-500" />
                      Healthy
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => onNavigate('/app/monitor/public-api')}
              className="mt-3.5 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-white border border-slate-200/80 px-3 py-2 text-xs font-bold text-sky-900 shadow-2xs hover:bg-sky-50 transition-colors cursor-pointer"
            >
              <span>Open Public API Monitor</span>
              <ArrowRight className="size-3.5" />
            </button>
          </section>
        </div>

        {/* ================================================================= */}
        {/* WIDGET 15: SYSTEM LOGS & SECURITY AUDIT (Tone: Amber) */}
        {/* ================================================================= */}
        <div data-home-widget="system-logs" data-tone="amber" className="home-widget home-widget-wide min-w-0">
          <section aria-label="System Logs & Audit">
            <div className="home-widget-heading grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 mb-3">
              <div className="flex min-w-0 items-center gap-3">
                <span className="home-widget-icon grid size-10 shrink-0 place-items-center rounded-xl bg-amber-100 text-amber-800 shadow-2xs">
                  <ScrollText className="size-5" />
                </span>
                <div className="min-w-0">
                  <h2 className="text-base font-bold text-slate-900 font-display">
                    System Event & Audit Logs
                  </h2>
                  <p className="mt-0.5 text-xs text-slate-500">Cryptographically verified PDPL & cluster audit</p>
                </div>
              </div>

              {/* Filter chips */}
              <div className="flex items-center gap-1 bg-amber-50/60 p-0.5 rounded-lg border border-amber-100">
                {(['ALL', 'INFO', 'WARN'] as const).map(lvl => (
                  <button
                    key={lvl}
                    onClick={() => setHomeLogFilter(lvl)}
                    className={`px-2 py-0.5 text-[10px] font-bold rounded transition-colors cursor-pointer ${
                      homeLogFilter === lvl
                        ? 'bg-amber-500 text-white shadow-2xs'
                        : 'text-amber-800 hover:text-amber-950'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              {[
                { time: '14:42:18', level: 'INFO', svc: 'telephony-gw', msg: 'SIP trunk session initialized (Riyadh DC-1). 8kHz RTP established.' },
                { time: '14:38:52', level: 'WARN', svc: 'guardrails-pii', msg: 'National ID masked per Saudi PDPL Art 14 before LLM dispatch.' },
                { time: '14:35:10', level: 'INFO', svc: 'rag-embedder', msg: 'Vector similarity cache hit on collection kb-hr (score: 0.984).' },
                { time: '14:30:00', level: 'INFO', svc: 'cluster-audit', msg: 'Zero cross-border egress confirmed. In-country sovereign execution.' },
              ]
                .filter(l => homeLogFilter === 'ALL' || l.level === homeLogFilter)
                .map((log, i) => (
                  <div key={i} className="home-record-row p-2.5 flex items-start gap-2.5 text-xs">
                    <span className="font-mono text-[10px] text-slate-400 shrink-0 mt-0.5">{log.time}</span>
                    <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold shrink-0 mt-0.5 ${
                      log.level === 'WARN' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {log.level}
                    </span>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-semibold text-violet-700 mr-1.5">[{log.svc}]</span>
                      <span className="text-slate-700 text-[11px] leading-relaxed">{log.msg}</span>
                    </div>
                  </div>
                ))}
            </div>

            <button 
              onClick={() => onNavigate('/app/monitor/logs')}
              className="mt-3.5 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-white border border-amber-200/80 px-3 py-2 text-xs font-bold text-amber-900 shadow-2xs hover:bg-amber-50 transition-colors cursor-pointer"
            >
              <span>Explore full audit stream</span>
              <ArrowRight className="size-3.5" />
            </button>
          </section>
        </div>

      </div>
    </div>
  );
};

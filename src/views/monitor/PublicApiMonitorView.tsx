import React, { useState } from 'react';
import { 
  Globe, 
  CheckCircle2, 
  Clock, 
  Activity, 
  Copy, 
  Check, 
  RefreshCw, 
  ShieldAlert, 
  Zap, 
  Send,
  Layers,
  BarChart3,
  Database,
  MessageSquare,
  Mic,
  ShieldCheck,
  CircleCheck,
  ArrowUpRight,
  Server
} from 'lucide-react';
const requestLog = [
  { time: '11:42:18', method: 'POST', path: '/v1/voice/session', agent: 'Najla - KSA Banking Care', session: 'sess-8a21', mode: 'Voice', latency: '22 ms', status: 200 },
  { time: '11:38:52', method: 'POST', path: '/v1/voice/turns', agent: 'Najla - KSA Banking Care', session: 'sess-8a21', mode: 'Voice', latency: '29 ms', status: 200 },
  { time: '11:35:10', method: 'POST', path: '/v1/agents/voice', agent: 'Gulf VIP Sales Qualifier', session: 'sess-741b', mode: 'Voice', latency: '18 ms', status: 200 },
  { time: '11:30:00', method: 'POST', path: '/v1/voice/session', agent: 'IT Support & System Triage', session: 'sess-1c09', mode: 'Voice', latency: '22 ms', status: 200 },
  { time: '11:24:36', method: 'POST', path: '/v1/voice/turns', agent: 'Najla - KSA Banking Care', session: 'sess-b205', mode: 'Voice', latency: '19 ms', status: 200 },
];

export const PublicApiMonitorView: React.FC = () => {
  const [copiedPath, setCopiedPath] = useState<string | null>(null);
  const [isPinging, setIsPinging] = useState<boolean>(false);
  const [pingSuccess, setPingSuccess] = useState<boolean>(false);

  const copyPath = (path: string) => {
    navigator.clipboard.writeText(path);
    setCopiedPath(path);
    setTimeout(() => setCopiedPath(null), 2000);
  };

  const handlePing = () => {
    setIsPinging(true);
    setTimeout(() => {
      setIsPinging(false);
      setPingSuccess(true);
      setTimeout(() => setPingSuccess(false), 2200);
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-xl sm:text-2xl font-bold text-slate-900">Public API Gateway Monitor</h1>
            <span className="rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5">
              Gateway Operational
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Request-log traffic, latency percentiles, endpoint health, and Idrak runtime usage
          </p>
        </div>

        <button
          onClick={handlePing}
          disabled={isPinging}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer disabled:opacity-60"
        >
          <RefreshCw className={`size-3.5 ${isPinging ? 'animate-spin text-sky-600' : ''}`} />
          <span>{pingSuccess ? 'All Endpoints Responsive' : isPinging ? 'Measuring Latencies...' : 'Ping All Gateways'}</span>
        </button>
      </div>

      {/* Idrak request telemetry */}
      <div className="home-widget-grid">

        {/* ================================================================= */}
        {/* CARD 1: Gateway Overview Deck (Tone: Cyan, Wide) */}
        {/* ================================================================= */}
        <div data-home-widget="gateway-status" data-tone="cyan" className="home-widget home-widget-wide">
          <div className="home-widget-heading flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="home-widget-icon grid size-10 place-items-center rounded-xl bg-sky-100 text-sky-800 shadow-2xs">
                <Globe className="size-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">Sovereign API Edge Status</h2>
                <p className="text-xs text-slate-500">Idrak gateway · request-log telemetry for this workspace</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-2.5 py-1 text-[11px] font-bold text-sky-800 border border-sky-100">
              <span className="size-1.5 rounded-full bg-sky-500 animate-pulse" />
              Demo telemetry
            </span>
          </div>

          <div className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {[
                { label: 'Requests', value: '5', detail: 'Across all agents', icon: Activity, tone: 'text-violet-700 bg-violet-50' },
                { label: 'Success rate', value: '100%', detail: '5 ok · 0 err', icon: CircleCheck, tone: 'text-emerald-700 bg-emerald-50' },
                { label: 'Unique sessions', value: '4', detail: 'Distinct visitor conversations', icon: MessageSquare, tone: 'text-sky-700 bg-sky-50' },
                { label: 'Avg latency', value: '22 ms', detail: 'p50 22 ms · p95 29 ms', icon: Clock, tone: 'text-amber-700 bg-amber-50' },
                { label: 'Text requests', value: '0', detail: 'From request log mode metadata', icon: MessageSquare, tone: 'text-indigo-700 bg-indigo-50' },
                { label: 'Voice requests', value: '5', detail: 'From request log mode metadata', icon: Mic, tone: 'text-rose-700 bg-rose-50' },
                { label: 'Grounding-required turns', value: '0', detail: 'Semantic grounding executed', icon: ShieldCheck, tone: 'text-teal-700 bg-teal-50' },
                { label: 'Retrieval-executed turns', value: '0', detail: 'KB retrieval performed', icon: Database, tone: 'text-cyan-700 bg-cyan-50' },
              ].map((metric) => {
                const Icon = metric.icon;
                return (
                  <div key={metric.label} className="home-record-row flex min-h-[103px] flex-col justify-between p-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[9px] font-bold uppercase tracking-wide text-slate-500">{metric.label}</span>
                      <span className={`grid size-7 shrink-0 place-items-center rounded-lg ${metric.tone}`}><Icon className="size-3.5" /></span>
                    </div>
                    <span className="font-display text-xl font-bold leading-tight text-slate-900">{metric.value}</span>
                    <span className="text-[9px] leading-tight text-slate-400">{metric.detail}</span>
                  </div>
                );
              })}
            </div>
            <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-1">
              <div className="rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-50/70 via-white to-cyan-50/50 p-3.5">
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <p className="mb-0 text-[10px] font-bold text-slate-700">Requests over time</p>
                    <p className="mb-0 mt-0.5 text-[9px] text-slate-400">5 successful calls · last 24 hours</p>
                  </div>
                  <BarChart3 className="size-4 text-sky-600" />
                </div>
                <div className="flex h-[74px] items-end gap-2 rounded-xl bg-white/70 px-3 py-2">
                  {[0, 1, 0, 2, 2].map((count, index) => (
                    <div key={index} className="flex h-full flex-1 flex-col justify-end gap-1">
                      <div className="min-h-1 rounded-t-md bg-gradient-to-t from-sky-500 to-cyan-400" style={{ height: `${Math.max(count * 20, 4)}%` }} />
                      <span className="text-center text-[8px] text-slate-400">{['08', '10', '12', '14', '16'][index]}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50/70 via-white to-indigo-50/50 p-3.5">
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <p className="mb-0 text-[10px] font-bold text-slate-700">Latency profile</p>
                    <p className="mb-0 mt-0.5 text-[9px] text-slate-400">p50 22 ms · p95 29 ms</p>
                  </div>
                  <Activity className="size-4 text-violet-600" />
                </div>
                <svg viewBox="0 0 280 68" className="h-[74px] w-full rounded-xl bg-white/70 px-2 py-1" role="img" aria-label="Request latency chart showing a 22 millisecond median and 29 millisecond 95th percentile">
                  <path d="M6 52 C28 50, 36 44, 55 46 S85 37, 104 41 S135 30, 155 36 S184 25, 204 32 S236 18, 274 24" fill="none" stroke="#8b5cf6" strokeWidth="3" strokeLinecap="round" />
                  <path d="M6 52 C28 50, 36 44, 55 46 S85 37, 104 41 S135 30, 155 36 S184 25, 204 32 S236 18, 274 24 L274 62 L6 62Z" fill="url(#latency-fill)" opacity=".18" />
                  <defs><linearGradient id="latency-fill" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#8b5cf6" /><stop offset="1" stopColor="#8b5cf6" stopOpacity="0" /></linearGradient></defs>
                  <path d="M6 61 H274" stroke="#e2e8f0" strokeDasharray="3 4" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <section data-home-widget="api-activity" data-tone="mint" className="home-widget home-widget-wide">
          <div className="home-widget-heading flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="home-widget-icon"><Clock className="size-5" /></span>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">API Requests & Activity</h2>
                <p className="text-xs text-slate-500">Request volume and request-log entries across your Idrak agents</p>
              </div>
            </div>
            <span className="rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">5 requests · 5 successful</span>
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(230px,0.72fr)_minmax(0,1.5fr)]">
            <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/60 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="mb-0 text-[10px] font-bold text-slate-600">Requests this week</p>
                  <p className="mb-0 mt-1 font-display text-3xl font-bold text-slate-900">5</p>
                  <p className="mb-0 mt-0.5 text-[9px] text-slate-500">Compared with 0 last week</p>
                </div>
                <span className="rounded-full bg-white px-2 py-1 text-[9px] font-bold text-emerald-700 shadow-sm">100% success</span>
              </div>
              <div className="mt-5 flex h-[90px] items-end gap-2 border-b border-emerald-100 pb-2">
                {[0, 1, 0, 2, 0, 2, 0].map((count, index) => (
                  <div key={index} className="flex h-full flex-1 flex-col justify-end gap-1">
                    <div className="min-h-1 rounded-t-md bg-gradient-to-t from-emerald-500 to-teal-400" style={{ height: `${Math.max(count * 18, 3)}%` }} />
                    <span className="text-center text-[8px] text-slate-400">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[9px] text-slate-500">
                <span className="inline-flex items-center gap-1"><i className="size-2 rounded-sm bg-emerald-500" /> This week</span>
                <span className="inline-flex items-center gap-1"><i className="size-2 rounded-sm bg-slate-200" /> Last week</span>
              </div>
            </div>

            <div className="min-w-0 overflow-hidden rounded-2xl border border-slate-100 bg-white">
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                <div>
                  <h3 className="mb-0 text-xs font-bold text-slate-800">Recent API calls</h3>
                  <p className="mb-0 mt-0.5 text-[9px] text-slate-400">Sample request-log entries · mode from request metadata</p>
                </div>
                <span className="rounded-full bg-slate-50 px-2 py-1 text-[9px] font-semibold text-slate-500">Latest 5</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] text-left">
                  <thead className="bg-slate-50/80 text-[9px] font-bold uppercase tracking-wide text-slate-400">
                    <tr><th className="px-4 py-2">Time</th><th className="px-3 py-2">Endpoint</th><th className="px-3 py-2">Agent</th><th className="px-3 py-2">Mode</th><th className="px-3 py-2">Latency</th><th className="px-3 py-2">Status</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {requestLog.map((entry) => (
                      <tr key={`${entry.time}-${entry.session}`} className="text-[10px] text-slate-600">
                        <td className="whitespace-nowrap px-4 py-2.5 font-mono text-slate-400">{entry.time}</td>
                        <td className="px-3 py-2.5"><code className="font-mono font-semibold text-slate-700">{entry.method} {entry.path}</code></td>
                        <td className="max-w-[155px] truncate px-3 py-2.5">{entry.agent}</td>
                        <td className="px-3 py-2.5"><span className="rounded-full bg-rose-50 px-2 py-1 font-semibold text-rose-700">{entry.mode}</span></td>
                        <td className="whitespace-nowrap px-3 py-2.5 font-mono">{entry.latency}</td>
                        <td className="px-3 py-2.5"><span className="inline-flex items-center gap-1 font-bold text-emerald-700"><CircleCheck className="size-3" /> {entry.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* CARD 2: Core LLM & Telephony Endpoints (Tone: Violet) */}
        {/* ================================================================= */}
        <div data-home-widget="llm-endpoints" data-tone="violet" className="home-widget">
          <div className="home-widget-heading flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="home-widget-icon grid size-10 place-items-center rounded-xl bg-violet-100 text-violet-800 shadow-2xs">
                <Zap className="size-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">LLM & Voice Stream Endpoints</h2>
                <p className="text-xs text-slate-500">High-throughput completion routes</p>
              </div>
            </div>
            <span className="rounded-full bg-violet-100 text-violet-800 text-[10px] font-bold px-2 py-0.5">
            Agent APIs
            </span>
          </div>

          <div className="space-y-2.5">
            {[
              {
                method: 'POST',
                path: '/v1/chat/completions',
                desc: 'Text-agent response and orchestration route',
                reqs: '0',
                p95: '—',
                success: 'Ready'
              },
              {
                method: 'POST',
                path: '/v1/voice/session',
                desc: 'Start a voice session with a deployed Idrak agent',
                reqs: '2',
                p95: '22 ms',
                success: '100%'
              },
              {
                method: 'POST',
                path: '/v1/voice/turns',
                desc: 'Submit a voice turn and receive an agent response',
                reqs: '2',
                p95: '29 ms',
                success: '100%'
              },
              {
                method: 'POST',
                path: '/v1/agents/voice',
                desc: 'Route a voice request to the selected deployed agent',
                reqs: '1',
                p95: '18 ms',
                success: '100%'
              }
            ].map((ep, i) => (
              <div key={i} className="home-record-row p-3 flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="rounded bg-violet-100 text-violet-800 font-mono font-bold px-1.5 py-0.2 text-[9px]">
                      {ep.method}
                    </span>
                    <code className="font-mono font-bold text-slate-900 text-xs truncate">{ep.path}</code>
                  </div>
                  <button
                    onClick={() => copyPath(ep.path)}
                    className="p-1 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                  >
                    {copiedPath === ep.path ? <Check className="size-3 text-emerald-600" /> : <Copy className="size-3" />}
                  </button>
                </div>
                <p className="text-[11px] text-slate-500">{ep.desc}</p>
                <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[10px] text-slate-500">
                  <span>{ep.reqs} requests</span>
                  <span className="font-mono font-bold text-violet-700">P95: {ep.p95}</span>
                  <span className="font-bold text-emerald-600">{ep.success} success</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================================================================= */}
        {/* CARD 3: Knowledge Base & DataBot Endpoints (Tone: Mint) */}
        {/* ================================================================= */}
        <div data-home-widget="kb-endpoints" data-tone="mint" className="home-widget">
          <div className="home-widget-heading flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="home-widget-icon grid size-10 place-items-center rounded-xl bg-emerald-100 text-emerald-800 shadow-2xs">
                <Activity className="size-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">DataBot & RAG Endpoints</h2>
                <p className="text-xs text-slate-500">Vector search and SQL execution routes</p>
              </div>
            </div>
            <span className="rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5">
              API routes
            </span>
          </div>

          <div className="space-y-2.5">
            {[
              {
                method: 'GET',
                path: '/v1/kb/rag/query',
                desc: 'Cosine similarity semantic retrieval on indexed vector DB',
                reqs: '0',
                p95: '—',
                success: 'Ready'
              },
              {
                method: 'POST',
                path: '/v1/databot/sql/exec',
                desc: 'Guarded SQL execution against connected workspace data sources',
                reqs: '0',
                p95: '—',
                success: 'Ready'
              },
              {
                method: 'GET',
                path: '/v1/agents/status',
                desc: 'Agent deployment and runtime health status',
                reqs: '0',
                p95: '—',
                success: 'Ready'
              }
            ].map((ep, i) => (
              <div key={i} className="home-record-row p-3 flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="rounded bg-emerald-100 text-emerald-800 font-mono font-bold px-1.5 py-0.2 text-[9px]">
                      {ep.method}
                    </span>
                    <code className="font-mono font-bold text-slate-900 text-xs truncate">{ep.path}</code>
                  </div>
                  <button
                    onClick={() => copyPath(ep.path)}
                    className="p-1 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                  >
                    {copiedPath === ep.path ? <Check className="size-3 text-emerald-600" /> : <Copy className="size-3" />}
                  </button>
                </div>
                <p className="text-[11px] text-slate-500">{ep.desc}</p>
                <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[10px] text-slate-500">
                  <span>{ep.reqs} requests</span>
                  <span className="font-mono font-bold text-emerald-700">P95: {ep.p95}</span>
                  <span className="font-bold text-emerald-600">{ep.success} success</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================================================================= */}
        {/* CARD 4: Rate Limiting & Shield Throttles (Tone: Amber) */}
        {/* ================================================================= */}
        <div data-home-widget="rate-limits" data-tone="amber" className="home-widget">
          <div className="home-widget-heading flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="home-widget-icon grid size-10 place-items-center rounded-xl bg-amber-100 text-amber-800 shadow-2xs">
                <ShieldAlert className="size-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">Rate Limiting & Shield Rules</h2>
                <p className="text-xs text-slate-500">Protect API keys, agent runtimes, and data tools</p>
              </div>
            </div>
            <span className="rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5">
              Guardrails
            </span>
          </div>

          <div className="space-y-2.5">
            {[
              { rule: 'Workspace API rate limit', limit: '10,000 requests / minute', current: '5 sample requests', status: 'Healthy' },
              { rule: 'Active voice sessions', limit: '250 concurrent sessions', current: '4 unique sessions', status: 'Healthy' },
              { rule: 'DataBot query guard', limit: '5.0s execution timeout', current: '0 query executions', status: 'Ready' },
            ].map((r, i) => (
              <div key={i} className="home-record-row p-3 flex items-center justify-between gap-3 text-xs">
                <div>
                  <p className="font-bold text-slate-800">{r.rule}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Tier Cap: {r.limit}</p>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-amber-800 text-xs block">{r.current}</span>
                  <span className="text-[10px] font-bold text-emerald-600">{r.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================================================================= */}
        {/* CARD 5: Webhook Dispatchers (Tone: Pink) */}
        {/* ================================================================= */}
        <div data-home-widget="webhooks" data-tone="pink" className="home-widget">
          <div className="home-widget-heading flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="home-widget-icon grid size-10 place-items-center rounded-xl bg-rose-100 text-rose-800 shadow-2xs">
                <Send className="size-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">Outbound Webhook Dispatchers</h2>
                <p className="text-xs text-slate-500">Agent events, conversation outcomes, and workspace automation hooks</p>
              </div>
            </div>
            <span className="rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.5">
              3 Active Webhooks
            </span>
          </div>

          <div className="space-y-2.5">
            {[
              { target: 'Agent conversation completed', url: 'https://workspace.example.com/hooks/conversations', lastSent: '3m ago', success: '100%' },
              { target: 'Knowledge source indexed', url: 'https://workspace.example.com/hooks/knowledge', lastSent: '18m ago', success: '100%' },
              { target: 'Agent runtime alert', url: 'https://workspace.example.com/hooks/runtime', lastSent: '1h ago', success: '100%' },
            ].map((wh, i) => (
              <div key={i} className="home-record-row p-3 flex items-center justify-between gap-3 text-xs">
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-slate-800 truncate">{wh.target}</p>
                  <p className="font-mono text-[10px] text-slate-400 truncate mt-0.5">{wh.url}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] font-semibold text-slate-400 block">{wh.lastSent}</span>
                  <span className="font-mono font-bold text-emerald-600 text-[10px]">{wh.success} delivered</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

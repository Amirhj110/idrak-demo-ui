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
  Layers
} from 'lucide-react';
import { publicApiEndpoints } from '../../mockData';

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
            Real-time endpoint traffic tracking, P95 latency monitoring, and HTTP status code distribution
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

      {/* Grid of separate clean colorful section cards */}
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
                <p className="text-xs text-slate-500">KSA National Edge Router · TLS 1.3 Mandatory</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-2.5 py-1 text-[11px] font-bold text-sky-800 border border-sky-100">
              <span className="size-1.5 rounded-full bg-sky-500 animate-pulse" />
              99.98% Gateway SLA
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
            <div className="home-record-row p-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Total 24h Calls</span>
              <span className="font-display text-2xl font-bold text-slate-900 mt-1 block">189,400</span>
              <span className="text-[10px] text-emerald-600 font-bold mt-1 block">+12.4% vs 24h ago</span>
            </div>
            <div className="home-record-row p-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Global Success Rate</span>
              <span className="font-display text-2xl font-bold text-emerald-600 mt-1 block">99.96%</span>
              <span className="text-[10px] text-slate-400 mt-1 block">0.04% client validation errs</span>
            </div>
            <div className="home-record-row p-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Weighted P95 Latency</span>
              <span className="font-display text-2xl font-bold text-sky-700 mt-1 block">142 ms</span>
              <span className="text-[10px] text-emerald-600 font-bold mt-1 block">Within sub-200ms target</span>
            </div>
            <div className="home-record-row p-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Active TLS Sessions</span>
              <span className="font-display text-2xl font-bold text-slate-900 mt-1 block">1,842</span>
              <span className="text-[10px] text-slate-400 mt-1 block">ECDSA P-384 cipher</span>
            </div>
          </div>
        </div>

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
              Real-Time
            </span>
          </div>

          <div className="space-y-2.5">
            {[
              {
                method: 'POST',
                path: '/v1/chat/completions',
                desc: 'Chat completion stream with RAG grounding',
                reqs: '42,100',
                p95: '182 ms',
                success: '99.98%'
              },
              {
                method: 'POST',
                path: '/v1/voice/telephony/sip',
                desc: 'Bi-directional WebRTC SIP telephony RTP stream',
                reqs: '18,920',
                p95: '240 ms',
                success: '99.95%'
              },
              {
                method: 'POST',
                path: '/v1/audio/transcriptions',
                desc: 'Real-time Arabic STT with Najdi dialect acoustic model',
                reqs: '31,400',
                p95: '165 ms',
                success: '99.99%'
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
                  <span>{ep.reqs} reqs</span>
                  <span className="font-mono font-bold text-violet-700">P95: {ep.p95}</span>
                  <span className="font-bold text-emerald-600">{ep.success} SLA</span>
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
              Sub-100ms
            </span>
          </div>

          <div className="space-y-2.5">
            {[
              {
                method: 'GET',
                path: '/v1/kb/rag/query',
                desc: 'Cosine similarity semantic retrieval on indexed vector DB',
                reqs: '89,400',
                p95: '88 ms',
                success: '100.0%'
              },
              {
                method: 'POST',
                path: '/v1/databot/sql/exec',
                desc: 'Safe SQL execution against PayPeople views',
                reqs: '12,300',
                p95: '112 ms',
                success: '99.95%'
              },
              {
                method: 'GET',
                path: '/v1/hrms/sync/status',
                desc: 'Biometric & leave balance synchronization state',
                reqs: '8,200',
                p95: '45 ms',
                success: '100.0%'
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
                  <span>{ep.reqs} reqs</span>
                  <span className="font-mono font-bold text-emerald-700">P95: {ep.p95}</span>
                  <span className="font-bold text-emerald-600">{ep.success} SLA</span>
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
                <p className="text-xs text-slate-500">Anti-DDoS and tenant concurrency protection</p>
              </div>
            </div>
            <span className="rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5">
              Active Shields
            </span>
          </div>

          <div className="space-y-2.5">
            {[
              { rule: 'Burst Request Cap', limit: '5,000 req / minute', current: '1,420 req/min', status: 'Healthy' },
              { rule: 'Concurrent WebRTC Telephony Channels', limit: '250 channels', current: '68 channels', status: 'Healthy' },
              { rule: 'SQL DataBot Execution Timeout', limit: '5.0s hard cutoff', current: '0.12s avg', status: 'Optimal' },
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
                <p className="text-xs text-slate-500">Automated event streaming to external ERP & HRMS</p>
              </div>
            </div>
            <span className="rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.5">
              3 Active Webhooks
            </span>
          </div>

          <div className="space-y-2.5">
            {[
              { target: 'PayPeople Leave Event Consumer', url: 'https://api.paypeople.me/v2/webhooks/leave', lastSent: '3m ago', success: '100%' },
              { target: 'Enterprise Slack Alert Bot', url: 'https://hooks.slack.com/services/T01/B02/9a4...', lastSent: '18m ago', success: '100%' },
              { target: 'SAP HANA Audit Receiver', url: 'https://sap-gateway.bilytica.com/ingest', lastSent: '1h ago', success: '99.8%' },
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

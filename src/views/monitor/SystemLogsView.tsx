import React, { useState } from 'react';
import { 
  ScrollText, 
  Search, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Filter, 
  Shield, 
  Lock, 
  Eye, 
  ChevronDown, 
  ChevronRight,
  Terminal,
  Activity
} from 'lucide-react';

interface LogItem {
  id: string;
  time: string;
  level: 'INFO' | 'WARN' | 'ERROR';
  service: string;
  msg: string;
  code: number;
  details?: string;
}

export const SystemLogsView: React.FC = () => {
  const [levelFilter, setLevelFilter] = useState<'ALL' | 'INFO' | 'WARN' | 'ERROR'>('ALL');
  const [search, setSearch] = useState('');
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);

  const logs: LogItem[] = [
    { 
      id: 'l1', 
      time: '14:42:18 AST', 
      level: 'INFO', 
      service: 'telephony-gw', 
      msg: 'SIP trunk session initialized for agent Najla (Riyadh DC-1). 8kHz RTP established.', 
      code: 200,
      details: 'Session ID: sip_9921_ksa · Codec: G.711a / Opus 16kHz · Client IP: 10.42.1.84 (Sovereign VPC)'
    },
    { 
      id: 'l2', 
      time: '14:41:04 AST', 
      level: 'INFO', 
      service: 'databot-mssql',
      msg: 'Read-only query executed against dbo.vw_AgentUsageDaily. Rows: 420. Latency: 28ms.',
      code: 200,
      details: 'SQL Plan: Indexed lookup on AgentId · Read-only workspace view · Encryption: AlwaysEncrypted'
    },
    { 
      id: 'l3', 
      time: '14:38:52 AST', 
      level: 'WARN', 
      service: 'guardrails-pii', 
      msg: 'National ID masked per Saudi PDPL Art 14. Plaintext scrubbed before LLM dispatch.', 
      code: 499,
      details: 'Pattern matched: 10-digit Saudi Iqama / National ID · Replaced with [MASKED_SA_ID_4829] · Hash stored in secure KMS'
    },
    { 
      id: 'l4', 
      time: '14:35:10 AST', 
      level: 'INFO', 
      service: 'rag-embedder', 
      msg: 'Vector similarity cache hit on collection kb-platform (cosine score: 0.984).',
      code: 200,
      details: 'Query vector matched an Idrak agent deployment guide chunk · Embedding model: idrak-embed-v2-sovereign'
    },
    { 
      id: 'l5', 
      time: '14:30:00 AST', 
      level: 'INFO', 
      service: 'cluster-audit', 
      msg: 'Zero cross-border egress confirmed. All GPU tokens confined to KSA boundaries.', 
      code: 200,
      details: 'BGP Route Verification: AS201088 (Saudi Telecom) · External egress packets: 0 · Audit Hash: sha256_9f82c'
    },
    { 
      id: 'l6', 
      time: '14:24:12 AST', 
      level: 'INFO', 
      service: 'voice-synthesis', 
      msg: 'Synthesized 42 seconds of Najdi Arabic audio using sovereign neural checkpoint.', 
      code: 200,
      details: 'Voice ID: voice-najdi-female-01 · MOS Score Estimate: 4.85 · Sample Rate: 24kHz PCM'
    }
  ];

  const filtered = logs.filter(l => {
    const matchesLevel = levelFilter === 'ALL' || l.level === levelFilter;
    const matchesSearch = l.msg.toLowerCase().includes(search.toLowerCase()) || 
                          l.service.toLowerCase().includes(search.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-xl sm:text-2xl font-bold text-slate-900">System Event & Execution Logs</h1>
            <span className="rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5">
              Cryptographically Sealed
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Cryptographically sealed system event stream logging guardrail interventions and gateway transactions
          </p>
        </div>

        {/* Search & Filter pills */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search logs..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-hidden focus:border-amber-500 w-40 sm:w-48"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
            {(['ALL', 'INFO', 'WARN', 'ERROR'] as const).map(lvl => (
              <button
                key={lvl}
                onClick={() => setLevelFilter(lvl)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                  levelFilter === lvl ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of separate clean colorful section cards */}
      <div className="home-widget-grid">

        {/* ================================================================= */}
        {/* CARD 1: Sovereign Audit & Integrity Seal (Tone: Amber, Wide) */}
        {/* ================================================================= */}
        <div data-home-widget="audit-seal" data-tone="amber" className="home-widget home-widget-wide">
          <div className="home-widget-heading flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="home-widget-icon grid size-10 place-items-center rounded-xl bg-amber-100 text-amber-800 shadow-2xs">
                <ShieldCheck className="size-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">Saudi PDPL & Sovereign Audit Trail</h2>
                <p className="text-xs text-slate-500">Immutable ledger signed by Riyadh DC-1 Hardware Security Module</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-900 border border-amber-200/60">
              <Lock className="size-3 text-amber-600" />
              HSM Key: SHA256-Riyadh-Seal
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
            <div className="home-record-row p-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Logged Events Today</span>
              <span className="font-display text-2xl font-bold text-slate-900 mt-1 block">142,890</span>
              <span className="text-[10px] text-emerald-600 font-bold mt-1 block">100% written to disk</span>
            </div>
            <div className="home-record-row p-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">PII Redactions</span>
              <span className="font-display text-2xl font-bold text-amber-700 mt-1 block">2,410</span>
              <span className="text-[10px] text-slate-400 mt-1 block">Art 14 compliance</span>
            </div>
            <div className="home-record-row p-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Cross-Border Egress</span>
              <span className="font-display text-2xl font-bold text-emerald-600 mt-1 block">0.00 bytes</span>
              <span className="text-[10px] text-emerald-600 font-bold mt-1 block">Strictly in-country</span>
            </div>
            <div className="home-record-row p-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Audit Integrity</span>
              <span className="font-display text-2xl font-bold text-slate-900 mt-1 block">Verified</span>
              <span className="text-[10px] text-emerald-600 font-bold mt-1 block">No tamper detected</span>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* CARD 2: Live Log Stream (Tone: Violet, Wide) */}
        {/* ================================================================= */}
        <div data-home-widget="log-stream" data-tone="violet" className="home-widget home-widget-wide">
          <div className="home-widget-heading flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="home-widget-icon grid size-10 place-items-center rounded-xl bg-violet-100 text-violet-800 shadow-2xs">
                <ScrollText className="size-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">Execution Logs Feed</h2>
                <p className="text-xs text-slate-500">Click any row to inspect decrypted metadata</p>
              </div>
            </div>
            <span className="rounded-full bg-violet-100 text-violet-800 text-[10px] font-bold px-2 py-0.5">
              {filtered.length} Events Showing
            </span>
          </div>

          <div className="space-y-2">
            {filtered.map(log => {
              const isExpanded = expandedLogId === log.id;
              return (
                <div 
                  key={log.id} 
                  className={`home-record-row p-3.5 transition-all cursor-pointer ${
                    isExpanded ? 'border-violet-300 ring-1 ring-violet-200' : ''
                  }`}
                  onClick={() => setExpandedLogId(isExpanded ? null : log.id)}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      {isExpanded ? <ChevronDown className="size-3.5 text-violet-600 shrink-0" /> : <ChevronRight className="size-3.5 text-slate-400 shrink-0" />}
                      <span className="font-mono text-[10px] text-slate-400 shrink-0">{log.time}</span>
                      <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold shrink-0 ${
                        log.level === 'WARN' 
                          ? 'bg-amber-100 text-amber-800' 
                          : log.level === 'ERROR'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {log.level}
                      </span>
                      <span className="rounded bg-violet-50 text-violet-700 font-mono font-bold px-1.5 py-0.2 text-[9px] shrink-0">
                        {log.service}
                      </span>
                      <span className="text-slate-800 text-xs truncate font-medium">{log.msg}</span>
                    </div>
                    <span className="font-mono text-[10px] text-slate-400 shrink-0">HTTP {log.code}</span>
                  </div>

                  {isExpanded && log.details && (
                    <div className="mt-2.5 pt-2.5 border-t border-slate-100 pl-6 text-[11px] text-slate-600 font-mono bg-slate-50/70 p-2.5 rounded-xl">
                      <span className="text-violet-600 font-bold block mb-1">Payload & HSM Seal:</span>
                      {log.details}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ================================================================= */}
        {/* CARD 3: Guardrails & PII Sanitizer (Tone: Mint) */}
        {/* ================================================================= */}
        <div data-home-widget="guardrails" data-tone="mint" className="home-widget">
          <div className="home-widget-heading flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="home-widget-icon grid size-10 place-items-center rounded-xl bg-emerald-100 text-emerald-800 shadow-2xs">
                <Shield className="size-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">Saudi Guardrails Filter</h2>
                <p className="text-xs text-slate-500">Autonomous sanitization stats</p>
              </div>
            </div>
            <span className="rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5">
              100% In-Country
            </span>
          </div>

          <div className="space-y-2.5">
            {[
              { type: 'Saudi National ID / Iqama Regex', count: '1,420 scrubbed', status: 'Active' },
              { type: 'IBAN & Credit Card Numbers', count: '680 scrubbed', status: 'Active' },
              { type: 'Phone Numbers (+966)', count: '310 salted hash', status: 'Active' },
            ].map((g, i) => (
              <div key={i} className="home-record-row p-3 flex items-center justify-between gap-3 text-xs">
                <div>
                  <p className="font-bold text-slate-800">{g.type}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{g.count}</p>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  {g.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ================================================================= */}
        {/* CARD 4: Telephony SIP Audit (Tone: Cyan) */}
        {/* ================================================================= */}
        <div data-home-widget="sip-audit" data-tone="cyan" className="home-widget">
          <div className="home-widget-heading flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="home-widget-icon grid size-10 place-items-center rounded-xl bg-sky-100 text-sky-800 shadow-2xs">
                <Activity className="size-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">SIP Telephony Trunks</h2>
                <p className="text-xs text-slate-500">RTP handshakes & call signaling</p>
              </div>
            </div>
            <span className="rounded-full bg-sky-100 text-sky-800 text-[10px] font-bold px-2 py-0.5">
              0 Drops
            </span>
          </div>

          <div className="space-y-2.5">
            {[
              { route: 'Riyadh Telecom Primary SIP Gateway', codec: 'G.711a (8kHz)', status: '200 OK' },
              { route: 'Jeddah Telephony Edge POP', codec: 'Opus (16kHz Wideband)', status: '200 OK' },
              { route: 'Dammam Redundant Failover Switch', codec: 'G.711u standby', status: 'Standby' },
            ].map((s, i) => (
              <div key={i} className="home-record-row p-3 flex items-center justify-between gap-3 text-xs">
                <div>
                  <p className="font-bold text-slate-800">{s.route}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{s.codec}</p>
                </div>
                <span className="font-mono text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  {s.status}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

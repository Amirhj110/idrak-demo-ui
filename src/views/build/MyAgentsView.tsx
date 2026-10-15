import React, { useState } from 'react';
import { 
  Users, 
  LayoutGrid, 
  List, 
  Copy, 
  Check, 
  MessageSquare, 
  Settings, 
  Trash2, 
  Share2, 
  Info, 
  Plus, 
  Search, 
  Database,
  ExternalLink,
  Bot,
  PhoneCall,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { AgentItem, RoutePath } from '../../types';

interface MyAgentsViewProps {
  agents: AgentItem[];
  onNavigate: (route: RoutePath) => void;
  onSelectAgentDetails: (agent: AgentItem) => void;
  onOpenCreateAgent: () => void;
  onDeleteAgent: (id: string) => void;
}

export const MyAgentsView: React.FC<MyAgentsViewProps> = ({
  agents,
  onNavigate,
  onSelectAgentDetails,
  onOpenCreateAgent,
  onDeleteAgent
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'ALL' | 'Voice' | 'Chat' | 'Hybrid'>('ALL');

  const copyKey = (key: string, id: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const filtered = agents.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(search.toLowerCase()) || 
                          a.systemPromptSnippet.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === 'ALL' || a.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-xl sm:text-2xl font-bold text-slate-900">My Enterprise Agents</h1>
            <span className="rounded-full bg-violet-100 text-violet-800 text-[10px] font-bold px-2 py-0.5">
              {agents.length} Fleet Total
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Inventory of all configured enterprise agents, secure keys, and assigned RAG knowledge bases
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenCreateAgent}
            className="flex items-center gap-1.5 rounded-xl bg-violet-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-violet-700 shadow-sm shadow-violet-200 transition-all cursor-pointer"
          >
            <Plus className="size-3.5" />
            <span>Create Agent</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search agents by name, dialect, or prompt..."
            className="w-full rounded-2xl border border-slate-200 bg-white pl-10 pr-4 py-2 text-xs text-slate-800 outline-none focus:border-violet-500 shadow-2xs"
          />
        </div>

        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
          {(['ALL', 'Voice', 'Chat', 'Hybrid'] as const).map(t => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filterType === t ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Responsive Section Cards Grid */}
      <div className="home-widget-grid">

        {/* ================================================================= */}
        {/* CARD 1: Fleet Command Deck (Tone: Violet, Wide) */}
        {/* ================================================================= */}
        <div data-home-widget="fleet-deck" data-tone="violet" className="home-widget home-widget-wide">
          <div className="home-widget-heading flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="home-widget-icon grid size-10 place-items-center rounded-xl bg-violet-100 text-violet-800 shadow-2xs">
                <Bot className="size-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">Active Agent Fleet Fleet Readiness</h2>
                <p className="text-xs text-slate-500">Autonomous voice and chat representatives serving Saudi Arabia</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 border border-emerald-100">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              All Agents Live
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
            <div className="home-record-row p-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Active Live Agents</span>
              <span className="font-display text-2xl font-bold text-slate-900 mt-1 block">
                {agents.filter(a => a.status === 'LIVE').length}
              </span>
              <span className="text-[10px] text-emerald-600 font-bold mt-1 block">100% operational</span>
            </div>
            <div className="home-record-row p-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Total Invocations</span>
              <span className="font-display text-2xl font-bold text-violet-700 mt-1 block">124,800</span>
              <span className="text-[10px] text-slate-400 mt-1 block">Conversations handled</span>
            </div>
            <div className="home-record-row p-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Voice Synthesizer</span>
              <span className="font-display text-2xl font-bold text-slate-900 mt-1 block">182 ms</span>
              <span className="text-[10px] text-emerald-600 font-bold mt-1 block">Median turnaround</span>
            </div>
            <div className="home-record-row p-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Dialect Accuracy</span>
              <span className="font-display text-2xl font-bold text-emerald-600 mt-1 block">99.4%</span>
              <span className="text-[10px] text-slate-400 mt-1 block">Saudi colloquial</span>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* CARD 2: Voice Agents Section (Tone: Mint) */}
        {/* ================================================================= */}
        <div data-home-widget="voice-agents-card" data-tone="mint" className="home-widget">
          <div className="home-widget-heading flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="home-widget-icon grid size-10 place-items-center rounded-xl bg-emerald-100 text-emerald-800 shadow-2xs">
                <PhoneCall className="size-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">Voice Telephony Agents</h2>
                <p className="text-xs text-slate-500">Real-time WebRTC & SIP audio bots</p>
              </div>
            </div>
            <span className="rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5">
              Sub-200ms
            </span>
          </div>

          <div className="space-y-3">
            {filtered.filter(a => a.type === 'Voice' || a.type === 'Hybrid').map(agent => (
              <div 
                key={agent.id}
                className="home-record-row p-3.5 flex flex-col gap-2.5 transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="size-9 rounded-xl bg-emerald-100 text-emerald-800 grid place-items-center font-display font-bold text-sm shrink-0">
                      {agent.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-900 text-xs">{agent.name}</span>
                        <span className="text-[9px] font-bold bg-emerald-50 text-emerald-700 px-1.5 py-0.2 rounded">
                          {agent.status}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 font-arabic mt-0.5">{agent.nameAr} · {agent.language}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onSelectAgentDetails(agent)}
                      className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                      title="Inspect Agent"
                    >
                      <Info className="size-3.5" />
                    </button>
                    <button
                      onClick={() => copyKey(agent.apiKey, agent.id)}
                      className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                      title="Copy Key"
                    >
                      {copiedKey === agent.id ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  "{agent.systemPromptSnippet}"
                </p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-mono">{agent.conversationsCount.toLocaleString()} calls</span>
                  <button
                    onClick={() => onSelectAgentDetails(agent)}
                    className="text-emerald-700 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Configure Telephony</span>
                    <ArrowRight className="size-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================================================================= */}
        {/* CARD 3: Chat & Omnichannel Agents (Tone: Cyan) */}
        {/* ================================================================= */}
        <div data-home-widget="chat-agents-card" data-tone="cyan" className="home-widget">
          <div className="home-widget-heading flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="home-widget-icon grid size-10 place-items-center rounded-xl bg-sky-100 text-sky-800 shadow-2xs">
                <MessageSquare className="size-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">Chat & RAG Support Agents</h2>
                <p className="text-xs text-slate-500">Knowledge-grounded assistant fleet</p>
              </div>
            </div>
            <span className="rounded-full bg-sky-100 text-sky-800 text-[10px] font-bold px-2 py-0.5">
              Knowledge Connected
            </span>
          </div>

          <div className="space-y-3">
            {filtered.filter(a => a.type === 'Chat').map(agent => (
              <div 
                key={agent.id}
                className="home-record-row p-3.5 flex flex-col gap-2.5 transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="size-9 rounded-xl bg-sky-100 text-sky-800 grid place-items-center font-display font-bold text-sm shrink-0">
                      {agent.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-900 text-xs">{agent.name}</span>
                        <span className="text-[9px] font-bold bg-sky-50 text-sky-700 px-1.5 py-0.2 rounded">
                          {agent.status}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 font-arabic mt-0.5">{agent.nameAr} · {agent.language}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onSelectAgentDetails(agent)}
                      className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                      title="Inspect Agent"
                    >
                      <Info className="size-3.5" />
                    </button>
                    <button
                      onClick={() => copyKey(agent.apiKey, agent.id)}
                      className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                      title="Copy Key"
                    >
                      {copiedKey === agent.id ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  "{agent.systemPromptSnippet}"
                </p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-mono">{agent.conversationsCount.toLocaleString()} chats</span>
                  <button
                    onClick={() => onSelectAgentDetails(agent)}
                    className="text-sky-700 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Edit Prompt & Grounding</span>
                    <ArrowRight className="size-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================================================================= */}
        {/* CARD 4: Attached Knowledge Bases (Tone: Amber) */}
        {/* ================================================================= */}
        <div data-home-widget="attached-kb" data-tone="amber" className="home-widget">
          <div className="home-widget-heading flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="home-widget-icon grid size-10 place-items-center rounded-xl bg-amber-100 text-amber-800 shadow-2xs">
                <Database className="size-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">Assigned Knowledge Bases</h2>
                <p className="text-xs text-slate-500">Vector grounding collections per agent</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('/app/knowledge')}
              className="text-amber-800 text-xs font-bold hover:underline cursor-pointer"
            >
              Manage KB &rarr;
            </button>
          </div>

          <div className="space-y-2.5">
            {[
              { kb: 'PayPeople Saudi HR & Labor Law 2026', agent: 'Najla Voice & Tariq', docs: '48 indexed docs', score: '0.984' },
              { kb: 'Bilytica ERP Invoicing & Tax Ledger', agent: 'Databot Core', docs: '320 schema tables', score: '0.991' },
              { kb: 'Gulf Retail CSAT & Return Policies', agent: 'Salma Outbound', docs: '18 policy manuals', score: '0.975' },
            ].map((k, i) => (
              <div key={i} className="home-record-row p-3 flex items-center justify-between gap-3 text-xs">
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-slate-900 truncate">{k.kb}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5 truncate">Assigned to: {k.agent} · {k.docs}</p>
                </div>
                <span className="font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded text-[10px]">
                  {k.score} match
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ================================================================= */}
        {/* CARD 5: Rapid Agent Templates (Tone: Pink) */}
        {/* ================================================================= */}
        <div data-home-widget="templates" data-tone="pink" className="home-widget">
          <div className="home-widget-heading flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="home-widget-icon grid size-10 place-items-center rounded-xl bg-rose-100 text-rose-800 shadow-2xs">
                <Sparkles className="size-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">Pre-Trained Agent Blueprints</h2>
                <p className="text-xs text-slate-500">Launch ready-made sovereign Saudi agents</p>
              </div>
            </div>
            <span className="rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.5">
              1-Click Deploy
            </span>
          </div>

          <div className="space-y-2.5">
            {[
              { title: 'HR & Biometric Attendance Assistant', desc: 'Directly linked to PayPeople attendance API', tag: 'Voice + Chat' },
              { title: 'ZATCA Compliance & Invoicing Bot', desc: 'Pre-loaded with Saudi VAT & tax regulation', tag: 'Chat + SQL' },
              { title: 'Outbound SLA Debt Collections Voice', desc: 'Polite bilingual dialect recovery calls', tag: 'Voice Telephony' },
            ].map((tmpl, i) => (
              <div key={i} className="home-record-row p-3 flex items-center justify-between gap-3 text-xs">
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-slate-900 truncate">{tmpl.title}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5 truncate">{tmpl.desc}</p>
                </div>
                <button
                  onClick={onOpenCreateAgent}
                  className="px-2.5 py-1 rounded-lg bg-white border border-rose-200 text-rose-700 font-bold text-[10px] hover:bg-rose-50 transition-colors shadow-2xs shrink-0 cursor-pointer"
                >
                  Use Template
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

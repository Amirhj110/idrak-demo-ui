import React, { useState } from 'react';
import { 
  Bot, 
  Search, 
  Filter, 
  Copy, 
  Check, 
  MessageSquare, 
  PhoneCall, 
  Database, 
  Info, 
  Sparkles, 
  Plus, 
  Activity, 
  Clock, 
  CheckCircle2, 
  LayoutGrid, 
  List,
  Sliders,
  ArrowUpRight,
  Shield,
  Table2
} from 'lucide-react';
import { AgentItem, RoutePath } from '../../types';

interface HomeAgentsTabProps {
  agents: AgentItem[];
  onNavigate: (route: RoutePath) => void;
  onSelectAgentDetails: (agent: AgentItem) => void;
  onOpenVoiceCall: () => void;
  onOpenCreateAgent: () => void;
  onDeleteAgent: (id: string) => void;
}

export const HomeAgentsTab: React.FC<HomeAgentsTabProps> = ({
  agents,
  onNavigate,
  onSelectAgentDetails,
  onOpenVoiceCall,
  onOpenCreateAgent,
  onDeleteAgent
}) => {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'ALL' | 'Voice' | 'Chat' | 'Hybrid'>('ALL');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('table');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyKey = (val: string, id: string) => {
    navigator.clipboard.writeText(val);
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
    <div className="space-y-6">
      {/* Visualizations Section: 3 Elegant Home-Widget Cards with Tones & Multi-Layer Shadows */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Card 1: Latency vs SLA */}
        <div 
          data-tone="purple"
          className="home-widget"
        >
          <div className="home-widget-heading flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="home-widget-icon size-9 grid place-items-center rounded-xl">
                <Activity className="size-4.5" />
              </div>
              <div>
                <h3 className="font-display text-sm font-bold text-slate-900">Latency vs Resolution SLA</h3>
                <p className="text-[11px] text-slate-400">Response accuracy benchmark</p>
              </div>
            </div>
            <span className="text-[10px] text-emerald-800 font-bold bg-emerald-100/80 px-2 py-0.5 rounded-full">
              98.2% Avg SLA
            </span>
          </div>

          <div className="space-y-2.5 my-auto">
            {agents.slice(0, 4).map((a) => (
              <div key={a.id} className="text-xs">
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="font-semibold text-slate-700 truncate max-w-[170px]">{a.name}</span>
                  <span className="font-mono text-violet-700 font-bold">{a.metrics7d.avgLatencyMs}ms · {a.metrics7d.resolutionRate}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-violet-500 to-indigo-600 rounded-full" 
                    style={{ width: `${a.metrics7d.resolutionRate}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 2: Modality Breakdown */}
        <div 
          data-tone="mint"
          className="home-widget flex flex-col justify-between"
        >
          <div>
            <div className="home-widget-heading flex items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="home-widget-icon size-9 grid place-items-center rounded-xl">
                  <Bot className="size-4.5" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold text-slate-900">Modality Breakdown</h3>
                  <p className="text-[11px] text-slate-400">Fleet configuration across channels</p>
                </div>
              </div>
              <span className="text-[10px] text-slate-400 font-mono font-bold">6 Configured</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center my-2">
              <div className="p-2.5 rounded-2xl bg-violet-50/80 border border-violet-100/70">
                <span className="text-[10px] text-violet-700 font-bold block uppercase">Voice</span>
                <span className="font-display text-lg font-bold text-violet-900">2</span>
                <span className="text-[9px] text-violet-600 block">Sub-200ms</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-indigo-50/80 border border-indigo-100/70">
                <span className="text-[10px] text-indigo-700 font-bold block uppercase">Chat</span>
                <span className="font-display text-lg font-bold text-indigo-900">2</span>
                <span className="text-[9px] text-indigo-600 block">MSSQL/SAMA</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-emerald-50/80 border border-emerald-100/70">
                <span className="text-[10px] text-emerald-700 font-bold block uppercase">Hybrid</span>
                <span className="font-display text-lg font-bold text-emerald-900">2</span>
                <span className="text-[9px] text-emerald-600 block">Idrak workflows</span>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-slate-400 text-center mt-2">
            All models running on sovereign Riyadh DC-1 GPU cluster
          </p>
        </div>

        {/* Card 3: Traffic Volume Distribution */}
        <div 
          data-tone="cyan"
          className="home-widget flex flex-col justify-between"
        >
          <div>
            <div className="home-widget-heading flex items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="home-widget-icon size-9 grid place-items-center rounded-xl">
                  <PhoneCall className="size-4.5" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold text-slate-900">Call Volume Leader</h3>
                  <p className="text-[11px] text-slate-400">Peak agent load breakdown</p>
                </div>
              </div>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                18.4k Peak
              </span>
            </div>

            <div className="my-2 p-3 bg-slate-50/80 rounded-2xl border border-slate-100">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-bold text-slate-900">Najla (KSA Banking Voice)</span>
                <span className="font-mono text-violet-700 font-bold">42% total traffic</span>
              </div>
              <div className="flex items-end gap-1.5 h-7">
                {[30, 45, 60, 50, 75, 85, 100].map((h, i) => (
                  <div key={i} className="flex-1 bg-violet-400/80 rounded-xs" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={onOpenVoiceCall}
            className="w-full text-center text-xs font-bold text-violet-700 hover:text-violet-900 py-1"
          >
            Launch WebRTC Simulator Call &rarr;
          </button>
        </div>
      </div>

      {/* Filter, Search & View Controls Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search agents by name, model, dialect, or prompt..."
            className="w-full rounded-2xl border border-slate-200/90 bg-white pl-10 pr-4 py-2.5 text-xs text-slate-800 outline-none focus:border-violet-500 shadow-2xs"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Filter Pills */}
          <div className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-2xl text-xs border border-slate-200/70 shadow-2xs">
            {(['ALL', 'Voice', 'Chat', 'Hybrid'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  filterType === t ? 'bg-white text-violet-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Toggle Cards vs Table */}
          <div className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-2xl text-xs border border-slate-200/70 shadow-2xs">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-xl transition-all ${
                viewMode === 'table' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-400 hover:text-slate-700'
              }`}
              title="Tabular List"
            >
              <List className="size-4" />
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`p-1.5 rounded-xl transition-all ${
                viewMode === 'cards' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-400 hover:text-slate-700'
              }`}
              title="Card Grid"
            >
              <LayoutGrid className="size-4" />
            </button>
          </div>

          <button
            onClick={onOpenCreateAgent}
            className="flex items-center gap-1.5 rounded-xl bg-violet-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-violet-700 shadow-xs shadow-violet-200 transition-all active:scale-95"
          >
            <Plus className="size-3.5" />
            <span>Deploy Agent</span>
          </button>
        </div>
      </div>

      {/* Tabular View (Default, Exact Ref Quality) */}
      {viewMode === 'table' ? (
        <div 
          data-tone="purple"
          className="home-widget home-widget-wide"
          style={{ padding: '20px' }}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200/80 bg-slate-50/70 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3 px-3.5">Agent Profile</th>
                  <th className="py-3 px-3.5">Type</th>
                  <th className="py-3 px-3.5">Model Backbone</th>
                  <th className="py-3 px-3.5">Resolution SLA</th>
                  <th className="py-3 px-3.5">Conversations</th>
                  <th className="py-3 px-3.5">Secure Key</th>
                  <th className="py-3 px-3.5">Assigned KB</th>
                  <th className="py-3 px-3.5">Status</th>
                  <th className="py-3 px-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((agent) => (
                  <tr key={agent.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-3.5">
                      <div className="flex items-center gap-3">
                        <div className={`size-9 rounded-2xl ${agent.iconBg} font-display font-bold text-sm grid place-items-center shrink-0 border shadow-2xs`}>
                          {agent.iconText}
                        </div>
                        <div>
                          <p 
                            onClick={() => onSelectAgentDetails(agent)}
                            className="font-bold text-slate-900 hover:text-violet-700 cursor-pointer"
                          >
                            {agent.name}
                          </p>
                          <p className="text-[10px] text-slate-400 font-arabic">{agent.nameAr}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3.5">
                      <span className="rounded-full bg-slate-100 text-slate-700 px-2 py-0.5 text-[10px] font-semibold">
                        {agent.type}
                      </span>
                    </td>
                    <td className="py-3 px-3.5 font-mono text-[11px] text-slate-600">{agent.model}</td>
                    <td className="py-3 px-3.5">
                      <div className="space-y-1 w-24">
                        <div className="flex justify-between text-[10px] font-mono font-bold">
                          <span className="text-emerald-700">{agent.metrics7d.resolutionRate}%</span>
                          <span className="text-slate-400">{agent.metrics7d.avgLatencyMs}ms</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-500 to-violet-600 rounded-full"
                            style={{ width: `${agent.metrics7d.resolutionRate}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3.5 font-mono font-bold text-slate-900">{agent.conversationsCount.toLocaleString()}</td>
                    <td className="py-3 px-3.5">
                      <div className="flex items-center gap-1">
                        <code className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-mono text-[10px]">
                          {agent.apiKey.slice(0, 10)}...
                        </code>
                        <button
                          onClick={() => copyKey(agent.apiKey, agent.id)}
                          className="text-slate-400 hover:text-slate-700 p-1"
                          title="Copy API Key"
                        >
                          {copiedKey === agent.id ? <Check className="size-3 text-emerald-600" /> : <Copy className="size-3" />}
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-3.5">
                      {agent.knowledgeBaseName ? (
                        <span className="text-[11px] font-medium text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded truncate max-w-[130px] block">
                          {agent.knowledgeBaseName}
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-400 italic">None</span>
                      )}
                    </td>
                    <td className="py-3 px-3.5">
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 text-emerald-800 text-[9px] font-extrabold px-2 py-0.5">
                        <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        {agent.status}
                      </span>
                    </td>
                    <td className="py-3 px-3.5 text-right">
                      <div className="inline-flex items-center gap-1">
                        {agent.type === 'Voice' && (
                          <button
                            onClick={onOpenVoiceCall}
                            className="size-7 rounded-lg bg-violet-600 text-white grid place-items-center hover:bg-violet-700 shadow-2xs"
                            title="Launch Voice Simulator"
                          >
                            <PhoneCall className="size-3" />
                          </button>
                        )}
                        <button
                          onClick={() => onNavigate('/app/agents/ask')}
                          className="rounded-lg bg-violet-50 text-violet-700 px-2 py-1 text-xs font-semibold hover:bg-violet-100"
                        >
                          Chat
                        </button>
                        <button
                          onClick={() => onSelectAgentDetails(agent)}
                          className="rounded-lg px-2 py-1 text-slate-600 hover:bg-slate-100 text-xs font-semibold"
                        >
                          Details
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Card Grid View with Colorful Distinctive Icons */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((agent) => (
            <div
              key={agent.id}
              data-tone={agent.type === 'Voice' ? 'purple' : agent.type === 'Hybrid' ? 'mint' : 'cyan'}
              className="home-widget flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`size-11 rounded-2xl ${agent.iconBg} font-display font-bold text-lg grid place-items-center shrink-0 border shadow-2xs`}>
                      {agent.iconText}
                    </div>
                    <div>
                      <h3 
                        onClick={() => onSelectAgentDetails(agent)}
                        className="text-sm font-bold text-slate-900 hover:text-violet-700 cursor-pointer transition-colors"
                      >
                        {agent.name}
                      </h3>
                      <p className="text-[11px] text-slate-400 font-arabic">{agent.nameAr}</p>
                    </div>
                  </div>

                  <span className={`rounded-full px-2 py-0.5 text-[9px] font-extrabold uppercase ${
                    agent.status === 'LIVE' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {agent.status}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 mb-3">
                  <span className="rounded-md bg-slate-100 text-slate-700 px-2 py-0.5 text-[10px] font-bold">
                    {agent.type} Agent
                  </span>
                  <span className="rounded-md bg-violet-50 text-violet-800 px-2 py-0.5 text-[10px] font-medium">
                    {agent.language}
                  </span>
                  {agent.knowledgeBaseName && (
                    <span className="rounded-md bg-indigo-50 text-indigo-700 px-2 py-0.5 text-[10px] font-medium truncate max-w-[140px]">
                      📚 {agent.knowledgeBaseName.split(' ')[0]}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                  "{agent.systemPromptSnippet}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="text-[10px] text-slate-400">
                  <span className="font-mono text-slate-700 font-bold">{agent.conversationsCount.toLocaleString()}</span> chats · {agent.ageBadge}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onSelectAgentDetails(agent)}
                    className="rounded-xl border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:border-violet-300 hover:text-violet-700 transition-colors"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => onNavigate('/app/agents/ask')}
                    className="rounded-xl bg-violet-50 px-2.5 py-1.5 text-xs font-semibold text-violet-700 hover:bg-violet-100 transition-colors"
                  >
                    Chat
                  </button>
                  {agent.type === 'Voice' && (
                    <button
                      onClick={onOpenVoiceCall}
                      className="size-8 rounded-xl bg-violet-600 text-white grid place-items-center hover:bg-violet-700 shadow-2xs"
                      title="Launch Voice Simulator"
                    >
                      <PhoneCall className="size-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

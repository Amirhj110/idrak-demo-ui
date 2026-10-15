import React, { useState } from 'react';
import { 
  Bot, 
  Mic, 
  MessageSquare, 
  Sparkles, 
  Plus, 
  Play, 
  Table2, 
  Database, 
  ArrowUpRight, 
  Key, 
  FileText, 
  Search, 
  Filter, 
  Activity, 
  Clock, 
  CheckCircle2,
  ExternalLink,
  Layers
} from 'lucide-react';
import { AgentItem, RoutePath, DataBotItem } from '../../types';
import { initialDataBots } from '../../mockData';

interface AgentsStudioViewProps {
  agents: AgentItem[];
  onNavigate: (route: RoutePath) => void;
  onSelectAgentDetails: (agent: AgentItem) => void;
  onOpenCreateAgent: () => void;
  onOpenVoiceCall: () => void;
}

export const AgentsStudioView: React.FC<AgentsStudioViewProps> = ({
  agents,
  onNavigate,
  onSelectAgentDetails,
  onOpenCreateAgent,
  onOpenVoiceCall
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'LIVE' | 'DRAFT'>('ALL');
  const [typeFilter, setTypeFilter] = useState<'ALL' | 'Voice' | 'Chat' | 'Hybrid'>('ALL');
  const [kbFilter, setKbFilter] = useState<'ALL' | 'LINKED' | 'UNLINKED'>('ALL');

  const filteredAgents = agents.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          a.systemPromptSnippet.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || a.status === statusFilter;
    const matchesType = typeFilter === 'ALL' || a.type === typeFilter;
    const matchesKb = kbFilter === 'ALL' || (kbFilter === 'LINKED' ? !!a.knowledgeBaseId : !a.knowledgeBaseId);
    return matchesSearch && matchesStatus && matchesType && matchesKb;
  });

  const totalConversations = agents.reduce((acc, a) => acc + a.conversationsCount, 0);
  const liveCount = agents.filter(a => a.status === 'LIVE').length;
  const draftCount = agents.filter(a => a.status === 'DRAFT').length;
  const linkedKbCount = agents.filter(a => !!a.knowledgeBaseId).length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-xl font-bold text-slate-900">Agents Studio</h1>
            <span className="rounded-full bg-violet-100 text-violet-700 text-[10px] font-bold px-2 py-0.5">
              Core Studio
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Enterprise orchestration hub for voice, chat, and SQL DataBots grounded in sovereign knowledge
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onNavigate('/app/agents/ask')}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-2xs transition-all"
          >
            <MessageSquare className="size-3.5 text-violet-600" />
            <span>Ask Playground</span>
          </button>
          <button
            onClick={onOpenCreateAgent}
            className="flex items-center gap-1.5 rounded-xl bg-violet-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-violet-700 shadow-sm shadow-violet-200 transition-all active:scale-95"
          >
            <Plus className="size-3.5" />
            <span>Deploy Agent</span>
          </button>
        </div>
      </div>

      {/* Live Pulse Volume & Summary Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {/* Card 1: Total Agents */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Total Agents</span>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="font-display text-2xl font-bold text-slate-900">{agents.length}</span>
            <span className="text-[10px] text-emerald-600 font-bold">100% active</span>
          </div>
          <div className="mt-2 flex items-center gap-1 text-[10px] text-slate-400">
            <span>{liveCount} Live</span> · <span>{draftCount} Draft</span>
          </div>
        </div>

        {/* Card 2: Breakdown */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Modality</span>
          <div className="mt-1 space-y-0.5 text-xs font-bold text-slate-800">
            <div className="flex justify-between text-[11px]">
              <span className="text-violet-700">Voice</span>
              <span>2</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-indigo-700">Chat</span>
              <span>2</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-purple-700">Hybrid</span>
              <span>2</span>
            </div>
          </div>
        </div>

        {/* Card 3: Conversations Volume */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Conversations</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="font-display text-xl font-bold text-slate-900">{(totalConversations / 1000).toFixed(1)}k</span>
            <span className="text-[10px] text-emerald-600 font-bold">+18%</span>
          </div>
          {/* Mini Sparkline */}
          <div className="mt-2 flex items-end gap-1 h-4">
            {[30, 45, 60, 50, 75, 85, 100].map((h, i) => (
              <div key={i} className="flex-1 bg-violet-400 rounded-xs" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>

        {/* Card 4: KB Linked Ratio */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">KB Linking</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="font-display text-xl font-bold text-slate-900">
              {Math.round((linkedKbCount / agents.length) * 100)}%
            </span>
            <span className="text-[10px] text-slate-400">ratio</span>
          </div>
          <span className="text-[10px] text-slate-400 block mt-2">{linkedKbCount} of {agents.length} grounded</span>
        </div>

        {/* Card 5: Avg Response Quality */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Avg Quality</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="font-display text-xl font-bold text-emerald-600">4.89</span>
            <span className="text-[10px] text-slate-400">/ 5.0</span>
          </div>
          <span className="text-[10px] text-slate-400 block mt-2">CSAT Evaluator score</span>
        </div>

        {/* Card 6: Voice Latency P95 */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Voice P95</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="font-display text-xl font-bold text-violet-700">185 ms</span>
          </div>
          <span className="text-[10px] text-emerald-600 block mt-2 font-medium">Sub-200ms Target Met</span>
        </div>

        {/* Card 7: Live Pulse */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-2xs">
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            <span className="size-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Live Pulse</span>
          </div>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="font-display text-xl font-bold text-slate-900">142</span>
            <span className="text-[10px] text-slate-400">req/m</span>
          </div>
          <span className="text-[10px] text-slate-400 block mt-2 font-mono">Riyadh GPU Cluster</span>
        </div>
      </div>

      {/* Quick Action Shortcuts (As Specified) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-1 shrink-0">Quick Actions:</span>
        {[
          { label: 'Ask any agent', icon: MessageSquare, action: () => onNavigate('/app/agents/ask') },
          { label: 'Talk to your KB', icon: Database, action: () => onNavigate('/app/knowledge') },
          { label: 'Templates', icon: Layers, action: () => onNavigate('/app/agents/my-agents') },
          { label: 'Deploy agent', icon: Plus, action: onOpenCreateAgent },
          { label: 'API & Keys', icon: Key, action: () => onNavigate('/app/settings/api-keys') },
          { label: 'Knowledge bases', icon: FileText, action: () => onNavigate('/app/knowledge') },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={idx}
              onClick={item.action}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200/80 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-violet-300 hover:bg-violet-50/50 hover:text-violet-700 transition-all shrink-0 shadow-2xs"
            >
              <Icon className="size-3.5 text-violet-600" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Data Bots Section (MSSQL Views Integration — As Specified) */}
      <div className="rounded-3xl border border-slate-200/80 bg-gradient-to-r from-violet-50/50 via-white to-indigo-50/30 p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="size-9 rounded-xl bg-violet-600 text-white grid place-items-center shadow-xs shadow-violet-200">
              <Table2 className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-base font-bold text-slate-900">Data Bots (SQL-Connected)</h3>
                <span className="rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.2">
                  MSSQL Connected
                </span>
              </div>
              <p className="text-xs text-slate-500">Autonomous bots executing queries directly against designated database views</p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('/app/databot')}
            className="flex items-center gap-1.5 text-xs font-bold text-violet-700 hover:text-violet-900 self-start sm:self-center"
          >
            <span>Open DataBot Studio</span>
            <ArrowUpRight className="size-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {initialDataBots.map((bot) => (
            <div
              key={bot.id}
              onClick={() => onNavigate('/app/databot')}
              className="group p-4 rounded-2xl border border-slate-200 bg-white hover:border-violet-300 hover:shadow-xs transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-900 group-hover:text-violet-700 transition-colors">
                  {bot.name}
                </span>
                <span className="font-mono text-[9px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                  {bot.databaseEngine}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 line-clamp-2">{bot.description}</p>
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                <code className="text-violet-600 font-mono text-[10px] truncate max-w-[150px]">{bot.connectedView}</code>
                <span>{bot.lastQueryTime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Multi-Tier Advanced Filter & Search Controls */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search agents by name, prompt snippets, or model..."
            className="w-full rounded-2xl border border-slate-200 bg-white pl-10 pr-4 py-2 text-xs text-slate-800 outline-none focus:border-violet-500 shadow-2xs"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Status Filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
            {(['ALL', 'LIVE', 'DRAFT'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                  statusFilter === s ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
            {(['ALL', 'Voice', 'Chat', 'Hybrid'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                  typeFilter === t ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* KB Filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
            {(['ALL', 'LINKED', 'UNLINKED'] as const).map((kb) => (
              <button
                key={kb}
                onClick={() => setKbFilter(kb)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                  kbFilter === kb ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {kb === 'LINKED' ? 'KB Grounded' : kb}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Agents Fleet Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAgents.map((agent) => (
          <div
            key={agent.id}
            className="group rounded-3xl border border-slate-200/80 bg-white p-5 shadow-2xs hover:border-violet-300 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="size-11 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white font-display text-lg font-bold grid place-items-center shadow-xs shadow-violet-200">
                    {agent.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-violet-700 transition-colors">
                      {agent.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-arabic">{agent.nameAr}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className={`rounded-full px-2 py-0.5 text-[9px] font-extrabold uppercase ${
                    agent.status === 'LIVE' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {agent.status}
                  </span>
                </div>
              </div>

              {/* Modality & Language Badges */}
              <div className="flex flex-wrap items-center gap-1.5 mb-3">
                <span className="rounded-md bg-violet-50 text-violet-800 px-2 py-0.5 text-[10px] font-bold">
                  {agent.type} Agent
                </span>
                <span className="rounded-md bg-slate-100 text-slate-700 px-2 py-0.5 text-[10px] font-medium">
                  {agent.language}
                </span>
                {agent.knowledgeBaseName && (
                  <span className="rounded-md bg-indigo-50 text-indigo-700 px-2 py-0.5 text-[10px] font-medium truncate max-w-[160px]">
                    📚 {agent.knowledgeBaseName.split(' ')[0]} RAG
                  </span>
                )}
              </div>

              {/* Snippet */}
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                "{agent.systemPromptSnippet}"
              </p>
            </div>

            {/* Bottom Meta & Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
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
                    <Mic className="size-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

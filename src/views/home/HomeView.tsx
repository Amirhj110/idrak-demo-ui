import React, { useState } from 'react';
import { LayoutDashboard, Bot, Database } from 'lucide-react';
import { HomeTopTab, AgentItem, KBCollection, KBDocument, RoutePath } from '../../types';
import { HomeOverviewTab } from './HomeOverviewTab';
import { HomeAgentsTab } from './HomeAgentsTab';
import { HomeKnowledgeTab } from './HomeKnowledgeTab';

interface HomeViewProps {
  agents: AgentItem[];
  collections: KBCollection[];
  onNavigate: (route: RoutePath) => void;
  onSelectAgentDetails: (agent: AgentItem) => void;
  onOpenVoiceCall: () => void;
  onOpenCreateAgent: () => void;
  onDeleteAgent: (id: string) => void;
  onCreateCollection: (col: KBCollection) => void;
  onAddDocument: (colId: string, doc: KBDocument) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  agents,
  collections,
  onNavigate,
  onSelectAgentDetails,
  onOpenVoiceCall,
  onOpenCreateAgent,
  onDeleteAgent,
  onCreateCollection,
  onAddDocument
}) => {
  const [activeTab, setActiveTab] = useState<HomeTopTab>('overview');

  const topTabs = [
    { id: 'overview' as HomeTopTab, label: 'Overview', icon: LayoutDashboard },
    { id: 'agents' as HomeTopTab, label: 'Agents', icon: Bot, count: agents.length },
    { id: 'knowledge' as HomeTopTab, label: 'Knowledge Base', icon: Database, count: collections.length },
  ];

  return (
    <div className="mx-auto max-w-[1680px] space-y-5">
      <header className="flex flex-col gap-4 border-b border-slate-200/75 pb-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-2 text-[10px] font-medium text-slate-400">
            <span>Workspace</span><span className="text-slate-300">/</span>
            <span className="text-slate-600">{topTabs.find(tab => tab.id === activeTab)?.label}</span>
            <span className="rounded-full bg-violet-50 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-violet-700">Demo</span>
          </div>
          <h1 className="font-display text-[27px] font-semibold tracking-tight text-slate-900 sm:text-[30px]">
            {activeTab === 'overview' ? 'Good morning, Amir' : activeTab === 'agents' ? 'Your agents' : 'Knowledge base'}
          </h1>
          <p className="mb-0 mt-1 flex flex-wrap items-center gap-2 text-[11px] text-slate-500 sm:text-xs">
            <span>{new Intl.DateTimeFormat('en', { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date())}</span>
            <span className="text-slate-300">·</span>
            <span className="inline-flex items-center gap-1.5 font-medium text-slate-600">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              Sovereign workspace operational
            </span>
          </p>
        </div>

        <nav
          aria-label="Home views"
          className="flex w-fit max-w-full items-center gap-1 overflow-x-auto rounded-2xl border border-slate-200/70 bg-slate-100/80 p-1 shadow-sm"
        >
          {topTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-[10px] font-semibold transition sm:px-3.5 sm:text-[11px] ${
                  isActive
                    ? 'bg-white text-violet-800 shadow-sm ring-1 ring-slate-900/5'
                    : 'text-slate-500 hover:bg-white/60 hover:text-slate-800'
                }`}
              >
                <Icon className={`size-3.5 ${isActive ? 'text-violet-600' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold ${
                    isActive ? 'bg-violet-100 text-violet-800' : 'bg-slate-200/70 text-slate-500'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </header>

      {/* Dynamic Tab Body */}
      {activeTab === 'overview' && (
        <HomeOverviewTab
          agents={agents}
          collections={collections}
          onNavigate={onNavigate}
          onSelectAgentDetails={onSelectAgentDetails}
          onOpenVoiceCall={onOpenVoiceCall}
          onOpenCreateAgent={onOpenCreateAgent}
        />
      )}

      {activeTab === 'agents' && (
        <HomeAgentsTab
          agents={agents}
          onNavigate={onNavigate}
          onSelectAgentDetails={onSelectAgentDetails}
          onOpenVoiceCall={onOpenVoiceCall}
          onOpenCreateAgent={onOpenCreateAgent}
          onDeleteAgent={onDeleteAgent}
        />
      )}

      {activeTab === 'knowledge' && (
        <HomeKnowledgeTab
          collections={collections}
          onCreateCollection={onCreateCollection}
          onAddDocument={onAddDocument}
        />
      )}
    </div>
  );
};

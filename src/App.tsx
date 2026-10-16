import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { VoiceCallModal } from './components/VoiceCallModal';
import { CreateAgentModal } from './components/CreateAgentModal';
import { CommandPalette } from './components/CommandPalette';
import { LoginModal } from './components/LoginModal';

import { HomeView } from './views/home/HomeView';

// BUILD Views
import { AgentsStudioView } from './views/build/AgentsStudioView';
import { MyAgentsView } from './views/build/MyAgentsView';
import { AgentDetailsView } from './views/build/AgentDetailsView';
import { AskAgentPlaygroundView } from './views/build/AskAgentPlaygroundView';
import { KnowledgeBaseManagementView } from './views/build/KnowledgeBaseManagementView';
import { DataBotView } from './views/build/DataBotView';
import { VoicesView } from './views/build/VoicesView';

// CREATIVE Views
import { LiveSTTView } from './views/creative/LiveSTTView';
import { TTSView } from './views/creative/TTSView';

// MONITOR Views
import { ConversationsView } from './views/monitor/ConversationsView';
import { AnalyticsView } from './views/monitor/AnalyticsView';
import { PublicApiMonitorView } from './views/monitor/PublicApiMonitorView';
import { SystemLogsView } from './views/monitor/SystemLogsView';
import { SpendTrackerView } from './views/monitor/SpendTrackerView';

// SETTINGS Views
import { IntegrationsView } from './views/settings/IntegrationsView';
import { ApiKeysManagementView } from './views/settings/ApiKeysManagementView';
import { SystemStatusView } from './views/settings/SystemStatusView';

import { currentUser, initialAgents, kbCollections } from './mockData';
import { RoutePath, AgentItem, KBCollection, KBDocument } from './types';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [user, setUser] = useState(currentUser);
  const [currentRoute, setCurrentRoute] = useState<RoutePath>('/app/home');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Active agent selected for Details Sub-Tabs
  const [selectedAgent, setSelectedAgent] = useState<AgentItem>(initialAgents[0]);

  // Modals state
  const [isVoiceCallOpen, setIsVoiceCallOpen] = useState<boolean>(false);
  const [isCreateAgentOpen, setIsCreateAgentOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  // Data state
  const [agents, setAgents] = useState<AgentItem[]>(initialAgents);
  const [collections, setCollections] = useState<KBCollection[]>(kbCollections);

  // Global keyboard shortcut for Command Palette (⌘K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (route: RoutePath) => {
    setCurrentRoute(route);
    setMobileMenuOpen(false);
  };

  const handleOpenAgentDetails = (agent: AgentItem) => {
    setSelectedAgent(agent);
    setCurrentRoute('/app/agents/details');
  };

  const handleCreateAgent = (newAgent: AgentItem) => {
    setAgents(prev => [newAgent, ...prev]);
    setSelectedAgent(newAgent);
    setCurrentRoute('/app/agents/my-agents');
  };

  const handleUpdateAgent = (updated: AgentItem) => {
    setAgents(prev => prev.map(a => a.id === updated.id ? updated : a));
    setSelectedAgent(updated);
  };

  const handleDeleteAgent = (id: string) => {
    setAgents(prev => prev.filter(a => a.id !== id));
  };

  const handleLogin = (email: string) => {
    setUser({
      ...currentUser,
      email: email || 'amir@test.com'
    });
    setIsAuthenticated(true);
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowLoginModal(true);
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar (Desktop sticky & Mobile drawer) */}
      <div className={`md:sticky md:top-0 md:h-screen z-50 ${
        mobileMenuOpen ? 'fixed inset-y-0 left-0 flex' : 'hidden md:flex'
      }`}>
        <Sidebar
          currentRoute={currentRoute}
          onNavigate={handleNavigate}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          user={user}
          onOpenVoiceCall={() => setIsVoiceCallOpen(true)}
          onLogout={handleLogout}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        {/* PayPeople Styled Global Header */}
        <Header
          user={user}
          currentRoute={currentRoute}
          onNavigate={handleNavigate}
          onOpenCreateAgent={() => setIsCreateAgentOpen(true)}
          onOpenVoiceCall={() => setIsVoiceCallOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onLogout={handleLogout}
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
        />

        {/* Dynamic Multi-Route Content Router */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          {/* PRIMARY HOME TAB PAGE (3 Top Tabs: Overview, Agents, Knowledge Base) */}
          {(currentRoute === '/app/home' || currentRoute === '/app/agents') && (
            <HomeView
              agents={agents}
              collections={collections}
              onNavigate={handleNavigate}
              onSelectAgentDetails={handleOpenAgentDetails}
              onOpenVoiceCall={() => setIsVoiceCallOpen(true)}
              onOpenCreateAgent={() => setIsCreateAgentOpen(true)}
              onDeleteAgent={handleDeleteAgent}
              onCreateCollection={(col: KBCollection) => setCollections(prev => [col, ...prev])}
              onAddDocument={(colId: string, doc: KBDocument) => {
                setCollections(prev => prev.map(c => {
                  if (c.id === colId) {
                    return {
                      ...c,
                      totalItems: c.totalItems + 1,
                      chunksCount: c.chunksCount + doc.chunks,
                      documents: [doc, ...c.documents]
                    };
                  }
                  return c;
                }));
              }}
            />
          )}

          {currentRoute === '/app/agents/my-agents' && (
            <MyAgentsView
              agents={agents}
              onNavigate={handleNavigate}
              onSelectAgentDetails={handleOpenAgentDetails}
              onOpenCreateAgent={() => setIsCreateAgentOpen(true)}
              onDeleteAgent={handleDeleteAgent}
            />
          )}

          {currentRoute === '/app/agents/details' && (
            <AgentDetailsView
              agent={selectedAgent}
              onBack={() => setCurrentRoute('/app/agents')}
              onNavigate={handleNavigate}
              onOpenVoiceCall={() => setIsVoiceCallOpen(true)}
              onUpdateAgent={handleUpdateAgent}
            />
          )}

          {currentRoute === '/app/agents/ask' && (
            <AskAgentPlaygroundView agents={agents} onNavigate={handleNavigate} />
          )}

          {currentRoute === '/app/knowledge' && (
            <KnowledgeBaseManagementView />
          )}

          {currentRoute === '/app/databot' && (
            <DataBotView />
          )}

          {currentRoute === '/app/voices' && (
            <VoicesView onOpenVoiceCall={() => setIsVoiceCallOpen(true)} />
          )}

          {/* 2. CREATIVE Studio Views */}
          {currentRoute === '/app/creative/stt' && (
            <LiveSTTView />
          )}

          {currentRoute === '/app/creative/tts' && (
            <TTSView />
          )}

          {/* 3. MONITOR Views */}
          {currentRoute === '/app/monitor/conversations' && (
            <ConversationsView />
          )}

          {currentRoute === '/app/monitor/analytics' && (
            <AnalyticsView />
          )}

          {currentRoute === '/app/monitor/public-api' && (
            <PublicApiMonitorView />
          )}

          {currentRoute === '/app/monitor/logs' && (
            <SystemLogsView />
          )}

          {currentRoute === '/app/monitor/spend' && (
            <SpendTrackerView />
          )}

          {/* 4. SETTINGS & GATEWAY Views */}
          {currentRoute === '/app/settings/integrations' && (
            <IntegrationsView />
          )}

          {currentRoute === '/app/settings/api-keys' && (
            <ApiKeysManagementView />
          )}

          {currentRoute === '/app/settings/status' && (
            <SystemStatusView />
          )}
        </main>
      </div>

      {/* Global Interactive Modals */}
      <VoiceCallModal
        isOpen={isVoiceCallOpen}
        onClose={() => setIsVoiceCallOpen(false)}
        agents={agents}
        selectedAgentId={selectedAgent.id}
        onNavigate={handleNavigate}
      />

      <CreateAgentModal
        isOpen={isCreateAgentOpen}
        onClose={() => setIsCreateAgentOpen(false)}
        onCreateAgent={handleCreateAgent}
      />

      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
        onOpenVoiceCall={() => setIsVoiceCallOpen(true)}
        onOpenCreateAgent={() => setIsCreateAgentOpen(true)}
      />

      <LoginModal
        isOpen={showLoginModal || !isAuthenticated}
        onLogin={handleLogin}
      />
    </div>
  );
}

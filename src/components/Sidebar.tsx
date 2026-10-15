import React from 'react';
import { 
  LayoutDashboard, 
  Bot, 
  Users, 
  MessageSquare, 
  Database, 
  Table2, 
  Mic, 
  FileAudio, 
  AudioWaveform, 
  MessagesSquare, 
  BarChart3, 
  Activity, 
  ScrollText, 
  DollarSign, 
  Puzzle, 
  Key, 
  ShieldCheck, 
  ChevronLeft, 
  PhoneCall, 
  LogOut,
  Sparkles
} from 'lucide-react';
import { RoutePath, UserProfile } from '../types';

interface SidebarProps {
  currentRoute: RoutePath;
  onNavigate: (route: RoutePath) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  user: UserProfile;
  onOpenVoiceCall: () => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentRoute,
  onNavigate,
  collapsed,
  onToggleCollapse,
  user,
  onOpenVoiceCall,
  onLogout
}) => {
  const workspaceItems = [
    { route: '/app/agents/ask' as RoutePath, label: 'Ask Agent (Chat)', icon: MessageSquare, color: 'text-violet-500' },
    { route: '/app/agents/my-agents' as RoutePath, label: 'My Agents Fleet', icon: Users, color: 'text-emerald-500' },
    { route: '/app/databot' as RoutePath, label: 'DataBot (SQL)', icon: Table2, color: 'text-sky-500' },
    { route: '/app/voices' as RoutePath, label: 'Voices & Telephony', icon: Mic, color: 'text-rose-500' },
  ];

  const creativeItems = [
    { route: '/app/creative/stt' as RoutePath, label: 'Live STT Studio', icon: AudioWaveform, color: 'text-cyan-500' },
    { route: '/app/creative/tts' as RoutePath, label: 'Text to Speech', icon: FileAudio, color: 'text-amber-500' },
  ];

  const monitorItems = [
    { route: '/app/monitor/conversations' as RoutePath, label: 'Conversations', icon: MessagesSquare, color: 'text-indigo-500' },
    { route: '/app/monitor/analytics' as RoutePath, label: 'Analytics', icon: BarChart3, color: 'text-blue-500' },
    { route: '/app/monitor/public-api' as RoutePath, label: 'Public API', icon: Activity, color: 'text-teal-500' },
    { route: '/app/monitor/logs' as RoutePath, label: 'System Logs', icon: ScrollText, color: 'text-orange-500' },
    { route: '/app/monitor/spend' as RoutePath, label: 'Spend Tracker', icon: DollarSign, color: 'text-lime-600' },
  ];

  const settingsItems = [
    { route: '/app/settings/integrations' as RoutePath, label: 'Integrations', icon: Puzzle, color: 'text-fuchsia-500' },
    { route: '/app/settings/api-keys' as RoutePath, label: 'API & Keys', icon: Key, color: 'text-yellow-600' },
    { route: '/app/settings/status' as RoutePath, label: 'System Status', icon: ShieldCheck, color: 'text-emerald-600' },
  ];

  return (
    <aside 
      className={`relative z-30 flex flex-col h-screen border-r border-slate-200/90 bg-white transition-all duration-200 ease-out select-none ${
        collapsed ? 'w-[72px]' : 'w-[256px]'
      }`}
    >
      {/* Collapse Toggle Button (PayPeople Signature) */}
      <button
        onClick={onToggleCollapse}
        aria-label="Toggle menu"
        className="absolute -right-3 top-5 z-40 hidden md:grid size-6 place-items-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition-all duration-150 hover:scale-110 hover:border-violet-300 hover:text-violet-600 focus:outline-none"
      >
        <ChevronLeft className={`size-3.5 transition-transform duration-200 ${collapsed ? 'rotate-180' : ''}`} />
      </button>

      {/* Brand Header */}
      <div className={`flex h-16 shrink-0 items-center px-4 border-b border-slate-100 ${collapsed ? 'justify-center px-0' : 'justify-between'}`}>
        <div 
          className="flex items-center gap-3 overflow-hidden cursor-pointer" 
          onClick={() => onNavigate('/app/home')}
        >
          <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-tr from-violet-600 via-purple-600 to-indigo-600 font-display text-white font-bold text-base shadow-sm shadow-violet-200">
            <span>I</span>
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1 leading-tight">
              <div className="flex items-center gap-1.5">
                <span className="font-display text-sm font-bold text-slate-900 tracking-tight">Idrak</span>
                <span className="rounded-full bg-violet-100 px-1.5 py-0.2 text-[9px] font-bold text-violet-700 uppercase tracking-wider">Demo</span>
              </div>
              <p className="text-[10px] font-medium text-slate-400 truncate">Bilytica Global · Enterprise AI</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Action Test Call */}
      <div className={`p-2.5 pb-1 ${collapsed ? 'px-2' : 'px-3'}`}>
        <button
          onClick={onOpenVoiceCall}
          className={`group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-xs shadow-violet-200 hover:from-violet-700 hover:to-indigo-700 transition-all text-xs font-semibold active:scale-[0.98] ${
            collapsed ? 'size-9 p-0 mx-auto' : 'w-full py-2 px-3'
          }`}
          title="Launch Live Telephony Simulation"
        >
          <PhoneCall className="size-3.5 shrink-0 animate-pulse text-violet-200" />
          {!collapsed && (
            <div className="flex items-center justify-between w-full">
              <span>Voice Simulator</span>
              <span className="rounded bg-white/20 px-1 py-0.2 text-[9px] text-white font-mono">WebRTC</span>
            </div>
          )}
        </button>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto px-2.5 py-2 space-y-4 [scrollbar-width:none]">
        {/* HOME AT VERY TOP (Like in Ref UI: 3 Top Tabs: Overview, Agents, KB) */}
        <div>
          <button
            onClick={() => onNavigate('/app/home')}
            title={collapsed ? 'Home (Overview · Agents · KB)' : undefined}
            className={`group relative flex w-full items-center rounded-xl text-xs font-semibold transition-all ${
              collapsed ? 'h-10 justify-center px-0' : 'h-9.5 justify-start gap-2.5 px-3'
            } ${
              currentRoute === '/app/home' || currentRoute === '/app/agents'
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-xs shadow-violet-200'
                : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <LayoutDashboard className={`size-4 shrink-0 ${
              currentRoute === '/app/home' || currentRoute === '/app/agents' ? 'text-white' : 'text-violet-600'
            }`} />
            {!collapsed && (
              <div className="flex items-center justify-between flex-1">
                <span className="font-bold text-[13px]">Home</span>
                <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider ${
                  currentRoute === '/app/home' || currentRoute === '/app/agents' ? 'bg-white/20 text-white' : 'bg-violet-100 text-violet-700'
                }`}>
                  3 Hubs
                </span>
              </div>
            )}
          </button>
        </div>

        {/* Workspace */}
        <div>
          {!collapsed && (
            <p className="mb-1 px-2.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Workspace
            </p>
          )}
          <div className="space-y-0.5">
            {workspaceItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentRoute === item.route;
              return (
                <button
                  key={item.route}
                  onClick={() => onNavigate(item.route)}
                  title={collapsed ? item.label : undefined}
                  className={`group relative flex w-full items-center rounded-lg text-xs font-medium transition-all ${
                    collapsed ? 'h-9 justify-center px-0' : 'h-8.5 justify-start gap-2.5 px-2.5'
                  } ${
                    isActive
                      ? 'bg-violet-50 text-violet-900 font-semibold'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-r-full bg-violet-600" />
                  )}
                  <Icon className={`size-4 shrink-0 transition-colors ${isActive ? 'text-violet-600' : `${item.color} group-hover:text-slate-700`}`} />
                  {!collapsed && (
                    <span className="truncate flex-1 text-left">{item.label}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Creative Labs */}
        <div>
          {!collapsed && (
            <p className="mb-1 px-2.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Creative Labs
            </p>
          )}
          <div className="space-y-0.5">
            {creativeItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentRoute === item.route;
              return (
                <button
                  key={item.route}
                  onClick={() => onNavigate(item.route)}
                  title={collapsed ? item.label : undefined}
                  className={`group relative flex w-full items-center rounded-lg text-xs font-medium transition-all ${
                    collapsed ? 'h-9 justify-center px-0' : 'h-8.5 justify-start gap-2.5 px-2.5'
                  } ${
                    isActive
                      ? 'bg-violet-50 text-violet-900 font-semibold'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-r-full bg-violet-600" />
                  )}
                  <Icon className={`size-4 shrink-0 transition-colors ${isActive ? 'text-violet-600' : `${item.color} group-hover:text-slate-700`}`} />
                  {!collapsed && <span className="truncate flex-1 text-left">{item.label}</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Monitor & Observability */}
        <div>
          {!collapsed && (
            <p className="mb-1 px-2.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Monitor
            </p>
          )}
          <div className="space-y-0.5">
            {monitorItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentRoute === item.route;
              return (
                <button
                  key={item.route}
                  onClick={() => onNavigate(item.route)}
                  title={collapsed ? item.label : undefined}
                  className={`group relative flex w-full items-center rounded-lg text-xs font-medium transition-all ${
                    collapsed ? 'h-9 justify-center px-0' : 'h-8.5 justify-start gap-2.5 px-2.5'
                  } ${
                    isActive
                      ? 'bg-violet-50 text-violet-900 font-semibold'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-r-full bg-violet-600" />
                  )}
                  <Icon className={`size-4 shrink-0 transition-colors ${isActive ? 'text-violet-600' : `${item.color} group-hover:text-slate-700`}`} />
                  {!collapsed && <span className="truncate flex-1 text-left">{item.label}</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Settings & Gateway */}
        <div>
          {!collapsed && (
            <p className="mb-1 px-2.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Settings & Gateway
            </p>
          )}
          <div className="space-y-0.5">
            {settingsItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentRoute === item.route;
              return (
                <button
                  key={item.route}
                  onClick={() => onNavigate(item.route)}
                  title={collapsed ? item.label : undefined}
                  className={`group relative flex w-full items-center rounded-lg text-xs font-medium transition-all ${
                    collapsed ? 'h-9 justify-center px-0' : 'h-8.5 justify-start gap-2.5 px-2.5'
                  } ${
                    isActive
                      ? 'bg-violet-50 text-violet-900 font-semibold'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-r-full bg-violet-600" />
                  )}
                  <Icon className={`size-4 shrink-0 transition-colors ${isActive ? 'text-violet-600' : `${item.color} group-hover:text-slate-700`}`} />
                  {!collapsed && <span className="truncate flex-1 text-left">{item.label}</span>}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* User Profile Pill at Bottom (Amir Hussain) */}
      <div className={`p-2.5 border-t border-slate-100 ${collapsed ? 'px-2' : 'px-3'}`}>
        {!collapsed ? (
          <div className="flex items-center gap-2.5 rounded-xl bg-slate-50 p-2 border border-slate-100">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="size-8 rounded-full object-cover ring-2 ring-violet-500/20"
            />
            <div className="min-w-0 flex-1 leading-tight">
              <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
              <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
            </div>
            <button 
              onClick={onLogout}
              className="size-7 grid place-items-center rounded-lg text-slate-400 hover:text-rose-600 hover:bg-white transition-colors"
              title="Sign Out"
            >
              <LogOut className="size-3.5" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="size-8 rounded-full object-cover ring-2 ring-violet-500/20 cursor-pointer"
              title={`${user.name} (${user.email})`}
            />
          </div>
        )}
      </div>
    </aside>
  );
};

import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Plus, 
  Sparkles, 
  Check
} from 'lucide-react';
import { UserProfile, RoutePath } from '../types';

interface HeaderProps {
  user: UserProfile;
  currentRoute: RoutePath;
  onNavigate: (route: RoutePath) => void;
  onOpenCreateAgent: () => void;
  onOpenVoiceCall: () => void;
  onOpenSearch: () => void;
  onLogout: () => void;
  onToggleMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  currentRoute,
  onNavigate,
  onOpenCreateAgent,
  onOpenVoiceCall,
  onOpenSearch,
  onLogout,
  onToggleMobileMenu
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    {
      id: 'n1',
      title: 'MSSQL View Synchronized',
      desc: 'vw_PayPeople_EmployeeLeaveBalances indexed with 420 employee records.',
      time: '6m ago',
      route: '/app/databot' as RoutePath
    },
    {
      id: 'n2',
      title: 'Voice P95 Latency dropped to 175ms',
      desc: 'Hana (Saudi Najdi) acoustic model optimized on Riyadh GPU partition.',
      time: '28m ago',
      route: '/app/voices' as RoutePath
    },
    {
      id: 'n3',
      title: 'Sovereign Compliance Verified',
      desc: '100% in-country data residency verified against Saudi PDPL bylaws.',
      time: '1h ago',
      route: '/app/settings/status' as RoutePath
    }
  ];

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-slate-200/90 bg-white/95 px-4 md:px-6 backdrop-blur-md">
      {/* Left Search Bar & Mobile Trigger */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <button 
          onClick={onToggleMobileMenu}
          className="md:hidden size-9 grid place-items-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
        >
          <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Global Quick Search Button (⌘K) */}
        <button
          onClick={onOpenSearch}
          className="group flex h-9 w-full items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50/70 px-3 text-xs text-slate-400 hover:border-slate-300 hover:bg-white transition-all shadow-2xs"
        >
          <Search className="size-3.5 text-slate-400 group-hover:text-slate-600 transition-colors" />
          <span className="truncate flex-1 text-left">Search agents, SQL bots, RAG collections, or keys...</span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-500 shadow-2xs">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Deploy New Agent Button */}
        <button
          onClick={onOpenCreateAgent}
          className="flex items-center gap-1.5 rounded-xl bg-violet-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-violet-700 transition-all shadow-xs shadow-violet-200 active:scale-95"
        >
          <Plus className="size-3.5" />
          <span>Deploy Agent</span>
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative size-9 grid place-items-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <Bell className="size-4" />
            <span className="absolute top-2 right-2 size-2 rounded-full bg-violet-600 ring-2 ring-white" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-slate-200 bg-white shadow-xl z-50 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                <span className="text-xs font-bold text-slate-900">Notifications</span>
                <span className="rounded-full bg-violet-100 text-violet-700 text-[10px] font-bold px-2 py-0.5">3 new</span>
              </div>
              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => {
                      onNavigate(n.route);
                      setShowNotifications(false);
                    }}
                    className="p-3 text-left hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-slate-900">{n.title}</p>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Pill (Amir Hussain) */}
        <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200">
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="size-8 rounded-full object-cover ring-2 ring-violet-500/20"
          />
          <div className="hidden xl:block text-left leading-tight">
            <p className="text-xs font-bold text-slate-900">{user.name}</p>
            <p className="text-[10px] text-slate-400">Enterprise AI Lead</p>
          </div>
        </div>
      </div>
    </header>
  );
};

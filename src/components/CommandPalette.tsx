import React, { useState, useEffect } from 'react';
import { Search, Bot, Mic, Database, Table2, Activity, Key, ShieldCheck, X, ArrowRight, FileAudio, MessagesSquare, DollarSign } from 'lucide-react';
import { RoutePath } from '../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: RoutePath) => void;
  onOpenVoiceCall: () => void;
  onOpenCreateAgent: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenVoiceCall,
  onOpenCreateAgent
}) => {
  const [query, setQuery] = useState('');

  const commands = [
    { label: 'Start Live Telephony Simulation', cat: 'Actions', icon: Mic, action: onOpenVoiceCall },
    { label: 'Deploy New Sovereign Agent', cat: 'Actions', icon: Bot, action: onOpenCreateAgent },
    // BUILD
    { label: 'Agents Studio (Pulse Metrics & Fleet)', cat: 'BUILD', icon: Bot, action: () => onNavigate('/app/agents') },
    { label: 'My Agents (Inventory & Keys)', cat: 'BUILD', icon: Bot, action: () => onNavigate('/app/agents/my-agents') },
    { label: 'Ask Agent Playground (Multi-Session)', cat: 'BUILD', icon: Bot, action: () => onNavigate('/app/agents/ask') },
    { label: 'Knowledge Base (RAG Engine & Collections)', cat: 'BUILD', icon: Database, action: () => onNavigate('/app/knowledge') },
    { label: 'DataBot (MSSQL View Querying)', cat: 'BUILD', icon: Table2, action: () => onNavigate('/app/databot') },
    { label: 'Voices & Instant Cloning (Saudi & Gulf)', cat: 'BUILD', icon: Mic, action: () => onNavigate('/app/voices') },
    // CREATIVE
    { label: 'Speech to Text Live (ASR)', cat: 'CREATIVE', icon: Mic, action: () => onNavigate('/app/creative/stt') },
    { label: 'Text to Speech Studio (TTS)', cat: 'CREATIVE', icon: FileAudio, action: () => onNavigate('/app/creative/tts') },
    // MONITOR
    { label: 'Conversations & User Transcripts', cat: 'MONITOR', icon: MessagesSquare, action: () => onNavigate('/app/monitor/conversations') },
    { label: 'Analytics & Traffic Curves', cat: 'MONITOR', icon: Activity, action: () => onNavigate('/app/monitor/analytics') },
    { label: 'Public API Endpoint Monitor', cat: 'MONITOR', icon: Activity, action: () => onNavigate('/app/monitor/public-api') },
    { label: 'System Event Logs', cat: 'MONITOR', icon: ShieldCheck, action: () => onNavigate('/app/monitor/logs') },
    { label: 'Spend Tracker & Quotas', cat: 'MONITOR', icon: DollarSign, action: () => onNavigate('/app/monitor/spend') },
    // SETTINGS
    { label: 'Third-Party Integrations & Webhooks', cat: 'SETTINGS', icon: ShieldCheck, action: () => onNavigate('/app/settings/integrations') },
    { label: 'Developer API Keys & Rotation', cat: 'SETTINGS', icon: Key, action: () => onNavigate('/app/settings/api-keys') },
    { label: 'System Status & 99.95% SLA', cat: 'SETTINGS', icon: ShieldCheck, action: () => onNavigate('/app/settings/status') },
  ];

  const filtered = commands.filter(c => 
    c.label.toLowerCase().includes(query.toLowerCase()) || 
    c.cat.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-slate-900/50 backdrop-blur-xs p-4">
      <div className="w-full max-w-xl rounded-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center px-4 border-b border-slate-100">
          <Search className="size-4 text-slate-400 mr-3" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, studio tab, or feature name..."
            className="w-full py-3.5 text-xs text-slate-800 placeholder:text-slate-400 outline-none"
          />
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="size-4" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-slate-50">
          {filtered.length > 0 ? (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    item.action();
                    onClose();
                  }}
                  className="flex w-full items-center justify-between rounded-xl p-2.5 text-xs text-slate-700 hover:bg-violet-50 hover:text-violet-900 transition-colors group text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="size-7 rounded-lg bg-slate-100 grid place-items-center group-hover:bg-violet-100 group-hover:text-violet-700">
                      <Icon className="size-3.5" />
                    </div>
                    <div>
                      <p className="font-semibold">{item.label}</p>
                      <p className="text-[10px] text-slate-400">{item.cat}</p>
                    </div>
                  </div>
                  <ArrowRight className="size-3.5 text-slate-300 group-hover:text-violet-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              );
            })
          ) : (
            <div className="py-8 text-center text-xs text-slate-400">
              No results found for "{query}"
            </div>
          )}
        </div>

        <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Navigate with arrows or click</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};

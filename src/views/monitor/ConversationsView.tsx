import React, { useState } from 'react';
import { 
  MessagesSquare, 
  Search, 
  Filter, 
  PhoneCall, 
  Globe, 
  ArrowUpRight, 
  CheckCircle2, 
  Play, 
  Volume2, 
  Sparkles,
  Bot
} from 'lucide-react';
import { recentConversations as initialLogs } from '../../mockData';
import { ConversationLog } from '../../types';

export const ConversationsView: React.FC = () => {
  const [logs] = useState<ConversationLog[]>(initialLogs);
  const [selectedLog, setSelectedLog] = useState<ConversationLog>(initialLogs[0]);
  const [channelFilter, setChannelFilter] = useState<'ALL' | 'Voice' | 'Chat' | 'API'>('ALL');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  const filteredLogs = logs.filter(l => {
    if (channelFilter === 'ALL') return true;
    return l.channel.toLowerCase() === channelFilter.toLowerCase();
  });

  const handlePlayAudio = () => {
    setIsPlayingAudio(true);
    setTimeout(() => setIsPlayingAudio(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-xl sm:text-2xl font-bold text-slate-900">Conversations Inspector</h1>
            <span className="rounded-full bg-violet-100 text-violet-800 text-[10px] font-bold px-2 py-0.5">
              Cross-Agent Audit
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Omnichannel user interaction audit trails across WebRTC voice telephony, web widgets, and public APIs
          </p>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
          {(['ALL', 'Voice', 'Chat', 'API'] as const).map(ch => (
            <button
              key={ch}
              onClick={() => setChannelFilter(ch)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                channelFilter === ch ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {ch}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of separate clean colorful section cards */}
      <div className="home-widget-grid">

        {/* ================================================================= */}
        {/* CARD 1: KPI Telemetry Header (Tone: Violet, Wide) */}
        {/* ================================================================= */}
        <div data-home-widget="conversations-kpi" data-tone="violet" className="home-widget home-widget-wide">
          <div className="home-widget-heading flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="home-widget-icon grid size-10 place-items-center rounded-xl bg-violet-100 text-violet-800 shadow-2xs">
                <MessagesSquare className="size-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">Interaction Quality & Fleet CSAT</h2>
                <p className="text-xs text-slate-500">Live multi-turn evaluation across Riyadh telephony edge</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 border border-emerald-100">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              98.2% CSAT Average
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
            <div className="home-record-row p-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Total Transcripts</span>
              <span className="font-display text-2xl font-bold text-slate-900 mt-1 block">1,248</span>
              <span className="text-[10px] text-emerald-600 font-bold mt-1 block">Zero dropouts</span>
            </div>
            <div className="home-record-row p-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Avg Duration</span>
              <span className="font-display text-2xl font-bold text-violet-700 mt-1 block">42 sec</span>
              <span className="text-[10px] text-slate-400 mt-1 block">Rapid resolution</span>
            </div>
            <div className="home-record-row p-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Median Turn Tokens</span>
              <span className="font-display text-2xl font-bold text-slate-900 mt-1 block">340</span>
              <span className="text-[10px] text-slate-400 mt-1 block">Concise responses</span>
            </div>
            <div className="home-record-row p-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">First-Contact Resolution</span>
              <span className="font-display text-2xl font-bold text-emerald-600 mt-1 block">94.8%</span>
              <span className="text-[10px] text-emerald-600 font-bold mt-1 block">No human escalate needed</span>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* CARD 2: Recent Interactions Feed (Tone: Mint) */}
        {/* ================================================================= */}
        <div data-home-widget="interaction-list" data-tone="mint" className="home-widget">
          <div className="home-widget-heading flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="home-widget-icon grid size-10 place-items-center rounded-xl bg-emerald-100 text-emerald-800 shadow-2xs">
                <Bot className="size-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">Interaction Sessions</h2>
                <p className="text-xs text-slate-500">Select session to inspect multi-turn transcript</p>
              </div>
            </div>
            <span className="rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5">
              {filteredLogs.length} Sessions
            </span>
          </div>

          <div className="space-y-2.5">
            {filteredLogs.map(log => {
              const isSelected = selectedLog.id === log.id;
              return (
                <div
                  key={log.id}
                  onClick={() => setSelectedLog(log)}
                  className={`home-record-row p-3 cursor-pointer transition-all ${
                    isSelected ? 'ring-2 ring-emerald-500/50 bg-emerald-50/30' : ''
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{log.agentName}</span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-md ${
                        log.channel === 'Voice' ? 'bg-emerald-100 text-emerald-800' : 'bg-violet-100 text-violet-800'
                      }`}>
                        {log.channel}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400">{log.startedAt}</span>
                  </div>

                  <p className="text-xs text-slate-700 line-clamp-1 font-arabic mt-1 font-medium">
                    "{log.userQuery}"
                  </p>

                  <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 pt-1.5 border-t border-slate-100">
                    <span>{log.durationSec}s duration</span>
                    <span>{log.tokens} tokens</span>
                    <span className="text-emerald-600 font-bold">{log.status}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================================================================= */}
        {/* CARD 3: Transcript & Audio Inspector (Tone: Cyan) */}
        {/* ================================================================= */}
        <div data-home-widget="transcript-inspector" data-tone="cyan" className="home-widget">
          <div className="home-widget-heading flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="home-widget-icon grid size-10 place-items-center rounded-xl bg-sky-100 text-sky-800 shadow-2xs">
                <Volume2 className="size-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">Transcript Inspector</h2>
                <p className="text-xs text-slate-500">Session ID: {selectedLog.id}</p>
              </div>
            </div>
            {selectedLog.channel === 'Voice' && (
              <button
                onClick={handlePlayAudio}
                className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 hover:bg-sky-100 text-sky-800 text-[10px] font-bold px-2.5 py-1 border border-sky-100 transition-colors cursor-pointer"
              >
                <Play className={`size-3 ${isPlayingAudio ? 'fill-sky-700 animate-pulse' : ''}`} />
                <span>{isPlayingAudio ? 'Simulating Audio...' : 'Play Audio Recording'}</span>
              </button>
            )}
          </div>

          <div className="space-y-3">
            {/* User Speech bubble */}
            <div className="home-record-row p-3 bg-white">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Customer Audio Query
              </span>
              <p className="text-xs text-slate-800 font-arabic leading-relaxed font-medium">
                {selectedLog.userQuery}
              </p>
            </div>

            {/* Agent response bubble */}
            <div className="home-record-row p-3 bg-sky-50/40 border-sky-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 block mb-1">
                {selectedLog.agentName} Response
              </span>
              <p className="text-xs text-slate-900 font-arabic leading-relaxed">
                {selectedLog.agentResponse}
              </p>
            </div>

            {/* Session parameters */}
            <div className="home-record-row p-3 grid grid-cols-2 gap-2 text-xs text-slate-600">
              <div>
                <span className="text-slate-400 text-[10px] block">Channel</span>
                <span className="font-bold text-slate-800">{selectedLog.channel}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Tokens Billed</span>
                <span className="font-mono font-bold text-slate-800">{selectedLog.tokens}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Total Duration</span>
                <span className="font-mono font-bold text-slate-800">{selectedLog.durationSec}s</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Estimated Cost</span>
                <span className="font-mono font-bold text-emerald-600">${selectedLog.costUsd.toFixed(4)}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

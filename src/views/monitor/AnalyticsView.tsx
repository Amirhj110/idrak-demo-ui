import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Zap, 
  Users, 
  ArrowUpRight, 
  Activity, 
  Radio, 
  ShieldCheck, 
  Cpu, 
  Headphones, 
  Globe 
} from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const [activeRange, setActiveRange] = useState<'24h' | '7d' | '30d'>('7d');

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-xl sm:text-2xl font-bold text-slate-900">Platform Analytics & Telemetry</h1>
            <span className="rounded-full bg-violet-100 text-violet-800 text-[10px] font-bold px-2 py-0.5">
              Live Cluster Stream
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time telemetry, GPU acoustic latency curves, and token throughput across all deployed agents
          </p>
        </div>

        {/* Time range selector */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs">
          {(['24h', '7d', '30d'] as const).map(rng => (
            <button
              key={rng}
              onClick={() => setActiveRange(rng)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeRange === rng 
                  ? 'bg-white text-violet-700 shadow-2xs' 
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {rng.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Responsive Section Cards Grid */}
      <div className="home-widget-grid">

        {/* ================================================================= */}
        {/* CARD 1: KPI Highlights Deck (Tone: Mint, Wide) */}
        {/* ================================================================= */}
        <div data-home-widget="kpi-deck" data-tone="mint" className="home-widget home-widget-wide">
          <div className="home-widget-heading flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="home-widget-icon grid size-10 place-items-center rounded-xl bg-emerald-100 text-emerald-800 shadow-2xs">
                <TrendingUp className="size-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">Executive Health & SLA Metrics</h2>
                <p className="text-xs text-slate-500">Continuous 7-day rolling aggregates</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 border border-emerald-100">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              99.98% SLA
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
            <div className="home-record-row p-3.5 flex flex-col justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Requests</span>
              <span className="font-display text-2xl font-bold text-slate-900 mt-1">833.5k</span>
              <span className="text-[10px] text-emerald-600 font-bold mt-1">+24.2% vs previous</span>
            </div>
            <div className="home-record-row p-3.5 flex flex-col justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Tokens Billed</span>
              <span className="font-display text-2xl font-bold text-violet-700 mt-1">18.4M</span>
              <span className="text-[10px] text-slate-400 mt-1">Scale Tier Quota</span>
            </div>
            <div className="home-record-row p-3.5 flex flex-col justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Median Voice Latency</span>
              <span className="font-display text-2xl font-bold text-slate-900 mt-1">182 ms</span>
              <span className="text-[10px] text-emerald-600 font-bold mt-1">↓ 18ms acoustic opt</span>
            </div>
            <div className="home-record-row p-3.5 flex flex-col justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Sovereign Data Storage</span>
              <span className="font-display text-2xl font-bold text-emerald-600 mt-1">100% KSA</span>
              <span className="text-[10px] text-slate-400 mt-1">Zero cross-border egress</span>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* CARD 2: Daily Volume Visualizer (Tone: Violet) */}
        {/* ================================================================= */}
        <div data-home-widget="daily-volume" data-tone="violet" className="home-widget">
          <div className="home-widget-heading flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="home-widget-icon grid size-10 place-items-center rounded-xl bg-violet-100 text-violet-800 shadow-2xs">
                <BarChart3 className="size-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">Daily Inbound Volume</h2>
                <p className="text-xs text-slate-500">Hourly aggregates across voice & chat</p>
              </div>
            </div>
            <span className="text-xs font-bold text-violet-700">Past 7 Days</span>
          </div>

          <div className="flex items-end gap-2.5 h-44 pt-4 px-2">
            {[
              { day: 'Thu', val: 54, count: '78.2k' },
              { day: 'Fri', val: 38, count: '52.1k' },
              { day: 'Sat', val: 42, count: '61.4k' },
              { day: 'Sun', val: 78, count: '112.5k' },
              { day: 'Mon', val: 92, count: '138.9k' },
              { day: 'Tue', val: 86, count: '124.2k' },
              { day: 'Wed', val: 98, count: '142.8k', active: true },
            ].map((bar, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group relative">
                <div className="w-full bg-slate-100 rounded-t-xl overflow-hidden flex flex-col justify-end h-32">
                  <div 
                    className={`w-full transition-all duration-300 rounded-t-lg ${
                      bar.active 
                        ? 'bg-gradient-to-t from-violet-600 to-indigo-500 shadow-xs' 
                        : 'bg-violet-400/80 group-hover:bg-violet-500'
                    }`}
                    style={{ height: `${bar.val}%` }}
                  />
                </div>
                <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-bold py-0.5 px-2 rounded pointer-events-none whitespace-nowrap z-10 shadow-sm">
                  {bar.count}
                </div>
                <span className={`text-[10px] font-bold ${bar.active ? 'text-violet-700' : 'text-slate-500'}`}>
                  {bar.day}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Peak Hour: 11:00 – 14:00 AST</span>
            <span className="font-bold text-slate-800">142,800 peak interactions</span>
          </div>
        </div>

        {/* ================================================================= */}
        {/* CARD 3: Acoustic Voice Quality & Latency (Tone: Cyan) */}
        {/* ================================================================= */}
        <div data-home-widget="voice-latency" data-tone="cyan" className="home-widget">
          <div className="home-widget-heading flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="home-widget-icon grid size-10 place-items-center rounded-xl bg-sky-100 text-sky-800 shadow-2xs">
                <Headphones className="size-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">Acoustic & Latency Profile</h2>
                <p className="text-xs text-slate-500">WebRTC telephony audio stream metrics</p>
              </div>
            </div>
            <span className="rounded-full bg-sky-100 text-sky-800 text-[10px] font-bold px-2 py-0.5">
              4.82 / 5.0 MOS
            </span>
          </div>

          <div className="space-y-2.5">
            {[
              { label: 'Riyadh DC-1 Gateway Latency', val: '182 ms', target: '< 200 ms', pct: 91, status: 'Optimal' },
              { label: 'Time to First Audio Frame (TTFA)', val: '240 ms', target: '< 300 ms', pct: 80, status: 'Optimal' },
              { label: 'Packet Jitter & Audio Buffer', val: '14 ms', target: '< 30 ms', pct: 95, status: 'Optimal' },
              { label: 'Packet Loss on GCC SIP Trunks', val: '0.02%', target: '< 0.5%', pct: 99, status: 'Optimal' },
            ].map((m, i) => (
              <div key={i} className="home-record-row p-3 flex items-center justify-between gap-3 text-xs">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-800">{m.label}</span>
                    <span className="font-mono font-bold text-sky-700">{m.val}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-sky-500 h-full rounded-full" style={{ width: `${m.pct}%` }} />
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-400 mt-1">
                    <span>Target: {m.target}</span>
                    <span className="text-emerald-600 font-bold">{m.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================================================================= */}
        {/* CARD 4: Dialect & Channel Mix (Tone: Pink) */}
        {/* ================================================================= */}
        <div data-home-widget="dialect-mix" data-tone="pink" className="home-widget">
          <div className="home-widget-heading flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="home-widget-icon grid size-10 place-items-center rounded-xl bg-rose-100 text-rose-800 shadow-2xs">
                <Globe className="size-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">Dialect & Linguistic Mix</h2>
                <p className="text-xs text-slate-500">Distribution of native Arabic queries</p>
              </div>
            </div>
            <span className="rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.5">
              Arabic Native
            </span>
          </div>

          <div className="space-y-3">
            {[
              { dialect: 'Najdi (Central Saudi)', share: '48%', color: 'bg-rose-500', bar: 48, queries: '400k' },
              { dialect: 'Hijazi (Western KSA)', share: '24%', color: 'bg-violet-500', bar: 24, queries: '200k' },
              { dialect: 'Eastern & Gulf Arabic', share: '18%', color: 'bg-sky-500', bar: 18, queries: '150k' },
              { dialect: 'Modern Standard Arabic (Fusha)', share: '10%', color: 'bg-emerald-500', bar: 10, queries: '83k' },
            ].map((d, i) => (
              <div key={i} className="home-record-row p-3">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`size-2.5 rounded-full ${d.color}`} />
                    <span className="font-bold text-slate-800">{d.dialect}</span>
                  </div>
                  <span className="font-mono font-bold text-slate-900">{d.share}</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className={`${d.color} h-full rounded-full`} style={{ width: `${d.bar}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================================================================= */}
        {/* CARD 5: Sovereign Cluster & Hardware Health (Tone: Amber) */}
        {/* ================================================================= */}
        <div data-home-widget="cluster-telemetry" data-tone="amber" className="home-widget">
          <div className="home-widget-heading flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="home-widget-icon grid size-10 place-items-center rounded-xl bg-amber-100 text-amber-800 shadow-2xs">
                <Cpu className="size-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">GPU Cluster & Compute Nodes</h2>
                <p className="text-xs text-slate-500">Riyadh Sovereign Tier-IV Datacenter</p>
              </div>
            </div>
            <span className="rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5">
              12 Active Nodes
            </span>
          </div>

          <div className="space-y-2.5">
            {[
              { node: 'riyadh-gpu-partition-01', vram: '84% util', temp: '54°C', status: 'Operational' },
              { node: 'riyadh-gpu-partition-02', vram: '78% util', temp: '51°C', status: 'Operational' },
              { node: 'jeddah-edge-sip-switch-01', vram: '42% util', temp: '46°C', status: 'Operational' },
              { node: 'dammam-edge-sip-switch-02', vram: '39% util', temp: '45°C', status: 'Operational' },
            ].map((node, i) => (
              <div key={i} className="home-record-row p-3 flex items-center justify-between gap-3 text-xs">
                <div className="min-w-0 flex-1">
                  <p className="font-mono font-bold text-slate-800 text-[11px] truncate">{node.node}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{node.vram} · Temp: {node.temp}</p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  {node.status}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

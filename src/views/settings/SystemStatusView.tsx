import React from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Server, 
  Globe2, 
  Activity, 
  Cpu, 
  Lock, 
  Layers, 
  Radio, 
  RefreshCw 
} from 'lucide-react';

export const SystemStatusView: React.FC = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-xl sm:text-2xl font-bold text-slate-900">System Status & Sovereign Cloud Health</h1>
            <span className="rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5">
              All Systems Normal
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time cluster health, sovereign encryption status, and regulatory certifications
          </p>
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1.5 border border-emerald-100 shadow-2xs">
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>SLA Verified 99.98%</span>
        </span>
      </div>

      {/* Grid of separate clean colorful section cards */}
      <div className="home-widget-grid">

        {/* ================================================================= */}
        {/* CARD 1: SLA & Encryption Banner (Tone: Mint, Wide) */}
        {/* ================================================================= */}
        <div data-home-widget="sla-banner" data-tone="mint" className="home-widget home-widget-wide">
          <div className="home-widget-heading flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="home-widget-icon grid size-10 place-items-center rounded-xl bg-emerald-100 text-emerald-800 shadow-2xs">
                <ShieldCheck className="size-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">Sovereign Cluster Resilience & Uptime</h2>
                <p className="text-xs text-slate-500">Tier-IV KSA facility with isolated tenant GPU enclaves</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Encryption Standard</span>
              <span className="font-mono text-emerald-700 font-bold text-base">AES-256-GCM + TLS 1.3</span>
              <span className="text-[10px] text-slate-400 block">Zero Cross-Border Egress</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
            <div className="home-record-row p-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Current Uptime</span>
              <span className="font-display text-2xl font-bold text-slate-900 mt-1 block">99.98%</span>
              <span className="text-[10px] text-emerald-600 font-bold mt-1 block">Exceeds 99.95% SLA</span>
            </div>
            <div className="home-record-row p-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Unplanned Outages</span>
              <span className="font-display text-2xl font-bold text-emerald-600 mt-1 block">0.00 hrs</span>
              <span className="text-[10px] text-slate-400 mt-1 block">Past 365 days</span>
            </div>
            <div className="home-record-row p-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Failover RPO / RTO</span>
              <span className="font-display text-2xl font-bold text-slate-900 mt-1 block">&lt; 2 sec</span>
              <span className="text-[10px] text-emerald-600 font-bold mt-1 block">Instant state replication</span>
            </div>
            <div className="home-record-row p-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Hardware Security</span>
              <span className="font-display text-2xl font-bold text-violet-700 mt-1 block">FIPS 140-3</span>
              <span className="text-[10px] text-slate-400 mt-1 block">Dedicated HSM</span>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* CARD 2: Regulatory Compliance Certifications (Tone: Violet, Wide) */}
        {/* ================================================================= */}
        <div data-home-widget="compliance-deck" data-tone="violet" className="home-widget home-widget-wide">
          <div className="home-widget-heading flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="home-widget-icon grid size-10 place-items-center rounded-xl bg-violet-100 text-violet-800 shadow-2xs">
                <CheckCircle2 className="size-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">Regulatory Certifications & Audits</h2>
                <p className="text-xs text-slate-500">Independently certified by Saudi and international compliance authorities</p>
              </div>
            </div>
            <span className="rounded-full bg-violet-100 text-violet-800 text-[10px] font-bold px-2 py-0.5">
              4 Active Badges
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {[
              { name: 'Saudi PDPL Certified', desc: '100% In-Country Data Storage & PII redaction per SDAIA requirements', badge: 'Certified' },
              { name: 'SAMA Cyber Framework', desc: 'Financial grade encryption & strict OTP protection for banking workflows', badge: 'Compliant' },
              { name: 'ISO 27001 Aligned', desc: 'Enterprise information security management and continuous audit logging', badge: 'Aligned' },
              { name: 'GDPR Ready', desc: 'Right to erasure, data portability & user consent management controls', badge: 'Ready' },
            ].map((c, i) => (
              <div key={i} className="home-record-row p-3.5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-900">{c.name}</span>
                    <span className="text-[9px] font-bold bg-violet-100 text-violet-800 px-1.5 py-0.2 rounded-full">
                      {c.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{c.desc}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center gap-1.5 text-emerald-700 text-[10px] font-bold">
                  <CheckCircle2 className="size-3" />
                  <span>Audited 2026</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================================================================= */}
        {/* CARD 3: Regional Cluster Nodes (Tone: Cyan) */}
        {/* ================================================================= */}
        <div data-home-widget="cluster-nodes" data-tone="cyan" className="home-widget">
          <div className="home-widget-heading flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="home-widget-icon grid size-10 place-items-center rounded-xl bg-sky-100 text-sky-800 shadow-2xs">
                <Server className="size-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">Regional Cloud Nodes</h2>
                <p className="text-xs text-slate-500">Real-time compute node latency & ping</p>
              </div>
            </div>
            <span className="rounded-full bg-sky-100 text-sky-800 text-[10px] font-bold px-2 py-0.5">
              4 Clusters
            </span>
          </div>

          <div className="space-y-2.5">
            {[
              { node: 'Riyadh DC-1 (Primary Sovereign)', ping: '16ms', load: '42%', status: 'Healthy', role: 'Active Primary' },
              { node: 'Dammam DC-2 (Hot Standby)', ping: '22ms', load: '18%', status: 'Healthy', role: 'Replica' },
              { node: 'Dubai North (UAE Sovereign)', ping: '34ms', load: '28%', status: 'Healthy', role: 'Active UAE' },
              { node: 'Bilytica Private VPC On-Prem', ping: '4ms', load: '12%', status: 'Healthy', role: 'Dedicated Node' }
            ].map((n, i) => (
              <div key={i} className="home-record-row p-3 flex items-center justify-between gap-3 text-xs">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-emerald-500 shrink-0" />
                    <span className="font-bold text-slate-900 truncate">{n.node}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5 pl-4">{n.role} · Load: {n.load}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-mono font-bold text-sky-700 block text-xs">{n.ping}</span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.2 rounded-full">
                    {n.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================================================================= */}
        {/* CARD 4: Telecom Carrier Gateways (Tone: Amber) */}
        {/* ================================================================= */}
        <div data-home-widget="carrier-gateways" data-tone="amber" className="home-widget">
          <div className="home-widget-heading flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="home-widget-icon grid size-10 place-items-center rounded-xl bg-amber-100 text-amber-800 shadow-2xs">
                <Radio className="size-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">Telecom Carrier Gateways</h2>
                <p className="text-xs text-slate-500">SIP trunks & direct telecommunication lines</p>
              </div>
            </div>
            <span className="rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5">
              3 Gateways
            </span>
          </div>

          <div className="space-y-2.5">
            {[
              { carrier: 'Saudi Telecom Company (STC) Primary', type: 'SIP Trunking · Riyadh', latency: '8ms', status: 'Active' },
              { carrier: 'Mobily GCC Regional Transit', type: 'VoIP Edge · Jeddah', latency: '14ms', status: 'Active' },
              { carrier: 'Zain KSA Failover Carrier Route', type: 'Secondary SIP Trunk', latency: '12ms', status: 'Standby' },
            ].map((c, i) => (
              <div key={i} className="home-record-row p-3 flex items-center justify-between gap-3 text-xs">
                <div className="min-w-0 flex-1">
                  <span className="font-bold text-slate-900 truncate block">{c.carrier}</span>
                  <span className="text-[10px] text-slate-400 mt-0.5 block">{c.type}</span>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-mono font-bold text-amber-800 block text-xs">{c.latency}</span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.2 rounded-full">
                    {c.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

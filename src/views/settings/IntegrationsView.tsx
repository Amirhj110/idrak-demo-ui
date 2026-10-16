import React, { useState } from 'react';
import { 
  Puzzle, 
  CheckCircle2, 
  ArrowUpRight, 
  Plus, 
  ExternalLink, 
  Database, 
  PhoneCall, 
  MessageSquare, 
  Zap, 
  ShieldCheck, 
  ArrowRight,
  Settings
} from 'lucide-react';

export const IntegrationsView: React.FC = () => {
  const [selectedConfig, setSelectedConfig] = useState<string | null>(null);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-xl sm:text-2xl font-bold text-slate-900">Integrations & Enterprise Gateways</h1>
            <span className="rounded-full bg-violet-100 text-violet-800 text-[10px] font-bold px-2 py-0.5">
              5 Active Channels
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Connect Idrak agents to knowledge sources, workspace data, and voice gateways
          </p>
        </div>

        <button className="inline-flex items-center gap-1.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold px-3.5 py-2 shadow-2xs transition-colors cursor-pointer">
          <Plus className="size-3.5" />
          <span>Add Custom Webhook</span>
        </button>
      </div>

      {/* Grid of separate clean colorful section cards */}
      <div className="home-widget-grid">

        {/* ================================================================= */}
        {/* CARD 1: Gateway Overview Deck (Tone: Violet, Wide) */}
        {/* ================================================================= */}
        <div data-home-widget="integrations-hero" data-tone="violet" className="home-widget home-widget-wide">
          <div className="home-widget-heading flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="home-widget-icon grid size-10 place-items-center rounded-xl bg-violet-100 text-violet-800 shadow-2xs">
                <Puzzle className="size-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">Enterprise Integration Hub</h2>
                <p className="text-xs text-slate-500">Live data synchronization with zero cross-border egress</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 border border-emerald-100">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              All 5 Connectors Healthy
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
            <div className="home-record-row p-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Synchronized Records</span>
              <span className="font-display text-2xl font-bold text-slate-900 mt-1 block">42,890</span>
              <span className="text-[10px] text-emerald-600 font-bold mt-1 block">Knowledge + workspace data</span>
            </div>
            <div className="home-record-row p-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Active Telephony Trunks</span>
              <span className="font-display text-2xl font-bold text-violet-700 mt-1 block">3 SIP</span>
              <span className="text-[10px] text-slate-400 mt-1 block">Sub-200ms latency</span>
            </div>
            <div className="home-record-row p-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Average Sync Latency</span>
              <span className="font-display text-2xl font-bold text-slate-900 mt-1 block">28 ms</span>
              <span className="text-[10px] text-emerald-600 font-bold mt-1 block">Direct read replica</span>
            </div>
            <div className="home-record-row p-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Security Mode</span>
              <span className="font-display text-2xl font-bold text-emerald-600 mt-1 block">mTLS</span>
              <span className="text-[10px] text-slate-400 mt-1 block">AlwaysEncrypted</span>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* CARD 2: Knowledge & Workspace Data (Tone: Mint) */}
        {/* ================================================================= */}
        <div data-home-widget="hrms-connectors" data-tone="mint" className="home-widget">
          <div className="home-widget-heading flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="home-widget-icon grid size-10 place-items-center rounded-xl bg-emerald-100 text-emerald-800 shadow-2xs">
                <CheckCircle2 className="size-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">Knowledge & Workspace Data</h2>
                <p className="text-xs text-slate-500">Indexed sources and read-only workspace views</p>
              </div>
            </div>
            <span className="rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5">
              Connected
            </span>
          </div>

          <div className="space-y-3">
            <div className="home-record-row p-3.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-xs">Idrak Knowledge Source Connector</span>
                <span className="text-[9px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">Active</span>
              </div>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Indexes approved workspace documentation and connects read-only data views to Idrak agents.
              </p>
              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Sync: Every 5 minutes</span>
                <button className="text-emerald-700 font-bold hover:underline flex items-center gap-1 cursor-pointer">
                  <span>Configure Schemas</span>
                  <ArrowRight className="size-3" />
                </button>
              </div>
            </div>

            <div className="home-record-row p-3 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-slate-800">Knowledge Index Sync</span>
                <p className="text-[10px] text-slate-400">5 collections · Riyadh region</p>
              </div>
              <span className="font-mono font-bold text-emerald-600 text-[11px]">100% Up to date</span>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* CARD 3: Databases & SQL DataBot (Tone: Cyan) */}
        {/* ================================================================= */}
        <div data-home-widget="db-connectors" data-tone="cyan" className="home-widget">
          <div className="home-widget-heading flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="home-widget-icon grid size-10 place-items-center rounded-xl bg-sky-100 text-sky-800 shadow-2xs">
                <Database className="size-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">Database & SQL DataBot</h2>
                <p className="text-xs text-slate-500">Read-only views for natural language queries</p>
              </div>
            </div>
            <span className="rounded-full bg-sky-100 text-sky-800 text-[10px] font-bold px-2 py-0.5">
              Read-Only Safe
            </span>
          </div>

          <div className="space-y-3">
            <div className="home-record-row p-3.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-xs">MSSQL Enterprise View Switch</span>
                <span className="text-[9px] font-bold bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full">Connected</span>
              </div>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Secure read-only access to vw_PayPeople_EmployeeLeaveBalances and financial ledgers.
              </p>
              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="font-mono text-slate-400">10.42.0.12:1433</span>
                <button className="text-sky-700 font-bold hover:underline flex items-center gap-1 cursor-pointer">
                  <span>View DDL Schemas</span>
                  <ArrowRight className="size-3" />
                </button>
              </div>
            </div>

            <div className="home-record-row p-3.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-xs">SAP HANA ERP Gateway</span>
                <span className="text-[9px] font-bold bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full">Connected</span>
              </div>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Direct schema introspection for supply chain inventory and retail purchase invoices.
              </p>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* CARD 4: Telephony & Messaging Channels (Tone: Amber) */}
        {/* ================================================================= */}
        <div data-home-widget="telecom-channels" data-tone="amber" className="home-widget">
          <div className="home-widget-heading flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="home-widget-icon grid size-10 place-items-center rounded-xl bg-amber-100 text-amber-800 shadow-2xs">
                <PhoneCall className="size-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">Telephony & WhatsApp Channels</h2>
                <p className="text-xs text-slate-500">Live carrier switches and customer endpoints</p>
              </div>
            </div>
            <span className="rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5">
              Active Voice
            </span>
          </div>

          <div className="space-y-3">
            <div className="home-record-row p-3.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-xs">Riyadh Telecom SIP Trunk</span>
                <span className="text-[9px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">Sub-200ms</span>
              </div>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Carrier-grade inbound and outbound SIP trunking for sub-200ms phone calls with Salma & Najla.
              </p>
            </div>

            <div className="home-record-row p-3.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-xs">WhatsApp Business Cloud API</span>
                <span className="text-[9px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">Verified Meta</span>
              </div>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Two-way customer notification and verification bot dispatch across Saudi & UAE phone numbers.
              </p>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* CARD 5: Ready to Add (Tone: Pink) */}
        {/* ================================================================= */}
        <div data-home-widget="marketplace" data-tone="pink" className="home-widget">
          <div className="home-widget-heading flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="home-widget-icon grid size-10 place-items-center rounded-xl bg-rose-100 text-rose-800 shadow-2xs">
                <Zap className="size-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">Pre-built Connectors</h2>
                <p className="text-xs text-slate-500">Available enterprise adapters ready for 1-click install</p>
              </div>
            </div>
            <span className="rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.5">
              Marketplace
            </span>
          </div>

          <div className="space-y-2.5">
            {[
              { name: 'Salesforce Service Cloud', desc: 'Sync CRM cases & customer satisfaction ratings', badge: 'CRM' },
              { name: 'Microsoft 365 Outlook & Teams', desc: 'Read schedules and dispatch meeting reminders', badge: 'Productivity' },
              { name: 'Zatca E-Invoicing Gateway', desc: 'Automatic cryptographic XML invoice signing', badge: 'Finance' },
            ].map((c, i) => (
              <div key={i} className="home-record-row p-3 flex items-center justify-between gap-3 text-xs">
                <div>
                  <span className="font-bold text-slate-900">{c.name}</span>
                  <p className="text-[10px] text-slate-400 mt-0.5">{c.desc}</p>
                </div>
                <button className="px-2.5 py-1 rounded-lg bg-white border border-rose-200 text-rose-700 font-bold text-[10px] hover:bg-rose-50 transition-colors shadow-2xs shrink-0 cursor-pointer">
                  Install
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

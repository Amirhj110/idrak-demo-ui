import React, { useState } from 'react';
import { 
  DollarSign, 
  CreditCard, 
  TrendingUp, 
  AlertCircle, 
  ArrowUpRight, 
  CheckCircle2, 
  PhoneCall, 
  Zap, 
  Database, 
  FileText,
  Download
} from 'lucide-react';

export const SpendTrackerView: React.FC = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-xl sm:text-2xl font-bold text-slate-900">Spend Tracker & Quotas</h1>
            <span className="rounded-full bg-violet-100 text-violet-800 text-[10px] font-bold px-2 py-0.5">
              Enterprise Scale
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time billing consumption, voice telephony minute pools, and GPU token quota limits
          </p>
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-slate-200/80 px-3 py-1.5 text-xs font-bold text-slate-700 shadow-2xs">
          <CreditCard className="size-3.5 text-violet-600" />
          <span>Billing Cycle: Oct 01 – Oct 31, 2026</span>
        </span>
      </div>

      {/* Grid of separate clean colorful section cards */}
      <div className="home-widget-grid">

        {/* ================================================================= */}
        {/* CARD 1: Sovereign Quota Pool Banner (Tone: Violet, Wide) */}
        {/* ================================================================= */}
        <div data-home-widget="spend-hero" data-tone="violet" className="home-widget home-widget-wide">
          <div className="home-widget-heading flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="home-widget-icon grid size-10 place-items-center rounded-xl bg-violet-100 text-violet-800 shadow-2xs">
                <DollarSign className="size-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">Sovereign Enterprise Subscription</h2>
                <p className="text-xs text-slate-500">Dedicated Riyadh GPU partition with in-country data residency</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Cycle Spend</span>
              <span className="font-display text-2xl font-bold text-slate-900 block">$248.50</span>
              <span className="text-[10px] text-slate-400 block">Soft Cap: $1,500.00 / mo</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
            <div className="home-record-row p-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Voice Minutes Used</span>
              <span className="font-display text-2xl font-bold text-slate-900 mt-1 block">34,120</span>
              <span className="text-[10px] text-violet-600 font-bold mt-1 block">68% of 50,000 cap</span>
            </div>
            <div className="home-record-row p-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">GPU Reasoning Tokens</span>
              <span className="font-display text-2xl font-bold text-indigo-700 mt-1 block">18.4M</span>
              <span className="text-[10px] text-slate-400 mt-1 block">36% of 50.0M cap</span>
            </div>
            <div className="home-record-row p-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Vector Chunks Stored</span>
              <span className="font-display text-2xl font-bold text-emerald-600 mt-1 block">2,034</span>
              <span className="text-[10px] text-slate-400 mt-1 block">20% of 10,000 pool</span>
            </div>
            <div className="home-record-row p-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Cost Variance</span>
              <span className="font-display text-2xl font-bold text-emerald-600 mt-1 block">-14.2%</span>
              <span className="text-[10px] text-emerald-600 font-bold mt-1 block">Under monthly budget</span>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* CARD 2: Voice Telephony Minute Pool (Tone: Mint) */}
        {/* ================================================================= */}
        <div data-home-widget="voice-pool" data-tone="mint" className="home-widget">
          <div className="home-widget-heading flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="home-widget-icon grid size-10 place-items-center rounded-xl bg-emerald-100 text-emerald-800 shadow-2xs">
                <PhoneCall className="size-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">Voice Telephony Quota</h2>
                <p className="text-xs text-slate-500">Inbound & outbound SIP minutes</p>
              </div>
            </div>
            <span className="rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5">
              15,880 mins left
            </span>
          </div>

          <div className="space-y-3">
            <div className="home-record-row p-3.5">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-bold text-slate-800">Total Consumption</span>
                <span className="font-mono font-bold text-emerald-700">34,120 / 50,000 mins</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full" style={{ width: '68%' }} />
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="home-record-row p-2.5 flex items-center justify-between">
                <span className="text-slate-600">Outbound Customer Service (Salma)</span>
                <span className="font-mono font-bold text-slate-900">22,410 mins</span>
              </div>
              <div className="home-record-row p-2.5 flex items-center justify-between">
                <span className="text-slate-600">Inbound Agent Support (Najla)</span>
                <span className="font-mono font-bold text-slate-900">11,710 mins</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* CARD 3: GPU Reasoning Tokens Quota (Tone: Cyan) */}
        {/* ================================================================= */}
        <div data-home-widget="token-pool" data-tone="cyan" className="home-widget">
          <div className="home-widget-heading flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="home-widget-icon grid size-10 place-items-center rounded-xl bg-sky-100 text-sky-800 shadow-2xs">
                <Zap className="size-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">LLM Reasoning Tokens</h2>
                <p className="text-xs text-slate-500">Dedicated Sovereign Cluster inference</p>
              </div>
            </div>
            <span className="rounded-full bg-sky-100 text-sky-800 text-[10px] font-bold px-2 py-0.5">
              31.6M tokens left
            </span>
          </div>

          <div className="space-y-3">
            <div className="home-record-row p-3.5">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-bold text-slate-800">Monthly Usage</span>
                <span className="font-mono font-bold text-sky-700">18.4M / 50.0M tokens</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-sky-500 h-full rounded-full" style={{ width: '36%' }} />
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="home-record-row p-2.5 flex items-center justify-between">
                <span className="text-slate-600">Prompt Caching Savings</span>
                <span className="font-mono font-bold text-emerald-600">4.2M tokens ($0)</span>
              </div>
              <div className="home-record-row p-2.5 flex items-center justify-between">
                <span className="text-slate-600">Arabic Dialect Translation</span>
                <span className="font-mono font-bold text-slate-900">6.1M tokens</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* CARD 4: Cost Breakdown by Department (Tone: Pink) */}
        {/* ================================================================= */}
        <div data-home-widget="cost-centers" data-tone="pink" className="home-widget">
          <div className="home-widget-heading flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="home-widget-icon grid size-10 place-items-center rounded-xl bg-rose-100 text-rose-800 shadow-2xs">
                <TrendingUp className="size-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">Cost Center Allocation</h2>
                <p className="text-xs text-slate-500">Departmental chargebacks for October</p>
              </div>
            </div>
            <span className="rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.5">
              4 Cost Centers
            </span>
          </div>

          <div className="space-y-2.5">
            {[
              { dept: 'Customer Support Fleet (Bilytica)', amount: '$142.20', share: '57%', color: 'bg-rose-500' },
              { dept: 'Knowledge & Retrieval', amount: '$64.80', share: '26%', color: 'bg-violet-500' },
              { dept: 'DataBot & Analytics', amount: '$28.40', share: '12%', color: 'bg-sky-500' },
              { dept: 'Evaluation Sandbox', amount: '$13.10', share: '5%', color: 'bg-emerald-500' },
            ].map((c, i) => (
              <div key={i} className="home-record-row p-3 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className={`size-2.5 rounded-full shrink-0 ${c.color}`} />
                  <span className="font-bold text-slate-800 truncate">{c.dept}</span>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-mono font-bold text-slate-900 block">{c.amount}</span>
                  <span className="text-[10px] text-slate-400">{c.share}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================================================================= */}
        {/* CARD 5: Invoices & Accounting Ledger (Tone: Amber) */}
        {/* ================================================================= */}
        <div data-home-widget="invoices" data-tone="amber" className="home-widget">
          <div className="home-widget-heading flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="home-widget-icon grid size-10 place-items-center rounded-xl bg-amber-100 text-amber-800 shadow-2xs">
                <FileText className="size-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">Invoices & Statements</h2>
                <p className="text-xs text-slate-500">ZATCA compliant tax invoices</p>
              </div>
            </div>
            <span className="rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5">
              ZATCA e-Invoice
            </span>
          </div>

          <div className="space-y-2.5">
            {[
              { inv: 'INV-2026-09-SA', date: '30 Sep 2026', total: '$1,240.00', status: 'Paid · VAT 15%' },
              { inv: 'INV-2026-08-SA', date: '31 Aug 2026', total: '$1,180.00', status: 'Paid · VAT 15%' },
              { inv: 'INV-2026-07-SA', date: '31 Jul 2026', total: '$980.00', status: 'Paid · VAT 15%' },
            ].map((inv, i) => (
              <div key={i} className="home-record-row p-3 flex items-center justify-between gap-3 text-xs">
                <div className="min-w-0">
                  <p className="font-bold text-slate-800">{inv.inv}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{inv.date} · {inv.status}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-slate-900">{inv.total}</span>
                  <button className="p-1 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer">
                    <Download className="size-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  Key, 
  Copy, 
  Check, 
  Plus, 
  RefreshCw, 
  ShieldCheck, 
  Terminal, 
  Trash2, 
  Lock, 
  Shield, 
  Globe 
} from 'lucide-react';

export const ApiKeysManagementView: React.FC = () => {
  const [keys, setKeys] = useState([
    {
      id: 'k1',
      name: 'Riyadh Primary Telephony Gateway Key',
      key: 'key_live_9a8f47b2c910488db9a41e93c1e',
      masked: 'key_live_9a8f••••••••••••3c1e',
      created: '20 Sep 2026',
      lastUsed: 'Just now',
      role: 'Full Telephony & LLM Invoke'
    },
    {
      id: 'k2',
      name: 'PayPeople HRMS Sync Webhook Key',
      key: 'key_live_b72c41908234ea72089ffb8819',
      masked: 'key_live_b72c••••••••••••8819',
      created: '30 Aug 2026',
      lastUsed: '4m ago',
      role: 'Agent Invocation Only'
    },
    {
      id: 'k3',
      name: 'MSSQL DataBot Gateway Secret',
      key: 'key_live_54ed891045ba772cde0019910a',
      masked: 'key_live_54ed••••••••••••910a',
      created: '02 Oct 2026',
      lastUsed: '18m ago',
      role: 'DataBot SQL Execution'
    }
  ]);

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showRotateNotice, setShowRotateNotice] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const copyKey = (val: string, id: string) => {
    navigator.clipboard.writeText(val);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const rotateKey = (id: string) => {
    setKeys(prev => prev.map(k => {
      if (k.id === id) {
        const newSecret = 'key_live_' + Math.random().toString(36).substring(2, 18);
        return {
          ...k,
          key: newSecret,
          masked: newSecret.slice(0, 13) + '••••••••' + newSecret.slice(-4),
          created: 'Just now'
        };
      }
      return k;
    }));
    setShowRotateNotice(id);
    setTimeout(() => setShowRotateNotice(null), 2500);
  };

  const handleGenerateKey = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const newSecret = 'key_live_' + Math.random().toString(36).substring(2, 18);
      const newKey = {
        id: 'k-' + Date.now(),
        name: 'Custom Application Client Secret',
        key: newSecret,
        masked: newSecret.slice(0, 13) + '••••••••' + newSecret.slice(-4),
        created: 'Just now',
        lastUsed: 'Never',
        role: 'Standard Agent Query'
      };
      setKeys(prev => [newKey, ...prev]);
      setIsGenerating(false);
    }, 500);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-xl sm:text-2xl font-bold text-slate-900">API Keys & Sovereign Vault</h1>
            <span className="rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5">
              FIPS 140-3 HSM
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage, generate, and rotate cryptographic bearer tokens used by your applications to invoke Idrak agents
          </p>
        </div>

        <button
          onClick={handleGenerateKey}
          disabled={isGenerating}
          className="inline-flex items-center gap-1.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold px-3.5 py-2 shadow-2xs transition-colors cursor-pointer disabled:opacity-60"
        >
          <Plus className="size-3.5" />
          <span>{isGenerating ? 'Generating...' : 'Generate New Key'}</span>
        </button>
      </div>

      {/* Grid of separate clean colorful section cards */}
      <div className="home-widget-grid">

        {/* ================================================================= */}
        {/* CARD 1: Vault Overview Deck (Tone: Amber, Wide) */}
        {/* ================================================================= */}
        <div data-home-widget="vault-deck" data-tone="amber" className="home-widget home-widget-wide">
          <div className="home-widget-heading flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="home-widget-icon grid size-10 place-items-center rounded-xl bg-amber-100 text-amber-800 shadow-2xs">
                <Lock className="size-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">Cryptographic Key Security</h2>
                <p className="text-xs text-slate-500">Encrypted with dedicated Sovereign HSM · Zero plaintext retention</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-900 border border-amber-200/60">
              <ShieldCheck className="size-3.5 text-amber-700" />
              KSA Data Residency Certified
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
            <div className="home-record-row p-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Active Bearer Keys</span>
              <span className="font-display text-2xl font-bold text-slate-900 mt-1 block">{keys.length}</span>
              <span className="text-[10px] text-emerald-600 font-bold mt-1 block">All in good standing</span>
            </div>
            <div className="home-record-row p-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Rotation Policy</span>
              <span className="font-display text-2xl font-bold text-amber-800 mt-1 block">90 Days</span>
              <span className="text-[10px] text-slate-400 mt-1 block">Automated reminders</span>
            </div>
            <div className="home-record-row p-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">CIDR Enforced</span>
              <span className="font-display text-2xl font-bold text-emerald-600 mt-1 block">10.42.0.0/16</span>
              <span className="text-[10px] text-slate-400 mt-1 block">Internal VPC only</span>
            </div>
            <div className="home-record-row p-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Failed Auth Attempts</span>
              <span className="font-display text-2xl font-bold text-slate-900 mt-1 block">0 (24h)</span>
              <span className="text-[10px] text-emerald-600 font-bold mt-1 block">Zero brute force alerts</span>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* CARD 2: Active API Keys (Tone: Violet, Wide) */}
        {/* ================================================================= */}
        <div data-home-widget="active-keys" data-tone="violet" className="home-widget home-widget-wide">
          <div className="home-widget-heading flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="home-widget-icon grid size-10 place-items-center rounded-xl bg-violet-100 text-violet-800 shadow-2xs">
                <Key className="size-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">Active Bearer Tokens</h2>
                <p className="text-xs text-slate-500">Live authentication secrets used by enterprise gateways</p>
              </div>
            </div>
            <span className="rounded-full bg-violet-100 text-violet-800 text-[10px] font-bold px-2 py-0.5">
              {keys.length} Configured
            </span>
          </div>

          <div className="space-y-3">
            {keys.map((k) => (
              <div key={k.id} className="home-record-row p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 truncate">{k.name}</span>
                    <span className="rounded bg-violet-50 text-violet-700 px-2 py-0.2 text-[9px] font-bold shrink-0">
                      {k.role}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <code className="bg-slate-50 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 font-mono text-xs font-bold">
                      {k.masked}
                    </code>
                    <button
                      onClick={() => copyKey(k.key, k.id)}
                      className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
                      title="Copy Key"
                    >
                      {copiedId === k.id ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}
                    </button>
                    <button
                      onClick={() => rotateKey(k.id)}
                      className="p-1.5 rounded-lg hover:bg-violet-50 text-slate-400 hover:text-violet-700 transition-colors cursor-pointer"
                      title="Rotate Key Secret"
                    >
                      <RefreshCw className="size-3.5" />
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">Generated {k.created} · Last invoked {k.lastUsed}</p>
                  {showRotateNotice === k.id && (
                    <span className="text-[10px] font-bold text-emerald-600 mt-1 block">
                      ✓ Secret rotated successfully and updated across sovereign gateway!
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================================================================= */}
        {/* CARD 3: Scopes & Permissions Policy (Tone: Mint) */}
        {/* ================================================================= */}
        <div data-home-widget="scopes-policy" data-tone="mint" className="home-widget">
          <div className="home-widget-heading flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="home-widget-icon grid size-10 place-items-center rounded-xl bg-emerald-100 text-emerald-800 shadow-2xs">
                <ShieldCheck className="size-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">Scoped Permissions</h2>
                <p className="text-xs text-slate-500">Fine-grained role-based access control</p>
              </div>
            </div>
            <span className="rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5">
              Enforced
            </span>
          </div>

          <div className="space-y-2.5">
            {[
              { scope: 'telephony:sip:execute', desc: 'Allows bidirectional audio stream initiation', status: 'Restricted' },
              { scope: 'databot:sql:read', desc: 'Read-only access to approved dbo.vw_PayPeople views', status: 'Restricted' },
              { scope: 'rag:collection:query', desc: 'Vector cosine similarity search on knowledge docs', status: 'Allowed' },
            ].map((s, i) => (
              <div key={i} className="home-record-row p-3 flex items-center justify-between gap-3 text-xs">
                <div className="min-w-0 flex-1">
                  <code className="font-mono font-bold text-emerald-800 text-[11px] block truncate">{s.scope}</code>
                  <p className="text-[10px] text-slate-400 mt-0.5 truncate">{s.desc}</p>
                </div>
                <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full shrink-0">
                  {s.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ================================================================= */}
        {/* CARD 4: IP & Subnet Firewall (Tone: Cyan) */}
        {/* ================================================================= */}
        <div data-home-widget="ip-firewall" data-tone="cyan" className="home-widget">
          <div className="home-widget-heading flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="home-widget-icon grid size-10 place-items-center rounded-xl bg-sky-100 text-sky-800 shadow-2xs">
                <Globe className="size-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">CIDR Whitelist & Security</h2>
                <p className="text-xs text-slate-500">In-country IP range protection</p>
              </div>
            </div>
            <span className="rounded-full bg-sky-100 text-sky-800 text-[10px] font-bold px-2 py-0.5">
              Zero Egress
            </span>
          </div>

          <div className="space-y-2.5">
            {[
              { cidr: '10.42.0.0/16', label: 'Bilytica Sovereign Cloud Internal VPC', active: true },
              { cidr: '172.16.80.0/24', label: 'Riyadh Telecom Primary SIP Transit', active: true },
              { cidr: '192.168.100.0/24', label: 'PayPeople Core Gateway Interface', active: true },
            ].map((cidr, i) => (
              <div key={i} className="home-record-row p-3 flex items-center justify-between gap-3 text-xs">
                <div>
                  <code className="font-mono font-bold text-slate-900">{cidr.cidr}</code>
                  <p className="text-[10px] text-slate-400 mt-0.5">{cidr.label}</p>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  Whitelisted
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

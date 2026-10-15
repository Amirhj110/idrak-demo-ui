import React, { useState } from 'react';
import { X, Bot, Mic, MessageSquare, Sparkles, Check } from 'lucide-react';
import { AgentItem, AgentType } from '../types';

interface CreateAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateAgent: (agent: AgentItem) => void;
}

export const CreateAgentModal: React.FC<CreateAgentModalProps> = ({
  isOpen,
  onClose,
  onCreateAgent
}) => {
  const [name, setName] = useState('');
  const [nameAr, setNameAr] = useState('');
  const [type, setType] = useState<AgentType>('Voice');
  const [model, setModel] = useState('idraqv1-arabic-speech-2.5');
  const [language, setLanguage] = useState('ar · Saudi Najdi');
  const [systemPrompt, setSystemPrompt] = useState(
    'You are an enterprise sovereign AI agent built for Bilytica Global. Converse courteously, respect regional customs, and verify caller authorization before sharing confidential telemetry.'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newAgent: AgentItem = {
      id: `agent-${Date.now()}`,
      name,
      nameAr: nameAr || name,
      type,
      status: 'LIVE',
      conversationsCount: 0,
      ageBadge: 'Just now',
      systemPromptSnippet: systemPrompt.slice(0, 100) + '...',
      fullSystemPrompt: systemPrompt,
      apiKey: 'key_live_' + Math.random().toString(36).substring(2, 18),
      createdAt: new Date().toISOString().split('T')[0],
      model,
      temperature: 0.3,
      language,
      ownerId: 'usr-amir-hussain',
      firstMessageTemplate: type === 'Voice'
        ? 'مرحباً بك، كيف أقدر أخدمك اليوم؟'
        : 'Hello, how can I assist you with your request today?',
      iconBg: type === 'Voice' 
        ? 'bg-violet-100 text-violet-700 border-violet-200' 
        : type === 'Hybrid'
        ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
        : 'bg-sky-100 text-sky-700 border-sky-200',
      iconText: name.trim()[0]?.toUpperCase() || 'A',
      badgeBg: 'bg-violet-50 text-violet-700 border-violet-200',
      metrics7d: {
        totalConversations: 0,
        avgLatencyMs: type === 'Voice' ? 185 : 340,
        resolutionRate: 100,
        tokenVolume: 0
      },
      sparkline: [1, 2, 4, 8, 12, 15, 20]
    };

    onCreateAgent(newAgent);
    onClose();
    setName('');
    setNameAr('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/35 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-xl max-h-[90vh] rounded-[28px] bg-white shadow-[0_28px_100px_-28px_rgba(30,41,59,0.45)] border border-white/80 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
        <div className="relative flex items-center justify-between overflow-hidden px-6 py-5 border-b border-violet-100/80 bg-gradient-to-br from-violet-50 via-white to-sky-50">
          <span aria-hidden="true" className="pointer-events-none absolute -right-8 -top-12 size-36 rounded-full bg-violet-200/30 blur-2xl" />
          <div className="flex items-center gap-2.5">
            <div className="size-10 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white grid place-items-center shadow-md shadow-violet-200">
              <Bot className="size-5" />
            </div>
            <div>
              <h2 className="font-display text-base font-bold text-slate-900">Create an Idrak agent</h2>
              <p className="text-xs text-slate-500">Configure and deploy to your sovereign workspace</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="relative size-8 grid place-items-center rounded-xl text-slate-400 hover:bg-white/80 hover:text-slate-700"
          >
            <X className="size-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4 bg-[linear-gradient(180deg,#fff_0%,#fcfbff_100%)]">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Agent Modality</label>
            <div className="grid grid-cols-3 gap-2">
              {(['Voice', 'Chat', 'Hybrid'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    type === t ? 'border-violet-300 bg-gradient-to-br from-violet-50 to-indigo-50 text-violet-900 font-bold shadow-sm shadow-violet-100' : 'border-slate-200 bg-white hover:border-violet-200 hover:bg-violet-50/40 text-slate-700'
                  }`}
                >
                  <span className="text-xs">{t} Agent</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Agent Name (English) *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sultan - Customer Support"
                className="w-full rounded-xl border border-slate-200 bg-white/90 px-3 py-2.5 text-xs text-slate-800 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100/70"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Agent Name (Arabic)</label>
              <input
                type="text"
                value={nameAr}
                onChange={(e) => setNameAr(e.target.value)}
                placeholder="مثال: سلطان - خدمة العملاء"
                className="w-full rounded-xl border border-slate-200 bg-white/90 px-3 py-2.5 text-xs text-slate-800 font-arabic outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100/70"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Dialect Alignment</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white/90 px-3 py-2.5 text-xs text-slate-800 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100/70"
              >
                <option value="ar · Saudi Najdi">Arabic (Najdi - نجد)</option>
                <option value="ar · Saudi Hijazi">Arabic (Hijazi - حجاز)</option>
                <option value="ar · Khaleeji / Gulf">Arabic (Gulf - خليجي)</option>
                <option value="ar · Modern Standard">Modern Standard Arabic</option>
                <option value="Bilingual (ar / en)">Bilingual (Arabic & English)</option>
                <option value="en · Global Professional">Global English</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Model Backbone</label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white/90 px-3 py-2.5 text-xs text-slate-800 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100/70"
              >
                <option value="idraqv1-arabic-speech-2.5">idraqv1-arabic-speech-2.5 (185ms)</option>
                <option value="idraqv1-hybrid-flash">idraqv1-hybrid-flash (High Speed)</option>
                <option value="idraqv1-legal-moe-70b">idraqv1-legal-moe-70b (Regulatory)</option>
                <option value="idraqv1-sql-analyst">idraqv1-sql-analyst (MSSQL & ERP)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">System Instructions</label>
            <textarea
              rows={3}
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white/90 p-3 text-xs text-slate-800 font-mono outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100/70"
            />
          </div>

          <div className="pt-4 border-t border-violet-100/80 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-semibold hover:from-violet-700 hover:to-indigo-700 shadow-sm shadow-violet-200"
            >
              Provision Agent
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

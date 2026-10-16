import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Settings, 
  Share2, 
  Database, 
  Info, 
  Play, 
  ScrollText, 
  Copy, 
  Check, 
  MessageSquare, 
  Send, 
  Sparkles, 
  Code2, 
  CheckCircle2, 
  Globe2, 
  Cpu, 
  ShieldCheck,
  PhoneCall
} from 'lucide-react';
import { AgentItem, AgentDetailTab, RoutePath } from '../../types';
import { kbCollections } from '../../mockData';

interface AgentDetailsViewProps {
  agent: AgentItem;
  onBack: () => void;
  onNavigate: (route: RoutePath) => void;
  onOpenVoiceCall: () => void;
  onUpdateAgent: (updated: AgentItem) => void;
}

export const AgentDetailsView: React.FC<AgentDetailsViewProps> = ({
  agent,
  onBack,
  onNavigate,
  onOpenVoiceCall,
  onUpdateAgent
}) => {
  const [activeTab, setActiveTab] = useState<AgentDetailTab>('configure');
  const [copiedKey, setCopiedKey] = useState(false);

  // Configure Form State
  const [model, setModel] = useState(agent.model);
  const [temperature, setTemperature] = useState(agent.temperature);
  const [language, setLanguage] = useState(agent.language);
  const [systemPrompt, setSystemPrompt] = useState(agent.fullSystemPrompt);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Deploy Embed Format
  const [embedFormat, setEmbedFormat] = useState<'script' | 'react' | 'webhook'>('script');

  // Test Sandbox State
  const [testMessages, setTestMessages] = useState<Array<{ sender: 'user' | 'agent'; text: string; time: string }>>([
    {
      sender: 'agent',
      text: agent.firstMessageTemplate,
      time: '14:40'
    }
  ]);
  const [testInput, setTestInput] = useState('');

  const copyApiKey = () => {
    navigator.clipboard.writeText(agent.apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleSaveConfig = () => {
    onUpdateAgent({
      ...agent,
      model,
      temperature,
      language,
      fullSystemPrompt: systemPrompt,
      systemPromptSnippet: systemPrompt.slice(0, 100) + '...'
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleSendTestMessage = () => {
    if (!testInput.trim()) return;
    const userMsg = testInput;
    setTestMessages(prev => [
      ...prev, 
      { sender: 'user', text: userMsg, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
    setTestInput('');

    setTimeout(() => {
      const query = userMsg.toLowerCase();
      const reply = query.includes('knowledge') || query.includes('source')
        ? `This agent is connected to ${agent.knowledgeBaseName || 'the Idrak demo knowledge base'}. Configure its assigned collections in the Knowledge tab.`
        : query.includes('voice') || query.includes('لغة')
          ? `This ${agent.type.toLowerCase()} agent is configured for ${language}. Its model is ${model}.`
          : `Agent executed the sample prompt with temperature ${temperature}. Grounded in: ${agent.knowledgeBaseName || 'Base System'}.`;
      setTestMessages(prev => [
        ...prev, 
        { sender: 'agent', text: reply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);
    }, 450);
  };

  const embedCodes = {
    script: `<!-- Idrak Sovereign Agent Web Widget -->
<script 
  src="https://cdn.idrak.bilyticaglobal.com/v1/widget.js" 
  data-agent-id="${agent.id}" 
  data-api-key="${agent.apiKey}" 
  data-theme="light" 
  data-position="bottom-right"
  async>
</script>`,
    react: `import { IdrakAgentWidget } from '@bilytica/idrak-react';

export default function App() {
  return (
    <IdrakAgentWidget 
      agentId="${agent.id}"
      apiKey="${agent.apiKey}"
      region="sa-riyadh-1"
      onSessionStart={(id) => console.log('Session active:', id)}
    />
  );
}`,
    webhook: `POST https://api.idrak.bilyticaglobal.com/v1/agents/${agent.id}/invoke
Headers:
  Authorization: Bearer ${agent.apiKey}
  Content-Type: application/json
Body:
{
  "user_id": "usr_99182",
  "query": "Hello",
  "stream": false
}`
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="size-3.5" />
        <span>Back to Agents Studio</span>
      </button>

      {/* Header Showcase (As Specified) */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="size-14 rounded-2xl bg-gradient-to-tr from-violet-600 via-purple-600 to-indigo-600 text-white font-display text-2xl font-bold grid place-items-center shadow-md shadow-violet-200">
              {agent.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="font-display text-lg font-bold text-slate-900">{agent.name}</h1>
                <span className="rounded-full bg-emerald-100 text-emerald-800 text-[9px] font-extrabold px-2 py-0.5">
                  {agent.status}
                </span>
                <span className="rounded-full bg-violet-100 text-violet-800 text-[9px] font-bold px-2 py-0.5">
                  {agent.type} Agent
                </span>
              </div>
              <p className="text-xs text-slate-400 font-arabic mt-0.5">{agent.nameAr}</p>
              <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
                <span>Model: <strong className="text-slate-800">{agent.model}</strong></span>
                <span>·</span>
                <span>Owner: {agent.ownerId}</span>
                <span>·</span>
                <span>Created: {agent.createdAt}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions (Edit, Copy Key, Open Chat) */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={copyApiKey}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:border-violet-300 hover:text-violet-700 shadow-2xs transition-colors"
            >
              {copiedKey ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}
              <span>{copiedKey ? 'Key Copied!' : 'Copy Key'}</span>
            </button>
            <button
              onClick={() => setActiveTab('configure')}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-2xs transition-colors"
            >
              <Settings className="size-3.5 text-slate-500" />
              <span>Edit Agent</span>
            </button>
            <button
              onClick={() => onNavigate('/app/agents/ask')}
              className="flex items-center gap-1.5 rounded-xl bg-violet-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-violet-700 shadow-sm shadow-violet-200 transition-all"
            >
              <MessageSquare className="size-3.5" />
              <span>Open Chat</span>
            </button>
            {agent.type === 'Voice' && (
              <button
                onClick={onOpenVoiceCall}
                className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-700 shadow-2xs transition-all"
              >
                <PhoneCall className="size-3.5" />
                <span>Voice Simulator</span>
              </button>
            )}
          </div>
        </div>

        {/* Dedicated Interactive Sub-Tabs (As Specified: 6 tabs) */}
        <div className="flex items-center gap-2 mt-6 pt-2 border-t border-slate-100 overflow-x-auto [scrollbar-width:none]">
          {[
            { id: 'configure' as AgentDetailTab, label: '1. Configure', icon: Settings },
            { id: 'deploy' as AgentDetailTab, label: '2. Deploy & Embed', icon: Share2 },
            { id: 'knowledge' as AgentDetailTab, label: '3. Knowledge RAG', icon: Database },
            { id: 'details' as AgentDetailTab, label: '4. Details & Profile', icon: Info },
            { id: 'test' as AgentDetailTab, label: '5. Test Playground', icon: Play },
            { id: 'logs' as AgentDetailTab, label: '6. Real-Time Logs', icon: ScrollText },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                  isActive
                    ? 'bg-violet-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className="size-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sub-Tab 1: CONFIGURE */}
      {activeTab === 'configure' && (
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-2xs space-y-5">
          <div>
            <h2 className="font-display text-base font-bold text-slate-900">Agent Configuration</h2>
            <p className="text-xs text-slate-500">Tune model parameters, reasoning prompts, and acoustic dialect assignments</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Backbone LLM Architecture</label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800 outline-none focus:border-violet-500 bg-white"
              >
                <option value="idraqv1-arabic-speech-2.5">idraqv1-arabic-speech-2.5 (Sub-200ms)</option>
                <option value="idraqv1-hybrid-flash">idraqv1-hybrid-flash (High Speed)</option>
                <option value="idraqv1-legal-moe-70b">idraqv1-legal-moe-70b (Sovereign Reasoning)</option>
                <option value="idraqv1-sql-analyst">idraqv1-sql-analyst (MSSQL & PostgreSQL)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Temperature ({temperature})
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full accent-violet-600 mt-2"
              />
              <span className="text-[10px] text-slate-400">0.0 (Deterministic) - 1.0 (Creative)</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Language & Dialect</label>
              <input
                type="text"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800 outline-none focus:border-violet-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">System Instructions Prompt</label>
            <textarea
              rows={6}
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              className="w-full rounded-xl border border-slate-200 p-3 text-xs text-slate-800 font-mono outline-none focus:border-violet-500 leading-relaxed"
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            {saveSuccess && (
              <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                <CheckCircle2 className="size-4" /> Configuration saved to cluster!
              </span>
            )}
            <button
              onClick={handleSaveConfig}
              className="ml-auto rounded-xl bg-violet-600 px-4 py-2 text-xs font-semibold text-white hover:bg-violet-700 transition-colors shadow-2xs"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* Sub-Tab 2: DEPLOY */}
      {activeTab === 'deploy' && (
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-base font-bold text-slate-900">Channel Integration & Web Embed</h2>
              <p className="text-xs text-slate-500">Deploy this agent into internal intranets, mobile apps, or web portals</p>
            </div>
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
              {(['script', 'react', 'webhook'] as const).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setEmbedFormat(fmt)}
                  className={`px-3 py-1 rounded-lg uppercase text-[10px] font-bold transition-all ${
                    embedFormat === fmt ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-slate-950 p-4 font-mono text-xs text-violet-300 relative leading-relaxed overflow-x-auto">
            <pre>{embedCodes[embedFormat]}</pre>
          </div>
          <p className="text-xs text-slate-500">
            All calls are cryptographically signed via your API key and verified by the Riyadh Sovereign Gateway.
          </p>
        </div>
      )}

      {/* Sub-Tab 3: KNOWLEDGE */}
      {activeTab === 'knowledge' && (
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-2xs space-y-4">
          <div>
            <h2 className="font-display text-base font-bold text-slate-900">Assigned RAG Collections</h2>
            <p className="text-xs text-slate-500">Select which enterprise vector collections this agent has retrieval authorization for</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {kbCollections.map((col) => {
              const isAssigned = agent.knowledgeBaseId === col.id;
              return (
                <div
                  key={col.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    isAssigned ? 'border-violet-500 bg-violet-50/30 ring-2 ring-violet-500/10' : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-900">{col.name}</span>
                    <span className="font-mono text-[10px] text-violet-700 bg-violet-100 px-2 py-0.5 rounded font-bold">
                      {col.chunksCount} chunks
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-2">{col.description}</p>
                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[10px] text-slate-400">{col.size}</span>
                    <button
                      onClick={() => onUpdateAgent({ ...agent, knowledgeBaseId: col.id, knowledgeBaseName: col.name })}
                      className={`text-[11px] font-bold ${isAssigned ? 'text-emerald-700' : 'text-violet-600 hover:underline'}`}
                    >
                      {isAssigned ? '✓ Connected' : 'Connect Collection'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Sub-Tab 4: DETAILS */}
      {activeTab === 'details' && (
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-2xs space-y-4">
          <h2 className="font-display text-base font-bold text-slate-900">Runtime Profile & 7-Day Performance</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">7-Day Conversations</span>
              <span className="font-display text-xl font-bold text-slate-900 mt-1 block">
                {agent.metrics7d.totalConversations.toLocaleString()}
              </span>
            </div>
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Mean Latency</span>
              <span className="font-display text-xl font-bold text-violet-700 mt-1 block">
                {agent.metrics7d.avgLatencyMs} ms
              </span>
            </div>
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Resolution Rate</span>
              <span className="font-display text-xl font-bold text-emerald-600 mt-1 block">
                {agent.metrics7d.resolutionRate}%
              </span>
            </div>
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Token Volume</span>
              <span className="font-display text-xl font-bold text-slate-900 mt-1 block">
                {(agent.metrics7d.tokenVolume / 1000).toFixed(0)}k
              </span>
            </div>
          </div>

          <div className="pt-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">First Message Template</p>
            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-700 font-arabic">
              "{agent.firstMessageTemplate}"
            </div>
          </div>
        </div>
      )}

      {/* Sub-Tab 5: TEST / PLAYGROUND */}
      {activeTab === 'test' && (
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-2xs h-96 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-900">Sandbox Playground: {agent.name}</span>
            <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              Live Sovereign Sandbox
            </span>
          </div>

          <div className="flex-1 overflow-y-auto py-3 space-y-3">
            {testMessages.map((m, i) => (
              <div key={i} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${
                  m.sender === 'user' ? 'bg-violet-600 text-white rounded-br-xs' : 'bg-slate-100 text-slate-800 rounded-bl-xs font-arabic'
                }`}>
                  {m.text}
                </div>
                <span className="text-[9px] text-slate-400 mt-0.5">{m.time}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
            <input
              type="text"
              value={testInput}
              onChange={(e) => setTestInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendTestMessage()}
              placeholder="Test agent prompt response in real-time..."
              className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800 outline-none focus:border-violet-500"
            />
            <button
              onClick={handleSendTestMessage}
              disabled={!testInput.trim()}
              className="size-8 rounded-xl bg-violet-600 text-white grid place-items-center disabled:opacity-40 hover:bg-violet-700"
            >
              <Send className="size-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Sub-Tab 6: LOGS */}
      {activeTab === 'logs' && (
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-2xs space-y-3">
          <h2 className="font-display text-base font-bold text-slate-900">Real-Time Request & Token Audit Logs</h2>
          <div className="divide-y divide-slate-100 text-xs">
            {[
              { time: 'Just now', query: 'رصيد البطاقة الائتمانية', tokens: 382, latency: '485ms', status: '200 OK' },
              { time: '2m ago', query: 'استفسار عن إجازات الموارد البشرية', tokens: 215, latency: '390ms', status: '200 OK' },
              { time: '8m ago', query: 'تحقق من هوية العميل', tokens: 290, latency: '410ms', status: '200 OK' },
            ].map((log, i) => (
              <div key={i} className="py-2.5 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800 font-arabic">"{log.query}"</span>
                  <span className="text-[10px] text-slate-400 block">{log.time}</span>
                </div>
                <div className="flex items-center gap-3 font-mono text-[11px]">
                  <span>{log.tokens} tokens</span>
                  <span className="text-violet-600 font-bold">{log.latency}</span>
                  <span className="text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">{log.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

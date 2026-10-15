import React, { useState } from 'react';
import { 
  Table2, 
  Terminal, 
  Send, 
  Database, 
  ShieldAlert, 
  Volume2, 
  Code2, 
  RotateCcw, 
  CheckCircle2, 
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Lock
} from 'lucide-react';
import { initialDataBots } from '../../mockData';
import { DataBotItem } from '../../types';

export const DataBotView: React.FC = () => {
  const [selectedBotId, setSelectedBotId] = useState<string>('dbot-hr');
  const [responseLanguage, setResponseLanguage] = useState<string>('auto');
  const [speakReplies, setSpeakReplies] = useState<boolean>(false);
  const [showSqlDebug, setShowSqlDebug] = useState<boolean>(true);
  const [inputQuery, setInputQuery] = useState('');

  const [chatMessages, setChatMessages] = useState<Array<{
    id: string;
    sender: 'user' | 'bot';
    text: string;
    sqlQuery?: string;
    tableData?: { headers: string[]; rows: (string | number)[][] };
    time: string;
  }>>([
    {
      id: 'd1',
      sender: 'bot',
      text: 'Connected to MSSQL view `dbo.vw_PayPeople_EmployeeLeaveBalances`. Ask me about employee annual leaves, department totals, or biometric balance records in natural language.',
      time: '14:40'
    },
    {
      id: 'd2',
      sender: 'user',
      text: 'Show top 4 departments by total annual leave days taken this year.',
      time: '14:41'
    },
    {
      id: 'd3',
      sender: 'bot',
      text: 'Executed aggregate query across 420 active employee rows. Software Engineering leads with 142 total leave days taken.',
      sqlQuery: `SELECT department_name, SUM(annual_leaves_taken) AS total_leaves, COUNT(employee_id) AS headcount \nFROM dbo.vw_PayPeople_EmployeeLeaveBalances \nGROUP BY department_name \nORDER BY total_leaves DESC;`,
      tableData: {
        headers: ['Department', 'Total Leaves Taken', 'Headcount', 'Avg / Person'],
        rows: [
          ['Software Engineering', 142, 38, '3.7 days'],
          ['Enterprise Sales', 98, 24, '4.1 days'],
          ['Operations & IT', 64, 19, '3.4 days'],
          ['Human Capital (HR)', 42, 12, '3.5 days']
        ]
      },
      time: '14:41'
    }
  ]);

  const selectedBot = initialDataBots.find(b => b.id === selectedBotId) || initialDataBots[0];

  const handleSendQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;

    const userText = inputQuery;
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newMsgs = [
      ...chatMessages,
      {
        id: `m-${Date.now()}`,
        sender: 'user' as const,
        text: userText,
        time: nowTime
      }
    ];
    setChatMessages(newMsgs);
    setInputQuery('');

    setTimeout(() => {
      setChatMessages([
        ...newMsgs,
        {
          id: `m-bot-${Date.now()}`,
          sender: 'bot' as const,
          text: `Executed read-only query on ${selectedBot.connectedView}. Results returned in 28ms.`,
          sqlQuery: `SELECT TOP 4 employee_id, full_name, department_name, annual_leave_balance \nFROM ${selectedBot.connectedView} \nWHERE department_name LIKE '%${userText.slice(0, 3)}%' OR full_name LIKE '%${userText.slice(0, 3)}%' \nORDER BY annual_leave_balance DESC;`,
          tableData: {
            headers: ['Employee ID', 'Full Name', 'Department', 'Balance'],
            rows: [
              ['EMP-1001', 'Amir Hussain', 'AI Solutions', '18.5 days'],
              ['EMP-1002', 'Sara Al-Mansoor', 'Voice Eng', '21.0 days'],
              ['EMP-1003', 'Tariq Mahmood', 'Compliance', '14.0 days'],
              ['EMP-1004', 'Bilal Qureshi', 'Human Capital', '16.5 days']
            ]
          },
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 400);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-xl sm:text-2xl font-bold text-slate-900">DataBot (Natural Language SQL)</h1>
            <span className="rounded-full bg-sky-100 text-sky-800 text-[10px] font-bold px-2 py-0.5">
              MSSQL Read-Only
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Query PayPeople relational database views securely via Idrak DataBot APIs without exposing raw database credentials
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedBotId}
            onChange={(e) => setSelectedBotId(e.target.value)}
            className="font-bold text-slate-900 rounded-xl border border-slate-200 bg-white px-3 py-1.5 outline-none focus:border-violet-500 text-xs shadow-2xs"
          >
            {initialDataBots.map((b) => (
              <option key={b.id} value={b.id}>{b.name} ({b.databaseEngine})</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid of separate clean colorful section cards */}
      <div className="home-widget-grid">

        {/* ================================================================= */}
        {/* CARD 1: DataBot Status & Isolation Deck (Tone: Cyan, Wide) */}
        {/* ================================================================= */}
        <div data-home-widget="databot-hero" data-tone="cyan" className="home-widget home-widget-wide">
          <div className="home-widget-heading flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="home-widget-icon grid size-10 place-items-center rounded-xl bg-sky-100 text-sky-800 shadow-2xs">
                <Database className="size-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">PayPeople HRMS SQL View Gateway</h2>
                <p className="text-xs text-slate-500">Autonomous Text-to-SQL transpilation with AST validation</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 border border-emerald-100">
              <Lock className="size-3 text-emerald-600" />
              Zero Write-Access Enforced
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
            <div className="home-record-row p-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Target View</span>
              <code className="font-mono text-xs font-bold text-slate-900 mt-1 block truncate">dbo.vw_PayPeople</code>
              <span className="text-[10px] text-emerald-600 font-bold mt-1 block">AlwaysEncrypted</span>
            </div>
            <div className="home-record-row p-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Query Response Time</span>
              <span className="font-display text-2xl font-bold text-sky-700 mt-1 block">28 ms</span>
              <span className="text-[10px] text-emerald-600 font-bold mt-1 block">In-memory index seek</span>
            </div>
            <div className="home-record-row p-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Cached Rows</span>
              <span className="font-display text-2xl font-bold text-slate-900 mt-1 block">420</span>
              <span className="text-[10px] text-slate-400 mt-1 block">Employee records</span>
            </div>
            <div className="home-record-row p-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">SQL Injection Shield</span>
              <span className="font-display text-2xl font-bold text-emerald-600 mt-1 block">100%</span>
              <span className="text-[10px] text-emerald-600 font-bold mt-1 block">AST parse validation</span>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* CARD 2: Interactive Query Console (Tone: Violet, Wide) */}
        {/* ================================================================= */}
        <div data-home-widget="databot-chat" data-tone="violet" className="home-widget home-widget-wide">
          <div className="home-widget-heading flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="home-widget-icon grid size-10 place-items-center rounded-xl bg-violet-100 text-violet-800 shadow-2xs">
                <Table2 className="size-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">Natural Language Query Console</h2>
                <p className="text-xs text-slate-500">Ask questions in Arabic or English to generate instant table aggregations</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1.5 cursor-pointer text-slate-600 text-xs">
                <input
                  type="checkbox"
                  checked={showSqlDebug}
                  onChange={(e) => setShowSqlDebug(e.target.checked)}
                  className="rounded border-slate-300 text-violet-600"
                />
                <Code2 className="size-3.5 text-violet-600" />
                <span className="text-[11px] font-semibold">Show Generated SQL</span>
              </label>
            </div>
          </div>

          {/* Conversation stream */}
          <div className="space-y-3.5 max-h-[420px] overflow-y-auto pr-1 mb-4">
            {chatMessages.map((m) => (
              <div key={m.id} className="home-record-row p-3.5 flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className={`size-2 rounded-full ${m.sender === 'user' ? 'bg-slate-400' : 'bg-emerald-500'}`} />
                    <span className="font-bold text-slate-900">{m.sender === 'user' ? 'You' : selectedBot.name}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">{m.time}</span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed font-medium">{m.text}</p>

                {showSqlDebug && m.sqlQuery && (
                  <div className="bg-slate-950 p-2.5 rounded-xl font-mono text-[11px] text-slate-300 overflow-x-auto border border-slate-900">
                    <span className="text-violet-400 font-bold block mb-1">Generated Read-Only SQL:</span>
                    <pre className="text-slate-300 font-mono">{m.sqlQuery}</pre>
                  </div>
                )}

                {m.tableData && (
                  <div className="rounded-xl border border-slate-200 overflow-hidden mt-1 bg-white">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100">
                        <tr>
                          {m.tableData.headers.map((h, i) => (
                            <th key={i} className="py-2 px-3">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                        {m.tableData.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-slate-50/60">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="py-2 px-3">{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input Bar */}
          <form onSubmit={handleSendQuery} className="flex items-center gap-2">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="e.g. How many employees have more than 20 days of leave left in Engineering?"
              className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-800 outline-none focus:border-violet-500 shadow-2xs"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <Send className="size-3.5" />
              <span>Query</span>
            </button>
          </form>
        </div>

        {/* ================================================================= */}
        {/* CARD 3: Connected Schema Introspection (Tone: Mint) */}
        {/* ================================================================= */}
        <div data-home-widget="schema-card" data-tone="mint" className="home-widget">
          <div className="home-widget-heading flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="home-widget-icon grid size-10 place-items-center rounded-xl bg-emerald-100 text-emerald-800 shadow-2xs">
                <Layers className="size-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">Active DDL Views</h2>
                <p className="text-xs text-slate-500">Introspected columns and indexes</p>
              </div>
            </div>
            <span className="rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5">
              3 Views
            </span>
          </div>

          <div className="space-y-2.5">
            {[
              { name: 'dbo.vw_PayPeople_EmployeeLeaveBalances', cols: 'employee_id, full_name, annual_leaves, balance', rows: '420 rows' },
              { name: 'dbo.vw_PayPeople_DepartmentHeadcounts', cols: 'department_name, total_headcount, active_count', rows: '14 rows' },
              { name: 'dbo.vw_PayPeople_BiometricPunches', cols: 'punch_id, employee_id, check_in_time, device_id', rows: '1,280 rows' },
            ].map((v, i) => (
              <div key={i} className="home-record-row p-3 flex flex-col gap-1 text-xs">
                <span className="font-mono font-bold text-slate-900 text-[11px] truncate">{v.name}</span>
                <span className="text-[10px] text-slate-400 font-mono truncate">{v.cols}</span>
                <div className="flex justify-between items-center text-[10px] text-emerald-700 font-semibold pt-1 border-t border-slate-100">
                  <span>{v.rows}</span>
                  <span>Indexed</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================================================================= */}
        {/* CARD 4: Suggested Natural Language Queries (Tone: Pink) */}
        {/* ================================================================= */}
        <div data-home-widget="sample-queries" data-tone="pink" className="home-widget">
          <div className="home-widget-heading flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="home-widget-icon grid size-10 place-items-center rounded-xl bg-rose-100 text-rose-800 shadow-2xs">
                <Sparkles className="size-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">Prompt Shortcuts</h2>
                <p className="text-xs text-slate-500">Click to instantly populate query bar</p>
              </div>
            </div>
            <span className="rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.5">
              Quick Test
            </span>
          </div>

          <div className="space-y-2.5">
            {[
              'Show employees with annual leave balance greater than 20 days.',
              'Calculate average sick leaves taken by Department.',
              'List any biometric check-in anomalies recorded this week.',
            ].map((prompt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setInputQuery(prompt)}
                className="home-record-row p-3 text-left w-full text-xs text-slate-700 hover:text-rose-700 font-medium transition-colors cursor-pointer flex items-center justify-between gap-2"
              >
                <span className="truncate">"{prompt}"</span>
                <ArrowRight className="size-3 text-rose-500 shrink-0" />
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

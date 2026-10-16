import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowUp,
  ArrowUpRight,
  Bot,
  Check,
  CheckCheck,
  ChevronDown,
  Copy,
  Database,
  Globe2,
  MessageSquarePlus,
  MoreHorizontal,
  Plus,
  ShieldCheck,
  Sparkles,
  SquarePen,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { AgentItem, RoutePath } from '../../types';

interface AskAgentPlaygroundViewProps {
  agents: AgentItem[];
  onNavigate: (route: RoutePath) => void;
  initialAgentId?: string;
  isModal?: boolean;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  time: string;
  groundedIn?: string;
}

interface ChatSession {
  id: string;
  title: string;
  agentId: string;
  updatedAt: string;
  messages: ChatMessage[];
}

const suggestions = [
  'Summarize this week’s agent activity',
  'What sources inform this agent?',
  'How do I keep answers grounded?',
];

export const AskAgentPlaygroundView: React.FC<AskAgentPlaygroundViewProps> = ({
  agents,
  onNavigate,
  initialAgentId,
  isModal = false,
}) => {
  const firstAgent = agents.find((agent) => agent.id === initialAgentId) || agents[0];
  const [selectedAgentId, setSelectedAgentId] = useState(firstAgent?.id || '');
  const [inputText, setInputText] = useState('');
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [sessions, setSessions] = useState<ChatSession[]>(() => [
    {
      id: 'sess-1',
      title: 'Getting started with Idrak',
      agentId: firstAgent?.id || '',
      updatedAt: 'Just now',
      messages: [
        {
          id: 'm1',
          sender: 'agent',
          text:
            firstAgent?.firstMessageTemplate ||
            'Hello! I’m your Idrak assistant. Ask a question to explore the demo.',
          time: 'Now',
          groundedIn: firstAgent?.knowledgeBaseName || 'Idrak demo knowledge',
        },
        {
          id: 'm2',
          sender: 'user',
          text: 'What can this agent help me with?',
          time: 'Now',
        },
        {
          id: 'm3',
          sender: 'agent',
          text:
            'I can answer questions using my assigned knowledge, help you explore your Idrak setup, and demonstrate how grounded responses work. Try asking about a topic in the sample knowledge base.',
          time: 'Now',
          groundedIn: firstAgent?.knowledgeBaseName || 'Idrak demo knowledge',
        },
      ],
    },
    {
      id: 'sess-2',
      title: 'Knowledge base and sources',
      agentId: agents[1]?.id || firstAgent?.id || '',
      updatedAt: 'Yesterday',
      messages: [
        {
          id: 'm21',
          sender: 'agent',
          text: 'I can help you explore the connected knowledge sources and how Idrak uses them to ground answers.',
          time: 'Yesterday',
          groundedIn: agents[1]?.knowledgeBaseName || 'Sample knowledge base',
        },
      ],
    },
  ]);
  const [activeSessionId, setActiveSessionId] = useState('sess-1');
  const messageListRef = useRef<HTMLDivElement>(null);
  const currentSession = sessions.find((session) => session.id === activeSessionId) || sessions[0];
  const currentAgent =
    agents.find((agent) => agent.id === selectedAgentId) ||
    agents.find((agent) => agent.id === currentSession?.agentId) ||
    firstAgent;
  const canSpeak = typeof window !== 'undefined' && 'speechSynthesis' in window;

  useEffect(() => {
    if (!currentSession) return;
    setSelectedAgentId(currentSession.agentId);
  }, [currentSession?.id, currentSession?.agentId]);

  useEffect(() => {
    messageListRef.current?.scrollTo({
      top: messageListRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [currentSession?.messages.length, isTyping]);

  useEffect(() => () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  const handleCreateNewChat = () => {
    if (!currentAgent) return;
    const id = `sess-${Date.now()}`;
    const session: ChatSession = {
      id,
      title: 'New conversation',
      agentId: currentAgent.id,
      updatedAt: 'Just now',
      messages: [
        {
          id: `msg-${Date.now()}`,
          sender: 'agent',
          text: currentAgent.firstMessageTemplate || 'Hello, how can I help you?',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          groundedIn: currentAgent.knowledgeBaseName || 'Idrak demo knowledge',
        },
      ],
    };
    setSessions((previous) => [session, ...previous]);
    setActiveSessionId(id);
    setSelectedAgentId(currentAgent.id);
  };

  const handleSendMessage = (event?: React.FormEvent, promptedText?: string) => {
    event?.preventDefault();
    const userText = (promptedText || inputText).trim();
    if (!userText || !currentSession || !currentAgent || isTyping) return;

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: userText,
      time: now,
    };
    const updatedMessages = [...currentSession.messages, userMessage];
    const defaultTitle = userText.length > 32 ? `${userText.slice(0, 32)}…` : userText;

    setSessions((previous) =>
      previous.map((session) =>
        session.id === activeSessionId
          ? {
              ...session,
              title: session.messages.length <= 1 ? defaultTitle : session.title,
              messages: updatedMessages,
              updatedAt: 'Just now',
            }
          : session,
      ),
    );
    setInputText('');
    setIsTyping(true);

    window.setTimeout(() => {
      const query = userText.toLowerCase();
      const agentReply = query.includes('voice') || query.includes('dialect')
          ? 'Idrak supports multilingual voice experiences, including Arabic dialects and English. You can configure the voice, language, and agent behavior in Voice Studio.'
          : query.includes('source') || query.includes('knowledge')
            ? `This agent is connected to ${currentAgent.knowledgeBaseName || 'the sample Idrak knowledge base'}. A production answer can cite the specific document and passage used for grounding.`
            : `I’ve understood your question. In this demo, ${currentAgent.name} responds with sample content; in a connected Idrak workspace, it uses its assigned model, tools, and knowledge sources to produce a grounded answer.`;
      const reply: ChatMessage = {
        id: `reply-${Date.now()}`,
        sender: 'agent',
        text: agentReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        groundedIn: currentAgent.knowledgeBaseName || 'Idrak demo knowledge',
      };
      setSessions((previous) =>
        previous.map((session) =>
          session.id === activeSessionId
            ? { ...session, messages: [...updatedMessages, reply], updatedAt: 'Just now' }
            : session,
        ),
      );
      setIsTyping(false);
    }, 650);
  };

  const copyMessage = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMsgId(id);
      window.setTimeout(() => setCopiedMsgId(null), 1800);
    } catch (error) {
      console.error('Could not copy chat message', error);
    }
  };

  const handleAgentChange = (agentId: string) => {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
    setSelectedAgentId(agentId);
    setSessions((previous) =>
      previous.map((session) =>
        session.id === activeSessionId ? { ...session, agentId } : session,
      ),
    );
  };

  const handleVoicePreview = () => {
    if (!canSpeak || !currentAgent || !currentSession) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const latestAgentMessage = [...currentSession.messages].reverse().find((message) => message.sender === 'agent');
    if (!latestAgentMessage) return;
    const utterance = new SpeechSynthesisUtterance(latestAgentMessage.text);
    utterance.lang = /arabic|عربي/i.test(currentAgent.language) ? 'ar-SA' : 'en-US';
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    utterance.onstart = () => setIsSpeaking(true);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  if (!currentAgent || !currentSession) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <span className="grid size-12 place-items-center rounded-2xl bg-violet-50 text-violet-700"><Bot className="size-6" /></span>
        <h1 className="mt-4 font-display text-xl font-semibold text-slate-900">Your agent workspace is ready</h1>
        <p className="mt-2 max-w-md text-xs leading-5 text-slate-500">Create an agent first, then return here to try Ask Idrak.</p>
      </section>
    );
  }

  return (
    <section className={`ask-studio mx-auto flex min-h-[620px] h-[calc(100vh-124px)] max-h-[920px] max-w-[1500px] flex-col gap-4 ${isModal ? 'ask-studio-modal' : ''}`}>
      <div className="relative flex shrink-0 flex-wrap items-center justify-between gap-4 overflow-hidden rounded-[20px] border border-violet-100/80 bg-gradient-to-r from-violet-50/90 via-white to-sky-50/90 px-4 py-3.5 shadow-[0_8px_28px_-24px_rgba(109,40,217,0.35)] sm:px-5">
        <span aria-hidden="true" className="pointer-events-none absolute -right-8 -top-16 size-40 rounded-full bg-violet-200/25 blur-3xl" />
        <div className="relative flex min-w-0 items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-white text-violet-700 shadow-sm ring-1 ring-violet-100"><Sparkles className="size-5" /></span>
          <div className="min-w-0">
            <div className="mb-0.5 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.13em] text-violet-600">
              <span>Idrak AI playground</span>
              <span className="rounded-full bg-white/80 px-2 py-0.5 text-[8px] font-bold tracking-wider text-slate-500 ring-1 ring-slate-200/70">Demo</span>
            </div>
            <h1 className="font-display text-[19px] font-semibold leading-tight tracking-tight text-slate-900 sm:text-[22px]">Ask Idrak anything</h1>
            <p className="mb-0 mt-1 text-[10px] text-slate-500 sm:text-[11px]">
              Explore grounded, multilingual conversations with your agents.
            </p>
          </div>
        </div>
        <div className="relative hidden items-center gap-2 sm:flex">
          <span className="rounded-full border border-white bg-white/75 px-2.5 py-1.5 text-[9px] font-medium text-slate-600 shadow-sm">Grounded in your knowledge</span>
          <span className="rounded-full border border-emerald-100 bg-emerald-50/80 px-2.5 py-1.5 text-[9px] font-semibold text-emerald-800">
            <span className="mr-1.5 inline-block size-1.5 rounded-full bg-emerald-500" />
            Sample environment
          </span>
        </div>
      </div>

      <div className="ask-studio-layout grid min-h-0 flex-1 gap-3">
        <aside className="ask-session-panel flex min-h-0 flex-col overflow-hidden rounded-[20px] border border-slate-200/80 bg-white p-3.5 shadow-[0_6px_24px_-20px_rgba(51,65,85,0.32)]">
          <button
            onClick={handleCreateNewChat}
            className="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-xl bg-violet-600 px-3 text-[10px] font-semibold text-white shadow-sm shadow-violet-200 transition hover:bg-violet-700"
          >
            <MessageSquarePlus className="size-3.5" />
            New conversation
          </button>
          <div className="mb-2 mt-4 flex items-center justify-between px-1">
            <p className="mb-0 text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">Recent chats</p>
            <button aria-label="More conversation options" className="rounded-lg p-1 text-slate-400 hover:bg-slate-50 hover:text-slate-700">
              <MoreHorizontal className="size-4" />
            </button>
          </div>
          <div className="min-h-0 flex-1 space-y-1 overflow-y-auto">
            {sessions.map((session) => {
              const selected = session.id === activeSessionId;
              return (
                <button
                  key={session.id}
                  onClick={() => setActiveSessionId(session.id)}
                  aria-current={selected ? 'true' : undefined}
                  className={`group w-full rounded-xl border px-2.5 py-2.5 text-left transition ${
                    selected
                      ? 'border-violet-100 bg-violet-50/80 text-violet-900'
                      : 'border-transparent text-slate-600 hover:border-slate-100 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-start gap-2">
                    <span className={`mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg ${
                      selected ? 'bg-white text-violet-700' : 'bg-slate-100 text-slate-500'
                    }`}><Bot className="size-3.5" /></span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[10px] font-semibold">{session.title}</span>
                      <span className="mt-1 block text-[9px] font-normal text-slate-400">{session.updatedAt}</span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
          <div className="mt-3 flex shrink-0 items-center gap-2 border-t border-slate-100 pt-3">
            <span className="grid size-8 place-items-center rounded-xl bg-violet-50 text-violet-700"><Sparkles className="size-4" /></span>
            <span className="min-w-0 flex-1">
              <span className="block text-[9px] font-semibold text-slate-700">Idrak Ask Studio</span>
              <span className="mt-0.5 block text-[8px] text-slate-400">Private demo session</span>
            </span>
            <span className="rounded-full bg-emerald-50 px-2 py-1 text-[8px] font-semibold text-emerald-700">Ready</span>
          </div>
        </aside>

        <div className="ask-chat-panel flex min-h-0 flex-1 flex-col overflow-hidden rounded-[20px] border border-slate-200/80 bg-white shadow-[0_6px_24px_-20px_rgba(51,65,85,0.32)]">
          <header className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-slate-100 bg-white px-4 py-3 sm:px-5">
            <div className="flex min-w-0 items-center gap-3">
              <span className={`grid size-10 shrink-0 place-items-center rounded-[14px] border text-sm font-bold ${currentAgent.iconBg}`}>
                {currentAgent.iconText}
              </span>
              <div className="min-w-0">
                <label htmlFor="ask-agent-select" className="sr-only">Choose an agent</label>
                <div className="flex min-w-0 items-center gap-2">
                  <select
                    id="ask-agent-select"
                    value={currentAgent.id}
                    onChange={(event) => handleAgentChange(event.target.value)}
                    className="max-w-[230px] truncate border-0 bg-transparent p-0 font-display text-[12px] font-semibold text-slate-800 outline-none focus:ring-0"
                  >
                    {agents.map((agent) => <option key={agent.id} value={agent.id}>{agent.name}</option>)}
                  </select>
                  <ChevronDown className="size-3 shrink-0 text-slate-400" />
                </div>
                <p className="mb-0 mt-1 truncate text-[9px] text-slate-400">{currentAgent.type} agent · {currentAgent.language}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1.5 text-[9px] font-semibold text-emerald-700 sm:inline-flex">
                <span className="size-1.5 rounded-full bg-emerald-500" /> Online
              </div>
              <button
                onClick={() => onNavigate('/app/agents/details')}
                className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 text-[9px] font-semibold text-slate-600 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
              >
                <SquarePen className="size-3" /><span className="hidden sm:inline">Agent details</span>
              </button>
              {currentAgent.type !== 'Chat' && (
                <button
                  type="button"
                  onClick={handleVoicePreview}
                  disabled={!canSpeak}
                  title={canSpeak ? 'Play a voice preview of the latest agent response' : 'Speech playback is not available in this browser'}
                  className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-violet-100 bg-violet-50/70 px-2.5 text-[9px] font-semibold text-violet-700 transition hover:bg-violet-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSpeaking ? <VolumeX className="size-3" /> : <Volume2 className="size-3" />}
                  <span className="hidden sm:inline">{isSpeaking ? 'Stop voice' : currentAgent.type === 'Hybrid' ? 'Voice preview' : 'Play voice'}</span>
                </button>
              )}
              <button aria-label="More chat options" className="grid size-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-50">
                <MoreHorizontal className="size-4" />
              </button>
            </div>
          </header>

          <div className="flex shrink-0 flex-wrap items-center gap-x-3 gap-y-1.5 border-b border-slate-100 bg-slate-50/55 px-4 py-2 text-[9px] text-slate-500 sm:px-5">
            <span className="inline-flex items-center gap-1 text-violet-700"><Database className="size-3" /> Grounded in knowledge</span>
            <span className="hidden text-slate-300 sm:inline">·</span>
            <span className="font-mono text-slate-500">{currentAgent.model}</span>
            <span className="hidden text-slate-300 sm:inline">·</span>
            <span className="inline-flex items-center gap-1"><Globe2 className="size-3" /> Riyadh sovereign gateway</span>
          </div>

          <div ref={messageListRef} className="ask-message-list min-h-0 flex-1 space-y-5 overflow-y-auto bg-[#fcfcfe] px-4 py-5 sm:px-6">
            <div className="mx-auto flex max-w-2xl items-center justify-center gap-2 text-[8px] text-slate-400">
              <ShieldCheck className="size-3 text-emerald-600" />
              Demo conversation · Responses use sample content
            </div>
            {currentSession.messages.map((message) => {
              const isUser = message.sender === 'user';
              return (
                <div key={message.id} className={`group flex gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                  {!isUser && (
                    <span className="mt-5 grid size-7 shrink-0 place-items-center rounded-[10px] bg-violet-100 text-violet-700">
                      <Bot className="size-3.5" />
                    </span>
                  )}
                  <div className={`flex max-w-[min(82%,620px)] flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                    <div className={`mb-1.5 flex flex-wrap items-center gap-1.5 text-[8px] text-slate-400 ${isUser ? 'justify-end' : ''}`}>
                      <span className="font-semibold text-slate-500">{isUser ? 'You' : currentAgent.name}</span>
                      <span>·</span><span>{message.time}</span>
                    </div>
                    <div className={`rounded-2xl px-3.5 py-3 text-[11px] leading-[1.75] shadow-[0_2px_10px_-8px_rgba(51,65,85,0.4)] sm:px-4 ${
                      isUser
                        ? 'rounded-br-md bg-violet-600 text-white'
                        : 'rounded-bl-md border border-slate-200/80 bg-white text-slate-700'
                    }`}>
                      {message.text}
                    </div>
                    {message.groundedIn && (
                      <div className="mt-2 inline-flex max-w-full items-center gap-1.5 rounded-lg border border-sky-100 bg-sky-50/75 px-2 py-1 text-[8px] text-sky-800">
                        <Database className="size-3 shrink-0" />
                        <span className="font-semibold">Source</span>
                        <span className="max-w-[220px] truncate text-sky-700">{message.groundedIn}</span>
                      </div>
                    )}
                    <div className={`mt-1 flex gap-1 opacity-0 transition group-hover:opacity-100 focus-within:opacity-100 ${isUser ? 'justify-end' : ''}`}>
                      <button
                        onClick={() => void copyMessage(message.text, message.id)}
                        aria-label="Copy message"
                        className="grid size-6 place-items-center rounded-md text-slate-400 hover:bg-white hover:text-violet-700"
                      >
                        {copiedMsgId === message.id ? <CheckCheck className="size-3" /> : <Copy className="size-3" />}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            {isTyping && (
              <div className="flex items-center gap-2.5">
                <span className="grid size-7 place-items-center rounded-[10px] bg-violet-100 text-violet-700"><Bot className="size-3.5" /></span>
                <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-slate-200 bg-white px-3.5 py-3">
                  <span className="size-1.5 animate-bounce rounded-full bg-violet-400" />
                  <span className="size-1.5 animate-bounce rounded-full bg-violet-400 [animation-delay:120ms]" />
                  <span className="size-1.5 animate-bounce rounded-full bg-violet-400 [animation-delay:240ms]" />
                  <span className="ml-1 text-[9px] text-slate-400">Thinking</span>
                </div>
              </div>
            )}
          </div>

          <footer className="shrink-0 border-t border-slate-100 bg-white px-3 py-3 sm:px-5 sm:py-4">
            <div className="mb-2.5 flex gap-1.5 overflow-x-auto pb-0.5">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSendMessage(undefined, suggestion)}
                  disabled={isTyping}
                  className="shrink-0 rounded-full border border-slate-200 bg-white px-2.5 py-1.5 text-[8px] font-medium text-slate-500 transition hover:border-violet-200 hover:bg-violet-50/60 hover:text-violet-700 disabled:opacity-50"
                >
                  {suggestion}
                </button>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="relative flex items-end gap-2 rounded-2xl border border-slate-200 bg-slate-50/70 p-1.5 transition focus-within:border-violet-300 focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(139,92,246,0.08)]">
              <label htmlFor="ask-message-input" className="sr-only">Message your agent</label>
              <textarea
                id="ask-message-input"
                rows={1}
                value={inputText}
                onChange={(event) => setInputText(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Message your agent in English or Arabic…"
                className="max-h-28 min-h-9 flex-1 resize-y border-0 bg-transparent px-2.5 py-2 text-[10px] leading-5 text-slate-700 outline-none placeholder:text-slate-400 focus:ring-0 sm:text-[11px]"
              />
              <button
                type="submit"
                aria-label="Send message"
                disabled={!inputText.trim() || isTyping}
                className="grid size-9 shrink-0 place-items-center rounded-xl bg-violet-600 text-white shadow-sm transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
              >
                <ArrowUp className="size-4" />
              </button>
            </form>
            <p className="mb-0 mt-2 text-center text-[8px] text-slate-400">
              Demo responses are illustrative and may not reflect production agent output.
            </p>
          </footer>
        </div>

        <aside className="hidden min-h-0 flex-col gap-3 xl:flex">
          <section className="rounded-[20px] border border-slate-200/80 bg-white p-4 shadow-[0_6px_24px_-20px_rgba(51,65,85,0.32)]">
            <div className="flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-xl bg-violet-50 text-violet-700"><Sparkles className="size-4" /></span>
              <div><h2 className="mb-0 text-[11px] font-semibold text-slate-800">Agent context</h2><p className="mb-0 mt-0.5 text-[8px] text-slate-400">What powers this answer</p></div>
            </div>
            <div className="mt-3 space-y-2">
              <div className="rounded-xl border border-slate-100 bg-slate-50/75 p-2.5">
                <span className="block text-[8px] font-medium uppercase tracking-wider text-slate-400">Model</span>
                <span className="mt-1 block break-all font-mono text-[9px] font-medium text-slate-700">{currentAgent.model}</span>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50/75 p-2.5">
                <span className="block text-[8px] font-medium uppercase tracking-wider text-slate-400">Knowledge source</span>
                <span className="mt-1 block text-[9px] font-medium text-slate-700">{currentAgent.knowledgeBaseName || 'Idrak demo knowledge'}</span>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50/75 p-2.5">
                <span className="block text-[8px] font-medium uppercase tracking-wider text-slate-400">Languages</span>
                <span className="mt-1 block text-[9px] font-medium text-slate-700">{currentAgent.language}</span>
              </div>
            </div>
            <button
              onClick={() => onNavigate('/app/knowledge')}
              className="mt-3 inline-flex items-center gap-1 text-[9px] font-semibold text-violet-700 hover:text-violet-900"
            >
              Explore knowledge base <Plus className="size-3" />
            </button>
          </section>
          <section className="rounded-[20px] border border-emerald-100 bg-gradient-to-br from-emerald-50/90 via-white to-sky-50/70 p-4">
            <div className="flex items-center gap-2 text-emerald-800"><ShieldCheck className="size-4" /><h2 className="mb-0 text-[10px] font-semibold">Privacy-conscious by design</h2></div>
            <p className="mb-0 mt-2 text-[9px] leading-4 text-slate-500">This standalone demo keeps chat activity in the browser session. No messages are sent to Idrak services.</p>
          </section>
        </aside>
      </div>
    </section>
  );
};

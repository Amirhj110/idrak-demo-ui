import React, { useState, useEffect } from 'react';
import { 
  X, 
  Mic, 
  MicOff, 
  PhoneOff, 
  Volume2, 
  VolumeX, 
  Radio, 
  Sparkles, 
  Send, 
  Activity, 
  CheckCircle2, 
  Globe2
} from 'lucide-react';
import { AgentItem, VoiceProfile } from '../types';
import { initialAgents, voiceProfiles } from '../mockData';

interface VoiceCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedAgentId?: string;
}

export const VoiceCallModal: React.FC<VoiceCallModalProps> = ({
  isOpen,
  onClose,
  selectedAgentId
}) => {
  const [activeAgentId, setActiveAgentId] = useState<string>(selectedAgentId || initialAgents[0].id);
  const [callDuration, setCallDuration] = useState<number>(0);
  const [isCalling, setIsCalling] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState<boolean>(true);
  const [inputText, setInputText] = useState<string>('');
  const [isAgentSpeaking, setIsAgentSpeaking] = useState<boolean>(false);

  // Latency metrics state
  const [latencies, setLatencies] = useState({
    stt: 142,
    llm: 215,
    tts: 140,
    total: 497
  });

  const [conversation, setConversation] = useState<Array<{ sender: 'agent' | 'user'; text: string; time: string }>>([
    {
      sender: 'agent',
      text: 'مرحباً بك في مصرف البليتيكا الإسلامي. معك نجلاء. كيف أقدر أخدمك اليوم بخصوص بطاقاتك أو حسابك؟',
      time: '14:42'
    }
  ]);

  const currentAgent = initialAgents.find(a => a.id === activeAgentId) || initialAgents[0];

  // Call duration counter
  useEffect(() => {
    let timer: any;
    if (isOpen && isCalling) {
      timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOpen, isCalling]);

  // Handle agent switch
  const handleSelectAgent = (agentId: string) => {
    setActiveAgentId(agentId);
    const agent = initialAgents.find(a => a.id === agentId);
    let greeting = 'Hello, how can I assist you with your enterprise requests today?';
    if (agentId === 'agent-najla-voice') {
      greeting = 'يا هلا فيك بمصرف البليتيكا. معك نجلاء، تفضل كيف أقدر أساعدك اليوم؟';
    } else if (agentId === 'agent-hr-concierge') {
      greeting = 'Hi Amir! Welcome to Idrak HR & PayPeople Concierge. Need to check your leave balances or payslip breakdown?';
    } else if (agentId === 'agent-sama-auditor') {
      greeting = 'أهلاً بك. مستشار الامتثال والتنظيمات المصرفية من ساما تحت خدمتك للإجابة على المعايير النظامية.';
    }

    setConversation([
      {
        sender: 'agent',
        text: greeting,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    speakText(greeting, agent?.language.includes('ar') ? 'ar-SA' : 'en-US');
  };

  // Text to speech helper
  const speakText = (text: string, lang = 'ar-SA') => {
    if (!isSpeakerOn) return;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.lang = lang;
      setIsAgentSpeaking(true);
      utterance.onend = () => setIsAgentSpeaking(false);
      utterance.onerror = () => setIsAgentSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setConversation(prev => [...prev, { sender: 'user', text, time: userTime }]);
    setInputText('');

    // Simulate real-time latency milestones
    const simulatedSTT = Math.floor(Math.random() * 30) + 135;
    const simulatedLLM = Math.floor(Math.random() * 50) + 200;
    const simulatedTTS = Math.floor(Math.random() * 25) + 125;
    const total = simulatedSTT + simulatedLLM + simulatedTTS;

    setLatencies({
      stt: simulatedSTT,
      llm: simulatedLLM,
      tts: simulatedTTS,
      total
    });

    setTimeout(() => {
      let reply = 'تم استلام طلبك وجاري معالجته عبر نظام بليتيكا السيادي.';
      const lower = text.toLowerCase();

      if (lower.includes('رصيد') || lower.includes('بطاق') || lower.includes('balance') || lower.includes('card')) {
        reply = 'أبشر يا فهد. رصيدك المتاح في البطاقة البلاتينية المنتهية برقم 4012 هو 14,250 ريال سعودي. وموعد استحقاق الفاتورة في 25 من هذا الشهر.';
      } else if (lower.includes('leave') || lower.includes('إجازة') || lower.includes('رصيد الإجازات') || lower.includes('paypeople')) {
        reply = 'أهلاً يا عامر. رصيد إجازاتك الحالي في PayPeople هو 18.5 يوم سنوي، بالإضافة إلى 4 أيام إجازة اضطرارية. هل تحب أرفع لك طلب إجازة؟';
      } else if (lower.includes('ساما') || lower.includes('امتثال') || lower.includes('sama') || lower.includes('pdpl')) {
        reply = 'بموجب المادة 14 من نظام حماية البيانات الشخصية السعودي (PDPL)، يتم تشفير جميع التسجيلات داخل مراكز بيانات الرياض السيادية دون خروج أي بيانات خارج المملكة.';
      } else {
        reply = currentAgent.language.includes('ar')
          ? 'تم التحقق من بياناتك بنجاح من خلال بوابة الهوية الوطنية. هل ترغب في إتمام العملية فوراً؟'
          : 'I have verified your account telemetry. Your requests are being securely processed within the Riyadh Sovereign DC-1 node.';
      }

      setConversation(prev => [
        ...prev, 
        { 
          sender: 'agent', 
          text: reply, 
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
        }
      ]);
      speakText(reply, currentAgent.language.includes('ar') ? 'ar-SA' : 'en-US');
    }, 450);
  };

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="relative flex flex-col md:flex-row w-full max-w-4xl h-[640px] rounded-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Left Side: Call Controller & Acoustic Visualizer */}
        <div className="w-full md:w-5/12 bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950 text-white p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 size-64 rounded-full bg-violet-600/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 size-64 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none" />

          {/* Top Call Status */}
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="flex size-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">SIP / WebRTC Live</span>
            </div>
            <div className="rounded-full bg-white/10 px-3 py-1 font-mono text-xs text-slate-200 backdrop-blur-md">
              {formatSeconds(callDuration)}
            </div>
          </div>

          {/* Center: Agent Avatar & Pulsing Waveform */}
          <div className="my-auto text-center z-10">
            <div className="relative mx-auto mb-4 size-24">
              <div className={`absolute inset-0 rounded-full bg-violet-500/30 blur-md transition-all ${isAgentSpeaking ? 'scale-125 opacity-100' : 'scale-100 opacity-40'}`} />
              <div className="relative size-24 rounded-full border-2 border-violet-400/50 p-1 bg-slate-800">
                <div className="size-full rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center font-display text-2xl font-bold">
                  {currentAgent.name.charAt(0)}
                </div>
              </div>
            </div>

            <h3 className="font-display text-lg font-bold text-white">{currentAgent.name}</h3>
            <p className="text-xs text-violet-200/80 font-arabic mt-0.5">{currentAgent.nameAr}</p>
            <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] text-slate-300">
              <Globe2 className="size-3 text-violet-300" />
              <span>{currentAgent.language}</span>
            </div>

            {/* Dynamic Voice Waveform */}
            <div className="mt-6 flex items-center justify-center gap-1 h-12">
              {[40, 75, 55, 90, 65, 85, 45, 95, 60, 80, 50, 70].map((h, i) => (
                <div
                  key={i}
                  className="w-1 rounded-full bg-violet-400 transition-all duration-150"
                  style={{
                    height: isAgentSpeaking ? `${Math.max(15, (h * Math.sin(callDuration * 3 + i)) % 100)}%` : '8px'
                  }}
                />
              ))}
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              {isAgentSpeaking ? 'Agent speaking · Arabic Speech Synthesis' : 'Listening for your voice / prompt...'}
            </p>
          </div>

          {/* Telemetry Latency Waterfall */}
          <div className="rounded-2xl bg-white/5 border border-white/10 p-3 text-xs z-10 backdrop-blur-md">
            <div className="flex items-center justify-between text-[11px] text-slate-300 mb-1.5 font-medium">
              <span>Glass-to-Glass Latency</span>
              <span className="font-mono text-emerald-400 font-bold">{latencies.total} ms</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
              <div className="bg-white/5 rounded-lg p-1.5">
                <span className="text-slate-400 block">STT</span>
                <span className="font-mono text-violet-300 font-bold">{latencies.stt}ms</span>
              </div>
              <div className="bg-white/5 rounded-lg p-1.5">
                <span className="text-slate-400 block">LLM</span>
                <span className="font-mono text-indigo-300 font-bold">{latencies.llm}ms</span>
              </div>
              <div className="bg-white/5 rounded-lg p-1.5">
                <span className="text-slate-400 block">TTS</span>
                <span className="font-mono text-cyan-300 font-bold">{latencies.tts}ms</span>
              </div>
            </div>
          </div>

          {/* In-Call Action Bar */}
          <div className="flex items-center justify-center gap-4 mt-4 z-10">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`size-11 rounded-full grid place-items-center transition-colors ${
                isMuted ? 'bg-amber-500 text-white' : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <MicOff className="size-5" /> : <Mic className="size-5" />}
            </button>
            <button
              onClick={() => {
                if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                onClose();
              }}
              className="size-13 rounded-full bg-rose-600 hover:bg-rose-700 text-white grid place-items-center shadow-lg shadow-rose-600/30 active:scale-95 transition-all"
              title="End Call"
            >
              <PhoneOff className="size-6" />
            </button>
            <button
              onClick={() => setIsSpeakerOn(!isSpeakerOn)}
              className={`size-11 rounded-full grid place-items-center transition-colors ${
                !isSpeakerOn ? 'bg-slate-700 text-slate-400' : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
              title={isSpeakerOn ? 'Speaker On' : 'Speaker Muted'}
            >
              {isSpeakerOn ? <Volume2 className="size-5" /> : <VolumeX className="size-5" />}
            </button>
          </div>
        </div>

        {/* Right Side: Conversation Transcript & Agent Switcher */}
        <div className="w-full md:w-7/12 flex flex-col justify-between bg-slate-50 p-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <p className="text-xs font-bold text-slate-900">Live Telephony Stream</p>
              <p className="text-[11px] text-slate-500">Real-time bilingual acoustic and transcript verification</p>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={activeAgentId}
                onChange={(e) => handleSelectAgent(e.target.value)}
                className="text-xs font-semibold rounded-xl border border-slate-200 bg-white px-2.5 py-1 text-slate-700 outline-none focus:border-violet-500"
              >
                {initialAgents.map((a) => (
                  <option key={a.id} value={a.id}>{a.name.split('-')[0]}</option>
                ))}
              </select>
              <button
                onClick={onClose}
                className="size-8 grid place-items-center rounded-xl text-slate-400 hover:bg-slate-200/60 hover:text-slate-700"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto py-4 space-y-3.5 pr-2">
            {conversation.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mb-1">
                  <span>{msg.sender === 'user' ? 'You (Caller)' : currentAgent.name}</span>
                  <span>·</span>
                  <span>{msg.time}</span>
                </div>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs shadow-2xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-violet-600 text-white rounded-br-xs'
                      : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs font-arabic'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 pb-3 border-t border-slate-200">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Quick Test Prompts
            </p>
            <div className="flex flex-wrap gap-1.5">
              {[
                'كم الرصيد المتبقي في بطاقتي الائتمانية؟',
                'How many leave days in PayPeople do I have?',
                'ما هي تعليمات ساما بخصوص مكافحة الاحتيال؟'
              ].map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(q)}
                  className="rounded-lg bg-white border border-slate-200 px-2 py-1 text-[11px] text-slate-600 hover:bg-violet-50 hover:border-violet-200 hover:text-violet-700 transition-colors truncate max-w-xs"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          <div className="relative flex items-center">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a voice message simulation or press Enter..."
              className="w-full rounded-2xl border border-slate-200 bg-white pl-4 pr-12 py-3 text-xs text-slate-800 placeholder:text-slate-400 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 shadow-sm"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim()}
              className="absolute right-2 size-8 rounded-xl bg-violet-600 text-white grid place-items-center disabled:opacity-40 hover:bg-violet-700 transition-colors"
            >
              <Send className="size-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

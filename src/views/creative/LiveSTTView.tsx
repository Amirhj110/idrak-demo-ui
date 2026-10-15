import React, { useState } from 'react';
import { 
  Mic, 
  MicOff, 
  AudioWaveform, 
  Activity, 
  Clock, 
  CheckCircle2, 
  Play, 
  RefreshCw, 
  Radio, 
  Sparkles, 
  Volume2 
} from 'lucide-react';

export const LiveSTTView: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('أهلاً بك في مصرف البليتيكا، أبغى أستعلم عن الرصيد المتبقي في بطاقتي الائتمانية وتاريخ السداد القادم.');
  const [confidence, setConfidence] = useState(0.984);
  const [latencyMs, setLatencyMs] = useState(142);

  const toggleListen = () => {
    setIsListening(prev => !prev);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-xl sm:text-2xl font-bold text-slate-900">Speech to Text Live (Streaming ASR)</h1>
            <span className="rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.5">
              Sub-150ms Telephony ASR
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time Arabic acoustic transcription and speech recognition engine optimized for Saudi & Gulf telephony
          </p>
        </div>

        <button
          onClick={toggleListen}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer ${
            isListening 
              ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse' 
              : 'bg-white border border-slate-200 text-slate-800 hover:bg-slate-50'
          }`}
        >
          {isListening ? <MicOff className="size-4" /> : <Mic className="size-4 text-rose-600" />}
          <span>{isListening ? 'Stop Listening' : 'Start Microphone'}</span>
        </button>
      </div>

      {/* Grid of separate clean colorful section cards */}
      <div className="home-widget-grid">

        {/* ================================================================= */}
        {/* CARD 1: Acoustic Stream Status (Tone: Rose, Wide) */}
        {/* ================================================================= */}
        <div data-home-widget="stt-hero" data-tone="rose" className="home-widget home-widget-wide">
          <div className="home-widget-heading flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="home-widget-icon grid size-10 place-items-center rounded-xl bg-rose-100 text-rose-800 shadow-2xs">
                <Mic className="size-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">Acoustic Audio Channel</h2>
                <p className="text-xs text-slate-500">
                  {isListening ? 'Streaming live audio buffer to Riyadh DC-1...' : 'Microphone idle · Ready for speech'}
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 border border-emerald-100">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Word Error Rate: 2.1% (SOTA)
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
            <div className="home-record-row p-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Streaming Latency</span>
              <span className="font-display text-2xl font-bold text-slate-900 mt-1 block">{latencyMs} ms</span>
              <span className="text-[10px] text-emerald-600 font-bold mt-1 block">Chunked WebSocket</span>
            </div>
            <div className="home-record-row p-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Confidence Score</span>
              <span className="font-display text-2xl font-bold text-emerald-600 mt-1 block">{(confidence * 100).toFixed(1)}%</span>
              <span className="text-[10px] text-slate-400 mt-1 block">High reliability</span>
            </div>
            <div className="home-record-row p-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Dialect Parser</span>
              <span className="font-display text-2xl font-bold text-rose-700 mt-1 block">Najdi / Gulf</span>
              <span className="text-[10px] text-slate-400 mt-1 block">Auto-detected</span>
            </div>
            <div className="home-record-row p-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Residency Node</span>
              <span className="font-display text-2xl font-bold text-slate-900 mt-1 block">Riyadh DC-1</span>
              <span className="text-[10px] text-emerald-600 font-bold mt-1 block">100% In-Country</span>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* CARD 2: Real-time Transcript Stream (Tone: Violet, Wide or Left) */}
        {/* ================================================================= */}
        <div data-home-widget="stt-transcript" data-tone="violet" className="home-widget home-widget-wide">
          <div className="home-widget-heading flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="home-widget-icon grid size-10 place-items-center rounded-xl bg-violet-100 text-violet-800 shadow-2xs">
                <AudioWaveform className="size-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">Real-Time Transcription Stream</h2>
                <p className="text-xs text-slate-500">Live multi-turn token decoding with diacritics</p>
              </div>
            </div>
            <span className="rounded-full bg-violet-100 text-violet-800 text-[10px] font-bold px-2 py-0.5">
              Arabic Tokenizer v4
            </span>
          </div>

          <div className="home-record-row p-4 min-h-[140px] flex flex-col justify-between">
            <p className="text-base sm:text-lg font-arabic font-medium text-slate-900 leading-loose">
              "{transcript}"
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-[11px] text-slate-400 mt-3">
              <span>Timestamp: 14:42:18 AST</span>
              <span className="font-mono text-emerald-600 font-bold">Confidence: 98.4%</span>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* CARD 3: Dialect Classifier (Tone: Mint) */}
        {/* ================================================================= */}
        <div data-home-widget="dialect-classifier" data-tone="mint" className="home-widget">
          <div className="home-widget-heading flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="home-widget-icon grid size-10 place-items-center rounded-xl bg-emerald-100 text-emerald-800 shadow-2xs">
                <CheckCircle2 className="size-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">Dialect Classifier</h2>
                <p className="text-xs text-slate-500">Phonetic feature extraction</p>
              </div>
            </div>
            <span className="rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5">
              Active
            </span>
          </div>

          <div className="space-y-2.5">
            {[
              { dialect: 'Central Najdi Arabic', prob: '88%', bar: 88, match: 'Primary Match' },
              { dialect: 'Western Hijazi Arabic', prob: '9%', bar: 9, match: 'Secondary' },
              { dialect: 'Eastern & Gulf Arabic', prob: '3%', bar: 3, match: 'Residual' },
            ].map((d, i) => (
              <div key={i} className="home-record-row p-3 text-xs">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-slate-800">{d.dialect}</span>
                  <span className="font-mono font-bold text-emerald-700">{d.prob}</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${d.bar}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================================================================= */}
        {/* CARD 4: Acoustic Signal Profile (Tone: Cyan) */}
        {/* ================================================================= */}
        <div data-home-widget="acoustic-signal" data-tone="cyan" className="home-widget">
          <div className="home-widget-heading flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="home-widget-icon grid size-10 place-items-center rounded-xl bg-sky-100 text-sky-800 shadow-2xs">
                <Radio className="size-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">RTP Audio Pipeline</h2>
                <p className="text-xs text-slate-500">Inbound WebRTC telephony parameters</p>
              </div>
            </div>
            <span className="rounded-full bg-sky-100 text-sky-800 text-[10px] font-bold px-2 py-0.5">
              Optimal
            </span>
          </div>

          <div className="space-y-2.5">
            {[
              { param: 'Voice Activity Detection (VAD)', value: 'Energy + Neural Silero VAD', status: 'Enabled' },
              { param: 'Signal-to-Noise Ratio (SNR)', value: '38.4 dB', status: 'Clean Studio' },
              { param: 'Acoustic Echo Cancellation (AEC)', value: 'Double-talk suppression active', status: 'Active' },
            ].map((p, i) => (
              <div key={i} className="home-record-row p-3 flex items-center justify-between gap-3 text-xs">
                <div>
                  <span className="font-bold text-slate-800">{p.param}</span>
                  <p className="text-[10px] text-slate-400 mt-0.5">{p.value}</p>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  {p.status}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

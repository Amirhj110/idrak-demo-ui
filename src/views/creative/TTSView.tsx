import React, { useState } from 'react';
import { 
  FileAudio, 
  Play, 
  Pause, 
  Download, 
  Sparkles, 
  Volume2, 
  Globe2, 
  Sliders, 
  Mic, 
  Check, 
  AudioWaveform 
} from 'lucide-react';
import { voiceProfiles } from '../../mockData';

export const TTSView: React.FC = () => {
  const [selectedVoiceId, setSelectedVoiceId] = useState(voiceProfiles[0].id);
  const [inputText, setInputText] = useState('مرحباً بك في منصة إدراك للذكاء الاصطناعي السيادي. تم معالجة طلبك بنجاح من خلال مركز بيانات الرياض.');
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1.0);
  const [pitch, setPitch] = useState(1.0);

  const selectedVoice = voiceProfiles.find(v => v.id === selectedVoiceId) || voiceProfiles[0];

  const handleGenerateAndSpeak = () => {
    if ('speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        return;
      }
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(inputText);
      u.lang = selectedVoice.languageLabel.includes('ar') ? 'ar-SA' : 'en-US';
      u.rate = speed;
      u.pitch = pitch;
      setIsPlaying(true);
      u.onend = () => setIsPlaying(false);
      u.onerror = () => setIsPlaying(false);
      window.speechSynthesis.speak(u);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-xl sm:text-2xl font-bold text-slate-900">Text to Speech Studio (TTS)</h1>
            <span className="rounded-full bg-violet-100 text-violet-800 text-[10px] font-bold px-2 py-0.5">
              Generative Audio
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Generate broadcast-quality audio files leveraging certified regional Arabic & English voice acoustic profiles
          </p>
        </div>

        <button
          onClick={handleGenerateAndSpeak}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer ${
            isPlaying 
              ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse' 
              : 'bg-violet-600 hover:bg-violet-700 text-white'
          }`}
        >
          {isPlaying ? <Pause className="size-4" /> : <Play className="size-4 fill-current" />}
          <span>{isPlaying ? 'Stop Playback' : 'Synthesize & Play'}</span>
        </button>
      </div>

      {/* Grid of separate clean colorful section cards */}
      <div className="home-widget-grid">

        {/* ================================================================= */}
        {/* CARD 1: Neural TTS Engine Status (Tone: Violet, Wide) */}
        {/* ================================================================= */}
        <div data-home-widget="tts-hero" data-tone="violet" className="home-widget home-widget-wide">
          <div className="home-widget-heading flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="home-widget-icon grid size-10 place-items-center rounded-xl bg-violet-100 text-violet-800 shadow-2xs">
                <AudioWaveform className="size-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">Neural Acoustic Synthesis Engine</h2>
                <p className="text-xs text-slate-500">24kHz high-fidelity neural vocoder running on Riyadh GPU clusters</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 border border-emerald-100">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Zero Latency Buffer
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
            <div className="home-record-row p-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Selected Persona</span>
              <span className="font-display text-xl font-bold text-slate-900 mt-1 block truncate">{selectedVoice.name}</span>
              <span className="text-[10px] text-emerald-600 font-bold mt-1 block">{selectedVoice.dialectKey}</span>
            </div>
            <div className="home-record-row p-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Synthesis Speed</span>
              <span className="font-display text-2xl font-bold text-violet-700 mt-1 block">&lt; 140 ms</span>
              <span className="text-[10px] text-slate-400 mt-1 block">Real-time factor 0.08x</span>
            </div>
            <div className="home-record-row p-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Sample Fidelity</span>
              <span className="font-display text-2xl font-bold text-slate-900 mt-1 block">24 kHz</span>
              <span className="text-[10px] text-slate-400 mt-1 block">Float32 lossless</span>
            </div>
            <div className="home-record-row p-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Diacritic Rendering</span>
              <span className="font-display text-2xl font-bold text-emerald-600 mt-1 block">99.8%</span>
              <span className="text-[10px] text-slate-400 mt-1 block">Accurate Harakat</span>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* CARD 2: Interactive Speech Generator (Tone: Mint, Wide) */}
        {/* ================================================================= */}
        <div data-home-widget="tts-input" data-tone="mint" className="home-widget home-widget-wide">
          <div className="home-widget-heading flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="home-widget-icon grid size-10 place-items-center rounded-xl bg-emerald-100 text-emerald-800 shadow-2xs">
                <Volume2 className="size-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">Text Prompt & Synthesis Parameters</h2>
                <p className="text-xs text-slate-500">Edit text and tune speech cadence</p>
              </div>
            </div>
            <span className="rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5">
              Arabic & English
            </span>
          </div>

          <div className="space-y-4">
            <div className="home-record-row p-3.5">
              <textarea
                rows={4}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter text in Arabic or English to synthesize..."
                className="w-full bg-transparent border-none font-arabic text-sm text-slate-800 outline-none leading-relaxed resize-none font-medium"
              />
            </div>

            {/* Slider controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="home-record-row p-3 flex flex-col justify-between">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-bold text-slate-700">Speech Rate</span>
                  <span className="font-mono font-bold text-emerald-700">{speed.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.7"
                  max="1.4"
                  step="0.1"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>

              <div className="home-record-row p-3 flex flex-col justify-between">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-bold text-slate-700">Pitch Shift</span>
                  <span className="font-mono font-bold text-emerald-700">{pitch.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.8"
                  max="1.3"
                  step="0.05"
                  value={pitch}
                  onChange={(e) => setPitch(parseFloat(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* CARD 3: Voice Personas Selector (Tone: Pink) */}
        {/* ================================================================= */}
        <div data-home-widget="tts-personas" data-tone="pink" className="home-widget">
          <div className="home-widget-heading flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="home-widget-icon grid size-10 place-items-center rounded-xl bg-rose-100 text-rose-800 shadow-2xs">
                <Sparkles className="size-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">Acoustic Personas</h2>
                <p className="text-xs text-slate-500">Pick voice checkpoint</p>
              </div>
            </div>
            <span className="rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.5">
              Certified
            </span>
          </div>

          <div className="space-y-2.5">
            {voiceProfiles.map((v) => {
              const isSelected = selectedVoiceId === v.id;
              return (
                <div
                  key={v.id}
                  onClick={() => setSelectedVoiceId(v.id)}
                  className={`home-record-row p-3 flex items-center justify-between gap-3 text-xs cursor-pointer transition-all ${
                    isSelected ? 'ring-2 ring-rose-500/50 bg-rose-50/40' : ''
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="size-8 rounded-xl bg-rose-100 text-rose-700 grid place-items-center font-display font-bold text-xs shrink-0">
                      {v.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <span className="font-bold text-slate-900 truncate block">{v.name}</span>
                      <span className="text-[10px] text-slate-400 block truncate">{v.dialectKey} · {v.gender}</span>
                    </div>
                  </div>
                  {isSelected && (
                    <span className="size-5 rounded-full bg-rose-600 text-white grid place-items-center shrink-0">
                      <Check className="size-3" />
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ================================================================= */}
        {/* CARD 4: Audio Engineering Settings (Tone: Cyan) */}
        {/* ================================================================= */}
        <div data-home-widget="tts-engineering" data-tone="cyan" className="home-widget">
          <div className="home-widget-heading flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="home-widget-icon grid size-10 place-items-center rounded-xl bg-sky-100 text-sky-800 shadow-2xs">
                <FileAudio className="size-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">Audio Mastering Settings</h2>
                <p className="text-xs text-slate-500">Post-processing filters for telephony</p>
              </div>
            </div>
            <span className="rounded-full bg-sky-100 text-sky-800 text-[10px] font-bold px-2 py-0.5">
              Studio FX
            </span>
          </div>

          <div className="space-y-2.5">
            {[
              { setting: 'Dynamic Range Compression', desc: 'Boost vocal presence for phone earpieces', active: true },
              { setting: 'Natural Breath Modeling', desc: 'Synthesize conversational pauses and micro-breaths', active: true },
              { setting: 'Diacritizer Pre-Pass', desc: 'Auto-infer vowel marks for Saudi names and places', active: true },
            ].map((s, i) => (
              <div key={i} className="home-record-row p-3 flex items-center justify-between gap-3 text-xs">
                <div>
                  <span className="font-bold text-slate-800">{s.setting}</span>
                  <p className="text-[10px] text-slate-400 mt-0.5">{s.desc}</p>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Enabled
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

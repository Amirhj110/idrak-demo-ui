import React, { useState } from 'react';
import { 
  Mic, 
  Play, 
  Pause, 
  Globe2, 
  Sparkles, 
  UploadCloud, 
  CheckCircle2, 
  PhoneCall, 
  AudioWaveform,
  Check, 
  Sliders, 
  ArrowRight,
  Headphones
} from 'lucide-react';
import { voiceProfiles } from '../../mockData';
import { VoiceProfile } from '../../types';

interface VoicesViewProps {
  onOpenVoiceCall: () => void;
}

export const VoicesView: React.FC<VoicesViewProps> = ({ onOpenVoiceCall }) => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [cloneName, setCloneName] = useState('');
  const [cloneDialect, setCloneDialect] = useState('sa_najdi');
  const [cloningState, setCloningState] = useState<'idle' | 'processing' | 'ready'>('idle');

  const handlePlaySample = (voice: VoiceProfile) => {
    if ('speechSynthesis' in window) {
      if (playingId === voice.id) {
        window.speechSynthesis.cancel();
        setPlayingId(null);
        return;
      }
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(voice.sampleText);
      u.lang = voice.languageLabel.includes('ar') ? 'ar-SA' : 'en-US';
      u.rate = 1.0;
      setPlayingId(voice.id);
      u.onend = () => setPlayingId(null);
      u.onerror = () => setPlayingId(null);
      window.speechSynthesis.speak(u);
    }
  };

  const handleTriggerClone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cloneName.trim()) return;
    setCloningState('processing');
    setTimeout(() => {
      setCloningState('ready');
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-xl sm:text-2xl font-bold text-slate-900">Voices & Neural Acoustic Studio</h1>
            <span className="rounded-full bg-violet-100 text-violet-800 text-[10px] font-bold px-2 py-0.5">
              Saudi Dialects Native
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Sovereign neural speech models fine-tuned on Saudi Najdi, Hijazi, Eastern, and Modern Standard Arabic
          </p>
        </div>

        <button
          onClick={onOpenVoiceCall}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold shadow-2xs transition-colors cursor-pointer"
        >
          <PhoneCall className="size-3.5" />
          <span>Launch WebRTC Test Call</span>
        </button>
      </div>

      {/* Grid of separate clean colorful section cards */}
      <div className="home-widget-grid">

        {/* ================================================================= */}
        {/* CARD 1: Voice Engine Status Deck (Tone: Violet, Wide) */}
        {/* ================================================================= */}
        <div data-home-widget="voices-hero" data-tone="violet" className="home-widget home-widget-wide">
          <div className="home-widget-heading flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="home-widget-icon grid size-10 place-items-center rounded-xl bg-violet-100 text-violet-800 shadow-2xs">
                <AudioWaveform className="size-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">Neural Speech Synthesizer Telemetry</h2>
                <p className="text-xs text-slate-500">24kHz PCM High-Definition acoustic output rendered in Riyadh DC-1</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 border border-emerald-100">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              MOS Score: 4.82 / 5.0
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
            <div className="home-record-row p-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Available Checkpoints</span>
              <span className="font-display text-2xl font-bold text-slate-900 mt-1 block">8 Profiles</span>
              <span className="text-[10px] text-emerald-600 font-bold mt-1 block">4 Saudi dialects</span>
            </div>
            <div className="home-record-row p-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Time to First Audio</span>
              <span className="font-display text-2xl font-bold text-violet-700 mt-1 block">182 ms</span>
              <span className="text-[10px] text-emerald-600 font-bold mt-1 block">Instant streaming RTP</span>
            </div>
            <div className="home-record-row p-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Acoustic Bitrate</span>
              <span className="font-display text-2xl font-bold text-slate-900 mt-1 block">24 kHz</span>
              <span className="text-[10px] text-slate-400 mt-1 block">Studio studio fidelity</span>
            </div>
            <div className="home-record-row p-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Phoneme Mapping</span>
              <span className="font-display text-2xl font-bold text-emerald-600 mt-1 block">100% Arabic</span>
              <span className="text-[10px] text-slate-400 mt-1 block">Tashkeel diacritics</span>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* CARD 2: Active Voice Profiles Roster (Tone: Mint, Wide or Left) */}
        {/* ================================================================= */}
        <div data-home-widget="voice-roster" data-tone="mint" className="home-widget">
          <div className="home-widget-heading flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="home-widget-icon grid size-10 place-items-center rounded-xl bg-emerald-100 text-emerald-800 shadow-2xs">
                <Mic className="size-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">Native Saudi Voice Profiles</h2>
                <p className="text-xs text-slate-500">Click play to listen to audio samples</p>
              </div>
            </div>
            <span className="rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5">
              Pre-trained
            </span>
          </div>

          <div className="space-y-3">
            {voiceProfiles.map((v) => (
              <div key={v.id} className="home-record-row p-3.5 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => handlePlaySample(v)}
                      className={`size-9 rounded-xl grid place-items-center transition-all cursor-pointer ${
                        playingId === v.id 
                          ? 'bg-emerald-600 text-white shadow-xs animate-pulse' 
                          : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                      }`}
                    >
                      {playingId === v.id ? <Pause className="size-4 fill-current" /> : <Play className="size-4 fill-current ml-0.5" />}
                    </button>
                    <div>
                      <span className="font-bold text-slate-900 text-xs">{v.name}</span>
                      <p className="text-[10px] text-slate-400">{v.dialectKey} · {v.recommendedUse}</p>
                    </div>
                  </div>

                  <span className="text-[9px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                    {v.gender}
                  </span>
                </div>

                <p className="text-xs text-slate-600 font-arabic line-clamp-1 italic bg-slate-50/70 p-2 rounded-lg border border-slate-100">
                  "{v.sampleText}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ================================================================= */}
        {/* CARD 3: Instant Voice Cloner (Tone: Pink) */}
        {/* ================================================================= */}
        <div data-home-widget="voice-cloner" data-tone="pink" className="home-widget">
          <div className="home-widget-heading flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="home-widget-icon grid size-10 place-items-center rounded-xl bg-rose-100 text-rose-800 shadow-2xs">
                <Sparkles className="size-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-display">Instant Voice Cloner</h2>
                <p className="text-xs text-slate-500">Synthesize brand persona from 30s audio</p>
              </div>
            </div>
            <span className="rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.5">
              Zero-Shot Neural
            </span>
          </div>

          <form onSubmit={handleTriggerClone} className="space-y-3">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Custom Voice Name
              </label>
              <input
                type="text"
                value={cloneName}
                onChange={(e) => setCloneName(e.target.value)}
                placeholder="e.g. Bilytica Brand Voice (Riyadh)"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 outline-none focus:border-rose-500 shadow-2xs"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Target Saudi Dialect
              </label>
              <select
                value={cloneDialect}
                onChange={(e) => setCloneDialect(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 outline-none focus:border-rose-500 shadow-2xs"
              >
                <option value="sa_najdi">Najdi Arabic (Central Region)</option>
                <option value="sa_hijazi">Hijazi Arabic (Western Region)</option>
                <option value="sa_sharqia">Eastern & Gulf Arabic</option>
                <option value="sa_fusha">Modern Standard Arabic</option>
              </select>
            </div>

            <div className="p-4 rounded-xl border-2 border-dashed border-rose-200 bg-rose-50/40 text-center flex flex-col items-center justify-center gap-1.5 cursor-pointer hover:bg-rose-50/70 transition-colors">
              <UploadCloud className="size-6 text-rose-500" />
              <span className="text-xs font-bold text-slate-800">Drop audio sample (.wav, .mp3, .ogg)</span>
              <span className="text-[10px] text-slate-400">At least 30 seconds for 99% timbre fidelity</span>
            </div>

            <button
              type="submit"
              disabled={cloningState === 'processing'}
              className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-2xs transition-colors cursor-pointer disabled:opacity-60 flex items-center justify-center gap-1.5"
            >
              <Sparkles className="size-3.5" />
              <span>{cloningState === 'processing' ? 'Extracting Acoustic Weights...' : 'Synthesize Voice Profile'}</span>
            </button>

            {cloningState === 'ready' && (
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <Check className="size-4 text-emerald-600 shrink-0" />
                <span>Voice clone compiled and registered with Riyadh DC-1!</span>
              </div>
            )}
          </form>
        </div>

      </div>
    </div>
  );
};

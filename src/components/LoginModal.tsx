import React, { useState } from 'react';
import { Lock, Mail, Shield, CheckCircle2, ArrowRight } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onLogin: (email: string) => void;
  onClose?: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onLogin,
  onClose
}) => {
  const [email, setEmail] = useState('amir@test.com');
  const [password, setPassword] = useState('amir1234');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin(email);
    }, 350);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl border border-slate-200 p-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Brand */}
        <div className="text-center mb-6">
          <div className="mx-auto mb-3 grid size-12 place-items-center rounded-2xl bg-gradient-to-tr from-violet-600 via-purple-600 to-indigo-600 text-white font-display text-xl font-bold shadow-lg shadow-violet-200">
            I
          </div>
          <h2 className="font-display text-xl font-bold text-slate-900">Sign in to Idrak Demo</h2>
          <p className="text-xs text-slate-500 mt-1">Enterprise Sovereign AI Platform by Bilytica</p>
        </div>

        {/* Demo Credentials Box */}
        <div className="mb-5 rounded-2xl bg-violet-50/70 border border-violet-100 p-3 text-xs text-violet-800 flex items-start gap-2.5">
          <Shield className="size-4 text-violet-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-bold">Requested Credentials:</span>
            <p className="text-[11px] text-violet-600/90 mt-0.5">
              Email: <code className="font-mono font-bold text-violet-900">amir@test.com</code> · Password: <code className="font-mono font-bold text-violet-900">amir1234</code>
            </p>
            <p className="text-[10px] text-violet-500 mt-0.5">Role: Amir Hussain · Enterprise AI Lead</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-3 py-2.5 text-xs text-slate-900 outline-none focus:border-violet-500 focus:bg-white transition-colors"
                placeholder="amir@test.com"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-700">
                Password
              </label>
              <button 
                type="button" 
                onClick={() => setPassword('amir1234')} 
                className="text-[11px] text-violet-600 hover:underline"
              >
                Reset to amir1234
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-3 py-2.5 text-xs text-slate-900 outline-none focus:border-violet-500 focus:bg-white transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-slate-300 text-violet-600 focus:ring-violet-500"
              />
              <span>Remember session</span>
            </label>
            <span className="text-[11px] text-slate-400">Riyadh DC-1 TLS 1.3</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-2.5 text-xs font-semibold text-white hover:from-violet-700 hover:to-indigo-700 shadow-md shadow-violet-200 transition-all active:scale-[0.98]"
          >
            {loading ? (
              <span>Authenticating with Gateway...</span>
            ) : (
              <>
                <span>Sign In as Amir Hussain</span>
                <ArrowRight className="size-3.5" />
              </>
            )}
          </button>
        </form>

        <div className="mt-5 pt-4 border-t border-slate-100 text-center">
          <p className="text-[11px] text-slate-400">
            Idrak Enterprise AI & Telephony Platform © Bilytica Global
          </p>
        </div>
      </div>
    </div>
  );
};

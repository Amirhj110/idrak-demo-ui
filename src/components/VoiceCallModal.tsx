import React from 'react';
import { X } from 'lucide-react';
import { AgentItem, RoutePath } from '../types';
import { AskAgentPlaygroundView } from '../views/build/AskAgentPlaygroundView';

interface VoiceCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  agents: AgentItem[];
  selectedAgentId: string;
  onNavigate: (route: RoutePath) => void;
}

export const VoiceCallModal: React.FC<VoiceCallModalProps> = ({
  isOpen,
  onClose,
  agents,
  selectedAgentId,
  onNavigate,
}) => {
  React.useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleNavigate = (route: RoutePath) => {
    onClose();
    onNavigate(route);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/35 p-2 backdrop-blur-sm sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Idrak agent playground"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="relative h-[96dvh] max-h-[1040px] w-full max-w-[1540px] overflow-hidden rounded-[28px] border border-white/80 bg-white shadow-[0_32px_120px_-34px_rgba(30,41,59,0.5)]">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close agent playground"
          className="absolute right-3 top-3 z-[60] grid size-8 place-items-center rounded-xl border border-white/80 bg-white/90 text-slate-500 shadow-sm transition hover:bg-violet-50 hover:text-violet-700"
        >
          <X className="size-4" />
        </button>
        <AskAgentPlaygroundView
          agents={agents}
          onNavigate={handleNavigate}
          initialAgentId={selectedAgentId}
          isModal
        />
      </div>
    </div>
  );
};

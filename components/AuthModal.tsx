'use client';

import React from 'react';
import { usePollar } from '@pollar/react';
import { useDemoAuth } from './providers/PollarClientProvider';
import { X } from 'lucide-react';

export function AuthModal() {
  const pollar = usePollar();
  const { isAuthModalOpen, closeAuthModal, loginAsDemo } = useDemoAuth();

  if (!isAuthModalOpen) return null;

  const handleOpenPollarModal = () => {
    closeAuthModal();
    pollar.openLoginModal();
  };

  const handleDemoLogin = (role: 'importer' | 'exporter') => {
    loginAsDemo(role);
    closeAuthModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-md neu-card rounded-3xl p-6 sm:p-8 space-y-6 relative border border-white/80 dark:border-white/10 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-slate-300/40 dark:border-slate-700/60 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Connect to char</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Non-custodial Stellar wallet access</p>
          </div>
          <button
            onClick={closeAuthModal}
            className="w-8 h-8 rounded-full neu-btn flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white font-bold"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Option 1: Native Pollar Modal */}
        <div className="space-y-3">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400 block">
            Primary Login (Pollar SDK)
          </span>
          <button
            onClick={handleOpenPollarModal}
            className="w-full p-4 rounded-2xl neu-btn-primary text-white text-xs font-bold flex items-center justify-between shadow-neu-glow hover:opacity-95"
          >
            <div className="text-left">
              <p className="font-bold">Continue with Pollar</p>
              <span className="text-[10px] text-emerald-100 font-medium">
                Google, Biometric Passkey, or Email OTP
              </span>
            </div>
            <span className="text-xs font-mono">→</span>
          </button>
        </div>

        {/* Option 2: 1-Click Testnet Wallets for Quick Testing */}
        <div className="space-y-3 pt-2 border-t border-slate-300/60 dark:border-slate-700/60">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400 block">
            Instant Hackathon Test Roles (1-Click)
          </span>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleDemoLogin('importer')}
              className="p-3.5 rounded-2xl neu-btn text-left flex flex-col justify-between hover:text-emerald-800 dark:hover:text-emerald-400 transition-all"
            >
              <span className="text-[10px] font-extrabold uppercase text-emerald-800 dark:text-emerald-400 mb-1">Buyer · KE</span>
              <p className="text-xs font-bold text-slate-900 dark:text-slate-100">African Importer</p>
              <span className="text-[10px] text-slate-600 dark:text-slate-400 font-mono mt-1 font-semibold">Nairobi Hub</span>
            </button>

            <button
              onClick={() => handleDemoLogin('exporter')}
              className="p-3.5 rounded-2xl neu-btn text-left flex flex-col justify-between hover:text-orange-800 dark:hover:text-orange-400 transition-all"
            >
              <span className="text-[10px] font-extrabold uppercase text-orange-800 dark:text-orange-400 mb-1">Seller · BO</span>
              <p className="text-xs font-bold text-slate-900 dark:text-slate-100">Bolivian Exporter</p>
              <span className="text-[10px] text-slate-600 dark:text-slate-400 font-mono mt-1 font-semibold">La Paz Coffee</span>
            </button>
          </div>
        </div>

        <div className="neu-card-sm p-3 rounded-xl text-[11px] text-slate-700 dark:text-slate-300 font-medium">
          Zero seed phrases. Gas fees are sponsored by Pollar on Stellar testnet.
        </div>
      </div>
    </div>
  );
}

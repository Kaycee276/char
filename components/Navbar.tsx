'use client';

import React, { useState } from 'react';
import { usePollar } from '@pollar/react';
import { usePollarConfig } from './providers/PollarClientProvider';
import { ApiKeySettingsModal } from './ApiKeySettingsModal';
import { 
  Flame, 
  Wallet, 
  Settings, 
  LogOut, 
  ChevronDown,
  TrendingUp,
  Sparkles
} from 'lucide-react';

export function Navbar() {
  const { isCustomKey } = usePollarConfig();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showWalletDropdown, setShowWalletDropdown] = useState(false);

  const pollar = usePollar();

  const isAuthenticated = pollar?.isAuthenticated ?? false;
  const wallet = pollar?.wallet;
  const address = wallet?.address;

  const handleLogin = () => {
    pollar.openLoginModal();
  };

  const handleLogout = () => {
    pollar.logout();
    setShowWalletDropdown(false);
  };

  return (
    <>
      <header className="w-full px-4 sm:px-8 pt-6 pb-4 max-w-7xl mx-auto">
        <div className="neu-card rounded-3xl px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 border border-white/80">
          {/* Logo & Subtitle */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl neu-inset flex items-center justify-center text-amber-600 shadow-neu-inset-sm">
                <Flame className="w-6 h-6 fill-amber-500 text-amber-600 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black tracking-tight text-slate-800">
                    char<span className="text-emerald-600">.</span>
                  </h1>
                  <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded-full neu-inset text-emerald-700">
                    Stellar × Pollar
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium hidden sm:block">
                  Africa ⇄ Latin America Settlement & Yield Escrow
                </p>
              </div>
            </div>

            {/* Mobile Settings Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="w-10 h-10 rounded-2xl neu-btn flex items-center justify-center text-slate-600"
                title="Pollar Config"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Center Corridor Active Pill */}
          <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-2xl neu-inset text-xs font-semibold text-slate-700">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-slate-500">Corridor Active:</span>
            <span className="font-bold text-slate-800">Nairobi (KES) / Lagos (NGN) ⇄ Bolivia (BOB)</span>
            <span className="text-slate-300">|</span>
            <span className="text-emerald-600 font-bold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> Blend: 7.8% APY
            </span>
          </div>

          {/* Right Actions: Wallet & Settings */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <button
              onClick={() => setIsSettingsOpen(true)}
              className={`hidden md:flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl neu-btn text-xs font-semibold ${
                isCustomKey ? 'text-indigo-600' : 'text-slate-600'
              }`}
              title="SDK Settings & API Key"
            >
              <Settings className="w-4 h-4" />
              <span>{isCustomKey ? 'Live App Key' : 'Sandbox Config'}</span>
            </button>

            {isAuthenticated && address ? (
              <div className="relative">
                <button
                  onClick={() => setShowWalletDropdown(!showWalletDropdown)}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl neu-btn text-xs font-semibold text-slate-700"
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <Wallet className="w-3.5 h-3.5 text-indigo-600" />
                  <span className="font-mono">
                    {address.slice(0, 4)}...{address.slice(-4)}
                  </span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {showWalletDropdown && (
                  <div className="absolute right-0 mt-2 w-64 neu-card rounded-2xl p-4 space-y-3 z-30 border border-white/80 animate-in fade-in zoom-in-95">
                    <div className="flex items-center justify-between border-b border-slate-300/40 pb-2">
                      <span className="text-xs font-bold text-slate-500">Embedded Wallet</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full neu-inset text-emerald-600 font-bold">
                        Non-Custodial
                      </span>
                    </div>

                    <div className="text-xs font-mono break-all text-slate-700 neu-inset p-2.5 rounded-xl">
                      {address}
                    </div>

                    <div className="flex items-center justify-between text-xs font-medium text-slate-600 pt-1">
                      <span>Network:</span>
                      <span className="font-semibold text-indigo-600">Stellar Testnet</span>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="w-full py-2 px-3 rounded-xl neu-btn text-red-600 text-xs font-semibold flex items-center justify-center gap-1.5 hover:text-red-700"
                    >
                      <LogOut className="w-3.5 h-3.5" /> Disconnect Wallet
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl neu-btn-primary text-xs font-bold text-white shadow-neu-glow"
              >
                <Sparkles className="w-4 h-4" />
                <span>Connect with Pollar</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <ApiKeySettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </>
  );
}

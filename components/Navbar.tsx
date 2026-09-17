'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { usePollar } from '@pollar/react';
import { useDemoAuth } from './providers/PollarClientProvider';
import { 
  Flame, 
  Wallet, 
  LogOut, 
  ChevronDown, 
  Sparkles,
  PlusCircle,
  Building2,
  FileText,
  Globe2,
  Smartphone, 
  ShieldCheck,
  X
} from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const [showWalletDropdown, setShowWalletDropdown] = useState(false);
  const [showAuthChoiceModal, setShowAuthChoiceModal] = useState(false);

  const pollar = usePollar();
  const { demoUser, loginAsDemo, logoutDemo } = useDemoAuth();

  const isPollarAuth = pollar?.isAuthenticated ?? false;
  const isAuthenticated = isPollarAuth || !!demoUser;
  const address = pollar?.wallet?.address || demoUser?.address;

  const handleOpenPollarModal = () => {
    setShowAuthChoiceModal(false);
    pollar.openLoginModal();
  };

  const handleDemoLogin = (role: 'importer' | 'exporter') => {
    loginAsDemo(role);
    setShowAuthChoiceModal(false);
  };

  const handleLogout = () => {
    if (isPollarAuth) {
      pollar.logout();
    }
    logoutDemo();
    setShowWalletDropdown(false);
  };

  const navLinks = [
    { href: '/', label: 'Corridor', icon: Globe2 },
    { href: '/trades', label: 'Trades & Escrow', icon: FileText },
    { href: '/trades/new', label: 'New Contract', icon: PlusCircle },
    { href: '/ramps', label: 'Bolivia BOB Ramp', icon: Building2 },
  ];

  return (
    <>
      <header className="w-full px-4 sm:px-8 pt-6 pb-4 max-w-7xl mx-auto">
        <div className="neu-card rounded-3xl px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 border border-white/80">
          {/* Logo */}
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-2xl neu-inset flex items-center justify-center text-amber-600 shadow-neu-inset-sm group-hover:scale-105 transition-transform">
                <Flame className="w-6 h-6 fill-amber-500 text-amber-600 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black tracking-tight text-slate-900">
                    char<span className="text-emerald-600">.</span>
                  </span>
                  <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded-full neu-inset text-emerald-800">
                    Africa ⇄ Bolivia
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 font-semibold hidden sm:block">
                  Stellar Settlement &amp; Yield Escrow Corridor
                </p>
              </div>
            </Link>
          </div>

          {/* Center Multi-Page Navigation Bar */}
          <nav className="flex items-center neu-inset p-1.5 rounded-2xl overflow-x-auto max-w-full">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? 'neu-btn text-slate-950 font-black'
                      : 'text-slate-700 hover:text-slate-950 font-semibold'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-600' : 'text-slate-600'}`} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Actions: Pollar Embedded Wallet */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
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
                  <div className="absolute right-0 mt-2 w-64 neu-card rounded-2xl p-4 space-y-3 z-30 border border-white/80 animate-in fade-in zoom-in-95 shadow-neu-lg">
                    <div className="flex items-center justify-between border-b border-slate-300/40 pb-2">
                      <span className="text-xs font-bold text-slate-500">
                        {demoUser ? 'Testnet Wallet' : 'Pollar Wallet'}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full neu-inset text-emerald-600 font-bold">
                        {demoUser ? demoUser.role.toUpperCase() : 'NON-CUSTODIAL'}
                      </span>
                    </div>

                    <div className="text-xs font-mono break-all text-slate-700 neu-inset p-2.5 rounded-xl">
                      {address}
                    </div>

                    <div className="flex items-center justify-between text-xs font-medium text-slate-600 pt-1">
                      <span>Network:</span>
                      <span className="font-semibold text-indigo-600">Stellar Testnet</span>
                    </div>

                    <div className="flex items-center justify-between text-xs font-medium text-slate-600">
                      <span>Gas:</span>
                      <span className="font-semibold text-emerald-600">Sponsored by Pollar</span>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="w-full py-2 px-3 rounded-xl neu-btn text-red-600 text-xs font-semibold flex items-center justify-center gap-1.5 hover:text-red-700"
                    >
                      <LogOut className="w-3.5 h-3.5" /> Disconnect
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowAuthChoiceModal(true)}
                className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl neu-btn-primary text-xs font-bold text-white shadow-neu-glow hover:opacity-95"
              >
                <Sparkles className="w-4 h-4" />
                <span>Sign in with Pollar</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Tactile Auth Choice Modal */}
      {showAuthChoiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-md neu-card rounded-3xl p-6 sm:p-8 space-y-6 relative border border-white/80 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-300/40 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl neu-inset flex items-center justify-center text-emerald-600">
                  <Wallet className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Connect to char</h3>
                  <p className="text-xs text-slate-700 font-medium">Non-custodial Stellar wallet access</p>
                </div>
              </div>
              <button
                onClick={() => setShowAuthChoiceModal(false)}
                className="w-8 h-8 rounded-full neu-btn flex items-center justify-center text-slate-700 hover:text-slate-950 font-bold"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Option 1: Native Pollar Modal */}
            <div className="space-y-3">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-700 block">
                Primary Login (Pollar SDK)
              </span>
              <button
                onClick={handleOpenPollarModal}
                className="w-full p-4 rounded-2xl neu-btn-primary text-white text-xs font-bold flex items-center justify-between shadow-neu-glow hover:opacity-95"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4" />
                  <div className="text-left">
                    <p className="font-bold">Continue with Pollar</p>
                    <span className="text-[10px] text-emerald-100 font-medium">
                      Google, Biometric Passkey, or Email OTP
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono">→</span>
              </button>
            </div>

            {/* Option 2: 1-Click Testnet Wallets for Quick Testing */}
            <div className="space-y-3 pt-2 border-t border-slate-300/60">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-700 block">
                Instant Hackathon Test Roles (1-Click)
              </span>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleDemoLogin('importer')}
                  className="p-3.5 rounded-2xl neu-btn text-left flex flex-col justify-between hover:text-emerald-800 transition-all"
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="text-[10px] font-extrabold uppercase text-emerald-800">Buyer · KE</span>
                    <Smartphone className="w-3.5 h-3.5 text-emerald-700" />
                  </div>
                  <p className="text-xs font-bold text-slate-900">African Importer</p>
                  <span className="text-[10px] text-slate-600 font-mono mt-1 font-semibold">Nairobi Hub</span>
                </button>

                <button
                  onClick={() => handleDemoLogin('exporter')}
                  className="p-3.5 rounded-2xl neu-btn text-left flex flex-col justify-between hover:text-orange-800 transition-all"
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="text-[10px] font-extrabold uppercase text-orange-800">Seller · BO</span>
                    <Building2 className="w-3.5 h-3.5 text-orange-700" />
                  </div>
                  <p className="text-xs font-bold text-slate-900">Bolivian Exporter</p>
                  <span className="text-[10px] text-slate-600 font-mono mt-1 font-semibold">La Paz Coffee</span>
                </button>
              </div>
            </div>

            <div className="neu-card-sm p-3 rounded-xl text-[11px] text-slate-700 font-medium flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Zero seed phrases. Gas fees are sponsored by Pollar on Stellar testnet.</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

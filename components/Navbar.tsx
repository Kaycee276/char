'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { usePollar } from '@pollar/react';
import { useDemoAuth } from './providers/PollarClientProvider';
import { useTheme } from './providers/ThemeProvider';
import { 
  Flame, 
  LogOut, 
  Sun,
  Moon,
  X
} from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const [showWalletDropdown, setShowWalletDropdown] = useState(false);
  const [showAuthChoiceModal, setShowAuthChoiceModal] = useState(false);

  const { theme, toggleTheme } = useTheme();
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
    { href: '/', label: 'Corridor' },
    { href: '/trades', label: 'Trades & Escrow' },
    { href: '/trades/new', label: 'New Contract' },
    { href: '/ramps', label: 'Bolivia BOB Ramp' },
  ];

  return (
    <>
      <header className="w-full px-4 sm:px-8 pt-6 pb-4 max-w-7xl mx-auto">
        <div className="neu-card rounded-3xl px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 border border-white/80 dark:border-white/10">
          {/* Logo */}
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-2xl neu-inset flex items-center justify-center text-amber-600 shadow-neu-inset-sm group-hover:scale-105 transition-transform">
                <Flame className="w-5 h-5 fill-amber-500 text-amber-600 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-slate-100">
                    char<span className="text-emerald-600">.</span>
                  </span>
                  <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded-full neu-inset text-emerald-800 dark:text-emerald-400">
                    Africa ⇄ Bolivia
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 font-semibold hidden sm:block">
                  Stellar Settlement &amp; Yield Escrow Corridor
                </p>
              </div>
            </Link>
          </div>

          {/* Center Multi-Page Navigation Bar (clean typographic links) */}
          <nav className="flex items-center neu-inset p-1.5 rounded-2xl overflow-x-auto max-w-full">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? 'neu-btn text-slate-950 dark:text-white font-black'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white font-semibold'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions: Theme Toggle + Pollar Embedded Wallet */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-2xl neu-btn flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-all shrink-0"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {isAuthenticated && address ? (
              <div className="relative">
                <button
                  onClick={() => setShowWalletDropdown(!showWalletDropdown)}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl neu-btn text-xs font-semibold text-slate-700 dark:text-slate-200"
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="font-mono">
                    {address.slice(0, 4)}...{address.slice(-4)}
                  </span>
                </button>

                {showWalletDropdown && (
                  <div className="absolute right-0 mt-2 w-64 neu-card rounded-2xl p-4 space-y-3 z-30 border border-white/80 dark:border-white/10 animate-in fade-in zoom-in-95 shadow-neu-lg">
                    <div className="flex items-center justify-between border-b border-slate-300/40 dark:border-slate-700/60 pb-2">
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                        {demoUser ? 'Testnet Wallet' : 'Pollar Wallet'}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full neu-inset text-emerald-600 dark:text-emerald-400 font-bold">
                        {demoUser ? demoUser.role.toUpperCase() : 'NON-CUSTODIAL'}
                      </span>
                    </div>

                    <div className="text-xs font-mono break-all text-slate-700 dark:text-slate-300 neu-inset p-2.5 rounded-xl">
                      {address}
                    </div>

                    <div className="flex items-center justify-between text-xs font-medium text-slate-600 dark:text-slate-400 pt-1">
                      <span>Network:</span>
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">Stellar Testnet</span>
                    </div>

                    <div className="flex items-center justify-between text-xs font-medium text-slate-600 dark:text-slate-400">
                      <span>Gas:</span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">Sponsored by Pollar</span>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="w-full py-2 px-3 rounded-xl neu-btn text-red-600 dark:text-red-400 text-xs font-semibold flex items-center justify-center gap-1.5 hover:text-red-700"
                    >
                      <LogOut className="w-3.5 h-3.5" /> Disconnect
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowAuthChoiceModal(true)}
                className="flex-1 md:flex-initial px-5 py-2.5 rounded-2xl neu-btn-primary text-xs font-bold text-white shadow-neu-glow hover:opacity-95"
              >
                Sign in with Pollar
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Tactile Auth Choice Modal */}
      {showAuthChoiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-md neu-card rounded-3xl p-6 sm:p-8 space-y-6 relative border border-white/80 dark:border-white/10 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-300/40 dark:border-slate-700/60 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Connect to char</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Non-custodial Stellar wallet access</p>
              </div>
              <button
                onClick={() => setShowAuthChoiceModal(false)}
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
      )}
    </>
  );
}

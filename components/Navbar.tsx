'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { usePollar } from '@pollar/react';
import { 
  Flame, 
  Wallet, 
  LogOut, 
  ChevronDown, 
  Sparkles,
  PlusCircle,
  Building2,
  FileText,
  Globe2
} from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
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

  const navLinks = [
    { href: '/', label: 'Corridor', icon: Globe2 },
    { href: '/trades', label: 'Trades & Escrow', icon: FileText },
    { href: '/trades/new', label: 'New Contract', icon: PlusCircle },
    { href: '/ramps', label: 'Bolivia BOB Ramp', icon: Building2 },
  ];

  return (
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
                <span className="text-2xl font-black tracking-tight text-slate-800">
                  char<span className="text-emerald-600">.</span>
                </span>
                <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded-full neu-inset text-emerald-700">
                  Africa ⇄ Bolivia
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
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
                    ? 'neu-btn text-slate-800 font-black'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
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
                    <span className="text-xs font-bold text-slate-500">Pollar Wallet</span>
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
              onClick={handleLogin}
              className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl neu-btn-primary text-xs font-bold text-white shadow-neu-glow hover:opacity-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>Sign in with Pollar</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

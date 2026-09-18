'use client';

import React from 'react';
import Link from 'next/link';
import { useDemoAuth } from './providers/PollarClientProvider';
import { RATES } from '@/lib/currency';

export function LandingPage() {
  const { openAuthModal } = useDemoAuth();

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 pt-6">
        <div className="neu-card rounded-3xl p-8 sm:p-14 border border-white/80 dark:border-white/10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full neu-inset text-emerald-800 dark:text-emerald-400 text-xs font-extrabold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Flagship Corridor · Africa ⇄ Latin America
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight max-w-4xl mx-auto leading-tight">
            Direct Trade Settlement &amp; Yield Escrow on Stellar
          </h1>

          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
            Move trade capital between African local rails (M-Pesa, Nigerian bank transfers) and Pollar&apos;s live Bolivian BOB fiat ramp. Earn +7.8% APY on in-transit escrows with zero gas fees and non-custodial wallets.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={openAuthModal}
              className="px-8 py-3.5 rounded-2xl neu-btn-primary text-white text-sm font-bold shadow-neu-glow hover:opacity-95"
            >
              Sign in with Pollar
            </button>
            <Link
              href="/trades"
              className="px-8 py-3.5 rounded-2xl neu-btn text-slate-800 dark:text-slate-200 text-sm font-bold hover:text-slate-950 dark:hover:text-white"
            >
              Explore Contracts
            </Link>
            <Link
              href="/ramps"
              className="px-6 py-3.5 rounded-2xl neu-btn text-orange-700 dark:text-orange-400 text-sm font-bold hover:text-orange-900 dark:hover:text-orange-300"
            >
              Test BOB Ramp
            </Link>
          </div>

          {/* 4 Stat Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-300/40 dark:border-slate-800/80">
            <div className="neu-inset p-4 rounded-2xl text-left">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400 block mb-1">
                Settlement Speed
              </span>
              <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">&lt; 10s</p>
              <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold">Stellar Finality</span>
            </div>

            <div className="neu-inset p-4 rounded-2xl text-left">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400 block mb-1">
                Corridor FX Fee
              </span>
              <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">0.35%</p>
              <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold">vs. 8–12% SWIFT</span>
            </div>

            <div className="neu-inset p-4 rounded-2xl text-left neu-pulse">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 block mb-1">
                In-Transit Yield
              </span>
              <p className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">+7.8%</p>
              <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold">Blend Protocol APY</span>
            </div>

            <div className="neu-inset p-4 rounded-2xl text-left">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-orange-800 dark:text-orange-400 block mb-1">
                Bolivian Ramp
              </span>
              <p className="text-xl sm:text-2xl font-black text-orange-600 dark:text-orange-400">Live BOB</p>
              <span className="text-[10px] text-orange-700 dark:text-orange-400 font-bold">Pollar Anchor</span>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works - 3 Clean Steps */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            How char Works in 3 Steps
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            A frictionless South-South corridor bypassing correspondent banks completely.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="neu-card rounded-3xl p-6 sm:p-8 border border-white/80 dark:border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-full neu-btn flex items-center justify-center text-xs font-black text-slate-900 dark:text-white">
                1
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full neu-inset text-emerald-800 dark:text-emerald-400">
                AFRICAN INGRESS
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Fund via Local Rails
            </h3>
            <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
              African importers pay trade invoices directly with local currency using Safaricom M-Pesa (Kenya KES), Nigerian bank transfers (NGN), or Ghana MoMo.
            </p>
          </div>

          {/* Step 2 */}
          <div className="neu-card rounded-3xl p-6 sm:p-8 border border-white/80 dark:border-white/10 space-y-4 neu-pulse">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-full neu-btn flex items-center justify-center text-xs font-black text-emerald-600 dark:text-emerald-400">
                2
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full neu-inset text-emerald-800 dark:text-emerald-400">
                STELLAR ESCROW
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Auto-Compounding Yield
            </h3>
            <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
              Funds are secured in a non-custodial Stellar smart contract. While shipment is in transit, capital actively earns +7.8% APY through Blend Protocol lending pools.
            </p>
          </div>

          {/* Step 3 */}
          <div className="neu-card rounded-3xl p-6 sm:p-8 border border-white/80 dark:border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-full neu-btn flex items-center justify-center text-xs font-black text-orange-600 dark:text-orange-400">
                3
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full neu-inset text-orange-800 dark:text-orange-400">
                BOLIVIAN EGRESS
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Direct Bank Cashout (BOB)
            </h3>
            <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
              Once delivery is verified, the escrow releases. Bolivian exporters cash out directly into Banco Unión, BMSC, or QR Simple with guaranteed 15-minute rates.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Section: char vs SWIFT */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
        <div className="neu-card rounded-3xl p-6 sm:p-10 border border-white/80 dark:border-white/10 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Why African &amp; Bolivian Traders Choose char
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              Eliminating the slow correspondent banking intermediaries between Africa and South America.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Legacy SWIFT */}
            <div className="neu-inset p-6 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Legacy SWIFT Wire
                </h3>
                <span className="text-[10px] font-bold text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-950/60 px-2 py-0.5 rounded-full">
                  Slow &amp; Expensive
                </span>
              </div>
              <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-400 font-medium">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                  <span><strong>5 to 7 business days</strong> settlement delay</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                  <span><strong>8% to 12% double FX haircut</strong> (KES/NGN → USD → BOB)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                  <span><strong>0% yield</strong> — dead money during ocean shipping</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                  <span>Heavy paperwork and correspondent bank fees</span>
                </li>
              </ul>
            </div>

            {/* char Corridor */}
            <div className="neu-card-sm p-6 rounded-2xl border border-emerald-300 dark:border-emerald-700/50 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-emerald-900 dark:text-emerald-300 uppercase tracking-wider">
                  char Corridor
                </h3>
                <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                  Direct &amp; High-Yield
                </span>
              </div>
              <ul className="space-y-3 text-xs text-slate-800 dark:text-slate-200 font-medium">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span><strong>Under 10 seconds</strong> atomic settlement on Stellar</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span><strong>Direct local currency pairs</strong> with less than 1% cost</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span><strong>+7.8% APY live compounding</strong> while in transit</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span><strong>Zero seed phrases</strong> with sponsored gas via Pollar</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Live Corridor Rates Ticker */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-8">
        <div className="neu-inset p-4 sm:p-6 rounded-3xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Corridor FX Rates (1 USDC Guaranteed)
            </span>
            <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
              UPDATED LIVE
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="neu-card-sm p-3 rounded-xl">
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block">Kenya (KES)</span>
              <p className="text-sm font-black text-slate-900 dark:text-white font-mono">{RATES.KES.ratePerUsdc} KES</p>
            </div>
            <div className="neu-card-sm p-3 rounded-xl">
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block">Nigeria (NGN)</span>
              <p className="text-sm font-black text-slate-900 dark:text-white font-mono">{RATES.NGN.ratePerUsdc} NGN</p>
            </div>
            <div className="neu-card-sm p-3 rounded-xl">
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block">Ghana (GHS)</span>
              <p className="text-sm font-black text-slate-900 dark:text-white font-mono">{RATES.GHS.ratePerUsdc} GHS</p>
            </div>
            <div className="neu-card-sm p-3 rounded-xl border border-orange-400/40">
              <span className="text-[10px] font-bold text-orange-800 dark:text-orange-400 block">Bolivia (BOB)</span>
              <p className="text-sm font-black text-orange-600 dark:text-orange-400 font-mono">{RATES.BOB.ratePerUsdc} BOB</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Card */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-8">
        <div className="neu-card rounded-3xl p-8 sm:p-12 border border-white/80 dark:border-white/10 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Ready to test the corridor?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
            Connect in seconds with Google or Passkey, or jump straight in with a 1-click testnet role.
          </p>
          <div className="pt-2">
            <button
              onClick={openAuthModal}
              className="px-8 py-3.5 rounded-2xl neu-btn-primary text-white text-sm font-bold shadow-neu-glow hover:opacity-95"
            >
              Launch char Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

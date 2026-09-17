'use client';

import React from 'react';
import { RATES } from '@/lib/currency';

export function CorridorStats() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1: Speed */}
        <div className="neu-card rounded-3xl p-5 border border-white/80 dark:border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Settlement Speed
            </span>
            <span className="text-[10px] font-extrabold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
              Stellar
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900 dark:text-slate-100">3.2 sec</span>
              <span className="text-xs font-extrabold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full">
                Instant
              </span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-400 font-medium mt-1">
              vs. <span className="font-semibold line-through text-slate-500">5–7 business days</span> via legacy SWIFT
            </p>
          </div>
        </div>

        {/* Metric 2: FX Cost Reduction */}
        <div className="neu-card rounded-3xl p-5 border border-white/80 dark:border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Corridor FX Fee
            </span>
            <span className="text-[10px] font-extrabold text-indigo-800 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-950/60 px-2 py-0.5 rounded-full">
              Direct Pair
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900 dark:text-slate-100">0.35%</span>
              <span className="text-xs font-extrabold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full">
                -96% Cost
              </span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-400 font-medium mt-1">
              Eliminates double USD FX haircut via US correspondent banks
            </p>
          </div>
        </div>

        {/* Metric 3: Escrow Yield (Blend / DeFindex) */}
        <div className="neu-card rounded-3xl p-5 border border-white/80 dark:border-white/10 flex flex-col justify-between neu-pulse">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Escrow Yield APY
            </span>
            <span className="text-[10px] font-black uppercase tracking-wide text-emerald-900 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
              Blend Pool
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">+7.8%</span>
              <span className="text-xs font-extrabold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full">
                Auto-Earn
              </span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-400 font-medium mt-1">
              USDC locked in transit compounds hourly on Stellar
            </p>
          </div>
        </div>

        {/* Metric 4: Bolivia BOB Live Anchor */}
        <div className="neu-card rounded-3xl p-5 border border-white/80 dark:border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Bolivia BOB Ramp
            </span>
            <span className="text-[10px] font-extrabold text-orange-800 dark:text-orange-300 bg-orange-100 dark:bg-orange-950/60 px-2 py-0.5 rounded-full">
              Pollar
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900 dark:text-slate-100">Live BOB</span>
              <span className="text-xs font-extrabold text-orange-800 dark:text-orange-300 bg-orange-100 dark:bg-orange-950/60 px-2.5 py-0.5 rounded-full">
                Guaranteed
              </span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-400 font-medium mt-1">
              Direct cashout to Banco Unión, BMSC, BNB &amp; QR Simple
            </p>
          </div>
        </div>
      </div>

      {/* Live FX Ticker Strip */}
      <div className="mt-4 neu-card-sm rounded-2xl px-5 py-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-800 dark:text-slate-200 border border-white/70 dark:border-white/10">
        <div className="flex items-center gap-2 font-black text-slate-900 dark:text-slate-100">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Real-Time Corridor FX:</span>
        </div>
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-mono text-[11px] sm:text-xs">
          <span className="px-2.5 py-1 rounded-xl neu-inset text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            1 USDC = <strong className="text-orange-700 dark:text-orange-400 font-black">{RATES.BOB.ratePerUsdc} BOB</strong>
            <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 bg-slate-200/80 dark:bg-slate-800 px-1 py-0.2 rounded">BO</span>
          </span>
          <span className="px-2.5 py-1 rounded-xl neu-inset text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            1 USDC = <strong className="text-emerald-700 dark:text-emerald-400 font-black">{RATES.KES.ratePerUsdc} KES</strong>
            <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 bg-slate-200/80 dark:bg-slate-800 px-1 py-0.2 rounded">KE</span>
          </span>
          <span className="px-2.5 py-1 rounded-xl neu-inset text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            1 USDC = <strong className="text-indigo-700 dark:text-indigo-400 font-black">{RATES.NGN.ratePerUsdc} NGN</strong>
            <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 bg-slate-200/80 dark:bg-slate-800 px-1 py-0.2 rounded">NG</span>
          </span>
          <span className="px-2.5 py-1 rounded-xl neu-inset text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            1 USDC = <strong className="text-amber-700 dark:text-amber-400 font-black">{RATES.GHS.ratePerUsdc} GHS</strong>
            <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 bg-slate-200/80 dark:bg-slate-800 px-1 py-0.2 rounded">GH</span>
          </span>
        </div>
      </div>
    </section>
  );
}

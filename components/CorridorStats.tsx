'use client';

import React from 'react';
import { 
  Zap, 
  TrendingUp, 
  ArrowRightLeft,
  Building2
} from 'lucide-react';
import { RATES } from '@/lib/currency';

export function CorridorStats() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1: Speed */}
        <div className="neu-card rounded-3xl p-5 border border-white/80 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
              Settlement Speed
            </span>
            <div className="w-9 h-9 rounded-2xl neu-inset flex items-center justify-center text-amber-600">
              <Zap className="w-4 h-4 fill-amber-500 text-amber-600" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">3.2 sec</span>
              <span className="text-xs font-extrabold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                Instant
              </span>
            </div>
            <p className="text-xs text-slate-700 font-medium mt-1">
              vs. <span className="font-semibold line-through text-slate-500">5–7 business days</span> via legacy SWIFT
            </p>
          </div>
        </div>

        {/* Metric 2: FX Cost Reduction */}
        <div className="neu-card rounded-3xl p-5 border border-white/80 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
              Corridor FX Fee
            </span>
            <div className="w-9 h-9 rounded-2xl neu-inset flex items-center justify-center text-emerald-600">
              <ArrowRightLeft className="w-4 h-4 text-emerald-600" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">0.35%</span>
              <span className="text-xs font-extrabold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                -96% Cost
              </span>
            </div>
            <p className="text-xs text-slate-700 font-medium mt-1">
              Eliminates double USD FX haircut via US correspondent banks
            </p>
          </div>
        </div>

        {/* Metric 3: Escrow Yield (Blend / DeFindex) */}
        <div className="neu-card rounded-3xl p-5 border border-white/80 flex flex-col justify-between neu-pulse">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              Escrow Yield APY
            </span>
            <div className="w-9 h-9 rounded-2xl neu-inset flex items-center justify-center text-emerald-600">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-emerald-700">+7.8%</span>
              <span className="text-xs font-black uppercase tracking-wide text-emerald-900 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                Blend Pool
              </span>
            </div>
            <p className="text-xs text-slate-700 font-medium mt-1">
              USDC locked in transit compounds hourly on Stellar
            </p>
          </div>
        </div>

        {/* Metric 4: Bolivia BOB Live Anchor */}
        <div className="neu-card rounded-3xl p-5 border border-white/80 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
              Bolivia BOB Ramp
            </span>
            <div className="w-9 h-9 rounded-2xl neu-inset flex items-center justify-center text-orange-600">
              <Building2 className="w-4 h-4 text-orange-600" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900">Live BOB</span>
              <span className="text-xs font-extrabold text-orange-800 bg-orange-100 px-2.5 py-0.5 rounded-full">
                Pollar Ramps
              </span>
            </div>
            <p className="text-xs text-slate-700 font-medium mt-1">
              Direct cashout to Banco Unión, BMSC, BNB &amp; QR Simple
            </p>
          </div>
        </div>
      </div>

      {/* Live FX Ticker Strip */}
      <div className="mt-4 neu-card-sm rounded-2xl px-5 py-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-800">
        <div className="flex items-center gap-2 font-black text-slate-900">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
          <span>Real-Time Corridor FX:</span>
        </div>
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-mono text-[11px] sm:text-xs">
          <span className="px-2.5 py-1 rounded-xl neu-inset text-slate-800 flex items-center gap-1.5">
            1 USDC = <strong className="text-orange-800 font-black">{RATES.BOB.ratePerUsdc} BOB</strong>
            <span className="text-[10px] font-bold text-slate-500 bg-slate-200/80 px-1 py-0.2 rounded">BO</span>
          </span>
          <span className="px-2.5 py-1 rounded-xl neu-inset text-slate-800 flex items-center gap-1.5">
            1 USDC = <strong className="text-emerald-800 font-black">{RATES.KES.ratePerUsdc} KES</strong>
            <span className="text-[10px] font-bold text-slate-500 bg-slate-200/80 px-1 py-0.2 rounded">KE</span>
          </span>
          <span className="px-2.5 py-1 rounded-xl neu-inset text-slate-800 flex items-center gap-1.5">
            1 USDC = <strong className="text-indigo-800 font-black">{RATES.NGN.ratePerUsdc} NGN</strong>
            <span className="text-[10px] font-bold text-slate-500 bg-slate-200/80 px-1 py-0.2 rounded">NG</span>
          </span>
          <span className="px-2.5 py-1 rounded-xl neu-inset text-slate-800 flex items-center gap-1.5">
            1 USDC = <strong className="text-amber-800 font-black">{RATES.GHS.ratePerUsdc} GHS</strong>
            <span className="text-[10px] font-bold text-slate-500 bg-slate-200/80 px-1 py-0.2 rounded">GH</span>
          </span>
        </div>
      </div>
    </section>
  );
}

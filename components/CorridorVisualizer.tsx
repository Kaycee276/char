'use client';

import React, { useState } from 'react';

export function CorridorVisualizer() {
  const [activeTab, setActiveTab] = useState<'comparison' | 'flow'>('flow');

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-4">
      <div className="neu-card rounded-3xl p-6 sm:p-8 border border-white/80 dark:border-white/10 space-y-6">
        {/* Header and Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-300/40 dark:border-slate-800/80 pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              The South-South Cross-Continental Highway
            </h2>
            <p className="text-xs text-slate-700 dark:text-slate-300 font-medium mt-1">
              Direct peer-to-peer settlement between Africa and Latin America powered by Pollar &amp; Stellar
            </p>
          </div>

          {/* Neumorphic Segmented Tab */}
          <div className="flex items-center neu-inset p-1 rounded-2xl self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('flow')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'flow'
                  ? 'neu-btn text-emerald-800 dark:text-emerald-300 font-black'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white font-semibold'
              }`}
            >
              Corridor Flow
            </button>
            <button
              onClick={() => setActiveTab('comparison')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'comparison'
                  ? 'neu-btn text-indigo-800 dark:text-indigo-300 font-black'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white font-semibold'
              }`}
            >
              char vs SWIFT
            </button>
          </div>
        </div>

        {activeTab === 'flow' ? (
          /* Corridor Interactive Diagram */
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              {/* Step 1: African Rail */}
              <div className="neu-card-sm rounded-3xl p-5 border border-white/80 dark:border-white/10 relative space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full">
                    Leg 1: African Origin
                  </span>
                  <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400">01 / INGRESS</span>
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-slate-100">Local Fiat Ingress</h3>
                  <p className="text-xs text-slate-700 dark:text-slate-300 font-medium mt-1">
                    African importer or client funds in local currency through daily payment rails.
                  </p>
                </div>
                <div className="neu-inset p-3 rounded-2xl space-y-2 text-xs">
                  <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
                    <span>M-Pesa STK Push (Kenya):</span>
                    <span className="font-mono text-emerald-700 dark:text-emerald-400 font-black">KES</span>
                  </div>
                  <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
                    <span>Bank Transfer (Nigeria):</span>
                    <span className="font-mono text-indigo-700 dark:text-indigo-400 font-black">NGN</span>
                  </div>
                  <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
                    <span>Mobile Money (Ghana):</span>
                    <span className="font-mono text-amber-700 dark:text-amber-400 font-black">GHS</span>
                  </div>
                </div>
                <div className="pt-2 text-[11px] text-slate-700 dark:text-slate-300 flex items-center gap-2 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  Auto-mints Stellar USDC at zero user gas
                </div>
              </div>

              {/* Step 2: Yield Escrow on Stellar */}
              <div className="neu-card-sm rounded-3xl p-5 border border-white/80 dark:border-white/10 relative space-y-3 neu-pulse">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-800 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-950/60 px-2.5 py-1 rounded-full">
                    Leg 2: Yield Escrow
                  </span>
                  <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400">02 / TRANSIT</span>
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-slate-100">Blend / DeFindex Staking</h3>
                  <p className="text-xs text-slate-700 dark:text-slate-300 font-medium mt-1">
                    Funds do not sit idle. Escrow deposits into Stellar lending pool while shipment is in transit.
                  </p>
                </div>
                <div className="neu-inset p-3 rounded-2xl space-y-2 text-xs">
                  <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
                    <span>Stellar Asset:</span>
                    <span className="font-mono font-black text-slate-900 dark:text-slate-100">USDC (Circle)</span>
                  </div>
                  <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
                    <span>Active Protocol:</span>
                    <span className="font-black text-indigo-700 dark:text-indigo-400">Blend Lending Pool</span>
                  </div>
                  <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
                    <span>Yield Benefit:</span>
                    <span className="font-black text-emerald-700 dark:text-emerald-400">+7.8% APY Rebate</span>
                  </div>
                </div>
                <div className="pt-2 text-[11px] text-slate-700 dark:text-slate-300 flex items-center gap-2 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
                  Non-custodial milestone release
                </div>
              </div>

              {/* Step 3: Bolivian Cashout */}
              <div className="neu-card-sm rounded-3xl p-5 border border-white/80 dark:border-white/10 relative space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-orange-800 dark:text-orange-300 bg-orange-100 dark:bg-orange-950/60 px-2.5 py-1 rounded-full">
                    Leg 3: Bolivian Egress
                  </span>
                  <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400">03 / SETTLEMENT</span>
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-slate-100">Live BOB Ramp Settlement</h3>
                  <p className="text-xs text-slate-700 dark:text-slate-300 font-medium mt-1">
                    Bolivian merchant releases escrow and cashes out straight to local Bolivian Bolivianos (BOB).
                  </p>
                </div>
                <div className="neu-inset p-3 rounded-2xl space-y-2 text-xs">
                  <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
                    <span>Pollar Anchor:</span>
                    <span className="font-black text-slate-900 dark:text-slate-100">Live BOB Ramp (Bolivia)</span>
                  </div>
                  <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
                    <span>Local Banks:</span>
                    <span className="font-mono text-slate-700 dark:text-slate-300 font-semibold">Unión, BMSC, BNB</span>
                  </div>
                  <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
                    <span>Mobile QR:</span>
                    <span className="font-black text-orange-700 dark:text-orange-400">QR Simple Bolivia</span>
                  </div>
                </div>
                <div className="pt-2 text-[11px] text-slate-700 dark:text-slate-300 flex items-center gap-2 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                  Instant local bank transfer arrival
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Side by Side Cost & Friction Comparison */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Legacy Route */}
            <div className="neu-inset p-6 rounded-3xl space-y-4 border border-red-300/50 dark:border-red-900/40">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-950/60 px-3 py-1 rounded-full">
                  Legacy SWIFT Route
                </span>
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Traditional Banking</span>
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">Broken &amp; Predatory Intermediation</h3>
              
              <div className="space-y-3 text-xs text-slate-800 dark:text-slate-300 font-medium">
                <div className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span><strong>Routing:</strong> Africa (KES/NGN) ➔ US Correspondent Bank (NYC) ➔ Frankfurt ➔ Central Bank of Bolivia (5 hops).</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span><strong>Time Delay:</strong> 5 to 7 business days with arbitrary sanctions/compliance holds.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span><strong>Double FX Spread:</strong> 8% to 12% lost in intermediate conversion to USD.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span><strong>Escrow Yield:</strong> 0% (Banks take your float; you earn nothing).</span>
                </div>
              </div>

              <div className="neu-card-sm p-3 rounded-2xl bg-red-50/50 dark:bg-red-950/30 text-xs font-mono text-red-800 dark:text-red-300 font-bold">
                Example $5,000 Trade: Cost ~$485 in fees &amp; spreads. Total time: 6 days.
              </div>
            </div>

            {/* char Route */}
            <div className="neu-card p-6 rounded-3xl space-y-4 border border-emerald-300/80 dark:border-emerald-700/60 shadow-neu-glow">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1 rounded-full">
                  char Highway
                </span>
                <span className="text-xs font-black text-emerald-700 dark:text-emerald-400">Stellar × Pollar</span>
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">Atomic, Non-Custodial &amp; Yield-Bearing</h3>

              <div className="space-y-3 text-xs text-slate-800 dark:text-slate-300 font-medium">
                <div className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span><strong>Routing:</strong> African Mobile Money (M-Pesa/Bank) ➔ Stellar USDC ➔ Bolivian BOB Ramp (Direct South-South).</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span><strong>Time Delay:</strong> Under 5 seconds on-chain; minutes for local fiat rails.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span><strong>Transaction Cost:</strong> 0.35% FX spread + gas sponsored by Pollar.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span><strong>Escrow Yield:</strong> +7.8% APY paid to buyer/seller via Blend lending pool.</span>
                </div>
              </div>

              <div className="neu-inset p-3 rounded-2xl text-xs font-mono text-emerald-900 dark:text-emerald-300 font-black">
                Example $5,000 Trade: Cost ~$18. Total time: 4 seconds. +$31.20 yield earned!
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

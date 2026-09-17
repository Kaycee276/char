'use client';

import React, { useState } from 'react';
import { 
  TrendingUp, 
  Globe2, 
  CheckCircle2, 
  AlertTriangle,
  Smartphone,
  Building,
  ShieldCheck,
  Zap
} from 'lucide-react';

export function CorridorVisualizer() {
  const [activeTab, setActiveTab] = useState<'comparison' | 'flow'>('flow');

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-4">
      <div className="neu-card rounded-3xl p-6 sm:p-8 border border-white/80 space-y-6">
        {/* Header and Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-300/40 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Globe2 className="w-5 h-5 text-indigo-600" />
              <h2 className="text-xl font-bold text-slate-800">
                The South-South Cross-Continental Highway
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Direct peer-to-peer settlement between Africa and Latin America powered by Pollar & Stellar
            </p>
          </div>

          {/* Neumorphic Segmented Tab */}
          <div className="flex items-center neu-inset p-1 rounded-2xl self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('flow')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'flow'
                  ? 'neu-btn text-emerald-700 font-extrabold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Corridor Flow
            </button>
            <button
              onClick={() => setActiveTab('comparison')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'comparison'
                  ? 'neu-btn text-indigo-700 font-extrabold'
                  : 'text-slate-500 hover:text-slate-800'
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
              <div className="neu-card-sm rounded-3xl p-5 border border-white/80 relative space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-full">
                    Leg 1: African Origin
                  </span>
                  <Smartphone className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-800">Local Fiat Ingress</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    African importer or client funds in local currency through daily payment rails.
                  </p>
                </div>
                <div className="neu-inset p-3 rounded-2xl space-y-2 text-xs">
                  <div className="flex items-center justify-between font-semibold text-slate-700">
                    <span>🇰🇪 M-Pesa STK Push:</span>
                    <span className="font-mono text-emerald-600 font-bold">KES</span>
                  </div>
                  <div className="flex items-center justify-between font-semibold text-slate-700">
                    <span>🇳🇬 Bank Transfer (Paystack):</span>
                    <span className="font-mono text-indigo-600 font-bold">NGN</span>
                  </div>
                  <div className="flex items-center justify-between font-semibold text-slate-700">
                    <span>🇬🇭 Mobile Money (MoMo):</span>
                    <span className="font-mono text-amber-600 font-bold">GHS</span>
                  </div>
                </div>
                <div className="pt-2 text-[11px] text-slate-500 flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Auto-mints Stellar USDC at zero user gas
                </div>
              </div>

              {/* Step 2: Yield Escrow on Stellar */}
              <div className="neu-card-sm rounded-3xl p-5 border border-white/80 relative space-y-3 neu-pulse">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-700 bg-indigo-100/70 px-2.5 py-1 rounded-full">
                    Leg 2: Yield Escrow
                  </span>
                  <TrendingUp className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-800">Blend / DeFindex Staking</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Funds do not sit idle. Escrow deposits into Stellar lending pool while shipment is in transit.
                  </p>
                </div>
                <div className="neu-inset p-3 rounded-2xl space-y-2 text-xs">
                  <div className="flex items-center justify-between font-semibold text-slate-700">
                    <span>Stellar Asset:</span>
                    <span className="font-mono font-bold text-slate-800">USDC (Circle)</span>
                  </div>
                  <div className="flex items-center justify-between font-semibold text-slate-700">
                    <span>Active Protocol:</span>
                    <span className="font-bold text-indigo-600">Blend Lending Pool</span>
                  </div>
                  <div className="flex items-center justify-between font-semibold text-slate-700">
                    <span>Yield Benefit:</span>
                    <span className="font-bold text-emerald-600">+7.8% APY Rebate</span>
                  </div>
                </div>
                <div className="pt-2 text-[11px] text-slate-500 flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                  Non-custodial milestone release
                </div>
              </div>

              {/* Step 3: Bolivian Cashout */}
              <div className="neu-card-sm rounded-3xl p-5 border border-white/80 relative space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-orange-700 bg-orange-100/70 px-2.5 py-1 rounded-full">
                    Leg 3: Bolivian Egress
                  </span>
                  <Building className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-800">Live BOB Ramp Settlement</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Bolivian merchant releases escrow and cashes out straight to local Bolivian Bolivianos (BOB).
                  </p>
                </div>
                <div className="neu-inset p-3 rounded-2xl space-y-2 text-xs">
                  <div className="flex items-center justify-between font-semibold text-slate-700">
                    <span>Pollar Anchor:</span>
                    <span className="font-bold text-slate-800">Live BOB Ramp 🇧🇴</span>
                  </div>
                  <div className="flex items-center justify-between font-semibold text-slate-700">
                    <span>Local Banks:</span>
                    <span className="font-mono text-slate-600">Unión, BMSC, BNB</span>
                  </div>
                  <div className="flex items-center justify-between font-semibold text-slate-700">
                    <span>Mobile QR:</span>
                    <span className="font-semibold text-orange-600">QR Simple Bolivia</span>
                  </div>
                </div>
                <div className="pt-2 text-[11px] text-slate-500 flex items-center gap-1.5 font-medium">
                  <Zap className="w-3.5 h-3.5 text-orange-600" />
                  Instant local bank transfer arrival
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Side by Side Cost & Friction Comparison */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Legacy Route */}
            <div className="neu-inset p-6 rounded-3xl space-y-4 border border-red-200/50">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-100/70 px-3 py-1 rounded-full flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> Legacy SWIFT Route
                </span>
                <span className="text-xs font-semibold text-slate-500">Traditional Banking</span>
              </div>
              <h3 className="text-lg font-bold text-slate-800">Broken & Predatory Intermediation</h3>
              
              <div className="space-y-3 text-xs text-slate-600">
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

              <div className="neu-card-sm p-3 rounded-2xl bg-red-50/50 text-xs font-mono text-red-700">
                Example $5,000 Trade: Cost ~$485 in fees & spreads. Total time: 6 days.
              </div>
            </div>

            {/* char Route */}
            <div className="neu-card p-6 rounded-3xl space-y-4 border border-emerald-300/60 shadow-neu-glow">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/80 px-3 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> char Highway
                </span>
                <span className="text-xs font-extrabold text-emerald-600">Stellar × Pollar</span>
              </div>
              <h3 className="text-lg font-bold text-slate-800">Atomic, Non-Custodial & Yield-Bearing</h3>

              <div className="space-y-3 text-xs text-slate-600">
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

              <div className="neu-inset p-3 rounded-2xl text-xs font-mono text-emerald-800 font-semibold">
                Example $5,000 Trade: Cost ~$18. Total time: 4 seconds. +$31.20 yield earned!
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

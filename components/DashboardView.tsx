'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePollar } from '@pollar/react';
import { useDemoAuth } from './providers/PollarClientProvider';
import { getStoredTrades, TradeItem } from '@/lib/tradeStore';
import { formatCurrency, convertFromUsdc, RATES } from '@/lib/currency';
import { CorridorArchitectureDoc } from './CorridorArchitectureDoc';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function DashboardView() {
  const pollar = usePollar();
  const { demoUser } = useDemoAuth();

  const [trades, setTrades] = useState<TradeItem[]>([]);
  const [showArchDocs, setShowArchDocs] = useState(false);

  useEffect(() => {
    setTrades(getStoredTrades());
  }, []);

  const address = pollar?.wallet?.address || demoUser?.address || 'G...';
  const roleTitle = demoUser?.role === 'importer'
    ? 'African Importer (Nairobi Hub)'
    : demoUser?.role === 'exporter'
    ? 'Bolivian Exporter (La Paz Hub)'
    : 'Corridor Trader';

  // Calculate high-level summary metrics
  const totalEscrowUsdc = trades
    .filter((t) => t.status === 'ESCROW_LOCKED')
    .reduce((sum, t) => sum + t.amountUsdc, 0);

  const totalYieldUsdc = trades.reduce((sum, t) => sum + t.yieldEarnedUsdc, 0);

  // Take only top 2-3 recent trades to keep page calm and uncluttered
  const recentTrades = trades.slice(0, 3);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-8">
      {/* 1. Welcome & Account Bar */}
      <div className="neu-card rounded-3xl p-6 sm:p-8 border border-white/80 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full neu-inset text-emerald-800 dark:text-emerald-400">
              {demoUser ? 'Testnet Role' : 'Pollar Smart Wallet'}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              {address.slice(0, 6)}...{address.slice(-4)}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Welcome back, {roleTitle}
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Non-custodial corridor dashboard · Stellar Testnet · Sponsored Gas
          </p>
        </div>

        {/* Quick New Contract CTA */}
        <div className="flex items-center gap-3">
          <Link
            href="/trades/new"
            className="px-6 py-3 rounded-2xl neu-btn-primary text-white text-xs font-bold shadow-neu-glow hover:opacity-95"
          >
            + Create New Contract
          </Link>
        </div>
      </div>

      {/* 2. Key Summary Cards (Clean & High Contrast) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* Card 1: Active Escrow */}
        <div className="neu-card-sm rounded-3xl p-5 border border-white/80 dark:border-white/10 space-y-1">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Active Escrow In Transit
          </span>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">
            {formatCurrency(totalEscrowUsdc || 1250, 'USDC')}
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
            Protected in non-custodial smart contracts
          </p>
        </div>

        {/* Card 2: Accrued Blend Yield */}
        <div className="neu-card-sm rounded-3xl p-5 border border-emerald-300/80 dark:border-emerald-700/50 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-1 neu-pulse">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
              Live Blend Yield Earned
            </span>
            <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
              +7.8% APY
            </span>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-emerald-700 dark:text-emerald-400 font-mono">
            +{totalYieldUsdc.toFixed(2)} USDC
          </p>
          <p className="text-xs text-emerald-800 dark:text-emerald-300 font-medium">
            Accruing hourly on in-transit trade float
          </p>
        </div>

        {/* Card 3: Live BOB Exchange Rate */}
        <div className="neu-card-sm rounded-3xl p-5 border border-white/80 dark:border-white/10 space-y-1">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-orange-800 dark:text-orange-400">
            Pollar BOB Off-Ramp
          </span>
          <p className="text-2xl sm:text-3xl font-black text-orange-600 dark:text-orange-400 font-mono">
            {RATES.BOB.ratePerUsdc} BOB
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
            1 USDC guaranteed 15-min payout quote
          </p>
        </div>
      </div>

      {/* 3. Quick Action Shortcuts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/trades/new"
          className="neu-btn p-4 rounded-2xl flex items-center justify-between group text-left"
        >
          <div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">Create Trade Invoice</h3>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">Initiate trade between Africa &amp; Bolivia</p>
          </div>
          <span className="text-xs text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white font-mono">→</span>
        </Link>

        <Link
          href="/trades"
          className="neu-btn p-4 rounded-2xl flex items-center justify-between group text-left"
        >
          <div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">All Trade Contracts</h3>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">View and inspect all corridor escrows</p>
          </div>
          <span className="text-xs text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white font-mono">→</span>
        </Link>

        <Link
          href="/ramps"
          className="neu-btn p-4 rounded-2xl flex items-center justify-between group text-left"
        >
          <div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">Bolivia BOB Ramp Terminal</h3>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">Test direct cashout into Banco Unión &amp; QR</p>
          </div>
          <span className="text-xs text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white font-mono">→</span>
        </Link>
      </div>

      {/* 4. Recent Contracts (Top 3 Only - Not Overwhelming) */}
      <div className="neu-card rounded-3xl p-6 sm:p-8 border border-white/80 dark:border-white/10 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-300/40 dark:border-slate-800/80 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Recent Trade Contracts
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Showing your latest active escrows
            </p>
          </div>
          <Link
            href="/trades"
            className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
          >
            View All ({trades.length}) →
          </Link>
        </div>

        <div className="space-y-3">
          {recentTrades.map((trade) => {
            const bobAmount = convertFromUsdc(trade.amountUsdc, 'BOB');

            return (
              <div
                key={trade.id}
                className="neu-inset p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400">
                      {trade.id}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full neu-card-sm text-slate-700 dark:text-slate-300">
                      {trade.category}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {trade.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {trade.buyerName} ({trade.buyerCity}) → {trade.sellerName} ({trade.sellerCity})
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <div className="text-right">
                    <p className="text-sm font-black text-slate-900 dark:text-white font-mono">
                      {formatCurrency(trade.amountUsdc, 'USDC')}
                    </p>
                    <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                      ≈ {formatCurrency(bobAmount, 'BOB')}
                    </span>
                  </div>

                  {/* Status Pill */}
                  <div>
                    {trade.status === 'CREATED' && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold neu-card-sm text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                        Awaiting Funding
                      </span>
                    )}
                    {trade.status === 'ESCROW_LOCKED' && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold neu-card-sm text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        In Escrow &amp; Staked
                      </span>
                    )}
                    {trade.status === 'RELEASED' && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold neu-card-sm text-indigo-800 dark:text-indigo-300 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                        Delivered (Ready for BOB)
                      </span>
                    )}
                    {trade.status === 'OFFRAMPED_BOB' && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold neu-card-sm text-orange-800 dark:text-orange-300 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        Settled in BOB
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/trades/${trade.id}`}
                    className="px-3 py-1.5 rounded-xl neu-btn text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white"
                  >
                    View
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center pt-2">
          <Link
            href="/trades"
            className="inline-block px-6 py-2.5 rounded-2xl neu-btn text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white"
          >
            Open All Contracts Explorer →
          </Link>
        </div>
      </div>

      {/* 5. Optional Collapsible Architecture Section */}
      <div className="pt-2">
        <button
          onClick={() => setShowArchDocs(!showArchDocs)}
          className="w-full py-3 px-5 rounded-2xl neu-btn flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white"
        >
          <span>Pollar SDK &amp; Stellar Architecture Documentation</span>
          {showArchDocs ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showArchDocs && (
          <div className="mt-4 animate-in fade-in zoom-in-95 duration-200">
            <CorridorArchitectureDoc />
          </div>
        )}
      </div>
    </div>
  );
}

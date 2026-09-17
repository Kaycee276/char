'use client';

import React, { useState, useEffect } from 'react';
import { 
  TradeItem, 
  TradeStatus, 
  getStoredTrades, 
  updateTradeStatus 
} from '@/lib/tradeStore';
import { formatCurrency, convertFromUsdc } from '@/lib/currency';
import { AfricanFundingModal } from './AfricanFundingModal';
import { BoliviaRampModal } from './BoliviaRampModal';
import { TradeInvoiceModal } from './TradeInvoiceModal';
import confetti from 'canvas-confetti';
import { 
  Plus, 
  Search, 
  Smartphone, 
  Building2, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  PackageCheck
} from 'lucide-react';

export function TradeList() {
  const [trades, setTrades] = useState<TradeItem[]>([]);
  const [selectedTradeForFunding, setSelectedTradeForFunding] = useState<TradeItem | null>(null);
  const [selectedTradeForOfframp, setSelectedTradeForOfframp] = useState<TradeItem | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'ALL' | TradeStatus>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Initial load
  useEffect(() => {
    setTrades(getStoredTrades());
  }, []);

  // Live real-time escrow yield counter (compounding every second!)
  useEffect(() => {
    const timer = setInterval(() => {
      setTrades((prevTrades) => {
        return prevTrades.map((t) => {
          if (t.status === 'ESCROW_LOCKED') {
            // 7.8% APY divided into per-second increment
            const annualYield = t.amountUsdc * (t.yieldApyPercent / 100);
            const perSecondYield = annualYield / (365 * 24 * 3600);
            return {
              ...t,
              yieldEarnedUsdc: t.yieldEarnedUsdc + perSecondYield,
            };
          }
          return t;
        });
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleReleaseEscrow = (trade: TradeItem) => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
    });
    const updated = updateTradeStatus(trade.id, 'RELEASED');
    setTrades(updated);
  };

  const filteredTrades = trades.filter((t) => {
    const matchesFilter = filterStatus === 'ALL' || t.status === filterStatus;
    const matchesSearch = 
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.sellerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.buyerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.sellerCity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.buyerCity.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status: TradeStatus) => {
    switch (status) {
      case 'CREATED':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-extrabold neu-inset text-amber-700 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> Awaiting Funding
          </span>
        );
      case 'ESCROW_LOCKED':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-extrabold neu-card-sm text-emerald-700 bg-emerald-100/70 border border-emerald-300 flex items-center gap-1.5 animate-pulse">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" /> Escrow Locked & Earning
          </span>
        );
      case 'RELEASED':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-extrabold neu-card-sm text-indigo-700 bg-indigo-100/70 border border-indigo-300 flex items-center gap-1.5">
            <PackageCheck className="w-3.5 h-3.5 text-indigo-600" /> Delivered (Ready for BOB)
          </span>
        );
      case 'OFFRAMPED_BOB':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-extrabold neu-inset text-orange-700 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-orange-600" /> Settled in BOB 🇧🇴
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-6">
      {/* Controls: Search, Filter, Create */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder="Search commodities, companies, or cities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-2xl neu-input text-xs font-medium text-slate-800"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center neu-inset p-1 rounded-2xl overflow-x-auto">
          {(['ALL', 'CREATED', 'ESCROW_LOCKED', 'RELEASED', 'OFFRAMPED_BOB'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all ${
                filterStatus === st
                  ? 'neu-btn text-slate-800 font-extrabold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {st === 'ALL'
                ? 'All Trades'
                : st === 'CREATED'
                ? 'Needs Funding'
                : st === 'ESCROW_LOCKED'
                ? 'In Escrow'
                : st === 'RELEASED'
                ? 'Ready for BOB'
                : 'Settled'}
            </button>
          ))}
        </div>

        {/* Create Invoice Button */}
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-5 py-2.5 rounded-2xl neu-btn-primary text-white text-xs font-bold flex items-center justify-center gap-2 shadow-neu-glow hover:opacity-95"
        >
          <Plus className="w-4 h-4" /> New Trade Contract
        </button>
      </div>

      {/* Trade Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTrades.map((trade) => {
          const kesAmount = convertFromUsdc(trade.amountUsdc, 'KES');
          const bobAmount = convertFromUsdc(trade.amountUsdc + trade.yieldEarnedUsdc, 'BOB');

          return (
            <div
              key={trade.id}
              className={`neu-card rounded-3xl p-6 sm:p-7 border border-white/80 space-y-5 flex flex-col justify-between transition-all ${
                trade.status === 'ESCROW_LOCKED' ? 'shadow-neu-glow' : ''
              }`}
            >
              <div>
                {/* Header: Title, Category & Status */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                      {trade.category} • Ref: {trade.id}
                    </span>
                    <h3 className="text-base font-black text-slate-800 tracking-tight mt-0.5">
                      {trade.title}
                    </h3>
                  </div>
                  <div>{getStatusBadge(trade.status)}</div>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                  {trade.description}
                </p>

                {/* Corridor Route Details */}
                <div className="mt-4 neu-inset p-3.5 rounded-2xl grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-orange-700 block">
                      Bolivian Exporter 🇧🇴
                    </span>
                    <p className="font-bold text-slate-800 truncate">{trade.sellerName}</p>
                    <p className="text-[11px] text-slate-500">{trade.sellerCity}, Bolivia</p>
                  </div>

                  <div className="border-l border-slate-300/60 pl-3">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 block">
                      African Importer 🌍
                    </span>
                    <p className="font-bold text-slate-800 truncate">{trade.buyerName}</p>
                    <p className="text-[11px] text-slate-500">
                      {trade.buyerCity}, {trade.buyerCountry} ({trade.buyerRail === 'MPESA' ? 'M-Pesa 🇰🇪' : 'Paystack 🇳🇬'})
                    </p>
                  </div>
                </div>

                {/* Amount & Yield Box */}
                <div className="mt-4 flex items-center justify-between neu-card-sm p-4 rounded-2xl border border-white/60">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                      Contract Principal
                    </span>
                    <span className="text-xl font-black text-slate-800 font-mono">
                      {formatCurrency(trade.amountUsdc, 'USDC')}
                    </span>
                    <div className="text-[10px] text-slate-500 font-mono">
                      ≈ {formatCurrency(kesAmount, 'KES')}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 block flex items-center justify-end gap-1">
                      <TrendingUp className="w-3 h-3" /> Blend Yield
                    </span>
                    <span className="text-lg font-black text-emerald-600 font-mono">
                      +{trade.yieldEarnedUsdc.toFixed(4)} USDC
                    </span>
                    <div className="text-[10px] text-emerald-700 font-semibold">
                      Compounding at 7.8% APY
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons based on Status */}
              <div className="pt-2 border-t border-slate-300/40">
                {trade.status === 'CREATED' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedTradeForFunding(trade)}
                      className="w-full py-3 px-4 rounded-2xl neu-btn-primary text-white text-xs font-bold flex items-center justify-center gap-2 shadow-neu-glow"
                    >
                      <Smartphone className="w-4 h-4" /> Fund via M-Pesa / African Rail
                    </button>
                  </div>
                )}

                {trade.status === 'ESCROW_LOCKED' && (
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => handleReleaseEscrow(trade)}
                      className="flex-1 py-3 px-4 rounded-2xl neu-btn-primary bg-gradient-to-r from-indigo-600 to-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-2"
                    >
                      <PackageCheck className="w-4 h-4" /> Confirm Inspection & Release Escrow
                    </button>
                  </div>
                )}

                {trade.status === 'RELEASED' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedTradeForOfframp(trade)}
                      className="w-full py-3 px-4 rounded-2xl neu-btn-primary bg-gradient-to-r from-orange-600 to-amber-600 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-neu-amber"
                    >
                      <Building2 className="w-4 h-4" /> Cash Out {formatCurrency(bobAmount, 'BOB')} to Bank (Pollar Ramp)
                    </button>
                  </div>
                )}

                {trade.status === 'OFFRAMPED_BOB' && (
                  <div className="neu-inset p-3 rounded-2xl flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-orange-700 font-bold">
                      <CheckCircle2 className="w-4 h-4 text-orange-600" />
                      <span>Settled: {formatCurrency(trade.boliviaBankDestination?.bobAmount ?? bobAmount, 'BOB')}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">
                      Banco: {trade.boliviaBankDestination?.bankName || 'Banco Unión'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredTrades.length === 0 && (
        <div className="neu-card rounded-3xl p-12 text-center space-y-3">
          <p className="text-slate-500 text-sm font-semibold">No trade contracts match your search.</p>
          <button
            onClick={() => {
              setFilterStatus('ALL');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-2xl neu-btn text-xs font-bold text-slate-700"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Modals */}
      <AfricanFundingModal
        trade={selectedTradeForFunding}
        isOpen={!!selectedTradeForFunding}
        onClose={() => setSelectedTradeForFunding(null)}
        onSuccess={(updated) => setTrades(updated)}
      />

      <BoliviaRampModal
        trade={selectedTradeForOfframp}
        isOpen={!!selectedTradeForOfframp}
        onClose={() => setSelectedTradeForOfframp(null)}
        onSuccess={(updated) => setTrades(updated)}
      />

      <TradeInvoiceModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onTradeCreated={() => {
          setTrades(getStoredTrades());
        }}
      />
    </section>
  );
}

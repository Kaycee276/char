'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { 
  TradeItem, 
  getStoredTrades, 
  updateTradeStatus 
} from '@/lib/tradeStore';
import { formatCurrency, convertFromUsdc } from '@/lib/currency';
import { AfricanFundingModal } from '@/components/AfricanFundingModal';
import { BoliviaRampModal } from '@/components/BoliviaRampModal';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  Clock, 
  TrendingUp, 
  PackageCheck, 
  CheckCircle2, 
  Check,
  Building2, 
  Smartphone
} from 'lucide-react';

export default function TradeDetailPage() {
  const params = useParams();
  const tradeId = params?.id as string;

  const [trade, setTrade] = useState<TradeItem | null>(null);
  const [isFundingModalOpen, setIsFundingModalOpen] = useState(false);
  const [isOfframpModalOpen, setIsOfframpModalOpen] = useState(false);

  // Load trade
  useEffect(() => {
    const allTrades = getStoredTrades();
    const found = allTrades.find((t) => t.id === tradeId);
    if (found) {
      setTrade(found);
    }
  }, [tradeId]);

  // Real-time ticking yield counter for ESCROW_LOCKED
  useEffect(() => {
    if (!trade || trade.status !== 'ESCROW_LOCKED') return;

    const timer = setInterval(() => {
      setTrade((prev) => {
        if (!prev || prev.status !== 'ESCROW_LOCKED') return prev;
        const annualYield = prev.amountUsdc * (prev.yieldApyPercent / 100);
        const perSecondYield = annualYield / (365 * 24 * 3600);
        return {
          ...prev,
          yieldEarnedUsdc: prev.yieldEarnedUsdc + perSecondYield,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trade?.status]);

  const handleReleaseEscrow = () => {
    if (!trade) return;
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
    const updatedTrades = updateTradeStatus(trade.id, 'RELEASED');
    const updatedCurrent = updatedTrades.find((t) => t.id === trade.id);
    if (updatedCurrent) setTrade(updatedCurrent);
  };

  if (!trade) {
    return (
      <div className="min-h-screen bg-[#e9edf3] text-slate-800 flex flex-col justify-between">
        <div>
          <Navbar />
          <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
            <h2 className="text-xl font-bold text-slate-700">Contract Not Found</h2>
            <p className="text-xs text-slate-500">The requested trade contract could not be loaded.</p>
            <Link href="/trades" className="px-5 py-2.5 rounded-2xl neu-btn text-xs font-bold text-slate-700 inline-block">
              Return to All Contracts
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const kesAmount = convertFromUsdc(trade.amountUsdc, 'KES');
  const bobAmount = convertFromUsdc(trade.amountUsdc + trade.yieldEarnedUsdc, 'BOB');

  const steps = [
    { label: 'Created', done: true },
    { label: 'Funded & In Escrow', done: trade.status !== 'CREATED' },
    { label: 'Delivered', done: trade.status === 'RELEASED' || trade.status === 'OFFRAMPED_BOB' },
    { label: 'Settled in BOB', done: trade.status === 'OFFRAMPED_BOB' },
  ];

  return (
    <div className="min-h-screen bg-[#e9edf3] text-slate-800 flex flex-col justify-between selection:bg-emerald-500 selection:text-white">
      <div>
        <Navbar />

        <main className="max-w-5xl mx-auto px-4 sm:px-8 py-6 space-y-6">
          {/* Back link */}
          <div>
            <Link
              href="/trades"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to All Contracts
            </Link>
          </div>

          {/* Main Card */}
          <div className="neu-card rounded-3xl p-6 sm:p-10 border border-white/80 space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-300/40 pb-6">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full neu-inset text-slate-700">
                    {trade.category} • Ref: {trade.id}
                  </span>
                  <span className="text-xs text-slate-600 font-semibold">
                    Created {new Date(trade.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {trade.title}
                </h1>
                <p className="text-xs text-slate-700 font-medium mt-1 max-w-2xl leading-relaxed">
                  {trade.description}
                </p>
              </div>

              {/* Status Badge */}
              <div className="self-start">
                {trade.status === 'CREATED' && (
                  <span className="px-4 py-2 rounded-full text-xs font-black neu-inset text-amber-800 flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Awaiting African Funding
                  </span>
                )}
                {trade.status === 'ESCROW_LOCKED' && (
                  <span className="px-4 py-2 rounded-full text-xs font-black neu-card-sm text-emerald-800 bg-emerald-100 border border-emerald-300 flex items-center gap-2 animate-pulse">
                    <TrendingUp className="w-4 h-4 text-emerald-600" /> In Escrow &amp; Staked in Blend
                  </span>
                )}
                {trade.status === 'RELEASED' && (
                  <span className="px-4 py-2 rounded-full text-xs font-black neu-card-sm text-indigo-800 bg-indigo-100 border border-indigo-300 flex items-center gap-2">
                    <PackageCheck className="w-4 h-4 text-indigo-600" /> Delivered (Ready for BOB)
                  </span>
                )}
                {trade.status === 'OFFRAMPED_BOB' && (
                  <span className="px-4 py-2 rounded-full text-xs font-black neu-inset text-orange-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-orange-600" /> Settled in BOB
                  </span>
                )}
              </div>
            </div>

            {/* Stepper Pipeline */}
            <div className="neu-inset p-5 rounded-3xl">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {steps.map((step, idx) => (
                  <div key={step.label} className="flex items-center gap-2.5">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all ${
                        step.done
                          ? 'neu-btn bg-emerald-600 text-white font-black shadow-neu-sm'
                          : 'neu-inset text-slate-600 font-bold'
                      }`}
                    >
                      {step.done ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : idx + 1}
                    </div>
                    <span
                      className={`text-xs ${
                        step.done ? 'font-black text-slate-900' : 'text-slate-600 font-semibold'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Principal & Compounding Escrow Yield Box */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="neu-card-sm p-5 rounded-2xl border border-white/80 space-y-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-600">
                  Escrow Principal
                </span>
                <p className="text-2xl sm:text-3xl font-black text-slate-950 font-mono">
                  {formatCurrency(trade.amountUsdc, 'USDC')}
                </p>
                <p className="text-xs text-slate-700 font-mono font-bold">
                  ≈ {formatCurrency(kesAmount, 'KES')}
                </p>
              </div>

              {/* Blend Staking APY */}
              <div className="neu-card-sm p-5 rounded-2xl border border-emerald-300/80 bg-emerald-50/60 space-y-1 neu-pulse">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800">
                    Live Blend Yield Accrued
                  </span>
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-2xl sm:text-3xl font-black text-emerald-700 font-mono">
                  +{trade.yieldEarnedUsdc.toFixed(4)} USDC
                </p>
                <p className="text-xs text-emerald-800 font-bold">
                  Compounding live at +7.8% APY
                </p>
              </div>

              {/* Bolivia BOB Cashout Estimate */}
              <div className="neu-card-sm p-5 rounded-2xl border border-white/80 space-y-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-orange-800">
                  Bolivian Payout (BOB)
                </span>
                <p className="text-2xl sm:text-3xl font-black text-orange-700 font-mono">
                  {formatCurrency(bobAmount, 'BOB')}
                </p>
                <p className="text-xs text-slate-700 font-mono font-bold">
                  1 USDC = 6.96 BOB (Pollar Ramp)
                </p>
              </div>
            </div>

            {/* Origin & Destination Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* African Payer */}
              <div className="neu-inset p-5 rounded-3xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
                    African Importer
                  </span>
                  <Smartphone className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-700 font-semibold">Company:</span>
                    <span className="font-black text-slate-900">{trade.buyerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-700 font-semibold">Location:</span>
                    <span className="font-bold text-slate-800">{trade.buyerCity}, {trade.buyerCountry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-700 font-semibold">Payment Rail:</span>
                    <span className="font-black text-emerald-700">
                      {trade.buyerRail === 'MPESA' ? 'Safaricom M-Pesa (STK Push)' : 'Paystack Nigerian Bank'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bolivian Exporter */}
              <div className="neu-inset p-5 rounded-3xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-orange-800 bg-orange-100 px-2.5 py-1 rounded-full">
                    Bolivian Exporter (BO)
                  </span>
                  <Building2 className="w-5 h-5 text-orange-600" />
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-700 font-semibold">Exporter:</span>
                    <span className="font-black text-slate-900">{trade.sellerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-700 font-semibold">Location:</span>
                    <span className="font-bold text-slate-800">{trade.sellerCity}, Bolivia</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-700 font-semibold">Settlement Bank:</span>
                    <span className="font-black text-orange-800">
                      {trade.boliviaBankDestination?.bankName || 'Banco Unión'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons Based on Lifecycle */}
            <div className="pt-4 border-t border-slate-300/40">
              {trade.status === 'CREATED' && (
                <button
                  onClick={() => setIsFundingModalOpen(true)}
                  className="w-full py-4 px-6 rounded-2xl neu-btn-primary text-white text-sm font-bold flex items-center justify-center gap-2 shadow-neu-glow hover:opacity-95"
                >
                  <Smartphone className="w-5 h-5" />
                  <span>Fund Invoice via M-Pesa / African Rail</span>
                </button>
              )}

              {trade.status === 'ESCROW_LOCKED' && (
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleReleaseEscrow}
                    className="flex-1 py-4 px-6 rounded-2xl neu-btn-primary bg-gradient-to-r from-indigo-600 to-emerald-600 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-neu-glow hover:opacity-95"
                  >
                    <PackageCheck className="w-5 h-5" />
                    <span>Confirm Inspection &amp; Release Escrow to Seller</span>
                  </button>
                </div>
              )}

              {trade.status === 'RELEASED' && (
                <button
                  onClick={() => setIsOfframpModalOpen(true)}
                  className="w-full py-4 px-6 rounded-2xl neu-btn-primary bg-gradient-to-r from-orange-600 to-amber-600 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-neu-amber hover:opacity-95"
                >
                  <Building2 className="w-5 h-5" />
                  <span>Cash Out {formatCurrency(bobAmount, 'BOB')} to Bank (Pollar BOB Ramp)</span>
                </button>
              )}

              {trade.status === 'OFFRAMPED_BOB' && (
                <div className="neu-card p-5 rounded-2xl bg-orange-50/70 border border-orange-300 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-8 h-8 text-orange-600" />
                    <div>
                      <h4 className="text-sm font-black text-slate-900">Settled to Bolivian Bank</h4>
                      <p className="text-xs text-slate-700 font-medium">
                        {formatCurrency(trade.boliviaBankDestination?.bobAmount ?? bobAmount, 'BOB')} credited via Pollar live BOB ramp.
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-orange-800">
                    {trade.boliviaBankDestination?.bankName}
                  </span>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Modals */}
      <AfricanFundingModal
        trade={trade}
        isOpen={isFundingModalOpen}
        onClose={() => setIsFundingModalOpen(false)}
        onSuccess={(updatedTrades) => {
          const current = updatedTrades.find((t) => t.id === trade.id);
          if (current) setTrade(current);
        }}
      />

      <BoliviaRampModal
        trade={trade}
        isOpen={isOfframpModalOpen}
        onClose={() => setIsOfframpModalOpen(false)}
        onSuccess={(updatedTrades) => {
          const current = updatedTrades.find((t) => t.id === trade.id);
          if (current) setTrade(current);
        }}
      />

      <Footer />
    </div>
  );
}

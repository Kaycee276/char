'use client';

import React, { useState } from 'react';
import { TradeItem, AfricanRail, addTrade } from '@/lib/tradeStore';
import { formatCurrency, convertFromUsdc } from '@/lib/currency';
import { 
  FileText, 
  TrendingUp, 
  Sparkles,
  X
} from 'lucide-react';

interface TradeInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTradeCreated: (newTrade: TradeItem) => void;
}

export function TradeInvoiceModal({ isOpen, onClose, onTradeCreated }: TradeInvoiceModalProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Agriculture' | 'Commodity' | 'Services' | 'Manufacturing'>('Agriculture');
  const [description] = useState('');
  const [amountUsdc, setAmountUsdc] = useState<number>(1000);
  const [sellerName, setSellerName] = useState('Cooperativa Andina de Bolivia');
  const [sellerCity, setSellerCity] = useState('La Paz');
  const [buyerName, setBuyerName] = useState('Nairobi Specialty Roasters Ltd');
  const [buyerCity, setBuyerCity] = useState('Nairobi');
  const [buyerCountry, setBuyerCountry] = useState<'Kenya' | 'Nigeria' | 'Ghana'>('Kenya');
  const [buyerRail, setBuyerRail] = useState<AfricanRail>('MPESA');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || amountUsdc <= 0) return;

    const newTrade = addTrade({
      title,
      category,
      description: description || `${title} - Export contract between ${sellerCity}, Bolivia and ${buyerCity}, ${buyerCountry}.`,
      amountUsdc: Number(amountUsdc),
      sellerName,
      sellerCity,
      sellerCountry: 'Bolivia',
      buyerName,
      buyerCity,
      buyerCountry,
      buyerRail,
      status: 'CREATED',
      boliviaBankDestination: {
        bankName: 'Banco Unión',
        accountHolder: sellerName,
        accountNumber: `100000${Math.floor(10000000 + Math.random() * 90000000)}`,
        bobAmount: convertFromUsdc(amountUsdc, 'BOB'),
      },
    });

    onTradeCreated(newTrade);
    onClose();
  };

  const handleCountryChange = (country: 'Kenya' | 'Nigeria' | 'Ghana') => {
    setBuyerCountry(country);
    if (country === 'Kenya') {
      setBuyerCity('Nairobi');
      setBuyerRail('MPESA');
    } else if (country === 'Nigeria') {
      setBuyerCity('Lagos');
      setBuyerRail('PAYSTACK_NGN');
    } else {
      setBuyerCity('Accra');
      setBuyerRail('MOMO_GHANA');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-2xl neu-card rounded-3xl p-6 sm:p-8 space-y-6 relative border border-white/80 my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-300/40 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl neu-inset flex items-center justify-center text-indigo-600">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">New Cross-Continental Trade Contract</h3>
              <p className="text-xs text-slate-700 font-medium">Initiate settlement invoice with auto-yield escrow</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full neu-btn flex items-center justify-center text-slate-700 hover:text-slate-950 font-bold"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Contract Title / Goods
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. 50 Bags Specialty Yungas Geisha Coffee"
                className="w-full px-4 py-2.5 rounded-2xl neu-input text-slate-900 text-xs font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as 'Agriculture' | 'Commodity' | 'Services' | 'Manufacturing')}
                className="w-full px-3 py-2.5 rounded-2xl neu-input text-slate-900 text-xs font-bold bg-[#e9edf3]"
              >
                <option value="Agriculture">Agriculture / Food</option>
                <option value="Commodity">Commodity / Raw</option>
                <option value="Services">Tech / Services Retainer</option>
                <option value="Manufacturing">Finished Goods</option>
              </select>
            </div>
          </div>

          {/* Amount & Real-time FX Conversion Preview */}
          <div className="neu-inset p-4 rounded-2xl space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Settlement Amount (USDC)
                </label>
                <div className="relative w-48">
                  <span className="absolute left-3 top-2.5 text-xs text-slate-500 font-bold">$</span>
                  <input
                    type="number"
                    min={10}
                    step={10}
                    required
                    value={amountUsdc}
                    onChange={(e) => setAmountUsdc(Number(e.target.value))}
                    className="w-full pl-7 pr-3 py-2 rounded-xl neu-card text-slate-950 text-sm font-black font-mono border border-white/80"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-xs">
                <div className="neu-card-sm px-3 py-2 rounded-xl">
                  <span className="text-[10px] text-slate-600 block font-bold">Bolivia (BOB):</span>
                  <span className="font-black text-orange-800 font-mono">
                    {formatCurrency(convertFromUsdc(amountUsdc, 'BOB'), 'BOB')}
                  </span>
                </div>

                <div className="neu-card-sm px-3 py-2 rounded-xl">
                  <span className="text-[10px] text-slate-600 block font-bold">
                    {buyerCountry} ({buyerRail === 'MPESA' ? 'KES' : buyerRail === 'PAYSTACK_NGN' ? 'NGN' : 'GHS'}):
                  </span>
                  <span className="font-black text-emerald-800 font-mono">
                    {buyerRail === 'MPESA'
                      ? formatCurrency(convertFromUsdc(amountUsdc, 'KES'), 'KES')
                      : buyerRail === 'PAYSTACK_NGN'
                      ? formatCurrency(convertFromUsdc(amountUsdc, 'NGN'), 'NGN')
                      : formatCurrency(convertFromUsdc(amountUsdc, 'GHS'), 'GHS')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Parties: Bolivian Exporter & African Importer */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Exporter (Bolivia) */}
            <div className="neu-card-sm p-4 rounded-2xl border border-white/80 space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-orange-800 bg-orange-100 px-2 py-0.5 rounded-full">
                Bolivian Seller / Exporter (Bolivia)
              </span>
              <div>
                <label className="text-[11px] font-bold text-slate-700 block">Company / Name</label>
                <input
                  type="text"
                  value={sellerName}
                  onChange={(e) => setSellerName(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl neu-input text-xs font-bold text-slate-900"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-700 block">City</label>
                <input
                  type="text"
                  value={sellerCity}
                  onChange={(e) => setSellerCity(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl neu-input text-xs font-bold text-slate-900"
                />
              </div>
            </div>

            {/* Importer (Africa) */}
            <div className="neu-card-sm p-4 rounded-2xl border border-white/80 space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                African Buyer / Importer
              </span>
              <div className="grid grid-cols-3 gap-1.5 pt-1">
                {(['Kenya', 'Nigeria', 'Ghana'] as const).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => handleCountryChange(c)}
                    className={`py-1 rounded-xl text-[10px] font-bold transition-all ${
                      buyerCountry === c ? 'neu-inset text-emerald-800 font-black' : 'neu-btn text-slate-700 font-semibold'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-700 block">Company / Name</label>
                <input
                  type="text"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl neu-input text-xs font-bold text-slate-900"
                />
              </div>
            </div>
          </div>

          {/* Yield Escrow Guarantee Pill */}
          <div className="neu-card-sm p-3.5 rounded-2xl flex items-center justify-between gap-3 text-xs bg-emerald-50/70 border border-emerald-300">
            <div className="flex items-center gap-2 text-emerald-900 font-black">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>Blend Yield Strategy:</span>
            </div>
            <span className="text-emerald-800 font-semibold">
              Funds earn <strong className="font-black text-emerald-950">+7.8% APY</strong> in Blend USDC lending pool during transit.
            </span>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-2xl neu-btn text-slate-700 hover:text-slate-950 text-xs font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 rounded-2xl neu-btn-primary text-white text-xs font-bold flex items-center justify-center gap-2 shadow-neu-glow"
            >
              <Sparkles className="w-4 h-4" /> Issue Trade Contract
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

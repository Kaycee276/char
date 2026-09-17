'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { addTrade, AfricanRail } from '@/lib/tradeStore';
import { formatCurrency, convertFromUsdc } from '@/lib/currency';
import confetti from 'canvas-confetti';
import { 
  PlusCircle, 
  Sparkles, 
  Building2, 
  Smartphone, 
  ArrowLeft,
  TrendingUp
} from 'lucide-react';
import Link from 'next/link';

function CreateTradePageContent() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Agriculture' | 'Commodity' | 'Services' | 'Manufacturing'>('Agriculture');
  const [description, setDescription] = useState('');
  const [amountUsdc, setAmountUsdc] = useState<number>(1500);
  const [sellerName, setSellerName] = useState('Café Yungas Cooperativa SRL');
  const [sellerCity, setSellerCity] = useState('La Paz');
  const [buyerName, setBuyerName] = useState('Nairobi Specialty Roasters Ltd');
  const [buyerCity, setBuyerCity] = useState('Nairobi');
  const [buyerCountry, setBuyerCountry] = useState<'Kenya' | 'Nigeria' | 'Ghana'>('Kenya');
  const [buyerRail, setBuyerRail] = useState<AfricanRail>('MPESA');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || amountUsdc <= 0) return;

    setIsSubmitting(true);
    const newTrade = addTrade({
      title,
      category,
      description: description || `${title} — Direct settlement contract between ${sellerCity}, Bolivia and ${buyerCity}, ${buyerCountry}.`,
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

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });

    setTimeout(() => {
      router.push(`/trades/${newTrade.id}`);
    }, 800);
  };

  const bobAmount = convertFromUsdc(amountUsdc, 'BOB');
  const localAfricanAmount = 
    buyerRail === 'MPESA' 
      ? convertFromUsdc(amountUsdc, 'KES')
      : buyerRail === 'PAYSTACK_NGN'
      ? convertFromUsdc(amountUsdc, 'NGN')
      : convertFromUsdc(amountUsdc, 'GHS');

  return (
    <div className="min-h-screen bg-[#e9edf3] text-slate-800 flex flex-col justify-between selection:bg-emerald-500 selection:text-white">
      <div>
        <Navbar />

        <main className="max-w-4xl mx-auto px-4 sm:px-8 py-6 space-y-6">
          {/* Back link */}
          <div>
            <Link
              href="/trades"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to All Contracts
            </Link>
          </div>

          <div className="neu-card rounded-3xl p-6 sm:p-10 border border-white/80 space-y-8">
            {/* Header */}
            <div className="border-b border-slate-300/40 pb-5">
              <div className="flex items-center gap-2 text-indigo-600 text-xs font-extrabold uppercase tracking-wider mb-1">
                <PlusCircle className="w-4 h-4" /> Cross-Continental Settlement Contract
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
                Create New Export Invoice
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Issue a direct payment contract connecting Bolivian exporters to African local currency rails with automated Blend yield escrow.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contract Goods Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                    Contract Title / Commodity
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. 50 Bags Specialty Geisha Coffee (Micro-Lot #42)"
                    className="w-full px-4 py-3 rounded-2xl neu-input text-slate-800 text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as 'Agriculture' | 'Commodity' | 'Services' | 'Manufacturing')}
                    className="w-full px-3 py-3 rounded-2xl neu-input text-slate-800 text-xs font-medium bg-[#e9edf3]"
                  >
                    <option value="Agriculture">Agriculture / Food</option>
                    <option value="Commodity">Commodity / Raw</option>
                    <option value="Services">Tech / Services Retainer</option>
                    <option value="Manufacturing">Finished Goods</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Delivery &amp; Milestone Terms
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Specify shipment specifications, bill of lading, or inspection requirements..."
                  className="w-full px-4 py-3 rounded-2xl neu-input text-slate-800 text-xs font-medium resize-none"
                />
              </div>

              {/* Amount & Real-Time FX Conversion Matrix */}
              <div className="neu-inset p-5 rounded-3xl space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                  Settlement Valuation &amp; FX Rates
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                  {/* Settlement Principal USDC */}
                  <div className="neu-card p-4 rounded-2xl border border-white/80">
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                      Invoice Principal (USDC)
                    </label>
                    <div className="flex items-center gap-1">
                      <span className="text-base font-black text-slate-400">$</span>
                      <input
                        type="number"
                        min={10}
                        step={10}
                        required
                        value={amountUsdc}
                        onChange={(e) => setAmountUsdc(Number(e.target.value))}
                        className="w-full font-mono text-xl font-black text-slate-800 bg-transparent focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* African Local Payer Amount */}
                  <div className="neu-card p-4 rounded-2xl border border-white/80">
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 mb-1">
                      African Buyer Rails ({buyerCountry})
                    </label>
                    <p className="font-mono text-xl font-black text-emerald-700">
                      {buyerRail === 'MPESA'
                        ? formatCurrency(localAfricanAmount, 'KES')
                        : buyerRail === 'PAYSTACK_NGN'
                        ? formatCurrency(localAfricanAmount, 'NGN')
                        : formatCurrency(localAfricanAmount, 'GHS')}
                    </p>
                    <span className="text-[10px] text-slate-400">
                      {buyerRail === 'MPESA' ? 'M-Pesa STK Push' : 'Local Bank Transfer'}
                    </span>
                  </div>

                  {/* Bolivian Merchant Cashout */}
                  <div className="neu-card p-4 rounded-2xl border border-white/80">
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-orange-700 mb-1">
                      Bolivia Bank Payout (BOB)
                    </label>
                    <p className="font-mono text-xl font-black text-orange-700">
                      {formatCurrency(bobAmount, 'BOB')}
                    </p>
                    <span className="text-[10px] text-slate-400">
                      Live Pollar Anchor (1 = 6.96 BOB)
                    </span>
                  </div>
                </div>
              </div>

              {/* Parties Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Exporter (Bolivia) */}
                <div className="neu-card-sm p-5 rounded-2xl border border-white/70 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-orange-700 bg-orange-100/70 px-2.5 py-1 rounded-full">
                      Bolivian Seller / Exporter 🇧🇴
                    </span>
                    <Building2 className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-600 block mb-1">Company / Legal Name</label>
                    <input
                      type="text"
                      value={sellerName}
                      onChange={(e) => setSellerName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl neu-input text-xs font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-600 block mb-1">City</label>
                    <input
                      type="text"
                      value={sellerCity}
                      onChange={(e) => setSellerCity(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl neu-input text-xs font-medium"
                    />
                  </div>
                </div>

                {/* Importer (Africa) */}
                <div className="neu-card-sm p-5 rounded-2xl border border-white/70 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-full">
                      African Buyer / Importer 🌍
                    </span>
                    <Smartphone className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-600 block mb-1">Destination Country</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Kenya', 'Nigeria', 'Ghana'] as const).map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => handleCountryChange(c)}
                          className={`py-1.5 rounded-xl text-xs font-bold transition-all ${
                            buyerCountry === c
                              ? 'neu-inset text-emerald-700 font-black border border-emerald-500/40'
                              : 'neu-btn text-slate-600'
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-600 block mb-1">Company / Importer Name</label>
                    <input
                      type="text"
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl neu-input text-xs font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Yield Staking Highlight */}
              <div className="neu-card p-4 rounded-2xl border border-emerald-300/60 bg-emerald-50/40 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl neu-inset flex items-center justify-center text-emerald-600 shrink-0">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">Blend Protocol Yield Activation</h4>
                    <p className="text-[11px] text-slate-500">
                      Once funded, the escrow automatically earns +7.8% APY during transit, offsetting logistics fees.
                    </p>
                  </div>
                </div>
                <span className="text-xs font-extrabold text-emerald-700 font-mono hidden sm:block">
                  +7.8% APY
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-2xl neu-btn-primary text-white text-sm font-bold flex items-center justify-center gap-2 shadow-neu-glow hover:opacity-95"
              >
                <Sparkles className="w-5 h-5" />
                <span>{isSubmitting ? 'Issuing On-Chain Contract...' : 'Issue Trade Contract on Stellar'}</span>
              </button>
            </form>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default function CreateTradePage() {
  return <CreateTradePageContent />;
}

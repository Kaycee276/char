'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { formatCurrency, convertFromUsdc } from '@/lib/currency';
import confetti from 'canvas-confetti';
import { 
  Building2, 
  CheckCircle2, 
  Loader2, 
  ExternalLink, 
  ShieldCheck, 
  Smartphone
} from 'lucide-react';

export default function RampsPage() {
  const [usdcAmount, setUsdcAmount] = useState<number>(1000);
  const [selectedBank, setSelectedBank] = useState<'UNION' | 'BMSC' | 'BNB' | 'QR'>('UNION');
  const [accountNumber, setAccountNumber] = useState('10000048291039');
  const [accountHolder, setAccountHolder] = useState('Café Andino Cooperativa SRL');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const bobAmount = convertFromUsdc(usdcAmount, 'BOB');

  const handleTestCashout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#e9edf3] text-slate-800 flex flex-col justify-between selection:bg-emerald-500 selection:text-white">
      <div>
        <Navbar />

        <main className="max-w-5xl mx-auto px-4 sm:px-8 py-6 space-y-6">
          {/* Header */}
          <div className="neu-card rounded-3xl p-6 sm:p-8 border border-white/80 space-y-2">
            <div className="flex items-center gap-2 text-orange-600 text-xs font-extrabold uppercase tracking-wider">
              <Building2 className="w-4 h-4" /> Flagship Challenge Terminal
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
              Bolivian BOB Ramp &amp; African Liquidity
            </h1>
            <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
              Pollar anchors the Latin American leg landing live in Bolivia on the BOB ramp. Test guaranteed FX quotes and direct settlement into Bolivian bank accounts.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Cashout Simulator */}
            <div className="lg:col-span-2 neu-card rounded-3xl p-6 sm:p-8 border border-white/80 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-300/40 pb-4">
                <h2 className="text-lg font-bold text-slate-800">
                  Execute BOB Off-Ramp Quote
                </h2>
                <span className="px-3 py-1 rounded-full text-xs font-bold neu-inset text-orange-700">
                  Live Rate: 1 USDC = 6.96 BOB
                </span>
              </div>

              {!isSuccess ? (
                <div className="space-y-5">
                  {/* Amount Input */}
                  <div className="neu-inset p-4 rounded-2xl flex items-center justify-between gap-4">
                    <div>
                      <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
                        Amount to Cash Out (USDC)
                      </label>
                      <div className="flex items-center gap-1">
                        <span className="text-xl font-bold text-slate-400">$</span>
                        <input
                          type="number"
                          min={10}
                          step={10}
                          value={usdcAmount}
                          onChange={(e) => setUsdcAmount(Number(e.target.value))}
                          className="bg-transparent font-mono text-2xl font-black text-slate-800 focus:outline-none w-36"
                        />
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-orange-700 block mb-1">
                        Bolivianos Payout
                      </span>
                      <p className="text-2xl font-black text-orange-600 font-mono">
                        {formatCurrency(bobAmount, 'BOB')}
                      </p>
                    </div>
                  </div>

                  {/* Destination Bank */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                      Select Bolivian Banking Channel:
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: 'UNION', name: 'Banco Unión 🇧🇴', desc: 'National Rail' },
                        { id: 'BMSC', name: 'BMSC (Mercantil)', desc: 'Commercial' },
                        { id: 'BNB', name: 'Banco Nacional', desc: 'Trade Accounts' },
                        { id: 'QR', name: 'QR Simple Pagos', desc: 'Instant QR' },
                      ].map((bank) => (
                        <button
                          key={bank.id}
                          type="button"
                          onClick={() => setSelectedBank(bank.id as 'UNION' | 'BMSC' | 'BNB' | 'QR')}
                          className={`p-3 rounded-2xl text-left transition-all ${
                            selectedBank === bank.id
                              ? 'neu-inset border border-orange-500/40 text-orange-800 font-bold'
                              : 'neu-btn text-slate-600'
                          }`}
                        >
                          <div className="text-xs font-bold">{bank.name}</div>
                          <div className="text-[10px] text-slate-500">{bank.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Account Details */}
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-600 block mb-1">
                        Account Holder / Razón Social
                      </label>
                      <input
                        type="text"
                        value={accountHolder}
                        onChange={(e) => setAccountHolder(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-2xl neu-input text-xs text-slate-800 font-medium"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-600 block mb-1">
                        Bolivian Account Number (Cuenta Bancaria)
                      </label>
                      <input
                        type="text"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-2xl neu-input text-xs text-slate-800 font-mono"
                      />
                    </div>
                  </div>

                  {/* Submit button */}
                  <button
                    onClick={handleTestCashout}
                    disabled={isProcessing}
                    className="w-full py-4 px-6 rounded-2xl neu-btn-primary bg-gradient-to-r from-orange-600 to-amber-600 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-neu-amber hover:opacity-95"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" /> Submitting to Pollar Live BOB Ramp...
                      </>
                    ) : (
                      <>
                        <Building2 className="w-5 h-5" /> Off-Ramp {formatCurrency(bobAmount, 'BOB')} to Bank
                      </>
                    )}
                  </button>
                </div>
              ) : (
                /* Success receipt */
                <div className="space-y-5 animate-in zoom-in-95 text-center py-4">
                  <CheckCircle2 className="w-14 h-14 text-orange-600 mx-auto animate-bounce" />
                  <div>
                    <h3 className="text-xl font-black text-slate-800">
                      BOB Settlement Completed!
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      {formatCurrency(bobAmount, 'BOB')} routed through Pollar&apos;s live Bolivian anchor to {accountHolder}.
                    </p>
                  </div>

                  <div className="neu-inset p-4 rounded-2xl space-y-2 text-xs font-mono text-slate-700 max-w-md mx-auto text-left">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Destination:</span>
                      <span className="font-bold">{selectedBank}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Account:</span>
                      <span>{accountNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Status:</span>
                      <span className="text-emerald-600 font-bold">Confirmed on Stellar</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsSuccess(false)}
                    className="px-6 py-2.5 rounded-2xl neu-btn text-xs font-bold text-slate-700"
                  >
                    Run Another Quote
                  </button>
                </div>
              )}
            </div>

            {/* Right Col: African Corridors & Pollar Info */}
            <div className="space-y-6">
              {/* African Rails */}
              <div className="neu-card rounded-3xl p-6 border border-white/80 space-y-4">
                <div className="flex items-center gap-2 text-emerald-700 text-xs font-extrabold uppercase tracking-wider">
                  <Smartphone className="w-4 h-4" /> Connected African Ingress
                </div>
                <h3 className="text-base font-black text-slate-800">
                  African Local Rails
                </h3>
                <div className="space-y-2.5 text-xs">
                  <div className="neu-inset p-3 rounded-2xl flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-800">Kenya M-Pesa</p>
                      <span className="text-[10px] text-slate-500">STK Push (KES)</span>
                    </div>
                    <span className="font-mono font-bold text-emerald-700">129.50 KES</span>
                  </div>

                  <div className="neu-inset p-3 rounded-2xl flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-800">Nigeria NGN Bank</p>
                      <span className="text-[10px] text-slate-500">Paystack / Virtual Acct</span>
                    </div>
                    <span className="font-mono font-bold text-indigo-700">1,485 NGN</span>
                  </div>

                  <div className="neu-inset p-3 rounded-2xl flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-800">Ghana MoMo</p>
                      <span className="text-[10px] text-slate-500">MTN / Airtel (GHS)</span>
                    </div>
                    <span className="font-mono font-bold text-amber-700">15.20 GHS</span>
                  </div>
                </div>
              </div>

              {/* Telegram Support Card */}
              <div className="neu-card rounded-3xl p-6 border border-indigo-300/60 space-y-3 bg-indigo-50/40">
                <div className="flex items-center gap-2 text-indigo-700 text-xs font-extrabold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" /> Flagship Test Team
                </div>
                <h3 className="text-sm font-bold text-slate-800">
                  Live Bolivian Ramp Access
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  The Pollar engineering team is on Telegram to assist with live ramp testing, design reviews, and verifying Bolivian end-to-end transfers.
                </p>
                <a
                  href="https://t.me/+R76f1BarXSUxMTQx"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl neu-btn text-xs font-bold text-indigo-700 hover:text-indigo-900"
                >
                  Join Pollar Telegram <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

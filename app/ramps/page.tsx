'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { formatCurrency, convertFromUsdc } from '@/lib/currency';
import confetti from 'canvas-confetti';
import { CheckCircle2, Loader2, ExternalLink } from 'lucide-react';

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
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col justify-between selection:bg-emerald-500 selection:text-white">
      <div>
        <Navbar />

        <main className="max-w-5xl mx-auto px-4 sm:px-8 py-6 space-y-6">
          {/* Header */}
          <div className="neu-card rounded-3xl p-6 sm:p-8 border border-white/80 dark:border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 text-xs font-extrabold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" /> Flagship Settlement Terminal
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Bolivian BOB Ramp &amp; African Liquidity
            </h1>
            <p className="text-xs text-slate-700 dark:text-slate-300 font-medium max-w-2xl leading-relaxed">
              Pollar anchors the Latin American leg landing live in Bolivia on the BOB ramp. Test guaranteed FX quotes and direct settlement into Bolivian bank accounts.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Cashout Simulator */}
            <div className="lg:col-span-2 neu-card rounded-3xl p-6 sm:p-8 border border-white/80 dark:border-white/10 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-300/40 dark:border-slate-700/40 pb-4">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Execute BOB Off-Ramp Quote
                </h2>
                <span className="px-3 py-1 rounded-full text-xs font-black neu-inset text-orange-800 dark:text-orange-300">
                  Live Rate: 1 USDC = 6.96 BOB
                </span>
              </div>

              {!isSuccess ? (
                <div className="space-y-5">
                  {/* Amount Input */}
                  <div className="neu-inset p-4 rounded-2xl flex items-center justify-between gap-4">
                    <div>
                      <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400 block mb-1">
                        Amount to Cash Out (USDC)
                      </label>
                      <div className="flex items-center gap-1">
                        <span className="text-xl font-bold text-slate-600 dark:text-slate-400">$</span>
                        <input
                          type="number"
                          min={10}
                          step={10}
                          value={usdcAmount}
                          onChange={(e) => setUsdcAmount(Number(e.target.value))}
                          className="bg-transparent font-mono text-2xl font-black text-slate-950 dark:text-white focus:outline-none w-36"
                        />
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-orange-800 dark:text-orange-300 block mb-1">
                        Bolivianos Payout
                      </span>
                      <p className="text-2xl font-black text-orange-700 dark:text-orange-400 font-mono">
                        {formatCurrency(bobAmount, 'BOB')}
                      </p>
                    </div>
                  </div>

                  {/* Destination Bank */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
                      Select Bolivian Banking Channel:
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: 'UNION', name: 'Banco Unión', desc: 'National Settlement Rail' },
                        { id: 'BMSC', name: 'BMSC (Mercantil)', desc: 'Corporate & Trade' },
                        { id: 'BNB', name: 'Banco Nacional', desc: 'Commercial Accounts' },
                        { id: 'QR', name: 'QR Simple Pagos', desc: 'Interbank Instant QR' },
                      ].map((bank) => (
                        <button
                          key={bank.id}
                          type="button"
                          onClick={() => setSelectedBank(bank.id as 'UNION' | 'BMSC' | 'BNB' | 'QR')}
                          className={`p-3 rounded-2xl text-left transition-all ${
                            selectedBank === bank.id
                              ? 'neu-inset border border-orange-500/60 text-orange-900 dark:text-orange-300 font-black'
                              : 'neu-btn text-slate-700 dark:text-slate-300 font-semibold hover:text-slate-950 dark:hover:text-white'
                          }`}
                        >
                          <div className="text-xs font-bold">{bank.name}</div>
                          <div className="text-[10px] text-slate-600 dark:text-slate-400 font-medium">{bank.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Account Details */}
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                        Account Holder / Razón Social
                      </label>
                      <input
                        type="text"
                        value={accountHolder}
                        onChange={(e) => setAccountHolder(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-2xl neu-input text-xs text-slate-900 dark:text-white font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                        Bolivian Account Number (Cuenta Bancaria)
                      </label>
                      <input
                        type="text"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-2xl neu-input text-xs text-slate-900 dark:text-white font-mono font-bold"
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
                      <span>Off-Ramp {formatCurrency(bobAmount, 'BOB')} to Bank</span>
                    )}
                  </button>
                </div>
              ) : (
                /* Success receipt */
                <div className="space-y-5 animate-in zoom-in-95 text-center py-4">
                  <CheckCircle2 className="w-14 h-14 text-orange-600 dark:text-orange-400 mx-auto animate-bounce" />
                  <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white">
                      BOB Settlement Completed!
                    </h3>
                    <p className="text-xs text-slate-700 dark:text-slate-300 font-medium mt-1">
                      {formatCurrency(bobAmount, 'BOB')} routed through Pollar&apos;s live Bolivian anchor to {accountHolder}.
                    </p>
                  </div>

                  <div className="neu-inset p-4 rounded-2xl space-y-2 text-xs font-mono text-slate-800 dark:text-slate-200 max-w-md mx-auto text-left">
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400 font-semibold">Destination:</span>
                      <span className="font-bold text-slate-900 dark:text-white">{selectedBank}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400 font-semibold">Account:</span>
                      <span className="font-bold text-slate-900 dark:text-white">{accountNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400 font-semibold">Status:</span>
                      <span className="text-emerald-700 dark:text-emerald-400 font-black">Confirmed on Stellar</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsSuccess(false)}
                    className="px-6 py-2.5 rounded-2xl neu-btn text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white"
                  >
                    Run Another Quote
                  </button>
                </div>
              )}
            </div>

            {/* Right Col: African Corridors & Pollar Info */}
            <div className="space-y-6">
              {/* African Rails */}
              <div className="neu-card rounded-3xl p-6 border border-white/80 dark:border-white/10 space-y-4">
                <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 text-xs font-extrabold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> Connected African Ingress
                </div>
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  African Local Rails
                </h3>
                <div className="space-y-2.5 text-xs">
                  <div className="neu-inset p-3 rounded-2xl flex items-center justify-between">
                    <div>
                      <p className="font-black text-slate-900 dark:text-white">Kenya M-Pesa</p>
                      <span className="text-[10px] text-slate-600 dark:text-slate-400 font-medium">STK Push (KES)</span>
                    </div>
                    <span className="font-mono font-black text-emerald-800 dark:text-emerald-400">129.50 KES</span>
                  </div>

                  <div className="neu-inset p-3 rounded-2xl flex items-center justify-between">
                    <div>
                      <p className="font-black text-slate-900 dark:text-white">Nigeria NGN Bank</p>
                      <span className="text-[10px] text-slate-600 dark:text-slate-400 font-medium">Paystack / Virtual Acct</span>
                    </div>
                    <span className="font-mono font-black text-indigo-800 dark:text-indigo-400">1,485 NGN</span>
                  </div>

                  <div className="neu-inset p-3 rounded-2xl flex items-center justify-between">
                    <div>
                      <p className="font-black text-slate-900 dark:text-white">Ghana MoMo</p>
                      <span className="text-[10px] text-slate-600 dark:text-slate-400 font-medium">MTN / Airtel (GHS)</span>
                    </div>
                    <span className="font-mono font-black text-amber-800 dark:text-amber-400">15.20 GHS</span>
                  </div>
                </div>
              </div>

              {/* Telegram Support Card */}
              <div className="neu-card rounded-3xl p-6 border border-indigo-300/80 dark:border-indigo-700/50 space-y-3 bg-indigo-50/60 dark:bg-indigo-950/30">
                <div className="flex items-center gap-2 text-indigo-800 dark:text-indigo-300 text-xs font-extrabold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-indigo-500" /> Flagship Test Team
                </div>
                <h3 className="text-sm font-black text-slate-900 dark:text-white">
                  Live Bolivian Ramp Access
                </h3>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                  The Pollar engineering team is on Telegram to assist with live ramp testing, design reviews, and verifying Bolivian end-to-end transfers.
                </p>
                <a
                  href="https://t.me/+R76f1BarXSUxMTQx"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl neu-btn text-xs font-bold text-indigo-800 dark:text-indigo-300 hover:text-indigo-950 dark:hover:text-white"
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

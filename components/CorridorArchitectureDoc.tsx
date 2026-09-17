'use client';

import React, { useState } from 'react';
import { 
  CheckCircle, 
  Layers
} from 'lucide-react';

export function CorridorArchitectureDoc() {
  const [activeTab, setActiveTab] = useState<'sdk' | 'ramps' | 'yield'>('sdk');

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-6">
      <div className="neu-card rounded-3xl p-6 sm:p-8 border border-white/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-300/40 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl neu-inset flex items-center justify-center text-indigo-600">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Pollar Architectural Integration
              </h2>
              <p className="text-xs text-slate-600">
                How char moves real money non-custodially on Stellar with zero user gas
              </p>
            </div>
          </div>

          <div className="flex items-center neu-inset p-1 rounded-2xl">
            <button
              onClick={() => setActiveTab('sdk')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'sdk' ? 'neu-btn text-indigo-700' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Pollar SDK &amp; Auth
            </button>
            <button
              onClick={() => setActiveTab('ramps')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'ramps' ? 'neu-btn text-orange-700' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Bolivia Live BOB Ramp
            </button>
            <button
              onClick={() => setActiveTab('yield')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'yield' ? 'neu-btn text-emerald-700' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Blend / DeFindex Earn
            </button>
          </div>
        </div>

        {activeTab === 'sdk' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-4 text-xs text-slate-700">
              <h3 className="text-sm font-bold text-slate-900">
                Frictionless Onboarding Without Seed Phrases
              </h3>
              <p>
                In emerging markets, seed phrases cause 80%+ drop-off. <code className="text-indigo-600 font-mono font-semibold">char</code> uses Pollar&apos;s embedded smart account infrastructure:
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Biometric Passkeys &amp; Social Auth:</strong> Users sign via FaceID/TouchID or Google login. Private keys are encrypted non-custodially via AWS KMS.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Gas Sponsorship &amp; Reserves:</strong> Pollar provisions funding &amp; gas wallets on Stellar so users never need to purchase native XLM to pay network fees.</span>
                </div>
              </div>
            </div>

            <div className="neu-inset p-4 rounded-2xl bg-slate-900 text-slate-300 font-mono text-[11px] overflow-x-auto space-y-1">
              <div className="text-slate-500">{"// Initialize Pollar in React App"}</div>
              <div><span className="text-purple-400">import</span> &#123; usePollar &#125; <span className="text-purple-400">from</span> <span className="text-emerald-300">&apos;@pollar/react&apos;</span>;</div>
              <br />
              <div><span className="text-blue-400">const</span> &#123; wallet, runTx, openLoginModal &#125; = <span className="text-yellow-300">usePollar</span>();</div>
              <br />
              <div className="text-slate-500">{"// Gasless USDC settlement"}</div>
              <div><span className="text-blue-400">await</span> <span className="text-yellow-300">runTx</span>(<span className="text-emerald-300">&apos;payment&apos;</span>, &#123;</div>
              <div className="pl-4">destination: <span className="text-emerald-300">&apos;GDRE...ESCROW_VAULT&apos;</span>,</div>
              <div className="pl-4">amount: <span className="text-orange-300">&apos;1250.00&apos;</span>,</div>
              <div className="pl-4">asset: <span className="text-emerald-300">&apos;USDC&apos;</span></div>
              <div>&#125;);</div>
            </div>
          </div>
        )}

        {activeTab === 'ramps' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-4 text-xs text-slate-700">
              <h3 className="text-sm font-bold text-slate-900">
                Pollar&apos;s Live Bolivian Anchor (BOB Payouts)
              </h3>
              <p>
                The flagship challenge connects African mobile money into Pollar&apos;s live Bolivian fiat off-ramp. Pollar provides 15-minute guaranteed FX quotes for Bolivian Bolivianos:
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                  <span><strong>Direct Banking Settlement:</strong> Automatic transfer into Bolivian commercial accounts (Banco Unión, BMSC, BNB).</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                  <span><strong>QR Simple Support:</strong> Instant interbank settlement using Bolivia&apos;s ubiquitous national QR payment standard.</span>
                </div>
              </div>
            </div>

            <div className="neu-inset p-4 rounded-2xl bg-slate-900 text-slate-300 font-mono text-[11px] overflow-x-auto space-y-1">
              <div className="text-slate-500">{"// Fetch live guaranteed BOB quote via Pollar"}</div>
              <div><span className="text-blue-400">const</span> quote = <span className="text-blue-400">await</span> pollar.<span className="text-yellow-300">getRampsQuote</span>(&#123;</div>
              <div className="pl-4">direction: <span className="text-emerald-300">&apos;offramp&apos;</span>,</div>
              <div className="pl-4">cryptoAsset: <span className="text-emerald-300">&apos;USDC&apos;</span>,</div>
              <div className="pl-4">fiatCurrency: <span className="text-emerald-300">&apos;BOB&apos;</span>,</div>
              <div className="pl-4">amount: <span className="text-orange-300">1250</span></div>
              <div>&#125;);</div>
              <br />
              <div className="text-slate-500">{"// Execute offramp to Bolivian bank"}</div>
              <div><span className="text-blue-400">const</span> offramp = <span className="text-blue-400">await</span> pollar.<span className="text-yellow-300">createOffRamp</span>(&#123; quoteId: quote.id &#125;);</div>
            </div>
          </div>
        )}

        {activeTab === 'yield' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-4 text-xs text-slate-700">
              <h3 className="text-sm font-bold text-slate-900">
                Blend Lending &amp; DeFindex Vaults During Transit
              </h3>
              <p>
                In international trade, escrow funds are typically dead capital for 1–3 weeks while goods are shipped across the Atlantic. <code className="text-emerald-600 font-mono font-semibold">char</code> turns transit time into income:
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Live Compound Yield:</strong> Funds in escrow are deposited into Stellar&apos;s Blend lending pool earning ~7.8% APY.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Escrow Fee Offset:</strong> The interest generated during transit automatically discounts the logistics fee or rewards the buyer!</span>
                </div>
              </div>
            </div>

            <div className="neu-inset p-4 rounded-2xl bg-slate-900 text-slate-300 font-mono text-[11px] overflow-x-auto space-y-1">
              <div className="text-slate-500">{"// Deposit locked escrow into Blend vault"}</div>
              <div><span className="text-blue-400">await</span> pollar.<span className="text-yellow-300">earnDeposit</span>(&#123;</div>
              <div className="pl-4">provider: <span className="text-emerald-300">&apos;blend&apos;</span>,</div>
              <div className="pl-4">asset: <span className="text-emerald-300">&apos;USDC&apos;</span>,</div>
              <div className="pl-4">amount: trade.amountUsdc</div>
              <div>&#125;);</div>
              <br />
              <div className="text-slate-500">{"// Instant unbond upon trade release"}</div>
              <div><span className="text-blue-400">await</span> pollar.<span className="text-yellow-300">earnWithdraw</span>(&#123; provider: <span className="text-emerald-300">&apos;blend&apos;</span> &#125;);</div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

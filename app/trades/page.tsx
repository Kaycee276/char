'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { TradeList } from '@/components/TradeList';
import { Footer } from '@/components/Footer';
import { FileText } from 'lucide-react';

export default function TradesPage() {
  return (
    <div className="min-h-screen bg-[#e9edf3] text-slate-800 flex flex-col justify-between selection:bg-emerald-500 selection:text-white">
      <div>
        <Navbar />

        {/* Page Hero Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-4 pb-2">
          <div className="neu-card rounded-3xl p-6 sm:p-8 border border-white/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-emerald-700 text-xs font-extrabold uppercase tracking-wider mb-1">
                <FileText className="w-4 h-4" /> Trade Settlement &amp; Yield Hub
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
                Active Corridor Contracts
              </h1>
              <p className="text-xs text-slate-500 mt-1 max-w-2xl">
                Track real-time shipment escrows between African buyers and Bolivian exporters. In-transit capital automatically compounds in Blend lending pools on Stellar.
              </p>
            </div>

            <div className="flex items-center gap-4 neu-inset p-3 rounded-2xl text-xs">
              <div className="text-center px-3">
                <span className="text-slate-500 block text-[10px] font-bold uppercase">Active APY</span>
                <span className="text-emerald-600 font-black text-lg font-mono">+7.8%</span>
              </div>
              <div className="border-l border-slate-300/60 h-8" />
              <div className="text-center px-3">
                <span className="text-slate-500 block text-[10px] font-bold uppercase">Stellar Asset</span>
                <span className="text-slate-800 font-black text-lg font-mono">USDC</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trade List Component */}
        <TradeList />
      </div>

      <Footer />
    </div>
  );
}

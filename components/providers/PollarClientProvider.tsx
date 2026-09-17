'use client';

import React, { useEffect, useState } from 'react';
import { PollarProvider } from '@pollar/react';

const DEFAULT_KEY = process.env.NEXT_PUBLIC_POLLAR_PUBLISHABLE_KEY || 'pub_testnet_char_corridor_2026';

export function PollarClientProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#e9edf3] flex flex-col items-center justify-center text-slate-600 gap-4">
        <div className="w-16 h-16 rounded-2xl neu-card flex items-center justify-center text-emerald-600 font-bold text-2xl animate-pulse">
          ⚡
        </div>
        <p className="font-medium text-slate-500 text-sm tracking-wide">Loading char corridor...</p>
      </div>
    );
  }

  return (
    <PollarProvider client={{ apiKey: DEFAULT_KEY }}>
      {children}
    </PollarProvider>
  );
}

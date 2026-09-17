'use client';

import React, { useEffect, useState, createContext, useContext } from 'react';
import { PollarProvider } from '@pollar/react';

interface PollarConfigContextType {
  apiKey: string;
  setApiKey: (key: string) => void;
  isCustomKey: boolean;
  resetToDefaultKey: () => void;
}

const PollarConfigContext = createContext<PollarConfigContextType>({
  apiKey: '',
  setApiKey: () => {},
  isCustomKey: false,
  resetToDefaultKey: () => {},
});

export const usePollarConfig = () => useContext(PollarConfigContext);

const DEFAULT_KEY = process.env.NEXT_PUBLIC_POLLAR_PUBLISHABLE_KEY || 'pub_testnet_char_corridor_2026';

export function PollarClientProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [apiKey, setApiKeyState] = useState<string>(DEFAULT_KEY);

  useEffect(() => {
    const saved = localStorage.getItem('char_pollar_api_key');
    if (saved && saved.trim().length > 0) {
      setApiKeyState(saved);
    }
    setMounted(true);
  }, []);

  const setApiKey = (newKey: string) => {
    const trimmed = newKey.trim();
    setApiKeyState(trimmed);
    localStorage.setItem('char_pollar_api_key', trimmed);
  };

  const resetToDefaultKey = () => {
    setApiKeyState(DEFAULT_KEY);
    localStorage.removeItem('char_pollar_api_key');
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#e9edf3] flex flex-col items-center justify-center text-slate-600 gap-4">
        <div className="w-16 h-16 rounded-2xl bg-[#e9edf3] shadow-neu flex items-center justify-center text-emerald-600 font-bold text-2xl animate-pulse">
          ⚡
        </div>
        <p className="font-medium text-slate-500 text-sm tracking-wide">Initializing char corridor...</p>
      </div>
    );
  }

  return (
    <PollarConfigContext.Provider
      value={{
        apiKey,
        setApiKey,
        isCustomKey: apiKey !== DEFAULT_KEY,
        resetToDefaultKey,
      }}
    >
      <PollarProvider client={{ apiKey }}>
        {children}
      </PollarProvider>
    </PollarConfigContext.Provider>
  );
}

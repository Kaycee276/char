'use client';

import React, { useEffect, useState, createContext, useContext } from 'react';
import { PollarProvider } from '@pollar/react';

const DEFAULT_KEY = process.env.NEXT_PUBLIC_POLLAR_PUBLISHABLE_KEY || 'pub_testnet_char_corridor_2026';

// Complete app config matching Pollar's schema so modal renders without any network delay or crash
const DEFAULT_APP_CONFIG = {
  application: {
    id: 'char-app',
    name: 'char Corridor',
    network: 'testnet' as const,
    chains: [],
  },
  styles: {
    theme: 'light' as const,
    accentColor: '#10b981',
    emailEnabled: true,
    embeddedWallets: true,
    smartWallet: true,
    providers: {
      google: true,
      github: true,
      email: true,
    },
    modalTitle: 'Sign in to char Corridor',
  },
};

interface DemoAuthContextType {
  demoUser: { address: string; role: 'importer' | 'exporter' } | null;
  loginAsDemo: (role: 'importer' | 'exporter') => void;
  logoutDemo: () => void;
}

const DemoAuthContext = createContext<DemoAuthContextType>({
  demoUser: null,
  loginAsDemo: () => {},
  logoutDemo: () => {},
});

export const useDemoAuth = () => useContext(DemoAuthContext);

export function PollarClientProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [demoUser, setDemoUser] = useState<{ address: string; role: 'importer' | 'exporter' } | null>(null);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('char_demo_auth');
    if (saved) {
      try {
        setDemoUser(JSON.parse(saved));
      } catch {
        // ignore
      }
    }
  }, []);

  const loginAsDemo = (role: 'importer' | 'exporter') => {
    const user = {
      role,
      address: role === 'importer' 
        ? 'GBRE7X2...NAIROBI_BUYER' 
        : 'GBCF9A1...BOLIVIA_EXPORTER',
    };
    setDemoUser(user);
    localStorage.setItem('char_demo_auth', JSON.stringify(user));
  };

  const logoutDemo = () => {
    setDemoUser(null);
    localStorage.removeItem('char_demo_auth');
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center text-[var(--foreground)] gap-4">
        <div className="w-14 h-14 rounded-2xl neu-card flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-black text-xl tracking-tight shadow-neu-sm animate-pulse">
          C
        </div>
        <p className="font-bold text-slate-700 dark:text-slate-300 text-sm tracking-wide">Loading char corridor...</p>
      </div>
    );
  }

  return (
    <DemoAuthContext.Provider value={{ demoUser, loginAsDemo, logoutDemo }}>
      <PollarProvider 
        client={{ apiKey: DEFAULT_KEY }}
        appConfig={DEFAULT_APP_CONFIG}
      >
        {children}
      </PollarProvider>
    </DemoAuthContext.Provider>
  );
}

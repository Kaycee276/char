'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { LandingPage } from '@/components/LandingPage';
import { DashboardView } from '@/components/DashboardView';
import { usePollar } from '@pollar/react';
import { useDemoAuth } from '@/components/providers/PollarClientProvider';

export default function Home() {
  const pollar = usePollar();
  const { demoUser } = useDemoAuth();

  const isPollarAuth = pollar?.isAuthenticated ?? false;
  const isAuthenticated = isPollarAuth || !!demoUser;

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col justify-between selection:bg-emerald-500 selection:text-white transition-colors duration-200">
      <div>
        <Navbar />
        {isAuthenticated ? <DashboardView /> : <LandingPage />}
      </div>
      <Footer />
    </main>
  );
}

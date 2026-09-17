import { Navbar } from '@/components/Navbar';
import { CorridorStats } from '@/components/CorridorStats';
import { CorridorVisualizer } from '@/components/CorridorVisualizer';
import { TradeList } from '@/components/TradeList';
import { CorridorArchitectureDoc } from '@/components/CorridorArchitectureDoc';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col justify-between selection:bg-emerald-500 selection:text-white transition-colors duration-200">
      <div>
        <Navbar />
        <CorridorStats />
        <CorridorVisualizer />
        <TradeList />
        <CorridorArchitectureDoc />
      </div>
      <Footer />
    </main>
  );
}

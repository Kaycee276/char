import { Navbar } from '@/components/Navbar';
import { CorridorStats } from '@/components/CorridorStats';
import { CorridorVisualizer } from '@/components/CorridorVisualizer';
import { TradeList } from '@/components/TradeList';
import { CorridorArchitectureDoc } from '@/components/CorridorArchitectureDoc';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#e9edf3] text-slate-800 flex flex-col justify-between selection:bg-emerald-500 selection:text-white">
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

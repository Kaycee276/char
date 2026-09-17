export type TradeStatus = 
  | 'CREATED' 
  | 'ESCROW_LOCKED' 
  | 'IN_TRANSIT' 
  | 'RELEASED' 
  | 'OFFRAMPED_BOB';

export type AfricanRail = 'MPESA' | 'PAYSTACK_NGN' | 'MOMO_GHANA';

export interface TradeItem {
  id: string;
  title: string;
  description: string;
  category: 'Commodity' | 'Agriculture' | 'Services' | 'Manufacturing';
  amountUsdc: number;
  sellerName: string;
  sellerCity: string;
  sellerCountry: 'Bolivia';
  sellerAddress?: string;
  buyerName: string;
  buyerCity: string;
  buyerCountry: 'Kenya' | 'Nigeria' | 'Ghana';
  buyerRail: AfricanRail;
  status: TradeStatus;
  createdAt: string;
  fundedAt?: string;
  releasedAt?: string;
  offrampedAt?: string;
  yieldEarnedUsdc: number;
  yieldApyPercent: number;
  stellarTxHash?: string;
  boliviaBankDestination?: {
    bankName: string;
    accountHolder: string;
    accountNumber: string;
    bobAmount: number;
  };
}

export const INITIAL_TRADES: TradeItem[] = [
  {
    id: 'char-trade-101',
    title: 'Specialty Yungas Geisha Coffee (50 Bags)',
    description: 'High-altitude organic micro-lot coffee beans from Caranavi, Yungas, Bolivia exported to Nairobi Roasters Guild.',
    category: 'Agriculture',
    amountUsdc: 1250,
    sellerName: 'Café Andino Cooperativa',
    sellerCity: 'La Paz',
    sellerCountry: 'Bolivia',
    buyerName: 'Rift Valley Roasters Ltd',
    buyerCity: 'Nairobi',
    buyerCountry: 'Kenya',
    buyerRail: 'MPESA',
    status: 'ESCROW_LOCKED',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    fundedAt: new Date(Date.now() - 3600000 * 36).toISOString(),
    yieldEarnedUsdc: 9.62,
    yieldApyPercent: 7.8,
    stellarTxHash: 'd3f78a9c...stellar-testnet-tx',
    boliviaBankDestination: {
      bankName: 'Banco Unión',
      accountHolder: 'Café Andino Coop',
      accountNumber: '10000048291039',
      bobAmount: 8700,
    },
  },
  {
    id: 'char-trade-102',
    title: 'Full-Stack Fintech Engineering Retainer (Q3)',
    description: 'Distributed engineering team in Lagos providing mobile money API integrations for a Santa Cruz neobank.',
    category: 'Services',
    amountUsdc: 3500,
    sellerName: 'Andes Fintech Labs',
    sellerCity: 'Santa Cruz',
    sellerCountry: 'Bolivia',
    buyerName: 'Kura Tech Hub',
    buyerCity: 'Lagos',
    buyerCountry: 'Nigeria',
    buyerRail: 'PAYSTACK_NGN',
    status: 'RELEASED',
    createdAt: new Date(Date.now() - 3600000 * 96).toISOString(),
    fundedAt: new Date(Date.now() - 3600000 * 72).toISOString(),
    releasedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    yieldEarnedUsdc: 22.45,
    yieldApyPercent: 7.8,
    stellarTxHash: '7b819e4a...stellar-testnet-tx',
    boliviaBankDestination: {
      bankName: 'Banco Mercantil Santa Cruz (BMSC)',
      accountHolder: 'Andes Fintech Labs SRL',
      accountNumber: '4010889218',
      bobAmount: 24360,
    },
  },
  {
    id: 'char-trade-103',
    title: 'Organic Royal Bolivian Quinoa (2 Metric Tons)',
    description: 'Certified fair-trade white and red royal quinoa from the Salar de Uyuni plateau shipped to West Africa food distributor.',
    category: 'Commodity',
    amountUsdc: 2800,
    sellerName: 'Altiplano Agro Export S.A.',
    sellerCity: 'Oruro',
    sellerCountry: 'Bolivia',
    buyerName: 'AfriGrains Distribution',
    buyerCity: 'Accra',
    buyerCountry: 'Ghana',
    buyerRail: 'MOMO_GHANA',
    status: 'CREATED',
    createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
    yieldEarnedUsdc: 0,
    yieldApyPercent: 7.8,
    boliviaBankDestination: {
      bankName: 'Banco Nacional de Bolivia (BNB)',
      accountHolder: 'Altiplano Agro Export',
      accountNumber: '25000192841',
      bobAmount: 19488,
    },
  },
];

const STORAGE_KEY = 'char_trades_v1';

export function getStoredTrades(): TradeItem[] {
  if (typeof window === 'undefined') return INITIAL_TRADES;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TRADES));
      return INITIAL_TRADES;
    }
    return JSON.parse(data);
  } catch (e) {
    console.error('Failed to parse trades from localStorage:', e);
    return INITIAL_TRADES;
  }
}

export function saveTrades(trades: TradeItem[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trades));
  } catch (e) {
    console.error('Failed to save trades to localStorage:', e);
  }
}

export function addTrade(trade: Omit<TradeItem, 'id' | 'createdAt' | 'yieldEarnedUsdc' | 'yieldApyPercent'>): TradeItem {
  const trades = getStoredTrades();
  const newTrade: TradeItem = {
    ...trade,
    id: `char-trade-${Date.now().toString().slice(-4)}`,
    createdAt: new Date().toISOString(),
    yieldEarnedUsdc: 0,
    yieldApyPercent: 7.8,
  };
  const updated = [newTrade, ...trades];
  saveTrades(updated);
  return newTrade;
}

export function updateTradeStatus(id: string, status: TradeStatus, extraData?: Partial<TradeItem>): TradeItem[] {
  const trades = getStoredTrades();
  const updated = trades.map((t) => {
    if (t.id !== id) return t;
    const now = new Date().toISOString();
    return {
      ...t,
      ...extraData,
      status,
      fundedAt: status === 'ESCROW_LOCKED' && !t.fundedAt ? now : t.fundedAt,
      releasedAt: status === 'RELEASED' && !t.releasedAt ? now : t.releasedAt,
      offrampedAt: status === 'OFFRAMPED_BOB' ? now : t.offrampedAt,
    };
  });
  saveTrades(updated);
  return updated;
}

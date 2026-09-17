export interface CurrencyRate {
  code: string;
  name: string;
  symbol: string;
  flag: string;
  ratePerUsdc: number;
}

export const RATES: Record<string, CurrencyRate> = {
  USDC: {
    code: 'USDC',
    name: 'USD Coin (Stellar)',
    symbol: '$',
    flag: '🪙',
    ratePerUsdc: 1.0,
  },
  BOB: {
    code: 'BOB',
    name: 'Bolivian Boliviano',
    symbol: 'Bs',
    flag: '🇧🇴',
    ratePerUsdc: 6.96,
  },
  KES: {
    code: 'KES',
    name: 'Kenyan Shilling (M-Pesa)',
    symbol: 'KSh',
    flag: '🇰🇪',
    ratePerUsdc: 129.50,
  },
  NGN: {
    code: 'NGN',
    name: 'Nigerian Naira (Bank/Paystack)',
    symbol: '₦',
    flag: '🇳🇬',
    ratePerUsdc: 1485.00,
  },
  GHS: {
    code: 'GHS',
    name: 'Ghanaian Cedi (MoMo)',
    symbol: 'GH₵',
    flag: '🇬🇭',
    ratePerUsdc: 15.20,
  },
};

export function convertFromUsdc(usdcAmount: number, targetCurrency: string): number {
  const rate = RATES[targetCurrency]?.ratePerUsdc ?? 1;
  return usdcAmount * rate;
}

export function convertToUsdc(amount: number, sourceCurrency: string): number {
  const rate = RATES[sourceCurrency]?.ratePerUsdc ?? 1;
  return amount / rate;
}

export function formatCurrency(amount: number, currencyCode: string): string {
  const currency = RATES[currencyCode];
  if (!currency) return `${amount.toFixed(2)} ${currencyCode}`;

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode === 'USDC' ? 'USD' : currencyCode,
    maximumFractionDigits: 2,
  }).format(amount).replace('USD', 'USDC');
}

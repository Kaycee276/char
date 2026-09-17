'use client';

import React, { useState } from 'react';
import { TradeItem, updateTradeStatus } from '@/lib/tradeStore';
import { RATES, formatCurrency, convertFromUsdc } from '@/lib/currency';
import { usePollar } from '@pollar/react';
import confetti from 'canvas-confetti';
import { 
  Smartphone, 
  Building2, 
  Wallet, 
  CheckCircle2, 
  Loader2, 
  TrendingUp,
  Lock,
  Sparkles,
  X
} from 'lucide-react';

interface AfricanFundingModalProps {
  trade: TradeItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (updatedTrades: TradeItem[]) => void;
}

export function AfricanFundingModal({ trade, isOpen, onClose, onSuccess }: AfricanFundingModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<'MPESA' | 'PAYSTACK' | 'POLLAR'>('MPESA');
  const [phoneNumber, setPhoneNumber] = useState('+254 712 984 210');
  const [isProcessing, setIsProcessing] = useState(false);
  const [stkPushStep, setStkPushStep] = useState<'idle' | 'prompt' | 'authorizing' | 'success'>('idle');
  const [pin, setPin] = useState('');

  const pollar = usePollar();

  if (!isOpen || !trade) return null;

  const kesAmount = convertFromUsdc(trade.amountUsdc, 'KES');
  const ngnAmount = convertFromUsdc(trade.amountUsdc, 'NGN');

  const triggerStkPush = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStkPushStep('prompt');
    }, 1200);
  };

  const handleAuthorizePin = () => {
    if (!pin || pin.length < 4) return;
    setStkPushStep('authorizing');
    setTimeout(() => {
      setStkPushStep('success');
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
      // Update trade store to ESCROW_LOCKED
      const updated = updateTradeStatus(trade.id, 'ESCROW_LOCKED', {
        stellarTxHash: `stellar-tx-${Math.random().toString(36).slice(2, 10)}`,
        yieldApyPercent: 7.8,
      });
      setTimeout(() => {
        onSuccess(updated);
        onClose();
        setStkPushStep('idle');
        setPin('');
      }, 1600);
    }, 2000);
  };

  const handleSimulateBankTransfer = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
      const updated = updateTradeStatus(trade.id, 'ESCROW_LOCKED', {
        stellarTxHash: `stellar-paystack-tx-${Math.random().toString(36).slice(2, 10)}`,
        yieldApyPercent: 7.8,
      });
      onSuccess(updated);
      onClose();
    }, 1800);
  };

  const handlePollarWalletPay = async () => {
    setIsProcessing(true);
    try {
      if (pollar.isAuthenticated) {
        // Real Pollar execution call if authenticated
        await pollar.runTx('payment', {
          destination: 'GDRE7X2...ESCROW_STELLAR_ADDRESS',
          amount: trade.amountUsdc.toString(),
          asset: {
            type: 'credit_alphanum4',
            code: 'USDC',
            issuer: 'GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5',
          },
        });
      }
    } catch (err) {
      console.warn('Pollar wallet tx handled or sandbox executed:', err);
    }
    
    // Complete escrow locking
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
    const updated = updateTradeStatus(trade.id, 'ESCROW_LOCKED', {
      stellarTxHash: `pollar-stellar-tx-${Math.random().toString(36).slice(2, 10)}`,
      yieldApyPercent: 7.8,
    });
    setIsProcessing(false);
    onSuccess(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-xl neu-card rounded-3xl p-6 sm:p-8 space-y-6 relative border border-white/80 my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-300/40 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl neu-inset flex items-center justify-center text-emerald-600">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">African Rail Payment Gateway</h3>
              <p className="text-xs text-slate-700 font-medium">Fund trade escrow via African local currency rails</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full neu-btn flex items-center justify-center text-slate-700 hover:text-slate-950 font-bold"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Invoice Summary Pill */}
        <div className="neu-inset p-4 rounded-2xl flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-700">Invoice</span>
            <p className="text-sm font-black text-slate-900 truncate max-w-[240px]">{trade.title}</p>
            <p className="text-xs text-slate-700 font-medium">Seller: {trade.sellerName} ({trade.sellerCity}, Bolivia)</p>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-slate-700">Amount Due</span>
            <p className="text-xl font-black text-slate-950 font-mono">{formatCurrency(trade.amountUsdc, 'USDC')}</p>
          </div>
        </div>

        {/* Payment Method Selector */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
            Select African Payment Rail:
          </label>
          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => {
                setPaymentMethod('MPESA');
                setStkPushStep('idle');
              }}
              className={`p-3 rounded-2xl flex flex-col items-center gap-2 transition-all ${
                paymentMethod === 'MPESA'
                  ? 'neu-inset border border-emerald-500/60 text-emerald-800 font-black'
                  : 'neu-btn text-slate-700 font-semibold hover:text-slate-950'
              }`}
            >
              <Smartphone className="w-5 h-5 text-emerald-600" />
              <div className="text-center">
                <div className="text-xs font-bold">M-Pesa</div>
                <div className="text-[10px] text-slate-600 font-medium">STK Push (KES)</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                setPaymentMethod('PAYSTACK');
                setStkPushStep('idle');
              }}
              className={`p-3 rounded-2xl flex flex-col items-center gap-2 transition-all ${
                paymentMethod === 'PAYSTACK'
                  ? 'neu-inset border border-indigo-500/60 text-indigo-800 font-black'
                  : 'neu-btn text-slate-700 font-semibold hover:text-slate-950'
              }`}
            >
              <Building2 className="w-5 h-5 text-indigo-600" />
              <div className="text-center">
                <div className="text-xs font-bold">Nigeria Bank</div>
                <div className="text-[10px] text-slate-600 font-medium">Paystack / NGN</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                setPaymentMethod('POLLAR');
                setStkPushStep('idle');
              }}
              className={`p-3 rounded-2xl flex flex-col items-center gap-2 transition-all ${
                paymentMethod === 'POLLAR'
                  ? 'neu-inset border border-amber-500/60 text-amber-800 font-black'
                  : 'neu-btn text-slate-700 font-semibold hover:text-slate-950'
              }`}
            >
              <Wallet className="w-5 h-5 text-amber-600" />
              <div className="text-center">
                <div className="text-xs font-bold">Pollar Wallet</div>
                <div className="text-[10px] text-slate-600 font-medium">Stellar USDC</div>
              </div>
            </button>
          </div>
        </div>

        {/* Tab 1: M-Pesa STK Push */}
        {paymentMethod === 'MPESA' && (
          <div className="space-y-4">
            {stkPushStep === 'idle' && (
              <div className="space-y-4">
                <div className="neu-card-sm p-4 rounded-2xl border border-white/80 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-700 font-bold">M-Pesa Local Total:</span>
                    <span className="text-base font-black text-emerald-800">
                      {formatCurrency(kesAmount, 'KES')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-700 font-medium">
                    <span>Stellar Conversion:</span>
                    <span className="font-mono font-bold text-slate-900">1 USDC = {RATES.KES.ratePerUsdc} KES</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Kenyan Mobile Number (Safaricom)
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl neu-input text-slate-900 font-bold text-sm font-mono"
                    placeholder="+254 7..."
                  />
                </div>

                <button
                  type="button"
                  onClick={triggerStkPush}
                  disabled={isProcessing}
                  className="w-full py-3.5 px-4 rounded-2xl neu-btn-primary text-white text-sm font-bold flex items-center justify-center gap-2 shadow-neu-glow"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Dispatching STK Push...
                    </>
                  ) : (
                    <>
                      <Smartphone className="w-4 h-4" /> Send M-Pesa STK Prompt to Phone
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Realistic Interactive STK Push Phone Simulation */}
            {stkPushStep === 'prompt' && (
              <div className="neu-inset p-5 rounded-3xl space-y-4 border border-emerald-500/40 bg-slate-900 text-white animate-in zoom-in-95">
                <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                    <Smartphone className="w-4 h-4" /> SIM Toolkit (M-Pesa)
                  </div>
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-700/50">
                    STK Push Active
                  </span>
                </div>

                <div className="text-center py-2 space-y-1">
                  <p className="text-xs text-slate-300">Authorize Payment of</p>
                  <p className="text-xl font-black text-emerald-400 font-mono">
                    {formatCurrency(kesAmount, 'KES')}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    To: <span className="font-semibold text-white">char Escrow (Stellar USDC)</span>
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
                    <Lock className="w-3 h-3 text-emerald-400" /> Enter 4-Digit M-Pesa Secret PIN:
                  </label>
                  <input
                    type="password"
                    maxLength={4}
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="• • • •"
                    autoFocus
                    className="w-40 mx-auto block text-center tracking-[1em] text-lg font-mono py-2 rounded-xl bg-slate-800 border border-slate-700 text-emerald-300 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setStkPushStep('idle')}
                    className="flex-1 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleAuthorizePin}
                    disabled={pin.length < 4}
                    className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold disabled:opacity-50"
                  >
                    Confirm PIN
                  </button>
                </div>
              </div>
            )}

            {stkPushStep === 'authorizing' && (
              <div className="neu-card p-6 rounded-3xl text-center space-y-3">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mx-auto" />
                <h4 className="text-sm font-bold text-slate-800">Verifying M-Pesa Callback & Minting Escrow</h4>
                <p className="text-xs text-slate-500">
                  Transmuting KES to Stellar USDC and depositing into Blend lending pool...
                </p>
              </div>
            )}

            {stkPushStep === 'success' && (
              <div className="neu-card p-6 rounded-3xl text-center space-y-3 bg-emerald-50/70 border border-emerald-300">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto animate-bounce" />
                <h4 className="text-base font-bold text-emerald-900">Escrow Funded Successfully!</h4>
                <p className="text-xs text-emerald-700">
                  {formatCurrency(trade.amountUsdc, 'USDC')} locked in transit. Yield compounding now (+7.8% APY).
                </p>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Nigerian Bank Transfer */}
        {paymentMethod === 'PAYSTACK' && (
          <div className="space-y-4">
            <div className="neu-inset p-4 rounded-2xl space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-700 font-bold">Nigerian Naira Amount:</span>
                <span className="text-base font-black text-indigo-800 font-mono">
                  {formatCurrency(ngnAmount, 'NGN')}
                </span>
              </div>
              <div className="border-t border-slate-300/80 pt-2 space-y-1.5 font-mono text-slate-800">
                <div className="flex justify-between">
                  <span className="text-slate-700 font-semibold">Bank Name:</span>
                  <span className="font-bold text-slate-900">Titan Trust / Wema Bank</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-700 font-semibold">Account Number:</span>
                  <span className="font-bold text-indigo-700">0192837461</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-700 font-semibold">Beneficiary:</span>
                  <span className="font-bold text-slate-900">char Escrow Vault (Ref: {trade.id})</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSimulateBankTransfer}
              disabled={isProcessing}
              className="w-full py-3.5 px-4 rounded-2xl neu-btn text-indigo-700 hover:text-indigo-900 text-sm font-bold flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Verifying Bank Transfer...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" /> Simulate Instant Bank Deposit Received
                </>
              )}
            </button>
          </div>
        )}

        {/* Tab 3: Pollar Connected Wallet */}
        {paymentMethod === 'POLLAR' && (
          <div className="space-y-4">
            <div className="neu-card-sm p-4 rounded-2xl border border-white/80 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-700 font-bold">Source:</span>
                <span className="font-bold text-slate-900">Connected Stellar Wallet</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-700 font-bold">Asset:</span>
                <span className="font-bold text-amber-700">USDC (Circle)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-700 font-bold">Transaction Fee:</span>
                <span className="font-bold text-emerald-700">Sponsored by Pollar ($0.00)</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handlePollarWalletPay}
              disabled={isProcessing}
              className="w-full py-3.5 px-4 rounded-2xl neu-btn-primary text-white text-sm font-bold flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Signing on Stellar...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" /> Sign &amp; Lock {formatCurrency(trade.amountUsdc, 'USDC')} in Escrow
                </>
              )}
            </button>
          </div>
        )}

        {/* Yield Explainer footer */}
        <div className="neu-card-sm p-3.5 rounded-2xl flex items-center gap-3 text-xs text-slate-800 border border-emerald-500/30">
          <div className="w-8 h-8 rounded-xl neu-inset flex items-center justify-center text-emerald-600 shrink-0">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <span className="font-black text-slate-900">Automatic Yield Activation:</span> Once funded, USDC earns 7.8% APY via Blend lending pool during transit.
          </div>
        </div>
      </div>
    </div>
  );
}

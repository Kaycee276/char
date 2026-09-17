'use client';

import React, { useState } from 'react';
import { usePollarConfig } from './providers/PollarClientProvider';
import { Key, ExternalLink, RefreshCw, CheckCircle2, ShieldAlert } from 'lucide-react';

interface ApiKeySettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ApiKeySettingsModal({ isOpen, onClose }: ApiKeySettingsModalProps) {
  const { apiKey, setApiKey, isCustomKey, resetToDefaultKey } = usePollarConfig();
  const [inputKey, setInputKey] = useState(apiKey);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputKey.trim()) {
      setApiKey(inputKey.trim());
      setSavedSuccess(true);
      setTimeout(() => {
        setSavedSuccess(false);
        onClose();
      }, 1000);
    }
  };

  const handleReset = () => {
    resetToDefaultKey();
    setInputKey('');
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg neu-card rounded-3xl p-6 sm:p-8 space-y-6 relative border border-white/80 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl neu-inset flex items-center justify-center text-indigo-600">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">Pollar SDK Configuration</h3>
              <p className="text-xs text-slate-500">Stellar Testnet credentials for char</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full neu-btn flex items-center justify-center text-slate-500 hover:text-slate-800 font-bold"
          >
            ✕
          </button>
        </div>

        <div className="neu-inset p-4 rounded-2xl space-y-2 text-xs text-slate-600">
          <div className="flex items-center gap-2 font-semibold text-slate-700">
            <ShieldAlert className="w-4 h-4 text-emerald-600" />
            <span>Hackathon Quick-Start:</span>
          </div>
          <p>
            You can get your own live testnet publishable key for free in 60 seconds from the Pollar dashboard. The app works out-of-the-box with default sandbox keys as well.
          </p>
          <a
            href="https://dashboard.pollar.xyz"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-700 font-semibold underline mt-1"
          >
            Open Pollar Dashboard <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Publishable API Key (pub_testnet_...)
            </label>
            <input
              type="text"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              placeholder="pub_testnet_..."
              className="w-full px-4 py-3 rounded-2xl neu-input text-slate-800 font-mono text-xs focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Current: {isCustomKey ? 'Custom Key active' : 'Sandbox Demo Key'}</span>
            {isCustomKey && (
              <button
                type="button"
                onClick={handleReset}
                className="text-amber-600 hover:underline flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" /> Reset to Demo Key
              </button>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-2xl neu-btn text-slate-600 text-sm font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 rounded-2xl neu-btn-primary text-white text-sm font-semibold flex items-center justify-center gap-2"
            >
              {savedSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4" /> Saved!
                </>
              ) : (
                'Save Key'
              )}
            </button>
          </div>
        </form>

        <div className="border-t border-slate-300/60 pt-4 flex items-center justify-between text-xs text-slate-500">
          <span>Need help testing the Bolivian ramp?</span>
          <a
            href="https://t.me/+R76f1BarXSUxMTQx"
            target="_blank"
            rel="noreferrer"
            className="text-indigo-600 hover:underline inline-flex items-center gap-1 font-medium"
          >
            Pollar Telegram <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

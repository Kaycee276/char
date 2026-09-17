'use client';

import { Flame } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 border-t border-slate-300/40 dark:border-slate-800/80 text-xs text-slate-600 dark:text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-lg neu-inset flex items-center justify-center text-amber-600">
          <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
        </div>
        <span className="font-bold text-slate-900 dark:text-slate-100">char</span>
        <span>• Africa ⇄ Bolivia Direct Settlement &amp; Yield Corridor</span>
      </div>

      <div className="flex items-center gap-4">
        <a
          href="https://docs.pollar.xyz"
          target="_blank"
          rel="noreferrer"
          className="text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white font-semibold transition-colors"
        >
          Pollar Docs
        </a>
        <a
          href="https://dashboard.pollar.xyz"
          target="_blank"
          rel="noreferrer"
          className="text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white font-semibold transition-colors"
        >
          Pollar Dashboard
        </a>
        <a
          href="https://t.me/+R76f1BarXSUxMTQx"
          target="_blank"
          rel="noreferrer"
          className="text-indigo-700 dark:text-indigo-400 hover:text-indigo-950 dark:hover:text-indigo-200 font-bold transition-colors"
        >
          Telegram Support
        </a>
      </div>
    </footer>
  );
}

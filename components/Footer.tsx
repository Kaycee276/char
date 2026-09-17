'use client';

import React from 'react';
import { Flame, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 border-t border-slate-300/40 text-xs text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-lg neu-inset flex items-center justify-center text-amber-600">
          <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
        </div>
        <span className="font-bold text-slate-900">char</span>
        <span>• Africa ⇄ Bolivia Direct Settlement &amp; Yield Corridor</span>
      </div>

      <div className="flex items-center gap-4">
        <a
          href="https://docs.pollar.xyz"
          target="_blank"
          rel="noreferrer"
          className="text-slate-700 hover:text-slate-950 flex items-center gap-1 font-semibold transition-colors"
        >
          Pollar Docs <ExternalLink className="w-3 h-3" />
        </a>
        <a
          href="https://dashboard.pollar.xyz"
          target="_blank"
          rel="noreferrer"
          className="text-slate-700 hover:text-slate-950 flex items-center gap-1 font-semibold transition-colors"
        >
          Pollar Dashboard <ExternalLink className="w-3 h-3" />
        </a>
        <a
          href="https://t.me/+R76f1BarXSUxMTQx"
          target="_blank"
          rel="noreferrer"
          className="text-indigo-700 hover:text-indigo-950 flex items-center gap-1 font-bold transition-colors"
        >
          Telegram Support <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </footer>
  );
}

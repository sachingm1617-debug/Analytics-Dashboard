import React from 'react';
import { SearchX, RefreshCw } from 'lucide-react';

export default function ZeroStateFallback({ onReset }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-12 text-center max-w-lg mx-auto my-12 animate-fadeIn">
      <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4 border border-slate-200">
        <SearchX className="w-7 h-7" />
      </div>
      <h3 className="text-base font-bold text-slate-900 mb-1">
        No Matching Records Found
      </h3>
      <p className="text-xs text-slate-500 mb-6 leading-relaxed">
        There are no leads, quotations, or deals matching the selected date window, sales representative, or department filter. Try expanding your search criteria or resetting filters.
      </p>
      <button
        onClick={onReset}
        className="inline-flex items-center px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 rounded-xl shadow-sm transition-all"
      >
        <RefreshCw className="w-3.5 h-3.5 mr-2" />
        Reset to All October 2026 Records
      </button>
    </div>
  );
}

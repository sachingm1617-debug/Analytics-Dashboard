import React from 'react';
import { 
  Calendar, 
  Users, 
  Building2, 
  Download, 
  RefreshCw, 
  Filter, 
  CheckCircle2, 
  Layers,
  ChevronDown
} from 'lucide-react';
import { TEAM_MEMBERS, DEPARTMENTS } from '../data/mockData';

export default function Header({
  dateFilter,
  setDateFilter,
  customStartDate,
  setCustomStartDate,
  customEndDate,
  setCustomEndDate,
  selectedRep,
  setSelectedRep,
  selectedDept,
  setSelectedDept,
  onExport,
  isFiltered,
  onResetFilters,
  totalRecordsCount
}) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          
          {/* Brand & Context */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 ring-1 ring-white/20">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-xl font-bold tracking-tight text-slate-900">
                    Vanguard<span className="text-blue-600">Pulse</span>
                  </h1>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-soft-pulse"></span>
                    Live Q4 2026
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  Business Performance & Revenue Analytics Engine • <span className="text-slate-700">{totalRecordsCount} Records Analyzed</span>
                </p>
              </div>
            </div>

            {/* Mobile Export action */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={onExport}
                className="inline-flex items-center justify-center px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Reactive Global Filter Controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            
            {/* Global Date Preset Selector */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80">
              {['Today', 'Last 7 Days', 'Last 30 Days', 'Custom Range'].map((preset) => {
                const isActive = dateFilter === preset;
                return (
                  <button
                    key={preset}
                    onClick={() => setDateFilter(preset)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                      isActive
                        ? 'bg-white text-blue-700 font-semibold shadow-sm border border-slate-200/60'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                    }`}
                  >
                    {preset}
                  </button>
                );
              })}
            </div>

            {/* Custom Date Pickers (Shown if Custom Range is selected) */}
            {dateFilter === 'Custom Range' && (
              <div className="flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-xl border border-slate-200 shadow-sm animate-fadeIn">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <input
                  type="date"
                  value={customStartDate}
                  onChange={(e) => setCustomStartDate(e.target.value)}
                  className="text-xs text-slate-700 focus:outline-none bg-transparent"
                />
                <span className="text-slate-400 text-xs">to</span>
                <input
                  type="date"
                  value={customEndDate}
                  onChange={(e) => setCustomEndDate(e.target.value)}
                  className="text-xs text-slate-700 focus:outline-none bg-transparent"
                />
              </div>
            )}

            {/* Sales Rep / User Dropdown */}
            <div className="relative">
              <div className="flex items-center bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm text-xs font-medium text-slate-700 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
                <Users className="w-3.5 h-3.5 text-slate-400 mr-2 shrink-0" />
                <select
                  value={selectedRep}
                  onChange={(e) => setSelectedRep(e.target.value)}
                  aria-label="Filter by Sales Rep"
                  className="bg-transparent text-xs text-slate-800 font-medium focus:outline-none pr-4 cursor-pointer"
                >
                  <option value="All">All Sales Reps</option>
                  {TEAM_MEMBERS.map((member) => (
                    <option key={member.name} value={member.name}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Department Dropdown */}
            <div className="relative">
              <div className="flex items-center bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm text-xs font-medium text-slate-700 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
                <Building2 className="w-3.5 h-3.5 text-slate-400 mr-2 shrink-0" />
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  aria-label="Filter by Department"
                  className="bg-transparent text-xs text-slate-800 font-medium focus:outline-none pr-4 cursor-pointer"
                >
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Reset Filters (Only when filtered) */}
            {isFiltered && (
              <button
                onClick={onResetFilters}
                className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium text-rose-600 bg-rose-50 hover:bg-rose-100/80 border border-rose-200 rounded-xl transition-all"
                title="Reset all filters to default"
              >
                <RefreshCw className="w-3 h-3 mr-1.5" />
                Reset
              </button>
            )}

            {/* Export Simulation Button */}
            <button
              onClick={onExport}
              className="inline-flex items-center px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 active:scale-95 rounded-xl shadow-sm transition-all focus:ring-2 focus:ring-slate-900/20"
            >
              <Download className="w-3.5 h-3.5 mr-1.5" />
              <span>Export CSV</span>
            </button>

          </div>
        </div>
      </div>
    </header>
  );
}

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ExternalLink, 
  ChevronRight, 
  Building2, 
  User, 
  Calendar,
  Layers,
  ArrowUpDown
} from 'lucide-react';
import { formatINR, formatDate } from '../utils/formatters';

export default function LeadsTable({ leads, onSelectLead }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Filter leads based on search query and local status filter
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch = 
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [leads, searchTerm, statusFilter]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Converted':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200/60';
      case 'Qualified':
        return 'bg-blue-50 text-blue-700 border-blue-200/60';
      case 'New':
        return 'bg-amber-50 text-amber-700 border-amber-200/60';
      case 'Unqualified':
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const getLeadQuotedTotal = (lead) => {
    return (lead.quotations || []).reduce((acc, q) => acc + (q.amount || 0), 0);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card overflow-hidden">
      {/* Header & Controls */}
      <div className="px-5 py-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-slate-50/50">
        <div>
          <div className="flex items-center space-x-2">
            <Layers className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Enterprise Leads & Accounts Registry
            </h3>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200/60">
              {filteredLeads.length} Matches
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Click any row to open the hierarchical drill-down drawer (Lead → Quotations → Deals → Orders → Payments).
          </p>
        </div>

        {/* Search & Filter pills */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search company, contact, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-60"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200/60 text-xs">
            {['All', 'New', 'Qualified', 'Converted', 'Unqualified'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-2.5 py-1 rounded-lg font-medium text-[11px] transition-all ${
                  statusFilter === st
                    ? 'bg-white text-slate-900 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-100/75 text-slate-600 uppercase font-semibold text-[11px] tracking-wider border-b border-slate-200/80">
            <tr>
              <th className="py-3 px-4">Lead ID & Company</th>
              <th className="py-3 px-4">Primary Contact</th>
              <th className="py-3 px-3 text-center">Acquisition Source</th>
              <th className="py-3 px-3">Sales Rep</th>
              <th className="py-3 px-3 text-center">Lifecycle Status</th>
              <th className="py-3 px-4 text-right">Quoted Value</th>
              <th className="py-3 px-3 text-center">Date Captured</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredLeads.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-slate-400">
                  No records match your active search or filter.
                </td>
              </tr>
            ) : (
              filteredLeads.map((lead) => {
                const totalQuoted = getLeadQuotedTotal(lead);
                return (
                  <tr
                    key={lead.id}
                    onClick={() => onSelectLead(lead)}
                    className="hover:bg-blue-50/40 cursor-pointer transition-colors group"
                  >
                    <td className="py-3.5 px-4">
                      <div>
                        <span className="font-mono text-[11px] font-bold text-blue-600 group-hover:underline">
                          {lead.id}
                        </span>
                        <div className="font-semibold text-slate-900 text-xs">
                          {lead.company}
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-800">{lead.name}</div>
                      <div className="text-[11px] text-slate-400">{lead.email}</div>
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-700">
                        {lead.source}
                      </span>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="font-medium text-slate-800">{lead.assignedTo}</span>
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getStatusBadge(lead.status)}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-extrabold text-slate-900 tabular-nums">
                      {totalQuoted > 0 ? formatINR(totalQuoted) : '—'}
                    </td>
                    <td className="py-3.5 px-3 text-center text-slate-500 tabular-nums text-[11px]">
                      {formatDate(lead.date)}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="inline-flex items-center text-xs font-semibold text-blue-600 group-hover:text-blue-800 transition-colors">
                        Inspect
                        <ChevronRight className="w-3.5 h-3.5 ml-0.5 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

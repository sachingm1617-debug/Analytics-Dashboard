import React, { useEffect } from 'react';
import { 
  X, 
  Building2, 
  Mail, 
  Phone, 
  Calendar, 
  UserCheck, 
  FileText, 
  Briefcase, 
  Settings, 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Copy,
  ExternalLink,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { formatINR, formatDate } from '../utils/formatters';

export default function DrillDownDrawer({ lead, isOpen, onClose }) {
  // Listen for Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !lead) return null;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Converted':
      case 'Accepted':
      case 'Won':
      case 'Completed':
      case 'Collected':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200/60';
      case 'Qualified':
      case 'In Progress':
        return 'bg-blue-50 text-blue-700 border-blue-200/60';
      case 'Pending':
      case 'Negotiation':
        return 'bg-amber-50 text-amber-700 border-amber-200/60';
      case 'On Hold':
        return 'bg-orange-50 text-orange-700 border-orange-200/60';
      case 'Unqualified':
      case 'Rejected':
      default:
        return 'bg-rose-50 text-rose-700 border-rose-200/60';
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Medium':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Low':
      default:
        return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity animate-fadeIn"
        onClick={onClose}
      />

      {/* Slide-Over Drawer Container */}
      <div className="relative z-10 w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 transform transition-transform duration-300 ease-in-out overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
              {lead.assignedTo?.split(' ').map(n => n[0]).join('') || 'LD'}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-semibold text-slate-500 uppercase">
                  {lead.id}
                </span>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold border ${getStatusBadge(lead.status)}`}>
                  {lead.status}
                </span>
              </div>
              <h2 className="text-base font-bold text-slate-900 truncate">
                {lead.name}
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                navigator.clipboard.writeText(lead.id);
                alert(`Lead ID ${lead.id} copied to clipboard!`);
              }}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
              title="Copy ID"
            >
              <Copy className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body: Scrollable Nested Hierarchy */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          
          {/* 1. Lead Information Card */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              1. Lead Metadata & Account Context
            </h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="flex items-center space-x-2 text-slate-600">
                <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="font-semibold text-slate-900 truncate">{lead.company}</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600">
                <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Captured: {formatDate(lead.date)}</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{lead.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600">
                <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{lead.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600">
                <span className="w-3.5 h-3.5 text-slate-400 font-bold text-[10px] text-center">SRC</span>
                <span>Source: <strong className="text-slate-800">{lead.source}</strong></span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600">
                <UserCheck className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Rep: <strong className="text-slate-800">{lead.assignedTo}</strong></span>
              </div>
            </div>
            {lead.notes && (
              <div className="mt-3 pt-3 border-t border-slate-200/60 text-xs text-slate-600 bg-white/60 p-2.5 rounded-xl border border-slate-200/50">
                <span className="font-semibold text-slate-800">Account Notes: </span>
                {lead.notes}
              </div>
            )}
          </div>

          {/* Hierarchical Trail: Lead -> Quotations -> Deals -> Orders -> Payments */}
          <div className="space-y-6">
            
            {/* 2. Quotation History */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-blue-600" />
                  2. Associated Quotations ({lead.quotations?.length || 0})
                </h3>
              </div>

              {(!lead.quotations || lead.quotations.length === 0) ? (
                <div className="text-xs text-slate-400 p-3 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                  No quotations have been dispatched for this lead yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {lead.quotations.map((quo) => (
                    <div 
                      key={quo.id}
                      className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 relative"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-xs font-bold text-slate-700">{quo.id}</span>
                          <span className="text-xs font-bold text-slate-900">• {quo.serviceCategory}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-extrabold text-slate-900 tabular-nums">
                            {formatINR(quo.amount)}
                          </span>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(quo.status)}`}>
                            {quo.status}
                          </span>
                        </div>
                      </div>
                      <div className="text-[11px] text-slate-400 mb-3">
                        Issued on {formatDate(quo.date)}
                      </div>

                      {/* 3. Generated Deals within this Quotation */}
                      <div className="mt-3 pl-3 border-l-2 border-indigo-200 space-y-3">
                        <h4 className="text-[11px] font-bold text-indigo-700 uppercase tracking-wide flex items-center gap-1">
                          <Briefcase className="w-3 h-3" />
                          Generated Deals ({quo.deals?.length || 0})
                        </h4>

                        {(!quo.deals || quo.deals.length === 0) ? (
                          <p className="text-[11px] text-slate-400 italic">No deals closed under this quotation.</p>
                        ) : (
                          quo.deals.map((deal) => (
                            <div key={deal.id} className="bg-indigo-50/50 p-3 rounded-xl border border-indigo-100 text-xs space-y-2">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <span className="font-mono font-bold text-slate-800">{deal.id}</span>
                                  <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold border ${getPriorityBadge(deal.priority)}`}>
                                    {deal.priority} Priority
                                  </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <span className="font-bold text-slate-900">{formatINR(deal.dealValue)}</span>
                                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(deal.status)}`}>
                                    {deal.status}
                                  </span>
                                </div>
                              </div>

                              {/* 4. Orders Fulfillment Status */}
                              <div className="mt-2 pl-3 border-l-2 border-teal-300 space-y-2.5">
                                <h5 className="text-[10px] font-bold text-teal-800 uppercase tracking-wide flex items-center gap-1">
                                  <Settings className="w-3 h-3" />
                                  Order Fulfillment & Operations
                                </h5>

                                {(!deal.orders || deal.orders.length === 0) ? (
                                  <p className="text-[11px] text-slate-400 italic">No fulfillment order created.</p>
                                ) : (
                                  deal.orders.map((ord) => (
                                    <div key={ord.id} className="bg-white p-2.5 rounded-lg border border-teal-100 shadow-xs space-y-2">
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                          <span className="font-mono font-semibold text-slate-700">{ord.id}</span>
                                          <span className="text-[11px] text-slate-500">Ops: <strong>{ord.assignedOps}</strong></span>
                                        </div>
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(ord.stage)}`}>
                                          Stage: {ord.stage}
                                        </span>
                                      </div>

                                      {/* 5. Payment Audit Log */}
                                      <div className="pt-2 border-t border-slate-100">
                                        <h6 className="text-[10px] font-bold text-slate-500 uppercase mb-1.5 flex items-center gap-1">
                                          <CreditCard className="w-3 h-3 text-emerald-600" />
                                          Payment Tranche Audit Log
                                        </h6>
                                        <div className="space-y-1">
                                          {ord.payments?.map((pay) => (
                                            <div 
                                              key={pay.id} 
                                              className="flex items-center justify-between p-1.5 bg-slate-50 rounded text-[11px] font-medium"
                                            >
                                              <div className="flex items-center space-x-2">
                                                <span className="font-mono text-slate-600">{pay.id}</span>
                                                <span className="text-slate-400">({pay.method || 'Online'})</span>
                                                <span className="text-slate-400">{formatDate(pay.date)}</span>
                                              </div>
                                              <div className="flex items-center space-x-2">
                                                <span className="font-bold text-slate-900">{formatINR(pay.amount)}</span>
                                                <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold border ${getStatusBadge(pay.status)}`}>
                                                  {pay.status}
                                                </span>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      </div>

                                    </div>
                                  ))
                                )}
                              </div>

                            </div>
                          ))
                        )}
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50/90 flex items-center justify-between text-xs">
          <span className="text-slate-500">
            Audit ID: <code className="text-slate-700 font-mono">REC-{lead.id}</code>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl shadow-sm hover:bg-slate-50 transition-colors"
          >
            Dismiss
          </button>
        </div>

      </div>
    </div>
  );
}

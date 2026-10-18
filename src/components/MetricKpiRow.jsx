import React from 'react';
import { 
  Users, 
  UserCheck, 
  CheckCircle, 
  UserX, 
  TrendingUp, 
  FileText, 
  Briefcase, 
  IndianRupee,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { formatINR, formatPercent } from '../utils/formatters';

export default function MetricKpiRow({ kpis }) {
  const {
    newLeads,
    qualifiedLeads,
    convertedLeads,
    unqualifiedLeads,
    conversionRate,
    quotationsCount,
    dealsCount,
    totalRevenue,
    // Comparisons vs previous period
    deltas
  } = kpis;

  const renderTrendBadge = (delta, inverse = false) => {
    if (delta === undefined || isNaN(delta)) {
      return (
        <span className="inline-flex items-center text-[11px] font-semibold text-slate-400">
          — vs prev
        </span>
      );
    }

    const isPositive = delta > 0;
    const isNeutral = delta === 0;
    const isGood = inverse ? !isPositive : isPositive;

    const bgClass = isNeutral
      ? 'bg-slate-100 text-slate-600'
      : isGood
      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/50'
      : 'bg-rose-50 text-rose-700 border border-rose-200/50';

    const Icon = isPositive ? ArrowUpRight : ArrowDownRight;

    return (
      <span className={`inline-flex items-center px-1.5 py-0.5 rounded-md text-[11px] font-bold tracking-tight ${bgClass}`}>
        {!isNeutral && <Icon className="w-3 h-3 mr-0.5 stroke-[2.5]" />}
        {isPositive ? `+${delta.toFixed(1)}%` : `${delta.toFixed(1)}%`}
      </span>
    );
  };

  const cards = [
    {
      title: 'New Leads',
      value: newLeads.count,
      subtext: `${newLeads.pctOfTotal}% of total volume`,
      delta: deltas.newLeads,
      icon: Users,
      color: 'blue',
      accentBg: 'bg-blue-50 text-blue-600 border-blue-100'
    },
    {
      title: 'Qualified Leads',
      value: qualifiedLeads.count,
      subtext: `${qualifiedLeads.pctOfTotal}% qualification rate`,
      delta: deltas.qualifiedLeads,
      icon: UserCheck,
      color: 'indigo',
      accentBg: 'bg-indigo-50 text-indigo-600 border-indigo-100'
    },
    {
      title: 'Converted Leads',
      value: convertedLeads.count,
      subtext: `${convertedLeads.conversionPct}% win conversion`,
      delta: deltas.convertedLeads,
      icon: CheckCircle,
      color: 'emerald',
      accentBg: 'bg-emerald-50 text-emerald-600 border-emerald-100'
    },
    {
      title: 'Unqualified Leads',
      value: unqualifiedLeads.count,
      subtext: `${unqualifiedLeads.pctOfTotal}% drop-off rate`,
      delta: deltas.unqualifiedLeads,
      inverseTrend: true,
      icon: UserX,
      color: 'slate',
      accentBg: 'bg-slate-100 text-slate-600 border-slate-200'
    },
    {
      title: 'Overall Conv. Rate',
      value: formatPercent(conversionRate),
      subtext: 'Leads to closed deals',
      delta: deltas.conversionRate,
      icon: TrendingUp,
      color: 'teal',
      accentBg: 'bg-teal-50 text-teal-600 border-teal-100'
    },
    {
      title: 'Quotations Created',
      value: quotationsCount,
      subtext: 'Proposals dispatched',
      delta: deltas.quotations,
      icon: FileText,
      color: 'amber',
      accentBg: 'bg-amber-50 text-amber-600 border-amber-100'
    },
    {
      title: 'Deals Created',
      value: dealsCount,
      subtext: 'Active pipeline deals',
      delta: deltas.deals,
      icon: Briefcase,
      color: 'violet',
      accentBg: 'bg-violet-50 text-violet-600 border-violet-100'
    },
    {
      title: 'Invoiced Revenue',
      value: formatINR(totalRevenue, true),
      fullValue: formatINR(totalRevenue),
      subtext: 'Total generated deal value',
      delta: deltas.revenue,
      icon: IndianRupee,
      color: 'sky',
      accentBg: 'bg-sky-50 text-sky-600 border-sky-100'
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3">
      {cards.map((card, idx) => {
        const IconComponent = card.icon;
        return (
          <div
            key={idx}
            className="group relative bg-white rounded-2xl border border-slate-200/90 p-3.5 shadow-card hover:shadow-subtle hover:border-slate-300 transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              {/* Header with Icon and Trend */}
              <div className="flex items-center justify-between mb-2">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center border ${card.accentBg}`}>
                  <IconComponent className="w-4 h-4" />
                </div>
                {renderTrendBadge(card.delta, card.inverseTrend)}
              </div>

              {/* Title & Metric */}
              <h3 className="text-[12px] font-medium text-slate-500 leading-tight">
                {card.title}
              </h3>
              <div 
                className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mt-1 tabular-nums"
                title={card.fullValue || String(card.value)}
              >
                {card.value}
              </div>
            </div>

            {/* Subtext info */}
            <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-medium truncate">
                {card.subtext}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

import React from 'react';
import { 
  ResponsiveContainer, 
  ComposedChart, 
  BarChart, 
  Bar, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { 
  Briefcase, 
  IndianRupee, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  ArrowUpRight
} from 'lucide-react';
import { formatINR, formatPercent } from '../utils/formatters';

export default function DealsRevenueAnalyticsRow({
  dealsVsRevenueData,
  priorityBreakdown,
  dailyRevenueTrend,
  revenueMetrics
}) {
  const { totalDealValue, collectedRevenue, outstandingRevenue, collectionRatePct } = revenueMetrics;

  const CustomDailyTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 text-white px-3.5 py-2 rounded-xl text-xs shadow-dropdown border border-slate-800">
          <p className="font-semibold text-slate-300 mb-1">{label}</p>
          <div className="space-y-1">
            {payload.map((entry, index) => (
              <div key={`item-${index}`} className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
                  <span className="text-slate-300">{entry.name}:</span>
                </span>
                <span className="font-bold text-white tabular-nums">
                  {formatINR(entry.value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-5">
      
      {/* 1. Side-by-Side Metric Cards: Total vs Collected vs Outstanding */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Card A: Total Deal Value */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-card flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Deal Pipeline Value
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight tabular-nums">
              {formatINR(totalDealValue)}
            </div>
            <p className="text-xs text-slate-500">
              Contracted value across all active won & qualified deals
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
            <Briefcase className="w-6 h-6" />
          </div>
        </div>

        {/* Card B: Net Collected Revenue */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-card flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                Net Collected Revenue
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                {collectionRatePct.toFixed(1)}% Realized
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 tracking-tight tabular-nums">
              {formatINR(collectedRevenue)}
            </div>
            <p className="text-xs text-slate-500">
              Direct cash realized via UPI, RTGS, and Net Banking
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
            <CheckCircle className="w-6 h-6" />
          </div>
        </div>

        {/* Card C: Outstanding / Pending Revenue */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-card flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
                Outstanding Balance
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                {(100 - collectionRatePct).toFixed(1)}% Due
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-700 tracking-tight tabular-nums">
              {formatINR(outstandingRevenue)}
            </div>
            <p className="text-xs text-slate-500">
              Pending stage completions & deferred milestone tranches
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
            <Clock className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* 2. Middle Row: Deals vs Revenue Dual-Axis Chart & Daily Revenue Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Deals Created vs Deal Revenue (Dual-Axis) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center text-violet-600">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Deals Volume vs Deal Revenue</h3>
                  <p className="text-[11px] text-slate-500">Comparative category monetization</p>
                </div>
              </div>
            </div>

            <div className="h-64 w-full mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={dealsVsRevenueData} margin={{ top: 10, right: 15, left: -20, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis 
                    dataKey="service" 
                    angle={-20} 
                    textAnchor="end" 
                    interval={0} 
                    height={40}
                    tick={{ fontSize: 9.5, fill: '#475569' }} 
                    axisLine={{ stroke: '#e2e8f0' }}
                    tickLine={false}
                  />
                  {/* Left Axis: Deal Count */}
                  <YAxis 
                    yAxisId="left" 
                    tick={{ fontSize: 10, fill: '#64748b' }} 
                    axisLine={false} 
                    tickLine={false}
                    allowDecimals={false}
                  />
                  {/* Right Axis: Revenue */}
                  <YAxis 
                    yAxisId="right" 
                    orientation="right" 
                    tickFormatter={(val) => `₹${(val / 100000).toFixed(0)}L`}
                    tick={{ fontSize: 10, fill: '#64748b' }} 
                    axisLine={false} 
                    tickLine={false}
                  />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'Revenue (₹)' ? formatINR(value) : `${value} deals`,
                      name
                    ]}
                    contentStyle={{ 
                      backgroundColor: '#0f172a', 
                      borderRadius: '10px', 
                      border: 'none', 
                      color: '#fff', 
                      fontSize: '11px' 
                    }}
                  />
                  <Legend 
                    verticalAlign="top" 
                    align="right" 
                    wrapperStyle={{ fontSize: '11px', paddingBottom: '8px' }} 
                  />
                  <Bar yAxisId="left" dataKey="dealCount" name="Deals Count" fill="#8b5cf6" radius={[6, 6, 0, 0]} barSize={26} />
                  <Line yAxisId="right" type="monotone" dataKey="revenue" name="Revenue (₹)" stroke="#0284c7" strokeWidth={2.5} dot={{ r: 4 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Primary Revenue Generator</span>
            <span className="font-semibold text-blue-600">
              {dealsVsRevenueData[0]?.service || 'N/A'}
            </span>
          </div>
        </div>

        {/* Daily Revenue Trend (Recharts Bar Chart) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                  <IndianRupee className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Daily Revenue Trend</h3>
                  <p className="text-[11px] text-slate-500">Collected cash inflows by date</p>
                </div>
              </div>
            </div>

            <div className="h-64 w-full mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyRevenueTrend} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis 
                    dataKey="day" 
                    tick={{ fontSize: 10, fill: '#64748b' }} 
                    axisLine={{ stroke: '#e2e8f0' }}
                    tickLine={false}
                  />
                  <YAxis 
                    tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
                    tick={{ fontSize: 10, fill: '#64748b' }} 
                    axisLine={false} 
                    tickLine={false}
                  />
                  <Tooltip content={<CustomDailyTooltip />} />
                  <Bar dataKey="collected" name="Collected Revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Peak Collection Spike</span>
            <span className="font-semibold text-emerald-600">
              Oct 18 (₹1,20,000)
            </span>
          </div>
        </div>

      </div>

      {/* 3. Deal Priority Breakdown Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Deals Priority Breakdown & Valuation Share</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Risk and value segmentation across High, Medium, and Low tier accounts
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/75 text-slate-600 uppercase font-semibold text-[11px] tracking-wider border-b border-slate-200/80">
              <tr>
                <th className="py-3 px-4">Priority Level</th>
                <th className="py-3 px-4 text-center">Active Deals</th>
                <th className="py-3 px-4 text-right">Total Deal Value</th>
                <th className="py-3 px-4 text-center">Revenue Share</th>
                <th className="py-3 px-4 text-right">Avg Ticket Size</th>
                <th className="py-3 px-4 text-center">Distribution</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {priorityBreakdown.map((row, idx) => {
                const priorityStyles = {
                  High: {
                    badge: 'bg-rose-50 text-rose-700 border-rose-200/60',
                    dot: 'bg-rose-500',
                    bar: 'bg-rose-500'
                  },
                  Medium: {
                    badge: 'bg-amber-50 text-amber-700 border-amber-200/60',
                    dot: 'bg-amber-500',
                    bar: 'bg-amber-500'
                  },
                  Low: {
                    badge: 'bg-blue-50 text-blue-700 border-blue-200/60',
                    dot: 'bg-blue-500',
                    bar: 'bg-blue-500'
                  }
                }[row.priority] || {
                  badge: 'bg-slate-50 text-slate-700 border-slate-200',
                  dot: 'bg-slate-400',
                  bar: 'bg-slate-400'
                };

                return (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${priorityStyles.badge}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${priorityStyles.dot} mr-1.5`}></span>
                        {row.priority} Priority
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-slate-800 tabular-nums">
                      {row.count} deals
                    </td>
                    <td className="py-3.5 px-4 text-right font-extrabold text-slate-900 tabular-nums">
                      {formatINR(row.totalValue)}
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-slate-700 tabular-nums">
                      {row.sharePct.toFixed(1)}%
                    </td>
                    <td className="py-3.5 px-4 text-right font-semibold text-slate-700 tabular-nums">
                      {formatINR(row.avgTicket)}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="w-28 mx-auto bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${priorityStyles.bar}`}
                          style={{ width: `${row.sharePct}%` }}
                        ></div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

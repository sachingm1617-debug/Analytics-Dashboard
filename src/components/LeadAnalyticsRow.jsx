import React from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { 
  Target, 
  TrendingUp, 
  Layers, 
  PieChart as PieIcon, 
  ArrowRight, 
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { formatINR, formatPercent } from '../utils/formatters';

const SOURCE_COLORS = {
  'Google Ads': '#0284c7',   // Sky-600
  'Website': '#10b981',      // Emerald-500
  'Just Dial': '#8b5cf6',    // Violet-500
  'Other': '#f59e0b',        // Amber-500
};

export default function LeadAnalyticsRow({ 
  targetData, 
  funnelData, 
  dailyTrendData, 
  sourceDistribution 
}) {
  const { targetAmount, achievedAmount, remainingAmount, percentAchieved } = targetData;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 text-white px-3.5 py-2.5 rounded-xl shadow-dropdown text-xs border border-slate-800">
          <p className="font-semibold text-slate-300 mb-1.5">{label}</p>
          <div className="space-y-1">
            {payload.map((entry, index) => (
              <div key={`item-${index}`} className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
                  <span className="text-slate-300">{entry.name}:</span>
                </span>
                <span className="font-bold text-white tabular-nums">{entry.value}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
      
      {/* 1. Target Achievement Card */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-card flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Target Achievement</h3>
                <p className="text-[11px] text-slate-500">October 2026 Goal</p>
              </div>
            </div>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200/60">
              {percentAchieved.toFixed(1)}% Done
            </span>
          </div>

          {/* Achieved vs Target */}
          <div className="my-3 space-y-1">
            <span className="text-xs font-medium text-slate-500">Achieved Revenue</span>
            <div className="text-2xl font-extrabold text-slate-900 tracking-tight tabular-nums">
              {formatINR(achievedAmount)}
            </div>
            <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
              <span>Target: <strong className="text-slate-700">{formatINR(targetAmount, true)}</strong></span>
              <span>Left: <strong className="text-slate-700">{formatINR(remainingAmount, true)}</strong></span>
            </div>
          </div>

          {/* Progress Bar with milestone ticks */}
          <div className="mt-4">
            <div className="w-full bg-slate-100 rounded-full h-3.5 overflow-hidden p-0.5 border border-slate-200/80">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 transition-all duration-700 shadow-sm"
                style={{ width: `${Math.min(100, Math.max(0, percentAchieved))}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 mt-1.5 font-medium px-0.5">
              <span>0%</span>
              <span>25%</span>
              <span>50%</span>
              <span>75%</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* Forecast status */}
        <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center text-slate-600 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mr-1.5" />
            <span>Pacing Run Rate:</span>
          </div>
          <span className="font-bold text-slate-900">
            {percentAchieved >= 70 ? 'Optimal (On Track)' : 'Action Needed'}
          </span>
        </div>
      </div>

      {/* 2. Visual Lead Funnel */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-card flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Lead Funnel</h3>
                <p className="text-[11px] text-slate-500">Pipeline Stage Drop-Off</p>
              </div>
            </div>
          </div>

          {/* Inverted Funnel Steps */}
          <div className="mt-4 space-y-3">
            {/* Step 1: Total Leads */}
            <div className="relative p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
                <span>1. Total Inbound Leads</span>
                <span className="tabular-nums font-bold text-blue-700">{funnelData.total}</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full mt-2 overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full w-full"></div>
              </div>
              <div className="text-[10px] text-slate-500 font-medium mt-1 flex justify-between">
                <span>Top of Funnel</span>
                <span>100% baseline</span>
              </div>
            </div>

            {/* Step 2: Qualified Leads */}
            <div className="relative p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
                <span>2. Qualified Prospects</span>
                <span className="tabular-nums font-bold text-indigo-700">{funnelData.qualified}</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full mt-2 overflow-hidden">
                <div 
                  className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${funnelData.qualifiedPct}%` }}
                ></div>
              </div>
              <div className="text-[10px] text-slate-500 font-medium mt-1 flex justify-between">
                <span className="text-rose-600 font-semibold">Drop-off: -{funnelData.qualificationDropOff}%</span>
                <span>{funnelData.qualifiedPct}% retention</span>
              </div>
            </div>

            {/* Step 3: Converted Leads */}
            <div className="relative p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/60">
              <div className="flex items-center justify-between text-xs font-semibold text-emerald-950">
                <span className="flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-1.5" />
                  3. Won & Converted Deals
                </span>
                <span className="tabular-nums font-bold text-emerald-700">{funnelData.converted}</span>
              </div>
              <div className="w-full bg-emerald-200/70 h-2 rounded-full mt-2 overflow-hidden">
                <div 
                  className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${funnelData.convertedPct}%` }}
                ></div>
              </div>
              <div className="text-[10px] text-emerald-800 font-medium mt-1 flex justify-between">
                <span>Conversion of qualified</span>
                <span className="font-bold">{funnelData.qualifiedToWonPct}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Overall Funnel Efficiency</span>
          <span className="font-bold text-slate-900">{funnelData.convertedPct}%</span>
        </div>
      </div>

      {/* 3. Daily Lead Trend (Recharts Multi-line) */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-card flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Daily Lead Trend</h3>
                <p className="text-[11px] text-slate-500">Intra-month velocity</p>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="h-56 w-full mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyTrendData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis 
                  dataKey="day" 
                  tick={{ fontSize: 10, fill: '#64748b' }} 
                  axisLine={{ stroke: '#e2e8f0' }}
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 10, fill: '#64748b' }} 
                  axisLine={false} 
                  tickLine={false}
                  allowDecimals={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  verticalAlign="top" 
                  align="right" 
                  iconType="circle"
                  iconSize={7}
                  wrapperStyle={{ fontSize: '11px', paddingBottom: '6px' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="New" 
                  stroke="#3b82f6" 
                  strokeWidth={2.2} 
                  dot={{ r: 2 }} 
                  activeDot={{ r: 5 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="Qualified" 
                  stroke="#8b5cf6" 
                  strokeWidth={2.2} 
                  dot={{ r: 2 }} 
                  activeDot={{ r: 5 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="Converted" 
                  stroke="#10b981" 
                  strokeWidth={2.2} 
                  dot={{ r: 2 }} 
                  activeDot={{ r: 5 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Tracking window</span>
          <span className="font-medium text-slate-700">Daily Oct 2026</span>
        </div>
      </div>

      {/* 4. Lead Sources Donut */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-card flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                <PieIcon className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Lead Acquisition</h3>
                <p className="text-[11px] text-slate-500">Source attribution share</p>
              </div>
            </div>
          </div>

          {/* Donut Chart */}
          <div className="relative h-44 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourceDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={46}
                  outerRadius={68}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {sourceDistribution.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={SOURCE_COLORS[entry.name] || '#94a3b8'} 
                    />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(val, name) => [`${val} leads`, name]}
                  contentStyle={{ 
                    backgroundColor: '#0f172a', 
                    borderRadius: '10px', 
                    border: 'none', 
                    color: '#fff', 
                    fontSize: '11px' 
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] uppercase font-bold text-slate-400">Total</span>
              <span className="text-lg font-extrabold text-slate-900 tabular-nums">
                {sourceDistribution.reduce((acc, curr) => acc + curr.value, 0)}
              </span>
            </div>
          </div>

          {/* Interactive Legend with pills */}
          <div className="grid grid-cols-2 gap-2 mt-2">
            {sourceDistribution.map((item) => (
              <div 
                key={item.name} 
                className="flex items-center justify-between p-1.5 rounded-lg bg-slate-50 border border-slate-100 text-xs"
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <span 
                    className="w-2 h-2 rounded-full shrink-0" 
                    style={{ backgroundColor: SOURCE_COLORS[item.name] || '#94a3b8' }}
                  ></span>
                  <span className="text-slate-600 truncate font-medium text-[11px]">{item.name}</span>
                </div>
                <span className="font-bold text-slate-900 text-[11px] tabular-nums shrink-0 ml-1">
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Top Inbound Driver</span>
          <span className="font-semibold text-blue-600">
            {sourceDistribution[0]?.name || 'N/A'} ({sourceDistribution[0]?.percentage || 0}%)
          </span>
        </div>
      </div>

    </div>
  );
}

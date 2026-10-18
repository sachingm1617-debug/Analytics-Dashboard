import React from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  Cell 
} from 'recharts';
import { 
  FileText, 
  PieChart, 
  Table, 
  Award, 
  ChevronRight, 
  TrendingUp, 
  ExternalLink 
} from 'lucide-react';
import { formatINR, formatPercent } from '../utils/formatters';

const SERVICE_PALETTE = [
  '#0284c7', // Sky
  '#0d9488', // Teal
  '#16a34a', // Green
  '#d97706', // Amber
  '#dc2626', // Red
  '#9333ea', // Purple
  '#4f46e5', // Indigo
];

export default function QuotationAnalyticsRow({ 
  quotationsByService, 
  quotationValueShare, 
  serviceQuotationTable, 
  overallQuoteConversion,
  onSelectServiceDrillDown 
}) {
  const { totalQuotes, acceptedQuotes, winRatePct } = overallQuoteConversion;

  // Gauge calculation for semi-circle or circular radial gauge
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (winRatePct / 100) * circumference;

  return (
    <div className="space-y-5">
      
      {/* Top Split: Two Visual Analytics Cards + Conversion Gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* 1. Quotations by Service (Volume) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Quotations by Service</h3>
                  <p className="text-[11px] text-slate-500">Proposal volume distribution</p>
                </div>
              </div>
            </div>

            <div className="h-56 w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={quotationsByService} margin={{ top: 10, right: 10, left: -25, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis 
                    dataKey="service" 
                    angle={-25}
                    textAnchor="end"
                    interval={0}
                    height={40}
                    tick={{ fontSize: 9.5, fill: '#475569' }} 
                    axisLine={{ stroke: '#e2e8f0' }}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fontSize: 10, fill: '#64748b' }} 
                    axisLine={false} 
                    tickLine={false}
                    allowDecimals={false}
                  />
                  <Tooltip 
                    formatter={(value) => [`${value} proposals`, 'Volume']}
                    contentStyle={{ 
                      backgroundColor: '#0f172a', 
                      borderRadius: '10px', 
                      border: 'none', 
                      color: '#fff', 
                      fontSize: '11px' 
                    }}
                  />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                    {quotationsByService.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={SERVICE_PALETTE[index % SERVICE_PALETTE.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Most Inquired</span>
            <span className="font-semibold text-sky-600">
              {quotationsByService[0]?.service || 'None'} ({quotationsByService[0]?.count || 0})
            </span>
          </div>
        </div>

        {/* 2. Quotation Value Share (Amount ₹) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Quotation Value Share</h3>
                  <p className="text-[11px] text-slate-500">Total pipeline value by category</p>
                </div>
              </div>
            </div>

            <div className="h-56 w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  layout="vertical" 
                  data={quotationValueShare} 
                  margin={{ top: 5, right: 20, left: 35, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                  <XAxis 
                    type="number" 
                    tickFormatter={(val) => `₹${(val / 100000).toFixed(1)}L`} 
                    tick={{ fontSize: 9.5, fill: '#64748b' }} 
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    dataKey="service" 
                    type="category" 
                    tick={{ fontSize: 9.5, fill: '#334155' }} 
                    axisLine={false}
                    tickLine={false}
                    width={90}
                  />
                  <Tooltip 
                    formatter={(val) => [formatINR(val), 'Value']}
                    contentStyle={{ 
                      backgroundColor: '#0f172a', 
                      borderRadius: '10px', 
                      border: 'none', 
                      color: '#fff', 
                      fontSize: '11px' 
                    }}
                  />
                  <Bar dataKey="amount" radius={[0, 6, 6, 0]} fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>High Value Segment</span>
            <span className="font-semibold text-emerald-600">
              {quotationValueShare[0]?.service || 'None'}
            </span>
          </div>
        </div>

        {/* 3. Quote-to-Deal Conversion Gauge */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center text-violet-600">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Quote Win Rate</h3>
                  <p className="text-[11px] text-slate-500">Quote-to-Deal Conversion</p>
                </div>
              </div>
            </div>

            {/* Circular Gauge Display */}
            <div className="flex flex-col items-center justify-center py-3">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                  {/* Background Track */}
                  <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    stroke="#e2e8f0"
                    strokeWidth="10"
                    fill="transparent"
                  />
                  {/* Active Progress */}
                  <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    stroke="#8b5cf6"
                    strokeWidth="10"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                {/* Center Value */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    {winRatePct.toFixed(1)}%
                  </span>
                  <span className="text-[10px] font-semibold uppercase text-slate-400">Accepted</span>
                </div>
              </div>

              {/* Counts Breakdown */}
              <div className="grid grid-cols-2 gap-3 w-full mt-2">
                <div className="bg-slate-50 p-2 rounded-xl text-center border border-slate-100">
                  <span className="text-[10px] text-slate-500 font-medium">Accepted Quotes</span>
                  <p className="text-sm font-bold text-emerald-600">{acceptedQuotes}</p>
                </div>
                <div className="bg-slate-50 p-2 rounded-xl text-center border border-slate-100">
                  <span className="text-[10px] text-slate-500 font-medium">Total Quotes</span>
                  <p className="text-sm font-bold text-slate-800">{totalQuotes}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Industry Benchmark</span>
            <span className="font-semibold text-emerald-600">+11.4% Ahead</span>
          </div>
        </div>

      </div>

      {/* Service-Wise Quotation Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 bg-slate-50/50">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Table className="w-4 h-4 text-slate-500" />
              Service-Wise Quotation Performance
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Detailed quote conversion and quote-to-deal win rates by service line. Click any row to inspect leads.
            </p>
          </div>
          <span className="inline-flex items-center text-xs text-slate-500 font-medium bg-white px-2.5 py-1 rounded-lg border border-slate-200/80">
            {serviceQuotationTable.length} Services Listed
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/75 text-slate-600 uppercase font-semibold text-[11px] tracking-wider border-b border-slate-200/80">
              <tr>
                <th className="py-3 px-4">Service Category</th>
                <th className="py-3 px-4 text-center">Total Quotes</th>
                <th className="py-3 px-4 text-right">Quoted Amount (₹)</th>
                <th className="py-3 px-4 text-center">Accepted</th>
                <th className="py-3 px-4 text-center">Pending</th>
                <th className="py-3 px-4 text-center">Rejected</th>
                <th className="py-3 px-4 text-center">Quote-to-Deal Rate</th>
                <th className="py-3 px-4 text-right">Drill-Down</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {serviceQuotationTable.map((row, idx) => (
                <tr 
                  key={idx}
                  onClick={() => onSelectServiceDrillDown(row.service)}
                  className="hover:bg-blue-50/40 cursor-pointer transition-colors group"
                >
                  <td className="py-3.5 px-4 font-semibold text-slate-900 flex items-center gap-2">
                    <span 
                      className="w-2.5 h-2.5 rounded-full" 
                      style={{ backgroundColor: SERVICE_PALETTE[idx % SERVICE_PALETTE.length] }}
                    ></span>
                    <span>{row.service}</span>
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-slate-700 tabular-nums">
                    {row.total}
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-slate-900 tabular-nums">
                    {formatINR(row.amount)}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                      {row.accepted}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200/60">
                      {row.pending}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                      {row.rejected}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-blue-600 h-full rounded-full"
                          style={{ width: `${row.conversionRate}%` }}
                        ></div>
                      </div>
                      <span className="font-bold text-slate-900 tabular-nums text-[11px]">
                        {row.conversionRate.toFixed(1)}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="inline-flex items-center text-xs font-semibold text-blue-600 group-hover:text-blue-800 transition-colors">
                      Inspect Leads
                      <ChevronRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

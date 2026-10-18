import React from 'react';
import { 
  Users, 
  Settings, 
  Activity, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  PauseCircle, 
  ArrowUpRight,
  ShieldCheck,
  CreditCard,
  FileCheck,
  Briefcase
} from 'lucide-react';
import { formatINR, formatPercent } from '../utils/formatters';

export default function OperationsExecutionRow({
  salesRepActivity,
  opsRepActivity,
  serviceStageProgress,
  recentActivities,
  onSelectRep
}) {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'payment':
        return <CreditCard className="w-4 h-4 text-emerald-600" />;
      case 'deal':
        return <Briefcase className="w-4 h-4 text-violet-600" />;
      case 'order':
        return <Settings className="w-4 h-4 text-blue-600" />;
      case 'quotation':
        return <FileCheck className="w-4 h-4 text-amber-600" />;
      case 'lead':
      default:
        return <Users className="w-4 h-4 text-sky-600" />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Team Performance Grid: Sales Team Activity & Operations Team Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        
        {/* Sales Team Activity Table (xl:col-span-7) */}
        <div className="xl:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-card overflow-hidden flex flex-col justify-between">
          <div>
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Sales Team Performance Leaderboard</h3>
                  <p className="text-xs text-slate-500">Pipeline conversion and individual quota contributions</p>
                </div>
              </div>
              <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                Click rep to filter
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100/75 text-slate-600 uppercase font-semibold text-[11px] tracking-wider border-b border-slate-200/80">
                  <tr>
                    <th className="py-3 px-4">Sales Consultant</th>
                    <th className="py-3 px-3 text-center">Leads</th>
                    <th className="py-3 px-3 text-center">Qualified</th>
                    <th className="py-3 px-3 text-center">Converted</th>
                    <th className="py-3 px-3 text-center">Win %</th>
                    <th className="py-3 px-3 text-center">Quotes</th>
                    <th className="py-3 px-3 text-center">Deals</th>
                    <th className="py-3 px-4 text-right">Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {salesRepActivity.map((rep, idx) => (
                    <tr 
                      key={idx}
                      onClick={() => onSelectRep && onSelectRep(rep.name)}
                      className="hover:bg-blue-50/40 cursor-pointer transition-colors group"
                      title={`Filter dashboard for ${rep.name}`}
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2.5">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-[11px] ${rep.color || 'bg-slate-700'}`}>
                            {rep.avatar}
                          </div>
                          <div>
                            <span className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                              {rep.name}
                            </span>
                            <p className="text-[10px] text-slate-400">{rep.role}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-center font-bold text-slate-700 tabular-nums">
                        {rep.leadsHandled}
                      </td>
                      <td className="py-3 px-3 text-center font-medium text-slate-600 tabular-nums">
                        {rep.qualified}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-700">
                          {rep.converted}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center font-bold text-slate-900 tabular-nums">
                        {rep.conversionRate.toFixed(1)}%
                      </td>
                      <td className="py-3 px-3 text-center font-medium text-slate-600 tabular-nums">
                        {rep.quotesSent}
                      </td>
                      <td className="py-3 px-3 text-center font-bold text-violet-700 tabular-nums">
                        {rep.dealsClosed}
                      </td>
                      <td className="py-3 px-4 text-right font-extrabold text-slate-900 tabular-nums">
                        {formatINR(rep.revenueGenerated)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Quota Completion Leader</span>
            <span className="font-semibold text-emerald-600">
              {salesRepActivity[0]?.name} ({formatINR(salesRepActivity[0]?.revenueGenerated)})
            </span>
          </div>
        </div>

        {/* Operations Team Activity Table (xl:col-span-5) */}
        <div className="xl:col-span-5 bg-white rounded-2xl border border-slate-200/90 shadow-card overflow-hidden flex flex-col justify-between">
          <div>
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center text-violet-600">
                  <Settings className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Operations Fulfillment</h3>
                  <p className="text-xs text-slate-500">Order processing & milestone audit</p>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100/75 text-slate-600 uppercase font-semibold text-[11px] tracking-wider border-b border-slate-200/80">
                  <tr>
                    <th className="py-3 px-4">Ops Specialist</th>
                    <th className="py-3 px-3 text-center">Orders</th>
                    <th className="py-3 px-3 text-center">Completed</th>
                    <th className="py-3 px-3 text-center">Pending</th>
                    <th className="py-3 px-3 text-center">Overdue</th>
                    <th className="py-3 px-4 text-right">SLA %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {opsRepActivity.map((ops, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-semibold text-slate-900 flex items-center space-x-2">
                        <div className="w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-[10px]">
                          {ops.avatar}
                        </div>
                        <span>{ops.name}</span>
                      </td>
                      <td className="py-3 px-3 text-center font-bold text-slate-800 tabular-nums">
                        {ops.ordersUpdated}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-700">
                          {ops.stagesCompleted}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-50 text-amber-700">
                          {ops.pendingStages}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className={`inline-flex items-center px-1.5 py-0.5 rounded-md text-[11px] font-bold ${ops.overdueOrders > 0 ? 'bg-rose-50 text-rose-700' : 'bg-slate-100 text-slate-600'}`}>
                          {ops.overdueOrders}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-emerald-600 tabular-nums">
                        {ops.slaCompliance}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Overall SLA Compliance</span>
            <span className="font-semibold text-emerald-600">96.8% On Schedule</span>
          </div>
        </div>

      </div>

      {/* 2. Bottom Row: Orders & Stage Progress (Stacked Bars) + Recent Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Orders & Stage Progress (Stacked Visual Progress Bars) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Orders & Stage Progress</h3>
                  <p className="text-[11px] text-slate-500">Service fulfillment stage segmentation</p>
                </div>
              </div>
              
              {/* Legend */}
              <div className="flex items-center space-x-3 text-[11px] font-medium text-slate-600">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Completed
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span> In Progress
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span> Pending
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-rose-400"></span> On Hold
                </span>
              </div>
            </div>

            {/* Stacked Progress Bars for each Service */}
            <div className="space-y-3.5 mt-4">
              {serviceStageProgress.map((item, idx) => {
                const total = (item.completed || 0) + (item.inProgress || 0) + (item.pending || 0) + (item.onHold || 0) || 1;
                const pCompleted = ((item.completed || 0) / total) * 100;
                const pInProgress = ((item.inProgress || 0) / total) * 100;
                const pPending = ((item.pending || 0) / total) * 100;
                const pOnHold = ((item.onHold || 0) / total) * 100;

                return (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-800">{item.service}</span>
                      <span className="text-[11px] text-slate-500 tabular-nums">
                        {item.completed} of {total} orders fulfilled ({pCompleted.toFixed(0)}%)
                      </span>
                    </div>
                    {/* Stacked Bar */}
                    <div className="w-full h-3 bg-slate-100 rounded-full flex overflow-hidden p-0.5 border border-slate-200/60">
                      {item.completed > 0 && (
                        <div 
                          className="bg-emerald-500 h-full rounded-l-full transition-all duration-500"
                          style={{ width: `${pCompleted}%` }}
                          title={`Completed: ${item.completed}`}
                        ></div>
                      )}
                      {item.inProgress > 0 && (
                        <div 
                          className="bg-blue-500 h-full transition-all duration-500"
                          style={{ width: `${pInProgress}%` }}
                          title={`In Progress: ${item.inProgress}`}
                        ></div>
                      )}
                      {item.pending > 0 && (
                        <div 
                          className="bg-amber-400 h-full transition-all duration-500"
                          style={{ width: `${pPending}%` }}
                          title={`Pending: ${item.pending}`}
                        ></div>
                      )}
                      {item.onHold > 0 && (
                        <div 
                          className="bg-rose-400 h-full rounded-r-full transition-all duration-500"
                          style={{ width: `${pOnHold}%` }}
                          title={`On Hold: ${item.onHold}`}
                        ></div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 mt-4 flex items-center justify-between text-xs text-slate-500">
            <span>Fulfillment Pipeline Health</span>
            <span className="font-semibold text-emerald-600">Stable • Zero Bottlenecks Detected</span>
          </div>
        </div>

        {/* Recent CRM Activity Audit Feed */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Recent CRM Activity Audit Feed</h3>
                  <p className="text-[11px] text-slate-500">Live chronological stream of system events</p>
                </div>
              </div>
              <span className="flex items-center text-[11px] font-bold text-emerald-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-soft-pulse mr-1.5"></span>
                Real-time
              </span>
            </div>

            {/* Event list */}
            <div className="space-y-3.5 mt-2">
              {recentActivities.map((event) => (
                <div 
                  key={event.id}
                  className="flex items-start space-x-3 p-2.5 rounded-xl bg-slate-50/70 border border-slate-100 hover:bg-slate-100/60 transition-colors"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border border-slate-200 bg-white shadow-xs`}>
                    {getActivityIcon(event.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-bold text-slate-900 truncate">
                        {event.action}
                      </span>
                      <span className="text-[10px] text-slate-400 shrink-0 font-medium">
                        {event.timestamp.split(' ')[1]}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-2">
                      {event.description}
                    </p>
                    <div className="flex items-center justify-between mt-1 text-[10px] text-slate-400">
                      <span className="font-semibold text-slate-700">{event.user}</span>
                      {event.badge && (
                        <span className="px-1.5 py-0.2 rounded bg-slate-200/70 text-slate-700 font-bold">
                          {event.badge}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 mt-4 flex items-center justify-between text-xs text-slate-500">
            <span>Audit Trail Log</span>
            <span className="font-medium text-slate-700">Encrypted MCA / GST Event Store</span>
          </div>
        </div>

      </div>

    </div>
  );
}

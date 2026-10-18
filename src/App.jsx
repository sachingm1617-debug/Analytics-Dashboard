import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import MetricKpiRow from './components/MetricKpiRow';
import LeadAnalyticsRow from './components/LeadAnalyticsRow';
import QuotationAnalyticsRow from './components/QuotationAnalyticsRow';
import DealsRevenueAnalyticsRow from './components/DealsRevenueAnalyticsRow';
import OperationsExecutionRow from './components/OperationsExecutionRow';
import LeadsTable from './components/LeadsTable';
import DrillDownDrawer from './components/DrillDownDrawer';
import ZeroStateFallback from './components/ZeroStateFallback';
import { 
  MOCK_LEADS, 
  TEAM_MEMBERS, 
  SERVICES, 
  MOCK_ACTIVITIES, 
  MONTHLY_TARGET,
  PREVIOUS_PERIOD_BASELINE 
} from './data/mockData';
import { exportToCSV } from './utils/formatters';
import { CheckCircle2, AlertTriangle, Layers, Bell } from 'lucide-react';

export default function App() {
  // Global Filter State
  const [dateFilter, setDateFilter] = useState('Last 30 Days');
  const [customStartDate, setCustomStartDate] = useState('2026-10-01');
  const [customEndDate, setCustomEndDate] = useState('2026-10-31');
  const [selectedRep, setSelectedRep] = useState('All');
  const [selectedDept, setSelectedDept] = useState('All Departments');

  // Drill-down Drawer State
  const [selectedLead, setSelectedLead] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3800);
  };

  // 1. Reactive Filtering of Leads
  const filteredLeads = useMemo(() => {
    return MOCK_LEADS.filter((lead) => {
      // Date filter
      let matchesDate = true;
      if (dateFilter === 'Today') {
        matchesDate = lead.date === '2026-10-30' || lead.date === '2026-10-31';
      } else if (dateFilter === 'Last 7 Days') {
        matchesDate = lead.date >= '2026-10-24' && lead.date <= '2026-10-31';
      } else if (dateFilter === 'Last 30 Days') {
        matchesDate = lead.date >= '2026-10-01' && lead.date <= '2026-10-31';
      } else if (dateFilter === 'Custom Range') {
        matchesDate = lead.date >= customStartDate && lead.date <= customEndDate;
      }

      // Sales Rep filter
      let matchesRep = true;
      if (selectedRep !== 'All') {
        matchesRep = lead.assignedTo === selectedRep;
      }

      // Department filter
      let matchesDept = true;
      if (selectedDept !== 'All Departments') {
        matchesDept = lead.department === selectedDept;
      }

      return matchesDate && matchesRep && matchesDept;
    });
  }, [dateFilter, customStartDate, customEndDate, selectedRep, selectedDept]);

  // Is any filter active beyond default
  const isFiltered = dateFilter !== 'Last 30 Days' || selectedRep !== 'All' || selectedDept !== 'All Departments';

  const handleResetFilters = () => {
    setDateFilter('Last 30 Days');
    setCustomStartDate('2026-10-01');
    setCustomEndDate('2026-10-31');
    setSelectedRep('All');
    setSelectedDept('All Departments');
    showToast('Filters reset to default (All October 2026 data).');
  };

  // 2. Computed KPI Metrics & Previous Period Deltas
  const kpiData = useMemo(() => {
    const totalCount = filteredLeads.length;
    const newCount = filteredLeads.filter(l => l.status === 'New').length;
    const qualifiedCount = filteredLeads.filter(l => l.status === 'Qualified' || l.status === 'Converted').length;
    const convertedCount = filteredLeads.filter(l => l.status === 'Converted').length;
    const unqualifiedCount = filteredLeads.filter(l => l.status === 'Unqualified').length;
    const conversionRate = totalCount > 0 ? (convertedCount / totalCount) * 100 : 0;

    // Aggregations
    let quotationsCount = 0;
    let dealsCount = 0;
    let totalRevenue = 0;
    let collectedRevenue = 0;

    filteredLeads.forEach(lead => {
      (lead.quotations || []).forEach(quo => {
        quotationsCount += 1;
        (quo.deals || []).forEach(deal => {
          dealsCount += 1;
          totalRevenue += deal.dealValue || 0;
          (deal.orders || []).forEach(order => {
            (order.payments || []).forEach(pay => {
              if (pay.status === 'Collected') {
                collectedRevenue += pay.amount || 0;
              }
            });
          });
        });
      });
    });

    // Comparative Deltas vs Previous Baseline
    const calcDelta = (current, baseline) => {
      if (!baseline || baseline === 0) return 0;
      return ((current - baseline) / baseline) * 100;
    };

    const deltas = {
      newLeads: calcDelta(totalCount, PREVIOUS_PERIOD_BASELINE.totalLeads),
      qualifiedLeads: calcDelta(qualifiedCount, PREVIOUS_PERIOD_BASELINE.qualifiedLeads),
      convertedLeads: calcDelta(convertedCount, PREVIOUS_PERIOD_BASELINE.convertedLeads),
      unqualifiedLeads: calcDelta(unqualifiedCount, PREVIOUS_PERIOD_BASELINE.unqualifiedLeads),
      conversionRate: conversionRate - PREVIOUS_PERIOD_BASELINE.conversionRate,
      quotations: calcDelta(quotationsCount, PREVIOUS_PERIOD_BASELINE.quotationsCount),
      deals: calcDelta(dealsCount, PREVIOUS_PERIOD_BASELINE.dealsCount),
      revenue: calcDelta(totalRevenue, PREVIOUS_PERIOD_BASELINE.totalRevenue),
    };

    return {
      newLeads: {
        count: totalCount,
        pctOfTotal: 100
      },
      qualifiedLeads: {
        count: qualifiedCount,
        pctOfTotal: totalCount > 0 ? ((qualifiedCount / totalCount) * 100).toFixed(1) : 0
      },
      convertedLeads: {
        count: convertedCount,
        conversionPct: totalCount > 0 ? ((convertedCount / totalCount) * 100).toFixed(1) : 0
      },
      unqualifiedLeads: {
        count: unqualifiedCount,
        pctOfTotal: totalCount > 0 ? ((unqualifiedCount / totalCount) * 100).toFixed(1) : 0
      },
      conversionRate,
      quotationsCount,
      dealsCount,
      totalRevenue,
      collectedRevenue,
      deltas
    };
  }, [filteredLeads]);

  // 3. Target Achievement & Funnel Data
  const targetData = useMemo(() => {
    const achieved = kpiData.collectedRevenue;
    const remaining = Math.max(0, MONTHLY_TARGET - achieved);
    const percentAchieved = MONTHLY_TARGET > 0 ? (achieved / MONTHLY_TARGET) * 100 : 0;

    return {
      targetAmount: MONTHLY_TARGET,
      achievedAmount: achieved,
      remainingAmount: remaining,
      percentAchieved
    };
  }, [kpiData.collectedRevenue]);

  const funnelData = useMemo(() => {
    const total = filteredLeads.length;
    const qualified = filteredLeads.filter(l => l.status === 'Qualified' || l.status === 'Converted').length;
    const converted = filteredLeads.filter(l => l.status === 'Converted').length;

    const qualifiedPct = total > 0 ? ((qualified / total) * 100).toFixed(1) : 0;
    const convertedPct = total > 0 ? ((converted / total) * 100).toFixed(1) : 0;
    const dropOff = (100 - Number(qualifiedPct)).toFixed(1);
    const qualifiedToWonPct = qualified > 0 ? ((converted / qualified) * 100).toFixed(1) : 0;

    return {
      total,
      qualified,
      converted,
      qualifiedPct,
      convertedPct,
      qualificationDropOff: dropOff,
      qualifiedToWonPct
    };
  }, [filteredLeads]);

  // 4. Daily Lead Trend Multi-line Chart Data
  const dailyTrendData = useMemo(() => {
    const dayMap = {};
    // Seed days
    for (let d = 1; d <= 31; d++) {
      const dayStr = d < 10 ? `0${d}` : `${d}`;
      const dateKey = `2026-10-${dayStr}`;
      dayMap[dateKey] = { day: `Oct ${d}`, New: 0, Qualified: 0, Converted: 0 };
    }

    filteredLeads.forEach(lead => {
      if (dayMap[lead.date]) {
        dayMap[lead.date].New += 1;
        if (lead.status === 'Qualified' || lead.status === 'Converted') {
          dayMap[lead.date].Qualified += 1;
        }
        if (lead.status === 'Converted') {
          dayMap[lead.date].Converted += 1;
        }
      }
    });

    // Return only days that fall in filter or non-empty slice
    const list = Object.values(dayMap);
    if (dateFilter === 'Last 7 Days') {
      return list.slice(23, 31);
    }
    if (dateFilter === 'Today') {
      return list.slice(28, 31);
    }
    return list.filter((_, idx) => idx % 2 === 0 || idx === 30); // sample for clean spacing
  }, [filteredLeads, dateFilter]);

  // 5. Lead Acquisition Sources Donut Data
  const sourceDistribution = useMemo(() => {
    const counts = { 'Google Ads': 0, 'Website': 0, 'Just Dial': 0, 'Other': 0 };
    filteredLeads.forEach(l => {
      counts[l.source] = (counts[l.source] || 0) + 1;
    });

    const total = filteredLeads.length || 1;
    return Object.entries(counts).map(([name, value]) => ({
      name,
      value,
      percentage: ((value / total) * 100).toFixed(1)
    }));
  }, [filteredLeads]);

  // 6. Quotation Analytics Data
  const { quotationsByService, quotationValueShare, serviceQuotationTable, overallQuoteConversion } = useMemo(() => {
    const serviceMap = {};
    SERVICES.forEach(s => {
      serviceMap[s] = {
        service: s,
        count: 0,
        amount: 0,
        accepted: 0,
        pending: 0,
        rejected: 0,
      };
    });

    let totalQuotes = 0;
    let acceptedQuotes = 0;

    filteredLeads.forEach(lead => {
      (lead.quotations || []).forEach(quo => {
        totalQuotes += 1;
        if (quo.status === 'Accepted') acceptedQuotes += 1;

        const s = serviceMap[quo.serviceCategory] || {
          service: quo.serviceCategory,
          count: 0,
          amount: 0,
          accepted: 0,
          pending: 0,
          rejected: 0,
        };

        s.count += 1;
        s.amount += quo.amount || 0;
        if (quo.status === 'Accepted') s.accepted += 1;
        else if (quo.status === 'Pending') s.pending += 1;
        else if (quo.status === 'Rejected') s.rejected += 1;

        serviceMap[quo.serviceCategory] = s;
      });
    });

    const list = Object.values(serviceMap).map(item => ({
      ...item,
      conversionRate: item.count > 0 ? (item.accepted / item.count) * 100 : 0
    }));

    // Sort by count for by-service chart
    const byCount = [...list].sort((a, b) => b.count - a.count);
    // Sort by amount for value-share chart
    const byAmount = [...list].sort((a, b) => b.amount - a.amount);

    const winRatePct = totalQuotes > 0 ? (acceptedQuotes / totalQuotes) * 100 : 0;

    return {
      quotationsByService: byCount,
      quotationValueShare: byAmount,
      serviceQuotationTable: list,
      overallQuoteConversion: {
        totalQuotes,
        acceptedQuotes,
        winRatePct
      }
    };
  }, [filteredLeads]);

  // 7. Deals & Revenue Analytics Data
  const { dealsVsRevenueData, priorityBreakdown, dailyRevenueTrend, revenueMetrics } = useMemo(() => {
    const serviceDealsMap = {};
    SERVICES.forEach(s => {
      serviceDealsMap[s] = { service: s, dealCount: 0, revenue: 0 };
    });

    const priorityMap = {
      High: { priority: 'High', count: 0, totalValue: 0 },
      Medium: { priority: 'Medium', count: 0, totalValue: 0 },
      Low: { priority: 'Low', count: 0, totalValue: 0 }
    };

    const dailyRevMap = {};
    for (let d = 1; d <= 31; d++) {
      const dayStr = d < 10 ? `0${d}` : `${d}`;
      dailyRevMap[`2026-10-${dayStr}`] = { day: `Oct ${d}`, target: 275000, collected: 0 };
    }

    let totalDealValue = 0;
    let collectedRevenue = 0;

    filteredLeads.forEach(lead => {
      (lead.quotations || []).forEach(quo => {
        (quo.deals || []).forEach(deal => {
          totalDealValue += deal.dealValue || 0;
          
          if (serviceDealsMap[deal.service]) {
            serviceDealsMap[deal.service].dealCount += 1;
            serviceDealsMap[deal.service].revenue += deal.dealValue || 0;
          }

          if (priorityMap[deal.priority]) {
            priorityMap[deal.priority].count += 1;
            priorityMap[deal.priority].totalValue += deal.dealValue || 0;
          }

          (deal.orders || []).forEach(order => {
            (order.payments || []).forEach(pay => {
              if (pay.status === 'Collected') {
                collectedRevenue += pay.amount || 0;
                if (dailyRevMap[pay.date]) {
                  dailyRevMap[pay.date].collected += pay.amount || 0;
                }
              }
            });
          });
        });
      });
    });

    const dealsVsRev = Object.values(serviceDealsMap).sort((a, b) => b.revenue - a.revenue);

    const priorityList = Object.values(priorityMap).map(p => ({
      ...p,
      sharePct: totalDealValue > 0 ? (p.totalValue / totalDealValue) * 100 : 0,
      avgTicket: p.count > 0 ? p.totalValue / p.count : 0
    }));

    const outstandingRevenue = Math.max(0, totalDealValue - collectedRevenue);
    const collectionRatePct = totalDealValue > 0 ? (collectedRevenue / totalDealValue) * 100 : 0;

    let dailyRevList = Object.values(dailyRevMap);
    if (dateFilter === 'Last 7 Days') {
      dailyRevList = dailyRevList.slice(23, 31);
    } else {
      dailyRevList = dailyRevList.filter((_, idx) => idx % 2 === 0 || idx === 30);
    }

    return {
      dealsVsRevenueData: dealsVsRev,
      priorityBreakdown: priorityList,
      dailyRevenueTrend: dailyRevList,
      revenueMetrics: {
        totalDealValue,
        collectedRevenue,
        outstandingRevenue,
        collectionRatePct
      }
    };
  }, [filteredLeads, dateFilter]);

  // 8. Operations & Team Execution Data
  const { salesRepActivity, opsRepActivity, serviceStageProgress } = useMemo(() => {
    // Sales Rep metrics
    const repMap = {};
    TEAM_MEMBERS.forEach(m => {
      repMap[m.name] = {
        name: m.name,
        role: m.role,
        avatar: m.avatar,
        color: m.color,
        leadsHandled: 0,
        qualified: 0,
        converted: 0,
        quotesSent: 0,
        dealsClosed: 0,
        revenueGenerated: 0
      };
    });

    // Ops Rep metrics
    const opsMap = {
      'Srishti Upadhyay': { name: 'Srishti Upadhyay', avatar: 'SU', ordersUpdated: 16, stagesCompleted: 11, pendingStages: 5, overdueOrders: 0, slaCompliance: 98.2 },
      'Nancy Singh': { name: 'Nancy Singh', avatar: 'NS', ordersUpdated: 6, stagesCompleted: 5, pendingStages: 1, overdueOrders: 0, slaCompliance: 97.4 },
      'Tannu Kumari': { name: 'Tannu Kumari', avatar: 'TK', ordersUpdated: 9, stagesCompleted: 8, pendingStages: 1, overdueOrders: 0, slaCompliance: 99.0 },
      'Gaurav Pant': { name: 'Gaurav Pant', avatar: 'GP', ordersUpdated: 7, stagesCompleted: 4, pendingStages: 2, overdueOrders: 1, slaCompliance: 92.5 },
    };

    // Orders per service stage
    const stageMap = {};
    SERVICES.forEach(s => {
      stageMap[s] = { service: s, completed: 0, inProgress: 0, pending: 0, onHold: 0 };
    });

    filteredLeads.forEach(lead => {
      const rep = repMap[lead.assignedTo];
      if (rep) {
        rep.leadsHandled += 1;
        if (lead.status === 'Qualified' || lead.status === 'Converted') rep.qualified += 1;
        if (lead.status === 'Converted') rep.converted += 1;
      }

      (lead.quotations || []).forEach(quo => {
        if (rep) rep.quotesSent += 1;
        (quo.deals || []).forEach(deal => {
          if (rep) {
            rep.dealsClosed += 1;
            rep.revenueGenerated += deal.dealValue || 0;
          }
          (deal.orders || []).forEach(order => {
            const st = stageMap[deal.service];
            if (st) {
              if (order.stage === 'Completed') st.completed += 1;
              else if (order.stage === 'In Progress') st.inProgress += 1;
              else if (order.stage === 'Pending') st.pending += 1;
              else if (order.stage === 'On Hold') st.onHold += 1;
            }
          });
        });
      });
    });

    const salesList = Object.values(repMap).map(r => ({
      ...r,
      conversionRate: r.leadsHandled > 0 ? (r.converted / r.leadsHandled) * 100 : 0
    })).sort((a, b) => b.revenueGenerated - a.revenueGenerated);

    return {
      salesRepActivity: salesList,
      opsRepActivity: Object.values(opsMap),
      serviceStageProgress: Object.values(stageMap)
    };
  }, [filteredLeads]);

  // Handle Export CSV simulation with real downloadable file
  const handleExportCSV = () => {
    if (filteredLeads.length === 0) {
      showToast('No records available to export.');
      return;
    }

    const exportRows = filteredLeads.map(l => {
      const quotedVal = (l.quotations || []).reduce((sum, q) => sum + (q.amount || 0), 0);
      const dealsCount = (l.quotations || []).reduce((sum, q) => sum + (q.deals || []).length, 0);
      const dealsVal = (l.quotations || []).reduce(
        (sum, q) => sum + (q.deals || []).reduce((dSum, d) => dSum + (d.dealValue || 0), 0),
        0
      );
      return {
        'Lead ID': l.id,
        'Client Name': l.name,
        'Company': l.company,
        'Email': l.email,
        'Phone': l.phone,
        'Source': l.source,
        'Status': l.status,
        'Assigned Rep': l.assignedTo,
        'Captured Date': l.date,
        'Total Quoted (INR)': quotedVal,
        'Deals Closed': dealsCount,
        'Deal Value (INR)': dealsVal
      };
    });

    exportToCSV(exportRows, `OmniPulse_Analytics_Export_${dateFilter.replace(/\s+/g, '_')}.csv`);
    showToast(`Successfully exported ${filteredLeads.length} records to CSV!`);
  };

  // Service drill-down handler
  const handleServiceDrillDown = (serviceName) => {
    // Find first matching lead offering this service
    const match = filteredLeads.find(l => 
      (l.quotations || []).some(q => q.serviceCategory === serviceName)
    );
    if (match) {
      setSelectedLead(match);
      setIsDrawerOpen(true);
    } else {
      showToast(`No active leads found for ${serviceName} in current view.`);
    }
  };

  const handleLeadSelect = (lead) => {
    setSelectedLead(lead);
    setIsDrawerOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900 pb-16">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-2.5 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-dropdown border border-slate-800 text-xs font-semibold animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Filter & Navigation Header */}
      <Header
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        customStartDate={customStartDate}
        setCustomStartDate={setCustomStartDate}
        customEndDate={customEndDate}
        setCustomEndDate={setCustomEndDate}
        selectedRep={selectedRep}
        setSelectedRep={setSelectedRep}
        selectedDept={selectedDept}
        setSelectedDept={setSelectedDept}
        onExport={handleExportCSV}
        isFiltered={isFiltered}
        onResetFilters={handleResetFilters}
        totalRecordsCount={filteredLeads.length}
      />

      {/* Main Dashboard Container */}
      <main className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-7 flex-1 w-full">
        
        {filteredLeads.length === 0 ? (
          <ZeroStateFallback onReset={handleResetFilters} />
        ) : (
          <>
            {/* Section 3.A: Top Metric KPI Row */}
            <section aria-label="Key Performance Indicators">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Real-Time Executive KPIs & Pipeline Velocity
                </h2>
                <span className="text-[11px] text-slate-400 font-medium">
                  Dynamic Comparison vs Previous 30-Day Period
                </span>
              </div>
              <MetricKpiRow kpis={kpiData} />
            </section>

            {/* Section 3.B: Lead Analytics Row */}
            <section aria-label="Lead Analytics">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Lead Funnel, Target Pacing & Attribution
                </h2>
              </div>
              <LeadAnalyticsRow
                targetData={targetData}
                funnelData={funnelData}
                dailyTrendData={dailyTrendData}
                sourceDistribution={sourceDistribution}
              />
            </section>

            {/* Section 3.C: Quotation Analytics Row */}
            <section aria-label="Quotation Analytics">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Quotation Pipeline & Win Rates
                </h2>
              </div>
              <QuotationAnalyticsRow
                quotationsByService={quotationsByService}
                quotationValueShare={quotationValueShare}
                serviceQuotationTable={serviceQuotationTable}
                overallQuoteConversion={overallQuoteConversion}
                onSelectServiceDrillDown={handleServiceDrillDown}
              />
            </section>

            {/* Section 3.D: Deals & Revenue Analytics */}
            <section aria-label="Deals and Revenue Analytics">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Revenue Realization & Deal Segmentation
                </h2>
              </div>
              <DealsRevenueAnalyticsRow
                dealsVsRevenueData={dealsVsRevenueData}
                priorityBreakdown={priorityBreakdown}
                dailyRevenueTrend={dailyRevenueTrend}
                revenueMetrics={revenueMetrics}
              />
            </section>

            {/* Section 3.E: Operational Execution & Team Logs */}
            <section aria-label="Operational Execution">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Operational Execution, SLA Compliance & CRM Audit
                </h2>
              </div>
              <OperationsExecutionRow
                salesRepActivity={salesRepActivity}
                opsRepActivity={opsRepActivity}
                serviceStageProgress={serviceStageProgress}
                recentActivities={MOCK_ACTIVITIES}
                onSelectRep={(repName) => {
                  setSelectedRep(repName);
                  showToast(`Filtered dashboard for ${repName}`);
                }}
              />
            </section>

            {/* Section: Complete Leads & Accounts Registry Table */}
            <section aria-label="Leads Registry">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Comprehensive Client Hierarchy Registry
                </h2>
              </div>
              <LeadsTable
                leads={filteredLeads}
                onSelectLead={handleLeadSelect}
              />
            </section>
          </>
        )}

      </main>

      {/* Slide-over Nested Hierarchy Drill-Down Drawer (Esc or backdrop to close) */}
      <DrillDownDrawer
        lead={selectedLead}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 mt-12 py-6 bg-white text-xs text-slate-500">
        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-800">VanguardPulse Analytics</span>
            <span>• Enterprise Corporate Dashboard v2.4</span>
          </div>
          <p className="text-slate-400">
            Real-time multi-dimensional aggregation across Leads, Quotations, Deals, Orders, and Payments.
          </p>
        </div>
      </footer>

    </div>
  );
}

# VanguardPulse - Business Performance & Revenue Analytics Dashboard

An executive, high-end corporate SaaS Business Performance & Revenue Analytics Dashboard built with **React**, **Tailwind CSS**, **Lucide React**, and **Recharts**.

![VanguardPulse Dashboard](https://img.shields.io/badge/Status-Production%20Ready-emerald)
![React](https://img.shields.io/badge/React-18-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-sky)
![Recharts](https://img.shields.io/badge/Recharts-2.15-purple)

---

## 🚀 Key Features

### 1. Hierarchical Relational Data Engine
- **30 Complete Enterprise Records** spanning October 1 to October 31, 2026.
- Enforces strict 5-tier nested relational hierarchy:
  $$\text{Lead} \longrightarrow \text{Quotations} \longrightarrow \text{Deals} \longrightarrow \text{Orders} \longrightarrow \text{Payments}$$
- **Services Covered**: Private Limited Company, LLP Registration, GST, Trademark, FSSAI, Annual Compliance, ISO Certification.
- **Lead Sources**: Google Ads, Website, Just Dial, Other.
- **Team Members**: Nancy Singh, Sneha Choudhary, Gaurav Pant, Tannu Kumari, Srishti Upadhyay.

### 2. Global Reactive Filters
- **Date Presets**: "Today", "Last 7 Days", "Last 30 Days", and "Custom Range" with custom date pickers.
- **Sales Rep Filter**: Filter by individual sales representative or view all.
- **Department Filter**: Filter by Department (Sales, Operations, Legal & Compliance, Finance).
- **Client-Side CSV Export**: Instant generation and download of filtered data with toast feedback.
- **Dynamic Comparative Period Deltas**: Automatically recalculates $\pm\%$ trends against baseline metrics with green/red pill badges.

### 3. Executive KPI & Analytics Rows
- **Top Metric KPI Row**: 8 real-time cards covering New Leads, Qualified Leads, Converted Leads, Unqualified Leads, Overall Conversion Rate %, Quotations Created, Deals Created, and Invoiced Revenue (₹ INR formatted).
- **Lead Analytics**:
  - Target Achievement card with pacing run rate.
  - Inverted stepped Funnel showing stage drop-offs.
  - Multi-line Daily Lead Trend chart.
  - Attribution donut chart with interactive pills.
- **Quotation Analytics**:
  - Service volume and value share bar charts.
  - Quote-to-deal win rate radial progress gauge.
  - Interactive service performance table with click-to-drilldown.
- **Deals & Revenue Analytics**:
  - Side-by-side metric cards (Total Deal Value vs Net Collected vs Outstanding).
  - Dual-axis volume vs value chart.
  - Daily cash collection trend bar chart.
  - Priority segmentation table (High, Medium, Low).
- **Operations & Execution**:
  - Sales team leaderboard (clicking a rep filters the entire dashboard).
  - Operations fulfillment SLA compliance table.
  - Stacked progress bars per service (Completed, In Progress, Pending, On Hold).
  - Live chronological CRM activity audit stream.

### 4. Interactive Slide-Over Drill-Down Drawer
- Clicking any row in the **Leads Registry** or **Service Performance Table** opens a slide-over drawer showing the complete nested hierarchy for that specific record:
  - Lead Contact & Company Information
  - Associated Quotation history with values and dates
  - Generated Deals with priority ratings
  - Order fulfillment status and assigned ops specialist
  - Payment tranche audit log (UPI, RTGS, Net Banking)
- Smooth backdrop transition, dismissible via `Esc` key or backdrop click.

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/sachingm1617-debug/Analytics-Dashboard.git

# Navigate to project directory
cd Analytics-Dashboard

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run preview
```

---

## 📄 License
MIT License.

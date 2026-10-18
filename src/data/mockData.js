/**
 * Mock Dataset for Business Performance & Revenue Analytics Dashboard
 * Spans October 1, 2026 to October 31, 2026.
 * Hierarchical Relational Schema:
 * Lead -> Quotations -> Deals -> Orders -> Payments
 */

export const TEAM_MEMBERS = [
  { name: 'Nancy Singh', role: 'Senior Sales Consultant', department: 'Sales', avatar: 'NS', color: 'bg-emerald-500' },
  { name: 'Sneha Choudhary', role: 'Enterprise Account Exec', department: 'Sales', avatar: 'SC', color: 'bg-blue-500' },
  { name: 'Gaurav Pant', role: 'Business Development Manager', department: 'Sales', avatar: 'GP', color: 'bg-violet-500' },
  { name: 'Tannu Kumari', role: 'Client Relations Associate', department: 'Sales', avatar: 'TK', color: 'bg-amber-500' },
  { name: 'Srishti Upadhyay', role: 'Operations & Legal Lead', department: 'Operations', avatar: 'SU', color: 'bg-rose-500' },
];

export const SERVICES = [
  'Private Limited Company',
  'LLP Registration',
  'GST',
  'Trademark',
  'FSSAI',
  'Annual Compliance',
  'ISO Certification',
];

export const LEAD_SOURCES = ['Google Ads', 'Website', 'Just Dial', 'Other'];

export const DEPARTMENTS = ['All Departments', 'Sales', 'Operations', 'Legal & Compliance', 'Finance'];

export const MONTHLY_TARGET = 8500000; // ₹85,00,000 (85 Lakhs INR)

export const MOCK_LEADS = [
  {
    id: 'LEAD-1001',
    name: 'Aarav Sharma',
    company: 'Nexora Infotech Solutions Pvt Ltd',
    email: 'aarav.sharma@nexora.io',
    phone: '+91 98201 44521',
    source: 'Google Ads',
    status: 'Converted',
    date: '2026-10-02',
    assignedTo: 'Nancy Singh',
    department: 'Sales',
    notes: 'Fast-growing SaaS startup expanding to Singapore and domestic expansion.',
    quotations: [
      {
        id: 'QUO-801',
        serviceCategory: 'Private Limited Company',
        amount: 28000,
        status: 'Accepted',
        date: '2026-10-03',
        deals: [
          {
            id: 'DEAL-501',
            service: 'Private Limited Company',
            dealValue: 28000,
            priority: 'High',
            status: 'Won',
            date: '2026-10-04',
            orders: [
              {
                id: 'ORD-301',
                stage: 'Completed',
                amount: 28000,
                assignedOps: 'Srishti Upadhyay',
                payments: [
                  { id: 'PAY-101', amount: 28000, status: 'Collected', date: '2026-10-04', method: 'UPI' }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'QUO-802',
        serviceCategory: 'Annual Compliance',
        amount: 65000,
        status: 'Accepted',
        date: '2026-10-06',
        deals: [
          {
            id: 'DEAL-502',
            service: 'Annual Compliance',
            dealValue: 65000,
            priority: 'Medium',
            status: 'Won',
            date: '2026-10-07',
            orders: [
              {
                id: 'ORD-302',
                stage: 'In Progress',
                amount: 65000,
                assignedOps: 'Gaurav Pant',
                payments: [
                  { id: 'PAY-102', amount: 35000, status: 'Collected', date: '2026-10-08', method: 'Net Banking' },
                  { id: 'PAY-103', amount: 30000, status: 'Pending', date: '2026-10-25', method: 'Pending' }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'LEAD-1002',
    name: 'Pooja Iyer',
    company: 'Zenith BioLabs LLP',
    email: 'pooja.i@zenithbiolabs.in',
    phone: '+91 97412 88902',
    source: 'Website',
    status: 'Converted',
    date: '2026-10-03',
    assignedTo: 'Sneha Choudhary',
    department: 'Sales',
    notes: 'Pharma diagnostic laboratory requiring LLP and FSSAI licenses.',
    quotations: [
      {
        id: 'QUO-803',
        serviceCategory: 'LLP Registration',
        amount: 22000,
        status: 'Accepted',
        date: '2026-10-04',
        deals: [
          {
            id: 'DEAL-503',
            service: 'LLP Registration',
            dealValue: 22000,
            priority: 'High',
            status: 'Won',
            date: '2026-10-05',
            orders: [
              {
                id: 'ORD-303',
                stage: 'Completed',
                amount: 22000,
                assignedOps: 'Tannu Kumari',
                payments: [
                  { id: 'PAY-104', amount: 22000, status: 'Collected', date: '2026-10-05', method: 'NEFT' }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'QUO-804',
        serviceCategory: 'FSSAI',
        amount: 32000,
        status: 'Accepted',
        date: '2026-10-08',
        deals: [
          {
            id: 'DEAL-504',
            service: 'FSSAI',
            dealValue: 32000,
            priority: 'Medium',
            status: 'Won',
            date: '2026-10-09',
            orders: [
              {
                id: 'ORD-304',
                stage: 'In Progress',
                amount: 32000,
                assignedOps: 'Srishti Upadhyay',
                payments: [
                  { id: 'PAY-105', amount: 20000, status: 'Collected', date: '2026-10-10', method: 'UPI' },
                  { id: 'PAY-106', amount: 12000, status: 'Pending', date: '2026-10-28', method: 'Pending' }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'LEAD-1003',
    name: 'Vikramaditya Rathore',
    company: 'Rajputana Heritage Exports',
    email: 'vikram@rajputanacrafts.com',
    phone: '+91 94140 12890',
    source: 'Just Dial',
    status: 'Converted',
    date: '2026-10-04',
    assignedTo: 'Gaurav Pant',
    department: 'Sales',
    notes: 'Handicraft exporter needing Trademark & ISO Certification for European export standards.',
    quotations: [
      {
        id: 'QUO-805',
        serviceCategory: 'ISO Certification',
        amount: 115000,
        status: 'Accepted',
        date: '2026-10-06',
        deals: [
          {
            id: 'DEAL-505',
            service: 'ISO Certification',
            dealValue: 115000,
            priority: 'High',
            status: 'Won',
            date: '2026-10-07',
            orders: [
              {
                id: 'ORD-305',
                stage: 'In Progress',
                amount: 115000,
                assignedOps: 'Srishti Upadhyay',
                payments: [
                  { id: 'PAY-107', amount: 60000, status: 'Collected', date: '2026-10-08', method: 'RTGS' },
                  { id: 'PAY-108', amount: 55000, status: 'Pending', date: '2026-10-30', method: 'Pending' }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'QUO-806',
        serviceCategory: 'Trademark',
        amount: 16000,
        status: 'Accepted',
        date: '2026-10-07',
        deals: [
          {
            id: 'DEAL-506',
            service: 'Trademark',
            dealValue: 16000,
            priority: 'Medium',
            status: 'Won',
            date: '2026-10-08',
            orders: [
              {
                id: 'ORD-306',
                stage: 'Completed',
                amount: 16000,
                assignedOps: 'Tannu Kumari',
                payments: [
                  { id: 'PAY-109', amount: 16000, status: 'Collected', date: '2026-10-08', method: 'Credit Card' }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'LEAD-1004',
    name: 'Meera Chidambaram',
    company: 'Aura Health & Nutrition',
    email: 'm.chidambaram@auranutri.co',
    phone: '+91 98450 77123',
    source: 'Google Ads',
    status: 'Qualified',
    date: '2026-10-05',
    assignedTo: 'Tannu Kumari',
    department: 'Sales',
    notes: 'D2C food brand launching functional superfoods across quick-commerce apps.',
    quotations: [
      {
        id: 'QUO-807',
        serviceCategory: 'FSSAI',
        amount: 38000,
        status: 'Pending',
        date: '2026-10-06',
        deals: [
          {
            id: 'DEAL-507',
            service: 'FSSAI',
            dealValue: 38000,
            priority: 'High',
            status: 'Negotiation',
            date: '2026-10-08',
            orders: [
              {
                id: 'ORD-307',
                stage: 'Pending',
                amount: 38000,
                assignedOps: 'Gaurav Pant',
                payments: [
                  { id: 'PAY-110', amount: 38000, status: 'Pending', date: '2026-10-20', method: 'Pending' }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'LEAD-1005',
    name: 'Rohan Deshmukh',
    company: 'Vanguard Industrial Automations',
    email: 'rohan@vanguardauto.in',
    phone: '+91 98220 54109',
    source: 'Website',
    status: 'Converted',
    date: '2026-10-06',
    assignedTo: 'Nancy Singh',
    department: 'Sales',
    notes: 'Industrial robotics manufacturer requiring annual statutory audits and GST advisory.',
    quotations: [
      {
        id: 'QUO-808',
        serviceCategory: 'Annual Compliance',
        amount: 88000,
        status: 'Accepted',
        date: '2026-10-07',
        deals: [
          {
            id: 'DEAL-508',
            service: 'Annual Compliance',
            dealValue: 88000,
            priority: 'High',
            status: 'Won',
            date: '2026-10-08',
            orders: [
              {
                id: 'ORD-308',
                stage: 'In Progress',
                amount: 88000,
                assignedOps: 'Srishti Upadhyay',
                payments: [
                  { id: 'PAY-111', amount: 50000, status: 'Collected', date: '2026-10-09', method: 'RTGS' },
                  { id: 'PAY-112', amount: 38000, status: 'Pending', date: '2026-10-29', method: 'Pending' }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'QUO-809',
        serviceCategory: 'GST',
        amount: 14000,
        status: 'Accepted',
        date: '2026-10-09',
        deals: [
          {
            id: 'DEAL-509',
            service: 'GST',
            dealValue: 14000,
            priority: 'Low',
            status: 'Won',
            date: '2026-10-10',
            orders: [
              {
                id: 'ORD-309',
                stage: 'Completed',
                amount: 14000,
                assignedOps: 'Tannu Kumari',
                payments: [
                  { id: 'PAY-113', amount: 14000, status: 'Collected', date: '2026-10-10', method: 'UPI' }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'LEAD-1006',
    name: 'Kavita Menon',
    company: 'Malabar Artisan Spices',
    email: 'kavita@malabarspices.com',
    phone: '+91 94471 99002',
    source: 'Other',
    status: 'Unqualified',
    date: '2026-10-07',
    assignedTo: 'Sneha Choudhary',
    department: 'Sales',
    notes: 'Budget mismatch, seeking free consultancy.',
    quotations: [
      {
        id: 'QUO-810',
        serviceCategory: 'FSSAI',
        amount: 25000,
        status: 'Rejected',
        date: '2026-10-08',
        deals: []
      }
    ]
  },
  {
    id: 'LEAD-1007',
    name: 'Ananya Roy',
    company: 'BlueWave Digital Media LLP',
    email: 'ananya@bluewave.agency',
    phone: '+91 98300 45892',
    source: 'Google Ads',
    status: 'Converted',
    date: '2026-10-08',
    assignedTo: 'Gaurav Pant',
    department: 'Sales',
    notes: 'Performance marketing agency in Kolkata with 40+ staff.',
    quotations: [
      {
        id: 'QUO-811',
        serviceCategory: 'LLP Registration',
        amount: 24000,
        status: 'Accepted',
        date: '2026-10-09',
        deals: [
          {
            id: 'DEAL-510',
            service: 'LLP Registration',
            dealValue: 24000,
            priority: 'Medium',
            status: 'Won',
            date: '2026-10-10',
            orders: [
              {
                id: 'ORD-310',
                stage: 'Completed',
                amount: 24000,
                assignedOps: 'Nancy Singh',
                payments: [
                  { id: 'PAY-114', amount: 24000, status: 'Collected', date: '2026-10-10', method: 'Net Banking' }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'QUO-812',
        serviceCategory: 'Trademark',
        amount: 18000,
        status: 'Accepted',
        date: '2026-10-11',
        deals: [
          {
            id: 'DEAL-511',
            service: 'Trademark',
            dealValue: 18000,
            priority: 'Medium',
            status: 'Won',
            date: '2026-10-12',
            orders: [
              {
                id: 'ORD-311',
                stage: 'In Progress',
                amount: 18000,
                assignedOps: 'Tannu Kumari',
                payments: [
                  { id: 'PAY-115', amount: 18000, status: 'Collected', date: '2026-10-12', method: 'UPI' }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'LEAD-1008',
    name: 'Siddharth Varma',
    company: 'Krypton Quantum Robotics',
    email: 'siddharth@kryptonrobotics.tech',
    phone: '+91 99801 88102',
    source: 'Website',
    status: 'Converted',
    date: '2026-10-09',
    assignedTo: 'Sneha Choudhary',
    department: 'Sales',
    notes: 'Deep tech hardware team raising Series A.',
    quotations: [
      {
        id: 'QUO-813',
        serviceCategory: 'Private Limited Company',
        amount: 35000,
        status: 'Accepted',
        date: '2026-10-10',
        deals: [
          {
            id: 'DEAL-512',
            service: 'Private Limited Company',
            dealValue: 35000,
            priority: 'High',
            status: 'Won',
            date: '2026-10-11',
            orders: [
              {
                id: 'ORD-312',
                stage: 'Completed',
                amount: 35000,
                assignedOps: 'Srishti Upadhyay',
                payments: [
                  { id: 'PAY-116', amount: 35000, status: 'Collected', date: '2026-10-11', method: 'Debit Card' }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'QUO-814',
        serviceCategory: 'ISO Certification',
        amount: 145000,
        status: 'Accepted',
        date: '2026-10-12',
        deals: [
          {
            id: 'DEAL-513',
            service: 'ISO Certification',
            dealValue: 145000,
            priority: 'High',
            status: 'Won',
            date: '2026-10-13',
            orders: [
              {
                id: 'ORD-313',
                stage: 'In Progress',
                amount: 145000,
                assignedOps: 'Srishti Upadhyay',
                payments: [
                  { id: 'PAY-117', amount: 80000, status: 'Collected', date: '2026-10-14', method: 'RTGS' },
                  { id: 'PAY-118', amount: 65000, status: 'Pending', date: '2026-10-31', method: 'Pending' }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'LEAD-1009',
    name: 'Harish Kalyan',
    company: 'GreenRoot Agro Fresh Ltd',
    email: 'harish@greenrootagro.in',
    phone: '+91 96001 22894',
    source: 'Just Dial',
    status: 'Qualified',
    date: '2026-10-10',
    assignedTo: 'Tannu Kumari',
    department: 'Sales',
    notes: 'Organic hydroponic farm looking for state and central FSSAI registration.',
    quotations: [
      {
        id: 'QUO-815',
        serviceCategory: 'FSSAI',
        amount: 36000,
        status: 'Accepted',
        date: '2026-10-11',
        deals: [
          {
            id: 'DEAL-514',
            service: 'FSSAI',
            dealValue: 36000,
            priority: 'Medium',
            status: 'Won',
            date: '2026-10-12',
            orders: [
              {
                id: 'ORD-314',
                stage: 'In Progress',
                amount: 36000,
                assignedOps: 'Gaurav Pant',
                payments: [
                  { id: 'PAY-119', amount: 20000, status: 'Collected', date: '2026-10-13', method: 'UPI' },
                  { id: 'PAY-120', amount: 16000, status: 'Pending', date: '2026-10-27', method: 'Pending' }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'LEAD-1010',
    name: 'Divya Nambiar',
    company: 'Kochi Cloud Kitchens',
    email: 'divya@kochikitchens.com',
    phone: '+91 94950 33810',
    source: 'Google Ads',
    status: 'New',
    date: '2026-10-11',
    assignedTo: 'Nancy Singh',
    department: 'Sales',
    notes: 'Requested quotation for multiple brand trademarks.',
    quotations: [
      {
        id: 'QUO-816',
        serviceCategory: 'Trademark',
        amount: 22000,
        status: 'Pending',
        date: '2026-10-12',
        deals: []
      }
    ]
  },
  {
    id: 'LEAD-1011',
    name: 'Tarun Khanna',
    company: 'Apex Logistics Freight Forwarders',
    email: 'tarun@apexlogistics.in',
    phone: '+91 98110 99420',
    source: 'Website',
    status: 'Converted',
    date: '2026-10-12',
    assignedTo: 'Gaurav Pant',
    department: 'Sales',
    notes: 'Pan-India trucking fleet operator.',
    quotations: [
      {
        id: 'QUO-817',
        serviceCategory: 'GST',
        amount: 16000,
        status: 'Accepted',
        date: '2026-10-13',
        deals: [
          {
            id: 'DEAL-515',
            service: 'GST',
            dealValue: 16000,
            priority: 'Medium',
            status: 'Won',
            date: '2026-10-14',
            orders: [
              {
                id: 'ORD-315',
                stage: 'Completed',
                amount: 16000,
                assignedOps: 'Srishti Upadhyay',
                payments: [
                  { id: 'PAY-121', amount: 16000, status: 'Collected', date: '2026-10-14', method: 'Net Banking' }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'QUO-818',
        serviceCategory: 'Annual Compliance',
        amount: 92000,
        status: 'Accepted',
        date: '2026-10-14',
        deals: [
          {
            id: 'DEAL-516',
            service: 'Annual Compliance',
            dealValue: 92000,
            priority: 'High',
            status: 'Won',
            date: '2026-10-15',
            orders: [
              {
                id: 'ORD-316',
                stage: 'In Progress',
                amount: 92000,
                assignedOps: 'Nancy Singh',
                payments: [
                  { id: 'PAY-122', amount: 50000, status: 'Collected', date: '2026-10-16', method: 'RTGS' },
                  { id: 'PAY-123', amount: 42000, status: 'Pending', date: '2026-10-28', method: 'Pending' }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'LEAD-1012',
    name: 'Pallavi Sengupta',
    company: 'Sengupta Heritage Fabrics',
    email: 'pallavi@senguptafabrics.in',
    phone: '+91 98311 00293',
    source: 'Other',
    status: 'Unqualified',
    date: '2026-10-13',
    assignedTo: 'Tannu Kumari',
    department: 'Sales',
    notes: 'Looking for micro-subsidy loan assistance instead of legal compliance.',
    quotations: []
  },
  {
    id: 'LEAD-1013',
    name: 'Manish Agarwal',
    company: 'Quantum Microfinance Technologies',
    email: 'manish.a@quantummicro.in',
    phone: '+91 97110 44589',
    source: 'Google Ads',
    status: 'Converted',
    date: '2026-10-14',
    assignedTo: 'Sneha Choudhary',
    department: 'Sales',
    notes: 'NBFC applicant needing extensive ISO 27001 and company incorporation advisory.',
    quotations: [
      {
        id: 'QUO-819',
        serviceCategory: 'Private Limited Company',
        amount: 32000,
        status: 'Accepted',
        date: '2026-10-15',
        deals: [
          {
            id: 'DEAL-517',
            service: 'Private Limited Company',
            dealValue: 32000,
            priority: 'High',
            status: 'Won',
            date: '2026-10-15',
            orders: [
              {
                id: 'ORD-317',
                stage: 'Completed',
                amount: 32000,
                assignedOps: 'Srishti Upadhyay',
                payments: [
                  { id: 'PAY-124', amount: 32000, status: 'Collected', date: '2026-10-15', method: 'UPI' }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'QUO-820',
        serviceCategory: 'ISO Certification',
        amount: 160000,
        status: 'Accepted',
        date: '2026-10-16',
        deals: [
          {
            id: 'DEAL-518',
            service: 'ISO Certification',
            dealValue: 160000,
            priority: 'High',
            status: 'Won',
            date: '2026-10-17',
            orders: [
              {
                id: 'ORD-318',
                stage: 'In Progress',
                amount: 160000,
                assignedOps: 'Gaurav Pant',
                payments: [
                  { id: 'PAY-125', amount: 100000, status: 'Collected', date: '2026-10-17', method: 'RTGS' },
                  { id: 'PAY-126', amount: 60000, status: 'Pending', date: '2026-10-30', method: 'Pending' }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'LEAD-1014',
    name: 'Ishaan Malhotra',
    company: 'SkyRoute Drones Pvt Ltd',
    email: 'ishaan@skyroutedrones.com',
    phone: '+91 99100 88219',
    source: 'Website',
    status: 'Converted',
    date: '2026-10-15',
    assignedTo: 'Nancy Singh',
    department: 'Sales',
    notes: 'Drone delivery startup with DGCA permissions.',
    quotations: [
      {
        id: 'QUO-821',
        serviceCategory: 'Private Limited Company',
        amount: 29000,
        status: 'Accepted',
        date: '2026-10-16',
        deals: [
          {
            id: 'DEAL-519',
            service: 'Private Limited Company',
            dealValue: 29000,
            priority: 'High',
            status: 'Won',
            date: '2026-10-16',
            orders: [
              {
                id: 'ORD-319',
                stage: 'Completed',
                amount: 29000,
                assignedOps: 'Tannu Kumari',
                payments: [
                  { id: 'PAY-127', amount: 29000, status: 'Collected', date: '2026-10-16', method: 'UPI' }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'QUO-822',
        serviceCategory: 'Trademark',
        amount: 19000,
        status: 'Accepted',
        date: '2026-10-17',
        deals: [
          {
            id: 'DEAL-520',
            service: 'Trademark',
            dealValue: 19000,
            priority: 'Medium',
            status: 'Won',
            date: '2026-10-18',
            orders: [
              {
                id: 'ORD-320',
                stage: 'In Progress',
                amount: 19000,
                assignedOps: 'Srishti Upadhyay',
                payments: [
                  { id: 'PAY-128', amount: 19000, status: 'Collected', date: '2026-10-18', method: 'Net Banking' }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'LEAD-1015',
    name: 'Bhavna Kulkarni',
    company: 'Sahyadri Specialty Roasters',
    email: 'bhavna@sahyadricooffee.in',
    phone: '+91 98230 77102',
    source: 'Just Dial',
    status: 'Converted',
    date: '2026-10-16',
    assignedTo: 'Gaurav Pant',
    department: 'Sales',
    notes: 'Estate artisanal coffee roastery.',
    quotations: [
      {
        id: 'QUO-823',
        serviceCategory: 'LLP Registration',
        amount: 21000,
        status: 'Accepted',
        date: '2026-10-17',
        deals: [
          {
            id: 'DEAL-521',
            service: 'LLP Registration',
            dealValue: 21000,
            priority: 'Low',
            status: 'Won',
            date: '2026-10-17',
            orders: [
              {
                id: 'ORD-321',
                stage: 'Completed',
                amount: 21000,
                assignedOps: 'Tannu Kumari',
                payments: [
                  { id: 'PAY-129', amount: 21000, status: 'Collected', date: '2026-10-17', method: 'UPI' }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'QUO-824',
        serviceCategory: 'FSSAI',
        amount: 28000,
        status: 'Accepted',
        date: '2026-10-18',
        deals: [
          {
            id: 'DEAL-522',
            service: 'FSSAI',
            dealValue: 28000,
            priority: 'Medium',
            status: 'Won',
            date: '2026-10-18',
            orders: [
              {
                id: 'ORD-322',
                stage: 'In Progress',
                amount: 28000,
                assignedOps: 'Srishti Upadhyay',
                payments: [
                  { id: 'PAY-130', amount: 15000, status: 'Collected', date: '2026-10-18', method: 'UPI' },
                  { id: 'PAY-131', amount: 13000, status: 'Pending', date: '2026-10-26', method: 'Pending' }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'LEAD-1016',
    name: 'Kunal Singhal',
    company: 'Singhal Steel Forgeings',
    email: 'kunal@singhalforge.com',
    phone: '+91 98101 22901',
    source: 'Google Ads',
    status: 'Converted',
    date: '2026-10-17',
    assignedTo: 'Sneha Choudhary',
    department: 'Sales',
    notes: 'Heavy automotive equipment manufacturer in Faridabad.',
    quotations: [
      {
        id: 'QUO-825',
        serviceCategory: 'ISO Certification',
        amount: 180000,
        status: 'Accepted',
        date: '2026-10-18',
        deals: [
          {
            id: 'DEAL-523',
            service: 'ISO Certification',
            dealValue: 180000,
            priority: 'High',
            status: 'Won',
            date: '2026-10-18',
            orders: [
              {
                id: 'ORD-323',
                stage: 'In Progress',
                amount: 180000,
                assignedOps: 'Srishti Upadhyay',
                payments: [
                  { id: 'PAY-132', amount: 120000, status: 'Collected', date: '2026-10-18', method: 'RTGS' },
                  { id: 'PAY-133', amount: 60000, status: 'Pending', date: '2026-10-29', method: 'Pending' }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'LEAD-1017',
    name: 'Nandini Joshi',
    company: 'Vedic Wellness Botanicals',
    email: 'nandini@vedicwellness.co',
    phone: '+91 98200 66512',
    source: 'Website',
    status: 'Qualified',
    date: '2026-10-18',
    assignedTo: 'Tannu Kumari',
    department: 'Sales',
    notes: 'Ayush and organic cosmetic compliance documentation.',
    quotations: [
      {
        id: 'QUO-826',
        serviceCategory: 'FSSAI',
        amount: 34000,
        status: 'Accepted',
        date: '2026-10-18',
        deals: [
          {
            id: 'DEAL-524',
            service: 'FSSAI',
            dealValue: 34000,
            priority: 'Medium',
            status: 'Won',
            date: '2026-10-18',
            orders: [
              {
                id: 'ORD-324',
                stage: 'Pending',
                amount: 34000,
                assignedOps: 'Gaurav Pant',
                payments: [
                  { id: 'PAY-134', amount: 20000, status: 'Collected', date: '2026-10-18', method: 'UPI' },
                  { id: 'PAY-135', amount: 14000, status: 'Pending', date: '2026-10-26', method: 'Pending' }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'QUO-827',
        serviceCategory: 'Trademark',
        amount: 17000,
        status: 'Pending',
        date: '2026-10-18',
        deals: []
      }
    ]
  },
  {
    id: 'LEAD-1018',
    name: 'Girish Patnaik',
    company: 'Kalinga Marine Cold Storage',
    email: 'girish@kalingamarine.in',
    phone: '+91 94370 11982',
    source: 'Just Dial',
    status: 'New',
    date: '2026-10-19',
    assignedTo: 'Nancy Singh',
    department: 'Sales',
    notes: 'Seafood export processing plant in Paradip.',
    quotations: [
      {
        id: 'QUO-828',
        serviceCategory: 'Annual Compliance',
        amount: 75000,
        status: 'Pending',
        date: '2026-10-20',
        deals: []
      }
    ]
  },
  {
    id: 'LEAD-1019',
    name: 'Ritika Poddar',
    company: 'FinEdge Advisory Partners',
    email: 'ritika@finedge.in',
    phone: '+91 98305 99120',
    source: 'Google Ads',
    status: 'Converted',
    date: '2026-10-20',
    assignedTo: 'Gaurav Pant',
    department: 'Sales',
    notes: 'Wealth management boutique firm.',
    quotations: [
      {
        id: 'QUO-829',
        serviceCategory: 'LLP Registration',
        amount: 25000,
        status: 'Accepted',
        date: '2026-10-21',
        deals: [
          {
            id: 'DEAL-525',
            service: 'LLP Registration',
            dealValue: 25000,
            priority: 'Medium',
            status: 'Won',
            date: '2026-10-21',
            orders: [
              {
                id: 'ORD-325',
                stage: 'Completed',
                amount: 25000,
                assignedOps: 'Srishti Upadhyay',
                payments: [
                  { id: 'PAY-136', amount: 25000, status: 'Collected', date: '2026-10-21', method: 'UPI' }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'QUO-830',
        serviceCategory: 'GST',
        amount: 15000,
        status: 'Accepted',
        date: '2026-10-22',
        deals: [
          {
            id: 'DEAL-526',
            service: 'GST',
            dealValue: 15000,
            priority: 'Low',
            status: 'Won',
            date: '2026-10-22',
            orders: [
              {
                id: 'ORD-326',
                stage: 'In Progress',
                amount: 15000,
                assignedOps: 'Tannu Kumari',
                payments: [
                  { id: 'PAY-137', amount: 15000, status: 'Collected', date: '2026-10-22', method: 'Debit Card' }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'LEAD-1020',
    name: 'Aditya Birla-Roy',
    company: 'Solaria Clean Energy Systems',
    email: 'aditya@solariaclean.tech',
    phone: '+91 99200 44019',
    source: 'Website',
    status: 'Converted',
    date: '2026-10-21',
    assignedTo: 'Sneha Choudhary',
    department: 'Sales',
    notes: 'Rooftop solar installer requiring ISO and Private Ltd registration.',
    quotations: [
      {
        id: 'QUO-831',
        serviceCategory: 'Private Limited Company',
        amount: 32000,
        status: 'Accepted',
        date: '2026-10-22',
        deals: [
          {
            id: 'DEAL-527',
            service: 'Private Limited Company',
            dealValue: 32000,
            priority: 'High',
            status: 'Won',
            date: '2026-10-23',
            orders: [
              {
                id: 'ORD-327',
                stage: 'Completed',
                amount: 32000,
                assignedOps: 'Nancy Singh',
                payments: [
                  { id: 'PAY-138', amount: 32000, status: 'Collected', date: '2026-10-23', method: 'UPI' }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'QUO-832',
        serviceCategory: 'ISO Certification',
        amount: 130000,
        status: 'Accepted',
        date: '2026-10-23',
        deals: [
          {
            id: 'DEAL-528',
            service: 'ISO Certification',
            dealValue: 130000,
            priority: 'High',
            status: 'Won',
            date: '2026-10-24',
            orders: [
              {
                id: 'ORD-328',
                stage: 'In Progress',
                amount: 130000,
                assignedOps: 'Srishti Upadhyay',
                payments: [
                  { id: 'PAY-139', amount: 80000, status: 'Collected', date: '2026-10-24', method: 'RTGS' },
                  { id: 'PAY-140', amount: 50000, status: 'Pending', date: '2026-10-31', method: 'Pending' }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'LEAD-1021',
    name: 'Deepak Sethi',
    company: 'Sethi Precision Tools',
    email: 'deepak@sethitools.co.in',
    phone: '+91 98140 33812',
    source: 'Other',
    status: 'Qualified',
    date: '2026-10-22',
    assignedTo: 'Tannu Kumari',
    department: 'Sales',
    notes: 'CNC tooling facility in Ludhiana.',
    quotations: [
      {
        id: 'QUO-833',
        serviceCategory: 'GST',
        amount: 18000,
        status: 'Accepted',
        date: '2026-10-23',
        deals: [
          {
            id: 'DEAL-529',
            service: 'GST',
            dealValue: 18000,
            priority: 'Medium',
            status: 'Won',
            date: '2026-10-24',
            orders: [
              {
                id: 'ORD-329',
                stage: 'In Progress',
                amount: 18000,
                assignedOps: 'Gaurav Pant',
                payments: [
                  { id: 'PAY-141', amount: 18000, status: 'Collected', date: '2026-10-24', method: 'UPI' }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'LEAD-1022',
    name: 'Anupam Trivedi',
    company: 'CyberShield InfoSec',
    email: 'anupam@cybershield.in',
    phone: '+91 97240 66190',
    source: 'Google Ads',
    status: 'Converted',
    date: '2026-10-23',
    assignedTo: 'Nancy Singh',
    department: 'Sales',
    notes: 'SOC 2 and ISO compliance requirement for enterprise BFSI clients.',
    quotations: [
      {
        id: 'QUO-834',
        serviceCategory: 'ISO Certification',
        amount: 175000,
        status: 'Accepted',
        date: '2026-10-24',
        deals: [
          {
            id: 'DEAL-530',
            service: 'ISO Certification',
            dealValue: 175000,
            priority: 'High',
            status: 'Won',
            date: '2026-10-25',
            orders: [
              {
                id: 'ORD-330',
                stage: 'In Progress',
                amount: 175000,
                assignedOps: 'Srishti Upadhyay',
                payments: [
                  { id: 'PAY-142', amount: 100000, status: 'Collected', date: '2026-10-25', method: 'RTGS' },
                  { id: 'PAY-143', amount: 75000, status: 'Pending', date: '2026-10-31', method: 'Pending' }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'QUO-835',
        serviceCategory: 'Trademark',
        amount: 21000,
        status: 'Accepted',
        date: '2026-10-25',
        deals: [
          {
            id: 'DEAL-531',
            service: 'Trademark',
            dealValue: 21000,
            priority: 'Medium',
            status: 'Won',
            date: '2026-10-26',
            orders: [
              {
                id: 'ORD-331',
                stage: 'Completed',
                amount: 21000,
                assignedOps: 'Tannu Kumari',
                payments: [
                  { id: 'PAY-144', amount: 21000, status: 'Collected', date: '2026-10-26', method: 'UPI' }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'LEAD-1023',
    name: 'Zoya Qureshi',
    company: 'Artisan Bakery Co',
    email: 'zoya@artisanbakery.com',
    phone: '+91 98210 11294',
    source: 'Website',
    status: 'New',
    date: '2026-10-24',
    assignedTo: 'Sneha Choudhary',
    department: 'Sales',
    notes: 'Bakery chain needing FSSAI license and packaging review.',
    quotations: [
      {
        id: 'QUO-836',
        serviceCategory: 'FSSAI',
        amount: 30000,
        status: 'Pending',
        date: '2026-10-25',
        deals: []
      }
    ]
  },
  {
    id: 'LEAD-1024',
    name: 'Karthik Raja',
    company: 'Coromandel Agritech Solutions',
    email: 'karthik@coromandelagri.com',
    phone: '+91 94440 22391',
    source: 'Google Ads',
    status: 'Converted',
    date: '2026-10-25',
    assignedTo: 'Gaurav Pant',
    department: 'Sales',
    notes: 'Satellite soil sensors company.',
    quotations: [
      {
        id: 'QUO-837',
        serviceCategory: 'Private Limited Company',
        amount: 34000,
        status: 'Accepted',
        date: '2026-10-26',
        deals: [
          {
            id: 'DEAL-532',
            service: 'Private Limited Company',
            dealValue: 34000,
            priority: 'High',
            status: 'Won',
            date: '2026-10-26',
            orders: [
              {
                id: 'ORD-332',
                stage: 'Completed',
                amount: 34000,
                assignedOps: 'Nancy Singh',
                payments: [
                  { id: 'PAY-145', amount: 34000, status: 'Collected', date: '2026-10-26', method: 'UPI' }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'QUO-838',
        serviceCategory: 'Annual Compliance',
        amount: 82000,
        status: 'Accepted',
        date: '2026-10-27',
        deals: [
          {
            id: 'DEAL-533',
            service: 'Annual Compliance',
            dealValue: 82000,
            priority: 'High',
            status: 'Won',
            date: '2026-10-27',
            orders: [
              {
                id: 'ORD-333',
                stage: 'In Progress',
                amount: 82000,
                assignedOps: 'Srishti Upadhyay',
                payments: [
                  { id: 'PAY-146', amount: 45000, status: 'Collected', date: '2026-10-28', method: 'RTGS' },
                  { id: 'PAY-147', amount: 37000, status: 'Pending', date: '2026-10-31', method: 'Pending' }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'LEAD-1025',
    name: 'Esha Mukherjee',
    company: 'Eastwind Creative Studios',
    email: 'esha@eastwindcreatives.in',
    phone: '+91 98319 88102',
    source: 'Website',
    status: 'Converted',
    date: '2026-10-26',
    assignedTo: 'Tannu Kumari',
    department: 'Sales',
    notes: 'Animation and gaming production firm.',
    quotations: [
      {
        id: 'QUO-839',
        serviceCategory: 'LLP Registration',
        amount: 23000,
        status: 'Accepted',
        date: '2026-10-27',
        deals: [
          {
            id: 'DEAL-534',
            service: 'LLP Registration',
            dealValue: 23000,
            priority: 'Medium',
            status: 'Won',
            date: '2026-10-27',
            orders: [
              {
                id: 'ORD-334',
                stage: 'Completed',
                amount: 23000,
                assignedOps: 'Nancy Singh',
                payments: [
                  { id: 'PAY-148', amount: 23000, status: 'Collected', date: '2026-10-27', method: 'UPI' }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'QUO-840',
        serviceCategory: 'Trademark',
        amount: 18000,
        status: 'Accepted',
        date: '2026-10-28',
        deals: [
          {
            id: 'DEAL-535',
            service: 'Trademark',
            dealValue: 18000,
            priority: 'Low',
            status: 'Won',
            date: '2026-10-28',
            orders: [
              {
                id: 'ORD-335',
                stage: 'In Progress',
                amount: 18000,
                assignedOps: 'Tannu Kumari',
                payments: [
                  { id: 'PAY-149', amount: 18000, status: 'Collected', date: '2026-10-28', method: 'Net Banking' }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'LEAD-1026',
    name: 'Pradeep Chawla',
    company: 'Chawla Coldchain Logistics',
    email: 'pradeep@chawlacoldchain.com',
    phone: '+91 98118 77203',
    source: 'Just Dial',
    status: 'Converted',
    date: '2026-10-27',
    assignedTo: 'Nancy Singh',
    department: 'Sales',
    notes: 'Pharma refrigerated transport services.',
    quotations: [
      {
        id: 'QUO-841',
        serviceCategory: 'Annual Compliance',
        amount: 85000,
        status: 'Accepted',
        date: '2026-10-28',
        deals: [
          {
            id: 'DEAL-536',
            service: 'Annual Compliance',
            dealValue: 85000,
            priority: 'High',
            status: 'Won',
            date: '2026-10-28',
            orders: [
              {
                id: 'ORD-336',
                stage: 'In Progress',
                amount: 85000,
                assignedOps: 'Srishti Upadhyay',
                payments: [
                  { id: 'PAY-150', amount: 50000, status: 'Collected', date: '2026-10-29', method: 'RTGS' },
                  { id: 'PAY-151', amount: 35000, status: 'Pending', date: '2026-10-31', method: 'Pending' }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'LEAD-1027',
    name: 'Suhani Bhatia',
    company: 'GlowOrganics Skincare',
    email: 'suhani@gloworganics.co.in',
    phone: '+91 99201 55672',
    source: 'Website',
    status: 'Qualified',
    date: '2026-10-28',
    assignedTo: 'Sneha Choudhary',
    department: 'Sales',
    notes: 'D2C brand requiring trademark clearance in 3 classes.',
    quotations: [
      {
        id: 'QUO-842',
        serviceCategory: 'Trademark',
        amount: 32000,
        status: 'Pending',
        date: '2026-10-29',
        deals: [
          {
            id: 'DEAL-537',
            service: 'Trademark',
            dealValue: 32000,
            priority: 'Medium',
            status: 'Negotiation',
            date: '2026-10-29',
            orders: [
              {
                id: 'ORD-337',
                stage: 'Pending',
                amount: 32000,
                assignedOps: 'Gaurav Pant',
                payments: [
                  { id: 'PAY-152', amount: 32000, status: 'Pending', date: '2026-10-31', method: 'Pending' }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'LEAD-1028',
    name: 'Raghavan Pillai',
    company: 'Travancore Spices & Herbs',
    email: 'raghavan@travancorespices.com',
    phone: '+91 94470 12389',
    source: 'Other',
    status: 'Unqualified',
    date: '2026-10-29',
    assignedTo: 'Gaurav Pant',
    department: 'Sales',
    notes: 'Firm outside jurisdiction of our current operations.',
    quotations: []
  },
  {
    id: 'LEAD-1029',
    name: 'Varun Grover',
    company: 'HyperScale Cloud Solutions',
    email: 'varun@hyperscalecloud.io',
    phone: '+91 98103 44920',
    source: 'Google Ads',
    status: 'Converted',
    date: '2026-10-29',
    assignedTo: 'Sneha Choudhary',
    department: 'Sales',
    notes: 'Multi-cloud Kubernetes consultancy firm.',
    quotations: [
      {
        id: 'QUO-843',
        serviceCategory: 'Private Limited Company',
        amount: 35000,
        status: 'Accepted',
        date: '2026-10-30',
        deals: [
          {
            id: 'DEAL-538',
            service: 'Private Limited Company',
            dealValue: 35000,
            priority: 'High',
            status: 'Won',
            date: '2026-10-30',
            orders: [
              {
                id: 'ORD-338',
                stage: 'In Progress',
                amount: 35000,
                assignedOps: 'Srishti Upadhyay',
                payments: [
                  { id: 'PAY-153', amount: 35000, status: 'Collected', date: '2026-10-30', method: 'UPI' }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'QUO-844',
        serviceCategory: 'ISO Certification',
        amount: 155000,
        status: 'Accepted',
        date: '2026-10-30',
        deals: [
          {
            id: 'DEAL-539',
            service: 'ISO Certification',
            dealValue: 155000,
            priority: 'High',
            status: 'Won',
            date: '2026-10-31',
            orders: [
              {
                id: 'ORD-339',
                stage: 'On Hold',
                amount: 155000,
                assignedOps: 'Gaurav Pant',
                payments: [
                  { id: 'PAY-154', amount: 75000, status: 'Collected', date: '2026-10-31', method: 'RTGS' },
                  { id: 'PAY-155', amount: 80000, status: 'Pending', date: '2026-11-05', method: 'Pending' }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'LEAD-1030',
    name: 'Kripa Sundaram',
    company: 'Zenith BioPharma Research',
    email: 'kripa@zenithbiopharma.in',
    phone: '+91 98401 22910',
    source: 'Website',
    status: 'Converted',
    date: '2026-10-30',
    assignedTo: 'Nancy Singh',
    department: 'Sales',
    notes: 'Clinical trials analytical lab requiring Annual Compliance and FSSAI.',
    quotations: [
      {
        id: 'QUO-845',
        serviceCategory: 'Annual Compliance',
        amount: 98000,
        status: 'Accepted',
        date: '2026-10-31',
        deals: [
          {
            id: 'DEAL-540',
            service: 'Annual Compliance',
            dealValue: 98000,
            priority: 'High',
            status: 'Won',
            date: '2026-10-31',
            orders: [
              {
                id: 'ORD-340',
                stage: 'In Progress',
                amount: 98000,
                assignedOps: 'Srishti Upadhyay',
                payments: [
                  { id: 'PAY-156', amount: 60000, status: 'Collected', date: '2026-10-31', method: 'RTGS' },
                  { id: 'PAY-157', amount: 38000, status: 'Pending', date: '2026-11-08', method: 'Pending' }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];

export const MOCK_ACTIVITIES = [
  {
    id: 'ACT-1',
    timestamp: '2026-10-31 16:45',
    user: 'Srishti Upadhyay',
    avatar: 'SU',
    color: 'bg-rose-500',
    action: 'Payment Recorded',
    description: 'Recorded RTGS payment of ₹60,000 for Zenith BioPharma Research (Annual Compliance)',
    type: 'payment',
    badge: '₹60,000'
  },
  {
    id: 'ACT-2',
    timestamp: '2026-10-31 15:20',
    user: 'Sneha Choudhary',
    avatar: 'SC',
    color: 'bg-blue-500',
    action: 'Deal Won',
    description: 'Closed Deal DEAL-539 (ISO Certification) valued at ₹1,55,000 with HyperScale Cloud Solutions',
    type: 'deal',
    badge: 'Won'
  },
  {
    id: 'ACT-3',
    timestamp: '2026-10-30 18:10',
    user: 'Nancy Singh',
    avatar: 'NS',
    color: 'bg-emerald-500',
    action: 'Order Stage Updated',
    description: 'Updated Order ORD-338 (HyperScale Cloud) status to In Progress with MCA verification initiated',
    type: 'order',
    badge: 'In Progress'
  },
  {
    id: 'ACT-4',
    timestamp: '2026-10-29 14:35',
    user: 'Gaurav Pant',
    avatar: 'GP',
    color: 'bg-violet-500',
    action: 'Quotation Dispatched',
    description: 'Issued Quotation QUO-842 (₹32,000) for GlowOrganics Skincare Trademark registration',
    type: 'quotation',
    badge: 'Quotation'
  },
  {
    id: 'ACT-5',
    timestamp: '2026-10-28 11:15',
    user: 'Tannu Kumari',
    avatar: 'TK',
    color: 'bg-amber-500',
    action: 'Order Completed',
    description: 'Completed filing and obtained certificate for ORD-334 (Eastwind Creative Studios LLP)',
    type: 'order',
    badge: 'Completed'
  },
  {
    id: 'ACT-6',
    timestamp: '2026-10-26 10:00',
    user: 'Sneha Choudhary',
    avatar: 'SC',
    color: 'bg-blue-500',
    action: 'Payment Collected',
    description: 'Recorded UPI payment of ₹21,000 from CyberShield InfoSec for Trademark class 42',
    type: 'payment',
    badge: '₹21,000'
  },
  {
    id: 'ACT-7',
    timestamp: '2026-10-25 17:05',
    user: 'Nancy Singh',
    avatar: 'NS',
    color: 'bg-emerald-500',
    action: 'Lead Converted',
    description: 'Lead LEAD-1022 (Anupam Trivedi) converted to Deal DEAL-530 (ISO Certification)',
    type: 'lead',
    badge: 'Converted'
  }
];

export const PREVIOUS_PERIOD_BASELINE = {
  totalLeads: 24,
  qualifiedLeads: 18,
  convertedLeads: 15,
  unqualifiedLeads: 4,
  conversionRate: 62.5,
  quotationsCount: 31,
  dealsCount: 22,
  totalRevenue: 1580000, // ₹15.8 Lakhs
};

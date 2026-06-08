// ─── KPI Stats ───────────────────────────────────────────────────────────────
export const kpiStats = [
  { id: 1, label: 'Revenue',       value: '$4.82M', change: '+12.4%', up: true,  icon: 'revenue',  color: 'brand' },
  { id: 2, label: 'Health Score',  value: '87/100', change: '+3pts',  up: true,  icon: 'health',   color: 'green' },
  { id: 3, label: 'Active Risks',  value: '14',     change: '-2',     up: false, icon: 'risk',     color: 'red'   },
  { id: 4, label: 'AI Accuracy',   value: '94.2%',  change: '+1.1%',  up: true,  icon: 'ai',       color: 'blue'  },
  { id: 5, label: 'Clients',       value: '1,284',  change: '+48',    up: true,  icon: 'clients',  color: 'brand' },
  { id: 6, label: 'Alerts Today',  value: '7',      change: '+3',     up: false, icon: 'alerts',   color: 'yellow'},
];

// ─── Revenue Chart ────────────────────────────────────────────────────────────
export const revenueData = [
  { month: 'Jan', revenue: 3200, forecast: 3100, expenses: 2100 },
  { month: 'Feb', revenue: 3600, forecast: 3400, expenses: 2300 },
  { month: 'Mar', revenue: 3400, forecast: 3600, expenses: 2200 },
  { month: 'Apr', revenue: 4100, forecast: 3900, expenses: 2500 },
  { month: 'May', revenue: 4400, forecast: 4200, expenses: 2700 },
  { month: 'Jun', revenue: 4820, forecast: 4600, expenses: 2900 },
  { month: 'Jul', revenue: 5100, forecast: 5000, expenses: 3100 },
  { month: 'Aug', revenue: 5400, forecast: 5300, expenses: 3200 },
];

// ─── Risk Data ────────────────────────────────────────────────────────────────
export const riskData = [
  { category: 'Financial',    score: 72, trend: 'down',   severity: 'High'   },
  { category: 'Operational',  score: 45, trend: 'stable', severity: 'Medium' },
  { category: 'Cyber',        score: 88, trend: 'up',     severity: 'Critical'},
  { category: 'Compliance',   score: 31, trend: 'down',   severity: 'Low'    },
  { category: 'Market',       score: 63, trend: 'up',     severity: 'High'   },
  { category: 'Supply Chain', score: 52, trend: 'stable', severity: 'Medium' },
];

export const riskMatrix = [
  { name: 'Cyber Attack',       probability: 78, impact: 95, category: 'Cyber'      },
  { name: 'Revenue Drop',       probability: 45, impact: 82, category: 'Financial'  },
  { name: 'Regulatory Change',  probability: 60, impact: 55, category: 'Compliance' },
  { name: 'Supply Disruption',  probability: 38, impact: 70, category: 'Supply'     },
  { name: 'Key Person Loss',    probability: 25, impact: 65, category: 'Operational'},
  { name: 'Market Shift',       probability: 55, impact: 75, category: 'Market'     },
];

// ─── Business Health ──────────────────────────────────────────────────────────
export const healthMetrics = [
  { name: 'Cash Flow',      score: 82, weight: 25, status: 'Good'     },
  { name: 'Customer Sat.',  score: 91, weight: 20, status: 'Excellent'},
  { name: 'Employee NPS',   score: 74, weight: 15, status: 'Good'     },
  { name: 'Market Share',   score: 67, weight: 20, status: 'Fair'     },
  { name: 'Innovation',     score: 79, weight: 10, status: 'Good'     },
  { name: 'Compliance',     score: 95, weight: 10, status: 'Excellent'},
];

export const healthRadar = [
  { metric: 'Financial',   A: 82, fullMark: 100 },
  { metric: 'Operations',  A: 78, fullMark: 100 },
  { metric: 'People',      A: 74, fullMark: 100 },
  { metric: 'Technology',  A: 88, fullMark: 100 },
  { metric: 'Strategy',    A: 71, fullMark: 100 },
  { metric: 'Compliance',  A: 95, fullMark: 100 },
];

// ─── Predictions ──────────────────────────────────────────────────────────────
export const predictionItems = [
  { id: 1, title: 'Revenue Decline in Q3',       confidence: 87, impact: 'High',   timeframe: '45 days',  category: 'Financial',  action: 'Diversify revenue streams' },
  { id: 2, title: 'Customer Churn Increase',      confidence: 73, impact: 'Medium', timeframe: '30 days',  category: 'Customer',   action: 'Launch retention campaign' },
  { id: 3, title: 'Supply Chain Bottleneck',      confidence: 91, impact: 'High',   timeframe: '14 days',  category: 'Operations', action: 'Source alternate suppliers' },
  { id: 4, title: 'Regulatory Compliance Risk',   confidence: 65, impact: 'Critical',timeframe: '60 days', category: 'Legal',      action: 'Engage compliance team' },
  { id: 5, title: 'Talent Acquisition Gap',       confidence: 58, impact: 'Medium', timeframe: '90 days',  category: 'HR',         action: 'Accelerate hiring pipeline' },
  { id: 6, title: 'Technology Infrastructure Lag',confidence: 79, impact: 'High',   timeframe: '30 days',  category: 'Technology', action: 'Plan system upgrade sprint' },
];

// ─── Forecasting ──────────────────────────────────────────────────────────────
export const forecastData = [
  { period: 'Jul 24', actual: 4820, optimistic: 5300, base: 5100, pessimistic: 4600 },
  { period: 'Aug 24', actual: null, optimistic: 5700, base: 5400, pessimistic: 4900 },
  { period: 'Sep 24', actual: null, optimistic: 6100, base: 5700, pessimistic: 5100 },
  { period: 'Oct 24', actual: null, optimistic: 6500, base: 6000, pessimistic: 5400 },
  { period: 'Nov 24', actual: null, optimistic: 7100, base: 6500, pessimistic: 5800 },
  { period: 'Dec 24', actual: null, optimistic: 7800, base: 7000, pessimistic: 6200 },
];

// ─── Decisions ────────────────────────────────────────────────────────────────
export const decisions = [
  { id: 1, title: 'Expand into Southeast Asia Market', score: 78, risk: 'Medium', roi: '22%', timeline: '18mo', status: 'Recommended', priority: 1 },
  { id: 2, title: 'Acquire Competitor Analytics Firm', score: 62, risk: 'High',   roi: '38%', timeline: '12mo', status: 'Review',       priority: 2 },
  { id: 3, title: 'Launch AI-Driven Product Line',     score: 85, risk: 'Low',    roi: '45%', timeline: '9mo',  status: 'Recommended', priority: 1 },
  { id: 4, title: 'Reduce Operational Overhead 15%',  score: 71, risk: 'Low',    roi: '18%', timeline: '6mo',  status: 'Recommended', priority: 2 },
  { id: 5, title: 'Migrate Infrastructure to Cloud',  score: 88, risk: 'Low',    roi: '31%', timeline: '12mo', status: 'Recommended', priority: 1 },
];

// ─── Notifications ────────────────────────────────────────────────────────────
export const notifications = [
  { id: 1,  type: 'critical', title: 'Cyber Risk Alert',          body: 'Unusual login attempts detected from 3 locations.',    time: '2m ago',   read: false },
  { id: 2,  type: 'warning',  title: 'Revenue Forecast Revised',  body: 'Q3 forecast revised down by 4.2% due to market shift.', time: '18m ago',  read: false },
  { id: 3,  type: 'info',     title: 'AI Model Retrained',        body: 'Prediction engine updated with June data batch.',       time: '1h ago',   read: false },
  { id: 4,  type: 'success',  title: 'Compliance Check Passed',   body: 'All 47 regulatory controls verified successfully.',     time: '3h ago',   read: true  },
  { id: 5,  type: 'warning',  title: 'Supply Chain Delay',        body: 'Vendor XYZ delayed shipment by 12 days.',              time: '5h ago',   read: true  },
  { id: 6,  type: 'info',     title: 'New Report Available',      body: 'Monthly executive report is ready for review.',        time: '8h ago',   read: true  },
  { id: 7,  type: 'success',  title: 'New Client Onboarded',      body: 'Enterprise contract signed with GlobalTech Corp.',     time: '1d ago',   read: true  },
  { id: 8,  type: 'critical', title: 'Cash Flow Warning',         body: 'Cash reserves projected below threshold in 30 days.',  time: '2d ago',   read: true  },
];

// ─── Recent Activity Table ────────────────────────────────────────────────────
export const recentActivity = [
  { id: 1,  event: 'Revenue forecast updated',      user: 'AI Engine',    module: 'Forecasting',   time: '09:14 AM', status: 'Completed' },
  { id: 2,  event: 'New risk: Cyber Threat #14',   user: 'System',       module: 'Risk Mgmt',     time: '09:02 AM', status: 'Active'    },
  { id: 3,  event: 'Decision analysis run',         user: 'Sarah K.',     module: 'Decisions',     time: '08:47 AM', status: 'Completed' },
  { id: 4,  event: 'Health score recalculated',     user: 'AI Engine',    module: 'Health',        time: '08:30 AM', status: 'Completed' },
  { id: 5,  event: 'Board report generated',        user: 'Kabilan K.',   module: 'Reports',       time: '08:15 AM', status: 'Completed' },
  { id: 6,  event: 'Compliance audit initiated',    user: 'Admin',        module: 'Compliance',    time: 'Yesterday', status: 'In Progress'},
  { id: 7,  event: 'New prediction: Churn +8%',    user: 'AI Engine',    module: 'Prediction',    time: 'Yesterday', status: 'Warning'   },
];

// ─── Users (Admin) ────────────────────────────────────────────────────────────
export const users = [
  { id: 1, name: 'Kabilan Kumar',  email: 'kabilan@resilienceai.io', role: 'Admin',   status: 'Active',    lastLogin: '2m ago'  },
  { id: 2, name: 'Sarah Kim',      email: 'sarah@resilienceai.io',   role: 'Analyst', status: 'Active',    lastLogin: '1h ago'  },
  { id: 3, name: 'Marcus Chen',    email: 'marcus@resilienceai.io',  role: 'Viewer',  status: 'Active',    lastLogin: '3h ago'  },
  { id: 4, name: 'Priya Sharma',   email: 'priya@resilienceai.io',   role: 'Manager', status: 'Active',    lastLogin: '1d ago'  },
  { id: 5, name: 'James Okafor',   email: 'james@resilienceai.io',   role: 'Analyst', status: 'Inactive',  lastLogin: '5d ago'  },
  { id: 6, name: 'Elena Vasquez',  email: 'elena@resilienceai.io',   role: 'Viewer',  status: 'Active',    lastLogin: '2d ago'  },
];

// ─── Reports ──────────────────────────────────────────────────────────────────
export const reports = [
  { id: 1, title: 'Executive Summary — June 2024',   type: 'Executive',  pages: 12, date: 'Jun 30, 2024', size: '2.4 MB' },
  { id: 2, title: 'Risk Assessment Q2 2024',         type: 'Risk',       pages: 28, date: 'Jun 28, 2024', size: '5.1 MB' },
  { id: 3, title: 'Revenue Forecast H2 2024',        type: 'Financial',  pages: 18, date: 'Jun 25, 2024', size: '3.7 MB' },
  { id: 4, title: 'Business Health Scorecard',       type: 'Health',     pages: 8,  date: 'Jun 20, 2024', size: '1.9 MB' },
  { id: 5, title: 'AI Prediction Accuracy Report',   type: 'AI',         pages: 22, date: 'Jun 15, 2024', size: '4.2 MB' },
  { id: 6, title: 'Compliance Status Report',        type: 'Compliance', pages: 35, date: 'Jun 10, 2024', size: '6.8 MB' },
];

// ─── Segment Chart ────────────────────────────────────────────────────────────
export const revenueSegments = [
  { name: 'Enterprise', value: 48, color: '#1e9d87' },
  { name: 'Mid-Market', value: 29, color: '#3b82f6' },
  { name: 'SMB',        value: 15, color: '#8b5cf6' },
  { name: 'Partner',    value: 8,  color: '#f59e0b' },
];

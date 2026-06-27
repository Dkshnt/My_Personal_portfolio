export interface Message {
  id: string;
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  subject: string;
  message: string;
  timestamp: string;
}

export interface Jyotirlinga {
  id: string;
  name: string;
  state: string;
  location: string;
  deitySpec: string; // Description or spiritual significance
  visited: boolean;
}

export interface PersonalStat {
  label: string;
  value: string;
  description: string;
}

export interface ExcelProject {
  id: string;
  title: string;
  category: string;
  description: string;
  challenge: string;
  solution: string;
  stack: string[];
  metrics: string[];
  docUrl?: string;
  sourceUrl?: string;
}

export interface ExperienceMilestone {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  logoColor: string; // Tailwind class background
  keyMetric: string;
  keyMetricLabel: string;
  summary: string;
  responsibilities: string[];
  achievements: string[];
  toolsUsed: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  link?: string;
}

export interface ESGMetricInfo {
  id: string;
  title: string;
  currentValue: string;
  targetValue: string;
  unit: string;
  progressPercentage: number;
  description: string;
  status: 'Ahead' | 'On Track' | 'Under Review';
}

export const JYOTIRLINGAS_INITIAL: Jyotirlinga[] = [
  { id: 'somnath', name: 'Somnath', state: 'Gujarat', location: 'Prabhas Patan', deitySpec: 'The Eternal Shrine, first of the twelve, reconstructed seven times.', visited: false },
  { id: 'mallikarjuna', name: 'Mallikarjuna', state: 'Andhra Pradesh', location: 'Srisailam', deitySpec: 'Shakti Peetha and Jyotirlinga conjoined on Sri Parvata peak.', visited: false },
  { id: 'mahakaleshwar', name: 'Mahakaleshwar', state: 'Madhya Pradesh', location: 'Ujjain', deitySpec: 'Dakshinamukhi (South-facing) self-manifested lingam governing cosmic time.', visited: false },
  { id: 'omkareshwar', name: 'Omkareshwar', state: 'Madhya Pradesh', location: 'Mandhata Island', deitySpec: 'Island shaped like the sacred Om symbol in the Narmada River.', visited: false },
  { id: 'kedarnath', name: 'Kedarnath', state: 'Uttarakhand', location: 'Garhwal Himalayas', deitySpec: 'The highest among the twelve, resting at 11,750 ft surrounded by snow.', visited: false },
  { id: 'bhimashankar', name: 'Bhimashankar', state: 'Maharashtra', location: 'Khed', deitySpec: 'Source of the Bhima River, situated in dense Western Ghat preserves.', visited: false },
  { id: 'kashi', name: 'Kashi Vishwanath', state: 'Uttar Pradesh', location: 'Varanasi', deitySpec: 'The golden spire on the banks of holy Ganga, the central axis of spirituality.', visited: false },
  { id: 'trimbakeshwar', name: 'Trimbakeshwar', state: 'Maharashtra', location: 'Nashik', deitySpec: 'Three-faced lingam representing Brahma, Vishnu, and Shiva; source of Godavari.', visited: false },
  { id: 'vaidyanath', name: 'Baidyanath', state: 'Jharkhand', location: 'Deoghar', deitySpec: 'Worshipped as the Doctor Lord, where devotees carry holy water on foot.', visited: false },
  { id: 'nageshwar', name: 'Nageshwar', state: 'Gujarat', location: 'Dwarka', deitySpec: 'The temple of lord of snakes, shielding devotees from raw planetary effects.', visited: false },
  { id: 'ramanatha', name: 'Ramanathaswamy', state: 'Tamil Nadu', location: 'Rameswaram', deitySpec: 'Southernmost shrine established by Lord Rama, featuring 22 holy water wells.', visited: false },
  { id: 'grishneshwar', name: 'Grishneshwar', state: 'Maharashtra', location: 'Ellora', deitySpec: 'The final Jyotirlinga, built of red volcanic stone nearby the Ellora Caves.', visited: false },
];

export const PERSONAL_STATS: PersonalStat[] = [
  { label: 'Books Read', value: '52+', description: 'Annual focus on evolutionary biology, systemics, history, and neurophilosophy.' },
  { label: 'Lab Experiments', value: '140+', description: 'Local tool configurations, API pipelines, automated spreadsheets, dynamic prompts.' },
  { label: 'Territories Travelled', value: '11 States', description: 'Immersive exploration of Indian subcontinental geology and sacred spiritual geography.' },
  { label: 'Terminal Curiosity', value: '∞', description: 'Constant active learning, dismantling processes to rebuild them at higher efficiencies.' }
];

export const EXCEL_PROJECTS: ExcelProject[] = [
  {
    id: 'financial-model',
    title: '3-Statement Corporate Financial Model',
    category: 'Corporate Finance & Modeling',
    description: 'A fully integrated, dynamic financial model incorporating Income Statement, Balance Sheet, and Free Cash Flow Statement with scenario sliders and automated debt sizing.',
    challenge: 'Handling circular references in debt-interest modeling without crashing Excel, while keeping calculations fully transparent across diverse operational scenarios.',
    solution: 'Designed robust iterative cell structures coupled with target-seeking macro routines. Integrated strict error-checking checklists to balance state sheets instantly.',
    stack: ['Excel Architecture', 'VBA Scenario Engines', 'Dynamic Arrays', 'Monte Carlo Simulators'],
    metrics: ['0 circular reference breaks', '3 distinct macroeconomic scenarios (Base, Bull, Bear)', '99.9% state balance accuracy'],
    docUrl: '#',
    sourceUrl: '#'
  },
  {
    id: 'budget-tracker',
    title: 'Automated Budget & Project Resource Allocator',
    category: 'Process Engineering / PMO',
    description: 'An advanced resource planning sheet for engineering pipelines, offering live burn-rate charts, automated task-critical-path alerts, and multi-team skill lookup structures.',
    challenge: 'Aggregating disjointed CSV schedules from Jira and ERP systems into a structured database without manual intervention or bloated file sizes.',
    solution: 'Engineered an custom Power Query aggregation stack. Created dynamic Excel spill arrays using XLOOKUP and LET arrays to calculate project slippage immediately.',
    stack: ['Power Query', 'M-Language Scripts', 'LET & LAMBDA Functions', 'KPI Conditional Matrix'],
    metrics: ['85% reduction in weekly manual entries', 'Immediate visual alert of overallocated resources', 'File size optimized down by 60%'],
    docUrl: '#',
    sourceUrl: '#'
  },
  {
    id: 'portfolio-dashboard',
    title: 'Dynamic Investment Portfolio Tracker',
    category: 'Asset Management',
    description: 'An asset management dashboard that fetches real-time stock prices and ESG safety indices to generate risk-adjusted return matrices and optimal portfolio rebalancing schedules.',
    challenge: 'Connecting real-time external data feeds without incurring premium API subscriptions while plotting tracking errors and asset correlation grids.',
    solution: 'Utilized build-in Excel Data Types for Securities. Constructed custom matrix multiplication arrays for modern portfolio theory formulas and covariance indexes.',
    stack: ['Excel Stock Data Types', 'Matrix Math Formulas', 'Conditional Heatmapping', 'Pivot Optimization Engines'],
    metrics: ['Real-time price feeds for 40+ assets', 'Instant automated portfolio rebalancing checks', 'Under 2-second data reload cycles'],
    docUrl: '#',
    sourceUrl: '#'
  }
];

export const EXPERIENCE_MILESTONES: ExperienceMilestone[] = [
  {
    id: 'nse',
    company: 'NSE',
    role: 'Deputy Manager',
    period: 'Apr 2026 - Current',
    location: 'Mumbai, India',
    logoColor: 'bg-emerald-700',
    keyMetric: 'BRSR',
    keyMetricLabel: 'Assessment Standard',
    summary: 'Evaluating listed companies\' ESG metrics, translating regulatory mandates, and managing controversy trackers to ensure high-fidelity marketplace sustainability ratings.',
    responsibilities: [
      'Evaluated listed companies\' Business Responsibility and Sustainability Reporting (BRSR) disclosures and translated regulatory requirements into structured ESG assessment methodologies.',
      'Analyzed and monitored severe controversies and corporate governance-related developments that materially impact company-level ESG risk ratings.',
      'Collaborated closely with internal stakeholders to resolve complex ESG methodology queries and improve data collection standards, governance, and reporting consistency.'
    ],
    achievements: [
      'Ensured highly consistent, accurate, and standardized scoring across multiple environmental, social, and governance indicator frameworks.',
      'Strengthened sovereign data alignment by systematically mapping legislative disclosure policies directly into active scoring algorithms.'
    ],
    toolsUsed: ['BRSR Frameworks', 'SOP Quality Assurance', 'Controversy Databases', 'Corporate Governance Checklists']
  },
  {
    id: 'sustainalytics',
    company: 'Morningstar (Sustainalytics)',
    role: 'Senior ESG Research Analyst / Research Analyst',
    period: 'Jun 2022 - Apr 2026',
    location: 'Mumbai, India',
    logoColor: 'bg-teal-700',
    keyMetric: '5,000+',
    keyMetricLabel: 'Companies Scoped',
    summary: 'Advanced from ESG Research Analyst to Senior ESG Research Analyst. Directed multi-product carbon emission workflow engineering, supported complex emission validations as Carbon SME, and conducted user acceptance testing on core data collection systems.',
    responsibilities: [
      'Managed stakeholder requirements across eight ESG products, collaborating with cross-functional teams through JIRA to optimize workflows and reduce average ticket resolution time by 40%.',
      'Designed and documented standardized ESG data collection workflows and functional processes for carbon disclosure research, increasing analyst productivity by 54%.',
      'Served as Subject Matter Expert (SME) for the Carbon Research team, supporting complex emissions data validation, methodology alignment, and resolution of company-level carbon reporting issues.',
      'Analyzed business requirements and redesigned ESG data validation workflows covering 700–1,000 weekly exceptions across 40+ metrics, reducing turnaround time from 15 to 7 days.',
      'Led user acceptance testing for a carbon data collection platform, identified 15+ critical defects, and collaborated to automate ESG reporting processes and Power BI dashboards, reducing manual effort by 60%.',
      'Managed and validated ESG and carbon datasets for 5,000+ companies, analyzing emissions boundaries and calculation methodologies using frameworks like GHG Protocol, CDP, TCFD, PCAF, OGMP, EU PEF, and BRSR.'
    ],
    achievements: [
      'Successfully boosted carbon research analyst productivity by 54% through optimized workflow architectures and streamlined standard guides.',
      'Drastically reduced exceptions validation turnaround time from 15 days to under 7 days representing a 53% efficiency improvement.',
      'Identified and resolved 15+ critical platform defects during Carbon Platform User Acceptance Testing (UAT), guiding functional enhancements.',
      'Optimized data and technology team workflows to reduce manual reporting efforts by 60% with custom Power BI dashboards.'
    ],
    toolsUsed: ['JIRA & Confluence', 'Power BI & Excel', 'GHG Protocol & CDP', 'TCFD, PCAF, OGMP', 'BRSR Disclosures', 'UAT Testing Plans']
  },
  {
    id: 'borgwarner',
    company: 'BorgWarner',
    role: 'Quality Engineer',
    period: 'Jun 2018 - Jun 2021',
    location: 'Manesar, India',
    logoColor: 'bg-stone-850',
    keyMetric: 'FPY/DPMO',
    keyMetricLabel: 'Defect Reductions',
    summary: 'Supervised automotive assembly quality reviews, spearheaded multi-departmental ISO compliance audits, and tracked precision defect metrics.',
    responsibilities: [
      'Managed root cause analysis (RCA) and established preventive and corrective actions (CAPA) to minimize component defect ratios.',
      'Facilitated team alignment during external quality audits, internal manufacturing reviews, and primary client relationship panels.',
      'Tracked First Pass Yield (FPY) and Defects Per Million Opportunities (DPMO) indicators to guide predictive control charts.'
    ],
    achievements: [
      'Dramatically decreased manufacturing line scrap value by building interactive root cause tracking and correction systems.',
      'Successfully sustained excellent quality performance levels and established zero non-conformance during continuous client reviews.'
    ],
    toolsUsed: ['Root Cause Analysis (RCA)', 'Corrective Actions (CAPA)', 'FPY & DPMO Indicators', 'Quality Control Assemblies']
  },
  {
    id: 'akshaya-patra',
    company: 'TAPF',
    role: 'ESG Advisory (Pro Bono Project)',
    period: '2025',
    location: 'India',
    logoColor: 'bg-orange-600',
    keyMetric: 'GRI',
    keyMetricLabel: 'Materiality Audit',
    summary: 'Architected first sustainability strategy guidelines, double materiality assessment matrix, and GRI reporting indicators for structural non-profit disclosures.',
    responsibilities: [
      'Designed primary ESG reporting strategy incorporating stakeholder engagement templates and double materiality assessments.',
      'Constructed key performance indicator (KPI) mapping spreadsheets aligned with Global Reporting Initiative (GRI).',
      'Provided strategic guidance to board and executive operational layers concerning non-profit governance integration.'
    ],
    achievements: [
      'Delivered the structural outline, data schemas, and GRI aligned KPIs for the organization’s debut formal sustainability report.',
      'Successfully synchronized diverse social development priorities with systematic, reportable environmental disclosures.'
    ],
    toolsUsed: ['GRI Standards', 'Double Materiality Matrix', 'Stakeholder Framing', 'KPI Architecture Maps']
  }
];

export const CERTIFICATIONS_LIST: Certification[] = [
  { id: '1', title: 'CFA Institute ESG Investing Certificate', issuer: 'CFA Institute', date: '2023', credentialId: 'CFA-ESG-49021' },
  { id: '2', title: 'Global Reporting Initiative (GRI) Certified Professional', issuer: 'G GRI Standards Board', date: '2022', credentialId: 'GRI-P-8820' },
  { id: '3', title: 'Task Force on Climate-related Financial Disclosures (TCFD) Academy', issuer: 'FSB TCFD Organization', date: '2022' },
  { id: '4', title: 'Six Sigma Green Belt (Quality Systems)', issuer: 'American Society for Quality (ASQ)', date: '2019', credentialId: 'SSGB-9921' },
  { id: '5', title: 'Advanced Financial Modeling & Analytics', issuer: 'Corporate Finance Institute (CFI)', date: '2020', credentialId: 'CFIP-1120' }
];

export const ESG_METRICS_INFO: ESGMetricInfo[] = [
  { id: 'emissions', title: 'Carbon Footprint Reductions', currentValue: '22%', targetValue: '30%', unit: 'Reduction vs Baseline', progressPercentage: 73, description: 'Direct assembly energy optimization and supplier engagement frameworks for green energy onboarding.', status: 'On Track' },
  { id: 'waste', title: 'Manufacturing Scrap Diversion', currentValue: '94%', targetValue: '95%', unit: 'Landfill Diversion Rate', progressPercentage: 99, description: 'Zero-Waste-to-Landfill initiative utilizing localized circular scrap reuse networks.', status: 'Ahead' },
  { id: 'audits', title: 'ISO 14001 Supplier Audits', currentValue: '140', targetValue: '150', unit: 'Audits Completed', progressPercentage: 93, description: 'Annual review of Tier-1 and Tier-2 supply chain partners on environmental safeguard policies.', status: 'On Track' },
  { id: 'training', title: 'Internal Governance Standard training', currentValue: '100%', targetValue: '100%', unit: 'Staff Certified', progressPercentage: 100, description: 'Anti-bribery, ethics, dynamic compliance standards, and corporate BRSR quality guidelines training.', status: 'Ahead' }
];

export const IMMERSIVE_LAB_NODES = [
  { id: 'veo', label: 'Google Veo', desc: 'Synthesizing short video-narrative experiments for explaining systemic climate change patterns.', x: 18, y: 24, size: 45, color: '#3B82F6' },
  { id: 'notebooklm', label: 'NotebookLM', desc: 'Synthesizing 50+ books and research documents into localized knowledge maps.', x: 42, y: 15, size: 55, color: '#10B981' },
  { id: 'stitch', label: 'Stitch Integration', desc: 'Automated extraction systems linking databases, spreadsheets, and public portals.', x: 75, y: 28, size: 50, color: '#F59E0B' },
  { id: 'gemini', label: 'Gemini Pro', desc: 'Engineering dynamic prompt templates to classify corporate emission declarations automatically.', x: 50, y: 55, size: 70, color: '#8B5CF6' },
  { id: 'opal', label: 'Google Opal', desc: 'Evaluating prototype interactions on secure local testing sandboxes.', x: 22, y: 72, size: 42, color: '#6366F1' },
  { id: 'flow', label: 'Flow Music', desc: 'Solfeggio wave configurations used to set focused states during complex financial audits.', x: 80, y: 75, size: 48, color: '#EC4899' },
  { id: 'antgravity', label: 'Antigravity Agent', desc: 'Testing agentic scripts that manage local setups and run multi-step quality audits.', x: 15, y: 50, size: 52, color: '#14B8A6' },
];

export interface ContentBlock {
  id: string;
  type: 'text' | 'image' | 'file_download';
  value: string;
  name?: string;
  sort_order: number;
}

export interface PortfolioData {
  headline: string;
  bio: string;
  linkedin: string;
  github: string;
  youtube: string;
  assets?: { name: string; url: string; size: string; type: string; createdAt: string }[];
  blocks?: ContentBlock[];
  milestones?: ExperienceMilestone[];
  certifications?: Certification[];
  esgMetrics?: ESGMetricInfo[];
  projects?: ExcelProject[];
  personalStats?: PersonalStat[];
  labNodes?: typeof IMMERSIVE_LAB_NODES;
}


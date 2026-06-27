import { useState } from 'react';
import { 
  EXPERIENCE_MILESTONES, 
  CERTIFICATIONS_LIST, 
  ESG_METRICS_INFO, 
  ExperienceMilestone,
  PortfolioData
} from '../types';
import { 
  Building2, 
  Calendar, 
  MapPin, 
  ChevronRight, 
  CheckCircle2, 
  Layers, 
  Settings, 
  Database, 
  Award, 
  Briefcase, 
  FileSpreadsheet, 
  Check,
  TrendingUp,
  LineChart,
  ShieldAlert,
  ExternalLink
} from 'lucide-react';

interface ProfessionalViewProps {
  activeTab: string;
  portfolio: PortfolioData;
  setActiveTab: (tab: string) => void;
  selectedMilestoneId: string;
  setSelectedMilestoneId: (id: string) => void;
}

export default function ProfessionalView({ 
  activeTab, 
  portfolio, 
  setActiveTab,
  selectedMilestoneId,
  setSelectedMilestoneId
}: ProfessionalViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const currentMilestones = portfolio.milestones || EXPERIENCE_MILESTONES;
  const currentCertifications = portfolio.certifications || CERTIFICATIONS_LIST;
  const currentEsgMetrics = portfolio.esgMetrics || ESG_METRICS_INFO;

  const selectedMilestone = currentMilestones.find(m => m.id === selectedMilestoneId) || currentMilestones[0];

  const skillsData = [
    { name: 'BRSR Disclosures', category: 'ESG & Sustainability', score: 95, desc: 'India SEC mandated Business Responsibility & Sustainability Reporting frameworks.' },
    { name: 'ESG Risk Analytics', category: 'ESG & Sustainability', score: 90, desc: 'Material ESG risk identification & portfolio risk analytics.' },
    { name: 'Sovereign ESG Auditing', category: 'ESG & Sustainability', score: 85, desc: 'Sovereign-level ESG risk evaluations and research oversight.' },
    { name: 'Process Assurance (QA)', category: 'Quality Engineering', score: 95, desc: 'Statistical validation, peer review workflows and QA checklist automation.' },
    { name: 'ISO 14001 Standards', category: 'Quality Engineering', score: 90, desc: 'Environmental Management Systems auditing and execution protocols.' },
    { name: 'ISO 9001 Systems', category: 'Quality Engineering', score: 88, desc: 'High-precision manufacturing layout auditing and continuous improvement.' },
    { name: 'Excel Advanced Modeling', category: 'Strategic Tools', score: 98, desc: 'Multi-statement corporate models, matrix operations and automated analytics.' },
    { name: 'Power BI Analytics', category: 'Strategic Tools', score: 85, desc: 'Interactive management dashboards and dynamic compliance monitoring.' },
    { name: 'Python Process Automation', category: 'Strategic Tools', score: 80, desc: 'Custom batch data miners, regulatory report parsers and scrapers.' },
  ];

  const filteredSkills = selectedCategory === 'all' 
    ? skillsData 
    : skillsData.filter(s => s.category.toLowerCase().includes(selectedCategory.toLowerCase()) || selectedCategory.toLowerCase().includes(s.category.toLowerCase()));

  // FAQ list for process methodology section
  const processFaqs = [
    {
      q: "How does the ESG Audit Automation System reduce anomalies by 40%?",
      a: "By transferring manually validated checklists into integrated Excel verification engines powered by dynamic logic formulas. This establishes hard programmatic safeguards that catch misaligned columns, incorrect data types, and micro-discrepancies instantly before submission."
    },
    {
      q: "What role does ISO 14001 play in greenhouse emissions modeling?",
      a: "It defines the structural limits and monitoring frequencies. Applying ISO guidelines lets us trace the flow of energetic emissions at each physical assembly unit, making sure supply-chain declarations align strictly with verifiable utility records."
    },
    {
      q: "Why is the Corporate BRSR standard critical for Indian Tier 1 operations?",
      a: "BRSR establishes mandatory, granular ESG disclosures. Standardizing these reports into clear Excel architectures lets global investment firms assess and compare companies on equal parameters, avoiding 'greenwashing' risks."
    }
  ];

  return (
    <div className="bg-sage-50 text-sage-950 min-h-screen font-sans">
      
      {/* Tab 1: Stewardship Resume (Curriculum Vitae Portfolio) */}
      {activeTab === 'stewardship' && (
        <div>
          {/* Hero Banner Section */}
          <section className="relative overflow-hidden bg-sage-100 border-b border-sage-200/80 py-20 px-4 sm:px-6 lg:px-8">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-10 left-10 w-40 h-40 rounded-full border border-sage-700 animate-pulse" />
              <div className="absolute bottom-10 right-10 w-[400px] h-[300px] border border-sage-700 rotate-12" />
            </div>
            
            <div className="max-w-7xl mx-auto relative z-10">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-[#0b0d0d] text-[#f5eded] border border-[#0b0d0d]">
                Stewardship Portfolio & Resume
              </span>
              <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-sage-950 max-w-4xl">
                {portfolio.headline}
              </h1>
              <p className="mt-4 text-base sm:text-lg text-sage-800 max-w-2xl font-light">
                {portfolio.bio}
              </p>

              {/* Dynamic Content Blocks Segment */}
              {portfolio.blocks && portfolio.blocks.length > 0 && (
                <div className="mt-12 bg-white/75 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-sage-200/80 max-w-4xl space-y-8 shadow-sm">
                  <div className="flex items-center space-x-2 border-b border-sage-100 pb-3">
                    <div className="w-1.5 h-3.5 bg-sage-700 rounded-full" />
                    <h3 className="font-display text-[10px] font-mono font-bold uppercase tracking-wider text-sage-800">
                      Dynamic Narrative Blocks
                    </h3>
                  </div>

                  <div className="space-y-6">
                    {[...portfolio.blocks]
                      .sort((a, b) => a.sort_order - b.sort_order)
                      .map((block) => {
                        if (block.type === 'text') {
                          return (
                            <div key={block.id} className="prose text-sage-900 leading-relaxed font-light text-sm sm:text-base whitespace-pre-wrap">
                              {block.value}
                            </div>
                          );
                        } else if (block.type === 'image') {
                          return (
                            <div key={block.id} className="my-5 rounded-2xl overflow-hidden border border-sage-200 bg-white max-w-2xl">
                              <img 
                                src={block.value} 
                                alt={block.name || "Portfolio Section Media"} 
                                className="w-full h-auto object-cover max-h-[350px]"
                                referrerPolicy="no-referrer"
                              />
                              {block.name && (
                                <div className="bg-sage-50 px-4 py-2 border-t border-sage-100 text-[10px] font-mono uppercase tracking-wider text-sage-700">
                                  {block.name}
                                </div>
                              )}
                            </div>
                          );
                        } else if (block.type === 'file_download') {
                          return (
                            <div key={block.id} className="my-4 max-w-xl">
                              <a 
                                href={block.value} 
                                download
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-4 bg-white hover:bg-sage-50 border border-sage-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 group"
                              >
                                <div className="flex items-center space-x-3.5 min-w-0">
                                  <div className="p-2.5 rounded-xl bg-sage-100 text-sage-700 font-mono text-[9px] uppercase font-bold flex-shrink-0">
                                    DOC
                                  </div>
                                  <div className="min-w-0">
                                    <p className="font-display font-semibold text-xs text-sage-950 truncate group-hover:text-sage-700">
                                      {block.name || "Download Asset Attachment"}
                                    </p>
                                    <p className="text-[9px] font-mono text-sage-500 uppercase tracking-wide mt-0.5">
                                      Click to view or download file
                                    </p>
                                  </div>
                                </div>
                                <div className="p-1.5 rounded-lg bg-sage-50 text-sage-700 group-hover:bg-sage-100 transition-colors">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.0} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                  </svg>
                                </div>
                              </a>
                            </div>
                          );
                        } else if (block.type === 'link') {
                          return (
                            <div key={block.id} className="my-4">
                              <a
                                href={block.value}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-sage-700 text-white font-display text-xs font-bold uppercase tracking-wider hover:bg-sage-800 transition-all shadow-sm hover:shadow-md"
                              >
                                <span>{block.name || "Learn More"}</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          );
                        }
                        return null;
                      })}
                  </div>
                </div>
              )}

              {/* Banner quick metrics row */}
              <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { value: '5K+', label: 'Corporate Profiles Vetted' },
                  { value: '40%', label: 'Evaluation Discrepancy Reduction' },
                  { value: '4 / 4', label: 'Perfect ISO 14001 Audits' },
                  { value: '7+ Yrs', label: 'Process Systems Experience' }
                ].map((stat, idx) => (
                  <div key={idx} className="bg-white/80 backdrop-blur border border-sage-200 p-5 rounded-2xl shadow-sm">
                    <div className="font-display text-2xl lg:text-3xl font-bold text-sage-700">{stat.value}</div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-sage-800 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Interactive Career Explorer with simplified information and direct redirection redirects */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-sage-200/50">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-[10px] font-mono uppercase bg-sage-200 text-sage-800 px-3 py-1 rounded-full font-bold tracking-widest border border-sage-300">
                Corporate Foundations
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-sage-950">
                Stewardship & Governance Timeline
              </h2>
              <p className="mt-2 text-sm text-sage-800 font-light">
                Click on any organization to drill down into corresponding SOP audits, key process metrics, and precise emission mitigation outcomes at our interactive Experience Dashboard.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentMilestones.map((milestone) => (
                <div
                  key={milestone.id}
                  id={`stewardship-company-card-${milestone.id}`}
                  onClick={() => {
                    setSelectedMilestoneId(milestone.id);
                    setActiveTab('experience');
                  }}
                  className="bg-white hover:bg-sage-100/30 border border-sage-200 hover:border-sage-300 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer flex flex-col justify-between h-full relative overflow-hidden"
                >
                  {/* Accent Top border */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 ${
                    milestone.id === 'nse' 
                      ? 'bg-emerald-700' 
                      : milestone.id.includes('sustainalytics') 
                        ? 'bg-teal-700' 
                        : milestone.id === 'akshaya-patra'
                          ? 'bg-orange-600'
                          : 'bg-stone-800'
                  }`} />

                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <span className="font-mono text-[9px] font-bold text-sage-600 uppercase tracking-widest bg-sage-50 border border-sage-100 px-2 py-0.5 rounded">
                        {milestone.period}
                      </span>
                      <span className="text-xs font-mono font-bold text-sage-700 flex items-center">
                        <MapPin className="w-3 h-3 mr-1 text-sage-400" /> {milestone.location.split(',')[0]}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-display font-bold text-lg text-sage-950 tracking-tight leading-snug">
                        {milestone.company}
                      </h3>
                      <p className="font-display text-xs font-semibold text-sage-700">
                        {milestone.role}
                      </p>
                    </div>

                    {/* Quick Metric box */}
                    <div className="bg-sage-50/70 border border-sage-100 rounded-2xl p-4 flex items-center justify-between">
                      <div>
                        <span className="block font-display text-lg font-extrabold text-sage-900 leading-none">
                          {milestone.keyMetric}
                        </span>
                        <span className="block text-[8px] font-mono tracking-wider uppercase text-sage-500 font-bold mt-1">
                          {milestone.keyMetricLabel}
                        </span>
                      </div>
                      <div className="px-2 py-1 bg-white rounded-lg border border-sage-200 text-sage-700 font-bold text-[9px] uppercase font-mono">
                        {milestone.id.includes('sustainalytics') 
                          ? 'MORN' 
                          : milestone.id === 'akshaya-patra'
                            ? 'NGO'
                            : milestone.id.toUpperCase()}
                      </div>
                    </div>

                    <p className="text-xs text-sage-800 leading-relaxed font-light line-clamp-3">
                      {milestone.summary}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-sage-100 flex items-center justify-between group-hover:text-sage-700 transition-colors">
                    <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-sage-600 group-hover:text-sage-800">
                      View Detailed Experience
                    </span>
                    <div className="p-1.5 rounded-lg bg-sage-50 group-hover:bg-sage-100 text-sage-700 transition-colors duration-300">
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* Tab 2: Professional Experience & Interactive Verification Dashboard */}
      {activeTab === 'experience' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          {/* Header area */}
          <div className="mb-12">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-sage-200 text-sage-800 border border-sage-300" style={{ color: '#f4eded' }}>
              Assurance Live Dashboard
            </span>
            <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-sage-950">
              ESG Research & Process Excellence
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-sage-800 max-w-2xl font-light">
              Interactive process metrics tracked and monitored across key roles, highlighting direct scrap reductions, carbon compliance metrics, and auditing timelines.
            </p>
          </div>

          {/* DEDICATED CORPORATE EXPERIENCE DEEP-DIVE INFORMATION */}
          <div className="bg-white border border-sage-200 rounded-3xl p-6 sm:p-10 shadow-sm mb-16 relative overflow-hidden">

            <div className="flex items-center space-x-2.5 mb-6">
              <Briefcase className="w-4 h-4 text-sage-700" />
              <span className="text-[10px] font-mono font-semibold tracking-wider text-sage-700 uppercase">
                Interactive Career Drilldown
              </span>
            </div>

            {/* HIGH-CONTRAST SEGMENTED TABS REGION FOR CORPORATES */}
            <div className="flex flex-wrap gap-2.5 mb-8 bg-sage-100 p-1.5 rounded-2xl max-w-2xl border border-sage-200/40">
              {currentMilestones.map((milestone) => {
                const isActive = selectedMilestoneId === milestone.id;
                return (
                  <button
                    key={milestone.id}
                    id={`experience-tab-corporate-${milestone.id}`}
                    onClick={() => setSelectedMilestoneId(milestone.id)}
                    className={`flex-grow sm:flex-initial px-5 py-2.5 rounded-xl font-display text-xs font-bold transition-all duration-300 uppercase tracking-normal text-center ${
                      isActive
                        ? 'bg-sage-700 text-white shadow-sm'
                        : 'text-sage-700 hover:text-sage-950 hover:bg-sage-200/60'
                    }`}
                  >
                    {milestone.company.split(' ')[0]}
                  </button>
                );
              })}
            </div>

            {/* MAIN SELECTIVE CORPORATE DRILLDOWN CONTAINER */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 border-t border-sage-100 pt-8 animate-fade-in">
              
              {/* Left summary side */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <h2 className="font-display font-black text-2xl sm:text-3xl text-sage-950 tracking-tight leading-tight">
                    {selectedMilestone.company}
                  </h2>
                  <p className="font-display font-bold text-sm text-sage-700 mt-1">
                    {selectedMilestone.role}
                  </p>
                  <p className="text-[11px] font-mono text-sage-500 mt-0.5">
                    {selectedMilestone.period} &bull; {selectedMilestone.location}
                  </p>
                </div>

                {/* Scope panel */}
                <div className="bg-sage-50/50 border border-sage-200/40 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between border-b border-sage-100 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-sage-700">Scope of Influence</span>
                    <span className="font-mono text-xs font-extrabold text-sage-800 bg-white px-2.5 py-0.5 rounded-lg border border-sage-200/60">
                      {selectedMilestone.keyMetric}
                    </span>
                  </div>
                  <p className="text-xs text-sage-800 leading-relaxed font-light">
                    {selectedMilestone.summary}
                  </p>
                  <div className="text-[9px] font-mono text-sage-500 italic">
                    Key Performance metric: {selectedMilestone.keyMetricLabel}
                  </div>
                </div>

                {/* Tool Stack */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-mono font-bold tracking-widest text-sage-700 uppercase">
                    Process Stacks & Compliance
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMilestone.toolsUsed.map((tool, i) => (
                      <span key={i} className="bg-sage-100 border border-sage-200/85 px-3 py-1 rounded-full text-[10px] font-mono font-semibold text-sage-800">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right list of operations & achievements */}
              <div className="lg:col-span-7 space-y-8">
                {/* Daily System Responsibilities */}
                <div className="space-y-4">
                  <h3 className="text-xs font-mono font-bold tracking-widest text-sage-800 uppercase border-b border-sage-200 pb-2 flex items-center justify-between">
                    <span>Daily Systems Audits & Scope</span>
                    <span className="text-[9px] font-normal text-sage-500 lowercase font-mono">operational checklists</span>
                  </h3>
                  <div className="space-y-3">
                    {selectedMilestone.responsibilities.map((resp, i) => (
                      <div key={i} className="flex items-start space-x-3 bg-sage-50/20 p-2.5 rounded-xl border border-transparent hover:border-sage-100/60 hover:bg-sage-50/40 transition-all duration-200">
                        <div className="bg-sage-100 flex-shrink-0 p-1 rounded-lg text-sage-700 mt-0.5">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <p className="text-xs text-sage-850 leading-relaxed">
                          {resp}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Measurable Achievements */}
                <div className="space-y-4">
                  <h3 className="text-xs font-mono font-bold tracking-widest text-sage-800 uppercase border-b border-sage-200 pb-2 flex items-center justify-between">
                    <span>Key Performance Outcomes</span>
                    <span className="text-[9px] font-normal text-sage-500 lowercase font-mono">verifiable results</span>
                  </h3>
                  <div className="space-y-3">
                    {selectedMilestone.achievements.map((ach, i) => (
                      <div key={i} className="flex items-start space-x-3 bg-emerald-50/25 p-2.5 rounded-xl border border-emerald-100/30 hover:border-emerald-200/65 hover:bg-emerald-50/40 transition-all duration-200">
                        <div className="bg-emerald-50 flex-shrink-0 p-1 rounded-lg text-emerald-700 mt-0.5 border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                        <p className="text-xs text-sage-950 font-medium leading-relaxed">
                          {ach}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="border-t border-sage-200 pt-16 mb-8">
            <h2 className="font-display text-xl font-bold tracking-tight text-sage-950">
              Global Assurance Operations Summary
            </h2>
            <p className="text-xs text-sage-600 font-light mt-1 max-w-xl">
              Live corporate process monitoring records, statistical standardization QA hierarchies, and auditing toolkits utilized across standard operating procedures.
            </p>
          </div>

          {/* Interactive Compliance & Quality metrics cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {currentEsgMetrics.map((metric) => (
              <div key={metric.id} className="bg-white border border-sage-200 rounded-2xl p-5 shadow-sm relative overflow-hidden">
                <div className="flex justify-between items-start mb-3">
                  <span className={`px-2 py-0.5 rounded text-[8px] font-mono tracking-wider uppercase font-semibold border ${
                    metric.status === 'Ahead' 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                      : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                  }`}>
                    {metric.status}
                  </span>
                  <span className="text-xs font-mono font-bold text-sage-700">{metric.currentValue}</span>
                </div>

                <h3 
                  className="font-display font-bold text-sm text-sage-950 leading-tight"
                  style={metric.id === 'waste' ? { height: '76.8984px', width: '160px' } : undefined}
                >
                  {metric.title}
                </h3>
                
                {/* Micro Progress Bar SVG */}
                <div className="mt-4 space-y-1">
                  <div className="flex justify-between text-[9px] font-mono text-sage-800">
                    <span>Baseline Tracking</span>
                    <span>Target: {metric.targetValue}</span>
                  </div>
                  <div className="w-full h-1.5 bg-sage-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${metric.status === 'Ahead' ? 'bg-emerald-600' : 'bg-sage-700'}`}
                      style={{ width: `${metric.progressPercentage}%` }}
                    />
                  </div>
                </div>

                <p className="text-[10px] text-sage-800 mt-3 leading-relaxed">
                  {metric.description}
                </p>
                <div className="text-[9px] font-mono text-sage-800 mt-2 border-t border-sage-100 pt-2 flex justify-between">
                  <span>Standard Unit</span>
                  <span className="font-semibold">{metric.unit}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Process Excellence details */}
            <div className="lg:col-span-7 bg-white border border-sage-200 rounded-3xl p-6 sm:p-10 shadow-sm">
              <div className="flex items-center space-x-2 pb-2 border-b border-sage-200/60 mb-6">
                <Settings className="w-5 h-5 text-sage-700" />
                <h2 className="font-display text-lg font-bold tracking-tight text-sage-950">
                  Methodology: Standardization & QA Integration
                </h2>
              </div>

              <div className="prose text-xs text-sage-800 space-y-4">
                <p className="leading-relaxed">
                  In both manufacturing environments (BorgWarner) and complex financial information networks (NSE, Sustainalytics), quality is not an afterthought&mdash;it is engineered into the system. Our proprietary framework uses a three-tier standardization matrix:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
                  <div className="bg-sage-50 border border-sage-200 rounded-xl p-4">
                    <span className="font-mono text-[9px] font-bold text-stone-500 uppercase block">Phase 1</span>
                    <span className="font-display text-xs font-bold text-sage-950 block mt-1">Data Ingest Audit</span>
                    <p className="text-[10px] text-sage-800 mt-1">Evaluating raw disclosures to isolate standard regulatory discrepancies immediately.</p>
                  </div>
                  <div className="bg-sage-100/50 border border-sage-200 rounded-xl p-4">
                    <span className="font-mono text-[9px] font-bold text-stone-500 uppercase block">Phase 2</span>
                    <span className="font-display text-xs font-bold text-sage-950 block mt-1">Algorithmic Filters</span>
                    <p className="text-[10px] text-sage-800 mt-1">Using deep spreadsheet formula checkpoints to monitor material integrity flags.</p>
                  </div>
                  <div className="bg-sage-100 border border-sage-200 rounded-xl p-4">
                    <span className="font-mono text-[9px] font-bold text-stone-500 uppercase block">Phase 3</span>
                    <span className="font-display text-xs font-bold text-sage-950 block mt-1">SOP Vetting</span>
                    <p className="text-[10px] text-sage-800 mt-1">Strict final peer-review and validation matrices ensuring absolute compliance output.</p>
                  </div>
                </div>

                <h3 className="font-display font-bold text-sm text-sage-950 pt-2">
                  Frequently Tested Auditing Processes
                </h3>
                
                <div className="space-y-4 mt-3">
                  {processFaqs.map((faq, idx) => (
                    <div key={idx} className="border-b border-sage-200 pb-3">
                      <button 
                        onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                        className="w-full flex justify-between items-center text-left text-xs font-semibold font-display text-sage-950 hover:text-sage-700 focus:outline-none"
                      >
                        <span>{faq.q}</span>
                        <span className="text-sage-500 text-lg ml-2">{activeFaq === idx ? '−' : '+'}</span>
                      </button>
                      {activeFaq === idx && (
                        <p className="text-[10px] sm:text-xs text-sage-800 mt-2 leading-relaxed pl-2 border-l-2 border-sage-300">
                          {faq.a}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quality Toolkit & Standard Operating SOPs indicator */}
            <div className="lg:col-span-5 bg-white border border-sage-200 rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-center space-x-2 pb-2 mb-6 border-b border-sage-200">
                <Database className="w-5 h-5 text-sage-700" />
                <h3 className="font-display text-sm font-bold tracking-tight text-sage-950">
                  Data Audit Infrastructure
                </h3>
              </div>

              <div className="space-y-6">
                {[
                  { title: 'Excel Dynamic Matrix Modeling', percent: 98, color: 'bg-emerald-600', icon: FileSpreadsheet, desc: 'Advanced multidimensional arrays, recursive VBA algorithms, and high-fidelity scenario modeling trackers.' },
                  { title: 'Regulatory Reporting Standards', percent: 92, color: 'bg-sage-800', icon: Layers, desc: 'Experienced in formal BRSR mandates, SASB materiality maps, standard CSR disclosures and GRI standards.' },
                  { title: 'ISO Process Systems Management', percent: 90, color: 'bg-indigo-900', icon: Settings, desc: 'ISO 14001, ISO 9001, Six Sigma Green Belt root-cause-analyses, FMEA assembly grids.' }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="bg-sage-50/50 border border-sage-200/60 p-4 rounded-xl">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="p-2 bg-white rounded-lg border border-sage-200 text-sage-700">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-display font-semibold text-xs text-sage-950 leading-tight">
                            {item.title}
                          </h4>
                          <span className="text-[9px] font-mono text-sage-800 uppercase block mt-0.5">Assurance Level: {item.percent}%</span>
                        </div>
                      </div>
                      
                      {/* Metric rating line */}
                      <div className="w-full h-1 bg-sage-200 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.percent}%` }} />
                      </div>
                      
                      <p className="text-[10px] text-sage-800 mt-2 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Tab 3: Impact & Quality Skills Hub */}
      {activeTab === 'skills' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-12">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-sage-200 text-sage-800 border border-sage-300">
              Technical Competencies
            </span>
            <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-sage-950">
              Impact & Quality Skills Hub
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-sage-800 max-w-2xl font-light">
              Our core capabilities segmented by discipline. Filter competencies using the switcher below to inspect technical score ratios and descriptions.
            </p>
          </div>

          {/* Skill Filter Switcher */}
          <div className="flex flex-wrap gap-2 mb-8 bg-sage-100 p-1 rounded-xl max-w-lg">
            {['all', 'ESG & Sustainability', 'Quality Engineering', 'Strategic Tools'].map((cat, idx) => (
              <button
                key={idx}
                id={`skill-filter-${cat.replace(/\s+/g, '-').toLowerCase()}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-display font-semibold transition-all uppercase tracking-normal ${
                  selectedCategory === cat
                    ? 'bg-sage-700 text-white shadow-sm'
                    : 'text-sage-700 hover:text-sage-950 hover:bg-sage-200/50'
                }`}
              >
                {cat === 'all' ? 'All Skills' : cat}
              </button>
            ))}
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredSkills.map((skill, index) => (
              <div 
                key={index} 
                className="bg-white border border-sage-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-sage-200 group-hover:bg-sage-700 transition-colors" />
                
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[9px] font-mono text-sage-800 uppercase tracking-wider font-semibold">
                    {skill.category}
                  </span>
                  <span className="font-mono text-xs font-bold text-sage-700">
                    {skill.score}%
                  </span>
                </div>

                <h3 className="font-display font-bold text-sm text-sage-950 mb-1">
                  {skill.name}
                </h3>
                
                <div className="w-full h-1.5 bg-sage-100 rounded-full overflow-hidden mb-3">
                  <div className="h-full bg-sage-700 rounded-full" style={{ width: `${skill.score}%` }} />
                </div>

                <p className="text-[10px] text-sage-800 leading-relaxed">
                  {skill.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Certifications & Framework Accents */}
          <div className="mt-16 bg-white border border-sage-200 rounded-3xl p-6 sm:p-10 shadow-sm">
            <div className="flex items-center space-x-2 pb-2 mb-8 border-b border-sage-200">
              <Award className="w-5 h-5 text-sage-700" />
              <h2 className="font-display text-lg font-bold tracking-tight text-sage-950">
                Rigorous Industry Professional Credentials & Certifications
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentCertifications.map((cert) => (
                <div key={cert.id} className="bg-sage-50 border border-sage-200/60 p-5 rounded-2xl flex items-start gap-4">
                  <div className="p-3 bg-white rounded-xl border border-sage-200 flex-shrink-0 text-sage-700">
                    <Award className="w-5 h-5 text-sage-700" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-display font-semibold text-xs sm:text-sm text-sage-950 leading-tight">
                      {cert.title}
                    </h3>
                    <p className="text-[11px] text-sage-800 font-medium">
                      Issuer: {cert.issuer} &bull; <span className="font-mono text-[10px]">{cert.date}</span>
                    </p>
                    {cert.credentialId && (
                      <span className="text-[9px] font-mono uppercase tracking-wider text-sage-800 block bg-white px-2 py-0.5 rounded border border-sage-200/50 w-fit">
                        ID: {cert.credentialId}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}

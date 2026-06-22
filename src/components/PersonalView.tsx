import { useState, useEffect } from 'react';
import { 
  PERSONAL_STATS, 
  EXCEL_PROJECTS, 
  JYOTIRLINGAS_INITIAL,
  IMMERSIVE_LAB_NODES,
  Jyotirlinga,
  ExcelProject
} from '../types';
import { 
  Youtube, 
  CheckCircle, 
  Lock, 
  ExternalLink, 
  BookOpen, 
  Coins, 
  ChevronDown, 
  ChevronUp, 
  Database, 
  Sparkles, 
  Compass, 
  ArrowRight,
  Monitor,
  Check,
  Cpu,
  Bookmark,
  TrendingUp,
  RotateCcw
} from 'lucide-react';

interface PersonalViewProps {
  activeTab: string;
}

export default function PersonalView({ activeTab }: PersonalViewProps) {
  // Persistence of Jyotirlingas visited status using localStorage
  const [jyotirlingas, setJyotirlingas] = useState<Jyotirlinga[]>(() => {
    const cached = localStorage.getItem('jyotirlingas_progress');
    if (cached) {
      try { return JSON.parse(cached); } catch (e) { /* fallback */ }
    }
    return JYOTIRLINGAS_INITIAL;
  });

  const [expandedExcelProject, setExpandedExcelProject] = useState<string | null>(null);
  const [activeLabNode, setActiveLabNode] = useState<string>('gemini');
  const [labConsoleOutput, setLabConsoleOutput] = useState<string[]>([
    'Initializing Immersive Lab Systems...',
    'Loading AI Model Weights: Gemini Pro API v1.5...',
    'Ready. Click nodes above to inspect tooling pipelines.'
  ]);

  // Terminal Download States
  const [downloadingProjectId, setDownloadingProjectId] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [showTerminalModal, setShowTerminalModal] = useState<boolean>(false);
  const [terminalMessage, setTerminalMessage] = useState<string>('');

  useEffect(() => {
    localStorage.setItem('jyotirlingas_progress', JSON.stringify(jyotirlingas));
  }, [jyotirlingas]);

  // Toggle visited status of a Jyotirlinga
  const toggleJyotirlinga = (id: string) => {
    setJyotirlingas(prev => 
      prev.map(j => j.id === id ? { ...j, visited: !j.visited } : j)
    );
  };

  // Reset pilgrimage checklist
  const resetPilgrimage = () => {
    setJyotirlingas(JYOTIRLINGAS_INITIAL.map(j => ({ ...j, visited: false })));
  };

  const visitedCount = jyotirlingas.filter(j => j.visited).length;
  const visitedPercentage = Math.round((visitedCount / 12) * 100);

  // Generate a progress description statement based on visited count
  const getPilgrimageStatusText = (count: number) => {
    if (count === 0) return "Quiet seeker. The spiritual lines await your first steps.";
    if (count <= 3) return "Initiating the alignment. Beginning exploration of the sacred geologies.";
    if (count <= 7) return "Subcontinental Pilgrim. Connecting the energy vertexes of Indian geography.";
    if (count <= 11) return "Advanced Sadhaka. Resonance established across multiple ancient sacred zones.";
    return "Maha Purna. Harmonious completion of the twelve pillars of spiritual light!";
  };

  // Simulated download action
  const triggerSimulatedDownload = (project: ExcelProject, fileType: 'sheet' | 'doc') => {
    setDownloadingProjectId(project.id);
    setDownloadProgress(0);
    setShowTerminalModal(true);
    setTerminalMessage(`ESTABLISHING COMPRESSION STACK FOR: ${project.title}`);
    
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setDownloadingProjectId(null);
            setTerminalMessage(`SECURE TRANSFER COMPLETE. Successfully mounted ${fileType === 'sheet' ? '.xlsx Binary Database' : '.pdf Technical Blueprint'} to standard host directory.`);
          }, 600);
          return 100;
        }
        return prev + 20;
      });
    }, 150);
  };

  const currentLabNodeInfo = IMMERSIVE_LAB_NODES.find(n => n.id === activeLabNode) || IMMERSIVE_LAB_NODES[3];

  const handleNodeClick = (nodeId: string, label: string) => {
    setActiveLabNode(nodeId);
    setLabConsoleOutput(prev => [
      `[SYSTEM] Connecting to node endpoint: ${label.toUpperCase()}...`,
      `[MODEL] Streaming context weights & workflow mapping.`,
      `[MOUNT] Pipeline connection is healthy and secure.`,
      ...prev.slice(0, 3)
    ]);
  };

  return (
    <div className="bg-obsidian-950 text-neutral-100 min-h-screen font-sans pb-24">
      
      {/* Tab 1: "The Personal Interests Hub" */}
      {activeTab === 'personal-hub' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          {/* Hero Branding Area */}
          <div className="mb-16">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-teal-500/10 text-teal-400 border border-teal-500/20">
              Creative Perspective & Interests
            </span>
            <h1 className="mt-4 font-display text-4xl sm:text-5xl font-bold tracking-tight text-neutral-100">
              The Personal Interests Hub
            </h1>
            <p className="mt-4 text-xs sm:text-sm text-neutral-400 max-w-2xl font-light leading-relaxed">
              Dismantling global processes in professional frameworks leaves a creative residue. Here is the architecture of ideas, continuous self-education, and travel.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
            
            {/* Left Column: YouTube Channel Spec */}
            <div className="lg:col-span-7 bg-obsidian-900 border border-neutral-800 rounded-3xl p-6 sm:p-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 rounded-bl-full pointer-events-none group-hover:bg-red-600/10 transition-colors" />
              
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-red-600/10 text-red-500 rounded-2xl border border-red-500/20">
                  <Youtube className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase block">Active Content Channel</span>
                  <h3 className="font-display font-extrabold text-xl text-neutral-100">
                    "Uncovrd Minds"
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-6">
                An active media experiment curated by Dikshant. Focusing on explaining psychological matrices, systems analysis, evolutionary constraints of the human brain, and ancient civilizational histories in a highly scannable, engaging format.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-obsidian-950 border border-neutral-800/80 p-4 rounded-xl">
                  <span className="block text-2xl font-display font-bold text-neutral-100">6,500+</span>
                  <span className="block text-[9px] font-mono text-neutral-400 uppercase tracking-wider mt-0.5">Subscribed Learners</span>
                </div>
                <div className="bg-obsidian-950 border border-neutral-800/80 p-4 rounded-xl">
                  <span className="block text-2xl font-display font-bold text-neutral-100">240K+</span>
                  <span className="block text-[9px] font-mono text-neutral-400 uppercase tracking-wider mt-0.5">Organic Content Views</span>
                </div>
              </div>

              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-neutral-100 text-obsidian-950 font-display text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors"
              >
                <span>Navigate Channel</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Right Column: Terminal Curiosity Quick Stats Grid */}
            <div className="lg:col-span-5 space-y-6">
              <h4 className="text-xs font-mono font-bold tracking-widest text-neutral-400 uppercase border-b border-neutral-800 pb-2">
                Curiosity Metrics
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {PERSONAL_STATS.map((stat, idx) => (
                  <div key={idx} className="bg-obsidian-900 border border-neutral-800 p-5 rounded-2xl">
                    <span className="font-display text-2xl font-extrabold text-teal-400 block">{stat.value}</span>
                    <span className="font-display font-semibold text-xs text-neutral-100 block mt-1">{stat.label}</span>
                    <p className="text-[10px] text-neutral-400 leading-normal mt-1.5">{stat.description}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Spiritual Odyssey: The 12 Jyotirlingas pilgrimage */}
          <div className="bg-obsidian-900 border border-neutral-800 rounded-3xl p-6 sm:p-10 relative overflow-hidden">
            
            {/* Header info */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-neutral-800 mb-8">
              <div className="space-y-1">
                <span className="inline-flex items-center space-x-1.5 text-[9px] font-mono text-amber-400 uppercase tracking-widest bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
                  <Compass className="w-3 h-3 text-amber-400" />
                  <span>Subcontinental Sacred Geologies</span>
                </span>
                <h3 className="font-display font-extrabold text-2xl text-neutral-100 mt-2">
                  Spiritual Odyssey: The 12 Jyotirlingas
                </h3>
                <p className="text-xs text-neutral-400 max-w-xl">
                  Exploring the ancient energetic vertices of the Indian subcontinent. Tap tiles to record visited sites and watch the dynamic pilgrimage compass adjust.
                </p>
              </div>

              {/* Progress Radial Stats */}
              <div className="bg-obsidian-950 border border-neutral-800/80 p-5 rounded-2xl flex items-center space-x-4">
                {/* SVG Progress Circle */}
                <div className="relative w-16 h-16">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle 
                      cx="32" cy="32" r="28" 
                      className="text-neutral-800" 
                      strokeWidth="4" stroke="currentColor" fill="transparent" 
                    />
                    <circle 
                      cx="32" cy="32" r="28" 
                      className="text-amber-500 transition-all duration-500" 
                      strokeWidth="4" strokeDasharray={175} strokeDashoffset={175 - (175 * visitedPercentage) / 100}
                      strokeLinecap="round" stroke="currentColor" fill="transparent" 
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center font-mono text-xs font-bold text-neutral-100">
                    {visitedPercentage}%
                  </span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[9px] font-mono text-neutral-400 uppercase block">Pilgrimage Matrix</span>
                  <span className="text-sm font-display font-bold text-neutral-100 block">{visitedCount} / 12 Visited</span>
                  <button 
                    onClick={resetPilgrimage}
                    className="text-[9px] font-mono text-amber-400 hover:text-amber-300 flex items-center mt-1"
                  >
                    <RotateCcw className="w-2.5 h-2.5 mr-1" /> Reset Checklist
                  </button>
                </div>
              </div>
            </div>

            <p className="font-mono text-[10px] text-amber-400 italic mb-6">
              PILGRIMAGE FEEDBACK: "{getPilgrimageStatusText(visitedCount)}"
            </p>

            {/* Grid of the 12 Jyotirlingas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {jyotirlingas.map((j) => (
                <button
                  key={j.id}
                  id={`jyotirlinga-card-${j.id}`}
                  onClick={() => toggleJyotirlinga(j.id)}
                  className={`text-left p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                    j.visited
                      ? 'bg-amber-400/5 border-amber-400/40 shadow-[0_0_15px_rgba(245,158,11,0.05)]'
                      : 'bg-obsidian-950 border-neutral-800 hover:border-neutral-700 hover:bg-obsidian-900'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex justify-between items-start">
                      <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-wide">
                        {j.state}
                      </span>
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                        j.visited ? 'border-amber-400 bg-amber-400 text-obsidian-950' : 'border-neutral-700'
                      }`}>
                        {j.visited && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                    
                    <h4 className="font-display font-bold text-sm text-neutral-100 mt-1">
                      {j.name}
                    </h4>
                    <span className="text-[10px] text-neutral-300 font-medium block">
                      {j.location}
                    </span>
                  </div>

                  <p className="text-[10px] text-neutral-400 mt-3 leading-normal font-light">
                    {j.deitySpec}
                  </p>
                </button>
              ))}
            </div>

          </div>

        </div>
      )}

      {/* Tab 2: "Excel Architecture & Financial Repositories" */}
      {activeTab === 'excel-modeling' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          <div className="mb-12">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-teal-500/10 text-teal-400 border border-teal-500/20">
              Quantitative Spreadsheets
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-neutral-100">
              Excel Architecture & Modeling
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-neutral-400 max-w-2xl font-light">
              We reject elementary spreadsheet templates. These are production-ready financial calculations, robust scenario sliders, and Power Query dynamic aggregation sheets.
            </p>
          </div>

          {/* Project List */}
          <div className="space-y-6">
            {EXCEL_PROJECTS.map((project) => {
              const isExpanded = expandedExcelProject === project.id;
              return (
                <div 
                  key={project.id}
                  id={`excel-project-card-${project.id}`}
                  className="bg-obsidian-900 border border-neutral-800 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  {/* Card Header clickable area */}
                  <div 
                    onClick={() => setExpandedExcelProject(isExpanded ? null : project.id)}
                    className="p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 cursor-pointer hover:bg-neutral-800/20 transition-colors"
                  >
                    <div className="space-y-1 max-w-2xl">
                      <span className="text-[9px] font-mono text-teal-400 uppercase tracking-widest">
                        {project.category}
                      </span>
                      <h3 className="font-display font-extrabold text-lg sm:text-xl text-neutral-100">
                        {project.title}
                      </h3>
                      <p className="text-xs text-neutral-400 leading-normal">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex items-center space-x-3 self-stretch sm:self-auto justify-between border-t border-neutral-800 pt-3 sm:pt-0 sm:border-0">
                      <div className="flex flex-wrap gap-1.5 justify-end">
                        {project.metrics.slice(0, 1).map((m, idx) => (
                          <span key={idx} className="bg-teal-500/10 border border-teal-500/20 text-teal-400 font-mono text-[9px] px-2 py-0.5 rounded">
                            {m}
                          </span>
                        ))}
                      </div>
                      
                      <div className="p-2 bg-obsidian-950 rounded-lg text-neutral-400">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>

                  {/* Expandable Details Block */}
                  {isExpanded && (
                    <div className="px-6 pb-8 border-t border-neutral-800/60 pt-6 bg-obsidian-950/45">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        
                        <div className="space-y-4">
                          <div>
                            <span className="text-[9px] font-mono text-red-400 uppercase font-semibold tracking-wider block">The Structural Challenge</span>
                            <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                              {project.challenge}
                            </p>
                          </div>
                          <div>
                            <span className="text-[9px] font-mono text-emerald-400 uppercase font-semibold tracking-wider block">Engineering Solution</span>
                            <p className="text-xs text-neutral-300 mt-1 leading-relaxed font-light">
                              {project.solution}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div>
                            <span className="text-[9px] font-mono text-neutral-400 uppercase block">Project Outcome Benchmarks</span>
                            <div className="mt-2 space-y-1.5">
                              {project.metrics.map((metric, idx) => (
                                <div key={idx} className="flex items-center space-x-2 text-xs">
                                  <Check className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
                                  <span className="text-neutral-200 font-mono text-[11px] font-semibold">{metric}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <span className="text-[9px] font-mono text-neutral-400 uppercase block">Engine Toolset</span>
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {project.stack.map((item, idx) => (
                                <span key={idx} className="bg-neutral-800 border border-neutral-700 text-neutral-300 font-mono text-[9px] px-2.5 py-1 rounded-md">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Trigger simulated Actions */}
                          <div className="flex flex-wrap gap-3 pt-2">
                            <button
                              onClick={() => triggerSimulatedDownload(project, 'sheet')}
                              className="px-4 py-2.5 rounded-xl bg-teal-500 text-obsidian-950 font-display text-[10px] font-bold uppercase tracking-wider hover:bg-teal-400 transition-colors flex items-center space-x-1.5"
                            >
                              <Database className="w-3.5 h-3.5" />
                              <span>Access Source File</span>
                            </button>
                            <button
                              onClick={() => triggerSimulatedDownload(project, 'doc')}
                              className="px-4 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-200 font-display text-[10px] font-bold uppercase tracking-wider hover:bg-neutral-700 transition-colors flex items-center space-x-1.5"
                            >
                              <BookOpen className="w-3.5 h-3.5" />
                              <span>View Documentation</span>
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* Tab 3: "The Immersive Lab" (Interactive custom node ecosystem dashboard) */}
      {activeTab === 'immersive-lab' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-teal-400/10 text-teal-400 border border-teal-500/20">
              Interactive System Canvas
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-neutral-100">
              The Immersive Lab
            </h1>
            <p className="mt-2 text-xs text-neutral-400 font-light max-w-md mx-auto">
              A responsive, live orchestration canvas showing how I deploy tools alongside high-fidelity compliance scripts. Tap any orbital node below to examine workflows.
            </p>
          </div>

          {/* Interactive node arena layout */}
          <div className="relative w-full h-[380px] bg-obsidian-900 border border-neutral-850 rounded-3xl overflow-hidden shadow-inner mb-6 flex items-center justify-center">
            
            {/* Orbital path lines */}
            <div className="absolute inset-0 pointer-events-none opacity-40 flex items-center justify-center">
              <div className="absolute w-[180px] h-[180px] rounded-full border border-dashed border-neutral-800 animate-[spin_40s_linear_infinite]" />
              <div className="absolute w-[300px] h-[300px] rounded-full border border-dashed border-neutral-800 animate-[spin_60s_linear_infinite]" />
              <div className="absolute w-[450px] h-[450px] rounded-full border border-neutral-800" />
            </div>

            {/* Nodes Map */}
            {IMMERSIVE_LAB_NODES.map((node) => {
              const isActive = activeLabNode === node.id;
              return (
                <button
                  key={node.id}
                  id={`lab-node-button-${node.id}`}
                  onClick={() => handleNodeClick(node.id, node.label)}
                  className="absolute group transition-transform hover:scale-115 focus:outline-none"
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: isActive ? 20 : 10
                  }}
                >
                  <div className="relative flex flex-col items-center">
                    {/* Ring outer focus */}
                    <div 
                      className={`absolute -inset-1.5 rounded-full blur-sm opacity-60 transition-all ${
                        isActive ? 'scale-125 opacity-100' : 'scale-0 group-hover:scale-100'
                      }`}
                      style={{ backgroundColor: node.color }}
                    />
                    
                    {/* Circle bulb */}
                    <div 
                      className={`relative rounded-full font-display font-bold text-[10px] sm:text-xs flex items-center justify-center transition-all ${
                        isActive 
                          ? 'bg-neutral-100 text-obsidian-950 shadow-[0_0_15px_rgba(255,255,255,0.4)]' 
                          : 'bg-obsidian-950 text-neutral-400 group-hover:text-neutral-100'
                      } border`}
                      style={{ 
                        width: `${node.size}px`, 
                        height: `${node.size}px`,
                        borderColor: node.color
                      }}
                    >
                      {node.label.split(' ')[0]}
                    </div>
                    
                    {/* Node Text Flag */}
                    <span className={`text-[9px] font-mono tracking-wider font-semibold uppercase mt-1 px-1.5 py-0.5 rounded ${
                      isActive ? 'bg-neutral-100 text-obsidian-950' : 'bg-obsidian-950 text-neutral-400 border border-neutral-800/80'
                    }`}>
                      {node.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Connected console monitoring info block */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-obsidian-900 border border-neutral-800 p-6 rounded-2xl">
            
            {/* Connection logs on the left */}
            <div className="md:col-span-5 bg-obsidian-950 rounded-xl p-4 border border-neutral-850/80 font-mono text-[9px] text-teal-400 space-y-1 select-none h-[110px] overflow-y-auto">
              <span className="text-neutral-500 block mb-1 font-bold">// IMMERSIVE COMPILER TERMINAL:</span>
              {labConsoleOutput.map((log, idx) => (
                <div key={idx} className="leading-snug">
                  {log}
                </div>
              ))}
            </div>

            {/* Selected node information breakdown on the right */}
            <div className="md:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: currentLabNodeInfo.color }} />
                  <h3 className="font-display font-extrabold text-sm sm:text-base text-neutral-100">
                    Active Module: {currentLabNodeInfo.label}
                  </h3>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed mt-2 font-light">
                  {currentLabNodeInfo.desc} In our testing suites, we optimize outputs through direct API script triggers to maintain pristine compliance and verification chains.
                </p>
              </div>

              {/* Dynamic Action */}
              <div className="mt-4 pt-3 border-t border-neutral-800/80 flex justify-between items-center">
                <span className="text-[10px] font-mono text-neutral-400">Status: Active Integration</span>
                <span className="text-[9px] font-mono flex items-center text-teal-400">
                  Precision Level: Maximum &bull; Safe <Check className="w-3 h-3 ml-1" />
                </span>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Interactive Micro Simulator Console for Excel Downloads */}
      {showTerminalModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-obsidian-900 border border-neutral-800 max-w-lg w-full rounded-2xl overflow-hidden shadow-2xl">
            <div className="bg-obsidian-950 px-6 py-4 border-b border-neutral-850/80 flex justify-between items-center text-xs font-mono">
              <span className="text-teal-400 font-bold">excel-server-terminal.sh</span>
              <button 
                onClick={() => setShowTerminalModal(false)}
                className="text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 font-mono text-xs space-y-4">
              <div className="space-y-1 block text-[11px] text-neutral-300">
                <p className="text-neutral-500"># Command executed: ./fetch_resource.sh --quiet --bin</p>
                <p className="text-teal-400">{terminalMessage}</p>
              </div>

              {/* Loader */}
              {downloadingProjectId && (
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] text-neutral-400">
                    <span>Compressing dynamic tables...</span>
                    <span>{downloadProgress}%</span>
                  </div>
                  <div className="w-full h-1 bg-neutral-800 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-400 transition-all duration-150" style={{ width: `${downloadProgress}%` }} />
                  </div>
                </div>
              )}

              {!downloadingProjectId && (
                <div className="pt-4 border-t border-neutral-800/60 flex justify-end">
                  <button
                    onClick={() => setShowTerminalModal(false)}
                    className="px-4 py-2 rounded-lg bg-neutral-100 text-obsidian-950 font-display text-[10px] font-bold uppercase tracking-wider hover:bg-neutral-200"
                  >
                    Close Session
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

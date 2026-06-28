import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProfessionalView from './components/ProfessionalView';
import PersonalView from './components/PersonalView';
import ConnectView from './components/ConnectView';
import AdminView from './components/AdminView';
import { Sparkles } from 'lucide-react';
import { PortfolioData } from './types';

export default function App() {
  const [mode, setMode] = useState<'professional' | 'personal'>('professional');
  const [activeTab, setActiveTab] = useState<string>('stewardship');
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string>('nse');
  const [showAdmin, setShowAdmin] = useState(window.location.pathname === '/admin');

  // Dynamic portfolio customizer database state
  const [portfolio, setPortfolio] = useState<PortfolioData>({
    headline: "Engineering a Sustainable Future.",
    bio: "Professional journey of Dikshant Dahiya. Bridging technical rigor in process safety engineering with high-fidelity ESG research and system audit standards.",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    youtube: "https://youtube.com"
  });

  const fetchPortfolio = async () => {
    try {
      const res = await fetch('/api/portfolio');
      if (res.ok) {
        const data = await res.json();
        setPortfolio(data);
      }
    } catch (err) {
      console.error("Failed to load portfolio database:", err);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setShowAdmin(window.location.pathname === '/admin');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const isProd = mode === 'professional';

  if (showAdmin) {
    return (
      <AdminView 
        mode={mode} 
        portfolio={portfolio} 
        onRefresh={fetchPortfolio}
        onClose={() => {
          window.history.pushState({}, '', '/');
          setShowAdmin(false);
        }}
      />
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 flex flex-col ${
      isProd 
        ? 'bg-sage-50 text-sage-950' 
        : 'bg-obsidian-950 text-neutral-100'
    }`}>
      
      {/* Dynamic Top Announcement / Accent Banner */}
      <div className={`py-2 px-4 text-center font-mono text-[10px] sm:text-xs font-semibold tracking-widest uppercase border-b transition-colors duration-300 flex items-center justify-center space-x-2 ${
        isProd 
          ? 'bg-sage-100 border-sage-200 text-sage-800' 
          : 'bg-teal-950/40 border-neutral-850 text-teal-400'
      }`}>
        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
        <span>Duality Perspective Engine: {isProd ? 'Professional Stewardship Mode' : 'Subcontinental Personal Lab Active'}</span>
        <div className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 ml-2" />
      </div>

      {/* Shared Modular Navbar component */}
      <Navbar 
        mode={mode} 
        setMode={setMode} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        setShowAdmin={(val) => {
          if (val) window.history.pushState({}, '', '/admin');
          else window.history.pushState({}, '', '/');
          setShowAdmin(val);
        }}
      />

      {/* Primary Page Grid */}
      <main className="flex-grow">
        {activeTab === 'connect' ? (
          <ConnectView mode={mode} portfolio={portfolio} />
        ) : isProd ? (
          <ProfessionalView 
            activeTab={activeTab} 
            portfolio={portfolio} 
            setActiveTab={setActiveTab}
            selectedMilestoneId={selectedMilestoneId}
            setSelectedMilestoneId={setSelectedMilestoneId}
          />
        ) : (
          <PersonalView activeTab={activeTab} portfolio={portfolio} />
        )}
      </main>


      {/* Shared Design Philosophy Footer */}
      <footer className={`py-12 px-4 border-t transition-colors duration-300 ${
        isProd 
          ? 'bg-sage-100 border-sage-200 text-sage-800' 
          : 'bg-obsidian-900 border-neutral-800 text-neutral-400'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start space-x-2">
              <span className={`w-2 h-2 rounded-full ${isProd ? 'bg-sage-700' : 'bg-teal-400'}`} />
              <span className="font-display font-bold text-sm tracking-tight text-neutral-100">
                Duality Portfolio
              </span>
            </div>
            <p className="text-[10px] font-mono mt-1 text-neutral-400">
              {portfolio.footerName || "Dikshant Dahiya"} &copy; {new Date().getFullYear()} &bull; Professional & Personal Symmetry
            </p>
          </div>

          <div className="flex flex-col items-center sm:items-end gap-2 text-[10px] font-mono">
            <span className="text-neutral-500 text-center sm:text-right">
              Crafted with high-contrast Tailwind CSS &amp; modular React viewports.
            </span>
            <div className="flex items-center space-x-3 text-neutral-500">
              <span>Standard Compliance: Verified</span>
              <span>&bull;</span>
              <span>Host Port: 3000 Secured</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

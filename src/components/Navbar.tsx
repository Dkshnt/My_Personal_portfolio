import { Sun, Moon, Briefcase, User, Mail, Compass, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  mode: 'professional' | 'personal';
  setMode: (mode: 'professional' | 'personal') => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ mode, setMode, activeTab, setActiveTab }: NavbarProps) {
  const isProd = mode === 'professional';

  // Available tabs depends on the mode
  const professionalTabs = [
    { id: 'stewardship', label: 'Stewardship Portfolio', icon: ShieldCheck },
    { id: 'experience', label: 'Experience Dashboard', icon: Briefcase },
    { id: 'skills', label: 'Skills & Impact Hub', icon: Compass },
  ];

  const personalTabs = [
    { id: 'personal-hub', label: 'Personal Interests', icon: User },
    { id: 'excel-modeling', label: 'Excel Architecture', icon: Briefcase },
    { id: 'immersive-lab', label: 'The Immersive Lab', icon: Compass },
  ];

  const currentTabs = isProd ? professionalTabs : personalTabs;

  return (
    <nav className={`sticky top-0 z-50 transition-colors duration-300 border-b ${
      isProd 
        ? 'bg-sage-50/90 backdrop-blur-md border-sage-200/80 text-sage-950' 
        : 'bg-obsidian-950/90 backdrop-blur-md border-neutral-800 text-neutral-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand area */}
          <div className="flex items-center space-x-3">
            <div className={`relative flex items-center justify-center w-10 h-10 rounded-lg font-display font-bold text-lg transition-transform hover:scale-105 select-none ${
              isProd 
                ? 'bg-sage-700 text-white shadow-sm' 
                : 'bg-teal-500 text-obsidian-950 shadow-[0_0_15px_rgba(20,184,166,0.3)]'
            }`}>
              D
              <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border ${
                isProd ? 'bg-emerald-500 border-sage-50' : 'bg-amber-400 border-obsidian-950'
              }`} />
            </div>
            <div>
              <span className="font-display font-semibold text-lg tracking-tight block">
                Dikshant Dahiya
              </span>
              <span className={`text-[10px] font-mono leading-none tracking-wider uppercase block ${
                isProd ? 'text-sage-700' : 'text-teal-400'
              }`}>
                {isProd ? 'Stewardship & ESG Quality' : 'The Creative Duality Lab'}
              </span>
            </div>
          </div>

          {/* Center Tabs Navigation */}
          <div className="hidden md:flex items-center space-x-1 bg-black/5 dark:bg-white/5 p-1 rounded-full border border-black/5 dark:border-white/5">
            {currentTabs.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`nav-tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full font-display text-xs font-semibold tracking-wide uppercase transition-all duration-200 ${
                    isActive
                      ? isProd
                        ? 'bg-sage-700 text-white shadow-sm'
                        : 'bg-teal-500 text-obsidian-950 shadow-[0_0_10px_rgba(20,184,166,0.2)]'
                      : isProd
                        ? 'text-sage-700 hover:bg-sage-100 hover:text-sage-950'
                        : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
                  }`}
                >
                  <TabIcon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
            
            {/* Direct Connect Tab Switcher */}
            <button
              id="nav-tab-connect"
              onClick={() => setActiveTab('connect')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full font-display text-xs font-semibold tracking-wide uppercase transition-all duration-200 ${
                activeTab === 'connect'
                  ? isProd
                    ? 'bg-sage-950 text-white'
                    : 'bg-white text-obsidian-950'
                  : isProd
                    ? 'text-sage-700 hover:bg-sage-100 hover:text-sage-950'
                    : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Connect</span>
            </button>
          </div>

          {/* Mode Switch Panel */}
          <div className="flex items-center space-x-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 hidden sm:block">
              {isProd ? 'Professional' : 'Personal'}
            </span>
            
            <button
              id="mode-switch-button"
              onClick={() => {
                const target = isProd ? 'personal' : 'professional';
                setMode(target);
                // Set appropriate default sub-tab
                setActiveTab(target === 'professional' ? 'stewardship' : 'personal-hub');
              }}
              className={`relative inline-flex h-9 w-18 shrink-0 cursor-pointer items-center rounded-full border transition-colors duration-300 focus:outline-none ${
                isProd 
                  ? 'bg-sage-200 border-sage-300 hover:bg-sage-300' 
                  : 'bg-neutral-800 border-neutral-700 hover:bg-neutral-700'
              }`}
              title="Toggle Duality Perspectives"
            >
              <span
                className={`pointer-events-none flex items-center justify-center h-7 w-7 rounded-full bg-white text-obsidian-950 shadow-md ring-0 transition-transform duration-300 ${
                  isProd ? 'translate-x-1 text-sage-800' : 'translate-x-10 text-teal-600'
                }`}
              >
                {isProd ? (
                  <Sun className="w-3.5 h-3.5 text-sage-800" />
                ) : (
                  <Moon className="w-3.5 h-3.5 text-teal-400 fill-teal-400" />
                )}
              </span>
            </button>
          </div>

        </div>

        {/* Mobile Navigation tab bar */}
        <div className="flex md:hidden items-center justify-around py-3 border-t border-black/5 dark:border-white/5">
          {currentTabs.map((tab) => {
            const TabIcon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`nav-tab-mobile-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center space-y-1 py-1 px-3 rounded-md transition-all ${
                  isActive
                    ? isProd
                      ? 'text-sage-800 font-semibold'
                      : 'text-teal-400 font-semibold'
                    : 'text-neutral-500 hover:text-inherit'
                }`}
              >
                <TabIcon className="w-4 h-4" />
                <span className="text-[9px] uppercase tracking-wider font-semibold font-display">
                  {tab.label.split(' ')[0]}
                </span>
              </button>
            );
          })}
          <button
            id="nav-tab-mobile-connect"
            onClick={() => setActiveTab('connect')}
            className={`flex flex-col items-center space-y-1 py-1 px-3 rounded-md transition-all ${
              activeTab === 'connect'
                ? isProd
                  ? 'text-sage-800 font-semibold'
                  : 'text-white font-semibold'
                : 'text-neutral-500 hover:text-inherit'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span className="text-[9px] uppercase tracking-wider font-semibold font-display">
              Connect
            </span>
          </button>
        </div>

      </div>
    </nav>
  );
}

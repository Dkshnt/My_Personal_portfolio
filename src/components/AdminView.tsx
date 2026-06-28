import { useState, useEffect, FormEvent, DragEvent, useRef, ChangeEvent } from 'react';
import {
  Shield, Lock, Mail, Link as LinkIcon, Save, LogOut, CheckCircle,
  AlertTriangle, ArrowLeft, UploadCloud, FileText, Trash2, Copy,
  ExternalLink, FileCode, Sparkles, ChevronUp, ChevronDown,
  Layout, Briefcase, User, Database, Settings, Award, BarChart3,
  Globe, MessageSquare, MapPin, Youtube, Cpu, Plus, X
} from 'lucide-react';
import { PortfolioData, ContentBlock, ExperienceMilestone, Certification, ESGMetricInfo, ExcelProject, PersonalStat, Jyotirlinga } from '../types';

interface AdminViewProps {
  mode: 'professional' | 'personal';
  portfolio: PortfolioData;
  onRefresh: () => void;
  onClose?: () => void;
}

export default function AdminView({ mode, portfolio, onRefresh, onClose }: AdminViewProps) {
  const isProd = mode === 'professional';

  // Auth States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState<string | null>(localStorage.getItem('admin_token'));
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Form States
  const [headline, setHeadline] = useState(portfolio.headline);
  const [bio, setBio] = useState(portfolio.bio);
  const [linkedin, setLinkedin] = useState(portfolio.linkedin);
  const [github, setGithub] = useState(portfolio.github);
  const [youtube, setYoutube] = useState(portfolio.youtube);
  const [blocks, setBlocks] = useState<ContentBlock[]>(portfolio.blocks || []);
  const [milestones, setMilestones] = useState<ExperienceMilestone[]>(portfolio.milestones || []);
  const [certifications, setCertifications] = useState<Certification[]>(portfolio.certifications || []);
  const [esgMetrics, setEsgMetrics] = useState<ESGMetricInfo[]>(portfolio.esgMetrics || []);
  const [projects, setProjects] = useState<ExcelProject[]>(portfolio.projects || []);
  const [personalStats, setPersonalStats] = useState<PersonalStat[]>(portfolio.personalStats || []);
  const [labNodes, setLabNodes] = useState<any[]>(portfolio.labNodes || []);
  const [skills, setSkills] = useState<any[]>(portfolio.skills || []);
  const [faqs, setFaqs] = useState<any[]>(portfolio.faqs || []);
  const [youtubeStats, setYoutubeStats] = useState<any[]>(portfolio.youtubeStats || []);
  const [jyotirlingas, setJyotirlingas] = useState<Jyotirlinga[]>(portfolio.jyotirlingas || []);
  const [bannerStats, setBannerStats] = useState<any[]>(portfolio.bannerStats || []);
  const [youtubeChannelName, setYoutubeChannelName] = useState(portfolio.youtubeChannelName || '');
  const [youtubeDescription, setYoutubeDescription] = useState(portfolio.youtubeDescription || '');
  const [contactEmail, setContactEmail] = useState(portfolio.contactEmail || '');
  const [contactPhone, setContactPhone] = useState(portfolio.contactPhone || '');
  const [location, setLocation] = useState(portfolio.location || '');
  const [footerName, setFooterName] = useState(portfolio.footerName || '');
  const [methodologyTitle, setMethodologyTitle] = useState(portfolio.methodologyTitle || '');
  const [methodologyDesc, setMethodologyDesc] = useState(portfolio.methodologyDesc || '');
  const [methodologyPhases, setMethodologyPhases] = useState<any[]>(portfolio.methodologyPhases || []);
  const [infrastructureTitle, setInfrastructureTitle] = useState(portfolio.infrastructureTitle || '');
  const [infrastructureItems, setInfrastructureItems] = useState<any[]>(portfolio.infrastructureItems || []);
  const [connectSubjects, setConnectSubjects] = useState<string[]>(portfolio.connectSubjects || []);
  const [navProfessionalTitle, setNavProfessionalTitle] = useState(portfolio.navProfessionalTitle || '');
  const [navPersonalTitle, setNavPersonalTitle] = useState(portfolio.navPersonalTitle || '');
  const [professionalHeroTag, setProfessionalHeroTag] = useState(portfolio.professionalHeroTag || '');
  const [personalHeroTag, setPersonalHeroTag] = useState(portfolio.personalHeroTag || '');
  const [personalHeroTitle, setPersonalHeroTitle] = useState(portfolio.personalHeroTitle || '');
  const [personalHeroDesc, setPersonalHeroDesc] = useState(portfolio.personalHeroDesc || '');

  // File Upload and Asset states
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync state with portfolio props
  useEffect(() => {
    if (portfolio) {
      setHeadline(portfolio.headline);
      setBio(portfolio.bio);
      setLinkedin(portfolio.linkedin);
      setGithub(portfolio.github);
      setYoutube(portfolio.youtube);
      setBlocks(portfolio.blocks || []);
      setMilestones(portfolio.milestones || []);
      setCertifications(portfolio.certifications || []);
      setEsgMetrics(portfolio.esgMetrics || []);
      setProjects(portfolio.projects || []);
      setPersonalStats(portfolio.personalStats || []);
      setLabNodes(portfolio.labNodes || []);
      setSkills(portfolio.skills || []);
      setFaqs(portfolio.faqs || []);
      setYoutubeStats(portfolio.youtubeStats || []);
      setJyotirlingas(portfolio.jyotirlingas || []);
      setBannerStats(portfolio.bannerStats || []);
      setYoutubeChannelName(portfolio.youtubeChannelName || '');
      setYoutubeDescription(portfolio.youtubeDescription || '');
      setContactEmail(portfolio.contactEmail || '');
      setContactPhone(portfolio.contactPhone || '');
      setLocation(portfolio.location || '');
      setFooterName(portfolio.footerName || '');
      setMethodologyTitle(portfolio.methodologyTitle || '');
      setMethodologyDesc(portfolio.methodologyDesc || '');
      setMethodologyPhases(portfolio.methodologyPhases || []);
      setInfrastructureTitle(portfolio.infrastructureTitle || '');
      setInfrastructureItems(portfolio.infrastructureItems || []);
      setConnectSubjects(portfolio.connectSubjects || []);
      setNavProfessionalTitle(portfolio.navProfessionalTitle || '');
      setNavPersonalTitle(portfolio.navPersonalTitle || '');
      setProfessionalHeroTag(portfolio.professionalHeroTag || '');
      setPersonalHeroTag(portfolio.personalHeroTag || '');
      setPersonalHeroTitle(portfolio.personalHeroTitle || '');
      setPersonalHeroDesc(portfolio.personalHeroDesc || '');
    }
  }, [portfolio]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (email.trim().toLowerCase() !== "dikshant9911@gmail.com") {
      setError("Unauthorized access.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');

      localStorage.setItem('admin_token', data.token);
      setToken(data.token);
      setSuccessMsg("System authorized.");
    } catch (err: any) {
      setError(err.message || 'Authentication error');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveChanges = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      const res = await fetch('/api/portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          headline, bio, linkedin, github, youtube, blocks, milestones,
          certifications, esgMetrics, projects, personalStats, labNodes,
          skills, faqs, youtubeStats, jyotirlingas, bannerStats,
          youtubeChannelName, youtubeDescription, contactEmail, contactPhone,
          location, footerName, methodologyTitle, methodologyDesc,
          methodologyPhases, infrastructureTitle, infrastructureItems,
          connectSubjects, navProfessionalTitle, navPersonalTitle,
          professionalHeroTag, personalHeroTag, personalHeroTitle, personalHeroDesc
        })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to sync modifications.');
      }

      setSuccessMsg("Portfolio content saved successfully!");
      onRefresh();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setError(err.message || 'Failed to save changes.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setToken(null);
    setPassword('');
  };

  // Block Helpers
  const updateBlockValue = (id: string, value: string) => setBlocks(prev => prev.map(bk => bk.id === id ? { ...bk, value } : bk));
  const updateBlockName = (id: string, name: string) => setBlocks(prev => prev.map(bk => bk.id === id ? { ...bk, name } : bk));
  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const nextIndex = direction === 'up' ? index - 1 : index + 1;
    if (nextIndex < 0 || nextIndex >= blocks.length) return;
    const newBlocks = [...blocks];
    [newBlocks[index], newBlocks[nextIndex]] = [newBlocks[nextIndex], newBlocks[index]];
    setBlocks(newBlocks.map((blk, idx) => ({ ...blk, sort_order: (idx + 1) * 10 })));
  };
  const deleteBlock = (id: string) => setBlocks(prev => prev.filter(bk => bk.id !== id));
  const insertBlockAt = (index: number, type: 'text' | 'image' | 'file_download' | 'link') => {
    const newBlock: ContentBlock = {
      id: `block_${Date.now()}`, type, value: type === 'text' ? 'New text block...' : '',
      name: type === 'file_download' ? 'Doc.pdf' : (type === 'image' ? 'Caption' : (type === 'link' ? 'Button Label' : undefined)),
      sort_order: (index + 1) * 10
    };
    const newBlocks = [...blocks];
    newBlocks.splice(index, 0, newBlock);
    setBlocks(newBlocks.map((blk, idx) => ({ ...blk, sort_order: (idx + 1) * 10 })));
  };

  // Generic Entity Helpers
  const addMilestone = () => setMilestones([...milestones, { id: `ms_${Date.now()}`, company: 'New Company', role: 'Role', period: '2025 - Present', location: 'City, Country', logoColor: 'bg-stone-800', keyMetric: 'Metric', keyMetricLabel: 'Label', summary: 'Summary...', responsibilities: [], achievements: [], toolsUsed: [] }]);
  const updateMilestone = (id: string, field: string, value: any) => setMilestones(milestones.map(m => m.id === id ? { ...m, [field]: value } : m));
  const removeMilestone = (id: string) => setMilestones(milestones.filter(m => m.id !== id));

  const addProject = () => setProjects([...projects, { id: `p_${Date.now()}`, title: 'Project', category: 'Finance', description: 'Desc...', challenge: 'Challenge...', solution: 'Solution...', stack: [], metrics: [] }]);
  const updateProject = (id: string, field: string, value: any) => setProjects(projects.map(p => p.id === id ? { ...p, [field]: value } : p));
  const removeProject = (id: string) => setProjects(projects.filter(p => p.id !== id));

  const addCert = () => setCertifications([...certifications, { id: `cert_${Date.now()}`, title: '', issuer: '', date: '' }]);
  const updateCert = (id: string, field: string, value: any) => setCertifications(certifications.map(c => c.id === id ? { ...c, [field]: value } : c));
  const removeCert = (id: string) => setCertifications(certifications.filter(c => c.id !== id));

  const addMetric = () => setEsgMetrics([...esgMetrics, { id: `m_${Date.now()}`, title: '', currentValue: '', targetValue: '', unit: '', progressPercentage: 0, description: '', status: 'On Track' }]);
  const updateMetric = (id: string, field: string, value: any) => setEsgMetrics(esgMetrics.map(m => m.id === id ? { ...m, [field]: value } : m));
  const removeMetric = (id: string) => setEsgMetrics(esgMetrics.filter(m => m.id !== id));

  const addSkill = () => setSkills([...skills, { name: '', category: '', score: 80, desc: '' }]);
  const updateSkill = (index: number, field: string, value: any) => { const next = [...skills]; next[index] = { ...next[index], [field]: value }; setSkills(next); };
  const removeSkill = (index: number) => setSkills(skills.filter((_, i) => i !== index));

  const addFaq = () => setFaqs([...faqs, { q: '', a: '' }]);
  const updateFaq = (index: number, field: string, value: any) => { const next = [...faqs]; next[index] = { ...next[index], [field]: value }; setFaqs(next); };
  const removeFaq = (index: number) => setFaqs(faqs.filter((_, i) => i !== index));

  const addStat = () => setPersonalStats([...personalStats, { label: '', value: '', description: '' }]);
  const updateStat = (index: number, field: string, value: any) => { const next = [...personalStats]; next[index] = { ...next[index], [field]: value }; setPersonalStats(next); };
  const removeStat = (index: number) => setPersonalStats(personalStats.filter((_, i) => i !== index));

  const addLabNode = () => setLabNodes([...labNodes, { id: `node_${Date.now()}`, label: 'Node', desc: '', x: 50, y: 50, size: 50, color: '#3B82F6' }]);
  const updateLabNode = (id: string, field: string, value: any) => setLabNodes(labNodes.map(n => n.id === id ? { ...n, [field]: value } : n));
  const removeLabNode = (id: string) => setLabNodes(labNodes.filter(n => n.id !== id));

  const addPhase = () => setMethodologyPhases([...methodologyPhases, { title: '', desc: '' }]);
  const updatePhase = (index: number, field: string, value: any) => { const next = [...methodologyPhases]; next[index] = { ...next[index], [field]: value }; setMethodologyPhases(next); };
  const removePhase = (index: number) => setMethodologyPhases(methodologyPhases.filter((_, i) => i !== index));

  const addInfra = () => setInfrastructureItems([...infrastructureItems, { title: '', percent: 90, color: 'bg-emerald-600', icon: 'Settings', desc: '' }]);
  const updateInfra = (index: number, field: string, value: any) => { const next = [...infrastructureItems]; next[index] = { ...next[index], [field]: value }; setInfrastructureItems(next); };
  const removeInfra = (index: number) => setInfrastructureItems(infrastructureItems.filter((_, i) => i !== index));

  const addYoutubeStat = () => setYoutubeStats([...youtubeStats, { label: '', value: '' }]);
  const updateYoutubeStat = (index: number, field: string, value: any) => { const next = [...youtubeStats]; next[index] = { ...next[index], [field]: value }; setYoutubeStats(next); };
  const removeYoutubeStat = (index: number) => setYoutubeStats(youtubeStats.filter((_, i) => i !== index));

  const updateJyotirlinga = (id: string, field: string, value: any) => setJyotirlingas(jyotirlingas.map(j => j.id === id ? { ...j, [field]: value } : j));
  const addBannerStat = () => setBannerStats([...bannerStats, { label: '', value: '' }]);
  const updateBannerStat = (index: number, field: string, value: any) => { const next = [...bannerStats]; next[index] = { ...next[index], [field]: value }; setBannerStats(next); };
  const removeBannerStat = (index: number) => setBannerStats(bannerStats.filter((_, i) => i !== index));

  const handleBlockUpload = (blockId: string, accept: string) => {
    const input = document.createElement('input'); input.type = 'file'; input.accept = accept;
    input.onchange = async (e: any) => {
      if (e.target.files?.[0]) {
        const file = e.target.files[0];
        if (file.size > 45 * 1024 * 1024) { setError("Limit 45MB."); return; }
        const reader = new FileReader();
        reader.onload = async (event) => {
          const base64Data = event.target?.result as string; if (!base64Data) return;
          setUploading(true);
          try {
            const res = await fetch('/api/upload', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify({ filename: file.name, mimeType: file.type, base64Data, size: `${(file.size / 1024 / 1024).toFixed(2)} MB` }) });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            setBlocks(prev => prev.map(bk => bk.id === blockId ? { ...bk, value: data.asset.url, name: bk.type === 'file_download' ? file.name : (bk.name || file.name) } : bk));
            setSuccessMsg(`Uploaded ${file.name}`); onRefresh();
          } catch (err: any) { setError(err.message); } finally { setUploading(false); }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const processFile = async (file: File) => {
    setUploadError(null); setUploadSuccess(null); setUploading(true);
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64Data = e.target?.result as string;
      try {
        const res = await fetch('/api/upload', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify({ filename: file.name, mimeType: file.type, base64Data, size: `${(file.size / 1024 / 1024).toFixed(2)} MB` }) });
        const data = await res.json(); if (!res.ok) throw new Error(data.error);
        setUploadSuccess(`Asset "${file.name}" ready.`); onRefresh();
      } catch (err: any) { setUploadError(err.message); } finally { setUploading(false); }
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteAsset = async (assetUrl: string) => {
    if (!confirm("Delete permanently?")) return;
    try {
      const res = await fetch('/api/assets', { method: 'DELETE', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify({ url: assetUrl }) });
      if (res.ok) { setUploadSuccess("Deleted"); onRefresh(); }
    } catch (err: any) { setUploadError(err.message); }
  };

  const copyToClipboard = (url: string) => { navigator.clipboard.writeText(window.location.origin + url); setCopiedUrl(url); setTimeout(() => setCopiedUrl(null), 2000); };

  const ArrayField = ({ label, items, onAdd, onRemove, renderItem }: any) => (
    <div className="space-y-4">
      <div className="flex justify-between items-center border-b border-neutral-800 pb-2">
        <label className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest">{label}</label>
        <button type="button" onClick={onAdd} className="p-1.5 bg-teal-500/10 text-teal-400 rounded-lg hover:bg-teal-500/20 transition-all"><Plus className="w-4 h-4" /></button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {items.map((item: any, i: number) => (
          <div key={i} className="relative p-4 rounded-2xl bg-black/20 border border-neutral-800 group">
            <button type="button" onClick={() => onRemove(i)} className="absolute top-2 right-2 p-1.5 text-red-500 bg-red-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all"><X className="w-3.5 h-3.5" /></button>
            {renderItem(item, i)}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={`transition-colors duration-300 min-h-screen py-12 flex items-center justify-center ${isProd ? 'bg-sage-50 text-sage-950' : 'bg-obsidian-950 text-neutral-100'}`}>
      <div className="max-w-5xl w-full px-4">
        
        <div className="mb-8 flex justify-between items-center">
          <button onClick={onClose || (() => window.location.href = '/')} className={`flex items-center space-x-1 font-mono text-[10px] tracking-widest uppercase hover:underline ${isProd ? 'text-sage-700' : 'text-teal-400'}`}>
            <ArrowLeft className="w-3.5 h-3.5" /> <span>Back to Site</span>
          </button>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${token ? 'bg-emerald-500 animate-pulse' : 'bg-neutral-600'}`} />
            <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-tighter">Secure Admin Node</span>
          </div>
        </div>

        {!token ? (
          <div className={`rounded-[2.5rem] border p-8 sm:p-12 shadow-2xl max-w-md mx-auto relative overflow-hidden ${isProd ? 'bg-white border-sage-200' : 'bg-obsidian-900 border-neutral-800'}`}>
            <div className="absolute top-0 right-0 p-8 opacity-5"><Shield className="w-32 h-32" /></div>
            <div className="flex justify-center mb-8">
              <div className={`p-4 rounded-3xl border-2 ${isProd ? 'bg-sage-50 border-sage-100 text-sage-950' : 'bg-teal-500/5 border-teal-500/20 text-teal-400'}`}>
                <Lock className="w-8 h-8" />
              </div>
            </div>
            <h1 className="font-display font-black text-3xl tracking-tighter text-center uppercase mb-1">Login</h1>
            <p className="text-[10px] font-mono text-center text-neutral-500 uppercase tracking-widest mb-10">Access restricted to authorized personnel</p>
            {error && <div className="mb-8 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs flex items-center space-x-3"><AlertTriangle className="w-5 h-5 flex-shrink-0" /><span>{error}</span></div>}
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest ml-1">Admin Email</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-5 py-4 rounded-2xl border bg-obsidian-950 border-neutral-850 text-xs focus:ring-1 focus:ring-teal-500 outline-none transition-all" placeholder="name@domain.com" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest ml-1">Access Password</label>
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-5 py-4 rounded-2xl border bg-obsidian-950 border-neutral-850 text-xs focus:ring-1 focus:ring-teal-500 outline-none transition-all" placeholder="••••••••" />
              </div>
              <button type="submit" disabled={loading} className={`w-full py-5 rounded-2xl font-display text-xs font-black uppercase tracking-widest transition-all ${loading ? 'bg-neutral-800 text-neutral-500' : 'bg-teal-500 text-obsidian-950 hover:scale-[1.02] active:scale-[0.98]'}`}>{loading ? 'Verifying...' : 'Authorize Terminal'}</button>
            </form>
          </div>
        ) : (
          <div className={`rounded-[3rem] border p-4 sm:p-10 shadow-2xl relative ${isProd ? 'bg-white border-sage-200' : 'bg-obsidian-900 border-neutral-800'}`}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-neutral-800/50 pb-6 mb-8 gap-4">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-teal-500 rounded-2xl text-obsidian-950 shadow-[0_0_20px_rgba(20,184,166,0.4)]"><Layout className="w-6 h-6" /></div>
                <div>
                  <h2 className="font-display font-black text-2xl tracking-tighter uppercase text-neutral-100">Site Customizer</h2>
                  <p className="text-[9px] font-mono text-teal-400 uppercase tracking-widest">Active Administrative Session</p>
                </div>
              </div>
              <button onClick={handleLogout} className="flex items-center space-x-2 px-5 py-2.5 rounded-xl border border-red-500/20 bg-red-500/5 text-red-500 hover:bg-red-500/10 font-mono text-[10px] font-bold uppercase transition-all">
                <LogOut className="w-4 h-4" /> <span>Sign Out</span>
              </button>
            </div>

            <div className="sticky top-4 z-40 mb-12 flex items-center space-x-2 overflow-x-auto no-scrollbar bg-obsidian-950/80 backdrop-blur-xl p-2 rounded-2xl border border-neutral-800/50 shadow-xl">
              {[
                { id: 'general', label: 'Identity', icon: Globe },
                { id: 'blocks', label: 'Modular Blocks', icon: Layout },
                { id: 'prof', label: 'Professional', icon: Briefcase },
                { id: 'skills', label: 'Skills & QA', icon: Award },
                { id: 'personal', label: 'Personal', icon: User },
                { id: 'assets', label: 'Asset Vault', icon: Database }
              ].map(tab => (
                <button key={tab.id} type="button" onClick={() => document.getElementById(`sec-${tab.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })} className="whitespace-nowrap flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-teal-500 hover:text-obsidian-950 text-[10px] font-mono font-black uppercase tracking-wider text-neutral-400 transition-all">
                  <tab.icon className="w-3.5 h-3.5" /> <span>{tab.label}</span>
                </button>
              ))}
            </div>

            <form onSubmit={handleSaveChanges} className="space-y-24">
              
              {/* identity section */}
              <section id="sec-general" className="space-y-10 scroll-mt-32">
                <div className="flex items-center space-x-3">
                  <div className="w-1.5 h-6 bg-blue-500 rounded-full" />
                  <h3 className="font-display font-black text-xl tracking-tight uppercase text-neutral-100">Global Branding</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-widest">Main Headline</label>
                    <input type="text" value={headline} onChange={(e) => setHeadline(e.target.value)} className="w-full px-5 py-4 rounded-2xl border bg-obsidian-950 border-neutral-850 text-xs focus:ring-1 focus:ring-teal-500 outline-none" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-widest">About / Bio Segment</label>
                    <textarea rows={4} value={bio} onChange={(e) => setBio(e.target.value)} className="w-full px-5 py-4 rounded-2xl border bg-obsidian-950 border-neutral-850 text-xs focus:ring-1 focus:ring-teal-500 outline-none leading-relaxed" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-widest">Brand/Footer Name</label>
                    <input type="text" value={footerName} onChange={(e) => setFooterName(e.target.value)} className="w-full px-5 py-4 rounded-2xl border bg-obsidian-950 border-neutral-850 text-xs outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-widest">Primary Contact Email</label>
                    <input type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} className="w-full px-5 py-4 rounded-2xl border bg-obsidian-950 border-neutral-850 text-xs outline-none" />
                  </div>
                </div>

                <div className="p-8 rounded-[2rem] bg-black/40 border border-neutral-800/50 space-y-6">
                  <h4 className="text-[10px] font-mono font-black text-neutral-400 uppercase tracking-widest mb-4">Social Media Handlers</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {['linkedin', 'github', 'youtube'].map(plat => (
                      <div key={plat} className="space-y-1.5">
                        <label className="text-[9px] font-mono font-bold text-neutral-600 uppercase">{plat}</label>
                        <input type="url" value={(window as any)[plat]} onChange={(e) => plat === 'linkedin' ? setLinkedin(e.target.value) : plat === 'github' ? setGithub(e.target.value) : setYoutube(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border bg-obsidian-900 border-neutral-800 text-[10px] outline-none focus:border-teal-500" />
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* modular blocks section */}
              <section id="sec-blocks" className="space-y-10 scroll-mt-32">
                <div className="flex items-center justify-between border-t border-neutral-800/50 pt-16">
                  <div className="flex items-center space-x-3">
                    <div className="w-1.5 h-6 bg-teal-500 rounded-full" />
                    <h3 className="font-display font-black text-xl tracking-tight uppercase text-neutral-100">Modular Content Core</h3>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3 p-8 border-2 border-dashed border-neutral-800 rounded-[2.5rem] bg-black/10 hover:border-teal-500/20 transition-all group">
                   {['text', 'image', 'file_download', 'link'].map(type => (
                    <button key={type} type="button" onClick={() => insertBlockAt(0, type as any)} className="px-5 py-3 text-[10px] font-mono font-black bg-neutral-900 rounded-2xl text-neutral-400 hover:bg-teal-500 hover:text-obsidian-950 transition-all uppercase tracking-tighter">+ {type.replace('_', ' ')}</button>
                  ))}
                </div>

                <div className="space-y-8">
                  {blocks.sort((a,b) => a.sort_order - b.sort_order).map((block, index) => (
                    <div key={block.id} className="group relative p-8 rounded-[2.5rem] border border-neutral-800 bg-black/30 hover:border-teal-500/30 transition-all shadow-lg">
                      <div className="absolute -left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all">
                        <div className="w-10 h-10 rounded-2xl bg-teal-500 text-obsidian-950 flex items-center justify-center text-sm font-black shadow-2xl">{index + 1}</div>
                      </div>

                      <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-900">
                        <div className="flex items-center space-x-4">
                          <div className={`p-3 rounded-2xl ${block.type === 'text' ? 'bg-blue-500/10 text-blue-400' : block.type === 'image' ? 'bg-amber-500/10 text-amber-400' : 'bg-red-500/10 text-red-400'}`}>
                            {block.type === 'text' ? <FileText className="w-5 h-5" /> : block.type === 'image' ? <UploadCloud className="w-5 h-5" /> : <LinkIcon className="w-5 h-5" />}
                          </div>
                          <span className="text-xs font-mono font-black text-neutral-400 uppercase tracking-[0.2em]">{block.type.replace('_', ' ')}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button type="button" disabled={index === 0} onClick={() => moveBlock(index, 'up')} className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 disabled:opacity-20"><ChevronUp className="w-5 h-5" /></button>
                          <button type="button" disabled={index === blocks.length-1} onClick={() => moveBlock(index, 'down')} className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 disabled:opacity-20"><ChevronDown className="w-5 h-5" /></button>
                          <button type="button" onClick={() => deleteBlock(block.id)} className="p-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all ml-4"><Trash2 className="w-5 h-5" /></button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-6">
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-mono font-black text-neutral-600 uppercase tracking-widest">Internal Label / Header</label>
                          <input type="text" value={block.name || ''} onChange={(e) => updateBlockName(block.id, e.target.value)} className="w-full bg-obsidian-950 border border-neutral-850 rounded-2xl px-5 py-3 text-xs outline-none focus:border-teal-500 transition-all" />
                        </div>
                        {block.type === 'text' ? (
                          <div className="space-y-1.5">
                            <label className="text-[9px] font-mono font-black text-neutral-600 uppercase tracking-widest">Narrative Payload</label>
                            <textarea value={block.value} onChange={(e) => updateBlockValue(block.id, e.target.value)} rows={6} className="w-full bg-obsidian-950 border border-neutral-850 rounded-2xl px-5 py-4 text-xs leading-relaxed outline-none focus:border-teal-500 transition-all" />
                          </div>
                        ) : (
                          <div className="space-y-1.5">
                            <label className="text-[9px] font-mono font-black text-neutral-600 uppercase tracking-widest">Target Resource Path/URL</label>
                            <div className="flex gap-4">
                              <input type="text" value={block.value} onChange={(e) => updateBlockValue(block.id, e.target.value)} className="flex-grow bg-obsidian-950 border border-neutral-850 rounded-2xl px-5 py-3 text-xs outline-none" />
                              <button type="button" onClick={() => handleBlockUpload(block.id, block.type === 'image' ? "image/*" : "*/*")} className="px-6 py-3 bg-teal-500 text-obsidian-950 rounded-2xl font-black text-[10px] uppercase tracking-tighter hover:scale-[1.05] transition-all"><UploadCloud className="w-5 h-5" /></button>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all flex items-center gap-2 p-2 bg-neutral-900 rounded-[1.25rem] border-2 border-teal-500/30 z-10 shadow-2xl">
                        {['text', 'image', 'file_download', 'link'].map(type => (
                          <button key={type} type="button" onClick={() => insertBlockAt(index + 1, type as any)} className="px-4 py-2 text-[9px] font-mono font-black bg-obsidian-950 rounded-xl text-teal-400 hover:bg-teal-500 hover:text-obsidian-950 transition-all uppercase tracking-tighter">+ {type.split('_')[0]}</button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* professional deep settings */}
              <section id="sec-prof" className="space-y-16 border-t border-neutral-800/50 pt-16 scroll-mt-32">
                <div className="flex items-center space-x-3">
                  <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                  <h3 className="font-display font-black text-xl tracking-tight uppercase text-neutral-100">Professional Pipeline</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-widest">Hero Navigation Tag</label>
                    <input type="text" value={professionalHeroTag} onChange={(e) => setProfessionalHeroTag(e.target.value)} className="w-full px-5 py-4 rounded-2xl border bg-obsidian-950 border-neutral-850 text-xs outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-widest">Infrastructure Module Title</label>
                    <input type="text" value={infrastructureTitle} onChange={(e) => setInfrastructureTitle(e.target.value)} className="w-full px-5 py-4 rounded-2xl border bg-obsidian-950 border-neutral-850 text-xs outline-none" />
                  </div>
                </div>

                <ArrayField label="Career Milestones" items={milestones} onAdd={addMilestone} onRemove={removeMilestone} renderItem={(ms: any) => (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className="text-[8px] font-mono text-neutral-600 uppercase">Organization</label>
                        <input type="text" value={ms.company} onChange={(e) => updateMilestone(ms.id, 'company', e.target.value)} className="w-full bg-transparent border-b border-neutral-800 text-xs font-bold py-2 outline-none" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[8px] font-mono text-neutral-600 uppercase">Designation</label>
                        <input type="text" value={ms.role} onChange={(e) => updateMilestone(ms.id, 'role', e.target.value)} className="w-full bg-transparent border-b border-neutral-800 text-xs py-2 outline-none" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                       <input type="text" value={ms.period} onChange={(e) => updateMilestone(ms.id, 'period', e.target.value)} placeholder="Period" className="bg-black/20 p-3 rounded-xl text-[10px] outline-none" />
                       <input type="text" value={ms.location} onChange={(e) => updateMilestone(ms.id, 'location', e.target.value)} placeholder="Location" className="bg-black/20 p-3 rounded-xl text-[10px] outline-none" />
                    </div>
                    <textarea value={ms.summary} onChange={(e) => updateMilestone(ms.id, 'summary', e.target.value)} rows={3} placeholder="Full description..." className="w-full bg-black/40 border border-neutral-800 rounded-2xl p-4 text-[11px] outline-none leading-relaxed" />
                  </div>
                )} />

                <ArrayField label="Active ESG Metrics" items={esgMetrics} onAdd={addMetric} onRemove={removeMetric} renderItem={(m: any) => (
                  <div className="space-y-4">
                    <input type="text" value={m.title} onChange={(e) => updateMetric(m.id, 'title', e.target.value)} className="w-full bg-transparent border-b border-neutral-800 text-xs font-bold py-1 outline-none" />
                    <div className="grid grid-cols-3 gap-4">
                       <div className="space-y-1"><label className="text-[8px] text-neutral-700 font-mono uppercase">Current</label><input type="text" value={m.currentValue} onChange={(e) => updateMetric(m.id, 'currentValue', e.target.value)} className="w-full bg-black/40 p-3 rounded-xl text-[10px] outline-none" /></div>
                       <div className="space-y-1"><label className="text-[8px] text-neutral-700 font-mono uppercase">Target</label><input type="text" value={m.targetValue} onChange={(e) => updateMetric(m.id, 'targetValue', e.target.value)} className="w-full bg-black/40 p-3 rounded-xl text-[10px] outline-none" /></div>
                       <div className="space-y-1"><label className="text-[8px] text-neutral-700 font-mono uppercase">Progress %</label><input type="number" value={m.progressPercentage} onChange={(e) => updateMetric(m.id, 'progressPercentage', parseInt(e.target.value))} className="w-full bg-black/40 p-3 rounded-xl text-[10px] outline-none" /></div>
                    </div>
                  </div>
                )} />
              </section>

              {/* skills and faqs */}
              <section id="sec-skills" className="space-y-16 border-t border-neutral-800/50 pt-16 scroll-mt-32">
                <div className="flex items-center space-x-3">
                  <div className="w-1.5 h-6 bg-amber-500 rounded-full" />
                  <h3 className="font-display font-black text-xl tracking-tight uppercase text-neutral-100">Skills & Knowledge Base</h3>
                </div>

                <ArrayField label="Technical Skill Matrix" items={skills} onAdd={addSkill} onRemove={removeSkill} renderItem={(s: any, i: number) => (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                       <input type="text" value={s.name} onChange={(e) => updateSkill(i, 'name', e.target.value)} placeholder="Skill..." className="bg-transparent border-b border-neutral-800 text-xs font-bold py-1 outline-none" />
                       <input type="text" value={s.category} onChange={(e) => updateSkill(i, 'category', e.target.value)} placeholder="Category..." className="bg-black/20 p-2 rounded-lg text-[9px] outline-none" />
                    </div>
                    <div className="flex items-center gap-6">
                       <input type="range" value={s.score} onChange={(e) => updateSkill(i, 'score', parseInt(e.target.value))} className="flex-grow accent-teal-500" />
                       <span className="text-[10px] font-mono font-bold text-teal-400 w-8">{s.score}%</span>
                    </div>
                  </div>
                )} />

                <ArrayField label="Methodology FAQs" items={faqs} onAdd={addFaq} onRemove={removeFaq} renderItem={(f: any, i: number) => (
                  <div className="space-y-3">
                    <input type="text" value={f.q} onChange={(e) => updateFaq(i, 'q', e.target.value)} placeholder="Question?" className="w-full bg-transparent border-b border-neutral-800 text-xs font-bold py-1 outline-none" />
                    <textarea value={f.a} onChange={(e) => updateFaq(i, 'a', e.target.value)} placeholder="Answer..." rows={2} className="w-full bg-black/20 p-3 rounded-xl text-[10px] outline-none" />
                  </div>
                )} />
              </section>

              {/* personal section */}
              <section id="sec-personal" className="space-y-16 border-t border-neutral-800/50 pt-16 scroll-mt-32">
                <div className="flex items-center space-x-3">
                  <div className="w-1.5 h-6 bg-purple-500 rounded-full" />
                  <h3 className="font-display font-black text-xl tracking-tight uppercase text-neutral-100">Personal Perspective</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-2"><label className="text-[10px] font-mono text-neutral-500 uppercase">Hero Tag</label><input type="text" value={personalHeroTag} onChange={(e) => setPersonalHeroTag(e.target.value)} className="w-full bg-obsidian-950 border border-neutral-850 p-4 rounded-2xl text-xs outline-none" /></div>
                   <div className="space-y-2"><label className="text-[10px] font-mono text-neutral-500 uppercase">YouTube Brand</label><input type="text" value={youtubeChannelName} onChange={(e) => setYoutubeChannelName(e.target.value)} className="w-full bg-obsidian-950 border border-neutral-850 p-4 rounded-2xl text-xs outline-none" /></div>
                </div>

                <ArrayField label="Curiosity Metrics" items={personalStats} onAdd={addStat} onRemove={removeStat} renderItem={(s: any, i: number) => (
                  <div className="space-y-3">
                    <div className="flex gap-4">
                       <input type="text" value={s.label} onChange={(e) => updateStat(i, 'label', e.target.value)} placeholder="Metric Label" className="w-2/3 bg-transparent border-b border-neutral-800 text-xs font-bold py-1 outline-none" />
                       <input type="text" value={s.value} onChange={(e) => updateStat(i, 'value', e.target.value)} placeholder="Value" className="w-1/3 bg-black/40 text-teal-400 font-black p-2 rounded-xl text-xs outline-none" />
                    </div>
                    <textarea value={s.description} onChange={(e) => updateStat(i, 'description', e.target.value)} placeholder="Short desc..." className="w-full bg-black/20 p-3 rounded-xl text-[10px] outline-none" />
                  </div>
                )} />

                <div className="space-y-8">
                  <h4 className="text-[10px] font-mono font-black text-neutral-500 uppercase tracking-[0.2em] border-b border-neutral-800 pb-2">Ancient Geologies (Jyotirlingas)</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {jyotirlingas.map((j) => (
                      <div key={j.id} className="p-5 rounded-3xl bg-black/20 border border-neutral-800 space-y-3">
                        <div className="font-black text-xs text-neutral-300 flex justify-between"><span>{j.name}</span><span className="text-[8px] opacity-40">{j.state}</span></div>
                        <textarea value={j.deitySpec} onChange={(e) => updateJyotirlinga(j.id, 'deitySpec', e.target.value)} rows={3} className="w-full bg-transparent text-[10px] leading-relaxed outline-none border-t border-neutral-800/50 pt-2" />
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* SAVE ACTION */}
              <div className="sticky bottom-6 z-50">
                <button type="submit" disabled={loading} className={`w-full py-6 rounded-[2rem] font-display text-base font-black uppercase tracking-widest transition-all flex items-center justify-center space-x-4 shadow-[0_20px_50px_rgba(20,184,166,0.3)] ${loading ? 'bg-neutral-800 text-neutral-500' : 'bg-teal-500 text-obsidian-950 hover:scale-[1.01] active:scale-[0.99]'}`}>
                  <Save className="w-6 h-6" /> <span>{loading ? 'Securing Pipeline...' : 'Commit Changes to Database'}</span>
                </button>
              </div>

            </form>

            {/* asset vault section */}
            <section id="sec-assets" className="mt-32 pt-24 border-t-2 border-teal-500/20 space-y-12">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-teal-500/10 rounded-2xl text-teal-400"><Database className="w-6 h-6" /></div>
                <h3 className="font-display font-black text-2xl tracking-tight uppercase text-neutral-100">Asset Warehouse</h3>
              </div>

              <div onDragOver={(e) => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={(e) => { e.preventDefault(); setDragOver(false); if(e.dataTransfer.files[0]) processFile(e.dataTransfer.files[0]); }} onClick={() => fileInputRef.current?.click()} className={`border-2 border-dashed rounded-[3rem] p-16 text-center cursor-pointer transition-all ${dragOver ? 'border-teal-400 bg-teal-400/5 scale-[1.01]' : 'border-neutral-800 hover:border-neutral-700 bg-black/20'}`}>
                <input type="file" ref={fileInputRef} onChange={(e) => e.target.files?.[0] && processFile(e.target.files[0])} className="hidden" />
                <UploadCloud className={`w-16 h-16 mx-auto mb-6 ${uploading ? 'animate-bounce text-teal-400' : 'text-neutral-700'}`} />
                <p className="font-display font-black text-sm uppercase tracking-widest text-neutral-200">{uploading ? 'Transferring Data...' : 'Drop Assets or Click to Browse'}</p>
                <p className="text-[10px] font-mono text-neutral-500 mt-4 uppercase tracking-widest">Validated formats: PNG, JPG, PDF, SVG (Max 45MB)</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolio.assets?.map((asset, i) => (
                  <div key={i} className="p-6 rounded-[2rem] border border-neutral-800 bg-black/30 hover:bg-black/50 transition-all space-y-6 group">
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 rounded-2xl bg-neutral-900 flex items-center justify-center border border-neutral-800 overflow-hidden">
                         {asset.type.includes('image') ? <img src={asset.url} className="w-full h-full object-cover" /> : <FileCode className="w-6 h-6 text-teal-500" />}
                      </div>
                      <div className="overflow-hidden flex-grow">
                        <div className="text-[11px] font-black text-neutral-200 truncate">{asset.name}</div>
                        <div className="text-[9px] font-mono text-neutral-500 uppercase mt-1">{asset.size} • {asset.type.split('/')[1]}</div>
                      </div>
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button type="button" onClick={() => copyToClipboard(asset.url)} className="flex-grow py-3 rounded-xl bg-neutral-800 text-[9px] font-black uppercase tracking-widest hover:bg-teal-500 hover:text-obsidian-950 transition-all">{copiedUrl === asset.url ? 'Copied!' : 'Copy Link'}</button>
                      <button type="button" onClick={() => handleDeleteAsset(asset.url)} className="p-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>
        )}

      </div>
    </div>
  );
}

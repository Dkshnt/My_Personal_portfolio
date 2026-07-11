import { useState, useEffect, FormEvent, DragEvent, useRef, ChangeEvent } from 'react';
import { Shield, Lock, Mail, Link as LinkIcon, Save, LogOut, CheckCircle, AlertTriangle, ArrowLeft, UploadCloud, FileText, Trash2, Copy, ExternalLink, FileCode } from 'lucide-react';
import { PortfolioData, ContentBlock } from '../types';

interface AdminViewProps {
  mode: 'professional' | 'personal';
  portfolio: PortfolioData;
  onRefresh: () => void;
}

export default function AdminView({ mode, portfolio, onRefresh }: AdminViewProps) {
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

  // File Upload and Asset states
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Keep fields in sync with props
  useEffect(() => {
    setHeadline(portfolio.headline);
    setBio(portfolio.bio);
    setLinkedin(portfolio.linkedin);
    setGithub(portfolio.github);
    setYoutube(portfolio.youtube);
    setBlocks(portfolio.blocks || []);
  }, [portfolio]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (email.trim().toLowerCase() !== "dikshant9911@gmail.com") {
      setError("Unauthorized access. Admin privileges restricted exclusively to dikshant9911@gmail.com.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication aborted');
      }

      localStorage.setItem('admin_token', data.token);
      setToken(data.token);
      setSuccessMsg("System successfully authorized.");
    } catch (err: any) {
      setError(err.message || 'System failed authentication check');
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
          headline,
          bio,
          linkedin,
          github,
          youtube,
          blocks
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to sync modifications.');
      }

      setSuccessMsg("Portfolio content saved and dynamically updated successfully!");
      onRefresh(); // Trigger dynamic reload in live page
    } catch (err: any) {
      setError(err.message || 'Fail validation check. Unable to secure changes.');
    } finally {
      setLoading(false);
    }
  };

  // Helper to update individual block's value
  const updateBlockValue = (id: string, value: string) => {
    setBlocks(prev => prev.map(bk => bk.id === id ? { ...bk, value } : bk));
  };

  // Helper to update block's name (e.g. filename for file_download)
  const updateBlockName = (id: string, name: string) => {
    setBlocks(prev => prev.map(bk => bk.id === id ? { ...bk, name } : bk));
  };

  // Helper to reorder blocks (move up/down)
  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const nextIndex = direction === 'up' ? index - 1 : index + 1;
    if (nextIndex < 0 || nextIndex >= blocks.length) return;

    const newBlocks = [...blocks];
    const temp = newBlocks[index];
    newBlocks[index] = newBlocks[nextIndex];
    newBlocks[nextIndex] = temp;

    // Recalculate sort_order to keep it sequential/clean
    const updated = newBlocks.map((blk, idx) => ({
      ...blk,
      sort_order: (idx + 1) * 10
    }));
    setBlocks(updated);
  };

  // Helper to delete a block
  const deleteBlock = (id: string) => {
    setBlocks(prev => prev.filter(bk => bk.id !== id));
  };

  // Helper to add/insert a block at/after a specific index
  const insertBlockAt = (index: number, type: 'text' | 'image' | 'file_download') => {
    const newId = `block_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    const newBlock: ContentBlock = {
      id: newId,
      type,
      value: type === 'text' 
        ? 'Fresh text description block. Edit this content directly.' 
        : type === 'image' 
          ? 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200'
          : '',
      name: type === 'file_download' ? 'Unnamed_Document.pdf' : (type === 'image' ? 'Image Visual Caption' : undefined),
      sort_order: (index + 1) * 10
    };

    const newBlocks = [...blocks];
    newBlocks.splice(index, 0, newBlock);

    // Re-index all sort_orders sequentially
    const updated = newBlocks.map((blk, idx) => ({
      ...blk,
      sort_order: (idx + 1) * 10
    }));
    setBlocks(updated);
  };

  // Trigger file picker for a specific block ID to replace value
  const handleBlockUpload = (blockId: string, accept: string) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = accept;
    input.onchange = async (e: any) => {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        if (file.size > 45 * 1024 * 1024) {
          setError("Maximum file upload limit is 45MB.");
          return;
        }

        const reader = new FileReader();
        reader.onload = async (event) => {
          const base64Data = event.target?.result as string;
          if (!base64Data) return;

          setUploading(true);
          setError(null);
          setSuccessMsg(null);
          try {
            const res = await fetch('/api/upload', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({
                filename: file.name,
                mimeType: file.type,
                base64Data,
                size: `${(file.size / 1024 / 1024).toFixed(2)} MB`
              })
            });

            const data = await res.json();
            if (!res.ok) {
              throw new Error(data.error || 'Upload failed');
            }

            // Update blocks local state
            setBlocks(prev => prev.map(bk => {
              if (bk.id === blockId) {
                return {
                  ...bk,
                  value: data.asset.url,
                  name: bk.type === 'file_download' ? file.name : (bk.name || file.name)
                };
              }
              return bk;
            }));

            setSuccessMsg(`File "${file.name}" uploaded successfully for selected block.`);
            onRefresh();
          } catch (err: any) {
            setError(err.message || 'File transport failed');
          } finally {
            setUploading(false);
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setToken(null);
    setError(null);
    setSuccessMsg(null);
    setPassword('');
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const processFile = async (file: File) => {
    setUploadError(null);
    setUploadSuccess(null);
    setUploading(true);

    if (file.size > 45 * 1024 * 1024) {
      setUploadError("Assets must not exceed 45MB size standard.");
      setUploading(false);
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64Data = e.target?.result as string;
      if (!base64Data) {
        setUploadError("Parsing resource file aborted.");
        setUploading(false);
        return;
      }

      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            filename: file.name,
            mimeType: file.type,
            base64Data,
            size: `${(file.size / 1024 / 1024).toFixed(2)} MB`
          })
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'System rejected the upload query.');
        }

        setUploadSuccess(`Dynamic Asset "${file.name}" uploaded successfully!`);
        onRefresh();
      } catch (err: any) {
        setUploadError(err.message || 'Validation failed. Asset transport error.');
      } finally {
        setUploading(false);
      }
    };

    reader.onerror = () => {
      setUploadError("Error reading local filesystem blob.");
      setUploading(false);
    };

    reader.readAsDataURL(file);
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      await processFile(file);
    }
  };

  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      await processFile(file);
    }
  };

  const handleDeleteAsset = async (assetUrl: string) => {
    if (!confirm("Are you sure you want to permanently delete this asset from storage?")) return;
    setUploadError(null);
    setUploadSuccess(null);

    try {
      const res = await fetch('/api/assets', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ url: assetUrl })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Request to clear asset was rejected.');
      }

      setUploadSuccess("Asset successfully deleted.");
      onRefresh();
    } catch (err: any) {
      setUploadError(err.message || 'System failed to write deletion update.');
    }
  };

  const copyToClipboard = (url: string) => {
    const fullUrl = window.location.origin + url;
    navigator.clipboard.writeText(fullUrl);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <div className={`transition-colors duration-300 min-h-screen py-16 flex items-center justify-center ${
      isProd ? 'bg-sage-50 text-sage-950' : 'bg-obsidian-950 text-neutral-100'
    }`}>
      <div className="max-w-4xl w-full px-4">
        
        {/* Invisible back link trigger for normal users */}
        <div className="mb-6 flex justify-between items-center">
          <button 
            onClick={() => window.location.href = '/'}
            className={`flex items-center space-x-1 font-mono text-[10px] tracking-widest uppercase hover:underline ${
              isProd ? 'text-sage-700' : 'text-teal-400'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Portfolio</span>
          </button>
          
          <span className="font-mono text-[9px] text-neutral-500">
            Duality Perspective Control Module
          </span>
        </div>

        {/* Not Logged In View: Render Login Form */}
        {!token ? (
          <div className={`rounded-3xl border p-8 sm:p-12 shadow-md max-w-md mx-auto relative ${
            isProd ? 'bg-white border-sage-200' : 'bg-obsidian-900 border-neutral-800'
          }`}>
            <div className="flex justify-center mb-6">
              <div className={`p-3.5 rounded-2xl border ${
                isProd ? 'bg-sage-100 border-sage-200 text-sage-950' : 'bg-teal-500/10 border-teal-500/20 text-teal-400'
              }`}>
                <Shield className="w-8 h-8 animate-pulse" />
              </div>
            </div>

            <h1 className="font-display font-black text-2xl tracking-tight text-center uppercase mb-1">
              Admin Login
            </h1>
            <p className="text-[10px] font-mono text-center text-neutral-400 uppercase tracking-widest mb-8">
              System Administrator Access Only
            </p>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-100/10 border border-red-500/30 text-red-500 text-xs flex items-start space-x-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase block">
                  Admin Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="dikshant9911@gmail.com"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-xs focus:ring-1 focus:outline-none transition-all bg-white text-neutral-900 placeholder-neutral-400 ${
                      isProd 
                        ? 'border-sage-200 focus:ring-sage-700'
                        : 'border-neutral-850 focus:ring-teal-400'
                    }`}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase block">
                  Secure Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-xs focus:ring-1 focus:outline-none transition-all bg-white text-neutral-900 placeholder-neutral-400 ${
                      isProd 
                        ? 'border-sage-200 focus:ring-sage-700'
                        : 'border-neutral-850 focus:ring-teal-400'
                    }`}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3.5 rounded-xl font-display text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center space-x-2 mt-2 ${
                  loading 
                    ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed' 
                    : isProd
                      ? 'bg-sage-700 text-white hover:bg-sage-800'
                      : 'bg-teal-500 text-obsidian-950 hover:bg-teal-400'
                }`}
              >
                <span>{loading ? 'Authenticating Credentials...' : 'Authenticate Access'}</span>
              </button>
            </form>
          </div>
        ) : (
          /* Logged In View: Render Customizer Dashboard Form */
          <div className={`rounded-3xl border p-8 sm:p-12 shadow-md relative ${
            isProd ? 'bg-white border-sage-200' : 'bg-obsidian-900 border-neutral-800'
          }`}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-neutral-800 pb-6 mb-8 gap-4">
              <div>
                <span className={`text-[9px] font-mono tracking-widest block uppercase ${
                  isProd ? 'text-sage-700' : 'text-teal-400'
                }`}>
                  Secure Session Authenticated
                </span>
                <h2 className="font-display font-black text-2xl tracking-tight uppercase text-neutral-100">
                  Control Console
                </h2>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-red-500/20 bg-red-500/10 text-red-500 hover:bg-red-500/20 font-mono text-[10px] tracking-wider uppercase transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-100/10 border border-red-500/30 text-red-500 text-xs flex items-start space-x-2 animate-bounce">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {successMsg && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleSaveChanges} className="space-y-6">
              
              <div className="space-y-2">
                <label className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase block">
                  Website Headline (Homepage displays this)
                </label>
                <input
                  type="text"
                  required
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  placeholder="Engineering a Sustainable Future."
                  className={`w-full px-4 py-3 rounded-xl border text-xs focus:ring-1 focus:outline-none transition-all bg-white text-neutral-900 placeholder-neutral-400 ${
                    isProd 
                      ? 'border-sage-200 focus:ring-sage-700'
                      : 'border-neutral-850 focus:ring-teal-400'
                  }`}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase block">
                  Website Bio content
                </label>
                <textarea
                  required
                  rows={4}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Professional journey of Dikshant Dahiya..."
                  className={`w-full px-4 py-3 rounded-xl border text-xs focus:ring-1 focus:outline-none transition-all bg-white text-neutral-900 placeholder-neutral-400 ${
                    isProd 
                      ? 'border-sage-200 focus:ring-sage-700'
                      : 'border-neutral-850 focus:ring-teal-400'
                  }`}
                />
              </div>

              <div className="border-t border-neutral-800/60 pt-6 mt-6">
                <h3 className="font-display font-semibold text-xs text-neutral-400 uppercase tracking-widest mb-4">
                  Social Media Dynamic Links
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* LinkedIn */}
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono font-medium text-neutral-500 uppercase block">
                      LinkedIn URL
                    </label>
                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-3 w-3.5 h-3.5 text-neutral-500" />
                      <input
                        type="url"
                        value={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                        placeholder="https://linkedin.com"
                        className={`w-full pl-9 pr-3 py-2 rounded-lg border text-xs focus:ring-1 focus:outline-none transition-all bg-white text-neutral-900 placeholder-neutral-400 ${
                          isProd 
                            ? 'border-sage-200 focus:ring-sage-700'
                            : 'border-neutral-850 focus:ring-teal-400'
                        }`}
                      />
                    </div>
                  </div>

                  {/* GitHub */}
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono font-medium text-neutral-500 uppercase block">
                      GitHub URL
                    </label>
                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-3 w-3.5 h-3.5 text-neutral-500" />
                      <input
                        type="url"
                        value={github}
                        onChange={(e) => setGithub(e.target.value)}
                        placeholder="https://github.com"
                        className={`w-full pl-9 pr-3 py-2 rounded-lg border text-xs focus:ring-1 focus:outline-none transition-all bg-white text-neutral-900 placeholder-neutral-400 ${
                          isProd 
                            ? 'border-sage-200 focus:ring-sage-700'
                            : 'border-neutral-850 focus:ring-teal-400'
                        }`}
                      />
                    </div>
                  </div>

                  {/* YouTube */}
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono font-medium text-neutral-500 uppercase block">
                      YouTube URL
                    </label>
                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-3 w-3.5 h-3.5 text-neutral-500" />
                      <input
                        type="url"
                        value={youtube}
                        onChange={(e) => setYoutube(e.target.value)}
                        placeholder="https://youtube.com"
                        className={`w-full pl-9 pr-3 py-2 rounded-lg border text-xs focus:ring-1 focus:outline-none transition-all bg-white text-neutral-900 placeholder-neutral-400 ${
                          isProd 
                            ? 'border-sage-200 focus:ring-sage-700'
                            : 'border-neutral-850 focus:ring-teal-400'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* DYNAMIC PORTFOLIO CONTENT BLOCKS MANAGER */}
              <div className="border-t border-neutral-800/60 pt-6 mt-6 space-y-4">
                <div>
                  <h3 className="font-display font-semibold text-xs text-neutral-400 uppercase tracking-widest">
                    Dynamic Homepage Content Blocks
                  </h3>
                  <p className="text-[10px] text-neutral-500 mt-1 leading-relaxed">
                    Arrange, edit, delete, or upload media and documents dynamically. These blocks render real-time elements sorted sequentially onto your public homepage.
                  </p>
                </div>

                {/* Insertion button BEFORE the list begins */}
                <div className="flex items-center justify-center gap-1.5 opacity-55 hover:opacity-100 transition-opacity py-1 border border-dashed border-neutral-800 rounded-lg">
                  <span className="text-[9px] font-mono text-neutral-500 uppercase">Insert section at top:</span>
                  <button
                    type="button"
                    onClick={() => insertBlockAt(0, 'text')}
                    className="px-2 py-0.5 text-[9px] font-mono font-bold bg-neutral-800 rounded text-neutral-300 hover:text-white transition-colors"
                  >
                    + Text
                  </button>
                  <button
                    type="button"
                    onClick={() => insertBlockAt(0, 'image')}
                    className="px-2 py-0.5 text-[9px] font-mono font-bold bg-neutral-800 rounded text-neutral-300 hover:text-white transition-colors"
                  >
                    + Image
                  </button>
                  <button
                    type="button"
                    onClick={() => insertBlockAt(0, 'file_download')}
                    className="px-2 py-0.5 text-[9px] font-mono font-bold bg-neutral-800 rounded text-neutral-300 hover:text-white transition-colors"
                  >
                    + File
                  </button>
                </div>

                <div className="space-y-4">
                  {blocks && [...blocks]
                    .sort((a, b) => a.sort_order - b.sort_order)
                    .map((block, index) => (
                      <div 
                        key={block.id} 
                        className={`p-5 rounded-2xl border transition-all ${
                          isProd 
                            ? 'bg-sage-100/40 border-sage-205' 
                            : 'bg-obsidian-950/60 border-neutral-850'
                        }`}
                      >
                        {/* Block Header Controls */}
                        <div className="flex items-center justify-between mb-3 pb-2 border-b border-neutral-800/40">
                          <div className="flex items-center space-x-2">
                            <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase bg-neutral-900 px-2 py-0.5 rounded">
                              {index + 1}. {block.type.replace('_', ' ')}
                            </span>
                          </div>

                          <div className="flex items-center space-x-1">
                            {/* Move Up */}
                            <button
                              type="button"
                              disabled={index === 0}
                              onClick={() => moveBlock(index, 'up')}
                              className="p-1 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-400 disabled:opacity-30 disabled:hover:bg-neutral-900"
                              title="Move Up"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                              </svg>
                            </button>
                            {/* Move Down */}
                            <button
                              type="button"
                              disabled={index === blocks.length - 1}
                              onClick={() => moveBlock(index, 'down')}
                              className="p-1 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-400 disabled:opacity-30 disabled:hover:bg-neutral-900"
                              title="Move Down"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                            {/* Delete Button */}
                            <button
                              type="button"
                              onClick={() => deleteBlock(block.id)}
                              className="p-1 rounded bg-red-950 hover:bg-red-900 text-red-400 transition-colors ml-2"
                              title="Delete Block"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Block Body Inputs */}
                        {block.type === 'text' && (
                          <div className="space-y-1">
                            <label className="text-[9px] font-mono font-medium text-neutral-400 uppercase block">
                              Text Block Editor Segment
                            </label>
                            <textarea
                              value={block.value}
                              onChange={(e) => updateBlockValue(block.id, e.target.value)}
                              rows={4}
                              className={`w-full p-3 rounded-xl border text-xs focus:ring-1 focus:outline-none transition-all bg-white text-neutral-900 placeholder-neutral-400 ${
                                isProd 
                                  ? 'border-sage-200 focus:ring-sage-700'
                                  : 'border-neutral-800 focus:ring-teal-400'
                              }`}
                              placeholder="Type narrative description content here..."
                            />
                          </div>
                        )}

                        {block.type === 'image' && (
                          <div className="space-y-3">
                            <div className="flex gap-4">
                              {block.value && (
                                <div className="w-16 h-16 rounded-xl overflow-hidden border border-neutral-800 bg-black flex-shrink-0">
                                  <img 
                                    src={block.value} 
                                    alt={block.name || "Preview"} 
                                    className="w-full h-full object-cover" 
                                    referrerPolicy="no-referrer"
                                  />
                                </div>
                              )}
                              <div className="space-y-1 flex-grow">
                                <label className="text-[9px] font-mono font-medium text-neutral-400 uppercase block">
                                  Visual Image URL Link
                                </label>
                                <input
                                  type="text"
                                  value={block.value}
                                  onChange={(e) => updateBlockValue(block.id, e.target.value)}
                                  placeholder="https://images.unsplash.com/photo-..."
                                  className={`w-full px-3 py-1.5 rounded-lg border text-xs focus:ring-1 focus:outline-none transition-all bg-white text-neutral-900 placeholder-neutral-400 ${
                                    isProd 
                                      ? 'border-sage-200 focus:ring-sage-700'
                                      : 'border-neutral-800 focus:ring-teal-400'
                                  }`}
                                />
                              </div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2">
                              <div className="flex-grow">
                                <input
                                  type="text"
                                  value={block.name || ''}
                                  onChange={(e) => updateBlockName(block.id, e.target.value)}
                                  placeholder="Image Caption / Alt Title Label..."
                                  className={`w-full px-3 py-1.5 rounded-lg border text-xs focus:ring-1 focus:outline-none transition-all bg-white text-neutral-900 placeholder-neutral-400 ${
                                    isProd 
                                      ? 'border-sage-200 focus:ring-sage-700'
                                      : 'border-neutral-800 focus:ring-teal-400'
                                  }`}
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => handleBlockUpload(block.id, "image/*")}
                                className="px-4 py-1.5 rounded-lg font-mono text-[10px] tracking-wider uppercase font-bold text-teal-400 bg-teal-950/55 hover:bg-teal-900/60 border border-teal-500/20 transition-colors flex items-center justify-center space-x-1"
                              >
                                <span>Upload / Replace Image</span>
                              </button>
                            </div>
                          </div>
                        )}

                        {block.type === 'file_download' && (
                          <div className="space-y-3">
                            <div className="space-y-1">
                              <label className="text-[9px] font-mono font-medium text-neutral-400 uppercase block">
                                Downloadable Document url Link
                              </label>
                              <input
                                type="text"
                                value={block.value}
                                onChange={(e) => updateBlockValue(block.id, e.target.value)}
                                placeholder="/uploads/Dikshant_Dahiya_Portfolio..."
                                className={`w-full px-3 py-1.5 rounded-lg border text-xs focus:ring-1 focus:outline-none transition-all bg-white text-neutral-900 placeholder-neutral-400 ${
                                  isProd 
                                    ? 'border-sage-200 focus:ring-sage-700'
                                    : 'border-neutral-800 focus:ring-teal-400'
                                }`}
                              />
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2">
                              <div className="flex-grow">
                                <input
                                  type="text"
                                  value={block.name || ''}
                                  onChange={(e) => updateBlockName(block.id, e.target.value)}
                                  placeholder="File Title Label (e.g. Audit SOP Program.pdf)..."
                                  className={`w-full px-3 py-1.5 rounded-lg border text-xs focus:ring-1 focus:outline-none transition-all bg-white text-neutral-900 placeholder-neutral-400 ${
                                    isProd 
                                      ? 'border-sage-200 focus:ring-sage-700'
                                      : 'border-neutral-800 focus:ring-teal-400'
                                  }`}
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => handleBlockUpload(block.id, ".pdf,.doc,.docx,.xls,.xlsx,.csv,.ppt,.pptx")}
                                className="px-4 py-1.5 rounded-lg font-mono text-[10px] tracking-wider uppercase font-bold text-teal-400 bg-teal-950/55 hover:bg-teal-900/60 border border-teal-500/20 transition-colors flex items-center justify-center space-x-1"
                              >
                                <span>Manage Files</span>
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Inline Insertion Controls BELOW this card */}
                        <div className="flex items-center justify-center gap-1.5 opacity-55 hover:opacity-100 transition-opacity mt-4 pt-1 border-t border-dashed border-neutral-800/45">
                          <span className="text-[8px] font-mono text-neutral-400">Insert below this:</span>
                          <button
                            type="button"
                            onClick={() => insertBlockAt(index + 1, 'text')}
                            className="px-2 py-0.5 text-[8px] font-mono font-bold bg-neutral-800 rounded text-neutral-400 hover:text-white transition-colors"
                          >
                            + Text block
                          </button>
                          <button
                            type="button"
                            onClick={() => insertBlockAt(index + 1, 'image')}
                            className="px-2 py-0.5 text-[8px] font-mono font-bold bg-neutral-800 rounded text-neutral-400 hover:text-white transition-colors"
                          >
                            + Image block
                          </button>
                          <button
                            type="button"
                            onClick={() => insertBlockAt(index + 1, 'file_download')}
                            className="px-2 py-0.5 text-[8px] font-mono font-bold bg-neutral-800 rounded text-neutral-400 hover:text-white transition-colors"
                          >
                            + File attachment
                          </button>
                        </div>

                      </div>
                    ))}
                </div>

                {/* Bottom Main Add Section Buttons if blocks is empty */}
                {(!blocks || blocks.length === 0) && (
                  <div className="text-center p-8 border border-dashed border-neutral-800 rounded-3xl">
                    <p className="text-xs text-neutral-500">No content blocks exist. Click below to add your first chapter section!</p>
                    <div className="mt-4 flex items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => insertBlockAt(0, 'text')}
                        className="px-4 py-2 font-mono text-xs text-teal-400 bg-teal-950/40 rounded-xl hover:bg-teal-900/40 border border-teal-500/20"
                      >
                        + Add Text
                      </button>
                      <button
                        type="button"
                        onClick={() => insertBlockAt(0, 'image')}
                        className="px-4 py-2 font-mono text-xs text-teal-400 bg-teal-950/40 rounded-xl hover:bg-teal-900/40 border border-teal-500/20"
                      >
                        + Add Image
                      </button>
                      <button
                        type="button"
                        onClick={() => insertBlockAt(0, 'file_download')}
                        className="px-4 py-2 font-mono text-xs text-teal-400 bg-teal-950/40 rounded-xl hover:bg-teal-900/40 border border-teal-500/20"
                      >
                        + Add File Download
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-xl font-display text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center space-x-2 mt-4 shadow-sm ${
                  loading 
                    ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed' 
                    : isProd
                      ? 'bg-sage-700 text-white hover:bg-sage-800'
                      : 'bg-teal-500 text-obsidian-950 hover:bg-teal-400'
                }`}
              >
                <Save className="w-4 h-4" />
                <span>{loading ? 'Securing Configuration changes...' : 'Save Changes'}</span>
              </button>

            </form>

            {/* FILE STORAGE HUB WITH DOCK-LOADER */}
            <div className="border-t border-neutral-800/60 pt-8 mt-10 space-y-6">
              <div>
                <h3 className="font-display font-black text-lg tracking-tight uppercase text-neutral-100">
                  Asset Manager & Storage Hub
                </h3>
                <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest mt-1">
                  Upload any custom files (PNG, JPG, PDF, SVG) and receive permanent site-relative live URLs.
                </p>
              </div>

              {/* Upload messages */}
              {uploadError && (
                <div className="p-4 rounded-xl bg-red-100/10 border border-red-500/30 text-red-500 text-xs flex items-center space-x-2 animate-pulse">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span>{uploadError}</span>
                </div>
              )}

              {uploadSuccess && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{uploadSuccess}</span>
                </div>
              )}

              {/* Drag and Drop Zone */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${
                  dragOver
                    ? isProd
                      ? 'border-sage-700 bg-sage-100/50 scale-[1.01]'
                      : 'border-teal-400 bg-teal-400/10 scale-[1.01]'
                    : isProd
                      ? 'border-sage-200 hover:border-sage-400 hover:bg-sage-50/50'
                      : 'border-neutral-800 hover:border-neutral-700 hover:bg-neutral-850/30'
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  className="hidden"
                  accept=".png,.jpg,.jpeg,.pdf,.svg"
                />
                
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className={`p-3 rounded-xl border ${
                    isProd ? 'bg-sage-50 text-sage-700 border-sage-100' : 'bg-neutral-850 text-teal-400 border-neutral-800'
                  }`}>
                    <UploadCloud className={`w-8 h-8 ${uploading ? 'animate-bounce' : ''}`} />
                  </div>
                  
                  <div className="space-y-1">
                    <p className="font-display font-semibold text-xs tracking-wide uppercase text-neutral-200">
                      {uploading ? 'Transporting Asset...' : 'Click or Drag & Drop File'}
                    </p>
                    <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                      PNG, JPG, PDF, SVG up to 45MB
                    </p>
                  </div>
                </div>
              </div>

              {/* Tracking Log Table List of Assets */}
              <div className="space-y-3">
                <div className="flex justify-between items-center bg-obsidian-950/40 p-2 rounded-lg">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase">
                    Live Storage Assets ({portfolio.assets?.length || 0})
                  </span>
                  <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest">
                    Active Connections
                  </span>
                </div>

                {!portfolio.assets || portfolio.assets.length === 0 ? (
                  <div className={`rounded-xl p-8 text-center border font-mono text-xs text-neutral-500 ${
                    isProd ? 'bg-sage-50/50 border-sage-100' : 'bg-obsidian-950/40 border-neutral-850'
                  }`}>
                    No custom assets uploaded yet. Drag files directly above to generate deployment URLs.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {portfolio.assets.map((asset, index) => {
                      const isImage = /\.(jpe?g|png|svg)$/i.test(asset.url);
                      const isPdf = /\.pdf$/i.test(asset.url);
                      return (
                        <div 
                          key={index} 
                          className={`rounded-xl border p-4 flex flex-col justify-between space-y-4 transition-all duration-200 hover:shadow-sm ${
                            isProd 
                              ? 'bg-sage-50/65 hover:bg-sage-50 border-sage-100' 
                              : 'bg-obsidian-950/60 hover:bg-obsidian-950/80 border-neutral-850'
                          }`}
                        >
                          <div className="flex items-start space-x-3.5">
                            {/* Preview thumbnail / Icon indicator */}
                            <div className={`w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center border bg-white ${
                              isProd ? 'border-sage-200/60' : 'border-neutral-800/80'
                            }`}>
                              {isImage ? (
                                <img 
                                  src={asset.url} 
                                  alt={asset.name} 
                                  className="w-full h-full object-cover"
                                  referrerPolicy="no-referrer"
                                />
                              ) : isPdf ? (
                                <FileText className="w-6 h-6 text-red-500" />
                              ) : (
                                <FileCode className="w-6 h-6 text-blue-500" />
                              )}
                            </div>

                            <div className="overflow-hidden space-y-0.5">
                              <p className="font-sans font-semibold text-xs truncate text-neutral-200" title={asset.name}>
                                {asset.name}
                              </p>
                              <p className="text-[10px] font-mono text-neutral-500 uppercase">
                                {asset.size} • {asset.type.split('/')[1]?.toUpperCase() || 'FILE'}
                              </p>
                            </div>
                          </div>

                          {/* Actions bar */}
                          <div className="flex items-center gap-2 pt-2 border-t border-neutral-800/50">
                            <button
                              type="button"
                              onClick={() => copyToClipboard(asset.url)}
                              className={`flex-grow flex items-center justify-center space-x-1 py-1.5 rounded-lg border text-[10px] font-mono tracking-wider uppercase transition-colors ${
                                copiedUrl === asset.url
                                  ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                                  : isProd
                                    ? 'bg-white border-sage-200 text-sage-800 hover:bg-sage-50'
                                    : 'bg-neutral-850 border-neutral-800 text-neutral-300 hover:bg-neutral-800'
                              }`}
                            >
                              <Copy className="w-3 h-3" />
                              <span>{copiedUrl === asset.url ? 'Copied Link!' : 'Copy Link'}</span>
                            </button>

                            <a
                              href={asset.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`p-1.5 rounded-lg border transition-colors ${
                                isProd
                                  ? 'bg-white border-sage-200 text-sage-700 hover:bg-sage-50'
                                  : 'bg-neutral-850 border-neutral-800 text-neutral-400 hover:bg-neutral-800'
                              }`}
                              title="Open Live URL"
                            >
                              <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
                            </a>

                            <button
                              type="button"
                              onClick={() => handleDeleteAsset(asset.url)}
                              className="p-1.5 rounded-lg border border-red-500/20 bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                              title="Delete Asset File"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                        </div>
                      );
                    })}
                  </div>
                )}

              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

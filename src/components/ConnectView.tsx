import { useState, useEffect, FormEvent } from 'react';
import { Mail, Phone, MapPin, Youtube, Linkedin, Github, CheckCircle2, Clock, Send, Play, Terminal } from 'lucide-react';
import { Message, PortfolioData } from '../types';

interface ConnectViewProps {
  mode: 'professional' | 'personal';
  portfolio: PortfolioData;
}

export default function ConnectView({ mode, portfolio }: ConnectViewProps) {
  const isProd = mode === 'professional';

  // Real-time IST Clock (Indian Standard Time - UTC+5:30)
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Calculate IST manually
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const istOffset = 5.5 * 3600000;
      const istTime = new Date(utc + istOffset);
      
      setCurrentTime(istTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Form States
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [organization, setOrganization] = useState<string>('');
  const [subject, setSubject] = useState<string>('Brief Professional Inquiry');
  const [message, setMessage] = useState<string>('');

  // UI feedback states
  const [copyStatus, setCopyStatus] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);

  // Clipboard copy
  const handleCopyEmail = () => {
    navigator.clipboard.writeText('Dikshant9911@gmail.com');
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000);
  };

  // Submit handler
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert('Please populate the required verification columns (Name, Email, Message).');
      return;
    }

    setIsSubmitting(true);
    setTerminalLogs([
      '>> INITIATING SMTP CARRIER SOCKET...',
      '>> ESTABLISHING SSL handshake (AES-256)...',
    ]);

    // Simulated logging schedule
    setTimeout(() => {
      setTerminalLogs(prev => [...prev, '>> RESOLVING MX record lookup for target inbox: Dikshant9911@gmail.com...']);
    }, 400);

    setTimeout(() => {
      setTerminalLogs(prev => [...prev, '>> INJECTING payload: MIME-type multipart/alternative...']);
    }, 800);

    setTimeout(() => {
      setTerminalLogs(prev => [...prev, '>> INBOX SUCCESS. Message envelope accepted by MX server. code=250.']);
      
      // Store locally to simulate a local inbox
      const storedMailsJSON = localStorage.getItem('duality_inquiries');
      const storedMails: Message[] = storedMailsJSON ? JSON.parse(storedMailsJSON) : [];
      const newMail: Message = {
        id: Math.random().toString(36).substring(7),
        name,
        email,
        phone,
        organization,
        subject,
        message,
        timestamp: new Date().toISOString()
      };
      
      localStorage.setItem('duality_inquiries', JSON.stringify([newMail, ...storedMails]));
      
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 1500);
  };

  const handleResetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setOrganization('');
    setSubject('Brief Professional Inquiry');
    setMessage('');
    setSubmitSuccess(false);
    setTerminalLogs([]);
  };

  return (
    <div className={`transition-colors duration-300 min-h-screen py-16 ${
      isProd ? 'bg-sage-50 text-sage-950' : 'bg-obsidian-950 text-neutral-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Display */}
        <div className="mb-16">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider ${
            isProd ? 'bg-sage-200 text-sage-800 border border-sage-300' : 'bg-teal-500/10 text-teal-400 border border-teal-500/20'
          }`}>
            Communication Vertex
          </span>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl font-extrabold tracking-tight">
            Get in Touch.
          </h1>
          <p className="mt-3 text-xs sm:text-sm max-w-xl font-light leading-relaxed">
            Whether for ISO standards testing, high-fidelity quantitative financial models, or to discuss cognitive systems &mdash; establishing clean channels is the priority.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Email Card */}
            <div className={`p-6 rounded-2xl border transition-all ${
              isProd ? 'bg-white border-sage-200 shadow-sm' : 'bg-obsidian-900 border-neutral-800'
            }`}>
              <div className="flex items-start justify-between">
                <div>
                  <span className={`text-[9px] font-mono uppercase tracking-widest block ${
                    isProd ? 'text-sage-700' : 'text-neutral-400'
                  }`}>
                    Global Electronic Mail
                  </span>
                  <p className="font-display font-bold text-lg mt-1 select-all">
                    Dikshant9911@gmail.com
                  </p>
                </div>
                
                <button
                  id="copy-email-btn"
                  onClick={handleCopyEmail}
                  className={`text-[10px] font-mono font-semibold px-2.5 py-1 rounded-md border transition-colors ${
                    isProd
                      ? 'bg-sage-100 border-sage-200 text-sage-800 hover:bg-sage-200'
                      : 'bg-neutral-800 border-neutral-700 text-neutral-300 hover:bg-neutral-700'
                  }`}
                >
                  {copyStatus ? 'Copied' : 'Copy'}
                </button>
              </div>
              <p className={`text-[11px] mt-4 leading-normal ${isProd ? 'text-sage-700' : 'text-neutral-400'}`}>
                Expect high-fidelity compliance feedback within 18 standard tracking hours.
              </p>
            </div>

            {/* Direct Calling Point */}
            <div className={`p-6 rounded-2xl border transition-all ${
              isProd ? 'bg-white border-sage-200' : 'bg-obsidian-900 border-neutral-800'
            }`}>
              <div>
                <span className={`text-[9px] font-mono uppercase tracking-widest block ${
                  isProd ? 'text-sage-700' : 'text-neutral-400'
                }`}>
                  Secure Voice Line
                </span>
                <a 
                  href="tel:+919582776493" 
                  className="font-display font-bold text-lg mt-1 block hover:underline"
                >
                  +91 9582776493
                </a>
              </div>
              <div className="flex items-center space-x-2 mt-4 text-[10px] font-mono text-neutral-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>IST standard business calling window open (09:00 - 18:00)</span>
              </div>
            </div>

            {/* Geological location card with IST Live Clock */}
            <div className={`p-6 rounded-2xl border transition-all relative overflow-hidden ${
              isProd ? 'bg-white border-sage-200' : 'bg-obsidian-900 border-neutral-800'
            }`}>
              <div className="absolute top-0 right-0 p-3 text-neutral-400 font-mono text-[9px] text-right pointer-events-none">
                CLOCK: IST
              </div>

              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-xl border flex-shrink-0 ${
                  isProd ? 'bg-sage-100 border-sage-200 text-sage-800' : 'bg-neutral-800 border-neutral-700 text-neutral-200'
                }`}>
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className={`text-[9px] font-mono uppercase tracking-widest block ${
                    isProd ? 'text-sage-700' : 'text-neutral-400'
                  }`}>
                    Primary Station Location
                  </span>
                  <p className="font-display font-bold text-base mt-0.5 text-neutral-100">
                    New Delhi, India
                  </p>
                  
                  {/* Digital Clock */}
                  <div className="mt-3 flex items-center space-x-2 bg-black/10 dark:bg-black/30 w-fit px-3 py-1.5 rounded-lg border border-black/5 dark:border-white/5">
                    <Clock className="w-3.5 h-3.5 text-teal-400" />
                    <span className="font-mono text-xs font-bold tracking-widest text-neutral-100">
                      {currentTime || '00:00:00'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social profiles row */}
            <div className="flex items-center gap-3">
              {[
                { label: 'LinkedIn', icon: Linkedin, url: portfolio?.linkedin || 'https://linkedin.com' },
                { label: 'GitHub', icon: Github, url: portfolio?.github || 'https://github.com' },
                { label: 'YouTube', icon: Youtube, url: portfolio?.youtube || 'https://youtube.com' }
              ].map((soc, idx) => {
                const Icon = soc.icon;
                return (
                  <a
                    key={idx}
                    href={soc.url}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl border font-display text-xs font-semibold tracking-wide uppercase transition-all ${
                      isProd
                        ? 'bg-white border-sage-200 text-sage-800 hover:bg-sage-100 hover:text-sage-950 shadow-sm'
                        : 'bg-obsidian-900 border-neutral-800 text-neutral-300 hover:bg-neutral-800 hover:text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{soc.label}</span>
                  </a>
                );
              })}
            </div>

          </div>

          {/* Right Column: Inquiry Input Card Form */}
          <div className="lg:col-span-7">
            <div className={`p-6 sm:p-10 rounded-3xl border ${
              isProd ? 'bg-white border-sage-200 shadow-sm' : 'bg-obsidian-900 border-neutral-800'
            }`}>
              
              {!submitSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase block">
                        Your Full Name *
                      </label>
                      <input 
                        type="text" 
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className={`w-full px-4 py-3 rounded-xl border text-xs focus:ring-1 focus:outline-none transition-all ${
                          isProd 
                            ? 'bg-sage-50 border-sage-200 text-sage-950 focus:ring-sage-700 focus:border-sage-700' 
                            : 'bg-obsidian-950 border-neutral-850 text-neutral-100 focus:ring-teal-400 focus:border-teal-400'
                        }`}
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase block">
                        Email Address *
                      </label>
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@organization.com"
                        className={`w-full px-4 py-3 rounded-xl border text-xs focus:ring-1 focus:outline-none transition-all ${
                          isProd 
                            ? 'bg-sage-50 border-sage-200 text-sage-950 focus:ring-sage-700 focus:border-sage-700' 
                            : 'bg-obsidian-950 border-neutral-850 text-neutral-100 focus:ring-teal-400 focus:border-teal-400'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Phone */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase block">
                        Phone (Optional)
                      </label>
                      <input 
                        type="tel" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className={`w-full px-4 py-3 rounded-xl border text-xs focus:ring-1 focus:outline-none transition-all ${
                          isProd 
                            ? 'bg-sage-50 border-sage-200 text-sage-950 focus:ring-sage-700 focus:border-sage-700' 
                            : 'bg-obsidian-950 border-neutral-850 text-neutral-100 focus:ring-teal-400 focus:border-teal-400'
                        }`}
                      />
                    </div>

                    {/* Organization */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase block">
                        Organization / Firm
                      </label>
                      <input 
                        type="text" 
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        placeholder="Sustainalytics Inc."
                        className={`w-full px-4 py-3 rounded-xl border text-xs focus:ring-1 focus:outline-none transition-all ${
                          isProd 
                            ? 'bg-sage-50 border-sage-200 text-sage-950 focus:ring-sage-700 focus:border-sage-700' 
                            : 'bg-obsidian-950 border-neutral-850 text-neutral-100 focus:ring-teal-400 focus:border-teal-400'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Subject selector */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase block">
                      Subject Line / Intent *
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border text-xs focus:ring-1 focus:outline-none transition-all ${
                        isProd 
                          ? 'bg-sage-50 border-sage-200 text-sage-950 focus:ring-sage-700 focus:border-sage-700' 
                          : 'bg-obsidian-950 border-neutral-850 text-neutral-100 focus:ring-teal-400 focus:border-teal-400'
                      }`}
                    >
                      <option value="Brief Professional Inquiry">Brief Professional Inquiry</option>
                      <option value="ESG Benchmarking Partnership">ESG Benchmarking Partnership</option>
                      <option value="ISO Advisory Audit Request">ISO Advisory Audit Request</option>
                      <option value="Excel/VBA Financial Scripting">Excel/VBA Financial Scripting</option>
                      <option value="Uncovrd Minds Media Project">Uncovrd Minds Media Project</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase block">
                      Message Core Content *
                    </label>
                    <textarea 
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={5}
                      placeholder="Detail your request or integration inquiry here..."
                      className={`w-full px-4 py-3 rounded-xl border text-xs focus:ring-1 focus:outline-none transition-all ${
                        isProd 
                          ? 'bg-sage-50 border-sage-200 text-sage-950 focus:ring-sage-700 focus:border-sage-700' 
                          : 'bg-obsidian-950 border-neutral-850 text-neutral-100 focus:ring-teal-400 focus:border-teal-400'
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 rounded-xl font-display text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center space-x-2 ${
                      isSubmitting 
                        ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed' 
                        : isProd
                          ? 'bg-sage-700 text-white hover:bg-sage-800 shadow-md'
                          : 'bg-teal-500 text-obsidian-950 hover:bg-teal-400 shadow-[0_0_20px_rgba(20,184,166,0.3)]'
                    }`}
                  >
                    <Send className="w-4.5 h-4.5" />
                    <span>{isSubmitting ? 'Transmitting Ingress Packages...' : 'Transmit Connection Message'}</span>
                  </button>

                  {/* Micro Compiler Console output frame */}
                  {terminalLogs.length > 0 && (
                    <div className="mt-4 bg-black/90 p-4 rounded-xl border border-neutral-800 font-mono text-[9px] text-teal-400 space-y-1 block max-h-[100px] overflow-y-auto select-none">
                      <div className="flex items-center space-x-1.5 text-neutral-500 font-bold mb-1">
                        <Terminal className="w-3.5 h-3.5" />
                        <span>// MOCK SMTP CONSOLE:</span>
                      </div>
                      {terminalLogs.map((log, idx) => (
                        <div key={idx} className="leading-snug">
                          {log}
                        </div>
                      ))}
                    </div>
                  )}

                </form>
              ) : (
                <div className="text-center py-12 space-y-6">
                  <div className="flex justify-center">
                    <div className={`p-4 rounded-2xl ${isProd ? 'bg-sage-100 text-sage-800' : 'bg-teal-500/10 text-teal-400 border border-teal-500/20'}`}>
                      <CheckCircle2 className="w-12 h-12" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-display font-bold text-xl text-neutral-100">
                      Transmission Confirmed
                    </h3>
                    <p className="text-xs text-neutral-400 max-w-sm mx-auto leading-relaxed">
                      We successfully handshaked with the target smtp carrier. Your session data has been routed into the local storage mock database safely.
                    </p>
                  </div>

                  <button
                    onClick={handleResetForm}
                    className={`px-6 py-3 rounded-xl font-display text-xs font-bold uppercase tracking-wider transition-all ${
                      isProd
                        ? 'bg-sage-700 text-white hover:bg-sage-800'
                        : 'bg-neutral-800 border border-neutral-700 text-neutral-200 hover:bg-neutral-700'
                    }`}
                  >
                    Transmit Another Message
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

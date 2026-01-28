
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  LogOut, 
  Trash2, 
  Mail, 
  MailOpen,
  User, 
  Clock, 
  Loader2, 
  AlertCircle, 
  Inbox, 
  Database, 
  Lock,
  Star,
  CheckCircle,
  Search,
  MessageSquare,
  Zap,
  ArrowLeft,
  Maximize2
} from 'lucide-react';
import { CloudDB, Message } from '../lib/db';
import { cn } from '../lib/utils';

interface AdminDashboardProps {
  onClose: () => void;
}

type FilterType = 'unread' | 'starred' | 'read' | 'all';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const [isAuth, setIsAuth] = useState(sessionStorage.getItem('admin_auth') === 'active');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [dbError, setDbError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>('unread');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'alioua.159') {
      sessionStorage.setItem('admin_auth', 'active');
      setIsAuth(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    setIsAuth(false);
    onClose();
  };

  const fetchMessages = async () => {
    setLoading(true);
    setDbError(null);
    try {
      const data = await CloudDB.getMessages();
      setMessages(data);
    } catch (err: any) {
      console.error('Failed to fetch from Realtime DB:', err);
      if (err.message?.includes('permission_denied') || err.code === 'PERMISSION_DENIED') {
        setDbError("Access Denied: Please set '.read': true in your Firebase Rules.");
      } else {
        setDbError("Network Error: Could not connect to the database stream.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleToggleRead = async (m: Message) => {
    try {
      await CloudDB.toggleRead(m.id, m.isRead);
      setMessages(prev => prev.map(msg => msg.id === m.id ? { ...msg, isRead: !m.isRead } : msg));
    } catch (err) {
      alert("Status update failed");
    }
  };

  const handleToggleStar = async (m: Message) => {
    try {
      const newStarStatus = !m.isStarred;
      const shouldAlsoMarkRead = newStarStatus && !m.isRead;

      await CloudDB.toggleStar(m.id, m.isStarred);
      if (shouldAlsoMarkRead) {
        await CloudDB.toggleRead(m.id, false);
      }

      setMessages(prev => prev.map(msg => 
        msg.id === m.id 
          ? { ...msg, isStarred: newStarStatus, isRead: shouldAlsoMarkRead ? true : msg.isRead } 
          : msg
      ));
    } catch (err) {
      alert("Priority update failed");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this record from Realtime Database?')) return;
    try {
      await CloudDB.deleteMessage(id);
      setMessages(prev => prev.filter(m => m.id !== id));
      if (selectedMessageId === id) setSelectedMessageId(null);
    } catch (err: any) {
      alert('Deletion failed: ' + err.message);
    }
  };

  useEffect(() => {
    if (isAuth) fetchMessages();
  }, [isAuth]);

  const senderFrequency = useMemo(() => {
    const counts: Record<string, number> = {};
    messages.forEach(m => {
      const key = m.email.toLowerCase();
      counts[key] = (counts[key] || 0) + 1;
    });
    return counts;
  }, [messages]);

  const filterCounts = useMemo(() => ({
    unread: messages.filter(m => !m.isRead && !m.isStarred).length,
    starred: messages.filter(m => m.isStarred).length,
    read: messages.filter(m => m.isRead && !m.isStarred).length,
    all: messages.length
  }), [messages]);

  const filteredMessages = useMemo(() => {
    let result = messages;
    switch(activeFilter) {
      case 'unread': result = result.filter(m => !m.isRead && !m.isStarred); break;
      case 'starred': result = result.filter(m => m.isStarred); break;
      case 'read': result = result.filter(m => m.isRead && !m.isStarred); break;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(m => m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q));
    }
    return result;
  }, [messages, activeFilter, searchQuery]);

  const selectedMessage = useMemo(() => 
    messages.find(m => m.id === selectedMessageId), 
    [messages, selectedMessageId]
  );

  if (!isAuth) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md bg-gray-900/50 border border-white/10 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-2xl">
          <div className="text-center mb-10 text-white">
            <Shield size={40} className="mx-auto mb-6 text-brand-500 shadow-[0_0_20px_rgba(16,185,129,0.3)]" />
            <h1 className="text-3xl font-display font-bold mb-2">Central Ops</h1>
            <p className="text-gray-500 text-sm">Authentication Required</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-500 transition-all" placeholder="••••••••" />
            <button type="submit" className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-brand-600/20">Initialize Sync</button>
            <button type="button" onClick={onClose} className="w-full text-gray-500 text-sm hover:text-white transition-colors">Return to Portfolio</button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] text-gray-100 selection:bg-brand-500/30 overflow-x-hidden">
      {/* Detail View Overlay */}
      <AnimatePresence>
        {selectedMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[100] bg-gray-950/80 backdrop-blur-2xl flex flex-col p-6 md:p-12 overflow-y-auto"
          >
            <div className="max-w-6xl mx-auto w-full flex-grow flex flex-col">
              <header className="flex items-center justify-between mb-12">
                <button 
                  onClick={() => setSelectedMessageId(null)}
                  className="group flex items-center gap-3 text-gray-400 hover:text-white transition-all bg-white/5 hover:bg-white/10 px-6 py-3 rounded-2xl border border-white/5"
                >
                  <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                  <span className="font-bold text-xs uppercase tracking-[0.2em]">Pipeline List</span>
                </button>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => handleToggleRead(selectedMessage)}
                    className={cn(
                      "px-6 py-3 rounded-2xl border transition-all text-[10px] font-bold uppercase tracking-widest",
                      selectedMessage.isRead ? "bg-white/5 border-white/5 text-gray-500" : "bg-brand-500/10 border-brand-500/20 text-brand-400"
                    )}
                  >
                    {selectedMessage.isRead ? 'Already Archived' : 'Archive Message'}
                  </button>
                  <button 
                    onClick={() => handleToggleStar(selectedMessage)}
                    className={cn(
                      "p-3 rounded-2xl border transition-all",
                      selectedMessage.isStarred ? "bg-amber-500/20 border-amber-500/30 text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)]" : "bg-white/5 border-white/5 text-gray-500"
                    )}
                  >
                    <Star size={20} className={selectedMessage.isStarred ? "fill-amber-500" : ""} />
                  </button>
                  <button 
                    onClick={() => handleDelete(selectedMessage.id)}
                    className="p-3 bg-red-500/10 border border-red-500/20 text-red-500/70 hover:text-red-500 rounded-2xl transition-all"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </header>

              <div className="grid lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-4 space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-[10px] font-bold tracking-[0.4em] text-brand-500 uppercase">Sender Identity</h2>
                    <h3 className="text-4xl font-display font-bold tracking-tight text-white">{selectedMessage.name}</h3>
                    <p className="text-xl text-gray-400 font-medium">{selectedMessage.email}</p>
                  </div>

                  <div className="p-6 bg-white/5 rounded-3xl border border-white/5 space-y-4">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-gray-500 uppercase tracking-widest">Received</span>
                      <span className="text-gray-300">{new Date(selectedMessage.createdAt).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-gray-500 uppercase tracking-widest">Referral</span>
                      <span className="text-cyan-400">{selectedMessage.referral || "Internal Link"}</span>
                    </div>
                    {senderFrequency[selectedMessage.email.toLowerCase()] > 1 && (
                      <div className="pt-4 border-t border-white/5">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-500/10 rounded-lg text-brand-400 text-[10px] font-bold uppercase tracking-widest">
                          <Zap size={12} fill="currentColor" /> {senderFrequency[selectedMessage.email.toLowerCase()]}x Multi-Sender Node
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="lg:col-span-8">
                  <div className="relative group/msg min-h-[500px] flex flex-col bg-black/40 border border-white/5 rounded-[3rem] p-10 md:p-16">
                    <div className="absolute top-6 left-10 text-[9px] font-mono text-gray-700 tracking-[0.5em] uppercase flex items-center gap-2">
                      <MessageSquare size={12} /> System_Decoded_Buffer
                    </div>
                    <div className="absolute top-6 right-10 text-[9px] font-mono text-gray-700 tracking-[0.5em] uppercase">
                      PERSISTENT_LOGS_v2.5
                    </div>
                    <div className="mt-8 text-2xl md:text-3xl text-gray-200 leading-relaxed font-light whitespace-pre-wrap">
                      {selectedMessage.message}
                    </div>
                    <div className="mt-auto pt-12 text-center opacity-10">
                      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6" />
                      <span className="text-[8px] font-mono tracking-[1em]">END OF SIGNAL TRANSMISSION</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="border-b border-white/5 bg-gray-900/20 backdrop-blur-md sticky top-0 z-50 px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Database size={20} />
          </div>
          <h1 className="text-lg font-display font-bold hidden sm:block">RT-Database Admin</h1>
        </div>
        
        <div className="flex items-center gap-4">
           <button onClick={fetchMessages} className="p-2 hover:bg-white/5 rounded-lg text-gray-500 hover:text-white transition-all" title="Refresh Streams">
              <Loader2 size={18} className={loading ? 'animate-spin' : ''} />
           </button>
           <button onClick={handleLogout} className="text-xs font-bold text-gray-400 hover:text-white flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/5 transition-all">
            <LogOut size={14} /> Logout
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
          <div>
            <h2 className="text-[10px] font-bold tracking-[0.3em] text-brand-500 uppercase mb-2">Node Intelligence</h2>
            <h3 className="text-4xl font-display font-bold tracking-tight">Message Pipeline</h3>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Search index..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-3 text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 w-full md:w-[260px] transition-all"
              />
            </div>

            <div className="flex gap-2 p-1.5 bg-white/5 rounded-2xl border border-white/5 overflow-x-auto custom-scrollbar">
              {[
                { id: 'unread', label: 'Pending', icon: Mail, count: filterCounts.unread },
                { id: 'starred', label: 'Priority', icon: Star, count: filterCounts.starred },
                { id: 'read', label: 'Archived', icon: CheckCircle, count: filterCounts.read },
                { id: 'all', label: 'All', icon: Inbox, count: filterCounts.all },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id as FilterType)}
                  className={cn(
                    "flex items-center gap-3 px-5 py-2 rounded-xl text-[10px] font-bold transition-all uppercase tracking-widest whitespace-nowrap",
                    activeFilter === f.id ? "bg-brand-600 text-white shadow-lg shadow-brand-600/20" : "text-gray-500 hover:text-white hover:bg-white/5"
                  )}
                >
                  <f.icon size={12} />
                  {f.label}
                  {f.count > 0 && (
                    <span className={cn(
                      "px-1.5 py-0.5 rounded-md text-[9px] font-mono",
                      activeFilter === f.id ? "bg-white/20 text-white" : "bg-white/10 text-gray-400"
                    )}>
                      {f.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <AnimatePresence mode='popLayout'>
            {filteredMessages.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }} 
                className="py-40 text-center border-2 border-dashed border-white/5 rounded-[3rem] bg-white/[0.01]"
              >
                <Inbox size={48} className="mx-auto mb-6 text-gray-800" />
                <h4 className="text-xl font-display font-bold text-gray-600 mb-2">Queue Clear</h4>
                <p className="text-gray-700 text-sm max-w-xs mx-auto">No signals detected in the {activeFilter} segment {searchQuery && `matching "${searchQuery}"`}.</p>
              </motion.div>
            ) : (
              filteredMessages.map((m) => {
                const count = senderFrequency[m.email.toLowerCase()] || 1;
                return (
                  <motion.div
                    layout
                    key={m.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
                    className={cn(
                      "group relative p-8 md:p-10 rounded-[2.5rem] border transition-all duration-500 cursor-pointer",
                      m.isRead ? "bg-white/[0.02] border-white/5 opacity-60" : "bg-white/[0.04] border-white/10 shadow-2xl",
                      m.isStarred && "border-amber-500/30 bg-amber-500/[0.03] opacity-100 shadow-[0_0_30px_rgba(245,158,11,0.05)]"
                    )}
                    onClick={() => setSelectedMessageId(m.id)}
                  >
                    {/* Maximize Icon Tooltip */}
                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-white/10 rounded-xl text-white/50">
                      <Maximize2 size={14} />
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 pointer-events-none">
                      <div className="md:w-1/3 space-y-5">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-2.5 h-2.5 rounded-full transition-all duration-500", 
                            m.isStarred ? "bg-amber-500 shadow-[0_0_10px_#f59e0b]" : 
                            m.isRead ? "bg-gray-700" : "bg-brand-500 animate-pulse shadow-[0_0_10px_#10b981]"
                          )} />
                          <span className="font-bold text-xl tracking-tight">{m.name}</span>
                          {m.isStarred && <Star size={16} className="text-amber-500 fill-amber-500 drop-shadow-[0_0_5px_rgba(245,158,11,0.5)]" />}
                        </div>

                        {count > 1 && (
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-500/10 border border-brand-500/20 rounded-lg text-brand-400 text-[10px] font-bold uppercase tracking-widest animate-pulse">
                            <Zap size={12} fill="currentColor" /> {count}x Multi-Sender
                          </div>
                        )}
                        
                        <div className="space-y-2">
                          <div className="text-gray-400 text-sm flex items-center gap-3 font-medium">
                            <Mail size={16} className="text-brand-500/50" /> 
                            <span className="underline decoration-white/10 underline-offset-4">{m.email}</span>
                          </div>
                          <div className="text-[10px] font-mono uppercase tracking-widest text-gray-500 flex items-center gap-3">
                            <Clock size={16} className="text-gray-700" />
                            {new Date(m.createdAt).toLocaleString()}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2 pointer-events-auto">
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleToggleRead(m); }}
                            className={cn(
                              "p-3.5 rounded-2xl border transition-all flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest",
                              m.isRead ? "bg-white/5 border-white/5 text-gray-500 hover:bg-white/10" : "bg-brand-500/10 border-brand-500/20 text-brand-400 hover:bg-brand-500/20"
                            )}
                          >
                            {m.isRead ? <MailOpen size={16} /> : <Mail size={16} />}
                            <span className="hidden sm:inline">{m.isRead ? 'Archived' : 'Archive'}</span>
                          </button>
                          
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleToggleStar(m); }}
                            className={cn(
                              "p-3.5 rounded-2xl border transition-all",
                              m.isStarred ? "bg-amber-500/10 border-amber-500/30 text-amber-500" : "bg-white/5 border-white/5 text-gray-500 hover:bg-white/10"
                            )}
                          >
                            <Star size={16} className={m.isStarred ? "fill-amber-500" : ""} />
                          </button>
                          
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleDelete(m.id); }} 
                            className="p-3.5 bg-red-500/5 border border-red-500/10 text-red-500/50 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex-grow bg-black/40 p-8 md:p-10 rounded-[2rem] border border-white/5 text-gray-300 relative group/msg">
                         <div className="absolute top-4 left-4 text-[8px] font-mono text-gray-700 tracking-widest uppercase flex items-center gap-2">
                           <MessageSquare size={10} /> Message.Buffer
                         </div>
                         <p className="whitespace-pre-wrap leading-relaxed pt-2 line-clamp-6">{m.message}</p>
                         
                         {m.referral && (
                           <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                              <span className="text-[9px] font-mono text-gray-600 uppercase tracking-widest">Referral Node:</span>
                              <span className="text-[10px] font-bold text-cyan-500/70 bg-cyan-500/5 px-3 py-1 rounded-full border border-cyan-500/10">{m.referral}</span>
                           </div>
                         )}
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
      </main>
      
      <footer className="py-20 text-center opacity-30">
          <div className="h-px w-20 bg-gradient-to-r from-transparent via-brand-500 to-transparent mx-auto mb-8" />
          <p className="text-[10px] font-mono uppercase tracking-[0.5em]">System Logic v2.5.0 &mdash; Deep Inspection Protocol Active</p>
      </footer>
    </div>
  );
};

export default AdminDashboard;

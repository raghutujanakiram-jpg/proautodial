import React, { useState, useEffect } from 'react';
import { DemoUser } from './index';

interface AgentDashboardProps {
  user: DemoUser;
  onLogout: () => void;
  onClose: () => void;
  isDarkMode: boolean;
}

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  company: string;
  status: 'new' | 'contacted' | 'qualified' | 'callback' | 'not-interested';
  notes: string;
  lastContact?: string;
}

interface CallLog {
  id: string;
  leadName: string;
  phone: string;
  duration: string;
  disposition: string;
  timestamp: string;
  recording?: string;
}

const AgentDashboard: React.FC<AgentDashboardProps> = ({ user, onLogout, onClose, isDarkMode }) => {
  const [activeTab, setActiveTab] = useState<'dialer' | 'leads' | 'history' | 'scripts'>('dialer');
  const [agentStatus, setAgentStatus] = useState<'ready' | 'on-call' | 'wrap-up' | 'break' | 'offline'>('offline');
  const [currentLead, setCurrentLead] = useState<Lead | null>(null);
  const [dialerMode, setDialerMode] = useState<'manual' | 'preview' | 'progressive'>('manual');
  const [callTimer, setCallTimer] = useState(0);
  const [isOnCall, setIsOnCall] = useState(false);
  const [manualNumber, setManualNumber] = useState('');
  const [callLogs, setCallLogs] = useState<CallLog[]>([
    { id: '1', leadName: 'John Smith', phone: '+1-555-0123', duration: '4:32', disposition: 'Callback', timestamp: '10:45 AM' },
    { id: '2', leadName: 'Emily Davis', phone: '+1-555-0124', duration: '2:15', disposition: 'Not Interested', timestamp: '10:30 AM' },
    { id: '3', leadName: 'Michael Brown', phone: '+1-555-0125', duration: '8:47', disposition: 'Qualified', timestamp: '10:15 AM' },
    { id: '4', leadName: 'Sarah Wilson', phone: '+1-555-0126', duration: '1:23', disposition: 'No Answer', timestamp: '10:00 AM' },
  ]);
  
  const [leads] = useState<Lead[]>([
    { id: '1', name: 'James Anderson', phone: '+1-555-0201', email: 'james@techcorp.com', company: 'TechCorp Inc', status: 'new', notes: 'Interested in enterprise plan' },
    { id: '2', name: 'Lisa Martinez', phone: '+1-555-0202', email: 'lisa@innovate.io', company: 'Innovate.io', status: 'callback', notes: 'Call back after 3 PM', lastContact: '2024-01-15' },
    { id: '3', name: 'Robert Taylor', phone: '+1-555-0203', email: 'robert@global.com', company: 'Global Solutions', status: 'qualified', notes: 'Ready for demo', lastContact: '2024-01-14' },
    { id: '4', name: 'Jennifer Lee', phone: '+1-555-0204', email: 'jennifer@startup.co', company: 'Startup Co', status: 'contacted', notes: 'Sent proposal', lastContact: '2024-01-13' },
    { id: '5', name: 'David Kim', phone: '+1-555-0205', email: 'david@enterprise.com', company: 'Enterprise Ltd', status: 'new', notes: 'From web form' },
  ]);

  const [stats] = useState({
    callsToday: 47,
    talkTime: '2h 34m',
    conversions: 8,
    avgCallDuration: '3:12',
    waitTime: '00:00'
  });

  // Call timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOnCall) {
      interval = setInterval(() => {
        setCallTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOnCall]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCall = (lead?: Lead) => {
    if (lead) setCurrentLead(lead);
    setIsOnCall(true);
    setCallTimer(0);
    setAgentStatus('on-call');
  };

  const handleHangup = () => {
    setIsOnCall(false);
    setAgentStatus('wrap-up');
    if (currentLead) {
      setCallLogs(prev => [{
        id: Date.now().toString(),
        leadName: currentLead.name,
        phone: currentLead.phone,
        duration: formatTime(callTimer),
        disposition: 'Completed',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }, ...prev]);
    }
    setCurrentLead(null);
    setCallTimer(0);
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'ready': 'bg-emerald-500',
      'on-call': 'bg-brand',
      'wrap-up': 'bg-amber-500',
      'break': 'bg-purple-500',
      'offline': 'bg-slate-500'
    };
    return colors[status] || 'bg-slate-500';
  };

  const getLeadStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'new': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'contacted': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      'qualified': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      'callback': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'not-interested': 'bg-slate-500/20 text-slate-400 border-slate-500/30'
    };
    return colors[status] || 'bg-slate-500/20 text-slate-400';
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#0a0d12] flex">
      {/* Sidebar */}
      <aside className="w-20 lg:w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col">
        {/* Logo */}
        <div className="p-4 lg:p-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="ProAutoDial" className="h-10 w-auto" />
            <span className="hidden lg:block text-xl font-black text-slate-900 dark:text-white">Agent</span>
          </div>
        </div>

        {/* Agent Info */}
        <div className="p-4 lg:p-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-xl object-cover" />
              <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-slate-900 ${getStatusColor(agentStatus)}`}></span>
            </div>
            <div className="hidden lg:block">
              <p className="font-bold text-slate-900 dark:text-white text-sm">{user.name}</p>
              <p className="text-xs text-slate-500">Ext: {user.extension}</p>
            </div>
          </div>
          
          {/* Status Selector */}
          <div className="mt-4">
            <select
              value={agentStatus}
              onChange={(e) => setAgentStatus(e.target.value as any)}
              disabled={isOnCall}
              className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm font-bold text-slate-700 dark:text-slate-300 outline-none"
            >
              <option value="ready">Ready</option>
              <option value="break">On Break</option>
              <option value="wrap-up">Wrap-Up</option>
              <option value="offline">Offline</option>
            </select>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {[
              { id: 'dialer', icon: 'fa-phone', label: 'Dialer' },
              { id: 'leads', icon: 'fa-users', label: 'Leads' },
              { id: 'history', icon: 'fa-clock-rotate-left', label: 'Call History' },
              { id: 'scripts', icon: 'fa-file-lines', label: 'Scripts' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === item.id
                    ? 'bg-brand text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <i className={`fas ${item.icon} text-lg`}></i>
                <span className="hidden lg:block font-bold text-sm">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
          <button
            onClick={onClose}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            <i className="fas fa-arrow-left text-lg"></i>
            <span className="hidden lg:block font-bold text-sm">Back to Site</span>
          </button>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
          >
            <i className="fas fa-right-from-bracket text-lg"></i>
            <span className="hidden lg:block font-bold text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <h1 className="text-xl font-black text-slate-900 dark:text-white">
              {activeTab === 'dialer' && 'Phone Dialer'}
              {activeTab === 'leads' && 'Lead Management'}
              {activeTab === 'history' && 'Call History'}
              {activeTab === 'scripts' && 'Call Scripts'}
            </h1>
            {user.campaign && (
              <span className="px-3 py-1 bg-brand/10 text-brand rounded-lg text-xs font-bold">
                <i className="fas fa-bullhorn mr-2"></i>
                {user.campaign}
              </span>
            )}
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-2xl font-black text-slate-900 dark:text-white">{stats.callsToday}</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Calls Today</p>
            </div>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700"></div>
            <div className="text-center">
              <p className="text-2xl font-black text-emerald-500">{stats.conversions}</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Conversions</p>
            </div>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700"></div>
            <div className="text-center">
              <p className="text-2xl font-black text-slate-900 dark:text-white">{stats.talkTime}</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Talk Time</p>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
          {/* Dialer Tab */}
          {activeTab === 'dialer' && (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Dialer Panel */}
              <div className="lg:col-span-2 space-y-6">
                {/* Dialer Mode Selector */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800">
                  <div className="flex gap-2">
                    {['manual', 'preview', 'progressive'].map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setDialerMode(mode as any)}
                        className={`flex-1 py-3 rounded-xl text-sm font-bold capitalize transition-all ${
                          dialerMode === mode
                            ? 'bg-brand text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        {mode} Dial
                      </button>
                    ))}
                  </div>
                </div>

                {/* Phone Interface */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800">
                  {isOnCall ? (
                    /* Active Call UI */
                    <div className="text-center space-y-6">
                      <div className="w-24 h-24 mx-auto rounded-full bg-brand/10 flex items-center justify-center animate-pulse">
                        <i className="fas fa-phone-volume text-4xl text-brand"></i>
                      </div>
                      <div>
                        <p className="text-2xl font-black text-slate-900 dark:text-white">
                          {currentLead?.name || 'Unknown Caller'}
                        </p>
                        <p className="text-slate-500">{currentLead?.phone || manualNumber}</p>
                      </div>
                      <div className="text-5xl font-black text-brand tabular-nums">
                        {formatTime(callTimer)}
                      </div>
                      <div className="flex justify-center gap-4">
                        <button className="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                          <i className="fas fa-microphone-slash"></i>
                        </button>
                        <button
                          onClick={handleHangup}
                          className="w-20 h-20 rounded-full bg-red-500 text-white hover:bg-red-600 transition-all shadow-lg shadow-red-500/30"
                        >
                          <i className="fas fa-phone-slash text-2xl"></i>
                        </button>
                        <button className="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                          <i className="fas fa-pause"></i>
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Idle Dialer UI */
                    <div className="space-y-6">
                      <div className="relative">
                        <i className="fas fa-phone absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                        <input
                          type="tel"
                          value={manualNumber}
                          onChange={(e) => setManualNumber(e.target.value)}
                          placeholder="Enter phone number"
                          className="w-full bg-slate-100 dark:bg-slate-800 border-0 rounded-xl pl-12 pr-4 py-4 text-2xl font-bold text-center text-slate-900 dark:text-white placeholder-slate-400 outline-none"
                        />
                      </div>
                      
                      {/* Numpad */}
                      <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
                        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((num) => (
                          <button
                            key={num}
                            onClick={() => setManualNumber(prev => prev + num)}
                            className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-2xl font-bold text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-all mx-auto"
                          >
                            {num}
                          </button>
                        ))}
                      </div>

                      <div className="flex justify-center gap-4">
                        <button
                          onClick={() => setManualNumber(prev => prev.slice(0, -1))}
                          className="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                        >
                          <i className="fas fa-delete-left"></i>
                        </button>
                        <button
                          onClick={() => handleCall()}
                          disabled={!manualNumber && agentStatus !== 'ready'}
                          className="w-20 h-20 rounded-full bg-emerald-500 text-white hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <i className="fas fa-phone text-2xl"></i>
                        </button>
                        <button
                          onClick={() => setManualNumber('')}
                          className="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                        >
                          <i className="fas fa-xmark"></i>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Lead List */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                  <h3 className="font-black text-slate-900 dark:text-white">Quick Dial</h3>
                  <p className="text-xs text-slate-500 mt-1">Next leads in queue</p>
                </div>
                <div className="divide-y divide-slate-200 dark:divide-slate-800 max-h-[500px] overflow-y-auto">
                  {leads.slice(0, 5).map((lead) => (
                    <div
                      key={lead.id}
                      className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer"
                      onClick={() => { setCurrentLead(lead); setManualNumber(lead.phone); }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{lead.name}</p>
                          <p className="text-sm text-slate-500">{lead.company}</p>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleCall(lead); }}
                          className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all"
                        >
                          <i className="fas fa-phone"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Leads Tab */}
          {activeTab === 'leads' && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h3 className="font-black text-slate-900 dark:text-white">Lead Database</h3>
                  <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-bold text-slate-500">
                    {leads.length} leads
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
                    <input
                      type="text"
                      placeholder="Search leads..."
                      className="bg-slate-100 dark:bg-slate-800 border-0 rounded-xl pl-10 pr-4 py-2 text-sm outline-none w-64"
                    />
                  </div>
                  <button className="px-4 py-2 bg-brand text-white rounded-xl text-sm font-bold">
                    <i className="fas fa-plus mr-2"></i>
                    Add Lead
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 dark:bg-slate-800/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-black text-slate-500 uppercase tracking-wider">Name</th>
                      <th className="px-4 py-3 text-left text-xs font-black text-slate-500 uppercase tracking-wider">Phone</th>
                      <th className="px-4 py-3 text-left text-xs font-black text-slate-500 uppercase tracking-wider">Company</th>
                      <th className="px-4 py-3 text-left text-xs font-black text-slate-500 uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-black text-slate-500 uppercase tracking-wider">Notes</th>
                      <th className="px-4 py-3 text-right text-xs font-black text-slate-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {leads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all">
                        <td className="px-4 py-4">
                          <p className="font-bold text-slate-900 dark:text-white">{lead.name}</p>
                          <p className="text-sm text-slate-500">{lead.email}</p>
                        </td>
                        <td className="px-4 py-4 text-slate-600 dark:text-slate-400 font-mono">{lead.phone}</td>
                        <td className="px-4 py-4 text-slate-600 dark:text-slate-400">{lead.company}</td>
                        <td className="px-4 py-4">
                          <span className={`px-3 py-1 rounded-lg text-xs font-bold capitalize border ${getLeadStatusColor(lead.status)}`}>
                            {lead.status.replace('-', ' ')}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-slate-500 text-sm max-w-xs truncate">{lead.notes}</td>
                        <td className="px-4 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleCall(lead)}
                              className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all"
                            >
                              <i className="fas fa-phone"></i>
                            </button>
                            <button className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                              <i className="fas fa-pen"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                <h3 className="font-black text-slate-900 dark:text-white">Recent Calls</h3>
              </div>
              <div className="divide-y divide-slate-200 dark:divide-slate-800">
                {callLogs.map((log) => (
                  <div key={log.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center">
                          <i className="fas fa-phone text-brand"></i>
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{log.leadName}</p>
                          <p className="text-sm text-slate-500">{log.phone}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-slate-900 dark:text-white">{log.duration}</p>
                        <p className="text-sm text-slate-500">{log.timestamp}</p>
                      </div>
                      <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm font-bold text-slate-600 dark:text-slate-400">
                        {log.disposition}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Scripts Tab */}
          {activeTab === 'scripts' && (
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                  <h3 className="font-black text-slate-900 dark:text-white">Opening Script</h3>
                </div>
                <div className="p-6">
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    "Hi, this is <span className="text-brand font-bold">[Your Name]</span> calling from <span className="text-brand font-bold">ProAutoDial</span>. 
                    I'm reaching out because we help businesses like <span className="text-brand font-bold">[Company Name]</span> streamline their 
                    communication with AI-powered calling solutions. Do you have a quick moment to discuss how we might be able to help you?"
                  </p>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                  <h3 className="font-black text-slate-900 dark:text-white">Objection Handling</h3>
                </div>
                <div className="p-6 space-y-4">
                  <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                    <p className="text-sm font-bold text-slate-500 mb-2">"I'm not interested"</p>
                    <p className="text-slate-600 dark:text-slate-300 text-sm">
                      "I completely understand. Many of our current clients felt the same way initially. 
                      May I ask what solution you're currently using for your outbound calls?"
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                    <p className="text-sm font-bold text-slate-500 mb-2">"Send me information"</p>
                    <p className="text-slate-600 dark:text-slate-300 text-sm">
                      "Absolutely! I'd be happy to send you some information. To make sure I send the most relevant details, 
                      could you tell me about your current call volume and main challenges?"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AgentDashboard;

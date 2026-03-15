import React, { useState } from 'react';
import { DemoUser } from './index';

interface AdminDashboardProps {
  user: DemoUser;
  onLogout: () => void;
  onClose: () => void;
  isDarkMode: boolean;
}

interface Agent {
  id: string;
  name: string;
  extension: string;
  status: 'ready' | 'on-call' | 'wrap-up' | 'break' | 'offline';
  campaign: string;
  callsToday: number;
  talkTime: string;
  avatar: string;
}

interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed';
  agents: number;
  calls: number;
  answered: number;
  conversions: number;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onLogout, onClose, isDarkMode }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'agents' | 'campaigns' | 'reports' | 'settings'>('overview');

  const [agents] = useState<Agent[]>([
    { id: '1', name: 'Sarah Johnson', extension: '1001', status: 'on-call', campaign: 'Sales Q1', callsToday: 47, talkTime: '2h 34m', avatar: 'https://i.pravatar.cc/150?u=agent1' },
    { id: '2', name: 'Mike Chen', extension: '1002', status: 'ready', campaign: 'Sales Q1', callsToday: 52, talkTime: '3h 12m', avatar: 'https://i.pravatar.cc/150?u=agent2' },
    { id: '3', name: 'Emily Davis', extension: '1003', status: 'wrap-up', campaign: 'Support', callsToday: 38, talkTime: '2h 05m', avatar: 'https://i.pravatar.cc/150?u=agent3' },
    { id: '4', name: 'James Wilson', extension: '1004', status: 'break', campaign: 'Sales Q1', callsToday: 29, talkTime: '1h 48m', avatar: 'https://i.pravatar.cc/150?u=agent4' },
    { id: '5', name: 'Lisa Brown', extension: '1005', status: 'offline', campaign: 'Support', callsToday: 0, talkTime: '0h 00m', avatar: 'https://i.pravatar.cc/150?u=agent5' },
  ]);

  const [campaigns] = useState<Campaign[]>([
    { id: '1', name: 'Sales Outbound Q1', status: 'active', agents: 12, calls: 1847, answered: 1203, conversions: 156 },
    { id: '2', name: 'Customer Support', status: 'active', agents: 8, calls: 982, answered: 945, conversions: 0 },
    { id: '3', name: 'Lead Generation', status: 'active', agents: 6, calls: 654, answered: 412, conversions: 89 },
    { id: '4', name: 'Renewal Campaign', status: 'paused', agents: 4, calls: 234, answered: 198, conversions: 67 },
  ]);

  const stats = {
    totalCalls: 3717,
    answeredCalls: 2758,
    avgWaitTime: '00:23',
    avgTalkTime: '4:32',
    activeAgents: 4,
    totalAgents: 5,
    conversionRate: '8.4%',
    serviceLevel: '92%'
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'ready': 'bg-emerald-500',
      'on-call': 'bg-brand',
      'wrap-up': 'bg-amber-500',
      'break': 'bg-purple-500',
      'offline': 'bg-slate-500',
      'active': 'bg-emerald-500',
      'paused': 'bg-amber-500',
      'completed': 'bg-slate-500'
    };
    return colors[status] || 'bg-slate-500';
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#0a0d12] flex">
      {/* Sidebar */}
      <aside className="w-20 lg:w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col">
        {/* Logo */}
        <div className="p-4 lg:p-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="ProAutoDial" className="h-10 w-auto" />
            <span className="hidden lg:block text-xl font-black text-slate-900 dark:text-white">Admin</span>
          </div>
        </div>

        {/* Admin Info */}
        <div className="p-4 lg:p-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-xl object-cover" />
            <div className="hidden lg:block">
              <p className="font-bold text-slate-900 dark:text-white text-sm">{user.name}</p>
              <p className="text-xs text-purple-500 font-bold">Administrator</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {[
              { id: 'overview', icon: 'fa-chart-pie', label: 'Overview' },
              { id: 'agents', icon: 'fa-headset', label: 'Agents' },
              { id: 'campaigns', icon: 'fa-bullhorn', label: 'Campaigns' },
              { id: 'reports', icon: 'fa-chart-line', label: 'Reports' },
              { id: 'settings', icon: 'fa-gear', label: 'Settings' },
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
          <h1 className="text-xl font-black text-slate-900 dark:text-white capitalize">
            {activeTab === 'overview' && 'Dashboard Overview'}
            {activeTab === 'agents' && 'Agent Management'}
            {activeTab === 'campaigns' && 'Campaign Management'}
            {activeTab === 'reports' && 'Reports & Analytics'}
            {activeTab === 'settings' && 'System Settings'}
          </h1>

          <div className="flex items-center gap-4">
            <button className="relative w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
              <i className="fas fa-bell"></i>
              <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
            </button>
            <span className="text-sm text-slate-500">
              <i className="fas fa-clock mr-2"></i>
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Total Calls', value: stats.totalCalls.toLocaleString(), icon: 'fa-phone', color: 'text-brand', bg: 'bg-brand/10' },
                  { label: 'Answered', value: stats.answeredCalls.toLocaleString(), icon: 'fa-phone-volume', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                  { label: 'Avg Wait Time', value: stats.avgWaitTime, icon: 'fa-hourglass-half', color: 'text-amber-500', bg: 'bg-amber-500/10' },
                  { label: 'Avg Talk Time', value: stats.avgTalkTime, icon: 'fa-clock', color: 'text-purple-500', bg: 'bg-purple-500/10' },
                  { label: 'Active Agents', value: `${stats.activeAgents}/${stats.totalAgents}`, icon: 'fa-headset', color: 'text-blue-500', bg: 'bg-blue-500/10' },
                  { label: 'Conversion Rate', value: stats.conversionRate, icon: 'fa-chart-line', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                  { label: 'Service Level', value: stats.serviceLevel, icon: 'fa-gauge-high', color: 'text-brand', bg: 'bg-brand/10' },
                  { label: 'Queue Size', value: '3', icon: 'fa-users-line', color: 'text-amber-500', bg: 'bg-amber-500/10' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                        <i className={`fas ${stat.icon} ${stat.color} text-xl`}></i>
                      </div>
                      <div>
                        <p className="text-2xl font-black text-slate-900 dark:text-white">{stat.value}</p>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.label}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Live Agent Status */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <h3 className="font-black text-slate-900 dark:text-white">Live Agent Status</h3>
                  <div className="flex items-center gap-4">
                    {['ready', 'on-call', 'wrap-up', 'break', 'offline'].map((status) => (
                      <div key={status} className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full ${getStatusColor(status)}`}></span>
                        <span className="text-xs font-bold text-slate-500 capitalize">{status.replace('-', ' ')}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                    {agents.map((agent) => (
                      <div key={agent.id} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-center">
                        <div className="relative inline-block mb-3">
                          <img src={agent.avatar} alt={agent.name} className="w-16 h-16 rounded-xl object-cover" />
                          <span className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white dark:border-slate-800 ${getStatusColor(agent.status)}`}></span>
                        </div>
                        <p className="font-bold text-slate-900 dark:text-white text-sm">{agent.name}</p>
                        <p className="text-xs text-slate-500">Ext: {agent.extension}</p>
                        <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                          <p className="text-xs text-slate-500">
                            <span className="font-bold text-slate-900 dark:text-white">{agent.callsToday}</span> calls
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Active Campaigns */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                  <h3 className="font-black text-slate-900 dark:text-white">Active Campaigns</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 dark:bg-slate-800/50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-black text-slate-500 uppercase tracking-wider">Campaign</th>
                        <th className="px-4 py-3 text-left text-xs font-black text-slate-500 uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-black text-slate-500 uppercase tracking-wider">Agents</th>
                        <th className="px-4 py-3 text-left text-xs font-black text-slate-500 uppercase tracking-wider">Calls</th>
                        <th className="px-4 py-3 text-left text-xs font-black text-slate-500 uppercase tracking-wider">Answered</th>
                        <th className="px-4 py-3 text-left text-xs font-black text-slate-500 uppercase tracking-wider">Conversions</th>
                        <th className="px-4 py-3 text-right text-xs font-black text-slate-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                      {campaigns.map((campaign) => (
                        <tr key={campaign.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all">
                          <td className="px-4 py-4">
                            <p className="font-bold text-slate-900 dark:text-white">{campaign.name}</p>
                          </td>
                          <td className="px-4 py-4">
                            <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-bold capitalize text-white ${getStatusColor(campaign.status)}`}>
                              <span className="w-2 h-2 rounded-full bg-white/50"></span>
                              {campaign.status}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-slate-600 dark:text-slate-400">{campaign.agents}</td>
                          <td className="px-4 py-4 text-slate-600 dark:text-slate-400">{campaign.calls.toLocaleString()}</td>
                          <td className="px-4 py-4 text-slate-600 dark:text-slate-400">{campaign.answered.toLocaleString()}</td>
                          <td className="px-4 py-4">
                            <span className="text-emerald-500 font-bold">{campaign.conversions}</span>
                          </td>
                          <td className="px-4 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                                <i className="fas fa-eye text-sm"></i>
                              </button>
                              <button className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                                <i className="fas fa-pen text-sm"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Agents Tab */}
          {activeTab === 'agents' && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <h3 className="font-black text-slate-900 dark:text-white">All Agents</h3>
                <button className="px-4 py-2 bg-brand text-white rounded-xl text-sm font-bold">
                  <i className="fas fa-plus mr-2"></i>
                  Add Agent
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 dark:bg-slate-800/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-black text-slate-500 uppercase tracking-wider">Agent</th>
                      <th className="px-4 py-3 text-left text-xs font-black text-slate-500 uppercase tracking-wider">Extension</th>
                      <th className="px-4 py-3 text-left text-xs font-black text-slate-500 uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-black text-slate-500 uppercase tracking-wider">Campaign</th>
                      <th className="px-4 py-3 text-left text-xs font-black text-slate-500 uppercase tracking-wider">Calls Today</th>
                      <th className="px-4 py-3 text-left text-xs font-black text-slate-500 uppercase tracking-wider">Talk Time</th>
                      <th className="px-4 py-3 text-right text-xs font-black text-slate-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {agents.map((agent) => (
                      <tr key={agent.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all">
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <img src={agent.avatar} alt={agent.name} className="w-10 h-10 rounded-lg object-cover" />
                            <p className="font-bold text-slate-900 dark:text-white">{agent.name}</p>
                          </div>
                        </td>
                        <td className="px-4 py-4 font-mono text-slate-600 dark:text-slate-400">{agent.extension}</td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-bold capitalize text-white ${getStatusColor(agent.status)}`}>
                            {agent.status.replace('-', ' ')}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-slate-600 dark:text-slate-400">{agent.campaign}</td>
                        <td className="px-4 py-4 font-bold text-slate-900 dark:text-white">{agent.callsToday}</td>
                        <td className="px-4 py-4 text-slate-600 dark:text-slate-400">{agent.talkTime}</td>
                        <td className="px-4 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                              <i className="fas fa-headset text-sm"></i>
                            </button>
                            <button className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                              <i className="fas fa-pen text-sm"></i>
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

          {/* Campaigns Tab */}
          {activeTab === 'campaigns' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-slate-900 dark:text-white text-xl">Campaign Management</h3>
                <button className="px-4 py-2 bg-brand text-white rounded-xl text-sm font-bold">
                  <i className="fas fa-plus mr-2"></i>
                  Create Campaign
                </button>
              </div>
              <div className="grid lg:grid-cols-2 gap-6">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white">{campaign.name}</h4>
                        <span className={`inline-flex items-center gap-2 px-2 py-0.5 rounded text-[10px] font-bold capitalize text-white mt-2 ${getStatusColor(campaign.status)}`}>
                          {campaign.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {campaign.status === 'active' ? (
                          <button className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-white transition-all">
                            <i className="fas fa-pause"></i>
                          </button>
                        ) : (
                          <button className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all">
                            <i className="fas fa-play"></i>
                          </button>
                        )}
                        <button className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                          <i className="fas fa-gear"></i>
                        </button>
                      </div>
                    </div>
                    <div className="p-5 grid grid-cols-4 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-black text-slate-900 dark:text-white">{campaign.agents}</p>
                        <p className="text-[10px] font-bold text-slate-500 uppercase">Agents</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-black text-slate-900 dark:text-white">{campaign.calls}</p>
                        <p className="text-[10px] font-bold text-slate-500 uppercase">Calls</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-black text-emerald-500">{campaign.answered}</p>
                        <p className="text-[10px] font-bold text-slate-500 uppercase">Answered</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-black text-brand">{campaign.conversions}</p>
                        <p className="text-[10px] font-bold text-slate-500 uppercase">Conversions</p>
                      </div>
                    </div>
                    <div className="px-5 pb-5">
                      <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${(campaign.answered / campaign.calls) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-slate-500 mt-2">
                        Answer Rate: <span className="font-bold text-emerald-500">{((campaign.answered / campaign.calls) * 100).toFixed(1)}%</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === 'reports' && (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto rounded-3xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6">
                <i className="fas fa-chart-line text-4xl text-slate-400"></i>
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Reports & Analytics</h3>
              <p className="text-slate-500 max-w-md mx-auto">
                Advanced reporting and analytics features are available in the full version. Contact sales for a demo.
              </p>
              <button className="mt-6 px-6 py-3 bg-brand text-white rounded-xl font-bold">
                Request Full Demo
              </button>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="max-w-2xl space-y-6">
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                  <h3 className="font-black text-slate-900 dark:text-white">General Settings</h3>
                </div>
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">Auto Wrap-Up Time</p>
                      <p className="text-sm text-slate-500">Time before agent returns to ready state</p>
                    </div>
                    <select className="bg-slate-100 dark:bg-slate-800 border-0 rounded-xl px-4 py-2 font-bold text-slate-700 dark:text-slate-300">
                      <option>30 seconds</option>
                      <option>60 seconds</option>
                      <option>90 seconds</option>
                      <option>Manual</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">Call Recording</p>
                      <p className="text-sm text-slate-500">Record all agent calls automatically</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">Whisper Mode</p>
                      <p className="text-sm text-slate-500">Allow supervisors to whisper to agents</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
                    </label>
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

export default AdminDashboard;

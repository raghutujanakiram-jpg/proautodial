import React, { useState } from 'react';
import LoginScreen from './LoginScreen';
import AgentDashboard from './AgentDashboard';
import AdminDashboard from './AdminDashboard';

export type UserRole = 'agent' | 'admin' | null;

export interface DemoUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  extension: string;
  campaign?: string;
}

interface CallCenterDemoProps {
  onClose: () => void;
  isDarkMode: boolean;
}

const CallCenterDemo: React.FC<CallCenterDemoProps> = ({ onClose, isDarkMode }) => {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (email: string, password: string, role: 'agent' | 'admin') => {
    // Demo authentication - in production this would call an API
    const demoUsers: Record<string, DemoUser> = {
      'agent@proautodial.com': {
        id: 'agent-001',
        name: 'Sarah Johnson',
        email: 'agent@proautodial.com',
        role: 'agent',
        avatar: 'https://i.pravatar.cc/150?u=agent001',
        extension: '1001',
        campaign: 'Sales Outbound Q1'
      },
      'admin@proautodial.com': {
        id: 'admin-001',
        name: 'Michael Chen',
        email: 'admin@proautodial.com',
        role: 'admin',
        avatar: 'https://i.pravatar.cc/150?u=admin001',
        extension: '9001'
      }
    };

    const foundUser = demoUsers[email];
    if (foundUser && password === 'demo123') {
      setUser({ ...foundUser, role });
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <div className={`fixed inset-0 z-[9999] ${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-slate-100 dark:bg-[#0a0d12]">
        {!isAuthenticated ? (
          <LoginScreen onLogin={handleLogin} onClose={onClose} isDarkMode={isDarkMode} />
        ) : user?.role === 'admin' ? (
          <AdminDashboard user={user} onLogout={handleLogout} onClose={onClose} isDarkMode={isDarkMode} />
        ) : (
          <AgentDashboard user={user!} onLogout={handleLogout} onClose={onClose} isDarkMode={isDarkMode} />
        )}
      </div>
    </div>
  );
};

export default CallCenterDemo;

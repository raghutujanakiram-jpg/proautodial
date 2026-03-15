
import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import AIVoiceAgents from './pages/AIVoiceAgents';
import Solutions from './pages/Solutions';
import Services from './pages/Services';
import Pricing from './pages/Pricing';
import Resources from './pages/Resources';
import Blog from './pages/Blog';
import About from './pages/About';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import CaseStudiesPage from './pages/CaseStudiesPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CallCenterSolution from './pages/CallCenterSolution';
import SupportCenter from './pages/SupportCenter';
import UseCasesPage from './pages/UseCasesPage';
import LegalPage from './pages/LegalPage';
import AdminLogin from './pages/AdminLogin';
import CustomerLogin from './pages/CustomerLogin';
import LegacyProductPage from './pages/LegacyProductPage';
import DashboardSidebar from './components/DashboardSidebar';
import DashboardHeader from './components/DashboardHeader';
import ExecutiveDashboard from './components/ExecutiveDashboard';
import StrategicHub from './components/StrategicHub';
import VoiceAgentsService from './components/VoiceAgentsService';
import AgentDesktop from './components/AgentDesktop';
import CampaignDashboard from './components/CampaignDashboard';
import KnowledgeForge from './components/KnowledgeForge';
import ProfileSettings from './components/ProfileSettings';
import AssistantManager from './components/AssistantManager';
import WhatsAppButton from './components/WhatsAppButton';
import Chatbot from './components/Chatbot';
import BookDemo from './components/BookDemo';
import CallCenterDemo from './components/CallCenterDemo';
import { AppView, UserProfile, Notification } from './types';

function App() {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light') return false;
    if (saved === 'dark') return true;
    return true;
  });
  
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Strategic Lead',
    email: 'ops@enterprise.com',
    avatar: 'https://i.pravatar.cc/150?u=strategic',
    language: 'English (US)',
    timezone: 'UTC+5:30 (IST)'
  });

  const [notifications, setNotifications] = useState<Notification[]>([
    { id: '1', type: 'success', title: 'System Ready', message: 'Neural link established successfully.', timestamp: 'Now', read: false }
  ]);

  const [showDemoApp, setShowDemoApp] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Hash-based routing for public views
  const hashToView = (hash: string): AppView => {
    const h = hash.replace(/^#\/?/, '').toLowerCase();
    const map: Record<string, AppView> = {
      '': AppView.HOME,
      'home': AppView.HOME,
      'solutions': AppView.SOLUTIONS,
      'ai-voice-agents': AppView.AI_VOICE_AGENTS,
      'services': AppView.SERVICES,
      'pricing': AppView.PRICING,
      'resources': AppView.RESOURCES,
      'blog': AppView.BLOG,
      'about': AppView.ABOUT,
      'careers': AppView.CAREERS,
      'contact': AppView.CONTACT,
      'case-studies': AppView.CASE_STUDIES,
      'use-cases': AppView.USE_CASES,
      'support': AppView.SUPPORT_CENTER,
      'book-demo': AppView.BOOK_DEMO,
      'terms': AppView.TERMS,
      'privacy': AppView.PRIVACY_POLICY,
      'refund': AppView.REFUND_POLICY,
      'disclaimer': AppView.DISCLAIMER,
      'customer-login': AppView.CUSTOMER_LOGIN,
      'legacy-product': AppView.LEGACY_PRODUCT,
    };
    return map[h] ?? AppView.HOME;
  };

  const viewToHash = (view: AppView): string => {
    const map: Partial<Record<AppView, string>> = {
      [AppView.HOME]: '#/home',
      [AppView.SOLUTIONS]: '#/solutions',
      [AppView.AI_VOICE_AGENTS]: '#/ai-voice-agents',
      [AppView.SERVICES]: '#/services',
      [AppView.PRICING]: '#/pricing',
      [AppView.RESOURCES]: '#/resources',
      [AppView.BLOG]: '#/blog',
      [AppView.ABOUT]: '#/about',
      [AppView.CAREERS]: '#/careers',
      [AppView.CONTACT]: '#/contact',
      [AppView.CASE_STUDIES]: '#/case-studies',
      [AppView.USE_CASES]: '#/use-cases',
      [AppView.SUPPORT_CENTER]: '#/support',
      [AppView.BOOK_DEMO]: '#/book-demo',
      [AppView.TERMS]: '#/terms',
      [AppView.PRIVACY_POLICY]: '#/privacy',
      [AppView.REFUND_POLICY]: '#/refund',
      [AppView.DISCLAIMER]: '#/disclaimer',
    };
    return map[view] ?? '#/home';
  };

  useEffect(() => {
    const initial = hashToView(window.location.hash);
    setCurrentView(initial);
    const onHashChange = () => setCurrentView(hashToView(window.location.hash));
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = (v: AppView) => {
    const h = viewToHash(v);
    if (window.location.hash !== h) {
      window.location.hash = h;
    }
    setCurrentView(v);
  };

  const isPortalMode = [
    AppView.PORTAL_DASHBOARD, AppView.PORTAL_HUB, AppView.HUB, AppView.PORTAL_VOICE_LAB, AppView.VOICE_LAB,
    AppView.PORTAL_CAMPAIGNS, AppView.CAMPAIGNS, AppView.PORTAL_KNOWLEDGE, AppView.KNOWLEDGE_BASE, 
    AppView.PORTAL_PROFILE, AppView.PROFILE, AppView.AGENT_DESKTOP
  ].includes(currentView);

  const renderPublicView = () => {
    switch(currentView) {
      case AppView.HOME: return <Home onNavigate={navigate} />;
      case AppView.SOLUTIONS: return <Solutions onNavigate={navigate} />;
      case AppView.AI_VOICE_AGENTS: return <AIVoiceAgents />;
      case AppView.SERVICES: return <Services onNavigate={navigate} />;
      case AppView.PRICING: return <Pricing />;
      case AppView.RESOURCES: return <Resources onNavigate={navigate} />;
      case AppView.BLOG: return <Blog />;
      case AppView.ABOUT: return <About />;
      case AppView.CAREERS: return <Careers />;
      case AppView.CONTACT: return <Contact />;
      case AppView.CASE_STUDIES: return <CaseStudiesPage />;
      case AppView.USE_CASES: return <UseCasesPage />;
      case AppView.BOOK_DEMO: return <BookDemo />;
      case AppView.SUPPORT_CENTER: return <SupportCenter onNavigate={navigate} />;
      
      // New grouped solution routes
      case AppView.LEAD_QUALIFICATION: return <ProductDetailPage type="Lead Qualification" onNavigate={navigate} />;
      case AppView.ASSISTED_SELLING: return <ProductDetailPage type="Assisted Selling" onNavigate={navigate} />;
      case AppView.SDR_AUTOMATION: return <ProductDetailPage type="SDR Automation" onNavigate={navigate} />;
      case AppView.AI_SALES_AGENT: return <ProductDetailPage type="AI Sales Agent" onNavigate={navigate} />;
      case AppView.APPOINTMENT_MANAGEMENT: return <ProductDetailPage type="Appointment Management" onNavigate={navigate} />;
      case AppView.AI_CUSTOMER_SERVICE_AGENT: return <ProductDetailPage type="AI Customer Service Agent" onNavigate={navigate} />;
      case AppView.AI_BOOKING_AGENT: return <ProductDetailPage type="AI Booking Agent" onNavigate={navigate} />;
      case AppView.AI_LEAD_QUALIFICATION_AGENT: return <ProductDetailPage type="AI Lead Qualification Agent" onNavigate={navigate} />;
      case AppView.CORPORATE_TRAINING: return <ProductDetailPage type="Corporate Training" onNavigate={navigate} />;
      case AppView.AI_CALL_CENTER_PHONE_AGENTS: return <ProductDetailPage type="AI Call Center & Phone Agents" onNavigate={navigate} />;
      case AppView.FLOW_BUILDER: return <ProductDetailPage type="Flow Builder" onNavigate={navigate} />;
      case AppView.IVR: return <ProductDetailPage type="IVR" onNavigate={navigate} />;
      case AppView.INDUSTRY_SOLUTIONS: return <Solutions onNavigate={navigate} />;
      
      // Legal Routes
      case AppView.TERMS: return <LegalPage type="terms" />;
      case AppView.PRIVACY_POLICY: return <LegalPage type="privacy" />;
      case AppView.REFUND_POLICY: return <LegalPage type="refund" />;
      case AppView.DISCLAIMER: return <LegalPage type="disclaimer" />;

      // Auth Routes
      case AppView.ADMIN_LOGIN: return <AdminLogin onNavigate={navigate} />;
      case AppView.CUSTOMER_LOGIN: return <CustomerLogin onNavigate={navigate} />;

      // Demo App
      case AppView.DEMO_APP: 
        setShowDemoApp(true);
        return <Home onNavigate={navigate} />;

      // Specialized Flagship Product
      case AppView.VIRTUAL_CALL_CENTER:
        return <CallCenterSolution onNavigate={navigate} />;

      // Specialized Legacy Engineering Detailed Routes
      case AppView.VICIDIAL_V11:
        return <ProductDetailPage type="Vicidial v11 Installation" onNavigate={navigate} />;
      case AppView.GOAUTODIAL_V4:
        return <ProductDetailPage type="Goautodial v4 Migration" onNavigate={navigate} />;
      case AppView.ASTERISK_DESIGN:
        return <ProductDetailPage type="Asterisk Dialplan Design" onNavigate={navigate} />;
      case AppView.FREEPBX_SETUP:
        return <ProductDetailPage type="FreePBX / Issabel Setup" onNavigate={navigate} />;

      // Technical Product Detail Routes
      case AppView.AUTO_DIALER: 
        return <ProductDetailPage type="Auto Dialer" onNavigate={navigate} />;
      case AppView.VOICE_BROADCASTING:
        return <ProductDetailPage type="Voice Broadcasting" onNavigate={navigate} />;
      case AppView.VIRTUAL_PHONE_SYSTEM:
        return <ProductDetailPage type="Virtual Phone System" onNavigate={navigate} />;
      case AppView.PREDICTIVE_DIALER:
        return <ProductDetailPage type="Predictive Dialer" onNavigate={navigate} />;
      case AppView.VICIDIAL_MASTERY:
        return <ProductDetailPage type="Vicidial Mastery" onNavigate={navigate} />;
      case AppView.MANAGED_HOSTING:
        return <ProductDetailPage type="Managed Hosting" onNavigate={navigate} />;
      case AppView.ROBO_DIALER:
        return <ProductDetailPage type="Robo Dialer" onNavigate={navigate} />;
      case AppView.HOURLY_SUPPORT:
        return <ProductDetailPage type="Hourly Support" onNavigate={navigate} />;
      case AppView.DEDICATED_TECH:
        return <ProductDetailPage type="Dedicated Tech Person" onNavigate={navigate} />;
        
      default: return <Home onNavigate={navigate} />;
    }
  };

  const renderPortalView = () => {
    switch(currentView) {
      case AppView.PORTAL_DASHBOARD: return <ExecutiveDashboard />;
      case AppView.PORTAL_HUB: 
      case AppView.HUB:
        return <AssistantManager />;
      case AppView.PORTAL_VOICE_LAB:
      case AppView.VOICE_LAB:
        return <VoiceAgentsService />;
      case AppView.PORTAL_CAMPAIGNS:
      case AppView.CAMPAIGNS:
        return <CampaignDashboard />;
      case AppView.PORTAL_KNOWLEDGE:
      case AppView.KNOWLEDGE_BASE:
        return <KnowledgeForge />;
      case AppView.PORTAL_PROFILE:
      case AppView.PROFILE:
        return <ProfileSettings profile={userProfile} onSave={setUserProfile} />;
      case AppView.AGENT_DESKTOP:
        return <AgentDesktop />;
      default: return <ExecutiveDashboard />;
    }
  };

  return (
    <LanguageProvider>
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0E14] text-slate-900 dark:text-white transition-colors duration-500 selection:bg-brand/30 overflow-x-hidden">
      {isPortalMode ? (
        <div className="flex min-h-screen">
          <DashboardSidebar currentView={currentView} onNavigate={setCurrentView} user={userProfile} />
          <div className="flex-1 flex flex-col min-w-0">
            <DashboardHeader 
              onNavigate={setCurrentView} 
              user={userProfile} 
              notifications={notifications}
              onClearNotifications={() => setNotifications([])}
            />
            <main className="flex-1 overflow-y-auto custom-scrollbar">
              {renderPortalView()}
            </main>
          </div>
        </div>
      ) : (
        <>
          <Navigation 
            currentView={currentView} 
            onNavigate={navigate} 
            isDarkMode={isDarkMode}
            onToggleTheme={() => setIsDarkMode(v => !v)}
            onOpenDemo={() => setShowDemoApp(true)}
          />
          {renderPublicView()}
          <Footer onNavigate={navigate} />
        </>
      )}
      <WhatsAppButton />
      <Chatbot />
      
      {/* Call Center Demo Modal */}
      {showDemoApp && (
        <CallCenterDemo 
          onClose={() => setShowDemoApp(false)} 
          isDarkMode={isDarkMode} 
        />
      )}
    </div>
    </LanguageProvider>
  );
}

export default App;

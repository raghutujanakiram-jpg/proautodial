
import React, { useState } from 'react';
import { AppView } from '../types';
import Logo from '../Logo';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '../contexts/LanguageContext';

interface NavigationProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onOpenDemo?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, onNavigate, isDarkMode, onToggleTheme, onOpenDemo }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [isLoginMenuOpen, setIsLoginMenuOpen] = useState(false);
  const { t } = useLanguage();

  const mainLinks = [
    { label: 'Home', view: AppView.HOME },
    { label: 'Solutions', view: AppView.SOLUTIONS, mega: true },
    { label: 'Industries', view: AppView.SOLUTIONS, industriesMega: true }, // Re-using view, but distinct mega
    { label: 'Use Cases', view: AppView.USE_CASES },
    { label: 'AI Voice Agents', view: AppView.AI_VOICE_AGENTS },
    { label: 'Case Studies', view: AppView.CASE_STUDIES },
    { label: 'Blog', view: AppView.BLOG },
    { label: 'Support', view: AppView.SUPPORT_CENTER },
    { label: 'Pricing', view: AppView.PRICING },
  ];

  const industriesGroups = [
    { label: 'Financial Services', icon: 'fa-coins' },
    { label: 'Healthcare', icon: 'fa-laptop-medical' },
    { label: 'e-Commerce', icon: 'fa-cart-shopping' },
    { label: 'Real Estate', icon: 'fa-house-chimney' },
    { label: 'Education', icon: 'fa-graduation-cap' },
    { label: 'Travel & Hospitality', icon: 'fa-plane' },
    { label: 'Government', icon: 'fa-building-columns' },
    { label: 'BPO', icon: 'fa-headset' },
  ];

  const solutionsGroups = [
    {
      title: 'Sales',
      items: [
        { label: 'Lead Qualification', view: AppView.LEAD_QUALIFICATION, icon: 'fa-filter-circle-dollar' },
        { label: 'Assisted Selling', view: AppView.ASSISTED_SELLING, icon: 'fa-hand-holding-dollar' },
        { label: 'SDR Automation', view: AppView.SDR_AUTOMATION, icon: 'fa-bolt' },
        { label: 'AI Sales Agent', view: AppView.AI_SALES_AGENT, icon: 'fa-user-tie' },
      ]
    },
    {
      title: 'Support',
      items: [
        { label: 'Appointment Management', view: AppView.APPOINTMENT_MANAGEMENT, icon: 'fa-calendar-check' },
        { label: 'AI Customer Service Agent', view: AppView.AI_CUSTOMER_SERVICE_AGENT, icon: 'fa-headset' },
        { label: 'AI Booking Agent', view: AppView.AI_BOOKING_AGENT, icon: 'fa-ticket' },
        { label: 'AI Lead Qualification Agent', view: AppView.AI_LEAD_QUALIFICATION_AGENT, icon: 'fa-user-check' },
      ]
    },
    {
      title: 'Products',
      items: [
        { label: 'AI Call Center & Phone Agents', view: AppView.AI_CALL_CENTER_PHONE_AGENTS, icon: 'fa-phone' },
        { label: 'Flow Builder', view: AppView.FLOW_BUILDER, icon: 'fa-diagram-project' },
        { label: 'IVR', view: AppView.IVR, icon: 'fa-voicemail' },
        { label: 'Virtual Phone System', view: AppView.VIRTUAL_PHONE_SYSTEM, icon: 'fa-phone-volume' },
        { label: 'Predictive Dialer', view: AppView.PREDICTIVE_DIALER, icon: 'fa-bolt' },
        { label: 'Voice Broadcasting', view: AppView.VOICE_BROADCASTING, icon: 'fa-bullhorn' },
        { label: 'Auto Dialer', view: AppView.AUTO_DIALER, icon: 'fa-robot' },
        { label: 'Legacy Agent Portal', view: AppView.LEGACY_PRODUCT, icon: 'fa-desktop' },
        { label: 'Call Center Solution', view: AppView.VIRTUAL_CALL_CENTER, icon: 'fa-building' },
      ]
    },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 h-24 flex items-center bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-slate-200 dark:border-slate-800 border-b z-[300] transition-all duration-500 px-6">
      <div className="max-w-[1600px] mx-auto w-full flex items-center justify-between">
        <div 
          className="cursor-pointer group flex items-center"
          onClick={() => onNavigate(AppView.HOME)}
        >
          <Logo size="xxl" variant="dark" imageUrl="/logo.png" showText={false} />
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {mainLinks.map(link => (
            <div 
              key={link.label} 
              className="relative py-8"
              onMouseEnter={() => {
                if (link.mega) setActiveMegaMenu('solutions');
                else if (link.industriesMega) setActiveMegaMenu('industries');
                else setActiveMegaMenu(null);
              }}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <button 
                onClick={() => onNavigate(link.view)}
                className={`text-[10px] font-black tracking-widest uppercase transition-all flex items-center gap-2 ${
                  currentView === link.view ? 'text-brand' : 'text-slate-500 dark:text-slate-400 hover:text-brand'
                }`}
              >
                {link.label}
                {(link.mega || link.industriesMega) && (
                  <i className={`fas fa-chevron-down text-[8px] transition-transform ${
                    (link.mega && activeMegaMenu === 'solutions') || (link.industriesMega && activeMegaMenu === 'industries') ? 'rotate-180' : ''
                  }`}></i>
                )}
              </button>
              
              {/* Solutions Mega Menu */}
              {link.mega && activeMegaMenu === 'solutions' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[900px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-2xl p-10 animate-fade-in-up">
                  <div className="grid grid-cols-3 gap-8">
                    {solutionsGroups.map(group => (
                      <div key={group.title} className="space-y-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{group.title}</p>
                        <div className="space-y-2">
                          {group.items.map(item => (
                            <button
                              key={item.label}
                              onClick={() => { onNavigate(item.view); setActiveMegaMenu(null); }}
                              className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-left group"
                            >
                              <div className="w-10 h-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center text-lg shadow-sm group-hover:bg-brand group-hover:text-white transition-all">
                                <i className={`fas ${item.icon}`}></i>
                              </div>
                              <span className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-widest">{item.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-10 p-6 bg-slate-900 dark:bg-slate-950 rounded-3xl flex items-center justify-between overflow-hidden relative group/banner">
                    <div className="absolute inset-0 bg-brand opacity-0 group-hover/banner:opacity-10 transition-opacity"></div>
                    <p className="text-sm font-black text-white uppercase tracking-tight relative z-10">Streamlined Communication, Customized for Your Business!</p>
                    <button onClick={() => onNavigate(AppView.CONTACT)} className="px-8 py-3 bg-brand text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl relative z-10 hover:scale-105 transition-all">Book A Demo Today</button>
                  </div>
                </div>
              )}

              {/* Industries Mega Menu */}
              {link.industriesMega && activeMegaMenu === 'industries' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-2xl p-8 animate-fade-in-up">
                   <div className="grid grid-cols-2 gap-4">
                     {industriesGroups.map(ind => (
                       <button
                         key={ind.label}
                         onClick={() => { onNavigate(AppView.USE_CASES); setActiveMegaMenu(null); }}
                         className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-left group"
                       >
                         <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-lg shadow-sm group-hover:bg-emerald-500 group-hover:text-white transition-all">
                           <i className={`fas ${ind.icon}`}></i>
                         </div>
                         <span className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-widest">{ind.label}</span>
                       </button>
                     ))}
                   </div>
                </div>
              )}
            </div>
          ))}
          
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-2"></div>

          <div className="flex items-center gap-4">
            <a 
              href="tel:+918898724365"
              className="hidden xl:flex items-center gap-3 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-brand transition-all shadow-sm"
            >
              <span className="relative w-8 h-8 rounded-lg bg-brand/10 text-brand flex items-center justify-center overflow-visible">
                <span className="absolute inset-0 rounded-lg bg-brand/20 animate-ping"></span>
                <i className="fas fa-phone relative z-10"></i>
              </span>
              <div className="flex flex-col leading-tight">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Hotline</span>
                <span className="text-sm font-black text-slate-900 dark:text-white">+91-8898-7-24-365</span>
              </div>
              <span className="ml-2 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest bg-brand/10 text-brand rounded-full animate-pulse">24×7×365</span>
            </a>
            <LanguageSelector />
            <button 
              onClick={onToggleTheme}
              aria-label="Toggle theme"
              className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
            >
              <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'} text-slate-600 dark:text-slate-300`}></i>
            </button>
            
            <div className="relative" onMouseEnter={() => setIsLoginMenuOpen(true)} onMouseLeave={() => setIsLoginMenuOpen(false)}>
              <button 
                className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-950 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand hover:text-white transition-all shadow-lg flex items-center gap-2"
              >
                Login <i className="fas fa-chevron-down text-[8px]"></i>
              </button>
              
              {isLoginMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden animate-fade-in-up flex flex-col z-50">
                  <button 
                    onClick={() => { onNavigate(AppView.CUSTOMER_LOGIN); setIsLoginMenuOpen(false); }}
                    className="px-6 py-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-3 group"
                  >
                    <i className="fas fa-users text-slate-400 group-hover:text-brand transition-colors"></i>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200">Customer Login</span>
                  </button>
                  <div className="h-px bg-slate-100 dark:bg-slate-800 mx-4"></div>
                  <button 
                    onClick={() => { onNavigate(AppView.ADMIN_LOGIN); setIsLoginMenuOpen(false); }}
                    className="px-6 py-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-3 group"
                  >
                    <i className="fas fa-shield-halved text-slate-400 group-hover:text-brand transition-colors"></i>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200">Admin Login</span>
                  </button>
                </div>
              )}
            </div>

            {onOpenDemo && (
              <button 
                onClick={onOpenDemo}
                className="px-6 py-2.5 bg-emerald-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2"
              >
                <i className="fas fa-play"></i>
                Demo
              </button>
            )}
            <button 
              onClick={() => onNavigate(AppView.BOOK_DEMO)}
              className="px-6 py-2.5 bg-brand text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-brand/20"
            >
              Try ProAutoDial
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden w-10 h-10 flex items-center justify-center text-slate-600 dark:text-slate-300">
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-24 left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-8 flex flex-col gap-6 lg:hidden animate-fade-in shadow-2xl overflow-y-auto max-h-[80vh]">
          {mainLinks.map(link => (
            <button 
              key={link.label} 
              onClick={() => { onNavigate(link.view); setIsMenuOpen(false); }}
              className="text-lg font-black uppercase tracking-widest text-left"
            >
              {link.label}
            </button>
          ))}
          <div className="h-px bg-slate-200 dark:bg-slate-800 w-full"></div>
          <a href="tel:+918898724365" className="w-full py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3">
            <span className="relative w-8 h-8 rounded-lg bg-brand/10 text-brand flex items-center justify-center overflow-visible">
              <span className="absolute inset-0 rounded-lg bg-brand/20 animate-ping"></span>
              <i className="fas fa-phone relative z-10"></i>
            </span>
            +91-8898-7-24-365
            <span className="ml-2 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest bg-brand/10 text-brand rounded-full animate-pulse">24×7×365</span>
          </a>
          {onOpenDemo && (
            <button 
              onClick={() => { onOpenDemo(); setIsMenuOpen(false); }} 
              className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2"
            >
              <i className="fas fa-play"></i>
              Try Demo
            </button>
          )}
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => { onNavigate(AppView.CUSTOMER_LOGIN); setIsMenuOpen(false); }} 
              className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black uppercase tracking-widest text-xs"
            >
              Customer Login
            </button>
            <button 
              onClick={() => { onNavigate(AppView.ADMIN_LOGIN); setIsMenuOpen(false); }} 
              className="w-full py-4 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl font-black uppercase tracking-widest text-xs"
            >
              Admin Login
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;

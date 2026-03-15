
export enum AppView {
  HOME = 'home',
  SOLUTIONS = 'solutions',
  AI_VOICE_AGENTS = 'ai_voice_agents',
  SERVICES = 'services',
  PRICING = 'pricing',
  RESOURCES = 'resources',
  BLOG = 'blog',
  ABOUT = 'about',
  CAREERS = 'careers',
  CONTACT = 'contact',
  USE_CASES = 'use_cases',
  CASE_STUDIES = 'case_studies',
  SUPPORT_CENTER = 'support_center',
  
  // Legal Pages
  TERMS = 'terms',
  PRIVACY_POLICY = 'privacy_policy',
  REFUND_POLICY = 'refund_policy',
  DISCLAIMER = 'disclaimer',

  // Technical Product Detail Views
  AUTO_DIALER = 'auto_dialer',
  VIRTUAL_CALL_CENTER = 'virtual_call_center',
  VOICE_BROADCASTING = 'voice_broadcasting',
  VIRTUAL_PHONE_SYSTEM = 'virtual_phone_system',
  PREDICTIVE_DIALER = 'predictive_dialer',
  VICIDIAL_MASTERY = 'vicidial_mastery',
  MANAGED_HOSTING = 'managed_hosting',
  ROBO_DIALER = 'robo_dialer',
  HOURLY_SUPPORT = 'hourly_support',
  DEDICATED_TECH = 'dedicated_tech',

  // New Solutions: Sales
  LEAD_QUALIFICATION = 'lead_qualification',
  ASSISTED_SELLING = 'assisted_selling',
  SDR_AUTOMATION = 'sdr_automation',
  AI_SALES_AGENT = 'ai_sales_agent',

  // New Solutions: Support
  APPOINTMENT_MANAGEMENT = 'appointment_management',
  AI_CUSTOMER_SERVICE_AGENT = 'ai_customer_service_agent',
  AI_BOOKING_AGENT = 'ai_booking_agent',
  AI_LEAD_QUALIFICATION_AGENT = 'ai_lead_qualification_agent',

  // New Products
  CORPORATE_TRAINING = 'corporate_training',
  AI_CALL_CENTER_PHONE_AGENTS = 'ai_call_center_phone_agents',
  FLOW_BUILDER = 'flow_builder',
  IVR = 'ivr',

  // Industry solutions hub
  INDUSTRY_SOLUTIONS = 'industry_solutions',

  // Specialized Legacy Engineering Views
  VICIDIAL_V11 = 'vicidial_v11',
  GOAUTODIAL_V4 = 'goautodial_v4',
  ASTERISK_DESIGN = 'asterisk_design',
  FREEPBX_SETUP = 'freepbx_setup',

  PORTAL_DASHBOARD = 'portal_dashboard',
  PORTAL_HUB = 'portal_hub',
  HUB = 'portal_hub',
  PORTAL_VOICE_LAB = 'portal_voice_lab',
  VOICE_LAB = 'portal_voice_lab',
  PORTAL_CAMPAIGNS = 'portal_campaigns',
  CAMPAIGNS = 'portal_campaigns',
  PORTAL_KNOWLEDGE = 'portal_knowledge',
  KNOWLEDGE_BASE = 'portal_knowledge',
  PORTAL_PROFILE = 'portal_profile',
  PROFILE = 'portal_profile',
  AGENT_DESKTOP = 'agent_desktop',
  BOOK_DEMO = 'book_demo',
  LANDING = 'landing',
  
  // Auth Pages
  ADMIN_LOGIN = 'admin_login',
  CUSTOMER_LOGIN = 'customer_login',

  // Legacy Product Integration
  LEGACY_PRODUCT = 'legacy_product',

  // Call Center Demo Application
  DEMO_APP = 'demo_app'
}

export type CurrencyCode =
  | 'INR'
  | 'USD'
  | 'LKR' // Sri Lanka Rupee
  | 'THB' // Thai Baht
  | 'MYR' // Malaysian Ringgit
  | 'PHP' // Philippine Peso
  | 'BDT' // Bangladeshi Taka
  | 'MVR' // Maldivian Rufiyaa
  | 'MUR' // Mauritian Rupee
  | 'VND' // Vietnamese Dong
  | 'AED' // UAE Dirham
  | 'SAR' // Saudi Riyal
  | 'ZAR' // South African Rand
  | 'EUR'; // Euro (Ireland

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  language: string;
  timezone: string;
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface TranscriptLine {
  speaker: 'ai' | 'customer' | 'agent';
  text: string;
  timestamp: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
  sources?: { title: string; uri: string }[];
}

export enum AspectRatio {
  SQUARE = '1:1',
  NINE_SIXTEEN = '9:16',
  SIXTEEN_NINE = '16:9'
}

export interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed';
  concurrency: number;
  leadsProcessed: number;
  qualifiedCount: number;
  startTime: string;
  stats: {
    conversionRate: number;
    avgCallDuration: number;
    roi: number;
    agentPerformanceScore: number;
    totalCalls: number;
    leadsQualified: number;
  };
}

export interface TaskHistoryItem {
  id: string;
  name: string;
  assignedAt: string;
  status: 'active' | 'completed';
}

export interface AssistantTemplate {
  id: string;
  name: string;
  description: string;
  industry: string;
  icon: string;
  customIcon?: string;
  type: 'outbound' | 'inbound' | 'webcall';
  status: 'online' | 'offline' | 'provisioning';
  phoneNumber?: string;
  metrics: {
    callsHandled: string;
    qualRate: string;
    sentiment: string;
    avgSentiment7d: string;
    latency: string;
  };
  isPinned?: boolean;
  assignedTask?: string;
  taskHistory: TaskHistoryItem[];
}

export const CURRENCIES: { code: CurrencyCode; symbol: string; flag: string }[] = [
  { code: 'INR', symbol: '₹', flag: '🇮🇳' },
  { code: 'USD', symbol: '$', flag: '🇺🇸' },
  { code: 'LKR', symbol: 'Rs', flag: '🇱🇰' },
  { code: 'THB', symbol: '฿', flag: '🇹🇭' },
  { code: 'MYR', symbol: 'RM', flag: '🇲🇾' },
  { code: 'PHP', symbol: '₱', flag: '🇵🇭' },
  { code: 'BDT', symbol: '৳', flag: '🇧🇩' },
  { code: 'MVR', symbol: 'Rf', flag: '🇲🇻' },
  { code: 'MUR', symbol: '₨', flag: '🇲🇺' },
  { code: 'VND', symbol: '₫', flag: '🇻🇳' },
  { code: 'AED', symbol: 'د.إ', flag: '🇦🇪' },
  { code: 'SAR', symbol: '﷼', flag: '🇸🇦' },
  { code: 'ZAR', symbol: 'R', flag: '🇿🇦' },
  { code: 'EUR', symbol: '€', flag: '🇮🇪' },
];

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'hi' | 'te' | 'ta' | 'es' | 'ar';

interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
}

export const languages: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: 'GB' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: 'IN' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: 'IN' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: 'IN' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: 'ES' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: 'SA' },
];

// Translations for key UI elements
export const translations: Record<Language, Record<string, string>> = {
  en: {
    home: 'Home',
    solutions: 'Solutions',
    industries: 'Industries',
    useCases: 'Use Cases',
    aiVoiceAgents: 'AI Voice Agents',
    caseStudies: 'Case Studies',
    blog: 'Blog',
    support: 'Support',
    pricing: 'Pricing',
    login: 'Login',
    tryProAutoDial: 'Try ProAutoDial',
    bookDemo: 'Book A Demo Today',
    hotline: 'Hotline',
    customerLogin: 'Customer Login',
    adminLogin: 'Admin Login',
    chatWithUs: 'Chat with us',
    askAnything: 'Ask anything...',
    strategicAI: 'Strategic AI',
    autonomousAssistant: 'Autonomous Assistant',
    inquireCapabilities: 'Inquire about our enterprise capabilities.',
  },
  hi: {
    home: 'होम',
    solutions: 'समाधान',
    industries: 'उद्योग',
    useCases: 'उपयोग के मामले',
    aiVoiceAgents: 'AI वॉइस एजेंट',
    caseStudies: 'केस स्टडी',
    blog: 'ब्लॉग',
    support: 'सहायता',
    pricing: 'मूल्य निर्धारण',
    login: 'लॉगिन',
    tryProAutoDial: 'ProAutoDial आज़माएं',
    bookDemo: 'आज डेमो बुक करें',
    hotline: 'हॉटलाइन',
    customerLogin: 'ग्राहक लॉगिन',
    adminLogin: 'एडमिन लॉगिन',
    chatWithUs: 'हमसे चैट करें',
    askAnything: 'कुछ भी पूछें...',
    strategicAI: 'स्ट्रैटेजिक AI',
    autonomousAssistant: 'स्वायत्त सहायक',
    inquireCapabilities: 'हमारी उद्यम क्षमताओं के बारे में पूछें।',
  },
  te: {
    home: 'హోమ్',
    solutions: 'పరిష్కారాలు',
    industries: 'పరిశ్రమలు',
    useCases: 'వినియోగ కేసులు',
    aiVoiceAgents: 'AI వాయిస్ ఏజెంట్లు',
    caseStudies: 'కేస్ స్టడీస్',
    blog: 'బ్లాగ్',
    support: 'సపోర్ట్',
    pricing: 'ధరలు',
    login: 'లాగిన్',
    tryProAutoDial: 'ProAutoDial ప్రయత్నించండి',
    bookDemo: 'ఈరోజు డెమో బుక్ చేయండి',
    hotline: 'హాట్‌లైన్',
    customerLogin: 'కస్టమర్ లాగిన్',
    adminLogin: 'అడ్మిన్ లాగిన్',
    chatWithUs: 'మాతో చాట్ చేయండి',
    askAnything: 'ఏదైనా అడగండి...',
    strategicAI: 'స్ట్రాటజిక్ AI',
    autonomousAssistant: 'స్వయంప్రతిపత్తి అసిస్టెంట్',
    inquireCapabilities: 'మా ఎంటర్‌ప్రైజ్ సామర్థ్యాల గురించి అడగండి.',
  },
  ta: {
    home: 'முகப்பு',
    solutions: 'தீர்வுகள்',
    industries: 'தொழில்கள்',
    useCases: 'பயன்பாட்டு நிகழ்வுகள்',
    aiVoiceAgents: 'AI குரல் முகவர்கள்',
    caseStudies: 'வழக்கு ஆய்வுகள்',
    blog: 'வலைப்பதிவு',
    support: 'ஆதரவு',
    pricing: 'விலை நிர்ணயம்',
    login: 'உள்நுழைவு',
    tryProAutoDial: 'ProAutoDial முயற்சிக்கவும்',
    bookDemo: 'இன்றே டெமோ புக் செய்யுங்கள்',
    hotline: 'ஹாட்லைன்',
    customerLogin: 'வாடிக்கையாளர் உள்நுழைவு',
    adminLogin: 'நிர்வாகி உள்நுழைவு',
    chatWithUs: 'எங்களுடன் அரட்டையடிக்கவும்',
    askAnything: 'எதையும் கேளுங்கள்...',
    strategicAI: 'மூலோபாய AI',
    autonomousAssistant: 'சுயாதீன உதவியாளர்',
    inquireCapabilities: 'எங்கள் நிறுவன திறன்கள் பற்றி விசாரிக்கவும்.',
  },
  es: {
    home: 'Inicio',
    solutions: 'Soluciones',
    industries: 'Industrias',
    useCases: 'Casos de Uso',
    aiVoiceAgents: 'Agentes de Voz IA',
    caseStudies: 'Casos de Estudio',
    blog: 'Blog',
    support: 'Soporte',
    pricing: 'Precios',
    login: 'Iniciar Sesión',
    tryProAutoDial: 'Prueba ProAutoDial',
    bookDemo: 'Reserve una Demo Hoy',
    hotline: 'Línea Directa',
    customerLogin: 'Acceso Cliente',
    adminLogin: 'Acceso Admin',
    chatWithUs: 'Chatea con nosotros',
    askAnything: 'Pregunta lo que sea...',
    strategicAI: 'IA Estratégica',
    autonomousAssistant: 'Asistente Autónomo',
    inquireCapabilities: 'Consulte sobre nuestras capacidades empresariales.',
  },
  ar: {
    home: 'الرئيسية',
    solutions: 'الحلول',
    industries: 'الصناعات',
    useCases: 'حالات الاستخدام',
    aiVoiceAgents: 'وكلاء الصوت AI',
    caseStudies: 'دراسات الحالة',
    blog: 'المدونة',
    support: 'الدعم',
    pricing: 'الأسعار',
    login: 'تسجيل الدخول',
    tryProAutoDial: 'جرب ProAutoDial',
    bookDemo: 'احجز عرضًا توضيحيًا اليوم',
    hotline: 'الخط الساخن',
    customerLogin: 'دخول العملاء',
    adminLogin: 'دخول المسؤول',
    chatWithUs: 'تحدث معنا',
    askAnything: 'اسأل أي شيء...',
    strategicAI: 'الذكاء الاستراتيجي',
    autonomousAssistant: 'المساعد المستقل',
    inquireCapabilities: 'استفسر عن قدراتنا المؤسسية.',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    // Update document direction for RTL languages
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

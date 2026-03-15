import React, { useState, useRef, useEffect } from 'react';
import { useLanguage, languages, Language } from '../contexts/LanguageContext';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = languages.find(l => l.code === language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
        aria-label="Select language"
      >
        <span className="text-base">{getFlagEmoji(currentLang.flag)}</span>
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hidden sm:inline">
          {currentLang.code.toUpperCase()}
        </span>
        <i className={`fas fa-chevron-down text-[8px] text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}></i>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up z-[400]">
          <div className="p-2">
            <p className="px-3 py-2 text-[9px] font-black uppercase tracking-widest text-slate-400">
              Select Language
            </p>
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all text-left ${
                  language === lang.code
                    ? 'bg-brand/10 text-brand'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
                }`}
              >
                <span className="text-xl">{getFlagEmoji(lang.flag)}</span>
                <div className="flex flex-col">
                  <span className="text-xs font-bold">{lang.name}</span>
                  <span className="text-[10px] text-slate-400">{lang.nativeName}</span>
                </div>
                {language === lang.code && (
                  <i className="fas fa-check ml-auto text-brand"></i>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to convert country code to flag emoji
function getFlagEmoji(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export default LanguageSelector;

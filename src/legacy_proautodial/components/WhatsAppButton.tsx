
import React from 'react';

const WhatsAppButton: React.FC = () => {
  const whatsappNumber = "919949456564";
  const message = encodeURIComponent("Hello! I'm interested in ProAutoDial solutions.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-32 right-8 z-[100] w-16 h-16 bg-[#25D366] text-white rounded-[1.5rem] shadow-xl hover:scale-110 transition-all flex items-center justify-center group"
      aria-label="Chat on WhatsApp"
    >
      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-[1.5rem]"></div>
      <i className="fab fa-whatsapp text-4xl relative z-10 group-hover:rotate-12 transition-transform"></i>
      
      {/* Tooltip */}
      <span className="absolute right-20 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
        Chat with us
      </span>
      
      {/* Pulse Effect */}
      <span className="absolute inset-0 rounded-[1.5rem] bg-[#25D366] animate-ping opacity-20 pointer-events-none"></span>
    </a>
  );
};

export default WhatsAppButton;

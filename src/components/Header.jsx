import React from 'react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-brand-darker/70 backdrop-blur-xl border-b border-white/5 transition-all duration-300" id="navbar">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group focus:outline-none relative">
          <div className="relative shrink-0 w-9.5 h-9.5 flex items-center justify-center">
            <img 
              src="/favicon.ico" 
              className="w-8.5 h-8.5 object-contain rounded-xl shadow-md group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative z-10" 
              alt="soosial logo" 
            />
            <div className="absolute inset-0 bg-brand-pink/30 rounded-xl blur-md filter opacity-40 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
          </div>
          <div>
            <span className="text-2xl font-black font-outfit tracking-tight text-white group-hover:text-brand-pink transition-colors">soosial<span className="text-brand-orange">.in</span></span>
            <span className="block text-[8px] tracking-widest text-gray-400 uppercase font-black -mt-1">Omnexia Technologies PVT L.T.D.</span>
          </div>
        </a>


        {/* CTA Download Buttons */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <a
            href="https://play.google.com/store/apps/details?id=com.omnexiatechnology.soosial&pcampaignid=web_share"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-3.5 py-2 sm:px-4.5 sm:py-2.5 rounded-xl text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-white bg-gradient-to-r from-white/10 via-white/5 to-white/10 hover:from-brand-orange/25 hover:to-brand-pink/20 border border-white/15 hover:border-brand-orange/60 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-black/40 hover:shadow-[0_0_20px_rgba(255,94,0,0.35)] overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
            <i className="fa-brands fa-google-play text-brand-orange text-xs group-hover:scale-110 transition-transform"></i>
            <span>Play Store</span>
          </a>

          <a
            href="https://apps.apple.com/in/app/soosial/id6786051737"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-3.5 py-2 sm:px-4.5 sm:py-2.5 rounded-xl text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-white bg-gradient-to-r from-white/10 via-white/5 to-white/10 hover:from-brand-pink/25 hover:to-brand-purple/20 border border-white/15 hover:border-brand-pink/60 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-black/40 hover:shadow-[0_0_20px_rgba(255,42,133,0.35)] overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
            <i className="fa-brands fa-apple text-brand-pink text-xs group-hover:scale-110 transition-transform"></i>
            <span>App Store</span>
          </a>
        </div>
      </div>
    </header>
  );
}

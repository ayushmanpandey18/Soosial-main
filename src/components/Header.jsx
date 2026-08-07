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
        <div className="flex items-center gap-2 sm:gap-3">
          <a href="#download-assets" className="px-3 sm:px-4.5 py-2 sm:py-2.5 rounded-xl text-[10px] font-extrabold uppercase tracking-wider text-white bg-white/10 hover:bg-brand-orange/15 border border-white/20 hover:border-brand-orange/60 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 sm:gap-2 shadow-lg shadow-black/20">
            <i className="fa-brands fa-google-play text-brand-orange text-xs"></i>
            <span className="hidden xs:inline">Play Store</span>
          </a>
          <a href="#download-assets" className="px-3 sm:px-4.5 py-2 sm:py-2.5 rounded-xl text-[10px] font-extrabold uppercase tracking-wider text-white bg-white/10 hover:bg-brand-pink/15 border border-white/20 hover:border-brand-pink/60 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 sm:gap-2 shadow-lg shadow-black/20">
            <i className="fa-brands fa-apple text-brand-pink text-xs"></i>
            <span className="hidden xs:inline">App Store</span>
          </a>
        </div>
      </div>
    </header>
  );
}

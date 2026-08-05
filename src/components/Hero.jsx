import React, { useState } from 'react';
import { playDemoSound } from '../utils/audio';

export default function Hero({ onBookCreator }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayVoice = () => {
    setIsPlaying(true);
    playDemoSound(330, 0.6, 'triangle');
    setTimeout(() => setIsPlaying(false), 600);
  };

  return (
    <section className="relative pt-36 pb-24 md:pt-44 md:pb-36 overflow-hidden">
      {/* Glowing Ambient Lights */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-orange/15 rounded-full blur-[120px] animate-pulse-slow"></div>
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-brand-purple/15 rounded-full blur-[150px] animate-pulse-slow"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left Narrative Column */}
        <div className="lg:col-span-7 text-center lg:text-left space-y-8">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-white/5 rounded-full border border-white/10">
            <span className="w-2 h-2 rounded-full bg-brand-pink animate-ping"></span>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-300">Made in India â€¢ Omnexia Technologies PVT L.T.D.</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-outfit leading-tight tracking-tight text-white">
            Where Creators <br />
            <span className="gradient-text">Monetize Day 1.</span>
          </h1>
          
          <p className="text-gray-300 text-lg sm:text-xl max-w-2xl leading-relaxed font-light">
            Soosial is India's premium, high-security social architecture built to empower creators. Enjoy absolute privacy with no monthly database leaks. Monetize from Day 1 through direct business-to-creator bookings (SOOS videos, stories, shoutouts) and curate your intellect with our non-addictive Persona stream.
          </p>

          {/* Premium Value Points Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 text-left max-w-xl mx-auto lg:mx-0">
            <div className="flex items-start gap-3">
              <span className="text-brand-orange text-lg mt-0.5"><i className="fa-solid fa-shield-halved"></i></span>
              <div>
                <h4 className="font-bold text-white text-sm font-outfit">Sovereign Data Shield</h4>
                <p className="text-xs text-gray-400 mt-1">100% local hosting within India protecting your chats & files from dark web leaks.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-brand-pink text-lg mt-0.5"><i className="fa-solid fa-microphone"></i></span>
              <div>
                <h4 className="font-bold text-white text-sm font-outfit">Infinite Voice Comments</h4>
                <p className="text-xs text-gray-400 mt-1">Comment using high-fidelity vocal notes. Express real human sentiment without limits.</p>
              </div>
            </div>
          </div>

          {/* App Store Downloads */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-6" id="download-assets">
            {/* Google Play Store */}
            <a href="#download" onClick={(e) => e.preventDefault()} className="flex items-center gap-3 bg-brand-dark hover:bg-black border border-white/10 hover:border-brand-orange/50 rounded-xl px-5 py-3 transition-all transform hover:-translate-y-1">
              <i className="fa-brands fa-google-play text-2xl text-brand-orange"></i>
              <div className="text-left">
                <span className="block text-[9px] uppercase tracking-wider text-gray-400 font-bold">Acquire on</span>
                <span className="font-outfit font-black text-sm text-white">Google Play</span>
              </div>
            </a>

            {/* Apple App Store */}
            <a href="#download" onClick={(e) => e.preventDefault()} className="flex items-center gap-3 bg-brand-dark hover:bg-black border border-white/10 hover:border-brand-purple/50 rounded-xl px-5 py-3 transition-all transform hover:-translate-y-1">
              <i className="fa-brands fa-apple text-2xl text-brand-pink"></i>
              <div className="text-left">
                <span className="block text-[9px] uppercase tracking-wider text-gray-400 font-bold">Download from</span>
                <span className="font-outfit font-black text-sm text-white">App Store</span>
              </div>
            </a>
          </div>
        </div>

        {/* Right Phone Mockup Column */}
        <div className="lg:col-span-5 flex justify-center items-center relative">
          {/* Floating geometric elements mimicking logo nodes */}
          <div className="absolute -top-12 -left-12 w-28 h-28 bg-gradient-to-br from-brand-orange to-brand-pink rounded-full blur-md opacity-25 animate-float"></div>
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br from-brand-pink to-brand-purple rounded-full blur-md opacity-25 animate-float" style={{ animationDelay: '2.5s' }}></div>

          {/* High-fidelity Mockup container */}
          <div className="relative mockup-container w-[300px] sm:w-[330px] h-[610px] bg-brand-darker border-[6px] border-white/15 rounded-[44px] overflow-hidden">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-5.5 bg-white/10 rounded-b-2xl z-40 flex items-center justify-center">
              <div className="w-14 h-1 bg-black/60 rounded-full"></div>
            </div>            
            {/* Inner App Shell */}
            <div className="w-full h-full relative flex flex-col pt-8 bg-[#07050a] select-none">
              
              {/* Phone Status Bar */}
              <div className="absolute top-0 left-0 w-full h-8 px-6 flex justify-between items-center text-[10.5px] font-sans font-bold text-gray-300 z-40 pointer-events-none">
                <span>10:29</span>
                

                <div className="flex items-center gap-1.5">
                  <span className="text-[9px]">Vo NR</span>
                  <i className="fa-solid fa-signal text-[9px]"></i>
                  <div className="flex items-center gap-0.5 border border-red-500/50 rounded-sm px-0.5 text-[8px] text-red-500 font-mono">
                    13%
                  </div>
                </div>
              </div>

              {/* App Header */}
              <div className="px-4 pt-4 pb-3 flex justify-between items-center bg-[#07050a] z-10 shrink-0">
                <div className="flex items-center">
                  <span className="font-outfit font-black text-xl tracking-tight text-white flex items-center">
                    Soosial<span className="text-brand-purple text-xl -ml-0.5">.</span>
                  </span>
                </div>
                
                <div className="flex items-center gap-1.5">
                  {/* Search Bar */}
                  <div className="bg-[#12101a] border border-white/10 pl-3 pr-1 py-1 rounded-full flex items-center justify-between gap-1 w-36">
                    <span className="text-[11px] text-gray-400">Search...</span>
                    <button className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-black text-[10px] cursor-pointer">
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                  </div>
                  
                  {/* Plus Button */}
                  <button className="w-[26px] h-[26px] rounded-full bg-[#12101a] border border-white/10 text-white flex items-center justify-center text-[10.5px] cursor-pointer">
                    <i className="fa-solid fa-plus"></i>
                  </button>

                  {/* Notification Bell */}
                  <button className="w-[26px] h-[26px] rounded-full bg-[#12101a] border border-white/10 text-white flex items-center justify-center text-[10.5px] cursor-pointer">
                    <i className="fa-regular fa-bell text-[10.5px]"></i>
                  </button>
                </div>
              </div>

              {/* Horizontal Stories Tray */}
              <div className="px-4 py-3 flex items-center gap-4 border-b border-white/5 shrink-0 bg-[#07050a] text-left">
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-11 h-11 rounded-full p-[2px] bg-gradient-to-br from-brand-purple to-brand-pink flex items-center justify-center shadow-md shadow-brand-purple/20">
                    <div className="w-full h-full rounded-full bg-[#07050a] flex items-center justify-center text-white text-xs">
                      <i className="fa-solid fa-plus"></i>
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-300 font-bold">Add Story</span>
                </div>
              </div>

              {/* Feed Post View */}
              <div className="flex-1 overflow-y-auto px-4 py-3 bg-[#07050a] space-y-4 no-scrollbar">
                
                {/* Card */}
                <div className="bg-[#0c0a14] border border-white/5 rounded-2xl p-3.5 space-y-3.5 text-left">
                  {/* Creator Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-full bg-brand-purple flex items-center justify-center font-bold text-white text-[11.5px] border border-white/10 shadow">
                        U1
                      </div>
                      <div>
                        <p className="font-bold text-[12px] text-white flex items-center gap-1.5">
                          user_name_1
                          <span className="text-[11px] text-[#4f46e5]"><i className="fa-solid fa-laptop-code"></i></span>
                        </p>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-white cursor-pointer"><i className="fa-solid fa-ellipsis-vertical text-[12px]"></i></button>
                  </div>

                  {/* Post Content Video Card */}
                  <div className="relative bg-[#13111c] rounded-xl border border-white/10 overflow-hidden flex flex-col justify-between p-3.5 h-[270px] shadow-inner text-white font-sans">
                    
                    {/* Video Top Indicators */}
                    <div className="flex justify-between items-center text-[10.5px] text-gray-400 font-bold z-10 shrink-0">
                      <span>studytoolsofficial</span>
                      <span>0:20</span>
                    </div>

                    {/* Content text in video */}
                    <div className="my-auto space-y-3 z-10 text-left pt-2">
                      <h4 className="text-[13px] font-black tracking-wide text-white text-center">
                        05 SECRET GEMINI CODES
                      </h4>
                      <ul className="text-[11px] font-mono text-gray-300 space-y-1 pl-4 leading-relaxed max-w-[170px]">
                        <li>1. /Visualize</li>
                        <li>2. /teach</li>
                        <li>3. /Analyze</li>
                      </ul>
                    </div>

                    {/* Creator Vector Graphic (Coded via SVG to look exactly like the creator in homepage.jpeg) */}
                    <div className="absolute right-0 bottom-6 w-32 h-32 opacity-90 z-0 select-none">
                      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Background subtle light */}
                        <circle cx="50" cy="50" r="45" fill="url(#bgGlow)" opacity="0.15" />
                        
                        {/* Creator Portrait details */}
                        {/* Shoulders / Body */}
                        <path d="M20 90 Q30 72 50 72 Q70 72 80 90" fill="#0d0d0d" stroke="#1c1c1c" strokeWidth="1.5" />
                        
                        {/* Neck */}
                        <rect x="44" y="55" width="12" height="15" fill="#d9a082" />
                        
                        {/* Head */}
                        <rect x="37" y="32" width="26" height="28" rx="8" fill="#e8b195" />
                        
                        {/* Hair */}
                        <path d="M35 34 C35 24, 65 24, 65 34 C65 28, 35 28, 35 34" fill="#121212" stroke="#121212" strokeWidth="2" />
                        <path d="M35 33 L65 33 L65 26 L35 26 Z" fill="#121212" />
                        
                        {/* Beard */}
                        <path d="M37 48 C37 60, 63 60, 63 48 L61 48 C61 57, 39 57, 39 48" fill="#1f1f1f" />
                        
                        {/* Studio Microphone */}
                        {/* Stand */}
                        <line x1="50" y1="62" x2="50" y2="85" stroke="#222" strokeWidth="3" />
                        {/* Mic Body */}
                        <rect x="46" y="50" width="8" height="14" rx="4" fill="#333" stroke="#555" strokeWidth="1" />
                        {/* Pop filter mesh */}
                        <rect x="47" y="51" width="6" height="6" rx="1" fill="#1a1a1a" />
                        {/* Shock mount ring */}
                        <circle cx="50" cy="57" r="7" stroke="#444" strokeWidth="1.5" fill="none" />
                        
                        <defs>
                          <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#ffffff" />
                            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                          </radialGradient>
                        </defs>
                      </svg>
                    </div>

                    {/* Bottom actions bar pill - Styled exactly like the crop */}
                    <div className="relative z-10 flex justify-between items-center mt-auto">
                      <div className="flex items-center gap-2.5 bg-[#0b0914] backdrop-blur-md px-3.5 py-2 rounded-full border border-white/10 text-[10.5px] font-bold text-white shadow-lg">
                        <span className="flex items-center gap-1.5 hover:text-brand-pink transition-colors cursor-pointer">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                          </svg>
                          <span>43</span>
                        </span>
                        <span className="text-white/20 font-light">|</span>
                        <span className="flex items-center gap-1.5 hover:text-brand-purple transition-colors cursor-pointer">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                          </svg>
                          <span>23</span>
                        </span>
                        <span className="text-white/20 font-light">|</span>
                        <span className="hover:text-emerald-400 transition-colors cursor-pointer">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="17 1 21 5 17 9" />
                            <path d="M3 11V9a4 4 0 0 1 4-4h14" />
                            <polyline points="7 23 3 19 7 15" />
                            <path d="M21 13v2a4 4 0 0 1-4 4H3" />
                          </svg>
                        </span>
                        <span className="text-white/20 font-light">|</span>
                        <span className="hover:text-brand-orange transition-colors cursor-pointer">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                          </svg>
                        </span>
                      </div>
                      
                      <button className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                        </svg>
                      </button>
                    </div>

                  </div>
                </div>
              </div>

              {/* Bottom Navigation Bar - Styled exactly like the crop */}
              <div className="px-6 py-3.5 bg-[#07050a] border-t border-white/5 flex justify-between items-center shrink-0 z-10">
                <button className="text-[#8b5cf6] cursor-pointer">
                  <svg className="w-5 h-5" fill="#8b5cf6" viewBox="0 0 24 24">
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                  </svg>
                </button>
                <button className="cursor-pointer text-gray-400 hover:text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="9" width="18" height="12" rx="2" ry="2" />
                    <path d="M3 9l4-4h14l-4 4z" />
                    <path d="M9 5v4" />
                    <path d="M15 5v4" />
                  </svg>
                </button>
                <button className="cursor-pointer text-gray-400 hover:text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    <line x1="8" y1="10" x2="16" y2="10" />
                    <line x1="8" y1="14" x2="14" y2="14" />
                  </svg>
                </button>
                <button className="cursor-pointer text-gray-400 hover:text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

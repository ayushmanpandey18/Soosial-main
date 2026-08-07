import React, { useState, useEffect } from 'react';
import { playClickSound, playDemoSound } from '../utils/audio';

export default function Features() {
  // Slide 2 simulated state: Toggle Professional/Creative
  const [personaToggle, setPersonaToggle] = useState('professional');

  // Auto loop Slide 2 Persona switcher to make it animate automatically
  useEffect(() => {
    const timer = setInterval(() => {
      setPersonaToggle(prev => prev === 'professional' ? 'creative' : 'professional');
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-brand-darker text-white overflow-hidden">
      
      {/* ================= BANNERS CONTAINER: SLIDE 1 ================= */}
      <section className="py-24 border-t border-white/5 relative bg-brand-darker">
        <div className="absolute top-1/2 left-10 w-[300px] h-[300px] bg-brand-pink/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            
            {/* Left Column: Text content */}
            <div className="flex-1 text-left space-y-6">
              <span className="text-[10px] font-black uppercase text-brand-pink tracking-widest bg-brand-pink/10 border border-brand-pink/20 px-3 py-1 rounded-full">
                Socially Expressive
              </span>
              <h3 className="text-3xl sm:text-5xl font-black font-outfit leading-tight">
                Infinite <br />
                <span className="gradient-text">Voice Comments.</span>
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-lg">
                Standard text typing strips away genuine human emotion. Soosial introduces unlimited Voice Comments on any post. Engage authentically with high-fidelity voice notes that preserve tone, humor, and respect.
              </p>
              <ul className="text-xs text-gray-500 space-y-2.5 font-bold pt-2">
                <li><i className="fa-solid fa-check text-brand-pink mr-2"></i> High-Fidelity Lossless sound compression</li>
                <li><i className="fa-solid fa-check text-brand-pink mr-2"></i> Unlimited length & instant voice streaming</li>
                <li><i className="fa-solid fa-check text-brand-pink mr-2"></i> Natural vocal presence over flat texts</li>
              </ul>
            </div>
            
            {/* Right Column: High-quality visual loop animation */}
            <div className="flex-1 flex justify-center">
              <div className="relative mockup-container w-80 h-[240px] bg-brand-dark border border-white/10 rounded-3xl p-5 flex flex-col justify-between select-none overflow-hidden">
                <div className="absolute -top-10 -right-10 w-28 h-28 bg-brand-pink/10 rounded-full blur-2xl"></div>
                
                {/* Header */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-brand-pink flex items-center justify-center font-bold text-white text-[10px]">SG</div>
                  <div>
                    <h5 className="text-[10.5px] font-bold text-white">@sg.creates</h5>
                    <p className="text-[7.5px] text-gray-500">Active content creator</p>
                  </div>
                </div>

                {/* Subtext */}
                <p className="text-[9.5px] text-gray-300 font-light text-left leading-normal">
                  "This comment preserves my exact pitch and voice texture. Say goodbye to toxic textual interpretation! 🎙️✨"
                </p>

                {/* Simulated Waveform Player */}
                <div className="bg-black/45 border border-white/5 p-3 rounded-2xl flex items-center gap-3">
                  <button className="w-7 h-7 rounded-full bg-brand-pink flex items-center justify-center text-white text-xs cursor-pointer">
                    <i className="fa-solid fa-pause animate-pulse"></i>
                  </button>
                  <div className="flex-1 flex items-end gap-1.5 h-6 pb-1">
                    {[2, 4, 3, 5, 2, 4, 3, 2, 4.5, 3, 1.5, 3].map((height, i) => (
                      <div 
                        key={i} 
                        className="w-0.5 bg-brand-pink rounded-full origin-bottom animate-waveform"
                        style={{ 
                          height: `${height * 20}%`, 
                          animationDelay: `${i * 0.08}s` 
                        }}
                      ></div>
                    ))}
                  </div>
                  <span className="text-[8px] text-gray-500 font-mono">0:04</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= BANNERS CONTAINER: SLIDE 2 ================= */}
      <section className="py-24 border-t border-white/5 relative bg-brand-dark">
        <div className="absolute top-1/2 right-10 w-[300px] h-[300px] bg-brand-purple/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row-reverse items-center justify-between gap-16">
            
            {/* Left Column: Text content */}
            <div className="flex-1 text-left space-y-6">
              <span className="text-[10px] font-black uppercase text-brand-purple tracking-widest bg-brand-purple/10 border border-brand-purple/20 px-3 py-1 rounded-full">
                Clean Productivity
              </span>
              <h3 className="text-3xl sm:text-5xl font-black font-outfit leading-tight">
                Anti-Addiction <br />
                <span className="gradient-text">Persona Feed.</span>
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-lg">
                Say goodbye to mindless doomscrolling. When you create your account, you select your specific Persona (content you want to watch or post). Our engine cleans out addictive, time-wasting junk, feeding you only high-value, useful updates.
              </p>
              <ul className="text-xs text-gray-500 space-y-2.5 font-bold pt-2">
                <li><i className="fa-solid fa-check text-brand-purple mr-2"></i> Intentional, user-controlled recommendation</li>
                <li><i className="fa-solid fa-check text-brand-purple mr-2"></i> Zero endless loops designed for distraction</li>
                <li><i className="fa-solid fa-check text-brand-purple mr-2"></i> Intellect-aligned constructive content stream</li>
              </ul>
            </div>
            
            {/* Right Column: High-quality visual loop animation */}
            <div className="flex-1 flex justify-center">
              <div className="relative mockup-container w-80 h-[310px] bg-brand-darker border border-white/10 rounded-3xl p-5 flex flex-col select-none text-left overflow-hidden">
                <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-brand-purple/10 rounded-full blur-2xl"></div>
                
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                  <span className="text-[9px] font-black text-white tracking-widest uppercase">Persona Filter Feed</span>
                  <div className="flex bg-black/60 p-0.5 rounded-lg border border-white/5 text-[7px] font-bold">
                    <span className={`px-2 py-0.5 rounded ${personaToggle === 'professional' ? 'bg-brand-purple text-white' : 'text-gray-500'}`}>Professional</span>
                    <span className={`px-2 py-0.5 rounded ${personaToggle === 'creative' ? 'bg-brand-purple text-white' : 'text-gray-500'}`}>Creative</span>
                  </div>
                </div>

                {/* Animated Portfolio Card */}
                <div className="flex-1 flex items-center justify-center py-2">
                  {personaToggle === 'professional' ? (
                    <div className="w-full bg-[#0b0914] border border-white/5 p-3.5 rounded-2xl space-y-2.5 animate-fade-in">
                      <div className="flex items-center gap-1.5 text-brand-purple text-[8.5px] font-black uppercase tracking-wider">
                        <i className="fa-solid fa-briefcase"></i> TECH PORTFOLIO
                      </div>
                      <h4 className="text-[11.5px] font-bold text-white">Full-Stack Scalability Model</h4>
                      <p className="text-[8px] text-gray-500 leading-snug">Deploying microservices locally on private clusters. Eliminates third-party leaks.</p>
                      <div className="flex justify-between items-center text-[7.5px] font-bold text-gray-400">
                        <span>User Name</span>
                        <span className="text-brand-purple">Read details</span>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full bg-[#0b0914] border border-white/5 p-3.5 rounded-2xl space-y-2.5 animate-fade-in">
                      <div className="flex items-center gap-1.5 text-brand-pink text-[8.5px] font-black uppercase tracking-wider">
                        <i className="fa-solid fa-palette"></i> CREATIVE FEED
                      </div>
                      <h4 className="text-[11.5px] font-bold text-white">Interactive Branding Showcase</h4>
                      <p className="text-[8px] text-gray-500 leading-snug">Redesigning user experience through physical interfaces, stickers, and sound.</p>
                      <div className="flex justify-between items-center text-[7.5px] font-bold text-gray-400">
                        <span>Sonalika Poor</span>
                        <span className="text-brand-pink">View gallery</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Info Footer */}
                <div className="text-[7.5px] text-gray-500 font-medium text-center">
                  💡 recommendation filter aligned with selected persona
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= BANNERS CONTAINER: SLIDE 3 ================= */}
      <section className="py-24 border-t border-white/5 relative bg-brand-darker">
        <div className="absolute top-1/2 left-10 w-[300px] h-[300px] bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            
            {/* Left Column: Text content */}
            <div className="flex-1 text-left space-y-6">
              <span className="text-[10px] font-black uppercase text-brand-orange tracking-widest bg-brand-orange/10 border border-brand-orange/20 px-3 py-1 rounded-full">
                Sovereign Privacy
              </span>
              <h3 className="text-3xl sm:text-5xl font-black font-outfit leading-tight">
                Zero Leaks. <br />
                <span className="gradient-text">Local Servers.</span>
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-lg">
                Most mainstream networks experience massive data breaches every month, leaking the metadata and personal files of millions of users. Built in India by Omnexia Technologies PVT L.T.D., Soosial stores your data securely within regional boundaries, applying strict local encryption.
              </p>
              <ul className="text-xs text-gray-500 space-y-2.5 font-bold pt-2">
                <li><i className="fa-solid fa-check text-brand-orange mr-2"></i> 100% Indian localized server infrastructure</li>
                <li><i className="fa-solid fa-check text-brand-orange mr-2"></i> No third-party data broker pipelines</li>
                <li><i className="fa-solid fa-check text-brand-orange mr-2"></i> Military-grade network security safeguards</li>
              </ul>
            </div>
            
            {/* Right Column: High-quality visual loop animation */}
            <div className="flex-1 flex justify-center">
              <div className="relative w-80 h-80 rounded-full border border-brand-orange/20 flex items-center justify-center bg-brand-dark/40 shadow-inner select-none overflow-hidden">
                
                {/* Floating encrypted elements */}
                <div className="absolute inset-0 rounded-full bg-brand-orange/5 animate-pulse-slow"></div>
                <div className="absolute top-8 left-12 w-8 h-8 rounded-xl bg-brand-orange/15 border border-brand-orange/30 flex items-center justify-center text-brand-orange text-xs animate-float">
                  <i className="fa-solid fa-key"></i>
                </div>
                <div className="absolute bottom-10 right-12 w-9 h-9 rounded-xl bg-brand-purple/15 border border-brand-purple/30 flex items-center justify-center text-brand-purple text-xs animate-float" style={{ animationDelay: '2s' }}>
                  <i className="fa-solid fa-database"></i>
                </div>

                {/* Central Shield */}
                <div className="w-48 h-48 rounded-full border border-brand-pink/30 flex items-center justify-center bg-[#07050a] relative z-10 shadow-2xl">
                  <div className="absolute inset-2 rounded-full bg-gradient-to-br from-brand-orange/10 to-brand-purple/10 blur-sm"></div>
                  <div className="text-center relative z-10 space-y-2">
                    <span className="text-4xl text-brand-orange glow-orange block animate-pulse"><i className="fa-solid fa-shield-halved"></i></span>
                    <p className="font-outfit font-black text-white text-xs tracking-widest uppercase">Data Shield</p>
                    <p className="text-[7.5px] text-gray-500 font-bold uppercase">100% Local Encrypted</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
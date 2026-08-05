import React, { useState, useRef, useEffect } from 'react';
import { playClickSound, playDemoSound, playCustomStudioVoice } from '../utils/audio';

export default function FeatureShowcase({ onCTAClick, onBookCreator }) {
  // ==================== SIMULATOR CORE STATES (UNCHANGED) ====================
  const [activeTab, setActiveTab] = useState('home');
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);
  const [activeVoiceId, setActiveVoiceId] = useState(null);
  const [exploreSubTab, setExploreSubTab] = useState('posts');
  
  // Chats states
  const [activeChatId, setActiveChatId] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'them', text: 'Hey, welcome to Soosial!', time: 'Wednesday' },
    { id: 2, sender: 'me', text: 'Hey, checking out the platform.', time: 'Wednesday', status: 'read' },
  ]);
  const [typedMessage, setTypedMessage] = useState('');
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);

  // Profile states
  const [accountType, setAccountType] = useState('Professional');
  const [creatorPricingMode, setCreatorPricingMode] = useState('creator');
  const [showSettings, setShowSettings] = useState(false);
  const [phoneDarkMode, setPhoneDarkMode] = useState(true);

  // Soos/Reel states
  const [soosLiked, setSoosLiked] = useState(false);
  const [soosLikeCount, setSoosLikeCount] = useState(2);
  const [showSoosComments, setShowSoosComments] = useState(false);

  // Search input state
  const [searchQuery, setSearchQuery] = useState('');

  // Audio playing ref
  const audioTimeoutRef = useRef(null);

  // Carousel control states
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Play click sound on tab changes or interactions
  const triggerTabChange = (tab) => {
    setActiveTab(tab);
    setActiveChatId(null);
    setShowSettings(false);
    setShowSoosComments(false);
    playClickSound();
  };

  // Simulated sound playback for voice comments
  const handlePlayVoiceComment = (id, freq = 360, duration = 0.6) => {
    playClickSound();
    if (activeVoiceId === id && isVoicePlaying) {
      setIsVoicePlaying(false);
      setActiveVoiceId(null);
      if (audioTimeoutRef.current) clearTimeout(audioTimeoutRef.current);
      return;
    }
    
    setIsVoicePlaying(true);
    setActiveVoiceId(id);
    playDemoSound(freq, duration, 'triangle');
    
    if (audioTimeoutRef.current) clearTimeout(audioTimeoutRef.current);
    audioTimeoutRef.current = setTimeout(() => {
      setIsVoicePlaying(false);
      setActiveVoiceId(null);
    }, duration * 1000);
  };

  // Audio comments voice synthesis
  const handleSynthesizeAudio = () => {
    playClickSound();
    setIsVoicePlaying(true);
    setActiveVoiceId('synthesizer');
    playCustomStudioVoice();
    
    if (audioTimeoutRef.current) clearTimeout(audioTimeoutRef.current);
    audioTimeoutRef.current = setTimeout(() => {
      setIsVoicePlaying(false);
      setActiveVoiceId(null);
    }, 1200);
  };

  // Add message to chat list
  const handleSendMessage = () => {
    if (!typedMessage.trim()) return;
    playClickSound();
    const newMsg = {
      id: Date.now(),
      sender: 'me',
      text: typedMessage,
      time: 'Just now',
      status: 'sent'
    };
    setChatMessages([...chatMessages, newMsg]);
    setTypedMessage('');

    setTimeout(() => {
      setChatMessages(prev => 
        prev.map(m => m.id === newMsg.id ? { ...m, status: 'read' } : m)
      );
      playDemoSound(480, 0.1, 'sine');
    }, 1500);

    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        { id: Date.now() + 1, sender: 'them', text: 'This direct channel is encrypted end-to-end on Indian servers! 🇮🇳🛡️', time: 'Just now' }
      ]);
      playDemoSound(520, 0.25, 'triangle');
    }, 2500);
  };

  // Simulate record voice in Chat Room
  const handleRecordVoice = () => {
    if (isRecordingVoice) {
      setIsRecordingVoice(false);
      playClickSound();
      const newVoiceMsg = {
        id: Date.now(),
        sender: 'me',
        isVoice: true,
        duration: '0:05',
        time: 'Just now',
        status: 'sent'
      };
      setChatMessages([...chatMessages, newVoiceMsg]);
      playDemoSound(320, 0.5, 'triangle');
      
      setTimeout(() => {
        setChatMessages(prev => 
          prev.map(m => m.id === newVoiceMsg.id ? { ...m, status: 'read' } : m)
        );
      }, 1500);
    } else {
      playClickSound();
      setIsRecordingVoice(true);
      playDemoSound(200, 0.15, 'sawtooth');
    }
  };

  // Trigger Like action for Reels/Soos
  const handleLikeSoos = () => {
    playClickSound();
    if (soosLiked) {
      setSoosLiked(false);
      setSoosLikeCount(2);
    } else {
      setSoosLiked(true);
      setSoosLikeCount(3);
      playDemoSound(660, 0.15, 'sine');
    }
  };

  useEffect(() => {
    return () => {
      if (audioTimeoutRef.current) clearTimeout(audioTimeoutRef.current);
    };
  }, []);

  // Map active carousel slide to active simulator view tab
  useEffect(() => {
    const tabMap = ['home', 'chats', 'profile', 'soos'];
    if (tabMap[activeIndex]) {
      setActiveTab(tabMap[activeIndex]);
    }
  }, [activeIndex]);

  // Auto-advance loop for Carousel
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % defaultFeatures.length);
    }, 2200);

    return () => clearInterval(interval);
  }, [isHovered]);

  // ==================== FULL FEATURE CARDS LIST ====================
  const defaultFeatures = [
    {
      id: 'voice-post',
      badge: '1. Voice Post',
      icon: 'fa-solid fa-microphone-lines',
      title: 'Play Vocal Feed Posts',
      description: 'Simulate vocal posts inside the home feed natively with spatial acoustic tuning and instant studio synthesizer audio.',
      bullets: ['End-to-end local encryption', 'Native audio player waveforms', 'Studio vocal synthesis engine'],
      ctaText: 'Test Vocal Post',
      onAction: () => handlePlayVoiceComment('home-voice-post', 380, 1.2)
    },
    {
      id: 'chats',
      badge: '2. Private Chat Portal',
      icon: 'fa-solid fa-message',
      title: 'Encrypted Direct Messaging',
      description: 'Open direct messaging with integrated voice note options, real-time typing indicators, and local server encryption.',
      bullets: ['Encrypted on Indian servers', 'Instant voice note recording', 'Read receipt & delivery status'],
      ctaText: 'Open Chat Portal',
      onAction: () => triggerTabChange('chats')
    },
    {
      id: 'rates',
      badge: '3. Creator Rates',
      icon: 'fa-solid fa-sack-dollar',
      title: 'Day 1 Transparent Rate Cards',
      description: 'Inspect verified rate cards for videos, shoutouts, and stories with automated Day-1 escrow payment security.',
      bullets: ['Instant INR ₹ calculation', 'Zero rate-card leakage', 'Automated escrow protection'],
      ctaText: 'Book Creator Escrow',
      onAction: () => { triggerTabChange('profile'); setCreatorPricingMode('business'); }
    },
    {
      id: 'soos',
      badge: '4. Soos Stream',
      icon: 'fa-solid fa-circle-play',
      title: 'Interactive Short Reels',
      description: 'Watch short-form interactive video feeds with real-time audio reactions and interactive sponsorship deals.',
      bullets: ['High-FPS video playback', 'Interactive comment threads', 'Direct brand partnership links'],
      ctaText: 'Launch Soos Stream',
      onAction: () => triggerTabChange('soos')
    }
  ];

  return (
    <section className="relative w-full py-12 lg:py-16 bg-[#0a0812] text-white flex flex-col items-center justify-center min-h-[85vh] overflow-hidden select-none">
      
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full blur-[150px] opacity-20"
          style={{ background: 'var(--brand-pink, #ff2d55)' }}
        />
      </div>

      {/* Header Container */}
      <div className="relative z-20 w-full max-w-6xl px-6 mb-10 flex items-center justify-between">
        <div>
          <span className="text-xs uppercase tracking-widest font-bold text-pink-500">
            Interactive Product Showcase
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white mt-1">
            Experience Soosial
          </h2>
        </div>

        {/* Indicators */}
        <div className="flex items-center gap-2 bg-white/5 p-2 rounded-full border border-white/10 backdrop-blur-md">
          {defaultFeatures.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === i 
                  ? 'w-8 bg-pink-500' 
                  : 'w-2.5 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>

      {/* 🚀 STACK/CENTERED CAROUSEL VIEW */}
      <div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative z-10 w-full max-w-7xl h-[520px] flex items-center justify-center px-4"
      >
        {defaultFeatures.map((feature, idx) => {
          const total = defaultFeatures.length;
          let offset = (idx - activeIndex) % total;
          
          if (offset < -Math.floor(total / 2)) offset += total;
          if (offset > Math.floor(total / 2)) offset -= total;

          const isActive = offset === 0;

          let translateX = offset * 105;
          let scale = isActive ? 1 : 0.85;
          let opacity = isActive ? 1 : Math.abs(offset) === 1 ? 0.35 : 0;
          let blur = isActive ? 'blur(0px)' : 'blur(4px)';
          let zIndex = 20 - Math.abs(offset) * 5;

          return (
            <div
              key={feature.id || idx}
              onClick={() => setActiveIndex(idx)}
              className="absolute w-[85vw] sm:w-[70vw] lg:w-[58vw] max-w-[900px] h-[480px] rounded-[36px] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer"
              style={{
                transform: `translateX(${translateX}%) scale(${scale})`,
                opacity: opacity,
                filter: blur,
                zIndex: zIndex,
                pointerEvents: Math.abs(offset) > 1 ? 'none' : 'auto'
              }}
            >
              {/* Glass Card Body */}
              <div className="relative w-full h-full rounded-[36px] bg-[#120f1d]/90 border border-white/10 backdrop-blur-2xl overflow-hidden p-6 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                
                {/* Left Column Content */}
                <div className="w-full lg:w-[48%] flex flex-col justify-center items-start text-left space-y-4 z-20 shrink-0">
                  {feature.badge && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-pink-500 font-semibold text-xs tracking-wide uppercase">
                      {feature.icon && <i className={`${feature.icon} text-xs`} />}
                      <span>{feature.badge}</span>
                    </div>
                  )}

                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                    {feature.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed line-clamp-3 sm:line-clamp-none">
                    {feature.description}
                  </p>

                  {feature.bullets && (
                    <ul className="space-y-2 pt-1">
                      {feature.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-center gap-2.5 text-xs text-neutral-200 font-medium">
                          <span className="w-4 h-4 rounded-full bg-pink-500/20 text-pink-500 flex items-center justify-center shrink-0 text-[9px]">
                            <i className="fa-solid fa-check" />
                          </span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Studio Audio Synthesizer Trigger Module */}
                  <div className="bg-black/40 border border-white/5 p-3 rounded-2xl flex items-center justify-between gap-3 w-full mt-1">
                    <div className="space-y-0.5">
                      <p className="text-[10px] font-bold text-white flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse"></span> Audio Engine
                      </p>
                      <p className="text-[8px] text-gray-400">Test vocal response hum</p>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSynthesizeAudio();
                      }}
                      className="px-3 py-1.5 bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/30 text-white rounded-lg font-bold text-[9px] flex items-center gap-1.5 cursor-pointer shrink-0 transition-colors"
                    >
                      <i className="fa-solid fa-signal text-pink-500"></i> Synthesize Audio
                    </button>
                  </div>

                  {feature.ctaText && (
                    <div className="pt-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          feature.onAction();
                          onCTAClick && onCTAClick(feature);
                        }}
                        className="px-5 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs transition-all duration-300 hover:scale-105 cursor-pointer flex items-center gap-2 shadow-lg shadow-pink-600/30"
                      >
                        <span>{feature.ctaText}</span>
                        <i className="fa-solid fa-arrow-right text-[10px]" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Right Column Visual / Interactive Mobile Phone Mockup */}
                <div className="w-full lg:w-[50%] h-full flex items-center justify-center relative z-10">
                  
                  <div className="relative mockup-container w-[230px] sm:w-[250px] h-[390px] sm:h-[420px] bg-[#0c0a14] border-[6px] border-white/10 rounded-[40px] overflow-hidden shadow-2xl transition-all duration-300">
                    
                    {/* Status Bar / Notch */}
                    <div className="absolute top-0 left-0 w-full h-7 bg-transparent z-40 px-5 flex justify-between items-center text-[9px] font-sans font-bold text-gray-400 pointer-events-none">
                      <span>1:43</span>
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-4 bg-[#000] rounded-b-xl z-45 flex items-center justify-center">
                        <div className="w-8 h-1 bg-white/10 rounded-full"></div>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-[6px]">5G+</span>
                        <i className="fa-solid fa-signal text-[7px]"></i>
                        <i className="fa-solid fa-battery-three-quarters text-[7px]"></i>
                      </div>
                    </div>

                    {/* Dynamic App Content Screen */}
                    <div className={`w-full h-full relative pt-7 pb-10 flex flex-col justify-between transition-colors duration-300 ${
                      phoneDarkMode ? 'bg-[#06040a] text-white' : 'bg-gray-100 text-gray-900'
                    }`}>

                      {/* --- SCREEN 1: HOME FEED --- */}
                      {activeTab === 'home' && (
                        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-3 no-scrollbar text-left animate-fade-in">
                          <div className="flex items-center justify-between text-white shrink-0 gap-1">
                            <span 
                              onClick={() => triggerTabChange('home')}
                              className="font-serif italic font-black text-[11px] tracking-tight text-white cursor-pointer shrink-0"
                            >
                              Soosial.
                            </span>

                            <div 
                              onClick={() => triggerTabChange('explore')}
                              className="flex-1 max-w-[100px] flex items-center justify-between pl-2 pr-0.5 py-0.5 bg-white/5 border border-white/10 rounded-full text-[7.5px] text-gray-400 cursor-pointer hover:bg-white/10 transition-colors shrink-0"
                            >
                              <span>Search...</span>
                              <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center shrink-0">
                                <i className="fa-solid fa-magnifying-glass text-black text-[6px]"></i>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2 overflow-x-auto no-scrollbar shrink-0 pt-0.5">
                            <div className="flex flex-col items-center gap-1 shrink-0">
                              <div className="w-8 h-8 rounded-full border border-dashed border-gray-600 flex items-center justify-center text-gray-400">
                                <i className="fa-solid fa-plus text-[8px]"></i>
                              </div>
                              <span className="text-[6.5px] text-gray-500 font-bold">Add</span>
                            </div>
                            
                            {['SG', 'SK', 'NT'].map((tag, i) => (
                              <div key={i} className="flex flex-col items-center gap-1 shrink-0">
                                <div className="w-8 h-8 rounded-full p-0.5 bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                                  <div className="w-full h-full rounded-full bg-[#1c1a24] flex items-center justify-center text-[7.5px] font-bold">{tag}</div>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="bg-[#0b0914] border border-white/5 rounded-2xl p-2.5 space-y-2.5 shadow-xl relative">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1.5">
                                <div className="w-6 h-6 rounded-full p-0.5 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                  <div className="w-full h-full rounded-full bg-[#0d0a15] flex items-center justify-center text-[8px] font-bold text-white">U1</div>
                                </div>
                                <div>
                                  <p className="font-bold text-[9px]">user_name_1</p>
                                  <p className="text-[7px] text-gray-500 font-light">3h ago</p>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-1 bg-pink-500/15 text-pink-500 border border-pink-500/20 px-1.5 py-0.5 rounded-full text-[6.5px] font-bold uppercase">
                                Voice Post
                              </div>
                            </div>

                            <p className="text-[8.5px] leading-relaxed text-gray-300 font-light">
                              Experience zero leaks on Soosial. We secure creator rate cards, private escrow deals natively! 🇮🇳🛡️
                            </p>

                            <div className="bg-[#08060d] border border-white/5 p-2 rounded-xl space-y-1.5">
                              <div className="flex justify-between items-center text-[7.5px] font-bold">
                                <span className="text-gray-400">Campaign Brief.wav</span>
                                <span className="text-gray-500 font-mono">0:05</span>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <button 
                                  onClick={() => handlePlayVoiceComment('home-voice-post', 380, 1.2)}
                                  className="w-6 h-6 rounded-full bg-pink-500 hover:bg-pink-600 flex items-center justify-center text-white text-[8px] cursor-pointer shrink-0"
                                >
                                  <i className={`fa-solid ${isVoicePlaying && activeVoiceId === 'home-voice-post' ? 'fa-pause' : 'fa-play'}`}></i>
                                </button>
                                
                                <div className="flex-1 flex items-end gap-1 h-3 pb-0.5">
                                  {[1.5, 3.5, 2, 4, 1.5, 3, 2.5, 1.5, 3.5, 2].map((h, i) => (
                                    <div 
                                      key={i} 
                                      className="w-0.5 bg-pink-500 rounded-full origin-bottom"
                                      style={{ 
                                        height: `${h * 25}%`,
                                        animation: isVoicePlaying && activeVoiceId === 'home-voice-post' ? `waveform 0.8s ease-in-out infinite` : 'none',
                                        animationDelay: `${i * 0.08}s`
                                      }}
                                    ></div>
                                  ))}
                                </div>
                              </div>
                            </div>

                          </div>
                        </div>
                      )}

                      {/* --- SCREEN 2: EXPLORE SEARCH --- */}
                      {activeTab === 'explore' && (
                        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-3 no-scrollbar text-left animate-fade-in">
                          <div className="space-y-2">
                            <h3 className="text-[10px] font-black uppercase tracking-wider text-gray-400">Explore</h3>
                            
                            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-[9px] bg-[#0b0914] border-white/10">
                              <i className="fa-solid fa-magnifying-glass text-gray-400 text-[8px]"></i>
                              <input 
                                type="text" 
                                placeholder="Search niche..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-transparent border-none text-[8.5px] outline-none text-white font-light"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-1.5 pt-1 text-left">
                              <div className="bg-[#0b0914] rounded-xl border border-white/5 p-2 space-y-1">
                                <div className="h-12 bg-gradient-to-br from-orange-500/30 to-pink-500/30 rounded-lg flex items-center justify-center"><i className="fa-solid fa-paint-brush text-white/50 text-[10px]"></i></div>
                                <span className="text-[7.5px] font-bold block text-white truncate">Art Sketches</span>
                              </div>
                              <div className="bg-[#0b0914] rounded-xl border border-white/5 p-2 space-y-1">
                                <div className="h-12 bg-gradient-to-br from-pink-500/30 to-purple-500/30 rounded-lg flex items-center justify-center"><i className="fa-solid fa-camera-retro text-white/50 text-[10px]"></i></div>
                                <span className="text-[7.5px] font-bold block text-white truncate">Photography</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* --- SCREEN 3: PRIVATE CHATS --- */}
                      {activeTab === 'chats' && (
                        <div className="flex-1 overflow-y-auto px-2.5 py-2 flex flex-col justify-between animate-fade-in text-left">
                          <div className="space-y-2">
                            <div className="flex justify-between items-center border-b border-white/10 pb-1.5">
                              <div className="flex items-center gap-1.5">
                                <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-[8px] font-bold">OX</div>
                                <div>
                                  <p className="text-[9px] font-bold">Omnexia Official</p>
                                  <span className="text-[6.5px] text-emerald-400 font-mono">Encrypted • Active</span>
                                </div>
                              </div>
                              <i className="fa-solid fa-shield-halved text-emerald-400 text-[9px]"></i>
                            </div>

                            <div className="space-y-1.5 max-h-[190px] overflow-y-auto pr-1">
                              {chatMessages.map((msg) => (
                                <div key={msg.id} className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}>
                                  <div className={`max-w-[85%] p-1.5 rounded-xl text-[8.5px] ${
                                    msg.sender === 'me' ? 'bg-pink-600 text-white' : 'bg-white/10 text-gray-200'
                                  }`}>
                                    {msg.isVoice ? `🎙️ Voice Note (${msg.duration})` : msg.text}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center gap-1 pt-1.5 border-t border-white/10">
                            <input 
                              type="text"
                              placeholder="Message..."
                              value={typedMessage}
                              onChange={(e) => setTypedMessage(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-[8px] text-white outline-none"
                            />
                            <button onClick={handleRecordVoice} className={`p-1.5 rounded-lg text-[9px] ${isRecordingVoice ? 'bg-red-500 text-white' : 'bg-white/10 text-gray-300'}`}>
                              <i className="fa-solid fa-microphone"></i>
                            </button>
                            <button onClick={handleSendMessage} className="p-1.5 bg-pink-600 text-white rounded-lg text-[9px]">
                              <i className="fa-solid fa-paper-plane"></i>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* --- SCREEN 4: PROFILE & RATES --- */}
                      {activeTab === 'profile' && (
                        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2.5 animate-fade-in text-left">
                          <div className="flex items-center gap-2">
                            <div className="w-9 h-9 rounded-full p-0.5 bg-gradient-to-br from-orange-500 to-pink-500">
                              <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-[9px] font-bold text-white">GK</div>
                            </div>
                            <div>
                              <h4 className="text-[10px] font-bold text-white">Ganesh KGP</h4>
                              <p className="text-[7.5px] text-gray-400">@ganeshkgp • Tech</p>
                            </div>
                          </div>

                          <div className="bg-[#0b0914] border border-white/10 p-2.5 rounded-xl space-y-1.5">
                            <div className="flex justify-between items-center text-[8px]">
                              <span className="font-bold text-gray-300">Rate Card</span>
                              <span className="text-emerald-400 font-mono text-[7px]">Day 1 Escrow</span>
                            </div>
                            
                            <div className="space-y-1 pt-0.5">
                              <div className="flex justify-between items-center bg-white/5 p-1.5 rounded-lg text-[7.5px]">
                                <span className="text-gray-300">1x Dedicated Soos</span>
                                <span className="font-bold text-orange-400">₹ 15,000</span>
                              </div>
                              <div className="flex justify-between items-center bg-white/5 p-1.5 rounded-lg text-[7.5px]">
                                <span className="text-gray-300">1x Audio Shoutout</span>
                                <span className="font-bold text-orange-400">₹ 5,000</span>
                              </div>
                            </div>

                            <button 
                              onClick={onBookCreator}
                              className="w-full py-1.5 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold rounded-lg text-[8px] cursor-pointer mt-1"
                            >
                              Book Creator Direct
                            </button>
                          </div>
                        </div>
                      )}

                      {/* --- SCREEN 5: SOOS STREAM --- */}
                      {activeTab === 'soos' && (
                        <div className="flex-1 relative bg-gradient-to-b from-purple-900/40 to-black rounded-xl overflow-hidden p-2.5 flex flex-col justify-between animate-fade-in text-left">
                          <div className="flex justify-between items-center text-[8.5px] font-bold text-white z-10">
                            <span className="text-pink-500 uppercase tracking-widest">Soos Reel</span>
                            <span className="bg-red-600 px-1.5 py-0.5 rounded-full text-[6px] font-mono">LIVE</span>
                          </div>

                          <div className="absolute inset-0 flex items-center justify-center opacity-10">
                            <i className="fa-solid fa-circle-play text-6xl text-white"></i>
                          </div>

                          <div className="z-10 space-y-1">
                            <div className="flex items-end justify-between">
                              <div className="space-y-0.5 max-w-[70%]">
                                <p className="text-[9px] font-bold text-white">@ganeshkgp</p>
                                <p className="text-[7.5px] text-gray-300 leading-tight">Testing creator rate card module inside Soosial! 🚀</p>
                              </div>

                              <div className="flex flex-col items-center gap-2">
                                <button onClick={handleLikeSoos} className="flex flex-col items-center">
                                  <i className={`fa-solid fa-heart text-xs ${soosLiked ? 'text-pink-500' : 'text-white'}`}></i>
                                  <span className="text-[7px] text-gray-300">{soosLikeCount}k</span>
                                </button>
                                <button onClick={() => setShowSoosComments(!showSoosComments)} className="flex flex-col items-center">
                                  <i className="fa-solid fa-comment text-xs text-white"></i>
                                  <span className="text-[7px] text-gray-300">128</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Bottom Navigation */}
                      <div className="absolute bottom-0 left-0 w-full h-9 bg-[#0c0a14] border-t border-white/10 px-3 flex justify-between items-center text-gray-500 z-30">
                        <button onClick={() => triggerTabChange('home')} className={`text-[9px] ${activeTab === 'home' ? 'text-pink-500' : ''}`}><i className="fa-solid fa-house"></i></button>
                        <button onClick={() => triggerTabChange('explore')} className={`text-[9px] ${activeTab === 'explore' ? 'text-pink-500' : ''}`}><i className="fa-solid fa-compass"></i></button>
                        <button onClick={() => triggerTabChange('chats')} className={`text-[9px] ${activeTab === 'chats' ? 'text-purple-400' : ''}`}><i className="fa-solid fa-message"></i></button>
                        <button onClick={() => triggerTabChange('soos')} className={`text-[9px] ${activeTab === 'soos' ? 'text-white' : ''}`}><i className="fa-solid fa-circle-play"></i></button>
                        <button onClick={() => triggerTabChange('profile')} className={`text-[9px] ${activeTab === 'profile' ? 'text-orange-400' : ''}`}><i className="fa-solid fa-user"></i></button>
                      </div>

                    </div>
                  </div>

                </div>

              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
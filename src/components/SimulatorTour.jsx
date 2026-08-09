import React, { useState, useRef, useEffect, useCallback } from 'react';
import { playClickSound, playDemoSound, playCustomStudioVoice } from '../utils/audio';

/* ─────────────────────────────────────────
   Per-slide ambient colour palette
───────────────────────────────────────── */
const SLIDE_PALETTES = [
  { glow: '#ff2d55', accent: '#ff2d55', accentLight: '#ff6080' }, // Voice – pink
  { glow: '#7c3aed', accent: '#a855f7', accentLight: '#c084fc' }, // Chat – purple
  { glow: '#f97316', accent: '#f97316', accentLight: '#fb923c' }, // Rates – orange
  { glow: '#06b6d4', accent: '#22d3ee', accentLight: '#67e8f9' }, // Soos – cyan
];

/* Master Animation System Constants */
const TRANSITION_DURATION = 800; // ms (0.8s)
const PAUSE_DURATION = 3000;      // ms (3.0s pause)
const EASING_CURVE = 'cubic-bezier(0.25, 1, 0.35, 1)';

export default function FeatureShowcase({ onCTAClick, onBookCreator }) {
  /* ── SIMULATOR CORE STATES ── */
  const [activeTab, setActiveTab] = useState('home');
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);
  const [activeVoiceId, setActiveVoiceId] = useState(null);
  const [activeChatId, setActiveChatId] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'them', text: 'Hey, welcome to Soosial!', time: 'Wednesday' },
    { id: 2, sender: 'me', text: 'Hey, checking out the platform.', time: 'Wednesday', status: 'read' },
  ]);
  const [typedMessage, setTypedMessage] = useState('');
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [accountType, setAccountType] = useState('Professional');
  const [creatorPricingMode, setCreatorPricingMode] = useState('creator');
  const [showSettings, setShowSettings] = useState(false);
  const [phoneDarkMode, setPhoneDarkMode] = useState(true);
  const [soosLiked, setSoosLiked] = useState(false);
  const [soosLikeCount, setSoosLikeCount] = useState(2);
  const [showSoosComments, setShowSoosComments] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const audioTimeoutRef = useRef(null);

  /* ── CAROUSEL STATES & TIMING ── */
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragDelta, setDragDelta] = useState(0);
  const [screenKey, setScreenKey] = useState(0); // forces remount on tab switch → animation
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const autoPlayRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /* ── HELPERS ── */
  const triggerTabChange = (tab) => {
    setActiveTab(tab);
    setActiveChatId(null);
    setShowSettings(false);
    setShowSoosComments(false);
    setScreenKey(k => k + 1);
    playClickSound();
  };

  const handlePlayVoiceComment = (id, freq = 360, duration = 0.6) => {
    playClickSound();
    if (activeVoiceId === id && isVoicePlaying) {
      setIsVoicePlaying(false); setActiveVoiceId(null);
      if (audioTimeoutRef.current) clearTimeout(audioTimeoutRef.current);
      return;
    }
    setIsVoicePlaying(true); setActiveVoiceId(id);
    playDemoSound(freq, duration, 'triangle');
    if (audioTimeoutRef.current) clearTimeout(audioTimeoutRef.current);
    audioTimeoutRef.current = setTimeout(() => {
      setIsVoicePlaying(false); setActiveVoiceId(null);
    }, duration * 1000);
  };

  const handleSynthesizeAudio = () => {
    playClickSound();
    setIsVoicePlaying(true); setActiveVoiceId('synthesizer');
    playCustomStudioVoice();
    if (audioTimeoutRef.current) clearTimeout(audioTimeoutRef.current);
    audioTimeoutRef.current = setTimeout(() => {
      setIsVoicePlaying(false); setActiveVoiceId(null);
    }, 1200);
  };

  const handleSendMessage = () => {
    if (!typedMessage.trim()) return;
    playClickSound();
    const newMsg = { id: Date.now(), sender: 'me', text: typedMessage, time: 'Just now', status: 'sent' };
    setChatMessages(prev => [...prev, newMsg]);
    setTypedMessage('');
    setTimeout(() => {
      setChatMessages(prev => prev.map(m => m.id === newMsg.id ? { ...m, status: 'read' } : m));
      playDemoSound(480, 0.1, 'sine');
    }, 1500);
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        id: Date.now() + 1, sender: 'them',
        text: 'This direct channel is encrypted end-to-end on Indian servers! 🇮🇳🛡️', time: 'Just now'
      }]);
      playDemoSound(520, 0.25, 'triangle');
    }, 2500);
  };

  const handleRecordVoice = () => {
    if (isRecordingVoice) {
      setIsRecordingVoice(false); playClickSound();
      const newVoiceMsg = { id: Date.now(), sender: 'me', isVoice: true, duration: '0:05', time: 'Just now', status: 'sent' };
      setChatMessages(prev => [...prev, newVoiceMsg]);
      playDemoSound(320, 0.5, 'triangle');
      setTimeout(() => setChatMessages(prev => prev.map(m => m.id === newVoiceMsg.id ? { ...m, status: 'read' } : m)), 1500);
    } else {
      playClickSound(); setIsRecordingVoice(true);
      playDemoSound(200, 0.15, 'sawtooth');
    }
  };

  const handleLikeSoos = () => {
    playClickSound();
    if (soosLiked) { setSoosLiked(false); setSoosLikeCount(2); }
    else { setSoosLiked(true); setSoosLikeCount(3); playDemoSound(660, 0.15, 'sine'); }
  };

  /* ── FEATURE CARDS DATA ── */
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
      title: 'Day 1 Creator Rates',
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

  const total = defaultFeatures.length;

  /* ── SLIDE CHANGE & TIMER SYNCHRONIZATION ── */
  const goToSlide = useCallback((targetIndex) => {
    const clamped = ((targetIndex % total) + total) % total;
    setActiveIndex(current => {
      if (current !== clamped) {
        setPrevIndex(current);
      }
      return clamped;
    });
    const tabMap = ['home', 'chats', 'profile', 'soos'];
    if (tabMap[clamped]) {
      setActiveTab(tabMap[clamped]);
      setScreenKey(k => k + 1);
    }
  }, [total]);

  /* ── SCROLL INTERSECTION OBSERVER ── */
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.05, rootMargin: '0px 0px -50px 0px' }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    const t = setTimeout(() => setIsVisible(true), 800);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); clearTimeout(t); };
  }, []);

  /* ── SYNCHRONIZED AUTO-PLAY TIMER ── */
  const resetAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      goToSlide(activeIndex + 1);
    }, PAUSE_DURATION + TRANSITION_DURATION);
  }, [goToSlide, activeIndex]);

  useEffect(() => {
    if (!isHovered && !isDragging) {
      resetAutoPlay();
    } else if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isHovered, isDragging, activeIndex, resetAutoPlay]);

  useEffect(() => () => { if (audioTimeoutRef.current) clearTimeout(audioTimeoutRef.current); }, []);

  /* ── DRAG / SWIPE ── */
  const onPointerDown = (e) => {
    setIsDragging(true);
    setDragStart(e.clientX ?? e.touches?.[0]?.clientX ?? 0);
    setDragDelta(0);
  };
  const onPointerMove = (e) => {
    if (!isDragging) return;
    const x = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    setDragDelta(x - dragStart);
  };
  const onPointerUp = () => {
    if (isDragging) {
      if (dragDelta < -50) goToSlide(activeIndex + 1);
      else if (dragDelta > 50) goToSlide(activeIndex - 1);
      setIsDragging(false);
      setDragDelta(0);
    }
  };

  const palette = SLIDE_PALETTES[activeIndex];

  /* Responsive offset step calculator */
  const getOffsetPx = (offset) => {
    if (windowWidth < 640) return offset * (windowWidth * 0.84);
    if (windowWidth < 1024) return offset * 360;
    return offset * 460;
  };

  /* ──────────────────────────────────────────────────────────
     RENDER
  ────────────────────────────────────────────────────────── */
  return (
    <section
      ref={sectionRef}
      className="relative w-full py-12 lg:py-16 bg-[#0a0812] text-white flex flex-col items-center justify-center min-h-[85vh] overflow-hidden select-none"
      style={{ '--slide-glow': palette.glow, '--slide-accent': palette.accent }}
    >

      {/* ── Background ambient glow (animates smoothly between slides) ── */}
      <div className="absolute inset-0 pointer-events-none z-0 transition-all duration-800">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-[160px] opacity-[0.18]"
          style={{ background: `radial-gradient(circle, ${palette.glow} 0%, transparent 70%)`, transition: `background ${TRANSITION_DURATION}ms ease` }}
        />
        {/* subtle grid dots */}
        <div className="absolute inset-0 dashboard-grid opacity-30" />
      </div>

      {/* ── Header ── */}
      <div className="relative z-20 w-full max-w-6xl px-6 mb-10 flex items-center justify-between">
        <div>
          <span className="text-xs uppercase tracking-widest font-bold" style={{ color: palette.accent, transition: `color ${TRANSITION_DURATION}ms ease` }}>
            Interactive Product Showcase
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white mt-1">
            Experience Soosial
          </h2>
        </div>

        {/* Pill indicators */}
        <div className="flex items-center gap-2 bg-white/5 p-2 rounded-full border border-white/10 backdrop-blur-md">
          {defaultFeatures.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              style={{
                background: activeIndex === i ? palette.accent : undefined,
                transition: `width ${TRANSITION_DURATION}ms ${EASING_CURVE}, background ${TRANSITION_DURATION}ms ease`
              }}
              className={`h-2.5 rounded-full cursor-pointer ${activeIndex === i ? 'w-8' : 'w-2.5 bg-white/30 hover:bg-white/60'
                }`}
            />
          ))}
        </div>
      </div>

      {/* ── CAROUSEL ── */}
      <div
        className="relative z-10 w-full max-w-7xl flex items-center justify-center px-2 sm:px-4 h-[620px] sm:h-[650px] lg:h-[520px]"
        style={{ perspective: '1200px' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setIsHovered(false); setIsDragging(false); setDragDelta(0); }}
        onMouseDown={onPointerDown}
        onMouseMove={onPointerMove}
        onMouseUp={onPointerUp}
        onTouchStart={onPointerDown}
        onTouchMove={onPointerMove}
        onTouchEnd={onPointerUp}
      >
        {defaultFeatures.map((feature, idx) => {
          let rawDiff = idx - activeIndex;
          let offset = ((rawDiff % total) + total) % total;
          if (offset > total / 2) offset -= total;

          // Smooth wrap-around exit math when looping forward/backward
          if (offset === 2) {
            const exitLeftIndex = (prevIndex - 1 + total) % total;
            if (idx === exitLeftIndex) {
              offset = -2;
            }
          }

          const isActive   = offset === 0;
          const isAdjacent = Math.abs(offset) === 1;

          const dragInfluence = isDragging ? dragDelta * 0.35 : 0;
          const baseX  = getOffsetPx(offset);
          const tx     = baseX + dragInfluence;

          const scale   = isActive ? 1 : isAdjacent ? 0.86 : 0.72;
          const opacity = isActive ? 1 : isAdjacent ? 0.25 : 0;
          const rotateY = isActive ? 0 : offset > 0 ? -6 : 6;
          const blur    = isActive ? 0 : isAdjacent ? 3 : 12;
          const zIdx    = isActive ? 30 : isAdjacent ? 15 : 5;

          const transitionStyle = isDragging
            ? 'opacity 0.15s ease, filter 0.15s ease'
            : Math.abs(offset) >= 2
            ? 'none' // silent teleportation when offstage
            : `transform ${TRANSITION_DURATION}ms ${EASING_CURVE}, opacity ${TRANSITION_DURATION}ms ${EASING_CURVE}, filter ${TRANSITION_DURATION}ms ${EASING_CURVE}`;

          return (
            <div
              key={feature.id}
              onClick={() => !isDragging && goToSlide(idx)}
              className="absolute w-[92vw] sm:w-[80vw] lg:w-[58vw] max-w-[900px] h-[580px] sm:h-[610px] lg:h-[480px] rounded-[24px] sm:rounded-[36px] cursor-pointer"
              style={{
                transform: `translate3d(${tx}px, 0, 0) scale3d(${scale}, ${scale}, 1) rotateY(${rotateY}deg)`,
                opacity,
                filter: blur > 0 ? `blur(${blur}px)` : 'none',
                zIndex: zIdx,
                transition: transitionStyle,
                pointerEvents: Math.abs(offset) > 1 ? 'none' : 'auto',
                willChange: 'transform, opacity',
              }}
            >
              {/* ── Glass Card ── */}
              <div
                className="relative w-full h-full rounded-[24px] sm:rounded-[36px] border border-white/10 backdrop-blur-2xl overflow-y-auto lg:overflow-hidden p-4 sm:p-6 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-6 no-scrollbar"
                style={{
                  background: isActive
                    ? `linear-gradient(135deg, #120f1d 0%, #0e0a1c 60%, ${palette.glow}18 100%)`
                    : '#110e1c',
                  boxShadow: isActive
                    ? `0 30px 70px rgba(0,0,0,0.85), 0 0 60px ${palette.glow}30, inset 0 1px 0 rgba(255,255,255,0.06)`
                    : '0 20px 40px rgba(0,0,0,0.6)',
                  transition: `background ${TRANSITION_DURATION}ms ease, box-shadow ${TRANSITION_DURATION}ms ease, border-color ${TRANSITION_DURATION}ms ease`,
                  borderColor: isActive ? `${palette.glow}40` : 'rgba(255,255,255,0.07)',
                }}
              >
                {/* Accent top glow bar */}
                {isActive && (
                  <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px"
                    style={{ background: `linear-gradient(90deg, transparent, ${palette.accent}80, transparent)` }}
                  />
                )}

                {/* ── LEFT COLUMN ── */}
                <div
                  className="w-full lg:w-[48%] flex flex-col justify-center items-start text-left space-y-2 sm:space-y-4 z-20 shrink-0"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'translate3d(0, 0, 0)' : 'translate3d(0, 12px, 0)',
                    transition: `opacity 600ms ${EASING_CURVE} 100ms, transform 600ms ${EASING_CURVE} 100ms`,
                  }}
                >
                  {/* Badge */}
                  {feature.badge && (
                    <div
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full border font-semibold text-xs tracking-wide uppercase"
                      style={{ background: `${palette.accent}15`, borderColor: `${palette.accent}40`, color: palette.accent }}
                    >
                      {feature.icon && <i className={`${feature.icon} text-xs`} />}
                      <span>{feature.badge}</span>
                    </div>
                  )}

                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white leading-tight">
                    {feature.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed line-clamp-2 sm:line-clamp-none">
                    {feature.description}
                  </p>

                  {/* Bullets */}
                  {feature.bullets && (
                    <ul className="space-y-1.5 sm:space-y-2 pt-0.5 sm:pt-1">
                      {feature.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-center gap-2.5 text-xs text-neutral-200 font-medium"
                          style={{
                            opacity: isActive ? 1 : 0,
                            transform: isActive ? 'translate3d(0, 0, 0)' : 'translate3d(-8px, 0, 0)',
                            transition: `opacity 500ms ease ${120 + bIdx * 60}ms, transform 500ms ${EASING_CURVE} ${120 + bIdx * 60}ms`,
                          }}
                        >
                          <span
                            className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-[9px]"
                            style={{ background: `${palette.accent}25`, color: palette.accent }}
                          >
                            <i className="fa-solid fa-check" />
                          </span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Audio Engine strip */}
                  <div className="bg-black/40 border border-white/5 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl flex items-center justify-between gap-2 sm:gap-3 w-full mt-1">
                    <div className="space-y-0.5">
                      <p className="text-[10px] font-bold text-white flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: palette.accent }} />
                        Audio Engine
                      </p>
                      <p className="text-[8px] text-gray-400">Test vocal response hum</p>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleSynthesizeAudio(); }}
                      className="px-3 py-1.5 border text-white rounded-lg font-bold text-[9px] flex items-center gap-1.5 cursor-pointer shrink-0 transition-all duration-200 hover:scale-105"
                      style={{ background: `${palette.accent}25`, borderColor: `${palette.accent}50`, color: palette.accentLight }}
                    >
                      <i className="fa-solid fa-signal" /> Synthesize Audio
                    </button>
                  </div>

                  {/* CTA */}
                  {feature.ctaText && (
                    <div className="pt-1">
                      <button
                        onClick={(e) => { e.stopPropagation(); feature.onAction(); onCTAClick && onCTAClick(feature); }}
                        className="px-5 py-2.5 rounded-xl text-white font-bold text-xs transition-all duration-300 hover:scale-105 cursor-pointer flex items-center gap-2 shadow-lg"
                        style={{
                          background: `linear-gradient(135deg, ${palette.glow}, ${palette.accentLight})`,
                          boxShadow: `0 8px 24px ${palette.glow}45`,
                        }}
                      >
                        <span>{feature.ctaText}</span>
                        <i className="fa-solid fa-arrow-right text-[10px]" />
                      </button>
                    </div>
                  )}
                </div>

                {/* ── RIGHT COLUMN: Phone mockup ── */}
                <div className="w-full lg:w-[50%] h-auto lg:h-full flex items-center justify-center relative z-10 shrink-0 py-1 lg:py-0">
                  <div className="transform scale-[0.72] sm:scale-90 lg:scale-100 origin-center transition-transform duration-300 my-[-45px] sm:my-[-15px] lg:my-0">
                    <PhoneMockup
                      activeTab={activeTab}
                      isActive={isActive}
                      palette={palette}
                      phoneDarkMode={phoneDarkMode}
                      screenKey={screenKey}
                      isVoicePlaying={isVoicePlaying}
                      activeVoiceId={activeVoiceId}
                      chatMessages={chatMessages}
                      typedMessage={typedMessage}
                      setTypedMessage={setTypedMessage}
                      isRecordingVoice={isRecordingVoice}
                      soosLiked={soosLiked}
                      soosLikeCount={soosLikeCount}
                      showSoosComments={showSoosComments}
                      searchQuery={searchQuery}
                      setSearchQuery={setSearchQuery}
                      triggerTabChange={triggerTabChange}
                      handlePlayVoiceComment={handlePlayVoiceComment}
                      handleSendMessage={handleSendMessage}
                      handleRecordVoice={handleRecordVoice}
                      handleLikeSoos={handleLikeSoos}
                      setShowSoosComments={setShowSoosComments}
                      onBookCreator={onBookCreator}
                    />
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* ── Nav arrows ── */}
      <div className="relative z-20 flex items-center gap-4 mt-8">
        <button
          onClick={() => goToSlide(activeIndex - 1)}
          className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all duration-200 hover:scale-110 cursor-pointer"
        >
          <i className="fa-solid fa-chevron-left text-xs" />
        </button>

        {/* Step counter */}
        <span className="text-xs font-mono text-gray-500">
          <span className="text-white font-bold">{String(activeIndex + 1).padStart(2, '0')}</span>
          {' / '}
          {String(total).padStart(2, '0')}
        </span>

        <button
          onClick={() => goToSlide(activeIndex + 1)}
          className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all duration-200 hover:scale-110 cursor-pointer"
        >
          <i className="fa-solid fa-chevron-right text-xs" />
        </button>
      </div>

      {/* ── Inline keyframes for waveform & screen fade ── */}
      <style>{`
        @keyframes waveform {
          0%, 100% { transform: scaleY(0.2); }
          50%       { transform: scaleY(1);   }
        }
        @keyframes screenFadeIn {
          from { opacity: 0; transform: translateY(6px) scale(0.99); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
        @keyframes heartPop {
          0%   { transform: scale(1); }
          40%  { transform: scale(1.45); }
          70%  { transform: scale(0.88); }
          100% { transform: scale(1); }
        }
        .screen-anim { animation: screenFadeIn 0.32s cubic-bezier(0.22,1,0.36,1) both; }
        .heart-pop   { animation: heartPop 0.38s ease both; }
        @media (prefers-reduced-motion: reduce) {
          *, ::before, ::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   PhoneMockup – extracted for clarity, receives all needed props
───────────────────────────────────────────────────────────────── */
function PhoneMockup({
  activeTab, isActive, palette, phoneDarkMode, screenKey,
  isVoicePlaying, activeVoiceId, chatMessages, typedMessage, setTypedMessage,
  isRecordingVoice, soosLiked, soosLikeCount, showSoosComments, searchQuery, setSearchQuery,
  triggerTabChange, handlePlayVoiceComment, handleSendMessage, handleRecordVoice,
  handleLikeSoos, setShowSoosComments, onBookCreator,
}) {
  return (
    <div
      className="relative mockup-container"
      style={{
        width: '240px', height: '430px',
        background: '#0c0a14',
        border: `6px solid rgba(255,255,255,0.08)`,
        borderRadius: '40px',
        overflow: 'hidden',
        boxShadow: isActive
          ? `0 40px 80px rgba(0,0,0,0.9), 0 0 60px ${palette.glow}45, 0 0 0 1px ${palette.glow}20`
          : '0 20px 40px rgba(0,0,0,0.5)',
        transform: isActive ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)',
        transition: `box-shadow ${TRANSITION_DURATION}ms ease, transform ${TRANSITION_DURATION}ms ${EASING_CURVE}`,
      }}
    >
      {/* Status bar */}
      <div className="absolute top-0 left-0 w-full h-7 z-40 px-5 flex justify-between items-center pointer-events-none"
        style={{ fontSize: '9px', fontWeight: 700, color: 'rgba(255,255,255,0.45)' }}
      >
        <span>9:41</span>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-b-xl z-45 flex items-center justify-center">
          <div className="w-8 h-1 bg-white/10 rounded-full" />
        </div>
        <div className="flex items-center gap-1">
          <span style={{ fontSize: '6px' }}>5G+</span>
          <i className="fa-solid fa-signal" style={{ fontSize: '7px' }} />
          <i className="fa-solid fa-battery-three-quarters" style={{ fontSize: '7px' }} />
        </div>
      </div>

      {/* Screen area */}
      <div
        className={`w-full h-full relative pt-7 pb-10 flex flex-col justify-between transition-colors duration-300 ${phoneDarkMode ? 'bg-[#06040a] text-white' : 'bg-gray-100 text-gray-900'}`}
      >
        {/* Screen content with re-mount key for enter animation */}
        <div key={screenKey} className="flex-1 overflow-hidden flex flex-col screen-anim">

          {/* HOME */}
          {activeTab === 'home' && (
            <div className="flex-1 overflow-y-auto px-3 py-2 space-y-3 no-scrollbar text-left">
              <div className="flex items-center justify-between text-white shrink-0 gap-1">
                <span onClick={() => triggerTabChange('home')} className="font-serif italic font-black text-[11px] tracking-tight text-white cursor-pointer shrink-0">
                  Soosial.
                </span>
                <div onClick={() => triggerTabChange('explore')} className="flex-1 max-w-[100px] flex items-center justify-between pl-2 pr-0.5 py-0.5 bg-white/5 border border-white/10 rounded-full text-[7.5px] text-gray-400 cursor-pointer hover:bg-white/10 transition-colors shrink-0">
                  <span>Search...</span>
                  <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center shrink-0">
                    <i className="fa-solid fa-magnifying-glass text-black text-[6px]" />
                  </div>
                </div>
              </div>

              <div className="flex gap-2 overflow-x-auto no-scrollbar shrink-0 pt-0.5">
                <div className="flex flex-col items-center gap-1 shrink-0">
                  <div className="w-8 h-8 rounded-full border border-dashed border-gray-600 flex items-center justify-center text-gray-400">
                    <i className="fa-solid fa-plus text-[8px]" />
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
                      <div className="w-full h-full rounded-full bg-[#0d0a15] flex items-center justify-center text-[8px] font-bold text-white">PK</div>
                    </div>
                    <div>
                      <p className="font-bold text-[9px]">princekuma3067 💻</p>
                      <p className="text-[7px] text-gray-500 font-light">Just now</p>
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
                      className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[8px] cursor-pointer shrink-0 transition-transform hover:scale-110"
                      style={{ background: palette.accent }}
                    >
                      <i className={`fa-solid ${isVoicePlaying && activeVoiceId === 'home-voice-post' ? 'fa-pause' : 'fa-play'}`} />
                    </button>
                    <div className="flex-1 flex items-end gap-1 h-4 pb-0.5">
                      {[1.5, 3.5, 2, 4, 1.5, 3, 2.5, 1.5, 3.5, 2, 4, 1.5].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-full origin-bottom"
                          style={{
                            height: `${h * 22}%`,
                            background: isVoicePlaying && activeVoiceId === 'home-voice-post' ? palette.accent : 'rgba(255,255,255,0.2)',
                            animation: isVoicePlaying && activeVoiceId === 'home-voice-post' ? `waveform 0.7s ease-in-out ${i * 0.06}s infinite` : 'none',
                            transition: 'background 0.3s ease',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* EXPLORE */}
          {activeTab === 'explore' && (
            <div className="flex-1 overflow-y-auto px-3 py-2 space-y-3 no-scrollbar text-left">
              <div className="space-y-2">
                <h3 className="text-[10px] font-black uppercase tracking-wider text-gray-400">Explore</h3>
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-[9px] bg-[#0b0914] border-white/10">
                  <i className="fa-solid fa-magnifying-glass text-gray-400 text-[8px]" />
                  <input
                    type="text" placeholder="Search niche..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent border-none text-[8.5px] outline-none text-white font-light"
                  />
                </div>
                <div className="grid grid-cols-2 gap-1.5 pt-1 text-left">
                  <div className="bg-[#0b0914] rounded-xl border border-white/5 p-2 space-y-1">
                    <div className="h-12 bg-gradient-to-br from-orange-500/30 to-pink-500/30 rounded-lg flex items-center justify-center">
                      <i className="fa-solid fa-paint-brush text-white/50 text-[10px]" />
                    </div>
                    <span className="text-[7.5px] font-bold block text-white truncate">Art Sketches</span>
                  </div>
                  <div className="bg-[#0b0914] rounded-xl border border-white/5 p-2 space-y-1">
                    <div className="h-12 bg-gradient-to-br from-pink-500/30 to-purple-500/30 rounded-lg flex items-center justify-center">
                      <i className="fa-solid fa-camera-retro text-white/50 text-[10px]" />
                    </div>
                    <span className="text-[7.5px] font-bold block text-white truncate">Photography</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'chats' && (
            <div className="flex-1 flex flex-col text-left" style={{ minHeight: 0 }}>

              {/* Chat Header */}
              <div className="px-3 py-2 flex items-center gap-2 border-b border-white/8 bg-[#0a0812] shrink-0">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-[9px] font-extrabold text-white shadow-lg">OX</div>
                  <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 border border-[#0a0812]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[9.5px] font-bold text-white">Omnexia Official</p>
                  <p className="text-[7px] text-emerald-400 font-mono">🔒 End-to-end encrypted • Online</p>
                </div>
                <i className="fa-solid fa-shield-halved text-emerald-400 text-[10px]" />
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-3 py-2.5 space-y-2.5 no-scrollbar">

                {/* Received – date */}
                <p className="text-[6.5px] text-gray-500 font-mono text-center">Wednesday, 11:24 AM</p>

                {/* Their message */}
                <div className="flex items-end gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-[6.5px] font-bold text-white shrink-0">OX</div>
                  <div className="max-w-[78%]">
                    <div className="bg-white/10 rounded-2xl rounded-bl-sm px-2.5 py-1.5">
                      <p className="text-[8.5px] text-gray-100 leading-snug">Hey, welcome to Soosial! 👋</p>
                    </div>
                    <p className="text-[6px] text-gray-600 mt-0.5 pl-1">11:24 AM</p>
                  </div>
                </div>

                {/* My message */}
                <div className="flex justify-end">
                  <div className="max-w-[78%]">
                    <div className="px-2.5 py-1.5 rounded-2xl rounded-br-sm" style={{ background: palette.accent }}>
                      <p className="text-[8.5px] text-white leading-snug">Hey, checking out the platform.</p>
                    </div>
                    <div className="flex items-center justify-end gap-1 mt-0.5 pr-0.5">
                      <p className="text-[6px] text-gray-600">11:26 AM</p>
                      <i className="fa-solid fa-check-double text-[7px]" style={{ color: palette.accentLight }} />
                    </div>
                  </div>
                </div>

                {/* Voice note from them */}
                <div className="flex items-end gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-[6.5px] font-bold text-white shrink-0">OX</div>
                  <div className="bg-white/10 rounded-2xl rounded-bl-sm px-2.5 py-1.5 flex items-center gap-2 min-w-[120px]">
                    <button
                      onClick={() => handlePlayVoiceComment('chat-voice', 300, 0.8)}
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[7px] shrink-0"
                      style={{ background: palette.accent }}
                    >
                      <i className={`fa-solid ${isVoicePlaying && activeVoiceId === 'chat-voice' ? 'fa-pause' : 'fa-play'}`} />
                    </button>
                    <div className="flex items-end gap-0.5 h-4">
                      {[1,2.5,1.5,3,2,1.5,2.5,1].map((h,i) => (
                        <div key={i} className="w-0.5 rounded-full" style={{ height:`${h*4}px`, background: palette.accentLight, opacity: 0.75 }} />
                      ))}
                    </div>
                    <span className="text-[6.5px] text-gray-400 font-mono">0:04</span>
                  </div>
                </div>

                {chatMessages.filter(m => m.id > 2).map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'items-end gap-1.5'}`}>
                    {msg.sender !== 'me' && <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-[6.5px] font-bold text-white shrink-0">OX</div>}
                    <div className="max-w-[78%]">
                      <div className={`px-2.5 py-1.5 rounded-2xl text-[8.5px] leading-snug ${msg.sender === 'me' ? 'rounded-br-sm text-white' : 'rounded-bl-sm bg-white/10 text-gray-100'}`}
                        style={msg.sender === 'me' ? { background: palette.accent } : {}}>
                        {msg.isVoice ? <span className="flex items-center gap-1"><i className="fa-solid fa-microphone text-[8px]"/> Voice Note ({msg.duration})</span> : msg.text}
                      </div>
                      {msg.sender === 'me' && (
                        <div className="flex items-center justify-end gap-1 mt-0.5 pr-0.5">
                          <p className="text-[6px] text-gray-600">{msg.time}</p>
                          <i className="fa-solid fa-check-double text-[7px]" style={{ color: palette.accentLight }} />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Bar */}
              <div className="px-2.5 py-2 border-t border-white/8 flex items-center gap-1.5 bg-[#0a0812] shrink-0">
                <button onClick={handleRecordVoice}
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] shrink-0 transition-colors ${isRecordingVoice ? 'bg-red-500 text-white' : 'bg-white/8 text-gray-400'}`}>
                  <i className="fa-solid fa-microphone" />
                </button>
                <input
                  type="text" placeholder="Message..."
                  value={typedMessage}
                  onChange={(e) => setTypedMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 bg-white/6 border border-white/10 rounded-full px-3 py-1 text-[8px] text-white outline-none placeholder-gray-600"
                />
                <button onClick={handleSendMessage}
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] text-white shrink-0"
                  style={{ background: palette.accent }}>
                  <i className="fa-solid fa-paper-plane" />
                </button>
              </div>
            </div>
          )}

          {/* PROFILE */}
          {activeTab === 'profile' && (
            <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2.5 text-left">
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
                  className="w-full py-1.5 text-white font-bold rounded-lg text-[8px] cursor-pointer mt-1"
                  style={{ background: `linear-gradient(135deg, ${palette.glow}, ${palette.accentLight})` }}
                >
                  Book Creator Direct
                </button>
              </div>
            </div>
          )}

          {/* SOOS */}
          {activeTab === 'soos' && (
            <div className="flex-1 relative bg-gradient-to-b from-purple-900/40 to-black rounded-xl overflow-hidden p-2.5 flex flex-col justify-between text-left">
              <div className="flex justify-between items-center text-[8.5px] font-bold text-white z-10">
                <span className="uppercase tracking-widest" style={{ color: palette.accent }}>Soos Reel</span>
                <span className="bg-red-600 px-1.5 py-0.5 rounded-full text-[6px] font-mono">LIVE</span>
              </div>

              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <i className="fa-solid fa-circle-play text-6xl text-white" />
              </div>

              <div className="z-10 space-y-1">
                <div className="flex items-end justify-between">
                  <div className="space-y-0.5 max-w-[70%]">
                    <p className="text-[9px] font-bold text-white">@ganeshkgp</p>
                    <p className="text-[7.5px] text-gray-300 leading-tight">Testing creator rate card module inside Soosial! 🚀</p>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <button onClick={handleLikeSoos} className="flex flex-col items-center">
                      <i className={`fa-solid fa-heart text-xs ${soosLiked ? 'heart-pop' : ''}`}
                        style={{ color: soosLiked ? palette.accent : 'white' }} />
                      <span className="text-[7px] text-gray-300">{soosLikeCount}k</span>
                    </button>
                    <button onClick={() => setShowSoosComments(v => !v)} className="flex flex-col items-center">
                      <i className="fa-solid fa-comment text-xs text-white" />
                      <span className="text-[7px] text-gray-300">128</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Bottom nav — 4 icons matching homepage.jpeg */}
        <div className="absolute bottom-0 left-0 w-full h-9 bg-[#0c0a14] border-t border-white/10 px-4 flex justify-between items-center z-30">
          {/* Home */}
          <button onClick={() => triggerTabChange('home')} className="transition-all duration-200" style={{ color: activeTab === 'home' ? palette.accent : 'rgba(255,255,255,0.3)', transform: activeTab === 'home' ? 'scale(1.2)' : 'scale(1)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </button>
          {/* Feed/Media - Material Design film reel icon */}
          <button onClick={() => triggerTabChange('explore')} className="transition-all duration-200" style={{ color: activeTab === 'explore' ? palette.accent : 'rgba(255,255,255,0.3)', transform: activeTab === 'explore' ? 'scale(1.2)' : 'scale(1)' }}>
            <svg width="14" height="14" viewBox="80 -880 800 800" fill="currentColor">
              <path d="m160-800 80 160h120l-80-160h80l80 160h120l-80-160h80l80 160h120l-80-160h120q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800Zm0 240v320h640v-320H160Zm0 0v320-320Z"/>
            </svg>
          </button>
          {/* Chat */}
          <button onClick={() => triggerTabChange('chats')} className="transition-all duration-200" style={{ color: activeTab === 'chats' ? palette.accent : 'rgba(255,255,255,0.3)', transform: activeTab === 'chats' ? 'scale(1.2)' : 'scale(1)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7A8.38 8.38 0 0 1 4 11.5a8.5 8.5 0 0 1 17 0z" /><line x1="8" y1="10" x2="16" y2="10" /><line x1="8" y1="14" x2="13" y2="14" />
            </svg>
          </button>
          {/* Profile */}
          <button onClick={() => triggerTabChange('profile')} className="transition-all duration-200" style={{ color: activeTab === 'profile' ? palette.accent : 'rgba(255,255,255,0.3)', transform: activeTab === 'profile' ? 'scale(1.2)' : 'scale(1)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
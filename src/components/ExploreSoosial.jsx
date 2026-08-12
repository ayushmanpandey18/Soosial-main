import React, { useState, useEffect, useRef, useCallback } from 'react';
import { playClickSound, playDemoSound } from '../utils/audio';

/* ─────────────────────────────────────────────────────────────
   10 screens with metadata
───────────────────────────────────────────────────────────── */
const SCREENS = [
  {
    id: 'login',
    label: 'Login',
    badge: '01',
    img: '/Explore_soosial/login.jpg.jpeg',
    accent: '#ff2a85',
    icon: 'fa-solid fa-fingerprint',
    title: 'Seamless Sign-In',
    description: 'Cinematic login with biometric support and instant India-secure session handling.',
    tag: 'Entry Gate',
  },
  {
    id: 'feed',
    label: 'Home Feed',
    badge: '02',
    img: '/Explore_soosial/feed.jpg.jpeg',
    accent: '#ff5e00',
    icon: 'fa-solid fa-house',
    title: 'Persona Feed',
    description: 'Anti-addiction feed — only intentional, persona-matched content. Zero doomscroll loops.',
    tag: 'Core Screen',
  },
  {
    id: 'profile',
    label: 'Profile',
    badge: '03',
    img: '/Explore_soosial/profile section.jpeg',
    accent: '#8a2be2',
    icon: 'fa-solid fa-id-badge',
    title: 'Creator Profile',
    description: 'Verified creator identity with rate cards, persona badges, and collaboration toggle.',
    tag: 'Identity',
  },
  {
    id: 'story',
    label: 'Stories',
    badge: '04',
    img: '/Explore_soosial/story.jpg.jpeg',
    accent: '#06b6d4',
    icon: 'fa-solid fa-circle-play',
    title: 'Live Story Ring',
    description: '24-hour stories with gradient ring indicators. Tap any creator to enter their story.',
    tag: 'Ephemeral',
  },
  {
    id: 'sharestory',
    label: 'Share Story',
    badge: '05',
    img: '/Explore_soosial/sharestory.jpg.jpeg',
    accent: '#10b981',
    icon: 'fa-solid fa-share-from-square',
    title: 'Create & Share',
    description: 'Post with domain tags — your content reaches only your matched niche audience.',
    tag: 'Publishing',
  },
  {
    id: 'reels',
    label: 'Reels',
    badge: '06',
    img: '/Explore_soosial/reels.jpg.jpeg',
    accent: '#ff5e00',
    icon: 'fa-solid fa-film',
    title: 'Soos Short-Form',
    description: 'Vertical reels with voice comments, brand cards, and escrow-backed creator deals.',
    tag: 'Monetize',
  },
  {
    id: 'comments',
    label: 'Comments',
    badge: '07',
    img: '/Explore_soosial/comment section.jpeg',
    accent: '#ff2a85',
    icon: 'fa-solid fa-comments',
    title: 'Voice Comments',
    description: 'Voice-first comments — emotion, humor and context preserved in lossless audio.',
    tag: 'Engagement',
  },
  {
    id: 'collab',
    label: 'Collab',
    badge: '08',
    img: '/Explore_soosial/collaboration setting.jpeg',
    accent: '#f59e0b',
    icon: 'fa-solid fa-handshake',
    title: 'Collab Settings',
    description: 'Set pricing, visibility and availability. Businesses find you via your domain.',
    tag: 'Creator Tools',
  },
  {
    id: 'domain',
    label: 'Domain',
    badge: '09',
    img: '/Explore_soosial/collabe domain selections.jpeg',
    accent: '#8a2be2',
    icon: 'fa-solid fa-shapes',
    title: 'Domain Select',
    description: 'Choose your content domain. Businesses filter by domain to discover creators.',
    tag: 'Discovery',
  },
  {
    id: 'settings',
    label: 'Settings',
    badge: '10',
    img: '/Explore_soosial/settings.jpeg',
    accent: '#a855f7',
    icon: 'fa-solid fa-gear',
    title: 'Control Hub',
    description: 'Full control over rates, domain, privacy, dark mode, and escrow wallet.',
    tag: 'Control',
  },
];

/* ─────────────────────────────────────────────────────────────
   Main component — phone simulator experience
───────────────────────────────────────────────────────────── */
export default function ExploreSoosial() {
  const [activeIdx, setActiveIdx]   = useState(0);
  const [prevIdx, setPrevIdx]       = useState(null);
  const [slideDir, setSlideDir]     = useState('right'); // 'right' | 'left'
  const [animating, setAnimating]   = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [autoPlay, setAutoPlay]     = useState(true);

  const headerRef  = useRef(null);
  const sectionRef = useRef(null);
  const autoRef    = useRef(null);

  /* Intersection observers */
  useEffect(() => {
    const hObs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setIsHeaderVisible(true); }, { threshold: 0.2 });
    const sObs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setIsSectionVisible(true); }, { threshold: 0.1 });
    if (headerRef.current)  hObs.observe(headerRef.current);
    if (sectionRef.current) sObs.observe(sectionRef.current);
    return () => { hObs.disconnect(); sObs.disconnect(); };
  }, []);

  /* Navigate to a screen */
  const goTo = useCallback((idx, dir) => {
    if (animating || idx === activeIdx) return;
    playClickSound();
    setSlideDir(dir || (idx > activeIdx ? 'right' : 'left'));
    setPrevIdx(activeIdx);
    setAnimating(true);
    setTimeout(() => {
      setActiveIdx(idx);
      setAnimating(false);
      setPrevIdx(null);
    }, 340);
  }, [animating, activeIdx]);

  const goNext = useCallback(() => goTo((activeIdx + 1) % SCREENS.length, 'right'), [goTo, activeIdx]);
  const goPrev = useCallback(() => goTo((activeIdx - 1 + SCREENS.length) % SCREENS.length, 'left'), [goTo, activeIdx]);

  /* Auto-play */
  useEffect(() => {
    if (!autoPlay || !isSectionVisible) return;
    autoRef.current = setInterval(goNext, 3000);
    return () => clearInterval(autoRef.current);
  }, [autoPlay, isSectionVisible, goNext]);

  /* Keyboard nav */
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight') { setAutoPlay(false); goNext(); }
      if (e.key === 'ArrowLeft')  { setAutoPlay(false); goPrev(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goNext, goPrev]);

  const screen = SCREENS[activeIdx];
  const prev   = prevIdx !== null ? SCREENS[prevIdx] : null;

  return (
    <section
      ref={sectionRef}
      id="explore-soosial"
      className="relative py-24 bg-brand-darker overflow-hidden border-t border-white/5"
    >
      {/* Ambient glows that shift with active accent */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[220px] pointer-events-none transition-all duration-1000"
        style={{ background: `radial-gradient(circle,${screen.accent}22,transparent 70%)` }}
      />
      <div className="absolute inset-0 dashboard-grid opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* ── Section header ── */}
        <div
          ref={headerRef}
          className="text-center max-w-2xl mx-auto mb-14 space-y-4"
          style={{
            opacity: isHeaderVisible ? 1 : 0,
            transform: isHeaderVisible ? 'translateY(0)' : 'translateY(28px)',
            transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <span
            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border"
            style={{ color: screen.accent, background: `${screen.accent}12`, borderColor: `${screen.accent}30`, transition: 'all 0.5s ease' }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: screen.accent }} />
            Explore Soosial
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-outfit text-white leading-tight">
            Feel the App,<br />
            <span className="gradient-text">Before You Download.</span>
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Navigate through every screen of Soosial right here. Tap any screen below or use the arrows to explore the full app experience.
          </p>
        </div>

        {/* ══════════════════════════════════════════════════════
            MAIN LAYOUT — phone left, info right
        ══════════════════════════════════════════════════════ */}
        <div
          className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16"
          style={{
            opacity: isSectionVisible ? 1 : 0,
            transform: isSectionVisible ? 'translateY(0)' : 'translateY(32px)',
            transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s',
          }}
        >

          {/* ── LEFT: Phone mockup ── */}
          <div className="relative flex-shrink-0">

            {/* Outer ambient glow ring */}
            <div
              className="absolute inset-0 rounded-[52px] blur-[40px] transition-all duration-700 pointer-events-none"
              style={{ background: `${screen.accent}30`, margin: '-20px' }}
            />

            {/* Phone shell */}
            <div
              className="relative overflow-hidden"
              style={{
                width: '280px',
                borderRadius: '46px',
                border: '6px solid rgba(255,255,255,0.1)',
                background: '#07050a',
                boxShadow: `0 0 0 1px ${screen.accent}30, 0 40px 80px rgba(0,0,0,0.9), 0 0 60px ${screen.accent}25`,
                transition: 'box-shadow 0.6s ease',
              }}
            >
              {/* Dynamic island */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center gap-1.5"
                style={{ width: '88px', height: '22px', background: '#000', borderRadius: '14px' }}>
                <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.07)' }} />
                <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.07)' }} />
              </div>

              {/* Status bar */}
              <div className="absolute top-0 left-0 w-full h-10 z-20 px-6 flex justify-between items-end pb-1 pointer-events-none"
                style={{ fontSize: '9px', fontWeight: 700, color: 'rgba(255,255,255,0.5)' }}>
                <span>10:29</span>
                <div className="flex items-center gap-1">
                  <span style={{ fontSize: '7px' }}>5G+</span>
                  <i className="fa-solid fa-signal" style={{ fontSize: '8px' }} />
                  <i className="fa-solid fa-battery-three-quarters" style={{ fontSize: '8px' }} />
                </div>
              </div>

              {/* Screen area — clipped, fixed height */}
              <div className="relative overflow-hidden" style={{ height: '560px', marginTop: '0px' }}>

                {/* Active screen */}
                <img
                  key={`active-${screen.id}`}
                  src={screen.img}
                  alt={screen.label}
                  className={`absolute inset-0 w-full h-full object-cover object-top ${
                    animating
                      ? slideDir === 'right' ? 'phone-enter-from-right' : 'phone-enter-from-left'
                      : 'phone-settled'
                  }`}
                />

                {/* Exiting screen */}
                {prev && animating && (
                  <img
                    key={`exit-${prev.id}`}
                    src={prev.img}
                    alt={prev.label}
                    className={`absolute inset-0 w-full h-full object-cover object-top ${
                      slideDir === 'right' ? 'phone-exit-to-left' : 'phone-exit-to-right'
                    }`}
                  />
                )}

                {/* Top gradient overlay */}
                <div className="absolute inset-x-0 top-0 h-14 pointer-events-none z-10"
                  style={{ background: 'linear-gradient(to bottom,rgba(7,5,10,0.85),transparent)' }} />

                {/* Bottom gradient overlay */}
                <div className="absolute inset-x-0 bottom-0 h-20 pointer-events-none z-10"
                  style={{ background: 'linear-gradient(to top,rgba(7,5,10,0.95),transparent)' }} />

                {/* Screen label bottom */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center z-20 pointer-events-none">
                  <div
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md border text-[9px] font-bold text-white"
                    style={{ background: `${screen.accent}22`, borderColor: `${screen.accent}50` }}
                  >
                    <i className={`${screen.icon} text-[8px]`} style={{ color: screen.accent }} />
                    {screen.tag}
                  </div>
                </div>
              </div>

              {/* Home indicator bar */}
              <div className="flex justify-center py-2" style={{ background: '#07050a' }}>
                <div className="w-24 h-1 rounded-full bg-white/20" />
              </div>
            </div>

            {/* Left/Right tap areas on the phone for swiping */}
            <button
              onClick={() => { setAutoPlay(false); goPrev(); }}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/12 hover:border-white/25 flex items-center justify-center transition-all cursor-pointer"
            >
              <i className="fa-solid fa-chevron-left text-white text-xs" />
            </button>
            <button
              onClick={() => { setAutoPlay(false); goNext(); }}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/12 hover:border-white/25 flex items-center justify-center transition-all cursor-pointer"
            >
              <i className="fa-solid fa-chevron-right text-white text-xs" />
            </button>
          </div>

          {/* ── RIGHT: Info panel ── */}
          <div className="flex-1 max-w-md space-y-6">

            {/* Screen counter */}
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg font-mono text-white border"
                style={{ background: `${screen.accent}18`, borderColor: `${screen.accent}40`, color: screen.accent, transition: 'all 0.4s ease' }}
              >
                {screen.badge}
              </div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest" style={{ color: screen.accent }}>
                  Screen {screen.badge} of {SCREENS.length}
                </p>
                <h3 className="text-2xl font-black font-outfit text-white leading-tight mt-0.5">
                  {screen.title}
                </h3>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-sm leading-relaxed">{screen.description}</p>

            {/* Progress bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[9px] font-bold text-gray-600">
                <span>User journey progress</span>
                <span style={{ color: screen.accent }}>{Math.round(((activeIdx + 1) / SCREENS.length) * 100)}%</span>
              </div>
              <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${((activeIdx + 1) / SCREENS.length) * 100}%`,
                    background: `linear-gradient(90deg, #ff5e00, ${screen.accent})`,
                  }}
                />
              </div>
            </div>

            {/* Next screen preview */}
            {activeIdx < SCREENS.length - 1 && (
              <div
                className="flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer group"
                style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.07)' }}
                onClick={() => { setAutoPlay(false); goNext(); }}
              >
                <div
                  className="w-10 h-10 rounded-xl overflow-hidden border shrink-0"
                  style={{ borderColor: `${SCREENS[activeIdx + 1].accent}40` }}
                >
                  <img src={SCREENS[activeIdx + 1].img} alt="" className="w-full h-full object-cover object-top" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">Next screen</p>
                  <p className="text-xs font-bold text-white truncate group-hover:text-gray-200 transition-colors">
                    {SCREENS[activeIdx + 1].badge} — {SCREENS[activeIdx + 1].title}
                  </p>
                </div>
                <i className="fa-solid fa-arrow-right text-[10px] text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
            )}

            {/* Auto-play toggle */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setAutoPlay((p) => !p)}
                className="flex items-center gap-2.5 text-xs font-bold transition-colors cursor-pointer"
                style={{ color: autoPlay ? screen.accent : 'rgba(255,255,255,0.3)' }}
              >
                <div
                  className="w-8 h-4 rounded-full p-0.5 transition-all duration-300 flex items-center"
                  style={{ background: autoPlay ? `${screen.accent}40` : 'rgba(255,255,255,0.08)', justifyContent: autoPlay ? 'flex-end' : 'flex-start' }}
                >
                  <div className="w-3 h-3 rounded-full bg-white shadow-sm" />
                </div>
                Auto-play tour
              </button>

              <a
                href="https://play.google.com/store/apps/details?id=com.omnexiatechnology.soosial&pcampaignid=web_share"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-white font-bold text-xs hover:scale-105 transition-transform"
                style={{ background: `linear-gradient(135deg,${screen.accent},#8a2be2)`, boxShadow: `0 6px 20px ${screen.accent}40` }}
              >
                <i className="fa-brands fa-google-play" />
                Get the App
              </a>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            BOTTOM SCREEN STRIP — horizontal scrollable nav
        ══════════════════════════════════════════════════════ */}
        <div
          className="mt-12 relative"
          style={{
            opacity: isSectionVisible ? 1 : 0,
            transition: 'opacity 0.8s ease 0.5s',
          }}
        >
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right,#030106,transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left,#030106,transparent)' }} />

          <div className="overflow-x-auto no-scrollbar">
            <div className="flex items-end gap-3 pb-2 px-4" style={{ minWidth: 'max-content' }}>
              {SCREENS.map((s, i) => {
                const isActive = i === activeIdx;
                return (
                  <button
                    key={s.id}
                    onClick={() => { setAutoPlay(false); goTo(i, i > activeIdx ? 'right' : 'left'); }}
                    className="flex flex-col items-center gap-1.5 transition-all duration-300 cursor-pointer group shrink-0"
                    style={{ opacity: isActive ? 1 : 0.45, transform: isActive ? 'scale(1.08)' : 'scale(1)' }}
                  >
                    {/* Thumbnail */}
                    <div
                      className="overflow-hidden transition-all duration-300"
                      style={{
                        width: isActive ? '64px' : '52px',
                        height: isActive ? '112px' : '90px',
                        borderRadius: '12px',
                        border: `2px solid ${isActive ? s.accent : 'rgba(255,255,255,0.07)'}`,
                        boxShadow: isActive ? `0 0 16px ${s.accent}50` : 'none',
                        transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                      }}
                    >
                      <img src={s.img} alt={s.label}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    {/* Label */}
                    <span
                      className="text-[8px] font-bold text-center leading-tight max-w-[64px] block"
                      style={{ color: isActive ? s.accent : 'rgba(255,255,255,0.35)' }}
                    >
                      {s.badge}. {s.label}
                    </span>

                    {/* Active dot */}
                    {isActive && (
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: s.accent, boxShadow: `0 0 6px ${s.accent}` }} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

      </div>

      {/* ── Inline keyframes ── */}
      <style>{`
        @keyframes enterFromRight {
          from { transform: translateX(100%); opacity: 0.7; }
          to   { transform: translateX(0);    opacity: 1;   }
        }
        @keyframes enterFromLeft {
          from { transform: translateX(-100%); opacity: 0.7; }
          to   { transform: translateX(0);     opacity: 1;   }
        }
        @keyframes exitToLeft {
          from { transform: translateX(0);     opacity: 1; }
          to   { transform: translateX(-100%); opacity: 0; }
        }
        @keyframes exitToRight {
          from { transform: translateX(0);    opacity: 1; }
          to   { transform: translateX(100%); opacity: 0; }
        }
        .phone-enter-from-right { animation: enterFromRight 0.34s cubic-bezier(0.25,1,0.35,1) both; }
        .phone-enter-from-left  { animation: enterFromLeft  0.34s cubic-bezier(0.25,1,0.35,1) both; }
        .phone-exit-to-left     { animation: exitToLeft     0.34s cubic-bezier(0.25,1,0.35,1) both; }
        .phone-exit-to-right    { animation: exitToRight    0.34s cubic-bezier(0.25,1,0.35,1) both; }
        .phone-settled          { animation: none; }
      `}</style>
    </section>
  );
}

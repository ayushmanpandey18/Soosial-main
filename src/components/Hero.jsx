import React, { useState, useRef, useEffect } from 'react';
import { playDemoSound, playCustomStudioVoice, playClickSound } from '../utils/audio';

export default function Hero({ onBookCreator }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  const [payoutPopups, setPayoutPopups] = useState([]);
  const [creatorPopups, setCreatorPopups] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });
  // Post interactions
  const [liked, setLiked] = useState(false);
  const [reposted, setReposted] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [shareToast, setShareToast] = useState(false);
  const [doubleTapHeart, setDoubleTapHeart] = useState(false);
  const likeCount = liked ? 4301 : 4300;
  const commentCount = 238;
  const handleDoubleTap = () => {
    setLiked(true);
    setDoubleTapHeart(true);
    setTimeout(() => setDoubleTapHeart(false), 900);
  };
  const headlineRef = useRef(null);
  const phoneRef = useRef(null);

  const handlePlayVoice = () => {
    setIsPlaying(true);
    playDemoSound(330, 0.6, 'triangle');
    setTimeout(() => setIsPlaying(false), 600);
  };

  // Headline Mouse move spotlight effect
  const handleHeadlineMouseMove = (e) => {
    if (!headlineRef.current) return;
    const rect = headlineRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotlightPos({ x, y });
  };

  // Click on "Creators" word -> Trigger avatar burst & chime
  const handleCreatorsClick = (e) => {
    e.stopPropagation();
    playDemoSound(523.25, 0.35, 'sine'); // C5 tone
    const id = Date.now();
    const avatars = ['/avatars/sg.png', '/avatars/sk.png', '/avatars/nt.png', '/avatars/creator.png'];
    const newPopup = {
      id,
      img: avatars[Math.floor(Math.random() * avatars.length)],
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY - 20
    };
    setCreatorPopups(prev => [...prev, newPopup]);
    setTimeout(() => {
      setCreatorPopups(prev => prev.filter(p => p.id !== id));
    }, 1800);
  };

  // Click on "Monetize Day 1." word -> Trigger cash payout burst & studio audio
  const handleMonetizeClick = (e) => {
    e.stopPropagation();
    playCustomStudioVoice();
    const id = Date.now();
    const amounts = ['+ ₹ 15,000 Escrow', '+ ₹ 5,000 Shoutout', '+ ₹ 25,000 Deal', '+ ₹ 10,000 Booking'];
    const newPopup = {
      id,
      text: amounts[Math.floor(Math.random() * amounts.length)],
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY - 20
    };
    setPayoutPopups(prev => [...prev, newPopup]);
    setTimeout(() => {
      setPayoutPopups(prev => prev.filter(p => p.id !== id));
    }, 2000);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAnimated(true);
        }
      },
      { threshold: 0.15 }
    );

    if (phoneRef.current) {
      observer.observe(phoneRef.current);
    }

    return () => {
      if (phoneRef.current) {
        observer.unobserve(phoneRef.current);
      }
    };
  }, []);

  return (
    <section className="relative pt-36 pb-24 md:pt-44 md:pb-36 overflow-hidden select-none">
      {/* Glowing Ambient Lights (Dynamic shifting background) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-gradient-to-r from-brand-orange/20 via-brand-pink/20 to-brand-purple/20 rounded-full blur-[140px] animate-pulse-slow pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col items-center text-center space-y-16">

        {/* 🚀 Top Centered Narrative Header (Ultra-Premium & Animated) */}
        <div className="w-full max-w-4xl text-center space-y-8 flex flex-col items-center">

          {/* Top Live Badge */}
          <div className="hero-entrance-1 inline-flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/15 backdrop-blur-xl shadow-xl hover:border-brand-pink/40 transition-all duration-300 group cursor-pointer">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-[10.5px] font-extrabold uppercase tracking-widest text-gray-200">
              Made in India • Omnexia Technologies PVT L.T.D.
            </span>
            <span className="px-2 py-0.5 rounded-full bg-brand-pink/20 border border-brand-pink/30 text-brand-pink text-[9px] font-black tracking-wider uppercase">
              LIVE V2.4
            </span>
          </div>

          {/* 🌟 INSANELY INTERACTIVE HEADLINE CONTAINER 🌟 */}
          <div
            ref={headlineRef}
            onMouseMove={handleHeadlineMouseMove}
            className="hero-entrance-2 relative w-full max-w-3xl p-6 sm:p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-white/20 group"
            style={{
              backgroundImage: `radial-gradient(400px circle at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(255, 42, 133, 0.18), transparent 70%)`
            }}
          >
            {/* Ambient Corner Sparkles */}
            <div className="absolute top-2 left-3 text-xs text-brand-pink/40 animate-pulse pointer-events-none">✦</div>
            <div className="absolute bottom-2 right-4 text-xs text-brand-orange/40 animate-pulse pointer-events-none" style={{ animationDelay: '1s' }}>✦</div>

            {/* Click Instructions Hint Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 border border-white/10 text-[9.5px] text-gray-400 font-medium mb-3 opacity-80 group-hover:opacity-100 transition-opacity">
              <i className="fa-solid fa-hand-pointer text-pink-400 animate-bounce"></i>
              <span>Click words below for instant audio & escrow demo</span>
            </div>

            {/* Main Interactive Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-outfit leading-tight tracking-tight text-white drop-shadow-2xl">
              Where{' '}
              <span
                onClick={handleCreatorsClick}
                className="relative inline-flex items-center px-3.5 py-1 rounded-2xl bg-white/10 border border-white/20 hover:border-pink-500/60 hover:bg-pink-500/15 hover:scale-105 transition-all cursor-pointer group/creator"
                title="Click to test Creator Avatar pop!"
              >
                <span className="text-white">Creators</span>
                <span className="ml-2 text-[10px] bg-pink-500 text-white font-mono px-2 py-0.5 rounded-full shadow-md animate-pulse">
                  👥 Tap
                </span>
              </span>
              <br />

              {/* 🌟 ULTRA-CRISP & VIVID "MONETIZE DAY 1." HERO TITLE 🌟 */}
              <span
                onClick={handleMonetizeClick}
                className="relative inline-block mt-2 cursor-pointer group/monetize hover:scale-[1.03] transition-transform duration-300"
                title="Click to simulate instant INR Escrow Payout!"
              >
                {/* Backlight Neon Glow behind text (ensures zero WebKit clip bugs while giving max glow) */}
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/40 via-pink-500/40 to-purple-600/40 blur-2xl opacity-70 group-hover/monetize:opacity-100 transition-opacity pointer-events-none"></span>

                {/* Crystal Clear Radiant Text */}
                <span className="relative z-10 block text-5xl sm:text-7xl lg:text-8xl font-black font-outfit tracking-tight bg-gradient-to-r from-orange-400 via-pink-500 to-purple-400 bg-clip-text text-transparent pb-1">
                  Monetize Day 1.
                </span>

                {/* Floating Tap Prompt Badge */}
                <span className="absolute -top-3.5 -right-6 text-[10.5px] sm:text-xs bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black font-mono px-2.5 py-1 rounded-full shadow-2xl border border-emerald-300/50 animate-bounce flex items-center gap-1">
                  <i className="fa-solid fa-coins text-yellow-300"></i>
                  <span>Tap ₹ Demo</span>
                </span>
              </span>
            </h1>

            {/* Floating Payout Popups (+₹15,000) when clicking Monetize */}
            {payoutPopups.map(popup => (
              <div
                key={popup.id}
                className="absolute z-50 pointer-events-none animate-float-up text-emerald-400 bg-black/90 border border-emerald-500/50 px-3 py-1.5 rounded-full text-xs font-black font-mono shadow-2xl flex items-center gap-1.5"
                style={{ left: `${popup.x}px`, top: `${popup.y}px` }}
              >
                <i className="fa-solid fa-circle-check text-emerald-400 text-xs"></i>
                <span>{popup.text}</span>
              </div>
            ))}

            {/* Floating Avatar Popups when clicking Creators */}
            {creatorPopups.map(popup => (
              <div
                key={popup.id}
                className="absolute z-50 pointer-events-none animate-float-up bg-pink-500/90 border border-white/40 p-1 rounded-full shadow-2xl flex items-center justify-center"
                style={{ left: `${popup.x}px`, top: `${popup.y}px` }}
              >
                <img src={popup.img} className="w-8 h-8 rounded-full object-cover border border-white" alt="Avatar" />
              </div>
            ))}

            {/* Interactive Niche Switcher Bar */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-5">
              {[
                { label: '🔥 All Features', mode: 'All' },
                { label: '🎥 SOOS Reels', mode: 'Reels' },
                { label: '🎙️ Vocal Feed', mode: 'Voice' },
                { label: '💼 Day 1 Escrow', mode: 'Escrow' },
                { label: '🛡️ Data Shield', mode: 'Shield' }
              ].map(item => (
                <button
                  key={item.mode}
                  onClick={() => {
                    playClickSound();
                    setActiveFilter(item.mode);
                  }}
                  className={`px-3 py-1 rounded-full text-[10.5px] font-bold transition-all duration-300 cursor-pointer ${activeFilter === item.mode
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/25 scale-105'
                      : 'bg-white/5 hover:bg-white/15 text-gray-300 border border-white/10'
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

          </div>

          {/* Subtitle Description */}
          <p className="hero-entrance-3 text-gray-300 text-base sm:text-xl max-w-3xl leading-relaxed font-light mx-auto">
            Soosial is India's premium, high-security social architecture built to empower creators. Enjoy absolute privacy with zero database leaks. Monetize from Day 1 through direct business-to-creator bookings (SOOS videos, stories, shoutouts) and curate your intellect with our non-addictive Persona stream.
          </p>

          {/* Interactive Live Metrics Ticker */}
          <div className="hero-entrance-3 flex flex-wrap items-center justify-center gap-3 py-1">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-gray-300 backdrop-blur-md hover:bg-white/10 transition-colors">
              <span className="text-emerald-400 font-mono">₹ 100%</span> Escrow Protected
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-gray-300 backdrop-blur-md hover:bg-white/10 transition-colors">
              <span className="text-brand-orange">🛡️ 0 Leak</span> Indian Server Hosting
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-gray-300 backdrop-blur-md hover:bg-white/10 transition-colors">
              <span className="text-brand-pink">⚡ Instant</span> Vocal Feed Reactions
            </div>
          </div>

          {/* Premium Interactive Value Points Grid */}
          <div className="hero-entrance-4 grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2 text-left max-w-2xl mx-auto w-full">

            {/* Card 1: Sovereign Shield */}
            <div className="group relative flex items-start gap-3.5 bg-gradient-to-br from-white/10 to-white/5 p-4 rounded-2xl border border-white/15 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-brand-orange/50 hover:shadow-[0_10px_30px_rgba(255,94,0,0.25)] cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-brand-orange/20 border border-brand-orange/40 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-shield-halved text-brand-orange text-lg"></i>
              </div>
              <div>
                <h4 className="font-bold text-white text-sm font-outfit flex items-center gap-1.5">
                  Sovereign Data Shield
                  <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">Active</span>
                </h4>
                <p className="text-xs text-gray-300 mt-1 font-light leading-relaxed">100% local hosting within India protecting your chats & files from dark web leaks.</p>
              </div>
            </div>

            {/* Card 2: Voice Comments with Interactive Audio Test */}
            <div className="group relative flex items-start gap-3.5 bg-gradient-to-br from-white/10 to-white/5 p-4 rounded-2xl border border-white/15 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-brand-pink/50 hover:shadow-[0_10px_30px_rgba(255,42,133,0.25)] cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-brand-pink/20 border border-brand-pink/40 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-microphone text-brand-pink text-lg"></i>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-sm font-outfit">Infinite Voice Comments</h4>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayVoice();
                    }}
                    className="px-2 py-0.5 rounded-md bg-brand-pink/20 hover:bg-brand-pink/40 border border-brand-pink/40 text-white text-[9px] font-bold flex items-center gap-1 transition-all cursor-pointer"
                  >
                    <i className={`fa-solid ${isPlaying ? 'fa-volume-high animate-bounce' : 'fa-play'}`}></i> Test
                  </button>
                </div>
                <p className="text-xs text-gray-300 mt-1 font-light leading-relaxed">Comment using high-fidelity vocal notes. Express real human sentiment without limits.</p>
              </div>
            </div>

          </div>

          {/* App Store Downloads & Direct CTA */}
          <div className="hero-entrance-4 flex flex-wrap items-center justify-center gap-4 pt-4" id="download-assets">

            {/* Direct Booking CTA */}
            <button
              onClick={() => onBookCreator && onBookCreator('Ganesh KGP', '1x Dedicated SOOS', 15000)}
              className="px-6 py-3.5 rounded-xl text-white font-black text-sm transition-all duration-300 hover:scale-105 cursor-pointer flex items-center gap-2.5 shadow-2xl relative overflow-hidden group border border-white/20"
              style={{ background: 'linear-gradient(135deg, #ff2a85 0%, #ff5e00 50%, #8a2be2 100%)', boxShadow: '0 10px 30px rgba(255,42,133,0.4)' }}
            >
              <i className="fa-solid fa-bolt text-yellow-300 animate-pulse"></i>
              <span>Book Creator Escrow</span>
              <i className="fa-solid fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
            </button>

            {/* Google Play Store */}
            <a href="#download" onClick={(e) => e.preventDefault()} className="flex items-center gap-3 bg-brand-dark hover:bg-black border border-white/15 hover:border-brand-orange/60 rounded-xl px-5 py-3 transition-all transform hover:-translate-y-1 shadow-xl">
              <i className="fa-brands fa-google-play text-2xl text-brand-orange"></i>
              <div className="text-left">
                <span className="block text-[9px] uppercase tracking-wider text-gray-400 font-bold">Acquire on</span>
                <span className="font-outfit font-black text-sm text-white">Google Play</span>
              </div>
            </a>

            {/* Apple App Store */}
            <a href="#download" onClick={(e) => e.preventDefault()} className="flex items-center gap-3 bg-brand-dark hover:bg-black border border-white/15 hover:border-brand-purple/60 rounded-xl px-5 py-3 transition-all transform hover:-translate-y-1 shadow-xl">
              <i className="fa-brands fa-apple text-2xl text-brand-pink"></i>
              <div className="text-left">
                <span className="block text-[9px] uppercase tracking-wider text-gray-400 font-bold">Download from</span>
                <span className="font-outfit font-black text-sm text-white">App Store</span>
              </div>
            </a>

          </div>

        </div>

        {/* ── CENTERED BOTTOM COLUMN: Premium Floating Phone Hero ── */}
        <div ref={phoneRef} className="w-full flex justify-center items-center relative mt-6" style={{ minHeight: '680px' }}>

          {/* ── Ambient radial glow behind phone ── */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[450px] h-[450px] rounded-full blur-[130px] opacity-35 animate-pulse-slow"
              style={{ background: 'radial-gradient(circle, #8a2be2 0%, #ff2a85 50%, transparent 80%)' }} />
          </div>

          {/* ════════════════════════════════════
              FLOATING ELEMENTS (around the phone)
          ════════════════════════════════════ */}

          {/* 🛡 Shield – top-left */}
          <div className={`absolute z-20 hero-item ${isAnimated ? 'animate-in' : ''}`}
            style={{
              top: '6%', left: '2%',
              '--from-x': '80px', '--from-y': '180px',
              '--entry-delay': '0.2s', '--float-dur': '6.5s', '--float-delay': '1.8s'
            }}>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl border border-white/20 backdrop-blur-md"
              style={{ background: 'linear-gradient(135deg, rgba(26,58,110,0.85) 0%, rgba(13,31,66,0.9) 100%)', boxShadow: '0 12px 35px rgba(29,78,216,0.45)' }}>
              <i className="fa-solid fa-shield-halved text-2xl" style={{ color: '#60a5fa' }} />
            </div>
          </div>

          {/* 😂 Emoji – left mid */}
          <div className={`absolute z-20 hero-item ${isAnimated ? 'animate-in' : ''}`}
            style={{
              top: '28%', left: '-3%',
              '--from-x': '120px', '--from-y': '80px',
              '--entry-delay': '0.45s', '--float-dur': '7s', '--float-delay': '2.05s'
            }}>
            <span className="text-4xl drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] select-none">😂</span>
          </div>

          {/* 📹 Video icon – left lower */}
          <div className={`absolute z-20 hero-item ${isAnimated ? 'animate-in' : ''}`}
            style={{
              top: '52%', left: '-1%',
              '--from-x': '110px', '--from-y': '-20px',
              '--entry-delay': '0.7s', '--float-dur': '6.8s', '--float-delay': '2.3s'
            }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center border border-white/25 shadow-xl backdrop-blur-xl"
              style={{ background: 'rgba(255,255,255,0.1)' }}>
              <i className="fa-solid fa-video text-base text-white/90" />
            </div>
          </div>

          {/* 📞 Call icon – bottom-left */}
          <div className={`absolute z-20 hero-item ${isAnimated ? 'animate-in' : ''}`}
            style={{
              bottom: '14%', left: '4%',
              '--from-x': '90px', '--from-y': '-140px',
              '--entry-delay': '0.95s', '--float-dur': '7.5s', '--float-delay': '2.55s'
            }}>
            <div className="w-11 h-11 rounded-full flex items-center justify-center border border-white/20 backdrop-blur-lg"
              style={{ background: 'rgba(255,255,255,0.08)' }}>
              <i className="fa-solid fa-phone text-sm text-white/70" />
            </div>
          </div>

          {/* 💬 "What's up?" – left */}
          <div className={`absolute z-20 hero-item ${isAnimated ? 'animate-in' : ''}`}
            style={{
              bottom: '28%', left: '-1%',
              '--from-x': '110px', '--from-y': '-100px',
              '--entry-delay': '0.6s', '--float-dur': '6.6s', '--float-delay': '2.2s'
            }}>
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl rounded-bl-sm shadow-2xl border border-white/20 backdrop-blur-md"
              style={{ background: 'linear-gradient(135deg, rgba(255,42,133,0.9), rgba(255,94,0,0.9))', boxShadow: '0 12px 30px rgba(255,42,133,0.45)' }}>
              <img src="/avatars/sg.png" className="w-7 h-7 rounded-full object-cover border border-white/40 shadow-sm shrink-0" alt="SG" />
              <div>
                <p className="text-white font-bold text-[11.5px] leading-tight">What's up? 👋</p>
                <p className="text-white/70 text-[8.5px] font-mono">05:18 PM</p>
              </div>
            </div>
          </div>

          {/* 🤫 Emoji – top-right */}
          <div className={`absolute z-20 hero-item ${isAnimated ? 'animate-in' : ''}`}
            style={{
              top: '8%', right: '1%',
              '--from-x': '-80px', '--from-y': '180px',
              '--entry-delay': '0.35s', '--float-dur': '6.2s', '--float-delay': '1.95s'
            }}>
            <span className="text-4xl drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] select-none">🤫</span>
          </div>

          {/* 👤 Creator video card – right mid */}
          <div className={`absolute z-20 hero-item ${isAnimated ? 'animate-in' : ''}`}
            style={{
              top: '18%', right: '-4%',
              '--from-x': '-100px', '--from-y': '130px',
              '--entry-delay': '0.5s', '--float-dur': '7.2s', '--float-delay': '2.1s'
            }}>
            <div className="w-32 rounded-2xl overflow-hidden border border-white/20 shadow-2xl backdrop-blur-md"
              style={{ background: 'rgba(20, 14, 35, 0.85)', boxShadow: '0 15px 45px rgba(138,43,226,0.45)' }}>
              <div className="h-24 relative overflow-hidden">
                <img src="/avatars/creator.png" className="w-full h-full object-cover" alt="Pranav Chawla" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#140e23] via-transparent to-transparent" />
                <div className="absolute top-1.5 right-1.5 text-sm drop-shadow-md">🩷</div>
              </div>
              <div className="px-2.5 py-2">
                <p className="text-white font-bold text-[10px] truncate">Pranav Chawla</p>
                <p className="text-pink-400 text-[8px] font-medium flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse"></span> Active Now</p>
              </div>
            </div>
          </div>

          {/* 💬 "Going on a trip" – right */}
          <div className={`absolute z-20 hero-item ${isAnimated ? 'animate-in' : ''}`}
            style={{
              top: '52%', right: '-2%',
              '--from-x': '-110px', '--from-y': '-20px',
              '--entry-delay': '0.8s', '--float-dur': '6.4s', '--float-delay': '2.4s'
            }}>
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl rounded-br-sm shadow-2xl border border-white/20 backdrop-blur-md"
              style={{ background: 'linear-gradient(135deg, rgba(255,42,133,0.9), rgba(138,43,226,0.9))', boxShadow: '0 12px 30px rgba(138,43,226,0.45)' }}>
              <div>
                <p className="text-white font-bold text-[11.5px] leading-tight">Going on a trip 🏕️</p>
                <p className="text-white/70 text-[8.5px] font-mono">05:18 PM</p>
              </div>
              <img src="/avatars/nt.png" className="w-7 h-7 rounded-full object-cover border border-white/40 shadow-sm shrink-0" alt="NT" />
            </div>
          </div>

          {/* 🎙 Voice chip – bottom-right */}
          <div className={`absolute z-20 hero-item ${isAnimated ? 'animate-in' : ''}`}
            style={{
              bottom: '20%', right: '0%',
              '--from-x': '-100px', '--from-y': '-120px',
              '--entry-delay': '1.05s', '--float-dur': '7.8s', '--float-delay': '2.65s'
            }}>
            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl border border-white/20 shadow-2xl backdrop-blur-xl"
              style={{ background: 'rgba(138,43,226,0.3)', boxShadow: '0 12px 35px rgba(138,43,226,0.4)' }}>
              <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 shadow-md"
                style={{ background: 'linear-gradient(135deg, #ff2a85, #8a2be2)' }}>
                <i className="fa-solid fa-play text-white text-[8px] ml-0.5" />
              </div>
              <div className="flex items-center gap-0.5 h-4">
                {[2, 4, 3, 5, 2, 4, 3, 2, 5, 3, 4, 2].map((h, i) => (
                  <div key={i} className="w-0.5 rounded-full waveform-bar"
                    style={{
                      height: `${h * 14}%`,
                      background: 'linear-gradient(to top, #ff2a85, #8a2be2)',
                      animationDelay: `${i * 0.08}s`,
                    }} />
                ))}
              </div>
            </div>
          </div>

          {/* ════════════════════════════════════
              MAIN PHONE MOCKUP
          ════════════════════════════════════ */}
          <div className="relative z-10 mockup-container w-[280px] sm:w-[305px] h-[590px] border-[6px] border-white/15 rounded-[44px] overflow-hidden"
            style={{
              background: '#07050a',
              boxShadow: '0 40px 100px rgba(0,0,0,0.95), 0 0 90px rgba(138,43,226,0.4), 0 0 0 1px rgba(255,255,255,0.1)',
            }}>

            {/* Dynamic Island notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-40 flex items-center justify-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a] border border-white/10" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#0a0a0a] border border-white/10" />
            </div>

            {/* Inner App Shell */}
            <div className="w-full h-full relative flex flex-col pt-9 bg-[#07050a] select-none">

              {/* Status Bar */}
              <div className="absolute top-0 left-0 w-full h-9 px-5 flex justify-between items-center text-[10px] font-bold text-gray-300 z-40 pointer-events-none">
                <span>10:29</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[8px]">Vo NR</span>
                  <i className="fa-solid fa-signal text-[9px]" />
                  <div className="border border-red-500/50 rounded-sm px-0.5 text-[7px] text-red-500 font-mono">13%</div>
                </div>
              </div>

              {/* App Header */}
              <div className="px-4 pt-3 pb-2.5 flex justify-between items-center bg-[#07050a] z-10 shrink-0">
                <span className="font-outfit font-black text-lg tracking-tight text-white">
                  Soosial<span className="text-brand-purple">.</span>
                </span>
                <div className="flex items-center gap-1.5">
                  <div className="bg-[#12101a] border border-white/10 pl-2.5 pr-1 py-0.5 rounded-full flex items-center gap-1 w-32">
                    <span className="text-[10px] text-gray-400 flex-1">Search...</span>
                    <button className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-black text-[8px]">
                      <i className="fa-solid fa-magnifying-glass" />
                    </button>
                  </div>
                  <button className="w-6 h-6 rounded-full bg-[#12101a] border border-white/10 text-white flex items-center justify-center text-[9px]">
                    <i className="fa-solid fa-plus" />
                  </button>
                  <button className="w-6 h-6 rounded-full bg-[#12101a] border border-white/10 text-white flex items-center justify-center text-[9px]">
                    <i className="fa-regular fa-bell" />
                  </button>
                </div>
              </div>

              {/* Stories Tray with Real Photos */}
              <div className="px-4 py-2.5 flex items-center gap-3 border-b border-white/5 shrink-0">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-br from-brand-purple to-brand-pink flex items-center justify-center">
                    <div className="w-full h-full rounded-full bg-[#07050a] flex items-center justify-center text-white text-xs">
                      <i className="fa-solid fa-plus" />
                    </div>
                  </div>
                  <span className="text-[9px] text-gray-300 font-bold">Add Story</span>
                </div>
                {[
                  { tag: 'SG', name: '@sg', img: '/avatars/sg.png' },
                  { tag: 'SK', name: '@sk', img: '/avatars/sk.png' },
                  { tag: 'NT', name: '@nt', img: '/avatars/nt.png' },
                ].map((story, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-br from-pink-500 to-purple-600">
                      <img src={story.img} className="w-full h-full rounded-full object-cover border border-[#07050a]" alt={story.tag} />
                    </div>
                    <span className="text-[8px] text-gray-400 font-medium">{story.name}</span>
                  </div>
                ))}
              </div>

              {/* Feed */}
              <div className="flex-1 overflow-y-auto px-3 py-3 bg-[#07050a] space-y-3 no-scrollbar text-left">

                {/* Post card — luxury tier */}
                <div className="relative rounded-2xl overflow-hidden" style={{background:'linear-gradient(160deg,rgba(20,14,36,0.98) 0%,rgba(8,6,18,1) 100%)',border:'1px solid rgba(168,85,247,0.22)',boxShadow:'0 0 0 1px rgba(0,0,0,0.6),0 24px 48px rgba(0,0,0,0.7),inset 0 1px 0 rgba(255,255,255,0.05)'}}>
                  {/* Dual ambient glows */}
                  <div className="absolute -top-8 -left-8 w-28 h-28 rounded-full pointer-events-none" style={{background:'radial-gradient(circle,rgba(139,92,246,0.25),transparent 70%)',filter:'blur(20px)'}} />
                  <div className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full pointer-events-none" style={{background:'radial-gradient(circle,rgba(236,72,153,0.18),transparent 70%)',filter:'blur(16px)'}} />
                  {/* Top shimmer line */}
                  <div className="absolute top-0 left-4 right-4 h-px" style={{background:'linear-gradient(90deg,transparent,rgba(168,85,247,0.5),transparent)'}} />

                  <div className="relative p-3 pb-2.5 space-y-2.5">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <div className="absolute inset-0 rounded-full animate-pulse" style={{background:'rgba(139,92,246,0.35)',filter:'blur(4px)',transform:'scale(1.2)'}} />
                          <img src="/avatars/creator.png" className="relative w-8 h-8 rounded-full object-cover" alt="Creator" style={{border:'1.5px solid rgba(168,85,247,0.7)'}} />
                          <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400" style={{border:'1.5px solid rgba(8,6,18,1)',boxShadow:'0 0 6px rgba(52,211,153,0.8)'}} />
                        </div>
                        <div>
                          <p className="font-semibold text-[10px] text-white/95 flex items-center gap-1 tracking-tight leading-none">
                            studytools_pro
                            <i className="fa-solid fa-circle-check text-[8px] text-violet-400" style={{filter:'drop-shadow(0 0 3px rgba(139,92,246,0.8))'}} />
                          </p>
                          <p className="text-[7px] text-white/30 mt-0.5 tracking-widest uppercase font-medium">3h ago · <span style={{color:'rgba(167,139,250,0.7)'}}>Promoted</span></p>
                        </div>
                      </div>
                      <button className="w-5 h-5 rounded-full flex items-center justify-center" style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.07)'}}>
                        <i className="fa-solid fa-ellipsis text-[8px] text-white/30" />
                      </button>
                    </div>

                    {/* Content card */}
                    <div onDoubleClick={handleDoubleTap} className="relative rounded-xl overflow-hidden h-[222px] flex flex-col justify-between group cursor-pointer" style={{border:'1px solid rgba(255,255,255,0.06)',boxShadow:'inset 0 0 0 1px rgba(168,85,247,0.08)'}}>
                      <img src="/avatars/post.png" className="absolute inset-0 w-full h-full object-cover scale-105 transition-transform duration-1000 group-hover:scale-110" alt="Post" />
                      {/* Dark overlay — uniform so all text is legible */}
                      <div className="absolute inset-0" style={{background:'linear-gradient(180deg,rgba(0,0,0,0.72) 0%,rgba(0,0,0,0.5) 30%,rgba(0,0,0,0.55) 60%,rgba(0,0,0,0.92) 100%)'}} />
                      {/* Edge vignette */}
                      <div className="absolute inset-0" style={{boxShadow:'inset 0 0 40px rgba(0,0,0,0.7)'}} />
                      {/* Double-tap heart */}
                      {doubleTapHeart && (
                        <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
                          <i className="fa-solid fa-heart" style={{fontSize:'64px',color:'rgba(239,68,68,0.85)',filter:'drop-shadow(0 0 20px rgba(239,68,68,0.6))',animation:'dtHeart 0.9s ease forwards'}} />
                        </div>
                      )}

                      {/* Top bar */}
                      <div className="relative z-10 flex justify-between items-center p-2.5 pt-2">
                        <span className="text-[7.5px] text-white/70 font-medium px-2 py-0.5 rounded-full tracking-widest uppercase" style={{background:'rgba(0,0,0,0.5)',backdropFilter:'blur(16px)',border:'1px solid rgba(255,255,255,0.08)'}}>studytoolsofficial</span>
                        <span className="flex items-center gap-1 text-[7px] text-white font-bold px-2 py-0.5 rounded-full tracking-widest uppercase" style={{background:'linear-gradient(135deg,rgba(236,72,153,0.9),rgba(139,92,246,0.9))',boxShadow:'0 0 14px rgba(168,85,247,0.5),0 0 4px rgba(236,72,153,0.4)'}}>
                          <span className="w-1 h-1 rounded-full bg-white animate-pulse inline-block" />LIVE
                        </span>
                      </div>

                      {/* Center content — frosted dark panel */}
                      <div className="relative z-10 px-2.5 space-y-1.5" style={{background:'rgba(0,0,0,0.35)',backdropFilter:'blur(4px)',borderRadius:'10px',padding:'6px 10px'}}>
                        {/* Editorial label */}
                        <div className="flex items-center gap-1.5">
                          <div className="h-px flex-1" style={{background:'linear-gradient(90deg,transparent,rgba(168,85,247,0.4))'}} />
                          <span className="text-[6.5px] tracking-[0.25em] uppercase font-semibold" style={{color:'rgba(216,180,254,0.85)'}}>Exclusive Drop</span>
                          <div className="h-px flex-1" style={{background:'linear-gradient(90deg,rgba(168,85,247,0.4),transparent)'}} />
                        </div>
                        {/* Title */}
                        <h4 className="text-center text-[11px] font-black leading-snug tracking-widest uppercase" style={{color:'#fff',textShadow:'0 0 18px rgba(168,85,247,0.9),0 2px 12px rgba(0,0,0,1)'}}>
                          05 Secret<br/>
                          <span style={{color:'#c084fc'}}>Gemini Codes</span>
                        </h4>
                        {/* Code list — chip style */}
                        <div className="flex flex-wrap justify-center gap-1 pt-0.5">
                          {[['🎨','/Visualize','#c084fc'],['📚','/Teach','#818cf8'],['⚡','/Analyze','#34d399']].map(([e,c,col])=>(
                            <div key={c} className="flex items-center gap-1 px-1.5 py-0.5 rounded-lg" style={{background:'rgba(0,0,0,0.82)',backdropFilter:'blur(16px)',border:`1px solid ${col}55`}}>
                               <span className="text-[8px]">{e}</span>
                               <span className="text-[7.5px] font-mono font-bold" style={{color:col,textShadow:`0 0 6px ${col}99`}}>{c}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action bar */}
                      <div className="relative z-10 flex justify-between items-center px-2.5 pb-2">
                        {shareToast && (
                          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[8px] font-bold text-white px-2 py-0.5 rounded-full z-20" style={{background:'linear-gradient(135deg,#38bdf8,#818cf8)',boxShadow:'0 0 10px rgba(56,189,248,0.5)'}}>Link Copied!</div>
                        )}
                        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full" style={{background:'rgba(0,0,0,0.65)',backdropFilter:'blur(20px)',border:'1px solid rgba(255,255,255,0.08)'}}>
                          {/* Like */}
                          <span onClick={()=>setLiked(l=>!l)} className="flex items-center gap-1 text-[8px] font-semibold cursor-pointer transition-all hover:scale-125 active:scale-95 select-none" style={{color: liked ? '#f472b6' : 'rgba(255,255,255,0.4)'}}>
                            <i className={liked ? 'fa-solid fa-heart' : 'fa-regular fa-heart'} style={{filter: liked ? 'drop-shadow(0 0 4px #f472b688)' : 'none', transition:'all 0.2s'}} />
                            <span style={{color: liked ? '#f9a8d4' : 'rgba(255,255,255,0.5)'}}>{liked ? '4.3k' : '4.3k'}</span>
                          </span>
                          {/* Comment */}
                          <span className="flex items-center gap-1 text-[8px] font-semibold cursor-pointer hover:scale-125 active:scale-95 transition-all select-none" style={{color:'#a78bfa'}}>
                            <i className="fa-regular fa-comment" style={{filter:'drop-shadow(0 0 3px #a78bfa55)'}} />
                            <span className="text-white/50">{commentCount}</span>
                          </span>
                          {/* Repost */}
                          <span onClick={()=>setReposted(r=>!r)} className="flex items-center gap-1 text-[8px] font-semibold cursor-pointer hover:scale-125 active:scale-95 transition-all select-none" style={{color: reposted ? '#34d399' : 'rgba(255,255,255,0.4)'}}>
                            <i className="fa-solid fa-retweet" style={{filter: reposted ? 'drop-shadow(0 0 4px #34d39988)' : 'none', transition:'all 0.2s'}} />
                          </span>
                          {/* Share */}
                          <span onClick={()=>{ setShareToast(true); setTimeout(()=>setShareToast(false),1500); }} className="flex items-center gap-1 text-[8px] font-semibold cursor-pointer hover:scale-125 active:scale-95 transition-all select-none" style={{color:'#38bdf8'}}>
                            <i className="fa-regular fa-paper-plane" style={{filter:'drop-shadow(0 0 3px #38bdf855)'}} />
                          </span>
                        </div>
                        {/* Bookmark */}
                        <div onClick={()=>setBookmarked(b=>!b)} className="w-5 h-5 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-transform" style={{background: bookmarked ? 'rgba(139,92,246,0.3)' : 'rgba(0,0,0,0.6)', backdropFilter:'blur(16px)', border: bookmarked ? '1px solid rgba(168,85,247,0.6)' : '1px solid rgba(168,85,247,0.2)'}}>
                          <i className={bookmarked ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark'} style={{fontSize:'8px', color: bookmarked ? '#c084fc' : '#a78bfa', filter: bookmarked ? 'drop-shadow(0 0 4px #c084fc88)' : 'none', transition:'all 0.2s'}} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom nav */}
              <div className="px-5 py-3 bg-[#07050a] border-t border-white/5 flex justify-between items-center shrink-0">
                <button className="text-brand-purple"><i className="fa-solid fa-house text-base" /></button>
                <button className="text-gray-500 hover:text-white transition-colors"><i className="fa-solid fa-clapperboard text-base" /></button>
                <button className="text-gray-500 hover:text-white transition-colors"><i className="fa-solid fa-message text-base" /></button>
                <button className="text-gray-500 hover:text-white transition-colors"><i className="fa-solid fa-user text-base" /></button>
              </div>

            </div>
          </div>

          {/* ── Animation system (Scroll-Triggered & Entrance) ── */}
          <style>{`
            /* ── Shifting Ambient Gradient Text ── */
            .hero-gradient-animated {
              background: linear-gradient(135deg, #ff5e00 0%, #ff2a85 35%, #8a2be2 70%, #ff5e00 100%);
              background-size: 300% 300%;
              animation: gradientShift 6s ease infinite;
            }

            @keyframes gradientShift {
              0%   { background-position: 0% 50%; }
              50%  { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }

            /* ── Header Entrance Animations ── */
            @keyframes heroFadeUp {
              0% {
                opacity: 0;
                transform: translateY(24px) scale(0.97);
                filter: blur(8px);
              }
              100% {
                opacity: 1;
                transform: translateY(0) scale(1);
                filter: blur(0px);
              }
            }

            @keyframes floatUp {
              0% {
                opacity: 0;
                transform: translateY(10px) scale(0.7);
              }
              20% {
                opacity: 1;
                transform: translateY(-5px) scale(1.1);
              }
              80% {
                opacity: 1;
                transform: translateY(-35px) scale(1);
              }
              100% {
                opacity: 0;
                transform: translateY(-55px) scale(0.8);
              }
            }

            .animate-float-up {
              animation: floatUp 1.8s ease-out forwards;
            }

            .hero-entrance-1 { animation: heroFadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both; }
            .hero-entrance-2 { animation: heroFadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both; }
            .hero-entrance-3 { animation: heroFadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both; }
            .hero-entrance-4 { animation: heroFadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.55s both; }

            /* ── Default state: hidden before scroll ── */
            .hero-item {
              opacity: 0;
              pointer-events: none;
            }

            /* ── Active state: triggers on scroll ── */
            .hero-item.animate-in {
              opacity: 1;
              pointer-events: auto;
              animation:
                flyFromPhone 1.6s cubic-bezier(0.16, 1, 0.3, 1) var(--entry-delay, 0s) both,
                heroFloat    var(--float-dur, 6.5s) ease-in-out var(--float-delay, 2s) infinite;
            }

            /* ── 1. Entry: Smooth, luxurious burst out from phone center ── */
            @keyframes flyFromPhone {
              0% {
                opacity: 0;
                filter: blur(18px);
                transform:
                  translateX(var(--from-x, 0px))
                  translateY(var(--from-y, 0px))
                  scale(0.1);
              }
              65% {
                opacity: 1;
                filter: blur(0px);
                transform:
                  translateX(calc(var(--from-x, 0px) * -0.04))
                  translateY(calc(var(--from-y, 0px) * -0.04))
                  scale(1.04);
              }
              100% {
                opacity: 1;
                filter: blur(0px);
                transform: translateX(0) translateY(0) scale(1);
              }
            }

            /* ── 2. Idle: Gentle, ultra-smooth floating loop ── */
            @keyframes heroFloat {
              0%   { transform: translateY(0px) rotate(0deg); }
              25%  { transform: translateY(-8px) rotate(0.8deg); }
              50%  { transform: translateY(-14px) rotate(0deg); }
              75%  { transform: translateY(-8px) rotate(-0.8deg); }
              100% { transform: translateY(0px) rotate(0deg); }
            }

            /* ── 3. Waveform bars pulse ── */
            @keyframes waveformPulse {
              0%, 100% { transform: scaleY(0.25); opacity: 0.45; }
              50%       { transform: scaleY(1);    opacity: 1; }
            }

            .waveform-bar {
              animation: waveformPulse 0.9s ease-in-out infinite;
            }
          `}</style>

        </div>
      </div>
    </section>
  );
}

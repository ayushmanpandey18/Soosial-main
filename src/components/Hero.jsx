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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col lg:grid lg:grid-cols-12 items-center gap-10 lg:gap-8">

        {/* 🚀 LEFT COLUMN: Narrative Header & Actions */}
        <div className="lg:col-span-7 w-full text-center lg:text-left space-y-6 flex flex-col items-center lg:items-start">

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

          {/* 🌟 INTERACTIVE HEADLINE CONTAINER 🌟 */}
          <div
            ref={headlineRef}
            onMouseMove={handleHeadlineMouseMove}
            className="hero-entrance-2 relative w-full max-w-3xl p-6 sm:p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-white/20 group text-center lg:text-left"
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
            <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-black font-outfit leading-tight tracking-tight text-white drop-shadow-2xl">
              Where{' '}
              <span
                onClick={handleCreatorsClick}
                className="relative inline-flex items-center px-3 py-1 rounded-2xl bg-white/10 border border-white/20 hover:border-pink-500/60 hover:bg-pink-500/15 hover:scale-105 transition-all cursor-pointer group/creator"
                title="Click to test Creator Avatar pop!"
              >
                <span className="text-white">Creators</span>
                <span className="ml-2 text-[10px] bg-pink-500 text-white font-mono px-2 py-0.5 rounded-full shadow-md animate-pulse">
                  👥 Tap
                </span>
              </span>
              <br />

              {/* 🌟 "MONETIZE DAY 1." HERO TITLE 🌟 */}
              <span
                onClick={handleMonetizeClick}
                className="relative inline-block mt-2 cursor-pointer group/monetize hover:scale-[1.03] transition-transform duration-300 max-w-full"
                title="Click to simulate instant INR Escrow Payout!"
              >
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/40 via-pink-500/40 to-purple-600/40 blur-2xl opacity-70 group-hover/monetize:opacity-100 transition-opacity pointer-events-none"></span>

                <span className="relative z-10 block text-4xl xs:text-5xl sm:text-6xl lg:text-7xl font-black font-outfit tracking-tight bg-gradient-to-r from-orange-400 via-pink-500 to-purple-400 bg-clip-text text-transparent pb-1">
                  Monetize Day 1.
                </span>

                <span className="absolute -top-3.5 -right-3 sm:-right-6 text-[9.5px] sm:text-xs bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black font-mono px-2 py-0.5 sm:py-1 rounded-full shadow-2xl border border-emerald-300/50 animate-bounce flex items-center gap-1">
                  <i className="fa-solid fa-coins text-yellow-300"></i>
                  <span>Tap ₹ Demo</span>
                </span>
              </span>
            </h1>

            {/* Floating Payout Popups */}
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

            {/* Floating Avatar Popups */}
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
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-4">
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
          <p className="hero-entrance-3 text-gray-300 text-sm sm:text-base leading-relaxed font-light max-w-2xl text-center lg:text-left">
            Soosial is India's premium, high-security social architecture built to empower creators. Enjoy absolute privacy with zero database leaks. Monetize from Day 1 through direct business-to-creator bookings and curate your intellect with our non-addictive Persona stream.
          </p>

          {/* Live Metrics Ticker */}
          <div className="hero-entrance-3 flex flex-wrap items-center justify-center lg:justify-start gap-2.5 py-1">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-gray-300 backdrop-blur-md">
              <span className="text-emerald-400 font-mono">₹ 100%</span> Escrow Protected
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-gray-300 backdrop-blur-md">
              <span className="text-brand-orange">🛡️ 0 Leak</span> Indian Server Hosting
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-gray-300 backdrop-blur-md">
              <span className="text-brand-pink">⚡ Instant</span> Vocal Feed Reactions
            </div>
          </div>

          {/* Value Points Grid */}
          <div className="hero-entrance-4 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 text-left w-full max-w-2xl">
            <div className="group relative flex items-start gap-3 bg-gradient-to-br from-white/10 to-white/5 p-3.5 rounded-2xl border border-white/15 backdrop-blur-xl transition-all hover:border-brand-orange/50">
              <div className="w-9 h-9 rounded-xl bg-brand-orange/20 border border-brand-orange/40 flex items-center justify-center shrink-0">
                <i className="fa-solid fa-shield-halved text-brand-orange text-base"></i>
              </div>
              <div>
                <h4 className="font-bold text-white text-xs font-outfit flex items-center gap-1">
                  Sovereign Data Shield
                  <span className="text-[8px] font-mono text-emerald-400 bg-emerald-500/10 px-1 py-0.2 rounded border border-emerald-500/20">Active</span>
                </h4>
                <p className="text-[11px] text-gray-300 mt-0.5 font-light leading-snug">100% local hosting within India protecting your chats & files.</p>
              </div>
            </div>

            <div className="group relative flex items-start gap-3 bg-gradient-to-br from-white/10 to-white/5 p-3.5 rounded-2xl border border-white/15 backdrop-blur-xl transition-all hover:border-brand-pink/50">
              <div className="w-9 h-9 rounded-xl bg-brand-pink/20 border border-brand-pink/40 flex items-center justify-center shrink-0">
                <i className="fa-solid fa-microphone text-brand-pink text-base"></i>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-xs font-outfit">Infinite Voice Comments</h4>
                  <button
                    onClick={(e) => { e.stopPropagation(); handlePlayVoice(); }}
                    className="px-2 py-0.5 rounded bg-brand-pink/20 border border-brand-pink/40 text-white text-[8px] font-bold flex items-center gap-1"
                  >
                    <i className={`fa-solid ${isPlaying ? 'fa-volume-high animate-bounce' : 'fa-play'}`}></i> Test
                  </button>
                </div>
                <p className="text-[11px] text-gray-300 mt-0.5 font-light leading-snug">Comment using vocal notes. Express real human sentiment.</p>
              </div>
            </div>
          </div>

          {/* App Store Downloads & Direct CTA */}
          <div className="hero-entrance-4 flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2" id="download-assets">
            <button
              onClick={() => onBookCreator && onBookCreator('Ganesh KGP', '1x Dedicated SOOS', 15000)}
              className="px-5 py-3 rounded-xl text-white font-black text-xs transition-all hover:scale-105 cursor-pointer flex items-center gap-2 shadow-2xl border border-white/20"
              style={{ background: 'linear-gradient(135deg, #ff2a85 0%, #ff5e00 50%, #8a2be2 100%)' }}
            >
              <i className="fa-solid fa-bolt text-yellow-300 animate-pulse"></i>
              <span>Book Creator Escrow</span>
              <i className="fa-solid fa-arrow-right text-xs"></i>
            </button>

            <a href="#download" onClick={(e) => e.preventDefault()} className="flex items-center gap-2.5 bg-brand-dark border border-white/15 rounded-xl px-4 py-2.5 hover:border-brand-orange/60">
              <i className="fa-brands fa-google-play text-xl text-brand-orange"></i>
              <div className="text-left">
                <span className="block text-[8px] uppercase text-gray-400 font-bold">Acquire on</span>
                <span className="font-outfit font-black text-xs text-white">Google Play</span>
              </div>
            </a>

            <a href="#download" onClick={(e) => e.preventDefault()} className="flex items-center gap-2.5 bg-brand-dark border border-white/15 rounded-xl px-4 py-2.5 hover:border-brand-purple/60">
              <i className="fa-brands fa-apple text-xl text-brand-pink"></i>
              <div className="text-left">
                <span className="block text-[8px] uppercase text-gray-400 font-bold">Download from</span>
                <span className="font-outfit font-black text-xs text-white">App Store</span>
              </div>
            </a>
          </div>

        </div>

        {/* ── RIGHT COLUMN: Premium Floating Phone Hero ── */}
        <div ref={phoneRef} className="lg:col-span-5 w-full flex justify-center items-center relative min-h-[560px] sm:min-h-[640px]">

          {/* Ambient radial glow behind phone */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[380px] h-[380px] rounded-full blur-[110px] opacity-40 animate-pulse-slow"
              style={{ background: 'radial-gradient(circle, #8a2be2 0%, #ff2a85 50%, transparent 80%)' }} />
          </div>

          {/* 📊 Live Followers Counter – top-left */}
          <div className={`absolute z-20 hero-item ${isAnimated ? 'animate-in' : ''}`}
            style={{ top: '4%', left: '0%', '--from-x': '60px', '--from-y': '140px', '--entry-delay': '0.2s', '--float-dur': '6.5s', '--float-delay': '1.8s' }}>
            <div className="flex items-center gap-2 px-3 py-2 rounded-2xl shadow-2xl border border-white/20 backdrop-blur-md" style={{ background: 'rgba(13,9,26,0.92)' }}>
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shrink-0">
                <i className="fa-solid fa-users text-[8px] text-white" />
              </div>
              <div>
                <p className="text-white font-black text-[10.5px] leading-tight">+1.2K</p>
                <p className="text-purple-400 text-[7px] font-medium">New followers</p>
              </div>
            </div>
          </div>

          {/* 🔥 Trending Badge – left mid */}
          <div className={`absolute z-20 hero-item ${isAnimated ? 'animate-in' : ''}`}
            style={{ top: '26%', left: '-5%', '--from-x': '100px', '--from-y': '60px', '--entry-delay': '0.45s', '--float-dur': '7s', '--float-delay': '2.05s' }}>
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full shadow-xl border border-orange-500/40 backdrop-blur-sm" style={{ background: 'rgba(255,94,0,0.18)' }}>
              <span className="text-base">🔥</span>
              <div>
                <p className="text-orange-400 font-black text-[9px] leading-tight">#Trending</p>
                <p className="text-white/60 text-[7px]">Top creator</p>
              </div>
            </div>
          </div>

          {/* 💬 Message bubble – bottom-left */}
          <div className={`absolute z-20 hero-item ${isAnimated ? 'animate-in' : ''}`}
            style={{ bottom: '22%', left: '-4%', '--from-x': '90px', '--from-y': '-80px', '--entry-delay': '0.6s', '--float-dur': '6.6s', '--float-delay': '2.2s' }}>
            <div className="flex items-center gap-2 px-3 py-2 rounded-2xl rounded-bl-sm shadow-2xl border border-white/20 backdrop-blur-md"
              style={{ background: 'linear-gradient(135deg, rgba(255,42,133,0.9), rgba(255,94,0,0.9))' }}>
              <img src="/avatars/sg.png" className="w-6 h-6 rounded-full object-cover border border-white/40 shadow-sm shrink-0" alt="SG" />
              <div>
                <p className="text-white font-bold text-[10.5px] leading-tight">What's up? 👋</p>
                <p className="text-white/70 text-[7.5px] font-mono">Just now • DM</p>
              </div>
            </div>
          </div>

          {/* ✨ Emoji reactions row – top-right */}
          <div className={`absolute z-20 hero-item ${isAnimated ? 'animate-in' : ''}`}
            style={{ top: '6%', right: '-2%', '--from-x': '-60px', '--from-y': '140px', '--entry-delay': '0.35s', '--float-dur': '6.2s', '--float-delay': '1.95s' }}>
            <div className="flex gap-1 px-2.5 py-1.5 rounded-2xl backdrop-blur-md shadow-xl border border-white/15" style={{ background: 'rgba(13,9,26,0.88)' }}>
              {['❤️', '🔥', '😍', '👏'].map((e, i) => (
                <span key={i} className="text-sm cursor-pointer hover:scale-125 transition-transform">{e}</span>
              ))}
            </div>
          </div>

          {/* 💰 Earnings card – right mid */}
          <div className={`absolute z-20 hero-item ${isAnimated ? 'animate-in' : ''}`}
            style={{ top: '20%', right: '-6%', '--from-x': '-80px', '--from-y': '100px', '--entry-delay': '0.5s', '--float-dur': '7.2s', '--float-delay': '2.1s' }}>
            <div className="w-28 rounded-2xl p-3 shadow-2xl border border-white/20 backdrop-blur-md" style={{ background: 'rgba(13,9,26,0.92)' }}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[7.5px] text-gray-400 font-medium uppercase tracking-wide">Earnings</span>
                <i className="fa-solid fa-arrow-trend-up text-emerald-400 text-[9px]" />
              </div>
              <p className="text-white font-black text-base leading-tight">₹48K</p>
              <p className="text-emerald-400 text-[7.5px] font-medium mt-0.5">+24% this week</p>
              <div className="mt-2 h-1 rounded-full bg-white/10">
                <div className="h-full w-3/4 rounded-full" style={{ background: 'linear-gradient(90deg, #8a2be2, #ff2a85)' }} />
              </div>
            </div>
          </div>

          {/* 👁 Story views – bottom-right */}
          <div className={`absolute z-20 hero-item ${isAnimated ? 'animate-in' : ''}`}
            style={{ bottom: '18%', right: '-3%', '--from-x': '-70px', '--from-y': '-60px', '--entry-delay': '0.65s', '--float-dur': '6.8s', '--float-delay': '2.3s' }}>
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full shadow-xl border border-cyan-500/30 backdrop-blur-sm" style={{ background: 'rgba(6,182,212,0.12)' }}>
              <i className="fa-solid fa-eye text-cyan-400 text-[9px]" />
              <p className="text-cyan-300 font-black text-[9px]">8.4K views</p>
            </div>
          </div>

          {/* ════════════════════════════════════
              MAIN PHONE MOCKUP
          ════════════════════════════════════ */}
          <div className={`relative z-10 mockup-container w-[275px] sm:w-[295px] h-[580px] border-[6px] border-white/15 rounded-[42px] overflow-hidden ${isAnimated ? 'phone-animate-in' : 'phone-pre-enter'}`}
            style={{
              background: '#07050a',
              boxShadow: '0 40px 100px rgba(0,0,0,0.95), 0 0 90px rgba(138,43,226,0.4), 0 0 0 1px rgba(255,255,255,0.1)',
            }}>

            {/* Dynamic Island notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-40 flex items-center justify-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a] border border-white/10" />
              <div className="w-2 h-2 rounded-full bg-[#0a0a0a] border border-white/10" />
            </div>

            {/* Inner App Shell */}
            <div className="w-full h-full relative flex flex-col pt-8 bg-[#07050a] select-none text-left">

              {/* Status Bar */}
              <div className="absolute top-0 left-0 w-full h-8 px-5 flex justify-between items-center text-[9.5px] font-bold text-gray-300 z-40 pointer-events-none">
                <span>10:29</span>
                <div className="flex items-center gap-1">
                  <span className="text-[7.5px]">5G+</span>
                  <i className="fa-solid fa-signal text-[8px]" />
                  <div className="border border-white/30 rounded-sm px-0.5 text-[6.5px] font-mono">13%</div>
                </div>
              </div>

              {/* App Header */}
              <div className="px-3.5 pt-2 pb-2 flex justify-between items-center bg-[#07050a] z-10 shrink-0">
                <span className="font-serif italic font-black text-lg tracking-tight text-white">
                  Soosial.
                </span>
                <div className="flex items-center gap-1.5">
                  <div className="bg-[#12101a] border border-white/10 pl-2 pr-1 py-0.5 rounded-full flex items-center gap-1 w-28">
                    <span className="text-[9px] text-gray-400 flex-1 truncate">Search...</span>
                    <button className="w-4.5 h-4.5 rounded-full bg-white flex items-center justify-center text-black text-[7px]">
                      <i className="fa-solid fa-magnifying-glass" />
                    </button>
                  </div>
                  <button className="w-5.5 h-5.5 rounded-full bg-[#12101a] border border-white/10 text-white flex items-center justify-center text-[8.5px]">
                    <i className="fa-solid fa-plus" />
                  </button>
                  <button className="w-5.5 h-5.5 rounded-full bg-[#12101a] border border-white/10 text-white flex items-center justify-center text-[8.5px]">
                    <i className="fa-regular fa-bell" />
                  </button>
                </div>
              </div>

              {/* Stories Tray with Individual Creators */}
              <div className="px-3 py-2 flex items-center gap-2.5 border-b border-white/5 shrink-0 overflow-x-auto no-scrollbar">
                {/* Add Story */}
                <div className="flex flex-col items-center gap-0.5 shrink-0">
                  <div className="w-8 h-8 rounded-full p-[1.5px] bg-gradient-to-br from-brand-purple to-brand-pink flex items-center justify-center">
                    <div className="w-full h-full rounded-full bg-[#07050a] flex items-center justify-center text-white text-[9px]">
                      <i className="fa-solid fa-plus" />
                    </div>
                  </div>
                  <span className="text-[7.5px] text-gray-300 font-bold">Add</span>
                </div>

                {/* Individual Stories */}
                {[
                  { name: '@sg', img: '/avatars/sg.png', gradient: 'from-pink-500 to-purple-600' },
                  { name: '@sk', img: '/avatars/sk.png', gradient: 'from-orange-500 to-pink-500' },
                  { name: '@nt', img: '/avatars/nt.png', gradient: 'from-cyan-500 to-blue-600' },
                  { name: '@pranav', img: '/avatars/creator.png', gradient: 'from-purple-500 to-indigo-600' },
                  { name: '@aarav', initial: 'AK', gradient: 'from-emerald-400 to-teal-600' },
                ].map((story, i) => (
                  <div key={i} className="flex flex-col items-center gap-0.5 shrink-0 cursor-pointer">
                    <div className={`w-8 h-8 rounded-full p-[1.5px] bg-gradient-to-br ${story.gradient}`}>
                      {story.img ? (
                        <img src={story.img} className="w-full h-full rounded-full object-cover border border-[#07050a]" alt={story.name} />
                      ) : (
                        <div className="w-full h-full rounded-full bg-[#0d091a] flex items-center justify-center text-[7.5px] font-bold text-white">
                          {story.initial}
                        </div>
                      )}
                    </div>
                    <span className="text-[7.5px] text-gray-400 font-medium truncate max-w-[36px]">{story.name}</span>
                  </div>
                ))}
              </div>

              {/* Feed Content matching homepage.jpeg */}
              <div className="flex-1 overflow-y-auto px-3 py-2 bg-[#07050a] space-y-3 no-scrollbar text-left">

                {/* POST CONTAINER MATCHING HOMEPAGE.JPEG */}
                <div className="bg-[#0b0914] border border-white/10 rounded-2xl p-2.5 space-y-2 relative shadow-xl">

                  {/* Post User Header Row */}
                  <div className="flex items-center justify-between px-1 pb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 p-[1.5px] shadow-md shrink-0">
                        <div className="w-full h-full rounded-full bg-[#0d091a] flex items-center justify-center text-white text-[10px] font-extrabold font-mono">
                          P
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-bold text-white tracking-tight">
                          princekuma3067
                        </span>
                        <span className="text-[10px]" title="Laptop">💻</span>
                      </div>
                    </div>

                    <button className="w-6 h-6 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer">
                      <i className="fa-solid fa-ellipsis-vertical text-xs" />
                    </button>
                  </div>

                  {/* Inner Dark Media Card with homepage.jpeg post image */}
                  <div onDoubleClick={handleDoubleTap} className="relative rounded-2xl overflow-hidden bg-[#050408] border border-white/10 p-2 space-y-2 cursor-pointer group">

                    {/* Post Screenshot Image Box */}
                    <div className="relative rounded-xl overflow-hidden h-[220px] w-full border border-white/10 bg-black flex items-center justify-center">
                      <img src="/homepage.jpeg" className="w-full h-full object-cover object-[center_60%] scale-[1.28] group-hover:scale-[1.33] transition-transform duration-500" alt="Homepage post" />

                      {/* Subtle Dark Gradient Overlay for high-end look */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

                      {/* Double-tap heart */}
                      {doubleTapHeart && (
                        <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
                          <i className="fa-solid fa-heart" style={{fontSize:'54px',color:'rgba(239,68,68,0.85)',filter:'drop-shadow(0 0 20px rgba(239,68,68,0.6))',animation:'dtHeart 0.9s ease forwards'}} />
                        </div>
                      )}
                    </div>

                    {/* Bottom Action Bar inside post container */}
                    <div className="flex justify-between items-center pt-2 border-t border-white/10 text-gray-300 text-[10px]">
                      <div className="flex items-center gap-3">
                        {/* Heart / Likes */}
                        <button onClick={() => setLiked(l => !l)} className="flex items-center gap-1 cursor-pointer hover:text-pink-400 transition-colors">
                          <i className={liked ? "fa-solid fa-heart text-pink-500" : "fa-regular fa-heart"} />
                          <span className="text-[8.5px] font-mono">{liked ? 43 : 43}</span>
                        </button>

                        {/* Comment */}
                        <div className="flex items-center gap-1 cursor-pointer">
                          <i className="fa-regular fa-comment" />
                          <span className="text-[8.5px] font-mono">23</span>
                        </div>

                        {/* Repost */}
                        <button onClick={() => setReposted(r => !r)} className="cursor-pointer hover:text-emerald-400 transition-colors">
                          <i className={`fa-solid fa-retweet ${reposted ? 'text-emerald-400' : ''}`} />
                        </button>

                        {/* Share */}
                        <button onClick={() => { setShareToast(true); setTimeout(() => setShareToast(false), 1500); }} className="cursor-pointer hover:text-cyan-400 transition-colors">
                          <i className="fa-regular fa-paper-plane" />
                        </button>
                      </div>

                      {/* Bookmark */}
                      <button onClick={() => setBookmarked(b => !b)} className="cursor-pointer hover:text-purple-400 transition-colors">
                        <i className={bookmarked ? "fa-solid fa-bookmark text-purple-400" : "fa-regular fa-bookmark"} />
                      </button>
                    </div>

                  </div>
                </div>

              </div>

              {/* Bottom Nav matching homepage.jpeg icons 100% */}
              <div className="px-6 py-2.5 bg-[#07050a] border-t border-white/10 flex justify-between items-center shrink-0 text-white">
                {/* 1. Home */}
                <button className="text-purple-400 hover:scale-110 transition-transform flex items-center justify-center">
                  <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </button>

                {/* 2. Media / Feed Card (matching homepage.jpeg 2nd icon) */}
                <button className="text-gray-400 hover:text-white transition-colors hover:scale-110 flex items-center justify-center">
                  <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="4" />
                    <line x1="7" y1="12" x2="14" y2="12" />
                    <line x1="7" y1="16" x2="11" y2="16" />
                  </svg>
                </button>

                {/* 3. Message / Chat */}
                <button className="text-gray-400 hover:text-white transition-colors hover:scale-110 flex items-center justify-center">
                  <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    <line x1="8" y1="10" x2="16" y2="10" />
                    <line x1="8" y1="14" x2="13" y2="14" />
                  </svg>
                </button>

                {/* 4. Profile */}
                <button className="text-gray-400 hover:text-white transition-colors hover:scale-110 flex items-center justify-center">
                  <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </button>
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

            /* ── Phone Mockup — Premium Cinematic Entrance ── */
            .phone-pre-enter {
              opacity: 0;
              transform: perspective(1200px) rotateX(12deg) translateY(30px) scale(0.95);
              filter: blur(6px);
            }

            @keyframes phoneReveal {
              0% {
                opacity: 0;
                transform: perspective(1200px) rotateX(14deg) translateY(28px) scale(0.94);
                filter: blur(8px);
              }
              60% {
                opacity: 1;
                filter: blur(0px);
                transform: perspective(1200px) rotateX(2deg) translateY(-4px) scale(1.01);
              }
              100% {
                opacity: 1;
                filter: blur(0px);
                transform: perspective(1200px) rotateX(0deg) translateY(0px) scale(1);
              }
            }

            @keyframes luxuryFloat {
              0%, 100% { transform: translateY(0px); }
              50%       { transform: translateY(-10px); }
            }

            .phone-animate-in {
              animation:
                phoneReveal  1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.1s both,
                luxuryFloat  5s   ease-in-out 1.8s infinite;
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

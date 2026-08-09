import React, { useState, useRef, useEffect } from 'react';
import { playClickSound, playCustomStudioVoice, playDemoSound } from '../utils/audio';

export default function CanvaStudio({ onBookCreator }) {
  // Mobile app screen view state
  // activeScreen: 'profile' | 'settings' | 'collabSettings' | 'domain' | 'opportunities' | 'comments'
  const [activeScreen, setActiveScreen] = useState('profile');

  // Settings & configuration state
  const [activeDomain, setActiveDomain] = useState('Technology');
  const [availableForCollabs, setAvailableForCollabs] = useState(true);
  const [showPhoneInCollabs, setShowPhoneInCollabs] = useState(false);
  const [creatorName, setCreatorName] = useState('USER NAME');
  const [personaMode, setPersonaMode] = useState('professional'); // 'professional' | 'creative'
  const [phoneDarkMode, setPhoneDarkMode] = useState(true);

  // Rate cards pricing configured on the left panel
  const [soosRate, setSoosRate] = useState(1500);
  const [storyRate, setStoryRate] = useState(800);
  const [shoutoutRate, setShoutoutRate] = useState(1200);
  const [collabRate, setCollabRate] = useState(3500);

  // Sound states
  const [isSynthPlaying, setIsSynthPlaying] = useState(false);

  // Domain selection state
  const [tempDomain, setTempDomain] = useState('Technology');

  // Automated Tour / Coded Video Walkthrough State
  const [isTourActive, setIsTourActive] = useState(false);
  const [tourStep, setTourStep] = useState(0);
  const [tourSubtitle, setTourSubtitle] = useState('');
  const [touchCursor, setTouchCursor] = useState({ x: 160, y: 250, visible: false });

  // Refs to manage tour timers and intervals securely without memory leaks
  const tourTimerRef = useRef(null);
  const tourIntervalRef = useRef(null);

  // Comments state
  const [commentsList, setCommentsList] = useState([
    { id: 1, user: 'sonalikapoor3708', text: 'Mast hai!', time: '2 days' },
    { id: 2, user: 'nehatiwari8097', text: 'â¤ï¸ nice one', time: '2 days' },
    { id: 3, user: 'divyasharma9526', text: 'Ekdum mast!', time: '2 days' },
    { id: 4, user: 'vishalmenon8649', text: 'Splendid!', time: '2 days' },
    { id: 5, user: 'abhishekpillai8580', text: 'So nice!', time: '2 days' },
    { id: 6, user: 'tanvibhatt2359', text: 'Too good yaar!', time: '2 days' },
    { id: 7, user: 'manojbhatt2490', text: 'ðŸ˜ awesome', time: '2 days' }
  ]);
  const [newCommentText, setNewCommentText] = useState('');
  const commentsEndRef = useRef(null);

  // Audio utilities
  const handleSynthesizeSound = () => {
    setIsSynthPlaying(true);
    playCustomStudioVoice();
    setTimeout(() => setIsSynthPlaying(false), 800);
  };

  const handleSoundTone = (freq = 440, duration = 0.3) => {
    playDemoSound(freq, duration, 'sine');
  };

  // Automated Coded Tour playback timelines
  const startTour = () => {
    stopTour(); // Stop any running sequences
    setActiveScreen('profile');
    setTempDomain('Technology');
    setActiveDomain('Technology');
    setAvailableForCollabs(true);
    setShowPhoneInCollabs(false);
    setNewCommentText('');
    setTourStep(0);
    setIsTourActive(true);
  };

  const stopTour = () => {
    setIsTourActive(false);
    setTourStep(0);
    setTouchCursor({ x: 160, y: 250, visible: false });
    setTourSubtitle('');
    if (tourTimerRef.current) clearTimeout(tourTimerRef.current);
    if (tourIntervalRef.current) clearInterval(tourIntervalRef.current);
  };

  // Monitor Automated Tour sequence steps
  useEffect(() => {
    if (!isTourActive) {
      if (tourTimerRef.current) clearTimeout(tourTimerRef.current);
      if (tourIntervalRef.current) clearInterval(tourIntervalRef.current);
      return;
    }

    // Clear active actions before executing next step
    if (tourTimerRef.current) clearTimeout(tourTimerRef.current);
    if (tourIntervalRef.current) clearInterval(tourIntervalRef.current);

    switch (tourStep) {
      case 0:
        setTouchCursor({ x: 160, y: 250, visible: false });
        setTourSubtitle("Starting Soosial Collaboration UI video walkthrough...");
        tourTimerRef.current = setTimeout(() => {
          setTouchCursor({ x: 282, y: 46, visible: true });
          setTourSubtitle("Step 1: Opening the creator Profile Settings cog...");
          setTourStep(1);
        }, 1800);
        break;
      case 1:
        tourTimerRef.current = setTimeout(() => {
          playClickSound();
          setActiveScreen('settings');
          setTouchCursor({ x: 160, y: 220, visible: true });
          setTourSubtitle("Step 2: Accessing account setup directories & collaborations...");
          setTourStep(2);
        }, 1800);
        break;
      case 2:
        tourTimerRef.current = setTimeout(() => {
          playClickSound();
          setActiveScreen('collabSettings');
          setTouchCursor({ x: 160, y: 130, visible: true });
          setTourSubtitle("Step 3: Entering Collaboration settings to edit pricing and niches...");
          setTourStep(3);
        }, 2200);
        break;
      case 3:
        tourTimerRef.current = setTimeout(() => {
          playClickSound();
          setActiveScreen('domain');
          setTouchCursor({ x: 160, y: 290, visible: true });
          setTourSubtitle("Step 4: Customizing content domain to match brand filter options...");
          setTourStep(4);
        }, 2200);
        break;
      case 4:
        tourTimerRef.current = setTimeout(() => {
          playClickSound();
          setTempDomain('Gaming');
          setTouchCursor({ x: 160, y: 480, visible: true });
          setTourSubtitle("Selecting 'Gaming' as our active content domain niche...");
          setTourStep(5);
        }, 1800);
        break;
      case 5:
        tourTimerRef.current = setTimeout(() => {
          playClickSound();
          setActiveDomain('Gaming');
          setActiveScreen('collabSettings');
          setTouchCursor({ x: 265, y: 240, visible: true });
          setTourSubtitle("Saved! Returning to settings to configure search visibility parameters.");
          setTourStep(6);
        }, 2000);
        break;
      case 6:
        tourTimerRef.current = setTimeout(() => {
          playClickSound();
          setAvailableForCollabs(false);
          setTouchCursor({ x: 45, y: 540, visible: true });
          setTourSubtitle("Step 5: You can toggle search availability off to hide your profile.");
          setTourStep(7);
        }, 2200);
        break;
      case 7:
        tourTimerRef.current = setTimeout(() => {
          playClickSound();
          setActiveScreen('comments');
          setTouchCursor({ x: 140, y: 512, visible: true });
          setTourSubtitle("Step 6: Let's open the Comments Feed to discuss briefs with brands.");
          setTourStep(8);
        }, 2000);
        break;
      case 8:
        tourTimerRef.current = setTimeout(() => {
          const commentText = "Let's build the campaign! Niche set to Gaming.";
          let currentText = "";
          let charIndex = 0;
          tourIntervalRef.current = setInterval(() => {
            currentText += commentText[charIndex];
            setNewCommentText(currentText);
            charIndex++;
            if (charIndex >= commentText.length) {
              clearInterval(tourIntervalRef.current);
              setTouchCursor({ x: 288, y: 512, visible: true });
              setTourSubtitle("Step 7: Press the send paperplane to submit comment live...");
              setTourStep(9);
            }
          }, 60);
        }, 1000);
        break;
      case 9:
        tourTimerRef.current = setTimeout(() => {
          playClickSound();
          const newCmt = {
            id: Date.now(),
            user: 'sg.creates',
            text: "Let's build the campaign! Niche set to Gaming.",
            time: 'Just now'
          };
          setCommentsList(prev => [...prev, newCmt]);
          setNewCommentText('');
          setTimeout(() => {
            commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
          }, 100);

          setTouchCursor({ x: 45, y: 540, visible: true });
          setTourSubtitle("Comment added with clean slide-up animations!");
          setTourStep(10);
        }, 2200);
        break;
      case 10:
        tourTimerRef.current = setTimeout(() => {
          playClickSound();
          setActiveScreen('profile');
          setTouchCursor({ x: 160, y: 250, visible: false });
          setTourSubtitle("UI Walkthrough Tour completed successfully! Play around with the screens.");
          setTourStep(11);
        }, 2200);
        break;
      case 11:
        tourTimerRef.current = setTimeout(() => {
          setIsTourActive(false);
          setTourSubtitle('');
        }, 3000);
        break;
      default:
        break;
    }

    return () => {
      if (tourTimerRef.current) clearTimeout(tourTimerRef.current);
      if (tourIntervalRef.current) clearInterval(tourIntervalRef.current);
    };
  }, [isTourActive, tourStep]);

  // Navigates between screens inside the mockup
  const handleNavigate = (screen) => {
    stopTour();
    playClickSound();
    if (screen === 'domain') {
      setTempDomain(activeDomain);
    }
    setActiveScreen(screen);
  };

  const handleSaveDomain = () => {
    stopTour();
    playClickSound();
    setActiveDomain(tempDomain);
    setActiveScreen('collabSettings');
  };

  const handleToggleCollabs = () => {
    stopTour();
    playClickSound();
    setAvailableForCollabs(!availableForCollabs);
  };

  const handleTogglePhone = () => {
    stopTour();
    playClickSound();
    setShowPhoneInCollabs(!showPhoneInCollabs);
  };

  const handleAddComment = () => {
    if (!newCommentText.trim()) return;
    stopTour();
    playClickSound();
    const newComment = {
      id: Date.now(),
      user: 'princekuma3067',
      text: newCommentText,
      time: 'Just now'
    };
    setCommentsList([...commentsList, newComment]);
    setNewCommentText('');

    // Auto-scroll comment feed
    setTimeout(() => {
      commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <section id="canva-preview" className="py-24 bg-brand-dark relative dashboard-grid border-t border-white/5">
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-orange/5 rounded-full blur-[130px] animate-pulse-slow pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-brand-orange font-bold uppercase tracking-widest text-xs">Sovereign Creator Portal</span>
          <h2 className="text-3xl sm:text-5xl font-black font-outfit text-white">Creator Collaboration Workspace</h2>
          <p className="text-gray-400 text-base">
            Configure rates, domains, and availability parameters in the live collaboration workspace. Replicate brand proposals and escrow-backed workflows instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* LEFT PANEL: CONFIGURATOR & SWITCHER DIRECTORY */}
          <div className="lg:col-span-5 bg-brand-darker/90 border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-8 text-left">
            <div className="space-y-6">

              {/* Play Coded Walkthrough Button */}
              <div className="p-1 rounded-2xl bg-gradient-to-r from-brand-orange via-brand-pink to-brand-purple">
                <button
                  onClick={isTourActive ? stopTour : startTour}
                  className="w-full bg-[#06040a] hover:bg-black/50 transition-colors py-3.5 px-6 rounded-[14px] flex items-center justify-between text-white cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-3.5 w-3.5 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-pink opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-brand-pink"></span>
                    </span>
                    <div className="text-left">
                      <h4 className="font-outfit font-black text-xs uppercase tracking-wider">
                        {isTourActive ? 'Stop UI Walkthrough' : 'Play UI Video Demo'}
                      </h4>
                      <p className="text-[9px] text-gray-500 font-medium">Autoplay high-quality simulated video tour</p>
                    </div>
                  </div>
                  <i className={`fa-solid ${isTourActive ? 'fa-circle-stop text-brand-pink' : 'fa-circle-play text-brand-orange'} text-xl`}></i>
                </button>
              </div>

              {/* Workspace Navigation Directory */}
              <div className="space-y-3 pt-2">
                <span className="text-[10px] font-black uppercase text-gray-500 tracking-wider">UI Screen Options</span>
                <div className="grid grid-cols-2 gap-2 text-[9px] font-bold">
                  <button
                    onClick={() => handleNavigate('profile')}
                    className={`py-2 px-3 rounded-xl border text-center transition-all cursor-pointer ${activeScreen === 'profile'
                        ? 'bg-brand-pink/15 border-brand-pink text-white shadow-lg shadow-brand-pink/10'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                      }`}
                  >
                    UI Profile Screen
                  </button>
                  <button
                    onClick={() => handleNavigate('settings')}
                    className={`py-2 px-3 rounded-xl border text-center transition-all cursor-pointer ${activeScreen === 'settings'
                        ? 'bg-brand-purple/15 border-brand-purple text-white shadow-lg shadow-brand-purple/10'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                      }`}
                  >
                    UI Settings Board
                  </button>
                  <button
                    onClick={() => handleNavigate('collabSettings')}
                    className={`py-2 px-3 rounded-xl border text-center transition-all cursor-pointer ${activeScreen === 'collabSettings'
                        ? 'bg-brand-orange/15 border-brand-orange text-white shadow-lg shadow-brand-orange/10'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                      }`}
                  >
                    UI Collab Settings
                  </button>
                  <button
                    onClick={() => handleNavigate('domain')}
                    className={`py-2 px-3 rounded-xl border text-center transition-all cursor-pointer ${activeScreen === 'domain'
                        ? 'bg-emerald-500/15 border-emerald-500 text-white shadow-lg shadow-emerald-500/10'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                      }`}
                  >
                    UI Domain Selection
                  </button>
                  <button
                    onClick={() => handleNavigate('opportunities')}
                    className={`py-2 px-3 rounded-xl border text-center transition-all cursor-pointer ${activeScreen === 'opportunities'
                        ? 'bg-cyan-500/15 border-cyan-500 text-white shadow-lg shadow-cyan-500/10'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                      }`}
                  >
                    UI Opportunities Inbox
                  </button>
                  <button
                    onClick={() => handleNavigate('comments')}
                    className={`py-2 px-3 rounded-xl border text-center transition-all cursor-pointer ${activeScreen === 'comments'
                        ? 'bg-yellow-500/15 border-yellow-500 text-white shadow-lg shadow-yellow-500/10'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                      }`}
                  >
                    UI Comments Feed
                  </button>
                </div>
              </div>

              {/* Form Controls */}
              <div className="space-y-4 pt-2">
                {/* Input: Creator Name */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Creator Profile Name</label>
                  <input
                    type="text"
                    value={creatorName}
                    onChange={(e) => setCreatorName(e.target.value)}
                    className="w-full bg-brand-dark border border-white/10 focus:border-brand-pink rounded-xl px-4 py-2 text-xs text-white outline-none transition-all"
                  />
                </div>

                {/* Rates Configurator */}
                <div className="space-y-3 pt-1">
                  <p className="text-[10px] font-bold text-brand-pink uppercase tracking-widest flex items-center gap-1.5">
                    <i className="fa-solid fa-indian-rupee-sign"></i> UI Pricing Parameters
                  </p>

                  {/* Slider 1: SOOS Rate */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-gray-400"> SOOS (Short Video):</span>
                      <span className="text-brand-orange font-bold font-mono">₹{Number(soosRate).toLocaleString('en-IN')}</span>
                    </div>
                    <input
                      type="range"
                      min="500"
                      max="15000"
                      step="100"
                      value={ soosRate}
                      onChange={(e) => setSoosRate(Number(e.target.value))}
                      className="w-full h-1 bg-white/10 accent-brand-orange rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  {/* Slider 2: Custom Story */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-gray-400"> Custom Story:</span>
                      <span className="text-brand-pink font-bold font-mono">₹{Number(storyRate).toLocaleString('en-IN')}</span>
                    </div>
                    <input
                      type="range"
                      min="300"
                      max="8000"
                      step="50"
                      value={storyRate}
                      onChange={(e) => setStoryRate(Number(e.target.value))}
                      className="w-full h-1 bg-white/10 accent-brand-pink rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Voice Proposal customizer */}
            <div className="bg-black/30 p-4 rounded-2xl border border-white/5 space-y-3 mt-6">
              <span className="text-[10px] font-black uppercase text-brand-pink tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-pink animate-pulse"></span> Custom Voice Proposal Tool
              </span>
              <p className="text-[11px] text-gray-400">Attach a vocal proposal details clip to show creative direction to matching brands.</p>
              <div className="flex gap-2">
                <button
                  onClick={handleSynthesizeSound}
                  disabled={isSynthPlaying}
                  className="flex-1 px-4 py-2 bg-brand-pink/20 hover:bg-brand-pink/30 disabled:bg-brand-pink/10 border border-brand-pink/30 text-[10px] font-bold text-white rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <i className={`fa-solid ${isSynthPlaying ? 'fa-circle-notch animate-spin' : 'fa-volume-high'}`}></i>
                  {isSynthPlaying ? 'Synthesizing...' : 'Synthesize Proposal Voice'}
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: CODES-RENDERED EMULATOR OF THE SCREENSHOTS */}
          <div className="lg:col-span-7 bg-brand-darker/60 rounded-3xl border border-white/10 p-3 sm:p-6 flex items-center justify-center relative min-h-[480px] sm:min-h-[520px] overflow-hidden">
            <div className="absolute top-4 left-6 flex items-center gap-2 z-30">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs text-gray-400 tracking-wider">UI Simulation Sandbox</span>
            </div>

            {/* Simulated Handheld Device Shell */}
            <div className="relative mockup-container w-[285px] xs:w-[320px] sm:w-[330px] h-[570px] xs:h-[600px] sm:h-[610px] bg-[#07050a] border-[6px] sm:border-[8px] border-white/10 rounded-[36px] sm:rounded-[44px] overflow-hidden transition-all duration-300 shrink-0 my-4 sm:my-0">

              {/* VIDEO PLAYER METRICS OVERLAY DURING WALKTHROUGH */}
              {isTourActive && (
                <>
                  {/* Pulsing REC Indicator */}
                  <div className="absolute top-10 left-4 flex items-center gap-1 bg-black/60 px-1.5 py-0.5 rounded text-[5px] text-red-500 font-bold tracking-wider uppercase z-40 pointer-events-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                    <span>REC</span>
                  </div>

                  {/* HD Quality Watermark */}
                  <div className="absolute top-10 right-4 bg-black/60 px-1.5 py-0.5 rounded text-[5px] text-gray-300 font-bold tracking-wider z-40 pointer-events-none">
                    1080p HD
                  </div>

                  {/* Video Playback Seek / Scrub Bar */}
                  <div className="absolute bottom-12 left-0 w-full px-3 py-1.5 bg-black/90 border-t border-white/15 flex items-center gap-2.5 z-40 text-white font-mono text-[7px] pointer-events-auto">
                    <button onClick={stopTour} className="text-brand-pink hover:text-white shrink-0 cursor-pointer">
                      <i className="fa-solid fa-pause"></i>
                    </button>

                    {/* Progress track */}
                    <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden relative">
                      <div
                        className="h-full bg-brand-pink transition-all duration-500 ease-out"
                        style={{ width: `${(tourStep / 11) * 100}%` }}
                      ></div>
                    </div>

                    <span className="shrink-0 text-gray-400 font-bold">
                      0:{(tourStep * 2).toString().padStart(2, '0')} / 0:22
                    </span>
                  </div>
                </>
              )}

              {/* Virtual Finger/Touch Cursor indicator Overlay during Auto Tour */}
              {touchCursor.visible && (
                <div
                  className="absolute w-5 h-5 bg-brand-pink/35 border-2 border-white rounded-full z-50 pointer-events-none shadow-lg shadow-brand-pink/60 transition-all duration-[800ms] ease-in-out transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: touchCursor.x, top: touchCursor.y }}
                >
                  <span className="absolute inset-0 rounded-full bg-brand-pink/20 animate-ping"></span>
                </div>
              )}

              {/* Device Status Bar */}
              <div className="absolute top-0 left-0 w-full h-8 px-6 flex justify-between items-center text-[8.5px] font-sans font-bold text-gray-400 z-40 pointer-events-none">
                <span>10:29</span>


                <div className="flex items-center gap-1.5">
                  <span className="text-[6.5px]">5G+</span>
                  <i className="fa-solid fa-signal text-[7px]"></i>
                  <div className="flex items-center gap-0.5 border border-white/30 rounded-sm px-0.5 text-[6px] font-mono">
                    13%
                  </div>
                </div>
              </div>

              {/* Simulator Screen Content Area */}
              <div className={`w-full h-full relative pt-8 pb-12 flex flex-col justify-between transition-colors duration-300 ${phoneDarkMode ? 'bg-[#06040a] text-white' : 'bg-gray-100 text-gray-900'
                }`}>

                {/* ================= SCREEN 1: PROFILE VIEW ================= */}
                {activeScreen === 'profile' && (
                  <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 no-scrollbar text-left animate-fade-in">

                    {/* Header */}
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black font-outfit">Profile</span>
                      <div className="flex items-center gap-2">
                        <button className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400"><i className="fa-solid fa-plus text-[9px]"></i></button>
                        <button
                          onClick={() => handleNavigate('settings')}
                          className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white cursor-pointer"
                        >
                          <i className="fa-solid fa-gear text-[9px]"></i>
                        </button>
                      </div>
                    </div>

                    {/* Profile details */}
                    <div className="flex items-center justify-between gap-2.5 p-2 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-brand-pink/40 transition-all duration-300 group cursor-pointer shadow-lg hover:shadow-brand-pink/10">
                      <div className="space-y-1 max-w-[65%]">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-sm font-black font-outfit leading-tight truncate uppercase text-white group-hover:text-brand-pink transition-colors">{creatorName}</h4>
                          <i className="fa-solid fa-circle-check text-[10px] text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.6)]"></i>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="inline-block text-[7px] font-extrabold bg-gradient-to-r from-brand-pink/20 to-brand-purple/20 text-brand-pink border border-brand-pink/40 px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                            Creator
                          </span>
                          <span className="text-[7.5px] font-medium text-emerald-400 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Verified
                          </span>
                        </div>
                        <p className="text-[8.5px] font-mono text-gray-400 group-hover:text-gray-300 transition-colors">@{creatorName.toLowerCase().replace(/\s+/g, '_') || 'user_name'}</p>
                      </div>

                      {/* Glow Avatar with interactive hover effect */}
                      <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-br from-brand-purple via-brand-pink to-brand-orange flex items-center justify-center relative shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-[0_0_15px_rgba(255,42,133,0.3)]">
                        <div className="w-full h-full rounded-full bg-[#07050a] flex items-center justify-center text-[10px] font-bold overflow-hidden border border-white/10 relative">
                          <img src="/avatars/creator.png" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={creatorName} onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="hidden">
                            <rect width="100" height="100" fill="#1b1a24" />
                            <circle cx="50" cy="40" r="16" fill="#e8b195" />
                            <path d="M25 85 C25 65, 38 60, 50 60 C62 60, 75 65, 75 85" fill="#0d0d0d" />
                            <path d="M38 32 C38 25, 62 25, 62 32" fill="#121212" stroke="#121212" strokeWidth="2" />
                          </svg>
                        </div>
                        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-brand-dark flex items-center justify-center shadow-[0_0_8px_rgba(16,185,129,0.8)]">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping opacity-75"></span>
                        </span>
                      </div>
                    </div>

                    {/* Selected Persona Buttons */}
                    <div className="flex gap-4">
                      <button
                        onClick={() => { stopTour(); setPersonaMode('professional'); playClickSound(); }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[8.5px] font-bold cursor-pointer transition-all ${personaMode === 'professional'
                            ? 'bg-brand-pink/15 border-brand-pink text-white shadow-lg'
                            : 'bg-white/5 border-white/5 text-gray-400'
                          }`}
                      >
                        <i className="fa-solid fa-briefcase text-[9px]"></i> PROFESSIONAL
                      </button>
                      <button
                        onClick={() => { stopTour(); setPersonaMode('creative'); playClickSound(); }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[8.5px] font-bold cursor-pointer transition-all ${personaMode === 'creative'
                            ? 'bg-brand-pink/15 border-brand-pink text-white shadow-lg'
                            : 'bg-white/5 border-white/5 text-gray-400'
                          }`}
                      >
                        <i className="fa-solid fa-palette text-[9px]"></i> CREATIVE
                      </button>
                    </div>

                    {/* Counters Card */}
                    <div className="bg-[#0b0914] border border-white/5 rounded-2xl p-3 flex justify-around text-center text-xs">
                      <div>
                        <p className="font-black text-white font-mono leading-none">0</p>
                        <p className="text-[7.5px] text-gray-500 font-bold uppercase mt-1">Posts</p>
                      </div>
                      <div className="border-l border-white/5 h-6"></div>
                      <div>
                        <p className="font-black text-white font-mono leading-none">14</p>
                        <p className="text-[7.5px] text-gray-500 font-bold uppercase mt-1">Followers</p>
                      </div>
                      <div className="border-l border-white/5 h-6"></div>
                      <div>
                        <p className="font-black text-white font-mono leading-none">10</p>
                        <p className="text-[7.5px] text-gray-500 font-bold uppercase mt-1">Following</p>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="grid grid-cols-2 gap-2 text-[9px] font-bold">
                      <button className="bg-white text-black py-2 rounded-xl text-center shadow-lg hover:opacity-90 transition-opacity">
                        Edit profile
                      </button>
                      <button className="bg-white/5 border border-white/10 text-gray-400 hover:text-white py-2 rounded-xl text-center">
                        Share profile
                      </button>
                    </div>

                    {/* Stories Tray */}
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col items-center gap-1">
                        <button className="w-10 h-10 rounded-full border border-dashed border-gray-600 flex items-center justify-center text-gray-400 hover:text-white">
                          <i className="fa-solid fa-plus text-xs"></i>
                        </button>
                        <span className="text-[8px] text-gray-500">Add</span>
                      </div>
                    </div>

                    {/* Feed Tabs */}
                    <div className="flex border-b border-white/5 text-[9px] font-bold pb-0.5 justify-around">
                      <button className="text-brand-pink border-b border-brand-pink pb-1.5 flex items-center gap-1.5">
                        <i className="fa-solid fa-grid-2 text-[8px]"></i> Posts
                      </button>
                      <button className="text-gray-500 pb-1.5 flex items-center gap-1.5">
                        <i className="fa-solid fa-at text-[8px]"></i> Mentions
                      </button>
                    </div>

                    {/* Feed Content empty state */}
                    <div className="py-6 text-center">
                      <p className="text-[10px] text-gray-400 font-bold">No post updates found</p>
                    </div>

                  </div>
                )}

                {/* ================= SCREEN 2: SETTINGS OPTIONS ================= */}
                {activeScreen === 'settings' && (
                  <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 no-scrollbar text-left animate-fade-in">

                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleNavigate('profile')} className="w-6 h-6 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-gray-400 hover:text-white cursor-pointer">
                          <i className="fa-solid fa-chevron-left text-[9px]"></i>
                        </button>
                        <div>
                          <h4 className="text-xs font-black font-outfit leading-tight">Settings</h4>
                          <p className="text-[7.5px] text-gray-500 font-medium leading-none">Privacy, account, app preferences</p>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-white"><i className="fa-solid fa-magnifying-glass text-[9px]"></i></button>
                    </div>

                    {/* Search Settings input */}
                    <div className="bg-[#0b0914] border border-white/5 px-3 py-1.5 rounded-xl flex items-center gap-2 text-[9px]">
                      <i className="fa-solid fa-magnifying-glass text-gray-500"></i>
                      <span className="text-gray-500">Search settings</span>
                    </div>

                    {/* Section 1: Your Account */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-1 bg-brand-pink rounded-full"></span>
                        <span className="text-[8px] text-gray-400 font-black uppercase tracking-wider">Your Account</span>
                      </div>

                      <div className="bg-[#0b0914] border border-white/5 rounded-2xl p-2.5 space-y-2.5">
                        {/* Account Row */}
                        <div className="flex items-center justify-between opacity-75">
                          <div className="flex items-center gap-2.5">
                            <div className="w-6.5 h-6.5 rounded-full bg-gradient-to-br from-brand-purple to-brand-pink flex items-center justify-center text-white text-[8px] shrink-0">
                              <i className="fa-regular fa-user"></i>
                            </div>
                            <span className="text-[9.5px] font-bold">Account</span>
                          </div>
                          <i className="fa-solid fa-chevron-right text-[7px] text-gray-500"></i>
                        </div>

                        {/* Creator Tools / Switch Account Type Row */}
                        <div className="flex items-center justify-between opacity-75">
                          <div className="flex items-center gap-2.5">
                            <div className="w-6.5 h-6.5 rounded-full bg-gradient-to-br from-brand-purple to-brand-pink flex items-center justify-center text-white text-[8px] shrink-0">
                              <i className="fa-solid fa-arrows-spin"></i>
                            </div>
                            <span className="text-[9.5px] font-bold">Creator tools</span>
                          </div>
                          <i className="fa-solid fa-chevron-right text-[7px] text-gray-500"></i>
                        </div>

                        {/* Collaboration Settings Row */}
                        <div
                          onClick={() => handleNavigate('collabSettings')}
                          className="flex items-center justify-between group cursor-pointer"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-6.5 h-6.5 rounded-full bg-gradient-to-br from-brand-purple to-brand-pink flex items-center justify-center text-white text-[8px] shrink-0">
                              <i className="fa-solid fa-tag text-[8px]"></i>
                            </div>
                            <span className="text-[9.5px] font-bold group-hover:text-brand-pink transition-colors">Collaboration</span>
                          </div>
                          <i className="fa-solid fa-chevron-right text-[7px] text-gray-500 group-hover:text-white transition-colors"></i>
                        </div>

                        {/* Collaborations Opps Row */}
                        <div
                          onClick={() => handleNavigate('opportunities')}
                          className="flex items-center justify-between group cursor-pointer"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-6.5 h-6.5 rounded-full bg-gradient-to-br from-brand-purple to-brand-pink flex items-center justify-center text-white text-[8px] shrink-0">
                              <i className="fa-regular fa-comments text-[8px]"></i>
                            </div>
                            <span className="text-[9.5px] font-bold group-hover:text-brand-pink transition-colors">Collaborations</span>
                          </div>
                          <i className="fa-solid fa-chevron-right text-[7px] text-gray-500 group-hover:text-white transition-colors"></i>
                        </div>

                        {/* Wallet Row */}
                        <div className="flex items-center justify-between opacity-75">
                          <div className="flex items-center gap-2.5">
                            <div className="w-6.5 h-6.5 rounded-full bg-gradient-to-br from-brand-purple to-brand-pink flex items-center justify-center text-white text-[8px] shrink-0">
                              <i className="fa-solid fa-wallet text-[8px]"></i>
                            </div>
                            <span className="text-[9.5px] font-bold">Wallet</span>
                          </div>
                          <i className="fa-solid fa-chevron-right text-[7px] text-gray-500"></i>
                        </div>
                      </div>
                    </div>

                    {/* Section 2: How you use Soosial */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-1 bg-brand-pink rounded-full"></span>
                        <span className="text-[8px] text-gray-400 font-black uppercase tracking-wider">How you use Soosial</span>
                      </div>

                      <div className="bg-[#0b0914] border border-white/5 rounded-2xl p-2.5 space-y-2.5">
                        <div className="flex items-center justify-between opacity-75">
                          <span className="text-[9.5px] font-bold">Notification Settings</span>
                          <i className="fa-solid fa-chevron-right text-[7px] text-gray-500"></i>
                        </div>
                        <div className="flex items-center justify-between opacity-75">
                          <span className="text-[9.5px] font-bold">Change Language</span>
                          <i className="fa-solid fa-chevron-right text-[7px] text-gray-500"></i>
                        </div>
                        <div className="flex items-center justify-between opacity-75">
                          <span className="text-[9.5px] font-bold">Saved Posts</span>
                          <i className="fa-solid fa-chevron-right text-[7px] text-gray-500"></i>
                        </div>
                        {/* Dark Mode toggle */}
                        <div className="flex items-center justify-between">
                          <span className="text-[9.5px] font-bold">Dark mode</span>
                          <button
                            onClick={() => { stopTour(); setPhoneDarkMode(!phoneDarkMode); playClickSound(); }}
                            className={`w-7 h-4 rounded-full p-0.5 transition-colors cursor-pointer shrink-0 ${phoneDarkMode ? 'bg-brand-pink flex justify-end' : 'bg-gray-700 flex justify-start'
                              }`}
                          >
                            <span className="w-3 h-3 rounded-full bg-white shadow-sm"></span>
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                )}

                {/* ================= SCREEN 3: COLLABORATION SETTINGS ================= */}
                {activeScreen === 'collabSettings' && (
                  <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 no-scrollbar text-left animate-fade-in">

                    {/* Header */}
                    <div className="flex items-center gap-3">
                      <button onClick={() => handleNavigate('settings')} className="w-6 h-6 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-gray-400 hover:text-white cursor-pointer">
                        <i className="fa-solid fa-chevron-left text-[9px]"></i>
                      </button>
                      <div>
                        <h4 className="text-xs font-black font-outfit leading-tight">Collaboration Settings</h4>
                        <p className="text-[7.5px] text-gray-500 font-medium">Control availability, pricing and creator visibility</p>
                      </div>
                    </div>

                    {/* Profile setup section */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-1 bg-brand-pink rounded-full"></span>
                        <span className="text-[8px] text-gray-400 font-black uppercase tracking-wider">Profile Setup</span>
                      </div>

                      <div className="bg-[#0b0914] border border-white/5 rounded-2xl p-2.5 space-y-2.5">
                        <div
                          onClick={() => handleNavigate('domain')}
                          className="flex items-center justify-between group cursor-pointer"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-purple to-brand-pink flex items-center justify-center text-white text-[10px] shrink-0">
                              <i className="fa-solid fa-pen text-[9px]"></i>
                            </div>
                            <div>
                              <h5 className="text-[9.5px] font-bold">Edit Domain</h5>
                              <p className="text-[7.5px] text-gray-500">Switch your active domain and refine your niche</p>
                            </div>
                          </div>
                          <i className="fa-solid fa-chevron-right text-[8px] text-gray-500 group-hover:text-white transition-colors"></i>
                        </div>

                        <div className="flex items-center justify-between group opacity-75">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-purple to-brand-pink flex items-center justify-center text-white text-[10px] shrink-0">
                              <i className="fa-solid fa-gear text-[9px]"></i>
                            </div>
                            <div>
                              <h5 className="text-[9.5px] font-bold">Edit Pricing & Contact</h5>
                              <p className="text-[7.5px] text-gray-500">Update story, reel, post pricing and contact info</p>
                            </div>
                          </div>
                          <i className="fa-solid fa-chevron-right text-[8px] text-gray-500"></i>
                        </div>
                      </div>
                    </div>

                    {/* Visibility */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-1 bg-brand-pink rounded-full"></span>
                        <span className="text-[8px] text-gray-400 font-black uppercase tracking-wider">Visibility</span>
                      </div>

                      <div className="bg-[#0b0914] border border-white/5 rounded-2xl p-2.5 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5 max-w-[70%]">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-purple to-brand-pink flex items-center justify-center text-white text-[10px] shrink-0">
                              <i className="fa-solid fa-tag text-[9px]"></i>
                            </div>
                            <div>
                              <h5 className="text-[9.5px] font-bold">Available for Collaborations</h5>
                              <p className="text-[7.5px] text-gray-500 leading-snug">Allow businesses to find you and send collaboration requests</p>
                            </div>
                          </div>
                          <button onClick={handleToggleCollabs} className={`w-7 h-4 rounded-full p-0.5 transition-all cursor-pointer shrink-0 ${availableForCollabs ? 'bg-brand-pink flex justify-end' : 'bg-gray-700 flex justify-start'}`}><span className="w-3 h-3 rounded-full bg-white shadow-sm"></span></button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5 max-w-[70%]">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-purple to-brand-pink flex items-center justify-center text-white text-[10px] shrink-0">
                              <i className="fa-solid fa-phone text-[9px]"></i>
                            </div>
                            <div>
                              <h5 className="text-[9.5px] font-bold">Show Phone Number</h5>
                              <p className="text-[7.5px] text-gray-500 leading-snug">Allow businesses to see your phone number when they view your profile</p>
                            </div>
                          </div>
                          <button onClick={handleTogglePhone} className={`w-7 h-4 rounded-full p-0.5 transition-all cursor-pointer shrink-0 ${showPhoneInCollabs ? 'bg-brand-pink flex justify-end' : 'bg-gray-700 flex justify-start'}`}><span className="w-3 h-3 rounded-full bg-white shadow-sm"></span></button>
                        </div>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-1 bg-brand-pink rounded-full"></span>
                        <span className="text-[8px] text-gray-400 font-black uppercase tracking-wider">Important Information</span>
                      </div>
                      <div className="bg-[#0b0914] border border-white/5 rounded-2xl p-3 space-y-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-purple to-brand-pink flex items-center justify-center text-white text-[10px] shrink-0"><i className="fa-solid fa-circle-info text-[10px]"></i></div>
                          <h5 className="text-[9.5px] font-bold">How collaboration works</h5>
                        </div>
                        <ul className="text-[7.5px] text-gray-400 space-y-1.5 list-none pl-1 leading-normal font-light">
                          <li> Your active domain controls where businesses discover you.</li>
                          <li> Pricing details (SOOS: <span className="text-brand-orange font-bold">â{soosRate}</span>, Story: <span className="text-brand-pink font-bold">â‚¹{storyRate}</span>) can be updated anytime.</li>
                          <li> Accepted offers move into secure escrow workflows until complete.</li>
                        </ul>
                      </div>
                    </div>

                  </div>
                )}

                {/* ================= SCREEN 4: EDIT DOMAIN ================= */}
                {activeScreen === 'domain' && (
                  <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 no-scrollbar text-left animate-fade-in flex flex-col justify-between">
                    <div className="space-y-4">

                      {/* Header */}
                      <div className="flex items-center justify-between">
                        <button onClick={() => handleNavigate('collabSettings')} className="text-gray-400 hover:text-white cursor-pointer"><i className="fa-solid fa-chevron-left text-[9px]"></i></button>
                        <h4 className="text-xs font-black font-outfit">Edit Domain</h4>
                        <span className="w-4"></span>
                      </div>

                      {/* Warning Banner */}
                      <div className="border border-brand-purple/40 bg-brand-purple/5 p-2.5 rounded-xl flex items-start gap-2">
                        <i className="fa-solid fa-circle-info text-[9px] text-brand-purple mt-0.5"></i>
                        <p className="text-[7.5px] text-gray-400 leading-normal">Switching domain will disable your current active domain.</p>
                      </div>

                      {/* Header row */}
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-xl bg-brand-pink/15 text-brand-pink flex items-center justify-center text-[10px] shrink-0">
                          <i className="fa-solid fa-shapes"></i>
                        </div>
                        <div>
                          <h5 className="text-[9.5px] font-bold">Your Domain</h5>
                          <p className="text-[7.5px] text-gray-500">Pick one that best describes your content</p>
                        </div>
                      </div>

                      {/* Domains Radio List */}
                      <div className="space-y-1.5 max-h-[220px] overflow-y-auto no-scrollbar">
                        {['Technology', 'Fitness', 'Fashion', 'Beauty', 'Education', 'Finance', 'Gaming', 'Travel'].map((domainItem) => {
                          const isActive = tempDomain === domainItem;
                          return (
                            <div
                              key={domainItem}
                              onClick={() => { stopTour(); setTempDomain(domainItem); playClickSound(); }}
                              className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${isActive
                                  ? 'bg-[#0f0a1d] border-brand-pink'
                                  : 'bg-[#08060d] border-white/5 hover:border-white/10'
                                }`}
                            >
                              <div className="flex items-center gap-2">
                                <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${isActive ? 'border-brand-pink bg-brand-pink' : 'border-gray-600'
                                  }`}>
                                  {isActive && <i className="fa-solid fa-check text-[7px] text-white"></i>}
                                </div>
                                <div>
                                  <span className="text-[9px] font-bold block">{domainItem}</span>
                                  {isActive ? (
                                    <span className="text-[7px] text-brand-pink font-medium block">5 of 8 sub-domains selected</span>
                                  ) : (
                                    <span className="text-[7px] text-gray-500 block">8 sub-domains available</span>
                                  )}
                                </div>
                              </div>
                              {isActive ? (
                                <div className="flex items-center gap-1.5 shrink-0">
                                  <span className="text-[7px] bg-brand-pink/20 text-brand-pink border border-brand-pink/30 px-1 rounded font-bold">Active</span>
                                  <i className="fa-solid fa-sliders text-[8px] text-brand-pink"></i>
                                </div>
                              ) : (
                                <i className="fa-solid fa-chevron-right text-[7px] text-gray-600"></i>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <button onClick={handleSaveDomain} className="w-full gradient-bg py-2.5 rounded-xl text-[9.5px] font-bold text-white shadow-lg cursor-pointer">
                      Save Domain
                    </button>
                  </div>
                )}

                {/* ================= SCREEN 5: COLLABORATIONS OPPORTUNITIES ================= */}
                {activeScreen === 'opportunities' && (
                  <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 no-scrollbar text-left animate-fade-in flex flex-col justify-between">

                    {/* Header */}
                    <div className="flex items-center gap-3">
                      <button onClick={() => handleNavigate('settings')} className="w-6 h-6 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-gray-400 hover:text-white cursor-pointer">
                        <i className="fa-solid fa-chevron-left text-[9px]"></i>
                      </button>
                      <div>
                        <h4 className="text-xs font-black font-outfit leading-tight">Collaborations</h4>
                        <p className="text-[7.5px] text-gray-500 font-medium font-outfit">Track requests, status and completed work</p>
                      </div>
                    </div>

                    {/* Empty State Graphics */}
                    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 pb-12">
                      <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-600 text-2xl select-none">
                        <i className="fa-solid fa-tag"></i>
                      </div>
                      <div className="space-y-1">
                        <h5 className="text-[11px] font-black text-gray-400">No collaborations yet</h5>
                        <p className="text-[8px] text-gray-600 max-w-[160px] mx-auto leading-relaxed">Collaboration requests will appear here</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* ================= SCREEN 6: COMMENTS FEED ================= */}
                {activeScreen === 'comments' && (
                  <div className="flex-1 overflow-hidden flex flex-col justify-between">

                    {/* Header */}
                    <div className="px-4 py-2.5 border-b border-white/5 flex items-center justify-between text-left shrink-0">
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleNavigate('profile')} className="w-6 h-6 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-gray-400 hover:text-white cursor-pointer">
                          <i className="fa-solid fa-chevron-left text-[9px]"></i>
                        </button>
                        <div>
                          <h4 className="text-xs font-black font-outfit leading-tight">Comments</h4>
                          <p className="text-[7px] text-gray-500 font-bold">{commentsList.length} comments</p>
                        </div>
                      </div>
                    </div>

                    {/* Comments list scroll area */}
                    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5 no-scrollbar text-left">
                      {commentsList.map((cmt) => (
                        <div key={cmt.id} className="bg-[#0b0914] border border-white/5 p-2.5 rounded-xl flex gap-2.5 items-start animate-slide-up relative">
                          {/* Circle initial avatar */}
                          <div className="w-7 h-7 rounded-full bg-brand-purple flex items-center justify-center font-bold text-white text-[9px] shrink-0">
                            {cmt.user.slice(0, 2).toUpperCase()}
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="text-[9px] font-bold">{cmt.user} <span className="text-[7px] text-gray-500 font-light ml-1">{cmt.time}</span></span>
                            </div>
                            <p className="text-[8.5px] text-gray-300 leading-normal">{cmt.text}</p>
                            <div className="flex gap-3 text-[7px] text-gray-500 font-bold">
                              <button className="hover:text-white">Reply</button>
                              <button className="hover:text-white">Report</button>
                            </div>
                          </div>
                          <button onClick={() => handleSoundTone(660, 0.15)} className="text-gray-600 hover:text-brand-pink shrink-0 mt-1"><i className="fa-regular fa-heart text-[8px]"></i></button>
                        </div>
                      ))}
                      <div ref={commentsEndRef} />
                    </div>

                    {/* Comment bottom input bar */}
                    <div className="px-3 py-2 border-t border-white/5 bg-[#0b0914] flex items-center gap-2 shrink-0">
                      <button className="text-gray-400 hover:text-white cursor-pointer"><i className="fa-solid fa-camera text-xs"></i></button>

                      <div className="flex-1 bg-brand-dark border border-white/10 px-3 py-1 rounded-xl flex items-center justify-between text-[9px]">
                        <input
                          type="text"
                          placeholder="Add a comment..."
                          value={newCommentText}
                          onChange={(e) => { stopTour(); setNewCommentText(e.target.value); }}
                          onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                          className="bg-transparent border-none w-full outline-none text-white focus:ring-0 text-[9px]"
                        />
                        <button className="text-gray-500 hover:text-white"><i className="fa-regular fa-face-smile text-[10px]"></i></button>
                      </div>

                      {newCommentText ? (
                        <button
                          onClick={handleAddComment}
                          className="w-7 h-7 rounded-full gradient-bg flex items-center justify-center text-white text-[10px] shrink-0 cursor-pointer"
                        >
                          <i className="fa-solid fa-paper-plane"></i>
                        </button>
                      ) : (
                        <button onClick={() => handleSoundTone(320, 0.4)} className="w-7 h-7 rounded-full bg-white/5 text-gray-400 flex items-center justify-center text-[10px] shrink-0">
                          <i className="fa-solid fa-microphone"></i>
                        </button>
                      )}
                    </div>

                  </div>
                )}

                {/* Subtitle banner overlay at bottom during Automated tour */}
                {isTourActive && tourSubtitle && (
                  <div className="absolute bottom-[78px] left-3 right-3 bg-black/95 backdrop-blur-md border border-white/10 p-2.5 rounded-xl text-[8px] text-gray-200 leading-normal text-left font-medium z-45 animate-fade-in shadow-xl shadow-black/45">
                    <span className="text-[7.5px] text-brand-pink font-bold block mb-0.5 uppercase tracking-wide">Walkthrough Subtitles:</span>
                    {tourSubtitle}
                  </div>
                )}

                {/* ================= PHONE BOTTOM NAVIGATION BAR ================= */}
                <div className="absolute bottom-0 left-0 w-full px-5 py-2.5 border-t border-white/5 bg-[#0d0914] flex justify-between items-center text-gray-500 text-xs z-35 shrink-0">
                  <button
                    onClick={() => handleNavigate('profile')}
                    className={`hover:text-brand-pink flex flex-col items-center gap-0.5 cursor-pointer ${activeScreen === 'profile' || activeScreen === 'comments' ? 'text-brand-pink' : ''
                      }`}
                  >
                    <i className="fa-solid fa-house text-[11px]"></i>
                  </button>

                  <button
                    onClick={() => handleNavigate('domain')}
                    className={`hover:text-brand-pink flex flex-col items-center gap-0.5 cursor-pointer ${activeScreen === 'domain' ? 'text-brand-pink' : ''
                      }`}
                  >
                    <svg width="11" height="11" viewBox="80 -880 800 800" fill="currentColor">
                      <path d="m160-800 80 160h120l-80-160h80l80 160h120l-80-160h80l80 160h120l-80-160h120q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800Zm0 240v320h640v-320H160Zm0 0v320-320Z"/>
                    </svg>
                  </button>

                  <button
                    onClick={() => handleNavigate('opportunities')}
                    className={`hover:text-brand-pink flex flex-col items-center gap-0.5 cursor-pointer ${activeScreen === 'opportunities' ? 'text-brand-pink' : ''
                      }`}
                  >
                    <i className="fa-regular fa-comment-dots text-[11px]"></i>
                  </button>

                  <button
                    onClick={() => handleNavigate('settings')}
                    className={`hover:text-brand-pink flex flex-col items-center gap-0.5 cursor-pointer ${activeScreen === 'settings' || activeScreen === 'collabSettings' ? 'text-brand-pink' : ''
                      }`}
                  >
                    <i className="fa-regular fa-user text-[11px]"></i>
                  </button>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

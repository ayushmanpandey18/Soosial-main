import React, { useState, useEffect } from 'react';

const modalTabs = [
  { id: 'about', label: 'About Us', icon: 'fa-building' },
  { id: 'terms', label: 'Terms of Service', icon: 'fa-file-contract' },
  { id: 'privacy', label: 'Privacy Policy', icon: 'fa-shield-halved' },
  { id: 'child-safety', label: 'Child Safety', icon: 'fa-child-reaching' },
  { id: 'community', label: 'Community Guidelines', icon: 'fa-users' },
  { id: 'data-deletion', label: 'Data Deletion', icon: 'fa-user-slash' },
  { id: 'support', label: 'Contact & Support', icon: 'fa-headset' },
];

export default function FooterModal({ isOpen, contentType, onClose, onSwitchTab }) {
  const [activeTab, setActiveTab] = useState(contentType || 'terms');
  
  // Interactive state for forms
  const [supportSubmitted, setSupportSubmitted] = useState(false);
  const [deletionSubmitted, setDeletionSubmitted] = useState(false);
  
  const [supportForm, setSupportForm] = useState({ name: '', email: '', category: 'General Inquiry', message: '' });
  const [deletionForm, setDeletionForm] = useState({ username: '', email: '', phone: '', confirmCheck: false, reason: '' });

  useEffect(() => {
    if (contentType) {
      setActiveTab(contentType);
    }
  }, [contentType]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setSupportSubmitted(false);
      setDeletionSubmitted(false);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (onSwitchTab) {
      onSwitchTab(tabId);
    }
  };

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    if (!supportForm.email || !supportForm.message) return;
    setSupportSubmitted(true);
  };

  const handleDeletionSubmit = (e) => {
    e.preventDefault();
    if (!deletionForm.email || !deletionForm.confirmCheck) return;
    setDeletionSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[85vh] bg-[#0a0712]/95 border border-white/15 rounded-3xl shadow-2xl shadow-brand-pink/10 flex flex-col md:flex-row overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Glows */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-brand-pink/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-brand-orange/15 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-colors shadow-lg cursor-pointer"
        >
          <i className="fa-solid fa-xmark text-lg"></i>
        </button>

        {/* Sidebar Nav */}
        <div className="w-full md:w-64 bg-black/50 border-b md:border-b-0 md:border-r border-white/10 p-4 shrink-0 flex flex-row md:flex-col overflow-x-auto md:overflow-y-auto no-scrollbar gap-1.5">
          <div className="hidden md:flex items-center gap-2.5 px-3 py-3 mb-2 border-b border-white/10">
            <img src="/favicon.ico" className="w-6 h-6 object-contain rounded-md" alt="soosial" />
            <span className="font-outfit font-black text-sm text-white tracking-tight">
              soosial<span className="text-brand-orange">.in</span>
            </span>
          </div>

          {modalTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-pink/20 to-brand-orange/20 text-white border border-brand-pink/30 shadow-sm'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <i className={`fa-solid ${tab.icon} w-4 text-center ${isActive ? 'text-brand-pink' : 'text-gray-500'}`}></i>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto max-h-[calc(85vh-60px)] md:max-h-[85vh] text-gray-300 text-sm leading-relaxed space-y-6 custom-scrollbar">
          {/* ABOUT US */}
          {activeTab === 'about' && (
            <div className="space-y-5 animate-fade-in">
              <div className="border-b border-white/10 pb-4">
                <span className="text-xs uppercase font-black text-brand-pink tracking-wider">Company</span>
                <h2 className="text-2xl font-outfit font-black text-white mt-1">About Soosial</h2>
                <p className="text-xs text-gray-400 mt-1">Omnexia Technologies PVT L.T.D.</p>
              </div>

              <p>
                <strong>Soosial</strong> is India&apos;s next-generation sovereign social marketplace engineered for creators, visionaries, and digital native communities. Developed by <strong>Omnexia Technologies PVT L.T.D.</strong>, our mission is to empower content creators with direct monetization, zero platform tax, and sovereign privacy controls.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                  <i className="fa-solid fa-bolt text-brand-orange text-lg mb-2"></i>
                  <h4 className="font-bold text-white text-sm">Direct Escrow Monetization</h4>
                  <p className="text-xs text-gray-400 mt-1">Instant brand bookings via secure UPI Escrow without middleman fees.</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                  <i className="fa-solid fa-shield-halved text-brand-pink text-lg mb-2"></i>
                  <h4 className="font-bold text-white text-sm">Regional Data Sovereignty</h4>
                  <p className="text-xs text-gray-400 mt-1">100% hosted on tier-4 compliant regional Indian cloud servers.</p>
                </div>
              </div>

              <h3 className="font-bold text-white text-base pt-2">Our Core Values</h3>
              <ul className="list-disc list-inside space-y-2 text-xs text-gray-300">
                <li><strong className="text-white">Creator First:</strong> Creators retain total ownership of their audience, media assets, and revenue streams.</li>
                <li><strong className="text-white">Safety & Respect:</strong> Zero tolerance for harassment, hate speech, or exploitation.</li>
                <li><strong className="text-white">Absolute Privacy:</strong> User data is never monetized or sold to third-party ad brokers.</li>
              </ul>
            </div>
          )}

          {/* TERMS OF SERVICE */}
          {activeTab === 'terms' && (
            <div className="space-y-5 animate-fade-in">
              <div className="border-b border-white/10 pb-4">
                <span className="text-xs uppercase font-black text-brand-orange tracking-wider">Legal Framework</span>
                <h2 className="text-2xl font-outfit font-black text-white mt-1">Terms of Service</h2>
                <p className="text-xs text-gray-400 mt-1">Last updated: August 2026</p>
              </div>

              <section className="space-y-2">
                <h3 className="font-bold text-white text-base">1. Acceptance of Terms</h3>
                <p className="text-xs text-gray-300">
                  By downloading, accessing, or using the Soosial mobile application or website operated by Omnexia Technologies PVT L.T.D., you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-bold text-white text-base">2. Eligibility & Account Registration</h3>
                <p className="text-xs text-gray-300">
                  You must be at least 13 years of age to register for an account on Soosial. Users under 18 years of age require parental or guardian permission. You are responsible for maintaining the confidentiality of your account credentials.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-bold text-white text-base">3. Creator Marketplace & Payments</h3>
                <p className="text-xs text-gray-300">
                  Transactions initiated through our Canva Studio / Direct Escrow system are executed between creators and brands. Omnexia Technologies acts as a facilitator and escrow holder. All fees and settlements adhere strictly to Indian banking and UPI regulations.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-bold text-white text-base">4. Content Ownership & Rights</h3>
                <p className="text-xs text-gray-300">
                  You retain all intellectual property rights to the content you create and post on Soosial. By posting content, you grant Soosial a worldwide, non-exclusive license to host, display, and distribute your content within the platform.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-bold text-white text-base">5. Termination</h3>
                <p className="text-xs text-gray-300">
                  We reserve the right to suspend or terminate accounts that violate our Community Guidelines or Terms of Service without prior notice.
                </p>
              </section>
            </div>
          )}

          {/* PRIVACY POLICY */}
          {activeTab === 'privacy' && (
            <div className="space-y-5 animate-fade-in">
              <div className="border-b border-white/10 pb-4">
                <span className="text-xs uppercase font-black text-brand-pink tracking-wider">Privacy & Protection</span>
                <h2 className="text-2xl font-outfit font-black text-white mt-1">Privacy Policy</h2>
                <p className="text-xs text-gray-400 mt-1">Compliant with DPDP Act & Indian IT Regulations</p>
              </div>

              <section className="space-y-2">
                <h3 className="font-bold text-white text-base">1. Information We Collect</h3>
                <p className="text-xs text-gray-300">
                  We collect account registration data (name, email, phone number), profile information, user-uploaded media (photos, short videos, audio comments), and transaction metadata for escrow bookings.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-bold text-white text-base">2. How We Use Your Data</h3>
                <ul className="list-disc list-inside space-y-1.5 text-xs text-gray-300">
                  <li>To operate and maintain your sovereign social profile and feed.</li>
                  <li>To process escrow creator bookings and payouts securely.</li>
                  <li>To provide automated content safety and fraud prevention.</li>
                  <li>We DO NOT sell your personal data to ad networks or third parties.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="font-bold text-white text-base">3. Data Storage & Security</h3>
                <p className="text-xs text-gray-300">
                  All user data is encrypted in transit (TLS 1.3) and at rest (AES-256) inside certified Indian data centers. We implement strict role-based access control and continuous security audits.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-bold text-white text-base">4. Your Data Rights</h3>
                <p className="text-xs text-gray-300">
                  Under the Digital Personal Data Protection Act, you have the right to request access to your data, correct inaccuracies, or submit a complete data deletion request at any time using our Data Deletion tab.
                </p>
              </section>
            </div>
          )}

          {/* CHILD SAFETY */}
          {activeTab === 'child-safety' && (
            <div className="space-y-5 animate-fade-in">
              <div className="border-b border-white/10 pb-4">
                <span className="text-xs uppercase font-black text-emerald-400 tracking-wider">Protection & Safety</span>
                <h2 className="text-2xl font-outfit font-black text-white mt-1">Child Safety & Protection Policy</h2>
                <p className="text-xs text-gray-400 mt-1">Zero Tolerance Framework for Minor Protection</p>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl flex items-start gap-3">
                <i className="fa-solid fa-shield text-emerald-400 text-xl mt-0.5"></i>
                <p className="text-xs text-emerald-200">
                  Omnexia Technologies PVT L.T.D. is committed to upholding the highest safety standards to protect minors from exploitation, abuse, and inappropriate content on Soosial.
                </p>
              </div>

              <section className="space-y-2">
                <h3 className="font-bold text-white text-base">1. Strict Age Safeguards</h3>
                <p className="text-xs text-gray-300">
                  Soosial strictly prohibits registration for children under 13. Accounts belonging to users under 18 default to enhanced privacy settings, restricting direct messaging from unverified adult accounts.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-bold text-white text-base">2. Zero Tolerance for CSAM / CSAE</h3>
                <p className="text-xs text-gray-300">
                  Any attempt to upload, share, or request Child Sexual Abuse Material (CSAM) or Child Sexual Exploitation and Abuse (CSAE) will result in immediate permanent account termination, IP ban, and reporting to law enforcement authorities including NCMEC and local cyber police units.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-bold text-white text-base">3. Automated Content AI & Moderation</h3>
                <p className="text-xs text-gray-300">
                  Our upload engine employs automated hash matching and real-time AI moderation to intercept harmful media prior to publishing.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-bold text-white text-base">4. Reporting Violations</h3>
                <p className="text-xs text-gray-300">
                  Users can instantly report suspected child safety violations via the in-app flag button or directly via email to our dedicated safety team at <span className="text-brand-pink font-semibold">safety@soosial.in</span>.
                </p>
              </section>
            </div>
          )}

          {/* COMMUNITY GUIDELINES */}
          {activeTab === 'community' && (
            <div className="space-y-5 animate-fade-in">
              <div className="border-b border-white/10 pb-4">
                <span className="text-xs uppercase font-black text-brand-pink tracking-wider">Standards</span>
                <h2 className="text-2xl font-outfit font-black text-white mt-1">Community Guidelines</h2>
                <p className="text-xs text-gray-400 mt-1">Fostering Authentic & Respectful Connections</p>
              </div>

              <p className="text-xs text-gray-300">
                Soosial is designed to be a vibrant, welcoming space where creators and users express themselves authentically. To maintain this environment, we expect all members to adhere to these rules:
              </p>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl">
                  <h4 className="font-bold text-white text-sm flex items-center gap-2">
                    <i className="fa-solid fa-heart text-brand-pink"></i> Respect & Inclusivity
                  </h4>
                  <p className="text-xs text-gray-400 mt-1">Do not engage in hate speech, harassment, bullying, or discrimination based on race, gender, religion, sexual orientation, or background.</p>
                </div>

                <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl">
                  <h4 className="font-bold text-white text-sm flex items-center gap-2">
                    <i className="fa-solid fa-shield text-brand-orange"></i> Authenticity & Anti-Spam
                  </h4>
                  <p className="text-xs text-gray-400 mt-1">Do not impersonate other creators or public figures. Avoid posting misleading info, fake reviews, or spamming comment threads.</p>
                </div>

                <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl">
                  <h4 className="font-bold text-white text-sm flex items-center gap-2">
                    <i className="fa-solid fa-ban text-red-400"></i> No Illegal Content
                  </h4>
                  <p className="text-xs text-gray-400 mt-1">Sharing violent extremism, non-consensual imagery, unauthorized intellectual property, or illegal trade goods is strictly prohibited.</p>
                </div>
              </div>
            </div>
          )}

          {/* DATA DELETION */}
          {activeTab === 'data-deletion' && (
            <div className="space-y-5 animate-fade-in">
              <div className="border-b border-white/10 pb-4">
                <span className="text-xs uppercase font-black text-brand-orange tracking-wider">Privacy Rights</span>
                <h2 className="text-2xl font-outfit font-black text-white mt-1">Data Deletion Request</h2>
                <p className="text-xs text-gray-400 mt-1">Request complete removal of your Soosial account & personal data</p>
              </div>

              {deletionSubmitted ? (
                <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-2xl text-center space-y-3">
                  <i className="fa-solid fa-circle-check text-emerald-400 text-4xl"></i>
                  <h3 className="font-outfit font-bold text-white text-lg">Request Received</h3>
                  <p className="text-xs text-gray-300 max-w-md mx-auto">
                    Your data deletion request for <strong className="text-white">{deletionForm.email}</strong> has been submitted. Our compliance team will process your account deletion within 7 business days. A confirmation email has been dispatched.
                  </p>
                  <button
                    onClick={() => setDeletionSubmitted(false)}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleDeletionSubmit} className="space-y-4">
                  <p className="text-xs text-gray-300">
                    You have full control over your data. Submitting this form will purge your user profile, posts, media assets, comments, and message history from our primary database servers.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-1">Username / Handle *</label>
                      <input
                        type="text"
                        required
                        placeholder="@username"
                        value={deletionForm.username}
                        onChange={(e) => setDeletionForm({ ...deletionForm, username: e.target.value })}
                        className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-pink"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-1">Registered Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={deletionForm.email}
                        onChange={(e) => setDeletionForm({ ...deletionForm, email: e.target.value })}
                        className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-pink"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">Reason for Deletion (Optional)</label>
                    <textarea
                      rows="2"
                      placeholder="Help us improve by letting us know why you're leaving..."
                      value={deletionForm.reason}
                      onChange={(e) => setDeletionForm({ ...deletionForm, reason: e.target.value })}
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-pink"
                    ></textarea>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="confirmCheck"
                      required
                      checked={deletionForm.confirmCheck}
                      onChange={(e) => setDeletionForm({ ...deletionForm, confirmCheck: e.target.checked })}
                      className="w-4 h-4 rounded border-white/20 bg-black text-brand-pink focus:ring-0 cursor-pointer"
                    />
                    <label htmlFor="confirmCheck" className="text-xs text-gray-400 cursor-pointer">
                      I understand this action is permanent and cannot be undone.
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white rounded-xl font-bold text-xs shadow-lg shadow-red-900/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <i className="fa-solid fa-trash-can"></i> Request Permanent Account Deletion
                  </button>
                </form>
              )}
            </div>
          )}

          {/* SUPPORT / CONTACT */}
          {activeTab === 'support' && (
            <div className="space-y-5 animate-fade-in">
              <div className="border-b border-white/10 pb-4">
                <span className="text-xs uppercase font-black text-brand-pink tracking-wider">Customer Care</span>
                <h2 className="text-2xl font-outfit font-black text-white mt-1">Contact & Support</h2>
                <p className="text-xs text-gray-400 mt-1">We are here to assist creators and users 24/7</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl text-center">
                  <i className="fa-solid fa-envelope text-brand-pink text-lg mb-1 block"></i>
                  <span className="text-[10px] text-gray-400 uppercase font-bold block">Support Email</span>
                  <span className="text-xs font-bold text-white">support@soosial.in</span>
                </div>
                <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl text-center">
                  <i className="fa-solid fa-building text-brand-orange text-lg mb-1 block"></i>
                  <span className="text-[10px] text-gray-400 uppercase font-bold block">Headquarters</span>
                  <span className="text-xs font-bold text-white">Omnexia Tech, India</span>
                </div>
                <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl text-center">
                  <i className="fa-solid fa-bolt text-brand-purple text-lg mb-1 block"></i>
                  <span className="text-[10px] text-gray-400 uppercase font-bold block">Response Time</span>
                  <span className="text-xs font-bold text-white">&lt; 2 Hours</span>
                </div>
              </div>

              {supportSubmitted ? (
                <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-2xl text-center space-y-3">
                  <i className="fa-solid fa-paper-plane text-emerald-400 text-4xl"></i>
                  <h3 className="font-outfit font-bold text-white text-lg">Message Sent Successfully!</h3>
                  <p className="text-xs text-gray-300 max-w-md mx-auto">
                    Thank you for reaching out. A ticket has been created and sent to our support engineering desk. We will get back to you shortly.
                  </p>
                  <button
                    onClick={() => setSupportSubmitted(false)}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSupportSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-1">Your Name</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={supportForm.name}
                        onChange={(e) => setSupportForm({ ...supportForm, name: e.target.value })}
                        className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-pink"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={supportForm.email}
                        onChange={(e) => setSupportForm({ ...supportForm, email: e.target.value })}
                        className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-pink"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">Category</label>
                    <select
                      value={supportForm.category}
                      onChange={(e) => setSupportForm({ ...supportForm, category: e.target.value })}
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-pink"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Creator Escrow Booking">Creator Escrow Booking</option>
                      <option value="Account & Security">Account & Security</option>
                      <option value="Report Bug">Report Bug / Technical Issue</option>
                      <option value="Safety & Moderation">Safety & Moderation Report</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">Message *</label>
                    <textarea
                      rows="4"
                      required
                      placeholder="Describe how we can help you..."
                      value={supportForm.message}
                      onChange={(e) => setSupportForm({ ...supportForm, message: e.target.value })}
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-pink"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full gradient-bg py-3.5 rounded-xl text-white font-bold text-xs shadow-lg shadow-brand-pink/20 hover:opacity-95 transition-opacity cursor-pointer flex items-center justify-center gap-2"
                  >
                    <i className="fa-solid fa-paper-plane"></i> Submit Support Inquiry
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

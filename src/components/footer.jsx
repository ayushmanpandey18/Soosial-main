import { useState, useEffect, useCallback } from 'react';
import FooterModal from './FooterModal';

const typeToRouteMap = {
  terms: '/terms-of-service',
  privacy: '/privacy-policy',
  'child-safety': '/child-safety',
  'data-deletion': '/data-deletion',
  support: '/support',
  about: '/about-us',
  community: '/community-guidelines',
  safety: '/child-safety',
};

const routeToTypeMap = {
  '/terms-of-service': 'terms',
  '/terms': 'terms',
  '/privacy-policy': 'privacy',
  '/privacy': 'privacy',
  '/child-safety': 'child-safety',
  '/child-safety-policy': 'child-safety',
  '/data-deletion': 'data-deletion',
  '/data-deletion-request': 'data-deletion',
  '/support': 'support',
  '/contact': 'support',
  '/about-us': 'about',
  '/about': 'about',
  '/community-guidelines': 'community',
  '/community': 'community',
  '/safety': 'child-safety',
};

export default function Footer() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');

  const syncRouteWithModal = useCallback(() => {
    let path = window.location.pathname.toLowerCase();
    if (path === '/safety') {
      window.history.replaceState(null, '', '/child-safety');
      path = '/child-safety';
    }
    const matchedType = routeToTypeMap[path];
    if (matchedType) {
      setModalType(matchedType);
      setModalOpen(true);
    }
  }, []);

  const openModal = (type) => {
    setModalType(type);
    setModalOpen(true);
    const targetRoute = typeToRouteMap[type] || '/';
    if (window.location.pathname !== targetRoute) {
      window.history.pushState(null, '', targetRoute);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    if (window.location.pathname !== '/') {
      window.history.pushState(null, '', '/');
    }
  };

  const handleSwitchTab = (type) => {
    setModalType(type);
    const targetRoute = typeToRouteMap[type] || '/';
    if (window.location.pathname !== targetRoute) {
      window.history.pushState(null, '', targetRoute);
    }
  };

  const handleScrollToSection = (e, sectionId) => {
    e.preventDefault();
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    syncRouteWithModal();

    const handlePopState = () => {
      let path = window.location.pathname.toLowerCase();
      if (path === '/safety') {
        window.history.replaceState(null, '', '/child-safety');
        path = '/child-safety';
      }
      const matchedType = routeToTypeMap[path];
      if (matchedType) {
        setModalType(matchedType);
        setModalOpen(true);
      } else {
        setModalOpen(false);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [syncRouteWithModal]);

  return (
    <div>
      <footer className="bg-[#050508] border-t border-white/10 pt-16 pb-12 text-gray-400 font-sans">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12">
            {/* Brand & Socials Column */}
            <div className="md:col-span-2 space-y-5">
              <a href="/" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-3 group focus:outline-none shrink-0 inline-flex">
                <img
                  src="/favicon.ico"
                  className="w-9 h-9 object-contain rounded-xl shrink-0 group-hover:scale-105 transition-transform duration-300"
                  alt="soosial logo"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black font-outfit tracking-tight text-white group-hover:text-brand-pink transition-colors">
                      soosial<span className="text-brand-orange">.in</span>
                    </span>
                  </div>
                  <span className="block text-[8px] tracking-widest text-gray-400 uppercase font-black -mt-1">
                    Omnexia Technologies PVT L.T.D.
                  </span>
                </div>
              </a>

              <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
                Connect. Share. Vibe. The sovereign social media app & creator marketplace for the next generation.
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-3 pt-1">
                <a
                  href="https://x.com/omnexiatech"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter / X"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all transform hover:scale-105"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com/omnexiatech"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all transform hover:scale-105"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a
                  href="https://www.omnexiatechnology.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Website"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all transform hover:scale-105"
                >
                  <i className="fa-solid fa-globe text-sm"></i>
                </a>
              </div>
            </div>

            {/* Product Column */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold text-sm">Product</h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a
                    href="#features"
                    onClick={(e) => handleScrollToSection(e, 'features')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#download"
                    onClick={(e) => handleScrollToSection(e, 'simulator')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Interactive Demo
                  </a>
                </li>
                <li>
                  <a
                    href="/child-safety"
                    onClick={(e) => { e.preventDefault(); openModal('child-safety'); }}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Safety
                  </a>
                </li>
                <li>
                  <a
                    href="/community-guidelines"
                    onClick={(e) => { e.preventDefault(); openModal('community'); }}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Community Guidelines
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold text-sm">Company</h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a
                    href="/about-us"
                    onClick={(e) => { e.preventDefault(); openModal('about'); }}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.omnexiatechnology.in/career"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="/about-us"
                    onClick={(e) => { e.preventDefault(); openModal('about'); }}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Press & Media
                  </a>
                </li>
                <li>
                  <a
                    href="/support"
                    onClick={(e) => { e.preventDefault(); openModal('support'); }}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Contact / Support
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal Column */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold text-sm">Legal</h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a
                    href="/terms-of-service"
                    onClick={(e) => { e.preventDefault(); openModal('terms'); }}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy-policy"
                    onClick={(e) => { e.preventDefault(); openModal('privacy'); }}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/child-safety"
                    onClick={(e) => { e.preventDefault(); openModal('child-safety'); }}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Child Safety
                  </a>
                </li>
                <li>
                  <a
                    href="/data-deletion"
                    onClick={(e) => { e.preventDefault(); openModal('data-deletion'); }}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Data Deletion
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <p>© 2026 Omnexia Technologies PVT L.T.D. All rights reserved.</p>
            <p className="flex items-center gap-1.5">
              Made with <span className="text-[#a855f7]">💜</span> for the next generation
            </p>
          </div>
        </div>
      </footer>

      {/* Interactive Footer Modal */}
      <FooterModal
        isOpen={modalOpen}
        contentType={modalType}
        onClose={closeModal}
        onSwitchTab={handleSwitchTab}
      />
    </div>
  );
}


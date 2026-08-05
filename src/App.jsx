import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CanvaStudio from './components/CanvaStudio';
import SimulatorTour from './components/SimulatorTour';
import Features from './components/Features';
import CheckoutModal from './components/CheckoutModal';

function App() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutCreator, setCheckoutCreator] = useState('');
  const [checkoutItem, setCheckoutItem] = useState('');
  const [checkoutPrice, setCheckoutPrice] = useState(0);

  const handleBookCreator = (name, item, price) => {
    setCheckoutCreator(name);
    setCheckoutItem(item);
    setCheckoutPrice(price);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="bg-brand-darker text-gray-100 font-sans min-h-screen selection:bg-brand-pink selection:text-white">
      {/* Sticky Header */}
      <Header />

      {/* Hero Section */}
      <Hero onBookCreator={handleBookCreator} />

      {/* Creator Collaboration Workspace */}
      <CanvaStudio onBookCreator={handleBookCreator} />

      {/* Features & Narrative Pillars */}
      <Features />

      {/* Simulator Section */}
      <SimulatorTour onBookCreator={handleBookCreator} />



      {/* Footer */}
      <footer className="bg-[#040207] border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img 
              src="/favicon.ico" 
              className="w-7 h-7 object-contain rounded-lg shadow-sm" 
              alt="soosial logo" 
            />
            <div className="text-left">
              <span className="font-outfit font-black text-white text-base tracking-tight">soosial<span className="text-brand-orange">.in</span></span>
              <p className="text-[9px] text-gray-500 font-bold -mt-1 uppercase">Sovereign Social Marketplace</p>
            </div>
          </div>

          <p className="text-xs text-gray-500 font-light">
            &copy; {new Date().getFullYear()} Omnexia Technologies PVT L.T.D. All rights reserved. Securely hosted in regional India servers.
          </p>
          
          <div className="flex gap-4 text-gray-400 text-sm">
            <a href="#about" className="hover:text-white transition-colors"><i className="fa-brands fa-github"></i></a>
            <a href="#about" className="hover:text-white transition-colors"><i className="fa-brands fa-x-twitter"></i></a>
            <a href="#about" className="hover:text-white transition-colors"><i className="fa-brands fa-discord"></i></a>
          </div>
        </div>
      </footer>

      {/* Checkout Escrow Booking Drawer/Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        creatorName={checkoutCreator}
        item={checkoutItem}
        price={checkoutPrice}
      />
    </div>
  );
}

export default App;


import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CanvaStudio from './components/CanvaStudio';
import SimulatorTour from './components/SimulatorTour';
import Features from './components/Features';
import CheckoutModal from './components/CheckoutModal';
import Footer from './components/footer';

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
    <div className="min-h-screen flex flex-col bg-brand-darker text-gray-100 font-sans selection:bg-brand-pink selection:text-white">
      <div className="flex-1">
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
      </div>

      {/* Footer Component */}
      <Footer />

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
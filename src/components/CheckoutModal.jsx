import React, { useState, useEffect } from 'react';
import { playDemoSound } from '../utils/audio';

export default function CheckoutModal({ isOpen, onClose, creatorName, item, price }) {
  const [step, setStep] = useState(1); // 1 = Summary/Pay, 2 = Processing, 3 = Success

  // Play success sound when loading completes
  useEffect(() => {
    if (step === 3) {
      // Play a lovely double chime for success
      setTimeout(() => playDemoSound(523.25, 0.15, 'sine'), 0);   // C5
      setTimeout(() => playDemoSound(659.25, 0.25, 'sine'), 120); // E5
    }
  }, [step]);

  if (!isOpen) return null;

  const handlePay = () => {
    setStep(2);
    // Simulate transaction delay
    setTimeout(() => {
      setStep(3);
    }, 2000);
  };

  const handleClose = () => {
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-brand-dark/95 border border-brand-pink/20 rounded-[32px] p-6 sm:p-8 shadow-2xl shadow-brand-pink/10 animate-float">
        {/* Glow overlay inside modal */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-pink/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-purple/10 rounded-full blur-2xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-colors"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        {step === 1 && (
          <div className="space-y-6 relative">
            <div className="text-center">
              <span className="p-3 bg-brand-pink/10 text-brand-pink rounded-full inline-block text-xl mb-3">
                <i className="fa-solid fa-handshake"></i>
              </span>
              <h3 className="font-outfit font-black text-xl text-white">Direct Collab Booking</h3>
              <p className="text-xs text-gray-400 mt-1">Sovereign Direct Escrow Bridge</p>
            </div>

            {/* Receipt Summary */}
            <div className="bg-black/40 border border-white/5 rounded-2xl p-4 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">Creator:</span>
                <span className="text-white font-bold">{creatorName}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">Deliverable:</span>
                <span className="text-brand-orange font-bold">{item}</span>
              </div>
              <div className="h-px bg-white/5 my-2"></div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300 font-bold">Total Amount:</span>
                <span className="text-lg font-black font-mono text-white">â‚¹{price}</span>
              </div>
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <i className="fa-solid fa-circle-check"></i> 0% Platform Commission
                </span>
                <span className="text-gray-500">Direct creator settlement</span>
              </div>
            </div>

            {/* QR Code and UPI Setup */}
            <div className="flex items-center gap-4 bg-white/5 border border-white/5 p-4 rounded-2xl">
              {/* Simulated QR Code */}
              <div className="w-20 h-20 bg-white p-1.5 rounded-lg flex flex-col justify-between shrink-0">
                <div className="flex justify-between">
                  <span className="w-4 h-4 bg-black rounded"></span>
                  <span className="w-4 h-4 bg-black rounded"></span>
                </div>
                <div className="w-full h-8 flex flex-wrap gap-0.5 justify-center items-center py-1">
                  <span className="w-1.5 h-1.5 bg-black"></span>
                  <span className="w-1.5 h-1.5 bg-brand-pink"></span>
                  <span className="w-1.5 h-1.5 bg-black"></span>
                  <span className="w-1.5 h-1.5 bg-black"></span>
                  <span className="w-1.5 h-1.5 bg-brand-orange"></span>
                  <span className="w-1.5 h-1.5 bg-black"></span>
                </div>
                <div className="flex justify-between">
                  <span className="w-4 h-4 bg-black rounded"></span>
                  <span className="w-1.5 h-1.5 bg-brand-purple rounded-full"></span>
                </div>
              </div>
              <div className="space-y-1 min-w-0">
                <span className="text-[9px] font-black uppercase text-brand-pink tracking-widest block">Scan to Pay via UPI</span>
                <p className="text-xs text-white font-bold truncate">soosial.booking@okhdfcbank</p>
                <p className="text-[10px] text-gray-400">Accepting GooglePay, PhonePe, Paytm, or any Indian banking app.</p>
              </div>
            </div>

            <button
              onClick={handlePay}
              className="w-full gradient-bg py-3.5 rounded-2xl text-xs font-bold text-white shadow-lg shadow-brand-pink/20 hover:opacity-95 transition-opacity flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-shield-halved"></i> Authorize Direct Payment
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="py-12 flex flex-col items-center justify-center space-y-4">
            <div className="relative w-16 h-16">
              {/* Spinner */}
              <div className="absolute inset-0 rounded-full border-4 border-white/5 border-t-brand-pink animate-spin"></div>
            </div>
            <p className="font-outfit font-black text-white text-base">Processing Escrow Authorization...</p>
            <p className="text-xs text-gray-400 text-center max-w-xs">
              Securing connections on local Indian servers. Encryption layers loaded.
            </p>
          </div>
        )}

        {step === 3 && (
          <div className="py-6 text-center space-y-6">
            <span className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-3xl mx-auto animate-bounce">
              <i className="fa-solid fa-check"></i>
            </span>
            <div className="space-y-2">
              <h4 className="font-outfit font-black text-xl text-white">Collaboration Initiated!</h4>
              <p className="text-xs text-gray-400">
                Escrow successfully locked. Aditi has been notified of your proposal and will respond inside the sovereign messenger app.
              </p>
            </div>

            <div className="bg-black/30 border border-white/5 p-4 rounded-2xl text-left space-y-2.5">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-gray-500 font-bold">Transaction Hash:</span>
                <span className="text-gray-400 font-mono font-bold">TX_59281_SOOS</span>
              </div>
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-gray-500 font-bold">Escrow Account:</span>
                <span className="text-gray-400 font-mono font-bold">OMNEXIA_MUTUAL_IND</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-full py-3 bg-white/5 border border-white/10 text-white rounded-xl text-xs font-bold hover:bg-white/10 transition-colors"
            >
              Return to Landing Page
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Web Audio API Sound Synthesizer Utility

let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Play a standard oscillator tone with a smooth fade-out envelope.
 * @param {number} frequency - Hz of the tone
 * @param {number} duration - length of the tone in seconds
 * @param {string} type - oscillator type ('sine', 'triangle', 'sawtooth', 'square')
 */
export function playDemoSound(frequency = 440, duration = 0.5, type = 'triangle') {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);

    // Smooth envelope: quick attack, smooth decay
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch (error) {
    console.warn('Audio synthesis not supported or blocked by browser policy:', error);
  }
}

/**
 * Synthesizes a futuristic vocal signature comment sequence (multiple notes rising and falling).
 */
export function playCustomStudioVoice() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Series of notes mimicking vocal hum/frequency response
    const notes = [
      { freq: 261.63, delay: 0, duration: 0.15 }, // C4
      { freq: 329.63, delay: 0.12, duration: 0.15 }, // E4
      { freq: 392.00, delay: 0.24, duration: 0.2 }, // G4
      { freq: 523.25, delay: 0.4, duration: 0.35 }  // C5
    ];

    notes.forEach(({ freq, delay, duration }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Use triangle for a softer, organic vocal-like tone
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + delay);

      // Lowpass filter to mimic vocal warmth
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now + delay);

      // Smooth envelope
      gain.gain.setValueAtTime(0, now + delay);
      gain.gain.linearRampToValueAtTime(0.2, now + delay + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + delay);
      osc.stop(now + delay + duration);
    });
  } catch (error) {
    console.warn('Audio synthesis failed:', error);
  }
}

/**
 * Plays a click sound effect when buttons are clicked.
 */
export function playClickSound() {
  playDemoSound(600, 0.08, 'sine');
}
